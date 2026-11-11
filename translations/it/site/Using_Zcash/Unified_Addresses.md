<a href="https://github.com/zechub/zechub/edit/main/site/Using_Zcash/Unified_Addresses.md" target="_blank">
  <img src="https://img.shields.io/badge/Edit-blue" alt="Edit Page"/>
</a>

# Indirizzi unificati

> Un solo indirizzo per tutto Zcash. Condividilo e il portafoglio del mittente troverà il modo più privato per pagarti.

## In breve

* Un indirizzo unificato (UA) è un unico indirizzo Zcash che contiene diversi ricevitori: Ironwood, Sapling e trasparente.
* Gli UA di mainnet iniziano con `u1`. ZIP 316 li ha definiti e sono arrivati con l'aggiornamento NU5 il 31 maggio 2022.
* Il portafoglio del mittente sceglie la pool più privata supportata da entrambi i portafogli. Non scegli mai tu una pool.
* Il tuo UA ha continuato a funzionare quando la pool Ironwood è stata attivata nel luglio 2026. Non hai dovuto condividere un nuovo indirizzo.
* Il tuo portafoglio può creare un nuovo UA per ogni mittente e tutti pagano nello stesso account.

## Spiegazione fondamentale

Un indirizzo unificato (UA) è un singolo indirizzo Zcash che raggruppa diversi ricevitori in uno solo. I ricevitori sono le parti di un indirizzo che accettano fondi in una specifica pool di valore: Ironwood, Sapling e trasparente. Un UA inizia con `u1` su mainnet ed è stato definito in [ZIP 316](https://zips.z.cash/zip-0316), introdotto con l'aggiornamento di rete NU5 il 31 maggio 2022.

Prima degli indirizzi unificati, ricevere ZEC significava dover pensare ai tipi di indirizzo. Un indirizzo `zs` riceveva fondi Sapling, un indirizzo `t` riceveva fondi trasparenti e l'invio tra tipi richiedeva passaggi aggiuntivi. Un UA pone fine a tutto questo. Condividi un solo indirizzo e i portafogli si occupano del resto.

### Come funziona

Quando qualcuno invia al tuo UA, il suo portafoglio legge i ricevitori al suo interno e sceglie la pool più privata supportata da entrambi i portafogli:

1. Se entrambi i portafogli supportano l'attuale pool schermata, il pagamento arriva schermato. Nulla di pubblico tocca la chain.
2. Se il mittente può inviare solo da una pool meno recente, il portafoglio ripiega sul miglior ricevitore che condividete, come Sapling.
3. Se il mittente può inviare solo fondi trasparenti, il pagamento arriva nel ricevitore trasparente del tuo UA e il tuo portafoglio può schermarlo da lì.

Non devi gestire nulla di tutto questo. L'indirizzo rimane lo stesso; l'instradamento avviene al suo interno.

### Perché è importante ora

Zcash continua ad aggiornarsi. Quando la pool Ironwood è stata attivata con NU6.3 il 28 luglio 2026, i titolari di UA non hanno avuto bisogno di un nuovo indirizzo: i portafogli hanno semplicemente iniziato a scegliere il ricevitore Ironwood negli indirizzi già esistenti. Gli utenti con indirizzi autonomi meno recenti hanno dovuto migrare. I titolari di UA non hanno dovuto fare nulla.

Questo è l'obiettivo del design. Nuove pool arrivano con futuri aggiornamenti di rete e un indirizzo unificato le assorbe senza che nessuno debba condividere nuovamente indirizzi o spostare fondi manualmente. Consulta le [Zcash pool di valore](/using-zcash/shielded-pools) per l'attuale elenco delle pool.

### Un nuovo indirizzo per ogni mittente

I portafogli possono generare molti indirizzi unificati diversificati per un account. Ognuno paga negli stessi fondi, ma nessuno di essi può essere collegato on-chain. Fornisci un UA diverso a ogni persona o servizio che ti paga e nessuna coppia potrà confrontare gli indirizzi per scoprire che paga lo stesso portafoglio.

## Visuale / analogia

Immagina una porta d'ingresso con tre fessure per la posta. La fessura più recente fa cadere le lettere in una cassaforte chiusa a chiave (Ironwood). La seconda le fa cadere in un cassetto chiuso a chiave (Sapling). La terza le fa cadere su un vassoio aperto che chiunque può leggere attraverso la finestra (trasparente).

Il portalettere è il portafoglio del mittente. Usa la fessura più privata attraverso cui riesce a passare. Fornisci un solo indirizzo per la porta e, quando la casa riceve una nuova cassaforte, l'indirizzo sulla porta rimane lo stesso.

## Approfondimento

### Strumenti correlati

- **Chiavi di visualizzazione.** Ogni account ha chiavi di visualizzazione unificate che condividono ciò che un UA riceve, o tutto ciò che invia, senza condividere l'autorità di spesa. Prefissi `uview` e `uivk`. Consulta le [chiavi di visualizzazione](/zcash-tech/viewing-keys).
- **Indirizzi TEX.** Alcuni exchange, attualmente Binance, richiedono che i depositi arrivino da una fonte trasparente. Un indirizzo TEX ([ZIP 320](https://zips.z.cash/zip-0320)) è un complemento esclusivamente trasparente del tuo UA proprio per questo caso. Consulta gli [indirizzi trasparenti per exchange](/using-zcash/transparent-exchange-addresses).
- **Richieste di pagamento.** Un UA può essere incorporato in un URI di richiesta di pagamento con importo e memo precompilati. Consulta gli [URI di richiesta di pagamento](/using-zcash/payment-request-uris).

### Dati rapidi

| | |
|---|---|
| Prefisso | `u1` (mainnet) |
| Codifica | bech32m |
| Definito in | [ZIP 316](https://zips.z.cash/zip-0316) |
| Introdotto | NU5, 31 maggio 2022 |
| Contiene | Ricevitori Ironwood, Sapling e trasparenti |
| Chiavi di spesa | Una per account, condivisa da tutti i suoi UA |

Verifica quali portafogli supportano gli indirizzi unificati nella pagina dei [portafogli](/wallets).

## Errori comuni

- **Condividere un vecchio indirizzo `zs` o `t`.** Un indirizzo autonomo raggiunge una sola pool e non include quelle nuove. Condividi il tuo UA.
- **Fornire lo stesso UA a tutti.** Due persone che ti pagano possono confrontare gli indirizzi e vedere che sono uguali. Fornisci a ogni mittente un nuovo UA dal tuo portafoglio.
- **Aspettarti che ogni pagamento a un UA sia privato.** Un mittente che può inviare solo fondi trasparenti paga nel tuo ricevitore trasparente e quel pagamento è pubblico. Schermalo successivamente dal tuo portafoglio.

## Pagine correlate

- [Pool schermate](/using-zcash/shielded-pools): le pool di valore dietro ogni ricevitore in un UA.
- [Indirizzi unificati (tecnico)](/zcash-tech/unified-addresses): come ZIP 316 costruisce e codifica un UA.
- [Chiavi di visualizzazione](/zcash-tech/viewing-keys): condividi ciò che un UA riceve senza condividere l'autorità di spesa.
- [Indirizzi trasparenti per exchange](/using-zcash/transparent-exchange-addresses): il formato TEX per gli exchange che necessitano di una fonte trasparente.
- [URI di richiesta di pagamento](/using-zcash/payment-request-uris): un UA con importo e memo compilati.
- [Portafogli](/using-zcash/wallets): quali portafogli creano e pagano indirizzi unificati.
- [Exchange non-custodial](/using-zcash/non-custodial-exchanges): cosa verificare quando uno scambio paga ZEC nel tuo portafoglio.
- [Chi può vedere il tuo pagamento Zcash](/start-here/who-can-see-your-zcash-payment): cosa rimane visibile quando un pagamento usa ciascun ricevitore.

**Ultimo aggiornamento:** ottobre 2026
