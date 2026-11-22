<a href="https://github.com/zechub/zechub/edit/main/site/Zcash_Tech/Sprout.md" target="_blank">
  <img src="https://img.shields.io/badge/Edit-blue" alt="페이지 편집"/>
</a>

# Sprout

> Zcash은 2016년 10월 28일 Sprout 거래정보 보호 구역과 함께 출시되었습니다.

> **경고:** NU7은 2026년 11월 6일(UTC, [ZIP 259](https://zips.z.cash/zip-0259) 참조)에 블록 높이 3,543,405에서 메인넷에 활성화되었습니다. 그 이후 Sprout 풀에 여전히 남아 있는 ZEC은 사용할 수 없습니다. 버전 4 거래가 더 이상 유효하지 않기 때문입니다(ZIP 2003). 복구 옵션에 대한 배경 정보는 [자금 복구](../using-zcash/recovering-funds)를 참조하세요.

이 글에서 알아볼 내용: Sprout은 Zcash이 시작된 곳으로, 프라이버시를 보호하면서 검증 가능한 화폐가 실제 블록체인에서 작동한 최초의 사례입니다.

Sprout은 Zcash 네트워크의 최초 출시이지, 이후의 [네트워크 업그레이드](../start-here/network-upgrades)가 아닙니다. 2016년 10월 28일 제네시스 블록과 함께 가동을 시작했습니다. Sprout을 정의하는 번호가 붙은 ZIP은 없습니다. ZIP 절차는 이후 Overwinter부터 시작되었으므로, Sprout은 최초의 Zcash 프로토콜 명세와 이를 기반으로 구축된 Zerocash 구성으로 설명됩니다. Zooko Wilcox이 이끈 [Electric Coin Company](../zcash-organizations/electric-coin-company)(당시 Zerocoin Electric Coin Company)이 이를 개발하고 출시했습니다. Sprout은 최초의 실용적인 zk-SNARK 거래정보 보호 거래와 최초의 거래정보 보호 구역을 선보였습니다. 이를 통해 사람들은 송신자, 수신자, 금액을 숨긴 채 ZEC을 전송할 수 있었고, 네트워크는 잔액이 올바르게 합산되는지 계속 확인할 수 있었습니다. 이 이름은 팀이 성장하리라 기대했던 젊고 싹트는 체인을 나타냈습니다.

중요한 이유. Sprout 이전의 모든 공개 블록체인에서는 결제 내역이 공개되었습니다. 누구나 누가 누구에게 얼마를 보냈는지 볼 수 있었습니다. Sprout은 이러한 세부 정보를 숨기면서도 아무도 부정행위를 하지 않았음을 증명한 최초의 실제 무허가 네트워크였습니다. 이는 현금이나 다른 사람이 읽을 수 없는 은행 명세서에서 기대하는 것과 같은 일상적인 금융 프라이버시에 중요합니다. 또한 강력한 온체인 프라이버시가 논문 속 설계를 넘어 실제로 작동할 수 있음을 증명했습니다. 이를 가능하게 한 트러스트 셋업 세리머니는 이후 암호학 연구의 기준점이 되었으며, Sprout이 함께 출시한 느리고 메모리를 많이 사용하는 증명 시스템은 정확히 2년 후 팀이 Sapling을 개발하게 된 계기였습니다.

## 최초의 거래정보 보호 구역

Sprout은 두 종류의 주소를 만들었습니다. 투명 주소(t-주소)는 Bitcoin과 비슷하게 작동하며, 세부 정보가 공개 원장에 표시됩니다. 거래정보 보호 주소(z-주소)는 자금을 Sprout [거래정보 보호 구역](../using-zcash/shielded-pools)으로 보내며, 여기서는 송신자, 수신자, 금액이 숨겨집니다. 핵심은 [zk-SNARKs](../zcash-tech/zk-snarks)입니다. 이는 거래가 유효하고 이중 지불이 없으며 잔액이 일치한다는 사실을 보여 주는 영지식 증명으로, 세부 정보를 공개하지 않습니다. Sprout은 이 방식이 실제 암호화폐에서 처음으로 운영된 사례였습니다.

![Transparent transactions expose sender, receiver, and amount, while Sprout shielded transactions hide all three yet stay verifiable](/content-images/sprout-shielded-vs-transparent-61d3b1980c.webp)

## 세리머니

Sprout의 zk-SNARKs에는 공개 매개변수 집합이 필요했으며, 이를 안전하게 생성하려면 세리머니라 불리는 일회성 셋업이 필요했습니다. 서로 떨어진 장소에 있던 참가자 6명은 각각 독립적으로 ‘독성 폐기물’이라 불리는 비밀 조각을 생성했습니다. 누군가 모든 조각을 다시 모으면 아무것도 없는 곳에서 ZEC을 위조할 수 있었습니다. 이 설계는 위험을 간단한 규칙으로 바꾸었습니다. 참가자 중 최소 1명이 자신의 조각을 폐기하면 전체 비밀을 재구성할 수 없으므로 위조가 불가능하게 유지됩니다. 공개적으로 이름이 알려진 참가자로는 Zooko Wilcox, Andrew Miller, Peter Van Valkenburgh, Peter Todd, NCC Group의 Derek Hinch가 있습니다. 참가자 1명은 익명으로 남기를 선택했습니다.

![The Ceremony: six participants generate private shards, then destroy the toxic waste, leaving only the public Sprout parameters](/content-images/sprout-ceremony-flow-ae16f6282a.webp)

## 기원

Sprout은 이후의 모든 변경이 기반으로 삼는 기준입니다. Overwinter과 함께 네트워크 업그레이드 메커니즘이 도입되었을 때, 기존 규칙은 합의 브랜치 ID 0으로 표시되었습니다. 이는 아직 업그레이드가 적용되지 않았음을 뜻합니다. 그 이후의 모든 것(Overwinter, Sapling, Blossom, Heartwood, Canopy, NU5, NU6 등)은 Sprout이 시작한 체인 위에 있습니다. 출시는 2016년 8월에 발표되었으며, 제네시스 블록은 10월 28일에 생성되었습니다. 세리머니는 그에 앞선 몇 주 동안 진행되었고, 제네시스 블록에 하드코딩된 타임스탬프에는 2016년 10월 28일 07:56 UTC로 기록되어 있습니다.

![Timeline from the August 2016 announcement through the parameter Ceremony to the October 28, 2016 Sprout launch](/content-images/sprout-timeline-348766352a.webp)

## 용어집

| 용어 | 쉬운 설명 |
|---|---|
| zk-SNARK | 송신자, 수신자, 금액을 공개하지 않고 거래가 유효함을 보여 주는 영지식 증명 |
| Shielded pool | 금액과 거래 당사자가 숨겨지는 Zcash의 프라이버시 보호 영역. Sprout 풀은 최초의 거래정보 보호 구역이었습니다 |
| z-address and t-address | z-주소는 거래정보 보호 주소로 세부 정보를 비공개로 유지합니다. t-주소는 투명 주소로 세부 정보가 공개 원장에 표시됩니다 |
| The Ceremony | Sprout의 공개 매개변수를 생성한 뒤 독성 폐기물을 폐기한 2016년 다자간 셋업 |
| Toxic waste | ZEC을 위조할 수 없도록 세리머니에서 폐기해야 했던 비밀 키 조각 |
| Consensus branch id 0 | Sprout의 규칙을 나타내는 표식으로, 네트워크 업그레이드가 적용되기 전의 기준을 뜻합니다 |

## 자주 묻는 질문

Sprout이 오늘날 내 ZEC이나 프라이버시를 바꾸나요? 아닙니다. Sprout은 과거의 일로, 지금 사용하시는 ZEC이 기반으로 삼는 체인이 시작된 때입니다. 오늘날 보유하신 코인과 프라이버시는 현재 사용하시는 지갑과 거래정보 보호 구역에 달려 있으며, Sprout과 관련해 별도로 하실 일은 없습니다.

Sprout에는 왜 ZIP 번호가 없나요? ZIP 절차는 나중에 Overwinter 업그레이드와 함께 시작되었습니다. Sprout은 최초 출시로, Zcash 프로토콜 명세와 이를 기반으로 한 Zerocash 구성으로 설명됩니다. ZIP 200은 Sprout을 돌이켜 언급하며, 업그레이드 전의 기준인 합의 브랜치 ID 0으로 설명할 뿐입니다.

세리머니에 참여한 6명을 모두 신뢰해야 했나요? 이 셋업은 참가자 중 1명만 정직하면 되도록 설계되었습니다. 각 참가자는 비밀 조각을 하나씩 보유했으며, 참가자 중 단 1명이라도 자신의 조각을 폐기하면 전체 비밀을 재구성할 수 없어 누구도 ZEC을 위조할 수 없었습니다. 참가자 5명은 공개적으로 이름이 알려졌고 1명은 익명으로 남았습니다.

Sprout 풀은 지금 제 지갑에서 사용하는 구역인가요? 아마 아닐 것입니다. Sprout은 최초의 거래정보 보호 구역이지만, 이후 Sapling과 같은 업그레이드에서 더 빠른 거래정보 보호 설계가 도입되었으며, 오늘날 대부분의 지갑은 더 새로운 구역을 사용합니다. Sprout은 프라이버시를 보호하면서 검증 가능한 거래가 실제 네트워크에서 작동할 수 있음을 증명한 작업으로 여전히 중요합니다.

Sprout은 Bitcoin과 무엇이 달랐나요? Bitcoin에서는 모든 결제가 공개 원장에 기록되어 금액과 주소가 보입니다. Sprout은 송신자, 수신자, 금액을 숨기면서도 네트워크가 거래의 유효성을 확인할 수 있는 거래정보 보호 거래를 추가했습니다. 또한 투명 주소도 유지하여 두 방식이 같은 체인에서 함께 사용될 수 있게 했습니다.

## 이해도 확인

Sprout은 활성화 높이가 있는 네트워크 업그레이드라고 불리는 경우가 많습니다. 왜 정확한 표현이 아닌가요?

<details>
<summary>정답</summary>

Sprout은 Zcash의 최초 출시이지, 이후의 업그레이드가 아닙니다. 2016년 10월 28일 제네시스 블록(블록 0)부터 활성 상태였으므로 가리킬 활성화 높이가 없습니다. 네트워크 업그레이드 메커니즘은 나중에 도입되었으며, Sprout의 규칙을 업그레이드 전 기준인 합의 브랜치 ID 0으로 표시했습니다.
</details>

### 참고 자료

[ZIP 200: 네트워크 업그레이드 메커니즘](https://zips.z.cash/zip-0200)

[Zcash 네트워크 업그레이드](https://z.cash/upgrade/)

[Electric Coin Company: Zcash Sprout 출시](https://electriccoin.co/blog/zcash-sprout-launch/)

[Electric Coin Company: 세리머니의 설계](https://electriccoin.co/blog/the-design-of-the-ceremony/)

### 관련 항목

[거래정보 보호 구역](../using-zcash/shielded-pools)

[zk-SNARKs](../zcash-tech/zk-snarks)

[Zcash 네트워크 업그레이드](../start-here/network-upgrades)

[ZEC와 Zcash은 무엇인가요](../start-here/what-is-zec-and-zcash)

[Electric Coin Company](../zcash-organizations/electric-coin-company)

---

시리즈: [네트워크 업그레이드 색인](../start-here/network-upgrades) · 다음: [Overwinter](../zcash-tech/overwinter)
