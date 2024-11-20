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
const clubs = ref(storage, 'clubs.json');

async function loadInfo() {
    return await Promise.resolve(getRef_json(userCreds));
}

async function loadFacilitiesInfo() {
    return await Promise.resolve(getRef_json(facilities));
}

async function loadClubsInfo() {
    return await Promise.resolve(getRef_json(clubs));
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

exports.showDB = onRequest({ 'region': 'europe-west2' }, async (req, res) => {
    try {
        let db = await loadInfo();
        res.json(db);

    }
    catch (error) {
        console.log('Couldnt access the database: ', error)
        return res.status(500).json({ error: "Interal server error" })
    }
});


exports.verifyUser = onRequest({ 'region': 'europe-west2' }, async (req, res) => {

    corsHandler(req, res, async () => {
        try {
            if (req.method != 'POST') {
                return res.status(405).json({ error: "Method not allowed" })
            }

            const client_username = req.body.username;
            const client_email = req.body.email;
            const client_password = req.body.password;

            const clientData = [client_username, client_email, client_password]
            const missingItems = missingInfoWarning(clientData);

            if (missingItems == []) {
                return res.status(200).json({ error: `${missingItems} is required in the JSON body` })
            }

            let db_username = '';

            const db = await loadInfo();


            for (var key in db) {
                db_username = bcrypt.compareSync(client_username, key)
                if (db_username) {
                    db_username = key
                    break
                }
            }

            const userInfo = db[db_username];

            if (userInfo != undefined) {
                const db_email = userInfo.email;
                const db_password = userInfo.password;

                if (!client_email || !client_password || !client_username) {
                    return res.status(400).json({ error: "Username, Email and Passowrd is required in the JSON body" });
                }

                let correctEmail = bcrypt.compareSync(client_email, db_email);
                let correctPassword = bcrypt.compareSync(client_password, db_password);
                let verdict = correctEmail && correctPassword;

                return res.status(200).json({
                    'verdict': verdict,
                    'username': client_username,
                    'creds': db[key],
                    'role': db[key].role
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
async function verifyUser_client(username, email, password) {
    try {
        const response = await fetch('http://127.0.0.1:5001/sports-arena-39a32/europe-west2/verifyUser', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                username: username,
                email: email,
                password: password,
            }),
        });

        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const userData = await response.json();
        return userData.verdict;
    } catch (error) {
        console.error('Error fetching user data:', error);
    }
}

function monthsAway() {
    const today = new Date();
    today.setMonth(today.getMonth() + 3);

    const day = today.getDate();
    const month = today.getMonth() + 1; // months are zero-based
    const year = today.getFullYear();

    return `${day}-${month}-${year}`;
}

exports.addUser = onRequest({ 'region': 'europe-west2' }, async (req, res) => {
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

        let isExistingUser = await verifyUser_client(client_username, client_email, client_password)

        if (isExistingUser) {
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

            const db = await loadInfo();

            Object.assign(db, newUser)

            uploadString(userCreds, JSON.stringify(db)).then(() => {
                return res.status(200).json({
                    'verdict': `New user ${client_username} has been created`,
                    'newUser': newUser,
                });
            });
        }
    }

    catch (error) {
        console.log("Couldnt add new user: ", error)
        return res.status(500).json({ error: "Interal server error" })
    }
});

exports.updateDetails = onRequest({ 'region': 'europe-west2' }, async (req, res) => {
    try {
        if (req.method != 'POST') {
            return res.status(405).json({ error: "Method not allowed" })
        }

        const client_username = req.body.username;

        const new_email = req.body.new_email;
        const new_name = req.body.new_name;
        const new_password = req.body.new_password;

        const clientData = [new_email, new_name, new_password]
        const missingItems = missingInfoWarning(clientData);

        if (missingItems == []) {
            return res.status(200).json({ error: `${missingItems} is required in the JSON body` })
        }

        var db_username = '';

        let db = await loadInfo();

        for (var key in db) {
            db_username = bcrypt.compareSync(client_username, key)
            if (db_username) {
                db_username = key
                break
            }
        }

        if (db_username == false) {
            return res.status(200).json({
                verdict: `No data for: ${client_username} was found on file`
            });
        }

        else {
            const dbInfo = db[db_username];

            console.log("db dbInfo: ", dbInfo)

            const db_email = dbInfo.email;
            const db_name = dbInfo.name;
            const db_password = dbInfo.password;

            var userInfo = {

            }

            userInfo.email = bcrypt.hashSync(new_email, 5);

            if (!bcrypt.compareSync(new_email, db_email)) {
                userInfo.email = bcrypt.hashSync(new_email, 5);
            }

            if (!bcrypt.compareSync(new_name, db_name)) {
                userInfo.name = bcrypt.hashSync(new_name, 5);
            }

            if (!bcrypt.compareSync(new_password, db_password)) {
                userInfo.password = bcrypt.hashSync(new_password, 5);
            }

            db[db_username] = userInfo;

            uploadString(userCreds, JSON.stringify(db)).then(() => {
                return res.status(200).json({
                    'verdict': `Updated ${client_username}'s details successfully`,
                    'newDetails': userInfo
                });
            });
        }
    }

    catch (error) {
        console.log("Couldnt add new user: ", error)
        return res.status(500).json({ error: "Interal server error" })
    }
});

exports.BMR = onRequest({ 'region': 'europe-west2' }, async (req, res) => {
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
            BMR: final_result,
            gender: gender
        })

    }

    catch (error) {
        console.log("Couldnt calculate BMR: ", error)
        return res.status(500).json({ error: "Interal server error" })
    }
})

exports.dailyCalories = onRequest({ 'region': 'europe-west2' }, async (req, res) => {
    try {
        if (req.method != 'POST') {
            return res.status(405).json({ error: "Method not allowed" })
        }

        let BMR = req.body.BMR;
        const description = req.body.description;

        if (!BMR) {
            return res.status(400).json({ error: "BMR is required in the JSON body" });
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
            BMR = BMR * result;
            return res.status(200).json({ verdict: BMR })
        }
        else {
            return res.status(200).json({ verdict: 'Description not recognised' })
        }
    }
    catch (error) {
        console.log("Couldnt calculate BMR: ", error)
        return res.status(500).json({ error: "Interal server error" })
    }
})


exports.booking = onRequest({ 'region': 'europe-west2' }, async (req, res) => {
    try {
        if (req.method == 'POST') {

            const username = req.body.username;
            const club_name = req.body.club_name;
            const booking_date = req.body.booking_date;


            // ? remeber they just have to use at least one
            // todo POST add a new booking
            if (!club_name && !booking_date) {
                const clientData = [club_name, booking_date, username]
                const missingItems = missingInfoWarning(clientData);

                if (missingItems == []) {
                    return res.status(200).json({ error: `${missingItems} is required in the JSON body` })
                }
            }

        }


        // todo GET show bookings
        if (req.method == 'GET') {
            const db = loadInfo();

            return res.status(200).json({ db })
        }

    }

    catch (error) {
        console.log("Couldnt make booking: ", error)
        return res.status(500).json({ error: "Interal server error" })
    }
})

// WIP for booking facilities
exports.bookFacility = onRequest({ 'region': 'europe-west2' }, async (req, res) => {
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
            uploadString(clubs, JSON.stringify(clubsData)).then(() => {
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
});

exports.createFacility = onRequest({ 'region': 'europe-west2' }, async (req, res) => {
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

            uploadString(facilities, JSON.stringify(facilitiesData)).then(() => {
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
});

exports.updateFacility = onRequest({ 'region': 'europe-west2' }, async (req, res) => {
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

            uploadString(facilities, JSON.stringify(facilitiesData)).then(() => {
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
});

exports.deleteFacility = onRequest({ 'region': 'europe-west2' }, async (req, res) => {
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
            uploadString(facilities, JSON.stringify(facilitiesData)).then(() => {
                return res.status(200).json({
                    message: `Facility ${facilityID} successfully deleted!`
                });
            });
        }
    } catch (error) {
        console.log("Could not delete the facility: ", error);
        return res.status(500).json({ error: "Internal server error" });
    }
});

exports.showAllFacilities = onRequest({ 'region': 'europe-west2' }, async (req, res) => {
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
});

exports.showAllClubs = onRequest({ 'region': 'europe-west2' }, async (req, res) => {
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
});

exports.updateClub = onRequest({ 'region': 'europe-west2' }, async (req, res) => {
    try {
        if (req.method == 'PUT') {
            const { clubID, newName } = req.body;

            if (!clubID || !newName) {
                return res.status(400).json({ error: "clubID and newName are required!" });
            }

            const clubsData = await loadClubsInfo();

            const club = clubsData[clubID];
            if (!club) {
                return res.status(404).json({ error: `Club with ID ${clubID} does not exist!` });
            }
            club.name = newName;

            uploadString(clubs, JSON.stringify(clubsData)).then(() => {
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
});



/* 
http://127.0.0.1:5001/sports-arena-39a32/europe-west2/showDB
http://127.0.0.1:5001/sports-arena-39a32/europe-west2/verifyUser
http://127.0.0.1:5001/sports-arena-39a32/europe-west2/addUser
http://127.0.0.1:5001/sports-arena-39a32/europe-west2/updateDetails
http://127.0.0.1:5001/sports-arena-39a32/europe-west2/BMR
http://127.0.0.1:5001/sports-arena-39a32/europe-west2/dailyCalories


*/

/*
? to start the backend server run firebase eumlators:start" in "functions" folder
*/