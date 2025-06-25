"use client"

import { useState, useEffect } from "react"
import { useAuth } from "@/hooks/use-auth"
import { useRouter } from "next/navigation"
import { Sidebar } from "@/components/layout/sidebar"
import { Header } from "@/components/layout/header"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { TrendingUp, TrendingDown, Calendar, Download, Zap, DollarSign, Leaf, Clock } from "lucide-react"
import {
  Area,
  AreaChart,
  Bar,
  BarChart,
  Line,
  LineChart,
  Pie,
  PieChart,
  Cell,
  CartesianGrid,
  ResponsiveContainer,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
} from "recharts"
import { ChartContainer } from "@/components/ui/chart"

const monthlyData = [
  { month: "Jan", consumption: 450, cost: 67.5, solar: 120, efficiency: 85 },
  { month: "Feb", consumption: 420, cost: 63.0, solar: 140, efficiency: 87 },
  { month: "Mar", consumption: 380, cost: 57.0, solar: 180, efficiency: 89 },
  { month: "Apr", consumption: 340, cost: 51.0, solar: 220, efficiency: 91 },
  { month: "May", consumption: 320, cost: 48.0, solar: 280, efficiency: 93 },
  { month: "Jun", consumption: 380, cost: 57.0, solar: 320, efficiency: 94 },
  { month: "Jul", consumption: 420, cost: 63.0, solar: 340, efficiency: 92 },
  { month: "Aug", consumption: 410, cost: 61.5, solar: 330, efficiency: 91 },
  { month: "Sep", consumption: 360, cost: 54.0, solar: 280, efficiency: 90 },
  { month: "Oct", consumption: 340, cost: 51.0, solar: 220, efficiency: 88 },
  { month: "Nov", consumption: 380, cost: 57.0, solar: 160, efficiency: 86 },
  { month: "Dec", consumption: 430, cost: 64.5, solar: 130, efficiency: 84 },
]

const hourlyPattern = [
  { hour: "00", weekday: 2.1, weekend: 1.8 },
  { hour: "01", weekday: 1.9, weekend: 1.6 },
  { hour: "02", weekday: 1.8, weekend: 1.5 },
  { hour: "03", weekday: 1.7, weekend: 1.4 },
  { hour: "04", weekday: 1.8, weekend: 1.5 },
  { hour: "05", weekday: 2.2, weekend: 1.7 },
  { hour: "06", weekday: 3.5, weekend: 2.1 },
  { hour: "07", weekday: 4.8, weekend: 2.8 },
  { hour: "08", weekday: 5.2, weekend: 3.2 },
  { hour: "09", weekday: 4.1, weekend: 3.8 },
  { hour: "10", weekday: 3.8, weekend: 4.2 },
  { hour: "11", weekday: 4.2, weekend: 4.8 },
  { hour: "12", weekday: 4.8, weekend: 5.2 },
  { hour: "13", weekday: 4.6, weekend: 5.1 },
  { hour: "14", weekday: 4.4, weekend: 4.9 },
  { hour: "15", weekday: 4.2, weekend: 4.6 },
  { hour: "16", weekday: 4.8, weekend: 4.8 },
  { hour: "17", weekday: 5.8, weekend: 5.2 },
  { hour: "18", weekday: 6.8, weekend: 6.1 },
  { hour: "19", weekday: 7.2, weekend: 6.8 },
  { hour: "20", weekday: 6.8, weekend: 6.4 },
  { hour: "21", weekday: 5.8, weekend: 5.6 },
  { hour: "22", weekday: 4.2, weekend: 4.8 },
  { hour: "23", weekday: 3.1, weekend: 3.4 },
]

const deviceBreakdown = [
  { name: "HVAC", value: 45, color: "#06b6d4" },
  { name: "Water Heating", value: 18, color: "#f59e0b" },
  { name: "Lighting", value: 12, color: "#10b981" },
  { name: "Appliances", value: 15, color: "#8b5cf6" },
  { name: "Electronics", value: 10, color: "#ef4444" },
]

const peakDemandData = [
  { time: "6 AM", demand: 3.2, threshold: 8.0 },
  { time: "9 AM", demand: 4.8, threshold: 8.0 },
  { time: "12 PM", demand: 5.8, threshold: 8.0 },
  { time: "3 PM", demand: 6.4, threshold: 8.0 },
  { time: "6 PM", demand: 7.2, threshold: 8.0 },
  { time: "9 PM", demand: 6.1, threshold: 8.0 },
]

export default function Analytics() {
  const { user, loading, initialLoading } = useAuth()
  const router = useRouter()

  const [timeRange, setTimeRange] = useState("12months")
  const [selectedMetric, setSelectedMetric] = useState("consumption")

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-blue-950 to-slate-900">
      <Sidebar />
      <div className="lg:pl-80">
        <Header />
        <main className="p-6 space-y-8">
          {/* Page Header */}
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
            <div>
              <h1 className="text-3xl font-bold bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent">
                Energy Analytics
              </h1>
              <p className="text-slate-400 mt-1">Deep insights into your energy consumption patterns</p>
            </div>
            <div className="flex items-center gap-3">
              <Select value={timeRange} onValueChange={setTimeRange}>
                <SelectTrigger className="w-[140px]">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="7days">Last 7 Days</SelectItem>
                  <SelectItem value="30days">Last 30 Days</SelectItem>
                  <SelectItem value="12months">Last 12 Months</SelectItem>
                  <SelectItem value="custom">Custom Range</SelectItem>
                </SelectContent>
              </Select>
              <Button variant="outline" size="sm">
                <Download className="w-4 h-4 mr-2" />
                Export
              </Button>
            </div>
          </div>

          {/* Key Metrics */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <Card className="glass-card">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium text-slate-300">Total Consumption</CardTitle>
                <Zap className="h-4 w-4 text-yellow-400" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-yellow-400">4,530 kWh</div>
                <div className="flex items-center text-xs text-slate-400 mt-2">
                  <TrendingDown className="h-3 w-3 mr-1 text-green-400" />
                  -8.2% vs last period
                </div>
              </CardContent>
            </Card>

            <Card className="glass-card">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium text-slate-300">Average Cost</CardTitle>
                <DollarSign className="h-4 w-4 text-green-400" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-green-400">$679.50</div>
                <div className="flex items-center text-xs text-slate-400 mt-2">
                  <TrendingDown className="h-3 w-3 mr-1 text-green-400" />
                  -12.3% savings achieved
                </div>
              </CardContent>
            </Card>

            <Card className="glass-card">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium text-slate-300">Solar Generation</CardTitle>
                <Leaf className="h-4 w-4 text-green-400" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-green-400">2,840 kWh</div>
                <div className="flex items-center text-xs text-slate-400 mt-2">
                  <TrendingUp className="h-3 w-3 mr-1 text-green-400" />
                  62.7% self-sufficiency
                </div>
              </CardContent>
            </Card>

            <Card className="glass-card">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium text-slate-300">Peak Demand</CardTitle>
                <Clock className="h-4 w-4 text-red-400" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-red-400">7.2 kW</div>
                <div className="flex items-center text-xs text-slate-400 mt-2">
                  <TrendingUp className="h-3 w-3 mr-1 text-red-400" />
                  At 6:00 PM daily
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Main Analytics Tabs */}
          <Tabs defaultValue="trends" className="space-y-6">
            <TabsList className="grid w-full grid-cols-4 lg:w-[500px]">
              <TabsTrigger value="trends">Trends</TabsTrigger>
              <TabsTrigger value="patterns">Patterns</TabsTrigger>
              <TabsTrigger value="breakdown">Breakdown</TabsTrigger>
              <TabsTrigger value="forecasting">Forecast</TabsTrigger>
            </TabsList>

            <TabsContent value="trends" className="space-y-6">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <Card className="glass-card">
                  <CardHeader>
                    <CardTitle className="text-cyan-400">Monthly Consumption Trend</CardTitle>
                    <CardDescription>12-month energy usage and cost analysis</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <ChartContainer
                      config={{
                        consumption: { label: "Consumption (kWh)", color: "hsl(var(--chart-1))" },
                        cost: { label: "Cost ($)", color: "hsl(var(--chart-2))" },
                      }}
                      className="h-[300px]"
                    >
                      <ResponsiveContainer width="100%" height="100%">
                        <AreaChart data={monthlyData}>
                          <defs>
                            <linearGradient id="consumptionGradient" x1="0" y1="0" x2="0" y2="1">
                              <stop offset="5%" stopColor="#06b6d4" stopOpacity={0.8} />
                              <stop offset="95%" stopColor="#06b6d4" stopOpacity={0.1} />
                            </linearGradient>
                          </defs>
                          <CartesianGrid strokeDasharray="3 3" stroke="#334155" />
                          <XAxis dataKey="month" stroke="#64748b" />
                          <YAxis stroke="#64748b" />
                          <Tooltip
                            contentStyle={{
                              backgroundColor: "rgba(15, 23, 42, 0.9)",
                              border: "1px solid rgba(148, 163, 184, 0.2)",
                              borderRadius: "8px",
                            }}
                          />
                          <Area
                            type="monotone"
                            dataKey="consumption"
                            stroke="#06b6d4"
                            fill="url(#consumptionGradient)"
                            strokeWidth={2}
                          />
                        </AreaChart>
                      </ResponsiveContainer>
                    </ChartContainer>
                  </CardContent>
                </Card>

                <Card className="glass-card">
                  <CardHeader>
                    <CardTitle className="text-cyan-400">Efficiency Score Trend</CardTitle>
                    <CardDescription>Monthly efficiency improvements</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <ChartContainer
                      config={{
                        efficiency: { label: "Efficiency (%)", color: "hsl(var(--chart-3))" },
                      }}
                      className="h-[300px]"
                    >
                      <ResponsiveContainer width="100%" height="100%">
                        <LineChart data={monthlyData}>
                          <CartesianGrid strokeDasharray="3 3" stroke="#334155" />
                          <XAxis dataKey="month" stroke="#64748b" />
                          <YAxis domain={[80, 95]} stroke="#64748b" />
                          <Tooltip
                            contentStyle={{
                              backgroundColor: "rgba(15, 23, 42, 0.9)",
                              border: "1px solid rgba(148, 163, 184, 0.2)",
                              borderRadius: "8px",
                            }}
                          />
                          <Line
                            type="monotone"
                            dataKey="efficiency"
                            stroke="#10b981"
                            strokeWidth={3}
                            dot={{ fill: "#10b981", strokeWidth: 2, r: 4 }}
                          />
                        </LineChart>
                      </ResponsiveContainer>
                    </ChartContainer>
                  </CardContent>
                </Card>
              </div>

              <Card className="glass-card">
                <CardHeader>
                  <CardTitle className="text-cyan-400">Solar vs Grid Consumption</CardTitle>
                  <CardDescription>Energy source breakdown over time</CardDescription>
                </CardHeader>
                <CardContent>
                  <ChartContainer
                    config={{
                      consumption: { label: "Total Consumption", color: "hsl(var(--chart-1))" },
                      solar: { label: "Solar Generation", color: "hsl(var(--chart-2))" },
                    }}
                    className="h-[400px]"
                  >
                    <ResponsiveContainer width="100%" height="100%">
                      <AreaChart data={monthlyData}>
                        <defs>
                          <linearGradient id="solarGradient" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="5%" stopColor="#fbbf24" stopOpacity={0.8} />
                            <stop offset="95%" stopColor="#fbbf24" stopOpacity={0.1} />
                          </linearGradient>
                          <linearGradient id="gridGradient" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="5%" stopColor="#06b6d4" stopOpacity={0.8} />
                            <stop offset="95%" stopColor="#06b6d4" stopOpacity={0.1} />
                          </linearGradient>
                        </defs>
                        <CartesianGrid strokeDasharray="3 3" stroke="#334155" />
                        <XAxis dataKey="month" stroke="#64748b" />
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
                          fill="url(#gridGradient)"
                          name="Grid Consumption"
                        />
                        <Area
                          type="monotone"
                          dataKey="solar"
                          stackId="2"
                          stroke="#fbbf24"
                          fill="url(#solarGradient)"
                          name="Solar Generation"
                        />
                      </AreaChart>
                    </ResponsiveContainer>
                  </ChartContainer>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="patterns" className="space-y-6">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <Card className="glass-card">
                  <CardHeader>
                    <CardTitle className="text-cyan-400">Daily Usage Patterns</CardTitle>
                    <CardDescription>Weekday vs weekend consumption</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <ChartContainer
                      config={{
                        weekday: { label: "Weekday", color: "hsl(var(--chart-1))" },
                        weekend: { label: "Weekend", color: "hsl(var(--chart-2))" },
                      }}
                      className="h-[300px]"
                    >
                      <ResponsiveContainer width="100%" height="100%">
                        <LineChart data={hourlyPattern}>
                          <CartesianGrid strokeDasharray="3 3" stroke="#334155" />
                          <XAxis dataKey="hour" stroke="#64748b" />
                          <YAxis stroke="#64748b" />
                          <Tooltip
                            contentStyle={{
                              backgroundColor: "rgba(15, 23, 42, 0.9)",
                              border: "1px solid rgba(148, 163, 184, 0.2)",
                              borderRadius: "8px",
                            }}
                          />
                          <Legend />
                          <Line type="monotone" dataKey="weekday" stroke="#06b6d4" strokeWidth={2} name="Weekday" />
                          <Line type="monotone" dataKey="weekend" stroke="#10b981" strokeWidth={2} name="Weekend" />
                        </LineChart>
                      </ResponsiveContainer>
                    </ChartContainer>
                  </CardContent>
                </Card>

                <Card className="glass-card">
                  <CardHeader>
                    <CardTitle className="text-cyan-400">Peak Demand Analysis</CardTitle>
                    <CardDescription>Daily peak usage vs threshold</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <ChartContainer
                      config={{
                        demand: { label: "Peak Demand", color: "hsl(var(--chart-1))" },
                        threshold: { label: "Threshold", color: "hsl(var(--chart-4))" },
                      }}
                      className="h-[300px]"
                    >
                      <ResponsiveContainer width="100%" height="100%">
                        <BarChart data={peakDemandData}>
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
                          <Bar dataKey="demand" fill="#06b6d4" name="Peak Demand" radius={[4, 4, 0, 0]} />
                          <Line
                            type="monotone"
                            dataKey="threshold"
                            stroke="#ef4444"
                            strokeWidth={2}
                            strokeDasharray="5 5"
                            name="Demand Threshold"
                          />
                        </BarChart>
                      </ResponsiveContainer>
                    </ChartContainer>
                  </CardContent>
                </Card>
              </div>

              {/* Pattern Insights */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <Card className="glass-card">
                  <CardHeader>
                    <CardTitle className="text-sm font-medium text-slate-300">Peak Hours</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold text-red-400">6-8 PM</div>
                    <p className="text-xs text-slate-400 mt-2">
                      Highest consumption during evening hours when family activities peak
                    </p>
                  </CardContent>
                </Card>

                <Card className="glass-card">
                  <CardHeader>
                    <CardTitle className="text-sm font-medium text-slate-300">Off-Peak Savings</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold text-green-400">23%</div>
                    <p className="text-xs text-slate-400 mt-2">
                      Potential savings by shifting usage to off-peak hours (11 PM - 6 AM)
                    </p>
                  </CardContent>
                </Card>

                <Card className="glass-card">
                  <CardHeader>
                    <CardTitle className="text-sm font-medium text-slate-300">Weekend Difference</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold text-blue-400">+15%</div>
                    <p className="text-xs text-slate-400 mt-2">
                      Weekend consumption is 15% higher due to increased home occupancy
                    </p>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            <TabsContent value="breakdown" className="space-y-6">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <Card className="glass-card">
                  <CardHeader>
                    <CardTitle className="text-cyan-400">Device Energy Breakdown</CardTitle>
                    <CardDescription>Consumption by device category</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <ChartContainer
                      config={{
                        value: { label: "Consumption %", color: "hsl(var(--chart-1))" },
                      }}
                      className="h-[300px]"
                    >
                      <ResponsiveContainer width="100%" height="100%">
                        <PieChart>
                          <Pie
                            data={deviceBreakdown}
                            cx="50%"
                            cy="50%"
                            outerRadius={80}
                            fill="#8884d8"
                            dataKey="value"
                            label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                          >
                            {deviceBreakdown.map((entry, index) => (
                              <Cell key={`cell-${index}`} fill={entry.color} />
                            ))}
                          </Pie>
                          <Tooltip
                            contentStyle={{
                              backgroundColor: "rgba(15, 23, 42, 0.9)",
                              border: "1px solid rgba(148, 163, 184, 0.2)",
                              borderRadius: "8px",
                            }}
                          />
                        </PieChart>
                      </ResponsiveContainer>
                    </ChartContainer>
                  </CardContent>
                </Card>

                <Card className="glass-card">
                  <CardHeader>
                    <CardTitle className="text-cyan-400">Cost Breakdown</CardTitle>
                    <CardDescription>Monthly cost distribution</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    {deviceBreakdown.map((device, index) => {
                      const monthlyCost = (device.value * 2.85).toFixed(2) // Assuming $285 total monthly cost
                      return (
                        <div key={device.name} className="flex items-center justify-between">
                          <div className="flex items-center gap-3">
                            <div className="w-4 h-4 rounded-full" style={{ backgroundColor: device.color }} />
                            <span className="text-sm">{device.name}</span>
                          </div>
                          <div className="text-right">
                            <div className="text-sm font-semibold">${monthlyCost}</div>
                            <div className="text-xs text-slate-400">{device.value}%</div>
                          </div>
                        </div>
                      )
                    })}
                  </CardContent>
                </Card>
              </div>

              {/* Efficiency Recommendations */}
              <Card className="glass-card">
                <CardHeader>
                  <CardTitle className="text-cyan-400">Efficiency Recommendations</CardTitle>
                  <CardDescription>AI-powered suggestions to reduce consumption</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-4">
                      <div className="p-4 rounded-lg bg-blue-500/10 border border-blue-500/20">
                        <div className="flex items-center gap-2 mb-2">
                          <TrendingDown className="w-4 h-4 text-blue-400" />
                          <span className="text-sm font-medium">HVAC Optimization</span>
                          <Badge variant="outline" className="text-xs">
                            -15% potential
                          </Badge>
                        </div>
                        <p className="text-xs text-slate-400">
                          Adjust thermostat by 2°F during peak hours. Estimated savings: $42/month
                        </p>
                      </div>

                      <div className="p-4 rounded-lg bg-green-500/10 border border-green-500/20">
                        <div className="flex items-center gap-2 mb-2">
                          <Leaf className="w-4 h-4 text-green-400" />
                          <span className="text-sm font-medium">Smart Scheduling</span>
                          <Badge variant="outline" className="text-xs">
                            -8% potential
                          </Badge>
                        </div>
                        <p className="text-xs text-slate-400">
                          Schedule water heater and dishwasher during off-peak hours (11 PM - 6 AM)
                        </p>
                      </div>
                    </div>

                    <div className="space-y-4">
                      <div className="p-4 rounded-lg bg-yellow-500/10 border border-yellow-500/20">
                        <div className="flex items-center gap-2 mb-2">
                          <Zap className="w-4 h-4 text-yellow-400" />
                          <span className="text-sm font-medium">LED Upgrade</span>
                          <Badge variant="outline" className="text-xs">
                            -12% lighting
                          </Badge>
                        </div>
                        <p className="text-xs text-slate-400">
                          Replace remaining incandescent bulbs with LED. One-time cost: $120, Monthly savings: $18
                        </p>
                      </div>

                      <div className="p-4 rounded-lg bg-purple-500/10 border border-purple-500/20">
                        <div className="flex items-center gap-2 mb-2">
                          <Clock className="w-4 h-4 text-purple-400" />
                          <span className="text-sm font-medium">Peak Shaving</span>
                          <Badge variant="outline" className="text-xs">
                            -20% demand
                          </Badge>
                        </div>
                        <p className="text-xs text-slate-400">
                          Install battery storage to reduce peak demand charges. ROI: 3.2 years
                        </p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="forecasting" className="space-y-6">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <Card className="glass-card">
                  <CardHeader>
                    <CardTitle className="text-cyan-400">30-Day Forecast</CardTitle>
                    <CardDescription>Predicted consumption based on historical patterns</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="flex justify-between items-center p-3 rounded-lg bg-slate-800/50">
                        <span className="text-sm">Predicted Consumption</span>
                        <span className="text-lg font-semibold text-cyan-400">385 kWh</span>
                      </div>
                      <div className="flex justify-between items-center p-3 rounded-lg bg-slate-800/50">
                        <span className="text-sm">Estimated Cost</span>
                        <span className="text-lg font-semibold text-green-400">$57.75</span>
                      </div>
                      <div className="flex justify-between items-center p-3 rounded-lg bg-slate-800/50">
                        <span className="text-sm">Confidence Level</span>
                        <Badge variant="default">87%</Badge>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card className="glass-card">
                  <CardHeader>
                    <CardTitle className="text-cyan-400">Seasonal Trends</CardTitle>
                    <CardDescription>Expected changes based on weather patterns</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="p-3 rounded-lg bg-blue-500/10 border border-blue-500/20">
                        <div className="flex justify-between items-center mb-1">
                          <span className="text-sm">Winter (Dec-Feb)</span>
                          <span className="text-sm font-semibold">+25%</span>
                        </div>
                        <p className="text-xs text-slate-400">Increased heating demand</p>
                      </div>
                      <div className="p-3 rounded-lg bg-green-500/10 border border-green-500/20">
                        <div className="flex justify-between items-center mb-1">
                          <span className="text-sm">Spring (Mar-May)</span>
                          <span className="text-sm font-semibold">-15%</span>
                        </div>
                        <p className="text-xs text-slate-400">Mild weather, reduced HVAC usage</p>
                      </div>
                      <div className="p-3 rounded-lg bg-red-500/10 border border-red-500/20">
                        <div className="flex justify-between items-center mb-1">
                          <span className="text-sm">Summer (Jun-Aug)</span>
                          <span className="text-sm font-semibold">+18%</span>
                        </div>
                        <p className="text-xs text-slate-400">Peak cooling season</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Predictive Alerts */}
              <Card className="glass-card">
                <CardHeader>
                  <CardTitle className="text-cyan-400">Predictive Alerts</CardTitle>
                  <CardDescription>Upcoming events that may impact your energy usage</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex items-start gap-3 p-4 rounded-lg bg-yellow-500/10 border border-yellow-500/20">
                      <TrendingUp className="w-5 h-5 text-yellow-400 mt-0.5" />
                      <div>
                        <div className="text-sm font-medium">High Usage Alert</div>
                        <div className="text-xs text-slate-400 mt-1">
                          Heat wave predicted next week. Expected 30% increase in cooling costs.
                        </div>
                        <Badge variant="outline" className="mt-2 text-xs">
                          In 5 days
                        </Badge>
                      </div>
                    </div>

                    <div className="flex items-start gap-3 p-4 rounded-lg bg-green-500/10 border border-green-500/20">
                      <TrendingDown className="w-5 h-5 text-green-400 mt-0.5" />
                      <div>
                        <div className="text-sm font-medium">Savings Opportunity</div>
                        <div className="text-xs text-slate-400 mt-1">
                          Mild weather expected. Consider pre-cooling home during off-peak hours.
                        </div>
                        <Badge variant="outline" className="mt-2 text-xs">
                          Tomorrow
                        </Badge>
                      </div>
                    </div>

                    <div className="flex items-start gap-3 p-4 rounded-lg bg-blue-500/10 border border-blue-500/20">
                      <Calendar className="w-5 h-5 text-blue-400 mt-0.5" />
                      <div>
                        <div className="text-sm font-medium">Maintenance Reminder</div>
                        <div className="text-xs text-slate-400 mt-1">
                          HVAC filter replacement due. Clean filters improve efficiency by 5-15%.
                        </div>
                        <Badge variant="outline" className="mt-2 text-xs">
                          Due in 3 days
                        </Badge>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </main>
      </div>
    </div>
  )
}
