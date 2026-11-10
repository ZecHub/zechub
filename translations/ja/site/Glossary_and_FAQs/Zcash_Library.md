# Zcash ライブラリ

Zcashに関連する主要な用語、概念、リソースを網羅した用語集です。リリースノート、フォーラムのスレッド、またはウォレットの変更履歴に出てくる用語を調べるための唯一のライブラリです。

### クイックナビゲーション
[A](#a) | [B](#b) | [C](#c) | [D](#d) | [E](#e) | [F](#f) | [G](#g) | [H](#h) | [I](#i) | [J](#j) | [K](#k) | [L](#l) | [M](#m) | [N](#n) | [O](#o) | [P](#p) | [Q](#q) | [R](#r) | [S](#s) | [T](#t) | [U](#u) | [V](#v) | [W](#w) | [X](#x) | [Y](#y) | [Z](#z)

---

## A

| 用語 | 定義 |
|------|-----------|
| Actions | 各支出と出力ごとに複数の個別のproofを作成する代わりに、Orchardプロトコルはそれらを単一のアクションに統合します。 |
| Addresses | Zcashにはシールドされた（Shielded）アドレス（zaddr）と公開型（Transparent）アドレス（taddr）があります。統合アドレス（Unified Addresses、UA）は複数の受信者タイプをまとめ、送信側ウォレットが双方で対応している最適なものを選べるようにします。[ZIP 316](https://zips.z.cash/zip-0316)で規定されています。[統合アドレス](/zcash-tech/unified-addresses) |
| Arborist Call | Zcashプロトコルおよび研究開発の最新情報を扱う隔週の通話です。ZcashコミュニティフォーラムおよびDiscordで開催されます。[会議メモ](https://github.com/ZcashCommunityGrants/arboretum-notes) / [フォーラムのお知らせ](https://forum.zcashcommunity.com) |
| Auto-shielding | ユーザー、より具体的にはそのウォレットが、公開型アドレスから最新のシールドされたZECプールへ資金を自動的に移動できるようにします。 |

## B

| 用語 | 定義 |
|------|-----------|
| Benchmarking | マイナーは、Zcashのマイニングに使用されるさまざまなハードウェアの効率に関する指標を提出できます。[こちらを見る](https://zcashbenchmarks.info) |
| Block | ブロックとは、ネットワーク上で送信された一連のトランザクションを含むZcashブロックチェーン上の記録です。平均して約75秒ごとに、新しいブロックがブロックチェーンに追加されます。 |
| Block Explorer | ブロックチェーン上の過去および現在のすべてのトランザクションを確認するためのオンラインツールです。[Zcash ブロックエクスプローラー](https://zcashexplorer.app/) |
| Blogs | [ZODL ブログ（旧Electric Coin Co）](https://zodl.com/blog/) / [Zcash Foundation ブログ](https://zfnd.org/blog/) / [ZecHub ニュースレター](https://zechub.substack.com/) |
| Blossom | Zcashの第3回主要ネットワークアップグレードです。[詳細情報](https://zcash.readthedocs.io/en/latest/rtd_pages/nu_dev_guide.html?highlight=orchard#blossom) |

## C

| 用語 | 定義 |
|------|-----------|
| Canopy | Zcashの第5回主要ネットワークアップグレードです。[詳細情報](https://zcash.readthedocs.io/en/latest/rtd_pages/nu_dev_guide.html?highlight=orchard#canopy) |
| Commitment Scheme | コミッターが短い文字列を用いて多項式にコミットし、検証者がその文字列を使用してコミットされた多項式の主張された評価値を確認できるようにします。Zcashプロトコルにおける通信コストの削減に役立ちます。 |
| Community | [公式Zcashコミュニティフォーラム](https://forum.zcashcommunity.com) / [Zcash コミュニティ Discord](https://discord.com/channels/669694001464737815/669694001921654794) / [Zcash R&D Discord](https://discord.com/invite/6AK7keWFaK) / [Reddit](https://www.reddit.com/r/zec/) / [Telegram](https://t.me/Zcash_Community) / [Twitter](https://x.com/zcash) |
| Crosslink | proof of stakeをZcashの既存のproof of workと並行して実行する、提案されたハイブリッドコンセンサス設計です。Shielded Labsがこの作業を主導し、`zebra-crosslink`リポジトリでプロトタイプを維持しています。Crosslinkは現在Zcashの一部ではありません。[Crosslinkプロトコル](/zcash-tech/crosslink-protocol) |
| CrossPay | ZODLウォレットの機能で、シールドされたZECを支出しながら、受取人が希望する資産とチェーンで支払いを受けられるようにします。中央集権型取引所ではなくNEAR Intentsを経由します。 |
| Cypherpunk Zero | ECC、イラストレーターのStranger Wolf、Mighty Jaxx、および選ばれたエコシステムパートナーによるクリエイティブユニバースおよび協働プロジェクトです。[Cypherpunk Zero ソーシャル](https://x.com/cypherpunkZero) / [OpenSea コレクション](https://opensea.io/collection/cypherpunk-zero) |

## D

| 用語 | 定義 |
|------|-----------|
| DeFi | ZECをDeFiと統合するプロジェクト：[Maya Protocol](https://www.mayaprotocol.com/ecosystem#user-interfaces/) / [NEAR Intents](https://near-intents.org/) / [ZenRock](https://app.zenrocklabs.io/) / [ShapeShift](https://app.shapeshift.com/) / [LeoDex](https://leodex.io/) / [THORSwap](https://app.thorswap.finance/) |
| Deshielding | zaddr（シールドされたアドレス）からtaddr（公開型アドレス）へ送信されるトランザクションを指します。トランザクションの送信元は表示されませんが、資金は公開表示される価値プールに入ります。 |
| Developer Resources | [Corrected from 開発者 per reviewer request. リソース](https://www.zcashcommunity.com/developers/) |
| Documentation | [公式ドキュメント](https://zcash.readthedocs.io/en/latest/) |

## E

| 用語 | 定義 |
|------|-----------|
| ECC | Zcashプロトコルを立ち上げたチームであるElectric Coin Companyは、以前はZcash Companyとして知られていました。そのエンジニアリングチーム全員は、Bootstrapの理事会とのガバナンス上の対立を受けて2026年1月に辞任し、その後ZODLを設立しました。 |
| ECDSA | 楕円曲線デジタル署名アルゴリズムは、暗号学的に安全なデジタル署名方式です。ECDSAの署名・検証アルゴリズムは、楕円曲線上の点の乗算に依存しています。 |
| Education | Zcashを解説する学習向け動画は[こちら](https://www.zcashcommunity.com/zcash-education/)でご覧いただけます。 |
| Encrypted Memos | シールドされたアドレスに送信されるトランザクション用の追加フィールドであり、支払いの受取人に表示されます。暗号化されたメモは送信者と受取人にのみ表示されます。 |
| Equihash | Zcashで使用される、メモリ指向のproof-of-workマイニングアルゴリズムです。 |
| Events | Zcash関連イベントのカレンダーは、[Luma](https://luma.com/zcash)および[Zcash Foundation](https://zfnd.org/zf-events/)で確認できます。 |
| Exchanges | [Zcashに対応する取引所の一覧](https://z.cash/exchanges/) |

## F

| 用語 | 定義 |
|------|-----------|
| Fiat-Shamir | 対話型の知識proofを基にデジタル署名を作成する技法です。これにより、基礎となる情報を明らかにせずに、ある事実（たとえば秘密を知っていること）を公開で証明できます。 |
| Formal Verification | テストだけに依存するのではなく、システムが仕様どおりに正確に動作することを数学的に証明することです。Ironwoodアクション回路は、健全性バグがないことを示すため、zkSecurityおよびZODLの貢献者によりLean定理証明器を使用してこの方法で検証されました。 |
| Founders Reward | 創設者報酬はブロック報酬総額の20パーセントを占め、各ブロックの価値から差し引かれ、プロトコルの開発と成長を促進するために公開型で分配されます。 |
| Free2Z | Zcashを活用した、匿名コンテンツとプライベートな寄付のためのツールです。[Free2Z](https://free2z.com) |
| FROST | 柔軟なラウンド最適化型Schnorrしきい値署名方式です。[研究論文](https://eprint.iacr.org/2020/852) |

## G

| 用語 | 定義 |
|------|-----------|
| Governance | ZIPプロセスによる決定は、Zcash仕様およびネットワークを動作させるソフトウェアに書き込まれます。ネットワークの過半数がアップグレードを採用し、コンセンサスを損なわない場合、変更はオンチェーンで批准されます。[プロトコルの完全な履歴](https://zfnd.org/protocol-agreements-and-major-decisions/) |

## H

| 用語 | 定義 |
|------|-----------|
| Halo | トラステッドセットアップを必要とせずに回路のアップグレードを可能にし、Zcashシールドされたプロトコルを将来の改善および拡張により柔軟に対応できるものにします。[技術解説](https://z.cash/learn/what-is-halo-for-zcash/) |
| HD Wallet | 階層的決定性ウォレットは、1つのシードから一連の鍵ペアを生成し、高度なセキュリティに加えて利便性と管理性を提供します。 |
| Heartwood | Zcashの第4回主要ネットワークアップグレードです。[詳細情報](https://z.cash/upgrade/heartwood/) |

## I

| 用語 | 定義 |
|------|-----------|
| Index | CoinDeskのZCXインデックスは、Zcashの米ドル相当のリアルタイムスポットレートを示します。[価格インデックス](https://www.coindesk.com/indices/zcx/) |
| Integrations | 多数のサードパーティプロバイダーを通じて、Zcashによる支払いを受け付けることができます。[決済処理事業者](https://z.cash/zcash-for-business/) |
| Interactive Proof System | 2者間、すなわち証明者と検証者のメッセージ交換として計算をモデル化する抽象機械です。 |
| Investment | Zcashへのエクスポージャーを得たい機関投資家またはファミリーオフィスには、多数の金融オプションが利用可能です。[完全な一覧](https://z.cash/investors/) |
| Ironwood | ネットワークアップグレードNU6.3であり、2026年7月28日からブロック3,428,143でメインネット上で稼働しています。Ironwoodは、修正済みのOrchard回路に基づく新しいシールドされたプールを追加し、元のOrchardプールを封鎖するため、誰でも流通供給量が正しいことを確認できます。そのコンセンサスルールは[ZIP 258](https://zips.z.cash/zip-0258)で規定されています。[Ironwood](/zcash-tech/ironwood) |

## J

| 用語 | 定義 |
|------|-----------|
| JubJub | zk-SNARK回路で効率的に実装できるよう設計された楕円曲線です。 |

## K

| 用語 | 定義 |
|------|-----------|
| Keystone Wallet | ネイティブのZcash（Orchardシールドされた）サポートを備え、コールド署名のためにZODLと互換性があるエアギャップ型ハードウェアウォレットです。[Keystone](https://keyst.one) |

## L

| 用語 | 定義 |
|------|-----------|
| Layer-1 | 基盤ネットワークとその基礎インフラを指します。レイヤー1ブロックチェーンは、別のネットワークを必要とせずにトランザクションを検証し、確定できます。ZcashはL1ブロックチェーンです。 |
| librustzcash | Zcashを扱うためのすべてのクレートと依存関係を含むRustワークスペースです。[リポジトリ](https://github.com/zcash/librustzcash) |
| lightwalletd | ライトクライアントにブロックチェーン情報を提供するステートレスサーバーです。[lightwalletd](https://zcash.readthedocs.io/en/latest/rtd_pages/lightclient_support.html) |

## M

| 用語 | 定義 |
|------|-----------|
| Metrics | ネットワーク指標は[こちら](https://tokenterminal.com/explorer/projects/zcash/metrics/all)で確認できます。 |
| Metadata | ユーザーのZcashトランザクションとともに生成されるデータです。ブロック高、トランザクションバージョン、有効期限高などが含まれる場合があります。 |
| Mobile SDK | AndroidをZcashに接続する軽量SDKであり、サードパーティのAndroidアプリがシールドされたトランザクションを送受信できるようにします。[GitHub](https://github.com/zcash/zcash-android-wallet-sdk) |
| Mining | Zcashネットワーク内のノードが、各ブロックについて自己調整型の難易度に基づく解を見つけるため、複雑な数学的計算を行って競い合うプロセスです。[ガイド](https://z.cash/mining-zcash/) |
| Multisignature | 資金を支出するために複数の秘密鍵署名を必要とするアドレスです。現在、マルチシグ機能は公開型アドレスでのみサポートされています。 |

## N

| 用語 | 定義 |
|------|-----------|
| Network Sustainability Mechanism (NSM) | プロトコルの長期的なセキュリティ予算が発行に完全に依存しないよう、トランザクション手数料（transaction fees）の一部をバーンするというShielded Labsからの提案です。ZIP 234で規定されており、2026年にレビュー中です。 |
| Nighthawk | Zcash向けのモバイルウォレット（Mobile wallet）です。[ウェブサイト](https://nighthawkwallet.com) |
| Noir Wallet | Zcash Community GrantsがサポートするZcashのブラウザー拡張機能ウォレットであり、QRコードや手動送金に依存せず、シールドされた（shielded）ZECをブラウザーアプリケーションへ直接接続するために構築されています。[zknoir.com](https://www.zknoir.com/) |
| NU5 | Zcashの第6回主要ネットワークアップグレード（Network Upgrade）であり、Orchardシールドされたプール（shielded pool）と統合アドレス（Unified Addresses）を導入します。[詳細情報](https://zcash.readthedocs.io/en/latest/rtd_pages/nu_dev_guide.html#nu5) |
| NU6 | Zcashの第7回主要ネットワークアップグレードであり、ブロック補助金を調整してZcash Community Grantsプログラムおよび繰延developer基金ロックボックスに資金を提供します。2024年後半に有効化されました。[詳細情報](https://zcash.readthedocs.io/en/latest/rtd_pages/nu_dev_guide.html#nu6) |
| NU7 | Ironwood後のネットワークアップグレードで、2026年11月5日のメインネットを目標としています。[ZIP 259](https://zips.z.cash/zip-0259)によると、25秒ブロック（ZIP 218）、手数料の再循環を伴うネットワーク持続可能性メカニズム（ZIP 235および237）、およびバージョン4トランザクションの終了をもたらします。これにより、Sproutの資金は使用不能になります（ZIP 2003）。新しいトランザクション形式は追加されず、TachyonおよびZcash Shielded Assetsは含まれません。 |

## O

| 用語 | 定義 |
|------|-----------|
| Oblivious Synchronization | Project Tachyonで開発中の方法であり、ウォレットは信頼できないサーバーから必要なデータを要求する際、どのノートについて要求しているかを明かさずに済みます。プロトコルがヌリファイアを関連付け不能な方法で変化させるため、サーバーがヌリファイアを知ることはありません。[解説](https://seanbowe.com/blog/tachyon-scaling-zcash-oblivious-synchronization/) |
| Orchard | NU5で導入されたシールドされたプールです。健全性バグが発見された後、Ironwoodがこれを封鎖したため、Orchard内で送受信することはできなくなりました。資金はターンスタイルを通じてのみ出ることができます。[シールドされたプール](/using-zcash/shielded-pools) |
| Overwinter | Zcashの第1回ネットワークアップグレードです。[詳細情報](https://zcash.readthedocs.io/en/latest/rtd_pages/nu_dev_guide.html#overwinter) |

## P

| 用語 | 定義 |
|------|-----------|
| Payments | 多数の異なる決済プロバイダーを通じて、Zcashを日常の購入に使用できます。[決済アプリ](https://z.cash/pay-with-zcash/) |
| PCD (Proof-Carrying Data) | データが自身の正しさのproofとともに移動するプリミティブであり、データを組み合わせるとproofも組み合わさります。Project TachyonはPCDを中心にシールドされたプロトコルを再構築し、各ウォレットがチェーンを再スキャンする代わりに、自身の残高が正しいことを示す再帰的proofを保持できるようにします。Zcash実装は[Ragu](https://github.com/tachyon-zcash/ragu)であり、Haloに従い、トラステッドセットアップを必要としません。 |
| Peer-to-Peer Network | P2Pネットワークは分散型の概念に基づいています。ブロックチェーン技術の基盤アーキテクチャです。 |
| PIR (Private Information Retrieval) | サーバーにどの記録を要求したかを知られずに、サーバーから記録を取得できる技術です。ライトウォレットが探しているものを漏らさずに必要な情報を取得する方法として、Zcash向けに活発に研究されています。 |
| Podcast | [Radiolab（Zcash Ceremony）](https://archive.org/details/radiolab_podcast17crypto_zcash_ceremony) / [RealVisionFinance](https://www.youtube.com/watch?v=ibA_4kwd_YI) / [EthDenver](https://www.youtube.com/watch?v=t62isi58XcQ) / [UpOnlyPodcast](https://www.youtube.com/watch?v=AjC9T938o3Q) / [Zcast en Español](https://www.youtube.com/@ZcastEsp) |

## Q

| 用語 | 定義 |
|------|-----------|
| QR Code | 簡単にスキャンできるよう、Zcashアドレスをエンコードするために使用される機械可読コードです。統合アドレス（Unified Addresses、UAs）は、通常、現代のZcashウォレットでQRコードを通じて共有されます。 |
| Quantum Recoverability | Ironwoodノートの特性であり、[ZIP 2005](https://zips.z.cash/zip-2005)で規定されています。将来の量子コンピューターが現在それを保護している暗号技術を破った場合でも、コインのオンチェーン記録を回復可能に保ちます。これは量子耐性ではなく回復経路であり、Ironwoodノートに適用され、既存のSprout、Sapling、またはOrchard資金には適用されません。 |

## R

| 用語 | 定義 |
|------|-----------|
| Recovery Phrase | ウォレットのバックアップと復元に使用される、12または24個の英字と数字の連なりです。Zcashでは、このフレーズにより支出鍵とビューイングキーが再生成されるため、資金の回復とセキュリティにとって極めて重要です。 |

## S

| 用語 | 定義 |
|------|-----------|
| Sapling | シールドされたトランザクションに大幅な効率改善をもたらし、モバイルでの採用への道を開いた主要なネットワークアップグレードです。ブロック419200で有効化されました。 |
| Selective Disclosure | シールドされたアドレスの所有者が、ビューイングキーまたは支払い開示を第三者と選択的に共有できるようにし、それ以外のすべての人からデータを非公開に保ちます。 |
| Shielded Address | zaddrとも呼ばれます。zで始まります。zk-SNARKsを使用して、送信者、受信者、金額、メモを隠します。 |
| Shielded Labs | Zcashプロトコルの経済性とコンセンサスに取り組む独立組織です。現在はCrosslinkとネットワーク持続可能性メカニズムを主導しています。[GitHub](https://github.com/ShieldedLabs) |
| Shielded Transaction | シールドされたアドレス間のみで行われるトランザクションです。ブロックチェーン上で完全に非公開です。 |
| Sol/s | 1秒あたりのソリューション数であり、Equihashマイニングのパフォーマンスを測定します。 |
| Spending Key | シールドされたアドレスからの支出を可能にする秘密鍵です（残高と履歴の閲覧も可能です）。 |
| Sprout | Zcashのオリジナルのシールドされたプロトコルバージョンです（2016年開始）。 |

## T

| 用語 | 定義 |
|------|-----------|
| Tachyon | Zcashのスケーリングプログラムです。NU7（[ZIP 259](https://zips.z.cash/zip-0259)）の一部ではなく、有効化日はありません。すべてのブロックをスキャンする方式から、Corrected from 証明 per reviewer request.を伴うウォレット状態、オブリビアス同期、剪定可能なノード状態へとウォレットを移行させ、毎秒数千件のシールドされたスループットを目指します。[プロジェクトサイト](https://tachyon.z.cash/overview/) |
| TAZ | テストネットZcash（価値のないテスト通貨）です。 |
| Testnet | メインネットの前にアップグレードや機能をテストするための、独立したブロックチェーンです。 |
| Trailing Finality Layer (TFL) | マイニングを置き換えずに最近のブロックを確定できるよう、Zcashのプルーフ・オブ・ワークチェーンの背後にファイナリティ層を追加する研究です。Crosslinkは、これから生まれた設計です。 |
| Transaction | ユーザー間の支払いであり、ネットワークに送信され、最終的にブロックで承認されます。 |
| Transaction Expiry | トランザクションは未承認の場合、約25分（20ブロック）後に期限切れとなり、資金は自動的に戻ります。 |
| Transaction Fee | デフォルトの手数料は0.0001 ZECです。高い手数料は優先され、非常に低い手数料では遅延または期限切れが発生する可能性があります。 |
| Transparent Address | taddrとも呼ばれます。tで始まります。完全に公開されています（Bitcoinと同様です）。 |
| Transparent Transaction | 公開型アドレス間のみで行われるトランザクションであり、すべてが公開されます。 |
| Turnstile | 各シールドされたプールに入る価値と出る価値を追跡する会計ルールであり、どのプールも入った量を超えて放出できないようにします。Zcashの歴史におけるすべてのプール移行で使用されており、現在はOrchardからIronwoodへの移行を保護しています。[詳細情報](/zcash-tech/the-turnstile) |

## U

| 用語 | 定義 |
|------|-----------|
| Unified Address | NU5で導入された現代的なアドレス形式であり、1つの文字列で公開型とシールドされた両方の支払いに対応します。 |
| Upgrade Activation | ネットワークアップグレード（例：NU5、NU6）が自動的に有効化される特定のブロック高です。 |

## V

| 用語 | 定義 |
|------|-----------|
| Viewing Key | 資金を支出することなく、シールドされたアドレスの残高とトランザクション履歴を閲覧できる秘密鍵です。 |

## W

| 用語 | 定義 |
|------|-----------|
| Wallet | 秘密鍵を保存し、ZECの送受信を可能にするソフトウェアまたはハードウェアです。アクティブなウォレットには、ZODL（iOS/Android）、Zingo!（モバイル/デスクトップ）、Nighthawk（Android）、Zkool（モバイル/デスクトップ）、Zallet（近日公開）、Keystone（ハードウェア）があります。完全な一覧については、[Zcashエコシステムウォレット](https://z.cash/ecosystem/?wallets=#tag-wallets)をご覧ください。 |
| WebZjs | ブラウザー環境向けにChainSafeが構築した、Zcash向け初のJavaScript SDKです。シールドされたZECをMetaMaskにもたらしたZcash Shielded Wallet snapの基盤となっています。 |

## X

| 用語 | 定義 |
|------|-----------|
| XZC | 一部の旧式の取引所で使用されているZcashの古いティッカーシンボルです。公式ティッカーはZECです。 |

## Y

| 用語 | 定義 |
|------|-----------|
| YWallet | Orchard、Sapling、および公開型アドレスをサポートし、高速な同期で知られるプライバシー重視のZcashウォレットです。現在は保守されていません。そのdeveloperはIronwood向けに更新しないことを確認しているため、ネットワークを追跡できなくなっています。同じdeveloperによるZkoolが、保守されている後継です。 |

## Z

| 用語 | 定義 |
|------|-----------|
| Zcash | zk-SNARKsを使用するプライバシー重視の暗号通貨です。公開型（Bitcoin形式）と完全にシールドされた支払いを橋渡しします。 |
| Zcash Foundation | Zcashエコシステムを支援し、developmentに資金を提供し、プライバシーを促進する独立した非営利団体です。 |
| Zcash Network | トランザクションを検証し、ブロックチェーンを維持するノードのピアツーピアネットワークです。 |
| ZEC | Zcashの公式通貨コードです（一部の取引所では依然としてXZCと表示されます）。 |
| Z3 stack | zcashdを置き換える3つのプログラムです。ノード用のZebra、インデックス作成用のZaino、ウォレット用のZalletで構成されます。[Z3 stack](/zcash-tech/z3-stack) |
| Zerocash | Zcashの基盤となった学術プロトコル（2014年）です。 |
| Zaino | Zebraノードからウォレットデータを提供するインデクサーであり、Zingo LabsによってRustで記述されています。ライトウォレット向けにzcashdが以前行っていたインデックス作成作業を引き継ぎます。[Zaino](/zcash-tech/zaino) |
| Zakura | Sean BoweとDev Ojhaが主導する、スケールのために構築された独立したZcashフルノードです。より高速に同期し、ブロックをネイティブに剪定でき、依存するソフトウェア向けにその上でzcashdを実行できます。[Zakuraノード](/zcash-tech/zakura-node) |
| Zallet | zcashdウォレットを置き換えるウォレットです。最初から始めるのではなく、既存の`wallet.dat`を移行してください。[Zallet](/zcash-tech/zallet)および[Zalletクイックリファレンス](/using-zcash/zallet-quick-reference-guide) |
| Zebra | zcashdを置き換えるフルノードであり、Zcash Foundationによって保守されています。検証ノードが必要な場合は実行してください。[Zebraフルノード](/zcash-tech/zebra-full-node) |
| zcashd | オリジナルのZcashフルノードおよびウォレットで、現在は廃止されています。バージョン6.20.0は2026年7月18日にブロック3417100で自動停止し、NU6.3を一度もサポートしていません。代わりにZ3 stackまたはZakuraを実行してください。[移行ガイド](/guides/migration-guide-zcashd-to-zebrad-zallet) |
| ZIP | Zcash改善提案です。プロトコル変更を提案し承認するために使用される、コミュニティのガバナンスプロセスです。[ZIPリポジトリ](https://github.com/zcash/zips) |
| ZODL | Zcash Open Development Labです。Josh Swihartと旧Electric Coin Companyエンジニアリングチームが、Bootstrapとのガバナンス紛争を理由に辞任した後、2026年初頭に設立した独立組織です。2026年3月にシード資金として$25 million超を調達し、2026年2月にZashiから改名されたZODLウォレットを保守しています。[zodl.com](https://zodl.com) |
| zk-SNARKs | ゼロ知識簡潔非対話型知識論証であり、Zcashのシールドされたトランザクションを支える暗号技術です。秘密情報を一切明かさずに、文（例：有効な支出）をCorrected from 証明 per reviewer request.できます。 |
| ZSA (Zcash Shielded Assets) | Zcashのシールドされたプライバシーを継承する、ユーザー発行のトークンです。ZEC以外の資産をネットワーク上で非公開に移動できます。[ZIP 226](https://zips.z.cash/zip-0226)で規定されています。NU7（[ZIP 259](https://zips.z.cash/zip-0259)）の一部ではなく、有効化日はありません。 |

---

**最終更新：** 2026年10月
**貢献したいですか？** [GitHubでこのページを編集](https://github.com/ZecHub/zechub/edit/main/site/Glossary_and_FAQs/Zcash_Library.md)
