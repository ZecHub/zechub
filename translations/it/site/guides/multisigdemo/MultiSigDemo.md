# Demo MultiSig

> **Storico. Questa guida non è più funzionante.**
>
> Ogni passaggio seguente dipende da zcashd, che ha raggiunto il suo arresto automatico di fine supporto il 18 luglio 2026. I sette script forniti insieme a questa pagina lo controllano tramite `zcash-cli`, quindi oggi nessuno di essi può raggiungere un nodo in esecuzione.
>
> Questi script non possono essere convertiti meccanicamente. Si basano sulle RPC per transazioni raw e wallet (`createrawtransaction`, `signrawtransaction`, `createmultisig`, `dumpprivkey`) che zcashd ha deprecato prima dell'arresto; Zallet le sostituisce con nuovi metodi che operano su PCZT anziché su esadecimali di transazioni raw, ed è ancora in beta, con molti metodi zcashd non ancora convertiti.
>
> Per la custodia multi-parte su Zcash oggi, consulta [FROST & Custodia a soglia](/zcash-tech/frost-threshold-custody), che include un confronto diretto con il multisig trasparente, e la [demo FROST di Ywallet](/guides/frostdemo/ywallet-frost-demo). Per migrare un nodo esistente da zcashd, consulta la [guida alla migrazione a Zebra e Zallet](/guides/migration-guide-zcashd-to-zebrad-zallet).
>
> Questa pagina è conservata come documentazione storica del flusso di lavoro multisig trasparente.

Questa demo richiede zcashd, che si è arrestato il 18 luglio 2026 e non è più in esecuzione. Nulla di quanto segue può essere completato sulla catena attiva.

## Raccogli le chiavi pubbliche delle persone necessarie

* https://github.com/iancoleman/bip39
* Se usi zcashd, puoi creare un UA e usare anche il tuo ricevitore trasparente. Quindi usa `getPubkey.sh` per estrarre la tua chiave pubblica.


## Crea 2 indirizzi t3 Multisig (2 di 3)

esegui createMultiSig.sh per generare il tuo indirizzo multisig e redeem script. Sono necessarie 3 chiavi pubbliche

`./createMultiSig.sh pubk1 pubk2 pubk3`      # 1° t3

`./createMultiSig.sh pubk4 pubk5 pubk6`      # 2° t3 per l'indirizzo di resto. 

#### NOTA: in questo esempio pubk1,pubk4 appartengono alla stessa persona, pubk2,pubk5 alla stessa persona e così via ...

#### NOTA2: l'ORDINE delle tue pubkey è importante! Fai attenzione a questo!!!!


## Finanzia l'indirizzo t3

Usa qualsiasi wallet/faucet per finanziare l'indirizzo

## Crea una transazione MultiSig

`./createMultiSigTX.sh txid voutIndex scriptPubKey redeemScript oldAmount tAddy amount changeTaddy`

dove,

```
        txid: un ID transazione della transazione che ha inviato denaro al tuo nuovo t3
   voutIndex: l'indice dell'output in vout che ha il valore maggiore
scriptPubKey: Lo script di blocco P2SH contiene l'hash di un altro script di blocco (Script Hash), racchiuso dagli opcode HASH160 e EQUAL. È in esadecimale e si trova tramite la RPC getrawtransaction; cerca scriptPubKey
redeemScript: Il valore esadecimale del redeemScript ottenuto durante la creazione del nostro t3. È necessario a tutte le persone che vogliono spendere dal t3.
   oldAmount: Importo inviato al tuo nuovo t3 dal txid sopra
       tAddy: L'indirizzo a cui desideri inviare i fondi
      amount: L'importo di ZEC da inviare a tAddy
 changeTaddy: Indirizzo di resto (nuovo t3 con un nuovo redeemScript!)

```

`./txDetails.sh txid`   => ti aiuterà a trovare le informazioni necessarie

```

txid              : ./txDetails.sh 6742b37b4db10ee177a3551e69b3726705bb0178483ed37e253de9869b549530 | jq .txid

valueInitialTX    : ./txDetails.sh 6742b37b4db10ee177a3551e69b3726705bb0178483ed37e253de9869b549530 | jq .vout[].value   ** questo è necessario per la firma! **

voutIndex         : ./txDetails.sh 6742b37b4db10ee177a3551e69b3726705bb0178483ed37e253de9869b549530 | jq .vout[].n

scriptPubKey      : ./txDetails.sh 6742b37b4db10ee177a3551e69b3726705bb0178483ed37e253de9869b549530 | jq .vout[].scriptPubKey.hex

```



## Firma la TX MultiSig

Apri signMultiSigTX.sh e aggiungi le tue chiavi private nelle variabili pk1,pk2, ... .
 

*** Non consiglierei di digitarle nel tuo terminale. ***


Se hai accesso a tutte le tue chiavi private, puoi usarle tutte insieme per risparmiare tempo,
ma nella maggior parte degli esempi del mondo reale, la firma verrà effettuata da persone in tutto il mondo, quindi ciascuno dei partecipanti richiesti dovrà firmare,
poi rimandare l'output aggiornato "hex" raxTX che gli altri useranno per firmare e completare la procedura di firma.

Chi crea la prima tx firmerà con la propria chiave privata e invierà l'hex rawTX aggiornato che deve essere firmato dagli altri partecipanti.

`./signMultiSigTX.sh rawTX txid voutIndex scriptPubKey redeemScript valueInitialTX`

Per firmare questa tx, devono firmarla almeno 2 delle tre chiavi private. Se la chiave pubblica che hai fornito è stata esportata usando un indirizzo T da zcashd, puoi ottenere la chiave privata del tuo indirizzo T con: 


`zcash-cli dumpprivkey "t-addr"`

Questo comando si è arrestato con zcashd e oggi non restituisce nulla; è riportato qui solo per mostrare come la demo otteneva le sue chiavi.


Per questa demo, ho usato bip39 di iancoleman per isolare rapidamente le chiavi private necessarie.


## Trasmetti la TX firmata

`./sendMultiSignedTX.sh signedTXfromLastStep`



# Fonti

* https://learnmeabitcoin.com/technical/script/p2sh/
* https://bitcoin.stackexchange.com/questions/6100/how-will-multisig-addresses-work
* https://zcash.github.io/rpc/
