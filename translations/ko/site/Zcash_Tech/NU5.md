<a href="https://github.com/zechub/zechub/edit/main/site/Zcash_Tech/NU5.md" target="_blank">
  <img src="https://img.shields.io/badge/Edit-blue" alt="Edit Page"/>
</a>

# NU5

> NU5는 Zcash 메인넷의 블록 1,687,104에서 활성화되었습니다 (2022년 5월 31일 UTC).

이 문서에서 알게 될 내용: NU5가 신뢰할 수 있는 설정이 필요 없는 새로운 실드 풀을 Zcash에 어떻게 도입했는지, 그리고 여러 풀에서 작동하는 단일 주소 유형을 어떻게 제공했는지.

NU5(Network Upgrade 5)는 [ZIP 252](https://zips.z.cash/zip-0252)에 의해 배포된 Zcash의 여섯 번째 [네트워크 업그레이드](../start-here/network-upgrades)입니다. 이는 중요한 암호학적 업그레이드입니다. Halo 2 증명 시스템 위에 구축된 Orchard 실드 결제 프로토콜과 함께 통합 주소, 그리고 새로운 버전 5 트랜잭션 형식을 도입했습니다. NU5는 Electric Coin Company의 zcashd v5.0.0 릴리스에 포함되어 제공되었습니다.

이것이 중요한 이유. 실드 풀이 얼마나 신뢰할 수 있는지는 그것을 생성한 설정이 얼마나 신뢰할 수 있는지에 달려 있습니다. Zcash의 첫 두 실드 풀인 Sprout와 Sapling은 각각 비밀 파라미터를 생성하기 위해 일회성 신뢰할 수 있는 설정 ceremony가 필요했습니다. 만약 그 파라미터가 파기되지 않고 보관되었다면, 누군가가 아무도 모르게 위조 ZEC를 만들어낼 수 있었을 것입니다. NU5의 Orchard 풀은 그런 ceremony가 필요 없는 Halo 2 증명 시스템을 사용함으로써 그 우려를 해소합니다.

## 신뢰할 수 있는 설정

Orchard는 [ZIP 224](https://zips.z.cash/zip-0224)에 정의된 Zcash의 최신 실드 프로토콜입니다. 이것은 Pallas와 Vesta 곡선 사이클에서 PLONKish 산술화를 사용하는 Halo 2 증명 시스템 위에 구축되었습니다. 실질적인 핵심은 단순합니다. Halo 2에는 신뢰할 수 있는 설정도 구조화된 참조 문자열도 필요하지 않으므로, 나중에 오용될 수 있는 비밀 파라미터 자체가 존재하지 않습니다.

Sprout와 Sapling은 둘 다 신뢰할 수 있는 설정에 의존했습니다. 사람들로 구성된 그룹이 각 풀의 파라미터를 만들기 위한 ceremony를 진행했고, 모두는 그들 중 적어도 한 명이 자신의 비밀 조각을 파기했다고 믿어야 했습니다. Orchard는 그 가정을 제거합니다. NU5 이후에도 이전 풀들은 여전히 존재하므로, 설정 불필요 보장은 Orchard 풀에 보유한 자금에 적용됩니다.

![NU5 이전에는 Sprout와 Sapling에 신뢰할 수 있는 설정 ceremony가 필요했습니다. NU5 이후에는 Orchard 풀이 Halo 2 시스템을 사용하며 신뢰할 수 있는 설정이 필요하지 않습니다](https://raw.githubusercontent.com/ZecHub/zechub/main/site/Zcash_Tech/assets/nu5-trusted-setup.png)

## NU5가 바꾼 것

NU5는 여러 합의 규칙 변경을 묶어서 블록 1,687,104에서 한꺼번에 활성화했습니다.

1. 위에서 설명한 Halo 2 기반 프로토콜인 Orchard 실드 풀(ZIP 224)을 추가했습니다.
2. 버전 5 트랜잭션 형식(ZIP 225)을 추가했습니다. 이는 투명, Sapling, 그리고 새로운 Orchard 데이터를 위한 별도 영역을 갖춘 재구성된 레이아웃입니다. Sprout 필드는 제거되었고, 이전 버전 4 형식은 활성화 이후에도 계속 유효했습니다.
3. 다음 섹션에서 다루는 통합 주소와 통합 Viewing Key(ZIP 316)를 도입했습니다.
4. 트랜잭션 식별자 비가변성(ZIP 244)을 채택했습니다. 이는 트랜잭션이 수행하는 작업과 그것을 승인하는 증명 및 서명을 분리하여 트랜잭션 ID를 계산하는 새로운 방식입니다.
5. 표준이 아닌 인코딩을 제거하고 무엇이 유효한 트랜잭션인지에 대한 규칙을 더 엄격하게 만들기 위해 canonical Jubjub 점 인코딩(ZIP 216)을 채택했습니다.
6. 피어 투 피어 네트워크 전반에서 버전 5 트랜잭션 릴레이를 활성화했습니다(ZIP 239).

NU5는 또한 새 Orchard 풀이 반영되도록 기존 ZIP들(32, 203, 209, 212, 213, 221, 401)도 여러 개 업데이트했습니다.

## 통합 주소

NU5 이전에는 각 풀이 자체 주소 유형을 가졌고, 송신자는 당신이 어떤 종류를 원하는지 알아야 했습니다. [ZIP 316](https://zips.z.cash/zip-0316)에 정의된 통합 주소는 이를 바꿉니다. 하나의 통합 주소는 둘 이상의 풀에 대한 수신자를 함께 묶을 수 있으므로, 송신자의 지갑은 자신이 지원하는 것 중 가장 적절한 것을 선택하면 됩니다.

![통합 주소는 여러 풀의 수신자를 함께 묶습니다: 투명 수신자, Sapling 수신자, 그리고 새로운 Orchard 수신자](https://raw.githubusercontent.com/ZecHub/zechub/main/site/Zcash_Tech/assets/nu5-unified-address.png)

통합 Viewing Key도 조회 측면에서 같은 방식으로 작동합니다. 이것은 주소가 포괄하는 여러 풀 전반에 걸쳐 읽기 전용 가시성을 제공합니다. 이에 대해 더 알고 싶다면 [Viewing Keys](../zcash-tech/viewing-keys) 페이지를 참고하세요.

## NU5의 위치

NU5는 Zcash의 이전 업그레이드인 Overwinter, Sapling, Blossom, Heartwood, Canopy를 뒤이었습니다. 2022년 5월 31일 메인넷에서 활성화되었습니다. Orchard의 곡선 사이클은 재귀를 지원하기 때문에 선택되었으며, 이는 이후 확장 작업의 기초가 됩니다. NU5는 Orchard 풀을 기반으로 발전하고 이후 이를 패치한 NU6 및 NU6.x 업그레이드 계열의 직접적인 전신입니다.

## 용어집

| 용어 | 쉬운 의미 |
|---|---|
| 네트워크 업그레이드 (NU) | 정해진 블록 높이에서 활성화되는 Zcash 합의 규칙의 조정된 변경 |
| Orchard | NU5가 도입한 실드 풀로, Halo 2 증명 시스템 위에 구축됨 |
| Halo 2 | 신뢰할 수 있는 설정이 필요 없는 Orchard의 기반 증명 시스템 |
| 신뢰할 수 있는 설정 | 풀의 비밀 파라미터를 만드는 일회성 ceremony로, 그것들이 파기되었다고 신뢰해야 함 |
| 통합 주소 | 둘 이상의 풀에 대한 수신자를 함께 묶을 수 있는 단일 주소 (ZIP 316) |
| 합의 브랜치 ID | 트랜잭션이 어느 규칙 집합에 속하는지를 표시하는 식별자 |

## FAQ

NU5가 내 ZEC나 프라이버시를 바꾸나요? 아니요. NU5는 새로운 실드 풀과 새로운 주소 형식을 추가했습니다. 기존 ZEC는 영향을 받지 않으며, 프라이버시도 줄어들지 않습니다. 자금을 Orchard로 옮기면 신뢰할 수 있는 설정이 필요 없는 풀을 이용하게 됩니다.

Orchard란 무엇인가요? Orchard는 NU5에서 도입된 Zcash의 실드 프로토콜입니다. Halo 2 증명 시스템 위에서 작동하므로 신뢰할 수 있는 설정 ceremony가 필요하지 않습니다.

내가 해야 할 일이 있나요? 아니요. 지원되는 지갑이 NU5를 대신 처리해 줍니다. 계속 이전 주소를 사용할 수 있으며, 지갑이 제공하면 통합 주소도 사용하기 시작할 수 있습니다.

통합 주소란 무엇인가요? 둘 이상의 풀에 대한 수신자를 담을 수 있는 단일 주소입니다. 송신자의 지갑이 자신이 지원하는 풀을 선택하므로, 유형마다 다른 주소를 따로 줄 필요가 없습니다.

NU5가 내 이전 자금에서 신뢰할 수 있는 설정을 제거하나요? 소급해서 그렇지는 않습니다. Orchard에는 신뢰할 수 있는 설정이 필요 없지만, Sapling 풀의 이전 파라미터는 NU5 이후에도 여전히 존재합니다. 설정 불필요 보장은 Orchard 풀에 보유된 자금에 적용됩니다.

이전 트랜잭션 형식은 작동을 멈췄나요? 아니요. NU5는 버전 5 형식을 추가했고, 이전 버전 4 형식은 활성화 이후에도 계속 유효했습니다.

## 이해도 확인

Sprout와 Sapling은 둘 다 신뢰할 수 있는 설정 ceremony가 필요했습니다. NU5의 Orchard 풀은 이것을 어떻게 바꾸었고, 왜 그것이 중요한가요?

<details>
<summary>정답</summary>

Orchard는 신뢰할 수 있는 설정도 구조화된 참조 문자열도 필요 없는 Halo 2 증명 시스템 위에 구축되었습니다. 이로써 남아 있는 비밀 파라미터가 위조 ZEC를 만드는 데 사용될 수 있는 위험이 제거됩니다. 이 보장은 Orchard 풀에 보유된 자금에 적용됩니다. 이전 Sapling 파라미터는 NU5 이후에도 여전히 존재합니다.
</details>

### 자료

[ZIP 252: NU5 네트워크 업그레이드 배포](https://zips.z.cash/zip-0252)

[ZIP 224: Orchard 실드 프로토콜](https://zips.z.cash/zip-0224)

[ZIP 225: 버전 5 트랜잭션 형식](https://zips.z.cash/zip-0225)

[ZIP 316: 통합 주소와 통합 Viewing Keys](https://zips.z.cash/zip-0316)

[Network Upgrade 5](https://z.cash/upgrade/nu5/)

[Electric Coin Company: zcashd 5.0.0 릴리스](https://electriccoin.co/blog/new-release-5-0-0/)

### 함께 보기

[Zcash 네트워크 업그레이드](../start-here/network-upgrades)

[실드 풀](../using-zcash/shielded-pools)

[Halo](../zcash-tech/halo)

[zk-SNARKS](../zcash-tech/zk-snarks)

[Viewing Keys](../zcash-tech/viewing-keys)

[NU6.1](../zcash-tech/nu6-1)

---

시리즈: [네트워크 업그레이드 색인](../start-here/network-upgrades) · 이전: [Canopy](../zcash-tech/canopy) · 다음: [NU6](../zcash-tech/nu6)
