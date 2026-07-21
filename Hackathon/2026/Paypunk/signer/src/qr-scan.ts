import jsQR from 'jsqr';
import { createDecoder } from './qr-transport';

export async function scanBytes(videoEl: HTMLVideoElement, { onProgress }: { onProgress?: (p: number) => void } = {}): Promise<Uint8Array> {
  console.log('[signer] scanBytes: opening camera...');
  let stream: MediaStream;
  try {
    stream = await navigator.mediaDevices.getUserMedia({
      video: { facingMode: 'environment' },
      audio: false,
    });
    console.log('[signer] scanBytes: camera opened, tracks:', stream.getTracks().length);
    stream.getTracks().forEach(t => {
      console.log('[signer] track:', t.kind, t.label, 'enabled:', t.enabled, 'readyState:', t.readyState);
    });
  } catch (e) {
    console.error('[signer] scanBytes: getUserMedia failed:', e);
    throw e;
  }

  videoEl.srcObject = stream;
  try {
    await videoEl.play();
    console.log('[signer] scanBytes: video play() OK, readyState:', videoEl.readyState, 'videoWidth:', videoEl.videoWidth, 'videoHeight:', videoEl.videoHeight);
  } catch (e) {
    console.error('[signer] scanBytes: video.play() failed:', e);
    stream.getTracks().forEach(t => t.stop());
    throw e;
  }

  const canvas = document.createElement('canvas');
  const ctx = canvas.getContext('2d', { willReadFrequently: true });
  if (!ctx) {
    console.error('[signer] scanBytes: canvas 2d context is null');
    stream.getTracks().forEach(t => t.stop());
    throw new Error('canvas 2d context not available');
  }
  const decoder = createDecoder();

  return new Promise((resolve) => {
    let raf = 0;
    let frameCount = 0;
    let qrCount = 0;
    const stop = () => {
      console.log(`[signer] scanBytes: stopping, frames: ${frameCount}, QR detections: ${qrCount}`);
      cancelAnimationFrame(raf);
      stream.getTracks().forEach((t) => t.stop());
    };

    function loop() {
      const rs = videoEl.readyState;
      if (rs >= videoEl.HAVE_CURRENT_DATA) {
        frameCount++;
        const vw = videoEl.videoWidth;
        const vh = videoEl.videoHeight;

        if (canvas.width !== vw || canvas.height !== vh) {
          canvas.width = vw;
          canvas.height = vh;
        }

        if (vw > 0 && vh > 0) {
          ctx!.drawImage(videoEl, 0, 0, vw, vh);
          const img = ctx!.getImageData(0, 0, vw, vh);

          if (frameCount % 30 === 0) {
            console.log(`[signer] frame ${frameCount}: ${vw}x${vh}, trying jsQR...`);
          }

          const code = jsQR(img.data, img.width, img.height, {
            inversionAttempts: 'attemptBoth',
          });

          if (code && code.data) {
            qrCount++;
            console.log(`[signer] QR DETECTED frame ${frameCount}: data="${code.data.substring(0, 80)}"`);
            decoder.receive(code.data);
            const pct = decoder.progress;
            console.log(`[signer] decoder progress: ${pct}, isComplete: ${decoder.isComplete}`);
            onProgress?.(pct);
            if (decoder.isComplete) {
              const bytes = decoder.result;
              console.log(`[signer] DECODE COMPLETE, result bytes: ${bytes?.length}`);
              stop();
              if (bytes) {
                resolve(bytes);
              } else {
                console.error('[signer] decoder isComplete but result is null');
              }
              return;
            }
          } else if (frameCount % 60 === 0) {
            console.log(`[signer] frame ${frameCount}: no QR detected, first 16 pixels: ${Array.from(img.data.slice(0, 16)).join(',')}`);
          }
        } else if (frameCount % 30 === 0) {
          console.log(`[signer] frame ${frameCount}: video dimensions 0 (vw=${vw}, vh=${vh})`);
        }
      } else if (frameCount % 30 === 0) {
        console.log(`[signer] frame ${frameCount}: video not ready, readyState=${rs}`);
        frameCount++;
      }
      raf = requestAnimationFrame(loop);
    }
    loop();
  });
}
