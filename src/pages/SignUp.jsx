import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import logo from '../assets/logo.svg';

const api = import.meta.env.VITE_API;

const SignUp = () => {
  const [form, setForm] = useState({ firstName: '', lastName: '', email: '', password: '' });
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleChange = e => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    if (form.password !== confirmPassword) {
      setError('Les mots de passe ne correspondent pas.');
      return;
    }
    try {
      const res = await fetch(`${api}/api/users/register`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Erreur');
      navigate('/login');
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-200 via-blue-200 to-purple-100 px-2 py-8">
      <motion.form
        onSubmit={handleSubmit}
        className="bg-white/95 p-6 sm:p-8 rounded-3xl shadow-2xl w-full max-w-md border border-blue-200 flex flex-col items-center"
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: 'easeOut' }}
      >
        <img src={logo} alt="Logo" className="h-12 mb-4 drop-shadow-md" />
        <h2 className="text-3xl font-extrabold mb-6 text-center text-indigo-700 tracking-tight">Créer un compte</h2>
        {error && <div className="text-red-500 mb-4 text-center font-medium animate-pulse">{error}</div>}
        <div className="mb-4 w-full">
          <label className="block text-gray-700 font-semibold mb-1" htmlFor="firstName">Prénom</label>
          <input
            id="firstName"
            name="firstName"
            placeholder="Prénom"
            className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-indigo-400 focus:border-indigo-400 outline-none transition text-base bg-indigo-50"
            value={form.firstName}
            onChange={handleChange}
            required
            autoFocus
          />
        </div>
        <div className="mb-4 w-full">
          <label className="block text-gray-700 font-semibold mb-1" htmlFor="lastName">Nom</label>
          <input
            id="lastName"
            name="lastName"
            placeholder="Nom"
            className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-indigo-400 focus:border-indigo-400 outline-none transition text-base bg-indigo-50"
            value={form.lastName}
            onChange={handleChange}
            required
          />
        </div>
        <div className="mb-4 w-full">
          <label className="block text-gray-700 font-semibold mb-1" htmlFor="email">Email</label>
          <input
            id="email"
            name="email"
            type="email"
            placeholder="Email"
            className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-indigo-400 focus:border-indigo-400 outline-none transition text-base bg-indigo-50"
            value={form.email}
            onChange={handleChange}
            required
          />
        </div>
        <div className="mb-4 w-full">
          <label className="block text-gray-700 font-semibold mb-1" htmlFor="password">Mot de passe</label>
          <input
            id="password"
            name="password"
            type="password"
            placeholder="Mot de passe"
            className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-indigo-400 focus:border-indigo-400 outline-none transition text-base bg-indigo-50"
            value={form.password}
            onChange={handleChange}
            required
          />
        </div>
        <div className="mb-6 w-full">
          <label className="block text-gray-700 font-semibold mb-1" htmlFor="confirmPassword">Confirmer le mot de passe</label>
          <input
            id="confirmPassword"
            name="confirmPassword"
            type="password"
            placeholder="Confirmer le mot de passe"
            className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-indigo-400 focus:border-indigo-400 outline-none transition text-base bg-indigo-50"
            value={confirmPassword}
            onChange={e => setConfirmPassword(e.target.value)}
            required
          />
        </div>
        <button
          type="submit"
          className="w-full py-3 rounded-xl bg-gradient-to-r from-indigo-600 via-blue-500 to-purple-500 hover:from-indigo-700 hover:to-purple-600 text-white font-bold text-lg shadow-lg transition-all duration-200 mb-2"
        >
          S'inscrire
        </button>
      </motion.form>
    </div>
  );
};

export default SignUp; 