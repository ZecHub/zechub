<a href="https://github.com/zechub/zechub/edit/main/site/Using_Zcash/Transactions.md" target="_blank">
  <img src="https://img.shields.io/badge/Edit-blue" alt="Edit Page"/>
</a>


# Transazioni

ZEC è una risorsa digitale ampiamente utilizzata per i pagamenti, con solide funzionalità di privacy che la rendono adatta a varie transazioni come pagare amici, fare acquisti o effettuare donazioni. Per massimizzare privacy e sicurezza, è essenziale capire come funzionano i diversi tipi di transazioni all'interno di Zcash.

## TL;DR

- Zcash supporta due tipi di transazione: **shielded**, che mantiene privati i dettagli, e **transparent**, che li registra pubblicamente.
- Gli indirizzi shielded iniziano con `u` o `z`. Gli indirizzi transparent iniziano con `t` e si comportano in modo molto simile a un indirizzo Bitcoin.
- La scelta è tua per ogni pagamento. La privacy è un'opzione che Zcash ti offre, non un'impostazione che qualcun altro decide per te.
- Il prelievo da un exchange è il caso più comune in cui le persone perdono privacy. Se l'exchange supporta solo prelievi transparent, proteggi i fondi tu stesso una volta arrivati.
- Le commissioni seguono [ZIP 317](https://zips.z.cash/zip-0317) e crescono con la dimensione della transazione. I wallet che inviano ancora la vecchia commissione fissa possono vedere le loro transazioni subire ritardi.
- La maggior parte delle transazioni Zcash ha un'altezza di scadenza secondo [ZIP 203](https://zips.z.cash/zip-0203). Se una transazione scade prima di essere inclusa in un blocco, non può essere confermata dopo quell'altezza di scadenza e potrebbe dover essere inviata di nuovo.

## Transazioni Shielded

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

Le transazioni shielded avvengono quando sposti ZEC nel tuo wallet shielded. L'indirizzo del tuo wallet shielded inizia con `u` o `z`. Quando invii transazioni shielded, tu e le persone con cui transi potete mantenere un livello di privacy non possibile sulle reti di pagamento pubbliche per impostazione predefinita.

Inviare una transazione shielded è più semplice quando usi un wallet che supporta l'attuale rete Zcash e gli attuali pool shielded. Prima di affidarti a un wallet per la privacy, verifica se supporta invio shielded, ricezione shielded e il pool che intendi usare. Quando prelevi ZEC da un exchange, controlla se l'exchange supporta prelievi shielded o transparent. Se supporta solo prelievi transparent, sposta i fondi in un wallet con supporto shielded dopo il loro arrivo.

Usare transazioni shielded per inviare e ricevere fondi è il modo migliore per preservare la privacy e ridurre il rischio di esporre dati di pagamento.

## Transazioni Transparent

Le transazioni transparent funzionano in modo simile alle transazioni Bitcoin. I dettagli della transazione sono pubblicamente visibili sulla blockchain, inclusi indirizzi transparent e importi transparent. Le transazioni transparent dovrebbero essere evitate quando la privacy è una priorità.

Gli indirizzi transparent sono comunque utili in alcune situazioni, soprattutto quando un exchange o un servizio non supporta indirizzi shielded. Se ricevi ZEC su un indirizzo transparent, valuta di proteggerli prima di effettuare pagamenti successivi.

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

## Un Modo Semplice per Immaginarlo

Una transazione transparent è una cartolina. Il postino la consegna, ma chiunque la maneggi lungo il percorso può leggere il messaggio, vedere chi l'ha inviata e vedere chi la riceve.

Una transazione shielded è una busta sigillata. Il servizio postale conferma comunque che una lettera reale con affrancatura reale è passata attraverso il sistema, e nessuno può falsificarla o inviare la stessa lettera due volte. Ciò che contiene la busta resta tra mittente e destinatario.

L'aspetto importante è che Zcash ti permette di decidere quale delle due inviare, pagamento per pagamento.

## Commissioni Zcash

Zcash non usa unità di gas come Ethereum. Le commissioni delle transazioni Zcash vengono pagate in ZEC, di solito misurate in **zatoshi**. Un ZEC equivale a 100.000.000 zatoshi.

[ZIP 317](https://zips.z.cash/zip-0317) definisce un meccanismo di commissione convenzionale che si adatta alla complessità della transazione. Invece di usare la vecchia commissione fissa di 1.000 zatoshi per ogni transazione, la commissione convenzionale si basa su "azioni logiche" come input, output e azioni shielded. Le transazioni semplici partono comunemente da circa 10.000 zatoshi, ovvero 0,0001 ZEC, mentre le transazioni più complesse possono richiederne di più.

Nella maggior parte dei wallet attuali, gli utenti non dovrebbero dover calcolare manualmente le commissioni ZIP 317. Il wallet dovrebbe scegliere automaticamente una commissione appropriata. Se un wallet usa ancora la vecchia commissione fissa o ti permette di impostare una commissione molto inferiore a quella convenzionale di ZIP 317, la transazione potrebbe subire ritardi, ricevere priorità inferiore, essere scartata da alcuni nodi o non essere inoltrata in modo affidabile.

## Risoluzione dei Problemi delle Transazioni Bloccate

Una transazione Zcash non è definitiva solo perché appare nel tuo wallet. Diventa definitiva per l'uso ordinario dopo essere stata inclusa in un blocco e aver ricevuto abbastanza conferme per il tuo caso. Exchange e servizi possono richiedere più conferme di quelle mostrate dal wallet per impostazione predefinita.

Usa questo albero decisionale prima di inviare di nuovo:

1. **Il tuo wallet mostra un ID transazione?**
   - Se no, il wallet potrebbe non aver ancora creato o trasmesso la transazione. Controlla stato di sincronizzazione, connessione internet, versione del wallet ed eventuali messaggi di errore del wallet.
   - Se sì, copia l'ID transazione e continua.
2. **La transazione è confermata in un blocco?**
   - Se sì, attendi il numero di conferme richiesto dal tuo wallet, exchange, commerciante o servizio.
   - Se no, continua.
3. **La transazione ha raggiunto la sua altezza di scadenza?**
   - Se no, non reinviare ancora manualmente lo stesso pagamento. La transazione originale potrebbe ancora essere confermata.
   - Se sì, la transazione non può essere inclusa in un blocco dopo quell'altezza di scadenza. Il tuo wallet potrebbe contrassegnarla come scaduta o fallita, e potresti dover creare una nuova transazione.
4. **La transazione appare su un server o explorer ma non su un altro?**
   - Consideralo un problema di visibilità della rete, non una prova che la transazione sia fallita. Nodi diversi possono avere viste diverse della mempool.
   - Attendi, risincronizza il wallet o passa a un altro server affidabile se il tuo wallet lo supporta.
5. **La transazione è scomparsa dopo essere apparsa confermata?**
   - Una breve riorganizzazione della catena può rimuovere temporaneamente una transazione dalla catena migliore.
   - Attendi altri blocchi. Se la transazione ricompare, continua ad aspettare le conferme. Se non ricompare e in seguito scade, crea una nuova transazione.
6. **Il wallet ti chiede di reinviare?**
   - Segui le indicazioni attuali del wallet solo dopo aver verificato che la transazione precedente sia scaduta, fallita o non sia più valida.
   - Se non sei sicuro, contatta l'assistenza prima di inviare di nuovo.

## In Attesa, Scadute, Scartate e Riorganizzate

- **In attesa** significa che la transazione è stata creata o trasmessa ma non è ancora stata inclusa in un blocco.
- **Scaduta** significa che l'altezza di scadenza della transazione è stata superata. Secondo ZIP 203, una transazione con un'altezza di scadenza non può essere inclusa in un blocco dopo tale altezza.
- **Scartata** significa che uno o più nodi non mantengono più la transazione nella loro mempool. Questo può accadere a causa della scadenza, di commissioni basse, della policy della mempool, del comportamento al riavvio o di differenze nell'inoltro.
- **Riorganizzata** significa che un blocco che in precedenza conteneva la transazione non fa più parte della catena migliore. La transazione potrebbe essere inclusa nuovamente in un blocco in seguito, oppure potrebbe tornare in attesa se è ancora valida.

## Quando Non Reinviare

Non reinviare immediatamente solo perché una transazione è in attesa, lenta o assente da un explorer. Reinviare troppo presto può creare confusione e, a seconda di come il wallet costruisce il nuovo pagamento, potrebbe comportare il rischio di pagare due volte.

Attendi o chiedi prima assistenza quando:

- La transazione ha un ID transazione e non è scaduta.
- Un server la mostra mentre un altro no.
- È stata inclusa in un blocco di recente ma ha perso conferme dopo una possibile riorganizzazione.
- Il servizio ricevente non ha ancora completato il conteggio delle conferme.
- Il tuo wallet si sta ancora sincronizzando.

Di solito è più sicuro reinviare solo dopo che il wallet contrassegna chiaramente la transazione come scaduta o fallita, oppure dopo che l'assistenza conferma che la transazione originale non può essere confermata.

## Verifiche Sicure per la Privacy

Puoi controllare lo stato di base di una transazione senza esporre più informazioni del necessario:

- Verifica che il tuo wallet sia completamente sincronizzato.
- Verifica che l'app del wallet sia aggiornata.
- Verifica che la transazione abbia un ID transazione.
- Verifica se la transazione è confermata, in attesa, scaduta o fallita.
- Verifica l'altezza attuale del blocco e confrontala con l'altezza di scadenza della transazione, se il tuo wallet la mostra.
- Per le transazioni transparent, un block explorer può mostrare la transazione pubblica, gli indirizzi, gli importi e le conferme.
- Per le transazioni shielded, un block explorer può mostrare che una transazione esiste, ma non può mostrare mittente shielded, destinatario, importo o dettagli del memo.

## Cosa Non Condividere Pubblicamente

Non pubblicare mai queste informazioni in chat pubbliche, sui social media o in un issue tracker:

- Seed phrase o frase di recupero
- Spending key, chiave privata o backup del wallet
- Full Viewing Key
- Screenshot che mostrano saldi, indirizzi completi, memo, codici QR o dettagli dell'account dell'exchange
- Documenti di identità personale o registri di recupero dell'account

Un ID transazione è pubblico sulla catena, ma può comunque collegare la tua richiesta di assistenza alla tua identità. Se la privacy è importante, condividilo solo con un canale di assistenza affidabile.

## Di Cosa Hanno Bisogno i Team di Supporto

Quando chiedi aiuto al supporto di un wallet, di un exchange o di un servizio, condividi solo le informazioni minime utili:

- Nome del wallet o del servizio
- Versione dell'app e sistema operativo
- Se la transazione è shielded, transparent oppure tra indirizzi shielded e transparent
- ID transazione, se ti senti a tuo agio nel condividerlo
- Orario approssimativo di invio
- Se il wallet è completamente sincronizzato
- Stato attuale mostrato dal wallet
- Messaggio di errore esatto, con i dati privati rimossi
- Screenshot con saldi, indirizzi, memo e dettagli dell'account nascosti

I team di supporto non hanno bisogno della tua seed phrase, spending key, chiave privata o full viewing key.

## Errori Comuni

- **Presumere che qualsiasi wallet che elenchi ZEC possa inviarlo privatamente.** Diversi wallet multi-coin supportano solo il lato transparent di Zcash. Controlla i pool supportati dal wallet prima di affidarti a esso per la privacy. La pagina [Wallet](https://zechub.wiki/using-zcash/wallets) lo indica per ogni opzione.
- **Prelevare verso un indirizzo transparent e lasciare lì i fondi.** Il prelievo stesso è pubblico, e ogni movimento successivo da quell'indirizzo resta anch'esso pubblico. Proteggi i fondi una volta arrivati.
- **Trattare la privacy come qualcosa che attivi una volta sola.** Ogni transazione è una scelta separata. Inviare shielded oggi non annulla un pagamento transparent che hai effettuato la settimana scorsa.
- **Riutilizzare un indirizzo transparent per tutto.** Poiché l'attività transparent è visibile in modo permanente, un singolo indirizzo riutilizzato collega gradualmente pagamenti che non avevano motivo di essere collegati.
- **Inviare con una commissione predefinita obsoleta.** I wallet che non hanno adottato ZIP 317 potrebbero ancora inviare la vecchia commissione fissa, lasciando una transazione in attesa senza conferma.
- **Reinviare prima della scadenza.** Una transazione in attesa può ancora essere confermata fino alla sua scadenza. Verifica lo stato di scadenza prima di creare un altro pagamento.

## Nota

Tieni presente che il modo più sicuro di usare ZEC è utilizzare transazioni shielded ogni volta che mittente, destinatario, wallet e servizio le supportano tutti. Alcuni wallet ed exchange supportano [indirizzi unificati](https://electriccoin.co/blog/unified-addresses-in-zcash-explained/#:~:text=The%20unified%20address%20(UA)%20is,within%20the%20broader%20Zcash%20ecosystem.), che possono combinare più tipi di destinatario Zcash in un unico indirizzo.

## Risorse

- [ZIP 203: Scadenza della Transazione](https://zips.z.cash/zip-0203)
- [ZIP 317: Meccanismo di Commissione di Trasferimento Proporzionale](https://zips.z.cash/zip-0317)
- [ZIP di Zcash](https://zips.z.cash/)

## Pagine Correlate

- [Wallet](/using-zcash/wallets) - quali wallet supportano l'invio shielded e quali sono solo transparent
- [Pool Shielded](/using-zcash/shielded-pools) - Sapling e Orchard, i pool in cui si trovano i tuoi fondi shielded
- [Memo](/using-zcash/memos) - messaggi cifrati che possono accompagnare una transazione shielded
- [Indirizzi Transparent degli Exchange](/using-zcash/transparent-exchange-addresses) - indirizzi TEX e perché gli exchange li usano
- [Exchange Custodial](/using-zcash/custodial-exchanges) - quali exchange supportano i prelievi shielded

## Convertitore da ZEC a ZAT
