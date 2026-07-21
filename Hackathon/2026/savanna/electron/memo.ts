import crypto from "node:crypto";

// Formato do memo (texto):  v1|<orderId>|<amount>|<hmac>
//  - orderId: token aleatório (base64url, 12 bytes)
//  - amount : valor esperado em ZEC (string decimal)
//  - hmac   : HMAC-SHA256(hmacKey, "v1|orderId|amount") truncado (base64url)
// Isso permite: correlacionar o pedido, detectar memo adulterado, e depois
// cruzar o amount esperado com o valor on-chain para acusar pagamento a menor.

const VERSION = "v1";

export function generateOrderId(): string {
  return crypto.randomBytes(12).toString("base64url");
}

function computeHmac(hmacKey: Buffer, orderId: string, amount: string): string {
  const data = `${VERSION}|${orderId}|${amount}`;
  return crypto
    .createHmac("sha256", hmacKey)
    .update(data)
    .digest("base64url")
    .slice(0, 22); // truncado; suficiente contra forja, cabe no memo (512 bytes)
}

export function buildMemo(
  hmacKey: Buffer,
  orderId: string,
  amount: string,
): string {
  const hmac = computeHmac(hmacKey, orderId, amount);
  return `${VERSION}|${orderId}|${amount}|${hmac}`;
}

export interface ParsedMemo {
  orderId: string;
  amount: string;
  valid: boolean; // HMAC confere
}

// Analisa um memo recebido on-chain e verifica a integridade via HMAC.
export function parseMemo(hmacKey: Buffer, memo: string): ParsedMemo | null {
  const parts = memo.trim().split("|");
  if (parts.length !== 4 || parts[0] !== VERSION) return null;
  const [, orderId, amount, hmac] = parts;
  const expected = computeHmac(hmacKey, orderId, amount);
  // comparação em tempo constante
  const valid =
    hmac.length === expected.length &&
    crypto.timingSafeEqual(Buffer.from(hmac), Buffer.from(expected));
  return { orderId, amount, valid };
}

// Monta o URI ZIP-321 (payment request do Zcash).
export function buildZip321URI(
  address: string,
  amountZec: string,
  memo: string,
): string {
  const memoB64 = Buffer.from(memo, "utf8").toString("base64url");
  const params = new URLSearchParams();
  params.set("amount", amountZec);
  params.set("memo", memoB64);
  return `zcash:${address}?${params.toString()}`;
}
