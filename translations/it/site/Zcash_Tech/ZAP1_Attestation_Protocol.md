# Protocollo di attestazione ZAP1

ZAP1 è un protocollo di attestazione open-source per Zcash. Scrive eventi strutturati del ciclo di vita in un albero di Merkle BLAKE2b e ancora la radice dell'albero on-chain tramite memo schermati Orchard. Le prove sono pubblicamente verificabili. I dati degli eventi restano privati.

## Come funziona

Gli operatori registrano i tipi di evento (deployment, pagamenti, trasferimenti, ecc.) e li inviano a un'istanza ZAP1. Ogni evento produce un hash di foglia usando BLAKE2b-256 con separazione di dominio. Le foglie si accumulano in un albero di Merkle. Quando viene raggiunta una soglia, la radice dell'albero viene codificata come memo ZAP1:09 e ancorata a Zcash in una transazione schermata.

Chiunque disponga di un hash di foglia può verificare l'intero percorso dalla foglia alla radice fino all'ancora on-chain, senza fidarsi dell'operatore.

## Proprietà chiave

- **Agnostico rispetto all'applicazione**: qualsiasi operatore Zcash può definire i propri tipi di evento e le proprie stringhe di personalizzazione
- **Preserva la privacy**: i payload degli eventi vengono sottoposti ad hash prima dell'ancoraggio. Solo gli hash finiscono on-chain.
- **Verificabile in modo indipendente**: la verifica necessita solo del pacchetto di prova e dell'accesso alla catena. Nessuna fiducia nell'operatore richiesta.
- **Compatibile con ZIP 302**: ZAP1 sta convergendo verso un partType di ZIP 302 per il payload di attestazione

## Cosa esiste

- Implementazione di riferimento (Rust, licenza MIT)
- SDK di verifica su crates.io (Rust + WASM da 83KB)
- SDK JavaScript su npm
- Decodificatore universale di memo (identifica memo ZAP1, ZIP 302 TVLV, di testo, binari e vuoti)
- Kit di conformità con 29 controlli API e 14 controlli di protocollo
- Design di firma a soglia FROST 2-di-3 per la trasmissione di ancore multi-parte
- Bozza di ZIP, PR #1243, in fase di revisione
- 4 ancore su mainnet con 14 foglie a marzo 2026

## Architettura

```
Your app  -->  ZAP1 API  -->  Merkle tree  -->  Zcash anchor
                  |                                    |
             event types                         shielded memo
          (DEPLOYMENT, etc)                    (ZAP1:09:{root})
```

Ogni operatore esegue la propria istanza ZAP1 con le proprie chiavi, il proprio albero di Merkle e le proprie ancore. Nessuno stato condiviso tra gli operatori.

## Dove saperne di più

- Sorgente: [github.com/Frontier-Compute/zap1](https://github.com/Frontier-Compute/zap1)
- SDK di verifica: [crates.io/crates/zap1-verify](https://crates.io/crates/zap1-verify)
- Decodificatore di memo: [crates.io/crates/zcash-memo-decode](https://crates.io/crates/zcash-memo-decode)
- Specifica del protocollo: [ONCHAIN_PROTOCOL.md](https://github.com/Frontier-Compute/zap1/blob/main/ONCHAIN_PROTOCOL.md)
- Bozza di ZIP: [PR #1243](https://github.com/zcash/zips/pull/1243)
- API live: [pay.frontiercompute.io/protocol/info](https://pay.frontiercompute.io/protocol/info)
- Guida per gli operatori: [frontiercompute.io/operators.html](https://frontiercompute.io/operators.html)
