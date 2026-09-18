<a href="https://github.com/zechub/zechub/edit/main/site/Zcash_Tech/Zallet.md" target="_blank">
  <img src="https://img.shields.io/badge/Edit-blue" alt="Edit Page"/>
</a>

# Zallet

Zallet은 Rust로 작성된 풀 노드 Zcash 지갑입니다. `zcashd`에 내장되었던 지갑의 대체품입니다. `zcashd`가 2026년 7월 18일 블록 높이 3417100에서 지원 종료 시점에 도달한 후 합의와 지갑 역할이 분할되었습니다. **Zebra** 또는 **Zakura**는 체인의 유효성을 검사하고 **Zallet**은 키를 보유하고 메모를 스캔하며 지갑 JSON-RPC를 노출합니다.

Zallet은 현재 **베타** 상태입니다. 전체 검토가 완료되지 않았습니다. 호환성을 깨는 변경으로 인해 지갑을 삭제하고 다시 만들어야 할 수 있습니다. [The Zallet Book](https://zcash.github.io/zallet/)의 보안 경고를 읽지 않고 많은 양의 ZEC에 대한 프로덕션 커스터디용 소프트웨어로 취급하지 마십시오.

---

## TL;DR

- Zallet은 **풀 노드 RPC 지갑**이며 모바일 라이트 지갑이 아니며 합의 노드가 아닙니다.
- `zcashd`의 지갑 절반을 대체합니다. 노드 절반은 [Zebra](Zebra_Full_Node.md) 또는 [Zakura](Zakura_Node.md)입니다.
- **Rust**로 작성, 이중 라이선스 MIT/Apache-2.0, [zcash/zallet](https://github.com/zcash/zallet)로 유지.
- 2026년 8월 말 현재 발표된 최신 릴리스: **v0.1.0-beta.3**.
- **zebra-state** (로컬 `zebrad`에 대해 직접 `ReadStateService`) 또는 **Zaino**의 두 백엔드 중 하나를 통해 체인 데이터에 접근합니다.
- **zcashd 호환 JSON-RPC** 하위 집합을 노출합니다. 일부 메서드가 변경되었습니다. 일부 메서드는 일부러 생략되었습니다.
- 키 자료는 항상 **age**로 암호화됩니다. 거래 내역, 주소 및 Viewing Key는 `wallet.db`에 암호화되지 않은 상태로 저장됩니다.
- 하나의 서명된 아카이브에 `zallet` (런처), `zallet-zebra` 및 `zallet-zaino`의 세 가지 바이너리를 제공합니다.
- 공식 문서: [The Zallet Book](https://zcash.github.io/zallet/).

---

## Zallet의 존재 이유

`zcashd`는 하나의 프로세스에서 비트코인 코어 파생 합의 노드와 지갑을 번들로 제공했습니다. 그 디자인은 사라졌습니다.

| 역할 | 기존 스택 | 현재 스택 |
|------|-----------|---------------|
| 합의/P2P| `zcashd`| Zebra (`zebrad`) 또는 Zakura|
| 지갑/키/잔액| `zcashd` `wallet.dat`| **Zallet** (`wallet.db`)|
| 라이트 클라이언트 인덱서| `lightwalletd`| Zaino 또는 `lightwalletd`|

노드에서 지갑을 분리하면 다음을 의미합니다.

- 노드 소프트웨어는 키를 옮기지 않고 교체할 수 있습니다 (Zebra 대 Zakura).
- 지갑 스캔 및 지갑 스캔과 지출 권한을 별도로 잠글 수 있는 프로세스에 둘 수 있습니다.
- RPC 의미 체계는 `zcashd`의 특성에 고정되지 않고 ZIP 32 계정, Unified Addresses 및 PCZT로 진화할 수 있습니다.

Zallet은 이전에 핫 지갑, 거래소 백엔드, faucet 또는 채굴 대금 지갑으로 `zcashd`를 실행한 운영자를 위한 지갑입니다.

---

## 상태

Zallet은 **베타** 버전입니다.

이것이 실제로 의미하는 바는 다음과 같습니다.

- 호환성을 깨는 변경이 어느 베타 버전에서든 적용될 수 있습니다. 데이터 디렉터리를 삭제하고 다시 시작해야 할 수도 있습니다.
- 모든 `zcashd` 지갑 RPC가 포팅된 것은 아닙니다.
- 일부 이식된 메서드의 의미는 `zcashd`와 다릅니다. 통합은 [altered-semantics page](https://zcash.github.io/zallet/zcashd/json_rpc.html)를 읽어야 합니다.
- 크레이트는 개발 중이며 완전히 검토되지 않았습니다.
- Zallet은 **Rust 라이브러리가 아닙니다**. 라이브러리로 의존할 경우 아무런 보장도 없습니다.

피드백은 [GitHub issues](https://github.com/zcash/zallet/issues/new) 또는 [Zcash R&D Discord](https://discord.gg/xpzPR53xtU)의 `#wallet-dev` 채널에 남길 수 있습니다.

의도된 RPC 기능 범위가 존재하면 나중에 안정 단계가 계획됩니다. 안정화 이후 호출자는 문서화된 의미 차이를 포함하여 Zallet의 메서드로 마이그레이션해야 합니다.

---

## 아키텍처

Zallet은 세 개의 Cargo 워크스페이스에 분할되어 두 개의 체인 백엔드가 서로 다른 의존성 그래프를 추적할 수 있습니다.

```
zallet            launcher: reads `backend` in zallet.toml (default "zebra")
                  and execs zallet-zebra or zallet-zaino
zallet-core       shared wallet: CLI, config, JSON-RPC, SQLite DB, sync
zallet-zebra      zebra-state backend (ReadStateService + Zebra JSON-RPC)
zallet-zaino      Zaino indexer backend
```

세 바이너리는 모두 **동일한** `wallet.db`를 엽니다. 런처는 런타임에 백엔드를 선택합니다. 백엔드 전환을 위해 다시 컴파일할 필요가 없습니다.

일반적인 배포:

```
zebrad  (or Zakura)
   │  JSON-RPC / ReadStateService
   ▼
Zallet  (zallet-zebra or zallet-zaino)
   │  JSON-RPC on 127.0.0.1
   ▼
Your application, exchange, faucet, or operator scripts
```

Zallet은 **풀 노드 지갑** 입니다. 로컬 검증 노드가 필요합니다. 라이트 클라이언트가 아닙니다. 라이트 지갑 및 컴팩트 블록 서버에 대해서는 [Zaino](Zaino.md) 및 [Lightwallet Nodes](Lightwallet_Nodes.md)를 참조하십시오.

Zcash Foundation의 [Z3](https://github.com/ZcashFoundation/z3) Compose 스택은 Zebra + Zallet를 함께 실행하며, 외부 라이트 클라이언트를 위한 독립형 Zaino 옵션이 있습니다.

---

## 계정, 주소 및 키

Zallet은 `zcashd`의 단일 암시적 계정이 아닌 ZIP 32 계정을 기반으로 구축됩니다.

- 지갑에는 **여러 BIP 39 니모닉**을 저장될 수 있습니다. 각 니모닉은 **시드 지문**(`zip32seedfp1…`)으로 식별되는 독립적인 지출 루트입니다.
- **계정**은 ZIP 32 계정 인덱스를 사용해 시드에서 파생됩니다. 하나의 Zallet 인스턴스 안에는 로컬 **UUID**도 있습니다. 계정의 이식 가능한 식별자는 `(seedfp, account index)`입니다.
- 주소는 `z_getaddressforaccount`로 생성된 **ZIP 316 Unified Addresses**입니다. 하나의 계정에는 여러 다변화 주소가 있을 수 있습니다. shielded receiver는 체인 상에서 연결할 수 없습니다.
- 가져온 지출 키(`z_importkey`)와 watch-only 주소(`z_importaddress`)는 니모닉이 포함되지 않는 UUID 계정이 됩니다.
- Viewing Key는 통합된 전체 Viewing Key와 Incoming Viewing Key를 포함하여 내보내고 가져올 수 있습니다 (`z_exportviewingkey`, `z_importviewingkey`).

`getnewaddress`가 구현되지 않았습니다. `z_getnewaccount` 및 `z_getaddressforaccount`를 사용하십시오.

`keystore.require_backup`이 켜져 있는 경우 (`zcashd`의 `walletrequirebackup`의 마이그레이션된 형태), Zallet은 백업이 확인되지 않은 니모닉에서 새로운 지출 권한을 파생하는 것을 거부합니다.

---

## 암호화 및 백업

키 자료는 **항상** 암호화됩니다. 암호화되지 않은 모드와 `encryptwallet` RPC가 없습니다. 이 `zcashd` 메서드는 완전히 지원되지 않았습니다.

- 설정하면 **age** identity, 기본 경로 `{datadir}/encryption-identity.txt`가 생성됩니다.
- 니모닉과 가져온 지출 키는 `wallet.db`에 age 암호문으로 저장됩니다.
- 나머지 데이터베이스는 **암호화되지** 않습니다. 누군가 파일을 확보하면 기록, 주소 및 Viewing Key를 읽을 수 있습니다.
- ID는 암호로 감쌀 수 있습니다(`generate-encryption-identity -p`). `walletpassphrase` RPC로 잠금을 해제하고 `walletlock`으로 잠급니다.
- identity 파일 또는 암호를 분실하면 지출 키를 복구할 수 없습니다. 보관하는 `wallet.db` 사본, 모든 니모닉 및 (별도로 암호화된) identity를 백업하세요.

Zallet이 실행되는 동안 `wallet.db`를 복사하는 것은 안전한 백업이 아닙니다. SQLite 파일이 불완전하게 복사될 수 있습니다. 프로세스를 중지한 뒤 복사하거나 공식 온라인 백업 명령을 기다리십시오.

---

## JSON-RPC

Zallet은 Basic 인증을 사용하여 HTTP를 통해 `zcashd` 지갑 RPC의 하위 집합을 구현합니다. 루프백 주소에 바인딩하세요. 원격 사용은 암호화된 터널을 통과해야 합니다. `rpc.allow_insecure_remote_bind`가 존재하며 안전하지 않습니다.

`zcashd`와의 주목할 만한 차이점:

- `getwalletinfo`의 잔액 필드가 비어 있습니다. `z_getbalances`, `z_getbalanceforaccount`, `z_gettotalbalance`를 사용합니다.
- 수수료는 **ZIP 317** 을 따릅니다. `settxfee`가 없습니다.
- 지출 생성은 **PCZT** (Partially Created Zcash Transaction, ZIP 374) 로 이동하고 있습니다. PCZT RPC가 베타 릴리스에 추가되었습니다.
- 글로벌 **동기화 잠금**은 지갑이 체인을 따라잡거나 재구성에서 복구하는 동안(`ClientInInitialDownload` / `ForbiddenBySafeMode`) 잔액과 지출 RPC를 차단합니다.

의도적으로 생략된 방법에는 `createrawtransaction`, `fundrawtransaction`, `getnewaddress`, `getrawchangeaddress`, `keypoolrefill`, `importwallet` 및 `encryptwallet`가 포함됩니다. 대체 메서드는 [Zallet Book](https://zcash.github.io/zallet/zcashd/json_rpc.html)에 나열되어 있습니다.

---

## 시작하기

공식 설치 경로 (Debian 패키지, Docker, 릴리스 바이너리)는 [installation guide](https://zcash.github.io/zallet/guide/installation/index.html)에 있습니다. 릴리스 아카이브의 이름은 `zallet-<version>-<arch>.tar.gz`이며 세 가지 바이너리를 모두 포함합니다.

최소 새 지갑 흐름:

```bash
# data directory; default is $HOME/.zallet
zallet -d /path/to/zallet/datadir example-config > /path/to/zallet/datadir/zallet.toml
# edit zallet.toml: network, backend, indexer / read-state, rpc.bind

zallet -d /path/to/zallet/datadir generate-encryption-identity
zallet -d /path/to/zallet/datadir init-wallet-encryption
zallet -d /path/to/zallet/datadir generate-mnemonic
zallet -d /path/to/zallet/datadir confirm-backup
zallet -d /path/to/zallet/datadir start
```

로컬 `zebrad` JSON-RPC 엔드포인트에서 `[indexer]`를 가리킵니다. zebra 백엔드는 또한 `[indexer.read_state_service]`와 Zallet이 체인 상태를 직접 읽을 수 있도록 인덱서 기능으로 구축된 `zebrad`를 원합니다.

재현 가능한 이미지는 [StageX](https://codeberg.org/stagex/stagex/) (Docker 25+, containerd image store, GNU Make) 로 만들 수 있습니다.

---

## zcashd에서 마이그레이션

잔액과 테스트된 복원이 확인될 때까지 이전 `zcashd` 데이터 디렉터리를 보관하십시오.

```bash
zallet init-wallet-encryption
zallet migrate-zcash-conf --zcashd-datadir /path/to/zcashd/datadir \
  -o /path/to/zallet/datadir/zallet.toml
zallet migrate-zcashd-wallet --zcashd-datadir /path/to/zcashd/datadir
```

`migrate-zcashd-wallet`은 `zcashd-import` 기능으로만 빌드됩니다. `wallet.dat`를 읽으려면 `zcashd`가 사용된 버전인 **Berkeley DB 6.2**의 `db_dump`가 필요합니다.

단계별 운영자 안내: [Migration Guide: zcashd to Zebrad/Zallet](/guides/migration-guide-zcashd-to-zebrad-zallet).

---

## Zallet과 다른 소프트웨어의 관계

| | Zallet| zecd| Zashi/ZODL/YWallet| Zebra/Zakura| Zaino|
|--|--------|------|------------------------|----------------|-------|
| 구분| 풀 노드 RPC 지갑| shielded 우선 지갑 서버| 최종 사용자 지갑| 합의 노드| 인덱서/lightwalletd 대체|
| 대체 대상| `zcashd` 지갑| drop-in `zcashd` 클론이 아님| 모바일/데스크톱 앱| `zcashd` 노드| `lightwalletd`|
| 로컬 노드가 필요합니다| 예 | 예 (기본적으로 Zebra)| 아니요 (라이트 클라이언트)| 노드입니다| 예 |
| zcashd RPC 호환성| 호환 경로로 설계| 선택된 소규모 하위 집합만| 해당 사항 없음| 부분 지원 / Zakura 호환 모드| 다른 API|
| 커스터디 모델| 운영자가 `wallet.db`에서 키를 보유함| 시드 복구 가능 서버| 사용자 장치 키| 지갑 없음| 키 없음|

Zallet과 **zecd**는 모두 Zebra 앞단에서 동작할 수 있습니다. `z_*` 지갑 RPC 기능과 `wallet.dat`에서 마이그레이션 경로가 필요할 때 Zallet를 선택하십시오. `zcashd` 클론을 명시적으로 **아닌** shielded 우선 서버를 원할 때 zecd를 선택하십시오.

[zallet.io](https://www.zallet.io/)에는 이름을 재사용하는 별도의 일반 사용자용 제품이 있습니다. 해당 앱은 이 프로젝트가 아닙니다.

---

## 관련 페이지

- [Full Nodes](Full_Nodes.md) — Zebra, Zakura 및 지원 종료된 `zcashd` 노드
- [Zebra Full Node](Zebra_Full_Node.md) — Zallet의 기본 백엔드가 읽는 노드
- [Zakura Node](Zakura_Node.md) — 대체 검증 노드
- [Zaino](Zaino.md) — 인덱서 백엔드 및 라이트 클라이언트 서버
- [ZECD](ZECD.md) — librustzcash의 또 다른 지갑 서버 디자인
- [Zcash Wallet Syncing](Zcash_Wallet_Syncing.md) — shielded 지갑이 체인을 스캔하는 방법
- [Viewing Keys](Viewing_Keys.md)

## 자료

- [The Zallet Book](https://zcash.github.io/zallet/)
- [zcash/zallet on GitHub](https://github.com/zcash/zallet)
- [Releases](https://github.com/zcash/zallet/releases)
- [JSON-RPC altered semantics](https://zcash.github.io/zallet/zcashd/json_rpc.html)
- [ZecHub migration guide](/guides/migration-guide-zcashd-to-zebrad-zallet)
- [ZecHub Raspberry Pi guide (Zebra + Zallet)](/guides/raspberry-pi-4-full-node)
- [Z3 (Zebra + Zallet compose stack)](https://github.com/ZcashFoundation/z3)
- [Zcash R&D Discord](https://discord.gg/xpzPR53xtU) — `#wallet-dev`
