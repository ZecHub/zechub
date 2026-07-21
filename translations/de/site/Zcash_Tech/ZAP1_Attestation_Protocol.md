# ZAP1 Attestierungsprotokoll

ZAP1 ist ein Open-Source-Attestierungsprotokoll für Zcash. Es schreibt strukturierte Lebenszyklusereignisse in einen BLAKE2b-Merkle-Baum und verankert die Baumwurzel on-chain über Orchard shielded memos. Beweise sind öffentlich verifizierbar. Ereignisdaten bleiben privat.

## Wie es funktioniert

Betreiber registrieren Ereignistypen (Deployments, Zahlungen, Transfers usw.) und übermitteln sie an eine ZAP1-Instanz. Jedes Ereignis erzeugt einen Leaf-Hash unter Verwendung von domain-separated BLAKE2b-256. Leaves sammeln sich in einem Merkle-Baum an. Wenn ein Schwellenwert erreicht ist, wird die Baumwurzel als `ZAP1:09`-Memo kodiert und in einer shielded transaction an Zcash verankert.

Jeder mit einem Leaf-Hash kann den vollständigen Pfad vom Leaf zur Wurzel bis zum On-Chain-Anchor verifizieren, ohne dem Betreiber vertrauen zu müssen.

## Zentrale Eigenschaften

- **Anwendungsagnostisch**: Jeder Zcash-Betreiber kann seine eigenen Ereignistypen und Personalization-Strings definieren
- **Datenschutzwahrend**: Ereignis-Payloads werden gehasht, bevor sie verankert werden. Nur Hashes gehen on-chain.
- **Unabhängig verifizierbar**: Für die Verifikation werden nur das Proof-Bundle und Zugriff auf die Chain benötigt. Kein Vertrauen in den Betreiber erforderlich.
- **ZIP 302-kompatibel**: ZAP1 entwickelt sich in Richtung eines ZIP 302 `partType` für die Attestierungs-Payload

## Was bereits existiert

- Referenzimplementierung (Rust, MIT-lizenziert)
- Verifikations-SDK auf crates.io (Rust + 83KB WASM)
- JavaScript-SDK auf npm
- Universeller Memo-Decoder (identifiziert ZAP1, ZIP 302 TVLV, Text-, Binär- und leere Memos)
- Konformitäts-Kit mit 29 API-Prüfungen und 14 Protokollprüfungen
- FROST-2-von-3-Threshold-Signing-Design für die Multi-Party-Übertragung von Anchors
- ZIP-Draft-PR #1243 in Prüfung
- 4 Mainnet-Anchors mit 14 Leaves mit Stand März 2026

## Architektur

```
Your app  -->  ZAP1 API  -->  Merkle tree  -->  Zcash anchor
                  |                                    |
             event types                         shielded memo
          (DEPLOYMENT, etc)                    (ZAP1:09:{root})
```

Jeder Betreiber betreibt seine eigene ZAP1-Instanz mit eigenen Schlüsseln, eigenem Merkle-Baum und eigenen Anchors. Kein gemeinsamer Zustand zwischen Betreibern.

## Wo du mehr erfahren kannst

- Quelle: [github.com/Frontier-Compute/zap1](https://github.com/Frontier-Compute/zap1)
- Verifikations-SDK: [crates.io/crates/zap1-verify](https://crates.io/crates/zap1-verify)
- Memo-Decoder: [crates.io/crates/zcash-memo-decode](https://crates.io/crates/zcash-memo-decode)
- Protokollspezifikation: [ONCHAIN_PROTOCOL.md](https://github.com/Frontier-Compute/zap1/blob/main/ONCHAIN_PROTOCOL.md)
- ZIP-Draft: [PR #1243](https://github.com/zcash/zips/pull/1243)
- Live-API: [pay.frontiercompute.io/protocol/info](https://pay.frontiercompute.io/protocol/info)
- Betreiberleitfaden: [frontiercompute.io/operators.html](https://frontiercompute.io/operators.html)
