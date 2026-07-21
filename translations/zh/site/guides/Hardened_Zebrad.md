# 加固的 Zebra 全节点

- 使用专用的非特权用户 + 内核级 systemd 沙箱隔离（与 Docker 相同级别的隔离）。  
- RPC 仅限 localhost，并使用安全的 cookie 认证（默认且推荐）。  


---

## 前置条件

- 任意基于 Ubuntu 的发行版
- 已安装 Rust 工具链（`rustup` + `cargo`）
- 至少 300 GB 可用磁盘空间（`/var` 分区）


---

## 一次性设置（以你的普通用户身份运行）

### 1. 更新系统并安装构建依赖

```
sudo apt update && sudo apt install -y build-essential pkg-config libclang-dev clang libssl-dev protobuf-compiler
```

## 更新 Rust 并安装最新的 zebrad（v4.3.0+）

```
rustup update
cargo install --locked --force zebrad
sudo cp ~/.cargo/bin/zebrad /usr/local/bin/zebrad
sudo chown root:root /usr/local/bin/zebrad
sudo chmod 755 /usr/local/bin/zebrad
zebrad --version
```

## 创建专用的非特权 zebra 用户

```
sudo adduser --system --group --no-create-home --shell /usr/sbin/nologin zebra
```


## 创建安全的数据目录

```
sudo mkdir -p /var/lib/zebrad
sudo chown zebra:zebra /var/lib/zebrad
sudo chmod 700 /var/lib/zebrad
```

## 创建安全配置（/etc/zebrad/zebrad.toml）

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

## 创建加固的 systemd 服务

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

## 日常使用 - 单命令工作流

| 操作 | 命令 | 说明 |
|-------------------------|----------------------------------------------|-------|
| **启动** | `sudo systemctl start zebrad` | 一条命令 |
| **停止** | `sudo systemctl stop zebrad` | 一条命令 |
| **状态** | `sudo systemctl status zebrad` | 显示是否正在运行 |
| **实时日志** | `journalctl -u zebrad -f -o short-precise`  | 替代 `screen -r` |
| **获取 RPC cookie** | `sudo cat /var/lib/zebrad/.cookie` | 仅在运行时可用 |

**便捷别名**（添加到 `~/.bashrc` 或 `~/.zshrc`）：
```
alias zebra-start='sudo systemctl start zebrad'
alias zebra-stop='sudo systemctl stop zebrad'
alias zebra-status='sudo systemctl status zebrad'
alias zebra-logs='journalctl -u zebrad -f'
alias zebra-cookie='sudo cat /var/lib/zebrad/.cookie'
