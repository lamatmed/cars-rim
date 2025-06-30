import { SignUp } from '@clerk/clerk-react';

const SignUpPage = () => (
  <div className="min-h-screen flex items-center justify-center bg-gray-50">
    <div style={{ minWidth: 380, minHeight: 480, background: 'white', borderRadius: 12, boxShadow: '0 2px 16px #0002', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 24 }}>
      <SignUp routing="path" path="/sign-up" />
    </div>
  </div>
);

export default SignUpPage; 