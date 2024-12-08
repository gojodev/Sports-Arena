// async function loadCurrentInfo() {
//     try {
//         const response = await fetch('https://currentuser-77hki32qna-nw.a.run.app', {
//             method: 'GET',
//             headers: {
//                 'Content-Type': 'application/json',
//             }
//         });

//         if (!response.ok) {
//             throw new Error(`HTTP error! Status: ${response.status}`);
//         }

//         const userData = await response.json();
//         return userData.data;
//     } catch (error) {
//         console.error('Error fetching user data:', error);
//     }
// }


// async function updateHTML() {
//     const data = await loadCurrentInfo();
//     document.getElementById('username').innerHTML = Object.keys(data)[0]
// }

//updateHTML()

let clubsData = {};

async function loadClubs() {
    const response = await fetch('https://showallclubs-77hki32qna-nw.a.run.app', {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' },
    });

    if (response.ok) {
        const data = await response.json();
        clubsData = data.clubs;

        const clubDropdown = document.getElementById("clubDropdown");
        clubDropdown.innerHTML = "<option value=''>Select Club</option>";

        Object.keys(clubsData).forEach(clubName => {
            const option = document.createElement("option");
            option.value = clubName;
            option.textContent = clubName;
            clubDropdown.appendChild(option);
        });
    } else {
        console.log("Failed to fetch clubs");
    }
}

function updateTrainingDropdown() {
    const sessionType = document.getElementById("sessionType").value;
    const clubName = document.getElementById("clubDropdown").value;

    if (!clubName) return;

    const club = clubsData[clubName];
    const trainingDropdown = document.getElementById("trainingDropdown");
    trainingDropdown.innerHTML = "<option value=''>Select Training</option>";

    const sessions = club.bookings;
    const filteredSessions = Object.entries(sessions).filter(([key, _]) =>
        sessionType === "training" ? key.startsWith("training") : key.startsWith("advice")
    );

    filteredSessions.forEach(([key, session]) => {
        const option = document.createElement("option");
        option.value = key;
        option.textContent = session.description;
        trainingDropdown.appendChild(option);
    });
}

async function bookAppointment() {
    const sessionType = document.getElementById("sessionType").value;
    const clubName = document.getElementById("clubDropdown").value;
    const trainingSlot = document.getElementById("trainingDropdown").value;

    if (!sessionType || !clubName || !trainingSlot) {
        alert("Please select all fields.");
        return;
    }

    const username = localStorage.getItem('username');
    const bookingData = {
        username,
        name: username,
        clubName,
        trainingSlot
    };

    const response = await fetch('https://setactivity-77hki32qna-nw.a.run.app/setActivity', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(bookingData)
    });

    if (response.ok) {
        const data = await response.json();
        loadTrainingSessions();
    } else {
        console.log("Failed to book appointment");
    }
}

function toggleAppointmentForm() {
    const form = document.getElementById('appointmentForm');
    form.style.display = form.style.display === 'none' ? 'block' : 'none';
    document.getElementById('sessionType').selectedIndex = 0;
    document.getElementById('clubDropdown').selectedIndex = 0;
    document.getElementById('trainingDropdown').selectedIndex = 0;
}

async function loadTrainingSessions() {
    const username = localStorage.getItem('username');

    if (!username) {
        console.log("No username found in localStorage");
        return;
    }

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

    const response = await fetch('https://showallclubs-77hki32qna-nw.a.run.app', {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        },
    });

    if (response.ok) {
        const data = await response.json();

        const tbody = document.querySelector("#trainingSessionsTable tbody");
        tbody.innerHTML = '';

        Object.entries(data.clubs).forEach(([clubName, club]) => {
            const membersBookings = club.membersBooking;
            Object.entries(membersBookings).forEach(([usernameKey, bookings]) => {
                if (usernameKey === username) {
                    Object.entries(bookings).forEach(([bookingID, bookingData]) => {
                        const booking = club.bookings[bookingData.trainingSlot];

                        if (booking) {
                            const row = document.createElement("tr");

                            const clubCell = document.createElement("td");
                            clubCell.textContent = clubName;
                            row.appendChild(clubCell);

                            const typeCell = document.createElement("td");
                            if (bookingData.trainingSlot.startsWith("training")) {
                                typeCell.textContent = "Training Session";
                            } else if (bookingData.trainingSlot.startsWith("advice")) {
                                typeCell.textContent = "Professional Advice Session";
                            }
                            row.appendChild(typeCell);

                            const descriptionCell = document.createElement("td");
                            descriptionCell.textContent = booking.description;
                            row.appendChild(descriptionCell);

                            const trainerCell = document.createElement("td");
                            trainerCell.textContent = trainerMap.get(club.trainer) || "Unknown Trainer";
                            row.appendChild(trainerCell);

                            const sessionStartCell = document.createElement("td");
                            const sessionStartDate = new Date(booking.datetime);
                            sessionStartCell.textContent = sessionStartDate.toLocaleString();
                            row.appendChild(sessionStartCell);

                            const durationCell = document.createElement("td");
                            durationCell.textContent = `${booking.duration} mins`;
                            row.appendChild(durationCell);

                            const facilityCell = document.createElement("td");
                            facilityCell.textContent = booking.facilityID;
                            row.appendChild(facilityCell);

                            const deleteCell = document.createElement("td");
                            const deleteButton = document.createElement("button");
                            deleteButton.textContent = "❌";
                            deleteButton.classList.add("deleteButton");
                            deleteButton.onclick = () => deleteTrainingSession(bookingData.trainingSlot, clubName);
                            deleteCell.appendChild(deleteButton);
                            row.appendChild(deleteCell);
                            tbody.appendChild(row);
                        }
                    });
                }
            });
        });
    } else {
        console.log("Failed to fetch club data");
    }
}

async function deleteTrainingSession(trainingSlot, clubName) {
    const username = localStorage.getItem('username');

    if (!username) {
        console.log("No username found in localStorage");
        return;
    }

    const bookingData = {
        username,
        trainingSlot,
        clubName
    };

    const response = await fetch('https://removeactivity-77hki32qna-nw.a.run.app/removeActivity', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(bookingData)
    });

    if (response.ok) {
        const data = await response.json();
        console.log("Booking removed:", data.verdict);
        loadTrainingSessions();
    } else {
        console.log("Failed to delete the training session");
    }
}

const sessionType = document.getElementById("sessionType")
const clubDropdown = document.getElementById("clubDropdown")

if (sessionType != undefined && clubDropdown != undefined) {
    sessionType.addEventListener("change", updateTrainingDropdown);
    clubDropdown.addEventListener("change", updateTrainingDropdown);
}

const currentPage = window.location.pathname;
if (currentPage.includes('bookings.html')) {
    loadClubs();
    loadTrainingSessions();
}

document.toggleAppointmentForm = toggleAppointmentForm;
document.bookAppointment = bookAppointment;
document.deleteTrainingSession = deleteTrainingSession;