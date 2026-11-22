<a href="https://github.com/zechub/zechub/edit/main/site/Using_Zcash/Payment_Processors.md" target="_blank">
  <img src="https://img.shields.io/badge/Edit-blue" alt="Edit Page"/>
</a>

# Processori di pagamento di Zcash

Modi per accettare ZEC come commerciante, confrontati fianco a fianco. Ogni voce è stata verificata sul sito e sull'API del fornitore stesso il **29 luglio 2026**, tranne Zcash Payment Service, aggiunta il **1 novembre 2026**.

Il supporto per gli asset privacy cambia spesso, quindi ogni riga porta la propria data di verifica. Se stai leggendo questa pagina mesi dopo, controlla il sito del fornitore prima di integrarlo.

<div class="processor-table">

| Processore | Custodia | ZEC schermato | Self-host | Commissione merchant | Regioni / KYC | Verificato |
|:--|:--|:--|:--|:--|:--|:--|
| [CipherPay](https://www.cipherpay.app) | Non-custodial (senza custodia di terzi) | Sì, Orchard tramite indirizzi unificati | Sì, open source | 1% per pagamento, gratis se self-hosted | Nessun KYC, regioni non indicate | 2026-07-29 |
| [BTCPay Server](https://github.com/btcpay-zcash/btcpayserver-zcash-plugin) | Non-custodial, solo chiavi di visualizzazione | Sì, solo schermato (Sapling, Orchard, UA) | Sì, open source | Nessuna, paghi solo le commissioni di rete | Globale, nessun KYC | 2026-07-29 |
| [Zcash Payment Service](https://github.com/nerdcash/zcash-payment-service) | Non-custodial, solo chiavi di visualizzazione in entrata | Sì, solo schermato (Sapling e Orchard) | Sì, solo self-hosted, open source | Nessuna, paghi solo le commissioni di rete | Nessun account, nessun KYC | 2026-11-01 |
| [ZGo](https://zgo.cash/) | Non-custodial | Sì, Sapling e Orchard | No, servizio in hosting | Sessione prepagata, prezzo non pubblicato | Nessun KYC indicato, regioni non indicate | 2026-07-29 |
| [Flexa](https://flexa.co/) | Autocustodia del cliente, regolamento al merchant in fiat | Il cliente spende in schermato, lato di ricezione non documentato | No | 1% per pagamento | USA e 37 paesi SEPA, ZEC in UE non confermato | 2026-07-29 |
| [NOWPayments](https://nowpayments.io/supported-coins/zcash-payments) | Non-custodial per impostazione predefinita | No, solo indirizzo trasparente | No | 0,5%, oppure 1% con conversione | Globale tranne dove vietato, nessun KYC per iniziare | 2026-07-29 |
| [Plisio — pagamenti sospesi](https://plisio.net/) | Custodial, nonostante il marketing | Non documentato | No | 0,5% API, 1,5% white label | Nessun KYC per ricevere | 2026-07-29 |
| [Binance Pay](https://pay.binance.com/en) | Custodial, off-chain | No, depositi schermati rifiutati | No | Gratis da portafoglio a portafoglio, 0,8% sui payout | Con restrizioni geografiche, ZEC delisted in FR, ES, IT, PL | 2026-07-29 |

</div>

### Cosa significano le colonne

**Custodia** indica se il processore detiene i tuoi ZEC. Non-custodial significa che vanno in un portafoglio che controlli tu.

**ZEC schermato** indica se puoi essere pagato nella pool schermata. Solo trasparente significa che l'importo e gli indirizzi sono pubblici sulla blockchain.

**Self-host** indica se puoi eseguire il software tu stesso, senza alcuna azienda di mezzo.

**Commissione merchant** esclude le commissioni di rete in Zcash, che qualcuno paga in ogni caso.

Quando un fornitore non pubblica qualcosa, la voce dice "non indicato" o "non documentato" invece di tirare a indovinare. Non è la stessa cosa di "no".

### Quale scegliere

Per la massima privacy e il massimo controllo, usa **BTCPay Server**, un **CipherPay** self-hosted, oppure **Zcash Payment Service** se puoi aggiungere un po' di codice al tuo sito. Tutti e tre supportano i pagamenti schermati, sono open source e non custodiscono fondi per te.

Per accettare pagamenti in un negozio fisico invece che online, usa **Flexa**.

Per un gateway in hosting in cui i pagamenti trasparenti sono accettabili, usa **NOWPayments**. **Plisio** ha sospeso i pagamenti (vedi l'avviso con data nella sua voce qui sotto), quindi per ora non sceglierlo.

Un'avvertenza che vale la pena ripetere: un processore solo trasparente pubblica sulla blockchain l'importo e l'indirizzo di ogni pagamento. E con qualsiasi processore non-custodial in hosting consegni le tue chiavi di visualizzazione, quindi l'azienda può vedere i tuoi pagamenti anche se non può spenderli. Il self-hosting è l'unico modo per evitarlo.

<div class="processor-note">

**Avviso di servizio per ZGo, 29 luglio 2026.** Il backend ZGo su api.zgo.cash ha restituito HTTP 503 su ogni endpoint mentre questa pagina veniva verificata. Il progetto non è abbandonato e chi lo mantiene è stato attivo nella community questo mese, ma conferma che il servizio sia operativo prima di fare affidamento su di esso.

</div>

---

## [CipherPay](https://www.cipherpay.app) <img src="/content-images/cipherpay-mark.png" alt="CipherPay logo" class="processor-logo" />
- **Tipo di supporto**: Schermato (Orchard, tramite indirizzi unificati)
- **Descrizione**: Accetta Zcash in pochi minuti, Non-custodial, Zero dati sull'acquirente, Nessun intermediario.
- **URL**: [CipherPay](https://www.cipherpay.app)
<img src="/content-images/cipherpay-mark.png" alt="CipherPay logo" width="200" hidden />

Dai a CipherPay una chiave di sola visualizzazione, quindi i pagamenti vanno dritti al tuo portafoglio e lui non detiene mai fondi. Usa un indirizzo nuovo per ogni fattura.

Solo Orchard. Non c'è supporto per Sapling o per gli indirizzi trasparenti, anche se il README del repository menziona Sapling.

Costa l'1% per pagamento, e niente affatto se lo esegui tu. Tutto è open source, come binario Rust con SQLite o come immagine Docker. Non c'è KYC, e gli acquirenti non hanno bisogno di un account.

Le integrazioni coprono Shopify, WooCommerce, un'API REST, checkout in hosting, link di pagamento e codici QR di persona.

Due cose da valutare. È stato lanciato a febbraio 2026 e non ha alcun audit di sicurezza pubblicato. E sul tier in hosting l'operatore detiene le tue chiavi di visualizzazione, quindi può vedere i tuoi pagamenti. Il self-hosting elimina questo problema. I pagamenti schermati sono anche definitivi, quindi per un rimborso l'acquirente deve darti un indirizzo.

**Ultima verifica:** 2026-07-29

---

## [BTCPay Server](https://github.com/btcpay-zcash/btcpayserver-zcash-plugin) <img src="/content-images/btcpay-mark.png" alt="BTCPay Server logo" class="processor-logo" />
- **Tipo di supporto**: Solo schermato (Sapling, Orchard, indirizzo unificato)
- **Descrizione**: BTCPay Server è un processore di pagamenti in criptovalute open source e self-hosted.
- **URL**: [BTCPay Server](https://github.com/btcpay-zcash/btcpayserver-zcash-plugin)
<img src="/content-images/btcpay-mark.png" alt="BTCPay Server logo" width="200" hidden />

L'opzione più solida per quanto riguarda la custodia. Il suo backend del portafoglio è di sola visualizzazione e non detiene né seed né chiave segreta, quindi anche un server compromesso non può spendere i tuoi soldi.

Solo schermato, copre Sapling, Orchard e gli indirizzi unificati. Non c'è un ripiego trasparente, quindi non pianificare contandoci.

Per installarlo ti serve il fork btcpay-zcash Docker sul branch feat/zec, più le chiavi di visualizzazione esportate da un portafoglio come Zkool o Zingo. Per impostazione predefinita si collega a un lightwalletd remoto, oppure puoi eseguire Zebra e lightwalletd tu stesso.

Una limitazione da conoscere: il plugin usa un solo portafoglio Zcash per ogni negozio su un'istanza, quindi non eseguirlo su un server condiviso. I portafogli per singolo negozio sono in fase di lavorazione.

Il software in sé non ha commissioni. Paghi le commissioni di rete in Zcash e quanto costa il tuo hosting.

**Ultima verifica:** 2026-07-29

---

## [Zcash Payment Service](https://github.com/nerdcash/zcash-payment-service)
- **Tipo di supporto**: Solo schermato (Sapling e Orchard)
- **Descrizione**: Un processore di pagamenti di Zcash gratuito e self-hosted per merchant online, eseguito come container Docker o incorporato come crate Rust.
- **URL**: [Zcash Payment Service](https://github.com/nerdcash/zcash-payment-service)

Un processore gratuito e open source (MIT) creato da Andrew Arnott, che lo usa già per pagamenti reali nella sua app.

Detiene soltanto una chiave di visualizzazione in entrata (una UIVK). Può vedere l'arrivo dei pagamenti ma non può spenderli, quindi anche un server compromesso non può muovere i tuoi fondi. La chiave resta sul tuo server, quindi nemmeno un'azienda vede i tuoi pagamenti.

Ogni checkout riceve un indirizzo unificato nuovo con receiver Sapling e Orchard e nessuno trasparente. I pagamenti vanno dritti al tuo portafoglio.

Non ci sono commissioni, né account né contatori di utilizzo. Paghi le commissioni di rete in Zcash e il tuo hosting.

È solo self-hosted: un container Docker, oppure una crate Rust dentro un'app che esegui già. Legge la chain da un server lightwalletd che scegli tu, quindi non ti serve un full node (nodo completo).

Configurarlo richiede codice, non un plugin. Il tuo sito chiede al servizio un indirizzo di pagamento e un codice QR al checkout, e il servizio avvisa il tuo sito quando arrivano i soldi tramite webhook firmati. Esiste un client npm per i backend JavaScript e TypeScript, e uno [store demo](https://github.com/nerdcash/zcash-payment-demo-store) open source da cui copiare. Non esiste un plugin per Shopify o WooCommerce, quindi ti serve il controllo del codice del tuo sito, oppure uno sviluppatore che ce l'ha.

Cose da valutare. È nuovo: il repository è partito a giugno 2026, il client npm è alla versione 0.1, non ci sono ancora release taggate e non c'è alcun audit di sicurezza pubblicato. La sua API non ha un login proprio, quindi tienila su una rete privata e non aprirla mai a internet. E come per qualsiasi pagamento schermato, per un rimborso l'acquirente deve darti un indirizzo.

**Ultima verifica:** 2026-11-01

---

## [ZGo](https://zgo.cash/) <img src="/content-images/zgo-prp2-497679039b.webp" alt="ZGo logo" class="processor-logo" />
- **Tipo di supporto**: Schermato (Sapling e Orchard)
- **Descrizione**: ZGo è una piattaforma di pagamento elettronico che va direttamente dal tuo cliente a te, senza terze parti di mezzo.
- **URL**: [ZGo](https://zgo.cash/)
<img src="/content-images/zgo-prp2-497679039b.webp" alt="ZGo logo" width="200" hidden />

Una cassa che esegui in un browser, così un laptop, un tablet o un telefono diventano il checkout. Esiste anche un plugin WooCommerce e un'API REST. È stato creato da Vergara Technologies e finanziato da Zcash Community Grants, incluso il passaggio da zcashd a Zebra.

I fondi vanno dal cliente dritti al tuo portafoglio, senza nessuno di mezzo.

Schermato, copre Sapling e Orchard tramite indirizzi unificati, e segue la ZIP 321. Nessuna fonte attuale dice che gestisca indirizzi trasparenti, quindi questa pagina non lo afferma più.

In pratica non puoi farne il self-hosting. ZGo esegue per te l'infrastruttura Zcash e non pubblica nessuna guida di deployment. Il codice sorgente è pubblico sul server Git di chi mantiene il progetto, anche se la copia su GitLab che di solito si trova è uno specchio fermo al 2022.

Non è gratuito nemmeno questo. ZGo vende sessioni prepagate e richiede una sessione Pro per WooCommerce, ma la pagina dei prezzi al momento non è raggiungibile, quindi qui non viene citata alcuna cifra.

**Ultima verifica:** 2026-07-29

---

## [Flexa](https://flexa.co/) <img src="/content-images/flexa-mark.png" alt="Flexa logo" class="processor-logo" />
- **Tipo di supporto**: Il cliente spende in schermato, lato di ricezione non documentato
- **Descrizione**: Flexa è una rete di pagamenti che permette ai clienti di spendere asset digitali, tra cui Zcash, nei punti vendita da un portafoglio in autocustodia.
- **URL**: [Flexa](https://flexa.co/)
<img src="/content-images/flexa-mark.png" alt="Flexa logo" width="200" hidden />

Flexa non è un gateway di checkout, quindi non è uno scambio per gli altri elencati qui. Il cliente apre un portafoglio che supporta Flexa, come Zodl, mostra un codice monouso e il negozio lo scansiona. Non c'è né una fattura ZEC né un plugin per l'e-commerce.

Il cliente tiene le proprie monete fino al momento del pagamento. Tu come merchant non ricevi mai ZEC. Flexa si regola con te nella valuta che scegli, quindi la parte crypto è gestita da loro.

L'annuncio dello stesso Flexa descrive l'integrazione di Zcash come un pagare con ZEC schermato. Il tipo di indirizzo su cui Flexa riceve non è pubblicato da nessuna parte.

La commissione è dell'1% per pagamento, con conversione e custodia incluse senza costi aggiuntivi.

Funziona negli Stati Uniti e, da luglio 2026, in 37 paesi e territori SEPA. Non è indicato se in particolare ZEC possa essere speso in Europa.

**Ultima verifica:** 2026-07-29

---

## [NOWPayments](https://nowpayments.io/supported-coins/zcash-payments) <img src="/content-images/nowpayments-wordmark.png" alt="NOWPayments logo" class="processor-logo processor-logo-wide" />
- **Tipo di supporto**: Solo trasparente
- **Descrizione**: NOWPayments è un gateway di pagamento in criptovalute che permette ai merchant di accettare facilmente pagamenti e donazioni Zcash.
- **URL**: [NOWPayments](https://nowpayments.io/supported-coins/zcash-payments)
<img src="/content-images/nowpayments-wordmark.png" alt="NOWPayments logo" width="200" hidden />

Nessun supporto schermato. La loro documentazione ti dice di impostare un indirizzo trasparente per Zcash, e ZEC è l'unica moneta che mettono in evidenza in questo modo. Ogni pagamento che ricevi è pubblico sulla blockchain.

Non-custodial per impostazione predefinita. La loro FAQ dice che non conservano fondi e non detengono mai chiavi private. Esiste un saldo di custodia opzionale, quindi controlla le impostazioni del tuo account se devi esserne certo.

Le commissioni sono dello 0,5% per un pagamento semplice, oppure dell'1% per pagamenti multivaluta, a tasso fisso o con "commissione a carico dell'utente", con le commissioni di rete sopra.

Disponibile a livello globale tranne dove la legge lo vieta. Non ti serve il KYC per iniziare ad accettare criptovalute, solo per prelevare fiat.

**Ultima verifica:** 2026-07-29

---

## [Plisio](https://plisio.net/) <img src="/content-images/plisio-wordmark.png" alt="Plisio logo" class="processor-logo processor-logo-wide" />

> **Pagamenti sospesi — verificato il 12 novembre 2026.** La [homepage](https://plisio.net/) di Plisio dice che i pagamenti in entrata e in uscita sono temporaneamente sospesi mentre sono in corso lavori di ripristino. Verifica con il fornitore prima di inviare fondi. La pagina specifica per Zcash al momento restituisce 404; questo non dimostra che ZEC sia stato delisted. I dettagli su commissioni, custodia e indirizzi supportati qui sotto sono stati esaminati l'ultima volta il 29 luglio 2026 e non sono stati riverificati.

- **Tipo di supporto**: Trasparente (non documentato)
- **Descrizione**: Plisio è un gateway di pagamento in criptovalute che ha elencato il supporto per Zcash. L'elaborazione dei pagamenti è attualmente sospesa; vedi l'avviso con data qui sopra.
- **URL**: [Plisio](https://plisio.net/)
<img src="/content-images/plisio-wordmark.png" alt="Plisio logo" width="200" hidden />

Trattalo come custodial. Il marketing di Plisio lo definisce non-custodial, ma le sue stesse pagine di aiuto descrivono saldi detenuti sulla piattaforma, cold storage e un processo di prelievo. Non è stato possibile confermare l'affermazione non-custodial.

Plisio non dice mai quali tipi di indirizzo Zcash usa, quindi assumi che siano trasparenti finché qualcuno non conferma il contrario.

Il portafoglio è gratuito, il gateway e l'API costano lo 0,5%, e White Label costa l'1,5%. White Label è un rebrand del loro servizio in hosting, non un self-hosting.

Non ti serve il KYC per ricevere pagamenti, e non viene pubblicato nessun elenco di paesi con restrizioni.

**Ultima verifica:** 2026-07-29

---

## [Binance Pay](https://pay.binance.com/en) <img src="/content-images/binancepay-mark.png" alt="Binance Pay logo" class="processor-logo" />
- **Tipo di supporto**: Solo trasparente, depositi schermati rifiutati
- **Descrizione**: Binance Pay è una piattaforma di pagamento in criptovalute che supporta pagamenti Zcash.
- **URL**: [Binance Pay](https://pay.binance.com/en)
<img src="/content-images/binancepay-mark.png" alt="Binance Pay logo" width="200" hidden />

Binance respinge ZEC inviato da indirizzi schermati. Quel rifiuto è il motivo per cui sono stati creati gli indirizzi TEX.

È completamente custodial. I pagamenti si muovono off-chain tra portafogli Binance Pay, e ti serve un account Binance verificato.

I trasferimenti da portafoglio a portafoglio sono gratuiti, i payout per i merchant costano lo 0,8% con un tetto di 5 USD, e i merchant Mini Program pagano l'1%.

Verifica la disponibilità dove ti trovi prima di dipenderci. Binance Pay non è offerto in alcuni paesi e settori, ZEC è stato delisted per gli utenti di Francia, Spagna, Italia e Polonia dal 2023, e il servizio nello SEE ha subito interruzioni sotto MiCA.

**Ultima verifica:** 2026-07-29

---

### Non accettano più ZEC

Entrambi erano elencati qui in passato. L'elenco valute live di ciascun fornitore è stato controllato il 29 luglio 2026 e Zcash è sparito da entrambi.

**CoinPayments** non elenca ZEC nel suo elenco monete v2, nel suo elenco legacy o nella sua API delle valute live, e il suo articolo su Zcash ora reindirizza alla homepage.

**CoinGate** non elenca ZEC nella sua pagina delle valute supportate né nella sua API pubblica. Nessun delisting è stato annunciato, quindi motivo e data sono sconosciuti.

Se uno dei due reintroduce Zcash, aggiungilo di nuovo con una data di verifica recente.

### Mantenere questa pagina accurata

Il supporto per le privacy coin si sposta di continuo, quindi questa pagina vale solo quanto la sua ultima verifica. Quando la rileggi:

1. Controlla l'elenco valute del fornitore stesso o la sua API. Gli elenchi di terze parti erano obsoleti per entrambi i processori rimossi sopra.
2. Controlla quali tipi di indirizzo Zcash sono supportati. "Supporta Zcash" di solito significa solo indirizzi trasparenti.
3. Aggiorna la data di verifica nella tabella e nella sezione di quel fornitore.
