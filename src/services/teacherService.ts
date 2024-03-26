// TeacherService.ts

import axios from 'axios';

const API_URL = 'http://localhost:8000'; // Replace with your actual API URL

export const registerTeacher = async (teacherData: any) => {
    try {
        const config = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'  
            },
            mode: 'cors' // Ensure CORS mode
        };
        const response = await axios.post(`${API_URL}/teacher/add`, teacherData, config);
        return response.data;
    } catch (error: any) {
        throw error.response.data.detail || 'An error occurred while registering the teacher';
    }
};

