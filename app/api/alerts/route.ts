import { type NextRequest, NextResponse } from "next/server"
import type { Alert } from "@/types"

// Mock alerts data
const mockAlerts: Alert[] = [
  {
    id: "1",
    type: "high_usage",
    severity: "high",
    title: "High Energy Usage Detected",
    message: "Living Room AC is consuming 150% more energy than usual",
    deviceId: "1",
    isRead: false,
    isResolved: false,
    createdAt: new Date(Date.now() - 1000 * 60 * 30).toISOString(), // 30 minutes ago
  },
  {
    id: "2",
    type: "device_offline",
    severity: "medium",
    title: "Device Offline",
    message: "Kitchen Smart Plug has been offline for 2 hours",
    deviceId: "2",
    isRead: true,
    isResolved: false,
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 2).toISOString(), // 2 hours ago
  },
]

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const page = Number.parseInt(searchParams.get("page") || "1")
    const limit = Number.parseInt(searchParams.get("limit") || "20")

    // TODO: Implement actual pagination with database
    const startIndex = (page - 1) * limit
    const endIndex = startIndex + limit
    const paginatedAlerts = mockAlerts.slice(startIndex, endIndex)

    return NextResponse.json({
      success: true,
      data: {
        data: paginatedAlerts,
        pagination: {
          page,
          limit,
          total: mockAlerts.length,
          totalPages: Math.ceil(mockAlerts.length / limit),
        },
      },
    })
  } catch (error) {
    return NextResponse.json({ success: false, error: "Failed to fetch alerts" }, { status: 500 })
  }
}
