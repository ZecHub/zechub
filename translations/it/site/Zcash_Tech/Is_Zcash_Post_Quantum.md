<a href="https://github.com/zechub/zechub/edit/main/site/Zcash_Tech/Is_Zcash_Post_Quantum.md" target="_blank">
  <img src="https://img.shields.io/badge/Edit-blue" alt="Edit Page"/>
</a>

# Zcash è post-quantum?

## Risposta breve

No, non ancora.

A partire dall'aggiornamento Ironwood, Zcash è **quantum-recoverable** per i fondi custoditi nella pool Ironwood. Si tratta di un passo concreto, ma non equivale a una sicurezza post-quantum. ZIP 2005, la specifica alla base della modifica, lo dice chiaramente: la modifica "non rende di per sé il protocollo sicuro contro avversari quantistici". Prepara i fondi Ironwood affinché possano essere spostati attraverso un futuro Recovery Protocol una volta disattivata la crittografia attuale.

Questa pagina distingue ciò che Zcash protegge oggi, cosa ha cambiato Ironwood, cosa resta esposto e cosa è solo una proposta. La [tabella di stato](#status-table) verso la fine mostra dove si trova ogni elemento e quando è stato verificato l'ultima volta.

<br/>

## A chi si rivolge

- Chiunque abbia visto "quantum-recoverable" e lo abbia letto come "quantum-proof"
- Detentori che stanno decidendo se spostare fondi in Ironwood
- Redattori e moderatori che hanno bisogno di una risposta con fonti da indicare alle persone

Per un'introduzione all'informatica quantistica stessa, parti da [Sicurezza post-quantum in Zcash](/zcash-tech/post-quantum-security).

<br/>

## Perché la domanda crea confusione

"Post-quantum" viene usato come se fosse una proprietà unica. Per Zcash sono almeno quattro domande distinte, e hanno risposte diverse:

1. **Privacy.** Un attaccante quantistico può vedere chi ha pagato chi e quanto?
2. **Spesa.** Un attaccante quantistico può spendere monete che non gli appartengono?
3. **Inflazione.** Un attaccante quantistico può creare ZEC dal nulla?
4. **Recupero.** Se la crittografia attuale dovesse essere disattivata, gli utenti onesti potrebbero comunque recuperare i loro fondi?

Ironwood cambia solo la risposta alla quarta domanda, e solo per le note nella pool Ironwood.

La minaccia dietro tutto questo è un attaccante capace di calcolare logaritmi discreti sulle curve ellittiche usate da Zcash. Un computer quantistico abbastanza potente che esegua l'algoritmo di Shor sarebbe un modo per farlo. ZIP 2005 fa notare che trovare un **singolo** logaritmo discreto è sufficiente per causare un'inflazione arbitraria o rubare fondi.

<br/>

## Cosa protegge Zcash oggi

Questa tabella descrive il protocollo così come funziona ora, contro un attaccante capace di violare i logaritmi discreti. Si applica a ogni pool schermata, Ironwood inclusa, perché Ironwood usa lo stesso circuito Orchard, le stesse prove Halo 2 e le firme RedPallas di Orchard.

| Proprietà | Contro un attaccante quantistico oggi | Cosa ha cambiato Ironwood |
|---|---|---|
| Privacy | Vale se l'attaccante non conosce il tuo indirizzo schermato. Le prove e le firme rerandomizzate non rivelano nulla in più. Se l'attaccante conosce l'indirizzo, può decifrare le note inviate ad esso, comprese quelle vecchie salvate dalla chain. | Nulla. ZIP 2005: "La situazione per quanto riguarda la privacy è invariata per ogni pool." |
| Spesa | Non protetta. Un attaccante potrebbe falsificare prove o firme di spesa e rubare da qualsiasi pool schermata, anche per indirizzi che non ha mai visto. | Ancora nulla. La protezione arriva solo dopo un futuro passaggio al Recovery Protocol. |
| Inflazione | Non protetta. Un attaccante potrebbe falsificare una prova dall'aspetto valido e creare ZEC dentro qualsiasi pool schermata, magari senza che nessuno se ne accorga. L'unico limite è il [turnstile](/zcash-tech/the-turnstile) (tornello): nessuna pool può pagare più del proprio saldo registrato. | Ancora nulla. Le note Ironwood ora fanno commitment su tutti i loro contenuti in un modo che un attaccante quantistico non dovrebbe riuscire a falsificare, ed è proprio ciò di cui un futuro Recovery Protocol ha bisogno per mantenere l'offerta integra. |
| Recupero | Le note Sprout, Sapling e Orchard non hanno alcun percorso di recupero. Una volta disattivati i loro protocolli, qualsiasi cosa rimasta in esse sarebbe inaccessibile. | Ogni nota Ironwood è recuperabile in linea di principio. Nessuna nota Sapling o Orchard lo è. |

Il ZEC trasparente è un caso a parte. Le sue firme ECDSA possono essere falsificate una volta nota la chiave pubblica. Per un normale indirizzo trasparente questo accade la prima volta che spendi da esso, e c'è anche una breve finestra mentre una transazione resta non confermata nel mempool. ZIP 2005 non cambia nulla di tutto ciò.

<br/>

## Cosa ha cambiato Ironwood

Ironwood è l'aggiornamento di rete NU6.3. Si è attivato sulla Mainnet al blocco 3.428.143 il 28 luglio 2026. Il suo scopo principale era l'integrità dell'offerta dopo il bug di soundness di Orchard (vedi la pagina [Ironwood](/zcash-tech/ironwood)), e la recuperabilità quantistica di ZIP 2005 è stata distribuita come parte di esso.

- **Un nuovo formato di nota.** Ogni nota di output Ironwood usa il formato quantum-recoverable (byte iniziale del plaintext della nota `0x03`). La casualità della nota ora viene derivata da tutti i suoi campi, quindi la nota è legata ai propri contenuti da un hash anziché soltanto dalla matematica delle curve ellittiche.
- **Un percorso di recupero solo per le note Ironwood.** ZIP 326 è esplicito: ogni nota Ironwood è recuperabile e nessuna nota Orchard lo è. Un'impostazione del portafoglio non cambia questo.
- **Orchard ha smesso di accettare nuovo valore.** Le ricompense Coinbase non possono più andare a Orchard, e Orchard non può più inviare a un indirizzo Orchard diverso, quindi il nuovo valore schermato atterra in Ironwood.
- **Ai portafogli viene detto di spostare tutto.** ZIP 2005 dice che i portafogli DOVREBBERO spostare tutti i fondi che controllano, compresi i fondi trasparenti, Sprout e Sapling, in note Ironwood appena è possibile farlo in pratica, e continuare a farlo man mano che arrivano nuovi fondi.

Cosa non ha cambiato Ironwood: la crittografia usata oggi per spendere e generare prove, la crittografia delle note e qualsiasi cosa riguardante il ZEC trasparente.

<br/>

## Limitazioni che restano

**C'è una finestra di esposizione.** Dall'attivazione di Ironwood fino a quando i vecchi protocolli non verranno disattivati, un attaccante quantistico potrebbe comunque rubare, gonfiare o bloccare fondi in ogni pool schermata. ZIP 2005 chiama questo periodo "critical exposure period" e avverte che un attacco durante questo periodo potrebbe comunque danneggiare la capacità di un detentore di recuperare in un secondo momento. Per questo dice che Zcash deve disattivare Orchard, Sapling e Sprout **prima** che gli attacchi quantistici diventino fattibili.

**La disattivazione non ha una data, tranne che per Sprout.** Nessun ZIP programma la disattivazione di Orchard o Sapling. Sprout è diverso: [ZIP 259](https://zips.z.cash/zip-0259) elenca ZIP 2003 tra le modifiche che NU7 distribuisce, quindi da quando NU7 si è attivato le transazioni di versione 4 non sono valide e qualsiasi ZEC rimasto nella pool Sprout non è spendibile. NU7 si è attivato sulla Mainnet al blocco 3.543.405 il 6 novembre 2026 UTC ([ZIP 259](https://zips.z.cash/zip-0259), [annuncio sul forum](https://forum.zcashcommunity.com/t/nu7-timeline/57655)). Una discussione withdraw-only su Sapling è iniziata sul forum ad aprile 2026.

**Il Recovery Protocol non è finito.** ZIP 2005 lo delinea soltanto, e dice che i dettagli "sono soggetti a modifiche". Nulla al riguardo è stato distribuito.

**Harvest now, decrypt later.** I ciphertext delle note per Ironwood, Orchard, Sapling e Sprout sono tutti pubblici sulla chain. Qualcuno può salvarli oggi e decifrarli più tardi, se conosce anche l'indirizzo di ricezione. Ogni indirizzo che pubblichi o distribuisci fa parte di questo rischio. ZIP 2005 dice che "altre modifiche al protocollo sono in fase di valutazione" per i trasferimenti futuri.

**I fondi trasparenti non sono coperti.** Gli indirizzi da cui è già stato speso, o che sono stati riutilizzati, hanno le chiavi pubbliche esposte. La recuperabilità per alcuni indirizzi trasparenti per ora è solo un'idea (ZIP 2007, vedi sotto).

**Le configurazioni FROST hanno un'avvertenza in più.** Con FROST, ogni partecipante detiene una chiave di spesa quantistica (`qsk`), e un attaccante quantistico che la detiene potrebbe riuscire a rubare. ZIP 2005 raccomanda di spostare i fondi FROST verso un protocollo completamente post-quantum con supporto threshold, quando ne esisterà uno.

<br/>

## Proposte e ricerca

Nessuna di queste è attiva.

- **Recovery Protocol.** Il meccanismo che permetterebbe effettivamente di spendere i fondi Ironwood dopo la disattivazione. Delineato in ZIP 2005, non specificato.
- **ZIP 2007, recuperabilità per alcuni indirizzi trasparenti.** Solo un numero ZIP riservato, con discussione in [zips#1302](https://github.com/zcash/zips/issues/1302). L'idea è che gli output P2PKH e P2SH le cui chiavi pubbliche non sono mai state rivelate potrebbero essere recuperabili, con garanzie più deboli di Ironwood.
- **Privacy post-quantum per gli indirizzi noti.** Aperto dal 2022 in [zips#1133](https://github.com/zcash/zips/issues/1133), che rileva che Zcash è "già pensato per avere privacy post-quantum" quando gli indirizzi restano segreti, e chiede come estendere questo agli indirizzi noti, ad esempio con uno schema di key encapsulation post-quantum come Kyber (ora ML-KEM). A giugno 2026 [zips#1307](https://github.com/zcash/zips/issues/1307) ha proposto un ZIP per documentare le attuali proprietà di privacy e le possibili correzioni.
- **Progetto Tachyon.** Un aggiornamento di scalabilità proposto. Il suo sito dice che otterrebbe "piena privacy post-quantum" come effetto collaterale, spostando la consegna dei pagamenti off chain e usando uno scambio di chiavi post-quantum. La sua libreria di proof-carrying data, Ragu, è descritta come "ancora in costruzione". Vedi [Progetto Tachyon](/zcash-tech/project-tachyon).
- **Un Zcash completamente post-quantum.** Prove, firme e commitment post-quantum insieme. Tracciato in [zips#1134](https://github.com/zcash/zips/issues/1134), aperto dal 2016. Non esiste né una specifica né una tempistica.

<br/>

## Tabella di stato

Ultimo controllo il 13 settembre 2026, tranne la riga Sprout, aggiornata il 13 novembre 2026 dopo che NU7 si è attivato. Lo stato nell'intestazione di un ZIP e il suo stato di rete sono cose diverse: ZIP 2005 dice ancora "Proposed" nella sua intestazione anche se le sue regole vengono applicate sulla Mainnet da luglio 2026.

| Voce | Stato di ZIP | Stato di rete | Data | Fonte |
|---|---|---|---|---|
| Pool Ironwood con note quantum-recoverable (NU6.3) | ZIP 2005 Proposed, ZIP 229 e ZIP 258 Draft | **Attivato** sulla Mainnet | 28 lug 2026, blocco 3.428.143 | [ZIP 2005](https://zips.z.cash/zip-2005), [ZIP 258](https://zips.z.cash/zip-0258) |
| Orchard chiusa a nuovo valore | ZIP 2006 Reserved, regole in ZIP 258 | **Attivato** sulla Mainnet | 28 lug 2026 | [ZIP 258](https://zips.z.cash/zip-0258) |
| Portafogli che spostano fondi in Ironwood | Indicazioni in ZIP 2005, ZIP 318 e ZIP 326 (Draft) | Raccomandato, dipende dal tuo portafoglio | Dal 28 lug 2026 | [ZIP 318](https://zips.z.cash/zip-0318), [ZIP 326](https://zips.z.cash/zip-0326) |
| Recovery Protocol | Delineato solo dentro ZIP 2005 | **Non implementato** | Nessuna data | [ZIP 2005](https://zips.z.cash/zip-2005) |
| Disattivazione di Orchard e Sapling | Nessun ZIP | **Non programmata** | Discussione Sapling da apr 2026 | [Forum](https://forum.zcashcommunity.com/t/sapling-withdraw-only-discussion-kickoff/55223) |
| Disattivazione delle spese Sprout (ZIP 2003) | Proposed, distribuito da NU7 secondo ZIP 259 (Proposed) | **Attivato** sulla Mainnet | 6 nov 2026, blocco 3.543.405 | [ZIP 2003](https://zips.z.cash/zip-2003), [ZIP 259](https://zips.z.cash/zip-0259) |
| Recuperabilità trasparente (ZIP 2007) | Reserved | **Proposta** | ZIP riservato il 5 lug 2025, discussione aperta il 17 giu 2026 | [zips#1302](https://github.com/zcash/zips/issues/1302) |
| Privacy post-quantum per gli indirizzi noti | Issue aperte, nessun ZIP | **Ricerca** | #1133 aperto il 18 ago 2022, #1307 aperto il 23 giu 2026 | [zips#1133](https://github.com/zcash/zips/issues/1133), [zips#1307](https://github.com/zcash/zips/issues/1307) |
| Progetto Tachyon | Nessun ZIP | **Proposta**, in sviluppo | Pubblicato per la prima volta ad apr 2025 | [tachyon.z.cash](https://tachyon.z.cash/roadmap/) |
| Protocollo completamente post-quantum | Issue aperta, nessun ZIP | **Lavori futuri** | #1134 aperto il 28 mar 2016 | [zips#1134](https://github.com/zcash/zips/issues/1134) |

Nel sentiment polling NU7 di Zcash Foundation (febbraio 2026), la recuperabilità quantistica ha avuto il 90,5% di sostegno da parte di ZCAP e il 94,6% dai detentori di monete, e Tachyon ha avuto un sostegno quasi universale. Erano sentiment poll, non decisioni su cosa finisce in NU7.

<br/>

## Cosa puoi fare ora

- **Sposta i tuoi fondi in Ironwood.** Le note Sapling e Orchard non saranno mai recuperabili. Spostare valore tra le pool mostra l'importo on-chain, quindi ZIP 318 dice ai portafogli di suddividere i saldi in importi fissi e inviarli gradualmente nel tempo. Lascia fare al tuo portafoglio invece di spostare tutto in una volta.
- **Non pubblicare gli indirizzi schermati che non devi pubblicare.** La privacy contro un attaccante quantistico futuro dipende dal fatto che non conosca il tuo indirizzo. Gli indirizzi unificati si generano con facilità, quindi assegna a ogni pagatore un indirizzo nuovo. ZIP 229 raccomanda la rotazione degli indirizzi per questo motivo.
- **Non riutilizzare gli indirizzi trasparenti.** Una volta che spendi da uno, la sua chiave pubblica resta sulla chain per sempre.
- **Metti al sicuro la tua frase mnemonica.** Nel Recovery Protocol così come delineato, una spesa di recupero deve provare che conosci la tua chiave di spesa, e i portafogli normali derivano quella chiave dal seed.
- **Ignora le affermazioni del tipo "Zcash è quantum-proof".** Non è ancora così, e le persone che scrivono le specifiche lo dicono.

<br/>

## Malintesi comuni

- **"Ironwood è post-quantum."** No. Usa la stessa crittografia Orchard, e ZIP 2005 dice che la funzionalità "non rende il protocollo Orchard sicuro contro gli attacchi quantistici".
- **"Quantum-recoverable significa al sicuro dai computer quantistici oggi."** No. Significa che i fondi Ironwood potrebbero essere recuperati dopo una futura disattivazione, purché avvenga in tempo.
- **"Il Zcash schermato ha già privacy post-quantum."** Solo quando l'attaccante non conosce il tuo indirizzo. Gli indirizzi noti sono esposti in ogni pool.
- **"Tachyon ha già aggiunto privacy post-quantum."** Tachyon è una proposta. Nulla di essa è attivo.
- **"I computer quantistici violano ogni parte di Zcash."** Le funzioni hash sono solo indebolite, non violate, dagli attacchi quantistici noti. La recuperabilità quantistica si basa esattamente su questa differenza.

<br/>

## Pagine correlate

- [Sicurezza post-quantum in Zcash](/zcash-tech/post-quantum-security)
- [Ironwood](/zcash-tech/ironwood)
- [Il turnstile](/zcash-tech/the-turnstile)
- [Progetto Tachyon](/zcash-tech/project-tachyon)
- [FROST](/zcash-tech/frost)
- [Pool schermate](/using-zcash/shielded-pools)

<br/>

## Fonti

- [ZIP 2005: Ironwood Recuperabilità quantistica](https://zips.z.cash/zip-2005)
- [ZIP 229: Formato delle transazioni di versione 6](https://zips.z.cash/zip-0229)
- [ZIP 258: Distribuzione dell'aggiornamento di rete NU6.3](https://zips.z.cash/zip-0258)
- [ZIP 318: Migrazione da Orchard a Ironwood](https://zips.z.cash/zip-0318)
- [ZIP 326: Conseguenze di NU6.3 per i portafogli](https://zips.z.cash/zip-0326)
- [ZIP 2003: Divieto delle transazioni di versione 4](https://zips.z.cash/zip-2003)
- [ZIP 209: Vietare i saldi negativi delle value pool della chain schermata](https://zips.z.cash/zip-0209)
- [zips#1302: Recuperabilità quantistica di un sottoinsieme del protocollo trasparente](https://github.com/zcash/zips/issues/1302)
- [zips#1133: Privacy post-quantum per Zcash](https://github.com/zcash/zips/issues/1133)
- [zips#1307: Privacy di Zcash contro avversari quantistici e capaci di violare i logaritmi discreti](https://github.com/zcash/zips/issues/1307)
- [zips#1134: Zcash completamente post-quantum](https://github.com/zcash/zips/issues/1134)
- [Roadmap del progetto Tachyon](https://tachyon.z.cash/roadmap/)
- [NU7 Risultati del polling: cosa abbiamo ascoltato e come proseguire](https://forum.zcashcommunity.com/t/nu7-polling-results-what-we-heard-and-where-we-go-from-here/54775)
- [Blocco 3.428.143 su ZecBlock](https://zecblock.com/block/3428143)
- [Richiesta sul forum: Zcash è post-quantum?](https://forum.zcashcommunity.com/t/is-zcash-post-quantum-help-wanted-d-proposal/57154)
