<a href="https://github.com/zechub/zechub/edit/main/site/Zcash_Tech/Is_Zcash_Post_Quantum.md" target="_blank">
  <img src="https://img.shields.io/badge/Edit-blue" alt="Modifica pagina"/>
</a>

# Zcash è post-quantum?

## Risposta breve

No, non ancora.

Dall'aggiornamento Ironwood, Zcash è **recuperabile dopo un attacco quantistico** per i fondi detenuti nel pool Ironwood. È un passo concreto, ma non equivale a essere sicuro contro il quantum. ZIP 2005, la specifica alla base, lo afferma direttamente: il cambiamento "does not by itself make the protocol secure against quantum adversaries". Prepara i fondi Ironwood affinché possano essere spostati tramite un futuro Recovery Protocol una volta disattivata la crittografia attuale.

Questa pagina distingue ciò che Zcash protegge oggi, ciò che Ironwood ha modificato, ciò che resta esposto e ciò che è soltanto una proposta. La [tabella di stato](#status-table) verso la fine mostra lo stato di ciascun elemento e quando è stato verificato l'ultima volta.

<br/>

## A chi si rivolge

- Chiunque abbia visto "quantum-recoverable" e lo abbia interpretato come "quantum-proof"
- Detentori che decidono se spostare fondi in Ironwood
- Autori e moderatori che necessitano di una risposta con fonti a cui indirizzare le persone

Per informazioni di base sul calcolo quantistico, inizia da [Sicurezza post-quantum in Zcash](/zcash-tech/post-quantum-security).

<br/>

## Perché la domanda è fonte di confusione

"Post-quantum" viene usato come se fosse un'unica proprietà. Per Zcash si tratta di almeno quattro domande distinte, con risposte diverse:

1. **Privacy.** Un attaccante quantistico può vedere chi ha pagato chi e quanto?
2. **Spesa.** Un attaccante quantistico può spendere monete che non gli appartengono?
3. **Inflazione.** Un attaccante quantistico può creare ZEC dal nulla?
4. **Recupero.** Se la crittografia attuale deve essere disattivata, gli utenti onesti possono comunque recuperare i propri fondi?

Ironwood modifica soltanto la risposta alla quarta domanda, e solo per le note nel pool Ironwood.

La minaccia alla base di tutto questo è un attaccante in grado di calcolare logaritmi discreti sulle curve ellittiche utilizzate da Zcash. Un computer quantistico sufficientemente grande che esegue l'algoritmo di Shor sarebbe un modo per farlo. ZIP 2005 rileva che trovare un **singolo** logaritmo discreto è sufficiente per causare inflazione arbitraria o rubare fondi.

<br/>

## Cosa protegge oggi Zcash

Questa tabella descrive il protocollo così come opera ora, contro un attaccante in grado di violare i logaritmi discreti. Si applica a ogni pool schermato, incluso Ironwood, poiché Ironwood utilizza lo stesso circuito Orchard, prove Halo 2 e firme RedPallas di Orchard.

| Proprietà | Contro un attaccante quantistico oggi | Cosa ha modificato Ironwood |
|---|---|---|
| Privacy | Vale se l'attaccante non conosce il tuo indirizzo schermato. Le prove e le firme rirandomizzate non rivelano nulla in più. Se l'attaccante conosce l'indirizzo, può decifrare le note inviate a esso, comprese quelle vecchie salvate dalla chain. | Nulla. ZIP 2005: "The situation with respect to Privacy is unchanged for any pool." |
| Spesa | Non protetta. Un attaccante potrebbe falsificare prove o firme di spesa e rubare da qualsiasi pool schermato, anche per indirizzi che non ha mai visto. | Ancora nulla. La protezione arriva soltanto dopo un futuro passaggio al Recovery Protocol. |
| Inflazione | Non protetta. Un attaccante potrebbe falsificare una prova apparentemente valida e creare ZEC all'interno di qualsiasi pool schermato, forse senza che nessuno se ne accorga. L'unico limite è il [tornello](/zcash-tech/the-turnstile): nessun pool può pagare più del proprio saldo registrato. | Ancora nulla. Le note Ironwood ora si impegnano a tutti i propri contenuti in un modo che un attaccante quantistico non dovrebbe poter falsificare, che è ciò di cui un futuro Recovery Protocol necessita per mantenere integra l'offerta. |
| Recupero | Le note Sprout, Sapling e Orchard non hanno un percorso di recupero. Una volta disattivati i loro protocolli, tutto ciò che vi resta sarebbe inaccessibile. | Ogni nota Ironwood è recuperabile in linea di principio. Nessuna nota Sapling o Orchard lo è. |

Il ZEC trasparente è un caso separato. Le sue firme ECDSA possono essere falsificate una volta nota la chiave pubblica. Per un normale indirizzo trasparente ciò accade la prima volta che spendi da esso, e vi è anche una breve finestra mentre una transazione resta non confermata nella mempool. ZIP 2005 non modifica nulla di ciò.

<br/>

## Cosa ha modificato Ironwood

Ironwood è l'aggiornamento di rete NU6.3. È stato attivato su Mainnet al blocco 3,428,143 il 28 luglio 2026. Il suo scopo principale era l'integrità dell'offerta dopo il bug di validità Orchard (vedi la pagina [Ironwood](/zcash-tech/ironwood)), e la recuperabilità quantistica da ZIP 2005 è stata inclusa come parte di esso.

- **Un nuovo formato di nota.** Ogni nota di output Ironwood utilizza il formato recuperabile dopo un attacco quantistico (byte iniziale del testo in chiaro della nota `0x03`). La casualità della nota ora deriva da tutti i suoi campi, pertanto la nota è vincolata ai propri contenuti da un hash anziché soltanto dalla matematica delle curve ellittiche.
- **Un percorso di recupero solo per le note Ironwood.** ZIP 326 afferma esplicitamente che ogni nota Ironwood è recuperabile e nessuna nota Orchard lo è. Un'impostazione del wallet non cambia questo fatto.
- **Orchard ha smesso di accettare nuovo valore.** Le ricompense Coinbase non possono più andare a Orchard e Orchard non può più inviare a un diverso indirizzo Orchard, quindi il nuovo valore schermato finisce in Ironwood.
- **Ai wallet viene detto di spostare tutto.** ZIP 2005 afferma che i wallet DOVREBBERO spostare tutti i fondi che controllano, inclusi i fondi trasparenti, Sprout e Sapling, nelle note Ironwood non appena possibile, continuando a farlo all'arrivo di nuovi fondi.

Ciò che Ironwood non ha modificato: la crittografia oggi utilizzata per spendere e dimostrare, la cifratura delle note e qualsiasi aspetto relativo a ZEC trasparente.

<br/>

## Limitazioni che restano

**Esiste una finestra di esposizione.** Dall'attivazione di Ironwood fino alla disattivazione dei vecchi protocolli, un attaccante quantistico potrebbe ancora rubare, inflazionare o bloccare fondi in ogni pool schermato. ZIP 2005 la chiama "critical exposure period" e avverte che un attacco durante tale periodo potrebbe comunque compromettere la capacità di un detentore di recuperare i fondi in seguito. Per questo afferma che Zcash deve disattivare Orchard, Sapling e Sprout **prima** che gli attacchi quantistici diventino realizzabili.

**La disattivazione non ha una data.** Nessun ZIP prevede la disattivazione di Orchard o Sapling. ZIP 2003, una Draft e candidata NU7, disabiliterebbe le spese Sprout vietando le transazioni di versione 4. Una discussione su Sapling in modalità solo prelievo è iniziata sul forum nell'aprile 2026.

**Il Recovery Protocol non è terminato.** ZIP 2005 ne delinea soltanto i contorni e afferma che i dettagli "are subject to change". Nulla al riguardo è stato distribuito.

**Raccogli ora, decifra dopo.** I ciphertext delle note per Ironwood, Orchard, Sapling e Sprout sono tutti pubblici sulla chain. Qualcuno può salvarli oggi e decifrarli in seguito, se conosce anche l'indirizzo destinatario. Ogni indirizzo che pubblichi o distribuisci fa parte di questo rischio. ZIP 2005 afferma che "other protocol changes are under consideration" per i trasferimenti futuri.

**I fondi trasparenti non sono coperti.** Gli indirizzi da cui si è già speso, o riutilizzati, hanno esposto le chiavi pubbliche. La recuperabilità per alcuni indirizzi trasparenti è per ora soltanto un'idea (ZIP 2007, vedi sotto).

**Le configurazioni FROST hanno un'ulteriore avvertenza.** Con FROST, ogni partecipante detiene una chiave di spesa quantistica (`qsk`), e un attaccante quantistico che la possieda potrebbe riuscire a rubare. ZIP 2005 raccomanda di spostare i fondi FROST a un protocollo completamente post-quantum con supporto threshold, non appena ne esista uno.

<br/>

## Proposte e ricerca

Nessuna di queste è attiva.

- **Recovery Protocol.** Il meccanismo che consentirebbe effettivamente di spendere i fondi Ironwood dopo il passaggio. Delineato in ZIP 2005, non specificato.
- **ZIP 2007, recuperabilità per alcuni indirizzi trasparenti.** Solo un numero ZIP riservato con discussione in [zips#1302](https://github.com/zcash/zips/issues/1302). L'idea è che gli output P2PKH e P2SH le cui chiavi pubbliche non siano mai state rivelate possano essere recuperabili, con garanzie più deboli di Ironwood.
- **Privacy post-quantum per indirizzi noti.** Aperta dal 2022 in [zips#1133](https://github.com/zcash/zips/issues/1133), che rileva che Zcash è "already intended to be post-quantum private" quando gli indirizzi restano segreti e chiede come estenderlo agli indirizzi noti, per esempio con uno schema di incapsulamento di chiavi post-quantum come Kyber (ora ML-KEM). Nel giugno 2026 [zips#1307](https://github.com/zcash/zips/issues/1307) ha proposto un ZIP per documentare le proprietà di privacy attuali e le possibili correzioni.
- **Progetto Tachyon.** Un aggiornamento di scalabilità proposto. Il suo sito afferma che otterrebbe "full post-quantum privacy" come effetto collaterale, spostando la consegna dei pagamenti off-chain e usando uno scambio di chiavi post-quantum. La sua libreria di dati con prove, Ragu, viene descritta come "still under construction". Vedi [Progetto Tachyon](/zcash-tech/project-tachyon).
- **Un Zcash completamente post-quantum.** Prove, firme e commitment post-quantum insieme. Tracciato in [zips#1134](https://github.com/zcash/zips/issues/1134), aperto dal 2016. Non esistono specifiche né una tempistica.

<br/>

## Tabella di stato

Ultima verifica: 13 settembre 2026. Lo stato nell'intestazione di uno ZIP e il suo stato sulla rete sono cose diverse: ZIP 2005 riporta ancora "Proposed" nell'intestazione, anche se le sue regole sono applicate su Mainnet da luglio 2026.

| Elemento | Stato ZIP | Stato della rete | Data | Fonte |
|---|---|---|---|---|
| Pool Ironwood con note recuperabili dopo un attacco quantistico (NU6.3) | ZIP 2005 Proposed, ZIP 229 e ZIP 258 Draft | **Attivato** su Mainnet | 28 lug 2026, blocco 3,428,143 | [ZIP 2005](https://zips.z.cash/zip-2005), [ZIP 258](https://zips.z.cash/zip-0258) |
| Orchard chiuso a nuovo valore | ZIP 2006 Reserved, regole in ZIP 258 | **Attivato** su Mainnet | 28 lug 2026 | [ZIP 258](https://zips.z.cash/zip-0258) |
| Wallet che spostano fondi in Ironwood | Linee guida in ZIP 2005, ZIP 318 e ZIP 326 (Draft) | Consigliato, dipende dal tuo wallet | Dal 28 lug 2026 | [ZIP 318](https://zips.z.cash/zip-0318), [ZIP 326](https://zips.z.cash/zip-0326) |
| Recovery Protocol | Delineato solo all'interno di ZIP 2005 | **Non implementato** | Nessuna data | [ZIP 2005](https://zips.z.cash/zip-2005) |
| Disattivazione di Orchard e Sapling | Nessun ZIP | **Non programmata** | Discussione Sapling dall'apr 2026 | [Forum](https://forum.zcashcommunity.com/t/sapling-withdraw-only-discussion-kickoff/55223) |
| Disabilitazione delle spese Sprout (ZIP 2003) | Draft, candidata NU7 | **Non attivata** | Nessuna data | [ZIP 2003](https://zips.z.cash/zip-2003) |
| Recuperabilità trasparente (ZIP 2007) | Reserved | **Proposta** | ZIP riservato il 5 lug 2025, discussione aperta il 17 giu 2026 | [zips#1302](https://github.com/zcash/zips/issues/1302) |
| Privacy post-quantum per indirizzi noti | Problemi aperti, nessun ZIP | **Ricerca** | #1133 aperto il 18 ago 2022, #1307 aperto il 23 giu 2026 | [zips#1133](https://github.com/zcash/zips/issues/1133), [zips#1307](https://github.com/zcash/zips/issues/1307) |
| Progetto Tachyon | Nessun ZIP | **Proposta**, in sviluppo | Pubblicato per la prima volta ad apr 2025 | [tachyon.z.cash](https://tachyon.z.cash/roadmap/) |
| Protocollo completamente post-quantum | Problema aperto, nessun ZIP | **Lavoro futuro** | #1134 aperto il 28 mar 2016 | [zips#1134](https://github.com/zcash/zips/issues/1134) |

Nel sondaggio di opinione Zcash Foundation di NU7 (febbraio 2026), la recuperabilità quantistica ha ricevuto il 90,5% di sostegno da ZCAP e il 94,6% dai possessori di monete, mentre Tachyon ha ottenuto un sostegno quasi universale. Erano sondaggi di opinione, non decisioni su ciò che entra in NU7.

<br/>

## Cosa puoi fare ora

- **Sposta i tuoi fondi in Ironwood.** Le note Sapling e Orchard non saranno mai recuperabili. Spostare valore tra pool mostra l'importo on-chain, quindi ZIP 318 prevede che i wallet dividano i saldi in importi fissi e li inviino nel tempo. Lascia che lo faccia il tuo wallet anziché spostare tutto in una volta sola.
- **Non pubblicare indirizzi schermati di cui non hai bisogno.** La privacy contro un futuro attaccante quantistico dipende dal fatto che questi non conoscano il tuo indirizzo. Gli indirizzi unificati sono economici da generare, quindi fornisci a ogni pagatore uno nuovo. ZIP 229 raccomanda la rotazione degli indirizzi per questo motivo.
- **Non riutilizzare indirizzi trasparenti.** Una volta che spendi da uno di essi, la sua chiave pubblica resta sulla chain per sempre.
- **Conserva al sicuro la tua seed phrase.** Nel Recovery Protocol delineato, una spesa di recupero deve dimostrare che conosci la tua chiave di spesa, e i wallet normali derivano tale chiave dal seed.
- **Ignora le affermazioni "Zcash è quantum-proof".** Non lo è ancora, e le persone che scrivono le specifiche lo affermano chiaramente.

<br/>

## Fraintendimenti comuni

- **"Ironwood è post-quantum."** No. Utilizza la stessa crittografia Orchard, e ZIP 2005 afferma che la funzione "does not make the Orchard protocol secure against quantum attacks".
- **"Quantum-recoverable significa sicuro dai computer quantistici oggi."** No. Significa che i fondi Ironwood potrebbero essere recuperati dopo un futuro passaggio, purché tale passaggio avvenga in tempo.
- **"Il Zcash schermato è già privato post-quantum."** Solo quando l'attaccante non conosce il tuo indirizzo. Gli indirizzi noti sono esposti in ogni pool.
- **"Tachyon ha già aggiunto la privacy post-quantum."** Tachyon è una proposta. Nulla di esso è attivo.
- **"I computer quantistici violano ogni parte di Zcash."** Le funzioni hash vengono solo indebolite, non violate, dagli attacchi quantistici noti. La recuperabilità quantistica si basa esattamente su questa differenza.

<br/>

## Pagine correlate

- [Sicurezza post-quantum in Zcash](/zcash-tech/post-quantum-security)
- [Ironwood](/zcash-tech/ironwood)
- [Il tornello](/zcash-tech/the-turnstile)
- [Progetto Tachyon](/zcash-tech/project-tachyon)
- [FROST](/zcash-tech/frost)
- [Pool schermati](/using-zcash/shielded-pools)

<br/>

## Fonti

- [ZIP 2005: Ironwood Recuperabilità quantistica](https://zips.z.cash/zip-2005)
- [ZIP 229: Formato delle transazioni versione 6](https://zips.z.cash/zip-0229)
- [ZIP 258: Implementazione dell'aggiornamento di rete NU6.3](https://zips.z.cash/zip-0258)
- [ZIP 318: Migrazione da Orchard a Ironwood](https://zips.z.cash/zip-0318)
- [ZIP 326: Conseguenze di NU6.3 per i wallet](https://zips.z.cash/zip-0326)
- [ZIP 2003: Vietare le transazioni di versione 4](https://zips.z.cash/zip-2003)
- [ZIP 209: Vietare saldi negativi dei pool di valore schermati della chain](https://zips.z.cash/zip-0209)
- [zips#1302: Recuperabilità quantistica di un sottoinsieme del protocollo trasparente](https://github.com/zcash/zips/issues/1302)
- [zips#1133: Privacy post-quantum per Zcash](https://github.com/zcash/zips/issues/1133)
- [zips#1307: Privacy di Zcash contro avversari quantistici e in grado di violare il logaritmo discreto](https://github.com/zcash/zips/issues/1307)
- [zips#1134: Zcash completamente post-quantum](https://github.com/zcash/zips/issues/1134)
- [Roadmap del Progetto Tachyon](https://tachyon.z.cash/roadmap/)
- [NU7 Risultati del sondaggio: cosa abbiamo ascoltato e dove andiamo da qui](https://forum.zcashcommunity.com/t/nu7-polling-results-what-we-heard-and-where-we-go-from-here/54775)
- [Blocco 3,428,143 su Blockchair](https://blockchair.com/zcash/block/3428143)
- [Richiesta sul forum: Zcash è post-quantum?](https://forum.zcashcommunity.com/t/is-zcash-post-quantum-help-wanted-d-proposal/57154)
