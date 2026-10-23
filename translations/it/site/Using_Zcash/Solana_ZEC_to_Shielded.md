<a href="https://github.com/zechub/zechub/edit/main/site/Using_Zcash/Solana_ZEC_to_Shielded.md" target="_blank">
  <img src="https://img.shields.io/badge/Edit-blue" alt="Modifica pagina"/>
</a>

# Hai ZEC su Solana? Spostalo in Zcash schermato

Questa pagina fa per te se ZEC è apparso nel tuo portafoglio Solana perché possiedi ZCAT, o un altro token Solana che remunera i propri possessori in ZEC. Non devi vendere nulla per seguire questa procedura. Sposterai gli ZEC che già possiedi da Solana a un portafoglio Zcash, dove risulteranno schermati.

Abbiamo eseguito ogni passaggio qui sotto con un trasferimento reale il 27 settembre 2026, partendo da 0.00266336 ZEC in Phantom. Le commissioni, i tempi e le schermate in questa pagina sono quelli che abbiamo visto.

---

## In breve

- ZEC nel tuo portafoglio Solana è un **token Solana** (mint `A7bd…QXaS`) garantito 1:1 da veri ZEC che l'OmniBridge di NEAR detiene sulla chain Zcash — "ZEC cartaceo" che si trova sul registro pubblico di Solana e non può essere schermato lì.
- Il percorso prevede due passaggi: **deposita** il token su solswap.org (NEAR Intents), poi **preleva** su near.com verso l'indirizzo `u1` schermato del tuo portafoglio. Non usare il pulsante Swap di Phantom — non può aiutarti.
- Usa un portafoglio che la directory [ZecHub](/wallets) contrassegna come **Ironwood: pronta**, e tieni un po' di SOL in Phantom per la commissione Solana.
- Il nostro test reale (27 settembre 2026, 0,00266336 ZEC): il deposito è arrivato in 9 secondi, il prelievo ha richiesto circa 8 minuti, costo totale ~0,00025 ZEC + 0,0016 SOL.
- Indicazione di sicurezza: firma richieste di messaggio solo su `near.com`/`solswap.org` con `intents.near` nel messaggio, non digitare mai la tua frase mnemonica e incolla `u1`, mai `t1`.

## Analogia visiva

ZEC su Solana funziona come un **gettone da casinò**. Ha un prezzo come il contante e il casinò — il NEAR OmniBridge — promette banconote reali (ZEC nativi) a chiunque restituisca il gettone. Ma il gettone è solo una riga nel libro mastro del casinò: tutti possono vedere chi lo possiede e il suo valore dipende dalla solidità dei sistemi del casinò. Prelevare tramite near.com è come andare alla cassa e incassare il gettone. Una volta che le banconote sono in una pool schermata, si trovano nel tuo portafoglio opaco: nessuno può più vedere l'importo o il titolare.

---

## Cosa possiedi effettivamente

Gli ZEC nel tuo portafoglio Solana sono un token su Solana, non monete sulla rete Zcash. L'OmniBridge di NEAR lo emette e detiene veri ZEC sulla chain Zcash a sua garanzia; il bridge è attivo su Solana dall'ottobre 2025. Il suo segmento Solana opera tramite messaggi Wormhole e NEAR Chain Signatures, non tramite un light client Zcash, quindi il lato Solana è affidabile solo quanto questi due sistemi. La gente lo chiama "ZEC cartaceo". Tiene il passo con il prezzo di ZEC, ma ogni saldo e ogni trasferimento si trova sul registro pubblico di Solana associato all'indirizzo del tuo portafoglio, e non può essere schermato finché rimane lì.

Verifica che il tuo sia il token autentico. In Phantom, tocca **ZEC** e scorri fino a **Informazioni su Zcash**. L'indirizzo del contratto deve essere:

```
A7bdiYdS5GjqGFtxf17ppRHtDKPkkRqbKtR27dxvQXaS
```

![Phantom's About Zcash panel showing the contract address A7bd…QXaS on the Solana network](/content-images/01-phantom-zec-mint-4a718bc213.webp)

Phantom lo abbrevia in `A7bd…QXaS`, quindi confronta il primo e l'ultimo carattere, oppure cerca l'indirizzo completo su [Solscan](https://solscan.io/token/A7bdiYdS5GjqGFtxf17ppRHtDKPkkRqbKtR27dxvQXaS). Qualsiasi altro token "ZEC" nel tuo portafoglio, qualunque ne sia il nome o il logo, non è questo. Lascialo stare.

---

## Perché spostarlo

Gli ZEC schermati sono lo scopo di Zcash. Quando i tuoi ZEC si trovano in una pool schermata, mittente, destinatario e importo di ogni pagamento sono cifrati sulla chain Zcash. Nessuno che consulti un explorer può vedere il tuo saldo.

Possiedi già ZEC. Spostarlo in un portafoglio Zcash ti dà la parte che lo rende Zcash e rimuove il bridge dall'equazione: gli ZEC nativi nel tuo portafoglio non dipendono dal fatto che qualcuno evada un riscatto.

[Chi può vedere il tuo pagamento in Zcash?](/start-here/who-can-see-your-zcash-payment) spiega esattamente cosa rimane nascosto.

---

## Scegli un portafoglio Zcash

ZecHub non ne sceglie uno per te. Scegli dalla [directory dei portafogli di ZecHub](/wallets) e verifica due etichette sulla scheda del portafoglio prima di installarlo:

- **Ironwood Ready.** Ironwood è la pool in cui confluiscono i nuovi ZEC schermati dall'aggiornamento [Ironwood](/zcash-tech/ironwood) del 28 luglio 2026. La vecchia pool Orchard non accetta più nuovi fondi.
- **Schermatura automatica.** Utile se un pagamento arriva in modo trasparente: il portafoglio sposta per te quegli ZEC nella pool schermata. Non considerare questa etichetta un sostituto di **Ironwood Ready**. Un portafoglio può avere la schermatura automatica e non avere comunque una pool Ironwood (oggi Edge è in questa situazione nella directory). La maggior parte degli altri portafogli mostra invece un pulsante **Schermatura**.

Installa il portafoglio dal link sulla sua scheda nella directory, non da un risultato di ricerca o da una pubblicità. Scrivi la frase mnemonica su carta e conservala offline.

Il tuo portafoglio mostra due tipi di indirizzo:

![Schermata Ricevi di un portafoglio Zcash con un indirizzo schermato che inizia con u1 e un indirizzo trasparente che inizia con t1](/content-images/02-zodl-receive-c98cd378fb.webp)

| Inizia con | Tipo | Cosa vede il pubblico |
|---|---|---|
| `u1` | Unified Address | Nulla su di te, ma solo quando il pagamento arriva in una pool schermata |
| `t1` | Indirizzo trasparente | Il tuo indirizzo e l'importo, per sempre, come su Solana |

Usa un `u1` che il tuo portafoglio identifica come schermato. Un `u1` è un insieme di ricevitori e alcuni portafogli vi inseriscono un ricevitore trasparente accanto a quello schermato. Un mittente che può pagare solo indirizzi trasparenti userà quello, e il tuo pagamento sarà pubblico anche se hai incollato un `u1`. L'indirizzo schermato del portafoglio usato per il nostro test non ha un ricevitore trasparente, quindi ciò non poteva accadere. [Pool schermate](/using-zcash/shielded-pools) approfondisce i ricevitori. Alcuni portafogli mostrano un nuovo `u1` ogni volta che apri Ricevi; è normale e appartengono tutti a te. La schermata di ricezione e il campo del destinatario di near.com in questa pagina usano per questo motivo prefissi `u1` diversi.

Per il nostro test abbiamo usato ZODL perché era il portafoglio che avevamo configurato. Solo i portafogli che la directory contrassegna come **Ironwood Ready** possono ricevere nuovo valore schermato.

---

## Spostalo

Il percorso è composto da due parti: deposita i tuoi ZEC in NEAR Intents da Phantom, quindi inviali al tuo indirizzo Zcash. Per la prima parte abbiamo usato [solswap.org](https://solswap.org), un sito realizzato da NEAR per gli utenti Solana, e per la seconda [near.com](https://near.com), l'app di NEAR. La guida di ZecHub, [Come scambiare ZEC nel portafoglio Phantom](/using-zcash/solswap), descrive più nel dettaglio le schermate di solswap. Non usare il pulsante **Scambio** di Phantom per questo: possiedi già il token e scambiarlo non ti porta da nessuna parte.

Tieni un po' di SOL in Phantom per la commissione di Solana.

### 1. Deposita i tuoi ZEC su solswap.org

1. Apri Phantom, vai alla scheda del browser, digita tu stesso `solswap.org` e collega il tuo portafoglio.
2. Tocca **Deposita**. Imposta **Asset** su **Zcash**, **Network** su **Solana** e il metodo su **Portafoglio**.
3. Inserisci l'importo (oppure tocca **Max**) e approva la transazione in Phantom.

![Schermata Deposita di solswap con Zcash come asset, Solana come network e Portafoglio come metodo](/content-images/03-solswap-deposit-425691e62f.webp)

Il nostro deposito è arrivato nel blocco Solana alle 15:09:08 (UTC+1) e solswap lo ha mostrato come **Completato** nove secondi dopo.

![solswap deposit history showing Completed, +0.0026 ZEC](/content-images/04-solswap-deposit-complete-be5feaf758.webp)

I tuoi ZEC ora si trovano nel tuo saldo NEAR Intents. La tua chiave Phantom autorizza ogni movimento in uscita, i solver NEAR Intents eseguono la consegna e NEAR Intents può trattenere un saldo per una verifica di conformità (vedi le note sulla fiducia qui sotto).

### 2. Invialo al tuo indirizzo Zcash su near.com

solswap ha anche una pagina **Prelievo**, ma per noi non ha funzionato. **Importo ricevuto** e **Commissione** restavano su "–" e il pulsante non faceva nulla, sia scegliendo Zcash sia Solana come rete.

![solswap Withdraw form with the received amount and fee stuck at a dash](/content-images/05-solswap-withdraw-blank-92c6e64c65.webp)

Se succede anche a te, i tuoi ZEC non sono bloccati. Il saldo è legato alla chiave del tuo portafoglio, non al sito web, quindi qualunque app NEAR Intents a cui accedi con quel portafoglio può accedervi. Abbiamo concluso su near.com:

1. Vai su `near.com` e accedi con lo stesso portafoglio Phantom.
2. Il tuo saldo solswap compare sotto **Sposta asset legacy** (near.com chiama "legacy" i saldi delle app NEAR Intents meno recenti). Tocca **Preleva** nella riga ZEC. Non hai bisogno di **Sposta**.

![near.com Move legacy assets page listing 0.0026 ZEC with Move and Withdraw buttons](/content-images/06-nearcom-legacy-assets-7ee16c5ac4.webp)

3. Imposta **Network** su **Zcash**, incolla l'indirizzo `u1` del tuo portafoglio come **Destinatario** e confronta i primi e gli ultimi sei caratteri con quelli nel tuo portafoglio.

![near.com Withdraw legacy asset form with Zcash as the network and a u1 recipient, receive at least 0.00233164 ZEC, about 2 minutes](/content-images/07-nearcom-withdraw-724ef22b38.webp)

4. Tocca **Rivedi prelievo**, leggi il riepilogo e tocca **Invia**.

![near.com Review send screen: network Zcash, recipient receives at least 0.00233164 ZEC, fee 0 ZEC, you pay 0.00266336 ZEC](/content-images/08-nearcom-review-b6053f675b.webp)

5. Phantom ti chiede di **Firmare il messaggio** per near.com. Questa firma autorizza NEAR Intents a spostare il tuo saldo. Non costa SOL, ma ciò non la rende innocua: un sito contraffatto può mostrare la stessa richiesta e svuotare con essa il tuo saldo NEAR Intents. Prima di toccare **Conferma**, verifica tutto quanto segue e tocca **Annulla** se anche una sola condizione non è soddisfatta:
   - Il sito indicato nella richiesta è `near.com`. (Il deposito nel passaggio 1 era una normale richiesta di transazione Phantom da `solswap.org`; controlla quel nome allo stesso modo.)
   - Apri **Messaggio** e trova `"verifying_contract": "intents.near"`.
   - Il messaggio è testo leggibile come nella schermata. Se è un blocco illeggibile, o il sito non corrisponde a quello nella barra degli indirizzi, rifiutalo.
   - Non ti chiede mai la frase seed. La firma non comporta mai di digitarla.

![Phantom Sign Message request from near.com on the Solana network](/content-images/09-phantom-sign-message-cb1ce6d20f.webp)

6. near.com mostra **Elaborazione dell'invio**, **Invio** e **Completato**. **Visualizza nell'explorer** apre il record NEAR Intents del trasferimento.

![near.com status screen: Sending 0.0023 ZEC, all three steps complete](/content-images/10-nearcom-complete-c641093c46.webp)

![NEAR Intents explorer record: created 3:59:28 PM, withdrawn to the u1 address 4:07:55 PM, with the Zcash withdraw transaction ID](/content-images/11-intents-explorer-f93f87814e.webp)

### Quanto è costato il nostro test e quanto tempo ha richiesto

| | Il nostro test |
|---|---|
| ZEC depositati da Phantom | 0.00266336 ZEC |
| ZEC ricevuti nel portafoglio Zcash | 0.00241336 ZEC, schermati |
| Costo sul lato ZEC | 0.00025 ZEC (near.com mostrava "Commissione 0 ZEC"; il costo è incluso nel preventivo) |
| SOL spesi per il deposito | 0.00156844 SOL, di cui 0.00008 SOL di commissione di rete |
| Minimo | Nessuno raggiunto. solswap indicava un deposito minimo di 0.00000001 ZEC e near.com ha accettato 0.0026 ZEC |
| Deposito, da Phantom a solswap | 9 secondi |
| Prelievo, dalla firma su near.com a ZEC nel portafoglio Zcash | Circa 8 minuti (near.com ne stimava circa 2) |

Record: deposito Solana [5ijsgRrh…AjLkx](https://solscan.io/tx/5ijsgRrhViNTtFMmnsfJDSo3HhRmt3Ri7WB513oBoQLxfGNswDxvHnakwW1yyqXznTTCSxnUkooAHDKowz9AjLkx), NEAR Intents [79c23cfd…a405a9](https://explorer.near-intents.org/transactions/79c23cfd43928de5522c182e26f8f052dc9c43d53430ca497b40e016a6a405a9), Zcash [28d6da27…481034](https://mainnet.zcashexplorer.app/transactions/28d6da27d74dc91e45175a7aff6023bc85578603dd77f1b49782a28f8f481034) nel blocco 3,498,141. Commissioni e tempi variano con il carico della rete, quindi la schermata di revisione fa fede quando effettui l'operazione.

Il bridge di NEAR pubblica un minimo di 0.01 ZEC e una commissione di 0.00047 ZEC per i suoi prelievi standard Zcash. near.com non ha applicato nessuno dei due alla nostra operazione da 0.0026 ZEC. Se un'app rifiuta un piccolo importo, prova near.com prima di aggiungere fondi.

### Altri percorsi e di cosa si fidano

Ogni percorso in uscita da Solana si fida di OmniBridge, perché il bridge detiene gli ZEC a garanzia del tuo token. Inoltre:

- **Il percorso sopra** si fida di NEAR Intents. La tua firma autorizza il trasferimento, i solver consegnano gli ZEC sul lato Zcash e NEAR Intents può trattenere fondi per una verifica di conformità; nel 2026 un possessore di Zcash ha [segnalato un grande scambio trattenuto per settimane](https://www.cryptotimes.io/2026/09/11/zcash-holder-says-589k-usdt-stuck-on-near-intents-50-days-after-zodl-swap/). Colleghi inoltre il tuo portafoglio a due siti web, quindi controlla ogni volta la barra degli indirizzi.
- **Portafogli con NEAR Intents integrato** (cerca la funzionalità NEAR Intents nella [directory](/wallets)) usano lo stesso sistema dall'interno del portafoglio Zcash. Stessa fiducia, meno siti web. Non lo abbiamo testato con ZEC su Solana.
- **Un exchange**, soltanto se accetta depositi di questo token sulla rete Solana, cosa che la maggior parte non fa. Cedi la custodia e solitamente la tua identità, e molti exchange inviano ZEC solo a indirizzi `t1`. Vedi [exchange custodial](/using-zcash/custodial-exchanges).

---

## Schermalo e verifica

È arrivato schermato. I nostri ZEC sono andati a un indirizzo `u1` e sono arrivati direttamente nella pool schermata Ironwood. Non c'è stato alcun passaggio trasparente e nulla da schermare manualmente. Il portafoglio lo ha elencato come **In ricezione…** con un'icona di schermatura alle 16:07 (UTC+1), mentre raccoglieva le conferme.

![Attività del portafoglio Zcash che mostra In ricezione 0.00241336 ZEC con un'icona di schermatura](/content-images/12-zodl-receiving-cb9f41511d.webp)

Per verificarlo, apri la transazione nel tuo portafoglio e copia l'ID della transazione.

![Dettagli della transazione del portafoglio Zcash con l'ID della transazione e il timestamp](/content-images/13-zodl-tx-details-b08434d680.webp)

Incollalo nell'[explorer di blocchi Zcash](https://mainnet.zcashexplorer.app). Non lasciarti confondere dal riepilogo. Il nostro riporta **Input schermati / output schermati 0 / 0** e **Trasferito dalla/alla pool schermata 0.0 ZEC**, perché il riepilogo dell'explorer non conta ancora Ironwood. Gli indirizzi `t1` che vedi sono sul lato di invio (gli ZEC che ha speso e il resto che ha conservato), non sono i tuoi.

![Riepilogo dell'explorer per la transazione: due input trasparenti, un output trasparente, 0/0 schermati](/content-images/14-explorer-summary-6153afb265.webp)

Fai clic su **Raw TX: JSON** e cerca `ironwood`. Un `valueBalance` negativo lì indica gli ZEC che entrano nella pool Ironwood. Il nostro era `-0.00241336`, esattamente quanto arrivato, e nella transazione nulla mostra chi lo abbia ricevuto.

![Raw transaction JSON with the ironwood section highlighted: valueBalance -0.00241336 (highlight added)](/content-images/15-explorer-raw-ironwood-8ff8ae0892.webp)

[Cosa può vedere un block explorer](/zcash-tech/what-a-block-explorer-can-see) spiega gli altri campi.

### Se incolli un indirizzo `t1`

Non ne abbiamo usato uno per l'invio, ma il risultato è prevedibile. Gli ZEC arrivano nel saldo trasparente del tuo portafoglio e l'explorer mostra per sempre a chiunque il tuo indirizzo `t1` e l'importo. Un portafoglio con schermatura automatica lo sposta quindi nella pool schermata; altrimenti tocca **Schermatura**, che costa una piccola commissione di rete. Anche la transazione di schermatura è pubblica, poiché spende dal tuo indirizzo `t1`. Non si perde nulla, ma il collegamento tra quel deposito e il tuo portafoglio resta sulla chain. Incolla il `u1`.

---

## Rimani al sicuro

I nuovi possessori sono bersagli mirati. Quasi ogni truffa che vedrai rientra in una di queste categorie:

- **Tipo di indirizzo errato.** Un indirizzo Zcash inizia con `u1`, `t1`, `zs` o `tex1`. Un indirizzo Solana non ha nessuno di questi prefissi. Non inviare mai ZEC nativi a un indirizzo Solana e non inviare mai il token Solana a un indirizzo Zcash.
- **Servizi solo trasparenti.** Alcuni bridge, siti di swap ed exchange possono inviare solo a indirizzi `t1`. Va bene se schermi gli ZEC non appena arrivano. Non lasciarli lì.
- **Portafogli falsi.** Installa soltanto dal link sulla scheda della [directory dei portafogli](/wallets) o dalla pagina ufficiale dell'app store a cui rimanda. Le app di portafogli crypto falsi riescono a entrare negli app store e sembrano identiche a quelle autentiche.
- **Phishing della frase mnemonica.** Nessun portafoglio, bridge, sito di scambio, addetto al supporto, moderatore o airdrop ha mai bisogno della tua frase mnemonica. Firmare un messaggio non comporta mai di digitarla. Chiunque te la chieda sta cercando di derubarti. [Recuperare fondi](/using-zcash/recovering-funds) tratta la variante di questa truffa "recupereremo il tuo portafoglio".
- **Token truffaldini e siti di "claim".** Token chiamati ZEC, Zcash o qualcosa di simile compaiono senza richiesta nei portafogli Solana, spesso con un link per "claimare" altro. Collegare il tuo portafoglio a quel link può svuotarlo. Controlla l'indirizzo del contratto all'inizio di questa pagina e ignora tutto il resto.
- **Richieste di firma malevole.** Una richiesta "Firma messaggio" può spostare il tuo saldo NEAR Intents senza alcuna commissione SOL. Firma solo su `near.com` o `solswap.org` e solo quando il messaggio nomina `intents.near` (il passaggio 5 sopra mostra cosa verificare).
- **Siti contraffatti.** Digita tu stesso `solswap.org` e `near.com` oppure usa i segnalibri. Non seguire link da messaggi diretti, risposte o pubblicità.

---

## Errori comuni

- **Usare il pulsante Scambio di Phantom** invece del flusso di deposito. Possiedi già il token: lo scambio sostituisce solo un ZEC cartaceo con un altro token e non ti avvicina allo ZEC nativo.
- **Incollare un indirizzo `t1`**, o un `u1` che nasconde un ricevitore trasparente, quando il tuo portafoglio offre un `u1` esclusivamente schermato. Il deposito arriva pubblicamente e viene collegato permanentemente al tuo portafoglio.
- **Supporre che i fondi siano bloccati** quando la pagina Withdraw di solswap mostra "–". Il saldo segue la tua chiave Phantom, non il sito web: completa il prelievo su near.com.
- **Firmare un messaggio senza controllarlo.** Un sito simile può svuotare il tuo saldo NEAR Intents con una sola firma. Il sito deve essere `near.com` e il messaggio deve contenere `"verifying_contract": "intents.near"`.
- **Confondere i due ticker "ZEC".** Il token Solana e lo Zcash nativo ZEC condividono un nome, ma non una rete: inviare uno dei due all'altra chain lo fa perdere.

## Cosa fare con gli ZEC schermati

- Mantienili privati quando li spendi: [Usare ZEC privatamente](/guides/using-zec-privately)
- Trova luoghi che li accettano: [Luoghi in cui spendere ZEC](/using-zcash/spend-zcash/top-10-places-to-spend-zec)
- Invali con un messaggio privato allegato: [Memo](/using-zcash/memos)
- Paga qualcuno senza collegare la tua identità: [Invia denaro senza collegare l'identità](/zcash-use-cases/send-money-without-linking-identity)

---

## Pagine correlate

- [Come effettuare uno scambio per ZEC in Phantom Wallet](/using-zcash/solswap) — le schermate di solswap in maggiore dettaglio
- [Pool schermate](/using-zcash/shielded-pools) — cosa sono le pool Ironwood/Orchard e come funzionano i destinatari
- [Chi può vedere il tuo pagamento Zcash?](/start-here/who-can-see-your-zcash-payment) — cosa nasconde effettivamente la schermatura
- [Portafogli](/wallets) — l'elenco; controlla l'etichetta **Ironwood: Pronto**
- [Exchange custodial (custodia di terzi)](/using-zcash/custodial-exchanges) — il compromesso che questo percorso evita
- [Recupero dei fondi](/using-zcash/recovering-funds) — cosa tenere al sicuro per non perdere mai l'accesso
