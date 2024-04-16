import React from 'react';
import AssignmentTemplatesOverview from '../components/Templates/TemplateTableOverview';
import { useNavigate } from 'react-router-dom';

const TemplatesTableOverviewPage: React.FC = () => {


  const navigate = useNavigate();
  const handleGoBack = () => {
    navigate('/assignments', { replace: true });
};
  return (
    <div className="bg-light-neutral dark:bg-dark-neutral">
      <button className="btn bg-light-btn text-dark-text dark:bg-dark-btn dark:text-light-text dark:btn-primary m-4" onClick={handleGoBack}>Back to Overview</button>
      <AssignmentTemplatesOverview />

    </div>
  );
};

export default TemplatesTableOverviewPage;
