import QRCode from 'qrcode';
import { createEncoder } from './qr-transport.js';

const FRAME_RATE = 8;

export function startDisplay(canvas, bytes) {
  const encoder = createEncoder(bytes);
  let timer = null;

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
  return () => clearInterval(timer);
}
