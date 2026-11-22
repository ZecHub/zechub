<a href="https://github.com/zechub/zechub/edit/main/site/Zcash_Tech/Z3_Stack.md" target="_blank">
  <img src="https://img.shields.io/badge/Edit-blue" alt="페이지 편집"/>
</a>

# Z3 Stack

**Z3 Stack**은 Zcash Foundation의 패키지형 노드 플랫폼입니다. **Zebra**(풀 노드) + **Zallet**(풀 노드 지갑)으로 구성되며, 선택적으로 **Zaino** 인덱서를 사용할 수 있습니다. 단독 `zcashd` 프로세스를 대체하기 위한 플랫폼으로, 해당 프로세스는 합의와 지갑을 하나의 바이너리에 묶었으며 2026년 7월 18일에 지원이 종료되었습니다.

참조 구현은 Docker Compose 프로젝트인 [github.com/ZcashFoundation/z3](https://github.com/ZcashFoundation/z3)입니다.

> **상태, 2026년 11월 14일: 기본 버전 고정은 NU7 이전입니다.** Z3의 `docker-compose.yml`은 2026년 8월 10일에 마지막으로 변경되었습니다. 여전히 `zfnd/zebra:6.2.3`와 `zodlinc/zallet:v0.1.0-beta.1`을 고정 버전으로 사용하며, `zallet-zaino` 바이너리로 시작합니다. [NU7](NU7.md)은 2026년 11월 6일 블록 3,543,405에서 메인넷에 활성화되었으며, 이후 규칙을 따르는 버전은 Zebra 7.0.0 이상뿐입니다. 6.x Zebra은 이전 규칙을 계속 따르므로 실제 체인에서 이탈합니다. NU7을 따르는 최초 릴리스인 Zallet v0.1.0-beta.4에는 이제 `zallet-zaino`이 전혀 포함되지 않습니다. 배포하기 전에 저장소에서 더 최신 버전 고정이 있는지 확인하세요. 직접 이미지를 재정의하는 경우, Zallet의 남아 있는 `zebra` 백엔드가 Zebra의 상태 디렉터리를 직접 읽으므로 Zallet이 해당 디렉터리에 접근할 수 있는 동일한 호스트에서 실행되어야 한다는 점에 유의하세요([Zallet](Zallet.md)).

---

## 요약

* Z3는 **새로운 합의 클라이언트가 아닙니다**. `zcashd` 이후의 스택을 함께 실행하는 방식입니다. Zebra은 체인을 검증하고, Zallet는 키를 보관하고 지갑 RPC를 제공하며, Zaino은 선택적으로 lightwalletd gRPC 프로토콜을 제공합니다.
* `zcashd`은 노드와 지갑을 하나로 묶었습니다. Z3는 이 역할을 **분리합니다**. 거래소, 채굴 풀 및 기타 풀 노드 지갑 운영자는 Zebra만 사용하는 대신 이 조합으로 이전합니다.
* 격리된 Compose 프로젝트 3개를 한 호스트에서 실행할 수 있습니다. **메인넷**, **테스트넷**, **regtest**입니다.
* 메인넷 최초 동기화에는 대략 **24~72시간**이 걸리고 약 **300 GB**의 용량이 필요합니다. Regtest는 몇 초 만에 시작되므로 스택을 익히기에 적합합니다.
* 고정된 Z3 이미지에서 Zallet은 `zallet-zaino` 백엔드(Zaino의 인덱서 라이브러리)를 실행하며 JSON-RPC를 통해 Zebra와 통신합니다. Zallet은 v0.1.0-beta.4에서 해당 백엔드를 제거했습니다. 현재 Zallet는 Zebra의 상태를 직접 읽습니다. 외부 지갑에 lightwalletd 호환 엔드포인트를 제공하려는 경우에만 독립형 Zaino 서비스가 필요합니다.
* Zallet은 **베타** 버전입니다. 호환성이 깨지는 변경으로 인해 지갑을 삭제하고 다시 만들어야 할 수 있습니다. 큰 금액을 보관하는 데 사용할 완성된 커스터디 소프트웨어로 간주하지 마세요.

---

## Z3가 필요한 이유

Zcash의 역사 대부분 동안 `zcashd`은 참조용 풀 노드이자 운영 환경에서 사용되는 유일한 풀 노드 지갑이었습니다. 거래소, 풀, 커스터디 업체는 이 설계를 기반으로 통합했습니다.

`zcashd`은 서비스가 종료되었습니다. 합의 기능은 [Zebra](/zcash-tech/zebra-full-node)으로 이전되었으며, 이제 [Zakura](/zcash-tech/zakura-node)도 사용할 수 있습니다. 내장 지갑은 [Zallet](https://github.com/zcash/zallet)으로 이전되었습니다. 라이트 지갑 서비스는 [lightwalletd](/zcash-tech/lightwallet-nodes)에서 [Zaino](/zcash-tech/zaino)으로 옮겨가고 있습니다.

이 세 구성 요소는 서로 다른 저장소, 릴리스 주기, 설정을 사용합니다. Z3는 이들을 연결하는 역할을 합니다. 버전이 고정된 이미지, 노드가 동기화될 때까지 지갑을 실행하지 않는 상태 점검, 네트워크별 포트와 볼륨, 문서화된 운영 절차를 제공합니다.

이름은 생태계에서 비공식적으로 쓰이는 약칭인 Zebra, Zaino, Zallet에서 유래했습니다. 기본 Compose 파일은 Zebra과 Zallet만 시작합니다. Zaino은 Compose 프로필이며, 반드시 필요한 세 번째 프로세스가 아닙니다.

---

## 아키텍처

```
                    ┌──────────────────────── Z3 (per network) ────────────────────────┐
                    │                                                                  │
  peers ◄──P2P──►  Zebra (zebrad)  ──JSON-RPC──►  Zallet                                │
                    │   full node                    │  embeds Zaino libraries          │
                    │                                │  wallet RPC for operators        │
                    │                                └─────────────────────────────────┤
                    │                                                                  │
                    │   Zaino (optional, --profile indexer)                            │
                    │     lightwalletd-compatible gRPC + JSON-RPC proxy                │
                    │            │                                                     │
                    └────────────┼─────────────────────────────────────────────────────┘
                                 ▼
                        light wallets / explorers
```

| 구성 요소 | Z3에서의 역할 | 필수 여부 |
| --- | --- | --- |
| **Zebra** | 체인을 동기화하고 검증하며, 가십, JSON-RPC, 상태 엔드포인트를 제공합니다 | 예 |
| **Zallet** | 풀 노드 지갑입니다. 고정 버전인 beta.1 이미지는 Zaino 라이브러리 백엔드(Zallet beta.4에서 제거된 `zallet-zaino`)를 실행하고 Zebra JSON-RPC에 직접 연결됩니다. 독립형 Zaino 컨테이너를 호출하지 **않습니다** | 예 |
| **Zaino** | 독립형 인덱서입니다. 외부 라이트 클라이언트용 lightwalletd 호환 gRPC와 블록 탐색기 및 파우셋용 JSON-RPC 프록시를 제공합니다 | 아니요 — `--profile indexer` |

Z3는 `docker-compose.yml`에서 이미지 버전을 고정합니다. 다른 태그가 필요한 경우 `Z3_ZEBRA_IMAGE`, `Z3_ZAINO_IMAGE` 또는 `Z3_ZALLET_IMAGE`로 재정의하세요.

---

## zcashd와 다른 점

| | zcashd | Z3 |
| --- | --- | --- |
| 언어 | C++(Bitcoin 포크) | Rust 서비스, Docker Compose로 오케스트레이션 |
| 프로세스 모델 | 하나의 바이너리: 노드 + 지갑 | 노드와 지갑 컨테이너 분리 |
| 합의 | 서비스 종료(EOS 2026년 7월 18일) | Zebra(또는 호환되는 다른 노드) |
| 지갑 | 내장 `wallet.dat` | Zallet, age로 암호화된 데이터 디렉터리 |
| 라이트 클라이언트 | 보통 별도의 lightwalletd | 선택 사항인 Zaino 프로필 |
| 설정 | `zcash.conf` | `config/<network>/` 아래의 네트워크별 파일과 Compose 환경 파일 |
| 한 호스트에서 사용하는 네트워크 | 포트 충돌이 잦음 | 기본 지원: `z3-mainnet`, `z3-testnet`, `z3-regtest` |

아직 `zcashd` 지갑을 사용 중이라면 `wallet.dat`을 Z3 볼륨에 복사하지 말고, ZecHub의 [마이그레이션 가이드](/guides/migration-guide-zcashd-to-zebrad-zallet)와 Zallet의 `migrate-zcashd-wallet` 명령을 사용하세요.

---

## 네트워크

Z3는 서로 독립적인 Compose 프로젝트 3개로 구성됩니다. 포트나 볼륨을 공유하지 않습니다.

| 네트워크 | 프로젝트 이름 | 용도 | 최초 동기화 | 실제 자금 |
| --- | --- | --- | --- | --- |
| **메인넷** | `z3-mainnet` | 운영 환경 | 24~72시간 | 예 |
| **테스트넷** | `z3-testnet` | 공개 테스트 네트워크의 스테이징 환경 | 2~12시간 | 아니요(테스트 ZEC) |
| **regtest** | `z3-regtest` | 로컬 연습: 블록이 즉시 생성되고 피어가 없음 | 몇 초 | 아니요 |

새 운영자는 **regtest**로 시작해 RPC와 지갑 흐름을 확인한 다음 테스트넷이나 메인넷으로 옮기는 것이 좋습니다.

---

## 기본 호스트 포트

세 네트워크는 한 컴퓨터에서 함께 실행하도록 설계되었습니다. 아래 값은 기본적으로 공개되는 포트이며, 각 포트는 해당 `Z3_*` 환경 변수로 재정의할 수 있습니다. 기준 포트 표는 [`z3-contract.yaml`](https://github.com/ZcashFoundation/z3/blob/main/z3-contract.yaml)입니다.

| 서비스 | 메인넷 | 테스트넷 | Regtest |
| --- | --- | --- | --- |
| Zebra JSON-RPC | 8232 | 18232 | 29232 |
| Zebra P2P | 8233 | 18233 | (공개되지 않음) |
| Zebra 상태 점검(`/ready`) | 8080 | 18080 | 28080 |
| Zaino gRPC(인덱서 프로필) | 8137 | 18137 | 28137 |
| Zaino JSON-RPC(인덱서 프로필) | 8237 | 18237 | 28237 |
| Zallet RPC | 28232 | 40232 | 50232 |

Compose 네트워크 안에서는 서비스 이름으로 서로를 찾습니다(`zebra`, `zaino`, `zallet`).

---

## 데이터 및 백업

| 볼륨 | 저장 내용 | 백업 필요 여부 |
| --- | --- | --- |
| `z3-<network>-chain` | Zebra 체인 상태(메인넷 기준 약 300 GB) | 선택 사항 — 다시 동기화할 수 있음 |
| `z3-<network>-zallet` | 암호화된 지갑 데이터베이스와 이를 잠금 해제하는 age 신원 정보 | **예 — 반드시 백업해야 하는 유일한 볼륨입니다** |
| `z3-<network>-zaino` | 인덱서 상태(인덱서 프로필을 사용하는 경우에만) | 선택 사항 — 다시 만들 수 있음 |
| `z3-<network>-cookie` | Zebra RPC 쿠키 | 아니요 — 자동으로 다시 생성됨 |

첫 실행 전에 체인 상태를 다른 디스크에 저장하려면 다음을 수행하세요.

```bash
export Z3_CHAIN_DATA_PATH=/mnt/ssd/zebra-state
./scripts/fix-permissions.sh zebra /mnt/ssd/zebra-state
```

`docker compose --env-file .env.<network> --profile "*" down`은 스택을 중지하고 볼륨을 유지합니다. `-v`을 추가하면 볼륨이 삭제되어 전체 재동기화가 수행됩니다. 프로필에 따라 실행되는 서비스(인덱서, 모니터링)를 실제로 중지하려면 `--profile "*"`을 포함하세요.

---

## 시작하기

필수 항목: Docker Engine, Docker Compose v2.24.4 이상, Git. `openssl`은 regtest에만 필요합니다.

### Regtest(스택을 빠르게 살펴보는 방법)

```bash
git clone https://github.com/ZcashFoundation/z3 && cd z3
./scripts/regtest-init.sh
docker compose --env-file .env.regtest up -d
```

테스트 명령은 [docs/regtest.md](https://github.com/ZcashFoundation/z3/blob/main/docs/regtest.md)를 참고하세요.

### 메인넷(2단계 부팅)

Zebra의 동기화가 끝나야 Zallet을 사용할 수 있습니다. `/ready`이 참이 되기 전에 Zallet을 시작하면 계속 재시작됩니다.

```bash
git clone https://github.com/ZcashFoundation/z3 && cd z3

# 1. One-time setup: local config + Zallet wallet identity
./scripts/setup-network.sh mainnet

# 2. Start Zebra and wait until it is synced
docker compose --env-file .env.mainnet up -d zebra
./scripts/check-zebra-readiness.sh

# 3. Start Zallet (and anything else in the default profile)
docker compose --env-file .env.mainnet up -d
```

테스트넷에서도 `.env.testnet`과 `./scripts/check-zebra-readiness.sh 18080`을 사용해 같은 절차를 따릅니다.

`config/<network>/` 아래에서 변경한 내용은 로컬에 유지되며 `git pull` 후에도 보존됩니다.

### 선택 프로필

```bash
# Lightwalletd-compatible gRPC + JSON-RPC proxy
docker compose --env-file .env.mainnet --profile indexer up -d

# Prometheus, Grafana, Jaeger, Alertmanager
docker compose --env-file .env.mainnet --profile monitoring up -d
```

Grafana 기본 포트는 메인넷 3000, 테스트넷 13000, regtest 23000입니다.

---

## 운영자 참고 사항

* **고정 이미지.** Z3는 자동으로 `:latest`의 최신 버전으로 변경되지 않습니다. 검토된 변경 사항에서 버전을 올리거나 `Z3_<SERVICE>_IMAGE`을 설정하세요. 버전은 2026년 8월 이후 바뀌지 않았으므로 NU7보다 이전입니다(위 상태 참고).
* **루트 권한이 없는 컨테이너.** Linux 권한은 제거됩니다. 상태 점검을 통해 Zebra이 준비될 때까지 지갑 실행이 보류됩니다. 기본적으로 재시작 정책이 활성화되어 있습니다.
* **로그.** Z3는 로깅 드라이버를 고정하지 않습니다. Docker 데몬 설정에서 크기 제한을 지정하지 않으면 노드가 24시간 내내 실행되는 동안 로그가 제한 없이 늘어납니다.
* **P2P.** 메인넷과 테스트넷은 Zebra의 P2P 포트를 공개합니다. NAT 뒤에서 실행하는 경우 피어가 연결할 주소를 `ZEBRA_NETWORK__EXTERNAL_ADDR`에 설정하세요. Regtest에는 피어가 없습니다.
* **ARM에서 Zaino 실행.** 업스트림 Zaino 이미지는 `linux/amd64` 전용입니다. Apple Silicon에서는 소스에서 빌드하지 않는 한 에뮬레이션으로 실행됩니다. Zebra과 Zallet은 멀티 아키텍처를 지원합니다.
* **공유 호스트.** 기본적으로 CPU나 메모리 제한은 설정되어 있지 않습니다. 컴퓨터를 노드 전용으로 사용하지 않는다면 재정의 파일에 `deploy.resources.limits`을 추가하세요.

운영 환경을 고려한 체크리스트와 자주 묻는 질문: [docs/faq.md](https://github.com/ZcashFoundation/z3/blob/main/docs/faq.md), [docs/docker-architecture.md](https://github.com/ZcashFoundation/z3/blob/main/docs/docker-architecture.md).

---

## Z3를 실행해야 하는 사용자

**적합한 경우**

* `zcashd`을 노드와 지갑을 결합한 시스템으로 사용했던 거래소, 커스터디 업체, 채굴 풀
* 동기화된 Zebra을 대상으로 지원되는 풀 노드 지갑 RPC를 사용하려는 운영자
* 메인넷, 테스트넷, regtest를 나란히 실행해야 하는 개발자
* Zaino 프로필을 통해 비공개 lightwalletd 호환 엔드포인트를 구축하려는 사용자

**대개 적합하지 않은 경우**

* ZEC을 보내고 받기만 하면 되는 최종 사용자 — ZODL / Zashi, Zingo 또는 YWallet의 후속 제품인 Zkool 같은 라이트 지갑을 사용하세요.
* 체인 검증만 하려는 사용자 — Zebra(또는 Zakura)만 실행하세요.
* 압축 블록 제공만 필요한 사용자 — Zebra + Zaino 또는 Zebra + lightwalletd를 Zallet 없이 실행하세요.

---

## 관련 페이지

* [Zebra 풀 노드](/zcash-tech/zebra-full-node) — Z3가 감싸서 제공하는 합의 노드
* [Zaino](/zcash-tech/zaino) — 선택 사항인 인덱서 프로필
* [풀 노드](/zcash-tech/full-nodes) — Zebra, Zakura 및 서비스가 종료된 zcashd
* [라이트월렛 노드](/zcash-tech/lightwallet-nodes) — 라이트 클라이언트가 연결하는 대상
* [Zakura 노드](/zcash-tech/zakura-node) — 대체 풀 노드이며, 현재 Z3에 포함된 노드는 아닙니다
* [마이그레이션 가이드: zcashd에서 Zebrad/Zallet으로](/guides/migration-guide-zcashd-to-zebrad-zallet)
* [개발자 자료](/start-here/developer-resources)

---

## 자료

* [Z3 저장소](https://github.com/ZcashFoundation/z3)
* [Z3 사양(포트, 볼륨, 프로젝트 이름)](https://github.com/ZcashFoundation/z3/blob/main/z3-contract.yaml)
* [Zebra](https://github.com/ZcashFoundation/zebra) · [Zebra Book](https://zebra.zfnd.org/)
* [Zaino](https://github.com/zingolabs/zaino)
* [Zallet](https://github.com/zcash/zallet) · [Zallet Book](https://zcash.github.io/zallet/)
* [Zcash 커뮤니티 포럼 — Z3 업데이트](https://forum.zcashcommunity.com/t/zcash-z3-updates-formerly-zcashd-deprecation/48965)
* [Z3 실행기](https://github.com/Jubrilabdulazeez/z3-launcher) — 공식 Compose 스택을 제어하는 커뮤니티 제어판(ZecHub 해커톤)
