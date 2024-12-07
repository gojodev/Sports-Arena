const Fuse = require('fuse.js')

// todo will make this information be read from the database but will let it be hardcoded for now 
// DONE!
// const clubs = [
//     {
//         name: "MTU United",
//         sport: "Football"
//     },
//     {
//         name: "MTU GAA",
//         sport: "GAA"
//     },
//     {
//         name: "MTU RFC",
//         sport: "Rugby"
//     },
//     {
//         name: "Leisure World Swimming",
//         sport: "Swimming"
//     },
//     {
//         name: "MTU Arena Gym",
//         sport: "Weightlifting"
//     },
//     {
//         name: "MTU Athletics",
//         sport: "Running"
//     }
// ];

let clubs = [];

const fuse = new Fuse(clubs, {
    keys: ['name', 'sport'],
    threshold: 0.3
});

async function loadClubs() {
    const response = await fetch('https://showallclubs-77hki32qna-nw.a.run.app', {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        },
    });
    if (response.ok) {
        const data = await response.json();
        console.log(data);
        clubs = Object.keys(data.clubs).map(clubKey => ({
            name: clubKey,
            sport: data.clubs[clubKey].sport,
            caloryBurnRate: data.clubs[clubKey].caloryBurnRate
        }));
        console.log('Transformed Clubs:', clubs);
        console.log(fuse.list);
        fuse.setCollection(clubs);
    } else {
        console.error("Failed to load clubs");
    }
}
loadClubs();

const userInput = document.getElementById('userInput');
const resultsDiv = document.getElementById('results');

userInput.addEventListener('input', () => {
    const query = userInput.value;
    const results = fuse.search(query);

    //clear prev results
    resultsDiv.innerHTML = '';

    //display new results
    results.forEach(result => {
        const club = result.item;
        const div = document.createElement('div');
        div.classList.add('result');
        div.textContent = `${club.name} -\tSport: ${club.sport} -\tCalory Burn Rate: ${club.caloryBurnRate}cal/hr`;
        resultsDiv.appendChild(div);
    });

    if (results.length === 0) {
        resultsDiv.textContent = "No clubs found.";
    }
});