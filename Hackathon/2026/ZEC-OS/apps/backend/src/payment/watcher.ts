// Zaino gRPC payment watcher
// Watches for incoming ZEC transactions to deposit addresses
// TODO: wire up @grpc/grpc-js + lightwallet-protocol protobufs once Zaino endpoint is confirmed

export function startPaymentWatcher() {
  if (process.env.GAMBLING_MODE === 'off') return;

  console.log('[payment] watcher starting (mode:', process.env.GAMBLING_MODE, ')');

  if (process.env.GAMBLING_MODE === 'test') {
    console.log('[payment] test mode — no real Zaino connection');
    return;
  }

  // live mode — connect to Zaino gRPC
  const zainoUrl = process.env.ZAINO_GRPC_URL;
  if (!zainoUrl) {
    console.error('[payment] ZAINO_GRPC_URL not set — payment watcher disabled');
    return;
  }

  // TODO: implement gRPC streaming subscription to Zaino
  // Pattern:
  //   const client = new CompactTxStreamerClient(zainoUrl, grpc.credentials.createInsecure())
  //   client.getBlockRange(...) or subscribeToTransactions(...)
  //   On incoming tx to a known deposit address:
  //     - verify amount >= CHARACTER_CREATION_FEE
  //     - mark DepositAddress.used = true
  //     - create Character, issue characterKey
  console.log('[payment] Zaino gRPC watcher ready — awaiting implementation');
}
