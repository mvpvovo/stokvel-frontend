// Store token and user info
function setAuth(token, user) {
    localStorage.setItem('token', token);
    localStorage.setItem('user', JSON.stringify(user));
}

function getToken() {
    return localStorage.getItem('token');
}

function getUser() {
    const user = localStorage.getItem('user');
    return user ? JSON.parse(user) : null;
}

function logout() {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    window.location.href = 'index.html';
}

// Check if user is logged in, redirect if not
function requireAuth() {
    const token = getToken();
    if (!token) {
        window.location.href = 'login.html';
    }
}

// Get user role
function getUserRole() {
    const user = getUser();
    return user ? user.role : null;
}

// Check if user has one of allowed roles
function hasRole(allowedRoles) {
    const role = getUserRole();
    return allowedRoles.includes(role);
}