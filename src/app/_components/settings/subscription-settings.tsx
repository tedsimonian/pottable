"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { Check, CreditCard, Leaf, Zap } from "lucide-react"

export function SubscriptionSettings() {
  // Mock data - in a real app, this would come from your database or API
  const subscription = {
    plan: "Pro",
    status: "active",
    nextBillingDate: "July 1, 2023",
    amount: "$9.99",
    interval: "month",
    paymentMethod: {
      type: "card",
      last4: "4242",
      expiryMonth: 12,
      expiryYear: 2024,
      brand: "Visa",
    },
  }

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle>Current Plan</CardTitle>
              <CardDescription>You are currently on the {subscription.plan} plan</CardDescription>
            </div>
            <Badge variant="secondary" className="uppercase">
              {subscription.status}
            </Badge>
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="text-sm text-muted-foreground">Next billing date</div>
            <div className="font-medium">{subscription.nextBillingDate}</div>
          </div>
          <div className="flex items-center justify-between">
            <div className="text-sm text-muted-foreground">Billing amount</div>
            <div className="font-medium">
              {subscription.amount} / {subscription.interval}
            </div>
          </div>
        </CardContent>
        <CardFooter className="flex flex-col items-start space-y-2">
          <Button variant="outline" className="w-full">
            Change Plan
          </Button>
          <Button variant="ghost" className="w-full text-destructive hover:text-destructive">
            Cancel Subscription
          </Button>
        </CardFooter>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Payment Method</CardTitle>
          <CardDescription>Manage your payment method</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center space-x-4">
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10">
              <CreditCard className="h-5 w-5 text-primary" />
            </div>
            <div>
              <div className="font-medium">
                {subscription.paymentMethod.brand} •••• {subscription.paymentMethod.last4}
              </div>
              <div className="text-sm text-muted-foreground">
                Expires {subscription.paymentMethod.expiryMonth}/{subscription.paymentMethod.expiryYear}
              </div>
            </div>
          </div>
        </CardContent>
        <CardFooter>
          <Button variant="outline" className="w-full">
            Update Payment Method
          </Button>
        </CardFooter>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Available Plans</CardTitle>
          <CardDescription>Choose the best plan for your needs</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid gap-4 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
            <Card className="border-2">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Leaf className="h-5 w-5 text-primary" />
                  Basic
                </CardTitle>
                <CardDescription>For casual gardeners</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold">$0</div>
                <div className="text-sm text-muted-foreground">Free forever</div>
                <Separator className="my-4" />
                <ul className="space-y-2 text-sm">
                  <li className="flex items-center gap-2">
                    <Check className="h-4 w-4 text-primary flex-shrink-0" />
                    <span>Up to 2 gardens</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <Check className="h-4 w-4 text-primary flex-shrink-0" />
                    <span>Basic plant recommendations</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <Check className="h-4 w-4 text-primary flex-shrink-0" />
                    <span>Standard weather forecasts</span>
                  </li>
                </ul>
              </CardContent>
              <CardFooter>
                <Button variant="outline" className="w-full" disabled>
                  Current Plan
                </Button>
              </CardFooter>
            </Card>
            <Card className="border-2 border-primary">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="flex items-center gap-2">
                    <Zap className="h-5 w-5 text-primary" />
                    Pro
                  </CardTitle>
                  <Badge>Popular</Badge>
                </div>
                <CardDescription>For serious gardeners</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold">$9.99</div>
                <div className="text-sm text-muted-foreground">per month</div>
                <Separator className="my-4" />
                <ul className="space-y-2 text-sm">
                  <li className="flex items-center gap-2">
                    <Check className="h-4 w-4 text-primary flex-shrink-0" />
                    <span>Unlimited gardens</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <Check className="h-4 w-4 text-primary flex-shrink-0" />
                    <span>Advanced AI recommendations</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <Check className="h-4 w-4 text-primary flex-shrink-0" />
                    <span>Detailed weather forecasts</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <Check className="h-4 w-4 text-primary flex-shrink-0" />
                    <span>Pest and disease identification</span>
                  </li>
                </ul>
              </CardContent>
              <CardFooter>
                <Button className="w-full">Upgrade to Pro</Button>
              </CardFooter>
            </Card>
            <Card className="border-2">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Zap className="h-5 w-5 text-primary" />
                  Expert
                </CardTitle>
                <CardDescription>For professional growers</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold">$19.99</div>
                <div className="text-sm text-muted-foreground">per month</div>
                <Separator className="my-4" />
                <ul className="space-y-2 text-sm">
                  <li className="flex items-center gap-2">
                    <Check className="h-4 w-4 text-primary flex-shrink-0" />
                    <span>Everything in Pro</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <Check className="h-4 w-4 text-primary flex-shrink-0" />
                    <span>Priority support</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <Check className="h-4 w-4 text-primary flex-shrink-0" />
                    <span>Advanced analytics</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <Check className="h-4 w-4 text-primary flex-shrink-0" />
                    <span>Commercial use license</span>
                  </li>
                </ul>
              </CardContent>
              <CardFooter>
                <Button variant="outline" className="w-full">
                  Upgrade to Expert
                </Button>
              </CardFooter>
            </Card>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Billing History</CardTitle>
          <CardDescription>View your past invoices</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="rounded-md border">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between p-4 gap-2">
                <div>
                  <div className="font-medium">June 1, 2023</div>
                  <div className="text-sm text-muted-foreground">Pro Plan - Monthly</div>
                </div>
                <div className="flex items-center gap-4">
                  <div className="font-medium">$9.99</div>
                  <Button variant="outline" size="sm">
                    Download
                  </Button>
                </div>
              </div>
            </div>
            <div className="rounded-md border">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between p-4 gap-2">
                <div>
                  <div className="font-medium">May 1, 2023</div>
                  <div className="text-sm text-muted-foreground">Pro Plan - Monthly</div>
                </div>
                <div className="flex items-center gap-4">
                  <div className="font-medium">$9.99</div>
                  <Button variant="outline" size="sm">
                    Download
                  </Button>
                </div>
              </div>
            </div>
            <div className="rounded-md border">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between p-4 gap-2">
                <div>
                  <div className="font-medium">April 1, 2023</div>
                  <div className="text-sm text-muted-foreground">Pro Plan - Monthly</div>
                </div>
                <div className="flex items-center gap-4">
                  <div className="font-medium">$9.99</div>
                  <Button variant="outline" size="sm">
                    Download
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

