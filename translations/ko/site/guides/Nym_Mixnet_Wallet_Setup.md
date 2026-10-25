<a href="https://github.com/zechub/zechub/edit/main/site/guides/Nym_Mixnet_Wallet_Setup.md" target="_blank">
  <img src="https://img.shields.io/badge/Edit-blue" alt="Edihttps://github.com/ZecHub/zechub/pull/2238t 페이지"/>
</a>

# Zcash 지갑 트래픽을 Nym Mixnet을 통해 라우팅하기

> 최종 확인일: 2026년 9월 29일

Zcash 실드 트랜잭션은 온체인 거래 데이터를 보호하지만, 지갑은 여전히 인터넷을 통해 통신합니다. 네트워크 관찰자는 잠재적으로 사용자의 IP 주소, 지갑 연결 시점, 접속하는 인프라와 같은 메타데이터를 파악할 수 있습니다.

Nym는 별도의 네트워크 개인정보 보호 계층을 추가합니다. 2026년 9월 기준으로 가장 적합한 접근 방식은 지갑에 따라 다릅니다.

1. **지갑에 기본 Nym 통합 기능이 있다면 이를 우선 사용하세요.**
2. 그렇지 않다면, 지갑별 프록시 지원에 의존하지 않고 지갑의 네트워크 트래픽이 Nym를 통해 라우팅되도록 **시스템 수준 NymVPN Mixnet 모드**를 사용하세요.

일반적인 VPN 및 dVPN 배경 정보는 [VPN 및 dVPN](./VPN_and_DVPN.md)을 참조하세요.

## Nym가 추가하는 것 — 그리고 추가하지 않는 것

실드 Zcash 결제와 네트워크 개인정보 보호 도구는 서로 다른 문제를 해결합니다.

- **Zcash 실드 풀**은 온체인 거래 세부 정보를 보호합니다.
- **Nym Mixnet 라우팅**은 실제 네트워크 신원과 지갑 트래픽을 수신하는 서비스 간의 연결 가능성을 줄이도록 설계되었습니다.
- 시스템 수준 NymVPN 터널을 통해 접속한 대상은 사용자의 가정/모바일 IP 대신 Nym 출구를 확인해야 합니다.

Nym의 Mixnet은 네트워크 메타데이터 유출을 줄이기 위해 다중 홉, 패킷 혼합, 무작위 지연, 커버 트래픽 및 어니언 암호화를 사용합니다.

Nym는 손상된 기기, 악성 지갑 소프트웨어, 노출된 복구 문구, 거래소 계정을 통해 공개한 신원, 또는 투명 Zcash 활동으로 인한 개인정보 손실을 **보호하지 않습니다**.

## 기본 Nym 지원: 사용 가능하다면 먼저 사용하세요

Nym는 2026년 9월 24일, 자사의 Zcash Community Grant 작업이 완료되었으며 기본 Mixnet 지원이 실제 Zcash 지갑에 제공되고 있다고 발표했습니다.

### Zingo! Wallet

Zingo PC에는 기본 Nym 전송 방식이 포함되어 있습니다. Zingo Mobile 역시 앱 내 Nym 프록시를 사용하여 iOS와 Android에서 Mixnet 모드를 제공합니다.

Zingo가 문서화한 현재 동작:

- Nym 제어 항목은 **설정 → Nym Mixnet**에 있습니다.
- 결제 전송은 Mixnet을 통해 라우팅됩니다.
- Ironwood 마이그레이션 전송은 동일한 보호된 전송 경로를 따릅니다.
- ZEC 가격 요청도 Mixnet을 통해 라우팅됩니다.
- Nym가 활성화된 동안 전송은 페일 클로즈 방식으로 작동합니다. Mixnet 전송을 사용할 수 없으면 결제가 일반 인터넷을 통해 조용히 전송되지 않습니다.
- Zingo PC에서는 **현재 체인 동기화가 Mixnet을 통해 라우팅되지 않습니다**. 컴팩트 블록, 널리파이어 쿼리, 트랜잭션 가져오기, 멤풀 트래픽 및 서버 상태 확인은 여전히 일반 서버 연결을 사용합니다.

이 구분은 중요합니다. Zingo의 기본 통합은 연결 가능성이 가장 높은 브로드캐스트 경로를 보호하지만, 아직 완전한 기기 네트워크 터널은 아닙니다.

위협 모델상 서버로부터 동기화 트래픽도 숨겨야 한다면, 이것이 초래하는 추가 지연 시간과 복잡성을 이해한 뒤 NymVPN와 같은 시스템 수준 개인정보 보호 터널을 추가로 사용하세요.

출처:

- https://github.com/zingolabs/zingo-pc#the-nym-mixnet
- https://github.com/zingolabs/zingo-mobile
- https://nym.com/blog/nym-mixnet-zcash-wallets

### Zkool

Nym는 **Zkool**가 이제 기본 토글을 사용하여 Nym Mixnet을 통해 Zcash RPC 인프라에 연결할 수 있다고 보고합니다.

Zkool는 YWallet의 활발히 유지 관리되는 후속 버전입니다. 이 프로젝트는 Zcash 서버 연결을 위한 Tor 프록싱 및 어니언 서비스도 지원합니다.

문서화되지 않은 프록시 경로로 이전 YWallet 빌드를 강제로 통과시키려 하기보다 Zkool의 기본 Nym 옵션을 우선하세요.

출처:

- https://nym.com/blog/nym-mixnet-zcash-wallets
- https://github.com/hhanh00/zkool2

### Nozy

NozyWallet에도 Nym 인식 전송 경로가 있습니다. 현재 구현은 Nym Mixnet을 통한 발신 트랜잭션 제출 라우팅과 컴팩트 블록 동기화를 위한 별도 Nym dVPN 경로를 지원합니다. 모든 지갑 요청이 자동으로 Mixnet을 사용한다고 가정하지 말고, 이를 별개의 보호 기능으로 취급하세요.

출처:

- https://github.com/LEONINE-DAO/Nozy-wallet
- https://github.com/LEONINE-DAO/Nozy-wallet/blob/master/docs/reference/NYM_SEND_EGRESS_CASE_BREAKDOWN.md
- https://github.com/LEONINE-DAO/Nozy-wallet/blob/master/docs/reference/NYM_DVPN_SYNC_CASE_BREAKDOWN.md

### Zodl

Zodl에는 현재 기본 제공 **Tor Protection**이 있으며, 이는 Zingo, Zkool 및 Nozy에 대해 위에서 설명한 동일한 기본 Nym 통합 기능이 아닙니다.

Zodl의 Tor 기능은 Tor를 통해 트랜잭션 제출, 트랜잭션 데이터 검색, 환율 요청 및 제3자 API 호출을 라우팅할 수 있습니다. Nym는 2026년 9월 24일, 더 폭넓은 Mixnet 통합에 대해 Zodl 팀과 여전히 적극적으로 논의하고 있다고 밝혔습니다.

현재 Zodl에서는 다음 중 하나를 사용하세요.

- Zodl의 문서화된 Tor Protection 또는
- 목표가 지갑의 일반 기기 트래픽을 Nym를 통해 라우팅하는 것이라면 시스템 수준 NymVPN.

둘 다 개인정보 보호 네트워크라는 이유만으로 지갑 내부에서 Tor와 Nym가 상호 교환 가능한 전송 방식이라고 가정하지 마세요.

Zodl Tor 설정:

**더보기 → 고급 기능 → 베타: Tor Protection → 활성화 → 변경 사항 저장**

출처:

- https://support.zodl.com/article/17-enabling-tor-protection
- https://nym.com/blog/nym-mixnet-zcash-wallets

## 대안: 시스템 수준 NymVPN

이는 지갑이 Nym별 프록시 설정을 이해할 필요가 없으므로 가장 폭넓게 호환되는 Nym 옵션입니다.

### 1. NymVPN 설치

NymVPN는 Nym의 공식 웹사이트 또는 공식 플랫폼 스토어에서만 다운로드하세요.

- https://nym.com/
- https://nym.com/blog/nymvpn-v2026.12

NymVPN는 Android, iOS, Linux, Windows 및 macOS를 지원합니다.

### 2. Mixnet 모드 선택

NymVPN는 낮은 지연 시간에 최적화된 2홉 dVPN 경로인 **Fast 모드**와, 더 강력한 네트워크 메타데이터 보호에 최적화된 5홉 Mixnet 경로인 **Mixnet 모드**를 제공합니다. 민감한 지갑 활동에는 Mixnet 모드를 선택하고, 지갑을 열거나 새로고침하기 전에 클라이언트가 연결이 설정되었다고 보고할 때까지 기다리세요.

### 3. 지갑을 일반 네트워크 설정으로 유지

운영체제가 이미 NymVPN를 통해 트래픽을 터널링하고 있다면 대부분의 지갑에는 사용자 지정 프록시 설정이 필요하지 않습니다.

지갑을 평소처럼 열고 동기화하도록 하세요.

플랫폼에서 NymVPN가 분할 터널링을 제공한다면 지갑이 우회 또는 제외 목록에 놓이지 않고 **보호된 터널에 포함되어 있는지** 확인하세요.

### 4. 지갑을 사용하기 전에 터널 확인

간단한 시스템 수준 확인 방법:

1. NymVPN 연결을 해제합니다.
2. 공개 IP 확인 서비스를 방문하거나, 데스크톱에서 다음을 실행합니다.

   ```bash
   curl https://api.ipify.org
   ```

3. 표시되는 IP를 기록합니다.
4. Mixnet 모드에서 NymVPN에 연결합니다.
5. 확인을 반복합니다.

표시되는 공개 IP가 변경되어야 합니다.

이는 시스템 터널을 확인합니다. 앱이나 OS에 특수 라우팅 규칙이 있다면, 특정 지갑이 수행하는 모든 요청이 동일한 경로를 따른다는 것을 증명하지는 않습니다.

데스크톱에서 더 확실히 확인하려면:

- 운영체제의 네트워크 모니터로 지갑 프로세스를 검사합니다.
- 분할 터널 제외 항목이 없는지 확인합니다.
- NymVPN 연결이 해제되었을 때 예상한 지갑 동작 변화가 있는지 확인합니다.

문제를 해결하는 동안 지갑 주소, 잔액, 트랜잭션 ID, IP 주소 또는 복구 자료가 포함된 스크린샷을 게시하지 마세요.

## NymVPN dApp / 지갑 프록시 모드

NymVPN는 Mixnet을 통한 SOCKS5 / RPC 라우팅을 사용하는 앱 및 지갑 프록시 모드도 제공합니다.

Nym의 공개 설정 문서는 이를 주로 Ethereum 스타일 RPC 구성으로 보여 줍니다. 호환되는 일반 프록시/RPC 경로를 명시적으로 지원하는 소프트웨어에는 유용하지만, 모든 Zcash 지갑에서 작동한다고 가정해서는 **안 됩니다**.

지갑 자체 문서에서 호환되는 프록시 또는 RPC 지원을 확인하는 경우에만 이 경로를 사용하세요.

그렇지 않으면 다음을 우선하세요.

- 지갑의 기본 Nym 통합 또는
- 시스템 수준 NymVPN.

## 성능 및 타임아웃 상충 관계

Mixnet은 더 강력한 메타데이터 보호를 위해 의도적으로 속도를 희생합니다.

다음에 영향을 받을 수 있습니다.

- 초기 지갑 동기화,
- 대규모 따라잡기 동기화,
- 트랜잭션 기록 쿼리,
- RPC 타임아웃,
- 제3자 API 호출.

실용적인 지침:

- 기본 Nym 설정으로 시작하세요.
- 첫 동기화 또는 긴 따라잡기 동기화에는 시간이 더 걸릴 수 있습니다.
- 개인정보 보호 설정을 약화하기 전에 타임아웃을 재시도하세요.
- 민감한 트랜잭션 직전에 개인정보 보호 모드를 반복해서 전환하지 마세요.
- 대량 동기화에 더 빠른 경로를 사용한다면, 그 기간에 접속하는 인프라가 실제 네트워크 신원을 관찰할 수 있음을 이해하세요.
- 특히 Zingo PC의 경우, 기본 Nym 전송 방식은 현재 전송 및 가격 조회를 보호하는 반면 동기화는 직접 연결된다는 점을 기억하세요.

## 모바일 고려 사항

Android 및 iOS에서는 운영체제 VPN 슬롯이 일반 지갑 트래픽을 NymVPN를 통해 라우팅하는 가장 간단한 방법인 경우가 많습니다. 먼저 NymVPN에 연결한 뒤 지갑을 여세요.

다른 VPN, 방화벽 또는 로컬 VPN 기반 광고 차단기가 이미 시스템 VPN 인터페이스를 점유하고 있다면 두 제품을 동시에 사용할 수 없을 수 있습니다. 지갑이 보호된다고 가정하기 전에 운영체제의 VPN 상태를 확인하세요.

## 위협 모델 체크리스트

설정에 의존하기 전에 다음을 자문하세요.

- 적절한 경우 실드 Zcash 주소를 사용하고 있는가?
- 내 지갑에 기본 Nym 지원이 있는가?
- 있다면 해당 기본 통합은 정확히 어떤 트래픽을 보호하는가?
- 더 광범위한 적용 범위가 필요하다면 지갑이 네트워크 활동을 시작하기 전에 NymVPN가 연결되어 있는가?
- 지갑이 분할 터널링 규칙으로 제외되어 있는가?
- 지갑이 실제로 문서화한 프록시 모드에 의존하고 있는가?
- 거래소, 브라우저 세션, 제3자 API 또는 투명 주소를 통해 신원을 유출하고 있는가?
- 더 느린 동기화와 가끔 발생하는 타임아웃에 대비되어 있는가?

## 출처

- Nym: Zcash 지갑에서 Nym Mixnet이 이제 활성화됨, 2026년 9월 24일: https://nym.com/blog/nym-mixnet-zcash-wallets
- Zingo PC Nym 동작: https://github.com/zingolabs/zingo-pc#the-nym-mixnet
- Zingo Mobile Nym 전송 방식: https://github.com/zingolabs/zingo-mobile
- Zkool 저장소: https://github.com/hhanh00/zkool2
- NozyWallet Nym 전송 방식 작업: https://github.com/LEONINE-DAO/Nozy-wallet
- NymVPN v2026.12: https://nym.com/blog/nymvpn-v2026.12
- Zodl Tor Protection: https://support.zodl.com/article/17-enabling-tor-protection
