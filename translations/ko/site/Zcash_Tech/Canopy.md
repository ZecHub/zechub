<a href="https://github.com/zechub/zechub/edit/main/site/Zcash_Tech/Canopy.md" target="_blank">
  <img src="https://img.shields.io/badge/Edit-blue" alt="Edit Page"/>
</a>

# Canopy

> Canopy은(는) 블록 1,046,400(2020년 11월 18일 UTC)에서 Zcash 메인넷에 적용되었습니다.

이 글에서 얻을 수 있는 것: 창립자 보상이 끝난 뒤에도 Zcash이(가) 어떻게 자체 개발 자금을 계속 조달했는지, 그리고 Canopy이(가) 이후 업그레이드들이 여전히 기반으로 삼는 자금 배분 구조를 어떻게 마련했는지.

Canopy은(는) Zcash의 다섯 번째 네트워크 업그레이드로, Network Upgrade 4(NU4)라고도 불립니다. [ZIP 251](https://zips.z.cash/zip-0251)에 의해 배포되었으며, 2020년 11월 18일(UTC) 메인넷 블록 1,046,400에서 활성화되었습니다. 이는 Zcash의 첫 번째 블록 보상 반감기와 같은 시점이었습니다. Canopy은(는) 주로 거버넌스 및 통화 정책 업그레이드였습니다. 기존의 창립자 보상을 종료하고 새로운 Zcash 개발 기금을 시작했으며, 이 기금은 Electric Coin Company, Zcash Foundation, 그리고 독립 보조금 수혜자에게 지급됩니다. 이 기금의 정책은 2019년에 진행된 장기간의 커뮤니티 거버넌스 과정을 통해 마련되었습니다.

이것이 중요한 이유. Zcash은(는) 뒤에 회사가 없기 때문에 블록 보상으로 자체 개발 자금을 충당합니다. 초기 몇 년간의 비용을 댔던 창립자 보상은 첫 번째 반감기에 종료될 예정이었습니다. Canopy이(가) 그 대안이었습니다. 각 블록 보상의 고정된 몫을 개발 기금으로 보내고, 누가 그것을 받을지 정했습니다. 이 모델은 이후 업그레이드들을 거쳐 [NU6.1](../zcash-tech/nu6-1)에 이르기까지 다듬어졌습니다.

![Before Canopy the founders reward funded development and was set to end at the first halving. After Canopy the Development Fund takes 20 percent of each block reward and runs to the second halving in 2024](/content-images/canopy-founders-to-devfund-010676e799.webp)

## 개발 기금

Canopy은(는) 기존의 창립자 보상을 종료하고 이를 Zcash 개발 기금으로 대체했습니다. 이 변경은 Zcash의 첫 번째 반감기와 같은 블록에서 적용되었으며, 이때 블록 보상은 6.25 ZEC에서 3.125 ZEC로 줄었습니다. 즉, 채굴자들은 보상이 절반으로 줄어든 바로 그날, 줄어든 보상의 새로운 일부가 개발 쪽으로 흘러가기 시작하는 것을 보게 되었습니다.

이 기금은 2020년 11월의 첫 번째 반감기부터 2024년의 두 번째 반감기까지 4년 동안 운영되도록 설정되었습니다. 합의된 정책은 [ZIP 1014](https://zips.z.cash/zip-1014)로 문서화되었습니다. 실제로 자금을 이동시키는 합의 메커니즘은 펀딩 스트림 메커니즘입니다. [ZIP 207](https://zips.z.cash/zip-0207)은(는) 블록 보조금의 일부를 정해진 수령자에게 보내는 일반적인 방식을 도입했고, [ZIP 214](https://zips.z.cash/zip-0214)은(는) 개발 기금에 대한 구체적인 규칙과 수령 주소를 정했습니다.

## 자금 배분 방식

개발 기금은 각 블록 보상의 20퍼센트를 가져갑니다. 나머지 80퍼센트는 채굴자가 가집니다. 그 20퍼센트는 ZIP 1014에 따라 다시 세 갈래로 나뉩니다.

1. 35퍼센트는 Electric Coin Company의 모회사인 Bootstrap Project에.
2. 25퍼센트는 Zcash Foundation에.
3. 40퍼센트는 독립적인 작업에 자금을 지원하며 Zcash Foundation이(가) 관리하는 Major Grants에. Major Grants는 이후 Zcash Community Grants(ZCG)이(가) 되었습니다.

기금이 아닌 전체 블록 보상을 기준으로 보면, 이 몫은 Electric Coin Company에 7퍼센트, Zcash Foundation에 5퍼센트, Major Grants에 8퍼센트가 됩니다. 두 가지 설명 방식은 같은 숫자를 나타냅니다.

![The Development Fund is 20 percent of each block reward, split 35 percent to Bootstrap and the Electric Coin Company, 25 percent to the Zcash Foundation, and 40 percent to Major Grants](/content-images/canopy-dev-fund-split-005bf6f2dd.webp)

## Sprout 풀 변경

Canopy은(는) 가장 오래된 차폐 풀의 퇴역도 시작했습니다. Sprout은(는) Zcash의 첫 번째 차폐 풀이었으며, Canopy은(는) [ZIP 211](https://zips.z.cash/zip-0211)을(를) 통해 이를 단계적으로 축소하기 시작했습니다.

Canopy이(가) 활성화된 순간부터 Sprout 풀에는 새로운 가치를 추가할 수 없습니다. 기술적으로 말하면, 모든 JoinSplit의 vpub_old 필드는 0이어야 합니다. 이미 Sprout에 있는 자금은 여전히 인출할 수 있으므로 누구도 자금이 묶이지는 않지만, 이 풀은 이제 줄어들기만 할 수 있습니다. 이는 궁극적으로 레거시 Sprout 풀을 폐기하고 더 새로운 차폐 풀로 옮겨가기 위한 첫 단계입니다.

![Before Canopy, value could both enter and leave the Sprout pool. After Canopy, no new value can enter but withdrawals are still allowed](/content-images/canopy-sprout-pool-f5166aa049.webp)

## 기술적 추가 사항

자금 관련 변경과 함께, Canopy에는 두 개의 작은 기술적 ZIP도 포함되었습니다. [ZIP 212](https://zips.z.cash/zip-0212)은(는) 수령자가 Sapling 임시 비밀값(ephemeral secret)을 도출하는 방식을 바꿔, 노트 평문으로부터 도출하도록 했습니다. [ZIP 215](https://zips.z.cash/zip-0215)은(는) Ed25519 서명 검증에 대한 명시적인 규칙을 정해, 모든 노드가 어떤 서명이 유효한지에 대해 정확히 동일하게 판단하도록 했습니다.

## 요약

- Canopy(NU4)은(는) 메인넷 블록 1,046,400(2020년 11월 18일 UTC)에서 활성화되었습니다. 이는 Zcash의 첫 번째 반감기와 같은 블록으로, 블록 보상이 6.25에서 3.125 ZEC로 줄었습니다.
- 창립자 보상을 종료하고 Zcash 개발 기금을 만들었습니다: 2024년 두 번째 반감기까지 4년간 각 블록 보상의 20%(ZIP 1014 정책; ZIP 207/214 메커니즘).
- 기금의 20%는 Bootstrap(Electric Coin Company)에 35%, Zcash Foundation에 25%, Major Grants에 40%로 나뉩니다. Major Grants는 이후 Zcash Community Grants(으)로 알려지게 되었습니다.
- Sprout 풀에 새로운 가치가 들어오는 것을 막았습니다(ZIP 211): 새로운 예치는 불가능하지만 인출은 여전히 가능합니다.
- 두 개의 기술적 ZIP이 함께 적용되었습니다: ZIP 212(노트 평문에서 도출되는 Sapling 임시 비밀값)와 ZIP 215(명시적인 Ed25519 검증 규칙).

## 핵심 설명

Zcash은(는) 뒤를 받쳐주는 회사가 없기 때문에 블록 보상으로 자체 개발 자금을 충당합니다. 창립자 보상은 초기 몇 년을 책임졌고 첫 번째 반감기에 종료될 예정이었으므로, 그 기한 전에 대안이 마련되어야 했습니다. Canopy이(가) 바로 그 대안이었습니다. ZIP 207은(는) 블록 보조금의 일부를 정해진 수령 주소로 보내는 일반적인 펀딩 스트림 메커니즘을 도입했고, ZIP 214은(는) 개발 기금에 대한 구체적인 규칙과 주소를 정했습니다. 기금만이 아닌 전체 보상을 기준으로 보면, 몫은 ECC 7%, Zcash Foundation 5%, Major Grants 8%로, 같은 숫자를 두 가지 방식으로 설명한 것입니다.

Canopy은(는) Zcash의 가장 오래된 차폐 풀인 Sprout의 퇴역도 시작했습니다. 활성화 시점부터 모든 JoinSplit의 vpub_old 필드는 0이어야 하므로, 가치는 Sprout에서 빠져나갈 수는 있지만 다시 들어갈 수는 없습니다.

## 시각적 비유

Canopy은(는) 스타트업의 창업자 급여 단계가 끝나고 헌법이 그 자리를 대신하는 순간과 같습니다. 그 블록부터 네트워크가 발행하는 1달러마다 20센트가 유지보수용으로 배정되어 세 부서에 35/25/40으로 나뉩니다. 동시에 낡은 창고(Sprout)는 새로운 보관이 금지되도록 봉인됩니다. 누구든 자기 물건을 찾아갈 수는 있지만, 새로운 물건은 들어갈 수 없습니다.

## 심층 분석

펀딩 스트림은 신뢰가 아니라 합의에 의해 강제됩니다. 노드는 코인베이스가 정해진 수령자에게 정해진 몫을 지급하지 않는 블록을 거부합니다. Canopy은(는) 의도적으로 반감기 블록에 맞춰 적용되었기 때문에, 채굴자들은 보상이 절반으로 줄어든 바로 그 순간 줄어든 보상의 새로운 일부가 개발 쪽으로 흘러가기 시작하는 것을 보게 되었습니다. ZIP 212은(는) Sapling 임시 비밀값의 도출 방식을 (노트 평문으로부터 도출하도록) 바꿨고, ZIP 215은(는) 명시적인 Ed25519 수용 규칙을 정해 모든 노드가 서명을 동일하게 검증하도록 했습니다. 이러한 작은 변경들이 합의상의 모호함을 통째로 제거했습니다.

## 흔한 오해

- **Canopy이(가) 반감기 그 자체라고 생각하는 것.** 둘은 같은 활성화 블록을 공유했지만 별개의 변경입니다: ZIP 251(Canopy) 대 발행 일정.
- **20%를 채굴자의 새 몫에서 떼어 가는 것으로 이해하는 것.** 채굴자는 80%를 가졌고, 기금은 블록 보상의 20%를 가져갑니다.
- **Sprout 자금이 동결되거나 소멸되었다고 가정하는 것.** 인출은 여전히 가능하며, 새로운 예치만 중단되었습니다.
- **"기금의 35/25/40"과 "보상의 7/5/8"을 서로 다른 배분으로 여기는 것.** 서로 다른 기준으로 측정한 같은 숫자입니다.
- **Canopy을(를) 암호학 업그레이드라고 부르는 것.** 주로 거버넌스 및 통화 정책 업그레이드였으며, 기술적 ZIP들은 사소한 조정이었습니다.


## 용어집

| 용어 | 쉬운 설명 |
|---|---|
| Founders reward | 초기 Zcash 개발 비용을 댄 원래의 자금 조달 모델로, 첫 번째 반감기에 종료될 예정이었음 |
| Development Fund | Canopy이(가) 개발 쪽으로 보낸 각 블록 보상의 20퍼센트 몫으로, 두 번째 반감기까지 운영됨 |
| Block reward (subsidy) | 각 블록이 채굴될 때 새로 생성되어 지급되는 ZEC |
| Halving | 블록 보상이 절반으로 줄어드는 예정된 이벤트 |
| Funding stream | 블록 보조금의 일부를 정해진 수령 주소로 보내는 합의 메커니즘(ZIP 207) |
| Sprout pool | Zcash의 최초 차폐 풀로, Canopy 이후 새로운 가치를 받지 않게 됨 |

## 자주 묻는 질문

Canopy이(가) 내 ZEC이나 프라이버시를 바꾸나요? 아니요. Canopy은(는) 개발 자금을 조달하는 방식과 몇 가지 기술적 규칙에 관한 것입니다. 잔액과 차폐 거래에는 영향이 없습니다.

Canopy이(가) 블록 보상을 줄였나요? Canopy은(는) Zcash의 첫 번째 반감기와 같은 블록에서 활성화되었으며, 그 반감기로 보상이 6.25 ZEC에서 3.125 ZEC로 줄었습니다. 반감기는 Zcash의 통화 정책의 일부입니다. Canopy의 역할은 그 줄어든 보상의 일부를 어떻게 사용할지 정하는 것이었습니다.

개발 기금은 무엇을 위한 것인가요? Zcash을(를) 만드는 사람들에게 자금을 지원합니다. 자금은 Electric Coin Company(Bootstrap Project를 통해), Zcash Foundation, 그리고 독립적인 작업을 지원하는 Major Grants로 갑니다.

Sprout 풀에 있는 자금을 여전히 사용할 수 있나요? 네. 이미 Sprout에 있는 자금은 여전히 인출할 수 있습니다. 다만 Canopy 이후에는 새로운 가치를 추가할 수 없을 뿐입니다.

개발 기금은 영구적인가요? 아니요. 2020년 11월의 첫 번째 반감기부터 2024년의 두 번째 반감기까지 4년간 운영되도록 설정되었으며, 이는 커뮤니티가 다시 검토하기 전에 그 효과를 지켜볼 시간을 주기 위함이었습니다.

Canopy은(는) NU6 및 NU6.1와(과) 어떤 관계인가요? Canopy은(는) 세 갈래 자금 배분과 펀딩 스트림 메커니즘을 마련했습니다. NU6과(와) NU6.1을(를) 포함한 이후 업그레이드들은 그 기반 위에 세워진 개발 기금을 재검토하고 재구성했습니다.

## 이해도 점검

Canopy은(는) Zcash의 첫 번째 반감기와 정확히 같은 블록에서 활성화되었습니다. 왜 그 시점이 선택되었으며, Canopy이(가) 없었다면 개발 자금은 어떻게 되었을까요?

<details>
<summary>정답</summary>

원래의 창립자 보상은 첫 번째 반감기에 종료될 예정이었습니다. Canopy이(가) 없었다면 반감기 이후 줄어든 블록 보상은 전부 채굴자에게 돌아갔을 것이고, 프로토콜 차원의 개발 자금은 전혀 남지 않았을 것입니다. Canopy은(는) 바로 그 블록에서 창립자 보상을 개발 기금으로 대체했기 때문에, 자금 지원이 공백 없이 이어졌습니다.
</details>

### 자료

[ZIP 251: Canopy 네트워크 업그레이드 배포](https://zips.z.cash/zip-0251)

[ZIP 1014: ECC, ZF 및 Major Grants를 위한 개발 기금 설립](https://zips.z.cash/zip-1014)

[ZIP 207: 펀딩 스트림](https://zips.z.cash/zip-0207)

[ZIP 214: Zcash 개발 기금에 대한 합의 규칙](https://zips.z.cash/zip-0214)

[ZIP 211: Sprout 체인 가치 풀에 대한 새로운 가치 추가 비활성화](https://zips.z.cash/zip-0211)

[Canopy 네트워크 업그레이드](https://z.cash/upgrade/canopy/)

### 함께 보기

[Zcash 네트워크 업그레이드](../start-here/network-upgrades)

[개발 기금](../start-here/development-fund)

[Zcash 통화 정책](../start-here/zcash-monetary-policy)

[차폐 풀](../using-zcash/shielded-pools)

[NU6.1](../zcash-tech/nu6-1)

[Zcash 거버넌스](../zcash-community/zcash-governance)

---

## 관련 페이지

- [Sprout](./Sprout.md) — Canopy이(가) 새로운 예치를 막은 풀
- [Heartwood](./Heartwood.md) — 시리즈의 이전 업그레이드
- [NU5](./NU5.md) — Orchard을(를) 출시한 다음 업그레이드
- [NU6.1](./NU6_1.md) — 개발 자금 조달의 가장 최근 개선


시리즈: [네트워크 업그레이드 목록](../start-here/network-upgrades) · 이전: [Heartwood](../zcash-tech/heartwood) · 다음: [NU5](../zcash-tech/nu5)
