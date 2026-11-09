<a href="https://github.com/zechub/zechub/edit/main/site/guides/Using_ZEC_Privately.md" target="_blank">
  <img src="https://img.shields.io/badge/Edit-blue" alt="Edit Page"/>
</a>

# 私密使用 ZEC

#### 屏蔽[Shielded]（私密）与透明[Transparent]

目前，Zcash 中有两种地址和交易[transaction]类型：屏蔽和透明。屏蔽与透明 ZEC 之间的区别非常简单。屏蔽 ZEC 可使你的资金和交易保持私密，而透明 ZEC 的运作方式与 Bitcoin 相同，完全透明。这意味着，如果有人知道你的地址，他们便可以查看你的余额和所有交易。

人们刚开始使用 ZEC 时，可能不会意识到自己正在使用哪种地址。这是因为并非所有交易所[exchange]都支持屏蔽 ZEC 和/或屏蔽 ZEC 提现。 

例如，如果有人使用 Coinbase 并购买 ZEC，他们购买的会是透明 ZEC，且只能将该 ZEC 提现至钱包中的透明地址。像 [Zodl](https://zodl.com/) 这样的钱包[wallet]可以将发送至透明地址的资金屏蔽，以解决这个问题，但并非每个人都知道这一点。简单来说，许多人会以其交易所或主要钱包所允许的方式使用 ZEC。

#### 确保你的 ZEC 已屏蔽

我们建议每个人都自行保管其 ZEC。这意味着将你的 ZEC 从交易所转移至钱包。判断你是否正在使用屏蔽，即私密的 ZEC 的最佳方法，是查看余额所在的地址。如果地址以 "z" 或 "u1" 开头，那么你的余额就是屏蔽的。如果地址以 "t" 开头，那么余额就是透明的。

通常有两种途径可获得屏蔽 ZEC。

从支持**屏蔽**提现的交易所：

  1. 在交易所购买 ZEC
  2. 在交易所开始提现流程
  3. 打开你的屏蔽 ZEC 钱包，并确认接收地址以 "u1" 或 "z" 开头
  4. 从你的交易所执行提现

从支持**透明**提现的交易所：


  1. 在交易所购买 ZEC
  2. 在交易所开始提现流程
  3. 打开你的自动屏蔽 ZEC 钱包，并使用透明接收地址
  4. 从你的交易所执行提现
  5. 等待十次确认，然后将你的 ZEC 从透明地址屏蔽至屏蔽地址


以下是如何从交易所提现 ZEC 的教程。请注意，这是一次屏蔽提现。

<div className="my-8 w-full aspect-video max-w-3xl mx-auto rounded-2xl overflow-hidden shadow-lg bg-black">
  <iframe
    className="w-full h-full"
    src="https://www.youtube.com/embed/REUbkLzK7J4"
    title="Buy and withdraw ZEC to a shielded wallet from Gemini"
    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
    allowFullScreen
    loading="lazy"
  />
</div>
    

---
以下是如何将你的 ZEC 从透明地址屏蔽至屏蔽地址的教程。

<div className="my-8 w-full aspect-video max-w-3xl mx-auto rounded-2xl overflow-hidden shadow-lg bg-black">
  <iframe
    className="w-full h-full"
    src="https://www.youtube.com/embed/W2msuzrxr3s"
    title="Shield your ZEC from a transparent to shielded address"
    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
    allowFullScreen
    loading="lazy"
  />
</div>


---
以下是如何在 Coinbase 上购买 ZEC 并发送至 Zodl 的教程。

<div className="my-8 w-full aspect-video max-w-3xl mx-auto rounded-2xl overflow-hidden shadow-lg bg-black">
  <iframe
    className="w-full h-full"
    src="https://www.youtube.com/embed/Avweu5V9QRc"
    title="Coinbase + Zashi: Buy Zcash & Shield Instantly"
    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
    allowFullScreen
    loading="lazy"
  />
</div>


#### 交易

在确认你的 ZEC 位于支持屏蔽地址的屏蔽钱包后，你现在可以决定是否要用该 ZEC 进行交易。使用 ZEC 进行交易非常简单。你可以根据对方的偏好，将 ZEC 发送至屏蔽或透明地址。与任何货币交易一样，人们有很小的概率会泄露数据。ZEC 最擅长防范数据泄露，但这并不意味着你可以毫无顾虑地使用它。以下是使用 ZEC 进行交易时应避免的一些事项。

- 泄露你的屏蔽地址
- 将屏蔽地址用作透明地址的中转站（即"混币"）
- 进行大量屏蔽至透明交易，并披露自己正在进行这些交易
- 经常让人们知道你在哪里花费屏蔽 ZEC


本质上，使用你的 ZEC 的最佳方式是将其存放在屏蔽钱包中，在屏蔽地址之间进行交易，并谨慎对待你在公共场所（例如咖啡店）使用 ZEC 的方式。保障隐私[privacy]需要承担一定责任。 

#### 资源

[Zcash 交易](https://zechub.wiki/using-zcash/transactions)
