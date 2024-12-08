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
    const response = await fetch(`https://fetchtrainerclubs-77hki32qna-nw.a.run.app?trainerUsername=${username}`, {
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
    const sessionType = document.getElementById('sessionType').value;
    alert(sessionType);

    if (!description || !clubID || !facilityID || !sessionStart || !duration  || !sessionType) {
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
                duration: duration,
                bookingType: sessionType
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
    // http://127.0.0.1:5001/sports-arena-39a32/europe-west2/fetchTrainerClubs?trainerUsername=${username}
    const response = await fetch(`https://fetchtrainerclubs-77hki32qna-nw.a.run.app?trainerUsername=${username}`, {
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
            const membersBooking = club.membersBooking;

            Object.entries(bookings).forEach(([bookingID, booking]) => {
                const { description, datetime, duration, facilityID } = booking;

                let memberCount = 0;
                Object.entries(membersBooking).forEach(([userID, userBookings]) => {
                    if (userBookings) {
                        Object.entries(userBookings).forEach(([bookingKey, userBooking]) => {
                            if (userBooking.trainingSlot === bookingID) {
                                memberCount++;
                            }
                        });
                    }
                });

                const row = document.createElement("tr");

                const clubCell = document.createElement("td");
                clubCell.textContent = clubID;
                row.appendChild(clubCell);

                const typeCell = document.createElement("td");
                if (bookingID.startsWith("training")) {
                    typeCell.textContent = "Training Session";
                }
                else if (bookingID.startsWith("advice")) {
                    typeCell.textContent = "Professional Advice Session";
                }
                else {
                    typeCell.textContent = "Unknown Type";
                }
                row.appendChild(typeCell);

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

                const memberCountCell = document.createElement("td");
                memberCountCell.textContent = memberCount;
                row.appendChild(memberCountCell);

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
            // http://127.0.0.1:5001/sports-arena-39a32/europe-west2/deleteFacilityBooking
            const response = await fetch(`https://deletefacilitybooking-77hki32qna-nw.a.run.app`, {
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

function toggleDateFilter() {
    const dateFilterInput = document.getElementById('dateFilter');
    const enableDateFilterCheckbox = document.getElementById('enableDateFilter');
    
    dateFilterInput.disabled = !enableDateFilterCheckbox.checked;
    
    if (!enableDateFilterCheckbox.checked) {
        dateFilterInput.value = '';
    }

    filterTable();
}

function filterTable() {
    const searchValue = document.getElementById('clubSearch').value.toLowerCase();
    const dateValue = document.getElementById('dateFilter').value;
    const enableDateFilter = document.getElementById('enableDateFilter').checked;
    const table = document.getElementById('trainingSessionsTable');
    const rows = table.getElementsByTagName('tr');
    
    for (let i = 1; i < rows.length; i++) {
        const cells = rows[i].getElementsByTagName('td');
        const clubCell = cells[0];
        const sessionStartCell = cells[3];
        
        if (clubCell && sessionStartCell) {
            const clubName = clubCell.textContent || clubCell.innerText;
            const sessionStartText = sessionStartCell.textContent.trim();
            
            const [datePart, timePart] = sessionStartText.split(', ');

            const [day, month, year] = datePart.split('/');
            const sessionStartDate = new Date(`${year}-${month.padStart(2, '0')}-${day.padStart(2, '0')}T${timePart}`);

            const formattedYear = sessionStartDate.getFullYear();
            const formattedMonth = (sessionStartDate.getMonth() + 1).toString().padStart(2, '0');
            const formattedDay = sessionStartDate.getDate().toString().padStart(2, '0');

            const formattedDate = `${formattedYear}-${formattedMonth}-${formattedDay}`;
            
            let matchClub = clubName.toLowerCase().includes(searchValue);
            let matchDate = true;

            if (enableDateFilter && dateValue) {
                matchDate = formattedDate === dateValue;
            }

            if (matchClub && matchDate) {
                rows[i].style.display = '';
            } else {
                rows[i].style.display = 'none';
            }
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
document.toggleDateFilter = toggleDateFilter;
document.filterTable = filterTable;