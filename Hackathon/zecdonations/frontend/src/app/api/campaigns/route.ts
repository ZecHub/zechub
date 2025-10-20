import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { db } from "@/lib/mockDb";
import { Campaign } from "@/lib/types";
import { API_ENDPOINTS } from "@/lib/constants";

export async function GET(req: Request) {
  try {
    const url = new URL(req.url);
    const qs = url.searchParams.toString();
    const backendUrl = `${API_ENDPOINTS.CAMPAIGNS}${qs ? `?${qs}` : ""}`;

    const response = await fetch(backendUrl, {
      method: "GET",
      headers: { "Content-Type": "application/json" },
      next: { revalidate: 60 },
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
    console.error("Error fetching campaigns:", error);
    return NextResponse.json(
      { success: false, error: "Failed to fetch campaigns" },
      { status: 500 }
    );
  }
}

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
    const normalizedCategory = (body.category || "general").toLowerCase();
    const response = await fetch(`${API_ENDPOINTS.CAMPAIGNS}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        cookie: incomingCookies,
        ...(authToken ? { Authorization: `Bearer ${authToken}` } : {}),
      },
      credentials: "include",
      body: JSON.stringify({
        title: body.title,
        description: body.description,
        target_amount: body.target_amount ?? body.goalZec ?? 0,
        category: normalizedCategory,
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
    console.error("Error creating campaign:", error);
    return NextResponse.json(
      { success: false, error: "Failed to create campaign" },
      { status: 500 }
    );
  }
}
