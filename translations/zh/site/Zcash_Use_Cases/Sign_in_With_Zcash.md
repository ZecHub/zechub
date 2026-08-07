---
# <img src="/content-images/icons8-lock-2f8e221321.svg" width="24" height="24" alt="lock icon"/> 使用 Zcash 登录

<span className="inline-flex items-center gap-[6px]"><span className="inline-block w-[12px] h-[12px] bg-green-500 rounded-full"></span>中级 - 7 分钟</span>

## TL;DR

- 通过证明你控制一个 Zcash 地址来登录，而不是使用密码
- 目前有两种设计在使用中：**签署 challenge**，或**发送一笔带有 memo 中代码的 shielded 支付**
- 由于 shielded 地址会隐藏余额和历史记录，因此证明控制权不会暴露你的财务信息
- 这种模式仍处于早期阶段。目前还没有正式批准的标准，各种实现之间也无法互操作

<br/>

## <img src="/content-images/user-svgrepo-com-21adf62b7c.svg" width="24" height="24" className="inline-block align-middle mr-1 p-[2px]" alt="user icon"/> 这适合谁？

- 想要无密码登录、同时又不想收集个人数据的开发者
- 不想把电子邮箱地址交给每一个网站的用户
- 任何想登录却不希望将自己的财务历史与账户关联起来的人

<br/>

## <img src="/content-images/warning-error-svgrepo-com-b7ea8a50da.svg" width="24" height="24" className="inline-block align-middle mr-1 p-[2px]" alt="warning icon"/> 问题所在

大多数登录方式都会泄露某些信息：

- **密码和电子邮箱**会创建一个与你身份绑定的账户，而且两者最终都可能出现在泄露数据库中
- **社交账号登录**会让身份提供商知道你在何时登录了哪些网站
- **在透明链上使用钱包登录**比表面看起来更糟。连接钱包可能会把你的全部余额和交易历史永久交给网站

通常你只能在便利性和信息披露之间做选择。

<br/>

## <img src="/content-images/celebration-spark-svgrepo-com-bc98dec7c1.svg" width="24" height="24" className="inline-block align-middle mr-1 p-[2px]" alt="spark icon"/> 为什么是 Zcash？

Zcash 将*证明控制权*与*披露财务信息*分离开来：

- **Shielded 地址**会保护余额和交易历史的隐私，因此证明你持有某个地址，并不会说明你持有了什么
- **加密 memo**可以在交易中私密地携带一次性登录代码
- **Viewing keys**允许选择性披露，因此应用可以只获得它所需的精确读取权限，而不会得到更多信息

<br/>

## <img src="/content-images/ladder-svgrepo-com-7232bf46ed.svg" width="24" height="24" className="inline-block align-middle mr-1 p-[2px]" alt="step icon"/> 它如何工作

目前已经出现了两种方法。两者的结果都是：应用持有一个稳定的用户标识，而不需要密码。

### 方法 1：签署 challenge

1. 应用生成一个随机的一次性 challenge
2. 你的钱包使用地址背后的密钥对该 challenge 进行签名
3. 应用验证签名并让你登录

不会有任何内容被广播，因此无需手续费，也不用等待区块。相关规范是 [ZIP 304，Sapling 地址签名](https://zips.z.cash/zip-0304)，它目前仍是草案，所以各钱包对消息签名的支持情况并不一致。

### 方法 2：通过 shielded 支付进行证明

1. 应用生成一个一次性代码，并显示支付请求
2. 你发送一笔小额的 shielded 交易，并将该代码写入 memo
3. 应用监听该 memo，匹配代码后让你登录

这种方式适用于今天已经支持 memo 的钱包，而这类钱包占了大多数。代价是你需要支付网络手续费，并等待确认。

### 保持地址私密

应用并不一定要存储你的地址才能识别你。有些实现会将地址与某个应用专属的值一起哈希，这样同一用户在每个网站上都会呈现为不同但稳定的标识符。这可以防止网站彼此对照信息，从而关联你的账户。

<br/>

## <img src="/content-images/icons8-toolbox-9bebbb1619.svg" width="24" height="24" className="inline-block align-middle mr-1 p-[2px]" alt="toolbox icon"/> 权衡取舍

在基于它构建系统或依赖它之前，值得先理解这些问题。

| | 签名 challenge | Shielded 支付 |
|---|---|---|
| 成本 | 免费 | 每次登录都需支付网络手续费 |
| 速度 | 即时 | 需要等待确认 |
| 钱包支持 | 有限，ZIP 304 仍是草案 | 广泛，只需要支持 memo |
| 是否留下链上记录 | 否 | 是，会存在一笔交易 |

共同的局限性：

- **默认没有账户恢复机制。** 丢失密钥就意味着丢失账户，除非应用设计了恢复路径
- **地址复用会关联你的身份。** 在多个网站上使用同一个地址，会重新制造可追踪问题，这正是应用专属标识符重要的原因
- **没有正式批准的标准。** 每个项目都有自己的方案，因此为一个项目构建的登录方式，无法直接用于另一个项目
- **它本身并不等于匿名。** 它能对应用隐藏你的财务信息，但一旦你登录进入应用，应用仍然可以分析你的行为

<br/>

## <img src="/content-images/icons8-cancel-7f786be3c1.svg" width="24" height="24" className="inline-block align-middle mr-1 p-[2px]" alt="cancel icon"/> 常见错误，务必避免

- 重复使用 challenge 代码。每个代码都应该只能使用一次，并且要快速过期，否则被截获后就可能被重放
- 要求用户为了登录而发送有实际意义的金额。这笔支付只是证明，因此金额应该微不足道
- 在应用专属标识符已经足够的情况下，仍然存储原始地址
- 假设消息签名在所有地方都能工作。请检查你的用户实际使用的钱包
- 事后仍将 memo 当作秘密信息。它证明的是发送者采取了行动，而不是密码

<br/>

## <img src="/content-images/checked-checkbox-svgrepo-com-7ea19022da.svg" width="28" height="28" className="inline-block align-middle mr-1 p-[2px]" alt="done icon"/> 正在探索这一方向的项目

这些项目是为 [ZecHub Hackathon 3.0](https://zechub.wiki/hackathon) 的 **Zcash Login** 赛道而构建的。它们更像是实验，而不是成熟产品，同时也展示了同一个想法可以被多么不同地实现。

- **ZecAuth** - 一个面向 Zcash 的钱包连接协议，其理念类似于 WalletConnect 在其他生态中的作用。应用会显示一个二维码或 `zecauth://` 链接，其中携带了一个 challenge，以及它所请求的能力，例如登录、支付请求或查看权限。不需要交易、不需要手续费、也不需要链上交互。它在代码之外还附带了一份书面的协议规范
- **ZShield** - 将一个 shielded 地址转换为 W3C DID 和 OpenID Connect 身份。浏览器生成一个密钥对，服务器通过类似 ZIP 304 的接口发出一个 nonce，钱包对其签名，随后服务器返回一个 JWT。由于结果兼容 OIDC，现有应用无需定制集成即可使用
- **ZecPass** - 通过签名 memo 来证明所有权，并且设计上保证应用根本不会知道用户的地址。它派生出一个应用作用域哈希，作为稳定标识符使用，保持 challenge 一次性且有时效限制，并提供一个可直接嵌入的 React 按钮以及一个 Node 验证库
- **Portal** - 通过发送一笔在 memo 中包含一次性代码的 shielded 交易来登录，并已运行在主网上。同样的流程还被复用于解锁付费内容，以及通过链接发送或接收资金
- **ZcashMe** - 使用一笔 shielded 支付作为身份验证证明，并重点解决桌面到移动端之间的断层，因此在笔记本电脑上登录时不需要浏览器扩展
- **ZBooks** - 一个会计与支付工具，它将 sign in with Zcash 视为一种可复用的身份验证原语，而不是产品本身，并通过 Unified Full Viewing Key 读取 treasury 数据

<br/>

## <img src="/content-images/chain-for-links-svgrepo-com-117ee0dec1.svg" width="24" height="24" className="inline-block align-middle mr-1 p-[2px]" alt="chain-links icon"/> 相关页面

- [Memo](/using-zcash/memos) - 加密 memo 如何工作，以及登录代码如何在其中传递
- [Viewing Keys](/zcash-tech/viewing-keys) - 在不交出支出权限的情况下授予只读访问
- [使用 Shielded ZEC 保存记录](/zcash-use-cases/keeping-records-with-shielded-zec) - 同样的选择性披露理念，应用于会计场景
- [在不关联身份的情况下转账](/zcash-use-cases/send-money-without-linking-identity) - 为什么地址复用会破坏隐私

<br/>
