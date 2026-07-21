import QRCode from 'qrcode';
import { createEncoder } from './qr-transport';

const FRAME_RATE = 8;

export function startDisplay(canvas: HTMLCanvasElement, bytes: Uint8Array): () => void {
  const encoder = createEncoder(bytes);
  let timer: ReturnType<typeof setInterval> | null = null;

  async function tick() {
    const part = encoder.nextPart();
    await QRCode.toCanvas(canvas, part, {
      errorCorrectionLevel: 'L',
      margin: 2,
      width: canvas.width,
    });
  }

  timer = setInterval(tick, Math.round(1000 / FRAME_RATE));
  tick();
  return () => { if (timer) clearInterval(timer); };
}
