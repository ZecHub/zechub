<a href="https://github.com/zechub/zechub/edit/main/site/Zcash_Tech/Viewing_Keys.md" target="_blank">
  <img src="https://img.shields.io/badge/Edit-blue" alt="编辑页面"/>
</a>

# Viewing Keys

屏蔽地址让您可以在 Zcash blockchain 上进行交易，同时尽可能少地暴露信息。那么，当您*确实*需要向特定方展示您持有什么或发送了什么时，会发生什么？viewing key 授予读取权限，但不授予花费能力。Sprout 已有 viewing key；Sapling 增加了诸如检测已接收的 note 是否已被花费等功能。[ZIP 310](https://zips.z.cash/zip-0310) 是一份记录 Sapling viewing key 安全属性的信息性草案，而非引入 viewing key 的升级。

Viewing key 是用于选择性披露的工具：您可以选择谁能看到什么，并且无需交出花费权限。

## TL;DR

Viewing key 授予对屏蔽 Zcash 地址或账户活动的**只读**访问权限：持有者可以查看传入交易（以及对于完整 viewing key 而言的传出交易），但永远无法花费。

- **它是什么：** 屏蔽池的选择性披露工具，其功能因 pool 和密钥类型而异。[ZIP 310](https://zips.z.cash/zip-0310) 记录了 Sapling 完整 viewing key 会揭示什么，以及哪些信息是保证、未经验证、未定义或未披露的。
- **它授予什么：** 检测存款（`uivk…` 传入密钥），或查看账户完整的传入/传出记录（`uview…` 统一完整 viewing keys），以及旧版 Sapling `zxviews…` 密钥。
- **它不授予什么：** 花费权限。Viewing key 持有者所做的任何事情都无法转移资金。
- **目前适用范围：** 在 [Zallet](https://github.com/zcash/zallet)（v0.1.0-beta.2+、`z_exportviewingkey` / `z_importviewingkey`）中导出/导入，以及在诸如 Zkool 等钱包中使用仅监视账户；请参阅 [钱包](/using-zcash/wallets) 页面了解当前支持矩阵。
- **经验法则：** 优先使用能够回答所提问题的最小范围密钥，并记住，交出的密钥无法撤回——只能通过转移资金而使其失效。

---

## 为什么使用 viewing key？

Electric Coin Company 对该主题的文章列出了最常见的情形，而这些情形至今仍然常见：

- **交易所监控存款。** 交易所将传入 viewing key 加载到面向互联网的检测节点上，以便发现客户向屏蔽地址存入的资金，而花费密钥则保留在从不接触网络的硬件上。
- **托管方证明其持仓。** 托管方向审计师提供每个屏蔽地址的完整 viewing key。审计师可以检查这些余额并审查这些地址的历史传入和传出活动，但无法执行其他操作。
- **对交易对手开展尽职调查。** 当交易所需要在强化尽职调查中审查客户的屏蔽历史时，它可以索取 viewing key，而不是索取资金。

## Viewing key 会揭示什么，以及不会揭示什么

密钥不止一种，差异决定了您会泄露多少信息。

| 密钥 | 前缀 | 授予权限 |
|---|---|---|
| 统一完整 viewing key（UFVK） | `uview…` | 查看账户中每个 pool 的传入**和**传出交易 |
| 统一传入 viewing key（UIVK） | `uivk…` | 仅查看账户中每个 pool 的传入交易 |
| Sapling 扩展完整 viewing key | `zxviews…` | 查看该密钥地址的传入和传出 Sapling 活动 |

这些密钥均无法花费。它们在关键意义上都是永久性的：您交出的密钥无法撤回，只能通过将资金转移到对方不持有其密钥的账户来使其失效。

在分享任何内容之前，有两个披露陷阱值得了解。

**传入并不意味着范围狭窄。** 统一传入 viewing key 的范围覆盖整个账户，而非您被问及的某一个地址。即使为单个 Sapling 地址导出 UIVK，它仍会授予该账户每个 pool 的传入可见性，因此披露的信息多于其所命名的地址。[Zallet Book](https://zcash.github.io/zallet/zcashd/json_rpc.html) 明确说明了这一点。

**已公开的地址已将其传入 viewing key 暴露给未来的攻击者。** [ZIP 326](https://zips.z.cash/zip-0326) 指出，拥有量子计算机的攻击者可以从已公开的多样化地址恢复传入 viewing key，而这在可行性上不同于恢复 nullifier key。如今公开地址并不等同于公开 viewing key，但在足够长的时间范围内，两者的距离会更近。

## Ironwood 之后的 viewing keys

NU6.3 引入了 Ironwood 屏蔽池，并使 Orchard pool 仅可花费，因此资金会随着时间从一个迁移到另一个。有关升级本身，请参阅 [Ironwood](/zcash-tech/ironwood) 和 [The turnstile](/zcash-tech/the-turnstile)。

**在 Ironwood 之前签发的 viewing key 在迁移后仍然有效。** ZIP 326 规定，接收器及其对应的传入 viewing key 的范围是 Orchard *协议*，而不是某个 pool：同一个传入 viewing key 可以试解密 Orchard-pool 和 Ironwood-pool 的 note 密文。Zallet 以这种方式实现，将 Ironwood notes 描述为 Orchard 形态，并在 Ironwood note 加密域下，使用账户的 Orchard viewing keys 进行试解密。

持有或签发密钥的任何人都应注意以下三个后果：

1. **余额在 pools 之间转移，而查看者会看到这一过程。** [ZIP 318](https://zips.z.cash/zip-0318) 将迁移规定为一系列小额且刻意保持统一的 Orchard 到 Ironwood 交易，在随机化时间表上广播；每笔交易花费一个 Orchard note，并产生一个标准面额的 Ironwood 输出。通过 viewing key 监视的审计师会看到持仓在数周内逐步从一个 pool 转移至另一个，而不是一次性转移。钱包可以使用其 viewing keys 从链上数据重建自身的迁移进度。
2. **每个迁移步骤都会揭示其转移的价值。** 这本就是跨越 turnstile 的固有属性，也是迁移可审计的原因。将余额拆分为标准面额意味着没有任何一笔交易会揭示整个 Orchard-pool 余额。
3. **在 Ironwood 之后创建的账户可能以不同方式派生其密钥。** [ZIP 2005](https://zips.z.cash/zip-2005) 为量子可恢复密钥添加了 `use_qsk` 标志，并改变了传入、传出和 diversifier 密钥的派生方式，因此 `use_qsk = true` 密钥确实是不同的密钥。ZIP 326 要求该标志在一个账户内保持一致，并禁止在 Mainnet 上的 NU6.3 激活之前生成 `use_qsk = true` 密钥。因此，从 Ironwood 之前已存在的账户中导出的密钥是 `use_qsk = false` 密钥，并且对该账户始终正确。不要假定从一个账户导出的密钥能够描述另一个账户。

## 导出 viewing key

### Zallet

[Zallet](https://github.com/zcash/zallet) 是替代 zcashd 内置钱包的全节点钱包。Viewing key 导出和导入于 **v0.1.0-beta.2（2026 年 7 月 28 日）**推出，因此请先检查您的版本；更早的构建版本没有这些方法。方法名称后的每个参数都必须是有效 JSON，这意味着字符串值必须保留各自的双引号。[Zallet Quick Reference Guide](/using-zcash/zallet-quick-reference-guide) 涵盖了通用命令样式。

列出钱包持有的内容：

```bash
zallet rpc listaddresses
```

通过传入统一地址来导出账户的统一完整 viewing key：

```bash
zallet rpc z_exportviewingkey '"<unified address>"'
```

改为使用可选的 `ivk` 参数导出账户的统一传入 viewing key：

```bash
zallet rpc z_exportviewingkey '"<unified address>"' true
```

传入 Sapling 地址会返回该账户的 Sapling 扩展完整 viewing key（`zxviews…`），与旧版 zcashd 行为一致。有两个已记录的限制：Sprout 地址会被拒绝；而从本身作为仅监视导入的账户中无法导出 Sapling 扩展完整 viewing key，因为钱包无法重建它。`ivk` 形式可用于已导入的仅监视账户。

### 从自身界面导出 viewing keys 的钱包

[钱包](/using-zcash/wallets) 页面追踪每个钱包的 viewing key 支持情况和 Ironwood 就绪状态。截至本文撰写时，同时列出 viewing key 支持和 **Ironwood：就绪**的钱包包括 ZODL、Zingo!、Zkool、Cake、Zallet、zecd 和 Nozy。在依赖任何单一钱包之前，请查看该页面而非本页，因为就绪状态会变化。

## 将 viewing key 作为仅监视账户导入

### Zkool

[Zkool](https://github.com/hhanh00/zkool2) 是这里最灵活的选项，因为它既接受统一密钥，也接受旧版密钥。其 README 记录了通过**统一 viewing key**或**Sapling 扩展 viewing key**创建的仅监视账户，以及从 zcashd 导出的旧版屏蔽扩展密钥。添加新账户，选择仅监视路径，然后粘贴 `uview…` 或 `zxviews…` 密钥；该账户随后会同步，并在没有花费权限的情况下报告余额和历史记录。

Ironwood 协议支持以及 Orchard 到 Ironwood 的迁移在 Zkool 6.24.0（2026 年 7 月 20 日）中推出，而 6.26.1（2026 年 8 月 2 日）修复了 mempool 中的 Ironwood 交易检测。请运行 6.26.1 或更高版本。

### Zallet

```bash
zallet rpc z_importviewingkey '"<zxviews… key>"' '"whenkeyisnew"' 0
```

第二个参数是重新扫描策略：`"whenkeyisnew"`（默认值）、`"yes"` 或 `"no"`。第三个参数是开始重新扫描的区块高度。Zallet 将该密钥导入为仅监视账户，并跟踪其地址的传入和传出交易，但不授予花费权限。

**Zallet 仅导入 Sapling 扩展完整 viewing keys。** 即使它可以导出 `uview…` 统一完整 viewing key，也无法导入它。要交出对整个统一账户的读取权限，请从 Zallet 导出 UFVK，并将其导入接受统一密钥的钱包，例如 Zkool。

要将导入的密钥转换为包含 txids、手续费和备忘录的完整交易历史文件，请参阅 [从 Viewing Key](/guides/viewing-key-transaction-export) 导出交易历史记录。

## 发生了什么变化，以及不再需要寻找什么

如果您遵循了本页的旧版本或其译文，以下三种途径已不再可用。

- **`zcash-cli z_exportviewingkey` 和 `z_importviewingkey`。** zcashd 于 2026 年 7 月 18 日达到停止支持的终止状态，且不再运行。Zallet 中同名的方法是替代方案；请参阅 [迁移指南](/guides/migration-guide-zcashd-to-zebrad-zallet)。
- **Ywallet 指南。** Wallets 页面将 Ywallet 标记为**Ironwood：未就绪**，因此它并非向人们推荐用于 Ironwood 时代 viewing keys 的钱包。来自同一开发者的 Zkool 接受相同范围的密钥，并被标记为就绪。
- **zcashblockexplorer.com/vk。** 该服务返回带有无效证书的 HTTP 503，且已被弃用而非替换。将 viewing key 粘贴到网站会将您的全部交易历史交给运营该网站的人，这始终是旧页面中三种选择里最弱的一种。请改为将密钥导入您自己运行的钱包。

## 视觉化 / 类比

### 审计师的窗口

将屏蔽账户想象成银行中的一个保险库房间：

- **花费密钥**是房间钥匙。持有它的人可以打开箱子并取出内容物。
- **Viewing key**是审计师通向该房间的窗口。审计师可以观察每个箱子进出、读取标签并保存账本——但该窗口没有把手。透过窗口查看的人无法移动房间内的任何东西。

### 窗口无法展示什么

窗口面向房间，而非其外部世界。它显示被监视账户的屏蔽活动；它不会让观察者成为覆盖整个 blockchain 的观察者，也不会让观察者将该账户的活动与其他人的未屏蔽历史关联起来。而且，由于窗口安装在账户层级，即使给某人一个单独保险箱的窥视孔（一个单独地址），仍会给予其整个房间的传入视图——这正是最小范围密钥规则存在的原因。

### 为什么您无法收回窗口

Viewing key 是一段信息，而不是权限条目。一旦被复制，它会一直存在，直至资金离开它所监视的账户。实际补救措施是轮换：将余额转移到对方从未获得其密钥的新账户，旧窗口就会面对一个空房间。

## 深入探讨

### 试解密：查看实际如何运作

每笔屏蔽交易都会将其 note 明文加密给预定接收者。持有 viewing key 的钱包会进行**试解密**：对于它在链上发现的每笔交易，它都会尝试用该密钥解密 note 密文。成功时会揭示 note 的价值、接收者 diversifier 和备忘录；失败则无需付出代价。这就是为什么同一个传入 viewing key 能持续适用于 Orchard 和 Ironwood pools——[ZIP 326](https://zips.z.cash/zip-0326) 将接收器的范围定义为 Orchard *协议*，因此 Ironwood note 密文具有 Orchard 形态，并在 Ironwood note 加密域下使用账户的 Orchard viewing keys 进行试解密。

### 完整与传入：派生方式决定什么

**完整** viewing key 可以派生传出查看能力，这使审计师能够在交易被解密后重建转账的*发送者*一侧。**传入** viewing key 则刻意止步于此：它检测并解密传入 notes，但不能重建传出关联。这两种能力之间的派生是单向的——传入密钥是*从*完整密钥派生而来，绝非反向——这使得“仅传入”是一种真实的降级，而非承诺。`use_qsk` 标志来自 [ZIP 2005](https://zips.z.cash/zip-2005)，它改变派生本身，因此量子可恢复密钥完全是不同的密钥族，而不是旧密钥的变体。

### 迁移在查看者眼中的样子

由于 [ZIP 318](https://zips.z.cash/zip-0318) 迁移是一系列随机化的小额、统一的 Orchard 到 Ironwood 交易，持有密钥的查看者看到的是阶梯：许多标准面额价值的步骤，而不是一次跳跃。单个步骤不会揭示正在迁移的总余额，但*模式*可被识别——这正是可审计 turnstile 的预期权衡。

## 实际影响

- **对于交易所和支付处理商：** 将账户的传入 viewing key（或用于完整覆盖的 UFVK）加载到检测节点上，并自动核对客户存款，就像使用透明地址一样——但客户的花费密钥永远不会离开冷存储。
- **对于审计师和储备证明：** 完整 viewing key 将“请相信我们”转变为“请验证这一点”：能够查看被监视账户的余额和完整交易历史，同时完全无法触碰它们。可结合 [支付披露](/zcash-tech/payment-disclosures)，为单次支付提供一次性证明。
- **对于尽职调查：** 向交易对手提供与合作相关账户的密钥，而不是整个钱包。如果关系结束，请轮换该账户。
- **对于工具选择：** Zallet 导出 UFVK 并导入 Sapling 扩展完整 viewing keys；Zkool 接受统一和旧版密钥作为仅监视账户。在针对某个钱包制定标准之前，请查看 [钱包](/using-zcash/wallets) 页面，了解当前的 Ironwood 就绪矩阵。
- **披露的代价是永久性的：** 每多一个密钥持有者，就多出一条您无法关闭的永久隐私授信额度。请按关系签发密钥，将其范围限制在一个账户，并记录谁持有什么。

## 常见错误

| 常见看法 | 实际情况 |
| --- | --- |
| “如果 viewing key 泄露，它可以花费资金。” | 不可以。Viewing keys 不携带花费权限；泄露的最坏后果只是披露历史记录。 |
| “以后我可以撤销 viewing key。” | 不可以。交出的密钥会一直有效，直至资金被转移到对方不持有其密钥的账户。 |
| “为一个地址导出 UIVK 只会显示该地址。” | Viewing keys 的范围是账户级别。UIVK 显示账户中每个 pool 的传入活动。 |
| “`zcash-cli z_exportviewingkey` 仍然可用。” | 不可用。zcashd 于 2026 年 7 月 18 日达到停止支持的终止状态；请改用 Zallet 的 `z_exportviewingkey` / `z_importviewingkey`。 |
| “将 viewing key 粘贴到网页工具中是安全的，因为它是只读的。” | 只读仍意味着该账户的全部交易历史会交给运营网站的人。请将密钥导入您自己运行的钱包。 |
| “Zallet 可以导入 Zallet 能导出的任何 viewing key。” | 不可以。Zallet 仅导入 Sapling 扩展完整 viewing keys；统一 `uview…` 密钥必须导入接受统一密钥的钱包，例如 Zkool。 |

## 相关页面

- [支付披露](/zcash-tech/payment-disclosures) — 证明单次支付的选定细节，而不授予对账户的持续访问权限
- [统一地址](/zcash-tech/unified-addresses) — 承载 viewing-key 接收器的地址层
- [Ironwood](/zcash-tech/ironwood) — NU6.3 屏蔽池，Orchard 会迁移至其中
- [The Turnstile](/zcash-tech/the-turnstile) — 查看者可以观察的 Orchard 到 Ironwood 迁移机制
- [钱包](/using-zcash/wallets) — 钱包、viewing-key 支持和 Ironwood 就绪状态的完整目录
- [从 Viewing Key](/guides/viewing-key-transaction-export) 导出交易历史记录 — 将导入的密钥转换为完整的 txid/手续费/备忘录历史文件

## 资源

按需使用 viewing keys，并优先使用能够回答所提问题的最小范围密钥。

- [支付披露](/zcash-tech/payment-disclosures) - 证明单次支付的选定细节，而不授予对账户的持续访问权限
- [ZIP 326：NU6.3 对钱包的影响](https://zips.z.cash/zip-0326) — viewing keys 如何跨越 Orchard 和 Ironwood pools 运作
- [ZIP 229：版本 6 交易格式](https://zips.z.cash/zip-0229) — 定义 Orchard 和 Ironwood pools
- [ZIP 310](https://zips.z.cash/zip-0310) — viewing key 规范
- [Zallet 变更日志](https://github.com/zcash/zallet/blob/main/CHANGELOG.md) — 哪个版本添加了哪个 RPC 方法
- [Zkool README](https://github.com/hhanh00/zkool2/blob/main/README.md) — 支持的账户和密钥类型
- [ECC，解释 Viewing Keys](https://electriccoin.co/blog/explaining-viewing-keys/)
- [ECC，选择性披露和 Viewing Keys](https://electriccoin.co/blog/viewing-keys-selective-disclosure/)
- [ECC，Zcash Viewing Key 视频演示](https://www.youtube.com/watch?v=NXjK_Ms7D5U&t=199s)
