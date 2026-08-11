---
<a href="https://github.com/zechub/zechub/edit/main/site/Zcash_Tech/FROST_Threshold_Custody.md" target="_blank">
  <img src="https://img.shields.io/badge/Edit-blue" alt="Seite bearbeiten"/>
</a>

# FROST & Threshold Custody für Shielded ZEC

> Für die vollständigen kryptografischen Details des FROST-Protokolls siehe die [technische FROST-Seite](FROST.md).

FROST-Threshold-Custody taucht in Zcash-Gesprächen immer wieder auf — es war der wichtigste Track beim ZecHub Hackathon 2026 — aber das Konzept wird nicht immer in einfacher Sprache erklärt. Diese Seite behandelt, was es bedeutet, wann man es tatsächlich braucht, die Abwägungen und welche Tools es heute unterstützen.

---

## Kurzfassung

- **FROST** ermöglicht es einer Gruppe von Schlüsselinhabern, gemeinsam eine shielded Zcash-Adresse zu kontrollieren, ohne dass eine einzelne Person den vollständigen privaten Schlüssel besitzt.
- Ein **t-of-n**-Schwellwert bedeutet: t Personen müssen gemeinsam signieren, um auszugeben; t-1 oder weniger können die Mittel nicht allein bewegen.
- Transaktionen sehen aus wie jede andere shielded Transaktion — es gibt keinen On-Chain-Fußabdruck, der offenlegt, dass Threshold-Signaturen verwendet wurden.
- Das unterscheidet sich grundlegend von transparentem Multisig (das öffentlich On-Chain sichtbar ist und von Zcash seit Langem unterstützt wird) — FROST funktioniert innerhalb des shielded Pools.
- Es ist nützlich für DAOs, Börsen, Verwahrungsdienste, gemeinsames Sparen und Team-Treasuries — überall dort, wo ein einzelner Ausfallpunkt beim Schlüssel inakzeptabel ist.

---

## Was ist FROST in einfacher Sprache?

Stell dir vor, drei Geschäftspartner halten jeweils einen Teil eines Schlüssels. Um aus ihrem gemeinsamen Wallet auszugeben, müssen zwei der drei zustimmen und gemeinsam signieren. Die resultierende Transaktion sieht identisch zu einer normalen individuellen Überweisung aus — kein Beobachter kann anhand der Blockchain erkennen, dass mehrere Personen beteiligt waren.

FROST (**Flexible Round-Optimized Schnorr Threshold Signatures**) ist das kryptografische Protokoll, das dies für shielded Zcash ermöglicht. Es wurde von Chelsea Komlo (University of Waterloo / Zcash Foundation) und Ian Goldberg entwickelt.

Die wichtigsten Eigenschaften:

- **Threshold**: Nur t-von-n-Unterzeichner müssen teilnehmen (z. B. 2-von-3, 3-von-5)
- **Shielded**: Funktioniert innerhalb des Orchard-Privacy-Pools — Beträge, Absender und Empfänger bleiben privat
- **Nicht unterscheidbar**: Die endgültige Signatur sieht aus wie bei jeder anderen shielded Zcash-Transaktion
- **Non-custodial**: Keine einzelne Partei besitzt jemals den vollständigen Schlüssel — nicht einmal der Koordinator

---

## Wann sollte man Threshold Custody verwenden?

Threshold Custody ist sinnvoll, wenn **der Verlust eines Schlüssels oder einer Person nicht den Verlust der Mittel bedeuten soll**.

| Situation | Warum Threshold Custody hilft |
|-----------|-------------------------------|
| **DAO- oder Team-Treasury** | Kein einzelner Admin kann Mittel einseitig abziehen; Konsens ist erforderlich |
| **Börse oder Verwahrer** | Verteilt das Schlüsselrisiko über Sicherheitszonen oder Mitarbeiter hinweg |
| **Persönliche Cold Storage (mit vertrauenswürdiger Familie)** | 2-von-3 zwischen dir + zwei Familienmitgliedern — stirbst du oder verlierst den Zugang, sind die Mittel nicht verloren |
| **Treuhand** | Käufer, Verkäufer und Schiedsrichter halten jeweils einen Anteil; Mittel werden freigegeben, wenn zwei zustimmen |
| **Auszahlung hochpreisiger Grants** | Im Stil von ZCG: erfordert mehrere unabhängige Unterzeichner vor der Auszahlung |
| **Verwaltung von Entwicklerschlüsseln** | Verhindert Insider-Bedrohungen — kein einzelner Ingenieur kann einen Protokollfonds abziehen |

Du brauchst Threshold Custody wahrscheinlich **nicht** für ein persönliches Wallet, das du allein kontrollierst, für kleine Beträge oder in Situationen, in denen der zusätzliche Koordinationsaufwand den geringeren Risikonutzen überwiegt.

---

## Wie unterscheidet es sich von transparentem Multisig?

Zcash unterstützt seit Langem transparentes Multisig — mehrere Schlüssel sind erforderlich, um von einer t-Adresse auszugeben. Doch transparentes Multisig hat erhebliche Datenschutzkosten: **die Multisig-Struktur, alle öffentlichen Schlüssel und alle Unterzeichner sind auf der Blockchain sichtbar**.

FROST löst dieses Problem, indem es innerhalb des shielded Pools arbeitet:

| | Transparentes Multisig | FROST Threshold (shielded) |
|--|------------------------|----------------------------|
| Pool | Transparent (öffentlich) | Orchard (shielded) |
| Unterzeichner On-Chain sichtbar | Ja — alle öffentlichen Schlüssel offengelegt | Nein — nicht unterscheidbar von einer Ausgabe mit einem einzelnen Unterzeichner |
| Beträge sichtbar | Ja | Nein |
| Erforderliche Koordination | On-Chain-Skript | Off-Chain-Kommunikationsrunde |
| Privatsphäre | Keine | Vollständige shielded Privatsphäre |

---

## Abwägungen und Einschränkungen

FROST ist leistungsfähig, bringt aber echte Abwägungen mit sich, die du vor der Nutzung verstehen solltest:

### Koordinationsaufwand
Unterzeichner müssen gleichzeitig (oder fast gleichzeitig) online sein, um eine Signaturrunde abzuschließen. Wenn deine t Unterzeichner über verschiedene Zeitzonen verteilt sind oder unzuverlässige Verbindungen haben, erfordert das Ausgeben eine Koordination, die ein Solo-Wallet nicht braucht.

### Keine Signatur, wenn das Quorum nicht verfügbar ist
Wenn nicht genug Schlüsselinhaber verfügbar sind (krank, auf Reisen, nicht erreichbar), sind die Mittel vorübergehend nicht ausgabefähig. Wähle deinen Threshold und die Anzahl der Anteile sorgfältig — 2-von-3 ist robuster als 2-von-2.

### Zeremonie zur Schlüsselerzeugung
Die Einrichtung von FROST erfordert eine verteilte Schlüsselerzeugungszeremonie (DKG), bei der alle n Teilnehmer gleichzeitig online sind. Das ist ein einmaliges Ereignis, muss aber sorgfältig durchgeführt werden — wenn Teilnehmer während der DKG kompromittiert werden, wird die Sicherheit untergraben.

### Tooling ist noch in der Reifephase
FROST für shielded Zcash ist relativ neu. Der IETF-Standard (draft-irtf-cfrg-frost) ist ausgereift, aber Wallet-Integrationen sind begrenzt. Im Vergleich zu einem Standard-Wallet mit einem einzelnen Schlüssel solltest du mit einigen Ecken und Kanten rechnen.

### Komplexität der Wiederherstellung
Der Verlust eines Shards ist nicht das Ende der Welt (genau das ist der Sinn des Thresholds), aber Wiederherstellungspläne müssen im Voraus dokumentiert werden. Wer hält Backups? Was passiert, wenn zwei Shards gleichzeitig verloren gehen?

---

## Wer entwickelt mit FROST auf Zcash?

### Zcash Foundation — frost.zfnd.org
Die Zcash Foundation hat eine funktionierende FROST-Implementierung und eine Demo-Seite veröffentlicht. Dies ist die Referenzimplementierung, die für Tests und Entwicklung verwendet wird.

### YWallet FROST Demo
YWallet (ein leistungsstarkes Zcash-Wallet) hat eine frühe FROST-Demo-Integration. Siehe die [Anleitung zur YWallet FROST Demo](/guides/Ywallet_FROST_Demo) für Schritt-für-Schritt-Anweisungen.

### ZecHub Hackathon 2026 — FROST-Track-Projekte

Der FROST-Track war der am stärksten umkämpfte beim ZecHub Hackathon 2026. Bemerkenswerte Projekte:

- **ZecVault** — 2-von-3-shielded-Treuhand auf dem Mainnet abgewickelt (FROST Threshold)
- **Steward** — Threshold Custody für shielded Zcash mit einer auf Wiederherstellung fokussierten UX

### Coinbase
Coinbase hat eine produktive FROST-Implementierung für seine Threshold-Signatursysteme (für Bitcoin) entwickelt, mit Änderungen, die die Vorverarbeitungsphase entfernen und die Aggregator-Rolle auf alle Teilnehmer verteilen. Ihre Erfahrung bestätigt das Sicherheitsmodell von FROST im Produktivmaßstab.

---

## Wie eine Signatursitzung funktioniert (vereinfacht)

1. **Einrichtung (einmalig):** Alle n Teilnehmer führen eine verteilte Schlüsselerzeugungszeremonie (DKG) durch. Jeder erhält einen privaten Shard; ein gemeinsamer öffentlicher Schlüssel wird abgeleitet. Keine Partei kennt den vollständigen privaten Schlüssel.

2. **Unterzeichner koordinieren:** Wenn eine Ausgabe erforderlich ist, sammelt ein Koordinator (der einer der Unterzeichner sein kann) Commitments von t Teilnehmern, die bereit sind zu signieren.

3. **Runde 1:** Jeder teilnehmende Unterzeichner erzeugt eine Nonce und sendet ein Commitment (öffentlich, nicht sensibel).

4. **Runde 2:** Jeder teilnehmende Unterzeichner berechnet mit seinem privaten Shard seine partielle Signatur und sendet sie.

5. **Aggregation:** Der Koordinator kombiniert die t partiellen Signaturen zu einer endgültigen Schnorr-Signatur — On-Chain nicht unterscheidbar von einer Signatur durch eine einzelne Partei.

6. **Broadcast:** Die Transaktion wird wie gewohnt an das Zcash-Netzwerk gesendet.

Wenn ein Unterzeichner eine fehlerhafte partielle Signatur sendet, identifiziert das Protokoll ihn und bricht ab (er wird von zukünftigen Sitzungen ausgeschlossen). Die Koordination erfolgt Off-Chain — die Blockchain sieht nur die endgültige Transaktion.

---

## Auswahl deiner Threshold-Parameter

| Setup | Resilienz | Risiko |
|-------|-----------|--------|
| 1-von-1 | Keine Resilienz — einzelner Ausfallpunkt | Schlüsselverlust = dauerhafter Verlust |
| 2-von-2 | Beide Unterzeichner müssen verfügbar sein — keine Fehlertoleranz | Einer nicht verfügbar = eingefrorene Mittel |
| 2-von-3 | Ein Shard kann verloren oder nicht verfügbar sein | Geringere Sicherheitsmarge als 3-von-5 |
| 3-von-5 | Zwei Shards können verloren gehen; starke Sicherheit | Mehr Koordinationsaufwand |
| 3-von-7 | Institutionelle Qualität; toleriert zwei Ausfälle | Hohe Koordinationskosten |

Ein praktischer Ausgangspunkt für die meisten Teams: **2-von-3** (robust, minimale Koordination) oder **3-von-5** (institutionell, höhere Sicherheit).

---

## Verwandte Seiten

- [FROST — Technischer Deep Dive](FROST.md) — kryptografische Details des Protokolls (DKG, Signaturrunden, Sicherheitsbeweise)
- [Anleitung zur YWallet FROST Demo](/guides/Ywallet_FROST_Demo) — praktische Schritt-für-Schritt-Demo
- [FROST Demo (frostdemo)](/guides/frostdemo) — Durchgang durch die Zcash Foundation-Demo
- [Viewing Keys](Viewing_Keys.md) — schreibgeschützter Zugriff auf shielded Adressen (ergänzend zu Threshold Custody)
- [Zcash Shielded Assets](Zcash_Shielded_Assets.md) — FROST ist auch eine wichtige Infrastruktur für die Ausgabe von ZSA

## Ressourcen

- [FROST-Forschungspapier (Komlo & Goldberg, 2020)](https://eprint.iacr.org/2020/852.pdf)
- [IETF-FROST-Standardentwurf (draft-irtf-cfrg-frost)](https://datatracker.ietf.org/doc/draft-irtf-cfrg-frost/)
- [FROST-Implementierung der Zcash Foundation](https://frost.zfnd.org)
- [Chelsea Komlo — Was sind Threshold Signatures? (Zcon3)](https://youtu.be/cAfTTfblzoU?t=110)
- [Coinbase — Threshold Digital Signatures](https://www.coinbase.com/blog/threshold-digital-signatures)
- [ROAST — Robuste asynchrone Schnorr-Threshold-Signaturen (Blockstream)](https://eprint.iacr.org/2022/550.pdf)
