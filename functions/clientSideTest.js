async function addUser_client(username, name, email, password) {
    try {
        const response = await fetch('http://127.0.0.1:5001/sports-arena-39a32/europe-west2/addUser', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                username: username,
                name: name,
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


async function verifyUser_test() {
    let verdict = await addUser_client('user4', 'First4 Last4', 'user4@gmail.com', 'user4_password!')
    console.log(verdict)
}

verifyUser_test()