// TextInput.tsx
import React from 'react';

interface SubmissionInputProps {
    value: string;
    onChange: (value: string) => void;
}

const SubmissionInput: React.FC<SubmissionInputProps> = ({ value, onChange }) => {
    return (
        <div className="mb-4">
            <label className="block text-sm font-bold mb-2" htmlFor="work">Your work</label>
            <textarea 
                className="mt-1 p-2 block w-full border border-gray-300 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 max-w-full"
                rows={13}
                id="submission"
                value={value}
                onChange={(e) => onChange(e.target.value)} />
        </div>
    );
};

export default SubmissionInput;
