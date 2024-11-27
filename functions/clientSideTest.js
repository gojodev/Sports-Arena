async function client_test(username, email, password) {
    try {
        const response = await fetch('https://verifyuser-77hki32qna-nw.a.run.app', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                username: username,
                email: email,
                password: password
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
    const username = 'user1';
    const email = 'user1@gmail.com'
    const password = 'user1_password!'
    const verdict = await client_test(username, email, password)
    console.log(verdict.role)
}

verifyUser_test()