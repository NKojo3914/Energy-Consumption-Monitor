import { NextRequest, NextResponse } from "next/server"
import { z } from "zod"

const verifyEmailSchema = z.object({
  token: z.string(),
})

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { token } = verifyEmailSchema.parse(body)
    // TODO: Validate token, mark user as verified in DB
    // For now, just return success
    return NextResponse.json({ success: true })
  } catch (error) {
    return NextResponse.json({ success: false, error: "Invalid request" }, { status: 400 })
  }
}
