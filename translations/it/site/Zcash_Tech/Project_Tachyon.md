<a href="https://github.com/zechub/zechub/edit/main/site/Zcash_Tech/Project_Tachyon.md" target="_blank">
  <img src="https://img.shields.io/badge/Edit-blue" alt="Edit Page"/>
</a>

# Project Tachyon

## TL;DR

- Tachyon è una riprogettazione proposta del modo in cui i portafogli Zcash trovano e spendono fondi schermati, pensata per consentire alla rete di crescere fino a un numero molto elevato di utenti
- Oggi un portafoglio deve tentare di decrittare un'enorme porzione della blockchain per scoprire quali pagamenti gli appartengono, ed è il motivo principale per cui la sincronizzazione schermata risulta lenta
- Tachyon sostituisce questo sistema con la **sincronizzazione cieca** (Oblivious Synchronization), affinché un portafoglio recuperi ciò di cui ha bisogno senza scansionare tutto e senza comunicare a un server quali parti ha richiesto
- Sposta inoltre i dettagli del pagamento fuori dalla blockchain e nella richiesta di pagamento stessa, rendendo il protocollo più semplice ma trasferendo la responsabilità ai portafogli
- È una proposta, pubblicata per la prima volta nell'aprile 2025 e indicata come candidata per NU7. **Non è stata implementata**, e richiede uno sforzo ingegneristico della portata dell'aggiornamento Sapling

<br/>

## A chi è rivolto

- A chiunque abbia osservato la sincronizzazione di un portafoglio schermato e si sia chiesto perché richieda così tanto tempo
- Ai nuovi arrivati che continuano a vedere Tachyon menzionato accanto a NU7 e alla scalabilità di Zcash
- Ai lettori che vogliono prima capire l'idea e poi la crittografia

<br/>

## Il problema che Tachyon risolve

Zcash nasconde a chi è destinato un pagamento. È proprio questo il punto, e crea un problema scomodo: se nessuno può sapere a chi appartiene un pagamento, come fa il tuo portafoglio a trovare i tuoi?

In Bitcoin è semplice. Gli indirizzi sono pubblici, quindi un portafoglio può chiedere a un server "cosa è stato inviato a questo indirizzo?" e ricevere una risposta. Un portafoglio Zcash non può fare questa domanda, perché farla rivelerebbe esattamente ciò che la pool schermata è progettata per nascondere.

Perciò Zcash fa qualcosa di diverso. Il mittente cifra i dettagli del pagamento e li inserisce nella transazione stessa. Il tuo portafoglio elabora quindi le transazioni sulla chain e cerca di decrittarne ciascuna. Quasi ogni tentativo fallisce. I pochi che riescono sono i tuoi pagamenti. Questo è chiamato **decrittazione di prova**, ed è privato, corretto e lento.

![Oggi un portafoglio Zcash scarica ogni transazione schermata e prova a decrittarla, con quasi ogni tentativo che fallisce, per trovare i pochi pagamenti che gli appartengono](/content-images/tachyon-scanning-today.svg)

Il problema è da cosa dipende il lavoro. Lo sforzo del tuo portafoglio è determinato dalle dimensioni della chain, non dal numero di pagamenti che hai effettivamente ricevuto. Chi non ha mai ricevuto un solo pagamento svolge quasi lo stesso lavoro di chi ne riceve ogni giorno. Man mano che Zcash cresce, la situazione peggiora per tutti. Nelle parole della proposta, "semplicemente non scala."

<br/>

## Cosa cambia Tachyon

Tachyon affronta il problema alla radice: smette di usare la blockchain come canale di consegna per i segreti di pagamento.

Invece, i dettagli di cui hai bisogno viaggiano con la richiesta di pagamento stessa, fuori banda. Una richiesta di pagamento, un URI o un codice QR contiene le informazioni che prima venivano cifrate nella transazione. Sean Bowe descrive questo come l'adozione per la prima volta dei **pagamenti fuori banda** in un protocollo schermato Zcash.

Una volta che la chain non trasporta più queste informazioni, il tuo portafoglio non ha più motivo di cercarle e il problema della decrittazione di prova scompare.

Il tuo portafoglio deve comunque conoscere lo stato corrente della chain per poter spendere. Questa è la seconda metà del progetto, la **sincronizzazione cieca**: un modo per consentire a un portafoglio di recuperare le cose specifiche di cui ha bisogno senza rivelare al server quali elementi ha richiesto.

![Con Tachyon il mittente passa i dettagli del pagamento al destinatario fuori banda, e il portafoglio usa la sincronizzazione cieca per recuperare solo i dati di cui ha bisogno invece di scansionare l'intera chain](/content-images/tachyon-oblivious-sync.svg)

<br/>

## Cosa significherebbe per chi usa un portafoglio

- **La sincronizzazione smette di crescere con la chain.** Il tempo che il tuo portafoglio impiega per aggiornarsi seguirebbe la tua attività invece delle dimensioni di Zcash.
- **I pagamenti diventano più simili alla consegna di una fattura.** La richiesta di pagamento contiene ciò di cui il destinatario ha bisogno, quindi lo scambio tra mittente e destinatario conta più di quanto conti oggi.
- **I portafogli hanno maggiori responsabilità.** Poiché la chain non conserva più una copia cifrata dei dettagli del tuo pagamento, perdere i dati del portafoglio diventa più importante. Backup e recupero passano dall'essere una funzionalità del protocollo a qualcosa che il software del portafoglio deve gestire correttamente.
- **Alcuni elementi familiari si spostano o scompaiono.** Tachyon rimuove la diversificazione delle chiavi, le chiavi di visualizzazione e gli indirizzi di pagamento dal protocollo principale, lasciandoli al livello del portafoglio. Questa è una delle parti più significative della proposta ed è ancora in fase di definizione.

<br/>

## Uno sguardo più approfondito per i lettori tecnici

Tachyon è descritto come una modifica compatibile al contrario del protocollo Orchard. Potrebbe essere implementato come aggiornamento dell'attuale pool Orchard oppure come pool schermata separata, raggiunta tramite un [turnstile](https://zechub.wiki/zcash-tech/the-turnstile), lo stesso meccanismo usato da Zcash per Ironwood. La scelta influenza l'implementazione, non il progetto.

Mantiene diversi elementi di Orchard: la ri-randomizzazione delle chiavi RedPallas, gli impegni di valore omomorfici e le firme di binding, nonché la struttura delle chiavi partizionata che permette a un dispositivo di delegare la generazione delle prove senza cedere l'autorità di spesa.

Il lavoro sulla scalabilità si basa sui **dati accompagnati da prove**, una tecnica in cui i dati viaggiano insieme a una prova della propria correttezza, così che la loro combinazione con altri dati accompagnati da prove produca qualcosa che eredita ed estende tali prove. Questo permette di comprimere una grande quantità di lavoro verificato in qualcosa di piccolo e rapido da controllare. Halo, scoperto dal team dietro Zcash, ha reso i dati accompagnati da prove abbastanza pratici da potervi costruire sopra.

Il terzo filone è costituito dagli **aggregati di transazioni schermate**, che modificano il modo in cui vengono comunicati i cambiamenti dello stato schermato e hanno effetti a catena sul funzionamento della firma.

<br/>

## A che punto è il lavoro

Tachyon è una **proposta, non una funzionalità implementata**. È stata pubblicata nell'aprile 2025 e un articolo successivo, nel maggio 2025, ha analizzato le implicazioni sul consenso. È indicata come candidata per NU7, il prossimo importante aggiornamento dopo Ironwood, ma i contenuti di NU7 vengono decisi tramite voto dei possessori di monete e nulla riguardo Tachyon è stabilito.

L'autore stesso la presenta come un piano attuabile piuttosto che una ricerca speculativa, ma che richiede uno sforzo ingegneristico paragonabile a Sapling, lasciando deliberatamente alcune questioni più difficili a un momento successivo.

Il lavoro correlato è già visibile. [Zakura](https://zechub.wiki/zcash-tech/zakura-node), un full node (nodo completo) rilasciato nel luglio 2026, è uno sforzo congiunto tra Project Tachyon e Valar Group e anticipa alcuni di questi cambiamenti a livello di rete. La ricerca sul [recupero privato delle informazioni](https://zechub.wiki/zcash-tech/private-information-retrieval) affronta lo stesso collo di bottiglia della scansione da parte dei portafogli da una diversa prospettiva.

<br/>

## Idee sbagliate comuni

- **Tachyon non è attivo.** Nessun portafoglio lo usa oggi e nessun aggiornamento lo ha attivato.
- **Tachyon non è la stessa cosa di Ironwood.** Ironwood è stato attivato nel luglio 2026 e riguardava la pool Orchard e il turnstile. Tachyon è una proposta separata e successiva sulla scalabilità.
- **Tachyon non riduce la privacy.** L'obiettivo è mantenere l'indistinguibilità del registro eliminando il costo della scalabilità, non sacrificare la privacy per la velocità.
- **La verifica degli zk-SNARK non è mai stata il collo di bottiglia.** La proposta chiarisce che la parte lenta è il modo in cui i portafogli scoprono e coordinano lo stato, non il costo del controllo delle prove.
- **"Destinato a NU7" non è un impegno.** Ciò che entra in NU7 viene deciso tramite voto.

<br/>

## Glossario

| Termine | Significato |
|---|---|
| Trial decryption | Tentare di decrittare le transazioni una per una per trovare quelle indirizzate a te |
| In-band secret distribution | Inserire il segreto di pagamento nella transazione sulla blockchain, come fa oggi Zcash |
| Out-of-band payment | Passare i dettagli del pagamento direttamente tra mittente e destinatario invece che attraverso la chain |
| Oblivious synchronization | Sincronizzazione cieca: recuperare i dati della chain di cui un portafoglio ha bisogno senza rivelare quali dati sono stati richiesti |
| Proof-carrying data (PCD) | Dati che viaggiano con una prova della propria correttezza, così che le prove possano essere combinate e compresse |
| Shielded transaction aggregate | Il modo in cui Tachyon raggruppa i cambiamenti dello stato schermato, modificando come vengono comunicati e firmati |
| ledger indistinguishability | La proprietà per cui le transazioni schermate non possono essere distinte l'una dall'altra |

<br/>

## FAQ

**Questo renderà più veloce la sincronizzazione del mio portafoglio?** È questo l'obiettivo. Il tempo di sincronizzazione seguirebbe la tua attività anziché le dimensioni della chain. Non è stato ancora implementato nulla, quindi non esiste ancora una misurazione da citare.

**Devo fare qualcosa ora?** No. Tachyon è una proposta. Se verrà adottato, arriverà tramite un aggiornamento di rete con il consueto preavviso.

**La rimozione delle chiavi di visualizzazione significa perdere la possibilità di condividere l'accesso in lettura?** La proposta sposta questa capacità fuori dal protocollo principale e nel livello del portafoglio. Il suo aspetto pratico è una delle questioni aperte.

**I miei fondi sono a rischio se Tachyon verrà implementato?** L'implementazione userebbe un aggiornamento Orchard oppure un turnstile, entrambi progettati affinché il valore si muova secondo regole di contabilità pubbliche. La pagina su Ironwood spiega come funziona un turnstile.

<br/>

## Pagine correlate

- [Recupero privato delle informazioni](https://zechub.wiki/zcash-tech/private-information-retrieval) - un altro approccio allo stesso collo di bottiglia della scansione dei portafogli
- [Nodo Zakura](https://zechub.wiki/zcash-tech/zakura-node) - un nodo costruito in parte grazie allo sforzo ingegneristico di Tachyon
- [Ironwood](https://zechub.wiki/zcash-tech/ironwood) - l'aggiornamento attivato nel luglio 2026, spesso confuso con Tachyon
- [Il Turnstile](https://zechub.wiki/zcash-tech/the-turnstile) - il meccanismo che Tachyon potrebbe usare se implementato come pool indipendente
- [Sicurezza post-quantistica](https://zechub.wiki/zcash-tech/post-quantum-security) - il contesto in cui Tachyon si colloca accanto al lavoro sul protocollo a più lungo termine
- [Come è organizzato Zcash](https://zechub.wiki/start-here/how-zcash-is-organized) - chi svolge questo lavoro e come si integra l'ecosistema

<br/>

## Risorse

- [Tachyon: Scalare Zcash con la sincronizzazione cieca](https://seanbowe.com/blog/tachyon-scaling-zcash-oblivious-synchronization/) - Sean Bowe, 2 aprile 2025, la proposta originale
- [Tachyaction at a Distance](https://seanbowe.com/blog/tachyaction-at-a-distance/) - Sean Bowe, 15 maggio 2025, implicazioni per il consenso e il protocollo, scritto per gli sviluppatori del protocollo
- [Il blog di Sean Bowe](https://seanbowe.com/blog/) - dove viene pubblicata la serie Tachyon
- [tachyon.z.cash](https://tachyon.z.cash/) - sito del progetto
