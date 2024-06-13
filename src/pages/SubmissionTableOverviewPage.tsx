import SubmissionTableOverview from "../components/Submission/SubmissionTableOverview"; 
import React from "react";


const SubmissionOverviewPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-neutral-100 text-light-text dark:bg-dark-neutral text-dark-text">
    <SubmissionTableOverview />
    </div>
  );
};

export default SubmissionOverviewPage;