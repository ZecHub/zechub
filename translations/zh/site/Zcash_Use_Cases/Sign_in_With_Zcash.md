# <img src="/content-images/icons8-lock-2f8e221321.svg" width="24" height="24" alt="lock icon"/> 使用 Zcash 登录

<span className="inline-flex items-center gap-[6px]"><span className="inline-block w-[12px] h-[12px] bg-green-500 rounded-full"></span>中级 - 7 分钟</span>

## TL;DR

- 通过证明您控制一个 Zcash 地址[address]来登录，而非使用密码
- 目前有两种设计：**签名挑战**，或**发送在备忘录[memo]中包含代码的屏蔽[shielded]支付[payment]**
- 由于屏蔽地址会隐藏余额和历史记录，证明控制权不会暴露您的财务状况
- 这一模式仍处于早期阶段。目前尚无已批准的标准，各实现之间也无法互操作

<br/>

## <img src="/content-images/user-svgrepo-com-21adf62b7c.svg" width="24" height="24" className="inline-block align-middle mr-1 p-[2px]" alt="user icon"/> 这适合谁？

- 希望无需收集个人数据即可实现无密码登录的开发者[developer]
- 不愿向每个网站提供电子邮件地址的用户
- 希望登录时不将其财务历史与账户关联的任何人

<br/>

## <img src="/content-images/warning-error-svgrepo-com-b7ea8a50da.svg" width="24" height="24" className="inline-block align-middle mr-1 p-[2px]" alt="warning icon"/> 问题

大多数登录选项都会泄露某些信息：

- **密码和电子邮件**会创建一个与您身份绑定的账户，而两者最终都可能出现在数据泄露转储中
- **社交登录**会让身份提供商知道您在何处以及何时登录
- **在透明[transparent]链[chain]上的钱包登录**比看起来更糟。连接钱包可能会永久向网站交出您的全部余额和交易[transaction]历史

您通常是在便利性和披露之间做选择。

<br/>

## <img src="/content-images/celebration-spark-svgrepo-com-bc98dec7c1.svg" width="24" height="24" className="inline-block align-middle mr-1 p-[2px]" alt="spark icon"/> 为什么选择 Zcash？

Zcash 将*证明控制权*与*揭示财务状况*分开：

- **屏蔽地址**会保持余额和交易历史私密，因此证明您持有一个地址并不会透露您持有什么
- **加密[encryption]备忘录**可以在交易内部私密地携带一次性登录代码
- **Viewing keys**允许选择性披露[selective disclosure]，因此应用可以获得其所需内容的精确读取权限，而不会获得更多权限

<br/>

## <img src="/content-images/ladder-svgrepo-com-7232bf46ed.svg" width="24" height="24" className="inline-block align-middle mr-1 p-[2px]" alt="step icon"/> 工作原理

已出现两种方法。两者最终都会让应用持有您的稳定标识符，而无需密码。

### 方法 1：签名挑战

1. 应用生成一个随机的一次性挑战
2. 您的钱包使用您地址背后的密钥为该挑战签名[signature]
3. 应用验证签名并让您登录

不会有任何内容被广播，因此无需手续费[fee]，也无需等待区块[block]。相关规范是 [ZIP 304，Sapling地址签名](https://zips.z.cash/zip-0304)，该规范仍为草案，因此各钱包对消息签名的支持有所不同。

### 方法 2：使用屏蔽支付证明

1. 应用生成一个一次性代码并显示支付请求
2. 您发送一笔小额屏蔽交易，并在备忘录中附上该代码
3. 应用监测备忘录、匹配代码并让您登录

这适用于如今已支持备忘录的钱包，也就是其中大多数钱包。代价是需要支付网络手续费，并等待确认。

### 保持地址私密

应用无需存储您的地址即可识别您。某些实现会将其与应用专属值一起进行哈希处理，因此每个网站都会为同一用户看到不同且稳定的标识符。这可防止网站通过互相比较信息来关联您的账户。

<br/>

## <img src="/content-images/icons8-toolbox-9bebbb1619.svg" width="24" height="24" className="inline-block align-middle mr-1 p-[2px]" alt="toolbox icon"/> 权衡

在基于此构建或依赖它之前，值得先了解这些内容。

| | 签名挑战 | 屏蔽支付 |
|---|---|---|
| 成本 | 免费 | 每次登录需支付网络手续费 |
| 速度 | 即时 | 等待确认 |
| 钱包支持 | 有限，ZIP 304 仍为草案 | 广泛，只需支持备忘录 |
| 留下链上记录 | 否 | 是，存在一笔交易 |

共同限制：

- **默认没有账户恢复。** 丢失密钥意味着失去账户，除非应用设计了恢复途径
- **地址复用可能关联您。** 在多个网站使用同一地址会重现追踪问题，这也是应用专属标识符很重要的原因
- **没有已批准的标准。** 每个项目都有自己的方案，因此为一个项目构建的登录方式无法与另一个项目配合使用
- **本身不等于匿名。** 它会向应用隐藏您的财务状况，但应用仍可在您进入后分析您的行为

<br/>

## <img src="/content-images/icons8-cancel-7f786be3c1.svg" width="24" height="24" className="inline-block align-middle mr-1 p-[2px]" alt="cancel icon"/> 应避免的常见错误

- 重复使用挑战代码。每个代码都应是一次性的并快速过期，否则被截获的代码可能被重放
- 要求用户发送有实际价值的金额来登录。该支付是一种证明[proof]，因此金额应微不足道
- 当应用专属标识符可完成同样工作时，仍存储原始地址
- 假设消息签名在任何地方都有效。请检查您的用户实际拥有的钱包
- 事后将备忘录视为秘密。它证明发送方采取了行动，但它不是密码

<br/>

## <img src="/content-images/checked-checkbox-svgrepo-com-7ea19022da.svg" width="28" height="28" className="inline-block align-middle mr-1 p-[2px]" alt="done icon"/> 探索此方向的项目

这些项目是为 Zcash Login 赛道而构建的，属于 [ZecHub Hackathon 3.0](https://zechub.wiki/hackathon)。它们是实验而非成品，展示了同一想法可以如何以不同方式构建。

- **ZecAuth** - 面向 Zcash 的钱包连接协议，其理念类似 WalletConnect 在其他生态系统中的作用。应用会显示一个二维码或 `zecauth://` 链接，其中携带挑战以及它请求的功能，例如登录、支付请求或 viewing 权限。无需交易、无需手续费、无需链上交互。它随代码一同提供了书面协议规范
- **ZShield** - 将屏蔽地址转化为 W3C DID 和 OpenID Connect 身份。浏览器生成密钥对，服务器通过 ZIP 304 风格的接口发出 nonce，钱包对其签名，随后服务器返回 JWT。由于结果兼容 OIDC，现有应用无需定制集成即可使用
- **ZecPass** - 通过已签名的备忘录证明所有权，其构建方式确保应用完全不会获知用户的地址。它派生出一个应用范围的哈希值作为稳定标识符，确保挑战一次性且有时间限制，并提供可直接接入的 React 按钮和 Node 验证库
- **Portal** - 通过发送一笔在备忘录中包含一次性代码的屏蔽交易来登录，并在主网运行。同一流程还可用于解锁付费内容，以及通过链接发送或接收资金
- **ZcashMe** - 使用屏蔽支付作为身份[identity]证明，并专注于桌面端到移动端之间的差距，因此在笔记本电脑上登录不需要浏览器扩展
- **ZBooks** - 一款会计和付款工具，将使用 Zcash 登录视为可复用的身份验证原语，而非产品本身，并通过 Unified Full Viewing Key 读取金库[treasury]数据

<br/>

## <img src="/content-images/chain-for-links-svgrepo-com-117ee0dec1.svg" width="24" height="24" className="inline-block align-middle mr-1 p-[2px]" alt="chain-links icon"/> 相关页面

- [备忘录](/using-zcash/memos) - 加密备忘录的工作原理，以及登录代码如何在其中传递
- [Viewing Keys](/zcash-tech/viewing-keys) - 在不交出消费权限的情况下授予只读访问权限
- [使用屏蔽 ZEC 保存记录](/zcash-use-cases/keeping-records-with-shielded-zec) - 应用于会计的同一选择性披露理念
- [在不关联身份的情况下发送资金](/zcash-use-cases/send-money-without-linking-identity) - 为什么地址复用会破坏隐私
