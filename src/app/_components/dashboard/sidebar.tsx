"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { Button } from "@/components/ui/button"
import { LayoutDashboard, FlowerIcon, Calendar, ChevronLeft, ChevronRight } from "lucide-react"
import { useState, useEffect } from "react"
import { cn } from "@/lib/utils"

export function DashboardSidebar() {
  const pathname = usePathname()
  const [collapsed, setCollapsed] = useState(false)

  // Load collapsed state from localStorage on mount
  useEffect(() => {
    const savedState = localStorage.getItem("sidebarCollapsed")
    if (savedState !== null) {
      setCollapsed(savedState === "true")
    }
  }, [])

  // Save collapsed state to localStorage
  useEffect(() => {
    localStorage.setItem("sidebarCollapsed", String(collapsed))
  }, [collapsed])

  const isActive = (path: string) => {
    return pathname === path || pathname.startsWith(`${path}/`)
  }

  const routes = [
    {
      href: "/dashboard",
      label: "Dashboard",
      icon: LayoutDashboard,
    },
    {
      href: "/dashboard/gardens",
      label: "My Gardens",
      icon: FlowerIcon,
    },
    {
      href: "/dashboard/calendar",
      label: "Calendar",
      icon: Calendar,
    },
  ]

  return (
    <aside
      className={cn(
        "hidden md:flex md:flex-col sticky top-16 h-[calc(100vh-4rem)] border-r bg-white transition-all duration-300 ease-in-out",
        collapsed ? "w-16" : "w-64",
      )}
    >
      <nav className="mt-4 flex flex-col gap-2 px-2 overflow-y-auto">
        {routes.map((route) => (
          <Button
            key={route.href}
            variant={isActive(route.href) ? "default" : "ghost"}
            className={cn(
              "transition-all duration-200",
              isActive(route.href)
                ? "bg-garden-lightGreen text-garden-green hover:bg-garden-lightGreen hover:text-garden-green"
                : "text-gray-600 hover:bg-garden-lightGreen hover:bg-opacity-20 hover:text-garden-green",
              collapsed ? "justify-center w-10 h-10 p-0 mx-auto" : "justify-start rounded-lg",
            )}
            asChild
          >
            <Link href={route.href} className={cn("flex items-center", collapsed ? "gap-0" : "gap-2")}>
              <route.icon className="h-5 w-5" />
              {!collapsed && <span>{route.label}</span>}
            </Link>
          </Button>
        ))}
      </nav>

      <Button
        variant="ghost"
        size="icon"
        onClick={() => setCollapsed(!collapsed)}
        className="absolute -right-3 top-10 h-6 w-6 rounded-full border bg-white shadow-md text-garden-green hover:bg-garden-lightGreen hover:text-garden-green"
        aria-label={collapsed ? "Expand sidebar" : "Collapse sidebar"}
      >
        {collapsed ? <ChevronRight className="h-3 w-3" /> : <ChevronLeft className="h-3 w-3" />}
      </Button>
    </aside>
  )
}

