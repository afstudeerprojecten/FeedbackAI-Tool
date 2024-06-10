import React, { useEffect, useState } from "react";
import { fetchStudentByEmail } from "../../services/studentService";
import { fetchEventByUser } from "../../services/eventLogService";



const DashboardUserHomePage: React.FC = () => {
    const [events, setEvents] = useState<any[]>([]);
    const [user, setUser] = useState<any>({});
    useEffect(() => {
        const fetchData = async () => {
            try {
                const user = await fetchStudentByEmail(JSON.parse(sessionStorage.getItem('user') || '{}').email);
                setUser(user);
                const data = await fetchEventByUser(1);
                setEvents(data);
            } catch (error: any) {
                console.error(error.message);
            }
        };

        fetchData();
    }, []);
    
    

    return (
        <div className="text-6xl font-bold text-light-text dark:text-dark-text">
            <h1 className="text-2xl font-bold p-6">Welcome back {user.name}</h1>
        </div>
    );
};

export default DashboardUserHomePage;