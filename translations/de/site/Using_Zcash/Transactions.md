<a href="https://github.com/zechub/zechub/edit/main/site/Using_Zcash/Transactions.md" target="_blank">
  <img src="https://img.shields.io/badge/Edit-blue" alt="Seite bearbeiten"/>
</a>


# Transaktionen

ZEC ist ein weit verbreiteter digitaler Vermögenswert für Zahlungen und bietet starke Datenschutzfunktionen, die ihn für verschiedene Transaktionen wie das Bezahlen von Freunden, Einkäufe oder Spenden geeignet machen. Um Datenschutz und Sicherheit zu maximieren, ist es wichtig zu verstehen, wie die verschiedenen Arten von Transaktionen innerhalb von Zcash funktionieren.

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

Shielded-Transaktionen finden statt, wenn du ZEC in deine shielded Wallet bewegst. Die Adresse deiner shielded Wallet beginnt mit einem U oder Z. Wenn du shielded Transaktionen sendest, stellst du sicher, dass du und die Personen, mit denen du Transaktionen durchführst, ein Maß an Privatsphäre wahren, das in anderen P2P-Zahlungsnetzwerken nicht möglich ist. Das Senden einer shielded Transaktion ist sehr einfach, du musst nur auf zwei Dinge achten. Erstens musst du den richtigen Wallet-Typ verwenden. Am einfachsten stellst du sicher, dass du den richtigen Wallet-Typ verwendest, indem du eine [Wallet](https://zechub.wiki/wallets) herunterlädst. Zweitens ist es wichtig, ZEC in eine shielded Wallet zu verschieben. Wenn du ZEC von einer Börse abhebst, musst du wissen, ob die Börse shielded oder transparente Auszahlungen unterstützt. Wenn sie shielded Auszahlungen unterstützt, kannst du ZEC einfach an deine shielded Adresse auszahlen lassen. Wenn die Börse nur transparente Auszahlungen unterstützt, musst du YWallet verwenden und dein ZEC nach dem Empfang automatisch abschirmen. Ausschließlich shielded Transaktionen zum Senden und Empfangen von Geldern zu verwenden, ist der beste Weg, die Privatsphäre zu wahren und das Risiko von Datenlecks zu verringern.

## Transparente Transaktionen

Transparente Transaktionen funktionieren ähnlich, verfügen jedoch nicht über Datenschutzmechanismen, wodurch Transaktionsdetails öffentlich in der Blockchain sichtbar werden. Transparente Transaktionen sollten vermieden werden, wenn Privatsphäre Priorität hat. Hinweis: Transparente Wallets können aufgrund von ZIP-317 auf Probleme stoßen, da dabei Gebühren proportional zur Komplexität der Transaktion erforderlich sind. Standardgebühren können zu Ablehnungen oder Verzögerungen führen, weshalb die Anpassung der Gebühren entscheidend ist.

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


### Gebühren für transparente Transaktionen verwalten

ZIP-317-Richtlinie: Die Gebührenstruktur skaliert mit der Komplexität der Transaktion und erfordert Anpassungen über die Standardgebühr von 0.00001 ZEC hinaus.
Beispielrechnung: Eine einfache Transaktion mit einer Note kann eine Gebühr von 0.0001 ZEC erfordern, die sich pro zusätzlicher Note um ungefähr 0.00005 ZEC erhöht.

Gebühren in Wallets bearbeiten

Trust Wallet: Greife auf die erweiterten Einstellungen zu, indem du beim Erstellen einer Transaktion auf das Zahnradsymbol tippst. Passe die Felder Miner Tip Gwei und Max Fee Gwei sorgfältig an, um ein Fehlschlagen der Transaktion zu vermeiden. Trust Wallet berechnet nur Netzwerkgebühren.
Coinomi Wallet: Bietet drei dynamische Gebührenoptionen – Niedrig, Normal, Hoch – basierend auf den Netzwerkbedingungen. Für manuelle Anpassungen wähle bei unterstützten Coins Benutzerdefiniert oder nutze oben rechts Change Fee. Nutzer können Gebühren pro Byte oder Kilobyte festlegen, was sich auf die Bestätigungszeiten auswirkt. Es wird empfohlen, die dynamischen Optionen zu verwenden, wenn du unsicher bist.

Diese Version enthält Hinweise zum Gebührenmanagement, dynamische Gebührenoptionen und Anpassungseinstellungen in Trust Wallet und Coinomi und bietet Nutzern damit umfassende Informationen zur Gebührenkontrolle.

#### Ressourcen

[ZIPS](https://zips.z.cash/)

#### Hinweis

Bitte beachte, dass der sicherste Weg zur Nutzung von ZEC darin besteht, ausschließlich shielded Transaktionen zu verwenden. Einige Wallets befinden sich derzeit im Prozess der Implementierung von [Unified Address](https://electriccoin.co/blog/unified-addresses-in-zcash-explained/#:~:text=The%20unified%20address%20(UA)%20is,within%20the%20broader%20Zcash%20ecosystem.), wodurch Nutzer und Börsen transparente und shielded Adressen zusammenführen können. 

## ZEC-zu-ZAT-Konverter
