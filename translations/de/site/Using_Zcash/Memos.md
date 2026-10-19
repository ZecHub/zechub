<a href="https://github.com/zechub/zechub/edit/main/site/Using_Zcash/Memos.md" target="_blank">
  <img src="https://img.shields.io/badge/Edit-blue" alt="Edit Page"/>
</a>

# Memos

## Kurz gesagt

* Ein Memo ist eine kurze Notiz, die du einer Zahlung an eine abgeschirmte Adresse beifügst. Es ist verschlüsselt, sodass Personen, die die Blockchain beobachten, es nicht lesen können.
* Das Memofeld fasst bis zu 512 Byte Text.
* Menschen verwenden Memos, um anzugeben, wer eine Zahlung gesendet hat und wofür sie bestimmt war, oder um eine private Nachricht zu senden.
* Zahlungen an transparente Adressen können kein Memo enthalten.
* Ein [Zahlungsanforderungslink](/using-zcash/payment-request-uris) kann das Memo für dich ausfüllen, damit ein Shop jede Bestellung markieren kann.

## Grunderklärung

### Verschlüsselte Memos senden

Wenn du eine Z2Z-Transaktion (abgeschirmt zu abgeschirmt) sendest, kannst du ein Memo (eine Nachricht) in die Transaktion aufnehmen. Dieses Memo kann für verschiedene Dinge verwendet werden.

### Transaktionen signieren

Memos werden hauptsächlich zum Signieren von Zahlungen verwendet. Da abgeschirmte Transaktionen deine Daten verschlüsseln, kannst du nicht sehen, wer dir ZEC gesendet hat und wofür ZEC bestimmt gewesen sein könnte. Nutzende können das Memofeld verwenden, um ihren Namen oder ihr Pseudonym zu signieren, damit ihr Gegenüber weiß, von wem die Transaktion stammt. Sie können auch beschreiben, wofür die Transaktion bestimmt war.

### Eine Nachricht senden

Ein weiterer Anwendungsfall für das verschlüsselte Memo ist das Senden einer Nachricht an jemanden mit einer z-addr. Diese Nachrichten können alles Mögliche betreffen, ob es sich nun um eine [Erinnerung an einen Freund](https://twitter.com/iansagstette/status/1542142468505870336) oder eine [sensible Nachricht handelt, die möglichst privat bleiben muss](https://twitter.com/InsideZcash/status/1545800146352578560).

### Liebesbriefe auf der Blockchain

Es gab eine Person, die ihrem Partner in einem der ersten Blöcke der Zcash Blockchain einen Liebesbrief schickte. Jemand stellte fest, dass ihr Partner ihr über ein Zcash Memo eine Datei geschickt hatte. Diese Datei war eine Eintrittskarte für eine besondere Veranstaltung im Ausland, die sie und ihr weit entfernt lebender Geliebter gemeinsam besuchen wollten. Das Memo war ein Liebesbrief.

## Visualisierung / Analogie

Stell dir eine abgeschirmte Zahlung als einen versiegelten Umschlag mit Geld darin vor. Das Memo ist eine zusammengefaltete Notiz, die dem Geld beiliegt.

Die Blockchain ist die Post. Sie transportiert den Umschlag und verzeichnet seine Ankunft, öffnet ihn aber nie. Die Person, die den Umschlag öffnet, liest die Notiz. Eine transparente Zahlung ist eine Postkarte, daher gibt es keinen Umschlag, in den man eine Notiz legen könnte.

## Vertiefung

### Was in ein Memo passt

Das Memofeld ist immer genau 512 Byte groß. Ein kürzeres Textmemo wird vor der Verschlüsselung mit Nullbytes aufgefüllt, sodass jedes Memo on-chain gleich groß aussieht.

Die meisten Memos sind einfacher UTF-8-Text. [ZIP 302](https://zips.z.cash/zip-0302) reserviert außerdem Memos, die mit einem Byte von `0xF5` oder höher beginnen, für andere Datenarten, und ein Memo aus `0xF6` gefolgt von Nullen bedeutet „kein Memo“.

Jeder abgeschirmte Output in einer Transaktion enthält ein eigenes Memo, sodass eine Transaktion, die mehrere Personen bezahlt, für jede von ihnen eine andere Notiz enthalten kann.

### Fortgeschritten

> **Historisch. Diese Demo läuft nicht mehr wie beschrieben.**
>
> Die folgende Demo verwendet zcashd, und ihr [Empfangsskript](https://github.com/ZecHub/zechub/blob/main/site/tutorials/ZcashMagicWormhole/receiveOwlsWormhole.sh) liest Memos über `zcash-cli`. zcashd erreichte am 18. Juli 2026 seinen automatischen End-of-Support-Stopp, sodass dieses Skript keinen laufenden Knoten erreichen kann und nicht portiert wurde.
>
> Das Lesen abgeschirmter Memos über die Befehlszeile funktioniert weiterhin mit Zallet: `zallet rpc z_listunspent` gibt jede empfangene abgeschirmte Note mit demselben `memoStr`-Feld zurück, das das Skript liest. Siehe den [Zallet Quick Reference Guide](/using-zcash/zallet-quick-reference-guide) für den Befehl sowie den [Migrationsleitfaden zu Zebra und Zallet](/guides/migration-guide-zcashd-to-zebrad-zallet), um einen Knoten von zcashd weg zu migrieren. Zallet befindet sich weiterhin in der Beta-Phase.
>
> Dieser Abschnitt bleibt als historische Aufzeichnung der Magic-Wormhole-Demo erhalten.

Hier erfährst du, wie du Zcash Shielded Memos mit der Magic-Wormhole-CLI und zcashd verwendest, um Dateien sicher von einem Computer an einen anderen zu senden!

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

## Verwandte Seiten

- [Zahlungsanforderungs-URIs](/using-zcash/payment-request-uris): Füge ein Memo in einen `zcash:` Link oder QR-Code ein.
- [Transaktionen](/using-zcash/transactions): abgeschirmte und transparente Transaktionstypen.
- [Abgeschirmte Pools](/using-zcash/shielded-pools): hier befinden sich die abgeschirmten Notes, die Memos enthalten.
- [Wallets](/using-zcash/wallets): Verwende den Shielded-Memo-Filter, um Wallets zu finden, die Memos unterstützen.
- [Zallet Quick Reference Guide](/using-zcash/zallet-quick-reference-guide): Lies empfangene Memos über die Befehlszeile.
- [Zcash Tools für Creators](/using-zcash/creators-and-tips): Trinkgeld-Tools, die zusammen mit dem Trinkgeld eine Nachricht senden.

### Ressourcen

[Das verschlüsselte Memofeld](https://electriccoin.co/blog/encrypted-memo-field/)

**Zuletzt aktualisiert:** Oktober 2026
