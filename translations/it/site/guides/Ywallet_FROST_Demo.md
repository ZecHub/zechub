# Demo FROST con Ywallet

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


## Compila i binari FROST

[Link GitHub](https://github.com/ZcashFoundation/frost-zcash-demo/tree/update-zcash-sign)

Usa il repo qui sopra e segui le indicazioni sulla compilazione: 

```bash
cargo build --bin trusted-dealer
cargo build --bin dkg
cargo build --bin coordinator
cargo build --bin participants
```

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

```bash
./participantSign.sh key-package-1.json
./participantSign.sh key-package-2.json
```

## Finalizza la transazione firmata

Nella finestra del coordinator, copia la firma di gruppo che viene mostrata in output e incollala nella finestra di firma FROST.
Questo completerà la firma FROST e produrrà 'mysingedtx'


## Trasmetti la tua transazione con Ywallet

Clicca su 'More' nella parte in basso a destra di Ywallet e trova 'Broadcast'. Trova 'mysignedtx' e clicca ok.

Se tutto funziona otterrai un ID della transazione :)
