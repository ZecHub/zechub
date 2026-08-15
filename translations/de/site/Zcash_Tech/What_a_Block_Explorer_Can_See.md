---
<a href="https://github.com/zechub/zechub/edit/main/site/Zcash_Tech/What_a_Block_Explorer_Can_See.md" target="_blank">
  <img src="https://img.shields.io/badge/Edit-blue" alt="Edit Page"/>
</a>

# Was ein Block-Explorer bei Zcash sehen kann

## Kurzfassung

- Bei Bitcoin zeigt ein Block-Explorer alles: Sender, Empfänger und Betrag.
- Bei Zcash gilt das nur für transparente (t-address) Aktivität.
- Ein Explorer kann sehen, wie Geld in den Shielded Pool hinein- und wieder herausfließt, aber nicht, was darin passiert.
- Vollständig abgeschirmte (z zu z) Transaktionen verraten weder Sender noch Empfänger noch Betrag.
- Jede öffentliche „Shield Rate“-Kennzahl ist nur eine Untergrenze, weil vollständig private Aktivität von außen unsichtbar ist.

---

## Zwei Adresstypen

Zcash hat zwei Arten von Adressen.

Eine **transparente Adresse** beginnt mit `t` und funktioniert wie eine Bitcoin-Adresse. Guthaben und Zahlungen sind öffentlich.

Eine **shielded Adresse** beginnt mit `z` und ist durch Zero-Knowledge-Proofs geschützt. Das Netzwerk kann bestätigen, dass eine shielded Zahlung gültig ist, ohne den Sender, den Empfänger oder den Betrag offenzulegen.

Weil es zwei Typen gibt, kann sich Wert auf vier Arten bewegen: transparent zu transparent (t zu t), transparent zu shielded (t zu z, genannt Shielding), shielded zu transparent (z zu t, genannt Deshielding) und shielded zu shielded (z zu z, vollständig privat).

## Was ein Explorer sehen kann

Ein öffentlicher Explorer wie [Blockchair](https://blockchair.com/zcash) kann Folgendes klar erkennen:

- Jede vollständig transparente (t zu t) Zahlung, von Anfang bis Ende.
- Geld, das in den Shielded Pool eingeht (die transparente Seite und den Betrag).
- Geld, das den Shielded Pool verlässt (die transparente Seite und den Betrag).
- Die gesamte Menge an ZEC, die in jedem Shielded Pool gehalten wird, was öffentlich ist, damit das Netzwerk beweisen kann, dass keine Coins aus dem Nichts erschaffen wurden.

Kurz gesagt: Die Ränder des Shielded Pool sind sichtbar. Man kann beobachten, wie Wert hinein- und hinausfließt.

## Was ein Explorer nicht sehen kann

Ein öffentlicher Explorer kann Folgendes nicht lesen:

- Vollständig shielded (z zu z) Transaktionen. Sender, Empfänger und Betrag bleiben verborgen.
- Den Sender oder Empfänger hinter einer shielded Zahlung.
- Das Guthaben einer einzelnen shielded Adresse.
- Was mit Geldern geschieht, sobald sie sich im Pool befinden.

Wenn man die Rohdaten abfragt, bleiben die Felder für shielded Sender und Empfänger leer. Der Explorer verbirgt das nicht absichtlich. Diese Informationen lagen nie in lesbarer Form auf der öffentlichen Chain. Die Informationen sind verschlüsselt, und nur jemand mit dem richtigen Viewing Key kann sie lesen.

## Warum das wichtig ist

**Deine Privatsphäre kommt von der Kryptographie, nicht vom Vertrauen in ein Unternehmen.** Ein Datenanbieter kann nicht in eine shielded Transaktion hineinschauen, selbst wenn er es wollte.

**Öffentliche Shield-Rate-Zahlen unterschätzen die Privatsphäre.** Forschende können nur messen, was die öffentliche Grenze überschreitet. Daher ist das tatsächliche Ausmaß privater Aktivität mindestens so hoch wie berichtet und meist höher.

**Ein größerer Shielded Pool schützt alle.** Je mehr Menschen shielded Adressen verwenden, desto größer ist die Menge, in der sich jede einzelne private Zahlung verbirgt. Die Nutzung einer shielded Adresse hilft, dich selbst und alle anderen im Pool zu schützen.

## So setzt du es in die Praxis um

- Nutze eine Wallet, die standardmäßig shielded Adressen verwendet, wie [ZODL](https://zodl.com) oder [Ywallet](https://ywallet.app/).
- Wenn du ZEC an einer transparenten Adresse empfängst, verschiebe es in eine shielded Adresse, bevor du es ausgibst.
- Zahle, wo immer möglich, an shielded Adressen. Jede transparente Zahlung ist vollständig öffentlich; eine shielded Zahlung ist es nicht.

## Ressourcen

- [Zcash: Empfehlungen zu Privatsphäre und Sicherheit](https://z.cash/support/security/privacy-security-recommendations/)
- [Ein shielded Ökosystem (Electric Coin Company)](https://electriccoin.co/blog/shielded-ecosystem/)
- [Wie die Zcash-Technologie funktioniert](https://z.cash/technology/)
- [Blockchair Zcash-Explorer](https://blockchair.com/zcash)

## Verwandte Seiten

- [Zcash-Grundlagen](/start-here/what-is-zec-and-zcash)
- [Wallets](/using-zcash/wallets)
- [Shielded Pools](/using-zcash/shielded-pools)
- [ZK-SNARKs](/zcash-tech/zk-snarks)

---

*Wenn du diese Wiki-Seite ergänzen oder Änderungen vorschlagen möchtest, besuche bitte das [ZecHub GitHub-Repository](https://github.com/ZecHub/zechub) und reiche einen Pull Request ein.*
