import React, { useState } from 'react';
import SubmissionButton from './SubmissionButton';
import SubmissionInput from './SubmissionInput';
import { CreateSubmission, Feedback, SubmissionChatCompletion } from '../../Interfaces/interfaces';
import { submitAssignment } from '../../services/feedbackService';
import { fetchStudentByEmail } from '../../services/studentService';

interface FeedbackFormProps {
    assignmentId: number;
}

const FeedbackForm: React.FC<FeedbackFormProps> = ({assignmentId}) => {
    const [submission, setSubmission] = useState<string>('');
    const [feedback, setFeedback] = useState<string>('Please submit your work');

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

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
                    assignment_id: assignmentId,
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
