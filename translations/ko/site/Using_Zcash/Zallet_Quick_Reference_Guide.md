---
<a href="https://github.com/zechub/zechub/edit/main/site/Using_Zcash/Zallet_Quick_Reference_Guide.md" target="_blank">
  <img src="https://img.shields.io/badge/Edit-blue" alt="Edit Page"/>
</a>

# Zallet 빠른 참조 가이드

## TL;DR

- Zallet은 Rust로 작성된 풀 노드 Zcash 지갑입니다. 이는 예전에 zcashd 내부에 있던 지갑을 대체합니다.
- zcashd는 2026년 7월 18일 지원 종료에 도달해 더 이상 실행되지 않습니다. 이제 Zebra가 노드 측을 담당하고, Zallet이 지갑 측을 담당합니다.
- Zallet은 이전에 `zcash-cli`를 사용하던 것과 비슷하게 `zallet rpc <command>`로 명령줄에서 제어합니다.
- 명령 이름 뒤의 모든 인수는 유효한 JSON이어야 하므로, 문자열 값은 이중 따옴표를 유지해야 합니다.
- Zallet은 아직 알파 단계입니다. 릴리스마다 명령이 바뀔 수 있으며, 모든 zcashd RPC가 아직 이식된 것은 아닙니다.

## 핵심 설명

Zallet은 zcashd 지갑이 사용하던 것과 같은 인터페이스 방식인 JSON-RPC를 통해 기능을 제공합니다. 잔액 확인, 계정 생성, 실드 결제 전송처럼 지갑에 원하는 작업은 모두 `zallet rpc`에 전달하는 명령입니다.

기존 `zcash-cli` 사용 습관과 다른 점은 두 가지이며, 초기 실수의 대부분은 여기서 발생합니다. 첫째, 인수는 일반 텍스트가 아니라 유효한 JSON이어야 하므로 문자열 인수는 셸 따옴표 안에서도 자체 따옴표를 가져야 합니다. 둘째, 사용 가능한 명령 집합은 실행 중인 알파 릴리스에 따라 달라지므로, 이 페이지를 포함한 어떤 문서보다도 현재 바이너리에 내장된 목록이 더 신뢰할 만합니다.

사용 가능한 모든 RPC를 나열하려면:

```bash
zallet rpc help
```

특정 RPC의 자세한 도움말을 보려면:

```bash
zallet rpc help '"<command>"'
```

> **중요:** 메서드 이름 뒤의 모든 인수는 **반드시 유효한 JSON**이어야 합니다.  
> 문자열 값은 반드시 `"value"` 형식으로 작성해야 합니다(이중 따옴표 포함).

## 흔한 실수

- **문자열 인수의 내부 따옴표를 빼먹는 것.** `zallet rpc validateaddress u1abc...`는 실패합니다. 주소가 JSON으로 전달되어야 하기 때문입니다. `'"u1abc..."'`처럼 작성해야 합니다.
- **모든 zcashd RPC가 여기에도 있다고 가정하는 것.** 이식 작업은 아직 진행 중입니다. 일부 메서드는 동일하게 동작하고, 일부는 사용법이 다르며, 일부는 아예 이관되지 않을 것입니다.
- **이 페이지가 바이너리보다 더 권위 있다고 여기는 것.** Zallet은 알파 단계이며 빠르게 바뀝니다. 여기 있는 명령이 작동하지 않으면 문제가 있다고 단정하기 전에 `zallet rpc help`를 확인하세요.
- **Zallet이 노드라고 기대하는 것.** 이것은 두 구성 요소 중 지갑 쪽입니다. 노드는 Zebra가 실행하고, Zallet은 그것과 통신합니다.

## RPC 명령

### decoderawtransaction

```bash
zallet rpc decoderawtransaction '"<hexstring>"'
```

| 매개변수   | 유형   | 필수 여부 | 설명                  |
|-------------|--------|----------|--------------------------|
| hexstring   | string | 예      | 트랜잭션 hex 문자열   |

---

### decodescript

```bash
zallet rpc decodescript '"<hexstring>"'
```

| 매개변수   | 유형   | 필수 여부 | 설명     |
|-------------|--------|----------|-----------------|
| hexstring   | string | 예      | 스크립트 hex      |

---

### getrawtransaction

```bash
zallet rpc getrawtransaction '"<txid>"' [verbose] ['"<blockhash>"']
```

| 매개변수  | 유형   | 필수 여부 | 기본값 | 설명                          |
|------------|--------|----------|---------|--------------------------------------|
| txid       | string | 예      |         | 트랜잭션 ID                       |
| verbose    | number | 아니요       | 0       | `0` = hex, 0이 아니면 = JSON 객체    |
| blockhash  | string | 아니요       |         | 검색을 이 블록으로 제한        |

---

### getwalletinfo

```bash
zallet rpc getwalletinfo
```

매개변수 없음.

---

### getwalletstatus

```bash
zallet rpc getwalletstatus
```

매개변수 없음.

---

### listaddresses

```bash
zallet rpc listaddresses
```

매개변수 없음.

---

### rpc.discover

```bash
zallet rpc rpc.discover
```

매개변수 없음. OpenRPC 스키마를 반환합니다.

---

### stop

```bash
zallet rpc stop
```

매개변수 없음. (Regtest 전용)

---

### validateaddress

```bash
zallet rpc validateaddress '"<address>"'
```

| 매개변수 | 유형   | 필수 여부 | 설명             |
|-----------|--------|----------|-------------------------|
| address   | string | 예      | 투명 주소     |

---

### verifymessage

```bash
zallet rpc verifymessage '"<address>"' '"<signature>"' '"<message>"'
```

| 매개변수  | 유형   | 필수 여부 | 설명             |
|------------|--------|----------|-------------------------|
| address    | string | 예      | 투명 주소     |
| signature  | string | 예      | Base64 서명        |
| message    | string | 예      | 원본 메시지        |

---

### walletlock

```bash
zallet rpc walletlock
```

매개변수 없음.

---

### walletpassphrase

```bash
zallet rpc walletpassphrase '"<passphrase>"' <timeout>
```

| 매개변수   | 유형   | 필수 여부 | 설명                          |
|-------------|--------|----------|--------------------------------------|
| passphrase  | string | 예      | 지갑 비밀번호                    |
| timeout     | number | 예      | 지갑 잠금 해제가 유지되는 시간(초)  |

---

### z_converttex

```bash
zallet rpc z_converttex '"<transparent_address>"'
```

| 매개변수             | 유형   | 필수 여부 | 설명                |
|-----------------------|--------|----------|----------------------------|
| transparent_address   | string | 예      | 변환할 P2PKH 주소   |

---

### z_exportkey

```bash
zallet rpc z_exportkey '"<sapling_address>"'
```

| 매개변수 | 유형   | 필수 여부 | 설명                                      |
|-----------|--------|----------|--------------------------------------------------|
| address   | string | 예      | spending key를 내보낼 Sapling 주소     |

> 지갑 잠금이 해제되어 있어야 합니다. Sapling spending key만 내보냅니다.

---

### z_getaccount

```bash
zallet rpc z_getaccount '"<account_uuid>"'
```

| 매개변수     | 유형   | 필수 여부 | 설명     |
|---------------|--------|----------|-----------------|
| account_uuid  | string | 예      | 계정 UUID    |

---

### z_getaddressforaccount

```bash
zallet rpc z_getaddressforaccount <account> ['["p2pkh","sapling","orchard"]'] [<diversifier_index>]
```

| 매개변수          | 유형            | 필수 여부 | 설명                              |
|--------------------|-----------------|----------|------------------------------------------|
| account            | string / number | 예      | 계정 UUID 또는 ZIP-32 계정 인덱스     |
| receiver_types     | array of string | 아니요       | 포함할 수신자 유형                |
| diversifier_index  | number          | 아니요       | 특정 diversifier 인덱스               |

---

### z_getbalanceforaccount

```bash
zallet rpc z_getbalanceforaccount <account> [<minconf>]
```

| 매개변수 | 유형            | 필수 여부 | 기본값 | 설명                      |
|-----------|-----------------|----------|---------|----------------------------------|
| account   | string / number | 예      |         | 계정 UUID 또는 ZIP-32 인덱스     |
| minconf   | number          | 아니요       | 1       | 최소 확인 수            |

---

### z_getbalances

```bash
zallet rpc z_getbalances [<minconf>]
```

| 매개변수 | 유형   | 필수 여부 | 기본값 | 설명               |
|-----------|--------|----------|---------|---------------------------|
| minconf   | number | 아니요       | 1       | 최소 확인 수     |

---

### z_getnewaccount

```bash
zallet rpc z_getnewaccount '"<account_name>"' ['"<seedfp>"']
```

| 매개변수     | 유형   | 필수 여부 | 설명                              |
|---------------|--------|----------|------------------------------------------|
| account_name  | string | 예      | 사람이 읽기 쉬운 이름                      |
| seedfp        | string | 아니요       | 지갑에 여러 시드가 있는 경우 필수    |

---

### z_getnotescount

```bash
zallet rpc z_getnotescount [<minconf>] [<as_of_height>]
```

| 매개변수     | 유형   | 필수 여부 | 기본값 | 설명                          |
|---------------|--------|----------|---------|--------------------------------------|
| minconf       | number | 아니요       | 1       | 최소 확인 수                |
| as_of_height  | number | 아니요       |         | 이 높이 기준으로 조회 (`-1` = tip) |

---

### z_getoperationresult

```bash
zallet rpc z_getoperationresult ['["opid1","opid2"]']
```

| 매개변수    | 유형            | 필수 여부 | 설명                              |
|--------------|-----------------|----------|------------------------------------------|
| operationid  | array of string | 아니요       | 작업 ID(생략 시 완료된 모든 작업)    |

---

### z_getoperationstatus

```bash
zallet rpc z_getoperationstatus ['["opid1","opid2"]']
```

| 매개변수    | 유형            | 필수 여부 | 설명                    |
|--------------|-----------------|----------|--------------------------------|
| operationid  | array of string | 아니요       | 작업 ID(생략 시 전체)   |

---

### z_gettotalbalance

```bash
zallet rpc z_gettotalbalance [<minconf>] [<include_watchonly>]
```

| 매개변수          | 유형    | 필수 여부 | 기본값 | 설명                     |
|--------------------|---------|----------|---------|---------------------------------|
| minconf            | number  | 아니요       | 1       | 최소 확인 수           |
| include_watchonly  | boolean | 아니요       | false   | watch-only 잔액 포함     |

---

### z_importaddress

```bash
zallet rpc z_importaddress '"<account_uuid>"' '"<hex_data>"' [<rescan>]
```

| 매개변수  | 유형    | 필수 여부 | 기본값 | 설명                          |
|------------|---------|----------|---------|--------------------------------------|
| account    | string  | 예      |         | 계정 UUID                         |
| hex_data   | string  | 예      |         | Hex 공개 키 또는 redeem script      |
| rescan     | boolean | 아니요       | true    | 가져오기 후 재스캔                  |

---

### z_importkey

```bash
zallet rpc z_importkey '"<key>"' ['"<rescan>"'] [<start_height>]
```

| 매개변수     | 유형   | 필수 여부 | 기본값        | 설명                              |
|---------------|--------|----------|----------------|------------------------------------------|
| key           | string | 예      |                | Sapling 확장 spending key            |
| rescan        | string | 아니요       | `"whenkeyisnew"` | `"yes"`, `"no"`, 또는 `"whenkeyisnew"`   |
| start_height  | number | 아니요       | 0              | 재스캔 시작 높이                      |

---

### z_listaccounts

```bash
zallet rpc z_listaccounts [<include_addresses>]
```

| 매개변수          | 유형    | 필수 여부 | 기본값 | 설명                              |
|--------------------|---------|----------|---------|------------------------------------------|
| include_addresses  | boolean | 아니요       | true    | 각 계정의 주소도 함께 반환   |

---

### z_listoperationids

```bash
zallet rpc z_listoperationids ['"<status>"']
```

| 매개변수 | 유형   | 필수 여부 | 설명                          |
|-----------|--------|----------|--------------------------------------|
| status    | string | 아니요       | 상태로 필터링(예: `"success"`)  |

---

### z_listtransactions

```bash
zallet rpc z_listtransactions ['"<account_uuid>"'] [<start_height>] [<end_height>] [<offset>] [<limit>]
```

| 매개변수      | 유형   | 필수 여부 | 설명                  |
|----------------|--------|----------|------------------------------|
| account_uuid   | string | 아니요       | 하나의 계정으로 제한         |
| start_height   | number | 아니요       | 포함되는 하한        |
| end_height     | number | 아니요       | 제외되는 상한        |
| offset         | number | 아니요       | 이 수만큼 결과 건너뛰기       |
| limit          | number | 아니요       | 반환할 최대 결과 수    |

---

### z_listunifiedreceivers

```bash
zallet rpc z_listunifiedreceivers '"<unified_address>"'
```

| 매개변수         | 유형   | 필수 여부 | 설명                  |
|-------------------|--------|----------|------------------------------|
| unified_address   | string | 예      | 검사할 Unified Address   |

---

### z_listunspent

```bash
zallet rpc z_listunspent [<minconf>] [<maxconf>] [<include_watchonly>] ['["addr1","addr2"]'] [<as_of_height>]
```

| 매개변수          | 유형            | 필수 여부 | 기본값 | 설명                          |
|--------------------|-----------------|----------|---------|--------------------------------------|
| minconf            | number          | 아니요       | 1       | 최소 확인 수                |
| maxconf            | number          | 아니요       | ∞       | 최대 확인 수                |
| include_watchonly  | boolean         | 아니요       | false   | watch-only 포함                   |
| addresses          | array of string | 아니요       |         | 이 주소들로 필터링            |
| as_of_height       | number          | 아니요       |         | 이 높이 기준으로 조회              |

---

### z_recoveraccounts

```bash
zallet rpc z_recoveraccounts '[{"name":"...","seedfp":"...","zip32_account_index":0,"birthday_height":123456}]'
```

| 매개변수 | 유형  | 필수 여부 | 설명                                                                 |
|-----------|-------|----------|-----------------------------------------------------------------------------|
| accounts  | array | 예      | 객체 배열: `name`, `seedfp`, `zip32_account_index`, `birthday_height` |

---

### z_sendmany

```bash
zallet rpc z_sendmany '"<fromaddress>"' '[{"address":"...","amount":1.23,"memo":"..."}]' [<minconf>] [null] ['"<privacy_policy>"']
```

| 매개변수        | 유형            | 필수 여부 | 기본값         | 설명                                      |
|------------------|-----------------|----------|-----------------|--------------------------------------------------|
| fromaddress      | string          | 예      |                 | 출발 주소 또는 `"ANY_TADDR"`                  |
| amounts          | array of object | 예      |                 | 수신자 (`address`, `amount`, 선택적 `memo`)|
| minconf          | number          | 아니요       |                 | 최소 확인 수                            |
| fee              | null            | 아니요       |                 | 반드시 `null`이어야 함 (ZIP-317 전용)                    |
| privacy_policy   | string          | 아니요       | `"FullPrivacy"` | 개인정보 보호 정책 문자열                            |

---

### z_shieldcoinbase

```bash
zallet rpc z_shieldcoinbase '"<fromaddress_or_account_uuid>"' '"<toaddress>"' [null] [<limit>] ['"<memo_hex>"'] ['"<privacy_policy>"']
```

| 매개변수        | 유형   | 필수 여부 | 설명                                      |
|------------------|--------|----------|--------------------------------------------------|
| fromaddress      | string | 예      | 투명 주소 또는 계정 UUID              |
| toaddress        | string | 예      | 실드 대상 주소                             |
| fee              | null   | 아니요       | 반드시 `null`이어야 함                                   |
| limit            | number | 아니요       | 실드할 coinbase UTXO 최대 개수           |
| memo             | string | 아니요       | hex로 인코딩된 메모                                 |
| privacy_policy   | string | 아니요       | `AllowRevealedSenders` 또는 `AllowLinkingAccountAddresses` |

---

### z_viewtransaction

```bash
zallet rpc z_viewtransaction '"<txid>"'
```

| 매개변수 | 유형   | 필수 여부 | 설명     |
|-----------|--------|----------|-----------------|
| txid      | string | 예      | 트랜잭션 ID  |

---

## 관련 페이지

- [마이그레이션 가이드: Zcashd에서 Zebrad와 Zallet으로](/guides/migration-guide-zcashd-to-zebrad-zallet) — 기존 zcashd 설정에서 단계별로 이전하는 방법
- [Zebra 풀 노드](/zcash-tech/zebra-full-node) — Zallet이 함께 작동하는 노드 구현체
- [풀 노드](/zcash-tech/full-nodes) — 풀 노드 실행에 필요한 것과 이를 원하는 이유
- [지갑](/using-zcash/wallets) — 풀 노드가 필요 이상일 경우의 더 가벼운 지갑 옵션
- [트랜잭션](/using-zcash/transactions) — 실드 트랜잭션과 투명 트랜잭션의 차이
