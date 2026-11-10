<a href="https://github.com/zechub/zechub/edit/main/site/Zcash_Tech/Z3_Stack.md" target="_blank">
  <img src="https://img.shields.io/badge/Edit-blue" alt="Edit Page"/>
</a>

# Z3 技术栈 [Z3 Stack]

**Z3 技术栈 [Z3 Stack]** 是 Zcash Foundation 打包的节点 [node] 平台：**Zebra**（全节点 [full node]）+ **Zallet**（全节点钱包 [full-node wallet]），可选配 **Zaino** 索引器。它旨在替代独立的 `zcashd` 进程，后者将共识 [consensus] 和钱包 [wallet] 捆绑在一个二进制文件中，并于 2026 年 7 月 18 日结束生命周期。

参考实现是位于 [github.com/ZcashFoundation/z3](https://github.com/ZcashFoundation/z3) 的 Docker Compose 项目。

---

## 摘要

* Z3 **不是新的共识客户端**。它用于一同运行 `zcashd` 后的技术栈：Zebra 验证链 [chain]，Zallet 保存密钥并提供钱包 RPC，而 Zaino（可选）使用 lightwalletd gRPC 协议。
* `zcashd` 捆绑了节点和钱包。Z3 **将这两个角色拆分开来**。交易所 [exchange]、挖矿 [mining] pool 以及其他全节点钱包运营者应迁移至这一组合，而不是仅迁移至 Zebra。
* 3 个隔离的 Compose 项目可在同一台主机上运行：**mainnet**、**testnet** 和 **regtest**。
* Mainnet 首次同步大约需要 **24–72 小时**，占用约 **300 GB**。Regtest 可在数秒内启动，是学习此技术栈的合适环境。
* Zallet 内嵌 Zaino 的索引器库，并通过 JSON-RPC 与 Zebra 通信。只有当你希望为外部钱包提供与 lightwalletd 兼容的端点时，才需要独立的 Zaino 服务。
* Zallet 处于 **beta** 阶段。破坏性变更可能要求删除并重新创建钱包。请勿将其视为适合大额资金的成熟托管软件。

---

## Z3 为何存在

在 Zcash 生命周期的大部分时间里，`zcashd` 既是参考全节点，也是唯一用于生产环境的全节点钱包。这一设计正是交易所、pool 和托管方所集成的对象。

`zcashd` 已退役。共识已迁移至 [Zebra](/zcash-tech/zebra-full-node)（如今也迁移至 [Zakura](/zcash-tech/zakura-node)）。内嵌钱包已迁移至 [Zallet](https://github.com/zcash/zallet)。轻钱包服务正从 [lightwalletd](/zcash-tech/lightwallet-nodes) 迁移至 [Zaino](/zcash-tech/zaino)。

这 3 个部分分别位于不同的代码仓库，拥有各自的发布节奏和配置。Z3 是将它们粘合起来的层：固定版本的镜像、在节点同步完成前保持钱包停用的健康检查、按网络划分的端口与卷，以及一条有文档说明的运营路径。

该名称是非正式的生态系统简称 — Zebra、Zaino、Zallet — 尽管默认 Compose 文件仅启动 Zebra 和 Zallet。Zaino 是一个 Compose profile，而非必需的第 3 个进程。

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

| 组件 | 在 Z3 中的角色 | 必需？ |
| --- | --- | --- |
| **Zebra** | 同步并验证链、gossip、JSON-RPC、健康端点 | 是 |
| **Zallet** | 全节点钱包。内嵌 Zaino 库。直接连接至 Zebra JSON-RPC。**不会**调用独立的 Zaino 容器 | 是 |
| **Zaino** | 独立索引器。为外部轻客户端提供兼容 lightwalletd 的 gRPC，并为区块浏览器和水龙头 [faucet] 提供 JSON-RPC 代理 | 否 — `--profile indexer` |

Z3 会在 `docker-compose.yml` 中固定镜像版本。如果需要不同的标签，可通过 `Z3_ZEBRA_IMAGE`、`Z3_ZAINO_IMAGE` 或 `Z3_ZALLET_IMAGE` 覆盖。

---

## 这与 zcashd 有何不同

| | zcashd | Z3 |
| --- | --- | --- |
| 语言 | C++（Bitcoin 分叉） | Rust 服务，由 Docker Compose 编排 |
| 进程模型 | 一个二进制文件：节点 + 钱包 | 独立的节点和钱包容器 |
| 共识 | 已退役（于 2026 年 7 月 18 日 EOS） | Zebra（或其他兼容节点） |
| 钱包 | 内置 `wallet.dat` | Zallet，使用 age 加密的数据目录 |
| 轻客户端 | 通常使用独立的 lightwalletd | 可选的 Zaino profile |
| 配置 | `zcash.conf` | 位于 `config/<network>/` 下的按网络划分文件，加上 Compose 环境文件 |
| 单台主机上的网络 | 端口冲突棘手 | 原生支持：`z3-mainnet`、`z3-testnet`、`z3-regtest` |

如果你仍有 `zcashd` 钱包，请使用 ZecHub 的 [迁移指南](/guides/migration-guide-zcashd-to-zebrad-zallet) 和 Zallet 的 `migrate-zcashd-wallet` 命令，而不是将 `wallet.dat` 复制到 Z3 卷中。

---

## 网络

Z3 是 3 个相互独立的 Compose 项目。它们不共享端口或卷。

| 网络 | 项目名称 | 用途 | 首次同步 | 真实资金 |
| --- | --- | --- | --- | --- |
| **mainnet** | `z3-mainnet` | 生产环境 | 24–72 小时 | 是 |
| **testnet** | `z3-testnet` | 公共测试网络上的预发布环境 | 2–12 小时 | 否（测试 ZEC） |
| **regtest** | `z3-regtest` | 本地练习：即时区块，无对等节点 | 数秒 | 否 |

新运营者应从 **regtest** 开始，确认 RPC 和钱包流程后，再转至 testnet 或 mainnet。

---

## 默认主机端口

这 3 个网络旨在同一台机器上共存。以下数值为已发布的默认值；均可通过相应的 `Z3_*` 环境变量覆盖。规范矩阵位于 [`z3-contract.yaml`](https://github.com/ZcashFoundation/z3/blob/main/z3-contract.yaml)。

| 服务 | Mainnet | Testnet | Regtest |
| --- | --- | --- | --- |
| Zebra JSON-RPC | 8232 | 18232 | 29232 |
| Zebra P2P | 8233 | 18233 | （未发布） |
| Zebra 健康检查（`/ready`） | 8080 | 18080 | 28080 |
| Zaino gRPC（索引器 profile） | 8137 | 18137 | 28137 |
| Zaino JSON-RPC（索引器 profile） | 8237 | 18237 | 28237 |
| Zallet RPC | 28232 | 40232 | 50232 |

在 Compose 网络内部，服务通过名称解析（`zebra`、`zaino`、`zallet`）。

---

## 数据与备份

| 卷 | 所含内容 | 是否备份？ |
| --- | --- | --- |
| `z3-<network>-chain` | Zebra 链状态（mainnet 约 300 GB） | 可选 — 可重新同步 |
| `z3-<network>-zallet` | 加密的钱包数据库**以及**用于解锁它的 age 身份 | **是 — 这是唯一必须备份的卷** |
| `z3-<network>-zaino` | 索引器状态（仅在索引器 profile 下） | 可选 — 可重建 |
| `z3-<network>-cookie` | Zebra RPC cookie | 否 — 会重新生成 |

若要在首次启动前将链状态置于另一块磁盘上：

```bash
export Z3_CHAIN_DATA_PATH=/mnt/ssd/zebra-state
./scripts/fix-permissions.sh zebra /mnt/ssd/zebra-state
```

`docker compose --env-file .env.<network> --profile "*" down` 会停止技术栈并保留卷。添加 `-v` 会删除它们并强制进行完整重新同步。请包含 `--profile "*"`，以便实际关闭受 profile 控制的服务（索引器、监控）。

---

## 快速开始

前提条件：Docker Engine、Docker Compose v2.24.4+、Git。只有 regtest 需要 `openssl`。

### Regtest（查看技术栈的最快方式）

```bash
git clone https://github.com/ZcashFoundation/z3 && cd z3
./scripts/regtest-init.sh
docker compose --env-file .env.regtest up -d
```

测试命令请参阅 [docs/regtest.md](https://github.com/ZcashFoundation/z3/blob/main/docs/regtest.md)。

### Mainnet（两阶段启动）

Zebra 必须先完成同步，Zallet 才有用。过早启动 Zallet 会使其不断重启，直到 `/ready` 为 true。

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

Testnet 的流程相同，只是使用 `.env.testnet` 和 `./scripts/check-zebra-readiness.sh 18080`。

位于 `config/<network>/` 下的编辑会保留在本地，并在 `git pull` 后继续存在。

### 可选 profiles

```bash
# Lightwalletd-compatible gRPC + JSON-RPC proxy
docker compose --env-file .env.mainnet --profile indexer up -d

# Prometheus, Grafana, Jaeger, Alertmanager
docker compose --env-file .env.mainnet --profile monitoring up -d
```

默认 Grafana 端口为 3000（mainnet）、13000（testnet）、23000（regtest）。

---

## 运营说明

* **固定镜像。** Z3 不会悄然浮动至 `:latest`。请在经审核的变更中更新固定版本，或设置 `Z3_<SERVICE>_IMAGE`。
* **非 root 容器。** Linux capabilities 已被移除。健康检查会在 Zebra 就绪前阻止钱包启动。默认启用重启策略。
* **日志。** Z3 不固定日志驱动。请在 Docker daemon 配置中设置大小限制，否则日志会在 24/7 节点上无限增长。
* **P2P。** Mainnet 和 testnet 会发布 Zebra 的 P2P 端口。在 NAT 后方时，请将 `ZEBRA_NETWORK__EXTERNAL_ADDR` 设置为对等节点应拨号的地址。Regtest 没有对等节点。
* **ARM 上的 Zaino。** 上游 Zaino 镜像仅支持 `linux/amd64`。在 Apple Silicon 上，除非从源代码构建，否则它会在模拟环境下运行。Zebra 和 Zallet 支持多架构。
* **共享主机。** 默认未设置 CPU 或内存限制。如果主机并非专用于节点，请在覆盖文件中添加 `deploy.resources.limits`。

生产环境检查清单和常见问题：[docs/faq.md](https://github.com/ZcashFoundation/z3/blob/main/docs/faq.md)、[docs/docker-architecture.md](https://github.com/ZcashFoundation/z3/blob/main/docs/docker-architecture.md)。

---

## 谁应运行 Z3

**适合使用**

* 曾将 `zcashd` 用作节点加钱包的交易所、托管方和挖矿 pool
* 希望针对已同步的 Zebra 使用受支持的全节点钱包 RPC 的运营者
* 需要并行使用 mainnet、testnet 和 regtest 的开发者 [developer]
* 通过 Zaino profile 建立私有、兼容 lightwalletd 的端点的任何人

**通常不适合的工具**

* 仅需发送和接收 ZEC 的终端用户 — 请使用轻钱包，例如 ZODL / Zashi、Zingo 或 YWallet
* 仅想验证链的人 — 请单独运行 Zebra（或 Zakura）
* 仅想提供 compact blocks 的人 — 请运行 Zebra + Zaino，或 Zebra + lightwalletd，无需 Zallet

---

## 相关页面

* [Zebra 全节点](/zcash-tech/zebra-full-node) — Z3 所封装的共识节点
* [Zaino](/zcash-tech/zaino) — 可选索引器 profile
* [全节点](/zcash-tech/full-nodes) — Zebra、Zakura 和已退役的 zcashd
* [轻钱包节点](/zcash-tech/lightwallet-nodes) — 轻客户端所连接的对象
* [Zakura 节点](/zcash-tech/zakura-node) — 替代性全节点；并非 Z3 当前提供的节点
* [迁移指南：从 zcashd 到 Zebrad/Zallet](/guides/migration-guide-zcashd-to-zebrad-zallet)
* [开发者资源](/start-here/developer-resources)

---

## 资源

* [Z3 代码仓库](https://github.com/ZcashFoundation/z3)
* [Z3 合约（端口、卷、项目名称）](https://github.com/ZcashFoundation/z3/blob/main/z3-contract.yaml)
* [Zebra](https://github.com/ZcashFoundation/zebra) · [Zebra 手册](https://zebra.zfnd.org/)
* [Zaino](https://github.com/zingolabs/zaino)
* [Zallet](https://github.com/zcash/zallet) · [Zallet 手册](https://zcash.github.io/zallet/)
* [Zcash 社区论坛 — Z3 更新](https://forum.zcashcommunity.com/t/zcash-z3-updates-formerly-zcashd-deprecation/48965)
* [Z3 Launcher](https://github.com/Jubrilabdulazeez/z3-launcher) — 官方 Compose 技术栈之上的社区控制平面（ZecHub Hackathon）
