// src/config.js
const API_URL = process.env.NODE_ENV === 'production'
  ? 'https://your-backend-app-name.onrender.com' // 👈 Jab aap backend host karoge, uska live URL yahan daal dena
  : 'http://localhost:5000';                   // 👈 Local testing ke liye

export default API_URL;