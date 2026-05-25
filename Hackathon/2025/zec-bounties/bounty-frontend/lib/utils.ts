import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatStatus(status: string) {
  return status
    .toLowerCase() // "to_do"
    .replace(/_/g, " ") // "to do"
    .replace(/\b\w/g, (c) => c.toUpperCase()); // "To Do"
}
