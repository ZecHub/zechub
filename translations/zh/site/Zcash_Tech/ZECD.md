---
<a href="https://github.com/zechub/zechub/edit/main/site/Zcash_Tech/ZECD.md" target="_blank">
  <img src="https://img.shields.io/badge/Edit-blue" alt="编辑页面"/>
</a>

# ZECD — 以屏蔽为先的钱包服务器

> 🇧🇷 [葡萄牙语版本](/zechubglobal/zcashbrasil/zcashtech/zecd)

ZECD 是一个面向 Zcash、以屏蔽交易为优先的钱包服务器，基于 [librustzcash](https://github.com/zcash/librustzcash) 构建，并通过 Bitcoin Core 的 JSON-RPC 方言对外提供接口。它为开发者和支付集成人员提供了一个熟悉的、兼容 Bitcoin 的 API，用于与 Zcash 交互——同时将 Orchard（隐私性最强的资金池）设为默认选项。ZECD 由 [zec.rocks](https://zec.rocks) 开发，旨在在现代云原生部署中替代 `zcashd` 的钱包功能。

**当前版本：** 0.5.0-rc3（2026 年 7 月 13 日）——支持 Ironwood（NU6.3）。可通过 `cargo install zecd` 安装，或使用官方 Docker 镜像。

---

## TL;DR

- ZECD 是一个**钱包守护进程（服务器）**——不是完整节点。它负责密钥、扫描、证明和 RPC，但不使用 Zcash P2P 协议通信。
- 它使用 **Bitcoin Core 的 JSON-RPC 方言**：相同的方法名、字段结构、认证方式和错误代码——许多 Bitcoin RPC 客户端可直接与 Zcash 配合使用。
- **Orchard（屏蔽）地址是默认选项**；透明地址（t-address）和 Sapling 支持需要为每个钱包显式启用。
- 它通过本地 JSON-RPC 连接到**自托管的 [Zebra](Zebra_Full_Node.md) 完整节点**——不需要 lightwalletd。
- **按设计无状态**：整个钱包仅凭助记词即可恢复，因此数据目录可以随时丢弃。
- **不能直接替代 zcashd**：它只实现了 Zcash RPC 方法的一个子集，并且为了隐私和安全进行了有意的设计差异化。
- 手续费遵循 **ZIP-317**（确定性手续费计算）；用户指定手续费会被拒绝。
- 通过熟悉的 Bitcoin RPC 接口支持**屏蔽备注（ZIP-302）**。

---

## ZECD 解决了什么问题？

`zcashd` 是 Zcash 最初的节点与钱包一体化实现——于 2016 年从 Bitcoin 的 C++ 代码库分叉而来。随着时间推移，这带来了不少摩擦：代码难以维护，钱包与节点紧密耦合，并且透明地址与屏蔽地址一起被当作一等选项呈现。

ZECD 将钱包职责从共识层中分离出来。它是一个**专用钱包层**，位于应用程序和 Zebra 完整节点之间，提供：

- 基于 librustzcash 的干净、现代 Rust 实现（与 Zodl 和 Zingo 使用同一底层库）
- 默认保护隐私的设计（除非另有配置，否则使用 Orchard 地址）
- 兼容 Bitcoin 的 RPC 接口，无需学习 Zcash 专用工具
- 适合容器化和云部署的无状态、可通过助记词恢复的架构

---

## 架构

ZECD 采用三层模型运行：

```text
你的应用 / Bitcoin RPC 客户端
        ↓  JSON-RPC
       ZECD
   （密钥、扫描、证明、RPC）
        ↓  JSON-RPC（仅本地）
       Zebra
   （完整节点——共识、内存池、链上数据）
```

ZECD **仅通过本地 JSON-RPC** 与 Zebra 通信——没有点对点网络、没有第三方索引器、也不需要 lightwalletd。Zebra 连接被刻意限制为仅本地：除非明确配置了带外安全隧道（例如 WireGuard 或 SSH），否则 ZECD 会拒绝将凭据发送到具有全局可路由地址的主机。

---

## 主要特性

### 以屏蔽为先，默认使用 Orchard

ZECD 默认使用 Orchard Unified Addresses 作为地址类型。Sapling 和透明地址（t-address）资金池需要为每个钱包单独显式配置。这种设计降低了意外发送透明交易的风险——这是旧版 Zcash 工具中常见的隐私陷阱。

隐私策略可按单次调用配置，也可在 `[spend] privacy_policy` 中全局配置：

| 策略 | 行为 |
|--------|----------|
| `AllowRevealedRecipients`（默认） | 允许发送到透明接收方；在链上暴露金额和接收方 |
| `AllowRevealedAmounts` | 允许跨资金池发送（Sapling↔Orchard），但拒绝透明接收方 |
| `FullPrivacy` | 仅允许同一资金池内的完全屏蔽发送；拒绝透明接收方和跨资金池发送 |
| `AllowFullyTransparent` | 还允许使用透明 UTXO 资金进行 t→t 发送 |

### 兼容 Bitcoin Core RPC

ZECD 实现了 Bitcoin Core 的 JSON-RPC 方言，并在以下方面保持一致性：

- 方法名称（例如 `getblockchaininfo`、`getbalance`、`getnewaddress`、`listtransactions`、`sendtoaddress`、`sendmany`）
- 响应中的字段名称和类型
- JSON-RPC 1.0 封装结构
- Basic auth、`rpcauth` 条目以及 cookie 文件认证
- 错误代码和 HTTP 状态映射（带错误主体的 HTTP 500、401 语义）

这意味着，许多现有的 Bitcoin 支付库、交易所集成和监控工具，只需做很少甚至无需代码修改，就可以通过 ZECD 与 Zcash 交互。

一致性测试套件（140+ 项检查）会在每个 PR 上针对一个在线 regtest 守护进程运行，并且也已在公共 testnet 上完成验证。

### 屏蔽备注（ZIP-302）

ZECD 通过熟悉的 Bitcoin RPC 接口暴露了 Zcash 的屏蔽备注功能——这是标准 Bitcoin 工具所不具备的：

- `sendtoaddress` 接受一个可选的十六进制 memo 作为额外的尾部参数（最多 512 字节；对于透明接收方会被拒绝）
- 来自 `listtransactions` 和 `gettransaction` 的交易历史条目，在输出包含备注时会带有 `memo`（十六进制）和 `memoStr`（解码文本）字段
- 支持向屏蔽接收方发送零金额交易，用于仅备注场景（即 `z_sendmany` 的 “memo-only-send” 模式）

这使 ZECD 非常适合那些既需要支付，又需要私密链上消息功能的应用。

### 按设计无状态

ZECD **不会持久化任何无法通过仅凭助记词恢复而重建的链下状态**。钱包数据库（`data.sqlite`）完全可以从助记词推导出来——屏蔽资金可无条件恢复；透明资金可恢复至已配置的 gap limit 范围内。

要从助记词恢复钱包：

```sh
zecd init --restore --birthday <block-height>
```

这使得数据目录成为**可丢弃**的：一个没有持久卷的容器，如果每次启动都从助记词重建，也不会丢失任何关键内容。运营者需要自行跟踪他们发出的地址——ZECD 只会记住那些已经在链上收到资金的地址。

标签功能被有意省略。由于标签没有链上来源，也无法从助记词中重建，因此 ZECD 干脆不支持标签。调用标签相关方法会返回 `method-not-found` 错误（`-32601`）。

### 不依赖 lightwalletd

ZECD 直接从 Zebra 的 JSON-RPC 中获取 compact block、树状态和内存池可见性。无需部署或维护 lightwalletd——从而降低自托管部署的运维复杂度。

### 云原生与容器化部署

ZECD 的无状态架构专为 Docker 和 Kubernetes 环境设计：

- 代码仓库中提供完整的 Docker Compose 栈（`zebra → zecd`）
- 在端口 `9233` 上提供健康检查端点，并可配置就绪探针（`synced` 或 `connected`）
- 支持结构化 JSON 日志，便于日志聚合流水线使用
- ZIP-317 确定性手续费——无需手续费预言机，也无需手动配置手续费
- `bootstrap_from_keys`（默认开启）：当 `keys.toml` 旁边是空数据目录时，会在启动时自动重建钱包——只需挂载一个 Secret，并配合空 PVC 启动即可部署

---

## 托管模型

ZECD 支持三种密钥托管模型，适用于不同的部署和安全需求：

### 1. 未加密（默认——自动解锁）

`keys.toml` 中的种子助记词会封装到一个**age identity 文件**（`identity.txt`）中。默认 `auto_unlock = true` 时，种子会在启动时解密到内存中，因此发送操作可无人值守执行，无需调用 `walletpassphrase`。

最适合：自动化支付处理器、交易所热钱包、开发环境。

```sh
zecd init --datadir ./data --wallet default --account-name primary
```

> 在主网上，请将 `identity.txt` 存放在数据目录**之外**——任何同时读取这两个文件的人都拥有支配资金的权限。

### 2. 已加密（口令保护）

助记词通过口令（age scrypt）封装，而不是使用 identity 文件。钱包启动时处于锁定状态；`walletpassphrase "<pass>" <timeout>` 会将其解锁指定时长，并在超时后自动重新锁定——这与 Bitcoin Core 的加密钱包行为一致。

最适合：不需要无人值守支配资金权限的热钱包；交互式运维流程。

```sh
zecd init --datadir ./data --encrypt
# later: walletpassphrase "my-passphrase" 300
```

### 3. 仅观察（UFVK——无支出密钥）

使用从另一个钱包导出的 Unified Full Viewing Key（UFVK）进行初始化。可以接收、扫描并报告余额——但不能签名交易。非常适合与签名钱包分离的监控、开票或审计节点。

```sh
# On the signing wallet's host:
zecd export-ufvk

# On the watch-only host:
zecd init --datadir ./data-watch --ufvk "uview1..." --birthday <height>
```

---

## 备份与恢复

资金可以仅通过**助记词**恢复。其他所有内容都只是缓存。

| 项目 | 位置 | 它保护什么 | 需要备份？ |
|----------|----------|-----------------|----------|
| **24 个单词的助记词** | 在 `zecd init` 时显示一次 | 资金本身——丢失即永久丢失 | **是——离线保存（纸张/HSM）** |
| `keys.toml` | `<wallet dir>/keys.toml` | 加密的种子 + birthday + 网络 | **是——作为 Secret 备份** |
| `identity.txt` | `[keys] age_identity` | 用于解密 `keys.toml`（支配资金权限） | **是——与 `keys.toml` 分开备份** |
| Birthday 高度 | 位于 `keys.toml` 内 | 加快恢复速度（任意早于首笔交易的高度都可以） | 与助记词一起记录 |
| `data.sqlite` | `<wallet dir>/data.sqlite` | 钱包缓存——恢复时可从种子重建 | 否——可丢弃 |
| `blocks/` | `<wallet dir>/blocks/` | Compact block 缓存 | 否——不要分发；可能会变得很大 |
| `.cookie` | `<datadir>/.cookie` | 临时 RPC cookie | 否——启动时重新生成 |

> **数据目录必须位于主机本地。** ZECD 的单实例锁（`<datadir>/.lock`）是操作系统级建议锁——它不跨主机生效。绝不要在多台机器之间以读写方式共享同一个数据目录（如 NFS、Kubernetes `ReadWriteMany`）——两个 ZECD 实例会破坏钱包数据库。在 Kubernetes 中请使用 `ReadWriteOnce` 卷。

---

## RPC 方法白名单

对于凭据泄露可能造成灾难性后果的部署场景，ZECD 支持将 RPC 接口限制为一组选定的方法：

```toml
[rpc]
allowed_methods = ["getblockchaininfo", "getbalance", "getnewaddress", "listtransactions"]
```

任何不在列表中的方法都会返回 `-32601`（HTTP 404）——这与一个根本不存在的方法无法区分，因此一个锁定后的服务器不会透露自己禁用了哪些功能。一个仅接收入账的开票服务可以禁用 `sendtoaddress`、`sendmany` 和 `stop`，从而将客户端被攻陷后的影响范围降到最低。

---

## 与 Bitcoin Core RPC 的关键差异

从 Bitcoin 或 zcashd 工具迁移过来的开发者应注意以下这些有意为之的差异：

| 行为 | Bitcoin Core | ZECD |
|----------|-------------|------|
| 地址格式 | `1...` / `bc1...` | `u1...`（Orchard Unified Address）——不能被依赖字符串解析的客户端当作 Bitcoin 地址解析 |
| 标签 | 完整标签存储 | 未实现——`setlabel`、`listlabels` 等返回 `-32601` |
| 手续费 | 用户可设置；手续费市场 | 仅支持 ZIP-317 确定性手续费；`settxfee`、`fee_rate`、`subtractfeefromamount` 会以 `-8` 被拒绝 |
| 备注 | 不支持 | `sendtoaddress` 接受十六进制 memo；历史记录包含 `memo` + `memoStr` 字段 |
| 可用于支出的确认数 | 1 | 3（自己的找零）/ 10（第三方）——可通过 `trusted_confirmations` / `untrusted_confirmations` 配置 |
| 重组时的 `listsinceblock` | 回溯到分叉点 | 如果游标所在区块因重组被移除，则返回 `-5`（Block not found）——请通过不带参数的调用重新建立基线 |
| `sendmany` 中重复接收方 | 错误 | 在 ZECD 看到之前，JSON 解析器就会折叠重复项（最后一个生效）——不要将同一地址列出两次 |
| 初始同步期间的余额 | 阻塞或预热中 | 提供部分余额——自动化流程应以 `GET /readyz` 为门控（在完全同步且增强待处理队列清空前返回 503） |
| `getbalance` 中的 `minconf 0` | 0 确认余额 | 实际按 1 提供——未打包进区块的屏蔽 note 永远不可支配 |

---

## 快速开始

**前提条件：** 本地运行 Zebra，且 `rpc.listen_addr = 127.0.0.1:18234`（testnet）。

从 crates.io 安装（0.4.3+）：

```sh
cargo install zecd
```

或从源码构建：

```sh
git clone https://github.com/zecrocks/zecd && cd zecd
cargo build --release
```

```sh
# 1. 初始化一个 testnet 钱包（生成 24 词助记词和一个账户）
zecd --datadir ./data --testnet init --wallet default --account-name primary

# 2. 启动守护进程（后台同步，在 18232 端口提供 JSON-RPC）
zecd --datadir ./data --testnet \
    --rpcuser zec --rpcpassword secret --rpcbind 127.0.0.1 --rpcport 18232
```

**通过 curl 交互：**

```sh
curl -s --user zec:secret --data-binary \
  '{"jsonrpc":"1.0","id":"1","method":"getblockchaininfo","params":[]}' \
  -H 'content-type: text/plain;' http://127.0.0.1:18232/
```

**通过 Python 交互（使用 Bitcoin RPC 库）：**

```python
from bitcoinrpc.authproxy import AuthServiceProxy
rpc = AuthServiceProxy("http://zec:secret@127.0.0.1:18232")
print(rpc.getblockchaininfo())
addr = rpc.getnewaddress()          # 返回一个 u1... Orchard Unified Address
print(rpc.getbalance())
print(rpc.listtransactions("*", 20))

# 发送并附带屏蔽备注
rpc.sendtoaddress(addr, 0.001, "", "", False, "48656c6c6f205a6563617368")  # hex memo
```

**从助记词恢复：**

```sh
zecd --datadir ./data init --restore --birthday 2500000
# 按提示粘贴你的 24 词助记词
```

---

## 默认端口

| 网络 | ZECD RPC | Zebra RPC（后端） | 健康检查 |
|---------|----------|---------------------|--------|
| Mainnet | 8232 | 8234 | 9233 |
| Testnet | 18232 | 18234 | 9233 |

---

## ZECD vs. zcashd vs. Zaino

| | zcashd | Zaino | ZECD |
|--|--------|-------|------|
| 角色 | 完整节点 + 钱包 | 索引器（替代 lightwalletd） | 仅钱包服务器 |
| 语言 | C++ | Rust | Rust |
| 状态 | 已弃用 | 活跃 | 活跃（v0.5.0-rc3，2026 年 7 月） |
| 默认资金池 | 透明 | N/A | Orchard（屏蔽） |
| RPC 方言 | zcashd 专用 | gRPC（lightwalletd） | Bitcoin Core JSON-RPC |
| 是否需要完整节点 | 是（自身） | Zebra 或 zcashd | Zebra |
| 无状态恢复 | 否 | N/A | 是（仅凭种子） |
| 屏蔽备注 | 是（`z_sendmany`） | N/A | 是（Bitcoin RPC 接口） |
| 仅观察（UFVK） | 是 | 是 | 是 |
| 云原生 | 否 | 部分支持 | 是 |
| 安装 | 构建/二进制 | 构建 | `cargo install zecd` |

---

## 相关页面

- [Zebra 完整节点](Zebra_Full_Node.md) — ZECD 所连接的完整节点
- [Zaino 索引器](Zaino.md) — 替代索引器方案（替代 lightwalletd）
- [Zakura 节点](Zakura_Node.md) — 另一种完整节点实现（Zebra 的分叉）
- [Viewing Keys](Viewing_Keys.md) — ZECD 如何使用账户 viewing key 扫描区块链
- [钱包](/using-zcash/wallets) — 钱包生态概览

## 资源

- [ZECD GitHub（zecrocks/zecd）](https://github.com/zecrocks/zecd)
- [ZECD 运维手册](https://github.com/zecrocks/zecd/blob/main/docs/OPERATIONS.md)
- [zec.rocks](https://zec.rocks)
- [librustzcash — Zcash 核心密码学库](https://github.com/zcash/librustzcash)
- [ZIP-317：按比例转账手续费机制](https://zips.z.cash/zip-0317)
- [ZIP-302：屏蔽备注](https://zips.z.cash/zip-0302)
- [Zodl 钱包（兼容 librustzcash）](https://github.com/zodl-inc/zodl-ios)
