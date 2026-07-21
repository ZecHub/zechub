# Demo FROST con Ywallet

## Compila i binari FROST

https://github.com/ZcashFoundation/frost-zcash-demo/tree/update-zcash-sign

Usa il repo qui sopra e segui le indicazioni sulla compilazione: 

`cargo build --bin trusted-dealer`

`cargo build --bin dkg`

`cargo build --bin coordinator`

`cargo build --bin participants`

I binari si troveranno nella cartella target.


## Crea una UA FROST

`./generateFROST_UA.sh`



## Importa la UFVK in Ywallet

Accounts -> Clicca + e incolla la ufvk dal passo precedente

## Crea una transazione con Ywallet

Incolla una qualsiasi UA e invia una tx. Salva il file.

## Avvia la procedura di firma FROST 

`./signFROST_tx.sh rawtxs/mytx signedtxs/mysignedtx`

il primo input è la posizione della tx grezza ottenuta dal passo precedente
il secondo input è la posizione e il nome della tx firmata che vuoi trasmettere
Questa è la parte in cui indichi a FROST quale transazione vuoi che tutti firmino

## Avvia il Coordinator

`./runCoordinator.sh`

Questo coordina la firma di ciascun partecipante e crea una firma di gruppo

## Fai firmare a ciascun Partecipante questa transazione

`./participantSign.sh key-package-1.json`


`./participantSign.sh key-package-2.json`

## Finalizza la transazione firmata

Nella finestra del coordinator, copia la firma di gruppo che viene mostrata in output e incollala nella finestra di firma FROST.
Questo completerà la firma FROST e produrrà 'mysingedtx'


## Trasmetti la tua transazione con Ywallet

Clicca su 'More' nella parte in basso a destra di Ywallet e trova 'Broadcast'. Trova 'mysignedtx' e clicca ok.

Se tutto funziona otterrai un ID della transazione :)
