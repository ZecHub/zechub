# ハードニングされたZebraフルノード

- 特定の非特権ユーザー + カーネルレベルのsystemdサンドボックスを使用（Dockerと同じ分離）。  
- RPCはlocalhost限定で、セキュアなクッキー認証を使用（デフォルト＆推奨）。

---

## 事前条件

- Ubuntuベースのディストリビューション
- Rustツールチェーンがインストール済み（`rustup` + `cargo`）
- 至少300 GBの空きディスク容量（`/var`パーティション）

---

## 一回限りのセットアップ（通常ユーザーとして実行）

### 1. システムを更新し、ビルド依存関係をインストール

```
sudo apt update && sudo apt install -y build-essential pkg-config libclang-dev clang libssl-dev protobuf-compiler
```

## Rustを更新し最新のzebradをインストール（v4.3.0+）

```
rustup update
cargo install --locked --force zebrad
sudo cp ~/.cargo/bin/zebrad /usr/local/bin/zebrad
sudo chown root:root /usr/local/bin/zebrad
sudo chmod 755 /usr/local/bin/zebrad
zebrad --version
```

## 特定の非特権ユーザーzebraを作成

```
sudo adduser --system --group --no-create-home --shell /usr/sbin/nologin zebra
```


## セキュアなデータディレクトリを作成

```
sudo mkdir -p /var/lib/zebrad
sudo chown zebra:zebra /var/lib/zebrad
sudo chmod 700 /var/lib/zebrad
```

## セキュアな設定ファイルを作成（`/etc/zebrad/zebrad.toml`）

```
sudo mkdir -p /etc/zebrad
sudo tee /etc/zebrad/zebrad.toml > /dev/null <<EOF
[network]
network = "Mainnet"
listen_addr = "0.0.0.0:8233"

[state]
cache_dir = "/var/lib/zebrad"

[rpc]
# localhostのみでRPCを有効化（インターネットに公開しない！）
listen_addr = "127.0.0.1:8232"

# クッキー認証
enable_cookie_auth = true     # ← 明示するためにコメント解除
EOF

sudo chown zebra:zebra /etc/zebrad/zebrad.toml
sudo chmod 600 /etc/zebrad/zebrad.toml
```

## ハードニングされたsystemdサービスを作成

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
ExecStartPost=/bin/chmod 750 /var/lib/zebrad-rpc
ExecStartPost=/bin/chmod 640 /var/lib/zebrad-rpc/.cookie

# カーネルレベルのサンドボックス（ネイティブなzebradをDockerと同じくらい分離）
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

## 日常的な使用 - 単一コマンドワークフロー

| アクション                  | コマンド                                      | メモ |
|-------------------------|----------------------------------------------|-------|
| **開始**               | `sudo systemctl start zebrad`                | 1つのコマンド |
| **停止**                | `sudo systemctl stop zebrad`                 | 1つのコマンド |
| **ステータス確認**      | `sudo systemctl status zebrad`               | 実行中かどうかを表示 |
| **ライブログの取得**    | `journalctl -u zebrad -f -o short-precise`  | `screen -r`の代替 |
| **RPCクッキーの取得**   | `sudo cat /var/lib/zebrad/.cookie`           | 実行中のみ有効 |

**便利なエイリアス**（`~/.bashrc`または`~/.zshrc`に追加）:
```
alias zebra-start='sudo systemctl start zebrad'
alias zebra-stop='sudo systemctl stop zebrad'
alias zebra-status='sudo systemctl status zebrad'
alias zebra-logs='journalctl -u zebrad -f'
alias zebra-cookie='sudo cat /var/lib/zebrad/.cookie'
```
