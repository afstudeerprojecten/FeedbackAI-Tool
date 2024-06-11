import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { fetchAssignmentById } from "../../services/assignmentService";
import Markdown from "react-markdown";


const AssignmentIndividualOverview: React.FC = () => {
    const [assignment, setAssignment] = useState<any>();
    const navigate = useNavigate();
    const { id } = useParams<{ id: any }>();

    useEffect(() => {
        const fetchAssigment = async () => {
            try {
                if (id) { // Check if id is defined
                    const data = await fetchAssignmentById(Number(id)); // Convert id to number
                    setAssignment(data);
                } else {
                    throw new Error("No assignment id provided");
                }
            } catch (error) {
                console.error('Error fetching assignment:', error);
                navigate('/assignment', { replace: true });
            }
        };

        fetchAssigment();
    }, []);

    return (
        <div className="container mx-auto w-3/4">
            <h2 className="text-xl font-bold mb-2 text-light-text dark:text-dark-text ml-4 text-center">
                Assignment Overview: {assignment && assignment.title}</h2>

            <div className="container">
                <table>
                    <tbody className="overflow-x-auto table table-md">
                        {!assignment &&
                            <tr>
                                <td>Loading...</td>
                            </tr>}
                        {assignment && // make sure assignment has been set
                            <>
                                <tr className="text-lg"
                                    >
                                    <th>Title</th>
                                    <td>{assignment.title}</td>
                                </tr>
                                <tr>
                                    <th>Description</th>
                                    <td><Markdown className="w-3/4 overflow-auto">{assignment.description}</Markdown></td>
                                </tr>
                                <tr>
                                    <th>Course</th>
                                    <td>{assignment.course.name}</td>
                                </tr>
                                <tr>
                                    <th>Students Age</th>
                                    <td>{assignment.student_ages}</td>
                                </tr>
                                <tr>
                                    <th>Word Count</th>
                                    <td>{assignment.word_count}</td>
                                </tr>
                            </>
                        }
                    </tbody>
                </table>

            </div>

        </div>
    );

};

export default AssignmentIndividualOverview;