import "./globals.css";
import { DM_Mono, Sora } from "next/font/google";
import SocketProvider from "./providers/socket-provider";
import DemoModeBanner from "@/components/demo-mode-banner";

const dmMono = DM_Mono({
  subsets: ["latin"],
  weight: ["400", "500"],
  variable: "--font-dm-mono",
});

const sora = Sora({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-sora",
});

export const metadata = {
  title: "Bluff Arena",
  description: "Outsmart. Bluff. Win.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${dmMono.variable} ${sora.variable}`}>
      <body>
        <SocketProvider>
          <DemoModeBanner />
          {children}
        </SocketProvider>
      </body>
    </html>
  );
}
