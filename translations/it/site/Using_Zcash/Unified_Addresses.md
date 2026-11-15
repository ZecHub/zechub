<a href="https://github.com/zechub/zechub/edit/main/site/Using_Zcash/Unified_Addresses.md" target="_blank">
  <img src="https://img.shields.io/badge/Edit-blue" alt="Edit Page"/>
</a>

# Indirizzi unificati

> Un indirizzo per tutto Zcash. Condividilo, e il portafoglio del mittente trova il modo più privato di pagarti.

## TL;DR

* Un indirizzo unificato (UA) è un indirizzo Zcash che contiene più receiver: Ironwood, Sapling e trasparente.
* Gli UA della mainnet iniziano con `u1`. La ZIP 316 li ha definiti, e sono arrivati con l'aggiornamento NU5 del 31 maggio 2022.
* Il portafoglio del mittente sceglie la pool più privata che entrambi i portafogli supportano. Tu non scegli mai una pool.
* Il tuo UA ha continuato a funzionare quando la pool Ironwood è diventata attiva a luglio 2026. Non hai avuto bisogno di condividere un nuovo indirizzo.
* Il tuo portafoglio può generare un UA nuovo per ogni mittente, e tutti pagano nello stesso account.

## Spiegazione di base

Un indirizzo unificato (UA) è un unico indirizzo Zcash che raggruppa più receiver in uno solo. I receiver sono le parti di un indirizzo che accettano fondi in una specifica value pool: Ironwood, Sapling e trasparente. Un UA inizia con `u1` sulla mainnet ed è stato definito in [ZIP 316](https://zips.z.cash/zip-0316), introdotto con l'aggiornamento di rete NU5 il 31 maggio 2022.

Prima degli indirizzi unificati, ricevere ZEC significava pensare ai tipi di indirizzo. Un indirizzo `zs` accettava fondi Sapling, un indirizzo `t` accettava fondi trasparenti, e inviare tra i tipi richiedeva passaggi extra. Un UA mette fine a tutto questo. Condividi un solo indirizzo, e sono i portafogli a sistemare il resto.

### Come funziona

Quando qualcuno ti invia fondi al tuo UA, il suo portafoglio legge i receiver al suo interno e sceglie la pool più privata che entrambi i portafogli supportano:

1. Se entrambi i portafogli supportano la pool schermata attuale, il pagamento arriva schermato. Nulla di pubblico tocca la chain.
2. Se il mittente può inviare solo da una pool più vecchia, il portafoglio ripiega sul miglior receiver che avete in comune, per esempio Sapling.
3. Se il mittente può inviare solo fondi trasparenti, il pagamento atterra nel receiver trasparente del tuo UA, e il tuo portafoglio può schermarlo da lì.

Non devi gestire nulla tu. L'indirizzo resta lo stesso; il routing avviene al suo interno.

### Perché è importante adesso

Zcash continua a migliorare. Quando la pool Ironwood si è attivata con NU6.3 il 28 luglio 2026, chi possiede un UA non ha avuto bisogno di un nuovo indirizzo: i portafogli hanno semplicemente cominciato a scegliere il receiver Ironwood all'interno degli indirizzi che già avevano. Gli utenti con vecchi indirizzi standalone hanno dovuto migrare. I possessori di UA non hanno fatto nulla.

Questo è l'obiettivo del design. Nuove pool arrivano con i futuri aggiornamenti di rete, e un indirizzo unificato le assorbe senza che nessuno debba condividere di nuovo gli indirizzi o spostare fondi a mano. Vedi [Zcash value pool](/using-zcash/shielded-pools) per l'elenco delle pool attuali.

### Un indirizzo nuovo per ogni mittente

I portafogli possono generare molti indirizzi unificati diversificati per un solo account. Ognuno di essi pagherebbe negli stessi fondi, ma nessuna coppia può essere collegata on-chain. Dai un UA diverso a ogni persona o servizio che ti paga, e nessuna coppia può confrontare gli indirizzi per scoprire che pagano lo stesso portafoglio.

## Immagine / Analogia

Immagina una porta d'ingresso con tre fessure per la posta. La fessura più recente deposita le lettere in una cassaforte chiusa a chiave (Ironwood). La seconda le deposita in un cassetto chiuso a chiave (Sapling). La terza le deposita su un vassoio aperto che chiunque può leggere dalla finestra (trasparente).

Il postino è il portafoglio del mittente. Usa la fessura più privata attraverso cui riesce a passare. Distribuisci un solo indirizzo per la porta, e quando la casa riceve una cassaforte nuova, l'indirizzo sulla porta resta lo stesso.

## Approfondimento

### Strumenti correlati

- **Chiavi di visualizzazione.** Ogni account ha chiavi di visualizzazione unificate che condividono cosa riceve un UA (o tutto ciò che invia) senza condividere l'autorità di spesa. Prefissi `uview` e `uivk`. Vedi [chiavi di visualizzazione](/zcash-tech/viewing-keys).
- **Indirizzi TEX.** Alcuni exchange, attualmente Binance, richiedono che i depositi arrivino da una fonte trasparente. Un indirizzo TEX ([ZIP 320](https://zips.z.cash/zip-0320)) è un complemento solo trasparente del tuo UA, pensato proprio per quel caso. Vedi [indirizzi trasparenti per exchange](/using-zcash/transparent-exchange-addresses).
- **Richieste di pagamento.** Un UA può essere incorporato in un URI di richiesta di pagamento con importo e memo precompilati. Vedi [URI di richiesta di pagamento](/using-zcash/payment-request-uris).

### Fatti in breve

| | |
|---|---|
| Prefisso | `u1` (mainnet) |
| Codifica | bech32m |
| Definito in | [ZIP 316](https://zips.z.cash/zip-0316) |
| Introdotto | NU5, 31 maggio 2022 |
| Contiene | receiver Ironwood, Sapling e trasparenti |
| Chiavi di spesa | Una per account, condivisa da tutti i suoi UA |

Controlla quali portafogli supportano gli indirizzi unificati nella pagina [portafogli](/wallets).

## Errori comuni

- **Condividere un vecchio indirizzo `zs` o `t`.** Un indirizzo standalone raggiunge una sola pool e non ne acquisisce di nuove. Condividi il tuo UA.
- **Dare lo stesso UA a tutti.** Due persone che ti pagano possono confrontarsi e vedere lo stesso indirizzo. Genera dal tuo portafoglio un UA nuovo per ogni mittente.
- **Aspettarsi che ogni pagamento a un UA sia privato.** Un mittente che può inviare solo fondi trasparenti paga nel tuo receiver trasparente, e quel pagamento è pubblico. Schermalo dal tuo portafoglio in seguito.

## Pagine correlate

- [Pool schermate](/using-zcash/shielded-pools): le value pool dietro ogni receiver di un UA.
- [Indirizzi unificati (tecnici)](/zcash-tech/unified-addresses): come la ZIP 316 costruisce e codifica un UA.
- [Chiavi di visualizzazione](/zcash-tech/viewing-keys): condividi cosa riceve un UA senza condividere l'autorità di spesa.
- [Indirizzi trasparenti per exchange](/using-zcash/transparent-exchange-addresses): il formato TEX per gli exchange che hanno bisogno di una fonte trasparente.
- [URI di richiesta di pagamento](/using-zcash/payment-request-uris): un UA con importo e memo precompilati.
- [Portafogli](/using-zcash/wallets): quali portafogli creano e pagano gli indirizzi unificati.
- [Exchange non-custodial (senza custodia di terzi)](/using-zcash/non-custodial-exchanges): cosa controllare quando uno scambio paga ZEC nel tuo portafoglio.
- [Chi può vedere il tuo pagamento in Zcash](/start-here/who-can-see-your-zcash-payment): cosa resta visibile quando un pagamento usa ciascun receiver.

**Ultimo aggiornamento:** ottobre 2026
