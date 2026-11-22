<a href="https://github.com/zechub/zechub/edit/main/site/guides/Maya_Protocol.md" target="_blank">
  <img src="https://img.shields.io/badge/Edit-blue" alt="Edit Page"/>
</a>

# Maya 分散型取引所（Decentralised Exchange）

> Maya Protocol は、ラップドトークン（wrapped tokens）、アカウント（accounts）、KYC を使わずに、ネイティブスワップ（native swaps）（たとえば ETH または BTC から ZEC へ）を行うためのクロスチェーン（cross-chain）DEX です。

## 要約

* Mayaは、ブロックチェーン（blockchains）間でネイティブコインをスワップします。1つの資産を送ると、その資産固有のチェーン上で別の資産を受け取ります。ラップドトークン、アカウント、KYCは不要です。
* これはTHORChainのフォークであり、Cosmos SDKで構築され、資本をボンドするノードオペレーターによって保護されています（ボンドのプルーフ（Proof of Bond））。
* ネイティブトークンは$CACAOです。流動性プロバイダーはスワップ手数料を獲得し、50日後にはインパーマネントロス保護（Impermanent Loss Protection、ILP）の対象となります。
* Mayaはバックエンドです。THORWallet、CacaoSwap、Asgardex、Ctrl Wallet、またはKeepKeyなどのフロントエンドまたはウォレットを通じて利用します。
* チュートリアル動画では、これらのフロントエンドの1つであるLeoDex上で、ETHからZECへのスワップを紹介しています。
* Mayaは、SwapKitを介したシールドされた/統合ZEC入金をサポートしています（公開型の値出力とシールドされたメモ）。そのため、一部のフロントエンドではZECを統合アドレスへ直接送付できます。公開型（t1）アドレスに支払われた場合は、後でプライバシーのためにウォレット内でシールドしてください。
* Mayaは、ネイティブZECスワップの唯一の選択肢ではありません。THORChainにもネイティブZECプールがあります。

## 基本的な説明

中央集権型取引所（centralized exchange）は、あなたのコインを保有し、あなたの身元を必要とします。Mayaは代わりに、対応する各チェーン上のボールトを管理するノード（nodes）のネットワークを使用します。あなたはMayaのボールトにコインを送信し、少なくとも3分の2のノードが入金を確認すると、対応する資産が別のボールトから宛先チェーン上のあなたのアドレスに送信されます。

ノード（node）運営者は、不正行為をした場合に没収され得るボンド（bond）を差し入れており、誠実であり続ける金銭的な理由があります。Mayaは、流動性ノードや独自の準備金設計など、THORChainに機能を追加しており、さらにその隣で第2の独立したネットワークとしても機能します。

以下のセクションでは、Mayaの仕組み、Proof of Bond、THORChainとの違い、および対応しているウォレット（Wallet）について説明します。

## チュートリアル


<div className="my-8 w-full aspect-video max-w-3xl mx-auto rounded-2xl overflow-hidden shadow-lg bg-black">
  <iframe
    className="w-full h-full"
    src="https://www.youtube.com/embed/f1k6xhNfTV8"
    title="How to Swap Ethereum to Zcash on LeoDex"
    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
    allowFullScreen
    loading="lazy"
  />
</div>


## Maya Protocolとは何ですか？

Mayaは、異なるブロックチェーン（blockchains）間で暗号資産を取引できる[分散型取引所](https://nym.com/blog/what-is-dex)（DEX）システムです。たとえば、Bitcoinブロックチェーン上のBitcoin（BTC）と、Ethereumブロックチェーン上のEthereum（ETH）を、資産を保有したり中央集権的な機関や本人確認（Know Your Customer、KYC）手続きを介在させたりすることなく、簡単にスワップできます。

Maya ProtocolはCosmosソフトウェア開発キット（Cosmos SDK）を用いて開発され、Proof of Bond（PoB）コンセンサス（consensus）メカニズムで動作します。このプロトコルは、「ノードオペレーター（Node Operators）」によって維持されており、彼らは資本をシステムにステーキング（staking）し、貢献と努力への報酬として収益を得ます。基本的に、ノードはユーザーのスワップを検証し、異なるブロックチェーン上の指定アドレス（addresses）にある資産を監督するソフトウェアを実行するコンピューターです。

スワップを完了するには、対応する暗号資産がユーザーからMayaのいずれかのアドレスに送られ、その後、別のブロックチェーン上にあるMayaの別のアドレスから同等額が送られる必要があります。このプロセスは少なくともノードの3分の2によって管理・承認され、特に資金が適切に受領されたことを確認します。

このようにして、ユーザーはあるブロックチェーン上で1種類のトークン（token）を送信し、ラップドトークンを使用せずに、別のブロックチェーン上で異なる種類のトークンをネイティブに受け取れます。

## Proof of Bondとは何ですか？

ボンドのプルーフ（Proof of Bond、PoB）は、ノード運用者がネットワークに参加するためにボンド（通常はネットワークのネイティブトークンの形）を差し入れる必要があるコンセンサスメカニズムです。このボンドは経済的なセキュリティとして機能し、ノードが誠実に行動してネットワークの完全性を維持することを保証します。ノードが悪意ある行動を試みたり、義務を果たせなかったりした場合、そのボンドはスラッシュされる可能性があり、これは罰則としてその一部が没収されることを意味します。

Maya Protocolでは、このメカニズムはノードオペレーターのステーキング済みリソースから経済的価値を生み出し、資本効率を高めるのに役立ちます。同様に、THORChainでは、ノードオペレーターがネットワークを保護し、参加者間の協力を確保するためにRUNE（ネイティブトークン）をボンドとして預け入れます。

## MayaとTHORChainの違い

MayaはTHORChainのフォークですが、優れた代替手段となるいくつかの新機能を備えています。最も重要なものは以下のとおりです。

### リクイディティノード

Mayaは、Pure Bond Modelに従うのではなく、Liquidity Nodesモデルへの移行を検討しています。このシステムでは、ノードが流動性を直接提供し、それをネットワークにボンドとして預け入れられます。このアプローチでは、ノードオペレーターは大きなリスクに直面します。資金を不正利用した場合、損失を被るため、強力な抑止力となります。その結果、ノードオペレーターはLiquidity PoolsのLiquidity Unitsを使用し、これらが同時に流動性を提供し、ネットワークセキュリティを強化します。

### インパーマネントロス保護

暗号資産の価格が絶えず変動するために流動性を提供する際、流動性プロバイダー（LP）が被る可能性のある一時的な損失から保護するシステムです。
ILPは$CACAOの供給量の10%（$CACAO 1,000万）を保有し、プロトコル手数料の10%によって継続的に補充されます。ILPは流動性の預け入れから50日後に有効になり、補償上限は100%です。

ILPの補償期間は、ASSETと$CACAOのパフォーマンスに依存します。ASSETのパフォーマンスがより良い場合は150日後に、$CACAOのパフォーマンスがより良い場合は450日後に、全額補償が実現します。ILPは全額引き出し時に支払われ、リセットされますが、一部引き出しの影響は受けません。チャージ（top-ups）の場合、ILPはリセットされますが、支払われません。

### 異なる配分モデル

Liquidity Auctionは、参加者に$CACAOトークンを配分するために設計された21日間のイベントでした。イベント期間中、ユーザーは対応資産を特定のアドレスに預け入れました。オークション終了時、$CACAOトークンの90%は流動性への貢献に比例して参加者に配分され、残りの10%はILP準備金に配分されました。参加者は流動性プロバイダーとなり、預け入れた資産と$CACAOトークンはMayaのプール（pools）に配置され、発生した手数料の一部を得られるようになりました。

### 準備金を扱う異なる方法

Maya Protocolのジェネシス時点では、利用可能なCACAO準備金は総供給量のわずか10%であり、THORChainの44%と比較して低く、主にインパーマネントロス保護（ILP）を目的としていました。Mayaにはブロック排出がありません。また、Protocol Owned LiquidityとLendingが実装された場合、それらは異なる設計を特徴とします。THORChainでは、これらの側面は準備金と密接に統合されています。

それでも、その違いにもかかわらず、MayaはTHORChainを補完するソリューションとしても機能し、冗長性、拡張性、検証を提供するとともに、現在のTHORChain実装には存在しない新しいネットワークを統合します。

また、Mayaの目標は、他のサービスが基盤として利用できる*バックエンド（backend）*となることであり、Mayaのインフラストラクチャを基盤として構築された多数の新しい*フロントエンド（frontends）*やDEXサービスが生まれることを期待しています。

## Maya Protocolウォレット統合

*バックエンド*として機能するMayaは、利用するためにさまざまなUIとウォレットによるサポートを必要とします。  
以下は、すでにMayaをサポートしているサービスの一覧です。

[THORWallet DEX](https://www.thorwallet.org/)：Ledger、XDEFI、MetaMask、キーストア（Keystore）

El Dorado：もはやオンラインではなく、そのドメインは名前解決されません。

[CacaoSwap](https://cacaoswap.app/): Keystore、MetaMask、XDEFI、Keplr、Leap

[Asgardex](https://www.asgardex.com/): Keystore、Ledger

DefiSpot: すでにオンラインではなく、そのドメインは解決されません。

[Ctrl Wallet (XDEFI)](https://ctrl.xyz/): 30以上のネイティブブロックチェーン、およびすべてのEVMチェーンとCosmosチェーンをサポートする、マルチエコシステムのセルフカストディウォレットです。Bitcoin、Ethereum、Solana、THORChain、Maya Protocol、TRONなどが含まれます。

[KeepKey ](https://keepkey.com/): デジタル資産を安全に保管するためのハードウェアウォレットです。
