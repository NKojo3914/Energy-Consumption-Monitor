"use client";
import { useState, useRef } from "react";
import { useAuth } from "@/hooks/use-auth";
import { useRouter } from "next/navigation";
import { signIn } from 'next-auth/react';
import Link from "next/link";

export default function RegisterPage() {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);
  const [agreed, setAgreed] = useState(false);
  const [passwordStrength, setPasswordStrength] = useState(0);
  const { register } = useAuth();
  const router = useRouter();
  const passwordRef = useRef<HTMLInputElement>(null);

  function validateEmail(email: string) {
    return /^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(email);
  }

  function getPasswordStrength(pw: string) {
    let score = 0;
    if (pw.length >= 8) score++;
    if (/[A-Z]/.test(pw)) score++;
    if (/[a-z]/.test(pw)) score++;
    if (/[0-9]/.test(pw)) score++;
    if (/[^A-Za-z0-9]/.test(pw)) score++;
    return score;
  }

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setSuccess(false);
    if (!validateEmail(email)) {
      setError("Please enter a valid email address.");
      return;
    }
    if (!name) {
      setError("Please enter your name.");
      return;
    }
    if (password !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }
    if (!agreed) {
      setError("You must agree to the terms.");
      return;
    }
    const ok = await register(email, name, password);
    if (ok) {
      setSuccess(true);
      setTimeout(() => router.push("/login"), 2000);
    }
  };

  function handlePasswordChange(e: React.ChangeEvent<HTMLInputElement>) {
    setPassword(e.target.value);
    setPasswordStrength(getPasswordStrength(e.target.value));
  }

  return (
    <main className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#0a1a2f] via-[#10131a] to-[#0a1a2f] p-4">
      <form
        onSubmit={handleRegister}
        className="relative z-10 w-full max-w-md p-10 bg-gradient-to-br from-[#10131a]/95 to-[#0a1a2f]/95 rounded-3xl shadow-[0_8px_32px_0_rgba(0,255,255,0.15)] space-y-8 border border-cyan-400/40 backdrop-blur-2xl ring-2 ring-cyan-400/10 hover:ring-emerald-400/20 transition-all duration-300"
        autoComplete="off"
      >
        <h1 className="text-4xl font-extrabold text-center bg-gradient-to-r from-cyan-300 via-emerald-400 to-cyan-400 bg-clip-text text-transparent tracking-tight drop-shadow-xl mb-2">
          <span className="inline-block align-middle mr-2 animate-pulse">&#9679;</span>
          Create Account
          <span className="inline-block align-middle ml-2 animate-pulse">&#9679;</span>
        </h1>
        {error && <p className="text-red-400 text-base text-center font-semibold animate-pulse drop-shadow-md">{error}</p>}
        {success && (
          <p className="text-emerald-400 text-base text-center font-semibold animate-pulse drop-shadow-md">
            Registration successful! Please check your email to verify your account.
          </p>
        )}
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
          <label className="block font-semibold text-cyan-200 tracking-wide">Name</label>
          <input
            type="text"
            placeholder="Name"
            className="w-full border-2 border-cyan-500/40 bg-slate-900/80 text-cyan-100 p-3 rounded-xl focus:ring-2 focus:ring-cyan-400 outline-none transition placeholder-cyan-400/60 shadow-inner shadow-cyan-400/10"
            value={name}
            onChange={e => setName(e.target.value)}
            required
          />
        </div>
        <div className="space-y-2">
          <label className="block font-semibold text-cyan-200 tracking-wide">Password</label>
          <input
            type={showPassword ? "text" : "password"}
            placeholder="Password"
            className="w-full border-2 border-cyan-500/40 bg-slate-900/80 text-cyan-100 p-3 rounded-xl focus:ring-2 focus:ring-cyan-400 outline-none transition placeholder-cyan-400/60 shadow-inner shadow-cyan-400/10"
            value={password}
            onChange={handlePasswordChange}
            ref={passwordRef}
            required
          />
          <div className="flex items-center gap-2 mt-1">
            <input
              type="checkbox"
              checked={showPassword}
              onChange={() => setShowPassword(v => !v)}
              id="show-password"
              className="accent-cyan-400 scale-110"
            />
            <label htmlFor="show-password" className="text-sm text-cyan-300 select-none">Show Password</label>
          </div>
        </div>
        <div className="space-y-2">
          <label className="block font-semibold text-cyan-200 tracking-wide">Confirm Password</label>
          <input
            type={showPassword ? "text" : "password"}
            placeholder="Confirm Password"
            className="w-full border-2 border-cyan-500/40 bg-slate-900/80 text-cyan-100 p-3 rounded-xl focus:ring-2 focus:ring-cyan-400 outline-none transition placeholder-cyan-400/60 shadow-inner shadow-cyan-400/10"
            value={confirmPassword}
            onChange={e => setConfirmPassword(e.target.value)}
            required
          />
        </div>
        <div className="flex items-center gap-2 mt-2">
          <input
            type="checkbox"
            checked={agreed}
            onChange={() => setAgreed(v => !v)}
            id="agree"
            className="accent-emerald-400 scale-110"
          />
          <label htmlFor="agree" className="text-sm text-cyan-300 select-none">I agree to the terms and conditions</label>
        </div>
        <button
          type="submit"
          className="w-full bg-gradient-to-r from-cyan-400 via-emerald-400 to-cyan-400 hover:from-cyan-500 hover:to-emerald-500 text-slate-900 font-extrabold py-3 rounded-xl shadow-lg mt-2 transition-all duration-200 tracking-wide text-lg disabled:opacity-60 disabled:cursor-not-allowed border-2 border-cyan-400/40 hover:scale-[1.02] focus:ring-2 focus:ring-emerald-400"
          disabled={success}
        >
          {success ? "Registered!" : "Register"}
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
          Already have an account?{' '}
          <Link href="/login" className="text-cyan-400 hover:underline font-semibold">Login</Link>
        </div>
      </form>
    </main>
  );
}
