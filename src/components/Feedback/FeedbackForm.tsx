import React, { useState } from 'react';
import SubmissionButton from './SubmissionButton';
import SubmissionInput from './SubmissionInput';
import { CreateSubmission, Feedback, SubmissionChatCompletion } from '../../Interfaces/interfaces';
import { submitAssignment } from '../../services/feedbackService';
import { fetchStudentByEmail } from '../../services/studentService';
import { registerEvent } from '../../services/eventLogService';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faThumbsUp, faThumbsDown } from '@fortawesome/free-solid-svg-icons';
import Markdown from "react-markdown";
import { toast } from 'react-toastify';


interface FeedbackFormProps {
    assignmentId: number;
}

const FeedbackForm: React.FC<FeedbackFormProps> = ({ assignmentId }) => {
    const [submission, setSubmission] = useState<string>('');
    const [feedback, setFeedback] = useState<string>('Please submit your work');
    const [feedbackId, setFeedbackId] = useState<number>();
    const [feedbackInteracted, setFeedbackInteracted] = useState(false); // New state for tracking button interactions


    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const handleSubmissionSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError(null);
        setLoading(true);
        setFeedback("")
        setFeedbackInteracted(false)
        try {
            let sessionUser = sessionStorage.getItem("user")
            if (sessionUser != null) {
                let realUser = JSON.parse(sessionUser)
                let student = await fetchStudentByEmail(realUser.email)
                const dataSubmission: CreateSubmission = {
                    assignment_id: assignmentId,
                    student_id: student.id,
                    content: submission
                }

                const ChatCompletion: SubmissionChatCompletion = await submitAssignment(dataSubmission)

                const feedback: Feedback = ChatCompletion.feedback
                setFeedbackId(feedback.id)
                registerEvent({ event_id: 2, user_id: student.id, value: ChatCompletion.usage_total_tokens })
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

    const handleLike = async (feedbackId: number) => {
        try {
            const user = sessionStorage.getItem('user');
            const email = user ? JSON.parse(user).email : null;
            const userRole = user ? JSON.parse(user).role : null;

            if (!email) {
                throw new Error('Email not found in sessionStorage');
            }

            if (userRole === 'student') {
                const student = await fetchStudentByEmail(email);
                await registerEvent({ event_id: 5, user_id: student.id, value: feedbackId });
                toast.info('Liked feedback successfully');
                setFeedbackInteracted(true);
            }
        } catch (error) {
            toast.error('Error liking the feedback');
        }
    };

    const handleDislike = async (feedbackId: number) => {
        try {
            const user = sessionStorage.getItem('user');
            const email = user ? JSON.parse(user).email : null;
            const userRole = user ? JSON.parse(user).role : null;

            if (!email) {
                throw new Error('Email not found in sessionStorage');
            }

            if (userRole === 'student') {
                const student = await fetchStudentByEmail(email);
                await registerEvent({ event_id: 6, user_id: student.id, value: feedbackId });
                toast.info('Disliked feedback successfully');
                setFeedbackInteracted(true);
            }
        } catch (error) {
            toast.error('Error disliking the feedback');
        }
    };

    return (
        <>
            <div className="card bg-white dark:bg-gray-800 rounded-lg p-4 mb-8 w-3/4 mx-auto">
                <div className="bg-light-neutral rounded px-8 pt-6 pb-8 mb-4 dark:bg-dark-neutral">
                    <h2 className="text-2xl font-bold mb-4 text-center text-light-text dark:text-dark-text">Submission Form</h2>
                    <form>
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


            <div className="card bg-white dark:bg-gray-800 rounded-lg p-4 mb-8 w-3/4 mx-auto">
                <div className="bg-light-neutral rounded px-8 pt-6 pb-8 mb-4 dark:bg-dark-neutral">
                    <h2 className="text-2xl font-bold mb-4 text-center text-light-text dark:text-dark-text">Feedback</h2>
                    <div>
                        <p className="text-light-text dark:text-dark-text">
                            <Markdown>{feedback}</Markdown>
                        </p>
                    </div>
                    {feedback && feedbackId && (
                        <div className="flex justify-center mt-4">
                            <FontAwesomeIcon
                                icon={faThumbsUp}
                                className={`text-green-500 cursor-pointer mx-2 ${feedbackInteracted ? 'opacity-50 cursor-not-allowed' : ''}`}
                                onClick={() => !feedbackInteracted && handleLike(feedbackId)}
                                size='2x'
                            />
                            <FontAwesomeIcon
                                icon={faThumbsDown}
                                className={`text-red-500 cursor-pointer mx-2 ${feedbackInteracted ? 'opacity-50 cursor-not-allowed' : ''}`}
                                onClick={() => !feedbackInteracted && handleDislike(feedbackId)}
                                size='2x'
                            />

                        </div>
                    )}
                </div>
            </div>
        </>
    );
};

export default FeedbackForm;
