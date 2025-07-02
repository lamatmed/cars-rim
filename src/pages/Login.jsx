import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import logo from '../assets/logo.svg';

const api = import.meta.env.VITE_API;

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    try {
      const res = await fetch(`${api}/api/users/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Erreur');
      localStorage.setItem('token', data.token);
      localStorage.setItem('user', JSON.stringify(data.user));
      window.dispatchEvent(new Event('storage'));
      navigate('/');
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-indigo-200 via-blue-200 to-purple-100 px-2 py-8">
      <motion.form
        onSubmit={handleSubmit}
        className="bg-white/95 p-6 sm:p-8 rounded-3xl shadow-2xl w-full max-w-md border border-blue-200 flex flex-col items-center"
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: 'easeOut' }}
      >
        <img src={logo} alt="Logo" className="h-12 mb-4 drop-shadow-md" />
        <h2 className="text-3xl font-extrabold mb-6 text-center text-indigo-700 tracking-tight">Connexion</h2>
        {error && <div className="text-red-500 mb-4 text-center font-medium animate-pulse">{error}</div>}
        <div className="mb-4 w-full">
          <label className="block text-gray-700 font-semibold mb-1" htmlFor="email">Email</label>
          <input
            id="email"
            type="email"
            placeholder="Email"
            className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-indigo-400 focus:border-indigo-400 outline-none transition text-base bg-indigo-50"
            value={email}
            onChange={e => setEmail(e.target.value)}
            required
            autoFocus
          />
        </div>
        <div className="mb-6 w-full">
          <label className="block text-gray-700 font-semibold mb-1" htmlFor="password">Mot de passe</label>
          <input
            id="password"
            type="password"
            placeholder="Mot de passe"
            className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-indigo-400 focus:border-indigo-400 outline-none transition text-base bg-indigo-50"
            value={password}
            onChange={e => setPassword(e.target.value)}
            required
          />
        </div>
        <button
          type="submit"
          className="w-full py-3 rounded-xl bg-gradient-to-r from-indigo-600 via-blue-500 to-purple-500 hover:from-indigo-700 hover:to-purple-600 text-white font-bold text-lg shadow-lg transition-all duration-200 mb-2"
        >
          Se connecter
        </button>
        <div className="mt-4 text-center w-full">
          <span className="text-gray-600">Pas de compte ? </span>
          <Link to="/sign-up" className="text-indigo-600 hover:underline font-semibold">Créer un compte</Link>
        </div>
      </motion.form>
    </div>
  );
};

export default Login; 