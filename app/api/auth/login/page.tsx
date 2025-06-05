// Location: app/login/page.tsx

'use client';

import { signIn } from 'next-auth/react';
import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null); // Clear previous errors
    const res = await signIn('credentials', {
      redirect: false,
      email,
      password,
    });

    if (!res || res.error) {
      setError('Invalid email or password');
      return;
    }

    router.push('/goals');
  };

  return (
    <main className="min-h-screen flex items-center justify-center bg-gray-50 p-4">
      <form
        onSubmit={handleLogin}
        className="w-full max-w-md p-6 bg-white rounded shadow-md space-y-4"
      >
        <h1 className="text-2xl font-bold text-center">Login</h1>
        {error && <p className="text-red-500 text-sm text-center">{error}</p>}

        <input
          type="email"
          placeholder="Email"
          className="w-full border p-2 rounded"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />

        <input
          type="password"
          placeholder="Password"
          className="w-full border p-2 rounded"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />

        <button
          type="submit"
          className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded"
        >
          Login
        </button>
      </form>
    </main>
  );
}
