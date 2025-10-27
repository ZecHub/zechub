import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  const cookies = request.headers.get("cookie") || "";
  
  return NextResponse.json({
    cookies: cookies,
    cookieArray: cookies.split('; ').map(cookie => {
      const [name, value] = cookie.split('=');
      return { name, value: value?.substring(0, 50) + (value?.length > 50 ? '...' : '') };
    }),
    userAgent: request.headers.get("user-agent"),
    origin: request.headers.get("origin"),
    referer: request.headers.get("referer")
  });
}
