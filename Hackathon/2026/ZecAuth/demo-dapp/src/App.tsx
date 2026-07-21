import { useEffect, useState, useCallback, useMemo } from "react";
import {
  ZecAuth,
  type ChallengeData,
  type ZecAuthSession,
} from "@zecauth/dapp";
import { type VerifyPayload } from "./api";
import Shield from "./components/Shield";
import Disconnected from "./components/Disconnected";
import ChallengeView from "./components/ChallengeView";
import Authenticated from "./components/Authenticated";

type AppState = "loading" | "disconnected" | "challenge" | "authenticated";

export default function App() {
  const [state, setState] = useState<AppState>("loading");
  const [challenge, setChallenge] = useState<ChallengeData | null>(null);
  const [auth, setAuth] = useState<ZecAuthSession | null>(null);
  const [error, setError] = useState<string | null>(null);

  // One ZecAuth dApp-SDK client for the whole app. We declare the capabilities this demo
  // needs up front — `signin` to authenticate and `sign-transaction` to request payments.
  // The SDK embeds these into every challenge so the wallet can show the user what we want.
  const zecauth = useMemo(
    () =>
      new ZecAuth({
        domain: location.host,
        server: "/auth",
        capabilities: ["signin", "sign-transaction", "view-address", "view-incoming"],
      }),
    [],
  );

  useEffect(() => {
    zecauth
      .restoreSession()
      .then((session) => {
        if (session) {
          setAuth(session);
          setState("authenticated");
        } else {
          setState("disconnected");
        }
      })
      .catch(() => setState("disconnected"));
  }, [zecauth]);

  const handleConnect = useCallback(async () => {
    setError(null);
    try {
      const data = await zecauth.createChallenge();
      setChallenge(data);
      setState("challenge");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to generate challenge");
    }
  }, [zecauth]);

  const handleVerify = useCallback(
    async (payload: VerifyPayload) => {
      setError(null);
      const session = await zecauth.verify(payload);
      setAuth(session);
      setChallenge(null);
      setState("authenticated");
    },
    [zecauth],
  );

  const handleCancel = useCallback(() => {
    setChallenge(null);
    setError(null);
    setState("disconnected");
  }, []);

  const handleDisconnect = useCallback(() => {
    zecauth.disconnect();
    setAuth(null);
    setError(null);
    setState("disconnected");
  }, [zecauth]);

  // Listen for the wallet ending the session (wallet → server → here). Reflects the
  // disconnect immediately, without the user touching the dApp.
  useEffect(() => {
    if (state !== "authenticated" || !auth) return;
    return zecauth.watchSession({
      onDisconnect: () => {
        setError("The wallet disconnected this session.");
        handleDisconnect();
      },
    });
  }, [state, auth, zecauth, handleDisconnect]);

  return (
    <div className="v-app">
      <div className="v-main">
        <div className="v-col">
          {/* Wordmark bar */}
          <header className="v-topbar v-fade">
            <div className="v-brand">
              <Shield size={26} stroke={56} />
              <b>ZecAuth</b>
            </div>
            <div className="v-secure">
              <span className="v-dot pos" />
              Secure channel
            </div>
          </header>

          {/* Error */}
          {error && <div className="v-error v-fade" style={{ marginBottom: 14 }}>{error}</div>}

          {/* Loading */}
          {state === "loading" && (
            <div className="v-fade" style={{ display: "flex", justifyContent: "center", padding: "84px 0" }}>
              <div className="v-spinner" />
            </div>
          )}

          {state === "disconnected" && (
            <Disconnected onConnect={handleConnect} capabilities={zecauth.getCapabilities()} />
          )}
          {state === "challenge" && challenge && (
            <ChallengeView challenge={challenge} onVerify={handleVerify} onCancel={handleCancel} />
          )}
          {state === "authenticated" && auth && (
            <Authenticated auth={auth} zecauth={zecauth} onDisconnect={handleDisconnect} />
          )}
        </div>
      </div>

      <footer className="v-footer">ZecAuth Protocol v1 &middot; MIT License</footer>
    </div>
  );
}
