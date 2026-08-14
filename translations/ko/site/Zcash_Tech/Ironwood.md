---
<a href="https://github.com/zechub/zechub/edit/main/site/Zcash_Tech/Ironwood.md" target="_blank">
  <img src="https://img.shields.io/badge/Edit-blue" alt="Edit Page"/>
</a>

# Ironwood

> Ironwood는 Zcash 메인넷의 블록 3,428,143에서 활성화되며, UTC 기준 2026년 7월 28일경으로 예상됩니다.

이 문서에서 알게 될 내용: Ironwood가 무엇을 바꾸는지, 숨겨진 돈에서 발생한 버그가 왜 심각한지, 그리고 턴스타일이 어떻게 누구나 ZEC가 위조되지 않았음을 확인할 수 있게 해주는지.

Ironwood는 Zcash의 [네트워크 업그레이드](../start-here/network-upgrades)이며, 공식적으로는 NU6.3으로, 같은 이름의 새로운 shielded 풀을 도입합니다. [shielded 풀](../using-zcash/shielded-pools)은 [영지식 암호학](../zcash-tech/zk-snarks)에 의해 금액과 소유자가 숨겨지는 자금의 집합입니다. Ironwood는 기존 Orchard shielded 풀에서 발견된 soundness bug를 격리하고 감사하기 위해 존재하며, 커뮤니티가 ZEC 총공급량이 정직한지 더 강력하게 점검할 수 있는 방법을 제공합니다. 그 합의 규칙은 [ZIP 258](https://zips.z.cash/zip-0258)에 명시되어 있습니다.

왜 이것이 중요한가. Bitcoin 같은 투명한 돈에서는 누구나 공개 원장을 읽어 코인이 위조되지 않았는지 확인할 수 있습니다. 반면 shielded money는 금액을 숨기므로, 그냥 들여다보는 것만으로는 알 수 없습니다. 대신 암호학 자체가 누구도 비밀리에 돈을 만들어낼 수 없음을 보장해야 합니다. Ironwood가 중요한 이유는 Orchard 풀에서 그 보장에 버그가 발견되었기 때문입니다. 이번 업그레이드는 그 틈을 메우고, 누구나 ZEC 총공급량이 여전히 정직한지 확인할 수 있는 방법을 제공합니다.

Zcash가 처음이신가요? 먼저 [ZEC와 Zcash란 무엇인가](../start-here/what-is-zec-and-zcash)와 [Shielded Pools](../using-zcash/shielded-pools)를 읽고, 다시 이 문서로 돌아오세요.

![Ironwood 가치 마이그레이션 흐름: 가치가 Orchard 풀을 떠나 턴스타일 점검 지점을 통과한 뒤 새로운 Ironwood 풀로 들어갑니다](https://raw.githubusercontent.com/ZecHub/zechub/main/site/Zcash_Tech/assets/ironwood-flow.png)

## Ironwood가 필요했던 이유

2026년 5월 말, 독립 보안 연구자 Taylor Hornby는 [Shielded Labs](../zcash-organizations/shielded-labs)를 위한 프로토콜 감사를 진행하던 중, Orchard shielded 풀에서 soundness bug를 책임감 있게 공개했습니다. Orchard는 당시 Zcash의 최신 shielded 풀이었고, 이 결함은 [Halo](../zcash-tech/halo) 2 증명 시스템을 사용하는 영지식 회로의 타원곡선 부분에 있었습니다.

1. soundness bug는 거래가 유효하다는 것을 증명하는 수학이 그것을 완전히 보장하지 못한다는 뜻입니다.
2. 이론적으로 공격자는 이 결함을 이용해 Orchard 풀 내부에서 유효하지 않은 가치를 위조하고, 실제로 자기 것이 아닌 자금을 써버릴 수 있었으며, 일반 노드가 잡아낼 흔적도 남기지 않을 수 있었습니다.
3. Zcash의 턴스타일은 여전히 Orchard에서 빠져나갈 수 있는 가치의 총량에 상한을 두었기 때문에 총공급량이 부풀려질 수는 없었지만, 풀 자체의 암호학은 더 이상 그 안에 숨겨진 모든 코인이 진짜임을 보장하지 못했습니다.

![버그 설명: 거래에 5 ZEC를 넣었지만, 결함 있는 증명은 7 ZEC가 나와도 통과되어 아무것도 없는 곳에서 2 ZEC를 만들어냅니다](https://raw.githubusercontent.com/ZecHub/zechub/main/site/Zcash_Tech/assets/ironwood-bug.png)

위 숫자는 단순화된 예시입니다. 실제 결함은 코인이 들어오고 나가는 개수를 문자 그대로 세는 문제가 아니라, 회로 수학의 특정 부분에 있었습니다. 여기서 핵심은 soundness bug가 탐지되지 않은 채 풀 내부에서 가치가 생성되게 할 수 있다는 점입니다.

중요한 점은, 이 버그가 실제로 악용되었다는 증거도 없고, 사용자 자금에 영향이 있었다는 증거도 없으며, ZEC 총공급량이 바뀌었다는 증거도 없다는 것입니다. 이 문제는 보안 연구를 통해 발견되었고, 알려진 피해가 발생하기 전에 수정되었습니다.

## 대응

Zcash 커뮤니티는 모든 것을 한 번에 처리하기보다 단계적으로 수정 사항을 배포했습니다.

![Ironwood 대응 타임라인: Orchard 버그는 2026년 5월에 발견되고, 풀은 2026년 6월에 일시 중지되며, 회로는 NU6.2에서 수정되고, Ironwood는 2026년 7월 28일경 활성화됩니다](https://raw.githubusercontent.com/ZecHub/zechub/main/site/Zcash_Tech/assets/ironwood-timeline.png)

1. 2026년 6월 초, 전체 수정이 준비되는 동안 임시 조치로 Orchard 풀이 비활성화되었습니다.
2. NU6.2 업그레이드는 Orchard 회로 자체를 수정하여, 근본적인 soundness 취약점을 막았습니다.
3. NU6.3 업그레이드인 Ironwood는 새로운 shielded 풀과 공개 점검 지점을 도입하여, 가치가 완전한 감사 아래 기존 Orchard 풀에서 빠져나올 수 있게 합니다.

![NU6.2의 수정: 수정된 증명은 입력과 출력이 같아야 하므로, 올바른 5 ZEC 출력은 통과하고 7 ZEC를 출력하려는 시도는 거부됩니다](https://raw.githubusercontent.com/ZecHub/zechub/main/site/Zcash_Tech/assets/ironwood-fix.png)

## Ironwood 풀이 하는 일

NU6.2는 모든 새로운 거래에 대해 Orchard 회로를 안전하게 만들었지만, 이전 규칙 아래에서 생성된 가치는 여전히 Orchard 풀 안에 남아 있습니다. Ironwood는 그 가치가 이동할 수 있는 깨끗한 목적지와, 이동 과정 자체를 감사할 수 있는 방법을 제공합니다.

Ironwood 풀은 NU6.3가 활성화될 때 생성되는 새로운 shielded value 풀입니다. 이 풀은 수정된 회로 위에 구축되며, 양자 복구 가능 노트 형식(언젠가 [양자 컴퓨터](../zcash-tech/post-quantum-security)가 오늘날의 암호를 깨뜨리더라도 자금을 복구할 수 있게 하는 설계)을 사용합니다. 이는 [ZIP 2005](https://zips.z.cash/zip-2005)에 정의되어 있습니다.

1. 활성화 이후 기존 Orchard 풀은 spend-only가 되어, 새로운 가치가 더 이상 그 안으로 들어갈 수 없습니다.
2. 새로 shielded 처리되는 가치는 대신 Ironwood로 들어갑니다.
3. Shielded ZEC는 발신자, 수신자, 금액을 숨기는 동일한 강력한 프라이버시 보장을 유지합니다.

## 턴스타일

Ironwood의 핵심 아이디어는 턴스타일입니다. 이는 기존 Orchard 풀에서 Ironwood로 이동하는 모든 코인이 반드시 통과해야 하는 회계 점검 지점입니다.

> 턴스타일은 숨겨진 돈에 대해, 은행 금고의 유리문이 하는 역할을 합니다. 안을 직접 볼 수는 없지만, 무엇이 들어가고 무엇이 나오는지는 정확히 셀 수 있습니다.

1. Orchard를 떠나는 자금은 Ironwood에 들어가기 전에 공개 검증 지점에서 집계됩니다.
2. 이를 통해 누구나 얼마나 많은 ZEC가 마이그레이션되는지 감사할 수 있어, 실제 유통 공급량에 대한 신뢰가 강화됩니다.
3. 만약 이전 버그를 통해 위조된 ZEC가 생성되었다면, 바로 이 마이그레이션 회계 과정에서 드러나게 됩니다.

턴스타일은 Zcash에서 새로운 개념이 아닙니다. 네트워크는 이미 Sprout, Sapling, Orchard 풀 사이의 경계에서 이를 사용해 왔으며, 풀 사이를 이동하는 가치가 감사 가능하게 유지되고 어떤 풀도 정당하게 들어온 양보다 더 많이 내보낼 수 없도록 해왔습니다.

합의 규칙은 Ironwood를 포함한 모든 value 풀이 네트워크의 최대 화폐 한도 내에 머물도록 보장하므로, 풀 잔액이 음수가 되는 일은 결코 없습니다.

## 사용자가 해야 할 일

지갑과 노드 소프트웨어가 대부분의 과정을 자동으로 처리하지만, 실질적인 변화는 간단합니다. 시간이 지나면서 기존 Orchard 풀에 있는 shielded 보유분을 턴스타일을 거쳐 Ironwood 풀로 옮기면 됩니다. 지갑 제공자의 안내를 따르고, 활성화 블록 전에 반드시 지원되는 릴리스로 업데이트하세요.

## 용어집

| 용어 | 쉬운 의미 |
|---|---|
| Shielded pool | 영지식 암호학에 의해 금액과 소유자가 숨겨지는 자금의 집합 |
| Soundness bug | 유효하지 않은 거래가 마치 유효한 것처럼 증명 검사를 통과하게 만드는 결함 |
| Turnstile | 공급량이 감사 가능하게 유지되도록 풀 사이를 이동하는 가치를 집계하는 공개 점검 지점 |
| Spend-only | 자금을 쓸 수는 있지만 새로운 가치를 추가할 수는 없는 풀 |
| Network upgrade (NU) | 정해진 블록 높이에서 활성화되는, Zcash의 합의 규칙에 대한 조정된 변경 |
| Quantum-recoverable note | 언젠가 양자 컴퓨터가 오늘날의 암호를 깨뜨리더라도 자금을 복구할 수 있도록 설계된 노트 형식 |

## FAQ

내 ZEC도 영향을 받았나요? 아니요. 이 버그가 실제로 사용되었다는 증거도 없고, 사용자 자금에 대한 영향도 없으며, 총공급량의 변화도 없습니다.

내가 해야 할 일이 있나요? 활성화 블록 전에 지갑과 노드 소프트웨어를 지원되는 릴리스로 최신 상태로 유지하세요. 지갑은 사용하면서 시간이 지나면 자금을 Ironwood로 옮기므로, 서둘러 수동으로 해야 할 일은 없습니다. 지갑 제공자의 안내를 따르세요.

Zcash는 여전히 프라이빗한가요? 네. Ironwood는 발신자, 수신자, 금액을 숨기는 동일한 shielded 프라이버시를 유지합니다. 이번 업그레이드는 프라이버시가 아니라 공급 무결성에 관한 것입니다.

이 버그가 실제로 악용된 적이 있나요? 그렇다는 증거는 없습니다. 이 문제는 보안 연구를 통해 발견되었고, 책임감 있게 공개되었으며, 알려진 피해가 발생하기 전에 수정되었습니다.

기존 Orchard 풀은 어떻게 되나요? spend-only가 됩니다. 새로운 가치는 더 이상 그 안으로 들어갈 수 없고, 기존 가치는 턴스타일을 거쳐 Ironwood로 이동하며, 그 마이그레이션은 공개적으로 감사됩니다.

## 이해도 확인

shielded 풀 안의 ZEC는 숨겨져 있는데, 어떻게 누구나 Orchard 버그가 총공급량을 몰래 부풀리지 않았다는 것을 확인할 수 있나요?

<details>
<summary>정답</summary>

턴스타일을 통해서입니다. 기존 Orchard 풀을 떠나는 모든 코인은 Ironwood에 들어갈 때 공개 점검 지점에서 집계됩니다. 정당하게 들어온 양보다 더 많은 가치가 빠져나가려 한다면 회계가 맞지 않게 되므로, 버그가 만들어냈을 수 있는 모든 위조분은 그 관문에서 드러나게 됩니다.
</details>

### 자료

[ZIP 258: NU6.3 네트워크 업그레이드 배포](https://zips.z.cash/zip-0258)

[ZIP 257: Orchard 임시 취약점 완화 및 NU6.2 네트워크 업그레이드 배포](https://zips.z.cash/zip-0257)

[ZIP 2005: Ironwood 양자 복구 가능성](https://zips.z.cash/zip-2005)

[Ironwood: Zcash를 위한 새로운 Shielded Pool](https://zodl.com/ironwood-a-new-shielded-pool-for-zcash/)

### 함께 보기

[Zcash 네트워크 업그레이드](../start-here/network-upgrades)

[Shielded Pools](../using-zcash/shielded-pools)

[Halo](../zcash-tech/halo)

[zk-SNARKS](../zcash-tech/zk-snarks)

[포스트 양자 보안](../zcash-tech/post-quantum-security)

[Shielded Labs](../zcash-organizations/shielded-labs)

[ZEC와 Zcash란 무엇인가](../start-here/what-is-zec-and-zcash)

---

시리즈: [네트워크 업그레이드 색인](../start-here/network-upgrades) · 이전: [NU6.2](../zcash-tech/nu6-2)
