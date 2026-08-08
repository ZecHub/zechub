---
# Raspberry Pi 4でフルノードを運用する（Zebra + Zallet）

*元のzcashdベースのガイドから移行しました。zcashdは2026年7月18日に自動的なサポート終了停止に達したため、このガイドでは現在**Zebra**（Zcash Foundationが保守する現行のフルノード）と**Zallet**（zcashdの内蔵ウォレットを置き換えるために作られたウォレット）を使用します。*

## ここで学べること
- ヘッドレス運用向けに、Raspberry Pi 4へUbuntu Server 22.04+（64-bit）を書き込み、設定する方法
- Dockerまたは事前ビルド済みバイナリを使ってZebraをインストールし、実行する方法
- ウォレット暗号化のセットアップを含め、Zalletをインストール、設定、初期化する方法
- 既存のzcashd設定/ウォレットを必要に応じてZalletへ移行する方法

## 旧ガイドから何が変わったか
このガイドの旧バージョンでは、Pi 4上で**zcashd**をネイティブにコンパイルする手順を説明していました。Pi 4には並列（`-j$(nproc)`）ビルドに十分なメモリがないため、シングルスレッドのコンパイルに3～4時間かかっていました。現在はZebraとZalletの両方が**公式の事前ビルド済みARM64バイナリとDockerイメージ**を提供しているため、多くの場合、Pi自体でソースから何かをコンパイルする必要はもうありません。

## 前提条件
- Raspberry Pi 4（4 GB RAM以上を推奨）
- OS用のmicroSDカード（32 GB以上）
- USB 3.0対応の外付けSSD/HDD — **ZebraはMainnetデータのキャッシュに約300 GBを必要とし**、時間とともに増加するため、microSDカード単体での運用は避けてください
- microSDカードスロット付きのコンピューター（OSイメージ書き込み用）
- 有線Ethernet接続またはWi-Fi
- SSH経由でコマンドラインを使う基本的な慣れ

## ステップ1: Ubuntu Server 22.04+（64-bit）を書き込む
ZebraとZalletの事前ビルド済みバイナリおよびDockerイメージには**glibc 2.34+**が必要です。つまり、**Ubuntu Server 22.04以降（64-bit/aarch64）**である必要があります。

1. メインのコンピューターにRaspberry Pi Imagerをインストールします。
2. microSDカードを挿入します。
3. **Other general-purpose OS → Ubuntu → Ubuntu Server 22.04 LTS (64-bit)**（またはそれ以降）を選択します。
4. ヘッドレスで初回起動できるよう、Imagerの詳細オプション（歯車アイコン）でホスト名を事前設定し、SSHを有効化し、必要であればWi-Fi認証情報を設定します。
5. イメージを書き込み、カードを挿入して、Piの電源を入れます。
6. SSHで接続します: `ssh <username>@<pi-hostname-or-ip>`

## ステップ2: 外部ストレージを接続してマウントする
1. 外付けSSD/HDDをUSB 3.0経由で接続します。
2. デバイスを確認します: `lsblk`
3. （新しい場合は）フォーマットしてマウントします。たとえば `/mnt/zcash-data` に、標準的な `mkfs` / `fstab` 設定で再起動時に自動マウントされるよう構成します。

## ステップ3: システムを更新する
```bash
sudo apt update && sudo apt full-upgrade -y
sudo reboot
```

## ステップ4: Zebraをインストールして実行する
### オプションA — Docker（推奨）
```bash
sudo apt install -y docker.io
sudo usermod -aG docker $USER   # log out/in after this
docker run -d \
  --name zebra \
  -p 8233:8233 \
  -v /mnt/zcash-data/zebra:/home/zebra/.cache/zebra \
  zfnd/zebra:latest
```
進行状況を確認: `docker logs -f zebra`

### オプションB — cargo binstallによる事前ビルド済みバイナリ
```bash
curl --proto '=https' --tlsv1.2 -sSf https://sh.rustup.rs | sh
source "$HOME/.cargo/env"
cargo install cargo-binstall
cargo binstall zebrad
zebrad start
```
これにより、事前ビルド済みの`aarch64`バイナリがインストールされます。コンパイルは不要です。

**同期時間について:** これにはしばらく時間がかかると考えてください。よく言及される初回同期時間（おおよそ2時間）は、Pi 4のCPUより高性能なリファレンスハードウェアに基づくものなので、実際のPi 4ハードウェアでの同期時間はそれより長くなる可能性が高いです。

## ステップ5: Zalletをインストールする
Zalletは現在**alpha**段階です。破壊的変更が起こる可能性があるため、現時点では多額の資金を保管する本番運用向けとは見なさないでください。

### オプションA — Docker（推奨）
```bash
docker pull zodlinc/zallet:latest
```
このイメージはARM64をサポートしており（Nixベースのビルド経由）、最小限のシェルなしファイルシステム上で動作します。設定とデータパスは `--datadir` とボリュームマウントを使って明示的に渡してください（ステップ6を参照）。

### オプションB — ソースからビルド
```bash
# Requires Rust 1.85+ (see Step 4B for rustup install)
sudo apt install -y clang libclang-dev protobuf-compiler
cargo install --locked --git https://github.com/zcash/wallet.git
```
Zalletのcrateはalpha段階のあいだ、まだcrates.ioには公開されていないため、gitリポジトリから直接インストールする方法が、Docker以外でサポートされている方法です。

## ステップ6: Zalletを設定する
選択したdatadir（例: `/mnt/zcash-data/zallet`）に `zallet.toml` を作成します:
```toml
[builder.limits]
[consensus]
network = "main"
[database]
[external]
[features]
as_of_version = "0.0.0"
[features.deprecated]
[features.experimental]
[indexer]
validator_address = "127.0.0.1:8232"   # Zebra's JSON-RPC endpoint
[keystore]
[note_management]
[rpc]
bind = ["127.0.0.1:SOMEPORT"]
```
Zebraが別のホスト/ポートで動作している場合は `validator_address` を調整し、`[indexer]` の下で `validator_cookie_auth` / `validator_user` / `validator_password` を設定して、ZebraのRPC認証設定に合わせてください。

**zcashdから移行しますか？** まだ古い `zcash.conf` がある場合:
```bash
zallet migrate-zcash-conf --datadir /path/to/old/zcashd/datadir -o /mnt/zcash-data/zallet/zallet.toml
```

## ステップ7: ウォレット暗号化をセットアップする
Zalletは `age` / `rage` を使ってすべての鍵素材を暗号化します:
```bash
cargo install rage
rage -p -o /mnt/zcash-data/zallet/encryption-identity.txt <(rage-keygen)
```
これにより公開鍵と自動生成されたパスフレーズが表示されます — **このパスフレーズは保存してください。これがないとidentityファイルを復元できません。**

## ステップ8: ウォレットを初期化して起動する
```bash
zallet -d /mnt/zcash-data/zallet init-wallet-encryption
zallet -d /mnt/zcash-data/zallet generate-mnemonic
```
**`generate-mnemonic` は、意図的に複数の独立した支出ルートを作りたい場合を除き、一度だけ実行してください。**

```bash
zallet -d /mnt/zcash-data/zallet start
```

## ステップ9: 既存のzcashdウォレットを移行する（任意）
```bash
zallet -d /mnt/zcash-data/zallet migrate-zcashd-wallet --zcashd-datadir /path/to/old/zcashd/datadir
```
これには `db_dump` ユーティリティ（Berkeley DB 6.2.23向けにビルドされたもの）が必要です。システムにインストールされたもの、またはzcashdのローカルソースビルドのどちらでも構いません。すでにzcashdをインストールしていない場合、これが現時点でまだZalletだけでは完結していない唯一の移行ステップです。

## ステップ10: すべてが動作することを確認する
```bash
zallet -d /mnt/zcash-data/zallet help
```
ウォレットが応答することを確認し、Zebraの同期完了後に残高やアドレスが想定どおりであることを確認してください。

## トラブルシューティング
- **ARMでのZebraのビルド/実行時の問題:** ソースからビルドする場合は、RustのARMツールチェーンをインストールしてください。Zebra自身のドキュメントにもあるとおり、ARMハードウェア上でx86_64のビルドツールを動かすと、明らかに遅くなります。
- **ストレージ容量不足:** Zebraの約300 GBという使用量は増え続けます — 余裕を見込んでください。
- **Dockerの権限エラー:** ユーザーを `docker` グループに追加した後は、いったんログアウトしてから再ログインしてください。それまでのあいだは `sudo` を使ってください。
- **Zalletコンテナにはシェルがない:** 公式の `zodlinc/zallet` イメージは設計上from-scratchです — 常に `--datadir` を明示的に渡し、データディレクトリをボリュームとしてマウントしてください。

## 旧zcashdガイドと比べたハードウェア上の注意
ZebraとZalletは、事前ビルド済みバイナリ/コンテナを実行するため、一般的にセットアップ時のCPU負荷はzcashdをコンパイルしていた頃より軽くなります。4 GB RAMは妥当な出発点です。`htop` で監視し、激しいスワップが見られる場合は8 GB版のPi 4も検討してください。

## 追加リソース
- [Zebra Book](https://zebra.zfnd.org) — 公式のZebraドキュメント
- [Zallet Book](https://zcash.github.io/wallet) — 公式のZalletドキュメント
- [zcashdサポート終了のお知らせ](https://z.cash/support/zcashd-deprecation)

---

*このガイドが役に立ったなら、ZecHubへの支援をご検討ください: [現在のZecHub寄付用シールドアドレスをzechub.wiki/donationから挿入 — ここでは、まだ最新であることを確認できなかったため含めていません]。*
