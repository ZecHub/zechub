<a href="https://github.com/zechub/zechub/edit/main/site/guides/Zcash_Node_RPC_and_Indexing.md" target="_blank">
  <img src="https://img.shields.io/badge/Edit-blue" alt="Edit Page"/>
</a>

# 实用指南：Zcash 节点 RPC 和区块链索引

本页面是一本操作手册，介绍如何通过 JSON-RPC 与运行中的 Zcash 完整节点通信，以及如何接入可供轻钱包和区块浏览器查询的索引器。这**不是**第二份安装指南。

如需了解如何启动 `zcashd` 后的技术栈（Zebra + Zallet、可选的 Zaino、端口、卷、两阶段启动），请参阅 [Z3 Stack](/zcash-tech/z3-stack) 页面和 [Z3 repository](https://github.com/ZcashFoundation/z3)。有关共识节点的背景信息，请参阅 [Full Nodes](/zcash-tech/full-nodes) 和 [Zebra 完整节点](/zcash-tech/zebra-full-node)。

`zcashd` 已于 2026 年 7 月 18 日停止维护。新的运营工作应面向 Zebra（或 [Zakura](/zcash-tech/zakura-node)）加上钱包/索引器，而不是 `zcashd`。

---

## TL;DR

* **JSON-RPC** 是运营者和钱包向节点查询链尖端、对等节点以及（在钱包进程上）余额的方式。在 Z3 中，Zebra 提供节点 RPC；Zallet 提供钱包 RPC。
* **Regtest** 是学习这些调用的合适环境。Z3 的 rpc-router 位于 `http://127.0.0.1:8181`，接受 `zebra` / `zebra`，并将节点方法转发至 Zebra，将钱包方法转发至 Zallet。
* **主网和测试网**在 Zebra 上使用 cookie 认证。请勿将 regtest 的用户名/密码复制到公开节点上。
* **索引**与验证是不同的工作。Zebra 进行验证。[Zaino](/zcash-tech/zaino)（Z3 的 `--profile indexer`）提供与 lightwalletd 兼容的 gRPC。[Ztreamer](https://github.com/distractedm1nd/ztreamer) 是由 Zakura 支持的索引器；它不是 Z3 随附的组件。
* Zaino JSON-RPC 和 Zebra 的可选索引器 gRPC 仅适用于回环或受信任网络。请勿将其以未认证方式暴露在公共互联网中。

---

## 哪个进程响应哪个调用

| 你的需求 | 通信对象 | Z3 主网主机端口 | 说明 |
| --- | --- | --- | --- |
| 链尖端、对等节点、`getblockchaininfo` | Zebra JSON-RPC | 8232 | Cookie 认证 |
| 钱包余额、地址、发送 | Zallet RPC | 28232 | 独立进程；测试版软件 |
| 面向轻钱包的紧凑区块 | Zaino gRPC | 8137 | 仅配合 `--profile indexer`；明文 h2c |
| 区块浏览器 / 水龙头 JSON-RPC 代理 | Zaino JSON-RPC | 8237 | 仅限受信任网络 |
| 无需同步即可练习上述所有操作 | Z3 regtest rpc-router | 8181 | 用户名 `zebra` / 密码 `zebra` |

端口矩阵和 Compose 项目名称：[Z3 Stack](/zcash-tech/z3-stack) 和 [`z3-contract.yaml`](https://github.com/ZcashFoundation/z3/blob/main/z3-contract.yaml)。

---

## 先在 regtest 上练习

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

健康的 `getblockchaininfo` 结果包含 `"blocks"` 和一个 `"upgrades"` 映射。如果 curl 卡住，说明路由器尚未启动；如果收到 `401`，说明你直接访问了 Zebra 而非路由器（regtest 上的直接 Zebra 位于 `29232`，除非你已更改凭据，否则它仍要求路由器凭据）。

完整的 regtest 工作流程（包括挖掘激活区块）：[Z3 `docs/regtest.md`](https://github.com/ZcashFoundation/z3/blob/main/docs/regtest.md)。

---

## 主网 / 测试网 JSON-RPC（cookie 认证）

在主网和测试网上，Zallet 和可选的 Zaino 服务读取一个**共享 cookie 卷**。该 cookie 会在启动时重新生成；它不是备份目标。

**不要**将 Zebra JSON-RPC 发布到公共互联网。请从 Compose 网络（`zebra:8232`）中调用，或仅在其绑定至回环地址时从主机调用。

当 Zebra 已 `/ready` 后，运营者通常会进行以下检查：

```bash
# Wait until Zebra is synced (Z3 helper)
./scripts/check-zebra-readiness.sh

# Then start Zallet
docker compose --env-file .env.mainnet up -d
```

`getblocktemplate` / `getmininginfo` 是挖矿 RPC。仍预期单个 `zcashd` 进程的矿池，需要使用 Zebra（或 Zakura）获取模板，并使用其用于 coinbase 的任何钱包。请参阅 [Zcash Mining Pools](/using-zcash/zcash-mining-pools) 和 [migration guide](/guides/migration-guide-zcashd-to-zebrad-zallet)。

---

## 接入索引器

验证和索引是不同的工作。

### Zaino（Z3 随附的组件）

Zaino 读取 Zebra，并提供兼容 lightwalletd 的 gRPC API 以及 JSON-RPC 代理。Zallet **不**需要独立的 Zaino 容器；它内嵌 Zaino 库，并通过 JSON-RPC 与 Zebra 通信。当你需要外部轻钱包、区块浏览器或水龙头时，启动独立的 Zaino：

```bash
docker compose --env-file .env.mainnet --profile indexer up -d
```

在将客户端指向 Zaino 前，请等待 Zebra 完成同步。高抓取并发度的批量索引器在追赶进度时可能会拖慢 Zebra 的验证器；在索引器追上之前，将 `fetch_concurrency` 保持在较低的个位数。

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

Zaino gRPC 在所有网络上均为明文 h2c。若主机外部的任何设备需要连接，请在反向代理处终止 TLS。详情：[Zaino](/zcash-tech/zaino) 和 [Z3 `docs/regtest.md`](https://github.com/ZcashFoundation/z3/blob/main/docs/regtest.md)。

### 其他索引器（非 Z3）

* **lightwalletd** — 较早的紧凑区块服务器。它仍被广泛部署；Zaino 是该角色的后继方案。
* **Ztreamer** — 由 Zakura 支持的索引器和 `CompactTxStreamer` 实现。它不是 Z3 服务。请参阅 [Ztreamer repository](https://github.com/distractedm1nd/ztreamer)。
* **Zebra `rpc.indexer_listen_addr`** — Zebra *内部*的可选 gRPC 监听器。Z3 不需要它，也不会将其发布到主机。

---

## 常见错误

**在 Zebra 上调用钱包方法。** `getwalletinfo` 和发送 RPC 属于 Zallet（或其他钱包），而不属于共识节点。

**在 Zebra `/ready` 前启动 Zallet。** Zallet 会反复重启。在主网/测试网上使用 `scripts/check-zebra-readiness.sh`。

**将 regtest `zebra`/`zebra` 复制到主网。** Cookie 认证之所以是主网/测试网的默认设置，自有其原因。

**将 Zaino 视为完整节点。** Zebra（或 Zakura）进行验证。Zaino 进行索引。

**公开暴露 Zaino JSON-RPC 或 Zebra 索引器 gRPC。** 这些端点适用于回环或受信任的私有网络。

**假定每个轻钱包都已支持 Zaino。** 请根据钱包实际实现的协议检查其当前版本。

---

## 相关页面

* [Z3 Stack](/zcash-tech/z3-stack) — 安装、端口、卷、两阶段启动
* [Zaino](/zcash-tech/zaino) — 索引器角色和运营者说明
* [Full Nodes](/zcash-tech/full-nodes)
* [Zebra 完整节点](/zcash-tech/zebra-full-node)
* [Lightwallet Nodes](/zcash-tech/lightwallet-nodes)
* [迁移指南：从 zcashd 到 Zebrad/Zallet](/guides/migration-guide-zcashd-to-zebrad-zallet)
* [Zingolib 和 Zaino 教程](/guides/zingolib-and-zaino-tutorial)

## 资源

* [Z3 repository](https://github.com/ZcashFoundation/z3)
* [Z3 regtest 操作手册（curl / grpcurl）](https://github.com/ZcashFoundation/z3/blob/main/docs/regtest.md)
* [Z3 FAQ](https://github.com/ZcashFoundation/z3/blob/main/docs/faq.md)
* [Zebra](https://zebra.zfnd.org/)
* [Zaino](https://github.com/zingolabs/zaino)
* [Zallet Book](https://zcash.github.io/zallet/)
* [Ztreamer](https://github.com/distractedm1nd/ztreamer)

**最后更新：**2026 年 9 月
