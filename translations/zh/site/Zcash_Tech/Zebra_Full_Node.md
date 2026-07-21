<a href="https://github.com/zechub/zechub/edit/main/site/Zcash_Tech/Zebra_Full_Node.md" target="_blank">
  <img src="https://img.shields.io/badge/Edit-blue" alt="编辑页面"/>
</a>

## Zebra 节点简介

介绍 Zebra：用 Rust 革新 Zcash 节点基础设施

认识 Zebra，这是一个开创性的成果，作为首个完全使用 Rust 编写的 Zcash 节点。Zebra 无缝集成到 Zcash 点对点网络中，是增强网络韧性的关键工具。通过验证和广播交易这些核心功能，以及对 Zcash 区块链状态进行细致维护，Zebra 为构建更加去中心化的网络基础设施作出了贡献。

## 相较于 Zcashd 节点实现的优势
与最初的 Zcash 节点 zcashd 不同，后者可追溯到 Bitcoin 的基础代码库，并由 Electric Coin Company 开发，而我们的实现则是一个独立自主的实体。Zebra 从零开始构建，专注于安全性和效率，并充分利用了具备内存安全特性的 Rust 语言。

尽管起源不同，zcashd 和 Zebra 都遵循相同的协议，因此两者之间可以实现无缝通信与互操作。这项创新不仅扩展了 Zcash 生态系统，也为区块链节点开发树立了新的标准。

## Zebra Launcher 使用说明

你可以使用我们的 Docker 镜像运行 Zebra，也可以手动构建。请参阅系统要求部分。

### Docker 用法：

如需轻松运行我们的最新版本并将其同步到最新区块高度，请执行以下命令：

```

docker run zfnd/zebra:latest

```

如需更完整的说明和更详细的信息，请参阅我们的 [Docker 文档](https://zebra.zfnd.org/user/docker.html)。

### 构建 Zebra：

构建 Zebra 需要 Rust、libclang 和 C++ 编译器。

- 请确保你安装了最新的稳定版 Rust，因为 Zebra 仅针对该版本进行测试。
- 必需的构建依赖包括：
  - libclang（也称为 libclang-dev 或 llvm-dev）
  - clang 或其他 C++ 编译器（例如适用于所有平台的 g++，或适用于 macOS 的 Xcode）
  - protoc（Protocol Buffers 编译器），并启用 *--experimental_allow_proto3_optional* 标志，该标志于 Protocol Buffers v3.12.0 中引入（发布于 2020 年 5 月 16 日）。



### Arch 上的依赖：

在确认依赖满足后，使用以下命令继续构建并安装 Zebra：

```

cargo install --locked zebrad

```

执行以下命令启动 Zebra：

```
zebrad start

```


## 可选配置与功能：


### - 初始化配置文件：

  - 使用以下命令生成配置文件：
    
  ```
  zebrad generate -o ~/.config/zebrad.toml
  
  ```

  - 生成的 *zebrad.toml* 将放置在 Linux 的默认首选项目录中。有关其他操作系统的默认位置，请参阅我们的文档。



### - 配置进度条：

  - 在你的 *zebrad.toml* 中配置 *tracing.progress_bar*，以便使用进度条在终端中显示关键指标。注意：存在一个已知问题，进度条的估算值可能会变得异常大。



### - 配置挖矿：

  - 可以通过在 Docker 中指定 *MINER_ADDRESS* 和端口映射，将 Zebra 配置为用于挖矿。更多详情请参阅我们的[挖矿支持文档](https://zebra.zfnd.org/user/mining-docker.html)。


### - 自定义构建功能：

  - 通过附加的 Cargo 功能扩展 Zebra 的能力，例如 Prometheus 指标、Sentry 监控、实验性的 Elasticsearch 支持等。

  - 在安装时将多个功能作为 `--features` 标志的参数列出，即可组合启用多个功能。


### 注意：为优化性能，某些调试和监控功能在发布版本构建中被禁用。

有关实验性功能和开发者功能的完整列表，请参阅我们的 [API 文档](https://docs.rs/zebrad/latest/zebrad/index.html#zebra-feature-flags)。
 

# Zebra 的系统要求与网络配置

为了确保完全由 Rust 构建的革命性 Zcash 节点 zebrad 在编译和运行时具有最佳性能与可靠性，我们推荐以下系统要求：

### 系统要求：
- CPU：4 个 CPU 核心
- RAM：16 GB
- 磁盘空间：300 GB 可用磁盘空间，用于编译二进制文件和存储缓存的链状态
- 网络：100 Mbps 网络连接，每月最少 300 GB 上传和下载流量


请注意，Zebra 的测试套件可能需要超过一小时才能完成，具体取决于你的机器配置。虽然较慢的系统也许能够编译并运行 Zebra，但我们尚未通过测试确定精确的性能边界。


### 磁盘要求：
- Zebra 对缓存的 Mainnet 数据大约使用 300 GB，对缓存的 Testnet 数据大约使用 10 GB。预计磁盘占用会随着时间增长。
- 数据库会定期清理，特别是在关闭或重启期间，以确保数据完整性。因强制终止或 panic 导致的不完整更改将在 Zebra 重启时回滚。


### 网络要求与端口：
- Zebra 对入站和出站连接使用以下 TCP 端口：
  - 8233 用于 Mainnet
  - 18233 用于 Testnet
- 将 Zebra 配置为特定的 listen_addr 后，可以广播该地址以接受入站连接。虽然出站连接对于同步至关重要，但入站连接是可选的。
- 必须能够通过操作系统 DNS 解析器访问 Zcash DNS seeder（通常为端口 53）。
- 虽然 Zebra 可以通过任意端口建立出站连接，但 zcashd 更倾向于使用默认端口的对等节点，以减轻对其他网络的 DDoS 攻击风险。


### Mainnet 的典型网络使用情况：
- 初始同步：初始同步需要下载 300 GB 数据，后续下载量预计还会增长。
- 持续更新：预计每天上传和下载 10 MB 到 10 GB，具体取决于用户交易大小和对等节点请求。
- 每当内部数据库版本发生变化时，Zebra 都会启动一次初始同步，因此在版本升级期间可能需要重新完整下载整条链。
- 优先选择往返延迟不超过 2 秒的对等节点。如果延迟超过该阈值，请提交工单以获取帮助。


遵循这些建议和配置，你可以最大限度提升 Zebra 在 Zcash 网络中的效率和效果。如果你遇到任何问题或需要进一步帮助，我们的支持团队随时可以提供指导。


以下是 Zebra 节点安装指南链接：
https://zebra.zfnd.org/user/install.html?highlight=zebra%20launcher#installing-zebra
