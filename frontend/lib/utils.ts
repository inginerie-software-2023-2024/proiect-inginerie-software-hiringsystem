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

export function formatTimeForInterview(minutes: number) {
  const hours = Math.floor(minutes / 60);
  const remainingMinutes = minutes % 60;
  return `${hours}:${remainingMinutes < 10 ? "0" : ""}${remainingMinutes} (UTC)`;
}
