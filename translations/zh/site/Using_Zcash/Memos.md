<a href="https://github.com/zechub/zechub/edit/main/site/Using_Zcash/Memos.md" target="_blank">
  <img src="https://img.shields.io/badge/Edit-blue" alt="编辑页面"/>
</a>

# 备忘录

#### 发送加密备忘录

发送一笔 Z2Z（shielded-to-shielded）交易时，你可以在交易中附带一条 memo（消息）。这条 memo 可用于多种不同用途。

#### 签署交易

memo 主要用于给付款署名。由于 shielded 交易会加密你的数据，因此你无法看到是谁向你发送了 ZEC，也无法知道这些 ZEC 可能是用来做什么的。用户可以使用 memo 字段签上自己的姓名或化名，让交易对方知道这笔交易是谁发出的。他们也可以说明这笔交易的用途。

#### 发送消息

加密 memo 的另一种用途，是向拥有 z-addr 的某人发送一条消息。这些消息可以是任何内容，无论是给朋友的[提醒](https://twitter.com/iansagstette/status/1542142468505870336)，还是一条[需要尽可能保持私密的敏感消息](https://twitter.com/InsideZcash/status/1545800146352578560)。

#### 区块链上的情书

曾经有人在 Zcash 区块链最早的几个区块之一中，给自己的伴侣发送了一封情书。后来有人发现，他们的伴侣曾通过一条 Zcash memo 给他们发送过一个文件。这个文件是一张海外特别活动的门票，而她和远方的爱人一直在讨论要一起去参加。那条 memo 就是一封情书。

#### 进阶

以下演示了如何将 Zcash Shielded Memos 与 Magic-Wormhole CLI 和 zcashd 配合使用，以便安全地把文件从一台电脑发送到另一台电脑！：

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

#### 资源

[加密备忘录字段](https://electriccoin.co/blog/encrypted-memo-field/)
