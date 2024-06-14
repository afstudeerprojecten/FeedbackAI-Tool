import React, { useState, useEffect } from "react";
import { fetchEventByEventID } from "../../services/eventLogService";
import { fetchStudentName } from "../../services/studentService";

const DashboardUserOverview: React.FC = () => {
  const [events, setEvents] = useState<any[]>([]);
  const [filterMode, setFilterMode] = useState<string>("allTime");

  useEffect(() => {
    const change_id_to_name = async (id: number) => {
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
        const filteredData = filterMode === "thisMonth" ? filterThisMonthData(data) : data;
        const userValues: { [key: string]: number } = {};
    
        await Promise.all(
          filteredData.map(async (event: any) => {
            const userName = await change_id_to_name(event.user_id);
            if (userName) {
              if (!userValues[userName]) {
                userValues[userName] = 0;
              }
              userValues[userName] += event.value; // assuming 'value' is the property you want to sum up
            }
          })
        );
    
        const aggregatedData = Object.keys(userValues)
          .map((userName) => ({
            user_name: userName,
            total_value: userValues[userName],
          }))
          .sort((a, b) => b.total_value - a.total_value); // sort in descending order by total_value
    
        setEvents(aggregatedData);
      } catch (error: any) {
        console.error(error.message);
      }
    };
    

    const filterThisMonthData = (data: any[]) => {
      const today = new Date();
      const startOfMonth = new Date(today.getFullYear(), today.getMonth(), 1);
      const endOfMonth = new Date(today.getFullYear(), today.getMonth() + 1, 0);
    
      const filteredData = data.filter(event => {
        const eventDate = new Date(event.date_created);
        return eventDate >= startOfMonth && eventDate <= endOfMonth;
      });
    
    
      return filteredData;
    };
    
    

    fetchData();
  }, [filterMode]);

  return (
    <div className="p-6">
      <h2 className="text-xl font-bold mb-4 text-light-text dark:text-dark-text">Login Overview</h2>
      <div className="mb-4">
        <button
          className={`px-4 py-2 mr-2 ${filterMode === "allTime" ? "btn btn-neutral text-white dark:bg-gray-200 dark:text-gray-700" : " btn bg-gray-200 text-gray-700 dark:bg-dark-neutral dark:text-white" } rounded-lg`}
          onClick={() => setFilterMode("allTime")}
        >
          All Time
        </button>
        <button
          className={`px-4 py-2 ${filterMode === "thisMonth" ? "btn btn-neutral dark:bg-gray-200 dark:text-gray-700" : " btn bg-gray-200 text-gray-700 dark:bg-dark-neutral dark:text-white"} rounded-lg`}
          onClick={() => setFilterMode("thisMonth")}
        >
          This Month
        </button>
      </div>
      <table className="min-w-full divide-y">
        <thead className="bg-base">
          <tr>
            <th
              scope="col"
              className="px-6 py-3 text-left text-xs font-medium text-light-text dark:text-dark-text uppercase tracking-wider"
            >
              User
            </th>
            <th
              scope="col"
              className="px-6 py-3 text-left text-xs font-medium text-light-text dark:text-dark-text uppercase tracking-wider"
            >
              Total Logins
            </th>
          </tr>
        </thead>
        <tbody className="bg-base divide-y ">
          {events.map((event) => (
            <tr key={event.user_name}>
              <td className="px-6 py-4 whitespace-nowrap text-light-text dark:text-dark-text">{event.user_name}</td>
              <td className="px-6 py-4 whitespace-nowrap text-light-text dark:text-dark-text">{event.total_value}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default DashboardUserOverview;
