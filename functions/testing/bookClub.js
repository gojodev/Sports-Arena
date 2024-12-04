async function set_clubBooking(username, name, clubName, date, time, duration) {
    try {
        const response = await fetch('http://127.0.0.1:5001/sports-arena-39a32/europe-west2/setClubBooking', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                username,
                name,
                clubName,
                date,
                time,
                duration
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

async function remove_clubBooking(username, id, clubName) {
    try {
        const response = await fetch('http://127.0.0.1:5001/sports-arena-39a32/europe-west2/removeClubBooking', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                username,
                id,
                clubName
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
    // let res = await set_clubBooking('user1', 'First1 Last1', 'Basketball Club', "some OTHER date", "some OTHER time", "30 mins")
    // let res = await remove_clubBooking('user1', '2', 'Basketball Club')
    console.log(res)
}

clientSide_test()