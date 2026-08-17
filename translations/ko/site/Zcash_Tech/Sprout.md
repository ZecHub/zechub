<a href="https://github.com/zechub/zechub/edit/main/site/Zcash_Tech/Sprout.md" target="_blank">
  <img src="https://img.shields.io/badge/Edit-blue" alt="편집 페이지"/>
</a>

# Sprout

> Zcash는 2016년 10월 28일, Sprout 차폐 풀과 함께 출시되었습니다.

이 문서를 통해 알게 될 것: Sprout는 Zcash가 시작된 지점이며, 사적이면서도 검증 가능한 화폐가 실제 블록체인에서 처음으로 작동한 사례입니다.

Sprout는 나중에 나온 [네트워크 업그레이드](../start-here/network-upgrades)가 아니라 Zcash 네트워크의 최초 출시입니다. 2016년 10월 28일 제네시스 블록과 함께 가동되었습니다. Sprout를 정의하는 번호 붙은 ZIP은 없습니다. ZIP 절차는 이후 Overwinter와 함께 시작되었기 때문에, Sprout는 원래의 Zcash 프로토콜 명세와 그것이 기반으로 삼은 Zerocash 구조로 설명됩니다. Zooko Wilcox가 이끈 [Electric Coin Company](../zcash-organizations/electric-coin-company)(당시 이름은 Zerocoin Electric Coin Company)가 이를 개발하고 출시했습니다. Sprout는 최초의 실용적인 zk-SNARK 차폐 트랜잭션과 원래의 차폐 풀을 도입하여, 네트워크가 잔액의 합이 맞는지 계속 확인하면서도 사람들이 송신자, 수신자, 금액이 숨겨진 상태로 ZEC를 보낼 수 있게 했습니다. 이 이름은 팀이 성장할 것으로 기대했던, 이제 막 싹튼 어린 체인을 상징했습니다.

이것이 중요한 이유. Sprout 이전의 모든 공개 블록체인은 결제를 그대로 드러냈습니다. 누구나 누가 누구에게 얼마를 보냈는지 볼 수 있었습니다. Sprout는 그런 세부 정보를 숨기면서도 누구도 부정행위를 하지 않았음을 증명한 최초의 실시간 무허가 네트워크였습니다. 이는 현금이나 다른 사람이 읽을 수 없는 은행 명세서에서 기대하는 종류의, 일상적인 금융 프라이버시에 중요합니다. 또한 강력한 온체인 프라이버시가 단지 논문 설계를 넘어 실제로 작동할 수 있음을 입증했습니다. 이를 가능하게 한 신뢰 설정 Ceremony는 이후 암호학 작업의 기준점이 되었고, Sprout와 함께 배포된 느리고 메모리 사용량이 큰 증명 시스템은 정확히 2년 뒤 팀이 Sapling을 만들도록 이끈 계기였습니다.

## 최초의 차폐 풀

Sprout는 두 종류의 주소를 만들었습니다. 투명 주소(t-address)는 Bitcoin처럼 작동하며, 세부 정보가 공개 원장에 보입니다. 차폐 주소(z-address)는 자금을 Sprout [차폐 풀](../using-zcash/shielded-pools)로 보내며, 그 안에서는 송신자, 수신자, 금액이 숨겨진 상태로 유지됩니다. 핵심은 [zk-SNARKs](../zcash-tech/zk-snarks)입니다. 이는 세부 정보를 전혀 공개하지 않고도 이중 지불이 없고 잔액의 합이 맞는 유효한 거래임을 보여줄 수 있는 영지식 증명입니다. Sprout는 이것이 실제 운영 중인 암호화폐에서 프로덕션 환경으로 처음 실행된 사례였습니다.

![투명 트랜잭션은 송신자, 수신자, 금액을 드러내지만, Sprout 차폐 트랜잭션은 이 세 가지를 모두 숨기면서도 검증 가능하게 유지합니다](https://raw.githubusercontent.com/ZecHub/zechub/main/site/Zcash_Tech/assets/sprout-shielded-vs-transparent.png)

## Ceremony

Sprout의 zk-SNARKs에는 공개 파라미터 집합이 필요했고, 이를 안전하게 생성하려면 Ceremony라고 불리는 일회성 설정이 필요했습니다. 서로 멀리 떨어진 별개의 장소에 있던 여섯 명의 참여자가 각자 toxic waste라고 불리는 비밀 조각 하나를 생성했습니다. 만약 누군가가 이 조각들을 모두 다시 모은다면, 아무것도 없는 상태에서 ZEC를 위조할 수 있었습니다. 이 설계는 그 위험을 단순한 규칙으로 바꾸었습니다. 참여자 중 단 한 명만이라도 자기 조각을 파기했다면, 전체 비밀은 결코 재구성될 수 없었고 따라서 위조는 불가능하게 유지되었습니다. 공개적으로 이름이 알려진 참여자에는 Zooko Wilcox, Andrew Miller, Peter Van Valkenburgh, Peter Todd, NCC Group의 Derek Hinch가 포함됩니다. 한 명의 참여자는 익명으로 남기를 선택했습니다.

![Ceremony: 여섯 명의 참여자가 비공개 조각을 생성한 뒤 toxic waste를 파기하고, 공개된 Sprout 파라미터만 남깁니다](https://raw.githubusercontent.com/ZecHub/zechub/main/site/Zcash_Tech/assets/sprout-ceremony-flow.png)

## 기원

Sprout는 이후의 모든 변경이 그 위에 쌓이는 기준선입니다. Overwinter와 함께 네트워크 업그레이드 메커니즘이 도입되었을 때, 원래 규칙은 합의 브랜치 id 0으로 표시되었습니다. 이는 단순히 아직 어떤 업그레이드도 적용되지 않았다는 뜻입니다. 그 이후의 모든 것(Overwinter, Sapling, Blossom, Heartwood, Canopy, NU5, NU6, 그리고 그 이후)은 Sprout가 시작한 체인 위에 놓여 있습니다. 출시는 2016년 8월에 10월 28일 제네시스를 목표로 발표되었고, Ceremony는 그 전 몇 주 동안 진행되었으며, 제네시스 블록에 하드코딩된 타임스탬프는 2016년 10월 28일 07:56 UTC입니다.

![2016년 8월 발표부터 파라미터 Ceremony를 거쳐 2016년 10월 28일 Sprout 출시까지의 타임라인](https://raw.githubusercontent.com/ZecHub/zechub/main/site/Zcash_Tech/assets/sprout-timeline.png)

## 용어집

| 용어 | 쉬운 뜻 |
|---|---|
| zk-SNARK | 송신자, 수신자, 금액을 공개하지 않고도 거래가 유효하다는 것을 보여주는 영지식 증명 |
| 차폐 풀 | 금액과 당사자가 숨겨지는 Zcash의 비공개 영역입니다. Sprout 풀은 그 첫 번째였습니다 |
| z-address와 t-address | z-address는 차폐되어 세부 정보를 비공개로 유지합니다. t-address는 투명하며 세부 정보를 공개 원장에 드러냅니다 |
| Ceremony | Sprout의 공개 파라미터를 생성한 뒤 toxic waste를 폐기한 2016년의 다자간 설정 |
| Toxic waste | ZEC가 위조되지 않도록 파기되어야 했던 Ceremony의 비밀 키 조각 |
| 합의 브랜치 id 0 | 업그레이드 이전 기준선이라는 뜻의 Sprout 규칙 라벨 |

## FAQ

Sprout가 오늘 내 ZEC나 프라이버시를 바꾸나요? 아닙니다. Sprout는 역사이며, 당신의 ZEC가 존재하는 체인을 시작한 출시입니다. 오늘날 당신의 코인과 프라이버시는 Sprout에 대해 따로 뭘 해야 하는지가 아니라, 지금 사용하는 지갑과 차폐 풀에 달려 있습니다.

왜 Sprout에는 ZIP 번호가 없나요? ZIP 절차는 나중에 Overwinter 업그레이드와 함께 시작되었습니다. Sprout는 원래의 출시이며, Zcash 프로토콜 명세와 그것이 기반으로 삼은 Zerocash 구조로 설명됩니다. ZIP 200은 사후적으로만 Sprout를 언급하며, 업그레이드 이전 기준선인 합의 브랜치 id 0으로 다룹니다.

Ceremony의 여섯 사람을 믿어야 했나요? 이 설정은 그중 단 한 명만 정직해도 되도록 설계되었습니다. 각자는 비밀 조각 하나를 보유했고, 단 한 명의 참여자라도 자기 조각을 파기했다면 전체 비밀은 다시 구성될 수 없었으며 누구도 ZEC를 위조할 수 없었습니다. 다섯 명의 참여자는 공개적으로 이름이 밝혀졌고, 한 명은 익명으로 남았습니다.

Sprout 풀이 지금 내 지갑이 사용하는 풀인가요? 아마 아닐 것입니다. Sprout는 최초의 차폐 풀이었지만, 이후 Sapling 같은 업그레이드는 더 빠른 차폐 설계를 도입했고, 오늘날 대부분의 지갑은 더 새로운 풀을 사용합니다. Sprout는 사적이면서도 검증 가능한 트랜잭션이 실제 네트워크에서 작동할 수 있음을 입증한 작업으로서 여전히 중요합니다.

Sprout는 Bitcoin과 무엇이 달랐나요? Bitcoin은 모든 결제를 금액과 주소가 보이는 공개 원장에 기록합니다. Sprout는 송신자, 수신자, 금액을 숨기면서도 네트워크가 거래의 유효성을 확인할 수 있는 차폐 트랜잭션을 추가했습니다. 또한 투명 주소도 유지했기 때문에, 두 방식이 같은 체인 위에 함께 존재합니다.

## 이해도 확인

Sprout는 종종 활성화 높이를 가진 네트워크 업그레이드라고 불립니다. 왜 그것은 완전히 정확한 표현이 아닐까요?

<details>
<summary>정답</summary>

Sprout는 나중에 이루어진 업그레이드가 아니라 Zcash의 원래 출시입니다. 2016년 10월 28일 제네시스 블록(블록 0)부터 활성화되어 있었기 때문에, 따로 가리킬 활성화 높이가 없습니다. 네트워크 업그레이드 메커니즘은 나중에 도입되었고, Sprout의 규칙을 업그레이드 이전 기준선인 합의 브랜치 id 0으로 표시했습니다.
</details>

### 자료

[ZIP 200: 네트워크 업그레이드 메커니즘](https://zips.z.cash/zip-0200)

[Zcash 네트워크 업그레이드](https://z.cash/upgrade/)

[Electric Coin Company: Zcash Sprout 출시](https://electriccoin.co/blog/zcash-sprout-launch/)

[Electric Coin Company: Ceremony의 설계](https://electriccoin.co/blog/the-design-of-the-ceremony/)

### 함께 보기

[차폐 풀](../using-zcash/shielded-pools)

[zk-SNARKS](../zcash-tech/zk-snarks)

[Zcash 네트워크 업그레이드](../start-here/network-upgrades)

[ZEC와 Zcash란 무엇인가](../start-here/what-is-zec-and-zcash)

[Electric Coin Company](../zcash-organizations/electric-coin-company)

---

시리즈: [네트워크 업그레이드 색인](../start-here/network-upgrades) · 다음: [Overwinter](../zcash-tech/overwinter)
