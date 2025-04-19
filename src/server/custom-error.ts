import "server-only";
import { TRPCError } from "@trpc/server";
import type { TRPC_ERROR_CODE_KEY } from "@trpc/server/rpc";

type ErrorDetails = {
  code: TRPC_ERROR_CODE_KEY;
  message: string;
};

export const ERROR_CONFIG = {
  GARDEN_CREATION_FAILED: {
    code: "INTERNAL_SERVER_ERROR",
    message: "Failed to create garden. Please try again.",
  },
  GARDEN_DELETION_FAILED: {
    code: "INTERNAL_SERVER_ERROR",
    message: "Failed to delete garden. Double check the garden status.",
  },
  GARDEN_UPDATE_FAILED: {
    code: "INTERNAL_SERVER_ERROR",
    message: "Failed to update garden. Please try again.",
  },
  GARDEN_NOT_FOUND: {
    code: "NOT_FOUND",
    message: "Garden not found.",
  },
  GARDEN_UNAUTHORIZED: {
    code: "NOT_FOUND",
    message: "Garden not found or unauthorized",
  },
  DATABASE_ERROR: {
    code: "INTERNAL_SERVER_ERROR",
    message: "Database error occurred",
  },
} satisfies Record<string, ErrorDetails>;

// Derive types from the config
export type CustomErrorType = keyof typeof ERROR_CONFIG;

/**
 * Throw a TRPC error
 * @param typeOrCode - Either a custom error type or a direct TRPC error code
 * @param customMessage - Optional custom message to override default message
 * @example
 * throwTRPCError("GARDEN_NOT_FOUND") -> TRPCError: Garden not found.
 * throwTRPCError("BAD_REQUEST", "Invalid garden parameters provided")
 * @returns never - This function always throws
 */
export const throwTRPCError = (
  typeOrCode: CustomErrorType | TRPC_ERROR_CODE_KEY,
  customMessage?: string,
): never => {
  // Check if the type is a custom error type
  if (typeOrCode in ERROR_CONFIG) {
    const errorConfig = ERROR_CONFIG[typeOrCode as CustomErrorType];
    throw new TRPCError({
      code: errorConfig.code,
      message: customMessage ?? errorConfig.message,
    });
  }

  // Handle direct TRPC error code
  throw new TRPCError({
    code: typeOrCode as TRPC_ERROR_CODE_KEY,
    message: customMessage ?? "An error occurred",
  });
};
