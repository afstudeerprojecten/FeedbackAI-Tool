import React, { useState, useEffect } from 'react';
import SubmissionButton from './SubmissionButton';
import AssignmentSelector from './AssignmentSelecter';
import SubmissionInput from './SubmissionInput';
import { Assignment, CreateSubmission, Feedback, SubmissionChatCompletion } from '../../Interfaces/interfaces';
import { fetchAssignmentByCourse } from '../../services/assignmentService';
import { fetchCourses } from '../../services/courseService';
import { submitAssignment } from '../../services/feedbackService';
import { User } from '../../data/mockData';
import { fetchStudentByEmail } from '../../services/studentService';

const FeedbackForm: React.FC = () => {
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

    const handleSubmissionSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError(null);
        setLoading(true);
        setFeedback("")
        try {
            let sessionUser =  sessionStorage.getItem("user")
            if (sessionUser != null) {
                let realUser = JSON.parse(sessionUser)
                let student = await fetchStudentByEmail(realUser.email)
                const dataSubmission: CreateSubmission = {
                    assignment_id: parseInt(selectedAssignment),
                    student_id:student.id,
                    content: submission
                }

                const ChatCompletion: SubmissionChatCompletion = await submitAssignment(dataSubmission) 
                console.log(ChatCompletion)

                const feedback: Feedback = ChatCompletion.feedback
                console.log("got feedback");
                console.log(feedback);
                console.log(feedback.content)
                console.log(ChatCompletion.usage_total_tokens)
                setFeedback(feedback.content);
            
            }
            else {
                throw new Error("Something went wrong.")
            }
            
        }
        catch (error: any) {
            setError("Something went wrong")
        }
        finally {
            setLoading(false)
        }
    };

    return (
        <>
            <div className="container mx-auto p-4 bg-light-neutral rounded dark:bg-dark-neutral">
    <div className="bg-light-neutral rounded px-8 pt-6 pb-8 mb-4 dark:bg-dark-neutral">
        <h2 className="text-2xl font-bold mb-4 text-center text-light-text dark:text-dark-text">Submission Form</h2>
        <form>
            <div className="mb-4">
                <div className="grid grid-cols-2 gap-4">
                    <div>
                        <label className="block text-sm font-bold mb-2 text-light-text dark:text-dark-text" htmlFor="course_id">
                            Course
                        </label>
                        <select id="course" name="course" onChange={(e) => handleCourseSelect(e.target.value)} value={selectedCourse} className="w-full border rounded px-3 py-2 text-light-text dark:text-dark-text bg-light-neutral dark:bg-dark-neutral dark:border-gray-500 dark:text-dark-text dark:focus-dark-primary focus:outline-none focus:ring-gray-500 focus:border-gray-500">
                            <option value="">Select Course</option>
                            {courses.map(course => (
                                <option key={course.id} value={course.id}>{course.name}</option>
                            ))}
                        </select>
                    </div>
                    <div>
                        <AssignmentSelector assignments={assignments} selectedAssignment={selectedAssignment} onSelectAssignment={handleAssignmentSelect} />
                    </div>
                </div>
            </div>

            <SubmissionInput value={submission} onChange={setSubmission} />
            
            <div className="flex justify-center">
            {loading ? (
                        <span className="loading loading-spinner loading-xs"></span>
                    ) : (
                        <SubmissionButton onSubmit={handleSubmissionSubmit} />
                    )}           
                     </div>

            {error && <div className="text-red-600 mt-4">{error.toString()}</div>}
            {/* {loading  && <div className="text-green-600 mt-4">Gathering Feedback</div>} */}
        </form>
    </div>
</div>


            <div className="container mx-auto p-4 bg-light-neutral rounded dark:bg-dark-neutral">
                <div className="bg-light-neutral rounded px-8 pt-6 pb-8 mb-4 dark:bg-dark-neutral">
                    <h2 className="text-2xl font-bold mb-4 text-center text-light-text dark:text-dark-text">Feedback</h2>
                    <div>
                        <p className="text-light-text dark:text-dark-text">{feedback}</p>
                    </div>
                </div>
            </div>
        </>
    );
};

export default FeedbackForm;
