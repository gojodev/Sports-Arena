const bcrypt = require('bcrypt');

const data = {
    "bmr": "1000",
    "gender": "other",
    "age": "23",
    "weight": "73",
    "height": "203",
    "address": "address3",
    "phone": "333 333 3333",
    "expiry_password": "31-1-2025",
    "bookings": []
};

const saltRounds = 5;
const hashedData = {};

for (const key in data) {
    if (typeof data[key] === 'string') {
        hashedData[key] = bcrypt.hashSync(data[key], saltRounds);
    } else {
        hashedData[key] = data[key];
    }
}


console.log(JSON.stringify(hashedData, null, 4));
