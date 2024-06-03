import React, {useState, useEffect} from "react";
import { fetchEventByEventID } from "../../services/eventLogService";


const DashboardUserChart: React.FC = () => {
    const [events, setEvents] = useState<any[]>([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const data = await fetchEventByEventID(1);
                setEvents(data);
            } catch (error: any) {
                console.error(error.message);
            }
        };

        fetchData();

    }, []);

    return (
        <div className="p-6">
    
        </div>
    );
}

export default DashboardUserChart;