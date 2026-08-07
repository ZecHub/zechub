<a href="https://github.com/zechub/zechub/edit/main/site/Zcash_Tech/Zcash_Shielded_Assets.md" target="_blank">
  <img src="https://img.shields.io/badge/Edit-blue" alt="Modifica pagina"/>
</a>
<a href="">
    <img src="/content-images/image-2023-11-18-160742427-658dda69c0.webp" alt="" width="800" height="500"/>
</a>

# Zcash Shielded Assets

## TL;DR

Gli Zcash Shielded Assets (ZSA) sono un’estensione proposta del protocollo che permetterebbe ad asset **diversi da ZEC** — stablecoin, governance token o qualsiasi asset personalizzato — di esistere all’interno dello shielded pool di Zcash, mantenendo privati il mittente, il destinatario e l’importo.

- **Che cos’è:** asset personalizzati in stile ERC-20, ma schermati per impostazione predefinita.
- **Chi lo sta costruendo:** [QEDIT](https://qed-it.com/), nell’ambito di una grant della Zcash Foundation, in collaborazione con la Electric Coin Company.
- **Come è specificato:** [ZIP 226](https://zips.z.cash/zip-0226) (trasferimento e burn) insieme a [ZIP 227](https://zips.z.cash/zip-0227) (emissione).
- **Stato:** non ancora attivo su mainnet. Il protocollo ZSA è previsto per il deployment nel Network Upgrade 7 (NU7).
- **Commissioni:** sempre pagate in ZEC, indipendentemente dall’asset trasferito.

---

## Spiegazione di base

Gli Zcash Shielded Assets (ZSA) sono un miglioramento proposto al protocollo Zcash che consentirebbe la creazione, il trasferimento e il burn di asset personalizzati sulla chain di Zcash.

Se hai familiarità con lo standard di token [ERC-20](https://ethereum.org/en/developers/docs/standards/tokens/erc-20/) sulla blockchain di Ethereum, gli ZSA stanno a Zcash come i token ERC-20 stanno a Ethereum.

Gli Zcash Shielded Assets permetterebbero la creazione di token personalizzati sulla blockchain di Zcash, consentendo così a token diversi da [ZEC](/guides/using-zec-privately) di beneficiare dell’anonimato e della privacy delle transazioni schermate sulla blockchain di Zcash.

Un importante utilizzo potenziale degli ZSA sarebbe l’emissione di stablecoin sul protocollo Zcash. Le stablecoin sono criptovalute che ancorano il loro valore a una valuta fiat, come il Dollaro USA o l’Euro. Attualmente, alcune delle stablecoin più diffuse sono token ERC-20 come [USDC](https://www.circle.com/en/usdc) e [Dai](https://docs.makerdao.com/).

Un altro potenziale utilizzo degli ZSA sarebbe l’emissione di governance token. Per esempio, Zechub (l’editore di questo wiki) è una Decentralized Autonomous Organization (DAO) e potrebbe creare ed emettere ai suoi membri uno ZSA per votare proposte e decisioni di governance.

Gli ZSA sono sviluppati da [QEDIT](https://qed-it.com/), grazie a una importante grant della [Zcash Foundation](/zcash-organizations/zcash-foundation) in collaborazione con la [Electric Coin Company](/zcash-organizations/electric-coin-company). Poiché questo progetto è ancora in fase di sviluppo attivo, gli aggiornamenti vengono pubblicati in [questa discussione](https://forum.zcashcommunity.com/t/grant-update-zcash-shielded-assets-monthly-updates/41153) del forum Zcash. La [domanda di grant per ZSA](https://zcashgrants.org/gallery/25215916-53ea-4041-a3b2-6d00c487917d/33106640/) di QEDIT è disponibile sul sito delle grant della Zcash Foundation.

---

## Visualizzazione / Analogia

### La busta sigillata

Immagina una transazione schermata di Zcash come una semplice busta sigillata imbucata in una cassetta postale pubblica. Chiunque può vedere che una busta è stata spedita. Nessuno può vedere chi l’ha inviata, chi la ritira o cosa contiene — e ogni busta appare identica a tutte le altre.

Oggi, una busta sulla rete Zcash può contenere una sola cosa: ZEC.

ZSA non cambia la busta. Cambia **ciò che è consentito al suo interno**. Dopo ZSA, la stessa busta sigillata potrebbe contenere una stablecoin, un governance token di una DAO o un punto fedeltà aziendale — e dall’esterno continuerebbe comunque ad apparire esattamente come ogni altra busta sulla rete.

Vale la pena ricordare un dettaglio: **l’affrancatura si paga sempre in ZEC**, indipendentemente da ciò che c’è nella busta.

### Cosa può vedere un osservatore esterno

| Un osservatore può vedere... | ERC-20 su Ethereum | ZSA su Zcash |
| --- | --- | --- |
| Chi lo ha inviato | Pubblico | Schermato |
| Chi lo ha ricevuto | Pubblico | Schermato |
| Quanto è stato trasferito | Pubblico | Schermato |
| Saldi individuali | Pubblici | Schermati |
| Offerta totale dell’asset | Pubblica | **Pubblica — deliberatamente** |
| Valuta in cui viene pagata la commissione | ETH | ZEC |

### Perché la riga sull’offerta non è un bug

Le ultime due righe della tabella sono il punto in cui ZSA diventa interessante.

ZIP 227 mantiene deliberatamente **trasparente l’emissione**, in modo che l’offerta circolante di ogni asset possa essere tracciata on-chain. Le disponibilità individuali e i pagamenti individuali restano privati; il numero totale di token esistenti no.

Per un emittente di stablecoin, questa combinazione è il punto centrale più che un compromesso. Le riserve possono essere sottoposte ad audit rispetto a un’offerta pubblicamente verificabile, mentre le persone che usano effettivamente il token mantengono privati i propri saldi e pagamenti.

### Un asset, un’identità

Ogni asset riceve un **Asset Identifier** univoco, derivato dalla chiave di emissione dell’emittente insieme a una descrizione testuale dell’asset. Due emittenti diversi non possono produrre lo stesso identificatore, e il conio o la modifica di un asset richiedono l’autorizzazione crittografica del suo emittente. In termini di busta: chiunque può spedire una busta, ma solo la zecca che possiede un determinato asset può stamparne altra quantità.

---

## Approfondimento

### Demo ZSA su Zebra

[![Miniatura video](/content-images/hqdefault-3ae84de424.webp)](https://youtu.be/1MZMGC9ViyA)

**Esegui la demo tu stesso!**

Clona il repository zcash-tx-tool: <https://github.com/QED-it/zcash_tx_tool>

### Zcash Improvement Proposals (ZIP)

- [ZIP 226](https://zips.z.cash/zip-0226): Transfer and Burn of Zcash Shielded Assets
- [ZIP 227](https://zips.z.cash/zip-0227): Issuance of Zcash Shielded Assets
- [ZIP 230](https://zips.z.cash/zip-0230): Version 6 Transaction Format

> **Nota su ZIP 230:** ZIP 230 è stato successivamente ritirato e non verrà distribuito. La versione 6 delle transazioni è ora definita da [ZIP 229](https://zips.z.cash/zip-0229). Vedi l’avviso all’inizio della pagina [ZIP 230](https://zips.z.cash/zip-0230).

ZIP 226 definisce il protocollo OrchardZSA — un’estensione del protocollo Orchard che gestisce il trasferimento e il burn di asset personalizzati. ZIP 227 definisce come questi asset vengono creati in primo luogo e deve essere implementato solo insieme a ZIP 226.

### Proposta di grant ZSA

La proposta ZSA per gli Shielded Assets (ZSA/UDA) è stata presentata dal team di [QEDIT](https://qed-it.com/) per costruire asset schermati generici sulla blockchain di Zcash. Questi vengono generalmente indicati come User Defined Assets (UDA) o come Zcash Shielded Assets (ZSA).

Con questa proposta, il team di [QEDIT](https://qed-it.com/) intende portare la DeFi nell’ecosistema Zcash e, allo stesso tempo, abilitare l’uso della migliore tecnologia per la privacy all’interno dell’ecosistema DeFi esistente. In un sondaggio, il team ha chiesto, e la comunità ha risposto, che [gli asset schermati generici (ZSA/UDA) sono al momento la funzionalità più richiesta](https://twitter.com/BenarrochDaniel/status/1428327864034791429).

Queste proposte sono tecnicamente aderenti alla specifica [Zcash Improvement Proposal (ZIP)](https://zips.z.cash/zip-0000) e sono definite in ZIP 226 e ZIP 227.

1. [ZIP 226](https://zips.z.cash/zip-0226): Transfer and Burn of Zcash Shielded Assets
2. [ZIP 227](https://zips.z.cash/zip-0227): Issuance of Zcash Shielded Assets

---

## Implicazioni pratiche

**Se possiedi o usi ZEC**

- Gli ZSA sono definiti come un’estensione di Orchard ("OrchardZSA"), quindi condividerebbero il meccanismo schermato che ZEC usa già. Il tuo wallet avrà bisogno di un supporto esplicito per ZSA prima di poterli detenere o inviare.
- Avrai sempre bisogno di avere a disposizione un po’ di ZEC. Le commissioni per emettere e trasferire uno ZSA vengono pagate in ZEC, non nell’asset stesso.
- Nulla cambia per le tue transazioni ZEC esistenti.

**Se sei un potenziale emittente — una stablecoin, una DAO, un’azienda**

- L’emissione di un asset richiede un’autorizzazione crittografica legata a una chiave di emissione, quindi solo tu puoi coniare o modificare gli attributi del tuo asset.
- L’offerta circolante del tuo asset è verificabile pubblicamente, mentre i saldi e i trasferimenti dei tuoi utenti non lo sono. Per un emittente regolamentato, questa è di solito esattamente la combinazione richiesta.
- Una singola transazione di emissione può creare più di un asset contemporaneamente.

**Per l’ecosistema**

- Poiché ogni commissione ZSA è denominata in ZEC, l’attività di qualsiasi futuro asset emesso su Zcash crea domanda per ZEC stessa.

---

## Errori comuni

| Credenza comune | Qual è in realtà la situazione |
| --- | --- |
| "Gli ZSA sono già attivi su Zcash oggi." | No. Il deployment di ZSA è previsto nel Network Upgrade 7 (NU7) ed è ancora in fase di revisione e testing. |
| "ZSA porta gli smart contract su Zcash." | ZSA specifica l’emissione, il trasferimento e il burn degli asset. Non è un layer di contratti programmabili general-purpose. |
| "Puoi pagare le commissioni ZSA nel token ZSA stesso." | Le commissioni si pagano in ZEC. |
| "Se è schermato, allora anche l’offerta del token deve essere segreta." | ZIP 227 rende deliberatamente trasparente l’emissione, così che l’offerta di ciascun asset possa essere tracciata pubblicamente. I saldi e i trasferimenti restano privati; l’offerta no. |
| "ZIP 230 è l’attuale formato di transazione versione 6." | ZIP 230 è stato ritirato. La versione 6 è ora definita da ZIP 229. |

---

## Pagine correlate

- [Halo](/zcash-tech/halo) — il sistema di proving alla base di Orchard, il protocollo che ZSA estende
- [Zk-SNARKs](/zcash-tech/zk-snarks) — le prove a conoscenza zero che permettono di verificare un trasferimento schermato senza rivelarlo
- [Shielded Pools](/using-zcash/shielded-pools) — dove gli ZSA esisterebbero insieme a ZEC
- [Transactions](/using-zcash/transactions) — come è costruita una transazione Zcash
- [Zebra Full Node](/zcash-tech/zebra-full-node) — l’implementazione di nodo usata nella demo ZSA qui sopra
