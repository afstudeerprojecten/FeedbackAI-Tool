import React, { useState, useEffect } from "react";
import { fetchSubmissions } from "../../services/submissionService";
import { fetchStudent } from "../../services/studentService";
import { useNavigate } from "react-router-dom";

const SubmissionTableOverview: React.FC = () => {
  const [submissions, setSubmissions] = useState<any[]>([]);
  const [studentNames, setStudentNames] = useState<{ [id: number]: string }>({});
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await fetchSubmissions();
        setSubmissions(data);
        // Fetch and cache student names
        const studentIds = data.map((submission: { student_id: any; }) => submission.student_id);
        const names = await fetchStudentNames(studentIds);
        setStudentNames(names);
      } catch (error:any) {
        console.error(error.message);
      }
    };

    fetchData();
  }, []);

  const fetchStudentNames = async (studentIds: number[]) => {
    const names: { [id: number]: string } = {};
    try {
      for (const id of studentIds) {
        const student = await fetchStudent(id);
        names[id] = student.name;
      }
    } catch (error:any) {
      console.error(error.message);
    }
    return names;
  }

  const handleViewSubmission = async (id: number) => {
    navigate(`/submission/${id}`);
  }

  return (
    <div className="p-6">
      <h2 className="text-xl font-bold mb-4">Submission Overview</h2>
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-base">
          <tr>
            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Assignment
            </th>
            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Student ID
            </th>
            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Student Name
            </th>
            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              View Submission
            </th>

          </tr>
        </thead>
        <tbody className="bg-base divide-y divide-gray-200">
          {submissions.map(submission => (
            <tr key={submission.id}>
              <td className="px-6 py-4 whitespace-nowrap">{submission.assignment_id}</td>
              <td className="px-6 py-4 whitespace-nowrap">{submission.student_id}</td>
              <td className="px-6 py-4 whitespace-nowrap">{studentNames[submission.student_id]}</td>
              <td className="px-6 py-4 whitespace-nowrap">
                <button onClick={() => handleViewSubmission(submission.id)}>View Submission</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default SubmissionTableOverview;
