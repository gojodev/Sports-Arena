function loadFitnessLogData() {
    const bmr = localStorage.getItem('bmr');
    document.getElementById('bmr').textContent = bmr || 'Not available';
    resetNewDay();
    updateTotalCalories();
}

function dailyCalories(bmr, description) {
    const factors = {
        'sedentary': 1.2,
        'lightly active': 1.375,
        'moderately active': 1.55,
        'very active': 1.725,
        'extra active': 1.9,
    }

    const result = factors[description]
    if (result != undefined) {
        bmr = Number(bmr) * result;
        return bmr
    }
    else {
        return 'Description not recognised';
    }
}

function updateTotalCalories(){
    const totalCalories = Number(localStorage.getItem('totalCalories')) || 0;
    document.getElementById('totalCalories').textContent = `Total Calories Today: ${totalCalories}`;

    const bmr = localStorage.getItem('bmr');
    const activityRate = document.getElementById('factors').value;
    const dailyCalorieRequirement = dailyCalories(bmr,activityRate);

    const statusMessage = document.getElementById('statusMessage');
    if (dailyCalorieRequirement){
        if (totalCalories < dailyCalorieRequirement){
            statusMessage.textContent = "You are under your daily calories requirement";
        }else if (totalCalories > dailyCalorieRequirement){
            statusMessage.textContent = "You are over your daily calories requirement";
        }else if (totalCalories === dailyCalorieRequirement){
            statusMessage.textContent = "You are equal to your daily calories requirement";
        }
    }else{
        statusMessage.textContent = "Select an activity rare to calculate your required calorie intake";
    }
}

function resetNewDay(){
    const today = new Date().toDateString();
    const lastUpdated = localStorage.getItem('lastUpdatedDate');

    if (lastUpdated !== today) {
        localStorage.setItem('totalCalories', 0);
        localStorage.setItem('lastUpdatedDate', today);
    }
}

document.getElementById('calories').addEventListener('change',(event) =>{
    const addedCalories = Number(event.target.value);
    if (addedCalories <= 0){
        alert("Please enter a positive calorie value");
        return;
    }

    const currentTotal = Number(localStorage.getItem('totalCalories')) || 0;
    localStorage.setItem('totalCalories', currentTotal + addedCalories);

    updateTotalCalories();
    event.target.value = '';
});

document.getElementById('factors').addEventListener('change', (event) =>{
    const activityRate = event.target.value;
    const bmr = localStorage.getItem('bmr');
    if (bmr){
        const requiredCalories = dailyCalories(bmr,activityRate);
        document.querySelector('p').textContent = `Required Calories: ${requiredCalories}`;
    }else{
        alert("BMR data is not available");
    }
});

loadFitnessLogData();
