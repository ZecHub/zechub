<a href="https://github.com/zechub/zechub/edit/main/site/guides/Viewing_Key_Transaction_Export.md" target="_blank">
  <img src="https://img.shields.io/badge/Edit-blue" alt="페이지 편집"/>
</a>

# Viewing Key에서 거래 내역 내보내기

대부분의 지갑 내보내기 기능은 내용이 빈약합니다. 예를 들어 ZODL의 세금용 내보내기 기능은 이전 연도의 날짜, 금액, 수수료만 제공하며 거래 ID, 메모, 주소는 제공하지 않습니다. 이 정보만으로는 장부를 정리하거나 지갑을 이전한 뒤 확인하거나 결제 내역을 파악하기에 충분하지 않습니다.

전체 내역을 확인하는 데 seed phrase는 필요하지 않습니다. 통합 전체 viewing key(UFVK, `uview1`로 시작)를 사용하면 계정의 모든 입금 및 출금 거래를 확인할 수 있으며, 도구 2가지를 사용해 보관할 파일로 만들 수 있습니다. Zkool GraphQL 서버와 zingo-cli입니다. 이 가이드는 [이 포럼 스레드](https://forum.zcashcommunity.com/t/exporting-transaction-history-to-json-csv-from-ufvk-seed/54662)에 정리된 방법을 모아 최신 릴리스에 맞게 업데이트합니다.

Zkool 6.30.0 및 zingolib의 zingo-cli 6.0.0으로 2026년 9월에 테스트했습니다. 두 버전 모두 NU7보다 이전 버전이므로, 2026년 11월에 단계를 Zkool 6.37.0 및 zingolib 8.0.0에 맞게 업데이트했습니다. [Zkool 6.35.0](https://github.com/hhanh00/zkool2/pull/1388)은 NU7 메인넷 활성화 높이로 빌드된 첫 번째 Zkool 릴리스이며, zingolib 8.0.0은 NU7 메인넷 지원이 추가된 릴리스입니다.

## 시작하기 전에

다음 2가지가 필요합니다.

1. 계정의 **UFVK**입니다. [Viewing Keys](/zcash-tech/viewing-keys)에서 UFVK로 확인할 수 있는 정보와 내보내는 방법을 알아보세요.
2. 스캔을 시작할 블록인 **생성 높이**입니다. 첫 거래보다 앞선 높이를 사용하세요. 너무 높은 높이를 설정하면 이전 내역이 알리지 않고 누락됩니다. 너무 낮게 설정하면 스캔 시간이 더 오래 걸릴 뿐입니다. Sapling 활성화 높이(419200)는 항상 안전한 선택이지만 스캔에 몇 시간이 걸릴 수 있습니다.

## 비공개로 유지하기

Viewing key로 자금을 사용할 수는 없지만, 이를 가진 사람은 누구나 전체 내역을 볼 수 있습니다.

- 웹사이트나 블록 탐색기에 붙여넣지 마세요. 직접 실행하는 소프트웨어에 가져오세요.
- 동기화하는 서버는 사용자의 IP 주소와 전체 내역을 내려받는 거래를 확인할 수 있습니다. 아래의 두 도구는 메모와 수수료를 읽기 위해 각 거래를 ID로 가져옵니다. [ZIP 307](https://zips.z.cash/zip-0307)에 따르면 이 때문에 서버는 어떤 거래가 사용자의 것인지 알 수 있습니다. Zebra 노드를 직접 운영하고 Zaino 또는 lightwalletd을 사용하면 이를 피할 수 있습니다. [Zingolib 및 Zaino 튜토리얼](/guides/zingolib-and-zaino-tutorial)에서 설정 방법을 안내합니다.
- zingo-cli은 Nym 믹스넷을 통해 결제를 보내지만, 동기화할 때는 여전히 서버에 직접 연결하므로 위의 주의사항이 적용됩니다.
- 이 도구들에는 seed가 아니라 viewing key를 제공하세요. 아래의 Docker 명령은 `--allow-unauthenticated` 옵션을 사용해 Zkool GraphQL 서버를 시작하므로 로그인 기능이 없습니다. 또한 API를 통해 생성된 계정의 seed를 가져갈 수 있으며 자금을 보낼 수도 있습니다.
- 서버를 자신의 컴퓨터에서 실행하세요. 아래의 Docker 명령은 컴퓨터의 `127.0.0.1`에서만 수신합니다. 컨테이너 내부에서 서버는 모든 인터페이스(`--bind-address 0.0.0.0`)에서 수신해야 Docker가 서버에 연결할 수 있습니다. `-p 127.0.0.1:8000:8000` 매핑 덕분에 서버는 로컬에만 연결됩니다.
- 두 도구 모두 키와 내역을 암호화하지 않은 상태로 저장합니다. Zkool은 데이터베이스를 암호화할 수 있지만(`--db-password-file`), 아래 명령에서는 단순하게 `--allow-unencrypted-database`을 사용합니다. 작업이 끝나면 작업 데이터를 삭제하고 내보낸 파일은 암호화된 곳에 보관하세요.

## 옵션 1: Zkool GraphQL

`zkool_graphql`은 독립 실행형 서버로 제공되는 Zkool의 지갑 엔진입니다. Zkool 앱과는 별개의 프로그램입니다. 가장 간단하게 실행하는 방법은 공식 Docker 이미지(amd64 및 arm64)를 사용하는 것입니다. [Zkool 릴리스 페이지](https://github.com/hhanh00/zkool2/releases)에서 Linux x86-64 바이너리도 받을 수 있습니다. 이 바이너리에는 glibc 2.38 이상이 필요하므로 Ubuntu 24.04에서는 작동하지만 Debian 12에서는 작동하지 않습니다.

### 1. 서버 시작하기

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

6.32.0부터는 서버를 시작하기 전에 두 가지를 명시적으로 선택해야 합니다. 클라이언트 로그인 방법(JWT 키 또는 `--allow-unauthenticated`)과 데이터베이스 암호화 여부(암호 또는 `--allow-unencrypted-database`)입니다. 또한 이제 기본적으로 `127.0.0.1`에서만 수신하므로 컨테이너 외부에서는 접근할 수 없습니다. 그래서 `--bind-address 0.0.0.0`이 필요합니다. 컨테이너가 즉시 중지되면 `docker logs zkool-export`에서 누락된 옵션을 확인하세요.

자체 서버를 사용하도록 `--lwd-url`을 추가하지 않으면 `https://zec.rocks`에서 동기화합니다. 이미지에 Sapling 매개변수가 내장되어 있으므로 따로 다운로드할 것은 없습니다.

브라우저에서 `http://127.0.0.1:8000/graphiql`을 여세요. 다음 단계를 하나씩 붙여넣고 실행할 수 있습니다.

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

새 계정의 ID가 반환됩니다. 새 서버에서는 ID가 1입니다.

- `birth`은 반드시 설정하세요. 설정하지 않으면 Zkool가 현재 블록부터 스캔을 시작해 아무것도 찾지 못합니다.
- `useInternal: true`을 사용하면 Zkool가 투명 잔돈 주소도 확인합니다. ZODL의 키에는 이 옵션을 켜 두세요. [복구](/using-zcash/recovering-funds)에서도 ZODL seed에 같은 설정을 사용합니다.

### 3. 동기화

```graphql
mutation { synchronizeAccount(idAccount: 1) }
```

동기화가 끝날 때까지 실행됩니다. `fast: true`을 추가하지 마세요. 전체 거래를 내려받지 않게 되며, 메모, 수수료, 출력 정보는 전체 거래에 포함되어 있습니다.

반환되는 숫자는 동기화가 목표로 삼은 높이이지, 실제로 해당 높이까지 동기화했다는 증명이 아닙니다. 네트워크 오류가 발생하면 아무런 알림 없이 동기화가 일찍 끝날 수 있으므로 다음을 확인하세요.

```graphql
{ currentHeight accounts { id name height } }
```

계정의 `height`가 `currentHeight`보다 낮으면 동기화를 다시 실행하세요. 중단된 지점부터 이어서 진행합니다.

### 4. 내보내기

다음 내용을 `history.graphql`로 저장하세요.

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

의도한 경우가 아니라면 `height` 인수를 빼세요. 이 인수는 최솟값을 설정하므로 포럼 예시의 `height: 3000000`은 해당 블록보다 이전의 모든 항목을 제외합니다.

JSON으로 가져옵니다.

```bash
jq -n --rawfile q history.graphql '{query: $q}' |
  curl -s http://127.0.0.1:8000/graphql \
    -H 'content-type: application/json' --data-binary @- > history.json
```

채굴 보상을 제외하면 모든 거래에 0보다 큰 수수료가 표시되어야 합니다. 수수료가 `"fee": "0"`로 표시되고 메모도 없다면 거래 세부 정보가 내려받아지지 않은 것입니다. 스캔이 끝난 뒤 Zkool은 전체 거래를 한 번에 하나씩 가져오며, 하나라도 실패하면 나머지 가져오기를 조용히 중단합니다. 영향을 받은 항목을 확인하려면 다음을 실행하세요.

```bash
jq -r '.data.transactionsByAccount[] | select(.fee == "0") | .txid' history.json
```

항목이 표시되면 몇 분 뒤에 다시 동기화하고 내보내세요.

그런 다음 거래마다 한 행씩 CSV로 변환합니다.

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
| `value` | 수수료를 포함한 ZEC 기준 계정의 순변동액입니다. 송금은 음수입니다. |
| `fee` | ZEC 단위의 수수료입니다. 받은 결제의 수수료는 송금인이 지불하므로 `value`에 포함되지 않습니다. |
| `time` | 시간대 표기 없이 UTC로 표시한 블록 시간입니다. |
| `notes` | 잔돈을 포함해 이 거래에서 계정이 받은 내용입니다. 사용자에게 보낸 메모가 여기에 표시됩니다. 투명 항목에는 주소가 없습니다. |
| `spends` | 이 거래에서 사용된 계정 자체의 노트입니다. |
| `outputs` | 거래에서 보낸 내용입니다. 모든 투명 출력과 다른 주소로 보낸 거래정보 보호 결제 및 해당 결제의 메모가 포함됩니다. |
| `pool` | 0은 투명, 1은 Sapling, 2는 Orchard, 3은 Ironwood입니다. |
| `scope` | 0은 외부(입금), 1은 내부(잔돈)입니다. |

Zkool 앱의 계정 메뉴에서도 거래, 메모, 노트를 내보낼 수 있지만, 원시 테이블 덤프입니다. 금액은 zatoshi 단위이고, 시간은 Unix 타임스탬프이며, 메모는 별도 파일에 저장됩니다.

## 옵션 2: zingo-cli

zingo-cli은 Zingo의 명령줄 지갑입니다. 미리 빌드된 다운로드 파일이 없으므로 Rust을 사용해 빌드해야 합니다. zingolib 8.0.0 이상을 사용하세요. [릴리스 노트](https://github.com/zingolabs/zingolib/releases/tag/zingolib_v8.0.0)에 따르면, NU7의 메인넷 활성화 높이(3,543,405)를 알고 있는 첫 번째 릴리스입니다. 6.0.0과 같은 이전 태그로 빌드한 버전은 이를 알지 못합니다.

빌드에는 [cargo-make](https://github.com/sagiegurari/cargo-make)(`cargo install cargo-make`)가 사용됩니다. Ubuntu에서는 `sudo apt install build-essential gcc libsqlite3-dev`도 필요합니다.

```bash
git clone --branch zingolib_v8.0.0 https://github.com/zingolabs/zingolib.git
cd zingolib
makers run-cli --build-only
```

이 명령은 `./target/release/zingo-cli`을 빌드하고 `nym-proxy`을 그 옆에 둡니다. 동기화에만 사용하더라도 `nym-proxy`이 필요합니다. 이것이 없으면 zingo-cli가 온라인에 연결되지 않습니다. 8.0.0부터는 `zingo-netutils`가 기본 작업 공간에 포함되어 있으므로, `zingo-netutils/target/release/`에서 `nym-proxy`을 복사하던 이전 방법은 더 이상 작동하지 않습니다.

`zingo-cli`을 다른 위치로 옮기는 경우 `nym-proxy`도 함께 옮기거나, `--nym-proxy /path/to/nym-proxy` 또는 `ZINGO_NYM_PROXY` 환경 변수를 사용해 zingo-cli에 위치를 알려주세요. 이를 지정하지 않으면 `PATH`에서 찾기 전에 실행 파일이 있는 위치를 확인합니다. 프록시를 시작할 수 없으면 온라인에 전혀 연결되지 않습니다.

결제와 ZEC 가격 조회만 Nym을 통해 전송됩니다. 동기화는 서버에 직접 연결합니다.

첫 실행 시 읽기 전용 지갑을 만들고 동기화한 뒤 내역을 출력합니다.

```bash
./target/release/zingo-cli --data-dir "$HOME/zingo-export" \
  --viewkey "uview1..." --birthday 2500000 \
  --server https://zec.rocks:443 \
  --waitsync transactions > transactions.txt
```

- `--data-dir`은 절대 경로여야 합니다.
- `--viewkey` 및 `--birthday`는 지갑을 만들 때만 적용됩니다. 그 이후에는 생략하세요.
- 새 zingo-cli은 기본적으로 오프라인이며 온라인 연결에는 동의가 필요합니다. `--server`은 서버를 선택하며 온라인 연결 동의로도 간주됩니다. 다른 방법으로는 현재 세션에만 적용되는 `--online`와, 지갑 옆에 선택 사항도 저장해 이후에는 플래그 없이 온라인에 연결하도록 하는 `--remember-online`이 있습니다(`--forget-online`로 되돌릴 수 있습니다).
- 키가 셸 기록에 남으므로 사용 후 기록을 지우세요.

이후 실행:

```bash
Z="./target/release/zingo-cli --data-dir $HOME/zingo-export"
$Z --server https://zec.rocks:443 --waitsync transactions > transactions.txt
$Z --offline value_transfers > value_transfers.txt
$Z --offline messages > memos.json
```

`--offline`은 이미 동기화된 내용을 읽으며 네트워크에 연결하지 않습니다.

- `transactions`은 거래마다 항목 하나를 제공합니다. 항목에는 txid, 시간(UTC), 높이, 종류(`received`, `sent`, `shield` 또는 `send-to-self`), 금액, 수수료, 관련 노트가 포함됩니다.
- `value_transfers`는 결제마다 항목 하나를 제공합니다. 따라서 2명에게 보낸 송금은 항목 2개로 표시되며, 각 항목에 수신자 주소와 메모가 포함됩니다.
- `messages`은 메모를 JSON으로 나열합니다.

출력에 관해 알아둘 점은 다음과 같습니다.

- `transactions` 및 `value_transfers`는 JSON과 비슷하지만 실제 JSON은 아닌 일반 텍스트를 출력합니다.
- 금액은 zatoshi 단위(1 ZEC당 100,000,000)이며 항상 양수입니다. `kind`을 보면 방향을 알 수 있습니다. 송금의 경우 `value`은 수수료를 제외하고 다른 사람에게 보낸 금액입니다.
- 자신이 소유하지 않은 투명 자금을 사용하는 거래의 수수료는 “사용할 수 없음”으로 표시됩니다. 텍스트 메모만 표시됩니다.
- 동기화에 실패하면 오류는 파일이 아니라 터미널에 표시됩니다. zingolib 8.0.0(zingo-cli 0.5.0)부터는 명령 실패 시 0이 아닌 코드로도 종료됩니다. 그래도 `transactions.txt`을 신뢰하기 전에 터미널을 확인하세요.

dismad의 [zingoHelper](https://github.com/dismad/zingoHelper)에는 `transactions`을 JSON으로 변환하는 `exportToJSON.sh` 스크립트가 있습니다. zingo-cli 6 이전에 작성되었고 테스트넷용으로 설정되어 있습니다. 일부 출금 Sapling 및 투명 항목을 자리표시자로 표시하며 GNU 도구가 필요하므로 기본 macOS 환경에서는 실행되지 않습니다. 출력을 시작점으로 삼고 합계를 확인하세요.

## Viewing key로 확인할 수 없는 정보

- **가격.** 두 도구 모두 각 거래 시점의 ZEC 가격을 기록하지 않습니다. 법정화폐 가치는 직접 추가하세요.
- **키에 포함되지 않은 투명 내역.** [ZIP 316](https://zips.z.cash/zip-0316)에 따라 UFVK의 투명 부분은 선택 사항입니다. zingo-cli를 사용하면 `$Z --offline parse_viewkey uview1...`에서 키가 어떤 풀을 포함하는지 확인할 수 있습니다.
- **누가 송금했는지.** 거래정보 보호 결제에는 송금인의 주소가 포함되지 않습니다. 송금인이 메모에 주소를 넣지 않았다면 어디에도 없습니다.
- **일부 출금 세부 정보.** 거래정보 보호 송금의 목적지 주소, 금액, 메모는 키를 사용해 복호화해야 확인할 수 있습니다. 지갑에서 이렇게 확인할 수 없도록 거래를 구성할 수도 있지만, 대부분은 그렇게 하지 않습니다.

## 기타 도구

| 도구 | 제공 정보 |
|---|---|
| ZODL | 날짜, 금액, 수수료, 태그가 포함된 세금용 CSV입니다. 이전 연도만 지원하며, 거래정보 보호 거래는 제외되고 txid, 메모, 주소는 포함되지 않습니다. |
| Zkool 앱 | 계정 메뉴에서 내보내는 원시 테이블 |
| [Zenith](https://code.vergara.tech/Vergara_Tech/zenith) | `importvk`을 사용해 UFVK를 가져옵니다. RPC를 통한 `listreceived`은 txid와 메모가 포함된 수신 노트를 반환하지만 송금과 수수료는 제공하지 않습니다. |
| [Zallet](https://github.com/zcash/zallet) | `z_listtransactions`은 세부 정보가 풍부하지만 실험용으로 표시되어 있으며, Zallet은 Sapling viewing key만 가져올 수 있고 UFVK는 가져올 수 없습니다. |
| [zcash-devtool](https://github.com/zcash/zcash-devtool) | `wallet init-fvk`을 사용해 UFVK를 가져온 다음 `wallet list-tx`을 사용합니다. CSV 모드에는 txid와 주소가 없으며, 프로젝트에서는 프로덕션 환경에서 사용하지 말라고 안내합니다. |

## 관련 문서

- [Viewing Keys](/zcash-tech/viewing-keys)
- [자금 복구](/using-zcash/recovering-funds)
- [Zingolib 및 Zaino 튜토리얼](/guides/zingolib-and-zaino-tutorial)
- [포럼: UFVK/seed에서 거래 내역을 JSON/CSV로 내보내기](https://forum.zcashcommunity.com/t/exporting-transaction-history-to-json-csv-from-ufvk-seed/54662)
- [포럼: Zkool 및 GraphQL](https://forum.zcashcommunity.com/t/zkool-graphql/54100)
- [zingo-cli README](https://github.com/zingolabs/zingolib/blob/zingolib_v8.0.0/zingo-cli/README.md)
