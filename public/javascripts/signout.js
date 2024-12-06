function signOut() {
    localStorage.removeItem('username');
    localStorage.removeItem('name');
    localStorage.removeItem('role');

    document.location.href = "login.html";
}