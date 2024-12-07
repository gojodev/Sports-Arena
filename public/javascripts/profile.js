function loadProfileData() {
    const name = localStorage.getItem('name');
    const role = localStorage.getItem('role');
    const bmr = localStorage.getItem('bmr');
    const gender = localStorage.getItem('gender');
    const age = localStorage.getItem('age');
    const weight = localStorage.getItem('weight');
    const height = localStorage.getItem('height');
    const address = localStorage.getItem('address');
    const phone = localStorage.getItem('phone');

    document.getElementById('name').textContent = name || 'Not available';
    document.getElementById('role').textContent = role || 'Not available';
    document.getElementById('bmr').textContent = bmr || 'Not available';
    document.getElementById('gender').textContent = gender || 'Not available';
    document.getElementById('age').textContent = age || 'Not available';
    document.getElementById('weight').textContent = weight || 'Not available';
    document.getElementById('height').textContent = height || 'Not available';
    document.getElementById('address').textContent = address || 'Not available';
    document.getElementById('phone').textContent = phone || 'Not available';
}

loadProfileData();
