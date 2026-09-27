<a href="https://github.com/zechub/zechub/edit/main/site/Zcash_Tech/Z3_Stack.md" target="_blank">
  <img src="https://img.shields.io/badge/Edit-blue" alt="Edit Page"/>
</a>

# Z3 스택

**Z3 스택**은 Zcash Foundation의 패키지 노드 플랫폼입니다: **Zebra** (풀 노드) + **Zallet** (풀 노드 지갑), 선택 사항인 **Zaino** 인덱서. 이는 하나의 바이너리에 합의와 지갑을 함께 제공했으며 2026년 7월 18일에 지원이 종료된 독립 실행형 `zcashd` 프로세스를 대체하기 위한 것입니다.

기준 구현은 [github.com/ZcashFoundation/z3](https://github.com/ZcashFoundation/z3)의 Docker Compose 프로젝트입니다.

---

## TL;DR

* Z3는 **새로운 합의 클라이언트가 아닙니다**. `zcashd` 이후 스택에서 Zebra는 체인을 검증하고 Zallet은 키를 들고 지갑 RPC를 서비스하며 Zaino(선택 사항)는 lightwalletd gRPC 프로토콜을 지원합니다.
* `zcashd`는 노드와 지갑을 함께 제공했습니다. Z3 **는 해당 역할을 분할합니다**. 거래소, 채굴 풀 및 기타 풀 노드 지갑 운영자는 Zebra 단독이 아닌 이 조합으로 마이그레이션합니다.
* **mainnet**, **testnet**, **regtest** 세 개의 개별 Compose 프로젝트를 하나의 호스트에서 실행할 수 있습니다.
* 메인넷 첫 번째 동기화는 **24-72시간**, 약 **300GB**입니다. Regtest는 몇 초 안에 시작되며 스택을 학습하기에 적합한 장소입니다.
* Zallet은 Zaino의 인덱서 라이브러리를 포함하고 JSON-RPC를 통해 Zebra와 통신합니다. 독립 실행형 Zaino 서비스는 외부 지갑에 대해 lightwalletd 호환 엔드포인트를 원하는 경우에만 필요합니다.
* Zallet은 **베타** 버전입니다. 호환성을 깨는 변경으로 인해 지갑을 삭제하고 다시 만들어야 할 수 있습니다. 대규모 자금을 위한 완성된 커스터디 소프트웨어로 취급하지 마십시오.

---

## Z3의 존재 이유

Zcash의 역사 대부분 동안 `zcashd`는 참조 풀 노드이자 유일한 프로덕션 풀 노드 지갑이었습니다. 거래소, 채굴 풀과 커스터디 업체는 이 구조를 기준으로 통합해 왔습니다.

`zcashd`는 폐기되었습니다. 합의는 [Zebra](/zcash-tech/zebra-full-node) (그리고 현재 [Zakura](/zcash-tech/zakura-node)) 로 이동되었습니다. 내장된 지갑이 [Zallet](https://github.com/zcash/zallet)로 이동했습니다. 라이트 지갑 서빙이 [lightwalletd](/zcash-tech/lightwallet-nodes)에서 [Zaino](/zcash-tech/zaino)로 이동하고 있습니다.

이 세 조각은 별도의 저장소, 별도의 릴리스 주기 및 별도의 설정입니다. Z3는 통합 계층입니다: 고정된 이미지, 노드가 동기화될 때까지 지갑을 시작하지 않도록 유지하는 상태 확인, 네트워크별 포트 및 볼륨, 문서화된 운영자 경로.

Z3라는 이름은 Zebra, Zaino, Zallet을 묶어 부르는 생태계의 비공식 약칭입니다. 기본 Compose 파일은 Zebra 및 Zallet만 시작합니다. Zaino는 필수 세 번째 프로세스가 아닌 Compose 프로파일입니다.

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
| **Zebra**| 체인을 동기화하고 검증하며 가십, JSON-RPC, 상태 엔드포인트를 제공| 예 |
| **Zallet**| 풀 노드 지갑. Zaino 라이브러리를 내장합니다. Zebra JSON-RPC에 직접 연결합니다. 독립 실행형 Zaino 컨테이너를 호출하지 않음| 예 |
| **Zaino**| 독립형 인덱서. 외부 라이트 클라이언트를 위한 lightwalletd 호환 gRPC, 탐색기 및 faucet을 위한 JSON-RPC 프록시| 아니요 — `--profile indexer`|

Z3는 `docker-compose.yml`로 이미지 버전을 고정합니다. 다른 태그가 필요하면 `Z3_ZEBRA_IMAGE`, `Z3_ZAINO_IMAGE` 또는 `Z3_ZALLET_IMAGE`로 재정의하세요.

---

## zcashd와 다른 점

| | zcashd| Z3|
| --- | --- | --- |
| 언어| C++ (비트코인 포크)| Docker Compose로 오케스트레이션된 Rust 서비스|
| 프로세스 모델| 하나의 바이너리: 노드 + 지갑| 노드 및 지갑 컨테이너 분리|
| 합의 | 지원 종료 (EOS 2026년 7월 18일)| Zebra (또는 다른 호환 노드)|
| 지갑| 내장 `wallet.dat`| Zallet, age로 암호화된 데이터 디렉터리|
| 라이트 클라이언트| 일반적으로 별도의 lightwalletd| Zaino 프로필 (선택 사항)|
| 구성| `zcash.conf`| `config/<network>/` + Compose env 파일 아래의 네트워크당 파일|
| 단일 호스트의 네트워크| 번거로운 포트 충돌| 기본 지원: `z3-mainnet`, `z3-testnet`, `z3-regtest`|

여전히 `zcashd` 지갑이 있는 경우 `wallet.dat`를 Z3 볼륨으로 복사하지 말고 ZecHub의 [migration guide](/guides/migration-guide-zcashd-to-zebrad-zallet) 및 Zallet의 `migrate-zcashd-wallet` 명령을 사용하십시오.

---

## 네트워크

Z3는 3개의 독립적인 Compose 프로젝트입니다. 포트나 볼륨을 공유하지 않습니다.

| 네트워크| 프로젝트 이름| 다음 용도로 사용하세요.| 첫 번째 동기화| 실제 자금 사용|
| --- | --- | --- | --- | --- |
| 메인넷| `z3-mainnet`| 프로덕션 | 24 ~ 72시간| 예 |
| 테스트넷| `z3-testnet`| 공개 테스트 네트워크에서의 스테이징| 2 ~ 12시간| 아니요 (ZEC 테스트)|
| **regtest**| `z3-regtest`| 로컬 연습: 즉시 생성되는 블록, 피어 없음| 초| 아니요 |

새 운영자는 **regtest** 에서 시작하여 RPC 및 지갑 흐름을 확인한 다음 테스트넷 또는 메인넷으로 이동해야 합니다.

---

## 기본 호스트 포트

세 네트워크는 모두 한 머신에 공존하기 위한 것입니다. 아래 값은 게시된 기본값입니다. 모든 값은 일치하는 `Z3_*` env var를 통해 재정의할 수 있습니다. 표준 구성표는 [`z3-contract.yaml`](https://github.com/ZcashFoundation/z3/blob/main/z3-contract.yaml)입니다.

| 서비스| 메인넷| 테스트넷| Regtest|
| --- | --- | --- | --- |
| Zebra JSON-RPC| 8232 | 18232 | 29232 |
| Zebra P2P| 8233 | 18233 | 외부에 노출하지 않음|
| Zebra 상태 확인 (`/ready`)| 8080 | 18080 | 28080 |
| Zaino gRPC (인덱서 프로파일)| 8137 | 18137 | 28137 |
| Zaino JSON-RPC (인덱서 프로파일)| 8237 | 18237 | 28237 |
| Zallet RPC| 28232 | 40232 | 50232 |

Compose 네트워크 내에서 서비스 이름으로 접근합니다 (`zebra`, `zaino`, `zallet`).

---

## 데이터 및 백업

| 볼륨 | 보유 항목| 백업 필요 여부|
| --- | --- | --- |
| `z3-<network>-chain`| Zebra 체인 상태 (~ 300GB 메인넷)| 선택 사항 — 재동기화 가능|
| `z3-<network>-zallet`| 암호화된 지갑 데이터베이스 **및** 잠금을 해제하는 age identity| **예 — 백업해야 하는 유일한 볼륨입니다**|
| `z3-<network>-zaino`| 인덱서 상태 (인덱서 프로파일이 있는 경우에만)| 선택 사항 — 재구축 가능|
| `z3-<network>-cookie`| Zebra RPC 쿠키| 아니요 — 재생성됨|

처음 시작하기 전에 다른 디스크에 체인 상태를 두려면:

```bash
export Z3_CHAIN_DATA_PATH=/mnt/ssd/zebra-state
./scripts/fix-permissions.sh zebra /mnt/ssd/zebra-state
```

`docker compose --env-file .env.<network> --profile "*" down`는 스택을 중지하고 볼륨을 유지합니다. `-v`를 추가하면 삭제되고 완전히 재동기화됩니다. 프로필로 활성화한 서비스 (인덱서, 모니터링) 가 실제로 종료되도록 `--profile "*"`를 포함하십시오.

---

## 시작하기

필수 조건: Docker Engine, Docker Compose v2.24.4+, Git. `openssl`는 regtest에만 필요합니다.

### Regtest (스택을 확인하는 가장 빠른 방법)

```bash
git clone https://github.com/ZcashFoundation/z3 && cd z3
./scripts/regtest-init.sh
docker compose --env-file .env.regtest up -d
```

테스트 명령은 [docs/regtest.md](https://github.com/ZcashFoundation/z3/blob/main/docs/regtest.md)를 참조하십시오.

### 메인넷 (2상 부팅)

Zebra는 Zallet가 유용하기 전에 동기화를 완료해야 합니다. Zallet를 일찍 시작하면 `/ready`가 true가 될 때까지 재시작을 반복합니다.

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

테스트넷은 `.env.testnet` 및 `./scripts/check-zebra-readiness.sh 18080`와 동일한 흐름입니다.

`config/<network>/`에 따른 편집은 로컬에 유지되며 `git pull` 후에도 유지됩니다.

### 프로필 (선택 사항)

```bash
# Lightwalletd-compatible gRPC + JSON-RPC proxy
docker compose --env-file .env.mainnet --profile indexer up -d

# Prometheus, Grafana, Jaeger, Alertmanager
docker compose --env-file .env.mainnet --profile monitoring up -d
```

기본 Grafana 포트는 3000 (메인넷), 13000 (테스트넷), 23000 (regtest) 입니다.

---

## 운영자 메모

* **고정 이미지.** Z3는 자동으로 `:latest`를 사용하지 않습니다. 검토를 거쳐 고정 버전을 변경하거나 `Z3_<SERVICE>_IMAGE`를 설정합니다.
* **루트가 아닌 컨테이너.** Linux capability가 제거됩니다. 상태 확인은 Zebra가 준비될 때까지 지갑 시작을 막습니다. 재시작 정책은 기본적으로 켜져 있습니다.
* **로그.** Z3는 로깅 드라이버를 고정하지 않습니다. Docker 데몬 구성에서 크기 제한을 설정하지 않으면 24시간 가동되는 노드에서 로그가 제한 없이 커집니다.
* **P2P.** 메인넷과 테스트넷은 Zebra의 P2P 포트를 노출합니다. NAT 뒤에서는 `ZEBRA_NETWORK__EXTERNAL_ADDR`를 피어가 접속할 주소로 설정합니다. Regtest에는 피어가 없습니다.
* **ARM에서 Zaino.** 업스트림 Zaino 이미지는 `linux/amd64` 전용입니다. Apple Silicon에서는 소스에서 빌드하지 않는 한 에뮬레이션으로 실행됩니다. Zebra와 Zallet은 멀티 아키텍처를 지원합니다.
* **공유 호스트.** 기본적으로 CPU 또는 메모리 제한이 없습니다. 호스트가 노드 전용이 아니라면 오버라이드 파일에 `deploy.resources.limits`를 추가합니다.

프로덕션 환경 체크리스트와 FAQ는 [docs/faq.md](https://github.com/ZcashFoundation/z3/blob/main/docs/faq.md) 및 [docs/docker-architecture.md](https://github.com/ZcashFoundation/z3/blob/main/docs/docker-architecture.md)를 참고하세요.

---

## Z3를 실행해야 하는 사용자

**적합한 경우**

* `zcashd`를 노드 플러스 지갑으로 사용한 거래소, 커스터디 업체 및 채굴 풀
* 동기화된 Zebra에 대해 지원되는 풀 노드 지갑 RPC를 원하는 운영자
* 메인넷, 테스트넷, regtest가 나란히 필요한 개발자
* Zaino 프로필을 통해 자체 lightwalletd 호환 엔드포인트를 구축하려는 운영자

**일반적으로 적합하지 않은 경우**

* ZEC만 주고 받아야 하는 최종 사용자 — ZODL/Zashi, Zingo 또는 YWallet와 같은 라이트 지갑 사용
* 체인만 검증하려는 사람 — Zebra (또는 Zakura) 만 실행
* 컴팩트한 블록만 제공하려는 사람 — Zebra + Zaino 또는 Zebra + lightwalletd를 Zallet 없이 실행

---

## 관련 페이지

* [Zebra Full Node](/zcash-tech/zebra-full-node) — Z3가 사용하는 합의 노드
* [Zaino](/zcash-tech/zaino) — 선택적 인덱서 프로필
* [Full Nodes](/zcash-tech/full-nodes) — Zebra, Zakura 및 은퇴한 zcashd
* [Lightwallet Nodes](/zcash-tech/lightwallet-nodes) — 라이트 클라이언트가 연결하는 대상
* [Zakura Node](/zcash-tech/zakura-node) — 현재 Z3가 제공하지 않는 대체 풀 노드
* [Migration Guide: zcashd to Zebrad/Zallet](/guides/migration-guide-zcashd-to-zebrad-zallet)
* [Developer Resources](/start-here/developer-resources)

---

## 자료

* [Z3 repository](https://github.com/ZcashFoundation/z3)
* [Z3 contract (ports, volumes, project names)](https://github.com/ZcashFoundation/z3/blob/main/z3-contract.yaml)
* [Zebra](https://github.com/ZcashFoundation/zebra) · [The Zebra Book](https://zebra.zfnd.org/)
* [Zaino](https://github.com/zingolabs/zaino)
* [Zallet](https://github.com/zcash/zallet) · [The Zallet Book](https://zcash.github.io/zallet/)
* [Zcash Community Forum — Z3 updates](https://forum.zcashcommunity.com/t/zcash-z3-updates-formerly-zcashd-deprecation/48965)
* [Z3 Launcher](https://github.com/Jubrilabdulazeez/z3-launcher) — 공식 Compose 스택에 대한 커뮤니티 관리 도구 (ZecHub 해커톤)
