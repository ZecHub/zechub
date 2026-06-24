'use client';

import { useEffect, useRef } from 'react';
import QRCode from 'qrcode';

interface ChallengeQRProps {
  uri: string;
  size?: number;
}

export function ChallengeQR({ uri, size = 256 }: ChallengeQRProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    if (canvasRef.current && uri) {
      QRCode.toCanvas(canvasRef.current, uri, {
        width: size,
        margin: 2,
        color: { dark: '#F4B728', light: '#0a0a0a' },
        errorCorrectionLevel: 'M',
      }).catch(console.error);
    }
  }, [uri, size]);

  return (
    <div className="flex flex-col items-center gap-3">
      <div className="p-4 rounded-2xl bg-bg-secondary border border-border-primary glow-border">
        <canvas ref={canvasRef} className="rounded-lg" />
      </div>
      <p className="text-xs text-text-muted text-center max-w-[300px]">
        Scan with your Zcash wallet (Zingo, Ywallet) to auto-fill the memo
      </p>
    </div>
  );
}
