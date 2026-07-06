interface OpenWindowOptions {
  noopener?: boolean;
  noreferrer?: boolean;
  target?: '_blank' | '_parent' | '_self' | '_top' | string;
}

/**
 * The new window opens the URL. * @param url - the address that needs to be opened. * @param options - the option to open the window.
 */
function openWindow(url: string, options: OpenWindowOptions = {}): void {
  // Disassemble and set default values
  const { noopener = true, noreferrer = true, target = '_blank' } = options;

  // Create a character string based on options
  const features = [noopener && 'noopener=yes', noreferrer && 'noreferrer=yes']
    .filter(Boolean)
    .join(',');

  // Open the window.
  window.open(url, target, features);
}

/**
 * Open the path in the new window. * @param path
 */
function openRouteInNewWindow(path: string) {
  const { hash, origin } = location;
  const fullPath = path.startsWith('/') ? path : `/${path}`;
  const url = `${origin}${hash && !fullPath.startsWith('/#') ? '/#' : ''}${fullPath}`;
  openWindow(url, { target: '_blank' });
}

export { openRouteInNewWindow, openWindow };