import jsQR from 'jsqr';
import { createDecoder } from './qr-transport.js';

export async function scanBytes(videoEl, { onProgress } = {}) {
  const stream = await navigator.mediaDevices.getUserMedia({
    video: { facingMode: 'environment' },
    audio: false,
  });
  videoEl.srcObject = stream;
  await videoEl.play();

  const canvas = document.createElement('canvas');
  const ctx = canvas.getContext('2d', { willReadFrequently: true });
  const decoder = createDecoder();

  return new Promise((resolve) => {
    let raf = 0;
    const stop = () => {
      cancelAnimationFrame(raf);
      stream.getTracks().forEach((t) => t.stop());
    };

    function loop() {
      if (videoEl.readyState === videoEl.HAVE_ENOUGH_DATA) {
        canvas.width = videoEl.videoWidth;
        canvas.height = videoEl.videoHeight;
        ctx.drawImage(videoEl, 0, 0, canvas.width, canvas.height);
        const img = ctx.getImageData(0, 0, canvas.width, canvas.height);
        const code = jsQR(img.data, img.width, img.height, {
          inversionAttempts: 'dontInvert',
        });
        if (code && code.data) {
          decoder.receive(code.data);
          onProgress?.(decoder.progress);
          if (decoder.isComplete) {
            const bytes = decoder.result;
            stop();
            resolve(bytes);
            return;
          }
        }
      }
      raf = requestAnimationFrame(loop);
    }
    loop();
  });
}
