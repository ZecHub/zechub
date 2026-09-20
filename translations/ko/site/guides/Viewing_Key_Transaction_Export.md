<a href="https://github.com/zechub/zechub/edit/main/site/guides/Viewing_Key_Transaction_Export.md" target="_blank">
  <img src="https://img.shields.io/badge/Edit-blue" alt="페이지 편집"/>
</a>

# Viewing Key에서 거래 내역 내보내기

대부분의 지갑 내보내기 기능은 내용이 빈약합니다. 예를 들어 ZODL의 세금 내보내기는 이전 달력 연도의 날짜, 금액 및 수수료를 제공하지만, 거래 ID, 메모 및 주소는 제공하지 않습니다. 이는 장부 기록, 지갑 마이그레이션 확인 또는 결제 내역 파악에 충분하지 않습니다.

전체 상황을 파악하는 데 시드 문구는 필요하지 않습니다. 통합 전체 보기 키(UFVK, `uview1`로 시작)는 계정의 모든 수신 및 발신 거래를 볼 수 있으며, 두 도구를 사용하면 이를 보관할 파일로 만들 수 있습니다. 바로 Zkool GraphQL 서버와 zingo-cli입니다. 이 가이드는 [이 포럼 스레드](https://forum.zcashcommunity.com/t/exporting-transaction-history-to-json-csv-from-ufvk-seed/54662)의 접근 방식을 모아 현재 릴리스에 맞게 업데이트합니다.

2026년 9월에 Zkool 6.30.0 및 zingolib 6.0.0의 zingo-cli로 테스트했습니다.

## 시작하기 전에

두 가지가 필요합니다.

1. 계정의 **UFVK**. [보기 키](/zcash-tech/viewing-keys)에서 무엇을 공개하는지와 내보내는 방법을 설명합니다.
2. **출생 높이**, 즉 스캔을 시작할 블록입니다. 첫 거래보다 이전의 높이를 사용하세요. 너무 높게 설정하면 오래된 내역이 조용히 누락됩니다. 너무 낮게 설정하면 스캔 시간이 더 오래 걸릴 뿐입니다. Sapling 활성화(419200)는 항상 안전하지만 스캔에 몇 시간이 걸릴 수 있습니다.

## 비공개로 유지하기

보기 키는 사용할 수는 없지만, 보유한 사람에게 전체 내역을 보여 줍니다.

- 웹사이트나 블록 탐색기에 붙여넣지 마세요. 직접 실행하는 소프트웨어로 가져오세요.
- 동기화하는 서버는 귀하의 IP 주소와 전체로 다운로드하는 거래를 확인합니다. 아래 두 도구는 메모와 수수료를 읽기 위해 각 거래를 ID로 가져오며, [ZIP 307](https://zips.z.cash/zip-0307)에서는 이것이 서버에 어떤 거래가 귀하의 것인지 알려 준다고 지적합니다. Zebra 노드에서 Zaino 또는 lightwalletd로 동기화하면 이를 피할 수 있습니다. [Zingolib 및 Zaino 튜토리얼](/guides/zingolib-and-zaino-tutorial)에서 설정 방법을 안내합니다.
- zingo-cli 6은 Nym 믹스넷을 통해 결제를 전송하지만, 동기화는 여전히 서버에 직접 연결하므로 위 내용이 그대로 적용됩니다.
- 이 도구들에는 보기 키를 제공하고 시드는 절대 제공하지 마세요. Zkool GraphQL 서버는 기본적으로 로그인이 없으며, API는 시드로 생성된 계정의 시드를 반환할 수 있고 자금도 전송할 수 있습니다.
- 서버는 자신의 컴퓨터에서만 유지하세요. 아래 Docker 명령은 `127.0.0.1`에서만 수신합니다.
- 두 도구 모두 키와 내역을 암호화하지 않은 상태로 저장합니다. 완료되면 작업 데이터를 삭제하고 내보내기 파일은 암호화된 곳에 보관하세요.

## 옵션 1: Zkool GraphQL

`zkool_graphql`은 Zkool의 지갑 엔진을 독립형 서버로 만든 것입니다. Zkool 앱과는 별도 프로그램입니다. 실행하는 가장 간단한 방법은 공식 Docker 이미지(amd64 및 arm64)를 사용하는 것입니다. [Zkool 릴리스 페이지](https://github.com/hhanh00/zkool2/releases)에는 Linux x86-64 바이너리도 있습니다. glibc 2.38 이상이 필요하므로 Ubuntu 24.04에서는 작동하지만 Debian 12에서는 작동하지 않습니다.

### 1. 서버 시작

```bash
docker run -d --name zkool-export \
  -p 127.0.0.1:8000:8000 \
  -v zkool-export:/data \
  hhanh00/zkool-graphql:6.30.0 \
  --db-path /data/zkool.db
```

`--lwd-url`에 자체 서버를 추가하지 않는 한 `https://zec.rocks`에서 동기화합니다. 처음 시작할 때 Sapling 파라미터(약 50MB)를 다운로드합니다. 실패하면 `docker start zkool-export`에서 다시 시도합니다.

브라우저에서 `http://127.0.0.1:8000/graphiql`을 여세요. 다음 단계 각각을 այնտեղ에 붙여넣고 실행할 수 있습니다.

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

새 계정의 ID를 반환하며, 새 서버에서는 1입니다.

- 항상 `birth`을 설정하세요. 설정하지 않으면 Zkool은 현재 블록에서 시작하여 아무것도 찾지 못합니다.
- `useInternal: true`은 Zkool이 투명 잔돈 주소도 확인하게 합니다. ZODL의 키에는 계속 켜 두세요. 이는 [자금 복구](/using-zcash/recovering-funds)에서 ZODL 시드에 사용하는 것과 같은 설정입니다.

### 3. 동기화

```graphql
mutation { synchronizeAccount(idAccount: 1) }
```

동기화가 끝날 때까지 실행됩니다. `fast: true`을 추가하지 마세요. 메모, 수수료 및 출력이 나오는 전체 거래 다운로드를 건너뜁니다.

반환되는 숫자는 도달하려던 높이이지, 실제로 거기에 도달했다는 증거가 아닙니다. 네트워크 오류로 아무 보고 없이 동기화가 일찍 끝날 수 있으므로 다음을 확인하세요.

```graphql
{ currentHeight accounts { id name height } }
```

계정의 `height`이 `currentHeight`보다 뒤처져 있다면 동기화를 다시 실행하세요. 중단된 지점부터 계속합니다.

### 4. 내보내기

이를 `history.graphql`로 저장하세요.

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

의도한 경우가 아니라면 `height` 인수는 생략하세요. 이는 최소값을 설정하므로 포럼 예시의 `height: 3000000`는 해당 블록 이전의 모든 항목을 제외합니다.

JSON으로 가져오기:

```bash
jq -n --rawfile q history.graphql '{query: $q}' |
  curl -s http://127.0.0.1:8000/graphql \
    -H 'content-type: application/json' --data-binary @- > history.json
```

채굴 보상을 제외하면 모든 거래에는 0보다 큰 수수료가 표시되어야 합니다. 하나가 `"fee": "0"`으로 표시되고 메모도 없다면 세부 정보가 다운로드되지 않은 것입니다. Zkool은 스캔 후 전체 거래를 한 번에 하나씩 가져오며, 한 번 실패하면 나머지는 조용히 중단됩니다. 영향을 받은 항목을 나열하려면 다음을 사용하세요.

```bash
jq -r '.data.transactionsByAccount[] | select(.fee == "0") | .txid' history.json
```

무언가 표시되면 몇 분 후 다시 동기화하고 다시 내보내세요.

그런 다음 거래당 한 행이 되도록 CSV로 평면화합니다.

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
| `value` | 수수료를 포함한 ZEC 기준 계정의 순변동입니다. 전송의 경우 음수입니다. |
| `fee` | ZEC 기준 수수료입니다. 귀하가 받은 결제에서는 발신자가 이를 지불했으므로 `value`에 포함되지 않습니다. |
| `time` | 시간대 표기 없는 UTC 블록 시간 |
| `notes` | 잔돈을 포함하여 이 거래에서 계정이 받은 항목입니다. 귀하에게 전송된 메모는 여기에 있습니다. 투명 항목에는 주소가 없습니다. |
| `spends` | 이 거래에서 사용된 계정 자체의 노트 |
| `outputs` | 거래가 전송한 항목입니다. 모든 투명 출력과 메모가 포함된 다른 주소로의 실드 결제가 포함됩니다. |
| `pool` | 0 투명, 1 Sapling, 2 Orchard, 3 Ironwood |
| `scope` | 0 외부(수신 결제), 1 내부(잔돈) |

Zkool 앱의 계정 메뉴에도 거래, 메모 및 노트 내보내기가 있지만, 이는 원시 테이블 덤프입니다. 금액은 zatoshi 단위이고, Unix 타임스탬프이며, 메모는 별도 파일에 있습니다.

## 옵션 2: zingo-cli

zingo-cli는 Zingo의 명령줄 지갑입니다. 사전 빌드된 다운로드가 없으므로 Rust로 빌드해야 합니다.

```bash
git clone --branch zingolib_v6.0.0 https://github.com/zingolabs/zingolib.git
cd zingolib
cargo build --release -p zingo-cli
cargo build --release --manifest-path zingo-netutils/Cargo.toml --features nym --bin nym-proxy
cp zingo-netutils/target/release/nym-proxy target/release/
```

동기화만 하려는 경우에도 `nym-proxy`이 필요합니다. zingo-cli 6은 이것 없이는 어떤 서버에도 연결하지 않습니다.

첫 실행은 보기 전용 지갑을 만들고, 동기화한 뒤 내역을 출력합니다.

```bash
./target/release/zingo-cli --data-dir "$HOME/zingo-export" \
  --viewkey "uview1..." --birthday 2500000 \
  --server https://zec.rocks:443 \
  --waitsync transactions > transactions.txt
```

- `--data-dir`은 절대 경로여야 합니다.
- `--viewkey` 및 `--birthday`은 지갑을 만들 때만 적용됩니다. 그 이후에는 생략하세요.
- zingo-cli는 기본적으로 오프라인으로 시작합니다. `--server`은 서버를 선택하며 온라인 접속에 대한 동의로도 간주됩니다.
- 키가 셸 기록에 남으므로 이후에 지우세요.

이후 실행:

```bash
Z="./target/release/zingo-cli --data-dir $HOME/zingo-export"
$Z --server https://zec.rocks:443 --waitsync transactions > transactions.txt
$Z --offline value_transfers > value_transfers.txt
$Z --offline messages > memos.json
```

`--offline`은 네트워크에 접속하지 않고 이미 동기화된 내용을 읽습니다.

- `transactions`은 거래당 하나의 항목을 제공합니다: txid, 시간(UTC), 높이, 종류(`received`, `sent`, `shield` 또는 `send-to-self`), 값, 수수료 및 관련 노트입니다.
- `value_transfers`은 결제당 하나의 항목을 제공하므로, 두 사람에게 보내는 전송은 수신자 주소와 메모가 각각 포함된 두 항목이 됩니다.
- `messages`은 메모를 JSON으로 나열합니다.

출력에 대해 알아둘 몇 가지 사항:

- `transactions`과 `value_transfers`은 JSON처럼 보이지만 JSON은 아닌 일반 텍스트를 출력합니다.
- 금액은 zatoshi 단위(1 ZEC당 100,000,000)이며 항상 양수입니다. 방향은 `kind`이 알려 줍니다. 전송의 경우 `value`은 수수료를 제외하고 다른 사람에게 전송된 금액입니다.
- 본인 소유가 아닌 투명 자금을 거래가 사용할 때 수수료는 "not available"로 표시됩니다. 텍스트 메모만 표시됩니다.
- 동기화에 실패하면 오류는 파일이 아니라 터미널에 표시되고, zingo-cli는 여전히 정상적으로 종료됩니다. `transactions.txt`을 신뢰하기 전에 터미널을 확인하세요.

dismad의 [zingoHelper](https://github.com/dismad/zingoHelper)에는 `transactions`을 JSON으로 변환하는 `exportToJSON.sh` 스크립트가 있습니다. 이는 zingo-cli 6 이전에 작성되었으며, testnet용으로 설정되어 있고 일부 발신 Sapling 및 투명 항목을 자리표시자로 표시하며 GNU 도구가 필요하므로 기본 macOS에서는 실행되지 않습니다. 출력을 출발점으로만 사용하고 합계를 확인하세요.

## 보기 키로 알 수 없는 것

- **가격.** 두 도구 모두 각 거래 시점의 ZEC 가격을 기록하지 않습니다. 법정화폐 가치는 직접 추가하세요.
- **키에 포함되지 않은 경우의 투명 내역.** UFVK의 투명 부분은 [ZIP 316](https://zips.z.cash/zip-0316)에 따라 선택 사항입니다. zingo-cli에서는 `$Z --offline parse_viewkey uview1...`이 키가 어떤 풀을 포괄하는지 보여 줍니다.
- **누가 귀하에게 지불했는지.** 실드 결제에는 발신자 주소가 포함되지 않습니다. 발신자가 메모에 넣지 않았다면 어디에도 없습니다.
- **일부 발신 세부 정보.** 실드 전송의 목적지 주소, 금액 및 메모는 키로 복호화하여 복구합니다. 지갑은 이것이 가능하지 않도록 거래를 구성할 수 있지만, 대부분은 그렇지 않습니다.

## 기타 도구

| 도구 | 제공되는 내용 |
|---|---|
| ZODL | 날짜, 금액, 수수료 및 태그가 포함된 세금 CSV. 이전 달력 연도만 제공하며, 실드 처리 거래를 건너뛰고 txid, 메모 또는 주소가 없습니다. |
| Zkool 앱 | 계정 메뉴의 원시 테이블 내보내기 |
| [Zenith](https://code.vergara.tech/Vergara_Tech/zenith) | `importvk`으로 UFVK를 가져옵니다. RPC를 통한 `listreceived`은 txid와 메모가 포함된 수신 노트를 반환하지만, 전송 및 수수료는 반환하지 않습니다. |
| [Zallet](https://github.com/zcash/zallet) | `z_listtransactions`은 상세하지만 실험적이라고 표시되어 있으며, Zallet은 UFVK가 아닌 Sapling 보기 키만 가져옵니다. |
| [zcash-devtool](https://github.com/zcash/zcash-devtool) | `wallet init-fvk`으로 UFVK를 가져온 다음 `wallet list-tx`을 실행합니다. CSV 모드에는 txid나 주소가 없으며, 프로젝트에서는 프로덕션 환경에서 사용하지 말라고 안내합니다. |

## 관련 자료

- [보기 키](/zcash-tech/viewing-keys)
- [자금 복구](/using-zcash/recovering-funds)
- [Zingolib 및 Zaino 튜토리얼](/guides/zingolib-and-zaino-tutorial)
- [포럼: UFVK/시드에서 JSON/CSV로 거래 내역 내보내기](https://forum.zcashcommunity.com/t/exporting-transaction-history-to-json-csv-from-ufvk-seed/54662)
- [포럼: Zkool 및 GraphQL](https://forum.zcashcommunity.com/t/zkool-graphql/54100)
- [zingo-cli README](https://github.com/zingolabs/zingolib/blob/zingolib_v6.0.0/zingo-cli/README.md)
