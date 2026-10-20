<a href="https://github.com/zechub/zechub/edit/main/site/Using_Zcash/Transparent_Exchange_Addresses.md" target="_blank">
  <img src="https://img.shields.io/badge/Edit-blue" alt="Modifica pagina"/>
</a>

# Cosa sono gli indirizzi TEX di Zcash?

## In breve

* Un indirizzo TEX è un indirizzo trasparente di Zcash scritto in un formato diverso. Inizia con `tex1` ed è definito in [ZIP 320](https://zips.z.cash/zip-0320).
* Indica una cosa al tuo portafoglio: paga questo indirizzo solo con fondi trasparenti.
* Se il tuo saldo è schermato, un portafoglio compatibile esegue due passaggi per te. Sposta l'importo a un indirizzo trasparente temporaneo, poi lo invia all'indirizzo TEX.
* Nel 2023, Binance ha chiesto alla community di Zcash un modo per rifiutare i depositi schermati e rimandarli indietro. Gli indirizzi TEX sono la risposta e Binance è l'exchange nell'elenco ZecHub [Custodial Exchanges](/using-zcash/custodial-exchanges) che accetta depositi TEX.
* Un pagamento a un indirizzo TEX è pubblico sulla blockchain, come qualsiasi pagamento trasparente. Il resto del tuo saldo schermato rimane privato.

## Spiegazione fondamentale

Un indirizzo TEX di Zcash è un tipo speciale di indirizzo di ricezione. TEX significa "Transparent Exchange". È una ricodifica Bech32m di un singolo indirizzo trasparente p2pkh. Gli indirizzi TEX iniziano con `tex1` e sono un tipo distinto dagli Unified Address.

Un indirizzo TEX indica a un portafoglio compatibile di effettuare una transazione solo trasparente (T -> T). 

La logica è la seguente: quando un portafoglio compatibile rileva un indirizzo TEX, lo decodifica per ottenere il destinatario trasparente che contiene. Il portafoglio invia quindi i fondi richiesti per la transazione dalla pool schermata a un indirizzo trasparente effimero separato, controllato da te (Z -> T). Poi invia tali fondi al destinatario trasparente decodificato dell'indirizzo TEX (T -> T).  

La proposta tecnica per gli indirizzi TEX è descritta in Zcash [ZIP 320](https://zips.z.cash/zip-0320), che definisce un tipo di indirizzo esclusivamente per ricevere fondi da indirizzi trasparenti.

![TEX](/content-images/ZashiTex-b1cbec5f07.webp)

Gli indirizzi TEX non sono ancora ampiamente adottati. Agli utenti di Zcash potrebbe essere richiesto di usarli in futuro.

### Quando mi serve un indirizzo TEX

#### Ti serve un indirizzo TEX quando invii fondi a un indirizzo trasparente usando un portafoglio che non supporta l'invio diretto a un indirizzo trasparente.

Alcuni portafogli non consentono l'invio diretto a un indirizzo trasparente e il destinatario potrebbe non fornire un equivalente TEX. Pertanto, talvolta potrebbe essere necessario convertire un indirizzo trasparente in un indirizzo TEX. Puoi farlo manualmente eseguendo l'implementazione di riferimento descritta in [zip-320](https://zips.z.cash/zip-0320#reference-implementation).

#### Ti serve un indirizzo TEX quando invii fondi a un exchange centralizzato che richiede che tali fondi provengano da una fonte trasparente.

[Binance](https://www.binance.com/) è il motivo per cui esistono gli indirizzi TEX. Nel novembre 2023, ha comunicato alla community di Zcash che ZEC avrebbe potuto essere rimosso dall'elenco a meno che non ci fosse stato un modo per rifiutare i depositi da indirizzi schermati e rimandarli al depositante ([ZIP 320, contesto](https://zips.z.cash/zip-0320#background)). ZIP 320 non prevede che altri exchange emettano indirizzi TEX, a meno che non abbiano bisogno di sapere da quale indirizzo proviene un pagamento. Binance è l'exchange nel nostro elenco [Custodial Exchanges](/using-zcash/custodial-exchanges) che accetta depositi a un indirizzo TEX.
Gli indirizzi TEX informano un portafoglio compatibile che tutti i fondi inviati a tale indirizzo devono essere trasparenti ed escludono l'invio di qualsiasi valore schermato a detto indirizzo.
Se un exchange come Binance rifiuta il valore inviato, dispone dei mezzi necessari per restituirlo all'indirizzo da cui proviene. Aiuta inoltre entità come Binance a conformarsi alle leggi e ai regolamenti imposti dai governi o da altre autorità.

### Quali portafogli supportano gli indirizzi TEX?

Puoi consultare l'elenco più aggiornato nella nostra pagina [portafogli](/using-zcash/wallets). Usa il filtro TEX Address.

## Visualizzazione / Analogia

Pensa al tuo saldo schermato come al denaro in una cassaforte chiusa a chiave in casa. Nessuno all'esterno può vedere quanto contiene.

Un exchange come Binance ha un cartello sul bancone: pagamenti accettati solo in una busta trasparente, così il cassiere può vedere da dove proviene il denaro e restituirlo se necessario. L'indirizzo TEX è quel cartello.

Quando il tuo portafoglio vede il cartello, prende l'importo dalla cassaforte, lo mette in una busta trasparente con il tuo indirizzo di ritorno (l'indirizzo trasparente temporaneo) e porta la busta al bancone. La cassaforte rimane chiusa e nessuno scopre cos'altro contiene.

## Approfondimento

### Come viene creato un indirizzo TEX

Un normale indirizzo trasparente che inizia con `t1` contiene un hash della chiave di 20 byte, scritto in Base58Check. Un indirizzo TEX contiene gli stessi 20 byte, ricodificati in Bech32m con il prefisso `tex` (`textest` su testnet). Convertire l'uno nell'altro richiede poche righe di codice, che ZIP 320 mostra nella sua implementazione di riferimento.

Il design semplice era un requisito di Binance: la conversione doveva funzionare usando solo le librerie Base58Check e Bech32m nel codice front-end dell'exchange. Una bozza precedente di ZIP 320 incorporava l'idea negli Unified Address, e quella versione è stata scartata per questo motivo.

### Pagare un indirizzo TEX da un saldo schermato

ZIP 320 richiede a un portafoglio compatibile di creare qui due transazioni. La prima sposta i fondi dal tuo saldo schermato a un nuovo indirizzo trasparente effimero. La seconda li invia da quell'indirizzo all'indirizzo TEX.

Se l'exchange rifiuta il deposito, restituisce i fondi all'indirizzo effimero. Il tuo portafoglio deve poterli trovare e spendere, quindi ZIP 320 chiede ai portafogli di derivare gli indirizzi effimeri dalla tua frase mnemonica. Chiede inoltre ai portafogli di usare ogni volta un nuovo indirizzo effimero, affinché pagamenti separati non possano essere collegati tra loro.

### Cosa mostra la blockchain

La regola TEX risiede nei portafogli. I nodi non la verificano, quindi le regole di consenso rimangono invariate. On-chain, un pagamento a un indirizzo TEX appare identico a un pagamento all'indirizzo `t1` corrispondente. L'importo, l'indirizzo effimero e l'indirizzo dell'exchange sono pubblici, come in qualsiasi transazione trasparente.

## Pagine correlate

- [Custodial Exchanges](/using-zcash/custodial-exchanges): quali exchange accettano quali tipi di indirizzo, inclusi i depositi TEX di Binance.
- [Portafogli](/using-zcash/wallets): usa il filtro TEX Address per trovare portafogli che possono pagare un indirizzo TEX.
- [Pool schermate](/using-zcash/shielded-pools): dove si trova il tuo saldo privato prima che un pagamento TEX ne sposti una parte fuori.
- [Chi può vedere il tuo pagamento di Zcash](/start-here/who-can-see-your-zcash-payment): cosa diventa visibile quando i fondi lasciano la pool schermata.
- [Cosa può vedere un block explorer](/zcash-tech/what-a-block-explorer-can-see): come un pagamento trasparente appare on-chain.
- [Zcash URI di richiesta di pagamento](/using-zcash/payment-request-uris): un altro standard dei portafogli per pagamenti precompilati.

**Ultimo aggiornamento:** ottobre 2026
