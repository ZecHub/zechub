# <img src="/content-images/icons8-lock-2f8e221321.svg" width="24" height="24" alt="lock icon"/> Mit Zcash anmelden

<span className="inline-flex items-center gap-[6px]"><span className="inline-block w-[12px] h-[12px] bg-green-500 rounded-full"></span>Fortgeschrittene - 7 Min.</span>

## TL;DR

- Anmelden, indem du nachweist, dass du eine Zcash-Adresse kontrollierst, statt ein Passwort zu verwenden
- Es werden zwei Designs genutzt: **eine Challenge signieren** oder **eine abgeschirmte Zahlung mit einem Code im Memo senden**
- Weil abgeschirmte Adressen Guthaben und Verlauf verbergen, legt der Nachweis der Kontrolle deine Finanzen nicht offen
- Das Muster steckt noch in den Anfängen. Es gibt noch keinen ratifizierten Standard, und Implementierungen sind nicht interoperabel

<br/>

## <img src="/content-images/user-svgrepo-com-21adf62b7c.svg" width="24" height="24" className="inline-block align-middle mr-1 p-[2px]" alt="user icon"/> Für wen ist das?

- Entwickler, die passwortlose Anmeldung wollen, ohne persönliche Daten zu sammeln
- Nutzer, die lieber nicht jeder Website ihre E-Mail-Adresse geben möchten
- Alle, die sich anmelden möchten, ohne ihren Finanzverlauf mit einem Konto zu verknüpfen

<br/>

## <img src="/content-images/warning-error-svgrepo-com-b7ea8a50da.svg" width="24" height="24" className="inline-block align-middle mr-1 p-[2px]" alt="warning icon"/> Das Problem

Die meisten Anmeldeoptionen geben etwas preis:

- **Passwörter und E-Mail** erstellen ein Konto, das an deine Identität gebunden ist, und beides landet am Ende in Datenlecks
- **Social Sign-in** verrät dem Identitätsanbieter, wo und wann du dich überall anmeldest
- **Wallet-Anmeldung auf transparenten Chains** ist schlimmer, als es aussieht. Das Verbinden einer Wallet kann der Website dein gesamtes Guthaben und deinen Transaktionsverlauf offenlegen – dauerhaft

Normalerweise entscheidest du dich zwischen Bequemlichkeit und Offenlegung.

<br/>

## <img src="/content-images/celebration-spark-svgrepo-com-bc98dec7c1.svg" width="24" height="24" className="inline-block align-middle mr-1 p-[2px]" alt="spark icon"/> Warum Zcash?

Zcash trennt *Kontrolle nachweisen* von *Finanzen offenlegen*:

- **Abgeschirmte Adressen** halten Guthaben und Transaktionsverlauf privat, daher sagt der Nachweis, dass du eine besitzt, nichts darüber aus, was du besitzt
- **Verschlüsselte Memos** können privat einen einmaligen Login-Code innerhalb einer Transaktion transportieren
- **Viewing Keys** erlauben selektive Offenlegung, sodass einer App genau der Lesezugriff gegeben werden kann, den sie braucht – und nicht mehr

<br/>

## <img src="/content-images/ladder-svgrepo-com-7232bf46ed.svg" width="24" height="24" className="inline-block align-middle mr-1 p-[2px]" alt="step icon"/> So funktioniert es

Es haben sich zwei Ansätze herausgebildet. Beide enden damit, dass die App einen stabilen Identifikator für dich hat und kein Passwort.

### Ansatz 1: Eine Challenge signieren

1. Die App erzeugt eine zufällige Challenge zur einmaligen Verwendung
2. Deine Wallet signiert diese Challenge mit dem Schlüssel hinter deiner Adresse
3. Die App verifiziert die Signatur und meldet dich an

Es wird nichts übertragen, daher gibt es keine Gebühr und kein Warten auf einen Block. Die relevante Spezifikation ist [ZIP 304, Sapling Address Signatures](https://zips.z.cash/zip-0304), die noch ein Entwurf ist, daher variiert die Unterstützung für Nachrichtensignaturen zwischen Wallets.

### Ansatz 2: Es mit einer abgeschirmten Zahlung nachweisen

1. Die App erzeugt einen einmaligen Code und zeigt eine Zahlungsanforderung an
2. Du sendest eine kleine abgeschirmte Transaktion mit diesem Code im Memo
3. Die App überwacht auf das Memo, gleicht den Code ab und meldet dich an

Das funktioniert mit Wallets, die Memos heute bereits unterstützen, und das sind die meisten. Der Nachteil ist, dass eine Netzwerkgebühr anfällt und du auf die Bestätigung wartest.

### Die Adresse privat halten

Eine App muss deine Adresse nicht speichern, um dich wiederzuerkennen. Manche Implementierungen hashen sie zusammen mit einem anwendungsspezifischen Wert, sodass jede Website für denselben Nutzer einen anderen, stabilen Identifikator sieht. Das verhindert, dass Websites Informationen abgleichen, um deine Konten miteinander zu verknüpfen.

<br/>

## <img src="/content-images/icons8-toolbox-9bebbb1619.svg" width="24" height="24" className="inline-block align-middle mr-1 p-[2px]" alt="toolbox icon"/> Abwägungen

Das solltest du verstehen, bevor du darauf aufbaust oder dich darauf verlässt.

| | Signierte Challenge | Abgeschirmte Zahlung |
|---|---|---|
| Kosten | Kostenlos | Netzwerkgebühr pro Anmeldung |
| Geschwindigkeit | Sofort | Wartet auf Bestätigung |
| Wallet-Unterstützung | Begrenzt, ZIP 304 ist ein Entwurf | Breit, braucht nur Memos |
| Hinterlässt einen Chain-Eintrag | Nein | Ja, es existiert eine Transaktion |

Gemeinsame Einschränkungen:

- **Standardmäßig keine Kontowiederherstellung.** Den Schlüssel zu verlieren bedeutet, das Konto zu verlieren, außer die App entwirft einen Wiederherstellungsweg
- **Adresswiederverwendung kann dich verknüpfen.** Dieselbe Adresse auf vielen Websites zu verwenden, erzeugt das Tracking-Problem erneut, weshalb anwendungsspezifische Identifikatoren wichtig sind
- **Kein ratifizierter Standard.** Jedes Projekt hat sein eigenes Schema, daher funktioniert eine für das eine gebaute Anmeldung nicht mit einem anderen
- **Keine Anonymität für sich allein.** Es verbirgt deine Finanzen vor der App, aber die App kann trotzdem profilieren, was du tust, sobald du drin bist

<br/>

## <img src="/content-images/icons8-cancel-7f786be3c1.svg" width="24" height="24" className="inline-block align-middle mr-1 p-[2px]" alt="cancel icon"/> Häufige Fehler, die du vermeiden solltest

- Einen Challenge-Code wiederverwenden. Jeder Code sollte nur einmal nutzbar sein und schnell ablaufen, sonst kann ein abgefangener Code erneut verwendet werden
- Nutzer bitten, zum Anmelden einen nennenswerten Betrag zu senden. Die Zahlung ist ein Nachweis, daher sollte der Betrag unbedeutend sein
- Die rohe Adresse speichern, wenn ein anwendungsspezifischer Identifikator denselben Zweck erfüllt
- Davon ausgehen, dass Nachrichtensignaturen überall funktionieren. Prüfe die Wallets, die deine Nutzer tatsächlich haben
- Ein Memo im Nachhinein als geheim behandeln. Es beweist, dass der Absender gehandelt hat; es ist kein Passwort

<br/>

## <img src="/content-images/checked-checkbox-svgrepo-com-7ea19022da.svg" width="28" height="28" className="inline-block align-middle mr-1 p-[2px]" alt="done icon"/> Projekte, die dies erkunden

Diese wurden für den **Zcash Login**-Track von [ZecHub Hackathon 3.0](https://zechub.wiki/hackathon) gebaut. Es sind eher Experimente als fertige Produkte, und sie zeigen, wie unterschiedlich dieselbe Idee umgesetzt werden kann.

- **ZecAuth** - ein Wallet-Verbindungsprotokoll für Zcash, im Geiste dessen, was WalletConnect anderswo macht. Die App zeigt einen QR-Code oder einen `zecauth://`-Link, der eine Challenge plus die angeforderten Fähigkeiten enthält, etwa Anmeldung, Zahlungsanforderungen oder Viewing-Zugriff. Keine Transaktion, keine Gebühr, keine Chain-Interaktion. Es liefert neben dem Code auch eine schriftliche Protokollspezifikation
- **ZShield** - verwandelt eine abgeschirmte Adresse in eine W3C DID und eine OpenID-Connect-Identität. Der Browser erzeugt ein Schlüsselpaar, der Server stellt über eine Schnittstelle im Stil von ZIP 304 eine Nonce aus, die Wallet signiert sie, und der Server gibt ein JWT zurück. Weil das Ergebnis OIDC-kompatibel ist, können bestehende Apps es ohne maßgeschneiderte Integration verwenden
- **ZecPass** - weist Besitz über ein signiertes Memo nach und ist so gebaut, dass die App die Adresse des Nutzers überhaupt nicht erfährt. Es leitet einen anwendungsbezogenen Hash ab, der als stabiler Identifikator dient, hält Challenges einmalig und zeitlich begrenzt und liefert einen direkt einsetzbaren React-Button mit einer Knoten-Verifizierungsbibliothek
- **Portal** - Anmeldung durch Senden einer abgeschirmten Transaktion mit einem einmaligen Code im Memo, läuft auf Mainnet. Derselbe Ablauf wird wiederverwendet, um bezahlte Inhalte freizuschalten und um Geld über einen Link zu senden oder zu empfangen
- **ZcashMe** - verwendet eine abgeschirmte Zahlung als Identitätsnachweis und konzentriert sich auf die Lücke zwischen Desktop und Mobilgerät, damit die Anmeldung auf einem Laptop keine Browser-Erweiterung erfordert
- **ZBooks** - ein Tool für Buchhaltung und Auszahlungen, das Anmeldung mit Zcash als wiederverwendbares Auth-Primitiv statt als Produkt selbst behandelt und Treasury-Daten über einen Unified Full Viewing Key liest

<br/>

## <img src="/content-images/chain-for-links-svgrepo-com-117ee0dec1.svg" width="24" height="24" className="inline-block align-middle mr-1 p-[2px]" alt="chain-links icon"/> Verwandte Seiten

- [Memos](/using-zcash/memos) - wie verschlüsselte Memos funktionieren und wie ein Login-Code in einem solchen transportiert wird
- [Viewing Keys](/zcash-tech/viewing-keys) - schreibgeschützten Zugriff gewähren, ohne Ausgabebefugnis zu übergeben
- [Aufzeichnungen mit abgeschirmtem ZEC führen](/zcash-use-cases/keeping-records-with-shielded-zec) - dieselbe Idee der selektiven Offenlegung, angewendet auf Buchhaltung
- [Geld senden, ohne Identität zu verknüpfen](/zcash-use-cases/send-money-without-linking-identity) - warum Adresswiederverwendung die Privatsphäre untergräbt

<br/>
