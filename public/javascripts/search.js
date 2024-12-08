const Fuse = require('fuse.js');

let clubs = [];

const fuse = new Fuse(clubs, {
    keys: ['name', 'sport', 'trainer'],
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

        clubs = Object.keys(data.clubs).map(clubKey => ({
            name: clubKey,
            sport: data.clubs[clubKey].sport,
            trainer: trainerMap.get(data.clubs[clubKey].trainer) || "Unknown Trainer",
            caloryBurnRate: data.clubs[clubKey].caloryBurnRate
        }));
        
        console.log('Transformed Clubs:', clubs);
        fuse.setCollection(clubs);

        displayClubs(clubs);
    } else {
        console.error("Failed to load clubs");
    }
}

function displayClubs(clubsToDisplay) {
    resultsDiv.innerHTML = '';

    if (clubsToDisplay.length === 0) {
        resultsDiv.textContent = "No clubs found.";
        return;
    }

    clubsToDisplay.forEach(club => {
        const div = document.createElement('div');
        div.classList.add('result');
        
        const nameDiv = document.createElement('div');
        nameDiv.textContent = club.name;

        const sportDiv = document.createElement('div');
        sportDiv.textContent = `Sport: ${club.sport}`;

        const trainerDiv = document.createElement('div');
        trainerDiv.textContent = `Trainer: ${club.trainer}`;

        const caloryDiv = document.createElement('div');
        caloryDiv.textContent = `Calorie Burn Rate: ${club.caloryBurnRate}cal/hr`;

        div.appendChild(nameDiv);
        div.appendChild(sportDiv);
        div.appendChild(trainerDiv);
        div.appendChild(caloryDiv);

        resultsDiv.appendChild(div);
    });
}

loadClubs();

const userInput = document.getElementById('userInput');
const resultsDiv = document.getElementById('results');

userInput.addEventListener('input', () => {
    const query = userInput.value;

    if (!query) {
        displayClubs(clubs);
    } 
    else {
        const results = fuse.search(query);
        displayClubs(results.map(result => result.item));
    }
});
