<a href="https://github.com/zechub/zechub/edit/main/site/Using_Zcash/Unified_Addresses.md" target="_blank">
  <img src="https://img.shields.io/badge/Edit-blue" alt="Edit Page"/>
</a>

# Indirizzi unificati

> Un indirizzo per tutto Zcash. Condividilo e il portafoglio del mittente troverà il modo più privato per effettuarti un pagamento.

Un indirizzo unificato (UA) è un singolo indirizzo Zcash che raggruppa più ricevitori in uno solo. I ricevitori sono le parti di un indirizzo che accettano fondi in una specifica pool di valore: Ironwood, Sapling e trasparente. Un UA inizia con `u1` sulla mainnet ed è stato definito in [ZIP 316](https://zips.z.cash/zip-0316), introdotto con l'aggiornamento di rete NU5 il 31 maggio 2022.

Prima degli indirizzi unificati, ricevere ZEC significava dover pensare ai tipi di indirizzo. Un indirizzo `zs` accettava fondi Sapling, un indirizzo `t` accettava fondi trasparenti e inviare tra tipi diversi richiedeva passaggi aggiuntivi. Un UA pone fine a tutto questo. Condividi un solo indirizzo e i portafogli si occupano del resto.

## Come funziona

Quando qualcuno invia fondi al tuo UA, il suo portafoglio legge i ricevitori al suo interno e sceglie la pool più privata supportata da entrambi i portafogli:

1. Se entrambi i portafogli supportano l'attuale pool schermata, il pagamento arriva schermato. Nulla di pubblico tocca la chain.
2. Se il mittente può inviare solo da una pool meno recente, il portafoglio passa al miglior ricevitore che condividete entrambi, come Sapling.
3. Se il mittente può inviare solo fondi trasparenti, il pagamento arriva al ricevitore trasparente del tuo UA e il tuo portafoglio può schermarlo da lì.

Non devi mai gestire tutto questo personalmente. L'indirizzo rimane lo stesso; l'instradamento avviene al suo interno.

## Perché è importante ora

Zcash continua ad aggiornarsi. Quando la pool Ironwood è stata attivata con NU6.3 il 28 luglio 2026, i titolari di UA non hanno avuto bisogno di un nuovo indirizzo: i portafogli hanno semplicemente iniziato a scegliere il ricevitore Ironwood negli indirizzi che le persone già possedevano. Gli utenti che possedevano indirizzi autonomi meno recenti hanno dovuto effettuare la migrazione. I titolari di UA non hanno dovuto fare nulla.

Questo è l'obiettivo del design. Nuove pool arrivano con futuri aggiornamenti di rete e un indirizzo unificato le integra senza che nessuno debba ricondividere indirizzi o spostare fondi manualmente. Consulta le [Zcash pool di valore](/using-zcash/shielded-pools) per l'attuale elenco di pool.

## Un nuovo indirizzo per ogni mittente

I portafogli possono generare molti indirizzi unificati diversificati per un account. Ciascuno riceve gli stessi fondi, ma non è possibile collegarne due on-chain. Fornisci un UA diverso a ogni persona o servizio che ti effettua un pagamento e nessuna coppia di essi potrà confrontare gli indirizzi per scoprire che pagano lo stesso portafoglio.

## Strumenti correlati

- **Chiavi di visualizzazione.** Ogni account dispone di chiavi di visualizzazione unificate che condividono ciò che un UA riceve, o tutto ciò che invia, senza condividere l'autorità di spesa. Prefissi `uview` e `uivk`. Consulta le [chiavi di visualizzazione](/zcash-tech/viewing-keys).
- **Indirizzi TEX.** Alcuni exchange, attualmente Binance, richiedono che i depositi arrivino da una fonte trasparente. Un indirizzo TEX ([ZIP 320](https://zips.z.cash/zip-0320)) è un complemento esclusivamente trasparente al tuo UA proprio per questo caso. Consulta gli [indirizzi trasparenti per exchange](/using-zcash/transparent-exchange-addresses).
- **Richieste di pagamento.** Un UA può essere incorporato in un URI di richiesta di pagamento con importo e memo precompilati. Consulta gli [URI di richiesta di pagamento](/using-zcash/payment-request-uris).

## Informazioni rapide

| | |
|---|---|
| Prefisso | `u1` (mainnet) |
| Codifica | bech32m |
| Definito in | [ZIP 316](https://zips.z.cash/zip-0316) |
| Introdotto | NU5, 31 maggio 2022 |
| Contiene | ricevitori Ironwood, Sapling e trasparenti |
| Chiave di spesa | Una per account, condivisa da tutti i suoi UA |

Verifica quali portafogli supportano gli indirizzi unificati nella pagina [portafogli](/wallets).
