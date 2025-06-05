"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import { Zap, TrendingUp, TrendingDown, AlertTriangle } from "lucide-react"

interface MeterData {
  current: number
  voltage: number
  frequency: number
  powerFactor: number
  temperature: number
}

export function RealTimeMeter() {
  const [data, setData] = useState<MeterData>({
    current: 6.4,
    voltage: 240.2,
    frequency: 60.0,
    powerFactor: 0.95,
    temperature: 68,
  })

  const [trend, setTrend] = useState<"up" | "down" | "stable">("stable")

  useEffect(() => {
    const interval = setInterval(() => {
      setData((prev) => {
        const newCurrent = prev.current + (Math.random() - 0.5) * 0.3
        const newVoltage = 240 + (Math.random() - 0.5) * 2
        const newFrequency = 60 + (Math.random() - 0.5) * 0.1
        const newPowerFactor = 0.95 + (Math.random() - 0.5) * 0.05
        const newTemperature = 68 + (Math.random() - 0.5) * 4

        // Determine trend
        if (newCurrent > prev.current + 0.1) setTrend("up")
        else if (newCurrent < prev.current - 0.1) setTrend("down")
        else setTrend("stable")

        return {
          current: Math.max(0, newCurrent),
          voltage: Math.max(220, Math.min(250, newVoltage)),
          frequency: Math.max(59.5, Math.min(60.5, newFrequency)),
          powerFactor: Math.max(0.8, Math.min(1.0, newPowerFactor)),
          temperature: Math.max(60, Math.min(80, newTemperature)),
        }
      })
    }, 1000)

    return () => clearInterval(interval)
  }, [])

  const getTrendIcon = () => {
    switch (trend) {
      case "up":
        return <TrendingUp className="w-4 h-4 text-red-400" />
      case "down":
        return <TrendingDown className="w-4 h-4 text-green-400" />
      default:
        return <div className="w-4 h-4" />
    }
  }

  const getStatusColor = (value: number, min: number, max: number) => {
    if (value < min || value > max) return "destructive"
    if (value < min * 1.1 || value > max * 0.9) return "secondary"
    return "default"
  }

  return (
    <Card className="glass-card neon-glow">
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle className="text-cyan-400 flex items-center gap-2">
              <Zap className="w-5 h-5" />
              Live Energy Meter
            </CardTitle>
            <CardDescription>Real-time electrical parameters</CardDescription>
          </div>
          <Badge variant={data.current > 8 ? "destructive" : "default"} className="gap-2">
            {getTrendIcon()}
            {trend === "up" ? "Rising" : trend === "down" ? "Falling" : "Stable"}
          </Badge>
        </div>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Main Power Display */}
        <div className="flex items-center justify-center">
          <div className="relative">
            <div className="w-40 h-40 rounded-full border-4 border-slate-700 flex items-center justify-center floating">
              <div className="text-center">
                <div className="text-3xl font-bold text-yellow-400 energy-pulse">{data.current.toFixed(1)}</div>
                <div className="text-sm text-slate-400">kW</div>
              </div>
            </div>
            <div
              className="absolute inset-0 rounded-full border-4 border-transparent border-t-yellow-400 animate-spin"
              style={{ animationDuration: `${3 - data.current / 10}s` }}
            />
          </div>
        </div>

        {/* Parameter Grid */}
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-sm text-slate-400">Voltage</span>
              <Badge variant={getStatusColor(data.voltage, 220, 250)}>{data.voltage.toFixed(1)}V</Badge>
            </div>
            <Progress value={((data.voltage - 220) / 30) * 100} className="h-2" />
          </div>

          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-sm text-slate-400">Frequency</span>
              <Badge variant={getStatusColor(data.frequency, 59.5, 60.5)}>{data.frequency.toFixed(1)}Hz</Badge>
            </div>
            <Progress value={((data.frequency - 59.5) / 1) * 100} className="h-2" />
          </div>

          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-sm text-slate-400">Power Factor</span>
              <Badge variant={getStatusColor(data.powerFactor, 0.9, 1.0)}>{data.powerFactor.toFixed(2)}</Badge>
            </div>
            <Progress value={data.powerFactor * 100} className="h-2" />
          </div>

          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-sm text-slate-400">Temperature</span>
              <Badge variant={getStatusColor(data.temperature, 60, 75)}>{data.temperature.toFixed(0)}°F</Badge>
            </div>
            <Progress value={((data.temperature - 60) / 20) * 100} className="h-2" />
          </div>
        </div>

        {/* Alerts */}
        {(data.current > 8 || data.temperature > 75) && (
          <div className="flex items-center gap-2 p-3 rounded-lg bg-red-500/10 border border-red-500/20">
            <AlertTriangle className="w-4 h-4 text-red-400" />
            <span className="text-sm text-red-400">
              {data.current > 8 && "High power consumption detected. "}
              {data.temperature > 75 && "Equipment temperature elevated."}
            </span>
          </div>
        )}
      </CardContent>
    </Card>
  )
}
