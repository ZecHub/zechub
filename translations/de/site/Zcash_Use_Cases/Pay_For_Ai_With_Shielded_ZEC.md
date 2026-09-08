# <img src="/content-images/programmer-software-engineer-coder-softw-bce5a0cb5b.svg" width="24" height="24" alt="developer icon"/> Bezahle privat für KI-Dienste mit Shielded ZEC

<span className="inline-flex items-center gap-[6px]">
  <span className="inline-block w-[12px] h-[12px] bg-green-500 rounded-full"></span>
  Anfänger - 10 Min.
</span>


## Kurzfassung

- **NanoGPT** akzeptiert Shielded ZEC direkt, ohne Konto und ohne E-Mail
- Die Mindestaufladung beträgt **$0.10**, sodass du es für Kleingeld testen kannst
- Das Guthaben ist nach etwa **30 Sekunden** da, bei der ersten Bestätigung
- Für Dienste, die kein ZEC akzeptieren, nutze **CrossPay**, um Shielded ZEC auszugeben und sie in USDC bezahlen zu lassen
- Was letztlich on-chain landet, hängt davon ab, **in welchem Pool sich dein ZEC befindet**, und der Bildschirm sagt dir das nie

<br/>

## <img src="/content-images/user-svgrepo-com-21adf62b7c.svg" width="24" height="24" className="inline-block align-middle mr-1 p-[2px]" alt="user icon"/> Für wen ist das?

- Alle, die kein KI-Abo möchten, das mit ihrem Namen verknüpft ist
- Entwickler, die Inferenz ohne Firmenkreditkarte bezahlen
- Menschen in Ländern, in denen Kartenzahlungen an KI-Dienste scheitern
- Alle, die lieber keine E-Mail-Adresse angeben möchten, nur um ein Modell auszuprobieren

<br/>

## <img src="/content-images/warning-error-svgrepo-com-b7ea8a50da.svg" width="24" height="24" className="inline-block align-middle mr-1 p-[2px]" alt="warning icon"/> Das Problem

KI zu bezahlen bedeutet normalerweise: eine Karte, eine E-Mail und ein Konto. Dadurch wird jeder Prompt, den du schreibst, mit deiner rechtlichen Identität verknüpft, und auch der Zahlungsabwickler sieht das.

Krypto soll dieses Problem lösen, aber die meisten Anleitungen sind veraltet. Dienste ändern, was sie akzeptieren, und eine Schritt-für-Schritt-Anleitung von vor einem Jahr schickt dich auf einen Weg, der heute nicht mehr funktioniert.

<br/>

## <img src="/content-images/icons8-lock-2f8e221321.svg" width="24" height="24" className="inline-block align-middle mr-1 p-[2px]" alt="lock icon"/> Warum Zcash?

Eine Shielded-Zahlung verbirgt den Absender, den Empfänger und den Betrag. Der Dienst wird bezahlt, und niemand, der die Chain beobachtet, erfährt, wer bezahlt hat oder wie viel.

Das gilt nur, wenn du **aus** Shielded-Guthaben bezahlst. Diese Seite sagt genau, wann das zutrifft und wann nicht.

<br/>

## <img src="/content-images/icons8-toolbox-9bebbb1619.svg" width="24" height="24" className="inline-block align-middle mr-1 p-[2px]" alt="toolbox icon"/> Was du brauchst

- ZEC in einem **shielded** Guthaben
- Eine Wallet, die an eine Unified Address senden kann. Diese Anleitung verwendet **Noir Wallet**, eine Browser-Erweiterung, damit der gesamte Ablauf in einem Fenster bleibt. Zkool und Zodl funktionieren auf die gleiche Weise
- Etwa $1, um mitzumachen

> **Du kommst von einer Börse?** Die meisten Börsen, einschließlich Binance, zahlen ZEC nur an **transparente** Adressen aus, und sie akzeptieren keine `u1...`-Adresse als Ziel. Zahle zuerst an deine eigene transparente Adresse aus, schilde es in deiner Wallet ab und bezahle dann aus dem Shielded-Guthaben.

<br/>

## <img src="/content-images/ladder-svgrepo-com-7232bf46ed.svg" width="24" height="24" className="inline-block align-middle mr-1 p-[2px]" alt="step icon"/> Weg 1: Bezahle NanoGPT direkt

[NanoGPT](https://nano-gpt.com/) bietet dir mehr als 200 Modelle, darunter GPT, Claude, Gemini und Bildmodelle, und akzeptiert ZEC nativ.

### Schritt 1: Öffne es. Es gibt keine Registrierung

Gehe zu nano-gpt.com und beginne, es zu nutzen. Jede Sitzung ist standardmäßig anonym, und die App sagt das selbst: *"You are already using NanoGPT privately."* Es gibt kein Konto, das du anlegen musst, und keine E-Mail, die du angeben musst.

### Schritt 2: Speichere zuerst ein Anmelde-Token

Bevor du Geld einzahlst, öffne **Settings** und erstelle ein Anmelde-Token, dann speichere es an einem sicheren Ort.

> **Dieser Schritt schützt dein Geld.** Ein anonymes Guthaben liegt in den lokalen Daten deines Browsers. Wenn du deine Cookies ohne ein gespeichertes Token löschst, ist das Guthaben weg, und es gibt kein Konto, über das du es wiederherstellen könntest. Mache das vor der Einzahlung, nicht danach.

### Schritt 3: Guthaben aufladen

Öffne **Balance**, wähle **Custom** und gib einen Betrag ein. Das Minimum ist **$0.10** und das Maximum $5,000. NanoGPT sagt dir, was du dafür bekommst, etwa 12 GPT 5.5-Prompts oder 18 Bilder für $1.

![NanoGPT-Bildschirm zum Aufladen des Guthabens mit dem benutzerdefinierten Betrag und dem Mindestbetrag von zehn Cent](/content-images/nanogpt-add-balance-acc74a4e6d.webp)

### Schritt 4: Zcash wählen

Wähle **Digital currencies** und dann **Zcash** aus dem Raster.

Du erhältst einen QR-Code, eine Zahlungsadresse und ein **transfer minimum** in ZEC für den von dir gewählten Betrag. Dieser Wert wird in dem Moment berechnet, in dem die Seite geladen wird.

![NanoGPT-Zcash-Einzahlungsbildschirm mit QR-Code, Unified Address und transfer minimum](/content-images/nanogpt-zec-deposit-bd1980d2f7.webp)

### Schritt 5: Aus deiner Wallet senden

Kopiere die Adresse in deine Wallet, gib den Betrag ein und sende. Die Netzwerkgebühr beträgt etwa **0.00015 ZEC**.

> **Sende etwas mehr als das Minimum.** Der Kurs wird beim Laden der Seite festgelegt, und ZEC bewegt sich, bevor deine Transaktion bestätigt wird. Das Senden von genau dem Mindestbetrag ergab im Test **$0.99** statt $1.00. Etwas mehr zu senden ergab $1.17 für denselben nominellen $1-Betrag, weil NanoGPT das gutschreibt, was du tatsächlich sendest.

![Sende-Bildschirm von Noir Wallet mit eingefügter NanoGPT-Adresse und angezeigter Netzwerkgebühr](/content-images/noir-send-6380a5f4ef.webp)

### Schritt 6: Etwa 30 Sekunden warten

Deine Wallet zeigt die Transaktion zunächst als ausstehend an und dann als bestätigt. NanoGPT schreibt das Guthaben bei der **ersten Bestätigung** gut, also musst du nicht auf alle drei warten.

![Wallet-Bestätigung mit dem gesendeten Betrag und dem Transaktions-Hash](/content-images/noir-sent-2d476e94b9.webp)

Das Guthaben erscheint und du kannst es sofort ausgeben.

![NanoGPT-Guthabenseite mit dem gutgeschriebenen Betrag und der Einzahlungshistorie](/content-images/nanogpt-balance-0b0c0c86ba.webp)

<br/>

## <img src="/content-images/send-svgrepo-com-b62f643de0.svg" width="24" height="24" className="inline-block align-middle mr-1 p-[2px]" alt="send icon"/> Weg 2: Dienste, die kein ZEC akzeptieren

Die meisten KI-Dienste akzeptieren kein ZEC. **Venice.ai** und **OpenRouter** akzeptieren stattdessen beide USDC, und bei OpenRouter kannst du auswählen, auf welcher Chain der Checkout abgewickelt wird.

Nutze dafür **CrossPay** in [Zodl](/zcash-organizations/zodl). Du gibst Shielded ZEC aus und der Empfänger wird in dem Asset bezahlt, das er verlangt hat, geleitet über NEAR Intents ohne zentralisierte Börse und ohne KYC.

1. Besorge dir die Zahlungsadresse des Dienstes sowie das Asset und die Chain, die er erwartet, zum Beispiel USDC auf Base
2. Öffne Zodl und wähle **CrossPay**
3. Gib diese Adresse ein, wähle das Asset, das der Dienst möchte, und gib den Betrag ein
4. Sende aus deinem Shielded-Guthaben

Dein ZEC verlässt den Shielded-Bereich. Der Dienst sieht eine normale eingehende USDC-Zahlung und erfährt nie, dass sie als ZEC begonnen hat.

> Das Swap-Bein ist auf der Ziel-Chain sichtbar, daher ist die USDC-Zahlung selbst genauso öffentlich wie jede andere USDC-Zahlung. Privat bleiben die Zcash-Seite und die Verbindung zwischen beiden.

<br/>

## <img src="/content-images/triangle-exclamation-7a4c4150be.svg" width="24" height="24" className="inline-block align-middle mr-1 p-[2px]" alt="warning icon"/> Was bei jedem Schritt offengelegt wird

Das ist der Teil, den die meisten Anleitungen auslassen.

| Was passiert | Was der Dienst erfährt | Was on-chain erscheint |
|---|---|---|
| Browsen und Prompts schreiben | Nichts. Kein Konto, keine E-Mail | Nichts |
| Es wird eine Einzahlungsadresse ausgegeben | Nichts | Nichts |
| Du bezahlst **aus Sapling** | Die Einzahlungsadresse, die du verwendet hast | Nichts. Shielded zu Shielded |
| Du bezahlst **aus Ironwood** | Dasselbe | **Der Betrag und die Blockhöhe** |
| Du bezahlst **von einer transparenten Adresse** | Dasselbe | Der Betrag und deine t-Adresse |
| Beliebiges der oben genannten | Deine IP, es sei denn, du verwendest Tor oder ein VPN | Nicht anwendbar |

### Warum der Pool wichtig ist

Die Einzahlungsadresse von NanoGPT ist eine Unified Address. Das Dekodieren einer im August 2026 ausgegebenen Adresse zeigt genau zwei Empfänger: **Sapling** und **Orchard**.

Seit das Upgrade [Ironwood](/zcash-tech/ironwood) am 28. Juli 2026 aktiviert wurde, ist Orchard nur noch zum Ausgeben da, und es kann kein neuer Wert mehr hineinfließen. Damit bleibt **Sapling als einziger Empfänger übrig, in dem eine Zahlung tatsächlich landen kann**.

Wenn sich dein ZEC also bereits in Sapling befindet, ist die Zahlung Sapling zu Sapling, und nichts daran ist öffentlich. Wenn du aber zu Ironwood migriert bist, verschiebt die Zahlung Wert über eine Pool-Grenze, und [the turnstile](/zcash-tech/the-turnstile) veröffentlicht den Betrag und die Höhe, obwohl Absender und Empfänger verborgen bleiben.

Die Bildschirme sehen in beiden Fällen identisch aus. Ein kleines Sapling-Guthaben für Zahlungen zu behalten, ist die einfachste Lösung.

<br/>

## <img src="/content-images/icons8-cancel-7f786be3c1.svg" width="24" height="24" className="inline-block align-middle mr-1 p-[2px]" alt="cancel icon"/> Häufige Fehler, die du vermeiden solltest

- Vor dem Speichern eines Anmelde-Tokens einzahlen und dann Cookies löschen
- Genau den Mindesttransferbetrag senden und einen Cent zu wenig ankommen lassen
- Versuchen, direkt von einer Börse an eine `u1...`-Adresse auszuzahlen
- Annehmen, dass die Zahlung privat ist, ohne zu prüfen, aus welchem Pool du ausgegeben hast
- Über eine normale Verbindung bezahlen, obwohl es gerade darum ging, nicht identifiziert zu werden

<br/>

## <img src="/content-images/checked-checkbox-svgrepo-com-7ea19022da.svg" width="28" height="28" className="inline-block align-middle mr-1 p-[2px]" alt="done icon"/> Ergebnis

Du kannst:

- Frontier-KI-Modelle ohne Konto, ohne E-Mail und ohne Karte nutzen
- In Shielded ZEC bezahlen und genau wissen, was das verbirgt und was nicht
- Über CrossPay Dienste erreichen, die noch nie von Zcash gehört haben

<br/>

## <img src="/content-images/chain-for-links-svgrepo-com-117ee0dec1.svg" width="24" height="24" className="inline-block align-middle mr-1 p-[2px]" alt="chain-links icon"/> Verwandt

- [Ironwood](/zcash-tech/ironwood) - warum sich geändert hat, in welchem Pool sich deine Mittel befinden
- [The Turnstile](/zcash-tech/the-turnstile) - was öffentlich wird, wenn Wert Pools überquert
- [Wallets](/using-zcash/wallets) - welche Wallets gepflegt werden
- [ZODL](/zcash-organizations/zodl) - die Wallet hinter CrossPay

<br/>

## <img src="/content-images/progress-arrows-svgrepo-com-aad76739e5.svg" width="24" height="24" className="inline-block align-middle mr-1 p-[2px]" alt="progress icon"/> Fortschritt

**Schritt 1 von 1**

Du hast einen KI-Dienst mit Shielded ZEC bezahlt und weißt, was dabei offengelegt wurde.

<br/>

## Nächster Schritt

- [Geld senden, ohne die Identität zu verknüpfen](/zcash-use-cases/send-money-without-linking-identity)

<br/>
