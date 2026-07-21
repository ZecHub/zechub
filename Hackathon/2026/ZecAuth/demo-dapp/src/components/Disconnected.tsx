import type { CapabilityInfo } from "@zecauth/dapp";
import Shield from "./Shield";

interface Props {
  onConnect: () => void;
  /** The capabilities this dApp declared through the ZecAuth SDK. */
  capabilities: CapabilityInfo[];
}

/** Inline icon per capability id (the SDK gives us labels/descriptions, the UI picks icons). */
function CapabilityIcon({ id }: { id: string }) {
  const common = {
    width: 18,
    height: 18,
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: 1.6,
    strokeLinecap: "round" as const,
    strokeLinejoin: "round" as const,
  };
  if (id === "sign-transaction") {
    return (
      <svg {...common}>
        <line x1="12" y1="2.5" x2="12" y2="21.5" />
        <path d="M17 6H9.5a3.5 3.5 0 000 7h5a3.5 3.5 0 010 7H6" />
      </svg>
    );
  }
  if (id === "view-address") {
    return (
      <svg {...common}>
        <path d="M20 10c0 6-8 11.5-8 11.5S4 16 4 10a8 8 0 0116 0z" />
        <circle cx="12" cy="10" r="2.6" />
      </svg>
    );
  }
  if (id === "view-incoming") {
    return (
      <svg {...common}>
        <path d="M2 12s3.5-7 10-7 10 7 10 7-3.5 7-10 7-10-7-10-7z" />
        <circle cx="12" cy="12" r="2.8" />
      </svg>
    );
  }
  // signin (and fallback)
  return (
    <svg {...common}>
      <path d="M20 21v-1.5a4.5 4.5 0 00-4.5-4.5h-7A4.5 4.5 0 004 19.5V21" />
      <circle cx="12" cy="7" r="4" />
    </svg>
  );
}

export default function Disconnected({ onConnect, capabilities }: Props) {
  return (
    <div className="v-stagger">
      <div className="v-panel">
        <span className="v-bk tl" /><span className="v-bk tr" /><span className="v-bk bl" /><span className="v-bk br" />

        <div className="v-eyebrow">Authentication request</div>
        <h1 className="v-display">Prove who you are.<br />No password. No fee.</h1>
        <p className="v-sub">
          {location.host} wants to verify your Zcash wallet. Signing happens off-chain with a
          dedicated auth key — your spending keys never leave the device.
        </p>

        {/* Requested capabilities — declared via the SDK, shown to the user before connecting. */}
        <div className="v-seclabel">
          <span>Requested capabilities</span>
          <span>{capabilities.length} {capabilities.length === 1 ? "scope" : "scopes"}</span>
        </div>
        {capabilities.map((cap, i) => (
          <div className="v-caprow" key={cap.id}>
            <span className="v-capidx">{String(i + 1).padStart(2, "0")}</span>
            <span className="v-capbox"><CapabilityIcon id={cap.id} /></span>
            <div style={{ flex: 1 }}>
              <div className="v-capttl">{cap.label}</div>
              <div className="v-capdesc">{cap.description}</div>
            </div>
          </div>
        ))}

        <div className="v-bound">
          <Shield size={15} stroke={64} />
          Domain-bound to <b>{location.host}</b>
        </div>

        <button onClick={onConnect} className="v-btn v-mt24">
          Connect wallet
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M5 12h14M13 6l6 6-6 6" />
          </svg>
        </button>
      </div>
    </div>
  );
}
