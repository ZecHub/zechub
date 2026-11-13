<a href="https://github.com/zechub/zechub/edit/main/site/Zcash_Tech/NU5.md" target="_blank">
  <img src="https://img.shields.io/badge/Edit-blue" alt="Edit Page"/>
</a>

# NU5

> NU5는 Zcash 메인넷에서 블록 1,687,104(2022년 5월 31일 UTC)에 활성화되었습니다.

핵심 내용: NU5가 신뢰할 수 있는 설정이 필요 없는 새 차폐 풀을 Zcash에 제공한 방식과, 풀 전반에서 작동하는 단일 주소 유형에 대해 알아봅니다.

NU5(네트워크 업그레이드 5)은 [ZIP 252](https://zips.z.cash/zip-0252)에 의해 배포된 여섯 번째 Zcash [네트워크 업그레이드](../start-here/network-upgrades)입니다. 이는 주요 암호학적 업그레이드입니다. Halo 2 증명 시스템을 기반으로 구축된 Orchard 차폐 결제 프로토콜과 통합 주소 및 새로운 버전 5 트랜잭션 형식을 도입했습니다. NU5는 Electric Coin Company의 zcashd v5.0.0 릴리스에 포함되었습니다.

이것이 중요한 이유입니다. 차폐 풀은 그것을 생성한 설정만큼만 신뢰할 수 있습니다. Zcash의 처음 두 차폐 풀인 Sprout 및 Sapling는 각각 비밀 매개변수를 생성하기 위한 일회성 신뢰할 수 있는 설정 의식이 필요했습니다. 해당 매개변수가 파기되지 않고 보관되었다면, 누군가 아무도 모르게 위조 ZEC를 만들어낼 수 있었습니다. NU5의 Orchard 풀은 이러한 의식이 필요 없는 Halo 2 증명 시스템을 사용하여 이 우려를 해소합니다.

## 신뢰할 수 있는 설정

Orchard는 NU5가 도입하고 [ZIP 224](https://zips.z.cash/zip-0224)에 정의된 차폐 프로토콜입니다. 이는 Pallas 및 Vesta 곡선 순환에서 PLONKish 산술화라는 기법을 사용하는 Halo 2 증명 시스템을 기반으로 합니다. 실질적인 이점은 간단합니다. Halo 2에는 신뢰할 수 있는 설정이나 구조화된 참조 문자열이 필요하지 않으므로, 오용될 수 있는 비밀 매개변수가 없습니다.

Sprout와 Sapling는 모두 신뢰할 수 있는 설정에 의존했습니다. 한 그룹의 사람들이 각 풀의 매개변수를 만들기 위한 의식을 진행했고, 모두가 그들 중 적어도 한 명이 자신의 비밀 조각을 파기했다고 믿어야 했습니다. Orchard는 그러한 가정을 제거합니다. 이전 풀은 NU5 이후에도 계속 존재하므로, 설정 불필요 보장은 Orchard 풀에 보유한 자금에 적용됩니다.

![Before NU5, Sprout and Sapling needed a trusted setup ceremony. After NU5, the Orchard pool uses the Halo 2 system and needs no trusted setup](/content-images/nu5-trusted-setup-5447dbe3f2.webp)

## NU5가 변경한 사항

NU5는 여러 합의 변경 사항을 묶어 블록 1,687,104에서 모두 함께 활성화했습니다.

1. 위에서 설명한 Halo 2 기반 프로토콜인 Orchard 차폐 풀(ZIP 224)을 추가했습니다.
2. 투명, Sapling 및 새 Orchard 데이터를 위한 별도 영역을 갖춘 재구성된 레이아웃인 버전 5 트랜잭션 형식(ZIP 225)을 추가했습니다. Sprout 필드는 제거되었으며, 이전 버전 4 형식은 활성화 후에도 유효하게 유지되었습니다.
3. 다음 섹션에서 다루는 통합 주소와 통합 보기 키(ZIP 316)를 도입했습니다.
4. 트랜잭션이 수행하는 작업과 이를 승인하는 증명 및 서명을 분리하는 새로운 트랜잭션 ID 계산 방식인 트랜잭션 식별자 비가변성(ZIP 244)을 채택했습니다.
5. 비표준 인코딩을 제거하고 유효한 트랜잭션으로 인정되는 기준을 엄격하게 하기 위해 정규 Jubjub 점 인코딩(ZIP 216)을 채택했습니다.
6. 피어 투 피어 네트워크 전반에서 버전 5 트랜잭션의 릴레이를 활성화했습니다(ZIP 239).

NU5는 새 Orchard 풀을 반영하도록 기존 ZIP 여러 개(32, 203, 209, 212, 213, 221, 401)도 업데이트했습니다.

## 통합 주소

NU5 이전에는 각 풀에 자체 주소 유형이 있었고, 송신자는 원하는 유형을 알아야 했습니다. [ZIP 316](https://zips.z.cash/zip-0316)에 정의된 통합 주소는 이를 바꿉니다. 하나의 통합 주소는 둘 이상의 풀에 대한 수신자를 묶을 수 있으므로 송신자의 지갑은 지원하는 최적의 수신자를 선택하기만 하면 됩니다.

![A unified address bundles receivers for several pools: a transparent receiver, a Sapling receiver, and a new Orchard receiver](/content-images/nu5-unified-address-6e2c84f66e.webp)

통합 보기 키도 보기 기능에서 같은 방식으로 작동합니다. 주소가 포괄하는 풀 전반에 걸쳐 읽기 전용 가시성을 제공합니다. 자세한 내용은 [보기 키](../zcash-tech/viewing-keys) 페이지를 참조하세요.

## NU5의 위치

NU5는 Zcash의 이전 업그레이드인 Overwinter, Sapling, Blossom, Heartwood 및 Canopy를 뒤따랐습니다. 2022년 5월 31일 메인넷에서 활성화되었습니다. Orchard의 곡선 순환은 재귀를 지원하기 때문에 선택되었으며, 이는 이후 확장 작업의 기반이 됩니다. NU5는 Orchard 풀을 기반으로 하고 이후 이를 수정한 NU6 및 NU6.x 업그레이드 계열의 직접적인 선행 버전입니다.

## 요약

- NU5는 블록 1,687,104에서 메인넷에 활성화되었습니다(2022년 5월 31일 UTC) — ZIP 252에 따라 배포된, Sapling 이후 Zcash의 가장 큰 암호학적 업그레이드입니다.
- 신뢰할 수 있는 설정이 전혀 필요 없는 증명 시스템인 Halo 2를 기반으로 한 최초의 Zcash 풀인 Orchard 차폐 풀이 도입되었습니다.
- 여러 풀의 수신자를 묶을 수 있는 하나의 주소 문자열인 Unified Addresses와 통합 조회 키(ZIP 316)가 도입되었습니다.
- 트랜잭션이 버전 5 형식으로 전환되었으며(ZIP 225), 트랜잭션 ID가 변조 불가능해졌습니다(ZIP 244).
- Orchard는 재귀적 증명을 지원하는 Pallas/Vesta 곡선 주기에서 실행됩니다. 이는 이후 확장성 작업과 NU6.x 계열의 기반이 됩니다.

## 핵심 설명

신뢰할 수 있는 설정 문제: Sprout(2016)과 Sapling(2018)은 각각 비밀 매개변수를 생성하기 위한 일회성 의식을 필요로 했으며, 보안은 최소 한 명의 참여자가 자신의 조각을 파기한다는 전제에 기반했습니다. 모든 참여자가 몰래 사본을 보관했다면 위조된 ZEC가 가능했을 것입니다. Orchard는 이 전제를 완전히 없앱니다. Halo 2는 신뢰할 수 있는 설정이나 구조화된 참조 문자열을 사용하지 않으므로, 악용될 수 있는 비밀이 존재하지 않습니다.

NU5에는 여러 합의 변경 사항이 함께 활성화되어 묶였습니다. Orchard 풀(ZIP 224), 버전 5 트랜잭션 형식(ZIP 225), 통합 주소(ZIP 316), 트랜잭션 ID 변조 불가능성(ZIP 244), 정규 Jubjub 포인트 인코딩(ZIP 216), 그리고 v5 트랜잭션의 P2P 릴레이(ZIP 239)가 이에 포함됩니다. 또한 새 풀을 반영하도록 ZIP 32, 203, 209, 212, 213, 221, 401을 업데이트했습니다.

## 시각적 비유

이전 풀은 비밀번호가 일회성 집단 의식에서 생성된 금고와 같습니다. 모든 참여자가 그 비밀번호 사본을 파기했다고 믿어야 합니다. Orchard은(는) 사용할 때마다 잠금장치가 스스로를 다시 검증하는 금고입니다. 의식도, 마스터 비밀도, 보관될 수 있었던 그 무엇도 없습니다. 통합 주소는 투명, Sapling, Orchard 등 모든 입구를 나열한 명함이며, 방문자는 자신이 실제로 열 수 있는 문을 선택합니다.

## 심층 분석

Halo 2는 Pallas 및 Vesta 곡선 사이클에 PLONKish 산술화를 사용합니다. 이 두 페어링 친화적 곡선은 서로를 보완하며, 이것이 다른 증명을 검증하는 증명인 재귀를 가능하게 합니다. 그 재귀는 Zcash의 이후 확장 작업이 기반으로 삼는 토대입니다. v5 트랜잭션 레이아웃은 투명, Sapling 및 Orchard 영역을 분리하고 Sprout 필드를 제거합니다. 이전 버전 4 형식은 활성화 후에도 유효하게 유지되었습니다. ZIP 244는 트랜잭션을 승인하는 증명과 서명이 아니라 트랜잭션이 수행하는 작업으로부터 트랜잭션 ID를 다시 계산하여 가변성 공격 경로를 차단합니다.

## 흔히 저지르는 실수

- **NU5가 모든 풀에서 신뢰 설정을 없앴다고 생각하는 것.** 의식이 필요 없는 것은 Orchard뿐입니다. Sapling의 파라미터는 여전히 존재하므로, 설정 불필요 보장은 Orchard에 보관된 자금에 적용됩니다.
- **기존 주소나 지갑이 작동을 멈췄다고 가정하는 것.** NU5는 선택지를 추가했을 뿐이며, 풀별 주소 유형과 v4 트랜잭션 형식은 계속 유효합니다.
- **Orchard와 Halo 2를 혼동하는 것.** Orchard는 실드 프로토콜/풀이고, Halo 2는 이것이 사용하는 증명 시스템입니다.
- **통합 주소를 유일한 주소 유형으로 취급하는 것.** 지갑이 지원한다면 채택할 수 있는 추가 형식입니다.
- **NU5가 발행량이나 기존 프라이버시를 바꿨다고 믿는 것.** 풀과 형식을 추가했을 뿐이며, 기존 ZEC 및 그 프라이버시는 영향받지 않았습니다.

## 용어집

| 용어 | 쉬운 설명 |
|---|---|
| Network upgrade (NU) | 정해진 블록 높이에서 활성화되는 Zcash의 합의 규칙에 대한 조율된 변경 |
| Orchard | NU5가 도입한 차폐 풀로, Halo 2 증명 시스템을 기반으로 구축됨 |
| Halo 2 | 신뢰할 수 있는 설정이 필요 없는 Orchard의 증명 시스템 |
| Trusted setup | 풀의 비밀 매개변수를 생성하며 해당 매개변수를 파기할 것을 신뢰해야 하는 일회성 의식 |
| Unified Address | 둘 이상의 풀에 대한 수신자를 묶을 수 있는 단일 주소(ZIP 316) |
| Consensus branch id | 트랜잭션이 어느 규칙 집합에 속하는지 표시하는 식별자 |

## 자주 묻는 질문

NU5가 내 ZEC 또는 개인정보 보호를 바꾸나요? 아니요. NU5는 새 차폐 풀과 새 주소 형식을 추가했습니다. 기존 ZEC는 영향을 받지 않으며 개인정보 보호 수준도 낮아지지 않습니다. 자금을 Orchard로 옮기면 신뢰할 수 있는 설정이 필요 없는 풀을 이용할 수 있습니다.

Orchard란 무엇인가요? Orchard는 NU5가 도입한 Zcash의 차폐 프로토콜입니다. Halo 2 증명 시스템에서 실행되므로 신뢰할 수 있는 설정 의식이 필요하지 않습니다.

무언가 해야 하나요? 아니요. 지원되는 지갑이 NU5를 처리해 줍니다. 이전 주소를 계속 사용할 수 있으며, 지갑이 제공할 때 통합 주소를 사용하기 시작할 수 있습니다.

통합 주소란 무엇인가요? 둘 이상의 풀에 대한 수신자를 보유할 수 있는 단일 주소입니다. 송신자의 지갑이 지원하는 풀을 선택하므로 유형마다 다른 주소를 제공할 필요가 없습니다.

NU5가 이전 자금에서 신뢰할 수 있는 설정을 제거하나요? 소급해서는 아닙니다. Orchard에는 신뢰할 수 있는 설정이 필요하지 않지만, Sapling 풀의 이전 매개변수는 NU5 이후에도 계속 존재합니다. 설정 불필요 보장은 Orchard 풀에 보유한 자금에 적용됩니다.

이전 트랜잭션 형식은 작동을 멈췄나요? 아니요. NU5는 버전 5 형식을 추가했으며, 이전 버전 4 형식은 활성화 후에도 유효하게 유지되었습니다.

## 이해도 확인

Sprout와 Sapling는 모두 신뢰할 수 있는 설정 의식이 필요했습니다. NU5의 Orchard 풀은 이를 어떻게 바꾸었으며, 왜 중요한가요?

<details>
<summary>정답</summary>

Orchard는 신뢰할 수 있는 설정이나 구조화된 참조 문자열이 필요 없는 Halo 2 증명 시스템을 기반으로 구축되었습니다. 이로써 남아 있는 비밀 매개변수가 위조 ZEC에 사용될 수 있는 위험을 제거합니다. 이 보장은 Orchard 풀에 보유한 자금에 적용됩니다. 이전 Sapling 매개변수는 NU5 이후에도 계속 존재합니다.
</details>

### 자료

[ZIP 252: NU5 네트워크 업그레이드 배포](https://zips.z.cash/zip-0252)

[ZIP 224: Orchard 차폐 프로토콜](https://zips.z.cash/zip-0224)

[ZIP 225: 버전 5 트랜잭션 형식](https://zips.z.cash/zip-0225)

[ZIP 316: 통합 주소 및 통합 보기 키](https://zips.z.cash/zip-0316)

[네트워크 업그레이드 5](https://z.cash/upgrade/nu5/)

[Electric Coin Company: zcashd 5.0.0 릴리스](https://electriccoin.co/blog/new-release-5-0-0/)

### 함께 보기

[Zcash 네트워크 업그레이드](../start-here/network-upgrades)

[차폐 풀](../using-zcash/shielded-pools)

[Halo](../zcash-tech/halo)

[zk-SNARKs](../zcash-tech/zk-snarks)

[보기 키](../zcash-tech/viewing-keys)

[NU6.1](../zcash-tech/nu6-1)

---

## 관련 페이지

- [Halo](./Halo.md) — Orchard의 신뢰할 수 있는 설정이 필요 없는 증명 시스템
- [통합 주소](./Unified_Addresses.md) — ZIP 316 주소 지정에 대한 심층 탐구
- [Sapling](./Sapling.md) — 이전 shielded pool로, 여전히 그 세리머니와 연결되어 있습니다
- [NU6](./NU6.md) — Orchard pool을 기반으로 구축된 다음 업그레이드
- [zk_SNARKS](./zk_SNARKS.md) — 그 기반이 되는 영지식 기술

시리즈: [네트워크 업그레이드 색인](../start-here/network-upgrades) · 이전: [Canopy](../zcash-tech/canopy) · 다음: [NU6](../zcash-tech/nu6)
