<a href="https://github.com/zechub/zechub/edit/main/site/Using_Zcash/Payment_Request_URIs.md" target="_blank">
  <img src="https://img.shields.io/badge/Edit-blue" alt="Modifica pagina"/>
</a>

# Zcash URI di richiesta di pagamento

## In breve

* Un URI di richiesta di pagamento è un link che inizia con `zcash:` e contiene i dettagli di un pagamento: l'indirizzo, l'importo e un memo facoltativo.
* Condiviso come codice QR o link cliccabile, permette al tuo portafoglio di compilare il pagamento per te. Controlli i dettagli e approvi.
* [ZIP 321](https://zips.z.cash/zip-0321) definisce il formato. Deriva dal BIP 21 di Bitcoin.
* Una richiesta può pagare più destinatari in una singola transazione.
* ZecHub ospita un widget di pagamento e un generatore, così un negozio può aggiungere un pulsante di pagamento Zcash senza scrivere l'URI a mano.

## Spiegazione principale

Un URI di richiesta di pagamento è un link `zcash:` definito da [ZIP 321](https://zips.z.cash/zip-0321). I portafogli compatibili leggono l'indirizzo, l'importo e il memo facoltativo dal link o dal QR e precompilano una transazione. Nessun account aggiuntivo, nessun processore intermediario.

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

La demo del widget è una finestra modale ZIP-321 attiva: QR, copia indirizzo/URI, link breve e Apri nel portafoglio. La pagina degli strumenti è il generatore se vuoi prima impostare il tuo indirizzo e importo.

### Anatomia

```
zcash:<address>?amount=<zec>&memo=<base64url>&label=<text>
```

| Campo | Obbligatorio | Note |
| --- | --- | --- |
| address | sì | Preferisci un Unified Address (`u1` / `utest1`) |
| amount | no | ZEC decimale con `.` come separatore e al massimo 8 cifre decimali (`0.5`, non `0,5`) |
| memo | no | Solo indirizzi schermati. I byte UTF-8 del memo (al massimo 512), codificati in base64url senza padding `=`: `Thanks!` diventa `VGhhbmtzIQ`, non il testo semplice |
| label | no | Nome leggibile mostrato da alcuni portafogli. Codifica in percentuale gli spazi e i caratteri riservati (`Coffee%20shop`); un `+` è un segno più letterale, non uno spazio |

Regole complete: [ZIP 321](https://zips.z.cash/zip-0321).

### Casi d'uso

- Checkout: precompila il prezzo e un memo dell'ordine, così il cliente deve solo confermare nel proprio portafoglio
- Fatture: condividi un link o QR
- Donazioni: incorpora il widget in un sito
- P2P: invia un link `zcash:` in chat

### Incorpora in un sito

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

### Video

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

Aggiungere un widget di donazione in Zcash al tuo sito web:

<div className="my-8 w-full aspect-video max-w-3xl mx-auto rounded-2xl overflow-hidden shadow-lg bg-black">
  <iframe
    className="w-full h-full"
    src="https://www.youtube.com/embed/NbP4BcHC0uM"
    title="Aggiungere un widget di donazione in Zcash al tuo sito web"
    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
    allowFullScreen
    loading="lazy"
  />
</div>

## Visuale / Analogia

Pensa a un modulo di bonifico bancario con campi per il numero di conto, l'importo e una nota che indica a cosa serve il pagamento. Compilarlo a mano è lento e una cifra sbagliata invia il denaro nel posto sbagliato.

Un URI di richiesta di pagamento è quel modulo, compilato dal negozio. Il codice QR è una foto del modulo. La fotocamera del tuo telefono legge la foto, il portafoglio copia ogni campo nella posizione giusta e tu controlli i numeri e firmi.

Un link in una pagina web svolge lo stesso compito. Facendo clic, consegni il modulo compilato al tuo portafoglio.

## Approfondimento

### Un esempio reale

Ecco un esempio da ZIP 321, scritto per testnet:

```
zcash:ztestsapling10yy2ex5dcqkclhc7z7yrnjq2z6feyjad56ptwlfgmy77dmaqqrl9gyhprdx59qgmsnyfska2kez?amount=1&memo=VGhpcyBpcyBhIHNpbXBsZSBtZW1vLg&message=Thank%20you%20for%20your%20purchase
```

Richiede 1 ZEC a un indirizzo Sapling schermato. Il memo viene decodificato in "Questo è un semplice memo." Il messaggio "Grazie per il tuo acquisto" è il testo che il portafoglio mostra sullo schermo.

### Regole controllate da un portafoglio

Il formato dell'importo è rigoroso. `amount=0.5` e `amount=50` sono validi. `amount=50,000.00`, `amount=.5` e `amount=0.123456789` non sono validi: il punto è l'unico separatore decimale e possono esserci al massimo 8 cifre dopo di esso. Nessun importo può superare 21.000.000 ZEC.

Nell'URI grezzo, il memo è codificato in base64url e può contenere fino a 512 byte una volta decodificato. Un memo allegato a un indirizzo trasparente rende non valida l'intera richiesta, poiché gli indirizzi trasparenti non possono contenere memo. Gli indirizzi Sprout non sono affatto consentiti e una richiesta che non segue la grammatica di ZIP 321 deve essere rifiutata.

Esistono altri due campi oltre a quelli nella tabella sopra. `message` è una descrizione del pagamento che il portafoglio visualizza. `req-asset` è riservato ai Custom Assets, come definiti in ZIP 227.

### Pagare più persone contemporaneamente

A ogni pagamento aggiuntivo viene assegnato un numero indice ai nomi dei parametri, ad esempio `address.1`, `amount.1` e `memo.1`. Il portafoglio crea una transazione che paga tutte le persone nell'elenco. Questo è utile per un checkout che divide un pagamento o per un gruppo di donazioni inviate insieme.

### Da dove viene il formato

Bitcoin ha due standard più vecchi per le richieste di pagamento: BIP 21, un semplice link per un destinatario, e BIP 70, un protocollo più complesso per pagamenti articolati. ZIP 321 segue una via di mezzo, un formato di link con spazio per più destinatari. La discussione è iniziata nel 2018 nel repository degli ZIP Zcash, dove il numero 321 è stato scelto per richiamare BIP 21, e lo stesso ZIP è stato creato nell'agosto 2020.

## Pagine correlate

- [Memo](/using-zcash/memos): a cosa serve il campo memo in una richiesta di pagamento.
- [Processori di pagamento](/using-zcash/payment-processors): servizi che gestiscono i pagamenti per i negozi.
- [Portafogli](/using-zcash/wallets): usa il filtro Payment Request per trovare portafogli che leggono questi link.
- [Zcash Asset schermati](/zcash-tech/zcash-shielded-assets): i Custom Assets a cui `req-asset` si riferisce.
- [Cosa sono gli indirizzi TEX di Zcash?](/using-zcash/transparent-exchange-addresses): un'altra regola sugli indirizzi che il tuo portafoglio legge prima di pagare.

**Ultimo aggiornamento:** ottobre 2026
