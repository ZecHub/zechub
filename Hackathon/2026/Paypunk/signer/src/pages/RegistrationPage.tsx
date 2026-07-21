import { useState, useRef } from "react";
import { useNav } from "../nav";
import { Page, Navbar, Block, BlockTitle, Button, List, ListInput, Preloader } from "konsta/react";
import { invoke } from "../backend";
import { startDisplay } from "../qr-display";

export default function RegistrationPage() {
  const { navigate } = useNav();
  const [password, setPassword] = useState("");
  const [busy, setBusy] = useState(false);
  const [ready, setReady] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const stopRef = useRef<(() => void) | null>(null);

  const handleRegister = async () => {
    if (!password) {
      setError("Please enter your password");
      return;
    }
    setBusy(true);
    setError(null);
    try {
      const responseBytes = await invoke<number[]>("complete_registration", { password });
      const bytes = new Uint8Array(responseBytes);
      const canvas = canvasRef.current;
      if (!canvas) return;
      canvas.width = 400;
      canvas.height = 400;
      stopRef.current = startDisplay(canvas, bytes);
      setReady(true);
    } catch (e) {
      setError(e instanceof Error ? e.message : String(e));
      setBusy(false);
    }
  };

  const handleDone = () => {
    stopRef.current?.();
    navigate("/scan");
  };

  return (
    <Page>
      <Navbar title="Register Wallet" />
      <BlockTitle>Register with PayPunk</BlockTitle>

      <div style={{ display: !ready && !busy ? "block" : "none" }}>
        <Block strong className="text-center">
          <p className="mb-4 text-gray-500">
            Enter your wallet password to register this signer with PayPunk.
            Your viewing keys will be derived and sent to the bridge.
          </p>
        </Block>
        <Block strong>
          <List strong inset>
            <ListInput
              label="Wallet Password"
              type="password"
              value={password}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => setPassword(e.target.value)}
              placeholder="Enter wallet password"
              disabled={busy}
            />
          </List>
        </Block>
        <Block strong className="text-center">
          <Button large rounded className="w-full" onClick={handleRegister} disabled={busy || !password}>
            Register
          </Button>
        </Block>
      </div>

      <div style={{ display: busy && !ready ? "block" : "none" }}>
        <Block strong className="text-center">
          <Preloader />
          <p className="mt-4 text-gray-500">Deriving viewing keys...</p>
        </Block>
      </div>

      <div style={{ display: ready ? "block" : "none" }}>
        <Block strong className="text-center">
          <p className="mb-4 text-gray-500">
            Registration complete. Show this animated QR to the bridge to complete setup.
          </p>
          <div className="bg-white rounded-lg p-4 mb-4 flex justify-center inline-block">
            <canvas ref={canvasRef} />
          </div>
          <Button large rounded className="w-full" onClick={handleDone}>
            Done
          </Button>
        </Block>
      </div>

      <Block strong className="text-center" style={{ display: error ? "block" : "none" }}>
        <p className="text-red-500">{error}</p>
        <Button className="mt-2" onClick={() => setError(null)}>Dismiss</Button>
      </Block>
    </Page>
  );
}
