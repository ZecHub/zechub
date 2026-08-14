---
<a href="https://github.com/zechub/zechub/edit/main/site/Zcash_Tech/Canopy.md" target="_blank">
  <img src="https://img.shields.io/badge/Edit-blue" alt="Edit Page"/>
</a>

# Canopy

> Canopy는 2020년 11월 18일 UTC, Zcash 메인넷의 블록 1,046,400에서 활성화되었습니다.

이 문서를 통해 알게 될 내용: 창립자 보상이 종료된 뒤에도 Zcash가 어떻게 자체 개발 자금을 계속 조달했는지, 그리고 이후 업그레이드들도 계속 기반으로 삼게 된 자금 분배 구조를 Canopy가 어떻게 마련했는지.

Canopy는 Zcash의 다섯 번째 네트워크 업그레이드이며, Network Upgrade 4(NU4)라고도 불립니다. 이는 [ZIP 251](https://zips.z.cash/zip-0251)에 의해 배포되었고, 2020년 11월 18일(UTC) 메인넷 블록 1,046,400에서 활성화되었습니다. 이 시점은 Zcash의 첫 번째 블록 보상 반감기와 정확히 같은 순간이었습니다. Canopy는 주로 거버넌스 및 통화 정책 업그레이드였습니다. 이 업그레이드는 기존 창립자 보상을 종료하고 새로운 Zcash Development Fund를 시작했으며, 이 기금은 Electric Coin Company, Zcash Foundation, 그리고 독립 보조금 수령자들에게 지급됩니다. 이 기금의 정책은 2019년에 걸친 장기간의 커뮤니티 거버넌스 과정을 통해 마련되었습니다.

왜 이것이 중요한가. Zcash는 이를 뒷받침하는 기업이 없기 때문에 블록 보상을 통해 자체 개발 자금을 조달합니다. 초기 몇 년간의 개발 비용을 충당했던 창립자 보상은 첫 반감기와 함께 종료되도록 예정되어 있었습니다. Canopy는 그 대체안이었습니다. 각 블록 보상의 고정 비율을 Development Fund로 보내고, 누가 그것을 받는지 정했습니다. 이 모델은 이후 업그레이드들에서 계속 다듬어졌으며, [NU6.1](../zcash-tech/nu6-1)까지 이어졌습니다.

![Canopy 이전에는 창립자 보상이 개발 자금을 지원했고 첫 반감기와 함께 종료될 예정이었습니다. Canopy 이후에는 Development Fund가 각 블록 보상의 20퍼센트를 가져가며 2024년 두 번째 반감기까지 지속됩니다](https://raw.githubusercontent.com/ZecHub/zechub/main/site/Zcash_Tech/assets/canopy-founders-to-devfund.png)

## 개발 기금

Canopy는 기존 창립자 보상을 종료하고 이를 Zcash Development Fund로 대체했습니다. 이 변화는 Zcash의 첫 반감기와 같은 블록에서 적용되었으며, 이때 블록 보상은 6.25 ZEC에서 3.125 ZEC로 줄었습니다. 따라서 채굴자들은 보상이 절반으로 줄어든 바로 그날, 더 작아진 보상의 새로운 일부가 개발 자금으로 흘러가기 시작하는 것을 보게 되었습니다.

이 기금은 4년 동안 운영되도록 설정되었으며, 2020년 11월 첫 반감기부터 2024년 두 번째 반감기까지 지속되었습니다. 합의된 정책은 [ZIP 1014](https://zips.z.cash/zip-1014)에 문서화되었습니다. 실제로 자금을 이동시키는 합의 메커니즘은 funding stream 메커니즘입니다. [ZIP 207](https://zips.z.cash/zip-0207)은 블록 보조금의 일부를 정해진 수령자에게 보내는 일반적인 방식을 도입했고, [ZIP 214](https://zips.z.cash/zip-0214)는 Development Fund에 대한 구체적인 규칙과 수령 주소를 정했습니다.

## 자금은 어떻게 나뉘는가

Development Fund는 각 블록 보상의 20퍼센트를 가져갑니다. 채굴자들은 나머지 80퍼센트를 유지합니다. 그리고 그 20퍼센트는 ZIP 1014에 따라 세 갈래로 나뉩니다.

1. 35퍼센트는 Electric Coin Company의 모조직인 Bootstrap Project로 갑니다.
2. 25퍼센트는 Zcash Foundation으로 갑니다.
3. 40퍼센트는 독립적인 작업에 자금을 지원하고 Zcash Foundation이 관리하는 Major Grants로 갑니다. Major Grants는 이후 Zcash Community Grants (ZCG)가 되었습니다.

이 비율들을 기금만이 아니라 전체 블록 보상 기준으로 계산하면, Electric Coin Company는 7퍼센트, Zcash Foundation은 5퍼센트, Major Grants는 8퍼센트가 됩니다. 어느 방식으로 설명하든 같은 숫자입니다.

![Development Fund는 각 블록 보상의 20퍼센트이며, 이 중 35퍼센트는 Bootstrap과 Electric Coin Company에, 25퍼센트는 Zcash Foundation에, 40퍼센트는 Major Grants에 배분됩니다](https://raw.githubusercontent.com/ZecHub/zechub/main/site/Zcash_Tech/assets/canopy-dev-fund-split.png)

## Sprout 풀 변경

Canopy는 또한 가장 오래된 실드 풀의 퇴장을 시작했습니다. Sprout는 Zcash의 첫 번째 실드 풀이었고, Canopy는 [ZIP 211](https://zips.z.cash/zip-0211)을 통해 이를 단계적으로 축소하기 시작했습니다.

Canopy가 활성화된 순간부터 Sprout 풀에는 새로운 가치를 추가할 수 없습니다. 기술적으로 말하면, 모든 JoinSplit의 `vpub_old` 필드는 0이어야 합니다. 이미 Sprout에 들어 있는 자금은 여전히 인출할 수 있으므로 누구도 접근이 막히지는 않지만, 이 풀은 이제부터 줄어들기만 할 수 있습니다. 이는 레거시 Sprout 풀을 더 새로운 실드 풀로 결국 대체하기 위한 첫 단계입니다.

![Canopy 이전에는 가치가 Sprout 풀로 들어가기도 하고 나가기도 할 수 있었습니다. Canopy 이후에는 새로운 가치는 들어갈 수 없지만 인출은 여전히 허용됩니다](https://raw.githubusercontent.com/ZecHub/zechub/main/site/Zcash_Tech/assets/canopy-sprout-pool.png)

## 기술적 추가 사항

자금 조달 변경과 함께 Canopy에는 더 작은 두 개의 기술 ZIP도 포함되었습니다. [ZIP 212](https://zips.z.cash/zip-0212)는 수령자가 Sapling 일회성 비밀값을 도출하는 방식을 변경하여, 이를 노트 평문에서 도출하도록 했습니다. [ZIP 215](https://zips.z.cash/zip-0215)는 Ed25519 서명을 검증하는 명시적 규칙을 문서화하여, 모든 노드가 정확히 어떤 서명이 유효한지에 대해 동일하게 합의하도록 했습니다.

## 용어집

| 용어 | 쉬운 의미 |
|---|---|
| 창립자 보상 | 초기 Zcash 개발 자금을 지원했던 원래의 자금 조달 모델로, 첫 반감기와 함께 종료되도록 예정되어 있었음 |
| Development Fund | Canopy가 개발 자금으로 보내도록 한 각 블록 보상의 20퍼센트 지분으로, 두 번째 반감기까지 운영됨 |
| 블록 보상 (보조금) | 각 블록이 채굴될 때 새로 생성되어 지급되는 ZEC |
| 반감기 | 블록 보상이 절반으로 줄어드는 예정된 이벤트 |
| Funding stream | 블록 보조금의 일부를 정해진 수령 주소로 보내는 합의 메커니즘 (ZIP 207) |
| Sprout 풀 | Zcash의 원래 실드 풀로, Canopy 이후 새로운 가치의 유입이 중단됨 |

## FAQ

Canopy가 내 ZEC나 프라이버시를 바꾸나요? 아닙니다. Canopy는 개발 자금이 어떻게 조달되는지와 몇 가지 기술적 규칙에 관한 것입니다. 당신의 잔액과 실드 트랜잭션은 영향을 받지 않습니다.

Canopy가 블록 보상을 줄였나요? Canopy는 Zcash의 첫 반감기와 같은 블록에서 활성화되었고, 이 반감기는 보상을 6.25 ZEC에서 3.125 ZEC로 줄였습니다. 반감기는 Zcash의 통화 정책의 일부입니다. Canopy의 역할은 더 작아진 그 보상의 일부를 어떻게 사용할지 정하는 것이었습니다.

Development Fund는 무엇을 위한 것인가요? Zcash를 구축하는 사람들에게 자금을 지원합니다. 이 자금은 Electric Coin Company(Bootstrap Project를 통해), Zcash Foundation, 그리고 독립적인 작업을 지원하는 Major Grants로 갑니다.

Sprout 풀의 자금을 여전히 사용할 수 있나요? 네. 이미 Sprout에 들어 있는 자금은 여전히 인출할 수 있습니다. 다만 Canopy 이후에는 새로운 가치를 추가할 수 없습니다.

Development Fund는 영구적인가요? 아닙니다. 2020년 11월 첫 반감기부터 2024년 두 번째 반감기까지 4년 동안 운영되도록 설정되었으며, 커뮤니티가 이를 다시 검토하기 전에 실제로 어떻게 작동하는지 볼 시간을 주기 위한 것이었습니다.

Canopy는 NU6 및 NU6.1과 어떤 관련이 있나요? Canopy는 3자 자금 분배 구조와 funding stream 메커니즘을 마련했습니다. 이후 NU6 및 NU6.1을 포함한 업그레이드들은 그 기반 위에 세워진 Development Fund를 다시 검토하고 재구성했습니다.

## 이해도 점검

Canopy는 Zcash의 첫 반감기와 정확히 같은 블록에서 활성화되었습니다. 왜 그 시점이 선택되었고, Canopy가 없었다면 개발 자금은 어떻게 되었을까요?

<details>
<summary>정답</summary>

기존 창립자 보상은 첫 반감기와 함께 종료되도록 예정되어 있었습니다. Canopy가 없었다면, 반감기 이후 더 작아진 블록 보상 전체가 채굴자들에게 가게 되어 프로토콜 차원의 개발 자금은 남지 않았을 것입니다. Canopy는 바로 그 블록에서 창립자 보상을 Development Fund로 대체하여, 자금 지원이 중단 없이 계속되도록 했습니다.
</details>

### 자료

[ZIP 251: Canopy 네트워크 업그레이드 배포](https://zips.z.cash/zip-0251)

[ZIP 1014: ECC, ZF, 그리고 Major Grants를 위한 Dev Fund 수립](https://zips.z.cash/zip-1014)

[ZIP 207: Funding Streams](https://zips.z.cash/zip-0207)

[ZIP 214: Zcash Development Fund를 위한 합의 규칙](https://zips.z.cash/zip-0214)

[ZIP 211: Sprout 체인 가치 풀에 새로운 가치 추가 비활성화](https://zips.z.cash/zip-0211)

[Canopy 네트워크 업그레이드](https://z.cash/upgrade/canopy/)

### 함께 보기

[Zcash 네트워크 업그레이드](../start-here/network-upgrades)

[Development Fund](../start-here/development-fund)

[Zcash 통화 정책](../start-here/zcash-monetary-policy)

[실드 풀](../using-zcash/shielded-pools)

[NU6.1](../zcash-tech/nu6-1)

[Zcash 거버넌스](../zcash-community/zcash-governance)

---

시리즈: [네트워크 업그레이드 색인](../start-here/network-upgrades) · 이전: [Heartwood](../zcash-tech/heartwood) · 다음: [NU5](../zcash-tech/nu5)
