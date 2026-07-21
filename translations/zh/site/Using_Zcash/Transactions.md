<a href="https://github.com/zechub/zechub/edit/main/site/Using_Zcash/Transactions.md" target="_blank">
  <img src="https://img.shields.io/badge/Edit-blue" alt="编辑页面"/>
</a>


# 交易

ZEC 是一种被广泛用于支付的数字资产，具备强大的隐私特性，适用于多种交易场景，例如给朋友付款、购物或捐赠。为了最大限度地保障隐私和安全，理解 Zcash 中不同类型交易的工作方式至关重要。

## 屏蔽交易

<div className="my-8 w-full aspect-video max-w-3xl mx-auto rounded-2xl overflow-hidden shadow-lg bg-black">
  <iframe
    className="w-full h-full"
    src="https://www.youtube.com/embed/bZM3o_eIovU"
    title="Zcash 详解：Zcash 屏蔽交易"
    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
    allowFullScreen
    loading="lazy"
  />
</div>

---

当你将 ZEC 转入屏蔽钱包时，就会发生屏蔽交易。你的屏蔽钱包地址以 U 或 Z 开头。发送屏蔽交易时，你和与你交易的人都能保持其他 P2P 支付网络无法实现的一定程度的隐私。发送屏蔽交易非常简单，你只需要确保两件事。第一是你使用的是正确类型的钱包。确保使用正确类型钱包的最简单方法，就是下载一个[钱包](https://zechub.wiki/wallets)。第二个重要事项是将 ZEC 转入屏蔽钱包。从交易所提取 ZEC 时，你需要了解该交易所是否支持屏蔽提现或透明提现。如果支持屏蔽提现，你只需将 ZEC 提现到你的屏蔽地址即可。如果交易所只支持透明提现，那么你需要使用 YWallet，并在收到后自动将你的 ZEC 屏蔽化。仅使用屏蔽交易来发送和接收资金，是维护隐私并降低数据泄露风险的最佳方式

## 透明交易

透明交易的运作方式类似，但缺乏隐私保护，因此交易细节会在区块链上公开可见。当隐私是优先事项时，应避免使用透明交易。注意：透明钱包可能会因 ZIP-317 而遇到问题，因为它要求手续费与交易复杂度成比例。默认手续费可能导致交易被拒绝或延迟，因此自定义手续费非常关键。

<div className="my-8 w-full aspect-video max-w-3xl mx-auto rounded-2xl overflow-hidden shadow-lg bg-black">
  <iframe
    className="w-full h-full"
    src="https://www.youtube.com/embed/R-krX1UpsIg"
    title="了解 🛡️Zcash 屏蔽钱包！"
    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
    allowFullScreen
    loading="lazy"
  />
</div>


### 管理透明交易的手续费

ZIP-317 指南：手续费结构会随着交易复杂度增加而提高，因此需要在标准 0.00001 ZEC 手续费之外进行调整。
计算示例：一笔简单的单 note 交易可能需要 0.0001 ZEC 手续费，每增加一个 note，大约再增加 0.00005 ZEC。

在钱包中编辑手续费

Trust Wallet：创建交易时，点击齿轮图标进入高级设置。请谨慎调整 Miner Tip Gwei 和 Max Fee Gwei 字段，以避免交易失败。Trust Wallet 仅收取网络手续费。
Coinomi Wallet：根据网络状况提供 Low、Normal、High 三种动态手续费选项。若需手动调整，可在支持的币种中选择 Custom，或使用右上角的 Change Fee。用户可以按每字节或每千字节设置手续费，这会影响确认时间。如果不确定，建议使用动态选项。

此版本纳入了手续费管理指南、动态手续费选项，以及 Trust Wallet 和 Coinomi 的自定义设置，为用户提供了全面的手续费控制说明。

#### 资源

[ZIPS](https://zips.z.cash/)

#### 注意

请注意，使用 ZEC 最安全的方式是仅使用屏蔽交易。部分钱包正在实现 [unified addresses](https://electriccoin.co/blog/unified-addresses-in-zcash-explained/#:~:text=The%20unified%20address%20(UA)%20is,within%20the%20broader%20Zcash%20ecosystem.)，这允许用户和交易所将透明地址与屏蔽地址结合在一起。 

## ZEC 转 ZAT 转换器
