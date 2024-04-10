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
        <div className="mb-4">
            <label className="block text-sm font-bold mb-2" htmlFor="assignment">
                Choose an assignment
            </label>

            <select 
                id="assignment" 
                value={selectedAssignment} 
                onChange={(e) => onSelectAssignment(e.target.value)}
                className="w-full border rounded px-3 py-2"
                required
            >
                
                <option value="">Select an assignment</option>
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