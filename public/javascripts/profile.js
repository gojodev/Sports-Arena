async function editBMR() {
    let currentValue = localStorage.getItem('bmr');
    let newValue = prompt(`Enter new BMR:`, currentValue);

    if (newValue !== null && newValue !== "") {
        if (isNaN(newValue) || newValue <= 0) {
            alert('BMR must be a positive number.');
            return;
        }

        await updateUserProfile('bmr', newValue);
    }
}

async function editWeight() {
    let currentValue = localStorage.getItem('weight');
    let newValue = prompt(`Enter new weight:`, currentValue);

    if (newValue !== null && newValue !== "") {
        if (isNaN(newValue) || newValue <= 0) {
            alert('Weight must be a positive number.');
            return;
        }

        await updateUserProfile('weight', newValue);
    }
}

async function editAge() {
    let currentValue = localStorage.getItem('age');
    let newValue = prompt(`Enter new age:`, currentValue);

    if (newValue !== null && newValue !== "") {
        if (isNaN(newValue) || newValue <= 0) {
            alert('Age must be a positive number.');
            return;
        }

        await updateUserProfile('age', newValue);
    }
}

async function editHeight() {
    let currentValue = localStorage.getItem('height');
    let newValue = prompt(`Enter new height (in cm):`, currentValue);

    if (newValue !== null && newValue !== "") {
        if (isNaN(newValue) || newValue <= 0) {
            alert('Height must be a positive number.');
            return;
        }

        await updateUserProfile('height', newValue);
    }
}

async function editAddress() {
    let currentValue = localStorage.getItem('address');
    let newValue = prompt(`Enter new address:`, currentValue);

    if (newValue !== null && newValue !== "") {
        await updateUserProfile('address', newValue);
    }
}

async function editPhone() {
    let currentValue = localStorage.getItem('phone');
    let newValue = prompt(`Enter new phone number:`, currentValue);

    if (newValue !== null && newValue !== "") {
        if (newValue.length < 10) {
            alert('Phone number must be at least 10 digits long.');
            return;
        }

        await updateUserProfile('phone', newValue);
    }
}

async function updateUserProfile(field, newValue) {
    try {
        const bmr = localStorage.getItem('bmr');
        const age = localStorage.getItem('age');
        const weight = localStorage.getItem('weight');
        const height = localStorage.getItem('height');
        const address = localStorage.getItem('address');
        const phone = localStorage.getItem('phone');

        let updatedData = {
            username: localStorage.getItem('username'),
            bmr,
            age,
            weight,
            height,
            address,
            phone,
        };

        updatedData[field] = newValue;

        const response = await fetch('http://127.0.0.1:5001/sports-arena-39a32/europe-west2/updateDetails', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(updatedData),
        });

        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }

        localStorage.setItem(field, newValue);

        loadProfileData();

        alert(`${field} updated successfully!`);

    } catch (error) {
        console.error('Error updating profile:', error);
        alert('Failed to update profile. Please try again later.');
    }
}

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

document.editBMR = editBMR;
document.editAge = editAge;
document.editWeight = editWeight;
document.editHeight = editHeight;
document.editAddress = editAddress;
document.editPhone = editPhone;