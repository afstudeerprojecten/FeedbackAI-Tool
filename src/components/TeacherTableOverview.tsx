import React, { useState, useEffect } from 'react';
import { fetchTeachers } from '../services/teacherService';

const TeachersOverviewTable: React.FC = () => {
  const [teachers, setTeachers] = useState<any[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await fetchTeachers();
        setTeachers(data);
      } catch (error: any) {
        console.error(error.message);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="p-6">
      <h2 className="text-xl font-bold mb-4">Teachers Overview</h2>
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-base">
          <tr>
            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              ID
            </th>
            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Name
            </th>
            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Lastname
            </th>
            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Email
            </th>
            {/* Add more table headers as needed */}
          </tr>
        </thead>
        <tbody className="bg-base divide-y divide-gray-200">
          {teachers.map((teacher) => (
            <tr key={teacher.id}>
              <td className="px-6 py-4 whitespace-nowrap">{teacher.id}</td>
              <td className="px-6 py-4 whitespace-nowrap">{teacher.name}</td>
              <td className="px-6 py-4 whitespace-nowrap">{teacher.lastname}</td>
              <td className="px-6 py-4 whitespace-nowrap">{teacher.email}</td>
              {/* Add more table cells for other teacher properties */}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default TeachersOverviewTable;
