// RegisterPage.tsx
import React from 'react';
import RegisterForm from '../components/RegisterTeacherForm';

const RegisterPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-base-200">
    <div className="container mx-auto py-8">
        <RegisterForm />
    </div>
</div>
  );
};

export default RegisterPage;
