<a href="https://github.com/zechub/zechub/edit/main/site/Zcash_Tech/Sapling.md" target="_blank">
  <img src="https://img.shields.io/badge/Edit-blue" alt="페이지 편집"/>
</a>

# Sapling

> Sapling은 블록 419,200(2018년 10월 29일 02:15 UTC)에서 Zcash 메인넷에 적용되었습니다.

핵심 요약: Sapling은 비공개 Zcash 결제를 휴대폰이나 하드웨어 지갑에서도 실행할 수 있을 만큼 빠르고 가볍게 만들었습니다.

Sapling은 Zcash 네트워크의 두 번째 주요 업그레이드로, Zcash 출시 2주년에 활성화되었습니다. 이는 실드된(비공개) 트랜잭션이 구성되는 방식을 다시 설계한 합의 하드포크였습니다. 배포는 ZIP 205에 정의되어 있고, 새로운 트랜잭션 서명 규칙은 ZIP 243에 정의되어 있으며, 두 내용 모두 네트워크 업그레이드 메커니즘인 ZIP 200을 기반으로 합니다. 전체 세부 사항은 Zcash Protocol Specification에 담겨 있습니다. Electric Coin Company는 이 업그레이드를 개발했고, 이를 지원하는 첫 버전인 zcashd 2.0.0을 2018년 8월에 출시했습니다. 체인 상에서 네트워크는 Sapling 규칙을 해당 합의 브랜치 id로 식별합니다.

이것이 중요한 이유. Sapling 이전에는 진정한 비공개 결제를 하려면 증명을 생성하는 동안 컴퓨터가 수 기가바이트의 메모리를 사용하며 몇 분 동안 처리하길 기다려야 했습니다. 이는 대부분의 사람들에게 너무 느리고 무거웠기 때문에, 많은 사용자, 거래소, 상점은 실드된 트랜잭션을 건너뛰고 대신 ZEC를 공개 상태로 전송했습니다. Sapling은 이 작업을 몇 초와 약 40메가바이트의 메모리 수준으로 줄였습니다. 이 한 가지 변화가 바로 일상생활에서, 일반적인 휴대폰과 하드웨어 지갑에서 실드된 ZEC를 실용적으로 사용할 수 있게 만든 핵심입니다.

## 무엇이 바뀌었나

Sapling의 핵심은 실드된 트랜잭션의 프라이버시를 유지하는 영지식 증명을 더 빠르게 생성하는 방식입니다. 기존 Sprout 설계는 느리고 메모리 소모가 큰 단일 증명 회로(JoinSplit 회로)를 사용했습니다. Sapling은 이를 Zcash Protocol Specification에 설명된 두 개의 목적별 회로, 즉 Spend 회로와 Output 회로로 대체했습니다. 그 결과 비용이 크게 감소했습니다. Electric Coin Company에 따르면 실드된 트랜잭션은 약 40메가바이트의 메모리로 빠르면 몇 초 만에 생성할 수 있습니다. Sapling 이전의 Sprout 기준선은 훨씬 더 무거워서, 대략 몇 분과 수 기가바이트의 메모리가 필요했습니다(이 Sprout 측 수치는 널리 인용되는 대략적 기준선입니다).

![Sprout와 Sapling 실드된 트랜잭션 비용 비교](https://raw.githubusercontent.com/ZecHub/zechub/main/site/Zcash_Tech/assets/sapling-before-after.png)

## 새로운 키

Sapling은 또한 새로운 실드된 주소와 키 집합을 도입했습니다. 하나의 키로 여러 개의 다양화된 주소(diversified address)를 파생할 수 있는데, 이는 외부 관찰자가 서로를 연결 지을 수 없는 별개의 결제 주소입니다. Sapling은 viewing key도 추가했습니다. 전체 viewing key 또는 incoming viewing key를 사용하면 자금 지출 권한을 넘기지 않고도 지갑의 트랜잭션 세부 정보를 볼 수 있는 권한을 공유할 수 있습니다. 이는 감사, 회계, 또는 단순히 결제가 이루어졌음을 증명하는 데 유용합니다.

이와 관련된 변화로, Sapling은 증명을 생성하는 작업과 트랜잭션에 서명하는 작업을 분리했습니다. 영지식 증명을 생성하는 장치가 더 이상 지출 권한을 보유한 장치일 필요가 없습니다. 이러한 분리는 별도의 장치가 더 무거운 증명 생성 작업을 수행하는 동안, 하드웨어 지갑이 사용자의 spending key를 격리된 상태로 유지할 수 있게 해줍니다.

![증명 생성 장치가 별도의 서명 장치에 증명을 전달하는 모습](https://raw.githubusercontent.com/ZecHub/zechub/main/site/Zcash_Tech/assets/sapling-decoupled-spend.png)

## 신뢰 설정

Sapling의 회로는 신중하게 생성되어야 했던 공개 파라미터 집합에 의존합니다. 만약 단일 주체가 이를 혼자 생성하고 남은 비밀 데이터("toxic waste")를 보관했다면, 그 주체는 위조된 증명을 만들 수 있었을 것입니다. 이를 방지하기 위해 이 파라미터는 2단계 다자간 세리머니를 통해 생성되었습니다. 1단계인 Powers of Tau는 회로 비종속적이어서 Sapling의 특정 회로에 묶여 있지 않았습니다. 2단계인 Sapling MPC는 회로 종속적이었습니다. 각 단계는 적어도 한 명의 참여자가 정직했고 자신의 toxic waste를 파기했다면 안전하게 유지되므로, 이 세리머니는 모든 참여자가 하나도 빠짐없이 공모할 때에만 실패합니다.

## 어떻게 활성화되었나

Sapling은 2018년 6월 업그레이드인 Overwinter를 뒤따랐으며, Overwinter는 네트워크의 업그레이드 메커니즘을 준비했습니다. Electric Coin Company는 2018년 8월 출시된 zcashd 2.0.0에 메인넷 활성화 높이를 설정했고, 블록 419,200이 채굴되었을 때 네트워크는 Sapling 규칙으로 전환되었습니다. 체인 상에서는 그 순간이 Sapling 합의 브랜치 id로 표시됩니다.

![Zcash 출시부터 Sapling 활성화까지의 타임라인](https://raw.githubusercontent.com/ZecHub/zechub/main/site/Zcash_Tech/assets/sapling-timeline.png)

## 용어집

| 용어 | 쉬운 의미 |
|---|---|
| Shielded transaction | 발신자, 수신자, 금액을 숨기는 비공개 Zcash 트랜잭션입니다. |
| Sprout | Zcash가 처음 출시할 때 사용한 최초의 실드된 프로토콜로, Sapling보다 느리고 무거웠습니다. |
| Spend and Output circuits | Sprout의 단일 JoinSplit 회로를 대체한 Sapling의 두 가지 새로운 증명 회로입니다. |
| Diversified address | 하나의 키에서 파생할 수 있는, 서로 연결되지 않는 여러 결제 주소 중 하나입니다. |
| Viewing key | 누군가가 지갑의 트랜잭션을 볼 수 있게 하되, 그 지갑에서 자금을 지출할 수는 없게 하는 키입니다. |
| Consensus branch id | 트랜잭션이 어떤 업그레이드 규칙을 따르는지 네트워크에 알려주는 짧은 코드입니다. |

## FAQ

Sapling이 내가 보유한 ZEC의 양을 바꾸었나요? 아니요. Sapling은 실드된 트랜잭션이 구성되는 방식을 바꿨을 뿐, 누가 얼마나 많은 ZEC를 보유하는지 또는 총공급량은 바꾸지 않았습니다. 당신의 잔액은 영향을 받지 않았습니다.

Sapling 이후에도 내 ZEC는 여전히 비공개인가요? 네, 그리고 더 실용적입니다. Sapling은 실드된 트랜잭션의 강력한 프라이버시를 유지하면서, 실제로 사용할 수 있을 만큼 빠르고 저렴하게 만들었습니다. 실드된 자금은 동일한 방식으로 계속 숨겨집니다.

내가 따로 해야 할 일이 있나요? 보유자로서 별도의 조치는 필요하지 않습니다. Sapling은 지갑과 노드 소프트웨어가 채택한 네트워크 업그레이드였습니다. 최신 지갑은 이미 Sapling 주소를 지원합니다.

Sprout와 Sapling의 차이는 무엇인가요? Sprout는 최초의 실드된 프로토콜이었고, 느리고 메모리 사용량이 큰 단일 증명 회로를 사용했습니다. Sapling은 이를 더 빠른 Spend 및 Output 회로로 대체하고, viewing key와 diversified address를 추가했으며, 실드된 트랜잭션을 휴대폰과 하드웨어 지갑에서도 사용할 수 있을 만큼 가볍게 만들었습니다.

왜 어떤 자료는 10월 28일이라고 하고 다른 자료는 10월 29일이라고 하나요? 활성화 높이는 2018년 10월 28일을 목표로 미리 설정되어 있었습니다. 하지만 실제로 변화를 일으킨 블록인 419,200번 블록은 UTC 기준 10월 29일 새벽에 채굴되었습니다. 많은 지역 시간대에서는 여전히 10월 28일이었습니다. 어느 쪽이든 같은 블록이고 같은 순간입니다.

viewing key란 무엇인가요? viewing key를 사용하면 실드된 지갑에 대한 읽기 접근 권한을 공유할 수 있습니다. 전체 viewing key 또는 incoming viewing key를 가진 사람은 지갑의 트랜잭션 세부 정보를 볼 수 있지만, 자금을 지출할 수는 없습니다. 자세한 내용은 [Viewing Keys](../zcash-tech/viewing-keys)를 참조하세요.

## 이해도 확인

Sprout에서는 왜 इतने 많은 사람들이 실드된 트랜잭션을 피했으며, Sapling은 이를 어떻게 해결했나요?

<details>
<summary>정답</summary>
Sprout에서는 실드된 트랜잭션을 생성하는 데 몇 분이 걸리고 수 기가바이트의 메모리가 필요했기 때문에, 대부분의 사용자, 거래소, 상점에게 너무 느리고 무거웠습니다. Sapling은 더 빠른 Spend 및 Output 회로를 도입해 이 작업을 몇 초와 약 40메가바이트 수준으로 줄였고, 그 결과 실드된 트랜잭션을 일상적인 휴대폰과 하드웨어 지갑에서 실용적으로 사용할 수 있게 만들었습니다.
</details>

### 자료

- [ZIP 205: Sapling Network Upgrade 배포](https://zips.z.cash/zip-0205)
- [ZIP 243: Sapling을 위한 트랜잭션 서명 검증](https://zips.z.cash/zip-0243)
- [Zcash Sapling 업그레이드 페이지](https://z.cash/upgrade/sapling/)
- [Electric Coin Company: Sapling 발표](https://electriccoin.co/blog/sapling/)
- [Electric Coin Company: Sapling MPC 발표](https://electriccoin.co/blog/sapling-mpc/)

### 함께 보기

- [Shielded Pools](../using-zcash/shielded-pools)
- [Viewing Keys](../zcash-tech/viewing-keys)
- [zk-SNARKS](../zcash-tech/zk-snarks)
- [Zcash 네트워크 업그레이드](../start-here/network-upgrades)
- [지갑](../using-zcash/wallets)
- [Electric Coin Company](../zcash-organizations/electric-coin-company)

---

시리즈: [네트워크 업그레이드 색인](../start-here/network-upgrades) · 이전: [Overwinter](../zcash-tech/overwinter) · 다음: [Blossom](../zcash-tech/blossom)
