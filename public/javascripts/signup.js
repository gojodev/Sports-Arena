const DarkReader = require('darkreader');

DarkReader.auto({
    brightness: 100,
    contrast: 100,
    darkSchemeTextColor: 'white',
});

async function addUser(username, name, email, password, BMR, gender, age, weight, height, address, phone, role) {
    try {
        const response = await fetch('http://127.0.0.1:5001/sports-arena-39a32/europe-west2/addUser', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                username,
                name,
                email,
                password,
                BMR,
                gender,
                age,
                weight,
                height,
                address,
                phone,
                role
            }),
        });

        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const userData = await response.json();
        return userData;
    } catch (error) {
        console.error('Error fetching user data:', error);
    }
}

function errorHandler(error_message) {
    document.getElementById("errorContainer").style.display = "block"
    document.getElementById("error-message").innerHTML = error_message
}

let signUpButton = document.getElementById('signUpButton')
signUpButton.addEventListener('click', async (event) => {

    // Prevent the form from refreshing the page
    event.preventDefault();

    let username = document.getElementById("username").value
    let email = document.getElementById("email").value
    let name = document.getElementById("name").value
    let password = document.getElementById("password").value

    let BMR = document.getElementById("BMR").value
    let gender = document.getElementById("gender").value
    let age = document.getElementById("age").value
    let weight = document.getElementById("weight").value
    let height = document.getElementById("height").value
    let address = document.getElementById("address").value
    let phone = document.getElementById("phone").value
    let role = document.querySelector('input[name="role"]:checked').value;

    var error_message = "";

    // validate email
    if (!email.includes('@gmail.com')) {
        error_message = "typo in email, no '@gmail.com'"
    }

    if (username == "") {
        error_message += " Enter username"
    }
    if (email == "") {
        error_message += " Enter email"
    }
    if (password == "") {
        error_message += " Enter password"
    }

    // valiidate name
    if (name.split(" ").length != 2) {
        error_message = "Please enter first and last name"
    }

    if (error_message != "") {
        console.log(error_message)
        errorHandler(error_message)
    }
    else {
        let response = await addUser(username, name, email, password, BMR, gender, age, weight, height, address, phone, role);
        console.log(response);
        //errorHandler("User added successfully check console for more details");
        localStorage.setItem('username', username);
        localStorage.setItem('name', response.name);
        localStorage.setItem('role', response.role);

        if (response.role === "member") {
            document.location.href = "memberhomepage.html";
        }
        else if (response.role === "trainer") {
            document.location.href = "trainerhomepage.html";
        }
        else if (response.role === "admin") {
            document.location.href = "adminhomepage.html";
        }
    }
})

function autofill() {
    document.getElementById("username").value = "user4"
    document.getElementById("name").value = "first4 last4"
    document.getElementById("email").value = "user4@gmail.com"
    document.getElementById("password").value = "user4_password!"
    document.getElementById("BMR").value = "1100"
    document.getElementById("gender").value = "male"
    document.getElementById("age").value = "24"
    document.getElementById("weight").value = "74"
    document.getElementById("height").value = "250"
    document.getElementById("address").value = "address4"
    document.getElementById("phone").value = "444 444 4444"
    document.querySelector("role").value = "member"
}

autofill()