<a href="https://github.com/zechub/zechub/edit/main/site/Zcash_Tech/Zallet.md" target="_blank">
  <img src="https://img.shields.io/badge/Edit-blue" alt="Edit Page"/>
</a>

# Zallet

Zallet 是一款用 Rust 编写的全节点 Zcash 钱包。它取代了过去嵌入在 `zcashd` 中的钱包。`zcashd` 于 2026 年 7 月 18 日在区块高度 3417100 达到停止支持状态后，共识和钱包职责被拆分：**Zebra** 或 **Zakura** 验证链，而 **Zallet** 保存密钥、扫描 notes 并提供钱包 JSON-RPC。

Zallet 目前处于 **beta** 阶段。它尚未经过全面审查。破坏性变更可能要求删除并重新创建钱包。在未阅读 [The Zallet Book](https://zcash.github.io/zallet/) 中的安全警告前，请勿将其视为适合保管大量 ZEC 的生产环境方案。

---

## TL;DR

- Zallet 是一款**全节点 RPC 钱包**，不是移动端轻钱包，也不是共识节点。
- 它取代了 `zcashd` 的钱包部分。节点部分是 [Zebra](Zebra_Full_Node.md) 或 [Zakura](Zakura_Node.md)。
- 使用 **Rust** 编写，采用 MIT / Apache-2.0 双重许可，在 [zcash/zallet](https://github.com/zcash/zallet) 中维护。
- 截至 2026 年 8 月下旬，最新发布版本为 **v0.1.0-beta.3**。
- 通过两种后端之一获取链数据：**zebra-state**（对本地 `zebrad` 进行直接 `ReadStateService`）或 **Zaino**。
- 提供兼容 **zcashd** 的 JSON-RPC 子集。部分方法已变更；部分方法被有意省略。
- 密钥材料始终使用 **age** 加密。交易历史、地址和 viewing keys 以明文形式存放在 `wallet.db` 中。
- 一个已签名归档中包含三个二进制文件：`zallet`（启动器）、`zallet-zebra` 和 `zallet-zaino`。
- 官方文档：[The Zallet Book](https://zcash.github.io/zallet/)。

---

## 为什么 Zallet 存在

`zcashd` 将源自 Bitcoin Core 的共识节点和钱包捆绑在同一个进程中。该设计现已废弃。

| 角色 | 旧栈 | 当前栈 |
|------|-----------|---------------|
| 共识 / P2P | `zcashd` | Zebra (`zebrad`) 或 Zakura |
| 钱包 / 密钥 / 余额 | `zcashd` `wallet.dat` | **Zallet** (`wallet.db`) |
| 轻客户端索引器 | `lightwalletd` | Zaino 或 `lightwalletd` |

将钱包从节点中拆分出来意味着：

- 无需迁移密钥即可更换节点软件（Zebra 与 Zakura）。
- 钱包扫描和花费权限位于可单独锁定的进程中。
- RPC 语义可以演进至 ZIP 32 账户、Unified Addresses 和 PCZTs，而不必停留在 `zcashd` 的特有行为上。

Zallet 面向此前将 `zcashd` 用作热钱包、交易所后端、水龙头或挖矿付款钱包的运营者。

---

## 状态

Zallet 处于 **beta** 阶段。

这在实践中意味着：

- 任何 beta 版本都可能引入破坏性变更。您可能必须删除数据目录并重新开始。
- 并非每个 `zcashd` 钱包 RPC 都已移植。
- 某些已移植方法的语义与 `zcashd` 不同。集成方必须阅读 [altered-semantics page](https://zcash.github.io/zallet/zcashd/json_rpc.html)。
- 这些 crates 仍在开发中，尚未经过全面审查。
- Zallet **不是** Rust 库。若将其作为库依赖，则不提供任何保证。

反馈请提交至 [GitHub issues](https://github.com/zcash/zallet/issues/new)，或发送到 [Zcash R&D Discord](https://discord.gg/xpzPR53xtU) 上的 `#wallet-dev` 频道。

一旦具备预期的 RPC 接口，将计划进入后续稳定阶段。届时，调用方应迁移至 Zallet 的方法，包括已记录的语义差异。

---

## 架构

Zallet 被拆分为三个 Cargo 工作区，以便两个链后端能够跟踪不同的依赖关系图。

```
zallet            launcher: reads `backend` in zallet.toml (default "zebra")
                  and execs zallet-zebra or zallet-zaino
zallet-core       shared wallet: CLI, config, JSON-RPC, SQLite DB, sync
zallet-zebra      zebra-state backend (ReadStateService + Zebra JSON-RPC)
zallet-zaino      Zaino indexer backend
```

三个二进制文件均打开**同一个** `wallet.db`。启动器在运行时选择后端；切换时无需重新编译。

典型部署：

```
zebrad  (or Zakura)
   │  JSON-RPC / ReadStateService
   ▼
Zallet  (zallet-zebra or zallet-zaino)
   │  JSON-RPC on 127.0.0.1
   ▼
Your application, exchange, faucet, or operator scripts
```

Zallet 是一款**全节点钱包**：它需要本地验证节点。它不是轻客户端。有关轻钱包和紧凑区块服务器，请参阅 [Zaino](Zaino.md) 和 [Lightwallet Nodes](Lightwallet_Nodes.md)。

Zcash Foundation 的 [Z3](https://github.com/ZcashFoundation/z3) compose 栈会将 Zebra 和 Zallet 一起运行，并可选择运行独立的 Zaino 以供外部轻客户端使用。

---

## 账户、地址和密钥

Zallet 围绕 ZIP 32 账户构建，而非 `zcashd` 的单一隐式账户。

- 一个钱包可以保存**多个 BIP 39 助记词**。每个助记词均是独立的花费根，由**种子指纹**（`zip32seedfp1…`）标识。
- **账户**由种子和 ZIP 32 账户索引派生而来。在同一 Zallet 实例内，它们还拥有本地 **UUID**。账户的可移植身份是 `(seedfp, account index)`。
- 地址是使用 `z_getaddressforaccount` 生成的**ZIP 316 Unified Addresses**。一个账户可拥有多个多样化地址；屏蔽接收器在链上不可关联。
- 导入的花费密钥（`z_importkey`）和仅监视地址（`z_importaddress`）会成为不受任何助记词覆盖的 UUID 账户。
- Viewing keys 可以导出和导入（`z_exportviewingkey`、`z_importviewingkey`），包括 unified full viewing keys 和 incoming viewing keys。

`getnewaddress` 尚未实现。请使用 `z_getnewaccount` 和 `z_getaddressforaccount`。

若启用了 `keystore.require_backup`（`zcashd` 的 `walletrequirebackup` 的迁移形式），Zallet 会拒绝从尚未确认备份的助记词派生新的花费权限。

---

## 加密和备份

密钥材料**始终**经过加密。不存在未加密模式，也没有 `encryptwallet` RPC——该 `zcashd` 方法从未得到完整支持。

- 设置时会创建一个 **age** identity，默认路径为 `{datadir}/encryption-identity.txt`。
- 助记词和导入的花费密钥以 age 密文形式存储在 `wallet.db` 中。
- 数据库其余部分**未**加密。若有人取得该文件，即可读取历史记录、地址和 viewing keys。
- identity 可以由口令包装（`generate-encryption-identity -p`）。使用 `walletpassphrase` RPC 解锁；使用 `walletlock` 锁定。
- 丢失 identity 文件或其口令会导致花费密钥无法恢复。请备份 identity、每个助记词，以及您保留的任何 `wallet.db` 副本（单独加密）。

在 Zallet 运行时复制 `wallet.db` 并非安全备份。SQLite 可能发生撕裂。请优先在进程停止后操作，或等待官方在线备份命令。

---

## JSON-RPC

Zallet 通过 HTTP 和 Basic auth 实现 `zcashd` 钱包 RPC 的一个子集。请绑定至回环地址。远程使用应通过加密隧道进行。`rpc.allow_insecure_remote_bind` 存在但不安全。

与 `zcashd` 的显著差异：

- `getwalletinfo` 中的余额字段为空。请使用 `z_getbalances`、`z_getbalanceforaccount`、`z_gettotalbalance`。
- 费用遵循 **ZIP 317**。没有 `settxfee`。
- 花费构造正迁移至 **PCZTs**（部分创建的 Zcash 交易，ZIP 374）。PCZT RPC 已在 beta 系列中推出。
- 当钱包正在追赶进度或从 reorg 中恢复时，全局**同步锁**会阻止余额和花费 RPC（`ClientInInitialDownload` / `ForbiddenBySafeMode`）。

有意省略的方法包括 `createrawtransaction`、`fundrawtransaction`、`getnewaddress`、`getrawchangeaddress`、`keypoolrefill`、`importwallet` 和 `encryptwallet`。替代方案列于 [Zallet Book](https://zcash.github.io/zallet/zcashd/json_rpc.html) 中。

---

## 入门指南

官方安装方式（Debian 软件包、Docker、发布二进制文件）见 [installation guide](https://zcash.github.io/zallet/guide/installation/index.html)。发布归档命名为 `zallet-<version>-<arch>.tar.gz`，并包含全部三个二进制文件。

最简新钱包流程：

```bash
# data directory; default is $HOME/.zallet
zallet -d /path/to/zallet/datadir example-config > /path/to/zallet/datadir/zallet.toml
# edit zallet.toml: network, backend, indexer / read-state, rpc.bind

zallet -d /path/to/zallet/datadir generate-encryption-identity
zallet -d /path/to/zallet/datadir init-wallet-encryption
zallet -d /path/to/zallet/datadir generate-mnemonic
zallet -d /path/to/zallet/datadir confirm-backup
zallet -d /path/to/zallet/datadir start
```

将 `[indexer]` 指向本地 `zebrad` JSON-RPC 端点。zebra 后端还需要 `[indexer.read_state_service]` 以及一个启用了索引器功能构建的 `zebrad`，以便 Zallet 能够直接读取链状态。

可复现镜像可通过 [StageX](https://codeberg.org/stagex/stagex/) 构建（Docker 25+、containerd 镜像存储、GNU Make）。

---

## 从 zcashd 迁移

在确认余额并测试恢复之前，请保留旧的 `zcashd` 数据目录。

```bash
zallet init-wallet-encryption
zallet migrate-zcash-conf --zcashd-datadir /path/to/zcashd/datadir \
  -o /path/to/zallet/datadir/zallet.toml
zallet migrate-zcashd-wallet --zcashd-datadir /path/to/zcashd/datadir
```

`migrate-zcashd-wallet` 仅存在于启用了 `zcashd-import` 功能的构建中。读取 `wallet.dat` 需要来自 **Berkeley DB 6.2** 的 `db_dump`，这是 `zcashd` 使用的版本。

分步运营者说明：[Migration Guide: zcashd to Zebrad/Zallet](/guides/migration-guide-zcashd-to-zebrad-zallet)。

---

## Zallet 与其他软件的关系

| | Zallet | zecd | Zashi / ZODL / YWallet | Zebra / Zakura | Zaino |
|--|--------|------|------------------------|----------------|-------|
| 它是什么 | 全节点 RPC 钱包 | 屏蔽优先的钱包服务器 | 终端用户钱包 | 共识节点 | 索引器 / lightwalletd 替代品 |
| 替代对象 | `zcashd` 钱包 | 不是可直接替换的 `zcashd` 克隆 | 移动端/桌面端应用 | `zcashd` 节点 | `lightwalletd` |
| 需要本地节点 | 是 | 是（默认使用 Zebra） | 否（轻客户端） | 它就是节点 | 是 |
| zcashd RPC 兼容性 | 被设计为兼容路径 | 仅少量精选子集 | 不适用 | 部分兼容 / Zakura 兼容模式 | 不同 API |
| 托管模型 | 运营者在 `wallet.db` 中持有密钥 | 可由种子恢复的服务器 | 用户设备密钥 | 无钱包 | 无密钥 |

Zallet 和 **zecd** 都可以部署在 Zebra 前方。当您需要 `z_*` 钱包接口以及从 `wallet.dat` 迁移的路径时，选择 Zallet。当您需要一个明确**不是** `zcashd` 克隆的屏蔽优先服务器时，选择 zecd。

在 [zallet.io](https://www.zallet.io/) 上有一款使用相同名称的独立消费者产品。该应用并非此项目。

---

## 相关页面

- [Full Nodes](Full_Nodes.md) — Zebra、Zakura 和已退役的 `zcashd` 节点
- [Zebra Full Node](Zebra_Full_Node.md) — 节点 Zallet 的默认后端所读取的节点
- [Zakura Node](Zakura_Node.md) — 替代验证节点
- [Zaino](Zaino.md) — 索引器后端和轻客户端服务器
- [ZECD](ZECD.md) — 基于 librustzcash 的另一种钱包服务器设计
- [Zcash Wallet Syncing](Zcash_Wallet_Syncing.md) — 屏蔽钱包如何扫描链
- [Viewing Keys](Viewing_Keys.md)

## 资源

- [The Zallet Book](https://zcash.github.io/zallet/)
- [GitHub 上的 zcash/zallet](https://github.com/zcash/zallet)
- [发布版本](https://github.com/zcash/zallet/releases)
- [JSON-RPC 变更后的语义](https://zcash.github.io/zallet/zcashd/json_rpc.html)
- [ZecHub 迁移指南](/guides/migration-guide-zcashd-to-zebrad-zallet)
- [ZecHub Raspberry Pi 指南（Zebra + Zallet）](/guides/raspberry-pi-4-full-node)
- [Z3（Zebra + Zallet compose 栈）](https://github.com/ZcashFoundation/z3)
- [Zcash R&D Discord](https://discord.gg/xpzPR53xtU) — `#wallet-dev`
