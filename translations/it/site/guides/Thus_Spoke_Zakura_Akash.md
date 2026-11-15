# Thus Spoke Zakura su Akash (Regtest)

Esegui lo stack **Thus Spoke Zakura v0.4.1** su Akash: Zakura Regtest, lightwalletd e la **dashboard / API HTTP** del portafoglio. Le monete di test non hanno valore. Non inviare qui ZEC della mainnet.

Template: [awesome-akash/thus-spoke-zakura](https://github.com/akash-network/awesome-akash/tree/master/thus-spoke-zakura)

Upstream: [zcashlabs/thus-spoke-zakura](https://github.com/zcashlabs/thus-spoke-zakura) tag **v0.4.1**

### Immagini

| Servizio | Immagine |
| --- | --- |
| Dashboard + API (`app`) | `ghcr.io/zcashlabs/thus-spoke-zakura-app:0.4.1` |
| lightwalletd | `ghcr.io/zcashlabs/thus-spoke-zakura-lightwalletd:0.4.1` |
| Zakura | `zakuracore/zakura:1.6.0` (pin compilato nel launcher 0.4.1) |

### Self-bootstrap

Al primo avvio il container `app` esegue `ths-server init` sul proprio volume persistente, poi `ths-server serve`. Serve riprova finché Zakura JSON-RPC e lightwalletd non sono attivi. Non esegui `ths` sul provider; l'SDL è il runtime.

### Come Akash pubblica le porte

`port` / `as` dell'SDL sono porte del **container**. L'app ascolta su **8080** (`THS_LISTEN`); lightwalletd su **9067**; RPC Zakura su **18232** e P2P su **18233**. All'interno del deployment, i servizi già usano quelle porte (`http://zakura:18232`, `http://lightwalletd:9067`).

**Non** sono le porte sull'IP pubblico del provider.

**Predefinito (questo template):** nessun IP dedicato.

| Servizio | Ascolto del container | SDL `as` | Come appare sul lease |
| --- | --- | --- | --- |
| `app` (dashboard + API HTTP) | 8080 | 80 (HTTP) | Nome host di ingress, spesso su 80/443 — **apri questo URI in un browser** |
| `lightwalletd` | 9067 | 9067 (TCP, globale) | `host:&lt;random-high-port&gt;` |
| RPC `zakura` | 18232 | 18232 (TCP, globale) | `host:&lt;random-high-port&gt;` |
| P2P `zakura` | 18233 | 18233 (TCP, globale) | `host:&lt;random-high-port&gt;` |

Quando il lease è pronto, **Leases → URIs** è la fonte autorevole. Apri l'URI **`app`** per la dashboard (la stessa UI che `ths` apre in locale). Punta i client compatti all'URI **lightwalletd** (`THS_LIGHTWALLETD_TLS=false`). Non digitare `:8080`, `:80` o `:9067` sull'IP del provider a meno che un lease con IP dedicato non abbia reso pubbliche quelle porte.

**IP dedicati** (`endpoints` / `kind: ip`) sono un extra a pagamento e **non** sono in questo template. Possono fissare un IP pubblico e a volte la porta `as`. Lasciali disattivati a meno che tu non ne abbia bisogno.

### Quale sito usare (pagamenti)

L'SDL è lo stesso. Le due web UI di Akash differiscono in **come paghi**.

| Sito | Pagamenti | Portafoglio |
| --- | --- | --- |
| [console.akash.network](https://console.akash.network) | Checkout web tradizionale (carta / canali fiat che Console offre) | Account Console |
| [air.akash.network](https://air.akash.network) | Pagamenti nativi sulla chain di Akash (AKT / ACT) | **Keplr** |

Usa **Air** quando vuoi pagare con Keplr on-chain. Usa **Console** quando vuoi un flusso di pagamento web convenzionale.

### Deploy

**Pagamenti web (Console)**

[![Distribuisci su Akash Console](https://raw.githubusercontent.com/akash-network/console/refs/heads/main/apps/deploy-web/public/images/deploy-with-akash-btn.svg)](https://console.akash.network/new-deployment?step=edit-deployment&templateId=akash-network-awesome-akash-thus-spoke-zakura)

**Pagamenti nativi su Akash con Keplr (Air)**

[Apri questo template su Air](https://air.akash.network/new-deployment?step=edit-deployment&templateId=akash-network-awesome-akash-thus-spoke-zakura)

Crea il deployment dal template, accetta un'offerta, attendi finché i log di `app` non mostrano che `ths-server serve` resta attivo, poi apri l'**URI `app`** per la dashboard.

### Correlati

- [Zakura su Akash](/guides/akash-network-zakura) — Nodo di validazione Mainnet/Testnet
- [Zebra su Akash](/guides/akash-network-zebra)
- Libro: [github.com/zcashlabs/thus-spoke-zakura/tree/main/book](https://github.com/zcashlabs/thus-spoke-zakura/tree/main/book)
