# How to run Zakura on Akash Network

Step-by-step path for a **Zakura** Zcash full node on [Akash Console](https://console.akash.network), using the [awesome-akash zcash-zakura](https://github.com/akash-network/awesome-akash/tree/master/zcash-zakura) template.

Zakura is a consensus-compatible Zcash node (forked from Zebra) with faster sync, native pruning, and snapshot bootstrap. This template pins **`zakuracore/zakura:1.8.1`** (digest-pinned; do not use `:latest` or `1.1.1`).

### What you get

- Mainnet P2P on container port **8233** (Akash maps a public high port)
- Persistent pruned state (64 GiB default) with Valar snapshot bootstrap on first start
- Prometheus **9999** and health **8080** (internal)
- JSON-RPC **8232** internal for a colocated **lightwalletd** on gRPC **9067** (published globally)

Feature flags in the SDL (true/false): `ENABLE_METRICS`, `ENABLE_HEALTH`, `ENABLE_RPC`, `ENABLE_LIGHTWALLETD`. Cookie auth is off when lightwalletd is on, because lightwalletd cannot read cookie files.

### Deploy

[![Deploy on Akash](https://raw.githubusercontent.com/akash-network/console/refs/heads/main/apps/deploy-web/public/images/deploy-with-akash-btn.svg)](https://console.akash.network/new-deployment?step=edit-deployment&templateId=akash-network-awesome-akash-zcash-zakura)

1. Connect Keplr on [console.akash.network](https://console.akash.network).
2. Open the template (button above) or paste `zcash-zakura/deploy.yaml`.
3. Deposit, accept a bid, wait for the lease.
4. Logs should show snapshot download (first start) then `zakurad start`.
5. Lease URIs: P2P (`8233` mapping) and lightwalletd (`9067` mapping). Point compact wallets at the **9067** URI, TLS off unless you add your own terminator.

### Archive vs pruned

Default is **pruned** (~11 GiB snapshot, 64 GiB disk). For full history set `SNAPSHOT_KIND=archive`, raise disk to 350 GiB+, and set `ZAKURA_STATE__STORAGE_MODE=archive`.

### Related

- [Zebra on Akash](/guides/akash-network-zebra) — Zcash Foundation `zebrad` (full history, no snapshot)
- [Thus Spoke Zakura on Akash](/guides/thus-spoke-zakura-akash) — Regtest dashboard + app (v0.4.1)
- Zakura source: <https://github.com/zakura-core/zakura>
- Snapshots: <https://zakura.com/snapshots/>
