import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import AssignmentDescription from "../components/Assignment/AssignmentDescription";
import { fetchAssignmentById } from "../services/assignmentService";

const AssignmentDescriptionPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [description, setDescription] = useState<string>("");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchDescription = async () => {
      try {
        if (id) { // Check if id is defined
          const data = await fetchAssignmentById(Number(id)); // Convert id to number
          setDescription(data.description);
        } else {
          throw new Error("No assignment id provided");
        }
      } catch (error) {
        console.error('Error fetching assignment description:', error);
        navigate('/assignment', { replace: true });
      }
    };

    fetchDescription();
  }, [id, navigate]);

    const handleGoBack = () => {
        navigate('/assignments', { replace: true });
    };
    return (
        <div>
          <button className="btn btn-primary m-4" onClick={handleGoBack}>Back to Overview</button>
          <AssignmentDescription description={description} />
        </div>
      );
    };
    

export default AssignmentDescriptionPage;
