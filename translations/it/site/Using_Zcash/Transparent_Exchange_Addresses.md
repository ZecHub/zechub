<a href="https://github.com/zechub/zechub/edit/main/site/Using_Zcash/Transparent_Exchange_Addresses.md" target="_blank">
  <img src="https://img.shields.io/badge/Edit-blue" alt="Modifica pagina"/>
</a>

# Cosa sono gli indirizzi TEX Zcash?

## In breve

* Un indirizzo TEX è un indirizzo Zcash trasparente scritto in un formato diverso. Inizia con `tex1` ed è definito in [ZIP 320](https://zips.z.cash/zip-0320).
* Indica al tuo portafoglio una cosa: paga questo indirizzo solo con fondi trasparenti.
* Se il tuo saldo è schermato, un portafoglio compatibile esegue due passaggi per te. Sposta l'importo a un indirizzo trasparente temporaneo, quindi lo invia all'indirizzo TEX.
* Nel 2023, Binance ha chiesto alla comunità di Zcash un modo per rifiutare depositi schermati e rimandarli indietro. Gli indirizzi TEX sono la risposta e Binance è l'exchange nell'elenco ZecHub [Exchange custodial](/using-zcash/custodial-exchanges) che accetta depositi TEX.
* Il supporto è cresciuto anche dal lato dell'invio: Coinbase consente ai suoi utenti di inviare ZEC agli indirizzi TEX e i toolkit per portafogli hanno aggiunto il supporto per ZIP 320.
* Un pagamento a un indirizzo TEX è pubblico sulla blockchain, come qualsiasi pagamento trasparente. Il resto del tuo saldo schermato rimane privato.

## Spiegazione principale

Un indirizzo TEX Zcash è un tipo speciale di indirizzo di ricezione. TEX sta per "Transparent Exchange". È una ricodifica Bech32m di un singolo indirizzo trasparente p2pkh. Gli indirizzi TEX iniziano con `tex1` e sono un tipo distinto dagli Unified Address.

Un indirizzo TEX comunica a un portafoglio compatibile di effettuare una transazione solo trasparente (T -> T). 

La logica è la seguente: quando un portafoglio compatibile rileva un indirizzo TEX, lo decodifica per ottenere il ricevitore trasparente che contiene. Il portafoglio invia quindi i fondi richiesti per la transazione dalla pool schermata a un indirizzo trasparente separato, effimero e controllato dall'utente (Z -> T). Invia poi tali fondi al ricevitore trasparente decodificato dell'indirizzo TEX (T -> T).  

La proposta tecnica per gli indirizzi TEX è illustrata in Zcash [ZIP 320](https://zips.z.cash/zip-0320), che definisce un tipo di indirizzo esclusivamente per ricevere fondi da indirizzi trasparenti.

![TEX](/content-images/ZashiTex-b1cbec5f07.webp)

### Quanto sono diffusi gli indirizzi TEX?

L'adozione è ancora parziale, ma non è più limitata a un singolo exchange. Vale la pena distinguere due ruoli diversi:

* **Emissione di indirizzi TEX per depositi.** Binance è l'exchange nel nostro elenco [Exchange custodial](/using-zcash/custodial-exchanges) che fornisce un indirizzo TEX per i depositi, affinché i fondi arrivino da una fonte trasparente ([ZIP 320, Contesto](https://zips.z.cash/zip-0320#background)). ZIP 320 non prevede che altri exchange emettano indirizzi TEX, a meno che non abbiano bisogno di sapere da quale indirizzo proviene un pagamento.
* **Invio a indirizzi TEX.** È questo il lato che è cresciuto. Nell'ottobre 2024, Coinbase ha annunciato che gli utenti di Coinbase.com possono inviare Zcash agli indirizzi TEX ([annuncio di Coinbase Assets](https://x.com/CoinbaseAssets/status/1844428577921507416)). Anche i toolkit per portafogli hanno aggiunto il supporto per ZIP 320: KeepKey ha aggiunto la firma per le transazioni TEX nel firmware 7.15 ([keepkey/hdwallet #75](https://github.com/keepkey/hdwallet/pull/75)), e la libreria XChainJS `zcash-js` è stata corretta dopo aver rifiutato destinatari `tex1` validi (maggiori dettagli sotto).

Quindi gli indirizzi TEX non sono universali, ma non dovresti più presumere che Binance sia l'unico posto in cui compaiono.

### Quando mi serve un indirizzo TEX

#### Ti serve un indirizzo TEX quando invii fondi a un indirizzo trasparente usando un portafoglio che non supporta l'invio diretto a un indirizzo trasparente.

Alcuni portafogli non consentono l'invio diretto a un indirizzo trasparente e il destinatario potrebbe non fornire un equivalente TEX. Pertanto, talvolta potrebbe essere necessario convertire un indirizzo trasparente in un indirizzo TEX. Puoi farlo manualmente eseguendo l'implementazione di riferimento illustrata in [zip-320](https://zips.z.cash/zip-0320#reference-implementation).

#### Ti serve un indirizzo TEX quando invii fondi a un exchange centralizzato che richiede che tali fondi provengano da una fonte trasparente.

[Binance](https://www.binance.com/) è il motivo per cui esistono gli indirizzi TEX. Nel novembre 2023, ha comunicato alla comunità di Zcash che ZEC avrebbe potuto essere rimosso dall'elenco a meno che non ci fosse stato un modo per rifiutare depositi da indirizzi schermati e restituirli al depositante ([ZIP 320, Contesto](https://zips.z.cash/zip-0320#background)). ZIP 320 non prevede che altri exchange emettano indirizzi TEX, a meno che non abbiano bisogno di sapere da quale indirizzo proviene un pagamento. Binance è l'exchange nel nostro elenco [Exchange custodial](/using-zcash/custodial-exchanges) che accetta depositi a un indirizzo TEX.
Gli indirizzi TEX informano un portafoglio compatibile che tutti i fondi inviati a tale indirizzo devono essere trasparenti ed escludono l'invio di qualsiasi valore schermato a tale indirizzo.
Se un exchange come Binance rifiuta il valore inviato, dispone dei mezzi necessari per restituirlo all'indirizzo da cui proviene. Aiuta inoltre entità come Binance a rispettare le leggi e le normative imposte dai governi o da altre autorità.

### Quali portafogli supportano gli indirizzi TEX?

Puoi consultare l'elenco più aggiornato nella nostra pagina [portafogli](/using-zcash/wallets). Usa il filtro Indirizzo TEX.

## Visuale / analogia

Immagina il tuo saldo schermato come denaro in una cassaforte chiusa a casa. Nessuno all'esterno può vedere quanto denaro contiene.

Un exchange come Binance ha un cartello al bancone: pagamenti accettati solo in una busta trasparente, così il cassiere può vedere da dove proviene il denaro e restituirlo se necessario. L'indirizzo TEX è quel cartello.

Quando il tuo portafoglio vede il cartello, prende l'importo dalla cassaforte, lo inserisce in una busta trasparente con il tuo indirizzo per la restituzione sopra (l'indirizzo trasparente temporaneo) e porta la busta al bancone. La cassaforte rimane chiusa e nessuno scopre cos'altro contiene.

## Approfondimento

### Come viene creato un indirizzo TEX

Un normale indirizzo trasparente che inizia con `t1` contiene un hash della chiave di 20 byte, scritto in Base58Check. Un indirizzo TEX contiene gli stessi 20 byte, ricodificati in Bech32m con il prefisso `tex` (`textest` su testnet). Convertire l'uno nell'altro richiede poche righe di codice, che ZIP 320 mostra nella sua implementazione di riferimento.

Il design semplice era un requisito di Binance: la conversione doveva funzionare usando solo le librerie Base58Check e Bech32m nel codice front-end dell'exchange. Una bozza precedente di ZIP 320 incorporava l'idea negli Unified Address, e quella versione è stata abbandonata per questo motivo.

Gli indirizzi TEX prendono in prestito la codifica Bech32m dal formato Unified Address ma non mantengono quasi nulla della sua struttura. Se non conosci Bech32m e il modo in cui vengono convalidati gli indirizzi Zcash, la pagina [Unified Address](/using-zcash/unified-addresses) tratta le basi nella sezione [ZIP 316](https://zips.z.cash/zip-0316). Un indirizzo TEX differisce da un Unified Address in quattro aspetti concreti:

| | Unified Address (ZIP 316) | Indirizzo TEX (ZIP 320) |
|---|---|---|
| Cosa contiene | diversi ricevitori raggruppati insieme | un singolo ricevitore trasparente P2PKH |
| Prefisso leggibile dall'uomo (HRP) | `u` (mainnet) | `tex` (`textest` su testnet) |
| Offuscamento F4Jumble | sì | no |
| Codici di tipo per ogni ricevitore | sì | no |

In breve, un indirizzo TEX è il più semplice wrapper Bech32m possibile: un hash di chiave trasparente, un prefisso `tex` e nient'altro.

### Regole di gestione per portafogli e integratori

Questa è la parte in cui le implementazioni hanno commesso errori, quindi vale la pena esprimerla chiaramente. Quando rileva un indirizzo TEX, un portafoglio o integratore **non deve spendere direttamente dalla pool schermata verso la destinazione TEX.** ZIP 320 richiede che ogni input di un pagamento TEX sia trasparente, quindi il pagamento viene costruito in due passaggi:

1. **Rimozione della schermatura.** Sposta l'importo dalla pool schermata a un indirizzo trasparente effimero nuovo, controllato dall'utente e posseduto dal portafoglio (Z -> T).
2. **Invio da trasparente a trasparente.** Spendi quell'output effimero verso il ricevitore P2PKH decodificato all'interno dell'indirizzo TEX (T -> T).

Alcune regole rendono tutto ciò sicuro, tutte tratte da ZIP 320:

* L'indirizzo effimero dovrebbe essere derivato dalla tua frase mnemonica, affinché, se l'exchange restituisce i fondi, il tuo portafoglio possa ancora trovarli e spenderli.
* Dovresti usare ogni volta un nuovo indirizzo effimero, affinché pagamenti separati non possano essere collegati tra loro.
* La seconda transazione dovrebbe spendere solo input trasparenti, affinché l'exchange veda un deposito pulito da trasparente a trasparente.

La conversione e il flusso in due passaggi sono mostrati nell'[implementazione di riferimento di ZIP 320](https://zips.z.cash/zip-0320#reference-implementation). Sbagliare questo è un problema reale e recente: nell'ottobre 2026 la libreria XChainJS `zcash-js` ha rifiutato destinatari `tex1` validi con l'errore "Invalid 'to' address", perché il suo validatore accettava solo il formato Base58Check `t1`, interrompendo i depositi ZEC verso servizi che pubblicano un indirizzo `tex1` ([issue #1782](https://github.com/xchainjs/xchainjs-lib/issues/1782)). Il problema è stato risolto insegnando al validatore ad accettare la codifica ZIP 320 ([PR #1783](https://github.com/xchainjs/xchainjs-lib/pull/1783)).

### Cosa rivela un invio TEX

Un pagamento TEX è un pagamento trasparente, quindi è pubblico, ma vale la pena essere precisi su ciò che un osservatore può e non può vedere.

Ciò che è **visibile** on-chain:

* L'indirizzo trasparente effimero, poiché appare come output del passaggio di rimozione della schermatura e input dell'invio finale.
* Entrambi gli importi: il valore che ha lasciato la pool schermata nel passaggio Z -> T e il valore consegnato nel passaggio T -> T.
* Il ricevitore trasparente dell'exchange, che è l'indirizzo P2PKH codificato nell'indirizzo TEX.

Ciò che rimane **nascosto**:

* Il resto del tuo saldo schermato e quali specifiche note schermate hanno finanziato il pagamento. Il passaggio di rimozione della schermatura rivela che *un certo* valore ha lasciato la pool verso l'indirizzo effimero, non da dove all'interno della pool provenisse.

Quindi un osservatore può collegare l'indirizzo effimero al pagamento dell'exchange (stessi fondi, da trasparente a trasparente) e può vedere che è stato ricaricato da un prelievo schermato. Non può collegarlo ai tuoi altri fondi o attività schermati. Nulla on-chain contrassegna effettivamente il pagamento come invio "TEX": come osserva ZIP 320, un pagamento a un indirizzo TEX è indistinguibile da un pagamento al corrispondente indirizzo `t1`, poiché le regole di consenso non cambiano e l'intera regola risiede nel portafoglio.

![On-chain footprint of a TEX send: funds leave the shielded pool to an ephemeral transparent address, then go transparent-to-transparent to the exchange; the ephemeral address, both amounts and the exchange address are visible, while the rest of the shielded balance stays hidden](/content-images/tex-onchain-footprint.webp)

### Cosa mostra la blockchain

La regola TEX risiede nei portafogli. I nodi non la verificano, quindi le regole di consenso rimangono invariate. On-chain, un pagamento a un indirizzo TEX appare uguale a un pagamento al corrispondente indirizzo `t1`. L'importo, l'indirizzo effimero e l'indirizzo dell'exchange sono pubblici, come per qualsiasi transazione trasparente.

## Pagine correlate

- [Unified Address](/using-zcash/unified-addresses): il formato di indirizzo `u1` definito in ZIP 316 e le basi di Bech32m riutilizzate da un indirizzo TEX.
- [Exchange custodial](/using-zcash/custodial-exchanges): quali exchange accettano quali tipi di indirizzo, inclusi i depositi TEX di Binance.
- [Portafogli](/using-zcash/wallets): usa il filtro Indirizzo TEX per trovare portafogli in grado di pagare un indirizzo TEX.
- [Pool schermate](/using-zcash/shielded-pools): dove si trova il tuo saldo privato prima che un pagamento TEX ne sposti una parte all'esterno.
- [Chi può vedere il tuo pagamento Zcash](/start-here/who-can-see-your-zcash-payment): cosa diventa visibile quando i fondi lasciano la pool schermata.
- [Cosa può vedere un block explorer](/zcash-tech/what-a-block-explorer-can-see): come appare un pagamento trasparente on-chain.
- [Zcash URI di richiesta di pagamento](/using-zcash/payment-request-uris): un altro standard di portafoglio per pagamenti precompilati.

**Ultimo aggiornamento:** ottobre 2026
