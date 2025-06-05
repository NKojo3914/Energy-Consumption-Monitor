"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Sidebar } from "@/components/layout/sidebar"
import { Header } from "@/components/layout/header"
import {
  FileText,
  Download,
  Calendar,
  Clock,
  BarChart3,
  TrendingUp,
  Zap,
  DollarSign,
  Leaf,
  Settings,
  Mail,
  Eye,
  Plus,
} from "lucide-react"

const reportTemplates = [
  {
    id: 1,
    name: "Monthly Energy Summary",
    description: "Comprehensive monthly energy usage and cost analysis",
    category: "Usage",
    frequency: "Monthly",
    lastGenerated: "2024-01-15",
    size: "2.4 MB",
    format: "PDF",
    icon: BarChart3,
    color: "text-blue-400",
  },
  {
    id: 2,
    name: "Device Performance Report",
    description: "Individual device efficiency and performance metrics",
    category: "Performance",
    frequency: "Weekly",
    lastGenerated: "2024-01-20",
    size: "1.8 MB",
    format: "Excel",
    icon: Zap,
    color: "text-yellow-400",
  },
  {
    id: 3,
    name: "Cost Analysis Report",
    description: "Detailed breakdown of energy costs and savings opportunities",
    category: "Financial",
    frequency: "Monthly",
    lastGenerated: "2024-01-10",
    size: "3.1 MB",
    format: "PDF",
    icon: DollarSign,
    color: "text-green-400",
  },
  {
    id: 4,
    name: "Environmental Impact Report",
    description: "Carbon footprint analysis and sustainability metrics",
    category: "Environmental",
    frequency: "Quarterly",
    lastGenerated: "2024-01-01",
    size: "2.7 MB",
    format: "PDF",
    icon: Leaf,
    color: "text-emerald-400",
  },
  {
    id: 5,
    name: "Peak Usage Analysis",
    description: "Analysis of peak consumption periods and optimization suggestions",
    category: "Optimization",
    frequency: "Weekly",
    lastGenerated: "2024-01-18",
    size: "1.5 MB",
    format: "Excel",
    icon: TrendingUp,
    color: "text-purple-400",
  },
]

const scheduledReports = [
  {
    id: 1,
    name: "Weekly Energy Digest",
    schedule: "Every Monday at 9:00 AM",
    recipients: ["john.doe@example.com"],
    format: "PDF",
    enabled: true,
    nextRun: "2024-01-22 09:00",
  },
  {
    id: 2,
    name: "Monthly Cost Summary",
    schedule: "1st of every month at 8:00 AM",
    recipients: ["john.doe@example.com", "finance@company.com"],
    format: "Excel",
    enabled: true,
    nextRun: "2024-02-01 08:00",
  },
  {
    id: 3,
    name: "Quarterly Sustainability Report",
    schedule: "Every 3 months on the 1st at 10:00 AM",
    recipients: ["sustainability@company.com"],
    format: "PDF",
    enabled: false,
    nextRun: "2024-04-01 10:00",
  },
]

const recentReports = [
  {
    id: 1,
    name: "January 2024 Energy Summary",
    generatedDate: "2024-01-20 14:30",
    size: "2.4 MB",
    format: "PDF",
    status: "completed",
  },
  {
    id: 2,
    name: "Device Performance - Week 3",
    generatedDate: "2024-01-19 09:15",
    size: "1.8 MB",
    format: "Excel",
    status: "completed",
  },
  {
    id: 3,
    name: "Cost Analysis - January",
    generatedDate: "2024-01-18 16:45",
    size: "3.1 MB",
    format: "PDF",
    status: "completed",
  },
  {
    id: 4,
    name: "Peak Usage Analysis",
    generatedDate: "2024-01-17 11:20",
    size: "1.5 MB",
    format: "Excel",
    status: "processing",
  },
]

export default function ReportsPage() {
  const [selectedCategory, setSelectedCategory] = useState("all")

  const categories = ["all", "usage", "performance", "financial", "environmental", "optimization"]

  const filteredTemplates = reportTemplates.filter(
    (template) => selectedCategory === "all" || template.category.toLowerCase() === selectedCategory,
  )

  return (
    <div className="flex min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      <Sidebar />
      <div className="flex-1 lg:ml-80">
        <Header />
        <main className="p-6 space-y-6">
          {/* Page Header */}
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                Reports & Analytics
              </h1>
              <p className="text-muted-foreground mt-2">Generate detailed reports and schedule automated analytics</p>
            </div>
            <div className="flex items-center gap-4">
              <Button variant="outline" className="gap-2">
                <Calendar className="w-4 h-4" />
                Schedule Report
              </Button>
              <Button className="gap-2 bg-gradient-to-r from-blue-500 to-purple-500">
                <Plus className="w-4 h-4" />
                Create Custom Report
              </Button>
            </div>
          </div>

          {/* Quick Stats */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <Card className="glass-card hover-lift">
              <CardContent className="p-4">
                <div className="flex items-center gap-3">
                  <FileText className="w-5 h-5 text-blue-400" />
                  <div>
                    <div className="text-2xl font-bold">24</div>
                    <div className="text-xs text-muted-foreground">Total Reports</div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="glass-card hover-lift">
              <CardContent className="p-4">
                <div className="flex items-center gap-3">
                  <Clock className="w-5 h-5 text-green-400" />
                  <div>
                    <div className="text-2xl font-bold">3</div>
                    <div className="text-xs text-muted-foreground">Scheduled</div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="glass-card hover-lift">
              <CardContent className="p-4">
                <div className="flex items-center gap-3">
                  <Download className="w-5 h-5 text-purple-400" />
                  <div>
                    <div className="text-2xl font-bold">156</div>
                    <div className="text-xs text-muted-foreground">Downloads</div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="glass-card hover-lift">
              <CardContent className="p-4">
                <div className="flex items-center gap-3">
                  <Mail className="w-5 h-5 text-yellow-400" />
                  <div>
                    <div className="text-2xl font-bold">12</div>
                    <div className="text-xs text-muted-foreground">Auto-sent</div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Main Content */}
          <Tabs defaultValue="templates" className="w-full">
            <TabsList className="grid w-full grid-cols-4">
              <TabsTrigger value="templates">Report Templates</TabsTrigger>
              <TabsTrigger value="scheduled">Scheduled Reports</TabsTrigger>
              <TabsTrigger value="recent">Recent Reports</TabsTrigger>
              <TabsTrigger value="custom">Custom Builder</TabsTrigger>
            </TabsList>

            <TabsContent value="templates" className="space-y-6">
              {/* Category Filter */}
              <div className="flex items-center gap-2">
                <span className="text-sm font-medium">Filter by category:</span>
                <div className="flex gap-2">
                  {categories.map((category) => (
                    <Button
                      key={category}
                      variant={selectedCategory === category ? "default" : "outline"}
                      size="sm"
                      onClick={() => setSelectedCategory(category)}
                      className="capitalize"
                    >
                      {category}
                    </Button>
                  ))}
                </div>
              </div>

              {/* Report Templates Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredTemplates.map((template) => (
                  <Card key={template.id} className="glass-card hover-lift">
                    <CardHeader className="pb-3">
                      <div className="flex items-center gap-3">
                        <div className="p-2 rounded-lg bg-gradient-to-br from-blue-500/20 to-purple-500/20">
                          <template.icon className={`w-5 h-5 ${template.color}`} />
                        </div>
                        <div className="flex-1">
                          <CardTitle className="text-lg">{template.name}</CardTitle>
                          <Badge variant="outline" className="text-xs mt-1">
                            {template.category}
                          </Badge>
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <CardDescription>{template.description}</CardDescription>

                      <div className="space-y-2 text-sm">
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">Frequency:</span>
                          <span>{template.frequency}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">Last Generated:</span>
                          <span>{template.lastGenerated}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">Format:</span>
                          <Badge variant="secondary" className="text-xs">
                            {template.format}
                          </Badge>
                        </div>
                      </div>

                      <div className="flex gap-2 pt-2">
                        <Button size="sm" className="flex-1">
                          <Download className="w-4 h-4 mr-2" />
                          Generate
                        </Button>
                        <Button size="sm" variant="outline">
                          <Eye className="w-4 h-4" />
                        </Button>
                        <Button size="sm" variant="outline">
                          <Settings className="w-4 h-4" />
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>

            <TabsContent value="scheduled" className="space-y-6">
              <Card className="glass-card">
                <CardHeader>
                  <CardTitle>Scheduled Reports</CardTitle>
                  <CardDescription>Manage automated report generation and delivery</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  {scheduledReports.map((report) => (
                    <div
                      key={report.id}
                      className="flex items-center justify-between p-4 border border-white/10 rounded-lg"
                    >
                      <div className="space-y-2">
                        <h4 className="font-medium">{report.name}</h4>
                        <div className="flex items-center gap-4 text-sm text-muted-foreground">
                          <span className="flex items-center gap-1">
                            <Clock className="w-3 h-3" />
                            {report.schedule}
                          </span>
                          <span className="flex items-center gap-1">
                            <Mail className="w-3 h-3" />
                            {report.recipients.length} recipient(s)
                          </span>
                          <Badge variant="outline" className="text-xs">
                            {report.format}
                          </Badge>
                        </div>
                        <div className="text-xs text-muted-foreground">Next run: {report.nextRun}</div>
                      </div>
                      <div className="flex items-center gap-2">
                        <Badge variant={report.enabled ? "default" : "secondary"}>
                          {report.enabled ? "Active" : "Paused"}
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

            <TabsContent value="recent" className="space-y-6">
              <Card className="glass-card">
                <CardHeader>
                  <CardTitle>Recent Reports</CardTitle>
                  <CardDescription>Download and manage recently generated reports</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  {recentReports.map((report) => (
                    <div
                      key={report.id}
                      className="flex items-center justify-between p-4 border border-white/10 rounded-lg"
                    >
                      <div className="flex items-center gap-4">
                        <FileText className="w-5 h-5 text-blue-400" />
                        <div>
                          <h4 className="font-medium">{report.name}</h4>
                          <div className="flex items-center gap-4 text-sm text-muted-foreground">
                            <span>Generated: {report.generatedDate}</span>
                            <span>Size: {report.size}</span>
                            <Badge variant="outline" className="text-xs">
                              {report.format}
                            </Badge>
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <Badge variant={report.status === "completed" ? "default" : "secondary"}>{report.status}</Badge>
                        {report.status === "completed" && (
                          <Button size="sm" variant="outline">
                            <Download className="w-4 h-4" />
                          </Button>
                        )}
                      </div>
                    </div>
                  ))}
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="custom" className="space-y-6">
              <Card className="glass-card">
                <CardHeader>
                  <CardTitle>Custom Report Builder</CardTitle>
                  <CardDescription>Create custom reports with specific metrics and time ranges</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-4">
                      <h4 className="font-medium">Report Configuration</h4>
                      <div className="space-y-3">
                        <div>
                          <label className="text-sm font-medium">Report Name</label>
                          <input
                            type="text"
                            placeholder="Enter report name"
                            className="w-full mt-1 px-3 py-2 bg-white/5 border border-white/10 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                          />
                        </div>
                        <div>
                          <label className="text-sm font-medium">Time Range</label>
                          <select className="w-full mt-1 px-3 py-2 bg-white/5 border border-white/10 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500">
                            <option>Last 7 days</option>
                            <option>Last 30 days</option>
                            <option>Last 3 months</option>
                            <option>Last year</option>
                            <option>Custom range</option>
                          </select>
                        </div>
                        <div>
                          <label className="text-sm font-medium">Format</label>
                          <select className="w-full mt-1 px-3 py-2 bg-white/5 border border-white/10 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500">
                            <option>PDF</option>
                            <option>Excel</option>
                            <option>CSV</option>
                          </select>
                        </div>
                      </div>
                    </div>

                    <div className="space-y-4">
                      <h4 className="font-medium">Metrics to Include</h4>
                      <div className="space-y-2">
                        {[
                          "Energy Consumption",
                          "Cost Analysis",
                          "Device Performance",
                          "Efficiency Metrics",
                          "Environmental Impact",
                          "Peak Usage Patterns",
                          "Comparative Analysis",
                        ].map((metric, index) => (
                          <label key={index} className="flex items-center gap-2">
                            <input type="checkbox" className="rounded" defaultChecked={index < 3} />
                            <span className="text-sm">{metric}</span>
                          </label>
                        ))}
                      </div>
                    </div>
                  </div>

                  <div className="flex gap-4 pt-4">
                    <Button className="gap-2">
                      <FileText className="w-4 h-4" />
                      Generate Report
                    </Button>
                    <Button variant="outline" className="gap-2">
                      <Calendar className="w-4 h-4" />
                      Schedule Report
                    </Button>
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
