# Anleitung zur Integration von MetaMask Zcash Snap

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

![Zcash-snap-installieren](https://hackmd.io/_uploads/Hy5MSG2Oex.png)


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
![Benutzerdefiniertes-Netzwerk-hinzufügen....](https://hackmd.io/_uploads/S1hq7f2Oel.png)

Für **Zcash Mainnet**;
```markdown
- Name: Zcash Mainnet  
- RPC URL: https://mainnet.lightwalletd.com:9067 
- Symbol: ZEC
```

---

## **3. Mit ChainSafe WebZjs Wallet verbinden**

1. Besuche [webzjs.chainsafe.dev](https://webzjs.chainsafe.dev).  
2. Klicke auf **Connect MetaMask Snap**.  

![Zcash-Web-Wallet](https://hackmd.io/_uploads/Sk8nSz3dgl.png)

3. Genehmige die Verbindung.  
4. Sieh dir die Übersicht deines Zcash-Kontos an, einschließlich:
   - Unified Addresses und Transparent Address

![Kontoübersicht-unif....](https://hackmd.io/_uploads/r17c_Mhdel.jpg)


5. Warte, bis die Synchronisierung abgeschlossen ist.

---

## **4. Wallet aufladen**

> **ETH -> ZEC tauschen** - Nutze Dienste wie **LeoDex** und sende an deine abgeschirmte Adresse.  
> **Auszahlung von einer Börse** - Hebe gekaufte ZEC an deine abgeschirmte WebZjs-Adresse ab.  

![LEODEX-TAUSCH](https://hackmd.io/_uploads/HyLQ0G2ugg.png)


> => Verwende abgeschirmte (z) Adressen für **volle Privatsphäre**.

---

## **5. ZEC senden / empfangen**

1. Gehe in **WebZjs** zu **Transfer Balance**.  
2. Gib Folgendes ein:
```
   - Abgeschirmte Empfängeradresse  
   - Betrag
```
   ![Guthaben-übertragen](https://hackmd.io/_uploads/rkvcFfhdex.png)

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

![Adresskomponenten](https://hackmd.io/_uploads/SyPR2f2_gg.png)

---

## **Zusätzliche Hinweise**

> Verwende die [**neueste MetaMask-Version**](https://chromewebstore.google.com/detail/metamask/nkbihfbeogaeaoehlefnkodbefgpgknn?hl=en) - die öffentliche Version unterstützt Snaps.  
> Abgeschirmte Proofs können Zeit benötigen, WebAssembly übernimmt die Berechnung im Browser.  
> Die Wiederherstellung ist einfach: Installiere MetaMask und das Snap und importiere dann deinen vorhandenen Seed.  
> Das Snap verwendet standardmäßig **abgeschirmtes ZEC**, transparente Adressen stehen **nicht im Fokus**.  
> Verwende [zcashblockexplorer.com](https://zcashblockexplorer.com) für Transaktionsbestätigungen.
