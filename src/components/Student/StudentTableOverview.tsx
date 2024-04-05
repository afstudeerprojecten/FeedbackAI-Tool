import React, { useState, useEffect } from 'react';
import { fetchStudents, deleteStudent } from '../../services/studentService';
// import { useNavigate } from 'react-router-dom';

const StudentTableOverview: React.FC = () => {
  const [students, setStudents] = useState<any[]>([]);

//   const nav = useNavigate();
  const clickDelete = (id: number) => {
    // Display confirmation dialog
    const confirmDelete = window.confirm('Are you sure you want to delete this student?');

    if (confirmDelete) {
      // User clicked OK, proceed with deletion
      deleteStudent(id)
        .then(() => {
          const newStudents = students.filter((student) => student.id !== id);
          setStudents(newStudents);
        })
        .catch((error: any) => {
          console.error(error.message);
        });
    } else {
      // User clicked Cancel, do nothing
      console.log('Deletion cancelled by user');
    }
  }
//   const clickUpdate = (updateId: any) => {
//     sessionStorage.setItem('updateId', updateId);
//     nav('/student/update');
// };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await fetchStudents();
        setStudents(data);
      } catch (error: any) {
        console.error(error.message);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="p-6">
      <h2 className="text-xl font-bold mb-4">Students Overview</h2>
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
            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Update
            </th>
            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Delete
            </th>
            {/* Add more table headers as needed */}
          </tr>
        </thead>
        <tbody className="bg-base divide-y divide-gray-200">
          {students.map((student) => (
            <tr key={student.id}>
              <td className="px-6 py-4 whitespace-nowrap">{student.id}</td>
              <td className="px-6 py-4 whitespace-nowrap">{student.name}</td>
              <td className="px-6 py-4 whitespace-nowrap">{student.lastname}</td>
              <td className="px-6 py-4 whitespace-nowrap">{student.email}</td>
              {/* <td className="px-6 py-4 whitespace-nowrap">
                <button onClick={() => clickUpdate(student.id)} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                  Update
                </button>
              </td> */}
              <td className="px-6 py-4 whitespace-nowrap">
                <button onClick={() => clickDelete(student.id)} className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded">
                  Delete
                </button>
              </td>
              {/* Add more table cells for other student properties */}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default StudentTableOverview;
