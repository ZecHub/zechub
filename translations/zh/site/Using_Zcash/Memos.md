<a href="https://github.com/zechub/zechub/edit/main/site/Using_Zcash/Memos.md" target="_blank">
  <img src="https://img.shields.io/badge/Edit-blue" alt="Edit Page"/>
</a>

# 备忘录 [Memos]

## TL;DR

* 备忘录 [memo] 是附加到发送至屏蔽 [shielded] 地址的支付 [payment] 中的一段简短 note [note]。它经过加密 [encryption]，因此观察 blockchain 的人无法读取。
* 备忘录字段最多可容纳 512 字节的文本。
* 人们使用备忘录说明是谁发送了支付及其用途，或发送私密消息。
* 发送至透明 [transparent] 地址的支付无法携带备忘录。
* [支付请求链接](/using-zcash/payment-request-uris)可以为你填入备忘录，让商店能够标记每个订单。

## 核心说明

### 发送加密备忘录

发送 Z2Z（屏蔽到屏蔽）交易 [transaction] 时，你可以在交易中包含备忘录（消息）。该备忘录可用于多种不同用途。

### 签署交易

备忘录主要用于签署支付。由于屏蔽交易会加密你的数据，你无法看到是谁向你发送了 ZEC，也无法知道 ZEC 可能用于什么。用户可以使用备忘录字段签上自己的姓名或化名，让交易对方知道交易来自谁。他们还可以描述该交易的用途。

### 发送消息

加密备忘录的另一种用例 [use case] 是向拥有 z-addr 的人发送消息。这些消息可以涉及任何内容，无论是 [给朋友的提醒](https://twitter.com/iansagstette/status/1542142468505870336)，还是 [需要尽可能保持私密的敏感消息](https://twitter.com/InsideZcash/status/1545800146352578560)。

### Blockchain 上的情书

有个人在 Zcash blockchain 的最初几个区块 [block] 之一中向其伴侣发送了一封情书。有人发现其伴侣通过 Zcash 备忘录向他们发送了一个文件。这个文件是一张前往海外特别活动的门票，她和远方的爱人一直在谈论一起参加这个活动。该备忘录是一封情书。

## 视觉化 / 类比

将屏蔽支付想象成里面装着钱的密封信封。备忘录是与钱一起折叠放入的便条。

Blockchain 是邮局。它运送信封并记录其已送达，但绝不会打开它。打开信封的人会阅读便条。透明支付则是一张明信片，因此没有信封可将便条折入其中。

## 深入探讨

### 备忘录中可容纳的内容

备忘录字段始终恰好为 512 字节。较短的文本备忘录会在加密前以零字节填充，因此每个备忘录在链上 [on-chain] 看起来都具有相同大小。

大多数备忘录都是纯 UTF-8 文本。[ZIP 302](https://zips.z.cash/zip-0302) 还为以字节 `0xF5` 或更高值开头的备忘录保留了其他类型的数据，而以 `0xF6` 开头并后接零的备忘录表示"无备忘录"。

交易中的每个屏蔽输出都有自己的备忘录，因此一笔向多人支付的交易可以为每个人包含不同的便条。

### 高级内容

> **历史内容。此演示已无法按原文运行。**
>
> 以下演示使用 zcashd，其 [接收脚本](https://github.com/ZecHub/zechub/blob/main/site/tutorials/ZcashMagicWormhole/receiveOwlsWormhole.sh) 通过 `zcash-cli` 读取备忘录。zcashd 已于 2026 年 7 月 18 日达到自动停止支持状态，因此该脚本无法连接到正在运行的节点，且尚未被移植。
>
> 仍可在 Zallet 上通过命令行读取屏蔽备忘录：`zallet rpc z_listunspent` 会返回每个收到的屏蔽 note，并包含脚本读取的同一 `memoStr` 字段。请参阅 [Zallet 快速参考指南](/using-zcash/zallet-quick-reference-guide)了解该命令，并参阅 [迁移至 Zebra 和 Zallet](/guides/migration-guide-zcashd-to-zebrad-zallet) 的迁移指南，以将节点迁离 zcashd。Zallet 仍处于 beta 阶段。
>
> 本节作为 Magic-Wormhole 演示的历史记录予以保留。

以下介绍如何使用 Zcash 屏蔽备忘录，配合 Magic-Wormhole CLI 和 zcashd，从一台计算机向另一台计算机安全地发送文件！

<div className="my-8 w-full aspect-video max-w-3xl mx-auto rounded-2xl overflow-hidden shadow-lg bg-black">
  <iframe
    className="w-full h-full"
    src="https://www.youtube.com/embed/8iqPCza9o6A"
    title="DEMO: Encrypted File Transfer with Zcash 📁"
    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
    allowFullScreen
    loading="lazy"
  />
</div>

## 相关页面

- [支付请求 URI](/using-zcash/payment-request-uris)：将备忘录放入 `zcash:` 链接或二维码中。
- [交易](/using-zcash/transactions)：屏蔽和透明交易类型。
- [屏蔽池](/using-zcash/shielded-pools)：承载备忘录的屏蔽 note 所在之处。
- [钱包](/using-zcash/wallets)：使用屏蔽备忘录筛选器查找支持备忘录的钱包。
- [Zallet 快速参考指南](/using-zcash/zallet-quick-reference-guide)：通过命令行读取收到的备忘录。
- [Zcash 创作者工具](/using-zcash/creators-and-tips)：随打赏一同发送消息的打赏工具。

### 资源

[加密备忘录字段](https://electriccoin.co/blog/encrypted-memo-field/)

**最后更新：**2026 年 10 月
