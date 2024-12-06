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
    console.log();
    const response = await fetch('http://127.0.0.1:5001/sports-arena-39a32/europe-west2/fetchTrainerClubs?trainerUsername=${trainerUsername}', {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        },
    });

    if (response.ok) {
        const data = await response.json();

        const clubDropdown = document.querySelector("#clubDropdown");

        Object.entries(data.trainerClubs).forEach(([clubID, club]) => {
            const option = document.createElement("option");
            option.value = clubID;
            option.textContent = clubID;

            clubDropdown.appendChild(option);
        });
    }
}

loadFacilities()
loadTrainerClubs()

document.toggleTrainingSessionForm = toggleTrainingSessionForm;