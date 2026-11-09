<a href="https://github.com/zechub/zechub/edit/main/site/guides/Visualizing_Zcash_Addresses.md" target="_blank">
  <img src="https://img.shields.io/badge/Edit-blue" alt="编辑页面"/>
</a>


# 可视化 Zcash 地址 [address]

如果你是第一次了解 Zcash，你会立即发现可能发生两类 [交易 transaction](https://zechub.wiki/using-zcash/transactions)：*透明 [transparent]* 和 *屏蔽 [shielded]*。
此外，如果你一直关注 Zcash 生态系统的最新发展，你可能已经了解 [统一地址 Unified Addresses](https://web.archive.org/web/20260823012524/https://electriccoin.co/blog/unified-addresses-in-zcash-explained/)，即 UA。
当 Zcash 行业的人们谈论*屏蔽*交易时，他们指的是涉及为 Sapling 或 Orchard 协议编码的地址的交易。 
UA 的设计旨在将*任何*类型的屏蔽或透明交易统一到单个地址中。这种泛化是简化未来 UX 的关键。本指南旨在通过具体的视觉示例补充对 UA 的理解。

## Zcash 地址类型

目前，迄今为止主要使用三种类型的地址。其中包括

* 透明

![img1](/content-images/219261771-a9957ec3-2841-4073-9cfd-1db9d6-574fc930f0.webp)

* Sapling

![img2](/content-images/219261784-1a617e70-f588-4eed-96bf-f0789d-e10ebfc543.webp)

* 统一地址（完整）

![img3](/content-images/219261794-bcc79db6-4dc6-4c6a-867b-3717b8-a3650f8968.webp)


首先要注意的是，每种地址类型的长度都不同。你可以通过地址字符串中的字符数量*或*查看相关的二维码直观地看到这一点。随着地址长度增加，二维码往往会缩小以在方形中容纳更多数据。

* `t1goiSyw2JinFCmUnfiwwp72LEZzD42TyYu` 长 35 个字符
* `zs1cpf4prtmnqpg6x2ngcrwelu9a39z9l9lqukq9fwagnaqrknk34a7n3szwxpjuxfjdxkuzykel53` 长 78 个字符
* `u1ckeydud0996ftppqrnpdsqyeq4e57qcyjr4raht4dc8j3njuyj3gmm9yk7hq9k88cdkqfuqusgpcpjfhwu3plm2vrd32g8du78kzkm5un357r4vkhz4vhxd4yfl8zvszk99cmsc89qv4trd7jzkcs8h6lukzgy25j8cv76p0g603nrrg6yt6cxsh2v8rmkasskd69ylfyphhjyv0cxs` 长 213 个字符

其次要注意的是，每个地址字符串的前缀——透明地址以 *t* 开头，Sapling 地址以 *zs* 开头，最后 UA 以 *u1* 开头。

需要注意的是：

#### "Orchard 支付 [payment]地址没有独立的字符串编码。相反，我们定义了可将不同类型的地址（包括 Orchard）捆绑在一起的"统一地址"。统一地址在 Mainnet 上的 Human-Readable Part 为 "u"，即它们将以 "u1" 为前缀。"

## 统一地址接收方

如 [此处](https://medium.com/@hanh425/transaction-privacy-78f80f9f175e)所述，可以使用不同的接收方构建 UA——透明、Sapling 和 Orchard 地址类型的某种组合。
除完整 UA 外，以下是你最常会在实际使用中遇到的类型：

* 透明 + Sapling

![img4](/content-images/219267475-38ad1419-0aac-4205-b18e-687328-46b8f12f80.webp)

* 透明 + Orchard


![img5](/content-images/219267496-90db21ff-f4e1-4a50-8f2a-1a71d9-7423486eb5.webp)

* Sapling + Orchard


![img6](/content-images/219267520-6b731ec2-e911-4469-acc5-c39d4a-a89ba01b88.webp)

* Orchard
  
![img7](/content-images/219267538-1a748fff-4034-4559-96ac-182723-3d69e23dac.webp)

首先要注意的是，这些 UA 都来自同一个私钥！其次要注意的是，每种 UA 类型的长度：

* t+s `u13qutpuktq026dwczvxmnh8mxdacsjx3kg2rrhzgns8zsty53t9y0hqp5d440zc9w7z7zkkjqw8dq0uuc0mkt883464mq8mkys7l4xjnhylh7u3u02ukknurm5yxerqlf500y2atq28e` 141 个字符
* t+o `u1yvwppp7ann6n3pgkysdu0spvr50w4jf4jwgme3c8x8fp4av59rupgvdd3fddc3f2cwrk3ghs5lxt87ggj8cvjuzcrf4jkejwlu9pc83gk2vtx03ucqcc3ed0furcuypqs6d6swu3nws` 141 个字符
* s+o `u1dq8kg78fgpjsc7dn2ynpdzc8xu99wra0jec4jy30rjqk5frsj62qtgqcu9nn0j8g352phlwprshancgxcuhdcclx0wxtvqylhmuegas7ul8hwnwggy727l05pyujuywtnn4nkfznctaelpkcrqcm9cxhkgv3t9jtrvgym7la5varrmzc` 178 个字符
* o   `u1cysntkxwt0h4sahp7rhj7u27pgc2ga7685ekf65g0d5ht5glkfm4zkumhvkd2zg2pdrgv3mrwq2x3vw2yl5u7zef3cr2nqwrzu7v2dsa` 106 个字符

第三要注意的是，从视觉上看，每个 UA 都略有不同！UA 的强大之处在于它们为最终用户提供的*选择*。如果未来需要新协议，UA 已准备就绪。

## 来源

https://zcash.github.io/orchard/design/keys.html

https://medium.com/@hanh425/transaction-privacy-78f80f9f175e
