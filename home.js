import { initializeApp } from "firebase/app";
import { getStorage, ref, getDownloadURL, uploadString } from "firebase/storage";

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

// ! GLOBAL
var email = document.getElementById('email');
var password = document.getElementById('password');
var emailtext
var passwordtext
var username
var status = "";
var userCrds

async function getRef_json(refItem) {
    const url = await getDownloadURL(refItem);
    const response = await fetch(url, { mode: 'cors' });
    let data = await response.text();
    data = JSON.parse(data);
    return data;
}

// ? may need this later
async function getRef_text(refItem) {
    const url = await getDownloadURL(refItem);
    const response = await fetch(url, { mode: 'cors' });
    let data = await response.text();
    return data;
}

function getUsername(email) {
    // todo validate email inputs
    return email.split('@gmail.com')[0];
}

function isUser(email) {
    let username = getUsername(email);
    return credsArr[username] != undefined;
}

function removeErrorBorder(elementsArr) {
    for (let i = 0; i < elementsArr.length; i++) {
        document.getElementById(elementsArr[i]).classList.remove('errorBorder');
    }
}

function errorInput(elementsArr) {
    for (let i = 0; i < elementsArr.length; i++) {
        document.getElementById(elementsArr[i]).classList.add('errorBorder');
    }

    setTimeout(() => {
        removeErrorBorder(elementsArr);
    }, 3000);
}

const storage = getStorage(); // ! global
const userCreds = ref(storage, 'userCreds.json');
var credsArr; // ! global

async function loadInfo() {

    credsArr = await Promise.resolve(getRef_json(userCreds));
    console.log(credsArr);
    console.log('READ FROM THE DATABASE');
}

loadInfo();

var signInButton = document.getElementById('SignInButton');

email.addEventListener('click', () => {
    removeErrorBorder(['email']);
});

password.addEventListener('click', () => {
    removeErrorBorder(['password']);
});


function displayStatus(status) {
    document.getElementById('statusText').innerHTML = status;
}

function inputValidation(emailtext, passwordtext) {
    if (emailtext == "" && passwordtext == "") {
        status = 'Please enter email and password'
    }
    else if (emailtext != "" && passwordtext == "") {
        status = 'Please enter password'
    }
    else if (emailtext == "" && passwordtext != "") {
        status = 'Please enter email'
    }
    else if (isUser(emailtext) == false) {
        status = `no account associated with ${emailtext}`;
    }

    if (status != '') {
        errorInput(['email', 'password']);
        var errorContainer = document.getElementById('errorContainer');
        errorContainer.style.display = "block";

        displayStatus(status);
    }
}

signInButton.addEventListener('click', () => {
    emailtext = email.value;
    passwordtext = password.value;
    console.log('email: ', emailtext)

    username = getUsername(emailtext);
    userCrds = credsArr[username];

    if (userCrds == undefined) {
        inputValidation(emailtext, passwordtext);
    }
    else {
        if (emailtext != userCrds.email || passwordtext != userCrds.password) {
            status = 'incorrect username or password'
        }

        if (emailtext == userCrds.email && passwordtext == userCrds.password) {
            status = `${username} has logged in successfully`;
        }
    }
});

var createAccount = document.getElementById('createAccount');
createAccount.addEventListener('click', () => {
    signInButton.innerHTML = '<h3>Create Account<h3>';
    createAccount.style.display = 'none';

    emailtext = email.value;
    passwordtext = password.value;


    let newUser = {
        'email': emailtext,
        'password': passwordtext
    }

    credsArr[`${username}`] = newUser;
    inputValidation(emailtext, passwordtext);

    status = 'New user created';
    displayStatus(status);
    console.log(userCrds)

    // todo upload updated JSON to firebase
    uploadString(userCreds, JSON.stringify(credsArr)).then((snapshot) => {
        console.log('Uploaded a blob or file!');
    });
})

function testInput() {
    email.value = 'user4@gmail.com'
    password.value = 'user4_password!'
    console.log('inputs set')
}

testInput();