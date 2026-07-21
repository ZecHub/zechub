import { useEffect } from "react";
import { NavProvider, useNav } from "./nav";
import OnboardingPage from "./pages/OnboardingPage";
import ScanPage from "./pages/ScanPage";
import PreviewPage from "./pages/PreviewPage";
import SigningPage from "./pages/SigningPage";
import ResultPage from "./pages/ResultPage";
import RegistrationPage from "./pages/RegistrationPage";
import { invoke } from "./backend";

function CurrentPage() {
  const { page } = useNav();
  switch (page) {
    case "/":
      return <OnboardingPage />;
    case "/scan":
      return <ScanPage />;
    case "/preview":
      return <PreviewPage />;
    case "/signing":
      return <SigningPage />;
    case "/result":
      return <ResultPage />;
    case "/register":
      return <RegistrationPage />;
    default:
      return <OnboardingPage />;
  }
}

function AppInner() {
  const { setServerKey } = useNav();

  useEffect(() => {
    (async () => {
      try {
        const key = await invoke<number[]>("get_encryption_key");
        setServerKey(new Uint8Array(key));
      } catch (e) {
        console.error("Failed to fetch encryption key:", e);
      }
    })();
  }, [setServerKey]);

  return <CurrentPage />;
}

export default function App() {
  return (
    <NavProvider>
      <AppInner />
    </NavProvider>
  );
}
