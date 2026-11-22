<a href="https://github.com/zechub/zechub/edit/main/site/Zcash_Tech/Ironwood.md" target="_blank">
  <img src="https://img.shields.io/badge/Edit-blue" alt="페이지 편집"/>
</a>

# Ironwood

> Ironwood은 2026년 7월 28일 UTC에 Zcash 메인넷의 블록 3,428,143에서 활성화되었으며, 그 이후로 운영되고 있습니다.

여기서 알게 될 내용: Ironwood이 무엇을 바꾸는지, 숨겨진 돈의 버그가 왜 심각한지, 그리고 턴스타일을 통해 누구나 ZEC이 위조되지 않았음을 확인할 수 있는 방법입니다.

Ironwood은 같은 이름의 새로운 거래정보 보호 구역을 도입하는 Zcash [네트워크 업그레이드](../start-here/network-upgrades)로, 정식 명칭은 NU6.3입니다. [거래정보 보호 구역](../using-zcash/shielded-pools)은 금액과 소유자가 [영지식 암호화](../zcash-tech/zk-snarks)로 숨겨지는 자금의 집합입니다. Ironwood은 기존 Orchard 거래정보 보호 구역에서 발견된 완전성 버그를 격리하고, ZEC의 총공급량이 올바른지 확인할 수 있는 더 강력한 방법을 커뮤니티에 제공하기 위해 만들어졌습니다. 합의 규칙은 [ZIP 258](https://zips.z.cash/zip-0258)에 명시되어 있습니다.

왜 중요할까요? 비트코인처럼 거래 내역이 투명한 화폐는 공개 원장을 읽어 누구나 코인이 위조되지 않았는지 확인할 수 있습니다. 거래정보 보호 화폐는 금액을 숨기므로 단순히 들여다볼 수 없습니다. 대신 암호화 자체가 누구도 비밀리에 돈을 만들어낼 수 없도록 보장해야 합니다. Ironwood이 중요한 이유는 Orchard 풀에 대한 이 보장에 버그가 발견되었기 때문입니다. 이 업그레이드는 그 허점을 막고, 누구나 ZEC의 총공급량이 여전히 올바른지 확인할 수 있는 방법을 제공합니다.

Zcash이 처음이신가요? 먼저 [ZEC와 Zcash](../start-here/what-is-zec-and-zcash), 그리고 [거래정보 보호 구역](../using-zcash/shielded-pools)을 읽은 다음 이 문서로 돌아오세요.

![Ironwood value migration flow: value leaves the Orchard pool, passes through the turnstile checkpoint, and enters the new Ironwood pool](/content-images/ironwood-flow-8af7a58b99.webp)

## Ironwood이 필요했던 이유

2026년 5월 말, 독립 보안 연구원 Taylor Hornby는 [Shielded Labs](../zcash-organizations/shielded-labs)의 프로토콜 감사를 진행하던 중 Orchard 거래정보 보호 구역에서 발견한 완전성 버그를 책임감 있게 공개했습니다. 당시 Orchard은 Zcash의 최신 거래정보 보호 구역이었으며, 이 결함은 [Halo](../zcash-tech/halo) 2 증명 시스템을 사용하는 영지식 회로의 타원 곡선 부분에 있었습니다.

1. 완전성 버그란 거래가 유효하다는 것을 증명하는 수학적 절차가 거래의 유효성을 완전히 보장하지 못하는 문제입니다.
2. 이론적으로 공격자는 이 결함을 이용해 Orchard 풀 안에 유효하지 않은 가치를 위조하고 실제로는 소유하지 않은 자금을 사용할 수 있었습니다. 일반 노드가 포착할 수 있는 흔적도 남지 않을 수 있었습니다.
3. Zcash의 턴스타일은 Orchard에서 나갈 수 있는 가치의 총량을 계속 제한했으므로 총공급량을 부풀릴 수는 없었습니다. 하지만 해당 풀 자체의 암호화는 더 이상 그 안에 숨겨진 모든 코인이 실제로 존재한다는 것을 보장하지 못했습니다.

![The bug explained: a transaction puts in 5 ZEC, but the flawed proof still passes when 7 ZEC come out, creating 2 ZEC from nothing](/content-images/ironwood-bug-8f689d6f61.webp)

위 숫자는 이해를 돕기 위한 단순화된 설명입니다. 실제 결함은 회로 수학의 특정 부분에 있었으며, 코인이 들어오고 나가는 횟수를 그대로 세는 문제는 아니었습니다. 기억해야 할 핵심은 완전성 버그로 인해 감지되지 않은 채 풀 안에서 가치가 생성될 수 있다는 점입니다.

중요한 점은 이 버그가 악용되었다는 증거, 사용자 자금에 영향을 미쳤다는 증거, ZEC의 총공급량이 변했다는 증거가 없다는 것입니다. 보안 연구 과정에서 발견되었으며, 알려진 피해가 발생하기 전에 수정되었습니다.

## 대응

Zcash 커뮤니티는 모든 수정 사항을 한꺼번에 적용하지 않고 단계적으로 배포했습니다.

![Ironwood response timeline: the Orchard bug is found in May 2026, the pool is paused in June 2026, the circuit is fixed in NU6.2, and Ironwood activated at block 3,428,143 on July 28, 2026](/content-images/ironwood-timeline-36243f0cd7.webp)

1. 2026년 6월 초, 전체 수정안을 준비하는 동안 임시 조치로 Orchard 풀을 비활성화했습니다.
2. NU6.2 업그레이드는 Orchard 회로 자체를 수정해 근본적인 완전성 취약점을 해결했습니다.
3. NU6.3 업그레이드인 Ironwood는 새로운 거래정보 보호 구역과 공개 체크포인트를 도입합니다. 이를 통해 자금은 전면적인 감사를 거치며 기존 Orchard 풀에서 이동할 수 있습니다.

![The fix in NU6.2: the corrected proof requires inputs to equal outputs, so a valid 5 ZEC output passes while an attempt to output 7 ZEC is rejected](/content-images/ironwood-fix-bb4f70ddc9.webp)

## Ironwood 풀이 하는 일

NU6.2은 새로운 모든 거래에 대해 Orchard 회로를 안전하게 만들었지만, 기존 규칙에 따라 생성된 가치는 여전히 Orchard 풀에 남아 있습니다. Ironwood은 이 가치가 이동할 수 있는 새로운 목적지와 이동 과정을 감사할 방법을 제공합니다.

Ironwood 풀은 블록 3,428,143에서 NU6.3이 만든 거래정보 보호 가치 풀입니다. 수정된 회로를 기반으로 하며, 양자 컴퓨터가 [](../zcash-tech/post-quantum-security) 오늘날의 암호화를 깨더라도 자금을 복구할 수 있도록 설계된 양자 복구 가능 노트 형식을 사용합니다. 이 형식은 [ZIP 2005](https://zips.z.cash/zip-2005)에 정의되어 있습니다.

1. 활성화 후 기존 Orchard 풀은 사용 전용이 되어 새로운 가치를 넣을 수 없습니다.
2. 새로 거래정보 보호 처리되는 가치는 대신 Ironwood으로 들어갑니다.
3. Ironwood 안에서 거래정보 보호 ZEC는 송신자, 수신자, 금액을 숨기는 프라이버시를 유지합니다. ZEC을 Orchard에서 Ironwood로 옮기면 이동한 금액이 공개됩니다.

## 턴스타일

Ironwood의 핵심은 턴스타일입니다. 이는 모든 코인이 기존 Orchard 풀에서 Ironwood로 이동할 때 반드시 거쳐야 하는 회계 체크포인트입니다.

> 턴스타일은 숨겨진 돈에 대해 은행 금고의 유리문과 같은 역할을 합니다. 안을 들여다볼 수는 없지만, 들어가는 돈과 나오는 돈은 정확히 셀 수 있습니다.

1. Orchard에서 나가는 자금은 Ironwood에 들어가기 전에 공개 검증 지점에서 집계됩니다.
2. 이를 통해 누구나 이동하는 ZEC의 양을 감사할 수 있어 실제 유통량에 대한 신뢰가 높아집니다.
3. 이전 버그를 통해 위조 ZEC이 생성되었다면, 이 이동 내역을 계산하는 과정에서 드러났을 것입니다.

턴스타일은 Zcash에서 새로 도입된 개념이 아닙니다. 네트워크는 이전에도 Sprout, Sapling, Orchard 풀 사이의 경계에서 턴스타일을 사용했습니다. 따라서 풀 사이를 이동하는 가치가 감사 가능한 상태로 유지되고, 어떤 풀도 적법하게 들어온 것보다 더 많은 가치를 내보낼 수 없습니다.

합의 규칙은 Ironwood을 포함한 모든 가치 풀의 잔액을 네트워크의 최대 화폐량 한도 안으로 유지하므로, 풀의 잔액이 음수가 되는 일은 없습니다.

## 사용자가 해야 할 일

지갑과 노드 소프트웨어가 대부분의 작업을 자동으로 처리하지만, 실제로는 기존 Orchard 풀에 보유한 거래정보 보호 자금을 턴스타일을 거쳐 Ironwood 풀로 옮기면 됩니다. 이동할 때마다 금액이 블록체인에 공개되므로, [ZIP 318](https://zips.z.cash/zip-0318)을 따르는 지갑은 금액을 표준 단위로 나누어 일정 기간에 걸쳐 전송합니다. 지갑 제공업체의 안내에 따라 지원되는 버전을 사용하세요.

## 용어집

| 용어 | 쉬운 설명 |
|---|---|
| Shielded pool | 금액과 소유자가 영지식 암호화로 숨겨지는 자금의 집합 |
| Soundness bug | 유효하지 않은 거래가 증명 검증을 통과해 유효한 것처럼 보이게 하는 결함 |
| Turnstile | 공급량을 감사할 수 있도록 풀 사이를 이동하는 가치를 집계하는 공개 체크포인트 |
| Spend-only | 자금을 사용할 수는 있지만 새로운 가치를 넣을 수는 없는 풀 |
| Network upgrade (NU) | 정해진 블록 높이에서 활성화되는 Zcash의 합의 규칙에 대한 공동 변경 |
| Quantum-recoverable note | 양자 컴퓨터가 오늘날의 암호화를 깨더라도 자금을 복구할 수 있도록 설계된 노트 형식 |

## 자주 묻는 질문

제 ZEC에도 영향을 미쳤나요? 아니요. 버그가 실제로 사용되었다는 증거가 없고, 사용자 자금에 영향이 없었으며, 총공급량에도 변화가 없습니다.

제가 해야 할 일이 있나요? 지갑과 노드 소프트웨어를 지원되는 버전으로 유지하세요. Orchard 자금을 사용하면 해당 자금은 Ironwood으로 이동하며, 이동한 금액은 공개됩니다. 일부 지갑은 표준 금액을 일정 기간에 걸쳐 전송하는 마이그레이션 기능을 제공하므로 잔액을 추적하기 어렵게 만들 수 있습니다. 지갑 제공업체의 안내를 따르세요.

Zcash은 여전히 프라이빗한가요? 네. Ironwood 내 결제는 Orchard 결제와 마찬가지로 송신자, 수신자, 금액을 숨깁니다. 예를 들어 Orchard에서 Ironwood로 풀 사이를 이동하는 금액은 공개됩니다. 이 업그레이드는 공급량의 무결성에 관한 것입니다.

버그가 실제로 악용되었나요? 악용되었다는 증거는 없습니다. 보안 연구 과정에서 발견되어 책임감 있게 공개되었으며, 알려진 피해가 발생하기 전에 수정되었습니다.

기존 Orchard 풀은 어떻게 되나요? 사용 전용이 됩니다. 새로운 가치는 들어갈 수 없으며, 기존 가치는 턴스타일을 거쳐 Ironwood으로 이동하고, 이 이동은 공개적으로 감사됩니다.

## 이해도 확인

거래정보 보호 구역 안의 ZEC이 숨겨져 있다면, 누구나 Orchard 버그로 총공급량이 몰래 부풀려지지 않았음을 어떻게 확인할 수 있을까요?

<details>
<summary>답변</summary>

턴스타일을 통해 확인할 수 있습니다. 기존 Orchard 풀에서 나오는 모든 코인은 Ironwood에 들어갈 때 공개 체크포인트에서 집계됩니다. 적법하게 들어온 것보다 더 많은 가치가 나가려 하면 회계상 수치가 맞지 않으므로, 버그로 생성될 수 있었던 위조 자금은 그 관문에서 드러납니다.
</details>

### 참고 자료

[ZIP 258: NU6.3 네트워크 업그레이드 배포](https://zips.z.cash/zip-0258)

[ZIP 257: Orchard 임시 취약점 완화 조치 및 NU6.2 네트워크 업그레이드 배포](https://zips.z.cash/zip-0257)

[ZIP 2005: Ironwood 양자 복구 가능성](https://zips.z.cash/zip-2005)

[ZIP 229: 버전 6 거래 형식](https://zips.z.cash/zip-0229)

[ZIP 318: Orchard에서 Ironwood으로 마이그레이션](https://zips.z.cash/zip-0318)

[Ironwood: Zcash을 위한 새로운 거래정보 보호 구역](https://zodl.com/ironwood-a-new-shielded-pool-for-zcash/)

### 관련 문서

[Zcash 네트워크 업그레이드](../start-here/network-upgrades)

[거래정보 보호 구역](../using-zcash/shielded-pools)

[Halo](../zcash-tech/halo)

[zk-SNARKs](../zcash-tech/zk-snarks)

[포스트 퀀텀 보안](../zcash-tech/post-quantum-security)

[Shielded Labs](../zcash-organizations/shielded-labs)

[ZEC와 Zcash](../start-here/what-is-zec-and-zcash)란 무엇인가요?

---

시리즈: [네트워크 업그레이드 색인](../start-here/network-upgrades) · 이전: [NU6.2](../zcash-tech/nu6-2) · 다음: [NU7](../zcash-tech/nu7)
