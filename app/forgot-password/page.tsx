"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState("");
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setSuccess(false);
    const res = await fetch("http://localhost:4000/api/auth/forgot-password", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email })
    });
    const data = await res.json();
    if (res.ok) {
      setSuccess(true);
      setTimeout(() => router.push("/login"), 2000);
    } else {
      setError(data.error || "Failed to send reset email");
    }
  };

  return (
    <main className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#0a1a2f] via-[#10131a] to-[#0a1a2f] p-4">
      <form
        onSubmit={handleSubmit}
        className="relative z-10 w-full max-w-md p-10 bg-gradient-to-br from-[#10131a]/95 to-[#0a1a2f]/95 rounded-3xl shadow-[0_8px_32px_0_rgba(0,255,255,0.15)] space-y-8 border border-cyan-400/40 backdrop-blur-2xl ring-2 ring-cyan-400/10 hover:ring-emerald-400/20 transition-all duration-300"
        autoComplete="off"
      >
        <h1 className="text-4xl font-extrabold text-center bg-gradient-to-r from-cyan-300 via-emerald-400 to-cyan-400 bg-clip-text text-transparent tracking-tight drop-shadow-xl mb-2">
          <span className="inline-block align-middle mr-2 animate-pulse">&#9679;</span>
          Forgot Password
          <span className="inline-block align-middle ml-2 animate-pulse">&#9679;</span>
        </h1>
        {error && <p className="text-red-400 text-base text-center font-semibold animate-pulse drop-shadow-md">{error}</p>}
        {success && (
          <p className="text-emerald-400 text-base text-center font-semibold animate-pulse drop-shadow-md">
            If your email exists, a reset link has been sent.
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
        <button
          type="submit"
          className="w-full bg-gradient-to-r from-cyan-400 via-emerald-400 to-cyan-400 hover:from-cyan-500 hover:to-emerald-500 text-slate-900 font-extrabold py-3 rounded-xl shadow-lg mt-2 transition-all duration-200 tracking-wide text-lg disabled:opacity-60 disabled:cursor-not-allowed border-2 border-cyan-400/40 hover:scale-[1.02] focus:ring-2 focus:ring-emerald-400"
          disabled={success}
        >
          Send Reset Link
        </button>
        <div className="text-center text-sm text-cyan-200 mt-2">
          Remembered your password?{' '}
          <a href="/login" className="text-cyan-400 hover:underline font-semibold">Login</a>
        </div>
      </form>
    </main>
  );
}
