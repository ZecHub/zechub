# Zcash Avalanche RedBridge

Zcash Avalanche RedBridgeは、Zcash（ZEC）とAvalanche（AVAX）のブロックチェーン間の相互運用性を実現する分散型ブリッジです。このブリッジは、ZECをAvalancheブロックチェーンへシームレスに移転できるよう設計されており、Zcashのプライバシー重視の機能を維持しながら、Avalancheの高スループット、低手数料、環境に優しいコンセンサスメカニズムを活用します。

RedBridgeは、クロスチェーン分散型金融（DeFi）、プライベートトランザクション、流動性共有を含む幅広いユースケースをサポートし、Zcash保有者にAvalancheエコシステムへのアクセス拡大をもたらします。このブリッジは、分散型ノード群と**ZavaX**と呼ばれるオラクルを通じて運用され、ZcashとAvalanche間で信頼性の高いデータ転送および価格検証を保証します。

### 主な機能

プライバシーを維持する相互運用性：ZcashユーザーがAvalanche上のDeFiアプリケーションを利用しながらプライバシーを維持できるようにします。
分散型オラクルZavaX：正確なZEC/AVAX価格データを保証するオラクルシステムを統合し、トラストレスなクロスチェーン操作を可能にします。
スケーラブルで環境に優しい：Avalancheのコンセンサスモデルを利用し、環境への影響を最小限に抑えつつ高速なトランザクションを提供します。
DeFiおよびDAppsのサポート：Zcash保有者は、プライバシーを損なうことなくAvalanche上のさまざまなDeFiプラットフォームに参加できます。

### 技術コンポーネント

**分散型ZavaX Oracle**
説明：ZavaX Oracleはブリッジにとって不可欠であり、クロスチェーン価格フィードを提供し、トラストレスなZECからAVAXへの変換を可能にします。
[オラクルへのリンク](https://zavax-oracle.red.dev)

**クロスチェーン・ブリッジコントラクト**
説明：Zcash Avalancheブリッジを支えるスマートコントラクトアーキテクチャであり、ZECの預入、変換、引出を処理します。

**プライバシーレイヤー統合**
説明：ブリッジ処理全体を通じてZcashのプライバシー機能が維持されることを保証し、プライベートなクロスチェーントランザクションを可能にします。

## 成果物とドキュメント

**Avalanche上のZcash Elastic Subnet Bridge**：[助成金提案](https://forum.zcashcommunity.com/t/zcash-elastic-subnet-bridge-on-avalanche/44220)
以下は、Zcash Avalanche RedBridgeプロジェクトで完了した主な成果物および技術リソースです。

成果物1.1：CLIを使用してテストネットAvalancheサブネットからテストネットZcashトランザクションを照会できる予備PoC。GitHubで公開され、Avalancheテストネット上の1ノードサブネットを備えています。https://github.com/red-dev-inc/redbridge-oracle

成果物2.1：[アーキテクチャ](https://github.com/red-dev-inc/red-bridge/tree/main/Architecture)


### マイルストーン3：2024年3月31日

成果物3.1は完了しており、ZavaXブリッジにおけるしきい値署名にBLSではなくFROSTを採用する分析を提示しています。この変更はZcash Foundationの監査済みライブラリを活用し、統合性とセキュリティの向上を促進します。https://github.com/ZcashFoundation/frost

成果物3.2では、GUI向けUXおよびUIデザインが完了し、侵入テスト結果に裏付けられたZavaX Oracleサブネットのセキュリティ強化について詳述しています。サーバー構成およびテスト結果を含む詳細については、[セキュリティ評価](https://github.com/red-dev-inc/redbridge-oracle/blob/main/security/deployment-notes.md)
[監査レポート](https://github.com/red-dev-inc/redbridge-oracle/blob/main/security/pen-testing-report-2024-09.md)
さらに、チームはZavaXからredbridgeへリブランドし、ステーキングトークンをZAXからRBRへ変更しました。

### マイルストーン4：2024年4月30日
成果物4.1：ZcashおよびAvalancheテストネットへの完全に機能するデプロイメント。3バリデーターのサブネットおよびCLIサポートを備えています。

### マイルストーン5：2024年5月31日
成果物5.1：GUI：CoreまたはWebアプリへのブリッジ統合

マイルストーン6：2024年6月30日
成果物6.1：ソフトウェア監査の合格
成果物6.2：監査済みソースコードを公開GitHubリポジトリへ公開

[GitHubリポジトリ](https://github.com/red-dev-inc/red-bridge/tree/main/Architecture)をご覧ください。
  
技術的な詳細については、ユーザーはRedBridgeプロジェクトのリポジトリおよびドキュメントを確認し、統合の詳細、テストフレームワーク、セキュリティプロトコルを[詳しく確認](https://github.com/red-dev-inc/red-bridge)することを推奨します。


![img1](/content-images/b8c5d267-1711-458a-8a32-1df9d56fae8a-a93ff66932.webp)


* 成果物： 
2025年第1四半期に、チームは[red·bridgeデモウェブサイト](https://redbridge-demo.red.dev/index.html)の公開を発表しました。ここでは誰でもユーザー体験を試し、フィードバックを提供し、改善案を提案できます。また、技術に詳しくない人々にプロジェクトを紹介する簡単な方法としても機能します。

* チームはred·bridgeの最終版にZebraを使用しました。テストのため、AvalancheのFujiテストネット上で稼働するテストブロックチェーンZavaX Oracleの3ノードのうち2つをアップグレードしました。最後のノードも正常にアップグレードされ、現在は[ZavaX Oracle](https://web.archive.org/web/20260823181644/https://zavax-oracle.red.dev/)がZebra上で稼働しています！

* 2025年第1四半期には、当初の赤のみのバージョンとは対照的に、red.bridgeウェブサイトが赤、ダーク、ライト、Zebraの4つのビューを提供するようコーディングされました。

* もう1つの点として、チームは2025年12月にAvalancheメインネットでred·bridge L1を稼働開始します。当初はZcashブロックチェーンのオラクルとして機能し、その後すぐにBitcoin向けにも機能します。各リクエストにはガストークンとして0.001 AVAXがかかります。この構築により、Avalanche上の任意のL1またはスマートコントラクトが、分散型の方法でZcashおよびBitcoinのデータを安価に照会できるようになります。

* 第2四半期に、チームはred.bridge guardianの運用をより早く、より手頃なものにするため、Avalanche FoundationへマイルストーンACP-77（Avalanche9000として知られる）を提出しました。当初、バリデーターは約2000 AVAXをステーキングする必要がありましたが、Avalanche9000のコストでは、バリデーターに必要なのは月額1 AVAXのみです。さらに、このマイルストーンではZFのFROST実装を使用する計画も最終決定され、各Guardianにブリッジウォレットを安全かつ分散的に制御するための署名シェアが付与されます。

* 2026年第1四半期および第2四半期には、red.bridgeはZcashおよびAvalancheコミュニティメンバー向けに、RBRトークン（旧ZAX）のエアドロップを実施する予定です。red.devの創設者によると、ユーザーはブリッジのテストに協力しながらRBRを獲得する機会を得られる、インセンティブ付きテストネットを開催する予定です。
