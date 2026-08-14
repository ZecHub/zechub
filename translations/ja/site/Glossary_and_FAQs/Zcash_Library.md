# Zcash ライブラリ

Zcash に関連する主要な用語、概念、リソースを網羅した包括的な用語集です。

### クイックナビゲーション
[A](#a) | [B](#b) | [C](#c) | [D](#d) | [E](#e) | [F](#f) | [G](#g) | [H](#h) | [I](#i) | [J](#j) | [K](#k) | [L](#l) | [M](#m) | [N](#n) | [O](#o) | [P](#p) | [Q](#q) | [R](#r) | [S](#s) | [T](#t) | [U](#u) | [V](#v) | [W](#w) | [X](#x) | [Y](#y) | [Z](#z)

---

## A

| Term | Definition |
|------|-----------|
| Actions | Orchard プロトコルでは、各 Spend と Output ごとに複数の個別証明を作成する代わりに、それらを 1 つの Action に統合します。 |
| Addresses | Zcash には Shielded（Z/zaddr）アドレスと Transparent（T/taddr）アドレスがあります。Unified addresses（UA）は、NU5 アップグレードに伴い、Z と T を置き換える形で導入が進んでいます。 |
| Arborist Call | Zcash プロトコルおよび研究開発の最新情報を扱う隔週の通話です。Zcash Community Forum と Discord で開催されています。[会議メモ](https://github.com/ZcashCommunityGrants/arboretum-notes) / [フォーラム告知](https://forum.zcashcommunity.com) |
| Auto-shielding | ユーザー（より正確にはそのウォレット）が、透明アドレスから最新の Shielded ZEC プールへ資金を自動的に移動できるようにします。 |

## B

| Term | Definition |
|------|-----------|
| Benchmarking | マイナーは、Zcash のマイニングに使用されるさまざまなハードウェアの効率性に関する指標を提出できます。[こちらで表示](https://zcashbenchmarks.info) |
| Block | ブロックとは、Zcash ブロックチェーン上の記録であり、ネットワーク上で送信された一連のトランザクションを含みます。平均すると、およそ 75 秒ごとに新しいブロックがブロックチェーンに追加されます。 |
| Block Explorer | ブロックチェーン上のすべてのトランザクション（過去・現在）を閲覧するためのオンラインツールです。[Zcash Block Explorer](https://zcashexplorer.app/) |
| Blogs | [ZODL Blog（旧 Electric Coin Co）](https://zodl.com/blog/) / [Zcash Foundation Blog](https://zfnd.org/blog/) / [ZecHub Blog](https://zechub.wiki/zechub-dao) |
| Blossom | Zcash の 3 回目の主要ネットワークアップグレードです。[詳細情報](https://zcash.readthedocs.io/en/latest/rtd_pages/nu_dev_guide.html?highlight=orchard#blossom) |

## C

| Term | Definition |
|------|-----------|
| Canopy | Zcash の 5 回目の主要ネットワークアップグレードです。[詳細情報](https://zcash.readthedocs.io/en/latest/rtd_pages/nu_dev_guide.html?highlight=orchard#canopy) |
| Commitment Scheme | コミッターが短い文字列で多項式にコミットでき、その文字列を使って検証者がコミット済み多項式の主張された評価値を確認できるようにする仕組みです。Zcash プロトコルにおける通信コスト削減に役立ちます。 |
| Community | [公式 Zcash Community Forum](https://forum.zcashcommunity.com) / [Zcash Community Discord](https://discord.com/channels/669694001464737815/669694001921654794) / [Zcash R&D Discord](https://discord.com/invite/6AK7keWFaK) / [Reddit](https://www.reddit.com/r/zec/) / [Telegram](https://t.me/Zcash_Community) / [Twitter](https://x.com/zcash) |
| Crosslink | プルーフ・オブ・ワークによるブロック生成を維持しつつ、その上にプルーフ・オブ・ステークのファイナリティ層を追加することで、マイニングを放棄せずにブロックにより強いファイナリティを与える、提案中のハイブリッド・コンセンサス設計です。これは Trailing Finality Layer の研究から生まれたもので、Shielded Labs によって開発が進められており、2026年時点ではまだ testnet 開発段階にあります。 |
| CrossPay | ZODL ウォレットの機能で、中央集権型取引所ではなく NEAR Intents を経由して、受取人が希望する資産とチェーンで支払いを受け取れる一方、送信者は shielded ZEC を使用できます。 |
| Cypherpunk Zero | ECC、イラストレーターの Stranger Wolf、Mighty Jaxx、および選ばれたエコシステムパートナーによるクリエイティブユニバースと共同プロジェクトです。[Cypherpunk Zero サイト](https://halo.electriccoin.co/?utm_source=ECC&utm_medium=Website&utm_campaign=None) / [Opensea コレクション](https://opensea.io/collection/cypherpunk-zero) |

## D

| Term | Definition |
|------|-----------|
| DeFi | ZEC を DeFi と統合するプロジェクト: [Maya Protocol](https://www.mayaprotocol.com/ecosystem#user-interfaces/) / [Near Intents](https://near-intents.org/) / [ZenRock](https://app.zenrocklabs.io/) / [ShapeShift](https://app.shapeshift.com/) / [LeoDex](https://leodex.io/) / [ThorSwap](https://app.thorswap.finance/) |
| Deshielding | zaddr（Shielded アドレス）から taddr（Transparent アドレス）へ送信されるトランザクションを指します。トランザクションの送信元は見えませんが、資金は公開可視の value pool に入ります。 |
| Developer Resources | [開発者向けリソース](https://www.zcashcommunity.com/developers/) |
| Documentation | [公式ドキュメント](https://zcash.readthedocs.io/en/latest/) |

## E

| Term | Definition |
|------|-----------|
| ECC | Electric Coin Company。以前は Zcash Company として知られていた、Zcash プロトコルを立ち上げたチームです。Bootstrap の取締役会とのガバナンス紛争を受け、2026年1月にエンジニアリングチーム全員が辞任し、その後 ZODL を結成しました。 |
| ECDSA | Elliptic Curve Digital Signature Algorithm は、暗号学的に安全なデジタル署名方式です。ECDSA の署名／検証アルゴリズムは、楕円曲線上の点の乗算に依存しています。 |
| Education | Zcash を解説する学習向け動画は[こちら](https://www.zcashcommunity.com/zcash-education/) |
| Encrypted Memos | Shielded アドレスへ送信されるトランザクションの追加フィールドで、支払いの受取人に表示されます。暗号化メモは送信者と受取人にのみ表示されます。 |
| Equihash | Zcash で使用される、メモリ指向のプルーフ・オブ・ワーク型マイニングアルゴリズムです。 |
| Events | Zcash 関連イベントのカレンダーは [Luma](https://luma.com/zcash) と [Zcash Foundation](https://zfnd.org/zf-events/) で確認できます |
| Exchanges | [Zcash をサポートする取引所一覧](https://z.cash/exchanges/) |

## F

| Term | Definition |
|------|-----------|
| Fiat-Shamir | 対話型知識証明を基にデジタル署名を作成するための技法です。これにより、ある事実（たとえば秘密を知っていること）を、その基礎となる情報を明かさずに公に証明できます。 |
| Formal Verification | テストのみに頼るのではなく、システムが仕様どおりに正確に振る舞うことを数学的に証明することです。Ironwood Action circuit は、健全性に関するバグが存在しないことを示すために、zkSecurity と ZODL の貢献者によって Lean 定理証明支援系を用いてこの方法で検証されました。 |
| Founders Reward | Founders Reward はブロック報酬総額の 20 パーセントを占め、各ブロックの価値から差し引かれ、プロトコルの開発と成長を推進するために透明性をもって分配されます。 |
| Free2z | Zcash を活用した、匿名コンテンツ公開とプライベート寄付のためのツールです。[Free2z](https://free2z.com) |
| FROST | Flexible Round-Optimized Schnorr Threshold 署名方式です。[研究論文](https://eprint.iacr.org/2020/852) |

## G

| Term | Definition |
|------|-----------|
| Governance | ZIP プロセスによる決定は、Zcash 仕様書およびネットワークを動かすソフトウェアに書き込まれます。変更は、ネットワークの過半数がアップグレードを採用し、コンセンサスが壊れないときにオンチェーンで承認されます。[完全なプロトコル履歴](https://zfnd.org/protocol-governance/) |

## H

| Term | Definition |
|------|-----------|
| Halo | trusted setup を必要とせずに回路のアップグレードを可能にし、将来の改善や拡張に向けて Zcash の Shielded プロトコルをより機敏にします。[技術解説](https://z.cash/learn/what-is-halo-for-zcash/) |
| HD Wallet | Hierarchical deterministic wallet は、1 つの seed から一連の鍵ペアを生成し、利便性と管理性に加えて高度なセキュリティを提供します。 |
| Heartwood | Zcash の 4 回目の主要ネットワークアップグレードです。[詳細情報](https://z.cash/upgrade/heartwood/) |

## I

| Term | Definition |
|------|-----------|
| Index | CoinDesk の ZCX Index は、Zcash の米ドル換算リアルタイム現物レートを表します。[価格インデックス](https://www.coindesk.com/indices/zcx/) |
| Integrations | 複数のサードパーティプロバイダーを通じて Zcash 支払いを受け入れることができます。[決済プロセッサ](https://z.cash/zcash-for-business/) |
| Interactive Proof System | 計算を 2 者間、すなわち Prover と Verifier のメッセージ交換としてモデル化する抽象機械です。 |
| Investment | Zcash へのエクスポージャーを得たい機関投資家やファミリーオフィス向けに、さまざまな金融オプションが用意されています。[完全な一覧](https://z.cash/investors/) |
| Ironwood | 2026年7月28日にブロック 3,428,143 でメインネット上で有効化されたネットワークアップグレード（NU6.3）です。これにより Ironwood とも呼ばれる新しい shielded pool が導入され、既存の価値が turnstile を越えて移行するよう Orchard pool は支出専用になりました。[詳細はこちら](/zcash-tech/ironwood) |

## J

| Term | Definition |
|------|-----------|
| JubJub | zk-SNARK 回路で効率的に実装できるよう設計された楕円曲線です。 |

## K

| Term | Definition |
|------|-----------|
| Keystone Wallet | ネイティブな Zcash（Orchard Shielded）サポートを備え、コールド署名のために ZODL と互換性がある、エアギャップ型ハードウェアウォレットです。[Keystone](https://keyst.one) |

## L

| Term | Definition |
|------|-----------|
| Layer-1 | ベースネットワークとその基盤インフラを指します。Layer-1 ブロックチェーンは、別のネットワークを必要とせずにトランザクションを検証・確定できます。Zcash は L1 ブロックチェーンです。 |
| librustzcash | Zcash を扱うためのすべての crate と依存関係を含む Rust ワークスペースです。[repo](https://github.com/zcash/librustzcash) |
| Lightwalletd | ライトクライアントにブロックチェーン情報を提供するステートレスサーバーです。[Lightwalletd](https://zcash.readthedocs.io/en/latest/rtd_pages/lightclient_support.html) |

## M

| Term | Definition |
|------|-----------|
| Metrics | ネットワーク指標は[こちら](https://tokenterminal.com/explorer/projects/zcash/metrics/all)で確認できます |
| Metadata | ユーザーの Zcash トランザクションに付随して生成されるデータです。これには、ブロック高、トランザクションのバージョン、expiry height などが含まれます。 |
| Mobile SDK | Android を Zcash に接続し、サードパーティ製 Android アプリで Shielded トランザクションの送受信を可能にする軽量 SDK です。[Github](https://github.com/zcash/zcash-android-wallet-sdk) |
| Mining | Zcash ネットワーク内のノードが、各ブロックについて自己調整される難易度に基づく複雑な数学計算を行い、解を見つけることで競い合うプロセスです。[ガイド](https://z.cash/mining-zcash/) |
| Multisignature | 資金を使うために複数の秘密鍵署名を必要とするアドレスです。現在、マルチシグ機能は Transparent アドレスでのみサポートされています。 |

## N

| Term | Definition |
|------|-----------|
| Network Sustainability Mechanism (NSM) | Shielded Labs による提案で、プロトコルの長期的なセキュリティ予算が発行のみに完全に依存しないよう、取引手数料の一部をバーンするものです。ZIP 234 で規定されており、2026 年に審査中です。 |
| Nighthawk | Zcash 用のモバイルウォレットです。[Website](https://nighthawkwallet.com) |
| Noir Wallet | Zcash Community Grants の支援を受けた Zcash のブラウザー拡張ウォレットで、QR コードや手動送金に頼るのではなく、shielded ZEC をブラウザーアプリケーションに直接接続できるよう設計されています。[zknoir.com](https://www.zknoir.com/) |
| NU5 | Orchard Shielded pool と Unified Addresses を導入した、Zcash の 6 回目の主要ネットワークアップグレードです。[詳細情報](https://zcash.readthedocs.io/en/latest/rtd_pages/nu_dev_guide.html#nu5) |
| NU6 | Zcash Community Grants プログラムと Shielded Labs の資金調達のためにブロック補助金を調整した、Zcash の 7 回目の主要ネットワークアップグレードです。2024 年後半に有効化されました。[詳細情報](https://zcash.readthedocs.io/en/latest/rtd_pages/nu_dev_guide.html#nu6) |
| NU7 | Ironwood の次の主要ネットワークアップグレードです。候補機能には、Project Tachyon のスケーリング作業、Zcash Shielded Assets、Network Sustainability Mechanism が含まれます。 |

## O

| Term | Definition |
|------|-----------|
| Oblivious Synchronization | Project Tachyon で開発中の手法で、ウォレットが信頼できないサーバーに対して、どのノートについて問い合わせているかを明かすことなく、必要なデータを要求できるようにします。プロトコルにより nullifier が相互に関連付けできない形で変化するため、サーバーがあなたの nullifier を知ることはありません。[解説](https://seanbowe.com/blog/tachyon-scaling-zcash-oblivious-synchronization/) |
| Orchard Shielded Pool | Zcash における 3 番目の Shielded pool であり、zk-SNARK 技術スタックの継続的な進化を表しています。[詳細](https://electriccoin.co/blog/explaining-halo-2/) |
| Overwinter | Zcash の 1 回目のネットワークアップグレードです。[詳細情報](https://zcash.readthedocs.io/en/latest/rtd_pages/nu_dev_guide.html#overwinter) |

## P

| Term | Definition |
|------|-----------|
| Payments | さまざまな決済プロバイダーを通じて、日常の買い物に Zcash を利用することが可能です。[決済アプリ](https://z.cash/pay-with-zcash/) |
| PCD (Proof-Carrying Data) | データがそれ自体の正しさの証明とともに移動するプリミティブであり、データを組み合わせると証明も組み合わされます。Project Tachyon はシールドされたプロトコルを PCD を中心に再構築し、各ウォレットがチェーンを再スキャンする代わりに、自身の残高が正しいことを示す再帰的証明を保持できるようにします。Zcash の実装は [Ragu](https://github.com/tachyon-zcash/ragu) で、Halo に従い、trusted setup を必要としません。 |
| Peer-to-Peer Network | P2P ネットワークは分散化の概念に基づいています。ブロックチェーン技術の基盤となるアーキテクチャです。 |
| PIR (Private Information Retrieval) | サーバーにどのレコードを要求したかを知られることなく、サーバーからレコードを取得できるようにする技術です。Zcash では、light wallet が何を探しているのかを漏らさずに必要な情報を取得する方法として、活発に研究が進められています。 |
| Podcast | [Radiolab（Zcash Ceremony）](https://archive.org/details/radiolab_podcast17crypto_zcash_ceremony) / [RealVisionFinance](https://www.youtube.com/watch?v=ibA_4kwd_YI) / [EthDenver](https://www.youtube.com/watch?v=t62isi58XcQ) / [UpOnlyPodcast](https://www.youtube.com/watch?v=AjC9T938o3Q) / [Zcast en Español](https://www.youtube.com/@ZcastEsp) |

## Q

| Term | Definition |
|------|-----------|
| QR Code | Zcash アドレスを簡単にスキャンできるようにエンコードするための機械可読コードです。Unified Addresses（UA）は、現代的な Zcash ウォレットでは通常 QR コード経由で共有されます。 |
| Quantum Recoverability | [ZIP 2005](https://zips.z.cash/zip-2005) で規定されている Ironwood ノートの特性で、将来の量子コンピューターが現在それを保護している暗号を破った場合でも、コインのオンチェーン記録を復旧可能な状態に保ちます。これは量子耐性ではなく復旧手段であり、Ironwood ノートに適用されるものであって、既存の Sprout、Sapling、Orchard の資金には適用されません。 |

## R

| Term | Definition |
|------|-----------|
| Recovery Phrase | ウォレットのバックアップと復元に使われる、12 または 24 個の文字と数字からなる並びです。Zcash では、このフレーズによって spending keys と viewing keys が再生成されるため、資金回復とセキュリティの両面で極めて重要です。 |

## S

| Term | Definition |
|------|-----------|
| Sapling | Shielded トランザクションの効率を大幅に改善し、モバイル採用への道を開いた主要ネットワークアップグレードです。ブロック 419200 で有効化されました。 |
| Selective Disclosure | Shielded アドレスの所有者が、viewing keys や payment disclosures を第三者と選択的に共有しつつ、それ以外のすべての人からはデータを秘匿できるようにします。 |
| Shielded Address | zaddr とも呼ばれます。z で始まります。送信者、受信者、金額、メモを zk-SNARKs によって隠します。 |
| Shielded Labs | Zcash のプロトコル経済学とコンセンサスに取り組む独立組織です。現在は Crosslink と Network Sustainability Mechanism を主導しています。[GitHub](https://github.com/ShieldedLabs) |
| Shielded Transaction | Shielded アドレス間のみで行われるトランザクションです。ブロックチェーン上で完全にプライベートです。 |
| Sol/s | 1 秒あたりの Solutions 数 — Equihash マイニング性能を測る指標です。 |
| Spending Key | Shielded アドレスから資金を使うことを可能にする秘密鍵です（残高や履歴の閲覧も可能です）。 |
| Sprout | Zcash の元祖 Shielded プロトコル版です（2016 年開始）。 |

## T

| Term | Definition |
|------|-----------|
| Tachyon | NU7 を対象とした Zcash のスケーリング計画です。ウォレットがすべてのブロックをスキャンする方式から、proof-carrying wallet state、oblivious synchronization、prunable ノード state へ移行し、シールド済みトランザクションのスループットを毎秒数千件規模にすることを目指しています。[プロジェクトサイト](https://tachyon.z.cash/overview/) |
| TAZ | Testnet Zcash（価値を持たないテスト用通貨）。 |
| Testnet | メインネット前にアップグレードや機能をテストするための別ブロックチェーンです。 |
| Trailing Finality Layer (TFL) | マイニングを置き換えることなく、Zcash の proof-of-work チェーンの背後にファイナリティレイヤーを追加し、直近のブロックを確定できるようにする研究です。Crosslink はこの研究から生まれた設計です。 |
| Transaction | ユーザー間の支払いであり、ネットワークに送信され、最終的にブロック内で確認されます。 |
| Transaction Expiry | トランザクションは未確認のまま約 25 分（20 ブロック）経過すると期限切れとなり、資金は自動的に戻ります。 |
| Transaction Fee | デフォルト手数料は 0.0001 ZEC です。高い手数料ほど優先され、非常に低い手数料は遅延や期限切れの原因となる場合があります。 |
| Transparent Address | taddr とも呼ばれます。t で始まります。完全に公開されています（Bitcoin のように）。 |
| Transparent Transaction | Transparent アドレス間のみで行われるトランザクションで、すべてが公開可視です。 |
| Turnstile | 各シールド済みプールにどれだけの価値が入り、どれだけの価値が出たかを追跡する会計ルールで、どのプールも流入した量を超えて流出させられないようにします。Zcash の歴史におけるすべてのプール移行で使われており、現在は Orchard から Ironwood への移行を保護しています。[詳細](/zcash-tech/the-turnstile) |

## U

| Term | Definition |
|------|-----------|
| Unified Address | 1 つの文字列で Transparent 支払いと Shielded 支払いの両方に対応する、現代的なアドレス形式です（NU5 で導入）。 |
| Upgrade Activation | ネットワークアップグレード（例: NU5、NU6）が自動的に有効化される特定のブロック高です。 |

## V

| Term | Definition |
|------|-----------|
| Viewing Key | 資金を使うことなく、Shielded アドレスの残高とトランザクション履歴を閲覧できる秘密鍵です。 |

## W

| Term | Definition |
|------|-----------|
| Wallet | 秘密鍵を保存し、ZEC の送受信を可能にするソフトウェアまたはハードウェアです。アクティブなウォレットには、ZODL（iOS/Android）、Zingo!（モバイル/デスクトップ）、Nighthawk（Android）、YWallet、Zallet（今後登場予定）、Keystone（ハードウェア）があります。完全な一覧は [Zcash Ecosystem Wallets](https://z.cash/ecosystem/?wallets=#tag-wallets) を参照してください |
| WebZjs | ブラウザ環境向けにChainSafeが構築した、Zcash 初のJavaScript SDKです。これは、シールド化された ZEC を MetaMask にもたらした Zcash Shielded Wallet snap の基盤となっています。 |

## X

| Term | Definition |
|------|-----------|
| XZC | 一部の旧式な取引所で使われていた、Zcash の古いティッカーシンボルです。公式ティッカーは ZEC です。 |

## Y

| Term | Definition |
|------|-----------|
| YWallet | Orchard、Sapling、transparent アドレスをサポートする、プライバシー重視の Zcash ウォレットで、高速な同期で知られています。現在はメンテナンスされていません。開発者が Ironwood への更新を行わないことを確認しており、そのためネットワークに追随できなくなっています。同じ開発者による Zkool が、現在メンテナンスされている後継です。 |

## Z

| Term | Definition |
|------|-----------|
| Zcash | zk-SNARKs を使用する、プライバシー重視の暗号通貨です。transparent（Bitcoin 風）支払いと完全な shielded 支払いを橋渡しします。 |
| Zcash Foundation | Zcash エコシステムを支援し、開発に資金を提供し、プライバシーを推進する独立系非営利組織です。 |
| Zcash Network | トランザクションを検証し、ブロックチェーンを維持するノードのピアツーピアネットワークです。 |
| ZEC | Zcash の公式通貨コードです（一部の取引所では今でも XZC と表示されます）。 |
| Zerocash | Zcash の基盤となった学術プロトコル（2014 年）です。 |
| Zaino | lightwalletd を置き換える次世代 Zcash インデクサーで、Zcash Foundation によって構築されています。ライトクライアントがより高速かつよりプライベートに同期できるようにします。Zcash Z3 インフラアップグレードの一部です。 |
| Zakura | 2026 年 7 月に公開された Zcash フルノード実装で、Valar Group と Project Tachyon により Zebra のフォークとして構築されました。スループットと同期速度を重視しており、スナップショットによるブートストラップと、毎秒約 50,000 トランザクションというカードネットワーク規模を目標に掲げています。[zakura.com](https://zakura.com) |
| Zallet | zcashd の廃止時にそのウォレット機能を引き継いだウォレットコンポーネントで、Zcash Z3 インフラ作業の一環として Zaino 上に構築されています。 |
| Zebra | Zcash Foundation による Rust ベースのフルノード実装です（zcashd の代替）。本番利用可能で、活発に保守されています。[GitHub](https://github.com/ZcashFoundation/zebra) |
| zcashd | Bitcoin Core からフォークされた、元祖 Zcash フルノードです。長期間の非推奨化を経て 2026 年 7 月に廃止され、その役割はコンセンサス用の Zebra とウォレット機能用の Zallet に分割されました。 |
| ZIP | Zcash Improvement Proposal — プロトコル変更を提案し承認するために使われる、コミュニティのガバナンスプロセスです。[ZIP Repository](https://github.com/zcash/zips) |
| ZODL | Zcash Open Development Lab の略です。2026 年初頭に、Bootstrap とのガバナンス上の対立を受けて辞任した Josh Swihart と元 Electric Coin Company のエンジニアリングチームによって設立された独立組織です。2026 年 3 月に 2,500 万ドル超のシード資金を調達し、2026 年 2 月に Zashi から改名された Zodl ウォレットを維持しています。[zodl.com](https://zodl.com) |
| zk-SNARKs | Zero-Knowledge Succinct Non-Interactive Arguments of Knowledge — Zcash の shielded トランザクションを支える暗号技術です。秘密情報を一切明かさずに、ある主張（たとえば有効な支出）を証明できます。 |
| ZSA (Zcash Shielded Assets) | Zcash の shielded プライバシーを継承するユーザー発行トークンで、ZEC 以外の資産もネットワーク上でプライベートに移転できるようにします。[ZIP 226](https://zips.z.cash/zip-0226) で仕様化されており、NU7 の候補機能です。 |

---

**最終更新:** 2026年7月
**貢献したいですか？** [GitHub でこのページを編集](https://github.com/ZecHub/zechub/edit/main/site/Glossary_and_FAQs/Zcash_Library.md)
