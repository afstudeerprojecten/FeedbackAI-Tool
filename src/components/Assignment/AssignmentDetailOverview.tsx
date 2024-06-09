import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { fetchAssigments } from "../../services/assignmentService";

const AssignmentDetailOverview: React.FC = () => {
    const [assignments, setAssignments] = useState<any[]>([]);
    const [showTemplates, setShowTemplates] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchData = async () => {
            try {
                const data = await fetchAssigments();
                setAssignments(data);
                console.log(data);
            } catch (error: any) {
                console.error(error.message);
            }
        };

        fetchData();
    }, []);

    useEffect(() => {
        const user = sessionStorage.getItem('user');
        const role = user ? JSON.parse(user).role : null;
        setShowTemplates(role === 'Teacher');
    }, []);

    const handleViewMore = (id: number) => {
        navigate(`/assignment/${id}`);
    }

    const shortenDescription = (description: string) => {
        return description.length > 50 ? `${description.substring(0, 50)}...` : description;
    }


    return (
        <div>
            <h2 className="text-xl font-bold mb-2 text-light-text dark:text-dark-text ml-4">
                All assignments</h2>

            <div className="overflow-x-auto">

                <table className="table table-md">
                    <thead >
                        <tr className="px-6 py-3 text-left text-xs font-medium text-light-text dark:text-dark-text uppercase tracking-wider">
                            <th scope="col">
                                Title
                            </th>
                            <th scope="col">
                                Description
                            </th>
                            <th scope="col">
                                Course
                            </th>
                            <th scope="col">
                                Templates
                            </th>
                        </tr>
                    </thead>

                    <tbody className="bg-light-neutral dark:bg-dark-neutral divide-y divide-gray-200">
                        {assignments.map(assignment => (
                            <tr key={assignment.id}>
                                <td>
                                    {assignment.title}
                                </td>
                                <td>
                                    {shortenDescription(assignment.description)}
                                </td>
                                <td>
                                    {assignment.course.name}
                                </td>
                                <td>
                                    {assignment.templates.length}
                                </td>
                                <td className="btn">
                                    <button onClick={() => handleViewMore(assignment.id)}>View More...</button>
                                </td>
                            </tr>
                        ))}

                    </tbody>

                </table>
            </div>
        </div>

    );

}

export default AssignmentDetailOverview;