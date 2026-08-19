<a href="https://github.com/zechub/zechub/edit/main/site/Using_Zcash/Shielded_Pools.md" target="_blank">
  <img src="https://img.shields.io/badge/Edit-blue" alt="Edit Page"/>
</a>

# Zcash 가치 풀

## TL;DR

- Zcash에는 현재 **5개의 가치 풀**이 있습니다: Sprout(레거시), Sapling, Orchard(지출 전용), Ironwood, Transparent.
- **Ironwood**는 현재의 주요 실드 풀로, 2026년 7월 28일 NU6.3 업그레이드부터 활성화되었습니다.
- **Orchard**는 이제 **지출 전용**입니다: 새로운 가치는 더 이상 이 풀로 들어갈 수 없으며, 기존 자금은 Ironwood로 이전됩니다.
- `zs`로 시작하는 **Sapling** 주소는 여전히 널리 지원되며, 상당한 양의 실드된 ZEC를 계속 보호하고 있습니다.
- **Transparent** 주소(t...)는 거래 프라이버시를 제공하지 않으며 Bitcoin과 유사하게 작동합니다.
- **Sprout**는 더 이상 활발히 사용되지 않는 레거시 실드 풀입니다.
- Orchard에서 Ironwood로의 마이그레이션은 **진행 중**이며, turnstile에 의해 공개적으로 감사됩니다.
- 가장 강력한 프라이버시 보장을 위해 사용자는 가능한 한 계속해서 **실드 간(z → z)** 거래를 선호해야 합니다.


<br/>

## Zcash 가치 풀 이해하기

Zcash는 자금을 가치 풀이라고 알려진 별도의 회계 시스템으로 분리합니다. 각 풀은 고유한 암호학적 규칙과 프라이버시 특성을 가지며, 프로토콜은 그 사이를 이동하는 총가치를 추적합니다.

현재 네트워크에는 다섯 가지 주요 가치 풀이 있습니다:

- Transparent — 공개되며 온체인에서 완전히 보입니다.
- Sapling — 널리 채택된 첫 번째 현대적 실드 풀로, 여전히 활성 상태입니다.
- Orchard — 이전의 주요 실드 풀로, 현재는 지출 전용입니다.
- Ironwood — NU6.3와 함께 도입된 현재의 주요 실드 풀입니다.
- Sprout — 2016년 Zcash와 함께 출시된 최초의 실드 풀입니다.
  


Zcash가 발전함에 따라 기존 자금과의 호환성을 유지하면서 보안, 프라이버시, 사용성, 감사 가능성을 개선하기 위해 새로운 실드 풀이 도입될 수 있습니다.

<br/>

![img1](/content-images/4ba8cca2-cea5-42d2-8ec2-2122b26f5144-9db37e245e.webp)
그림 1: 2025년 10월 기준 현재 4개 풀을 보여주는 차트

<br/>

## 실드 풀


1. <h3 id="ironwood" class="text-3xl font-bold my-4">Ironwood 풀</h3>

Ironwood는 현재의 주요 실드 풀입니다. 2026년 7월 28일 블록 3,428,143에서 NU6.3 네트워크 업그레이드의 일부로 활성화되었으며, 이제 새로운 실드된 가치는 이곳에 존재합니다.

이 풀이 존재하는 이유는 2026년 5월 Orchard의 증명 시스템에서 취약점이 발견되었기 때문입니다. 실제로 악용되었다는 증거는 없지만, 그 결함은 증명만으로는 실드된 공급량의 건전성을 입증할 수 없다는 뜻이었습니다. 제자리에서 패치하는 대신, 네트워크는 수정된 회로를 갖춘 새로운 풀을 만들고 모든 코인을 공개적으로 집계하는 turnstile을 통해 가치를 이동시켰습니다. 그 회계 처리가 바로 실드된 공급량이 완전히 담보되어 있다는 보장을 복원합니다.

Ironwood는 Orchard의 Action 모델과 Halo 2 증명을 재사용하므로, 일상적으로는 동일하게 작동합니다. 새로운 점은 두 가지입니다: 거래가 v6 형식을 사용하며, Ironwood 노트는 [ZIP 2005](https://zips.z.cash/zip-2005)에 따라 **양자 복구 가능(quantum-recoverable)** 합니다. 즉, 미래의 양자 컴퓨터가 오늘날의 암호를 깨더라도 코인의 온체인 기록은 복구 가능하게 유지됩니다. 이는 복구 경로일 뿐 양자 내성을 의미하지 않으며, 이전 풀에는 적용되지 않습니다.

새 주소를 만들 필요는 없습니다. Unified Address는 여러 수신자를 묶어 주며, 지갑이 적절한 풀을 대신 선택해 줍니다.

____

2. <h3 id="orchard" class="text-3xl font-bold my-4">Orchard 풀</h3>


![img2](/content-images/a672e001-6dbc-4e76-ab31-0ed7d7d2ff72-93b5a23e5d.webp)
그림 2: 2025년 10월 기준 Orchard 풀을 보여주는 차트

<br/>

Orchard 실드 풀은 NU5 네트워크 업그레이드의 일부로 2022년 5월 31일에 활성화되었습니다. Orchard는 신뢰 설정이 필요 없는 새로운 실드 프로토콜을 도입했으며, Unified Address(UAs)에서 사용되는 주요 실드 풀이 되었습니다.

Orchard는 거래 메타데이터 유출을 줄이고 전통적인 실드 입력과 출력이 아닌 Actions를 기반으로 한 더 유연한 거래 모델을 도입함으로써 사용성, 효율성, 프라이버시를 크게 개선했습니다.

2026년 7월 28일 Ironwood 업그레이드가 활성화된 이후, **Orchard는 지출 전용**입니다. 새로운 가치는 이 풀에 들어갈 수 없습니다. 이미 그곳에 보관된 자금은 여전히 사용할 수 있으며, turnstile을 통해 Ironwood로 이동하고 있습니다. 지갑이 이를 대신 처리해 주지만, 대부분은 그 속도를 어느 정도 제어할 수 있게 해줍니다.

Orchard 자금을 보유하고 있다면, 실제로 이 마이그레이션이 무엇을 의미하는지 [Ironwood](/zcash-tech/ironwood)를 참고하세요.

____

3. <h3 id="sapling" class="text-3xl font-bold my-4">Sapling 풀</h3>


![img3](/content-images/b1c6bb71-9356-45eb-8e4a-19d7cf1790ae-5e3051b082.webp)
그림 3: 2025년 10월 기준 Sapling 풀을 보여주는 차트

<br/>

[Zcash Sapling](https://z.cash/upgrade/sapling)은 2018년 10월 28일에 도입된 Zcash 프로토콜 업그레이드입니다. 이는 이전 버전인 Sprout에 비해 큰 개선으로, Sprout은 프라이버시, 효율성, 사용성 측면에서 몇 가지 한계를 가지고 있었습니다.

업그레이드 내용에는 실드 주소의 성능 향상, 사용자의 개인 키를 노출하지 않고도 들어오고 나가는 거래를 볼 수 있게 해주는 향상된 Viewing Key, 그리고 거래 서명 시 하드웨어 지갑을 위한 독립적인 Zero Knowledge 키가 포함됩니다.

Zcash Sapling은 사용자가 Sprout 시리즈에서 더 오래 걸리던 것과 비교해 몇 초 만에 비공개 거래를 수행할 수 있게 해줍니다.

거래 실드는 프라이버시를 강화하여 제3자가 거래를 연결하거나 전송되는 ZEC의 양을 파악할 수 없게 만듭니다. Sapling은 또한 비공개 거래 생성에 필요한 계산 요구량을 줄여 사용자 접근성을 높임으로써 사용성을 개선합니다.

Sapling 지갑 주소는 "zs"로 시작하며, 이는 Sapling 주소가 내장된 지원되는 모든 Zcash 실드 지갑(YWallet, Zingo Wallet, Nighthawk 등)에서 확인할 수 있습니다. Zcash Sapling은 거래의 프라이버시와 효율성 측면에서 중요한 기술 발전을 나타내며, 이는 Zcash를 프라이버시와 보안을 중시하는 사용자에게 실용적이고 효과적인 암호화폐로 만들어 줍니다.

____

4. <h3 id="sprout" class="text-3xl font-bold my-4">Sprout 풀</h3>


![img4](/content-images/956eceed-f4d6-4087-99d0-32a770449dda-a3cc45305e.webp)
그림 4: 2025년 10월 기준 Sprout 풀을 보여주는 차트

Sprout는 최초로 출시된 개방형 무허가 Zero Knowledge 프라이버시 프로토콜이었습니다. 2016년 10월 28일에 출시되었습니다.

Sprout 주소는 항상 "zc"로 시작하는 처음 두 글자로 식별됩니다. "Sprout"라는 이름은 이 소프트웨어가 젊고, 막 싹튼 블록체인으로서 크게 성장할 잠재력이 있으며 개발에 열려 있음을 강조하기 위해 붙여졌습니다.

Sprout는 [Zcash slow start Mining](https://electriccoin.co/blog/slow-start-and-mining-ecosystem/)의 초기 도구로 사용되었으며, 이를 통해 채굴자들에게 ZEC와 블록 보상이 분배되었습니다.

실드 거래 수가 증가하면서 Zcash 생태계가 계속 확장되자, Zcash Sprout 시리즈는 사용자 프라이버시, 거래 확장성, 처리 측면에서 한계가 있고 효율성이 떨어진다는 점이 관찰되었습니다. 이것이 네트워크 수정과 Sapling 업그레이드로 이어졌습니다.

---
5. <h3 id="transparent" class="text-3xl font-bold my-4">Transparent 풀</h3>
<br/>

![img5](/content-images/01de2907-b62d-4421-83d7-ea4908faa828-6f74b724ed.webp)
그림 5: 2025년 10월 기준 Transparent 풀을 보여주는 차트

<br/>

Zcash Transparent 풀은 비실드이며 비공개가 아닙니다. Zcash의 Transparent 지갑 주소는 "t"로 시작하며, 이 주소 유형을 사용한 거래는 프라이버시 수준이 매우 낮습니다.

Zcash의 Transparent 거래는 Bitcoin 거래와 유사하며, 다중 서명 거래를 지원하고 표준 공개 주소를 사용합니다.

Zcash의 Transparent 주소는 주로 중앙화 거래소에서 사용되며, 사용자 간 ZEC를 송수신할 때 높은 투명성과 네트워크 확인을 보장합니다.

또한 Zcash 실드 주소는 거래 중 높은 프라이버시를 제공하지만, 거래를 처리하는 데 더 많은 계산 자원이 필요하다는 점도 중요합니다. 따라서 일부 사용자는 동일한 수준의 프라이버시가 필요하지 않은 거래에 Transparent 주소를 사용할 수 있습니다.

<br/>

## 풀 간 전송 권장 관행

Zcash 네트워크에서 거래 중 높은 수준의 프라이버시를 고려할 때는 아래 관행을 따르는 것이 권장됩니다;

Zcash 블록체인에서 "z to z" 지갑 간에 발생하는 거래는 대부분 실드되며, 높은 수준의 프라이버시가 생성되기 때문에 때때로 비공개 거래라고 불립니다. 이는 프라이버시가 필요할 때 $ZEC를 송수신하는 가장 좋고 가장 권장되는 방법입니다.

---

"Z-address"에서 "T-address"로 ZEC를 보내는 것은 단순히 디실딩 거래의 한 형태를 의미합니다. 이런 유형의 거래에서는 ZEC가 Transparent 주소로 전송되는 영향 때문에 일부 정보가 블록체인에 표시되므로 프라이버시 수준이 항상 높지는 않습니다. 높은 프라이버시가 필요할 때는 디실딩 거래가 항상 권장되지는 않습니다.

---

Transparent 주소(T-address)에서 Z-address로 ZEC를 전송하는 것은 단순히 실딩이라고 합니다. 이런 유형의 거래에서 프라이버시 수준은 z-z 거래와 비교하면 항상 높지는 않지만, 프라이버시가 필요할 때 권장되기도 합니다.

---

Zcash 네트워크에서 Transparent 주소(T-address)에서 또 다른 Transparent 주소(T-address)로 ZEC를 보내는 것(T-T 거래)은 Bitcoin 거래와 매우 유사합니다. 그래서 Zcash의 T-T 거래는 항상 공개 거래라고 불리는데, 송신자와 수신자의 거래 세부 정보가 모두 대중에게 보이게 되어 그러한 거래의 프라이버시 수준이 매우 낮기 때문입니다.

대부분의 중앙화 암호화폐 거래소는 Zcash 블록체인에서 거래할 때 Transparent 주소("T-address)를 사용하지만, 이런 유형의 거래(T-T)는 어떤 비공개 특성도 가지지 않습니다.

<br/>

## Orchard에서 Ironwood로의 마이그레이션

마이그레이션은 지금 진행 중입니다. Orchard는 새로운 입금이 막혀 있으며, 그 안에 남아 있는 가치는 거래 한 건씩 Ironwood로 이동하고 있습니다. 총량은 [ironwood.live](https://ironwood.live/)에서 확인할 수 있습니다.

이것이 의미하는 바는 자금이 어디에 있느냐에 따라 달라집니다:

1. **새로운 실드 활동**은 자동으로 Ironwood로 들어갑니다. 할 일은 없습니다.
2. **기존 Orchard 자금**은 마이그레이션이 필요합니다. 유지 관리되는 지갑이 이를 대신 처리하며, 보통 한 번에 전부 옮기기보다는 단계적으로 진행합니다.
3. **Sapling은 영향을 받지 않으며** 여전히 자금을 받을 수 있습니다. 봉인된 것은 Orchard뿐입니다.
4. **turnstile은** 풀 사이를 건너는 모든 것을 집계하며, 이것이 바로 이동 과정에서 어떤 코인도 새로 만들어지지 않았음을 증명합니다.

> **알아둘 만한 프라이버시 관련 주의점 하나.** turnstile은 풀 사이를 건너는 *금액*과 그 블록 높이를 공개합니다. 송신자와 수신자는 언제나처럼 숨겨지지만, 눈에 띄는 금액은 당신과 연결될 수 있습니다. 그래서 지갑은 당신의 잔액을 한 번에 알아보기 쉬운 큰 덩어리로 옮기지 않고, 표준 액면 단위를 사용해 단계적으로 마이그레이션합니다. 지갑이 자체 속도로 진행하도록 두고, 이동하는 금액이 당신의 IP와 연결되지 않도록 Tor 또는 VPN 사용을 고려하세요.

업그레이드 자체에 대해서는 [Ironwood](/zcash-tech/ironwood)를, 회계가 어떻게 작동하는지에 대해서는 [The Turnstile](/zcash-tech/the-turnstile)를 참고하세요.

<br/>

## 피해야 할 흔한 실수

- **t-address에서 t-address로 보내기** — 완전히 공개되며 프라이버시가 없습니다. 항상 먼저 자금을 실드하세요.
- **Orchard가 여전히 자금을 받을 수 있다고 가정하기** — 2026년 7월 28일부터 지출 전용입니다. 가치는 나갈 수 있지만 새로운 가치는 들어갈 수 없습니다
- **Sapling과 Unified Address를 혼동하기** — Sapling 주소는 `zs`로 시작합니다. Unified Address는 `u1`로 시작하며 여러 수신자를 묶으므로, 결제가 어느 풀에 도착하는지는 그 주소가 어떤 수신자를 담고 있는지에 따라 달라집니다
- **Sprout 풀에 자금을 남겨두기** — Sprout는 수년 전부터 더 이상 권장되지 않았습니다. 그 자금은 옮기세요
- **마이그레이션이 완전히 보이지 않을 것이라 기대하기** — turnstile을 통과하는 금액은 공개되며, 송신자와 수신자는 공개되지 않더라도 마찬가지입니다
- **t → z(실딩)가 완전히 비공개라고 가정하기** — 실딩 행위 자체는 온체인에서 보이며, 내용물은 보이지 않습니다

---

## 관련 페이지

- [Ironwood](/zcash-tech/ironwood) — 현재 풀을 만든 업그레이드
- [The Turnstile](/zcash-tech/the-turnstile) — 풀 사이를 이동하는 가치가 어떻게 감사되는지
- [지갑](/using-zcash/wallets) — 어떤 지갑이 유지 관리되고 있으며 Ironwood를 지원하는지
- [거래](/using-zcash/transactions) — 실드 거래를 보내는 방법
- [ZEC 구매하기](/using-zcash/buying-zec) — 풀에서 사용하기 전에 ZEC를 확보하는 방법
- [ZK-SNARKs](/zcash-tech/zk-snarks) — 실드 풀의 암호학적 기반
- [ZEC와 Zcash란 무엇인가](/start-here/what-is-zec-and-zcash) — Zcash 프라이버시에 대한 배경
