import { useState, useEffect, useRef } from "react";
import { useNav } from "../nav";
import { Page, Navbar, Block, BlockTitle, Button } from "konsta/react";
import { invoke } from "../backend";
import { startDisplay } from "../qr-display";

export default function ResultPage() {
  const { navigate } = useNav();
  const [error, setError] = useState<string | null>(null);
  const [ready, setReady] = useState(false);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const stopRef = useRef<(() => void) | null>(null);

  useEffect(() => {
    (async () => {
      try {
        const responseBytes = await invoke<number[]>("get_response");
        const bytes = new Uint8Array(responseBytes);
        const canvas = canvasRef.current;
        if (!canvas) return;
        canvas.width = 400;
        canvas.height = 400;
        stopRef.current = startDisplay(canvas, bytes);
        setReady(true);
      } catch (e) {
        setError(e instanceof Error ? e.message : String(e));
      }
    })();

    return () => {
      stopRef.current?.();
    };
  }, []);

  return (
    <Page>
      <Navbar title="Signed" />
      <BlockTitle>Transaction Signed</BlockTitle>
      <Block strong className="text-center">
        <p className="mb-4 text-gray-500">
          The transaction has been signed. Present this device back to the bridge
          to scan the animated QR code and complete the flow.
        </p>
        <p className="text-red-500" style={{ display: error ? "block" : "none" }}>{error}</p>
        <div
          className="bg-white rounded-lg p-4 mb-4 flex justify-center inline-block"
          style={{ display: !error && ready ? "flex" : "none" }}
        >
          <canvas ref={canvasRef} />
        </div>
        <div
          className="bg-gray-100 dark:bg-gray-800 rounded-lg p-8 mb-4 flex justify-center"
          style={{ display: !error && !ready ? "flex" : "none" }}
        >
          <div className="w-48 h-48 bg-white rounded flex items-center justify-center">
            <p className="text-gray-400 text-sm text-center">Loading QR...</p>
          </div>
        </div>
        <Button large rounded className="w-full" onClick={() => navigate("/scan")}>
          Done
        </Button>
      </Block>
    </Page>
  );
}
