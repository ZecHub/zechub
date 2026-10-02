<a href="https://github.com/zechub/zechub/edit/main/site/Using_Zcash/Solana_ZEC_to_Shielded.md" target="_blank">
  <img src="https://img.shields.io/badge/Edit-blue" alt="编辑页面"/>
</a>

# 在 Solana 上有 ZEC？将它转入屏蔽的 Zcash

如果你因持有 ZCAT 或另一种向持有人支付 ZEC 的 Solana 代币，而在 Solana 钱包中收到了 ZEC，本页面适合你。你无需卖出任何东西即可按此操作。你将把已持有的 ZEC 从 Solana 转入 Zcash 钱包，最终使其处于屏蔽状态。

我们于 2026 年 9 月 27 日使用 Phantom 中的 0.00266336 ZEC 进行了一笔真实转账，完成了以下每一个步骤。本页面中的费用、时间和界面均为我们实际所见。

---

## 你实际持有的是什么

你 Solana 钱包中的 ZEC 是 Solana 上的代币，并非 Zcash 网络上的币。NEAR OmniBridge 发行该代币，并在 Zcash 链上持有真实的 ZEC 作为支撑；该桥自 2025 年 10 月起已在 Solana 上运行。其 Solana 端依赖 Wormhole 消息和 NEAR Chain Signatures，而非 Zcash 轻客户端，因此 Solana 端的可靠性仅取决于这两个系统。人们称它为“纸面 ZEC”。它跟踪 ZEC 的价格，但每笔余额和转账都位于 Solana 公共账本中、归属你的钱包地址；只要它留在那里，就无法被屏蔽。

确认你持有的是真正的代币。在 Phantom 中，点按 **ZEC**，然后滚动至 **关于 Zcash**。合约地址必须为：

```
A7bdiYdS5GjqGFtxf17ppRHtDKPkkRqbKtR27dxvQXaS
```

![Phantom's About Zcash panel showing the contract address A7bd…QXaS on the Solana network](https://raw.githubusercontent.com/ZecHub/zechub/main/site/Using_Zcash/assets/solana-zec-to-shielded/01-phantom-zec-mint.png)

Phantom 会将其缩写为 `A7bd…QXaS`，因此请比对首尾字符，或在 [Solscan](https://solscan.io/token/A7bdiYdS5GjqGFtxf17ppRHtDKPkkRqbKtR27dxvQXaS) 上查询完整地址。你钱包中任何其他名为“ZEC”的代币，无论名称或徽标为何，都不是这个代币。不要动它。

---

## 为什么要转移它

屏蔽的 ZEC 正是 Zcash 的核心。当你的 ZEC 位于屏蔽池中时，每笔付款的发送方、接收方和金额都会在 Zcash 链上加密。任何浏览区块浏览器的人都无法看到你的余额。

你已持有 ZEC。将其转入 Zcash 钱包，你就能获得使它成为 Zcash 的那部分优势，并且不再依赖桥：你自己钱包中的原生 ZEC 不取决于任何人是否履行赎回。

[谁能看到你的 Zcash 付款？](/start-here/who-can-see-your-zcash-payment)准确说明了哪些信息会保持隐藏。

---

## 选择一个 Zcash 钱包

ZecHub 不会替你选择。请从 [ZecHub 钱包目录](/wallets) 中挑选，并在安装前检查钱包卡片上的两个标签：

- **Ironwood：已就绪。** 自 2026 年 7 月 28 日 [Ironwood 升级](/zcash-tech/ironwood)以来，新的屏蔽 ZEC 会进入 Ironwood 池。较旧的 Orchard 池不再接收新资金。
- **自动屏蔽。** 如果付款以透明方式到账，此功能会替你将该 ZEC 转入屏蔽池。不要将这个标签视为 **Ironwood：已就绪** 的替代品。钱包可以具有自动屏蔽功能，但仍缺少 Ironwood 池（目录中的 Edge 目前就是这种状态）。大多数其他钱包则显示 **屏蔽** 按钮。

请通过其目录卡片上的链接安装钱包，而不是通过搜索结果或广告。将助记词写在纸上，并离线保存。

你的钱包会显示两类地址：

![A Zcash wallet's Receive screen with a shielded address starting u1 and a transparent address starting t1](https://raw.githubusercontent.com/ZecHub/zechub/main/site/Using_Zcash/assets/solana-zec-to-shielded/02-zodl-receive.png)

| 开头 | 类型 | 公众能看到什么 |
|---|---|---|
| `u1` | Unified Address | 看不到任何有关你的信息，但前提是付款进入屏蔽池 |
| `t1` | 透明地址 | 你的地址和金额，永久可见，与 Solana 一样 |

请使用钱包标记为屏蔽的 `u1`。`u1` 是一组接收器的集合，部分钱包会在其中将透明接收器与屏蔽接收器并列。只能向透明地址付款的发送方会使用透明接收器，因此即使你粘贴了 `u1`，付款仍会公开到账。我们的测试钱包的屏蔽地址不含透明接收器，因此不会发生这种情况。[屏蔽池](/using-zcash/shielded-pools)更详细介绍了接收器。一些钱包会在你每次打开“接收”时显示新的 `u1`；这是正常现象，它们都属于你。因此，本页面的接收截图与 near.com 收款人字段使用了不同的 `u1` 前缀。

我们在测试中使用了 ZODL，因为这是我们已经设置好的钱包。只有目录标记为 **Ironwood：已就绪** 的钱包才能接收新的屏蔽价值。

---

## 转移它

该路径分为两部分：先从 Phantom 将你的 ZEC 存入 NEAR Intents，然后将其发送至你的 Zcash 地址。第一部分我们使用 [solswap.org](https://solswap.org)——一个面向 Solana 用户、由 NEAR 构建的网站；第二部分使用 [near.com](https://near.com)——NEAR 自己的应用。ZecHub 的 [如何在 Phantom Wallet 中兑换 ZEC](/using-zcash/solswap) 指南更详细介绍了 solswap 的界面。不要为此使用 Phantom 自己的 **兑换** 按钮：你已经持有该代币，兑换它不会带来任何结果。

在 Phantom 中保留少量 SOL 以支付 Solana 费用。

### 1. 在 solswap.org 存入你的 ZEC

1. 打开 Phantom，进入浏览器标签页，亲自输入 `solswap.org` 并连接你的钱包。
2. 点按 **存入**。将 **资产** 设置为 **Zcash**、**网络** 设置为 **Solana**，并将方式设置为 **钱包**。
3. 输入金额（或点按 **最大值**），并在 Phantom 中批准交易。

![solswap Deposit screen with Zcash as the asset, Solana as the network and Wallet as the method](https://raw.githubusercontent.com/ZecHub/zechub/main/site/Using_Zcash/assets/solana-zec-to-shielded/03-solswap-deposit.png)

我们的存款于 15:09:08（UTC+1）进入 Solana 区块，九秒后 solswap 将其显示为 **已完成**。

![solswap deposit history showing Completed, +0.0026 ZEC](https://raw.githubusercontent.com/ZecHub/zechub/main/site/Using_Zcash/assets/solana-zec-to-shielded/04-solswap-deposit-complete.png)

你的 ZEC 现在位于你的 NEAR Intents 余额中。你的 Phantom 密钥授权每一次转出操作，NEAR Intents 求解器负责执行交付，而 NEAR Intents 可以因合规审查而暂时持有余额（参见下方信任说明）。

### 2. 在 near.com 将它发送至你的 Zcash 地址

solswap 也有 **提取** 页面，但对我们无效。无论我们选择 Zcash 还是 Solana 作为网络，**收到金额** 和 **费用** 始终显示为“–”，按钮也没有任何反应。

![solswap Withdraw form with the received amount and fee stuck at a dash](https://raw.githubusercontent.com/ZecHub/zechub/main/site/Using_Zcash/assets/solana-zec-to-shielded/05-solswap-withdraw-blank.png)

如果你遇到这种情况，你的 ZEC 并没有被卡住。余额绑定于你钱包的密钥，而不是网站，因此你使用该钱包登录的任何 NEAR Intents 应用都能访问它。我们在 near.com 完成了操作：

1. 前往 `near.com`，并使用同一个 Phantom 钱包登录。
2. 你的 solswap 余额会显示在 **迁移旧资产** 下（near.com 将来自较旧 NEAR Intents 应用的余额称为“旧版”）。在 ZEC 所在行点按 **提取**。你不需要使用 **迁移**。

![near.com Move legacy assets page listing 0.0026 ZEC with Move and Withdraw buttons](https://raw.githubusercontent.com/ZecHub/zechub/main/site/Using_Zcash/assets/solana-zec-to-shielded/06-nearcom-legacy-assets.png)

3. 将 **网络** 设为 **Zcash**，在 **收款人** 中粘贴你钱包的 `u1` 地址，并与钱包比对前六个和后六个字符。

![near.com Withdraw legacy asset form with Zcash as the network and a u1 recipient, receive at least 0.00233164 ZEC, about 2 minutes](https://raw.githubusercontent.com/ZecHub/zechub/main/site/Using_Zcash/assets/solana-zec-to-shielded/07-nearcom-withdraw.png)

4. 点按 **审核提取**，阅读摘要后点按 **发送**。

![near.com Review send screen: network Zcash, recipient receives at least 0.00233164 ZEC, fee 0 ZEC, you pay 0.00266336 ZEC](https://raw.githubusercontent.com/ZecHub/zechub/main/site/Using_Zcash/assets/solana-zec-to-shielded/08-nearcom-review.png)

5. Phantom 会要求你为 near.com **签署消息**。此签名授权 NEAR Intents 转移你的余额。它不消耗 SOL，但这并不代表无害：仿冒网站可以显示相同请求，并借此清空你的 NEAR Intents 余额。点按 **确认** 前，请检查以下所有内容；若任一项不符，请点按 **取消**：
   - 请求中显示的网站是 `near.com`。（第 1 步的存款是来自 `solswap.org` 的普通 Phantom 交易请求；同样检查其中的名称。）
   - 打开 **消息**，找到 `"verifying_contract": "intents.near"`。
   - 消息应当是如截图所示的可读文本。如果它是无法阅读的数据块，或网站与地址栏中的网站不一致，请拒绝。
   - 它绝不会要求你的助记词。签名不涉及输入助记词。

![Phantom Sign Message request from near.com on the Solana network](https://raw.githubusercontent.com/ZecHub/zechub/main/site/Using_Zcash/assets/solana-zec-to-shielded/09-phantom-sign-message.png)

6. near.com 会显示 **正在处理发送**、**正在发送** 和 **完成**。**在浏览器中查看** 会打开该转账的 NEAR Intents 记录。

![near.com status screen: Sending 0.0023 ZEC, all three steps complete](https://raw.githubusercontent.com/ZecHub/zechub/main/site/Using_Zcash/assets/solana-zec-to-shielded/10-nearcom-complete.png)

![NEAR Intents explorer record: created 3:59:28 PM, withdrawn to the u1 address 4:07:55 PM, with the Zcash withdraw transaction ID](https://raw.githubusercontent.com/ZecHub/zechub/main/site/Using_Zcash/assets/solana-zec-to-shielded/11-intents-explorer.png)

### 我们的测试成本和所需时间

| | 我们的测试 |
|---|---|
| 从 Phantom 存入的 ZEC | 0.00266336 ZEC |
| Zcash 钱包中收到的 ZEC | 0.00241336 ZEC，已屏蔽 |
| ZEC 端成本 | 0.00025 ZEC（near.com 显示“费用 0 ZEC”；成本已计入报价） |
| 存款花费的 SOL | 0.00156844 SOL，其中 0.00008 SOL 是网络费用 |
| 最低限额 | 未触及。solswap 列出的最低存款额为 0.00000001 ZEC，near.com 接受了 0.0026 ZEC |
| 存款，从 Phantom 到 solswap | 9 秒 |
| 提取，从在 near.com 签名到 Zcash 钱包中的 ZEC | 约 8 分钟（near.com 估计约 2 分钟） |

记录：Solana 存款 [5ijsgRrh…AjLkx](https://solscan.io/tx/5ijsgRrhViNTtFMmnsfJDSo3HhRmt3Ri7WB513oBoQLxfGNswDxvHnakwW1yyqXznTTCSxnUkooAHDKowz9AjLkx)，NEAR Intents [79c23cfd…a405a9](https://explorer.near-intents.org/transactions/79c23cfd43928de5522c182e26f8f052dc9c43d53430ca497b40e016a6a405a9)，以及区块 3,498,141 中的 Zcash [28d6da27…481034](https://mainnet.zcashexplorer.app/transactions/28d6da27d74dc91e45175a7aff6023bc85578603dd77f1b49782a28f8f481034)。费用和时间会随网络负载变化，因此你操作时审核页面才是最终依据。

NEAR 的桥公布标准 Zcash 提取的最低额度为 0.01 ZEC、费用为 0.00047 ZEC。near.com 并未将两者应用于我们的 0.0026 ZEC。若某个应用拒绝小额金额，请先尝试 near.com，再进行充值。

### 其他路径及各自信任的对象

所有离开 Solana 的路径都信任 OmniBridge，因为该桥持有支撑你代币的 ZEC。除此之外：

- **上述路径**信任 NEAR Intents。你的签名授权转账，求解器在 Zcash 端交付 ZEC，而 NEAR Intents 可以因合规审查而暂时持有资金；2026 年，一名 Zcash 持有者 [报告称一笔大额兑换被搁置数周](https://www.cryptotimes.io/2026/09/11/zcash-holder-says-589k-usdt-stuck-on-near-intents-50-days-after-zodl-swap/)。你还会将钱包连接至两个网站，因此每次都要检查地址栏。
- **内置 NEAR Intents 的钱包**（在 NEAR Intents[目录](/wallets)中查找该功能）会在 Zcash 钱包内使用相同系统。信任关系相同，但访问的网站更少。我们未使用 Solana 上的 ZEC 测试此路径。
- **交易所**，仅当其接受在 Solana 网络上存入此代币时才可使用，而大多数并不接受。你会交出托管权，通常还需提供身份信息，且许多交易所仅向 `t1` 地址发送 ZEC。参见 [托管交易所](/using-zcash/custodial-exchanges)。

---

## 屏蔽它并进行检查

它已以屏蔽状态到账。我们的 ZEC 发送至 `u1` 地址，并直接进入 Ironwood 屏蔽池。没有透明步骤，也无需手动屏蔽。钱包在收集确认时，于 16:07（UTC+1）将其列为带屏蔽图标的 **正在接收…**。

![Zcash wallet activity showing Receiving 0.00241336 ZEC with a shield icon](https://raw.githubusercontent.com/ZecHub/zechub/main/site/Using_Zcash/assets/solana-zec-to-shielded/12-zodl-receiving.png)

若要自行检查，请在钱包中打开该交易并复制交易 ID。

![Zcash wallet transaction details with the transaction ID and timestamp](https://raw.githubusercontent.com/ZecHub/zechub/main/site/Using_Zcash/assets/solana-zec-to-shielded/13-zodl-tx-details.png)

将其粘贴到 [Zcash 区块浏览器](https://mainnet.zcashexplorer.app)中。不要被摘要误导。我们的摘要显示 **屏蔽输入 / 输出 0 / 0** 以及 **从/至屏蔽池转移 0.0 ZEC**，因为浏览器的摘要尚未统计 Ironwood。你看到的 `t1` 地址位于发送端（它花费的 ZEC 及保留的找零），并非你的地址。

![Explorer summary for the transaction: two transparent inputs, one transparent output, 0/0 shielded](https://raw.githubusercontent.com/ZecHub/zechub/main/site/Using_Zcash/assets/solana-zec-to-shielded/14-explorer-summary.png)

点击 **原始 TX：JSON** 并搜索 `ironwood`。其中的负 `valueBalance` 表示 ZEC 正在进入 Ironwood 池。我们的值为 `-0.00241336`，与实际到账金额完全一致，并且交易中没有任何内容显示接收者是谁。

![Raw transaction JSON with the ironwood section highlighted: valueBalance -0.00241336 (highlight added)](https://raw.githubusercontent.com/ZecHub/zechub/main/site/Using_Zcash/assets/solana-zec-to-shielded/15-explorer-raw-ironwood.png)

[区块浏览器能看到什么](/zcash-tech/what-a-block-explorer-can-see)解释了其余字段。

### 如果你粘贴了 `t1` 地址

我们没有发送到这种地址，但结果可以预见。ZEC 会进入你钱包的透明余额，浏览器将永久向所有人展示你的 `t1` 地址和金额。具有自动屏蔽功能的钱包随后会将其转入屏蔽池；否则请点按 **屏蔽**，这会产生少量网络费用。屏蔽交易同样是公开的，因为它从你的 `t1` 地址支出。不会损失任何资金，但该笔存款与你钱包之间的关联会保留在链上。请粘贴 `u1`。

---

## 保持安全

新持有人会成为定向目标。你会遇到的几乎所有诈骗都属于以下类型之一：

- **错误的地址类型。** Zcash 地址以 `u1`、`t1`、`zs` 或 `tex1` 开头。Solana 地址没有这些前缀。绝不要将原生 ZEC 发送到 Solana 地址，也绝不要将 Solana 代币发送到 Zcash 地址。
- **仅支持透明地址的服务。** 一些桥、兑换网站和交易所只能发送至 `t1` 地址。如果你在到账后立即屏蔽 ZEC，这仍可行。只是不要让它停留在那里。
- **假钱包。** 只能通过 [钱包目录](/wallets)卡片上的链接，或其指向的官方应用商店列表安装。假的加密货币钱包应用确实会混入应用商店，而且看起来与真品一模一样。
- **助记词钓鱼。** 没有钱包、桥、兑换网站、支持人员、版主或空投会需要你的助记词。签署消息绝不涉及输入助记词。任何索要助记词的人都在试图盗取你的资金。[恢复资金](/using-zcash/recovering-funds)介绍了这种诈骗中“我们会帮你找回钱包”的版本。
- **诈骗代币和“领取”网站。** 名为 ZEC、Zcash 或近似名称的代币会未经请求地出现在 Solana 钱包中，通常还附带一个“领取”更多代币的链接。将钱包连接到该链接可能会耗尽钱包资金。请核对本页面顶部的合约地址，并忽略其他一切。
- **恶意签名请求。** “签署消息”请求无需任何 SOL 费用即可转移你的 NEAR Intents 余额。仅在 `near.com` 或 `solswap.org` 上签名，并且仅当消息中提到 `intents.near` 时才签名（上方第 5 步说明了检查方法）。
- **仿冒网站。** 请亲自输入 `solswap.org` 和 `near.com`，或使用书签。不要点击私信、回复或广告中的链接。

---

## 可以如何使用屏蔽的 ZEC

- 私密地使用它：[私密使用 ZEC](/guides/using-zec-privately)
- 查找接受它的地点：[可消费 ZEC 的地点](/using-zcash/spend-zcash/top-10-places-to-spend-zec)
- 发送时附带一条私密消息：[备注](/using-zcash/memos)
- 在不关联身份的情况下付款给他人：[在不关联身份的情况下转账](/zcash-use-cases/send-money-without-linking-identity)
