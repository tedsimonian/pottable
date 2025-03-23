"use client"

import Link from "next/link"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { User, Settings, LogOut, HelpCircle } from "lucide-react"

export function UserNav() {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="relative h-9 w-9 rounded-full">
          <Avatar className="h-9 w-9 border-2 border-garden-green">
            <AvatarImage src="/placeholder.svg?height=36&width=36" alt="User avatar" />
            <AvatarFallback className="bg-garden-lightGreen text-garden-green">
              <User className="h-5 w-5" />
            </AvatarFallback>
          </Avatar>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56 rounded-xl" align="end" forceMount>
        <DropdownMenuLabel>
          <div className="flex flex-col space-y-1">
            <p className="text-sm font-medium">Garden Enthusiast</p>
            <p className="text-xs text-muted-foreground">user@example.com</p>
          </div>
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          <DropdownMenuItem className="rounded-md cursor-pointer">
            <User className="mr-2 h-4 w-4 text-garden-green" />
            <span>Profile</span>
          </DropdownMenuItem>
          <DropdownMenuItem asChild className="rounded-md cursor-pointer">
            <Link href="/dashboard/settings">
              <Settings className="mr-2 h-4 w-4 text-garden-green" />
              <span>Settings</span>
            </Link>
          </DropdownMenuItem>
          <DropdownMenuItem asChild className="rounded-md cursor-pointer">
            <Link href="/dashboard/help">
              <HelpCircle className="mr-2 h-4 w-4 text-garden-green" />
              <span>Help & Support</span>
            </Link>
          </DropdownMenuItem>
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
        <DropdownMenuItem className="rounded-md cursor-pointer">
          <LogOut className="mr-2 h-4 w-4 text-garden-green" />
          <span>Log out</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}

