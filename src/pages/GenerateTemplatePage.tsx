import React from 'react';
import { useParams } from 'react-router-dom';
import GenerateTemplate from '../components/Templates/GenerateTemplate'; // Assuming this is the component you want to render
import { useNavigate } from 'react-router-dom';

const GenerateTemplatePage: React.FC = () => {
    const { id } = useParams<{ id: any }>(); // Retrieve the assignment ID from the URL parameters
    const navigate = useNavigate();

    const handleGoBack = () => {
        navigate('/assignments', { replace: true });
    };
    return (
        <div>
            <button className="btn btn-primary m-4" onClick={handleGoBack}>Back to Overview</button>
            <GenerateTemplate assignmentId={parseInt(id)} /> {/* Pass the assignment ID to the GenerateTemplate component */}
        </div>
    );
};

export default GenerateTemplatePage;
