import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { listComments } from "@/lib/store";
import { SignInClient, SignOutButton } from "./SignInClient";
import { CommentForm } from "./CommentForm";

export const dynamic = "force-dynamic";

export default async function Home() {
  const session = await getServerSession(authOptions);
  const address = session?.user?.address;
  const comments = listComments();

  return (
    <>
      {address ? (
        <section className="card flex flex-col gap-3">
          <div className="flex items-start justify-between gap-3">
            <div className="flex flex-col gap-1 min-w-0">
              <div className="text-xs opacity-60">Signed in as</div>
              <code className="font-mono text-sm break-all">{address}</code>
            </div>
            <SignOutButton />
          </div>
          <CommentForm />
        </section>
      ) : (
        <section className="card flex flex-col gap-3">
          <p className="text-sm">
            This wall is open to anyone who can prove they hold a Zcash address.
            Sign in with SIWZ — either by signing a challenge message in your
            wallet, or by sending a tiny shielded payment with the included memo.
          </p>
          <SignInClient />
        </section>
      )}

      <section className="flex flex-col gap-3">
        <h2 className="text-sm font-semibold opacity-70">
          {comments.length} comment{comments.length === 1 ? "" : "s"}
        </h2>
        {comments.length === 0 && (
          <div className="text-sm opacity-50">No comments yet — be first.</div>
        )}
        {comments.map((c) => (
          <article key={c.id} className="card flex flex-col gap-1">
            <div className="flex justify-between text-xs opacity-60">
              <code className="font-mono">{shortAddr(c.address)}</code>
              <time>{new Date(c.created_at).toLocaleString()}</time>
            </div>
            <p className="whitespace-pre-wrap text-sm">{c.body}</p>
          </article>
        ))}
      </section>
    </>
  );
}

function shortAddr(a: string): string {
  if (a.length <= 16) return a;
  return `${a.slice(0, 8)}…${a.slice(-6)}`;
}
