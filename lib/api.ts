// API client for backend communication
import type {
  User,
  UserProfileFormData,
  Device,
  DeviceFormData,
  EnergyData,
  PaginatedResponse,
  Report,
  Recommendation,
  Alert, // <-- import Alert from types
} from "../types" // <-- fix import path

// Set API_BASE_URL to Express backend, not Next.js
const API_BASE_URL = process.env.NEXT_PUBLIC_BACKEND_URL || "http://localhost:4000/api"

class ApiClient {
  private baseURL: string
  private token: string | null = null

  constructor(baseURL: string) {
    this.baseURL = baseURL
    // Get token from localStorage or cookies
    if (typeof window !== "undefined") {
      this.token = localStorage.getItem("auth_token")
    }
  }

  private async request<T>(endpoint: string, options: RequestInit = {}): Promise<T> {
    const url = `${this.baseURL}${endpoint}`
    const headers: Record<string, string> = {
      "Content-Type": "application/json",
      ...options.headers as Record<string, string>,
    }

    if (this.token) {
      headers.Authorization = `Bearer ${this.token}`
    }

    const response = await fetch(url, {
      ...options,
      headers,
    })

    if (!response.ok) {
      const error = await response.json().catch(() => ({ message: "Network error" }))
      throw new Error(error.message || `HTTP ${response.status}`)
    }

    return response.json()
  }

  // Auth methods
  async login(email: string, password: string) {
    const response = await this.request<{ token: string; user: User }>("/auth/login", {
      method: "POST",
      body: JSON.stringify({ email, password }),
    })

    this.token = response.token
    if (typeof window !== "undefined") {
      localStorage.setItem("auth_token", response.token)
    }

    return response
  }

  async logout() {
    await this.request("/auth/logout", { method: "POST" })
    this.token = null
    if (typeof window !== "undefined") {
      localStorage.removeItem("auth_token")
    }
  }

  public setToken(token: string | null) {
    this.token = token
  }

  // User methods
  async getProfile(): Promise<User> {
    return this.request<User>("/user/profile")
  }

  async updateProfile(data: Partial<UserProfileFormData>): Promise<User> {
    return this.request<User>("/user/profile", {
      method: "PUT",
      body: JSON.stringify(data),
    })
  }

  async deleteAccount() {
    return this.request<{ success: boolean; message: string }>("/user/delete", { method: "DELETE" })
  }

  // Device methods
  async getDevices(): Promise<Device[]> {
    // Get userId from token if available
    let userId: string | undefined = undefined;
    if (this.token) {
      try {
        // Decode JWT to get userId (payload is base64-encoded JSON)
        const payload = JSON.parse(atob(this.token.split('.')[1]));
        userId = payload.id;
      } catch (e) {}
    }
    const query = userId ? `?userId=${encodeURIComponent(userId)}` : '';
    return this.request<Device[]>(`/devices${query}`);
  }

  async getDevice(id: string): Promise<Device> {
    return this.request<Device>(`/devices/${id}`)
  }

  async createDevice(data: DeviceFormData): Promise<Device> {
    return this.request<Device>("/devices", {
      method: "POST",
      body: JSON.stringify(data),
    })
  }

  async updateDevice(id: string, data: Partial<DeviceFormData>): Promise<Device> {
    return this.request<Device>(`/devices/${id}`, {
      method: "PUT",
      body: JSON.stringify(data),
    })
  }

  async deleteDevice(id: string): Promise<void> {
    return this.request<void>(`/devices/${id}`, { method: "DELETE" })
  }

  // Energy data methods
  async getEnergyData(startDate: string, endDate: string, deviceId?: string): Promise<EnergyData[]> {
    const params = new URLSearchParams({
      startDate,
      endDate,
      ...(deviceId && { deviceId }),
    })
    return this.request<EnergyData[]>(`/energy/data?${params}`)
  }

  async getRealTimeData(): Promise<{
    currentUsage: number
    dailyTotal: number
    monthlyCost: number
    efficiency: number
  }> {
    return this.request("/energy/realtime")
  }

  // Alert methods
  async getAlerts(page = 1, limit = 20): Promise<PaginatedResponse<Alert>> {
    return this.request<PaginatedResponse<Alert>>(`/alerts?page=${page}&limit=${limit}`)
  }

  async markAlertAsRead(id: string): Promise<void> {
    return this.request<void>(`/alerts/${id}/read`, { method: "PUT" })
  }

  async resolveAlert(id: string): Promise<void> {
    return this.request<void>(`/alerts/${id}/resolve`, { method: "PUT" })
  }

  // Report methods
  async getReports(): Promise<Report[]> {
    return this.request<Report[]>("/reports")
  }

  async generateReport(id: string): Promise<{ downloadUrl: string }> {
    return this.request<{ downloadUrl: string }>(`/reports/${id}/generate`, {
      method: "POST",
    })
  }

  async createReport(data: Omit<Report, "id" | "createdAt">): Promise<Report> {
    return this.request<Report>("/reports", {
      method: "POST",
      body: JSON.stringify(data),
    })
  }

  // Recommendation methods
  async getRecommendations(): Promise<Recommendation[]> {
    return this.request<Recommendation[]>("/recommendations")
  }

  async implementRecommendation(id: string): Promise<void> {
    return this.request<void>(`/recommendations/${id}/implement`, {
      method: "PUT",
    })
  }
}

export const apiClient = new ApiClient(API_BASE_URL)
export default apiClient
