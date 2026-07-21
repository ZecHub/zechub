<a href="https://github.com/Zechub/zechub/edit/main/site/Zcash_Community/Zcash_Ecosystem_Security.md" target="_blank">
  <img src="https://img.shields.io/badge/Edit-blue" alt="Seite bearbeiten"/>
</a>

# Sicherheit des Zcash-Ökosystems

## Leitung der Ökosystem-Sicherheit

Die Rolle der Leitung der Zcash-Ökosystem-Sicherheit wurde durch einen ZCG-Zuschuss eingerichtet, um dediziertes Security Engineering für das breitere Zcash-Ökosystem bereitzustellen — insbesondere für ZCG-Zuschussempfänger — außerhalb von ECC und ZF.

- **2022–2023:** [earthrise](https://forum.zcashcommunity.com/t/zcash-ecosystem-security-lead/42090) war die erste Leitung der Ökosystem-Sicherheit. Mehr dazu unter [zecsec.com](https://zecsec.com).
- **2024–2025:** ZCG wählte [Least Authority](https://leastauthority.com) aus, um die Rolle über eine neue [RFP](https://forum.zcashcommunity.com/t/rfp-zcash-ecosystem-security-lead-2023/45723) fortzuführen. Aktuelle Informationen finden sich [hier](https://forum.zcashcommunity.com/t/grant-update-zcash-ecosystem-security-lead/47541).
- **2026:** Shielded Labs [beauftragte Taylor Hornby](https://forum.zcashcommunity.com/t/shielded-labs-engages-taylor-hornby-as-security-consultant/55421) als Sicherheitsberater, um die Sicherheitsfähigkeiten von Zcash zu stärken.

## ZCG-Initiative für Sicherheits- und Schwachstellenoffenlegung

Die [ZCG-Initiative für Sicherheits- und Schwachstellenoffenlegung](https://forum.zcashcommunity.com/t/zcg-security-vulnerability-disclosure-initiative/55545) bietet einen Rahmen für die koordinierte Offenlegung von Sicherheitslücken im gesamten Zcash-Ökosystem.

## Aktuelle Sicherheitsupdates (2026)

- **Zebra 4.4.1 (Mai 2026):** [Kritischer Sicherheitsfix](https://forum.zcashcommunity.com/t/zebra-4-4-1-critical-security-fix/55588) veröffentlicht. Allen Node-Betreibern wird empfohlen, sofort zu aktualisieren.
- **Zebra 4.3.1 (April 2026):** [Kritische Sicherheitsfixes, Docker-basiertes Mining und CI-Härtung](https://forum.zcashcommunity.com/t/zebra-4-3-1-critical-security-fixes-dockerized-mining-and-ci-hardening/55389) veröffentlicht.
- **Mehrere Schwachstellen behoben (April 2026):** [Mehrere Zcash-Schwachstellen erfolgreich gepatcht](https://forum.zcashcommunity.com/t/several-zcash-vulnerabilities-successfully-remediated/55388), ohne Auswirkungen auf Nutzergelder oder Privatsphäre.
- **zcashd-Hinweis (April 2026):** [Hinweis zur Verringerung der zcashd-Angriffsfläche](https://forum.zcashcommunity.com/t/advisory-reduce-your-zcashd-attack-surface-by-shielding-it-behind-zebra/55390) durch das Leiten des Datenverkehrs über Zebra.

## Verantwortungsvolle Offenlegung

Die Electric Coin Company und Zcash Foundation entsprechen beide diesem Standard für verantwortungsvolle Offenlegung [standard](https://github.com/RD-Crypto-Spec/Responsible-Disclosure/tree/d47a5a3dafa5942c8849a93441745fdd186731e6) mit der folgenden Abweichung:

> "Zcash ist eine Technologie, die starke Privatsphäre bietet. Notes werden zu ihrem Ziel verschlüsselt, und die Geldbasis wird dann durch Zero-Knowledge-Beweise gesichert, die nur vom tatsächlichen Inhaber von Zcash erzeugt werden können. Falls dies fehlschlägt und ein Fälschungsfehler entsteht, könnte dieser Fälschungsfehler ausgenutzt werden, ohne dass Blockchain-Analysten den Täter oder die Daten in der Blockchain identifizieren können, die zur Ausnutzung des Fehlers verwendet wurden. Rollbacks vor diesem Punkt, wie sie in einigen anderen Projekten in solchen Fällen durchgeführt wurden, sind daher unmöglich. Der Standard beschreibt, dass Meldende von Schwachstellen vollständige Details eines Problems angeben, um es reproduzieren zu können. Dies ist zum Beispiel notwendig, wenn ein externer Forscher sowohl nachweist als auch belegt, dass tatsächlich ein Sicherheitsproblem besteht und dass dieses Sicherheitsproblem tatsächlich die von ihm behaupteten Auswirkungen hat — wodurch das Entwicklungsteam das Problem präzise priorisieren und beheben kann. Im Fall eines Fälschungsfehlers könnten wir jedoch, genau wie bei CVE-2019-7167, entscheiden, diese Details in unseren Berichten an Partner vor der koordinierten Veröffentlichung nicht aufzunehmen, solange wir sicher sind, dass sie betroffen sind."

## Sicherheitsressourcen

- [Sicherheitshinweise für Zcash](https://github.com/zcash/zcash/security/advisories)
- [Sicherheitshinweise für Zebra](https://github.com/ZcashFoundation/zebra/security/advisories)
- [Eine Schwachstelle an ECC melden](https://electriccoin.co/blog/disclosure-of-a-major-bug-in-cryptonote-based-currencies/)
- [Eine Schwachstelle an ZF melden](https://zfnd.org/contact/)
