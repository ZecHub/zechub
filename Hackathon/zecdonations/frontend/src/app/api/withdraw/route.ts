import { API_ENDPOINTS } from "@/lib/constants";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const body = await req.json();

    // Read JWT from HttpOnly cookie via Next headers API (more reliable than raw header)
    // Forward the request to the backend API
    const incomingCookies = req.headers.get("cookie") || "";
    const authToken = incomingCookies
      .split("; ")
      .find((c) => c.startsWith("auth_token="))
      ?.split("=")[1];
    const response = await fetch(`${API_ENDPOINTS.CAMPAIGNS}/my-campaigns/withdraw`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        cookie: incomingCookies,
        ...(authToken ? { Authorization: `Bearer ${authToken}` } : {}),
      },
      credentials: "include",
      body: JSON.stringify({
        wallet_id: body.wallet_id,
        to_address: body.to_address,
      }),
    });

    const text = await response.text();
    let data: any;
    try {
      data = JSON.parse(text);
    } catch {
      data = { success: false, error: "Invalid response from server" };
    }

    return NextResponse.json(data, { status: response.status });
  } catch (error) {
    console.error("Error send withdrawal:", error);
    return NextResponse.json(
      { success: false, error: "Failed to" },
      { status: 500 }
    );
  }
}