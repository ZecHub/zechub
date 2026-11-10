<a href="https://github.com/henryquincy/zechub/edit/main/site/guides/Raspberry_pi_4_Zebra_Node.md" target="_blank">
  <img src="https://img.shields.io/badge/Edit-blue" alt="Edit Page"/>
</a>

# Zebraを実行するためのRaspberry Pi 4ガイド

<img src="/content-images/image-2023-11-28-172907488-e7e9fd4ac5.webp" alt="raspberry pi" width="300" height="300"/>

Raspberry Pi 4でZebraノード（node）ソフトウェアを実行すると、独立したコンセンサス（consensus）互換ノードとしてZcashネットワークに参加できます。このガイドでは、Raspberry Pi 4でZebraをセットアップして実行する手順を説明します。

## 前提条件

1. Raspberry Pi 4（2GB RAM以上を推奨）。

2. Raspberry Pi OS（Raspbian）がインストールされたMicroSDカード（16GB以上を推奨）。

3. 安定したインターネット接続。

4. キーボード、マウス、モニター（初期セットアップ用）。

5. SSHクライアント（任意、リモートアクセス用）。

## インストール

1. __システムを更新する__
   ターミナルを開くか、SSHでRaspberry Piに接続し、以下を実行してシステムが最新の状態であることを確認します。

   __sudo apt update__

   __sudo apt upgrade__

2. __依存関係をインストールする__
   Zebraをビルドして実行するには、必要な依存関係をいくつかインストールする必要があります。

   __sudo apt install build-essential cmake git clang libssl-dev pkg-config__

3. __Zebraリポジトリをクローンする__
   ターミナルを開き、ZebraリポジトリをRaspberry Piにクローンします。

   __git clone https://github.com/ZcashFoundation/zebra.git__

   __cd zebra__

4. __Zebraをビルドする__
   Zebraをビルドするには、以下のコマンドを使用します。

   __cargo build --release__

   このプロセスには時間がかかる場合があります。コンパイルでは熱が発生する可能性があるため、Raspberry Piが適切に冷却されていることを確認してください。

5. __設定__
   Zebra用の設定ファイルを作成します。まずはデフォルト設定を出発点として使用できます。

   __cp zcash.conf.example zcash.conf__

   zcash.confファイルを編集して、ノードの設定をカスタマイズします。ネットワークの指定、マイニング（mining）の有効化、ピア接続の設定などを行えます。

6. __Zebraを開始する__
   これで、カスタム設定を使用してZebraを開始できます。

   __./target/release/zebrad -c zcash.conf__

   __git comment__ 

   このコマンドによりZebraノードが起動し、Zcashブロックチェーン（blockchain）との同期が開始されます。

7. __監視__
   ウェブブラウザを開き、__http://127.0.0.1:8233/status__.に移動すると、Zebraノードの進行状況とステータスを監視できます。

<img src="/content-images/image-2023-11-28-173024853-99540511cf.webp" alt="zebra logo" width="200" height="200"/>

## トラブルシューティング

Zebraのビルドまたは実行中に問題が発生した場合は、トラブルシューティングのヒントや追加情報について[Zebraドキュメント](https://zebra.zfnd.org/user/troubleshooting.html)を確認してください。

ノードの実行では熱が発生する可能性があるため、Raspberry Piを低温に保つようにしてください。ファンやヒートシンクなどの冷却ソリューションを使用するとよいでしょう。

## 結論

このガイドに従うことで、Raspberry Pi 4でZebraを正常にセットアップして実行できたはずです。これで独立したノードとしてZcashネットワークに貢献し、Zcashトランザクション（transaction）のプライバシー（privacy）保護に役立てています。
