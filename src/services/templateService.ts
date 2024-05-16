import axios from 'axios';

const API_URL = import.meta.env.VITE_BACKEND_URL ?? "CONFIG_BACKEND_URL";    // Change this to your backend URL

export const generateTemplate = async (assignmentId: number) => {
    try {
        const config = {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'  
            },
            mode: 'cors' // Ensure CORS mode
        };
        const response = await axios.get(`${API_URL}/template/generate/${assignmentId}`, config);
        return response.data;
    } catch (error: any) {
        throw error.response.data.detail || 'An error occurred while generating a template';
    }
};

export const createTemplate = async (templateData: any) => {
    try {
        const config = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'  
            },
            mode: 'cors' // Ensure CORS mode
        };
        const response = await axios.post(`${API_URL}/template/add`, templateData, config);
        return response.data;
    } catch (error: any) {
        throw error.response.data.detail || 'An error occurred while registering the template';
    }
}



