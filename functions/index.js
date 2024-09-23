// The Cloud Functions for Firebase SDK to create Cloud Functions and triggers.
const { logger } = require("firebase-functions");
const { onRequest } = require("firebase-functions/v2/https");
const { onDocumentCreated } = require("firebase-functions/v2/firestore");

// The Firebase Admin SDK to access Firestore.
const { initializeApp } = require("firebase/app");

const firebaseConfig = {
    apiKey: "AIzaSyBOPQ3euAts_r7tObkfMU_tUllIdTtGR48",
    authDomain: "sports-arena-39a32.firebaseapp.com",
    projectId: "sports-arena-39a32",
    storageBucket: "sports-arena-39a32.appspot.com",
    messagingSenderId: "824217457615",
    appId: "1:824217457615:web:ffe4b462519b86accc38ba",
    measurementId: "G-GTFC067X5G"
  };

initializeApp(firebaseConfig);

const { getStorage, ref, getDownloadURL, uploadString } = require("firebase/storage");
const { log } = require("firebase-functions/logger");

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

var credsArr;

async function loadInfo() {

    return await Promise.resolve(getRef_json(userCreds));
}

function isUser(email) {
    let username = getUsername(email);
    return credsArr[username] != undefined;
}


// https://youtu.be/2u6Zb36OQjM?si=AFUnR5pPw9IQPzoG&t=511


exports.showDB = onRequest(async (req, res) => {
    // Grab the text parameter
    const original = req.query.text;

    const db = JSON.stringify(await loadInfo());
    res.json({ result: `${db}` });
    log(db);
    console.log(db)
});

// gcloud storage buckets update gs://BUCKET_NAME --default-storage-class=STORAGE_CLASS