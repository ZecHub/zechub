import { createHash, createHmac, timingSafeEqual } from "node:crypto";
import type { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { SiwzProvider, SiwzMemoProvider } from "@siwz/next-auth";

const SECRET = process.env.NEXTAUTH_SECRET ?? "dev-secret-please-set-NEXTAUTH_SECRET";

const snap = CredentialsProvider({
  id: "snap",
  name: "Sign in with MetaMask (Zcash Snap)",
  credentials: {
    fingerprint: { label: "Fingerprint", type: "text" },
    ufvk: { label: "UFVK", type: "text" },
    envelope: { label: "Envelope", type: "text" },
  },
  async authorize(credentials) {
    const c = credentials as Partial<{ fingerprint: string; ufvk: string; envelope: string }> | undefined;
    if (!c?.fingerprint || !c.ufvk || !c.envelope) return null;
    const expected = createHmac("sha256", SECRET).update(`${c.fingerprint}::${c.ufvk}`).digest("hex");
    if (c.envelope.length !== expected.length) return null;
    if (!timingSafeEqual(Buffer.from(c.envelope), Buffer.from(expected))) return null;
    // Re-installing the Snap may rotate the fingerprint; derive identity from
    // the UFVK so the same wallet keeps the same anon id.
    const identity = `anon:${createHash("sha256").update(c.ufvk).digest("hex").slice(0, 32)}`;
    return { id: identity, name: identity };
  },
});

export const authOptions: NextAuthOptions = {
  providers: [
    SiwzProvider({
      expectedDomain: process.env.SIWZ_DOMAIN ?? "localhost:3001",
      secret: SECRET,
    }),
    SiwzMemoProvider({ secret: SECRET }),
    snap,
  ],
  session: { strategy: "jwt" },
  secret: SECRET,
  pages: { signIn: "/" },
  callbacks: {
    async jwt({ token, user }) {
      if (user) token.address = user.id;
      return token;
    },
    async session({ session, token }) {
      if (session.user) session.user.address = token.address;
      return session;
    },
  },
};
