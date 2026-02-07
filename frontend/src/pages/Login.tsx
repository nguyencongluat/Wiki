import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../lib/axios';
import { useAuthStore } from '../store/auth';

export default function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const login = useAuthStore((state) => state.login);
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    try {
      const { data } = await api.post('/auth/login', { username, password });
      login(data);
      navigate('/');
    } catch (err) {
      setError('Invalid credentials');
    }
  };

  return (
    <div className="max-w-md mx-auto mt-12 bg-white p-10 rounded-3xl shadow-xl border-4 border-blue-100">
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold text-gray-800">Welcome Back! 👋</h2>
        <p className="text-gray-500 mt-2">Log in to manage your Wiki</p>
      </div>
      
      {error && <div className="bg-red-50 text-red-600 font-bold p-4 rounded-xl mb-6 text-center animate-bounce">{error}</div>}
      
      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label className="block text-sm font-bold text-gray-700 mb-2">Username</label>
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="w-full bg-gray-50 border-2 border-gray-200 rounded-xl px-4 py-3 focus:border-blue-500 focus:bg-white transition-all outline-none font-medium"
            placeholder="e.g., user1"
          />
        </div>
        <div>
          <label className="block text-sm font-bold text-gray-700 mb-2">Password</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full bg-gray-50 border-2 border-gray-200 rounded-xl px-4 py-3 focus:border-blue-500 focus:bg-white transition-all outline-none font-medium"
            placeholder="••••••••"
          />
        </div>
        <button
          type="submit"
          className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 rounded-xl shadow-lg hover:shadow-blue-200 hover:-translate-y-1 transition-all"
        >
          Login
        </button>
      </form>
      <div className="mt-8 pt-6 border-t border-gray-100 text-center">
        <p className="text-sm text-gray-500 font-medium">Demo Users:</p>
        <div className="flex flex-wrap justify-center gap-2 mt-2">
            {['user1', 'user2', 'user3', 'user4'].map(u => (
                <span key={u} className="bg-gray-100 text-gray-600 px-3 py-1 rounded-full text-xs font-bold font-mono">
                    {u}
                </span>
            ))}
        </div>
      </div>
    </div>
  );
}
