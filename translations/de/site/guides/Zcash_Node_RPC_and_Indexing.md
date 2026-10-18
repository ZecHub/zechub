<a href="https://github.com/zechub/zechub/edit/main/site/guides/Zcash_Node_RPC_and_Indexing.md" target="_blank">
  <img src="https://img.shields.io/badge/Edit-blue" alt="Seite bearbeiten"/>
</a>

# Praxisleitfaden: Zcash Knoten-RPC und Blockchain-Indexierung

Diese Seite ist ein Kochbuch für die Kommunikation mit einem laufenden Zcash Full Node über JSON-RPC und für das Anschließen eines Indexers, den Light Wallets und Explorer abfragen können. Sie ist **keine** zweite Installationsanleitung.

Wie du den Stack nach `zcashd` (Zebra + Zallet, optional Zaino, Ports, Volumes, zweiphasiger Start) in Betrieb nimmst, erfährst du auf der Seite [Z3 Stack](/zcash-tech/z3-stack) und im [Z3-Repository](https://github.com/ZcashFoundation/z3). Hintergrund zu Konsens-Knoten findest du unter [Full Nodes](/zcash-tech/full-nodes) und [Zebra Full Node](/zcash-tech/zebra-full-node).

`zcashd` erreichte am 18. Juli 2026 das Ende seines Lebenszyklus. Neue Arbeiten von Betreibern sollten auf Zebra (oder [Zakura](/zcash-tech/zakura-node)) plus einer Wallet/einem Indexer ausgerichtet sein, nicht auf `zcashd`.

---

## Kurzfassung

* **JSON-RPC** ist die Schnittstelle, über die Betreiber und Wallets einen Knoten nach Chain-Tip, Peers und (bei einem Wallet-Prozess) Guthaben fragen. Bei Z3 stellt Zebra Knoten-RPC bereit; Zallet stellt Wallet-RPC bereit.
* **Regtest** ist der richtige Ort, um die Aufrufe kennenzulernen. Der rpc-router von Z3 auf `http://127.0.0.1:8181` akzeptiert `zebra` / `zebra` und leitet Knoten-Methoden an Zebra sowie Wallet-Methoden an Zallet weiter.
* **Mainnet und Testnet** verwenden Cookie-Authentifizierung auf Zebra. Übernimm den Regtest-Benutzernamen bzw. das Regtest-Passwort nicht auf einen öffentlichen Knoten.
* **Indexierung** ist eine von der Validierung getrennte Aufgabe. Zebra validiert. [Zaino](/zcash-tech/zaino) (Z3 `--profile indexer`) stellt lightwalletd-kompatibles gRPC bereit. [Ztreamer](https://github.com/distractedm1nd/ztreamer) ist ein von Zakura unterstützter Indexer; er gehört nicht zum Lieferumfang von Z3.
* Zaino JSON-RPC und das optionale Indexer-gRPC von Zebra sind für Loopback oder ein vertrauenswürdiges Netzwerk vorgesehen. Setze sie nicht unauthentifiziert im öffentlichen Internet aus.

---

## Welcher Prozess beantwortet welchen Aufruf?

| Du möchtest | Verbinde dich mit | Z3-Mainnet-Host-Port | Hinweise |
| --- | --- | --- | --- |
| Chain-Tip, Peers, `getblockchaininfo` | Zebra JSON-RPC | 8232 | Cookie-Authentifizierung |
| Wallet-Guthaben, Adressen, senden | Zallet RPC | 28232 | Separater Prozess; Beta-Software |
| Kompakte Blöcke für Light Wallets | Zaino gRPC | 8137 | Nur mit `--profile indexer`; Klartext-h2c |
| JSON-RPC-Proxy für Explorer / Faucet | Zaino JSON-RPC | 8237 | Nur vertrauenswürdiges Netzwerk |
| Alles oben Genannte ohne Synchronisierung üben | Z3-Regtest-rpc-router | 8181 | Benutzername `zebra` / Passwort `zebra` |

Port-Matrix und Compose-Projektnamen: [Z3 Stack](/zcash-tech/z3-stack) und [`z3-contract.yaml`](https://github.com/ZcashFoundation/z3/blob/main/z3-contract.yaml).

---

## Übe zuerst mit Regtest

Aus einem Z3-Checkout, nach `./scripts/regtest-init.sh` und `docker compose --env-file .env.regtest up -d`:

```bash
# Node method (Zebra)
curl -s -X POST -H "Content-Type: application/json" \
  -d '{"jsonrpc":"2.0","method":"getblockchaininfo","params":[],"id":1}' \
  http://127.0.0.1:8181

# Wallet method (Zallet)
curl -s -X POST -H "Content-Type: application/json" \
  -d '{"jsonrpc":"2.0","method":"getwalletinfo","params":[],"id":2}' \
  http://127.0.0.1:8181
```

Ein gesundes Ergebnis von `getblockchaininfo` enthält `"blocks"` und eine `"upgrades"`-Map. Wenn curl hängt, läuft der Router nicht; wenn du `401` erhältst, sprichst du Zebra direkt statt über den Router an (direktes Zebra bei Regtest ist `29232` und erwartet weiterhin die Router-Zugangsdaten, sofern du sie nicht geändert hast).

Vollständiger Regtest-Ablauf, einschließlich Mining der Aktivierungsblöcke: [Z3 `docs/regtest.md`](https://github.com/ZcashFoundation/z3/blob/main/docs/regtest.md).

---

## Mainnet- / Testnet-JSON-RPC (Cookie-Authentifizierung)

Im Mainnet und Testnet lesen Zallet und der optionale Dienst Zaino ein **gemeinsam genutztes Cookie-Volume**. Dieses Cookie wird beim Start neu erzeugt; es ist kein Sicherungsziel.

Veröffentliche Zebra JSON-RPC **nicht** im öffentlichen Internet. Rufe es aus dem Compose-Netzwerk (`zebra:8232`) auf oder nur vom Host aus, falls du es an Loopback gebunden hast.

Typische Prüfungen für Betreiber, nachdem Zebra den Status `/ready` hat:

```bash
# Wait until Zebra is synced (Z3 helper)
./scripts/check-zebra-readiness.sh

# Then start Zallet
docker compose --env-file .env.mainnet up -d
```

`getblocktemplate` / `getmininginfo` sind Mining-RPCs. Pools, die weiterhin einen einzelnen `zcashd`-Prozess erwarteten, benötigen Zebra (oder Zakura) für Templates sowie die Wallet, die sie für Coinbase verwenden. Siehe [Zcash Mining Pools](/using-zcash/zcash-mining-pools) und den [Migrationsleitfaden](/guides/migration-guide-zcashd-to-zebrad-zallet).

---

## Einen Indexer anschließen

Validierung und Indexierung sind unterschiedliche Aufgaben.

### Zaino (was Z3 bereitstellt)

Zaino liest Zebra und stellt eine lightwalletd-kompatible gRPC-API sowie einen JSON-RPC-Proxy bereit. Zallet benötigt **nicht** den eigenständigen Zaino-Container; es integriert Zaino-Bibliotheken und kommuniziert über JSON-RPC mit Zebra. Starte eigenständiges Zaino, wenn du externe Light Wallets, Explorer oder Faucets bereitstellen möchtest:

```bash
docker compose --env-file .env.mainnet --profile indexer up -d
```

Warte, bis Zebra synchronisiert ist, bevor du Clients auf Zaino richtest. Ein Massenindexer beim Aufholen mit hoher Abrufparallelität kann den Verifizierer von Zebra verlangsamen; halte `fetch_concurrency` im niedrigen einstelligen Bereich, bis der Indexer aufgeholt hat.

Regtest-gRPC (Klartext; Port `28137`):

```bash
# From the Z3 repo, after: scripts/vendor.sh zaino
# and: docker compose --env-file .env.regtest --profile indexer up -d zaino

grpcurl -plaintext \
  -import-path vendor/zaino/zaino-proto/proto \
  -proto service.proto \
  127.0.0.1:28137 \
  cash.z.wallet.sdk.rpc.CompactTxStreamer/GetLightdInfo

grpcurl -plaintext \
  -import-path vendor/zaino/zaino-proto/proto \
  -proto service.proto \
  -d '{}' \
  127.0.0.1:28137 \
  cash.z.wallet.sdk.rpc.CompactTxStreamer/GetLatestBlock
```

Zaino-gRPC verwendet in allen Netzwerken Klartext-h2c. Beende TLS an einem Reverse Proxy, wenn sich etwas außerhalb des Hosts verbinden wird. Details: [Zaino](/zcash-tech/zaino) und [Z3 `docs/regtest.md`](https://github.com/ZcashFoundation/z3/blob/main/docs/regtest.md).

### Andere Indexer (nicht Z3)

* **lightwalletd** — der ältere Server für kompakte Blöcke. Er ist weiterhin im Einsatz; Zaino ist der Nachfolgepfad für diese Rolle.
* **Ztreamer** — ein von Zakura unterstützter Indexer und eine `CompactTxStreamer`-Implementierung. Er ist kein Z3-Dienst. Siehe das [Ztreamer-Repository](https://github.com/distractedm1nd/ztreamer).
* **Zebra `rpc.indexer_listen_addr`** — ein optionaler gRPC-Listener *innerhalb* von Zebra. Z3 benötigt ihn nicht und veröffentlicht ihn nicht auf dem Host.

---

## Häufige Fehler

**Wallet-Methoden auf Zebra aufrufen.** `getwalletinfo` und Sende-RPCs gehören zu Zallet (oder einer anderen Wallet), nicht zum Konsens-Knoten.

**Zallet starten, bevor Zebra den Status `/ready` hat.** Zallet wird in eine Neustartschleife geraten. Verwende `scripts/check-zebra-readiness.sh` im Mainnet/Testnet.

**Regtest-`zebra`/`zebra` ins Mainnet kopieren.** Cookie-Authentifizierung ist aus gutem Grund der Standard für Mainnet/Testnet.

**Zaino als Full Node behandeln.** Zebra (oder Zakura) validiert. Zaino indexiert.

**Zaino JSON-RPC oder Zebra Indexer-gRPC öffentlich bereitstellen.** Diese Endpunkte sind für Loopback oder ein vertrauenswürdiges privates Netzwerk bestimmt.

**Annehmen, dass jede Light Wallet bereits Zaino spricht.** Prüfe die aktuelle Veröffentlichung der Wallet anhand des Protokolls, das sie tatsächlich implementiert.

---

## Verwandte Seiten

* [Z3 Stack](/zcash-tech/z3-stack) — Installation, Ports, Volumes, zweiphasiger Start
* [Zaino](/zcash-tech/zaino) — Indexer-Rolle und Hinweise für Betreiber
* [Full Nodes](/zcash-tech/full-nodes)
* [Zebra Full Node](/zcash-tech/zebra-full-node)
* [Lightwallet Nodes](/zcash-tech/lightwallet-nodes)
* [Migrationsleitfaden: zcashd zu Zebrad/Zallet](/guides/migration-guide-zcashd-to-zebrad-zallet)
* [Zingolib und Zaino Tutorial](/guides/zingolib-and-zaino-tutorial)

## Ressourcen

* [Z3-Repository](https://github.com/ZcashFoundation/z3)
* [Z3-Regtest-Kochbuch (curl / grpcurl)](https://github.com/ZcashFoundation/z3/blob/main/docs/regtest.md)
* [Z3-FAQ](https://github.com/ZcashFoundation/z3/blob/main/docs/faq.md)
* [Zebra](https://zebra.zfnd.org/)
* [Zaino](https://github.com/zingolabs/zaino)
* [Zallet Book](https://zcash.github.io/zallet/)
* [Ztreamer](https://github.com/distractedm1nd/ztreamer)

**Zuletzt aktualisiert:** September 2026
