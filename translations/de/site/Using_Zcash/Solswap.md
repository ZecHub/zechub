# **So tauschst du in der Phantom Wallet gegen ZEC**



![img1](/content-images/SJOlnt-ceg-34468cfecd.webp)

Hältst du bereits ZEC auf Solana (zum Beispiel aus einem Token, der Inhabern in ZEC auszahlt)? Tausche ihn nicht. Verschiebe diesen Token mit [ in eine abgeschirmte Zcash-Wallet. Hast du ZEC auf Solana? Verschiebe es in abgeschirmte Zcash](/using-zcash/solana-zec-to-shielded).

---

## **Natives ZEC oder ein ZEC-Token?**

„ZEC“ in Phantom kann zwei unterschiedliche Assets bezeichnen. Daher solltest du wissen, wofür du bezahlst.

- Die integrierte **Swap-Schaltfläche** von Phantom gibt dir eine Token-Repräsentation von ZEC auf Solana (oder einem anderen von Phantom unterstützten Netzwerk). Es handelt sich nicht um natives ZEC. Der Token befindet sich an deiner Phantom-Adresse, verfügt über keine abgeschirmte Zcash-Funktionalität, und eine Zcash-Wallet kann ihn weder sehen noch abschirmen.
- Natives ZEC existiert nur auf der Zcash-Blockchain und wird an eine Zcash-Adresse gesendet. Um es zu erhalten, benötigst du einen Dienst, der nach deiner Zcash-Adresse fragt, beispielsweise einen Swap innerhalb von [ZODL](https://zodl.com), eine der Optionen auf der [DEX-Seite](/dex) oder solswap.org mit anschließender Auszahlung an deine Zcash-Wallet (Schritt 8).

### Prüfe dies vor der Zahlung

- **Netzwerk:** Das ZEC, das du erhältst, sollte sich im **Zcash**-Netzwerk befinden. Wenn dort Solana, Ethereum oder Base steht, handelt es sich um einen Token.
- **Asset:** Natives ZEC hat keinen Token-Vertrag und keine Mint-Adresse. Wenn deines einen solchen Eintrag aufweist, handelt es sich um einen Token. Auf Solana gibt es außerdem viele ähnlich aussehende „ZEC“-Token, also verlasse dich nicht allein auf den Namen. Der OmniBridge-Token auf Solana ist `A7bdiYdS5GjqGFtxf17ppRHtDKPkkRqbKtR27dxvQXaS`; auch das ist ein Token, kein natives ZEC.
- **Adresse:** Natives ZEC wird an eine Zcash-Adresse gesendet, die mit `t1`, `u1` oder `zs` beginnt. Wenn das ZEC an deine Phantom-Adresse gesendet wird, erhältst du einen Token.

---

##  **Schritt 1: Öffne die Swap-Oberfläche**
Starte die **Phantom-App** und rufe **[solswap.org](https://solswap.org/)** im Browser von Phantom auf. Gib die Adresse selbst ein. Die Website läuft auf NEAR Intents und kann ZEC an eine Zcash-Adresse senden.

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

##  **Schritt 3: Betrag eingeben & Angebot prüfen**
- Gib den Betrag ein, den du tauschen möchtest.
- Verwende den auf **solswap.org** angezeigten Empfangsbetrag. Dieses Angebot gilt für diese Route.

![img5](/content-images/B1U1NYW5xe-58cf150668.webp)

---

##  **Schritt 4: Gas & Gebühren prüfen**
- Halte genügend Gas-Token der Ausgangskette in Phantom, um die Einzahlung zu genehmigen (*SOL* auf Solana, *ETH* auf Ethereum).
- Lies die Gebührenzeile im solswap-Angebot, bevor du bestätigst. Der integrierte Swap von Phantom verwendet einen eigenen Gebührenplan (historisch eine Phantom-Gebühr von 0,85 % zuzüglich Netzwerk-Gas und einer Bridge-Gebühr). Diese Zahlen gelten nicht für eine Einzahlung auf solswap.org.

---

##  **Schritt 5: Einstellungen anpassen (optional)**
Überprüfe auf solswap.org vor der Einzahlung die Slippage und den auf diesem Bildschirm angegebenen Mindestbetrag, den du erhältst.

Wenn du stattdessen das eigene **Swap**-Fenster von Phantom siehst, befindest du dich auf der Token-Route vom Anfang dieser Seite. Schließe es und öffne `solswap.org` im Phantom-Browser.

---

##  **Schritt 6: Swap bestätigen**
- Überprüfe alle Swap-Details auf solswap.org.
- Bestätige die Einzahlung in Phantom.

![img6](/content-images/HkU1UKZ5gx-e068ea8d5a.webp)

---

## **Schritt 7: Status überwachen**
- Verfolge die Einzahlung in der Aktivität von solswap.org, bis sie als **Abgeschlossen** angezeigt wird.
- Die Solana- oder Quell-Chain-Transaktions-ID befindet sich in dieser Aktivitätszeile und im Chain-Explorer dieses Netzwerks.

![img7](/content-images/S1NBwKbcxe-5b7d11f5c1.webp)

---

## **Schritt 8: Natives ZEC auf deine Zcash-Wallet auszahlen**
Nach dem Swap erscheint dein ZEC in deinem solswap.org-**Kontoguthaben**. Es befindet sich noch nicht im Zcash-Netzwerk und auch nicht in Phantom.

1. Öffne eine Zcash-Wallet, die im [Verzeichnis](/wallets) als **Ironwood: Bereit** markiert ist. Kopiere eine `u1`, die deine Wallet als abgeschirmt kennzeichnet. Auch eine `t1` funktioniert, aber diese Einzahlung ist öffentlich, bis du sie abschirmst.
2. Gehe auf solswap.org zu **Account** und tippe auf **Withdraw**. Wähle **ZEC**, setze das Netzwerk auf **Zcash**, füge die Adresse ein und prüfe vor dem Bestätigen das erste und letzte Zeichen.
3. Wenn **Received amount** und **Fee** bei „–“ bleiben und die Schaltfläche nichts tut, ist das Guthaben nicht verloren. Es befindet sich in NEAR Intents unter deinem Phantom-Schlüssel. Schließe den Vorgang auf [near.com](https://near.com) ab: Melde dich mit derselben Phantom-Wallet an, öffne **Move legacy assets**, tippe in der Zeile ZEC auf **Withdraw** (nicht auf **Move**), setze das Netzwerk auf **Zcash** und füge dieselbe `u1` ein. Phantom wird dich auffordern, die **Sign Message** auszuführen. Bestätige nur, wenn die Anfrage von `near.com` stammt und die Nachricht `"verifying_contract": "intents.near"` nennt. Die vollständigen Bildschirme für diesen Workaround findest du in [Hast du ZEC auf Solana? Verschiebe es in abgeschirmtes Zcash](/using-zcash/solana-zec-to-shielded).

---

## **Nächste Schritte**
Sobald sich natives ZEC in deiner Zcash Wallet befindet, halte es abgeschirmt, indem du [ verwendest ZEC privat](/guides/using-zec-privately).

Ein mit der Swap-Schaltfläche von Phantom gekaufter ZEC-Token kann nicht von Phantom abgeschirmt werden. Dieser Token ist das OmniBridge-Asset auf Solana. Verschiebe ihn mit [Hast du ZEC auf Solana? Verschiebe ihn in abgeschirmtes Zcash](/using-zcash/solana-zec-to-shielded).
