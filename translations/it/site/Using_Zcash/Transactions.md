<a href="https://github.com/zechub/zechub/edit/main/site/Using_Zcash/Transactions.md" target="_blank">
  <img src="https://img.shields.io/badge/Edit-blue" alt="Edit Page"/>
</a>


# Transazioni

ZEC è un asset digitale ampiamente utilizzato per i pagamenti e offre solide funzionalità di privacy che lo rendono adatto a varie transazioni, come pagare amici, effettuare acquisti o fare donazioni. Per massimizzare privacy e sicurezza, è essenziale comprendere come funzionano i diversi tipi di transazioni all'interno di Zcash.

## In breve

- Zcash supporta due tipi di transazione: **schermate**, che mantengono privati i dettagli, e **trasparenti**, che li registrano pubblicamente.
- Gli indirizzi schermati iniziano con `u` o `z`. Gli indirizzi trasparenti iniziano con `t` e si comportano in modo molto simile a un indirizzo Bitcoin.
- La scelta spetta a te per ogni pagamento. La privacy è un'opzione che Zcash ti offre, non un'impostazione che qualcun altro decide per te.
- Il prelievo da un exchange è il caso più comune in cui le persone perdono privacy. Se l'exchange supporta solo prelievi trasparenti, proteggi tu stesso i fondi una volta ricevuti.
- Le commissioni seguono [ZIP 317](https://zips.z.cash/zip-0317) e aumentano con le dimensioni della transazione. I wallet che inviano ancora la vecchia commissione fissa possono vedere le proprie transazioni ritardate.
- La maggior parte delle transazioni Zcash ha un'altezza di scadenza ai sensi di [ZIP 203](https://zips.z.cash/zip-0203). Se una transazione scade prima di essere inclusa in un blocco, non può essere confermata dopo quell'altezza di scadenza e potrebbe dover essere inviata nuovamente.

## Transazioni schermate

<div className="my-8 w-full aspect-video max-w-3xl mx-auto rounded-2xl overflow-hidden shadow-lg bg-black">
  <iframe
    className="w-full h-full"
    src="https://www.youtube.com/embed/bZM3o_eIovU"
    title="Zcash Explained: Zcash Shielded Transactions"
    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
    allowFullScreen
    loading="lazy"
  />
</div>

---

Le transazioni schermate avvengono quando sposti ZEC nel tuo wallet schermato. L'indirizzo del tuo wallet schermato inizia con `u` o `z`. Quando invii transazioni schermate, tu e le persone con cui effettui transazioni potete mantenere un livello di privacy impossibile sulle reti di pagamento pubbliche per impostazione predefinita.

Inviare una transazione schermata è più semplice quando utilizzi un wallet che supporta l'attuale rete Zcash e gli attuali pool schermati. Prima di affidarti a un wallet per la privacy, verifica se supporta l'invio schermato, la ricezione schermata e il pool che intendi utilizzare. Quando prelevi ZEC da un exchange, verifica se l'exchange supporta prelievi schermati o trasparenti. Se supporta solo prelievi trasparenti, sposta i fondi in un wallet in grado di gestire transazioni schermate dopo averli ricevuti.

Utilizzare transazioni schermate per inviare e ricevere fondi è il modo migliore per preservare la privacy e ridurre il rischio di divulgare dati di pagamento.

## Transazioni trasparenti

Le transazioni trasparenti funzionano in modo simile alle transazioni Bitcoin. I dettagli delle transazioni sono pubblicamente visibili sulla blockchain, inclusi indirizzi e valori trasparenti. Le transazioni trasparenti dovrebbero essere evitate quando la privacy è una priorità.

Gli indirizzi trasparenti sono comunque utili in alcune situazioni, soprattutto quando un exchange o un servizio non supporta gli indirizzi schermati. Se ricevi ZEC a un indirizzo trasparente, considera di schermarlo prima di effettuare pagamenti successivi.

<div className="my-8 w-full aspect-video max-w-3xl mx-auto rounded-2xl overflow-hidden shadow-lg bg-black">
  <iframe
    className="w-full h-full"
    src="https://www.youtube.com/embed/R-krX1UpsIg"
    title="Learn Zcash shielded wallets!"
    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
    allowFullScreen
    loading="lazy"
  />
</div>

## Un modo semplice per immaginarlo

Una transazione trasparente è una cartolina. Il postino la consegna, ma chiunque la maneggi lungo il percorso può leggere il messaggio, vedere chi l'ha inviata e chi la riceve.

Una transazione schermata è una busta sigillata. Il servizio postale conferma comunque che una lettera reale con affrancatura reale è passata attraverso il sistema e nessuno può contraffarne una o inviare la stessa lettera due volte. Ciò che contiene la busta resta tra mittente e destinatario.

La parte importante è che Zcash ti permette di decidere quale inviare, pagamento per pagamento.

## Commissioni Zcash

Zcash non utilizza unità di gas in stile Ethereum. Le commissioni delle transazioni Zcash vengono pagate in ZEC, solitamente misurati in **zatoshis**. Un ZEC equivale a 100.000.000 zatoshis.

[ZIP 317](https://zips.z.cash/zip-0317) definisce un meccanismo di commissione convenzionale che si adatta alla complessità della transazione. Invece di utilizzare per ogni transazione la vecchia commissione fissa di 1.000 zatoshi, la commissione convenzionale si basa su "azioni logiche", come input, output e azioni schermate. Le transazioni semplici partono comunemente da circa 10.000 zatoshi, ovvero 0,0001 ZEC, mentre le transazioni più complesse possono richiedere di più.

Nella maggior parte dei wallet attuali, gli utenti non dovrebbero dover calcolare manualmente le commissioni ZIP 317. Il wallet dovrebbe scegliere automaticamente una commissione appropriata. Se un wallet utilizza ancora la vecchia commissione fissa o ti consente di impostare una commissione molto inferiore alla commissione convenzionale ZIP 317, la transazione potrebbe essere ritardata, declassata in priorità, scartata da alcuni nodi o non essere inoltrata in modo affidabile.

## Risoluzione dei problemi delle transazioni bloccate

Una transazione Zcash non è definitiva solo perché appare nel tuo wallet. Diventa definitiva per l'uso ordinario dopo essere stata inclusa in un blocco e aver ricevuto un numero sufficiente di conferme per la tua situazione. Gli exchange e i servizi possono richiedere più conferme di quelle mostrate dal wallet per impostazione predefinita.

Utilizza questo albero decisionale prima di inviare nuovamente:

1. **Il tuo wallet mostra un ID transazione?**
   - Se no, il wallet potrebbe non aver ancora creato o trasmesso la transazione. Controlla lo stato di sincronizzazione, la connessione internet, la versione del wallet ed eventuali messaggi di errore del wallet.
   - Se sì, copia l'ID transazione e continua.
2. **La transazione è confermata in un blocco?**
   - Se sì, attendi il numero di conferme richiesto dal tuo wallet, exchange, esercente o servizio.
   - Se no, continua.
3. **La transazione ha raggiunto la sua altezza di scadenza?**
   - Se no, non inviare ancora manualmente lo stesso pagamento. La transazione originale potrebbe ancora essere confermata.
   - Se sì, la transazione non può essere inclusa in un blocco dopo quell'altezza di scadenza. Il tuo wallet potrebbe contrassegnarla come scaduta o non riuscita e potresti dover creare una nuova transazione.
4. **La transazione appare su un server o explorer ma non su un altro?**
   - Consideralo un problema di visibilità della rete, non la prova che la transazione sia fallita. Nodi diversi possono avere visualizzazioni diverse della mempool.
   - Attendi, risincronizza il wallet oppure passa a un altro server affidabile se il tuo wallet lo supporta.
5. **La transazione è scomparsa dopo essere apparsa come confermata?**
   - Una breve riorganizzazione della catena può rimuovere temporaneamente una transazione dalla catena migliore.
   - Attendi altri blocchi. Se la transazione ricompare, continua ad attendere le conferme. Se non ricompare e in seguito scade, crea una nuova transazione.
6. **Il wallet ti chiede di inviare nuovamente?**
   - Segui le indicazioni attuali del wallet solo dopo aver verificato che la transazione precedente sia scaduta, fallita o non più valida.
   - Se non sei sicuro, chiedi assistenza prima di inviare nuovamente.

## In attesa, scadute, scartate e riorganizzate

- **In attesa** significa che la transazione è stata creata o trasmessa ma non è ancora stata inclusa in un blocco.
- **Scaduta** significa che l'altezza di scadenza della transazione è stata superata. Ai sensi di ZIP 203, una transazione con un'altezza di scadenza non può essere inclusa in un blocco dopo tale altezza.
- **Scartata** significa che uno o più nodi non mantengono più la transazione nella loro mempool. Ciò può accadere a causa della scadenza, di commissioni basse, della politica della mempool, del comportamento al riavvio o di differenze nell'inoltro.
- **Riorganizzata** significa che un blocco che in precedenza conteneva la transazione non fa più parte della catena migliore. La transazione potrebbe essere inclusa nuovamente in un blocco in seguito, oppure potrebbe tornare in attesa se è ancora valida.

## Quando non inviare nuovamente

Non inviare nuovamente subito solo perché una transazione è in attesa, lenta o assente da un explorer. Inviare nuovamente troppo presto può causare confusione e, a seconda di come il wallet costruisce il nuovo pagamento, potrebbe comportare il rischio di pagare due volte.

Attendi o chiedi prima assistenza quando:

- La transazione ha un ID transazione e non è scaduta.
- Un server la mostra mentre un altro no.
- È stata inclusa recentemente in un blocco ma ha perso conferme dopo una possibile riorganizzazione.
- Il servizio ricevente non ha terminato di conteggiare le conferme.
- Il tuo wallet è ancora in fase di sincronizzazione.

In genere è più sicuro inviare nuovamente solo dopo che il wallet contrassegna chiaramente la transazione come scaduta o non riuscita, oppure dopo che l'assistenza conferma che la transazione originale non può essere confermata.

## Verifiche sicure per la privacy

Puoi controllare lo stato di base della transazione senza esporre più informazioni del necessario:

- Verifica che il tuo wallet sia completamente sincronizzato.
- Verifica che l'app del wallet sia aggiornata.
- Verifica che la transazione disponga di un ID transazione.
- Verifica se la transazione è confermata, in attesa, scaduta o non riuscita.
- Verifica l'altezza attuale del blocco e confrontala con l'altezza di scadenza della transazione, se il tuo wallet la mostra.
- Per le transazioni trasparenti, un block explorer può mostrare la transazione pubblica, gli indirizzi, i valori e le conferme.
- Per le transazioni schermate, un block explorer può mostrare che una transazione esiste, ma non può mostrare mittente, destinatario, importo o dettagli del memo schermati.

## Cosa non condividere pubblicamente

Non pubblicare mai questi elementi in chat pubbliche, sui social media o in un issue tracker:

- Frase seed o frase di recupero
- Chiave di spesa, chiave privata o backup del wallet
- Full Viewing Key
- Screenshot che mostrano saldi, indirizzi completi, memo, codici QR o dettagli dell'account dell'exchange
- Documenti di identità personali o registri di recupero dell'account

Un ID transazione è pubblico sulla catena, ma può comunque collegare la tua richiesta di assistenza alla tua identità. Se la privacy è importante, condividilo solo tramite un canale di assistenza affidabile.

## Cosa serve ai team di assistenza

Quando chiedi aiuto all'assistenza di un wallet, exchange o servizio, condividi solo le informazioni minime utili:

- Nome del wallet o del servizio
- Versione dell'app e sistema operativo
- Se la transazione è schermata, trasparente oppure tra indirizzi schermati e trasparenti
- ID transazione, se ti senti a tuo agio nel condividerlo
- Ora approssimativa dell'invio
- Se il wallet è completamente sincronizzato
- Stato attuale mostrato dal wallet
- Messaggio di errore esatto, con i dati privati rimossi
- Screenshot con saldi, indirizzi, memo e dettagli dell'account nascosti

I team di assistenza non hanno bisogno della tua frase seed, chiave di spesa, chiave privata o Full Viewing Key.

## Errori comuni

- **Supporre che qualsiasi wallet che elenchi ZEC possa inviarlo privatamente.** Diversi wallet multi-valuta supportano solo il lato trasparente di Zcash. Verifica i pool supportati dal wallet prima di affidarti a esso per la privacy. La pagina [Wallet](https://zechub.wiki/using-zcash/wallets) elenca queste informazioni per ciascuna opzione.
- **Prelevare verso un indirizzo trasparente e lasciare lì i fondi.** Il prelievo stesso è pubblico e ogni movimento successivo da quell'indirizzo resta anch'esso pubblico. Scherma i fondi una volta ricevuti.
- **Considerare la privacy come qualcosa che attivi una sola volta.** Ogni transazione è una scelta separata. Inviare schermato oggi non annulla un pagamento trasparente effettuato la scorsa settimana.
- **Riutilizzare un indirizzo trasparente per tutto.** Poiché l'attività trasparente è visibile in modo permanente, un singolo indirizzo riutilizzato collega gradualmente pagamenti che non avevano motivo di essere connessi.
- **Inviare con una commissione predefinita obsoleta.** I wallet che non hanno adottato ZIP 317 potrebbero ancora inviare la vecchia commissione fissa, lasciando una transazione senza conferma.
- **Inviare nuovamente prima della scadenza.** Una transazione in attesa può ancora essere confermata fino alla sua scadenza. Verifica lo stato di scadenza prima di creare un altro pagamento.

## Nota

Tieni presente che il modo più sicuro per utilizzare ZEC è usare transazioni schermate ogniqualvolta mittente, destinatario, wallet e servizio le supportino tutti. Alcuni wallet ed exchange supportano gli [indirizzi unificati](https://electriccoin.co/blog/unified-addresses-in-zcash-explained/#:~:text=The%20unified%20address%20(UA)%20is,within%20the%20broader%20Zcash%20ecosystem.), che possono combinare più tipi di destinatario Zcash in un unico indirizzo.

## Risorse

- [ZIP 203: Scadenza delle transazioni](https://zips.z.cash/zip-0203)
- [ZIP 317: Meccanismo di commissione proporzionale per i trasferimenti](https://zips.z.cash/zip-0317)
- [ZIP di Zcash](https://zips.z.cash/)

## Pagine correlate

- [Wallet](/using-zcash/wallets) - quali wallet supportano l'invio schermato e quali sono solo trasparenti
- [Pool schermati](/using-zcash/shielded-pools) - Sapling e Orchard, i pool in cui risiedono i tuoi fondi schermati
- [Memo](/using-zcash/memos) - messaggi cifrati che possono accompagnare una transazione schermata
- [Indirizzi trasparenti degli exchange](/using-zcash/transparent-exchange-addresses) - indirizzi TEX e perché gli exchange li utilizzano
- [Exchange custodial](/using-zcash/custodial-exchanges) - quali exchange supportano prelievi schermati

## Convertitore da ZEC a ZAT
