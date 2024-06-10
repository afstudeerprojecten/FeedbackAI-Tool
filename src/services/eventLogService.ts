import axios from 'axios';

const API_URL = import.meta.env.VITE_BACKEND_URL ?? "CONFIG_BACKEND_URL";    // Change this to your backend URL

export const registerEvent = async (eventData: any) => {
    try {
        const config = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'  
            },
            mode: 'cors' // Ensure CORS mode
        };
        const response = await axios.post(`${API_URL}/eventlog/add`, eventData, config);
        return response.data;
    } catch (error: any) {
        throw error.response.data.detail || 'An error occurred while registering the assignment';
    }
};

export const fetchEvents = async () => {
    try {
        const config = {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'  
            },
            mode: 'cors' // Ensure CORS mode
        };
        const response = await axios.get(`${API_URL}/Events`, config);
        return response.data;
    } catch (error: any) {
        throw error.response.data.detail || 'An error occurred while fetching assignments';
    }
}

export const fetchEventByEventID = async (event_id: number) => {
    try {
        const config = {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'  
            },
            mode: 'cors' // Ensure CORS mode
        };
        const response = await axios.get(`${API_URL}/eventlog/event/${event_id}`, config);
        return response.data;
    } catch (error: any) {
        throw error.response.data.detail || 'An error occurred while fetching the student';
    }
}

export const fetchEventByUser = async (user_id: number) => {
    try {
        const config = {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'  
            },
            mode: 'cors' // Ensure CORS mode
        };
        const response = await axios.get(`${API_URL}/eventlog/user/${user_id}`, config);
        return response.data;
    } catch (error: any) {
        throw error.response.data.detail || 'An error occurred while fetching the student';
    }
}

export const deleteEventLog = async (eventId: number) => {
    try {
        const config = {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json'  
            },
            mode: 'cors' // Ensure CORS mode
        };
        const response = await axios.delete(`${API_URL}/eventlog/delete/${eventId}`, config);
        return response.data;
    } catch (error: any) {
        throw error.response.data.detail || 'An error occurred while deleting the student';
    }
}
