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

const userCreds_data = {
    "$2b$10$jP.JE.3Mr1TIzWzwdXzsSuD9gbBk7aQ/ojq3cxyPhy/7L31J.lQkW": {
        "email": "user1@gmail.com",
        "name": "First1 Last1",
        "password": "$2b$10$pXeT04LdC34Yh4rBg58HPeRbfML3Xyj96I41pIHP385SLamOgZlZ6",
        "role": "member",
        "bmr": "1000",
        "gender": "male",
        "age": "21",
        "weight": "71",
        "height": "201",
        "address": "address1",
        "phone": "111 111 1111",
        "expiry_password": "31-1-2025"
    },
    "$2b$10$xrAAbCTxr1EDkk8Et4W1ueBCZ5tFNuFXwDZEQ603iPfPbZXlde1yO": {
        "email": "user2@gmail.com",
        "name": "First2 Last2",
        "password": "$2b$10$4RgP4MkVxJa3aiTUXnqb1ueB6oHSsFWJstPqY209E/6o5lSMjO1AC",
        "role": "member",
        "bmr": "1000",
        "gender": "female",
        "age": "22",
        "weight": "72",
        "height": "202",
        "address": "address2",
        "phone": "222 222 2222",
        "expiry_password": "31-1-2025"
    },
    "$2b$10$M3Q1B4ijUJmUffm0.aksU.wMp7SEzXyQsX56NvFwSuYDq9..ZpjC.": {
        "email": "user3@gmail.com",
        "name": "First3 Last3",
        "password": "$2b$10$FaM0ZntOgPjp8kbfHSGgkev1tl1GrvLuDaAKZc9GjyJQcWC.FuvF.",
        "role": "trainer",
        "bmr": "1000",
        "gender": "other",
        "age": "23",
        "weight": "73",
        "height": "203",
        "address": "address3",
        "phone": "333 333 3333",
        "expiry_password": "31-1-2025"
    },
    "$2b$05$Qf3Xf21bjyhoQgXuN6LLUeVp0ZRn3oVknIYWKYcJb9kDUT5oZhPxi": {
        "name": "Daniel Jackson",
        "email": "$2b$10$.on7gm8yH0fXT5KY7lUozO9mTzBbczKeNPfbrsCDyZNxhR5pzKK9q",
        "password": "$2b$10$hgKrxkwaiY1RIKwE4njZHOo6OzOsgNlRKpkVL5EWjQ/3aSlceUQqu",
        "expiry_password": "$2b$10$wjwBtKg3WctMHchfbOWhU.uj/uVZf/qt08y3xJGtSExu7LT1D0vQG",
        "role": "admin"
    }
}

const clubBookings_data = {
    "Basketball Club": {
        "sport": "Basketball",
        "caloryBurnRate": 300,
        "trainer": "$2b$10$M3Q1B4ijUJmUffm0.aksU.wMp7SEzXyQsX56NvFwSuYDq9..ZpjC.",
        "bookings": {
            "training1": {
                "description": "Friday Beginner Training",
                "facilityID": "Basketball Court 1",
                "datetime": "2024-12-06T20:00:00.000Z",
                "duration": 60
            },
            "training2": {
                "description": "Friday Advanced Training",
                "facilityID": "Basketball Court 2",
                "datetime": "2024-12-06T20:00:00.000Z",
                "duration": 60
            },
            "advice3": {
                "description": "Professional advice for beginner players",
                "facilityID": "Trainer's Office",
                "datetime": "2024-12-06T18:00:00.000Z",
                "duration": 60
            },
            "advice4": {
                "description": "Professional advice for advanced players",
                "facilityID": "Trainer's Office",
                "datetime": "2024-12-06T17:00:00.000Z",
                "duration": 60
            }
        },
        "membersBooking": {}
    },
    "Hurling Club": {
        "sport": "GAA",
        "caloryBurnRate": 550,
        "trainer": "$2b$10$M3Q1B4ijUJmUffm0.aksU.wMp7SEzXyQsX56NvFwSuYDq9..ZpjC.",
        "bookings": {
            "training1": {
                "description": "Wednesday Night Training",
                "facilityID": "GAA Pitch 1",
                "datetime": "2024-12-11T21:00:00.000Z",
                "duration": 90
            }
        },
        "membersBooking": {}
    },
    "Tennis Club": {
        "sport": "Tennis",
        "caloryBurnRate": 500,
        "trainer": "$2b$10$M3Q1B4ijUJmUffm0.aksU.wMp7SEzXyQsX56NvFwSuYDq9..ZpjC.",
        "bookings": {
            "training1": {
                "description": "Tennis Fitness Conditioning",
                "facilityID": "Elite Gym",
                "datetime": "2024-12-26T15:00:00.000Z",
                "duration": 60
            }
        },
        "membersBooking": {}
    },
    "Powerlifting Club": {
        "sport": "Powerlifting",
        "caloryBurnRate": 650,
        "trainer": "$2b$10$M3Q1B4ijUJmUffm0.aksU.wMp7SEzXyQsX56NvFwSuYDq9..ZpjC.",
        "bookings": {},
        "membersBooking": {}
    },
    "Gaelic Football Club": {
        "sport": "GAA",
        "caloryBurnRate": 550,
        "trainer": "$2b$10$M3Q1B4ijUJmUffm0.aksU.wMp7SEzXyQsX56NvFwSuYDq9..ZpjC.",
        "bookings": {},
        "membersBooking": {}
    }
}

const storage = getStorage();
const userCreds = ref(storage, 'userCreds.json');
const clubBookings = ref(storage, 'clubBookings.json');


uploadString(userCreds, JSON.stringify(userCreds_data), 'raw', { contentType: 'application/json' }).then(() => {
    console.log("'userCreds.json' has been reset")
});

uploadString(clubBookings, JSON.stringify(clubBookings_data), 'raw', { contentType: 'application/json' }).then(() => {
    console.log("'clubBookings.json' has been reset")
});

