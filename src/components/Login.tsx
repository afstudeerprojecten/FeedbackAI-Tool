import React, { useState } from 'react';
import { redirect } from 'react-router-dom'; // Assuming you're using React Router
import mockUsers from '../data/mockData'; // Import the User type and mock users data

const Login: React.FC = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleLogin = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // Check if the provided username and password match any mock user
    const foundUser = mockUsers.find((user) => user.username === username && user.password === password);

    if (foundUser) {
      // Log in successful, redirect to the dashboard or homepage
      // Here you can store the user's information in local storage or session storage for authentication purposes
      // For now, we're just redirecting to the homepage
        redirect('/');
      console.log('Login successful');
    } else {
      setError('Invalid username or password.');
    }
  };

  return (
    <div className="min-h-screen bg-base flex items-center justify-center">
      <div className="bg-base rounded-lg shadow-2xl p-8 max-w-md w-full">
        <form onSubmit={handleLogin}>
          <h2 className="text-2xl font-semibold mb-4">Login</h2>
          <div className="mb-4">
            <label htmlFor="username" className="block text-sm font-medium text-gray-700">Username</label>
            <input
              type="text"
              id="username"
              name="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="mt-1 p-2 block w-full border border-gray-300 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
              required
            />
          </div>
          <div className="mb-6">
            <label htmlFor="password" className="block text-sm font-medium text-gray-700">Password</label>
            <input
              type="password"
              id="password"
              name="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="mt-1 p-2 block w-full border border-gray-300 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
              required
            />
          </div>
          {error && <div className="text-red-500 mb-4">{error}</div>}
          <div>
            <button type="submit" className="btn btn-primary w-full">Login</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
