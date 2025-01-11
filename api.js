// src/services/api.js
const BASE_URL = 'http://localhost:8080';

export const api = {
  // Student
  submitApplication: (formData) => fetch(`${BASE_URL}/submit`, {
    method: 'POST',
    body: formData,
  }),

  // Reviewer
  reviewerLogin: (credentials) => fetch(`${BASE_URL}/reviewer/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(credentials),
  }),
  
  getSubmissions: () => fetch(`${BASE_URL}/reviewer/submissions`, {
    headers: { 'Authorization': `Bearer ${localStorage.getItem('token')}` },
  }),

  // HOD
  hodLogin: (credentials) => fetch(`${BASE_URL}/hod/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(credentials),
  }),
  
  getApprovedSubmissions: () => fetch(`${BASE_URL}/hod/submissions/approved`, {
    headers: { 'Authorization': `Bearer ${localStorage.getItem('token')}` },
  }),
};
