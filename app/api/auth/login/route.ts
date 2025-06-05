import { type NextRequest, NextResponse } from "next/server"
import { z } from "zod"

const loginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(6),
})

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { email, password } = loginSchema.parse(body)

    // TODO: Implement actual authentication logic
    // This is where you'd verify credentials against your database

    // Mock response for development
    if (email === "demo@example.com" && password === "password") {
      const user = {
        id: "1",
        email,
        name: "Demo User",
        role: "user" as const,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      }

      const token = "mock-jwt-token" // TODO: Generate actual JWT

      return NextResponse.json({
        success: true,
        data: { user, token },
      })
    }

    return NextResponse.json({ success: false, error: "Invalid credentials" }, { status: 401 })
  } catch (error) {
    return NextResponse.json({ success: false, error: "Invalid request data" }, { status: 400 })
  }
}
