# Akash 네트워크에서 Zakura 실행하는 방법

[awesome-akash zcash-zakura](https://github.com/akash-network/awesome-akash/tree/master/zcash-zakura) 템플릿을 사용해 **Zakura** Zcash 풀 노드를 실행하는 단계별 안내입니다.

Zakura는 합의 호환 Zcash 노드(Zebra에서 포크됨)로, 동기화 속도가 더 빠르고 기본 프루닝과 스냅샷 부트스트랩을 지원합니다. 이 템플릿은 **`zakuracore/zakura:1.8.1`**로 고정되어 있습니다(다이제스트 고정 방식이며, `:latest` 또는 `1.1.1`은 사용하지 마세요).

### 제공 기능

- 메인넷 P2P: 컨테이너 포트 **8233**, 전 세계에 공개됨(아래 포트 매핑 참고)
- 첫 실행 시 Valar 스냅샷으로 부트스트랩되는 영구 프루닝 상태(기본값 64 GiB)
- Prometheus **9999** 및 상태 확인 **8080**(내부 전용, 공개 URI 없음)
- 함께 배치된 **lightwalletd**용 내부 JSON-RPC **8232**; LWD는 컨테이너 포트 **9067**에서 수신하며 전 세계에 공개됨

SDL의 기능 플래그(true/false): `ENABLE_METRICS`, `ENABLE_HEALTH`, `ENABLE_RPC`, `ENABLE_LIGHTWALLETD`. lightwalletd이 활성화되면 쿠키 인증은 비활성화됩니다. lightwalletd은 쿠키 파일을 읽을 수 없기 때문입니다.

### 사용할 사이트(결제)

SDL은 동일합니다. 두 Akash 웹 UI는 **결제 방식**이 다릅니다.

| 사이트 | 결제 | 지갑 |
| --- | --- | --- |
| [console.akash.network](https://console.akash.network) | 기존 웹 결제(카드 / Console에서 지원하는 법정화폐 결제 수단) | Console 계정 |
| [air.akash.network](https://air.akash.network) | 기본 Akash 체인 결제(AKT / ACT) | **Keplr** |

Keplr을 온체인으로 결제하려면 **Air**를 사용하세요. 일반적인 웹 결제 절차를 원하면 **Console**을 사용하세요. Console에서 Keplr의 기본 결제 정산을 지원한다고 기대하지 마세요.

### 배포

**웹 결제(Console)**

[![Deploy on Akash Console](https://raw.githubusercontent.com/akash-network/console/refs/heads/main/apps/deploy-web/public/images/deploy-with-akash-btn.svg)](https://console.akash.network/new-deployment?step=edit-deployment&templateId=akash-network-awesome-akash-zcash-zakura)

**Akash 기본 결제(Keplr 사용, Air)**

[이 템플릿을 Air에서 열기](https://air.akash.network/new-deployment?step=edit-deployment&templateId=akash-network-awesome-akash-zcash-zakura)

1. 위에서 해당하는 링크(Console 또는 Air)를 여세요.
2. Air에서는 **Keplr**을 연결하고 예치금과 임대료를 낼 AKT/ACT가 있는지 확인하세요. Console에서는 UI에 표시되는 웹 결제를 완료하세요.
3. `zcash-zakura/deploy.yaml`이 아직 입력되어 있지 않으면 불러오세요.
4. 예치하고, 입찰을 수락한 뒤, 임대가 시작될 때까지 기다리세요.
5. 로그에 스냅샷 다운로드(첫 실행)가 표시된 다음 `zakurad start`이 표시되어야 합니다.
6. **Leases → URIs**를 여세요. 공개 IP의 8233 또는 9067이 아니라, 공급자가 할당한 호스트:포트를 사용하세요.

### Akash의 포트 공개 방식

SDL의 `port` / `as`(8233, 9067, 8232)은 **컨테이너** 포트입니다. Zakura은 여전히 8233에서 수신하고, lightwalletd는 9067에서 수신하며, RPC는 LWD 사이드카(`zakura:8232`)용으로 8232에서 수신합니다.

이 포트들은 공급자의 공개 IP에 있는 포트가 **아닙니다**.

**기본 설정(이 템플릿):** 전용 IP가 없습니다. 각 `global: true` TCP 노출 포트는 공유 공급자 호스트의 **임의의 높은 번호 포트**에 매핑됩니다. Console/Air에는 임대 URI로 표시됩니다. 예:

```
zakura-8233: provider.example:31482
lightwalletd-9067: provider.example:32011
```

피어는 **8233** URI(`provider.example:31482`)에 연결합니다. 경량 지갑은 **9067** URI를 사용합니다(TLS를 직접 종료하지 않는 한 TLS는 비활성화되어 있습니다). `ZAKURA_NETWORK__EXTERNAL_ADDR`에는 `:8233`이 아니라 매핑된 P2P URI를 설정하세요.

**내부** 노출 포트(`8232` RPC, `9999` 메트릭, `8080` 상태 확인)는 배포 네트워크에만 유지됩니다. 공개 URI는 없습니다.

**전용 IP**(`endpoints` / `kind: ip`)는 추가 유료 옵션이며 이 템플릿에는 포함되어 **있지 않습니다**. 이를 사용하면 공개 IP와 때로는 `as` 포트를 고정할 수 있습니다. 안정적인 `host:8233`이 필요한 경우에만 추가하세요.

### 아카이브형과 프루닝형 비교

기본값은 **프루닝형**입니다(스냅샷 약 11 GiB, 디스크 64 GiB). 전체 이력을 보관하려면 `SNAPSHOT_KIND=archive`을 설정하고, 디스크를 350 GiB 이상으로 늘린 다음, `ZAKURA_STATE__STORAGE_MODE=archive`을 설정하세요.

### 관련 항목

- [Zebra: Akash](/guides/akash-network-zebra)에서 실행 — Zcash Foundation `zebrad`(전체 이력, 스냅샷 없음)
- [Thus Spoke Zakura: Akash](/guides/thus-spoke-zakura-akash)에서 실행 — Regtest 대시보드 + 앱(v0.4.1)
- Zakura 소스: [github.com/zakura-core/zakura](https://github.com/zakura-core/zakura)
- 스냅샷: [zakura.com/snapshots/](https://zakura.com/snapshots/)
