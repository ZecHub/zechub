# Demo MultiSig

Questa demo richiede zcashd 

## Raccogli le chiavi pubbliche dalle persone necessarie

* https://github.com/iancoleman/bip39
* Se usi zcashd, puoi creare un UA e usare anche il tuo ricevente trasparente. Poi usa `getPubkey.sh` per estrarre la tua chiave pubblica.


## Crea due indirizzi multisig (2 su 3) t3

esegui createMultiSig.sh per generare il tuo indirizzo multisig e lo script di redenzione. Servono 3 chiavi pubbliche

`./createMultiSig.sh pubk1 pubk2 pubk3`      # 1° t3

`./createMultiSig.sh pubk4 pubk5 pubk6`      # 2° t3 per l'indirizzo di resto. 

#### NOTA: in questo esempio pubk1 e pubk4 sono la stessa persona, pubk2 e pubk5 sono la stessa persona e così via ...

#### NOTA2: l'ORDINE delle tue pubkey è importante! Fai attenzione a questo!!!!


## Finanzia l'indirizzo t3

Usa qualsiasi wallet/faucet per finanziare l'indirizzo

## Crea la transazione MultiSig

`./createMultiSigTX.sh txid voutIndex scriptPubKey redeemScript oldAmount tAddy amount changeTaddy`

dove,

```
        txid: un ID di transazione della transazione che ha inviato denaro al tuo nuovo t3
   voutIndex: l'indice dell'output in vout che ha il valore più grande
scriptPubKey: lo script di blocco P2SH contiene l'hash di un altro script di blocco (Script Hash), circondato dagli opcode HASH160 ed EQUAL. È in formato esadecimale e si trova tramite la rpc getrawtransaction, cerca scriptPubKey
redeemScript: il valore esadecimale del redeemScript prodotto in output durante la creazione del nostro t3. È necessario a tutte le persone che vogliono spendere dal t3.
   oldAmount: importo inviato al tuo nuovo t3 dal txid sopra
       tAddy: l'indirizzo a cui vuoi inviare i fondi
      amount: l'importo di ZEC da inviare a tAddy
 changeTaddy: indirizzo di resto (nuovo t3 con un nuovo redeemScript!)

```

`./txDetails.sh txid`   => ti aiuterà a trovare le informazioni necessarie

```

txid              : ./txDetails.sh 6742b37b4db10ee177a3551e69b3726705bb0178483ed37e253de9869b549530 | jq .txid

valueInitialTX    : ./txDetails.sh 6742b37b4db10ee177a3551e69b3726705bb0178483ed37e253de9869b549530 | jq .vout[].value   ** questo è necessario per la firma! **

voutIndex         : ./txDetails.sh 6742b37b4db10ee177a3551e69b3726705bb0178483ed37e253de9869b549530 | jq .vout[].n

scriptPubKey      : ./txDetails.sh 6742b37b4db10ee177a3551e69b3726705bb0178483ed37e253de9869b549530 | jq .vout[].scriptPubKey.hex

```



## Firma la transazione MultiSig

Apri signMultiSigTX.sh e aggiungi le tue chiavi private nelle variabili pk1, pk2, ...
 

*** Non consiglierei di digitarle nel tuo terminale. ***


Se hai accesso a tutte le tue chiavi private, puoi usarle tutte in una volta per risparmiare tempo,
ma nella maggior parte degli esempi del mondo reale la firma sarà eseguita da persone in giro per il mondo, quindi ciascuno dei partecipanti richiesti dovrà firmare,
poi rinviare l'output "hex" della rawTX aggiornata che gli altri useranno per firmare e completare la procedura di firma.

Chiunque crei la prima tx firmerà con la propria chiave privata e invierà l'hex della rawTX aggiornata che deve essere firmata dagli altri partecipanti.

`./signMultiSigTX.sh rawTX txid voutIndex scriptPubKey redeemScript valueInitialTX`

Per firmare questa tx, almeno 2 delle tre chiavi private devono firmarla. Se la chiave pubblica che hai fornito è stata esportata usando un indirizzo-T da zcashd, puoi ottenere la chiave privata del tuo indirizzo-T con: 


`zcash-cli dumpprivkey "t-addr"`


Per questa demo, ho usato il bip39 di iancoleman per isolare rapidamente le chiavi private necessarie.


## Trasmetti la TX firmata

`./sendMultiSignedTX.sh signedTXfromLastStep`



# Fonti

* https://learnmeabitcoin.com/technical/script/p2sh/
* https://bitcoin.stackexchange.com/questions/6100/how-will-multisig-addresses-work
* https://zcash.github.io/rpc/




