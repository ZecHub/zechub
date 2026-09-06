<a href="https://github.com/zechub/zechub/edit/main/site/Using_Zcash/Transactions.md" target="_blank">
  <img src="https://img.shields.io/badge/Edit-blue" alt="Edit Page"/>
</a>


# Transaktionen

ZEC ist ein weit verbreiteter digitaler Vermögenswert für Zahlungen und bietet starke Datenschutzfunktionen, die ihn für verschiedene Transaktionen geeignet machen, etwa für Zahlungen an Freunde, Einkäufe oder Spenden. Um Datenschutz und Sicherheit zu maximieren, ist es wichtig zu verstehen, wie die verschiedenen Arten von Transaktionen innerhalb von Zcash funktionieren.

## TL;DR

- Zcash unterstützt zwei Arten von Transaktionen: **shielded**, bei denen die Details privat bleiben, und **transparent**, bei denen sie öffentlich aufgezeichnet werden.
- Shielded-Adressen beginnen mit `u` oder `z`. Transparente Adressen beginnen mit `t` und funktionieren ähnlich wie eine Bitcoin-Adresse.
- Bei jeder Zahlung hast du die Wahl. Datenschutz ist eine Option, die Zcash dir bietet, keine Einstellung, die jemand anderes für dich festlegt.
- Auszahlungen von einer Börse sind der häufigste Punkt, an dem Menschen ihre Privatsphäre verlieren. Wenn die Börse nur transparente Auszahlungen unterstützt, schirme die Mittel selbst ab, sobald sie angekommen sind.
- Gebühren folgen [ZIP 317](https://zips.z.cash/zip-0317) und wachsen mit der Größe der Transaktion. Bei Wallets, die noch die alte Pauschalgebühr senden, können sich Transaktionen verzögern.
- Die meisten Zcash-Transaktionen haben gemäß [ZIP 203](https://zips.z.cash/zip-0203) eine Ablaufhöhe. Wenn eine Transaktion abläuft, bevor sie gemint wird, kann sie nach dieser Ablaufhöhe nicht mehr bestätigt werden und muss möglicherweise erneut gesendet werden.

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

Shielded-Transaktionen finden statt, wenn du ZEC in deine shielded Wallet verschiebst. Die Adresse deiner shielded Wallet beginnt mit `u` oder `z`. Beim Senden shielded Transaktionen kannst du gemeinsam mit den Personen, mit denen du Transaktionen durchführst, ein Datenschutzniveau bewahren, das in standardmäßig öffentlichen Zahlungsnetzwerken nicht möglich ist.

Das Senden einer shielded Transaktion ist am einfachsten mit einer Wallet, die das aktuelle Zcash-Netzwerk und die aktuellen shielded Pools unterstützt. Bevor du dich für den Datenschutz auf eine Wallet verlässt, prüfe, ob sie shielded Senden, shielded Empfangen und den Pool unterstützt, den du nutzen möchtest. Wenn du ZEC von einer Börse abhebst, prüfe, ob die Börse shielded oder transparente Auszahlungen unterstützt. Wenn sie nur transparente Auszahlungen unterstützt, verschiebe die Mittel nach ihrem Eintreffen in eine shielded-fähige Wallet.

Shielded-Transaktionen zum Senden und Empfangen von Mitteln zu verwenden, ist die beste Methode, Privatsphäre zu bewahren und das Risiko eines Datenlecks bei Zahlungen zu verringern.

## Transparente Transaktionen

Transparente Transaktionen funktionieren ähnlich wie Bitcoin-Transaktionen. Transaktionsdetails sind auf der Blockchain öffentlich sichtbar, einschließlich transparenter Adressen und transparenter Beträge. Transparente Transaktionen sollten vermieden werden, wenn Datenschutz Priorität hat.

Transparente Adressen sind in manchen Situationen weiterhin nützlich, insbesondere wenn eine Börse oder ein Dienst shielded Adressen nicht unterstützt. Wenn du ZEC an eine transparente Adresse erhältst, solltest du es abschirmen, bevor du später Zahlungen tätigst.

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

## Eine einfache Vorstellungshilfe

Eine transparente Transaktion ist eine Postkarte. Der Briefträger liefert sie aus, doch jeder, der sie unterwegs in die Hände bekommt, kann die Nachricht lesen, sehen, wer sie gesendet hat, und sehen, wer sie erhält.

Eine shielded Transaktion ist ein versiegelter Umschlag. Der Postdienst bestätigt weiterhin, dass ein echter Brief mit echtem Porto das System durchlaufen hat, und niemand kann einen fälschen oder denselben Brief zweimal versenden. Was der Umschlag enthält, bleibt zwischen Absender und Empfänger.

Der wichtige Punkt ist, dass Zcash dir erlaubt, bei jeder einzelnen Zahlung zu entscheiden, welche davon du sendest.

## Zcash-Gebühren

Zcash verwendet keine Gas-Einheiten wie Ethereum. Zcash-Transaktionsgebühren werden in ZEC bezahlt, üblicherweise gemessen in **zatoshis**. Ein ZEC entspricht 100.000.000 zatoshis.

[ZIP 317](https://zips.z.cash/zip-0317) definiert einen üblichen Gebührenmechanismus, der mit der Komplexität der Transaktion skaliert. Statt dass jede Transaktion die alte Pauschalgebühr von 1.000 zatoshis verwendet, basiert die übliche Gebühr auf „logischen Aktionen“, etwa Eingängen, Ausgängen und shielded Aktionen. Einfache Transaktionen beginnen häufig bei etwa 10.000 zatoshis bzw. 0,0001 ZEC, während komplexere Transaktionen mehr erfordern können.

In den meisten aktuellen Wallets sollten Nutzer ZIP-317-Gebühren nicht manuell berechnen müssen. Die Wallet sollte automatisch eine angemessene Gebühr wählen. Wenn eine Wallet weiterhin die alte Pauschalgebühr verwendet oder dir erlaubt, eine Gebühr weit unter der üblichen ZIP-317-Gebühr festzulegen, kann die Transaktion verzögert, nachrangig behandelt, von einigen Knoten verworfen werden oder nicht zuverlässig weitergeleitet werden.

## Fehlerbehebung bei hängenden Transaktionen

Eine Zcash-Transaktion ist nicht endgültig, nur weil sie in deiner Wallet erscheint. Für die gewöhnliche Nutzung wird sie endgültig, nachdem sie in einen Block gemint wurde und ausreichend Bestätigungen für deine Situation erhalten hat. Börsen und Dienste können mehr Bestätigungen verlangen, als eine Wallet standardmäßig anzeigt.

Verwende diesen Entscheidungsbaum, bevor du erneut sendest:

1. **Zeigt deine Wallet eine Transaktions-ID an?**
   - Falls nein, hat die Wallet die Transaktion möglicherweise noch nicht erstellt oder übertragen. Prüfe den Synchronisierungsstatus, die Internetverbindung, die Wallet-Version und etwaige Fehlermeldungen der Wallet.
   - Falls ja, kopiere die Transaktions-ID und fahre fort.
2. **Ist die Transaktion in einem Block bestätigt?**
   - Falls ja, warte auf die Anzahl der Bestätigungen, die deine Wallet, Börse, dein Händler oder Dienst verlangt.
   - Falls nein, fahre fort.
3. **Hat die Transaktion ihre Ablaufhöhe erreicht?**
   - Falls nein, sende dieselbe Zahlung noch nicht manuell erneut. Die ursprüngliche Transaktion kann weiterhin bestätigt werden.
   - Falls ja, kann die Transaktion nach dieser Ablaufhöhe nicht mehr gemint werden. Deine Wallet markiert sie möglicherweise als abgelaufen oder fehlgeschlagen, und du musst möglicherweise eine neue Transaktion erstellen.
4. **Erscheint die Transaktion auf einem Server oder Explorer, aber nicht auf einem anderen?**
   - Betrachte dies als Problem der Netzwerksichtbarkeit, nicht als Beweis dafür, dass die Transaktion fehlgeschlagen ist. Verschiedene Knoten können unterschiedliche Ansichten des Mempools haben.
   - Warte, synchronisiere deine Wallet erneut oder wechsle zu einem anderen vertrauenswürdigen Server, wenn deine Wallet dies unterstützt.
5. **Ist die Transaktion verschwunden, nachdem sie als bestätigt erschienen ist?**
   - Eine kurze Chain-Reorganisation kann eine Transaktion vorübergehend aus der besten Chain entfernen.
   - Warte auf weitere Blöcke. Wenn die Transaktion wieder erscheint, warte weiter auf Bestätigungen. Wenn sie nicht zurückkehrt und später abläuft, erstelle eine neue Transaktion.
6. **Fordert dich die Wallet auf, erneut zu senden?**
   - Folge den aktuellen Anweisungen der Wallet erst, nachdem du geprüft hast, dass die vorherige Transaktion abgelaufen, fehlgeschlagen oder nicht mehr gültig ist.
   - Wenn du unsicher bist, frage den Support, bevor du erneut sendest.

## Ausstehend, abgelaufen, verworfen und reorganisiert

- **Ausstehend** bedeutet, dass die Transaktion erstellt oder übertragen wurde, aber noch nicht in einen Block gemint wurde.
- **Abgelaufen** bedeutet, dass die Ablaufhöhe der Transaktion überschritten wurde. Gemäß ZIP 203 kann eine Transaktion mit einer Ablaufhöhe nach dieser Höhe nicht mehr gemint werden.
- **Verworfen** bedeutet, dass ein oder mehrere Knoten die Transaktion nicht mehr in ihrem Mempool behalten. Dies kann aufgrund des Ablaufs, niedriger Gebühren, der Mempool-Richtlinie, des Verhaltens nach einem Neustart oder von Unterschieden bei der Weiterleitung geschehen.
- **Reorganisiert** bedeutet, dass ein Block, der die Transaktion zuvor enthielt, nicht mehr Teil der besten Chain ist. Die Transaktion kann später erneut gemint werden oder wieder ausstehend werden, wenn sie weiterhin gültig ist.

## Wann du nicht erneut senden solltest

Sende nicht sofort erneut, nur weil eine Transaktion aussteht, langsam ist oder in einem Explorer fehlt. Zu frühes erneutes Senden kann Verwirrung verursachen und, abhängig davon, wie die Wallet die neue Zahlung erstellt, das Risiko bergen, zweimal zu zahlen.

Warte zunächst oder hole dir Unterstützung, wenn:

- Die Transaktion eine Transaktions-ID hat und nicht abgelaufen ist.
- Ein Server sie anzeigt, ein anderer jedoch nicht.
- Sie kürzlich gemint wurde, aber nach einer möglichen Reorganisation Bestätigungen verloren hat.
- Der empfangende Dienst noch nicht alle Bestätigungen gezählt hat.
- Deine Wallet noch synchronisiert wird.

Es ist normalerweise sicherer, erst erneut zu senden, nachdem die Wallet die Transaktion eindeutig als abgelaufen oder fehlgeschlagen markiert hat oder der Support bestätigt, dass die ursprüngliche Transaktion nicht bestätigt werden kann.

## Datenschutzsichere Prüfungen

Du kannst den grundlegenden Transaktionsstatus prüfen, ohne mehr Informationen als nötig preiszugeben:

- Prüfe, ob deine Wallet vollständig synchronisiert ist.
- Prüfe, ob die Wallet-App auf dem neuesten Stand ist.
- Prüfe, ob die Transaktion eine Transaktions-ID hat.
- Prüfe, ob die Transaktion bestätigt, ausstehend, abgelaufen oder fehlgeschlagen ist.
- Prüfe die aktuelle Blockhöhe und vergleiche sie mit der Ablaufhöhe der Transaktion, falls deine Wallet diese anzeigt.
- Bei transparenten Transaktionen kann ein Block-Explorer die öffentliche Transaktion, Adressen, Beträge und Bestätigungen anzeigen.
- Bei shielded Transaktionen kann ein Block-Explorer anzeigen, dass eine Transaktion existiert, aber weder shielded Absender, Empfänger, Betrag noch Memo-Details anzeigen.

## Was du nicht öffentlich teilen solltest

Veröffentliche Folgendes niemals in einem öffentlichen Chat, in sozialen Medien oder in einem Issue-Tracker:

- Seed-Phrase oder Wiederherstellungsphrase
- Spending Key, Private Key oder Wallet-Backup
- Full Viewing Key
- Screenshots mit Guthaben, vollständigen Adressen, Memos, QR-Codes oder Kontodetails einer Börse
- Persönliche Ausweisdokumente oder Unterlagen zur Kontowiederherstellung

Eine Transaktions-ID ist auf der Chain öffentlich, kann deine Supportanfrage aber dennoch mit deiner Identität verknüpfen. Wenn Privatsphäre wichtig ist, teile sie nur über einen vertrauenswürdigen Supportkanal.

## Was Supportteams benötigen

Wenn du den Support einer Wallet, Börse oder eines Dienstes um Hilfe bittest, teile nur die minimal notwendigen Informationen:

- Name der Wallet oder des Dienstes
- App-Version und Betriebssystem
- Ob die Transaktion shielded, transparent oder zwischen shielded und transparenten Adressen erfolgt
- Transaktions-ID, wenn du sie bedenkenlos teilen möchtest
- Ungefährer Sendezeitpunkt
- Ob die Wallet vollständig synchronisiert ist
- Aktueller Status, den die Wallet anzeigt
- Genaue Fehlermeldung, ohne private Daten
- Screenshot, auf dem Guthaben, Adressen, Memos und Kontodetails ausgeblendet sind

Supportteams benötigen weder deine Seed-Phrase noch deinen Spending Key, Private Key oder Full Viewing Key.

## Häufige Fehler

- **Anzunehmen, dass jede Wallet, die ZEC aufführt, es privat senden kann.** Eine Reihe von Multi-Coin-Wallets unterstützt nur die transparente Seite von Zcash. Prüfe die von der Wallet unterstützten Pools, bevor du dich für den Datenschutz auf sie verlässt. Die Seite [Wallets](https://zechub.wiki/using-zcash/wallets) führt dies für jede Option auf.
- **An eine transparente Adresse auszuzahlen und die Mittel dort zu lassen.** Die Auszahlung selbst ist öffentlich, und auch jede spätere Bewegung von dieser Adresse bleibt öffentlich. Schirme die Mittel ab, sobald sie angekommen sind.
- **Datenschutz als etwas zu betrachten, das man einmal aktiviert.** Jede Transaktion ist eine eigenständige Entscheidung. Shielded zu senden macht eine transparente Zahlung von letzter Woche nicht rückgängig.
- **Eine transparente Adresse für alles wiederzuverwenden.** Da transparente Aktivitäten dauerhaft sichtbar sind, verknüpft eine einzelne wiederverwendete Adresse nach und nach Zahlungen, die keinen Grund hatten, miteinander verbunden zu sein.
- **Mit einer veralteten Standardgebühr zu senden.** Wallets, die ZIP 317 nicht übernommen haben, können weiterhin die ältere Pauschalgebühr senden, wodurch eine Transaktion unbestätigt hängen bleiben kann.
- **Vor Ablauf erneut zu senden.** Eine ausstehende Transaktion kann noch bestätigt werden, bis sie abläuft. Prüfe den Ablaufstatus, bevor du eine weitere Zahlung erstellst.

## Hinweis

Bitte beachte, dass die sicherste Art, ZEC zu verwenden, darin besteht, shielded Transaktionen zu nutzen, wann immer Absender, Empfänger, Wallet und Dienst sie alle unterstützen. Einige Wallets und Börsen unterstützen [Unified Addresses](https://electriccoin.co/blog/unified-addresses-in-zcash-explained/#:~:text=The%20unified%20address%20(UA)%20is,within%20the%20broader%20Zcash%20ecosystem.), die mehrere Zcash-Empfängertypen in einer Adresse kombinieren können.

## Ressourcen

- [ZIP 203: Transaktionsablauf](https://zips.z.cash/zip-0203)
- [ZIP 317: Proportionaler Übertragungsgebührenmechanismus](https://zips.z.cash/zip-0317)
- [Zcash ZIPs](https://zips.z.cash/)

## Verwandte Seiten

- [Wallets](/using-zcash/wallets) - welche Wallets shielded Senden unterstützen und welche nur transparent sind
- [Shielded Pools](/using-zcash/shielded-pools) - Sapling und Orchard, die Pools, in denen deine shielded Mittel liegen
- [Memos](/using-zcash/memos) - verschlüsselte Nachrichten, die mit einer shielded Transaktion mitgesendet werden können
- [Transparente Börsenadressen](/using-zcash/transparent-exchange-addresses) - TEX-Adressen und warum Börsen sie verwenden
- [Verwahrte Börsen](/using-zcash/custodial-exchanges) - welche Börsen shielded Auszahlungen unterstützen

## ZEC-zu-ZAT-Konverter
