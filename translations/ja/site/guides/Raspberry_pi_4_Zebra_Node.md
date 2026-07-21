<a href="https://github.com/henryquincy/zechub/edit/main/site/guides/Raspberry_pi_4_Zebra_Node.md" target="_blank">
  <img src="https://img.shields.io/badge/Edit-blue" alt="ページを編集"/>
</a>

# Raspberry Pi 4 上での Zebra の実行ガイド

<img src="https://i.ibb.co/V3rjKwv/image-2023-11-28-172907488.png" alt="raspberry pi" width="300" height="300"/>

Raspberry Pi 4 上で Zebra ノードソフトウェアを実行することで、Zcash ネットワークに独立したコンセンサス互換ノードとして参加できます。このガイドでは、Raspberry Pi 4 上で Zebra をセットアップして実行する手順について説明します。

## 前提条件

1. Raspberry Pi 4 (2GB RAM 以上が推奨されます)。

2. Raspberry Pi OS (Raspbian) がインストールされた microSD カード (16GB 以上が推奨されます)。

3. 安定したインターネット接続。

4. 初期設定用のキーボード、マウス、ディスプレイ。

5. SSHクライアント (リモートアクセスのためにオプション)。

## インストール

1. __システムを更新__
   テルミナルを開くか、Raspberry Pi に SSH 接続し、次のコマンドでシステムが最新状態であることを確認してください:

   __sudo apt update__

   __sudo apt upgrade__

2. __依存関係のインストール__
   Zebra の構築および実行のために必要な依存関係をインストールします:

   __sudo apt install build-essential cmake git clang libssl-dev pkg-config__

3. __Zebra リポジトリのクローン__
   テルミナルを開き、Raspberry Pi に Zebra リポジトリをクローンしてください:

   __git clone https://github.com/ZcashFoundation/zebra.git__

   __cd zebra__

4. __Zebra の構築__
   次のコマンドを使用して Zebra を構築します:

   __cargo build --release__

   この処理には時間がかかる場合があります。Raspberry Pi が十分に冷却されていることを確認してください、コンパイル中に熱を発生する可能性があります。

5. __設定__
   Zebra のための設定ファイルを作成します。デフォルト設定を使用して開始できます:

   __cp zcash.conf.example zcash.conf__

   zcash.conf ファイルを編集し、ノードの設定をカスタマイズしてください。ネットワークを指定したり、採掘を有効化したり、ピア接続を設定したりすることが可能です。

6. __Zebra の起動__
   今やカスタム設定を使用して Zebra を起動できます:

   __./target/release/zebrad -c zcash.conf__

   __git comment__ 

   このコマンドで Zebra ノードが起動し、Zcash ブロックチェーンと同期を開始します。

7. __モニタリング__
   Webブラウザを開き、__http://127.0.0.1:8233/status__ にアクセスして、Zebra ノードの進捗状況やステータスを確認できます。

<img src="https://i.ibb.co/BCtKrGp/image-2023-11-28-173024853.png" alt="zebra logo" width="200" height="200"/>

## トラブルシューティング

Zebra の構築または実行中に問題が発生した場合は、[Zebra ドキュメント](https://doc.zebra.zfnd.org/docs/intro.html)でトラブルシューティングのヒントや追加情報を見つけてください。

Raspberry Pi が熱を発生する可能性があるため、ノードを実行している間は冷却対策を講じてください。ファンやヒートシンクなどの冷却ソリューションを使用することをお勧めします。

## 結論

このガイドに従うことで、Raspberry Pi 4 上で Zebra を成功裏にセットアップし実行できたはずです。これにより、Zcash ネットワークに独立したノードとして参加し、Zcash トランザクションのプライバシーを保護する役割を果たしています。
