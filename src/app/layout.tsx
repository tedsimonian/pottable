import type React from "react";
import { Inter } from "next/font/google";
import { type Metadata } from "next";

import { TRPCReactProvider } from "~/trpc/react";
import { PostHogProvider } from "~/providers/posthog-provider";

import "~/styles/globals.css";

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

const RootLayout = ({ children }: RootLayoutProps) => {
  return (
    <html lang="en" className={`${inter.variable} light h-full`}>
      <body className="h-full w-full">
        <PostHogProvider>
          <TRPCReactProvider>
            <div className="flex min-h-screen w-full flex-col">{children}</div>
          </TRPCReactProvider>
        </PostHogProvider>
      </body>
    </html>
  );
};

export default RootLayout;
