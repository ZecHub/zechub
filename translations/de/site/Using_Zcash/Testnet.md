# Zcash Testnet

## Was ist das Zcash Testnet?

**Zcash Testnet** ist eine parallele Blockchain zum echten Zcash-Hauptnetzwerk (Mainnet), die das exakte Protokoll, die Regeln und die Transaktionslogik repliziert – aber mit zwei wesentlichen Unterschieden:

1. **Coins haben keinen echten monetären Wert** – sie heißen **TAZ**, nicht ZEC, und werden nur zum Testen verwendet.  
2. **Netzwerk-Upgrades, Tools und Software werden hier zuerst getestet**, bevor sie auf der echten Zcash-Blockchain bereitgestellt werden.  

Anders gesagt ist das Testnet wie eine **Sandbox oder experimentelle Umgebung**, in der Entwickler, Auditoren und Builder Ideen ausprobieren können, ohne echtes Geld zu riskieren.


## Warum existiert das Testnet?

Das Testnet ist für die Blockchain-Entwicklung entscheidend, weil **echte Blockchains wie Zcash unveränderlich sind** – sobald Transaktionen im Hauptnetzwerk bestätigt wurden, können sie nicht rückgängig gemacht werden. Das Testnet bietet eine **sichere Nachbildung**, um Funktionen zu erproben, zu testen und zu debuggen, bevor sie auf das Mainnet ausgerollt werden.

### Einsatzmöglichkeiten des Testnets

#### 1. Softwareentwicklung & Integration

Entwickler, die Wallets, Börsen, Mining-Software oder Privacy-Tools bauen, können diese sicher im Testnet testen. Zu den Möglichkeiten gehören:

- Transaktionen senden und empfangen  
- Neue Blöcke mit wertlosen TAZ-Coins minen  
- Benutzeroberflächen und APIs entwickeln  
- Datenschutzfunktionen von Transaktionen testen (transparent vs. shielded)  

**Beispiel:**  
Tools wie [`zcash_tx_tool`](https://github.com/QED-it/zcash_tx_tool) verwenden das Testnet, um Transaktionen zu erzeugen und Zcash-Funktionalitäten für shielded Assets zu testen.  

**Praxisbeispiel:**  
Ein Wallet-Entwickler kann Software mit einem Testnet-RPC-Endpunkt verbinden und den vollständigen Lebenszyklus simulieren – Adressen erstellen, shielded Transaktionen senden und Guthaben validieren – bevor die Software im Mainnet live geht.

#### 2. Testen von Netzwerk-Upgrades

Zcash aktualisiert sein Kernprotokoll regelmäßig (z. B. Nu5, Nu6). Im Testnet werden neue Upgrades **vor dem Mainnet** aktiviert, sodass Entwickler und die Community Fehler erkennen und beheben können.

**Beispiel:**  
Eine neue Konsensregel oder ein neuer Transaktionstyp wird zuerst ins Testnet eingespielt. Nach erfolgreichen Tests wird sie bzw. er im Mainnet auf einer vorab festgelegten Blockhöhe aktiviert.

#### 3. Testen von Node-Implementierungen

Zcash unterstützt mehrere Node-Software-Implementierungen – `zcashd` und **Zebra** (eine auf Rust basierende Node, die von der Zcash Foundation gepflegt wird). Das Testnet ermöglicht das Testen von Nodes unter realen Bedingungen ohne finanzielles Risiko.  

Node-Entwickler können:

- Blockweitergabe validieren  
- RPC-Schnittstellen testen  
- Das Verhalten von Nodes unter Last beobachten  
- Interaktionen mit Mining-Software testen  

#### 4. Lernen & Bildung

Einsteiger können Zcash-Funktionen wie Mining, das Erstellen shielded Transaktionen und die Nutzung von Unified Address kennenlernen.  
Tutorials und Dokumentation aus der Community bieten Zugang zu **Testnet-Faucets, Explorern und Anleitungen**.


## Reale Anwendungsfälle für das Testnet

### 1. Entwicklertests (Wallet / App)

- Mit dem Zcash Testnet verbinden  
- TAZ von einem Faucet anfordern  
- Shielded Transaktionen senden  
- Privatsphäre und Stabilität der Benutzeroberfläche überprüfen  

Es geht kein echtes ZEC verloren, selbst wenn Fehler passieren.

### 2. Integrationstests für Börsen

- Eine Testnet-Node betreiben  
- Zebrad-JSON-RPC-Endpunkte verwenden, um Transaktionen zu verarbeiten  
- Automatisierte Einzahlungs-/Auszahlungslogik testen  

Das sorgt für sicheren Produktionscode und verhindert finanzielle Verluste.

### 3. Tests von Mining-Setups

- Mining-Templates verwenden  
- Blockvalidierung testen  
- Mining-Belohnungen beobachten (nur TAZ)  
- Mining-Performance optimieren  

Das verhindert Ausfallzeiten oder entgangene Erträge beim Wechsel ins Mainnet.

### 4. Akademische / Protokoll-Forschung

Forscher können Innovationen wie **stateless verification**, **zero-knowledge proof optimization** oder andere Protokollexperimente mithilfe des Testnets testen.  
Fortgeschrittene Nutzer können auch **benutzerdefinierte Testnets oder regtest-Umgebungen** für spezialisierte Experimente betreiben.


## Wichtige Unterschiede zwischen Mainnet und Testnet

| Merkmal               | Mainnet          | Testnet                   |
|-----------------------|------------------|---------------------------|
| Wert der Coins        | Echtes ZEC       | TAZ (ohne monetären Wert) |
| Risiko                | Finanzielles Risiko | Sicher zum Testen      |
| Protokoll-Upgrades    | Produktion       | Frühe Aktivierung         |
| Mining-Belohnungen    | Echte Emission   | Nur Test-Belohnung        |
| Netzwerknutzen        | Live-Transaktionen | Tests und Entwicklung   |

## Häufige Missverständnisse

- **Testnet-Coins sind etwas wert** -> Falsch, TAZ haben keinen Wert.  
- **Der Verlust von Testnet-Coins ist relevant** -> Falsch, es geht kein echter Wert verloren.  
- **Testnet und Mainnet sind identisch** -> Falsch, das Testnet wird häufig zurückgesetzt und ist wirtschaftlich nicht so abgesichert wie das Mainnet.

---

## Was ist TAZ?

**TAZ** ist die Testnet-Version der Zcash-Coins:  

- Kein echtes Geld; kann nicht gegen ZEC oder Fiatgeld getauscht werden  
- Wird für Tests, Entwicklung und Lernen verwendet  
- Folgt allen Zcash-Regeln: kann gesendet, gemined und in shielded Adressen verwendet werden  

**Beispiel:**  
Ein Entwickler kann 100 TAZ von einer Testnet-Adresse an eine andere senden, um eine Wallet-Funktion zu testen, ohne echtes ZEC zu riskieren.  

Betrachte TAZ als **„Spielgeld“ für das Zcash Testnet**.


## Was sind Faucets?

Ein **Faucet** ist ein Dienst, der kostenlose TAZ-Coins zum Testen bereitstellt:

- In der Regel Websites oder APIs  
- Benutzer geben eine Testnet-Adresse an; das Faucet sendet eine kleine Menge TAZ  
- Dadurch entfällt die Notwendigkeit, TAZ manuell zu minen  

**Beispiel:**  
1. Besuche ein Testnet-Faucet (z. B. [testnet.zecfaucet.com](https://testnet.zecfaucet.com) | [fauzec.com](https://fauzec.com/))  
2. Gib deine Testnet-Adresse ein  
3. Fordere TAZ an  
4. Erhalte TAZ sofort, um mit dem Testen zu beginnen  

**Warum das wichtig ist:**  
- Sicheres Testen ohne ZEC zu riskieren  
- Zugänglichkeit für Einsteiger und Entwickler  
- Schnelles Prototyping für Wallets, Börsen und Apps



## Zkool- und Zingo!-Wallets

### Zkool

- Multi-Account-Wallet für fortgeschrittene Zcash-Nutzer  
- Unterstützt Seed-Phrasen, Viewing Key, transparente und shielded Adressen  
- Kann sich über Full Nodes oder lightwallet-Server mit Mainnet, Testnet oder Regtest verbinden

### Zingo!

- Mobile Wallet mit Fokus auf Privatsphäre und Einfachheit  
- Unterstützt shielded und Unified Address  
- Aktualisiert, um Testnet-Protokolle zu unterstützen (einschließlich NU6 Testnet)

## Aktivieren des Testnets in Wallets

### Zkool Wallet

<div className="my-8 w-full aspect-video max-w-3xl mx-auto rounded-2xl overflow-hidden shadow-lg bg-black">
  <iframe
    className="w-full h-full"
    src="https://www.youtube.com/embed/XCGwwqLZILg"
    title="Zkool Testnet"
    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
    allowFullScreen
    loading="lazy"
  />
</div>

**Tipps:**  
- Die Wallet kann beim Wechseln des Netzwerks neu starten  
- Mainnet-ZEC-Konten bleiben unbeeinflusst  
- Verwende bei Aufforderung einen Testnet-lightwallet-Server

### Zingo! Wallet

<div className="my-8 w-full aspect-video max-w-3xl mx-auto rounded-2xl overflow-hidden shadow-lg bg-black">
  <iframe
    className="w-full h-full"
    src="https://www.youtube.com/embed/To7WAkiBldA"
    title="Zingo Testnet"
    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
    allowFullScreen
    loading="lazy"
  />
</div>


Sobald aktiviert, können Wallets TAZ senden und empfangen, shielded Transaktionen testen und sicher experimentieren.


## Nach dem Aktivieren des Testnets

- Transaktionen verhalten sich wie im Mainnet, aber mit **wertlosen TAZ**  
- Shielded Transaktionen, mehrere Adressen und Privacy-Funktionen können getestet werden  
- Entwickler können Funktionen debuggen und testen, ohne echtes ZEC zu riskieren


## Kurzzusammenfassung

- **Zcash Testnet** ist eine sichere Sandbox-Umgebung zum Bauen, Testen und Experimentieren  
- Anwendungsfälle: Entwicklertests, Node-Tests, Börsenintegration, Forschung und Bildung  
- **TAZ-Coins** werden anstelle von ZEC verwendet und haben keinen echten Wert  
- Das Testnet ist unverzichtbar, bevor Funktionen live auf dem Mainnet bereitgestellt werden
