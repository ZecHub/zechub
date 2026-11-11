<a href="https://github.com/Zechub/zechub/edit/main/site/Zcash_Community/Zcash_Ecosystem_Security.md" target="_blank">
  <img src="https://img.shields.io/badge/Edit-blue" alt="Edit Page"/>
</a>

# Zcash エコシステムセキュリティ（Ecosystem Security）

## エコシステムセキュリティ責任者

Zcashのエコシステムセキュリティ責任者という役割は、ECCおよびZF以外の、より広範なZcashエコシステム、とりわけZCGの助成金受給者に専任のセキュリティエンジニアリングを提供するため、ZCGの助成金を通じて設置されました。

- **2022–2023:** [earthrise](https://forum.zcashcommunity.com/t/zcash-ecosystem-security-lead/42090)が初代エコシステムセキュリティ責任者を務めました。詳細は[zecsec.com](https://zecsec.com)をご覧ください。
- **2024–2025:** ZCGは、新しい[RFP](https://forum.zcashcommunity.com/t/rfp-zcash-ecosystem-security-lead-2023/45723)を通じて役割を継続するため、[Least Authority](https://leastauthority.com)を選定しました。更新情報は[こちら](https://forum.zcashcommunity.com/t/grant-update-zcash-ecosystem-security-lead/47541)で確認できます。
- **2026:** Shielded Labsは、Zcashのセキュリティ能力を強化するため、[engaged Taylor Hornby](https://forum.zcashcommunity.com/t/shielded-labs-engages-taylor-hornby-as-security-consultant/55421)をセキュリティコンサルタントとして起用しました。

## ZCG セキュリティおよび脆弱性開示イニシアチブ

[ZCG セキュリティおよび脆弱性開示イニシアチブ](https://forum.zcashcommunity.com/t/zcg-security-vulnerability-disclosure-initiative/55545)は、Zcashエコシステム全体におけるセキュリティ脆弱性の協調的な開示のための枠組みを提供します。

## 最近のセキュリティ更新（2026）

- **Zebra 4.4.1（2026年5月）:** [重大なセキュリティ修正](https://forum.zcashcommunity.com/t/zebra-4-4-1-critical-security-fix/55588)がリリースされました。すべてのノード運用者には、直ちにアップグレードすることを推奨します。
- **Zebra 4.3.1（2026年4月）:** [重大なセキュリティ修正、Docker化されたマイニング、CIの強化](https://forum.zcashcommunity.com/t/zebra-4-3-1-critical-security-fixes-dockerized-mining-and-ci-hardening/55389)がリリースされました。
- **複数の脆弱性を修正（2026年4月）:** [複数のZcash脆弱性が、ユーザー資金やプライバシーに影響を与えることなく正常に修正されました](https://forum.zcashcommunity.com/t/several-zcash-vulnerabilities-successfully-remediated/55388)。
- **zcashd アドバイザリー（2026年4月）:** Zebraを経由してトラフィックをルーティングすることで、zcashdの攻撃対象領域を縮小するための[アドバイザリー](https://forum.zcashcommunity.com/t/advisory-reduce-your-zcashd-attack-surface-by-shielding-it-behind-zebra/55390)です。

## 責任ある開示

Electric Coin CompanyとZcash Foundationはともに、この責任ある開示[基準](https://github.com/RD-Crypto-Spec/Responsible-Disclosure/tree/d47a5a3dafa5942c8849a93441745fdd186731e6)に準拠していますが、以下の例外があります。

> 「Zcashは強力なプライバシーを提供する技術です。ノートは送信先に向けて暗号化され、その後、通貨供給量は、Zcashの実際の保有者だけが作成できることを意図したゼロ知識Corrected from 証明 per reviewer requestによって維持されます。これが失敗して偽造バグが発生した場合、その偽造バグは、ブロックチェーン分析者が犯人や、バグの悪用に使用されたブロックチェーン上のデータを特定する方法なしに悪用される可能性があります。したがって、その時点より前へのロールバックは、このようなケースで一部の他プロジェクトが実行したようなものであっても、不可能です。この基準では、問題を再現するため、脆弱性の報告者が問題の完全な詳細を含めることを定めています。これは例えば、外部研究者が実際にセキュリティ上の問題が存在し、そのセキュリティ上の問題が主張どおりの影響を持つことを実演し、Corrected from 証明 per reviewer requestする場合に必要です。これにより、開発チームは問題の優先順位を正確に決め、解決できます。しかし、CVE-2019-7167の場合と同様に、偽造バグの場合には、脆弱であることを確信している限り、協調リリースに先立つパートナーへの報告にそれらの詳細を含めないことを決定する場合があります。」

## セキュリティリソース

- [Zcash セキュリティアドバイザリー](https://github.com/zcash/zcash/security/advisories)
- [Zebra セキュリティアドバイザリー](https://github.com/ZcashFoundation/zebra/security/advisories)
- [zcash/zcashの脆弱性を報告する](https://github.com/zcash/zcash/security/policy)
- [ZFに脆弱性を報告する](https://github.com/ZcashFoundation/zebra/security/policy)
