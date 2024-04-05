import axios from 'axios';

const API_URL = 'http://localhost:8000';  // Change this to your backend URL

export const registerStudent = async (studentData: any) => {
    try {
        const config = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'  
            },
            mode: 'cors' // Ensure CORS mode
        };
        const response = await axios.post(`${API_URL}/student/add`, studentData, config);
        return response.data;
    } catch (error: any) {
        throw error.response.data.detail || 'An error occurred while registering the assignment';
    }
};

export const fetchStudents = async () => {
    try {
        const config = {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'  
            },
            mode: 'cors' // Ensure CORS mode
        };
        const response = await axios.get(`${API_URL}/students`, config);
        return response.data;
    } catch (error: any) {
        throw error.response.data.detail || 'An error occurred while fetching assignments';
    }
}

export const deleteStudent = async (studentId: number) => {
    try {
        const config = {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json'  
            },
            mode: 'cors' // Ensure CORS mode
        };
        const response = await axios.delete(`${API_URL}/student/delete/${studentId}`, config);
        return response.data;
    } catch (error: any) {
        throw error.response.data.detail || 'An error occurred while deleting the student';
    }
}
