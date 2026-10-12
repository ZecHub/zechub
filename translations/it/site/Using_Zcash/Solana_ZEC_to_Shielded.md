<a href="https://github.com/zechub/zechub/edit/main/site/Using_Zcash/Solana_ZEC_to_Shielded.md" target="_blank">
  <img src="https://img.shields.io/badge/Edit-blue" alt="Modifica pagina"/>
</a>

# Hai ZEC su Solana? Spostalo in Zcash schermati

Questa pagina fa per te se ZEC è apparso nel tuo wallet Solana perché possiedi ZCAT, o un altro token Solana che remunera i propri possessori in ZEC. Non devi vendere nulla per seguire questa procedura. Sposterai gli ZEC che già possiedi da Solana a un wallet Zcash, dove risulteranno schermati.

Abbiamo eseguito ogni passaggio qui sotto con un trasferimento reale il 27 settembre 2026, partendo da 0.00266336 ZEC in Phantom. Le commissioni, i tempi e le schermate in questa pagina sono quelli che abbiamo visto.

---

## Cosa possiedi effettivamente

Gli ZEC nel tuo wallet Solana sono un token su Solana, non monete sulla rete Zcash. Il OmniBridge di NEAR lo emette e detiene veri ZEC sulla catena Zcash a sua garanzia; il bridge è attivo su Solana dall'ottobre 2025. Il suo segmento Solana opera tramite messaggi Wormhole e NEAR Chain Signatures, non tramite un client leggero Zcash, quindi il lato Solana è affidabile solo quanto questi due sistemi. La gente lo chiama "ZEC cartaceo". Tiene il passo con il prezzo di ZEC, ma ogni saldo e ogni trasferimento si trova sul registro pubblico di Solana associato all'indirizzo del tuo wallet, e non può essere schermato finché rimane lì.

Verifica che il tuo sia il token autentico. In Phantom, tocca **ZEC** e scorri fino a **Informazioni su Zcash**. L'indirizzo del contratto deve essere:

```
A7bdiYdS5GjqGFtxf17ppRHtDKPkkRqbKtR27dxvQXaS
```

![Phantom's About Zcash panel showing the contract address A7bd…QXaS on the Solana network](/content-images/01-phantom-zec-mint-4a718bc213.webp)

Phantom lo abbrevia in `A7bd…QXaS`, quindi confronta il primo e l'ultimo carattere, oppure cerca l'indirizzo completo su [Solscan](https://solscan.io/token/A7bdiYdS5GjqGFtxf17ppRHtDKPkkRqbKtR27dxvQXaS). Qualsiasi altro token "ZEC" nel tuo wallet, qualunque ne sia il nome o il logo, non è questo. Lascialo stare.

---

## Perché spostarlo

Gli ZEC schermati sono lo scopo di Zcash. Quando i tuoi ZEC si trovano in un pool schermato, mittente, destinatario e importo di ogni pagamento sono cifrati sulla catena Zcash. Nessuno che consulti un explorer può vedere il tuo saldo.

Possiedi già ZEC. Spostarlo in un wallet Zcash ti dà la parte che lo rende Zcash e rimuove il bridge dall'equazione: gli ZEC nativi nel tuo wallet non dipendono dal fatto che qualcuno onori un rimborso.

[Chi può vedere il tuo pagamento in Zcash?](/start-here/who-can-see-your-zcash-payment) spiega esattamente cosa rimane nascosto.

---

## Scegli un wallet Zcash

ZecHub non ne sceglie uno per te. Scegli dalla [directory dei walletZecHub](/wallets) e verifica due etichette sulla scheda del wallet prima di installarlo:

- **Ironwood: pronto.** Ironwood è il pool in cui confluiscono i nuovi ZEC schermati dall'aggiornamento [Ironwood](/zcash-tech/ironwood) del 28 luglio 2026. Il vecchio pool Orchard non accetta più nuovi fondi.
- **Schermatura automatica.** Utile se un pagamento arriva in modo trasparente: il wallet sposta per te quegli ZEC nel pool schermato. Non considerare questa etichetta un sostituto di **Ironwood: pronto**. Un wallet può avere la schermatura automatica e non avere comunque un pool Ironwood (oggi Edge è in questa situazione nella directory). La maggior parte degli altri wallet mostra invece un pulsante **Schermatura**.

Installa il wallet dal link sulla sua scheda nella directory, non da un risultato di ricerca o da una pubblicità. Scrivi la frase seed su carta e conservala offline.

Il tuo wallet mostra due tipi di indirizzo:

![A Zcash wallet's Receive screen with a shielded address starting u1 and a transparent address starting t1](/content-images/02-zodl-receive-c98cd378fb.webp)

| Inizia con | Tipo | Cosa vede il pubblico |
|---|---|---|
| `u1` | Unified Address | Nulla su di te, ma solo quando il pagamento arriva in un pool schermato |
| `t1` | Indirizzo trasparente | Il tuo indirizzo e l'importo, per sempre, come su Solana |

Usa un `u1` che il tuo wallet identifica come schermato. Un `u1` è un insieme di ricevitori e alcuni wallet vi inseriscono un ricevitore trasparente accanto a quello schermato. Un mittente che può pagare solo indirizzi trasparenti userà quello, e il tuo pagamento arriverà pubblicamente anche se hai incollato un `u1`. L'indirizzo schermato del wallet usato per il nostro test non ha un ricevitore trasparente, quindi ciò non poteva accadere. [Pool schermati](/using-zcash/shielded-pools) approfondisce i ricevitori. Alcuni wallet mostrano un nuovo `u1` ogni volta che apri Ricevi; è normale e appartengono tutti a te. La schermata di ricezione e il campo del destinatario di near.com in questa pagina usano per questo motivo prefissi `u1` diversi.

Per il nostro test abbiamo usato ZODL perché era il wallet che avevamo configurato. Solo i wallet che la directory contrassegna come **Ironwood: pronti** possono ricevere nuovo valore schermato.

---

## Spostalo

Il percorso è composto da due parti: deposita i tuoi ZEC in NEAR Intents da Phantom, quindi inviali al tuo indirizzo Zcash. Per la prima parte abbiamo usato [solswap.org](https://solswap.org), un sito realizzato da NEAR per gli utenti Solana, e per la seconda [near.com](https://near.com), l'app di NEAR. La guida di ZecHub, [Come scambiare ZEC nel wallet Phantom](/using-zcash/solswap), descrive più nel dettaglio le schermate di solswap. Non usare il pulsante **Swap** di Phantom per questo: possiedi già il token e scambiarlo non ti porta da nessuna parte.

Tieni un po' di SOL in Phantom per la commissione di Solana.

### 1. Deposita i tuoi ZEC su solswap.org

1. Apri Phantom, vai alla scheda del browser, digita tu stesso `solswap.org` e collega il tuo wallet.
2. Tocca **Deposita**. Imposta **Asset** su **Zcash**, **Network** su **Solana** e il metodo su **Wallet**.
3. Inserisci l'importo (oppure tocca **Max**) e approva la transazione in Phantom.

![solswap Deposit screen with Zcash as the asset, Solana as the network and Wallet as the method](/content-images/03-solswap-deposit-425691e62f.webp)

Il nostro deposito è arrivato nel blocco Solana alle 15:09:08 (UTC+1) e solswap lo ha mostrato come **Completato** nove secondi dopo.

![solswap deposit history showing Completed, +0.0026 ZEC](/content-images/04-solswap-deposit-complete-be5feaf758.webp)

I tuoi ZEC ora si trovano nel tuo saldo NEAR Intents. La tua chiave Phantom autorizza ogni movimento in uscita, i solver NEAR Intents eseguono la consegna e NEAR Intents può trattenere un saldo per una verifica di conformità (vedi le note sulla fiducia qui sotto).

### 2. Invialo al tuo indirizzo Zcash su near.com

solswap ha anche una pagina **Prelievo**, ma per noi non ha funzionato. **Importo ricevuto** e **Commissione** restavano su "–" e il pulsante non faceva nulla, sia scegliendo Zcash sia Solana come rete.

![solswap Withdraw form with the received amount and fee stuck at a dash](/content-images/05-solswap-withdraw-blank-92c6e64c65.webp)

Se succede anche a te, i tuoi ZEC non sono bloccati. Il saldo è legato alla chiave del tuo wallet, non al sito web, quindi qualunque app NEAR Intents a cui accedi con quel wallet può raggiungerlo. Abbiamo concluso su near.com:

1. Vai su `near.com` e accedi con lo stesso wallet Phantom.
2. Il tuo saldo solswap compare sotto **Sposta asset legacy** (near.com chiama "legacy" i saldi delle app NEAR Intents meno recenti). Tocca **Preleva** nella riga ZEC. Non hai bisogno di **Sposta**.

![near.com Move legacy assets page listing 0.0026 ZEC with Move and Withdraw buttons](/content-images/06-nearcom-legacy-assets-7ee16c5ac4.webp)

3. Imposta **Network** su **Zcash**, incolla l'indirizzo `u1` del tuo wallet come **Destinatario** e confronta i primi e gli ultimi sei caratteri con quelli nel tuo wallet.

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
| ZEC ricevuti nel wallet Zcash | 0.00241336 ZEC, schermati |
| Costo sul lato ZEC | 0.00025 ZEC (near.com mostrava "Commissione 0 ZEC"; il costo è incluso nel preventivo) |
| SOL spesi per il deposito | 0.00156844 SOL, di cui 0.00008 SOL di commissione di rete |
| Minimo | Nessuno raggiunto. solswap indicava un deposito minimo di 0.00000001 ZEC e near.com ha accettato 0.0026 ZEC |
| Deposito, da Phantom a solswap | 9 secondi |
| Prelievo, dalla firma su near.com a ZEC nel wallet Zcash | Circa 8 minuti (near.com ne stimava circa 2) |

Record: deposito Solana [5ijsgRrh…AjLkx](https://solscan.io/tx/5ijsgRrhViNTtFMmnsfJDSo3HhRmt3Ri7WB513oBoQLxfGNswDxvHnakwW1yyqXznTTCSxnUkooAHDKowz9AjLkx), NEAR Intents [79c23cfd…a405a9](https://explorer.near-intents.org/transactions/79c23cfd43928de5522c182e26f8f052dc9c43d53430ca497b40e016a6a405a9), Zcash [28d6da27…481034](https://mainnet.zcashexplorer.app/transactions/28d6da27d74dc91e45175a7aff6023bc85578603dd77f1b49782a28f8f481034) nel blocco 3,498,141. Commissioni e tempi variano con il carico della rete, quindi la schermata di revisione fa fede quando effettui l'operazione.

Il bridge di NEAR pubblica un minimo di 0.01 ZEC e una commissione di 0.00047 ZEC per i suoi prelievi standard Zcash. near.com non ha applicato nessuno dei due alla nostra operazione da 0.0026 ZEC. Se un'app rifiuta un piccolo importo, prova near.com prima di aggiungere fondi.

### Altri percorsi e di cosa si fidano

Ogni percorso in uscita da Solana si fida di OmniBridge, perché il bridge detiene gli ZEC a garanzia del tuo token. Inoltre:

- **Il percorso sopra** si fida di NEAR Intents. La tua firma autorizza il trasferimento, i solver consegnano gli ZEC sul lato Zcash e NEAR Intents può trattenere fondi per una verifica di conformità; nel 2026 un possessore di Zcash ha [segnalato un grande scambio trattenuto per settimane](https://www.cryptotimes.io/2026/09/11/zcash-holder-says-589k-usdt-stuck-on-near-intents-50-days-after-zodl-swap/). Colleghi inoltre il tuo wallet a due siti web, quindi controlla ogni volta la barra degli indirizzi.
- **Wallet con NEAR Intents integrato** (cerca la funzionalità NEAR Intents nella [directory](/wallets)) usano lo stesso sistema dall'interno del wallet Zcash. Stessa fiducia, meno siti web. Non lo abbiamo testato con ZEC su Solana.
- **Un exchange**, soltanto se accetta depositi di questo token sulla rete Solana, cosa che la maggior parte non fa. Cedi la custodia e solitamente la tua identità, e molti exchange inviano ZEC solo a indirizzi `t1`. Vedi [exchange custodial](/using-zcash/custodial-exchanges).

---

## Schermalo e verifica

È arrivato schermato. I nostri ZEC sono andati a un indirizzo `u1` e sono arrivati direttamente nel pool schermato Ironwood. Non c'è stato alcun passaggio trasparente e nulla da schermare manualmente. Il wallet lo ha elencato come **In ricezione…** con un'icona di schermatura alle 16:07 (UTC+1), mentre raccoglieva le conferme.

![Zcash wallet activity showing Receiving 0.00241336 ZEC with a shield icon](/content-images/12-zodl-receiving-cb9f41511d.webp)

Per verificarlo, apri la transazione nel tuo wallet e copia l'ID della transazione.

![Zcash wallet transaction details with the transaction ID and timestamp](/content-images/13-zodl-tx-details-b08434d680.webp)

Incollalo in [l'explorer di blocchi Zcash](https://mainnet.zcashexplorer.app). Non lasciarti confondere dal riepilogo. Il nostro riporta **Input / output schermati 0 / 0** e **Trasferito dal/al pool schermato 0.0 ZEC**, perché il riepilogo dell'explorer non conta ancora Ironwood. Gli indirizzi `t1` che vedi sono sul lato di invio (gli ZEC che ha speso e il resto che ha conservato), non sono i tuoi.

![Explorer summary for the transaction: two transparent inputs, one transparent output, 0/0 shielded](/content-images/14-explorer-summary-6153afb265.webp)

Fai clic su **Raw TX: JSON** e cerca `ironwood`. Un `valueBalance` negativo lì indica gli ZEC che entrano nel pool Ironwood. Il nostro era `-0.00241336`, esattamente quanto arrivato, e nella transazione nulla mostra chi lo abbia ricevuto.

![Raw transaction JSON with the ironwood section highlighted: valueBalance -0.00241336 (highlight added)](/content-images/15-explorer-raw-ironwood-8ff8ae0892.webp)

[Cosa può vedere un block explorer](/zcash-tech/what-a-block-explorer-can-see) spiega gli altri campi.

### Se incolli un indirizzo `t1`

Non ne abbiamo usato uno per l'invio, ma il risultato è prevedibile. Gli ZEC arrivano nel saldo trasparente del tuo wallet e l'explorer mostra per sempre a chiunque il tuo indirizzo `t1` e l'importo. Un wallet con schermatura automatica lo sposta quindi nel pool schermato; altrimenti tocca **Schermatura**, che costa una piccola commissione di rete. Anche la transazione di schermatura è pubblica, poiché spende dal tuo indirizzo `t1`. Non si perde nulla, ma il collegamento tra quel deposito e il tuo wallet resta sulla catena. Incolla il `u1`.

---

## Rimani al sicuro

I nuovi possessori sono bersagli mirati. Quasi ogni truffa che vedrai rientra in una di queste categorie:

- **Tipo di indirizzo errato.** Un indirizzo Zcash inizia con `u1`, `t1`, `zs` o `tex1`. Un indirizzo Solana non ha nessuno di questi prefissi. Non inviare mai ZEC nativi a un indirizzo Solana e non inviare mai il token Solana a un indirizzo Zcash.
- **Servizi solo trasparenti.** Alcuni bridge, siti di swap ed exchange possono inviare solo a indirizzi `t1`. Va bene se schermi gli ZEC non appena arrivano. Non lasciarli lì.
- **Wallet falsi.** Installa soltanto dal link sulla scheda della [directory dei wallet](/wallets) o dalla pagina ufficiale dell'app store a cui rimanda. Le app di wallet crypto false riescono a entrare negli app store e sembrano identiche a quelle autentiche.
- **Phishing della frase seed.** Nessun wallet, bridge, sito di swap, addetto al supporto, moderatore o airdrop ha mai bisogno della tua frase seed. Firmare un messaggio non comporta mai di digitarla. Chiunque te la chieda sta cercando di derubarti. [Recuperare fondi](/using-zcash/recovering-funds) tratta la variante di questa truffa "recupereremo il tuo wallet".
- **Token truffaldini e siti di "claim".** Token chiamati ZEC, Zcash o qualcosa di simile compaiono senza richiesta nei wallet Solana, spesso con un link per "claimare" altro. Collegare il tuo wallet a quel link può svuotarlo. Controlla l'indirizzo del contratto all'inizio di questa pagina e ignora tutto il resto.
- **Richieste di firma malevole.** Una richiesta "Firma messaggio" può spostare il tuo saldo NEAR Intents senza alcuna commissione SOL. Firma solo su `near.com` o `solswap.org` e solo quando il messaggio nomina `intents.near` (il passaggio 5 sopra mostra cosa verificare).
- **Siti contraffatti.** Digita tu stesso `solswap.org` e `near.com` oppure usa i segnalibri. Non seguire link da messaggi diretti, risposte o pubblicità.

---

## Cosa fare con gli ZEC schermati

- Mantienili privati quando li spendi: [Usare ZEC privatamente](/guides/using-zec-privately)
- Trova luoghi che li accettano: [Luoghi in cui spendere ZEC](/using-zcash/spend-zcash/top-10-places-to-spend-zec)
- Invali con un messaggio privato allegato: [Memo](/using-zcash/memos)
- Paga qualcuno senza collegare la tua identità: [Invia denaro senza collegare l'identità](/zcash-use-cases/send-money-without-linking-identity)
