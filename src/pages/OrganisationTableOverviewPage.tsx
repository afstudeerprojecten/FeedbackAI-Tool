// OrganizationsOverviewPage.tsx

import React from 'react';
import OrganizationsOverviewTable from '../components/Organisation/OrganisationTableOverview'; // Adjust the path as per your project structure

const OrganizationsOverviewPage: React.FC = () => {
  return (
    <div className="container mx-auto">
      <OrganizationsOverviewTable />
    </div>
  );
};

export default OrganizationsOverviewPage;
