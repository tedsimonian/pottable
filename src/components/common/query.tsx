import React from "react";
import { cn } from "~/lib/utils";

import type { AppRouter } from "~/server/api";
import type { TRPCClientErrorLike } from "@trpc/react-query";

interface QueryProps<T> {
  data: T | undefined | null;
  loading: boolean;
  error?: Error | TRPCClientErrorLike<AppRouter> | null;
  children: (data: T) => React.ReactNode;
  loadingComponent?: React.ReactNode;
  errorComponent?: React.ReactNode;
  fallbackComponent?: React.ReactNode;
  className?: string;
}

export const Query = <T,>({
  data,
  loading,
  error,
  children,
  loadingComponent,
  errorComponent,
  fallbackComponent,
  className,
}: QueryProps<T>) => {
  // Show loading state
  if (loading) {
    return (
      <div className={cn("w-full", className)}>
        {loadingComponent ?? (
          <div className="flex items-center justify-center p-4">
            <div className="border-primary h-6 w-6 animate-spin rounded-full border-2 border-t-transparent" />
          </div>
        )}
      </div>
    );
  }

  // Show error state
  if (error) {
    return (
      <div className={cn("w-full", className)}>
        {errorComponent ?? (
          <div className="text-destructive flex items-center justify-center p-4">
            <p>{error.message || "An error occurred"}</p>
          </div>
        )}
      </div>
    );
  }

  // Show no data state
  if (!data || (Array.isArray(data) && data.length === 0)) {
    return (
      <div className={cn("w-full", className)}>
        {fallbackComponent ?? (
          <div className="text-muted-foreground flex items-center justify-center p-4">
            <p>No data available</p>
          </div>
        )}
      </div>
    );
  }

  // Render children with guaranteed data
  return <>{children(data)}</>;
};
