import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import SubmissionContent from "../components/Submission/SubmissionContent";
import { fetchSubmission } from "../services/submissionService";
const SubmissionContentPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [content, setContent] = useState<string>("");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchContent = async () => {
      try {
        if (id) { // Check if id is defined
          const data = await fetchSubmission(Number(id)); // Convert id to number
          setContent(data.content);
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
        <div>
          <button className="btn btn-primary m-4" onClick={handleGoBack}>Back to Overview</button>
          <SubmissionContent content={content} />
        </div>
      );
    };
    

export default SubmissionContentPage;
