import React from 'react';
import AssignmentNew from '../components/Assignment/AssignmentNew';

const AssignmentCreatePage: React.FC = () => {
    return (
        <main className="min-h-screen min-w-screen bg-neutral-100 dark:bg-dark-neutral">
            <AssignmentNew />
        </main>
    );
};

export default AssignmentCreatePage;
