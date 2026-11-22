# FROST 및 Viewing Keys: Zcash/Dash 상호 운용성 연구 개요

*ZecHub을 위해 작성 · 2026년 9월 27일 개정 · 모든 주장은 본문에 출처를 인라인으로 표시*

## 요약

ZecHub은 위키 기부 옵션으로 거래정보 보호 DASH을 추가한 뒤 다음 질문을 제기했습니다. Zcash 방식의 viewing key나 FROST 임계 서명을 Dash에 적용할 수 있을까요?

조사를 진행하면서 질문의 초점이 달라졌습니다. Viewing key는 미해결 질문이 아닙니다. Dash은 [Zcash Orchard 거래정보 보호 구역](https://www.dash.org/news/shielded-transactions-are-live-on-the-dash-evolution-mainnet/)을 Evolution 체인에 이미 도입했고, Orchard의 키 계층 구조에는 설계상 viewing key가 포함되어 있습니다. Dash의 [로드맵](https://www.dash.org/roadmap/)에서도 감사인에 대한 공개와 트래블 룰 준수에 활용할 수 있도록 규정하고 있습니다. 이 부분은 가설이 아니라 이미 배포된 기능입니다.

**FROST에는 진정한 공백이 있습니다.** Dash은 [Long-Living Masternode Quorums](https://docs.dash.org/projects/core/en/stable/docs/guide/dash-features-masternode-quorums.html)을 통해 BLS 임계 서명을 이미 사용하지만, 이는 네트워크 수준의 합의, 즉 ChainLocks과 InstantSend을 위한 것입니다. [ZIP 312](https://zips.z.cash/zip-0312)은 다른 문제를 다룹니다. 소수의 개별 키 보유자가 함께 관리하는 하나의 거래정보 보호 계정에 대해 임계값 방식으로 지출을 승인하는 것입니다. 두 시스템은 서로 바꿔 쓸 수 없습니다. 또한 ZIP 312는 아직 **Draft**이므로 어느 체인에도 포팅할 참조 구현이 없습니다. 어느 쪽에서 구축하든 새로운 작업이 될 것입니다.

---

## 타임라인: 지금 이 비교가 이례적인 이유

2026년 중반, 몇 주 사이에 거래정보 보호 구역과 관련된 사건이 두 차례 발생했습니다.

**Zcash은 Orchard에서 벗어났습니다.** 연구원 Taylor Hornby는 Orchard에서 공급량을 들키지 않고 부풀리는 데 악용할 수 있는 회로 취약점을 공개했습니다. 이에 Zcash은 **2026년 7월 28일** **Ironwood (NU6.3)**을 활성화하고, 턴스타일 마이그레이션 메커니즘을 갖춘 새로운 거래정보 보호 구역을 도입했습니다.

**Dash은 Orchard에 적용했습니다.** Dash은 계획을 [2026년 2월 19일](https://www.dash.org/blog/dash-is-adding-shielded-transactions-to-evolution/) 발표했습니다. *“보안 감사와 추가 코드 검토가 완료되면 곧 거래정보 보호 전송을 시작할 수 있을 것으로 예상합니다.”* Dash의 [로드맵](https://www.dash.org/roadmap/)에는 Shielded Balances가 **2026년 7월 완료**된 것으로 기록되어 있으며, Dash Platform **v4.0**과 함께 제공됩니다. Dash은 **2026년 8월 4일** [*“Dash Evolution 메인넷에서 거래정보 보호 거래가 시작되었습니다”*](https://www.dash.org/news/shielded-transactions-are-live-on-the-dash-evolution-mainnet/)라고 발표했습니다.

> **순서에 관한 참고 사항.** 일부 보도에서는 Dash의 메인넷 활성화 날짜를 2026년 7월 17일로 제시했으며, 이 날짜가 맞다면 Ironwood보다 먼저 이루어진 셈입니다. 하지만 이 날짜는 활성화 시점이 아니라 발표에 관한 언론 보도에서 비롯된 것으로 보입니다. Dash의 자체 자료에 따르면 이 기능은 7월에 완료되었고, 8월 4일에 서비스 시작이 발표되었습니다. 즉, Ironwood 이후입니다. 두 체인은 몇 주 간격으로 교차했습니다. 정확한 순서는 어떤 이정표를 기준으로 삼느냐에 달려 있으며, 이 개요에서는 어느 한쪽이 먼저라고 단정하지 않습니다.

중요한 점은 Dash이 버그를 물려받지 않았다는 것입니다. 발표문에는 다음과 같이 명시되어 있습니다. *“저희는 알려진 인플레이션 버그가 없는 Orchard 버전을 구현했습니다. 이전 버전에는 Zcash의 공급량을 들키지 않고 부풀리는 데 악용할 수 있는 버그가 있었습니다.”*

따라서 이제 Dash은 기본 레이어에서 Zcash이 이미 사용을 중단한 암호 기술의 패치된 포크를 실행합니다. 한편 Zcash의 차세대 거래정보 보호 구역(Ironwood)은 이제 막 서비스에 적용되었고, 차세대 지출 승인 방식(FROST)은 여전히 Draft입니다.

---

## Viewing key: 이미 배포된 기능이며 연구 공백이 아닙니다

Dash의 거래정보 보호 구역은 [Orchard](https://zips.z.cash/zip-0224)이며, 트러스트 셋업이 필요 없는 Halo 2 zk-SNARKs를 기반으로 합니다. Orchard의 키 계층 구조에는 애초부터 설계의 일부로 Full Viewing Key와 Incoming Viewing Key가 포함되어 있었으며, 나중에 추가된 기능이 아닙니다. 따라서 이 기능은 코드와 함께 도입되었고, 어느 한 체인이 다른 체인과 협의해 포팅해야 했던 것이 아닙니다.

Dash의 로드맵에는 그 목적이 명확히 나와 있습니다.

> *“의무적인 프라이버시 시스템이 거래소 상장 폐지와 규제상 마찰을 겪은 것과 달리, Shielded Balances는 view key를 통한 선택적 공개를 지원합니다. 이를 통해 사용자와 기업은 일상적인 사용에서 프라이버시를 침해하지 않으면서 필요할 때 거래 세부 정보를 감사인과 공유하거나 트래블 룰 요건을 준수할 수 있습니다.”*

기록할 만한 점은 다음과 같습니다.

**Dash은 Zcash의 자체 도구보다 더 구체적인 실제 사용 사례를 바탕으로 viewing key를 활용하고 있습니다.** Zcash의 결제 정보 공개 도구는 지갑 전반에서 대체로 실험 단계에 머물렀고, 사용자가 선택적으로 이용하는 기능이었습니다. Dash은 구체적인 사용 사례를 제시하는 규정 준수 기능으로 view key를 제공하고 있습니다. 자체 발표에 따르면 이 체인은 결정론적 정산에 약 1초, 지갑 동기화에 약 20초가 걸립니다.

**열린 과제는 기능이 아니라 호환성 변화입니다.** 두 체인이 독립적으로 발전하는 동안 Dash의 viewing key 구현이 Zcash의 Orchard viewing key 형식과 계속 바이트 단위로 호환되는지 추적할 필요가 있습니다. 이는 연구 프로젝트가 아니라 모니터링할 사안입니다.

---

## 키 파생: Zcash와 Dash 비교

이 절에서는 검토자의 질문에 직접 답합니다. 간단히 말해, 코드가 공유되므로 *거래정보 보호* 키 트리는 거의 동일합니다. 의미 있는 차이는 각 체인이 지갑 키 공간에서 해당 트리를 **어떻게 뿌리내리는지**, 그리고 그 공간에 어떤 다른 요소가 있는지에 있습니다.

### Zcash

Zcash은 [ZIP 32, *Shielded Hierarchical Deterministic Wallets*](https://zips.z.cash/zip-0032)를 사용하며, 이 규격의 상태는 **Final**입니다. 거래정보 보호 키를 하나의 BIP 32 트리 안에 두는 대신, ZIP 32는 거래정보 보호 구역마다 별도의 마스터 키와 경로를 부여합니다.

```
m_Orchard / purpose' / coin_type' / account'
m_Sapling / purpose' / coin_type' / account'
```

`purpose`은 BIP 43에 따라 `32'`(0x80000020)으로 고정되며, `coin_type`는 SLIP 44를 따릅니다. 모든 테스트넷은 `1` 인덱스를 공유합니다.

Orchard 계정 내에서 계층 구조는 한 방향으로만 작동합니다. 각 단계에서 그 아래에 있는 모든 항목을 파생할 수 있지만, 상위 항목은 파생할 수 없습니다.

| 키 | 기능 | 파생되는 항목 |
|---|---|---|
| Spending key | 노트 지출 | `ask`, `nk`, `rivk` |
| Spend authorizing key (`ask`) | 지출 승인 | — |
| Full Viewing Key (`ak`, `nk`, `rivk`) | 입금 **및** 출금 결제 확인 | IVK, OVK |
| Incoming Viewing Key | 입금 결제만 확인 | 다변화 주소 |
| Outgoing Viewing Key | 출금 결제 세부 정보 복구 | — |
| Diversified address | 수신 | — |

Orchard은 Sapling에 비해 이 구조를 단순화했습니다. [Orchard Book](https://zcash.github.io/orchard/design/keys.html)에 따르면 nullifier 비밀 키 `nsk`은 제거되었고, `nk`은 곡선상의 점이 아니라 필드 원소가 되었으며, `ovk`은 이제 별도로 보관하지 않고 전체 viewing key에서 파생됩니다.

그 상위에는 [ZIP 316, *Unified Addresses and Unified Viewing Keys*](https://zips.z.cash/zip-0316)가 있습니다. Revision 0은 Active, Revision 1은 Withdrawn, Revision 2는 Draft이며, 구역별 키를 **Unified Full Viewing Key**(“여러 Full Viewing Key… 항목을 결합”)와 **Unified Incoming Viewing Key**로 묶습니다. 지갑 개발자가 유의해야 할 차이는 UFVK가 입금 및 출금 활동을 모두 드러내는 반면, UIVK는 입금 활동만 드러낸다는 점입니다.

### Dash

Dash은 일반적인 BIP 32 트리에서 모든 항목을 파생하며, SLIP 44 코인 유형은 `5'`입니다. 여기에 자체적으로 2가지 파생 확장을 더합니다.

[DIP-0009, *Feature Derivation Paths*](https://docs.dash.org/projects/core/en/stable/docs/dips/dip-0009.html)는 **기능** 단계를 추가하여 코인별 기능에 따라 키 공간을 분할합니다.

```
m / purpose' / coin_type' / feature' / *
```

여기서 `purpose`은 `9'`(0x80000009)로, `coin_type`은 `5'`(0x80000005)로 고정됩니다. DIP에 명시된 목적은 격리입니다. *“혼합 자금을 비혼합 자금과 분리된 경로에 유지하는 것이 바람직할 수 있습니다.”*

[DIP-0014, *256비트 부호 없는 정수를 사용한 확장 키 파생*](https://github.com/dashpay/dips/blob/master/dip-0014.md)는 한 걸음 더 나아가 BIP 32의 31비트 인덱스 제한을 없애 경로 구성 요소에 256비트 값을 온전히 담을 수 있도록 합니다. 이를 통해 다음과 같이 신원에서 파생되는 경로를 만들 수 있습니다.

```
m(userA)/9'/5'/15'/0'/(userA's unique id)/(userB's unique id)
```

마지막 2개 구성 요소는 사용자의 신원 해시입니다. Zcash에는 이에 대응하는 기능이 없습니다. ZIP 32에는 다른 당사자의 신원에서 키 경로를 파생하는 개념이 없습니다.

### 두 체인의 실제 차이

**거래정보 보호 하위 트리는 같습니다.** Dash의 거래정보 보호 키는 Orchard 키입니다. Dash의 거래정보 보호 구역이 Orchard이기 때문입니다. 두 체인 사이에서 작업하는 지갑 개발자는 동일한 spending key에서 viewing key로 이어지는 구조를 다룹니다.

**루트 설정 방식은 다릅니다.** Zcash은 각 거래정보 보호 구역을 `32'` 목적의 개별 마스터 키 아래에 격리합니다. Dash은 `9'` 목적의 단일 통합 트리 아래에 거래정보 보호 기능을 두고, 다른 모든 기능을 그 곁에 배치합니다. Zcash은 암호화 풀에 따라 분리하고, Dash은 제품 기능에 따라 분리합니다.

**Dash의 키 공간에는 Zcash에는 없는 별도의 BLS 영역이 있습니다.** Masternode 운영자 키, 투표 키, LLMQ에서 사용하는 쿼럼 키는 BLS 키이며 Schnorr 계열 키가 아닙니다. 또한 앞서 설명한 BIP 32 트리와는 완전히 분리되어 있습니다. 바로 이곳에 Dash의 기존 임계 서명 기능이 있습니다. 다음 절에서 설명하듯, 이것이 Orchard 지출 승인과 결합되지 않는 이유이기도 합니다.

**신원 연계 파생은 Dash에만 있습니다.** DIP-0014의 256비트 경로는 신원 간 관계를 바탕으로 키를 파생하기 위해 마련되었습니다. 이는 Dash Platform의 개념이며 Zcash에는 이에 상응하는 기능이 없습니다. 두 파생 방식이 우연이 아니라 의도적으로 달라졌음을 가장 분명하게 보여주는 사례입니다.

*두 루트 설정 방식이 하나의 Orchard 하위 트리로 모이는 모습은 그림 1을 참조하세요.*

---

## FROST: 진정으로 미해결된 질문

Dash에는 **BLS 기반 LLMQ**(Long-Living Masternode Quorums)라는 성숙한 임계 서명 시스템이 있으며, ChainLocks, InstantSend, Dash Platform 검증자 합의에 사용됩니다.

[ZIP 312, *지출 승인 다중 서명을 위한 FROST*](https://zips.z.cash/zip-0312)은 **Draft** 상태이며, 다른 기능을 수행합니다. Schnorr 기반 지출 승인 서명을 임계값 방식으로 구성합니다. 이 서명은 Sapling과 Orchard에서 각각 이미 정의한 **RedJubjub**과 **RedPallas**입니다. ZIP의 설명에 따르면 이를 통해 *“지갑의 커스터디를 공유하는 사용자와 제3자 서비스 또는 공동 자금을 관리하는 사람들”*은 지출 전에 2-of-3과 같은 임계 승인 절차를 요구할 수 있습니다. 이 제안은 기존 합의를 바꾸는 대신 기존 지출 승인과 호환되는 서명을 생성하는 **Wallet** ZIP로 분류됩니다. 또한 ZIP은 제거하지 않기로 명시한 Coordinator 역할을 유지하며, 신뢰할 수 있는 딜러를 통한 키 생성과 분산 키 생성을 모두 논의합니다.

중요한 차이와 두 시스템이 대체재가 아닌 이유는 다음과 같습니다.

| | Dash BLS / LLMQ | Zcash FROST (ZIP 312) |
|---|---|---|
| 서명 방식 | BLS | Schnorr — RedJubjub / RedPallas |
| 서명 주체 | Masternode 쿼럼 | 소수의 개별 키 보유자 |
| 승인 대상 | 네트워크 사실: 블록 잠금, 거래 잠금 | 하나의 거래정보 보호 계정에서 이루어지는 지출 |
| 계층 | 합의 | 지갑 |
| 키 공간 | 별도의 BLS 영역 | Orchard/Sapling 지출 승인 키 |
| 상태 | 배포됨 | Draft, 참조 구현 없음 |

Dash에 BLS 임계 서명이 있다고 해서 FROST이 있거나 필요하다는 뜻은 **아닙니다**. 하지만 Dash의 엔지니어들이 임계 서명, 분산 키 생성, 쿼럼 조정에 익숙하다는 뜻은 됩니다. 구축을 선택한다면 실제로 이전 가능한 경험입니다.

각 방식이 실제로 무엇에 서명하는지는 그림 2를 참조하세요.

### FROST에서 Dash의 Orchard 포크를 구현하려면 우선 다음이 필요합니다

1. **RedPallas를 사용하는 FROST DKG 및 서명 절차**. 이는 Orchard의 지출 승인 방식으로, Pallas 곡선 기반의 Schnorr 변형입니다. LLMQ를 위해 Dash이 이미 사용하는 BLS DKG와는 별개이며, 이를 대체할 수도 없습니다.
2. **하나의 거래정보 보호 계정에 대한 다자간 서명을 지원하는 지갑 및 UX**. 이는 masternode 쿼럼 도구와 상호작용 방식이 다르므로 Coordinator에 해당하는 역할이 필요합니다.
3. **계층에 대한 결정**. ZIP 312는 합의 변경이 아니라 기존 기본 요소를 사용하는 지갑 방식으로 범위가 정해져 있으므로, 지갑 계층만 대상으로 할 가능성이 가장 높습니다. 하지만 Dash의 Orchard 포크를 기준으로 확인해야 하며, Zcash의 범위를 그대로 적용해서는 안 됩니다.

---

## 권고 사항

**Viewing key — 조사보다 문서화가 필요합니다.** 이 기능은 두 체인 모두에 배포되어 있습니다. Dash의 거래정보 보호 구역에 view key가 포함되어 있음을 기록하고 Dash의 로드맵을 연결하는 짧은 위키 설명을 추가하면, ZecHub의 독자가 이 기능을 아직 가설로 오해하는 일을 막을 수 있습니다. 두 체인의 발전에 따라 바이트 단위 형식의 호환성도 추적해야 합니다.

**FROST — 실질적인 기회지만 상위 단계에 달려 있습니다.** 이를 위해서는 ZIP 312가 참조 구현 단계에 도달하거나, Dash이 병행 개발을 선택해야 합니다. ZecHub은 이를 직접 앞당길 수 없습니다.

**가치가 가장 높은 다음 단계는 추가 문헌 조사가 아니라 대화입니다.** 이 기능을 구축할 사람들과 연락할 수 있습니다. Shielded Labs은 ZIP 312를 주도하고 있으며, Dash의 엔지니어링 팀은 Orchard 통합과 관련해 “Zcash에서 가져왔다”는 설명에 이미 긍정적으로 반응했습니다. 여러 커뮤니티를 연결하는 대화를 시작하면 자료를 한 번 더 읽는 것보다 더 많은 정보를 얻을 수 있습니다. 이 개요에서 공개 자료를 통해 확인할 수 있는 내용은 여기까지입니다.

---

## 그림

**그림 1 — 키 파생 루트 설정: Zcash ZIP 32와 Dash DIP-0009/0014가 하나의 Orchard 하위 트리로 모이는 구조.**
`assets/Zcash_Dash_Key_Derivation.svg`

**그림 2 — 각 임계 서명 방식의 서명 대상: 네트워크 사실을 증명하는 masternode 쿼럼과 하나의 거래정보 보호 지출을 승인하는 키 보유자 그룹.**
`assets/FROST_vs_BLS_LLMQ.svg`

---

## 출처

**Zcash — 프로토콜**
- [ZIP 32: 거래정보 보호 계층 결정적 지갑](https://zips.z.cash/zip-0032) — 상태: Final
- [ZIP 224: Orchard 거래정보 보호 프로토콜](https://zips.z.cash/zip-0224)
- [ZIP 312: 지출 승인 다중 서명을 위한 FROST](https://zips.z.cash/zip-0312) — 상태: Draft
- [ZIP 316: 통합 주소 및 통합 viewing key](https://zips.z.cash/zip-0316)
- [The Orchard Book — 키와 주소](https://zcash.github.io/orchard/design/keys.html)
- [Zcash 프로토콜 명세](https://zips.z.cash/protocol/protocol.pdf) — 키 구성 요소, §5.6.4

**Dash — 프로토콜 및 발표**
- [Dash Evolution 메인넷에서 거래정보 보호 거래 시작](https://www.dash.org/news/shielded-transactions-are-live-on-the-dash-evolution-mainnet/) — 2026년 8월 4일
- [Dash Evolution에 거래정보 보호 거래를 추가하는 ](https://www.dash.org/blog/dash-is-adding-shielded-transactions-to-evolution/)
- [Dash 로드맵](https://www.dash.org/roadmap/) — Shielded Balances, 2026년 7월 완료, Platform v4.0; 2026년 9월 12일 업데이트
- [DIP-0009: 기능 파생 경로](https://docs.dash.org/projects/core/en/stable/docs/dips/dip-0009.html)
- [DIP-0014: 256비트 부호 없는 정수를 사용한 확장 키 파생](https://github.com/dashpay/dips/blob/master/dip-0014.md)
- [Dash 코어 문서 — Masternode 쿼럼(LLMQ)](https://docs.dash.org/projects/core/en/stable/docs/guide/dash-features-masternode-quorums.html)
- [dashpay/dips 저장소](https://github.com/dashpay/dips)

**동시대 보도**
- [Dash, 프라이버시 업그레이드에서 Zcash의 Orchard 기술 출시](https://www.cryptopolitan.com/dash-launch-zcash-orchard-technology/) — Cryptopolitan
- [Dash, 거래정보 보호 거래를 위해 Zcash Orchard 프라이버시를 Evolution 체인에 도입](https://hackernoon.com/dash-brings-zcash-orchard-privacy-to-evolution-chain-for-shielded-transactions) — HackerNoon

*출처 확인일: 2026년 9월 27일. Dash Platform과 ZIP 312는 모두 계속 변하고 있으므로, 재게시하기 전에 수치와 상태를 다시 확인해야 합니다.*
