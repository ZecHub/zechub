<a href="https://github.com/zechub/zechub/edit/main/site/Zcash_Tech/Overwinter.md" target="_blank">
  <img src="https://img.shields.io/badge/Edit-blue" alt="Edit Page"/>
</a>

# Overwinter

> Overwinter은(는) 2018년 6월 26일(UTC), 블록 347,500에서 Zcash 메인넷에 출시되었습니다.

이 페이지에서 알아볼 내용: Zcash이(가) 자체 규칙을 안전하게 변경하는 방법을 어떻게 익혔는지, 그리고 이 기반 작업 덕분에 Sapling을(를) 시작으로 이후의 모든 업그레이드가 어떻게 가능해졌는지 살펴봅니다.

Overwinter은(는) Zcash [네트워크 업그레이드](../start-here/network-upgrades)이며, 네트워크 출시 후 첫 업그레이드입니다. 이 업그레이드는 여러 Zcash 개선 제안에 걸쳐 정의되어 있습니다. [ZIP 200](https://zips.z.cash/zip-0200), [ZIP 201](https://zips.z.cash/zip-0201), [ZIP 202](https://zips.z.cash/zip-0202), [ZIP 203](https://zips.z.cash/zip-0203), 그리고 [ZIP 143](https://zips.z.cash/zip-0143)입니다. Overwinter은(는) 새로운 거래정보 보호 기능을 추가하지 않았습니다. 대신 향후 업그레이드를 안전하게 배포할 수 있도록 프로토콜을 강화했습니다. 이 업그레이드에 관한 문서는 공식 Zcash 업그레이드 페이지의 [Electric Coin Company](../zcash-organizations/electric-coin-company)에 나와 있습니다.

이 업그레이드가 중요한 이유. 가동 중인 블록체인의 규칙을 바꾸는 일은 위험합니다. 잘못 변경하면 네트워크의 두 버전이 서로 다른 판단을 내리거나, 한 체인에서 사용하도록 만들어진 거래를 다른 체인에 복사할 수 있습니다. Overwinter 이전에는 Zcash에 규칙 변경을 조율하는 표준적인 재전송 방지 방법이 없었습니다. Overwinter은(는) 이를 해결했습니다. Zcash에 업그레이드의 공식 절차를 마련했으며, 그만큼 중요한 양방향 재전송 방지도 도입했습니다. 이에 따라 한 규칙 집합에서는 유효한 거래라도 다른 규칙 집합에서 재전송할 수 없습니다. 이 기반 작업 덕분에 Sapling을(를) 비롯한 모든 후속 업그레이드를 문제없이 활성화할 수 있었습니다.

![Before and after Overwinter: before, no standard upgrade path and no replay protection. After, a network upgrade mechanism with two-way replay protection and safe future upgrades](/content-images/overwinter-before-after-acf4f5d283.webp)

## 업그레이드 메커니즘

Overwinter은(는) 네트워크 업그레이드 메커니즘을 도입했으며, 이는 [ZIP 200](https://zips.z.cash/zip-0200)에 정의되어 있습니다. 이제 모든 업그레이드에는 2가지 항목이 정의됩니다. 현재 규칙 집합을 식별하는 합의 브랜치 ID와 새 규칙이 적용되는 블록인 활성화 높이입니다. 이로써 Zcash 소프트웨어를 실행하는 모든 사용자는 전환 전에 업데이트할 수 있는 명확한 기간을 확보합니다.

Overwinter 자체는 메인넷의 블록 347,500에서 활성화되었습니다.

[ZIP 201](https://zips.z.cash/zip-0201)은(는) 업그레이드 전후에 노드가 서로를 어떻게 처리하는지 규정합니다. 활성화 전에는 노드가 같은 버전을 실행하는 피어에 우선 연결됩니다. 활성화 시점에는 노드가 다른 합의 브랜치에 속한 피어와의 연결을 끊습니다. 따라서 네트워크가 혼란을 겪는 대신 새 규칙에 따라 깔끔하게 분기됩니다.

## 재전송 방지

재전송이란 누군가 한 체인에서 유효했던 거래를 다른 체인에 다시 전파하는 것을 말합니다. Overwinter은(는) [ZIP 143](https://zips.z.cash/zip-0143)에 정의된 새로운 서명 방식을 도입해 이를 차단합니다. 지갑이 거래에 서명할 때 이제 서명에는 현재 체인의 합의 브랜치 ID가 포함됩니다. 한 브랜치용으로 서명한 거래는 어느 방향으로든 다른 브랜치에서 유효하지 않습니다. 이것이 양방향 재전송 방지의 의미입니다.

이 기능은 [ZIP 202](https://zips.z.cash/zip-0202)에서 도입된 새로운 버전 3 거래 형식과 함께 작동합니다. 이 형식은 때때로 Overwinter 형식이라고도 합니다. 여기에는 fOverwintered 플래그와 버전 그룹 ID가 추가되어 거래가 어떤 합의 규칙 집합에 속하는지 명확히 표시합니다. 부가적인 이점으로, 새로운 서명 방식은 투명 거래의 검증 속도도 높였습니다.

![How replay protection works: a wallet signs a transaction that commits to the current consensus branch id, so the transaction cannot be replayed on any other branch](/content-images/overwinter-replay-flow-754ec8578a.webp)

## 거래 만료

[ZIP 203](https://zips.z.cash/zip-0203)은(는) 거래 만료 기능을 추가했습니다. 이제 거래에 만료 블록 높이를 설정할 수 있습니다. 해당 높이까지 채굴되지 않으면 노드는 확인되지 않은 거래가 대기하는 공간인 멤풀에서 해당 거래를 제거합니다. 이전에는 거래가 오랫동안 미확인 상태로 남아 있을 수 있었습니다. 만료 기능을 사용하면 정체된 거래가 결국 자동으로 정리되므로 불확실성이 줄고, 멤풀이 오래된 미채굴 거래로 가득 차는 것을 막을 수 있습니다.

## 전체 흐름에서의 위치

Overwinter은(는) 2016년 10월 메인넷 출시 이후 첫 번째 Zcash 네트워크 업그레이드였으며, 의도적으로 Sapling보다 먼저 배포되었습니다. 이 업그레이드의 목적은 기능 추가가 아니라 기반 시설을 마련하는 것이었습니다. 업그레이드 메커니즘과 재전송 방지 장치를 먼저 도입함으로써 이후의 모든 업그레이드(Sapling, Blossom, Heartwood, Canopy, NU5 및 그 이후의 업그레이드)가 안전하게 활성화될 수 있는 경로를 마련했습니다.

![Timeline from the October 2016 Sprout launch, through the 2016 to 2018 stretch with no upgrade framework, to Overwinter in June 2018](/content-images/overwinter-timeline-689d9bcf20.webp)

## 용어집

| 용어 | 쉬운 설명 |
|---|---|
| Network upgrade (NU) | 정해진 블록 높이에서 활성화되는 Zcash의 합의 규칙 변경 |
| Consensus branch id | 현재 합의 규칙 집합을 식별하는 짧은 이름 |
| Activation height | 네트워크 업그레이드의 새 규칙이 적용되는 블록 |
| Replay protection | 한 체인에서 유효한 거래를 다른 체인에서 재사용하지 못하게 하는 규칙 |
| Mempool | 네트워크에 전파되었지만 아직 블록에 채굴되지 않은 거래의 풀 |
| Transaction expiry | 미채굴 거래가 제거되는 기준이 되는 만료 블록 높이 |

## 자주 묻는 질문

Overwinter은(는) 제 ZEC 또는 프라이버시를 바꾸었나요? 아닙니다. Overwinter은(는) 새로운 기능을 추가하지 않았으며 거래정보 보호 거래에도 영향을 주지 않았습니다. 안전한 향후 업그레이드를 위한 기반 작업이었습니다. 보유 자금과 프라이버시에는 아무런 영향이 없었습니다.

Overwinter은(는) Sapling 또는 거래정보 보호 주소를 추가했나요? 아닙니다. Overwinter은(는) 거래정보 보호 기능을 추가하지 않았습니다. Sapling을(를) 나중에 안전하게 활성화할 수 있도록 기반을 마련했습니다.

합의 브랜치 ID란 무엇인가요? 현재 규칙 집합을 식별하는 짧은 이름입니다. 거래는 서명될 때 이 ID를 포함하며, 이 덕분에 Zcash의 재전송 방지가 작동합니다.

어떤 자료에는 6월 25일, 다른 자료에는 6월 26일이라고 되어 있는 이유는 무엇인가요? Overwinter은(는) 2018년 6월 26일 01:37 UTC에 활성화되었습니다. UTC 기준 자정을 조금 지난 시각이므로, 많은 서구 시간대에서는 현지 시각이 아직 6월 25일이었습니다. 같은 블록, 같은 순간을 가리킵니다.

거래 만료는 어떤 점에서 유용한가요? 채굴되지 않은 거래가 영원히 남아 있지 않도록 합니다. 만료 높이가 지나면 노드가 해당 거래를 제거하므로, 정체된 결제가 어떻게 될지 몰라 기다릴 필요가 없습니다.

제가 해야 할 일이 있나요? 없습니다. Overwinter은(는) 2018년에 활성화되었습니다. 현재 사용되는 Zcash 지갑이나 노드는 이미 이 규칙을 따릅니다.

## 이해도 확인

Overwinter은(는) 거래정보 보호 기능을 추가하지 않았습니다. 그렇다면 왜 Zcash 역사상 가장 중요한 업그레이드 중 하나로 여겨질까요?

<details>
<summary>답변</summary>

이후의 모든 업그레이드가 의존하는 기반 장치를 마련했기 때문입니다. Overwinter은(는) 네트워크 업그레이드 메커니즘과 양방향 재전송 방지를 도입해 Zcash이(가) 합의 규칙을 안전하게 변경할 수 있는 표준적인 방법을 제공했습니다. 이러한 기반 작업이 없었다면 Sapling과(와) 그 이후의 업그레이드는 문제없이 활성화될 수 없었을 것입니다.
</details>

### 참고 자료

[ZIP 200: 네트워크 업그레이드 메커니즘](https://zips.z.cash/zip-0200)

[ZIP 201: Overwinter](https://zips.z.cash/zip-0201)의 네트워크 피어 관리

[ZIP 202: Overwinter](https://zips.z.cash/zip-0202)의 버전 3 거래 형식

[ZIP 203: 거래 만료](https://zips.z.cash/zip-0203)

[ZIP 143: Overwinter](https://zips.z.cash/zip-0143)의 거래 서명 검증

[Overwinter 네트워크 업그레이드](https://z.cash/upgrade/overwinter/)

### 관련 항목

[Zcash 네트워크 업그레이드](../start-here/network-upgrades)

[거래정보 보호 구역](../using-zcash/shielded-pools)

[풀 노드](../zcash-tech/full-nodes)

[NU6.1](../zcash-tech/nu6-1)

[Electric Coin Company](../zcash-organizations/electric-coin-company)

[ZEC이란 무엇이며 Zcash](../start-here/what-is-zec-and-zcash)

---

시리즈: [네트워크 업그레이드 색인](../start-here/network-upgrades) · 이전: [Sprout](../zcash-tech/sprout) · 다음: [Sapling](../zcash-tech/sapling)
