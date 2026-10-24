<a href="https://github.com/zechub/zechub/edit/main/site/Using_Zcash/Memos.md" target="_blank">
  <img src="https://img.shields.io/badge/Edit-blue" alt="编辑页面"/>
</a>

# 备注

## TL;DR

* 备注是你附加到发送至屏蔽地址的付款中的短消息。它经过加密，因此监视 blockchain 的人无法读取它。
* 备注字段最多可容纳 512 字节的文本。
* 人们使用备注来说明付款是谁发送的、用途为何，或发送私密消息。
* 发送至透明地址的付款无法附带备注。
* [付款请求链接](/using-zcash/payment-request-uris)可以为你填入备注，以便商家标记每个订单。

## 核心说明

### 发送加密备注

发送 Z2Z（屏蔽到屏蔽）交易时，你可以在交易中附带备注（消息）。该备注可用于多种不同用途。

### 签署交易

备注主要用于签署付款。由于屏蔽交易会加密你的数据，你无法看到是谁向你发送了ZEC，也不知道ZEC可能是用于什么。用户可以在备注字段中签署自己的姓名或化名，让交易对方知道该交易来自谁。他们还可以说明该交易的用途。

### 发送消息

加密备注的另一种用途是向拥有 z-addr 的人发送消息。这些消息可以涉及任何内容，无论是[给朋友的提醒](https://twitter.com/iansagstette/status/1542142468505870336)，还是[需要尽可能保持私密的敏感消息](https://twitter.com/InsideZcash/status/1545800146352578560)。

### Blockchain 上的情书

曾有人在Zcash blockchain 最早的一些区块之一中，向伴侣发送了一封情书。有人发现，他们的伴侣通过Zcash备注向自己发送了一个文件。这个文件是一张海外特别活动的门票，她和远方的恋人此前一直在谈论要一起参加这个活动。这条备注是一封情书。

## 视觉化 / 类比

将屏蔽付款想象成一个装着钱的密封信封。备注则是一张与钱一同折进信封的便条。

blockchain 是邮局。它负责递送信封并记录其已送达，但绝不会打开它。打开信封的人会读到便条。透明付款则像明信片，因此没有可以折入便条的信封。

## 深入解析

### 备注可容纳什么内容

备注字段始终恰好为 512 字节。较短的文本备注会在加密前以零字节填充，因此每条备注在链上看起来大小都相同。

大多数备注都是纯 UTF-8 文本。[ZIP 302](https://zips.z.cash/zip-0302)还保留了以`0xF5`或更高字节开头的备注，以用于其他类型的数据；以`0xF6`开头并后接零的备注表示“无备注”。

交易中的每个屏蔽输出都携带各自的备注，因此一笔向多人付款的交易可以为每个人附带不同的便条。

### 高级内容

> **历史内容。此演示已无法按原样运行。**
>
> 以下演示使用zcashd，其[接收脚本](https://github.com/ZecHub/zechub/blob/main/site/tutorials/ZcashMagicWormhole/receiveOwlsWormhole.sh)通过`zcash-cli`读取备注。zcashd已于 2026 年 7 月 18 日达到其自动停止支持日期，因此该脚本无法连接到正在运行的节点，且尚未被移植。
>
> 仍可在Zallet上通过命令行读取屏蔽备注：`zallet rpc z_listunspent`会返回每个收到的屏蔽票据，其中包含与该脚本读取的相同`memoStr`字段。有关该命令，请参阅[Zallet快速参考指南](/using-zcash/zallet-quick-reference-guide)；有关将节点从zcashd迁移至Zebra和Zallet](/guides/migration-guide-zcashd-to-zebrad-zallet)，请参阅[迁移指南。Zallet仍处于 beta 阶段。
>
> 本节作为 Magic-Wormhole 演示的历史记录予以保留。

以下介绍如何使用Zcash屏蔽备注、Magic-Wormhole CLI 和zcashd，从一台计算机向另一台计算机安全地发送文件！

<div className="my-8 w-full aspect-video max-w-3xl mx-auto rounded-2xl overflow-hidden shadow-lg bg-black">
  <iframe
    className="w-full h-full"
    src="https://www.youtube.com/embed/8iqPCza9o6A"
    title="演示：使用 Zcash 进行加密文件传输 📁"
    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
    allowFullScreen
    loading="lazy"
  />
</div>

## 相关页面

- [付款请求 URI](/using-zcash/payment-request-uris)：将备注放入`zcash:`链接或二维码中。
- [交易](/using-zcash/transactions)：屏蔽和透明交易类型。
- [屏蔽池](/using-zcash/shielded-pools)：承载备注的屏蔽票据所在的位置。
- [钱包](/using-zcash/wallets)：使用屏蔽备注筛选器查找支持备注的钱包。
- [Zallet快速参考指南](/using-zcash/zallet-quick-reference-guide)：通过命令行读取收到的备注。
- [Zcash创作者工具](/using-zcash/creators-and-tips)：随打赏一同发送消息的打赏工具。

### 资源

[加密备注字段](https://electriccoin.co/blog/encrypted-memo-field/)

**最后更新：**2026 年 10 月
