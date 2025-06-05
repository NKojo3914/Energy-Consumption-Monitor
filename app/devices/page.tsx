"use client"

import { useState } from "react"
import { Sidebar } from "@/components/layout/sidebar"
import { Header } from "@/components/layout/header"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Switch } from "@/components/ui/switch"
import { Slider } from "@/components/ui/slider"
import { Progress } from "@/components/ui/progress"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import {
  Home,
  Lightbulb,
  Thermometer,
  Car,
  Tv,
  Refrigerator,
  WashingMachine,
  Settings,
  Power,
  Timer,
  Zap,
  TrendingUp,
  TrendingDown,
  AlertTriangle,
  CheckCircle,
  Clock,
  Wifi,
  WifiOff,
  Plus,
} from "lucide-react"
import { toast } from "@/hooks/use-toast"

interface Device {
  id: string
  name: string
  type: string
  room: string
  power: number
  status: "on" | "off" | "standby" | "error"
  isOnline: boolean
  consumption: number
  efficiency: number
  schedule?: {
    enabled: boolean
    onTime: string
    offTime: string
  }
  settings?: {
    temperature?: number
    brightness?: number
    speed?: number
  }
  icon: any
  color: string
}

const initialDevices: Device[] = [
  {
    id: "1",
    name: "Living Room Thermostat",
    type: "HVAC",
    room: "Living Room",
    power: 3200,
    status: "on",
    isOnline: true,
    consumption: 45,
    efficiency: 87,
    settings: { temperature: 72 },
    schedule: { enabled: true, onTime: "06:00", offTime: "23:00" },
    icon: Thermometer,
    color: "text-blue-400",
  },
  {
    id: "2",
    name: "Kitchen Lights",
    type: "Lighting",
    room: "Kitchen",
    power: 240,
    status: "on",
    isOnline: true,
    consumption: 8,
    efficiency: 92,
    settings: { brightness: 80 },
    schedule: { enabled: false, onTime: "18:00", offTime: "23:00" },
    icon: Lightbulb,
    color: "text-yellow-400",
  },
  {
    id: "3",
    name: "Tesla Model 3",
    type: "EV Charging",
    room: "Garage",
    power: 7200,
    status: "standby",
    isOnline: true,
    consumption: 0,
    efficiency: 95,
    schedule: { enabled: true, onTime: "23:00", offTime: "06:00" },
    icon: Car,
    color: "text-green-400",
  },
  {
    id: "4",
    name: "Samsung Smart TV",
    type: "Entertainment",
    room: "Living Room",
    power: 150,
    status: "standby",
    isOnline: true,
    consumption: 2,
    efficiency: 78,
    icon: Tv,
    color: "text-purple-400",
  },
  {
    id: "5",
    name: "Kitchen Refrigerator",
    type: "Appliance",
    room: "Kitchen",
    power: 180,
    status: "on",
    isOnline: false,
    consumption: 12,
    efficiency: 85,
    icon: Refrigerator,
    color: "text-cyan-400",
  },
  {
    id: "6",
    name: "Washing Machine",
    type: "Appliance",
    room: "Laundry",
    power: 500,
    status: "off",
    isOnline: true,
    consumption: 0,
    efficiency: 88,
    settings: { speed: 3 },
    schedule: { enabled: true, onTime: "22:00", offTime: "23:30" },
    icon: WashingMachine,
    color: "text-indigo-400",
  },
]

export default function Devices() {
  const [devices, setDevices] = useState<Device[]>(initialDevices)
  const [selectedRoom, setSelectedRoom] = useState<string>("all")
  const [selectedType, setSelectedType] = useState<string>("all")

  const rooms = ["all", ...Array.from(new Set(devices.map((d) => d.room)))]
  const types = ["all", ...Array.from(new Set(devices.map((d) => d.type)))]

  const filteredDevices = devices.filter((device) => {
    const roomMatch = selectedRoom === "all" || device.room === selectedRoom
    const typeMatch = selectedType === "all" || device.type === selectedType
    return roomMatch && typeMatch
  })

  const toggleDevice = (deviceId: string) => {
    setDevices((prev) =>
      prev.map((device) => {
        if (device.id === deviceId) {
          const newStatus = device.status === "on" ? "off" : "on"
          const newConsumption = newStatus === "on" ? (device.power / 1000) * 0.15 : 0

          toast({
            title: `${device.name} ${newStatus === "on" ? "turned on" : "turned off"}`,
            description: `Power consumption: ${newConsumption.toFixed(1)} kW`,
          })

          return {
            ...device,
            status: newStatus,
            consumption: newConsumption,
          }
        }
        return device
      }),
    )
  }

  const updateDeviceSetting = (deviceId: string, setting: string, value: number) => {
    setDevices((prev) =>
      prev.map((device) => {
        if (device.id === deviceId) {
          return {
            ...device,
            settings: {
              ...device.settings,
              [setting]: value,
            },
          }
        }
        return device
      }),
    )
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "on":
        return "bg-green-500"
      case "off":
        return "bg-gray-500"
      case "standby":
        return "bg-yellow-500"
      case "error":
        return "bg-red-500"
      default:
        return "bg-gray-500"
    }
  }

  const getStatusIcon = (device: Device) => {
    if (!device.isOnline) return <WifiOff className="w-4 h-4 text-red-400" />
    if (device.status === "error") return <AlertTriangle className="w-4 h-4 text-red-400" />
    if (device.status === "on") return <CheckCircle className="w-4 h-4 text-green-400" />
    return <Clock className="w-4 h-4 text-yellow-400" />
  }

  const totalConsumption = devices.reduce((sum, device) => sum + device.consumption, 0)
  const activeDevices = devices.filter((d) => d.status === "on").length
  const offlineDevices = devices.filter((d) => !d.isOnline).length

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
                Device Management
              </h1>
              <p className="text-slate-400 mt-1">Monitor and control your smart devices</p>
            </div>
            <Button className="bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-600 hover:to-blue-600">
              <Plus className="w-4 h-4 mr-2" />
              Add Device
            </Button>
          </div>

          {/* Overview Stats */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <Card className="glass-card">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium text-slate-300">Total Devices</CardTitle>
                <Home className="h-4 w-4 text-cyan-400" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-cyan-400">{devices.length}</div>
                <div className="text-xs text-slate-400 mt-1">
                  {activeDevices} active, {devices.length - activeDevices - offlineDevices} standby
                </div>
              </CardContent>
            </Card>

            <Card className="glass-card">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium text-slate-300">Total Consumption</CardTitle>
                <Zap className="h-4 w-4 text-yellow-400" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-yellow-400">{totalConsumption.toFixed(1)} kW</div>
                <div className="text-xs text-slate-400 mt-1">Real-time power draw</div>
              </CardContent>
            </Card>

            <Card className="glass-card">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium text-slate-300">Online Status</CardTitle>
                <Wifi className="h-4 w-4 text-green-400" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-green-400">
                  {devices.length - offlineDevices}/{devices.length}
                </div>
                <div className="text-xs text-slate-400 mt-1">{offlineDevices > 0 && `${offlineDevices} offline`}</div>
              </CardContent>
            </Card>

            <Card className="glass-card">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium text-slate-300">Avg Efficiency</CardTitle>
                <TrendingUp className="h-4 w-4 text-purple-400" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-purple-400">
                  {Math.round(devices.reduce((sum, d) => sum + d.efficiency, 0) / devices.length)}%
                </div>
                <div className="text-xs text-slate-400 mt-1">Across all devices</div>
              </CardContent>
            </Card>
          </div>

          {/* Filters */}
          <div className="flex flex-wrap gap-4">
            <div className="flex items-center gap-2">
              <Label htmlFor="room-filter">Room:</Label>
              <select
                id="room-filter"
                value={selectedRoom}
                onChange={(e) => setSelectedRoom(e.target.value)}
                className="px-3 py-1 rounded-md bg-slate-800 border border-slate-600 text-sm"
              >
                {rooms.map((room) => (
                  <option key={room} value={room}>
                    {room === "all" ? "All Rooms" : room}
                  </option>
                ))}
              </select>
            </div>
            <div className="flex items-center gap-2">
              <Label htmlFor="type-filter">Type:</Label>
              <select
                id="type-filter"
                value={selectedType}
                onChange={(e) => setSelectedType(e.target.value)}
                className="px-3 py-1 rounded-md bg-slate-800 border border-slate-600 text-sm"
              >
                {types.map((type) => (
                  <option key={type} value={type}>
                    {type === "all" ? "All Types" : type}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Device Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredDevices.map((device) => {
              const IconComponent = device.icon
              return (
                <Card key={device.id} className="glass-card hover:neon-glow transition-all duration-300">
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-4">
                    <div className="flex items-center gap-3">
                      <div className="relative">
                        <IconComponent className={`h-8 w-8 ${device.color}`} />
                        <div
                          className={`absolute -bottom-1 -right-1 w-3 h-3 rounded-full ${getStatusColor(device.status)}`}
                        />
                      </div>
                      <div>
                        <CardTitle className="text-base">{device.name}</CardTitle>
                        <CardDescription className="text-xs">
                          {device.room} • {device.type}
                        </CardDescription>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      {getStatusIcon(device)}
                      <Dialog>
                        <DialogTrigger asChild>
                          <Button variant="ghost" size="icon" className="h-8 w-8">
                            <Settings className="h-4 w-4" />
                          </Button>
                        </DialogTrigger>
                        <DialogContent className="glass-card">
                          <DialogHeader>
                            <DialogTitle className="text-cyan-400">{device.name} Settings</DialogTitle>
                            <DialogDescription>Configure device parameters and scheduling</DialogDescription>
                          </DialogHeader>
                          <div className="space-y-6 py-4">
                            {/* Device Controls */}
                            {device.settings?.temperature && (
                              <div className="space-y-2">
                                <Label>Temperature: {device.settings.temperature}°F</Label>
                                <Slider
                                  value={[device.settings.temperature]}
                                  onValueChange={([value]) => updateDeviceSetting(device.id, "temperature", value)}
                                  max={85}
                                  min={60}
                                  step={1}
                                  className="w-full"
                                />
                              </div>
                            )}

                            {device.settings?.brightness && (
                              <div className="space-y-2">
                                <Label>Brightness: {device.settings.brightness}%</Label>
                                <Slider
                                  value={[device.settings.brightness]}
                                  onValueChange={([value]) => updateDeviceSetting(device.id, "brightness", value)}
                                  max={100}
                                  min={0}
                                  step={5}
                                  className="w-full"
                                />
                              </div>
                            )}

                            {device.settings?.speed && (
                              <div className="space-y-2">
                                <Label>Speed Level: {device.settings.speed}</Label>
                                <Slider
                                  value={[device.settings.speed]}
                                  onValueChange={([value]) => updateDeviceSetting(device.id, "speed", value)}
                                  max={5}
                                  min={1}
                                  step={1}
                                  className="w-full"
                                />
                              </div>
                            )}

                            {/* Scheduling */}
                            {device.schedule && (
                              <div className="space-y-4">
                                <div className="flex items-center justify-between">
                                  <Label>Smart Scheduling</Label>
                                  <Switch
                                    checked={device.schedule.enabled}
                                    onCheckedChange={(checked) => {
                                      setDevices((prev) =>
                                        prev.map((d) =>
                                          d.id === device.id
                                            ? { ...d, schedule: { ...d.schedule!, enabled: checked } }
                                            : d,
                                        ),
                                      )
                                    }}
                                  />
                                </div>
                                {device.schedule.enabled && (
                                  <div className="grid grid-cols-2 gap-4">
                                    <div>
                                      <Label htmlFor="on-time">Turn On</Label>
                                      <Input
                                        id="on-time"
                                        type="time"
                                        value={device.schedule.onTime}
                                        onChange={(e) => {
                                          setDevices((prev) =>
                                            prev.map((d) =>
                                              d.id === device.id
                                                ? { ...d, schedule: { ...d.schedule!, onTime: e.target.value } }
                                                : d,
                                            ),
                                          )
                                        }}
                                      />
                                    </div>
                                    <div>
                                      <Label htmlFor="off-time">Turn Off</Label>
                                      <Input
                                        id="off-time"
                                        type="time"
                                        value={device.schedule.offTime}
                                        onChange={(e) => {
                                          setDevices((prev) =>
                                            prev.map((d) =>
                                              d.id === device.id
                                                ? { ...d, schedule: { ...d.schedule!, offTime: e.target.value } }
                                                : d,
                                            ),
                                          )
                                        }}
                                      />
                                    </div>
                                  </div>
                                )}
                              </div>
                            )}
                          </div>
                        </DialogContent>
                      </Dialog>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    {/* Power Toggle */}
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-slate-400">Power</span>
                      <Switch
                        checked={device.status === "on"}
                        onCheckedChange={() => toggleDevice(device.id)}
                        disabled={!device.isOnline}
                      />
                    </div>

                    {/* Consumption */}
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span className="text-slate-400">Current Draw</span>
                        <span className="font-semibold">{device.consumption.toFixed(1)} kW</span>
                      </div>
                      <Progress value={(device.consumption / (device.power / 1000)) * 100} className="h-2" />
                    </div>

                    {/* Efficiency */}
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span className="text-slate-400">Efficiency</span>
                        <Badge variant={device.efficiency > 85 ? "default" : "secondary"}>{device.efficiency}%</Badge>
                      </div>
                      <Progress value={device.efficiency} className="h-2" />
                    </div>

                    {/* Status Info */}
                    <div className="flex justify-between items-center pt-2 border-t border-slate-700">
                      <div className="text-xs text-slate-400">{device.schedule?.enabled ? "Scheduled" : "Manual"}</div>
                      <div className="text-xs text-slate-400">
                        ${(device.consumption * 0.15 * 24 * 30).toFixed(0)}/mo
                      </div>
                    </div>
                  </CardContent>
                </Card>
              )
            })}
          </div>

          {/* Quick Actions */}
          <Card className="glass-card">
            <CardHeader>
              <CardTitle className="text-cyan-400">Quick Actions</CardTitle>
              <CardDescription>Control multiple devices at once</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <Button
                  variant="outline"
                  className="h-16 flex-col gap-2"
                  onClick={() => {
                    setDevices((prev) => prev.map((d) => ({ ...d, status: "off" as const, consumption: 0 })))
                    toast({ title: "All devices turned off", description: "Energy saving mode activated" })
                  }}
                >
                  <Power className="w-5 h-5" />
                  <span className="text-xs">All Off</span>
                </Button>

                <Button
                  variant="outline"
                  className="h-16 flex-col gap-2"
                  onClick={() => {
                    const lightDevices = devices.filter((d) => d.type === "Lighting")
                    setDevices((prev) =>
                      prev.map((d) =>
                        lightDevices.includes(d) ? { ...d, status: d.status === "on" ? "off" : ("on" as const) } : d,
                      ),
                    )
                    toast({ title: "Lighting toggled", description: "All lights switched" })
                  }}
                >
                  <Lightbulb className="w-5 h-5" />
                  <span className="text-xs">Toggle Lights</span>
                </Button>

                <Button
                  variant="outline"
                  className="h-16 flex-col gap-2"
                  onClick={() => {
                    toast({ title: "Night mode activated", description: "Optimizing for energy efficiency" })
                  }}
                >
                  <Timer className="w-5 h-5" />
                  <span className="text-xs">Night Mode</span>
                </Button>

                <Button
                  variant="outline"
                  className="h-16 flex-col gap-2"
                  onClick={() => {
                    toast({ title: "Eco mode enabled", description: "Reducing power consumption" })
                  }}
                >
                  <TrendingDown className="w-5 h-5" />
                  <span className="text-xs">Eco Mode</span>
                </Button>
              </div>
            </CardContent>
          </Card>
        </main>
      </div>
    </div>
  )
}
