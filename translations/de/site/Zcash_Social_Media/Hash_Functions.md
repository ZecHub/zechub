# Zero to Zero Knowledge: Hashfunktionen

**Einführung in die Serie**  
Willkommen zu einer neuen Serie: **Zero to Zero Knowledge**!  

In dieser Serie werden wir die Grundlagen einer Vielzahl von Technologien kennenlernen, die in unsere datenschutzwahrenden Protokolle einfließen.

---

## Teil 1: Hashfunktionen

Heute beginnen wir mit **Hashfunktionen** – einem zentralen Bestandteil der Kryptografie, der in Blockchains verwendet wird. Später in dieser Serie werden wir einige Themen behandeln, die auf ihren Eigenschaften beruhen.

### Was ist eine Hashfunktion?

Hashfunktionen nehmen eine Eingabe beliebiger Länge und erzeugen eine Ausgabe mit fester Länge.

- **Zu hashende Nachricht** = Eingabe  
- **Der verwendete Algorithmus** = Hashfunktion  
- **Erzeugte Ausgabe** = Hashwert  


![Hashfunktionsdiagramm](https://pbs.twimg.com/media/Fn_NkFHXgAEtgse.png)

### Probiere es selbst aus!

Lass uns mit diesem Tool ein praktisches Verständnis gewinnen!  
Gib einen beliebigen Text ein, um eine Ausgabe fester Länge zu erzeugen. Beobachte, wie sich die Ausgabe je nach verwendetem Hashing-Algorithmus verändert.

**Hier ausprobieren:** https://cryptii.com/pipes/hash-function

---

### Eigenschaften kryptografischer Hashfunktionen

Kryptografische Hashfunktionen müssen diese **3 Eigenschaften** haben:

1. **Einwegfunktion** - Es sollte praktisch unmöglich sein, eine Hashfunktion umzukehren  
2. **Kollisionsresistenz** - Zwei unterschiedliche Eingaben dürfen nicht auf dieselbe Ausgabe gehasht werden  
3. **Deterministisch** - Für jede Eingabe muss eine Hashfunktion immer dasselbe Ergebnis liefern

---

### Gängige Hashfunktionen

Es gibt mehrere Klassen von Hashfunktionen. Einige Beispiele:

- Secure Hashing Algorithm (**SHA-3**)  
- Message Digest Algorithm 5 (**MD5**)  
- **BLAKE2b** - Wird in Zcash bei der Schlüsselableitung verwendet

**Eine Einführung in BLAKE2 von Zooko**: https://www.zfnd.org/blog/blake2/

---

### Praxisnahe Anwendungsfälle von Hashfunktionen

#### 1. Integritäts-Hashing (Prüfungen der Datenintegrität)
Prüfungen der Datenintegrität sind ein Beispiel für „Integritäts-Hashing“. Sie werden verwendet, um Prüfsummen für Datendateien zu erzeugen und den Nutzern die Korrektheit der Daten zu bestätigen.

![Beispiel für Integritäts-Hashing](https://pbs.twimg.com/media/Fn_Or0MWIAI6sgx.png)

#### 2. Merkle-Bäume (Hash-Bäume)
Ein **Hash-Baum** oder **Merkle-Baum** besteht aus Zweigen und Blattknoten, die mit dem kryptografischen Hash eines Datenblocks beschriftet sind.

![Merkle-Baum-Diagramm](https://pbs.twimg.com/media/Fn_O7ndWIAY5PA-.jpg)

Merkle-Bäume sind ein Beispiel für ein **kryptografisches Commitment-Schema**. Die Wurzel des Baums wird als Commitment betrachtet, und es kann bewiesen werden, dass Blattknoten Teil des ursprünglichen Commitments sind.

Sie verifizieren Daten, die in P2P-Netzwerken gespeichert oder übertragen werden, und stellen sicher, dass von Peers empfangene Daten unverändert sind.

#### 3. Note Commitment Tree in Zcash
In den abgeschirmten Pools **Sapling** und **Orchard** von Zcash wird der **Note Commitment Tree** verwendet, um zu verifizieren, dass Transaktionen im Einklang mit dem Konsens gültig sind, während Sender, Empfänger und verbrauchte Beträge vollständig verborgen bleiben.

#### 4. Signatur-Hash (Blöcke im Bitcoin-Stil)
**SHA256** ist ein Beispiel für einen „Signatur-Hash“, der verwendet wird, um die Unveränderlichkeit jedes Blocks in der Bitcoin-Chain durchzusetzen. Miner verwenden den Hash des vorherigen Blocks + einen Hash aller Transaktionen im aktuellen Block (`hashMerkleRoot`) + Zeitstempel + Zufallswert / Netzwerkschwierigkeit für neue Blöcke.

![SHA256-Blockdiagramm](https://pbs.twimg.com/media/Fn_PaVZXoAApHPf.jpg)

#### 5. Equihash (Zcash-Mining)
**Equihash** ist der Hashing-Algorithmus, der beim Mining von Zcash verwendet wird. Er wird auch von Netzwerken wie Komodo und Horizen verwendet.

**Originaler Zcash-Blog zu Equihash**: https://electriccoin.co/blog/equihash/

---

### Weiterführende Lektüre

Um ein tieferes Verständnis der verschiedenen Arten von Hashfunktionen und ihrer jeweiligen Anwendungsfälle aufzubauen, ist dies eine ausgezeichnete Ressource:  
https://en.wikipedia.org/wiki/Hash_function

---

**Thread von ZecHub (@ZecHub)**  
Originaler X-Thread: https://x.com/ZecHub/status/1621240109663227906  

---

*Diese Seite wurde aus dem ursprünglichen Zero to Zero Knowledge-Thread für das ZecHub-Wiki zusammengestellt.*
