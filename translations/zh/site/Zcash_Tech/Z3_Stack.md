<a href="https://github.com/zechub/zechub/edit/main/site/Zcash_Tech/Z3_Stack.md" target="_blank">
  <img src="https://img.shields.io/badge/Edit-blue" alt="编辑页面"/>
</a>

# Z3 Stack

**Z3 Stack** 是 Zcash Foundation 打包的节点平台：**Zebra**（全节点）+ **Zallet**（全节点钱包），并可选配 **Zaino** 索引器。它旨在取代独立的 `zcashd` 进程；该进程将共识和钱包打包在一个二进制文件中，并于 2026 年 7 月 18 日停止维护。

参考实现是位于 [github.com/ZcashFoundation/z3](https://github.com/ZcashFoundation/z3) 的 Docker Compose 项目。

> **状态，2026 年 11 月 14 日：默认固定版本早于 NU7。** Z3 的 `docker-compose.yml` 上次于 2026 年 8 月 10 日更改。它仍固定使用 `zfnd/zebra:6.2.3` 和 `zodlinc/zallet:v0.1.0-beta.1`，并以 `zallet-zaino` 二进制文件启动。[NU7](NU7.md) 于 2026 年 11 月 6 日在主网上的区块 3,543,405 激活，只有 Zebra 7.0.0 或更高版本会遵循它：6.x 版 Zebra 仍遵循旧规则，并会脱离实际链。Zallet v0.1.0-beta.4 是首个遵循 NU7 的版本，不再包含 `zallet-zaino`。部署前请检查仓库是否有更新的固定版本。如果自行覆盖镜像，请注意 Zallet 剩余的 `zebra` 后端会直接读取 Zebra 的状态目录，因此 Zallet 必须在同一主机上运行并能访问该目录（[Zallet](Zallet.md)）。

---

## 简介

* Z3 **不是新的共识客户端**。它是将后 `zcashd` Stack 组件组合运行的方式：Zebra 验证链，Zallet 保存密钥并提供钱包 RPC，Zaino（可选）则使用 lightwalletd gRPC 协议。
* `zcashd` 将节点和钱包打包在一起。Z3 **将这两种职责拆分开来**。交易所、矿池和其他全节点钱包运营者会迁移到这一组合，而不是只迁移到 Zebra。
* 一台主机上可以运行 3 个相互隔离的 Compose 项目：**主网**、**测试网**和**回归测试网**。
* 主网首次同步大约需要 **24–72 小时**，占用约 **300 GB**。回归测试网几秒内即可启动，是学习这套 Stack 的理想选择。
* 在固定版本的 Z3 镜像中，Zallet 运行其 `zallet-zaino` 后端（Zaino 的索引器库），并通过 JSON-RPC 与 Zebra 通信。Zallet 在 v0.1.0-beta.4 中移除了该后端；当前的 Zallet 会直接读取 Zebra 的状态。只有当你需要为外部钱包提供兼容 lightwalletd 的端点时，才需要独立的 Zaino 服务。
* Zallet 仍处于 **测试阶段**。不兼容变更可能要求删除并重新创建钱包。不要将其视为可存放大额资金的成熟托管软件。

---

## Z3 的由来

在 Zcash 生命周期的大部分时间里，`zcashd` 既是参考全节点，也是唯一用于生产环境的全节点钱包。交易所、pool 和托管服务商都基于这一设计进行集成。

`zcashd` 已停止维护。共识迁移到了 [Zebra](/zcash-tech/zebra-full-node)（现在也包括 [Zakura](/zcash-tech/zakura-node)）。内置钱包迁移到了 [Zallet](https://github.com/zcash/zallet)。轻钱包服务正从 [lightwalletd](/zcash-tech/lightwallet-nodes) 迁移到 [Zaino](/zcash-tech/zaino)。

这 3 个组件分别位于不同的仓库，采用不同的发布流程，也有各自的配置。Z3 将它们连接起来：固定镜像版本，通过健康检查确保节点同步后才启动钱包，按网络划分端口和卷，并提供有文档记录的运营流程。

这个名称是生态系统中的非正式简称——Zebra、Zaino、Zallet——尽管默认 Compose 文件只会启动 Zebra 和 Zallet。Zaino 是一个 Compose 配置组，并非必需的第三个进程。

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

| 组件 | 在 Z3 中的作用 | 是否必需？ |
| --- | --- | --- |
| **Zebra** | 同步并验证链、进行 gossip 通信、提供 JSON-RPC 和健康检查端点 | 是 |
| **Zallet** | 全节点钱包。固定版本的 beta.1 镜像运行基于 Zaino 库的后端（`zallet-zaino`，已在 Zallet beta.4 中移除），并直接连接到 Zebra JSON-RPC。不会调用独立的 Zaino 容器 | 是 |
| **Zaino** | 独立索引器。提供兼容 lightwalletd 的 gRPC，供外部轻客户端使用，并为区块浏览器和水龙头提供 JSON-RPC 代理 | 否 — `--profile indexer` |

Z3 在 `docker-compose.yml` 中固定镜像版本。如果需要其他标签，可通过 `Z3_ZEBRA_IMAGE`、`Z3_ZAINO_IMAGE` 或 `Z3_ZALLET_IMAGE` 覆盖。

---

## 与 zcashd 的区别

| | zcashd | Z3 |
| --- | --- | --- |
| 语言 | C++（Bitcoin 分叉） | Rust 服务，通过 Docker Compose 编排 |
| 进程模型 | 单个二进制文件：节点 + 钱包 | 节点和钱包分别运行在独立容器中 |
| 共识 | 已停止维护（EOS：2026 年 7 月 18 日） | Zebra（或其他兼容节点） |
| 钱包 | 内置 `wallet.dat` | Zallet，使用 age 加密的数据目录 |
| 轻客户端 | 通常需要独立的 lightwalletd | 可选的 Zaino 配置组 |
| 配置 | `zcash.conf` | `config/<network>/` 下按网络划分的文件，以及 Compose 环境文件 |
| 一台主机上的网络 | 端口冲突难以处理 | 原生支持：`z3-mainnet`、`z3-testnet`、`z3-regtest` |

如果你仍在使用 `zcashd` 钱包，请使用 ZecHub 的 [迁移指南](/guides/migration-guide-zcashd-to-zebrad-zallet) 和 Zallet 的 `migrate-zcashd-wallet` 命令，而不要将 `wallet.dat` 复制到 Z3 卷中。

---

## 网络

Z3 由 3 个独立的 Compose 项目组成。它们不共享端口或卷。

| 网络 | 项目名称 | 用途 | 首次同步 | 真实资金 |
| --- | --- | --- | --- | --- |
| **主网** | `z3-mainnet` | 生产环境 | 24–72 小时 | 是 |
| **测试网** | `z3-testnet` | 在公共测试网络上进行预发布测试 | 2–12 小时 | 否（测试 ZEC） |
| **回归测试网** | `z3-regtest` | 本地练习：区块即时生成，没有对等节点 | 几秒 | 否 |

新运营者应从**回归测试网**开始，确认 RPC 和钱包流程正常，然后再切换到测试网或主网。

---

## 默认主机端口

这 3 个网络旨在同一台机器上共存。以下数值是默认发布的端口；每个端口都可通过对应的 `Z3_*` 环境变量覆盖。权威端口矩阵见 [`z3-contract.yaml`](https://github.com/ZcashFoundation/z3/blob/main/z3-contract.yaml)。

| 服务 | 主网 | 测试网 | 回归测试网 |
| --- | --- | --- | --- |
| Zebra JSON-RPC | 8232 | 18232 | 29232 |
| Zebra P2P | 8233 | 18233 | （未发布） |
| Zebra 健康检查（`/ready`） | 8080 | 18080 | 28080 |
| Zaino gRPC（索引器配置组） | 8137 | 18137 | 28137 |
| Zaino JSON-RPC（索引器配置组） | 8237 | 18237 | 28237 |
| Zallet RPC | 28232 | 40232 | 50232 |

在 Compose 网络内部，服务可通过名称解析（`zebra`、`zaino`、`zallet`）。

---

## 数据与备份

| 卷 | 存储内容 | 是否备份？ |
| --- | --- | --- |
| `z3-<network>-chain` | Zebra 链状态（主网约 300 GB） | 可选 — 可重新同步 |
| `z3-<network>-zallet` | 加密的钱包数据库，**以及**用于解锁它的 age 身份 | **是 — 这是唯一必须备份的卷** |
| `z3-<network>-zaino` | 索引器状态（仅在启用索引器配置组时使用） | 可选 — 可重建 |
| `z3-<network>-cookie` | Zebra RPC cookie | 否 — 会自动重新生成 |

首次启动前，要将链状态放到另一块磁盘上：

```bash
export Z3_CHAIN_DATA_PATH=/mnt/ssd/zebra-state
./scripts/fix-permissions.sh zebra /mnt/ssd/zebra-state
```

`docker compose --env-file .env.<network> --profile "*" down` 会停止 Stack 并保留卷。添加 `-v` 会删除这些卷并强制完整重新同步。请包含 `--profile "*"`，以确保受配置组控制的服务（索引器、监控）确实停止并移除。

---

## 开始使用

前置条件：Docker Engine、Docker Compose v2.24.4+、Git。只有运行回归测试网时才需要 `openssl`。

### 回归测试网（最快了解这套 Stack 的方式）

```bash
git clone https://github.com/ZcashFoundation/z3 && cd z3
./scripts/regtest-init.sh
docker compose --env-file .env.regtest up -d
```

测试命令见 [docs/regtest.md](https://github.com/ZcashFoundation/z3/blob/main/docs/regtest.md)。

### 主网（分两阶段启动）

Zebra 必须完成同步后，Zallet 才能正常使用。过早启动 Zallet 会导致它不断重启，直到 `/ready` 条件成立。

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

对 `config/<network>/` 的修改仅保存在本地，并会在 `git pull` 后保留。

### 可选配置组

```bash
# Lightwalletd-compatible gRPC + JSON-RPC proxy
docker compose --env-file .env.mainnet --profile indexer up -d

# Prometheus, Grafana, Jaeger, Alertmanager
docker compose --env-file .env.mainnet --profile monitoring up -d
```

Grafana 默认端口为 3000（主网）、13000（测试网）、23000（回归测试网）。

---

## 运营者须知

* **固定镜像版本。** Z3 不会自动切换到 `:latest`。请通过经过审查的变更更新固定版本，或设置 `Z3_<SERVICE>_IMAGE`。固定版本自 2026 年 8 月以来未有变化，因此早于 NU7（见顶部的状态说明）。
* **非 root 容器。** Linux 能力已被移除。健康检查会阻止钱包启动，直到 Zebra 准备就绪。默认启用重启策略。
* **日志。** Z3 不固定日志驱动程序。在 Docker 守护进程配置中设置大小上限，否则全天候运行的节点日志会无限增长。
* **P2P。** 主网和测试网会发布 Zebra 的 P2P 端口。在 NAT 后运行时，请将 `ZEBRA_NETWORK__EXTERNAL_ADDR` 设置为对等节点应拨入的地址。回归测试网没有对等节点。
* **ARM 上的 Zaino。** 上游 Zaino 镜像仅支持 `linux/amd64`。在 Apple Silicon 上，它会通过模拟运行，除非你从源代码构建。Zebra 和 Zallet 支持多架构。
* **共享主机。** 默认不设 CPU 或内存限制。如果该机器并非专供节点使用，请在覆盖文件中添加 `deploy.resources.limits`。

面向生产环境的检查清单和常见问题见 [docs/faq.md](https://github.com/ZcashFoundation/z3/blob/main/docs/faq.md)、[docs/docker-architecture.md](https://github.com/ZcashFoundation/z3/blob/main/docs/docker-architecture.md)。

---

## 适合运行 Z3 的人群

**适合**

* 曾将 `zcashd` 用作节点加钱包的交易所、托管服务商和矿池
* 希望通过已同步的 Zebra 使用受支持的全节点钱包 RPC 的运营者
* 需要并行运行主网、测试网和回归测试网的开发者
* 任何希望通过 Zaino 配置组搭建私有 lightwalletd 兼容端点的人

**通常不适合**

* 只需要收发 ZEC 的终端用户 — 请使用轻钱包，例如 ZODL / Zashi、Zingo 或 Zkool（YWallet 的持续维护后继产品）
* 只想验证链的人 — 单独运行 Zebra（或 Zakura）
* 只想提供精简区块服务的人 — 运行 Zebra + Zaino，或 Zebra + lightwalletd，无需运行 Zallet

---

## 相关页面

* [Zebra全节点](/zcash-tech/zebra-full-node) — Z3 封装的共识节点
* [Zaino](/zcash-tech/zaino) — 可选的索引器配置组
* [全节点](/zcash-tech/full-nodes) — Zebra、Zakura 和已停止维护的 zcashd
* [轻客户端节点](/zcash-tech/lightwallet-nodes) — 轻客户端连接的对象
* [Zakura节点](/zcash-tech/zakura-node) — 另一种全节点；目前 Z3 未提供
* [迁移指南：从 zcashd 迁移到 Zebrad/Zallet](/guides/migration-guide-zcashd-to-zebrad-zallet)
* [开发者资源](/start-here/developer-resources)

---

## 资源

* [Z3 仓库](https://github.com/ZcashFoundation/z3)
* [Z3 合约（端口、卷、项目名称）](https://github.com/ZcashFoundation/z3/blob/main/z3-contract.yaml)
* [Zebra](https://github.com/ZcashFoundation/zebra) · [《Zebra手册》](https://zebra.zfnd.org/)
* [Zaino](https://github.com/zingolabs/zaino)
* [Zallet](https://github.com/zcash/zallet) · [《Zallet手册》](https://zcash.github.io/zallet/)
* [Zcash社区论坛 — Z3 更新](https://forum.zcashcommunity.com/t/zcash-z3-updates-formerly-zcashd-deprecation/48965)
* [Z3 启动器](https://github.com/Jubrilabdulazeez/z3-launcher) — 基于官方 Compose Stack 的社区控制平面（ZecHub Hackathon）
