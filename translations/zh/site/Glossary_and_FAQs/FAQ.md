# 常见问题

关于 Zcash 的最常见问题列表。有关 Zcash 客户端的故障排除，请参阅[官方故障排除指南](https://zcash.readthedocs.io/en/latest/rtd_pages/troubleshooting_guide.html)。

### 快速导航
[什么是 Zcash？](#what-is-zcash) | [如何获取 Zcash？](#acquire) | [与其他加密货币有何不同？](#difference) | [协议如何治理？](#governance) | [我的交易在哪里？](#transaction) | [Zcash 真的私密吗？](#privacy) | [常见误解](#misconceptions)

---

## 什么是 Zcash？

<div className="overflow-x-auto my-8 rounded-3xl border border-border bg-card p-6">
Zcash 是一种具有快速、保密交易和低手续费的数字货币。隐私是 Zcash 的核心特性。它率先使用零知识证明来加密所有交易。  

现有多种钱包可用于即时、移动端、安全且私密的支付：[移动钱包](https://z.cash/wallets/)
</div>

## 我如何获取 Zcash？

<div className="overflow-x-auto my-8 rounded-3xl border border-border bg-card p-6">
你可以在加密货币[交易所](https://z.cash/exchanges)购买 ZEC。  
你也可以通过点对点方式购买 Zcash，或通过挖矿获得它。
</div>

## Zcash 与其他加密货币有什么区别？

<div className="overflow-x-auto my-8 rounded-3xl border border-border bg-card p-6">
与 Bitcoin 或 Ethereum 相比，Zcash 从根本上更注重隐私。它提供更快的区块时间（75 秒）、更低的手续费以及定期升级。  

用户可以在**透明**交易和**屏蔽**交易之间进行选择。更多信息请参阅[屏蔽生态系统](https://bitzecbzc.github.io/blog/shielded-ecosystem/index.html)。
</div>

## Zcash 协议如何治理？

<div className="overflow-x-auto my-8 rounded-3xl border border-border bg-card p-6">
该协议通过 **Zcash Improvement Proposal (ZIP)** 流程进行治理。任何人都可以提交 ZIP 草案。草案由社区讨论，并由 ZIP 编辑决定接受或拒绝：

- [Daira Hopwood](https://twitter.com/feministPLT) (Electric Coin Company)  
- [Deirdre Connolly](https://twitter.com/durumcrustulum) (Zcash Foundation)

相关决策会写入规范，并在网络采用后通过链上方式确认。
</div>

## 我的交易在哪里？

<div className="overflow-x-auto my-8 rounded-3xl border border-border bg-card p-6">
请先阅读[我们的区块浏览器指南](https://zechub.notion.site/Zcash-Blockchain-Explorer-4b4d970cb53e474989932c6e1a78b629)。然后查看[Zcash 区块浏览器](https://zcashblockexplorer.com)。  

交易大约会在 25 分钟（20 个区块）后过期，资金会自动退回。  

**交易可能未显示的常见原因：**
- 连接中断
- 交易手续费过低
- 网络过载
- 透明输入过多（体积过大）

**提高成功率的建议：**
- 使用稳定的网络连接
- 支付标准手续费（如需优先处理可支付更高费用）
- 稍后等待并重试
- 减少输入数量以保持交易体积较小
</div>

## Zcash 真的私密吗？

<div className="overflow-x-auto my-8 rounded-3xl border border-border bg-card p-6">
**是的。** 对于屏蔽交易，Zcash 会加密发送方、金额和接收方数据。  

Zcash **不会**：
- 加密多重签名交易（FROST 集成仍在等待中）
- 防止与透明交易产生关联分析
- 隐藏 IP 地址

延伸阅读：[屏蔽生态系统](https://electriccoin.co/blog/shielded-ecosystem)
</div>

## 一些常见误解

<div className="overflow-x-auto my-8 rounded-3xl border border-border bg-card p-6">
  <table className="w-full border-collapse rounded-2xl overflow-hidden">
    <thead>
      <tr className="border-b border-border bg-amber-100 dark:bg-zinc-800">
        <th className="py-6 px-6 text-left font-bold text-amber-800 dark:text-white">误解</th>
        <th className="py-6 px-6 text-left font-bold text-amber-800 dark:text-white">正确答案</th>
      </tr>
    </thead>
    <tbody>
      <tr className="border-b border-border hover:bg-amber-50 dark:hover:bg-zinc-700">
        <td className="py-5 px-6 font-medium text-foreground">Zcash 是一种中心化的币吗？</td>
        <td className="py-5 px-6 text-foreground">不是。商标协议会阻止 Zcash Foundation 或 ECC 采取违背社区共识的行动。治理已被证明是去中心化的（参见 [Messari report](https://messari.io/report/decentralizing-zcash)）。社区投票、ZecHub 以及 Zcash Foundation A/V Club 都支持广泛参与。</td>
      </tr>
      <tr className="border-b border-border hover:bg-amber-50 dark:hover:bg-zinc-700">
        <td className="py-5 px-6 font-medium text-foreground">Zcash 有后门吗？</td>
        <td className="py-5 px-6 text-foreground">没有。无论是 Zcash，还是我们构建的任何密码学软件，都不包含后门，而且永远不会包含后门。</td>
      </tr>
      <tr className="border-b border-border hover:bg-amber-50 dark:hover:bg-zinc-700">
        <td className="py-5 px-6 font-medium text-foreground">Zcash 受某家公司控制吗？</td>
        <td className="py-5 px-6 text-foreground">不正确。尽管我们会与公司合作开展研究，Zcash 仍然坚持去中心化。多个自治组织正共同努力，推动自托管和隐私权。</td>
      </tr>
      <tr className="hover:bg-amber-50 dark:hover:bg-zinc-700">
        <td className="py-5 px-6 font-medium text-foreground">与其他隐私币相比，Zcash 的隐私性有限</td>
        <td className="py-5 px-6 text-foreground">不是。Monero/Grin 风格的隐私依赖诱饵机制（而这可能会被攻破）。Zcash 会加密所有屏蔽交易数据，因此池中的每笔交易都无法区分。参见 [Not Private Enough?](https://electriccoin.co/blog/not-private-enough-mixers-and-decoys-wont-protect-you-for-long/)。</td>
      </tr>
    </tbody>
  </table>
</div>

---

**最后更新：** 2026 年 3 月  
**想要贡献？** [在 GitHub 上编辑此页面](https://github.com/ZecHub/zechub/edit/main/site/Glossary_and_FAQs/FAQ.md)
