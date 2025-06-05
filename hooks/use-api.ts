"use client"

import { useState, useEffect } from "react"
import { apiClient } from "@/lib/api"

export function useDevices() {
  const [devices, setDevices] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    async function fetchDevices() {
      try {
        setLoading(true)
        const data = await apiClient.getDevices()
        setDevices(data)
      } catch (err) {
        setError(err instanceof Error ? err.message : "Failed to fetch devices")
      } finally {
        setLoading(false)
      }
    }

    fetchDevices()
  }, [])

  return { devices, loading, error, refetch: fetchDevices }
}

export function useRealTimeData() {
  const [data, setData] = useState(null)
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

export function useAlerts() {
  const [alerts, setAlerts] = useState([])
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

  return { alerts, loading, error, refetch: fetchAlerts }
}
