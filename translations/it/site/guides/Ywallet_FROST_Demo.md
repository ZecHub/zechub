# Demo FROST di Ywallet

> **Ywallet non è più mantenuto.** Il suo sviluppatore ha confermato che non verrà aggiornato per Ironwood (NU6.3), pertanto non può più seguire la chain e i passaggi seguenti non possono essere completati su mainnet. Questa pagina viene mantenuta come riferimento. Zkool, dello stesso sviluppatore, è il successore mantenuto e supporta il multisig FROST.

<div className="my-8 w-full aspect-video max-w-3xl mx-auto rounded-2xl overflow-hidden shadow-lg bg-black">
  <iframe
    className="w-full h-full"
    src="https://www.youtube.com/embed/3IZgxDqQNbw"
    title="FROST + Ywallet Transaction Demo"
    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
    allowFullScreen
    loading="lazy"
  />
</div>


## Compilare i binari FROST

[Link GitHub](https://github.com/ZcashFoundation/frost-zcash-demo/tree/update-zcash-sign)

Usa il repository sopra indicato e segui le istruzioni per la compilazione:

```bash
cargo build --bin trusted-dealer
cargo build --bin dkg
cargo build --bin coordinator
cargo build --bin participants
```

I binari si troveranno nella cartella target.

## Creare un UA FROST

`./generateFROST_UA.sh`



## Importare UFVK in Ywallet

Account -> Fai clic su + e incolla ufvk dal passaggio precedente

## Creare una transazione con Ywallet

Incolla un UA qualsiasi e invia una transazione. Salva il file.

## Avviare la procedura di firma FROST

`./signFROST_tx.sh rawtxs/mytx signedtxs/mysignedtx`

il primo input è la posizione della transazione grezza dal passaggio precedente  
il secondo input è la posizione e il nome della transazione firmata che desideri trasmettere  
Questa è la parte in cui indichi a FROST quale transazione vuoi che tutti firmino

## Avviare il coordinatore

`./runCoordinator.sh`

Questo coordina la firma di ciascun partecipante e crea una firma di gruppo

## Far firmare questa transazione a ciascun partecipante

```bash
./participantSign.sh key-package-1.json
./participantSign.sh key-package-2.json
```

## Finalizzare la transazione firmata

Nella finestra del coordinatore, copia la firma di gruppo prodotta e incollala nella finestra di firma FROST.  
Questo completerà la firma FROST e produrrà 'mysingedtx'


## Trasmettere la transazione con Ywallet

Fai clic su 'More' in basso a destra in Ywallet e trova 'Broadcast'. Trova 'mysignedtx' e fai clic su ok.

Se tutto funziona, otterrai un ID della transazione :)
