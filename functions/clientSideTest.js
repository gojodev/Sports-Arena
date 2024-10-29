async function updateDetails_client(username, new_email, new_name, new_password) {
    try {
        const response = await fetch('http://127.0.0.1:5001/sports-arena-39a32/europe-west2/updateDetails', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                username: username,

                new_name: new_name,
                new_email: new_email,
                new_password: new_password,
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
    let verdict = await updateDetails_client('user2', '_First2 _Last2', 'user_2@gmail.com', '_user2_password!')
    console.log(verdict)
}

verifyUser_test()