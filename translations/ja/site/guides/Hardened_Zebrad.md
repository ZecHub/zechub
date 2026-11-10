# 強化された Zebra フルノード

- 専用の非特権ユーザーとカーネルレベルのsystemdサンドボックス化を使用します（Dockerと同じ分離です）。  
- RPCはローカルホスト限定で、安全なクッキー認証を使用します（デフォルトかつ推奨）。  


---

## 前提条件

- Ubuntuベースの任意のディストリビューション
- Rustツールチェーンがインストール済み（`rustup` + `cargo`）
- 少なくとも300 GBの空きディスク容量（`/var`パーティション）


---

## 1回限りのセットアップ（通常のユーザーとして実行）

### 1. システムを更新し、ビルド依存関係をインストールする

```
sudo apt update && sudo apt install -y build-essential pkg-config libclang-dev clang libssl-dev protobuf-compiler
```

## Rustを更新し、最新のzebrad（v4.3.0+）をインストールする

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
```

## 安全な設定を作成する（/etc/zebrad/zebrad.toml）

```
sudo mkdir -p /etc/zebrad
sudo tee /etc/zebrad/zebrad.toml > /dev/null <<EOF
[network]
network = "Mainnet"
listen_addr = "0.0.0.0:8233"

[state]
cache_dir = "/var/lib/zebrad"

[rpc]
# Enable RPC on localhost only (never expose to the internet!)
listen_addr = "127.0.0.1:8232"

# Cookie authentication 
enable_cookie_auth = true     # ← uncomment to be explicit
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
ExecStartPost=/bin/chmod 750 /var/lib/zebrad-rpc
ExecStartPost=/bin/chmod 640 /var/lib/zebrad-rpc/.cookie

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

## 日常的な使用方法 - 単一コマンドのワークフロー

| 操作                  | コマンド                                      | 注記 |
|-------------------------|----------------------------------------------|-------|
| **開始**               | `sudo systemctl start zebrad`                | 1つのコマンド |
| **停止**                | `sudo systemctl stop zebrad`                 | 1つのコマンド |
| **ステータス**              | `sudo systemctl status zebrad`               | 実行中かどうかを表示します |
| **ライブログ**           | `journalctl -u zebrad -f -o short-precise`  | `screen -r`の代わりになります |
| **RPCクッキーを取得**      | `sudo cat /var/lib/zebrad/.cookie`           | 実行中の場合のみ |

**便利なエイリアス**（`~/.bashrc`または`~/.zshrc`に追加）:
```
alias zebra-start='sudo systemctl start zebrad'
alias zebra-stop='sudo systemctl stop zebrad'
alias zebra-status='sudo systemctl status zebrad'
alias zebra-logs='journalctl -u zebrad -f'
alias zebra-cookie='sudo cat /var/lib/zebrad/.cookie'
```
