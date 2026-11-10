<a href="https://github.com/zechub/zechub/edit/main/site/guides/Visualizing_Zcash_Addresses.md" target="_blank">
  <img src="https://img.shields.io/badge/Edit-blue" alt="Edit Page"/>
</a>


# Zcashアドレスの可視化

Zcashについて初めて学ぶ場合、発生し得る[トランザクション（transactions）](https://zechub.wiki/using-zcash/transactions)には、*公開型（transparent）*と*シールドされた（shielded）*の2種類があることにすぐ気付くでしょう。
さらに、Zcashエコシステムの最新動向を追っている場合は、UAとも呼ばれる[統合アドレス（Unified Addresses）](https://web.archive.org/web/20260823012524/https://electriccoin.co/blog/unified-addresses-in-zcash-explained/)について学んだことがあるかもしれません。
Zcash業界の人々が*シールドされた*トランザクションについて話すとき、それはsaplingまたはorchardプロトコルのいずれかに対応してエンコードされたアドレスを含むトランザクションを指します。 
UAは、*あらゆる*種類のシールドされたトランザクションまたは公開型トランザクションを単一のアドレスに統合するよう設計されています。この一般化が、今後UXを簡素化する鍵となります。このガイドの目的は、具体的な視覚的な例を用いてUAへの理解を補うことです。

## Zcashアドレスの種類

現在までに、主に3種類のアドレスが使用されています。これには以下が含まれます。

* 公開型

![img1](/content-images/219261771-a9957ec3-2841-4073-9cfd-1db9d6-574fc930f0.webp)

* sapling

![img2](/content-images/219261784-1a617e70-f588-4eed-96bf-f0789d-e10ebfc543.webp)

* 統合アドレス（完全版）

![img3](/content-images/219261794-bcc79db6-4dc6-4c6a-867b-3717b8-a3650f8968.webp)


最初に注目すべき点は、各種類のアドレスの長さが異なることです。これは、アドレス文字列の文字数、*または*関連するQRコードを見ることで視覚的に確認できます。アドレスが長くなるにつれて、QRコードは縮小され、正方形の中により多くのデータを収める傾向があります。

* `t1goiSyw2JinFCmUnfiwwp72LEZzD42TyYu`は35文字です
* `zs1cpf4prtmnqpg6x2ngcrwelu9a39z9l9lqukq9fwagnaqrknk34a7n3szwxpjuxfjdxkuzykel53`は78文字です
* `u1ckeydud0996ftppqrnpdsqyeq4e57qcyjr4raht4dc8j3njuyj3gmm9yk7hq9k88cdkqfuqusgpcpjfhwu3plm2vrd32g8du78kzkm5un357r4vkhz4vhxd4yfl8zvszk99cmsc89qv4trd7jzkcs8h6lukzgy25j8cv76p0g603nrrg6yt6cxsh2v8rmkasskd69ylfyphhjyv0cxs`は213文字です

次に注目すべき点は、各アドレス文字列の接頭辞です。公開型は*t*で始まり、saplingは*zs*で始まり、最後にUAは*u1*で始まります。

以下に注意することが重要です。

#### 「Orchardの支払い（payment）アドレスには、単独の文字列エンコーディングがありません。代わりに、Orchardを含む異なる種類のアドレスをまとめられる「統合アドレス」を定義します。統合アドレスのメインネットにおける人間可読部分は「u」であり、つまり接頭辞は「u1」になります。」

## 統合アドレスのレシーバー

[こちら](https://medium.com/@hanh425/transaction-privacy-78f80f9f175e)で説明したように、公開型、sapling、orchardのアドレス種類を組み合わせた異なるレシーバーでUAを構築できます。
完全なUAに加えて、実際によく見かけるものは以下のとおりです。

* 公開型 + sapling

![img4](/content-images/219267475-38ad1419-0aac-4205-b18e-687328-46b8f12f80.webp)

* 公開型 + orchard


![img5](/content-images/219267496-90db21ff-f4e1-4a50-8f2a-1a71d9-7423486eb5.webp)

* sapling + orchard


![img6](/content-images/219267520-6b731ec2-e911-4469-acc5-c39d4a-a89ba01b88.webp)

* orchard
  
![img7](/content-images/219267538-1a748fff-4034-4559-96ac-182723-3d69e23dac.webp)

最初に注目すべき点は、これらのUAがすべて同じ秘密鍵から作られていることです。次に注目すべき点は、各種類のUAの長さです。

* t+s `u13qutpuktq026dwczvxmnh8mxdacsjx3kg2rrhzgns8zsty53t9y0hqp5d440zc9w7z7zkkjqw8dq0uuc0mkt883464mq8mkys7l4xjnhylh7u3u02ukknurm5yxerqlf500y2atq28e` 141文字
* t+o `u1yvwppp7ann6n3pgkysdu0spvr50w4jf4jwgme3c8x8fp4av59rupgvdd3fddc3f2cwrk3ghs5lxt87ggj8cvjuzcrf4jkejwlu9pc83gk2vtx03ucqcc3ed0furcuypqs6d6swu3nws` 141文字
* s+o `u1dq8kg78fgpjsc7dn2ynpdzc8xu99wra0jec4jy30rjqk5frsj62qtgqcu9nn0j8g352phlwprshancgxcuhdcclx0wxtvqylhmuegas7ul8hwnwggy727l05pyujuywtnn4nkfznctaelpkcrqcm9cxhkgv3t9jtrvgym7la5varrmzc` 178文字
* o   `u1cysntkxwt0h4sahp7rhj7u27pgc2ga7685ekf65g0d5ht5glkfm4zkumhvkd2zg2pdrgv3mrwq2x3vw2yl5u7zef3cr2nqwrzu7v2dsa` 106文字

3つ目に注目すべき点は、視覚的に各UAがわずかに異なることです。UAの力は、エンドユーザーに提供する*選択肢*にあります。将来新しいプロトコルが必要になった場合でも、UAはすぐに対応できます。

## 情報源

https://zcash.github.io/orchard/design/keys.html

https://medium.com/@hanh425/transaction-privacy-78f80f9f175e
