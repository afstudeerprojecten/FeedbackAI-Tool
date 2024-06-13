import React, { useState, useEffect } from "react";
import { fetchSubmissions } from "../../services/submissionService";
import { fetchStudentName } from "../../services/studentService";

const SubmissionOverviewCard: React.FC = () => {
  const [submissions, setEvents] = useState<any[]>([]);

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
        const data = await fetchSubmissions();
        const userValues: { [key: string]: number } = {};
    
        await Promise.all(
          data.map(async (submission: any) => {
            const userName = await change_id_to_name(submission.student_id);
            if (userName) {
              if (!userValues[userName]) {
                userValues[userName] = 0;
              }
              userValues[userName] += 1; // assuming 'value' is the property you want to sum up
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

    fetchData();
  }, []);

  return (
    <div className="p-6 ">
      <h2 className="text-xl font-bold mb-4 text-light-text dark:text-dark-text">Submission Overview</h2>
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
              Total Submissions
            </th>
          </tr>
        </thead>
        <tbody className="bg-base divide-y ">
          {submissions.map((submission) => (
            <tr key={submission.user_name}>
              <td className="px-6 py-4 whitespace-nowrap text-light-text dark:text-dark-text">{submission.user_name}</td>
              <td className="px-6 py-4 whitespace-nowrap text-light-text dark:text-dark-text">{submission.total_value}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default SubmissionOverviewCard;
