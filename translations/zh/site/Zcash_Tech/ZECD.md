<a href="https://github.com/zechub/zechub/edit/main/site/Zcash_Tech/ZECD.md" target="_blank">
  <img src="https://img.shields.io/badge/Edit-blue" alt="编辑页面"/>
</a>

# zecd — 屏蔽优先钱包服务器

zecd 是一款面向 Zcash 的屏蔽优先钱包服务器，构建于 [librustzcash](https://github.com/zcash/librustzcash) 之上，并通过 Bitcoin Core 的 JSON-RPC 方言提供服务。它为开发者[developers]和支付集成商提供熟悉且兼容 Bitcoin 的 API，以便与 Zcash 交互，同时将 Orchard（隐私性最高的 pool）设为默认选项。由 [zec.rocks](https://zec.rocks) 开发的 zecd，旨在现代云原生部署中替代 `zcashd` 的钱包功能。

**当前版本：**0.5.0-rc3（2026 年 7 月 13 日）— 支持 Ironwood（NU6.3）。可通过 `cargo install zecd` 安装，或使用官方 Docker 镜像。

---

## 简而言之

- zecd 是一个**钱包守护进程（服务器）**，而不是全节点[full node]。它处理密钥、扫描、证明和 RPC，但不使用 Zcash P2P 协议。
- 它使用 **Bitcoin Core 的 JSON-RPC 方言**：方法名称、字段结构、认证和错误代码均相同，许多 Bitcoin RPC 客户端可直接与 Zcash 配合使用。
- **Orchard（屏蔽）地址默认启用**；透明（t-address）和 Sapling 支持需要针对每个钱包显式选择启用。
- 它通过本地 JSON-RPC 连接至**自行托管的 [Zebra](Zebra_Full_Node.md) 全节点**，无需 lightwalletd。
- **按无状态设计**：整个钱包仅凭助记词即可恢复，使数据目录可随时丢弃。
- **并非 zcashd 的直接替代品**：它仅实现 Zcash RPC 方法的一个子集，并为隐私和安全作出有意的设计差异。
- 手续费遵循 **ZIP-317**（确定性手续费计算）；用户指定的手续费会被拒绝。
- 通过熟悉的 Bitcoin RPC 接口支持**屏蔽备忘录（ZIP-302）**。

---

## zecd 解决了什么问题？

`zcashd` 曾是 Zcash 原有的节点与钱包组合，2016 年从 Bitcoin 的 C++ 代码库分叉而来。随着时间推移，这带来了摩擦：代码难以维护，钱包与节点紧密耦合，而且透明地址与屏蔽地址一样被作为一级选项呈现。

zecd 将钱包职责与共识[consensus]分离。它是位于应用程序和 Zebra 全节点之间的**专用钱包层**，提供：

- 基于 librustzcash 构建的简洁、现代的 Rust 实现（该库也为 Zodl 和 Zingo 提供支持）
- 默认隐私设计（除非另行配置，否则使用 Orchard 地址）
- 兼容 Bitcoin 的 RPC 接口，无需学习 Zcash 专用工具
- 适用于容器化和云部署的无状态、可通过助记词恢复的架构

---

## 架构

zecd 采用三层模型运行：

```
Your app / Bitcoin RPC client
        ↓  JSON-RPC
       zecd
   (keys, scanning, proving, RPC)
        ↓  JSON-RPC (local only)
       Zebra
   (full node — consensus, mempool, chain data)
```

zecd 与 Zebra **仅通过本地 JSON-RPC** 通信，不使用点对点网络、第三方索引器或 lightwalletd。Zebra 连接被刻意限制为仅本地：除非明确配置了带外安全隧道（例如 WireGuard 或 SSH），否则 zecd 会拒绝向可全局路由的主机发送凭据。

---

## 主要功能

### 屏蔽优先，默认使用 Orchard

zecd 使用 Orchard Unified Addresses 作为默认地址类型。Sapling 和透明（t-address）pool 需要针对每个钱包进行显式配置。该设计降低了意外发送至透明地址的风险，这是较早 Zcash 工具中常见的隐私陷阱。

可针对单次调用或在 `[spend] privacy_policy` 中全局配置隐私策略：

| 策略 | 行为 |
|--------|----------|
| `AllowRevealedRecipients`（默认） | 允许向透明接收方发送；在链上暴露金额和接收方 |
| `AllowRevealedAmounts` | 允许跨 pool 发送（Sapling↔Orchard），但拒绝透明接收方 |
| `FullPrivacy` | 仅允许单一 pool 内完全屏蔽的发送；拒绝透明接收方和跨 pool 操作 |
| `AllowFullyTransparent` | 还允许由透明 UTXO 注资的 t→t 发送 |

### Bitcoin Core RPC 兼容性

zecd 实现了 Bitcoin Core 的 JSON-RPC 方言，并在以下方面保持一致：

- 方法名称（例如 `getblockchaininfo`、`getbalance`、`getnewaddress`、`listtransactions`、`sendtoaddress`、`sendmany`）
- 响应中的字段名称和类型
- JSON-RPC 1.0 信封结构
- 基本认证、`rpcauth` 条目和 cookie 文件认证
- 错误代码和 HTTP 状态映射（带错误正文的 HTTP 500、401 语义）

这意味着许多现有的 Bitcoin 支付库、交易所集成和监控工具，几乎无需改动代码即可通过 zecd 与 Zcash 交互。

一致性测试套件（140 多项检查）会针对实时 regtest 守护进程在每个 PR 上运行，并且已在公开测试网上完成验证。

### 屏蔽备忘录（ZIP-302）

zecd 通过熟悉的 Bitcoin RPC 接口公开 Zcash 的屏蔽备忘录功能，这是标准 Bitcoin 工具所不具备的：

- `sendtoaddress` 接受可选的十六进制备忘录作为额外的末尾参数（最多 512 字节；透明接收方会被拒绝）
- 来自 `listtransactions` 和 `gettransaction` 的交易历史条目，在输出携带备忘录时包含 `memo`（十六进制）和 `memoStr`（解码文本）字段
- 支持向屏蔽接收方发送零金额，用于仅备忘录的用例（`z_sendmany` 的“仅备忘录发送”模式）

这使 zecd 适用于需要在支付之外提供私密链上消息传递的应用程序。

### 按无状态设计

zecd 不会持久化**任何仅凭助记词恢复无法重建的链下状态**。钱包数据库（`data.sqlite`）完全可由助记词推导：屏蔽资金会无条件恢复；透明资金会恢复至已配置的间隔限制。

要从助记词恢复钱包：

```sh
zecd init --restore --birthday <block-height>
```

这使数据目录可以**随时丢弃**：没有持久化卷的容器每次启动时均可从助记词重建，不会丢失任何关键内容。运营人员负责追踪其分发的地址，zecd 仅在地址链上收到资金后才会记住它们。

标签被有意省略。因为标签没有链上来源，且无法从助记词重建，zecd 根本不支持它们。调用标签方法会返回 `method-not-found` 错误（`-32601`）。

### 无 lightwalletd 依赖

zecd 直接从 Zebra 的 JSON-RPC 推导紧凑区块、树状态和内存池可见性。无需运行或维护 lightwalletd，从而降低自行托管部署的运维复杂性。

### 云原生和容器化部署

zecd 的无状态架构专为 Docker 和 Kubernetes 环境设计：

- 仓库中提供完整的 Docker Compose 栈（`zebra → zecd`）
- 端口 `9233` 上的健康端点，带可配置的就绪探针（`synced` 或 `connected`）
- 用于日志聚合管道的结构化 JSON 日志选项
- ZIP-317 确定性手续费，无需手续费预言机或手动配置手续费
- `bootstrap_from_keys`（默认开启）：`keys.toml` 旁的空数据目录会在启动时自动重建钱包，只需挂载一个 Secret 并使用空 PVC 启动即可部署

---

## 托管模型

zecd 支持 3 种密钥托管模型，适合不同的部署和安全要求：

### 1. 未加密（默认 — 自动解锁）

`keys.toml` 中的助记词以**age identity 文件**（`identity.txt`）封装。使用默认的 `auto_unlock = true` 时，助记词会在启动时解密到内存中，因此发送可无人值守，且不需要调用 `walletpassphrase`。

最适合：自动化支付处理器、交易所热钱包、开发者环境。

```sh
zecd init --datadir ./data --wallet default --account-name primary
```

> 在主网上，请将 `identity.txt` 存储在数据目录**之外**，因为任何能够读取这两个文件的人都拥有支出权限。

### 2. 加密（受密码短语保护）

助记词以密码短语（age scrypt）而非 identity 文件封装。钱包以锁定状态启动；`walletpassphrase "<pass>" <timeout>` 会在指定时长内将其解锁，并在超时后自动重新锁定，行为与 Bitcoin Core 的加密钱包一致。

最适合：不需要无人值守支出权限的热钱包；交互式运营人员工作流程。

```sh
zecd init --datadir ./data --encrypt
# later: walletpassphrase "my-passphrase" 300
```

### 3. 仅观察（UFVK — 无支出密钥）

使用从另一个钱包导出的 Unified Full Viewing Key（UFVK）初始化。它可以接收、扫描和报告余额，但不能签署交易。非常适合与签名钱包分离的监控、开票或审计节点。

```sh
# On the signing wallet's host:
zecd export-ufvk

# On the watch-only host:
zecd init --datadir ./data-watch --ufvk "uview1..." --birthday <height>
```

---

## 备份和恢复

资金仅凭**助记词本身**即可恢复。其他所有内容均为缓存。

| 工件 | 位置 | 其保护的内容 | 是否备份？ |
|----------|----------|-----------------|----------|
| **24 词助记词** | 在 `zecd init` 时仅显示一次 | 资金 — 丢失即永久丢失 | **是 — 离线（纸质/HSM）** |
| `keys.toml` | `<wallet dir>/keys.toml` | 加密助记词 + birthday + 网络 | **是 — 作为 Secret** |
| `identity.txt` | `[keys] age_identity` | 解密 `keys.toml`（支出权限） | **是 — 与 `keys.toml` 分开保存** |
| Birthday 高度 | 位于 `keys.toml` 内 | 使恢复更快（首笔交易之前的任意高度） | 与助记词一同记录 |
| `data.sqlite` | `<wallet dir>/data.sqlite` | 钱包缓存 — 恢复时从助记词重建 | 否 — 可丢弃 |
| `blocks/` | `<wallet dir>/blocks/` | 紧凑区块缓存 | 否 — 切勿分发；可能很大 |
| `.cookie` | `<datadir>/.cookie` | 临时 RPC cookie | 否 — 启动时重新生成 |

> **数据目录必须位于本地主机。**zecd 的单实例锁（`<datadir>/.lock`）是操作系统建议锁，不跨主机生效。切勿在多台机器之间以读写方式共享数据目录（NFS、Kubernetes `ReadWriteMany`），否则两个 zecd 实例会损坏钱包数据库。在 Kubernetes 中使用 `ReadWriteOnce` 卷。

---

## RPC 方法白名单

对于凭据泄露将造成灾难性后果的部署，zecd 支持将 RPC 接口限制为选定的方法子集：

```toml
[rpc]
allowed_methods = ["getblockchaininfo", "getbalance", "getnewaddress", "listtransactions"]
```

任何不在列表中的方法都会返回 `-32601`（HTTP 404），与不存在的方法无法区分，因此锁定的服务器不会泄露其禁用了什么。仅接收的开票程序可禁用 `sendtoaddress`、`sendmany` 和 `stop`，以尽量减小客户端遭入侵后的影响范围。

---

## 与 Bitcoin Core RPC 的主要差异

从 Bitcoin 或 zcashd 工具迁移的开发者应了解以下有意设计的差异：

| 行为 | Bitcoin Core | zecd |
|----------|-------------|------|
| 地址格式 | `1...` / `bc1...` | `u1...`（Orchard Unified Address）— 字符串解析客户端无法将其解析为 Bitcoin 地址 |
| 标签 | 完整标签存储 | 未实现 — `setlabel`、`listlabels` 等返回 `-32601` |
| 手续费 | 用户可设置；手续费市场 | 仅 ZIP-317 确定性机制；`settxfee`、`fee_rate`、`subtractfeefromamount` 会以 `-8` 被拒绝 |
| 备忘录 | 不支持 | `sendtoaddress` 接受十六进制备忘录；历史记录包含 `memo` + `memoStr` 字段 |
| 可支出的确认数 | 1 | 3（自己的找零）/ 10（第三方）— 可通过 `trusted_confirmations` / `untrusted_confirmations` 配置 |
| 重组时的 `listsinceblock` | 回退至分叉点 | 若游标因重组而消失，则返回 `-5`（未找到区块）— 使用无参数调用重新设定基线 |
| `sendmany` 中的重复接收方 | 错误 | JSON 解析器会在 zecd 看到前折叠重复项（最后一个胜出），请勿两次列出同一地址 |
| 初始同步期间的余额 | 阻塞或预热 | 提供部分余额 — 根据 `GET /readyz` 控制自动化流程（在完全同步且增强积压清空前返回 503） |
| `getbalance` 中的 `minconf 0` | 0 确认余额 | 作为 1 提供 — 未挖矿的屏蔽 note 永远不可花费 |

---

## 快速开始

**前提条件：**本地运行的 Zebra，且使用 `rpc.listen_addr = 127.0.0.1:18234`（测试网）。

从 crates.io 安装（0.4.3+）：

```sh
cargo install zecd
```

或从源代码构建：

```sh
git clone https://github.com/zecrocks/zecd && cd zecd
cargo build --release
```

```sh
# 1. Initialize a testnet wallet (generates a 24-word mnemonic and an account)
zecd --datadir ./data --testnet init --wallet default --account-name primary

# 2. Start the daemon (syncs in background, serves JSON-RPC on port 18232)
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
addr = rpc.getnewaddress()          # returns a u1... Orchard Unified Address
print(rpc.getbalance())
print(rpc.listtransactions("*", 20))

# Send with a shielded memo
rpc.sendtoaddress(addr, 0.001, "", "", False, "48656c6c6f205a6563617368")  # hex memo
```

**从助记词恢复：**

```sh
zecd --datadir ./data init --restore --birthday 2500000
# paste your 24-word mnemonic when prompted
```

---

## 默认端口

| 网络 | zecd RPC | Zebra RPC（后端） | 健康检查 |
|---------|----------|---------------------|--------|
| 主网 | 8232 | 8234 | 9233 |
| 测试网 | 18232 | 18234 | 9233 |

---

## zecd vs. zcashd vs. Zaino

| | zcashd | Zaino | zecd |
|--|--------|-------|------|
| 角色 | 全节点 + 钱包 | 索引器（替代 lightwalletd） | 仅钱包服务器 |
| 语言 | C++ | Rust | Rust |
| 状态 | 已弃用 | 活跃 | 活跃（v0.5.0-rc3，2026 年 7 月） |
| 默认 pool | 透明 | 不适用 | Orchard（屏蔽） |
| RPC 方言 | zcashd 专用 | gRPC（lightwalletd） | Bitcoin Core JSON-RPC |
| 需要全节点 | 是（自身） | Zebra 或 zcashd | Zebra |
| 无状态恢复 | 否 | 不适用 | 是（仅助记词） |
| 屏蔽备忘录 | 是（`z_sendmany`） | 不适用 | 是（Bitcoin RPC 接口） |
| 仅观察（UFVK） | 是 | 是 | 是 |
| 云原生 | 否 | 部分 | 是 |
| 安装 | 构建/二进制文件 | 构建 | `cargo install zecd` |

---

## 相关页面

- [Zebra 全节点](Zebra_Full_Node.md) — zecd 连接的全节点
- [Zaino 索引器](Zaino.md) — 替代索引器方案（替代 lightwalletd）
- [Zakura 节点](Zakura_Node.md) — 另一种全节点实现（Zebra 的分叉）
- [Viewing Keys](Viewing_Keys.md) — zecd 如何使用账户 viewing key 扫描链
- [钱包](/using-zcash/wallets) — 钱包生态系统概览

## 资源

- [zecd GitHub（zecrocks/zecd）](https://github.com/zecrocks/zecd)
- [zecd 运维手册](https://github.com/zecrocks/zecd/blob/main/docs/OPERATIONS.md)
- [zec.rocks](https://zec.rocks)
- [librustzcash — 核心 Zcash 密码学库](https://github.com/zcash/librustzcash)
- [ZIP-317：按比例转账手续费机制](https://zips.z.cash/zip-0317)
- [ZIP-302：屏蔽备忘录](https://zips.z.cash/zip-0302)
- [Zodl 钱包（兼容 librustzcash）](https://github.com/zodl-inc/zodl-ios)
