---
<a href="https://github.com/zechub/zechub/edit/main/site/Zcash_Tech/Blossom.md" target="_blank">
  <img src="https://img.shields.io/badge/Edit-blue" alt="페이지 편집"/>
</a>

# Blossom

> Blossom는 블록 653,600(2019년 12월 11일 UTC)에서 Zcash 메인넷에 활성화되었습니다.

이 문서를 통해 알게 될 내용: Blossom가 시간이 지나며 네트워크가 생성하는 ZEC의 총량을 바꾸지 않으면서, Zcash 블록이 약 두 배 빠르게 도착하도록 만든 방법.

Blossom는 Zcash의 [네트워크 업그레이드](../start-here/network-upgrades)입니다. 이는 [ZIP 206](https://zips.z.cash/zip-0206)에 의해 배포되었고, 주요 합의 변경 사항은 [ZIP 208](https://zips.z.cash/zip-0208)에 정의되어 있습니다. Blossom는 확장성 업그레이드였습니다. 블록 사이의 목표 시간을 150초에서 75초로 줄여 블록이 약 두 배 더 자주 도착하도록 했습니다. Electric Coin Company가 Blossom를 주도하고 발표했습니다.

이것이 중요한 이유. ZEC를 전송하면 네트워크가 그것을 블록에 포함해 확인할 때까지 기다리게 됩니다. 블록이 느리면 더 오래 기다려야 합니다. Blossom 이전에는 새 블록이 약 150초마다 생성될 것으로 예상되었습니다. Blossom는 이 목표를 절반인 75초로 줄여 확인이 더 빨리 이루어지고, 같은 시간 동안 체인이 더 많은 거래를 처리할 수 있게 했습니다. 그러면서도 더 많은 ZEC를 생성하거나 미래 반감기의 시점을 바꾸지는 않았습니다.

## 더 빠른 블록

Blossom의 핵심 변화는 단순합니다. Zcash의 목표 블록 간격, 즉 네트워크가 한 블록과 다음 블록 사이에 두는 목표 시간은 150초에서 75초로 줄었습니다([ZIP 208](https://zips.z.cash/zip-0208)). 블록은 작업 증명에 의해 발견되므로 실제 간격은 달라질 수 있지만, 이제 네트워크는 150초마다가 아니라 약 75초마다 블록 하나를 목표로 합니다.

그 결과 두 가지가 따라옵니다:

1. 블록이 약 두 배 더 자주 도착하므로, 체인은 시간 단위당 대략 두 배의 거래를 처리할 수 있습니다.
2. 다음 블록을 기다리는 시간이 줄어들기 때문에, 거래의 첫 번째 확인도 더 빨리 이루어집니다.

![Blossom 이전에는 블록 목표 시간이 150초여서 확인이 더 느리고 처리량이 낮았습니다. Blossom 이후에는 목표 시간이 75초가 되어 확인이 더 빨라지고 처리량은 대략 두 배가 됩니다](https://raw.githubusercontent.com/ZecHub/zechub/main/site/Zcash_Tech/assets/blossom-block-spacing.png)

## 발행량을 일정하게 유지하기

블록이 더 빨라지면 이런 질문이 생깁니다. 만약 Zcash가 두 배 많은 블록을 만들고 각 블록이 여전히 같은 보상을 지급한다면, 네트워크는 ZEC를 두 배 빠르게 생성하게 됩니다. Blossom는 이를 피합니다. 블록당 지급되는 보상을 절반으로 줄였고, 블록 보상 반감 간격을 840,000블록에서 1,680,000블록으로 두 배 늘렸습니다([ZIP 208](https://zips.z.cash/zip-0208)). 블록 수는 두 배, 각 블록의 보상은 절반이므로 시간 단위당 생성되는 ZEC의 양은 동일하게 됩니다. 총 공급 일정과 실제 시간 기준 미래 반감기의 시점은 바뀌지 않았습니다.

![Blossom가 발행량을 일정하게 유지하는 방식: 75초 블록이 두 배 더 자주 도착하고, 블록당 보상은 절반이 되며, 반감 간격은 두 배가 되어 시간이 지나도 총 발행량은 동일하게 유지됩니다](https://raw.githubusercontent.com/ZecHub/zechub/main/site/Zcash_Tech/assets/blossom-emission-balance.png)

## 필수 업그레이드

Blossom는 양측 합의 변경(bilateral consensus change)이었으며, 이는 모든 노드가 체인을 계속 따라가려면 업그레이드해야 한다는 뜻입니다([ZIP 206](https://zips.z.cash/zip-0206)). 동기화를 유지하려는 노드 운영자에게 이것은 선택 사항이 아니었습니다. Blossom는 메인넷 블록 653,600에서 활성화되었고, Blossom 규칙을 따르고 있음을 노드와 거래가 확인할 수 있게 해주는 자체 합의 브랜치 id를 가집니다. 이 업그레이드는 Zcash의 표준 네트워크 업그레이드 메커니즘을 사용했습니다([ZIP 200](https://zips.z.cash/zip-0200)).

## Blossom의 위치

Blossom는 Zcash의 세 번째 네트워크 업그레이드였습니다. Overwinter와 Sapling 이후에 등장했고, Heartwood와 Canopy 이전에 있었습니다. Zcash의 실드된 암호기술을 재구성한 Sapling과 달리, Blossom는 규모와 속도에 초점을 맞췄습니다. 주요 역할은 새로운 프라이버시 기능이 아니라 블록 타이밍이었습니다.

## 용어집

| 용어 | 쉬운 의미 |
|---|---|
| 목표 블록 간격 | 네트워크가 한 블록과 다음 블록 사이에 목표로 하는 시간 |
| 블록 보상 | 각 블록이 채굴될 때 새로 생성되어 지급되는 ZEC |
| 반감 간격 | 블록 보상이 반감될 때마다 그 사이를 지나는 블록 수 |
| 합의 브랜치 id | 어떤 규칙 집합을 노드나 거래가 따르고 있는지 표시하는 태그 |
| 양측 합의 변경 | 네트워크에 남아 있으려면 모든 노드가 채택해야 하는 규칙 변경 |
| 네트워크 업그레이드 (NU) | 정해진 블록 높이에서 활성화되는 Zcash 합의 규칙의 조정된 변경 |

## FAQ

Blossom는 존재하는 ZEC의 양이나 반감 시점을 바꾸나요? 아니요. 블록당 보상은 절반으로 줄었고 반감 간격은 동시에 두 배가 되었기 때문에, 시간 단위당 생성되는 ZEC의 양과 미래 반감기의 시점은 그대로 유지되었습니다.

Blossom는 내 ZEC나 내 프라이버시를 바꾸나요? 아니요. Blossom는 블록 타이밍과 보상 계산만 바꿨습니다. 당신의 잔액이나 실드된 거래는 건드리지 않았습니다.

75초는 실제로 무엇을 의미하나요? 그것은 보장이 아니라 목표입니다. 블록은 작업 증명에 의해 발견되므로 실제 블록 간 간격은 달라집니다. 네트워크는 이제 150초마다가 아니라 약 75초마다 하나를 목표로 합니다.

Blossom가 활성화되었을 때 내가 해야 할 일이 있었나요? 풀 노드를 운영했다면 업그레이드가 필요했습니다. Blossom는 필수였기 때문입니다. 지갑을 사용했다면 새로운 규칙을 지원하는 버전이 필요했습니다.

왜 굳이 블록 보상을 절반으로 줄였나요? 이제 블록이 두 배 빠르게 도착하기 때문입니다. 블록당 보상을 절반으로 줄이면 네트워크가 ZEC를 두 배 빠르게 생성하는 일을 막을 수 있습니다.

Blossom는 언제 활성화되었나요? 2019년 12월 11일 UTC, 메인넷 블록 653,600에서 활성화되었습니다.

## 이해도 점검

Blossom는 Zcash 블록이 약 두 배 더 자주 도착하도록 만들었습니다. 그런데 왜 이것이 새로운 ZEC 생성 속도를 두 배로 만들지 않았을까요?

<details>
<summary>정답</summary>

Blossom가 블록당 지급되는 보상도 절반으로 줄였고, 반감 간격을 840,000블록에서 1,680,000블록으로 두 배 늘렸기 때문입니다. 블록 수는 두 배가 되고 각 블록의 보상은 절반이 되므로, 시간 단위당 생성되는 ZEC 총량은 같아집니다. 따라서 실제 시간 기준 발행 일정은 바뀌지 않았습니다.
</details>

### 자료

[ZIP 208: 더 짧은 목표 블록 간격](https://zips.z.cash/zip-0208)

[ZIP 206: Blossom 네트워크 업그레이드의 배포](https://zips.z.cash/zip-0206)

[Blossom 네트워크 업그레이드](https://z.cash/upgrade/blossom/)

[Blossom 업그레이드가 속도, 확장성, 처리 용량을 개선합니다 (Electric Coin Company)](https://electriccoin.co/blog/blossom-upgrade-improves-speed-scalability-capacity/)

### 함께 보기

[Zcash 네트워크 업그레이드](../start-here/network-upgrades)

[Zcash 통화 정책](../start-here/zcash-monetary-policy)

[ZEC와 Zcash란 무엇인가](../start-here/what-is-zec-and-zcash)

[풀 노드](../zcash-tech/full-nodes)

[NU6.1](../zcash-tech/nu6-1)

---

시리즈: [네트워크 업그레이드 색인](../start-here/network-upgrades) · 이전: [Sapling](../zcash-tech/sapling) · 다음: [Heartwood](../zcash-tech/heartwood)
