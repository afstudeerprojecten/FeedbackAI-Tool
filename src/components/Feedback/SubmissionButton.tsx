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
        className="bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600"
        onClick={onSubmit}>Submit</button>
        </>
    );
};

export default SubmissionButton;
