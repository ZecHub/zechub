<a href="https://github.com/ZecHub/zechub/edit/main/site/Privacy_Tools/Nym_Zcash_Anonymity.md" target="_blank">
  <img src="https://img.shields.io/badge/Edit-blue" alt="Edit Page"/>
</a>

# Nym 믹스넷 익명성: Zcash

> 마지막 확인: 2026년 10월 18일

Zcash 거래정보 보호 구역은 온체인에서 금액, 송신자, 수신자를 숨깁니다. 하지만 지갑과 라이트월렛 서버 사이의 네트워크 경로는 숨기지 않습니다. Nym의 믹스넷(mixnet)은 이 빠진 네트워크 계층 보호 기능을 더합니다. 2026년 10월 현재 이 기능은 운영 중인 지갑에 적용되어 있습니다(Zingo, Zkool).

출처: [How Nym adds anonymity to Zcash wallets](https://nym.com/blog/zcash-mixnet-anonymity) (Nym, 2026년 10월 13일).

## 보호되는 정보

Nym는 거래 패킷(일반적으로 7–15 KB의 지출 데이터와 ZK 증명)을 Sphinx 패킷으로 나누고 믹스넷을 통해 전달합니다. 이를 통해 다음과 같은 효과를 얻습니다.

- 라이트월렛 서버에 송신자의 IP 주소가 노출되지 않습니다
- 트래픽이 다른 Nym 트래픽과 섞입니다
- 기본 설정에서 약 17비트의 엔트로피를 제공하며, 인용된 익명성 집합의 규모는 100,000명이 넘습니다

Zingo v7의 결제와 가격 요청은 기본적으로 이 경로를 따릅니다.

## 보호되지 않는 정보

체인 동기화, nullifier 조회, 거래 가져오기, 멤풀 트래픽은 현재 일반 인덱서 연결을 사용합니다. 혼합 패킷에 포함되지 않는 기기 수준 또는 애플리케이션 수준 메타데이터도 Nym의 보호 범위에 포함되지 않습니다.

위협 모델상 동기화 트래픽을 숨겨야 한다면, 네이티브 믹스넷 지갑과 시스템 수준의 NymVPN을 함께 사용하세요. [Nym VPN](/guides/nym-vpn)을 참조하세요.

## 지갑

| 지갑 | 상태 | 참고 |
| --- | --- | --- |
| Zingo v7 | 운영 중, 기본값 | `makers run-cli`에 `nym-proxy`이 포함되어 있습니다. 세션은 오프라인 상태에서 시작되며, `--online`, `--remember-online` 또는 `--server`에서 동의하면 활성화됩니다. |
| Zkool | 운영 중 | 네이티브 믹스넷 통합 기능을 제공합니다. |
| 기타 | NymVPN 사용 | 시스템 수준의 믹스넷 모드를 통해 지갑 트래픽을 전달합니다. |

지갑 수준 경로의 설정 방법은 [Route Zcash Wallet Traffic Over the Nym Mixnet](/guides/nym-mixnet-wallet-setup)에서 확인할 수 있습니다.

## 장단점

Nym을 통해 전달되는 브로드캐스트는 클리어넷(clearnet)보다 약 12.5배 느립니다(약 3.4초). Tor는 더 빠르지만(약 3.7배), 혼합 기능이 없는 FIFO 스트림을 사용하므로 전역 감시자는 여전히 트래픽을 연관 지을 수 있습니다. 공유 Nym 사용자 기반을 키우는 편이 지연을 추가하는 것보다 익명성을 더 효과적으로 높입니다.

## 애플리케이션 계층 위생: nym-swizzle-zcash

네트워크 계층 보호만으로는 충분하지 않습니다. 완벽한 믹스넷이나 VPN을 사용하더라도 라이트월렛 서버는 애플리케이션 계층의 패턴을 관찰하여 세션을 연결할 수 있습니다.

- 재개 지점 연결: 클라이언트는 정확히 `previous end + 1`부터 동기화를 재개하므로, 서버는 블록 높이만으로 세션을 연결할 수 있습니다.
- 동기화 후 전송: 지갑은 브로드캐스트 직전에 동기화하므로, 서버가 거래를 직전 동기화 세션과 연결할 수 있습니다.

[`nym-swizzle-zcash`](https://nym.com/docs/developers/swizzle/zcash) 크레이트는 이 두 가지 문제를 해결하는 Zcash 전용 위생 정책을 구현합니다. 일반적인 `nym-swizzle` 기본 요소를 라이트 클라이언트용 체인 인식 정책으로 묶습니다.

**양자화된 동기화 범위.** 요청 범위를 하루 단위 셀로 구성된 네트워크 전체 공통 격자에 맞춰 넓힙니다. 시작점은 아래로 내리고 끝점은 위로 올립니다. 범위는 결정론적이고 오름차순이며 서로 겹치지 않습니다. 재구성 검사는 넓혀진 범위 안에서 수행되므로 정확한 재개 지점이 드러나지 않습니다. 익명성은 노이즈가 아니라 충돌, 즉 여러 지갑이 같은 경계값을 내보내는 데서 생깁니다.

**분리된 브로드캐스트.** 거래 전송은 ZIP 318의 전송 일정에 맞춰 지수 분포에 따라 지연됩니다(평균 144블록 ≈ 3시간, 최대 576블록 ≈ 12시간). 지연 시간이 일반적인 프로세스 수명보다 길기 때문에 일정은 영구 저장됩니다. 거래는 전송 시점에 최신 팁을 기준으로 생성됩니다. 동기화와 브로드캐스트에는 서로 다른 서버를 사용해야 합니다.

이 크레이트는 `BlockSource` 및 `TxBroadcaster` 트레이트를 제공하고, `wasm32-unknown-unknown`용으로 컴파일되며, 자체 네트워크 스택은 없습니다. 전체 API와 예제는 [Nym 문서](https://nym.com/docs/developers/swizzle/zcash)를 참조하세요.

## 출처

- [How Nym adds anonymity to Zcash wallets](https://nym.com/blog/zcash-mixnet-anonymity) — Nym, 2026년 10월 13일
- [nym-swizzle-zcash: Hygiene Policy for Zcash Light Clients](https://nym.com/docs/developers/swizzle/zcash) — Nym 문서
- [Zingo + Nym](https://zingolabs.org/zingo/blog/zingo-nym/) — Zingo Labs
- [Route Zcash Wallet Traffic Over the Nym Mixnet](/guides/nym-mixnet-wallet-setup) — ZecHub
- [Nym VPN](/guides/nym-vpn) — ZecHub
