import React, { useState, useEffect } from 'react';
import SubmissionButton from './SubmissionButton';
import AssignmentSelector from './AssignmentSelecter';
import SubmissionInput from './SubmissionInput';
import { Assignment, CreateSubmission, Feedback } from '../../Interfaces/interfaces';
import { fetchAssignmentByCourse } from '../../services/assignmentService';
import { fetchCourses } from '../../services/courseService';
import { submitAssignment } from '../../services/feedbackService';
import { User } from '../../data/mockData';

const FeedbackForm: React.FC = ()=> {
    const [assignments, setAssignments] = useState<Assignment[]>([]);
    const [selectedCourse, setSelectedCourse] = useState<any>('');
    const [courses, setCourses] = useState<any[]>([]);
    const [selectedAssignment, setSelectedAssignment] = useState<string>('');
    const [submission, setSubmission] = useState<string>('');
    const [feedback, setFeedback] = useState<string>('Please submit your work');

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const data = await fetchCourses();
                setCourses(data);
            } catch (error) {
                console.error('Error fetching courses:', error);
            }
        };

        fetchData();
    }, []);

    useEffect(() => {
        if (selectedCourse) {
            fetchAssignmentsByCourse(selectedCourse);
        }
    }, [selectedCourse]);

    const fetchAssignmentsByCourse = async (courseId: number) => {
        try {
            const data = await fetchAssignmentByCourse(courseId);
            setAssignments(data);
        } catch (error) {
            console.error('Error fetching assignments by course:', error);
        }
    };

    const handleAssignmentSelect = (assignmentId: string) => {
        setSelectedAssignment(assignmentId);        
    };

    const handleCourseSelect = (courseId: string) => {
        setSelectedCourse(courseId);
    };

    const getStudentIdFromLocalStorage = (): number | null => {
        // Retrieve student ID from local storage
        const user = sessionStorage.getItem('user');

        if (user) {
            const userData: User = JSON.parse(user);
            const studentId = userData.id;
            return studentId
        } else {
            return null;
        }
    };

    const handleSubmissionSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError(null);
        setLoading(true);
        setFeedback("")
        try {
            let studentId = getStudentIdFromLocalStorage()
            if (studentId) {
                const dataSubmission: CreateSubmission = {
                    assignment_id: parseInt(selectedAssignment),
                    student_id: studentId,
                    content: submission
                }
    
                const feedback: Feedback = await submitAssignment(dataSubmission)
                console.log("got feedback");
                console.log(feedback)
                console.log(feedback.content)
                setFeedback(feedback.content);
            }
            else {
                throw new Error("ID missing, please retry logging in")
            }
        }
        catch (error: any) {
            setError("Somethign went wrong")
        }
        finally {
            setLoading(false)
        }
    };

    return (
        <>
        <div className="container mx-auto p-4">
            <div className="bg-base shadow-2xl rounded px-8 pt-6 pb-8 mb-4">
                <h2 className="text-2xl font-bold mb-4 text-center">Assignment Form</h2>
                <form>
                        <div className="mb-4">
                            <label htmlFor="course" className="block text-sm font-medium text-gray-700">Select Course</label>
                            <select id="course" name="course" onChange={(e) => handleCourseSelect(e.target.value)} value={selectedCourse} className="mt-1 block w-full border-gray-300 focus:border-indigo-500 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 rounded-md shadow-sm">
                                <option value="">Select Course</option>
                                {courses.map(course => (
                                    <option key={course.id} value={course.id}>{course.name}</option>
                                ))}
                            </select>
                        </div>
                        <AssignmentSelector assignments={assignments} selectedAssignment={selectedAssignment} onSelectAssignment={handleAssignmentSelect} />
                        <SubmissionInput value={submission} onChange={setSubmission} />
                        <SubmissionButton onSubmit={handleSubmissionSubmit} />
                        {error && <div className="text-red-600 mt-4">{error.toString()}</div>}
                        {loading && <div className="text-green-600 mt-4">Gathering Feedback</div>}
                </form>
            </div>
        </div>

        <div className="container mx-auto p-4">
            <div className="bg-base shadow-2xl rounded px-8 pt-6 pb-8 mb-4">
                <h2 className="text-2xl font-bold mb-4 text-center">Feedback</h2>
                <div>
                    <p>{feedback}</p>
                </div>
            </div>
        </div>
        </>
    );
};

export default FeedbackForm;
