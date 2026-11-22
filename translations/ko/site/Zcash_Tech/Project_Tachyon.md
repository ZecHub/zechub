<a href="https://github.com/zechub/zechub/edit/main/site/Zcash_Tech/Project_Tachyon.md" target="_blank">
  <img src="https://img.shields.io/badge/Edit-blue" alt="페이지 수정"/>
</a>

# 프로젝트 Tachyon

## 요약

- Tachyon는 Zcash 지갑이 거래정보 보호 자금을 찾아 사용하도록 하는 방식을 재설계하자는 제안으로, 네트워크가 매우 많은 사용자로 확장될 수 있도록 하는 것이 목표입니다.
- 현재 지갑은 어떤 결제가 자신의 것인지 알아내기 위해 블록체인의 상당 부분을 복호화해 보아야 합니다. 이것이 거래정보 보호 동기화가 느리게 느껴지는 주된 이유입니다.
- Tachyon는 이를 **비인지 동기화**(oblivious synchronization)로 대체합니다. 지갑은 필요한 데이터를 가져오되, 모든 데이터를 살펴보지 않고 서버에 어떤 부분을 요청했는지도 알리지 않습니다.
- 또한 결제 세부 정보를 블록체인에서 결제 요청 자체로 옮깁니다. 프로토콜은 단순해지지만 지갑의 책임은 커집니다.
- 이 제안은 2025년 4월에 처음 공개되었습니다. **NU7에 포함되지 않으며**, **출시되지도 않았습니다**. Sapling 업그레이드에 맞먹는 규모의 개발 작업이 필요합니다.

<br/>

## 대상 독자

- 거래정보 보호 지갑을 동기화하면서 왜 이렇게 오래 걸리는지 궁금했던 분
- Tachyon가 NU7 및 Zcash scaling과 함께 언급되는 것을 자주 접한 분
- 먼저 핵심 아이디어를 이해하고, 암호학은 그다음에 살펴보고 싶은 독자

<br/>

## Tachyon가 해결하는 문제

Zcash는 결제가 누구를 위한 것인지 숨깁니다. 이것이 핵심이며, 동시에 난감한 문제를 만듭니다. 결제가 누구에게 속하는지 아무도 알 수 없다면, 내 지갑은 어떻게 내 결제를 찾을 수 있을까요?

Bitcoin에서는 쉽습니다. 주소가 공개되어 있으므로 지갑은 서버에 “이 주소로 무엇이 전송되었나요?”라고 물어 답을 얻을 수 있습니다. Zcash 지갑은 그런 질문을 할 수 없습니다. 질문하는 순간 거래정보 보호 구역이 숨기도록 설계된 내용을 정확히 드러내기 때문입니다.

따라서 Zcash는 다른 방식을 사용합니다. 발신자는 결제 세부 정보를 암호화해 거래 안에 넣습니다. 그러면 지갑은 체인의 거래를 하나씩 살펴보며 각각을 복호화하려고 시도합니다. 거의 모든 시도는 실패합니다. 성공하는 몇 건이 바로 내 결제입니다. 이를 **시험 복호화**(trial decryption)라고 합니다. 프라이버시를 지키고 정확하지만 느립니다.

![Today a Zcash wallet downloads every shielded transaction and tries to decrypt each one, with almost every attempt failing, to find the few payments that belong to it](/content-images/tachyon-scanning-today.svg)

문제는 필요한 작업량이 무엇에 따라 달라지는가입니다. 지갑이 들이는 노력은 실제로 받은 결제 건수가 아니라 체인의 크기에 좌우됩니다. 결제를 한 번도 받은 적 없는 사람도 매일 결제를 받는 사람과 거의 같은 작업을 해야 합니다. Zcash가 커질수록 모두에게 상황이 나빠집니다. 제안서의 표현을 빌리자면, “단순히 확장되지 않습니다.”

<br/>

## Tachyon가 바꾸는 점

Tachyon는 문제의 근본 원인을 해결합니다. 블록체인을 결제 비밀의 전달 경로로 사용하는 것을 중단합니다.

대신 필요한 세부 정보는 대역 외 방식으로 결제 요청 자체와 함께 전달됩니다. 결제 요청, URI 또는 QR 코드에 과거에는 거래 안에 암호화되어 들어갔던 정보가 담깁니다. Sean Bowe는 이를 Zcash 거래정보 보호 프로토콜에서 처음으로 **대역 외 결제**(out-of-band payments)를 수용하는 것으로 설명합니다.

체인이 더 이상 해당 정보를 전달하지 않게 되면 지갑이 체인을 검색할 이유도 없어져 시험 복호화 문제가 사라집니다.

하지만 지갑은 여전히 결제를 위해 현재 체인 상태를 알아야 합니다. 이것이 설계의 두 번째 요소인 **비인지 동기화**입니다. 지갑이 필요한 항목만 가져오면서도 서버에 어떤 항목을 요청했는지 드러내지 않는 방식입니다.

![With Tachyon the sender passes payment details to the recipient out of band, and the wallet uses oblivious synchronization to retrieve only the data it needs instead of scanning the whole chain](/content-images/tachyon-oblivious-sync.svg)

<br/>

## 지갑 사용자에게 미치는 영향

- **동기화 시간이 체인과 함께 늘어나지 않습니다.** 지갑이 따라잡는 데 걸리는 시간은 Zcash의 크기가 아니라 사용자의 활동량에 따라 달라집니다.
- **결제가 청구서를 건네는 것과 비슷해집니다.** 결제 요청에 수신자에게 필요한 정보가 담기므로, 발신자와 수신자 사이의 정보 전달이 지금보다 중요해집니다.
- **지갑의 책임이 커집니다.** 체인에 결제 세부 정보의 암호화된 사본이 더 이상 저장되지 않으므로, 지갑 데이터를 잃어버리면 더 큰 문제가 됩니다. 백업과 복구는 프로토콜 기능이 아니라 지갑 소프트웨어가 제대로 구현해야 하는 기능이 됩니다.
- **익숙한 일부 요소가 이동하거나 사라집니다.** Tachyon는 키 다변화, viewing key, 결제 주소를 핵심 프로토콜에서 빼고 지갑 계층에 맡깁니다. 이는 제안에서 영향이 큰 부분 중 하나이며, 아직 논의가 진행 중입니다.

<br/>

## 기술 독자를 위한 자세한 설명

Tachyon는 Orchard 프로토콜에 대한 역호환 변경으로 설명됩니다. 기존 Orchard 풀을 업그레이드하거나, [턴스타일](https://zechub.wiki/zcash-tech/the-turnstile)을 통해 연결되는 별도의 거래정보 보호 구역으로 배포할 수 있습니다. 이는 Zcash가 Ironwood에 사용한 것과 같은 메커니즘입니다. 어느 쪽을 선택하느냐는 배포 방식에 영향을 미칠 뿐, 설계 자체에는 영향을 주지 않습니다.

Orchard의 여러 요소를 유지합니다. RedPallas 키 재무작위화, 동형 가치 커밋먼트와 바인딩 서명, 그리고 기기가 지출 권한을 넘기지 않고도 증명 작업을 위임할 수 있게 하는 분할 키 구조입니다.

확장 작업은 **증명을 수반하는 데이터**(proof-carrying data)라는 기법을 활용합니다. 데이터가 자체 정확성을 증명하는 증명과 함께 이동하므로, 이를 다른 증명을 수반하는 데이터와 결합하면 해당 증명을 이어받고 확장하는 결과를 만들 수 있습니다. 이 덕분에 검증된 대량의 작업을 작고 빠르게 확인할 수 있는 형태로 압축할 수 있습니다. Zcash을 만든 팀이 발견한 Halo 덕분에 증명을 수반하는 데이터를 실제로 활용할 수 있게 되었습니다.

세 번째 축은 **거래정보 보호 거래 집계**(shielded transaction aggregates)입니다. 이는 거래정보 보호 상태 변경 사항을 전달하는 방식을 바꾸며 서명 방식에도 연쇄적인 영향을 미칩니다.

<br/>

## 진행 현황

Tachyon는 **출시된 기능이 아니라 제안**입니다. 2025년 4월에 공개되었고, 2025년 5월의 후속 게시물에서는 합의에 미치는 영향을 검토했습니다. Ironwood 다음 업그레이드인 NU7의 후보로 언급되었지만, 2026년 9월 17일에 합의된 NU7의 범위에는 포함되지 않습니다. [ZIP 259](https://zips.z.cash/zip-0259)에는 NU7가 배포하는 항목이 나열되어 있고, [포럼 공지](https://forum.zcashcommunity.com/t/nu7-timeline/57655)에서는 새로운 거래 형식이 포함되지 않는다고 밝혔습니다. Tachyon의 활성화 날짜는 정해지지 않았습니다.

작성자는 이 작업을 추측성 연구가 아니라 실행 가능한 계획으로 설명합니다. 다만 Sapling에 맞먹는 개발 작업이 필요하며, 더 어려운 문제 중 일부는 의도적으로 후속 과제로 남겨 두었습니다.

관련 작업은 이미 진행 중입니다. 2026년 7월에 출시된 풀 노드인 [Zakura](https://zechub.wiki/zcash-tech/zakura-node)는 프로젝트 Tachyon와 Valar Group의 공동 작업으로, 이와 같은 네트워크 수준의 변경 사항 일부를 미리 보여줍니다. [비공개 정보 검색](https://zechub.wiki/zcash-tech/private-information-retrieval) 연구는 다른 접근 방식으로 같은 스캔 병목 현상을 해결하려 합니다.

<br/>

## 흔한 오해

- **Tachyon는 아직 실제로 적용되지 않았습니다.** 현재 이를 사용하는 지갑은 없으며, 이를 활성화한 업그레이드도 없습니다.
- **Tachyon와 Ironwood는 같은 것이 아닙니다.** Ironwood는 2026년 7월에 활성화되었으며 Orchard 풀과 턴스타일을 다뤘습니다. Tachyon는 확장성에 관한 별도의 후속 제안입니다.
- **Tachyon는 프라이버시를 낮추는 방안이 아닙니다.** 목표는 속도를 위해 프라이버시를 희생하는 것이 아니라, 원장을 서로 구별할 수 없는 상태로 유지하면서 확장 비용을 없애는 것입니다.
- **zk-SNARK 검증이 병목이었던 적은 없습니다.** 제안서에서는 느린 부분이 증명 확인 비용이 아니라 지갑이 상태를 발견하고 조정하는 방식이라고 명시합니다.
- **Tachyon는 NU7에 포함되지 않습니다.** 한때 후보로 언급되었지만, 2026년 9월에 합의된 범위는 25초 블록, 수수료 재활용, 버전 4 거래의 종료를 다루며 새로운 거래 형식은 포함하지 않습니다([ZIP 259](https://zips.z.cash/zip-0259)).

<br/>

## 용어집

| 용어 | 뜻 |
|---|---|
| Trial decryption | 자신에게 전달된 거래를 찾기 위해 거래를 하나씩 복호화하려는 시도 |
| In-band secret distribution | Zcash가 현재 사용하는 것처럼 블록체인의 거래 안에 결제 비밀을 넣는 방식 |
| Out-of-band payment | 체인을 거치지 않고 발신자와 수신자 사이에서 결제 세부 정보를 직접 전달하는 방식 |
| Oblivious synchronization | 어떤 데이터를 요청했는지 드러내지 않고 지갑에 필요한 체인 데이터를 가져오는 방식 |
| Proof-carrying data (PCD) | 자체 정확성을 증명하는 증명과 함께 전달되어 증명을 결합하고 압축할 수 있는 데이터 |
| Shielded transaction aggregate | 거래정보 보호 상태 변경 사항을 묶어 전달 및 서명 방식을 바꾸는 Tachyon의 방식 |
| ledger indistinguishability | 거래정보 보호 거래끼리 서로 구별할 수 없는 속성 |

<br/>

## 자주 묻는 질문

**이렇게 하면 지갑 동기화가 빨라지나요?** 그것이 목표입니다. 동기화 시간은 체인의 크기가 아니라 사용자의 활동량에 따라 달라집니다. 아직 출시되지 않았으므로 인용할 측정값은 없습니다.

**지금 제가 해야 할 일이 있나요?** 없습니다. Tachyon는 제안입니다. 채택된다면 일반적인 공지 절차에 따라 네트워크 업그레이드로 적용될 것입니다.

**viewing key를 없애면 읽기 권한을 공유할 수 없게 되나요?** 제안에서는 해당 기능을 핵심 프로토콜에서 지갑 계층으로 옮깁니다. 실제로 어떻게 구현될지는 아직 결정되지 않은 문제 중 하나입니다.

**Tachyon가 출시되면 자금이 위험해지나요?** 배포는 Orchard 업그레이드 또는 턴스타일을 사용합니다. 두 방식 모두 공개 회계 규칙에 따라 가치가 이동하도록 설계되었습니다. 턴스타일의 작동 방식은 Ironwood 페이지에서 설명합니다.

<br/>

## 관련 페이지

- [비공개 정보 검색](https://zechub.wiki/zcash-tech/private-information-retrieval) - 같은 지갑 스캔 병목 현상에 대한 또 다른 접근 방식
- [Zakura 노드](https://zechub.wiki/zcash-tech/zakura-node) - Tachyon의 개발 작업을 일부 활용해 만든 노드
- [Ironwood](https://zechub.wiki/zcash-tech/ironwood) - 2026년 7월에 활성화된 업그레이드로, Tachyon와 자주 혼동됩니다.
- [턴스타일](https://zechub.wiki/zcash-tech/the-turnstile) - Tachyon를 독립된 풀로 배포할 때 사용할 수 있는 메커니즘
- [양자 내성 보안](https://zechub.wiki/zcash-tech/post-quantum-security) - Tachyon가 장기적인 프로토콜 작업과 함께 다뤄지는 방식
- [Zcash의 구성 방식](https://zechub.wiki/start-here/how-zcash-is-organized) - 누가 이 작업을 수행하고 생태계가 어떻게 구성되는지 설명합니다.

<br/>

## 참고 자료

- [Tachyon: 비인지 동기화로 Zcash scaling](https://seanbowe.com/blog/tachyon-scaling-zcash-oblivious-synchronization/) - Sean Bowe, 2025년 4월 2일, 최초 제안
- [먼 거리에서의 Tachyaction](https://seanbowe.com/blog/tachyaction-at-a-distance/) - Sean Bowe, 2025년 5월 15일, 프로토콜 개발자를 위한 합의 및 프로토콜 영향 분석
- [Sean Bowe의 블로그](https://seanbowe.com/blog/) - Tachyon 시리즈가 게시되는 곳
- [tachyon.z.cash](https://tachyon.z.cash/) - 프로젝트 사이트
