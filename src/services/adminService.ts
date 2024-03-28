import axios from 'axios';

const API_URL = 'http://localhost:8000';  // Change this to your backend URL

export const registerAdmin = async (adminData: any) => {
    try {
        const config = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'  
            },
            mode: 'cors' // Ensure CORS mode
        };
        const response = await axios.post(`${API_URL}/admin/add`, adminData, config);
        return response.data;
    } catch (error: any) {
        throw error.response.data.detail || 'An error occurred while registering the admin';
    }
};

export const fetchAdmins = async () => {
    try {
        const config = {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'  
            },
            mode: 'cors' // Ensure CORS mode
        };
        const response = await axios.get(`${API_URL}/admins`, config);
        return response.data;
    } catch (error: any) {
        throw error.response.data.detail || 'An error occurred while fetching admins';
    }
};


