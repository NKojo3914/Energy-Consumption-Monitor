import { NextRequest, NextResponse } from "next/server"
import { z } from "zod"

const resetPasswordSchema = z.object({
  token: z.string(),
  password: z.string().min(6),
})

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { token, password } = resetPasswordSchema.parse(body)
    // TODO: Validate token, update user password in DB
    // For now, just return success
    return NextResponse.json({ success: true })
  } catch (error) {
    return NextResponse.json({ success: false, error: "Invalid request" }, { status: 400 })
  }
}
