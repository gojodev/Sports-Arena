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

const storage = getStorage();
const userCreds = ref(storage, 'userCreds.json');

async function getRef_json(refItem) {
    const url = await getDownloadURL(refItem);
    const response = await fetch(url, { mode: 'cors' });
    let data = await response.text();
    data = JSON.parse(data);
    return data;
}

async function loadInfo() {
    return await Promise.resolve(getRef_json(userCreds));
}

async function test() {
    const db = await loadInfo();

    console.log(db)

    for (var key in userCreds) {
        db_username = bcrypt.compareSync(client_username, key)
        if (db_username) break
    }
    const userInfo = db[db_username];

}

test()