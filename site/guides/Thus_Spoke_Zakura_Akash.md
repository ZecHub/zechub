# Thus Spoke Zakura on Akash (Regtest)

Run the **Thus Spoke Zakura v0.4.1** stack on Akash: Zakura Regtest, lightwalletd, and the wallet **dashboard / HTTP API**. Test coins have no value. Do not send mainnet ZEC here.

Template: [awesome-akash/thus-spoke-zakura](https://github.com/akash-network/awesome-akash/tree/master/thus-spoke-zakura)

Upstream: [zcashlabs/thus-spoke-zakura](https://github.com/zcashlabs/thus-spoke-zakura) tag **v0.4.1**

### Images

| Service | Image |
| --- | --- |
| Dashboard + API (`app`) | `ghcr.io/zcashlabs/thus-spoke-zakura-app:0.4.1` |
| lightwalletd | `ghcr.io/zcashlabs/thus-spoke-zakura-lightwalletd:0.4.1` |
| Zakura | `zakuracore/zakura:1.6.0` (pin compiled into the 0.4.1 launcher) |

### Self-bootstrap

On first start the `app` container runs `ths-server init` on its persistent volume, then `ths-server serve`. Serve retries until Zakura JSON-RPC and lightwalletd are up. You do not run `ths` on the provider; the SDL is the runtime.

### Ports (what to open)

Akash maps each container port to a random public port. Use the **lease URIs**.

| Service | Container port | Published as | Use |
| --- | --- | --- | --- |
| `app` | 8080 | **80** (global, HTTP) | **Dashboard and HTTP API** — open this URI in a browser |
| `lightwalletd` | 9067 | 9067 (global) | CompactTxStreamer for wallets (`THS_LIGHTWALLETD_TLS=false`) |
| `zakura` | 18232 | 18232 (global) | JSON-RPC |
| `zakura` | 18233 | 18233 (global) | Regtest P2P |

The dashboard listens on `0.0.0.0:8080` (`THS_LISTEN`). After the lease is ready, click the **`app` URI**. That is the same UI `ths` opens locally.

### Which site to use (payments)

The SDL is the same. The two Akash web UIs differ in **how you pay**.

| Site | Payments | Wallet |
| --- | --- | --- |
| [console.akash.network](https://console.akash.network) | Traditional web checkout (card / fiat rails Console offers) | Console account |
| [air.akash.network](https://air.akash.network) | Native Akash chain payments (AKT / ACT) | **Keplr** |

Use **Air** when you want to pay with Keplr on-chain. Use **Console** when you want a conventional web payment flow.

### Deploy

**Web payments (Console)**

[![Deploy on Akash Console](https://raw.githubusercontent.com/akash-network/console/refs/heads/main/apps/deploy-web/public/images/deploy-with-akash-btn.svg)](https://console.akash.network/new-deployment?step=edit-deployment&templateId=akash-network-awesome-akash-thus-spoke-zakura)

**Native Akash payments with Keplr (Air)**

[Open this template on Air](https://air.akash.network/new-deployment?step=edit-deployment&templateId=akash-network-awesome-akash-thus-spoke-zakura)

Create the deployment from the template, accept a bid, wait until `app` logs show `ths-server serve` staying up, then open the **`app` URI** for the dashboard.

### Related

- [Zakura on Akash](/guides/akash-network-zakura) — Mainnet/Testnet validating node
- [Zebra on Akash](/guides/akash-network-zebra)
- Book: <https://github.com/zcashlabs/thus-spoke-zakura/tree/main/book>
