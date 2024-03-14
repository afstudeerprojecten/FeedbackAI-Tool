// RegisterPage.tsx
import React from 'react';
import RegisterForm from '../components/RegisterTeacherForm';

const RegisterPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-base-200 flex items-center justify-center">
      <div className="bg-base-300 rounded-lg shadow-xl p-8 max-w-md w-full">
        <RegisterForm />
      </div>
    </div>
  );
};

export default RegisterPage;
