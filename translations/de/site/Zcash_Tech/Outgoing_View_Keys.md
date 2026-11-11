<a href="https://github.com/zechub/zechub/edit/main/site/Zcash_Tech/Outgoing_Viewing_Keys.md" target="_blank">
  <img src="https://img.shields.io/badge/Edit-blue" alt="Edit Page"/>
</a>

# Outgoing Viewing Keys (OVKs)

Ein Outgoing Viewing Key (OVK) ist ein 32-Byte-Wert, der ausschließlich zur Verschlüsselung des *ausgehenden* Ciphertexts eines abgeschirmten Outputs verwendet wird. Er ermöglicht einer Partei, den gesendeten Klartext der Note (Empfängeradresse, Wert und Memo) wiederherzustellen, ohne Gelder ausgeben oder eingehende Notes sehen zu können.

Der Empfänger entschlüsselt die eingehende Note immer mit seinem eigenen Incoming Viewing Key. Die Wahl des OVK ändert nicht, was der Empfänger sieht. Für einen rohen OVK gibt es keine Standardkodierung; er besteht einfach aus 32 Byte.

## Kurzfassung

- Ein OVK bestimmt ausschließlich, wer den ausgehenden Klartext einer abgeschirmten Zahlung wiederherstellen kann.
- Wallets wählen zwischen drei Richtlinien: **Sender** (normale Wiederherstellung mit dem UFVK des Kontos), **Custom** (Wiederherstellung mit einem von dir bereitgestellten Schlüssel) oder **Discard** (niemand kann den ausgehenden Klartext aus der Chain wiederherstellen).
- Selbst mit Discard oder einem benutzerdefinierten OVK sieht ein UFVK-Inhaber weiterhin, welche Notes ausgegeben wurden, und kann den Nettobetrag berechnen, der das Konto verlassen hat.
- Die einzige zuverlässige Möglichkeit, einen Betrag für einen bestimmten UFVK unsichtbar zu halten, besteht darin sicherzustellen, dass die Notes nie zu diesem Konto gehörten (separates Konto oder separate Wallet).
- Die drei Richtlinien existieren bereits in `zcash_client_backend`; fast jede Wallet verwendet heute nur die Standardrichtlinie Sender.

---

## Die drei Richtlinien

Wallets, die auf `zcash_client_backend` basieren, wählen beim Erstellen einer Transaktion einen `OvkPolicy`:

| Richtlinie | Ausgehende Ciphertexts | Wer den ausgehenden Klartext später wiederherstellen kann |
|--------|----------------------|----------------------------------------------|
| **Sender** (Standard) | Mit dem normalen OVK des Kontos verschlüsselt | Der Unified Full Viewing Key des sendenden Kontos |
| **Custom** | Mit dem/den von dir bereitgestellten Schlüssel(n) verschlüsselt | Wer auch immer den/die bereitgestellten Schlüssel besitzt |
| **Discard** | Es wird kein OVK verwendet (`ovk = ⊥`) | Niemand (nicht einmal der Sender) |

Ein Komfort-Konstruktor erstellt eine `Custom`-Richtlinie aus einem einzelnen 32-Byte-Wert, sodass der externe und interne OVK derselbe Schlüssel sind.

![Outgoing Viewing Key policy comparison](/content-images/ovk-policies.webp)

Siehe die [OvkPolicy-Dokumentation](https://zcash.github.io/librustzcash/rustdoc/latest/zcash_client_backend/wallet/enum.OvkPolicy.html) und [ZIP 310](https://zips.z.cash/zip-0310).

## Wofür die einzelnen Richtlinien gedacht sind

**Sender** ist das gewöhnliche Verhalten einer Wallet. Nachdem die Transaktion gemint wurde, kann jeder, der den UFVK des Kontos besitzt, die ausgehenden Ciphertexts entschlüsseln und die Empfängeradressen, Beträge und Memos wiederherstellen.

**Custom** ermöglicht es dir, einem Dritten (Prüfer, Zahlungsabwickler, Belegsystem oder separatem Gerät) die Möglichkeit zu geben, bestimmte ausgehende Zahlungen zu entschlüsseln, ohne ihm den vollständigen Viewing Key zu geben. Du kannst auch einen ephemeren Schlüssel verwenden, den du nach der Transaktion verwirfst, oder unterschiedliche Schlüssel für verschiedene Gegenparteien einsetzen, sodass kein einzelner Schlüssel jede ausgehende Zahlung sehen kann.

**Discard** bedeutet, dass die sendende Wallet den ausgehenden Klartext nicht aus der Chain wiederherstellen kann. Dies ist nützlich, wenn du minimieren möchtest, was wiederherstellbar ist, falls der UFVK später kompromittiert wird, oder wenn du bewusst keinen On-Chain-Datensatz möchtest, den der OVK des Kontos öffnen kann.

## Was ein UFVK-Inhaber weiterhin sieht

Auch wenn Discard oder ein benutzerdefinierter OVK verwendet wird, kann ein Inhaber des UFVK des Kontos weiterhin:

- Erkennen, welche Notes des Kontos ausgegeben wurden (über Nullifier).
- Die Werte dieser Eingabe-Notes kennen.
- Jegliche Wechselgeld-Notes wiederherstellen (sie werden mit dem internen Incoming Viewing Key verschlüsselt, nicht mit einem OVK).
- Daher den Nettobetrag berechnen, der das Konto verlassen hat.

Nicht sichtbar sind die einzelnen Empfängeradressen, die Aufteilung des Betrags und die Memos. Die `WalletWrite`-Dokumentation warnt, dass Daten über Transaktionen, die unter Discard (oder einem zufälligen benutzerdefinierten OVK) erstellt wurden, nicht aus Chain-Daten wiederherstellbar sind, wenn der lokale Datensatz verloren geht.

## Beträge vor einem bestimmten UFVK verbergen

`OvkPolicy` kontrolliert nur die Wiederherstellung des ausgehenden Klartexts. Es verbirgt Ausgaben oder Nettobeträge nicht vor dem eigenen UFVK des Kontos.

Die einzige zuverlässige Möglichkeit, einen Betrag vor einem bestimmten UFVK zu verbergen, besteht darin sicherzustellen, dass die Notes, die diesen Betrag trugen, nie zu dem Konto gehörten, das dieser UFVK kontrolliert:

1. **Separate ZIP-32-Konten** (derselbe Seed) — Erstelle einen neuen Kontoindex, verschiebe Gelder dorthin und exportiere niemals den UFVK dieses Kontos. Der UFVK des ursprünglichen Kontos sieht nur die Übertragung auf das neue Konto.
2. **Vollständig separate Wallet** (anderer Seed) — Finanziere eine neue Wallet, gib von ihr aus und verwirf den Seed oder UFVK. Die ursprüngliche Wallet zeichnet nur die Finanzierungsübertragung auf.
3. **Ephemere Einmal-Wallets** — Wie oben, behandle die Wallet für die Ausgabe jedoch als Wegwerf-Wallet.

Ein UFVK gilt pro Konto. Notes, die nie in diesem Konto lagen, erscheinen weder in seinem Guthaben noch in seinen Ausfluss-Summen.

## Wie Wallets die Richtlinien heute verwenden

Fast jede Produktiv-Wallet verwendet nur die Standardrichtlinie **Sender**, sodass der vollständige ausgehende Verlauf über den UFVK wiederherstellbar ist. Die beiden anderen Richtlinien existieren in der Bibliothek, werden aber selten in Benutzeroberflächen angeboten.

Mögliche zukünftige Optionen umfassen:

- Eine Kennzeichnung pro Transaktion, mit der der Benutzer für eine einzelne Zahlung Custom oder Discard wählen kann.
- Einen dauerhaften Discard-Modus (eine Wiederherstellung aus dem Seed würde dann nur Nettoausflüsse anzeigen).
- Benutzerdefinierte OVKs zur selektiven Offenlegung einzelner Zahlungen (weniger aufwendig als eine vollständige [ZIP 311](https://zips.z.cash/zip-0311)-Zahlungsoffenlegung).
- Die weitere Verwendung von Konto- oder Wallet-Trennung für stärkere Isolation.

## Ressourcen

- [ZIP 310: Sicherheitseigenschaften von Sapling Viewing Keys](https://zips.z.cash/zip-0310)
- [ZIP 316: Unified Addresses und Unified Viewing Keys](https://zips.z.cash/zip-0316)
- [ZIP 315: Best Practices für Wallet-Implementierungen](https://zips.z.cash/zip-0315)
- [OvkPolicy in zcash_client_backend](https://zcash.github.io/librustzcash/rustdoc/latest/zcash_client_backend/wallet/enum.OvkPolicy.html)
- [librustzcash](https://github.com/zcash/librustzcash)
- [zingolib](https://github.com/zingolabs/zingolib)

## Verwandte Seiten

- [Viewing Keys](/zcash-tech/viewing-keys)
- [Zahlungsoffenlegungen](/zcash-tech/payment-disclosures)
- [Unified Addresses](/zcash-tech/unified-addresses)
- [Was ein Block Explorer sehen kann](/zcash-tech/what-a-block-explorer-can-see)
