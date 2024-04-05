import React, { useState, useEffect } from 'react';
import { fetchCourses } from '../../services/courseService';
import { fetchTeacher } from '../../services/teacherService';
import { createAssignment } from '../../services/assignmentService';
import { generateTemplate, createTemplate } from '../../services/templateService';



const AssignmentForm: React.FC = () => {
  const [formData, setFormData] = useState({
    teacher_id: '',
    course_id: '',
    description: '',
    title: '',
    student_ages: '',
    teacher_name: '',
    word_count: ''
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);
  // const navigate = useNavigate();
  // const [course, setCourse] = useState<string>(''); // Mock data
  const [courses, setCourses] = useState<any[]>([]);
  const [assignment, setAssignment] = useState<any>(); // Mock data
  const [template, setTemplate] = useState<any>(); // Mock data
  var templateCount = 0;


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

  const handleAssignmetSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);
    console.log('Form Data:', formData);
    try {
      const dataToSend = {
        ...formData,
        courseId: parseInt(formData.course_id),
        student_ages: parseInt(formData.student_ages),
        word_count: parseInt(formData.word_count)
      };
      const createdAssignment = await createAssignment(dataToSend);
      setSuccess(true);
      setAssignment(createdAssignment);
      setFormData({
        teacher_id: '',
        course_id: '',
        description: '',
        title: '',
        student_ages: '',
        teacher_name: '',
        word_count: ''
      });
      console.log('Assignment created:', assignment);
      setTimeout(() => {
        // navigate('/assignments');
      }, 2000);
    } catch (error: any) {
      setError(error);
    } finally {
      setLoading(false);
    }
  }
  const handleTemplateSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    try {
      if (templateCount > 3) {
        return setError('You have reached the maximum number of templates');
      }
      setLoading(true);
      const createdTemplate = await generateTemplate(assignment.id);
      setTemplate(createdTemplate);
      console.log('Template created:', template);
      setSuccess(true);
      templateCount++;
      console.log('Template Count:', templateCount);
      setTimeout(() => {
        // navigate('/assignments');
      }, 2000);
    } catch (error: any) {
      setError(error);
    } finally {
      setLoading(false);
    }
  }
  const handleTemplateAccept = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    try {
      // Accept the template
      createTemplate({template_content: template, assignment_id: assignment.id});
      console.log('Template accepted:', template);
      setTimeout(() => {
        // navigate('/assignments');
      }, 2000);
    } catch (error: any) {
      setError(error);
    } finally {
      setLoading(false);
    }
  }

  const handleTemplateDecline = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    try {
      // Decline the template
      setTemplate('');
      console.log('Template declined:', template);
      templateCount--;
      setTimeout(() => {
        // navigate('/assignments');
      }, 2000);
    } catch (error: any) {
      setError(error);
    } finally {
      setLoading(false);
    }
  }

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
              value={formData.title}
              onChange={(e) => setFormData(prevState => ({ ...prevState, title: e.target.value }))}
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
              value={formData.description}
              onChange={(e) => setFormData(prevState => ({ ...prevState, description: e.target.value }))}
              required
            />
          </div>

          <div className="mb-4">
            <label htmlFor="student_ages" className="block text-sm font-medium text-gray-700">
              Age of Students
            </label>
            <input
              type="number"
              id="student_ages"
              className="input input-bordered w-full mt-1"
              value={formData.student_ages}
              onChange={(e) => setFormData(prevState => ({ ...prevState, student_ages: e.target.value }))}
              required
              min="0"

            />
          </div>
          <div className="mb-4">
            <label htmlFor="word_count" className="block text-sm font-medium text-gray-700">
              Word Count
            </label>
            <input
              type="number"
              id="word_count"
              className="input input-bordered w-full mt-1"
              value={formData.word_count}
              onChange={(e) => setFormData(prevState => ({ ...prevState, word_count: e.target.value }))}
              required
              min="0"

            />
          </div>
          <button
            type="submit"
            className="bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600"
            onClick={handleAssignmetSubmit}
            disabled={loading}
          >
            {loading ? 'Creating Assignment...' : 'Create Assignment'}
          </button>
          {error && <div className="text-red-600 mt-4">{error.toString()}</div>}
          {success && (
            <div className="bg-green-200 text-green-800 px-4 py-2 mt-4">
              Assignment created successfully!
            </div>
          )}
        </form>
      </div>
      <button
      type='submit'
      onClick={handleTemplateSubmit}
      disabled={loading}
      className="bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600">
        Generate Templates
      </button>
      <div className="bg-base shadow-2xl rounded p-4 mb-4">
        <h2 className="text-2xl font-bold mb-4">Generated Templates</h2>
        <div className="border border-gray-300 p-2 rounded-md">
          <p className="text-lg font-bold">Template{templateCount}</p>
          <p className="text-sm">
            {template || 'No template generated yet'}
          </p>

        </div>
      </div>
      <div className="flex justify-center">
        <button 
        type='button'
        onClick={handleTemplateAccept}
        className="bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 mr-2">
          Accept Templates
        </button>
        <button 
        type='button'
        onClick={handleTemplateDecline}
        className="bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600">
          Decline Templates
        </button>
      </div>
    </div>
  );
};

export default AssignmentForm;
