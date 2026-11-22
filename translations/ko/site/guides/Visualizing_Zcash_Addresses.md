<a href="https://github.com/zechub/zechub/edit/main/site/guides/Visualizing_Zcash_Addresses.md" target="_blank">
  <img src="https://img.shields.io/badge/Edit-blue" alt="페이지 편집"/>
</a>


# Zcash 주소 시각화

Zcash에 대해 처음 배우는 경우, 곧 [거래](https://zechub.wiki/using-zcash/transactions)에는 *투명* 거래와 *거래정보 보호* 거래, 이렇게 2가지 유형이 있음을 알게 됩니다.
또한 Zcash 생태계의 최신 동향을 살펴보고 계셨다면 [통합 주소](https://zips.z.cash/zip-0316), 즉 UA에 대해 들어보셨을 수 있습니다.
Zcash 업계에서 *거래정보 보호* 거래를 이야기할 때는 Sapling 또는 Orchard 프로토콜용으로 인코딩된 주소가 포함된 거래를 뜻합니다.
UA는 거래정보 보호 주소나 투명 주소 등 *모든* 유형의 거래를 하나의 주소로 통합하도록 설계되었습니다. 이러한 일반화는 앞으로 사용자 경험(UX)을 단순화하는 핵심입니다. 이 가이드는 구체적인 시각적 예시를 통해 UA에 대한 이해를 돕기 위해 작성되었습니다.

## Zcash 주소 유형

현재까지 사용되고 있는 주요 주소 유형은 3가지입니다. 다음과 같습니다.

* 투명

![img1](/content-images/219261771-a9957ec3-2841-4073-9cfd-1db9d6-574fc930f0.webp)

* Sapling

![img2](/content-images/219261784-1a617e70-f588-4eed-96bf-f0789d-e10ebfc543.webp)

* 통합 주소(전체)

![img3](/content-images/219261794-bcc79db6-4dc6-4c6a-867b-3717b8-a3650f8968.webp)


먼저 각 주소 유형의 길이가 서로 다르다는 점을 확인해 보세요. 주소 문자열의 문자 수를 세거나 해당 QR 코드를 살펴보면 이를 시각적으로 알 수 있습니다. 주소가 길어질수록 QR 코드는 더 많은 데이터를 정사각형 안에 담기 위해 축소되는 경향이 있습니다.

* `t1goiSyw2JinFCmUnfiwwp72LEZzD42TyYu`은 35자입니다.
* `zs1cpf4prtmnqpg6x2ngcrwelu9a39z9l9lqukq9fwagnaqrknk34a7n3szwxpjuxfjdxkuzykel53`은 78자입니다.
* `u1ckeydud0996ftppqrnpdsqyeq4e57qcyjr4raht4dc8j3njuyj3gmm9yk7hq9k88cdkqfuqusgpcpjfhwu3plm2vrd32g8du78kzkm5un357r4vkhz4vhxd4yfl8zvszk99cmsc89qv4trd7jzkcs8h6lukzgy25j8cv76p0g603nrrg6yt6cxsh2v8rmkasskd69ylfyphhjyv0cxs`은 213자입니다.

두 번째로 각 주소 문자열의 접두사를 살펴보세요. 투명 주소는 *t*로, Sapling 주소는 *zs*로 시작하며 UA는 *u1*로 시작합니다.

다음 사항에 유의하세요.

#### “Orchard 결제 주소는 독립된 문자열 인코딩을 사용하지 않습니다. 대신 Orchard을 포함한 여러 유형의 주소를 묶을 수 있는 ‘통합 주소’를 정의합니다. 통합 주소의 사람이 읽을 수 있는 부분은 Mainnet에서 ‘u’이므로 접두사는 ‘u1’입니다.”

## 통합 주소의 리시버

[여기](https://medium.com/@hanh425/transaction-privacy-78f80f9f175e)에서 설명한 것처럼 UA는 서로 다른 리시버로 구성할 수 있습니다. 즉, 투명 주소, Sapling 주소, Orchard 주소 유형을 조합할 수 있습니다.
전체 UA 외에도 실제로 가장 흔히 볼 수 있는 유형은 다음과 같습니다.

* 투명 + Sapling

![img4](/content-images/219267475-38ad1419-0aac-4205-b18e-687328-46b8f12f80.webp)

* 투명 + Orchard


![img5](/content-images/219267496-90db21ff-f4e1-4a50-8f2a-1a71d9-7423486eb5.webp)

* Sapling + Orchard


![img6](/content-images/219267520-6b731ec2-e911-4469-acc5-c39d4a-a89ba01b88.webp)

* Orchard
  
![img7](/content-images/219267538-1a748fff-4034-4559-96ac-182723-3d69e23dac.webp)

먼저 이 UA들이 모두 동일한 프라이빗 키에서 생성되었다는 점에 유의하세요. 두 번째로 각 UA 유형의 길이를 살펴보세요.

* t+s `u13qutpuktq026dwczvxmnh8mxdacsjx3kg2rrhzgns8zsty53t9y0hqp5d440zc9w7z7zkkjqw8dq0uuc0mkt883464mq8mkys7l4xjnhylh7u3u02ukknurm5yxerqlf500y2atq28e` 141자
* t+o `u1yvwppp7ann6n3pgkysdu0spvr50w4jf4jwgme3c8x8fp4av59rupgvdd3fddc3f2cwrk3ghs5lxt87ggj8cvjuzcrf4jkejwlu9pc83gk2vtx03ucqcc3ed0furcuypqs6d6swu3nws` 141자
* s+o `u1dq8kg78fgpjsc7dn2ynpdzc8xu99wra0jec4jy30rjqk5frsj62qtgqcu9nn0j8g352phlwprshancgxcuhdcclx0wxtvqylhmuegas7ul8hwnwggy727l05pyujuywtnn4nkfznctaelpkcrqcm9cxhkgv3t9jtrvgym7la5varrmzc` 178자
* o   `u1cysntkxwt0h4sahp7rhj7u27pgc2ga7685ekf65g0d5ht5glkfm4zkumhvkd2zg2pdrgv3mrwq2x3vw2yl5u7zef3cr2nqwrzu7v2dsa` 106자

세 번째로 각 UA가 시각적으로 조금씩 다르다는 점에 유의하세요. UA의 강점은 최종 사용자에게 제공하는 *선택권*입니다. 앞으로 새로운 프로토콜이 필요해지더라도 UA는 바로 사용할 수 있습니다.

## 출처

https://zcash.github.io/orchard/design/keys.html

https://medium.com/@hanh425/transaction-privacy-78f80f9f175e
