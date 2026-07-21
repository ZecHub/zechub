<a href="https://github.com/Zechub/zechub/edit/main/site/Zcash_Community/Zcash_Ecosystem_Security.md" target="_blank">
  <img src="https://img.shields.io/badge/Edit-blue" alt="Edit Page"/>
</a>

# Zcashエコシステムのセキュリティ

## エコシステムセキュリティリーダー

ZCG助成金を通じて設立された「Zcashエコシステムセキュリティリーダー」の役割は、ECC（Electric Coin Company）およびZF（Zcash Foundation）以外に、特にZCG助成金受給者を含む広範なZcashエコシステムに対して専門的なセキュリティエンジニアリングを提供することです。

- **2022–2023:** [earthrise](https://forum.zcashcommunity.com/t/zcash-ecosystem-security-lead/42090) が最初のエコシステムセキュリティリーダーを務めました。詳しくは [zecsec.com](https://zecsec.com) をご覧ください。
- **2024–2025:** ZCGは、新しい[RFP](https://forum.zcashcommunity.com/t/rfp-zcash-ecosystem-security-lead-2023/45723)を通じて[Least Authority](https://leastauthority.com)をエコシステムセキュリティリーダーとして選定しました。最新情報は [here](https://forum.zcashcommunity.com/t/grant-update-zcash-ecosystem-security-lead/47541) で確認できます。
- **2026:** Shielded Labsは、[Taylor Hornby](https://forum.zcashcommunity.com/t/shielded-labs-engages-taylor-hornby-as-security-consultant/55421)をセキュリティコンサルタントとして採用し、Zcashのセキュリティ能力を強化しました。

## ZCGセキュリティおよび脆弱性開示イニシアチブ

[ZCGセキュリティおよび脆弱性開示イニシアチブ](https://forum.zcashcommunity.com/t/zcg-security-vulnerability-disclosure-initiative/55545)は、Zcashエコシステム全体にわたるセキュリティ脆弱性の調整された開示を可能にする枠組みを提供します。

## 最新のセキュリティアップデート（2026年）

- **Zebra 4.4.1 (2026年5月):** [重大なセキュリティ修正](https://forum.zcashcommunity.com/t/zebra-4-4-1-critical-security-fix/55588)が公開されました。すべてのノード運用者はすぐにアップグレードすることを強くお勧めします。
- **Zebra 4.3.1 (2026年4月):** [重大なセキュリティ修正、Docker化されたマイニングおよびCI強化](https://forum.zcashcommunity.com/t/zebra-4-3-1-critical-security-fixes-dockerized-mining-and-ci-hardening/55389)が公開されました。
- **複数の脆弱性の修正（2026年4月）:** [いくつかのZcashの脆弱性が成功裏に修正](https://forum.zcashcommunity.com/t/several-zcash-vulnerabilities-successfully-remediated/55388)され、ユーザー資金やプライバシーには影響を与えませんでした。
- **zcashdに関するアドバイザリ（2026年4月）:** [zcashdの攻撃面を縮小するためのアドバイザリ](https://forum.zcashcommunity.com/t/advisory-reduce-your-zcashd-attack-surface-by-shielding-it-behind-zebra/55390)が公開され、Zebra経由でトラフィックをルーティングすることを推奨しています。

## 責任ある開示

Electric Coin CompanyおよびZcash Foundationは、以下の逸脱点を除いてこの責任ある開示[基準](https://github.com/RD-Crypto-Spec/Responsible-Disclosure/tree/d47a5a3dafa5942c8849a93441745fdd186731e6)に従っています。

> "Zcashは、強力なプライバシーを提供する技術です。ノートはその目的地に暗号化され、ゼロ知識証明によって通貨のベースが保持されます。この証明は、実際のZcash保有者だけが作成できるように設計されています。これが失敗し、偽造バグが発生した場合、そのバグはブロックチェーン分析者が犯人やどのデータがバグを悪用するために使用されたかを特定する方法がない状態で悪用される可能性があります。そのため、この点以前のロールバック（他のプロジェクトではこのようなケースで実施されたことがあります）は不可能です。基準では、問題の再現に必要な詳細情報を含めて脆弱性の報告者に指示しています。これは、例えば外部研究者が実際にセキュリティ上の問題があることを示し、その影響が本当に報告されているものであることを証明する場合などに必要です。開発チームは、その問題を正確に優先順位付け、解決するためにこの情報を必要とします。しかし、偽造バグのケースでは、CVE-2019-7167のように、調整された公開前にパートナーへの報告でそれらの詳細情報を含めないことを決定する可能性があります。ただし、彼らが実際に脆弱であることを確信している限りです。"

## セキュリティリソース

- [Zcashセキュリティアドバイザリー](https://github.com/zcash/zcash/security/advisories)
- [Zebraセキュリティアドバイザリー](https://github.com/ZcashFoundation/zebra/security/advisories)
- [ECCへの脆弱性の報告](https://electriccoin.co/blog/disclosure-of-a-major-bug-in-cryptonote-based-currencies/)
- [ZFへの脆弱性の報告](https://zfnd.org/contact/)
