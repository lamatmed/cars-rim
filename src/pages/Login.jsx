import { SignIn } from '@clerk/clerk-react';
import { Link } from 'react-router-dom';

const Login = () => (
  <div>
    <div style={{color: 'red', marginBottom: 20, textAlign: 'center', fontWeight: 'bold'}}>
      {import.meta.env.VITE_CLERK_PUBLISHABLE_KEY
        ? 'Clé Clerk détectée'
        : 'Clé Clerk ABSENTE'}
    </div>
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50">
      <div style={{ minWidth: 380, minHeight: 480, background: 'white', borderRadius: 12, boxShadow: '0 2px 16px #0002', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 24, flexDirection: 'column' }}>
        <SignIn routing="path" path="/login" />
        <div className="mt-4 text-center">
          <span>Pas de compte ? </span>
          <Link to="/sign-up" className="text-indigo-600 hover:underline font-semibold">Créer un compte</Link>
        </div>
      </div>
    </div>
  </div>
);

export default Login; 