<a href="https://github.com/zechub/zechub/edit/main/site/Using_Zcash/Memos.md" target="_blank">
  <img src="https://img.shields.io/badge/Edit-blue" alt="Seite bearbeiten"/>
</a>

# Memos

#### Verschlüsselte Memos senden

Beim Senden einer Z2Z-Transaktion (shielded-to-shielded) kannst du ein Memo (eine Nachricht) in die Transaktion einfügen. Dieses Memo kann für eine Reihe verschiedener Zwecke verwendet werden.

#### Transaktionen signieren

Memos werden in erster Linie verwendet, um Zahlungen zu signieren. Da shielded Transaktionen deine Daten verschlüsseln, kannst du nicht sehen, wer dir ZEC gesendet hat und wofür die ZEC bestimmt gewesen sein könnten. Nutzer können das Memo-Feld verwenden, um ihren Namen oder ihr Pseudonym zu signieren, damit die Gegenpartei weiß, von wem die Transaktion stammt. Sie können auch beschreiben, wofür die Transaktion gedacht war.

#### Eine Nachricht senden

Ein weiterer Anwendungsfall für das verschlüsselte Memo ist das Senden einer Nachricht an jemanden mit einer z-addr. Diese Nachrichten können sich um alles Mögliche drehen, sei es eine [Erinnerung an einen Freund](https://twitter.com/iansagstette/status/1542142468505870336) oder eine [sensible Nachricht, die so privat wie möglich bleiben muss](https://twitter.com/InsideZcash/status/1545800146352578560).

#### Liebesbotschaften auf der Blockchain

Es gab eine Person, die ihrem Partner in einem der ersten Blöcke der Zcash-Blockchain eine Liebesbotschaft geschickt hat. Jemand entdeckte, dass sein Partner ihm über ein Zcash-Memo eine Datei geschickt hatte. Diese Datei war ein Ticket für eine besondere Veranstaltung im Ausland, über deren gemeinsamen Besuch sie und ihr weit entfernter Geliebter gesprochen hatten. Das Memo war eine Liebesbotschaft.

#### Fortgeschritten

> **Historisch. Diese Demo funktioniert in der beschriebenen Form nicht mehr.**
>
> Die Demo unten verwendet zcashd, und ihr [Empfangsskript](https://github.com/ZecHub/zechub/blob/main/site/tutorials/ZcashMagicWormhole/receiveOwlsWormhole.sh) liest Memos über `zcash-cli`. zcashd hat am 18. Juli 2026 seinen automatischen End-of-Support-Stopp erreicht, daher kann dieses Skript keinen laufenden Knoten mehr erreichen, und es wurde nicht portiert.
>
> Das Lesen geschützter Memos über die Kommandozeile funktioniert mit Zallet weiterhin: `zallet rpc z_listunspent` gibt jede empfangene geschützte Note mit demselben Feld `memoStr` zurück, das das Skript ausliest. Den Befehl findest du in der [Zallet-Kurzreferenz](/using-zcash/zallet-quick-reference-guide), und wie du einen Knoten von zcashd wegmigrierst, im [Migrationsleitfaden zu Zebra und Zallet](/guides/migration-guide-zcashd-to-zebrad-zallet). Zallet befindet sich noch in der Beta-Phase.
>
> Dieser Abschnitt bleibt als historische Dokumentation der Magic-Wormhole-Demo erhalten.

Hier erfährst du, wie du Zcash Shielded Memos mit der Magic-Wormhole-CLI und zcashd verwendest, um Dateien sicher von einem Computer zu einem anderen zu senden!: 

<div className="my-8 w-full aspect-video max-w-3xl mx-auto rounded-2xl overflow-hidden shadow-lg bg-black">
  <iframe
    className="w-full h-full"
    src="https://www.youtube.com/embed/8iqPCza9o6A"
    title="DEMO: Verschlüsselte Dateiübertragung mit Zcash 📁"
    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
    allowFullScreen
    loading="lazy"
  />
</div>

#### Ressourcen

[Das verschlüsselte Memo-Feld](https://electriccoin.co/blog/encrypted-memo-field/)
