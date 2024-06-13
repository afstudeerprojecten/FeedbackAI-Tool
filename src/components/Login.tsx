import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { login } from '../services/authService';
import { fetchStudentByEmail } from '../services/studentService';
import { registerEvent } from '../services/eventLogService';

// Define the type for the decoded token
interface DecodedToken {
  sub: string;
  user_type: string;
  // Add other fields from your JWT payload if needed
}

// Define the parseJwt function with return type
function parseJwt(token: string): DecodedToken {
  const base64Url = token.split('.')[1];
  const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
  const jsonPayload = decodeURIComponent(atob(base64).split('').map(function(c) {
    return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
  }).join(''));

  return JSON.parse(jsonPayload) as DecodedToken;
}

const Login: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  // const [error, setError] = useState<string | null>(null); // Change the error state type to string | null
  const navigate = useNavigate();

  const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const response = await login({ email, password });
      const token = response.access_token;
      const decodedToken = parseJwt(token);
      const userRole = decodedToken.user_type;
      sessionStorage.setItem('user', JSON.stringify({ email, role: userRole }));
      sessionStorage.setItem('token', token); 
      if ( userRole === 'student'){
        var student = await fetchStudentByEmail(email);
        registerEvent({event_id: 1, user_id: student.id, value: 1})};
      toast.success('Logged in successfully', {
        onClose: () => navigate('/'),
        autoClose: 1000,
      });
    } catch (error) {
      // setError('Incorrect email or password');
      toast.error('Incorrect email or password');
    }
  };

  return (
    <div className="min-h-screen bg-neutral-100 dark:bg-dark-neutral justify-center">
      <div className="bg-neutral-100 dark:bg-dark-neutral rounded p-8 max-w-md w-full">
        <form onSubmit={handleLogin}>
          <h2 className="text-2xl text-light-text dark:text-dark-text font-semibold mb-4">Login</h2>
          <div className="mb-4">
            <label htmlFor="email" className="block text-sm font-medium text-light-text dark:text-dark-text">Email</label>
            <input
              type="text"
              id="email"
              name="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full border rounded px-3 py-2 text-light-text dark:text-dark-text bg-light-neutral dark:bg-dark-neutral dark:border-gray-500 dark:text-dark-text dark:focus-dark-primary focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
              required
            />
          </div>
          <div className="mb-6">
            <label htmlFor="password" className="block text-sm font-medium text-light-text dark:text-dark-text">Password</label>
            <input
              type="password"
              id="password"
              name="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full border rounded px-3 py-2 text-light-text dark:text-dark-text bg-light-neutral dark:bg-dark-neutral dark:border-gray-500 dark:text-dark-text dark:focus-dark-primary focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
              required
            />
          </div>
          {/* {error && <div className="text-red-500 mb-4">{error}</div>} Render error message */}
          <div>
            <button type="submit" className="btn bg-light-btn text-dark-text dark:bg-dark-btn dark:text-light-text dark:btn-primary">Login</button>
          </div>
          <ToastContainer position="top-center" />
        </form>
      </div>
    </div>
  );
};

export default Login;

