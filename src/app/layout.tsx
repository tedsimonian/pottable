import type React from "react"
import { Inter } from "next/font/google";
import { type Metadata } from "next";

import { TRPCReactProvider } from "~/trpc/react";

import "~/styles/globals.css";

export const metadata: Metadata = {
  title: "Pottable - AI-Powered Gardening Assistant",
  description: "Grow your perfect garden with AI assistance",
  icons: [{ rel: "icon", url: "/favicon.ico" }],
}

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter-sans",
});

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${inter.variable} h-full light`}>
      <body className="h-full w-full">
        <TRPCReactProvider>
          <div className="flex min-h-screen w-full flex-col">
          {children}
          </div>
        </TRPCReactProvider>
      </body>
    </html>
  );
}
