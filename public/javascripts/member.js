async function loadCurrentInfo() {
    try {
        const response = await fetch('https://currentuser-77hki32qna-nw.a.run.app', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            }
        });

        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const userData = await response.json();
        return userData.data;
    } catch (error) {
        console.error('Error fetching user data:', error);
    }
}


async function updateHTML() {
    const data = await loadCurrentInfo();
    document.getElementById('username').innerHTML = Object.keys(data)[0]
}

updateHTML()