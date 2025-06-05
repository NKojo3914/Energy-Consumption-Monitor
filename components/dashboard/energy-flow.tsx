"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Home, Zap, Battery, Sun } from "lucide-react"

interface EnergyFlow {
  grid: number
  solar: number
  battery: number
  consumption: number
  batteryLevel: number
}

export function EnergyFlow() {
  const [flow, setFlow] = useState<EnergyFlow>({
    grid: 4.2,
    solar: 2.8,
    battery: -0.6,
    consumption: 6.4,
    batteryLevel: 78,
  })

  useEffect(() => {
    const interval = setInterval(() => {
      setFlow((prev) => ({
        grid: Math.max(0, prev.grid + (Math.random() - 0.5) * 0.5),
        solar: Math.max(0, prev.solar + (Math.random() - 0.5) * 0.3),
        battery: prev.battery + (Math.random() - 0.5) * 0.2,
        consumption: Math.max(0, prev.consumption + (Math.random() - 0.5) * 0.3),
        batteryLevel: Math.max(0, Math.min(100, prev.batteryLevel + (Math.random() - 0.5) * 2)),
      }))
    }, 2000)

    return () => clearInterval(interval)
  }, [])

  const FlowLine = ({ from, to, value, color }: { from: string; to: string; value: number; color: string }) => (
    <div
      className={`absolute border-2 ${color} opacity-70`}
      style={{
        animation: `flow-${Math.abs(value) > 0.1 ? "active" : "inactive"} 2s linear infinite`,
      }}
    >
      <div className={`w-2 h-2 rounded-full ${color.replace("border-", "bg-")} animate-pulse`} />
    </div>
  )

  return (
    <Card className="glass-card">
      <CardHeader>
        <CardTitle className="text-cyan-400 flex items-center gap-2">
          <Zap className="w-5 h-5" />
          Energy Flow
        </CardTitle>
        <CardDescription>Real-time energy distribution</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="relative h-80 flex items-center justify-center">
          {/* Central Home */}
          <div className="absolute z-10 w-20 h-20 rounded-full glass-card flex items-center justify-center">
            <Home className="w-8 h-8 text-cyan-400" />
          </div>

          {/* Grid */}
          <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 text-center">
            <div className="w-16 h-16 rounded-lg glass-card flex items-center justify-center mb-2">
              <Zap className="w-6 h-6 text-blue-400" />
            </div>
            <Badge variant="outline" className="text-xs">
              Grid: {flow.grid.toFixed(1)}kW
            </Badge>
          </div>

          {/* Solar */}
          <div className="absolute -top-4 -right-4 text-center">
            <div className="w-16 h-16 rounded-lg glass-card flex items-center justify-center mb-2">
              <Sun className="w-6 h-6 text-yellow-400" />
            </div>
            <Badge variant="outline" className="text-xs">
              Solar: {flow.solar.toFixed(1)}kW
            </Badge>
          </div>

          {/* Battery */}
          <div className="absolute -bottom-4 -left-4 text-center">
            <div className="w-16 h-16 rounded-lg glass-card flex items-center justify-center mb-2">
              <Battery className="w-6 h-6 text-green-400" />
            </div>
            <Badge variant="outline" className="text-xs">
              Battery: {flow.battery > 0 ? "+" : ""}
              {flow.battery.toFixed(1)}kW
            </Badge>
            <div className="text-xs text-muted-foreground mt-1">{flow.batteryLevel.toFixed(0)}%</div>
          </div>

          {/* Consumption Display */}
          <div className="absolute -bottom-4 right-1/2 transform translate-x-1/2 text-center">
            <Badge variant="secondary" className="text-sm">
              Total: {flow.consumption.toFixed(1)}kW
            </Badge>
          </div>

          {/* Animated Flow Lines */}
          <svg className="absolute inset-0 w-full h-full pointer-events-none">
            <defs>
              <marker id="arrowhead" markerWidth="10" markerHeight="7" refX="9" refY="3.5" orient="auto">
                <polygon points="0 0, 10 3.5, 0 7" fill="currentColor" />
              </marker>
            </defs>

            {/* Grid to Home */}
            <line
              x1="50%"
              y1="20%"
              x2="50%"
              y2="40%"
              stroke="rgb(59 130 246)"
              strokeWidth="3"
              markerEnd="url(#arrowhead)"
              className={flow.grid > 0.1 ? "animate-pulse" : "opacity-30"}
            />

            {/* Solar to Home */}
            <line
              x1="80%"
              y1="25%"
              x2="60%"
              y2="45%"
              stroke="rgb(250 204 21)"
              strokeWidth="3"
              markerEnd="url(#arrowhead)"
              className={flow.solar > 0.1 ? "animate-pulse" : "opacity-30"}
            />

            {/* Battery Flow */}
            <line
              x1="25%"
              y1="75%"
              x2="45%"
              y2="55%"
              stroke="rgb(34 197 94)"
              strokeWidth="3"
              markerEnd={flow.battery > 0 ? "url(#arrowhead)" : ""}
              markerStart={flow.battery < 0 ? "url(#arrowhead)" : ""}
              className={Math.abs(flow.battery) > 0.1 ? "animate-pulse" : "opacity-30"}
            />
          </svg>
        </div>

        {/* Energy Balance */}
        <div className="mt-6 p-4 rounded-lg bg-slate-800/50 border border-slate-700/50">
          <div className="flex justify-between items-center mb-2">
            <span className="text-sm text-slate-400">Energy Balance</span>
            <Badge variant={flow.grid > flow.solar ? "destructive" : "default"}>
              {flow.grid > flow.solar ? "Grid Dependent" : "Self Sufficient"}
            </Badge>
          </div>
          <div className="space-y-2 text-sm">
            <div className="flex justify-between">
              <span>Generation (Solar):</span>
              <span className="text-yellow-400">+{flow.solar.toFixed(1)}kW</span>
            </div>
            <div className="flex justify-between">
              <span>Grid Import:</span>
              <span className="text-blue-400">+{flow.grid.toFixed(1)}kW</span>
            </div>
            <div className="flex justify-between">
              <span>Battery:</span>
              <span className={flow.battery > 0 ? "text-red-400" : "text-green-400"}>
                {flow.battery > 0 ? "-" : "+"}
                {Math.abs(flow.battery).toFixed(1)}kW
              </span>
            </div>
            <hr className="border-slate-600" />
            <div className="flex justify-between font-semibold">
              <span>Total Consumption:</span>
              <span className="text-cyan-400">{flow.consumption.toFixed(1)}kW</span>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
