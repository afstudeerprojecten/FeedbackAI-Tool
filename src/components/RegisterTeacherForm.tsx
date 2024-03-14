// RegisterForm.tsx
import React from 'react';

const RegisterTeacherForm: React.FC = () => {
  return (
    <div className="flex items-center justify-center min-h-screen">
      <form className="w-full max-w-md p-8 bg-base-300 rounded-lg shadow-md">
        <h2 className="text-3xl font-semibold mb-6">Register Teacher</h2>
        <div className="mb-4">
          <label htmlFor="username" className="block text-sm font-medium text-gray-700">Username</label>
          <input type="text" id="username" name="username" className="mt-1 p-2 w-full border rounded-md" />
        </div>
        <div className="mb-4">
          <label htmlFor="firstname" className="block text-sm font-medium text-gray-700">First Name</label>
          <input type="text" id="firstname" name="firstname" className="mt-1 p-2 w-full border rounded-md" />
        </div>
        <div className="mb-4">
          <label htmlFor="lastname" className="block text-sm font-medium text-gray-700">Last Name</label>
          <input type="text" id="lastname" name="lastname" className="mt-1 p-2 w-full border rounded-md" />
        </div>
        <div className="mb-4">
          <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
          <input type="email" id="email" name="email" className="mt-1 p-2 w-full border rounded-md" />
        </div>
        <div className="mb-6">
          <label htmlFor="password" className="block text-sm font-medium text-gray-700">Password</label>
          <input type="password" id="password" name="password" className="mt-1 p-2 w-full border rounded-md" />
        </div>
        <div>
          <button type="submit" className="btn btn-primary w-full">Register</button>
        </div>
      </form>
    </div>
  );
};

export default RegisterTeacherForm;
