import { PrismaClient } from "@prisma/client";
import {
  fetchTransactions,
  fetchCurrentHeight,
  fetchMemos,
  syncAccount,
} from "./hanh";
import { parseMemo } from "./memo";

const MIN_CONFIRMATIONS = 1;
const POLL_INTERVAL_MS = 8000;

function compareDecimal(a: string, b: string): number {
  const norm = (s: string) => {
    const neg = s.trim().startsWith("-");
    const [i, f = ""] = s.replace("-", "").split(".");
    return { neg, i, f };
  };
  const A = norm(a);
  const B = norm(b);
  const len = Math.max(A.f.length, B.f.length);
  let an = BigInt(A.i + A.f.padEnd(len, "0"));
  let bn = BigInt(B.i + B.f.padEnd(len, "0"));
  if (A.neg) an = -an;
  if (B.neg) bn = -bn;
  return an < bn ? -1 : an > bn ? 1 : 0;
}

function sumDecimals(values: string[]): string {
  const D = 8;
  let acc = 0n;
  for (const v of values) {
    const [i, f = ""] = (v || "0").split(".");
    acc += BigInt(i + f.padEnd(D, "0").slice(0, D));
  }
  const s = acc.toString().padStart(D + 1, "0");
  const int = s.slice(0, -D);
  const frac = s.slice(-D).replace(/0+$/, "");
  return frac ? `${int}.${frac}` : int;
}

export function startPaymentWatcher(
  prisma: PrismaClient,
  idAccount: number,
  hmacKey: Buffer,
  onUpdate: (paymentId: string, status: string) => void,
) {
  let running = true;

  async function settle(
    prisma: PrismaClient,
    paymentId: string,
    txid: string,
    receivedZec: string,
    expectedZec: string,
    onUpdate: (id: string, status: string) => void,
  ) {
    const cmp = compareDecimal(receivedZec, expectedZec);
    const status = cmp < 0 ? "UNDERPAID" : "PAID";
    await prisma.payment.update({
      where: { id: paymentId },
      data: { status, txid, receivedZec, detectedAt: new Date() },
    });
    onUpdate(paymentId, status);
  }

  async function tick() {
    if (!running) return;
    try {
      await syncAccount(idAccount);
      const [txs, currentHeight] = await Promise.all([
        fetchTransactions(idAccount),
        fetchCurrentHeight(),
      ]);

      for (const tx of txs) {
        const confirmations =
          tx.height > 0 ? currentHeight - tx.height + 1 : 0;
        if (confirmations < MIN_CONFIRMATIONS) continue;

        // considera apenas notas recebidas (scope externo = 0);
        // notas de troco (scope 1) não representam pagamento a nós
        const received = tx.notes.filter((n) => n.scope === 0);
        if (received.length === 0) continue;

        // ── Camada 1: correlação por ENDEREÇO ──
        // procura pagamento pendente cujo address bate com o de alguma nota
        let matched = false;
        for (const note of received) {
          const payment = await prisma.payment.findFirst({
            where: { address: note.address, status: "PENDING" },
          });
          if (!payment) continue;

          // soma todas as notas recebidas nesse mesmo endereço
          const total = sumDecimals(
            received.filter((n) => n.address === note.address).map((n) => n.value),
          );
          await settle(prisma, payment.id, tx.txid, total, payment.amountZec, onUpdate);
          matched = true;
          break;
        }
        if (matched) continue;

        // ── Camada 2: correlação por MEMO (fallback / verificação) ──
        const memoCandidates: string[] = received
          .map((n) => n.memo)
          .filter((m): m is string => !!m);
        if (memoCandidates.length === 0) {
          const fallback = await fetchMemos(idAccount, tx.id);
          memoCandidates.push(...fallback);
        }

        for (const memo of memoCandidates) {
          const parsed = parseMemo(hmacKey, memo);
          if (!parsed || !parsed.valid) continue;

          const payment = await prisma.payment.findUnique({
            where: { orderId: parsed.orderId },
          });
          if (!payment || payment.status !== "PENDING") continue;

          const total = sumDecimals(received.map((n) => n.value));
          await settle(prisma, payment.id, tx.txid, total, payment.amountZec, onUpdate);
          break;
        }
      }

      const expired = await prisma.payment.updateMany({
        where: { status: "PENDING", expiresAt: { lt: new Date() } },
        data: { status: "EXPIRED" },
      });
      if (expired.count > 0) onUpdate("*", "EXPIRED");
    } catch (err) {
      console.error("[watcher] erro no ciclo:", (err as Error).message);
    } finally {
      if (running) setTimeout(tick, POLL_INTERVAL_MS);
    }
  }

  tick();
  return () => {
    running = false;
  };
}