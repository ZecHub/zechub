# FROST & Viewing Keys: Zcash/Dash 상호운용성 연구 브리핑

*ZecHub를 위해 작성 · 2026년 9월 27일 개정 · 모든 주장은 본문 내 출처 표기*

## 요약

ZecHub는 위키 기부 옵션으로 shielded DASH를 추가한 후 다음 질문을 제기했습니다. Zcash 스타일의 viewing key나 FROST 임계값 서명이 Dash에 적용될 수 있을까요?

연구 결과는 이 질문을 재구성했습니다. Viewing key는 미해결 문제가 아닙니다. Dash는 [Zcash Orchard shielded pool](https://www.dash.org/news/shielded-transactions-are-live-on-the-dash-evolution-mainnet/)을 Evolution 체인에 도입했고, Orchard의 키 계층에는 설계상 viewing key가 포함되어 있습니다. Dash 자체의 [로드맵](https://www.dash.org/roadmap/)은 이를 감사 공개와 Travel Rule 준수 용도로 제시합니다. 이 절반은 가설이 아니라 이미 배포되었습니다.

**진정한 공백은 FROST에 있습니다.** Dash는 이미 [Long-Living Masternode Quorums](https://docs.dash.org/projects/core/en/stable/docs/guide/dash-features-masternode-quorums.html)를 통해 BLS 임계값 서명을 실행하지만, 이는 ChainLocks 및 InstantSend 같은 네트워크 수준의 합의를 위한 것입니다. [ZIP 312](https://zips.z.cash/zip-0312)은 다른 목표를 가집니다. 이는 소수의 개별 키 보유자가 관리하는 단일 shielded 계정에 대해 임계값 지출 승인을 제공하는 것입니다. 둘은 서로 대체할 수 없습니다. 또한 ZIP 312는 여전히 **Draft** 상태이므로 어느 체인에도 이식할 참조 구현이 없으며, 어느 쪽이 구축하더라도 새로운 작업이 될 것입니다.

---

## 타임라인: 지금 이 비교가 이례적인 이유

2026년 중반, 몇 주 간격으로 두 개의 shielded pool 관련 사건이 발생했습니다.

**Zcash는 Orchard에서 벗어났습니다.** 연구자 Taylor Hornby는 Orchard의 회로 취약점을 공개했으며, 이 취약점은 탐지 없이 공급량을 부풀리는 데 악용될 수 있었습니다. Zcash는 **Ironwood (NU6.3)**을 **2026년 7월 28일**에 활성화하여, turnstile 마이그레이션 메커니즘을 갖춘 새로운 shielded pool을 도입했습니다.

**Dash는 Orchard로 이동했습니다.** Dash는 [2026년 2월 19일](https://www.dash.org/blog/dash-is-adding-shielded-transactions-to-evolution/)에 계획을 발표했습니다. *"보안 감사와 추가 코드 검토를 전제로, 조만간 shielded 전송을 출시할 수 있을 것으로 예상합니다."* Dash의 [로드맵](https://www.dash.org/roadmap/)은 Shielded Balances가 Dash Platform **v4.0**과 함께 **2026년 7월에 완료**되었다고 기록하며, Dash는 **2026년 8월 4일**에 [*"Shielded transactions are live on the Dash Evolution mainnet"*](https://www.dash.org/news/shielded-transactions-are-live-on-the-dash-evolution-mainnet/)을 게시했습니다.

> **순서에 관한 참고.** 일부 보도는 Dash의 메인넷 활성화를 2026년 7월 17일로 표기하며, 이는 Ironwood보다 앞서는 날짜입니다. 이 날짜는 활성화가 아니라 발표에 관한 언론 보도에서 비롯된 것으로 보입니다. Dash 자체 출처에서는 해당 기능이 7월에 완료되었고 8월 4일에 라이브로 발표되었습니다. 즉 Ironwood 이후입니다. 두 체인은 몇 주 안에 서로 교차했으며, 정확한 순서는 어떤 이정표를 기준으로 삼는지에 따라 달라집니다. 이 브리핑은 어느 한쪽의 순서를 단정하지 않습니다.

중요하게도 Dash는 해당 버그를 물려받지 않았습니다. Dash의 발표는 명확합니다. *"우리는 알려진 인플레이션 버그가 없는 버전의 Orchard을 구현했습니다. 이전 버전에는 Zcash의 공급량을 탐지 불가능하게 부풀리는 데 악용될 수 있는 버그가 있었습니다."*

따라서 Dash는 이제 Zcash 자체가 기본 계층에서 이미 벗어난 암호기술의 패치된 포크를 실행하는 반면, Zcash의 차세대 pool(Ironwood)과 차세대 지출 승인 체계(FROST)는 각각 새로 활성화되었거나 여전히 Draft 상태입니다.

---

## Viewing key: 연구 공백이 아닌, 이미 배포된 기능

Dash의 shielded pool은 [Orchard](https://zips.z.cash/zip-0224)이며, 신뢰할 수 있는 설정이 필요 없는 Halo 2 zk-SNARKs를 기반으로 구축되었습니다. Orchard의 키 계층은 처음부터 Full Viewing Key와 Incoming Viewing Key를 부가 기능이 아니라 설계의 일부로 포함했습니다. 따라서 이 기능은 양측이 별도로 협상해 이식한 것이 아니라 코드와 함께 도입되었습니다.

Dash의 로드맵은 의도를 직접적으로 밝힙니다.

> *"거래소 상장 폐지 및 규제 마찰에 직면한 의무적 프라이버시 시스템과 달리, Shielded Balances는 view key를 통한 선택적 공개를 지원합니다. 이를 통해 사용자와 기업은 일상적 사용의 프라이버시를 훼손하지 않고 필요할 때 감사자와 거래 세부 정보를 공유하거나 Travel Rule 요건을 준수할 수 있습니다."*

기록할 만한 두 가지 관찰이 있습니다.

**Dash는 Zcash 자체 도구가 아직 도달하지 못한 더 구체적인 프로덕션 사용 사례를 중심으로 viewing key를 제시하고 있습니다.** Zcash의 결제 공개 도구는 지갑 전반에서 대체로 실험적이고 선택적 기능으로 남아 있습니다. Dash는 자체 발표에 따르면 약 1초의 결정론적 결제와 약 20초의 지갑 동기화를 제공하는 체인에서, 명시된 사용 사례를 갖춘 규정 준수 기능으로 view key를 배포하고 있습니다.

**미해결 항목은 기능이 아니라 호환성 드리프트입니다.** 양 체인이 독립적으로 발전함에 따라 Dash의 viewing-key 구현이 Zcash의 Orchard viewing-key 형식과 wire 호환성을 유지하는지는 추적할 가치가 있습니다. 이는 연구 프로젝트가 아니라 모니터링 문제입니다.

---

## 키 파생: Zcash와 Dash 비교

이 절은 검토자의 질문에 직접 답합니다. 짧은 답은 공유 코드 때문에 *shielded* 키 트리가 거의 동일하다는 것입니다. 의미 있는 차이는 각 체인이 해당 트리를 지갑 키 공간에 어떻게 **루팅**하는지, 그리고 그 공간에 무엇이 더 존재하는지에 있습니다.

### Zcash

Zcash는 상태가 **Final**인 [ZIP 32, *Shielded Hierarchical Deterministic Wallets*](https://zips.z.cash/zip-0032)를 사용합니다. Shielded key를 단일 BIP 32 트리에 배치하는 대신, ZIP 32는 각 shielded pool에 자체 마스터 키와 자체 경로를 부여합니다.

```
m_Orchard / purpose' / coin_type' / account'
m_Sapling / purpose' / coin_type' / account'
```

`purpose`는 BIP 43에 따라 `32'` (0x80000020)로 고정되며, `coin_type`는 SLIP 44를 따르고 모든 테스트넷은 인덱스 `1`를 공유합니다.

Orchard 계정 내에서 계층은 엄격히 단방향입니다. 각 수준은 그 아래의 모든 것을 파생할 수 있지만 그 위의 것은 전혀 파생할 수 없습니다.

| 키 | 할 수 있는 일 | 파생 |
|---|---|---|
| Spending key | 노트 지출 | `ask`, `nk`, `rivk` |
| Spend authorizing key (`ask`) | 지출 승인 | — |
| Full Viewing Key (`ak`, `nk`, `rivk`) | 수신 **및** 발신 결제 보기 | IVK, OVK |
| Incoming Viewing Key | 수신 결제만 보기 | Diversified 주소 |
| Outgoing Viewing Key | 발신 결제 세부 정보 복구 | — |
| Diversified 주소 | 수신 | — |

Orchard는 Sapling에 비해 이를 단순화했습니다. [Orchard Book](https://zcash.github.io/orchard/design/keys.html)에 따르면 nullifier 개인 키 `nsk`가 제거되었고, `nk`는 곡선 점이 아니라 필드 요소가 되었으며, `ovk`는 이제 별도로 보관되지 않고 full viewing key에서 파생됩니다.

그 위에는 [ZIP 316, *Unified Addresses and Unified Viewing Keys*](https://zips.z.cash/zip-0316)이 있습니다. 이는 Revision 0은 Active, Revision 1은 Withdrawn, Revision 2는 Draft 상태이며, 풀별 키를 **Unified Full Viewing Key**("여러 Full Viewing Key… 항목을 결합") 및 **Unified Incoming Viewing Key**로 묶습니다. 지갑 개발자가 지켜야 할 구분은 다음과 같습니다. UFVK는 수신 및 발신 활동을 모두 드러내지만, UIVK는 수신 활동만 드러냅니다.

### Dash

Dash는 SLIP 44 코인 유형 `5'`를 사용하는 일반적인 BIP 32 트리에 모든 것을 루팅하고, 자체 파생 확장 두 가지를 추가합니다.

[DIP-0009, *Feature Derivation Paths*](https://docs.dash.org/projects/core/en/stable/docs/dips/dip-0009.html)는 키 공간을 코인별 기능에 따라 분할하는 **feature** 수준을 삽입합니다.

```
m / purpose' / coin_type' / feature' / *
```

여기서 `purpose`는 `9'` (0x80000009)로, `coin_type`는 `5'` (0x80000005)로 고정됩니다. DIP가 밝힌 동기는 격리입니다. *"혼합된 자금을 비혼합 자금과 격리된 경로에 유지하는 것이 바람직할 수 있습니다."*

[DIP-0014, *Extended Key Derivation using 256-bit Unsigned Integers*](https://github.com/dashpay/dips/blob/master/dip-0014.md)는 한 단계 더 나아가 BIP 32의 31비트 인덱스 제한을 확장하여 경로 구성 요소가 전체 256비트 값을 담을 수 있게 합니다. 이는 다음과 같은 ID 기반 경로를 가능하게 합니다.

```
m(userA)/9'/5'/15'/0'/(userA's unique id)/(userB's unique id)
```

마지막 두 구성 요소는 사용자 ID 해시입니다. Zcash에는 이에 대응하는 개념이 없습니다. ZIP 32에는 다른 당사자의 ID에서 키 경로를 파생한다는 개념이 없습니다.

### 두 체인이 실제로 다른 지점

**Shielded 하위 트리는 같습니다.** Dash의 shielded key는 Orchard key입니다. Dash의 shielded pool이 Orchard이기 때문입니다. 두 체인 사이를 이동하는 지갑 개발자는 동일한 spending-key-에서-viewing-key로 이어지는 구조를 다루게 됩니다.

**루팅 방식은 다릅니다.** Zcash는 purpose `32'` 아래에서 각 shielded pool을 자체 마스터 키로 격리합니다. Dash는 다른 모든 기능과 함께 purpose `9'` 아래의 하나의 통합 트리에 shielded feature를 연결합니다. Zcash의 분리는 암호학적 pool 기준이고, Dash의 분리는 제품 기능 기준입니다.

**Dash의 키 공간에는 Zcash에는 없는 별도의 BLS 도메인이 있습니다.** LLMQ에서 사용되는 마스터노드 운영자 키, 투표 키 및 quorum 키는 Schnorr 계열 키가 아닌 BLS 키이며, 위에서 설명한 BIP 32 트리와 완전히 별개입니다. 바로 이 영역에 Dash의 기존 임계값 서명이 존재하며, 바로 그 이유로 다음 절에서 설명하듯 Orchard 지출 승인과 결합되지 않습니다.

**ID 연계 파생은 Dash 전용입니다.** DIP-0014의 256비트 경로는 ID 간 관계에서 키를 파생하기 위해 존재합니다. 이는 Zcash에 대응물이 없는 Dash Platform 개념이며, 두 파생 체계가 우연이 아니라 의도적으로 갈라진 가장 명확한 사례입니다.

*공유 Orchard 하위 트리에서 수렴하는 두 루팅 방식을 Figure 1에서 확인하세요.*

---

## FROST: 진정으로 열려 있는 질문

Dash는 ChainLocks, InstantSend 및 Dash Platform validator 합의에 사용되는 **BLS 기반 LLMQ**(Long-Living Masternode Quorums)라는 성숙한 임계값 서명 시스템을 갖추고 있습니다.

상태가 **Draft**인 [ZIP 312, *FROST for Spend Authorization Multisignatures*](https://zips.z.cash/zip-0312)은 다른 일을 합니다. 이는 Sapling 및 Orchard이 각각 정의한 Schnorr 기반 지출 승인 서명, 즉 **RedJubjub**과 **RedPallas**를 임계값화합니다. 따라서 ZIP 자체의 표현처럼 *"지갑의 보관을 공유하는 사용자와 제3자 서비스, 또는 공동 자금을 관리하는 사람들의 그룹"*이 지출 전에 2-of-3 같은 임계값 승인을 요구할 수 있습니다. 이는 **Wallet** ZIP로 분류됩니다. 합의를 변경하는 대신 기존 지출 승인과 호환되는 서명을 생성합니다. Coordinator 역할은 유지되며, ZIP은 이를 제거하지 않기로 명시적으로 결정합니다. 또한 신뢰할 수 있는 딜러를 통한 키 생성과 분산 키 생성 모두를 논의합니다.

중요한 차이와 이들이 대체재가 아닌 이유는 다음과 같습니다.

| | Dash BLS / LLMQ | Zcash FROST (ZIP 312) |
|---|---|---|
| 서명 체계 | BLS | Schnorr — RedJubjub / RedPallas |
| 서명 주체 | 마스터노드 quorum | 소규모 개별 키 보유자 그룹 |
| 승인 대상 | 네트워크 사실: 블록 잠금, 거래 잠금 | 하나의 shielded 계정에서의 지출 |
| 계층 | 합의 | 지갑 |
| 키 공간 | 별도 BLS 도메인 | Orchard/Sapling 지출 승인 키 |
| 상태 | 배포됨 | Draft, 참조 구현 없음 |

Dash에 BLS 임계값 서명이 있다는 것은 Dash가 FROST을 보유하거나 필요로 한다는 뜻이 **아닙니다**. 그러나 Dash의 엔지니어가 임계값 서명, 분산 키 생성 및 quorum 조정에 관한 내부 경험을 보유한다는 뜻입니다. 이 기능을 구축하기로 선택한다면 이는 실질적으로 이전 가능한 경험입니다.

*각 체계가 실제로 무엇에 서명하는지는 Figure 2에서 확인하세요.*

### Dash의 Orchard 포크에서 FROST을 구현하려면, 첫 단계로 필요한 것

1. **Pallas 곡선 위 Schnorr 변형인 Orchard의 지출 승인 체계 RedPallas에 대한 FROST DKG 및 서명 의식**. 이는 Dash의 기존 LLMQ용 BLS DKG와 별개이며, 그것으로 환원될 수 없습니다.
2. **단일 shielded 계정의 다자 서명을 위한 지갑 및 UX 지원**. 이는 마스터노드 quorum 도구와 다른 상호작용 패턴이며, Coordinator에 상응하는 기능이 필요합니다.
3. **계층에 관한 결정.** ZIP 312가 합의 변경이 아니라 기존 기본 요소를 사용하는 지갑 체계로 범위가 정해져 있으므로, 가장 가능성 높은 것은 지갑 수준 전용입니다. 그러나 이는 Zcash의 범위에서 추정할 것이 아니라 Dash의 Orchard 포크를 기준으로 확인해야 합니다.

---

## 권고

**Viewing key — 연구하지 말고 문서화하세요.** 이 기능은 양 체인에 모두 배포되어 있습니다. Dash의 shielded pool에 view key가 포함된다는 짧은 위키 메모와 Dash 로드맵 링크를 제공하면, ZecHub의 독자가 이를 여전히 가설적 기능으로 오해하는 것을 막을 수 있습니다. 두 체인이 발전하는 동안 wire-format 호환성을 추적하세요.

**FROST — 실질적 기회이나 업스트림에 막혀 있습니다.** 이는 ZIP 312가 참조 구현에 도달하거나 Dash가 병행 구축을 선택하는 데 달려 있습니다. ZecHub은 이를 직접 앞당길 수 없습니다.

**가장 가치 높은 다음 단계는 추가 문헌 조사가 아니라 대화입니다.** 이를 구축할 사람들은 연락 가능한 위치에 있습니다. Shielded Labs는 ZIP 312를 주도하고 있으며, Dash 엔지니어링 팀은 Orchard 통합과 관련해 "Zcash에서 차용"했다는 틀에 이미 긍정적으로 반응했습니다. 두 커뮤니티를 연결하는 스레드는 추가 독서보다 더 많은 것을 드러낼 것이며, 이 브리핑은 공개 출처가 해결할 수 있는 한계에 도달했습니다.

---

## 그림

**Figure 1 — 키 파생 루팅: Zcash ZIP 32 및 Dash DIP-0009/0014, 공유 Orchard 하위 트리에서 수렴.**
`assets/Zcash_Dash_Key_Derivation.svg`

**Figure 2 — 각 임계값 체계가 서명하는 대상: 네트워크 사실을 증명하는 마스터노드 quorum과 하나의 shielded 지출을 승인하는 키 보유자 그룹의 비교.**
`assets/FROST_vs_BLS_LLMQ.svg`

---

## 출처

**Zcash — 프로토콜**

- [ZIP 32: Shielded Hierarchical Deterministic Wallets](https://zips.z.cash/zip-0032) — 상태 Final
- [ZIP 224: Orchard Shielded Protocol](https://zips.z.cash/zip-0224)
- [ZIP 312: FROST for Spend Authorization Multisignatures](https://zips.z.cash/zip-0312) — 상태 Draft
- [ZIP 316: Unified Addresses and Unified Viewing Keys](https://zips.z.cash/zip-0316)
- [The Orchard Book — 키 및 주소](https://zcash.github.io/orchard/design/keys.html)
- [Zcash Protocol Specification](https://zips.z.cash/protocol/protocol.pdf) — 키 구성 요소, §5.6.4

**Dash — 프로토콜 및 발표**

- [Shielded transactions are live on the Dash Evolution mainnet](https://www.dash.org/news/shielded-transactions-are-live-on-the-dash-evolution-mainnet/) — 2026년 8월 4일
- [Dash Is Adding Shielded Transactions to Evolution](https://www.dash.org/blog/dash-is-adding-shielded-transactions-to-evolution/) — 2026년 2월 19일
- [Dash Roadmap](https://www.dash.org/roadmap/) — Shielded Balances, 2026년 7월 완료, Platform v4.0; 2026년 9월 12일 업데이트
- [DIP-0009: Feature Derivation Paths](https://docs.dash.org/projects/core/en/stable/docs/dips/dip-0009.html)
- [DIP-0014: Extended Key Derivation using 256-bit Unsigned Integers](https://github.com/dashpay/dips/blob/master/dip-0014.md)
- [Dash Core documentation — Masternode Quorums (LLMQ)](https://docs.dash.org/projects/core/en/stable/docs/guide/dash-features-masternode-quorums.html)
- [dashpay/dips repository](https://github.com/dashpay/dips)

**당시 보도**

- [Dash launches Zcash's Orchard technology in privacy upgrade](https://www.cryptopolitan.com/dash-launch-zcash-orchard-technology/) — Cryptopolitan
- [Dash Brings Zcash Orchard Privacy to Evolution Chain for Shielded Transactions](https://hackernoon.com/dash-brings-zcash-orchard-privacy-to-evolution-chain-for-shielded-transactions) — HackerNoon

*출처 확인일: 2026년 9월 27일. Dash Platform 및 ZIP 312는 모두 변화 중이므로, 재게시 전에 수치와 상태를 다시 검증해야 합니다.*
