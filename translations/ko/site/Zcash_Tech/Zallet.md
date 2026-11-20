<a href="https://github.com/zechub/zechub/edit/main/site/Zcash_Tech/Zallet.md" target="_blank">
  <img src="https://img.shields.io/badge/Edit-blue" alt="페이지 편집"/>
</a>

# Zallet

Zallet은 Rust로 작성된 풀 노드 Zcash 지갑입니다. `zcashd`에 내장되어 있던 지갑을 대체합니다. `zcashd`이 2026년 7월 18일 블록 높이 3417100에서 지원 종료로 중단된 뒤, 합의와 지갑 기능이 분리되었습니다. **Zebra** 또는 **Zakura**이 체인을 검증하고, **Zallet**이 키를 보관하고 노트를 스캔하며 지갑 JSON-RPC를 제공합니다.

Zallet은 현재 **베타** 단계입니다. 아직 충분한 검토가 이루어지지 않았습니다. 호환성을 깨는 변경으로 지갑을 삭제하고 다시 만들어야 할 수도 있습니다. [The Zallet Book](https://zcash.github.io/zallet/)의 보안 경고를 읽지 않았다면 많은 양의 ZEC을 보관하는 프로덕션용 수탁 지갑으로 취급하지 마세요.

---

## 요약

- Zallet은 **풀 노드 RPC 지갑**입니다. 모바일 라이트 지갑도 합의 노드도 아닙니다.
- `zcashd`의 지갑 기능을 대체합니다. 노드 기능은 [Zebra](Zebra_Full_Node.md) 또는 [Zakura](Zakura_Node.md)이 담당합니다.
- **Rust**로 작성되었으며 MIT / Apache-2.0 이중 라이선스를 적용하고, [zcash/zallet](https://github.com/zcash/zallet)에서 관리됩니다.
- 최신 공개 릴리스: **v0.1.0-beta.4** (2026년 11월 2일). [NU7](NU7.md)를 따르며 `zebrad` **7.0.0 이상**이 필요합니다.
- 체인 데이터는 하나의 백엔드인 **zebra**를 통해 읽습니다. 같은 호스트에 있는 `zebrad`의 상태 디렉터리에 대해 `ReadStateService`을 사용하고, Zebra의 JSON-RPC도 사용합니다. Zaino 백엔드는 v0.1.0-beta.4에서 제거되었습니다.
- **zcashd 호환 JSON-RPC**의 일부를 제공합니다. 일부 메서드는 변경되었고, 일부는 의도적으로 제외되었습니다.
- 키 자료는 항상 **age**로 암호화됩니다. 거래 내역, 주소, 뷰잉 키는 `wallet.db`에 평문으로 저장됩니다.
- 하나의 서명된 아카이브에 바이너리 두 개가 포함됩니다. `zallet`(실행기)와 `zallet-zebra`입니다. 지갑 동기화는 **Linux 전용**입니다. macOS나 Windows에서는 아직 체인 백엔드가 실행되지 않습니다.
- `zallet backup`(beta.4에서 추가)은 실행 중이거나 중지된 지갑의 일관된 스냅샷을 만듭니다.
- 공식 문서: [The Zallet Book](https://zcash.github.io/zallet/).

---

## Zallet이 필요한 이유

`zcashd`은 Bitcoin Core에서 파생된 합의 노드와 지갑을 하나의 프로세스에 묶었습니다. 이제 그런 구조는 사라졌습니다.

| 역할 | 기존 구성 | 현재 구성 |
|------|-----------|---------------|
| 합의 / P2P | `zcashd` | Zebra (`zebrad`) 또는 Zakura |
| 지갑 / 키 / 잔액 | `zcashd` `wallet.dat` | **Zallet** (`wallet.db`) |
| 라이트 클라이언트 인덱서 | `lightwalletd` | Zaino 또는 `lightwalletd` |

지갑을 노드에서 분리하면 다음과 같은 이점이 있습니다.

- 키를 옮기지 않고 노드 소프트웨어를 바꿀 수 있습니다(Zebra 또는 Zakura).
- 지갑 스캔과 지출 권한을 별도로 잠글 수 있는 프로세스에서 처리합니다.
- RPC 의미를 `zcashd`의 특이사항에 묶어두는 대신 ZIP 32 계정, 통합 주소, PCZT에 맞춰 발전시킬 수 있습니다.

Zallet은 이전에 `zcashd`을 핫 월렛, 거래소 백엔드, 수도꼭지 또는 채굴 보상 지급 지갑으로 운영하던 운영자를 위한 지갑입니다.

---

## 상태

Zallet은 **베타** 단계입니다.

실제로는 다음을 의미합니다.

- 어떤 베타 버전에서든 호환성을 깨는 변경이 적용될 수 있습니다. 데이터 디렉터리를 삭제하고 처음부터 시작해야 할 수도 있습니다.
- `zcashd` 지갑 RPC가 모두 포팅된 것은 아닙니다.
- 포팅된 메서드 중 일부의 의미는 `zcashd`과 다릅니다. 통합하는 쪽에서는 [변경된 의미 페이지](https://zcash.github.io/zallet/zcashd/json_rpc.html)를 확인해야 합니다.
- 크레이트는 개발 중이며 충분한 검토를 거치지 않았습니다.
- Zallet은 **Rust 라이브러리가 아닙니다**. 라이브러리로 의존할 경우 보장되는 사항이 없습니다.

피드백은 [GitHub 이슈](https://github.com/zcash/zallet/issues/new) 또는 [Zcash R&D Discord](https://discord.gg/xpzPR53xtU)의 `#wallet-dev` 채널로 보내주세요.

의도한 RPC 표면이 마련되면 이후 안정화 단계로 전환할 계획입니다. 그때부터 호출자는 문서에 명시된 의미 차이를 포함해 Zallet의 메서드로 마이그레이션해야 합니다.

---

## 아키텍처

Zallet은 Cargo 워크스페이스로 나뉘어 있어 각 체인 백엔드가 자체 의존성 그래프를 추적할 수 있습니다. v0.1.0-beta.4부터는 zebra 백엔드만 제공됩니다.

```
zallet            launcher: reads `backend` in zallet.toml (default "zebra")
                  and execs zallet-zebra
zallet-core       shared wallet: CLI, config, JSON-RPC, SQLite DB, sync
zallet-zebra      zebra-state backend (ReadStateService + Zebra JSON-RPC)
```

두 바이너리는 같은 `wallet.db`을 엽니다. v0.1.0-beta.3까지는 `zallet-zaino` 백엔드도 있었습니다. `zallet.toml`에 `backend = "zaino"`라고 되어 있다면 `backend = "zebra"`으로 변경하세요. 지갑 데이터베이스는 마이그레이션할 필요가 없으며, 데이터 디렉터리의 이전 `zaino` 폴더는 삭제해도 됩니다.

zebra 백엔드는 `zebrad`의 상태 데이터베이스를 직접 읽으므로, `indexer` 기능을 활성화해 빌드한 `zebrad`과 해당 상태 디렉터리가 **같은 호스트에** 있어야 합니다. 한 컨테이너의 Zallet이 네트워크를 통해 다른 컨테이너의 `zebrad`과 통신하는 구성은 네트워크 전용 백엔드가 추가되기 전까지 지원되지 않습니다([zallet#900](https://github.com/zcash/zallet/pull/900)).

일반적인 배포 구성:

```
zebrad  (or Zakura)
   │  JSON-RPC / ReadStateService
   ▼
Zallet  (zallet-zebra)
   │  JSON-RPC on 127.0.0.1
   ▼
Your application, exchange, faucet, or operator scripts
```

Zallet은 **풀 노드 지갑**으로, 로컬 검증 노드를 필요로 합니다. 라이트 클라이언트가 아닙니다. 라이트 지갑과 컴팩트 블록 서버는 [Zaino](Zaino.md) 및 [Lightwallet Nodes](Lightwallet_Nodes.md)를 참조하세요.

Zcash Foundation의 [Z3](https://github.com/ZcashFoundation/z3) 컴포즈 스택은 Zebra와 Zallet을 함께 실행하며, 외부 라이트 클라이언트용으로 독립 실행형 Zaino을 선택적으로 실행할 수 있습니다. 고정된 이미지는 NU7 및 Zallet beta.4보다 이전 버전입니다. 사용하기 전에 [Z3 Stack](Z3_Stack.md)을 참조하세요.

---

## 계정, 주소, 키

Zallet은 `zcashd`의 단일 암시적 계정이 아니라 ZIP 32 계정을 중심으로 구성됩니다.

- 지갑 하나에 **여러 BIP 39 니모닉**을 보관할 수 있습니다. 각 니모닉은 독립적인 지출 루트이며 **시드 지문**(`zip32seedfp1…`)으로 식별됩니다.
- **계정**은 시드에서 ZIP 32 계정 인덱스를 사용해 파생됩니다. 하나의 Zallet 인스턴스 안에서는 로컬 **UUID**도 부여됩니다. 계정의 이식 가능한 식별자는 `(seedfp, account index)`입니다.
- 주소는 `z_getaddressforaccount`을 사용해 생성하는 **ZIP 316 통합 주소**입니다. 하나의 계정에 다양한 주소를 둘 수 있으며, 차폐 수신자는 온체인에서 서로 연결되지 않습니다.
- 가져온 지출 키(`z_importkey`)와 감시 전용 주소(`z_importaddress`)는 어떤 니모닉에도 속하지 않는 UUID 계정이 됩니다.
- 뷰잉 키를 내보내고 가져올 수 있습니다(`z_exportviewingkey`, `z_importviewingkey`). 통합 전체 뷰잉 키와 수신 뷰잉 키도 포함됩니다.

`getnewaddress`은 구현되지 않았습니다. `z_getnewaccount`과 `z_getaddressforaccount`을 사용하세요.

`keystore.require_backup`이 활성화되어 있으면(`zcashd`의 `walletrequirebackup`을 마이그레이션한 형태), 백업 확인이 되지 않은 니모닉에서 새로운 지출 권한을 파생하는 것을 Zallet이 거부합니다.

---

## 암호화와 백업

키 자료는 **항상** 암호화됩니다. 암호화되지 않은 모드는 없으며 `encryptwallet` RPC도 없습니다. `zcashd` 메서드는 완전히 지원된 적이 없습니다.

- 설정 과정에서 **age** ID가 생성됩니다. 기본 경로는 `{datadir}/encryption-identity.txt`입니다.
- 니모닉과 가져온 지출 키는 `wallet.db`에 age 암호문으로 저장됩니다.
- 데이터베이스의 나머지 부분은 **암호화되지 않습니다**. 누군가 파일을 얻으면 거래 내역, 주소, 뷰잉 키를 읽을 수 있습니다.
- ID에는 암호문을 적용할 수 있습니다(`generate-encryption-identity -p`). `walletpassphrase` RPC로 잠금을 해제하고 `walletlock`으로 잠급니다.
- ID 파일이나 암호문을 잃어버리면 지출 키를 복구할 수 없습니다. ID와 모든 니모닉, 그리고 보관 중인 `wallet.db` 사본은 별도로 암호화해 백업하세요.

Zallet이 실행 중일 때 `wallet.db`을 직접 복사하는 것은 안전한 백업 방법이 아닙니다. SQLite 파일이 손상될 수 있습니다. v0.1.0-beta.4부터는 [`backup` 명령](https://github.com/zcash/zallet/blob/main/book/src/cli/backup.md)을 사용하세요.

```bash
zallet -d /path/to/zallet/datadir backup /path/to/backups/
```

이 명령은 실행 중이거나 중지된 지갑의 거래 일관성이 보장되고 무결성을 확인한 스냅샷을 작성합니다. 디렉터리를 지정하면 파일 이름은 `zallet-wallet-backup-<UTC time>.db`이 되며, 기존 파일을 덮어쓰지 않습니다. 초기 동기화 중처럼 지갑에 쓰기가 계속되어 복사가 반복해서 재시작되면 10분 뒤 오류를 표시하고 중단합니다. 나중에 다시 시도하거나 먼저 지갑을 중지하세요. 백업에는 age ID 파일이 포함되지 않습니다. 이 파일은 한 번 백업해 데이터베이스 백업과 따로 보관하세요. 두 가지를 모두 가진 사람은 키를 복호화할 수 있습니다.

---

## JSON-RPC

Zallet은 HTTP와 Basic 인증을 통해 `zcashd` 지갑 RPC의 일부를 구현합니다. 루프백 주소에 바인딩하세요. 원격으로 사용할 때는 암호화된 터널을 거쳐야 합니다. `rpc.allow_insecure_remote_bind`도 존재하지만 안전하지 않습니다.

`zcashd`과 비교해 주목할 차이점은 다음과 같습니다.

- `getwalletinfo`의 잔액 필드는 비어 있습니다. `z_getbalances`, `z_getbalanceforaccount`, `z_gettotalbalance`를 사용하세요.
- 수수료는 **ZIP 317**을 따릅니다. `settxfee`은 없습니다.
- 지출 구성은 **PCZT**(부분 생성 Zcash 트랜잭션, ZIP 374)로 전환 중입니다. PCZT RPC는 베타 버전에서 추가되었습니다.
- 지갑이 동기화 중이거나 체인 재구성에서 복구 중일 때 전역 **동기화 잠금**이 잔액 및 지출 RPC를 차단합니다(`ClientInInitialDownload` / `ForbiddenBySafeMode`).

의도적으로 제외된 메서드에는 `createrawtransaction`, `fundrawtransaction`, `getnewaddress`, `getrawchangeaddress`, `keypoolrefill`, `importwallet`, `encryptwallet`이 있습니다. 대체 메서드는 [Zallet Book](https://zcash.github.io/zallet/zcashd/json_rpc.html)에 나와 있습니다.

---

## 시작하기

공식 설치 방법(Debian 패키지, Docker, 릴리스 바이너리)은 [설치 안내](https://zcash.github.io/zallet/guide/installation/index.html)에 있습니다. 릴리스 아카이브 이름은 `zallet-v<version>-linux-<amd64|arm64>.tar.gz`이며 `zallet`과 `zallet-zebra`이 포함됩니다. Docker 이미지는 `zodlinc/zallet`로 제공됩니다.

새 지갑을 만드는 기본 흐름:

```bash
# data directory; default is $HOME/.zallet
zallet -d /path/to/zallet/datadir example-config > /path/to/zallet/datadir/zallet.toml
# edit zallet.toml: network, indexer.validator_address, [indexer.read_state_service], rpc.bind

zallet -d /path/to/zallet/datadir generate-encryption-identity
zallet -d /path/to/zallet/datadir init-wallet-encryption
zallet -d /path/to/zallet/datadir generate-mnemonic
zallet -d /path/to/zallet/datadir confirm-backup
zallet -d /path/to/zallet/datadir start
```

`validator_address`을 사용해 `[indexer]`을 로컬 `zebrad` JSON-RPC 엔드포인트에 연결하세요. 이 옵션은 필수이며 기본값이 localhost가 아닙니다. zebra 백엔드에는 `[indexer.read_state_service]`와 `indexer` 기능을 활성화해 빌드한 `zebrad` 7.0.0 이상이 필요합니다. 해당 상태 디렉터리도 같은 호스트에 있어야 Zallet이 체인 상태를 직접 읽을 수 있습니다. `indexer.db_path`은 제거된 Zaino 백엔드만 설정했으므로 이제 경고와 함께 무시됩니다.

재현 가능한 이미지는 [StageX](https://codeberg.org/stagex/stagex/)(Docker 25 이상, containerd 이미지 저장소, GNU Make)을 사용해 빌드할 수 있습니다.

---

## zcashd에서 마이그레이션하기

잔액을 확인하고 복원 테스트를 마칠 때까지 기존 `zcashd` 데이터 디렉터리를 유지하세요.

```bash
zallet init-wallet-encryption
zallet migrate-zcash-conf --zcashd-datadir /path/to/zcashd/datadir \
  -o /path/to/zallet/datadir/zallet.toml
zallet migrate-zcashd-wallet --zcashd-datadir /path/to/zcashd/datadir
```

`migrate-zcashd-wallet`은 `zcashd-import` 기능이 활성화된 빌드에서만 사용할 수 있습니다. `wallet.dat`을 읽으려면 `zcashd`이 사용한 버전인 **Berkeley DB 6.2**의 `db_dump`이 필요합니다.

운영자용 단계별 안내: [마이그레이션 가이드: zcashd에서 Zebrad/Zallet](/guides/migration-guide-zcashd-to-zebrad-zallet)로

---

## Zallet과 다른 소프트웨어의 관계

| | Zallet | zecd | ZODL (Zashi) / Zingo / Zkool | Zebra / Zakura | Zaino |
|--|--------|------|------------------------------|----------------|-------|
| 설명 | 풀 노드 RPC 지갑 | 차폐 우선 지갑 서버 | 최종 사용자용 지갑 | 합의 노드 | 인덱서 / lightwalletd 대체재 |
| 대체 대상 | `zcashd` 지갑 | 바로 교체할 수 있는 `zcashd` 복제본은 아님 | 모바일 / 데스크톱 앱 | `zcashd` 노드 | `lightwalletd` |
| 로컬 노드 필요 여부 | 예 | 예 (기본값은 Zebra) | 아니요 (라이트 클라이언트) | 노드 자체입니다 | 예 |
| zcashd RPC 호환성 | 호환 경로로 설계됨 | 일부 선택된 메서드만 지원 | 해당 없음 | 부분 / Zakura 호환 모드 | API가 다름 |
| 수탁 모델 | 운영자가 `wallet.db`에서 키를 보관 | 시드로 복구 가능한 서버 | 사용자 기기의 키 | 지갑 없음 | 키 없음 |

Zallet과 **zecd**은 모두 Zebra 앞단에 둘 수 있습니다. Zallet 지갑 API와 `wallet.dat`에서의 마이그레이션 경로가 필요하면 `z_*`을 선택하세요. 차폐 우선 서버를 원하고 `zcashd` 복제본이 아니길 원한다면 zecd를 선택하세요.

이름을 공유하는 별도의 소비자용 제품이 [zallet.io](https://www.zallet.io/)에 있습니다. 해당 앱은 이 프로젝트와 다릅니다.

---

## 관련 페이지

- [풀 노드](Full_Nodes.md) — Zebra, Zakura, 그리고 폐기된 `zcashd` 노드
- [Zebra 풀 노드](Zebra_Full_Node.md) — 지갑 Zallet의 기본 백엔드가 읽는 노드
- [Zakura 노드](Zakura_Node.md) — 대체 검증 노드
- [Zaino](Zaino.md) — 인덱서 및 라이트 클라이언트 서버 (beta.4부터 Zallet 백엔드가 아님)
- [Z3 Stack](Z3_Stack.md) — Zebra + Zallet 컴포즈 스택
- [zecd](ZECD.md) — librustzcash 기반의 또 다른 지갑 서버 설계
- [Zcash지갑 동기화](Zcash_Wallet_Syncing.md) — 차폐 지갑이 체인을 스캔하는 방식
- [뷰잉 키](Viewing_Keys.md)

## 자료

- [The Zallet Book](https://zcash.github.io/zallet/)
- [GitHub의 zcash/zallet](https://github.com/zcash/zallet)
- [릴리스](https://github.com/zcash/zallet/releases) · [v0.1.0-beta.4 변경 기록](https://github.com/zcash/zallet/blob/v0.1.0-beta.4/CHANGELOG.md)
- [JSON-RPC 변경된 의미](https://zcash.github.io/zallet/zcashd/json_rpc.html)
- [ZecHub 마이그레이션 가이드](/guides/migration-guide-zcashd-to-zebrad-zallet)
- [ZecHub 라즈베리 파이 안내 (Zebra + Zallet)](/guides/raspberry-pi-4-full-node)
- [Z3 (Zebra + Zallet 컴포즈 스택)](https://github.com/ZcashFoundation/z3)
- [Zcash R&D Discord](https://discord.gg/xpzPR53xtU) — `#wallet-dev`
