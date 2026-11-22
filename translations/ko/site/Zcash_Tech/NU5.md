<a href="https://github.com/zechub/zechub/edit/main/site/Zcash_Tech/NU5.md" target="_blank">
  <img src="https://img.shields.io/badge/Edit-blue" alt="Edit Page"/>
</a>

# NU5

> NU5은(는) 2022년 5월 31일 UTC, 블록 1,687,104에서 Zcash 메인넷에 적용되었습니다.

핵심 내용: NU5이(가) Zcash에 트러스트 셋업(trusted setup)이 필요 없는 새로운 거래정보 보호 구역과 모든 구역에서 작동하는 단일 주소 유형을 어떻게 제공했는지 알아봅니다.

NU5(네트워크 업그레이드 5)은 [네트워크 업그레이드](../start-here/network-upgrades)인 Zcash의 여섯 번째 업그레이드로, [ZIP 252](https://zips.z.cash/zip-0252)에서 배포되었습니다. 이는 주요 암호 기술 업그레이드입니다. Halo 2 증명 시스템을 기반으로 하는 Orchard 거래정보 보호 결제 프로토콜과 통합 주소, 새로운 버전 5 거래 형식을 도입했습니다. NU5은(는) Electric Coin Company의 zcashd v5.0.0 릴리스에 포함되었습니다.

중요한 이유. 거래정보 보호 구역의 신뢰성은 해당 구역을 만든 설정만큼만 보장됩니다. Zcash의 첫 두 거래정보 보호 구역인 Sprout과 Sapling은(는) 각각 비밀 매개변수를 생성하기 위해 한 번의 트러스트 셋업 의식이 필요했습니다. 누군가 그 매개변수를 폐기하지 않고 보관했다면, 아무도 알아차리지 못하는 사이에 위조 ZEC을(를) 발행할 수 있었을 것입니다. NU5의 Orchard 구역은 그런 의식이 필요 없는 Halo 2 증명 시스템을 사용해 이러한 우려를 해소합니다.

## 트러스트 셋업

Orchard은(는) NU5이(가) 도입하고 [ZIP 224](https://zips.z.cash/zip-0224)에서 정의한 거래정보 보호 프로토콜입니다. Pallas 및 Vesta 곡선 사이클에서 PLONKish 산술화라는 기법을 사용하는 Halo 2 증명 시스템을 기반으로 합니다. 실질적인 이점은 간단합니다. Halo 2에는 트러스트 셋업이나 구조화 참조 문자열이 필요하지 않으므로, 악용될 수 있는 비밀 매개변수가 존재하지 않습니다.

Sprout과 Sapling은(는) 모두 트러스트 셋업에 의존했습니다. 여러 사람이 의식을 진행해 각 구역의 매개변수를 만들었으며, 참여자 중 적어도 한 명이 비밀 조각을 폐기했다고 모두가 믿어야 했습니다. Orchard은(는) 이러한 가정을 없앱니다. NU5 이후에도 이전 구역들은 계속 존재하므로, 셋업이 필요 없다는 보장은 Orchard 구역에 보유한 자금에 적용됩니다.

![Before NU5, Sprout and Sapling needed a trusted setup ceremony. After NU5, the Orchard pool uses the Halo 2 system and needs no trusted setup](/content-images/nu5-trusted-setup-5447dbe3f2.webp)

## NU5에서 바뀐 점

NU5에는 여러 합의 변경 사항이 포함되었으며, 블록 1,687,104에서 모두 함께 활성화되었습니다.

1. Halo 2 기반 프로토콜인 Orchard 거래정보 보호 구역(ZIP 224)을 추가했습니다.
2. 버전 5 거래 형식(ZIP 225)을 추가했습니다. 이는 투명 데이터, Sapling 데이터, 새로운 Orchard 데이터를 위한 별도 영역을 둔 재구성된 형식입니다. Sprout 필드는 제거되었으며, 이전 버전 4 형식은 활성화 후에도 계속 유효했습니다.
3. 다음 섹션에서 다루는 통합 주소와 통합 viewing key(ZIP 316)를 도입했습니다.
4. 거래 식별자 비가변성(ZIP 244)을 채택했습니다. 이는 거래가 수행하는 작업과 그 작업을 승인하는 증명 및 서명을 분리해 거래 ID를 계산하는 새로운 방법입니다.
5. 표준 Jubjub 점 인코딩(ZIP 216)을 채택해 비표준 인코딩을 없애고 유효한 거래로 인정되는 규칙을 강화했습니다.
6. P2P 네트워크를 통한 버전 5 거래 중계(ZIP 239)를 활성화했습니다.

NU5은(는) 새로운 Orchard 구역을 반영하도록 기존 ZIP(32, 203, 209, 212, 213, 221, 401)도 여러 개 업데이트했습니다.

## 통합 주소

NU5 이전에는 각 구역에 고유한 주소 유형이 있었고, 송신자는 사용자가 원하는 유형을 알아야 했습니다. [ZIP 316](https://zips.z.cash/zip-0316)에서 정의한 통합 주소는 이 점을 바꿉니다. 하나의 통합 주소에 여러 구역의 수신자를 포함할 수 있으므로, 송신자의 지갑은 지원하는 주소 중 가장 적합한 주소를 선택하기만 하면 됩니다.

![A unified address bundles receivers for several pools: a transparent receiver, a Sapling receiver, and a new Orchard receiver](/content-images/nu5-unified-address-6e2c84f66e.webp)

통합 viewing key도 열람에 같은 방식으로 작동합니다. 주소가 포함하는 각 구역의 정보를 읽기 전용으로 확인할 수 있게 해 줍니다. 자세한 내용은 [Viewing Keys](../zcash-tech/viewing-keys) 페이지를 참조하세요.

## NU5의 위치

NU5은(는) Zcash의 이전 업그레이드인 Overwinter, Sapling, Blossom, Heartwood, Canopy의 뒤를 이었습니다. 2022년 5월 31일 메인넷에서 활성화되었습니다. Orchard의 곡선 사이클은 재귀를 지원하기 때문에 선택되었으며, 이는 이후 scaling 작업의 기반이 됩니다. NU5은(는) Orchard 구역을 기반으로 구축한 뒤 이를 보완한 NU6 및 NU6.x 업그레이드 계열의 바로 이전 버전입니다.

## 요약

- NU5은(는) 2022년 5월 31일 UTC, 블록 1,687,104에서 메인넷에 활성화되었습니다. ZIP 252에서 배포된 Zcash의 가장 큰 암호 기술 업그레이드로, Sapling 이후 최대 규모였습니다.
- 트러스트 셋업이 전혀 필요 없는 증명 시스템인 Halo 2를 기반으로 구축된 최초의 Zcash 구역, Orchard 거래정보 보호 구역을 출시했습니다.
- 통합 주소와 통합 viewing key(ZIP 316)를 도입했습니다. 하나의 주소 문자열에 여러 구역의 수신자를 포함할 수 있습니다.
- 거래를 버전 5 형식(ZIP 225)으로 전환하고 거래 ID를 비가변적으로 만들었습니다(ZIP 244).
- Orchard은(는) 재귀 증명을 지원하는 Pallas/Vesta 곡선 사이클을 사용합니다. 이는 이후 scaling 작업과 NU6.x 계열의 기반이 됩니다.

## 핵심 설명

트러스트 셋업 문제: Sprout(2016)과 Sapling(2018)은(는) 모두 비밀 매개변수를 생성하기 위해 한 번의 의식이 필요했으며, 보안은 참여자 중 적어도 한 명이 자신의 조각을 폐기하는 데 달려 있었습니다. 모든 참여자가 몰래 사본을 보관했다면 위조 ZEC을(를) 만들 수 있었을 것입니다. Orchard은(는) 이러한 가정을 완전히 없앱니다. Halo 2는 트러스트 셋업이나 구조화 참조 문자열을 사용하지 않으므로 악용될 수 있는 비밀이 존재하지 않습니다.

NU5은(는) 여러 합의 변경 사항을 함께 도입해 동시에 활성화했습니다. ZIP 224에 따른 Orchard 구역, 버전 5 거래 형식(ZIP 225), 통합 주소(ZIP 316), 거래 ID 비가변성(ZIP 244), 표준 Jubjub 점 인코딩(ZIP 216), 버전 5 거래의 P2P 중계(ZIP 239)가 여기에 포함됩니다. 새로운 구역을 반영하도록 ZIP 32, 203, 209, 212, 213, 221, 401도 업데이트했습니다.

## 시각적 비유

이전 구역들은 여러 사람이 한 번의 단체 의식에서 조합을 만든 금고와 같습니다. 모든 참여자가 자기 사본을 파쇄했다고 믿어야 합니다. Orchard은(는) 사용할 때마다 잠금장치가 자체적으로 검증되는 금고와 같습니다. 의식도, 마스터 비밀도, 누군가 보관할 수 있는 어떤 것도 없습니다. 통합 주소는 모든 입구를 적어 둔 명함과 같습니다. 입구는 투명 입구, Sapling 입구, Orchard 입구로 구성되며, 방문자는 실제로 열 수 있는 문을 선택합니다.

## 자세히 알아보기

Halo 2는 Pallas 및 Vesta 곡선 사이클에서 PLONKish 산술화를 사용합니다. 서로를 보완하는 두 곡선은 페어링 친화적이며, 다른 증명을 검증하는 증명인 재귀를 가능하게 합니다. 이러한 재귀는 Zcash의 이후 scaling 작업이 기반으로 삼는 토대입니다. 버전 5 거래 형식은 투명 영역, Sapling 영역, Orchard 영역을 분리하고 Sprout 필드를 제거합니다. 이전 버전 4 형식은 활성화 후에도 계속 유효했습니다. ZIP 244는 거래를 승인하는 증명과 서명이 아니라 거래가 수행하는 작업을 바탕으로 거래 ID를 다시 계산해 가변성 공격 경로를 차단합니다.

## 흔한 오해

- **NU5이(가) 모든 구역의 트러스트 셋업을 없앴다고 생각하는 경우.** 의식이 필요 없는 구역은 Orchard뿐입니다. Sapling의 매개변수는 여전히 존재하므로, 셋업이 필요 없다는 보장은 Orchard에 보유한 자금에 적용됩니다.
- **이전 주소나 지갑이 더 이상 작동하지 않는다고 생각하는 경우.** NU5은(는) 선택지를 추가했을 뿐입니다. 구역별 주소 유형과 버전 4 거래 형식은 계속 유효했습니다.
- **Orchard과 Halo 2를 혼동하는 경우.** Orchard은(는) 거래정보 보호 프로토콜 및 구역이고, Halo 2는 그 프로토콜에서 사용하는 증명 시스템입니다.
- **통합 주소가 유일한 주소 유형이라고 여기는 경우.** 지갑에서 지원할 때 사용할 수 있는 추가 형식입니다.
- **NU5이(가) 발행량이나 기존 프라이버시를 변경했다고 믿는 경우.** 구역과 형식을 추가했을 뿐이며, 기존 ZEC과 그 프라이버시에는 아무런 변화가 없었습니다.


## 용어집

| 용어 | 쉬운 설명 |
|---|---|
| Network upgrade (NU) | 정해진 블록 높이에서 활성화되는 Zcash의 합의 규칙 변경 |
| Orchard | Halo 2 증명 시스템을 기반으로 구축한, NU5이(가) 도입한 거래정보 보호 구역 |
| Halo 2 | 트러스트 셋업이 필요 없는 Orchard의 기반 증명 시스템 |
| Trusted setup | 구역의 비밀 매개변수를 만드는 일회성 의식으로, 매개변수를 폐기했다고 믿어야 함 |
| Unified Address | 여러 구역의 수신자를 하나로 묶을 수 있는 단일 주소(ZIP 316) |
| Consensus branch id | 거래가 속한 규칙 집합을 나타내는 식별자 |

## 자주 묻는 질문

NU5은(는) 제 ZEC이나 프라이버시에 영향을 주나요? 아니요. NU5은(는) 새로운 거래정보 보호 구역과 새로운 주소 형식을 추가했습니다. 기존 ZEC에는 영향이 없으며 프라이버시도 약화되지 않습니다. 자금을 Orchard으로 옮기면 트러스트 셋업이 필요 없는 구역을 이용할 수 있습니다.

Orchard은(는) 무엇인가요? Orchard은(는) NU5이(가) 도입한 Zcash의 거래정보 보호 프로토콜입니다. Halo 2 증명 시스템에서 작동하므로 트러스트 셋업 의식이 필요하지 않습니다.

제가 해야 할 일이 있나요? 아니요. 지원되는 지갑이 NU5을(를) 자동으로 처리합니다. 이전 주소를 계속 사용할 수 있으며, 지갑에서 통합 주소를 지원하면 사용을 시작할 수 있습니다.

통합 주소란 무엇인가요? 여러 구역의 수신자를 포함할 수 있는 단일 주소입니다. 송신자의 지갑이 지원하는 구역을 선택하므로, 유형마다 다른 주소를 알려 주실 필요가 없습니다.

NU5은(는) 기존 자금의 트러스트 셋업도 없애나요? 소급 적용되지는 않습니다. Orchard에는 트러스트 셋업이 필요하지 않지만, Sapling 구역의 기존 매개변수는 NU5 이후에도 존재합니다. 셋업이 필요 없다는 보장은 Orchard 구역에 보유한 자금에 적용됩니다.

이전 거래 형식은 더 이상 작동하지 않나요? 아니요. NU5은(는) 버전 5 형식을 추가했으며, 이전 버전 4 형식도 활성화 후 계속 유효했습니다.

## 이해도 확인

Sprout과 Sapling에는 모두 트러스트 셋업 의식이 필요했습니다. NU5의 Orchard 구역은 이 점을 어떻게 바꾸었으며, 왜 중요한가요?

<details>
<summary>정답</summary>

Orchard은(는) 트러스트 셋업이나 구조화 참조 문자열이 필요 없는 Halo 2 증명 시스템을 기반으로 구축되었습니다. 따라서 남아 있는 비밀 매개변수가 ZEC을(를) 위조하는 데 악용될 위험이 사라집니다. 이 보장은 Orchard 구역에 보유한 자금에 적용됩니다. 이전 Sapling 매개변수는 NU5 이후에도 존재합니다.
</details>

### 참고 자료

[ZIP 252: NU5 네트워크 업그레이드 배포](https://zips.z.cash/zip-0252)

[ZIP 224: Orchard 거래정보 보호 프로토콜](https://zips.z.cash/zip-0224)

[ZIP 225: 버전 5 거래 형식](https://zips.z.cash/zip-0225)

[ZIP 316: 통합 주소 및 통합 viewing key](https://zips.z.cash/zip-0316)

[네트워크 업그레이드 5](https://z.cash/upgrade/nu5/)

[Electric Coin Company: zcashd 5.0.0 릴리스](https://electriccoin.co/blog/new-release-5-0-0/)

### 함께 보기

[Zcash 네트워크 업그레이드](../start-here/network-upgrades)

[거래정보 보호 구역](../using-zcash/shielded-pools)

[Halo](../zcash-tech/halo)

[zk-SNARKs](../zcash-tech/zk-snarks)

[Viewing Keys](../zcash-tech/viewing-keys)

[NU6.1](../zcash-tech/nu6-1)

---

## 관련 페이지

- [Halo](./Halo.md) — Orchard의 기반이 되는, 트러스트 셋업이 필요 없는 증명 시스템
- [통합 주소](./Unified_Addresses.md) — ZIP 316 주소 형식 자세히 알아보기
- [Sapling](./Sapling.md) — 이전 거래정보 보호 구역으로, 여전히 의식에 의존함
- [NU6](./NU6.md) — Orchard 구역을 기반으로 구축한 다음 업그레이드
- [zk_SNARKS](./zk_SNARKS.md) — 기반이 되는 영지식 기술


시리즈: [네트워크 업그레이드 색인](../start-here/network-upgrades) · 이전: [Canopy](../zcash-tech/canopy) · 다음: [NU6](../zcash-tech/nu6)
