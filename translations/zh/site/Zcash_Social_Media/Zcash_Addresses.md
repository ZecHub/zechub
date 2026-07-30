# 从零到零知识：Transparent 与 Shielded 交易及 Unified Addresses

**系列：** 从零到零知识

如果你是第一次了解 Zcash，你会发现这里有两种可用的交易类型：**Transparent** 和 **Shielded**。  

今天我们来学习它们，并介绍 #Zcash 生态中的一项新功能：**Unified Addresses**。

---

## Transparent 与 Shielded 交易

- **Transparent Transactions** 使用 **t-addresses**（Base58 编码）。所有内容都是公开可见的——就像 Bitcoin 一样。  
- **Shielded Transactions** 使用为 **Sapling** 或 **Orchard** 池编码的地址。它们利用零知识证明隐藏发送方、接收方和金额。

**Shielded Transaction** 指任何使用为 Sapling/Orchard 池编码地址的交易。

![Transparent 与 Shielded 简介](https://pbs.twimg.com/media/FpmW00HWIAIZpQD.jpg)

**Unified Addresses (UAs)** 旨在将 shielded 或 transparent 交易**统一**到一个地址中。

---

## Zcash 中的地址类型

目前有 3 种正在使用的地址类型：

1. **(T) Transparent** – Base58  
2. **(Z) Sapling** – Bech32  
3. **(UA) Unified Address** – Bech32m  

字符数量（因此二维码尺寸）会随着类型依次增加。

![地址类型对比](https://pbs.twimg.com/media/FpmXe5bXsAEFeLY.png)

![二维码尺寸对比](https://pbs.twimg.com/media/FpmXmDwXoAIWxov.png)

---

## Unified Addresses 的工作原理

地址和密钥会被编码为一个字节序列（**Raw Encoding**）。  
**Receiver Encoding** 包含使用特定协议转移资产所需的全部信息。

Unified Address 的原始编码，是多个接收器编码（typecode、length、addr）的组合：

- UA: `0x03`  
- Sapling: `0x02`  
- Transparent: `0x01`  

**重要**：每个 UA 中必须**至少包含一个 shielded payment address**。（Sprout 地址在 Canopy 升级后已不再受支持。）

![UA 编码结构](https://pbs.twimg.com/media/FpmYW1ZXgAAvALT.png)

完整规范：**[ZIP-316: Unified Addresses](https://zips.z.cash/zip-0316)**

---

## Unified Addresses 的优势

- **对交易所更容易**——它们现在可以更安全地支持 shielded 充值/提现。  
- **面向未来**——新的 shielded 池可以在不破坏钱包兼容性的情况下加入。  
- **默认 Shielded**——每个 UA 至少包含一个 shielded 地址，因此隐私始终可用。

这是一次根本性的转变，已经在帮助更多 ZEC 进入 shielded 池。

---

## Orchard 交易与 Actions

Orchard 引入了一个名为 **Actions** 的新概念：

- 它们通过在一笔交易中的所有 Actions 使用**单一 anchor**，减少元数据泄露。  
- 它们将（V4）Spend + Output 的字段合并为单一的 value commitment。  
- 这使 Halo2 证明系统的性能优化成为可能。

Daira 对 Anchor 位置的解释（zcon3）：

<div className="my-8 w-full aspect-video max-w-3xl mx-auto rounded-2xl overflow-hidden shadow-lg bg-black">
  <iframe
    className="w-full h-full"
    src="https://www.youtube.com/embed/f6UToqiIdeY"
    title="Zcon3"
    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
    allowFullScreen
    loading="lazy"
  />
</div>

---

## Value Balance 与隐私

在某些情况下（例如跨池交易），金额可能对外部观察者可见。不过，`valueBalanceSapling` 和 `valueBalanceOrchard` 使用**同态承诺**来证明 shielded 池中的 ZEC 总量，并防止伪造。

延伸阅读：[防御 Shielded Pools 中的伪造](https://electriccoin.co/blog/defense-against-counterfeiting-in-shielded-pools/)

---

## 未来改进

ECC 团队正在 `zcashd` 中开发新的 RPC 方法（替代 `z_sendmany`），让用户能够根据拟议交易的隐私特征预览，并接受或拒绝该交易。

---

## 推荐

试试最新版的 **YWallet**！  
它已经会在你点击发送前在屏幕上显示“Transaction Plan”，帮助你做出更具隐私性的选择。

关于交易隐私的精彩文章：https://medium.com/@hanh.huynh/

---

**原始线程来自 ZecHub (@ZecHub)**  
https://x.com/ZecHub/status/1628498645627666432

---

*本页根据 ZecHub wiki 的原始“Zero to Zero Knowledge”线程整理编写。*
