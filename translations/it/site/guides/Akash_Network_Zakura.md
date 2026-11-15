# Come eseguire Zakura su Akash Network

Percorso passo per passo per un **Zakura** Zcash full node (nodo completo) usando il template [awesome-akash zcash-zakura](https://github.com/akash-network/awesome-akash/tree/master/zcash-zakura).

Zakura è un nodo Zcash compatibile col consenso (un fork di Zebra) con sincronizzazione più rapida, pruning nativo e bootstrap da snapshot. Questo template blocca **`zakuracore/zakura:1.8.1`** (fissato tramite digest; non usare `:latest` o `1.1.1`).

### Cosa ottieni

- P2P mainnet: porta container **8233**, pubblicata globalmente (vedi la mappatura delle porte sotto)
- Stato pruned persistente (64 GiB predefiniti) con bootstrap da snapshot Valar al primo avvio
- Prometheus **9999** e health **8080** (interni, nessun URI pubblico)
- JSON-RPC **8232** interno per un **lightwalletd** in co-locazione; LWD ascolta sulla porta container **9067** ed è pubblicato globalmente

Feature flag nell'SDL (true/false): `ENABLE_METRICS`, `ENABLE_HEALTH`, `ENABLE_RPC`, `ENABLE_LIGHTWALLETD`. L'autenticazione via cookie è disattivata quando lightwalletd è attivo, perché lightwalletd non riesce a leggere i file cookie.

### Quale sito usare (pagamenti)

L'SDL è lo stesso. Le due UI web di Akash differiscono nel **modo in cui paghi**.

| Sito | Pagamenti | Portafoglio |
| --- | --- | --- |
| [console.akash.network](https://console.akash.network) | Checkout web tradizionale (carta / circuiti fiat che Console offre) | Account Console |
| [air.akash.network](https://air.akash.network) | Pagamenti nativi sulla chain di Akash (AKT / ACT) | **Keplr** |

Usa **Air** quando vuoi pagare con Keplr on-chain. Usa **Console** quando vuoi un flusso di pagamento web convenzionale. Non aspettarti il settlement nativo di Keplr su Console.

### Deploy

**Pagamenti web (Console)**

[![Distribuisci su Akash Console](https://raw.githubusercontent.com/akash-network/console/refs/heads/main/apps/deploy-web/public/images/deploy-with-akash-btn.svg)](https://console.akash.network/new-deployment?step=edit-deployment&templateId=akash-network-awesome-akash-zcash-zakura)

**Pagamenti nativi di Akash con Keplr (Air)**

[Apri questo template su Air](https://air.akash.network/new-deployment?step=edit-deployment&templateId=akash-network-awesome-akash-zcash-zakura)

1. Apri il link corrispondente sopra (Console o Air).
2. Su Air, connetti **Keplr** e verifica di avere AKT/ACT per deposito e lease. Su Console, completa il checkout web che l'interfaccia ti presenta.
3. Carica `zcash-zakura/deploy.yaml` se non è già compilato.
4. Deposita, accetta una bid e attendi il lease.
5. I log dovrebbero mostrare il download dello snapshot (al primo avvio) e poi `zakurad start`.
6. Apri **Leases → URIs**. Usa l'host:port assegnato dal provider, non 8233 o 9067 sull'IP pubblico.

### Come Akash pubblica le porte

Le porte `port` / `as` nell'SDL (8233, 9067, 8232) sono porte **container**. Zakura continua ad ascoltare sulla porta 8233; lightwalletd sulla 9067; RPC sulla 8232 per il sidecar LWD (`zakura:8232`).

Non sono **le** porte sull'IP pubblico del provider.

**Predefinito (questo template):** nessun IP dedicato. Ogni expose TCP `global: true` viene mappato su una **porta alta casuale** di un host condiviso del provider. Console/Air li elencano come lease URI, ad esempio:

```
zakura-8233: provider.example:31482
lightwalletd-9067: provider.example:32011
```

I peer si collegano all'URI **8233** (`provider.example:31482`). I portafogli leggeri usano l'URI **9067** (TLS disattivato, a meno che tu non termini tu stesso il TLS). Imposta `ZAKURA_NETWORK__EXTERNAL_ADDR` all'URI P2P mappato, non a `:8233`.

Gli expose **interni** (RPC `8232`, metriche `9999`, health `8080`) restano sulla rete del deployment. Nessun URI pubblico.

Gli **IP dedicati** (`endpoints` / `kind: ip`) sono un extra a pagamento e **non** sono presenti in questo template. Possono fissare un IP pubblico e, a volte, la porta `as`. Aggiungili solo se ti serve un `host:8233` stabile.

### Archive o pruned

Il valore predefinito è **pruned** (~11 GiB di snapshot, 64 GiB di disco). Per la cronologia completa imposta `SNAPSHOT_KIND=archive`, porta il disco a 350 GiB o più e imposta `ZAKURA_STATE__STORAGE_MODE=archive`.

### Correlati

- [Zebra su Akash](/guides/akash-network-zebra) — Zcash Foundation `zebrad` (cronologia completa, nessuno snapshot)
- [Thus Spoke Zakura su Akash](/guides/thus-spoke-zakura-akash) — dashboard Regtest + app (v0.4.1)
- Zakura sorgente: [github.com/zakura-core/zakura](https://github.com/zakura-core/zakura)
- Snapshot: [zakura.com/snapshots/](https://zakura.com/snapshots/)
