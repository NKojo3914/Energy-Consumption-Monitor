"use client"

import { useState, useEffect } from "react"
import { apiClient } from "@/lib/api"

type Device = {
  // Define the properties of Device according to your API response
  id: string
  name: string
  // Add other fields as needed
}

export function useDevices() {
  const [devices, setDevices] = useState<Device[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  // Move fetchDevices outside useEffect so it can be referenced in return
  const fetchDevices = async () => {
    try {
      setLoading(true)
      const response = await apiClient.getDevices()
      // Support both {data: Device[]} and Device[]
      const data: Device[] = Array.isArray(response)
        ? response
        : (response as { data: Device[] }).data
      setDevices(data)
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to fetch devices")
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchDevices()
  }, [])

  return { devices, loading, error, refetch: fetchDevices }
}

type RealTimeData = {
  currentUsage: number
  dailyTotal: number
  monthlyCost: number
  efficiency: number
}

export function useRealTimeData() {
  const [data, setData] = useState<RealTimeData | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    async function fetchData() {
      try {
        const realTimeData = await apiClient.getRealTimeData()
        setData(realTimeData)
      } catch (err) {
        setError(err instanceof Error ? err.message : "Failed to fetch real-time data")
      } finally {
        setLoading(false)
      }
    }

    fetchData()

    // Set up polling for real-time updates
    const interval = setInterval(fetchData, 30000) // Update every 30 seconds

    return () => clearInterval(interval)
  }, [])

  return { data, loading, error }
}

type Alert = {
  // Define the properties of Alert according to your API response
  id: string
  message: string
  // Add other fields as needed
}

export function useAlerts() {
  const [alerts, setAlerts] = useState<Alert[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    async function fetchAlerts() {
      try {
        setLoading(true)
        const response = await apiClient.getAlerts()
        setAlerts(response.data)
      } catch (err) {
        setError(err instanceof Error ? err.message : "Failed to fetch alerts")
      } finally {
        setLoading(false)
      }
    }

    fetchAlerts()
  }, [])

  return { alerts, loading, error, refetch: setAlerts }
}
