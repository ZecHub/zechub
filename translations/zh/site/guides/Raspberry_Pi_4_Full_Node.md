# 在 Raspberry Pi 4 上运行全节点 [Full Node]（Zebra + Zallet）

*迁移自原始的基于 zcashd 的指南。zcashd 于 2026 年 7 月 18 日达到自动停止支持状态，因此本指南现改用 **Zebra**（由 Zcash Foundation 维护的当前全节点）和 **Zallet**（为替代 zcashd 内置钱包 [wallet] 而构建的钱包）。*

## 你将学到什么
- 如何在 Raspberry Pi 4 上刷写并配置 Ubuntu Server 22.04+（64 位）以进行无头使用
- 如何通过 Docker 或预构建二进制文件安装并运行 Zebra
- 如何安装、配置和初始化 Zallet，包括钱包加密 [encryption] 设置
- 如何选择性地将现有的 zcashd 配置/钱包迁移至 Zallet

## 与旧指南相比有哪些变化
本指南的上一版本介绍了如何在 Pi 4 上原生编译 **zcashd**——由于 Pi 4 没有足够内存进行并行（`-j$(nproc)`）构建，单线程编译需要 3–4 小时。Zebra 和 Zallet 现均提供**官方预构建 ARM64 二进制文件和 Docker 镜像**，因此在大多数情况下，你不再需要在 Pi 本身上从源代码编译任何内容。

## 前提条件
- 一台 Raspberry Pi 4（建议 4 GB RAM 或更高）
- 一张 microSD 卡（32 GB+），用于操作系统
- 一个支持 USB 3.0 的外置 SSD/HDD——**Zebra 需要约 300 GB 来存储缓存的 Mainnet 数据**，且会随时间增长，因此不要尝试仅使用 microSD 卡运行它
- 一台配有 microSD 卡槽的电脑（用于刷写操作系统镜像）
- 有线 Ethernet 连接或 Wi-Fi
- 能够通过 SSH 使用命令行的基本能力

## 第 1 步：刷写 Ubuntu Server 22.04+（64 位）
Zebra 和 Zallet 的预构建二进制文件以及 Docker 镜像需要 **glibc 2.34+**，这意味着需要使用 **Ubuntu Server 22.04 或更新版本（64 位/aarch64）**。

1. 在主电脑上安装 Raspberry Pi Imager。
2. 插入 microSD 卡。
3. 选择 **Other general-purpose OS → Ubuntu → Ubuntu Server 22.04 LTS (64-bit)**（或更新版本）。
4. 使用 Imager 的高级选项（齿轮图标）预先配置主机名、启用 SSH，并在需要时设置 Wi-Fi 凭据，以便进行无头首次启动。
5. 写入镜像，插入卡，然后启动 Pi。
6. 通过 SSH 登录：`ssh <username>@<pi-hostname-or-ip>`

## 第 2 步：连接并挂载外部存储
1. 通过 USB 3.0 连接外置 SSD/HDD。
2. 识别设备：`lsblk`
3. 对其进行格式化（若为新设备）并挂载，例如挂载到 `/mnt/zcash-data`，使用标准的 `mkfs`/`fstab` 设置，以便在重启时自动挂载。

## 第 3 步：更新系统
```bash
sudo apt update && sudo apt full-upgrade -y
sudo reboot
```

## 第 4 步：安装并运行 Zebra
### 选项 A — Docker（推荐）
```bash
sudo apt install -y docker.io
sudo usermod -aG docker $USER   # log out/in after this
docker run -d \
  --name zebra \
  -p 8233:8233 \
  -v /mnt/zcash-data/zebra:/home/zebra/.cache/zebra \
  zfnd/zebra:latest
```
检查进度：`docker logs -f zebra`

### 选项 B — 通过 cargo binstall 安装预构建二进制文件
```bash
curl --proto '=https' --tlsv1.2 -sSf https://sh.rustup.rs | sh
source "$HOME/.cargo/env"
cargo install cargo-binstall
cargo binstall zebrad
zebrad start
```
这会安装一个预构建的 `aarch64` 二进制文件——无需编译。

**关于同步时间：**预计这将需要一段时间——常被引用的首次同步数据（约 2 小时）来自性能强于 Pi 4 CPU 的参考硬件，因此在实际 Pi 4 硬件上的同步时间可能会更长。

## 第 5 步：安装 Zallet
Zallet 目前处于 **alpha** 阶段——预计会有破坏性变更，暂时也不要将其视为可用于托管大量资金的生产就绪方案。

### 选项 A — Docker（推荐）
```bash
docker pull zodlinc/zallet:latest
```
该镜像支持 ARM64（通过基于 Nix 的构建），并从一个最小化、无 shell 的文件系统运行——通过 `--datadir` 和卷挂载明确传递配置及数据路径（见第 6 步）。

### 选项 B — 从源代码构建
```bash
# Requires Rust 1.85+ (see Step 4B for rustup install)
sudo apt install -y clang libclang-dev protobuf-compiler
cargo install --locked --git https://github.com/zcash/wallet.git
```
在 alpha 阶段，Zallet 的 crates 尚未发布到 crates.io，因此直接从 git 仓库安装是受支持的非 Docker 方法。

## 第 6 步：配置 Zallet
在所选的数据目录（例如 `/mnt/zcash-data/zallet`）中创建 `zallet.toml`：
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
如果 Zebra 在不同的主机/端口上运行，请调整 `validator_address`；并在 `[indexer]` 下配置 `validator_cookie_auth`/`validator_user`/`validator_password`，以匹配你的 Zebra RPC 认证设置。

**从 zcashd 迁移？**如果你仍有旧的 `zcash.conf`：
```bash
zallet migrate-zcash-conf --datadir /path/to/old/zcashd/datadir -o /mnt/zcash-data/zallet/zallet.toml
```

## 第 7 步：设置钱包加密
Zallet 使用 `age`/`rage` 加密所有密钥材料：
```bash
cargo install rage
rage -p -o /mnt/zcash-data/zallet/encryption-identity.txt <(rage-keygen)
```
这会打印一个公钥和自动生成的密码短语——**请保存该密码短语；没有它，你无法恢复身份文件。**

## 第 8 步：初始化并启动钱包
```bash
zallet -d /mnt/zcash-data/zallet init-wallet-encryption
zallet -d /mnt/zcash-data/zallet generate-mnemonic
```
**除非你有意创建多个独立的支出根，否则仅运行一次 `generate-mnemonic`。**

```bash
zallet -d /mnt/zcash-data/zallet start
```

## 第 9 步：迁移现有 zcashd 钱包（可选）
```bash
zallet -d /mnt/zcash-data/zallet migrate-zcashd-wallet --zcashd-datadir /path/to/old/zcashd/datadir
```
这需要 `db_dump` 工具（针对 Berkeley DB 6.2.23 构建）——来自系统安装或 zcashd 的本地源代码构建。如果你不再安装 zcashd，这是目前尚未能完全在 Zallet 中自包含完成的迁移步骤。

## 第 10 步：验证一切正常
```bash
zallet -d /mnt/zcash-data/zallet help
```
确认钱包能够响应，并在 Zebra 完成同步后，确认余额/地址符合预期。

## 故障排除
- **ARM 上的 Zebra 构建/运行时问题：**如果从源代码构建，请安装 Rust ARM 工具链——根据 Zebra 自身的文档，在 ARM 硬件上运行 x86_64 构建工具会明显更慢。
- **存储空间已满：**Zebra 约 300 GB 的占用空间会持续增长——请预留余量。
- **Docker 权限错误：**将用户添加到 `docker` 组后，请注销并重新登录；或者暂时使用 `sudo`。
- **Zallet 容器没有 shell：**官方 `zodlinc/zallet` 镜像按设计从头构建——始终明确传递 `--datadir`，并将数据目录作为卷挂载。

## 与旧 zcashd 指南相比的硬件说明
Zebra 和 Zallet 在设置期间的 CPU 负载通常低于编译 zcashd，因为你运行的是预构建二进制文件/容器。4 GB RAM 是合理的起点；使用 `htop` 进行监控，如果发现大量交换，请考虑 8 GB Pi 4 版本。

## 其他资源
- [Zebra Book](https://zebra.zfnd.org) — 官方 Zebra 文档
- [Zallet Book](https://zcash.github.io/zallet/) — 官方 Zallet 文档
- [zcashd 停止支持通知](https://z.cash/support/zcashd-deprecation)

---

*如果你觉得本指南有用，请考虑支持 ZecHub：[插入来自 zechub.wiki/donation 的当前 ZecHub 捐赠屏蔽地址——由于我无法确认其仍为最新地址，因此未在此处包含。*
