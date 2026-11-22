<a href="https://github.com/zechub/zechub/edit/main/site/Using_Zcash/Zallet_Quick_Reference_Guide.md" target="_blank">
  <img src="https://img.shields.io/badge/Edit-blue" alt="페이지 편집"/>
</a>

# Zallet 빠른 참조 가이드

## 요약

- Zallet는 Rust로 작성된 풀 노드 Zcash 지갑입니다. 이전에 zcashd 안에 있던 지갑을 대체합니다.
- zcashd은 2026년 7월 18일 지원 종료와 함께 작동을 멈췄으며, 더 이상 실행되지 않습니다. 이제 Zebra이 노드 측을 담당하고, Zallet가 지갑 측을 담당합니다.
- 이전에 `zcash-cli`를 사용했던 것과 비슷하게, 명령줄에서 `zallet rpc <command>`을 사용해 Zallet을 조작합니다.
- 명령 이름 뒤에 오는 모든 인수는 유효한 JSON이어야 하므로 문자열 값은 큰따옴표로 묶어야 합니다.
- Zallet은 베타 버전입니다. 릴리스마다 명령이 달라질 수 있으며, 모든 zcashd RPC가 아직 이식된 것은 아닙니다.

## 핵심 설명

Zallet는 JSON-RPC를 통해 기능을 제공하며, 이는 zcashd 지갑에서 사용하던 것과 같은 인터페이스 방식입니다. 잔액 확인, 계정 생성, 거래정보 보호 결제 전송 등 지갑에서 수행하려는 작업은 무엇이든 `zallet rpc`에 전달하는 명령입니다.

초기 실수의 대부분은 이전 `zcash-cli` 사용 방식과 다른 2가지 점에서 비롯됩니다. 첫째, 인수는 아무 형식 없는 텍스트가 아니라 유효한 JSON이어야 하므로, 문자열 인수는 셸 따옴표 안에 자체 따옴표를 포함해야 합니다. 둘째, 사용할 수 있는 명령은 실행 중인 베타 릴리스에 따라 달라지므로, 이 페이지를 포함한 어떤 문서보다 바이너리에 내장된 목록을 더 신뢰할 수 있습니다.

사용 가능한 모든 RPC를 나열하려면 다음을 입력합니다.

```bash
zallet rpc help
```

특정 RPC에 관한 자세한 도움말을 보려면 다음을 입력합니다.

```bash
zallet rpc help '"<command>"'
```

> **중요:** 메서드 이름 뒤에 오는 모든 인수는 **유효한 JSON이어야 합니다**.  
> 문자열 값은 `"value"`와 같이 작성해야 합니다(큰따옴표 포함).

## 흔히 하는 실수

- **문자열 인수에서 안쪽 따옴표를 빼는 경우.** `zallet rpc validateaddress u1abc...`는 실패합니다. 주소(address)가 JSON으로 전달되어야 하기 때문입니다. 다음과 같이 작성해야 합니다. `'"u1abc..."'`
- **여기서 모든 RPC가 존재한다고 가정하는 경우.** 포팅은 아직 진행 중입니다. 일부 메서드는 동일하게 작동하고, 일부는 사용 방법이 다르며, 일부는 아예 이식되지 않습니다.
- **이 페이지가 사용 중인 바이너리보다 정확하다고 여기는 경우.** Zallet는 베타 버전이며 빠르게 바뀝니다. 여기 나온 명령어가 작동하지 않으면, 무언가 고장 났다고 단정하기 전에 `zallet rpc help`를 확인하세요.
- **Zallet가 노드(node)라고 생각하는 경우.** 이는 한 쌍을 이루는 지갑(wallet) 쪽입니다. Zebra가 노드를 실행하고, Zallet가 노드와 통신합니다.

## RPC 명령

### decoderawtransaction

```bash
zallet rpc decoderawtransaction '"<hexstring>"'
```

| 매개변수   | 유형   | 필수 여부 | 설명              |
|-------------|--------|----------|--------------------------|
| hexstring   | 문자열 | 예      | 거래의 16진수 문자열   |

---

### decodescript

```bash
zallet rpc decodescript '"<hexstring>"'
```

| 매개변수   | 유형   | 필수 여부 | 설명     |
|-------------|--------|----------|-----------------|
| hexstring   | 문자열 | 예      | 스크립트의 16진수 값      |

---

### getrawtransaction

```bash
zallet rpc getrawtransaction '"<txid>"' [verbose] ['"<blockhash>"']
```

| 매개변수  | 유형   | 필수 여부 | 기본값 | 설명                          |
|------------|--------|----------|---------|--------------------------------------|
| txid       | 문자열 | 예      |         | 거래 ID                       |
| verbose    | 숫자   | 아니요       | 0       | `0` = 16진수, 0이 아닌 값 = JSON 객체    |
| blockhash  | 문자열 | 아니요       |         | 검색 범위를 이 블록으로 제한        |

---

### getwalletinfo

```bash
zallet rpc getwalletinfo
```

매개변수가 없습니다.

---

### getwalletstatus

```bash
zallet rpc getwalletstatus
```

매개변수가 없습니다.

---

### listaddresses

```bash
zallet rpc listaddresses
```

매개변수가 없습니다.

---

### rpc.discover

```bash
zallet rpc rpc.discover
```

매개변수가 없습니다. OpenRPC 스키마를 반환합니다.

---

### stop

```bash
zallet rpc stop
```

매개변수가 없습니다. (Regtest 전용)

---

### validateaddress

```bash
zallet rpc validateaddress '"<address>"'
```

| 매개변수 | 유형   | 필수 여부 | 설명             |
|-----------|--------|----------|-------------------------|
| address   | 문자열 | 예      | 투명 주소     |

---

### verifymessage

```bash
zallet rpc verifymessage '"<address>"' '"<signature>"' '"<message>"'
```

| 매개변수  | 유형   | 필수 여부 | 설명             |
|------------|--------|----------|-------------------------|
| address    | 문자열 | 예      | 투명 주소     |
| signature  | 문자열 | 예      | Base64 서명        |
| message    | 문자열 | 예      | 원본 메시지        |

---

### walletlock

```bash
zallet rpc walletlock
```

매개변수가 없습니다.

---

### walletpassphrase

```bash
zallet rpc walletpassphrase '"<passphrase>"' <timeout>
```

| 매개변수   | 유형   | 필수 여부 | 설명                          |
|-------------|--------|----------|--------------------------------------|
| passphrase  | 문자열 | 예      | 지갑 암호                    |
| timeout     | 숫자   | 예      | 지갑 잠금 해제 상태를 유지할 시간(초)  |

---

### z_converttex

```bash
zallet rpc z_converttex '"<transparent_address>"'
```

| 매개변수             | 유형   | 필수 여부 | 설명                |
|-----------------------|--------|----------|----------------------------|
| transparent_address   | 문자열 | 예      | 변환할 P2PKH 주소   |

---

### z_exportkey

```bash
zallet rpc z_exportkey '"<sapling_address>"'
```

| 매개변수 | 유형   | 필수 여부 | 설명                                      |
|-----------|--------|----------|--------------------------------------------------|
| address   | 문자열 | 예      | spending key를 내보낼 Sapling 주소     |

> 지갑 잠금을 해제해야 합니다. Sapling spending key만 내보냅니다.

---

### z_getaccount

```bash
zallet rpc z_getaccount '"<account_uuid>"'
```

| 매개변수     | 유형   | 필수 여부 | 설명     |
|---------------|--------|----------|-----------------|
| account_uuid  | 문자열 | 예      | 계정 UUID    |

---

### z_getaddressforaccount

```bash
zallet rpc z_getaddressforaccount <account> ['["p2pkh","sapling","orchard"]'] [<diversifier_index>]
```

| 매개변수          | 유형            | 필수 여부 | 설명                              |
|--------------------|-----------------|----------|------------------------------------------|
| account            | 문자열 / 숫자 | 예      | 계정 UUID 또는 ZIP-32 계정 인덱스     |
| receiver_types     | 문자열 배열 | 아니요       | 포함할 수신자 유형                |
| diversifier_index  | 숫자          | 아니요       | 특정 다이버시파이어 인덱스               |

---

### z_getbalanceforaccount

```bash
zallet rpc z_getbalanceforaccount <account> [<minconf>]
```

| 매개변수 | 유형            | 필수 여부 | 기본값 | 설명                      |
|-----------|-----------------|----------|---------|----------------------------------|
| account   | 문자열 / 숫자 | 예      |         | 계정 UUID 또는 ZIP-32 인덱스     |
| minconf   | 숫자          | 아니요       | 1       | 최소 확인 수            |

---

### z_getbalances

```bash
zallet rpc z_getbalances [<minconf>]
```

| 매개변수 | 유형   | 필수 여부 | 기본값 | 설명               |
|-----------|--------|----------|---------|---------------------------|
| minconf   | 숫자 | 아니요       | 1       | 최소 확인 수     |

---

### z_getnewaccount

```bash
zallet rpc z_getnewaccount '"<account_name>"' ['"<seedfp>"']
```

| 매개변수     | 유형   | 필수 여부 | 설명                              |
|---------------|--------|----------|------------------------------------------|
| account_name  | 문자열 | 예      | 사람이 읽을 수 있는 이름                      |
| seedfp        | 문자열 | 아니요       | 지갑에 시드가 여러 개 있는 경우 필요    |

---

### z_getnotescount

```bash
zallet rpc z_getnotescount [<minconf>] [<as_of_height>]
```

| 매개변수     | 유형   | 필수 여부 | 기본값 | 설명                          |
|---------------|--------|----------|---------|--------------------------------------|
| minconf       | 숫자 | 아니요       | 1       | 최소 확인 수                |
| as_of_height  | 숫자 | 아니요       |         | 이 높이를 기준으로 조회합니다(`-1` = 팁) |

---

### z_getoperationresult

```bash
zallet rpc z_getoperationresult ['["opid1","opid2"]']
```

| 매개변수    | 유형            | 필수 여부 | 설명                              |
|--------------|-----------------|----------|------------------------------------------|
| operationid  | 문자열 배열 | 아니요       | 작업 ID(모두 완료된 작업을 보려면 생략)    |

---

### z_getoperationstatus

```bash
zallet rpc z_getoperationstatus ['["opid1","opid2"]']
```

| 매개변수    | 유형            | 필수 여부 | 설명                    |
|--------------|-----------------|----------|--------------------------------|
| operationid  | 문자열 배열 | 아니요       | 작업 ID(모두 보려면 생략)   |

---

### z_gettotalbalance

```bash
zallet rpc z_gettotalbalance [<minconf>] [<include_watchonly>]
```

| 매개변수          | 유형    | 필수 여부 | 기본값 | 설명                     |
|--------------------|---------|----------|---------|---------------------------------|
| minconf            | 숫자  | 아니요       | 1       | 최소 확인 수           |
| include_watchonly  | 불리언 | 아니요       | false   | 보기 전용 잔액 포함     |

---

### z_importaddress

```bash
zallet rpc z_importaddress '"<account_uuid>"' '"<hex_data>"' [<rescan>]
```

| 매개변수  | 유형    | 필수 여부 | 기본값 | 설명                          |
|------------|---------|----------|---------|--------------------------------------|
| account    | 문자열  | 예      |         | 계정 UUID                         |
| hex_data   | 문자열  | 예      |         | 공개 키 또는 리딤 스크립트의 16진수 값      |
| rescan     | 불리언 | 아니요       | true    | 가져온 후 다시 스캔                  |

---

### z_importkey

```bash
zallet rpc z_importkey '"<key>"' ['"<rescan>"'] [<start_height>]
```

| 매개변수     | 유형   | 필수 여부 | 기본값        | 설명                              |
|---------------|--------|----------|----------------|------------------------------------------|
| key           | 문자열 | 예      |                | Sapling 확장 spending key            |
| rescan        | 문자열 | 아니요       | `"whenkeyisnew"` | `"yes"`, `"no"` 또는 `"whenkeyisnew"`   |
| start_height  | 숫자 | 아니요       | 0              | 다시 스캔을 시작할 높이                      |

---

### z_listaccounts

```bash
zallet rpc z_listaccounts [<include_addresses>]
```

| 매개변수          | 유형    | 필수 여부 | 기본값 | 설명                              |
|--------------------|---------|----------|---------|------------------------------------------|
| include_addresses  | 불리언 | 아니요       | true    | 각 계정의 주소도 반환   |

---

### z_listoperationids

```bash
zallet rpc z_listoperationids ['"<status>"']
```

| 매개변수 | 유형   | 필수 여부 | 설명                          |
|-----------|--------|----------|--------------------------------------|
| status    | 문자열 | 아니요       | 상태별 필터링(예: `"success"`)  |

---

### z_listtransactions

```bash
zallet rpc z_listtransactions ['"<account_uuid>"'] [<start_height>] [<end_height>] [<offset>] [<limit>]
```

| 매개변수      | 유형   | 필수 여부 | 설명                  |
|----------------|--------|----------|------------------------------|
| account_uuid   | 문자열 | 아니요       | 계정 1개로 제한         |
| start_height   | 숫자 | 아니요       | 포함되는 하한        |
| end_height     | 숫자 | 아니요       | 포함되지 않는 상한        |
| offset         | 숫자 | 아니요       | 이 수만큼 결과 건너뛰기       |
| limit          | 숫자 | 아니요       | 반환할 최대 결과 수    |

---

### z_listunifiedreceivers

```bash
zallet rpc z_listunifiedreceivers '"<unified_address>"'
```

| 매개변수         | 유형   | 필수 여부 | 설명                  |
|-------------------|--------|----------|------------------------------|
| unified_address   | 문자열 | 예      | 검사할 통합 주소   |

---

### z_listunspent

```bash
zallet rpc z_listunspent [<minconf>] [<maxconf>] [<include_watchonly>] ['["addr1","addr2"]'] [<as_of_height>]
```

| 매개변수          | 유형            | 필수 여부 | 기본값 | 설명                          |
|--------------------|-----------------|----------|---------|--------------------------------------|
| minconf            | 숫자          | 아니요       | 1       | 최소 확인 수                |
| maxconf            | 숫자          | 아니요       | ∞       | 최대 확인 수                |
| include_watchonly  | 불리언         | 아니요       | false   | 보기 전용 포함                   |
| addresses          | 문자열 배열 | 아니요       |         | 이 주소들로 필터링            |
| as_of_height       | 숫자          | 아니요       |         | 이 높이를 기준으로 조회              |

---

### z_recoveraccounts

```bash
zallet rpc z_recoveraccounts '[{"name":"...","seedfp":"...","zip32_account_index":0,"birthday_height":123456}]'
```

| 매개변수 | 유형  | 필수 여부 | 설명                                                                 |
|-----------|-------|----------|-----------------------------------------------------------------------------|
| accounts  | 배열 | 예      | 객체 배열: `name`, `seedfp`, `zip32_account_index`, `birthday_height` |

---

### z_sendmany

```bash
zallet rpc z_sendmany '"<fromaddress>"' '[{"address":"...","amount":1.23,"memo":"..."}]' [<minconf>] [null] ['"<privacy_policy>"']
```

| 매개변수        | 유형            | 필수 여부 | 기본값         | 설명                                      |
|------------------|-----------------|----------|-----------------|--------------------------------------------------|
| fromaddress      | 문자열          | 예      |                 | 출금 주소 또는 `"ANY_TADDR"`                  |
| amounts          | 객체 배열 | 예      |                 | 수신자(`address`, `amount`, 선택적 `memo`)|
| minconf          | 숫자          | 아니요       |                 | 최소 확인 수                            |
| fee              | null            | 아니요       |                 | `null`이어야 합니다(ZIP-317 전용)                    |
| privacy_policy   | 문자열          | 아니요       | `"FullPrivacy"` | 프라이버시 정책 문자열                            |

---

### z_shieldcoinbase

```bash
zallet rpc z_shieldcoinbase '"<fromaddress_or_account_uuid>"' '"<toaddress>"' [null] [<limit>] ['"<memo_hex>"'] ['"<privacy_policy>"']
```

| 매개변수        | 유형   | 필수 여부 | 설명                                      |
|------------------|--------|----------|--------------------------------------------------|
| fromaddress      | 문자열 | 예      | 투명 주소 또는 계정 UUID              |
| toaddress        | 문자열 | 예      | 거래정보 보호 목적지                             |
| fee              | null   | 아니요       | `null`이어야 합니다                                   |
| limit            | 숫자 | 아니요       | 거래정보 보호할 코인베이스 UTXO의 최대 개수           |
| memo             | 문자열 | 아니요       | 16진수로 인코딩된 메모                                 |
| privacy_policy   | 문자열 | 아니요       | `AllowRevealedSenders` 또는 `AllowLinkingAccountAddresses` |

---

### z_viewtransaction

```bash
zallet rpc z_viewtransaction '"<txid>"'
```

| 매개변수 | 유형   | 필수 여부 | 설명     |
|-----------|--------|----------|-----------------|
| txid      | 문자열 | 예      | 거래 ID  |

---

## 관련 페이지

- [마이그레이션 가이드: zcashd에서 Zebrad 및 Zallet](/guides/migration-guide-zcashd-to-zebrad-zallet)로 — 기존 zcashd 설정을 단계별로 이전하는 방법
- [Zebra 풀 노드](/zcash-tech/zebra-full-node) — Zallet와 함께 작동하는 노드 구현체
- [풀 노드](/zcash-tech/full-nodes) — 풀 노드 운영에 필요한 사항과 운영을 고려할 만한 이유
- [지갑](/using-zcash/wallets) — 풀 노드가 필요 이상으로 복잡하다면 사용할 수 있는 더 가벼운 지갑 옵션
- [거래](/using-zcash/transactions) — 거래정보 보호 거래와 투명 거래의 차이
