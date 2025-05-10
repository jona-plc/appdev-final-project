'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleLogin = async () => {
    if (email === 'admin@admin.com' && password === 'admin123') {
      localStorage.setItem('user', JSON.stringify({ id: 'admin', email }));
      router.push('/posts');
      return;
    }

    const res = await fetch('https://jsonplaceholder.typicode.com/users');
    const users = await res.json();
    const user = users.find((u: any) => u.email === email && password === u.username);

    if (user) {
      localStorage.setItem('user', JSON.stringify(user));
      router.push('/posts');
    } else {
      setError('Invalid credentials');
    }
  };

  return (
    <div className="h-screen flex justify-center items-center bg-gradient-to-r from-blue-100 via-blue-200 to-blue-300">
      <div className="max-w-md w-full bg-white rounded-lg shadow-xl p-8">
        <h2 className="text-2xl font-semibold text-center text-gray-800 mb-6">Login</h2>

        {error && <p className="text-red-500 text-center mb-4">{error}</p>}

        <div className="mb-4">
          <input
            className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>

        <div className="mb-6">
          <input
            className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>

        <button
          className="w-full bg-blue-600 text-white py-3 rounded-md text-lg font-semibold hover:bg-blue-700 transition"
          onClick={handleLogin}
        >
          Login
        </button>
      </div>
    </div>
  );
}
