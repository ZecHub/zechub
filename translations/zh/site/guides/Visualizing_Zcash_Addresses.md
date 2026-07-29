<a href="https://github.com/zechub/zechub/edit/main/site/guides/Visualizing_Zcash_Addresses.md" target="_blank">
  <img src="https://img.shields.io/badge/Edit-blue" alt="编辑页面"/>
</a>


# 可视化 Zcash 地址

如果你是第一次了解 Zcash，你会立刻发现会发生两种类型的[交易](https://zechub.wiki/using-zcash/transactions)：*透明*和*屏蔽*。
此外，如果你一直在关注 Zcash 生态系统的最新进展，你可能已经了解过 [Unified Addresses](https://electriccoin.co/blog/unified-addresses-in-zcash-explained/)，也就是 UA。
当 Zcash 行业中的人们谈论*屏蔽*交易时，他们指的是涉及为 sapling 或 orchard 协议编码的地址的交易。
UA 的设计目标是将*任何*类型的屏蔽或透明交易统一到一个地址中。这种泛化是未来简化用户体验的关键。本指南的目的是通过具体的可视化示例，帮助你补充理解 UA。

## Zcash 地址的类型

目前在使用中的地址主要有三种，包括

* 透明地址

![img1](https://user-images.githubusercontent.com/81990132/219261771-a9957ec3-2841-4073-9cfd-1db9d6356693.png)

* sapling

![img2](https://user-images.githubusercontent.com/81990132/219261784-1a617e70-f588-4eed-96bf-f0789d7af58a.png)

* Unified Address（完整）

![img3](https://user-images.githubusercontent.com/81990132/219261794-bcc79db6-4dc6-4c6a-867b-3717b81e6b71.png)


首先要注意的是，每种地址的长度都不同。你既可以通过地址字符串中的字符数量直观看出来，也可以通过查看对应的二维码来判断。随着地址长度增加，二维码通常会缩小视图，以便在方形区域中容纳更多数据。

* `t1goiSyw2JinFCmUnfiwwp72LEZzD42TyYu` 长 35 个字符
* `zs1cpf4prtmnqpg6x2ngcrwelu9a39z9l9lqukq9fwagnaqrknk34a7n3szwxpjuxfjdxkuzykel53` 长 78 个字符
* `u1ckeydud0996ftppqrnpdsqyeq4e57qcyjr4raht4dc8j3njuyj3gmm9yk7hq9k88cdkqfuqusgpcpjfhwu3plm2vrd32g8du78kzkm5un357r4vkhz4vhxd4yfl8zvszk99cmsc89qv4trd7jzkcs8h6lukzgy25j8cv76p0g603nrrg6yt6cxsh2v8rmkasskd69ylfyphhjyv0cxs` 长 213 个字符

第二个要注意的是每种地址字符串的前缀——透明地址以 *t* 开头，sapling 以 *zs* 开头，最后 UA 以 *u1* 开头。

需要特别注意的是：

#### “Orchard payment addresses do not have a stand-alone string encoding. Instead, we define "unified addresses" that can bundle together addresses of different types, including Orchard. Unified addresses have a Human-Readable Part of "u" on Mainnet, i.e. they will have the prefix "u1".”

## Unified Address 接收器

正如[这里](https://medium.com/@hanh425/transaction-privacy-78f80f9f175e)所讨论的那样，UA 可以由不同的接收器构建——即透明、sapling 和 orchard 地址类型的某种组合。
除了完整 UA 之外，以下是你在实际使用中最常见到的几种：

* 透明 + sapling

![img4](https://user-images.githubusercontent.com/81990132/219267475-38ad1419-0aac-4205-b18e-6873283f9d85.png)

* 透明 + orchard


![img5](https://user-images.githubusercontent.com/81990132/219267496-90db21ff-f4e1-4a50-8f2a-1a71d995652a.png)

* sapling + orchard


![img6](https://user-images.githubusercontent.com/81990132/219267520-6b731ec2-e911-4469-acc5-c39d4addcac2.png)

* orchard
  
![img7](https://user-images.githubusercontent.com/81990132/219267538-1a748fff-4034-4559-96ac-182723409b3a.png)

首先要注意的是，这些 UA 都来自同一个私钥！第二个要注意的是各种 UA 的长度：

* t+s `u13qutpuktq026dwczvxmnh8mxdacsjx3kg2rrhzgns8zsty53t9y0hqp5d440zc9w7z7zkkjqw8dq0uuc0mkt883464mq8mkys7l4xjnhylh7u3u02ukknurm5yxerqlf500y2atq28e` 141 个字符
* t+o `u1yvwppp7ann6n3pgkysdu0spvr50w4jf4jwgme3c8x8fp4av59rupgvdd3fddc3f2cwrk3ghs5lxt87ggj8cvjuzcrf4jkejwlu9pc83gk2vtx03ucqcc3ed0furcuypqs6d6swu3nws` 141 个字符
* s+o `u1dq8kg78fgpjsc7dn2ynpdzc8xu99wra0jec4jy30rjqk5frsj62qtgqcu9nn0j8g352phlwprshancgxcuhdcclx0wxtvqylhmuegas7ul8hwnwggy727l05pyujuywtnn4nkfznctaelpkcrqcm9cxhkgv3t9jtrvgym7la5varrmzc` 178 个字符
* o   `u1cysntkxwt0h4sahp7rhj7u27pgc2ga7685ekf65g0d5ht5glkfm4zkumhvkd2zg2pdrgv3mrwq2x3vw2yl5u7zef3cr2nqwrzu7v2dsa` 106 个字符

第三个要注意的是，每一种 UA 在视觉上都略有不同！UA 的强大之处在于它为终端用户提供了*选择*。如果未来需要新的协议，UA 也已经准备就绪。

## 来源

https://zcash.github.io/orchard/design/keys.html

https://medium.com/@hanh425/transaction-privacy-78f80f9f175e
