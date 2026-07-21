'use client';

import QRCodeLib from 'react-qr-code';

// react-qr-code's bundled types predate React 19 and fail JSX element checks.
const QRCode = QRCodeLib as unknown as React.FC<{
  value: string; size?: number; level?: 'L' | 'M' | 'Q' | 'H'; fgColor?: string; bgColor?: string;
}>;

// QR with the ZEC-OS logo centered. Level H error correction (30% recoverable)
// tolerates the logo covering the middle; the white wrapper is the quiet zone
// scanners need — do not remove it on dark backgrounds.
export function ZecQr({ value, size = 168 }: { value: string; size?: number }) {
  const logoSize = Math.round(size * 0.22);
  return (
    <div style={{ position: 'relative', background: '#fff', padding: 10, display: 'inline-block', lineHeight: 0 }}>
      <QRCode value={value} size={size} level="H" fgColor="#000000" bgColor="#ffffff" />
      <div
        style={{
          position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)',
          background: '#fff', padding: 3, lineHeight: 0,
        }}
      >
        <img
          src="/zec-logo.svg"
          alt=""
          width={logoSize}
          height={logoSize}
          style={{ imageRendering: 'pixelated', display: 'block' }}
        />
      </div>
    </div>
  );
}
