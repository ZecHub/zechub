<a href="https://github.com/zechub/zechub/edit/main/site/guides/Viewing_Key_Transaction_Export.md" target="_blank">
  <img src="https://img.shields.io/badge/Edit-blue" alt="Edit Page"/>
</a>

# Viewing Key에서 거래 내역 내보내기

대부분의 지갑 내보내기 기능은 내용이 빈약합니다. 예를 들어 ZODL의 세금 내보내기에는 이전 연도의 날짜, 금액, 수수료만 포함되고 거래 ID, 메모, 주소는 없습니다. 이 정도로는 장부를 정리하거나, 지갑 마이그레이션을 확인하거나, 결제에 무슨 일이 있었는지 파악하기에 부족합니다.

전체 내역을 확인하는 데 시드 문구는 필요하지 않습니다. `uview1`로 시작하는 통합 전체 보기 키(UFVK)는 계정의 모든 수신 및 발신 거래를 볼 수 있으며, 두 가지 도구를 사용하면 이를 보관용 파일로 만들 수 있습니다. Zkool GraphQL 서버와 zingo-cli입니다. 이 가이드에서는 [이 포럼 스레드](https://forum.zcashcommunity.com/t/exporting-transaction-history-to-json-csv-from-ufvk-seed/54662)의 방법을 모아 최신 버전에 맞게 업데이트합니다.

2026년 9월에 Zkool 6.30.0 및 zingolib의 zingo-cli 6.0.0으로 테스트했습니다. 두 버전 모두 NU7 이전 버전이므로, 2026년 11월에는 절차를 Zkool 6.37.0 및 zingolib 8.0.0에 맞춰 업데이트했습니다. [Zkool 6.35.0](https://github.com/hhanh00/zkool2/pull/1388)은 NU7 메인넷 활성화 높이로 빌드된 최초의 Zkool 릴리스이며, zingolib 8.0.0은 NU7 메인넷 지원을 추가한 릴리스입니다.

## 시작하기 전에

두 가지가 필요합니다.

1. **계정의 UFVK**. [보기 키](/zcash-tech/viewing-keys)에서 보기 키로 무엇을 알 수 있는지와 내보내는 방법을 설명합니다.
2. **시작 높이**. 스캔을 시작할 블록입니다. 첫 거래보다 앞선 높이를 사용하세요. 너무 높게 설정하면 이전 내역이 알리지 않고 누락됩니다. 너무 낮게 설정하면 스캔 시간이 더 오래 걸릴 뿐입니다. Sapling 활성화 높이(419200)는 항상 안전하지만 스캔하는 데 몇 시간이 걸릴 수 있습니다.

## 비공개로 유지하기

보기 키로 자금을 쓸 수는 없지만, 키를 가진 사람은 누구나 전체 거래 내역을 볼 수 있습니다.

- 웹사이트나 블록 탐색기에 붙여 넣지 마세요. 직접 실행하는 소프트웨어에 가져오세요.
- 동기화하는 서버에는 IP 주소와 전체 내용을 다운로드하는 거래가 표시됩니다. 아래 두 도구는 메모와 수수료를 읽기 위해 거래 ID로 각 거래를 가져옵니다. [ZIP 307](https://zips.z.cash/zip-0307)에 따르면 이로 인해 서버는 어떤 거래가 내 것인지 알 수 있습니다. Zaino 또는 lightwalletd을 사용해 직접 운영하는 Zebra 노드에서 동기화하면 이를 피할 수 있습니다. 설정 방법은 [Zingolib 및 Zaino 튜토리얼](/guides/zingolib-and-zaino-tutorial)을 참고하세요.
- zingo-cli은 결제를 Nym 믹스넷으로 보내지만, 동기화할 때는 여전히 서버에 직접 연결하므로 위의 내용이 여기에 적용됩니다.
- 이 도구들에는 시드가 아니라 보기 키를 입력하세요. 아래의 Docker 명령은 로그인 기능이 없는 Zkool GraphQL 서버를 `--allow-unauthenticated` 옵션과 함께 실행합니다. 따라서 API가 서버에서 만든 계정의 시드를 반환할 수 있고 자금을 전송할 수도 있습니다.
- 서버는 내 컴퓨터에서 실행하세요. 아래의 Docker 명령은 컴퓨터의 `127.0.0.1`에서만 수신 대기합니다. 컨테이너 안에서 서버는 모든 인터페이스(`--bind-address 0.0.0.0`)에서 수신 대기해야 Docker가 서버에 연결할 수 있습니다. 로컬에서만 접근할 수 있게 하는 것은 `-p 127.0.0.1:8000:8000` 매핑입니다.
- 두 도구 모두 키와 거래 내역을 암호화하지 않은 상태로 저장합니다. Zkool은 데이터베이스를 암호화할 수 있지만(`--db-password-file`), 아래 명령은 단순하게 `--allow-unencrypted-database`을 사용합니다. 작업을 마치면 작업 데이터를 삭제하고 내보낸 파일은 암호화된 곳에 보관하세요.

## 옵션 1: Zkool GraphQL

`zkool_graphql`은 독립 실행형 서버로 제공되는 Zkool의 지갑 엔진입니다. Zkool 앱과는 별도의 프로그램입니다. 가장 간단한 실행 방법은 공식 Docker 이미지(amd64 및 arm64)를 사용하는 것입니다. [Zkool 릴리스 페이지](https://github.com/hhanh00/zkool2/releases)에서 Linux x86-64 바이너리도 받을 수 있습니다. 이 바이너리에는 glibc 2.38 이상이 필요하므로 Ubuntu 24.04에서는 작동하지만 Debian 12에서는 작동하지 않습니다.

### 1. 서버 시작

```bash
docker run -d --name zkool-export \
  -p 127.0.0.1:8000:8000 \
  -v zkool-export:/data \
  hhanh00/zkool-graphql:6.37.0 \
  --db-path /data/zkool.db \
  --bind-address 0.0.0.0 \
  --allow-unauthenticated \
  --allow-unencrypted-database
```

6.32.0부터 서버를 시작하려면 두 가지를 명시적으로 선택해야 합니다. 클라이언트 로그인 방식(JWT 키 또는 `--allow-unauthenticated`)과 데이터베이스 암호화 여부(암호 또는 `--allow-unencrypted-database`)입니다. 이제 기본적으로 `127.0.0.1`에서만 수신 대기합니다. 컨테이너 안에서는 외부에서 아무도 연결할 수 없으므로 `--bind-address 0.0.0.0`가 필요합니다. 컨테이너가 곧바로 종료되면 `docker logs zkool-export`에서 빠진 옵션을 확인하세요.

직접 운영하는 서버와 함께 `--lwd-url`을 추가하지 않으면 `https://zec.rocks`에서 동기화합니다. 이미지에 Sapling 매개변수가 내장되어 있어 따로 다운로드할 것은 없습니다.

브라우저에서 `http://127.0.0.1:8000/graphiql`을 여세요. 다음 단계의 명령을 하나씩 붙여 넣고 실행하면 됩니다.

### 2. 키 가져오기

```graphql
mutation {
  createAccount(newAccount: {
    name: "export"
    key: "uview1..."
    aindex: 0
    birth: 2500000
    useInternal: true
  })
}
```

새 계정의 ID가 반환됩니다. 새 서버라면 ID는 1입니다.

- 항상 `birth`을 설정하세요. 설정하지 않으면 Zkool가 현재 블록부터 스캔하므로 아무것도 찾지 못합니다.
- `useInternal: true`을 사용하면 Zkool가 투명 잔액 주소도 확인합니다. ZODL에서 가져온 키에는 이 설정을 켜 두세요. [자금 복구](/using-zcash/recovering-funds)에서 ZODL 시드에 사용하는 것과 같은 설정입니다.

### 3. 동기화

```graphql
mutation { synchronizeAccount(idAccount: 1) }
```

동기화가 끝날 때까지 실행됩니다. `fast: true`을 추가하지 마세요. 이 옵션은 메모, 수수료, 출력 정보가 포함된 전체 거래 다운로드를 건너뜁니다.

반환되는 숫자는 동기화가 목표로 삼은 높이이지, 실제로 그 높이까지 완료했다는 증거가 아닙니다. 네트워크 오류가 발생하면 아무런 보고 없이 동기화가 일찍 끝날 수 있으므로 다음을 확인하세요.

```graphql
{ currentHeight accounts { id name height } }
```

계정의 `height`가 `currentHeight`보다 낮으면 동기화를 다시 실행하세요. 중단된 지점부터 이어서 진행합니다.

### 4. 내보내기

파일을 `history.graphql`로 저장하세요.

```graphql
{
  transactionsByAccount(idAccount: 1) {
    txid height time value fee
    notes { pool scope address value memo }
    spends { pool scope address value }
    outputs { pool vout address value memo }
  }
}
```

의도한 경우가 아니면 `height` 인수를 생략하세요. 이 인수는 최소 높이를 지정하므로 포럼 예시의 `height: 3000000`은 해당 블록보다 이전의 모든 내역을 제외합니다.

JSON으로 가져오세요.

```bash
jq -n --rawfile q history.graphql '{query: $q}' |
  curl -s http://127.0.0.1:8000/graphql \
    -H 'content-type: application/json' --data-binary @- > history.json
```

채굴 보상을 제외한 모든 거래의 수수료는 0보다 큰 값으로 표시되어야 합니다. `"fee": "0"`가 표시되고 메모가 없다면 해당 거래의 세부 정보를 다운로드하지 못한 것입니다. Zkool은 스캔이 끝난 뒤 전체 거래를 하나씩 가져오는데, 하나라도 실패하면 나머지 가져오기가 조용히 중단됩니다. 영향을 받은 거래를 나열하려면 다음을 실행하세요.

```bash
jq -r '.data.transactionsByAccount[] | select(.fee == "0") | .txid' history.json
```

결과가 있으면 몇 분 뒤에 다시 동기화하고 내보내세요.

그런 다음 거래마다 한 행을 사용해 CSV로 변환하세요.

```bash
jq -r '["txid","height","time_utc","net_zec","fee_zec","memos"],
  (.data.transactionsByAccount[] |
    [.txid, .height, .time, .value, .fee,
     ([.notes[].memo, .outputs[].memo] | map(select(. != null and . != "")) | unique | join(" | "))])
  | @csv' history.json > history.csv
```

### 출력 읽기

| 필드 | 의미 |
|---|---|
| `value` | 수수료를 포함한 ZEC 단위의 계정 순변동액입니다. 송금은 음수입니다. |
| `fee` | ZEC 단위의 수수료입니다. 결제를 받은 경우 수수료는 송금인이 냈으므로 `value`에 포함되지 않습니다. |
| `time` | 시간대 표시가 없는 UTC 기준 블록 시간 |
| `notes` | 잔액 변경분을 포함해 이 거래에서 계정이 받은 금액입니다. 내게 온 메모도 여기에 표시됩니다. 투명 항목에는 주소가 없습니다. |
| `spends` | 이 거래에서 사용된 계정 자체의 메모 |
| `outputs` | 거래가 보낸 내역입니다. 모든 투명 출력과, 메모가 포함된 다른 주소로의 차폐 결제가 표시됩니다. |
| `pool` | 0은 투명, 1은 Sapling, 2는 Orchard, 3은 Ironwood입니다. |
| `scope` | 0은 외부(결제 수신), 1은 내부(잔액 변경)입니다. |

Zkool 앱의 계정 메뉴에도 거래, 메모, 노트 내보내기 기능이 있지만, 이는 원시 테이블 덤프입니다. 금액은 zatoshi 단위이고, 타임스탬프는 Unix 형식이며 메모는 별도 파일에 저장됩니다.

## 옵션 2: zingo-cli

zingo-cli은 Zingo의 명령줄 지갑입니다. 미리 빌드된 다운로드 파일은 없으므로 Rust을 사용해 직접 빌드해야 합니다. NU7의 메인넷 활성화 높이(3,543,405)를 알고 있는 첫 릴리스인 zingolib 8.0.0 이상을 사용하세요. [릴리스 노트](https://github.com/zingolabs/zingolib/releases/tag/zingolib_v8.0.0)에 따르면 6.0.0 같은 이전 태그의 빌드는 이 높이를 알지 못합니다.

빌드에는 [cargo-make](https://github.com/sagiegurari/cargo-make)(`cargo install cargo-make`)를 사용합니다. Ubuntu에서는 `sudo apt install build-essential gcc libsqlite3-dev`도 필요합니다.

```bash
git clone --branch zingolib_v8.0.0 https://github.com/zingolabs/zingolib.git
cd zingolib
makers run-cli --build-only
```

이 명령은 `./target/release/zingo-cli`을 빌드하고 `nym-proxy`를 그 옆에 둡니다. 동기화만 하더라도 `nym-proxy`가 필요합니다. zingo-cli는 이것 없이는 온라인에 연결되지 않습니다. 8.0.0부터 `zingo-netutils`는 메인 작업공간의 일부이므로, `zingo-netutils/target/release/`에서 `nym-proxy`을 복사하던 이전 방법은 더 이상 작동하지 않습니다.

`zingo-cli`을 다른 곳으로 옮기는 경우 `nym-proxy`도 함께 옮기거나, `--nym-proxy /path/to/nym-proxy` 또는 `ZINGO_NYM_PROXY` 환경 변수로 zingo-cli에 위치를 알려주세요. 이를 지정하지 않으면 실행 파일 옆을 찾은 다음 `PATH`를 확인합니다. 프록시를 시작하지 못하면 온라인에 전혀 연결되지 않습니다.

결제와 ZEC 가격 조회만 Nym를 거칩니다. 동기화는 서버에 직접 연결됩니다.

처음 실행하면 보기 전용 지갑을 만들고, 동기화한 뒤 거래 내역을 출력합니다.

```bash
./target/release/zingo-cli --data-dir "$HOME/zingo-export" \
  --viewkey "uview1..." --birthday 2500000 \
  --server https://zec.rocks:443 \
  --waitsync transactions > transactions.txt
```

- `--data-dir`은 절대 경로여야 합니다.
- `--viewkey`과 `--birthday`는 지갑을 만들 때만 적용됩니다. 그 이후에는 생략하세요.
- 새 zingo-cli는 기본적으로 오프라인 상태이며 온라인 연결에는 동의가 필요합니다. `--server`은 서버를 선택하는 동시에 온라인 연결에 동의하는 옵션입니다. 다른 방법으로는 이번 세션에만 적용되는 `--online`와, 지갑 옆에 선택 사항을 저장해 이후 실행 시 플래그 없이 온라인에 연결되도록 하는 `--remember-online`이 있습니다(`--forget-online`로 취소할 수 있습니다).
- 키가 셸 기록에 남으므로 작업 후 기록을 지우세요.

이후 실행 방법:

```bash
Z="./target/release/zingo-cli --data-dir $HOME/zingo-export"
$Z --server https://zec.rocks:443 --waitsync transactions > transactions.txt
$Z --offline value_transfers > value_transfers.txt
$Z --offline messages > memos.json
```

`--offline`은 이미 동기화된 내용을 읽으며 네트워크에는 연결하지 않습니다.

- `transactions`은 거래마다 항목 하나를 제공합니다. txid, 시간(UTC), 높이, 종류(`received`, `sent`, `shield` 또는 `send-to-self`), 금액, 수수료, 관련 노트가 포함됩니다.
- `value_transfers`는 결제마다 항목 하나를 제공합니다. 따라서 두 사람에게 송금하면 수신자 주소와 메모가 포함된 항목이 두 개 생깁니다.
- `messages`은 메모를 JSON으로 나열합니다.

출력에 대해 알아둘 점:

- `transactions`와 `value_transfers`는 JSON처럼 보이지만 실제 JSON은 아닌 일반 텍스트를 출력합니다.
- 금액은 zatoshi 단위(ZEC ZEC = 100,000,000 zatoshi)이며 항상 양수입니다. 방향은 `kind`에서 확인할 수 있습니다. 송금의 경우 `value`은 수수료를 제외하고 다른 사람에게 전달된 금액입니다.
- 내가 소유하지 않은 투명 자금을 사용하는 거래의 수수료는 "사용할 수 없음"으로 표시됩니다. 텍스트 메모만 표시됩니다.
- 동기화에 실패하면 오류는 파일이 아니라 터미널에 표시됩니다. zingolib 8.0.0(zingo-cli 0.5.0)부터 명령이 실패하면 종료 코드도 0이 아닌 값으로 설정됩니다. 그래도 `transactions.txt`을 신뢰하기 전에 터미널을 확인하세요.

dismad의 [zingoHelper](https://github.com/dismad/zingoHelper)에는 `transactions`을 JSON으로 변환하는 `exportToJSON.sh` 스크립트가 있습니다. zingo-cli 6 이전에 작성되었고 테스트넷용으로 설정되어 있습니다. 일부 발신 Sapling 항목과 투명 항목을 자리표시자로 표시하며 GNU 도구가 필요하므로 기본 macOS 환경에서는 실행되지 않습니다. 출력은 초안으로만 사용하고 합계를 확인하세요.

## 보기 키로 알 수 없는 정보

- **가격.** 어느 도구도 각 거래 당시의 ZEC 가격을 기록하지 않습니다. 법정화폐 가치는 직접 추가하세요.
- **보기 키에 포함되지 않은 투명 내역.** UFVK의 투명 부분은 [ZIP 316](https://zips.z.cash/zip-0316)에 따라 선택 사항입니다. zingo-cli을 사용하면 `$Z --offline parse_viewkey uview1...`에서 키가 어떤 풀을 포함하는지 확인할 수 있습니다.
- **누가 돈을 보냈는지.** 차폐 결제에는 송신자 주소가 포함되지 않습니다. 송신자가 메모에 주소를 적지 않았다면 어디에도 없습니다.
- **일부 발신 세부 정보.** 키로 복호화하면 차폐 송금의 수신 주소, 금액, 메모를 확인할 수 있습니다. 지갑에서 이 정보를 복구할 수 없도록 거래를 만들 수도 있지만, 대부분은 그렇게 하지 않습니다.

## 다른 도구

| 도구 | 제공 정보 |
|---|---|
| ZODL | 날짜, 금액, 수수료, 태그가 포함된 세금 CSV입니다. 이전 연도만 제공하고, 차폐 거래는 제외하며, txid, 메모, 주소는 포함하지 않습니다. |
| Zkool 앱 | 계정 메뉴에서 내보내는 원시 테이블 |
| [Zenith](https://code.vergara.tech/Vergara_Tech/zenith) | `importvk`로 UFVK를 가져옵니다. RPC를 통한 `listreceived`은 txid와 메모가 포함된 수신 노트를 반환하지만 발신 내역과 수수료는 포함하지 않습니다. |
| [Zallet](https://github.com/zcash/zallet) | `z_listtransactions`은 세부 정보가 많지만 실험용으로 표시되어 있고, Zallet는 UFVK가 아닌 Sapling 보기 키만 가져옵니다. |
| [zcash-devtool](https://github.com/zcash/zcash-devtool) | `wallet init-fvk`으로 UFVK를 가져온 다음 `wallet list-tx`을 사용합니다. CSV 모드에는 txid와 주소가 없으며, 프로젝트에서는 프로덕션 환경에서 사용하지 말라고 안내합니다. |

## 관련 문서

- [보기 키](/zcash-tech/viewing-keys)
- [자금 복구](/using-zcash/recovering-funds)
- [Zingolib 및 Zaino 튜토리얼](/guides/zingolib-and-zaino-tutorial)
- [포럼: UFVK/시드에서 거래 내역을 JSON/CSV로 내보내기](https://forum.zcashcommunity.com/t/exporting-transaction-history-to-json-csv-from-ufvk-seed/54662)
- [포럼: Zkool 및 GraphQL](https://forum.zcashcommunity.com/t/zkool-graphql/54100)
- [zingo-cli README](https://github.com/zingolabs/zingolib/blob/zingolib_v8.0.0/zingo-cli/README.md)
