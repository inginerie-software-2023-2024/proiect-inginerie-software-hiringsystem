import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatDate(date) {
  if (!date) {
    return "N/A";
  }

  const options = { day: "numeric", month: "long", year: "numeric" };
  return new Date(date).toLocaleDateString(undefined, options);
}

export function formatDateTime(date) {
  if (!date) {
    return "N/A";
  }

  const options = {
    day: "numeric",
    month: "long",
    year: "numeric",
    hour: "numeric",
    minute: "numeric",
    hour12: true,
    timeZoneName: "short",
  };

  return new Date(date).toLocaleDateString(undefined, options);
}

export function sleep(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}
