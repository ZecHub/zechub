# 常见问题

关于 Zcash 的最常见问题列表。有关排查 Zcash 客户端问题，请参阅 [官方故障排除指南](https://zcash.readthedocs.io/en/latest/rtd_pages/troubleshooting_guide.html)。

### 快速导航

<div className="flex flex-wrap gap-2 my-4">
  <a href="#what-is-zcash" className="inline-flex px-3 py-1.5 rounded-full border border-border bg-card text-sm no-underline hover:bg-accent">什么是 Zcash？</a>
  <a href="#how-can-i-acquire-zcash" className="inline-flex px-3 py-1.5 rounded-full border border-border bg-card text-sm no-underline hover:bg-accent">如何获得 Zcash？</a>
  <a href="#what-is-the-difference-between-zcash-and-other-cryptocurrencies" className="inline-flex px-3 py-1.5 rounded-full border border-border bg-card text-sm no-underline hover:bg-accent">与其他加密货币有何区别？</a>
  <a href="#how-is-the-zcash-protocol-governed" className="inline-flex px-3 py-1.5 rounded-full border border-border bg-card text-sm no-underline hover:bg-accent">协议治理？</a>
  <a href="#where-is-my-transaction" className="inline-flex px-3 py-1.5 rounded-full border border-border bg-card text-sm no-underline hover:bg-accent">我的交易在哪里？</a>
  <a href="#is-zcash-really-private" className="inline-flex px-3 py-1.5 rounded-full border border-border bg-card text-sm no-underline hover:bg-accent">Zcash 真的保护隐私吗？</a>
  <a href="#a-few-common-misconceptions" className="inline-flex px-3 py-1.5 rounded-full border border-border bg-card text-sm no-underline hover:bg-accent">常见误解</a>
  <a href="#zcashd-stopped-working-what-do-i-run-now" className="inline-flex px-3 py-1.5 rounded-full border border-border bg-card text-sm no-underline hover:bg-accent">zcashd 停止运行了？</a>
  <a href="#how-do-i-move-my-zcashd-wallet-to-zallet" className="inline-flex px-3 py-1.5 rounded-full border border-border bg-card text-sm no-underline hover:bg-accent">将我的钱包迁移至 Zallet？</a>
  <a href="#what-is-ironwood-and-do-i-need-to-do-anything" className="inline-flex px-3 py-1.5 rounded-full border border-border bg-card text-sm no-underline hover:bg-accent">什么是 Ironwood？</a>
  <a href="#which-full-node-should-i-run" className="inline-flex px-3 py-1.5 rounded-full border border-border bg-card text-sm no-underline hover:bg-accent">应运行哪个全节点 [full node]？</a>
  <a href="#where-do-i-look-up-a-term-from-a-release-note" className="inline-flex px-3 py-1.5 rounded-full border border-border bg-card text-sm no-underline hover:bg-accent">查找术语？</a>
</div>

---

## 什么是 Zcash？

<div className="rounded-2xl border border-border bg-card p-5 my-4">

Zcash 是一种数字货币，具有快速、保密的交易 [transaction] 和低手续费 [fee]。隐私 [privacy] 是 Zcash 的核心特性。它率先使用零知识证明 [zero-knowledge proof] 为所有交易加密 [encryption]。

有多个钱包 [wallet] 可用于即时、移动、安全且私密的支付 [payment]：[钱包](/using-zcash/wallets)

</div>

## 如何获得 Zcash？

<div className="rounded-2xl border border-border bg-card p-5 my-4">

您可以在 [托管交易所 custodial exchange](/using-zcash/custodial-exchanges)、[DEX](/using-zcash/dex) 或 [中心化兑换 [swap] 平台](/using-zcash/centralized-swaps)购买 ZEC。

您还可以点对点购买 Zcash，或通过挖矿 [mining] 获得它。

</div>

## Zcash 与其他加密货币有何区别？

<div className="rounded-2xl border border-border bg-card p-5 my-4">

Zcash 在根本上比 Bitcoin 或 Ethereum 更保护隐私。它提供快速的区块 [block] 时间（75 秒）、低手续费和定期升级。

用户可以在**透明 [transparent]**交易或**屏蔽 [shielded]**交易之间选择。更多信息请参阅 [屏蔽生态系统](https://electriccoin.co/blog/shielded-ecosystem)。

</div>

## Zcash 协议如何治理？

<div className="rounded-2xl border border-border bg-card p-5 my-4">

该协议通过**Zcash改进提案（ZIP）**流程进行治理。任何人都可以提交 ZIP 草案。草案由社区讨论，并由 ZIP 编辑决定接受或拒绝：

- [Daira Hopwood](https://twitter.com/feministPLT)（Electric Coin Company）
- [Deirdre Connolly](https://twitter.com/durumcrustulum)（Zcash Foundation）

决策将写入规范，并在网络采用后于链上 [on-chain] 获得批准。

</div>

## 我的交易在哪里？

<div className="rounded-2xl border border-border bg-card p-5 my-4">

请先阅读 [我们的区块浏览器指南](/guides/blockchain-explorers)。然后查看 [Zcash 区块浏览器](https://mainnet.zcashexplorer.app)。

没有固定的 25 分钟过期或自动退款计时器。请查看钱包记录的过期高度，以及原始支付是否已被挖矿。如果它在未被挖矿的情况下过期，则未在链上[on-chain]结算；过期不会创建退款交易。请先让钱包完成同步，再遵循其重试指引。请参阅 [交易故障排除](/using-zcash/transactions#troubleshooting-stuck-transactions) 和 [ZIP 203](https://zips.z.cash/zip-0203)。

**交易可能未显示的常见原因：**

- 连接中断
- 交易手续费过低
- 网络过载
- 透明输入过多（规模过大）

**成功提示：**

- 使用稳定的连接
- 支付标准手续费（或为优先处理支付更高费用）
- 等待后稍后重试
- 使用更少的输入以保持交易较小

</div>

## Zcash 真的保护隐私吗？

<div className="rounded-2xl border border-border bg-card p-5 my-4">

**是的。** Zcash 会为屏蔽交易的发送方、金额和接收方数据加密。

Zcash **不会**：

- 为多重签名交易加密（FROST 集成尚待完成）
- 防范与透明交易的关联
- 隐藏 IP 地址

延伸阅读：[屏蔽生态系统](https://web.archive.org/web/20260903010654/https://electriccoin.co/blog/shielded-ecosystem/)

</div>

## zcashd 停止运行了，现在应运行什么？

<div className="rounded-2xl border border-border bg-card p-5 my-4">

zcashd 已退役。版本 6.20.0 于 2026 年 7 月 18 日在区块 3417100 时自行关闭，且它从未支持 Ironwood（NU6.3），因此没有可升级到的后续版本。

请改为运行 Z3 堆栈。三个程序分担了 zcashd 曾独自完成的工作：

- **[Zebra](/zcash-tech/zebra-full-node)** 验证链 [chain]
- **[Zaino](/zcash-tech/zaino)** 为其建立索引并提供钱包数据
- **[Zallet](/zcash-tech/zallet)** 保管您的资金

[Zakura](/zcash-tech/zakura-node) 是另一种全节点。它还在自身之上运行 zcashd，这有助于仍期待旧接口的其他软件。

请从 [迁移指南](/guides/migration-guide-zcashd-to-zebrad-zallet) 开始。

</div>

## 如何将我的 zcashd 钱包迁移至 Zallet？

<div className="rounded-2xl border border-border bg-card p-5 my-4">

Zallet 会迁移现有的 `wallet.dat`，因此您可以保留资金和地址 [address]。

请先备份 `wallet.dat`，然后按照 [迁移指南](/guides/migration-guide-zcashd-to-zebrad-zallet) 操作。在您确认 Zallet 中的余额之前，请保留该备份。

迁移完成后，[Zallet 快速参考](/using-zcash/zallet-quick-reference-guide)涵盖日常命令。

</div>

## 什么是 Ironwood，我需要做什么吗？

<div className="rounded-2xl border border-border bg-card p-5 my-4">

Ironwood 是网络升级 [network upgrade] NU6.3，自 2026 年 7 月 28 日区块 3,428,143 起已在主网上线。它新增了一个基于修正电路构建的屏蔽池 [shielded pool]，并封存较旧的 [Orchard](/using-zcash/shielded-pools) pool，因此任何人都可以验证不存在被伪造的 ZEC。

**如果您持有屏蔽资金，可能需要迁移。** 价值只能通过 [turnstile](/zcash-tech/the-turnstile) 离开 Orchard，而不同钱包会在不同时间以不同方式处理迁移。请先咨询您的钱包提供商，再手动迁移任何资金。

请阅读 [Ironwood](/zcash-tech/ironwood)，了解变更内容及其原因。

</div>

## 应运行哪个全节点？

<div className="rounded-2xl border border-border bg-card p-5 my-4">

**[Zebra](/zcash-tech/zebra-full-node)** 是 zcashd 的直接替代品，也是迁移指南所假定使用的节点。除非您有不选择它的理由，否则请选择它。

**[Zakura](/zcash-tech/zakura-node)** 是第二种实现，面向规模化设计，具备更快的同步和原生区块修剪功能。如果您需要这些功能，或依赖仍与 zcashd 通信的软件，请选择它。

两者验证相同的链，因此这是运维选择，而非共识 [consensus] 选择。

</div>

## 在哪里查找发布说明中的术语？

<div className="rounded-2xl border border-border bg-card p-5 my-4">

请参阅 [Zcash Library](/glossary-and-faqs/zcash-library)。它涵盖节点和钱包软件、屏蔽池，以及最常出现的 ZIP 编号。

</div>

## 一些常见误解

<div className="rounded-2xl border border-border bg-card p-5 my-4 overflow-x-auto">

<table className="w-full border-collapse">
  <thead>
    <tr className="border-b border-border bg-amber-100 dark:bg-zinc-800">
      <th className="py-4 px-5 text-left font-bold text-amber-800 dark:text-white">误解</th>
      <th className="py-4 px-5 text-left font-bold text-amber-800 dark:text-white">正确答案</th>
    </tr>
  </thead>
  <tbody>
    <tr className="border-b border-border hover:bg-amber-50 dark:hover:bg-zinc-700">
      <td className="py-4 px-5 font-medium text-foreground">Zcash 是中心化货币吗？</td>
      <td className="py-4 px-5 text-foreground">不是。商标协议阻止 Zcash Foundation 或 ECC 违背社区共识行事。治理 [governance] 已被证明是去中心化 [decentralized] 的（参见 [Messari 报告](https://messari.io/report/decentralizing-zcash)）。社区投票、ZecHub 和 Zcash Foundation A/V Club 都支持广泛参与。</td>
    </tr>
    <tr className="border-b border-border hover:bg-amber-50 dark:hover:bg-zinc-700">
      <td className="py-4 px-5 font-medium text-foreground">Zcash 有后门吗？</td>
      <td className="py-4 px-5 text-foreground">没有。Zcash 及我们构建的所有密码学软件均不包含后门，且永远不会包含。</td>
    </tr>
    <tr className="border-b border-border hover:bg-amber-50 dark:hover:bg-zinc-700">
      <td className="py-4 px-5 font-medium text-foreground">Zcash 受公司控制吗？</td>
      <td className="py-4 px-5 text-foreground">不正确。虽然我们与公司合作开展研究，Zcash 仍致力于去中心化。多个自治组织共同致力于实现自托管和隐私权。</td>
    </tr>
    <tr className="hover:bg-amber-50 dark:hover:bg-zinc-700">
      <td className="py-4 px-5 font-medium text-foreground">与其他隐私币相比，Zcash 的隐私有限</td>
      <td className="py-4 px-5 text-foreground">不是。Monero/Grin 风格的隐私依赖诱饵（可被攻破）。Zcash 会加密所有屏蔽交易数据，因此 pool 中的每笔交易都无法区分。参见 [隐私还不够吗？](https://electriccoin.co/blog/not-private-enough-mixers-and-decoys-wont-protect-you-for-long/)。</td>
    </tr>
  </tbody>
</table>

</div>

---

**最后更新：**2026 年 10 月
**想要贡献？** [在 GitHub 上编辑此页面](https://github.com/ZecHub/zechub/edit/main/site/Glossary_and_FAQs/FAQ.md)
