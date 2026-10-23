# Zcash Avalanche RedBridge

Zcash Avalanche RedBridgeは、Zcash（ZEC）とAvalanche（AVAX）のブロックチェーン間の相互運用性を可能にする分散型ブリッジです。このブリッジは、Zcashのプライバシー重視の機能を維持しつつ、Avalancheの高スループット、低手数料、環境に優しいコンセンサスメカニズムを活用して、ZECをAvalancheブロックチェーンへシームレスに転送できるよう設計されています。

RedBridgeは、クロスチェーン分散型金融（DeFi）、プライベートトランザクション、流動性共有を含む幅広いユースケースをサポートし、Zcash保有者にAvalancheエコシステムへのアクセス拡大を提供します。このブリッジは、分散型ノード群と**ZavaX**と呼ばれるオラクルを通じて運用され、ZcashとAvalanche間の信頼性の高いデータ転送および価格検証を保証します。

### 主な機能

プライバシーを維持する相互運用性：Zcashユーザーは、Avalanche上のDeFiアプリケーションを利用しながらプライバシーを維持できます。
分散型オラクルZavaX：正確なZEC/AVAX価格データを保証するオラクルシステムを統合し、トラストレスなクロスチェーン操作を可能にします。
スケーラブルで環境に優しい：Avalancheのコンセンサスモデルを利用し、環境への影響を最小限に抑えた高速トランザクションを提供します。
DeFiおよびDAppsのサポート：Zcash保有者は、プライバシーを損なうことなくAvalanche上のさまざまなDeFiプラットフォームに参加できます。

### 技術コンポーネント

**分散型ZavaXオラクル**
説明：ZavaXオラクルはブリッジに不可欠であり、クロスチェーン価格フィードを提供し、トラストレスなZECからAVAXへの変換を可能にします。
[オラクルへのリンク](https://zavax-oracle.red.dev)

**クロスチェーン・ブリッジコントラクト**
説明：Zcash Avalancheブリッジを支えるスマートコントラクトアーキテクチャであり、ZECの預け入れ、変換、引き出しを処理します。

**プライバシーレイヤー統合**
説明：ブリッジ処理全体を通じてZcashのプライバシー機能が維持され、プライベートなクロスチェーントランザクションを可能にします。

## 成果物とドキュメント

**Zcash Avalanche上のElastic Subnet Bridge**：[助成金提案](https://zcashgrants.org/gallery/25215916-53ea-4041-a3b2-6d00c487917d/36243580/)
以下は、Zcash Avalanche RedBridgeプロジェクトで完了した主な成果物と技術リソースです。

成果物1.1：CLIを使用して、テストネットAvalancheサブネットからテストネットZcashトランザクションを照会できる予備PoC。Githubで公開され、Avalancheテストネット上に1ノードのサブネットを備えています。https://github.com/red-dev-inc/zavax-oracle

成果物2.1：[アーキテクチャ](https://github.com/red-dev-inc/zavax-bridge/tree/main/Architecture)


### マイルストーン3：2024年3月31日

成果物3.1は完了し、ZavaXブリッジのしきい値署名においてBLSではなくFROSTを採用することに関する分析を提示しています。この変更は、Zcash Foundationの監査済みライブラリを活用し、より優れた統合性とセキュリティを実現します。https://github.com/ZcashFoundation/frost

成果物3.2では、GUIのUXおよびUIデザインが完了し、ペネトレーションテストの結果に裏付けられたZavaX Oracleサブネット向けのセキュリティ強化を詳述しています。サーバー構成およびテスト結果を含む詳細については、[セキュリティ評価](https://github.com/red-dev-inc/zavax-oracle/blob/main/security/deployment-notes.md)
[監査レポート](https://github.com/red-dev-inc/zavax-oracle/blob/main/security/pen-testing-report-2024-09.md)
さらに、チームはZavaXからredbridgeへリブランディングし、ステーキングトークンをZAXからRBRへ変更しました。

### マイルストーン4：2024年4月30日
成果物4.1：ZcashおよびAvalancheテストネットへの完全に機能するデプロイメント。3バリデータのサブネットとCLIサポートを備えています。

### マイルストーン5：2024年5月31日
成果物5.1 GUI：CoreまたはWebアプリへのブリッジ統合

マイルストーン6：2024年6月30日
成果物6.1：ソフトウェア監査の合格
成果物6.2：監査済みソースコードを公開Githubリポジトリへ公開

[Githubリポジトリ](https://github.com/red-dev-inc/zavax-bridge/tree/main/Architecture)をご覧ください。
  
より技術的な詳細については、RedBridgeプロジェクトのリポジトリおよびドキュメントを確認し、統合の詳細、テストフレームワーク、セキュリティプロトコルを[確認](https://zcashgrants.org/gallery/25215916-53ea-4041-a3b2-6d00c487917d/36243580/)することをお勧めします。


![img1](/content-images/b8c5d267-1711-458a-8a32-1df9d56fae8a-a93ff66932.webp)


* 成果物： 
2025年第1四半期に、チームは[red·bridgeデモウェブサイト](https://redbridge-demo.red.dev/index.html)の公開を発表しました。誰でもユーザー体験を試し、フィードバックを提供し、改善案を提案できます。また、技術者ではない人々にプロジェクトを紹介する簡単な方法としても機能します。

* チームはred·bridgeの最終バージョンにZebraを使用しました。テストのため、AvalancheのFujiテストネット上で稼働するテストブロックチェーン、ZavaX Oracleの3つのノードのうち2つをアップグレードしました。最後のノードも正常にアップグレードされ、現在[Zavax Oracle](https://web.archive.org/web/20260823181644/https://zavax-oracle.red.dev/)はZebra上で稼働しています！

* 2025年第1四半期に、red.bridgeウェブサイトは、当初の赤のみのバージョンとは対照的に、赤、ダーク、ライト、Zebraの4つのビューを提供するようコーディングされました。

* もう1つのポイントとして、チームは2025年12月にAvalancheメインネット上でred·bridge L1を稼働開始します。当初はZcashブロックチェーン向けのオラクルとして機能し、その後まもなくBitcoin向けにも機能します。各リクエストには、ガストークンとして0.001 AVAXがかかります。この構築により、Avalanche上のあらゆるL1またはスマートコントラクトが、分散型の方法でZcashおよびBitcoinから低コストでデータを照会できるようになります。

* 第2四半期に、チームはred.bridgeガーディアンの運用をより早期かつ誰にとっても手頃にするため、Avalanche FoundationへマイルストーンACP-77（Avalanche9000として知られる）を提出しました。当初、バリデータは約2,000 AVAXをステーキングする必要がありましたが、Avalanche9000のコストではバリデータに必要なのは月額1 AVAXのみです。さらに、このマイルストーンは、各Guardianにブリッジウォレットを安全かつ分散的に制御するための署名シェアを与える、ZFのFROST実装を使用する計画も最終決定します。

* 2026年第1四半期および第2四半期には、red.bridgeはZcashおよびAvalancheコミュニティメンバー向けに、RBRトークン（旧ZAX）のエアドロップを実施する予定です。red.devの創設者によると、ユーザーがブリッジのテストを支援しながらRBRを獲得する機会を得られる、インセンティブ付きテストネットを開催する予定です。
