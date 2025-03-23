"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Leaf, Menu, Bell, Search } from "lucide-react"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { useState } from "react"
import { Input } from "@/components/ui/input"
import { UserNav } from "@/components/dashboard/user-nav"

export function DashboardHeader() {
  const [open, setOpen] = useState(false)

  return (
    <header className="sticky top-0 z-50 flex h-16 w-full items-center gap-4 border-b bg-white px-3 md:px-6">
      <Link href="/dashboard" className="flex items-center gap-2">
        <Leaf className="h-6 w-6 text-garden-green" />
        <span className="font-bold truncate text-garden-green">Pottable</span>
      </Link>

      <div className="hidden md:flex relative max-w-sm flex-1 mx-4">
        <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
        <Input
          type="search"
          placeholder="Search plants, gardens..."
          className="pl-8 rounded-full bg-muted border-none garden-input"
        />
      </div>

      <div className="ml-auto flex items-center gap-2 md:gap-4">
        <Button variant="ghost" size="icon" className="text-garden-green">
          <Bell className="h-5 w-5" />
          <span className="sr-only">Notifications</span>
        </Button>

        <Button
          variant="outline"
          size="sm"
          asChild
          className="hidden md:flex rounded-full border-garden-green text-garden-green hover:bg-garden-lightGreen hover:text-garden-green hover:border-garden-green"
        >
          <Link href="/dashboard/gardens">My Gardens</Link>
        </Button>

        <UserNav />

        <Sheet open={open} onOpenChange={setOpen}>
          <SheetTrigger asChild>
            <Button variant="outline" size="icon" className="md:hidden">
              <Menu className="h-5 w-5" />
              <span className="sr-only">Toggle navigation menu</span>
            </Button>
          </SheetTrigger>
          <SheetContent side="left" className="w-72 p-0">
            <div className="flex flex-col gap-4 p-6">
              <Link href="/dashboard" className="flex items-center gap-2">
                <Leaf className="h-6 w-6 text-garden-green" />
                <span className="text-xl font-bold text-garden-green">Pottable</span>
              </Link>
              <nav className="flex flex-col gap-2">
                <Button
                  variant="ghost"
                  asChild
                  onClick={() => setOpen(false)}
                  className="justify-start text-garden-green hover:bg-garden-lightGreen hover:bg-opacity-20"
                >
                  <Link href="/dashboard">Dashboard</Link>
                </Button>
                <Button
                  variant="ghost"
                  asChild
                  onClick={() => setOpen(false)}
                  className="justify-start text-garden-green hover:bg-garden-lightGreen hover:bg-opacity-20"
                >
                  <Link href="/dashboard/gardens">My Gardens</Link>
                </Button>
                <Button
                  variant="ghost"
                  asChild
                  onClick={() => setOpen(false)}
                  className="justify-start text-garden-green hover:bg-garden-lightGreen hover:bg-opacity-20"
                >
                  <Link href="/dashboard/calendar">Calendar</Link>
                </Button>
              </nav>
            </div>
          </SheetContent>
        </Sheet>
      </div>
    </header>
  )
}

