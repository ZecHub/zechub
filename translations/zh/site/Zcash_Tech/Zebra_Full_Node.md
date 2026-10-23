<a href="https://github.com/zechub/zechub/edit/main/site/Zcash_Tech/Zebra_Full_Node.md" target="_blank">
  <img src="https://img.shields.io/badge/Edit-blue" alt="Edit Page"/>
</a>

# Zebra 全节点

## TL;DR

- Zebra（`zebrad`）是用 Rust 编写、由 Zcash Foundation 维护的 Zcash 全节点。
- 它验证区块和交易、维护链状态，并通过点对点网络与其他节点通信。
- Zebra 和 zcashd 实现了相同的协议，能够互操作。自 zcashd 退役后，Zebra 承担了共识职责。
- 有两种运行方式：使用 `zfnd/zebra` Docker 镜像，或从源代码构建。
- 推荐硬件配置为 4 个 CPU 核心、16 GB RAM 和 300 GB 磁盘空间。最低配置为 2 个核心和 4 GB RAM，磁盘空间同样需要 300 GB。

## 核心说明

Zebra 是首个完全使用 Rust 编写的 Zcash 节点。它运行于 Zcash 点对点网络中，负责验证和广播交易，并维护区块链状态。拥有第二个独立实现使网络基础设施不再过度依赖任何单一代码库。

### Zebra 和 zcashd

最初的 Zcash 节点 zcashd，由 Electric Coin Company 基于 Bitcoin 的代码库开发。Zebra 则使用内存安全语言 Rust 从头编写，重点关注安全性和效率。

两种实现都遵循相同的协议，因此能够通信并互操作。zcashd 于 2026 年 7 月 18 日达到支持终止停机状态，且不再启动，因此目前仍在使用的节点实现为 Zebra 和 Zakura。有关更全面的说明，请参阅 [全节点](/zcash-tech/full-nodes)。

## 运行 Zebra

您可以使用 Docker 镜像运行 Zebra，也可以手动构建。请参阅系统要求部分。

### Docker 使用方法

要运行最新版本并同步至链尖端，请执行以下命令：

```

docker run zfnd/zebra:latest

```

如需完整说明，请参阅 [Docker 文档](https://zebra.zfnd.org/user/docker.html)。

### 构建 Zebra

构建 Zebra 需要 Rust、libclang 和 C++ 编译器。

- 请确保已安装最新稳定版 Rust，因为 Zebra 仅使用该版本进行测试。
- 必需的构建依赖包括：
  - libclang（也称为 libclang-dev 或 llvm-dev）
  - clang 或其他 C++ 编译器（例如适用于所有平台的 g++，或适用于 macOS 的 Xcode）
  - protoc（Protocol Buffers 编译器），需使用 Protocol Buffers v3.12.0（于 2020 年 5 月 16 日发布）引入的 *--experimental_allow_proto3_optional* 标志。

### 安装和启动

在使用 glibc 2.34 或更高版本的 x86_64 或 aarch64 Linux 系统上（Ubuntu 22.04+、Debian 12+、RHEL 9+、Amazon Linux 2023），您可以跳过构建依赖并安装已签名的预构建二进制文件：

```
cargo binstall zebrad
```

相同的二进制文件会作为 `zebrad-<version>-<target>.tar.gz` 附加到每个 GitHub 发布版本，并分别附带 SHA-256 校验和、Sigstore 构建来源证明和 Cosign 签名。在较旧的平台上，请使用 Docker 镜像或从源代码构建。

要从源代码构建，请获取代码并构建发布版二进制文件：

```
git clone https://github.com/ZcashFoundation/zebra.git
cd zebra
cargo build --release --bin zebrad
```

使用以下命令启动节点：

```
target/release/zebrad start
```

安装指南：[zebra.zfnd.org/user/install.html](https://zebra.zfnd.org/user/install.html)

## 可选配置和功能

### 初始化配置文件

  - 使用以下命令生成配置文件：

  ```
  zebrad generate -o ~/.config/zebrad.toml

  ```

  - 生成的 *zebrad.toml* 将存放在 Linux 的默认首选项目录中。有关其他操作系统的默认位置，请参阅文档。

### 配置进度条

  - 在您的 *zebrad.toml* 中配置 *tracing.progress_bar*，即可在终端中使用进度条显示关键指标。注意：目前存在一个已知问题，进度条的估算值可能会变得极大。

### 配置挖矿

  - 可通过在 Docker 中指定 *MINER_ADDRESS* 和端口映射来配置 Zebra 挖矿。更多详情请参阅 [挖矿支持文档](https://zebra.zfnd.org/user/mining-docker.html)。

### 自定义构建功能

  - 可通过额外的 Cargo 功能扩展 Zebra 的功能，例如 Prometheus 指标、Sentry 监控、实验性 Elasticsearch 支持等。

  - 安装时，可通过将多个功能列为 `--features` 标志的参数来组合使用它们。

  - 为优化性能，某些调试和监控功能在发布版本中被禁用。有关实验性和开发者功能的完整列表，请参阅 [API 文档](https://docs.rs/zebrad/latest/zebrad/index.html#zebra-feature-flags)。

## 系统要求和网络配置

### 推荐要求

- CPU：4 个 CPU 核心
- RAM：16 GB
- 磁盘空间：300 GB 可用磁盘空间，用于编译二进制文件和存储缓存的链状态
- 网络：100 Mbps 网络连接，每月至少上传和下载 300 GB 数据

### 最低要求

- CPU：2 个 CPU 核心
- RAM：4 GB
- 磁盘空间：300 GB 可用磁盘空间

Zebra 的测试套件可能需要一个多小时才能完成，具体取决于您的机器配置。较慢的系统也可以编译和运行 Zebra。尚未通过测试确定精确的性能边界。

### 磁盘要求

- Zebra 的缓存主网数据约占用 300 GB，缓存测试网数据约占用 10 GB。预计磁盘使用量会随时间增长。
- 数据库会定期清理，也会在关闭或重启时清理。更改通过数据库事务提交。由强制终止或 panic 导致的未完成更改，会在 Zebra 下次启动时回滚。

### 网络要求和端口

- Zebra 对入站和出站连接使用以下 TCP 端口：
  - 主网：8233
  - 测试网：18233
- 为 Zebra 配置特定的 listen_addr，会将该地址公布用于入站连接。同步需要出站连接；入站连接为可选。
- 必须可通过操作系统 DNS 解析器访问 Zcash DNS 种子节点（通常使用端口 53）。
- Zebra 可以在任意端口建立出站连接。zcashd 优先选择默认端口上的对等节点，以避免被用于对其他网络发起 DDoS 攻击。

### 典型主网网络使用量

- 初始同步：初次同步需要下载 300 GB 数据，预计该数值还会增长。
- 持续更新：每日上传和下载量介于 10 MB 至 10 GB，具体取决于用户交易大小和对等节点请求。
- 每当内部数据库版本发生更改时，Zebra 都会启动一次初始同步，因此版本升级期间可能需要下载完整链数据。
- 优先选择往返延迟不超过 2 秒的对等节点。如果延迟超过此阈值，请在 Zebra 仓库中提交问题。

## 常见错误

- 按今天的需求估算磁盘容量。缓存的主网状态已接近 300 GB，并且仍在持续增长。
- 期望从 `zebrad` 获得钱包 RPC。密钥和余额由独立程序 [Zallet](https://github.com/zcash/zallet) 管理。
- 仅运行 `zebrad`，却期望轻钱包能够连接。这种方式需要一个索引器，即 lightwalletd 或 [Zaino](/zcash-tech/zaino)。
- 将意外重新同步视为故障。数据库版本变更会按设计触发一次重新同步。

## 相关页面

- [全节点](/zcash-tech/full-nodes) - 全节点的功能及现有实现
- [Zakura 节点](/zcash-tech/zakura-node) - 从 Zebra 分叉而来、具有更快同步和剪枝功能的节点
- [Zaino](/zcash-tech/zaino) - 为轻钱包提供服务的 Rust 索引器
- [轻钱包节点](/zcash-tech/lightwallet-nodes) - 轻钱包查询的服务器
- [Zcash 挖矿指南](/using-zcash/zcash-mining-guide) - 使用您自己的节点进行挖矿

## 深入学习

- [Zebra 手册](https://zebra.zfnd.org)
- [Zebra 在 GitHub](https://github.com/ZcashFoundation/zebra/) 上
- [系统要求](https://zebra.zfnd.org/user/requirements.html)
