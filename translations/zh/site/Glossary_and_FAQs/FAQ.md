# 常见问题

关于 Zcash 最常见问题的列表。如需排查 Zcash 客户端的问题，请参阅 [官方故障排除指南](https://zcash.readthedocs.io/en/latest/rtd_pages/troubleshooting_guide.html)。

### 快速导航

<div className="flex flex-wrap gap-2 my-4">
  <a href="#what-is-zcash" className="inline-flex px-3 py-1.5 rounded-full border border-border bg-card text-sm no-underline hover:bg-accent">什么是 Zcash？</a>
  <a href="#how-can-i-acquire-zcash" className="inline-flex px-3 py-1.5 rounded-full border border-border bg-card text-sm no-underline hover:bg-accent">如何获取 Zcash？</a>
  <a href="#what-is-the-difference-between-zcash-and-other-cryptocurrencies" className="inline-flex px-3 py-1.5 rounded-full border border-border bg-card text-sm no-underline hover:bg-accent">与其他加密货币有何不同？</a>
  <a href="#how-is-the-zcash-protocol-governed" className="inline-flex px-3 py-1.5 rounded-full border border-border bg-card text-sm no-underline hover:bg-accent">协议治理？</a>
  <a href="#where-is-my-transaction" className="inline-flex px-3 py-1.5 rounded-full border border-border bg-card text-sm no-underline hover:bg-accent">我的交易在哪里？</a>
  <a href="#is-zcash-really-private" className="inline-flex px-3 py-1.5 rounded-full border border-border bg-card text-sm no-underline hover:bg-accent">Zcash 真的私密吗？</a>
  <a href="#a-few-common-misconceptions" className="inline-flex px-3 py-1.5 rounded-full border border-border bg-card text-sm no-underline hover:bg-accent">常见误解</a>
</div>

---

## 什么是 Zcash？

<div className="rounded-2xl border border-border bg-card p-5 my-4">

Zcash 是一种数字货币，具有快速、保密的交易和低手续费。隐私是 Zcash 的核心特性。它率先使用零知识证明来加密所有交易。

现有多款钱包可用于即时、移动、安全且私密的支付：[钱包](/using-zcash/wallets)

</div>

## 如何获取 Zcash？

<div className="rounded-2xl border border-border bg-card p-5 my-4">

您可以在 [托管型交易所](/using-zcash/custodial-exchanges)、[DEX](/dex) 或 [中心化兑换平台](/using-zcash/centralizedswaps)购买 ZEC。

您也可以点对点购买 Zcash，或通过挖矿获取它。

</div>

## Zcash 与其他加密货币有何不同？

<div className="rounded-2xl border border-border bg-card p-5 my-4">

Zcash 在本质上比 Bitcoin 或 Ethereum 更具隐私性。它提供快速的出块时间（75 秒）、低手续费以及定期升级。

用户可以在 **透明** 或 **屏蔽** 交易之间选择。更多信息请参阅 [屏蔽生态系统](https://electriccoin.co/blog/shielded-ecosystem)。

</div>

## Zcash 协议如何治理？

<div className="rounded-2xl border border-border bg-card p-5 my-4">

该协议通过 **Zcash 改进提案（ZIP）**流程进行治理。任何人都可以提交 ZIP 草案。草案由社区讨论，并由 ZIP 编辑者接受或拒绝：

- [Daira Hopwood](https://twitter.com/feministPLT)（Electric Coin Company）
- [Deirdre Connolly](https://twitter.com/durumcrustulum)（Zcash Foundation）

决策将被写入规范，并在网络采用后于链上获得批准。

</div>

## 我的交易在哪里？

<div className="rounded-2xl border border-border bg-card p-5 my-4">

请先阅读 [我们的区块浏览器指南](/guides/blockchain-explorers)。然后查看 [Zcash 区块浏览器](https://zcashblockexplorer.com)。

交易会在大约 25 分钟（20 个区块）后过期，资金将自动退回。

**交易可能未显示的常见原因：**

- 连接中断
- 交易手续费过低
- 网络拥堵
- 透明输入过多（交易体积过大）

**成功提示：**

- 使用稳定的网络连接
- 支付标准手续费（或支付更高费用以获得优先处理）
- 等待后稍后重试
- 使用更少的输入以保持交易体积较小

</div>

## Zcash 真的私密吗？

<div className="rounded-2xl border border-border bg-card p-5 my-4">

**是的。** Zcash 会加密屏蔽交易中的发送方、金额和接收方数据。

Zcash **不会**：

- 加密多重签名交易（等待 FROST 集成）
- 防止与透明交易产生关联
- 隐藏 IP 地址

延伸阅读：[屏蔽生态系统](https://electriccoin.co/blog/shielded-ecosystem)

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
      <td className="py-4 px-5 font-medium text-foreground">Zcash 是一种中心化货币吗？</td>
      <td className="py-4 px-5 text-foreground">不是。商标协议阻止 Zcash Foundation 或 ECC 违背社区共识行事。治理已被证明是去中心化的（参见 [Messari 报告](https://messari.io/report/decentralizing-zcash)）。社区投票、ZecHub 和 Zcash Foundation A/V Club 都支持广泛参与。</td>
    </tr>
    <tr className="border-b border-border hover:bg-amber-50 dark:hover:bg-zinc-700">
      <td className="py-4 px-5 font-medium text-foreground">Zcash 是否存在后门？</td>
      <td className="py-4 px-5 text-foreground">不存在。Zcash 和我们构建的任何密码学软件均不包含后门，而且永远不会包含。</td>
    </tr>
    <tr className="border-b border-border hover:bg-amber-50 dark:hover:bg-zinc-700">
      <td className="py-4 px-5 font-medium text-foreground">Zcash 是否由一家公司控制？</td>
      <td className="py-4 px-5 text-foreground">不正确。尽管我们会与公司合作进行研究，Zcash 仍致力于去中心化。多个自治组织共同努力，以实现自主保管和隐私权利。</td>
    </tr>
    <tr className="hover:bg-amber-50 dark:hover:bg-zinc-700">
      <td className="py-4 px-5 font-medium text-foreground">与其他隐私币相比，Zcash 的隐私性有限</td>
      <td className="py-4 px-5 text-foreground">不是。Monero/Grin 风格的隐私依赖于诱饵（可能被攻破）。Zcash 会加密所有屏蔽交易数据，因此资金池中的每笔交易都无法区分。参见 [隐私性还不够吗？](https://electriccoin.co/blog/not-private-enough-mixers-and-decoys-wont-protect-you-for-long/)。</td>
    </tr>
  </tbody>
</table>

</div>

---

**最后更新：**2026 年 3 月
**想要贡献吗？** [在 GitHub 上编辑此页面](https://github.com/ZecHub/zechub/edit/main/site/Glossary_and_FAQs/FAQ.md)
