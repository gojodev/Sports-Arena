const DarkReader = require('darkreader');

DarkReader.auto({
    brightness: 100,
    contrast: 100,
    darkSchemeTextColor: 'white',
});

async function verifyUser(username, email, password) {
    try {
        const response = await fetch('https://verifyuser-77hki32qna-nw.a.run.app', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                username,
                email,
                password,
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

async function currentUser(username, email, password) {
    try {
        const response = await fetch('https://verifyuser-77hki32qna-nw.a.run.app', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                username,
                email,
                password,
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

    //retrieve failed login attempts from localStorage
    let failedAttempts = parseInt(localStorage.getItem('failedAttempts')) || 0;
    
    if (failedAttempts > 3){
        errorHandler("Maximum login attempts exceeded. Please try again later.");
        return;
    }

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
            localStorage.setItem('failedAttempts',0);
            console.log(response);
            
            localStorage.setItem('username', username);
            localStorage.setItem('name', response.name);
            localStorage.setItem('role', response.role);
            localStorage.setItem('bmr', response.bmr);
            localStorage.setItem('gender', response.gender);
            localStorage.setItem('age', response.age);
            localStorage.setItem('weight', response.weight);
            localStorage.setItem('height', response.height);
            localStorage.setItem('address', response.address);
            localStorage.setItem('phone', response.phone);

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
        else {
            failedAttempts++;
            localStorage.setItem('failedAttempts',failedAttempts);
            if (failedAttempts > 3){
                errorHandler("Maximum login attempts exceeded. Please try again later.");
            }else{
                errorHandler("Authentication error!");
            }
        }
    }
})

function autofill() {
    document.getElementById("username").value = "user2"
    document.getElementById("email").value = "user2@gmail.com"
    document.getElementById("password").value = "user2_password!"
}

autofill()

// gsutil cors set cors.json gs://sports-arena-39a32.appspot.com