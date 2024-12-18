async function set_clubBooking(username, name, clubName, date, time, duration, trainingSlot) {
    try {
        const response = await fetch('https://setactivity-77hki32qna-nw.a.run.app', {
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
                duration,
                trainingSlot
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
        const response = await fetch('https://removeactivity-77hki32qna-nw.a.run.app', {
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
    let res = await set_clubBooking('user1', 'First1 Last1', 'Basketball Club', "some date", "some  time", "30 mins", "advice1")
    // let res = await remove_clubBooking('user1', '3', 'Basketball Club')
    console.log(res)
}

clientSide_test()