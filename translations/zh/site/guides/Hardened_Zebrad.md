# 加固的 Zebra 全节点

- 使用专用的非特权用户 + 内核级 systemd 沙箱（隔离方式与 Docker 相同）。  
- RPC 仅限本地主机，并使用安全的 cookie 身份验证（默认且推荐）。  


---

## 前置条件

- 任意基于 Ubuntu 的发行版
- 已安装 Rust 工具链（`rustup` + `cargo`）
- 至少 300 GB 可用磁盘空间（`/var` 分区）


---

## 一次性设置（以普通用户身份运行）

### 1. 更新系统并安装构建依赖项

```
sudo apt update && sudo apt install -y build-essential pkg-config libclang-dev clang libssl-dev protobuf-compiler
```

## 更新 Rust 并安装最新的 zebrad（7.0.0 或更高版本）

NU7 已在区块 3,543,405 激活 Mainnet。只有 [Zebra 7.0.0](https://github.com/ZcashFoundation/zebra/releases/tag/v7.0.0) 及更高版本会在该高度之后继续遵循这条链，因此 6.x 或更早版本的 `zebrad` 会停留在旧规则上。构建它需要 Rust 1.91 或更高版本，而 `rustup update` 会安装该版本。如果你要将现有节点从 Zebra 6.x 升级，请先备份 `/var/lib/zebrad/state/v28`：Zebra 7 会在首次启动时将其迁移到新的 v29 数据库格式，之后 6.x 将无法读取该数据库。

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
sudo mkdir -p /var/lib/zebrad-rpc
sudo chown zebra:zebra /var/lib/zebrad-rpc
sudo chmod 750 /var/lib/zebrad-rpc
```

`/var/lib/zebrad-rpc` 保存 RPC 身份验证 cookie。下面的服务只能写入这两个目录；如果其中任一目录缺失，systemd 将拒绝启动服务。

## 创建安全配置（/etc/zebrad/zebrad.toml）

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

Zebra 每次启动时都会写入新的 cookie，该 cookie 仅对 `zebra` 用户可读（权限模式 600），并会在服务停止时删除。如下所示，使用 `sudo` 读取它。不要添加会更改 cookie 权限模式的 `ExecStartPost=` 行：它可能会在 zebrad 写入 cookie 之前运行，而 `ExecStartPost=` 命令失败会导致服务停止。

## 日常使用 - 单命令工作流

| 操作                  | 命令                                      | 备注 |
|-------------------------|----------------------------------------------|-------|
| **启动**               | `sudo systemctl start zebrad`                | 一条命令 |
| **停止**                | `sudo systemctl stop zebrad`                 | 一条命令 |
| **状态**              | `sudo systemctl status zebrad`               | 显示是否正在运行 |
| **实时日志**           | `journalctl -u zebrad -f -o short-precise`  | 替代 `screen -r` |
| **获取 RPC cookie**      | `sudo cat /var/lib/zebrad-rpc/.cookie`           | 仅在运行时可用 |

**便捷别名**（添加到 `~/.bashrc` 或 `~/.zshrc`）：
```
alias zebra-start='sudo systemctl start zebrad'
alias zebra-stop='sudo systemctl stop zebrad'
alias zebra-status='sudo systemctl status zebrad'
alias zebra-logs='journalctl -u zebrad -f'
alias zebra-cookie='sudo cat /var/lib/zebrad-rpc/.cookie'
```
