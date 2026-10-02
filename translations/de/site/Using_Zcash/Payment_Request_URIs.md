<a href="https://github.com/zechub/zechub/edit/main/site/Using_Zcash/Payment_Request_URIs.md" target="_blank">
  <img src="https://img.shields.io/badge/Edit-blue" alt="Seite bearbeiten"/>
</a>

# Zcash Zahlungsanforderungs-URIs

Eine Zahlungsanforderungs-URI ist ein durch [ZIP 321](https://zips.z.cash/zip-0321) definierter `zcash:`-Link. Kompatible Wallets lesen Adresse, Betrag und optionales Memo aus dem Link oder QR-Code und füllen eine Transaktion vorab aus. Keine zusätzlichen Konten, kein Vermittler dazwischen.

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
    Eine Zahlungsanforderung erstellen
  </a>
</div>

Die Widget-Demo ist ein Live-Modal für ZIP-321: QR-Code, Adresse/URI kopieren, Kurzlink und In Wallet öffnen. Auf der Tools-Seite findest du den Generator, falls du zuerst deine eigene Adresse und deinen Betrag festlegen möchtest.

## Aufbau

```
zcash:<address>?amount=<zec>&memo=<text>&label=<text>
```

| Feld | Erforderlich | Hinweise |
| --- | --- | --- |
| address | ja | Bevorzugt eine Unified Address (`u1` / `utest1`) |
| amount | nein | Dezimaler ZEC |
| memo | nein | Nur abgeschirmte Übertragungen |
| label | nein | Menschenlesbarer Name, der von einigen Wallets angezeigt wird |

Vollständige Regeln: [ZIP 321](https://zips.z.cash/zip-0321).

## Anwendungsfälle

- **Checkout** — Preis und Bestell-Memo vorab ausfüllen, sodass der Kunde nur noch in seiner Wallet bestätigen muss
- **Rechnungen** — einen Link oder QR-Code teilen
- **Spenden** — das Widget auf einer Website einbetten
- **P2P** — einen `zcash:`-Link im Chat senden

## Auf einer Website einbetten

Richte dieses Skript auf deine eigene abgeschirmte Adresse. Die gehostete Kopie befindet sich auf ZecHub:

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

Probiere zuerst den gehosteten Button: [Zahlungs-Widget öffnen](/zcash-payment-uri).

## Videos

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
