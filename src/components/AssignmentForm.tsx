import React, { useState, useEffect } from 'react';
import { fetchCourses } from '../services/courseService';
import { fetchTeacher } from '../services/teacherService';


const AssignmentForm: React.FC = () => {
  const [formData, setFormData] = useState({
    teacher_id: '',
    course_id: '',
    assignmentDescription: '',
    assignmentTitle: '',
    ageStudents: '',
    teacher_name: ''
  });
  // const [loading, setLoading] = useState(false);
  // const [error, setError] = useState<string | null>(null);
  // const [success, setSuccess] = useState(false);
  // const navigate = useNavigate();
  // const [course, setCourse] = useState<string>(''); // Mock data
  const [courses, setCourses] = useState<any[]>([]);


  // Placeholder function to simulate response from OpenAI API


  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await fetchCourses();
        setCourses(data);
      } catch (error: any) {
        console.error(error.message);
      }
    };

    fetchData();
  }, []);

  const handleChange = async (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));

    // If the name of the select field is 'course_id', update teacher_id when a course is selected
    if (name === 'course_id') {
      const selectedCourse = courses.find(course => course.id === parseInt(value));
      if (selectedCourse) {
        console.log(`Selected Course ID: ${selectedCourse.id}`);
        console.log(`Selected Teacher ID: ${selectedCourse.teacher_id}`)
        setFormData(prevState => ({
          ...prevState,
          teacher_id: selectedCourse.teacher_id
        }));

        // Fetch teacher details based on the selected course ID
        try {
          const teacher = await fetchTeacher(selectedCourse.teacher_id);
          if (teacher) {
            console.log(`Teacher Name: ${teacher.name}`);
            // Update the teacher name in the form data
            setFormData(prevState => ({
              ...prevState,
              teacher_name: teacher.name
            }));
          }
        } catch (error) {
          console.error('Error fetching teacher:', error);
        }
      }
    }
  };

  // const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
  //   console.log('formData', formData);
  //   e.preventDefault();
  //   setError(null);
  //   setLoading(true);
  //   try {
  //     // Parse organisationId to an integer before sending the data
  //     const dataToSend = { ...formData, teacher_id: parseInt(formData.teacher_id) };
  //     await registerCourse(dataToSend);
  //     setSuccess(true);
  //     setTimeout(() => {
  //       navigate('/courses');
  //     }, 2000);
  //   } catch (error: any) {
  //     setError(error.response.data.detail || 'An error occurred while registering the teacher');
  //   } finally {
  //     setLoading(false);
  //   }
  // };

  return (
    <div className="container mx-auto p-4">
      <div className="bg-base shadow-2xl rounded px-8 pt-6 pb-8 mb-4">
        <h2 className="text-2xl font-bold mb-4 text-center">Assignment Form</h2>
        <form>
          <div className="mb-4">
            <label className="block text-sm font-bold mb-2" htmlFor="course_id">
              Course
            </label>
            <select
              id="course_id"
              name="course_id"
              value={formData.course_id}
              onChange={handleChange}
              className="w-full border rounded px-3 py-2"
              required
            >
              <option value="">Select Course</option>
              {courses.map(org => (
                <option key={org.id} value={org.id}>
                  {org.name}
                </option>
              ))}
            </select>
          </div>
          <div className="mb-4">
            <label htmlFor="teachername" className="block text-sm font-medium text-gray-700">
              Teacher Name
            </label>
            <input
              type="text"
              id="teachername"
              className="input input-bordered w-full mt-1"
              required
              value={formData.teacher_name}
              disabled
            />
          </div>
          <div className="mb-4">
            <label htmlFor="title" className="block text-sm font-medium text-gray-700">
              Assignment Title
            </label>
            <input
              type="text"
              id="title"
              className="input input-bordered w-full mt-1"
              value={formData.assignmentTitle}
              onChange={(e) => setFormData(prevState => ({ ...prevState, assignmentTitle: e.target.value }))}
              required
            />
          </div>
          <div className="mb-4">
            <label htmlFor="description" className="block text-sm font-medium text-gray-700">
              Assignment Description
            </label>
            <textarea
              id="description"
              className="mt-1 p-2 block w-full border border-gray-300 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
              value={formData.assignmentDescription}
              onChange={(e) => setFormData(prevState => ({ ...prevState, assignmentDescription: e.target.value }))}
              required
            />
          </div>

          <div className="mb-4">
            <label htmlFor="ageStudents" className="block text-sm font-medium text-gray-700">
              Age of Students
            </label>
            <input
              type="number"
              id="ageStudents"
              className="input input-bordered w-full mt-1"
              value={formData.ageStudents}
              onChange={(e) => setFormData(prevState => ({ ...prevState, ageStudents: e.target.value }))}
              required
              min="0"
              
            />
          </div>
          <button
            className="btn btn-primary w-full"
          >
            Generate Templates
          </button>
        </form>
      </div>
      <div className="bg-base shadow-2xl rounded p-4 mb-4">
        <h2 className="text-2xl font-bold mb-4">Generated Templates</h2>
        <div className="border border-gray-300 p-2 rounded-md"></div>
      </div>
      <div className="flex justify-center">
        <button className="bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 mr-2">
          Accept Templates
        </button>
        <button className="bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600">
          Decline Templates
        </button>
      </div>
    </div>
  );
};

export default AssignmentForm;
