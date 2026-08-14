<a href="https://github.com/zechub/zechub/edit/main/site/Using_Zcash/Payment_Processors.md" target="_blank">
  <img src="https://img.shields.io/badge/Edit-blue" alt="Edit Page"/>
</a>

# Processori di pagamento Zcash

Modi per accettare ZEC come commerciante, messi a confronto fianco a fianco. Ogni voce è stata verificata rispetto al sito e all'API del fornitore stesso il **29 luglio 2026**.

Il supporto per gli asset privacy cambia spesso, quindi ogni riga riporta la propria data di verifica. Se stai leggendo questa pagina mesi dopo, controlla il sito del fornitore prima di integrare il servizio.

<div class="processor-table">

| Processor | Custody | Shielded ZEC | Self-host | Merchant fee | Regions / KYC | Verified |
|:--|:--|:--|:--|:--|:--|:--|
| [CipherPay](https://www.cipherpay.app) | Non-custodial | Sì, Orchard via Unified Addresses | Sì, open source | 1% per pagamento, gratis se self-hosted | Nessun KYC, regioni non indicate | 2026-07-29 |
| [BTCPay Server](https://github.com/btcpay-zcash/btcpayserver-zcash-plugin) | Non-custodial, solo view key | Sì, solo shielded (Sapling, Orchard, UA) | Sì, open source | Nessuna, paghi solo le commissioni di rete | Globale, nessun KYC | 2026-07-29 |
| [ZGo](https://zgo.cash/) | Non-custodial | Sì, Sapling e Orchard | No, servizio ospitato | Sessione prepagata, prezzo non pubblicato | Nessun KYC indicato, regioni non indicate | 2026-07-29 |
| [Flexa](https://flexa.co/) | Self-custody del cliente, il commerciante regola in fiat | Il cliente spende shielded, lato ricezione non documentato | No | 1% per pagamento | USA e 37 paesi SEPA, ZEC nell'UE non confermato | 2026-07-29 |
| [NOWPayments](https://nowpayments.io/supported-coins/zcash-payments) | Non-custodial per impostazione predefinita | No, solo indirizzo trasparente | No | 0,5%, oppure 1% con conversione | Globale salvo dove proibito, nessun KYC per iniziare | 2026-07-29 |
| [Plisio](https://plisio.net/accept-zcash) | Custodial, nonostante il marketing | Non documentato | No | 0,5% API, 1,5% white label | Nessun KYC per ricevere | 2026-07-29 |
| [Binance Pay](https://pay.binance.com/en) | Custodial, off-chain | No, i depositi shielded vengono rifiutati | No | Gratis da wallet a wallet, 0,8% per i payout | Con restrizioni geografiche, ZEC rimosso in FR, ES, IT, PL | 2026-07-29 |

</div>

### Cosa significano le colonne

**Custody** indica se il processore detiene il tuo ZEC. Non-custodial significa che va in un wallet che controlli tu.

**Shielded ZEC** indica se puoi ricevere pagamenti nel pool shielded. Solo trasparente significa che importo e indirizzi sono pubblici sulla blockchain.

**Self-host** indica se puoi eseguire il software da solo, senza un'azienda nel mezzo.

**Merchant fee** esclude le commissioni di rete di Zcash, che in ogni caso qualcuno deve pagare.

Quando un fornitore non pubblica qualcosa, la voce riporta "non indicato" o "non documentato" invece di tirare a indovinare. Non è la stessa cosa di "no".

### Quale scegliere

Per la massima privacy e il massimo controllo, usa **BTCPay Server** o una versione self-hosted di **CipherPay**. Entrambi supportano shielded, sono open source e non detengono fondi per te.

Per accettare pagamenti in un negozio fisico anziché online, usa **Flexa**.

Per un gateway ospitato in cui i pagamenti trasparenti sono accettabili, usa **NOWPayments** o **Plisio**.

Vale la pena ripetere una precisazione: un processore che supporta solo trasparente pubblica ogni importo pagato e ogni indirizzo sulla blockchain. E con qualsiasi processore ospitato non-custodial consegni la tua Viewing Key, quindi l'azienda può vedere i tuoi pagamenti anche se non può spenderli. Il self-hosting è l'unico modo per evitarlo.

<div class="processor-note">

**Avviso sul servizio ZGo, 29 luglio 2026.** Il backend di ZGo su api.zgo.cash ha restituito HTTP 503 su ogni endpoint mentre questa pagina veniva verificata. Il progetto non è abbandonato e il suo maintainer è stato attivo nella community questo mese, ma conferma che il servizio sia in funzione prima di farci affidamento.

</div>

---

## [CipherPay](https://www.cipherpay.app) <img src="/content-images/cipherpay-mark.png" alt="CipherPay logo" class="processor-logo" />
- **Support Type**: Shielded (Orchard, via Unified Addresses)
- **Description**: Accetta Zcash in pochi minuti, Non-custodial, Zero dati dell'acquirente, Nessun intermediario.
- **URL**: [CipherPay](https://www.cipherpay.app)
<img src="/content-images/cipherpay-mark.png" alt="CipherPay logo" width="200" hidden />

Fornisci a CipherPay una key di sola visualizzazione, quindi i pagamenti vanno direttamente al tuo wallet e il servizio non detiene mai i fondi. Usa un indirizzo nuovo per ogni fattura.

Solo Orchard. Non c'è supporto per Sapling né per il trasparente, anche se il README del repository menziona Sapling.

Costa l'1% per pagamento, e nulla se lo esegui tu stesso. L'intero progetto è open source, come binario Rust con SQLite o come immagine Docker. Non c'è KYC e gli acquirenti non hanno bisogno di un account.

Le integrazioni coprono Shopify, WooCommerce, una REST API, checkout ospitato, link di pagamento e QR di persona.

Ci sono due aspetti da valutare. È stato lanciato a febbraio 2026 e non ha un audit di sicurezza pubblicato. E nel piano ospitato l'operatore detiene la tua Viewing Key, quindi può vedere i tuoi pagamenti. Il self-hosting elimina questo problema. Anche i pagamenti shielded sono definitivi, quindi per un rimborso serve che l'acquirente ti fornisca un indirizzo.

**Ultima verifica:** 2026-07-29

---

## [BTCPay Server](https://github.com/btcpay-zcash/btcpayserver-zcash-plugin) <img src="/content-images/btcpay-mark.png" alt="BTCPay Server logo" class="processor-logo" />
- **Support Type**: Solo shielded (Sapling, Orchard, Unified Address)
- **Description**: BTCPay Server è un processore di pagamenti in criptovalute open source e self-hosted.
- **URL**: [BTCPay Server](https://github.com/btcpay-zcash/btcpayserver-zcash-plugin)
<img src="/content-images/btcpay-mark.png" alt="BTCPay Server logo" width="200" hidden />

L'opzione più forte sul piano della custodia. Il suo backend wallet è di sola visualizzazione e non detiene seed né chiavi segrete, quindi nemmeno un server compromesso può spendere il tuo denaro.

Solo shielded, con supporto per Sapling, Orchard e Unified Addresses. Non c'è un ripiego sul trasparente, quindi non pianificare contando su quello.

Per installarlo ti serve il fork Docker btcpay-zcash sul branch feat/zec, più una Viewing Key esportata da un wallet come Ywallet o Zingo. Per impostazione predefinita comunica con un lightwalletd remoto, oppure puoi eseguire tu stesso Zebra e lightwalletd.

Una limitazione da conoscere: il plugin usa un singolo wallet Zcash per tutti i negozi su un'istanza, quindi non eseguirlo su un server condiviso. Si sta lavorando a wallet separati per ogni negozio.

Non ci sono commissioni per il software in sé. Paghi le commissioni di rete Zcash e i costi del tuo hosting.

**Ultima verifica:** 2026-07-29

---

## [ZGo](https://zgo.cash/) <img src="/content-images/zgo-prp2-497679039b.webp" alt="ZGo logo" class="processor-logo" />
- **Support Type**: Shielded (Sapling e Orchard)
- **Description**: ZGo è una piattaforma di pagamento elettronico che va direttamente dal tuo cliente a te, senza terze parti coinvolte.
- **URL**: [ZGo](https://zgo.cash/)
<img src="/content-images/zgo-prp2-497679039b.webp" alt="ZGo logo" width="200" hidden />

Un registratore di cassa che esegui nel browser, così un laptop, un tablet o un telefono diventano il checkout. C'è anche un plugin WooCommerce e una REST API. È stato sviluppato da Vergara Technologies e finanziato da Zcash Community Grants, incluso il passaggio da zcashd a Zebra.

I fondi vanno direttamente dal cliente al tuo wallet, senza nessuno in mezzo.

Shielded, con supporto per Sapling e Orchard tramite Unified Addresses, e segue ZIP 321. Nessuna fonte attuale dice che gestisca indirizzi trasparenti, quindi questa pagina non afferma più che lo faccia.

Non puoi davvero ospitarlo da solo. ZGo gestisce per te l'infrastruttura Zcash e non pubblica alcuna guida di deployment. Il codice sorgente è pubblico sul server Git del maintainer, anche se la copia GitLab che di solito le persone trovano è un mirror obsoleto del 2022.

Non è neppure gratuito. ZGo vende sessioni prepagate e richiede una sessione Pro per WooCommerce, ma la pagina dei prezzi al momento è irraggiungibile, quindi qui non viene riportata alcuna cifra.

**Ultima verifica:** 2026-07-29

---

## [Flexa](https://flexa.co/) <img src="/content-images/flexa-mark.png" alt="Flexa logo" class="processor-logo" />
- **Support Type**: Il cliente spende shielded, lato ricezione non documentato
- **Description**: Flexa è una rete di pagamenti che consente ai clienti di spendere asset digitali, incluso Zcash, nei punti vendita da un wallet self-custody.
- **URL**: [Flexa](https://flexa.co/)
<img src="/content-images/flexa-mark.png" alt="Flexa logo" width="200" hidden />

Flexa non è un gateway di checkout, quindi non sostituisce gli altri presenti qui. Il cliente apre un wallet compatibile con Flexa come ZODL, mostra un codice monouso e il negozio lo scansiona. Non c'è una fattura in ZEC né un plugin e-commerce.

Il cliente mantiene il controllo delle proprie coin fino al momento del pagamento. Tu, come commerciante, non ricevi mai ZEC. Flexa regola il pagamento nella valuta che scegli, quindi la parte crypto è gestita da loro.

L'annuncio di Flexa descrive l'integrazione con Zcash come un pagamento con ZEC shielded. Il tipo di indirizzo verso cui Flexa riceve non è pubblicato da nessuna parte.

La commissione è dell'1% per pagamento, con conversione e custodia incluse senza costi aggiuntivi.

Funziona negli Stati Uniti e, da luglio 2026, in 37 paesi e territori SEPA. Non è indicato se in particolare ZEC possa essere speso in Europa.

**Ultima verifica:** 2026-07-29

---

## [NOWPayments](https://nowpayments.io/supported-coins/zcash-payments) <img src="/content-images/nowpayments-wordmark.png" alt="NOWPayments logo" class="processor-logo processor-logo-wide" />
- **Support Type**: Solo trasparente
- **Description**: NOWPayments è un gateway di pagamento crypto che consente ai commercianti di accettare facilmente pagamenti e donazioni in Zcash.
- **URL**: [NOWPayments](https://nowpayments.io/supported-coins/zcash-payments)
<img src="/content-images/nowpayments-wordmark.png" alt="NOWPayments logo" width="200" hidden />

Nessun supporto shielded. La loro documentazione ti dice di impostare un indirizzo trasparente per Zcash, e ZEC è l'unica coin per cui fanno questa precisazione. Ogni pagamento che ricevi è pubblico sulla blockchain.

Non-custodial per impostazione predefinita. Le loro FAQ dicono che non conservano fondi e non detengono mai chiavi private. Esiste un saldo custodial opzionale, quindi controlla le impostazioni del tuo account se hai bisogno di esserne sicuro.

Le commissioni sono dello 0,5% per un pagamento diretto, oppure dell'1% per pagamenti multivaluta, a tasso fisso o con "commissione pagata dall'utente", a cui si aggiungono le commissioni di rete.

Disponibile a livello globale tranne dove la legge lo vieta. Non hai bisogno di KYC per iniziare ad accettare crypto, ma solo per prelevare fiat.

**Ultima verifica:** 2026-07-29

---

## [Plisio](https://plisio.net/accept-zcash) <img src="/content-images/plisio-wordmark.png" alt="Plisio logo" class="processor-logo processor-logo-wide" />
- **Support Type**: Trasparente (non documentato)
- **Description**: Plisio è un gateway di pagamento in criptovalute che consente alle aziende di accettare pagamenti in Zcash.
- **URL**: [Plisio](https://plisio.net/accept-zcash)
<img src="/content-images/plisio-wordmark.png" alt="Plisio logo" width="200" hidden />

Consideralo custodial. Il marketing di Plisio lo definisce non-custodial, ma le sue stesse pagine di assistenza descrivono saldi detenuti sulla piattaforma, cold storage e una procedura di prelievo. L'affermazione non-custodial non ha potuto essere confermata.

Plisio non dice mai quali tipi di indirizzi Zcash usa, quindi assumi che sia trasparente finché qualcuno non conferma il contrario.

Il wallet è gratuito, il gateway e l'API costano lo 0,5%, e White Label l'1,5%. White Label è un rebrand del loro servizio ospitato, non self-hosting.

Non hai bisogno di KYC per ricevere pagamenti e non viene pubblicato alcun elenco dei paesi con restrizioni.

**Ultima verifica:** 2026-07-29

---

## [Binance Pay](https://pay.binance.com/en) <img src="/content-images/binancepay-mark.png" alt="Binance Pay logo" class="processor-logo" />
- **Support Type**: Solo trasparente, i depositi shielded vengono rifiutati
- **Description**: Binance Pay è una piattaforma di pagamento in criptovalute che supporta i pagamenti in Zcash.
- **URL**: [Binance Pay](https://pay.binance.com/en)
<img src="/content-images/binancepay-mark.png" alt="Binance Pay logo" width="200" hidden />

Binance rifiuta ZEC inviato da indirizzi shielded. Questo rifiuto è il motivo per cui sono stati creati gli indirizzi TEX.

È completamente custodial. I pagamenti si muovono off-chain tra wallet Binance Pay, e hai bisogno di un account Binance verificato.

I trasferimenti da wallet a wallet sono gratuiti, i payout per i commercianti costano lo 0,8% con un tetto massimo di 5 USD, e i commercianti Mini Program pagano l'1%.

Controlla la disponibilità nel tuo paese prima di farci affidamento. Binance Pay non è offerto in alcuni paesi e settori, ZEC è stato rimosso per gli utenti in Francia, Spagna, Italia e Polonia dal 2023, e il servizio nel SEE ha subito interruzioni sotto MiCA.

**Ultima verifica:** 2026-07-29

---

### Non accettano più ZEC

Entrambi erano elencati qui in precedenza. La lista live delle valute di ciascun fornitore è stata controllata il 29 luglio 2026 e Zcash non compare più in nessuna delle due.

**CoinPayments** non elenca ZEC nella sua lista coin v2, nella sua lista legacy né nella sua API live delle valute, e il suo articolo su Zcash ora reindirizza alla homepage.

**CoinGate** non elenca ZEC nella sua pagina delle valute supportate né nella sua API pubblica. Non è stato annunciato alcun delisting, quindi motivo e data sono sconosciuti.

Se uno dei due dovesse ripristinare Zcash, aggiungilo di nuovo con una nuova data di verifica.

### Come mantenere accurata questa pagina

Il supporto alle privacy coin cambia spesso, quindi questa pagina vale solo quanto il suo ultimo controllo. Quando la rivedi:

1. Controlla la lista delle valute o l'API del fornitore stesso. Le liste di terze parti erano obsolete per entrambi i processori rimossi sopra.
2. Controlla quali tipi di indirizzi Zcash sono supportati. "Supporta Zcash" di solito significa solo indirizzi trasparenti.
3. Aggiorna la data di verifica nella tabella e nella sezione di quel fornitore.
