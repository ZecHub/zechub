# **So tauschst du in der Phantom Wallet gegen ZEC**



![img1](/content-images/SJOlnt-ceg-34468cfecd.webp)

---

## **Natives ZEC oder ein ZEC-Token?**

„ZEC“ in Phantom kann zwei unterschiedliche Assets bezeichnen. Daher solltest du wissen, wofür du bezahlst.

- Die integrierte **Swap-Schaltfläche** von Phantom gibt dir eine Token-Repräsentation von ZEC auf Solana (oder einem anderen von Phantom unterstützten Netzwerk). Es handelt sich nicht um natives ZEC. Der Token befindet sich an deiner Phantom-Adresse, verfügt über keine abgeschirmte Zcash-Funktionalität, und eine Zcash-Wallet kann ihn weder sehen noch abschirmen.
- Natives ZEC existiert nur auf der Zcash-Blockchain und wird an eine Zcash-Adresse gesendet. Um es zu erhalten, benötigst du einen Dienst, der nach deiner Zcash-Adresse fragt, beispielsweise einen Swap innerhalb von [ZODL](https://zodl.com), eine der Optionen auf der [DEX-Seite](/dex) oder solswap.org mit anschließender Auszahlung an deine Zcash-Wallet (Schritt 8).

### Prüfe dies vor der Zahlung

- **Netzwerk:** Das ZEC, das du erhältst, sollte sich im **Zcash**-Netzwerk befinden. Wenn dort Solana, Ethereum oder Base steht, ist es ein Token.
- **Asset:** Natives ZEC hat keine Token-Contract- oder Mint-Adresse. Wenn deines eine solche anzeigt, ist es ein Token. Auf Solana gibt es außerdem viele ähnlich aussehende „ZEC“-Token – verlasse dich also nicht allein auf den Namen.
- **Adresse:** Natives ZEC wird an eine Zcash-Adresse gesendet, die mit `t1`, `u1` oder `zs` beginnt. Wenn das ZEC an deine Phantom-Adresse gesendet wird, erhältst du einen Token.

---

##  **Schritt 1: Öffne die Swap-Oberfläche**  
Starte die **Phantom-App** und besuche **[solswap.org](https://solswap.org/)** im Phantom-Browser. Die Website läuft auf Near Intents und kann ZEC an eine Zcash-Adresse senden.  

Die eigene **Swap**-Schaltfläche von Phantom listet ebenfalls ZEC auf, aber damit erhältst du den oben beschriebenen Token, nicht natives ZEC.  


![img2](/content-images/S1Cp-KWqxe-ab70e844b9.webp)

---

##  **Schritt 2: Netzwerke und Token für die Einzahlung auswählen**  
- Wähle dein **Quellnetzwerk** (z. B. *Ethereum* oder *Solana*) und zahle anschließend zum Tauschen ein.  


![img3](/content-images/S1SaGYZ9xx-2a27ccdd47.webp)

- Wähle einen Basis-Token wie **SOL, USDT oder USDC**.  
- Wähle **ZEC** als deinen **Ziel-Token**.  
- Stelle sicher, dass Zcash über die Swap-Oberfläche verfügbar ist.  



![img4](/content-images/ry4QQF-5gx-f3805528ea.webp)

---

##  **Schritt 3: Betrag eingeben und Angebot prüfen**  
- Gib den Betrag ein, den du tauschen möchtest.  
- Phantom zeigt dir nach Abzug der Gebühren einen **voraussichtlichen Empfangsbetrag** an.  


![img5](/content-images/B1U1NYW5xe-58cf150668.webp)

---

##  **Schritt 4: Gas und Gebühren prüfen**  
- Bei **Swaps innerhalb derselben Chain** musst du sicherstellen, dass du genügend des nativen Gas-Tokens hast (*ETH für Ethereum, SOL für Solana*).  
- **Chain-übergreifende Swaps** erfordern Gas auf der Quell- und der Ziel-Chain.  
- Prüfe die Gebührenaufschlüsselung:  
  - Phantom-Gebühr: **0,85 %**  
  - Netzwerk-Gas  
  - Gebühren des Bridge-Anbieters (~**0,3 %**)  
  
  
---

##  **Schritt 5: Einstellungen anpassen (optional)**  
Tippe auf **Swap-Einstellungen**, um:  
- den **Slippage-Wert** anzupassen (standardmäßig **0,3 %**, bis zu 30 % anpassbar).  
- die **Prioritätsgebühren** in ausgelasteten Netzwerken zu erhöhen.  

---

##  **Schritt 6: Swap bestätigen**  
- Prüfe alle Swap-Details.  
- Tippe auf **Jetzt tauschen**, um die Transaktion zu starten.  


![img6](/content-images/HkU1UKZ5gx-e068ea8d5a.webp)

---

## **Schritt 7: Status überwachen**  
- Verfolge deinen Swap im Tab **Letzte Aktivitäten**.  
- Verwende bei Chain-übergreifenden Swaps deine **Transaktions-ID** mit **Li.Fi Scanner** für Echtzeit-Updates. 


![img7](/content-images/S1NBwKbcxe-5b7d11f5c1.webp)

---

## **Schritt 8: Natives ZEC an deine Zcash-Wallet auszahlen**  
Nach dem Swap erscheint dein ZEC in deinem solswap.org-**Account**-Guthaben. Es befindet sich noch nicht im Zcash-Netzwerk und auch nicht in Phantom. So verschiebst du es:  
- Öffne eine Zcash-Wallet wie [ZODL](https://zodl.com) und kopiere deine Empfangsadresse. Das Auszahlungsformular akzeptiert eine transparente (`t1`) oder vereinheitlichte (`u1`) Adresse.  
- Gehe auf solswap.org zu **Account** und tippe auf **Auszahlen**.  
- Wähle **ZEC**, stelle das Netzwerk auf **Zcash** ein, füge deine Adresse ein und prüfe sie vor dem Bestätigen noch einmal.  

---

## **Nächste Schritte**  
Sobald sich natives ZEC in deiner Zcash-Wallet befindet, kannst du es mit [dieser Anleitung](/guides/using-zec-privately) abschirmen.  

Ein ZEC-Token, den du über die Swap-Schaltfläche von Phantom gekauft hast, kann auf diese Weise nicht abgeschirmt werden, weil er sich nicht im Zcash-Netzwerk befindet. Du müsstest ihn zunächst gegen natives ZEC tauschen, das an eine Zcash-Adresse gesendet wird.
