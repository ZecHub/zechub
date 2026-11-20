# Ywallet FROST demo

> **Ywallet non è più mantenuto.** Lo sviluppatore ha confermato che non verrà aggiornato per Ironwood (NU6.3), quindi non è più in grado di seguire la chain e i passaggi indicati di seguito non possono essere completati sulla mainnet. Questa pagina è conservata come riferimento. Zkool, dello stesso sviluppatore, è il successore mantenuto e supporta il multisig FROST.

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


## Compila i binari di FROST

[GitHub link](https://github.com/ZcashFoundation/frost-zcash-demo)

Usa il repository sopra indicato e segui le istruzioni per la compilazione: 

```bash
cargo build --bin trusted-dealer
cargo build --bin dkg
cargo build --bin coordinator
cargo build --bin participant
```

I binari si troveranno nella cartella target.

## Crea un UA di FROST

`./generateFROST_UA.sh`



## Importa un UFVK in Ywallet

Account -> Clicca su + e incolla la ufvk del passaggio precedente

## Crea una transazione con Ywallet

Incolla un UA qualsiasi e invia una transazione. Salva il file.

## Avvia la procedura di firma FROST 

`./signFROST_tx.sh rawtxs/mytx signedtxs/mysignedtx`

Il primo input è il percorso della transazione raw del passaggio precedente
Il secondo input è il percorso e il nome della transazione firmata che vuoi trasmettere
Questa è la parte in cui dici a FROST quale transazione vuoi che tutti firmino

## Avvia il coordinatore

`./runCoordinator.sh`

Questo coordina la firma di ciascun partecipante e crea una firma di gruppo

## Fai firmare a ogni partecipante questa transazione

```bash
./participantSign.sh key-package-1.json
./participantSign.sh key-package-2.json
```

## Finalizza la transazione firmata

Nella finestra del coordinatore, copia la firma di gruppo che viene restituita in output e incollala nella finestra di firma di FROST.
Questo completerà la firma FROST e genererà in output "mysingedtx"


## Trasmetti la tua transazione con Ywallet

Clicca su "More" in basso a destra di Ywallet e trova "Broadcast". Trova "mysignedtx" e clicca su ok.

Se tutto funziona, otterrai un ID di transazione :)
