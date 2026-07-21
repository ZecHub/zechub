import { ImageResponse } from "next/og";

import { IRONWOOD_ACTIVATION_HEIGHT } from "@/lib/constants";

export const alt = "Turnstile — Is your ZEC ready for Ironwood?";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          background: "#030303",
          padding: 72,
          fontFamily: "sans-serif",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
          <div style={{ display: "flex", width: 14, height: 14, borderRadius: 999, background: "#34D399" }} />
          <div style={{ display: "flex", color: "#A1A1AA", fontSize: 22, letterSpacing: 4 }}>
            TURNSTILE
          </div>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
          <div style={{ display: "flex", flexDirection: "column" }}>
            <div style={{ display: "flex", color: "#FAFAFA", fontSize: 78, letterSpacing: -2.5 }}>
              Is your ZEC ready
            </div>
            <div style={{ display: "flex", color: "#FAFAFA", fontSize: 78, letterSpacing: -2.5 }}>
              for Ironwood?
            </div>
          </div>

          <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
            <div style={{ display: "flex", color: "#A1A1AA", fontSize: 28 }}>
              Check your Orchard exposure with a viewing key.
            </div>
            <div style={{ display: "flex", color: "#A1A1AA", fontSize: 28 }}>
              No spending keys, ever.
            </div>
          </div>
        </div>

        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "flex-end",
            borderTop: "1px solid #27272A",
            paddingTop: 28,
          }}
        >
          <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
            <div style={{ display: "flex", color: "#71717A", fontSize: 18, letterSpacing: 3 }}>
              ORCHARD CLOSES AT BLOCK
            </div>
            <div style={{ display: "flex", color: "#34D399", fontSize: 46, letterSpacing: -1 }}>
              {IRONWOOD_ACTIVATION_HEIGHT.toLocaleString("en-US")}
            </div>
          </div>

          <div style={{ display: "flex", color: "#71717A", fontSize: 20 }}>
            read-only · open source
          </div>
        </div>
      </div>
    ),
    size,
  );
}
