<a href="https://github.com/zechub/zechub/edit/main/site/Zcash_Tech/Blossom.md" target="_blank">
  <img src="https://img.shields.io/badge/Edit-blue" alt="페이지 편집"/>
</a>

# Blossom

> Blossom는 2019년 12월 11일 UTC에 블록 653,600에서 Zcash 메인넷(mainnet)에 적용되었습니다.

이 글에서 알아볼 내용: Blossom이(가) 시간이 지나도 네트워크가 생성하는 ZEC의 양은 바꾸지 않으면서 Zcash 블록을 약 2배 빠르게 생성한 방법입니다.

Blossom은(는) Zcash [네트워크 업그레이드](../start-here/network-upgrades)입니다. [ZIP 206](https://zips.z.cash/zip-0206)에 따라 배포되었으며, 주요 합의 변경 사항은 [ZIP 208](https://zips.z.cash/zip-0208)에 정의되어 있습니다. Blossom은(는) scalability 업그레이드였습니다. 블록 간 목표 시간을 150초에서 75초로 줄여 블록이 약 2배 자주 생성되도록 했습니다. Electric Coin Company이(가) Blossom을(를) 주도하고 발표했습니다.

이것이 중요한 이유. ZEC을(를) 보내면 네트워크가 이를 블록에서 확인할 때까지 기다려야 합니다. 블록 생성이 느리면 더 오래 기다리게 됩니다. Blossom 이전에는 약 150초마다 새 블록이 생성될 것으로 예상했습니다. Blossom은(는) 목표 시간을 절반인 75초로 줄여 확인을 더 빨리 받고, 같은 시간 동안 체인에서 더 많은 거래를 처리할 수 있게 했습니다. ZEC를 더 많이 생성하거나 이후 반감기 시점을 바꾸지 않고 이를 실현했습니다. (2026년 11월 활성화된 NU7은(는) 이후 [ZIP 218](https://zips.z.cash/zip-0218)에 따라 같은 방식을 사용해 목표 시간을 다시 25초로 줄였습니다.)

## 요약

- Blossom은(는) Zcash의 세 번째 네트워크 업그레이드로, 메인넷 블록 653,600에서 활성화되었습니다(2019년 12월 11일 UTC). ZIP 206에 따라 배포되었으며 핵심 변경 사항은 ZIP 208에 정의되어 있습니다.
- 블록 간 목표 간격을 150초에서 75초로 줄였습니다. 블록이 약 2배 자주 생성되어 첫 확인을 더 빨리 받고 처리량도 대략 2배로 늘어납니다.
- 발행량을 일정하게 유지하기 위해 블록당 보상을 절반으로 줄이고 반감기 간격을 840,000블록에서 1,680,000블록으로 늘렸습니다.
- 시간 단위로 생성되는 ZEC의 총량과 이후 반감기의 실제 시간상 시점은 바뀌지 않았습니다.
- 모든 노드가 체인을 계속 따라가려면 업그레이드해야 하는 의무적인 양자 합의 변경이었습니다.

## 시각적 비유

Blossom은(는) 운행 횟수를 2배로 늘린 버스 노선망과 같습니다. 버스가 이제 150초가 아니라 75초마다 오므로 대기 시간이 절반으로 줄고(확인 속도 향상), 노선망이 2배의 승객을 수송합니다(처리량 증가). 운전기사의 총급여를 그대로 유지하기 위해 운행 1회당 급여를 절반으로 줄입니다. 총급여 지출은 같지만, 운행 횟수가 2배가 되는 것입니다.


## 더 빠른 블록

Blossom의 핵심 변경은 간단합니다. 네트워크가 블록과 다음 블록 사이에 목표로 삼는 시간인 Zcash 블록 간격이 150초에서 75초로 줄었습니다([ZIP 208](https://zips.z.cash/zip-0208)). 블록은 작업 증명을 통해 생성되므로 실제 간격은 달라질 수 있지만, 이제 네트워크는 150초가 아니라 약 75초마다 블록이 생성되는 것을 목표로 합니다.

다음 두 가지 효과가 있습니다.

1. 블록이 약 2배 자주 생성되므로 체인에서 시간 단위로 대략 2배의 거래를 처리할 수 있습니다.
2. 다음 블록을 기다리는 시간이 줄어들기 때문에 거래가 첫 확인을 더 빨리 받습니다.

![Before Blossom the block target was 150 seconds with slower confirmations and lower throughput. After Blossom the target is 75 seconds with faster confirmations and roughly double the throughput](/content-images/blossom-block-spacing-50b6bfbacc.webp)

## 발행량 유지

블록 생성이 빨라지면 의문이 생깁니다. Zcash이(가) 블록을 2배 많이 생성하고 각 블록의 보상은 그대로라면, 네트워크는 ZEC를 2배 빠르게 생성하게 됩니다. Blossom은(는) 이를 방지합니다. 블록당 보상을 절반으로 줄이고 블록 보상 반감기 간격을 840,000블록에서 1,680,000블록으로 늘렸습니다([ZIP 208](https://zips.z.cash/zip-0208)). 블록 수가 2배가 되고 각 블록의 보상이 절반이 되므로 시간 단위로 생성되는 ZEC의 양은 같습니다. 총공급량 일정과 이후 반감기의 실제 시간상 시점은 바뀌지 않았습니다.

![How Blossom keeps issuance steady: 75 second blocks arrive twice as often, the per-block reward is halved, the halving interval is doubled, so total emission over time stays the same](/content-images/blossom-emission-balance-f2443e29ab.webp)

## 의무적인 업그레이드

Blossom은(는) 양자 합의 변경이었습니다. 즉, 모든 노드가 체인을 계속 따라가려면 업그레이드해야 했습니다([ZIP 206](https://zips.z.cash/zip-0206)). 네트워크와 동기화 상태를 유지하려는 노드 운영자에게 선택 사항이 아니었습니다. Blossom은(는) 메인넷 블록 653,600에서 활성화되었으며 자체 합의 브랜치 ID를 사용합니다. 이는 노드와 거래가 Blossom 규칙을 따르고 있는지 확인할 수 있게 해주는 식별자입니다. 이 업그레이드는 Zcash의 표준 네트워크 업그레이드 메커니즘을 사용했습니다([ZIP 200](https://zips.z.cash/zip-0200)).

## Blossom의 위치

Blossom은(는) Zcash의 세 번째 네트워크 업그레이드였습니다. Overwinter와 Sapling의 뒤에, Heartwood와 Canopy의 앞에 진행되었습니다. Zcash의 거래정보 보호 암호 체계를 개편한 Sapling과 달리, Blossom은(는) 규모와 속도에 중점을 두었습니다. 주요 목적은 새로운 프라이버시 기능이 아니라 블록 생성 시점의 조정이었습니다.

## 흔한 오해

- **블록이 빨라지면 ZEC도 늘어난다고 생각하는 것.** 블록당 보상을 절반으로 줄이고 블록 생성 속도를 2배로 늘렸으므로 시간 단위 발행량은 정확히 같습니다.
- **반감기의 실제 시점이 앞당겨진다고 생각하는 것.** 반감기 간격이 840,000블록에서 1,680,000블록으로 늘었으므로 실제 시간으로 환산한 반감기 날짜는 바뀌지 않았습니다.
- **“75초”를 보장된 시간으로 해석하는 것.** 이는 작업 증명의 목표 시간이며, 실제 블록 간 간격은 달라질 수 있습니다.
- **Blossom을(를) 프라이버시 업그레이드로 여기는 것.** 이 업그레이드의 목적은 블록 생성 시점과 규모를 조정하는 것이었습니다. Sapling과 달리 암호 체계는 변경하지 않았습니다.
- **노드 운영자가 업그레이드를 건너뛸 수 있다고 생각하는 것.** Blossom은(는) 양자 합의 변경이었습니다. 업그레이드하지 않은 노드는 네트워크에서 분기됩니다.


## 용어집

| 용어 | 쉬운 설명 |
|---|---|
| Block target spacing | 네트워크가 블록 하나와 다음 블록 사이에 목표로 삼는 시간 |
| Block reward | 블록을 채굴할 때 새로 생성되어 지급되는 ZEC |
| Halving interval | 블록 보상이 절반으로 줄어드는 반감기 사이에 생성되는 블록 수 |
| Consensus branch id | 노드나 거래가 어떤 네트워크 규칙 집합을 따르는지 표시하는 식별자 |
| Bilateral consensus change | 네트워크에 계속 참여하려면 모든 노드가 적용해야 하는 규칙 변경 |
| Network upgrade (NU) | 정해진 블록 높이에서 활성화되는 Zcash의 합의 규칙에 대한 조율된 변경 |

## 자주 묻는 질문

Blossom은(는) ZEC의 총량이나 반감기 시점을 바꾸나요? 아니요. 블록당 보상을 절반으로 줄이는 동시에 반감기 간격을 2배로 늘렸으므로 시간 단위로 생성되는 ZEC의 양과 이후 반감기의 시점은 그대로 유지되었습니다.

Blossom은(는) 제 ZEC나 프라이버시를 바꾸나요? 아니요. Blossom은(는) 블록 생성 시점과 보상 계산 방식을 바꿨습니다. 잔액이나 거래정보 보호 거래에는 영향을 주지 않았습니다.

75초는 실제로 무엇을 의미하나요? 보장된 시간이 아니라 목표 시간입니다. 블록은 작업 증명을 통해 생성되므로 실제 블록 간 간격은 달라집니다. 네트워크는 150초가 아니라 약 75초마다 블록이 생성되는 것을 목표로 합니다.

Blossom이(가) 활성화될 때 제가 해야 할 일이 있었나요? 풀 노드를 운영했다면 새 규칙을 적용하도록 노드를 업그레이드해야 했습니다. Blossom은(는) 의무 사항이었기 때문입니다. 지갑을 사용했다면 새 규칙을 지원하는 버전이 필요했습니다.

블록 보상을 왜 절반으로 줄였나요? 이제 블록이 2배 빠르게 생성되기 때문입니다. 블록당 보상을 절반으로 줄여 네트워크가 ZEC를 2배 빠르게 생성하는 것을 방지합니다.

Blossom은(는) 언제 활성화되었나요? 2019년 12월 11일 UTC, 메인넷 블록 653,600에서 활성화되었습니다.

## 이해도 확인

Blossom은(는) Zcash 블록이 약 2배 자주 생성되도록 했습니다. 그런데 왜 새 ZEC가 생성되는 속도는 2배가 되지 않았을까요?

<details>
<summary>정답</summary>

Blossom은(는) 블록당 보상도 절반으로 줄이고 반감기 간격을 840,000블록에서 1,680,000블록으로 늘렸기 때문입니다. 블록 수가 2배가 되고 각 블록의 보상이 절반이 되므로 시간 단위로 생성되는 ZEC의 양은 같습니다. 따라서 실제 시간으로 측정한 발행 일정은 바뀌지 않았습니다.
</details>

### 자료

[ZIP 208: 짧아진 블록 목표 간격](https://zips.z.cash/zip-0208)

[ZIP 206: Blossom 네트워크 업그레이드 배포](https://zips.z.cash/zip-0206)

[Blossom 네트워크 업그레이드](https://z.cash/upgrade/blossom/)

[Blossom 업그레이드로 속도, scalability, 용량 향상(Electric Coin Company)](https://electriccoin.co/blog/blossom-upgrade-improves-speed-scalability-capacity/)

### 함께 보기

[Zcash 네트워크 업그레이드](../start-here/network-upgrades)

[Zcash 통화 정책](../start-here/zcash-monetary-policy)

[ZEC 및 Zcash이란 무엇인가](../start-here/what-is-zec-and-zcash)

[풀 노드](../zcash-tech/full-nodes)

[NU6.1](../zcash-tech/nu6-1)

---

## 관련 페이지

- [Sapling](./Sapling.md) — 이전 업그레이드(암호 체계 변경, 블록 생성 시점 변경 아님)
- [Heartwood](./Heartwood.md) — 시리즈의 다음 업그레이드
- [풀 노드](./Full_Nodes.md) — 의무적인 업그레이드 기간에 노드를 운영할 때 필요한 사항
- [네트워크 업그레이드 색인](../start-here/network-upgrades) — 전체 업그레이드 일정


시리즈: [네트워크 업그레이드 색인](../start-here/network-upgrades) · 이전: [Sapling](../zcash-tech/sapling) · 다음: [Heartwood](../zcash-tech/heartwood)
