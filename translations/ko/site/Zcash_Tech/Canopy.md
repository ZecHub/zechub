<a href="https://github.com/zechub/zechub/edit/main/site/Zcash_Tech/Canopy.md" target="_blank">
  <img src="https://img.shields.io/badge/Edit-blue" alt="페이지 편집"/>
</a>

# Canopy

> Canopy은 2020년 11월 18일(UTC) 블록 1,046,400에서 Zcash 메인넷에 적용되었습니다.

이 문서에서 알아볼 내용: 창립자 보상이 종료된 후 Zcash이 어떻게 자체 개발 자금을 계속 조달했는지, 그리고 Canopy이 어떻게 자금 분배 방식을 정립해 이후 업그레이드의 기반을 마련했는지 살펴봅니다.

Canopy은 Zcash의 5번째 네트워크 업그레이드이며, 네트워크 업그레이드 4(NU4)라고도 합니다. [ZIP 251](https://zips.z.cash/zip-0251)에 따라 배포되었으며, Zcash의 첫 반감기와 동시에 2020년 11월 18일(UTC) 메인넷 블록 1,046,400에서 활성화되었습니다. Canopy은 주로 거버넌스와 통화 정책에 관한 업그레이드였습니다. 기존 창립자 보상을 종료하고 새로운 Zcash 개발 기금을 시작해 Electric Coin Company, Zcash Foundation, 독립 개발 지원금 수령자에게 자금을 지급했습니다. 이 기금의 정책은 2019년 공동체의 오랜 거버넌스 절차를 통해 마련되었습니다.

중요한 이유. Zcash에는 배후에서 운영하는 회사가 없으므로 블록 보상으로 자체 개발 자금을 마련합니다. 초기 개발 자금을 지급했던 창립자 보상은 첫 반감기에 종료될 예정이었습니다. 이를 대체한 것이 Canopy입니다. 각 블록 보상의 일정 비율을 개발 기금에 배정하고 수령자를 정했습니다. 이후 업그레이드에서 이 모델을 다듬었으며, 그 최신 형태가 [NU6.1](../zcash-tech/nu6-1)입니다.

![Before Canopy the founders reward funded development and was set to end at the first halving. After Canopy the Development Fund takes 20 percent of each block reward and runs to the second halving in 2024](/content-images/canopy-founders-to-devfund-010676e799.webp)

## 개발 기금

Canopy은 기존 창립자 보상을 종료하고 Zcash 개발 기금으로 대체했습니다. 이 변경은 Zcash의 첫 반감기와 같은 블록에서 적용되어 블록 보상이 6.25 ZEC에서 3.125 ZEC로 줄었습니다. 따라서 채굴자들은 보상이 절반으로 줄어든 바로 그날, 줄어든 보상의 일부가 개발에 배정되는 것을 확인했습니다.

이 기금은 2020년 11월 첫 반감기부터 2024년 두 번째 반감기까지 4년간 운영되도록 정해졌습니다. 합의된 정책은 [ZIP 1014](https://zips.z.cash/zip-1014)에 문서화되었습니다. 실제로 자금을 이동하는 합의 메커니즘은 자금 스트림 메커니즘입니다. [ZIP 207](https://zips.z.cash/zip-0207)은 블록 보조금의 일부를 지정된 수령자에게 전달하는 일반적인 방식을 도입했고, [ZIP 214](https://zips.z.cash/zip-0214)는 개발 기금의 구체적인 규칙과 수령자 주소를 정했습니다.

## 자금 분배 방식

개발 기금은 각 블록 보상의 20%를 받습니다. 나머지 80%는 채굴자가 가져갑니다. ZIP 1014에 따라 이 20%는 다시 3곳에 분배됩니다.

1. Electric Coin Company의 모기관인 Bootstrap 프로젝트에 35%.
2. Zcash Foundation에 25%.
3. 독립적인 활동에 자금을 지원하며 Zcash Foundation이 관리하는 주요 개발 지원금에 40%. 이후 주요 개발 지원금은 Zcash Community Grants(ZCG)이 되었습니다.

기금이 아니라 전체 블록 보상을 기준으로 보면 Electric Coin Company에 7%, Zcash Foundation에 5%, 주요 개발 지원금에 8%가 배정됩니다. 어느 쪽으로 표현해도 수치는 같습니다.

![The Development Fund is 20 percent of each block reward, split 35 percent to Bootstrap and the Electric Coin Company, 25 percent to the Zcash Foundation, and 40 percent to Major Grants](/content-images/canopy-dev-fund-split-005bf6f2dd.webp)

## Sprout 구역 변경

Canopy은 가장 오래된 거래정보 보호 구역도 단계적으로 폐지하기 시작했습니다. Sprout은 Zcash의 첫 거래정보 보호 구역이었으며, Canopy은 [ZIP 211](https://zips.z.cash/zip-0211)을 통해 이를 단계적으로 폐지하기 시작했습니다.

Canopy이 활성화된 시점부터 Sprout 구역에 새로운 가치를 더할 수 없습니다. 기술적으로는 모든 JoinSplit의 vpub_old 필드가 0이어야 합니다. 이미 Sprout에 들어 있는 자금은 계속 인출할 수 있으므로 누구도 자금 이용이 차단되지는 않지만, 이제 이 구역의 규모는 줄어들기만 합니다. 이는 오래된 Sprout 구역을 점차 폐지하고 더 새로운 거래정보 보호 구역으로 대체하기 위한 첫 단계입니다.

![Before Canopy, value could both enter and leave the Sprout pool. After Canopy, no new value can enter but withdrawals are still allowed](/content-images/canopy-sprout-pool-f5166aa049.webp)

## 기술 관련 추가 사항

자금 분배 변경과 함께 Canopy은 규모가 작은 기술 ZIP 2개도 포함했습니다. [ZIP 212](https://zips.z.cash/zip-0212)는 수령자가 Sapling 임시 비밀 키를 노트 평문에서 파생하도록 변경했습니다. [ZIP 215](https://zips.z.cash/zip-0215)는 Ed25519 서명 검증을 위한 명시적인 규칙을 문서화하여 모든 노드가 어떤 서명을 유효한 것으로 인정할지 동일하게 판단하도록 했습니다.

## 핵심 요약

- Canopy(NU4)은 2020년 11월 18일(UTC) 메인넷 블록 1,046,400에서 활성화되었습니다. Zcash의 첫 반감기와 같은 블록으로, 블록 보상은 6.25에서 3.125 ZEC로 줄었습니다.
- 창립자 보상을 종료하고 Zcash 개발 기금을 만들었습니다. 이 기금은 2024년 두 번째 반감기까지 4년간 각 블록 보상의 20%를 받았습니다(ZIP 1014 정책, ZIP 207/214 메커니즘).
- 기금의 20%는 Bootstrap(Electric Coin Company)에 35%, Zcash Foundation에 25%, 주요 개발 지원금에 40%로 나뉘었습니다. 주요 개발 지원금은 이후 Zcash Community Grants으로 불리게 되었습니다.
- Sprout 구역에 새로운 가치를 추가할 수 없게 했습니다(ZIP 211). 새로 입금할 수는 없지만 인출은 계속 가능합니다.
- 기술 ZIP 2개도 함께 도입했습니다. ZIP 212(노트 평문에서 파생되는 Sapling 임시 비밀 키)와 ZIP 215(명시적인 Ed25519 검증 규칙)입니다.

## 핵심 설명

Zcash에는 배후에서 운영하는 회사가 없으므로 블록 보상으로 자체 개발 자금을 마련합니다. 창립자 보상은 초기 개발 기간의 자금을 지원했으며 첫 반감기에 종료될 예정이었기 때문에, 그 전에 이를 대체할 수단이 필요했습니다. 그 대체 수단이 Canopy였습니다. ZIP 207은 블록 보조금의 일부를 지정된 수령자 주소로 전달하는 일반적인 자금 스트림 메커니즘을 도입했고, ZIP 214는 개발 기금의 구체적인 규칙과 주소를 정했습니다. 기금이 아니라 전체 보상을 기준으로 보면 ECC에 7%, Zcash Foundation에 5%, 주요 개발 지원금에 8%가 배정됩니다. 기준만 다르게 표현한 동일한 수치입니다.

Canopy은 Zcash의 가장 오래된 거래정보 보호 구역인 Sprout도 단계적으로 폐지하기 시작했습니다. 활성화된 시점부터 모든 JoinSplit의 vpub_old 필드는 0이어야 하므로, 가치는 Sprout에서 나올 수만 있고 다시 들어갈 수는 없습니다.

## 시각적 비유

Canopy은 스타트업 창업자의 급여 지급 단계가 끝나고 헌장이 그 자리를 대신하는 순간과 같습니다. 그 블록부터 네트워크가 발행하는 1달러마다 20센트가 유지 관리를 위해 배정되고, 이를 3개 부서에 35/25/40으로 나눕니다. 이와 동시에 오래된 창고(Sprout)는 새로운 물건을 보관할 수 없도록 봉인됩니다. 누구나 기존 물건을 가져갈 수 있지만, 새로운 물건은 더 들어갈 수 없습니다.

## 자세히 알아보기

자금 스트림은 신뢰가 아니라 합의로 강제됩니다. 코인베이스 거래가 지정된 수령자에게 정해진 몫을 지급하지 않는 블록은 노드가 거부합니다. Canopy은 반감기 블록에 맞춰 의도적으로 적용되었습니다. 따라서 채굴자들은 보상이 절반으로 줄어든 바로 그 순간, 줄어든 보상의 일부가 개발에 배정되기 시작하는 것을 확인했습니다. ZIP 212는 Sapling 임시 비밀 키의 파생 방식을 변경했고(노트 평문에서 파생), ZIP 215는 명시적인 Ed25519 승인 규칙을 문서화해 모든 노드가 서명을 동일하게 검증하도록 했습니다. 이러한 작은 변경으로 합의 해석의 모호성을 유발하는 여러 유형의 문제가 사라졌습니다.

## 흔히 하는 오해

- **Canopy이 반감기 그 자체라고 생각하는 것.** 두 변경은 같은 활성화 블록을 공유했지만 서로 별개입니다. ZIP 251(Canopy)과 발행 일정은 다른 변경입니다.
- **20%가 채굴자의 몫에서 빠져나간다고 이해하는 것.** 채굴자는 80%를 받았으며, 기금은 블록 보상의 20%를 받습니다.
- **Sprout의 자금이 동결되거나 파괴되었다고 생각하는 것.** 인출은 계속 가능합니다. 새로 입금하는 것만 중단되었습니다.
- **“기금의 35/25/40”과 “보상의 7/5/8”이 서로 다른 분배라고 여기는 것.** 기준이 다를 뿐 같은 수치입니다.
- **Canopy을 암호화 업그레이드라고 부르는 것.** 주로 거버넌스와 통화 정책에 관한 업그레이드였으며, 기술 ZIP은 소규모 조정이었습니다.


## 용어집

| 용어 | 쉬운 설명 |
|---|---|
| Founders reward | Zcash의 초기 개발 자금을 지급한 기존 자금 조달 모델로, 첫 반감기에 종료될 예정이었습니다 |
| Development Fund | Canopy이 개발에 배정한 각 블록 보상의 20%로, 두 번째 반감기까지 운영되었습니다 |
| Block reward (subsidy) | 블록이 채굴될 때 새로 생성되어 지급되는 ZEC |
| Halving | 블록 보상이 절반으로 줄어드는 예정된 시점 |
| Funding stream | 블록 보조금의 일부를 지정된 수령자 주소로 전달하는 합의 메커니즘(ZIP 207) |
| Sprout pool | Canopy이 새로운 가치를 받지 않도록 설정한 Zcash의 기존 거래정보 보호 구역 |

## 자주 묻는 질문

Canopy은 제 ZEC나 프라이버시에 영향을 주나요? 아니요. Canopy은 개발 자금 조달 방식과 몇 가지 기술 규칙에 관한 것입니다. 잔액과 거래정보 보호 거래에는 영향이 없습니다.

Canopy이 블록 보상을 줄였나요? Canopy은 Zcash의 첫 반감기와 같은 블록에서 활성화되었으며, 반감기로 보상은 6.25 ZEC에서 3.125 ZEC로 줄었습니다. 반감기는 Zcash의 통화 정책에 따른 것입니다. Canopy의 역할은 줄어든 보상의 일부를 어떻게 사용할지 정하는 것이었습니다.

개발 기금은 무엇을 위한 것인가요? Zcash을 개발하는 사람들에게 자금을 지원합니다. 자금은 Electric Coin Company(Bootstrap 프로젝트를 통해), Zcash Foundation, 독립적인 활동을 지원하는 주요 개발 지원금에 전달됩니다.

Sprout 구역에 있는 자금은 계속 사용할 수 있나요? 네. 이미 Sprout에 있는 자금은 계속 인출할 수 있습니다. Canopy 이후에는 새로운 가치를 추가할 수 없습니다.

개발 기금은 영구적인가요? 아니요. 2020년 11월 첫 반감기부터 2024년 두 번째 반감기까지 4년간 운영되도록 정해졌습니다. 이를 통해 공동체가 기금의 운영 방식을 살펴본 뒤 다시 검토할 시간을 확보했습니다.

Canopy은 NU6 및 NU6.1와 어떤 관계가 있나요? Canopy은 3자 자금 분배와 자금 스트림 메커니즘을 마련했습니다. NU6과 NU6.1을 비롯한 후속 업그레이드에서는 이러한 기반 위에 세워진 개발 기금을 다시 검토하고 조정했습니다.

## 이해도 확인

Canopy은 Zcash의 첫 반감기와 정확히 같은 블록에서 활성화되었습니다. 왜 이 시점에 맞춰졌으며, Canopy이 없었다면 개발 자금은 어떻게 되었을까요?

<details>
<summary>답변</summary>

기존 창립자 보상은 첫 반감기에 종료될 예정이었습니다. Canopy이 없었다면 반감기 이후 줄어든 블록 보상 전액이 채굴자에게 돌아가 프로토콜 차원의 개발 자금이 없어졌을 것입니다. Canopy은 바로 그 블록에서 창립자 보상을 개발 기금으로 대체하여 자금 지원이 끊기지 않도록 했습니다.
</details>

### 자료

[ZIP 251: Canopy 네트워크 업그레이드 배포](https://zips.z.cash/zip-0251)

[ZIP 1014: ECC, ZF 및 주요 개발 지원금을 위한 개발 기금 마련](https://zips.z.cash/zip-1014)

[ZIP 207: 자금 스트림](https://zips.z.cash/zip-0207)

[ZIP 214: Zcash 개발 기금의 합의 규칙](https://zips.z.cash/zip-0214)

[ZIP 211: Sprout 체인 가치 풀에 새로운 가치 추가 비활성화](https://zips.z.cash/zip-0211)

[Canopy 네트워크 업그레이드](https://z.cash/upgrade/canopy/)

### 함께 보기

[Zcash 네트워크 업그레이드](../start-here/network-upgrades)

[개발 기금](../start-here/development-fund)

[Zcash 통화 정책](../start-here/zcash-monetary-policy)

[거래정보 보호 구역](../using-zcash/shielded-pools)

[NU6.1](../zcash-tech/nu6-1)

[Zcash 거버넌스](../zcash-community/zcash-governance)

---

## 관련 페이지

- [Sprout](./Sprout.md) — 신규 입금이 중단된 풀 Canopy
- [Heartwood](./Heartwood.md) — 시리즈의 이전 업그레이드
- [NU5](./NU5.md) — Orchard에 출시된 다음 업그레이드
- [NU6.1](./NU6_1.md) — 개발 지원금의 가장 최근 개편


시리즈: [네트워크 업그레이드 색인](../start-here/network-upgrades) · 이전: [Heartwood](../zcash-tech/heartwood) · 다음: [NU5](../zcash-tech/nu5)
