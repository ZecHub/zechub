---
published: 2024-01-12 
---

<a href="https://github.com/zechub/zechub/edit/main/site/Research/ZK_Shielded_Asset_Platforms.md" target="_blank">
  <img src="https://img.shields.io/badge/Edit-blue" alt="Edit Page"/>
</a>


# ゼロ知識アセットプラットフォーム



**[Firn Protocol](https://web.archive.org/web/20240616051603/https://app.firn.cash/)**: Firnは、アカウントベースモデルにおける史上初のゼロ知識プライバシープラットフォームであり、Ethereumベースのチェーンにプラグイン可能で柔軟なプライバシーを導入しています。ゼロ知識プルーフ（zero-knowledge proofs）を用いて、FirnはEthereumおよびEthereumベースのL2のユーザーに安全かつ効率的な資金プライバシーを提供します。**仕組みは？**
Firnを使用するには、ETHをプロトコルへ預け入れます。Firnの残高を取得すると、他のFirnユーザーへ資金を非公開で送金したり、Uniswapのような他のプロトコルを利用したりできます。また、資金をネットワークへ非公開で引き出すこともできます。Firnは、すべてのETH引き出しに0.79%の少額手数料を課します。これらの手数料は、Firn Tokenの保有者に比例して分配されます - [ホワイトペーパー](https://web.archive.org/web/20250617111826/https://firn.cash/whitepaper.pdf) 


**[RAILGUN](https://railgun.org/):** レイヤー1スマートコントラクトとして、RAILGUNはEthereum、Polygon、Binance Smart Chain、Arbitrumに依存する、プライベート送金およびDeFiインフラストラクチャとして存在します。
ノンカストディアルのRAILGUN Walletをセットアップし、任意のERC-20トークンを任意の0zkアドレスへシールドしてください。シールドされると、トークン、残高、トランザクションは暗号化されます - [ホワイトペーパー](https://docs.railgun.org/wiki) 


**[StarkEX](https://starkware.co/starkex/):** Ethereumメインネットで稼働するレイヤー2スケーラビリティエンジンです。トランザクションはオフチェーンでバッチ処理され、StarEXサービスへ送信されます。StarEXはトランザクションを検証し、関連する残高を更新します。また、トランザクションの有効性に基づくSTARKプルーフを生成します。オンチェーンの検証用スマートコントラクトがSTARKプルーフを受信して検証します - [ホワイトペーパー](https://docs.starkware.co/starkex-v4/)


**[Manta Network](https://www.manta.network/):** Web 3、DeFiなどのためのオンチェーンプライバシーです。最速のZK L1チェーンであるManta Atlanticは、準拠したオンチェーンプライバシーとアイデンティティを通じて、プログラム可能なプライバシーをweb3にもたらします。$MANTAの供給量は1,000,000,000に固定され、インフレスケジュールはありません。$MANTAトークンは、償還されると直ちに自動的にバーンされます - [ホワイトペーパー](https://docs.manta.network/) 

**[Boltz](https://web.archive.org/web/20260820131421/https://boltz.exchange/):** Boltzはレイヤー2ソリューションです。Boltzは、liquidやlightning networkなどBitcoinの異なるレイヤーをブリッジするために構築された、プライバシー優先のノンカストディアルBitcoin取引所です。Boltzにより、ユーザーはレイヤー間でBitcoinをシームレスにスワップできます。Boltzスワップはノンカストディアルであり、ユーザーはスワップの全過程を通じて常にBitcoinを完全に管理できます [ホワイトペーパー](https://web.archive.org/web/20230525142208/https://docs.boltz.exchange/en/latest/) 


**[ShadeProtocol](https://shadeprotocol.io/)**: Shade Protocolは、Secret Network上に構築された、相互接続されたプライバシー保護DeFiアプリケーション群のレイヤー2です。主なアプリケーションには、ステーブルコイン、ガバナンス、ボンド、ステーキングデリバティブ、保険、シンセティック、レンディング、DEXなどがあります - [ホワイトペーパー]

**[PantherProtocol](https://www.pantherprotocol.io/)**: オンチェーンデータを保護し、準拠したDeFiアクセスを可能にするゼロ知識クロスプロトコルレイヤーです。**仕組みは？** Pantherへアセットを預け入れることで、zAssetsと呼ばれる1:1担保付きシールドされたアセットを使用できます。複数のアセットタイプをPanther Poolsに保管しながら、ゼロ知識プルーフでオンチェーンデータを保護します。異なる価値、アイデア、メカニズムを提案する多くのレイヤー1および2ブロックチェーンが存在する中で、Pantherは、いずれか1つがすべてを支配することを期待するのではなく、それらをプライベートに接続するインフラストラクチャを構築しています。- [ホワイトペーパー](https://docs.pantherprotocol.io/) 


**[Sienna Network](https://web.archive.org/web/20260725175130/https://sienna.network/)**: Sienna.networkは、Secret Networkチェーン上のスワップおよびレンディングコントラクトと対話できる、プライバシー優先の分散型オープンソースフロントエンドです。他者が借りるためのsecretトークンを提供して利回りを得ることも、担保を提供してトークンを借りることもできます。開始されるマーケットは、sBTC、sETH、sSCRT、sXMR、sLUNA、sUST、sUSDT、sUSDCなどです。Sienna Network（レイヤー2プロトコル）が開発されました。SiennaLendは、プライバシーを維持しながら複数のブロックチェーンエコシステムにプライベートレンディングを可能にする最初のプライベートレンディングプロトコルです。パーミッションレスで、サインアップ要件、預け入れ上限、アカウントを凍結できる中央集権的な主体はなく、Siennaガバナンストークンによって統治されています - **アセットスワップ**: はい - [ホワイトペーパー](https://web.archive.org/web/20251208112713/https://sienna.network/whitepaper/) - ![Sienna Logo](/content-images/1-51y4R6V7JALmXtG_ZAsdcw-76d7d91c7a.webp)
***



**[Light Shield](https://web.archive.org/web/20250823165939/https://shield.lightprotocol.com/)**: Lightは、Solana向けに特別設計された、プライベートなプログラム実行を可能にするオープンソースのレイヤー2 zkLayerです。Light Protocolでは、オンチェーン状態を暗号化できます。ユーザーだけが自身のプライベート状態を復号できるため、実質的にその状態を「所有」します。プライベート状態は、単一のユーザー、または復号キーを共有するユーザー群が所有できます。
たとえば、Solana上のNFT出品を考えてみましょう。その公開状態（例: 価格）は、販売中である事実も含めてすべての人に表示されます。しかし、オファーと取引はプライベートであるべきです - **アセットスワップ**: はい - [ホワイトペーパー](https://web.archive.org/web/20250823165939/https://shield.lightprotocol.com/) - ![Light Shield Logo](/content-images/1-C4Pe23afCwS05seCeZWBLA-d85910d03f.webp)
***

**[Conceal Network](https://conceal.network/wiki/doku.php)**: Conceal Networkは、個人同士が匿名かつ分散型の方法で通信し、金融上のやり取りを行える能力を提供するために構築されました。Concealでは、送信者と受信者の間でトランザクションを紐付けることはできません。さらに、Concealは真に匿名の支払いのためにリング署名とワンタイムアドレスを使用します - **アセットスワップ**: はい - [ホワイトペーパー](https://conceal.network/wiki/doku.php) - ![Conceal.png](/content-images/media_articles_01-ecae30ec1a.webp)
***

**[Namada](https://namada.net/testnets)**: 要約: Namadaは、インターチェーンでアセット非依存のプライバシーのためのプルーフ・オブ・ステーク型レイヤー1です。Namadaは、IBCを介して高速ファイナリティチェーンとネイティブに相互運用し、信頼不要な双方向ブリッジを介してEthereumと相互運用します。プライバシーのために、Namadaは、すべてのアセット（代替可能・非代替可能）が共通のシールドされたセットを共有できるようにするマルチアセット・シールドされたプール（MASP）回路のアップグレード版を展開します。これにより、CryptoKittyの送信はETH、DAI、ATOM、OSMO、NAM（Namadaのネイティブアセット）、またはNamada上の他のアセットの送信と区別できません。**アセットスワップ**: はい - [ホワイトペーパー](https://docs.namada.net/) - ![Namada.png](/content-images/y4D30_VO_400x400-312a479be4.webp)
***


 **[FairySwap](https://web.archive.org/web/20240810094007/https://fairyswap.finance:443/)**: FairySwapは、パーミッションレスかつ分散型であることに取り組む、次世代のコミュニティ主導型プライバシーDEXであるレイヤー1です。Findoraに組み込まれたゼロ知識プルーフ技術を活用することで、プライバシーDEXやFairySwapのようなDappsは、公開ブロックチェーン上でどの情報を表示し、どの情報をシールドしたいかをユーザーが選択できるようにします。ユーザーが非表示にしたい情報は、詳細を一切公開せずにゼロ知識プルーフで公開検証できます - **アセットスワップ**: はい - [ホワイトペーパー](https://fairy-swap.gitbook.io/fairyswap-v2/) - ![FairySwap Logo](/content-images/_unavailable.svg)
***

**[ZKsync](https://zksync.io/)**: ZKsyncは、セキュリティを損なうことなく低ガス料金と高速トランザクションを提供する、Ethereum上のレイヤー2スケーリングソリューションです。人々はいつでもアセットをレイヤー1へ引き出せます。ZKsyncエコシステム全体にアクセスし、安価で即時のトランザクションの恩恵を受けるには、まずArgentのような[ウォレットが必要です](https://argent.link/zksync)。ウォレットがなければ、ZKsyncにはCoinbaseやBinanceのような取引所を通じてアクセスできないため、ネットワークに参加できません。ウォレットは、暗号資産の購入、売却、保管を簡単に行う方法を提供し、DeFi、NFTなどの刺激的な世界を体験させてくれます - **アセットスワップ**: はい - [ホワイトペーパー](https://docs.zksync.io/) - ![ZKsync.png](/content-images/63edde073465de1ef6bf89d3_zkSync-20Testne-3a4e9e2324.webp)
***

**[Penumbra](https://penumbra.zone/blog/valetudo-testnet/)**: Penumbraは、Cosmosエコシステム内の完全にシールドされたレイヤー1ネットワークです。誰もが個人情報を世界に発信することなく、安全にトランザクション、ステーキング、スワップ、マーケットメイクを行える、シールドされたクロスチェーンネットワークです。完全にシールドされたブロックチェーンとして、Penumbraはあらゆる種類のアセットを記録できる単一のシールドされたプールにすべての値を記録します。Penumbraはデフォルトでプライバシーを備えており、公開型トランザクションや公開型の値プールはありません - **アセットスワップ**: はい - ![Penumbra.png](/content-images/CrNB0cKl_400x400-3bdcf7cfb9.webp)
***


**[Ironfish Network](https://ironfish.network/)**: Ironfishはすべてのトランザクションを暗号化し、機密性の高いアセット情報を公開ビューからシールドします。読み取り専用ビューキーにより、準拠を維持しながら管理できます。Iron Fishは、分散型レイヤー1ブロックチェーン、プルーフ・オブ・ワーク（PoW）ベース、検閲耐性を備えた公開アクセス可能なブロックチェーンプロジェクトです。あらゆるトランザクションで強力なプライバシー保証をサポートするよう設計されています - **アセットスワップ**: はい - [ホワイトペーパー](https://ironfish.network/learn/whitepaper) - ![Ironfish.png](/content-images/kxDDjheA_400x400-2aca14fa6f.webp)
***


**[zkBob](https://zkbob.com/)**: zkBobスマートコントラクトウォレットでプライバシーを守りましょう。zkBobでは、ウォレットの内容と支出・受領する金額が完全にプライベートになります。zkBobを使用して、プライバシーと組み込みのコンプライアンスを備えた給与、支払い、寄付などの送受信を行えます。また、受取人を保護し金額を匿名化するゼロ知識プルーフ技術を使用した、プライベートなP2P送金も可能です - **アセットスワップ**: はい - ![zkBob.png](/content-images/aalptltf_400x400-0fa94999b5.webp) - [ホワイトペーパー](https://docs.zkbob.com/zkbob-overview/basic-concepts)
***

**[Firo](https://firo.org/)**: 以前はZcoinとして知られていたFiroは、暗号資産のプライバシーとマイニングを対象とするレイヤー1プライバシーブロックチェーンです。Firoは、LelantusおよびLelantus Sparkにより、高い匿名性セットを備えた信頼不要のオンチェーンプライバシーを提供し、暗号資産プライバシーの最前線に立っています。Dandelion++技術もネットワークレイヤーのプライバシーを提供します。Firoは、LelantusおよびLelantus Sparkにより、高い匿名性セットを備えた信頼不要のオンチェーンプライバシーを提供し、暗号資産プライバシーの最前線に立っています。Dandelion++技術もネットワークレイヤーのプライバシーを提供します - **アセットスワップ**: はい - ![Firo.png](/content-images/22083410-abd57747d1.webp)
***

**[PIVX](https://pivx.org/)**: PIVXはネットワークにティア2レイヤーを活用し、ガバナンスへの参加を支援するためにマスターノードを展開します。PIVXは、高度なユーザーデータ保護機能、コミュニティガバナンスメカニズム、プルーフ・オブ・ステークコンセンサスアルゴリズム、多目的マスターノードを特徴とする、オープンソースで分散型のピアツーピア通貨です。PIVXにより、ユーザーはSHIELDユーザーデータ保護を備えたグローバルデジタルキャッシュの自由をシームレスに体験できます。デジタルアセットを完全に管理し、自分自身の銀行になりましょう - **アセットスワップ**: はい -[ホワイトペーパー](https://pivx.org/whitepaper) - ![PIVX.png](/content-images/1169-c01a9208a4.webp)
***

**[BEAM](https://beam.mw/)**: BEAMは、トランザクションを完全に隠蔽する最高のMimblewimble L1プライバシーブロックチェーンです。究極の機密DeFi体験のためにBEAM Walletをダウンロードしてください - **アセットスワップ**: はい - [ホワイトペーパー](https://beam.mw/en/docs) - ![BEAM.png](/content-images/diZpv5uB_400x400-80e644b1cf.webp)
***

**[Oxen](https://oxen.io/)**: Oxen（旧称LOKI）は、使命を持つプライバシー技術プロジェクトです。即時トランザクションを備えたプライベート暗号資産です。巨大で強力なPoSネットワークです。安全なメッセージングプラットフォームです。このアプリは、レイヤー1のOxenチェーンからEVM互換チェーンへの移行中であり、OxenコインはSession Tokenになります。これはレイヤー2チェーン上で稼働し、ほとんどのWeb3アプリケーションと互換性を持つ新しいERC-20トークンです - **アセットスワップ**: はい - [ホワイトペーパー](https://docs.oxen.io/) - ![Oxen.png](/content-images/GJAsdyzF_400x400-bb04eed625.webp)
***

**[Particl](https://particl.io/coin)**: Particlは、個人が制限や仲介者なしにプライベートで送金・受取を行えるよう設計されたレイヤー1ソリューションです。簡単で、高速かつ安全です。現金のようですがデジタルです！財務をプライベートに保ちましょう。PARTでは、公開型トランザクションまたは完全に追跡不可能なプライベートトランザクションを選択できます。選択はあなた次第です。ニーズにかかわらず、あなたのためのソリューションがあります - **アセットスワップ**: はい - [ホワイトペーパー](https://raw.githubusercontent.com/particl/whitepaper/master/Particl%20Whitepaper%20Draft%20v0.3.pdf) - ![Particl.png](/content-images/WJ070Lrr_400x400-7b7a6ee533.webp)
***

**[Zano](https://zano.org/)**: Zanoは、機密アセットおよび分散型アプリケーション（dApps）の堅牢な基盤として機能する、エンタープライズグレードのプライバシー、セキュリティ、スケーラビリティを備えたオープンソースの暗号資産およびエコシステムであるレイヤー1ソリューションです。あなたのプライバシーは重要です。機密性とセキュリティを優先する主要なブロックチェーンプラットフォームであるZanoを選びましょう。Zanoネットワークメンバー間のトランザクションは、リング署名およびステルスアドレスにより追跡不可能になります。また、ブロックチェーン上でトランザクションデータを保存する方法により、トランザクションを承認した当事者のみがアクセスでき、プライベートデータが公開されることはありません。すべてのZanoトランザクションの機密性はコアにハードコードされています。すべての送信元・受信先アドレスを隠蔽することで、すべてのZanoユーザーのプライバシーレベルを最大化しています - **アセットスワップ**: はい - [ホワイトペーパー](https://docs.zano.org/) - ![Zano.png](/content-images/FrSPUjYWIAMMWGJ-404fe8a085.webp)
***



**[Dark.fi](https://dark.fi/)**: DarkFiは、ゼロ知識、マルチパーティ計算、準同型暗号化に基づく匿名L1です。匿名プルーフ・オブ・ステークによりバリデーターは隠蔽されます。DarkFiは、匿名アプリを作成・実行するためのアンチフラジャイルな環境を提供します - **アセットスワップ**: はい - [ホワイトペーパー](https://darkfi.org/whitepaper) - ![DarkFi.png](/content-images/0-auQOzkLMfYdoXlRy-b10ed91da5.webp)
***


**[Secret Network](https://scrt.network/)**: Secret Networkは、Cosmos SDKを使用して構築されたレイヤー1ブロックチェーンであり、より広く相互接続されたCosmosユニバース（IBC）の一部です。Secret Networkは、2020年に開始されたプライバシー保護スマートコントラクトを備える最初のメインネットブロックチェーンです。これにより、分散型かつパーミッションレスでありながらプライベートなアプリを構築できます - **アセットスワップ**: はい - [ホワイトペーパー](https://docs.scrt.network/) -
![Secret.png](/content-images/_unavailable.svg)
***



**[TomoChain](https://tomochain.com/ecosystem/)**: TOMOはレイヤー1公開ブロックチェーンです。TomoChainは、TomoChain上で開発され、安全かつ追跡不可能なトランザクションを作成するよう設計されたプライバシープロトコルです -**アセットスワップ**: はい- [ホワイトペーパー](https://tomochain.com/files/technical-whitepaper-1.0.pdf) - ![TomoChain.png](/content-images/tomochain-7598abfbb7.webp)
***
