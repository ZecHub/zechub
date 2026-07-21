# Ywallet FROST-Demo

<div className="my-8 w-full aspect-video max-w-3xl mx-auto rounded-2xl overflow-hidden shadow-lg bg-black">
  <iframe
    className="w-full h-full"
    src="https://www.youtube.com/embed/3IZgxDqQNbw"
    title="FROST + Ywallet Transaktions-Demo"
    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
    allowFullScreen
    loading="lazy"
  />
</div>


## FROST-Binaries kompilieren

[Github-Link](https://github.com/ZcashFoundation/frost-zcash-demo/tree/update-zcash-sign)

Verwende das obige Repo und folge den Anweisungen zum Kompilieren: 

```bash
cargo build --bin trusted-dealer
cargo build --bin dkg
cargo build --bin coordinator
cargo build --bin participants
```

Die Binaries befinden sich dann im Ordner target.

## FROST-UA erstellen

`./generateFROST_UA.sh`



## UFVK in Ywallet importieren

Accounts -> Klicke auf + und füge den ufvk aus dem obigen Schritt ein

## Eine Transaktion mit Ywallet erstellen

Füge eine beliebige UA ein und sende eine tx. Speichere die Datei.

## Das FROST-Signaturverfahren starten 

`./signFROST_tx.sh rawtxs/mytx signedtxs/mysignedtx`

die erste Eingabe ist der Speicherort der Raw-tx aus dem obigen Schritt
die zweite Eingabe ist der Speicherort und Name der signierten tx, die du übertragen möchtest
Hier teilst du FROST mit, welche Transaktion alle signieren sollen

## Coordinator starten

`./runCoordinator.sh`

Dieser koordiniert die Signatur jedes Teilnehmers und erstellt eine Gruppensignatur

## Jeden Teilnehmer diese Transaktion signieren lassen

```bash
./participantSign.sh key-package-1.json
./participantSign.sh key-package-2.json
```

## Signierte Transaktion abschließen

Im Coordinator-Fenster kopierst du die ausgegebene Gruppensignatur und fügst sie in das FROST-Signaturfenster ein.
Dadurch wird die FROST-Signatur abgeschlossen und 'mysingedtx' ausgegeben.


## Deine Transaktion mit Ywallet übertragen

Klicke unten rechts in Ywallet auf 'Mehr' und finde 'Broadcast'. Suche 'mysignedtx' und klicke auf ok.

Wenn alles funktioniert, erhältst du eine Transaktions-ID :)
