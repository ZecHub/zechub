<a href="https://github.com/zechub/zechub/edit/main/site/guides/Zcash_Node_RPC_and_Indexing.md" target="_blank">
  <img src="https://img.shields.io/badge/Edit-blue" alt="Edit Page"/>
</a>

# 实用指南：Zcash 节点 [Node] RPC 和 blockchain 索引

本页面是一本操作手册，介绍如何通过 JSON-RPC 与正在运行的 Zcash 全节点 [full node] 通信，以及如何接入供轻钱包 [light wallets] 和浏览器查询的索引器。它**不是**另一份安装指南。

如需了解如何启动后 `zcashd` 技术栈（Zebra + Zallet、可选的 Zaino、端口、卷、两阶段启动），请参阅 [Z3 技术栈](/zcash-tech/z3-stack)页面和 [Z3 仓库](https://github.com/ZcashFoundation/z3)。有关共识节点背景，请参阅 [全节点](/zcash-tech/full-nodes)和 [Zebra 全节点](/zcash-tech/zebra-full-node)。

`zcashd` 已于 2026 年 7 月 18 日终止支持。新的运营工作应面向 Zebra（或 [Zakura](/zcash-tech/zakura-node)）加上钱包和索引器，而不是 `zcashd`。

---

## TL;DR

* **JSON-RPC** 是运营者和钱包向节点查询链 [chain] 尖端、对等节点，以及（在钱包进程上）余额的方式。在 Z3 上，Zebra 提供节点 RPC；Zallet 提供钱包 RPC。
* **Regtest** 是学习这些调用的合适环境。Z3 在 `http://127.0.0.1:8181` 上的 rpc-router 接受 `zebra` / `zebra`，并将节点方法转发至 Zebra，将钱包方法转发至 Zallet。
* **主网和测试网**在 Zebra 上使用 Cookie 认证。不要将 Regtest 的用户名和密码复制到公开节点上。
* **索引**与验证是独立工作。Zebra 进行验证。[Zaino](/zcash-tech/zaino)（Z3 `--profile indexer`）提供兼容 lightwalletd 的 gRPC。[Ztreamer](https://github.com/distractedm1nd/ztreamer) 是一个由 Zakura 支持的索引器；它不是 Z3 随附的组件。
* Zaino JSON-RPC 和 Zebra 的可选索引器 gRPC 仅适用于回环网络或受信任网络。不要在公共互联网中未经认证地公开它们。

---

## 哪个进程响应哪个调用

| 你需要 | 连接到 | Z3 主网主机端口 | 说明 |
| --- | --- | --- | --- |
| 链尖端、对等节点、`getblockchaininfo` | Zebra JSON-RPC | 8232 | Cookie 认证 |
| 钱包余额、地址、发送 | Zallet RPC | 28232 | 独立进程；测试版软件 |
| 用于轻钱包的紧凑区块 [compact blocks] | Zaino gRPC | 8137 | 仅配合 `--profile indexer`；明文 h2c |
| 浏览器 / 水龙头 [faucet] JSON-RPC 代理 | Zaino JSON-RPC | 8237 | 仅限受信任网络 |
| 无需同步即可练习上述全部内容 | Z3 Regtest rpc-router | 8181 | 用户名 `zebra` / 密码 `zebra` |

端口矩阵和 Compose 项目名称：[Z3 技术栈](/zcash-tech/z3-stack)和 [`z3-contract.yaml`](https://github.com/ZcashFoundation/z3/blob/main/z3-contract.yaml)。

---

## 先在 Regtest 上练习

在 Z3 检出目录中，完成 `./scripts/regtest-init.sh` 和 `docker compose --env-file .env.regtest up -d` 后：

```bash
# Node method (Zebra)
curl -s -X POST -H "Content-Type: application/json" \
  -d '{"jsonrpc":"2.0","method":"getblockchaininfo","params":[],"id":1}' \
  http://127.0.0.1:8181

# Wallet method (Zallet)
curl -s -X POST -H "Content-Type: application/json" \
  -d '{"jsonrpc":"2.0","method":"getwalletinfo","params":[],"id":2}' \
  http://127.0.0.1:8181
```

健康的 `getblockchaininfo` 结果包含 `"blocks"` 和一个 `"upgrades"` 映射。如果 curl 卡住，说明路由器尚未启动；如果收到 `401`，则说明你直接访问了 Zebra 而不是路由器（Regtest 上直接访问 Zebra 的地址为 `29232`，且除非你已修改，否则仍需要路由器凭据）。

完整的 Regtest 工作流程，包括挖出激活区块：[Z3 `docs/regtest.md`](https://github.com/ZcashFoundation/z3/blob/main/docs/regtest.md)。

---

## 主网 / 测试网 JSON-RPC（Cookie 认证）

在主网和测试网上，Zallet 以及可选的 Zaino 服务会读取一个**共享 Cookie 卷**。该 Cookie 会在启动时重新生成；它不是备份目标。

**不要**将 Zebra JSON-RPC 发布到公共互联网。应从 Compose 网络（`zebra:8232`）中调用它，或者仅在你将其绑定到回环地址时从主机调用。

在 Zebra 处于 `/ready` 状态后，典型的运营者检查如下：

```bash
# Wait until Zebra is synced (Z3 helper)
./scripts/check-zebra-readiness.sh

# Then start Zallet
docker compose --env-file .env.mainnet up -d
```

`getblocktemplate` / `getmininginfo` 是挖矿 RPC。仍预期使用单一 `zcashd` 进程的矿池，需要使用 Zebra（或 Zakura）获取模板，并搭配它们用于 coinbase 的任何钱包。请参阅 [Zcash 挖矿池](/using-zcash/zcash-mining-pools)和 [迁移指南](/guides/migration-guide-zcashd-to-zebrad-zallet)。

---

## 接入索引器

验证和索引是不同的工作。

### Zaino（Z3 随附的组件）

Zaino 读取 Zebra，并提供兼容 lightwalletd 的 gRPC API 及 JSON-RPC 代理。Zallet **不**需要独立的 Zaino 容器；它嵌入了 Zaino 库，并通过 JSON-RPC 与 Zebra 通信。当你需要外部轻钱包、浏览器或水龙头时，启动独立的 Zaino：

```bash
docker compose --env-file .env.mainnet --profile indexer up -d
```

在将客户端指向 Zaino 前，请等待 Zebra 完成同步。处于追赶状态且具有高抓取并发度的批量索引器，可能会减慢 Zebra 的验证器；在索引器追上前，请将 `fetch_concurrency` 保持在较低的个位数。

Regtest gRPC（明文；端口 `28137`）：

```bash
# From the Z3 repo, after: scripts/vendor.sh zaino
# and: docker compose --env-file .env.regtest --profile indexer up -d zaino

grpcurl -plaintext \
  -import-path vendor/zaino/zaino-proto/proto \
  -proto service.proto \
  127.0.0.1:28137 \
  cash.z.wallet.sdk.rpc.CompactTxStreamer/GetLightdInfo

grpcurl -plaintext \
  -import-path vendor/zaino/zaino-proto/proto \
  -proto service.proto \
  -d '{}' \
  127.0.0.1:28137 \
  cash.z.wallet.sdk.rpc.CompactTxStreamer/GetLatestBlock
```

Zaino gRPC 在所有网络上均为明文 h2c。如果主机外的任何设备要连接，请在反向代理处终止 TLS。详情：[Zaino](/zcash-tech/zaino)和 [Z3 `docs/regtest.md`](https://github.com/ZcashFoundation/z3/blob/main/docs/regtest.md)。

### 其他索引器（非 Z3）

* **lightwalletd** — 较旧的紧凑区块服务器。它仍在实际环境中部署；Zaino 是此角色的后继方案。
* **Ztreamer** — 一个由 Zakura 支持的索引器和 `CompactTxStreamer` 实现。它不是 Z3 服务。请参阅 [Ztreamer 仓库](https://github.com/distractedm1nd/ztreamer)。
* **Zebra `rpc.indexer_listen_addr`** — Zebra 内部的可选 gRPC 监听器。Z3 不需要它，也不会将其发布到主机。

---

## 常见错误

**在 Zebra 上调用钱包方法。** `getwalletinfo` 和发送 RPC 属于 Zallet（或其他钱包），而不属于共识节点。

**在 Zebra 处于 `/ready` 状态前启动 Zallet。** Zallet 将不断重启。请在主网/测试网上使用 `scripts/check-zebra-readiness.sh`。

**将 Regtest 的 `zebra`/`zebra` 复制到主网。** Cookie 认证成为主网/测试网默认设置是有原因的。

**将 Zaino 当作全节点。** Zebra（或 Zakura）负责验证。Zaino 负责索引。

**公开暴露 Zaino JSON-RPC 或 Zebra 索引器 gRPC。** 这些端点仅适用于回环网络或受信任的私有网络。

**假定每个轻钱包都已支持 Zaino。** 请根据钱包实际实现的协议检查其当前版本。

---

## 相关页面

* [Z3 技术栈](/zcash-tech/z3-stack) — 安装、端口、卷、两阶段启动
* [Zaino](/zcash-tech/zaino) — 索引器角色和运营者说明
* [全节点](/zcash-tech/full-nodes)
* [Zebra 全节点](/zcash-tech/zebra-full-node)
* [轻钱包节点](/zcash-tech/lightwallet-nodes)
* [迁移指南：从 zcashd 到 Zebrad/Zallet](/guides/migration-guide-zcashd-to-zebrad-zallet)
* [Zingolib 和 Zaino 教程](/guides/zingolib-and-zaino-tutorial)

## 资源

* [Z3 仓库](https://github.com/ZcashFoundation/z3)
* [Z3 Regtest 操作手册（curl / grpcurl）](https://github.com/ZcashFoundation/z3/blob/main/docs/regtest.md)
* [Z3 常见问题](https://github.com/ZcashFoundation/z3/blob/main/docs/faq.md)
* [Zebra](https://zebra.zfnd.org/)
* [Zaino](https://github.com/zingolabs/zaino)
* [Zallet 手册](https://zcash.github.io/zallet/)
* [Ztreamer](https://github.com/distractedm1nd/ztreamer)

**最后更新：**2026 年 9 月
