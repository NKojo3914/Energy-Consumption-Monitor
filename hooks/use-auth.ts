import { useState } from "react"

export function useAuth() {
  const [user, setUser] = useState(null)
  const [token, setToken] = useState(null)
  const [error, setError] = useState(null)
  const [loading, setLoading] = useState(false)

  async function login(email: string, password: string) {
    setLoading(true)
    setError(null)
    try {
      const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password })
      })
      const data = await res.json()
      if (!res.ok) throw new Error(data.error || "Login failed")
      setUser(data.user)
      setToken(data.token)
      localStorage.setItem("auth_token", data.token)
      return data.user
    } catch (err: any) {
      setError(err.message)
      setUser(null)
      setToken(null)
      return null
    } finally {
      setLoading(false)
    }
  }

  async function register(email: string, name: string, password: string) {
    setLoading(true)
    setError(null)
    try {
      const res = await fetch("/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, name, password })
      })
      const data = await res.json()
      if (!res.ok) throw new Error(data.error || "Registration failed")
      return true
    } catch (err: any) {
      setError(err.message)
      return false
    } finally {
      setLoading(false)
    }
  }

  function logout() {
    setUser(null)
    setToken(null)
    localStorage.removeItem("auth_token")
  }

  return { user, token, error, loading, login, register, logout }
}
