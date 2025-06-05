"use client"

import { useState, useEffect } from "react"
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
import { useDevices } from "@/hooks/use-api"
import { apiClient } from "@/lib/api"

// --- Add Device type and initialDevices mock data ---
type DeviceSettingKey = "temperature" | "brightness" | "speed";

type Device = {
  id: string
  name: string
  room: string
  type: string
  icon: React.ElementType
  color: string
  status: "on" | "off" | "standby" | "error"
  isOnline: boolean
  consumption: number
  power: number
  efficiency: number
  settings?: {
    temperature?: number
    brightness?: number
    speed?: number
  }
  schedule?: {
    enabled: boolean
    onTime: string
    offTime: string
  }
}

const initialDevices: Device[] = [
  {
    id: "1",
    name: "Living Room Light",
    room: "Living Room",
    type: "Lighting",
    icon: Lightbulb,
    color: "text-yellow-400",
    status: "on",
    isOnline: true,
    consumption: 0.08,
    power: 80,
    efficiency: 92,
    settings: { brightness: 80 },
    schedule: { enabled: false, onTime: "18:00", offTime: "23:00" },
  },
  {
    id: "2",
    name: "Bedroom AC",
    room: "Bedroom",
    type: "HVAC",
    icon: Thermometer,
    color: "text-blue-400",
    status: "off",
    isOnline: true,
    consumption: 0,
    power: 1200,
    efficiency: 85,
    settings: { temperature: 72 },
    schedule: { enabled: true, onTime: "21:00", offTime: "07:00" },
  },
  {
    id: "3",
    name: "Kitchen Fridge",
    room: "Kitchen",
    type: "Appliance",
    icon: Refrigerator,
    color: "text-cyan-400",
    status: "on",
    isOnline: true,
    consumption: 0.15,
    power: 150,
    efficiency: 88,
    schedule: { enabled: false, onTime: "00:00", offTime: "00:00" },
  },
  {
    id: "4",
    name: "Garage Car Charger",
    room: "Garage",
    type: "EV",
    icon: Car,
    color: "text-green-400",
    status: "standby",
    isOnline: false,
    consumption: 0,
    power: 7000,
    efficiency: 80,
    schedule: { enabled: false, onTime: "00:00", offTime: "00:00" },
  },
  {
    id: "5",
    name: "Living Room TV",
    room: "Living Room",
    type: "Entertainment",
    icon: Tv,
    color: "text-purple-400",
    status: "off",
    isOnline: true,
    consumption: 0,
    power: 120,
    efficiency: 90,
    schedule: { enabled: false, onTime: "00:00", offTime: "00:00" },
  },
  {
    id: "6",
    name: "Laundry Washer",
    room: "Laundry",
    type: "Appliance",
    icon: WashingMachine,
    color: "text-blue-300",
    status: "error",
    isOnline: false,
    consumption: 0,
    power: 500,
    efficiency: 70,
    schedule: { enabled: false, onTime: "00:00", offTime: "00:00" },
  },
]
// --- End mock data ---

export default function Devices() {
  const { devices: backendDevices, loading, error, refetch } = useDevices()
  const [devices, setDevices] = useState<Device[]>(initialDevices)
  const [selectedRoom, setSelectedRoom] = useState<string>("all")
  const [selectedType, setSelectedType] = useState<string>("all")
  const [useBackend, setUseBackend] = useState(false)

  // Add Device Dialog State
  const [addDialogOpen, setAddDialogOpen] = useState(false)
  const [form, setForm] = useState({
    name: "",
    room: "Living Room",
    type: "Lighting",
    power: 60,
    efficiency: 90,
    isOnline: true,
  })

  // On mount, fetch backend devices and merge with mock devices (if needed)
  // Helper to map backend device type to local Device type
  function mapBackendDevice(backendDevice: any): Device {
    // Map icon and color based on type or name (customize as needed)
    let icon = Lightbulb
    let color = "text-yellow-400"
    switch (backendDevice.type) {
      case "Lighting":
      case "lighting":
        icon = Lightbulb
        color = "text-yellow-400"
        break
      case "HVAC":
      case "hvac":
        icon = Thermometer
        color = "text-blue-400"
        break
      case "Appliance":
      case "appliance":
        if (backendDevice.name?.toLowerCase().includes("fridge")) {
          icon = Refrigerator
          color = "text-cyan-400"
        } else if (backendDevice.name?.toLowerCase().includes("washer")) {
          icon = WashingMachine
          color = "text-blue-300"
        }
        break
      case "EV":
      case "ev":
        icon = Car
        color = "text-green-400"
        break
      case "Entertainment":
      case "entertainment":
        icon = Tv
        color = "text-purple-400"
        break
      default:
        icon = Lightbulb
        color = "text-yellow-400"
    }
    return {
      id: backendDevice.id,
      name: backendDevice.name,
      room: backendDevice.room ?? backendDevice.location ?? form.room ?? "Unknown",
      type: backendDevice.type ?? form.type ?? "Lighting",
      icon,
      color,
      status: backendDevice.status === "online" ? "on" : backendDevice.status === "offline" ? "off" : backendDevice.status || (form.isOnline ? "on" : "off"),
      isOnline: backendDevice.isOnline ?? (backendDevice.status === "online"),
      consumption: backendDevice.consumption ?? backendDevice.currentPower ?? 0,
      power: backendDevice.power ?? backendDevice.currentPower ?? form.power ?? 60,
      efficiency: backendDevice.efficiency ?? form.efficiency ?? 90,
      settings: backendDevice.settings || (backendDevice.type === "Lighting" || backendDevice.type === "lighting"
        ? { brightness: 50 }
        : backendDevice.type === "HVAC" || backendDevice.type === "hvac"
        ? { temperature: 72 }
        : undefined),
      schedule: backendDevice.schedule || { enabled: false, onTime: "00:00", offTime: "00:00" },
    }
  }

  useEffect(() => {
    if (useBackend && backendDevices && backendDevices.length > 0) {
      setDevices(backendDevices.map(mapBackendDevice))
    } else if (!useBackend) {
      setDevices(initialDevices)
    }
  }, [backendDevices, useBackend])

  useEffect(() => {
    if (useBackend) {
      console.log('Backend devices after refetch:', backendDevices)
    }
  }, [backendDevices, useBackend])

  const rooms = ["all", ...Array.from(new Set(devices.map((d) => d.room)))]
  const types = ["all", ...Array.from(new Set(devices.map((d) => d.type)))]

  const filteredDevices = devices.filter((device) => {
    const roomMatch = selectedRoom === "all" || device.room === selectedRoom
    const typeMatch = selectedType === "all" || device.type === selectedType
    return roomMatch && typeMatch
  })

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

  // Add device handler
  const handleAddDevice = async (deviceData: any) => {
    try {
      await apiClient.createDevice(deviceData)
      refetch()
    } catch (err) {
      // handle error
    }
  }

  // Update device handler
  const handleUpdateDevice = async (id: string, data: any) => {
    try {
      await apiClient.updateDevice(id, data)
      refetch()
    } catch (err) {
      // handle error
    }
  }

  // Delete device handler
  const handleDeleteDevice = async (id: string) => {
    try {
      await apiClient.deleteDevice(id)
      refetch()
    } catch (err) {
      // handle error
    }
  }

  // --- Add updateDeviceSetting and toggleDevice helpers ---
  function updateDeviceSetting(id: string, key: DeviceSettingKey, value: number) {
    setDevices((prev) =>
      prev.map((d) =>
        d.id === id
          ? {
              ...d,
              settings: { ...d.settings, [key]: value },
            }
          : d,
      ),
    )
  }

  function toggleDevice(id: string) {
    setDevices((prev) =>
      prev.map((d) =>
        d.id === id
          ? {
              ...d,
              status: d.status === "on" ? "off" : "on",
              consumption: d.status === "on" ? 0 : d.power / 1000,
            }
          : d,
      ),
    )
  }
  // --- End helpers ---

  if (loading) return <div className="p-6">Loading devices...</div>
  if (error) return <div className="p-6 text-red-500">Error: {error}</div>

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
            <Dialog open={addDialogOpen} onOpenChange={setAddDialogOpen}>
              <DialogTrigger asChild>
                <Button className="bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-600 hover:to-blue-600">
                  <Plus className="w-4 h-4 mr-2" />
                  Add Device
                </Button>
              </DialogTrigger>
              <DialogContent className="glass-card max-w-md">
                <DialogHeader>
                  <DialogTitle>Add New Device</DialogTitle>
                  <DialogDescription>Fill in the details below to add a device.</DialogDescription>
                </DialogHeader>
                <form
                  className="space-y-4"
                  onSubmit={async (e) => {
                    e.preventDefault()
                    if (useBackend) {
                      // Only send backend-relevant fields
                      const backendDeviceData = {
                        name: form.name,
                        room: form.room,
                        type: form.type,
                        power: form.power,
                        efficiency: form.efficiency,
                        isOnline: form.isOnline,
                      }
                      await handleAddDevice(backendDeviceData)
                      // Wait for refetch to complete before closing dialog and resetting form
                      await refetch()
                      setAddDialogOpen(false)
                      setForm({
                        name: "",
                        room: "Living Room",
                        type: "Lighting",
                        power: 60,
                        efficiency: 90,
                        isOnline: true,
                      })
                    } else {
                      const newDevice: Device = {
                        id: Date.now().toString(),
                        name: form.name,
                        room: form.room,
                        type: form.type,
                        icon: Lightbulb, // You can improve this by mapping type to icon
                        color: "text-yellow-400",
                        status: "off",
                        isOnline: form.isOnline,
                        consumption: 0,
                        power: form.power,
                        efficiency: form.efficiency,
                        settings: { brightness: 50 },
                        schedule: { enabled: false, onTime: "00:00", offTime: "00:00" },
                      }
                      setDevices((prev) => [...prev, newDevice])
                      toast({ title: "Device added", description: `${form.name} has been added.` })
                      setAddDialogOpen(false)
                      setForm({
                        name: "",
                        room: "Living Room",
                        type: "Lighting",
                        power: 60,
                        efficiency: 90,
                        isOnline: true,
                      })
                    }
                  }}
                >
                  <div>
                    <Label htmlFor="device-name">Name</Label>
                    <Input
                      id="device-name"
                      value={form.name}
                      onChange={e => setForm(f => ({ ...f, name: e.target.value }))}
                      required
                    />
                  </div>
                  <div>
                    <Label htmlFor="device-room">Room</Label>
                    <Input
                      id="device-room"
                      value={form.room}
                      onChange={e => setForm(f => ({ ...f, room: e.target.value }))}
                      required
                    />
                  </div>
                  <div>
                    <Label htmlFor="device-type">Type</Label>
                    <select
                      id="device-type"
                      className="w-full rounded-md bg-slate-800 border border-slate-600 text-sm p-2"
                      value={form.type}
                      onChange={e => setForm(f => ({ ...f, type: e.target.value }))}
                    >
                      <option value="Lighting">Lighting</option>
                      <option value="HVAC">HVAC</option>
                      <option value="Appliance">Appliance</option>
                      <option value="EV">EV</option>
                      <option value="Entertainment">Entertainment</option>
                    </select>
                  </div>
                  <div>
                    <Label htmlFor="device-power">Power (W)</Label>
                    <Input
                      id="device-power"
                      type="number"
                      min={1}
                      value={form.power}
                      onChange={e => setForm(f => ({ ...f, power: Number(e.target.value) }))}
                      required
                    />
                  </div>
                  <div>
                    <Label htmlFor="device-efficiency">Efficiency (%)</Label>
                    <Input
                      id="device-efficiency"
                      type="number"
                      min={0}
                      max={100}
                      value={form.efficiency}
                      onChange={e => setForm(f => ({ ...f, efficiency: Number(e.target.value) }))}
                      required
                    />
                  </div>
                  <div className="flex items-center gap-2">
                    <Switch
                      id="device-online"
                      checked={form.isOnline}
                      onCheckedChange={checked => setForm(f => ({ ...f, isOnline: checked }))}
                    />
                    <Label htmlFor="device-online">Online</Label>
                  </div>
                  <Button type="submit" className="w-full mt-2 bg-cyan-600 hover:bg-cyan-700">Add Device</Button>
                </form>
              </DialogContent>
            </Dialog>
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

          {/* Add toggle for backend vs mock devices above filters */}
          <div className="flex items-center gap-4 mb-4">
            <Label htmlFor="backend-toggle">Use Backend Devices</Label>
            <Switch
              id="backend-toggle"
              checked={useBackend}
              onCheckedChange={setUseBackend}
              className="ml-2"
            />
            <span className="text-xs text-slate-400">{useBackend ? "Backend" : "Mock"}</span>
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
                            {device.settings?.temperature !== undefined && (
                              <div className="space-y-2">
                                <Label>Temperature: {device.settings.temperature}°F</Label>
                                <Slider
                                  value={[device.settings.temperature ?? 70]}
                                  onValueChange={(value) => updateDeviceSetting(device.id, "temperature", value[0])}
                                  max={85}
                                  min={60}
                                  step={1}
                                  className="w-full"
                                />
                              </div>
                            )}

                            {device.settings?.brightness !== undefined && (
                              <div className="space-y-2">
                                <Label>Brightness: {device.settings.brightness}%</Label>
                                <Slider
                                  value={[device.settings.brightness ?? 50]}
                                  onValueChange={(value) => updateDeviceSetting(device.id, "brightness", value[0])}
                                  max={100}
                                  min={0}
                                  step={5}
                                  className="w-full"
                                />
                              </div>
                            )}

                            {device.settings?.speed !== undefined && (
                              <div className="space-y-2">
                                <Label>Speed Level: {device.settings.speed}</Label>
                                <Slider
                                  value={[device.settings.speed ?? 1]}
                                  onValueChange={(value) => updateDeviceSetting(device.id, "speed", value[0])}
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
                      <Button
                        variant="destructive"
                        size="icon"
                        className="h-8 w-8"
                        title="Remove device"
                        onClick={async () => {
                          setDevices((prev) => prev.filter((d) => d.id !== device.id))
                          toast({ title: "Device removed", description: `${device.name} has been removed.` })
                          if (useBackend) {
                            await handleDeleteDevice(device.id)
                          }
                        }}
                      >
                        <span className="sr-only">Remove</span>
                        ×
                      </Button>
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
                    const allOn = devices.every((d) => d.status === "on")
                    setDevices((prev) =>
                      prev.map((d) =>
                        allOn
                          ? { ...d, status: "off" as const, consumption: 0 }
                          : { ...d, status: "on" as const, consumption: d.power / 1000 }
                      )
                    )
                    toast({
                      title: allOn ? "All devices turned off" : "All devices turned on",
                      description: allOn
                        ? "Energy saving mode activated"
                        : "All devices are now powered on",
                    })
                  }}
                >
                  <Power className="w-5 h-5" />
                  <span className="text-xs">{devices.every((d) => d.status === "on") ? "All Off" : "All On"}</span>
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
