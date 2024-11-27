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
        "BMR": "$2b$05$J01BQMcdNh6NMo9.6xl4sOjDTuRQMRncLI3MxVVg25Hl5A0NdphQi",
        "gender": "$2b$05$4SaW0cRjgJH1h1YFpBGQLul5SkndUSiF1/J.aHv7mheH5x6HL1IiO",
        "age": "$2b$05$XzFK4ydqOVE1pu96o5T.KOkocm1BpHtGYPy6mYo5KkK7cA.9Ckvo6",
        "weight": "$2b$05$B7Od74CCTBKBt8qtsxcC3uAxUD8d7xa0UxnBIQcCRFTLPb22k.zAC",
        "height": "$2b$05$VNXEWSL7PirC8IyWoSx6QeQm6XAXZql2yI8XcY.iwW467B.L9yC5u",
        "address": "$2b$05$rl1D99u7XQFNFMIZO/K7l.KQ7sHTnVB5KXKO3YDGqxk2BsG64AcWi",
        "phone": "$2b$05$d9KzBP78ImJeHcgzt8IMUubJDtsduWMXibH9VHXvDbXk1dtC7OnBS",
        "expiry_password": "$2b$05$CLBuqW04nUg3DBMu6FdRj.goSmxGEZWYHVpV2SpMKV.lgzYY9fiiu",
        "bookings": []
    },
    "$2b$10$xrAAbCTxr1EDkk8Et4W1ueBCZ5tFNuFXwDZEQ603iPfPbZXlde1yO": {
        "email": "$2b$10$CFkRPr3vidyezi5ySLR.0OkM30pjdj.cyB4wTnB4kUVIMIpeN0fOC",
        "name": "$2b$05$pOayBiURli75wDqkuCJck.bgnT0PlD4pyby.wdE9RiND1zWyGJcTi",
        "password": "$2b$10$4RgP4MkVxJa3aiTUXnqb1ueB6oHSsFWJstPqY209E/6o5lSMjO1AC",
        "role": "member",
        "BMR": "$2b$05$cUS4ZC/VZDLjr1vY6hZLoOrIKW5DQhVF.w1HRKZf7f7lpTqcI4Xqy",
        "gender": "$2b$05$EGhWp91skjDKAm/NYWdTiOJEfIl8qHVVEjOOBh.IcAahEGmT6Jgr.",
        "age": "$2b$05$7bQOsVubTnUIbh7LwpShUO5omujA6A.s1wV2L.Cr1rfoYKHL/1Or6",
        "weight": "$2b$05$Rvi/wj/acB60llfPI6OvR.lozlW0V5dKz6fHAZtPWiYhJoUsusg8u",
        "height": "$2b$05$6xjeOHxH/rVerotl3y1QpOb/nA0kdkx9tlpOjZFf9sqSV25XcWaLm",
        "address": "$2b$05$qHkZTfWYrPt6Q6fFcUG2eulwuMHewiYdSSbZ5n.ICaGPefwz6pzKy",
        "phone": "$2b$05$U9C2rFBHkdkNoDKLhu7UgOkal0.52PKRTQ80.X1sj9YJyjxht4wbS",
        "expiry_password": "$2b$05$YShUCLxgRu2uQjNbR1JfgeKyAqFkA38m8k.w3PswVVR10lSJdPJsq",
        "bookings": []
    },
    "$2b$10$M3Q1B4ijUJmUffm0.aksU.wMp7SEzXyQsX56NvFwSuYDq9..ZpjC.": {
        "email": "$2b$10$8D7RDO4BEkVECUYbcrAwVOvihadliOw6ub4mb6y61XRdN6YAbZtVq",
        "name": "$2b$05$921DqMKRvdzZlzCNwk11ee2EEshLHCy81MWv22A4TqIuRw1h74J6q",
        "password": "$2b$10$FaM0ZntOgPjp8kbfHSGgkev1tl1GrvLuDaAKZc9GjyJQcWC.FuvF.",
        "role": "trainer",
        "BMR": "$2b$05$nPG9C7y1MkPzR/hkCdb19eAJqN1lBBZkTYVn/ftPhebINNZBLpqmm",
        "gender": "$2b$05$tZbVaJBRD5KLhs.TwPauIeBRBqBFHDq/Iatk5oJQcVrl5WUqrmmGm",
        "age": "$2b$05$ffdfYFNrBhlH6xnO7mL/kOHvybHbNcLVJKNSDADRnJL.ocnLNA7KO",
        "weight": "$2b$05$iSFD8M1UCbdh9S.Ty0a1fesrdK6xM5joFBn81j8eIPSsRGEIrE1Xu",
        "height": "$2b$05$tFCK0HE./AdVShLqnWM2veCrYqoxwYQCGWDqsE.w4TA3HgYZBFSy.",
        "address": "$2b$05$yJVMaQsLzSBuZHi1YdgUmuQzfbn6WzXYUtDpTKdgLFqRalI2DQ0ya",
        "phone": "$2b$05$zD6zLZuLtZ7n9FUumwyAWu81/nWgdmSFfK6UR8uCBkntpiNcCG7Vq",
        "expiry_password": "$2b$05$uyD/boXwxxQkwNjzbhzxhe2nesD2lp.mAHiLvdZqJS7MJmbdsmDtm",
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

