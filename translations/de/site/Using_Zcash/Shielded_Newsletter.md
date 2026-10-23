<a href="https://github.com/ZecHub/zechub/edit/main/site/Using_Zcash/Shielded_Newsletter.md" target="_blank">
  <img src="https://img.shields.io/badge/Edit-blue" alt="Edit Page"/>
</a>

# Abgeschirmter Newsletter

> Sende eine Markdown-Notiz als Zcash-Memos an eine Liste abgeschirmter Adressen, indem du Zallet verwendest. Die Empfängerliste und die Notiz bleiben außerhalb transparenter Adressen.

Ein abgeschirmter Newsletter ist eine Reihe abgeschirmter Transaktionen. Jeder Output zahlt einen winzigen Betrag an eine Empfänger-Unified Address und enthält den nächsten Abschnitt der Notiz im Memofeld. Zallet erstellt und sendet diese Transaktionen. Zebra und Zaino stellen nur Chain-Daten bereit.

Die Skripte befinden sich in [`site/tutorials/shieldedNewsletter`](https://github.com/ZecHub/zechub/tree/main/site/tutorials/shieldedNewsletter). Sie wurden für ein frühes Zallet geschrieben und können nicht unverändert sicher mit der aktuellen Version ausgeführt werden. Diese Seite enthält die aktualisierte Vorgehensweise. Abgeglichen mit dem Zallet `v0.1.0-beta.3` und dem Zallet-Buch mit Stand vom 7. Oktober 2026.

## Was du brauchst

- Zebra vollständig synchronisiert, mit an localhost gebundenem RPC.
- Zaino, synchronisiert mit diesem Zebra-Knoten.
- Zallet `v0.1.0-beta.3` oder neuer, Wallet-Build, mit an localhost gebundenem RPC. Das Buch führt `z_sendmany` als implementiert auf. Eine numerische Gebühr wird abgelehnt: Wenn du `fee` übergibst, muss es `null` sein, da Zallet immer die ZIP-317-Gebühr verwendet.
- Ein finanziertes Konto, dessen Unified Address abgeschirmte Mittel ausgeben kann.
- Unified Addresses der Empfänger. Ein Memo auf einer transparenten Adresse führt zu einem Fehler.

Lege keine finanzierte Adresse oder ein Cookie im Wiki oder in einem committeten Skript ab. Das aktuelle `txBuilderFromFile.sh` hat ein Unified Address fest codiert. Ersetze es lokal und committe es nicht.

## Zallet konfigurieren

Erstelle eine Konfiguration mit dem Zallet, das du ausführst, und richte sie dann auf Zebra und Zaino aus. Das Beispiel im alten Tutorial verwendet `as_of_version = "0.0.0"` und einen persönlichen Home-Pfad. Betrachte diese Datei als Momentaufnahme, nicht als Vorlage.

```bash
zallet init
zallet -c ~/.zallet/zallet.toml start
zallet -c ~/.zallet/zallet.toml rpc help
```

`rpc help` muss `z_sendmany`, `z_getoperationstatus` und `z_getoperationresult` auflisten. Binde RPC nur an `127.0.0.1`.

## Empfängerliste

Eine Unified Address pro Zeile, ohne Anführungszeichen und ohne Leerzeilen. Das Skript liest `daoAddresses.md`. Die alte Readme nennt `daoAddress.md`. Diese Datei befindet sich nicht im Repository, und die Namen stimmen nicht überein.

```text
u1...
u1...
```

## Ein Memo senden

`z_sendmany` ist asynchron. Es gibt eine Operations-ID zurück. Frage `z_getoperationstatus` ab, bis der Status `success` oder ein Fehler ist. Ein fester Schlaf von 5 Sekunden, wie ihn das Skript verwendet, verliert das Ergebnis, wenn der Build länger dauert. `z_getoperationresult` verbraucht die Operation, rufe es daher erst auf, wenn der Status endgültig ist.

Die Gebühr wird weggelassen. Zallet berechnet ZIP 317. Übergib keine Zahl.

```bash
MEMO_HEX=$(printf '%s' "$NOTE" | xxd -p -c 9999)
zallet -c ~/.zallet/zallet.toml rpc z_sendmany \
  "$FROM_UA" \
  "[{\"address\":\"$TO_UA\",\"amount\":0.0001,\"memo\":\"$MEMO_HEX\"}]"
```

Das Memofeld ist rohes Hex mit maximal 512 Bytes. `ascii2hex` kodiert nur ASCII. Eine Notiz mit einem beliebigen Nicht-ASCII-Zeichen schlägt fehl. `xxd` oder `python3 -c 'import sys; sys.stdout.write(sys.stdin.buffer.read().hex())'` verarbeitet UTF-8.

Die Datenschutzrichtlinie verwendet standardmäßig `FullPrivacy`. Das ist die richtige Standardeinstellung für einen abgeschirmten Empfänger. Übergib nicht `AllowFullyTransparent`.

## Skriptfehler

Diese befinden sich mit Stand vom 8. Oktober 2026 im Tree. Führe `shieldNewsletter.sh` nicht aus, bevor sie behoben sind.

- `[[ bytesInFile -lt 512 ]]` fehlt `$`. Der Zweig für ein einzelnes Memo wird nie ausgeführt.
- Die Chunk-Schleife speichert Hex, dann dekodiert `hex2ascii` es, dann kodiert `txBuilderFromFile.sh` es erneut. Der letzte Chunk wird nicht geschrieben, sofern nicht eine spätere Zeile 512 überläuft. Eine lange Zeile wird nicht aufgeteilt. Sie wird vollständig gesendet und kann das 512-Byte-Memo überschreiten.
- `txBuilderFromFile.sh` ruft `./zallet rpc` ohne Konfigurationspfad auf und erwartet die Binärdatei im aktuellen Verzeichnis. Verwende `zallet -c <config> rpc`.
- `toCurl.sh` kommuniziert mit Zebra auf Port 8232 mit einem Cookie und ruft `getinfo` und `sendmany` auf. Zallet stellt `sendmany` nicht bereit. Die Mine-Warteschleife verwendet außerdem `[[ chainHeight -gt temp ]]` ohne `$` und wartet daher nicht.
- `z_gettotalbalance 0 true` wird als zusätzliche Positionsargumente übergeben. Prüfe `rpc help z_gettotalbalance` auf der Binärdatei, die du ausführst, bevor du diesen Aufruf verwendest.
- Jeder Chunk sendet `0.0001` ZEC an jeden Empfänger. Die ZIP-317-Gebühr kommt hinzu. Eine lange Notiz an viele Adressen gibt mehr als die Dust-Beträge aus.

## Nach einer Korrektur

Ein korrigierter Runner sollte:

1. Die Notiz als Bytes lesen und an 512-Byte-Grenzen aufteilen, nicht an Zeilen.
2. Jeden Chunk einmal hex-kodieren.
3. `zallet -c <config> rpc z_sendmany` mit der finanzierten UA, dem Empfänger-Array und ohne Gebührenargument aufrufen.
4. `z_getoperationstatus` für diese Operations-ID abfragen.
5. Die txid erst nach `success` aufzeichnen.

Die alte Tutorial-Seite bleibt unter [Skripte für abgeschirmte Newsletter](https://github.com/ZecHub/zechub/blob/main/site/tutorials/shieldedNewsletter/readme.md). Verwende diese Seite für die Vorgehensweise.
