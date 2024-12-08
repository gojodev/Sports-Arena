function signOut() {
    localStorage.removeItem('username');
    localStorage.removeItem('name');
    localStorage.removeItem('role');
    localStorage.removeItem('bmr');
    localStorage.removeItem('gender');
    localStorage.removeItem('age');
    localStorage.removeItem('weight');
    localStorage.removeItem('height');
    localStorage.removeItem('address');
    localStorage.removeItem('phone');
    
    document.location.href = "login.html";
}