<a href="https://github.com/zechub/zechub/edit/main/site/Using_Zcash/Payment_Request_URIs.md" target="_blank">
  <img src="https://img.shields.io/badge/Edit-blue" alt="Seite bearbeiten"/>
</a>

# Zcash Zahlungsanforderungs-URIs

## Kurzfassung

* Eine Zahlungsanforderungs-URI ist ein Link, der mit `zcash:` beginnt und die Details einer Zahlung enthält: die Adresse, den Betrag und ein optionales Memo.
* Als QR-Code oder anklickbarer Link geteilt, lässt sie deine wallet die Zahlung für dich ausfüllen. Du prüfst die Details und bestätigst.
* [ZIP 321](https://zips.z.cash/zip-0321) definiert das Format. Es entstand aus Bitcoins BIP 21.
* Eine Anfrage kann mehrere Empfänger in einer einzigen Transaktion bezahlen.
* ZecHub hostet ein Zahlungs-Widget und einen Generator, damit ein Shop eine Zcash-Zahlungsschaltfläche hinzufügen kann, ohne die URI von Hand zu schreiben.

## Grundlegende Erklärung

Eine Zahlungsanforderungs-URI ist ein `zcash:`-Link, der durch [ZIP 321](https://zips.z.cash/zip-0321) definiert wird. Kompatible wallets lesen Adresse, Betrag und optionales Memo aus dem Link oder QR-Code und füllen eine Transaktion vorab aus. Keine zusätzlichen Konten, kein Zahlungsabwickler dazwischen.

<div className="my-6 flex flex-wrap items-center gap-3">
  <a
    href="/zcash-payment-uri"
    className="inline-flex items-center justify-center rounded-xl bg-[#F4B728] px-5 py-3 text-sm font-semibold text-zinc-900 no-underline shadow-sm hover:bg-[#e5a420]"
  >
    Zahlungs-Widget öffnen
  </a>
  <a
    href="/tools"
    className="inline-flex items-center justify-center rounded-xl border border-slate-300 dark:border-zinc-600 px-5 py-3 text-sm font-semibold text-slate-800 dark:text-zinc-100 no-underline hover:bg-slate-50 dark:hover:bg-zinc-800"
  >
    Zahlungsanforderung erstellen
  </a>
</div>

Die Widget-Demo ist ein Live-ZIP-321-Modal: QR-Code, Adresse/URI kopieren, Kurzlink und In Wallet öffnen. Die Tools-Seite enthält den Generator, falls du zuerst deine eigene Adresse und deinen eigenen Betrag festlegen möchtest.

### Aufbau

```
zcash:<address>?amount=<zec>&memo=<base64url>&label=<text>
```

| Feld | Erforderlich | Hinweise |
| --- | --- | --- |
| address | ja | Bevorzuge eine Unified Address (`u1` / `utest1`) |
| amount | nein | Dezimaler ZEC mit `.` als Trennzeichen und höchstens 8 Nachkommastellen (`0.5`, nicht `0,5`) |
| memo | nein | Nur Shielded-Adressen. Die UTF-8-Bytes des Memos (höchstens 512), base64url-kodiert ohne `=`-Padding: `Thanks!` wird zu `VGhhbmtzIQ`, nicht zum Klartext |
| label | nein | Für Menschen lesbarer Name, der von einigen wallets angezeigt wird. Leerzeichen und reservierte Zeichen prozentkodieren (`Coffee%20shop`); ein `+` ist ein wörtliches Pluszeichen, kein Leerzeichen |

Vollständige Regeln: [ZIP 321](https://zips.z.cash/zip-0321).

### Anwendungsfälle

- Checkout: Preis und Bestellmemo vorab ausfüllen, damit der Kunde nur noch in seiner wallet bestätigt
- Rechnungen: einen Link oder QR-Code teilen
- Spenden: das Widget auf einer Website einbetten
- P2P: einen `zcash:`-Link im Chat senden

### Auf einer Website einbetten

Richte dieses Skript auf deine eigene Shielded-Adresse. Die gehostete Kopie befindet sich auf ZecHub:

```html
<div id="zcash-pay"></div>
<script
  src="https://zechub.wiki/zcash-payment-request-widget.embed.v2.js"
  data-target="#zcash-pay"
  data-address="u1..."
  data-amount="0.01"
  data-label="Pay with Zcash"
  data-memo="order-42"
  data-theme="dark"
  data-api-base="https://zechub.wiki/api"
></script>
```

Erforderlich: `data-address`, `data-amount`, `data-target`.

Probiere zuerst die gehostete Schaltfläche: [Zahlungs-Widget öffnen](/zcash-payment-uri).

### Videos

So erstellst du Zahlungsanforderungen mit Zcash:

<div className="my-8 w-full aspect-video max-w-3xl mx-auto rounded-2xl overflow-hidden shadow-lg bg-black">
  <iframe
    className="w-full h-full"
    src="https://www.youtube.com/embed/l5auYQIzYsQ"
    title="So erstellst du Zahlungsanforderungen mit Zcash"
    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
    allowFullScreen
    loading="lazy"
  />
</div>

Ein Zcash-Spenden-Widget zu deiner Website hinzufügen:

<div className="my-8 w-full aspect-video max-w-3xl mx-auto rounded-2xl overflow-hidden shadow-lg bg-black">
  <iframe
    className="w-full h-full"
    src="https://www.youtube.com/embed/NbP4BcHC0uM"
    title="Ein Zcash-Spenden-Widget zu deiner Website hinzufügen"
    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
    allowFullScreen
    loading="lazy"
  />
</div>

## Visualisierung / Analogie

Stell dir ein Banküberweisungsformular mit Feldern für die Kontonummer, den Betrag und eine Notiz vor, wofür die Zahlung bestimmt ist. Es von Hand auszufüllen ist langsam, und eine falsche Ziffer schickt das Geld an die falsche Stelle.

Eine Zahlungsanforderungs-URI ist dieses vom Shop ausgefüllte Formular. Der QR-Code ist ein Foto des Formulars. Deine Handykamera liest das Foto, die wallet übernimmt jedes Feld, und du prüfst die Zahlen und signierst.

Ein Link auf einer Webseite erfüllt dieselbe Aufgabe. Ein Klick darauf übergibt das ausgefüllte Formular an deine wallet.

## Vertiefung

### Ein echtes Beispiel

Hier ist ein Beispiel aus ZIP 321, geschrieben für testnet:

```
zcash:ztestsapling10yy2ex5dcqkclhc7z7yrnjq2z6feyjad56ptwlfgmy77dmaqqrl9gyhprdx59qgmsnyfska2kez?amount=1&memo=VGhpcyBpcyBhIHNpbXBsZSBtZW1vLg&message=Thank%20you%20for%20your%20purchase
```

Es fordert 1 ZEC an eine Shielded-Sapling-Adresse. Das Memo wird zu „This is a simple memo.“ dekodiert. Die Nachricht „Thank you for your purchase“ ist der Text, den die wallet auf dem Bildschirm anzeigt.

### Regeln, die eine wallet prüft

Das Betragsformat ist strikt. `amount=0.5` und `amount=50` sind gültig. `amount=50,000.00`, `amount=.5` und `amount=0.123456789` sind ungültig: Ein Punkt ist das einzige Dezimaltrennzeichen, und nach ihm dürfen höchstens 8 Ziffern stehen. Kein Betrag darf 21.000.000 ZEC überschreiten.

In der Roh-URI wird das Memo in base64url kodiert und kann nach dem Dekodieren bis zu 512 Bytes enthalten. Ein Memo an einer transparenten Adresse macht die gesamte Anfrage ungültig, weil transparente Adressen keine Memos enthalten können. Sprout-Adressen sind überhaupt nicht erlaubt, und eine Anfrage, die nicht der ZIP-321-Grammatik folgt, muss abgelehnt werden.

Über die Tabelle oben hinaus gibt es zwei weitere Felder. `message` ist eine Beschreibung der Zahlung, die die wallet anzeigen soll. `req-asset` ist für Custom Assets reserviert, wie in ZIP 227 definiert.

### Mehrere Personen gleichzeitig bezahlen

Jede zusätzliche Zahlung erhält eine Indexnummer in ihren Parameternamen, zum Beispiel `address.1`, `amount.1` und `memo.1`. Die wallet erstellt eine Transaktion, die alle auf der Liste bezahlt. Das ist nützlich für einen Checkout, der eine Zahlung aufteilt, oder für eine Gruppe gemeinsam versendeter Spenden.

### Woher das Format stammt

Bitcoin hat zwei ältere Standards für Zahlungsanforderungen: BIP 21, einen einfachen Link für einen Empfänger, und BIP 70, ein umfangreicheres Protokoll für komplexe Zahlungen. ZIP 321 wählt einen Mittelweg: ein Linkformat mit Platz für mehrere Empfänger. Die Diskussion begann 2018 im Zcash-ZIPs-Repository, wo die Nummer 321 als Anspielung auf BIP 21 gewählt wurde, und das ZIP selbst wurde im August 2020 erstellt.

## Verwandte Seiten

- [Memos](/using-zcash/memos): Wofür das Memofeld in einer Zahlungsanforderung dient.
- [Zahlungsabwickler](/using-zcash/payment-processors): Dienste, die Zahlungen für Shops abwickeln.
- [Wallets](/using-zcash/wallets): Verwende den Filter Zahlungsanforderung, um wallets zu finden, die diese Links lesen.
- [Zcash Shielded Assets](/zcash-tech/zcash-shielded-assets): die Custom Assets, auf die sich `req-asset` bezieht.
- [Was sind Zcash-TEX-Adressen?](/using-zcash/transparent-exchange-addresses): eine weitere Adressregel, die deine wallet vor der Zahlung liest.

**Zuletzt aktualisiert:** Oktober 2026
