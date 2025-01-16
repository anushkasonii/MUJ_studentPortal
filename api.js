import axios from 'axios';

// Define API base URLs
const SUBMISSION_SERVICE_URL = 'http://localhost:8001';
const MAIN_SERVICE_URL = 'http://localhost:8002';

// Axios instances for each service
const submissionApi = axios.create({
  baseURL: SUBMISSION_SERVICE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

const mainApi = axios.create({
  baseURL: MAIN_SERVICE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
  withCredentials: true, // Important for CORS
});

// Add JWT token to requests automatically
[submissionApi, mainApi].forEach((api) => {
  api.interceptors.request.use((config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  });
});

// API Functions

// Student form submission
export const submitApplication = async (formData) => {
  const response = await submissionApi.post('/submit', formData);
  return response.data;
};

// Reviewer authentication
export const loginReviewer = async (credentials) => {
  const response = await mainApi.post('/reviewer/login', credentials);
  return response.data;
};

// HOD authentication
export const loginHod = async (credentials) => {
  const response = await mainApi.post('/hod/login', credentials);
  return response.data;
};

// Get all submissions for reviewer
export const getSubmissions = async () => {
  const response = await submissionApi.get('/reviewer/submissions'); // Use submissionApi
  return response.data.submissions || [];
};

// Create reviewer review
export const createReview = async (reviewData) => {
  const response = await mainApi.post('/reviewer/fpc_reviews', reviewData);
  return response.data;
};

// Get approved submissions for HOD
export const getApprovedSubmissions = async () => {
  const response = await mainApi.get('/hod/approved_submissions');
  return response.data;
};

// Create HOD review
export const createHodReview = async (reviewData) => {
  const response = await mainApi.post('/hod/hod_reviews', reviewData);
  return response.data;
};

// Export Axios instances if needed elsewhere
export { submissionApi, mainApi };
