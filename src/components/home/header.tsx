import {
  Home,
  Layout,
  CheckSquare,
  MessageSquare,
  Menu,
  Leaf,
} from "lucide-react";

import { Button } from "~/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "~/components/ui/sheet";
import { InternalLink } from "~/components/common/internal-link";
import { Protected } from "~/components/common/protected";

import { companyName } from "~/lib/constants";

export const Header = () => {
  return (
    <header className="bg-background sticky top-0 z-50 w-full border-b">
      <div className="flex h-16 items-center justify-center gap-4 p-6">
        <Sheet>
          <SheetTrigger asChild>
            <Button variant="ghost" size="icon" className="md:hidden">
              <Menu className="h-6 w-6" />
              <span className="sr-only">Toggle menu</span>
            </Button>
          </SheetTrigger>
          <SheetContent side="left" className="w-64">
            <div className="flex h-16 items-center border-b">
              <InternalLink
                path="home"
                params={null}
                className="flex items-center gap-2 text-xl font-bold"
              >
                <Leaf className="text-primary h-6 w-6" />
                <span>{companyName}</span>
              </InternalLink>
            </div>
            <nav className="flex flex-col gap-4 py-4">
              <InternalLink
                path="home"
                params={null}
                className="hover:text-primary flex items-center gap-2 text-lg font-medium transition-colors"
              >
                <Home className="h-5 w-5" />
                Home
              </InternalLink>
              <InternalLink
                path="home"
                params={null}
                className="hover:text-primary flex items-center gap-2 text-lg font-medium transition-colors"
              >
                <Layout className="h-5 w-5" />
                Garden Planner
              </InternalLink>
              <InternalLink
                path="home"
                params={null}
                className="hover:text-primary flex items-center gap-2 text-lg font-medium transition-colors"
              >
                <CheckSquare className="h-5 w-5" />
                Tasks
              </InternalLink>
              <InternalLink
                path="home"
                params={null}
                className="hover:text-primary flex items-center gap-2 text-lg font-medium transition-colors"
              >
                <MessageSquare className="h-5 w-5" />
                AI Assistant
              </InternalLink>
            </nav>
          </SheetContent>
        </Sheet>
        <InternalLink
          path="home"
          params={null}
          className="hover:text-primary flex items-center gap-2 text-xl font-bold"
        >
          <Leaf className="text-primary h-6 w-6" />
          <span>{companyName}</span>
        </InternalLink>
        <nav className="hidden gap-4 md:flex md:items-center md:justify-center">
          <InternalLink
            path="home"
            params={null}
            className="hover:text-primary text-sm font-medium transition-colors"
          >
            Home
          </InternalLink>
          <InternalLink
            path="home"
            params={null}
            className="hover:text-primary text-sm font-medium transition-colors"
          >
            Garden Planner
          </InternalLink>
          <InternalLink
            path="home"
            params={null}
            className="hover:text-primary text-sm font-medium transition-colors"
          >
            Tasks
          </InternalLink>
          <InternalLink
            path="home"
            params={null}
            className="hover:text-primary text-sm font-medium transition-colors"
          >
            AI Assistant
          </InternalLink>
        </nav>
        <div className="ml-auto flex items-center">
          <Protected.Unauthenticated>
            <Button
              className="bg-primary hover:bg-primary/80 hidden sm:flex"
              asChild
            >
              <InternalLink path="sign_in" params={null}>
                Get Started
              </InternalLink>
            </Button>
          </Protected.Unauthenticated>
          <Protected.Authenticated>
            <Button
              className="bg-primary hover:bg-primary/80 hidden sm:flex"
              asChild
            >
              <InternalLink path="dashboard" params={null}>
                Dashboard
              </InternalLink>
            </Button>
          </Protected.Authenticated>
        </div>
      </div>
    </header>
  );
};
