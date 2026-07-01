<a href="https://github.com/zechub/zechub/edit/main/site/guides/Zero-Knowledge_vs_Decoys.md" target="_blank">
  <img src="https://img.shields.io/badge/Edit-blue" alt="Edit Page"/>
</a>

# Zero Knowledge vs sistemi basati su decoy

"La criptovaluta espone tutte le tue attività di spesa al pubblico, poiché è proprio come avere un Twitter collegato al tuo conto bancario, e questo è un grande problema che deve essere risolto adottando la privacy on-chain." - Ian Miers a [Devcon4](https://youtube.com/watch?v=9s3EbSKDA3o&feature=share9).

Alcuni progetti cripto hanno ottenuto riconoscimento per i loro approcci incentrati sulla privacy. Zcash è rinomato per l'impiego delle Zero Knowledge Proof (ZK) per proteggere gli importi e gli indirizzi delle transazioni. Monero si distingue per l'utilizzo di un'offuscazione del mittente basata su decoy in combinazione con altri schemi di cifratura per ottenere la privacy degli utenti sulla blockchain.


<a href="">
    <img src="https://user-images.githubusercontent.com/38798812/257773807-af8ae27d-0805-4a60-a5ba-749e2fea2490.png" alt="" width="400" height="300"/>
</a>


## Comprendere le ZK Proof e i sistemi basati su decoy

Le Zero Knowledge Proof sono sistemi crittografici che consentono a una parte (il prover) di dimostrare a un'altra parte (il verifier) la validità di un'affermazione senza rivelare *alcuna informazione sottostante sull'affermazione stessa*. Nel contesto di Zcash, le ZK proof vengono impiegate per verificare la validità di una transazione senza divulgare i dettagli della transazione, come il MITTENTE, il DESTINATARIO o l'IMPORTO della transazione. 

**Questo garantisce che la privacy dell'utente sia preservata, poiché la transazione rimane confidenziale pur essendo comunque validata. Questa tecnologia è progettata per garantire la confidenzialità delle transazioni finanziarie sulla rete Zcash.**

Nei sistemi basati su decoy come [RingCT](https://twitter.com/ZecHub/status/1636473585781948416), più transazioni vengono combinate, rendendo arduo o difficile tracciare l'effettiva origine e destinazione dei fondi. L'algoritmo introduce input e output decoy nelle transazioni, impiegando anche la cifratura degli indirizzi usati come input e usando le Range proof per validare che l'importo trasferito sia spendibile. 

Questo approccio offusca la traccia della transazione. L'uso di input decoy rende difficile per chiunque analizzi la blockchain identificare il vero mittente, destinatario o importo della transazione. 

**Nota importante**: questo metodo di transazione che preserva la privacy on-chain rivela comunque esplicitamente gli input (cifrati) di tutte le transazioni degli utenti. È comunque possibile raccogliere metadati come il *FLUSSO DELLE TRANSAZIONI* tra i diversi utenti della rete. Se un avversario partecipa attivamente alla generazione di transazioni sulla rete, di fatto deanonimizza gli input decoy degli altri utenti. 


## Vantaggi delle ZK rispetto ai sistemi basati su decoy

Sia Zcash che Monero sono criptovalute incentrate sulla privacy, ma raggiungono la privacy in modi diversi. 

Ecco alcuni vantaggi delle prove a conoscenza zero (ZK) di Zcash rispetto al sistema di decoy di Monero:

1) **Divulgazione selettiva**: con il set di funzionalità ZK di Zcash, gli utenti hanno la possibilità di rivelare i dettagli delle transazioni a parti specifiche [Leggi il blog di ECC sulla divulgazione selettiva](https://electriccoin.co/blog/viewing-keys-selective-disclosure/). In Zcash, i contenuti cifrati delle transazioni schermate consentono agli individui di rivelare selettivamente i dati di un determinato trasferimento. Inoltre, può essere fornita una viewing key per divulgare tutte le transazioni associate a uno specifico indirizzo schermato. Questa funzionalità consente la conformità normativa e la verificabilità senza compromettere la privacy complessiva della rete. 

Sebbene l'algoritmo di decoy di Monero (firma ad anello) aiuti a fornire privacy, non offre la divulgazione *selettiva* nello stesso modo.


<a href="">
    <img src="https://user-images.githubusercontent.com/38798812/257793324-2dcc6047-300e-4fa7-a28d-2e6cbbadf1df.png" alt="" width="400" height="80"/>
</a>


2) **Visibilità opzionale**: Zcash consente agli utenti di scegliere tra transazioni trasparenti (non private) e schermate (private). Questo significa che Zcash offre agli utenti la flessibilità di mantenere private le proprie informazioni finanziarie (schermate) oppure di renderle trasparenti e pubblicamente disponibili, in modo simile alla maggior parte delle altre blockchain, come spiegato sul [sito ufficiale di Zcash](https://z.cash/learn/what-is-the-difference-between-shielded-and-transparent-zcash/). Questa privacy opt-in consente una maggiore flessibilità e casi d'uso rilevanti per aziende/organizzazioni, poiché alcune transazioni possono richiedere meno privacy per il controllo pubblico, mentre altre traggono beneficio da una privacy potenziata.


3) **Anonymity set**: l'[anonymity set](https://blog.wasabiwallet.io/what-is-the-difference-between-an-anonymity-set-and-an-anonymity-score/) delle shielded pool a conoscenza zero comprende tutte le transazioni che si sono *mai* verificate. Questo è significativamente più grande della maggior parte delle altre tecniche on-chain per ottenere la non collegabilità delle transazioni. Nota: questo si applica solo alle transazioni all'interno della stessa shielded pool.

L'uso dei decoy aumenta effettivamente l'anonymity set. Tuttavia, questo approccio dipende interamente dal numero di utenti *reali* sulla rete. 

4) **Nessun trusted setup**: il setup Sprout e Sapling di Zcash utilizzava un calcolo multipartitico noto come "trusted setup ceremony". Il recente upgrade NU5 non ha richiesto alcun Trust (fiducia) nell'integrità del setup del circuito a conoscenza zero. [Leggi il blog di ECC su NU5](https://electriccoin.co/blog/nu5-activates-on-mainnet-eliminating-trusted-setup-and-launching-a-new-era-for-zcash/).

5) **Privacy dei dati**: la [tecnologia zk-SNARK](https://wiki.zechub.xyz/zcash-technology) usata nelle shielded pool di Zcash consente una sicurezza notevolmente potenziata per gli utenti. La riduzione della fuga di metadati on-chain significa che gli utenti sono al sicuro da avversari come potenziali hacker o organismi statali oppressivi. 

Ci sono stati diversi casi in cui sono stati identificati bug nell'algoritmo di selezione dei decoy di Monero. Questi bug avevano il potenziale di rivelare le spese degli utenti, secondo un report di [Coindesk](https://coindesk.com/markets/2021/07/27/bug-found-in-decoy-algorithm-for-privacy-coin-monero). 


In sintesi, ciò che conta davvero di più è ridurre o eliminare la fuga di informazioni e dati degli utenti, come spiegato da Zooko alla [sessione live AMA di Orchid (priv8)](https://youtube.com/watch?v=XpRzKqEfpP4&feature=share9) 


<a href="">
    <img src="https://user-images.githubusercontent.com/38798812/257788813-509f1139-7daa-4f95-bbb4-c535641962f6.png" alt="" width="400" height="200"/>
</a>


____

***Link di riferimento***

https://z.cash/learn/

https://www.getmonero.org/get-started/what-is-monero/

https://youtu.be/9s3EbSKDA3o

https://electriccoin.co/blog/nu5-activates-on-mainnet-eliminating-trusted-setup-and-launching-a-new-era-for-zcash/

https://youtu.be/XpRzKqEfpP4

https://electriccoin.co/blog/zcash-evolution/

https://electriccoin.co/zcash-metrics/
https://electriccoin.co/blog/viewing-keys-selective-disclosure/



