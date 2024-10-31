async function client_test(BMR, description) {
    try {
        const response = await fetch('http://127.0.0.1:5001/sports-arena-39a32/europe-west2/dailyCalories', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                BMR: BMR,
                description: description,
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
    const BMR = '1745';
    const description = 'sedentary'
    const verdict = await client_test(BMR, description)
    console.log(verdict)
}

verifyUser_test()