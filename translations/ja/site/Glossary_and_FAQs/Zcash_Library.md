# Zcash ライブラリ

Zcashに関連する主要な用語、概念、リソースの包括的な用語集です。リリースノート、フォーラムのスレッド、ウォレットの変更履歴にある用語を調べるための一元的なライブラリです。

### クイックナビゲーション
[A](#a) | [B](#b) | [C](#c) | [D](#d) | [E](#e) | [F](#f) | [G](#g) | [H](#h) | [I](#i) | [J](#j) | [K](#k) | [L](#l) | [M](#m) | [N](#n) | [O](#o) | [P](#p) | [Q](#q) | [R](#r) | [S](#s) | [T](#t) | [U](#u) | [V](#v) | [W](#w) | [X](#x) | [Y](#y) | [Z](#z)

---

## A

| 用語 | 定義 |
|------|-----------|
| Actions | 各SpendおよびOutputごとに複数の個別証明を作成する代わりに、Orchardプロトコルはそれらを単一のActionに統合します。 |
| Addresses | Zcashには、Shielded（zaddr）アドレスとTransparent（taddr）アドレスがあります。Unified Address（UA）は複数の受信者タイプをまとめ、送信側ウォレットが双方でサポートされる最適なものを選択できるようにします。[ZIP 316](https://zips.z.cash/zip-0316)で規定されています。[Unified Address](/zcash-tech/unified-addresses) |
| Arborist Call | Zcashプロトコルおよび研究開発の最新情報を扱う隔週の通話です。Zcash Community ForumおよびDiscordで開催されます。[会議メモ](https://github.com/ZcashCommunityGrants/arboretum-notes) / [フォーラム告知](https://forum.zcashcommunity.com) |
| Auto-shielding | ユーザー（より具体的にはそのウォレット）が、資金をTransparentアドレスから最新のShielded ZECプールへ自動的に移動できるようにします。 |

## B

| 用語 | 定義 |
|------|-----------|
| Benchmarking | マイナーは、Zcashのマイニングに使用されるさまざまなハードウェアの効率に関する指標を提出できます。[こちらを見る](https://zcashbenchmarks.info) |
| Block | ブロックは、ネットワーク上で送信された一連のトランザクションを含むZcashブロックチェーン上の記録です。平均しておよそ75秒ごとに、新しいブロックがブロックチェーンへ追加されます。 |
| Block Explorer | ブロックチェーン上の、過去および現在のすべてのトランザクションを閲覧するオンラインツールです。[Zcash ブロックエクスプローラー](https://zcashexplorer.app/) |
| Blogs | [ZODL ブログ（旧Electric Coin Co）](https://zodl.com/blog/) / [Zcash Foundation ブログ](https://zfnd.org/blog/) / [ZecHub ニュースレター](https://zechub.substack.com/) |
| Blossom | Zcashの第3回主要ネットワークアップグレード。[詳細情報](https://zcash.readthedocs.io/en/latest/rtd_pages/nu_dev_guide.html?highlight=orchard#blossom) |

## C

| 用語 | 定義 |
|------|-----------|
| Canopy | Zcashの第5回主要ネットワークアップグレード。[詳細情報](https://zcash.readthedocs.io/en/latest/rtd_pages/nu_dev_guide.html?highlight=orchard#canopy) |
| Commitment Scheme | コミッターが短い文字列を用いて多項式にコミットし、検証者がそれを使用してコミット済み多項式の主張された評価値を確認できるようにします。Zcashプロトコルにおける通信コストの削減に役立ちます。 |
| Community | [公式Zcashコミュニティフォーラム](https://forum.zcashcommunity.com) / [ZcashコミュニティDiscord](https://discord.com/channels/669694001464737815/669694001921654794) / [Zcash R&D Discord](https://discord.com/invite/6AK7keWFaK) / [Reddit](https://www.reddit.com/r/zec/) / [Telegram](https://t.me/Zcash_Community) / [Twitter](https://x.com/zcash) |
| Crosslink | プルーフ・オブ・ステークをZcashの既存のプルーフ・オブ・ワークと並行して実行する、提案中のハイブリッド型コンセンサス設計です。Shielded Labsが作業を主導し、`zebra-crosslink`リポジトリでプロトタイプを維持しています。Crosslinkは現時点でZcashの一部ではありません。[Crosslinkプロトコル](/zcash-tech/crosslink-protocol) |
| CrossPay | ZODLウォレットの機能で、Shielded ZECを使用しつつ、受取人が好む資産とチェーンで支払いを受けられるようにします。中央集権型取引所ではなくNEAR Intentsを経由します。 |
| Cypherpunk Zero | ECC、イラストレーターのStranger Wolf、Mighty Jaxx、および選ばれたエコシステムパートナーによるクリエイティブユニバースおよび協働プロジェクトです。[Cypherpunk Zero ソーシャル](https://x.com/cypherpunkZero) / [OpenSea コレクション](https://opensea.io/collection/cypherpunk-zero) |

## D

| 用語 | 定義 |
|------|-----------|
| DeFi | ZECをDeFiと統合するプロジェクト: [Maya Protocol](https://www.mayaprotocol.com/ecosystem#user-interfaces/) / [NEAR Intents](https://near-intents.org/) / [ZenRock](https://app.zenrocklabs.io/) / [ShapeShift](https://app.shapeshift.com/) / [LeoDex](https://leodex.io/) / [THORSwap](https://app.thorswap.finance/) |
| Deshielding | zaddr（Shieldedアドレス）からtaddr（Transparentアドレス）へ送信されるトランザクションを指します。トランザクションの発信元は見えませんが、資金は公開閲覧可能な価値プールに入ります。 |
| Developer Resources | [開発者向けリソース](https://www.zcashcommunity.com/developers/) |
| Documentation | [公式ドキュメント](https://zcash.readthedocs.io/en/latest/) |

## E

| 用語 | 定義 |
|------|-----------|
| ECC | Zcashプロトコルを立ち上げたチームであるElectric Coin Companyは、以前はZcash Companyとして知られていました。Bootstrap理事会とのガバナンス紛争を受け、エンジニアリングチーム全員が2026年1月に辞任し、その後ZODLを設立しました。 |
| ECDSA | Elliptic Curve Digital Signature Algorithmは、暗号学的に安全なデジタル署名方式です。ECDSAの署名／検証アルゴリズムは、楕円曲線上の点の乗算に依存します。 |
| Education | Zcashを解説する学習向け動画は[こちら](https://www.zcashcommunity.com/zcash-education/) |
| Encrypted Memos | Shieldedアドレスに送信されるトランザクション用の追加フィールドで、支払いの受取人に表示されます。暗号化メモは送信者と受取人にのみ表示されます。 |
| Equihash | Zcashで使用される、メモリ指向のプルーフ・オブ・ワーク・マイニングアルゴリズムです。 |
| Events | Zcash関連イベントのカレンダーは、[Luma](https://luma.com/zcash)および[Zcash Foundation](https://zfnd.org/zf-events/)で閲覧できます。 |
| Exchanges | [Zcashをサポートする取引所一覧](https://z.cash/exchanges/) |

## F

| 用語 | 定義 |
|------|-----------|
| Fiat-Shamir | 対話型の知識証明を、それに基づくデジタル署名へと変換する手法です。これにより、基礎となる情報を明かすことなく、ある事実（例: 秘密を知っていること）を公開で証明できます。 |
| Formal Verification | テストのみに依存するのではなく、システムが仕様どおりに正確に動作することを数学的に証明することです。Ironwood Action回路は、健全性バグがないことを示すため、Lean定理証明支援系を用いてzkSecurityおよびZODLのコントリビューターによりこの方法で検証されました。 |
| Founders Reward | Founders Rewardはブロック報酬総額の20パーセントを占め、各ブロックの価値から差し引かれ、プロトコルの開発と成長を促進するために透明に分配されます。 |
| Free2Z | Zcashを活用した、匿名コンテンツおよびプライベート寄付のためのツールです。[Free2Z](https://free2z.com) |
| FROST | 柔軟なラウンド最適化型Schnorr閾値署名方式。[研究論文](https://eprint.iacr.org/2020/852) |

## G

| 用語 | 定義 |
|------|-----------|
| Governance | ZIPプロセスでの決定は、Zcash仕様およびネットワークを実行するソフトウェアに記載されます。ネットワークの過半数がアップグレードを採用し、コンセンサスを壊さなければ、変更はオンチェーンで承認されます。[完全なプロトコル履歴](https://zfnd.org/protocol-agreements-and-major-decisions/) |

## H

| 用語 | 定義 |
|------|-----------|
| Halo | 信頼できるセットアップを必要とせずに回路をアップグレードできるようにし、Zcash Shieldedプロトコルを将来の改善や拡張に対してより機敏にします。[技術解説](https://z.cash/learn/what-is-halo-for-zcash/) |
| HD Wallet | 階層的決定性ウォレットは、1つのシードから一連の鍵ペアを生成し、高水準のセキュリティに加えて利便性と管理性を提供します。 |
| Heartwood | Zcashの第4回主要ネットワークアップグレード。[詳細情報](https://z.cash/upgrade/heartwood/) |

## I

| 用語 | 定義 |
|------|-----------|
| Index | CoinDeskのZCX Indexは、ZcashのリアルタイムなUSD換算スポットレートを表します。[価格インデックス](https://www.coindesk.com/indices/zcx/) |
| Integrations | 多数のサードパーティプロバイダーを通じてZcash支払いを受け付けることができます。[決済処理業者](https://z.cash/zcash-for-business/) |
| Interactive Proof System | 計算を、ProverとVerifierという二者間でのメッセージ交換としてモデル化する抽象機械です。 |
| Investment | Zcashへのエクスポージャーを得たい機関投資家やファミリーオフィス向けに、多数の金融オプションが用意されています。[完全な一覧](https://z.cash/investors/) |
| Ironwood | ネットワークアップグレードNU6.3。2026年7月28日、ブロック3,428,143以降、メインネットで稼働しています。Ironwoodは修正済みのOrchard回路に基づく新しいShieldedプールを追加し、元のOrchardプールを封印することで、誰もが流通供給量の健全性を確認できるようにします。コンセンサスルールは[ZIP 258](https://zips.z.cash/zip-0258)で規定されています。[Ironwood](/zcash-tech/ironwood) |

## J

| 用語 | 定義 |
|------|-----------|
| JubJub | zk-SNARK回路で効率的に実装できるよう設計された楕円曲線です。 |

## K

| 用語 | 定義 |
|------|-----------|
| Keystone Wallet | ネイティブのZcash（Orchard Shielded）サポートを備え、コールド署名のためにZODLと互換性がある、エアギャップ型ハードウェアウォレットです。[Keystone](https://keyst.one) |

## L

| 用語 | 定義 |
|------|-----------|
| Layer-1 | 基盤ネットワークとその基礎インフラを指します。Layer-1ブロックチェーンは、別のネットワークを必要とせずにトランザクションを検証および確定できます。ZcashはL1ブロックチェーンです。 |
| librustzcash | Zcashを扱うためのすべてのクレートと依存関係を含むRustワークスペースです。[リポジトリ](https://github.com/zcash/librustzcash) |
| lightwalletd | ライトクライアントにブロックチェーン情報を提供するステートレスサーバーです。[lightwalletd](https://zcash.readthedocs.io/en/latest/rtd_pages/lightclient_support.html) |

## M

| 用語 | 定義 |
|------|-----------|
| Metrics | ネットワークメトリクスは[こちら](https://tokenterminal.com/explorer/projects/zcash/metrics/all)で確認できます。 |
| Metadata | ユーザーのZcashトランザクションとともに生成されるデータです。これにはブロック高、トランザクションバージョン、失効高などが含まれます。 |
| Mobile SDK | AndroidをZcashへ接続する軽量SDKで、サードパーティのAndroidアプリがShieldedトランザクションを送受信できるようにします。[GitHub](https://github.com/zcash/zcash-android-wallet-sdk) |
| Mining | Zcashネットワーク内のノードが、各ブロックについて自己調整される難易度に基づく解を見つけるため、複雑な数学計算を行って競い合うプロセスです。[ガイド](https://z.cash/mining-zcash/) |
| Multisignature | 資金を使用するために複数の秘密鍵署名を必要とするアドレスです。現在、マルチシグ機能はTransparentアドレスでのみサポートされています。 |

## N

| 用語 | 定義 |
|------|-----------|
| Network Sustainability Mechanism (NSM) | プロトコルの長期的なセキュリティ予算が発行量だけに依存しないよう、取引手数料の一部をバーンするShielded Labsからの提案です。ZIP 234で規定され、2026年に審査中です。 |
| Nighthawk | Zcash向けのモバイルウォレットです。[ウェブサイト](https://nighthawkwallet.com) |
| Noir Wallet | Zcash Community GrantsによってサポートされるZcashブラウザ拡張ウォレットで、QRコードや手動送金に頼らず、Shielded ZECをブラウザアプリケーションへ直接接続するために作られています。[zknoir.com](https://www.zknoir.com/) |
| NU5 | Zcashの第6回主要ネットワークアップグレードで、Orchard ShieldedプールおよびUnified Addressを導入しました。[詳細情報](https://zcash.readthedocs.io/en/latest/rtd_pages/nu_dev_guide.html#nu5) |
| NU6 | Zcashの第7回主要ネットワークアップグレードで、Zcash Community GrantsプログラムおよびDeferred Dev Fund Lockboxに資金を供給するため、ブロック補助金を調整しました。2024年後半に有効化されました。[詳細情報](https://zcash.readthedocs.io/en/latest/rtd_pages/nu_dev_guide.html#nu6) |
| NU7 | Ironwoodに続くネットワークアップグレードで、2026年11月5日のメインネット導入を目標としています。[ZIP 259](https://zips.z.cash/zip-0259)により、25秒ブロック（ZIP 218）、手数料リサイクルを伴うNetwork Sustainability Mechanism（ZIP 235および237）、およびバージョン4トランザクションの廃止が導入されます。これにより、Sprout資金は使用不能になります（ZIP 2003）。新しいトランザクション形式は追加されず、TachyonおよびZcash Shielded Assetsはその一部ではありません。 |

## O

| 用語 | 定義 |
|------|-----------|
| Oblivious Synchronization | Project Tachyonで開発中の手法で、ウォレットが、どのノートについて問い合わせているかを明かすことなく、信頼できないサーバーに必要なデータを要求できるようにします。プロトコルによりnullifierがリンク不可能な形で変化するため、サーバーがあなたのnullifierを知ることはありません。[解説](https://seanbowe.com/blog/tachyon-scaling-zcash-oblivious-synchronization/) |
| Orchard | NU5で導入されたShieldedプールです。健全性バグの発見後、Ironwoodがこれを封印したため、Orchard内で送受信することはできなくなりました。資金はターンスタイルを通じてのみ出ることができます。[Shieldedプール](/using-zcash/shielded-pools) |
| Overwinter | Zcashの第1回ネットワークアップグレード。[詳細情報](https://zcash.readthedocs.io/en/latest/rtd_pages/nu_dev_guide.html#overwinter) |

## P

| 用語 | 定義 |
|------|-----------|
| Payments | 多数の異なる決済プロバイダーを通じて、日常の購入にZcashを使用できます。[決済アプリ](https://z.cash/pay-with-zcash/) |
| PCD (Proof-Carrying Data) | データがそれ自体の正しさの証明とともに移動するプリミティブであり、データを組み合わせると証明も組み合わされます。Project TachyonはShieldedプロトコルをPCD中心に再構築し、各ウォレットがチェーンを再スキャンする代わりに、自身の残高が正しいことの再帰的証明を保持できるようにします。Zcashの実装は[Ragu](https://github.com/tachyon-zcash/ragu)で、Haloに従い、信頼できるセットアップを必要としません。 |
| Peer-to-Peer Network | P2Pネットワークは、分散化の概念に基づいています。ブロックチェーン技術の基盤アーキテクチャです。 |
| PIR (Private Information Retrieval) | サーバーにどのレコードを要求したかを知られずに、サーバーからレコードを取得できる手法です。ライトウォレットが探しているものを漏らさずに必要なものを取得する方法として、Zcash向けに活発な研究が行われています。 |
| Podcast | [Radiolab（Zcash Ceremony）](https://archive.org/details/radiolab_podcast17crypto_zcash_ceremony) / [RealVisionFinance](https://www.youtube.com/watch?v=ibA_4kwd_YI) / [EthDenver](https://www.youtube.com/watch?v=t62isi58XcQ) / [UpOnlyPodcast](https://www.youtube.com/watch?v=AjC9T938o3Q) / [Zcast en Español](https://www.youtube.com/@ZcastEsp) |

## Q

| 用語 | 定義 |
|------|-----------|
| QR Code | Zcashアドレスを簡単にスキャンできるようエンコードするための、機械可読コード。Unified Address（UA）は、現代的なZcashウォレットでは通常QRコードを通じて共有されます。 |
| Quantum Recoverability | [ZIP 2005](https://zips.z.cash/zip-2005)で規定されたIronwoodノートの性質。将来の量子コンピューターが現在それを保護している暗号技術を破った場合でも、コインのオンチェーン記録を回復可能な状態に保ちます。これは量子耐性ではなく回復経路であり、既存のSprout、Sapling、Orchard資金ではなく、Ironwoodノートに適用されます。 |

## R

| 用語 | 定義 |
|------|-----------|
| Recovery Phrase | ウォレットのバックアップと復元に使用される、12または24個の英数字の並び。Zcashでは、このフレーズによって支出キーと閲覧キーが再生成されるため、資金の回復とセキュリティに不可欠です。 |

## S

| 用語 | 定義 |
|------|-----------|
| Sapling | シールドトランザクションの効率を大幅に改善し、モバイルでの普及への道を開いた大規模なネットワークアップグレード。ブロック419200で有効化されました。 |
| Selective Disclosure | シールドアドレスの所有者が、他のすべての人からデータを非公開に保ちながら、閲覧キーまたは支払い開示を第三者と選択的に共有できるようにします。 |
| Shielded Address | zaddrとも呼ばれます。zで始まります。zk-SNARKsを使用して、送信者、受信者、金額、メモを隠します。 |
| Shielded Labs | Zcashのプロトコル経済学とコンセンサスに取り組む独立組織。現在はCrosslinkとNetwork Sustainability Mechanismを主導しています。[GitHub](https://github.com/ShieldedLabs) |
| Shielded Transaction | シールドアドレス間だけで行われるトランザクション。ブロックチェーン上では完全に非公開です。 |
| Sol/s | 1秒あたりのソリューション数。Equihashマイニングの性能を測定します。 |
| Spending Key | シールドアドレスからの支出を可能にする秘密鍵（残高と履歴の閲覧も可能）。 |
| Sprout | Zcashの最初のシールドプロトコルバージョン（2016年開始）。 |

## T

| 用語 | 定義 |
|------|-----------|
| Tachyon | Zcashのスケーリングプログラム。NU7（[ZIP 259](https://zips.z.cash/zip-0259)）の一部ではなく、有効化日はありません。すべてのブロックをスキャンする方式から、証明を伴うウォレット状態、オブリビアス同期、剪定可能なノード状態へとウォレットを移行させ、毎秒数千件規模のシールドトランザクション処理能力を目指します。[プロジェクトサイト](https://tachyon.z.cash/overview/) |
| TAZ | Testnet Zcash（価値のないテスト通貨）。 |
| Testnet | メインネットの前にアップグレードや機能をテストするための、独立したブロックチェーン。 |
| Trailing Finality Layer (TFL) | マイニングを置き換えることなく、直近のブロックを確定できるようにするため、Zcashのプルーフ・オブ・ワークチェーンの後方にファイナリティ層を追加する研究。Crosslinkはそこから生まれた設計です。 |
| Transaction | ユーザー間の支払いで、ネットワークに送信され、最終的にブロック内で承認されます。 |
| Transaction Expiry | 未承認の場合、トランザクションは約25分（20ブロック）後に失効し、資金は自動的に戻ります。 |
| Transaction Fee | デフォルト手数料は0.0001 ZECです。高い手数料には優先順位が与えられ、非常に低い手数料では遅延または失効する可能性があります。 |
| Transparent Address | taddrとも呼ばれます。tで始まります。完全に公開されています（Bitcoinと同様）。 |
| Transparent Transaction | トランスペアレントアドレス間だけで行われるトランザクション。すべてが公開されます。 |
| Turnstile | 各シールドプールに入る価値と出る価値を追跡し、どのプールも流入量を超えて放出できないようにする会計ルール。Zcashの歴史におけるすべてのプール移行で使用され、現在はOrchardからIronwoodへの移行を保護しています。[詳細情報](/zcash-tech/the-turnstile) |

## U

| 用語 | 定義 |
|------|-----------|
| Unified Address | NU5で導入された、トランスペアレント支払いとシールド支払いの両方に1つの文字列で対応する現代的なアドレス形式。 |
| Upgrade Activation | ネットワークアップグレード（例：NU5、NU6）が自動的に有効化される特定のブロック高。 |

## V

| 用語 | 定義 |
|------|-----------|
| Viewing Key | 資金を支出することなく、シールドアドレスの残高とトランザクション履歴を閲覧できる秘密鍵。 |

## W

| 用語 | 定義 |
|------|-----------|
| Wallet | 秘密鍵を保管し、ZECの送受信を可能にするソフトウェアまたはハードウェア。利用可能なウォレットには、ZODL（iOS/Android）、Zingo!（モバイル/デスクトップ）、Nighthawk（Android）、Zkool（モバイル/デスクトップ）、Zallet（近日公開）、Keystone（ハードウェア）があります。完全な一覧は、[Zcashエコシステムウォレット](https://z.cash/ecosystem/?wallets=#tag-wallets)を参照してください。 |
| WebZjs | ブラウザー環境向けにChainSafeが構築した、Zcashの最初のJavaScript SDK。シールドZECをMetaMaskにもたらしたZcash Shielded Wallet snapの基盤となっています。 |

## X

| 用語 | 定義 |
|------|-----------|
| XZC | 一部の旧式取引所で使われているZcashの旧ティッカーシンボル。公式ティッカーはZECです。 |

## Y

| 用語 | 定義 |
|------|-----------|
| YWallet | Orchard、Sapling、トランスペアレントアドレスをサポートし、高速同期で知られるプライバシー重視のZcashウォレット。すでに保守されていません。開発者はIronwood向けに更新しないことを確認しているため、ネットワークを追跡できなくなりました。同じ開発者によるZkoolが、現在保守されている後継です。 |

## Z

| 用語 | 定義 |
|------|-----------|
| Zcash | zk-SNARKsを使用するプライバシー重視の暗号通貨。トランスペアレントな支払い（Bitcoin型）と完全にシールドされた支払いを橋渡しします。 |
| Zcash Foundation | Zcashエコシステムを支援し、開発資金を提供し、プライバシーを推進する独立した非営利組織。 |
| Zcash Network | トランザクションを検証し、ブロックチェーンを維持するノードのピアツーピアネットワーク。 |
| ZEC | Zcashの公式通貨コード（現在もXZCと表示する取引所があります）。 |
| Z3 stack | zcashdを置き換える3つのプログラム。ノード用のZebra、インデックス作成用のZaino、ウォレット用のZalletです。[Z3 stack](/zcash-tech/z3-stack) |
| Zerocash | Zcashの基礎となった学術プロトコル（2014年）。 |
| Zaino | Zebraノードからウォレットデータを提供するインデクサ。Zingo LabsがRustで記述しています。これは、zcashdがライトウォレット向けに行っていたインデックス作成作業を引き継ぎます。[Zaino](/zcash-tech/zaino) |
| Zakura | Sean BoweとDev Ojhaが主導する、スケール向けに構築された独立したZcashフルノード。より高速に同期し、ブロックをネイティブで剪定でき、依存するソフトウェアのために自身の上でzcashdを実行できます。[Zakuraノード](/zcash-tech/zakura-node) |
| Zallet | zcashdウォレットを置き換えるウォレット。最初からやり直すのではなく、既存の`wallet.dat`を移行してください。[Zallet](/zcash-tech/zallet)および[Zalletクイックリファレンス](/using-zcash/zallet-quick-reference-guide) |
| Zebra | zcashdを置き換えるフルノードで、Zcash Foundationが保守しています。検証ノードが必要な場合に実行してください。[Zebraフルノード](/zcash-tech/zebra-full-node) |
| zcashd | 元のZcashフルノードおよびウォレットで、現在は廃止されています。バージョン6.20.0は2026年7月18日にブロック3417100で自動停止し、NU6.3をサポートしたことはありません。代わりにZ3 stackまたはZakuraを実行してください。[移行ガイド](/guides/migration-guide-zcashd-to-zebrad-zallet) |
| ZIP | Zcash Improvement Proposal。プロトコル変更の提案と承認に用いられるコミュニティガバナンスプロセスです。[ZIPリポジトリ](https://github.com/zcash/zips) |
| ZODL | Zcash Open Development Lab。Bootstrapとのガバナンスをめぐる対立を理由に辞任した元Electric Coin CompanyエンジニアリングチームとJosh Swihartが、2026年初頭に設立した独立組織です。2026年3月にシード資金として2,500万ドル超を調達し、2026年2月にZashiから改名されたZODLウォレットを保守しています。[zodl.com](https://zodl.com) |
| zk-SNARKs | Zero-Knowledge Succinct Non-Interactive Arguments of Knowledge — Zcashのシールドトランザクションを支える暗号技術。秘密情報を一切明かさずに、文（例：有効な支出）を証明できます。 |
| ZSA (Zcash Shielded Assets) | ユーザー発行トークン。Zcashのシールドされたプライバシーを継承し、ZEC以外の資産もネットワーク上で非公開に移動できるようにします。[ZIP 226](https://zips.z.cash/zip-0226)で規定されています。NU7（[ZIP 259](https://zips.z.cash/zip-0259)）の一部ではなく、有効化日はありません。 |

---

**最終更新：** 2026年10月
**貢献したいですか？** [GitHubでこのページを編集する](https://github.com/ZecHub/zechub/edit/main/site/Glossary_and_FAQs/Zcash_Library.md)
