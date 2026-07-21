import { useState, useEffect } from "react";
import { useNav } from "../nav";
import { Page, Navbar, Block, BlockTitle, Button, Preloader, List, ListInput } from "konsta/react";
import { invoke } from "../backend";
import { generateEphemeralKeypair, encryptToServer, decryptFromServer } from "../crypto";

type Step = "checking" | "existing" | "choice" | "password" | "mnemonic";

export default function OnboardingPage() {
  const { navigate, serverKey } = useNav();
  const [step, setStep] = useState<Step>("checking");
  const [password, setPassword] = useState("");
  const [generatedMnemonic, setGeneratedMnemonic] = useState<string | null>(null);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    (async () => {
      try {
        const exists = await invoke<boolean>("has_seed");
        setStep(exists ? "existing" : "choice");
      } catch {
        setStep("choice");
      }
    })();
  }, []);

  const handleUseTestAccount = async () => {
    if (!serverKey) return;
    setBusy(true);
    setError(null);
    try {
      const ephemeral = generateEphemeralKeypair();
      const mnemonicBytes = new TextEncoder().encode(
        "test test test test test test test test test test test junk"
      );
      const pwBytes = new TextEncoder().encode("test");
      const encryptedMnemonic = await encryptToServer(mnemonicBytes, serverKey, ephemeral.secret);
      const encryptedPassword = await encryptToServer(pwBytes, serverKey, ephemeral.secret);

      await invoke<null>("restore_seed", {
        encryptedMnemonic: Array.from(encryptedMnemonic),
        encryptedPassword: Array.from(encryptedPassword),
        ephemeralPublicKey: Array.from(ephemeral.public),
      });

      navigate("/scan");
    } catch (e) {
      setError(e instanceof Error ? e.message : String(e));
    } finally {
      setBusy(false);
    }
  };

  const handleGenerateWallet = () => {
    setStep("password");
  };

  const handleGenerateWithPassword = async () => {
    if (!serverKey) {
      setError("Encryption key not loaded yet");
      return;
    }
    if (!password) {
      setError("Please enter a password");
      return;
    }
    setBusy(true);
    setError(null);
    try {
      const ephemeral = generateEphemeralKeypair();
      const pwBytes = new TextEncoder().encode(password);
      const encryptedPassword = await encryptToServer(pwBytes, serverKey, ephemeral.secret);

      const encryptedMnemonicArr = await invoke<number[]>("generate_seed", {
        encryptedPassword: Array.from(encryptedPassword),
        ephemeralPublicKey: Array.from(ephemeral.public),
      });

      const encryptedMnemonic = new Uint8Array(encryptedMnemonicArr);
      const mnemonicBytes = await decryptFromServer(encryptedMnemonic, serverKey, ephemeral.secret);
      setGeneratedMnemonic(new TextDecoder().decode(mnemonicBytes));
      setStep("mnemonic");
    } catch (e) {
      setError(e instanceof Error ? e.message : String(e));
    } finally {
      setPassword("");
      setBusy(false);
    }
  };

  const handleContinue = () => {
    navigate("/scan");
  };

  const handleDeleteWallet = async () => {
    setBusy(true);
    setError(null);
    try {
      await invoke<null>("delete_seed");
      setStep("choice");
    } catch (e) {
      setError(e instanceof Error ? e.message : String(e));
    } finally {
      setBusy(false);
    }
  };

  return (
    <Page>
      <Navbar title="PayPunk Signer" />
      <BlockTitle>Welcome</BlockTitle>
      <Block strong className="text-center">
        <p className="mb-4 text-gray-500">
          This app holds your seed phrase and signs transactions.
        </p>

        {step === "checking" && (
          <div className="flex justify-center">
            <Preloader />
          </div>
        )}

        {step === "existing" && (
          <>
            <p className="mb-4 text-gray-500">
              A wallet already exists on this device.
            </p>
            <Button large rounded className="w-full mb-2" onClick={handleContinue}>
              Continue to Scan
            </Button>
            <Button large rounded outline className="w-full" onClick={handleDeleteWallet} disabled={busy}>
              {busy ? "Deleting..." : "Delete Wallet"}
            </Button>
          </>
        )}

        {step === "choice" && (
          <>
            <Button large rounded className="w-full mb-2" onClick={handleUseTestAccount} disabled={busy}>
              {busy ? "Setting up..." : "Use a Test Account"}
            </Button>
            <Button large rounded outline className="w-full" onClick={handleGenerateWallet} disabled={busy}>
              Generate Wallet
            </Button>
          </>
        )}

        {step === "password" && (
          <>
            <p className="mb-4 text-gray-500">
              Choose a password to protect your wallet.
            </p>
            <List strong inset className="mb-4">
              <ListInput
                label="Password"
                type="password"
                value={password}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => setPassword(e.target.value)}
                placeholder="Enter wallet password"
                disabled={busy}
              />
            </List>
            <Button large rounded className="w-full" onClick={handleGenerateWithPassword} disabled={busy || !password}>
              {busy ? "Generating..." : "Generate Seed"}
            </Button>
          </>
        )}

        {step === "mnemonic" && generatedMnemonic && (
          <>
            <p className="mb-4 text-gray-500">
              Save this seed phrase securely. You will need it to restore your wallet.
            </p>
            <div className="bg-gray-100 dark:bg-gray-800 rounded-lg p-4 mb-4 text-sm font-mono break-all">
              {generatedMnemonic}
            </div>
            <Button large rounded className="w-full" onClick={handleContinue}>
              I've Saved It — Continue
            </Button>
          </>
        )}

        <div className="flex justify-center mt-4" style={{ display: busy && step !== "existing" && step !== "choice" ? "flex" : "none" }}>
          <Preloader />
        </div>
      </Block>
      <Block strong className="text-center" style={{ display: error ? "block" : "none" }}>
        <p className="text-red-500">{error}</p>
      </Block>
    </Page>
  );
}
