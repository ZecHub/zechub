# How to run Zakura on Akash Network

Step-by-step path for a **Zakura** Zcash full node using the [awesome-akash zcash-zakura](https://github.com/akash-network/awesome-akash/tree/master/zcash-zakura) template.

Zakura is a consensus-compatible Zcash node (forked from Zebra) with faster sync, native pruning, and snapshot bootstrap. This template pins **`zakuracore/zakura:1.8.1`** (digest-pinned; do not use `:latest` or `1.1.1`).

### What you get

- Mainnet P2P: container **8233**, published globally (see port mapping below)
- Persistent pruned state (64 GiB default) with Valar snapshot bootstrap on first start
- Prometheus **9999** and health **8080** (internal, no public URI)
- JSON-RPC **8232** internal for colocated **lightwalletd**; LWD listens on container **9067** and is published globally

Feature flags in the SDL (true/false): `ENABLE_METRICS`, `ENABLE_HEALTH`, `ENABLE_RPC`, `ENABLE_LIGHTWALLETD`. Cookie auth is off when lightwalletd is on, because lightwalletd cannot read cookie files.

### Which site to use (payments)

The SDL is the same. The two Akash web UIs differ in **how you pay**.

| Site | Payments | Wallet |
| --- | --- | --- |
| [console.akash.network](https://console.akash.network) | Traditional web checkout (card / fiat rails Console offers) | Console account |
| [air.akash.network](https://air.akash.network) | Native Akash chain payments (AKT / ACT) | **Keplr** |

Use **Air** when you want to pay with Keplr on-chain. Use **Console** when you want a conventional web payment flow. Do not expect Keplr native settlement on Console.

### Deploy

**Web payments (Console)**

[![Deploy on Akash Console](https://raw.githubusercontent.com/akash-network/console/refs/heads/main/apps/deploy-web/public/images/deploy-with-akash-btn.svg)](https://console.akash.network/new-deployment?step=edit-deployment&templateId=akash-network-awesome-akash-zcash-zakura)

**Native Akash payments with Keplr (Air)**

[Open this template on Air](https://air.akash.network/new-deployment?step=edit-deployment&templateId=akash-network-awesome-akash-zcash-zakura)

1. Open the matching link above (Console or Air).
2. On Air, connect **Keplr** and confirm you have AKT/ACT for deposit and lease. On Console, complete the web checkout the UI presents.
3. Load `zcash-zakura/deploy.yaml` if it is not already filled in.
4. Deposit, accept a bid, wait for the lease.
5. Logs should show snapshot download (first start) then `zakurad start`.
6. Open **Leases → URIs**. Use the host:port the provider assigned, not 8233 or 9067 on the public IP.

### How Akash publishes ports

SDL `port` / `as` (8233, 9067, 8232) are **container** ports. Zakura still listens on 8233; lightwalletd on 9067; RPC on 8232 for the LWD sidecar (`zakura:8232`).

They are **not** the ports on the provider's public IP.

**Default (this template):** no dedicated IP. Each `global: true` TCP expose is mapped to a **random high port** on a shared provider host. Console/Air list them as lease URIs, for example:

```
zakura-8233: provider.example:31482
lightwalletd-9067: provider.example:32011
```

Peers dial the **8233** URI (`provider.example:31482`). Compact wallets use the **9067** URI (TLS off unless you terminate TLS yourself). Set `ZAKURA_NETWORK__EXTERNAL_ADDR` to the mapped P2P URI, not `:8233`.

**Internal** exposes (`8232` RPC, `9999` metrics, `8080` health) stay on the deployment network. No public URI.

**Dedicated IPs** (`endpoints` / `kind: ip`) are a paid extra and are **not** in this template. They can pin a public IP and sometimes the `as` port. Add that only if you need a stable `host:8233`.

### Archive vs pruned

Default is **pruned** (~11 GiB snapshot, 64 GiB disk). For full history set `SNAPSHOT_KIND=archive`, raise disk to 350 GiB+, and set `ZAKURA_STATE__STORAGE_MODE=archive`.

### Related

- [Zebra on Akash](/guides/akash-network-zebra) — Zcash Foundation `zebrad` (full history, no snapshot)
- [Thus Spoke Zakura on Akash](/guides/thus-spoke-zakura-akash) — Regtest dashboard + app (v0.4.1)
- Zakura source: <https://github.com/zakura-core/zakura>
- Snapshots: <https://zakura.com/snapshots/>
