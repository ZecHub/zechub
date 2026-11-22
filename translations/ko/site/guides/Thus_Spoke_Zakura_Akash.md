# Thus Spoke Zakura의 Akash (Regtest)

Akash에서 **Thus Spoke Zakura v0.4.1** 스택을 실행합니다. Zakura Regtest, lightwalletd, 지갑 **대시보드 / HTTP API**를 제공합니다. 테스트 코인은 가치가 없습니다. 메인넷 ZEC을 이곳으로 보내지 마세요.

템플릿: [awesome-akash/thus-spoke-zakura](https://github.com/akash-network/awesome-akash/tree/master/thus-spoke-zakura)

업스트림: [zcashlabs/thus-spoke-zakura](https://github.com/zcashlabs/thus-spoke-zakura) 태그 **v0.4.1**

### 이미지

| 서비스 | 이미지 |
| --- | --- |
| 대시보드 + API (`app`) | `ghcr.io/zcashlabs/thus-spoke-zakura-app:0.4.1` |
| lightwalletd | `ghcr.io/zcashlabs/thus-spoke-zakura-lightwalletd:0.4.1` |
| Zakura | `zakuracore/zakura:1.6.0` (0.4.1 실행기에 컴파일된 고정 버전) |

### 자체 부트스트랩

처음 시작할 때 `app` 컨테이너는 영구 볼륨에서 `ths-server init`을 실행한 다음 `ths-server serve`을 실행합니다. Zakura JSON-RPC와 lightwalletd이 준비될 때까지 Serve가 재시도합니다. 제공자에서 `ths`을 실행할 필요는 없습니다. SDL이 런타임입니다.

### Akash에서 포트를 게시하는 방법

SDL의 `port` / `as`은 **컨테이너** 포트입니다. 앱은 **8080**(`THS_LISTEN`)에서 수신 대기하고, lightwalletd은 **9067**에서, Zakura RPC는 **18232**에서, P2P는 **18233**에서 수신 대기합니다. 배포 내부에서 서비스는 이미 해당 포트를 사용합니다(`http://zakura:18232`, `http://lightwalletd:9067`).

이 포트들은 제공자의 공용 IP에 있는 포트가 **아닙니다**.

**기본값(이 템플릿):** 전용 IP 없음.

| 서비스 | 컨테이너 수신 포트 | SDL `as` | 리스에서 표시되는 방식 |
| --- | --- | --- | --- |
| `app` (대시보드 + HTTP API) | 8080 | 80 (HTTP) | 인그레스 호스트 이름. 대개 80/443 포트를 사용합니다 — **이 URI를 브라우저에서 여세요** |
| `lightwalletd` | 9067 | 9067 (TCP, 글로벌) | `host:&lt;random-high-port&gt;` |
| `zakura` RPC | 18232 | 18232 (TCP, 글로벌) | `host:&lt;random-high-port&gt;` |
| `zakura` P2P | 18233 | 18233 (TCP, 글로벌) | `host:&lt;random-high-port&gt;` |

리스가 준비되면 **Leases → URIs**에서 실제 URI를 확인할 수 있습니다. 대시보드용 **`app`** URI를 여세요(같은 UI가 로컬에서 `ths`을 엽니다). 경량 클라이언트에는 **lightwalletd** URI(`THS_LIGHTWALLETD_TLS=false`)를 지정하세요. 전용 IP 리스로 해당 포트가 공개되지 않았다면 제공자의 IP에 `:8080`, `:80` 또는 `:9067`을 입력하지 마세요.

**전용 IP**(`endpoints` / `kind: ip`)는 유료 추가 기능이며 이 템플릿에는 포함되어 **있지 않습니다**. 전용 IP를 사용하면 공용 IP를 고정하고 경우에 따라 `as` 포트를 사용할 수 있습니다. 필요하지 않다면 활성화하지 마세요.

### 사용할 사이트(결제)

SDL은 동일합니다. 두 Akash 웹 UI는 **결제 방식**이 다릅니다.

| 사이트 | 결제 방식 | 지갑 |
| --- | --- | --- |
| [console.akash.network](https://console.akash.network) | 기존 웹 결제(카드 / Console에서 제공하는 법정화폐 결제 수단) | Console 계정 |
| [air.akash.network](https://air.akash.network) | 기본 Akash 체인 결제(AKT / ACT) | **Keplr** |

Keplr 온체인 결제를 원한다면 **Air**를 사용하세요. 일반적인 웹 결제 절차를 원한다면 **Console**을 사용하세요.

### 배포

**웹 결제(Console)**

[![Deploy on Akash Console](https://raw.githubusercontent.com/akash-network/console/refs/heads/main/apps/deploy-web/public/images/deploy-with-akash-btn.svg)](https://console.akash.network/new-deployment?step=edit-deployment&templateId=akash-network-awesome-akash-thus-spoke-zakura)

**Akash 기본 결제 및 Keplr 사용(Air)**

[Air에서 이 템플릿 열기](https://air.akash.network/new-deployment?step=edit-deployment&templateId=akash-network-awesome-akash-thus-spoke-zakura)

템플릿에서 배포를 만들고, 입찰을 수락한 다음, `app` 로그에서 `ths-server serve`이 계속 실행 중인지 확인합니다. 그런 다음 대시보드용 **`app` URI**를 여세요.

### 관련 항목

- [Zakura의 Akash](/guides/akash-network-zakura) — 메인넷/테스트넷 검증 노드
- [Zebra의 Akash](/guides/akash-network-zebra)
- 책: [github.com/zcashlabs/thus-spoke-zakura/tree/main/book](https://github.com/zcashlabs/thus-spoke-zakura/tree/main/book)
