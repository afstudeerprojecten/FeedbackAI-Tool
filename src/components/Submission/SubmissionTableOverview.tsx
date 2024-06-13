import React, { useState, useEffect } from "react";
import { fetchSubmissions } from "../../services/submissionService";
import { fetchStudent } from "../../services/studentService";
import { useNavigate, useParams } from "react-router-dom";
import { format } from 'date-fns';


const SubmissionTableOverview: React.FC = () => {
  const [submissions, setSubmissions] = useState<any[]>([]);
  const [studentNames, setStudentNames] = useState<{ [id: number]: string }>({});
  const [filteredSubmissions, setFilteredSubmissions] = useState<any[]>([]);
  const navigate = useNavigate();
  const { id } = useParams<{ id: any }>();


  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await fetchSubmissions();
        setSubmissions(data);
        setFilteredSubmissions(data);
        if (id) {
          setFilteredSubmissions(data.filter((submission: { assignment_id: any; }) => submission.assignment_id === Number(id)));
        }
        // Fetch and cache student names
        const studentIds = data.map((submission: { student_id: any; }) => submission.student_id);
        const names = await fetchStudentNames(studentIds);
        setStudentNames(names);
      } catch (error: any) {
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
    } catch (error: any) {
      console.error(error.message);
    }
    return names;
  }

  const handleViewSubmission = async (id: number) => {
    navigate(`/submission/${id}`);
  }

  const filterByAssignmentId = (id: string) => {
    if (id === '') {
      setFilteredSubmissions(submissions);
      return;
    }
    setFilteredSubmissions(submissions.filter((submission: { assignment_id: any; }) => submission.assignment_id === Number(id)));
  }
  const filterByStudentId = (id: string) => {
    if (id === '') {
      setFilteredSubmissions(submissions);
      return;
    }
    setFilteredSubmissions(submissions.filter((submission: { student_id: any; }) => submission.student_id === Number(id)));
  }
  const clearFilter = () => {
    setFilteredSubmissions(submissions);
    // Reset input fields
    (document.getElementById('assignmentFilter') as HTMLInputElement).value = '';
    (document.getElementById('studentFilter') as HTMLInputElement).value = '';
  }


  return (
    <div className="bg-neutral-100 dark:bg-dark-neutral mx-4 p-6 w-3/4 mx-auto">
      <h2 className="text-3xl font-bold text-light-text dark:text-dark-text mb-10 mt-5 text-center">Submissions</h2>
      <div>
        <div className="grid grid-cols-2 w-1/2 mx-auto gap-4">
          <div>
            <label className="text-light-text dark:text-dark-text mb-2">Filter by Assignment</label>
            <input
              type="number"
              id="assignmentFilter"
              defaultValue={id}
              className="w-full border rounded px-3 py-2 text-light-text dark:text-dark-text bg-light-neutral dark:bg-dark-neutral"
              onChange={(e) => filterByAssignmentId(e.target.value)} />
          </div>
          <div>
            <label className="text-light-text dark:text-dark-text mb-2">Filter by Student</label>
            <input
              type="number"
              id="studentFilter"
              className="w-full border rounded px-3 py-2 text-light-text dark:text-dark-text bg-light-neutral dark:bg-dark-neutral"
              onChange={(e) => filterByStudentId(e.target.value)} />
          </div>
        </div>
        <div className="flex justify-center">
          <div className="btn bg-light-btn text-dark-text dark:bg-dark-btn dark:text-light-text dark:btn-primary mt-4 mb-6" onClick={() => clearFilter()}>
            Clear filter</div>
        </div>
      </div>
      <h2 className="text-xl font-bold mb-4 text-light-text dark:text-dark-text ml-4">Submissions Overview</h2>
      <div className="overflow-x-auto">
        <table className="table table-md">
          <thead className="dark:bg-dark-neutral">
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
            </tr>
          </thead>
          <tbody className="dark:bg-dark-neutral divide-y divide-gray-200">
            {filteredSubmissions.map(submission => (
              <tr key={submission.id}>
                <td className="px-6 py-4 whitespace-nowrap text-light-text dark:text-dark-text">{submission.assignment_id}</td>
                <td className="px-6 py-4 whitespace-nowrap text-light-text dark:text-dark-text">{submission.student_id}</td>
                <td className="px-6 py-4 whitespace-nowrap text-light-text dark:text-dark-text">{studentNames[submission.student_id]}</td>
                <td className="px-6 py-4 whitespace-nowrap text-light-text dark:text-dark-text">{format(new Date(submission.date_created), 'dd/MM/yyyy')}</td>
                <td className="px-6 py-4 whitespace-nowrap text-light-text dark:text-dark-text">
                  <button onClick={() => handleViewSubmission(submission.id)}>View Submission</button>
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
