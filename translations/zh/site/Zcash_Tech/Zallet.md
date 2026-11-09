<a href="https://github.com/zechub/zechub/edit/main/site/Zcash_Tech/Zallet.md" target="_blank">
  <img src="https://img.shields.io/badge/Edit-blue" alt="Edit Page"/>
</a>

# Zallet

Zallet 是一个使用 Rust 编写的全节点 [full-node] Zcash 钱包 [wallet]。它取代了过去嵌入在 `zcashd` 中的钱包。在 `zcashd` 于 2026 年 7 月 18 日在区块 [block] 高度 3417100 达到其停止支持状态后，共识 [consensus] 和钱包职责被拆分：**Zebra** 或 **Zakura** 验证链 [chain]，而 **Zallet** 持有密钥、扫描 note，并提供钱包 JSON-RPC。

Zallet 目前处于 **beta** 阶段。它尚未经过完整审查。破坏性变更可能要求删除并重新创建钱包。未阅读 [The Zallet Book](https://zcash.github.io/zallet/) 中的安全警告前，请勿将其视为适合大额 ZEC 的生产级托管 [custody] 方案。

---

## TL;DR

- Zallet 是一个**全节点 RPC 钱包**，不是移动端轻客户端 [light client] 钱包，也不是共识节点。
- 它取代了 `zcashd` 的钱包部分。节点部分是 [Zebra](Zebra_Full_Node.md) 或 [Zakura](Zakura_Node.md)。
- 使用 **Rust** 编写，采用 MIT / Apache-2.0 双许可证，在 [zcash/zallet](https://github.com/zcash/zallet) 中维护。
- 截至 2026 年 8 月下旬，最新发布版本为：**v0.1.0-beta.3**。
- 通过两种后端之一与链数据通信：**zebra-state**（针对本地 `zebrad` 的直接 `ReadStateService`）或 **Zaino**。
- 提供兼容 **zcashd** 的 JSON-RPC 子集。部分方法已变更；部分方法被有意省略。
- 密钥材料始终使用 **age** 加密 [encryption]。交易历史、地址 [address] 和 viewing key 以明文形式存放在 `wallet.db` 中。
- 一个已签名归档中包含三个二进制文件：`zallet`（启动器）、`zallet-zebra` 和 `zallet-zaino`。
- 官方文档：[The Zallet Book](https://zcash.github.io/zallet/)。

---

## 为什么 Zallet 存在

`zcashd` 将源自 Bitcoin Core 的共识节点和钱包捆绑在同一进程中。该设计已不复存在。

| 角色 | 旧技术栈 | 当前技术栈 |
|------|-----------|---------------|
| 共识 / P2P | `zcashd` | Zebra（`zebrad`）或 Zakura |
| 钱包 / 密钥 / 余额 | `zcashd` `wallet.dat` | **Zallet**（`wallet.db`） |
| 轻客户端索引器 | `lightwalletd` | Zaino 或 `lightwalletd` |

将钱包从节点中拆分出来意味着：

- 无需迁移密钥即可替换节点软件（Zebra 与 Zakura）。
- 钱包扫描和花费权限位于可单独加固的进程中。
- RPC 语义可演进至 ZIP 32 账户、统一地址和 PCZT，而不必继续受限于 `zcashd` 的特性。

Zallet 面向此前将 `zcashd` 用作热钱包、交易所后端、水龙头 [faucet] 或挖矿 [mining] 支付钱包的运营者。

---

## 状态

Zallet 处于 **beta** 阶段。

这在实践中意味着：

- 任何 beta 版本都可能引入破坏性变更。你可能必须删除数据目录并重新开始。
- 并非所有 `zcashd` 钱包 RPC 都已移植。
- 某些已移植方法的语义与 `zcashd` 不同。集成方必须阅读 [已变更语义页面](https://zcash.github.io/zallet/zcashd/json_rpc.html)。
- 这些 crate 正在开发中，尚未经过完整审查。
- Zallet **不是** Rust 库。如果你依赖它作为库使用，则不提供任何保证。

反馈请提交至 [GitHub issues](https://github.com/zcash/zallet/issues/new)，或发送至 [Zcash R&D Discord](https://discord.gg/xpzPR53xtU) 上的 `#wallet-dev` 频道。

一旦具备预期的 RPC 接口，计划进入后续稳定阶段。届时，调用方应迁移至 Zallet 的方法，包括已记录的语义差异。

---

## 架构

Zallet 被拆分为三个 Cargo 工作区，以便两个链后端可跟踪不同的依赖关系图。

```
zallet            launcher: reads `backend` in zallet.toml (default "zebra")
                  and execs zallet-zebra or zallet-zaino
zallet-core       shared wallet: CLI, config, JSON-RPC, SQLite DB, sync
zallet-zebra      zebra-state backend (ReadStateService + Zebra JSON-RPC)
zallet-zaino      Zaino indexer backend
```

所有三个二进制文件都会打开**同一个** `wallet.db`。启动器在运行时选择后端；切换时无需重新编译。

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

Zallet 是一个**全节点钱包**：它需要本地验证节点。它不是轻客户端。有关轻钱包和紧凑区块服务器，请参阅 [Zaino](Zaino.md) 和 [轻钱包节点](Lightwallet_Nodes.md)。

Zcash Foundation 的 [Z3](https://github.com/ZcashFoundation/z3) compose 技术栈会将 Zebra 与 Zallet 一同运行，并可选择为外部轻客户端单独运行 Zaino。

---

## 账户、地址和密钥

Zallet 围绕 ZIP 32 账户构建，而不是 `zcashd` 的单一隐式账户。

- 一个钱包可持有**多个 BIP 39 助记词**。每个助记词都是独立的花费根，由**种子指纹**（`zip32seedfp1…`）标识。
- **账户**由种子和 ZIP 32 账户索引派生。在一个 Zallet 实例内，它们还拥有本地 **UUID**。账户的可移植身份是 `(seedfp, account index)`。
- 地址是使用 `z_getaddressforaccount` 生成的 **ZIP 316 统一地址**。一个账户可拥有多个多样化地址；屏蔽 [shielded] 接收方在链上 [on-chain] 不可关联。
- 导入的花费密钥 [spending key]（`z_importkey`）和仅观察地址（`z_importaddress`）会成为不受任何助记词覆盖的 UUID 账户。
- viewing key 可被导出和导入（`z_exportviewingkey`、`z_importviewingkey`），包括统一完整 viewing key 和传入 viewing key。

`getnewaddress` 尚未实现。请使用 `z_getnewaccount` 和 `z_getaddressforaccount`。

如果启用了 `keystore.require_backup`（`zcashd` 的 `walletrequirebackup` 的迁移形式），则 Zallet 会拒绝从尚未确认备份的助记词派生新的花费权限。

---

## 加密和备份

密钥材料**始终**经过加密。不存在未加密模式，也没有 `encryptwallet` RPC——该 `zcashd` 方法从未得到完整支持。

- 设置会创建一个 **age** 身份，默认路径为 `{datadir}/encryption-identity.txt`。
- 助记词和导入的花费密钥以 age 密文形式存储在 `wallet.db` 中。
- 数据库的其余部分**未**加密。如果有人获得该文件，历史记录、地址和 viewing key 都可被读取。
- 身份可使用密码短语包装（`generate-encryption-identity -p`）。通过 `walletpassphrase` RPC 解锁；使用 `walletlock` 锁定。
- 丢失身份文件或其密码短语会导致花费密钥无法恢复。请备份身份、每个助记词，以及你保留的任何 `wallet.db` 副本（单独加密）。

在 Zallet 运行期间复制 `wallet.db` 并非安全备份。SQLite 可能发生撕裂。请优先停止进程，或等待官方在线备份命令。

---

## JSON-RPC

Zallet 通过 HTTP 和 Basic 认证实现了 `zcashd` 钱包 RPC 的一个子集。请绑定至回环地址。远程使用应通过加密隧道进行。`rpc.allow_insecure_remote_bind` 存在且不安全。

与 `zcashd` 的显著差异：

- `getwalletinfo` 上的余额字段为空。请使用 `z_getbalances`、`z_getbalanceforaccount`、`z_gettotalbalance`。
- 手续费 [fee] 遵循 **ZIP 317**。不存在 `settxfee`。
- 花费构建正迁移至 **PCZT**（部分创建的 Zcash 交易，ZIP 374）。PCZT RPC 已在 beta 系列中推出。
- 当钱包正在追赶同步进度或从重组中恢复时，全局**同步锁**会阻止余额和花费 RPC（`ClientInInitialDownload` / `ForbiddenBySafeMode`）。

有意省略的方法包括 `createrawtransaction`、`fundrawtransaction`、`getnewaddress`、`getrawchangeaddress`、`keypoolrefill`、`importwallet` 和 `encryptwallet`。替代方案列于 [Zallet Book](https://zcash.github.io/zallet/zcashd/json_rpc.html) 中。

---

## 快速开始

官方安装路径（Debian 软件包、Docker、发布二进制文件）位于 [安装指南](https://zcash.github.io/zallet/guide/installation/index.html)。发布归档名为 `zallet-<version>-<arch>.tar.gz`，并包含全部三个二进制文件。

最小化的新钱包流程：

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

将 `[indexer]` 指向本地 `zebrad` JSON-RPC 端点。zebra 后端还需要 `[indexer.read_state_service]` 和一个使用索引器功能构建的 `zebrad`，以便 Zallet 可直接读取链状态。

可复现映像可使用 [StageX](https://codeberg.org/stagex/stagex/) 构建（Docker 25+、containerd 映像存储、GNU Make）。

---

## 从 zcashd 迁移

在确认余额并测试恢复前，请保留旧 `zcashd` 数据目录。

```bash
zallet init-wallet-encryption
zallet migrate-zcash-conf --zcashd-datadir /path/to/zcashd/datadir \
  -o /path/to/zallet/datadir/zallet.toml
zallet migrate-zcashd-wallet --zcashd-datadir /path/to/zcashd/datadir
```

`migrate-zcashd-wallet` 仅存在于带有 `zcashd-import` 功能的构建中。读取 `wallet.dat` 需要来自 **Berkeley DB 6.2** 的 `db_dump`，即 `zcashd` 所使用的版本。

分步运营说明：[从 zcashd 迁移至 Zebrad/Zallet 指南](/guides/migration-guide-zcashd-to-zebrad-zallet)。

---

## Zallet 与其他软件的关系

| | Zallet | zecd | Zashi / ZODL / YWallet | Zebra / Zakura | Zaino |
|--|--------|------|------------------------|----------------|-------|
| 它是什么 | 全节点 RPC 钱包 | 屏蔽优先的钱包服务器 | 最终用户钱包 | 共识节点 | 索引器 / lightwalletd 替代方案 |
| 替代对象 | `zcashd` 钱包 | 不是可直接替换的 `zcashd` 克隆 | 移动端/桌面应用 | `zcashd` 节点 | `lightwalletd` |
| 需要本地节点 | 是 | 是（默认使用 Zebra） | 否（轻客户端） | 它*就是*节点 | 是 |
| zcashd RPC 兼容性 | 被设计为兼容路径 | 仅选择性支持小型子集 | 不适用 | 部分支持 / Zakura 兼容模式 | 不同 API |
| 托管模型 | 运营者在 `wallet.db` 中持有密钥 | 可由种子恢复的服务器 | 用户设备密钥 | 无钱包 | 无密钥 |

Zallet 和 **zecd** 都可以位于 Zebra 前端。当你需要 `z_*` 钱包接口以及从 `wallet.dat` 迁移的路径时，请选择 Zallet。当你需要一个明确*不是* `zcashd` 克隆的屏蔽优先服务器时，请选择 zecd。

在 [zallet.io](https://www.zallet.io/) 上有一个使用同名的独立消费者产品。该应用不是本项目。

---

## 相关页面

- [全节点](Full_Nodes.md) — Zebra、Zakura 以及已退役的 `zcashd` 节点
- [Zebra 全节点](Zebra_Full_Node.md) — 节点 Zallet 的默认后端读取的对象
- [Zakura 节点](Zakura_Node.md) — 替代验证节点
- [Zaino](Zaino.md) — 索引器后端和轻客户端服务器
- [zecd](ZECD.md) — 基于 librustzcash 的另一种钱包服务器设计
- [Zcash 钱包同步](Zcash_Wallet_Syncing.md) — 屏蔽钱包如何扫描链
- [Viewing Keys](Viewing_Keys.md)

## 资源

- [The Zallet Book](https://zcash.github.io/zallet/)
- [zcash/zallet on GitHub](https://github.com/zcash/zallet)
- [发布版本](https://github.com/zcash/zallet/releases)
- [JSON-RPC 已变更语义](https://zcash.github.io/zallet/zcashd/json_rpc.html)
- [ZecHub 迁移指南](/guides/migration-guide-zcashd-to-zebrad-zallet)
- [ZecHub Raspberry Pi 指南（Zebra + Zallet）](/guides/raspberry-pi-4-full-node)
- [Z3（Zebra + Zallet compose 技术栈）](https://github.com/ZcashFoundation/z3)
- [Zcash R&D Discord](https://discord.gg/xpzPR53xtU) — `#wallet-dev`
