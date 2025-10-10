export const FALLBACK_UA =
  'u1h3tjy9mvevd9agac79eqxxdz62tl8nus4uelzdlddwekhjpzpu4jn2yqe8zanl3zpyj4793qatc7hj7wwpf4rt42xratu2rvfvpvq0ax';

export function buildZcashURI(address: string, memo: string, amount = 0.001) {
  if (!address || !memo) return '';
  return `zcash:${address}?amount=${amount}&memo=${encodeURIComponent(memo)}`;
}

// ZQ-XXXX-YYYY (alfanumérico, fácil de leer/ditar)
export function generateMemoCode() {
  const alphabet = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789'; // sin 0,1,O,I para evitar confusiones
  const block = (len: number) =>
    Array.from({ length: len }, () => alphabet[Math.floor(Math.random() * alphabet.length)]).join('');
  return `ZQ-${block(4)}-${block(4)}`;
}
