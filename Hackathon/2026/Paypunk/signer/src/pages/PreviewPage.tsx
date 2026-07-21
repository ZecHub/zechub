import { useState, useEffect } from "react";
import { useNav } from "../nav";
import { Page, Navbar, Block, BlockTitle, Button, List, ListItem, ListInput, Preloader } from "konsta/react";
import { invoke } from "../backend";
import { generateEphemeralKeypair, encryptToServer } from "../crypto";

interface OutputEntry {
  address: string;
  amount: string;
}

interface ZcashArtifactSummary {
  outputs: OutputEntry[];
  fee: string;
}

interface ArtifactSummary {
  Zcash?: ZcashArtifactSummary;
}

function assembleAuthorizePayload(
  rawArtifact: Uint8Array,
  previewSignature: Uint8Array,
  password: string,
): Uint8Array {
  const pwBytes = new TextEncoder().encode(password);
  const payload = new Uint8Array(4 + rawArtifact.length + 4 + previewSignature.length + pwBytes.length);
  const view = new DataView(payload.buffer);
  view.setUint32(0, rawArtifact.length, true);
  payload.set(rawArtifact, 4);
  view.setUint32(4 + rawArtifact.length, previewSignature.length, true);
  payload.set(previewSignature, 8 + rawArtifact.length);
  payload.set(pwBytes, 8 + rawArtifact.length + previewSignature.length);
  return payload;
}

export default function PreviewPage() {
  const { navigate, serverKey, scanResult } = useNav();
  const [preview, setPreview] = useState<ArtifactSummary | null>(null);
  const [loading, setLoading] = useState(true);
  const [signing, setSigning] = useState(false);
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    (async () => {
      try {
        const data = await invoke<ArtifactSummary>("get_preview");
        setPreview(data);
      } catch (e) {
        setError(e instanceof Error ? e.message : String(e));
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  const handleApprove = async () => {
    if (!serverKey) {
      setError("Encryption key not loaded yet");
      return;
    }
    if (!password) {
      setError("Please enter your password");
      return;
    }
    if (!scanResult) {
      setError("No scan data available — please scan again");
      return;
    }
    setSigning(true);
    setError(null);
    try {
      const ephemeral = generateEphemeralKeypair();

      const payload = assembleAuthorizePayload(
        scanResult.rawArtifact,
        scanResult.previewSignature,
        password,
      );

      const encryptedPayload = await encryptToServer(payload, serverKey, ephemeral.secret);

      await invoke<number[]>("approve_and_sign", {
        encryptedPayload: Array.from(encryptedPayload),
        ephemeralPublicKey: Array.from(ephemeral.public),
        derivationPath: scanResult.derivationPath,
      });

      navigate("/result");
    } catch (e) {
      setError(e instanceof Error ? e.message : String(e));
      setSigning(false);
    } finally {
      setPassword("");
    }
  };

  const handleReject = () => {
    navigate("/scan");
  };

  const zcashPreview = preview?.Zcash;

  return (
    <Page>
      <Navbar title="Transaction Preview" />
      <BlockTitle>Transaction Details</BlockTitle>

      <Block strong className="text-center" style={{ display: loading ? "block" : "none" }}>
        <Preloader />
        <p className="mt-4 text-gray-500">Loading preview...</p>
      </Block>

      <div style={{ display: !loading && zcashPreview ? "block" : "none" }}>
        <Block strong>
          <List>
            <ListItem title="Outputs" after={String(zcashPreview?.outputs.length ?? 0)} />
            {zcashPreview?.outputs.map((out, i) => (
              <ListItem
                key={i}
                title={`Output ${i + 1}`}
                subtitle={`${out.amount} zatoshis`}
                after={out.address.slice(0, 12) + "..."}
              />
            ))}
            <ListItem title="Fee" after={`${zcashPreview?.fee ?? ""} zatoshis`} />
          </List>
        </Block>

        <Block strong>
          <List strong inset>
            <ListInput
              label="Wallet Password"
              type="password"
              value={password}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => setPassword(e.target.value)}
              placeholder="Enter password to sign"
              disabled={signing}
            />
          </List>
        </Block>

        <Block strong className="text-center">
          <Button large rounded className="w-full mb-2" onClick={handleApprove} disabled={signing || !password}>
            {signing ? "Signing..." : "Approve & Sign"}
          </Button>
          <Button large rounded outline className="w-full" onClick={handleReject} disabled={signing}>
            Reject
          </Button>
        </Block>
      </div>

      <Block strong className="text-center" style={{ display: !loading && !zcashPreview ? "block" : "none" }}>
        <p className="text-gray-500">No preview data available.</p>
        <Button className="mt-4" onClick={() => navigate("/scan")}>Back to Scan</Button>
      </Block>

      <Block strong className="text-center" style={{ display: signing ? "block" : "none" }}>
        <Preloader />
      </Block>

      <Block strong className="text-center" style={{ display: error ? "block" : "none" }}>
        <p className="text-red-500">{error}</p>
      </Block>
    </Page>
  );
}
