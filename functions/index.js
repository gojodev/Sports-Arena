const { onRequest } = require("firebase-functions/v2/https");
const { initializeApp } = require("firebase/app");
const bcrypt = require('bcrypt');

const firebaseConfig = {
    apiKey: "AIzaSyBOPQ3euAts_r7tObkfMU_tUllIdTtGR48",
    authDomain: "sports-arena-39a32.firebaseapp.com",
    projectId: "sports-arena-39a32",
    storageBucket: "sports-arena-39a32.appspot.com",
    messagingSenderId: "824217457615",
    appId: "1:824217457615:web:ffe4b462519b86accc38ba",
    measurementId: "G-GTFC067X5G",
    locationId: "europe-west"
};

initializeApp(firebaseConfig);

const { getStorage, ref, getDownloadURL, uploadString } = require("firebase/storage");

const cors = require('cors');
const corsHandler = cors({
    origin: true,
    methods: ['DELETE', 'PUT', 'GET', 'POST', 'OPTIONS'],
    // allowedHeaders: ['Content-Type', 'Authorization'],
    maxAge: 3600, // Cache preflight response for 1 hour
});

async function getRef_json(refItem) {
    const url = await getDownloadURL(refItem);
    const response = await fetch(url, { mode: 'cors' });
    let data = await response.text();
    data = JSON.parse(data);
    return data;
}

// ! global
const storage = getStorage();
const userCreds = ref(storage, 'userCreds.json');
const facilities = ref(storage, 'facilities.json');
const clubBookings = ref(storage, 'clubBookings.json');
const currentUser = ref(storage, 'currentUser.json')

async function loadInfo() {
    return await Promise.resolve(getRef_json(userCreds));
}

async function loadFacilitiesInfo() {
    return await Promise.resolve(getRef_json(facilities));
}

async function loadClubsInfo() {
    return await Promise.resolve(getRef_json(clubBookings));
}

// you win daniel 💀
async function loadCurrentUserInfo() {
    return await Promise.resolve(getRef_json(currentUser));
}

function missingInfoWarning(arr) {
    let missingItems = [];
    for (var item in arr) {
        if (!item) {
            missingItems.push(item)
        }
    }

    return missingItems
}

function findUserProfile(db, client_username) {
    let res = undefined;
    for (const key in db) {
        const valid_username = bcrypt.compareSync(client_username, key)
        if (valid_username) {
            res = db[key];
            break
        }
    }
    return res;
}

function find_db_username(db, client_username) {
    let res = undefined;
    for (const key in db) {
        let valid_username = bcrypt.compareSync(client_username, key)
        if (valid_username) {
            res = key
            break
        }
    }
    return res
}

exports.showDB = onRequest({ 'region': 'europe-west2' }, async (req, res) => {
    corsHandler(req, res, async () => {
        try {
            let db = await loadInfo();
            res.json(db);

        }
        catch (error) {
            console.log('Couldnt access the database: ', error)
            return res.status(500).json({ error: "Interal server error" })
        }
    })
});


exports.verifyUser = onRequest({ 'region': 'europe-west2' }, async (req, res) => {
    corsHandler(req, res, async () => {
        try {
            if (req.method != 'POST') {
                return res.status(405).json({ error: "Method not allowed" })
            }

            const username = req.body.username;
            const email = req.body.email;
            const password = req.body.password;

            const clientData = [username, email, password]
            const missingItems = missingInfoWarning(clientData);

            if (missingItems == []) {
                return res.status(200).json({ error: `${missingItems} is required in the JSON body` })
            }

            const db = await loadInfo();

            const userInfo = findUserProfile(db, username)

            if (userInfo != undefined) {
                const db_email = userInfo.email;
                const db_password = userInfo.password;

                if (email == undefined || password == undefined || username == undefined) {
                    return res.status(400).json({ error: "Username, Email and Passowrd is required in the JSON body" });
                }

                const db_current = await loadInfo(currentUser)

                const role = userInfo.role
                db_current[role] = {
                    [username]: {
                        userInfo
                    }
                }

                uploadString(currentUser, JSON.stringify(db_current), 'raw', { contentType: 'application/json' })

                let correctEmail = email == db_email
                let correctPassword = bcrypt.compareSync(password, db_password);
                let verdict = correctEmail && correctPassword;

                return res.status(200).json({
                    verdict,
                    correctEmail,
                    correctPassword,
                    role: userInfo.role
                });
            }

            else {
                return res.status(200).json({
                    'verdict': false
                });
            }
        }

        catch (error) {
            console.log("Couldnt has string: ", error)
            return res.status(500).json({ error: "Interal server error" })
        }
    })
});
function monthsAway() {
    const today = new Date();
    today.setMonth(today.getMonth() + 3);

    const day = today.getDate();
    const month = today.getMonth() + 1; // months are zero-based
    const year = today.getFullYear();

    return `${day}-${month}-${year}`;
}

exports.addUser = onRequest({ 'region': 'europe-west2' }, async (req, res) => {
    corsHandler(req, res, async () => {

        try {
            if (req.method != 'POST') {
                return res.status(405).json({ error: "Method not allowed" })
            }

            const client_username = req.body.username;
            const client_name = req.body.name;
            const client_email = req.body.email;
            const client_password = req.body.password;
            const client_role = req.body.role;

            const clientData = [client_username, client_name, client_email, client_password, client_role]
            const missingItems = missingInfoWarning(clientData);

            if (missingItems == []) {
                return res.status(200).json({ error: `${missingItems} is required in the JSON body` })
            }

            const db = await loadInfo();
            let isExistingUser = findUserProfile(db, client_username)

            if (isExistingUser != undefined) {
                return res.status(200).json({ error: `Account with email ${client_email} already exists` });
            }

            else {
                const saltRounds = 10;
                const username_hash = bcrypt.hashSync(client_username, saltRounds)
                const email_hash = bcrypt.hashSync(client_email, saltRounds)
                const password_hash = bcrypt.hashSync(client_password, saltRounds)
                const name_hash = bcrypt.hashSync(client_name, saltRounds)

                let newUser = {
                    [username_hash]:
                    {
                        email: email_hash,
                        name: name_hash,
                        password: password_hash,
                        role: client_role,
                        expiry_password: monthsAway() // no need to hash this
                    }
                }

                Object.assign(db, newUser)
                uploadString(userCreds, JSON.stringify(db), 'raw', { contentType: 'application/json' }).then(() => {
                    return res.status(200).json({
                        'verdict': `New user ${client_username} has been created`,
                        role: client_role
                    });
                });


            }
        }

        catch (error) {
            console.log("Couldnt add new user: ", error)
            return res.status(500).json({ error: "Interal server error" })
        }
    })
});

exports.updateDetails = onRequest({ 'region': 'europe-west2' }, async (req, res) => {
    corsHandler(req, res, async () => {
        try {
            if (req.method != 'POST') {
                return res.status(405).json({ error: "Method not allowed" })
            }

            const client_username = req.body.username;

            const email = req.body.email;
            const name = req.body.name;
            const password = req.body.password;

            const clientData = [email, name, password]
            const missingItems = missingInfoWarning(clientData);

            if (missingItems == []) {
                return res.status(200).json({ error: `${missingItems} is required in the JSON body` })
            }


            const db = await loadInfo();

            const db_username = find_db_username(db, client_username)

            if (db_username == undefined) {
                return res.status(200).json({
                    verdict: `No data for: ${client_username} was found on file`
                });
            }

            else {
                const userInfo = {
                    name,
                    email,
                    password: bcrypt.hashSync(password, 5)
                }

                db[db_username] = userInfo;

                uploadString(userCreds, JSON.stringify(db), 'raw', { contentType: 'application/json' }).then(() => {
                    return res.status(200).json({
                        'verdict': `Updated ${client_username}'s details successfully`
                    });
                });
            }
        }

        catch (error) {
            console.log("Couldnt add new user: ", error)
            return res.status(500).json({ error: "Interal server error" })
        }
    })
});

exports.bmr = onRequest({ 'region': 'europe-west2' }, async (req, res) => {
    corsHandler(req, res, async () => {
        try {
            if (req.method != 'POST') {
                return res.status(405).json({ error: "Method not allowed" })
            }

            const gender = req.body.gender;

            if (!gender) {
                return res.status(200).json({ error: 'Gender is required in the JSON body' })
            }

            const weight = Number(req.body.weight) * 2.205
            const height = Number(req.body.height) / 2.54
            const age = Number(req.body.age)

            if (!gender || !weight || !height || !age) {
                return res.status(400).json({ error: "Gender, weight, height and age is required in the JSON body" });
            }

            const male_result = Math.round((66 + (6.3 * weight) + (12.9 * height) - (6.8 * age)) * 100) / 100
            const female_result = Math.round((655 + (4.3 * weight) + (4.7 * height) - (6.8 * age)) * 100) / 100

            const final_result = gender == 'male' ? male_result : female_result;

            return res.status(200).json({
                bmr: final_result,
                gender: gender
            })

        }

        catch (error) {
            console.log("Couldnt calculate bmr: ", error)
            return res.status(500).json({ error: "Interal server error" })
        }
    })
})

exports.dailyCalories = onRequest({ 'region': 'europe-west2' }, async (req, res) => {
    corsHandler(req, res, async () => {
        try {
            if (req.method != 'POST') {
                return res.status(405).json({ error: "Method not allowed" })
            }

            let bmr = req.body.bmr;
            const description = req.body.description;

            if (!bmr) {
                return res.status(400).json({ error: "bmr is required in the JSON body" });
            }

            const factors = {
                'sedentary': 1.2,
                'lightly active ': 1.375,
                'moderately active': 1.55,
                'very active': 1.725,
                'extra active': 1.9,
            }

            const result = factors[description]
            if (result != undefined) {
                bmr = bmr * result;
                return res.status(200).json({ verdict: bmr })
            }
            else {
                return res.status(200).json({ verdict: 'Description not recognised' })
            }
        }
        catch (error) {
            console.log("Couldnt calculate bmr: ", error)
            return res.status(500).json({ error: "Interal server error" })
        }
    })
})


// can create and update
exports.setClubBooking = onRequest({ 'region': 'europe-west2' }, async (req, res) => {
    corsHandler(req, res, async () => {
        try {
            if (req.method == 'POST') {
                const { username, name, clubName, date, time, duration } = req.body

                const bookingData = {
                    name,
                    clubName,
                    date,
                    time,
                    duration
                }

                const db_club = await loadClubsInfo()
                const profile = db_club[clubName].bookings[username]
                if (profile == undefined) db_club[clubName].bookings[username] = {}

                const bookings = db_club[clubName].bookings[username]
                const id = Object.keys(bookings).length + 1

                db_club[clubName].bookings[username][id] = bookingData

                uploadString(clubBookings, JSON.stringify(db_club), 'raw', { contentType: 'application/json' }).then(() => {
                    return res.status(200).json({
                        verdict: `${username} has booked ${clubName} successfully booked!`,
                        bookingData
                    });
                });

            }

            if (req.method == 'GET') {
                const db = await loadClubsInfo();
                return res.status(200).json({ db })
            }
        }

        catch (error) {
            console.log("Couldnt make booking: ", error)
            return res.status(500).json({ error: "Interal server error" })
        }
    })
})

exports.removeClubBooking = onRequest({ 'region': 'europe-west2' }, async (req, res) => {
    corsHandler(req, res, async () => {
        try {
            const { username, id, clubName } = req.body;
            const db = await loadClubsInfo()

            delete db[clubName].bookings[username][id]

            uploadString(clubBookings, JSON.stringify(db), 'raw', { contentType: 'application/json' }).then(() => {
                return res.status(200).json({
                    verdict: `${username} has removed booking with id: ${id}!`
                });
            });
        }
        catch (error) {
            console.log("Couldnt remove booking: ", error)
            return res.status(500).json({ error: "Interal server error" })
        }
    })
})

// WIP for booking facilities
exports.bookFacility = onRequest({ 'region': 'europe-west2' }, async (req, res) => {
    corsHandler(req, res, async () => {
        try {
            if (req.method == 'POST') {
                const { description, clubID, facilityID, datetime, duration } = req.body;

                if (!description || !clubID || !facilityID || !datetime || !duration) {
                    return res.status(400).json({ error: "Description, clubID, facilityID, datetime and duration are all required!" });
                }

                const bookingDateTime = new Date(datetime);
                const clubsData = await loadClubsInfo();

                const club = clubsData[clubID];
                if (!club) {
                    return res.status(404).json({ error: `Club with ID ${clubID} does not exist!` });
                }

                const facilityBooked = club.bookings.find(booking => {
                    return booking.facilityID === facilityID;
                });

                const isOverlapping = club.bookings.some(booking => {
                    const bookingStart = new Date(booking.datetime);
                    const bookingEnd = new Date(bookingStart.getTime() + booking.duration * 60000);
                    const newBookingEnd = new Date(bookingDateTime.getTime() + duration * 60000);

                    return (bookingDateTime < bookingEnd && newBookingEnd > bookingStart);
                });

                if (isOverlapping) {
                    return res.status(400).json({ error: "The facility is already booked for this time slot!" });
                }

                const newBooking = {
                    description,
                    facilityID,
                    datetime: bookingDateTime.toISOString(),
                    duration
                };
                club.bookings.push(newBooking);
                uploadString(clubBookings, JSON.stringify(clubsData), 'raw', { contentType: 'application/json' }).then(() => {
                    return res.status(200).json({
                        verdict: `Facility ${facilityID} at Club ${clubID} successfully booked!`,
                        newBooking
                    });
                });
            }
        }
        catch (error) {
            console.log("Could not book the facility: ", error);
            return res.status(500).json({ error: "Internal server error" });
        }
    })
});

exports.createFacility = onRequest({ 'region': 'europe-west2' }, async (req, res) => {
    corsHandler(req, res, async () => {
        try {
            if (req.method == 'POST') {
                const { facilityID, location } = req.body;

                if (!facilityID || !location) {
                    return res.status(400).json({ error: "facilityID and location are required!" });
                }

                const facilitiesData = await loadFacilitiesInfo();

                if (facilitiesData[facilityID]) {
                    return res.status(400).json({ error: `Facility with ID ${facilityID} already exists!` });
                }

                facilitiesData[facilityID] = { location };

                uploadString(facilities, JSON.stringify(facilitiesData), 'raw', { contentType: 'application/json' }).then(() => {
                    return res.status(200).json({
                        message: `Facility ${facilityID} successfully created!`,
                        newFacility: facilitiesData[facilityID]
                    });
                });
            }
        }
        catch (error) {
            console.log("Could not create the facility: ", error);
            return res.status(500).json({ error: "Internal server error" });
        }
    })
});

exports.updateFacility = onRequest({ 'region': 'europe-west2' }, async (req, res) => {
    corsHandler(req, res, async () => {
        try {
            if (req.method == 'PUT') {
                const { facilityID, newLocation } = req.body;

                if (!facilityID || !newLocation) {
                    return res.status(400).json({ error: "facilityID and newLocation are required!" });
                }

                const facilitiesData = await loadFacilitiesInfo();

                const facility = facilitiesData[facilityID];
                if (!facility) {
                    return res.status(404).json({ error: `Facility with ID ${facilityID} does not exist!` });
                }

                facility.location = newLocation;

                uploadString(facilities, JSON.stringify(facilitiesData), 'raw', { contentType: 'application/json' }).then(() => {
                    return res.status(200).json({
                        message: `Facility ${facilityID} successfully updated!`,
                        updatedFacility: facility
                    });
                });
            }
        }
        catch (error) {
            console.log("Could not update the facility: ", error);
            return res.status(500).json({ error: "Internal server error" });
        }
    })
});

exports.deleteFacility = onRequest({ 'region': 'europe-west2' }, async (req, res) => {
    corsHandler(req, res, async () => {
        try {
            if (req.method == 'DELETE') {
                const { facilityID } = req.body;

                if (!facilityID) {
                    return res.status(400).json({ error: "facilityID is required!" });
                }

                const facilitiesData = await loadFacilitiesInfo();

                const facility = facilitiesData[facilityID];
                if (!facility) {
                    return res.status(404).json({ error: `Facility with ID ${facilityID} does not exist!` });
                }

                delete facilitiesData[facilityID];
                uploadString(facilities, JSON.stringify(facilitiesData), 'raw', { contentType: 'application/json' }).then(() => {
                    return res.status(200).json({
                        message: `Facility ${facilityID} successfully deleted!`
                    });
                });
            }
        } catch (error) {
            console.log("Could not delete the facility: ", error);
            return res.status(500).json({ error: "Internal server error" });
        }
    })
});

exports.showAllFacilities = onRequest({ 'region': 'europe-west2' }, async (req, res) => {
    corsHandler(req, res, async () => {
        try {
            if (req.method == 'GET') {
                const facilitiesData = await loadFacilitiesInfo();

                if (Object.keys(facilitiesData).length === 0) {
                    return res.status(404).json({ message: "No facilities available!" });
                }

                return res.status(200).json({
                    facilities: facilitiesData
                });
            }
        }
        catch (error) {
            console.log("Could not retrieve facilities: ", error);
            return res.status(500).json({ error: "Internal server error" });
        }
    })
});

exports.showAllClubs = onRequest({ 'region': 'europe-west2' }, async (req, res) => {
    corsHandler(req, res, async () => {
        try {
            if (req.method == 'GET') {
                const clubsData = await loadClubsInfo();

                if (Object.keys(clubsData).length === 0) {
                    return res.status(404).json({ message: "No clubs available!" });
                }

                return res.status(200).json({
                    clubs: clubsData
                });
            }
        }
        catch (error) {
            console.log("Could not retrieve clubs: ", error);
            return res.status(500).json({ error: "Internal server error" });
        }
    })
});

exports.createClub = onRequest({ 'region': 'europe-west2' }, async (req, res) => {
    corsHandler(req, res, async () => {
        try {
            if (req.method == 'POST') {
                const { clubID, caloryBurnRate } = req.body;

                if (!clubID || !caloryBurnRate) {
                    return res.status(400).json({ error: "clubID and caloryBurnRate are required!" });
                }

                const clubsData = await loadClubsInfo();

                if (clubsData[clubID]) {
                    return res.status(400).json({ error: `Club with ID ${clubID} already exists!` });
                }

                clubsData[clubID] = { caloryBurnRate };

                uploadString(clubBookings, JSON.stringify(clubsData), 'raw', { contentType: 'application/json' }).then(() => {
                    return res.status(200).json({
                        message: `Club ${clubID} successfully created!`,
                        newClub: clubsData[clubID]
                    });
                });
            }
        }
        catch (error) {
            console.log("Could not create the club: ", error);
            return res.status(500).json({ error: "Internal server error" });
        }
    })
});

exports.updateClub = onRequest({ 'region': 'europe-west2' }, async (req, res) => {
    corsHandler(req, res, async () => {
        try {
            if (req.method == 'PUT') {
                const { clubID, newCaloryBurnRate } = req.body;

                if (!clubID || !newCaloryBurnRate) {
                    return res.status(400).json({ error: "clubID and newCaloryBurnRate are required!" });
                }

                const clubsData = await loadClubsInfo();

                const club = clubsData[clubID];
                if (!club) {
                    return res.status(404).json({ error: `Club with ID ${clubID} does not exist!` });
                }
                club.caloryBurnRate = newCaloryBurnRate;

                uploadString(clubBookings, JSON.stringify(clubsData), 'raw', { contentType: 'application/json' }).then(() => {
                    return res.status(200).json({
                        message: `Club ${clubID} successfully updated!`,
                        updatedClub: club
                    });
                });
            }
        }
        catch (error) {
            console.log("Could not update the club: ", error);
            return res.status(500).json({ error: "Internal server error" });
        }
    })
});

exports.deleteClub = onRequest({ 'region': 'europe-west2' }, async (req, res) => {
    corsHandler(req, res, async () => {
        try {
            if (req.method == 'DELETE') {
                const { clubID } = req.body;

                if (!clubID) {
                    return res.status(400).json({ error: "clubID is required!" });
                }

                const clubsData = await loadClubsInfo();
                const club = clubsData[clubID];
                if (!club) {
                    return res.status(404).json({ error: `Club with ID ${clubID} does not exist!` });
                }

                delete clubsData[clubID];
                uploadString(clubBookings, JSON.stringify(clubsData), 'raw', { contentType: 'application/json' }).then(() => {
                    return res.status(200).json({
                        message: `Club ${clubID} successfully deleted!`
                    });
                });
            }
        } catch (error) {
            console.log("Could not delete the club: ", error);
            return res.status(500).json({ error: "Internal server error" });
        }
    })
});


/*
? to start the backend server run firebase eumlators:start" in "functions" folder
*/