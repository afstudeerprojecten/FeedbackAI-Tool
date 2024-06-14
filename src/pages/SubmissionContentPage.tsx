import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import SubmissionContent from "../components/Submission/SubmissionContent";
import { fetchSubmission } from "../services/submissionService";
import FeedbackContent from "../components/Submission/FeedbackContent";
import { fetchFeedback } from "../services/feedbackService";
import { format } from "date-fns";
const SubmissionContentPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [submission , setSubmission] = useState<any>();
  const [submissionContent, setSubmissionContent] = useState<string>("");
  const [feedbackContent, setFeedbackContent] = useState<string>("");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchContent = async () => {
      try {
        if (id) { // Check if id is defined
          const data = await fetchSubmission(Number(id)); // Convert id to number
          setSubmission(data);
          setSubmissionContent(data.content);
          console.log(data);
          const feedback = await fetchFeedback(Number(id));
          setFeedbackContent(feedback.content);
        } else {
          throw new Error("No assignment id provided");
        }
      } catch (error) {
        console.error('Error fetching assignment content:', error);
        navigate('/submission', { replace: true });
      }
    };

    fetchContent();
  }, [id, navigate]);

  const handleGoBack = () => {
    navigate('/submissions', { replace: true });
  };
  return (
    <div className="min-h-screen bg-neutral-100 text-light-text dark:bg-dark-neutral dark:text-dark-text">
      <div className="w-3/4 mx-auto">
        <button className="btn btn-neutral dark:bg-dark-btn dark:text-light-text dark:btn-primary mb-4 mt-8" onClick={handleGoBack}>Back to Overview</button>
        <h2 className="text-4xl font-bold mb-2 text-center mb-8">
          Submission</h2>
          <div className="card bg-white dark:bg-gray-800 rounded-lg p-4 mt-4 mb-6">
            <div className="p-6">
            <h3 className="text-xl font-bold mb-4">Submission info</h3>
            <p>Assignment title: {submission && submission.assignment.title}</p>
            <p>Student: {submission && submission.student.name}</p>
            <p>Submitted at: {submission && format(new Date(submission.date_created), 'dd/MM/yyyy HH:mm')}</p>
            </div>
          </div>
        <div className="card bg-white dark:bg-gray-800 rounded-lg p-4 mt-4 mb-6">
          <SubmissionContent content={submissionContent} />
        </div>
        <div className="card bg-white dark:bg-gray-800 rounded-lg p-4 mt-4 mb-6">
          <FeedbackContent feedback={feedbackContent} />
        </div>
      </div>
    </div>
  );
};


export default SubmissionContentPage;
