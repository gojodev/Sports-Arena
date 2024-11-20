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
            nameCell.textContent = facility.name;
            const editCell = document.createElement("td");
            editCell.innerHTML = `<a href="#" onclick="editFacility('${facilityID}')">✏️</a>`;

            // Create a table cell for the delete button
            const deleteCell = document.createElement("td");
            deleteCell.innerHTML = `<a href="#" onclick="deleteFacility('${facilityID}')">❌</a>`;

            // Append the cells to the row
            row.appendChild(nameCell);
            row.appendChild(editCell);
            row.appendChild(deleteCell);

            // Append the row to the table body
            tableBody.appendChild(row);
        });
    }
}

// bookFacility()
loadFacilities();