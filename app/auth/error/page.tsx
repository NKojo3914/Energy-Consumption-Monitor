"use client";
import Link from "next/link";

export default function AuthErrorPage() {
  return (
    <main className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#0f2027] via-[#2c5364] to-[#00c9ff] p-4 relative overflow-hidden">
      {/* Futuristic glowing background elements */}
      <div className="absolute inset-0 pointer-events-none z-0">
        <div className="absolute -top-32 -left-32 w-96 h-96 bg-red-400 opacity-20 rounded-full blur-3xl animate-pulse" />
        <div className="absolute -bottom-32 -right-32 w-96 h-96 bg-pink-500 opacity-20 rounded-full blur-3xl animate-pulse" />
        <div className="absolute top-1/2 left-1/2 w-1/2 h-1/2 bg-gradient-to-br from-red-400/10 to-pink-400/10 rounded-full blur-2xl -translate-x-1/2 -translate-y-1/2" />
      </div>
      <div className="relative z-10 w-full max-w-md p-10 bg-gradient-to-br from-slate-900/90 to-blue-900/90 rounded-2xl shadow-2xl space-y-8 border border-pink-400/30 backdrop-blur-xl text-center">
        <h1 className="text-4xl font-extrabold bg-gradient-to-r from-pink-400 to-red-400 bg-clip-text text-transparent tracking-tight drop-shadow-lg mb-2">
          Authentication Error
        </h1>
        <p className="text-red-300 text-lg mb-4 animate-pulse">
          Something went wrong with your login or authentication.<br />
          Please try again or contact support if the problem persists.
        </p>
        <Link href="/login" className="inline-block mt-4 px-6 py-3 bg-gradient-to-r from-cyan-400 to-emerald-400 text-slate-900 font-bold rounded-lg shadow-lg hover:from-cyan-500 hover:to-emerald-500 transition-all duration-200">
          Back to Login
        </Link>
      </div>
    </main>
  );
}
