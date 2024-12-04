async function loadCurrentInfo() {
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
        return userData.data;
    } catch (error) {
        console.error('Error fetching user data:', error);
    }
}

async function updateHTML() {
    const fetched = await loadCurrentInfo()
    const username = Object.keys(fetched)[0];
    const data = fetched[username]
    const name = data.name
    const role = data.role
    const bmr = data.bmr
    const gender = data.gender
    const age = data.age
    const weight = data.weight
    const height = data.height
    const address = data.address
    const phone = data.phone
    const bookingsNo = data.bookings.length
    console.log(name)
    document.getElementById('name').innerHTML = `${name} (${username})`
    document.getElementById('role').innerHTML = role
    document.getElementById('bmr').innerHTML = bmr
    document.getElementById('gender').innerHTML = gender
    document.getElementById('age').innerHTML = age
    document.getElementById('weight').innerHTML = weight
    document.getElementById('height').innerHTML = height
    document.getElementById('address').innerHTML = address
    document.getElementById('phone').innerHTML = phone
    document.getElementById('bookingsNo').innerHTML = bookingsNo
}

updateHTML()