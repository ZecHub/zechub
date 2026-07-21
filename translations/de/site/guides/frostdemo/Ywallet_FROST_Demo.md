# Ywallet FROST-Demo

## FROST-Binärdateien kompilieren

https://github.com/ZcashFoundation/frost-zcash-demo/tree/update-zcash-sign

Verwende das oben genannte Repository und folge den Anweisungen zum Kompilieren:

`cargo build --bin trusted-dealer`

`cargo build --bin dkg`

`cargo build --bin coordinator`

`cargo build --bin participants`

Die Binärdateien befinden sich dann im target-Ordner.


## FROST UA erstellen

`./generateFROST_UA.sh`



## UFVK in Ywallet importieren

Konten -> Klicke auf + und füge den ufvk aus dem obigen Schritt ein

## Eine Transaktion mit Ywallet erstellen

Füge eine beliebige UA ein und sende eine tx. Speichere die Datei.

## Den FROST-Signaturvorgang starten

`./signFROST_tx.sh rawtxs/mytx signedtxs/mysignedtx`

Die erste Eingabe ist der Speicherort der Raw-tx aus dem obigen Schritt.
Die zweite Eingabe ist der Speicherort und Name der signierten tx, die du übertragen möchtest.
In diesem Teil teilst du FROST mit, welche Transaktion von allen signiert werden soll.

## Coordinator starten

`./runCoordinator.sh`

Dies koordiniert die Signatur jedes Teilnehmers und erstellt eine Gruppensignatur.

## Jeden Teilnehmer diese Transaktion signieren lassen

`./participantSign.sh key-package-1.json`


`./participantSign.sh key-package-2.json`

## Signierte Transaktion abschließen

Im Coordinator-Fenster kopiere die ausgegebene Gruppensignatur und füge sie in das FROST-Signaturfenster ein.
Dadurch wird der FROST-Signaturvorgang abgeschlossen und `mysingedtx` ausgegeben.


## Deine Transaktion mit Ywallet übertragen

Klicke unten rechts in Ywallet auf „More“ und finde „Broadcast“. Wähle `mysignedtx` aus und klicke auf OK.

Wenn alles funktioniert, erhältst du eine Transaktions-ID :)
