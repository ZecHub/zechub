<a href="https://github.com/zechub/zechub/edit/main/site/Zcash_Tech/Sapling.md" target="_blank">
  <img src="https://img.shields.io/badge/Edit-blue" alt="페이지 편집"/>
</a>

# Sapling

> Sapling는 2018년 10월 29일 02:15 UTC, 블록 419,200에서 Zcash 메인넷에 적용되었습니다.

얻어 가실 내용: Sapling는 거래정보 보호 Zcash 결제를 빠르고 가볍게 만들어 휴대전화나 하드웨어 지갑에서도 사용할 수 있게 했습니다.

Sapling는 두 번째 주요 Zcash 네트워크 업그레이드로, Zcash의 두 번째 기념일에 활성화되었습니다. 이는 거래정보 보호(프라이빗) 거래의 구성 방식을 새롭게 바꾼 합의 하드 포크였습니다. 배포 방식은 ZIP 205에, 새로운 거래 서명 규칙은 ZIP 243에 정의되어 있으며, 둘 다 네트워크 업그레이드 메커니즘인 ZIP 200을 기반으로 합니다. 전체 세부 사항은 Zcash 프로토콜 사양에 나와 있습니다. Electric Coin Company가 업그레이드를 개발하고 이를 지원하는 첫 버전인 zcashd 2.0.0을 2018년 8월에 출시했습니다. 온체인에서 네트워크는 합의 분기 ID로 Sapling 규칙을 식별합니다.

중요한 이유. Sapling 이전에는 진정한 프라이버시를 보장하는 결제를 하려면 컴퓨터가 증명을 생성하는 동안 수 기가바이트의 메모리를 사용하며 몇 분을 기다려야 했습니다. 대부분의 사람에게는 너무 느리고 부담스러웠기 때문에 많은 사용자와 거래소, 상점이 거래정보 보호 거래를 건너뛰고 ZEC를 그대로 전송했습니다. Sapling는 처리 시간을 몇 초로, 메모리 사용량을 약 40메가바이트로 줄였습니다. 이 한 가지 변화 덕분에 일상에서 일반 휴대전화와 하드웨어 지갑으로 거래정보 보호 ZEC를 실용적으로 사용할 수 있게 되었습니다.

## 핵심 요약

- Sapling는 두 번째 주요 Zcash 네트워크 업그레이드로, 블록 419,200(2018년 10월 29일 02:15 UTC)에서 활성화되었습니다. 이는 Zcash의 두 번째 기념일이었습니다.
- 거래정보 보호 거래를 목적에 맞게 설계된 2개의 회로(Spend와 Output) 중심으로 새롭게 구성하여, Sprout의 느린 단일 JoinSplit 회로를 대체했습니다(ZIP 205, ZIP 243).
- 그 결과 증명 생성에 걸리는 시간은 몇 분에서 몇 초로, 메모리 사용량은 수 기가바이트에서 약 40MB로 줄어 휴대전화와 하드웨어 지갑에서도 사용할 수 있을 만큼 가벼워졌습니다.
- 새로운 기능: 다변화 주소(하나의 키에서 서로 연결 불가능한 결제 주소 여러 개 생성), 감사 전용 접근을 위한 viewing key, 증명 생성과 서명의 분리.
- 매개변수는 2단계 다자간 세리머니(Powers of Tau + Sapling MPC)에서 생성되었습니다. 참가자 중 단 한 명이라도 정직했다면 보안은 유지됩니다.

## 시각적 비유

Sprout는 모든 편지를 손으로 들고 전국을 가로질러 배달하는 프라이버시 보호 배달원이었습니다. 프라이버시는 완벽했지만 느리고 고된 방식이었습니다. Sapling는 같은 배달원을 가벼운 배낭을 멘 자전거 배달원으로 바꾸었습니다. 프라이버시는 그대로 유지하면서 일상적인 배달에 충분히 빠르게 만든 것입니다. 새로운 viewing key는 화물을 여는 열쇠를 넘기지 않고도 감사 담당자에게 배달원의 장부를 들여다볼 수 있는 투명한 창을 내주는 것과 같습니다.


## 달라진 점

Sapling의 핵심은 거래정보 보호 거래의 프라이버시를 지켜 주는 영지식 증명을 더 빠르게 생성하는 방법입니다. 기존 Sprout 설계는 느리고 메모리를 많이 사용하는 단일 증명 회로(JoinSplit 회로)를 사용했습니다. Sapling는 이를 Zcash 프로토콜 사양에 설명된 목적별 회로 2개, 즉 Spend 회로와 Output 회로로 대체했습니다. 그 결과 비용이 크게 줄었습니다. Electric Coin Company에 따르면 거래정보 보호 거래는 약 40메가바이트의 메모리를 사용해 몇 초 만에 생성할 수 있습니다. 이전 Sapling의 Sprout 기준 성능은 훨씬 무거워 몇 분과 수 기가바이트의 메모리가 필요했습니다(이 Sprout 측 수치는 널리 인용되는 대략적인 기준입니다).

![Sprout versus Sapling shielded transaction cost](/content-images/sapling-before-after-a045b0b48f.webp)

## 새로운 키

Sapling는 새로운 거래정보 보호 주소와 키도 도입했습니다. 하나의 키로 다변화 주소를 여러 개 생성할 수 있습니다. 다변화 주소는 각각 별개의 결제 주소이며, 외부 관찰자가 서로 연결할 수 없습니다. Sapling는 viewing key도 추가했습니다. 전체 viewing key 또는 수신 viewing key를 사용하면 자금을 사용할 권한은 넘기지 않고 지갑의 거래 세부 정보를 볼 수 있는 권한만 공유할 수 있습니다. 이는 감사나 회계 처리, 또는 단순히 결제가 이루어졌음을 증명할 때 유용합니다.

또 다른 관련 변화는 Sapling가 증명 생성 작업과 거래 서명 작업을 분리한 것입니다. 영지식 증명을 생성하는 장치가 더 이상 자금 사용 권한을 보유한 장치일 필요가 없습니다. 이렇게 분리했기 때문에 하드웨어 지갑은 spending key를 격리된 상태로 보관하고, 별도의 장치에서 더 많은 연산이 필요한 증명 작업을 수행할 수 있습니다.

![Proving device hands the proof to a separate signing device](/content-images/sapling-decoupled-spend-6fceca13a2.webp)

## 트러스트 셋업

Sapling의 회로는 신중하게 생성해야 하는 공개 매개변수 집합에 의존합니다. 한 당사자가 혼자 매개변수를 생성하고 남은 비밀 데이터(“독성 폐기물”)를 보관했다면, 그 당사자는 증명을 위조할 수 있었을 것입니다. 이를 방지하기 위해 매개변수는 2단계 다자간 세리머니를 통해 생성되었습니다. 1단계인 Powers of Tau는 회로에 종속되지 않았으므로 Sapling의 특정 회로와 연결되지 않았습니다. 2단계인 Sapling MPC는 특정 회로에 맞춰 진행되었습니다. 각 단계는 참가자 중 적어도 한 명이 정직하게 행동하고 독성 폐기물을 파기하면 안전하게 유지됩니다. 따라서 세리머니는 모든 참가자가 공모하는 경우에만 실패합니다.

## 활성화 과정

Sapling는 네트워크의 업그레이드 메커니즘을 준비한 2018년 6월 업그레이드인 Overwinter를 따랐습니다. Electric Coin Company는 2018년 8월에 출시된 zcashd 2.0.0에서 메인넷 활성화 높이를 설정했으며, 블록 419,200이 채굴되었을 때 네트워크가 Sapling 규칙으로 전환되었습니다. 온체인에서 이 시점은 Sapling 합의 분기 ID로 표시됩니다.

![Timeline from Zcash launch to Sapling activation](/content-images/sapling-timeline-6cad184c30.webp)

## 흔히 하는 오해

- **거래정보 보호 결제를 처음부터 사용할 수 있었다고 생각하는 경우.** Sapling 이전에는 증명 생성에 몇 분과 수 기가바이트의 메모리가 필요했기 때문에 대부분의 사용자와 거래소, 상점은 거래정보 보호 거래를 아예 사용하지 않았습니다.
- **Sapling의 주소와 Sprout의 주소가 같다고 생각하는 경우.** Sapling는 자체 주소 및 키 유형(다변화 주소와 viewing key 포함)을 도입했습니다. Sprout 키는 Sapling 주소와 호환되지 않습니다.
- **트러스트 셋업이 “한 회사의 비밀”이었다고 생각하는 경우.** 다자간 세리머니였습니다. 모든 참가자가 공모해야만 증명을 위조할 수 있었습니다.
- **Sapling가 발행량이나 잔액을 바꿨다고 생각하는 경우.** 바뀐 것은 거래정보 보호 거래를 구성하는 방식뿐이며, 어떤 ZEC 금액도 영향을 받지 않았습니다.
- **증명 생성과 서명을 같은 장치에서 해야 한다고 생각하는 경우.** Sapling에서 이 작업을 분리한 덕분에 하드웨어 지갑은 spending key를 격리된 상태로 보관하고 다른 장치에서 증명을 생성할 수 있습니다.


## 용어집

| 용어 | 쉬운 설명 |
|---|---|
| Shielded transaction | 송신자, 수신자, 금액을 숨기는 프라이빗 Zcash 거래입니다. |
| Sprout | Zcash가 출시 당시 사용한 기존 거래정보 보호 프로토콜로, Sapling보다 느리고 처리 부담이 큽니다. |
| Spend and Output circuits | Sprout의 단일 JoinSplit 회로를 대체한 새로운 Sapling 증명 회로 2개입니다. |
| Diversified address | 하나의 키에서 생성할 수 있는 서로 연결 불가능한 여러 결제 주소 중 하나입니다. |
| Viewing Key | 지갑의 거래를 볼 수 있지만 자금을 사용할 수는 없는 키입니다. |
| Consensus branch id | 거래가 어떤 업그레이드의 규칙을 따르는지 네트워크에 알려 주는 짧은 코드입니다. |

## 자주 묻는 질문

Sapling는 제가 보유한 ZEC의 양을 바꿨나요? 아니요. Sapling는 거래정보 보호 거래를 구성하는 방식을 바꿨을 뿐, 누군가가 보유한 ZEC의 양이나 전체 공급량은 바꾸지 않았습니다. 잔액은 영향을 받지 않았습니다.

Sapling 이후에도 제 ZEC는 여전히 프라이빗한가요? 네, 사용하기는 더 편리해졌습니다. Sapling는 거래정보 보호 거래의 강력한 프라이버시를 유지하면서 실제로 사용할 수 있을 만큼 빠르고 저렴하게 만들었습니다. 거래정보 보호 자금은 이전과 같은 방식으로 계속 숨겨집니다.

제가 해야 할 일이 있나요? 보유자라면 아무 조치도 취할 필요가 없습니다. Sapling는 지갑과 노드 소프트웨어가 적용한 네트워크 업그레이드였습니다. 최신 지갑은 이미 Sapling 주소를 지원합니다.

Sprout와 Sapling의 차이는 무엇인가요? Sprout는 최초의 거래정보 보호 프로토콜로, 느리고 메모리를 많이 사용하는 증명 회로 하나를 사용했습니다. Sapling는 이를 더 빠른 Spend 및 Output 회로로 대체하고 viewing key와 다변화 주소를 추가했으며, 거래정보 보호 거래를 휴대전화와 하드웨어 지갑에서도 사용할 수 있을 만큼 가볍게 만들었습니다.

어떤 자료에서는 10월 28일이라고 하고 다른 자료에서는 10월 29일이라고 하는 이유는 무엇인가요? 활성화 높이는 2018년 10월 28일을 목표로 사전에 설정되었습니다. 실제로 변경을 촉발한 블록 419,200은 UTC 기준 10월 29일 이른 시간에 채굴되었습니다. 여러 현지 시간대에서는 여전히 10월 28일이었습니다. 어느 날짜를 기준으로 하든 같은 블록, 같은 시점을 가리킵니다.

Viewing key란 무엇인가요? Viewing key를 사용하면 거래정보 보호 지갑에 대한 읽기 권한을 공유할 수 있습니다. 전체 viewing key 또는 수신 viewing key를 가진 사람은 지갑의 거래 세부 정보를 볼 수 있지만 자금을 사용할 수는 없습니다. 자세한 내용은 [Viewing Keys](../zcash-tech/viewing-keys)를 참조하세요.

## 이해도 확인

Sprout에서는 왜 많은 사람이 거래정보 보호 거래를 피했으며, Sapling는 어떻게 이 문제를 해결했나요?

<details>
<summary>정답</summary>
Sprout에서는 거래정보 보호 거래를 생성하는 데 몇 분이 걸리고 수 기가바이트의 메모리가 사용되어 대부분의 사용자와 거래소, 상점에 너무 느리고 부담스러웠습니다. Sapling는 더 빠른 Spend 및 Output 회로를 도입해 처리 시간을 몇 초로, 메모리 사용량을 약 40메가바이트로 줄였습니다. 덕분에 일상에서 사용하는 휴대전화와 하드웨어 지갑에서도 거래정보 보호 거래를 실용적으로 이용할 수 있게 되었습니다.
</details>

### 참고 자료

- [ZIP 205: Sapling 네트워크 업그레이드 배포](https://zips.z.cash/zip-0205)
- [ZIP 243: Sapling](https://zips.z.cash/zip-0243) 거래 서명 검증
- [Zcash Sapling 업그레이드 페이지](https://z.cash/upgrade/sapling/)
- [Electric Coin Company: Sapling 발표](https://electriccoin.co/blog/sapling/)
- [Electric Coin Company: Sapling MPC 발표](https://electriccoin.co/blog/sapling-mpc/)

### 함께 보기

- [거래정보 보호 구역](../using-zcash/shielded-pools)
- [Viewing Keys](../zcash-tech/viewing-keys)
- [zk-SNARKs](../zcash-tech/zk-snarks)
- [Zcash 네트워크 업그레이드](../start-here/network-upgrades)
- [지갑](../using-zcash/wallets)
- [Electric Coin Company](../zcash-organizations/electric-coin-company)

---

## 관련 페이지

- [Viewing Keys](./Viewing_Keys.md) — Sapling가 도입한 감사 공유 기능
- [Sprout](./Sprout.md) — Sapling가 대체한 기존 거래정보 보호 프로토콜
- [Blossom](./Blossom.md) — 시리즈의 다음 업그레이드(블록 시점 관련, 암호 기술 변경 아님)
- [zk_SNARKS](./zk_SNARKS.md) — 회로의 기반이 되는 영지식 기술


시리즈: [네트워크 업그레이드 색인](../start-here/network-upgrades) · 이전: [Overwinter](../zcash-tech/overwinter) · 다음: [Blossom](../zcash-tech/blossom)
