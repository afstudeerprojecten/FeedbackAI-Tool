// AssignmentSelector.tsx
import React from 'react';
import { Assignment } from '../../Interfaces/interfaces';


interface AssignmentSelectorProps {
    assignments: Assignment[];
    selectedAssignment: string;
    onSelectAssignment: (assignmentId: string) => void;
}

const AssignmentSelector: React.FC<AssignmentSelectorProps> = ({ assignments, selectedAssignment, onSelectAssignment }) => {
   
    return (
        <div className="mb-4 mt-2">
            <label className="block text-sm font-bold text-light-text dark:text-dark-text" htmlFor="assignment">
                Choose an assignment
            </label>

            <select 
                id="assignment" 
                value={selectedAssignment} 
                onChange={(e) => onSelectAssignment(e.target.value)}
                className="w-full border rounded px-3 py-2 text-light-text dark:text-dark-text bg-light-neutral dark:bg-dark-neutral dark:border-gray-500 dark:text-dark-text dark:focus-dark-primary focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                required
            >
                
                <option value="">Select an Assignment</option>
                {assignments.map((assignment) => (
                    <option key={assignment.id} value={assignment.id}>
                        {assignment.title}
                    </option>
                    ))
                }

            </select>
        </div>
    );
};

export default AssignmentSelector;