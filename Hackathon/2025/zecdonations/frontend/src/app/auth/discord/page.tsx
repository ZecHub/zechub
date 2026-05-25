import { redirect } from "next/navigation";
import { API_ENDPOINTS } from "@/lib/constants";

export default function DiscordAuthStartPage() {
  // Server-side redirect to the OAuth start route
  redirect(API_ENDPOINTS.AUTH.DISCORD);
}


