// OrganizationsOverviewPage.tsx

import React from 'react';
import AdminOverviewTable from '../components/Admin/AdminOverviewTable'; // Adjust the path as per your project structure

const AdminOverviewTablePage: React.FC = () => {
  return (
    <main className="min-h-screen min-w-screen bg-light-neutral dark:bg-dark-neutral">
    <AdminOverviewTable />
    </main>
  );
};

export default AdminOverviewTablePage;
