async function verify_user(username, email, password, name, role) {
    try {
        const response = await fetch('http://127.0.0.1:5001/sports-arena-39a32/europe-west2/addUser', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                username,
                email,
                password,
                name,
                role
            })
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

async function clientSide_test() {
    let res = await verify_user('user4', 'user4@gmail.com', 'user4_password!', 'First4 Last4', 'trainer')
    console.log(res)
}

clientSide_test()