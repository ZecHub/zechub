import { posix } from 'node:path';

/**
 * Converts the given file path to POSIX style. * @param{string} pathname - original file path.
 */
function toPosixPath(pathname: string) {
  return pathname.split(`\\`).join(posix.sep);
}

export { toPosixPath };