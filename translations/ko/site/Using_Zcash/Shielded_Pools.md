<a href="https://github.com/zechub/zechub/edit/main/site/Using_Zcash/Shielded_Pools.md" target="_blank">
  <img src="https://img.shields.io/badge/Edit-blue" alt="페이지 편집"/>
</a>

# Zcash 가치 풀

## TL;DR

- Zcash에는 현재 **4개의 가치 풀**이 있습니다: Sprout(레거시), Sapling, Orchard, Transparent.
- **Orchard**는 Unified Address(u1...)에서 사용되는 현재의 주요 실드 풀입니다.
- **Sapling**(`zs`로 시작하는 z-주소)은 여전히 널리 지원되며, 상당한 양의 실드된 ZEC를 계속 보호하고 있습니다.
- **Transparent** 주소(t...)는 거래 프라이버시를 전혀 제공하지 않으며 Bitcoin과 유사하게 작동합니다.
- **Sprout**는 더 이상 적극적으로 사용되지 않는 레거시 실드 풀입니다.
- **Ironwood**라고 알려진 미래의 실드 풀이 제안되었으며, 이는 프라이버시를 유지하면서 실드된 ZEC 공급의 무결성에 대한 신뢰를 강화하기 위한 것입니다.
- 가장 강력한 프라이버시 보장을 위해 사용자는 가능할 때마다 계속해서 **shielded-to-shielded (z → z)** 거래를 선호해야 합니다.


<br/>

## Zcash 가치 풀 이해하기

Zcash는 자금을 가치 풀이라고 알려진 서로 다른 회계 시스템으로 분리합니다. 각 풀은 고유한 암호학적 규칙과 프라이버시 특성을 가지며, 프로토콜은 그 사이를 이동하는 총가치를 추적합니다.

오늘날 네트워크에는 네 가지 주요 가치 풀이 있습니다:

- Transparent — 공개적이며 온체인에서 완전히 보입니다.
- Sapling — 널리 채택된 최초의 현대적 실드 풀입니다.
- Orchard — Unified Address와 함께 도입된 현재의 주요 실드 풀입니다.
- Sprout — 2016년에 Zcash와 함께 출시된 최초의 실드 풀입니다.
  


Zcash가 발전함에 따라, 기존 자금과의 호환성을 유지하면서 보안, 프라이버시, 사용성, 감사 가능성을 개선하기 위해 새로운 실드 풀이 도입될 수 있습니다.

<br/>

![img1](https://github.com/user-attachments/assets/4ba8cca2-cea5-42d2-8ec2-2122b26f5144)
그림 1: 2025년 10월 기준 현재 4개 풀을 보여주는 차트

<br/>

## 실드 풀


1. <h3 id="orchard" class="text-3xl font-bold my-4">Orchard 풀</h3>


![img2](https://github.com/user-attachments/assets/a672e001-6dbc-4e76-ab31-0ed7d7d2ff72)
그림 2: 2025년 10월 기준 Orchard 풀을 보여주는 차트

<br/>

Orchard 실드 풀은 NU5 네트워크 업그레이드의 일부로 2022년 5월 31일에 활성화되었습니다. Orchard는 신뢰할 수 있는 설정(trusted setup)의 필요성을 없앤 새로운 실드 프로토콜을 도입했으며, Unified Address(UA)에서 사용되는 주요 실드 풀이 되었습니다.

Orchard는 기존의 실드 입력과 출력 대신 Action에 기반한 더 유연한 거래 모델을 도입하고, 거래 메타데이터 유출을 줄임으로써 사용성, 효율성, 프라이버시를 크게 개선했습니다.

오늘날 Orchard는 Zcash의 주요 실드 풀로 남아 있습니다. 그러나 커뮤니티는 Zcash의 프라이버시 보장을 유지하면서 실드된 ZEC 공급의 무결성에 대해 추가적인 확신을 제공할 새로운 실드 풀 Ironwood로의 미래 마이그레이션을 검토하고 있습니다.

[Zcash 실드 지갑](/site/Using_Zcash/Wallets)은 이제 Orchard를 지원합니다. 

____

2. <h3 id="sapling" class="text-3xl font-bold my-4">Sapling 풀</h3>


![img3](https://github.com/user-attachments/assets/b1c6bb71-9356-45eb-8e4a-19d7cf1790ae)
그림 3: 2025년 10월 기준 Sapling 풀을 보여주는 차트

<br/>

[Zcash Sapling](https://z.cash/upgrade/sapling)은 2018년 10월 28일에 도입된 Zcash 프로토콜 업그레이드입니다. 이는 프라이버시, 효율성, 사용성 측면에서 일부 한계를 갖고 있던 이전 버전인 Sprout에 비해 큰 개선입니다. 

업그레이드 내용에는 실드 주소의 성능 향상, 사용자의 개인 키를 노출하지 않고도 수신 및 송신 거래를 볼 수 있게 해주는 개선된 Viewing Key, 그리고 거래 서명 시 하드웨어 지갑을 위한 독립적인 Zero Knowledge 키 등이 포함됩니다. 

Zcash Sapling은 Sprout 시리즈에서 더 오래 걸리던 것과 비교해 사용자가 몇 초 만에 개인 거래를 수행할 수 있게 해줍니다. 

거래 실딩은 프라이버시를 강화하여 제3자가 거래를 연결하거나 전송되는 ZEC의 양을 파악하는 것을 불가능하게 만듭니다. Sapling은 또한 개인 거래 생성에 필요한 계산 요구사항을 줄여 사용성을 높이고, 더 많은 사용자가 접근할 수 있게 합니다.

Sapling 지갑 주소는 "zs"로 시작하며, 이는 내장된 Sapling 주소를 가진 모든 지원 Zcash 실드 지갑(YWallet, Zingo Wallet Nighthawk 등)에서 확인할 수 있습니다. Zcash Sapling은 거래의 프라이버시와 효율성 측면에서 중요한 기술 발전을 나타내며, 이는 Zcash를 프라이버시와 보안을 중시하는 사용자에게 실용적이고 효과적인 암호화폐로 만들어 줍니다.

____

3. <h3 id="sprout" class="text-3xl font-bold my-4">Sprout 풀</h3>


![img4](https://github.com/user-attachments/assets/956eceed-f4d6-4087-99d0-32a770449dda)
그림 4: 2025년 10월 기준 Sprout 풀을 보여주는 차트

Sprout는 지금까지 출시된 최초의 개방형 무허가 Zero Knowledge 프라이버시 프로토콜이었습니다. 2016년 10월 28일에 출시되었습니다.

Sprout 주소는 항상 "zc"인 앞 두 글자로 식별됩니다. "Sprout"라는 이름은 이 소프트웨어가 젊고, 싹트는 단계의 블록체인이며, 크게 성장할 잠재력을 지니고 있고 개발에 열려 있음을 강조하기 위해 붙여졌습니다. 

Sprout는 [Zcash slow start Mining](https://electriccoin.co/blog/slow-start-and-mining-ecosystem/)의 초기 도구로 사용되었으며, 이를 통해 채굴자들에게 ZEC와 블록 보상이 분배되었습니다. 

실드 거래 수가 증가하면서 Zcash 생태계가 계속 확장되자, Zcash Sprout 시리즈는 사용자 프라이버시, 거래 확장성, 처리 측면에서 한계가 있고 효율성이 떨어진다는 점이 관찰되었습니다. 이로 인해 네트워크 수정과 Sapling 업그레이드가 이루어졌습니다. 

---
4. <h3 id="transparent" class="text-3xl font-bold my-4">Transparent 풀</h3>
<br/>

![img5](https://github.com/user-attachments/assets/01de2907-b62d-4421-83d7-ea4908faa828)
그림 5: 2025년 10월 기준 Transparent 풀을 보여주는 차트

<br/>

Zcash Transparent 풀은 비실드형이며 비공개가 아닙니다. Zcash의 Transparent 지갑 주소는 "t"로 시작하며, 이 주소 유형을 거래에 사용할 경우 프라이버시 수준은 매우 낮습니다.

Zcash의 Transparent 거래는 Bitcoin 거래와 유사하며, 다중서명 거래를 지원하고 표준 공개 주소를 사용합니다.

Zcash Transparent는 주로 중앙화 거래소에서 사용되며, 사용자 간 ZEC 송수신 시 높은 투명성과 네트워크 확인을 보장하기 위한 목적입니다.

또한 Zcash 실드 주소는 거래 중 높은 프라이버시를 제공하지만, 거래를 처리하는 데 더 많은 계산 자원이 필요하다는 점도 중요합니다. 따라서 일부 사용자는 동일한 수준의 프라이버시가 필요하지 않은 거래에 Transparent 주소를 사용할 수 있습니다.

<br/>

## 풀 전송 권장 모범 사례

Zcash 네트워크에서 거래 중 높은 수준의 프라이버시를 고려할 때는 아래의 관행을 따르는 것이 권장됩니다;

Zcash 블록체인에서 "z to z" 지갑 간에 발생하는 거래는 대부분 실드되며, 생성되는 높은 수준의 프라이버시 때문에 때때로 Private Transaction이라고도 불립니다. 이는 프라이버시가 필요할 때 $ZEC를 송수신하는 가장 좋고 가장 권장되는 방식입니다. 

---

"Z-address"에서 "T-address"로 ZEC를 보내는 것은 단순히 Deshielding 거래의 한 형태를 의미합니다. 이런 유형의 거래에서는 Transparent Address로 ZEC를 보내는 영향 때문에 일부 정보가 블록체인에 보이게 되므로 프라이버시 수준이 항상 높지는 않습니다. 높은 프라이버시가 필요할 때는 Deshielding 거래가 항상 권장되지는 않습니다. 

---

Transparent Address(T-address)에서 Z-address로 ZEC를 전송하는 것은 단순히 Shielding이라고 알려져 있습니다. 이 유형의 거래에서 프라이버시 수준은 z-z 거래와 비교하면 항상 높지는 않지만, 프라이버시가 필요할 때 역시 권장됩니다. 

---

Zcash 네트워크에서 Transparent Address(T-address)에서 다른 Transparent Address(T-address)로 ZEC를 보내는 것(T-T 거래)은 Bitcoin 거래와 매우 유사하며, 이 때문에 Zcash의 T-T 거래는 항상 공개 거래(Public transactions)라고 불립니다. 송신자와 수신자의 거래 세부 정보가 모두 대중에게 보이게 되어 이런 거래의 프라이버시 수준은 매우 낮기 때문입니다. 

대부분의 중앙화 암호화폐 거래소는 Zcash 블록체인에서 거래할 때 Transparent Address("T-address)를 사용하지만, 이런 유형의 거래(T-T)에는 어떠한 프라이버시 특성도 없습니다.

<br/>

## 미래: Ironwood 풀

Zcash 커뮤니티는 현재 Ironwood라는 제안된 실드 풀을 검토하고 있습니다.

Ironwood는 Orchard의 증명 시스템에서 최근 발견되어 패치된 취약점을 해결하도록 설계되었습니다. 해당 취약점이 실제로 악용되었다는 증거는 없지만, Ironwood는 Orchard에서 새로 생성된 실드 풀로의 통제된 마이그레이션을 가능하게 함으로써 추가적인 보증 계층을 제공할 것입니다.

목표는 Zcash 프라이버시를 대체하는 것이 아니라, 실드된 ZEC 공급의 무결성에 대한 신뢰를 강화하는 것입니다.

## 제안에 따르면:

1. 새로운 실드 활동은 점진적으로 Ironwood로 이동하게 됩니다.
2. 기존 Orchard 자금은 비공개로 마이그레이션될 수 있습니다.
3. 공개 turnstile 회계는 모든 실드 자금이 완전히 담보되고 있다는 더 강력한 증거를 제공할 것입니다.
4. 사용자는 Zcash에서 기대하는 동일한 프라이버시 보호를 유지하게 됩니다.

<br/>
향후 네트워크 업그레이드를 통해 활성화된다면, Ironwood는 기존 실드 자금과의 호환성을 유지하면서 Zcash 실드 생태계의 다음 세대가 될 것입니다.

<br/>

## 피해야 할 흔한 실수

- **t-address에서 t-address로 전송하기** — 완전히 공개되며 프라이버시가 없습니다. 항상 먼저 자금을 실드하세요.
- **Sapling 주소와 Orchard 주소를 혼동하기** — Sapling 주소는 `zs`로 시작하고, Orchard/Unified 주소는 `u1`로 시작합니다.
- **자금을 Sprout 풀에 남겨두기** — Sprout는 더 이상 권장되지 않습니다; 자금을 Orchard로 마이그레이션하세요.
- **t → z (shielding)가 완전히 비공개라고 가정하기** — 실딩 행위 자체는 온체인에서 보이지만, 내용은 보이지 않습니다.

---

## 관련 페이지

- [지갑](/using-zcash/wallets) — 어떤 지갑이 Orchard 및 Sapling 풀을 지원하는지
- [거래](/using-zcash/transactions) — 실드 거래를 보내는 방법
- [ZEC 구매하기](/using-zcash/buying-zec) — 풀에서 사용하기 전에 ZEC를 획득하는 방법
- [ZK-SNARKs](/zcash-tech/zk-snarks) — 실드 풀의 암호학적 기반
- [ZEC와 Zcash란 무엇인가](/start-here/what-is-zec-and-zcash) — Zcash 프라이버시에 대한 배경
