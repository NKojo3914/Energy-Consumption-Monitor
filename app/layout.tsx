import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import { ThemeProvider } from "@/components/theme-provider"
import { Toaster } from "@/components/ui/toaster"
import Link from "next/link"
import AppAuthGuard from "@/components/AppAuthGuard"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "NeoEnergy - Advanced Energy Monitoring",
  description: "Next-generation energy consumption monitoring and optimization platform",
  generator: 'v0.dev'
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        {/* Modern top navigation bar without logo/app name */}
        <nav className="w-full bg-gradient-to-r from-blue-900 to-emerald-700 text-white px-6 py-3 flex items-center justify-end shadow-md z-50">
          <div className="flex gap-4 items-center text-base">
            <Link href="/login" className="hover:text-emerald-300 transition-colors">Login</Link>
            <Link href="/register" className="hover:text-emerald-300 transition-colors">Register</Link>
            <Link href="/forgot-password" className="hover:text-emerald-300 transition-colors">Forgot Password?</Link>
          </div>
        </nav>
        <ThemeProvider attribute="class" defaultTheme="dark" enableSystem disableTransitionOnChange>
          <AppAuthGuard>
            {children}
          </AppAuthGuard>
          <Toaster />
        </ThemeProvider>
      </body>
    </html>
  )
}
