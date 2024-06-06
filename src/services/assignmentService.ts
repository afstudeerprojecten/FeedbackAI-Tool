import axios from 'axios';

const API_URL = import.meta.env.VITE_BACKEND_URL ?? "CONFIG_BACKEND_URL";   // Change this to your backend URL
const token = sessionStorage.getItem('token');

export const createAssignment = async (assignmentData: any) => {
    try {
        const config = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}` // Include the token in the header
            },
            mode: 'cors' // Ensure CORS mode
        };
        const response = await axios.post(`${API_URL}/assignment/add`, assignmentData, config);
        return response.data;
    } catch (error: any) {
        throw error.response.data.detail || 'An error occurred while registering the assignment';
    }
};

export const fetchAssigments = async () => {
    try {
        const config = {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}` // Include the token in the header 
            },
            mode: 'cors' // Ensure CORS mode
        };
        const response = await axios.get(`${API_URL}/assignments`, config);
        return response.data;
    } catch (error: any) {
        throw error.response.data.detail || 'An error occurred while fetching assignments';
    }
};

export const fetchAssignmentTemplates = async (assignmentId: number) => {
    try {
        const config = {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}` // Include the token in the header  
            },
            mode: 'cors' // Ensure CORS mode
        };
        const response = await axios.get(`${API_URL}/assignment/${assignmentId}/get_templates`, config);
        return response.data;
    } catch (error: any) {
        throw error.response.data.detail || 'An error occurred while fetching assignment templates';
    }
}

export const fetchAssignmentById = async (assignmentId: number) => {
    try {
        const config = {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json' ,
                Authorization: `Bearer ${token}` // Include the token in the header
            },
            mode: 'cors' // Ensure CORS mode
        };
        const response = await axios.get(`${API_URL}/assignment/${assignmentId}`, config);
        return response.data;
    } catch (error: any) {
        throw error.response.data.detail || 'An error occurred while fetching assignment';
    }
}

export const fetchAssignmentByCourse = async (courseId: number) => {
    try {
        const config = {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}` // Include the token in the header
            },
            mode: 'cors' // Ensure CORS mode
        };
        const response = await axios.get(`${API_URL}/assignment/course/${courseId}`, config);
        return response.data;
    } catch (error: any) {
        throw error.response.data.detail || 'An error occurred while fetching assignments';
    }
}

