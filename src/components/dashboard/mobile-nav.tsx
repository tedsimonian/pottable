"use client";

import { useState } from "react";
import Link from "next/link";
import {
  LayoutDashboard,
  FlowerIcon,
  Calendar,
  Settings,
  HelpCircle,
  Menu,
} from "lucide-react";
import { usePathname } from "next/navigation";

import { Button } from "~/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "~/components/ui/sheet";

export const MobileNav = () => {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

  const isActive = (path: string) => {
    return pathname === path || pathname.startsWith(`${path}/`);
  };

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
    {
      href: "/dashboard/settings",
      label: "Settings",
      icon: Settings,
    },
    {
      href: "/dashboard/help",
      label: "Help & Support",
      icon: HelpCircle,
    },
  ];

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <Button variant="outline" size="icon" className="md:hidden">
          <Menu className="h-5 w-5" />
          <span className="sr-only">Toggle navigation menu</span>
        </Button>
      </SheetTrigger>
      <SheetContent side="left" className="w-72 p-0">
        <div className="flex flex-col gap-4 p-6">
          <div className="flex items-center gap-2">
            <FlowerIcon className="text-primary h-6 w-6" />
            <span className="text-xl font-bold">Pottable</span>
          </div>
          <nav className="flex flex-col gap-2">
            {routes.map((route) => (
              <Button
                key={route.href}
                variant={isActive(route.href) ? "secondary" : "ghost"}
                className="justify-start"
                asChild
                onClick={() => setOpen(false)}
              >
                <Link href={route.href} className="flex items-center gap-2">
                  <route.icon className="h-5 w-5" />
                  {route.label}
                </Link>
              </Button>
            ))}
          </nav>
        </div>
      </SheetContent>
    </Sheet>
  );
};
