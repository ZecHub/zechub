<a href="https://github.com/zechub/zechub/edit/main/site/Zcash_Tech/ZECD.md" target="_blank">
  <img src="https://img.shields.io/badge/Edit-blue" alt="페이지 편집"/>
</a>

# zecd — 거래정보 보호 우선 지갑 서버

zecd는 Zcash용 거래정보 보호 우선 지갑 서버로, [librustzcash](https://github.com/zcash/librustzcash)를 기반으로 구축되었으며 Bitcoin Core의 JSON-RPC 방언을 통해 제공됩니다. 개발자와 결제 통합 담당자에게 Zcash와 상호 작용할 수 있는 친숙한 Bitcoin 호환 API를 제공하면서, 가장 프라이버시가 높은 풀인 Orchard을 기본값으로 설정합니다. [zec.rocks](https://zec.rocks)에서 개발한 zecd는 최신 클라우드 네이티브 배포 환경에서 `zcashd`의 지갑 기능을 대체하도록 설계되었습니다.

**현재 버전:** 0.5.0-rc3 (2026년 7월 13일) — Ironwood(NU6.3) 지원 포함. `cargo install zecd`를 통해 설치하거나 공식 Docker 이미지를 사용하세요.

---

## 요약

- zecd는 **지갑 데몬(서버)**이며 풀 노드가 아닙니다. Zcash P2P 프로토콜을 사용하지 않고 키, 스캔, 증명 생성, RPC를 처리합니다.
- **Bitcoin Core의 JSON-RPC 방언**을 사용합니다. 메서드 이름, 필드 형식, 인증, 오류 코드가 동일하므로 많은 Bitcoin RPC 클라이언트가 별도 설정 없이 Zcash와 연동됩니다.
- **Orchard(거래정보 보호) 주소가 기본값**이며, 투명 주소(t-address) 및 Sapling 지원은 지갑별로 명시적으로 활성화해야 합니다.
- 로컬 JSON-RPC를 통해 **직접 운영하는 [Zebra](Zebra_Full_Node.md) 풀 노드**에 연결하며, lightwalletd는 필요하지 않습니다.
- **설계상 무상태**입니다. 지갑 전체를 seed phrase만으로 복구할 수 있으므로 데이터 디렉터리는 폐기해도 됩니다.
- **zcashd를 그대로 대체할 수는 없습니다.** Zcash RPC 메서드 중 일부만 구현하며, 프라이버시와 안전성을 위해 의도적으로 설계를 다르게 한 부분이 있습니다.
- 수수료는 **ZIP-317**(결정론적 수수료 계산)을 따르며, 사용자가 지정한 수수료는 거부됩니다.
- 익숙한 Bitcoin RPC 인터페이스를 통해 **거래정보 보호 메모(ZIP-302)**를 지원합니다.

---

## zecd는 어떤 문제를 해결하나요?

`zcashd`는 Zcash의 원래 노드와 지갑을 결합한 프로그램으로, 2016년에 Bitcoin의 C++ 코드베이스에서 포크되었습니다. 시간이 지나면서 여러 문제가 생겼습니다. 코드를 유지 관리하기 어렵고, 지갑이 노드와 긴밀하게 결합되어 있으며, 투명 주소가 거래정보 보호 주소와 함께 주요 선택지로 제시됩니다.

zecd는 지갑의 역할을 합의 기능과 분리합니다. 애플리케이션과 Zebra 풀 노드 사이에 위치하는 **전용 지갑 계층**으로서 다음을 제공합니다.

- librustzcash을 기반으로 구축한 깔끔하고 현대적인 Rust 구현(Zodl와 Zingo을 구동하는 것과 동일한 라이브러리)
- 프라이버시를 기본으로 고려한 설계(달리 설정하지 않으면 Orchard 주소 사용)
- Zcash 전용 도구를 새로 익힐 필요가 없는 Bitcoin 호환 RPC 인터페이스
- 컨테이너 및 클라우드 배포에 적합한 무상태 아키텍처로, seed phrase로 복구 가능

---

## 아키텍처

zecd는 3계층 모델로 작동합니다.

```
Your app / Bitcoin RPC client
        ↓  JSON-RPC
       zecd
   (keys, scanning, proving, RPC)
        ↓  JSON-RPC (local only)
       Zebra
   (full node — consensus, mempool, chain data)
```

zecd는 Zebra와 **로컬 JSON-RPC만을 통해** 통신합니다. 피어 투 피어 네트워킹, 타사 인덱서, lightwalletd는 사용하지 않습니다. Zebra 연결은 의도적으로 로컬에만 한정됩니다. zecd는 대역 외 보안 터널(예: WireGuard 또는 SSH)을 명시적으로 설정하지 않는 한, 전 세계에서 라우팅할 수 있는 호스트로 인증 정보를 보내지 않습니다.

---

## 주요 기능

### 거래정보 보호 우선, 기본값은 Orchard

zecd는 Orchard 통합 주소를 기본 주소 유형으로 사용합니다. Sapling 및 투명 주소(t-address) 풀은 지갑별로 명시적으로 설정해야 합니다. 이 설계는 이전 Zcash 도구에서 흔한 프라이버시 위험인 실수로 인한 투명 주소 전송 가능성을 줄여 줍니다.

프라이버시 정책은 각 호출별로 설정하거나 `[spend] privacy_policy`에서 전역으로 설정할 수 있습니다.

| 정책 | 동작 |
|--------|----------|
| `AllowRevealedRecipients`(기본값) | 투명 주소 수신자에게 전송할 수 있습니다. 금액과 수신자가 온체인에 공개됩니다. |
| `AllowRevealedAmounts` | 풀 간 전송(Sapling↔Orchard)은 허용하지만 투명 주소 수신자는 거부합니다. |
| `FullPrivacy` | 한 풀 안에서 완전히 거래정보가 보호되는 전송만 허용하며, 투명 주소 수신자 및 풀 간 전송은 거부합니다. |
| `AllowFullyTransparent` | 투명 UTXO로 자금을 조달하는 t→t 전송도 허용합니다. |

### Bitcoin Core RPC 호환성

zecd는 다음 항목 전반에 걸쳐 Bitcoin Core의 JSON-RPC 방언을 준수합니다.

- 메서드 이름(예: `getblockchaininfo`, `getbalance`, `getnewaddress`, `listtransactions`, `sendtoaddress`, `sendmany`)
- 응답의 필드 이름 및 유형
- JSON-RPC 1.0 봉투 구조
- 기본 인증, `rpcauth` 항목, 쿠키 파일 인증
- 오류 코드 및 HTTP 상태 매핑(오류 본문을 포함한 HTTP 500, 401 의미 체계)

따라서 기존 Bitcoin 결제 라이브러리, 거래소 통합 기능, 모니터링 도구 대부분은 코드를 거의 수정하거나 전혀 수정하지 않고 zecd를 통해 Zcash와 상호 작용할 수 있습니다.

준수 테스트 모음(140개 이상 검사)은 모든 PR에서 실제 regtest 데몬을 대상으로 실행되며, 공개 테스트넷에서도 검증되었습니다.

### 거래정보 보호 메모(ZIP-302)

zecd는 익숙한 Bitcoin RPC 인터페이스를 통해 Zcash의 거래정보 보호 메모 기능을 제공합니다. 이 기능은 표준 Bitcoin 도구에서는 사용할 수 없습니다.

- `sendtoaddress`는 선택적 16진수 메모를 마지막 추가 매개변수로 받습니다(최대 512바이트이며 투명 주소 수신자에게는 거부됨).
- `listtransactions` 및 `gettransaction`의 거래 내역 항목에는 출력에 메모가 있을 때 `memo`(16진수) 및 `memoStr`(디코딩된 텍스트) 필드가 포함됩니다.
- 메모만 보내는 사용 사례를 위해 거래정보 보호 주소 수신자에게 금액이 0인 전송을 지원합니다(`z_sendmany`의 "memo-only-send" 패턴).

따라서 zecd는 결제와 함께 프라이빗한 온체인 메시징이 필요한 애플리케이션에 적합합니다.

### 설계상 무상태

zecd는 **seed phrase만으로 복구할 수 없는 오프체인 상태를 저장하지 않습니다**. 지갑 데이터베이스(`data.sqlite`)는 seed phrase에서 전부 파생됩니다. 거래정보 보호 자금은 조건 없이 복구되며, 투명 자금은 설정된 갭 한도까지 복구됩니다.

seed phrase로 지갑을 복구하려면 다음과 같이 하세요.

```sh
zecd init --restore --birthday <block-height>
```

따라서 데이터 디렉터리는 **폐기 가능**합니다. 영구 볼륨 없이 컨테이너를 실행하고 시작할 때마다 seed phrase에서 다시 구축해도 중요한 데이터가 손실되지 않습니다. 운영자는 배포한 주소를 추적해야 합니다. zecd는 주소가 온체인에서 자금을 받은 후에만 해당 주소를 기억합니다.

레이블은 의도적으로 지원하지 않습니다. 레이블에는 온체인 출처가 없고 seed phrase로 재구성할 수도 없으므로 zecd는 레이블을 지원하지 않습니다. 레이블 메서드를 호출하면 `method-not-found` 오류(`-32601`)가 반환됩니다.

### lightwalletd 의존성 없음

zecd는 Zebra의 JSON-RPC에서 압축 블록, 트리 상태, 멤풀 정보를 직접 가져옵니다. 운영하거나 유지 관리해야 할 lightwalletd가 없으므로 직접 운영하는 배포 환경의 운영 복잡성이 줄어듭니다.

### 클라우드 네이티브 및 컨테이너 배포

zecd의 무상태 아키텍처는 Docker 및 Kubernetes 환경에 맞게 설계되었습니다.

- 저장소에서 전체 Docker Compose 스택(`zebra → zecd`)을 사용할 수 있습니다.
- 설정 가능한 준비 상태 프로브(`synced` 또는 `connected`)와 함께 포트 `9233`에서 상태 확인 엔드포인트를 제공합니다.
- 로그 집계 파이프라인용 구조화 JSON 로깅 옵션
- ZIP-317 결정론적 수수료로, 수수료 오라클이나 수동 수수료 설정이 필요하지 않습니다.
- `bootstrap_from_keys`(기본 활성화): `keys.toml` 옆의 빈 데이터 디렉터리는 시작 시 지갑을 자동으로 다시 구축합니다. Secret 하나를 마운트하고 비어 있는 PVC로 시작해 배포할 수 있습니다.

---

## 커스터디 모델

zecd는 배포 및 보안 요구 사항에 맞춰 3가지 키 커스터디 모델을 지원합니다.

### 1. 암호화되지 않은 방식(기본값 — 자동 잠금 해제)

`keys.toml`의 seed 니모닉은 **age identity 파일**(`identity.txt`)로 감쌉니다. 기본 `auto_unlock = true`에서는 시작 시 seed를 메모리에서 복호화하므로 전송을 자동으로 처리할 수 있으며 `walletpassphrase` 호출이 필요하지 않습니다.

적합한 용도: 자동화된 결제 지원 서비스, 거래소 핫 월렛, 개발자 환경.

```sh
zecd init --datadir ./data --wallet default --account-name primary
```

> 메인넷에서는 `identity.txt`을 데이터 디렉터리 **외부에** 보관하세요. 두 파일을 모두 읽을 수 있는 사람은 누구나 자금을 사용할 권한을 갖습니다.

### 2. 암호화된 방식(암호 구문 보호)

니모닉은 identity 파일 대신 암호 구문(age scrypt)으로 감쌉니다. 지갑은 잠긴 상태로 시작하며, `walletpassphrase "<pass>" <timeout>`로 지정된 기간 동안 잠금을 해제하고 시간이 지나면 자동으로 다시 잠깁니다. 이는 Bitcoin Core의 암호화된 지갑 동작과 일치합니다.

적합한 용도: 자동으로 자금을 사용할 권한이 필요하지 않은 핫 월렛, 운영자의 대화형 작업 흐름.

```sh
zecd init --datadir ./data --encrypt
# later: walletpassphrase "my-passphrase" 300
```

### 3. 감시 전용(UFVK — spending key 없음)

다른 지갑에서 내보낸 통합 Full Viewing Key(UFVK)로 초기화합니다. 자금을 받고, 스캔하고, 잔액을 보고할 수 있지만 거래에 서명할 수는 없습니다. 서명용 지갑과 분리된 모니터링, 청구서 발행 또는 감사용 노드에 적합합니다.

```sh
# On the signing wallet's host:
zecd export-ufvk

# On the watch-only host:
zecd init --datadir ./data-watch --ufvk "uview1..." --birthday <height>
```

---

## 백업 및 복구

자금은 **니모닉만으로** 복구할 수 있습니다. 나머지는 모두 캐시입니다.

| 항목 | 위치 | 보호 대상 | 백업 여부 |
|----------|----------|-----------------|----------|
| **24단어 니모닉** | `zecd init`에서 한 번 표시 | 자금 — 잃어버리면 영구적으로 손실됩니다. | **예 — 오프라인(종이/HSM)** |
| `keys.toml` | `<wallet dir>/keys.toml` | 암호화된 seed + 생일 + 네트워크 | **예 — Secret으로** |
| `identity.txt` | `[keys] age_identity` | `keys.toml` 복호화(자금 사용 권한) | **예 — `keys.toml`와 별도로** |
| 생일 높이 | `keys.toml` 내부 | 복구 속도를 높입니다(첫 거래 이전의 임의 높이). | 니모닉과 함께 기록 |
| `data.sqlite` | `<wallet dir>/data.sqlite` | 지갑 캐시 — 복구 시 seed에서 다시 구축됩니다. | 아니요 — 폐기 가능 |
| `blocks/` | `<wallet dir>/blocks/` | 압축 블록 캐시 | 아니요 — 절대 배포하지 마세요. 크기가 커질 수 있습니다. |
| `.cookie` | `<datadir>/.cookie` | 임시 RPC 쿠키 | 아니요 — 시작 시 다시 생성됩니다. |

> **데이터 디렉터리는 호스트 로컬이어야 합니다.** zecd의 단일 인스턴스 잠금(`<datadir>/.lock`)은 운영체제 자문 잠금이며 호스트 간에는 적용되지 않습니다. 데이터 디렉터리를 여러 머신에서 읽기-쓰기로 공유하지 마세요(NFS, Kubernetes `ReadWriteMany`). zecd 인스턴스 2개가 지갑 DB를 손상시킬 수 있습니다. Kubernetes에서 `ReadWriteOnce` 볼륨을 사용하세요.

---

## RPC 메서드 허용 목록

인증 정보 유출이 치명적일 수 있는 배포 환경을 위해, zecd는 RPC 인터페이스를 선택한 메서드 하위 집합으로 제한하는 기능을 지원합니다.

```toml
[rpc]
allowed_methods = ["getblockchaininfo", "getbalance", "getnewaddress", "listtransactions"]
```

목록에 없는 메서드는 `-32601`(HTTP 404)를 반환합니다. 존재하지 않는 메서드와 구별할 수 없으므로, 제한된 서버는 비활성화한 메서드에 관한 정보를 공개하지 않습니다. 수신 전용 청구 시스템에서는 `sendtoaddress`, `sendmany`, `stop`을 비활성화해 클라이언트가 침해되었을 때 피해 범위를 최소화할 수 있습니다.

---

## Bitcoin Core RPC와의 주요 차이점

Bitcoin 또는 zcashd 도구에서 마이그레이션하는 개발자는 다음과 같은 의도적인 차이점을 알아두어야 합니다.

| 동작 | Bitcoin Core | zecd |
|----------|-------------|------|
| 주소 형식 | `1...` / `bc1...` | `u1...`(Orchard 통합 주소) — 문자열 파싱 클라이언트에서는 Bitcoin 주소로 파싱할 수 없습니다. |
| 레이블 | 전체 레이블 저장소 | 구현되지 않음 — `setlabel`, `listlabels` 등은 `-32601`를 반환합니다. |
| 수수료 | 사용자가 설정 가능, 수수료 시장 | ZIP-317 결정론적 방식만 지원합니다. `settxfee`, `fee_rate`, `subtractfeefromamount`는 `-8`와 함께 거부됩니다. |
| 메모 | 지원되지 않음 | `sendtoaddress`에서 16진수 메모를 받으며, 내역에 `memo` + `memoStr` 필드가 있습니다. |
| 지출에 필요한 확인 수 | 1 | 3(자신의 거스름돈) / 10(제3자) — `trusted_confirmations` / `untrusted_confirmations`으로 설정할 수 있습니다. |
| 재구성 시 `listsinceblock` | 포크 지점까지 되돌아갑니다. | 커서가 재구성으로 사라진 경우 `-5`(블록을 찾을 수 없음)을 반환합니다. 매개변수 없는 호출로 기준점을 다시 설정하세요. |
| `sendmany`의 중복 수신자 | 오류 | zecd가 확인하기 전에 JSON 파서가 중복 항목을 하나로 합칩니다(마지막 값이 적용됨). 같은 주소를 두 번 나열하지 마세요. |
| 초기 동기화 중 잔액 | 차단 또는 준비 시간 필요 | 일부 잔액을 제공합니다. `GET /readyz`를 기준으로 자동화를 제어하세요(완전히 동기화되고 보강 대기열이 비워질 때까지 503을 반환합니다). |
| `getbalance`의 `minconf 0` | 확인 0회 잔액 | 1로 제공됩니다. 거래정보 보호 노트는 채굴되지 않은 상태에서는 절대 사용할 수 없습니다. |

---

## 빠른 시작

**사전 준비:** `rpc.listen_addr = 127.0.0.1:18234`(테스트넷)으로 로컬에서 실행 중인 Zebra.

crates.io에서 설치(0.4.3 이상):

```sh
cargo install zecd
```

또는 소스에서 빌드:

```sh
git clone https://github.com/zecrocks/zecd && cd zecd
cargo build --release
```

```sh
# 1. Initialize a testnet wallet (generates a 24-word mnemonic and an account)
zecd --datadir ./data --testnet init --wallet default --account-name primary

# 2. Start the daemon (syncs in background, serves JSON-RPC on port 18232)
zecd --datadir ./data --testnet \
    --rpcuser zec --rpcpassword secret --rpcbind 127.0.0.1 --rpcport 18232
```

**curl로 상호 작용:**

```sh
curl -s --user zec:secret --data-binary \
  '{"jsonrpc":"1.0","id":"1","method":"getblockchaininfo","params":[]}' \
  -H 'content-type: text/plain;' http://127.0.0.1:18232/
```

**Python으로 상호 작용(Bitcoin RPC 라이브러리 사용):**

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

**seed phrase에서 복구:**

```sh
zecd --datadir ./data init --restore --birthday 2500000
# paste your 24-word mnemonic when prompted
```

---

## 기본 포트

| 네트워크 | zecd RPC | Zebra RPC(백엔드) | 상태 확인 |
|---------|----------|---------------------|--------|
| 메인넷 | 8232 | 8234 | 9233 |
| 테스트넷 | 18232 | 18234 | 9233 |

---

## zecd와 zcashd, Zaino 비교

| | zcashd | Zaino | zecd |
|--|--------|-------|------|
| 역할 | 풀 노드 + 지갑 | 인덱서(lightwalletd 대체) | 지갑 서버 전용 |
| 언어 | C++ | Rust | Rust |
| 상태 | 지원 중단 | 운영 중 | 운영 중(v0.5.0-rc3, 2026년 7월) |
| 기본 풀 | 투명 | 해당 없음 | Orchard(거래정보 보호) |
| RPC 방언 | zcashd 전용 | gRPC(lightwalletd) | Bitcoin Core JSON-RPC |
| 풀 노드 필요 여부 | 예(자체 노드) | Zebra 또는 zcashd | Zebra |
| 무상태 복구 | 아니요 | 해당 없음 | 예(seed만 사용) |
| 거래정보 보호 메모 | 예(`z_sendmany`) | 해당 없음 | 예(Bitcoin RPC 인터페이스) |
| 감시 전용(UFVK) | 예 | 예 | 예 |
| 클라우드 네이티브 | 아니요 | 부분 지원 | 예 |
| 설치 | 빌드/바이너리 | 빌드 | `cargo install zecd` |

---

## 관련 페이지

- [Zebra 풀 노드](Zebra_Full_Node.md) — zecd가 연결하는 풀 노드
- [Zaino 인덱서](Zaino.md) — 대안 인덱서 방식(lightwalletd 대체)
- [Zakura 노드](Zakura_Node.md) — 또 다른 풀 노드 구현(Zebra의 포크)
- [Viewing Keys](Viewing_Keys.md) — zecd가 계정 viewing key를 사용해 체인을 스캔하는 방법
- [지갑](/using-zcash/wallets) — 지갑 생태계 개요

## 자료

- [zecd GitHub (zecrocks/zecd)](https://github.com/zecrocks/zecd)
- [zecd 운영 지침서](https://github.com/zecrocks/zecd/blob/main/docs/OPERATIONS.md)
- [zec.rocks](https://zec.rocks)
- [librustzcash — 핵심 Zcash 암호화 라이브러리](https://github.com/zcash/librustzcash)
- [ZIP-317: 비례 전송 수수료 메커니즘](https://zips.z.cash/zip-0317)
- [ZIP-302: 거래정보 보호 메모](https://zips.z.cash/zip-0302)
- [Zodl 지갑(librustzcash 호환)](https://github.com/zodl-inc/zodl-ios)
