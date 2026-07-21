import { app, BrowserWindow, ipcMain, shell } from "electron";
import path from "node:path";
import crypto from "node:crypto";
import { PrismaClient } from "@prisma/client";
import {
  encryptUFVK,
  decryptUFVK,
  hashAdminPassword,
  verifyAdminPassword,
  deriveHmacKey,
} from "./crypto";
import { buildMemo, buildZip321URI, generateOrderId, parseMemo } from "./memo";
import {
  deriveNewOrchardAddress,
  createAccountFromUfvk,
  fetchCurrentHeight,
  fetchBalance,
  fetchTransactions,
  fetchChainStatus,
} from "./hanh";
import { startPaymentWatcher } from "./paymentWatcher";
import { fetchZecUsd } from "./price";
import { loadSettings, saveSettings } from "./settings";
import QRCode from "qrcode";

const prisma = new PrismaClient();

// Soma valores decimais em string sem float (evita erro de ponto flutuante).
function sumDecimals(values: string[]): string {
  const DECIMALS = 8; // ZEC tem 8 casas
  let acc = 0n;
  for (const v of values) {
    const [i, f = ""] = (v || "0").split(".");
    acc += BigInt(i + f.padEnd(DECIMALS, "0").slice(0, DECIMALS));
  }
  const s = acc.toString().padStart(DECIMALS + 1, "0");
  const int = s.slice(0, -DECIMALS);
  const frac = s.slice(-DECIMALS).replace(/0+$/, "");
  return frac ? `${int}.${frac}` : int;
}

// ── Estado sensível: vive SÓ em memória, nunca vai para disco nem renderer ──
let sessionHmacKey: Buffer | null = null;
let sessionIdAccount: number | null = null;
let stopWatcher: (() => void) | null = null;
let mainWindow: BrowserWindow | null = null;

const isDev = !app.isPackaged;

function createWindow() {
  mainWindow = new BrowserWindow({
    width: 480,
    height: 720,
    frame: false,
    transparent: true,
    resizable: false,
    hasShadow: false,
    backgroundColor: "#00000000",
    // Sem backgroundMaterial/vibrancy: eles pintam um retângulo opaco atrás
    // que reintroduz cantos retos. O arredondamento é feito no .app-shell (CSS),
    // sobre uma janela totalmente transparente.
    webPreferences: {
      preload: path.join(__dirname, "preload.js"),
      contextIsolation: true,
      nodeIntegration: false,
      sandbox: false,
    },
  });

  if (isDev) mainWindow.loadURL("http://localhost:5173");
  else mainWindow.loadFile(path.join(__dirname, "../dist/index.html"));
}

// ── Cadastro da UFVK: só permitido se ainda não existir (imutável) ──
// Cria a conta watch-only no zkool_graphql a partir da UFVK, captura o
// idAccount real retornado pelo Hanh, e só então grava tudo no Prisma.
ipcMain.handle("wallet:register", async (_e, { ufvk, password, name }) => {
  const existing = await prisma.walletConfig.findFirst();
  if (existing) throw new Error("Uma carteira já está cadastrada.");

  // birth = altura atual menos uma margem: garante que a conta enxergue
  // transações recentes mesmo que o cadastro ocorra logo após um pagamento.
  // Em produção o QR é gerado antes do pagamento, mas a margem protege testes
  // e pequenas defasagens de sincronização.
  let birth: number | undefined;
  try {
    const h = await fetchCurrentHeight();
    birth = Math.max(0, h - 1000);
  } catch {
    birth = undefined; // se falhar, o Hanh sincroniza desde o padrão dele
  }

  const idAccount = await createAccountFromUfvk({
    name: name?.trim() || "PDV",
    ufvk: ufvk.trim(),
    birth,
  });

  const enc = await encryptUFVK(ufvk.trim(), password);
  const adminHash = await hashAdminPassword(password);
  const hmacSalt = crypto.randomBytes(16);

  await prisma.walletConfig.create({
    data: {
      id: 1,
      idAccount,
      ciphertext: enc.ciphertext,
      nonce: enc.nonce,
      authTag: enc.authTag,
      salt: enc.salt,
      adminHash,
      hmacSalt,
    },
  });
  return { ok: true, idAccount };
});

ipcMain.handle("wallet:isRegistered", async () => {
  return { registered: !!(await prisma.walletConfig.findFirst()) };
});

// ── Login: descriptografa a UFVK em memória e inicia o watcher ──
ipcMain.handle("wallet:unlock", async (_e, { password }) => {
  const cfg = await prisma.walletConfig.findFirst();
  if (!cfg) throw new Error("Nenhuma carteira cadastrada.");
  if (!(await verifyAdminPassword(cfg.adminHash, password)))
    throw new Error("Senha incorreta.");

  // valida a UFVK descriptografando (não a mantemos além do necessário)
  await decryptUFVK(
    {
      ciphertext: Buffer.from(cfg.ciphertext),
      nonce: Buffer.from(cfg.nonce),
      authTag: Buffer.from(cfg.authTag),
      salt: Buffer.from(cfg.salt),
    },
    password,
  );

  sessionHmacKey = await deriveHmacKey(password, Buffer.from(cfg.hmacSalt));
  sessionIdAccount = cfg.idAccount;

  stopWatcher?.();
  stopWatcher = startPaymentWatcher(
    prisma,
    sessionIdAccount,
    sessionHmacKey,
    (paymentId, status) => {
      mainWindow?.webContents.send("payment:update", { paymentId, status });
    },
  );
  return { ok: true };
});

// ── Criar cobrança ──
ipcMain.handle("payment:create", async (_e, { amountZec, ttlMinutes = 15 }) => {
  if (sessionHmacKey === null || sessionIdAccount === null)
    throw new Error("Sessão bloqueada. Faça login.");

  const orderId = generateOrderId();
  const address = await deriveNewOrchardAddress(sessionIdAccount);
  const memo = buildMemo(sessionHmacKey, orderId, amountZec);
  const uri = buildZip321URI(address, amountZec, memo);
  // errorCorrectionLevel "H" tolera ~30% de oclusão: é o que permite
  // sobrepor um logo no centro sem inviabilizar a leitura do QR.
  const qrDataUrl = await QRCode.toDataURL(uri, {
    margin: 1,
    width: 320,
    errorCorrectionLevel: "H",
  });
  const expiresAt = new Date(Date.now() + ttlMinutes * 60_000);

  const payment = await prisma.payment.create({
    data: { orderId, amountZec, address, memo, uri, expiresAt },
  });

  return { id: payment.id, uri, qrDataUrl, address, amountZec, expiresAt };
});

ipcMain.handle("payment:status", async (_e, { id }) => {
  const p = await prisma.payment.findUnique({ where: { id } });
  if (!p) throw new Error("Pagamento não encontrado.");
  return { status: p.status, receivedZec: p.receivedZec, txid: p.txid };
});

// ── Dashboard: lista de pagamentos gerados pelo PDV ──
ipcMain.handle("payments:list", async (_e, { limit = 50 } = {}) => {
  const rows = await prisma.payment.findMany({
    orderBy: { createdAt: "desc" },
    take: limit,
  });
  return rows.map((p) => ({
    id: p.id,
    amountZec: p.amountZec,
    receivedZec: p.receivedZec,
    status: p.status,
    txid: p.txid,
    createdAt: p.createdAt.toISOString(),
    detectedAt: p.detectedAt?.toISOString() ?? null,
  }));
});

// ── Dashboard: resumo (saldo + total recebido hoje + nº pagamentos hoje) ──
ipcMain.handle("dashboard:summary", async () => {
  if (sessionIdAccount === null) throw new Error("Sessão bloqueada.");

  const startOfDay = new Date();
  startOfDay.setHours(0, 0, 0, 0);

  const [balance, todayPaid, zecUsd] = await Promise.all([
    fetchBalance(sessionIdAccount),
    prisma.payment.findMany({
      where: {
        detectedAt: { gte: startOfDay },
        status: { in: ["PAID", "UNDERPAID"] },
      },
      select: { receivedZec: true },
    }),
    fetchZecUsd(),
  ]);

  // soma decimal segura dos recebidos hoje
  const totalToday = sumDecimals(
    todayPaid.map((p) => p.receivedZec ?? "0"),
  );

  return {
    balanceZec: balance,
    receivedTodayZec: totalToday,
    paymentsToday: todayPaid.length,
    zecUsd,
    balanceUsd: zecUsd !== null ? Number(balance) * zecUsd : null,
    receivedTodayUsd: zecUsd !== null ? Number(totalToday) * zecUsd : null,
  };
});

// ── Dashboard: transações reais on-chain (via Hanh) ──
// Retorna apenas transações que existem na blockchain, com txid, altura,
// confirmações, valor e memo. Cruza com nossos pagamentos pelo memo para
// distinguir cobranças do PDV e mostrar valor esperado vs recebido.
ipcMain.handle("chain:transactions", async () => {
  if (sessionIdAccount === null || sessionHmacKey === null)
    throw new Error("Sessão bloqueada.");

  const [txs, currentHeight, zecUsd] = await Promise.all([
    fetchTransactions(sessionIdAccount),
    fetchCurrentHeight(),
    fetchZecUsd(),
  ]);

  const result = [];
  for (const tx of txs) {
    const confirmations = tx.height > 0 ? currentHeight - tx.height + 1 : 0;

    // notas recebidas (scope externo = 0)
    const received = tx.notes.filter((n) => n.scope === 0);
    const receivedZec = sumDecimals(received.map((n) => n.value));

    // tenta casar com um pagamento do PDV pelo endereço de alguma nota
    let orderId: string | null = null;
    let expectedZec: string | null = null;
    let memoText: string | null = null;

    for (const note of received) {
      if (note.memo) memoText = note.memo;
      const payment = await prisma.payment.findFirst({
        where: { address: note.address },
      });
      if (payment) {
        orderId = payment.orderId;
        expectedZec = payment.amountZec;
        break;
      }
    }

    result.push({
      txid: tx.txid,
      height: tx.height,
      confirmations,
      valueZec: receivedZec,
      receivedZec,
      receivedUsd: zecUsd !== null ? Number(receivedZec) * zecUsd : null,
      expectedZec,
      orderId,
      memo: memoText,
      isPdvCharge: orderId !== null,
    });
  }

  // mais recentes primeiro
  result.sort((a, b) => b.height - a.height);
  return result;
});

// ── Estado da blockchain / zkool_graphql ──
// Consumido pelo dashboard e pelo modal de cobrança para expor se a chain
// está sincronizando, a altura de bloco atual e se o backend GraphQL responde.
// Não exige sessão: mesmo bloqueado, é útil saber se o backend está no ar.
// Quando há sessão, informa também a altura já sincronizada pela conta.
ipcMain.handle("chain:status", async () => {
  return fetchChainStatus(sessionIdAccount);
});

// ── Controles de janela (frame: false não tem botões nativos) ──
ipcMain.handle("window:minimize", () => {
  mainWindow?.minimize();
});

ipcMain.handle("window:close", () => {
  mainWindow?.close();
});

// ── Configurações de UI ──
ipcMain.handle("price:zecUsd", async () => {
  return { zecUsd: await fetchZecUsd() };
});

ipcMain.handle("settings:get", async () => {
  return loadSettings();
});

ipcMain.handle("settings:set", async (_e, patch) => {
  return saveSettings(patch);
});

// ── Abrir URL no navegador externo do sistema ──
// Só permite http/https para evitar abrir esquemas perigosos (file:, etc.).
ipcMain.handle("shell:openExternal", async (_e, { url }) => {
  const parsed = new URL(url);
  if (parsed.protocol !== "https:" && parsed.protocol !== "http:")
    throw new Error("Protocolo não permitido.");
  await shell.openExternal(url);
  return { ok: true };
});

app.whenReady().then(createWindow);
app.on("window-all-closed", () => {
  stopWatcher?.();
  if (process.platform !== "darwin") app.quit();
});