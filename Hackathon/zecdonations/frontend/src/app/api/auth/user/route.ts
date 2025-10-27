"use server";
import { API_ENDPOINTS } from "@/lib/constants";
import { NextResponse } from "next/server";

export async function GET(request: Request) {
  try {
    // Forward the request to the backend
    const incomingCookies = request.headers.get("cookie") || "";
    const authToken = incomingCookies
      .split("; ")
      .find((c) => c.startsWith("auth_token="))
      ?.split("=")[1];

    const response = await fetch(API_ENDPOINTS.AUTH.USER, {
      headers: {
        cookie: incomingCookies,
        ...(authToken ? { Authorization: `Bearer ${authToken}` } : {}),
      },
      credentials: "include",
    });

    const data = await response.json();

    // Create response
    const apiResponse = NextResponse.json(data);

    // Forward any cookies from the backend response
    response.headers.forEach((value, key) => {
      if (key.toLowerCase() === "set-cookie") {
        apiResponse.headers.append("Set-Cookie", value);
      }
    });

    apiResponse.cookies.set("discord_user", JSON.stringify(data.user), {
      httpOnly: false,
      maxAge: 24 * 60 * 60, // 24 hours
      path: "/",
    });

    return apiResponse;
  } catch (error) {
    console.error("Error fetching user:", error);
    return NextResponse.json(
      { success: false, error: "Failed to fetch user" },
      { status: 500 }
    );
  }
}
