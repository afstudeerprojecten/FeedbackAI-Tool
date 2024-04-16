// TextInput.tsx
import React from 'react';

interface SubmissionInputProps {
    value: string;
    onChange: (value: string) => void;
}

const SubmissionInput: React.FC<SubmissionInputProps> = ({ value, onChange }) => {
    return (
        <div className="mb-4">
            <label className="block text-sm font-bold text-light-text dark:text-dark-text" htmlFor="work">Your work</label>
            <textarea 
                className="w-full border rounded px-3 py-2 text-light-text dark:text-dark-text bg-light-neutral dark:bg-dark-neutral dark:border-gray-500 dark:text-dark-text dark:focus-dark-primary focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                rows={13}
                id="submission"
                value={value}
                placeholder='Enter your submission here...'
                onChange={(e) => onChange(e.target.value)} />
        </div>
    );
};

export default SubmissionInput;
