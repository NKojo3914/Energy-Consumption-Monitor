"use client"

import { useState, useEffect } from "react"
import { Battery, Zap, TrendingUp, TrendingDown, Home, Factory, Car, Lightbulb } from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Area, AreaChart, Bar, BarChart, CartesianGrid, ResponsiveContainer, XAxis, YAxis } from "recharts"
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"

const hourlyData = [
  { time: "00:00", consumption: 2.4, cost: 0.36 },
  { time: "04:00", consumption: 1.8, cost: 0.27 },
  { time: "08:00", consumption: 4.2, cost: 0.63 },
  { time: "12:00", consumption: 5.8, cost: 0.87 },
  { time: "16:00", consumption: 6.4, cost: 0.96 },
  { time: "20:00", consumption: 7.2, cost: 1.08 },
]

const deviceData = [
  { device: "HVAC", consumption: 45, icon: Home },
  { device: "Lighting", consumption: 15, icon: Lightbulb },
  { device: "Appliances", consumption: 25, icon: Factory },
  { device: "EV Charging", consumption: 15, icon: Car },
]

export default function Component() {
  const [currentUsage, setCurrentUsage] = useState(6.4)
  const [isOnline, setIsOnline] = useState(true)

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentUsage((prev) => prev + (Math.random() - 0.5) * 0.2)
    }, 2000)
    return () => clearInterval(interval)
  }, [])

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-blue-950 to-slate-900 text-white p-6">
      <div className="max-w-7xl mx-auto space-y-8">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div className="space-y-2">
            <h1 className="text-4xl font-bold bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent">
              Energy Monitor
            </h1>
            <p className="text-slate-400">Real-time energy consumption tracking</p>
          </div>
          <div className="flex items-center gap-4">
            <Badge variant={isOnline ? "default" : "destructive"} className="px-3 py-1">
              <div className={`w-2 h-2 rounded-full mr-2 ${isOnline ? "bg-green-400 animate-pulse" : "bg-red-400"}`} />
              {isOnline ? "Online" : "Offline"}
            </Badge>
            <Button variant="outline" className="border-cyan-500/50 text-cyan-400 hover:bg-cyan-500/10">
              Settings
            </Button>
          </div>
        </div>

        {/* Main Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {/* Current Usage */}
          <Card className="bg-gradient-to-br from-slate-900/50 to-slate-800/50 border-slate-700/50 backdrop-blur-sm">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-slate-300">Current Usage</CardTitle>
              <Zap className="h-4 w-4 text-yellow-400" />
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-yellow-400">{currentUsage.toFixed(1)} kW</div>
              <div className="flex items-center text-xs text-slate-400 mt-2">
                <TrendingUp className="h-3 w-3 mr-1 text-green-400" />
                +2.1% from last hour
              </div>
            </CardContent>
          </Card>

          {/* Daily Total */}
          <Card className="bg-gradient-to-br from-slate-900/50 to-slate-800/50 border-slate-700/50 backdrop-blur-sm">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-slate-300">Daily Total</CardTitle>
              <Battery className="h-4 w-4 text-blue-400" />
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-blue-400">127.3 kWh</div>
              <div className="flex items-center text-xs text-slate-400 mt-2">
                <TrendingDown className="h-3 w-3 mr-1 text-red-400" />
                -5.2% from yesterday
              </div>
            </CardContent>
          </Card>

          {/* Monthly Cost */}
          <Card className="bg-gradient-to-br from-slate-900/50 to-slate-800/50 border-slate-700/50 backdrop-blur-sm">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-slate-300">Monthly Cost</CardTitle>
              <div className="text-green-400 font-bold">$</div>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-green-400">$284.50</div>
              <div className="flex items-center text-xs text-slate-400 mt-2">
                <TrendingUp className="h-3 w-3 mr-1 text-green-400" />
                On track for $340
              </div>
            </CardContent>
          </Card>

          {/* Efficiency Score */}
          <Card className="bg-gradient-to-br from-slate-900/50 to-slate-800/50 border-slate-700/50 backdrop-blur-sm">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-slate-300">Efficiency</CardTitle>
              <div className="text-purple-400 text-lg font-bold">A+</div>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-purple-400">87%</div>
              <Progress value={87} className="mt-2 h-2" />
            </CardContent>
          </Card>
        </div>

        {/* Charts Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Usage Over Time */}
          <Card className="bg-gradient-to-br from-slate-900/50 to-slate-800/50 border-slate-700/50 backdrop-blur-sm">
            <CardHeader>
              <CardTitle className="text-cyan-400">24-Hour Usage Pattern</CardTitle>
              <CardDescription className="text-slate-400">Energy consumption throughout the day</CardDescription>
            </CardHeader>
            <CardContent>
              <ChartContainer
                config={{
                  consumption: {
                    label: "Consumption (kW)",
                    color: "hsl(var(--chart-1))",
                  },
                }}
                className="h-[300px]"
              >
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={hourlyData}>
                    <defs>
                      <linearGradient id="consumptionGradient" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#06b6d4" stopOpacity={0.8} />
                        <stop offset="95%" stopColor="#06b6d4" stopOpacity={0.1} />
                      </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" stroke="#334155" />
                    <XAxis dataKey="time" stroke="#64748b" />
                    <YAxis stroke="#64748b" />
                    <ChartTooltip content={<ChartTooltipContent />} />
                    <Area
                      type="monotone"
                      dataKey="consumption"
                      stroke="#06b6d4"
                      strokeWidth={2}
                      fill="url(#consumptionGradient)"
                    />
                  </AreaChart>
                </ResponsiveContainer>
              </ChartContainer>
            </CardContent>
          </Card>

          {/* Device Breakdown */}
          <Card className="bg-gradient-to-br from-slate-900/50 to-slate-800/50 border-slate-700/50 backdrop-blur-sm">
            <CardHeader>
              <CardTitle className="text-cyan-400">Device Consumption</CardTitle>
              <CardDescription className="text-slate-400">Energy usage by device category</CardDescription>
            </CardHeader>
            <CardContent>
              <ChartContainer
                config={{
                  consumption: {
                    label: "Consumption (%)",
                    color: "hsl(var(--chart-2))",
                  },
                }}
                className="h-[300px]"
              >
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={deviceData} layout="horizontal">
                    <CartesianGrid strokeDasharray="3 3" stroke="#334155" />
                    <XAxis type="number" stroke="#64748b" />
                    <YAxis dataKey="device" type="category" stroke="#64748b" width={80} />
                    <ChartTooltip content={<ChartTooltipContent />} />
                    <Bar dataKey="consumption" fill="#8b5cf6" radius={[0, 4, 4, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </ChartContainer>
            </CardContent>
          </Card>
        </div>

        {/* Device Status Grid */}
        <Card className="bg-gradient-to-br from-slate-900/50 to-slate-800/50 border-slate-700/50 backdrop-blur-sm">
          <CardHeader>
            <CardTitle className="text-cyan-400">Device Status</CardTitle>
            <CardDescription className="text-slate-400">Real-time status of connected devices</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              {deviceData.map((device, index) => {
                const IconComponent = device.icon
                return (
                  <div
                    key={device.device}
                    className="p-4 rounded-lg bg-gradient-to-br from-slate-800/50 to-slate-700/50 border border-slate-600/50"
                  >
                    <div className="flex items-center justify-between mb-3">
                      <IconComponent className="h-6 w-6 text-cyan-400" />
                      <Badge variant="outline" className="border-green-500/50 text-green-400">
                        Active
                      </Badge>
                    </div>
                    <h3 className="font-semibold text-white mb-1">{device.device}</h3>
                    <p className="text-2xl font-bold text-cyan-400">{device.consumption}%</p>
                    <Progress value={device.consumption} className="mt-2 h-2" />
                  </div>
                )
              })}
            </div>
          </CardContent>
        </Card>

        {/* Real-time Meter */}
        <Card className="bg-gradient-to-br from-slate-900/50 to-slate-800/50 border-slate-700/50 backdrop-blur-sm">
          <CardHeader>
            <CardTitle className="text-cyan-400">Live Energy Meter</CardTitle>
            <CardDescription className="text-slate-400">Current power draw visualization</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-center py-8">
              <div className="relative">
                <div className="w-48 h-48 rounded-full border-8 border-slate-700 flex items-center justify-center">
                  <div className="text-center">
                    <div className="text-4xl font-bold text-yellow-400 mb-2">{currentUsage.toFixed(1)}</div>
                    <div className="text-sm text-slate-400">kW</div>
                  </div>
                </div>
                <div
                  className="absolute inset-0 rounded-full border-8 border-transparent border-t-yellow-400 animate-spin"
                  style={{ animationDuration: "3s" }}
                />
                <div className="absolute -inset-2 rounded-full border border-yellow-400/20 animate-pulse" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
