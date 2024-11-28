const { getStorage, ref, uploadString } = require("firebase/storage");
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

const data = {
    "$2b$10$jP.JE.3Mr1TIzWzwdXzsSuD9gbBk7aQ/ojq3cxyPhy/7L31J.lQkW": {
        "email": "$2b$10$4Ve8ynoiv7V7tfwdcwPtF.EiOxGwumRbXOYdYrtfjjDkl78VvZJYm",
        "name": "$2b$05$10GAcozpi9K5e8PRAPoq7eL/wEuWpcZ0n8Ba9jLZXu0GUKQXL5TZ6",
        "password": "$2b$10$pXeT04LdC34Yh4rBg58HPeRbfML3Xyj96I41pIHP385SLamOgZlZ6",
        "role": "member",
        "bmr": "1000",
        "gender": "male",
        "age": "21",
        "weight": "71",
        "height": "201",
        "address": "address1",
        "phone": "111 111 1111",
        "expiry_password": "31-1-2025",
        "bookings": []
    },
    "$2b$10$xrAAbCTxr1EDkk8Et4W1ueBCZ5tFNuFXwDZEQ603iPfPbZXlde1yO": {
        "email": "$2b$10$CFkRPr3vidyezi5ySLR.0OkM30pjdj.cyB4wTnB4kUVIMIpeN0fOC",
        "name": "$2b$05$pOayBiURli75wDqkuCJck.bgnT0PlD4pyby.wdE9RiND1zWyGJcTi",
        "password": "$2b$10$4RgP4MkVxJa3aiTUXnqb1ueB6oHSsFWJstPqY209E/6o5lSMjO1AC",
        "role": "member",
        "bmr": "1000",
        "gender": "female",
        "age": "22",
        "weight": "72",
        "height": "202",
        "address": "address2",
        "phone": "222 222 2222",
        "expiry_password": "31-1-2025",
        "bookings": []
    },
    "$2b$10$M3Q1B4ijUJmUffm0.aksU.wMp7SEzXyQsX56NvFwSuYDq9..ZpjC.": {
        "email": "$2b$10$8D7RDO4BEkVECUYbcrAwVOvihadliOw6ub4mb6y61XRdN6YAbZtVq",
        "name": "$2b$05$921DqMKRvdzZlzCNwk11ee2EEshLHCy81MWv22A4TqIuRw1h74J6q",
        "password": "$2b$10$FaM0ZntOgPjp8kbfHSGgkev1tl1GrvLuDaAKZc9GjyJQcWC.FuvF.",
        "role": "trainer",
        "bmr": "1000",
        "gender": "other",
        "age": "23",
        "weight": "73",
        "height": "203",
        "address": "address3",
        "phone": "333 333 3333",
        "expiry_password": "31-1-2025",
        "bookings": []
    },
    "admin": {
        "name": "$2b$10$4oLaWLq0ajJatRhqtbsw3epUVCyN6Y50lFiijxI8sjbHgkqYfHlUO",
        "email": "$2b$10$.on7gm8yH0fXT5KY7lUozO9mTzBbczKeNPfbrsCDyZNxhR5pzKK9q",
        "password": "$2b$10$hgKrxkwaiY1RIKwE4njZHOo6OzOsgNlRKpkVL5EWjQ/3aSlceUQqu",
        "expiry_password": "$2b$10$wjwBtKg3WctMHchfbOWhU.uj/uVZf/qt08y3xJGtSExu7LT1D0vQG",
        "role": "$2b$10$hgKrxkwaiY1RIKwE4njZHOo6OzOsgNlRKpkVL5EWjQ/3aSlceUQqu"
    }
}

const storage = getStorage();
const userCreds = ref(storage, 'userCreds.json');

uploadString(userCreds, JSON.stringify(data)).then(() => {
    console.log("'userCreds' database has been reset")
});

