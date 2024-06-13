import React, { useState, useEffect } from 'react';
import { fetchTeachers } from '../../services/teacherService';
import { registerCourse } from '../../services/courseService';
import { ToastContainer, toast } from 'react-toastify';

const RegisterCourse: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    teacher_id: ''
  });
  const [loading, setLoading] = useState(false);
  const [teachers, setTeachers] = useState<any[]>([]);

  useEffect(() => {
    const fetchTeachersData = async () => {
      try {
        const data = await fetchTeachers();
        setTeachers(data);
      } catch (error) {
        console.error('Error fetching teachers:', error);
      }
    };

    fetchTeachersData();
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    const parsedValue = name === 'teacherId' ? parseInt(value) : value; // Parse organisationId as integer
    setFormData(prevState => ({ ...prevState, [name]: parsedValue }));
  };
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    console.log('formData', formData);
    e.preventDefault();
    setLoading(true);
    try {
      // Parse organisationId to an integer before sending the data
      const dataToSend = { ...formData, teacher_id: parseInt(formData.teacher_id) };
      await registerCourse(dataToSend);
      toast.success("Course created successfully");
      setTimeout(() => {
        window.location.reload();
      }, 2000);
    } catch (error: any) {
      toast.error("Failed to create course");
      // setError(error.response.data.detail || 'An error occurred while registering the teacher');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-6">
      <h2 className="text-xl font-bold mb-4">Register Course</h2>

        <form onSubmit={handleSubmit}>
          <div className="grid grid-cols-2 gap-4">

            <div className="mb-4">
              <label className="block text-sm font-bold mb-2" htmlFor="name">
                Name
              </label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                className="w-full border rounded px-3 py-2 text-light-text dark:text-dark-text bg-light-neutral dark:bg-dark-neutral"
                required
              />
            </div>
            <div className="mb-4">
              <label className="block text-sm font-bold mb-2" htmlFor="teacher_id">
                Teacher
              </label>
              <select
                id="teacher_id"
                name="teacher_id"
                value={formData.teacher_id}
                onChange={handleChange}
                className="w-full border rounded px-3 py-2 text-light-text dark:text-dark-text bg-light-neutral dark:bg-dark-neutral"
                required
              >
                <option value="">Select Teacher</option>
                {teachers.map(org => (
                  <option key={org.id} value={org.id}>
                    {org.email}
                  </option>
                ))}
              </select>
            </div>
          </div>
          <button
            type="submit"
            className="btn bg-light-btn text-dark-text dark:bg-dark-btn dark:text-light-text dark:btn-primary"
            disabled={loading}
          >
            {loading ? 'Registering...' : 'Register'}
          </button>
        </form>
        <ToastContainer position="top-center" />

    </div>
  );
};

export default RegisterCourse;
