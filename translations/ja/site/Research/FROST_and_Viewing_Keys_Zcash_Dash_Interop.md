# FROST & ビューイングキー: Zcash/Dash 相互運用性調査概要

*ZecHub向けに作成 · 2026年9月27日改訂 · すべての主張は本文中に出典を記載しています*

## エグゼクティブサマリー

ZecHubは、wikiの寄付オプションとしてシールドされたDASHを追加した後、この疑問を提起しました。Zcash形式のビューイングキー、またはFROSTのしきい値署名は、Dashに応用できるのでしょうか。

調査により、この問いは再構成されました。ビューイングキーは未解決の問題ではありません。Dashは[ZcashのOrchardシールドされたプール](https://www.dash.org/news/shielded-transactions-are-live-on-the-dash-evolution-mainnet/)をEvolutionチェーンに導入済みであり、Orchardの鍵階層には、設計上ビューイングキーが含まれています。Dash自身の[ロードマップ](https://www.dash.org/roadmap/)では、監査人への開示およびトラベルルール準拠のために位置付けられています。この半分は仮説ではなく、すでに導入済みです。

**FROSTにこそ、本当の隔たりがあります。** Dashはすでに、[Long-Living Masternode Quorums](https://docs.dash.org/projects/core/en/stable/docs/guide/dash-features-masternode-quorums.html)を通じてBLSしきい値署名を運用していますが、これらはネットワークレベルのコンセンサス、すなわちChainLocksおよびInstantSendのためのものです。[ZIP 312](https://zips.z.cash/zip-0312)が対象とするのは別のものです。すなわち、少数の個別鍵保有者グループが保持する単一のシールドされたアカウントに対する、しきい値による支出認可です。両者は代替可能ではありません。また、ZIP 312は依然として**ドラフト**であるため、移植できる参照実装はどちらのチェーンにもありません。したがって、どちら側が構築しても、新規の取り組みになります。

---

## タイムライン: この比較が現在珍しい理由

2026年半ば、2つのシールドされたプールに関する出来事が数週間以内に起こりました。

**ZcashはOrchardから移行しました。** 研究者のTaylor Hornbyは、検出不能な供給量の水増しに悪用され得るOrchardの回路脆弱性を開示しました。Zcashはこれに対応し、**Ironwood（NU6.3）**を**2026年7月28日**に有効化し、ターンスタイル移行メカニズムを備えた新しいシールドされたプールを導入しました。

**DashはOrchardを導入しました。** Dashは、[2026年2月19日](https://www.dash.org/blog/dash-is-adding-shielded-transactions-to-evolution/)に計画を発表しました。*"セキュリティ監査およびさらなるコードレビューを当然ながら前提として、まもなくシールドされた送金を開始できると見込んでいます。"* Dashの[ロードマップ](https://www.dash.org/roadmap/)には、シールドされた残高がDash Platform **v4.0**において**2026年7月に完了**したと記録されており、Dashは[*"シールドされたトランザクションはDash Evolutionメインネットで稼働中です"*](https://www.dash.org/news/shielded-transactions-are-live-on-the-dash-evolution-mainnet/)を**2026年8月4日**に公開しました。

> **順序に関する注記。** 一部の報道では、Dashのメインネット有効化を2026年7月17日としており、その場合はIronwoodより前になります。この日付は、有効化そのものではなく発表に関する報道に由来しているようです。Dash自身の情報源では、この機能は7月に完成し、Ironwoodより後の8月4日に稼働開始が発表されています。両チェーンの出来事は数週間以内に交差しており、正確な順序はどのマイルストーンを数えるかによって変わります。本概要では、どちらか一方を主張しません。

重要なのは、Dashがこのバグを継承しなかったことです。同社の発表は明確です。*"既知のインフレーションバグがないバージョンのOrchardを実装しました。以前のバージョンには、Zcashの供給量を検出不能に水増しするために悪用され得るバグが含まれていました。"*

したがって、Dashは、Zcash自身がベースレイヤーで離脱済みの暗号技術の修正済みフォークを現在運用しています。一方で、Zcashの次世代プール（Ironwood）は新たに稼働し、次世代の支出認可スキーム（FROST）は依然としてドラフトです。

---

## ビューイングキー: 導入済みであり、調査上の隔たりではありません

Dashのシールドされたプールは[Orchard](https://zips.z.cash/zip-0224)であり、トラステッドセットアップを必要としないHalo 2 zk-SNARKs上に構築されています。Orchardの鍵階層には、設計当初からフルビューイングキーと着信ビューイングキーが含まれています。つまり、この機能はコードとともに導入されたものであり、どちらのチェーンも移植について交渉する必要はありませんでした。

Dashのロードマップは、その意図を直接述べています。

> *"取引所での上場廃止や規制上の摩擦に直面してきた必須プライバシーシステムとは異なり、シールドされた残高はビューキーによる選択的開示をサポートします。これにより、ユーザーおよび企業は、日常利用のプライバシーを損なうことなく、必要に応じてトランザクション詳細を監査人と共有したり、トラベルルール要件に準拠したりできます。"*

記録に値する観察が2つあります。

**Dashは、Zcash自身のツールが到達した段階よりも具体的な本番ユースケースを軸に、ビューイングキーを位置付けています。** Zcashの支払い開示ツールは、ウォレット全体で主に実験的かつオプトインのままです。Dashは、独自の発表によれば約1秒の決定論的な決済と約20秒のウォレット同期も提供するチェーン上で、名前の付いたユースケースを持つコンプライアンス機能としてビューキーを提供しています。

**未解決の項目は機能ではなく互換性の乖離です。** 両チェーンが独立して進化するにつれて、Dashのビューイングキー実装がZcashのOrchardビューイングキー形式とのワイヤ互換性を維持するかは、追跡する価値があります。これは調査プロジェクトではなく、監視すべき問題です。

---

## 鍵導出: ZcashとDashの比較

このセクションでは、査読者の質問に直接答えます。短い答えは、コードが共有されているため*シールドされた*鍵ツリーはほぼ同一であり、意味のある差異は各チェーンがそのツリーをウォレットの鍵空間にどのように**ルート化**しているか、およびその空間にほかに何が存在するかにあります。

### Zcash

Zcashは、ステータスが**Final**の[ZIP 32、*Shielded Hierarchical Deterministic Wallets*](https://zips.z.cash/zip-0032)を使用します。シールドされた鍵を単一のBIP 32ツリー内に配置するのではなく、ZIP 32では各シールドされたプールに専用のマスター鍵と専用のパスを与えます。

```
m_Orchard / purpose' / coin_type' / account'
m_Sapling / purpose' / coin_type' / account'
```

`purpose`はBIP 43に従い`32'`（0x80000020）に固定されており、`coin_type`はSLIP 44に従います。すべてのテストネットはインデックス`1`を共有します。

Orchardアカウント内では、階層は厳密に一方向です。各レベルはその下のすべてを導出できますが、上位のものは導出できません。

| 鍵 | 実行可能なこと | 導出先 |
|---|---|---|
| Spending key | ノートを支出する | `ask`、`nk`、`rivk` |
| Spend authorizing key (`ask`) | 支出を認可する | — |
| Full Viewing Key (`ak`, `nk`, `rivk`) | 着信**および**送信支払いを確認する | IVK、OVK |
| Incoming Viewing Key | 着信支払いのみを確認する | 多様化アドレス |
| Outgoing Viewing Key | 送信支払いの詳細を復元する | — |
| Diversified address | 受け取る | — |

Orchardは、Saplingと比較してこれを簡素化しました。[Orchard Book](https://zcash.github.io/orchard/design/keys.html)によれば、ヌリファイア秘密鍵`nsk`は削除され、`nk`は曲線点ではなくフィールド要素となり、`ovk`は別個に保持されるのではなくフルビューイングキーから導出されるようになりました。

この上位には、[ZIP 316、*Unified Addresses and Unified Viewing Keys*](https://zips.z.cash/zip-0316)があります。Revision 0はActive、Revision 1はWithdrawn、Revision 2はDraftです。これはプールごとの鍵を**Unified Full Viewing Key**（「複数のFull Viewing Key… Itemsを組み合わせる」）および**Unified Incoming Viewing Key**にまとめます。ウォレット開発者が遵守すべき区別は、UFVKが着信と送信の両方の活動を明らかにするのに対し、UIVKは着信のみを明らかにすることです。

### Dash

Dashは、SLIP 44コインタイプ`5'`を持つ従来のBIP 32ツリーをすべての基点とし、独自の導出拡張を2つ追加しています。

[DIP-0009、*Feature Derivation Paths*](https://docs.dash.org/projects/core/en/stable/docs/dips/dip-0009.html)は、コイン固有の機能ごとに鍵空間を分割する**機能**レベルを挿入します。

```
m / purpose' / coin_type' / feature' / *
```

`purpose`は`9'`（0x80000009）に固定され、`coin_type`は`5'`（0x80000005）に固定されています。DIPが述べる動機は分離です。*"ミックスされた資金を、ミックスされていない資金から隔離されたパスに維持することが望ましい場合があります。"*

[DIP-0014、*Extended Key Derivation using 256-bit Unsigned Integers*](https://github.com/dashpay/dips/blob/master/dip-0014.md)はさらに進み、BIP 32の31ビットのインデックス制限を拡張し、パス構成要素が完全な256ビット値を保持できるようにします。これにより、次のようなID由来のパスが可能になります。

```
m(userA)/9'/5'/15'/0'/(userA's unique id)/(userB's unique id)
```

ここで最後の2つの構成要素は、ユーザーIDのハッシュです。Zcashには類似物がありません。ZIP 32には、別の当事者のIDから鍵パスを導出する概念がありません。

### 実際に異なる点

**シールドされたサブツリーは同一です。** Dashのシールドされた鍵はOrchard鍵です。なぜなら、DashのシールドされたプールはOrchardだからです。両者の間を移行するウォレット開発者は、同じ支出鍵からビューイングキーへの構造を扱います。

**ルート化が異なります。** Zcashは、目的`32'`の下で各シールドされたプールを専用のマスター鍵に分離します。Dashは、ほかのすべての機能と並んで、目的`9'`の下にある1つの統合ツリーからシールドされた機能を分岐させます。Zcashの分離は暗号学的プール単位であり、Dashの分離は製品機能単位です。

**Dashの鍵空間には、Zcashにはないものがあります。すなわち、別個のBLSドメインです。** LLMQで使用されるマスターノード運営者鍵、投票鍵、クォーラム鍵はBLS鍵であり、Schnorr系の鍵ではなく、上記のBIP 32ツリーの完全に外側に存在します。こここそがDashの既存のしきい値署名が存在する場所であり、次節で説明するように、Orchardの支出認可と合成できない理由でもあります。

**ID連携導出はDashのみのものです。** DIP-0014の256ビットパスは、ID間の関係から鍵を導出するために存在します。これはDash Platformの概念であり、Zcashに相当するものはありません。これは、2つの導出スキームが偶然ではなく意図して分岐した最も明確な事例です。

*共有されるOrchardサブツリーに収束する2つのルート化スキームについては、図1を参照してください。*

---

## FROST: 真に未解決の問題

Dashには、**BLSベースのLLMQ**（Long-Living Masternode Quorums）における成熟したしきい値署名システムがあります。これはChainLocks、InstantSend、およびDash Platformバリデータのコンセンサスに使用されています。

[ZIP 312、*FROST for Spend Authorization Multisignatures*](https://zips.z.cash/zip-0312)、ステータス**Draft**は、別のことを行います。これは、SaplingおよびOrchardによってそれぞれ定義済みのSchnorrベースの支出認可署名、すなわち**RedJubjub**および**RedPallas**をしきい値化します。そのため、ZIP自身の表現では、*"ウォレットのカストディを共有するユーザーとサードパーティサービス、または共有資金を管理する人々のグループ"*が、支出前に2-of-3のようなしきい値承認を要求できます。これは**ウォレット**ZIPとして分類されています。コンセンサスを変更するのではなく、既存の支出認可と互換性のある署名を生成します。Coordinatorの役割を維持しており、ZIPはこれを削除することを明示的に拒否しています。また、トラステッドディーラーによる鍵生成と分散鍵生成の両方について論じています。

重要な区別、およびこれらが代替ではない理由は次のとおりです。

| | Dash BLS / LLMQ | Zcash FROST（ZIP 312） |
|---|---|---|
| 署名スキーム | BLS | Schnorr — RedJubjub / RedPallas |
| 署名者 | マスターノードのクォーラム | 個別鍵保有者からなる少人数のグループ |
| 認可される対象 | ネットワーク上の事実: ブロックロック、トランザクションロック | 1つのシールドされたアカウントからの支出 |
| レイヤー | コンセンサス | ウォレット |
| 鍵空間 | 別個のBLSドメイン | Orchard/Saplingの支出認可鍵 |
| ステータス | 導入済み | ドラフト、参照実装なし |

DashがBLSしきい値署名を持つことは、FROSTを持つ、あるいは必要とすることを**意味しません**。しかし、Dashのエンジニアが、しきい値署名、分散鍵生成、クォーラム協調について社内の経験を持つことは意味します。彼らがこれを構築することを選択した場合、それは実際に転用可能な経験です。

*各スキームが実際に何に署名するかについては、図2を参照してください。*

### DashのOrchardフォークにおいてFROSTが最初の段階で必要とするもの

1. **RedPallas上でのFROST DKGおよび署名セレモニー**。これはOrchardの支出認可スキームであり、Pallas曲線上のSchnorrバリアントです。これはDashがLLMQ用に既存で持つBLS DKGとは別個であり、それに還元できません。
2. **単一のシールドされたアカウントに対するマルチパーティ署名のためのウォレットおよびUXサポート**。これはマスターノードクォーラムツールとは異なるインタラクションパターンであり、Coordinatorに相当するものを必要とします。
3. **レイヤーに関する決定。** ZIP 312は、コンセンサス変更ではなく既存プリミティブ上のウォレットスキームとして範囲が定められているため、最も可能性が高いのはウォレットレベルのみです。ただし、これはDashのOrchardフォークに対して具体的に確認する必要があり、Zcashのスコープから推定してはなりません。

---

## 推奨事項

**ビューイングキー — 調査ではなく文書化を行います。** この機能は両チェーンで提供済みです。Dashのシールドされたプールにビューキーが含まれることを記録し、Dashのロードマップにリンクする短いwiki注記により、ZecHubの読者がそれをまだ仮説的なものと考えるのを防げます。両チェーンの進化に伴い、ワイヤ形式の互換性を追跡してください。

**FROST — 現実的な機会ですが、上流で阻まれています。** これはZIP 312が参照実装に到達するか、またはDashが並行して構築することに依存します。ZecHubが直接加速することはできません。

**最も価値の高い次の一歩は、デスクリサーチをさらに行うことではなく、対話です。** これを構築できる人々には連絡可能です。Shielded LabsはZIP 312を主導しており、Dashのエンジニアリングチームは、Orchard統合をめぐる「Zcashから借用した」という枠組みに、すでに前向きに関与しています。両コミュニティをつなぐスレッドは、さらなる読解より多くのことを明らかにするでしょう。本概要は、公開情報源で解決できる範囲の限界に達しています。

---

## 図

**図1 — 鍵導出のルート化: Zcash ZIP 32およびDash DIP-0009/0014が、共有されるOrchardサブツリーに収束します。**
`assets/Zcash_Dash_Key_Derivation.svg`

**図2 — 各しきい値スキームが署名する対象: ネットワーク上の事実を証明するマスターノードクォーラムと、1つのシールドされた支出を認可する鍵保有者グループの比較。**
`assets/FROST_vs_BLS_LLMQ.svg`

---

## 情報源

**Zcash — プロトコル**
- [ZIP 32: シールドされた階層的決定論的ウォレット](https://zips.z.cash/zip-0032) — ステータス Final
- [ZIP 224: Orchard シールドされたプロトコル](https://zips.z.cash/zip-0224)
- [ZIP 312: 支出認可マルチシグのためのFROST](https://zips.z.cash/zip-0312) — ステータス Draft
- [ZIP 316: 統合アドレスおよび統合ビューイングキー](https://zips.z.cash/zip-0316)
- [The Orchard Book — 鍵とアドレス](https://zcash.github.io/orchard/design/keys.html)
- [Zcashプロトコル仕様](https://zips.z.cash/protocol/protocol.pdf) — 鍵構成要素、§5.6.4

**Dash — プロトコルおよび発表**
- [シールドされたトランザクションがDash Evolutionメインネットで稼働中](https://www.dash.org/news/shielded-transactions-are-live-on-the-dash-evolution-mainnet/) — 2026年8月4日
- [DashがEvolutionにシールドされたトランザクションを追加](https://www.dash.org/blog/dash-is-adding-shielded-transactions-to-evolution/) — 2026年2月19日
- [Dashロードマップ](https://www.dash.org/roadmap/) — シールドされた残高、2026年7月完了、Platform v4.0; 2026年9月12日更新
- [DIP-0009: 機能導出パス](https://docs.dash.org/projects/core/en/stable/docs/dips/dip-0009.html)
- [DIP-0014: 256ビット符号なし整数を使用する拡張鍵導出](https://github.com/dashpay/dips/blob/master/dip-0014.md)
- [Dash Coreドキュメント — マスターノードクォーラム（LLMQ）](https://docs.dash.org/projects/core/en/stable/docs/guide/dash-features-masternode-quorums.html)
- [dashpay/dipsリポジトリ](https://github.com/dashpay/dips)

**同時期の報道**
- [DashがプライバシーアップグレードでZcashのOrchard技術を導入](https://www.cryptopolitan.com/dash-launch-zcash-orchard-technology/) — Cryptopolitan
- [DashがシールドされたトランザクションのためにZcashのOrchardプライバシーをEvolutionチェーンにもたらす](https://hackernoon.com/dash-brings-zcash-orchard-privacy-to-evolution-chain-for-shielded-transactions) — HackerNoon

*情報源は2026年9月27日に確認しました。Dash PlatformおよびZIP 312はいずれも進行中であるため、再公開前に図およびステータスを再確認する必要があります。*
