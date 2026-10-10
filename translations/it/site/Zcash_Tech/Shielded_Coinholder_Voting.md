<a href="https://github.com/zechub/zechub/edit/main/site/Zcash_Tech/Shielded_Coinholder_Voting.md" target="_blank">
  <img src="https://img.shields.io/badge/Edit-blue" alt="Edit Page"/>
</a>

# Voto schermato dei detentori di monete

> Nell'agosto 2026, Zcash ha condotto un sondaggio tra i detentori di monete in cui le schede sono rimaste crittografate e sono stati rivelati solo i totali finali, utilizzando un protocollo di voto schermato sviluppato da Valar Group.

Cosa imparerai: come un voto possa essere ponderato in base alla quantità di ZEC che possiedi, restare privato ed essere comunque conteggiato correttamente, senza che nessuno scopra come hai votato o quanto possiedi.

Il voto schermato dei detentori di monete consente ai possessori di Zcash di votare sulle questioni dell'ecosistema usando i loro ZEC schermati. Nessuno scopre cosa ha votato un singolo individuo o quanti ZEC possiede, eppure chiunque può verificare che i totali siano corretti. Funziona su una catena di voto dedicata realizzata da Valar Group, separata dalla mainnet di Zcash, quindi i tuoi fondi reali non si spostano mai. Per capire più in generale come Zcash prende decisioni, consulta la panoramica su [Zcash finanziamento e governance](../zcash-community/zcash-governance). Questa pagina riguarda soltanto il protocollo crittografico di voto.

Non conosci Zcash? Inizia con [Che cos'è ZEC e Zcash](../start-here/what-is-zec-and-zcash), [Pool schermati](../using-zcash/shielded-pools) e [zk-SNARKs](../zcash-tech/zk-snarks), poi torna qui.

![Shielded voting flow: a voter proves their Ironwood balance at a snapshot, casts an encrypted ballot split into shares, which are homomorphically tallied and then threshold-decrypted into totals only](/content-images/shielded-voting-flow.webp)

## Perché il voto privato è difficile

Un buon voto dei detentori di monete richiede contemporaneamente quattro cose, e i modi più ovvi per ottenerle sono in conflitto tra loro.

1. Ponderazione in base alla quota posseduta, affinché detenere più ZEC abbia maggior peso.
2. Privacy della scelta, affinché nessuno scopra come hai votato.
3. Privacy del saldo, affinché nessuno scopra quanti ZEC possiedi.
4. Un conteggio corretto e verificabile che chiunque possa controllare.

Per ponderare in base alla quota posseduta, sembrerebbe necessario conoscere il saldo di tutti. Per contare le schede, sembrerebbe necessario aprirle. Fare una delle due cose in modo ingenuo divulga esattamente le informazioni private che un [pool schermato](../using-zcash/shielded-pools) esiste per proteggere, e per questo motivo i precedenti voti sulle monete hanno divulgato informazioni sui saldi. Il voto schermato risolve questa tensione con gli stessi strumenti che alimentano i pagamenti schermati: [prove a conoscenza zero](../zcash-tech/zk-snarks), nullifier e crittografia.

## L'intuizione: un'urna che si conta da sola

> Un tornello consente di contare ciò che passa attraverso un caveau bancario senza guardarne l'interno. Un'urna schermata fa un passo ulteriore: somma i voti sigillati senza mai aprirli.

Immagina un'urna con tre poteri insoliti. Può aggiungere una busta sigillata a un totale progressivo senza aprirla. Un gruppo di funzionari, nessuno dei quali detiene da solo la chiave, rivela in seguito soltanto i totali finali. E prima di poter inserire una busta, dimostri discretamente di aver detenuto ZEC in un preciso momento passato e di non aver già votato, senza mostrare quali monete siano tue. Tutto ciò che segue spiega come quell'urna viene realmente costruita.

## Idoneità e snapshot

Un turno di voto fissa un'altezza di snapshot, un singolo blocco della mainnet di Zcash, e il tuo peso corrisponde al tuo saldo schermato spendibile nel pool [Ironwood](../zcash-tech/ironwood) in quel blocco. La regola è semplicemente che un Ironwood ZEC allo snapshot equivale a un voto. Per il sondaggio sull'ambito di NU7, lo snapshot era il blocco mainnet 3.459.350, intorno al 24 agosto 2026 alle 19:00 UTC, con votazioni aperte fino al 14 settembre 2026 alle 19:00 UTC. I ZEC trasparenti sono gestiti separatamente con il metodo precedente, non da questo protocollo.

1. I tuoi fondi non si spostano né vengono mai bloccati. L'idoneità è fissata allo snapshot, quindi puoi spendere o spostare ZEC immediatamente dopo senza influire sul tuo voto.
2. Non esiste una fase di registrazione. Basta un'altezza di snapshot, il che mantiene il processo semplice ed evita di rivelare chi intende votare.

## Dimostrare il proprio saldo senza rivelarlo

Quando voti, il tuo wallet produce una prova a conoscenza zero che dimostra che allo snapshot controllavi alcuni ZEC schermati non spesi. Stabilisce un saldo valido e il suo ammontare per il meccanismo di conteggio privato, ma non rivela note e non produce alcuna transazione sulla mainnet di Zcash.

Quella prova crea un credito di voto sulla catena di voto pari al tuo saldo allo snapshot, posseduto da una nuova chiave di voto che il tuo wallet genera appositamente per questo turno. Poiché la chiave è nuova e non collegata ai tuoi indirizzi Zcash, nulla sulla catena di voto può essere ricondotto alle tue note reali. La tua identità on-chain e la tua scheda sono scollegabili per progettazione.

## Prevenire il doppio voto, privatamente

Per impedire a chiunque di votare due volte con le stesse monete, il sistema deve confermare che le note alla base del tuo saldo non fossero spese allo snapshot. Sulla mainnet ciò avviene rivelando il nullifier di una nota, il suo marcatore univoco di spesa, di cui i nodi completi controllano il riutilizzo. Ma rivelare qui il tuo nullifier collegherebbe direttamente la tua scheda alle tue note.

![Private double-vote prevention: instead of revealing a nullifier, the wallet uses Private Information Retrieval to fetch proof material while hiding which nullifier it asked about, then proves the note was unspent](/content-images/shielded-voting-pir.webp)

Quindi il protocollo dimostra privatamente il contrario. Costruisce un elenco di ogni nullifier già usato allo snapshot, e il tuo wallet dimostra a conoscenza zero che il nullifier della tua nota non è presente in quell'elenco, mostrando che la nota non era spesa senza rivelare quale nota sia.

Rimane un problema. Recuperare da un server la porzione necessaria di tale elenco rivelerebbe il tuo nullifier al server, e l'elenco completo è grande, circa 2 GB per i dati dell'epoca di Orchard e molto più grande man mano che Zcash cresce. [Recupero privato delle informazioni](../zcash-tech/private-information-retrieval) (PIR) risolve entrambi i problemi: il tuo wallet recupera esattamente i dati necessari, nascondendo crittograficamente quali dati ha richiesto. Il risultato viene verificato rispetto a un riepilogo pubblicato dell'elenco dei nullifier, quindi un server disonesto non può forgiare un risultato falso.

## Espressione di una scheda crittografata

Per ogni domanda, il tuo wallet esegue tre operazioni.

1. Crittografa il peso del tuo voto per il comitato di conteggio usando la crittografia omomorfica, un tipo di crittografia i cui testi cifrati possono essere sommati senza essere decrittati. Questo consente all'urna di totalizzare voti che non può leggere.
2. Divide il tuo voto in 16 quote separate, così che persino un comitato pienamente colluso avrebbe difficoltà a ricostruire quanto ha votato una singola persona.
3. Invia quelle quote in momenti casuali attraverso più server, affinché un osservatore non possa capire dai tempi di arrivo che le quote appartengono allo stesso votante.

Ogni quota porta con sé una prova a conoscenza zero che dimostra che è una parte legittima di una scheda valida, quindi nessuno può aggiungere voti privi di copertura. Le quote verificate vengono sommate omomorficamente al totale progressivo crittografato della risposta da te scelta.

## Conteggiare senza aprire alcuna scheda

Il conteggio è gestito da un'autorità elettorale distribuita: almeno 10 validatori della catena di voto, nessuno dei quali può decrittare alcunché da solo. All'inizio di un turno, eseguono congiuntamente una cerimonia di generazione delle chiavi che produce una chiave di crittografia la cui corrispondente chiave di decrittazione è suddivisa tra tutti loro e non viene mai assemblata in un unico luogo.

> Nessun singolo funzionario detiene la chiave. L'urna si apre soltanto quando due terzi di loro usano insieme le proprie chiavi, e anche allora rivela esclusivamente i totali.

Quando il turno si chiude, i totali crittografati esistono già grazie all'addizione omomorfica descritta sopra. Ogni validatore pubblica una decrittazione parziale più una prova di aver decrittato correttamente. Quando almeno due terzi hanno contribuito, le loro parti si combinano nel conteggio finale in chiaro per ogni domanda, e nient'altro viene mai decrittato. Qualsiasi nodo completo può quindi controllare la prova combinata di correttezza, così il pubblico può verificare il conteggio senza fidarsi dei validatori.

## Chi lo gestisce e cosa non può fare

Il design separa due ruoli affinché nessun gruppo abbia troppo potere.

![Separation of powers: a coordinator multisig sets which questions appear but cannot see votes, while a validator set counts but cannot read individual ballots or forge a tally](/content-images/shielded-voting-roles.webp)

Il multisig del coordinatore è un gruppo 2-su-5 con rappresentanti di Project Tachyon, [Zcash Foundation](../zcash-organizations/zcash-foundation), ZODL, [Shielded Labs](../zcash-organizations/shielded-labs) e Valar Group. Decide quali domande arrivano alla catena e attesta la chiave di crittografia di ogni turno, ma non può vedere, modificare o bloccare i singoli voti. Chiunque non gradisca le domande può eseguire la propria catena di voto, poiché il software è aperto e permissionless.

I validatori sono gli almeno 10 nodi che detengono la chiave di decrittazione suddivisa ed eseguono la decrittazione a soglia. Non possono decrittare le singole schede né fabbricare un conteggio falso, perché ogni decrittazione include una prova pubblica di correttezza.

## A cosa serve il quorum

Gli organizzatori fissano una soglia di partecipazione: i risultati del sondaggio sono considerati rappresentativi dei detentori di monete soltanto se almeno 1.000.000 ZEC partecipa ad almeno una domanda, incluse le astensioni. Il quorum non decide alcuna domanda e non viene applicato per ogni domanda. È un singolo controllo sull'intero sondaggio, quindi un risultato viene preso sul serio soltanto quando partecipa una quantità sostanziale di ZEC. Al di sotto di tale livello, l'esito non è considerato un segnale significativo.

## Cosa questo protocollo non protegge

Essere chiari sui limiti fa parte della comprensione del design.

1. È un segnale, non una decisione vincolante. Un sondaggio tra detentori di monete misura il sentimento ponderato in base alla quota posseduta e confluisce nel normale processo di [governance](../zcash-community/zcash-governance) di Zcash, anziché sostituirlo.
2. È ponderato per moneta, quindi l'influenza segue le disponibilità. Una minore frizione può aumentare la partecipazione, ma non modifica la concentrazione di ZEC.
3. L'agenda è fissata dal multisig del coordinatore, che sceglie quali domande compaiono. Non può toccare i voti, e chiunque può eseguire una catena concorrente, ma la definizione dell'agenda rimane comunque un punto di influenza.
4. Il conteggio richiede validatori online. Per produrre il conteggio è necessaria la collaborazione di almeno due terzi di essi, quindi una grande interruzione o un rifiuto coordinato potrebbe ritardare un risultato.
5. La privacy del saldo in caso di collusione completa è una difesa in profondità, non un teorema. Se l'intero comitato ricostruisse segretamente la chiave, la divisione in quote e l'invio temporizzato sono ciò che protegge il tuo saldo, e i progettisti riconoscono che tali misure sono più deboli in caso di collusione. Un'analisi sofisticata del traffico rimane un rischio residuo.
6. Più componenti mobili rispetto al design precedente. Server PIR, server di invio, una nuova chiave di voto e prove in più fasi sono ciascuno un punto in cui potrebbero verificarsi bug o configurazioni errate. Il sistema è open source e alcune parti sono state sottoposte ad audit indipendenti, il che gestisce il rischio anziché eliminarlo.

Ciò che protegge, in modo forte e verificabile, sono le due cose più importanti: la tua scheda non può essere collegata alla tua identità e vengono rivelati soltanto i totali finali.

## Glossario

| Termine | Significato in parole semplici |
|---|---|
| Voting chain | Una blockchain separata, realizzata da Valar Group, che esegue il voto; le tue note Zcash non vi vengono mai spostate |
| Snapshot height | Il blocco mainnet i cui saldi determinano il peso del voto (blocco 3.459.350 per il sondaggio NU7) |
| Nullifier | Il marcatore univoco di spesa di una nota; rivelarlo collegherebbe una scheda a una nota, quindi il voto dimostra invece la non appartenenza |
| Private Information Retrieval (PIR) | Recuperare dati da un server nascondendo quali dati sono stati richiesti |
| Homomorphic encryption | Crittografia i cui testi cifrati possono essere sommati senza essere decrittati |
| Coordinator multisig | Il gruppo 2-su-5 che autorizza le domande e la chiave del turno, ma non può vedere né modificare i voti |
| Election authority | I 10 o più validatori che detengono congiuntamente la chiave di decrittazione suddivisa e rivelano soltanto il conteggio finale |
| Threshold decryption | Recuperare un risultato soltanto quando collaborano abbastanza possessori di quote della chiave, qui due terzi |
| Quorum | La partecipazione minima di 1.000.000 ZEC affinché il sondaggio sia considerato rappresentativo |

## FAQ

Le mie monete si spostano o vengono bloccate quando voto? No. L'idoneità viene misurata al blocco di snapshot, quindi i tuoi ZEC restano dove sono e spendibili. Il voto produce prove su una catena separata, non una transazione Zcash.

Qualcuno può sapere come ho votato o quanto possiedo? No. Le schede sono crittografate e vengono decrittati soltanto i totali aggregati. Il tuo voto non può essere collegato alla tua identità e il tuo saldo è diviso in 16 quote temporizzate per proteggerlo persino da un comitato colluso.

Cosa impedisce a qualcuno di votare due volte o di votare con monete che non possiede? Ogni scheda include prove a conoscenza zero che dimostrano che è coperta da un saldo reale e non speso allo snapshot, e una prova di non appartenenza basata su PIR mostra che la nota sottostante non era già stata spesa, senza rivelare quale nota sia.

Chi conta i voti? Un insieme distribuito di almeno 10 validatori, nessuno dei quali può decrittare alcunché da solo. Due terzi devono collaborare per rivelare i totali, e ogni decrittazione è accompagnata da una prova pubblica di correttezza.

Il risultato è vincolante? È un segnale del sentimento dei detentori di monete ponderato in base alla quota posseduta. Informa la normale governance di Zcash anziché attuare automaticamente un cambiamento.

Posso eseguirlo o verificarlo personalmente? Sì. Il software della catena di voto, i circuiti, il sistema PIR e un revisore del conteggio sono tutti pubblicati da Valar Group affinché chiunque possa ispezionarli ed eseguirli.

## Verifica la tua comprensione

Se ogni scheda è crittografata e ogni votante è anonimo, come può chiunque essere sicuro che i totali pubblicati siano corretti e che nessuno abbia votato due volte?

<details>
<summary>Risposta</summary>

Tre prove svolgono il lavoro. Ogni scheda include una prova a conoscenza zero che dimostra che è coperta da un saldo reale allo snapshot, quindi non vengono conteggiati voti privi di copertura. Una prova di non appartenenza basata su PIR mostra che la nota sottostante non era spesa, prevenendo il doppio voto senza rivelare la nota. E quando i validatori decrittano i totali, ciascuno pubblica una prova di correttezza, così qualsiasi nodo completo può confermare che i numeri finali sono stati decrittati onestamente dalle schede crittografate.
</details>

## Risorse

- [NU7 Annuncio del voto dei detentori di monete (Valar Group e Project Tachyon)](https://forum.zcashcommunity.com/t/nu7-coinholder-vote/56912) - il post del forum che definisce l'ambito del sondaggio, l'altezza di snapshot e il calendario
- [La catena di voto dei detentori di monete: design tecnico](https://forum.zcashcommunity.com/t/the-coinholder-voting-chain/56925) - la descrizione del protocollo su cui si basa questa pagina
- [Valar Group documentazione sul voto schermato](https://valargroup.gitbook.io/shielded-vote-docs) - il riferimento aggiornato per la catena di voto
- [Valar Group codice di voto e audit (GitHub)](https://github.com/valargroup/vote-sdk) - l'implementazione open source e i relativi audit

## Pagine correlate

- [Recupero privato delle informazioni](../zcash-tech/private-information-retrieval) - la tecnica di prova di non appartenenza alla base della prevenzione privata del doppio voto
- [Ironwood](../zcash-tech/ironwood) - il pool schermato i cui saldi determinano il peso del voto
- [zk-SNARKs](../zcash-tech/zk-snarks) - il sistema di prove alla base delle prove di saldo e idoneità
- [Pool schermati](../using-zcash/shielded-pools) - che cos'è un saldo schermato e perché rimane nascosto
- [Zcash panoramica su finanziamento e governance](../zcash-community/zcash-governance) - come questo segnale di sentimento confluisce nel più ampio processo decisionale di Zcash
- [Shielded Labs](../zcash-organizations/shielded-labs) - uno dei cinque membri del multisig del coordinatore
