const Fuse = require('fuse.js')

// todo will make this information be read from the database but will let it be hardcoded for now 

const clubs = [
    {
        name: "MTU United",
        sport: "Football"
    },
    {
        name: "MTU GAA",
        sport: "GAA"
    },
    {
        name: "MTU RFC",
        sport: "Rugby"
    },
    {
        name: "Leisure World Swimming",
        sport: "Swimming"
    },
    {
        name: "MTU Arena Gym",
        sport: "Weightlifting"
    },
    {
        name: "MTU Athletics",
        sport: "Running"
    }
];

const fuse = new Fuse(clubs, {
    keys: ['name', 'sport'],
    threshold: 0.3
});

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
        div.textContent = `${club.name} -\tSport: ${club.sport}`;
        resultsDiv.appendChild(div);
    });

    if (results.length === 0) {
        resultsDiv.textContent = "No clubs found.";
    }
});