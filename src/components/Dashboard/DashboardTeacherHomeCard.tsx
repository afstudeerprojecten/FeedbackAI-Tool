import React, { useEffect, useState } from "react";
import { fetchTeacherByEmail } from "../../services/teacherService";


const DashboardTeacherHomeCard: React.FC = () => {
    const [user, setUser] = useState<any>({});

    useEffect(() => {
        const fetchData = async () => {
            const user = await fetchTeacherByEmail(JSON.parse(sessionStorage.getItem('user') || '{}').email);
            setUser(user);
            
        };
        fetchData();
    }, []);

    return (
        <div className="container mx-auto">
            <div className="grid grid-cols-2 gap-4">
                <h1 className="text-6xl font-bold text-light-text dark:text-dark-text pb-16 ">Welcome back {user.name}</h1>
            </div>
        </div>
    );
};

export default DashboardTeacherHomeCard;
