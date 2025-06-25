"use client"
import { useEffect, useState } from "react"
import { useRouter, useSearchParams } from "next/navigation"

export default function VerifyEmailPage() {
  const [status, setStatus] = useState<"pending" | "success" | "error">("pending")
  const router = useRouter()
  const searchParams = useSearchParams()
  const token = searchParams.get("token")

  useEffect(() => {
    if (!token) {
      setStatus("error")
      return
    }
    fetch("/api/auth/verify-email", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ token })
    })
      .then(res => {
        if (res.ok) setStatus("success")
        else setStatus("error")
      })
      .catch(() => setStatus("error"))
  }, [token])

  return (
    <main className="min-h-screen flex items-center justify-center bg-gray-50 p-4">
      <div className="w-full max-w-md p-6 bg-white rounded shadow-md space-y-4 text-center">
        <h1 className="text-2xl font-bold">Verify Email</h1>
        {status === "pending" && <p>Verifying your email...</p>}
        {status === "success" && <p className="text-green-600">Email verified! You can now log in.</p>}
        {status === "error" && <p className="text-red-500">Invalid or expired verification link.</p>}
      </div>
    </main>
  )
}
