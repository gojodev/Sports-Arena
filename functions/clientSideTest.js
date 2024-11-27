async function client_test() {
    try {
        const response = await fetch('http://127.0.0.1:5001/sports-arena-39a32/europe-west2/currentUser', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            }
        });

        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const userData = await response.json();
        return userData.db;
    } catch (error) {
        console.error('Error fetching user data:', error);
    }
}


async function verifyUser_test() {
    let res = await client_test()
    console.log(res)
}

verifyUser_test()