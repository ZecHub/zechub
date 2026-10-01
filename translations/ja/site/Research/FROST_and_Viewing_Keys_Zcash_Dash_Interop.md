# FROST & Viewing Keys：Zcash/Dash 相互運用性調査概要

*ZecHub向けに作成 · 2026年9月27日改訂 · すべての主張に本文中で出典を記載*

## エグゼクティブサマリー

ZecHubは、wikiの寄付オプションとしてシールドされたDASHを追加した後、この疑問を提起した。Zcash形式のViewing Keys、またはFROSTしきい値署名は、Dashに応用できるのだろうか？

調査によって論点が整理された。Viewing Keysは未解決の問題ではない。Dashは[Zcash Orchardシールドプール](https://www.dash.org/news/shielded-transactions-are-live-on-the-dash-evolution-mainnet/)をEvolutionチェーンに導入しており、Orchardの鍵階層には設計上Viewing Keysが含まれている。Dash自身の[ロードマップ](https://www.dash.org/roadmap/)では、監査人への開示およびトラベルルール遵守のためにこれらを位置付けている。この半分は仮説ではなく、すでに導入済みである。

**真の隔たりがあるのはFROSTである。** Dashはすでに[Long-Living Masternode Quorums](https://docs.dash.org/projects/core/en/stable/docs/guide/dash-features-masternode-quorums.html)を通じてBLSしきい値署名を運用しているが、それらはネットワークレベルのコンセンサス、すなわちChainLocksおよびInstantSendのために使われている。[ZIP 312](https://zips.z.cash/zip-0312)が対象とするのは別のもの、すなわち少数の個別鍵保有者グループが共有する単一のシールドアカウントに対するしきい値支出承認である。両者は置き換え可能ではない。また、ZIP 312は依然として**Draft**であるため、どちらのチェーンにも移植可能な参照実装は存在しない。したがって、どちら側が実装しても新規の取り組みとなる。

---

## タイムライン：なぜ今この比較が異例なのか

2026年半ば、数週間の間隔で二つのシールドプール関連イベントが起きた。

**ZcashはOrchardから移行した。** 研究者のTaylor Hornbyは、検知されずに供給量を膨張させるために悪用されうる、Orchardの回路脆弱性を開示した。Zcashはこれに対応し、**Ironwood（NU6.3）**を**2026年7月28日**に有効化して、ターンスタイル移行メカニズムを備えた新たなシールドプールを導入した。

**DashはOrchardへ移行した。** Dashは[2026年2月19日](https://www.dash.org/blog/dash-is-adding-shielded-transactions-to-evolution/)に計画を発表した。*"セキュリティ監査とさらなるコードレビューを前提としますが、間もなくシールド転送を開始できると期待しています。"* Dashの[ロードマップ](https://www.dash.org/roadmap/)には、Shielded BalancesがDash Platform **v4.0**で**2026年7月に完了**したと記録されており、Dashは**2026年8月4日**に[*"Shielded transactions are live on the Dash Evolution mainnet"*](https://www.dash.org/news/shielded-transactions-are-live-on-the-dash-evolution-mainnet/)を公表した。

> **順序に関する注記。** 一部の報道ではDashのメインネット有効化日を2026年7月17日としており、その場合はIronwoodより前になる。この日付は有効化そのものではなく、発表に関する報道に由来するようである。Dash自身の情報源では、この機能は7月に完了し、8月4日にライブであると発表された。つまりIronwoodの後である。両チェーンの動きは数週間以内に交差しており、正確な順序はどのマイルストーンを数えるかによる。本概要ではいずれか一方を断定しない。

重要なのは、Dashがこのバグを引き継いでいないことである。同社の発表では明確に、*"既知のインフレーションバグを含まないバージョンのOrchardを実装しました。以前のバージョンには、Zcashの供給量を検知されずに膨張させるために悪用されうるバグが含まれていました。"*と述べられている。

したがってDashは現在、基層でZcash自身がすでに離脱した暗号技術のパッチ済みフォークを運用している。一方、Zcashの次世代プール（Ironwood）は新たにライブとなり、次世代の支出承認方式（FROST）は依然としてDraftである。

---

## Viewing Keys：導入済みであり、調査上の空白ではない

Dashのシールドプールは[Orchard](https://zips.z.cash/zip-0224)であり、トラステッドセットアップを必要としないHalo 2 zk-SNARKs上に構築されている。Orchardの鍵階層には、設計当初からFull Viewing KeysとIncoming Viewing Keysが含まれており、後付け機能ではない。したがってこの機能は、両チェーン間で交渉して移植するものではなく、コードとともに導入された。

Dashのロードマップは意図を直接的に述べている。

> *「取引所からの上場廃止や規制上の摩擦に直面してきた必須プライバシーシステムとは異なり、Shielded BalancesはViewing Keysによる選択的開示をサポートします。これにより、日常利用のプライバシーを損なうことなく、ユーザーや企業は必要に応じて監査人と取引詳細を共有したり、トラベルルール要件に準拠したりできます。」*

記録すべき観察事項が二つある。

**Dashは、Zcash自身のツール群がまだ到達していない、より具体的な本番ユースケースを中心にViewing Keysを位置付けている。** Zcashの支払い開示ツールは、ウォレット全体でおおむね実験的かつオプトインのままである。Dashは、独自の発表によれば約1秒の決定論的決済と約20秒のウォレット同期も提供するチェーン上で、明示されたユースケースを伴うコンプライアンス機能としてViewing Keysを提供している。

**未解決項目は機能ではなく互換性の乖離である。** 両チェーンが独立して進化するなかで、DashのViewing Key実装がZcashのOrchardViewing Key形式とのワイヤ互換性を維持するかは追跡する価値がある。これは調査プロジェクトではなく、監視すべき問いである。

---

## 鍵導出：ZcashとDashの比較

この節ではレビュー担当者の質問に直接答える。短い答えは、コードが共有されているため*シールドされた*鍵ツリーはほぼ同一であり、実質的な違いは各チェーンがそのツリーをウォレットの鍵空間でどのように**根付かせる**か、そしてその空間に他に何が含まれるかにある。

### Zcash

Zcashは、ステータスが**Final**の[ZIP 32、*Shielded Hierarchical Deterministic Wallets*](https://zips.z.cash/zip-0032)を使用する。シールド鍵を単一のBIP 32ツリー内に置くのではなく、ZIP 32では各シールドプールに独自のマスター鍵と独自のパスを与える。

```
m_Orchard / purpose' / coin_type' / account'
m_Sapling / purpose' / coin_type' / account'
```

`purpose`はBIP 43に従い`32'`（0x80000020）に固定されており、`coin_type`はSLIP 44に従う。すべてのテストネットはインデックス`1`を共有する。

Orchardアカウント内では、階層は厳密に一方向である。各レベルは下位のすべてを導出できるが、上位は一切導出できない。

| 鍵 | できること | 導出するもの |
|---|---|---|
| 支出鍵 | ノートを支出する | `ask`、`nk`、`rivk` |
| 支出承認鍵（`ask`） | 支出を承認する | — |
| Full Viewing Key（`ak`、`nk`、`rivk`） | 受信**および**送信支払いを確認する | IVK、OVK |
| Incoming Viewing Key | 受信支払いのみを確認する | Diversified addresses |
| 送信Viewing Key | 送信支払いの詳細を復元する | — |
| Diversified address | 受け取る | — |

OrchardはSaplingと比べてこれを簡素化した。[Orchard Book](https://zcash.github.io/orchard/design/keys.html)によれば、ヌリファイア秘密鍵`nsk`は削除され、`nk`は曲線上の点ではなく体要素となり、`ovk`は個別に保持されるのではなくフルViewing Keyから導出されるようになった。

その上位には、[ZIP 316、*Unified Addresses and Unified Viewing Keys*](https://zips.z.cash/zip-0316)がある。Revision 0はActive、Revision 1はWithdrawn、Revision 2はDraftであり、プールごとの鍵を**Unified Full Viewing Key**（「複数のFull Viewing Key… Itemsを結合する」）および**Unified Incoming Viewing Key**へ束ねる。ウォレット開発者が守るべき違いは、UFVKは受信および送信アクティビティの両方を開示する一方、UIVKは受信のみを開示することである。

### Dash

DashはすべてをSLIP 44コインタイプ`5'`の従来型BIP 32ツリーに根付かせ、独自の二つの導出拡張を加えている。

[DIP-0009、*Feature Derivation Paths*](https://docs.dash.org/projects/core/en/stable/docs/dips/dip-0009.html)は、コイン固有の機能ごとに鍵空間を分割する**feature**レベルを挿入する。

```
m / purpose' / coin_type' / feature' / *
```

`purpose`は`9'`（0x80000009）に、`coin_type`は`5'`（0x80000005）に固定されている。DIPが示す動機は分離である。*"mixed fundsをnon-mixed fundsから隔離されたパスで維持することが望ましい場合がある。"*

[DIP-0014、*Extended Key Derivation using 256-bit Unsigned Integers*](https://github.com/dashpay/dips/blob/master/dip-0014.md)はさらに進み、BIP 32の31ビットのインデックス制限を引き上げ、パス構成要素が完全な256ビット値を持てるようにする。これにより、次のようなアイデンティティ由来のパスが可能になる。

```
m(userA)/9'/5'/15'/0'/(userA's unique id)/(userB's unique id)
```

末尾の二つの構成要素はユーザーアイデンティティのハッシュである。Zcashには類似するものがない。ZIP 32には、別の当事者のアイデンティティから鍵パスを導出するという概念がない。

### 両者が実際に異なる点

**シールドされたサブツリーは同じである。** Dashのシールド鍵はOrchard鍵である。DashのシールドプールがOrchardだからである。両者を行き来するウォレット開発者は、同じ支出鍵からViewing Keyへの構造を扱うことになる。

**根付かせ方が異なる。** Zcashは、各シールドプールをpurpose `32'`のもとで独自のマスター鍵に分離する。Dashは、シールド機能をpurpose `9'`のもとで一つの統合ツリーから派生させ、他のすべての機能と並置する。Zcashの分離単位は暗号学的プールであり、Dashの分離単位は製品機能である。

**Dashの鍵空間には、Zcashにはないものがある。すなわち独立したBLSドメインである。** LLMQで使用されるマスターノード運用者鍵、投票鍵、クオーラム鍵はBLS鍵であり、Schnorr系鍵ではない。また、上で説明したBIP 32ツリーの完全な外部に存在する。まさにここにDashの既存のしきい値署名があり、また、次節で説明するように、それがOrchardの支出承認と合成できない理由でもある。

**アイデンティティ連結導出はDash固有である。** DIP-0014の256ビットパスは、アイデンティティ間の関係から鍵を導出するために存在する。これはZcashに相当するものがないDash Platformの概念であり、両導出方式が偶然ではなく意図的に分岐している最も明確な例である。

*両方の根付け方式が共有のOrchardサブツリーへ収束する様子は、図1を参照。*

---

## FROST：真に未解決の問い

Dashには、**BLSベースのLLMQ**（Long-Living Masternode Quorums）という成熟したしきい値署名システムがあり、ChainLocks、InstantSend、およびDash Platformバリデータコンセンサスに使用されている。

[ZIP 312、*FROST for Spend Authorization Multisignatures*](https://zips.z.cash/zip-0312)、ステータス**Draft**は別のことを行う。これはSaplingおよびOrchardですでに定義されているSchnorrベースの支出承認署名、すなわちそれぞれ**RedJubjub**と**RedPallas**をしきい値化する。これにより、ZIP自身の表現では、*"ウォレットの保管を共有するユーザーと第三者サービス、または共有資金を管理する人々のグループ"*が、支出前に2-of-3のようなしきい値承認を要求できる。これは**Wallet** ZIPに分類される。コンセンサスを変えるのではなく、既存の支出承認と互換性のある署名を生成する。Coordinatorの役割も維持しており、ZIPはこれを削除することを明確に拒否している。また、信頼できるディーラーによる鍵生成と分散鍵生成の両方について論じている。

重要な違い、そしてこれらが代替物ではない理由は次のとおりである。

| | Dash BLS / LLMQ | Zcash FROST（ZIP 312） |
|---|---|---|
| 署名方式 | BLS | Schnorr — RedJubjub / RedPallas |
| 誰が署名するか | マスターノードのクオーラム | 個別鍵保有者の小グループ |
| 何を承認するか | ネットワーク上の事実：ブロックロック、トランザクションロック | 一つのシールドアカウントからの支出 |
| レイヤー | コンセンサス | ウォレット |
| 鍵空間 | 独立したBLSドメイン | Orchard/Sapling支出承認鍵 |
| ステータス | 導入済み | Draft、参照実装なし |

DashにBLSしきい値署名があることは、FROSTを持つ、または必要とすることを**意味しない**。しかし、Dashのエンジニアがしきい値署名、分散鍵生成、クオーラム調整について社内の知見を持つことは意味する。彼らがこれを構築する選択をした場合、それは実際に転用可能な経験である。

*各方式が実際に何に対して署名するかは、図2を参照。*

### DashのOrchardフォークでFROSTを実現するために、まず必要となるもの

1. **FROSTの支出承認方式であるRedPallas上のOrchard DKGおよび署名セレモニー。** これはPallas曲線上のSchnorrバリアントである。DashのLLMQ向け既存BLS DKGとは別個であり、それに還元できない。
2. **単一のシールドアカウントを複数当事者で署名するためのウォレットおよびUXサポート。** これはマスターノードクオーラム用ツールとは異なるインタラクションパターンであり、Coordinatorに相当する仕組みを必要とする。
3. **レイヤーに関する判断。** ZIP 312はコンセンサス変更ではなく既存プリミティブ上のウォレット方式として範囲設定されているため、最も可能性が高いのはウォレットレベルのみである。ただし、これはZcashのスコープから推測するのではなく、DashのOrchardフォークに照らして確認する必要がある。

---

## 推奨事項

**Viewing Keys：調査せず、文書化する。** この機能は両チェーンですでに導入されている。DashのシールドプールにViewing Keysが含まれることを記録し、Dashのロードマップにリンクする短いwiki注記を用意すれば、ZecHubの読者がまだ仮説段階だと誤解することを防げる。両チェーンの進化に伴い、ワイヤ形式の互換性を追跡する。

**FROST：実際の機会だが、上流で阻まれている。** これはZIP 312が参照実装に到達するか、Dashが並行して構築することに依存する。ZecHubが直接これを加速することはできない。

**最も価値の高い次の一歩は、さらなる机上調査ではなく対話である。** これを構築しうる人々には連絡可能である。Shielded LabsはZIP 312を推進しており、Dashのエンジニアリングチームも、Orchard統合に関する「Zcashから借りた」という枠組みに前向きに関与している。両コミュニティをつなぐスレッドは、もう一巡の読解より多くを明らかにするだろう。本概要は、公的情報源で決着できる範囲の限界に達している。

---

## 図

**図1 — 鍵導出の根付け：Zcash ZIP 32とDash DIP-0009/0014が、共有のOrchardサブツリーへ収束する。**
`assets/Zcash_Dash_Key_Derivation.svg`

**図2 — 各しきい値方式が署名する対象：ネットワーク上の事実を証明するマスターノードクオーラムと、一つのシールド支出を承認する鍵保有者グループ。**
`assets/FROST_vs_BLS_LLMQ.svg`

---

## 出典

**Zcash — プロトコル**

- [ZIP 32：Shielded Hierarchical Deterministic Wallets](https://zips.z.cash/zip-0032) — ステータスFinal
- [ZIP 224：Orchard Shielded Protocol](https://zips.z.cash/zip-0224)
- [ZIP 312：FROST for Spend Authorization Multisignatures](https://zips.z.cash/zip-0312) — ステータスDraft
- [ZIP 316：Unified Addresses and Unified Viewing Keys](https://zips.z.cash/zip-0316)
- [The Orchard Book — 鍵とアドレス](https://zcash.github.io/orchard/design/keys.html)
- [Zcash Protocol Specification](https://zips.z.cash/protocol/protocol.pdf) — 鍵コンポーネント、§5.6.4

**Dash — プロトコルおよび発表**

- [Shielded transactions are live on the Dash Evolution mainnet](https://www.dash.org/news/shielded-transactions-are-live-on-the-dash-evolution-mainnet/) — 2026年8月4日
- [Dash Is Adding Shielded Transactions to Evolution](https://www.dash.org/blog/dash-is-adding-shielded-transactions-to-evolution/) — 2026年2月19日
- [Dash Roadmap](https://www.dash.org/roadmap/) — Shielded Balances、2026年7月完了、Platform v4.0；2026年9月12日更新
- [DIP-0009: Feature Derivation Paths](https://docs.dash.org/projects/core/en/stable/docs/dips/dip-0009.html)
- [DIP-0014: Extended Key Derivation using 256-bit Unsigned Integers](https://github.com/dashpay/dips/blob/master/dip-0014.md)
- [Dash Core documentation — Masternode Quorums（LLMQ）](https://docs.dash.org/projects/core/en/stable/docs/guide/dash-features-masternode-quorums.html)
- [dashpay/dips repository](https://github.com/dashpay/dips)

**同時期の報道**

- [Dash launches ZcashのOrchard技術によるプライバシーアップグレード](https://www.cryptopolitan.com/dash-launch-zcash-orchard-technology/) — Cryptopolitan
- [Dash Brings Zcash Orchard Privacy to Evolution Chain for Shielded Transactions](https://hackernoon.com/dash-brings-zcash-orchard-privacy-to-evolution-chain-for-shielded-transactions) — HackerNoon

*出典確認日：2026年9月27日。Dash PlatformおよびZIP 312はともに進展中であるため、再掲載前に図およびステータスを再検証する必要がある。*
