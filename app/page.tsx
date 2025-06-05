"use client"

import { useState, useEffect } from "react"
import { Sidebar } from "@/components/layout/sidebar"
import { Header } from "@/components/layout/header"
import { RealTimeMeter } from "@/components/dashboard/real-time-meter"
import { EnergyFlow } from "@/components/dashboard/energy-flow"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  Battery,
  Zap,
  TrendingUp,
  TrendingDown,
  Home,
  Factory,
  Car,
  Lightbulb,
  Thermometer,
  Droplets,
  Wind,
  Sun,
  Moon,
  AlertTriangle,
  CheckCircle,
  Clock,
  DollarSign,
} from "lucide-react"
import {
  Area,
  AreaChart,
  Bar,
  BarChart,
  Line,
  CartesianGrid,
  ResponsiveContainer,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
} from "recharts"
import { ChartContainer } from "@/components/ui/chart"

const hourlyData = [
  { time: "00:00", consumption: 2.4, cost: 0.36, solar: 0, grid: 2.4 },
  { time: "02:00", consumption: 2.1, cost: 0.32, solar: 0, grid: 2.1 },
  { time: "04:00", consumption: 1.8, cost: 0.27, solar: 0, grid: 1.8 },
  { time: "06:00", consumption: 2.8, cost: 0.42, solar: 0.5, grid: 2.3 },
  { time: "08:00", consumption: 4.2, cost: 0.63, solar: 1.8, grid: 2.4 },
  { time: "10:00", consumption: 5.1, cost: 0.77, solar: 3.2, grid: 1.9 },
  { time: "12:00", consumption: 5.8, cost: 0.87, solar: 4.1, grid: 1.7 },
  { time: "14:00", consumption: 6.2, cost: 0.93, solar: 4.8, grid: 1.4 },
  { time: "16:00", consumption: 6.4, cost: 0.96, solar: 3.9, grid: 2.5 },
  { time: "18:00", consumption: 7.2, cost: 1.08, solar: 1.2, grid: 6.0 },
  { time: "20:00", consumption: 6.8, cost: 1.02, solar: 0, grid: 6.8 },
  { time: "22:00", consumption: 4.5, cost: 0.68, solar: 0, grid: 4.5 },
]

const deviceData = [
  { device: "HVAC System", consumption: 45, status: "active", efficiency: 87, icon: Home, color: "text-blue-400" },
  { device: "Lighting", consumption: 15, status: "active", efficiency: 92, icon: Lightbulb, color: "text-yellow-400" },
  {
    device: "Kitchen Appliances",
    consumption: 25,
    status: "active",
    efficiency: 78,
    icon: Factory,
    color: "text-green-400",
  },
  { device: "EV Charging", consumption: 15, status: "charging", efficiency: 95, icon: Car, color: "text-purple-400" },
]

const weeklyComparison = [
  { day: "Mon", thisWeek: 45.2, lastWeek: 48.1 },
  { day: "Tue", thisWeek: 42.8, lastWeek: 46.3 },
  { day: "Wed", thisWeek: 44.1, lastWeek: 47.8 },
  { day: "Thu", thisWeek: 41.9, lastWeek: 45.2 },
  { day: "Fri", thisWeek: 43.5, lastWeek: 46.9 },
  { day: "Sat", thisWeek: 38.7, lastWeek: 41.2 },
  { day: "Sun", thisWeek: 36.2, lastWeek: 39.8 },
]

export default function Dashboard() {
  const [currentUsage, setCurrentUsage] = useState(6.4)
  const [weatherData, setWeatherData] = useState({
    temperature: 72,
    humidity: 45,
    windSpeed: 8,
    solarIrradiance: 850,
  })

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentUsage((prev) => Math.max(0, prev + (Math.random() - 0.5) * 0.3))
      setWeatherData((prev) => ({
        temperature: prev.temperature + (Math.random() - 0.5) * 2,
        humidity: Math.max(20, Math.min(80, prev.humidity + (Math.random() - 0.5) * 5)),
        windSpeed: Math.max(0, prev.windSpeed + (Math.random() - 0.5) * 2),
        solarIrradiance: Math.max(0, Math.min(1000, prev.solarIrradiance + (Math.random() - 0.5) * 50)),
      }))
    }, 3000)
    return () => clearInterval(interval)
  }, [])

  const totalSavings = 284.5
  const monthlyBudget = 350
  const efficiencyScore = 87

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-blue-950 to-slate-900">
      <Sidebar />
      <div className="lg:pl-80">
        <Header />
        <main className="p-6 space-y-8">
          {/* Hero Stats */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <Card className="glass-card neon-glow">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium text-slate-300">Current Usage</CardTitle>
                <Zap className="h-4 w-4 text-yellow-400 energy-pulse" />
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold text-yellow-400">{currentUsage.toFixed(1)} kW</div>
                <div className="flex items-center text-xs text-slate-400 mt-2">
                  <TrendingUp className="h-3 w-3 mr-1 text-green-400" />
                  +2.1% from last hour
                </div>
                <Progress value={(currentUsage / 10) * 100} className="mt-3 h-2" />
              </CardContent>
            </Card>

            <Card className="glass-card">
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
                <Progress value={65} className="mt-3 h-2" />
              </CardContent>
            </Card>

            <Card className="glass-card">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium text-slate-300">Monthly Cost</CardTitle>
                <DollarSign className="h-4 w-4 text-green-400" />
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold text-green-400">${totalSavings.toFixed(2)}</div>
                <div className="flex items-center text-xs text-slate-400 mt-2">
                  <CheckCircle className="h-3 w-3 mr-1 text-green-400" />${(monthlyBudget - totalSavings).toFixed(2)}{" "}
                  under budget
                </div>
                <Progress value={(totalSavings / monthlyBudget) * 100} className="mt-3 h-2" />
              </CardContent>
            </Card>

            <Card className="glass-card">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium text-slate-300">Efficiency Score</CardTitle>
                <div className="text-purple-400 text-lg font-bold">A+</div>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold text-purple-400">{efficiencyScore}%</div>
                <div className="flex items-center text-xs text-slate-400 mt-2">
                  <TrendingUp className="h-3 w-3 mr-1 text-green-400" />
                  +3% this month
                </div>
                <Progress value={efficiencyScore} className="mt-3 h-2" />
              </CardContent>
            </Card>
          </div>

          {/* Main Dashboard Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Real-time Meter */}
            <div className="lg:col-span-1">
              <RealTimeMeter />
            </div>

            {/* Energy Flow */}
            <div className="lg:col-span-1">
              <EnergyFlow />
            </div>

            {/* Weather Impact */}
            <Card className="glass-card lg:col-span-1">
              <CardHeader>
                <CardTitle className="text-cyan-400 flex items-center gap-2">
                  <Sun className="w-5 h-5" />
                  Environmental Impact
                </CardTitle>
                <CardDescription>Weather conditions affecting energy usage</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="flex items-center gap-3">
                    <Thermometer className="w-5 h-5 text-red-400" />
                    <div>
                      <div className="text-sm text-slate-400">Temperature</div>
                      <div className="font-semibold">{weatherData.temperature.toFixed(0)}°F</div>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <Droplets className="w-5 h-5 text-blue-400" />
                    <div>
                      <div className="text-sm text-slate-400">Humidity</div>
                      <div className="font-semibold">{weatherData.humidity.toFixed(0)}%</div>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <Wind className="w-5 h-5 text-gray-400" />
                    <div>
                      <div className="text-sm text-slate-400">Wind Speed</div>
                      <div className="font-semibold">{weatherData.windSpeed.toFixed(1)} mph</div>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <Sun className="w-5 h-5 text-yellow-400" />
                    <div>
                      <div className="text-sm text-slate-400">Solar</div>
                      <div className="font-semibold">{weatherData.solarIrradiance.toFixed(0)} W/m²</div>
                    </div>
                  </div>
                </div>

                <div className="p-3 rounded-lg bg-blue-500/10 border border-blue-500/20">
                  <div className="flex items-center gap-2 mb-2">
                    <Sun className="w-4 h-4 text-yellow-400" />
                    <span className="text-sm font-medium">Solar Forecast</span>
                  </div>
                  <div className="text-xs text-slate-400">
                    Optimal solar generation expected between 10 AM - 3 PM. Consider scheduling high-energy tasks during
                    peak hours.
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Charts Section */}
          <Tabs defaultValue="consumption" className="space-y-6">
            <TabsList className="grid w-full grid-cols-3 lg:w-[400px]">
              <TabsTrigger value="consumption">Consumption</TabsTrigger>
              <TabsTrigger value="comparison">Comparison</TabsTrigger>
              <TabsTrigger value="devices">Devices</TabsTrigger>
            </TabsList>

            <TabsContent value="consumption" className="space-y-6">
              <Card className="glass-card">
                <CardHeader>
                  <CardTitle className="text-cyan-400">24-Hour Energy Pattern</CardTitle>
                  <CardDescription>Detailed consumption and generation breakdown</CardDescription>
                </CardHeader>
                <CardContent>
                  <ChartContainer
                    config={{
                      consumption: { label: "Consumption", color: "hsl(var(--chart-1))" },
                      solar: { label: "Solar Generation", color: "hsl(var(--chart-2))" },
                      grid: { label: "Grid Import", color: "hsl(var(--chart-3))" },
                    }}
                    className="h-[400px]"
                  >
                    <ResponsiveContainer width="100%" height="100%">
                      <AreaChart data={hourlyData}>
                        <defs>
                          <linearGradient id="consumptionGradient" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="5%" stopColor="#06b6d4" stopOpacity={0.8} />
                            <stop offset="95%" stopColor="#06b6d4" stopOpacity={0.1} />
                          </linearGradient>
                          <linearGradient id="solarGradient" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="5%" stopColor="#fbbf24" stopOpacity={0.8} />
                            <stop offset="95%" stopColor="#fbbf24" stopOpacity={0.1} />
                          </linearGradient>
                        </defs>
                        <CartesianGrid strokeDasharray="3 3" stroke="#334155" />
                        <XAxis dataKey="time" stroke="#64748b" />
                        <YAxis stroke="#64748b" />
                        <Tooltip
                          contentStyle={{
                            backgroundColor: "rgba(15, 23, 42, 0.9)",
                            border: "1px solid rgba(148, 163, 184, 0.2)",
                            borderRadius: "8px",
                          }}
                        />
                        <Legend />
                        <Area
                          type="monotone"
                          dataKey="consumption"
                          stackId="1"
                          stroke="#06b6d4"
                          fill="url(#consumptionGradient)"
                          name="Total Consumption"
                        />
                        <Area
                          type="monotone"
                          dataKey="solar"
                          stackId="2"
                          stroke="#fbbf24"
                          fill="url(#solarGradient)"
                          name="Solar Generation"
                        />
                        <Line type="monotone" dataKey="grid" stroke="#8b5cf6" strokeWidth={2} name="Grid Import" />
                      </AreaChart>
                    </ResponsiveContainer>
                  </ChartContainer>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="comparison" className="space-y-6">
              <Card className="glass-card">
                <CardHeader>
                  <CardTitle className="text-cyan-400">Weekly Comparison</CardTitle>
                  <CardDescription>This week vs last week consumption</CardDescription>
                </CardHeader>
                <CardContent>
                  <ChartContainer
                    config={{
                      thisWeek: { label: "This Week", color: "hsl(var(--chart-1))" },
                      lastWeek: { label: "Last Week", color: "hsl(var(--chart-2))" },
                    }}
                    className="h-[300px]"
                  >
                    <ResponsiveContainer width="100%" height="100%">
                      <BarChart data={weeklyComparison}>
                        <CartesianGrid strokeDasharray="3 3" stroke="#334155" />
                        <XAxis dataKey="day" stroke="#64748b" />
                        <YAxis stroke="#64748b" />
                        <Tooltip
                          contentStyle={{
                            backgroundColor: "rgba(15, 23, 42, 0.9)",
                            border: "1px solid rgba(148, 163, 184, 0.2)",
                            borderRadius: "8px",
                          }}
                        />
                        <Legend />
                        <Bar dataKey="thisWeek" fill="#06b6d4" name="This Week" radius={[4, 4, 0, 0]} />
                        <Bar dataKey="lastWeek" fill="#64748b" name="Last Week" radius={[4, 4, 0, 0]} />
                      </BarChart>
                    </ResponsiveContainer>
                  </ChartContainer>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="devices" className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {deviceData.map((device, index) => {
                  const IconComponent = device.icon
                  return (
                    <Card key={device.device} className="glass-card">
                      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <div className="flex items-center gap-3">
                          <IconComponent className={`h-6 w-6 ${device.color}`} />
                          <div>
                            <CardTitle className="text-base">{device.device}</CardTitle>
                            <CardDescription className="text-xs">
                              {device.status === "active"
                                ? "Currently Active"
                                : device.status === "charging"
                                  ? "Charging"
                                  : "Standby"}
                            </CardDescription>
                          </div>
                        </div>
                        <Badge variant={device.status === "active" ? "default" : "secondary"}>
                          {device.consumption}%
                        </Badge>
                      </CardHeader>
                      <CardContent className="space-y-3">
                        <div>
                          <div className="flex justify-between text-sm mb-1">
                            <span>Power Usage</span>
                            <span>{device.consumption}%</span>
                          </div>
                          <Progress value={device.consumption} className="h-2" />
                        </div>
                        <div>
                          <div className="flex justify-between text-sm mb-1">
                            <span>Efficiency</span>
                            <span>{device.efficiency}%</span>
                          </div>
                          <Progress value={device.efficiency} className="h-2" />
                        </div>
                        <div className="flex justify-between items-center pt-2">
                          <span className="text-xs text-slate-400">Est. Cost/Day</span>
                          <span className="text-sm font-semibold">${(device.consumption * 0.12).toFixed(2)}</span>
                        </div>
                      </CardContent>
                    </Card>
                  )
                })}
              </div>
            </TabsContent>
          </Tabs>

          {/* Quick Actions */}
          <Card className="glass-card">
            <CardHeader>
              <CardTitle className="text-cyan-400">Quick Actions</CardTitle>
              <CardDescription>Optimize your energy usage with one click</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <Button variant="outline" className="h-20 flex-col gap-2">
                  <Moon className="w-6 h-6" />
                  <span className="text-xs">Night Mode</span>
                </Button>
                <Button variant="outline" className="h-20 flex-col gap-2">
                  <Battery className="w-6 h-6" />
                  <span className="text-xs">Eco Mode</span>
                </Button>
                <Button variant="outline" className="h-20 flex-col gap-2">
                  <Clock className="w-6 h-6" />
                  <span className="text-xs">Schedule</span>
                </Button>
                <Button variant="outline" className="h-20 flex-col gap-2">
                  <AlertTriangle className="w-6 h-6" />
                  <span className="text-xs">Alerts</span>
                </Button>
              </div>
            </CardContent>
          </Card>
        </main>
      </div>
    </div>
  )
}
