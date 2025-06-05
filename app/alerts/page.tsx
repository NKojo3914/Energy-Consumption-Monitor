"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Sidebar } from "@/components/layout/sidebar"
import { Header } from "@/components/layout/header"
import {
  Bell,
  AlertTriangle,
  Info,
  CheckCircle,
  Settings,
  Filter,
  Search,
  Clock,
  Thermometer,
  DollarSign,
  Shield,
} from "lucide-react"

const alerts = [
  {
    id: 1,
    type: "critical",
    title: "High Energy Consumption Detected",
    description: "Your energy usage is 45% above normal for this time of day",
    timestamp: "2 minutes ago",
    device: "HVAC System",
    value: "8.5 kW",
    threshold: "6.0 kW",
    icon: AlertTriangle,
    color: "text-red-400",
    bgColor: "bg-red-500/10",
    borderColor: "border-red-500/30",
  },
  {
    id: 2,
    type: "warning",
    title: "Unusual Device Activity",
    description: "Water heater has been running continuously for 3 hours",
    timestamp: "15 minutes ago",
    device: "Water Heater",
    value: "2.8 kW",
    threshold: "2.0 kW",
    icon: Thermometer,
    color: "text-yellow-400",
    bgColor: "bg-yellow-500/10",
    borderColor: "border-yellow-500/30",
  },
  {
    id: 3,
    type: "info",
    title: "Peak Rate Period Starting",
    description: "Electricity rates will increase by 40% in the next hour",
    timestamp: "30 minutes ago",
    device: "Grid Connection",
    value: "$0.28/kWh",
    threshold: "$0.20/kWh",
    icon: DollarSign,
    color: "text-blue-400",
    bgColor: "bg-blue-500/10",
    borderColor: "border-blue-500/30",
  },
  {
    id: 4,
    type: "success",
    title: "Efficiency Target Achieved",
    description: "Monthly energy efficiency goal reached 5 days early",
    timestamp: "1 hour ago",
    device: "Overall System",
    value: "88%",
    threshold: "85%",
    icon: CheckCircle,
    color: "text-green-400",
    bgColor: "bg-green-500/10",
    borderColor: "border-green-500/30",
  },
  {
    id: 5,
    type: "warning",
    title: "Device Maintenance Due",
    description: "HVAC filter replacement recommended based on usage patterns",
    timestamp: "2 hours ago",
    device: "HVAC System",
    value: "90 days",
    threshold: "60 days",
    icon: Settings,
    color: "text-orange-400",
    bgColor: "bg-orange-500/10",
    borderColor: "border-orange-500/30",
  },
]

const alertRules = [
  {
    id: 1,
    name: "High Consumption Alert",
    description: "Trigger when usage exceeds 150% of average",
    enabled: true,
    threshold: "6.0 kW",
    device: "All Devices",
    frequency: "Immediate",
  },
  {
    id: 2,
    name: "Cost Threshold Alert",
    description: "Alert when daily cost exceeds budget",
    enabled: true,
    threshold: "$25.00",
    device: "Grid Connection",
    frequency: "Daily",
  },
  {
    id: 3,
    name: "Device Offline Alert",
    description: "Notify when devices go offline",
    enabled: false,
    threshold: "5 minutes",
    device: "Smart Devices",
    frequency: "Immediate",
  },
  {
    id: 4,
    name: "Efficiency Drop Alert",
    description: "Alert when efficiency drops below target",
    enabled: true,
    threshold: "80%",
    device: "Overall System",
    frequency: "Weekly",
  },
]

export default function AlertsPage() {
  const [selectedFilter, setSelectedFilter] = useState("all")
  const [searchTerm, setSearchTerm] = useState("")

  const filteredAlerts = alerts.filter((alert) => {
    const matchesFilter = selectedFilter === "all" || alert.type === selectedFilter
    const matchesSearch =
      alert.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      alert.description.toLowerCase().includes(searchTerm.toLowerCase())
    return matchesFilter && matchesSearch
  })

  const alertCounts = {
    all: alerts.length,
    critical: alerts.filter((a) => a.type === "critical").length,
    warning: alerts.filter((a) => a.type === "warning").length,
    info: alerts.filter((a) => a.type === "info").length,
    success: alerts.filter((a) => a.type === "success").length,
  }

  return (
    <div className="flex min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      <Sidebar />
      <div className="flex-1 lg:ml-80">
        <Header />
        <main className="p-6 space-y-6">
          {/* Page Header */}
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold bg-gradient-to-r from-red-400 to-orange-400 bg-clip-text text-transparent">
                Alerts & Notifications
              </h1>
              <p className="text-muted-foreground mt-2">Monitor system alerts and manage notification preferences</p>
            </div>
            <div className="flex items-center gap-4">
              <Button variant="outline" className="gap-2">
                <Filter className="w-4 h-4" />
                Filter
              </Button>
              <Button className="gap-2 bg-gradient-to-r from-red-500 to-orange-500">
                <Settings className="w-4 h-4" />
                Alert Settings
              </Button>
            </div>
          </div>

          {/* Alert Summary */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
            <Card className="glass-card hover-lift">
              <CardContent className="p-4">
                <div className="flex items-center gap-3">
                  <Bell className="w-5 h-5 text-blue-400" />
                  <div>
                    <div className="text-2xl font-bold">{alertCounts.all}</div>
                    <div className="text-xs text-muted-foreground">Total Alerts</div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="glass-card hover-lift">
              <CardContent className="p-4">
                <div className="flex items-center gap-3">
                  <AlertTriangle className="w-5 h-5 text-red-400" />
                  <div>
                    <div className="text-2xl font-bold text-red-400">{alertCounts.critical}</div>
                    <div className="text-xs text-muted-foreground">Critical</div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="glass-card hover-lift">
              <CardContent className="p-4">
                <div className="flex items-center gap-3">
                  <Shield className="w-5 h-5 text-yellow-400" />
                  <div>
                    <div className="text-2xl font-bold text-yellow-400">{alertCounts.warning}</div>
                    <div className="text-xs text-muted-foreground">Warnings</div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="glass-card hover-lift">
              <CardContent className="p-4">
                <div className="flex items-center gap-3">
                  <Info className="w-5 h-5 text-blue-400" />
                  <div>
                    <div className="text-2xl font-bold text-blue-400">{alertCounts.info}</div>
                    <div className="text-xs text-muted-foreground">Info</div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="glass-card hover-lift">
              <CardContent className="p-4">
                <div className="flex items-center gap-3">
                  <CheckCircle className="w-5 h-5 text-green-400" />
                  <div>
                    <div className="text-2xl font-bold text-green-400">{alertCounts.success}</div>
                    <div className="text-xs text-muted-foreground">Success</div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Main Content */}
          <Tabs defaultValue="alerts" className="w-full">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="alerts">Active Alerts</TabsTrigger>
              <TabsTrigger value="rules">Alert Rules</TabsTrigger>
              <TabsTrigger value="settings">Notification Settings</TabsTrigger>
            </TabsList>

            <TabsContent value="alerts" className="space-y-6">
              {/* Filter Bar */}
              <div className="flex items-center gap-4">
                <div className="flex items-center gap-2">
                  <Search className="w-4 h-4 text-muted-foreground" />
                  <input
                    type="text"
                    placeholder="Search alerts..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="px-3 py-2 bg-white/5 border border-white/10 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <div className="flex gap-2">
                  {["all", "critical", "warning", "info", "success"].map((filter) => (
                    <Button
                      key={filter}
                      variant={selectedFilter === filter ? "default" : "outline"}
                      size="sm"
                      onClick={() => setSelectedFilter(filter)}
                      className="capitalize"
                    >
                      {filter} ({alertCounts[filter as keyof typeof alertCounts]})
                    </Button>
                  ))}
                </div>
              </div>

              {/* Alerts List */}
              <div className="space-y-4">
                {filteredAlerts.map((alert) => (
                  <Card key={alert.id} className={`glass-card hover-lift border ${alert.borderColor}`}>
                    <CardContent className="p-6">
                      <div className="flex items-start gap-4">
                        <div className={`p-3 rounded-lg ${alert.bgColor}`}>
                          <alert.icon className={`w-6 h-6 ${alert.color}`} />
                        </div>
                        <div className="flex-1 space-y-2">
                          <div className="flex items-center justify-between">
                            <h3 className="font-semibold text-lg">{alert.title}</h3>
                            <div className="flex items-center gap-2">
                              <Badge
                                variant={alert.type === "critical" ? "destructive" : "secondary"}
                                className="capitalize"
                              >
                                {alert.type}
                              </Badge>
                              <span className="text-xs text-muted-foreground flex items-center gap-1">
                                <Clock className="w-3 h-3" />
                                {alert.timestamp}
                              </span>
                            </div>
                          </div>
                          <p className="text-muted-foreground">{alert.description}</p>
                          <div className="flex items-center justify-between">
                            <div className="flex items-center gap-4 text-sm">
                              <span>
                                <strong>Device:</strong> {alert.device}
                              </span>
                              <span>
                                <strong>Current:</strong> {alert.value}
                              </span>
                              <span>
                                <strong>Threshold:</strong> {alert.threshold}
                              </span>
                            </div>
                            <div className="flex gap-2">
                              <Button size="sm" variant="outline">
                                Dismiss
                              </Button>
                              <Button size="sm">View Details</Button>
                            </div>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>

            <TabsContent value="rules" className="space-y-6">
              <Card className="glass-card">
                <CardHeader>
                  <CardTitle>Alert Rules Configuration</CardTitle>
                  <CardDescription>Customize when and how you receive alerts</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  {alertRules.map((rule) => (
                    <div
                      key={rule.id}
                      className="flex items-center justify-between p-4 border border-white/10 rounded-lg"
                    >
                      <div className="space-y-1">
                        <h4 className="font-medium">{rule.name}</h4>
                        <p className="text-sm text-muted-foreground">{rule.description}</p>
                        <div className="flex items-center gap-4 text-xs text-muted-foreground">
                          <span>Threshold: {rule.threshold}</span>
                          <span>Device: {rule.device}</span>
                          <span>Frequency: {rule.frequency}</span>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <Badge variant={rule.enabled ? "default" : "secondary"}>
                          {rule.enabled ? "Enabled" : "Disabled"}
                        </Badge>
                        <Button size="sm" variant="outline">
                          Edit
                        </Button>
                      </div>
                    </div>
                  ))}
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="settings" className="space-y-6">
              <Card className="glass-card">
                <CardHeader>
                  <CardTitle>Notification Preferences</CardTitle>
                  <CardDescription>Configure how you want to receive notifications</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="space-y-4">
                    <h4 className="font-medium">Notification Channels</h4>
                    <div className="space-y-3">
                      {[
                        { name: "Email Notifications", enabled: true },
                        { name: "SMS Alerts", enabled: false },
                        { name: "Push Notifications", enabled: true },
                        { name: "In-App Notifications", enabled: true },
                      ].map((channel, index) => (
                        <div key={index} className="flex items-center justify-between">
                          <span>{channel.name}</span>
                          <Badge variant={channel.enabled ? "default" : "secondary"}>
                            {channel.enabled ? "Enabled" : "Disabled"}
                          </Badge>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="space-y-4">
                    <h4 className="font-medium">Alert Frequency</h4>
                    <div className="space-y-3">
                      {[
                        { type: "Critical Alerts", frequency: "Immediate" },
                        { type: "Warning Alerts", frequency: "Every 15 minutes" },
                        { type: "Info Alerts", frequency: "Hourly digest" },
                        { type: "Success Alerts", frequency: "Daily summary" },
                      ].map((setting, index) => (
                        <div key={index} className="flex items-center justify-between">
                          <span>{setting.type}</span>
                          <Badge variant="outline">{setting.frequency}</Badge>
                        </div>
                      ))}
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
