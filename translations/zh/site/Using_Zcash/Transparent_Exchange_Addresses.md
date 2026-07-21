# 什么是 Zcash TEX 地址？

Zcash TEX 地址表示一种独特的接收地址类型。它是 “Transparent Exchange” 地址的缩写，是对单个 p2pkh Transparent 地址进行的**唯一**、Unified 类型（bech32m）编码。

它的唯一用途是通知兼容钱包发起一笔仅 Transparent 的交易（T -> T）。

其逻辑如下：检测到 TEX 地址后，兼容钱包会对其解码，以获取其中包含的 Transparent 接收器。随后，钱包会先将该笔交易所需资金从 Shielded 池发送到一个由用户控制的临时 Transparent 地址（Z -> T）。然后，再将这些资金发送到 TEX 地址解码得到的 Transparent 接收器（T -> T）。

TEX 地址的技术提案详见 Zcash [ZIP 320](https://zips.z.cash/zip-0320)，其中定义了一种专门用于从 Transparent 地址接收资金的地址类型。

![TEX](https://i.ibb.co/8m7HPqV/ZashiTex.png)

尽管 TEX 地址尚未被广泛采用，但 Zcash 用户最终可能会被要求使用它们。

## 我什么时候需要 TEX 地址

### 当你使用一个不支持直接发送到 Transparent 地址的钱包，向 Transparent 地址发送资金时，你**需要**一个 TEX 地址。
某些钱包根本不允许直接向 Transparent 地址发送资金，且**接收方可能不会提供对应的 TEX 地址**。因此，有时可能需要将 Transparent 地址**转换**为 TEX 地址。你可以通过运行 zip-320 中概述的参考实现来手动完成这一点。一个托管的 **Transparent-to-TEX-Converter** 实例可在[这里](https://690e9524c66a3ecac5d54eff--jade-brioche-873777.netlify.app/)找到。

### 当你向一个**要求这些资金必须来自 Transparent 来源**的中心化交易所发送资金时，你需要一个 TEX 地址。
目前，[Binance](https://www.binance.com/) 是唯一使用 TEX 地址的中心化交易所（而且这也是创建 TEX 的主要原因）。
TEX 地址会通知兼容钱包，发送到该地址的所有资金都必须是透明的，并排除任何被发送到该地址的 Shielded 数值。
如果像 Binance 这样的交易所拒绝已发送的数值，它就具备将该数值退回到其来源地址的必要手段。这也有助于 Binance 这样的实体遵守政府或其他主管机构施加的法律和法规。

## 哪些钱包支持 TEX 地址？

你可以在我们的 [钱包](https://zechub.wiki/wallets) 页面查看最新列表。使用 **TEX 地址筛选器。**
