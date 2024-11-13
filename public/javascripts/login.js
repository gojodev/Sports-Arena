const DarkReader = require('darkreader');

DarkReader.auto({
    brightness: 100,
    contrast: 100,
    darkSchemeTextColor: 'white',
});

async function verifyUser(username, email, password) {
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
        return userData;
    } catch (error) {
        console.error('Error fetching user data:', error);
    }
}

function errorHandler(error_message) {
    document.getElementById("errorContainer").style.display = "block"
    document.getElementById("error-message").innerHTML = error_message
}

let loginButton = document.getElementById('loginButton')
loginButton.addEventListener('click', async (event) => {

    // Prevent the form from refreshing the page
    event.preventDefault();

    let username = document.getElementById("username").value
    let email = document.getElementById("email").value
    let password = document.getElementById("password").value
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

    if (error_message != "") {
        console.log(error_message)
        errorHandler(error_message)
    }
    else {
        let response = await verifyUser(username, email, password);

        console.log('role : ', response.role)
        console.log(response);
        if (response.verdict) {
            if (response.role === "member") {
                document.location.href = "memberhomepage.html";
            }
            if (response.role === "trainer") {
                document.location.href = "trainerhomepage.html";
            }
        }
        else {
            errorHandler("Authentication error!");
            console.log(response.role, 'trainer', response.role === 'trainer' )
        }
    }
})

function autofill() {
    document.getElementById("username").value = "user3"
    document.getElementById("email").value = "user3@gmail.com"
    document.getElementById("password").value = "user3_password!"
}

autofill()


// gsutil cors set cors.json gs://sports-arena-39a32.appspot.com