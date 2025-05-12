"use client";

import { useEffect } from "react";
import { DotLottieReact } from "@lottiefiles/dotlottie-react";
import { HomeIcon, RefreshCcw, ArrowLeft } from "lucide-react";
import { motion } from "motion/react";

import { Button } from "~/components/ui/button";
import { InternalLink } from "~/components/common/internal-link";
import { ERROR_LOTTIE_URL } from "~/lib/constants";

type ErrorProps = {
  error: Error & {
    digest?: string;
  };
  reset: () => void;
};

export default function ErrorPage(props: ErrorProps) {
  const { error, reset } = props;

  useEffect(() => {
    // TODO: Log the error to an error reporting service
    console.error(error);
  }, [error]);

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
            src={ERROR_LOTTIE_URL}
            autoplay
            loop
            renderConfig={{
              autoResize: true,
            }}
          />
        </motion.div>

        <div className="space-y-3">
          <motion.h1
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.5 }}
            className="text-3xl font-bold tracking-tighter sm:text-4xl"
          >
            {"Something went wrong"}
          </motion.h1>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.5 }}
            className="text-muted-foreground"
          >
            {"We apologize for the inconvenience. An unexpected error has"}{" "}
            <span className="text-primary">{"occurred."}</span>
          </motion.p>

          {error.digest && (
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4, duration: 0.5 }}
              className="text-muted-foreground/70 text-sm"
            >
              {"Error ID: "} {error.digest}
            </motion.p>
          )}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.5 }}
          className="flex flex-col gap-2 sm:flex-row sm:justify-center"
        >
          <Button onClick={reset} variant="default" className="gap-2">
            <RefreshCcw className="h-4 w-4" />
            {"Try again"}
          </Button>
          <Button variant="outline" asChild className="gap-2">
            <InternalLink path="home" params={null}>
              <HomeIcon className="h-4 w-4" />
              {"Back to home"}
            </InternalLink>
          </Button>
          <Button
            variant="ghost"
            onClick={() => window.history.back()}
            className="gap-2"
          >
            <ArrowLeft className="h-4 w-4" />
            {"Go back"}
          </Button>
        </motion.div>
      </motion.div>
    </div>
  );
}
