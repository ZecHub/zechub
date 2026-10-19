<a href="https://github.com/ZecHub/zechub/edit/main/site/Privacy_Tools/Nym_Zcash_Anonymity.md" target="_blank">
  <img src="https://img.shields.io/badge/Edit-blue" alt="페이지 편집"/>
</a>

# Nym Mixnet: Zcash를 위한 익명성

> 최종 확인: 2026년 10월 18일

Zcash shielded pool은 온체인에서 금액, 송신자, 수신자를 숨깁니다. 하지만 지갑과 lightwallet 서버 사이의 네트워크 경로는 숨기지 않습니다. Nym의 mixnet은 이처럼 빠진 네트워크 계층 보호 기능을 추가합니다. 2026년 10월 기준으로 이 통합은 프로덕션 지갑(Zingo, Zkool)에서 활성화되어 있습니다.

출처: [Nym가 Zcash 지갑에 익명성을 추가하는 방법](https://nym.com/blog/zcash-mixnet-anonymity) (Nym, 2026년 10월 13일).

## 보호되는 항목

Nym는 거래 패킷(일반적으로 7~15KB의 지출 데이터와 ZK 증명)을 Sphinx 패킷으로 분할하고 mixnet을 통해 라우팅합니다. 이를 통해 다음이 가능합니다.

- lightwallet 서버에서 송신자의 IP를 숨김
- 트래픽을 다른 Nym 트래픽과 혼합
- 기본 설정에서 약 17비트의 엔트로피를 제공하며, 인용된 익명성 집합은 100,000명 이상의 사용자로 추정됨

Zingo v7의 결제 및 가격 요청은 기본적으로 이 경로를 따릅니다.

## 보호되지 않는 항목

체인 동기화, nullifier 쿼리, 거래 가져오기 및 mempool 트래픽은 현재 일반 indexer 연결을 사용합니다. 혼합된 패킷 외부의 기기 수준 또는 애플리케이션 수준 메타데이터도 Nym의 범위 밖에 있습니다.

위협 모델상 동기화 트래픽을 숨겨야 한다면, 네이티브 mixnet 지갑과 시스템 수준의 NymVPN를 함께 사용하세요. [Nym VPN](/guides/nym-vpn)을 참조하세요.

## 지갑

| 지갑 | 상태 | 참고 |
| --- | --- | --- |
| Zingo v7 | 활성화, 기본값 | `makers run-cli`는 `nym-proxy`를 번들로 제공합니다. 세션은 오프라인으로 시작하며, `--online`, `--remember-online` 또는 `--server`가 동의를 부여합니다. |
| Zkool | 활성화 | 네이티브 mixnet 통합. |
| 기타 | NymVPN를 통해 | 시스템 수준 Mixnet 모드를 통해 지갑을 라우팅합니다. |

지갑 수준 경로의 설정 세부 정보는 [Zcash 지갑 트래픽을 Nym Mixnet으로 라우팅하기](/guides/nym-mixnet-wallet-setup)에 있습니다.

## 절충점

Nym로 라우팅된 브로드캐스트는 일반 인터넷 연결(~3.4초)보다 약 12.5배 느립니다. Tor는 더 빠르지만(~3.7배) 혼합 없이 FIFO 스트림을 사용하므로 글로벌 공격자는 여전히 상관관계를 파악할 수 있습니다. 추가 지연을 늘리는 것보다 공유 Nym 사용자 기반을 확대하는 편이 익명성을 더 효과적으로 높입니다.

## 애플리케이션 계층 위생: nym-swizzle-zcash

네트워크 계층 보호만으로는 충분하지 않습니다. 완벽한 mixnet 또는 VPN을 사용하더라도 lightwallet 서버는 애플리케이션 계층 패턴을 관찰하여 세션을 연결할 수 있습니다.

- 재개 지점 연결: 클라이언트는 정확히 `previous end + 1`에서 동기화를 재개하므로, 서버는 블록 높이만으로 세션을 연결할 수 있습니다.
- 동기화 후 전송: 지갑은 브로드캐스트 직전에 즉시 동기화하므로 서버가 거래를 이전 동기화 세션에 귀속시킬 수 있습니다.

[`nym-swizzle-zcash`](https://nym.com/docs/developers/swizzle/zcash) crate는 두 문제를 모두 해결하는 Zcash 전용 위생 정책을 구현합니다. 일반적인 `nym-swizzle` 기본 요소를 light client를 위한 체인 인식 정책으로 패키징합니다.

**양자화된 동기화 범위.** 요청은 하루 크기의 셀을 가진 네트워크 전체 그리드로 확장됩니다. 시작점은 내림 처리되고 종료점은 올림 처리됩니다. 범위는 결정론적이며 오름차순이고 서로 겹치지 않습니다. reorg 검사는 확장된 범위 내에 유지되므로 정확한 재개 지점이 드러나지 않습니다. 익명성은 노이즈가 아니라 충돌(많은 지갑이 동일한 경계를 내보내는 것)에서 나옵니다.

**분리된 브로드캐스트.** 거래 전송은 ZIP 318 전송 스케줄링에 맞춘 지수 분포(평균 144블록 ≈ 3시간, 상한 576블록 ≈ 12시간)만큼 지연됩니다. 지연 시간은 일반적인 프로세스 수명보다 길기 때문에 일정이 영속적으로 저장됩니다. 거래는 새 tip을 기준으로 실행 시점에만 생성됩니다. 동기화와 브로드캐스트는 서로 다른 서버를 사용해야 합니다.

이 crate는 `BlockSource` 및 `TxBroadcaster` trait를 노출하고, `wasm32-unknown-unknown`용으로 컴파일되며 자체 네트워크 스택은 없습니다. 전체 API 및 예시는 [Nym 문서](https://nym.com/docs/developers/swizzle/zcash)를 참조하세요.

## 출처

- [Nym가 Zcash 지갑에 익명성을 추가하는 방법](https://nym.com/blog/zcash-mixnet-anonymity) — Nym, 2026년 10월 13일
- [nym-swizzle-zcash: Zcash Light Client를 위한 위생 정책](https://nym.com/docs/developers/swizzle/zcash) — Nym 문서
- [Zingo + Nym](https://zingolabs.org/zingo/blog/zingo-nym/) — Zingo Labs
- [Zcash 지갑 트래픽을 Nym Mixnet으로 라우팅하기](/guides/nym-mixnet-wallet-setup) — ZecHub
- [Nym VPN](/guides/nym-vpn) — ZecHub
