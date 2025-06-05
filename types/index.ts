// Core data types for the energy monitoring system
export interface User {
  id: string
  email: string
  name: string
  avatar?: string
  role: "admin" | "user"
  createdAt: string
  updatedAt: string
}

export interface Device {
  id: string
  name: string
  type: "hvac" | "lighting" | "appliance" | "solar" | "battery" | "ev_charger"
  location: string
  status: "online" | "offline" | "maintenance"
  currentPower: number // watts
  dailyConsumption: number // kWh
  monthlyConsumption: number // kWh
  efficiency: number // percentage
  lastSeen: string
  settings: DeviceSettings
  createdAt: string
  updatedAt: string
}

export interface DeviceSettings {
  autoOptimize: boolean
  scheduleEnabled: boolean
  schedule?: Schedule[]
  powerLimit?: number
  notifications: boolean
}

export interface Schedule {
  id: string
  dayOfWeek: number // 0-6
  startTime: string // HH:mm
  endTime: string // HH:mm
  action: "on" | "off" | "optimize"
  enabled: boolean
}

export interface EnergyData {
  timestamp: string
  consumption: number // kWh
  production?: number // kWh (for solar)
  cost: number // currency
  carbonFootprint: number // kg CO2
  efficiency: number // percentage
}

export interface Alert {
  id: string
  type: "high_usage" | "device_offline" | "efficiency_drop" | "cost_spike" | "maintenance"
  severity: "low" | "medium" | "high" | "critical"
  title: string
  message: string
  deviceId?: string
  isRead: boolean
  isResolved: boolean
  createdAt: string
  resolvedAt?: string
}

export interface Report {
  id: string
  name: string
  type: "daily" | "weekly" | "monthly" | "custom"
  format: "pdf" | "csv" | "excel"
  schedule?: ReportSchedule
  filters: ReportFilters
  createdAt: string
  lastGenerated?: string
}

export interface ReportSchedule {
  frequency: "daily" | "weekly" | "monthly"
  time: string // HH:mm
  recipients: string[]
  enabled: boolean
}

export interface ReportFilters {
  dateRange: {
    start: string
    end: string
  }
  devices?: string[]
  metrics: string[]
}

export interface Recommendation {
  id: string
  type: "energy_saving" | "cost_reduction" | "efficiency" | "maintenance"
  title: string
  description: string
  impact: {
    energySaving: number // kWh
    costSaving: number // currency
    carbonReduction: number // kg CO2
  }
  difficulty: "easy" | "medium" | "hard"
  estimatedTime: string
  deviceIds?: string[]
  isImplemented: boolean
  createdAt: string
}

// API Response types
export interface ApiResponse<T> {
  success: boolean
  data?: T
  error?: string
  message?: string
}

export interface PaginatedResponse<T> {
  data: T[]
  pagination: {
    page: number
    limit: number
    total: number
    totalPages: number
  }
}

// Form types
export interface DeviceFormData {
  name: string
  type: Device["type"]
  location: string
  settings: DeviceSettings
}

export interface UserProfileFormData {
  name: string
  email: string
  avatar?: string
}

export interface AlertRuleFormData {
  type: Alert["type"]
  threshold: number
  enabled: boolean
  notifications: boolean
}
