# <img src="/content-images/programmer-software-engineer-coder-softw-bce5a0cb5b.svg" width="24" height="24" alt="developer icon"/> 使用屏蔽 ZEC 私密支付 AI 服务

<span className="inline-flex items-center gap-[6px]">
  <span className="inline-block w-[12px] h-[12px] bg-green-500 rounded-full"></span>
  初学者 - 10 分钟
</span>


## TL;DR

- **NanoGPT** 直接接受屏蔽 ZEC，无需账户，也无需电子邮箱
- 最低充值仅为 **$0.10**，你可以用零花钱先试试
- 余额大约会在 **30 秒**内到账，在第一次确认后即可
- 对于不接受 ZEC 的服务，可使用 **CrossPay** 花费屏蔽 ZEC，并让对方以 USDC 收款
- 最终在链上会暴露什么，取决于你的 ZEC **位于哪个资金池中**，而界面不会告诉你这一点

<br/>

## <img src="/content-images/user-svgrepo-com-21adf62b7c.svg" width="24" height="24" className="inline-block align-middle mr-1 p-[2px]" alt="user icon"/> 这适合谁？

- 任何不想让 AI 订阅与你真实身份绑定的人
- 无需公司信用卡也要为推理服务付费的开发者
- 所在国家对 AI 服务的银行卡支付经常失败的人
- 任何只是想试用模型，不愿交出电子邮箱的人

<br/>

## <img src="/content-images/warning-error-svgrepo-com-b7ea8a50da.svg" width="24" height="24" className="inline-block align-middle mr-1 p-[2px]" alt="warning icon"/> 问题所在

通常，给 AI 付费意味着要用银行卡、电子邮箱和账户。这会把你写下的每一条提示词都和你的法定身份绑定起来，支付处理商也能看到这些信息。

Crypto 本该解决这个问题，但大多数指南都已经过时。服务方接受哪些支付方式会变化，而一年前写的教程，今天可能只会把你带上一条已经走不通的路。

<br/>

## <img src="/content-images/icons8-lock-2f8e221321.svg" width="24" height="24" className="inline-block align-middle mr-1 p-[2px]" alt="lock icon"/> 为什么选择 Zcash？

一笔屏蔽支付会隐藏发送方、接收方和金额。服务方照样能收到款，而盯着链上看的人无法知道是谁付的钱，也不知道付了多少。

但前提是你必须**从**屏蔽资金中付款。本页会明确说明什么时候这个前提成立，什么时候不成立。

<br/>

## <img src="/content-images/icons8-toolbox-9bebbb1619.svg" width="24" height="24" className="inline-block align-middle mr-1 p-[2px]" alt="toolbox icon"/> 你需要准备什么

- 处于**屏蔽**余额中的 ZEC
- 一个能够向 unified address 发送资金的钱包。本教程使用 **Noir Wallet** 浏览器扩展，因此整个流程都能在同一个窗口中完成。Zkool 和 ZODL 的操作方式也一样
- 大约 $1 用于跟做演示

> **从交易所提现吗？** 大多数交易所（包括 Binance）只支持将 ZEC 提现到**透明**地址，而且不会接受 `u1...` 地址作为目标地址。请先提到你自己的透明地址，再在钱包里把它转入屏蔽池，然后从屏蔽余额中付款。

<br/>

## <img src="/content-images/ladder-svgrepo-com-7232bf46ed.svg" width="24" height="24" className="inline-block align-middle mr-1 p-[2px]" alt="step icon"/> 路线 1：直接向 NanoGPT 付款

[NanoGPT](https://nano-gpt.com/) 提供 200 多个模型，包括 GPT、Claude、Gemini 和图像模型，并且原生支持接受 ZEC。

### 第 1 步：打开它，无需注册

前往 nano-gpt.com 并开始使用。每个会话默认都是匿名的，应用本身也明确写着：*"You are already using NanoGPT privately."* 无需创建账户，也无需提供电子邮箱。

### 第 2 步：先保存登录令牌

在你充值之前，打开 **Settings**，创建一个登录令牌，然后把它保存在安全的地方。

> **这一步是在保护你的钱。** 匿名余额保存在浏览器的本地数据中。如果你没有先保存令牌就清除 cookies，余额就会消失，而且由于没有账户，也无法找回。一定要在充值前做这件事，不要等充值后。

### 第 3 步：充值余额

打开 **Balance**，选择 **Custom**，然后输入金额。最低为 **$0.10**，最高为 $5,000。NanoGPT 会告诉你这些钱大致能买到什么，比如 $1 大约可以买 12 次 GPT 5.5 提示或 18 张图片。

![NanoGPT 充值页面，显示自定义金额和一角钱的最低限额](/content-images/nanogpt-add-balance-acc74a4e6d.webp)

### 第 4 步：选择 Zcash

选择 **Digital currencies**，然后在列表中点击 **Zcash**。

你会看到一个二维码、一个收款地址，以及针对你所选金额的 **transfer minimum**（最低转账额，以 ZEC 计）。这个数值是在页面加载时按当时价格计算出来的。

![NanoGPT 的 Zcash 充值页面，显示二维码、unified address 和最低转账额](/content-images/nanogpt-zec-deposit-bd1980d2f7.webp)

### 第 5 步：从你的钱包发送

把地址复制到你的钱包中，输入金额并发送。网络手续费大约是 **0.00015 ZEC**。

> **发送金额请略高于最低限额。** 报价是在页面加载时确定的，而在你的交易确认前，ZEC 价格可能已经波动。测试中，发送刚好等于最低限额时，实际只到账了 **$0.99** 而不是 $1.00。稍微多发一点，同样名义上的 $1 最终到账了 $1.17，因为 NanoGPT 按你实际发送的金额记账。

![Noir Wallet 发送页面，已粘贴 NanoGPT 地址，并显示网络手续费](/content-images/noir-send-6380a5f4ef.webp)

### 第 6 步：等待大约 30 秒

你的钱包会先显示交易待处理，随后进入确认状态。NanoGPT 会在**第一次确认**后入账，因此你不必等满三次确认。

![钱包确认界面，显示已发送金额和交易哈希](/content-images/noir-sent-2d476e94b9.webp)

余额到账后，你就可以立即使用。

![NanoGPT 余额页面，显示已到账金额和充值历史](/content-images/nanogpt-balance-0b0c0c86ba.webp)

<br/>

## <img src="/content-images/send-svgrepo-com-b62f643de0.svg" width="24" height="24" className="inline-block align-middle mr-1 p-[2px]" alt="send icon"/> 路线 2：用于不接受 ZEC 的服务

大多数 AI 服务都不接受 ZEC。**Venice.ai** 和 **OpenRouter** 都接受 USDC，而 OpenRouter 还允许你选择结账时在哪条链上完成结算。

对于这类情况，可以在 [ZODL](/zcash-organizations/zodl) 中使用 **CrossPay**。你花费的是屏蔽 ZEC，而收款方收到的是他们要求的资产，整个过程通过 NEAR Intents 路由完成，无需中心化交易所，也无需 KYC。

1. 获取服务方的收款地址，以及它要求的资产和链，例如 Base 上的 USDC
2. 打开 ZODL 并选择 **CrossPay**
3. 输入该地址，选择服务方需要的资产，并输入金额
4. 从你的屏蔽余额中发送

你的 ZEC 会离开屏蔽池。服务方看到的只是一次普通的 USDC 入账，永远不会知道这笔款最初来自 ZEC。

> 兑换那一段会在目标链上可见，因此 USDC 支付本身和其他任何 USDC 支付一样是公开的。真正保持私密的是 Zcash 这一侧，以及两者之间的关联。

<br/>

## <img src="/content-images/triangle-exclamation-7a4c4150be.svg" width="24" height="24" className="inline-block align-middle mr-1 p-[2px]" alt="warning icon"/> 每一步会暴露什么

这是大多数指南都会跳过的部分。

| 发生了什么 | 服务方会知道什么 | 链上会出现什么 |
|---|---|---|
| 浏览与发送提示词 | 什么都不知道。无账户、无电子邮箱 | 什么都没有 |
| 签发充值地址 | 什么都不知道 | 什么都没有 |
| 你**从 Sapling** 付款 | 你使用的充值地址 | 什么都没有。屏蔽到屏蔽 |
| 你**从 Ironwood** 付款 | 同上 | **金额和区块高度** |
| 你**从透明地址**付款 | 同上 | 金额和你的 t-address |
| 上述任意一种情况 | 你的 IP，除非你使用 Tor 或 VPN | 不适用 |

### 为什么资金池很重要

NanoGPT 的充值地址是一个 unified address。对 2026 年 8 月签发的地址进行解码后，可以看到其中恰好有两个接收器：**Sapling** 和 **Orchard**。

自 [Ironwood](/zcash-tech/ironwood) 升级于 2026 年 7 月 28 日激活后，Orchard 变成了只出不进，新的资金无法再进入其中。这意味着**Sapling 成了支付实际能够落入的唯一接收器**。

所以，如果你的 ZEC 已经在 Sapling 中，那么这笔支付就是 Sapling 到 Sapling，相关信息完全不会公开。但如果你已经迁移到 Ironwood，支付时资金就会跨越资金池边界，而[turnstile](/zcash-tech/the-turnstile) 会公开金额和高度，即使发送方和接收方仍然保持隐藏。

无论哪种情况，界面看起来都一模一样。最简单的解决办法，就是保留一小部分 Sapling 余额专门用于支付。

<br/>

## <img src="/content-images/icons8-cancel-7f786be3c1.svg" width="24" height="24" className="inline-block align-middle mr-1 p-[2px]" alt="cancel icon"/> 需要避免的常见错误

- 还没保存登录令牌就先充值，然后又清除了 cookies
- 严格按最低转账额发送，结果少到账一美分
- 试图直接从交易所提币到 `u1...` 地址
- 没检查自己是从哪个资金池支出的，就想当然地以为这笔支付是私密的
- 明明整个目的就是不暴露身份，却还是用普通网络连接付款

<br/>

## <img src="/content-images/checked-checkbox-svgrepo-com-7ea19022da.svg" width="28" height="28" className="inline-block align-middle mr-1 p-[2px]" alt="done icon"/> 结果

你现在可以：

- 在没有账户、没有电子邮箱、没有银行卡的情况下使用前沿 AI 模型
- 用屏蔽 ZEC 付款，并准确知道它隐藏了什么、没有隐藏什么
- 通过 CrossPay 接触那些从未听说过 Zcash 的服务

<br/>

## <img src="/content-images/chain-for-links-svgrepo-com-117ee0dec1.svg" width="24" height="24" className="inline-block align-middle mr-1 p-[2px]" alt="chain-links icon"/> 相关内容

- [Ironwood](/zcash-tech/ironwood) - 为什么你的资金所在的资金池发生了变化
- [Turnstile](/zcash-tech/the-turnstile) - 当价值跨越不同资金池时，哪些信息会变成公开的
- [钱包](/using-zcash/wallets) - 哪些钱包仍在维护
- [ZODL](/zcash-organizations/zodl) - CrossPay 背后的钱包

<br/>

## <img src="/content-images/progress-arrows-svgrepo-com-aad76739e5.svg" width="24" height="24" className="inline-block align-middle mr-1 p-[2px]" alt="progress icon"/> 进度

**第 1 步，共 1 步**

你已经使用屏蔽 ZEC 支付了一项 AI 服务，并且知道这暴露了什么信息。

<br/>

## 下一步

- [在不关联身份的情况下汇款](/zcash-use-cases/send-money-without-linking-identity)

<br/>
