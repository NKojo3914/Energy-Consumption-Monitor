"use client"
import { useState } from "react"
import { useRouter, useSearchParams } from "next/navigation"

export default function ResetPasswordPage() {
  const [password, setPassword] = useState("")
  const [success, setSuccess] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const router = useRouter()
  const searchParams = useSearchParams()
  const token = searchParams.get("token")

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError(null)
    setSuccess(false)
    const res = await fetch("/api/auth/reset-password", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ token, password })
    })
    const data = await res.json()
    if (res.ok) {
      setSuccess(true)
      setTimeout(() => router.push("/api/auth/login"), 2000)
    } else {
      setError(data.error || "Failed to reset password")
    }
  }

  return (
    <main className="min-h-screen flex items-center justify-center bg-gray-50 p-4">
      <form onSubmit={handleSubmit} className="w-full max-w-md p-6 bg-white rounded shadow-md space-y-4">
        <h1 className="text-2xl font-bold text-center">Reset Password</h1>
        {success ? (
          <p className="text-green-600 text-center">Password reset! Redirecting to login...</p>
        ) : (
          <>
            <input
              type="password"
              placeholder="New Password"
              className="w-full border p-2 rounded"
              value={password}
              onChange={e => setPassword(e.target.value)}
              required
            />
            {error && <p className="text-red-500 text-center">{error}</p>}
            <button type="submit" className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded">
              Reset Password
            </button>
          </>
        )}
      </form>
    </main>
  )
}
