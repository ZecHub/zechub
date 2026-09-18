<a href="https://github.com/zechub/zechub/edit/main/site/Zcash_Tech/Z3_Stack.md" target="_blank">
  <img src="https://img.shields.io/badge/Edit-blue" alt="编辑页面"/>
</a>

# Z3 Stack

**Z3 Stack** 是 Zcash Foundation 打包的节点平台：**Zebra**（全节点）+ **Zallet**（全节点钱包），并可选配 **Zaino** 索引器。它旨在替代独立的 `zcashd` 进程；后者在一个二进制文件中捆绑了共识和钱包，并于 2026 年 7 月 18 日停止维护。

参考实现是位于 [github.com/ZcashFoundation/z3](https://github.com/ZcashFoundation/z3) 的 Docker Compose 项目。

---

## 简要说明

* Z3 **不是新的共识客户端**。它用于一同运行 `zcashd` 之后的技术栈：Zebra 验证链，Zallet 持有密钥并提供钱包 RPC，Zaino（可选）则使用 lightwalletd gRPC 协议。
* `zcashd` 将节点和钱包捆绑在一起。Z3 **将这些职责拆分开来**。交易所、矿池和其他全节点钱包运营者应迁移至此组合，而不是仅迁移至 Zebra。
* 单台主机上可以运行三个相互隔离的 Compose 项目：**主网**、**测试网**和 **regtest**。
* 主网首次同步大约需要 **24–72 小时**，并占用约 **300 GB**。Regtest 可在数秒内启动，是学习该技术栈的合适环境。
* Zallet 嵌入了 Zaino 的索引器库，并通过 JSON-RPC 与 Zebra 通信。仅当你希望为外部钱包提供兼容 lightwalletd 的端点时，才需要独立的 Zaino 服务。
* Zallet 处于 **beta** 阶段。破坏性变更可能要求删除并重新创建钱包。不要将其视为适合大额资金的成熟托管软件。

---

## Z3 存在的原因

在 Zcash 生命周期的大部分时间里，`zcashd` 既是参考全节点，也是唯一可用于生产环境的全节点钱包。交易所、矿池和托管方所集成的正是这种设计。

`zcashd` 已退役。共识迁移至 [Zebra](/zcash-tech/zebra-full-node)（如今也迁移至 [Zakura](/zcash-tech/zakura-node)）。内置钱包迁移至 [Zallet](https://github.com/zcash/zallet)。轻钱包服务正从 [lightwalletd](/zcash-tech/lightwallet-nodes) 迁移至 [Zaino](/zcash-tech/zaino)。

这三部分分别位于不同仓库，具有不同的发布周期和配置。Z3 是将它们连接起来的胶水：固定版本的镜像、在节点完成同步前使钱包保持停止状态的健康检查、按网络划分的端口和卷，以及一条文档化的运营路径。

这个名称是生态系统中的非正式简称——Zebra、Zaino、Zallet——尽管默认 Compose 文件仅启动 Zebra 和 Zallet。Zaino 是一个 Compose profile，而非必需的第三个进程。

---

## 架构

```
                    ┌──────────────────────── Z3 (per network) ────────────────────────┐
                    │                                                                  │
  peers ◄──P2P──►  Zebra (zebrad)  ──JSON-RPC──►  Zallet                                │
                    │   full node                    │  embeds Zaino libraries          │
                    │                                │  wallet RPC for operators        │
                    │                                └─────────────────────────────────┤
                    │                                                                  │
                    │   Zaino (optional, --profile indexer)                            │
                    │     lightwalletd-compatible gRPC + JSON-RPC proxy                │
                    │            │                                                     │
                    └────────────┼─────────────────────────────────────────────────────┘
                                 ▼
                        light wallets / explorers
```

| 组件 | 在 Z3 中的职责 | 必需？ |
| --- | --- | --- |
| **Zebra** | 同步并验证链、gossip、JSON-RPC、健康检查端点 | 是 |
| **Zallet** | 全节点钱包。嵌入 Zaino 库。直接连接至 Zebra JSON-RPC。**不会**调用独立的 Zaino 容器 | 是 |
| **Zaino** | 独立索引器。为外部轻客户端提供兼容 lightwalletd 的 gRPC，并为区块浏览器和水龙头提供 JSON-RPC 代理 | 否 — `--profile indexer` |

Z3 在 `docker-compose.yml` 中固定镜像版本。如需不同的标签，可通过 `Z3_ZEBRA_IMAGE`、`Z3_ZAINO_IMAGE` 或 `Z3_ZALLET_IMAGE` 覆盖。

---

## 与 zcashd 的区别

| | zcashd | Z3 |
| --- | --- | --- |
| 语言 | C++（Bitcoin 分叉） | Rust 服务，由 Docker Compose 编排 |
| 进程模型 | 一个二进制文件：节点 + 钱包 | 独立的节点和钱包容器 |
| 共识 | 已退役（于 2026 年 7 月 18 日停止维护） | Zebra（或其他兼容节点） |
| 钱包 | 内置 `wallet.dat` | Zallet，使用 age 加密的数据目录 |
| 轻客户端 | 通常使用独立的 lightwalletd | 可选的 Zaino profile |
| 配置 | `zcash.conf` | `config/<network>/` 下按网络划分的文件，加上 Compose 环境文件 |
| 单台主机上的网络 | 端口冲突难以处理 | 一等支持：`z3-mainnet`、`z3-testnet`、`z3-regtest` |

如果你仍有 `zcashd` 钱包，请使用 ZecHub 的 [迁移指南](/guides/migration-guide-zcashd-to-zebrad-zallet) 和 Zallet 的 `migrate-zcashd-wallet` 命令，而不是将 `wallet.dat` 复制到 Z3 卷中。

---

## 网络

Z3 是三个独立的 Compose 项目。它们不共享端口或卷。

| 网络 | 项目名称 | 用途 | 首次同步 | 真实资金 |
| --- | --- | --- | --- | --- |
| **主网** | `z3-mainnet` | 生产环境 | 24–72 小时 | 是 |
| **测试网** | `z3-testnet` | 在公开测试网络上进行预发布测试 | 2–12 小时 | 否（测试 ZEC） |
| **regtest** | `z3-regtest` | 本地练习：即时出块，无对等节点 | 数秒 | 否 |

新运营者应从 **regtest** 开始，确认 RPC 和钱包流程后，再转向测试网或主网。

---

## 默认主机端口

这三个网络旨在一台机器上共存。以下数值为已发布的默认值；每个值都可通过对应的 `Z3_*` 环境变量覆盖。规范矩阵位于 [`z3-contract.yaml`](https://github.com/ZcashFoundation/z3/blob/main/z3-contract.yaml)。

| 服务 | 主网 | 测试网 | Regtest |
| --- | --- | --- | --- |
| Zebra JSON-RPC | 8232 | 18232 | 29232 |
| Zebra P2P | 8233 | 18233 | （未发布） |
| Zebra 健康检查（`/ready`） | 8080 | 18080 | 28080 |
| Zaino gRPC（索引器 profile） | 8137 | 18137 | 28137 |
| Zaino JSON-RPC（索引器 profile） | 8237 | 18237 | 28237 |
| Zallet RPC | 28232 | 40232 | 50232 |

在 Compose 网络内部，服务可按名称解析（`zebra`、`zaino`、`zallet`）。

---

## 数据与备份

| 卷 | 所含内容 | 需要备份？ |
| --- | --- | --- |
| `z3-<network>-chain` | Zebra 链状态（主网约 300 GB） | 可选 — 可重新同步 |
| `z3-<network>-zallet` | 加密的钱包数据库**以及**用于解锁它的 age 身份密钥 | **是 — 这是唯一必须备份的卷** |
| `z3-<network>-zaino` | 索引器状态（仅使用索引器 profile 时） | 可选 — 可重建 |
| `z3-<network>-cookie` | Zebra RPC cookie | 否 — 会重新生成 |

要在首次启动前将链状态放到另一块磁盘上：

```bash
export Z3_CHAIN_DATA_PATH=/mnt/ssd/zebra-state
./scripts/fix-permissions.sh zebra /mnt/ssd/zebra-state
```

`docker compose --env-file .env.<network> --profile "*" down` 会停止技术栈并保留卷。添加 `-v` 会删除这些卷并强制进行完整重新同步。请包含 `--profile "*"`，以便实际停止由 profile 控制的服务（索引器、监控）。

---

## 快速开始

前提条件：Docker Engine、Docker Compose v2.24.4+、Git。仅 regtest 需要 `openssl`。

### Regtest（查看技术栈的最快方式）

```bash
git clone https://github.com/ZcashFoundation/z3 && cd z3
./scripts/regtest-init.sh
docker compose --env-file .env.regtest up -d
```

请参阅 [docs/regtest.md](https://github.com/ZcashFoundation/z3/blob/main/docs/regtest.md) 了解测试命令。

### 主网（两阶段启动）

Zebra 必须先完成同步，Zallet 才有用。过早启动 Zallet 会使其不断重启，直到 `/ready` 为真。

```bash
git clone https://github.com/ZcashFoundation/z3 && cd z3

# 1. One-time setup: local config + Zallet wallet identity
./scripts/setup-network.sh mainnet

# 2. Start Zebra and wait until it is synced
docker compose --env-file .env.mainnet up -d zebra
./scripts/check-zebra-readiness.sh

# 3. Start Zallet (and anything else in the default profile)
docker compose --env-file .env.mainnet up -d
```

测试网的流程相同，只需使用 `.env.testnet` 和 `./scripts/check-zebra-readiness.sh 18080`。

`config/<network>/` 下的编辑会保留在本地，并在 `git pull` 后继续存在。

### 可选 profiles

```bash
# Lightwalletd-compatible gRPC + JSON-RPC proxy
docker compose --env-file .env.mainnet --profile indexer up -d

# Prometheus, Grafana, Jaeger, Alertmanager
docker compose --env-file .env.mainnet --profile monitoring up -d
```

默认 Grafana 端口为：主网 3000、测试网 13000、regtest 23000。

---

## 运营说明

* **固定镜像。** Z3 不会悄然浮动到 `:latest`。请在经过审查的变更中提升固定版本，或设置 `Z3_<SERVICE>_IMAGE`。
* **非 root 容器。** Linux capabilities 已被移除。健康检查会在 Zebra 准备就绪前阻止钱包启动。默认启用重启策略。
* **日志。** Z3 不固定日志驱动。请在 Docker daemon 配置中设置大小限制，否则日志会在全天候运行的节点上无限增长。
* **P2P。** 主网和测试网发布 Zebra 的 P2P 端口。位于 NAT 后方时，请将 `ZEBRA_NETWORK__EXTERNAL_ADDR` 设置为对等节点应拨号连接的地址。Regtest 没有对等节点。
* **ARM 上的 Zaino。** 上游 Zaino 镜像仅支持 `linux/amd64`。在 Apple Silicon 上，除非从源代码构建，否则会在模拟环境中运行。Zebra 和 Zallet 支持多架构。
* **共享主机。** 默认未设置 CPU 或内存限制。如果机器并非专用于节点，请在覆盖文件中添加 `deploy.resources.limits`。

生产环境检查清单和 FAQ：[docs/faq.md](https://github.com/ZcashFoundation/z3/blob/main/docs/faq.md)、[docs/docker-architecture.md](https://github.com/ZcashFoundation/z3/blob/main/docs/docker-architecture.md)。

---

## 谁应该运行 Z3

**适合的场景**

* 曾将 `zcashd` 用作节点加钱包的交易所、托管方和矿池
* 希望针对已同步的 Zebra 使用受支持的全节点钱包 RPC 的运营者
* 需要并排运行主网、测试网和 regtest 的开发者
* 通过 Zaino profile 搭建私有兼容 lightwalletd 端点的任何人

**通常不适合的工具**

* 仅需发送和接收 ZEC 的终端用户 — 请使用轻钱包，例如 ZODL / Zashi、Zingo 或 YWallet
* 仅想验证链的人 — 单独运行 Zebra（或 Zakura）
* 仅想提供紧凑区块服务的人 — 运行 Zebra + Zaino，或 Zebra + lightwalletd，无需 Zallet

---

## 相关页面

* [Zebra 全节点](/zcash-tech/zebra-full-node) — Z3 封装的共识节点
* [Zaino](/zcash-tech/zaino) — 可选索引器 profile
* [全节点](/zcash-tech/full-nodes) — Zebra、Zakura 以及已退役的 zcashd
* [轻钱包节点](/zcash-tech/lightwallet-nodes) — 轻客户端所连接的对象
* [Zakura 节点](/zcash-tech/zakura-node) — 替代性全节点；不是 Z3 当前提供的节点
* [迁移指南：从 zcashd 到 Zebrad/Zallet](/guides/migration-guide-zcashd-to-zebrad-zallet)
* [开发者资源](/start-here/developer-resources)

---

## 资源

* [Z3 仓库](https://github.com/ZcashFoundation/z3)
* [Z3 合约（端口、卷、项目名称）](https://github.com/ZcashFoundation/z3/blob/main/z3-contract.yaml)
* [Zebra](https://github.com/ZcashFoundation/zebra) · [Zebra 手册](https://zebra.zfnd.org/)
* [Zaino](https://github.com/zingolabs/zaino)
* [Zallet](https://github.com/zcash/zallet) · [Zallet 手册](https://zcash.github.io/zallet/)
* [Zcash 社区论坛 — Z3 更新](https://forum.zcashcommunity.com/t/zcash-z3-updates-formerly-zcashd-deprecation/48965)
* [Z3 Launcher](https://github.com/Jubrilabdulazeez/z3-launcher) — 官方 Compose 技术栈之上的社区控制平面（ZecHub Hackathon）
