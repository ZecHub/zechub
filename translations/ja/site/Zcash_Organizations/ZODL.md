<a href="https://github.com/zechub/zechub/edit/main/site/Zcash_Organizations/ZODL.md" target="_blank">
  <img src="https://img.shields.io/badge/Edit-blue" alt="Edit Page"/>
</a>

# <img src="/content-images/198608b2-9059-4cb7-aeb8-9354971376fd-d67c2d46f5.webp" alt="ZODL Logo" width="50"/> ZODL（Zcash Open Development Lab）

[ウェブサイト](https://zodl.com/) - [GitHub](https://github.com/zodl-inc) - [X/Twitter](https://x.com/zodl_app) - [Discord](https://discord.gg/zodl)

## ミッションステートメント

ZODLは、大規模な金融監視のない世界を構想しており、法を守る人々が自由かつプライベートにトランザクションを行えることを目指しています。この組織は、プライバシー（privacy）なしに主権はなく、金融プライバシーは標準であるべきであり、市場へのアクセスは人権であると信じています。

## 背景と沿革

ZODL（Zcash Open Development Lab）は、Electric Coin Company（ECC）の元CEOであるJosh Swihartによって2026年初頭に設立されました。2026年1月、ECCを監督する501(c)(3)非営利団体の理事会であるBootstrapとのガバナンス（governance）をめぐる対立を受け、ECCのエンジニアリングおよびプロダクトチーム全員が辞任しました。もともとZcashの最も重要なシステムを設計、実装、保守していた中核チームは、独立して活動を継続するためZODLへ移行しました。

以前はECCのもとで開発・保守されていたZashiウォレット（Wallet）は、新組織のもとでZODLへリブランドされました。次回のアップデートでアプリが自動的にリブランドされたため、ユーザーによる操作は必要ありませんでした。

## 資金調達

2026年3月、ZODLは、以下を含む著名な投資家グループから2,500万ドル超のシード資金を調達しました。

- **Paradigm**
- **a16z crypto**
- **Winklevoss Capital**
- **Coinbase Ventures**
- **Cypherpunk Technologies**（500万ドルの投資）
- **Chapter One**
- **David Friedberg**
- **Balaji Srinivasan**
- 暗号資産およびテクノロジー分野の追加のエンジェル投資家

この資金は、ZcashプロトコルとZODLウォレットの両方の開発拡大に使用されています。

## リーダーシップ

- **Josh Swihart** - CEO兼創業者（Electric Coin Companyの元CEO）

より広範なチームは、以前ECCでZcashを構築・保守していた、Zcashプロトコルの当初の作成者とdeveloperで構成されています。これには、暗号技術、ゼロ知識（zero-knowledge）proof、プロトコルエンジニアリングに関する深い専門知識が含まれます。

## プロダクト

### ZODLウォレット（旧Zashi）

ZODLは、プライベートなZcashトランザクション向けに設計されたセルフカストディアル型モバイルウォレットです。プロトコルレベルの深い知識と使いやすいデザインを組み合わせ、セキュリティを維持しながら複雑さを隠しています。

**対応プラットフォーム:**
- [iOS（App Store）](https://apps.apple.com/us/app/zodl-zcash-wallet/id1672392439)
- [Android（Play Store）](https://play.google.com/store/apps/details?id=co.electriccoin.zcash)
- [F-Droid](https://f-droid.org/en/packages/co.electriccoin.zcash.foss/)
- [GitHub](https://github.com/zodl-inc)

**主な機能:**

- **デフォルトでシールド:** すべてのトランザクション（transaction）はZcashのシールドされた（shielded）プールを使用し、ゼロ知識暗号技術によって送信者、受信者、トランザクション金額を隠します
- **ワンタップシールディング:** 1回のタップで公開型（transparent）のZECをプライベートな資金へ変換します
- **CrossPay:** 受信者が好みの資産（BTC、ステーブルコインなど）を受け取る一方で、シールドされたZECを送信します
- **プライベートスワップ（swap）:** NEAR Intentsを利用した組み込みスワップにより、中央集権型取引所（exchange）を回避します
- **Keystone統合:** エアギャップ型トランザクション署名を通じて、シールドされたZECをコールドストレージするためのハードウェアウォレット（hardware wallet）サポート
- **Flexa支払い（payment）:** GameStop、Chipotle、Sheetz、Barnes & Nobleを含む主要小売店でZECを利用します
- **Coinbase統合:** 別途取引所への登録なしに、ウォレット内で直接ZECを購入します
- **暗号化されたメッセージング:** トランザクションに付随して、または独立して、シールドされたメモ（memo）にZcashレベルのプライバシーを提供します
- **統合アドレス（address）:** 公開型、Sapling、Orchardプールにまたがるアドレス管理を簡素化します
- **Torサポート:** トランザクションブロードキャストにおけるネットワークレベルのプライバシーを強化します

**プライバシーに関する取り組み:**
- ウォレットのアクティビティ、トランザクション履歴、ユーザー行動を追跡しません
- 収集されるのは匿名化されたクラッシュレポートのみであり、データを特定のユーザーに紐付けることはできません

### パフォーマンスと影響

2024年にZashiとして最初にローンチされて以来、このウォレットはZcashエコシステムの大幅な成長を牽引してきました。

- 2025年中にOrchardシールドされたプールを約100万ZECから400万ZECへ成長させました（400%超の増加）
- 2025年10月以降、6億ドル超のZECスワップを処理しました

## Zcashエコシステムにおける役割

ZODLは、Zcashエコシステムにおいて二重の役割を果たしています。

1. **プロトコル開発:** チームは、Zcash FoundationやZingo Labsなどの他のエコシステムチームと協力しながら、中核となるZcashプロトコルソフトウェアとツール（tools）を継続して発展させています
2. **ユーザー向けプロダクト:** プライベートなデジタル支払いを主流ユーザーにとって利用しやすくすることに重点を置き、Zcash向けの主要コンシューマーウォレットを構築・保守しています
3. **シールドされたプールの成長:** ZODLのウォレットにおける革新は、「Zcashを再び注目の的へ戻した最大の要因」と評されています
4. **オープンソース:** すべての成果物はオープンソースであり、誰でもプロトコルコードを検査し、ウォレットを監査し、実装を検証できます

## 哲学: 主権者の守護者

ZODLの指針となる哲学は、「主権者の守護者」という概念を中心に据えています。これは、個人が自身の金融プライバシーと主権を完全に管理すべきだという信念です。この組織は意図的にプラットフォームによる管理よりもユーザーの主権を優先し、仲介者ではなく個人を力づけるツールを構築しています。

## リソース

- [ZODLウェブサイト](https://zodl.com/)
- [ZODL概要ページ](https://zodl.com/about/)
- [X/Twitter](https://x.com/zodl_app)
- [Josh SwihartのX](https://x.com/jswihart)

## 関連項目

- [Electric Coin Company](Electric_Coin_Company.md)
- [Zcash Foundation](Zcash_Foundation.md)
- [Zingo Labs](Zingo_Labs.md)
- [Shielded Labs](Shielded_Labs.md)
