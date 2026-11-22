<a href="https://github.com/zechub/zechub/edit/main/site/Using_Zcash/Metamask_Snap.md" target="_blank">
  <img src="https://img.shields.io/badge/Edit-blue" alt="Seite bearbeiten"/>
</a>

# MetaMask Zcash Snap Integrationsleitfaden

> Halte und sende abgeschirmte ZEC über die Browser-Erweiterung MetaMask – mit ChainSafes Zcash Snap und der Web-Wallet WebZjs.

## Kurzfassung

* Die ChainSafe Zcash Snap ergänzt MetaMask auf dem Desktop (Chrome, Edge, Firefox) um abgeschirmte ZEC. Es ist keine separate Zcash-Software erforderlich.
* Deine Zcash-Schlüssel werden aus deiner MetaMask-Wiederherstellungsphrase abgeleitet. Diese eine Phrase schützt jetzt sowohl dein ETH als auch dein ZEC.
* Du verwaltest ZEC über die Wallet WebZjs unter webzjs.chainsafe.dev und nicht in der eigenen Asset-Liste von MetaMask.
* Dein Konto erhält eine einheitliche Adresse. So können dir Sender Geld über den privatesten unterstützten Pool senden.
* Zahle Geld ein, indem du tauschst (zum Beispiel ETH in ZEC) oder ZEC von einer Börse an deine abgeschirmte Adresse abhebst.
* Wiederherstellung: Installiere MetaMask und Snap erneut und importiere dann deine vorhandene Wiederherstellungsphrase.

## Grundlegende Erklärung

Ein MetaMask Snap ist ein kleines Add-on in einer Sandbox, das MetaMask eine neue Blockchain beibringt. Mit dem Zcash Snap, entwickelt von ChainSafe und von Hacken geprüft, kann MetaMask Zcash-Schlüssel aus deiner vorhandenen Wiederherstellungsphrase ableiten und Zcash-Transaktionen signieren.

MetaMask selbst zeigt keinen ZEC-Kontostand an. Stattdessen verbindet sich die Web-Wallet WebZjs mit dem Snap, synchronisiert sich über einen lightwalletd-Server mit dem Netzwerk Zcash und zeigt deine Adressen und deinen Kontostand an. Abgeschirmte Nachweise werden in deinem Browser mit WebAssembly berechnet. Deshalb kann das Senden einen Moment dauern.

Die folgenden Schritte behandeln die Installation des Snap, die Verbindung mit WebZjs, das Einzahlen auf die Wallet, das Senden und Empfangen sowie die Prüfung der Bestandteile deiner einheitlichen Adresse.

## Vollständiger Leitfaden

Eine vollständige Anleitung mit visuellen Erklärungen findest du in diesem [**YouTube Leitfaden**](https://www.youtube.com/watch?v=UJh9Ilkohdw): 

<div className="my-8 w-full aspect-video max-w-3xl mx-auto rounded-2xl overflow-hidden shadow-lg bg-black">
  <iframe
    className="w-full h-full"
    src="https://www.youtube.com/embed/UJh9Ilkohdw"
    title="How to use ZEC on Metamask"
    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
    allowFullScreen
    loading="lazy"
  />
</div>
     

MetaMask unterstützt jetzt **abgeschirmte Zcash (ZEC)** über das **von ChainSafe entwickelte Zcash Snap**. Damit kannst du private ZEC direkt in deiner Browser-Wallet senden, empfangen und verwalten. Das Add-on wurde von **Hacken** geprüft und ist im **offiziellen Verzeichnis für MetaMask Snaps** aufgeführt. Es benötigt **keine separate Zcash-Software** – nur MetaMask und Snap.

---

## **Voraussetzungen**


> [**MetaMask Erweiterung**](https://snaps.metamask.io/snap/npm/zcashcommunitygrants/webzjs-zcash-snap/) (nur Desktop) – Chrome, Edge oder Firefox.
> MetaMask-Konto – Seed-Phrase gesichert; Snap leitet daraus Zcash-Schlüssel ab.  
> Stabile Internetverbindung – zur Synchronisierung mit dem Netzwerk Zcash.  
> Guthaben – ETH zum Tauschen in ZEC oder ZEC von einer Börse.

> **Tipp:** Bewahre deine MetaMask-Wiederherstellungsphrase sicher auf – sie kontrolliert sowohl dein ETH als auch dein ZEC.

---

## **1. Zcash Snap installieren**

1. Rufe das [**MetaMask Snaps Directory**](https://snaps.metamask.io/snap/npm/zcashcommunitygrants/webzjs-zcash-snap/) auf.  
2. Suche nach [**„Zcash WebZjs Wallet“**](https://snaps.metamask.io/snap/npm/zcashcommunitygrants/webzjs-zcash-snap/) oder [**„WebZjs Zcash Snap“**](https://snaps.metamask.io/snap/npm/zcashcommunitygrants/webzjs-zcash-snap/).  
3. Klicke auf **Installieren/Hinzufügen zu MetaMask**.
4. Erteile Berechtigungen wie:
   ```
      Manage Zcash accounts 
      Store data on your device
   ```

![Zcash-snap-install](/content-images/Hy5MSG2Oex-42d0c5b346.webp)


---

## **2. (Optional) Zcash-Netzwerk hinzufügen**

Wähle in MetaMask **Netzwerk hinzufügen** und gib Folgendes ein:

Für **BNB SmartChain**;
```markdown
-  Name: BNB Smart Chain
-  RPC URL: https://bsc-dataseed.binance.org
-  Chain ID: 56
-  Symbol: BNB
-  Block Explorer URL: https://bscscan.com
```
Dadurch werden Netzwerkinformationen und Explorer-Links aktiviert.
![Add-a-custom-Net....](/content-images/S1hq7f2Oel-e1ca8b9044.webp)

Für **Zcash Mainnet**;
```markdown
- Name: Zcash Mainnet  
- RPC URL: https://zjs.zec.rocks 
- Symbol: ZEC
```
`https://zjs.zec.rocks` ist ein WebZjs-kompatibler (gRPC-web) lightwalletd-Server, der von [zec.rocks](https://zec.rocks) (@emersonian) betrieben wird. Verwende für das Testnet `https://zjs.zec.rocks/testnet`. Wenn du die Web-Wallet WebZjs selbst betreibst, musst du diesen Wert für `LIGHTWALLETD_PROXY` festlegen.

---

## **3. Mit der Wallet ChainSafe WebZjs verbinden**

1. Rufe [webzjs.chainsafe.dev](https://webzjs.chainsafe.dev) auf.  
2. Klicke auf **MetaMask Snap verbinden**.  

![Zcash-web-wallet](/content-images/Sk8nSz3dgl-98ce36cc67.webp)

3. Genehmige die Verbindung.  
4. Sieh dir die Kontoübersicht von Zcash an, einschließlich:
   - Einheitliche Adressen und transparente Adresse

![Account-summary-unif....](/content-images/r17c_Mhdel-f4963826d5.webp)


5. Warte, bis die Synchronisierung abgeschlossen ist.




---

## **4. Guthaben auf die Wallet einzahlen**

> **ETH -> ZEC tauschen** – Nutze Dienste wie **LeoDex** und sende an deine abgeschirmte Adresse.  
> **Auszahlung von einer Börse** – Hebe gekaufte ZEC an deine abgeschirmte WebZjs-Adresse ab.  

![LeoDex-SWAP](/content-images/HyLQ0G2ugg-8d82ef24f6.webp)


> => Verwende für **vollständige Privatsphäre** abgeschirmte (z-)Adressen.

---

## **5. ZEC senden/empfangen**

1. Gehe in **WebZjs** zu **Guthaben übertragen**.  
2. Gib Folgendes ein:
```
   - Shielded recipient address  
   - Amount
```
   ![Transfer-Balance](/content-images/rkvcFfhdex-bd55d079eb.webp)

4. Bestätige die Transaktion in MetaMask (signiere die Transaktion).  
5. Empfangene Gelder erscheinen nach der Bestätigung in WebZjs.

---

## **6. Überprüfen/Fehler beheben**

> Prüfe **WebZjs** auf aktualisierte Kontostände **(MetaMask führt ZEC nicht direkt auf)** .  
> Falls Probleme auftreten:
  ```
  - Confirm you have the official ChainSafe Snap.  
  - Check correct network settings.  
  - Ensure correct address format.  
  - Reconnect via **Connect Snap** if needed.
  ``` 

> **Sicherheitstipp:** Installiere nur das **geprüfte ChainSafe Snap**; überprüfe die Berechtigungen, bevor du sie genehmigst.

---

## **7. Adressbestandteile prüfen**

1. Öffne den Bereich **Empfangen** – deine einheitliche Adresse wird standardmäßig angezeigt.  
2. Kopiere die einheitliche Adresse und rufe den [Zcash Block Explorer](https://mainnet.zcashexplorer.app/) auf.  
3. Füge deine einheitliche Adresse in die Suchleiste ein.  
4. Nun werden dir alle Bestandteile der einheitlichen Adresse angezeigt, darunter:
``` 
   Orchard Address  
   Sapling Address  
   Transparent Address
``` 

![Address-components](/content-images/SyPR2f2_gg-3907c5bf58.webp)



---

## **Zusätzliche Hinweise**

> Verwende die [**aktuelle Version von MetaMask**](https://chromewebstore.google.com/detail/metamask/nkbihfbeogaeaoehlefnkodbefgpgknn?hl=en) – die öffentliche Version unterstützt Snaps.  
> Abgeschirmte Nachweise können einige Zeit in Anspruch nehmen; WebAssembly übernimmt die Berechnung im Browser.  
> Die Wiederherstellung ist einfach: Installiere MetaMask und Snap erneut und importiere dann deine vorhandene Seed-Phrase.  
> Die Snap verwendet standardmäßig **abgeschirmtes ZEC**; transparente Adressen stehen **nicht im Mittelpunkt**.  
> Verwende [mainnet.zcashexplorer.app](https://mainnet.zcashexplorer.app), um Transaktionen zu bestätigen.
