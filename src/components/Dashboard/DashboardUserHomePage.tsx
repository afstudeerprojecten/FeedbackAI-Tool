import React, { useEffect, useState } from "react";
import { fetchStudentByEmail } from "../../services/studentService";
import { fetchEventByUser, fetchEventNameById } from "../../services/eventLogService";
import { fetchSubmissionByUser } from "../../services/submissionService";





const DashboardUserHomePage: React.FC = () => {
    const [events, setEvents] = useState<any[]>([]);
    const [user, setUser] = useState<any>({});
    const [submissions, setSubmissions] = useState<any[]>([]);
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
                    if (!acc[key]) {
                        acc[key] = { ...event, name: eventName.name, value: 0 }; // Initialize if not already present
                    }
                    acc[key].value += event.value; // Sum the count attribute
                    return acc;
                }, Promise.resolve({}));
    
                // Convert groupedEvents back to an array
                const groupedEventsArray = Object.values(groupedEvents);
                setEvents(groupedEventsArray);
                const submissions = await fetchSubmissionByUser(user.id);
                setSubmissions(submissions);

            } catch (error: any) {
                console.error(error.message);
            }
        };
        fetchData();
    }, []);
    

    return (
        <div className="container mx-auto">
            <div className="grid grid-cols-2 gap-4">
            <h1 className="text-6xl font-bold text-light-text dark:text-dark-text ">Welcome back {user.name}</h1>
            <div className="bg-white dark:bg-gray-800 shadow-md rounded-lg p-8">
            <h2 className="text-xl font-bold mb-4">Your Activity</h2>
            <ul>
                {events.map((event, index) => (
                    <li key={index} className="border-b border-gray-300 dark:border-gray-700 p-2">
                        <strong>{event.name}</strong> :   {event.value}
                    </li>
                
                ))}
                <li className="border-b border-gray-300 dark:border-gray-700 p-2">
                    <strong>Submissions</strong> : {submissions.length}
                </li>
            </ul>
            </div>
            </div>
        </div>
    );
};

export default DashboardUserHomePage;