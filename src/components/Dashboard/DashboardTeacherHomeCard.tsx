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
                <h1 className="text-6xl font-bold text-light-text dark:text-dark-text ">Welcome back {user.name}</h1>
                <div className="bg-white dark:bg-gray-800 rounded-lg p-8">
                    <h2 className="text-xl font-bold mb-4">kaka</h2>
                   
                </div>
            </div>
        </div>
    );
};

export default DashboardTeacherHomeCard;
