# Raspberry Pi 4でフルノード（Full Node）を稼働させる（Zebra + Zallet）

*元のzcashdベースのガイドから移行しました。zcashdは2026年7月18日に自動サポート終了に達したため、このガイドでは現在、**Zebra**（Zcash Foundationが保守する現在のフルノード）および**Zallet**（zcashdの内蔵ウォレットを置き換えるために構築されたウォレット（Wallet））を使用します。*

## 学べること
- ヘッドレス環境で使用するため、Raspberry Pi 4にUbuntu Server 22.04+（64ビット）を書き込み、設定する方法
- Dockerまたはビルド済みバイナリを介して、Zebraをインストールして実行する方法
- ウォレットの暗号化（Encryption）設定を含め、Zalletをインストール、設定、初期化する方法
- 既存のzcashd設定／ウォレットを任意でZalletへ移行する方法

## 以前のガイドからの変更点
このガイドの以前の版では、Pi 4上で**zcashd**をネイティブにコンパイルする手順を説明していました。Pi 4には並列（`-j$(nproc)`）ビルドに十分なメモリがないため、シングルスレッドでのコンパイルには3～4時間かかっていました。現在、ZebraとZalletはいずれも**公式のビルド済みARM64バイナリおよびDockerイメージ**を提供しているため、ほとんどの場合、Pi本体でソースから何かをコンパイルする必要はありません。

## 前提条件
- Raspberry Pi 4（4 GB RAM以上を推奨）
- OS用のmicroSDカード（32 GB以上）
- USB 3.0対応の外付けSSD/HDD — **ZebraはキャッシュされたMainnetデータ用に約300 GBを必要とし、時間とともに増加します**。したがって、microSDカードだけで実行しないでください
- microSDカードスロットを備えたコンピューター（OSイメージを書き込むため）
- 有線Ethernet接続またはWi-Fi
- SSH経由のコマンドライン操作に関する基本的な知識

## ステップ1：Ubuntu Server 22.04+（64ビット）を書き込む
ZebraおよびZalletのビルド済みバイナリとDockerイメージには**glibc 2.34+**が必要です。つまり、**Ubuntu Server 22.04以降（64ビット/aarch64）**が必要です。

1. メインコンピューターにRaspberry Pi Imagerをインストールします。
2. microSDカードを挿入します。
3. **Other general-purpose OS → Ubuntu → Ubuntu Server 22.04 LTS (64-bit)**（またはそれ以降）を選択します。
4. ヘッドレスで初回起動できるよう、Imagerの詳細オプション（歯車アイコン）でホスト名を事前設定し、SSHを有効化し、必要に応じてWi-Fi認証情報を設定します。
5. イメージを書き込み、カードを挿入してPiの電源を入れます。
6. SSHで接続します：`ssh <username>@<pi-hostname-or-ip>`

## ステップ2：外部ストレージを接続してマウントする
1. 外付けSSD/HDDをUSB 3.0経由で接続します。
2. デバイスを特定します：`lsblk`
3. （新品の場合は）フォーマットし、例えば`/mnt/zcash-data`にマウントします。再起動時に自動マウントされるよう、標準的な`mkfs`/`fstab`設定を使用します。

## ステップ3：システムを更新する
```bash
sudo apt update && sudo apt full-upgrade -y
sudo reboot
```

## ステップ4：Zebraをインストールして実行する
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
進捗を確認します：`docker logs -f zebra`

### オプションB — cargo binstallによるビルド済みバイナリ
```bash
curl --proto '=https' --tlsv1.2 -sSf https://sh.rustup.rs | sh
source "$HOME/.cargo/env"
cargo install cargo-binstall
cargo binstall zebrad
zebrad start
```
これにより、ビルド済みの`aarch64`バイナリがインストールされます。コンパイルは不要です。

**同期時間について：**これにはしばらく時間がかかります。よく引用される初回同期の所要時間（約2時間）は、Pi 4のCPUより高性能な参照ハードウェアに基づいているため、実際のPi 4ハードウェアでの同期時間はより長くなる可能性があります。

## ステップ5：Zalletをインストールする
Zalletは現在**アルファ版**です。破壊的変更が予想されるため、現時点では多額の資金を本番環境でカストディする用途には使用しないでください。

### オプションA — Docker（推奨）
```bash
docker pull zodlinc/zallet:latest
```
このイメージはARM64（Nixベースのビルド経由）をサポートし、最小限のシェルなしファイルシステムから実行されます。`--datadir`およびボリュームマウントを通じて、設定とデータのパスを明示的に指定してください（ステップ6を参照）。

### オプションB — ソースからビルドする
```bash
# Requires Rust 1.85+ (see Step 4B for rustup install)
sudo apt install -y clang libclang-dev protobuf-compiler
cargo install --locked --git https://github.com/zcash/wallet.git
```
アルファ段階ではZalletのクレートはまだcrates.ioで公開されていないため、gitリポジトリから直接インストールすることが、Docker以外でサポートされている方法です。

## ステップ6：Zalletを設定する
選択したデータディレクトリ（例：`/mnt/zcash-data/zallet`）に`zallet.toml`を作成します：
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
Zebraが異なるホスト／ポートで実行される場合は`validator_address`を調整し、ZebraのRPC認証設定に合わせて、`[indexer]`の下で`validator_cookie_auth`/`validator_user`/`validator_password`を設定します。

**zcashdから移行しますか？** 古い`zcash.conf`がまだある場合：
```bash
zallet migrate-zcash-conf --datadir /path/to/old/zcashd/datadir -o /mnt/zcash-data/zallet/zallet.toml
```

## ステップ7：ウォレット暗号化を設定する
Zalletは`age`/`rage`を使用してすべての鍵素材を暗号化します：
```bash
cargo install rage
rage -p -o /mnt/zcash-data/zallet/encryption-identity.txt <(rage-keygen)
```
これにより公開鍵と自動生成されたパスフレーズが出力されます。**パスフレーズを保存してください。これがなければアイデンティティファイルを復元できません。**

## ステップ8：ウォレットを初期化して起動する
```bash
zallet -d /mnt/zcash-data/zallet init-wallet-encryption
zallet -d /mnt/zcash-data/zallet generate-mnemonic
```
意図的に複数の独立した支出ルートを作成したい場合を除き、**`generate-mnemonic`は1回だけ実行してください**。

```bash
zallet -d /mnt/zcash-data/zallet start
```

## ステップ9：既存のzcashdウォレットを移行する（任意）
```bash
zallet -d /mnt/zcash-data/zallet migrate-zcashd-wallet --zcashd-datadir /path/to/old/zcashd/datadir
```
これには`db_dump`ユーティリティ（Berkeley DB 6.2.23に対してビルド済み）が必要です。システムへのインストール、またはzcashdのローカルソースビルドから利用できます。zcashdをすでにインストールしていない場合、これはまだZallet内で完全に自己完結していない唯一の移行ステップです。

## ステップ10：すべてが動作することを確認する
```bash
zallet -d /mnt/zcash-data/zallet help
```
ウォレットが応答すること、またZebraの同期完了後に残高／アドレス（Address）が期待どおりであることを確認します。

## トラブルシューティング
- **ARM上のZebraビルド／ランタイムの問題：**ソースからビルドする場合は、RustのARMツールチェーンをインストールしてください。Zebra自身のドキュメントによれば、ARMハードウェア上でx86_64ビルドツールを実行すると、明らかに遅くなります。
- **ストレージ容量の不足：**Zebraの約300 GBの使用量は増え続けます。余裕を持って計画してください。
- **Dockerの権限エラー：**ユーザーを`docker`グループに追加した後、ログアウトして再度ログインしてください。それまでの間は`sudo`を使用してください。
- **Zalletコンテナにシェルがない：**公式の`zodlinc/zallet`イメージは意図的にfrom-scratchで作られています。常に`--datadir`を明示的に渡し、データディレクトリをボリュームとしてマウントしてください。

## 以前のzcashdガイドと比較したハードウェアに関する注意
ZebraとZalletは、ビルド済みバイナリ／コンテナを実行するため、zcashdのコンパイルと比べて、通常はセットアップ中のCPU負荷が軽くなります。4 GB RAMは妥当な出発点です。`htop`で監視し、スワップが多発する場合は8 GB版Pi 4を検討してください。

## 追加リソース
- [Zebra Book](https://zebra.zfnd.org) — 公式Zebraドキュメント
- [Zallet Book](https://zcash.github.io/zallet/) — 公式Zalletドキュメント
- [zcashdサポート終了のお知らせ](https://z.cash/support/zcashd-deprecation)

---

*このガイドが役に立った場合は、ZecHubの支援をご検討ください：[zechub.wiki/donationから現在のZecHub寄付用シールドされたアドレスを挿入してください。現在も有効であることを確認できなかったため、ここには含めていません。*
