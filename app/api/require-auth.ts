import jwt from "jsonwebtoken"
import { NextRequest, NextResponse } from "next/server"

const JWT_SECRET = process.env.JWT_SECRET || "changeme"

export function requireAuth(request: NextRequest) {
  const auth = request.headers.get("authorization")
  if (!auth || !auth.startsWith("Bearer ")) {
    return NextResponse.json({ success: false, error: "Unauthorized" }, { status: 401 })
  }
  const token = auth.replace("Bearer ", "")
  try {
    const user = jwt.verify(token, JWT_SECRET)
    return user
  } catch {
    return NextResponse.json({ success: false, error: "Invalid token" }, { status: 401 })
  }
}
