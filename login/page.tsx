"use client";
import { signIn } from 'next-auth/react';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/hooks/use-auth';
import Link from "next/link";

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();
  const { login } = useAuth();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null); // Clear previous errors
    const user = await login(email, password);
    if (!user) {
      setError('Invalid email or password');
      return;
    }
    router.push('/'); // redirect to dashboard after successful login
  };

  return (
    <main className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#0f2027] via-[#2c5364] to-[#00c9ff] p-4 relative overflow-hidden">
      {/* Futuristic glowing background elements */}
      <div className="absolute inset-0 pointer-events-none z-0">
        <div className="absolute -top-32 -left-32 w-96 h-96 bg-emerald-400 opacity-20 rounded-full blur-3xl animate-pulse" />
        <div className="absolute -bottom-32 -right-32 w-96 h-96 bg-blue-500 opacity-20 rounded-full blur-3xl animate-pulse" />
        <div className="absolute top-1/2 left-1/2 w-1/2 h-1/2 bg-gradient-to-br from-cyan-400/10 to-emerald-400/10 rounded-full blur-2xl -translate-x-1/2 -translate-y-1/2" />
      </div>
      <form
        onSubmit={handleLogin}
        className="relative z-10 w-full max-w-md p-10 bg-gradient-to-br from-slate-900/90 to-blue-900/90 rounded-2xl shadow-2xl space-y-8 border border-emerald-400/30 backdrop-blur-xl"
      >
        <h1 className="text-4xl font-extrabold text-center bg-gradient-to-r from-cyan-400 to-emerald-400 bg-clip-text text-transparent tracking-tight drop-shadow-lg mb-2">
          Login
        </h1>
        {error && <p className="text-red-400 text-sm text-center animate-pulse">{error}</p>}
        <div className="space-y-2">
          <label className="block font-medium text-cyan-200">Email</label>
          <input
            type="email"
            placeholder="Email"
            className="w-full border border-cyan-700 bg-slate-800 text-cyan-100 p-3 rounded-lg focus:ring-2 focus:ring-cyan-400 outline-none transition"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div className="space-y-2">
          <label className="block font-medium text-cyan-200">Password</label>
          <input
            type="password"
            placeholder="Password"
            className="w-full border border-cyan-700 bg-slate-800 text-cyan-100 p-3 rounded-lg focus:ring-2 focus:ring-cyan-400 outline-none transition"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <button
          type="submit"
          className="w-full bg-gradient-to-r from-cyan-400 to-emerald-400 hover:from-cyan-500 hover:to-emerald-500 text-slate-900 font-bold py-3 rounded-lg shadow-lg mt-2 transition-all duration-200 tracking-wide text-lg"
        >
          Login
        </button>
        <div className="flex flex-col gap-2 mt-4">
          <button
            type="button"
            className="w-full bg-gradient-to-r from-red-500 to-pink-500 hover:from-red-600 hover:to-pink-600 text-white py-2 rounded-lg font-semibold shadow-md transition-all duration-200"
            onClick={() => signIn("google")}
          >
            Continue with Google
          </button>
          <button
            type="button"
            className="w-full bg-gradient-to-r from-gray-700 to-gray-900 hover:from-gray-800 hover:to-gray-950 text-white py-2 rounded-lg font-semibold shadow-md transition-all duration-200"
            onClick={() => signIn("github")}
          >
            Continue with GitHub
          </button>
        </div>
        <div className="text-center text-sm text-cyan-200 mt-2">
          Don&apos;t have an account?{' '}
          <Link href="/register" className="text-cyan-400 hover:underline">Register</Link>
        </div>
        <div className="text-center text-xs mt-2">
          <Link href="/forgot-password" className="text-cyan-400 hover:underline">Forgot Password?</Link>
        </div>
      </form>
    </main>
  );
}
