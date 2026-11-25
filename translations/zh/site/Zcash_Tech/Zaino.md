<a href="https://github.com/zechub/zechub/edit/main/site/Zcash_Tech/Zaino.md" target="_blank">
  <img src="https://img.shields.io/badge/Edit-blue" alt="编辑页面"/>
</a>

# Zaino 索引器

## TL;DR

* **Zebra** 验证 Zcash 链。
* **Zaino** 为 Zebra 的链数据建立索引，并提供面向客户端的 API。
* **Zallet** 是 Z3 技术栈中的钱包组件。在默认的 Z3 配置中，Zallet 直接连接到 Zebra，不需要独立的 Zaino 服务。
* 当运营者需要兼容 lightwalletd 的 gRPC 端点、JSON-RPC 代理，或为轻钱包、区块浏览器、水龙头及类似服务提供基础设施时，独立的 Zaino 服务会很有用。
* Zaino 是正在运行的基础设施，但在生产环境中运行前，运营者应查阅官方 Zaino 和 Z3 文档，了解当前的部署详情。

## 核心说明

Zaino 是适用于 Zcash blockchain 的 Rust 索引器。它从 Zebra 全节点读取链数据。它为钱包、区块浏览器、水龙头和其他服务提供所需的数据，而无需让 Zebra 负责所有面向客户端的索引。

### Zaino 的作用

Zaino 位于 Zebra 和客户端软件之间。Zebra 是共识节点：它下载、验证并跟随 Zcash blockchain。Zaino 将 Zebra 作为链数据来源，然后整理出索引视图，供客户端应用高效查询。

这种分工让各组件的职责一目了然：

| 组件 | 职责 |
|:--|:--|
| Zebra | 全节点和验证者 |
| Zaino | 索引器和面向客户端的 API 服务 |
| Zallet | 钱包服务 |
| lightwalletd | 较早期的轻钱包服务器，Zaino 旨在取代或补充它 |

Zaino 为轻客户端、全客户端或钱包，以及区块浏览器提供功能。它可访问已最终确认的链、尚未最终确认的最佳链，以及 Zebra 持有的内存池数据。

### 它在当前 Zcash Stack 中的定位

当前的 Z3 技术栈以 Zebra、Zallet 和可选的 Zaino 为核心构建。

在默认的 Z3 部署中，Zebra 和 Zallet 会一同运行。Zallet 直接连接到 Zebra，因此，只运行本地钱包技术栈的运营者无需启动独立的 Zaino 服务。

当运营者希望为外部客户端提供服务时，可以添加 Zaino。在 Z3 中，它通过 `indexer` Compose 配置运行，并提供：

* 兼容 lightwalletd 的 gRPC 端点，供轻钱包客户端使用
* 面向区块浏览器、水龙头和服务后端的 JSON-RPC 代理
* 与 Zebra 链状态分离的索引器数据库

因此，Zaino 对钱包后端、公共基础设施运营者、区块浏览器、水龙头，以及正在测试需要索引 Zcash 链数据的服务的开发者尤其重要。

### Zaino 和 lightwalletd

lightwalletd 是最初的轻钱包服务器。Zaino 是基于 Rust、承担这一角色的后继方案。它的目标是在可行时提供兼容的 API，让钱包和服务可以逐步迁移，无需一次性彻底重写。

这并不意味着所有 lightwalletd 部署都已迁移到 Zaino。运营者应将 Zaino 视为当前基于 Zebra 的技术栈的一部分，并在决定运行哪些服务前查阅最新的项目文档、版本发布信息和服务仪表板。

## 视觉说明 / 类比

可以把 Zcash blockchain 想象成一座存放账本页面的巨大档案馆。

Zebra 是档案管理员。它接收每一页新内容，检查页面是否符合规则，然后将其归档到正确的位置。

Zaino 是档案馆前的参考咨询台。它读取 Zebra 归档的内容，建立便于快速查找的目录，并迅速回答访客的问题。轻钱包、区块浏览器和水龙头会来咨询台询问诸如“这个区块里有什么？”或“内存池中有哪些待处理交易？”之类的问题。参考咨询台从不判断哪些页面是真实的，这项工作由档案管理员负责。

在默认的 Z3 配置中，Zallet 在同一栋楼里运行，并直接前往档案管理员处，因此不需要参考咨询台。

### 展示 Zaino 工作方式的一些示意图

#### Zaino 内部架构

![Zaino Internal Architecture](/content-images/image-2025-01-02-190143429-3f3cc78fa5.webp)

#### Zaino 实时服务架构

![Zebra Live Service Architecture](/content-images/image-2025-01-02-190349017-892cb409ea.webp)

#### Zaino 系统架构

![Zaino System Architecture](/content-images/image-2025-01-02-190448037-1e4e675ccb.webp)

## 深入了解

### 运营者须知

最简单且权威的部署方式是使用 Z3 仓库。Z3 将 Zaino 作为可选服务提供：

```bash
docker compose --env-file .env.<network> --profile indexer up -d
```

先按常规方式完成 Z3 配置，并等待 Zebra 完成同步，然后再在主网或测试网上启动依赖它的服务。

Zaino 提供两类网络服务。gRPC 服务是面向 lightwallet 的 API。除非有外部层提供保护，否则 JSON-RPC 服务仅适用于回环或可信的专用网络。不要将未经身份验证或未加密的 JSON-RPC 端点暴露到公共互联网。

## 常见误区

**把 Zaino 当作全节点。** Zaino 不是验证者。Zebra 验证链；Zaino 为 Zebra 的数据建立索引。

**认为每个 Z3 部署都需要独立的 Zaino。** 在默认的 Z3 技术栈中，Zallet 可以直接连接到 Zebra。当外部客户端需要独立的索引器服务时，再启动 Zaino。

**把计划中的功能说成已经部署。** Zaino 仍在积极开发，因此在介绍某项功能已可用之前，请查阅当前的版本说明和文档。

**不谨慎地暴露 JSON-RPC。** 除非有其他层提供保护，否则 Zaino 的 JSON-RPC 接口仅适用于回环或可信的专用网络。

## 相关页面

- [轻钱包节点](/zcash-tech/lightwallet-nodes)：轻钱包连接的服务器，包括 lightwalletd 和 Zaino，以及如何在它们之间切换。
- [Zinder](/zcash-tech/zinder)：来自 Zcash Foundation 的另一个 Rust 索引器（alpha）
- [Zebra全节点](/zcash-tech/zebra-full-node)：Zaino 从中读取链数据的节点。
- [Zallet](/zcash-tech/zallet)：Z3 技术栈中的全节点钱包。
- [Z3 技术栈](/zcash-tech/z3-stack)：将 Zebra、Zallet 和可选的 Zaino 索引器打包在一起。
- [索引器基准测试：Zaino与Ztreamer](/zcash-tech/indexer-benchmark-zaino-vs-ztreamer)：对两种轻钱包索引器进行可复现的比较。
- [全节点](/zcash-tech/full-nodes)：Zcash 全节点软件概览。
- [Zcash钱包同步](/zcash-tech/zcash-wallet-syncing)：为什么屏蔽钱包需要同步流程。

### 资源

* [Zaino GitHub 仓库](https://github.com/zingolabs/zaino)
* [Zaino 版本发布](https://github.com/zingolabs/zaino/releases)
* [Zaino 生成的文档](https://zingolabs.github.io/zaino/)
* [Z3 部署仓库](https://github.com/ZcashFoundation/z3)
* [Zebra 文档](https://zebra.zfnd.org/)
* [Zaino 拨款和项目讨论](https://forum.zcashcommunity.com/t/zingo-labs-accelerates-zcashd-deprecation-with-zaino/48545)

**最后更新：** 2026年11月
