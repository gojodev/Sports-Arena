async function bookFacility() {
    try {
        const description = 'Team Training Session"';
        const clubID = 'Basketball Club';
        const facilityID = 'Basketball Court 1';
        const datetime = '2024-12-10T14:00:00Z';
        const duration = 60;

        const response = await fetch('https://bookfacility-77hki32qna-nw.a.run.app', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                description: description,
                clubID: clubID,
                facilityID: facilityID,
                datetime: datetime,
                duration: duration,
            }),
        });

        if (!response.ok) {
            const errorData = await response.json();
            console.log(errorData);
            throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const bookingData = await response.json();
        alert("Booking successful!");
        console.log('Booking Successful:', bookingData);
        return bookingData;
    } catch (error) {
        console.error('Error booking facility:', error);
    }
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

        console.log(data.facilities);

        const tableBody = document.querySelector("#facilitiesTable tbody");
        tableBody.innerHTML = "";

        Object.entries(data.facilities).forEach(([facilityID, facility]) => {
            const row = document.createElement("tr");

            const nameCell = document.createElement("td");
            nameCell.textContent = facilityID;
            const locationCell = document.createElement("td");
            locationCell.textContent = facility.location;
            const editCell = document.createElement("td");
            editCell.innerHTML = `<a href="#" onclick="editFacility('${facilityID}')">✏️</a>`;
            const deleteCell = document.createElement("td");
            deleteCell.innerHTML = `<a href="#" onclick="deleteFacility('${facilityID}')">❌</a>`;

            row.appendChild(nameCell);
            row.appendChild(locationCell);
            row.appendChild(editCell);
            row.appendChild(deleteCell);

            tableBody.appendChild(row);
        });
    }
}

async function createFacility() {
    const facilityID = document.getElementById('facilityID').value;
    const location = document.getElementById('location').value;

    if (!facilityID || !location) {
        alert("Please fill in both fields.");
        return;
    }

    try {
        const response = await fetch('https://createfacility-77hki32qna-nw.a.run.app', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ facilityID: facilityID, location: location }),
        });

        const result = await response.json();

        if (response.status === 200) {
            alert(result.message);
            toggleFacilityForm();
            loadFacilities();
        } else {
            alert(`Error: ${result.error}`);
        }
    } 
    catch (error) {
        console.log("Error during facility creation:", error);
        alert("There was an error creating the facility."); 
    }
}

async function editFacility(facilityID){
    let newLocation = prompt(`Enter new location facility ${facilityID}:`);

    if (!newLocation) {
        alert("Location is required.");
        return;
    }

    try {
        const response = await fetch('https://updatefacility-77hki32qna-nw.a.run.app', {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ facilityID: facilityID, newLocation: newLocation }),
        });

        const result = await response.json();
        if (response.status === 200) {
            alert(`Facility ${facilityID} updated successfully!`);
            loadFacilities();
        } 
        else {
            alert(`Error: ${result.error}`);
        }
    } 
    catch (error) {
        console.error("Error updating facility:", error);
        alert("There was an error updating the facility.");
    }
}

async function deleteFacility(facilityID){
    const confirmed = window.confirm(`Are you sure you want to delete this facility?`);
    if (confirmed){
        try {
            const response = await fetch('https://deletefacility-77hki32qna-nw.a.run.app', {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ facilityID: facilityID }),
            });

            const result = await response.json();
            
            if (response.status === 200) {
                alert(result.message);
                loadFacilities();
            }
            else {
                alert(`Error: ${result.error}`);
            }
        }
        catch (error) {
            console.log("Error during deletion:", error);
            alert("There was an error deleting the facility.");
        }
    }
}

function toggleFacilityForm() {
    const form = document.getElementById('facilityForm');
    form.style.display = form.style.display === 'none' ? 'block' : 'none';
    document.getElementById('facilityID').value = '';
    document.getElementById('location').value = '';
}

function toggleClubForm() {
    const form = document.getElementById('clubForm');
    form.style.display = form.style.display === 'none' ? 'block' : 'none';
    document.getElementById('clubID').value = '';
    document.getElementById('clubSport').value = '';
    document.getElementById('caloryBurnRate').value = '';
    document.getElementById('trainerDropdown').selectedIndex = 0;
}

async function loadClubs() {
    const response = await fetch('https://showallclubs-77hki32qna-nw.a.run.app', {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        },
    });

    if (response.ok) {
        const data = await response.json();

        console.log(data.clubs);

        const trainerResponse = await fetch('https://fetchtrainernames-77hki32qna-nw.a.run.app', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
        });
    
        let trainers = [];
        if (trainerResponse.ok) {
            trainers = await trainerResponse.json();
        }

        const trainerMap = new Map();
        trainers.forEach(trainer => {
            trainerMap.set(trainer.key, trainer.name);
        });

        const tableBody = document.querySelector("#clubsTable tbody");
        tableBody.innerHTML = "";

        Object.entries(data.clubs).forEach(([clubID, club]) => {
            const row = document.createElement("tr");

            const nameCell = document.createElement("td");
            nameCell.textContent = clubID;
            const sportCell = document.createElement("td");
            sportCell.textContent = club.sport;
            const caloryCell = document.createElement("td");
            caloryCell.textContent = club.caloryBurnRate;
            const trainerCell = document.createElement("td");
            trainerCell.textContent = trainerMap.get(club.trainer) || "Unknown Trainer";
            const editCell = document.createElement("td");
            editCell.innerHTML = `<a href="#" onclick="editClub('${clubID}')">✏️</a>`;
            const deleteCell = document.createElement("td");
            deleteCell.innerHTML = `<a href="#" onclick="deleteClub('${clubID}')">❌</a>`;

            row.appendChild(nameCell);
            row.appendChild(sportCell);
            row.appendChild(caloryCell);
            row.appendChild(trainerCell);
            row.appendChild(editCell);
            row.appendChild(deleteCell);

            tableBody.appendChild(row);
        });
    }
}

async function createClub() {
    const clubID = document.getElementById('clubID').value;
    const clubSport = document.getElementById('clubSport').value;
    let caloryBurnRate = document.getElementById('caloryBurnRate').value;
    const trainer = document.getElementById('trainerDropdown').value;

    if (!clubID || !clubSport || !caloryBurnRate || !trainer) {
        alert("Please fill in all fields.");
        return;
    }
    caloryBurnRate = parseInt(caloryBurnRate, 10);

    if (isNaN(caloryBurnRate) || caloryBurnRate < 1 || caloryBurnRate > 1000) {
        alert("Please enter a valid calory burn rate between 1 and 1000.");
        return;
    }

    if (trainerDropdown.selectedIndex == 0){
        alert("Please select a valid trainer.");
        return;
    }

    try {
        const response = await fetch('https://createclub-77hki32qna-nw.a.run.app', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ clubID: clubID, sport: clubSport, caloryBurnRate: caloryBurnRate, trainer: trainer }),
        });

        const result = await response.json();
        if (response.status === 200) {
            alert(result.message);
            toggleClubForm();
            loadClubs();
        } 
        else {
            alert(`Error: ${result.error}`);
        }
    } 
    catch (error) {
        console.log("Error during club creation:", error);
        alert("There was an error creating the club.");
    }
}

async function editClub(clubID){
    let newSport = prompt(`Enter new sport for ${clubID}:`);
    let newCaloryBurnRate = prompt(`Enter new calory burn rate for ${clubID} (1-1000):`);

    newCaloryBurnRate = parseInt(newCaloryBurnRate, 10);
    if (isNaN(newCaloryBurnRate) || newCaloryBurnRate < 1 || newCaloryBurnRate > 1000 || !newSport) {
        alert("Please enter a valid calory burn rate between 1 and 1000 and a club sport!");
        return;
    }

    try {
        const response = await fetch('https://updateclub-77hki32qna-nw.a.run.app', {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ clubID: clubID, newSport: newSport, newCaloryBurnRate: newCaloryBurnRate }),
        });

        const result = await response.json();
        if (response.status === 200) {
            alert(`Club ${clubID} updated successfully!`);
            loadClubs();
        } 
        else {
            alert(`Error: ${result.error}`);
        }
    } 
    catch (error) {
        console.error("Error updating club:", error);
        alert("There was an error updating the club.");
    }
}

async function deleteClub(clubID){
    const confirmed = window.confirm(`Are you sure you want to delete this club?`);
    if (confirmed){
        try {
            const response = await fetch('https://deleteclub-77hki32qna-nw.a.run.app', {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ clubID: clubID }),
            });

            const result = await response.json();
            
            if (response.status === 200) {
                alert(result.message);
                loadClubs();
            }
            else {
                alert(`Error: ${result.error}`);
            }
        }
        catch (error) {
            console.log("Error during deletion:", error);
            alert("There was an error deleting the club.");
        }
    }
}

async function loadTrainerDropdown() {
    const response = await fetch('https://fetchtrainernames-77hki32qna-nw.a.run.app', {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        },
    });

    if (response.ok) {
        const trainers = await response.json();
        const trainerDropdown = document.getElementById("trainerDropdown");
        console.log(trainers);
        trainers.forEach(trainer => {
            const option = document.createElement("option");
            option.value = trainer.key;
            option.textContent = trainer.name;
            trainerDropdown.appendChild(option);
        });
    } else {
        console.error("Failed to load trainers.");
    }
}

//bookFacility()
const currentPage = window.location.pathname;
if (currentPage.includes('manageclubs.html')) {
    loadClubs();
    loadTrainerDropdown();
}
else if (currentPage.includes('managefacilities.html')) {
    loadFacilities(); 
}

document.createFacility = createFacility;
document.editFacility = editFacility;
document.deleteFacility = deleteFacility;
document.toggleFacilityForm = toggleFacilityForm;
document.toggleClubForm = toggleClubForm;
document.createClub = createClub;
document.editClub = editClub;
document.deleteClub = deleteClub;