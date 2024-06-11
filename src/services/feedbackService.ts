import axios from 'axios';
import { CreateSubmission, Feedback, SubmissionChatCompletion } from '../Interfaces/interfaces';

const API_URL = import.meta.env.VITE_BACKEND_URL ?? "CONFIG_BACKEND_URL";    // Change this to your backend URL

export const submitAssignment = async (submission: CreateSubmission) : Promise<SubmissionChatCompletion> => {
    try {
        const config = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'  
            },
            mode: 'cors' // Ensure CORS mode
        };
        const response = await axios.post(`${API_URL}/student/assignment/submit`, submission, config);
        return response.data;
    } catch (error: any) {
        throw error.response.data.detail || 'An error occurred while registering the assignment';
    }
};

export const fetchFeedback = async (submission_id: number) : Promise<Feedback> => {
    try {
        const response = await axios.get(`${API_URL}/submission/feedback/${submission_id}`);
        return response.data;
    } catch (error: any) {
        throw error.response.data.detail || 'An error occurred while fetching feedback';
    }
}