"use client";

import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";

export function CommentForm() {
  const [text, setText] = useState("");
  const [err, setErr] = useState<string | null>(null);
  const [pending, start] = useTransition();
  const router = useRouter();
  return (
    <form
      className="flex flex-col gap-2"
      onSubmit={(e) => {
        e.preventDefault();
        setErr(null);
        start(async () => {
          const r = await fetch("/api/comments", {
            method: "POST",
            headers: { "content-type": "application/json" },
            body: JSON.stringify({ text }),
          });
          const j = await r.json();
          if (!r.ok) { setErr(j.error ?? `HTTP ${r.status}`); return; }
          setText("");
          router.refresh();
        });
      }}
    >
      <textarea
        className="font-sans text-sm p-2 rounded border min-h-[4rem]"
        value={text}
        onChange={(e) => setText(e.target.value)}
        maxLength={500}
        placeholder="Say something only a Zcash holder can…"
      />
      <div className="flex justify-between items-center text-xs">
        <span className="opacity-60">{text.length}/500</span>
        <button type="submit" className="btn" disabled={pending || !text.trim()}>
          {pending ? "Posting…" : "Post"}
        </button>
      </div>
      {err && <div className="text-red-600 text-xs">{err}</div>}
    </form>
  );
}
