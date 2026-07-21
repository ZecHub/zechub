import { useState, useEffect } from "react";
import { useNav } from "../nav";
import { Page, Navbar, Block, BlockTitle, Preloader } from "konsta/react";
import { invoke } from "../backend";

export default function SigningPage() {
  const { navigate } = useNav();
  const [status, setStatus] = useState("signing");

  useEffect(() => {
    let cancelled = false;
    const interval = setInterval(async () => {
      try {
        const s = await invoke<string>("get_signer_status");
        if (cancelled) return;
        setStatus(s);
        if (s === "signed") {
          clearInterval(interval);
          navigate("/result");
        } else if (s.startsWith("error")) {
          clearInterval(interval);
        }
      } catch {
        // keep polling
      }
    }, 500);

    return () => {
      cancelled = true;
      clearInterval(interval);
    };
  }, [navigate]);

  return (
    <Page>
      <Navbar title="Signing" />
      <BlockTitle>Signing Transaction</BlockTitle>
      <Block strong className="text-center">
        <Preloader />
        <p className="mt-4 text-gray-500">
          {status === "signing"
            ? "Signing transaction with Orchard proving..."
            : status}
        </p>
      </Block>
    </Page>
  );
}
