import { NextResponse } from "next/server";
import { API_BASE_URL } from "@/lib/constants";

export async function GET(request: Request) {
  // Get the query parameters from the request URL
  const url = new URL(request.url);
  const code = url.searchParams.get("code");
  
  if (!code) {
    return NextResponse.redirect(new URL("/", request.url));
  }

  try {
    // Forward the code to the backend
    const response = await fetch(`${API_BASE_URL}/api/auth/discord/callback?code=${code}`, {
      credentials: "include",
      headers: {
        cookie: request.headers.get("cookie") || "",
      },
    });

    if (!response.ok) {
      console.error("Discord callback failed:", await response.text());
      return NextResponse.redirect(new URL("/?auth=failed", request.url));
    }

    // Get response data
    const data = await response.json();
    
    // Check if authentication was successful
    if (data.success && data.user) {
      // Create redirect response to dashboard
      const redirectResponse = NextResponse.redirect(new URL("/dashboard", request.url));
      
      // Store user data in a cookie for immediate access
      redirectResponse.cookies.set('discord_user', JSON.stringify(data.user), {
        httpOnly: false,
        maxAge: 24 * 60 * 60, // 24 hours
        path: '/',
      });
    
      // Forward any cookies from the backend response
      response.headers.forEach((value, key) => {
        if (key.toLowerCase() === 'set-cookie') {
          redirectResponse.headers.append('Set-Cookie', value);
        }
      });

      return redirectResponse;
    } else {
      // If authentication failed but response was ok, redirect to auth error
      return NextResponse.redirect(new URL("/?auth=invalid", request.url));
    }
  } catch (error) {
    console.error("Error during Discord callback:", error);
    return NextResponse.redirect(new URL("/?auth=error", request.url));
  }
}
