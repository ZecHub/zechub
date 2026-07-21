<a href="https://github.com/zechub/zechub/edit/main/site/guides/Using_ZEC_Privately.md" target="_blank">
  <img src="https://img.shields.io/badge/Edit-blue" alt="编辑页面"/>
</a>

# 私密地使用 ZEC

#### Shielded（私密）与 Transparent（透明）

目前，Zcash 中有两种地址和交易类型：shielded 和 transparent。shielded ZEC 与 transparent ZEC 的区别非常简单。shielded ZEC 会保护你的资金和交易隐私，而 transparent ZEC 的运作方式则像 Bitcoin 一样，完全透明。这意味着，如果别人知道你的地址，就可以查看你的余额以及你的所有交易。

人们刚开始使用 ZEC 时，可能并没有意识到自己使用的是哪一种地址。这是因为并非所有交易所都支持 shielded ZEC 和/或 shielded ZEC 提现。

举个例子，如果有人使用 Coinbase 并购买了 ZEC，那么他们买到的是 transparent ZEC，并且只能将这笔 ZEC 提现到钱包中的 transparent 地址。像 [ZODL](https://zodl.com/) 这样的钱包可以将发送到 transparent 地址的资金转为 shielded，从而解决这个问题，但并不是每个人都知道这一点。简单来说，很多人只是按照交易所或主要钱包允许的方式来使用 ZEC。

#### 确保你的 ZEC 处于 shielded 状态

我们建议每个人都自行保管自己的 ZEC。也就是说，把你的 ZEC 从交易所转移到钱包中。判断你是否在使用 shielded，也就是私密的 ZEC，最好的方法是查看余额所在的地址。如果地址以 “z” 或 “u1” 开头，那么你的余额就是 shielded 的。如果地址以 “t” 开头，那么余额就是 transparent 的。

一般来说，获得 shielded ZEC 有两种路径。

从支持 **shielded** 提现的交易所：

  1. 在交易所购买 ZEC
  2. 在交易所发起提现流程
  3. 打开你的 shielded ZEC 钱包，并确认收款地址以 “u1” 或 “z” 开头
  4. 从你的交易所执行提现

从支持 **transparent** 提现的交易所：


  1. 在交易所购买 ZEC
  2. 在交易所发起提现流程
  3. 打开你的自动 shielded ZEC 钱包，并使用 transparent 收款地址
  4. 从你的交易所执行提现
  5. 等待十次确认，然后将 ZEC 从你的 transparent 地址 shield 到 shielded 地址


下面是一个从交易所提取 ZEC 的教程。请注意，这是一次 shielded 提现。

<div className="my-8 w-full aspect-video max-w-3xl mx-auto rounded-2xl overflow-hidden shadow-lg bg-black">
  <iframe
    className="w-full h-full"
    src="https://www.youtube.com/embed/REUbkLzK7J4"
    title="从 Gemini 购买并将 ZEC 提现到 shielded 钱包"
    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
    allowFullScreen
    loading="lazy"
  />
</div>
    

---
下面是一个将你的 ZEC 从 transparent 地址 shield 到 shielded 地址的教程。

<div className="my-8 w-full aspect-video max-w-3xl mx-auto rounded-2xl overflow-hidden shadow-lg bg-black">
  <iframe
    className="w-full h-full"
    src="https://www.youtube.com/embed/W2msuzrxr3s"
    title="将你的 ZEC 从 transparent 地址 shield 到 shielded 地址"
    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
    allowFullScreen
    loading="lazy"
  />
</div>


---
下面是一个在 Coinbase 上购买 ZEC 并发送到 Zashi 的教程。

<div className="my-8 w-full aspect-video max-w-3xl mx-auto rounded-2xl overflow-hidden shadow-lg bg-black">
  <iframe
    className="w-full h-full"
    src="https://www.youtube.com/embed/Avweu5V9QRc"
    title="Coinbase + Zashi：购买 Zcash 并立即 Shield"
    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
    allowFullScreen
    loading="lazy"
  />
</div>


#### 交易

在确认你的 ZEC 已存放在支持 shielded 地址的 shielded 钱包中之后，你现在可以决定是否要使用这笔 ZEC 进行交易。使用 ZEC 进行交易非常简单。你可以根据对方的偏好，将 ZEC 发送到 shielded 地址或 transparent 地址。和任何金钱交易一样，人们仍然有很小的概率泄露数据。ZEC 在防止数据泄露方面表现最佳，但这并不意味着你可以毫无顾虑地使用它。以下是在使用 ZEC 交易时你应当避免的一些情况。

- 公开你的 shielded 地址
- 将 shielded 地址用作 t-addresses 的中转（也就是“混币”）
- 进行大量 shielded 到 transparent 的交易，并公开自己在进行这类交易
- 经常让别人知道你在哪里花费 shielded ZEC


归根结底，使用 ZEC 的最佳方式，是将其保存在 shielded 钱包中，在 shielded 地址之间交易，并谨慎对待你在公共场合如何使用 ZEC（例如咖啡馆）。保护隐私需要一定程度的责任感。

#### 资源

[Zcash 交易](https://zechub.wiki/using-zcash/transactions)
