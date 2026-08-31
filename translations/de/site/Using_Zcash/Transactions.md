<a href="https://github.com/zechub/zechub/edit/main/site/Using_Zcash/Transactions.md" target="_blank">
  <img src="https://img.shields.io/badge/Edit-blue" alt="Edit Page"/>
</a>


# Transaktionen

ZEC ist ein weit verbreiteter digitaler Vermögenswert für Zahlungen und bietet starke Datenschutzfunktionen, die ihn für verschiedene Transaktionen wie das Bezahlen von Freunden, Einkäufe oder Spenden geeignet machen. Um Datenschutz und Sicherheit zu maximieren, ist es wichtig zu verstehen, wie die verschiedenen Arten von Transaktionen innerhalb von Zcash funktionieren.

## TL;DR

- Zcash unterstützt zwei Arten von Transaktionen: **shielded**, die die Details privat halten, und **transparent**, die sie öffentlich aufzeichnen.
- Shielded-Adressen beginnen mit `u` oder `z`. Transparente Adressen beginnen mit `t` und verhalten sich ähnlich wie eine Bitcoin-Adresse.
- Bei jeder Zahlung liegt die Wahl bei dir. Privatsphäre ist eine Option, die Zcash dir gibt, nicht eine Einstellung, die jemand anderes für dich festlegt.
- Auszahlungen von einer Börse sind der häufigste Punkt, an dem Menschen Privatsphäre verlieren. Wenn die Börse nur transparente Auszahlungen unterstützt, schirme die Mittel selbst ab, sobald sie angekommen sind.
- Gebühren folgen [ZIP 317](https://zips.z.cash/zip-0317) und wachsen mit der Größe der Transaktion. Wallets, die noch die alte Pauschalgebühr senden, können Verzögerungen bei ihren Transaktionen erleben.
- Die meisten Zcash-Transaktionen haben unter [ZIP 203](https://zips.z.cash/zip-0203) eine Ablaufhöhe. Wenn eine Transaktion abläuft, bevor sie gemined wird, kann sie nach dieser Ablaufhöhe nicht mehr bestätigt werden und muss möglicherweise erneut gesendet werden.

## Shielded-Transaktionen

<div className="my-8 w-full aspect-video max-w-3xl mx-auto rounded-2xl overflow-hidden shadow-lg bg-black">
  <iframe
    className="w-full h-full"
    src="https://www.youtube.com/embed/bZM3o_eIovU"
    title="Zcash Explained: Zcash Shielded Transactions"
    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
    allowFullScreen
    loading="lazy"
  />
</div>

---

Shielded-Transaktionen entstehen, wenn du ZEC in deine shielded Wallet bewegst. Deine shielded Wallet-Adresse beginnt mit einem `u` oder `z`. Wenn du shielded Transaktionen sendest, können du und die Personen, mit denen du Transaktionen ausführst, ein Maß an Privatsphäre bewahren, das in standardmäßig öffentlichen Zahlungsnetzwerken nicht möglich ist.

Das Senden einer shielded Transaktion ist am einfachsten, wenn du eine Wallet verwendest, die das aktuelle Zcash-Netzwerk und die aktuellen shielded Pools unterstützt. Bevor du dich bei Privatsphäre auf eine Wallet verlässt, prüfe, ob sie shielded Senden, shielded Empfangen und den Pool unterstützt, den du verwenden möchtest. Wenn du ZEC von einer Börse abhebst, prüfe, ob die Börse shielded oder transparente Auszahlungen unterstützt. Wenn sie nur transparente Auszahlungen unterstützt, verschiebe die Mittel nach ihrem Eingang in eine Wallet, die Shielding unterstützt.

Shielded-Transaktionen zum Senden und Empfangen von Geldern zu verwenden, ist der beste Weg, um Privatsphäre zu bewahren und das Risiko zu verringern, Zahlungsdaten offenzulegen.

## Transparente Transaktionen

Transparente Transaktionen funktionieren ähnlich wie Bitcoin-Transaktionen. Transaktionsdetails sind öffentlich auf der Blockchain sichtbar, einschließlich transparenter Adressen und transparenter Werte. Transparente Transaktionen sollten vermieden werden, wenn Privatsphäre Priorität hat.

Transparente Adressen sind in manchen Situationen dennoch nützlich, besonders wenn eine Börse oder ein Dienst keine shielded Adressen unterstützt. Wenn du ZEC an eine transparente Adresse erhältst, ziehe in Betracht, es abzuschirmen, bevor du später Zahlungen tätigst.

<div className="my-8 w-full aspect-video max-w-3xl mx-auto rounded-2xl overflow-hidden shadow-lg bg-black">
  <iframe
    className="w-full h-full"
    src="https://www.youtube.com/embed/R-krX1UpsIg"
    title="Learn Zcash shielded wallets!"
    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
    allowFullScreen
    loading="lazy"
  />
</div>

## Eine einfache Vorstellung

Eine transparente Transaktion ist eine Postkarte. Der Postbote liefert sie aus, aber jeder, der sie unterwegs in die Hände bekommt, kann die Nachricht lesen, sehen, wer sie gesendet hat, und sehen, wer sie erhält.

Eine shielded Transaktion ist ein versiegelter Umschlag. Der Postdienst bestätigt weiterhin, dass ein echter Brief mit echtem Porto das System durchlaufen hat, und niemand kann einen fälschen oder denselben Brief zweimal senden. Was der Umschlag enthält, bleibt zwischen Absender und Empfänger.

Der wichtige Punkt ist, dass Zcash dich entscheiden lässt, welche davon du sendest, Zahlung für Zahlung.

## Zcash-Gebühren

Zcash verwendet keine Gas-Einheiten wie Ethereum. Zcash-Transaktionsgebühren werden in ZEC bezahlt, normalerweise gemessen in **zatoshis**. Ein ZEC entspricht 100.000.000 zatoshis.

[ZIP 317](https://zips.z.cash/zip-0317) definiert einen konventionellen Gebührenmechanismus, der mit der Komplexität der Transaktion skaliert. Statt dass jede Transaktion die alte Pauschalgebühr von 1.000 zatoshis verwendet, basiert die konventionelle Gebühr auf "logischen Aktionen" wie Inputs, Outputs und shielded Aktionen. Einfache Transaktionen beginnen häufig bei etwa 10.000 zatoshis oder 0,0001 ZEC, und komplexere Transaktionen können mehr erfordern.

In den meisten aktuellen Wallets sollten Nutzer ZIP-317-Gebühren nicht manuell berechnen müssen. Die Wallet sollte automatisch eine passende Gebühr wählen. Wenn eine Wallet noch die alte Pauschalgebühr verwendet oder dich eine Gebühr weit unter der konventionellen ZIP-317-Gebühr festlegen lässt, kann die Transaktion verzögert, niedriger priorisiert, von einigen Knoten verworfen werden oder sich nicht zuverlässig weiterleiten lassen.

## Fehlerbehebung bei festhängenden Transaktionen

Eine Zcash-Transaktion ist nicht endgültig, nur weil sie in deiner Wallet erscheint. Für die normale Nutzung wird sie erst endgültig, wenn sie in einen Block gemined wurde und genügend Bestätigungen für deine Situation erhalten hat. Börsen und Dienste können mehr Bestätigungen verlangen, als eine Wallet standardmäßig anzeigt.

Verwende diesen Entscheidungsbaum, bevor du erneut sendest:

1. **Zeigt deine Wallet eine Transaktions-ID an?**
   - Wenn nein, hat die Wallet die Transaktion möglicherweise noch nicht erstellt oder übertragen. Prüfe den Synchronisierungsstatus, die Internetverbindung, die Wallet-Version und etwaige Wallet-Fehlermeldungen.
   - Wenn ja, kopiere die Transaktions-ID und fahre fort.
2. **Ist die Transaktion in einem Block bestätigt?**
   - Wenn ja, warte auf die Anzahl an Bestätigungen, die von deiner Wallet, Börse, deinem Händler oder Dienst verlangt wird.
   - Wenn nein, fahre fort.
3. **Hat die Transaktion ihre Ablaufhöhe erreicht?**
   - Wenn nein, sende dieselbe Zahlung noch nicht manuell erneut. Die ursprüngliche Transaktion kann weiterhin bestätigt werden.
   - Wenn ja, kann die Transaktion nach dieser Ablaufhöhe nicht mehr gemined werden. Deine Wallet markiert sie möglicherweise als abgelaufen oder fehlgeschlagen, und du musst eventuell eine neue Transaktion erstellen.
4. **Erscheint die Transaktion auf einem Server oder Explorer, aber nicht auf einem anderen?**
   - Betrachte dies als ein Problem der Netzwerksichtbarkeit, nicht als Beweis dafür, dass die Transaktion fehlgeschlagen ist. Unterschiedliche Knoten können unterschiedliche Ansichten des Mempools haben.
   - Warte, synchronisiere deine Wallet erneut oder wechsle zu einem anderen vertrauenswürdigen Server, falls deine Wallet das unterstützt.
5. **Ist die Transaktion verschwunden, nachdem sie als bestätigt erschien?**
   - Eine kurze Chain-Reorganisation kann eine Transaktion vorübergehend aus der besten Chain entfernen.
   - Warte auf weitere Blöcke. Wenn die Transaktion zurückkehrt, warte weiter auf Bestätigungen. Wenn sie nicht zurückkehrt und später abläuft, erstelle eine neue Transaktion.
6. **Fordert die Wallet dich auf, erneut zu senden?**
   - Folge der aktuellen Anweisung der Wallet erst, nachdem du geprüft hast, dass die vorherige Transaktion abgelaufen, fehlgeschlagen oder nicht mehr gültig ist.
   - Wenn du unsicher bist, kontaktiere den Support, bevor du erneut sendest.

## Ausstehend, abgelaufen, verworfen und reorganisiert

- **Ausstehend** bedeutet, dass die Transaktion erstellt oder übertragen wurde, aber noch nicht in einen Block gemined wurde.
- **Abgelaufen** bedeutet, dass die Ablaufhöhe der Transaktion überschritten wurde. Unter ZIP 203 kann eine Transaktion mit einer Ablaufhöhe nach dieser Höhe nicht mehr gemined werden.
- **Verworfen** bedeutet, dass ein oder mehrere Knoten die Transaktion nicht mehr in ihrem Mempool behalten. Das kann wegen Ablauf, niedriger Gebühren, Mempool-Richtlinien, Neustartverhalten oder Unterschieden bei der Weiterleitung passieren.
- **Reorganisiert** bedeutet, dass ein Block, der die Transaktion zuvor enthielt, nicht mehr Teil der besten Chain ist. Die Transaktion kann später erneut gemined werden oder wieder in den Status ausstehend zurückkehren, wenn sie noch gültig ist.

## Wann man nicht erneut senden sollte

Sende nicht sofort erneut, nur weil eine Transaktion ausstehend, langsam oder in einem Explorer nicht zu sehen ist. Zu frühes erneutes Senden kann Verwirrung stiften und, je nachdem wie die Wallet die neue Zahlung erstellt, das Risiko bergen, doppelt zu zahlen.

Warte oder hole zuerst Support ein, wenn:

- Die Transaktion eine Transaktions-ID hat und nicht abgelaufen ist.
- Ein Server sie anzeigt, ein anderer jedoch nicht.
- Sie kürzlich gemined wurde, aber nach einer möglichen Reorganisation Bestätigungen verloren hat.
- Der empfangende Dienst die Bestätigungen noch nicht fertig gezählt hat.
- Deine Wallet noch synchronisiert.

Es ist in der Regel sicherer, erst dann erneut zu senden, wenn die Wallet die Transaktion eindeutig als abgelaufen oder fehlgeschlagen markiert oder der Support bestätigt, dass die ursprüngliche Transaktion nicht bestätigt werden kann.

## Datenschutzfreundliche Prüfungen

Du kannst den grundlegenden Transaktionsstatus prüfen, ohne mehr Informationen als nötig offenzulegen:

- Prüfe, ob deine Wallet vollständig synchronisiert ist.
- Prüfe, ob die Wallet-App auf dem neuesten Stand ist.
- Prüfe, ob die Transaktion eine Transaktions-ID hat.
- Prüfe, ob die Transaktion bestätigt, ausstehend, abgelaufen oder fehlgeschlagen ist.
- Prüfe die aktuelle Blockhöhe und vergleiche sie mit der Ablaufhöhe der Transaktion, falls deine Wallet sie anzeigt.
- Bei transparenten Transaktionen kann ein Block-Explorer die öffentliche Transaktion, Adressen, Werte und Bestätigungen anzeigen.
- Bei shielded Transaktionen kann ein Block-Explorer anzeigen, dass eine Transaktion existiert, aber er kann keine shielded Absender-, Empfänger-, Betrags- oder Memo-Details anzeigen.

## Was man nicht öffentlich teilen sollte

Veröffentliche diese Dinge niemals in öffentlichen Chats, sozialen Medien oder einem Issue-Tracker:

- Seed Phrase oder Recovery Phrase
- Spending Key, Private Key oder Wallet-Backup
- Full Viewing Key
- Screenshots, die Guthaben, vollständige Adressen, Memos, QR-Codes oder Details zum Börsenkonto zeigen
- Persönliche Identitätsdokumente oder Unterlagen zur Kontowiederherstellung

Eine Transaktions-ID ist in der Chain öffentlich, kann deine Supportanfrage aber dennoch mit deiner Identität verbinden. Wenn Privatsphäre wichtig ist, teile sie nur über einen vertrauenswürdigen Support-Kanal.

## Was Support-Teams benötigen

Wenn du Wallet-, Börsen- oder Dienst-Support um Hilfe bittest, teile nur die minimal nötigen nützlichen Informationen:

- Name der Wallet oder des Dienstes
- App-Version und Betriebssystem
- Ob die Transaktion shielded, transparent oder zwischen shielded und transparenten Adressen ist
- Transaktions-ID, wenn du sie teilen möchtest
- Ungefähre Sendezeit
- Ob die Wallet vollständig synchronisiert ist
- Aktueller Status, den die Wallet anzeigt
- Exakte Fehlermeldung, mit entfernten privaten Daten
- Screenshot, bei dem Guthaben, Adressen, Memos und Kontodetails verborgen sind

Support-Teams benötigen weder deine Seed Phrase noch deinen Spending Key, Private Key oder Full Viewing Key.

## Häufige Fehler

- **Anzunehmen, dass jede Wallet, die ZEC aufführt, es privat senden kann.** Eine Reihe von Multi-Coin-Wallets unterstützt nur die transparente Seite von Zcash. Prüfe die von der Wallet unterstützten Pools, bevor du dich bei Privatsphäre auf sie verlässt. Die Seite [Wallets](https://zechub.wiki/using-zcash/wallets) listet dies für jede Option auf.
- **An eine transparente Adresse auszahlen und die Mittel dort liegen lassen.** Die Auszahlung selbst ist öffentlich, und jede spätere Bewegung von dieser Adresse bleibt ebenfalls öffentlich. Schirme die Mittel ab, sobald sie angekommen sind.
- **Privatsphäre als etwas zu behandeln, das man einmal einschaltet.** Jede Transaktion ist eine eigene Entscheidung. Heute shielded zu senden macht eine transparente Zahlung von letzter Woche nicht rückgängig.
- **Eine transparente Adresse für alles wiederzuverwenden.** Da transparente Aktivität dauerhaft sichtbar ist, verknüpft eine einzelne wiederverwendete Adresse nach und nach Zahlungen, die keinen Grund hatten, miteinander verbunden zu sein.
- **Mit einer veralteten Standardgebühr zu senden.** Wallets, die ZIP 317 nicht übernommen haben, senden möglicherweise noch die ältere Pauschalgebühr, wodurch eine Transaktion unbestätigt hängen bleiben kann.
- **Vor Ablauf erneut zu senden.** Eine ausstehende Transaktion kann weiterhin bestätigt werden, bis sie abläuft. Prüfe den Ablaufstatus, bevor du eine weitere Zahlung erstellst.

## Hinweis

Bitte beachte, dass die sicherste Art, ZEC zu verwenden, darin besteht, shielded Transaktionen zu nutzen, wann immer Absender, Empfänger, Wallet und Dienst sie alle unterstützen. Einige Wallets und Börsen unterstützen [Unified Address](https://electriccoin.co/blog/unified-addresses-in-zcash-explained/#:~:text=The%20unified%20address%20(UA)%20is,within%20the%20broader%20Zcash%20ecosystem.), die mehrere Zcash-Empfängertypen in einer Adresse kombinieren kann.

## Ressourcen

- [ZIP 203: Transaktionsablauf](https://zips.z.cash/zip-0203)
- [ZIP 317: Proportionaler Transfergebühren-Mechanismus](https://zips.z.cash/zip-0317)
- [Zcash ZIPs](https://zips.z.cash/)

## Verwandte Seiten

- [Wallets](/using-zcash/wallets) - welche Wallets shielded Senden unterstützen und welche nur transparent sind
- [Shielded Pools](/using-zcash/shielded-pools) - Sapling und Orchard, die Pools, in denen deine shielded Mittel liegen
- [Memos](/using-zcash/memos) - verschlüsselte Nachrichten, die mit einer shielded Transaktion mitgeschickt werden können
- [Transparente Börsenadressen](/using-zcash/transparent-exchange-addresses) - TEX-Adressen und warum Börsen sie verwenden
- [Verwahrende Börsen](/using-zcash/custodial-exchanges) - welche Börsen shielded Auszahlungen unterstützen

## ZEC-zu-ZAT-Konverter
