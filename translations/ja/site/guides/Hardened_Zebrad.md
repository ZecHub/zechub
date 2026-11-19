# 強化されたZebraフルノード

- 専用の非特権ユーザーとカーネルレベルのsystemdサンドボックスを使用します（Dockerと同じ隔離方式です）。
- RPCはlocalhostからのみ利用でき、安全なCookie認証を使います（デフォルトかつ推奨）。

---

## 前提条件

- Ubuntuベースのディストリビューション
- Rustツールチェーンがインストールされていること（`rustup` + `cargo`）
- 300 GB以上の空きディスク容量（`/var`パーティション）

---

## 初回セットアップ（通常ユーザーとして実行）

### 1. システムを更新し、ビルド依存関係をインストールする

```
sudo apt update && sudo apt install -y build-essential pkg-config libclang-dev clang libssl-dev protobuf-compiler
```

## Rustを更新し、最新のzebrad（7.0.0以降）をインストールする

NU7はブロック3,543,405でメインネット上で有効になりました。その高さ以降もチェーンに追従するのは[Zebra 7.0.0](https://github.com/ZcashFoundation/zebra/releases/tag/v7.0.0)以降のみです。そのため、6.x以前の`zebrad`は古いルールのまま停止します。ビルドにはRust 1.91以降が必要で、`rustup update`によってインストールされます。Zebra 6.xから既存のノードをアップグレードする場合は、先に`/var/lib/zebrad/state/v28`をバックアップしてください。Zebra 7は初回起動時にデータベースを新しいv29形式へ移行し、その後は6.xで読み取れなくなります。

```
rustup update
cargo install --locked --force zebrad
sudo cp ~/.cargo/bin/zebrad /usr/local/bin/zebrad
sudo chown root:root /usr/local/bin/zebrad
sudo chmod 755 /usr/local/bin/zebrad
zebrad --version
```

## 専用の非特権zebraユーザーを作成する

```
sudo adduser --system --group --no-create-home --shell /usr/sbin/nologin zebra
```

## 安全なデータディレクトリを作成する

```
sudo mkdir -p /var/lib/zebrad
sudo chown zebra:zebra /var/lib/zebrad
sudo chmod 700 /var/lib/zebrad
sudo mkdir -p /var/lib/zebrad-rpc
sudo chown zebra:zebra /var/lib/zebrad-rpc
sudo chmod 750 /var/lib/zebrad-rpc
```

`/var/lib/zebrad-rpc`にはRPC認証Cookieが保存されます。以下のサービスが書き込めるのはこの2つのディレクトリのみです。どちらかが存在しない場合、systemdはサービスの起動を拒否します。

## 安全な設定ファイルを作成する（/etc/zebrad/zebrad.toml）

```
sudo mkdir -p /etc/zebrad
sudo tee /etc/zebrad/zebrad.toml > /dev/null <<EOF
[network]
network = "Mainnet"
listen_addr = "0.0.0.0:8233"
# Peer cache. The default, ~/.cache/zebra, isn't writable by this service
cache_dir = "/var/lib/zebrad"

[state]
cache_dir = "/var/lib/zebrad"

[rpc]
# Enable RPC on localhost only (never expose to the internet!)
listen_addr = "127.0.0.1:8232"

# Cookie authentication 
enable_cookie_auth = true     # the default, shown to be explicit
# Without this line the cookie goes to ~/.cache/zebra, which this service can't write to,
# and zebrad stops at startup with "Zebra must be able to write the auth cookie to the disk"
cookie_dir = "/var/lib/zebrad-rpc"
EOF

sudo chown zebra:zebra /etc/zebrad/zebrad.toml
sudo chmod 600 /etc/zebrad/zebrad.toml
```

## 強化されたsystemdサービスを作成する

```
sudo tee /etc/systemd/system/zebrad.service > /dev/null <<EOF
[Unit]
Description=Zebra Zcash Full Node (zebrad)
After=network.target

[Service]
Type=simple
User=zebra
Group=zebra
ExecStart=/usr/local/bin/zebrad --config /etc/zebrad/zebrad.toml start

UMask=0027

# Kernel-level sandboxing (makes native zebrad as isolated as Docker)
ProtectSystem=strict
ProtectHome=yes
PrivateTmp=yes
PrivateDevices=yes
NoNewPrivileges=yes
RestrictAddressFamilies=AF_INET AF_INET6
RestrictNamespaces=yes
MemoryDenyWriteExecute=yes
ReadWritePaths=/var/lib/zebrad /var/lib/zebrad-rpc

LimitNOFILE=65535
Restart=on-failure
RestartSec=5s
EOF

sudo systemctl daemon-reload
```

Zebraは起動のたびに新しいCookieを書き込みます。このCookieは`zebra`ユーザーのみが読み取れ（モード600）、サービスの停止時に削除されます。以下のように`sudo`で読み取ってください。Cookieのモードを変更する`ExecStartPost=`行は追加しないでください。zebradがCookieを書き込む前に実行されることがあり、`ExecStartPost=`コマンドが失敗するとサービスが停止するためです。

## 日常の使い方 — 1コマンドで操作

| 操作 | コマンド | 備考 |
|-------------------------|----------------------------------------------|-------|
| **起動**               | `sudo systemctl start zebrad`                | 1コマンド |
| **停止**                | `sudo systemctl stop zebrad`                 | 1コマンド |
| **状態**              | `sudo systemctl status zebrad`               | 実行中かどうかを表示 |
| **リアルタイムログ**           | `journalctl -u zebrad -f -o short-precise`  | `screen -r`を置き換えます |
| **RPC Cookieを取得**      | `sudo cat /var/lib/zebrad-rpc/.cookie`           | 実行中のみ |

**便利なエイリアス**（`~/.bashrc`または`~/.zshrc`に追加）:
```
alias zebra-start='sudo systemctl start zebrad'
alias zebra-stop='sudo systemctl stop zebrad'
alias zebra-status='sudo systemctl status zebrad'
alias zebra-logs='journalctl -u zebrad -f'
alias zebra-cookie='sudo cat /var/lib/zebrad-rpc/.cookie'
```
