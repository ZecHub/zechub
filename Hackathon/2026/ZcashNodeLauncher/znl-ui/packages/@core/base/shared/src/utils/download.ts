import { openWindow } from './window';

interface DownloadOptions<T = string> {
  fileName?: string;
  source: T;
  target?: string;
}

const DEFAULT_FILENAME = 'downloaded_file';

/**
 * Download files through URL to support cross-domain *@throws{Error} - drop error when download failed
 */
export async function downloadFileFromUrl({
  fileName,
  source,
  target = '_blank',
}: DownloadOptions): Promise<void> {
  if (!source || typeof source !== 'string') {
    throw new Error('Invalid URL.');
  }

  const isChrome = window.navigator.userAgent.toLowerCase().includes('chrome');
  const isSafari = window.navigator.userAgent.toLowerCase().includes('safari');

  if (/iP/.test(window.navigator.userAgent)) {
    console.error('Your browser does not support download!');
    return;
  }

  if (isChrome || isSafari) {
    triggerDownload(source, resolveFileName(source, fileName));
    return;
  }
  if (!source.includes('?')) {
    source += '?download';
  }

  openWindow(source, { target });
}

/**
 * Download pictures (to allow cross-domains) * @param url - photo URL * @param canvasWidth - canvas width * @param canvasHeight - canvas height * @param DrawWithImageSize - the wide value of the picture when drawing on the canvas, by default * @returns
 */
export function downloadImageByCanvas({
  url,
  canvasWidth,
  canvasHeight,
  drawWithImageSize = true,
}: {
  canvasHeight?: number;
  canvasWidth?: number;
  drawWithImageSize?: boolean;
  url: string;
}) {
  const image = new Image();
  // image.setAttribute('crossOrigin', 'anonymous')
  image.src = url;
  image.addEventListener('load', () => {
    const canvas = document.createElement('canvas');
    canvas.width = canvasWidth || image.width;
    canvas.height = canvasHeight || image.height;
    const ctx = canvas.getContext('2d') as CanvasRenderingContext2D;
    ctx?.clearRect(0, 0, canvas.width, canvas.height);
    if (drawWithImageSize) {
      ctx.drawImage(image, 0, 0, image.width, image.height);
    } else {
      ctx.drawImage(image, 0, 0);
    }
    const url = canvas.toDataURL('image/png');
    downloadFileFromImageUrl({ source: url, fileName: 'image.png' });
  });
}

/**
 * Download files via Base64
 */
export function downloadFileFromBase64({ fileName, source }: DownloadOptions) {
  if (!source || typeof source !== 'string') {
    throw new Error('Invalid Base64 data.');
  }

  const resolvedFileName = fileName || DEFAULT_FILENAME;
  triggerDownload(source, resolvedFileName);
}

/**
 * Download a photo file through a photo URL
 */
export async function downloadFileFromImageUrl({
  fileName,
  source,
}: DownloadOptions) {
  const base64 = await urlToBase64(source);
  downloadFileFromBase64({ fileName, source: base64 });
}

/**
 * Download files via Blob
 */
export function downloadFileFromBlob({
  fileName = DEFAULT_FILENAME,
  source,
}: DownloadOptions<Blob>): void {
  if (!(source instanceof Blob)) {
    throw new TypeError('Invalid Blob data.');
  }

  const url = URL.createObjectURL(source);
  triggerDownload(url, fileName);
}

/**
 * Download files, support Blob, string and other BlobPart types
 */
export function downloadFileFromBlobPart({
  fileName = DEFAULT_FILENAME,
  source,
}: DownloadOptions<BlobPart>): void {
  // If Data is not Blob, convert to Blob
  const blob =
    source instanceof Blob
      ? source
      : new Blob([source], { type: 'application/octet-stream' });

  // Create object URL and trigger download
  const url = URL.createObjectURL(blob);
  triggerDownload(url, fileName);
}

/**
 * @description: base64 to blob
 */
export function dataURLtoBlob(base64Buf: string): Blob {
  const arr = base64Buf.split(',');
  const typeItem = arr[0];
  // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
  const mime = typeItem!.match(/:(.*?);/)![1];
  // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
  const bstr = window.atob(arr[1]!);
  let n = bstr.length;
  const u8arr = new Uint8Array(n);
  while (n--) {
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    u8arr[n] = bstr.codePointAt(n)!;
  }
  return new Blob([u8arr], { type: mime });
}

/**
 * img url to base64
 * @param url
 */
export function urlToBase64(url: string, mineType?: string): Promise<string> {
  return new Promise((resolve, reject) => {
    let canvas = document.createElement('CANVAS') as HTMLCanvasElement | null;
    const ctx = canvas?.getContext('2d');
    const img = new Image();
    img.crossOrigin = '';
    img.addEventListener('load', () => {
      if (!canvas || !ctx) {
        return reject(new Error('Failed to create canvas.'));
      }
      canvas.height = img.height;
      canvas.width = img.width;
      ctx.drawImage(img, 0, 0);
      const dataURL = canvas.toDataURL(mineType || 'image/png');
      canvas = null;
      resolve(dataURL);
    });
    img.src = url;
  });
}

/**
 * Convert Base64 string to a file object * @param base64 - Base64 string * @paramfileName - filename * @returns File object
 */
export function base64ToFile(base64: string, fileName: string): File {
  // Enter Authentication
  if (!base64 || typeof base64 !== 'string') {
    throw new Error('Base64 parameter must be a non-empty string');
  }

  // Split base64 by comma, separate prefix from subsequent content
  const data = base64.split(',');
  if (data.length !== 2 || !data[0] || !data[1]) {
    throw new Error('Invalid base64 format');
  }

  // Get type information using regular expression prefix (image/png, image/jpeg, image/webp, etc.)
  const typeMatch = data[0].match(/:(.*?);/);
  if (!typeMatch || !typeMatch[1]) {
    throw new Error('Could not parse base64 type information');
  }
  const type = typeMatch[1];

  // Fetch specific file format suffixes from type information (png, jpeg, webp)
  const typeParts = type.split('/');
  if (typeParts.length !== 2 || !typeParts[1]) {
    throw new Error('Invalid mimetype format');
  }
  const suffix = typeParts[1];

  try {
    // Decoding base64 data using atob() results in a file data stream output in string format
    const bstr = window.atob(data[1]);

    // Get the length of the decoding result string
    const n = bstr.length;
    // Create an equal integer array based on the length of the decoding result string
    const u8arr = new Uint8Array(n);

    // Optimised Uint8Array Filling Logic
    for (let i = 0; i < n; i++) {
      // Use charCodeAt() to get byte values for characters (Base64 decoding string is byte level)
      // eslint-disable-next-line unicorn/prefer-code-point
      u8arr[i] = bstr.charCodeAt(i);
    }

    // Returns File File Object
    return new File([u8arr], `${fileName}.${suffix}`, { type });
  } catch (error) {
    throw new Error(
      `Base64 decoding failed: ${error instanceof Error? error.message: 'unknown error'}`,
    );
  }
}

/**
 * Universal Download Trigger * @param href - URL for file download * @paramfileName - name for file download, automatic identification if not provided * @param revokeDelay - delay to clean URL (ms)
 */
export function triggerDownload(
  href: string,
  fileName: string | undefined,
  revokeDelay: number = 100,
): void {
  const defaultFileName = 'downloaded_file';
  const finalFileName = fileName || defaultFileName;

  const link = document.createElement('a');
  link.href = href;
  link.download = finalFileName;
  link.style.display = 'none';

  if (link.download === undefined) {
    link.setAttribute('target', '_blank');
  }

  document.body.append(link);
  link.click();
  link.remove();

  // Clear temporary URLs to release memory
  setTimeout(() => URL.revokeObjectURL(href), revokeDelay);
}

function resolveFileName(url: string, fileName?: string): string {
  return fileName || url.slice(url.lastIndexOf('/') + 1) || DEFAULT_FILENAME;
}