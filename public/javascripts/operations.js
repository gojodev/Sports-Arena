async function bookFacility() {
    try {
        const description = 'Test booking for facility';
        const clubID = 'club1';
        const facilityID = 'facility1';
        const datetime = '2024-11-21T10:00:00Z';
        const duration = 60;

        const response = await fetch('http://127.0.0.1:5001/sports-arena-39a32/europe-west2/bookFacility', {
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
            alert(errorData.error);
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
    const response = await fetch('http://127.0.0.1:5001/sports-arena-39a32/europe-west2/showAllFacilities', {
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
        const response = await fetch('http://127.0.0.1:5001/sports-arena-39a32/europe-west2/createFacility', {
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
        const response = await fetch('http://127.0.0.1:5001/sports-arena-39a32/europe-west2/updateFacility', {
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
            const response = await fetch('http://127.0.0.1:5001/sports-arena-39a32/europe-west2/deleteFacility', {
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
    document.getElementById('caloryBurnRate').value = '';
}

async function loadClubs() {
    const response = await fetch('http://127.0.0.1:5001/sports-arena-39a32/europe-west2/showAllClubs', {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        },
    });

    if (response.ok) {
        const data = await response.json();

        console.log(data.clubs);

        const tableBody = document.querySelector("#clubsTable tbody");
        tableBody.innerHTML = "";

        Object.entries(data.clubs).forEach(([clubID, club]) => {
            const row = document.createElement("tr");

            const nameCell = document.createElement("td");
            nameCell.textContent = clubID;
            const caloryCell = document.createElement("td");
            caloryCell.textContent = club.caloryBurnRate;
            const editCell = document.createElement("td");
            editCell.innerHTML = `<a href="#" onclick="editClub('${clubID}')">✏️</a>`;
            const deleteCell = document.createElement("td");
            deleteCell.innerHTML = `<a href="#" onclick="deleteClub('${clubID}')">❌</a>`;

            row.appendChild(nameCell);
            row.appendChild(caloryCell);
            row.appendChild(editCell);
            row.appendChild(deleteCell);

            tableBody.appendChild(row);
        });
    }
}

async function createClub() {
    const clubID = document.getElementById('clubID').value;
    let caloryBurnRate = document.getElementById('caloryBurnRate').value;

    if (!clubID || !caloryBurnRate) {
        alert("Please fill in both fields.");
        return;
    }
    caloryBurnRate = parseInt(caloryBurnRate, 10);

    if (isNaN(caloryBurnRate) || caloryBurnRate < 1 || caloryBurnRate > 1000) {
        alert("Please enter a valid calory burn rate between 1 and 1000.");
        return;
    }

    try {
        const response = await fetch('http://127.0.0.1:5001/sports-arena-39a32/europe-west2/createClub', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ clubID: clubID, caloryBurnRate: caloryBurnRate }),
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
    let newCaloryBurnRate = prompt(`Enter new calory burn rate for ${clubID} (1-1000):`);

    newCaloryBurnRate = parseInt(newCaloryBurnRate, 10);
    if (isNaN(newCaloryBurnRate) || newCaloryBurnRate < 1 || newCaloryBurnRate > 1000) {
        alert("Please enter a valid calory burn rate between 1 and 1000.");
        return;
    }

    try {
        const response = await fetch('http://127.0.0.1:5001/sports-arena-39a32/europe-west2/updateClub', {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ clubID: clubID, newCaloryBurnRate: newCaloryBurnRate }),
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
            const response = await fetch('http://127.0.0.1:5001/sports-arena-39a32/europe-west2/deleteClub', {
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

// bookFacility()
const currentPage = window.location.pathname;
if (currentPage.includes('manageclubs.html')) {
    loadClubs();
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