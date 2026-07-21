import { GraphQLClient, gql } from "graphql-request";

// Endpoint do zkool_graphql (wallet do Hanh).
const ENDPOINT = process.env.HANH_GRAPHQL_URL ?? "http://localhost:8000/graphql";

const client = new GraphQLClient(ENDPOINT);

// ── Derivação de endereço novo por cobrança ────────────────────────────
// newAddresses(idAccount: Int!): Addresses!  → subcampo orchard
const NEW_ADDRESS = gql`
  mutation NewAddress($idAccount: Int!) {
    newAddresses(idAccount: $idAccount) {
      orchard
    }
  }
`;

export async function deriveNewOrchardAddress(
  idAccount: number,
): Promise<string> {
  const data = await client.request<{ newAddresses: { orchard: string } }>(
    NEW_ADDRESS,
    { idAccount },
  );
  return data.newAddresses.orchard;
}

// ── Criar conta watch-only a partir da UFVK ────────────────────────────
// createAccount(newAccount: NewAccount!): Int  → retorna o idAccount
// O campo `key` aceita a UFVK; como não há seed, a conta fica sem poder de gasto.
const CREATE_ACCOUNT = gql`
  mutation CreateAccount($input: NewAccount!) {
    createAccount(newAccount: $input)
  }
`;

export interface CreateAccountArgs {
  name: string;
  ufvk: string;
  birth?: number; // altura de nascimento (recomendado p/ não sincronizar desde o gênesis)
}

export async function createAccountFromUfvk(
  args: CreateAccountArgs,
): Promise<number> {
  const data = await client.request<{ createAccount: number }>(CREATE_ACCOUNT, {
    input: {
      name: args.name,
      key: args.ufvk, // a UFVK vai no campo genérico `key`
      aindex: 0,
      birth: args.birth ?? null,
      useInternal: false, // não usar endereços de troco internos p/ recebimento
    },
  });
  return data.createAccount;
}

// ── Sincronização da carteira ──────────────────────────────────────────
const SYNC = gql`
  mutation Sync($idAccount: Int!) {
    synchronizeAccount(idAccount: $idAccount, fast: true)
  }
`;

export async function syncAccount(idAccount: number): Promise<void> {
  await client.request(SYNC, { idAccount });
}

// ── Altura atual da chain (para calcular confirmações) ─────────────────
const CURRENT_HEIGHT = gql`
  query CurrentHeight {
    currentHeight
  }
`;

export async function fetchCurrentHeight(): Promise<number> {
  const data = await client.request<{ currentHeight: number }>(CURRENT_HEIGHT);
  return data.currentHeight;
}

// ── Altura já sincronizada pela conta (para saber se ainda falta baixar) ─
// latestHeight(idAccount): altura do último bloco processado pela wallet.
// Se o backend não expuser esse campo, a chamada lança e o chamador
// trata a sincronização como "desconhecida" (assume em dia).
const ACCOUNT_HEIGHT = gql`
  query AccountHeight($idAccount: Int!) {
    latestHeight(idAccount: $idAccount)
  }
`;

export async function fetchAccountHeight(
  idAccount: number,
): Promise<number | null> {
  try {
    const data = await client.request<{ latestHeight: number }>(ACCOUNT_HEIGHT, {
      idAccount,
    });
    return data.latestHeight;
  } catch {
    return null;
  }
}

// ── Estado da blockchain / conexão com o zkool_graphql ─────────────────
// Consolida numa só chamada: se o endpoint responde (online), a altura da
// chain, a altura já sincronizada pela conta e se ainda está sincronizando.
// `syncing` = a conta ainda não alcançou a ponta da chain (com folga de 1
// bloco para não piscar a cada bloco novo minerado).
export interface ChainStatus {
  online: boolean; // zkool_graphql respondeu
  chainHeight: number | null; // ponta da chain
  syncedHeight: number | null; // altura processada pela conta
  syncing: boolean; // ainda falta baixar/processar blocos
}

const SYNC_LAG_TOLERANCE = 1; // blocos de folga antes de considerar "syncing"

export async function fetchChainStatus(
  idAccount: number | null,
): Promise<ChainStatus> {
  let chainHeight: number | null = null;
  try {
    chainHeight = await fetchCurrentHeight();
  } catch {
    // endpoint fora do ar ou erro de rede → considera offline
    return {
      online: false,
      chainHeight: null,
      syncedHeight: null,
      syncing: false,
    };
  }

  let syncedHeight: number | null = null;
  if (idAccount !== null) {
    syncedHeight = await fetchAccountHeight(idAccount);
  }

  const syncing =
    chainHeight !== null &&
    syncedHeight !== null &&
    chainHeight - syncedHeight > SYNC_LAG_TOLERANCE;

  return { online: true, chainHeight, syncedHeight, syncing };
}

// ── Saldo da conta ─────────────────────────────────────────────────────
const BALANCE = gql`
  query Balance($idAccount: Int!) {
    balanceByAccount(idAccount: $idAccount) {
      total
    }
  }
`;

export async function fetchBalance(idAccount: number): Promise<string> {
  try {
    const data = await client.request<{ balanceByAccount: { total: string } }>(
      BALANCE,
      { idAccount },
    );
    return data.balanceByAccount.total;
  } catch {
    return "0";
  }
}

// ── Transações da conta, com notes (memo/valor da nossa conta) ─────────
// transactionsByAccount(idAccount, height): [Transaction!]!
// Em conta watch-only, o valor recebido e o memo aparecem em `notes`
// (as notas que pertencem à conta), não em `outputs`.
const TXS_BY_ACCOUNT = gql`
  query TxsByAccount($idAccount: Int!, $height: Int) {
    transactionsByAccount(idAccount: $idAccount, height: $height) {
      id
      txid
      height
      value
      notes {
        value
        scope
        address
        memo
      }
    }
  }
`;

export interface HanhNote {
  value: string; // BigDecimal chega como string
  scope: number; // 0 = externa (recebida), 1 = interna (troco)
  address: string;
  memo: string | null;
}

export interface HanhTx {
  id: number;
  txid: string;
  height: number;
  value: string;
  notes: HanhNote[];
}

export async function fetchTransactions(
  idAccount: number,
  fromHeight?: number,
): Promise<HanhTx[]> {
  const data = await client.request<{ transactionsByAccount: HanhTx[] }>(
    TXS_BY_ACCOUNT,
    { idAccount, height: fromHeight ?? null },
  );
  return data.transactionsByAccount ?? [];
}

// ── Memos de uma transação (query dedicada) ────────────────────────────
// Fallback: em algumas versões o memo não vem em `notes`, e sim aqui.
const MEMOS_BY_TX = gql`
  query MemosByTx($idAccount: Int!, $idTransaction: Int!) {
    memosByTransaction(idAccount: $idAccount, idTransaction: $idTransaction)
  }
`;

export async function fetchMemos(
  idAccount: number,
  idTransaction: number,
): Promise<string[]> {
  try {
    const data = await client.request<{ memosByTransaction: string[] }>(
      MEMOS_BY_TX,
      { idAccount, idTransaction },
    );
    return (data.memosByTransaction ?? []).filter(Boolean);
  } catch {
    return [];
  }
}