<a href="https://github.com/zechub/zechub/edit/main/site/Zcash_Tech/ZECD.md" target="_blank">
  <img src="https://img.shields.io/badge/Edit-blue" alt="페이지 편집"/>
</a>

# ZECD — Shielded-First Wallet Server

> 🇧🇷 [포르투갈어 버전](/zechubglobal/zcashbrasil/zcashtech/zecd)

ZECD는 Zcash용 shielded-first 월렛 서버로, [librustzcash](https://github.com/zcash/librustzcash)를 기반으로 구축되었으며 Bitcoin Core의 JSON-RPC 방식을 통해 제공됩니다. 개발자와 결제 통합 담당자에게 Zcash와 상호작용하기 위한 익숙한 Bitcoin 호환 API를 제공하면서 Orchard(가장 프라이빗한 풀)를 기본값으로 사용합니다. [zec.rocks](https://zec.rocks)에서 개발한 ZECD는 현대적이고 클라우드 네이티브한 배포 환경에서 `zcashd`의 월렛 기능을 대체하도록 설계되었습니다.

**현재 버전:** 0.5.0-rc3 (2026년 7월 13일) — Ironwood (NU6.3) 지원 포함. `cargo install zecd`로 설치하거나 공식 Docker 이미지를 사용할 수 있습니다.

---

## TL;DR

- ZECD는 **월렛 데몬(서버)**이며 전체 노드가 아닙니다. Zcash P2P 프로토콜을 사용하지 않고 키 관리, 스캔, 증명 생성, RPC를 처리합니다.
- **Bitcoin Core의 JSON-RPC 방식**을 사용합니다: 동일한 메서드 이름, 필드 형태, 인증, 오류 코드 — 많은 Bitcoin RPC 클라이언트가 별도 수정 없이 Zcash와 함께 작동합니다.
- **Orchard (shielded) 주소가 기본값**이며, 투명 주소(t-address)와 Sapling 지원은 월렛별로 명시적인 opt-in이 필요합니다.
- 로컬 JSON-RPC를 통해 **자체 호스팅된 [Zebra](Zebra_Full_Node.md) 전체 노드**에 연결합니다 — lightwalletd는 필요하지 않습니다.
- **기본적으로 stateless**하게 설계되어 전체 월렛을 시드 문구만으로 복구할 수 있으므로 데이터 디렉터리는 폐기 가능입니다.
- **zcashd의 완전한 대체품은 아닙니다**: 프라이버시와 안전성을 위해 의도적으로 설계 차이를 두고 Zcash RPC 메서드의 일부만 구현합니다.
- 수수료는 **ZIP-317**을 따르며(결정론적 수수료 계산), 사용자가 지정한 수수료는 거부됩니다.
- 익숙한 Bitcoin RPC 인터페이스를 통해 **shielded 메모(ZIP-302)**를 지원합니다.

---

## ZECD는 어떤 문제를 해결하나요?

`zcashd`는 2016년에 Bitcoin의 C++ 코드베이스를 포크하여 만들어진 Zcash의 원래 노드 겸 월렛이었습니다. 시간이 지나면서 이 구조는 여러 문제를 낳았습니다. 코드는 유지보수가 어렵고, 월렛이 노드와 강하게 결합되어 있으며, shielded 주소와 함께 투명 주소가 동등한 1급 옵션처럼 제시됩니다.

ZECD는 월렛 책임을 합의(consensus) 계층과 분리합니다. 애플리케이션과 Zebra 전체 노드 사이에 위치하는 **전용 월렛 레이어**로서 다음을 제공합니다:

- librustzcash(Zodl과 Zingo를 구동하는 동일한 라이브러리)를 기반으로 한 깔끔하고 현대적인 Rust 구현
- 프라이버시 기본 설계(별도 설정이 없다면 Orchard 주소 사용)
- Zcash 전용 도구를 따로 배울 필요를 없애는 Bitcoin 호환 RPC 인터페이스
- 컨테이너 및 클라우드 배포에 적합한 무상태, 시드 복구 가능 아키텍처

---

## 아키텍처

ZECD는 3계층 모델로 동작합니다:

```
Your app / Bitcoin RPC client
        ↓  JSON-RPC
       ZECD
   (keys, scanning, proving, RPC)
        ↓  JSON-RPC (local only)
       Zebra
   (full node — consensus, mempool, chain data)
```

ZECD는 Zebra와 **오직 로컬 JSON-RPC를 통해서만** 통신합니다 — 피어투피어 네트워킹도 없고, 서드파티 인덱서도 없고, lightwalletd도 없습니다. Zebra 연결은 의도적으로 로컬 전용입니다. ZECD는 별도의 안전한 외부 터널(예: WireGuard 또는 SSH)용으로 명시 설정되지 않는 한, 전역 라우팅 가능한 호스트로 자격 증명을 전송하지 않습니다.

---

## 주요 기능

### Shielded-First, 기본값은 Orchard

ZECD는 Orchard Unified Address를 기본 주소 유형으로 사용합니다. Sapling 및 투명 풀(t-address)은 월렛별로 명시적인 설정이 필요합니다. 이 설계는 오래된 Zcash 도구에서 흔한 프라이버시 함정인 실수로 투명 전송을 하는 위험을 줄여줍니다.

프라이버시 정책은 호출별 또는 전역 `[spend] privacy_policy`에서 설정할 수 있습니다:

| 정책 | 동작 |
|--------|----------|
| `AllowRevealedRecipients` (기본값) | 투명 수신자에게 보내는 것을 허용하며, 온체인에 금액과 수신자가 드러남 |
| `AllowRevealedAmounts` | 크로스풀 전송(Sapling↔Orchard)은 허용하지만 투명 수신자는 거부 |
| `FullPrivacy` | 하나의 풀 내 완전 shielded 전송만 허용하며, 투명 수신자와 크로스풀 전송 모두 거부 |
| `AllowFullyTransparent` | 투명 UTXO로 자금이 조달되는 t→t 전송도 허용 |

### Bitcoin Core RPC 호환성

ZECD는 다음 영역 전반에서 Bitcoin Core의 JSON-RPC 방식을 구현합니다:

- 메서드 이름(예: `getblockchaininfo`, `getbalance`, `getnewaddress`, `listtransactions`, `sendtoaddress`, `sendmany`)
- 응답의 필드 이름과 타입
- JSON-RPC 1.0 엔벌로프 구조
- Basic auth, `rpcauth` 항목, 쿠키 파일 인증
- 오류 코드와 HTTP 상태 매핑(오류 본문이 포함된 HTTP 500, 401 의미론)

이는 기존의 많은 Bitcoin 결제 라이브러리, 거래소 통합, 모니터링 도구가 코드 변경이 거의 없거나 전혀 없이 ZECD를 통해 Zcash와 상호작용할 수 있음을 의미합니다.

적합성 테스트 스위트(140개 이상 검사)는 라이브 regtest 데몬을 대상으로 모든 PR마다 실행되며, 공개 testnet에서도 검증되었습니다.

### Shielded 메모 (ZIP-302)

ZECD는 익숙한 Bitcoin RPC 인터페이스를 통해 Zcash의 shielded 메모 기능을 노출합니다 — 이는 표준 Bitcoin 도구에서는 사용할 수 없는 기능입니다:

- `sendtoaddress`는 추가적인 마지막 파라미터로 선택적 hex 메모를 받습니다(최대 512바이트, 투명 수신자에게는 거부됨)
- `listtransactions`와 `gettransaction`의 거래 내역 항목에는 출력에 메모가 포함된 경우 `memo`(hex)와 `memoStr`(디코딩된 텍스트) 필드가 포함됩니다
- shielded 수신자에 대한 0금액 전송을 메모 전용 용도로 지원합니다(`z_sendmany`의 "memo-only-send" 패턴)

이 덕분에 ZECD는 결제와 함께 비공개 온체인 메시징이 필요한 애플리케이션에 적합합니다.

### 기본적으로 Stateless

ZECD는 **시드만으로 복구했을 때 다시 구축할 수 없는 오프체인 상태를 저장하지 않습니다**. 월렛 데이터베이스(`data.sqlite`)는 시드 문구로부터 완전히 유도 가능하며, shielded 자금은 무조건 복구되고 투명 자금은 설정된 갭 한도까지 복구됩니다.

시드에서 월렛을 복구하려면:

```sh
zecd init --restore --birthday <block-height>
```

이로 인해 데이터 디렉터리는 **폐기 가능**합니다. 영구 볼륨이 없는 컨테이너가 시작할 때마다 시드로부터 다시 구축되더라도 중요한 것은 아무것도 잃지 않습니다. 운영자는 자신이 배포한 주소를 추적할 책임이 있습니다 — ZECD는 온체인에서 자금을 수신한 주소만 기억합니다.

라벨은 의도적으로 제외되었습니다. 라벨은 온체인 소스가 없고 시드로부터 재구성할 수 없기 때문에, ZECD는 아예 이를 지원하지 않습니다. 라벨 메서드를 호출하면 `method-not-found` 오류(`-32601`)가 반환됩니다.

### lightwalletd 의존성 없음

ZECD는 Zebra의 JSON-RPC로부터 compact block, 트리 상태, mempool 가시성을 직접 도출합니다. 운영하거나 유지해야 할 lightwalletd가 없으므로 자체 호스팅 배포의 운영 복잡성을 줄여줍니다.

### 클라우드 네이티브 및 컨테이너화 배포

ZECD의 stateless 아키텍처는 Docker 및 Kubernetes 환경을 위해 설계되었습니다:

- 저장소에서 전체 Docker Compose 스택(`zebra → zecd`) 제공
- 구성 가능한 readiness probe(`synced` 또는 `connected`)를 갖춘 포트 `9233`의 헬스 엔드포인트
- 로그 집계 파이프라인용 구조화된 JSON 로깅 옵션
- ZIP-317 결정론적 수수료 — 수수료 오라클이나 수동 수수료 설정 불필요
- `bootstrap_from_keys`(기본 활성화): `keys.toml` 옆의 빈 데이터 디렉터리는 시작 시 월렛을 자동 재구축 — 하나의 Secret을 마운트하고 빈 PVC로 시작하는 방식으로 배포 가능

---

## 키 보관 모델

ZECD는 배포 및 보안 요구 사항에 맞는 세 가지 키 보관 모델을 지원합니다:

### 1. 비암호화 (기본값 — 자동 잠금 해제)

`keys.toml`의 시드 니모닉은 **age identity 파일**(`identity.txt`)로 래핑됩니다. 기본값인 `auto_unlock = true`에서는 시작 시 시드가 메모리로 복호화되므로 전송이 무인으로 가능하며 `walletpassphrase` 호출이 필요하지 않습니다.

적합한 경우: 자동화된 결제 프로세서, 거래소 핫월렛, 개발자 환경.

```sh
zecd init --datadir ./data --wallet default --account-name primary
```

> 메인넷에서는 `identity.txt`를 데이터 디렉터리 **밖에** 저장하세요 — 두 파일을 모두 읽을 수 있는 사람은 지출 권한을 갖게 됩니다.

### 2. 암호화됨 (패스프레이즈 보호)

니모닉은 identity 파일 대신 패스프레이즈(age scrypt)로 래핑됩니다. 월렛은 잠긴 상태로 시작하며, `walletpassphrase "<pass>" <timeout>`은 지정된 기간 동안 잠금을 해제하고 시간이 지나면 자동으로 다시 잠깁니다 — Bitcoin Core의 암호화 월렛 동작과 동일합니다.

적합한 경우: 무인 지출 권한이 필요 없는 핫월렛, 대화형 운영자 워크플로.

```sh
zecd init --datadir ./data --encrypt
# later: walletpassphrase "my-passphrase" 300
```

### 3. Watch-Only (UFVK — 지출 키 없음)

다른 월렛에서 내보낸 Unified Full Viewing Key(UFVK)로 초기화됩니다. 수신, 스캔, 잔액 보고는 가능하지만 거래에 서명할 수는 없습니다. 서명 월렛과 분리된 모니터링, 인보이스 발행, 감사 노드에 이상적입니다.

```sh
# On the signing wallet's host:
zecd export-ufvk

# On the watch-only host:
zecd init --datadir ./data-watch --ufvk "uview1..." --birthday <height>
```

---

## 백업 및 복구

자금은 **니모닉만으로** 복구할 수 있습니다. 그 외 모든 것은 캐시입니다.

| 아티팩트 | 위치 | 보호하는 것 | 백업 필요? |
|----------|----------|-----------------|----------|
| **24단어 니모닉** | `zecd init` 시 한 번 표시됨 | 자금 자체 — 분실 시 영구 손실 | **예 — 오프라인(종이/HSM)** |
| `keys.toml` | `<wallet dir>/keys.toml` | 암호화된 시드 + birthday + 네트워크 | **예 — Secret으로** |
| `identity.txt` | `[keys] age_identity` | `keys.toml` 복호화(지출 권한) | **예 — `keys.toml`과 별도로** |
| Birthday 높이 | `keys.toml` 내부 | 복구를 빠르게 만듦(첫 거래 이전 어느 높이든 가능) | 니모닉과 함께 기록 |
| `data.sqlite` | `<wallet dir>/data.sqlite` | 월렛 캐시 — 복구 시 시드로 재구축됨 | 아니오 — 폐기 가능 |
| `blocks/` | `<wallet dir>/blocks/` | Compact block 캐시 | 아니오 — 절대 배포하지 말 것; 크게 늘어날 수 있음 |
| `.cookie` | `<datadir>/.cookie` | 일시적 RPC 쿠키 | 아니오 — 시작 시 재생성됨 |

> **데이터 디렉터리는 반드시 호스트 로컬이어야 합니다.** ZECD의 단일 인스턴스 잠금(``<datadir>/.lock``)은 OS advisory lock이며 호스트 간에는 적용되지 않습니다. 데이터 디렉터리를 여러 머신(NFS, Kubernetes `ReadWriteMany`)에서 읽기-쓰기로 공유하지 마세요 — ZECD 인스턴스 두 개가 월렛 DB를 손상시킬 수 있습니다. Kubernetes에서는 `ReadWriteOnce` 볼륨을 사용하세요.

---

## RPC 메서드 안전 목록

자격 증명 유출이 치명적일 수 있는 배포를 위해, ZECD는 RPC 인터페이스를 선택된 메서드 하위 집합으로 제한하는 기능을 지원합니다:

```toml
[rpc]
allowed_methods = ["getblockchaininfo", "getbalance", "getnewaddress", "listtransactions"]
```

목록에 없는 메서드는 모두 `-32601`(HTTP 404)을 반환합니다 — 존재하지 않는 메서드와 구별되지 않으므로, 잠금이 강한 서버는 비활성화한 항목에 대해 아무 정보도 드러내지 않습니다. 수신 전용 인보이서는 손상된 클라이언트로 인한 피해 범위를 최소화하기 위해 `sendtoaddress`, `sendmany`, `stop`을 비활성화할 수 있습니다.

---

## Bitcoin Core RPC와의 주요 차이점

Bitcoin 또는 zcashd 도구에서 이전하는 개발자는 다음과 같은 의도적인 차이를 알아두어야 합니다:

| 동작 | Bitcoin Core | ZECD |
|----------|-------------|------|
| 주소 형식 | `1...` / `bc1...` | `u1...` (Orchard Unified Address) — 문자열 파싱 기반 클라이언트에서는 Bitcoin 주소로 해석되지 않음 |
| 라벨 | 완전한 라벨 저장소 | 구현되지 않음 — `setlabel`, `listlabels` 등은 `-32601` 반환 |
| 수수료 | 사용자 설정 가능; 수수료 시장 기반 | ZIP-317 결정론적 방식만 지원; `settxfee`, `fee_rate`, `subtractfeefromamount`는 `-8`과 함께 거부 |
| 메모 | 지원되지 않음 | `sendtoaddress`가 hex 메모를 허용; 내역에는 `memo` + `memoStr` 필드 포함 |
| 지출 가능한 확인 수 | 1 | 3(자신의 잔돈) / 10(제3자) — `trusted_confirmations` / `untrusted_confirmations`로 설정 가능 |
| 리오그 시 `listsinceblock` | 포크 지점까지 되짚음 | 커서가 리오그로 사라진 경우 `-5`(Block not found) 반환 — 파라미터 없는 호출로 기준 재설정 |
| `sendmany`의 중복 수신자 | 오류 | ZECD가 보기 전에 JSON 파서가 중복을 병합함(마지막 값 우선) — 같은 주소를 두 번 나열하지 말 것 |
| 초기 동기화 중 잔액 | 블록되거나 워밍업 상태 | 부분 잔액을 제공 — 자동화는 `GET /readyz` 기준으로 제어할 것(완전 동기화 및 향상 백로그 소진 전까지 503 반환) |
| `getbalance`에서 `minconf 0` | 0-conf 잔액 | 1로 처리 — shielded 노트는 채굴 전에는 절대 지출 가능하지 않음 |

---

## 빠른 시작

**사전 요구 사항:** `rpc.listen_addr = 127.0.0.1:18234`(testnet)로 설정된 Zebra가 로컬에서 실행 중이어야 합니다.

crates.io에서 설치(0.4.3+):

```sh
cargo install zecd
```

또는 소스에서 빌드:

```sh
git clone https://github.com/zecrocks/zecd && cd zecd
cargo build --release
```

```sh
# 1. testnet 월렛 초기화(24단어 니모닉과 계정 생성)
zecd --datadir ./data --testnet init --wallet default --account-name primary

# 2. 데몬 시작(백그라운드에서 동기화, 포트 18232에서 JSON-RPC 제공)
zecd --datadir ./data --testnet \
    --rpcuser zec --rpcpassword secret --rpcbind 127.0.0.1 --rpcport 18232
```

**curl로 상호작용:**

```sh
curl -s --user zec:secret --data-binary \
  '{"jsonrpc":"1.0","id":"1","method":"getblockchaininfo","params":[]}' \
  -H 'content-type: text/plain;' http://127.0.0.1:18232/
```

**Python으로 상호작용(Bitcoin RPC 라이브러리 사용):**

```python
from bitcoinrpc.authproxy import AuthServiceProxy
rpc = AuthServiceProxy("http://zec:secret@127.0.0.1:18232")
print(rpc.getblockchaininfo())
addr = rpc.getnewaddress()          # returns a u1... Orchard Unified Address
print(rpc.getbalance())
print(rpc.listtransactions("*", 20))

# Send with a shielded memo
rpc.sendtoaddress(addr, 0.001, "", "", False, "48656c6c6f205a6563617368")  # hex memo
```

**시드에서 복구:**

```sh
zecd --datadir ./data init --restore --birthday 2500000
# paste your 24-word mnemonic when prompted
```

---

## 기본 포트

| 네트워크 | ZECD RPC | Zebra RPC (백엔드) | 헬스 |
|---------|----------|---------------------|--------|
| Mainnet | 8232 | 8234 | 9233 |
| Testnet | 18232 | 18234 | 9233 |

---

## ZECD vs. zcashd vs. Zaino

| | zcashd | Zaino | ZECD |
|--|--------|-------|------|
| 역할 | 전체 노드 + 월렛 | 인덱서(lightwalletd 대체) | 월렛 서버 전용 |
| 언어 | C++ | Rust | Rust |
| 상태 | 지원 중단 예정 | 활성 | 활성 (v0.5.0-rc3, 2026년 7월) |
| 기본 풀 | 투명 | 해당 없음 | Orchard (shielded) |
| RPC 방식 | zcashd 전용 | gRPC (lightwalletd) | Bitcoin Core JSON-RPC |
| 전체 노드 필요 | 예(자체 포함) | Zebra 또는 zcashd | Zebra |
| Stateless 복구 | 아니오 | 해당 없음 | 예(시드만으로) |
| Shielded 메모 | 예(`z_sendmany`) | 해당 없음 | 예(Bitcoin RPC 인터페이스) |
| Watch-only (UFVK) | 예 | 예 | 예 |
| 클라우드 네이티브 | 아니오 | 부분적 | 예 |
| 설치 | 빌드/바이너리 | 빌드 | `cargo install zecd` |

---

## 관련 페이지

- [Zebra 전체 노드](Zebra_Full_Node.md) — ZECD가 연결하는 전체 노드
- [Zaino 인덱서](Zaino.md) — 대안적인 인덱서 접근 방식(lightwalletd 대체)
- [Zakura 노드](Zakura_Node.md) — 또 다른 전체 노드 구현(Zebra의 포크)
- [Viewing Keys](Viewing_Keys.md) — ZECD가 계정 viewing key를 사용해 체인을 스캔하는 방법
- [월렛](/using-zcash/wallets) — 월렛 생태계 개요

## 리소스

- [ZECD GitHub (zecrocks/zecd)](https://github.com/zecrocks/zecd)
- [ZECD 운영 런북](https://github.com/zecrocks/zecd/blob/main/docs/OPERATIONS.md)
- [zec.rocks](https://zec.rocks)
- [librustzcash — 핵심 Zcash 암호화 라이브러리](https://github.com/zcash/librustzcash)
- [ZIP-317: 비례 전송 수수료 메커니즘](https://zips.z.cash/zip-0317)
- [ZIP-302: Shielded 메모](https://zips.z.cash/zip-0302)
- [Zodl 월렛 (librustzcash 호환)](https://github.com/zodl-inc/zodl-ios)
