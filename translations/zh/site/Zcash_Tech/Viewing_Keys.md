<a href="https://github.com/zechub/zechub/edit/main/site/Zcash_Tech/Viewing_Keys.md" target="_blank">
  <img src="https://img.shields.io/badge/Edit-blue" alt="Edit Page"/>
</a>

# Viewing Key

屏蔽地址让你能够进行交易，同时在 Zcash 区块链上尽可能少地泄露信息。那么，当你*确实*需要向特定一方展示你的持仓或已发送的内容时，会怎样？每个屏蔽地址都有一个 viewing key，它授予读取权限，但不授予消费能力。Viewing key 在 [ZIP 310](https://zips.z.cash/zip-0310) 中被引入，并在 Sapling 网络升级中加入协议。

Viewing key 是选择性披露的工具：你选择谁能看到什么，而无需为此交出消费权限。

## 简而言之

查看密钥授予对隐蔽 Zcash 地址或账户活动的**只读**访问权限：持有者可以查看传入交易（对于完整查看密钥，也可查看传出交易），但绝不能花费资金。

- **它是什么：** 屏蔽池的选择性披露工具。于 [ZIP 310](https://zips.z.cash/zip-0310)中引入，并在 Sapling网络升级中加入协议。
- **它授予什么：** 充值检测能力（`uivk…`传入密钥），或账户完整的收/付可见性（`uview…`统一完整查看密钥），以及旧版 Sapling `zxviews…`密钥。
- **它不授予什么：** 支出权限。查看密钥持有者的任何操作都无法转移资金。
- **它目前可在何处使用：** 可在 [Zallet](https://github.com/zcash/zallet) 中导出/导入（v0.1.0-beta.2+、`z_exportviewingkey` / `z_importviewingkey`），并可在诸如 Zkool 等钱包中使用仅监控账户；当前支持矩阵请参阅 [钱包](/using-zcash/wallets)页面。
- **经验法则：** 优先使用能够回答所问问题的最受限密钥，并记住，交付出去的密钥无法收回——只能通过转移资金使其失效。

---

## 为什么使用 viewing key？

Electric Coin Company 关于这一主题的文章列出了最常见的几种情形，而它们如今仍然很常见：

- **交易所监控充值。** 交易所在面向互联网的检测节点上加载 incoming viewing key，以便发现客户向屏蔽地址发起的充值；而消费密钥则保留在从不接触网络的硬件上。
- **托管方证明其持仓。** 托管方向审计人员提供每个屏蔽地址的 full viewing key。审计人员可以核查这些余额，并审阅这些地址的历史收付款活动，但无法进行其他操作。
- **对交易对手开展尽职调查。** 当交易所需要在强化尽职调查中审查客户的屏蔽交易历史时，可以要求提供 viewing key，而不是资金本身。

## Viewing key 会和不会披露什么

密钥不止一种，其差异决定了你会披露多少信息。

| 密钥 | 前缀 | 授予的权限 |
|---|---|---|
| Unified full viewing key (UFVK) | `uview…` | 查看账户中每个资金池的收款**和**付款交易 |
| Unified incoming viewing key (UIVK) | `uivk…` | 仅查看账户中每个资金池的收款交易 |
| Sapling extended full viewing key | `zxviews…` | 查看该密钥地址的 Sapling 收款和付款活动 |

这些密钥均不能用于消费。它们在关键意义上都是永久性的：一旦你已交出某个密钥，就无法撤回；只能将资金转移到对方不持有其密钥的账户中，让该密钥失去作用。

在分享任何内容前，有两个披露陷阱值得了解。

**Incoming 并不意味着范围狭窄。** Unified incoming viewing key 的范围是整个账户，而不是别人所询问的那个地址。即使是为单个 Sapling 地址导出 UIVK，仍会授予对该账户内每个资金池的收款可见性，因此它披露的信息多于其所标示的地址。[Zallet Book](https://zcash.github.io/zallet/zcashd/json_rpc.html) 明确说明了这一点。

**已公开的地址会向未来的攻击者暴露其 incoming viewing key。** [ZIP 326](https://zips.z.cash/zip-0326) 指出，拥有量子计算机的攻击者可以从已公开的多样化地址恢复 incoming viewing key；这在可行性上不同于恢复 nullifier key。如今公开地址并不等于公开 viewing key，但在足够长的时间尺度上，两者的距离会更近。

## Ironwood 之后的 viewing key

NU6.3 引入了 Ironwood 屏蔽资金池，并使 Orchard 资金池变为仅可消费，因此资金会随着时间从前者迁移至后者。有关升级本身，请参阅 [Ironwood](/zcash-tech/ironwood) 和 [The turnstile](/zcash-tech/the-turnstile)。

**Ironwood 之前签发的 viewing key 在迁移后仍然有效。** ZIP 326 规定，receiver 及其对应的 incoming viewing key 适用于 Orchard *协议*，而不是某一个资金池：同一个 incoming viewing key 可以试解密 Orchard 资金池和 Ironwood 资金池的 note 密文。Zallet 也是如此实现的：它将 Ironwood note 描述为 Orchard 形态，并使用账户的 Orchard viewing key，在 Ironwood note 加密域下进行试解密。

对任何持有或签发密钥的人而言，这有三项后果：

1. **余额在资金池之间迁移，查看者能够看到这一过程。** [ZIP 318](https://zips.z.cash/zip-0318) 将迁移规定为一系列小额、刻意统一的 Orchard 至 Ironwood 交易，按随机化时间表广播；每笔交易消费一个 Orchard note，并产生一个标准面额的 Ironwood 输出。使用 viewing key 进行监控的审计人员会看到持仓在数周内分步从一个资金池转移到另一个，而不是一次性完成。wallet 可使用其 viewing key 根据链上数据重建自身的迁移进度。
2. **每一步迁移都会揭示所转移的价值。** 这正是通过 turnstile 的固有特性，也是使迁移可审计的原因。将余额拆分为标准面额意味着没有任何单笔交易会披露整个 Orchard 资金池余额。
3. **Ironwood 之后创建的账户可能以不同方式派生密钥。** [ZIP 2005](https://zips.z.cash/zip-2005) 为可量子恢复密钥增加了 `use_qsk` 标志，并改变了 incoming、outgoing 和 diversifier 密钥的派生方式，因此 `use_qsk = true` 密钥确实是不同的密钥。ZIP 326 要求该标志在整个账户中保持一致，并禁止在 Mainnet 上 NU6.3 激活前生成 `use_qsk = true` 密钥。因此，从 Ironwood 之前已存在的账户导出的密钥是 `use_qsk = false` 密钥，并且对该账户始终正确。不要假设从一个账户导出的密钥能够描述另一个账户。

## 导出 viewing key

### Zallet

[Zallet](https://github.com/zcash/zallet) 是替代 zcashd 内置 wallet 的 full-node wallet。Viewing key 的导出和导入在 **v0.1.0-beta.2（2026 年 7 月 28 日）**中推出，因此请先检查版本；较早的构建版本没有这些方法。方法名称后的每个参数都必须是有效 JSON，这意味着字符串值必须保留自己的双引号。[Zallet Quick Reference Guide](/using-zcash/zallet-quick-reference-guide) 介绍了通用命令格式。

列出 wallet 所持有的内容：

```bash
zallet rpc listaddresses
```

通过传入 Unified Address，导出账户的 unified full viewing key：

```bash
zallet rpc z_exportviewingkey '"<unified address>"'
```

改为使用可选的 `ivk` 参数，导出账户的 unified incoming viewing key：

```bash
zallet rpc z_exportviewingkey '"<unified address>"' true
```

传入 Sapling 地址会返回该账户的 Sapling extended full viewing key（`zxviews…`），与旧版 zcashd 的行为一致。有两个已记录的限制：Sprout 地址会被拒绝；而从本身以仅查看方式导入的账户中，无法导出 Sapling extended full viewing key，因为 wallet 无法重建它。`ivk` 形式则适用于已导入的仅查看账户。

### 从自身界面导出 viewing key 的 wallet

[Wallets](/using-zcash/wallets) 页面跟踪各 wallet 对 viewing key 的支持情况及 Ironwood 就绪状态。截至撰写时，同时列出 viewing-key 支持和 **Ironwood: Ready** 的 wallet 包括 ZODL、Zingo!、Zkool、Cake、Zallet、zecd 和 Nozy。在依赖任何单一 wallet 前，请查看该页面而不是本页，因为就绪状态会变化。

## 将 viewing key 作为仅查看账户导入

### Zkool

[Zkool](https://github.com/hhanh00/zkool2) 是这里最灵活的选择，因为它接受 unified 密钥以及旧版密钥。其 README 记录了通过 **unified viewing key** 或 **Sapling extended viewing key** 创建的仅查看账户，也支持从 zcashd 导出的旧版屏蔽 extended key。添加新账户，选择仅查看路径，然后粘贴 `uview…` 或 `zxviews…` 密钥；该账户随后会同步并报告余额和历史记录，但没有消费权限。

Ironwood 协议支持及 Orchard 至 Ironwood 的迁移已在 Zkool 6.24.0（2026 年 7 月 20 日）中推出，而 6.26.1（2026 年 8 月 2 日）修复了 mempool 中 Ironwood 交易的检测问题。请运行 6.26.1 或更高版本。

### Zallet

```bash
zallet rpc z_importviewingkey '"<zxviews… key>"' '"whenkeyisnew"' 0
```

第二个参数是重新扫描策略：`"whenkeyisnew"`（默认值）、`"yes"` 或 `"no"`。第三个参数是开始重新扫描的区块高度。Zallet 将该密钥导入为仅查看账户，并在没有消费权限的情况下追踪其地址的收款和付款交易。

**Zallet 仅导入 Sapling extended full viewing key。** 即使它可以导出 `uview…` unified full viewing key，也无法导入该密钥。若要移交对整个 unified 账户的读取权限，请从 Zallet 导出 UFVK，并将其导入接受 unified 密钥的 wallet，例如 Zkool。

要将导入的密钥变为包含 txid、手续费和 memo 的完整交易历史文件，请参阅 [从 Viewing Key 导出交易历史](/guides/viewing-key-transaction-export)。

## 有哪些变化，以及不要再寻找什么

如果你遵循过本页的旧版本或其翻译，以下三种途径已不再可用。

- **`zcash-cli z_exportviewingkey` 和 `z_importviewingkey`。** zcashd 已于 2026 年 7 月 18 日达到停止支持终点，现已不再运行。Zallet 中同名的方法是替代方案；请参阅[迁移指南](/guides/migration-guide-zcashd-to-zebrad-zallet)。
- **Ywallet 教程。** Wallets 页面将 Ywallet 标记为 **Ironwood: Not Ready**，因此它不适合被推荐用于 Ironwood 时代的 viewing key。来自同一开发者的 Zkool 接受相同范围的密钥，并被标记为 Ready。
- **zcashblockexplorer.com/vk。** 该服务返回带有无效证书的 HTTP 503，已被弃用而未被替代。将 viewing key 粘贴到网站会把你的完整交易历史交给运营该网站的人；这始终是旧页面中三种选项里最薄弱的一种。请改为将密钥导入由你自己运行的 wallet。

## 视觉 / 类比

### 审计员的窗口

把屏蔽账户想象成银行里的保险库：

- **支出密钥**是房间钥匙。持有它的人可以打开盒子并取出里面的内容。
- **查看密钥**是审计员通往该房间的窗口。审计员可以查看每个盒子的进出、阅读标签并记录账本——但这扇窗没有把手。透过它查看的人无法移动房间内的任何东西。

### 窗口无法显示的内容

这扇窗口面向房间，而非房间外的世界。它展示的是被查看账户的屏蔽活动；它不会让查看者成为观察整个区块链的人，也不会让查看者将该账户的活动与其他任何人的非屏蔽历史关联起来。而且，由于这扇窗口是在账户层级安装的，即使只给某人一个存款箱（单个地址）的窥视孔，他们仍能看到整个房间的入账视图——这正是最小权限密钥规则存在的原因。

### 为什么你无法收回该时间窗口

Viewing Key 是一条信息，而不是权限条目。一旦被复制，它就会一直存在，直到资金离开它所观察的账户。实际的补救措施是轮换：将余额转移到对方从未获得其密钥的新账户，旧窗口面对的便是一间空房。

## 深入探讨

### 试探性解密：查看究竟如何运作

每笔屏蔽交易都会将其 note 明文加密给预期接收者。持有查看密钥的钱包会执行 **试探解密**：对于它在链上发现的每笔交易，都会尝试使用该密钥解密 note 密文。命中后会揭示 note 的价值、接收者多样化器和备注；未命中则不产生任何代价。这就是为什么同一个传入查看密钥能在 Orchard 和 Ironwood 池中持续有效——[ZIP 326](https://zips.z.cash/zip-0326) 将 receiver 限定在 Orchard *协议*中，因此 Ironwood note 密文呈 Orchard 形态，并会在 Ironwood note 加密域下使用账户的 Orchard 查看密钥进行试探解密。

### 完整与传入：由什么派生决定

一个**完整**查看密钥可以派生出出站查看能力，使审计人员能够在交易解密后重建转账的*发送方*一侧。一个**入站**查看密钥则有意止步于此：它能检测并解密传入的 notes，但无法重建出站关联。这些能力之间的派生是单向的——入站密钥由完整密钥派生*而来*，绝不会反向派生——这正是“仅入站”成为真正降级而非承诺的原因。[ZIP 2005](https://zips.z.cash/zip-2005) 中的 `use_qsk` 标志改变了派生本身，因此可由量子计算恢复的密钥完全属于不同的密钥家族，而非旧密钥的一种变体。

### 查看者眼中的迁移是什么样的

由于[ZIP 318](https://zips.z.cash/zip-0318)迁移是一系列随机化的小额、统一的Orchard-到-Ironwood交易，持有该密钥的查看者会看到一个阶梯：许多标准面额的价值阶梯，而非一次跃升。单个阶梯不会揭示正在迁移的总余额，但其*模式*是可识别的——这正是可审计旋转门所预期的权衡。

## 实际影响

- **适用于交易所和支付处理商：**将账户的入站查看密钥（或用于完整覆盖的 UFVK）加载到检测节点上，并像处理透明地址一样自动核对客户存款——但客户的支出密钥永远不会离开冷存储。
- **适用于审计人员和储备证明：**完整查看密钥将“相信我们”变为“验证这一点”：可查看受监控账户的余额和完整交易历史，但完全无法动用这些账户。将其与[付款披露](/zcash-tech/payment-disclosures)结合使用，可为单笔付款提供一次性证明。
- **适用于尽职调查：**向交易对手提供与该业务相关账户的密钥，而非整个钱包的密钥。如果关系终止，请轮换该账户。
- **适用于工具选择：**Zallet导出 UFVK，并导入Sapling扩展完整查看密钥；Zkool接受统一密钥和旧版密钥作为仅查看账户。在选定钱包作为标准前，请查看[钱包](/using-zcash/wallets)页面，了解当前Ironwood就绪度矩阵。
- **披露成本是永久性的：**每多一个密钥持有者，都会形成一条无法关闭的永久隐私信用额度。应按关系签发密钥，将其范围限定为单个账户，并记录谁持有哪些密钥。

## 常见错误

| 常见看法 | 实际情况 |
| --- | --- |
| “查看密钥泄露后可以花费资金。” | 不可以。查看密钥不具备花费权限；泄露最严重的后果只是暴露交易历史。 |
| “我之后可以撤销查看密钥。” | 不可以。交出去的密钥会一直有效，直到资金转移到对方不持有其密钥的账户中。 |
| “导出某个地址的 UIVK 只会显示该地址。” | 查看密钥以账户为范围。UIVK 会显示该账户中每个资金池的入账活动。 |
| “`zcash-cli z_exportviewingkey` 仍然可用。” | 不可用。zcashd 已于 2026 年 7 月 18 日结束支持并停止运行；请改用 Zallet 的 `z_exportviewingkey` / `z_importviewingkey`。 |
| “将查看密钥粘贴到网页工具中是安全的，因为它是只读的。” | 只读仍意味着该账户的完整交易历史会交给运行该网站的人。请将密钥导入由你自己运行的钱包。 |
| “Zallet 可以导入 Zallet 能导出的任何查看密钥。” | 不可以。Zallet 只能导入 Sapling 扩展完整查看密钥；统一 `uview…` 密钥必须导入接受统一密钥的钱包，例如 Zkool。 |

## 相关页面

- [支付披露](/zcash-tech/payment-disclosures) — 在不授予对账户持续访问权限的情况下证明一笔支付的选定细节
- [统一地址](/zcash-tech/unified-addresses) — 承载 viewing-key 接收方的地址层
- [Ironwood](/zcash-tech/ironwood) — NU6.3 屏蔽池，Orchard 将迁移至其中
- [The Turnstile](/zcash-tech/the-turnstile) — 观看者可见的从 Orchard 到 Ironwood 的迁移机制
- [钱包](/using-zcash/wallets) — 钱包、viewing-key 支持及 Ironwood 就绪状态的完整目录
- [从 Viewing Key](/guides/viewing-key-transaction-export) 导出交易历史 — 将导入的密钥转换为包含完整 txid/手续费/备注历史的文件

## 资源

请按需使用 viewing key，并优先选择能够回答所问问题的范围最窄的密钥。

- [付款披露](/zcash-tech/payment-disclosures) - 在不授予对账户持续访问权限的情况下证明一笔付款的选定详情
- [ZIP 326：NU6.3 对钱包的影响](https://zips.z.cash/zip-0326) — 查看密钥如何在 Orchard 和 Ironwood 资金池之间运作
- [ZIP 229：版本 6 交易格式](https://zips.z.cash/zip-0229) — 定义 Orchard 和 Ironwood 资金池
- [ZIP 310](https://zips.z.cash/zip-0310) — 查看密钥规范
- [Zallet 变更日志](https://github.com/zcash/zallet/blob/main/CHANGELOG.md) — 哪个版本添加了哪个 RPC 方法
- [Zkool README](https://github.com/hhanh00/zkool2/blob/main/README.md) — 支持的账户和密钥类型
- [ECC，解释查看密钥](https://electriccoin.co/blog/explaining-viewing-keys/)
- [ECC，选择性披露和查看密钥](https://electriccoin.co/blog/viewing-keys-selective-disclosure/)
- [ECC，Zcash Viewing Key 视频演示](https://www.youtube.com/watch?v=NXjK_Ms7D5U&t=199s)
