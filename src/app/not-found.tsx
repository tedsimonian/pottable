"use client";

import { ArrowLeft } from "lucide-react";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";

import { Button } from "~/components/ui/button";

export default function NotFoundPage() {
  const router = useRouter();

  const handleGoBack = () => {
    router.back();
  };

  return (
    <div className="from-background to-muted/20 flex min-h-screen flex-col items-center justify-center bg-gradient-to-b px-4 text-center">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="max-w-md space-y-8"
      >
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 0.1, duration: 0.5 }}
          className="mx-auto w-full max-w-[200px]"
        >
          <NotFoundIllustration />
        </motion.div>

        <div className="space-y-3">
          <motion.h1
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.5 }}
            className="text-3xl font-bold tracking-tighter sm:text-4xl"
          >
            Page not found
          </motion.h1>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.5 }}
            className="text-muted-foreground"
          >
            Sorry, we couldn&apos;t find the page you&apos;re looking for.
          </motion.p>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.5 }}
          className="flex flex-col gap-2 sm:flex-row sm:justify-center"
        >
          <Button variant="default" asChild className="gap-2">
            <Button onClick={handleGoBack}>
              <ArrowLeft className="h-4 w-4" />
              Go Back
            </Button>
          </Button>
        </motion.div>
      </motion.div>
    </div>
  );
}

function NotFoundIllustration() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 500 500"
      fill="none"
      className="h-full w-full"
    >
      <motion.circle
        cx="250"
        cy="250"
        r="200"
        fill="currentColor"
        fillOpacity="0.05"
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ duration: 0.7, ease: "easeOut" }}
      />
      <motion.path
        d="M250 150V250L300 300"
        stroke="currentColor"
        strokeWidth="20"
        strokeLinecap="round"
        strokeLinejoin="round"
        initial={{ pathLength: 0 }}
        animate={{ pathLength: 1 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
      />
      <motion.path
        d="M175 350H325"
        stroke="currentColor"
        strokeWidth="20"
        strokeLinecap="round"
        initial={{ pathLength: 0 }}
        animate={{ pathLength: 1 }}
        transition={{ duration: 0.5, ease: "easeOut", delay: 0.3 }}
      />
      <motion.circle
        cx="250"
        cy="250"
        r="130"
        stroke="currentColor"
        strokeWidth="20"
        initial={{ pathLength: 0 }}
        animate={{ pathLength: 1 }}
        transition={{ duration: 1, ease: "easeOut" }}
      />
    </svg>
  );
}
