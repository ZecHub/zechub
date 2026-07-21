import type { ReactNode } from "react";
import { ThemeToggle } from "../components/ThemeToggle";

const GITHUB = "https://github.com/AustinChris1/SIWZ";
const NPM_CORE = "https://www.npmjs.com/package/@siwz/core";
const NPM_REACT = "https://www.npmjs.com/package/@siwz/react";
const NPM_NEXT = "https://www.npmjs.com/package/@siwz/next-auth";
const ZBOOKS = "https://zecbooks.vercel.app";
const ZECWALL = "https://zecwall.vercel.app";

type Cell = "yes" | "no" | "t-only" | "snap";
const WALLETS: { name: string; memo: Cell; signed: Cell; snap: Cell }[] = [
  { name: "Zodl", memo: "yes", signed: "no", snap: "no" },
  { name: "YWallet", memo: "yes", signed: "t-only", snap: "no" },
  { name: "Zingo", memo: "yes", signed: "t-only", snap: "no" },
  { name: "zcash-cli", memo: "yes", signed: "yes", snap: "no" },
  { name: "Cake, Zenith, eZcash", memo: "yes", signed: "no", snap: "no" },
  { name: "MetaMask + ChainSafe Snap", memo: "no", signed: "no", snap: "yes" },
];

const JSON_LD = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "WebSite",
      "@id": "https://siwz.vercel.app/#website",
      url: "https://siwz.vercel.app/",
      name: "Sign in with Zcash",
      alternateName: ["SIWZ", "Sign in with Zcash (SIWZ)"],
      description:
        "Drop-in, non-custodial sign-in for Zcash apps. Three flows, three npm packages.",
      inLanguage: "en",
    },
    {
      "@type": "SoftwareSourceCode",
      name: "Sign in with Zcash",
      alternateName: "SIWZ",
      programmingLanguage: "TypeScript",
      codeRepository: "https://github.com/AustinChris1/SIWZ",
      license: "https://opensource.org/licenses/MIT",
      keywords:
        "zcash, sign-in, authentication, zip-321, memo-challenge, nextauth, react, metamask-snap, siwe-alternative",
      author: { "@type": "Person", name: "austinchris" },
      url: "https://siwz.vercel.app/",
    },
    {
      "@type": "SoftwareApplication",
      name: "@siwz/core",
      applicationCategory: "DeveloperApplication",
      operatingSystem: "Node.js, Browser, Edge",
      offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
      url: "https://www.npmjs.com/package/@siwz/core",
    },
    {
      "@type": "SoftwareApplication",
      name: "@siwz/react",
      applicationCategory: "DeveloperApplication",
      operatingSystem: "Browser",
      offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
      url: "https://www.npmjs.com/package/@siwz/react",
    },
    {
      "@type": "SoftwareApplication",
      name: "@siwz/next-auth",
      applicationCategory: "DeveloperApplication",
      operatingSystem: "Node.js",
      offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
      url: "https://www.npmjs.com/package/@siwz/next-auth",
    },
  ],
};

export default function Home() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(JSON_LD) }}
      />
      <nav className="nav">
        <div className="container nav-inner">
          <a className="brand" href="#top"><Logo /> SIWZ</a>
          <div className="nav-links">
            <a className="hide-sm" href="#compat">Compatibility</a>
            <a className="hide-sm" href="#quickstart">Quickstart</a>
            <a className="hide-sm" href="#apps">Reference apps</a>
            <a className="hide-sm" href="#packages">Packages</a>
            <ThemeToggle />
            <a className="gh-btn" href={GITHUB} target="_blank" rel="noreferrer"><GithubIcon /> GitHub</a>
          </div>
        </div>
      </nav>

      <header className="hero" id="top">
        <div className="container hero-grid">
          <div>
            <span className="eyebrow"><span className="dot" /> Open auth for Zcash</span>
            <h1>
              Sign in with <em>Zcash</em>.
            </h1>
            <p className="lead">
              The auth primitive Zcash didn't have. Non-custodial, drop-in, and
              built on what wallets already do.
            </p>
            <div className="cta">
              <a className="btn btn-primary" href="#quickstart">Get started</a>
              <a className="btn btn-ghost" href={GITHUB} target="_blank" rel="noreferrer">View on GitHub</a>
            </div>
            <div className="install"><span className="pfx">$</span>&nbsp;pnpm add @siwz/core @siwz/react @siwz/next-auth</div>
          </div>

          <aside className="hero-info">
            <div className="hero-info-title">Three sign-in flows</div>
            <div className="flow-row">
              <div className="num">01</div>
              <div className="body">
                <div className="title">Memo challenge</div>
                <div className="desc">A tiny payment with a one-time memo. Works with every Zcash wallet via ZIP&nbsp;321.</div>
              </div>
            </div>
            <div className="flow-row">
              <div className="num">02</div>
              <div className="body">
                <div className="title">Signed message</div>
                <div className="desc">SIWE-style. For wallets that expose <code>signmessage</code>.</div>
              </div>
            </div>
            <div className="flow-row">
              <div className="num">03</div>
              <div className="body">
                <div className="title">MetaMask Snap</div>
                <div className="desc">ChainSafe's Zcash Snap. One click, no QR.</div>
              </div>
            </div>
          </aside>
        </div>
      </header>

      <div className="stats-band">
        <div className="container">
          <div className="stats">
            <div className="stat"><div className="v">3</div><div className="l">npm packages</div></div>
            <div className="stat"><div className="v">59</div><div className="l">core tests</div></div>
            <div className="stat"><div className="v">30s</div><div className="l">avg sign-in</div></div>
            <div className="stat"><div className="v">MIT</div><div className="l">licensed</div></div>
          </div>
        </div>
      </div>

      <section id="compat">
        <div className="container">
          <div className="section-head">
            <div>
              <div className="kicker"><span className="marker">&sect; 01</span>&nbsp; Wallet compatibility</div>
              <h2>What works where, today.</h2>
            </div>
            <p className="blurb">The memo-challenge column is the floor. It lights up everywhere ZIP&nbsp;321 does, which is every modern Zcash wallet. The signed-message column is what your favourite wallet implements today.</p>
          </div>
          <div className="matrix-wrap">
            <table className="matrix">
              <thead>
                <tr>
                  <th>Wallet</th>
                  <th>Memo challenge</th>
                  <th>Signed message</th>
                  <th>MetaMask Snap</th>
                </tr>
              </thead>
              <tbody>
                {WALLETS.map((w) => (
                  <tr key={w.name}>
                    <td className="wallet">{w.name}</td>
                    <Td v={w.memo} />
                    <Td v={w.signed} />
                    <Td v={w.snap} />
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className="matrix-note">Wallet support data based on the full matrix in <code>docs/siwz/wallets.md</code>. Memo-challenge coverage is universal; the long tail of shielded wallets is rolled up into one row.</p>
        </div>
      </section>

      <section id="flows">
        <div className="container">
          <div className="section-head">
            <div>
              <div className="kicker"><span className="marker">&sect; 02</span>&nbsp; Flows</div>
              <h2>One verifier, three ways in.</h2>
            </div>
            <p className="blurb">Every flow ends in a single session. The user picks whichever their wallet supports. The server does not care which.</p>
          </div>
          <div className="feature-list">
            <div className="feature">
              <div className="num">01</div>
              <div>
                <div className="name">Memo challenge</div>
                <div className="name-tag">Recommended</div>
              </div>
              <div className="body">Send a tiny payment with a one-time memo or unique amount. <code>&lt;MemoSignIn /&gt;</code> on the client, <code>issueMemoHandler</code> + <code>pollMemoHandler</code> on the server, <code>SiwzMemoProvider</code> for NextAuth. No signmessage feature needed in the wallet; works with every ZIP&nbsp;321 wallet.</div>
            </div>
            <div className="feature">
              <div className="num">02</div>
              <div>
                <div className="name">Signed message</div>
                <div className="name-tag">Power users</div>
              </div>
              <div className="body">SIWE-style flow with a magic-prefixed challenge. <code>verifyTransparentSignature</code> handles t-addrs via secp256k1 recovery; <code>verifySaplingSignature</code> is a plug-point for a future ZIP&nbsp;304 verifier.</div>
            </div>
            <div className="feature">
              <div className="num">03</div>
              <div>
                <div className="name">MetaMask Snap</div>
                <div className="name-tag">One click</div>
              </div>
              <div className="body">The ChainSafe Zcash Snap returns a viewing key and a stable account id. No QR, no fee. Subject to the Snap manifest's origin allowlist; treat it as progressive enhancement.</div>
            </div>
          </div>
        </div>
      </section>

      <section id="quickstart">
        <div className="container">
          <div className="section-head">
            <div>
              <div className="kicker"><span className="marker">&sect; 03</span>&nbsp; Quickstart</div>
              <h2>Drop it into a Next.js app.</h2>
            </div>
            <p className="blurb">Two route handlers, one NextAuth provider, one sign-in component, one sign-out component. That is the whole integration.</p>
          </div>
          <div className="code-card">
            <div className="code-head">
              <div className="dots"><span /><span /><span /></div>
              <div className="file">app/api/auth/memo/{`{issue,poll}`}/route.ts &middot; app/api/auth/[...nextauth]/route.ts &middot; app/SignIn.tsx</div>
            </div>
            <pre className="code-body" dangerouslySetInnerHTML={{ __html: FULL_HTML }} />
          </div>
        </div>
      </section>

      <section id="apps">
        <div className="container">
          <div className="section-head">
            <div>
              <div className="kicker"><span className="marker">&sect; 04</span>&nbsp; Reference apps</div>
              <h2>Two apps, one primitive.</h2>
            </div>
            <p className="blurb">Both consume the same <code>@siwz/*</code> packages. The point: SIWZ is a primitive, not a framework.</p>
          </div>
          <div className="apps-grid">
            <a className="app-card" href={ZBOOKS} target="_blank" rel="noreferrer">
              <div className="icon"><LedgerIcon /></div>
              <div className="tag">Production shape</div>
              <h3>ZBooks <span className="arrow">&rarr;</span></h3>
              <p>Accounting and payroll for shielded ZEC teams. Viewing-key books, batch payouts, P&amp;L and CSV exports. Real SIWZ in real product code.</p>
            </a>
            <a className="app-card" href={ZECWALL} target="_blank" rel="noreferrer">
              <div className="icon"><ChatIcon /></div>
              <div className="tag">Minimal integration</div>
              <h3>ZecWall <span className="arrow">&rarr;</span></h3>
              <p>A Zcash-gated comments wall. The minimal integration: if you can build this on a Saturday, SIWZ is real infrastructure.</p>
            </a>
          </div>
        </div>
      </section>

      <section id="packages">
        <div className="container">
          <div className="section-head">
            <div>
              <div className="kicker"><span className="marker">&sect; 05</span>&nbsp; Packages</div>
              <h2>Three layers. Use one or all.</h2>
            </div>
            <p className="blurb">Independently usable. Pure TypeScript core, no Node-only deps, 59 tests.</p>
          </div>
          <div className="pkg-grid">
            <div className="pkg">
              <div className="name">@siwz/core</div>
              <div className="body">Message format, ZIP&nbsp;321 builder, address parsing, memo-challenge, and pure-TS verification.</div>
            </div>
            <div className="pkg">
              <div className="name">@siwz/react</div>
              <div className="body">{"<MemoSignIn />, <SignInWithZcash />, <SignOut />, the useSiwz() hook, and MetaMask Snap helpers."}</div>
            </div>
            <div className="pkg">
              <div className="name">@siwz/next-auth</div>
              <div className="body">SiwzProvider, SiwzMemoProvider, drop-in route handlers, stateless HMAC nonces. Free transparent explorer chain by default.</div>
            </div>
          </div>
        </div>
      </section>

      <footer>
        <div className="container">
          <div className="footer-grid">
            <div className="footer-brand">
              <div className="brand"><Logo /> SIWZ</div>
              <p className="blurb">Open, non-custodial sign-in for Zcash. Three flows, three npm packages, two reference apps. Built for the Zechub hackathon.</p>
            </div>
            <div className="footer-col">
              <h4>Product</h4>
              <ul>
                <li><a href="#compat">Wallet matrix</a></li>
                <li><a href="#flows">Sign-in flows</a></li>
                <li><a href="#quickstart">Quickstart</a></li>
                <li><a href="#apps">Reference apps</a></li>
              </ul>
            </div>
            <div className="footer-col">
              <h4>Packages</h4>
              <ul>
                <li><a href={NPM_CORE} target="_blank" rel="noreferrer">@siwz/core</a></li>
                <li><a href={NPM_REACT} target="_blank" rel="noreferrer">@siwz/react</a></li>
                <li><a href={NPM_NEXT} target="_blank" rel="noreferrer">@siwz/next-auth</a></li>
              </ul>
            </div>
            <div className="footer-col">
              <h4>Resources</h4>
              <ul>
                <li><a href={GITHUB} target="_blank" rel="noreferrer">GitHub</a></li>
                <li><a href={ZBOOKS} target="_blank" rel="noreferrer">ZBooks</a></li>
                <li><a href={ZECWALL} target="_blank" rel="noreferrer">ZecWall</a></li>
              </ul>
            </div>
          </div>
          <div className="footer-bottom">
            <div>Sign in with Zcash &middot; MIT licensed &middot; 2026</div>
            <div className="built">Built for the Zechub hackathon</div>
          </div>
        </div>
      </footer>
    </>
  );
}

function Td({ v }: { v: Cell }) {
  if (v === "yes") return <td className="y">Yes</td>;
  if (v === "no") return <td className="n">No</td>;
  if (v === "t-only") return <td className="p">Transparent only</td>;
  return <td className="y">Yes</td>; // snap
}

function Logo() {
  return (
    <svg viewBox="0 0 64 64" xmlns="http://www.w3.org/2000/svg" aria-label="SIWZ">
      <rect width="64" height="64" rx="13" fill="var(--logo-bg)" />
      <g fill="var(--logo-fg)">
        <rect x="10" y="10" width="8" height="8" rx="1.5" />
        <rect x="19" y="10" width="8" height="8" rx="1.5" />
        <rect x="28" y="10" width="8" height="8" rx="1.5" />
        <rect x="37" y="10" width="8" height="8" rx="1.5" />
        <rect x="46" y="10" width="8" height="8" rx="1.5" />
        <rect x="37" y="19" width="8" height="8" rx="1.5" />
        <rect x="28" y="28" width="8" height="8" rx="1.5" />
        <rect x="19" y="37" width="8" height="8" rx="1.5" />
        <rect x="10" y="46" width="8" height="8" rx="1.5" />
        <rect x="19" y="46" width="8" height="8" rx="1.5" />
        <rect x="28" y="46" width="8" height="8" rx="1.5" />
        <rect x="37" y="46" width="8" height="8" rx="1.5" />
        <rect x="46" y="46" width="8" height="8" rx="1.5" />
      </g>
    </svg>
  );
}

function GithubIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
      <path d="M12 .5C5.65.5.5 5.65.5 12c0 5.08 3.29 9.39 7.86 10.92.58.1.79-.25.79-.55v-2.03c-3.2.7-3.88-1.36-3.88-1.36-.52-1.33-1.28-1.69-1.28-1.69-1.04-.71.08-.7.08-.7 1.15.08 1.76 1.18 1.76 1.18 1.03 1.76 2.69 1.25 3.35.95.1-.74.4-1.25.73-1.54-2.55-.29-5.24-1.28-5.24-5.69 0-1.26.45-2.29 1.19-3.1-.12-.29-.52-1.47.11-3.06 0 0 .96-.31 3.16 1.18a10.94 10.94 0 0 1 5.74 0c2.2-1.49 3.16-1.18 3.16-1.18.63 1.59.23 2.77.11 3.06.74.81 1.19 1.84 1.19 3.1 0 4.43-2.69 5.4-5.25 5.69.41.36.77 1.05.77 2.12v3.14c0 .3.21.66.8.55C20.21 21.39 23.5 17.08 23.5 12 23.5 5.65 18.35.5 12 .5z" />
    </svg>
  );
}

function LedgerIcon() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      <path d="M4 4h14a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V4z" />
      <path d="M8 8h8M8 12h8M8 16h5" />
    </svg>
  );
}

function ChatIcon() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
    </svg>
  );
}

const FULL_HTML = `<span class="c">// app/api/auth/memo/issue/route.ts</span>
<span class="k">import</span> { <span class="fn">issueMemoHandler</span> } <span class="k">from</span> <span class="s">"@siwz/next-auth/memo"</span>;
<span class="k">export const</span> POST = <span class="fn">issueMemoHandler</span>({
  <span class="p">secret</span>: process.env.<span class="t">NEXTAUTH_SECRET</span>!,
  <span class="p">serviceAddress</span>: process.env.<span class="t">SIWZ_SERVICE_ADDRESS</span>!,
  <span class="p">network</span>: <span class="s">"mainnet"</span>,
});

<span class="c">// app/api/auth/memo/poll/route.ts</span>
<span class="k">import</span> { <span class="fn">pollMemoHandler</span> } <span class="k">from</span> <span class="s">"@siwz/next-auth/memo"</span>;
<span class="k">export const</span> POST = <span class="fn">pollMemoHandler</span>({ <span class="p">secret</span>: process.env.<span class="t">NEXTAUTH_SECRET</span>! });

<span class="c">// app/api/auth/[...nextauth]/route.ts</span>
<span class="k">import</span> <span class="t">NextAuth</span> <span class="k">from</span> <span class="s">"next-auth"</span>;
<span class="k">import</span> { <span class="t">SiwzMemoProvider</span> } <span class="k">from</span> <span class="s">"@siwz/next-auth"</span>;
<span class="k">const</span> handler = <span class="fn">NextAuth</span>({
  <span class="p">providers</span>: [ <span class="fn">SiwzMemoProvider</span>({ <span class="p">secret</span>: process.env.<span class="t">NEXTAUTH_SECRET</span>! }) ],
});
<span class="k">export</span> { handler <span class="k">as</span> <span class="t">GET</span>, handler <span class="k">as</span> <span class="t">POST</span> };

<span class="c">// app/SignIn.tsx  (client)</span>
<span class="k">import</span> { <span class="t">MemoSignIn</span>, <span class="t">SignOut</span> } <span class="k">from</span> <span class="s">"@siwz/react"</span>;
<span class="k">import</span> { <span class="fn">signIn</span>, <span class="fn">signOut</span> } <span class="k">from</span> <span class="s">"next-auth/react"</span>;

&lt;<span class="t">MemoSignIn</span>
  <span class="p">onSuccess</span>={({ identity, envelope }) =&gt;
    <span class="fn">signIn</span>(<span class="s">"memo"</span>, { identity, envelope, redirect: <span class="k">false</span> })}
/&gt;;

&lt;<span class="t">SignOut</span> <span class="p">onSignOut</span>={() =&gt; <span class="fn">signOut</span>({ callbackUrl: <span class="s">"/"</span> })} /&gt;;`;
