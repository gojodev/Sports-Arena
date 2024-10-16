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

async function loadInfo() {
    return await Promise.resolve(getRef_json(userCreds));
}

exports.showDB = onRequest({ 'region': 'europe-west2' }, async (req, res) => {
    try {
        let db = await loadInfo();
        res.json(db);

    }
    catch (error) {
        console.log('Couldnt access the database: ', error)
        res.status(500).json({ error: "Interal server error" })
    }
});


exports.verifyUser = onRequest({ 'region': 'europe-west2' }, async (req, res) => {
    try {
        if (req.method != 'POST') {
            res.status(405).json({ error: "Method not allowed" })
        }

        const client_username = req.body.username;
        const client_email = req.body.email;
        const client_password = req.body.password;

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
                res.status(400).json({ error: "Username, Email and Passowrd is required in the JSON body" });
            }

            let correctEmail = bcrypt.compareSync(client_email, db_email);
            let correctPassword = bcrypt.compareSync(client_password, db_password);
            let verdict = correctEmail && correctPassword;

            res.status(200).json({
                'verdict': verdict,
                'username': client_username,
                'creds': db[key]
            });
        }

        else {
            res.status(200).json({
                'verdict': false
            });
        }
    }

    catch (error) {
        console.log("Couldnt has string: ", error)
        res.status(500).json({ error: "Interal server error" })
    }
});

async function verifyUser_client(username, email, password, isFundManager) {
    try {
        const response = await fetch('http://127.0.0.1:5001/sports-arena-39a32/europe-west2/verifyUser', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                username: username,
                email: email,
                password: password
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

exports.addUser = onRequest({ 'region': 'europe-west2' }, async (req, res) => {
    try {
        if (req.method != 'POST') {
            res.status(405).json({ error: "Method not allowed" })
        }

        const client_username = req.body.username;
        const client_email = req.body.email;
        const client_password = req.body.password;

        let isExistingUser = await verifyUser_client(client_username, client_email, client_password)

        if (isExistingUser) {
            res.status(200).json({ error: `Account with email ${client_email} already exists` });
        }

        else {
            const saltRounds = 10;
            const username_hash = bcrypt.hashSync(client_username, saltRounds)
            const email_hash = bcrypt.hashSync(client_email, saltRounds)
            const password_hash = bcrypt.hashSync(client_password, saltRounds)

            let newUser = {
                [username_hash]:
                {
                    email: email_hash,
                    password: password_hash
                }
            }


            const db = await loadInfo();

            Object.assign(db, newUser)

            uploadString(userCreds, JSON.stringify(db)).then(() => {
                res.status(200).json({
                    'verdict': `New user ${client_username} has been created`,
                });
            });
        }
    }

    catch (error) {
        console.log("Couldnt add new user: ", error)
        res.status(500).json({ error: "Interal server error" })
    }
});

/* 
http://127.0.0.1:5001/sports-arena-39a32/europe-west2/showDB
http://127.0.0.1:5001/sports-arena-39a32/europe-west2/verifyUser
http://127.0.0.1:5001/sports-arena-39a32/europe-west2/addUser
*/

/*
? to start the backend server run "npm run start" or "firebase eumlators:start" in "functions" folder
*/