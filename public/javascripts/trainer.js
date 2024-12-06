function toggleTrainingSessionForm() {
    const form = document.getElementById('trainingSessionForm');
    form.style.display = form.style.display === 'none' ? 'block' : 'none';
    document.getElementById('description').value = '';
    document.getElementById('duration').value = '';
    document.getElementById('clubDropdown').selectedIndex = 0;
    document.getElementById('facilityDropdown').selectedIndex = 0;
}

async function loadFacilities() {
    const response = await fetch('https://showallfacilities-77hki32qna-nw.a.run.app', {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        },
    });

    if (response.ok) {
        const data = await response.json();

        const facilityDropdown = document.querySelector("#facilityDropdown");

        Object.entries(data.facilities).forEach(([facilityID]) => {
            const option = document.createElement("option");
            option.value = facilityID;
            option.textContent = facilityID;

            facilityDropdown.appendChild(option);
        });
    }
}

async function loadTrainerClubs(){
    // const trainerUsername = WE HAVE TO GET THIS
    let username = localStorage.getItem('username');
    console.log(username);
    const response = await fetch(`http://127.0.0.1:5001/sports-arena-39a32/europe-west2/fetchTrainerClubs?trainerUsername=${username}`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        },
    });

    if (response.ok) {
        const data = await response.json();

        const clubDropdown = document.querySelector("#clubDropdown");
        console.log(data);
        Object.entries(data.trainerClubs).forEach(([clubID, club]) => {
            const option = document.createElement("option");
            option.value = clubID;
            option.textContent = clubID;

            clubDropdown.appendChild(option);
        });
    }
}

async function bookTrainingSession(){
    const description = document.getElementById('description').value;
    const clubID = document.getElementById('clubDropdown').value;
    const facilityID = document.getElementById('facilityDropdown').value;
    const sessionStart = document.getElementById('sessionStart').value;
    let duration = document.getElementById('duration').value;

    if (!description || !clubID || !facilityID || !sessionStart || !duration) {
        alert("Please fill in all fields.");
        return;
    }

    duration = parseInt(duration, 10);

    if (isNaN(duration) || duration < 1 || duration > 1000) {
        alert("Please enter a valid duration between 1 and 1000 minutes.");
        return;
    }

    if (document.getElementById('clubDropdown').selectedIndex === 0) {
        alert("Please select a valid club.");
        return;
    }

    if (document.getElementById('facilityDropdown').selectedIndex === 0) {
        alert("Please select a valid facility.");
        return;
    }

    try {
        const response = await fetch('https://bookfacility-77hki32qna-nw.a.run.app', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                description: description,
                clubID: clubID,
                facilityID: facilityID,
                datetime: sessionStart,
                duration: duration
            }),
        });

        const result = await response.json();
        if (response.status === 200) {
            alert(result.verdict);
            toggleTrainingSessionForm();
            loadTrainingSessions();
        } 
        else {
            alert(`Error: ${result.error}`);
        }
    } 
    catch (error) {
        console.log("Error during training session booking:", error);
        alert("There was an error booking the session.");
    }
}

async function loadTrainingSessions() {
    const username = localStorage.getItem('username');

    const response = await fetch(`http://127.0.0.1:5001/sports-arena-39a32/europe-west2/fetchTrainerClubs?trainerUsername=${username}`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        },
    });
    if (response.ok) {
        const data = await response.json();
        const tbody = document.querySelector("#trainingSessionsTable tbody");
        tbody.innerHTML = '';

        Object.entries(data.trainerClubs).forEach(([clubID, club]) => {
            const bookings = club.bookings;

            Object.entries(bookings).forEach(([bookingID, booking]) => {
                const { description, datetime, duration, facilityID } = booking;


                const row = document.createElement("tr");

                const clubCell = document.createElement("td");
                clubCell.textContent = clubID;
                row.appendChild(clubCell);

                const descriptionCell = document.createElement("td");
                descriptionCell.textContent = description;
                row.appendChild(descriptionCell);

                const sessionStartCell = document.createElement("td");
                const sessionStartDate = new Date(datetime);
                sessionStartCell.textContent = sessionStartDate.toLocaleString();
                row.appendChild(sessionStartCell);

                const durationCell = document.createElement("td");
                durationCell.textContent = `${duration} mins`;
                row.appendChild(durationCell);

                const facilityCell = document.createElement("td");
                facilityCell.textContent = facilityID;
                row.appendChild(facilityCell);

                const deleteCell = document.createElement("td");
                const deleteButton = document.createElement("button");
                deleteButton.textContent = "❌";
                deleteButton.classList.add("deleteButton");
                deleteButton.onclick = () => deleteTrainingSession(bookingID, clubID);
                deleteCell.appendChild(deleteButton);
                row.appendChild(deleteCell);

                tbody.appendChild(row);
            });
        });
    } 
    else {
        console.log("Failed to fetch trainer clubs data");
    }
}

async function deleteTrainingSession(bookingID, clubID) {
    const confirmed = window.confirm(`Are you sure you want to delete this training session?`);
    if (confirmed){
        try {
            const response = await fetch(`http://127.0.0.1:5001/sports-arena-39a32/europe-west2/deleteFacilityBooking`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ bookingID, clubID }),
            });

            const result = await response.json();
            if (response.ok) {
                alert(result.message);
                loadTrainingSessions();
            } 
            else {
                alert(`Error: ${result.error}`);
            }
        } 
        catch (error) {
            console.log("Error during booking deletion:", error);
            alert("There was an error deleting the booking.");
        }
    }
}

loadFacilities();
loadTrainerClubs();
loadTrainingSessions();

document.toggleTrainingSessionForm = toggleTrainingSessionForm;
document.bookTrainingSession = bookTrainingSession;
document.loadTrainingSessions = loadTrainingSessions;
document.deleteTrainingSession = deleteTrainingSession;