import { useState, useEffect } from "react"
import apiClient from "@/lib/api"
import type { User } from "@/types"

const API_BASE = process.env.NEXT_PUBLIC_BACKEND_URL || "http://localhost:4000/api/auth"

export function useAuth() {
  const [user, setUser] = useState<User | null>(null)
  const [token, setToken] = useState<string | null>(null)
  const [error, setError] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)
  const [initialLoading, setInitialLoading] = useState(true)

  // Only require login if no valid token in localStorage (i.e., after full app close)
  useEffect(() => {
    const storedToken = typeof window !== "undefined" ? localStorage.getItem("auth_token") : null
    if (storedToken && !user) {
      setLoading(true)
      setToken(storedToken)
      apiClient.setToken(storedToken)
      apiClient.getProfile()
        .then(profile => {
          setUser(profile)
        })
        .catch(() => {
          setUser(null)
          setToken(null)
          localStorage.removeItem("auth_token")
          apiClient.setToken(null)
        })
        .finally(() => {
          setLoading(false)
          setInitialLoading(false)
        })
    } else {
      setInitialLoading(false)
    }
    // Do not force logout on every reload if token is present
  }, [])

  async function login(email: string, password: string) {
    setLoading(true)
    setError(null)
    try {
      const res = await fetch(`${API_BASE}/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password })
      })
      const data = await res.json()
      if (!res.ok) throw new Error(data.error || "Login failed")
      setUser(data.user)
      setToken(data.token)
      localStorage.setItem("auth_token", data.token)
      apiClient.setToken(data.token)
      return data.user
    } catch (err: any) {
      setError(err.message)
      setUser(null)
      setToken(null)
      apiClient.setToken(null)
      return null
    } finally {
      setLoading(false)
    }
  }

  async function register(email: string, name: string, password: string) {
    setLoading(true)
    setError(null)
    try {
      const res = await fetch(`${API_BASE}/register`, {
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

  async function deleteAccount() {
    setLoading(true)
    setError(null)
    try {
      await apiClient.deleteAccount()
      setUser(null)
      setToken(null)
      localStorage.removeItem("auth_token")
      apiClient.setToken(null)
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
    apiClient.setToken(null)
  }

  return { user, token, error, loading, initialLoading, login, register, logout, deleteAccount }
}
