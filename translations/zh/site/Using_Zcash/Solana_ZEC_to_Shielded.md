<a href="https://github.com/zechub/zechub/edit/main/site/Using_Zcash/Solana_ZEC_to_Shielded.md" target="_blank">
  <img src="https://img.shields.io/badge/Edit-blue" alt="编辑页面"/>
</a>

# 在 Solana 上获得了 ZEC？将其转入屏蔽的 Zcash

如果你持有 ZCAT 或另一种以 ZEC 向持有人支付的 Solana 代币，并且 Solana 钱包中出现了 ZEC，此页面适合你。你无需出售任何东西即可完成操作。你将把已有的 ZEC 从 Solana 转移到 Zcash 钱包，最终使其成为屏蔽状态。

我们于 2026 年 9 月 27 日使用真实转账完成了以下每一步，起始资金为 Phantom 中的 0.00266336 ZEC。本页的手续费、时间和界面均为我们实际看到的结果。

---

## 简要说明

- 你 Solana 钱包中的 ZEC 是一种 **Solana 代币**（铸造地址为 `A7bd…QXaS`），由 NEAR OmniBridge 在 Zcash 链上持有的真实 ZEC 按 1:1 支持——它是存在于 Solana 公开账本上、无法在该处屏蔽的"纸质 ZEC"。
- 此路径分两步：先在 solswap.org（NEAR Intents）存入代币，然后在 near.com 将其**提现**至你钱包的屏蔽 `u1` 地址。不要使用 Phantom 自己的兑换按钮——它无法帮你完成此操作。
- 使用 [ZecHub 目录](/wallets)中标记为 **Ironwood：就绪**的钱包，并在 Phantom 中保留少量 SOL 以支付 Solana 手续费。
- 我们的真实测试（2026 年 9 月 27 日，0.00266336 ZEC）：存入在 9 秒内到账，提现约耗时 8 分钟，总成本约为 0.00025 ZEC + 0.0016 SOL。
- 安全底线：只在 `near.com`/`solswap.org` 上签署消息请求，且消息中必须包含 `intents.near`；绝不输入助记词；粘贴 `u1`，绝不粘贴 `t1`。

## 视觉类比

Solana 上的 ZEC 就像一枚**赌场筹码**。它的价格与现金一致，而赌场——NEAR OmniBridge——承诺向归还筹码的人兑换真实钞票（原生 ZEC）。但筹码只是赌场账本中的一行记录：所有人都能看到谁持有它，其价值取决于赌场系统是否保持稳健。通过 near.com 提现，就像走到兑换柜台将筹码兑换成现金。一旦钞票进入屏蔽 pool，它们就处于你自己的不透明钱包中——其他人将无法再看到金额或持有人。

---

## 你实际持有的是什么

你 Solana 钱包中的 ZEC 是 Solana 上的代币，而不是 Zcash 网络上的币。NEAR OmniBridge 发行该代币，并在 Zcash 链上持有真实 ZEC 作为支持；该桥自 2025 年 10 月起已在 Solana 上运行。它的 Solana 部分依赖 Wormhole 消息和 NEAR Chain Signatures，而不是 Zcash 轻客户端，因此 Solana 一侧的可靠性仅取决于这两个系统。人们称它为"纸质 ZEC"。它跟踪 ZEC 的价格，但每一笔余额和转账都位于 Solana 公开账本中你的钱包地址下，只要它仍留在那里，就无法被屏蔽。

请确认你的是真实代币。在 Phantom 中，点击 **ZEC** 并滚动至 **关于 Zcash**。合约地址必须为：

```
A7bdiYdS5GjqGFtxf17ppRHtDKPkkRqbKtR27dxvQXaS
```

![Phantom's About Zcash panel showing the contract address A7bd…QXaS on the Solana network](/content-images/01-phantom-zec-mint-4a718bc213.webp)

Phantom 会将其缩写为 `A7bd…QXaS`，因此请比对首尾字符，或在 [Solscan](https://solscan.io/token/A7bdiYdS5GjqGFtxf17ppRHtDKPkkRqbKtR27dxvQXaS) 中查询完整地址。钱包中任何其他名为"ZEC"的代币，无论名称或图标为何，都不是这个代币。不要操作它。

---

## 为什么要转移它

屏蔽的 ZEC 正是 Zcash 的意义所在。当你的 ZEC 位于屏蔽 pool 中时，每笔支付的发送方、接收方和金额都会在 Zcash 链上加密。浏览区块浏览器的人无法看到你的余额。

你已经持有 ZEC。将其转入 Zcash 钱包，可以获得使其成为 Zcash 的那部分价值，同时将桥移出等式：你自己钱包中的原生 ZEC 不依赖任何人兑现赎回。

[谁能看到你的 Zcash 支付？](/start-here/who-can-see-your-zcash-payment)准确说明了哪些信息仍会隐藏。

---

## 选择一个 Zcash 钱包

ZecHub 不会替你选择。请从 [ZecHub 钱包目录](/wallets)中选择，并在安装前检查钱包卡片上的两个标签：

- **Ironwood：就绪。** 自 2026 年 7 月 28 日 [Ironwood 升级](/zcash-tech/ironwood)以来，Ironwood 是新的屏蔽 ZEC 进入的 pool。较旧的 Orchard pool 已不再接受新资金。
- **自动屏蔽。** 如果支付以透明方式到账，此功能会为你将该 ZEC 转入屏蔽 pool。不要将此标签视为 **Ironwood：就绪**的替代品。钱包可能具有自动屏蔽功能，却仍缺少 Ironwood pool（Edge 目前在目录中正是这种状态）。大多数其他钱包会显示一个 **屏蔽** 按钮。

请从目录卡片上的链接安装钱包，而不是通过搜索结果或广告安装。将助记词写在纸上并离线保存。

你的钱包会显示两种地址：

![A Zcash wallet's Receive screen with a shielded address starting u1 and a transparent address starting t1](/content-images/02-zodl-receive-c98cd378fb.webp)

| 开头为 | 类型 | 公开可见的信息 |
|---|---|---|
| `u1` | 统一地址 | 与你有关的信息均不可见，但前提是支付进入屏蔽 pool |
| `t1` | 透明地址 | 你的地址及金额，永久可见，如同在 Solana 上一样 |

请使用钱包标记为屏蔽的 `u1`。`u1` 是接收器的组合，某些钱包会在屏蔽接收器旁加入透明接收器。只能向透明地址支付的发送方会使用透明接收器，即使你粘贴了 `u1`，支付也会公开到账。我们的测试钱包的屏蔽地址没有透明接收器，因此不会发生这种情况。[屏蔽池](/using-zcash/shielded-pools)更详细地介绍了接收器。有些钱包每次打开接收页面都会显示一个新的 `u1`；这是正常的，它们都属于你。因此，本页的接收截图和 near.com 收款人字段使用了不同的 `u1` 前缀。

我们在测试中使用了 ZODL，因为它是我们已经设置好的钱包。只有目录中标记为 **Ironwood：就绪**的钱包才能接收新的屏蔽价值。

---

## 转移它

该路径分为两部分：先从 Phantom 将你的 ZEC 存入 NEAR Intents，然后将其发送至你的 Zcash 地址。第一部分我们使用了 [solswap.org](https://solswap.org)，这是一个由 NEAR 构建、面向 Solana 用户的网站；第二部分使用了 [near.com](https://near.com)，即 NEAR 自己的应用。ZecHub 的 [如何在 Phantom Wallet 中兑换 ZEC](/using-zcash/solswap)指南更详细介绍了 solswap 的界面。不要为此使用 Phantom 自己的 **兑换** 按钮：你已经持有代币，兑换它无法带来任何结果。

请在 Phantom 中保留少量 SOL 以支付 Solana 手续费。

### 1. 在 solswap.org 存入你的 ZEC

1. 打开 Phantom，转到浏览器标签页，亲自输入 `solswap.org`，然后连接你的钱包。
2. 点击 **存入**。将 **资产** 设置为 **Zcash**，将 **网络** 设置为 **Solana**，并将方式设为 **钱包**。
3. 输入金额（或点击 **最大值**），然后在 Phantom 中批准交易。

![solswap Deposit screen with Zcash as the asset, Solana as the network and Wallet as the method](/content-images/03-solswap-deposit-425691e62f.webp)

我们的存入在 15:09:08（UTC+1）进入 Solana 区块，9 秒后 solswap 显示为 **已完成**。

![solswap deposit history showing Completed, +0.0026 ZEC](/content-images/04-solswap-deposit-complete-be5feaf758.webp)

你的 ZEC 现在位于你的 NEAR Intents 余额中。你的 Phantom 密钥会授权每一次转出，NEAR Intents 求解器执行交付，而 NEAR Intents 可因合规审查而冻结余额（参见下方信任说明）。

### 2. 在 near.com 将其发送至你的 Zcash 地址

solswap 也有一个 **提现** 页面，但它对我们无效。无论我们将网络选为 Zcash 还是 Solana，**收到金额**和**手续费**都一直显示"–"，按钮也毫无反应。

![solswap Withdraw form with the received amount and fee stuck at a dash](/content-images/05-solswap-withdraw-blank-92c6e64c65.webp)

如果你也遇到这种情况，你的 ZEC 并没有卡住。余额绑定于你钱包的密钥，而不是网站，因此任何你通过该钱包登录的 NEAR Intents 应用都可以访问它。我们在 near.com 完成了操作：

1. 前往 `near.com`，并使用相同的 Phantom 钱包登录。
2. 你的 solswap 余额会显示在 **移动旧版资产**下方（near.com 将来自较旧 NEAR Intents 应用的余额称为"旧版"）。在 ZEC 行点击 **提现**。你不需要点击 **移动**。

![near.com Move legacy assets page listing 0.0026 ZEC with Move and Withdraw buttons](/content-images/06-nearcom-legacy-assets-7ee16c5ac4.webp)

3. 将 **网络** 设置为 **Zcash**，把你的钱包 `u1` 地址粘贴为**收款人**，并根据钱包核对前后 6 个字符。

![near.com Withdraw legacy asset form with Zcash as the network and a u1 recipient, receive at least 0.00233164 ZEC, about 2 minutes](/content-images/07-nearcom-withdraw-724ef22b38.webp)

4. 点击 **审核提现**，阅读摘要后点击 **发送**。

![near.com Review send screen: network Zcash, recipient receives at least 0.00233164 ZEC, fee 0 ZEC, you pay 0.00266336 ZEC](/content-images/08-nearcom-review-b6053f675b.webp)

5. Phantom 会要求你为 near.com **签署消息**。此签名授权 NEAR Intents 移动你的余额。它不花费 SOL，但这不代表无害：仿冒网站可以显示同样的请求，并用它清空你的 NEAR Intents 余额。点击 **确认** 前，请检查以下全部项目；任何一项不符合就点击 **取消**：
   - 请求中显示的网站是 `near.com`。（第 1 步的存入是来自 `solswap.org` 的普通 Phantom 交易请求；同样检查其中的网站名称。）
   - 打开 **消息** 并找到 `"verifying_contract": "intents.near"`。
   - 消息应当是与截图相似的可读文字。如果它是不可读的数据块，或网站与地址栏中的网站不一致，请拒绝。
   - 它绝不会要求你的助记词。签署从不需要输入助记词。

![Phantom Sign Message request from near.com on the Solana network](/content-images/09-phantom-sign-message-cb1ce6d20f.webp)

6. near.com 会显示 **正在处理发送**、**正在发送** 和 **完成**。**在浏览器中查看** 会打开这笔转账的 NEAR Intents 记录。

![near.com status screen: Sending 0.0023 ZEC, all three steps complete](/content-images/10-nearcom-complete-c641093c46.webp)

![NEAR Intents explorer record: created 3:59:28 PM, withdrawn to the u1 address 4:07:55 PM, with the Zcash withdraw transaction ID](/content-images/11-intents-explorer-f93f87814e.webp)

### 我们的测试成本和耗时

| | 我们的测试 |
|---|---|
| 从 Phantom 存入的 ZEC | 0.00266336 ZEC |
| 在 Zcash 钱包中收到的 ZEC | 0.00241336 ZEC，已屏蔽 |
| ZEC 一侧的成本 | 0.00025 ZEC（near.com 显示"手续费 0 ZEC"；成本已计入报价） |
| 存入花费的 SOL | 0.00156844 SOL，其中 0.00008 SOL 为网络手续费 |
| 最低金额 | 未触及。solswap 列出的最低存入额为 0.00000001 ZEC，near.com 接受 0.0026 ZEC |
| 存入，从 Phantom 到 solswap | 9 秒 |
| 提现，从 near.com 签署到 Zcash 钱包中的 ZEC | 约 8 分钟（near.com 估计约 2 分钟） |

记录：Solana 存入 [5ijsgRrh…AjLkx](https://solscan.io/tx/5ijsgRrhViNTtFMmnsfJDSo3HhRmt3Ri7WB513oBoQLxfGNswDxvHnakwW1yyqXznTTCSxnUkooAHDKowz9AjLkx)，NEAR Intents [79c23cfd…a405a9](https://explorer.near-intents.org/transactions/79c23cfd43928de5522c182e26f8f052dc9c43d53430ca497b40e016a6a405a9)，Zcash [28d6da27…481034](https://mainnet.zcashexplorer.app/transactions/28d6da27d74dc91e45175a7aff6023bc85578603dd77f1b49782a28f8f481034)，位于区块 3,498,141。手续费和时间会随网络负载变化，因此你操作时审核界面中的信息才是最终依据。

NEAR 的桥针对其标准 Zcash 提现公布了 0.01 ZEC 的最低金额和 0.00047 ZEC 的手续费。near.com 没有将任何一项应用于我们 0.0026 ZEC 的测试。如果应用拒绝小额金额，请在充值前先尝试 near.com。

### 其他路径及各自信任的对象

所有离开 Solana 的路径都信任 OmniBridge，因为桥持有支持你代币的 ZEC。此外：

- **上述路径**信任 NEAR Intents。你的签名授权转移，求解器在 Zcash 一侧交付 ZEC，而 NEAR Intents 可因合规审查冻结资金；2026 年，一名 Zcash 持有人 [报告了一笔被扣留数周的大额兑换](https://www.cryptotimes.io/2026/09/11/zcash-holder-says-589k-usdt-stuck-on-near-intents-50-days-after-zodl-swap/)。你还会将钱包连接至两个网站，因此每次都要检查地址栏。
- **内置 NEAR Intents 的钱包**（请在 NEAR Intents[目录](/wallets)中查找该功能）会从 Zcash 钱包内部使用相同系统。信任假设相同，但需要访问的网站更少。我们没有在 Solana 上使用 ZEC 测试此方式。
- **交易所**，但前提是它接受在 Solana 网络上存入此代币，而大多数交易所不接受。你将交出托管权，通常还要交出身份信息；许多交易所只会将 ZEC 发送至 `t1` 地址。请参阅 [托管交易所](/using-zcash/custodial-exchanges)。

---

## 屏蔽并检查

它以屏蔽状态到账。我们的 ZEC 被发送至 `u1` 地址，并直接进入 Ironwood 屏蔽 pool。没有透明步骤，也无需手动屏蔽。钱包在收集确认时，于 16:07（UTC+1）将其列为带有屏蔽图标的 **正在接收…**。

![Zcash wallet activity showing Receiving 0.00241336 ZEC with a shield icon](/content-images/12-zodl-receiving-cb9f41511d.webp)

要自行检查，请在钱包中打开交易并复制交易 ID。

![Zcash wallet transaction details with the transaction ID and timestamp](/content-images/13-zodl-tx-details-b08434d680.webp)

将其粘贴到 [Zcash 区块浏览器](https://mainnet.zcashexplorer.app)。不要被摘要误导。我们的摘要显示 **屏蔽输入 / 输出 0 / 0** 和 **从/向屏蔽 pool 转移 0.0 ZEC**，因为浏览器摘要尚未统计 Ironwood。你看到的 `t1` 地址位于发送方一侧（它花费的 ZEC 以及保留的找零），并非你的地址。

![Explorer summary for the transaction: two transparent inputs, one transparent output, 0/0 shielded](/content-images/14-explorer-summary-6153afb265.webp)

点击 **原始 TX：JSON**，然后搜索 `ironwood`。其中负数的 `valueBalance` 表示 ZEC 正在进入 Ironwood pool。我们的数值是 `-0.00241336`，与实际到账金额完全一致，并且交易中没有任何信息显示接收者是谁。

![Raw transaction JSON with the ironwood section highlighted: valueBalance -0.00241336 (highlight added)](/content-images/15-explorer-raw-ironwood-8ff8ae0892.webp)

[区块浏览器能看到什么](/zcash-tech/what-a-block-explorer-can-see)解释了其他字段。

### 如果你粘贴了 `t1` 地址

我们没有向此类地址发送，但结果是可预测的。ZEC 会进入你钱包的透明余额，浏览器将永久向任何人显示你的 `t1` 地址和金额。具备自动屏蔽功能的钱包随后会将其转入屏蔽 pool；否则请点击 **屏蔽**，这会产生少量网络手续费。屏蔽交易也是公开的，因为它从你的 `t1` 地址花费资金。不会损失任何资金，但该笔存入与你钱包之间的关联会保留在链上。请粘贴 `u1`。

---

## 保持安全

新持有人会成为攻击目标。你看到的几乎每一种骗局都属于以下之一：

- **错误的地址类型。** Zcash 地址以 `u1`、`t1`、`zs` 或 `tex1` 开头。Solana 地址不具有这些前缀。绝不要将原生 ZEC 发送至 Solana 地址，也绝不要将 Solana 代币发送至 Zcash 地址。
- **仅支持透明地址的服务。** 某些桥、兑换网站和交易所只能发送至 `t1` 地址。如果 ZEC 一到账便立即屏蔽，这仍然可行。但不要把它留在那里。
- **假钱包。** 只能从 [钱包目录](/wallets)卡片上的链接，或其指向的官方应用商店列表安装。假的加密钱包应用确实会混入应用商店，而且外观与正版完全一样。
- **助记词钓鱼。** 任何钱包、桥、兑换网站、支持人员、管理员或空投都不需要你的助记词。签署消息从不需要输入它。任何索要助记词的人都在试图盗取你的资产。[恢复资金](/using-zcash/recovering-funds)介绍了这种骗局中"我们会恢复你的钱包"的版本。
- **诈骗代币和"领取"网站。** 名为 ZEC、Zcash 或类似名称的代币会未经请求地出现在 Solana 钱包中，通常附带一个用于"领取"更多代币的链接。将钱包连接至该链接可能会被清空。检查本页顶部的合约地址，并忽略其他所有内容。
- **恶意签名请求。** "签署消息"请求可以在不收取 SOL 手续费的情况下移动你的 NEAR Intents 余额。只在 `near.com` 或 `solswap.org` 上签署，并且仅当消息中提到 `intents.near` 时才签署（上方第 5 步说明了检查方法）。
- **仿冒网站。** 请亲自输入 `solswap.org` 和 `near.com`，或使用书签。不要点击私信、回复或广告中的链接。

---

## 常见错误

- **使用 Phantom 的兑换按钮**，而不是存入流程。你已经持有该代币——兑换只会把一种纸质 ZEC 换成另一种代币，无法让你更接近原生 ZEC。
- **粘贴 `t1` 地址**，或者粘贴含有透明接收器的 `u1`，而你的钱包明明提供了仅屏蔽的 `u1`。存入将公开到账，并永久与你的钱包关联。
- **在 solswap 的提现页面显示"–"时以为资金卡住了。** 余额跟随你的 Phantom 密钥，而不是网站——请在 near.com 完成提现。
- **未经检查就签署消息。** 仿冒网站可以通过一个签名清空你的 NEAR Intents 余额。网站必须是 `near.com`，且消息必须包含 `"verifying_contract": "intents.near"`。
- **混淆两个"ZEC"代码。** Solana 代币和原生 Zcash ZEC 名称相同但网络不同——将任一资产发送到另一条链都会丢失。

## 如何使用屏蔽的 ZEC

- 私密地使用它：[私密使用 ZEC](/guides/using-zec-privately)
- 寻找接受它的地点：[可使用 ZEC 的地点](/using-zcash/spend-zcash/top-10-places-to-spend-zec)
- 附带私密消息发送：[备忘录](/using-zcash/memos)
- 在不关联身份的情况下付款：[发送资金而不关联身份](/zcash-use-cases/send-money-without-linking-identity)

---

## 相关页面

- [如何在 Phantom Wallet 中兑换 ZEC](/using-zcash/solswap) — 更详细介绍 solswap 界面
- [屏蔽池](/using-zcash/shielded-pools) — Ironwood/Orchard pool 是什么，以及接收器如何工作
- [谁能看到你的 Zcash 支付？](/start-here/who-can-see-your-zcash-payment) — 屏蔽实际隐藏了什么
- [钱包](/wallets) — 钱包目录；请检查 **Ironwood：就绪**标签
- [托管交易所](/using-zcash/custodial-exchanges) — 此路径所避免的权衡
- [恢复资金](/using-zcash/recovering-funds) — 应妥善保存哪些信息，确保永不失去访问权限
