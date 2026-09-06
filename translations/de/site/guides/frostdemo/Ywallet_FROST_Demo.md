# Ywallet FROST-Demo

> **Ywallet wird nicht mehr gepflegt.** Der Entwickler hat bestätigt, dass es nicht für Ironwood (NU6.3) aktualisiert wird. Daher kann es der Chain nicht mehr folgen, und die folgenden Schritte können im Mainnet nicht durchgeführt werden. Diese Seite wird als Referenz beibehalten. Zkool, vom selben Entwickler, ist der gepflegte Nachfolger und unterstützt FROST-Multisig.

## FROST-Bins kompilieren

https://github.com/ZcashFoundation/frost-zcash-demo/tree/update-zcash-sign

Verwende das obige Repo und befolge die Anweisungen zum Kompilieren: 

`cargo build --bin trusted-dealer`

`cargo build --bin dkg`

`cargo build --bin coordinator`

`cargo build --bin participants`

Die Bins befinden sich im target-Ordner.


## FROST-UA erstellen

`./generateFROST_UA.sh`



## UFVK in Ywallet importieren

Accounts -> Klicke auf + und füge den ufvk aus dem obigen Schritt ein

## Eine Transaktion mit Ywallet erstellen

Füge eine beliebige UA ein und sende eine Transaktion. Speichere die Datei.

## Den FROST-Signaturvorgang starten 

`./signFROST_tx.sh rawtxs/mytx signedtxs/mysignedtx`

Die erste Eingabe ist der Speicherort der rohen Transaktion aus dem obigen Schritt
Die zweite Eingabe ist der Speicherort und Name der signierten Transaktion, die du senden möchtest
Hier teilst du FROST mit, welche Transaktion alle signieren sollen

## Coordinator starten

`./runCoordinator.sh`

Dies koordiniert die Signatur jedes Teilnehmers und erstellt eine Gruppensignatur

## Jeden Teilnehmer für diese Transaktion signieren lassen

`./participantSign.sh key-package-1.json`


`./participantSign.sh key-package-2.json`

## Signierte Transaktion abschließen

Kopiere im Coordinator-Fenster die ausgegebene Gruppensignatur und füge sie in das FROST-Signaturfenster ein.
Dadurch wird die FROST-Signierung abgeschlossen und 'mysingedtx' ausgegeben.


## Deine Transaktion mit Ywallet senden

Klicke unten rechts in Ywallet auf „More“ und finde „Broadcast“. Suche „mysignedtx“ und klicke auf OK.

Wenn alles funktioniert, erhältst du eine Transaktions-ID :)
