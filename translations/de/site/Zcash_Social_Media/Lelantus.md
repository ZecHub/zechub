# Von Null zu Zero Knowledge: Lelantus-Protokoll

**Reihe:** Von Null zu Zero Knowledge

Heute werfen wir einen Blick auf **Lelantus**!

Dieses 2019 veröffentlichte Protokoll baut auf Zerocoin auf. Es wird in der Währung **Firo** (früher Zcoin) verwendet, um private On-Chain-Transaktionen zu ermöglichen. Es ähnelt Zcash in mancher Hinsicht, unterscheidet sich aber in den meisten Aspekten deutlich.

![Lelantus Einführung](/content-images/Fsk18DgXsAEc0Ob-a8cd9a85d1.webp)

---

## Zcash vs. Firo: Protokoll-Grundlagen

- **Zcash** - Baut auf dem **Zerocash**-Protokoll auf  
- **Firo (Zcoin)** - Baut auf dem **Zerocoin**-Protokoll auf

![Vergleich Zerocash vs. Zerocoin](/content-images/Fsk2Fk7WcAA81ty-92158edf6b.webp)

---

## Entwicklung der Datenschutzprotokolle von Firo

Ähnlich wie Zcash verwendet Firo abgeschirmte Adressen, um anonyme Zahlungen zu ermöglichen.

**Zeitachse:**
- **Zerocoin** - Korrektheit kompromittiert
- **Sigma** - System mit festen Stückelungen
- **Lelantus 1.0** - Fehlende korrekte Sicherheitsbeweise

![Protokollentwicklung](/content-images/Fsk2NdaWAAAKVgH-f84ae27c48.webp)

---

## Einschränkungen des Sigma-Protokolls

Das Σ-(Sigma)-Protokoll, das in früheren Versionen von Zcoin/Firo verwendet wurde, hatte eine wesentliche Einschränkung: Nutzer konnten nur feste Stückelungen prägen.

Dadurch entstanden kleinere Anonymitätsmengen und es wurde die Tür für Timing-Angriffe zwischen Mint- und Redeem-Operationen geöffnet (zusätzlich zum Problem des „verunreinigten Wechselgelds“).

![Sigma Stückelungen](/content-images/Fsk2fxfWcAMUBDo-333a8f9df3.webp)

---

## Wie Lelantus den Datenschutz verbessert

**Lelantus** löst das Problem fester Stückelungen, indem Mints aus einer einzigen größeren Menge erlaubt werden.

Wichtige Vorteile:
- Beseitigt Anonymitätsmengen mit festen Stückelungen
- Reduziert Timing-Angriffe zwischen Burn/Redeem
- Beseitigt das Problem des verunreinigten Wechselgelds

**Einschränkung**: Die Set-Größe ist derzeit auf **65,000 coins** begrenzt.

![Vorteile von Lelantus](/content-images/Fsk2wK3X0AA6MEe-06f29b3621.webp)

---

## Coin Commitments

Ein **Coin Commitment** ist ein doppelt verblindetes Commitment, das die Seriennummer der Coin und den Wert der Coin kodiert.

Diese funktionieren ähnlich wie **Notes** in Zcash.

Das Coin Commitment wird veröffentlicht und im Ledger gespeichert, wenn die Coin erstellt wird (über Mint- oder Spend-Transaktionen).

![Diagramm zum Coin Commitment](/content-images/Fsk3AWNX0AIHya8-0ed01a73c1.webp)

---

## Basecoin < - > Zerocoin-Modell

Lelantus verwendet das klassische **basecoin < - > zerocoin**-Modell.

**Wichtiges Merkmal**: Teilweise Einlösungen sind jetzt möglich, während der Restbetrag und die Beträge verborgen bleiben.

Wie bei Zcash müssen transparente Transaktionen vom Nutzer ausdrücklich ausgewählt werden.

![Lelantus Ablauf](/content-images/Fsk3HrjXgAMgqmX-4d727febf5.webp)

---

## One-of-Many Proofs

Lelantus verwendet **One-of-Many Proofs**, um Eingabewerte zu extrahieren, die zum Nachweis der Balance erforderlich sind, ohne die Herkunft der Eingaben offenzulegen – und ohne ein Trusted Setup zu benötigen.

Diese Proofs werden auch in **Triptych** verwendet (erwähnt in unserem CryptoNote-Thread).

![One-of-Many Proofs](/content-images/Fsk3Z0nWIAAPD4k-b76f087018.webp)

---

## Datenschutz auf der Netzwerkschicht: Dandelion++

Firo-Knoten verwenden dieselbe Network Magic wie Zcashs Magicbean.

Wie Monero hat Firo **Dandelion++** implementiert, um den Datenschutz zu erhöhen, indem die IP-Adresse des Transaktions-Broadcasters verschleiert wird.

**Dandelion++-Phasen:**
- **Stem-Phase** - Die Transaktion wird an einen einzigen zufälligen Knoten weitergeleitet statt an alle Peers
- **Fluff-Phase** - Wird zufällig eingeleitet und wechselt dann in den normalen Gossip-Modus

Dadurch wird es deutlich schwieriger, den Ursprung einer Transaktion durch Netzwerkanalyse zurückzuverfolgen.

![Erklärung von Dandelion++](/content-images/Fsk4A8VWcAU84MR-538b054cab.webp)

---

## Zukunft: Lelantus-Spark

**Lelantus-Spark** (geplant für später in 2023) führt zwei Stufen optionaler Sichtbarkeit ein, unter Verwendung von **ZIP-32 style derivation** und diversifizierten Adressen.

Es wird außerdem Unterstützung hinzufügen für:
- Multisig
- Benutzerdefinierte vertrauliche Assets

Diese Funktionen entsprechen den Shielded Assets von Zcash.

![Ankündigung von Lelantus-Spark](/content-images/Fsk4jXeXsAACQ3h-b53294b16e.webp)

---

**Original-Thread von ZecHub (@ZecHub)**  
https://x.com/ZecHub/status/1641902859800150017

---

*Diese Seite wurde aus dem ursprünglichen Thread „Zero to Zero Knowledge“ für das ZecHub-Wiki zusammengestellt.*
