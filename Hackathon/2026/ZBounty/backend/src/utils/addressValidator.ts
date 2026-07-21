import bs58check from 'bs58check';

/**
 * Validates a Zcash mainnet address (t-address or Unified Address).
 * Mainnet P2PKH addresses start with 't1'.
 * Mainnet P2SH addresses start with 't3'.
 * Mainnet Unified Addresses start with 'u1'.
 */
export function validateZcashAddress(address: string): boolean {
  if (!address || typeof address !== 'string') {
    return false;
  }

  // Unified Address check (starts with u1, typically > 100 chars, bech32m encoded)
  if (address.startsWith('u1')) {
    // Basic length/format validation for hackathon (a real app would use a bech32m library)
    return address.length > 70 && /^[a-z0-9]+$/i.test(address);
  }

  // Transparent Address check (starts with t1 or t3)
  if (!address.startsWith('t1') && !address.startsWith('t3')) {
    return false;
  }

  try {
    const decoded = bs58check.decode(address);

    // Decoded payload should be 22 bytes (2 byte prefix + 20 byte hash)
    if (decoded.length !== 22) {
      return false;
    }

    // Check version bytes
    const prefix = decoded.subarray(0, 2);
    
    // t1 prefix: 1CB8
    if (address.startsWith('t1') && prefix[0] === 0x1C && prefix[1] === 0xB8) {
      return true;
    }

    // t3 prefix: 1CBD
    if (address.startsWith('t3') && prefix[0] === 0x1C && prefix[1] === 0xBD) {
      return true;
    }

    return false;
  } catch (err) {
    // bs58check.decode throws an error if the checksum is invalid or format is wrong
    return false;
  }
}
