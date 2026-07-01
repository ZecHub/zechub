# Häufig gestellte Fragen

Eine Liste der häufigsten Fragen zu Zcash. Zur Fehlerbehebung des Zcash-Clients siehe bitte den [offiziellen Leitfaden zur Fehlerbehebung](https://zcash.readthedocs.io/en/latest/rtd_pages/troubleshooting_guide.html).

### Schnelle Navigation
[Was ist Zcash?](#what-is-zcash) | [Wie kann man Zcash erwerben?](#acquire) | [Unterschied zu anderen Kryptowährungen?](#difference) | [Governance des Protokolls?](#governance) | [Wo ist meine Transaktion?](#transaction) | [Ist Zcash wirklich privat?](#privacy) | [Häufige Missverständnisse](#misconceptions)

---

## Was ist Zcash?

<div className="overflow-x-auto my-8 rounded-3xl border border-border bg-card p-6">
Zcash ist eine digitale Währung mit schnellen, vertraulichen Transaktionen und niedrigen Gebühren. Datenschutz ist das zentrale Merkmal von Zcash. Es war Vorreiter beim Einsatz von Zero-Knowledge-Proofs, um alle Transaktionen zu verschlüsseln.  

Für sofortige, mobile, sichere und private Zahlungen stehen mehrere Wallets zur Verfügung: [Mobile Wallets](https://z.cash/wallets/)
</div>

## Wie kann ich Zcash erwerben?

<div className="overflow-x-auto my-8 rounded-3xl border border-border bg-card p-6">
Du kannst ZEC auf Kryptowährungs-[Börsen](https://z.cash/exchanges) kaufen.  
Du kannst Zcash auch direkt von Person zu Person kaufen oder durch Mining erwerben.
</div>

## Was ist der Unterschied zwischen Zcash und anderen Kryptowährungen?

<div className="overflow-x-auto my-8 rounded-3xl border border-border bg-card p-6">
Zcash ist grundsätzlich privater als Bitcoin oder Ethereum. Es bietet schnelle Blockzeiten (75 Sekunden), niedrige Gebühren und regelmäßige Upgrades.  

Nutzer können zwischen **transparenten** oder **abgeschirmten** Transaktionen wählen. Weitere Informationen findest du unter [Ein abgeschirmtes Ökosystem](https://bitzecbzc.github.io/blog/shielded-ecosystem/index.html).
</div>

## Wie wird das Zcash-Protokoll verwaltet?

<div className="overflow-x-auto my-8 rounded-3xl border border-border bg-card p-6">
Das Protokoll wird durch den Prozess der **Zcash Improvement Proposal (ZIP)** verwaltet. Jede Person kann einen ZIP-Entwurf einreichen. Entwürfe werden von der Community diskutiert und von den ZIP-Editoren angenommen oder abgelehnt:

- [Daira Hopwood](https://twitter.com/feministPLT) (Electric Coin Company)  
- [Deirdre Connolly](https://twitter.com/durumcrustulum) (Zcash Foundation)

Entscheidungen werden in die Spezifikation aufgenommen und on-chain ratifiziert, wenn das Netzwerk sie übernimmt.
</div>

## Wo ist meine Transaktion?

<div className="overflow-x-auto my-8 rounded-3xl border border-border bg-card p-6">
Lies zuerst [unseren Leitfaden zu Block Explorern](https://zechub.notion.site/Zcash-Blockchain-Explorer-4b4d970cb53e474989932c6e1a78b629). Prüfe dann den [Zcash Block Explorer](https://zcashblockexplorer.com).  

Transaktionen verfallen nach ungefähr 25 Minuten (20 Blöcken), und die Mittel werden automatisch zurückgegeben.  

**Häufige Gründe, warum eine Transaktion möglicherweise nicht erscheint:**
- Verbindungsverlust
- Transaktionsgebühr zu niedrig
- Netzwerküberlastung
- Zu viele transparente Inputs (Größe zu groß)

**Tipps für eine erfolgreiche Transaktion:**
- Verwende eine stabile Verbindung
- Bezahle die Standardgebühr (oder eine höhere für Priorität)
- Warte und versuche es später erneut
- Verwende weniger Inputs, um die Transaktion klein zu halten
</div>

## Ist Zcash wirklich privat?

<div className="overflow-x-auto my-8 rounded-3xl border border-border bg-card p-6">
**Ja.** Zcash verschlüsselt Absender-, Betrags- und Empfängerdaten bei abgeschirmten Transaktionen.  

Zcash **nicht**:
- Verschlüsselt keine Multisignatur-Transaktionen (FROST-Integration ausstehend)
- Schützt nicht vor Korrelationen mit transparenten Transaktionen
- Verbirgt keine IP-Adressen

Weiterführende Lektüre: [Ein abgeschirmtes Ökosystem](https://electriccoin.co/blog/shielded-ecosystem)
</div>

## Einige häufige Missverständnisse

<div className="overflow-x-auto my-8 rounded-3xl border border-border bg-card p-6">
  <table className="w-full border-collapse rounded-2xl overflow-hidden">
    <thead>
      <tr className="border-b border-border bg-amber-100 dark:bg-zinc-800">
        <th className="py-6 px-6 text-left font-bold text-amber-800 dark:text-white">Missverständnis</th>
        <th className="py-6 px-6 text-left font-bold text-amber-800 dark:text-white">Richtige Antwort</th>
      </tr>
    </thead>
    <tbody>
      <tr className="border-b border-border hover:bg-amber-50 dark:hover:bg-zinc-700">
        <td className="py-5 px-6 font-medium text-foreground">Ist Zcash eine zentralisierte Coin?</td>
        <td className="py-5 px-6 text-foreground">Nein. Eine Markenvereinbarung verhindert, dass die Zcash Foundation oder ECC gegen den Konsens der Community handeln. Die Governance ist nachweislich dezentralisiert (siehe [Messari-Bericht](https://messari.io/report/decentralizing-zcash)). Community-Umfragen, ZecHub und der A/V Club der Zcash Foundation ermöglichen alle eine breite Beteiligung.</td>
      </tr>
      <tr className="border-b border-border hover:bg-amber-50 dark:hover:bg-zinc-700">
        <td className="py-5 px-6 font-medium text-foreground">Hat Zcash eine Hintertür?</td>
        <td className="py-5 px-6 text-foreground">Nein. Weder Zcash noch irgendeine kryptografische Software, die wir entwickelt haben, enthält eine Hintertür und wird auch niemals eine enthalten.</td>
      </tr>
      <tr className="border-b border-border hover:bg-amber-50 dark:hover:bg-zinc-700">
        <td className="py-5 px-6 font-medium text-foreground">Wird Zcash von einem Unternehmen kontrolliert?</td>
        <td className="py-5 px-6 text-foreground">Falsch. Obwohl wir für Forschung mit Unternehmen zusammenarbeiten, bleibt Zcash der Dezentralisierung verpflichtet. Mehrere autonome Organisationen arbeiten gemeinsam auf Selbstverwahrung und Datenschutzrechte hin.</td>
      </tr>
      <tr className="hover:bg-amber-50 dark:hover:bg-zinc-700">
        <td className="py-5 px-6 font-medium text-foreground">Zcash hat im Vergleich zu anderen Privacy Coins nur begrenzte Privatsphäre</td>
        <td className="py-5 px-6 text-foreground">Nein. Privatsphäre im Stil von Monero/Grin beruht auf Lockvögeln (die überwunden werden können). Zcash verschlüsselt alle Daten abgeschirmter Transaktionen, sodass jede Transaktion im Pool nicht von anderen zu unterscheiden ist. Siehe [Nicht privat genug?](https://electriccoin.co/blog/not-private-enough-mixers-and-decoys-wont-protect-you-for-long/).</td>
      </tr>
    </tbody>
  </table>
</div>

---

**Zuletzt aktualisiert:** März 2026  
**Möchtest du beitragen?** [Diese Seite auf GitHub bearbeiten](https://github.com/ZecHub/zechub/edit/main/site/Glossary_and_FAQs/FAQ.md)
