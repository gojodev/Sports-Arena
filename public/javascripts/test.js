let data = {
  "user1": {
    "email": "user1@gmail.com",
    "name": "First1 Last1",
    "password": "user1_password!",
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
  }
};


data.user2 = data["user1"];
delete data["user1"];

console.log(data);
