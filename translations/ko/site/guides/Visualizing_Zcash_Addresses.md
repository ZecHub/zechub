<a href="https://github.com/zechub/zechub/edit/main/site/guides/Visualizing_Zcash_Addresses.md" target="_blank">
  <img src="https://img.shields.io/badge/Edit-blue" alt="Edit Page"/>
</a>


# Zcash 주소 시각화하기

Zcash를 처음 배우고 있다면, 곧바로 두 가지 유형의 [트랜잭션](https://zechub.wiki/using-zcash/transactions)이 존재한다는 것을 알게 될 것입니다: *transparent*와 *shielded*입니다.
또한 Zcash 생태계의 최신 발전을 계속 따라왔다면, [Unified Addresses](https://electriccoin.co/blog/unified-addresses-in-zcash-explained/) 또는 UA에 대해서도 들어보셨을 수 있습니다.
Zcash 업계에서 *shielded* 트랜잭션이라고 말할 때는, sapling 또는 orchard 프로토콜용으로 인코딩된 주소가 포함된 트랜잭션을 의미합니다. 
UA는 *어떤* 유형의 shielded 또는 transparent 트랜잭션이든 하나의 주소로 통합하도록 설계되었습니다. 이러한 일반화는 앞으로 UX를 단순화하는 핵심입니다. 이 가이드의 목적은 UA에 대한 이해를 구체적인 시각적 예시로 보완하는 것입니다.

## Zcash 주소의 유형

현재까지 사용되는 주요 주소 유형은 세 가지입니다. 여기에는 다음이 포함됩니다.

* transparent

![img1](https://user-images.githubusercontent.com/81990132/219261771-a9957ec3-2841-4073-9cfd-1db9d6356693.png)

* sapling

![img2](https://user-images.githubusercontent.com/81990132/219261784-1a617e70-f588-4eed-96bf-f0789d7af58a.png)

* Unified Address (전체)

![img3](https://user-images.githubusercontent.com/81990132/219261794-bcc79db6-4dc6-4c6a-867b-3717b81e6b71.png)


가장 먼저 눈에 띄는 점은 각 주소 유형의 길이가 서로 다르다는 것입니다. 주소 문자열에 포함된 문자 수를 통해서도, 또는 관련된 QR 코드를 통해서도 이를 시각적으로 확인할 수 있습니다. 주소 길이가 길어질수록 QR 코드는 더 축소되어 보이며, 정사각형 안에 더 많은 데이터를 담게 됩니다.

* `t1goiSyw2JinFCmUnfiwwp72LEZzD42TyYu` 는 35자입니다
* `zs1cpf4prtmnqpg6x2ngcrwelu9a39z9l9lqukq9fwagnaqrknk34a7n3szwxpjuxfjdxkuzykel53` 는 78자입니다
* `u1ckeydud0996ftppqrnpdsqyeq4e57qcyjr4raht4dc8j3njuyj3gmm9yk7hq9k88cdkqfuqusgpcpjfhwu3plm2vrd32g8du78kzkm5un357r4vkhz4vhxd4yfl8zvszk99cmsc89qv4trd7jzkcs8h6lukzgy25j8cv76p0g603nrrg6yt6cxsh2v8rmkasskd69ylfyphhjyv0cxs` 는 213자입니다

두 번째로 눈에 띄는 점은 각 주소 문자열의 접두사입니다 -- transparent는 *t*로 시작하고, sapling은 *zs*로 시작하며, 마지막으로 UA는 *u1*로 시작합니다.

다음 사항을 주의하는 것이 중요합니다:

#### "Orchard 결제 주소는 독립적인 문자열 인코딩을 갖지 않습니다. 대신 Orchard를 포함한 서로 다른 유형의 주소를 함께 묶을 수 있는 "unified addresses"를 정의합니다. Unified addresses는 Mainnet에서 사람이 읽을 수 있는 부분(Human-Readable Part)으로 "u"를 가지며, 즉 접두사는 "u1"이 됩니다. "

## Unified Address 수신기

[여기](https://medium.com/@hanh425/transaction-privacy-78f80f9f175e)에서 설명했듯이, transparent, sapling, orchard 주소 유형의 다양한 조합으로 UA를 만들 수 있습니다.
전체 UA 외에도, 실제 사용 환경에서 가장 흔히 보게 되는 형태는 다음과 같습니다:

* transparent + sapling

![img4](https://user-images.githubusercontent.com/81990132/219267475-38ad1419-0aac-4205-b18e-6873283f9d85.png)

* transparent + orchard


![img5](https://user-images.githubusercontent.com/81990132/219267496-90db21ff-f4e1-4a50-8f2a-1a71d995652a.png)

* sapling + orchard


![img6](https://user-images.githubusercontent.com/81990132/219267520-6b731ec2-e911-4469-acc5-c39d4addcac2.png)

* orchard
  
![img7](https://user-images.githubusercontent.com/81990132/219267538-1a748fff-4034-4559-96ac-182723409b3a.png)

첫 번째로 주목할 점은, 이 각각의 UA가 모두 같은 개인 키에서 나온다는 것입니다! 두 번째로 주목할 점은 각 UA 유형의 길이입니다:

* t+s `u13qutpuktq026dwczvxmnh8mxdacsjx3kg2rrhzgns8zsty53t9y0hqp5d440zc9w7z7zkkjqw8dq0uuc0mkt883464mq8mkys7l4xjnhylh7u3u02ukknurm5yxerqlf500y2atq28e` 141자
* t+o `u1yvwppp7ann6n3pgkysdu0spvr50w4jf4jwgme3c8x8fp4av59rupgvdd3fddc3f2cwrk3ghs5lxt87ggj8cvjuzcrf4jkejwlu9pc83gk2vtx03ucqcc3ed0furcuypqs6d6swu3nws` 141자
* s+o `u1dq8kg78fgpjsc7dn2ynpdzc8xu99wra0jec4jy30rjqk5frsj62qtgqcu9nn0j8g352phlwprshancgxcuhdcclx0wxtvqylhmuegas7ul8hwnwggy727l05pyujuywtnn4nkfznctaelpkcrqcm9cxhkgv3t9jtrvgym7la5varrmzc` 178자
* o   `u1cysntkxwt0h4sahp7rhj7u27pgc2ga7685ekf65g0d5ht5glkfm4zkumhvkd2zg2pdrgv3mrwq2x3vw2yl5u7zef3cr2nqwrzu7v2dsa` 106자

세 번째로 주목할 점은 각 UA가 시각적으로도 조금씩 다르다는 것입니다! UA의 강점은 최종 사용자에게 *선택권*을 제공한다는 데 있습니다. 앞으로 새로운 프로토콜이 필요해지더라도, UA는 바로 대응할 준비가 되어 있을 것입니다.

## 출처

https://zcash.github.io/orchard/design/keys.html

https://medium.com/@hanh425/transaction-privacy-78f80f9f175e
