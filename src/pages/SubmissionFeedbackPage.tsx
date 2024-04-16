import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import FeedbackContent from "../components/Submission/FeedbackContent";
import { fetchFeedback } from "../services/feedbackService";
const SubmissionFeedbackPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [content, setFeedback] = useState<string>("");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchContent = async () => {
      try {
        if (id) { // Check if id is defined
          const data = await fetchFeedback(Number(id)); // Convert id to number
          setFeedback(data.content);
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
        <div className="min-h-screen bg-light-neutral dark-bg-dark-neutral">
          <button className="btn bg-light-btn text-dark-text dark:bg-dark-btn dark:text-light-text dark:btn-primary m-4" onClick={handleGoBack}>Back to Overview</button>
          <FeedbackContent feedback={content} />
        </div>
      );
    };
    

export default SubmissionFeedbackPage;
