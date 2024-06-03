import React, { useState } from 'react';
import mockUsers from '../data/mockData'; // Import the User type and mock users data
import { useNavigate } from 'react-router-dom';
import {registerEvent} from '../services/eventLogService';


const Login: React.FC = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleLogin = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // Check if the provided username and password match any mock user
    const foundUser = mockUsers.find((user) => user.username === username && user.password === password);

    if (foundUser) {
      // Log in successful, redirect to the dashboard or homepage
      // Here you can store the user's information in local storage or session storage for authentication purposes
      // For now, we're just redirecting to the homepage
        navigate("/");
        console.log('Login successful');
        sessionStorage.setItem('user', JSON.stringify(foundUser));
        registerEvent({event_type: 1, user_id: foundUser.id, event_value: 1});

    } else {
      setError('Invalid username or password.');
    }
  };

  return (
    <div className="min-h-screen bg-light-neutral dark:bg-dark-neutral justify-center">
      <div className="bg-light-neutral dark:bg-dark-neutral rounded p-8 max-w-md w-full">
        <form onSubmit={handleLogin}>
          <h2 className="text-2xl text-light-text dark:text-dark-text font-semibold mb-4">Login</h2>
          <div className="mb-4">
            <label htmlFor="username" className="block text-sm font-medium text-light-text dark:text-dark-text">Username</label>
            <input
              type="text"
              id="username"
              name="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
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
          {error && <div className="text-red-500 mb-4">{error}</div>}
          <div>
            <button type="submit" className="btn bg-light-btn text-dark-text dark:bg-dark-btn dark:text-light-text dark:btn-primary">Login</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
