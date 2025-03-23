"use client"

import { Separator } from "@/components/ui/separator"

import type React from "react"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import { User, Bell, Leaf, Lock, CreditCard, Moon, LogOut } from "lucide-react"

interface SettingsSidebarProps extends React.HTMLAttributes<HTMLDivElement> {}

export function SettingsSidebar({ className, ...props }: SettingsSidebarProps) {
  const pathname = usePathname()

  const routes = [
    {
      href: "/dashboard/settings",
      label: "Profile",
      icon: User,
      exact: true,
    },
    {
      href: "/dashboard/settings/notifications",
      label: "Notifications",
      icon: Bell,
    },
    {
      href: "/dashboard/settings/garden-preferences",
      label: "Garden Preferences",
      icon: Leaf,
    },
    {
      href: "/dashboard/settings/account",
      label: "Account",
      icon: Lock,
    },
    {
      href: "/dashboard/settings/subscription",
      label: "Subscription",
      icon: CreditCard,
    },
    {
      href: "/dashboard/settings/appearance",
      label: "Appearance",
      icon: Moon,
    },
  ]

  const isActive = (href: string, exact = false) => {
    if (exact) {
      return pathname === href
    }
    return pathname === href || pathname.startsWith(`${href}/`)
  }

  return (
    <nav className={cn("flex flex-col space-y-1", className)} {...props}>
      {routes.map((route) => (
        <Button
          key={route.href}
          variant={isActive(route.href, route.exact) ? "secondary" : "ghost"}
          className="justify-start"
          asChild
        >
          <Link href={route.href} className="flex items-center gap-2">
            <route.icon className="h-5 w-5" />
            {route.label}
          </Link>
        </Button>
      ))}
      <Separator className="my-2" />
      <Button variant="ghost" className="justify-start text-destructive hover:text-destructive">
        <LogOut className="mr-2 h-5 w-5" />
        Log Out
      </Button>
    </nav>
  )
}

