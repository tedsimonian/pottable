import "server-only";

export const ERROR_TYPES = {
  NOT_FOUND: "NOT_FOUND",
  UNAUTHORIZED: "UNAUTHORIZED",
  FORBIDDEN: "FORBIDDEN",
  INTERNAL_SERVER_ERROR: "INTERNAL_SERVER_ERROR",
  BAD_REQUEST: "BAD_REQUEST",
  SIGN_IN_REQUIRED: "SIGN_IN_REQUIRED",
  GARDEN_CREATION_FAILED: "GARDEN_CREATION_FAILED",
  GARDEN_DELETION_FAILED: "GARDEN_DELETION_FAILED",
  GARDEN_NOT_FOUND: "GARDEN_NOT_FOUND",
} as const;

export type ErrorType = (typeof ERROR_TYPES)[keyof typeof ERROR_TYPES];

export type ErrorDetails = {
  type: ErrorType;
  message: string;
  statusCode: number;
};

export const ERRORS: Record<ErrorType, ErrorDetails> = {
  [ERROR_TYPES.NOT_FOUND]: {
    type: ERROR_TYPES.NOT_FOUND,
    message: "The requested resource was not found.",
    statusCode: 404,
  },
  [ERROR_TYPES.UNAUTHORIZED]: {
    type: ERROR_TYPES.UNAUTHORIZED,
    message: "You are not authorized to access this resource.",
    statusCode: 401,
  },
  [ERROR_TYPES.FORBIDDEN]: {
    type: ERROR_TYPES.FORBIDDEN,
    message: "You do not have permission to access this resource.",
    statusCode: 403,
  },
  [ERROR_TYPES.INTERNAL_SERVER_ERROR]: {
    type: ERROR_TYPES.INTERNAL_SERVER_ERROR,
    message: "An internal server error occurred.",
    statusCode: 500,
  },
  [ERROR_TYPES.BAD_REQUEST]: {
    type: ERROR_TYPES.BAD_REQUEST,
    message: "The request was invalid or cannot be served.",
    statusCode: 400,
  },
  [ERROR_TYPES.SIGN_IN_REQUIRED]: {
    type: ERROR_TYPES.SIGN_IN_REQUIRED,
    message: "You must be signed in.",
    statusCode: 401,
  },
  [ERROR_TYPES.GARDEN_CREATION_FAILED]: {
    type: ERROR_TYPES.GARDEN_CREATION_FAILED,
    message: "Failed to create garden. Please try again.",
    statusCode: 500,
  },
  [ERROR_TYPES.GARDEN_DELETION_FAILED]: {
    type: ERROR_TYPES.GARDEN_DELETION_FAILED,
    message: "Failed to delete garden. Double check the garden status.",
    statusCode: 500,
  },
  [ERROR_TYPES.GARDEN_NOT_FOUND]: {
    type: ERROR_TYPES.GARDEN_NOT_FOUND,
    message: "Garden not found.",
    statusCode: 504,
  },
};

export class CustomError extends Error {
  type: ErrorType;
  statusCode: number;

  constructor(details: ErrorDetails) {
    super(details.message);
    this.type = details.type;
    this.statusCode = details.statusCode;
    this.name = "CustomError";
  }
}

/**
 * Throw a custom error
 * @param type - The type of error to throw
 * @param customMessage - The custom message to throw
 * @example throwCustomError("NOT_FOUND") -> CustomError: The requested resource was not found.
 * @returns The custom error
 */
export const throwCustomError = (
  type: ErrorType,
  customMessage?: string,
): never => {
  const errorDetails = ERRORS[type];
  throw new CustomError({
    ...errorDetails,
    message: customMessage ?? errorDetails.message,
  });
};
