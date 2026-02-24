// js/api.js

const API_BASE = 'https://estokvel-1.onrender.com/api';

// Helper to get the stored token
function getToken() {
    return localStorage.getItem('token');
}

// Core request function – automatically adds token, handles JSON, throws errors
async function apiRequest(endpoint, method = 'GET', body = null, requiresAuth = true) {
    const headers = {
        'Content-Type': 'application/json'
    };

    if (requiresAuth) {
        const token = getToken();
        if (!token) {
            // Redirect to login if no token (optional, but good for protected pages)
            window.location.href = '/login.html';
            throw new Error('No authentication token');
        }
        headers['Authorization'] = `Bearer ${token}`;
    }

    const options = {
        method,
        headers
    };

    if (body) {
        options.body = JSON.stringify(body);
    }

    const response = await fetch(`${API_BASE}${endpoint}`, options);
    const data = await response.json();

    if (!response.ok) {
        // If unauthorized, maybe redirect to login
        if (response.status === 401) {
            localStorage.removeItem('token');
            window.location.href = '/login.html';
        }
        throw new Error(data.error || 'Request failed');
     }

    return data;
    export async function apiRequest(endpoint, method = 'GET', body = null, requiresAuth = true) {
    // ... existing code

}

// ==================== AUTH ====================
export async function login(email, password) {
    return apiRequest('/auth/login', 'POST', { email, password }, false);
}

export async function register(userData) {
    return apiRequest('/auth/register', 'POST', userData, false);
}

// ==================== MEMBERS ====================
export async function getMembers() {
    return apiRequest('/members');
}

export async function getMember(id) {
    return apiRequest(`/members/${id}`);
}

export async function createMember(memberData) {
    return apiRequest('/members', 'POST', memberData);
}

export async function updateMember(id, memberData) {
    return apiRequest(`/members/${id}`, 'PUT', memberData);
}

export async function deleteMember(id) {
    return apiRequest(`/members/${id}`, 'DELETE');
}

// ==================== MEETINGS ====================
export async function createMeeting(meetingData) {
    return apiRequest('/meetings', 'POST', meetingData);
}

export async function processMeeting(meetingId, processData) {
    return apiRequest(`/meetings/${meetingId}/process`, 'POST', processData);
}

// ==================== LOANS ====================
export async function getLoans() {
    return apiRequest('/loans');
}

export async function getMemberLoans(memberId) {
    return apiRequest(`/loans/member/${memberId}`);
}

export async function applyCompulsoryFee(year) {
    return apiRequest('/loans/apply-compulsory-fee', 'POST', { year });
}

// ==================== EVENTS ====================
export async function getEvents() {
    return apiRequest('/events');
}

export async function createEvent(eventData) {
    return apiRequest('/events', 'POST', eventData);
}

export async function updateEvent(id, eventData) {
    return apiRequest(`/events/${id}`, 'PUT', eventData);
}

export async function recordEventIncome(id, amount, description) {
    return apiRequest(`/events/${id}/record-income`, 'POST', { amount, description });
}

export async function recordEventExpense(id, amount, description) {
    return apiRequest(`/events/${id}/record-expense`, 'POST', { amount, description });
}

// ==================== REPORTS ====================
export async function getMemberStatement(memberId) {
    return apiRequest(`/reports/member-statement/${memberId}`);
}

export async function getLoanBook() {
    return apiRequest('/reports/loan-book');
}

export async function getFineSummary() {
    return apiRequest('/reports/fine-summary');
}

export async function getInterestProjection() {
    return apiRequest('/reports/interest-projection');
}

// ==================== ALCOHOL MODULE ====================
export async function getAlcoholAssignments(year) {
    return apiRequest(`/alcohol/${year}`);
}

export async function createAlcoholAssignment(assignmentData) {
    return apiRequest('/alcohol', 'POST', assignmentData);
}

export async function getMemberAlcoholAssignments(memberId, year) {
    return apiRequest(`/alcohol/member/${memberId}/${year}`);
}
