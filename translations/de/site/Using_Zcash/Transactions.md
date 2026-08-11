---
<a href="https://github.com/zechub/zechub/edit/main/site/Using_Zcash/Transactions.md" target="_blank">
  <img src="https://img.shields.io/badge/Edit-blue" alt="Seite bearbeiten"/>
</a>


# Transaktionen

ZEC ist ein weit verbreiteter digitaler Vermögenswert für Zahlungen und bietet starke Datenschutzfunktionen, die ihn für verschiedene Transaktionen geeignet machen, etwa um Freunde zu bezahlen, Einkäufe zu tätigen oder zu spenden. Um Datenschutz und Sicherheit zu maximieren, ist es wichtig zu verstehen, wie die verschiedenen Arten von Transaktionen innerhalb von Zcash funktionieren.

## Kurzfassung

- Zcash unterstützt zwei Arten von Transaktionen: **shielded**, die die Details privat halten, und **transparent**, die sie öffentlich aufzeichnen.
- Shielded-Adressen beginnen mit `u` oder `z`. Transparente Adressen beginnen mit `t` und verhalten sich ähnlich wie eine Bitcoin-Adresse.
- Die Entscheidung liegt bei jeder Zahlung bei dir. Privatsphäre ist eine Option, die Zcash dir gibt, nicht eine Einstellung, die jemand anderes für dich festlegt.
- Auszahlungen von einer Börse sind der häufigste Punkt, an dem Menschen Privatsphäre verlieren. Wenn die Börse nur transparente Auszahlungen unterstützt, schirme die Mittel selbst ab, sobald sie ankommen.
- Gebühren folgen [ZIP 317](https://zips.z.cash/zip-0317) und wachsen mit der Größe der Transaktion. Wallets, die noch die alte Pauschalgebühr senden, können sehen, dass sich ihre Transaktionen verzögern.

## Shielded-Transaktionen

<div className="my-8 w-full aspect-video max-w-3xl mx-auto rounded-2xl overflow-hidden shadow-lg bg-black">
  <iframe
    className="w-full h-full"
    src="https://www.youtube.com/embed/bZM3o_eIovU"
    title="Zcash erklärt: Zcash Shielded-Transaktionen"
    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
    allowFullScreen
    loading="lazy"
  />
</div>

---

Shielded-Transaktionen erfolgen, wenn du ZEC in deine shielded Wallet bewegst. Deine shielded Wallet-Adresse beginnt mit einem U oder Z. Wenn du Shielded-Transaktionen sendest, stellst du sicher, dass du und die Personen, mit denen du Transaktionen durchführst, ein Maß an Privatsphäre bewahren, das in anderen P2P-Zahlungsnetzwerken nicht möglich ist. Das Senden einer Shielded-Transaktion ist sehr einfach, du musst nur auf zwei Dinge achten. Das erste ist, dass du den richtigen Wallet-Typ verwendest. Am einfachsten stellst du sicher, dass du die richtige Art von Wallet verwendest, indem du eine [Wallet](https://zechub.wiki/wallets) herunterlädst. Das zweite Wichtige ist, ZEC in eine shielded Wallet zu bewegen. Wenn du ZEC von einer Börse abhebst, musst du wissen, ob die Börse shielded oder transparente Auszahlungen unterstützt. Wenn sie shielded Auszahlungen unterstützt, kannst du ZEC einfach an deine shielded Adresse auszahlen lassen. Wenn die Börse nur transparente Auszahlungen unterstützt, musst du YWallet verwenden und dein ZEC nach dem Empfang automatisch abschirmen. Ausschließlich Shielded-Transaktionen zum Senden und Empfangen von Geldern zu verwenden, ist der beste Weg, um die Privatsphäre zu wahren und das Risiko von Datenlecks zu verringern

## Transparente Transaktionen

Transparente Transaktionen funktionieren ähnlich, verfügen aber nicht über Datenschutzmechanismen, wodurch Transaktionsdetails öffentlich auf der Blockchain sichtbar sind. Transparente Transaktionen sollten vermieden werden, wenn Privatsphäre Priorität hat. Hinweis: Transparente Wallets können aufgrund von ZIP-317 auf Probleme stoßen, da dafür Gebühren proportional zur Komplexität der Transaktion erforderlich sind. Standardgebühren können zu Ablehnungen oder Verzögerungen führen, weshalb die Anpassung der Gebühren entscheidend ist.

<div className="my-8 w-full aspect-video max-w-3xl mx-auto rounded-2xl overflow-hidden shadow-lg bg-black">
  <iframe
    className="w-full h-full"
    src="https://www.youtube.com/embed/R-krX1UpsIg"
    title="Lerne 🛡️Zcash shielded Wallets kennen!"
    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
    allowFullScreen
    loading="lazy"
  />
</div>

## Eine einfache Vorstellungshilfe

Eine transparente Transaktion ist eine Postkarte. Der Postbote stellt sie zu, aber jeder, der sie unterwegs in die Hand bekommt, kann die Nachricht lesen, sehen, wer sie geschickt hat, und sehen, wer sie erhält.

Eine shielded Transaktion ist ein versiegelter Briefumschlag. Der Postdienst bestätigt weiterhin, dass ein echter Brief mit echtem Porto das System durchlaufen hat, und niemand kann einen fälschen oder denselben Brief zweimal versenden. Was der Umschlag enthält, bleibt zwischen Absender und Empfänger.

Wichtig ist, dass Zcash dich bei jeder einzelnen Zahlung entscheiden lässt, welche Art du senden möchtest.

## Gebühren für transparente Transaktionen verwalten

ZIP-317-Richtlinie: Die Gebührenstruktur skaliert mit der Komplexität der Transaktion und erfordert Anpassungen über die Standardgebühr von 0.00001 ZEC hinaus.
Beispielrechnung: Eine einfache Ein-Notiz-Transaktion könnte eine Gebühr von 0.0001 ZEC erfordern, die sich pro zusätzlicher Notiz um ungefähr 0.00005 ZEC erhöht.

Gebühren in Wallets bearbeiten

Trust Wallet: Greife auf die erweiterten Einstellungen zu, indem du beim Erstellen einer Transaktion auf das Zahnradsymbol tippst. Passe die Felder Miner Tip Gwei und Max Fee Gwei sorgfältig an, um ein Scheitern der Transaktion zu vermeiden. Trust Wallet berechnet nur Netzwerkgebühren.
Coinomi Wallet: Bietet drei dynamische Gebührenoptionen – Low, Normal, High – basierend auf den Netzwerkbedingungen. Für manuelle Anpassungen wähle bei unterstützten Coins Custom oder verwende Change Fee in der oberen rechten Ecke. Nutzer können Gebühren pro Byte oder Kilobyte festlegen, was sich auf die Bestätigungszeiten auswirkt. Es wird empfohlen, die dynamischen Optionen zu verwenden, wenn du unsicher bist.

## Häufige Fehler

- **Anzunehmen, dass jede Wallet, die ZEC aufführt, es privat senden kann.** Eine Reihe von Multi-Coin-Wallets unterstützt nur die transparente Seite von Zcash. Prüfe die von der Wallet unterstützten Pools, bevor du dich für Privatsphäre auf sie verlässt. Die Seite [Wallets](https://zechub.wiki/using-zcash/wallets) listet dies für jede Option auf.
- **An eine transparente Adresse auszahlen und die Mittel dort belassen.** Die Auszahlung selbst ist öffentlich, und jede spätere Bewegung von dieser Adresse bleibt ebenfalls öffentlich. Schirme die Mittel ab, sobald sie angekommen sind.
- **Privatsphäre als etwas zu behandeln, das man einmal einschaltet.** Jede Transaktion ist eine eigene Entscheidung. Wenn du heute shielded sendest, macht das eine transparente Zahlung von letzter Woche nicht rückgängig.
- **Eine transparente Adresse für alles wiederzuverwenden.** Da transparente Aktivitäten dauerhaft sichtbar sind, verknüpft eine einzelne wiederverwendete Adresse nach und nach Zahlungen, die keinen Grund hatten, miteinander verbunden zu sein.
- **Mit einer veralteten Standardgebühr zu senden.** Wallets, die ZIP 317 noch nicht übernommen haben, senden möglicherweise weiterhin die ältere Pauschalgebühr, wodurch eine Transaktion unbestätigt hängen bleiben kann.

## Hinweis

Bitte beachte, dass die sicherste Art, ZEC zu verwenden, darin besteht, ausschließlich Shielded-Transaktionen zu nutzen. Einige Wallets sind dabei, [unified addresses](https://electriccoin.co/blog/unified-addresses-in-zcash-explained/#:~:text=The%20unified%20address%20(UA)%20is,within%20the%20broader%20Zcash%20ecosystem.) zu implementieren, die es Nutzern und Börsen ermöglichen, transparente und shielded Adressen zu kombinieren.

## Ressourcen

[ZIPS](https://zips.z.cash/)

## Verwandte Seiten

- [Wallets](/using-zcash/wallets) — welche Wallets shielded Senden unterstützen und welche nur transparent sind
- [Shielded Pools](/using-zcash/shielded-pools) — Sapling und Orchard, die Pools, in denen deine shielded Mittel liegen
- [Memos](/using-zcash/memos) — verschlüsselte Nachrichten, die mit einer shielded Transaktion mitgeschickt werden können
- [Transparente Börsenadressen](/using-zcash/transparent-exchange-addresses) — TEX-Adressen und warum Börsen sie verwenden
- [Verwahrende Börsen](/using-zcash/custodial-exchanges) — welche Börsen shielded Auszahlungen unterstützen

## ZEC-zu-ZAT-Konverter
