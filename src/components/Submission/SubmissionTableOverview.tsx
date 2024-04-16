import React, { useState, useEffect } from "react";
import { fetchSubmissions } from "../../services/submissionService";
import { fetchStudent } from "../../services/studentService";
import { useNavigate } from "react-router-dom";
import { format } from 'date-fns';


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
  const handleViewFeedback = async (id: number) => {
    navigate(`/feedback/${id}`);
  }

  return (
    <div className="bg-light-neutral dark:bg-dark-neutral mx-4 p-6">
      <h2 className="text-xl font-bold mb-4 text-light-text dark:text-dark-text ml-4">Submission Overview</h2>
      <div className="overflow-x-auto">
        <table className="table table-md">
          <thead className="bg-light-neutral dark:bg-dark-neutral">
            <tr>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-light-text dark:text-dark-text uppercase tracking-wider">
                Assignment
              </th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-light-text dark:text-dark-text uppercase tracking-wider">
                Student ID
              </th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-light-text dark:text-dark-text uppercase tracking-wider">
                Student Name
              </th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-light-text dark:text-dark-text uppercase tracking-wider">
                Date Submitted
              </th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-light-text dark:text-dark-text uppercase tracking-wider">
                View Submission
              </th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-light-text dark:text-dark-text uppercase tracking-wider">
                View Feedback
              </th>
            </tr>
          </thead>
          <tbody className="bg-light-neutral dark:bg-dark-neutral divide-y divide-gray-200">
            {submissions.map(submission => (
              <tr key={submission.id}>
                <td className="px-6 py-4 whitespace-nowrap text-light-text dark:text-dark-text">{submission.assignment_id}</td>
                <td className="px-6 py-4 whitespace-nowrap text-light-text dark:text-dark-text">{submission.student_id}</td>
                <td className="px-6 py-4 whitespace-nowrap text-light-text dark:text-dark-text">{studentNames[submission.student_id]}</td>
                <td className="px-6 py-4 whitespace-nowrap text-light-text dark:text-dark-text">{format(new Date(submission.date_created), 'dd/MM/yyyy')}</td>
                <td className="px-6 py-4 whitespace-nowrap text-light-text dark:text-dark-text">
                  <button onClick={() => handleViewSubmission(submission.id)}>View Submission</button>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-light-text dark:text-dark-text">
                  <button onClick={() => handleViewFeedback(submission.id)}>View Feedback</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default SubmissionTableOverview;
