"use client";

import { useState } from "react";
import Link from "next/link";
import { Leaf, Menu, Bell, Search } from "lucide-react";

import { Button } from "~/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "~/components/ui/sheet";
import { Input } from "~/components/ui/input";
import { UserNav } from "~/components/dashboard/user-nav";

export const DashboardHeader = () => {
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 flex h-16 w-full items-center gap-4 border-b bg-white px-3 md:px-6">
      <Link href="/dashboard" className="flex items-center gap-2">
        <Leaf className="text-garden-green h-6 w-6" />
        <span className="text-garden-green truncate font-bold">Pottable</span>
      </Link>

      <div className="relative mx-4 hidden max-w-sm flex-1 md:flex">
        <Search className="text-muted-foreground absolute top-2.5 left-2.5 h-4 w-4" />
        <Input
          type="search"
          placeholder="Search plants, gardens..."
          className="bg-muted garden-input rounded-full border-none pl-8"
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
          className="border-garden-green text-garden-green hover:bg-garden-lightGreen hover:text-garden-green hover:border-garden-green hidden rounded-full md:flex"
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
                <Leaf className="text-garden-green h-6 w-6" />
                <span className="text-garden-green text-xl font-bold">
                  Pottable
                </span>
              </Link>
              <nav className="flex flex-col gap-2">
                <Button
                  variant="ghost"
                  asChild
                  onClick={() => setOpen(false)}
                  className="text-garden-green hover:bg-garden-lightGreen hover:bg-opacity-20 justify-start"
                >
                  <Link href="/dashboard">Dashboard</Link>
                </Button>
                <Button
                  variant="ghost"
                  asChild
                  onClick={() => setOpen(false)}
                  className="text-garden-green hover:bg-garden-lightGreen hover:bg-opacity-20 justify-start"
                >
                  <Link href="/dashboard/gardens">My Gardens</Link>
                </Button>
                <Button
                  variant="ghost"
                  asChild
                  onClick={() => setOpen(false)}
                  className="text-garden-green hover:bg-garden-lightGreen hover:bg-opacity-20 justify-start"
                >
                  <Link href="/dashboard/calendar">Calendar</Link>
                </Button>
              </nav>
            </div>
          </SheetContent>
        </Sheet>
      </div>
    </header>
  );
};
