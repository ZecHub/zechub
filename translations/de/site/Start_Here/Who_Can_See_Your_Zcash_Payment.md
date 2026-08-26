<a href="https://github.com/zechub/zechub/edit/main/site/Start_Here/Who_Can_See_Your_Zcash_Payment.md" target="_blank">
  <img src="https://img.shields.io/badge/Edit-blue" alt="Edit Page"/>
</a>

# Wer kann deine Zcash-Zahlung sehen?

## Kurzfassung

- Zcash gibt dir **zwei Arten von Adressen**: transparente (`t`) und abgeschirmte (`z` oder `u`).
- Wie viel die Öffentlichkeit sieht, hängt davon ab, zwischen welchen Arten sich deine Zahlung bewegt.
- Nur eine Zahlung **von abgeschirmt zu abgeschirmt** verbirgt den Sender, den Empfänger und den Betrag.
- Eine abgeschirmte Adresse ist nicht nur ein Schlüssel. Sie ist eine kleine Menge von Schlüsseln, und du kannst **Lesezugriff vergeben, ohne die Möglichkeit zum Ausgeben preiszugeben**.
- Ein Viewing Key **kann nicht zurückgenommen werden**, nachdem du ihn geteilt hast.

---

## Das Wichtigste zuerst

Bei den meisten Blockchains gibt es keine Wahl. Alles, was du sendest, ist für immer öffentlich, für jeden, der hinschaut.

Zcash gibt dir stattdessen eine Wahl. Diese Wahl wird zweimal getroffen: **einmal, wenn du auswählst, an welche Adresse du sendest, und einmal, wenn du entscheidest, wer einen Schlüssel erhält, um deinen Verlauf zu lesen.**

Das Bild unten deckt beides ab.

![Zcash-Schlüsseltypen und was ein Block-Explorer bei jedem der vier Transaktionspfade sehen kann](https://raw.githubusercontent.com/ZecHub/zechub/main/site/Start_Here/assets/who-can-see-your-zcash-payment.png)

---

## Erste Entscheidung: welche Adresse

Jede Zcash-Zahlung bewegt sich zwischen zwei Adressen, und jede davon kann transparent oder abgeschirmt sein. Daraus ergeben sich vier Pfade, und jeder davon gibt unterschiedlich viel preis.

Das Muster ist einfacher, als es aussieht: **Alles, was eine transparente Adresse berührt, wird öffentlich.** Eine Zahlung, die vollständig innerhalb des abgeschirmten Pools bleibt, offenbart nichts außer der Gebühr.

Das ist besonders wichtig, wenn du von einer Börse abhebst. Viele Börsen senden nur an transparente Adressen, daher ist die Auszahlung öffentlich. Schirme die Mittel selbst ab, sobald sie angekommen sind, bevor du sie ausgibst.

Für einen tieferen Einblick in das, was ein Explorer genau ausliest, siehe [Was ein Block-Explorer sehen kann](/zcash-tech/what-a-block-explorer-can-see).

---

## Zweite Entscheidung: wer einen Schlüssel bekommt

Privatsphäre, die man niemals aufheben kann, ist nicht nützlich. Manchmal musst du einem Buchhalter, einem Prüfer oder einer Steuerbehörde etwas nachweisen. Zcash ermöglicht das, ohne dass du die Kontrolle aufgeben musst.

**Spending Key.** Sieht alles und bewegt Gelder. Das ist das Geld. Er bleibt bei dir und wird aus keinem Grund jemals mit anderen geteilt.

**Full Viewing Key.** Nur lesend. Zeigt eingehende und ausgehende Aktivitäten sowie Guthaben, kann aber keinen einzigen zatoshi ausgeben. Das ist der Schlüssel, den du einem Prüfer oder Buchhalter gibst.

**Incoming Viewing Key.** Noch eingeschränkter: Er zeigt nur eingehende Zahlungen. Eine Börse oder ein Händler kann damit bestätigen, dass deine Einzahlung angekommen ist, während der Spending Key auf Hardware bleibt, die niemals das Internet berührt.

Die Reihenfolge ist wichtig. Gib den engstmöglichen Schlüssel weiter, der die Aufgabe erfüllt, nicht den weitestgehenden, den du gerade zur Hand hast.

---

## Der Punkt, den Anfänger übersehen

**Ein Viewing Key kann nicht widerrufen werden.** Es gibt keinen Knopf zum "Teilen rückgängig machen". Sobald jemand ihn hat, kann diese Person diese Adresse lesen, solange sie existiert. Wenn du den Zugriff beenden musst, verschiebst du deine Mittel auf eine neue Adresse.

**Gebühren sind selbst bei einer vollständig abgeschirmten Zahlung öffentlich.** Der Betrag ist verborgen, die Gebühr nicht.

**Öffentlich ist dauerhaft.** Alles, was die Chain heute zeigt, zeigt sie auch in zwanzig Jahren. Sich erst *nachdem* du eine Zahlung gesendet hast dafür zu entscheiden, sie abzuschirmen, ist nichts, was du tun kannst.

---

## Setze es in die Praxis um

- Verwende ein Wallet, das standardmäßig abschirmt, wie [Zodl](https://zodl.com) oder [Ywallet](https://ywallet.app/).
- Schirme Mittel ab, sobald sie von einer Börse eintreffen, bevor du sie ausgibst.
- Bezahle an abgeschirmte Adressen, wann immer der Empfänger eine unterstützt.
- Bevor du einen Viewing Key teilst, frage dich, welcher Schlüssel der kleinste ist, der die gestellte Frage beantwortet.

---

## Ressourcen

- [Viewing Keys erklärt (Electric Coin Company)](https://electriccoin.co/blog/explaining-viewing-keys/)
- [Selektive Offenlegung und Viewing Keys (Electric Coin Company)](https://electriccoin.co/blog/viewing-keys-selective-disclosure/)
- [ZIP 310: Viewing Keys](https://zips.z.cash/zip-0310)
- [Wie die Zcash-Technologie funktioniert](https://z.cash/technology/)

## Verwandte Seiten

- [Zcash-Grundlagen](/start-here/what-is-zec-and-zcash)
- [Zcash-Leitfaden für neue Nutzer](/start-here/new-user-guide)
- [Was ein Block-Explorer sehen kann](/zcash-tech/what-a-block-explorer-can-see)
- [Viewing Keys](/zcash-tech/viewing-keys)
- [Transaktionen](/using-zcash/transactions)

---

*Wenn du Ergänzungen oder Änderungsvorschläge für diese Wiki-Seite machen möchtest, gehe bitte zum [ZecHub GitHub-Repo](https://github.com/ZecHub/zechub) und reiche einen Pull Request ein.*
