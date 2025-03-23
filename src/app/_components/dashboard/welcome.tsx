"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { ArrowRight, Plus } from "lucide-react"
import Link from "next/link"

export function DashboardWelcome() {
  return (
    <Card className="garden-card border-none">
      <CardHeader className="pb-3 bg-gradient-to-r from-garden-teal to-garden-green text-white rounded-t-xl">
        <CardTitle className="text-2xl">Welcome to Pottable!</CardTitle>
        <CardDescription className="text-white text-opacity-90">
          Your AI-powered gardening assistant is ready to help you grow.
        </CardDescription>
      </CardHeader>
      <CardContent className="grid gap-4 p-6">
        <div className="flex flex-col gap-2 md:flex-row md:items-center md:justify-between">
          <div className="text-sm text-muted-foreground">You have 2 gardens with 5 active plots.</div>
          <div className="flex gap-2">
            <Button asChild className="garden-button">
              <Link href="/dashboard/gardens">
                <Plus className="mr-2 h-4 w-4" />
                Create New Garden
              </Link>
            </Button>
            <Button
              variant="outline"
              asChild
              className="rounded-full border-garden-green text-garden-green hover:bg-garden-lightGreen hover:text-garden-green hover:border-garden-green"
            >
              <Link href="/dashboard/calendar">
                View Calendar
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

