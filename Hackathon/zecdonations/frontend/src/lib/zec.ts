// Define the props type since QRCodeCanvasProps is not exported from "qrcode.react"
export interface QRCodeCanvasProps {
  value: string;
  size?: number;
  bgColor?: string;
  fgColor?: string;
  level?: "L" | "M" | "Q" | "H";
  includeMargin?: boolean;
}

export function buildZecUri(address: string, amount?: number, memo?: string) {
  const params = new URLSearchParams();
  if (amount) params.set("amount", amount.toString());
  if (memo) params.set("memo", memo);
  return `${address}`;
}

export const qrDefaults: Partial<QRCodeCanvasProps> = {
  size: 200,
  bgColor: "#0D1B2A",
  fgColor: "#00C2A8",
  level: "M",
  includeMargin: true,
};


