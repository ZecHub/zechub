<a href="https://github.com/zechub/zechub/edit/main/site/Zcash_Tech/Zcash_Shielded_Assets.md" target="_blank">
  <img src="https://img.shields.io/badge/Edit-blue" alt="編集ページ"/>
</a>
<a href="">
    <img src="/content-images/image-2023-11-18-160742427-658dda69c0.webp" alt="" width="800" height="500"/>
</a>

# Zcash Shielded Assets

## 要点

Zcash Shielded Assets (ZSA) は、**ZEC 以外**の資産、つまりステーブルコイン、ガバナンストークン、または任意のカスタム資産を Zcash のシールドプール内で扱えるようにするための、提案中のプロトコル拡張です。送信者、受信者、金額は秘匿されたままになります。

- **これは何か:** ERC-20 風のカスタム資産だが、デフォルトでシールドされるもの。
- **誰が開発しているか:** [QEDIT](https://qed-it.com/)。Zcash Foundation の助成を受け、Electric Coin Company と協力して開発。
- **どのように仕様化されているか:** [ZIP 226](https://zips.z.cash/zip-0226)（送付とバーン）と [ZIP 227](https://zips.z.cash/zip-0227)（発行）。
- **ステータス:** まだメインネットでは稼働していません。ZSA プロトコルは Network Upgrade 7 (NU7) でデプロイ予定です。
- **手数料:** 移動する資産に関係なく、常に ZEC で支払われます。

---

## 中核となる説明

Zcash Shielded Assets (ZSA) は、Zcash プロトコルに対する提案中の改良であり、Zcash チェーン上でカスタム資産の作成、送付、バーンを可能にするものです。

Ethereum ブロックチェーン上の [ERC-20](https://ethereum.org/en/developers/docs/standards/tokens/erc-20/) トークン標準に馴染みがあるなら、Zcash における ZSA は、Ethereum における ERC-20 トークンに相当します。

Zcash Shielded Assets は、Zcash ブロックチェーン上でカスタムトークンの作成を可能にし、[ZEC](/guides/using-zec-privately) 以外のトークンにも、Zcash ブロックチェーン上のシールドトランザクションの匿名性とプライバシーの恩恵をもたらします。

ZSA の大きな潜在的用途のひとつは、Zcash プロトコル上でステーブルコインを発行することです。ステーブルコインは、米ドルやユーロなどの法定通貨に価値を連動させる暗号資産です。現在、最も広く流通しているステーブルコインの一部は、[USDC](https://www.circle.com/en/usdc) や [Dai](https://docs.makerdao.com/) のような ERC-20 トークンです。

ZSA のもうひとつの潜在的用途は、ガバナンストークンの発行です。たとえば、この wiki の発行元である Zechub は分散型自律組織 (DAO) であり、提案やガバナンス上の意思決定に対する投票のために、メンバーへ ZSA を作成・発行できます。

ZSA は [QEDIT](https://qed-it.com/) によって、[Zcash Foundation](/zcash-organizations/zcash-foundation) からの大規模助成のもと、[Electric Coin Company](/zcash-organizations/electric-coin-company) と協力して開発されています。このプロジェクトは現在も活発に開発が進められているため、更新情報は Zcash フォーラムの [このスレッド](https://forum.zcashcommunity.com/t/grant-update-zcash-shielded-assets-monthly-updates/41153) に投稿されています。QEDIT による [ZSA 助成申請](https://zcashgrants.org/gallery/25215916-53ea-4041-a3b2-6d00c487917d/33106640/) は、Zcash Foundation の助成ウェブサイトで閲覧できます。

---

## 視覚的な説明 / たとえ話

### 封印された封筒

Zcash のシールドトランザクションを、公共の郵便受けに投函された、無地で封印された封筒だと想像してください。誰でも封筒が投函されたことはわかります。しかし、誰が送ったのか、誰が受け取るのか、中に何が入っているのかは誰にもわかりません。そして、どの封筒も他のすべての封筒とまったく同じに見えます。

今日の Zcash ネットワーク上では、封筒に入れられるものはひとつだけです。それは ZEC です。

ZSA は封筒そのものを変えるわけではありません。変えるのは、**その中に何を入れてよいか**です。ZSA の導入後は、同じ封印された封筒の中に、ステーブルコイン、DAO のガバナンストークン、あるいは企業のロイヤルティポイントを入れられるようになります。それでも外から見れば、ネットワーク上の他のどの封筒ともまったく同じに見えます。

ひとつ覚えておくべき細部があります。**郵送料は常に ZEC で支払われる**という点です。封筒の中身が何であっても変わりません。

### 外部の観察者に見えるもの

| 観察者に見えるもの... | Ethereum 上の ERC-20 | Zcash 上の ZSA |
| --- | --- | --- |
| 誰が送ったか | 公開 | シールド |
| 誰が受け取ったか | 公開 | シールド |
| どれだけ移動したか | 公開 | シールド |
| 個別の残高 | 公開 | シールド |
| 資産の総供給量 | 公開 | **公開 — 意図的に** |
| 手数料が支払われる通貨 | ETH | ZEC |

### なぜ供給量の行はバグではないのか

表の下の 2 行こそ、ZSA が興味深くなる部分です。

ZIP 227 は **発行を透明に保つ**よう意図的に設計されており、そのため各資産の流通供給量をオンチェーンで追跡できます。個々の保有量や個々の支払いは非公開のままですが、存在するトークン総数は非公開ではありません。

ステーブルコイン発行者にとって、その組み合わせは妥協ではなく本質です。準備資産は公開検証可能な供給量と照合して監査できる一方で、実際にトークンを使う人々は、自分の残高や支払いを他人に知られずに済みます。

### 1 つの資産、1 つのアイデンティティ

各資産には固有の **Asset Identifier** が与えられます。これは発行者の issuance key と、その資産のテキスト記述から導出されます。異なる 2 つの発行者が同じ識別子を生成することはできず、資産の発行や変更には、その発行者からの暗号学的認可が必要です。封筒のたとえで言えば、誰でも封筒を投函できますが、ある資産を追加発行できるのは、その資産を所有する造幣所だけです。

---

## 詳細解説

### Zebra 上での ZSA デモ

[![動画サムネイル](/content-images/hqdefault-3ae84de424.webp)](https://youtu.be/1MZMGC9ViyA)

**ぜひ自分でデモを動かしてみてください！**

zcash-tx-tool リポジトリをクローンします: <https://github.com/QED-it/zcash_tx_tool>

### Zcash Improvement Proposals (ZIPs)

- [ZIP 226](https://zips.z.cash/zip-0226): Zcash Shielded Assets の送付とバーン
- [ZIP 227](https://zips.z.cash/zip-0227): Zcash Shielded Assets の発行
- [ZIP 230](https://zips.z.cash/zip-0230): バージョン 6 トランザクション形式

> **ZIP 230 についての注記:** その後 ZIP 230 は撤回され、デプロイされることはありません。トランザクションのバージョン 6 は現在 [ZIP 229](https://zips.z.cash/zip-0229) で定義されています。[ZIP 230](https://zips.z.cash/zip-0230) ページ上部の告知を参照してください。

ZIP 226 は OrchardZSA プロトコルを定義しています。これは Orchard プロトコルの拡張であり、カスタム資産の送付とバーンを扱います。ZIP 227 は、それらの資産がそもそもどのように作成されるかを定義しており、ZIP 226 とあわせてのみ実装される必要があります。

### ZSA 助成提案

Shielded Assets (ZSA/UDA) の ZSA 提案は、Zcash ブロックチェーン上で汎用的なシールド資産を構築するために [QEDIT](https://qed-it.com/) チームによって提示されました。これらは通常、User Defined Assets (UDA) または Zcash Shielded Assets (ZSA) と呼ばれます。

この提案により、[QEDIT](https://qed-it.com/) のチームは Zcash エコシステムに DeFi をもたらすと同時に、既存の DeFi エコシステムの中で最高水準のプライバシー技術を利用可能にすることを計画しています。アンケート調査では、チームの問いかけに対し、コミュニティは [汎用的なシールド資産 (ZSA/UDA) が現時点で最も求められている機能である](https://twitter.com/BenarrochDaniel/status/1428327864034791429) と回答しました。

これらの提案は、技術的には [Zcash Improvement Proposal (ZIP)](https://zips.z.cash/zip-0000) の仕様に準拠しており、ZIP 226 と ZIP 227 で定義されています。

1. [ZIP 226](https://zips.z.cash/zip-0226): Zcash Shielded Assets の送付とバーン
2. [ZIP 227](https://zips.z.cash/zip-0227): Zcash Shielded Assets の発行

---

## 実際的な影響

**ZEC を保有または利用している場合**

- ZSA は Orchard の拡張 ("OrchardZSA") として定義されているため、ZEC がすでに使っているシールドの仕組みを共有します。ウォレットが ZSA を保有・送信できるようになるには、明示的な ZSA サポートが必要です。
- 常にある程度の ZEC を手元に持っておく必要があります。ZSA の発行や送付の手数料は、その資産自体ではなく ZEC で支払われます。
- 既存の ZEC トランザクションに関して変わることはありません。

**潜在的な発行者である場合 — ステーブルコイン、DAO、企業**

- 資産の発行には issuance key に紐づいた暗号学的認可が必要なため、自分自身の資産を追加発行したり属性を変更したりできるのはあなただけです。
- あなたの資産の流通供給量は公開監査可能である一方、ユーザーの残高や送金は公開されません。規制対象の発行者にとって、これは通常まさに必要とされる組み合わせです。
- 1 回の発行トランザクションで、複数の資産を同時に作成できます。

**エコシステム全体にとって**

- すべての ZSA 手数料は ZEC 建てであるため、将来 Zcash 上で発行されるあらゆる資産の活動は、ZEC 自体への需要を生みます。

---

## よくある誤解

| よくある認識 | 実際にはどうか |
| --- | --- |
| 「ZSA は今日すでに Zcash 上で稼働している。」 | いいえ。ZSA は Network Upgrade 7 (NU7) でのデプロイが予定されており、現在もレビューとテストが続いています。 |
| 「ZSA は Zcash にスマートコントラクトをもたらす。」 | ZSA が規定するのは資産の発行、送付、バーンです。汎用的なプログラム可能コントラクト層ではありません。 |
| 「ZSA の手数料は ZSA トークン自体で支払える。」 | 手数料は ZEC で支払われます。 |
| 「シールドされているなら、トークン供給量も秘密でなければならない。」 | ZIP 227 は意図的に発行を透明にしているため、各資産の供給量は公開で追跡できます。残高と送付は非公開のままですが、供給量は非公開ではありません。 |
| 「ZIP 230 が現在のバージョン 6 トランザクション形式だ。」 | ZIP 230 は撤回されました。バージョン 6 は現在 ZIP 229 で定義されています。 |

---

## 関連ページ

- [Halo](/zcash-tech/halo) — ZSA が拡張するプロトコル Orchard を支える証明システム
- [Zk-SNARKs](/zcash-tech/zk-snarks) — シールドされた送付を開示せずに検証可能にするゼロ知識証明
- [Shielded Pools](/using-zcash/shielded-pools) — ZSA が ZEC と並んで存在することになる場所
- [Transactions](/using-zcash/transactions) — Zcash トランザクションがどのように構成されるか
- [Zebra フルノード](/zcash-tech/zebra-full-node) — 上記の ZSA デモで使用されているノード実装
