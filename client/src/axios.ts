import a from 'axios';

// to avoid re-running index.tsx on every request
export const axios = a.create({
    baseURL: 'http://localhost:3000/api/',
    timeout: 5000,
    withCredentials: true,
});
