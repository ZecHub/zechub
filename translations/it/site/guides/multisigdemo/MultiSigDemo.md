# Demo MultiSig

> **Storico. Questa procedura guidata non funziona più.**
>
> Ogni passaggio qui sotto dipende da zcashd, che ha raggiunto l'arresto automatico di Fine del Supporto il 18 luglio 2026. I sette script distribuiti insieme a questa pagina lo controllano tramite `zcash-cli`, quindi oggi nessuno di essi può raggiungere un nodo in esecuzione.
>
> Questi script non possono essere convertiti meccanicamente. Si basano sulle RPC raw-transaction e wallet (`createrawtransaction`, `signrawtransaction`, `createmultisig`, `dumpprivkey`) che zcashd aveva deprecato prima dell'arresto; Zallet le sostituisce con nuovi metodi che operano sui PCZT anziché sull'hex della transazione raw, ed è ancora in beta con molti metodi di zcashd non ancora convertiti.
>
> Per la custodia multi-parte su Zcash oggi, vedi [FROST & Custodia Threshold](/zcash-tech/frost-threshold-custody), che include un confronto diretto con il multisig trasparente, e la [demo FROST di Ywallet](/guides/frostdemo/ywallet-frost-demo) funzionante. Per migrare un nodo esistente da zcashd, vedi la [guida alla migrazione verso Zebra e Zallet](/guides/migration-guide-zcashd-to-zebrad-zallet).
>
> Questa pagina è conservata come documento storico del flusso di lavoro multisig trasparente.

Questa demo richiede zcashd, che si è arrestato il 18 luglio 2026 e non è più in esecuzione. Nulla di quanto segue può essere completato sulla chain live.

## Raccogli le chiavi pubbliche delle persone necessarie

* https://github.com/iancoleman/bip39
* Se usi zcashd, puoi creare un UA e usare anche il tuo ricevitore trasparente. Poi usa `getPubkey.sh` per estrarre la tua chiave pubblica.


## Crea indirizzi t3 MultiSig 2x (2 su 3)

esegui createMultiSig.sh per generare il tuo indirizzo multisig e il redeem script. Servono 3 chiavi pubbliche

`./createMultiSig.sh pubk1 pubk2 pubk3`      # 1° t3

`./createMultiSig.sh pubk4 pubk5 pubk6`      # 2° t3 per l'indirizzo di resto. 

#### NOTA: in questo esempio pubk1,pubk4 sono la stessa persona, pubk2,pubk5 sono la stessa persona e così via ...

#### NOTA2: l'ORDINE delle tue chiavi pubbliche è importante! Fai attenzione a questo!!!!


## Finanzia l'indirizzo t3

Usa qualsiasi wallet/faucet per finanziare l'indirizzo

## Crea una transazione MultiSig

`./createMultiSigTX.sh txid voutIndex scriptPubKey redeemScript oldAmount tAddy amount changeTaddy`

dove,

```
        txid: a transaction ID of the transaction that sent money into your new t3
   voutIndex: the index of the output in vout which has the largest value
scriptPubKey: The P2SH locking script contains the hash of another locking script (Script Hash), surrounded by the HASH160 and EQUAL opcodes. This is in hex, and is found via getrawtransaction rpc, look for scriptPubKey
redeemScript: The hex value of the redeemScript that was output when creating our t3. This is needed by all folks who want to spend from the t3.
   oldAmount: Amount sent to your new t3 from the txid above
       tAddy: The address you want to send funds to
      amount: The amount of ZEC to send to tAddy
 changeTaddy: Change address (new t3 with a new redeemScript!)

```

`./txDetails.sh txid`   => ti aiuterà a trovare le informazioni necessarie

```

txid              : ./txDetails.sh 6742b37b4db10ee177a3551e69b3726705bb0178483ed37e253de9869b549530 | jq .txid

valueInitialTX    : ./txDetails.sh 6742b37b4db10ee177a3551e69b3726705bb0178483ed37e253de9869b549530 | jq .vout[].value   ** this is needed for signing! **

voutIndex         : ./txDetails.sh 6742b37b4db10ee177a3551e69b3726705bb0178483ed37e253de9869b549530 | jq .vout[].n

scriptPubKey      : ./txDetails.sh 6742b37b4db10ee177a3551e69b3726705bb0178483ed37e253de9869b549530 | jq .vout[].scriptPubKey.hex

```



## Firma la TX MultiSig

Apri signMultiSigTX.sh e aggiungi le tue chiavi private nelle variabili pk1,pk2, ...
 

*** Non consiglierei di digitarle nel tuo terminale. ***


Se hai accesso a tutte le tue chiavi private puoi usarle tutte insieme per risparmiare tempo,
ma nella maggior parte degli esempi reali la firma verrà effettuata da persone in giro per il mondo, quindi ciascuno dei partecipanti richiesti dovrà firmare,
poi rimandare l'output "hex" rawTX aggiornato che gli altri useranno per firmare e completare la procedura di firma.

Chiunque crei la prima tx, firmerà con la propria chiave privata e invierà l'hex rawTX aggiornato che deve essere firmato dagli altri partecipanti.

`./signMultiSigTX.sh rawTX txid voutIndex scriptPubKey redeemScript valueInitialTX`

Per firmare questa tx, devono firmarla almeno 2 delle tre chiavi private. Se la chiave pubblica che hai fornito è stata esportata usando un T-address da zcashd, puoi ottenere la chiave privata del tuo indirizzo T con: 


`zcash-cli dumpprivkey "t-addr"`

Questo comando si è arrestato con zcashd e oggi non restituisce nulla; è riportato qui solo per mostrare come la demo otteneva le sue chiavi.


Per questa demo, ho usato il bip39 di iancoleman per isolare rapidamente le chiavi private necessarie.


## Trasmetti la TX firmata

`./sendMultiSignedTX.sh signedTXfromLastStep`



# Fonti

* https://learnmeabitcoin.com/technical/script/p2sh/
* https://bitcoin.stackexchange.com/questions/6100/how-will-multisig-addresses-work
* https://zcash.github.io/rpc/
