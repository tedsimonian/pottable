"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { BookOpen, Mail, MessageSquare } from "lucide-react"

export function HelpAndSupport() {
  return (
    <div className="space-y-6">
      <div className="grid gap-4 md:grid-cols-2">
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="flex items-center gap-2">
              <BookOpen className="h-5 w-5 text-primary" />
              Documentation
            </CardTitle>
            <CardDescription>Browse our comprehensive documentation</CardDescription>
          </CardHeader>
          <CardContent className="pb-3">
            <p className="text-sm text-muted-foreground">
              Our documentation covers everything from getting started to advanced gardening techniques.
            </p>
          </CardContent>
          <CardFooter>
            <Button variant="outline" className="w-full">
              View Documentation
            </Button>
          </CardFooter>
        </Card>
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="flex items-center gap-2">
              <MessageSquare className="h-5 w-5 text-primary" />
              Community Forum
            </CardTitle>
            <CardDescription>Connect with other gardeners</CardDescription>
          </CardHeader>
          <CardContent className="pb-3">
            <p className="text-sm text-muted-foreground">
              Ask questions, share tips, and learn from other gardeners in our community forum.
            </p>
          </CardContent>
          <CardFooter>
            <Button variant="outline" className="w-full">
              Visit Forum
            </Button>
          </CardFooter>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Frequently Asked Questions</CardTitle>
          <CardDescription>Quick answers to common questions</CardDescription>
        </CardHeader>
        <CardContent>
          <Accordion type="single" collapsible className="w-full">
            <AccordionItem value="item-1">
              <AccordionTrigger>How do I create a new garden?</AccordionTrigger>
              <AccordionContent>
                To create a new garden, go to the Gardens page and click on the "New Garden" button. Fill in the
                required information about your garden, such as name, location, and type.
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-2">
              <AccordionTrigger>How do I track my plants' growth?</AccordionTrigger>
              <AccordionContent>
                You can track your plants' growth by regularly updating their status in the plot details page. Our AI
                will also provide growth predictions based on your inputs and local weather conditions.
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-3">
              <AccordionTrigger>How do I get personalized planting recommendations?</AccordionTrigger>
              <AccordionContent>
                Our AI provides personalized planting recommendations based on your location, growing conditions, and
                preferences. Make sure your profile is complete with your growing zone and garden preferences for the
                most accurate recommendations.
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-4">
              <AccordionTrigger>Can I share my garden with others?</AccordionTrigger>
              <AccordionContent>
                Yes, you can share your garden with others by adjusting the privacy settings in your garden preferences.
                You can choose to make your garden public, private, or share it only with specific people.
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-5">
              <AccordionTrigger>How do I cancel my subscription?</AccordionTrigger>
              <AccordionContent>
                You can cancel your subscription at any time by going to the Subscription page in your settings. Follow
                the cancellation instructions and your subscription will be canceled at the end of the current billing
                period.
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Mail className="h-5 w-5 text-primary" />
            Contact Support
          </CardTitle>
          <CardDescription>Get in touch with our support team</CardDescription>
        </CardHeader>
        <CardContent>
          <form className="space-y-4">
            <div className="grid gap-4 sm:grid-cols-2">
              <div className="space-y-2">
                <label htmlFor="name" className="text-sm font-medium">
                  Name
                </label>
                <Input id="name" placeholder="Your name" />
              </div>
              <div className="space-y-2">
                <label htmlFor="email" className="text-sm font-medium">
                  Email
                </label>
                <Input id="email" type="email" placeholder="Your email" />
              </div>
            </div>
            <div className="space-y-2">
              <label htmlFor="subject" className="text-sm font-medium">
                Subject
              </label>
              <Input id="subject" placeholder="What's your issue about?" />
            </div>
            <div className="space-y-2">
              <label htmlFor="message" className="text-sm font-medium">
                Message
              </label>
              <Textarea
                id="message"
                placeholder="Describe your issue in detail"
                className="min-h-[120px] resize-none"
              />
            </div>
          </form>
        </CardContent>
        <CardFooter>
          <Button className="w-full">Send Message</Button>
        </CardFooter>
      </Card>
    </div>
  )
}

