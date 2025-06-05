"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"
import { Sidebar } from "@/components/layout/sidebar"
import { Header } from "@/components/layout/header"
import {
  Leaf,
  TrendingUp,
  Target,
  Award,
  Lightbulb,
  Home,
  Zap,
  Thermometer,
  Wind,
  Calendar,
  BarChart3,
} from "lucide-react"
import { LineChart, Line, AreaChart, Area, XAxis, YAxis, CartesianGrid, ResponsiveContainer } from "recharts"

const efficiencyData = [
  { month: "Jan", efficiency: 78, target: 80, savings: 120 },
  { month: "Feb", efficiency: 82, target: 80, savings: 145 },
  { month: "Mar", efficiency: 85, target: 80, savings: 180 },
  { month: "Apr", efficiency: 79, target: 80, savings: 135 },
  { month: "May", efficiency: 88, target: 80, savings: 220 },
  { month: "Jun", efficiency: 91, target: 80, savings: 250 },
]

const deviceEfficiency = [
  { name: "HVAC System", efficiency: 85, potential: 15, color: "#3b82f6" },
  { name: "Water Heater", efficiency: 78, potential: 22, color: "#10b981" },
  { name: "Lighting", efficiency: 92, potential: 8, color: "#f59e0b" },
  { name: "Appliances", efficiency: 73, potential: 27, color: "#ef4444" },
]

const recommendations = [
  {
    id: 1,
    title: "Upgrade HVAC Filters",
    description: "Replace air filters to improve system efficiency by 15%",
    impact: "High",
    savings: "$45/month",
    effort: "Low",
    icon: Wind,
    category: "HVAC",
  },
  {
    id: 2,
    title: "Install Smart Thermostat",
    description: "Programmable thermostat can reduce heating costs by 10-15%",
    impact: "High",
    savings: "$65/month",
    effort: "Medium",
    icon: Thermometer,
    category: "HVAC",
  },
  {
    id: 3,
    title: "LED Light Conversion",
    description: "Replace remaining incandescent bulbs with LED alternatives",
    impact: "Medium",
    savings: "$25/month",
    effort: "Low",
    icon: Lightbulb,
    category: "Lighting",
  },
  {
    id: 4,
    title: "Water Heater Insulation",
    description: "Add insulation blanket to reduce heat loss by 25%",
    impact: "Medium",
    savings: "$30/month",
    effort: "Low",
    icon: Home,
    category: "Water Heating",
  },
]

const carbonFootprint = [
  { month: "Jan", current: 2.4, target: 2.0, reduction: 0.4 },
  { month: "Feb", current: 2.2, target: 2.0, reduction: 0.6 },
  { month: "Mar", current: 2.0, target: 2.0, reduction: 0.8 },
  { month: "Apr", current: 2.3, target: 2.0, reduction: 0.5 },
  { month: "May", current: 1.8, target: 2.0, reduction: 1.0 },
  { month: "Jun", current: 1.6, target: 2.0, reduction: 1.2 },
]

export default function EfficiencyPage() {
  const [selectedTimeframe, setSelectedTimeframe] = useState("6months")
  const [selectedCategory, setSelectedCategory] = useState("all")

  const currentEfficiency = 88
  const targetEfficiency = 80
  const monthlySavings = 250
  const carbonReduction = 1.2

  return (
    <div className="flex min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      <Sidebar />
      <div className="flex-1 lg:ml-80">
        <Header />
        <main className="p-6 space-y-6">
          {/* Page Header */}
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold bg-gradient-to-r from-green-400 to-emerald-400 bg-clip-text text-transparent">
                Energy Efficiency
              </h1>
              <p className="text-muted-foreground mt-2">Optimize your energy usage and reduce environmental impact</p>
            </div>
            <div className="flex items-center gap-4">
              <Button variant="outline" className="gap-2">
                <Calendar className="w-4 h-4" />
                Last 6 Months
              </Button>
              <Button className="gap-2 bg-gradient-to-r from-green-500 to-emerald-500">
                <BarChart3 className="w-4 h-4" />
                Generate Report
              </Button>
            </div>
          </div>

          {/* Key Metrics */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <Card className="glass-card hover-lift">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Current Efficiency</CardTitle>
                <Target className="h-4 w-4 text-green-500" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-green-400">{currentEfficiency}%</div>
                <div className="flex items-center gap-2 mt-2">
                  <Progress value={currentEfficiency} className="flex-1" />
                  <Badge variant="secondary" className="text-xs">
                    +8% vs target
                  </Badge>
                </div>
              </CardContent>
            </Card>

            <Card className="glass-card hover-lift">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Monthly Savings</CardTitle>
                <TrendingUp className="h-4 w-4 text-blue-500" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-blue-400">${monthlySavings}</div>
                <p className="text-xs text-muted-foreground mt-2">
                  <span className="text-green-400">+12%</span> from last month
                </p>
              </CardContent>
            </Card>

            <Card className="glass-card hover-lift">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Carbon Reduction</CardTitle>
                <Leaf className="h-4 w-4 text-emerald-500" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-emerald-400">{carbonReduction} tons</div>
                <p className="text-xs text-muted-foreground mt-2">CO₂ saved this month</p>
              </CardContent>
            </Card>

            <Card className="glass-card hover-lift">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Efficiency Score</CardTitle>
                <Award className="h-4 w-4 text-yellow-500" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-yellow-400">A+</div>
                <p className="text-xs text-muted-foreground mt-2">Top 5% in your area</p>
              </CardContent>
            </Card>
          </div>

          {/* Charts Section */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Efficiency Trend */}
            <Card className="glass-card hover-lift">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <TrendingUp className="w-5 h-5 text-green-500" />
                  Efficiency Trend
                </CardTitle>
                <CardDescription>Monthly efficiency performance vs targets</CardDescription>
              </CardHeader>
              <CardContent>
                <ChartContainer
                  config={{
                    efficiency: { label: "Efficiency", color: "#10b981" },
                    target: { label: "Target", color: "#6b7280" },
                  }}
                  className="h-[300px]"
                >
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={efficiencyData}>
                      <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                      <XAxis dataKey="month" stroke="#9ca3af" />
                      <YAxis stroke="#9ca3af" />
                      <ChartTooltip content={<ChartTooltipContent />} />
                      <Line
                        type="monotone"
                        dataKey="efficiency"
                        stroke="#10b981"
                        strokeWidth={3}
                        dot={{ fill: "#10b981", strokeWidth: 2, r: 4 }}
                      />
                      <Line
                        type="monotone"
                        dataKey="target"
                        stroke="#6b7280"
                        strokeWidth={2}
                        strokeDasharray="5 5"
                        dot={{ fill: "#6b7280", strokeWidth: 2, r: 3 }}
                      />
                    </LineChart>
                  </ResponsiveContainer>
                </ChartContainer>
              </CardContent>
            </Card>

            {/* Carbon Footprint */}
            <Card className="glass-card hover-lift">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Leaf className="w-5 h-5 text-emerald-500" />
                  Carbon Footprint
                </CardTitle>
                <CardDescription>Monthly CO₂ emissions and reduction progress</CardDescription>
              </CardHeader>
              <CardContent>
                <ChartContainer
                  config={{
                    current: { label: "Current", color: "#ef4444" },
                    target: { label: "Target", color: "#10b981" },
                  }}
                  className="h-[300px]"
                >
                  <ResponsiveContainer width="100%" height="100%">
                    <AreaChart data={carbonFootprint}>
                      <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                      <XAxis dataKey="month" stroke="#9ca3af" />
                      <YAxis stroke="#9ca3af" />
                      <ChartTooltip content={<ChartTooltipContent />} />
                      <Area
                        type="monotone"
                        dataKey="current"
                        stackId="1"
                        stroke="#ef4444"
                        fill="#ef4444"
                        fillOpacity={0.3}
                      />
                      <Area
                        type="monotone"
                        dataKey="target"
                        stackId="2"
                        stroke="#10b981"
                        fill="#10b981"
                        fillOpacity={0.3}
                      />
                    </AreaChart>
                  </ResponsiveContainer>
                </ChartContainer>
              </CardContent>
            </Card>
          </div>

          {/* Device Efficiency */}
          <Card className="glass-card hover-lift">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Zap className="w-5 h-5 text-blue-500" />
                Device Efficiency Analysis
              </CardTitle>
              <CardDescription>Current efficiency and improvement potential by device category</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                {deviceEfficiency.map((device, index) => (
                  <div key={index} className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="font-medium">{device.name}</span>
                      <div className="flex items-center gap-4">
                        <span className="text-sm text-muted-foreground">{device.efficiency}% efficient</span>
                        <Badge variant="outline" className="text-xs">
                          +{device.potential}% potential
                        </Badge>
                      </div>
                    </div>
                    <div className="flex gap-2">
                      <Progress value={device.efficiency} className="flex-1" />
                      <Progress value={device.potential} className="flex-1 opacity-50" />
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* AI Recommendations */}
          <Card className="glass-card hover-lift">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Lightbulb className="w-5 h-5 text-yellow-500" />
                AI-Powered Recommendations
              </CardTitle>
              <CardDescription>Personalized suggestions to improve your energy efficiency</CardDescription>
            </CardHeader>
            <CardContent>
              <Tabs defaultValue="all" className="w-full">
                <TabsList className="grid w-full grid-cols-4">
                  <TabsTrigger value="all">All</TabsTrigger>
                  <TabsTrigger value="hvac">HVAC</TabsTrigger>
                  <TabsTrigger value="lighting">Lighting</TabsTrigger>
                  <TabsTrigger value="water">Water</TabsTrigger>
                </TabsList>
                <TabsContent value="all" className="space-y-4 mt-6">
                  {recommendations.map((rec) => (
                    <div
                      key={rec.id}
                      className="flex items-start gap-4 p-4 rounded-lg border border-white/10 hover:border-white/20 transition-colors"
                    >
                      <div className="p-2 rounded-lg bg-gradient-to-br from-blue-500/20 to-purple-500/20">
                        <rec.icon className="w-5 h-5 text-blue-400" />
                      </div>
                      <div className="flex-1 space-y-2">
                        <div className="flex items-center justify-between">
                          <h4 className="font-medium">{rec.title}</h4>
                          <div className="flex items-center gap-2">
                            <Badge variant={rec.impact === "High" ? "default" : "secondary"} className="text-xs">
                              {rec.impact} Impact
                            </Badge>
                            <Badge variant="outline" className="text-xs">
                              {rec.effort} Effort
                            </Badge>
                          </div>
                        </div>
                        <p className="text-sm text-muted-foreground">{rec.description}</p>
                        <div className="flex items-center justify-between">
                          <span className="text-sm font-medium text-green-400">{rec.savings}</span>
                          <Button size="sm" variant="outline">
                            Learn More
                          </Button>
                        </div>
                      </div>
                    </div>
                  ))}
                </TabsContent>
              </Tabs>
            </CardContent>
          </Card>
        </main>
      </div>
    </div>
  )
}
