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
    <main className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#0a1a2f] via-[#10131a] to-[#0a1a2f] p-4">
      <form
        onSubmit={handleLogin}
        className="relative z-10 w-full max-w-md p-10 bg-gradient-to-br from-[#10131a]/95 to-[#0a1a2f]/95 rounded-3xl shadow-[0_8px_32px_0_rgba(0,255,255,0.15)] space-y-8 border border-cyan-400/40 backdrop-blur-2xl ring-2 ring-cyan-400/10 hover:ring-emerald-400/20 transition-all duration-300"
        autoComplete="off"
      >
        <h1 className="text-4xl font-extrabold text-center bg-gradient-to-r from-cyan-300 via-emerald-400 to-cyan-400 bg-clip-text text-transparent tracking-tight drop-shadow-xl mb-2">
          <span className="inline-block align-middle mr-2 animate-pulse">&#9679;</span>
          Login
          <span className="inline-block align-middle ml-2 animate-pulse">&#9679;</span>
        </h1>
        {error && <p className="text-red-400 text-base text-center font-semibold animate-pulse drop-shadow-md">{error}</p>}
        <div className="space-y-2">
          <label className="block font-semibold text-cyan-200 tracking-wide">Email</label>
          <input
            type="email"
            placeholder="Email"
            className="w-full border-2 border-cyan-500/40 bg-slate-900/80 text-cyan-100 p-3 rounded-xl focus:ring-2 focus:ring-cyan-400 outline-none transition placeholder-cyan-400/60 shadow-inner shadow-cyan-400/10"
            value={email}
            onChange={e => setEmail(e.target.value)}
            required
          />
        </div>
        <div className="space-y-2">
          <label className="block font-semibold text-cyan-200 tracking-wide">Password</label>
          <input
            type="password"
            placeholder="Password"
            className="w-full border-2 border-cyan-500/40 bg-slate-900/80 text-cyan-100 p-3 rounded-xl focus:ring-2 focus:ring-cyan-400 outline-none transition placeholder-cyan-400/60 shadow-inner shadow-cyan-400/10"
            value={password}
            onChange={e => setPassword(e.target.value)}
            required
          />
        </div>
        <button
          type="submit"
          className="w-full bg-gradient-to-r from-cyan-400 via-emerald-400 to-cyan-400 hover:from-cyan-500 hover:to-emerald-500 text-slate-900 font-extrabold py-3 rounded-xl shadow-lg mt-2 transition-all duration-200 tracking-wide text-lg disabled:opacity-60 disabled:cursor-not-allowed border-2 border-cyan-400/40 hover:scale-[1.02] focus:ring-2 focus:ring-emerald-400"
        >
          Login
        </button>
        <div className="flex flex-col gap-2 mt-4">
          <button
            type="button"
            className="w-full bg-gradient-to-r from-pink-500 via-cyan-400 to-emerald-400 hover:from-pink-600 hover:to-emerald-500 text-slate-900 font-bold py-2 rounded-xl shadow-md border-2 border-cyan-400/40 hover:scale-[1.02] focus:ring-2 focus:ring-emerald-400 transition-all duration-200"
            onClick={() => signIn('google')}
          >
            Continue with Google
          </button>
          <button
            type="button"
            className="w-full bg-gradient-to-r from-gray-800 via-gray-900 to-cyan-400 hover:from-gray-900 hover:to-emerald-500 text-cyan-100 font-bold py-2 rounded-xl shadow-md border-2 border-cyan-400/40 hover:scale-[1.02] focus:ring-2 focus:ring-emerald-400 transition-all duration-200"
            onClick={() => signIn('github')}
          >
            Continue with GitHub
          </button>
        </div>
        <div className="text-center text-sm text-cyan-200 mt-2">
          Don&apos;t have an account?{' '}
          <Link href="/register" className="text-cyan-400 hover:underline font-semibold">Register</Link>
        </div>
        <div className="text-center text-sm mt-2">
          <Link href="/forgot-password" className="text-emerald-400 hover:underline font-semibold">Forgot password?</Link>
        </div>
      </form>
    </main>
  );
}
