<a href="https://github.com/zechub/zechub/edit/main/site/Using_Zcash/Transactions.md" target="_blank">
  <img src="https://img.shields.io/badge/Edit-blue" alt="Edit Page"/>
</a>


# Transazioni

ZEC è un asset digitale ampiamente utilizzato per i pagamenti, che offre solide funzionalità di privacy rendendolo adatto a diversi tipi di transazioni: pagare amici, effettuare acquisti o fare donazioni. Per massimizzare privacy e sicurezza, è fondamentale comprendere come funzionano i diversi tipi di transazioni all'interno di Zcash.

## Shielded Transactions

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

Le Shielded transactions avvengono quando sposti ZEC nel tuo wallet Shielded. L'indirizzo del tuo wallet Shielded inizia con una U o una Z. Inviando transazioni Shielded, garantisci a te stesso e alle persone con cui transati un livello di privacy non raggiungibile su altre reti di pagamento P2P. Inviare una transazione Shielded è molto semplice: devi solo assicurarti di due cose. La prima è utilizzare il tipo corretto di wallet. Il modo più semplice per farlo è scaricare un [wallet](https://zechub.wiki/wallets). La seconda cosa importante è trasferire ZEC in un wallet Shielded. Quando prelevi ZEC da un exchange, devi verificare se l'exchange supporta prelievi Shielded o Transparent. Se supporta i prelievi Shielded, puoi semplicemente prelevare ZEC direttamente al tuo indirizzo Shielded. Se l'exchange supporta solo prelievi Transparent, dovrai usare YWallet e attivare l'auto-shielding una volta ricevuto il ZEC. Utilizzare esclusivamente Shielded transactions per inviare e ricevere fondi è il modo migliore per preservare la privacy e ridurre il rischio di esporre dati.

## Transparent Transactions

Le Transparent transactions funzionano in modo simile, ma sono prive di protezioni per la privacy: i dettagli delle transazioni risultano pubblicamente visibili sulla blockchain. Le Transparent transactions andrebbero evitate quando la privacy è una priorità. Nota: i wallet Transparent potrebbero incontrare problemi a causa dello ZIP-317, che richiede commissioni proporzionali alla complessità della transazione. Le commissioni predefinite potrebbero portare al rifiuto o al ritardo delle transazioni, rendendo indispensabile la personalizzazione delle commissioni stesse.

<div className="my-8 w-full aspect-video max-w-3xl mx-auto rounded-2xl overflow-hidden shadow-lg bg-black">
  <iframe
    className="w-full h-full"
    src="https://www.youtube.com/embed/R-krX1UpsIg"
    title="Learn 🛡️Zcash shielded wallets!"
    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
    allowFullScreen
    loading="lazy"
  />
</div>


### Gestione delle commissioni per le Transparent Transactions

Indicazioni ZIP-317: la struttura delle commissioni si scala in base alla complessità della transazione, richiedendo aggiustamenti oltre alla commissione standard di 0,00001 ZEC.
Esempio di calcolo: una semplice transazione con una sola nota potrebbe richiedere una commissione di 0,0001 ZEC, che aumenta di circa 0,00005 ZEC per ogni nota aggiuntiva.

Modifica delle commissioni nei wallet

Trust Wallet: accedi alle impostazioni avanzate toccando l'icona dell'ingranaggio durante la creazione di una transazione. Regola con attenzione i campi Miner Tip Gwei e Max Fee Gwei per evitare il fallimento della transazione. Trust Wallet addebita esclusivamente le commissioni di rete.
Coinomi Wallet: offre tre opzioni di commissione dinamica — Bassa, Normale, Alta — in base alle condizioni della rete. Per regolazioni manuali, seleziona Personalizzata sulle monete supportate oppure usa Modifica commissione nell'angolo in alto a destra. Gli utenti possono impostare le commissioni per byte o kilobyte, influenzando i tempi di conferma. Si raccomanda di utilizzare le opzioni dinamiche in caso di incertezza.

Questa versione incorpora indicazioni sulla gestione delle commissioni, opzioni di commissione dinamica e impostazioni di personalizzazione per Trust Wallet e Coinomi, fornendo agli utenti informazioni complete sul controllo delle commissioni.

#### Risorse

[ZIPS](https://zips.z.cash/)

#### Nota

Si precisa che il modo più sicuro di utilizzare ZEC è avvalersi esclusivamente di Shielded transactions. Alcuni wallet sono in fase di implementazione degli [unified addresses](https://electriccoin.co/blog/unified-addresses-in-zcash-explained/#:~:text=The%20unified%20address%20(UA)%20is,within%20the%20broader%20Zcash%20ecosystem.) che consentono a utenti e exchange di combinare indirizzi Transparent e Shielded.

## Convertitore ZEC in ZAT
