# <img src="/content-images/icons8-lock-2f8e221321.svg" width="24" height="24" alt="lock icon"/> 使用 Zcash 登录

<span className="inline-flex items-center gap-[6px]"><span className="inline-block w-[12px] h-[12px] bg-green-500 rounded-full"></span>中级 - 7 分钟</span>

## TL;DR

- 通过证明你控制一个 Zcash 地址来登录，而不是使用密码
- 目前有两种设计：**签名挑战**，或**发送一笔带有 memo 中代码的屏蔽交易**
- 由于屏蔽地址会隐藏余额和历史记录，证明控制权不会暴露你的财务状况
- 这种模式仍处于早期阶段。目前还没有已批准的标准，各种实现之间也无法互操作

<br/>

## <img src="/content-images/user-svgrepo-com-21adf62b7c.svg" width="24" height="24" className="inline-block align-middle mr-1 p-[2px]" alt="user icon"/> 这适合谁？

- 想要无需密码登录、又不想收集个人数据的开发者
- 不愿意把电子邮箱地址交给每个网站的用户
- 任何想登录又不希望将自己的财务历史与账户关联起来的人

<br/>

## <img src="/content-images/warning-error-svgrepo-com-b7ea8a50da.svg" width="24" height="24" className="inline-block align-middle mr-1 p-[2px]" alt="warning icon"/> 问题所在

大多数登录方式都会泄露一些信息：

- **密码和电子邮箱**会创建一个与你身份绑定的账户，而且这两者最终都可能出现在数据泄露汇总中
- **社交登录**会让身份提供方知道你在哪些地方登录过，以及何时登录
- **在透明链上的钱包登录**比看起来更糟。连接钱包可能会把你的全部余额和交易历史永久交给网站

通常，你是在便利性和信息暴露之间做选择。

<br/>

## <img src="/content-images/celebration-spark-svgrepo-com-bc98dec7c1.svg" width="24" height="24" className="inline-block align-middle mr-1 p-[2px]" alt="spark icon"/> 为什么是 Zcash？

Zcash 将*证明控制权*与*披露财务信息*分离开来：

- **屏蔽地址**会保持余额和交易历史私密，因此证明你持有某个地址，并不会说明你持有多少资产
- **加密 memo**可以在交易中私密地携带一次性登录代码
- **Viewing Key**允许选择性披露，因此应用可以只获得其确实需要的读取权限，而不会得到更多

<br/>

## <img src="/content-images/ladder-svgrepo-com-7232bf46ed.svg" width="24" height="24" className="inline-block align-middle mr-1 p-[2px]" alt="step icon"/> 工作原理

目前已经出现了两种方法。两者最终都会让应用持有一个稳定的用户标识符，而不需要密码。

### 方法 1：签名挑战

1. 应用生成一个随机、一次性使用的挑战
2. 你的钱包使用你地址背后的密钥对该挑战进行签名
3. 应用验证签名并让你登录

整个过程不会广播到链上，因此没有手续费，也不需要等待区块。相关规范是 [ZIP 304, Sapling Address Signatures](https://zips.z.cash/zip-0304)，它目前仍是草案，所以各钱包对消息签名的支持情况并不一致。

### 方法 2：通过一笔屏蔽交易来证明

1. 应用生成一个一次性代码，并显示一个付款请求
2. 你发送一笔小额屏蔽交易，并把该代码写入 memo
3. 应用监测该 memo，匹配代码，然后让你登录

这种方式适用于如今已经支持 memo 的钱包，而大多数钱包都支持。代价是需要支付网络手续费，并且要等待确认。

### 保持地址私密

应用不一定需要存储你的地址也能识别你。有些实现会将地址与某个应用专属值一起哈希，这样同一个用户在每个网站上都会呈现为不同但稳定的标识符。这可以防止网站相互比对信息来关联你的账户。

<br/>

## <img src="/content-images/icons8-toolbox-9bebbb1619.svg" width="24" height="24" className="inline-block align-middle mr-1 p-[2px]" alt="toolbox icon"/> 权衡取舍

在你基于它构建产品或依赖它之前，这些都值得理解。

| | 已签名挑战 | 屏蔽交易 |
|---|---|---|
| 成本 | 免费 | 每次登录都需支付网络手续费 |
| 速度 | 即时 | 需要等待确认 |
| 钱包支持 | 有限，ZIP 304 仍是草案 | 广泛，只需要 memo |
| 会留下链上记录 | 否 | 是，会存在一笔交易 |

共同的限制：

- **默认没有账户恢复机制。** 丢失密钥就意味着丢失账户，除非应用专门设计了恢复路径
- **地址复用会让你被关联。** 在很多网站上使用同一个地址会重新制造追踪问题，这也是为什么应用专属标识符很重要
- **没有已批准的标准。** 每个项目都有自己的方案，因此为某一个项目构建的登录方式无法在另一个项目中使用
- **它本身并不等于匿名。** 它可以对应用隐藏你的财务状况，但一旦你进入应用，应用仍然可以分析你的行为

<br/>

## <img src="/content-images/icons8-cancel-7f786be3c1.svg" width="24" height="24" className="inline-block align-middle mr-1 p-[2px]" alt="cancel icon"/> 需要避免的常见错误

- 重复使用挑战代码。每个代码都应当只能使用一次，并且应当快速过期，否则被截获的代码就可能被重放
- 要求用户为了登录而发送一笔有意义金额的交易。付款只是证明，因此金额应当微不足道
- 在应用专属标识符已经足够的情况下，仍然存储原始地址
- 假设消息签名在所有地方都可用。要检查你的用户实际拥有的钱包
- 事后把 memo 当作秘密信息。它证明了发送者采取过行动，但它不是密码

<br/>

## <img src="/content-images/checked-checkbox-svgrepo-com-7ea19022da.svg" width="28" height="28" className="inline-block align-middle mr-1 p-[2px]" alt="done icon"/> 正在探索这一方向的项目

这些项目是为 [ZecHub Hackathon 3.0](https://zechub.wiki/hackathon) 的 **Zcash Login** 赛道构建的。它们更像实验而不是成熟产品，也展示了同一个想法可以被以多么不同的方式实现。

- **ZecAuth** - 一个面向 Zcash 的钱包连接协议，理念上类似于 WalletConnect 在其他生态中的做法。应用会显示一个 QR 码或 `zecauth://` 链接，其中携带挑战以及它请求的能力，例如登录、付款请求或查看权限。没有交易、没有手续费、也没有链上交互。它还随代码一起提供了书面协议规范
- **ZShield** - 将一个屏蔽地址转换为 W3C DID 和 OpenID Connect 身份。浏览器生成一个密钥对，服务器通过 ZIP 304 风格的接口发出一个 nonce，钱包对其签名，然后服务器返回一个 JWT。由于结果兼容 OIDC，现有应用无需定制集成即可使用它
- **ZecPass** - 通过带签名的 memo 来证明所有权，并且其设计使应用完全不会获知用户的地址。它推导出一个应用作用域哈希来作为稳定标识符，保持挑战一次性且有时间限制，并提供了一个可直接嵌入的 React 按钮和一个 Node 验证库
- **Portal** - 通过发送一笔在 memo 中带有一次性代码的屏蔽交易来登录，并且运行在主网上。同样的流程还被复用于解锁付费内容，以及通过链接发送或接收资金
- **ZcashMe** - 使用一笔屏蔽交易作为身份验证证明，并专注于桌面到移动端之间的鸿沟，从而让用户在笔记本电脑上登录时不需要浏览器扩展
- **ZBooks** - 一个会计与付款工具，它将使用 Zcash 登录视为一种可复用的身份验证原语，而不是产品本身，并通过 Unified Full Viewing Key 读取资金库数据

<br/>

## <img src="/content-images/chain-for-links-svgrepo-com-117ee0dec1.svg" width="24" height="24" className="inline-block align-middle mr-1 p-[2px]" alt="chain-links icon"/> 相关页面

- [Memos](/using-zcash/memos) - 加密 memo 的工作原理，以及登录代码如何在其中传递
- [Viewing Keys](/zcash-tech/viewing-keys) - 在不交出支配权限的情况下授予只读访问
- [使用屏蔽 ZEC 进行记录保存](/zcash-use-cases/keeping-records-with-shielded-zec) - 将同样的选择性披露理念应用到会计场景中
- [在不关联身份的情况下转账](/zcash-use-cases/send-money-without-linking-identity) - 为什么地址复用会破坏隐私

<br/>
