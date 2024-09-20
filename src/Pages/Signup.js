import React from 'react';

import Signup from '../Components/Signup/Signup';
import { Toaster } from 'sonner';

function SignupPage() {
  return (
    <div>
      <Toaster richColors position='top-center'/>
      <Signup />
    </div>
  );
}

export default SignupPage;
