"use client"

import type React from "react"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Sidebar } from "@/components/layout/sidebar"
import { Header } from "@/components/layout/header"
import { Switch } from "@/components/ui/switch"
import { toast } from "@/components/ui/use-toast"
import { Toaster } from "@/components/ui/toaster"
import {
  User,
  Bell,
  Palette,
  Shield,
  Database,
  Zap,
  Moon,
  Sun,
  Trash2,
  Download,
  Upload,
  Eye,
  EyeOff,
  Check,
  Loader2,
} from "lucide-react"

export default function SettingsPage() {
  // State management for all settings
  const [darkMode, setDarkMode] = useState(true)
  const [notifications, setNotifications] = useState({
    email: true,
    push: true,
    sms: false,
    alerts: true,
  })
  const [alertTypes, setAlertTypes] = useState({
    critical: true,
    highUsage: true,
    cost: true,
    maintenance: false,
    efficiency: true,
    weekly: false,
  })
  const [displayOptions, setDisplayOptions] = useState({
    compact: false,
    animations: true,
    highContrast: false,
  })
  const [deviceSettings, setDeviceSettings] = useState({
    realtime: true,
    historical: true,
    health: true,
    discovery: false,
  })
  const [privacySettings, setPrivacySettings] = useState({
    dataSharing: false,
    analytics: true,
    marketing: false,
  })
  const [showPassword, setShowPassword] = useState(false)
  const [colorScheme, setColorScheme] = useState("purple")
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isExporting, setIsExporting] = useState(false)
  const [isImporting, setIsImporting] = useState(false)
  const [isDeleting, setIsDeleting] = useState(false)

  // Form data
  const [profileForm, setProfileForm] = useState({
    firstName: "John",
    lastName: "Doe",
    email: "john.doe@example.com",
    phone: "+1 (555) 123-4567",
    timezone: "Eastern Time (ET)",
    language: "English",
  })

  const [passwordForm, setPasswordForm] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  })

  // Handle profile form changes
  const handleProfileChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setProfileForm((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  // Handle password form changes
  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setPasswordForm((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  // Toggle notification settings
  const toggleNotification = (key: keyof typeof notifications) => {
    setNotifications((prev) => ({
      ...prev,
      [key]: !prev[key],
    }))
    toast({
      title: "Notification setting updated",
      description: `${key} notifications ${notifications[key] ? "disabled" : "enabled"}`,
    })
  }

  // Toggle alert types
  const toggleAlertType = (key: keyof typeof alertTypes) => {
    setAlertTypes((prev) => ({
      ...prev,
      [key]: !prev[key],
    }))
    toast({
      title: "Alert setting updated",
      description: `${key} alerts ${alertTypes[key] ? "disabled" : "enabled"}`,
    })
  }

  // Toggle display options
  const toggleDisplayOption = (key: keyof typeof displayOptions) => {
    setDisplayOptions((prev) => ({
      ...prev,
      [key]: !prev[key],
    }))
    toast({
      title: "Display setting updated",
      description: `${key} mode ${displayOptions[key] ? "disabled" : "enabled"}`,
    })
  }

  // Toggle device settings
  const toggleDeviceSetting = (key: keyof typeof deviceSettings) => {
    setDeviceSettings((prev) => ({
      ...prev,
      [key]: !prev[key],
    }))
    toast({
      title: "Device setting updated",
      description: `${key} ${deviceSettings[key] ? "disabled" : "enabled"}`,
    })
  }

  // Toggle privacy settings
  const togglePrivacySetting = (key: keyof typeof privacySettings) => {
    setPrivacySettings((prev) => ({
      ...prev,
      [key]: !prev[key],
    }))
    toast({
      title: "Privacy setting updated",
      description: `${key} ${privacySettings[key] ? "disabled" : "enabled"}`,
    })
  }

  // Handle dark mode toggle
  const handleDarkModeToggle = () => {
    setDarkMode(!darkMode)
    toast({
      title: "Theme updated",
      description: `Dark mode ${darkMode ? "disabled" : "enabled"}`,
    })
  }

  // Handle color scheme selection
  const handleColorSchemeChange = (scheme: string) => {
    setColorScheme(scheme)
    toast({
      title: "Color scheme updated",
      description: `${scheme} theme applied`,
    })
  }

  // Handle profile form submission
  const handleProfileSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    // Simulate API call
    setTimeout(() => {
      setIsSubmitting(false)
      toast({
        title: "Profile updated",
        description: "Your profile information has been saved",
      })
    }, 1000)
  }

  // Handle password form submission
  const handlePasswordSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    if (passwordForm.newPassword !== passwordForm.confirmPassword) {
      toast({
        title: "Error",
        description: "New passwords do not match",
        variant: "destructive",
      })
      return
    }

    setIsSubmitting(true)

    // Simulate API call
    setTimeout(() => {
      setIsSubmitting(false)
      setPasswordForm({
        currentPassword: "",
        newPassword: "",
        confirmPassword: "",
      })
      toast({
        title: "Password updated",
        description: "Your password has been changed successfully",
      })
    }, 1000)
  }

  // Handle data export
  const handleExportData = () => {
    setIsExporting(true)

    // Simulate export process
    setTimeout(() => {
      setIsExporting(false)
      toast({
        title: "Data exported",
        description: "Your data has been exported successfully",
      })
    }, 1500)
  }

  // Handle data import
  const handleImportData = () => {
    setIsImporting(true)

    // Simulate import process
    setTimeout(() => {
      setIsImporting(false)
      toast({
        title: "Data imported",
        description: "Your data has been imported successfully",
      })
    }, 1500)
  }

  // Handle account deletion
  const handleDeleteAccount = () => {
    setIsDeleting(true)

    // Simulate deletion process
    setTimeout(() => {
      setIsDeleting(false)
      toast({
        title: "Account deleted",
        description: "Your account has been deleted successfully",
        variant: "destructive",
      })
    }, 2000)
  }

  // Handle 2FA enablement
  const handleEnable2FA = () => {
    toast({
      title: "2FA setup initiated",
      description: "Follow the instructions sent to your email to complete setup",
    })
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
              <h1 className="text-3xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
                Settings
              </h1>
              <p className="text-muted-foreground mt-2">Manage your account preferences and system configuration</p>
            </div>
            <Button
              className="gap-2 bg-gradient-to-r from-purple-500 to-pink-500"
              onClick={handleExportData}
              disabled={isExporting}
            >
              {isExporting ? <Loader2 className="w-4 h-4 animate-spin" /> : <Download className="w-4 h-4" />}
              {isExporting ? "Exporting..." : "Export Settings"}
            </Button>
          </div>

          {/* Settings Tabs */}
          <Tabs defaultValue="profile" className="w-full">
            <TabsList className="grid w-full grid-cols-6">
              <TabsTrigger value="profile">Profile</TabsTrigger>
              <TabsTrigger value="notifications">Notifications</TabsTrigger>
              <TabsTrigger value="appearance">Appearance</TabsTrigger>
              <TabsTrigger value="devices">Devices</TabsTrigger>
              <TabsTrigger value="security">Security</TabsTrigger>
              <TabsTrigger value="data">Data</TabsTrigger>
            </TabsList>

            {/* Profile Settings */}
            <TabsContent value="profile" className="space-y-6">
              <Card className="hover:shadow-lg transition-all duration-300">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <User className="w-5 h-5 text-blue-400" />
                    Profile Information
                  </CardTitle>
                  <CardDescription>Update your personal information and preferences</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <form onSubmit={handleProfileSubmit} className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-4">
                        <div>
                          <label className="text-sm font-medium">First Name</label>
                          <input
                            type="text"
                            name="firstName"
                            value={profileForm.firstName}
                            onChange={handleProfileChange}
                            className="w-full mt-1 px-3 py-2 bg-white/5 border border-white/10 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                          />
                        </div>
                        <div>
                          <label className="text-sm font-medium">Last Name</label>
                          <input
                            type="text"
                            name="lastName"
                            value={profileForm.lastName}
                            onChange={handleProfileChange}
                            className="w-full mt-1 px-3 py-2 bg-white/5 border border-white/10 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                          />
                        </div>
                        <div>
                          <label className="text-sm font-medium">Email Address</label>
                          <input
                            type="email"
                            name="email"
                            value={profileForm.email}
                            onChange={handleProfileChange}
                            className="w-full mt-1 px-3 py-2 bg-white/5 border border-white/10 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                          />
                        </div>
                      </div>
                      <div className="space-y-4">
                        <div>
                          <label className="text-sm font-medium">Phone Number</label>
                          <input
                            type="tel"
                            name="phone"
                            value={profileForm.phone}
                            onChange={handleProfileChange}
                            className="w-full mt-1 px-3 py-2 bg-white/5 border border-white/10 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                          />
                        </div>
                        <div>
                          <label className="text-sm font-medium">Time Zone</label>
                          <select
                            name="timezone"
                            value={profileForm.timezone}
                            onChange={handleProfileChange}
                            className="w-full mt-1 px-3 py-2 bg-white/5 border border-white/10 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                          >
                            <option>Eastern Time (ET)</option>
                            <option>Central Time (CT)</option>
                            <option>Mountain Time (MT)</option>
                            <option>Pacific Time (PT)</option>
                          </select>
                        </div>
                        <div>
                          <label className="text-sm font-medium">Language</label>
                          <select
                            name="language"
                            value={profileForm.language}
                            onChange={handleProfileChange}
                            className="w-full mt-1 px-3 py-2 bg-white/5 border border-white/10 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                          >
                            <option>English</option>
                            <option>Spanish</option>
                            <option>French</option>
                            <option>German</option>
                          </select>
                        </div>
                      </div>
                    </div>
                    <div className="flex gap-4">
                      <Button type="submit" disabled={isSubmitting}>
                        {isSubmitting ? (
                          <>
                            <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                            Saving...
                          </>
                        ) : (
                          "Save Changes"
                        )}
                      </Button>
                      <Button type="button" variant="outline">
                        Cancel
                      </Button>
                    </div>
                  </form>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Notification Settings */}
            <TabsContent value="notifications" className="space-y-6">
              <Card className="hover:shadow-lg transition-all duration-300">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Bell className="w-5 h-5 text-yellow-400" />
                    Notification Preferences
                  </CardTitle>
                  <CardDescription>Configure how and when you receive notifications</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="space-y-4">
                    <h4 className="font-medium">Notification Channels</h4>
                    <div className="space-y-3">
                      {[
                        { key: "email", label: "Email Notifications", description: "Receive notifications via email" },
                        {
                          key: "push",
                          label: "Push Notifications",
                          description: "Browser and mobile push notifications",
                        },
                        {
                          key: "sms",
                          label: "SMS Alerts",
                          description: "Text message notifications for critical alerts",
                        },
                        {
                          key: "alerts",
                          label: "In-App Alerts",
                          description: "Show notifications within the application",
                        },
                      ].map((item) => (
                        <div
                          key={item.key}
                          className="flex items-center justify-between p-3 border border-white/10 rounded-lg hover:border-white/20 transition-colors"
                        >
                          <div>
                            <div className="font-medium">{item.label}</div>
                            <div className="text-sm text-muted-foreground">{item.description}</div>
                          </div>
                          <Switch
                            checked={notifications[item.key as keyof typeof notifications]}
                            onCheckedChange={() => toggleNotification(item.key as keyof typeof notifications)}
                          />
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="space-y-4">
                    <h4 className="font-medium">Alert Types</h4>
                    <div className="space-y-3">
                      {[
                        { key: "critical", label: "Critical Alerts", description: "System failures and urgent issues" },
                        {
                          key: "highUsage",
                          label: "High Usage Warnings",
                          description: "When consumption exceeds thresholds",
                        },
                        { key: "cost", label: "Cost Alerts", description: "Budget and billing notifications" },
                        {
                          key: "maintenance",
                          label: "Maintenance Reminders",
                          description: "Device maintenance and updates",
                        },
                        { key: "efficiency", label: "Efficiency Tips", description: "Energy saving recommendations" },
                        { key: "weekly", label: "Weekly Reports", description: "Automated weekly summaries" },
                      ].map((alert) => (
                        <div
                          key={alert.key}
                          className="flex items-center justify-between p-3 border border-white/10 rounded-lg hover:border-white/20 transition-colors"
                        >
                          <div>
                            <div className="font-medium">{alert.label}</div>
                            <div className="text-sm text-muted-foreground">{alert.description}</div>
                          </div>
                          <Switch
                            checked={alertTypes[alert.key as keyof typeof alertTypes]}
                            onCheckedChange={() => toggleAlertType(alert.key as keyof typeof alertTypes)}
                          />
                        </div>
                      ))}
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Appearance Settings */}
            <TabsContent value="appearance" className="space-y-6">
              <Card className="hover:shadow-lg transition-all duration-300">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Palette className="w-5 h-5 text-purple-400" />
                    Appearance & Theme
                  </CardTitle>
                  <CardDescription>Customize the look and feel of your dashboard</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="space-y-4">
                    <h4 className="font-medium">Theme Settings</h4>
                    <div className="flex items-center justify-between p-3 border border-white/10 rounded-lg hover:border-white/20 transition-colors">
                      <div className="flex items-center gap-3">
                        {darkMode ? (
                          <Moon className="w-5 h-5 text-blue-400" />
                        ) : (
                          <Sun className="w-5 h-5 text-yellow-400" />
                        )}
                        <div>
                          <div className="font-medium">Dark Mode</div>
                          <div className="text-sm text-muted-foreground">Use dark theme for better visibility</div>
                        </div>
                      </div>
                      <Switch checked={darkMode} onCheckedChange={handleDarkModeToggle} />
                    </div>
                  </div>

                  <div className="space-y-4">
                    <h4 className="font-medium">Color Scheme</h4>
                    <div className="grid grid-cols-3 gap-4">
                      {[
                        { name: "Blue", colors: ["#3b82f6", "#1e40af", "#1d4ed8"] },
                        { name: "Purple", colors: ["#8b5cf6", "#7c3aed", "#6d28d9"] },
                        { name: "Green", colors: ["#10b981", "#059669", "#047857"] },
                      ].map((scheme) => (
                        <div
                          key={scheme.name}
                          className={`p-3 border rounded-lg cursor-pointer transition-all duration-300 ${
                            colorScheme === scheme.name.toLowerCase()
                              ? "border-white/40 ring-2 ring-white/20"
                              : "border-white/10 hover:border-white/20"
                          }`}
                          onClick={() => handleColorSchemeChange(scheme.name.toLowerCase())}
                        >
                          <div className="flex gap-2 mb-2">
                            {scheme.colors.map((color, index) => (
                              <div key={index} className="w-6 h-6 rounded-full" style={{ backgroundColor: color }} />
                            ))}
                          </div>
                          <div className="text-sm font-medium flex items-center justify-between">
                            {scheme.name}
                            {colorScheme === scheme.name.toLowerCase() && <Check className="w-4 h-4 text-green-400" />}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="space-y-4">
                    <h4 className="font-medium">Display Options</h4>
                    <div className="space-y-3">
                      {[
                        { key: "compact", label: "Compact Mode", description: "Reduce spacing and padding" },
                        {
                          key: "animations",
                          label: "Animations",
                          description: "Enable smooth transitions and effects",
                        },
                        {
                          key: "highContrast",
                          label: "High Contrast",
                          description: "Increase contrast for better accessibility",
                        },
                      ].map((item) => (
                        <div
                          key={item.key}
                          className="flex items-center justify-between p-3 border border-white/10 rounded-lg hover:border-white/20 transition-colors"
                        >
                          <div>
                            <div className="font-medium">{item.label}</div>
                            <div className="text-sm text-muted-foreground">{item.description}</div>
                          </div>
                          <Switch
                            checked={displayOptions[item.key as keyof typeof displayOptions]}
                            onCheckedChange={() => toggleDisplayOption(item.key as keyof typeof displayOptions)}
                          />
                        </div>
                      ))}
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Device Settings */}
            <TabsContent value="devices" className="space-y-6">
              <Card className="hover:shadow-lg transition-all duration-300">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Zap className="w-5 h-5 text-yellow-400" />
                    Device Management
                  </CardTitle>
                  <CardDescription>Manage connected devices and monitoring settings</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="space-y-4">
                    <h4 className="font-medium">Connected Devices</h4>
                    <div className="space-y-3">
                      {[
                        { name: "Smart Thermostat", type: "HVAC", status: "online", lastSeen: "2 minutes ago" },
                        {
                          name: "Water Heater Monitor",
                          type: "Water Heating",
                          status: "online",
                          lastSeen: "5 minutes ago",
                        },
                        { name: "Smart Meter", type: "Main Grid", status: "online", lastSeen: "1 minute ago" },
                        { name: "Solar Inverter", type: "Solar", status: "offline", lastSeen: "2 hours ago" },
                      ].map((device, index) => (
                        <div
                          key={index}
                          className="flex items-center justify-between p-4 border border-white/10 rounded-lg hover:border-white/20 transition-colors"
                        >
                          <div className="flex items-center gap-3">
                            <div
                              className={`w-3 h-3 rounded-full ${device.status === "online" ? "bg-green-400" : "bg-red-400"}`}
                            />
                            <div>
                              <div className="font-medium">{device.name}</div>
                              <div className="text-sm text-muted-foreground">
                                {device.type} • Last seen: {device.lastSeen}
                              </div>
                            </div>
                          </div>
                          <div className="flex items-center gap-2">
                            <Badge variant={device.status === "online" ? "default" : "destructive"}>
                              {device.status}
                            </Badge>
                            <Button
                              size="sm"
                              variant="outline"
                              onClick={() =>
                                toast({
                                  title: "Device configuration",
                                  description: `Configuring ${device.name}`,
                                })
                              }
                            >
                              Configure
                            </Button>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="space-y-4">
                    <h4 className="font-medium">Monitoring Settings</h4>
                    <div className="space-y-3">
                      {[
                        { key: "realtime", label: "Real-time Updates", description: "Update data every 30 seconds" },
                        { key: "historical", label: "Historical Data", description: "Store detailed usage history" },
                        {
                          key: "health",
                          label: "Device Health Monitoring",
                          description: "Monitor device performance and health",
                        },
                        {
                          key: "discovery",
                          label: "Automatic Discovery",
                          description: "Automatically detect new devices",
                        },
                      ].map((item) => (
                        <div
                          key={item.key}
                          className="flex items-center justify-between p-3 border border-white/10 rounded-lg hover:border-white/20 transition-colors"
                        >
                          <div>
                            <div className="font-medium">{item.label}</div>
                            <div className="text-sm text-muted-foreground">{item.description}</div>
                          </div>
                          <Switch
                            checked={deviceSettings[item.key as keyof typeof deviceSettings]}
                            onCheckedChange={() => toggleDeviceSetting(item.key as keyof typeof deviceSettings)}
                          />
                        </div>
                      ))}
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Security Settings */}
            <TabsContent value="security" className="space-y-6">
              <Card className="hover:shadow-lg transition-all duration-300">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Shield className="w-5 h-5 text-green-400" />
                    Security & Privacy
                  </CardTitle>
                  <CardDescription>Manage your account security and privacy settings</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="space-y-4">
                    <h4 className="font-medium">Password & Authentication</h4>
                    <form onSubmit={handlePasswordSubmit} className="space-y-3">
                      <div>
                        <label className="text-sm font-medium">Current Password</label>
                        <div className="relative">
                          <input
                            type={showPassword ? "text" : "password"}
                            name="currentPassword"
                            value={passwordForm.currentPassword}
                            onChange={handlePasswordChange}
                            placeholder="Enter current password"
                            className="w-full mt-1 px-3 py-2 pr-10 bg-white/5 border border-white/10 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                          />
                          <Button
                            type="button"
                            variant="ghost"
                            size="sm"
                            className="absolute right-1 top-1 h-8 w-8 p-0"
                            onClick={() => setShowPassword(!showPassword)}
                          >
                            {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                          </Button>
                        </div>
                      </div>
                      <div>
                        <label className="text-sm font-medium">New Password</label>
                        <input
                          type="password"
                          name="newPassword"
                          value={passwordForm.newPassword}
                          onChange={handlePasswordChange}
                          placeholder="Enter new password"
                          className="w-full mt-1 px-3 py-2 bg-white/5 border border-white/10 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                      </div>
                      <div>
                        <label className="text-sm font-medium">Confirm New Password</label>
                        <input
                          type="password"
                          name="confirmPassword"
                          value={passwordForm.confirmPassword}
                          onChange={handlePasswordChange}
                          placeholder="Confirm new password"
                          className="w-full mt-1 px-3 py-2 bg-white/5 border border-white/10 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                      </div>
                      <Button type="submit" className="mt-2" disabled={isSubmitting}>
                        {isSubmitting ? (
                          <>
                            <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                            Updating...
                          </>
                        ) : (
                          "Update Password"
                        )}
                      </Button>
                    </form>
                  </div>

                  <div className="space-y-4">
                    <h4 className="font-medium">Two-Factor Authentication</h4>
                    <div className="p-4 border border-white/10 rounded-lg hover:border-white/20 transition-colors">
                      <div className="flex items-center justify-between">
                        <div>
                          <div className="font-medium">SMS Authentication</div>
                          <div className="text-sm text-muted-foreground">Receive verification codes via SMS</div>
                        </div>
                        <Badge variant="secondary">Disabled</Badge>
                      </div>
                      <Button size="sm" className="mt-3" onClick={handleEnable2FA}>
                        Enable 2FA
                      </Button>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <h4 className="font-medium">Privacy Settings</h4>
                    <div className="space-y-3">
                      {[
                        {
                          key: "dataSharing",
                          label: "Data Sharing",
                          description: "Share anonymized usage data for research",
                        },
                        {
                          key: "analytics",
                          label: "Analytics",
                          description: "Allow usage analytics for app improvement",
                        },
                        {
                          key: "marketing",
                          label: "Marketing Communications",
                          description: "Receive product updates and offers",
                        },
                      ].map((item) => (
                        <div
                          key={item.key}
                          className="flex items-center justify-between p-3 border border-white/10 rounded-lg hover:border-white/20 transition-colors"
                        >
                          <div>
                            <div className="font-medium">{item.label}</div>
                            <div className="text-sm text-muted-foreground">{item.description}</div>
                          </div>
                          <Switch
                            checked={privacySettings[item.key as keyof typeof privacySettings]}
                            onCheckedChange={() => togglePrivacySetting(item.key as keyof typeof privacySettings)}
                          />
                        </div>
                      ))}
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Data Management */}
            <TabsContent value="data" className="space-y-6">
              <Card className="hover:shadow-lg transition-all duration-300">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Database className="w-5 h-5 text-blue-400" />
                    Data Management
                  </CardTitle>
                  <CardDescription>Manage your data storage, backup, and export options</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="space-y-4">
                    <h4 className="font-medium">Data Storage</h4>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div className="p-4 border border-white/10 rounded-lg text-center hover:border-white/20 transition-colors">
                        <div className="text-2xl font-bold text-blue-400">2.4 GB</div>
                        <div className="text-sm text-muted-foreground">Total Usage</div>
                      </div>
                      <div className="p-4 border border-white/10 rounded-lg text-center hover:border-white/20 transition-colors">
                        <div className="text-2xl font-bold text-green-400">1.8 GB</div>
                        <div className="text-sm text-muted-foreground">Historical Data</div>
                      </div>
                      <div className="p-4 border border-white/10 rounded-lg text-center hover:border-white/20 transition-colors">
                        <div className="text-2xl font-bold text-purple-400">0.6 GB</div>
                        <div className="text-sm text-muted-foreground">Reports & Exports</div>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <h4 className="font-medium">Data Export</h4>
                    <div className="space-y-3">
                      <div className="p-4 border border-white/10 rounded-lg hover:border-white/20 transition-colors">
                        <div className="flex items-center justify-between">
                          <div>
                            <div className="font-medium">Export All Data</div>
                            <div className="text-sm text-muted-foreground">Download complete data archive</div>
                          </div>
                          <Button variant="outline" className="gap-2" onClick={handleExportData} disabled={isExporting}>
                            {isExporting ? (
                              <Loader2 className="w-4 h-4 animate-spin" />
                            ) : (
                              <Download className="w-4 h-4" />
                            )}
                            {isExporting ? "Exporting..." : "Export"}
                          </Button>
                        </div>
                      </div>
                      <div className="p-4 border border-white/10 rounded-lg hover:border-white/20 transition-colors">
                        <div className="flex items-center justify-between">
                          <div>
                            <div className="font-medium">Import Data</div>
                            <div className="text-sm text-muted-foreground">Import data from previous system</div>
                          </div>
                          <Button variant="outline" className="gap-2" onClick={handleImportData} disabled={isImporting}>
                            {isImporting ? (
                              <Loader2 className="w-4 h-4 animate-spin" />
                            ) : (
                              <Upload className="w-4 h-4" />
                            )}
                            {isImporting ? "Importing..." : "Import"}
                          </Button>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <h4 className="font-medium">Data Retention</h4>
                    <div className="space-y-3">
                      <div>
                        <label className="text-sm font-medium">Historical Data Retention</label>
                        <select
                          className="w-full mt-1 px-3 py-2 bg-white/5 border border-white/10 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                          onChange={(e) =>
                            toast({
                              title: "Retention period updated",
                              description: `Historical data will be kept for ${e.target.value}`,
                            })
                          }
                        >
                          <option>Keep for 2 years</option>
                          <option>Keep for 1 year</option>
                          <option>Keep for 6 months</option>
                          <option>Keep for 3 months</option>
                        </select>
                      </div>
                      <div>
                        <label className="text-sm font-medium">Report Archive Retention</label>
                        <select
                          className="w-full mt-1 px-3 py-2 bg-white/5 border border-white/10 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                          onChange={(e) =>
                            toast({
                              title: "Archive retention updated",
                              description: `Reports will be kept for ${e.target.value}`,
                            })
                          }
                        >
                          <option>Keep for 1 year</option>
                          <option>Keep for 6 months</option>
                          <option>Keep for 3 months</option>
                          <option>Keep for 1 month</option>
                        </select>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <h4 className="font-medium text-red-400">Danger Zone</h4>
                    <div className="p-4 border border-red-500/30 rounded-lg bg-red-500/10">
                      <div className="flex items-center justify-between">
                        <div>
                          <div className="font-medium text-red-400">Delete All Data</div>
                          <div className="text-sm text-muted-foreground">
                            Permanently delete all your data and account
                          </div>
                        </div>
                        <Button
                          variant="destructive"
                          className="gap-2"
                          onClick={handleDeleteAccount}
                          disabled={isDeleting}
                        >
                          {isDeleting ? <Loader2 className="w-4 h-4 animate-spin" /> : <Trash2 className="w-4 h-4" />}
                          {isDeleting ? "Deleting..." : "Delete Account"}
                        </Button>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </main>
      </div>
      <Toaster />
    </div>
  )
}
