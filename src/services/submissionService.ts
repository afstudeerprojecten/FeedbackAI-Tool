import axios from "axios";

const API_URL = import.meta.env.VITE_BACKEND_URL ?? "CONFIG_BACKEND_URL"; 
const token = sessionStorage.getItem('token');

export const fetchSubmissions = async () => {
    try {
        const config = {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}` // Include the token in the header
            },
            mode: 'cors' // Ensure CORS mode
        };
        const response = await axios.get(`${API_URL}/submissions`, config);
        return response.data;
    } catch (error: any) {
        throw error.response.data.detail || 'An error occurred while fetching submissions';
    }
};

export const fetchSubmission = async (submissionId: number) => {
    try {
        const config = {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}` // Include the token in the header
            },
            mode: 'cors' // Ensure CORS mode
        };
        const response = await axios.get(`${API_URL}/submission/${submissionId}`, config);
        return response.data;
    } catch (error: any) {
        throw error.response.data.detail || 'An error occurred while fetching the submission';
    }
};

export const fetchSubmissionByUser = async (student_id: number) => {
    try {
        const config = {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}` // Include the token in the header
            },
            mode: 'cors' // Ensure CORS mode
        };
        const response = await axios.get(`${API_URL}/submissions/student/${student_id}`, config);
        return response.data;
    } catch (error: any) {
        throw error.response.data.detail || 'An error occurred while fetching the submission';
    }
}