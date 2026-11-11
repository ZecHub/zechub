# Maya 分散型取引所（Decentralised Exchange）

---

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

Proof of Bond（PoB）は、ノードオペレーターがネットワークに参加するためにボンド（bond）（通常はネットワークのネイティブトークンの形）を預け入れる必要があるコンセンサスメカニズムです。このボンドは経済的セキュリティの一形態として機能し、ノードが誠実に行動し、ネットワークの完全性を維持することを保証します2。ノードが悪意ある行動を取ろうとしたり、その義務を果たせなかったりした場合、そのボンドはスラッシュされ、つまり一部がペナルティとして没収される可能性があります。

Maya Protocolでは、このメカニズムはノードオペレーターのステーキング済みリソースから経済的価値を生み出し、資本効率を高めるのに役立ちます。同様に、THORChainでは、ノードオペレーターがネットワークを保護し、参加者間の協力を確保するためにRUNE（ネイティブトークン）をボンドとして預け入れます。

## MayaとTHORChainの違い

MayaはTHORChainのフォークですが、優れた代替手段となるいくつかの新機能を備えています。最も重要なものは以下のとおりです。

### リクイディティノード

Mayaは、Pure Bond Modelに従うのではなく、Liquidity Nodesモデルへの移行を検討しています。このシステムでは、ノードが流動性を直接提供し、それをネットワークにボンドとして預け入れられます。このアプローチでは、ノードオペレーターは大きなリスクに直面します。資金を不正利用した場合、損失を被るため、強力な抑止力となります。その結果、ノードオペレーターはLiquidity PoolsのLiquidity Unitsを使用し、これらが同時に流動性を提供し、ネットワークセキュリティを強化します。

### インパーマネントロス保護

暗号資産価格の継続的な変動により、流動性を提供する際に流動性プロバイダー（LPs）が被る可能性のある一時的な損失から保護するシステムです。
ILPは$CACAO供給量の10%（1,000万$CACAO）を保有しており、プロトコル手数料（fees）の10%によって継続的に補充されます。ILPは流動性の預け入れから50日後に有効となり、補償は100%が上限です。

ILPの補償期間は、ASSETと$CACAOのパフォーマンスに依存します。ASSETのパフォーマンスがより良い場合は150日後に、$CACAOのパフォーマンスがより良い場合は450日後に、全額補償が実現します。ILPは全額引き出し時に支払われ、リセットされますが、一部引き出しの影響は受けません。チャージ（top-ups）の場合、ILPはリセットされますが、支払われません。

### 異なる配分モデル

Liquidity Auctionは、参加者に$CACAOトークンを配分するために設計された21日間のイベントでした。イベント期間中、ユーザーは対応資産を特定のアドレスに預け入れました。オークション終了時、$CACAOトークンの90%は流動性への貢献に比例して参加者に配分され、残りの10%はILP準備金に配分されました。参加者は流動性プロバイダーとなり、預け入れた資産と$CACAOトークンはMayaのプール（pools）に配置され、発生した手数料の一部を得られるようになりました。

### 準備金を扱う異なる方法

Maya Protocolのジェネシス時点では、利用可能なCACAO準備金は総供給量のわずか10%であり、THORChainの44%と比較して低く、主にインパーマネントロス保護（ILP）を目的としていました。Mayaにはブロック排出がありません。また、Protocol Owned LiquidityとLendingが実装された場合、それらは異なる設計を特徴とします。THORChainでは、これらの側面は準備金と密接に統合されています。

それでも、その違いにもかかわらず、MayaはTHORChainを補完するソリューションとしても機能し、冗長性、拡張性、検証を提供するとともに、現在のTHORChain実装には存在しない新しいネットワークを統合します。

また、Mayaの目標は、他のサービスが構築できる*バックエンド*になることであり、多数の新しい*フロントエンド*、つまりMayaのインフラストラクチャ上に構築されたDEXサービスが登場することを目指しています。

## Maya Protocolウォレット統合

*バックエンド*として機能するMayaは、利用するためにさまざまなUIとウォレットによるサポートを必要とします。  
以下は、すでにMayaをサポートしているサービスの一覧です。

[Thorwallet DEX](https://www.thorwallet.org/): Ledger、XDEFI、MetaMask、Keystore

[El Dorado](https://www.eldorado.market/): XDEFI、Keystore

[CacaoSwap](https://cacaoswap.app/): Keystore、MetaMask、XDEFI、Keplr、Leap

[Asgardex](https://www.asgardex.com/): Keystore、Ledger

DefiSpot: すでにオンラインではなく、そのドメインは解決されません。

[Ctrl Wallet (XDEFI)](https://ctrl.xyz/): 30以上のネイティブブロックチェーン、およびすべてのEVMチェーンとCosmosチェーンをサポートする、マルチエコシステムのセルフカストディウォレットです。Bitcoin、Ethereum、Solana、THORChain、Maya Protocol、TRONなどが含まれます。

[KeepKey ](https://keepkey.com/): デジタル資産を安全に保管するためのハードウェアウォレットです。
