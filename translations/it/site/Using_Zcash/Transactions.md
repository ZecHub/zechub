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
- Le commissioni seguono [ZIP 317](https://zips.z.cash/zip-0317) e aumentano con le dimensioni della transazione. I portafogli che inviano ancora la vecchia commissione fissa possono vedere le proprie transazioni ritardate.
- La maggior parte delle transazioni di Zcash ha un'altezza di scadenza ai sensi di [ZIP 203](https://zips.z.cash/zip-0203). Se una transazione scade prima di essere inclusa in un blocco, non può essere confermata dopo quell'altezza di scadenza e potrebbe dover essere inviata nuovamente.

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

Le transazioni schermate avvengono quando sposti ZEC nel tuo portafoglio schermato. L'indirizzo del tuo portafoglio schermato inizia con `u` o `z`. Quando invii transazioni schermate, tu e le persone con cui effettui transazioni potete mantenere un livello di privacy impossibile sulle reti di pagamento pubbliche per impostazione predefinita.

Inviare una transazione schermata è più semplice quando utilizzi un portafoglio che supporta l'attuale rete di Zcash e le attuali pool schermate. Prima di affidarti a un portafoglio per la privacy, verifica se supporta l'invio schermato, la ricezione schermata e la pool che intendi utilizzare. Quando prelevi ZEC da un exchange, verifica se l'exchange supporta prelievi schermati o trasparenti. Se supporta solo prelievi trasparenti, sposta i fondi in un portafoglio in grado di gestire transazioni schermate dopo averli ricevuti.

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

Lascia che il tuo portafoglio calcoli la commissione di rete e controllala prima di inviare. Le commissioni vengono pagate in ZEC: **1 ZEC = 100.000.000 zatoshis**. Una commissione in dollari statunitensi dipende anche dal tasso di cambio di ZEC.

### Perché due pagamenti possono avere commissioni diverse

[ZIP 317](https://zips.z.cash/zip-0317#fee-calculation) calcola la commissione convenzionale in base alle **azioni logiche** e non come percentuale dell'importo inviato:

```text
fee in zatoshis = marginal fee × max(2, logical actions)
```

Le azioni logiche misurano i componenti di una transazione. Per esempio, una transazione solo Orchard usa il numero delle sue azioni Orchard; una transazione solo Sapling usa il valore maggiore tra il numero di spese e quello di output. I contributi delle diverse pool vengono sommati. I componenti trasparenti usano un calcolo basato sulla dimensione. Consulta la ZIP 317 per la formula completa, inclusi Ironwood e Sprout legacy.

Spendere molte piccole note ricevute o usare diverse pool può quindi costare più di un pagamento più semplice dello stesso valore. Il solo numero di destinatari non basta per calcolare la commissione: contano anche il resto e il padding.

Questi esempi partono da un numero di azioni logiche già calcolato:

| Azioni logiche | A 5.000 zatoshi per azione | A 1.000 zatoshi per azione |
| --- | --- | --- |
| 2 | 10.000 zatoshi / 0,0001 ZEC | 2.000 zatoshi / 0,00002 ZEC |
| 3 | 15.000 zatoshi / 0,00015 ZEC | 3.000 zatoshi / 0,00003 ZEC |
| 10 | 50.000 zatoshi / 0,0005 ZEC | 10.000 zatoshi / 0,0001 ZEC |

### Quale commissione marginale si applica

**Verificato l'11 novembre 2026:** ZIP 317 elenca la revisione 2 e [ZIP 2009](https://zips.z.cash/zip-2009) come proposte. Prima della revisione 2, la commissione marginale è di 5.000 zatoshi. La revisione 2 la fissa a 1.000, con un minimo di 2.000 zatoshi anziché 10.000.

La proposta specifica l'altezza **3.590.000** su Mainnet, prevista intorno al 19 novembre 2026, e l'altezza **4.465.026** su Testnet. Una stima basata sul calendario non è la condizione di attivazione. Per i portafogli, l'altezza rilevante è quella del blocco in cui si prevede che la transazione venga minata; i nodi usano l'altezza del blocco successivo. Ricontrolla le specifiche collegate e le indicazioni sulle versioni del tuo portafoglio man mano che il deployment cambia.

Non forzare manualmente la commissione più bassa solo perché una proposta o una nuova versione del software ne parla. La ZIP 2009 richiede che i nodi adottino la nuova policy di inoltro prima che i portafogli applichino la nuova commissione. I nodi che usano i vecchi parametri possono rifiutarsi di inoltrare la transazione con la commissione più bassa. Inoltre Testnet e Mainnet hanno altezze di attivazione diverse.

### Se la stima sembra sbagliata

Verifica che il tuo portafoglio sia aggiornato e sincronizzato. Confronta separatamente la commissione di rete del portafoglio con il costo di prelievo del servizio da cui invii: il preventivo di un servizio non è la formula ZIP 317. Per un pagamento in sospeso, segui i [passaggi di risoluzione dei problemi qui sotto](#troubleshooting-stuck-transactions) prima di inviare di nuovo.

ZIP 317 è una policy dei portafogli e dei nodi, non una regola di consenso che impone esattamente questa commissione. Pagare la commissione convenzionale migliora la compatibilità con l'inoltro delle transazioni, ma non garantisce un tempo di conferma.

## Risoluzione dei problemi delle transazioni bloccate

Una transazione di Zcash non è definitiva solo perché appare nel tuo portafoglio. Diventa definitiva per l'uso ordinario dopo essere stata inclusa in un blocco e aver ricevuto un numero sufficiente di conferme per la tua situazione. Gli exchange e i servizi possono richiedere più conferme di quelle mostrate dal portafoglio per impostazione predefinita.

La scadenza è un'**altezza di blocco**, non un conto alla rovescia fisso. Per un pagamento ordinario con un'altezza di scadenza diversa da zero, quell'altezza è l'ultimo blocco in cui può essere minato. Per esempio, un pagamento che scade all'altezza 3539 può essere incluso nel blocco 3539, mentre il blocco 3540 è troppo tardi. Un'altezza di scadenza pari a 0 significa che il pagamento ordinario non ha scadenza. Vedi [ZIP 203](https://zips.z.cash/zip-0203).

I valori predefiniti non sono scadenze universali. ZIP 203 prevede 40 blocchi dopo Blossom, circa 50 minuti con un intervallo obiettivo di 75 secondi. La modifica NU7 proposta raccomanda 120 blocchi con un intervallo obiettivo di 25 secondi, anche in questo caso circa 50 minuti ([ZIP 218](https://zips.z.cash/zip-0218)). Le impostazioni e le implementazioni dei portafogli possono variare, e anche gli intervalli effettivi tra i blocchi cambiano. Invece di calcolare i tempi per un nuovo invio, controlla l'altezza di scadenza della transazione specifica.

La scadenza non annulla un pagamento già minato né crea una transazione di rimborso. Se la transazione originale è scaduta senza essere minata, non è mai stata regolata on-chain. Il tuo portafoglio potrebbe dover eseguire la sincronizzazione prima di mostrare di nuovo come spendibili i fondi associati.

Utilizza questo albero decisionale prima di inviare nuovamente:

1. **Il tuo portafoglio mostra un ID della transazione?**
   - Se no, il portafoglio potrebbe non aver ancora creato o trasmesso la transazione. Controlla lo stato della sincronizzazione, la connessione a internet, la versione del portafoglio ed eventuali messaggi di errore del portafoglio.
   - Se sì, copia l'ID della transazione e continua.
2. **La transazione è confermata in un blocco?**
   - Se sì, attendi il numero di conferme richiesto dal tuo portafoglio, exchange, commerciante o servizio.
   - Se no, continua.
3. **La transazione non minata ha superato la sua altezza di scadenza diversa da zero?**
   - Se no, non inviare ancora manualmente di nuovo lo stesso pagamento. La transazione originale potrebbe ancora essere confermata.
   - Se sì, lascia sincronizzare il portafoglio e verifica che la transazione originale non sia stata minata a quell'altezza o prima. Poi segui le indicazioni del portafoglio per creare una transazione sostitutiva, se necessario.
4. **La transazione compare su un server o un explorer ma non su un altro?**
   - Consideralo un problema di visibilità nella rete, non una prova che la transazione sia fallita. Nodi diversi possono avere visioni diverse della mempool.
   - Attendi, risincronizza il tuo portafoglio o passa a un altro server affidabile, se il tuo portafoglio lo consente.
5. **La transazione è scomparsa dopo essere apparsa come confermata?**
   - Una breve riorganizzazione della chain può rimuovere temporaneamente una transazione dalla chain migliore.
   - Attendi altri blocchi. Se la transazione ricompare, continua ad attendere le conferme. Se non ricompare e in seguito scade, crea una nuova transazione.
6. **Il portafoglio ti chiede di inviare di nuovo?**
   - Segui le indicazioni attuali del portafoglio solo dopo aver verificato che la transazione precedente sia scaduta, fallita o non più valida.
   - Se non sei sicuro, chiedi all'assistenza prima di inviare di nuovo.

## In attesa, scadute, scartate e riorganizzate

- **In attesa** significa che la transazione è stata creata o trasmessa ma non è ancora stata inclusa in un blocco.
- **Scaduta** significa che l'altezza di scadenza della transazione è stata superata. Ai sensi di ZIP 203, una transazione con un'altezza di scadenza non può essere inclusa in un blocco dopo tale altezza.
- **Scartata** significa che uno o più nodi non mantengono più la transazione nella loro mempool. Ciò può accadere a causa della scadenza, di commissioni basse, della politica della mempool, del comportamento al riavvio o di differenze nell'inoltro.
- **Riorganizzata** significa che un blocco che in precedenza conteneva la transazione non fa più parte della chain migliore. La transazione potrebbe essere inclusa nuovamente in un blocco in seguito, oppure potrebbe tornare in attesa se è ancora valida.

## Quando non inviare nuovamente

Non inviare nuovamente subito solo perché una transazione è in attesa, lenta o assente da un explorer. Inviare nuovamente troppo presto può causare confusione e, a seconda di come il portafoglio costruisce il nuovo pagamento, potrebbe comportare il rischio di pagare due volte.

Attendi o chiedi prima assistenza quando:

- La transazione ha un ID transazione e non è scaduta.
- Un server la mostra mentre un altro no.
- È stata inclusa recentemente in un blocco ma ha perso conferme dopo una possibile riorganizzazione.
- Il servizio ricevente non ha terminato di conteggiare le conferme.
- Il tuo portafoglio è ancora in fase di sincronizzazione.

In genere è più sicuro inviare nuovamente solo dopo che il portafoglio contrassegna chiaramente la transazione come scaduta o non riuscita, oppure dopo che l'assistenza conferma che la transazione originale non può essere confermata.

## Verifiche sicure per la privacy

Puoi controllare lo stato di base della transazione senza esporre più informazioni del necessario:

- Verifica che il tuo portafoglio sia completamente sincronizzato.
- Verifica che l'app del portafoglio sia aggiornata.
- Verifica che la transazione disponga di un ID transazione.
- Verifica se la transazione è confermata, in attesa, scaduta o non riuscita.
- Verifica l'altezza attuale del blocco e confrontala con l'altezza di scadenza della transazione, se il tuo portafoglio la mostra.
- Per le transazioni trasparenti, un block explorer può mostrare la transazione pubblica, gli indirizzi, i valori e le conferme.
- Per le transazioni schermate, un block explorer può mostrare che una transazione esiste, ma non può mostrare mittente, destinatario, importo o dettagli del memo schermati.

## Cosa non condividere pubblicamente

Non pubblicare mai questi elementi in chat pubbliche, sui social media o in un issue tracker:

- Frase seed o frase di recupero
- Chiave di spesa, chiave privata o backup del portafoglio
- Full Viewing Key
- Screenshot che mostrano saldi, indirizzi completi, memo, codici QR o dettagli dell'account dell'exchange
- Documenti di identità personali o registri di recupero dell'account

Un ID transazione è pubblico sulla chain, ma può comunque collegare la tua richiesta di assistenza alla tua identità. Se la privacy è importante, condividilo solo tramite un canale di assistenza affidabile.

## Cosa serve ai team di assistenza

Quando chiedi aiuto all'assistenza di un portafoglio, exchange o servizio, condividi solo le informazioni minime utili:

- Nome del portafoglio o del servizio
- Versione dell'app e sistema operativo
- Se la transazione è schermata, trasparente oppure tra indirizzi schermati e trasparenti
- ID transazione, se ti senti a tuo agio nel condividerlo
- Ora approssimativa dell'invio
- Se il portafoglio è completamente sincronizzato
- Stato attuale mostrato dal portafoglio
- Messaggio di errore esatto, con i dati privati rimossi
- Screenshot con saldi, indirizzi, memo e dettagli dell'account nascosti

I team di assistenza non hanno bisogno della tua frase mnemonica, chiave di spesa, chiave privata o chiavi di visualizzazione complete.

## Errori comuni

- **Supporre che qualsiasi portafoglio che elenchi ZEC possa inviarlo privatamente.** Diversi portafogli multi-valuta supportano solo il lato trasparente di Zcash. Verifica le pool supportate dal portafoglio prima di affidarti a esso per la privacy. La pagina [Portafogli](https://zechub.wiki/using-zcash/wallets) elenca queste informazioni per ciascuna opzione.
- **Prelevare verso un indirizzo trasparente e lasciare lì i fondi.** Il prelievo stesso è pubblico e ogni movimento successivo da quell'indirizzo resta anch'esso pubblico. Scherma i fondi una volta ricevuti.
- **Considerare la privacy come qualcosa che attivi una sola volta.** Ogni transazione è una scelta separata. Inviare schermato oggi non annulla un pagamento trasparente effettuato la scorsa settimana.
- **Riutilizzare un indirizzo trasparente per tutto.** Poiché l'attività trasparente è visibile in modo permanente, un singolo indirizzo riutilizzato collega gradualmente pagamenti che non avevano motivo di essere connessi.
- **Inviare con una commissione predefinita obsoleta.** I portafogli che non hanno adottato ZIP 317 potrebbero ancora inviare la vecchia commissione fissa, lasciando una transazione senza conferma.
- **Inviare nuovamente prima della scadenza.** Una transazione in attesa può ancora essere confermata fino alla sua scadenza. Verifica lo stato di scadenza prima di creare un altro pagamento.

## Nota

Tieni presente che il modo più sicuro per utilizzare ZEC è usare transazioni schermate ogniqualvolta mittente, destinatario, portafoglio e servizio le supportino tutti. Alcuni portafogli ed exchange supportano gli [indirizzi unificati](https://web.archive.org/web/20260823012524/https://electriccoin.co/blog/unified-addresses-in-zcash-explained/#:~:text=The%20unified%20address%20(UA)%20is,within%20the%20broader%20Zcash%20ecosystem.), che possono combinare più tipi di destinatario di Zcash in un unico indirizzo.

## Risorse

- [ZIP 203: Scadenza delle transazioni](https://zips.z.cash/zip-0203)
- [ZIP 317: Meccanismo di commissione proporzionale per i trasferimenti](https://zips.z.cash/zip-0317)
- [ZIP di Zcash](https://zips.z.cash/)

## Pagine correlate

- [Portafogli](/using-zcash/wallets) - quali portafogli supportano l'invio schermato e quali sono solo trasparenti
- [Dichiarazioni di pagamento](/zcash-tech/payment-disclosures) - come un mittente può dimostrare dettagli selezionati di un pagamento schermato
- [Pool schermate](/using-zcash/shielded-pools) - Sapling e Orchard, le pool in cui risiedono i tuoi fondi schermati
- [Memo](/using-zcash/memos) - messaggi cifrati che possono accompagnare una transazione schermata
- [Indirizzi trasparenti degli exchange](/using-zcash/transparent-exchange-addresses) - indirizzi TEX e perché gli exchange li utilizzano
- [Exchange custodial](/using-zcash/custodial-exchanges) - quali exchange supportano prelievi schermati

## Convertitore da ZEC a ZAT
