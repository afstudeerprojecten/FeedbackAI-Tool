import React, { useEffect, useState } from "react";
import { fetchStudentByEmail } from "../../services/studentService";
import { fetchEventByUser, fetchEventNameById } from "../../services/eventLogService";
import { fetchSubmissionByUser } from "../../services/submissionService";
import { fetchAssigments } from "../../services/assignmentService";
import { Link } from "react-router-dom";


type Props = {
    role: string;
};
const DashboardUserHomePage: React.FC<Props> = ({role}: Props) => {
    const [events, setEvents] = useState<any[]>([]);
    const [user, setUser] = useState<any>({});
    const [submissions, setSubmissions] = useState<any[]>([]);
    const [assignments, setAssignments] = useState<any[]>([]);

    useEffect(() => {
        const fetchData = async () => {
            const change_id_to_name = async (id: number) => {
                try {
                    const data = await fetchEventNameById(id);
                    return data;
                } catch (error: any) {
                    console.error(error.message);
                }
            };

            try {
                const user = await fetchStudentByEmail(JSON.parse(sessionStorage.getItem('user') || '{}').email);
                setUser(user);
                const data = await fetchEventByUser(user.id);

                // Group and sum the events
                const groupedEvents = await data.reduce(async (accPromise: Promise<any>, event: any) => {
                    const acc = await accPromise;
                    const eventName = await change_id_to_name(event.event_id);
                    if (!eventName) {
                        return acc; // Skip if event name not found
                    }

                    const key = eventName.name; // Change 'type' to the attribute you want to group by
                    if (eventName.name === "Login" || eventName.name === "Tokens Used") {
                        if (!acc[key]) {
                            acc[key] = { ...event, name: eventName.name, value: 0 }; // Initialize if not already present
                        }
                        acc[key].value += event.value; // Sum the count attribute
                    }
                    return acc;
                }, Promise.resolve({}));

                // Convert groupedEvents back to an array
                const groupedEventsArray = Object.values(groupedEvents);
                setEvents(groupedEventsArray);
                const submissions = await fetchSubmissionByUser(user.id);
                const assignments = await fetchAssigments();
                const submittedAssignmentIds = new Set(submissions.map((submission: any) => submission.assignment_id));
                const filteredAssignments = assignments.filter((assignment: any) => !submittedAssignmentIds.has(assignment.id));
                setAssignments(filteredAssignments);
                setSubmissions(submissions);

            } catch (error: any) {
                console.error(error.message);
            }
        };
        fetchData();
    }, []);

    const getStartedLink = () => {
        if (role === 'teacher') {
            return '/assignment';
        } else if (role === 'student') {
            return '/assignment';
        } else {
            return '/login';
        }
    };

    return (
        <div className="container mx-auto">
            <div className="grid grid-cols-2 gap-4">
                <div>
                <h1 className="text-6xl font-bold text-light-text dark:text-dark-text mb-8">Welcome back {user.name}</h1>
                <Link to={getStartedLink()} className="btn btn-neutral text-dark-text dark:bg-dark-btn dark:text-light-text dark:btn-primary mt-8">Get Started</Link>
                </div>
                <div className="bg-white dark:bg-gray-800 rounded-lg p-8">
                    <h2 className="text-xl font-bold mb-4 text-light-text dark:text-dark-text">Your Activity</h2>
                    <ul>
                        {events.map((event, index) => (
                            <li key={index} className="border-b border-gray-950 dark:border-white p-2 text-light-text dark:text-dark-text">
                                <strong>{event.name}</strong> : {event.value}
                            </li>
                        ))}
                        {events.length > 1 && (
                            <li className="border-b border-gray-950 dark:border-white p-2 text-light-text dark:text-dark-text">
                                <strong>Money Spent</strong> : € {(events[1].value * 0.00002 * 0.9241).toFixed(4)}
                            </li>
                        )}
                        <li className="border-b border-gray-950 dark:border-white p-2 text-light-text dark:text-dark-text">
                            <strong>Open Assignments</strong> : {assignments.length}
                        </li>
                        <li className="border-b border-gray-950 dark:border-white p-2 text-light-text dark:text-dark-text">
                            <strong>Submissions</strong> : {submissions.length}
                        </li>
                    </ul>
                </div>  
            </div>
        </div>
    );
};

export default DashboardUserHomePage;
