# Ywallet FROST-Demo

> **Ywallet wird nicht mehr gepflegt.** Der Entwickler hat bestätigt, dass es nicht für Ironwood (NU6.3) aktualisiert wird, sodass es der Chain nicht mehr folgen kann und die untenstehenden Schritte im Mainnet nicht abgeschlossen werden können. Diese Seite wird als Referenz beibehalten. Zkool vom selben Entwickler ist der gepflegte Nachfolger und unterstützt FROST-Multisig.

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


## FROST-Binärdateien kompilieren

[GitHub-Link](https://github.com/ZcashFoundation/frost-zcash-demo/tree/update-zcash-sign)

Verwende das obige Repository und folge den Anweisungen zum Kompilieren: 

```bash
cargo build --bin trusted-dealer
cargo build --bin dkg
cargo build --bin coordinator
cargo build --bin participants
```

Die Binärdateien befinden sich im Zielordner.

## FROST-UA erstellen

`./generateFROST_UA.sh`



## UFVK in Ywallet importieren

Accounts -> Klicke auf + und füge den ufvk aus dem obigen Schritt ein

## Eine Transaktion mit Ywallet erstellen

Füge eine beliebige UA ein und sende eine Transaktion. Speichere die Datei.

## Den FROST-Signiervorgang starten

`./signFROST_tx.sh rawtxs/mytx signedtxs/mysignedtx`

Die erste Eingabe ist der Speicherort der rohen Transaktion aus dem obigen Schritt
Die zweite Eingabe ist der Speicherort und Name der signierten Transaktion, die du übertragen möchtest
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

Kopiere im Coordinator-Fenster die ausgegebene Gruppensignatur und füge sie in das FROST-Signierfenster ein.
Dadurch wird die FROST-Signierung abgeschlossen und 'mysingedtx' ausgegeben


## Deine Transaktion mit Ywallet übertragen

Klicke unten rechts in Ywallet auf „More“ und suche nach „Broadcast“. Suche „mysignedtx“ und klicke auf OK.

Wenn alles funktioniert, erhältst du eine Transaktions-ID :)
