// RegisterPage.tsx
import React from 'react';
import LoginForm from '../components/Login';

const LoginPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-light-neutral dark:bg-dark-neutral flex items-center justify-center">
        <LoginForm />
    </div>
  );
};

export default LoginPage;
