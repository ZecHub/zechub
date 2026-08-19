<a href="https://github.com/zechub/zechub/edit/main/site/Zcash_Tech/Overwinter.md" target="_blank">
  <img src="https://img.shields.io/badge/Edit-blue" alt="페이지 편집"/>
</a>

# Overwinter

> Overwinter는 블록 347,500에서 Zcash 메인넷에 적용되었습니다 (2018년 6월 26일 UTC).

이 문서에서 알게 될 내용: Zcash가 어떻게 자신의 규칙을 안전하게 변경하는 방법을 익혔는지, 그리고 그 토대가 Sapling을 시작으로 이후의 모든 업그레이드를 가능하게 만든 이유.

Overwinter는 Zcash [네트워크 업그레이드](../start-here/network-upgrades)이며, 네트워크 출시 이후 첫 번째 업그레이드입니다. 이는 여러 Zcash 개선 제안서에 걸쳐 정의되어 있습니다: [ZIP 200](https://zips.z.cash/zip-0200), [ZIP 201](https://zips.z.cash/zip-0201), [ZIP 202](https://zips.z.cash/zip-0202), [ZIP 203](https://zips.z.cash/zip-0203), 그리고 [ZIP 143](https://zips.z.cash/zip-0143). Overwinter는 새로운 shielded 기능을 추가하지 않았습니다. 대신, 미래의 업그레이드가 안전하게 배포될 수 있도록 프로토콜을 강화했습니다. 이 업그레이드는 공식 Zcash 업그레이드 페이지에서 [Electric Coin Company](../zcash-organizations/electric-coin-company)가 문서화했습니다.

왜 이것이 중요한가. 이미 운영 중인 블록체인의 규칙을 바꾸는 일은 위험합니다. 잘못 처리하면 네트워크의 두 버전이 서로 다른 결론에 도달할 수 있고, 한 체인을 위한 트랜잭션이 다른 체인에 복제될 수도 있습니다. Overwinter 이전에는, Zcash에는 규칙 변경을 조율하는 표준화되고 재생 공격에 안전한 방법이 없었습니다. Overwinter는 이를 해결했습니다. Zcash에 업그레이드를 위한 공식 절차를 제공했고, 그에 못지않게 중요한 양방향 재생 보호도 도입했습니다. 즉, 한 규칙 집합에서 유효한 트랜잭션은 다른 규칙 집합에서 재생될 수 없습니다. 바로 이 기반 덕분에 Sapling과 그 이후의 모든 업그레이드가 깔끔하게 활성화될 수 있었습니다.

![Overwinter 이전과 이후: 이전에는 표준 업그레이드 경로도 재생 보호도 없었습니다. 이후에는 양방향 재생 보호와 안전한 미래 업그레이드를 갖춘 네트워크 업그레이드 메커니즘이 생겼습니다](https://raw.githubusercontent.com/ZecHub/zechub/main/site/Zcash_Tech/assets/overwinter-before-after.png)

## 업그레이드 메커니즘

Overwinter는 [ZIP 200](https://zips.z.cash/zip-0200)에 정의된 네트워크 업그레이드 메커니즘(Network Upgrade Mechanism)을 도입했습니다. 이제 모든 업그레이드는 두 가지를 정의합니다: 현재 규칙 집합을 나타내는 consensus branch id와, 새 규칙이 효력을 갖기 시작하는 블록인 activation height입니다. 이를 통해 Zcash 소프트웨어를 실행하는 모든 사람은 전환 전에 업데이트할 수 있는 분명한 시간을 갖게 됩니다.

Overwinter 자체는 메인넷의 블록 347,500에서 활성화되었습니다.

[ZIP 201](https://zips.z.cash/zip-0201)은 업그레이드 전후에 노드들이 서로를 어떻게 다루는지를 설명합니다. 활성화 전에는 노드들이 같은 버전을 실행하는 피어와 연결되는 것을 선호합니다. 활성화 시점이 되면, 노드는 다른 consensus branch에 있는 피어와의 연결을 끊습니다. 그래서 네트워크는 혼란에 빠지는 대신 새로운 규칙에 따라 깔끔하게 분리됩니다.

## 재생 보호

재생 공격이란 누군가가 한 체인에서 유효했던 트랜잭션을 다른 체인에 다시 브로드캐스트하는 것을 뜻합니다. Overwinter는 [ZIP 143](https://zips.z.cash/zip-0143)에 정의된 새로운 서명 방식으로 이 가능성을 차단합니다. 지갑이 트랜잭션에 서명할 때, 이제 그 서명은 현재 체인의 consensus branch id에도 커밋합니다. 한 branch를 위해 서명된 트랜잭션은 어느 방향으로든 다른 어떤 branch에서도 유효하지 않습니다. 이것이 양방향 재생 보호의 의미입니다.

이 방식은 [ZIP 202](https://zips.z.cash/zip-0202)의 새 버전 3 트랜잭션 형식과 함께 작동합니다. 이 형식은 때때로 Overwintered 형식이라고도 불립니다. 여기에는 `fOverwintered` 플래그와 version group id가 추가되어, 어떤 트랜잭션이 어떤 합의 규칙 집합에 속하는지 명확히 보여줍니다. 부가적인 이점으로, 새 서명 방식은 투명 트랜잭션 검증 속도도 향상시켰습니다.

![재생 보호의 작동 방식: 지갑은 현재 consensus branch id에 커밋하는 트랜잭션에 서명하므로, 그 트랜잭션은 다른 어떤 branch에서도 재생될 수 없습니다](https://raw.githubusercontent.com/ZecHub/zechub/main/site/Zcash_Tech/assets/overwinter-replay-flow.png)

## 트랜잭션 만료

[ZIP 203](https://zips.z.cash/zip-0203)은 트랜잭션 만료를 추가했습니다. 이제 트랜잭션은 만료 블록 높이를 설정할 수 있습니다. 그 높이까지 채굴되지 않으면, 노드들은 이를 미확인 트랜잭션의 대기실인 mempool에서 제거합니다. 이전에는 트랜잭션이 오랫동안 미확인 상태로 머무를 수 있었습니다. 만료 기능은 멈춘 트랜잭션이 결국 스스로 정리되도록 하여 사용자의 불확실성을 줄이고, 오래된 미채굴 트랜잭션으로 mempool이 가득 차는 것을 막아줍니다.

## 어디에 위치하는가

Overwinter는 2016년 10월 메인넷 출시 이후 Zcash의 첫 번째 네트워크 업그레이드였으며, 의도적으로 Sapling보다 앞서 배포되었습니다. 그 역할은 기능이 아니라 인프라였습니다. 먼저 업그레이드 메커니즘과 재생 보호 장치를 설치함으로써, 이후의 모든 업그레이드(Sapling, Blossom, Heartwood, Canopy, NU5, 그리고 그 이후의 것들)가 안전하게 활성화될 수 있는 경로를 제공했습니다.

![2016년 10월 Sprout 출시부터, 업그레이드 프레임워크가 없던 2016년~2018년 구간을 지나, 2018년 6월 Overwinter에 이르는 타임라인](https://raw.githubusercontent.com/ZecHub/zechub/main/site/Zcash_Tech/assets/overwinter-timeline.png)

## 용어집

| 용어 | 쉬운 의미 |
|---|---|
| 네트워크 업그레이드 (NU) | 정해진 블록 높이에서 활성화되는, Zcash의 합의 규칙에 대한 조율된 변경 |
| Consensus branch id | 현재의 합의 규칙 집합을 나타내는 짧은 식별자 |
| Activation height | 네트워크 업그레이드의 새 규칙이 효력을 갖기 시작하는 블록 |
| 재생 보호 | 한 체인에서 유효한 트랜잭션이 다른 체인에서 재사용되는 것을 막는 규칙 |
| Mempool | 브로드캐스트되었지만 아직 블록에 채굴되지 않은 트랜잭션들의 풀 |
| 트랜잭션 만료 | 이 높이를 지나면 채굴되지 않은 트랜잭션이 제거되는 만료 블록 높이 |

## FAQ

Overwinter가 내 ZEC나 프라이버시를 바꿨나요? 아니요. Overwinter는 새로운 기능을 추가하지 않았고 shielded 트랜잭션도 건드리지 않았습니다. 이것은 미래의 안전한 업그레이드를 위한 배관 작업이었습니다. 당신의 자금과 프라이버시는 영향을 받지 않았습니다.

Overwinter가 Sapling이나 shielded 주소를 추가했나요? 아니요. Overwinter는 어떤 shielded 기능도 추가하지 않았습니다. 나중에 Sapling이 안전하게 활성화될 수 있도록 기반을 마련했을 뿐입니다.

Consensus branch id란 무엇인가요? 현재 규칙 집합을 나타내는 짧은 라벨입니다. 트랜잭션은 서명될 때 여기에 커밋하며, 이것이 Zcash에 재생 보호를 제공하는 이유입니다.

어떤 자료는 6월 25일이라고 하고 어떤 자료는 6월 26일이라고 하는 이유는 무엇인가요? Overwinter는 2018년 6월 26일 01:37 UTC에 활성화되었습니다. 이는 UTC 자정을 막 지난 시점이므로, 많은 서반구 시간대에서는 현지 시계상 아직 6월 25일이었습니다. 같은 블록, 같은 순간을 가리키는 것입니다.

트랜잭션 만료는 무엇에 좋은가요? 영원히 채굴되지 않는 트랜잭션이 계속 남아 있지 않게 해줍니다. 만료 높이에 도달하면 노드들이 그것을 제거하므로, 멈춘 결제에 대해 계속 추측하고 있을 필요가 없습니다.

내가 해야 할 일이 있나요? 아니요. Overwinter는 2018년에 활성화되었습니다. 현재의 어떤 Zcash 지갑이나 노드도 이미 이 규칙을 따르고 있습니다.

## 이해도 확인

Overwinter는 새로운 shielded 기능을 추가하지 않았습니다. 그렇다면 왜 Zcash 역사상 가장 중요한 업그레이드 중 하나로 여겨질까요?

<details>
<summary>정답</summary>

이후의 모든 업그레이드가 의존하는 장치를 구축했기 때문입니다. Overwinter는 네트워크 업그레이드 메커니즘과 양방향 재생 보호를 도입하여, Zcash가 합의 규칙을 표준적이고 안전한 방식으로 변경할 수 있게 했습니다. 이 토대가 없었다면 Sapling과 그 이후의 업그레이드는 깔끔하게 활성화될 수 없었을 것입니다.
</details>

### 자료

[ZIP 200: 네트워크 업그레이드 메커니즘](https://zips.z.cash/zip-0200)

[ZIP 201: Overwinter를 위한 네트워크 피어 관리](https://zips.z.cash/zip-0201)

[ZIP 202: Overwinter를 위한 버전 3 트랜잭션 형식](https://zips.z.cash/zip-0202)

[ZIP 203: 트랜잭션 만료](https://zips.z.cash/zip-0203)

[ZIP 143: Overwinter를 위한 트랜잭션 서명 검증](https://zips.z.cash/zip-0143)

[Overwinter 네트워크 업그레이드](https://z.cash/upgrade/overwinter/)

### 함께 보기

[Zcash 네트워크 업그레이드](../start-here/network-upgrades)

[Shielded 풀](../using-zcash/shielded-pools)

[풀 노드](../zcash-tech/full-nodes)

[NU6.1](../zcash-tech/nu6-1)

[Electric Coin Company](../zcash-organizations/electric-coin-company)

[ZEC와 Zcash란 무엇인가](../start-here/what-is-zec-and-zcash)

---

시리즈: [네트워크 업그레이드 색인](../start-here/network-upgrades) · 이전: [Sprout](../zcash-tech/sprout) · 다음: [Sapling](../zcash-tech/sapling)
