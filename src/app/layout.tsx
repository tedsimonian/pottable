import type React from "react";
import { cookies } from "next/headers";
import { Inter } from "next/font/google";
import { type Metadata } from "next";

import { Toaster } from "~/components/ui/sonner";

import { TRPCReactProvider } from "~/trpc/react";
import { PostHogProvider } from "~/providers/posthog-provider";
import { ThemeProvider } from "~/providers/theme-provider";
import { ActiveThemeProvider } from "~/providers/active-theme-provider";
import { META_THEME_COLORS } from "~/hooks/use-meta-color";

import "~/styles/globals.css";
import { cn } from "~/lib/utils";

export const metadata: Metadata = {
  title: "Pottable - AI-Powered Gardening Assistant",
  description: "Grow your perfect garden with AI assistance",
  icons: [{ rel: "icon", url: "/favicon.ico" }],
};

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter-sans",
});

type RootLayoutProps = {
  children: React.ReactNode;
};

export default async function RootLayout(props: RootLayoutProps) {
  const { children } = props;

  const cookieStore = await cookies();
  const activeThemeValue = cookieStore.get("active_theme")?.value;
  const isScaled = activeThemeValue?.endsWith("-scaled");

  return (
    <html
      lang="en"
      className={`${inter.variable} light h-full`}
      suppressHydrationWarning
    >
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `
              try {
                if (localStorage.theme === 'dark' || ((!('theme' in localStorage) || localStorage.theme === 'system') && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
                  document.querySelector('meta[name="theme-color"]').setAttribute('content', '${META_THEME_COLORS.dark}')
                }
              } catch (_) {}
            `,
          }}
        />
      </head>
      <body
        className={cn(
          "bg-background h-full w-full overscroll-none font-sans antialiased",
          activeThemeValue ? `theme-${activeThemeValue}` : "",
          isScaled ? "theme-scaled" : "",
          inter.variable,
        )}
      >
        <TRPCReactProvider>
          <PostHogProvider>
            <ThemeProvider
              attribute="class"
              defaultTheme="system"
              enableSystem
              disableTransitionOnChange
              enableColorScheme
            >
              <ActiveThemeProvider initialTheme={activeThemeValue}>
                <main className="flex min-h-screen w-full flex-col">
                  {children}
                </main>
                <Toaster />
              </ActiveThemeProvider>
            </ThemeProvider>
          </PostHogProvider>
        </TRPCReactProvider>
      </body>
    </html>
  );
}
