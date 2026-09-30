<a href="https://github.com/zechub/zechub/edit/main/site/Using_Zcash/Payment_Request_URIs.md" target="_blank">
  <img src="https://img.shields.io/badge/Edit-blue" alt="Modifica pagina"/>
</a>

# Zcash URI di richiesta di pagamento

Un URI di richiesta di pagamento è un link `zcash:` definito da [ZIP 321](https://zips.z.cash/zip-0321). I wallet compatibili leggono l'indirizzo, l'importo e il memo facoltativo dal link o dal QR e precompilano una transazione. Nessun account aggiuntivo, nessun intermediario.

<div className="my-6 flex flex-wrap items-center gap-3">
  <a
    href="/zcash-payment-uri"
    className="inline-flex items-center justify-center rounded-xl bg-[#F4B728] px-5 py-3 text-sm font-semibold text-zinc-900 no-underline shadow-sm hover:bg-[#e5a420]"
  >
    Apri il widget di pagamento
  </a>
  <a
    href="/tools"
    className="inline-flex items-center justify-center rounded-xl border border-slate-300 dark:border-zinc-600 px-5 py-3 text-sm font-semibold text-slate-800 dark:text-zinc-100 no-underline hover:bg-slate-50 dark:hover:bg-zinc-800"
  >
    Crea una richiesta di pagamento
  </a>
</div>

La demo del widget è una modale ZIP-321 in tempo reale: QR, copia indirizzo/URI, link breve e Apri nel wallet. La pagina degli strumenti è il generatore se vuoi prima impostare il tuo indirizzo e importo.

## Anatomia

```
zcash:<address>?amount=<zec>&memo=<text>&label=<text>
```

| Campo | Obbligatorio | Note |
| --- | --- | --- |
| address | sì | Preferisci un Unified Address (`u1` / `utest1`) |
| amount | no | Decimale ZEC |
| memo | no | Solo trasferimenti schermati |
| label | no | Nome leggibile mostrato da alcuni wallet |

Regole complete: [ZIP 321](https://zips.z.cash/zip-0321).

## Casi d'uso

- **Checkout** — precompila il prezzo e un memo dell'ordine, così il cliente dovrà solo confermare nel proprio wallet
- **Fatture** — condividi un unico link o QR
- **Donazioni** — incorpora il widget in un sito
- **P2P** — invia un link `zcash:` in chat

## Incorpora in un sito

Indirizza questo script al tuo indirizzo schermato. La copia ospitata si trova su ZecHub:

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

Obbligatori: `data-address`, `data-amount`, `data-target`.

Prova prima il pulsante ospitato: [Apri il widget di pagamento](/zcash-payment-uri).

## Video

Come creare richieste di pagamento con Zcash:

<div className="my-8 w-full aspect-video max-w-3xl mx-auto rounded-2xl overflow-hidden shadow-lg bg-black">
  <iframe
    className="w-full h-full"
    src="https://www.youtube.com/embed/l5auYQIzYsQ"
    title="Come creare richieste di pagamento con Zcash"
    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
    allowFullScreen
    loading="lazy"
  />
</div>

Aggiungere un widget per donazioni Zcash al tuo sito web:

<div className="my-8 w-full aspect-video max-w-3xl mx-auto rounded-2xl overflow-hidden shadow-lg bg-black">
  <iframe
    className="w-full h-full"
    src="https://www.youtube.com/embed/NbP4BcHC0uM"
    title="Aggiungere un widget per donazioni Zcash al tuo sito web"
    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
    allowFullScreen
    loading="lazy"
  />
</div>
