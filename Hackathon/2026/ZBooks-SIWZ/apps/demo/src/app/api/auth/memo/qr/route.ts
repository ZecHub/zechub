import { NextResponse } from "next/server";
import QRCode from "qrcode";

export const dynamic = "force-dynamic";

// GET ?uri=zcash:… → SVG QR. Server-side so the client doesn't ship a QR lib.
export async function GET(req: Request) {
  const url = new URL(req.url);
  const uri = url.searchParams.get("uri");
  if (!uri || !uri.startsWith("zcash:")) {
    return NextResponse.json({ error: "uri query param missing or not a zcash: URI" }, { status: 400 });
  }
  if (uri.length > 1200) {
    return NextResponse.json({ error: "uri too long for sensible QR rendering" }, { status: 400 });
  }
  const svg = await QRCode.toString(uri, {
    type: "svg",
    errorCorrectionLevel: "M",
    margin: 1,
    width: 256,
  });
  return new NextResponse(svg, {
    headers: {
      "content-type": "image/svg+xml; charset=utf-8",
      "cache-control": "private, no-store",
    },
  });
}
