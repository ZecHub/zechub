<a href="https://github.com/zechub/zechub/edit/main/site/guides/Zgo_Payment_Processor.md" target="_blank">
  <img src="https://img.shields.io/badge/Edit-blue" alt="Edit Page"/>
</a>

# ZGo Payment Processor: accettare Zcash senza custodia

ZGo è un payment processor non-custodial per Zcash. Un cliente paga in ZEC dal proprio wallet, ZGo monitora la blockchain di Zcash in attesa della transazione, e i fondi arrivano direttamente nel wallet del commerciante tramite un trasferimento schermato. ZGo non detiene mai il denaro nel frattempo.

Questa guida spiega come funziona il flusso di pagamento, come configurare un account e come integrare ZGo con Xero e WooCommerce. Copre inoltre i due errori che causano la maggior parte dei problemi al primo setup.

## In questa pagina

1. [Perché usare ZGo](#perché-usare-zgo)
2. [Come funziona ZGo](#come-funziona-zgo)
3. [Configurare un account](#configurare-un-account)
4. [ZGo con Xero](#zgo-con-xero)
5. [ZGo con WooCommerce](#zgo-con-woocommerce)
6. [Funzionalità](#funzionalità)
7. [Errori comuni](#errori-comuni)
8. [Conclusione](#conclusione)
9. [Risorse](#risorse)

## Perché usare ZGo

La maggior parte dei payment processor di criptovalute è custodial. I fondi finiscono prima nell'account del processor e vengono inoltrati al commerciante in un secondo momento, il che significa che una terza parte controlla temporaneamente il denaro e può congelarlo, ritardarlo o segnalarlo.

ZGo adotta l'approccio opposto. I pagamenti si spostano dal wallet del cliente direttamente al wallet del commerciante tramite una transazione schermata Zcash. Il processor genera solo la fattura e osserva la blockchain in attesa della conferma. Non c'è alcun saldo intermedio, nessun flusso di prelievo e nessuna terza parte che possa bloccare il regolamento.

Per un commerciante, questo significa tre cose pratiche: piena custodia degli ZEC in entrata, privacy delle transazioni schermate per impostazione predefinita e nessuna dipendenza dalla presenza online o dalla solvibilità di un fornitore centralizzato.

## Come funziona ZGo

Il flusso di pagamento è lo stesso indipendentemente dal fatto che ZGo venga usato in modalità standalone, tramite Xero o tramite WooCommerce:

1. Il commerciante genera una richiesta di pagamento in ZGo, che viene visualizzata come codice QR con l'importo, l'ID fattura e un indirizzo di ricezione Zcash.
2. Il cliente scansiona il QR con un wallet Zcash (i tipi di indirizzo Orchard, Sapling e Transparent sono tutti supportati nel plugin WordPress) e approva il pagamento.
3. La transazione viene trasmessa alla rete Zcash come trasferimento schermato dal wallet del cliente al wallet del commerciante.
4. ZGo monitora la blockchain di Zcash in attesa della transazione.
5. Dopo cinque conferme, ZGo segna il pagamento come definitivo e notifica eventuali integrazioni collegate (Xero, WooCommerce o un webhook).

La soglia delle cinque conferme è il numero chiave. Tutto ciò che avviene prima è un pagamento in corso, non un pagamento ricevuto. L'evasione dell'ordine, gli aggiornamenti dell'inventario e qualsiasi azione irreversibile dal lato del commerciante dovrebbero attendere il passaggio 5.

ZGo funziona in qualsiasi browser moderno su desktop o mobile, senza installazione da nessuna delle due parti. Il cliente ha bisogno di un wallet Zcash; il commerciante ha bisogno di un wallet Zcash e di un account ZGo.

<img width="672" height="378" alt="ZGo payment request and blockchain monitoring overview" src="https://github.com/user-attachments/assets/de50885b-b068-4157-bbda-0981ca23efc8" />

## Configurare un account

Per creare un account ZGo, è necessario un wallet Zcash con una piccola quantità di ZEC. Il piccolo saldo di ZEC copre la commissione on-chain per la transazione di inizializzazione dell'account. Qualsiasi wallet Zcash importante va bene per questo; vedi [ZecHub Wallets](https://zechub.wiki/wallets) per le opzioni attuali.

Il setup di base:

1. Apri [zgo.cash](https://zgo.cash/) in un browser.
2. Crea un account usando un wallet Zcash sotto il controllo del commerciante. Questo wallet deve detenere le chiavi. Un indirizzo di deposito di un exchange non funzionerà (vedi [Errori comuni](#errori-comuni)).
3. Verifica il wallet inviando la piccola transazione di inizializzazione.
4. Configura l'indirizzo di ricezione. Tutti i pagamenti elaborati tramite questo account finiranno in questo wallet.

Una volta che l'account è attivo, lo stesso commerciante può usare ZGo per pagamenti una tantum (un singolo codice QR a un evento pop-up) o integrarlo in una configurazione permanente tramite Xero o WooCommerce.

## ZGo con Xero

[Xero](https://www.xero.com/) è una piattaforma di contabilità cloud usata da molte piccole e medie imprese. L'integrazione ZGo–Xero consente a un commerciante di emettere una fattura in Xero, far pagare al cliente in ZEC e far sì che Xero contrassegni automaticamente la fattura come pagata una volta che la transazione è confermata.

Come funziona:

1. Il commerciante crea una fattura in Xero come al solito.
2. ZGo allega un'opzione di pagamento Zcash alla fattura.
3. Il cliente paga in ZEC tramite il proprio wallet.
4. ZGo monitora la [blockchain di Zcash](https://z.cash/) in attesa della transazione.
5. Dopo cinque conferme, ZGo segnala il pagamento a Xero, che contrassegna la fattura come saldata.

Gli ZEC finiscono nel wallet del commerciante, non in un account controllato da ZGo o da Xero. Il record contabile in Xero rimane sincronizzato automaticamente con il regolamento on-chain.

Per il setup iniziale, segui la procedura dedicata: [Configurazione dell'integrazione Xero](https://hedgedoc.vergara.tech/s/4iXC67fmb).

## ZGo con WooCommerce

Per i negozi online che girano su [WooCommerce](https://woocommerce.com/) e [WordPress](https://wordpress.org/), ZGo fornisce un plugin dedicato. Il plugin aggiunge Zcash come metodo di pagamento al checkout e gestisce automaticamente lo stato dell'ordine quando il pagamento viene confermato.

<img width="672" height="378" alt="ZGo WooCommerce plugin checkout and order flow" src="https://github.com/user-attachments/assets/55a791bb-1947-4f55-b5b9-55083be8ed49" />

Flusso end-to-end all'interno di un negozio WooCommerce:

1. Il cliente raggiunge il checkout e seleziona Zcash come metodo di pagamento.
2. Il plugin genera una richiesta di pagamento e mostra il codice QR nella pagina di checkout.
3. Il cliente paga dal proprio wallet.
4. La transazione viene trasmessa alla rete Zcash e ZGo inizia a monitorarla.
5. Dopo cinque conferme, ZGo segnala il pagamento come definitivo al plugin.
6. Il plugin contrassegna l'ordine WooCommerce come pagato e aggiorna il database degli ordini.

L'ordine è pagato solo quando si completa il passaggio 6. Gli stati precedenti (trasmissione, prime conferme) possono essere mostrati al cliente come "pagamento ricevuto, in attesa di conferma", ma l'inventario, l'evasione e qualsiasi automazione a valle dovrebbero attendere lo stato finale.

Il plugin installa anche una dashboard amministrativa all'interno di WordPress, dove il commerciante può monitorare gli ordini e i pagamenti ZEC in entrata insieme alla normale vista degli ordini WooCommerce. Il plugin supporta tutti i tipi di indirizzo Zcash attuali: Orchard, Sapling e Transparent. I clienti che pagano da qualsiasi wallet conforme possono completare la transazione.

## Funzionalità

**Non-custodial.** I pagamenti si spostano direttamente dal wallet del cliente al wallet del commerciante tramite transazioni schermate. ZGo non detiene mai i fondi nel frattempo, e il commerciante mantiene il pieno controllo per tutto il tempo.

**Distribuzione flessibile.** ZGo può essere usato per un singolo pomeriggio a un mercatino pop-up, per una configurazione permanente di punto vendita, o come backend per un negozio online tramite le integrazioni Xero o WooCommerce.

**Basato su browser.** Nessuna installazione né dal lato del cliente né da quello del commerciante. ZGo funziona in qualsiasi browser moderno su desktop o mobile.

**Compatibilità con i wallet.** I principali wallet Zcash, inclusi quelli che supportano i tipi di indirizzo Orchard, Sapling e Transparent, possono pagare una fattura ZGo senza configurazioni aggiuntive dal lato del cliente.

**Integrazioni.** Le integrazioni dirette con Xero (contabilità) e WooCommerce (e-commerce) coprono i due workflow più comuni dei commercianti out of the box.

## Errori comuni

**Trattare l'ordine come pagato prima delle cinque conferme.** Una transazione trasmessa non è la stessa cosa di un pagamento confermato. La transazione può ancora non confermarsi o essere sostituita. Solo dopo cinque conferme ZGo segnala il pagamento come definitivo, e solo allora l'ordine dovrebbe essere contrassegnato come pagato a valle. Se un commerciante configura l'inventario o l'evasione perché si attivino sull'evento di trasmissione, pagamenti fraudolenti o falliti causeranno perdite reali.

**Puntare ZGo a un indirizzo di deposito di un exchange.** Sembra un indirizzo Zcash, ma gli indirizzi di deposito degli exchange sono controllati dall'exchange, non dal commerciante. L'exchange detiene le chiavi, il che significa che l'exchange detiene i fondi, vanificando il motivo per cui si usa un processor non-custodial. L'indirizzo del wallet configurato in ZGo deve essere un wallet la cui seed phrase è controllata direttamente dal commerciante.

**Trattare ZGo come un wallet.** ZGo è un payment processor, non un wallet. Non memorizza chiavi, non detiene saldi e non consente al commerciante di spendere fondi. È necessario un wallet Zcash separato, sotto il controllo del commerciante, per ricevere il denaro che ZGo instrada.

## Conclusione

ZGo offre ai commercianti un modo per accettare pagamenti Zcash senza rinunciare alla custodia, senza dipendere da un intermediario e senza esporre i dettagli delle transazioni su una chain pubblica. Le due integrazioni (Xero e WooCommerce) coprono i workflow più comuni dei commercianti; per tutto il resto, ZGo può essere usato in modalità standalone da qualsiasi browser.

Per il setup, il percorso è breve: ottieni un wallet Zcash, crea un account su [zgo.cash](https://zgo.cash/) e inizia a generare richieste di pagamento direttamente oppure installa l'integrazione pertinente.

## Risorse

- [Sito ufficiale di ZGo](https://zgo.cash/)
- [Procedura di configurazione dell'integrazione Xero](https://hedgedoc.vergara.tech/s/4iXC67fmb)
- [WooCommerce](https://woocommerce.com/) e [WordPress](https://wordpress.org/)
- [Xero](https://www.xero.com/)
- [Homepage del progetto Zcash](https://z.cash/)
- [ZecHub Wallets](https://zechub.wiki/wallets), l'elenco dei wallet Zcash compatibili
- [Panoramica ZecHub dei Payment Processor](https://zechub.wiki/payment-processors), ZGo nel contesto delle altre opzioni di pagamento Zcash
- [BTCPayServer Zcash Plugin](https://zechub.wiki/guides/btcpayserver-zcash-plugin), la relativa guida ZecHub per un'alternativa self-hosted
