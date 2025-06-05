"use client"

import { useState } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { LayoutDashboard, BarChart3, Zap, Settings, Bell, FileText, Menu, Leaf } from "lucide-react"

const navigation = [
  {
    name: "Dashboard",
    href: "/",
    icon: LayoutDashboard,
    description: "Overview and real-time monitoring",
  },
  {
    name: "Analytics",
    href: "/analytics",
    icon: BarChart3,
    description: "Detailed consumption analysis",
  },
  {
    name: "Devices",
    href: "/devices",
    icon: Zap,
    description: "Device management and control",
  },
  {
    name: "Efficiency",
    href: "/efficiency",
    icon: Leaf,
    description: "Energy optimization insights",
  },
  {
    name: "Alerts",
    href: "/alerts",
    icon: Bell,
    description: "Notifications and warnings",
  },
  {
    name: "Reports",
    href: "/reports",
    icon: FileText,
    description: "Generate detailed reports",
  },
  {
    name: "Settings",
    href: "/settings",
    icon: Settings,
    description: "App preferences and configuration",
  },
]

function SidebarContent() {
  const pathname = usePathname()

  return (
    <div className="flex h-full flex-col">
      <div className="flex h-16 items-center border-b border-white/10 px-6">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-cyan-400 to-blue-500 flex items-center justify-center">
            <Zap className="w-4 h-4 text-white" />
          </div>
          <span className="text-xl font-bold bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent">
            NeoEnergy
          </span>
        </div>
      </div>
      <ScrollArea className="flex-1 px-3 py-4">
        <nav className="space-y-2">
          {navigation.map((item) => {
            const isActive = pathname === item.href
            return (
              <Link key={item.name} href={item.href}>
                <Button
                  variant={isActive ? "secondary" : "ghost"}
                  className={cn(
                    "w-full justify-start gap-3 h-12 px-3",
                    isActive && "bg-cyan-500/20 text-cyan-400 border border-cyan-500/30",
                  )}
                >
                  <item.icon className="h-5 w-5" />
                  <div className="flex flex-col items-start">
                    <span className="text-sm font-medium">{item.name}</span>
                    <span className="text-xs text-muted-foreground">{item.description}</span>
                  </div>
                </Button>
              </Link>
            )
          })}
        </nav>
      </ScrollArea>
    </div>
  )
}

export function Sidebar() {
  return (
    <div className="hidden lg:flex lg:w-80 lg:flex-col lg:fixed lg:inset-y-0 lg:z-50">
      <div className="glass-card border-r">
        <SidebarContent />
      </div>
    </div>
  )
}

export function MobileSidebar() {
  const [open, setOpen] = useState(false)

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <Button variant="ghost" size="icon" className="lg:hidden">
          <Menu className="h-6 w-6" />
        </Button>
      </SheetTrigger>
      <SheetContent side="left" className="w-80 p-0 glass-card">
        <SidebarContent />
      </SheetContent>
    </Sheet>
  )
}
