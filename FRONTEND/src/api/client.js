import axios from 'axios';

const API_BASE_URL = 'https://vehicle-insurance-fraud-detection-yfb5.onrender.com';

const client = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

export default client;