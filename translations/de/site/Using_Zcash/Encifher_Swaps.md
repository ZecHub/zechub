# **SOL/USDC -> ZEC-Swap mit Encrypt.trade**  


![img1](/content-images/Bkbg5alCll-7a02545c00.webp)


*Tausche von Solana in Zcash, wobei der Cross-Chain-Schritt über Near Intents geroutet wird.*  

---

###  Einführung  
[**encrypt.trade**](https://encrypt.trade/zec) ist eine von JMD Labs Inc. betriebene Solana-App. Sie ermöglicht dir, **SOL oder USDC** auf Solana in **Zcash (ZEC)** zu tauschen. Deine Token werden zunächst in verschlüsselte Versionen umgewandelt, sodass die Beträge auf Solana verborgen sind, und anschließend über Near Intents in ZEC getauscht.

Der Swap ist in mancher Hinsicht privat, aber nicht vollständig. Die eigenen [Dokumente](https://docs.encifher.io/docs) der App besagen, dass deine Interaktion mit der Chain nicht anonym ist: Andere können sehen, dass deine Wallet die App genutzt hat, aber nicht, wie viel du bewegt hast. Das ZEC kommt außerdem an einer transparenten Adresse an und bleibt somit auf der Zcash-Chain sichtbar, bis du es shieldest.


![img2](/content-images/ByQ2qpeRee-67fce2814c.webp)

---

###  Was du vor dem Swap wissen solltest  
- **Solana-Seite.** Das Wrapping verbirgt Beträge, aber deine Wallet-Adresse und ihre Nutzung der App sind öffentlich. Die [Best Practices](https://docs.encifher.io/docs/best-practices) warnen davor, dass ein einfaches Wrap, Swap und Unwrap deine Transaktion verknüpfbar macht.
- **Verschlüsselung.** Verschlüsselte Guthaben werden off-chain innerhalb einer Hardware-Enklave (TEE) verarbeitet. Das [Paper](https://eprint.iacr.org/2026/1504) der Entwickler besagt, dass dies auf der Integrität des TEE, einer ehrlichen Verwaltung von Schwellenwertschlüsseln und der Cloud-Attestierungswurzel beruht, nicht allein auf Kryptografie.
- **Cross-Chain-Schritt.** Der Swap zu ZEC wird über Near Intents geroutet, wo unabhängige Solver die Order ausführen.
- **Zcash-Seite.** Near Intents führt ZEC als unterstützt für [nur transparente Adressen](https://docs.near-intents.org/resources/chain-support) auf, und das ZEC-Feld auf encrypt.trade akzeptierte bei der Überprüfung dieses Leitfadens im September 2026 nur transparente Adressen (t1 oder t3). Eine transparente Adresse zeigt ihr Guthaben und eingehende Transfers öffentlich an, bis du shieldest.
- **Screening.** Die App prüft verbindende Wallets anhand von Datenbanken wie TRM und Chainalysis, und auf ihrer [Compliance-Seite](https://docs.encifher.io/docs/compliance) steht, dass verschlüsselte Aufzeichnungen bei berechtigtem rechtlichem Anlass überprüft werden können. Near Intents führt ebenfalls ein eigenes [Screening](https://docs.near-intents.org/security-compliance/risk-and-compliance) durch.

---

###  Schritt 1: Verbinde deine Solana-Wallet  
Besuche [encrypt.trade](https://encrypt.trade/zec) mit **Chrome oder Firefox** und verbinde deine **Phantom**-, **Solflare**- oder **Slope**-Wallet. Stelle sicher, dass deine Wallet genug **SOL** für Gasgebühren und die Token enthält, die du handeln möchtest. Nach der Verbindung kannst du deine Assets wrappen.  


![img3](/content-images/SyVOs6lRxx-cbd8193e84.webp)





---

![img4](/content-images/Bkh_jTgCex-2fc8428592.webp)


---

###  Schritt 2: Wrappe deine Token  
Navigiere zum Bereich **Wrap**. Wähle **SOL** oder **USDC**, gib den Betrag ein und bestätige. Die App sperrt deine Assets und gibt **verschlüsselte Versionen (eSOL oder eUSDC)** aus. Wenn du einen anderen Betrag wrappst als du tauschst, wird es schwieriger, beide anhand des Betrags zuzuordnen, aber es verbirgt nicht, dass deine Wallet die App genutzt hat.  




![img5](/content-images/S10J26xCxg-6322a40b18.webp)

---



![img6](/content-images/Sk0y3Te0gl-124792365a.webp)


---

###  Schritt 3: Bereite deine ZODL-Wallet vor  
Lade [**ZODL**](https://zodl.com) herunter, die von ZODL betriebene Zcash-Wallet. Kopiere auf dem Empfangsbildschirm deine **Zcash Transparent Address** (sie beginnt mit t1). encrypt.trade akzeptiert derzeit keine shielded oder Unified Addresses für ZEC. Bewahre deine Seed-Phrase sicher auf, bevor du fortfährst.  


![img7](/content-images/SykjhpgRll-60d19f6979.webp)


---

###  Schritt 4: Swap  
Gehe zurück zu **encrypt.trade** und öffne **Swap**. Wähle **eSOL/eUSDC -> ZEC**, füge deine transparente ZODL-Adresse ein, überprüfe die Details und bestätige.



![img8](/content-images/SJkI6pl0ge-9f93d8f34c.webp)

---


![img9](/content-images/S1yoapgRle-6d2031a62c.webp)


**Near Intents** übernimmt das Cross-Chain-Routing und sendet das **ZEC** an deine ZODL-Wallet. Dies kann einige Minuten dauern. Near Intents empfiehlt, für Cross-Chain-Swaps bis zu 15 Minuten einzuplanen.  



![img10](/content-images/S1h36Tg0xl-2d7dd0a495.webp)

---

###  Schritt 5: Shield dein ZEC  
Sobald das ZEC angekommen ist, nutze die **Shield**-Option von ZODL, um es in den [Shielded Pool](/using-zcash/shielded-pools) zu verschieben. Bis dahin liegt es an einer transparenten Adresse, an der jeder das Guthaben sehen kann. Shielding schützt, was du als Nächstes tust, aber der eingehende Transfer und die Shielding-Transaktion bleiben auf der Chain sichtbar. Überprüfe Links immer, vermeide die Wiederverwendung von Adressen und teste zuerst kleine Beträge.  

---

###  Wer beteiligt ist und wo du Hilfe bekommst  
- **encrypt.trade** ist die von JMD Labs Inc. betriebene App. Laut ihrer [Datenschutzerklärung](https://encrypt.trade/privacy) sammelt sie technische Daten wie IP-Adresse, Browser- und Gerätedetails, übermittelt deine Wallet-Adresse, den jüngsten Verlauf und Guthaben vor einem Swap an Compliance-Anbieter und kann Protokolle sowie AML-Screening-Ergebnisse bis zu fünf Jahre aufbewahren. Die [Nutzungsbedingungen](https://encrypt.trade/terms) verbieten die Nutzung eines VPN oder Proxys, um deinen Standort zu verbergen. Support: help@encifher.io oder die aus der App verlinkte [Telegram-Gruppe](https://t.me/+ZWHGMW4ZHXQwYTZl).
- **Near Intents** routet den Cross-Chain-Schritt und liefert das ZEC. Siehe die [1Click API-Nutzungsbedingungen](https://docs.near-intents.org/security-compliance/terms-of-service) sowie die Datenschutzerklärung unter near.com/privacy, verfolge Swaps im [Near Intents Explorer](https://explorer.near-intents.org) und bitte in [Near Intents Telegram](https://t.me/near_intents) um Hilfe.

Nutzungsbedingungen und unterstützte Adressen können sich ändern. Prüfe daher vor einem großen Swap die aktuellen Versionen. Weitere Informationen zum größeren Zusammenhang findest du unter [Nicht-verwahrte Börsen](/using-zcash/non-custodial-exchanges).

---

Durch die Kombination von **Solana**, **Zcash** und **Near Intents** bietet dir **encrypt.trade** einen schnellen Weg von SOL oder USDC zu ZEC. Es verbirgt Beträge auf Solana, ist aber nicht durchgängig privat. Shield daher dein ZEC, sobald es angekommen ist.
