# Demo FROST di Ywallet

> **Ywallet non è più mantenuto.** Il suo sviluppatore ha confermato che non verrà aggiornato per Ironwood (NU6.3), quindi non può più seguire la chain e i passaggi seguenti non possono essere completati su mainnet. Questa pagina viene conservata come riferimento. Zkool, dello stesso sviluppatore, è il successore mantenuto e supporta il multisig FROST.

## Compilare i binari FROST

https://github.com/ZcashFoundation/frost-zcash-demo/tree/update-zcash-sign

Utilizza il repository sopra e segui le istruzioni per la compilazione: 

`cargo build --bin trusted-dealer`

`cargo build --bin dkg`

`cargo build --bin coordinator`

`cargo build --bin participants`

I binari saranno nella cartella target.


## Creare un UA FROST

`./generateFROST_UA.sh`



## Importare UFVK in Ywallet

Account -> Clicca + e incolla ufvk del passaggio precedente

## Creare una transazione con Ywallet

Incolla un qualsiasi UA e invia una transazione. Salva il file.

## Avviare la procedura di firma FROST 

`./signFROST_tx.sh rawtxs/mytx signedtxs/mysignedtx`

il primo input è la posizione della transazione grezza del passaggio precedente
il secondo input è la posizione e il nome della transazione firmata che desideri trasmettere
Questa è la parte in cui indichi a FROST quale transazione vuoi che tutti firmino

## Avviare il Coordinatore

`./runCoordinator.sh`

Questo coordina la firma di ciascun partecipante e crea una firma di gruppo

## Fare in modo che ciascun Partecipante firmi questa transazione

`./participantSign.sh key-package-1.json`


`./participantSign.sh key-package-2.json`

## Finalizzare la transazione firmata

Nella finestra del coordinatore, copia la firma di gruppo prodotta e incollala nella finestra di firma FROST.
Questo completerà la firma FROST e produrrà 'mysingedtx'


## Trasmettere la transazione con Ywallet

Clicca su 'More' in basso a destra in Ywallet e trova 'Broadcast'. Trova 'mysignedtx' e clicca ok.

Se tutto funziona, riceverai un ID transazione :)
