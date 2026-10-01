<a href="https://github.com/zechub/zechub/edit/main/site/Using_Zcash/Solana_ZEC_to_Shielded.md" target="_blank">
  <img src="https://img.shields.io/badge/Edit-blue" alt="Edit Page"/>
</a>

# Hast du ZEC auf Solana? Verschiebe es zu abgeschirmtem Zcash

Diese Seite ist für dich, wenn ZEC in deiner Solana-Wallet auftauchte, weil du ZCAT oder einen anderen Solana-Token hältst, der seine Inhaber in ZEC auszahlt. Du musst nichts verkaufen, um diesem Weg zu folgen. Du verschiebst das ZEC, das du bereits hast, von Solana in eine Zcash-Wallet und erhältst es abgeschirmt.

Wir haben jeden unten stehenden Schritt am 27. September 2026 mit einer echten Übertragung durchgeführt, beginnend mit 0.00266336 ZEC in Phantom. Die Gebühren, Zeiten und Bildschirme auf dieser Seite entsprechen unseren Beobachtungen.

---

## Was du tatsächlich hältst

Das ZEC in deiner Solana-Wallet ist ein Token auf Solana, keine Coins im Zcash-Netzwerk. Das NEAR OmniBridge gibt ihn aus und hält echtes ZEC auf der Zcash-Chain als Deckung; die Bridge ist seit Oktober 2025 auf Solana aktiv. Ihr Solana-Teil läuft über Wormhole-Nachrichten und NEAR Chain Signatures, nicht über einen Zcash-Light-Client, daher ist die Solana-Seite nur so zuverlässig wie diese beiden Systeme. Manche nennen es „Papier-ZEC“. Es folgt dem Preis von ZEC, doch jedes Guthaben und jede Übertragung liegt unter deiner Wallet-Adresse im öffentlichen Ledger von Solana, und es kann nicht abgeschirmt werden, solange es dort bleibt.

Prüfe, ob deins der echte Token ist. Tippe in Phantom auf **ZEC** und scrolle zu **Über Zcash**. Die Vertragsadresse muss sein:

```
A7bdiYdS5GjqGFtxf17ppRHtDKPkkRqbKtR27dxvQXaS
```

![Phantom's About Zcash panel showing the contract address A7bd…QXaS on the Solana network](https://raw.githubusercontent.com/ZecHub/zechub/main/site/Using_Zcash/assets/solana-zec-to-shielded/01-phantom-zec-mint.png)

Phantom kürzt sie zu `A7bd…QXaS`, also vergleiche das erste und letzte Zeichen oder schlage die vollständige Adresse auf [Solscan](https://solscan.io/token/A7bdiYdS5GjqGFtxf17ppRHtDKPkkRqbKtR27dxvQXaS) nach. Jeder andere „ZEC“-Token in deiner Wallet ist, unabhängig von Name oder Logo, nicht dieser. Lass ihn in Ruhe.

---

## Warum du es verschieben solltest

Abgeschirmtes ZEC ist der Kern von Zcash. Wenn dein ZEC in einem abgeschirmten Pool liegt, sind Sender, Empfänger und Betrag jeder Zahlung auf der Zcash-Chain verschlüsselt. Niemand, der einen Explorer durchsucht, kann dein Guthaben sehen.

Du hältst bereits ZEC. Wenn du es in eine Zcash-Wallet verschiebst, erhältst du den Teil, der es zu Zcash macht, und die Bridge fällt weg: Natives ZEC in deiner eigenen Wallet hängt nicht davon ab, dass jemand eine Rückgabe einlöst.

[Wer kann deine Zcash-Zahlung sehen?](/start-here/who-can-see-your-zcash-payment) erklärt genau, was verborgen bleibt.

---

## Wähle eine Zcash-Wallet

ZecHub wählt keine für dich aus. Wähle aus dem [ZecHub-Wallet-Verzeichnis](/wallets) und prüfe zwei Kennzeichnungen auf der Karte der Wallet, bevor du sie installierst:

- **Ironwood: Bereit.** Ironwood ist der Pool, in den neues abgeschirmtes ZEC seit dem [Ironwood-Upgrade](/zcash-tech/ironwood) am 28. Juli 2026 gelangt. Der ältere Orchard-Pool nimmt keine neuen Mittel mehr an.
- **Automatische Abschirmung.** Nützlich, wenn eine Zahlung transparent eingeht: Die Wallet verschiebt dieses ZEC für dich in den abgeschirmten Pool. Betrachte diese Kennzeichnung nicht als Ersatz für **Ironwood: Bereit**. Eine Wallet kann automatische Abschirmung haben und trotzdem keinen Ironwood-Pool besitzen (Edge befindet sich heute im Verzeichnis in diesem Zustand). Die meisten anderen Wallets zeigen stattdessen eine **Shield**-Schaltfläche.

Installiere die Wallet über den Link auf ihrer Verzeichniskarte, nicht über ein Suchergebnis oder eine Anzeige. Schreibe die Seed-Phrase auf Papier und bewahre sie offline auf.

Deine Wallet zeigt zwei Arten von Adressen:

![A Zcash wallet's Receive screen with a shielded address starting u1 and a transparent address starting t1](https://raw.githubusercontent.com/ZecHub/zechub/main/site/Using_Zcash/assets/solana-zec-to-shielded/02-zodl-receive.png)

| Beginnt mit | Typ | Was die Öffentlichkeit sieht |
|---|---|---|
| `u1` | Unified Address | Nichts über dich, aber nur, wenn die Zahlung in einem abgeschirmten Pool eingeht |
| `t1` | Transparente Adresse | Deine Adresse und der Betrag, für immer, wie bei Solana |

Verwende eine `u1`, die deine Wallet als abgeschirmt kennzeichnet. Eine `u1` ist ein Bündel von Empfängern, und manche Wallets enthalten darin neben dem abgeschirmten auch einen transparenten Empfänger. Ein Sender, der nur an transparente Adressen zahlen kann, verwendet diesen, und deine Zahlung geht öffentlich ein, obwohl du eine `u1` eingefügt hast. Die abgeschirmte Adresse unserer Test-Wallet hat keinen transparenten Empfänger, daher konnte das nicht passieren. [Abgeschirmte Pools](/using-zcash/shielded-pools) behandelt Empfänger ausführlicher. Manche Wallets zeigen jedes Mal eine neue `u1`, wenn du Empfangen öffnest; das ist normal, und sie gehören alle dir. Der Empfangs-Screenshot und das Empfängerfeld von near.com auf dieser Seite verwenden aus diesem Grund unterschiedliche `u1`-Präfixe.

Wir verwendeten ZODL für unseren Test, weil diese Wallet bereits eingerichtet war. Nur Wallets, die das Verzeichnis als **Ironwood: Bereit** kennzeichnet, können neuen abgeschirmten Wert empfangen.

---

## Verschiebe es

Der Weg besteht aus zwei Teilen: Übertrage dein ZEC von Phantom in NEAR Intents und sende es dann an deine Zcash-Adresse. Für den ersten Teil verwendeten wir [solswap.org](https://solswap.org), eine für Solana-Nutzer entwickelte NEAR-Website, und für den zweiten [near.com](https://near.com), die eigene App von NEAR. Der Leitfaden von ZecHub [Wie man in der Phantom Wallet gegen ZEC tauscht](/using-zcash/solswap) behandelt die Bildschirme von solswap ausführlicher. Verwende dafür nicht die eigene **Swap**-Schaltfläche von Phantom: Du hältst den Token bereits, und ein Tausch bringt dich nicht weiter.

Behalte etwas SOL in Phantom für die Solana-Gebühr.

### 1. Hinterlege dein ZEC auf solswap.org

1. Öffne Phantom, wechsle zum Browser-Tab, gib `solswap.org` selbst ein und verbinde deine Wallet.
2. Tippe auf **Deposit**. Setze **Asset** auf **Zcash**, **Network** auf **Solana** und die Methode auf **Wallet**.
3. Gib den Betrag ein (oder tippe auf **Max**) und genehmige die Transaktion in Phantom.

![solswap Deposit screen with Zcash as the asset, Solana as the network and Wallet as the method](https://raw.githubusercontent.com/ZecHub/zechub/main/site/Using_Zcash/assets/solana-zec-to-shielded/03-solswap-deposit.png)

Unsere Einzahlung landete um 15:09:08 (UTC+1) im Solana-Block, und solswap zeigte sie neun Sekunden später als **Completed** an.

![solswap deposit history showing Completed, +0.0026 ZEC](https://raw.githubusercontent.com/ZecHub/zechub/main/site/Using_Zcash/assets/solana-zec-to-shielded/04-solswap-deposit-complete.png)

Dein ZEC liegt nun in deinem NEAR Intents-Guthaben. Dein Phantom-Schlüssel autorisiert jede Bewegung daraus, NEAR Intents-Solver führen die Zustellung aus, und NEAR Intents kann für eine Compliance-Prüfung ein Guthaben zurückhalten (siehe die Vertrauenshinweise unten).

### 2. Sende es auf near.com an deine Zcash-Adresse

solswap hat ebenfalls eine **Withdraw**-Seite, doch sie funktionierte bei uns nicht. **Received amount** und **Fee** blieben bei „–“, und die Schaltfläche tat nichts, unabhängig davon, ob wir Zcash oder Solana als Netzwerk auswählten.

![solswap Withdraw form with the received amount and fee stuck at a dash](https://raw.githubusercontent.com/ZecHub/zechub/main/site/Using_Zcash/assets/solana-zec-to-shielded/05-solswap-withdraw-blank.png)

Wenn dir das passiert, steckt dein ZEC nicht fest. Das Guthaben ist an den Schlüssel deiner Wallet gebunden, nicht an die Website, daher kann jede NEAR Intents-App, bei der du dich mit dieser Wallet anmeldest, darauf zugreifen. Wir haben auf near.com abgeschlossen:

1. Gehe zu `near.com` und melde dich mit derselben Phantom-Wallet an.
2. Dein solswap-Guthaben erscheint unter **Move legacy assets** (near.com nennt Guthaben aus älteren NEAR Intents-Apps „legacy“). Tippe in der ZEC-Zeile auf **Withdraw**. Du brauchst **Move** nicht.

![near.com Move legacy assets page listing 0.0026 ZEC with Move and Withdraw buttons](https://raw.githubusercontent.com/ZecHub/zechub/main/site/Using_Zcash/assets/solana-zec-to-shielded/06-nearcom-legacy-assets.png)

3. Setze **Network** auf **Zcash**, füge die `u1`-Adresse deiner Wallet als **Recipient** ein und vergleiche die ersten und letzten sechs Zeichen mit deiner Wallet.

![near.com Withdraw legacy asset form with Zcash as the network and a u1 recipient, receive at least 0.00233164 ZEC, about 2 minutes](https://raw.githubusercontent.com/ZecHub/zechub/main/site/Using_Zcash/assets/solana-zec-to-shielded/07-nearcom-withdraw.png)

4. Tippe auf **Review withdrawal**, lies die Zusammenfassung und tippe auf **Send**.

![near.com Review send screen: network Zcash, recipient receives at least 0.00233164 ZEC, fee 0 ZEC, you pay 0.00266336 ZEC](https://raw.githubusercontent.com/ZecHub/zechub/main/site/Using_Zcash/assets/solana-zec-to-shielded/08-nearcom-review.png)

5. Phantom fordert dich auf, für near.com eine **Sign Message** auszuführen. Diese Signatur autorisiert NEAR Intents, dein Guthaben zu bewegen. Sie kostet kein SOL, ist aber deshalb nicht harmlos: Eine täuschend ähnliche Website kann dieselbe Anfrage zeigen und damit dein NEAR Intents-Guthaben leeren. Prüfe vor dem Tippen auf **Confirm** alles Folgende und tippe auf **Cancel**, falls auch nur ein Punkt nicht stimmt:
   - Die in der Anfrage genannte Website ist `near.com`. (Die Einzahlung in Schritt 1 war eine gewöhnliche Phantom-Transaktionsanfrage von `solswap.org`; prüfe dort den Namen auf dieselbe Weise.)
   - Öffne **Message** und suche nach `"verifying_contract": "intents.near"`.
   - Die Nachricht ist lesbarer Text wie im Screenshot. Wenn sie ein unlesbarer Datenblock ist oder die Website nicht mit der in deiner Adressleiste übereinstimmt, lehne sie ab.
   - Es wird niemals nach deiner Seed-Phrase gefragt. Beim Signieren musst du sie nie eingeben.

![Phantom Sign Message request from near.com on the Solana network](https://raw.githubusercontent.com/ZecHub/zechub/main/site/Using_Zcash/assets/solana-zec-to-shielded/09-phantom-sign-message.png)

6. near.com zeigt **Processing send**, **Sending** und **Complete** an. **View on explorer** öffnet den NEAR Intents-Eintrag der Übertragung.

![near.com status screen: Sending 0.0023 ZEC, all three steps complete](https://raw.githubusercontent.com/ZecHub/zechub/main/site/Using_Zcash/assets/solana-zec-to-shielded/10-nearcom-complete.png)

![NEAR Intents explorer record: created 3:59:28 PM, withdrawn to the u1 address 4:07:55 PM, with the Zcash withdraw transaction ID](https://raw.githubusercontent.com/ZecHub/zechub/main/site/Using_Zcash/assets/solana-zec-to-shielded/11-intents-explorer.png)

### Was unser Test kostete und wie lange er dauerte

| | Unser Test |
|---|---|
| ZEC von Phantom eingezahlt | 0.00266336 ZEC |
| ZEC in der Zcash-Wallet empfangen | 0.00241336 ZEC, abgeschirmt |
| Kosten auf der ZEC-Seite | 0.00025 ZEC (near.com zeigte „Fee 0 ZEC“; die Kosten sind im Angebot eingepreist) |
| Für die Einzahlung ausgegebenes SOL | 0.00156844 SOL, davon 0.00008 SOL Netzwerkgebühr |
| Minimum | Keines erreicht. solswap führte eine Mindesteinzahlung von 0.00000001 ZEC auf, und near.com akzeptierte 0.0026 ZEC |
| Einzahlung, Phantom zu solswap | 9 Sekunden |
| Auszahlung, von der Signatur auf near.com bis zu ZEC in der Zcash-Wallet | Etwa 8 Minuten (near.com schätzte etwa 2) |

Aufzeichnungen: Solana-Einzahlung [5ijsgRrh…AjLkx](https://solscan.io/tx/5ijsgRrhViNTtFMmnsfJDSo3HhRmt3Ri7WB513oBoQLxfGNswDxvHnakwW1yyqXznTTCSxnUkooAHDKowz9AjLkx), NEAR Intents [79c23cfd…a405a9](https://explorer.near-intents.org/transactions/79c23cfd43928de5522c182e26f8f052dc9c43d53430ca497b40e016a6a405a9), Zcash [28d6da27…481034](https://mainnet.zcashexplorer.app/transactions/28d6da27d74dc91e45175a7aff6023bc85578603dd77f1b49782a28f8f481034) in Block 3,498,141. Gebühren und Zeiten ändern sich mit der Netzwerkauslastung, daher ist der Überprüfungsbildschirm maßgeblich, wenn du es selbst machst.

Die Bridge von NEAR veröffentlicht ein Minimum von 0.01 ZEC und eine Gebühr von 0.00047 ZEC für ihre standardmäßigen Zcash-Auszahlungen. near.com wandte keines von beidem auf unsere 0.0026 ZEC an. Falls eine App einen kleinen Betrag ablehnt, versuche near.com, bevor du aufstockst.

### Andere Routen und worauf jede vertraut

Jede Route aus Solana heraus vertraut dem OmniBridge, weil die Bridge das ZEC hält, das deinen Token deckt. Darüber hinaus:

- **Die oben beschriebene Route** vertraut NEAR Intents. Deine Signatur autorisiert die Übertragung, Solver liefern das ZEC auf der Zcash-Seite aus, und NEAR Intents kann Mittel für eine Compliance-Prüfung zurückhalten; 2026 hat ein Zcash-Inhaber [einen großen, wochenlang zurückgehaltenen Tausch gemeldet](https://www.cryptotimes.io/2026/09/11/zcash-holder-says-589k-usdt-stuck-on-near-intents-50-days-after-zodl-swap/). Außerdem verbindest du deine Wallet mit zwei Websites, prüfe also jedes Mal die Adressleiste.
- **Wallets mit integriertem NEAR Intents** (suche nach der Funktion NEAR Intents im [Verzeichnis](/wallets)) verwenden dasselbe System innerhalb der Zcash-Wallet. Gleiches Vertrauen, weniger Websites. Wir haben dies mit ZEC auf Solana nicht getestet.
- **Eine Börse**, aber nur, wenn sie Einzahlungen dieses Tokens im Solana-Netzwerk akzeptiert, was die meisten nicht tun. Du gibst die Verwahrung und gewöhnlich auch deine Identität ab, und viele Börsen senden ZEC nur an `t1`-Adressen. Siehe [verwahrende Börsen](/using-zcash/custodial-exchanges).

---

## Schirme es ab und prüfe es

Es kam abgeschirmt an. Unser ZEC ging an eine `u1`-Adresse und landete direkt im abgeschirmten Ironwood-Pool. Es gab keinen transparenten Schritt und nichts, was man manuell abschirmen musste. Die Wallet führte es um 16:07 (UTC+1) mit einem Schildsymbol als **Receiving…** auf, während sie Bestätigungen sammelte.

![Zcash wallet activity showing Receiving 0.00241336 ZEC with a shield icon](https://raw.githubusercontent.com/ZecHub/zechub/main/site/Using_Zcash/assets/solana-zec-to-shielded/12-zodl-receiving.png)

Um es selbst zu prüfen, öffne die Transaktion in deiner Wallet und kopiere die Transaktions-ID.

![Zcash wallet transaction details with the transaction ID and timestamp](https://raw.githubusercontent.com/ZecHub/zechub/main/site/Using_Zcash/assets/solana-zec-to-shielded/13-zodl-tx-details.png)

Füge sie in [den Zcash-Block-Explorer](https://mainnet.zcashexplorer.app) ein. Lass dich nicht von der Zusammenfassung irritieren. Bei uns steht **Shielded Inputs / Outputs 0 / 0** und **Transferred from/to shielded pool 0.0 ZEC**, weil die Zusammenfassung des Explorers Ironwood noch nicht zählt. Die sichtbaren `t1`-Adressen befinden sich auf der Senderseite (das ZEC, das er ausgegeben hat, und das Wechselgeld, das er behielt), nicht auf deiner.

![Explorer summary for the transaction: two transparent inputs, one transparent output, 0/0 shielded](https://raw.githubusercontent.com/ZecHub/zechub/main/site/Using_Zcash/assets/solana-zec-to-shielded/14-explorer-summary.png)

Klicke auf **Raw TX: JSON** und suche nach `ironwood`. Ein negatives `valueBalance` dort bedeutet, dass ZEC in den Ironwood-Pool eingeht. Bei uns war es `-0.00241336`, genau der Betrag, der ankam, und nichts in der Transaktion zeigt, wer ihn erhielt.

![Raw transaction JSON with the ironwood section highlighted: valueBalance -0.00241336 (highlight added)](https://raw.githubusercontent.com/ZecHub/zechub/main/site/Using_Zcash/assets/solana-zec-to-shielded/15-explorer-raw-ironwood.png)

[Was ein Block-Explorer sehen kann](/zcash-tech/what-a-block-explorer-can-see) erklärt die übrigen Felder.

### Wenn du eine `t1`-Adresse einfügst

Wir haben nicht an eine solche Adresse gesendet, aber das Ergebnis ist vorhersehbar. Das ZEC kommt im transparenten Guthaben deiner Wallet an, und der Explorer zeigt jedem dauerhaft deine `t1`-Adresse und den Betrag. Eine Wallet mit automatischer Abschirmung verschiebt es dann in den abgeschirmten Pool; andernfalls tippe auf **Shield**, was eine kleine Netzwerkgebühr kostet. Auch die Abschirmungstransaktion ist öffentlich, da sie von deiner `t1`-Adresse ausgibt. Nichts geht verloren, aber die Verbindung zwischen dieser Einzahlung und deiner Wallet bleibt auf der Chain. Füge die `u1` ein.

---

## Bleib sicher

Neue Inhaber werden gezielt angesprochen. Fast jeder Betrug, den du sehen wirst, gehört zu einer dieser Kategorien:

- **Falscher Adresstyp.** Eine Zcash-Adresse beginnt mit `u1`, `t1`, `zs` oder `tex1`. Eine Solana-Adresse hat keines dieser Präfixe. Sende niemals natives ZEC an eine Solana-Adresse und niemals den Solana-Token an eine Zcash-Adresse.
- **Dienste, die nur transparente Adressen unterstützen.** Manche Bridges, Tauschseiten und Börsen können nur an `t1`-Adressen senden. Das ist machbar, wenn du das ZEC abschirmst, sobald es ankommt. Lass es dort nur nicht liegen.
- **Gefälschte Wallets.** Installiere nur über den Link auf der [Wallet-Verzeichniskarte](/wallets) oder über den offiziellen App-Store-Eintrag, auf den sie verweist. Gefälschte Krypto-Wallet-Apps gelangen durchaus in App Stores und sehen genau wie die echten aus.
- **Seed-Phrase-Phishing.** Keine Wallet, Bridge, Tauschseite, Support-Person, Moderation oder Airdrop braucht jemals deine Seed-Phrase. Beim Signieren einer Nachricht musst du sie nie eingeben. Wer danach fragt, versucht dich zu bestehlen. [Guthaben wiederherstellen](/using-zcash/recovering-funds) behandelt die Variante dieses Betrugs mit „Wir werden deine Wallet wiederherstellen“.
- **Betrugs-Token und „Claim“-Websites.** Token mit den Namen ZEC, Zcash oder einem ähnlichen Namen erscheinen unaufgefordert in Solana-Wallets, oft mit einem Link, um mehr zu „claimen“. Wenn du deine Wallet mit diesem Link verbindest, kann sie geleert werden. Prüfe die Vertragsadresse am Anfang dieser Seite und ignoriere alles andere.
- **Bösartige Signaturanfragen.** Eine „Sign Message“-Anfrage kann dein NEAR Intents-Guthaben ohne SOL-Gebühr bewegen. Signiere nur auf `near.com` oder `solswap.org` und nur, wenn die Nachricht `intents.near` nennt (Schritt 5 oben zeigt, was zu prüfen ist).
- **Täuschend ähnliche Websites.** Gib `solswap.org` und `near.com` selbst ein oder verwende Lesezeichen. Folge keinen Links aus Direktnachrichten, Antworten oder Anzeigen.

---

## Was du mit abgeschirmtem ZEC tun kannst

- Halte es beim Ausgeben privat: [ZEC privat verwenden](/guides/using-zec-privately)
- Finde Orte, die es akzeptieren: [Orte zum Ausgeben von ZEC](/using-zcash/spend-zcash/top-10-places-to-spend-zec)
- Sende es mit einer angehängten privaten Nachricht: [Memos](/using-zcash/memos)
- Bezahle jemanden, ohne deine Identität zu verknüpfen: [Geld senden, ohne die Identität zu verknüpfen](/zcash-use-cases/send-money-without-linking-identity)
