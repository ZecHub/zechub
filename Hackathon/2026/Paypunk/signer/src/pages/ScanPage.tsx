import { useState, useRef, useEffect } from "react";
import { useNav } from "../nav";
import { Page, Navbar, Block, BlockTitle, Button, Preloader } from "konsta/react";
import { invoke, isTauri } from "../backend";
import { scanBytes } from "../qr-scan";

interface ProcessResult {
  mode: string;
  raw_artifact_b64?: string;
  preview_signature_b64?: string;
  derivation_path?: string;
}

export default function ScanPage() {
  const { navigate, setScanResult } = useNav();
  const [scanning, setScanning] = useState(false);
  const [deleting, setDeleting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [progress, setProgress] = useState(0);
  const [cameraActive, setCameraActive] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);
  const progressRef = useRef<HTMLParagraphElement>(null);
  const streamRef = useRef<MediaStream | null>(null);

  // Stop camera on unmount
  useEffect(() => {
    return () => {
      if (streamRef.current) {
        streamRef.current.getTracks().forEach(t => t.stop());
        streamRef.current = null;
      }
    };
  }, []);

  const handleScan = async () => {
    setError(null);
    setScanning(true);
    setProgress(0);

    try {
      if (isTauri()) {
        const { checkPermissions, requestPermissions, openAppSettings } = await import("@tauri-apps/plugin-barcode-scanner");

        let perm = await checkPermissions();
        if (perm !== "granted") {
          perm = await requestPermissions();
        }
        if (perm !== "granted") {
          setError("Camera permission denied. Please grant camera access in settings.");
          try { await openAppSettings(); } catch { /* ignore */ }
          setScanning(false);
          return;
        }
      }

      const videoEl = videoRef.current!;
      setCameraActive(true);

      // Yield to React so the video element becomes visible before getUserMedia
      await new Promise(r => setTimeout(r, 50));

      const payload = await scanBytes(videoEl, {
        onProgress: (p) => {
          setProgress(p);
          if (progressRef.current) {
            progressRef.current.textContent = `${Math.round(p * 100)}%`;
          }
        },
      });

      setCameraActive(false);

      const result = await invoke<ProcessResult>("process_scanned_qr", { payload: Array.from(payload) });
      if (result.mode === "response") {
        navigate("/result");
      } else if (result.mode === "register") {
        navigate("/register");
      } else {
        // Store scan result data for PreviewPage
        if (result.raw_artifact_b64 && result.preview_signature_b64 && result.derivation_path) {
          setScanResult({
            rawArtifact: Uint8Array.from(atob(result.raw_artifact_b64), c => c.charCodeAt(0)),
            previewSignature: Uint8Array.from(atob(result.preview_signature_b64), c => c.charCodeAt(0)),
            derivationPath: result.derivation_path,
          });
        }
        navigate("/preview");
      }
    } catch (e) {
      const msg = e instanceof Error ? e.message : String(e);
      console.error("Scan failed:", msg);
      setError(msg);
      setCameraActive(false);
    } finally {
      setScanning(false);
      setProgress(0);
    }
  };

  const handleDeleteWallet = async () => {
    setDeleting(true);
    setError(null);
    try {
      await invoke<null>("delete_seed");
      navigate("/");
    } catch (e) {
      setError(e instanceof Error ? e.message : String(e));
    } finally {
      setDeleting(false);
    }
  };

  return (
    <Page>
      <Navbar title="Scan QR" />
      <BlockTitle>Scan Transaction</BlockTitle>
      <Block strong className="text-center">
        {/* Video element always in DOM, visibility controlled by CSS */}
        <div className="relative w-full max-w-[400px] mx-auto mb-4 rounded-xl overflow-hidden bg-black" style={{ display: cameraActive ? "block" : "none" }}>
          <video ref={videoRef} id="camera" autoPlay playsInline className="w-full h-auto" />
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
            <div className="bg-black/60 rounded-lg px-4 py-2 text-center">
              <Preloader className="mb-2" />
              <p ref={progressRef} className="text-white text-sm">
                {Math.round(progress * 100)}%
              </p>
              <p className="text-gray-300 text-xs mt-1">Point at the bridge screen</p>
            </div>
          </div>
        </div>

        <p className="mb-4 text-gray-500" style={{ display: cameraActive ? "none" : "block" }}>
          Point your device at the bridge's animated QR code to scan a transaction request.
        </p>

        <Button large rounded className="w-full" onClick={handleScan} disabled={scanning}>
          {scanning ? `Scanning... ${Math.round(progress * 100)}%` : "Scan QR Code"}
        </Button>

        <div className="flex justify-center mt-4" style={{ display: scanning && !cameraActive ? "flex" : "none" }}>
          <Preloader />
        </div>

        <div className="mt-8">
          <Button large rounded outline className="w-full" onClick={handleDeleteWallet} disabled={deleting}>
            {deleting ? "Deleting..." : "Delete Wallet"}
          </Button>
        </div>
      </Block>
      <Block strong className="text-center" style={{ display: error ? "block" : "none" }}>
        <p className="text-red-500">{error}</p>
        <Button className="mt-2" onClick={() => setError(null)}>Dismiss</Button>
      </Block>
    </Page>
  );
}
