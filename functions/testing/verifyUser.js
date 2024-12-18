async function verify_user(username, email, password) {
    try {
        const response = await fetch('https://verifyuser-77hki32qna-nw.a.run.app', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                username,
                email,
                password
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
    let res = await verify_user('user3', 'user3@gmail.com', 'user3_password!')
    console.log(res)
}

clientSide_test()