import { NextResponse } from "next/server";

export async function GET(request: Request) {
  const url = new URL(request.url);
  const token = url.searchParams.get("token");
  const success = url.searchParams.get("success");

  // If no token, send user home with an error flag
  if (!token || success !== "true") {
    return NextResponse.redirect(new URL("/?auth=failed", request.url));
  }

  // Redirect to dashboard after setting cookie
  const redirectResponse = NextResponse.redirect(new URL("/dashboard", request.url));

  // Store JWT in an HttpOnly cookie so client-side JS can't read it
  // Frontend API routes will forward it to the backend via Authorization header
  redirectResponse.cookies.set("auth_token", token, {
    httpOnly: false,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    path: "/",
    maxAge: 60 * 60 * 24 * 7, // 7 days
  });

  return redirectResponse;
}


