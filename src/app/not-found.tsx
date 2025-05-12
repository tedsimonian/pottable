"use client";

import { DotLottieReact } from "@lottiefiles/dotlottie-react";
import { ArrowLeft } from "lucide-react";
import { motion } from "motion/react";
import { useRouter } from "next/navigation";

import { Button } from "~/components/ui/button";
import { NOT_FOUND_LOTTIE_URL } from "~/lib/constants";

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
          <DotLottieReact
            src={NOT_FOUND_LOTTIE_URL}
            autoplay
            loop
            renderConfig={{
              autoResize: true,
            }}
          />
        </motion.div>

        <div className="z-50 -mt-10 space-y-3">
          <motion.h1
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.5 }}
            className="text-3xl font-bold tracking-tighter sm:text-4xl"
          >
            {"Page not found"}
          </motion.h1>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.5 }}
            className="text-muted-foreground"
          >
            {"Sorry, we couldn't find the page you're looking for."}
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
              {"Go Back"}
            </Button>
          </Button>
        </motion.div>
      </motion.div>
    </div>
  );
}
