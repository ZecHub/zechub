import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { addComment, listComments } from "@/lib/store";

export const dynamic = "force-dynamic";

export async function GET() {
  return NextResponse.json({ comments: listComments() });
}

export async function POST(req: Request) {
  const session = await getServerSession(authOptions);
  const address = (session?.user as { address?: string } | undefined)?.address;
  if (!address) return NextResponse.json({ error: "Not signed in" }, { status: 401 });
  const { text } = (await req.json().catch(() => ({}))) as { text?: string };
  if (!text?.trim()) return NextResponse.json({ error: "text required" }, { status: 400 });
  if (text.length > 500) return NextResponse.json({ error: "max 500 chars" }, { status: 400 });
  return NextResponse.json({ comment: addComment(address, text.trim()) });
}
