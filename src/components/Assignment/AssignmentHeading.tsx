import React from 'react';
import { Link } from 'react-router-dom';

const AssignmentHeading: React.FC = () => {
    return (
        <div className="container mx-auto ">
            <div className="flex flex-col justify-center items-center pt-10">
                <button className="btn btn-neutral dark:bg-dark-btn dark:text-light-text dark:btn-primary mb-8">
                    <Link className='text-xl'
                        to="/newassignment">Create Assignment</Link>
                    </button>
            </div>
        </div>
    );
}

export default AssignmentHeading;