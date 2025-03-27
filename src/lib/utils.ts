import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

/**
 * Merge class names
 * @param inputs - The class names to merge
 * @example ["text-red-500", "bg-blue-500"] -> "text-red-500 bg-blue-500"
 * @returns The merged class names
 */
export const cn = (...inputs: ClassValue[]) => {
  return twMerge(clsx(inputs));
};

/**
 * Pluralize a time unit
 * @param time - The time to pluralize
 * @param unit - The unit to pluralize
 * @example 1 day -> "1 day"
 * @returns The pluralized time unit
 */
export const pluralize = (
  time: number,
  unit: "day" | "d" | "hour" | "hr" | "min" | "minute" | "sec" | "second",
) => {
  if (time === 1) {
    return `${unit}`;
  } else {
    if (unit === "d") {
      return `${unit}`;
    }
    return `${unit}s`;
  }
};

/**
 * Get the initials of a name
 * @param name - The name to get the initials from
 * @example "John Doe" -> "JD"
 * @returns The initials of the name
 */
export const getInitials = (name: string) => {
  const names = name.split(" ");
  const initials = names
    .map((n) => n[0])
    .join("")
    .slice(0, 3);
  return initials;
};

/**
 * Get the current year
 * @returns The current year
 */
export const getCurrentYear = () => {
  const date = new Date();
  return date.getFullYear();
};

/**
 * Get the current hour
 * @returns The current hour
 */
export const getCurrentHour = () => {
  const date = new Date();
  return date.getHours();
};

/**
 * Print a date as a string in the user's locale
 * @param date - The date to print
 * @param options - The options to pass to the date formatter
 * @example new Date() -> "Monday, June 10, 2024"
 * @returns The date as a string
 */
export const printLocalDateString = (
  date: Date,
  options?: Intl.DateTimeFormatOptions,
) => {
  const _options: Intl.DateTimeFormatOptions = options ?? {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  };
  return date.toLocaleDateString("en-US", _options);
};

/**
 * Format a number with commas
 * @param number - The number to format
 * @example 1000 -> "1,000"
 * @returns The formatted number
 */
export const formatNumber = (number: number) =>
  Intl.NumberFormat("en-US").format(number);

/**
 * Get the base URL
 * @returns The base URL
 */
export const getBaseUrl = () => {
  if (typeof window !== "undefined") return window.location.origin;
  if (process.env.VERCEL_URL) return `https://${process.env.VERCEL_URL}`;
  return `http://localhost:${process.env.PORT ?? 3000}`;
};
