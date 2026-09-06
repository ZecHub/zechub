<a href="https://github.com/zechub/zechub/edit/main/site/Using_Zcash/Transactions.md" target="_blank">
  <img src="https://img.shields.io/badge/Edit-blue" alt="Edit Page"/>
</a>


# Transaktionen

ZEC ist ein weit verbreiteter digitaler Vermögenswert für Zahlungen und bietet starke Datenschutzfunktionen, die ihn für verschiedene Transaktionen wie Zahlungen an Freunde, Einkäufe oder Spenden geeignet machen. Um Datenschutz und Sicherheit zu maximieren, ist es wichtig zu verstehen, wie verschiedene Arten von Transaktionen innerhalb von Zcash funktionieren.

## Kurz gesagt

- Zcash unterstützt zwei Arten von Transaktionen: **abgeschirmte**, bei denen die Details privat bleiben, und **transparente**, bei denen sie öffentlich aufgezeichnet werden.
- Abgeschirmte Adressen beginnen mit `u` oder `z`. Transparente Adressen beginnen mit `t` und verhalten sich ähnlich wie eine Bitcoin-Adresse.
- Bei jeder Zahlung entscheidest du selbst. Datenschutz ist eine Option, die Zcash dir bietet, keine Einstellung, die jemand anderes für dich festlegt.
- Auszahlungen von einer Börse sind der häufigste Punkt, an dem Menschen ihre Privatsphäre verlieren. Wenn die Börse nur transparente Auszahlungen unterstützt, schirme die Mittel nach ihrem Eingang selbst ab.
- Gebühren folgen [ZIP 317](https://zips.z.cash/zip-0317) und steigen mit der Größe der Transaktion. Wallets, die weiterhin die alte Pauschalgebühr senden, können Verzögerungen bei ihren Transaktionen erleben.
- Die meisten Zcash-Transaktionen haben gemäß [ZIP 203](https://zips.z.cash/zip-0203) eine Ablaufhöhe. Wenn eine Transaktion abläuft, bevor sie gemined wird, kann sie nach dieser Ablaufhöhe nicht bestätigt werden und muss möglicherweise erneut gesendet werden.

## Abgeschirmte Transaktionen

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

Abgeschirmte Transaktionen finden statt, wenn du ZEC in dein abgeschirmtes Wallet überträgst. Die Adresse deines abgeschirmten Wallets beginnt mit `u` oder `z`. Beim Senden abgeschirmter Transaktionen können du und die Personen, mit denen du Transaktionen durchführst, ein Datenschutzniveau bewahren, das in standardmäßig öffentlichen Zahlungsnetzwerken nicht möglich ist.

Das Senden einer abgeschirmten Transaktion ist am einfachsten, wenn du ein Wallet verwendest, das das aktuelle Zcash-Netzwerk und die aktuellen abgeschirmten Pools unterstützt. Bevor du dich für Datenschutz auf ein Wallet verlässt, prüfe, ob es abgeschirmtes Senden, abgeschirmtes Empfangen und den Pool unterstützt, den du verwenden möchtest. Wenn du ZEC von einer Börse abhebst, prüfe, ob die Börse abgeschirmte oder transparente Auszahlungen unterstützt. Wenn sie nur transparente Auszahlungen unterstützt, übertrage die Mittel nach ihrem Eingang in ein Wallet mit Unterstützung für abgeschirmte Transaktionen.

Abgeschirmte Transaktionen zum Senden und Empfangen von Mitteln zu verwenden, ist die beste Methode, um die Privatsphäre zu bewahren und das Risiko der Offenlegung von Zahlungsdaten zu verringern.

## Transparente Transaktionen

Transparente Transaktionen funktionieren ähnlich wie Bitcoin-Transaktionen. Transaktionsdetails sind auf der blockchain öffentlich sichtbar, einschließlich transparenter Adressen und transparenter Werte. Transparente Transaktionen sollten vermieden werden, wenn Datenschutz Priorität hat.

Transparente Adressen sind in manchen Situationen weiterhin nützlich, insbesondere wenn eine Börse oder ein Dienst abgeschirmte Adressen nicht unterstützt. Wenn du ZEC an einer transparenten Adresse empfängst, erwäge, es abzuschirmen, bevor du spätere Zahlungen tätigst.

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

## Eine einfache Vorstellung davon

Eine transparente Transaktion ist eine Postkarte. Der Postbote liefert sie aus, aber jeder, der sie unterwegs in die Hände bekommt, kann die Nachricht lesen, sehen, wer sie gesendet hat, und sehen, wer sie empfängt.

Eine abgeschirmte Transaktion ist ein versiegelter Briefumschlag. Der Postdienst bestätigt weiterhin, dass ein echter Brief mit echtem Porto das System durchlaufen hat, und niemand kann einen fälschen oder denselben Brief zweimal versenden. Was der Umschlag enthält, bleibt zwischen Absender und Empfänger.

Der wichtige Punkt ist, dass Zcash dich bei jeder einzelnen Zahlung entscheiden lässt, welche der beiden Varianten du sendest.

## Zcash-Gebühren

Zcash verwendet keine Gas-Einheiten wie Ethereum. Zcash-Transaktionsgebühren werden in ZEC bezahlt, normalerweise gemessen in **zatoshis**. Ein ZEC entspricht 100.000.000 zatoshis.

[ZIP 317](https://zips.z.cash/zip-0317) definiert einen üblichen Gebührenmechanismus, der mit der Komplexität der Transaktion skaliert. Statt dass jede Transaktion die alte Pauschalgebühr von 1.000 zatoshi verwendet, basiert die übliche Gebühr auf „logischen Aktionen“ wie Eingaben, Ausgaben und abgeschirmten Aktionen. Einfache Transaktionen beginnen häufig bei etwa 10.000 zatoshis beziehungsweise 0,0001 ZEC, während komplexere Transaktionen mehr erfordern können.

In den meisten aktuellen Wallets sollten Nutzer ZIP-317-Gebühren nicht manuell berechnen müssen. Das Wallet sollte automatisch eine angemessene Gebühr auswählen. Wenn ein Wallet weiterhin die alte Pauschalgebühr verwendet oder dir erlaubt, eine Gebühr weit unter der üblichen ZIP-317-Gebühr festzulegen, kann die Transaktion verzögert, niedriger priorisiert, von einigen Knoten verworfen werden oder nicht zuverlässig weitergeleitet werden.

## Fehlerbehebung bei festhängenden Transaktionen

Eine Zcash-Transaktion ist nicht endgültig, nur weil sie in deinem Wallet erscheint. Für die übliche Nutzung wird sie endgültig, nachdem sie in einen Block gemined wurde und genügend Bestätigungen für deine Situation erhalten hat. Börsen und Dienste können mehr Bestätigungen verlangen, als ein Wallet standardmäßig anzeigt.

Nutze diesen Entscheidungsbaum, bevor du erneut sendest:

1. **Zeigt dein Wallet eine Transaktions-ID an?**
   - Falls nein, hat das Wallet die Transaktion möglicherweise noch nicht erstellt oder übertragen. Prüfe den Synchronisierungsstatus, die Internetverbindung, die Wallet-Version und etwaige Fehlermeldungen des Wallets.
   - Falls ja, kopiere die Transaktions-ID und fahre fort.
2. **Ist die Transaktion in einem Block bestätigt?**
   - Falls ja, warte auf die Anzahl der Bestätigungen, die dein Wallet, deine Börse, dein Händler oder Dienst verlangt.
   - Falls nein, fahre fort.
3. **Hat die Transaktion ihre Ablaufhöhe erreicht?**
   - Falls nein, sende dieselbe Zahlung noch nicht manuell erneut. Die ursprüngliche Transaktion kann weiterhin bestätigt werden.
   - Falls ja, kann die Transaktion nach dieser Ablaufhöhe nicht gemined werden. Dein Wallet markiert sie möglicherweise als abgelaufen oder fehlgeschlagen, und du musst eventuell eine neue Transaktion erstellen.
4. **Erscheint die Transaktion auf einem Server oder Explorer, aber nicht auf einem anderen?**
   - Betrachte dies als Problem der Netzwerksichtbarkeit und nicht als Beweis dafür, dass die Transaktion fehlgeschlagen ist. Verschiedene Knoten können unterschiedliche Mempool-Ansichten haben.
   - Warte, synchronisiere dein Wallet erneut oder wechsle zu einem anderen vertrauenswürdigen Server, wenn dein Wallet dies unterstützt.
5. **Ist die Transaktion verschwunden, nachdem sie als bestätigt angezeigt wurde?**
   - Eine kurze Chain-Reorganisation kann eine Transaktion vorübergehend aus der besten Chain entfernen.
   - Warte auf weitere Blöcke. Wenn die Transaktion wieder erscheint, warte weiter auf Bestätigungen. Wenn sie nicht wieder erscheint und später abläuft, erstelle eine neue Transaktion.
6. **Fordert dich das Wallet auf, erneut zu senden?**
   - Folge den aktuellen Anweisungen des Wallets erst, nachdem du geprüft hast, dass die vorherige Transaktion abgelaufen, fehlgeschlagen oder nicht mehr gültig ist.
   - Wenn du unsicher bist, frage den Support, bevor du erneut sendest.

## Ausstehend, abgelaufen, verworfen und reorganisiert

- **Ausstehend** bedeutet, dass die Transaktion erstellt oder übertragen wurde, aber noch nicht in einen Block gemined wurde.
- **Abgelaufen** bedeutet, dass die Ablaufhöhe der Transaktion überschritten wurde. Gemäß ZIP 203 kann eine Transaktion mit Ablaufhöhe nach dieser Höhe nicht gemined werden.
- **Verworfen** bedeutet, dass ein oder mehrere Knoten die Transaktion nicht mehr in ihrem Mempool behalten. Dies kann aufgrund von Ablauf, niedrigen Gebühren, Mempool-Richtlinien, Neustartverhalten oder Unterschieden bei der Weiterleitung geschehen.
- **Reorganisiert** bedeutet, dass ein Block, der die Transaktion zuvor enthielt, nicht mehr Teil der besten Chain ist. Die Transaktion kann später erneut gemined werden oder wieder ausstehend werden, wenn sie weiterhin gültig ist.

## Wann du nicht erneut senden solltest

Sende nicht sofort erneut, nur weil eine Transaktion aussteht, langsam ist oder in einem Explorer fehlt. Ein zu frühes erneutes Senden kann Verwirrung verursachen und je nachdem, wie das Wallet die neue Zahlung erstellt, das Risiko bergen, zweimal zu zahlen.

Warte zunächst oder hole dir Unterstützung, wenn:

- Die Transaktion eine Transaktions-ID hat und nicht abgelaufen ist.
- Ein Server sie anzeigt, ein anderer jedoch nicht.
- Sie kürzlich gemined wurde, aber nach einer möglichen Reorganisation Bestätigungen verloren hat.
- Der empfangende Dienst die Bestätigungen noch nicht vollständig gezählt hat.
- Dein Wallet noch synchronisiert.

Es ist in der Regel sicherer, erst erneut zu senden, nachdem das Wallet die Transaktion eindeutig als abgelaufen oder fehlgeschlagen markiert oder der Support bestätigt hat, dass die ursprüngliche Transaktion nicht bestätigt werden kann.

## Datenschutzsichere Prüfungen

Du kannst den grundlegenden Transaktionsstatus prüfen, ohne mehr Informationen als nötig offenzulegen:

- Prüfe, ob dein Wallet vollständig synchronisiert ist.
- Prüfe, ob die Wallet-App auf dem neuesten Stand ist.
- Prüfe, ob die Transaktion eine Transaktions-ID hat.
- Prüfe, ob die Transaktion bestätigt, ausstehend, abgelaufen oder fehlgeschlagen ist.
- Prüfe die aktuelle Blockhöhe und vergleiche sie mit der Ablaufhöhe der Transaktion, wenn dein Wallet diese anzeigt.
- Bei transparenten Transaktionen kann ein Blockexplorer die öffentliche Transaktion, Adressen, Werte und Bestätigungen anzeigen.
- Bei abgeschirmten Transaktionen kann ein Blockexplorer anzeigen, dass eine Transaktion existiert, jedoch nicht die abgeschirmten Details zu Absender, Empfänger, Betrag oder Memo.

## Was du nicht öffentlich teilen solltest

Veröffentliche diese Informationen niemals in öffentlichen Chats, sozialen Medien oder einem Issue-Tracker:

- Seed-Phrase oder Wiederherstellungsphrase
- Spending Key, privater Schlüssel oder Wallet-Backup
- Vollständiger Viewing Key
- Screenshots mit Guthaben, vollständigen Adressen, Memos, QR-Codes oder Details zu Börsenkonten
- Persönliche Identitätsdokumente oder Kontowiederherstellungsdaten

Eine Transaktions-ID ist auf der Chain öffentlich, kann deine Supportanfrage aber dennoch mit deiner Identität verbinden. Wenn Datenschutz wichtig ist, teile sie nur über einen vertrauenswürdigen Supportkanal.

## Was Supportteams benötigen

Wenn du den Support eines Wallets, einer Börse oder eines Dienstes um Hilfe bittest, teile nur die minimal notwendigen Informationen:

- Name des Wallets oder Dienstes
- App-Version und Betriebssystem
- Ob die Transaktion abgeschirmt, transparent oder zwischen abgeschirmten und transparenten Adressen erfolgt
- Transaktions-ID, falls du sie teilen möchtest
- Ungefähre Sendezeit
- Ob das Wallet vollständig synchronisiert ist
- Der vom Wallet angezeigte aktuelle Status
- Die genaue Fehlermeldung, mit entfernten privaten Daten
- Screenshot, auf dem Guthaben, Adressen, Memos und Kontodetails ausgeblendet sind

Supportteams benötigen weder deine Seed-Phrase noch deinen Spending Key, privaten Schlüssel oder vollständigen Viewing Key.

## Häufige Fehler

- **Anzunehmen, dass jedes Wallet, das ZEC auflistet, es privat senden kann.** Einige Multi-Coin-Wallets unterstützen nur die transparente Seite von Zcash. Prüfe die unterstützten Pools des Wallets, bevor du dich für Datenschutz darauf verlässt. Die Seite [Wallets](https://zechub.wiki/using-zcash/wallets) führt dies für jede Option auf.
- **An eine transparente Adresse auszahlen und die Mittel dort lassen.** Die Auszahlung selbst ist öffentlich, und jede spätere Bewegung von dieser Adresse bleibt ebenfalls öffentlich. Schirme die Mittel ab, sobald sie eintreffen.
- **Datenschutz als etwas zu behandeln, das man einmal einschaltet.** Jede Transaktion ist eine eigene Entscheidung. Heute abgeschirmt zu senden macht eine transparente Zahlung von letzter Woche nicht rückgängig.
- **Eine transparente Adresse für alles wiederzuverwenden.** Weil transparente Aktivitäten dauerhaft sichtbar sind, verknüpft eine einzige wiederverwendete Adresse nach und nach Zahlungen, die keinen Grund hatten, miteinander verbunden zu sein.
- **Mit einer veralteten Standardgebühr zu senden.** Wallets, die ZIP 317 noch nicht übernommen haben, können weiterhin die ältere Pauschalgebühr senden, wodurch eine Transaktion unbestätigt hängen bleiben kann.
- **Vor Ablauf erneut zu senden.** Eine ausstehende Transaktion kann bis zu ihrem Ablauf weiterhin bestätigt werden. Prüfe den Ablaufstatus, bevor du eine weitere Zahlung erstellst.

## Hinweis

Bitte beachte, dass die sicherste Verwendung von ZEC darin besteht, abgeschirmte Transaktionen zu verwenden, wenn Absender, Empfänger, Wallet und Dienst sie alle unterstützen. Einige Wallets und Börsen unterstützen [Unified Addresses](https://electriccoin.co/blog/unified-addresses-in-zcash-explained/#:~:text=The%20unified%20address%20(UA)%20is,within%20the%20broader%20Zcash%20ecosystem.), die mehrere Zcash-Empfängertypen in einer Adresse kombinieren können.

## Ressourcen

- [ZIP 203: Transaktionsablauf](https://zips.z.cash/zip-0203)
- [ZIP 317: Proportionaler Übertragungsgebührenmechanismus](https://zips.z.cash/zip-0317)
- [Zcash ZIPs](https://zips.z.cash/)

## Verwandte Seiten

- [Wallets](/using-zcash/wallets) - welche Wallets abgeschirmtes Senden unterstützen und welche nur transparent sind
- [Abgeschirmte Pools](/using-zcash/shielded-pools) - Sapling und Orchard, die Pools, in denen sich deine abgeschirmten Mittel befinden
- [Memos](/using-zcash/memos) - verschlüsselte Nachrichten, die mit einer abgeschirmten Transaktion übertragen werden können
- [Transparente Börsenadressen](/using-zcash/transparent-exchange-addresses) - TEX-Adressen und warum Börsen sie verwenden
- [Verwahrte Börsen](/using-zcash/custodial-exchanges) - welche Börsen abgeschirmte Auszahlungen unterstützen

## ZEC-zu-ZAT-Konverter
