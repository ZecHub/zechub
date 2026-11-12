# <img src="/content-images/people-community-add-svgrepo-com-3c6ac75333.svg" width="24" height="24" alt="community icon"/> Starte eine ZEC-Spendenkampagne

<span className="inline-flex items-center gap-[6px]">
  <span className="inline-block w-[12px] h-[12px] bg-green-500 rounded-full"></span>
  Fortgeschritten – 10 Min.
</span>

## TL;DR

- Gib der Kampagne ein eigenes Wallet-Konto und eine Shielded-Adresse, damit sie nie mit anderen Mitteln vermischt wird.
- Teile einen Zahlungsanfrage-Link oder QR-Code mit einem vorgeschlagenen Betrag und bereits ausgefülltem Memo.
- Zeige den Fortschritt, ohne Spender offenzulegen: Veröffentliche die Gesamtsumme selbst oder gib einer vertrauenswürdigen Person einen Viewing Key.
- Ein Viewing Key gilt für das gesamte Konto, nicht nur für eine Adresse. Deshalb erhält die Kampagne ein eigenes Konto.
- Beende die Kampagne zum versprochenen Datum und veröffentliche, wie das Geld verwendet wurde.

<br/>

## <img src="/content-images/user-svgrepo-com-21adf62b7c.svg" width="24" height="24" className="inline-block align-middle mr-1 p-[2px]" alt="user icon"/> Für wen ist das?

- Community-Gruppen, Open-Source-Projekte und Kreative, die Geld für ein bestimmtes Ziel sammeln
- Gemeinnützige Organisationen, die in ZEC eine Spendenaktion zum Jahresende oder für Notfälle durchführen
- Alle, die möchten, dass Spender der Kampagne vertrauen können, ohne jede Spende öffentlich zu machen

Wenn du eine US-amerikanische gemeinnützige Organisation bist, lies zuerst [Private Spenden als US-Nonprofit annehmen](/zcash-use-cases/accept-private-donations-as-a-us-nonprofit), um Informationen zu Quittungen und IRS-Formularen zu erhalten.

<br/>

## <img src="/content-images/warning-error-svgrepo-com-b7ea8a50da.svg" width="24" height="24" className="inline-block align-middle mr-1 p-[2px]" alt="warning icon"/> Das Problem

Die meisten Krypto-Spendenaktionen verwenden eine transparente Adresse, damit Spender beobachten können, wie die Gesamtsumme wächst. Dadurch werden aber auch jede Spende, ihr Betrag, ihr Eingangszeitpunkt und der weitere Weg des Geldes sichtbar. Spender, die bewusst privat spenden, verlieren diese Privatsphäre, und nach der Kampagne kann jeder die Mittel nachverfolgen.

Eine vollständig private Kampagne hat das gegenteilige Problem: Spender können nicht sehen, ob das Ziel erreicht wurde oder wie das Geld ausgegeben wurde.

<br/>

## <img src="/content-images/icons8-lock-2f8e221321.svg" width="24" height="24" className="inline-block align-middle mr-1 p-[2px]" alt="lock icon"/> Warum Zcash?

Mit Shielded-ZEC bleibt jede Spende on-chain privat, und du entscheidest, was du zeigst: eine Gesamtsumme, einen Fortschrittsbalken oder schreibgeschützten Zugriff für eine prüfende Person. Spender können eine Nachricht im [Memo](/using-zcash/memos) hinterlassen, und du kannst ihnen danken, ohne dass jemand anderes sieht, wer gespendet hat.

<br/>

## <img src="/content-images/icons8-toolbox-9bebbb1619.svg" width="24" height="24" className="inline-block align-middle mr-1 p-[2px]" alt="toolbox icon"/> Was du brauchst

- Ein Shielded-[Wallet](/wallets), in dem du ein separates Konto erstellen kannst
- Eine Kampagnenseite: eine Website, ein Social-Media-Beitrag oder ein Foren-Thread
- Ein Ziel, ein Enddatum und einen Plan dafür, wie das Geld verwendet wird

<br/>

## <img src="/content-images/ladder-svgrepo-com-7232bf46ed.svg" width="24" height="24" className="inline-block align-middle mr-1 p-[2px]" alt="step icon"/> Schritt-für-Schritt-Anleitung

### Schritt 1: Ziel und Regeln festlegen

Schreibe vor dem Start Folgendes auf:
- Wie viel du sammelst und wofür es verwendet wird
- Das Enddatum
- Was passiert, wenn du mehr oder weniger als das Ziel sammelst
- Wer die Mittel kontrolliert und ob mehr als eine Person Ausgaben genehmigen muss (siehe [Eine private Community-Treasury betreiben](/zcash-use-cases/private-community-treasury))

Veröffentliche dies auf der Kampagnenseite. Spender vertrauen einer Kampagne, die von Anfang an sagt, was sie tun wird.

### Schritt 2: Ein separates Konto für die Kampagne erstellen

Erstelle in deinem Wallet ein neues Konto, das nur für diese Kampagne genutzt wird, und kopiere daraus eine Shielded-Adresse. Wenn du die Kampagne getrennt hältst, ist die Gesamtsumme leicht abzulesen. Das ist später auch wichtig, falls du einen Viewing Key teilst, denn ein Viewing Key zeigt die Aktivitäten des gesamten Kontos ([Viewing Keys](/zcash-tech/viewing-keys)).

### Schritt 3: Einen Zahlungsanfrage-Link und QR-Code erstellen

Ein [Zahlungsanfrage-URI](/using-zcash/payment-request-uris) ist ein `zcash:`-Link, der die Adresse, einen vorgeschlagenen Betrag und ein Memo für den Spender vorausfüllt. Verwende den ZecHub-[Generator für Zahlungsanfragen](/tools), um einen zu erstellen, und teile ihn anschließend als Link und QR-Code.

Ein Memo wie „Name der Kampagne, Antwort an: deine E-Mail-Adresse oder dein Handle“ hilft Spendern, die ein Dankeschön oder eine Quittung möchten. Weise auf der Seite darauf hin, dass das Memo optional ist.

### Schritt 4: Die Kampagnenseite veröffentlichen

Nimm Folgendes auf die Seite:
- Das Ziel, Enddatum und die Regeln aus Schritt 1
- Die Shielded-Adresse, den QR-Code und den Link
- Wie man aus einem Shielded Wallet spendet und wo man eines erhält
- Wie du über den Fortschritt berichtest (Schritt 5)

Hefte die Adresse an einer Stelle an und teile Spendern mit, dass sie sie nur von dort kopieren sollen.

### Schritt 5: Fortschritt berichten, ohne Spender offenzulegen

Wähle eine Option und gib auf der Seite an, welche:
- **Veröffentliche die Gesamtsumme selbst**, zum Beispiel einmal pro Woche, anhand des Wallet-Guthabens des Kampagnenkontos
- **Gib einer vertrauenswürdigen prüfenden Person einen Viewing Key**, etwa einem Vorstandsmitglied oder einem Community-Mitglied, das den Spendern bekannt ist und die Gesamtsumme öffentlich bestätigt. Ein Incoming Viewing Key zeigt eingegangene Spenden; ein vollständiger Viewing Key zeigt auch Ausgaben ([Viewing Keys](/zcash-tech/viewing-keys))

Veröffentliche keinen Viewing Key auf der Kampagnenseite. Jeder, der ihn besitzt, kann Betrag und Memo jeder Spende sehen, einschließlich der Kontaktdaten von Spendern.

### Schritt 6: Spendern danken

Antworte Spendern, die im Memo eine Kontaktmöglichkeit hinterlassen haben. Veröffentliche niemals den Namen oder Betrag eines Spenders, ohne ihn zuvor zu fragen.

### Schritt 7: Abschließen und berichten

Am Enddatum:
- Teile mit, dass die Kampagne geschlossen ist, und entferne oder aktualisiere die Adresse und den QR-Code.
- Veröffentliche die endgültige Gesamtsumme und wofür das Geld verwendet wurde.
- Falls du einen Viewing Key geteilt hast, bitte die prüfende Person, die endgültige Gesamtsumme und die Ausgaben zu bestätigen.

[Zahlungsoffenlegungen](/zcash-tech/payment-disclosures) könnten dir eines Tages ermöglichen, eine einzelne Zahlung ohne Viewing Key nachzuweisen, aber der Standard ist noch ein Entwurf. Verlass dich daher noch nicht darauf.

<br/>

## <img src="/content-images/icons8-cancel-7f786be3c1.svg" width="24" height="24" className="inline-block align-middle mr-1 p-[2px]" alt="cancel icon"/> Häufige Fehler, die du vermeiden solltest

- Die Kampagne über dein alltägliches Wallet-Konto durchführen
- Einen Viewing Key veröffentlichen, wodurch Betrag und Memo jedes Spenders offengelegt werden
- Eine transparente Adresse oder Einzahlungsadresse einer Börse verwenden, weil sich damit die Gesamtsumme leichter zeigen lässt
- Die Adresse nach Ende der Kampagne stehen lassen, sodass weiterhin Spenden ohne Plan für ihre Verwendung eingehen
- Nie darüber berichten, wie das Geld ausgegeben wurde

<br/>

## <img src="/content-images/checked-checkbox-svgrepo-com-7ea19022da.svg" width="28" height="28" className="inline-block align-middle mr-1 p-[2px]" alt="done icon"/> Ergebnis

Du kannst:
- ZEC für ein klares Ziel sammeln, während jede Spende on-chain privat bleibt
- Fortschritt zeigen, dem Spender vertrauen können
- Die Kampagne mit einem öffentlichen Bericht abschließen, ohne Spender offenzulegen

<br/>

## <img src="/content-images/chain-for-links-svgrepo-com-117ee0dec1.svg" width="24" height="24" className="inline-block align-middle mr-1 p-[2px]" alt="chain-links icon"/> Verwandte Themen

- [Spenden privat empfangen](/zcash-use-cases/receive-donations-privately) - fortlaufende Spenden ohne Kampagne
- [Eine private Community-Treasury betreiben](/zcash-use-cases/private-community-treasury) - Rollen und Genehmigungen für gemeinsame Mittel
- [Zahlungsanfrage-URIs](/using-zcash/payment-request-uris) - Links und QR-Codes mit ausgefülltem Betrag und Memo
- [Viewing Keys](/zcash-tech/viewing-keys) - schreibgeschützter Zugriff für eine prüfende Person
- [Wo man an ZEC spenden kann](/zcash-use-cases/where-to-donate-zec) - gemeinnützige Organisationen, die ZEC bereits akzeptieren

<br/>

## Nächster Schritt

- [Private Spenden als US-Nonprofit annehmen](/zcash-use-cases/accept-private-donations-as-a-us-nonprofit)

<br/>

Wenn du neu bist, beginne hier: [Was ist Zcash?](/start-here/what-is-zec-and-zcash)
