// Store token and user info
export function setAuth(token, user) {
    localStorage.setItem('token', token);
    localStorage.setItem('user', JSON.stringify(user));
}

export function getToken() {
    return localStorage.getItem('token');
}

export function getUser() {
    const user = localStorage.getItem('user');
    return user ? JSON.parse(user) : null;
}

export function logout() {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    window.location.href = 'index.html';
}

// Check if user is logged in, redirect if not
export function requireAuth() {
    const token = getToken();
    if (!token) {
        window.location.href = 'login.html';
    }
}

// Get user role
export function getUserRole() {
    const user = getUser();
    return user ? user.role : null;
}

// Check if user has one of allowed roles
export function hasRole(allowedRoles) {
    const role = getUserRole();
    return allowedRoles.includes(role);
}
