import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function truncateMiddle(value: string, visible = 6) {
  if (value.length <= visible * 2) return value;
  return `${value.slice(0, visible)}…${value.slice(-visible)}`;
}

// Resolve a creator avatar URL based on Discord data and anonymity rules
// - If creator name is Anonymous -> always use local default avatar
// - If avatar hash missing/default -> use DiceBear identicon seeded from a stable id
// - Otherwise construct Discord CDN URL (gif for a_*)
export function getCreatorAvatarUrl(opts: {
  discordId?: string;
  avatar?: string;
  creatorName?: string;
  creatorHandle?: string;
  seedFallback?: string | number;
}): string {
  const { discordId, avatar, creatorName, creatorHandle, seedFallback } = opts;
  const isAnonymous = (creatorName || "").toLowerCase() === "anonymous";
  if (isAnonymous) return "/default-avatar.svg";

  const isUndefinedHandle = (creatorHandle || "").includes("undefined");
  const isDefaultAvatar =
    avatar === "/default-avatar.png" || avatar === "/default-avatar.svg";

  if (!avatar || isDefaultAvatar || isUndefinedHandle) {
    const seed = String(discordId || seedFallback || creatorName || "anon");
    return `https://api.dicebear.com/7.x/identicon/svg?seed=${encodeURIComponent(
      seed
    )}`;
  }

  if (avatar.startsWith("http")) return avatar;
  if (!discordId) {
    const seed = String(seedFallback || creatorName || "anon");
    return `https://api.dicebear.com/7.x/identicon/svg?seed=${encodeURIComponent(
      seed
    )}`;
  }

  const ext = avatar.startsWith("a_") ? "gif" : "png";
  return `https://cdn.discordapp.com/avatars/${discordId}/${avatar}.${ext}?size=64`;
}

export function getAuthToken() {
  const token = document.cookie
    .split("; ")
    .find((row) => row.startsWith("auth_token="))
    ?.split("=")[1];

  if (!token) {
    console.log("No auth_token cookie found");
    return null;
  }

  return decodeURIComponent(token).trim();
}
