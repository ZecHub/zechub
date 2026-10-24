# Häufig gestellte Fragen

Eine Liste der häufigsten Fragen zu Zcash. Hilfe bei Problemen mit dem Zcash-Client finden Sie im [offiziellen Leitfaden zur Fehlerbehebung](https://zcash.readthedocs.io/en/latest/rtd_pages/troubleshooting_guide.html).

### Schnelle Navigation

<div className="flex flex-wrap gap-2 my-4">
  <a href="#what-is-zcash" className="inline-flex px-3 py-1.5 rounded-full border border-border bg-card text-sm no-underline hover:bg-accent">Was ist Zcash?</a>
  <a href="#how-can-i-acquire-zcash" className="inline-flex px-3 py-1.5 rounded-full border border-border bg-card text-sm no-underline hover:bg-accent">Wie kann ich Zcash erwerben?</a>
  <a href="#what-is-the-difference-between-zcash-and-other-cryptocurrencies" className="inline-flex px-3 py-1.5 rounded-full border border-border bg-card text-sm no-underline hover:bg-accent">Unterschied zu anderen Kryptowährungen?</a>
  <a href="#how-is-the-zcash-protocol-governed" className="inline-flex px-3 py-1.5 rounded-full border border-border bg-card text-sm no-underline hover:bg-accent">Protokoll-Governance?</a>
  <a href="#where-is-my-transaction" className="inline-flex px-3 py-1.5 rounded-full border border-border bg-card text-sm no-underline hover:bg-accent">Wo ist meine Transaktion?</a>
  <a href="#is-zcash-really-private" className="inline-flex px-3 py-1.5 rounded-full border border-border bg-card text-sm no-underline hover:bg-accent">Ist Zcash wirklich privat?</a>
  <a href="#a-few-common-misconceptions" className="inline-flex px-3 py-1.5 rounded-full border border-border bg-card text-sm no-underline hover:bg-accent">Häufige Missverständnisse</a>
  <a href="#zcashd-stopped-working-what-do-i-run-now" className="inline-flex px-3 py-1.5 rounded-full border border-border bg-card text-sm no-underline hover:bg-accent">zcashd funktioniert nicht mehr?</a>
  <a href="#how-do-i-move-my-zcashd-wallet-to-zallet" className="inline-flex px-3 py-1.5 rounded-full border border-border bg-card text-sm no-underline hover:bg-accent">Meine Wallet zu Zallet übertragen?</a>
  <a href="#what-is-ironwood-and-do-i-need-to-do-anything" className="inline-flex px-3 py-1.5 rounded-full border border-border bg-card text-sm no-underline hover:bg-accent">Was ist Ironwood?</a>
  <a href="#which-full-node-should-i-run" className="inline-flex px-3 py-1.5 rounded-full border border-border bg-card text-sm no-underline hover:bg-accent">Welchen vollständigen Knoten?</a>
  <a href="#where-do-i-look-up-a-term-from-a-release-note" className="inline-flex px-3 py-1.5 rounded-full border border-border bg-card text-sm no-underline hover:bg-accent">Einen Begriff nachschlagen?</a>
</div>

---

## Was ist Zcash?

<div className="rounded-2xl border border-border bg-card p-5 my-4">

Zcash ist eine digitale Währung mit schnellen, vertraulichen Transaktionen und niedrigen Gebühren. Privatsphäre ist das zentrale Merkmal von Zcash. Es war Vorreiter beim Einsatz von Zero-Knowledge-Beweisen zur Verschlüsselung aller Transaktionen.

Für sofortige, mobile, sichere und private Zahlungen stehen mehrere Wallets zur Verfügung: [Wallets](/using-zcash/wallets)

</div>

## Wie kann ich Zcash erwerben?

<div className="rounded-2xl border border-border bg-card p-5 my-4">

Sie können ZEC auf [verwahrenden Börsen](/using-zcash/custodial-exchanges), [DEXs](/using-zcash/dex) oder [zentralisierten Swap-Plattformen](/using-zcash/centralized-swaps) kaufen.

Sie können Zcash auch direkt von anderen Personen kaufen oder durch Mining erwerben.

</div>

## Was ist der Unterschied zwischen Zcash und anderen Kryptowährungen?

<div className="rounded-2xl border border-border bg-card p-5 my-4">

Zcash ist grundlegend privater als Bitcoin oder Ethereum. Es bietet schnelle Blockzeiten (75 Sekunden), niedrige Gebühren und regelmäßige Upgrades.

Nutzer können zwischen **transparenten** oder **abgeschirmten** Transaktionen wählen. Weitere Informationen finden Sie unter [Ein abgeschirmtes Ökosystem](https://electriccoin.co/blog/shielded-ecosystem).

</div>

## Wie wird das Zcash-Protokoll gesteuert?

<div className="rounded-2xl border border-border bg-card p-5 my-4">

Das Protokoll wird durch den Prozess der **Zcash Improvement Proposals (ZIP)** gesteuert. Jede Person kann einen Entwurf für ein ZIP einreichen. Entwürfe werden von der Community diskutiert und von den ZIP-Editoren angenommen oder abgelehnt:

- [Daira Hopwood](https://twitter.com/feministPLT) (Electric Coin Company)
- [Deirdre Connolly](https://twitter.com/durumcrustulum) (Zcash Foundation)

Entscheidungen werden in die Spezifikation aufgenommen und on-chain ratifiziert, wenn das Netzwerk sie übernimmt.

</div>

## Wo ist meine Transaktion?

<div className="rounded-2xl border border-border bg-card p-5 my-4">

Lesen Sie zunächst [unseren Leitfaden zu Block-Explorern](/guides/blockchain-explorers). Prüfen Sie anschließend den [Zcash Block Explorer](https://mainnet.zcashexplorer.app).

Transaktionen laufen nach etwa 25 Minuten (20 Blöcken) ab und die Gelder werden automatisch zurückerstattet.

**Häufige Gründe, warum eine Transaktion möglicherweise nicht erscheint:**

- Verlust der Verbindung
- Transaktionsgebühr zu niedrig
- Netzwerküberlastung
- Zu viele transparente Eingaben (Größe zu hoch)

**Tipps für eine erfolgreiche Transaktion:**

- Nutzen Sie eine stabile Verbindung
- Zahlen Sie die Standardgebühr (oder mehr für Priorität)
- Warten Sie und versuchen Sie es später erneut
- Verwenden Sie weniger Eingaben, um die Transaktion klein zu halten

</div>

## Ist Zcash wirklich privat?

<div className="rounded-2xl border border-border bg-card p-5 my-4">

**Ja.** Zcash verschlüsselt bei abgeschirmten Transaktionen die Daten des Senders, den Betrag und die Empfängerdaten.

Zcash verschlüsselt **nicht**:

- Multisignatur-Transaktionen (FROST-Integration steht noch aus)
- schützt nicht vor Korrelationen mit transparenten Transaktionen
- verbirgt keine IP-Adressen

Weiterführende Informationen: [Ein abgeschirmtes Ökosystem](https://web.archive.org/web/20260903010654/https://electriccoin.co/blog/shielded-ecosystem/)

</div>

## zcashd funktioniert nicht mehr – was soll ich jetzt ausführen?

<div className="rounded-2xl border border-border bg-card p-5 my-4">

zcashd wurde eingestellt. Version 6.20.0 hat sich am 18. Juli 2026 bei Block 3417100 selbst abgeschaltet und unterstützte Ironwood (NU6.3) nie, daher gibt es keine spätere Version, auf die aktualisiert werden kann.

Führen Sie stattdessen den Z3-Stack aus. Drei Programme teilen sich die Aufgabe, die zcashd zuvor allein erledigte:

- **[Zebra](/zcash-tech/zebra-full-node)** validiert die Chain
- **[Zaino](/zcash-tech/zaino)** indexiert sie und stellt Wallet-Daten bereit
- **[Zallet](/zcash-tech/zallet)** verwahrt Ihre Gelder

[Zakura](/zcash-tech/zakura-node) ist ein alternativer vollständiger Knoten. Er führt außerdem zcashd auf sich selbst aus, was hilft, wenn andere Software weiterhin die alte Schnittstelle erwartet.

Beginnen Sie mit dem [Migrationsleitfaden](/guides/migration-guide-zcashd-to-zebrad-zallet).

</div>

## Wie übertrage ich meine zcashd-Wallet zu Zallet?

<div className="rounded-2xl border border-border bg-card p-5 my-4">

Zallet migriert ein bestehendes `wallet.dat`, sodass Sie Ihre Gelder und Adressen behalten.

Erstellen Sie zuerst ein Backup von `wallet.dat` und folgen Sie dann dem [Migrationsleitfaden](/guides/migration-guide-zcashd-to-zebrad-zallet). Bewahren Sie dieses Backup auf, bis Sie Ihr Guthaben in Zallet bestätigt haben.

Die [Zallet-Kurzübersicht](/using-zcash/zallet-quick-reference-guide) behandelt die alltäglichen Befehle nach der Migration.

</div>

## Was ist Ironwood und muss ich etwas tun?

<div className="rounded-2xl border border-border bg-card p-5 my-4">

Ironwood ist das Netzwerk-Upgrade NU6.3, das seit Block 3.428.143 am 28. Juli 2026 im Mainnet aktiv ist. Es fügt einen abgeschirmten Pool hinzu, der auf einem korrigierten Circuit basiert, und versiegelt den älteren [Orchard](/using-zcash/shielded-pools)-Pool, damit jede Person überprüfen kann, dass kein ZEC gefälscht wurde.

**Wenn Sie abgeschirmte Gelder halten, müssen diese möglicherweise verschoben werden.** Werte verlassen Orchard nur durch [die Schleuse](/zcash-tech/the-turnstile), und Wallets führen die Übertragung zu unterschiedlichen Zeitpunkten und auf unterschiedliche Weise durch. Fragen Sie Ihren Wallet-Anbieter, bevor Sie etwas manuell verschieben.

Lesen Sie [Ironwood](/zcash-tech/ironwood), um zu erfahren, was sich geändert hat und warum.

</div>

## Welchen vollständigen Knoten sollte ich ausführen?

<div className="rounded-2xl border border-border bg-card p-5 my-4">

**[Zebra](/zcash-tech/zebra-full-node)** ist der direkte Ersatz für zcashd und der Knoten, von dem der Migrationsleitfaden ausgeht. Wählen Sie ihn, sofern Sie keinen Grund dagegen haben.

**[Zakura](/zcash-tech/zakura-node)** ist eine zweite Implementierung, die auf Skalierung ausgelegt ist, mit schnellerer Synchronisierung und nativem Block-Pruning. Wählen Sie ihn, wenn Sie diese Funktionen benötigen oder von Software abhängig sind, die weiterhin mit zcashd kommuniziert.

Beide validieren dieselbe Chain; dies ist daher eine betriebliche und keine Konsensentscheidung.

</div>

## Wo kann ich einen Begriff aus einer Release-Note nachschlagen?

<div className="rounded-2xl border border-border bg-card p-5 my-4">

Siehe die [Zcash-Bibliothek](/glossary-and-faqs/zcash-library). Sie behandelt die Knoten- und Wallet-Software, die abgeschirmten Pools und die am häufigsten vorkommenden ZIP-Nummern.

</div>

## Einige häufige Missverständnisse

<div className="rounded-2xl border border-border bg-card p-5 my-4 overflow-x-auto">

<table className="w-full border-collapse">
  <thead>
    <tr className="border-b border-border bg-amber-100 dark:bg-zinc-800">
      <th className="py-4 px-5 text-left font-bold text-amber-800 dark:text-white">Missverständnis</th>
      <th className="py-4 px-5 text-left font-bold text-amber-800 dark:text-white">Richtige Antwort</th>
    </tr>
  </thead>
  <tbody>
    <tr className="border-b border-border hover:bg-amber-50 dark:hover:bg-zinc-700">
      <td className="py-4 px-5 font-medium text-foreground">Ist Zcash eine zentralisierte Coin?</td>
      <td className="py-4 px-5 text-foreground">Nein. Eine Markenvereinbarung hindert Zcash Foundation oder ECC daran, gegen den Konsens der Community zu handeln. Die Governance ist nachweislich dezentralisiert (siehe [Messari-Bericht](https://messari.io/report/decentralizing-zcash)). Community-Umfragen, ZecHub und der Zcash Foundation A/V Club ermöglichen alle eine breite Beteiligung.</td>
    </tr>
    <tr className="border-b border-border hover:bg-amber-50 dark:hover:bg-zinc-700">
      <td className="py-4 px-5 font-medium text-foreground">Hat Zcash eine Hintertür?</td>
      <td className="py-4 px-5 text-foreground">Nein. Weder Zcash noch irgendeine kryptografische Software, die wir entwickelt haben, enthält eine Hintertür – und wird dies jemals tun.</td>
    </tr>
    <tr className="border-b border-border hover:bg-amber-50 dark:hover:bg-zinc-700">
      <td className="py-4 px-5 font-medium text-foreground">Wird Zcash von einem Unternehmen kontrolliert?</td>
      <td className="py-4 px-5 text-foreground">Falsch. Während wir für Forschung mit Unternehmen zusammenarbeiten, bleibt Zcash der Dezentralisierung verpflichtet. Mehrere autonome Organisationen arbeiten gemeinsam an Selbstverwahrung und dem Recht auf Privatsphäre.</td>
    </tr>
    <tr className="hover:bg-amber-50 dark:hover:bg-zinc-700">
      <td className="py-4 px-5 font-medium text-foreground">Zcash hat im Vergleich zu anderen Privacy Coins nur eingeschränkte Privatsphäre</td>
      <td className="py-4 px-5 text-foreground">Nein. Privatsphäre im Stil von Monero/Grin beruht auf Täuschungselementen (die überwunden werden können). Zcash verschlüsselt alle Daten abgeschirmter Transaktionen, sodass jede Transaktion im Pool nicht unterscheidbar ist. Siehe [Nicht privat genug?](https://electriccoin.co/blog/not-private-enough-mixers-and-decoys-wont-protect-you-for-long/).</td>
    </tr>
  </tbody>
</table>

</div>

---

**Zuletzt aktualisiert:** Oktober 2026
**Möchten Sie mitwirken?** [Diese Seite auf GitHub bearbeiten](https://github.com/ZecHub/zechub/edit/main/site/Glossary_and_FAQs/FAQ.md)
