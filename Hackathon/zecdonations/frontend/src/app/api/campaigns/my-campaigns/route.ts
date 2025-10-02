import { NextResponse } from "next/server";
import { API_ENDPOINTS } from "@/lib/constants";

export async function GET(req: Request) {
  try {
    // Forward the request to the backend API
    const incomingCookies = req.headers.get("cookie") || "";
    const authToken = incomingCookies
      .split("; ")
      .find((c) => c.startsWith("auth_token="))
      ?.split("=")[1];

    const response = await fetch(`${API_ENDPOINTS.CAMPAIGNS}/my-campaigns`, {
      method: "GET",
      headers: {
        cookie: incomingCookies,
        ...(authToken ? { Authorization: `Bearer ${authToken}` } : {}),
      },
      credentials: "include",
    });

    // Get the response data
    const responseText = await response.text();
    let data;
    try {
      data = JSON.parse(responseText);
    } catch (e) {
      console.error("Failed to parse response as JSON:", responseText);
      data = { success: false, error: "Invalid response from server" };
    }

    // Create the API response
    const apiResponse = NextResponse.json(data, { status: response.status });

    // Forward any cookies from the backend response
    response.headers.forEach((value, key) => {
      if (key.toLowerCase() === "set-cookie") {
        apiResponse.headers.append("Set-Cookie", value);
      }
    });

    return apiResponse;
  } catch (error) {
    console.error("Error fetching user campaigns:", error);
    return NextResponse.json(
      {
        success: false,
        error: "An error occurred while fetching user campaigns",
      },
      { status: 500 }
    );
  }
}
