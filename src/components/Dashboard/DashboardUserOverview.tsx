import React, {useState, useEffect} from "react";
import { fetchEventByEventID } from "../../services/eventLogService";
import {fetchStudentName} from "../../services/studentService";

const DashboardUserOverview: React.FC = () => {
    const [events, setEvents] = useState<any[]>([]);

    

    useEffect(() => {
      const change_id_to_name = async (id:number) => {
        try {
          const data = await fetchStudentName(id);
          return data;
        } catch (error: any) {
          console.error(error.message);
        }
      };

        const fetchData = async () => {
            try {
                const data = await fetchEventByEventID(1);
                data.map(async (event: any) => {
                  event.user_name = await change_id_to_name(event.user_id);
                });
                setEvents(data);
            } catch (error: any) {
                console.error(error.message);
            }
        };

        fetchData();
       

    }, []);

    return (
        <div className="p-6">
      <h2 className="text-xl font-bold mb-4">Login Overview</h2>
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-base">
          <tr>
            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              User
            </th>
            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              value
            </th>
            {/* Add more table headers as needed */}
          </tr>
        </thead>
        <tbody className="bg-base divide-y divide-gray-200">
          {events.map((event) => (
            <tr key={event.id}>
              <td className="px-6 py-4 whitespace-nowrap">{event.user_name}</td>
              <td className="px-6 py-4 whitespace-nowrap">{event.value}</td>
              {/* Add more table cells for other student properties */}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
    );
};

export default DashboardUserOverview;