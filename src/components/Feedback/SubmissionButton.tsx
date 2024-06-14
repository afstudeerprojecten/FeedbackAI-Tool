// SubmissionButton.tsx
import React from 'react';

interface SubmissionButtonProps {
    onSubmit: (e: React.FormEvent) => Promise<void>; 
}

const SubmissionButton: React.FC<SubmissionButtonProps> = ({ onSubmit }) => {
    return (
        <>
        <button 
        type="submit"
        className="btn btn-neutral text-dark-text dark:bg-dark-btn dark:text-light-text dark:btn-primary"
        onClick={onSubmit}>Submit</button>
        </>
    );
};

export default SubmissionButton;
