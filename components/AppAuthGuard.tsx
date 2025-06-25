"use client"
import { useAuth } from "@/hooks/use-auth"
import { useRouter, usePathname } from "next/navigation"
import { useEffect } from "react"

export default function AppAuthGuard({ children }: { children: React.ReactNode }) {
  const { user, initialLoading } = useAuth()
  const router = useRouter()
  const pathname = usePathname()

  useEffect(() => {
    // Only redirect if not on an auth page
    if (!initialLoading && !user && !pathname.startsWith("/login") && !pathname.startsWith("/register") && !pathname.startsWith("/forgot-password")) {
      router.push("/login")
    }
  }, [user, initialLoading, router, pathname])

  // Optionally, show a loading spinner while checking auth
  if (initialLoading) {
    return <div className="min-h-screen flex items-center justify-center">Loading...</div>
  }

  return <>{children}</>
}
