import { useEffect, useMemo, useRef } from "react";
import QRCodeLib from "qrcode";

interface Props {
  value: string;
  size?: number;
  dotColor?: string;
  bgColor?: string;
  /** Tint for the three finder-pattern "eyes" — defaults to dotColor. */
  finderColor?: string;
  dotRadius?: number;
  finderRadius?: number;
  logo?: React.ReactNode;
}

/**
 * Styled QR code with rounded dots, rounded finder patterns, an optional tinted
 * finder color, and an optional center logo. Renders to canvas for full control
 * over dot shapes. Encodes real data via the `qrcode` library.
 */
export default function StyledQR({
  value,
  size = 232,
  dotColor = "#14110a",
  bgColor = "#fbf8f0",
  finderColor,
  dotRadius = 0.5,
  finderRadius = 0.7,
  logo,
}: Props) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  // Level H + a punched logo hole + separated dots only decode reliably for small
  // codes. Long payloads (e.g. a full ZecAuth challenge) push the QR to version 20+,
  // where ~2px modules fragment and the hole erases alignment patterns — phone
  // cameras can no longer read it. For dense codes, fall back to level M, solid
  // connected modules, and no logo hole.
  const { qr, dense } = useMemo(() => {
    let qr = QRCodeLib.create(value, { errorCorrectionLevel: "H" });
    const dense = qr.modules.size > 53; // QR version > 9
    if (dense) qr = QRCodeLib.create(value, { errorCorrectionLevel: "M" });
    return { qr, dense };
  }, [value]);
  const showLogo = logo != null && !dense;

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const modules = qr.modules;
    const moduleCount = modules.size;
    const data = modules.data;
    const finderInk = finderColor ?? dotColor;

    const ctx = canvas.getContext("2d")!;
    const dpr = window.devicePixelRatio || 1;
    canvas.width = size * dpr;
    canvas.height = size * dpr;
    canvas.style.width = `${size}px`;
    canvas.style.height = `${size}px`;
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    ctx.clearRect(0, 0, size, size);

    const padding = size * 0.05;
    const available = size - padding * 2;
    const cellSize = available / moduleCount;

    // Background
    ctx.fillStyle = bgColor;
    ctx.fillRect(0, 0, size, size);

    const finderPositions = [
      [0, 0],
      [moduleCount - 7, 0],
      [0, moduleCount - 7],
    ];

    function isFinderModule(row: number, col: number): boolean {
      return finderPositions.some(
        ([fr, fc]) => row >= fc && row < fc + 7 && col >= fr && col < fr + 7,
      );
    }

    // Logo clear zone (center 22%)
    const logoZone = moduleCount * 0.22;
    const logoStart = Math.floor((moduleCount - logoZone) / 2);
    const logoEnd = Math.ceil((moduleCount + logoZone) / 2);

    function isLogoZone(row: number, col: number): boolean {
      return showLogo && row >= logoStart && row < logoEnd && col >= logoStart && col < logoEnd;
    }

    // Finder patterns (rounded squares, tinted)
    for (const [fx, fy] of finderPositions) {
      const x = padding + fx * cellSize;
      const y = padding + fy * cellSize;
      const outerSize = 7 * cellSize;
      const r = finderRadius * cellSize;

      ctx.fillStyle = finderInk;
      roundRect(ctx, x, y, outerSize, outerSize, r * 2.4);
      ctx.fill();

      ctx.fillStyle = bgColor;
      const gap = cellSize;
      roundRect(ctx, x + gap, y + gap, outerSize - gap * 2, outerSize - gap * 2, r * 1.7);
      ctx.fill();

      ctx.fillStyle = finderInk;
      const cGap = cellSize * 2;
      roundRect(ctx, x + cGap, y + cGap, outerSize - cGap * 2, outerSize - cGap * 2, r);
      ctx.fill();
    }

    // Data dots (rounded)
    ctx.fillStyle = dotColor;
    for (let row = 0; row < moduleCount; row++) {
      for (let col = 0; col < moduleCount; col++) {
        if (isFinderModule(row, col)) continue;
        if (isLogoZone(row, col)) continue;

        const idx = row * moduleCount + col;
        if (!data[idx]) continue;

        const x = padding + col * cellSize;
        const y = padding + row * cellSize;
        if (dense) {
          // Solid, connected modules — slight overlap avoids antialiasing seams.
          ctx.fillRect(x, y, cellSize + 0.5, cellSize + 0.5);
          continue;
        }
        const dotSize = cellSize * 0.84;
        const offset = (cellSize - dotSize) / 2;
        const r = dotSize * dotRadius;

        roundRect(ctx, x + offset, y + offset, dotSize, dotSize, r);
        ctx.fill();
      }
    }
  }, [qr, dense, showLogo, size, dotColor, bgColor, finderColor, dotRadius, finderRadius]);

  return (
    <div style={{ position: "relative", display: "inline-block", lineHeight: 0 }}>
      <canvas ref={canvasRef} />
      {showLogo && (
        <div style={{ position: "absolute", inset: 0, display: "flex", alignItems: "center", justifyContent: "center" }}>
          {logo}
        </div>
      )}
    </div>
  );
}

function roundRect(
  ctx: CanvasRenderingContext2D,
  x: number,
  y: number,
  w: number,
  h: number,
  r: number,
) {
  r = Math.min(r, w / 2, h / 2);
  ctx.beginPath();
  ctx.moveTo(x + r, y);
  ctx.lineTo(x + w - r, y);
  ctx.arcTo(x + w, y, x + w, y + r, r);
  ctx.lineTo(x + w, y + h - r);
  ctx.arcTo(x + w, y + h, x + w - r, y + h, r);
  ctx.lineTo(x + r, y + h);
  ctx.arcTo(x, y + h, x, y + h - r, r);
  ctx.lineTo(x, y + r);
  ctx.arcTo(x, y, x + r, y, r);
  ctx.closePath();
}
