# Zero to Zero Knowledge：透明 [Transparent] 与屏蔽 [Shielded] 交易 [Transactions] 及统一地址 [Unified Addresses]

**系列：** Zero to Zero Knowledge

如果你是第一次了解 Zcash，你会发现有两种可用的交易：**透明**和**屏蔽**。  

今天我们将了解它们，并介绍 #Zcash 生态系统中的一项新功能：**统一地址**。

---

## 透明与屏蔽交易

- **透明交易**使用 **t 地址**（Base58 编码）。所有内容都公开可见——就像 Bitcoin 一样。  
- **屏蔽交易**使用为 **Sapling** 或 **Orchard** pool [pools] 编码的地址 [addresses]。这些交易使用零知识 [zero-knowledge] 证明 [proofs] 隐藏发送方、接收方和金额。

**屏蔽交易**是指任何使用为 Sapling/Orchard pool 编码的地址的交易。

![Transparent vs Shielded intro](/content-images/FpmW00HWIAIZpQD-a244cfd85d.webp)

**统一地址（UAs）**旨在将屏蔽或透明交易**统一**到一个地址中。

---

## Zcash 中的地址类型

目前使用 3 种地址：

1. **（T）透明** – Base58  
2. **（Z）Sapling** – Bech32  
3. **（UA）统一地址** – Bech32m  

每种类型的字符数量（因此 QR 码大小）都会增加。

![Address types comparison](/content-images/FpmXe5bXsAEFeLY-704048927f.webp)

![QR code size comparison](/content-images/FpmXmDwXoAIWxov-dfc8346ffc.webp)

---

## 统一地址的工作原理

地址和密钥被编码为字节序列（**原始编码**）。  
**接收方编码**包含使用特定协议转移资产所需的全部信息。

统一地址的原始编码是接收方编码（类型代码、长度、地址）的组合：

- UA：`0x03`  
- Sapling：`0x02`  
- 透明：`0x01`  

**重要提示**：每个 UA 中必须至少有 **1 个屏蔽支付 [payment] 地址**。（Sprout 地址在 Canopy 升级后不再受支持。）

![UA encoding structure](/content-images/FpmYW1ZXgAAvALT-70903e29c6.webp)

完整规范：**[ZIP-316：统一地址](https://zips.z.cash/zip-0316)**

---

## 统一地址的优势

- **对交易所 [exchanges] 更简单**——它们现在可以更安全地支持屏蔽存款/提款。  
- **面向未来**——可以添加新的屏蔽池，而不会破坏钱包 [wallets]。  
- **默认屏蔽**——每个 UA 都包含至少 1 个屏蔽地址，因此隐私 [privacy] 始终可用。

这是一个根本性的转变，已在帮助更多 ZEC 进入屏蔽池。

---

## Orchard 交易与操作 [Actions]

Orchard 引入了一个名为**操作**的新概念：

- 它们通过为一笔交易中的所有操作使用**单一锚点**，减少元数据泄露。  
- 它们将（V4）Spend + Output 的字段合并为单个数值 commitment。  
- 这使 Halo2 证明系统能够进行性能优化。

Daira 解释锚点位置（zcon3）：

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

## 价值平衡与隐私

在某些情况下（例如跨 pool 交易），金额可能会对外部观察者可见。不过，`valueBalanceSapling` 和 `valueBalanceOrchard` 使用**同态 commitment**来证明屏蔽池中的 ZEC 总额，并防止伪造。

阅读更多：[ZIP 209：禁止超出范围的链价值 pool 余额](https://zips.z.cash/zip-0209)

---

## 未来改进

ECC 团队正在 `zcashd` 中开发新的 RPC 方法（取代 `z_sendmany`），让用户能够根据提议交易的隐私特征预览并接受/拒绝该交易。

---

## 推荐

此主题最初指向 **YWallet**，用于查看你点击发送前显示的交易计划。YWallet 已不再维护，也不会为 Ironwood 更新，因此它无法再跟随链。请改为从 [钱包](https://zechub.wiki/wallets)页面选择一个仍在维护的钱包，并优先选择会在交易发出前告知你交易将披露什么信息的钱包。

关于交易隐私的精彩文章：https://medium.com/@hanh.huynh/

---

**原始主题作者：ZecHub (@ZecHub)**  
https://x.com/ZecHub/status/1628498645627666432

---

*本页面根据原始 Zero to Zero Knowledge 主题为 ZecHub wiki 编写。*
