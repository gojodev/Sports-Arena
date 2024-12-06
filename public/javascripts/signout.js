function signOut() {
    localStorage.removeItem('name');
    localStorage.removeItem('role');

    document.location.href = "login.html";
}