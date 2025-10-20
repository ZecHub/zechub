import { NextResponse } from "next/server";
import { API_ENDPOINTS } from "@/lib/constants";

export async function GET() {
  // Redirect to the backend Discord OAuth endpoint
  return NextResponse.redirect(API_ENDPOINTS.AUTH.DISCORD);
}
