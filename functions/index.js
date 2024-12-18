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

async function loaduserCreds() {
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

function findUserProfile(db, username) {
    let res = undefined;
    for (const key in db) {
        const valid_username = bcrypt.compareSync(username, key)
        if (valid_username) {
            res = db[key];
            break
        }
    }
    return res;
}

function find_db_username(db, username) {
    let res = undefined;
    for (const key in db) {
        let valid_username = bcrypt.compareSync(username, key)
        if (valid_username) {
            res = key
            break
        }
    }
    return res
}

function findTrainers(db) {
    let trainers = [];

    for (const key in db) {
        const user = db[key];
        if (user.role === 'trainer') {
            trainers.push({ key: key, name: user.name });
        }
    }
    return trainers;
}

async function findTrainerClubs(db, trainer_username) {
    let clubsWithTrainer = {};
    for (const clubID in db) {
        const club = db[clubID];
        const isMatch = bcrypt.compareSync(trainer_username, club.trainer);
        if (isMatch) {
            clubsWithTrainer[clubID] = club;
        }
    }
    return clubsWithTrainer;
}

exports.showDB = onRequest({ 'region': 'europe-west2' }, async (req, res) => {
    corsHandler(req, res, async () => {
        try {
            let db = await loaduserCreds();
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
            const { username, email, password } = req.body

            const clientData = [username, email, password]
            const missingItems = missingInfoWarning(clientData);

            if (missingItems == []) {
                return res.status(200).json({ error: `${missingItems} is required in the JSON body` })
            }

            const db = await loaduserCreds();

            const userInfo = findUserProfile(db, username)

            var correctEmail
            var correctPassword

            if (userInfo != undefined) {
                const db_email = userInfo.email;
                const db_password = userInfo.password;

                if (email == undefined || password == undefined || username == undefined) {
                    return res.status(400).json({ error: "Username, Email and Passowrd is required in the JSON body" });
                }

                const db_current = await loaduserCreds(currentUser)

                const role = userInfo.role
                db_current[role] = {
                    [username]: {
                        userInfo
                    }
                }

                uploadString(currentUser, JSON.stringify(db_current), 'raw', { contentType: 'application/json' })

                if (username == 'admin') {
                    correctEmail = bcrypt.compareSync(email, db_email)
                }
                else {
                    correctEmail = email == db_email

                }

                correctPassword = bcrypt.compareSync(password, db_password);
                var verdict = correctEmail && correctPassword;


                return res.status(200).json({
                    verdict,
                    role: userInfo.role,
                    name: userInfo.name,
                    bmr: userInfo.bmr,
                    gender: userInfo.gender,
                    age: userInfo.age,
                    weight: userInfo.weight,
                    height: userInfo.height,
                    address: userInfo.address,
                    phone: userInfo.phone
                });
            }

            else {
                return res.status(200).json({
                    'verdict': false,
                    correctEmail,
                    correctPassword
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


            const { username, name, email, password, BMR, gender, age, weight, height, address, phone, role } = req.body

            const clientData = [username, name, email, password, role]
            const missingItems = missingInfoWarning(clientData);

            if (missingItems == []) {
                return res.status(200).json({ error: `${missingItems} is required in the JSON body` })
            }

            const db = await loaduserCreds();
            let isExistingUser = findUserProfile(db, username)

            if (isExistingUser != undefined) {
                return res.status(200).json({ error: `Account with email ${email} already exists` });
            }

            else {
                const saltRounds = 10;
                const username_hash = bcrypt.hashSync(username, saltRounds)
                const password_hash = bcrypt.hashSync(password, saltRounds)

                let newUser = {
                    [username_hash]:
                    {
                        email,
                        name,
                        password: password_hash,
                        BMR, 
                        gender, 
                        age, 
                        weight, 
                        height, 
                        address, 
                        phone,
                        role,
                        expiry_password: monthsAway() // no need to hash this
                    }
                }

                Object.assign(db, newUser)
                uploadString(userCreds, JSON.stringify(db), 'raw', { contentType: 'application/json' }).then(() => {
                    return res.status(200).json({
                        'verdict': `New user ${username} has been created`,
                        role: role
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
                return res.status(405).json({ error: "Method not allowed" });
            }

            const client_username = req.body.username;
            const {
                BMR, 
                age, 
                weight, 
                height, 
                address, 
                phone, 
            } = req.body;


            const db = await loaduserCreds();
            const db_username = find_db_username(db, client_username);

            if (db_username == undefined) {
                return res.status(200).json({
                    verdict: `No data for: ${client_username} was found on file`
                });
            } 
            else {
                const userInfo = db[db_username];
                if (BMR) userInfo.BMR = BMR;
                if (age) userInfo.age = age;
                if (weight) userInfo.weight = weight;
                if (height) userInfo.height = height;
                if (address) userInfo.address = address;
                if (phone) userInfo.phone = phone;

                db[db_username] = userInfo;

                uploadString(userCreds, JSON.stringify(db), 'raw', { contentType: 'application/json' }).then(() => {
                    return res.status(200).json({
                        'verdict': `Updated ${client_username}'s details successfully`
                    });
                });
            }
        } 
        catch (error) {
            console.log("Couldn't update user details: ", error);
            return res.status(500).json({ error: "Internal server error" });
        }
    });
});


exports.setActivity = onRequest({ 'region': 'europe-west2' }, async (req, res) => {
    corsHandler(req, res, async () => {
        try {
            if (req.method == 'POST') {
                const { username, name, clubName, trainingSlot } = req.body

                const bookingData = {
                    name,
                    clubName,
                    trainingSlot
                }

                const db_club = await loadClubsInfo()
                if (db_club[clubName].membersBooking[username] == undefined) db_club[clubName].membersBooking[username] = {}
                const bookings = db_club[clubName].membersBooking[username]

                const isAlreadyBooked = Object.values(bookings).some(booking => booking.trainingSlot === trainingSlot);
                if (isAlreadyBooked) {
                    return res.status(400).json({
                        error: `${username} is already booked for this session in ${clubName}!`
                    });
                }

                const id = Object.keys(bookings).length + 1

                const isValidSlot = db_club[clubName].bookings[trainingSlot]

                if (isValidSlot == undefined) {
                    res.status(200).json({ warning: `the trainnigSlot : ${trainingSlot} does not exist available slots : ${Object.keys(db_club[clubName].bookings)}` })
                }
                else {
                    db_club[clubName].membersBooking[username][id] = bookingData

                    uploadString(clubBookings, JSON.stringify(db_club), 'raw', { contentType: 'application/json' }).then(() => {
                        return res.status(200).json({
                            verdict: `${username} has been booked for the session in ${clubName} successfully!`,
                            bookingData
                        });
                    });
                }
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

exports.removeActivity = onRequest({ 'region': 'europe-west2' }, async (req, res) => {
    corsHandler(req, res, async () => {
        try {
            const { username, trainingSlot, clubName } = req.body;
            const db = await loadClubsInfo();

            const validIds = Object.keys(db[clubName].membersBooking[username]);
            const userBookings = db[clubName].membersBooking[username];

            const bookingsToRemove = Object.keys(userBookings).filter(id => userBookings[id].trainingSlot === trainingSlot);

            if (bookingsToRemove.length === 0) {
                return res.status(200).json({
                    verdict: `No bookings found for the training slot "${trainingSlot}" for user "${username}". Valid IDs: ${validIds}`
                });
            }
            bookingsToRemove.forEach(id => {
                delete userBookings[id];
            });
            uploadString(clubBookings, JSON.stringify(db), 'raw', { contentType: 'application/json' }).then(() => {
                return res.status(200).json({
                    verdict: `${username} has removed all bookings for the session in ${clubName}!`
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
                const { description, clubID, facilityID, datetime, duration, bookingType } = req.body;

                if (!description || !clubID || !facilityID || !datetime || !duration || !bookingType) {
                    return res.status(400).json({ error: "Description, clubID, facilityID, datetime, duration and booking type are all required!" });
                }

                const bookingDateTime = new Date(datetime);
                const clubsData = await loadClubsInfo();

                const club = clubsData[clubID];
                if (!club) {
                    return res.status(404).json({ error: `Club with ID ${clubID} does not exist!` });
                }

                let isFacilityBooked = false;

                for (let clubID in clubsData) {
                    const currentClub = clubsData[clubID];
                    const bookingsArray = Object.values(currentClub.bookings);

                    for (let booking of bookingsArray) {
                        if (booking.facilityID === facilityID) {
                            const bookingStart = new Date(booking.datetime);
                            const bookingEnd = new Date(bookingStart.getTime() + booking.duration * 60000);
                            const newBookingEnd = new Date(bookingDateTime.getTime() + duration * 60000);

                            if (bookingDateTime < bookingEnd && newBookingEnd > bookingStart) {
                                isFacilityBooked = true;
                                break;
                            }
                        }
                    }

                    if (isFacilityBooked) break;
                }

                if (isFacilityBooked) {
                    return res.status(400).json({ error: "The facility is not available for this timeslot!" });
                }

                const existingBookings = Object.keys(club.bookings);
                let nextKey = `${bookingType}1`; 

                if (existingBookings.length > 0) {
                    const lastKey = existingBookings[existingBookings.length - 1];
                    const match = lastKey.match(/(\d+)$/);
                    if (match) {
                        const lastIndex = parseInt(match[1], 10);
                        nextKey = `${bookingType}${lastIndex + 1}`;
                    }
                }

                const newBooking = {
                    description,
                    facilityID,
                    datetime: bookingDateTime.toISOString(),
                    duration
                };
                club.bookings[nextKey] = newBooking;

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
            return res.status(500).json({ error: error });
        }
    })
});

exports.deleteFacilityBooking = onRequest({ 'region': 'europe-west2' }, async (req, res) => {
    corsHandler(req, res, async () => {
        try {
            if (req.method == 'DELETE') {
                const { bookingID, clubID } = req.body;

                if (!bookingID || !clubID) {
                    return res.status(400).json({ error: "bookingID and clubID are required!" });
                }

                const clubsData = await loadClubsInfo();

                const club = clubsData[clubID];
                if (!club) {
                    return res.status(404).json({ error: `Club with ID ${clubID} does not exist!` });
                }

                const bookingToDelete = club.bookings[bookingID];
                if (!bookingToDelete) {
                    return res.status(404).json({ error: `Booking with ID ${bookingID} does not exist for this club!` });
                }

                delete club.bookings[bookingID];

                uploadString(clubBookings, JSON.stringify(clubsData), 'raw', { contentType: 'application/json' }).then(() => {
                    return res.status(200).json({
                        message: `Booking with ID ${bookingID} at Club ${clubID} successfully deleted!`
                    });
                });
            }
        }
        catch (error) {
            console.log("Error during facility booking deletion: ", error);
            return res.status(500).json({ error: "Internal server error while processing the delete request" });
        }
    });
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
                const { clubID, sport, caloryBurnRate, trainer } = req.body;

                if (!clubID || !sport || !caloryBurnRate || !trainer) {
                    return res.status(400).json({ error: "clubID, sport and caloryBurnRate are required!" });
                }

                const clubsData = await loadClubsInfo();

                if (clubsData[clubID]) {
                    return res.status(400).json({ error: `Club with ID ${clubID} already exists!` });
                }

                clubsData[clubID] = { sport, caloryBurnRate, trainer };

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
                const { clubID, newSport, newCaloryBurnRate } = req.body;

                if (!clubID || !newCaloryBurnRate || !newSport) {
                    return res.status(400).json({ error: "clubID, newSport and newCaloryBurnRate are required!" });
                }

                const clubsData = await loadClubsInfo();

                const club = clubsData[clubID];
                if (!club) {
                    return res.status(404).json({ error: `Club with ID ${clubID} does not exist!` });
                }
                club.sport = newSport;
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

exports.fetchTrainerNames = onRequest({ 'region': 'europe-west2' }, async (req, res) => {
    corsHandler(req, res, async () => {
        try {
            if (req.method == 'GET') {
                const db = await loaduserCreds();
                const trainers = findTrainers(db);
                res.json(trainers);
            }
        }
        catch (error) {
            console.log("Could not retrieve trainer names: ", error);
            return res.status(500).json({ error: "Internal server error" });
        }
    })
});

exports.fetchTrainerClubs = onRequest({ 'region': 'europe-west2' }, async (req, res) => {
    corsHandler(req, res, async () => {
        try {
            if (req.method == 'GET') {
                const { trainerUsername } = req.query;
                if (!trainerUsername) {
                    return res.status(400).json({ error: "Trainer username is required!" });
                }

                const db = await loadClubsInfo();
                const trainerClubs = await findTrainerClubs(db, trainerUsername);
                res.json({ trainerClubs });
            }
        }
        catch (error) {
            console.log("Could not retrieve trainer clubs: ", error);
            return res.status(500).json({ error: "Internal server error" });
        }
    })
});


/*
? to start the backend server run firebase eumlators:start" in "functions" folder
*/