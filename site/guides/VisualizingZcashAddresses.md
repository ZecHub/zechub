
# Visualizing Zcash Addresses

If you're learning about Zcash for the first time you will immediately realize there are two types of [transactions](https://zechub.notion.site/Transactions-2862a2c98a104c3fa08402fb9d5b71b8) that can occur: *transparent* and *shielded*.
Furthermore, if you have been keeping up with the latest developments in the Zcash ecosystem, you may have learned about [Unified Addresses](https://electriccoin.co/blog/unified-addresses-in-zcash-explained/), or UA's.
When folks in the Zcash industry talk about *shielded* transactions, they mean transactions that involve addresses that are encoded for either the sapling or orchard protocols. 
UA's are designed to unify *any* type of shielded or transparent transaction into a single address. This generalization is the key to simplifying the UX moving forward. The purpose of this guide is to supplement understanding of UA's with concrete visual examples.

## Types of Zcash addresses

Currently there are three main types of addresses in use to date. These include

* transparent

![trans1](https://user-images.githubusercontent.com/81990132/219261771-a9957ec3-2841-4073-9cfd-1db9d6356693.png)


* sapling

![Sapling](https://user-images.githubusercontent.com/81990132/219261784-1a617e70-f588-4eed-96bf-f0789d7af58a.png)


* Unified Address (Full)

![fullUA](https://user-images.githubusercontent.com/81990132/219261794-bcc79db6-4dc6-4c6a-867b-3717b81e6b71.png)


First thing to notice is how the length of each type of address is different. You can see this visually by the number of characters in the address string *or* by looking at the associated QR codes. As length of the address increases, the QR code tends to zoom out and fit more data into the square.

* `t1goiSyw2JinFCmUnfiwwp72LEZzD42TyYu` is 35 characters long
* `zs1cpf4prtmnqpg6x2ngcrwelu9a39z9l9lqukq9fwagnaqrknk34a7n3szwxpjuxfjdxkuzykel53` is 78 characters long
* `u1ckeydud0996ftppqrnpdsqyeq4e57qcyjr4raht4dc8j3njuyj3gmm9yk7hq9k88cdkqfuqusgpcpjfhwu3plm2vrd32g8du78kzkm5un357r4vkhz4vhxd4yfl8zvszk99cmsc89qv4trd7jzkcs8h6lukzgy25j8cv76p0g603nrrg6yt6cxsh2v8rmkasskd69ylfyphhjyv0cxs` is 213 characters long

Second thing to notice is the prefix of each address string -- transparent start with a *t*, sapling with a *zs*, and finally UA's with a *u1*.

It is important to note:

#### "Orchard payment addresses do not have a stand-alone string encoding. Instead, we define "unified addresses" that can bundle together addresses of different types, including Orchard. Unified addresses have a Human-Readable Part of "u" on Mainnet, i.e. they will have the prefix "u1". "

## Unified Address receivers

As discussed [here](https://medium.com/@hanh425/transaction-privacy-78f80f9f175e) one can build UA's with different receivers -- some combination of transparent,sapling, and orchard address types.
Besides a full UA, here are the most common that you will find the wild:

* transparent + sapling

![TransSaplingUA](https://user-images.githubusercontent.com/81990132/219267475-38ad1419-0aac-4205-b18e-6873283f9d85.png)


* transparent + orchard

![TransOrchUA](https://user-images.githubusercontent.com/81990132/219267496-90db21ff-f4e1-4a50-8f2a-1a71d995652a.png)


* sapling + orchard

![SapOrcUA](https://user-images.githubusercontent.com/81990132/219267520-6b731ec2-e911-4469-acc5-c39d4addcac2.png)


* orchard

![OrchUA](https://user-images.githubusercontent.com/81990132/219267538-1a748fff-4034-4559-96ac-182723409b3a.png)


First thing to note is that each of these UA's are from the same private key! Second thing to note is the lengths of each type of UA:

* t+s `u13qutpuktq026dwczvxmnh8mxdacsjx3kg2rrhzgns8zsty53t9y0hqp5d440zc9w7z7zkkjqw8dq0uuc0mkt883464mq8mkys7l4xjnhylh7u3u02ukknurm5yxerqlf500y2atq28e` 141 characters
* t+o `u1yvwppp7ann6n3pgkysdu0spvr50w4jf4jwgme3c8x8fp4av59rupgvdd3fddc3f2cwrk3ghs5lxt87ggj8cvjuzcrf4jkejwlu9pc83gk2vtx03ucqcc3ed0furcuypqs6d6swu3nws` 141 characters
* s+o `u1dq8kg78fgpjsc7dn2ynpdzc8xu99wra0jec4jy30rjqk5frsj62qtgqcu9nn0j8g352phlwprshancgxcuhdcclx0wxtvqylhmuegas7ul8hwnwggy727l05pyujuywtnn4nkfznctaelpkcrqcm9cxhkgv3t9jtrvgym7la5varrmzc` 178 characters
* o   `u1cysntkxwt0h4sahp7rhj7u27pgc2ga7685ekf65g0d5ht5glkfm4zkumhvkd2zg2pdrgv3mrwq2x3vw2yl5u7zef3cr2nqwrzu7v2dsa` 106 characters

Third thing to note is how visually each UA is slightly different! The power of UA's is the *choice* they allow for end users. If in the future a new protocol is needed, UA's will be ready to roll.

## Sources

https://zcash.github.io/orchard/design/keys.html

https://medium.com/@hanh425/transaction-privacy-78f80f9f175e
