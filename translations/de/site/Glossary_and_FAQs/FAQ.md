# Häufig gestellte Fragen

Eine Liste der häufigsten Fragen zu Zcash. Informationen zur Fehlerbehebung beim Zcash-Client finden Sie im [offiziellen Leitfaden zur Fehlerbehebung](https://zcash.readthedocs.io/en/latest/rtd_pages/troubleshooting_guide.html).

### Schnelle Navigation

<div className="flex flex-wrap gap-2 my-4">
  <a href="#what-is-zcash" className="inline-flex px-3 py-1.5 rounded-full border border-border bg-card text-sm no-underline hover:bg-accent">Was ist Zcash?</a>
  <a href="#how-can-i-acquire-zcash" className="inline-flex px-3 py-1.5 rounded-full border border-border bg-card text-sm no-underline hover:bg-accent">Wie kann ich Zcash erwerben?</a>
  <a href="#what-is-the-difference-between-zcash-and-other-cryptocurrencies" className="inline-flex px-3 py-1.5 rounded-full border border-border bg-card text-sm no-underline hover:bg-accent">Unterschied zu anderen Kryptowährungen?</a>
  <a href="#how-is-the-zcash-protocol-governed" className="inline-flex px-3 py-1.5 rounded-full border border-border bg-card text-sm no-underline hover:bg-accent">Protokoll-Governance?</a>
  <a href="#where-is-my-transaction" className="inline-flex px-3 py-1.5 rounded-full border border-border bg-card text-sm no-underline hover:bg-accent">Wo ist meine Transaktion?</a>
  <a href="#is-zcash-really-private" className="inline-flex px-3 py-1.5 rounded-full border border-border bg-card text-sm no-underline hover:bg-accent">Ist Zcash wirklich privat?</a>
  <a href="#a-few-common-misconceptions" className="inline-flex px-3 py-1.5 rounded-full border border-border bg-card text-sm no-underline hover:bg-accent">Häufige Missverständnisse</a>
</div>

---

## Was ist Zcash?

<div className="rounded-2xl border border-border bg-card p-5 my-4">

Zcash ist eine digitale Währung mit schnellen, vertraulichen Transaktionen und niedrigen Gebühren. Privatsphäre ist das zentrale Merkmal von Zcash. Es war Vorreiter beim Einsatz von Zero-Knowledge-Proofs zur Verschlüsselung aller Transaktionen.

Für sofortige, mobile, sichere und private Zahlungen stehen mehrere Wallets zur Verfügung: [Wallets](/using-zcash/wallets)

</div>

## Wie kann ich Zcash erwerben?

<div className="rounded-2xl border border-border bg-card p-5 my-4">

Sie können ZEC auf [verwahrenden Börsen](/using-zcash/custodial-exchanges), [DEXs](/dex) oder [zentralisierten Swap-Plattformen](/using-zcash/centralizedswaps) kaufen.

Sie können Zcash auch Peer-to-Peer erwerben oder durch Mining erhalten.

</div>

## Was ist der Unterschied zwischen Zcash und anderen Kryptowährungen?

<div className="rounded-2xl border border-border bg-card p-5 my-4">

Zcash ist grundlegend privater als Bitcoin oder Ethereum. Es bietet schnelle Blockzeiten (75 Sekunden), niedrige Gebühren und regelmäßige Upgrades.

Nutzer können zwischen **transparenten** oder **abgeschirmten** Transaktionen wählen. Weitere Informationen finden Sie unter [Ein abgeschirmtes Ökosystem](https://electriccoin.co/blog/shielded-ecosystem).

</div>

## Wie wird das Zcash-Protokoll verwaltet?

<div className="rounded-2xl border border-border bg-card p-5 my-4">

Das Protokoll wird durch den Prozess der **Zcash Improvement Proposals (ZIP)** verwaltet. Jeder kann einen Entwurf für ein ZIP einreichen. Entwürfe werden von der Community diskutiert und von den ZIP-Editoren angenommen oder abgelehnt:

- [Daira Hopwood](https://twitter.com/feministPLT) (Electric Coin Company)
- [Deirdre Connolly](https://twitter.com/durumcrustulum) (Zcash Foundation)

Entscheidungen werden in die Spezifikation aufgenommen und on-chain ratifiziert, wenn das Netzwerk sie übernimmt.

</div>

## Wo ist meine Transaktion?

<div className="rounded-2xl border border-border bg-card p-5 my-4">

Lesen Sie zunächst [unseren Leitfaden zu Block-Explorern](/guides/blockchain-explorers). Prüfen Sie dann den [Zcash Block Explorer](https://zcashblockexplorer.com).

Transaktionen laufen nach etwa 25 Minuten (20 Blöcken) ab, und die Gelder werden automatisch zurückerstattet.

**Häufige Gründe, warum eine Transaktion möglicherweise nicht angezeigt wird:**

- Verbindungsverlust
- Transaktionsgebühr zu niedrig
- Netzwerküberlastung
- Zu viele transparente Eingaben (Größe zu groß)

**Tipps für eine erfolgreiche Transaktion:**

- Nutzen Sie eine stabile Verbindung
- Zahlen Sie die Standardgebühr (oder für Priorität mehr)
- Warten Sie und versuchen Sie es später erneut
- Verwenden Sie weniger Eingaben, um die Transaktion klein zu halten

</div>

## Ist Zcash wirklich privat?

<div className="rounded-2xl border border-border bg-card p-5 my-4">

**Ja.** Zcash verschlüsselt Absender-, Betrags- und Empfängerdaten bei abgeschirmten Transaktionen.

Zcash verschlüsselt **nicht**:

- Multisignatur-Transaktionen (FROST-Integration ausstehend)
- Korrelationen mit transparenten Transaktionen
- IP-Adressen

Weiterführende Informationen: [Ein abgeschirmtes Ökosystem](https://web.archive.org/web/20260903010654/https://electriccoin.co/blog/shielded-ecosystem/)

</div>

## Einige häufige Missverständnisse

<div className="rounded-2xl border border-border bg-card p-5 my-4 overflow-x-auto">

<table className="w-full border-collapse">
  <thead>
    <tr className="border-b border-border bg-amber-100 dark:bg-zinc-800">
      <th className="py-4 px-5 text-left font-bold text-amber-800 dark:text-white">Missverständnis</th>
      <th className="py-4 px-5 text-left font-bold text-amber-800 dark:text-white">Korrekte Antwort</th>
    </tr>
  </thead>
  <tbody>
    <tr className="border-b border-border hover:bg-amber-50 dark:hover:bg-zinc-700">
      <td className="py-4 px-5 font-medium text-foreground">Ist Zcash eine zentralisierte Coin?</td>
      <td className="py-4 px-5 text-foreground">Nein. Eine Markenvereinbarung hindert die Zcash Foundation oder ECC daran, gegen den Konsens der Community zu handeln. Die Governance ist nachweislich dezentralisiert (siehe [Messari-Bericht](https://messari.io/report/decentralizing-zcash)). Community-Umfragen, ZecHub und der Zcash Foundation A/V Club ermöglichen alle eine breite Beteiligung.</td>
    </tr>
    <tr className="border-b border-border hover:bg-amber-50 dark:hover:bg-zinc-700">
      <td className="py-4 px-5 font-medium text-foreground">Hat Zcash eine Hintertür?</td>
      <td className="py-4 px-5 text-foreground">Nein. Weder Zcash noch irgendeine kryptografische Software, die wir entwickelt haben, enthält eine Hintertür oder wird jemals eine enthalten.</td>
    </tr>
    <tr className="border-b border-border hover:bg-amber-50 dark:hover:bg-zinc-700">
      <td className="py-4 px-5 font-medium text-foreground">Wird Zcash von einem Unternehmen kontrolliert?</td>
      <td className="py-4 px-5 text-foreground">Falsch. Obwohl wir mit Unternehmen bei der Forschung zusammenarbeiten, bleibt Zcash der Dezentralisierung verpflichtet. Mehrere autonome Organisationen arbeiten gemeinsam auf Selbstverwahrung und Datenschutzrechte hin.</td>
    </tr>
    <tr className="hover:bg-amber-50 dark:hover:bg-zinc-700">
      <td className="py-4 px-5 font-medium text-foreground">Zcash hat im Vergleich zu anderen Privacy Coins eingeschränkte Privatsphäre</td>
      <td className="py-4 px-5 text-foreground">Nein. Privatsphäre im Stil von Monero/Grin beruht auf Ködern (die überwunden werden können). Zcash verschlüsselt alle Daten abgeschirmter Transaktionen, sodass jede Transaktion im Pool nicht von den anderen unterscheidbar ist. Siehe [Nicht privat genug?](https://electriccoin.co/blog/not-private-enough-mixers-and-decoys-wont-protect-you-for-long/).</td>
    </tr>
  </tbody>
</table>

</div>

---

**Zuletzt aktualisiert:** März 2026
**Möchten Sie beitragen?** [Diese Seite auf GitHub bearbeiten](https://github.com/ZecHub/zechub/edit/main/site/Glossary_and_FAQs/FAQ.md)
