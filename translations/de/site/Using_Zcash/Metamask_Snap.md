<a href="https://github.com/zechub/zechub/edit/main/site/Using_Zcash/Metamask_Snap.md" target="_blank">
  <img src="https://img.shields.io/badge/Edit-blue" alt="Edit Page"/>
</a>

# Anleitung zur Integration von MetaMask Zcash Snap

> Halte und sende abgeschirmte ZEC über die Browser-Erweiterung MetaMask mit dem Zcash Snap von ChainSafe und der Web-Wallet WebZjs.

## Kurz gesagt

* ChainSafe Zcash Snap ermöglicht abgeschirmtes ZEC in MetaMask auf dem Desktop (Chrome, Edge, Firefox). Keine separate Zcash-Software ist erforderlich.
* Deine Zcash-Schlüssel werden aus deiner MetaMask-Wiederherstellungsphrase abgeleitet. Diese eine Phrase schützt nun sowohl dein ETH als auch dein ZEC.
* Du verwaltest ZEC über die WebZjs-Wallet unter webzjs.chainsafe.dev, nicht in der eigenen Asset-Liste von MetaMask.
* Dein Konto erhält eine einheitliche Adresse, sodass Absender dir über den privatesten Pool zahlen, den sie unterstützen.
* Finanziere es durch Swaps (zum Beispiel ETH gegen ZEC) oder indem du ZEC von einer Börse an deine abgeschirmte Adresse auszahlen lässt.
* Wiederherstellung: Installiere MetaMask und Snap erneut und importiere dann deine bestehende Wiederherstellungsphrase.

## Kernerklärung

Ein MetaMask Snap ist ein kleines, in einer Sandbox ausgeführtes Add-on, das MetaMask eine neue Blockchain beibringt. Das von ChainSafe entwickelte und von Hacken geprüfte Zcash Snap ermöglicht es MetaMask, Zcash-Schlüssel aus Ihrer bestehenden Wiederherstellungsphrase abzuleiten und Zcash-Transaktionen zu signieren.

MetaMask selbst zeigt kein ZEC-Guthaben an. Stattdessen verbindet sich die WebZjs-Web-Wallet mit Snap, synchronisiert sich über einen lightwalletd-Server mit dem Zcash-Netzwerk und zeigt deine Adressen und dein Guthaben an. Shielded Proofs werden mit WebAssembly in deinem Browser berechnet, weshalb das Senden einen Moment dauern kann.

Die folgenden Schritte umfassen die Installation von Snap, das Verbinden von WebZjs, das Aufladen der Wallet, das Senden und Empfangen sowie die Überprüfung der Bestandteile Ihrer einheitlichen Adresse.

## Vollständige Anleitung

Für eine vollständige Schritt-für-Schritt-Anleitung und visuelle Erklärung sieh dir diesen [**YouTube-Leitfaden**](https://www.youtube.com/watch?v=UJh9Ilkohdw) an: 

<div className="my-8 w-full aspect-video max-w-3xl mx-auto rounded-2xl overflow-hidden shadow-lg bg-black">
  <iframe
    className="w-full h-full"
    src="https://www.youtube.com/embed/UJh9Ilkohdw"
    title="Wie man ZEC auf Metamask verwendet"
    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
    allowFullScreen
    loading="lazy"
  />
</div>
     

MetaMask unterstützt jetzt **abgeschirmtes Zcash (ZEC)** über das **von ChainSafe entwickelte Zcash Snap**, sodass du privates ZEC direkt in deiner Browser-Wallet senden, empfangen und verwalten kannst. Geprüft von **Hacken** und im **offiziellen MetaMask Snaps Directory** gelistet, benötigt es **keine separate Zcash-Software** - nur MetaMask und das Snap.

---

## **Voraussetzungen**


> [**MetaMask-Erweiterung**](https://snaps.metamask.io/snap/npm/chainsafe/webzjs-zcash-snap/) (nur Desktop) - Chrome, Edge oder Firefox.
> MetaMask-Konto - Seed-Phrase gesichert; das Snap leitet daraus Zcash-Schlüssel ab.  
> Stabile Internetverbindung - Für die Synchronisierung mit dem Zcash-Netzwerk.  
> Guthaben - ETH zum Tausch gegen ZEC oder ZEC von einer Börse.

> **Tipp:** Schütze deine MetaMask-Wiederherstellungsphrase - sie kontrolliert sowohl ETH als auch ZEC.

---

## **1. Das Zcash Snap installieren**

1. Gehe zum [**MetaMask Snaps Directory**](https://snaps.metamask.io/snap/npm/chainsafe/webzjs-zcash-snap/).  
2. Suche nach [**"Zcash Shielded Wallet"**](https://snaps.metamask.io/snap/npm/chainsafe/webzjs-zcash-snap/) oder [**"WebZjs Zcash Snap"**](https://snaps.metamask.io/snap/npm/chainsafe/webzjs-zcash-snap/).  
3. Klicke auf **Install/Add to MetaMask**.
4. Genehmige Berechtigungen wie:
   ```
      Zcash-Konten verwalten 
      Daten auf deinem Gerät speichern
   ```

![Zcash-snap-installieren](/content-images/Hy5MSG2Oex-42d0c5b346.webp)


---

## **2. (Optional) Zcash-Netzwerk hinzufügen**

Wähle in MetaMask **Add Network** und gib Folgendes ein:

Für **BNB SmartChain**;
```markdown
-  Name: BNB Smart Chain
-  RPC URL: https://bsc-dataseed.binance.org
-  Chain ID: 56
-  Symbol: BNB
-  Block Explorer URL: https://bscscan.com
```
Dies aktiviert Netzwerkinformationen und Explorer-Links.
![Benutzerdefiniertes-Netzwerk-hinzufügen....](/content-images/S1hq7f2Oel-e1ca8b9044.webp)

Für **Zcash Mainnet**;
```markdown
- Name: Zcash Mainnet  
- RPC URL: https://zjs.zec.rocks 
- Symbol: ZEC
```
`https://zjs.zec.rocks` ist ein mit WebZjs kompatibler (gRPC-web) lightwalletd-Server, betrieben von [zec.rocks](https://zec.rocks) (@emersonian). Für das Testnet verwende `https://zjs.zec.rocks/testnet`. Wenn du die WebZjs-Web-Wallet selbst betreibst, ist dies der Wert, der als `LIGHTWALLETD_PROXY` festzulegen ist.

---

## **3. Mit ChainSafe WebZjs Wallet verbinden**

1. Besuche [webzjs.chainsafe.dev](https://webzjs.chainsafe.dev).  
2. Klicke auf **Connect MetaMask Snap**.  

![Zcash-Web-Wallet](/content-images/Sk8nSz3dgl-98ce36cc67.webp)

3. Genehmige die Verbindung.  
4. Sieh dir die Übersicht deines Zcash-Kontos an, einschließlich:
   - Unified Addresses und Transparent Address

![Kontoübersicht-unif....](/content-images/r17c_Mhdel-f4963826d5.webp)


5. Warte, bis die Synchronisierung abgeschlossen ist.

---

## **4. Wallet aufladen**

> **ETH -> ZEC tauschen** - Nutze Dienste wie **LeoDex** und sende an deine abgeschirmte Adresse.  
> **Auszahlung von einer Börse** - Hebe gekaufte ZEC an deine abgeschirmte WebZjs-Adresse ab.  

![LeoDex-TAUSCH](/content-images/HyLQ0G2ugg-8d82ef24f6.webp)


> => Verwende abgeschirmte (z) Adressen für **volle Privatsphäre**.

---

## **5. ZEC senden / empfangen**

1. Gehe in **WebZjs** zu **Transfer Balance**.  
2. Gib Folgendes ein:
```
   - Abgeschirmte Empfängeradresse  
   - Betrag
```
   ![Guthaben-übertragen](/content-images/rkvcFfhdex-bd55d079eb.webp)

4. Bestätige die Transaktion in MetaMask (signiere die Transaktion).  
5. Empfangene Gelder erscheinen nach der Bestätigung in WebZjs.

---

## **6. Überprüfen / Fehlerbehebung**

> Prüfe **WebZjs** auf aktualisierte Guthaben **(MetaMask hat ZEC nicht direkt gelistet)** .  
> Falls Probleme auftreten:
  ```
  - Bestätige, dass du das offizielle ChainSafe Snap hast.  
  - Prüfe die korrekten Netzwerkeinstellungen.  
  - Stelle sicher, dass das Adressformat korrekt ist.  
  - Verbinde dich bei Bedarf über **Connect Snap** erneut.
  ``` 

> **Sicherheitstipp:** Installiere nur das **geprüfte ChainSafe Snap**; überprüfe die Berechtigungen vor der Genehmigung.

---

## **7. Adresskomponenten prüfen**

1. Gehe zum Abschnitt **Receive** - deine Unified Address wird standardmäßig angezeigt.  
2. Kopiere die Unified Address und besuche den [Zcash Block Explorer](https://mainnet.zcashexplorer.app/).  
3. Füge deine Unified Address in die Suchleiste ein.  
4. Jetzt siehst du alle Komponenten der Unified Address, darunter:
``` 
   Orchard Address  
   Sapling Address  
   Transparent Address
``` 

![Adresskomponenten](/content-images/SyPR2f2_gg-3907c5bf58.webp)

---

## **Zusätzliche Hinweise**

> Verwende die [**neueste MetaMask-Version**](https://chromewebstore.google.com/detail/metamask/nkbihfbeogaeaoehlefnkodbefgpgknn?hl=en) - die öffentliche Version unterstützt Snaps.  
> Abgeschirmte Proofs können Zeit benötigen, WebAssembly übernimmt die Berechnung im Browser.  
> Die Wiederherstellung ist einfach: Installiere MetaMask und das Snap und importiere dann deinen vorhandenen Seed.  
> Das Snap verwendet standardmäßig **abgeschirmtes ZEC**, transparente Adressen stehen **nicht im Fokus**.  
> Verwende [mainnet.zcashexplorer.app](https://mainnet.zcashexplorer.app) für Transaktionsbestätigungen.
