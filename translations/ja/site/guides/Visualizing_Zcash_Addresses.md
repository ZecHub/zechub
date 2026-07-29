<a href="https://github.com/zechub/zechub/edit/main/site/guides/Visualizing_Zcash_Addresses.md" target="_blank">
  <img src="https://img.shields.io/badge/Edit-blue" alt="Edit Page"/>
</a>

# Zcash アドレスの視覚化

Zcashについて初めて学ぶ際、すぐに気づくのは2種類の[トランザクション](https://zechub.wiki/using-zcash/transactions)が存在するということです。それは *transparent*（透明）と *shielded*（暗号化）です。
さらに、Zcashエコシステムにおける最新の開発に注目している場合は、[Unified Addresses](https://electriccoin.co/blog/unified-addresses-in-zcash-explained/)（UA）について学んだかもしれません。

Zcash業界で人々が *shielded* トランザクションについて語るとき、それはSaplingまたはOrchardプロトコルにエンコードされたアドレスに関与するトランザクションを意味します。
UAは、任意の種類のshieldedまたはtransparentなトランザクションを単一のアドレスに統合することを目的としています。この一般化がUXの簡略化への鍵です。本ガイドの目的は、具体的な視覚的な例とともにUAについての理解を補完することです。

## Zcash アドレスの種類

現在までに使用されているZcashアドレスの主なタイプは3つあります。これらは以下の通りです：

* transparent（透明）

![img1](https://user-images.githubusercontent.com/81990132/219261771-a9957ec3-2841-4073-9cfd-1db9d6356693.png)

* sapling（サプリング）

![img2](https://user-images.githubusercontent.com/81990132/219261784-1a617e70-f588-4eed-96bf-f0789d7af58a.png)

* Unified Address（Full）（統合アドレス）

![img3](https://user-images.githubusercontent.com/81990132/219261794-bcc79db6-4dc6-4c6a-867b-3717b81e6b71.png)

最初に注目すべき点は、各アドレスタイプの長さが異なるということです。これはアドレス文字列内の文字数から視覚的に確認できます。または関連するQRコードを見ることでも確認できます。アドレスの長さが増加すると、QRコードは拡大して正方形内に多くのデータを収めようとする傾向があります。

* `t1goiSyw2JinFCmUnfiwwp72LEZzD42TyYu` は35文字
* `zs1cpf4prtmnqpg6x2ngcrwelu9a39z9l9lqukq9fwagnaqrknk34a7n3szwxpjuxfjdxkuzykel53` は78文字
* `u1ckeydud0996ftppqrnpdsqyeq4e57qcyjr4raht4dc8j3njuyj3gmm9yk7hq9k88cdkqfuqusgpcpjfhwu3plm2vrd32g8du78kzkm5un357r4vkhz4vhxd4yfl8zvszk99cmsc89qv4trd7jzkcs8h6lukzgy25j8cv76p0g603nrrg6yt6cxsh2v8rmkasskd69ylfyphhjyv0cxs` は213文字

二つ目に注目すべき点は、各アドレス文字列の接頭辞です。transparentは *t* で始まり、saplingは *zs* で始まり、UAは *u1* で始まります。

重要なのは以下のことです：

#### "Orchard支払いアドレスには独自の文字列エンコーディングはありません。代わりに、「統合アドレス」を定義し、Orchardを含むさまざまなタイプのアドレスを一緒にまとめることができます。統合アドレスはメインネットでは「u」のHuman-Readable Partを持ち、つまり接頭辞「u1」を持つことになります。"

## 統合アドレス（Unified Address）の受信者

[こちら](https://medium.com/@hanh425/transaction-privacy-78f80f9f175e)で議論したように、UAはさまざまな受信者と組み合わせて構築できます。透明、サプリング、オーカードのアドレスタイプのいくつかの組み合わせです。
フルなUA以外にも、野生に見られる一般的なものは以下の通りです：

* transparent + sapling（透明 + サプリング）

![img4](https://user-images.githubusercontent.com/81990132/219267475-38ad1419-0aac-4205-b18e-6873283f9d85.png)

* transparent + orchard（透明 + オーカード）

![img5](https://user-images.githubusercontent.com/81990132/219267496-90db21ff-f4e1-4a50-8f2a-1a71d995652a.png)

* sapling + orchard（サプリング + オーカード）

![img6](https://user-images.githubusercontent.com/81990132/219267520-6b731ec2-e911-4469-acc5-c39d4addcac2.png)

* orchard（オーカード）

![img7](https://user-images.githubusercontent.com/81990132/219267538-1a748fff-4034-4559-96ac-182723409b3a.png)

最初に注目すべき点は、これらのUAすべてが同じ秘密鍵から生成されているということです。二つ目に注目すべき点は各タイプのUAの長さです：

* t+s `u13qutpuktq026dwczvxmnh8mxdacsjx3kg2rrhzgns8zsty53t9y0hqp5d440zc9w7z7zkkjqw8dq0uuc0mkt883464mq8mkys7l4xjnhylh7u3u02ukknurm5yxerqlf500y2atq28e` 141文字
* t+o `u1yvwppp7ann6n3pgkysdu0spvr50w4jf4jwgme3c8x8fp4av59rupgvdd3fddc3f2cwrk3ghs5lxt87ggj8cvjuzcrf4jkejwlu9pc83gk2vtx03ucqcc3ed0furcuypqs6d6swu3nws` 141文字
* s+o `u1dq8kg78fgpjsc7dn2ynpdzc8xu99wra0jec4jy30rjqk5frsj62qtgqcu9nn0j8g352phlwprshancgxcuhdcclx0wxtvqylhmuegas7ul8hwnwggy727l05pyujuywtnn4nkfznctaelpkcrqcm9cxhkgv3t9jtrvgym7la5varrmzc` 178文字
* o   `u1cysntkxwt0h4sahp7rhj7u27pgc2ga7685ekf65g0d5ht5glkfm4zkumhvkd2zg2pdrgv3mrwq2x3vw2yl5u7zef3cr2nqwrzu7v2dsa` 106文字

三つ目に注目すべき点は、視覚的に各UAがわずかに異なるということです。UAの力は、エンドユーザーにとって *選択肢* を提供することです。今後新しいプロトコルが必要になった場合でも、UAはすぐに導入準備ができています。

## 出典

https://zcash.github.io/orchard/design/keys.html

https://medium.com/@hanh425/transaction-privacy-78f80f9f175e
