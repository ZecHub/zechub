<a href="https://github.com/zechub/zechub/edit/main/site/Zcash_Tech/Viewing_Keys.md" target="_blank">
  <img src="https://img.shields.io/badge/Edit-blue" alt="Edit Page"/>
</a>

# Viewing Key

屏蔽地址让你能够在 Zcash 区块链上进行交易，同时尽可能少地暴露信息。那么，当你*确实*需要向特定一方展示你持有什么，或者你发送了什么时，会发生什么？每个屏蔽地址都有一个 viewing key，它授予读取权限，但不授予花费能力。viewing key 最早在 [ZIP 310](https://zips.z.cash/zip-0310) 中引入，并在 Sapling 网络升级中加入协议。

viewing key 是选择性披露的工具：由你来决定谁能看到什么，而你永远不需要交出花费授权。

## 为什么要使用 viewing key？

Electric Coin Company 关于这一主题的文章列出了最常见的几种场景，而这些场景在今天仍然很常见：

- **交易所监控充值。** 交易所将 incoming viewing key 加载到一个面向互联网的检测节点上，以便它能够发现客户向某个屏蔽地址的充值，同时 spending key 保存在从不接触网络的硬件中。
- **托管机构证明其持仓。** 托管机构向审计员提供每个屏蔽地址的 full viewing key。审计员可以检查这些余额，并审查这些地址的历史收支活动，但除此之外什么也做不了。
- **对交易对手进行尽职调查。** 当交易所需要在强化尽职调查中审查客户的屏蔽交易历史时，它可以要求提供 viewing key，而不是要求转出资金。

## viewing key 会透露什么，不会透露什么

密钥不止一种，而它们之间的区别决定了你会暴露多少信息。

| 密钥 | 前缀 | 授予的权限 |
|---|---|---|
| Unified full viewing key (UFVK) | `uview…` | 可查看该账户中每个池的流入**和**流出交易 |
| Unified incoming viewing key (UIVK) | `uivk…` | 仅可查看该账户中每个池的流入交易 |
| Sapling extended full viewing key | `zxviews…` | 可查看该密钥地址的 Sapling 流入和流出活动 |

这些都不能用于花费。它们在关键意义上也都是永久性的：一旦你把密钥交出去，就无法撤回；你只能通过把资金转移到一个对方不持有其密钥的账户中，来使其失效。

在你分享任何内容之前，有两个值得了解的披露陷阱。

**incoming 并不意味着范围狭窄。** unified incoming viewing key 的作用范围是整个账户，而不是你被问到的那一个地址。为单个 Sapling 地址导出 UIVK，仍然会授予该账户中每个池的 incoming 可见性，因此它披露的信息比其名称所指向的那个地址更多。[Zallet Book](https://zcash.github.io/zallet/zcashd/json_rpc.html) 明确说明了这一点。

**一个已公开的地址，已经向未来的对手暴露了它的 incoming viewing key。** [ZIP 326](https://zips.z.cash/zip-0326) 指出，拥有量子计算机的对手可以从一个已公开的多样化地址中恢复 incoming viewing key，而这在可行性上不同于恢复 nullifier key。今天公开地址并不等同于公开 viewing key，但从足够长的时间跨度来看，这两者之间的距离会更近。

## Ironwood 之后的 viewing key

NU6.3 引入了 Ironwood 屏蔽池，并使 Orchard 池变为仅可花费，因此资金会随着时间从一个池迁移到另一个池。关于升级本身，请参阅 [Ironwood](/zcash-tech/ironwood) 和 [The turnstile](/zcash-tech/the-turnstile)。

**在 Ironwood 之前签发的 viewing key，在迁移后仍然可用。** ZIP 326 规定，receiver 及其对应的 incoming viewing key 的作用范围是 Orchard *协议*，而不是某个池：同一个 incoming viewing key 会对 Orchard 池和 Ironwood 池的 note 密文都进行 trial-decrypt。Zallet 也是这样实现的，它将 Ironwood note 描述为 Orchard 形态，并在 Ironwood note-encryption 域下使用账户的 Orchard viewing keys 对其进行 trial-decrypt。

对于任何持有或签发密钥的人来说，这会带来三个后果：

1. **余额会在池之间迁移，而查看者能看到这一过程。** [ZIP 318](https://zips.z.cash/zip-0318) 将迁移规定为一系列小额、刻意统一的 Orchard 到 Ironwood 交易，这些交易按随机化时间表广播，每笔交易花费一个 Orchard note，并产生一个标准面额的 Ironwood 输出。使用 viewing key 进行观察的审计员会看到持仓在数周内分阶段从一个池转移到另一个池，而不是一次性完成。wallet 可以使用其 viewing keys，从链上数据中重建自己的迁移进度。
2. **每一步迁移都会暴露其转移的价值。** 这是跨越 turnstile 的固有特性，也正因如此迁移才可以被审计。将余额拆分为标准面额，意味着没有任何一笔交易会暴露整个 Orchard 池余额。
3. **Ironwood 之后创建的账户，其密钥派生方式可能不同。** [ZIP 2005](https://zips.z.cash/zip-2005) 为量子可恢复密钥添加了一个 `use_qsk` 标志，并改变了 incoming、outgoing 和 diversifier keys 的派生方式，因此 `use_qsk = true` 的密钥确实是不同的密钥。ZIP 326 要求该标志在同一账户内保持一致，并禁止在 Mainnet 上 NU6.3 激活之前生成 `use_qsk = true` 的密钥。因此，从 Ironwood 之前已存在的账户导出的密钥会是 `use_qsk = false` 的密钥，并且对该账户仍然正确。不要假设从一个账户导出的密钥也描述另一个账户。

## 导出 viewing key

### Zallet

[Zallet](https://github.com/zcash/zallet) 是取代 zcashd 内置 wallet 的全节点 wallet。viewing-key 的导出与导入功能在 **v0.1.0-beta.2（2026 年 7 月 28 日）** 中加入，因此请先检查你的版本；更早的构建版本没有这些方法。方法名后面的每个参数都必须是有效的 JSON，这意味着字符串值必须保留它们自己的双引号。[Zallet Quick Reference Guide](/using-zcash/zallet-quick-reference-guide) 介绍了一般的命令格式。

列出 wallet 持有的内容：

```bash
zallet rpc listaddresses
```

通过传入 unified address 导出该账户的 unified full viewing key：

```bash
zallet rpc z_exportviewingkey '"<unified address>"'
```

改为导出该账户的 unified incoming viewing key，可使用可选的 `ivk` 参数：

```bash
zallet rpc z_exportviewingkey '"<unified address>"' true
```

传入 Sapling 地址会返回该账户的 Sapling extended full viewing key（`zxviews…`），这与旧版 zcashd 的行为一致。有两个已记录的限制：Sprout 地址会被拒绝；如果某个账户本身是作为仅查看账户导入的，那么无法从该账户导出 Sapling extended full viewing key，因为 wallet 无法重建它。而 `ivk` 形式对导入的仅查看账户是可用的。

### 从自身界面导出 viewing key 的 wallet

[Wallets](/using-zcash/wallets) 页面会跟踪每个 wallet 对 viewing key 的支持情况以及 Ironwood 就绪情况。在撰写本文时，同时列出支持 viewing key 且 **Ironwood: Ready** 的 wallet 包括 ZODL、Zingo!、Zkool、Cake、Zallet、Zecd 和 Nozy。在依赖任何单一 wallet 之前，应先查看那个页面而不是本文，因为就绪状态会发生变化。

## 将 viewing key 作为仅监控账户导入

### Zkool

[Zkool](https://github.com/hhanh00/zkool2) 是这里最灵活的选择，因为它既接受 unified keys，也接受 legacy keys。其 README 记录了由 **unified viewing key** 或 **Sapling extended viewing key** 创建的仅查看账户，以及从 zcashd 导出的 legacy 屏蔽扩展密钥。添加一个新账户，选择仅查看路径，然后粘贴 `uview…` 或 `zxviews…` 密钥；随后该账户会同步，并在没有花费权限的情况下报告余额和历史记录。

Ironwood 协议支持以及 Orchard 到 Ironwood 的迁移功能已在 Zkool 6.24.0（2026 年 7 月 20 日）中加入，而 6.26.1（2026 年 8 月 2 日）修复了 mempool 中的 Ironwood 交易检测。请运行 6.26.1 或更高版本。

### Zallet

```bash
zallet rpc z_importviewingkey '"<zxviews… key>"' '"whenkeyisnew"' 0
```

第二个参数是重新扫描策略：`"whenkeyisnew"`（默认值）、`"yes"` 或 `"no"`。第三个参数是要从哪个区块高度开始重新扫描。Zallet 会将该密钥作为一个仅查看账户导入，并在没有花费权限的情况下跟踪其地址的流入和流出交易。

**Zallet 仅导入 Sapling extended full viewing keys。** 它不会导入 `uview…` unified full viewing key，尽管它可以导出这种密钥。若要交出对整个 unified 账户的读取权限，请从 Zallet 导出 UFVK，并将其导入一个接受 unified keys 的 wallet，例如 Zkool。

## 有哪些变化，以及不必再寻找什么

如果你遵循的是这个页面的旧版本，或者它的某个译本，那么有三种方式现在已经不可用了。

- **`zcash-cli z_exportviewingkey` 和 `z_importviewingkey`。** zcashd 已于 2026 年 7 月 18 日达到支持终止并停止运行。Zallet 中同名的方法就是替代方案；参见[迁移指南](/guides/migration-guide-zcashd-to-zebrad-zallet)。
- **Ywallet 教程。** Wallets 页面将 Ywallet 标记为 **Ironwood: Not Ready**，因此在 Ironwood 时代的 viewing keys 方面，它不再是适合推荐给用户的 wallet。来自同一开发者的 Zkool 接受相同范围的密钥，并被标记为 Ready。
- **zcashblockexplorer.com/vk。** 该服务返回带有无效证书的 HTTP 503，因此已被移除而不是替代。将 viewing key 粘贴到网站中，会把你的完整交易历史交给运营该网站的人，而这始终是旧页面中三种选项里最弱的一种。应改为将密钥导入你自己运行的 wallet。

## 资源

按需使用 viewing keys，并优先选择能够回答问题的最窄范围密钥。

- [ZIP 326: NU6.3 对 Wallet 的影响](https://zips.z.cash/zip-0326) — viewing keys 如何跨 Orchard 和 Ironwood 池发挥作用
- [ZIP 229: 第 6 版交易格式](https://zips.z.cash/zip-0229) — 定义 Orchard 和 Ironwood 池
- [Zallet 更新日志](https://github.com/zcash/zallet/blob/main/CHANGELOG.md) — 哪个版本加入了哪个 RPC 方法
- [Zkool README](https://github.com/hhanh00/zkool2/blob/main/README.md) — 支持的账户和密钥类型
- [ECC，解释 Viewing Key](https://electriccoin.co/blog/explaining-viewing-keys/)
- [ECC，选择性披露与 Viewing Key](https://electriccoin.co/blog/viewing-keys-selective-disclosure/)
- [ECC，Zcash Viewing Key 视频演示](https://www.youtube.com/watch?v=NXjK_Ms7D5U&t=199s)
