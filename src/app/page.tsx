import type React from "react";
import { Suspense } from "react";
import Link from "next/link";
import {
  ArrowRight,
  Leaf,
  Calendar,
  MessageSquare,
  Layout,
} from "lucide-react";

import { Button } from "~/components/ui/button";
import { GardenWidget } from "~/components/home/garden-widget";
import { TasksWidget } from "~/components/home/tasks-widget";
import { WeatherWidget } from "~/components/home/weather-widget";
import { FeatureCard } from "~/components/home/feature-card";
import { Footer } from "~/components/home/footer";
import { Header } from "~/components/home/header";

export default function HomePage() {
  return (
    <main className="flex min-h-screen flex-col">
      <Header />
      {/* Hero Section */}
      <section className="from-accent to-background bg-gradient-to-b px-4 py-20 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-5xl text-center">
          <div className="bg-accent mb-4 inline-flex items-center justify-center rounded-full p-2">
            <Leaf className="text-primary mr-2 h-5 w-5" />
            <span className="text-primary text-sm font-medium">
              AI-Powered Garden Planning
            </span>
          </div>
          <h1 className="text-foreground mb-6 text-4xl font-bold md:text-6xl">
            Grow Your Dream Garden{" "}
            <span className="text-primary">Effortlessly</span>
          </h1>
          <p className="text-muted-foreground mx-auto mb-8 max-w-3xl text-xl">
            Let our AI assistant help you design, plan, and maintain your
            perfect garden with personalized recommendations and automated task
            generation.
          </p>
          <div className="flex flex-col justify-center gap-4 sm:flex-row">
            <Button size="lg">
              <Link href="/garden-planner" className="flex items-center">
                Start Planning <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
            <Button size="lg" variant="outline">
              <Link href="/ai-assistant" className="flex items-center">
                Ask Garden AI <MessageSquare className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="bg-background px-4 py-16 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <h2 className="text-foreground mb-12 text-center text-3xl font-bold">
            How GardenAI Works
          </h2>
          <div className="grid gap-8 md:grid-cols-3">
            <FeatureCard
              icon={<Layout className="text-primary h-8 w-8" />}
              title="Design Your Garden"
              description="Easily create and visualize your garden layout with our intuitive drag-and-drop planner."
            />
            <FeatureCard
              icon={<MessageSquare className="text-primary h-8 w-8" />}
              title="Get AI Recommendations"
              description="Our AI assistant suggests optimal plants based on your climate, space, and preferences."
            />
            <FeatureCard
              icon={<Calendar className="text-primary h-8 w-8" />}
              title="Follow Generated Tasks"
              description="Receive personalized to-do lists and reminders for planting, watering, and harvesting."
            />
          </div>
        </div>
      </section>

      {/* Dashboard Preview */}
      <section className="bg-accent px-4 py-16 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <h2 className="text-accent-foreground mb-12 text-center text-3xl font-bold">
            Your Garden Dashboard
          </h2>
          <div className="bg-card overflow-hidden rounded-xl shadow-lg">
            <div className="border-border border-b p-6">
              <h3 className="text-card-foreground text-xl font-semibold">
                Garden Overview
              </h3>
            </div>
            <div className="grid gap-6 p-6 md:grid-cols-3">
              <Suspense
                fallback={
                  <div className="bg-muted h-48 animate-pulse rounded-lg"></div>
                }
              >
                <GardenWidget />
              </Suspense>
              <Suspense
                fallback={
                  <div className="bg-muted h-48 animate-pulse rounded-lg"></div>
                }
              >
                <TasksWidget />
              </Suspense>
              <Suspense
                fallback={
                  <div className="bg-muted h-48 animate-pulse rounded-lg"></div>
                }
              >
                <WeatherWidget />
              </Suspense>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-primary text-primary-foreground px-4 py-16 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-4xl text-center">
          <h2 className="mb-6 text-3xl font-bold">
            Ready to grow your perfect garden?
          </h2>
          <p className="text-muted mb-8 text-lg">
            Join thousands of gardeners who are using AI to simplify their
            gardening journey.
          </p>
          <Button size="lg" variant="secondary">
            <Link href="/garden-planner">Get Started for Free</Link>
          </Button>
        </div>
      </section>
      <Footer />
    </main>
  );
}
