import React from 'react';
import Login from '../Components/Login/Login';
import { Toaster } from 'sonner';

function LoginPage() {
  return (
    <div>
      <Toaster richColors position='top-center' />
      <Login />
    </div>
  );
}

export default LoginPage;
