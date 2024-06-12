// TeacherService.ts

import axios from 'axios';

const API_URL = import.meta.env.VITE_BACKEND_URL ?? "CONFIG_BACKEND_URL";   // Replace with your actual API URL

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

export const fetchTeachers = async () => {
    try {
        const config = {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'  
            },
            mode: 'cors' // Ensure CORS mode
        };
        const response = await axios.get(`${API_URL}/teachers`, config);
        return response.data;
    } catch (error: any) {
        throw error.response.data.detail || 'An error occurred while fetching teachers';
    }
};

export const deleteTeacher = async (teacherId: number) => {
    try {
        const config = {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json'  
            },
            mode: 'cors' // Ensure CORS mode
        };
        const response = await axios.delete(`${API_URL}/teacher/delete/${teacherId}`, config);
        return response.data;
    } catch (error: any) {
        throw error.response.data.detail || 'An error occurred while deleting the teacher';
    }
};

export const updateTeacher = async (teacherId: number, teacherData: any) => {
    try {
        const config = {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'  
            },
            mode: 'cors' // Ensure CORS mode
        };
        const response = await axios.put(`${API_URL}/teacher/update/${teacherId}`, teacherData, config);
        return response.data;
    } catch (error: any) {
        throw error.response.data.detail || 'An error occurred while updating the teacher';
    }
}

export const fetchTeacher = async (teacherId: number) => {
    try {
        const config = {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'  
            },
            mode: 'cors' // Ensure CORS mode
        };
        const response = await axios.get(`${API_URL}/teacher/id/${teacherId}`, config);
        return response.data;
    } catch (error: any) {
        throw error.response.data.detail || 'An error occurred while fetching the teacher';
    }
}

export const fetchTeacherByEmail = async (teacherEmail: string) => {
    try {
        const config = {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'  
            },
            mode: 'cors' // Ensure CORS mode
        };
        const response = await axios.get(`${API_URL}/teacher/email/${teacherEmail}`, config);
        return response.data;
    } catch( error: any ) {
        throw error.response.data.detail || 'An error occurred while fetching the teacher';
    }
}