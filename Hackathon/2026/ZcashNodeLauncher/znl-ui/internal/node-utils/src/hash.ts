import { createHash } from 'node:crypto';

/**
 * Production content-based hash, custom-defined length* @param content* @param hashLSize
 */
function generatorContentHash(content: string, hashLSize?: number) {
  const hash = createHash('md5').update(content, 'utf8').digest('hex');

  if (hashLSize) {
    return hash.slice(0, hashLSize);
  }

  return hash;
}

export { generatorContentHash };