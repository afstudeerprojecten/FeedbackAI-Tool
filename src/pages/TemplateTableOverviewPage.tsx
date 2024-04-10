import React from 'react';
import AssignmentTemplatesOverview from '../components/Templates/TemplateTableOverview';
import { useNavigate } from 'react-router-dom';

const TemplatesTableOverviewPage: React.FC = () => {


  const navigate = useNavigate();
  const handleGoBack = () => {
    navigate('/assignments', { replace: true });
};
  return (
    <div>
      <button className="btn btn-primary m-4" onClick={handleGoBack}>Back to Overview</button>
      <AssignmentTemplatesOverview />

    </div>
  );
};

export default TemplatesTableOverviewPage;
