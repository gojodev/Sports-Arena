function loadFitnessLogData() {
    const bmr = localStorage.getItem('bmr');
    document.getElementById('bmr').textContent = bmr || 'Not available';
}

loadFitnessLogData();
