<a href="https://github.com/zechub/zechub/edit/main/site/Using_Zcash/Transactions.md" target="_blank">
  <img src="https://img.shields.io/badge/Edit-blue" alt="Edit Page"/>
</a>


# 交易

ZEC 是一种被广泛用于支付的数字资产，具备强大的隐私特性，因此非常适合朋友间转账、购物支付或捐赠等各种交易场景。为了最大限度地保障隐私和安全，理解 Zcash 中不同类型交易的运作方式至关重要。

## 简要总结

- Zcash 支持两种交易：**shielded**（屏蔽交易），可隐藏交易细节；以及 **transparent**（透明交易），会将交易细节公开记录。
- Shielded 地址以 `u` 或 `z` 开头。Transparent 地址以 `t` 开头，其行为很像 Bitcoin 地址。
- 每一笔支付都由你自己选择。隐私是 Zcash 赋予你的选项，而不是别人替你决定的设置。
- 从交易所提现，是人们最常失去隐私的环节。如果交易所只支持透明提现，那么资金到账后请自行将其转入 shielded 状态。
- 手续费遵循 [ZIP 317](https://zips.z.cash/zip-0317)，并会随着交易规模增大而增加。仍在使用旧版固定手续费的钱包，可能会导致交易延迟。

## Shielded 交易

<div className="my-8 w-full aspect-video max-w-3xl mx-auto rounded-2xl overflow-hidden shadow-lg bg-black">
  <iframe
    className="w-full h-full"
    src="https://www.youtube.com/embed/bZM3o_eIovU"
    title="Zcash Explained: Zcash Shielded Transactions"
    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
    allowFullScreen
    loading="lazy"
  />
</div>

---

当你将 ZEC 转入你的 shielded 钱包时，就会发生 shielded 交易。你的 shielded 钱包地址以 U 或 Z 开头。发送 shielded 交易时，你是在确保你自己以及与你交易的人，都能获得其他 P2P 支付网络无法提供的一定程度的隐私。发送 shielded 交易非常简单，你只需要确认两件事。第一，是你使用了正确类型的钱包。确保自己使用正确钱包类型的最简单方法，就是下载一个 [钱包](https://zechub.wiki/wallets)。第二个重要点，是将 ZEC 转入 shielded 钱包。从交易所提取 ZEC 时，你需要确认该交易所支持的是 shielded 提现还是 transparent 提现。如果它支持 shielded 提现，你只需直接将 ZEC 提现到你的 shielded 地址即可。如果交易所只支持 transparent 提现，那么你需要使用 YWallet，并在收到 ZEC 后将其自动转入 shielded 状态。只使用 shielded 交易来发送和接收资金，是维护隐私、降低数据泄露风险的最佳方式。

## Transparent 交易

Transparent 交易的运作方式类似，但缺乏隐私保护，因此交易细节会在 blockchain 上公开可见。当隐私是首要考虑时，应避免使用 transparent 交易。注意：Transparent 钱包可能会因为 ZIP-317 而遇到问题，因为该规则要求手续费与交易复杂度成比例。默认手续费可能导致交易被拒绝或延迟，因此自定义手续费至关重要。

<div className="my-8 w-full aspect-video max-w-3xl mx-auto rounded-2xl overflow-hidden shadow-lg bg-black">
  <iframe
    className="w-full h-full"
    src="https://www.youtube.com/embed/R-krX1UpsIg"
    title="Learn 🛡️Zcash shielded wallets!"
    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
    allowFullScreen
    loading="lazy"
  />
</div>

## 一个简单的理解方式

Transparent 交易就像一张明信片。邮递员会把它送达，但沿途任何经手的人都可以读到信息、看到是谁寄出的，也能看到收件人是谁。

Shielded 交易则像一个密封信封。邮政系统仍然可以确认，确实有一封真实的信件、贴着真实邮资，经过了整个系统，而且没有人能伪造它，也不能把同一封信寄两次。至于信封里装了什么，只有发送方和接收方知道。

重要的是，Zcash 让你可以逐笔决定发送哪一种。

## 管理 Transparent 交易的手续费

ZIP-317 指南：手续费结构会随着交易复杂度而变化，因此需要高于标准 0.00001 ZEC 手续费的调整。
计算示例：一笔简单的单 note 交易可能需要 0.0001 ZEC 手续费，而每增加一个 note，手续费大约会再增加 0.00005 ZEC。

在钱包中编辑手续费

Trust Wallet：创建交易时，点击齿轮图标即可进入高级设置。请谨慎调整 Miner Tip Gwei 和 Max Fee Gwei 字段，以避免交易失败。Trust Wallet 只收取网络手续费。
Coinomi Wallet：根据网络状况提供三种动态手续费选项：Low、Normal、High。若需手动调整，可在支持的币种上选择 Custom，或使用右上角的 Change Fee。用户可以按每字节或每千字节设置手续费，这会影响确认时间。如果你不确定，建议使用动态选项。

## 常见错误

- **以为任何列出 ZEC 的钱包都能私密发送。** 许多多币种钱包只支持 Zcash 的 transparent 部分。在依赖它提供隐私之前，请先检查该钱包支持哪些资金池。[钱包](https://zechub.wiki/using-zcash/wallets) 页面列出了每个选项的相关信息。
- **提现到 transparent 地址后就把资金留在那里。** 这次提现本身就是公开的，而此后从该地址发起的每一次转移也都会继续保持公开。资金到账后请尽快将其转入 shielded 状态。
- **把隐私当成一次性开启的设置。** 每一笔交易都是一次独立选择。你今天发送 shielded 交易，并不能抹去你上周进行的 transparent 支付。
- **反复将同一个 transparent 地址用于所有用途。** 由于 transparent 活动会被永久公开看到，一个被重复使用的地址，会逐渐把原本没有理由互相关联的支付串联起来。
- **使用过时的默认手续费发送交易。** 尚未采用 ZIP 317 的钱包，可能仍会使用旧版固定手续费，这会导致交易长时间处于未确认状态。

## 注意

请注意，使用 ZEC 最安全的方式是只使用 shielded 交易。一些钱包正在实现 [unified addresses](https://electriccoin.co/blog/unified-addresses-in-zcash-explained/#:~:text=The%20unified%20address%20(UA)%20is,within%20the%20broader%20Zcash%20ecosystem.)，这使用户和交易所能够将 transparent 地址与 shielded 地址结合在一起使用。

## 资源

[ZIPS](https://zips.z.cash/)

## 相关页面

- [钱包](/using-zcash/wallets) — 哪些钱包支持 shielded 发送，哪些仅支持 transparent
- [Shielded 资金池](/using-zcash/shielded-pools) — Sapling 和 Orchard，也就是你的 shielded 资金所在的资金池
- [备注](/using-zcash/memos) — 可随 shielded 交易一同传送的加密消息
- [透明交易所地址](/using-zcash/transparent-exchange-addresses) — TEX 地址，以及交易所为何使用它们
- [托管型交易所](/using-zcash/custodial-exchanges) — 哪些交易所支持 shielded 提现

## ZEC 到 ZAT 转换器
