"use server";
import { API_ENDPOINTS } from "@/lib/constants";
import { NextResponse } from "next/server";

export async function GET(request: Request) {
  try {
    // Forward the request to the backend
    const response = await fetch(API_ENDPOINTS.AUTH.LOGOUT, {
      headers: {
        cookie: request.headers.get("cookie") || "",
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
    apiResponse.cookies.set("auth_token", "", {
      httpOnly: true,
      sameSite: "lax",
      secure: process.env.NODE_ENV === "production",
      path: "/",
      maxAge: 0, // This removes the cookie
    });
    apiResponse.cookies.set("discord_user", "", {
      httpOnly: true,
      sameSite: "lax",
      secure: process.env.NODE_ENV === "production",
      path: "/",
      maxAge: 0, // This removes the cookie
    });

    return apiResponse;
  } catch (error) {
    console.error("Error during logout:", error);
    return NextResponse.json(
      { success: false, error: "Failed to logout" },
      { status: 500 }
    );
  }
}
