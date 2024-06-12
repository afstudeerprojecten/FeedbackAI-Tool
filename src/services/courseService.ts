import axios from 'axios';
import { Course, TeacherUploadCourseDocument } from '../Interfaces/interfaces';

const API_URL = import.meta.env.VITE_BACKEND_URL ?? "CONFIG_BACKEND_URL";    // Change this to your backend URL

export const registerCourse = async (courseData: any) => {
    try {
        const config = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'  
            },
            mode: 'cors' // Ensure CORS mode
        };
        const response = await axios.post(`${API_URL}/course/add`, courseData, config);
        return response.data;
    } catch (error: any) {
        throw error.response.data.detail || 'An error occurred while registering the course';
    }
};

export const fetchCourses = async () => {
    try {
        const config = {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'  
            },
            mode: 'cors' // Ensure CORS mode
        };
        const response = await axios.get(`${API_URL}/courses`, config);
        return response.data;
    } catch (error: any) {
        throw error.response.data.detail || 'An error occurred while fetching courses';
    }
};

export const fetchCoursesByTeacherId = async (teacher_id: number) => {
    try {
        const config = {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'  
            },
            mode: 'cors' // Ensure CORS mode
        };
        const response = await axios.get<Course[]>(`${API_URL}/courses/teacher/${teacher_id}`, config);
        return response.data;
    } catch (error: any) {
        throw error.response.data.detail || 'An error occurred while fetching courses';
    }
};

export const teacherUploadDocumentToCourse = async (formData: FormData) => {

    // Don't set conctent type for file and multipart types
    try {
        const config = {
            method: 'POST',
            headers: {
            },
            mode: 'cors', // Ensure CORS mode
        };
        const response = await axios.post(`${API_URL}/courses/teacher/upload/document`, formData, config);
        return response.data;
    } catch (error: any) {
        throw error.response.data.detail || 'An error occurred while registering the course';
    }
};