# <img src="/content-images/programmer-software-engineer-coder-softw-bce5a0cb5b.svg" width="24" height="24" alt="developer icon"/> 使用屏蔽[Shielded] ZEC 私密支付 AI 服务

<span className="inline-flex items-center gap-[6px]">
  <span className="inline-block w-[12px] h-[12px] bg-green-500 rounded-full"></span>
  初学者 - 10 分钟
</span>


## TL;DR

- **NanoGPT** 直接接受屏蔽 ZEC，无需账户和电子邮件
- 最低充值[top up]金额为 **$0.10**，因此你可以用零花钱测试
- 余额将在首次确认后约 **30 秒**到账
- 对于不接受 ZEC 的服务，使用 **CrossPay** 消费屏蔽 ZEC，并让它们以 USDC 收款
- 链上[on-chain]最终显示的内容取决于**你的 ZEC 位于哪个 pool**，而屏幕从不会告诉你

<br/>

## <img src="/content-images/user-svgrepo-com-21adf62b7c.svg" width="24" height="24" className="inline-block align-middle mr-1 p-[2px]" alt="user icon"/> 这适合谁？

- 不想让 AI 订阅与自己姓名关联的任何人
- 没有公司卡却要为推理服务付费的开发者[developers]
- 无法向 AI 服务进行银行卡支付的国家中的用户
- 宁愿不交出电子邮件地址来试用模型的任何人

<br/>

## <img src="/content-images/warning-error-svgrepo-com-b7ea8a50da.svg" width="24" height="24" className="inline-block align-middle mr-1 p-[2px]" alt="warning icon"/> 问题所在

通常，为 AI 付费意味着需要银行卡、电子邮件和账户。这样会将你写的每条提示词与你的法定身份关联起来，支付处理商也能看到这些信息。

加密货币本应解决这个问题，但大多数指南已经过时。服务会改变其接受的支付方式，一年前编写的演练会把你带到一条如今已无法使用的路径上。

<br/>

## <img src="/content-images/icons8-lock-2f8e221321.svg" width="24" height="24" className="inline-block align-middle mr-1 p-[2px]" alt="lock icon"/> 为什么使用 Zcash？

屏蔽支付会隐藏发送方、接收方和金额。服务能够收到款项，而观察链的人无法得知是谁支付了多少钱。

只有当你**从**屏蔽资金中支付时，这一点才成立。本页会明确说明它何时成立、何时不成立。

<br/>

## <img src="/content-images/icons8-toolbox-9bebbb1619.svg" width="24" height="24" className="inline-block align-middle mr-1 p-[2px]" alt="toolbox icon"/> 你需要准备什么

- 屏蔽余额中的 ZEC
- 可向统一地址发送资金的钱包[wallet]。本演练使用浏览器扩展 **Noir Wallet**，因此整个流程都在一个窗口内完成。Zkool 和 Zodl 的使用方式相同
- 约 $1 用于跟随操作

> **从交易所[exchange]转入？** 大多数交易所，包括 Binance，只能将 ZEC 提现至**透明[transparent]**地址，并且不接受以 `u1...` 地址作为目标地址。请先提现到你自己的透明地址，在钱包中将其屏蔽，然后从屏蔽余额中支付。

<br/>

## <img src="/content-images/ladder-svgrepo-com-7232bf46ed.svg" width="24" height="24" className="inline-block align-middle mr-1 p-[2px]" alt="step icon"/> 路径 1：直接支付 NanoGPT

[NanoGPT](https://nano-gpt.com/) 提供 200 多种模型，包括 GPT、Claude、Gemini 和图像模型，并原生接受 ZEC。

### 第 1 步：打开它，无需注册

前往 nano-gpt.com 并开始使用。每个会话默认都是匿名的，应用本身也这样说明：*"你已经在私密使用 NanoGPT。"* 无需创建账户，也无需交出电子邮件。

### 第 2 步：先保存登录 token

在充值前，打开**设置**并创建一个登录 token[令牌]，然后将其存放在安全的地方。

> **这一步保护你的资金。** 匿名余额存储在浏览器的本地数据中。如果没有保存 token 就清除 Cookie，余额就会消失，而且没有可用于恢复它的账户。请在充值前完成此操作，而不是之后。

### 第 3 步：添加余额

打开**余额**，选择**自定义**，然后输入金额。最低金额为 **$0.10**，最高金额为 $5,000。NanoGPT 会告诉你这些钱能买什么：$1 大约可购买 12 条 GPT 5.5 提示词或 18 张图像。

![NanoGPT add balance screen showing the custom amount and the ten cent minimum](/content-images/nanogpt-add-balance-acc74a4e6d.webp)

### 第 4 步：选择 Zcash

选择**数字货币**，然后从网格中选择**Zcash**。

你会获得一个二维码、一个支付地址，以及针对所选金额以 ZEC 计价的**最低转账金额**。该数值按页面加载时的价格计算。

![NanoGPT Zcash deposit screen with the QR code, unified address and transfer minimum](/content-images/nanogpt-zec-deposit-bd1980d2f7.webp)

### 第 5 步：从你的钱包发送

将地址复制到你的钱包，输入金额并发送。网络手续费[fee]约为 **0.00015 ZEC**。

> **发送略高于最低金额。** 报价按页面加载时的价格计算，而 ZEC 可能会在你的交易[transaction]确认前发生变动。测试中，恰好发送最低金额最终到账 **$0.99**，而不是 $1.00。由于 NanoGPT 会按你实际发送的金额入账，略多发送一些，同样名义上的 $1 最终到账了 $1.17。

![Noir Wallet send screen with the NanoGPT address pasted in and the network fee shown](/content-images/noir-send-6380a5f4ef.webp)

### 第 6 步：等待约 30 秒

你的钱包会显示交易待处理，然后显示确认。NanoGPT 会在**首次确认**时将余额入账，因此你无需等待全部三次确认。

![Wallet confirmation showing the amount sent and the transaction hash](/content-images/noir-sent-2d476e94b9.webp)

余额会显示出来，你可以立即使用。

![NanoGPT balance page showing the credited amount and deposit history](/content-images/nanogpt-balance-0b0c0c86ba.webp)

<br/>

## <img src="/content-images/send-svgrepo-com-b62f643de0.svg" width="24" height="24" className="inline-block align-middle mr-1 p-[2px]" alt="send icon"/> 路径 2：不接受 ZEC 的服务

大多数 AI 服务不接受 ZEC。**Venice.ai** 和 **OpenRouter** 都改为接受 USDC，而 OpenRouter 允许你选择结账在哪条链[chain]上结算。

对于这些服务，请在 [Zodl](/zcash-organizations/zodl) 中使用 **CrossPay**。你消费屏蔽 ZEC，接收方则以其要求的资产收款；资金通过 NEAR Intents 路由，无需中心化交易所，也无需 KYC。

1. 获取服务的支付地址，以及它要求的资产和链，例如位于 Base 上的 USDC
2. 打开 Zodl 并选择**CrossPay**
3. 输入该地址，选择服务需要的资产，并输入金额
4. 从你的屏蔽余额发送

你的 ZEC 会以屏蔽方式离开。服务会看到一笔普通的 USDC 支付到账，且永远不会知道它起初是 ZEC。

> 兑换[swap]环节在目标链上可见，因此 USDC 支付本身和其他任何 USDC 支付一样公开。保持私密的是 Zcash 一侧，以及两者之间的关联。

<br/>

## <img src="/content-images/triangle-exclamation-7a4c4150be.svg" width="24" height="24" className="inline-block align-middle mr-1 p-[2px]" alt="warning icon"/> 每一步会泄露什么

这是大多数指南略过的部分。

| 发生的情况 | 服务会获知什么 | 链上会显示什么 |
|---|---|---|
| 浏览和发送提示词 | 无。没有账户，没有电子邮件 | 无 |
| 签发充值地址 | 无 | 无 |
| 你**从 Sapling 支付** | 你使用的充值地址 | 无。屏蔽到屏蔽 |
| 你**从 Ironwood 支付** | 相同 | **金额和区块高度** |
| 你从透明地址支付 | 相同 | 金额和你的 t 地址 |
| 以上任一情况 | 你的 IP，除非你使用 Tor 或 VPN | 不适用 |

### 为什么 pool 很重要

NanoGPT 的充值地址是统一地址。对 2026 年 8 月签发的一个地址进行解码后，显示恰好有两个接收器：**Sapling** 和 **Orchard**。

自 [Ironwood](/zcash-tech/ironwood) 升级于 2026 年 7 月 28 日激活后，Orchard 只能用于支出，无法再有新价值进入其中。因此，**Sapling 是支付实际能够到账的唯一接收器**。

因此，如果你的 ZEC 已位于 Sapling，该支付就是从 Sapling 到 Sapling，且其任何信息都不会公开。但如果你已迁移到 Ironwood，支付会让价值跨越 pool 边界，而 [turnstile](/zcash-tech/the-turnstile) 会公开金额和高度，即使发送方和接收方仍然隐藏。

无论哪种情况，屏幕看起来都完全相同。保留一小笔 Sapling 余额用于支付是最简单的解决办法。

<br/>

## <img src="/content-images/icons8-cancel-7f786be3c1.svg" width="24" height="24" className="inline-block align-middle mr-1 p-[2px]" alt="cancel icon"/> 应避免的常见错误

- 保存登录 token 前就充值，随后清除了 Cookie
- 恰好发送最低转账金额，结果差了 1 美分
- 尝试从交易所直接提现到 `u1...` 地址
- 未检查从哪个 pool 支出，就假定支付是私密的
- 当核心目的就是避免被识别时，却通过普通网络连接支付

<br/>

## <img src="/content-images/checked-checkbox-svgrepo-com-7ea19022da.svg" width="28" height="28" className="inline-block align-middle mr-1 p-[2px]" alt="done icon"/> 结果

你可以：

- 无需账户、电子邮件或银行卡即可使用前沿 AI 模型
- 使用屏蔽 ZEC 支付，并准确了解这会隐藏什么、不会隐藏什么
- 通过 CrossPay 接入从未听说过 Zcash 的服务

<br/>

## <img src="/content-images/chain-for-links-svgrepo-com-117ee0dec1.svg" width="24" height="24" className="inline-block align-middle mr-1 p-[2px]" alt="chain-links icon"/> 相关内容

- [Ironwood](/zcash-tech/ironwood) - 为什么你的资金所在 pool 已发生变化
- [The Turnstile](/zcash-tech/the-turnstile) - 价值跨越 pool 时哪些内容会公开
- [钱包](/using-zcash/wallets) - 哪些钱包仍在维护
- [ZODL](/zcash-organizations/zodl) - CrossPay 背后的钱包

<br/>

## <img src="/content-images/progress-arrows-svgrepo-com-aad76739e5.svg" width="24" height="24" className="inline-block align-middle mr-1 p-[2px]" alt="progress icon"/> 进度

**第 1 步，共 1 步**

你已使用屏蔽 ZEC 为 AI 服务付费，并且知道这揭示了什么。

<br/>

## 下一步

- [在不关联身份的情况下汇款](/zcash-use-cases/send-money-without-linking-identity)

<br/>
