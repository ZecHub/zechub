'use client';

import Image from 'next/image';
import { Card } from '@/components/ui/card';
import { QRCodeSVG } from 'qrcode.react';

type Props = {
  zcashURI: string;       // zcash:<UA>?amount=0.001&memo=<CODE>
  loading?: boolean;
  qrImageSrc?: string;    // Fallback visual (branding): /qr/zyberquest-qr.jpg
};

export default function QrBox({ zcashURI, loading, qrImageSrc }: Props) {
  const hasURI = Boolean(zcashURI);

  return (
    <Card className="flex flex-col items-center gap-2 border-zinc-800/60 bg-zinc-950/60 p-4">
      <div className="text-xs text-zinc-400">Scan to pay</div>

      <div
        className={`grid size-44 place-items-center rounded-lg border border-zinc-800 bg-zinc-900/60 p-2 ${
          loading ? 'animate-pulse' : ''
        }`}
        aria-label="Payment QR"
        role="img"
      >
        {loading ? (
          <span className="font-mono text-[10px] text-zinc-500">preparing…</span>
        ) : hasURI ? (
          <QRCodeSVG value={zcashURI} includeMargin />
        ) : qrImageSrc ? (
          <Image src={qrImageSrc} alt="Zcash payment QR" width={160} height={160} className="rounded" />
        ) : (
          <span className="font-mono text-[10px] text-zinc-500">—</span>
        )}
      </div>

      {/* Nota: removido el enlace debajo del QR para evitar redirecciones */}
    </Card>
  );
}
