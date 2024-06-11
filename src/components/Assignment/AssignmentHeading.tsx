import React from 'react';
import { Link } from 'react-router-dom';

const AssignmentHeading: React.FC = () => {
    return (
        <div className="container mx-auto">
            <div className="flex flex-col justify-center items-center">
                <h1 className="text-3xl font-bold text-light-text dark:text-dark-text mb-2">Assignments</h1>
                <button className="btn bg-light-btn text-dark-text dark:bg-dark-btn dark:text-light-text dark:btn-primary mb-8">
                    <Link className='text-xl'
                        to="/newassignment">Create Assignment</Link>
                    </button>
            </div>
        </div>
    );
}

export default AssignmentHeading;