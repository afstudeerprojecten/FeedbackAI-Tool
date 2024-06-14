import React, { useState, useEffect } from 'react';
import { updateTeacher, fetchTeacher } from '../../services/teacherService';
import { fetchOrganizations } from '../../services/organisationService';
import { useNavigate } from 'react-router-dom';

const UpdateTeacherForm: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    lastname: '',
    email: '',
    organisation_id: ''
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);
  const [organizations, setOrganizations] = useState<any[]>([]);
//   const [teacher, setTeacher] = useState<any>(null);
  const nav = useNavigate();

  useEffect(() => {
    const fetchOrganizationsData = async () => {
        try {
          const data = await fetchOrganizations();
          setOrganizations(data);
        } catch (error) {
          console.error('Error fetching organizations:', error);
        }
      };
  
      fetchOrganizationsData();

    const fetchTeacherData = async () => {
        try {
            const teacherId = Number(sessionStorage.getItem('updateId'));
            const response = await fetchTeacher(teacherId);
            setFormData(response);
        } catch (error: any) {
            console.error('Error fetching teacher:', error);
        }
        }
        fetchTeacherData();
   
  }, []);


  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prevState => ({ ...prevState, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const teacherId = Number(sessionStorage.getItem('updateId'));
      const response = await updateTeacher(teacherId, formData);
      (response);
      setSuccess(true);
        setTimeout(() => {
            nav('/teachers');
        }, 2000);
    } catch (error: any) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-6">
      <h2 className="text-xl font-bold mb-4">Update Teacher</h2>
      {success ? (
        <div className="bg-green-200 text-green-800 px-4 py-2 mb-4">
          Teacher updated successfully!
        </div>
      ) : (
        <form onSubmit={handleSubmit}>
          {/* Render form fields with initial values */}
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
              className="w-full border rounded px-3 py-2"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-bold mb-2" htmlFor="lastname">
              Lastname
            </label>
            <input
              type="text"
              id="lastname"
              name="lastname"
              value={formData.lastname}
              onChange={handleChange}
              className="w-full border rounded px-3 py-2"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-bold mb-2" htmlFor="email">
              Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="w-full border rounded px-3 py-2"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-bold mb-2" htmlFor="organisation_id">
              Organisation
            </label>
            <select
              id="organisation_id"
              name="organisation_id"
              value={formData.organisation_id}
              onChange={handleChange}
              className="w-full border rounded px-3 py-2"
              required
            >
              <option value="">Select Organisation</option>
              {organizations.map(org => (
                <option key={org.id} value={org.id}>
                  {org.name}
                </option>
              ))}
            </select>
            </div>
          <button
            type="submit"
            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
            disabled={loading}
          >
            {loading ? 'Updating...' : 'Update'}
          </button>
        </form>
      )}
      {error && <div className="text-red-600 mt-4">{error}</div>}
    </div>
  );
};

export default UpdateTeacherForm;
