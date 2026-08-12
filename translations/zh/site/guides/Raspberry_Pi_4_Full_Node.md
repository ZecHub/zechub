# 在 Raspberry Pi 4 上运行完整节点（Zebra + Zallet）

*已从原始基于 zcashd 的指南迁移。zcashd 已于 2026 年 7 月 18 日达到其自动停止支持（End-of-Support）期限，因此本指南现改用 **Zebra**（当前的完整节点，由 Zcash Foundation 维护）和 **Zallet**（为替代 zcashd 内置钱包而构建的钱包）。*

## 你将学到什么
- 如何为无头使用在 Raspberry Pi 4 上刷写并配置 Ubuntu Server 22.04+（64 位）
- 如何通过 Docker 或预构建二进制文件安装并运行 Zebra
- 如何安装、配置并初始化 Zallet，包括钱包加密设置
- 如何可选地将现有的 zcashd 配置/钱包迁移到 Zallet

## 与旧指南相比有哪些变化
本指南的前一版本介绍了如何在 Pi 4 上原生编译 **zcashd** —— 由于 Pi 4 没有足够内存进行并行（`-j$(nproc)`）构建，因此单线程编译需要 3–4 小时。现在 Zebra 和 Zallet 都提供了 **官方预构建的 ARM64 二进制文件和 Docker 镜像**，因此在大多数情况下，你不再需要在 Pi 本机上从源码编译任何东西。

## 前置条件
- 一台 Raspberry Pi 4（建议 4 GB RAM 或更多）
- 一张用于操作系统的 microSD 卡（32 GB+）
- 一个支持 USB 3.0 的外接 SSD/HDD —— **Zebra 需要大约 300 GB 来缓存主网数据**，并且会随着时间增长，所以不要试图只靠 microSD 卡来运行它
- 一台带有 microSD 卡槽的电脑（用于刷写操作系统镜像）
- 有线以太网连接或 Wi-Fi
- 具备通过 SSH 使用命令行的基本能力

## 第 1 步：刷写 Ubuntu Server 22.04+（64 位）
Zebra 和 Zallet 的预构建二进制文件及 Docker 镜像要求 **glibc 2.34+**，这意味着必须使用 **Ubuntu Server 22.04 或更新版本（64 位/aarch64）**。

1. 在你的主电脑上安装 Raspberry Pi Imager。
2. 插入你的 microSD 卡。
3. 选择 **Other general-purpose OS → Ubuntu → Ubuntu Server 22.04 LTS (64-bit)**（或更新版本）。
4. 使用 Imager 的高级选项（齿轮图标）预先配置主机名、启用 SSH，并在需要时设置 Wi-Fi 凭据，以便首次无头启动。
5. 写入镜像，插入卡，然后给 Pi 通电。
6. 通过 SSH 登录：`ssh <username>@<pi-hostname-or-ip>`

## 第 2 步：连接并挂载外部存储
1. 通过 USB 3.0 连接你的外接 SSD/HDD。
2. 识别设备：`lsblk`
3. 对其进行格式化（如果是新盘）并挂载，例如挂载到 `/mnt/zcash-data`，使用标准的 `mkfs`/`fstab` 配置，以便重启后自动挂载。

## 第 3 步：更新系统
```bash
sudo apt update && sudo apt full-upgrade -y
sudo reboot
```

## 第 4 步：安装并运行 Zebra
### 选项 A — Docker（推荐）
```bash
sudo apt install -y docker.io
sudo usermod -aG docker $USER   # 完成后注销并重新登录
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
这会安装一个预构建的 `aarch64` 二进制文件 —— 无需编译。

**关于同步时间：** 预计这会花一些时间 —— 常见引用中的首次同步数据（大约 2 小时）来自比 Pi 4 CPU 更强的参考硬件，因此你在真实 Pi 4 硬件上的实际同步时间很可能会更长。

## 第 5 步：安装 Zallet
Zallet 目前仍处于 **alpha** 阶段 —— 预期会有破坏性变更，并且暂时不要把它当作适合保管大额资金的生产级方案。

### 选项 A — Docker（推荐）
```bash
docker pull zodlinc/zallet:latest
```
该镜像支持 ARM64（通过基于 Nix 的构建），并运行在一个极简、无 shell 的文件系统中 —— 请通过 `--datadir` 和卷挂载显式传递配置和数据路径（见第 6 步）。

### 选项 B — 从源码构建
```bash
# 需要 Rust 1.85+（rustup 安装见第 4B 步）
sudo apt install -y clang libclang-dev protobuf-compiler
cargo install --locked --git https://github.com/zcash/wallet.git
```
在 alpha 阶段，Zallet 的 crates 尚未发布到 crates.io，因此直接从 git 仓库安装是受支持的非 Docker 方法。

## 第 6 步：配置 Zallet
在你选择的数据目录中创建 `zallet.toml`（例如 `/mnt/zcash-data/zallet`）：
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
validator_address = "127.0.0.1:8232"   # Zebra 的 JSON-RPC 端点
[keystore]
[note_management]
[rpc]
bind = ["127.0.0.1:SOMEPORT"]
```
如果 Zebra 运行在不同的主机/端口上，请调整 `validator_address`，并在 `[indexer]` 下配置 `validator_cookie_auth`/`validator_user`/`validator_password` 以匹配你的 Zebra RPC 身份验证设置。

**从 zcashd 迁移？** 如果你仍然保留旧的 `zcash.conf`：
```bash
zallet migrate-zcash-conf --datadir /path/to/old/zcashd/datadir -o /mnt/zcash-data/zallet/zallet.toml
```

## 第 7 步：设置钱包加密
Zallet 使用 `age`/`rage` 加密所有密钥材料：
```bash
cargo install rage
rage -p -o /mnt/zcash-data/zallet/encryption-identity.txt <(rage-keygen)
```
这会打印出一个公钥和一个自动生成的口令短语 —— **请保存该口令短语；没有它你将无法恢复身份文件。**

## 第 8 步：初始化并启动钱包
```bash
zallet -d /mnt/zcash-data/zallet init-wallet-encryption
zallet -d /mnt/zcash-data/zallet generate-mnemonic
```
**除非你明确希望拥有多个彼此独立的支出根，否则只运行一次 `generate-mnemonic`。**

```bash
zallet -d /mnt/zcash-data/zallet start
```

## 第 9 步：迁移现有 zcashd 钱包（可选）
```bash
zallet -d /mnt/zcash-data/zallet migrate-zcashd-wallet --zcashd-datadir /path/to/old/zcashd/datadir
```
这需要 `db_dump` 工具（基于 Berkeley DB 6.2.23 构建）—— 可以来自系统安装，或 zcashd 的本地源码构建。如果你已经不再安装 zcashd，这是目前 Zallet 中尚未完全自包含的那一步迁移流程。

## 第 10 步：验证一切正常工作
```bash
zallet -d /mnt/zcash-data/zallet help
```
确认钱包能够响应，并在 Zebra 完成同步后，确认余额/地址与预期一致。

## 故障排查
- **ARM 上的 Zebra 构建/运行时问题：** 如果是从源码构建，请安装 Rust ARM 工具链 —— 根据 Zebra 自身文档，在 ARM 硬件上运行 x86_64 构建工具会明显更慢。
- **存储空间被占满：** Zebra 大约 300 GB 的占用会持续增长 —— 请预留足够空间。
- **Docker 权限错误：** 将用户加入 `docker` 组后，请注销并重新登录，或者暂时使用 `sudo`。
- **Zallet 容器没有 shell：** 官方 `zodlinc/zallet` 镜像按设计就是 from-scratch —— 请始终显式传递 `--datadir`，并将你的数据目录作为卷挂载。

## 与旧版 zcashd 指南相比的硬件说明
与编译 zcashd 相比，Zebra 和 Zallet 在安装过程中通常对 CPU 更轻，因为你运行的是预构建二进制文件/容器。4 GB RAM 是一个合理的起点；请用 `htop` 监控，如果你看到大量 swap，考虑使用 8 GB 版本的 Pi 4。

## 附加资源
- [Zebra 手册](https://zebra.zfnd.org) — 官方 Zebra 文档
- [Zallet 手册](https://zcash.github.io/wallet) — 官方 Zallet 文档
- [zcashd 停止支持通知](https://z.cash/support/zcashd-deprecation)

---

*如果你觉得这份指南有帮助，请考虑支持 ZecHub：[从 zechub.wiki/donation 插入当前的 ZecHub 捐赠隐蔽地址——此处未包含，因为我无法验证它是否仍然是最新的]。*
