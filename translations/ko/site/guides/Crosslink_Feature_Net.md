<a href="https://github.com/zechub/zechub/edit/main/site/guides/Crosslink_Feature_Net.md" target="_blank">
  <img src="https://img.shields.io/badge/Edit-blue" alt="페이지 편집"/>
</a>

# Crosslink Feature Net 참여하기

## 요약

- Feature Net는 Shielded Labs의 [Crosslink](/zcash-tech/crosslink-protocol)용 공개 테스트 네트워크로, Zcash의 작업 증명에 스테이킹을 더하는 제안된 최종성 레이어입니다.
- 테스트 코인 cTAZ에서 실행됩니다. 여기서 하는 어떤 작업도 메인넷 ZEC을 이동시키거나 위험에 빠뜨리지 않습니다.
- 하나의 데스크톱 앱이 노드, 채굴기, 지갑 및 파이널라이저 역할을 합니다. 기본적으로 cTAZ를 채굴하며 수도꼭지 버튼도 있습니다.
- 스테이킹, 언스테이킹 및 출금은 3일마다 하루씩 있는 "Staking Day"에만 작동합니다. 놓치면 다음 날까지 기다려야 합니다.
- 스테이킹하려면 파이널라이저의 신원을 붙여 넣고 금액을 클릭합니다. 이 안내서는 예시로 ZecHub의 파이널라이저를 사용합니다.
- 두 RPC 호출로 현재 상태를 확인할 수 있습니다: `wallet_staking_positions` 및 `get_tfl_recency_status`.

*Feature Net 버전 14와 Windows 11(버전 10.0.26200.9550)에서 2026년 10월 8일부터 10일까지 테스트했습니다. 이 소프트웨어는 프로토타입이며 출시될 때마다 변경됩니다. 보이는 내용이 이 페이지와 다르면 직접 실행한 결과를 따르고 PR을 열어 주세요.*

## Feature Net란 무엇인가

Crosslink는 제안일 뿐, 현재 Zcash의 일부가 아닙니다. Shielded Labs의 [Crosslink FAQ](https://shieldedlabs.net/crosslink-faq/)에는 메인넷에 도달하기 전에 "표준 Zcash 거버넌스 절차를 거쳐야 할 것"이라고 명시되어 있습니다. [Crosslink Protocol](/zcash-tech/crosslink-protocol) 페이지에서 설계를 설명합니다.

실제 사용자와 함께 설계를 시험하기 위해 Shielded Labs는 [인센티브 기능 네트](https://shieldedlabs.net/crosslink-incentivized-feature-nets/)라고 부르는, 즉 "일련의 인센티브 테스트넷"을 운영합니다. 네트워크에는 세 가지 역할이 있으며 데스크톱 앱은 모두 수행할 수 있습니다.

| 역할 | 하는 일 |
|---|---|
| 채굴자 | 현재 Zcash처럼 작업 증명 블록을 생성합니다 |
| 스테이커 | cTAZ를 위임 본드에 잠그고 파이널라이저에 연결합니다 |
| 파이널라이저 | 블록을 최종화하기 위해 투표합니다. 투표권은 자신에게 위임된 스테이크입니다 |

그 기반 저장소는 설치 전 읽어 볼 만한 면책 조항으로 시작합니다. 이는 "프로덕션 엔지니어링을 보여 주기 위한 것이 아니라 아이디어를 증명하기 위해 존재"하며 "프로덕션 준비가 된 코드가 아닙니다" ([README](https://github.com/ShieldedLabs/crosslink_monolith/blob/v14/README.md)). 이를 감수할 수 있는 컴퓨터에서 실행하세요.

### 버전 14에서 변경된 점

[Version 14](https://github.com/ShieldedLabs/crosslink_monolith/releases/tag/v14)는 2026년 10월 1일에 출시되었습니다. 이 네트워크는 일반 작업 증명으로 시작해 세 단계로 Crosslink를 활성화합니다([source](https://github.com/ShieldedLabs/crosslink_monolith/blob/v14/librustzcash/zcash_primitives/src/bft.rs#L546-L555), [ctaz.cash](https://ctaz.cash/v14)에도 표시됨).

| 블록 | 발생하는 일 |
|---|---|
| 20,736 | 스테이킹이 시작됩니다 |
| 34,560 | 체인상의 스테이크를 기준으로 첫 파이널라이저 명단이 구성됩니다 |
| 36,288 | BFT 최종성과 스테이킹 보상이 시작됩니다 |

스테이킹 보상은 위 블록 중 마지막 블록에서 시작됩니다. 그보다 앞서 만든 본드는 그때까지 아무것도 벌지 못합니다([source](https://github.com/ShieldedLabs/crosslink_monolith/blob/v14/zebra-crosslink/zebra-chain/src/parameters/network/subsidy.rs#L487-L508)).

같은 릴리스에서는 활성 명단을 가장 많은 스테이크를 보유한 12개 파이널라이저로 줄였고([source](https://github.com/ShieldedLabs/crosslink_monolith/blob/v14/librustzcash/zcash_primitives/src/bft.rs#L884)), 릴리스 노트의 표현을 빌리면 이들에게 수수료를 부여했습니다. "블록 내 모든 PoS 보상의 10%는 이 수수료로 가고, 90%는 모든 스테이킹 본드에 분배됩니다."

### cTAZ와 실제 ZEC

cTAZ("Crosslink TAZ")는 Feature Net의 테스트 코인입니다. 스테이킹하는 것은 cTAZ이며 ZEC가 아닙니다.

실제 ZEC은 마지막에만 관여합니다. Shielded Labs는 기능 네트를 위해 [500 ZEC](https://shieldedlabs.net/crosslink-incentivized-feature-nets/)를 마련해 두었으며, [release notes](https://github.com/ShieldedLabs/crosslink_monolith/releases/tag/v14)에는 "각 참여자가 채굴 또는 스테이킹을 통해 획득한 cTAZ의 양만을 기준으로 비례 배분"된다고 적혀 있습니다. 그 결과는 두 가지입니다.

- **수도꼭지 코인은 계산되지 않습니다.** 수도꼭지나 다른 사람에게서 받은 cTAZ는 지갑에 그대로 있어도 아무것도 벌지 못합니다. 채굴과 스테이킹의 블록 보상만 계산됩니다.
- **지급금은 청구해야 하며 자동이 아닙니다.** Shielded Labs는 각 라운드를 [forum thread](https://forum.zcashcommunity.com/t/crosslink-incentivized-feature-net/55210)에서 공지합니다. Round 2에서는 참여자에게 2026년 10월 4일까지 지갑의 보기 키와 메인넷 주소를 보내 달라고 요청했습니다([post 94](https://forum.zcashcommunity.com/t/crosslink-incentivized-feature-net/55210/94)). 버전 14가 실행되는 이 안내서의 네트워크는 Round 3으로 공지되었습니다([post 101](https://forum.zcashcommunity.com/t/crosslink-incentivized-feature-net/55210/101)).

## 시작하기 전에

- **계속 켜 둘 수 있는 컴퓨터.** 릴리스는 Windows, macOS, Ubuntu 및 Arch Linux용 빌드를 제공합니다. 이 안내서는 Windows, Intel Core i5-8350U 프로세서가 탑재된 PC에서 실행했습니다.
- **Staking Day.** 계획을 세우기 전에 다음 날이 언제 시작되는지 확인하세요. [Staker Space의 대시보드](https://crosslink.staker.space/)가 카운트다운을 제공합니다.
- **그 외에는 필요 없습니다.** ZEC도, 계정도, 가입도 필요 없습니다.

## 1단계: 앱을 다운로드하고 파일 확인하기

1. [version 14 release](https://github.com/ShieldedLabs/crosslink_monolith/releases/tag/v14)를 열고 **Assets**까지 스크롤합니다.
2. 시스템에 맞는 파일을 다운로드합니다. Windows에서는 `zebrad_v14_win32.exe`입니다.
3. 파일의 SHA-256을 해당 에셋 옆에 GitHub가 표시한 다이제스트와 비교합니다.

Windows에서 PowerShell를 사용하면 다음과 같습니다.

```powershell
Get-FileHash .\zebrad_v14_win32.exe -Algorithm SHA256 | Format-List
```

```text
Algorithm : SHA256
Hash      : 1D464E31CCC110E175D45E3EDC0B7FB0B9583ACC996E99F4398F390EC111297E
Path      : C:\crosslink\zebrad_v14_win32.exe
```

GitHub가 해당 파일에 표시한 다이제스트는 `1d464e31ccc110e175d45e3edc0b7fb0b9583acc996e99f4398f390ec111297e`입니다. 16진수는 대소문자를 구분하지 않으므로 위의 대문자는 문제없습니다. 눈으로 확인하는 대신 셸이 비교하도록 하려면 다음을 사용하세요.

```powershell
$expected = "1d464e31ccc110e175d45e3edc0b7fb0b9583acc996e99f4398f390ec111297e"
$actual = (Get-FileHash .\zebrad_v14_win32.exe -Algorithm SHA256).Hash.ToLower()
if ($actual -eq $expected) { "OK" } else { "MISMATCH" }
```

```text
OK
```

이 검증의 의미를 알아 두세요. 릴리스에는 서명이 없으므로 해시가 일치한다는 것은 다운로드가 완료되었고 GitHub가 제공하는 파일이라는 뜻입니다. 누가 빌드했는지는 알 수 없습니다. [Verifying Zcash Releases](/guides/verifying-zcash-releases)에서 차이를 설명합니다.

## 2단계: 노드를 시작하고 동기화되도록 두기

시작 메시지가 화면에 남도록 터미널에서 앱을 시작하세요. "관리자 권한으로 실행"하여 연 창이 아닌 일반 PowerShell 창을 사용하세요. 이는 서명되지 않은 프로토타입 소프트웨어이며 관리자 권한이 필요하지 않습니다.

```powershell
.\zebrad_v14_win32.exe
```

"Zcash Crosslink Visualizer"라는 제목의 창이 열립니다. 왼쪽에는 **Your Wallet** 및 **Faucet Wallet** 탭이 있는 지갑이 있고, 가운데에는 체인이 그려지며, 오른쪽에는 파이널라이저가 나열됩니다. 터미널에서는 계속 노드 로그가 출력됩니다. 네트워크를 사용하는 동안 둘 다 열어 두세요.

릴리스 노트에는 [video of the Windows install](https://www.youtube.com/watch?v=cO-5Oa4B1Tk) 링크가 있습니다.

릴리스 노트에 따르면 앱은 캐시 폴더에 데이터를 유지합니다. Windows에서는 `%LOCALAPPDATA%\zebra`, Linux에서는 `~/.cache/zebra`, macOS에서는 `~/Library/Caches/zebra`입니다.

**비밀은 혼자만 간직하세요.** 이 폴더에는 `secret.seed`라는 파일이 있습니다. 앱은 처음 시작할 때 이를 만들고([source](https://github.com/ShieldedLabs/crosslink_monolith/blob/v14/zebra-crosslink/zebrad/src/commands/start.rs#L280-L305)), 여기서 지갑과 파이널라이저 신원을 파생합니다([source](https://github.com/ShieldedLabs/crosslink_monolith/blob/v14/zebra-crosslink/zebrad/src/commands/start.rs#L625-L626)). 앱에는 같은 비밀을 클립보드에 복사하는 **Copy Seed** 버튼도 있습니다. 둘 중 하나를 가진 사람은 지갑을 제어할 수 있습니다. 채팅, 포럼 게시물 또는 스크린샷에 절대 붙여 넣지 마세요.

### 동기화되었는지 확인하는 방법

릴리스 노트에는 "네트워크 팁에 얼마나 가깝게 동기화되었는지 확인하는 내장 모니터링이 없다"고 적혀 있습니다. 버전 14에는 일부 기능이 있습니다. 창 상단의 **Network Info** 드롭다운에는 PoW Height, Wallet Sync 및 Blocks Behind Known PoW 행이 있습니다([source](https://github.com/ShieldedLabs/crosslink_monolith/blob/v14/zebra-gui/src/ui.rs#L4362-L4373)). 자신의 높이를 [Staker Space](https://crosslink.staker.space/) 또는 [ctaz.cash](https://ctaz.cash/)의 높이와 비교하세요.

노드는 RPC를 통해서도 응답합니다.

```powershell
Invoke-RestMethod -Uri http://127.0.0.1:8232 -Method Post -ContentType 'application/json' -Body '{"jsonrpc":"2.0","method":"getblockcount","params":[],"id":1}' | ConvertTo-Json -Depth 20
```

```text
{
    "jsonrpc":  "2.0",
    "id":  1,
    "result":  36490
}
```

이 빌드에서는 RPC 포트 `127.0.0.1:8232`가 기본적으로 열려 있으며 비밀번호가 필요 없습니다([source](https://github.com/ShieldedLabs/crosslink_monolith/blob/v14/zebra-crosslink/zebrad/src/config.rs#L333-L337)). 자신의 컴퓨터에서만 수신 대기하지만, 해당 컴퓨터에서 실행되는 모든 프로그램이 호출할 수 있습니다.

이번 실행에서는 블록 0부터 약 블록 28,400의 팁까지 첫 동기화에 약 50분이 걸렸습니다.

**재시작 후에는 한동안 잔액이 0으로 표시됩니다.** 앱이 시작될 때마다 `secret.seed`에서 지갑을 재구성하고 블록 0부터 체인을 다시 스캔합니다([source](https://github.com/ShieldedLabs/crosslink_monolith/blob/v14/wallet/src/lib.rs#L3609-L3623)). 스캔이 거래에 도달할 때까지 잔액과 스테이크는 0으로 표시됩니다. 이번 실행에서는 재시작 후 약 15분 뒤에 복구되었습니다. 수도꼭지 지갑도 같은 방식으로 다시 스캔되며([source](https://github.com/ShieldedLabs/crosslink_monolith/blob/v14/wallet/src/lib.rs#L3588)), 스캔 중에는 Faucet Wallet 탭에 매우 큰 잔액이 표시되었습니다. Wallet Sync가 완료될 때까지 둘 다 무시하세요.

## 3단계: cTAZ 얻기

### 채굴하기

릴리스 노트에 따르면 앱은 동기화되면 자동으로 자신의 지갑에 CPU 채굴을 시작합니다. 따로 켤 필요가 없습니다. 채굴한 코인은 자신의 지갑의 투명 주소로 전송됩니다([source](https://github.com/ShieldedLabs/crosslink_monolith/blob/v14/zebra-crosslink/zebrad/src/commands/start.rs#L349-L355)).

블록을 찾는 것은 별개의 문제입니다. 노트에는 "더 빠르게 채굴하는 다른 사람에게 경쟁에서 밀릴 수 있으므로 성공이 보장되지 않는다"고 경고합니다. 기본적으로 내장 채굴기는 CPU 스레드 하나를 사용합니다([source](https://github.com/ShieldedLabs/crosslink_monolith/blob/v14/zebra-crosslink/zebra-rpc/src/config/mining.rs#L97-L100)).

더 많은 스레드를 사용하려면 앱을 시작하기 전에 같은 PowerShell 창에서 환경 변수를 설정하세요([source](https://github.com/ShieldedLabs/crosslink_monolith/blob/v14/zebra-crosslink/zebrad/src/config.rs#L109-L128)). 이번 실행에서는 네 개를 사용했습니다.

```powershell
$env:ZEBRA_MINING__INTERNAL_MINER_THREADS = "4"
.\zebrad_v14_win32.exe
```

변수는 해당 창이 열려 있는 동안에만 유지됩니다. 이를 설정하면 Windows의 프로세서 카운터는 노드가 하나의 논리 프로세서 기준 백분율로 프로세서 4~5개 분량의 시간을 사용하는 것으로 나타났습니다.

```powershell
(Get-Counter '\Process(zebrad_v14_win32)\% Processor Time' -SampleInterval 2 -MaxSamples 3).CounterSamples.CookedValue
```

```text
506.362346582771
509.688760671639
505.957457577538
```

결과적으로, Intel Core i5-8350U가 10월 8일 이른 시간부터 10월 9일 오후까지 네 스레드로 채굴했지만 블록을 하나도 찾지 못했습니다.

### 또는 수도꼭지 사용하기

앱 오른쪽 아래에는 **Receive cTAZ** 버튼이 있습니다. 버전 14 소스에서 한 번 누르면 수도꼭지 지갑에서 자신의 지갑으로 0.5 cTAZ가 전송됩니다([amount](https://github.com/ShieldedLabs/crosslink_monolith/blob/v14/wallet/src/lib.rs#L3073), [send](https://github.com/ShieldedLabs/crosslink_monolith/blob/v14/wallet/src/lib.rs#L5018-L5021)). 수도꼭지는 앱의 모든 사본에 포함된 단일 지갑이며([source](https://github.com/ShieldedLabs/crosslink_monolith/blob/v14/wallet/src/lib.rs#L3579-L3583)), **Faucet Wallet** 탭에서 그 잔액을 볼 수 있습니다.

수도꼭지에 실드 코인이 5.01 cTAZ보다 많지 않으면 버튼은 비활성화됩니다([source](https://github.com/ShieldedLabs/crosslink_monolith/blob/v14/zebra-gui/src/ui.rs#L3975-L3989)). 탭은 수도꼭지가 채굴한 코인도 세지만, 그 코인은 정확히 10 cTAZ와 수수료 단위로만 실드되므로([source](https://github.com/ShieldedLabs/crosslink_monolith/blob/v14/wallet/src/lib.rs#L4880-L4884)), 탭에 충분한 잔액이 보여도 버튼이 회색으로 유지될 수 있습니다. 이번 실행에서는 탭에 14.74695 cTAZ가 표시되었음에도 10월 8일과 9일에 회색으로 유지되었고, 마우스를 올리면 "The faucet is mining more funds."가 표시되었습니다.

**버튼이 회색이면 자신의 노드에 요청하세요.** 노드에는 버튼의 5.01 cTAZ 규칙을 적용하지 않는 수도꼭지 요청 메서드 `requestfaucetdonation`가 있습니다([source](https://github.com/ShieldedLabs/crosslink_monolith/blob/v14/zebra-crosslink/zebra-rpc/src/methods.rs#L314-L315)). 아래 `wallet_spendable_funds`의 `address` 필드인 `YOUR_ADDRESS` 대신 자신의 주소를 넣으세요.

```powershell
Invoke-RestMethod -Uri http://127.0.0.1:8232 -Method Post -ContentType 'application/json' -Body '{"jsonrpc":"2.0","method":"requestfaucetdonation","params":[{"address":"YOUR_ADDRESS"}],"id":1}' | ConvertTo-Json -Depth 20
```

```text
{
    "jsonrpc":  "2.0",
    "id":  1,
    "result":  {
                   "amount":  50000000
               }
}
```

이 응답은 요청이 전송된 것이 아니라 대기열에 들어갔다는 뜻입니다. 이번 실행에서 수도꼭지의 0.5 cTAZ는 블록 33,306에서 채굴되었고 블록 33,322에서 사용할 수 있었습니다. 수도꼭지는 공유되며 같은 주소의 두 번째 요청은 첫 번째 요청이 대기 중인 동안 거부되므로 한 번만 요청하세요([source](https://github.com/ShieldedLabs/crosslink_monolith/blob/v14/wallet/src/lib.rs#L3553)).

### 또는 다른 참여자에게 요청하기

네트워크의 누구나 앱의 **Send** 버튼으로 cTAZ를 보낼 수 있습니다. 이번 실행에서는 다른 참여자가 31 cTAZ를 보냈습니다. 이는 앱 자체의 Send가 붙이는 메모인 "send from user wallet"과 함께 "Received"로 도착했습니다([source](https://github.com/ShieldedLabs/crosslink_monolith/blob/v14/wallet/src/lib.rs#L5036)). [forum thread](https://forum.zcashcommunity.com/t/crosslink-incentivized-feature-net/55210)에서 요청하고 주소만 제공하세요.

수도꼭지 코인과 선물만으로도 스테이킹을 배울 수 있습니다. ZEC 보상에는 계산되지 않습니다.

### 사용 가능한 금액 확인하기

```powershell
Invoke-RestMethod -Uri http://127.0.0.1:8232 -Method Post -ContentType 'application/json' -Body '{"jsonrpc":"2.0","method":"wallet_spendable_funds","params":[],"id":1}' | ConvertTo-Json -Depth 20
```

수도꼭지의 0.5 cTAZ가 도착한 뒤 주소를 줄여 표시한 응답은 다음과 같습니다.

```text
{
    "jsonrpc":  "2.0",
    "id":  1,
    "result":  {
                   "address":  "utest1vqszm53j...mqmdj",
                   "committed_zats":  0,
                   "pending_zats":  0,
                   "spendable_zats":  50000000,
                   "tip_height":  33322,
                   "unshielded_zats":  0
               }
}
```

금액 단위는 zatoshi이며, 100,000,000 zatoshi가 1 cTAZ입니다. 실드 코인은 사용 가능 금액으로 계산되기까지 3회의 컨펌이 필요합니다([source](https://github.com/ShieldedLabs/crosslink_monolith/blob/v14/zebra-crosslink/zebra-rpc/src/methods.rs#L621-L634)). 수도꼭지와 다른 참여자에게서 받은 코인은 `spendable_zats`에 들어갑니다. 채굴 코인은 투명하므로 `unshielded_zats`에 들어갑니다([source](https://github.com/ShieldedLabs/crosslink_monolith/blob/v14/wallet/src/lib.rs#L4659)).

이번 실행에서 두 번째 스테이크 다음 블록에 남은 잔액은 `pending_zats` 아래에 표시되었습니다. 몇 블록 뒤 다시 사용할 수 있게 되었습니다.

## 4단계: 파이널라이저에 스테이킹하기

### Staking Day 기다리기

스테이킹, 언스테이킹 및 출금은 다음 조건일 때만 허용됩니다.

```text
block height mod 10,368 < 3,456
```

이는 매 10,368블록의 시작 부분에 있는 3,456블록 창입니다. 네트워크의 목표 블록 시간이 25초이므로 3일마다 하루입니다([source](https://github.com/ShieldedLabs/crosslink_monolith/blob/v14/librustzcash/zcash_primitives/src/transaction/mod.rs#L1540-L1547)). 버전 14의 첫 창은 블록 20,736, 31,104, 41,472 및 51,840에서 열립니다.

릴리스 노트에 따르면 앱은 각 Staking Day의 시작과 종료를 공지합니다. 이번 실행에서 블록 목록은 블록 34,559와 34,560 사이에 빨간색 "* STAKING DAY END *" 줄을 표시했습니다.

**릴리스 노트에는 두 가지 내용이 있습니다.** 변경 목록에는 코드와 일치하는 "~1 day for Staking Day and ~3 days for the Staking Cycle"가 적혀 있습니다. 아래쪽에는 Season 1에서 이어진 섹션이 여전히 Staking Day가 매 150블록마다 시작하여 70블록간 지속된다고 말합니다. 첫 번째 규칙을 따르세요. 위 종료 줄은 첫 번째 규칙이 창을 닫는 위치에 있습니다(34,560 mod 10,368 = 3,456). 두 번째 규칙이라면 블록 34,560은 창 내부에 속합니다.

### 파이널라이저 선택하기

파이널라이저는 `zfinv1`로 시작하는 문자열인 신원으로 식별됩니다. ZecHub는 자신이 운영하는 파이널라이저의 신원을 [`zechub_validator_crosslink.json`](https://github.com/ZecHub/zechub/blob/main/zechub_validator_crosslink.json)에 게시합니다.

```text
zfinv1j65qJgeSId7ssZk6a71NvQG2KjD5hfJCYxWkCSPvQSmwibffVw52UYU72wKbrEL0-cw-C4PQoO5IlLgbsgA3q_Gf1mzYIKcnixNP9XXVgphIDuLI6RBMhjFfYWyzp4YN
```

신뢰할 수 있는 출처에서 신원을 복사하세요. 릴리스 노트에 따르면 앱도 오른쪽 패널에 파이널라이저를 나열하며 각각 왼쪽에 복사 아이콘이 있습니다.

스테이킹 후 지갑 기록과 RPC는 파이널라이저를 신원 대신 16진수 키로 표시합니다. ZecHub의 파이널라이저에서 이 키는 `2941ef23...266aae8f`입니다.

신뢰하는 파이널라이저를 선택하세요. 설계에는 자동 슬래싱이 없지만, "이름으로 지정된 파이널라이저에 위임된 모든 스테이크를 소각하는 사용자 조정 하드 포크"를 허용합니다([Crosslink book, design overview](https://shieldedlabs.github.io/crosslink_book/branches/main/crosslink-design-overview-20260914.html)).

이 선택은 누가 투표하는지도 결정합니다. 모든 활성 본드는 스테이킹 보상의 몫을 얻습니다. 파이널라이저가 명단의 12개 중 하나이면 그 몫의 10분의 1이 수수료로 파이널라이저에게 갑니다. 12개 밖의 파이널라이저를 가리키는 본드는 몫 전체를 유지하지만 해당 파이널라이저는 투표하지 않습니다([source](https://github.com/ShieldedLabs/crosslink_monolith/blob/v14/zebra-crosslink/zebra-state/src/service.rs#L2063-L2079)).

### 스테이킹하기

1. 파이널라이저 신원을 복사합니다.
2. **Your Wallet** 탭에서 **Stake**를 누릅니다.
3. **Paste Identity**를 누릅니다. 버튼 위 줄이 신원의 첫 글자와 마지막 글자로 변경됩니다. ZecHub의 경우 `[zfinv1j6..YWyzp4YN]`입니다. 계속하기 전에 확인하세요.
4. 금액을 클릭합니다. 금액은 고정 단위이며 최소값은 0.01 cTAZ이고, 잔액으로 감당 가능한 금액만 활성화됩니다. 0.5 cTAZ가 있을 때는 +0.01 cTAZ 및 +0.1 cTAZ가 활성화되었습니다.

**확인을 요청하지도 않고 아무 일도 일어나지 않는 것처럼 보입니다.** 이번 실행에서 테스터의 표현으로는 "I clicked it once and nothing happened, it just turned grey and lit up back."였습니다. 스테이크는 처리되었습니다. 지갑 기록에는 "Staked @ 33334 to 2941ef23..266aae8f"가 표시되었고 수수료는 0.00015 cTAZ였으며, 지갑에는 0.010 cTAZ Staked가 표시되었습니다. 몇 분 뒤 두 번째 스테이크는 블록 33,348에 두 번째 본드를 만들었습니다.

각 스테이크는 별도의 위임 본드를 만듭니다. 고정 금액과 Staking Day는 모두 프라이버시를 위한 것으로, 한 사람의 스테이크를 다른 사람의 것과 구별하기 어렵게 만듭니다.

## 5단계: 자신의 상태 확인하기

### 내 본드

```powershell
Invoke-RestMethod -Uri http://127.0.0.1:8232 -Method Post -ContentType 'application/json' -Body '{"jsonrpc":"2.0","method":"wallet_staking_positions","params":[],"id":1}' | ConvertTo-Json -Depth 20
```

스테이킹 이틀 뒤 블록 36,490에서의 응답은 다음과 같습니다.

```text
{
    "jsonrpc":  "2.0",
    "id":  1,
    "result":  {
                   "active":  {
                                  "2941ef2309a4156342f285f9302ab601bd4dbd6b3a99b1ecde219207266aae8f":  [
                                                                                                           {
                                                                                                               "create_height":  33334,
                                                                                                               "create_txid":  "6824b24834eb8ca13befb3a817765e512fd25132166f0b38ad096503c4fc5a35",
                                                                                                               "initial_val":  1000000,
                                                                                                               "latest_val":  1003451,
                                                                                                               "pk":  "128a0ae7fef05e338d6b613939a45cb7773d8e9c98915cadef6fffa898f4e28d"
                                                                                                           },
                                                                                                           {
                                                                                                               "create_height":  33348,
                                                                                                               "create_txid":  "f4d932738ef4104b8663f21e5666e60a0236b117a7883391e9870a0029d25ba2",
                                                                                                               "initial_val":  1000000,
                                                                                                               "latest_val":  1003451,
                                                                                                               "pk":  "f113e0c15eaf6e89621314d88ed15d9fb035a5afeee4606af7173f9d60c48c0c"
                                                                                                           }
                                                                                                       ]
                              },
                   "withdrawable":  [

                                    ]
               }
}
```

이 호출에는 매개변수가 없습니다. 각 파이널라이저 키 아래에 그룹화된 자신의 활성 본드와, 언스테이킹이 완료되어 출금할 수 있는 본드를 반환합니다. 각 본드는 스테이킹 금액(`initial_val`), 현재 가치(`latest_val`), 그리고 이를 만든 거래 및 블록 높이를 보여 줍니다. 보상은 본드 자체에 추가됩니다. 블록 36,490에서 1,000,000 zatoshi 본드 각각은 1,003,451로 늘었습니다.

**Edit Stake 창은 각 본드를 실제보다 열 배 크게 표시합니다.** 이번 실행에서 각 0.01 cTAZ 본드는 자체 행에서 0.100 cTAZ로 표시되었고, 보상이 시작된 뒤에는 0.1003536 cTAZ로 표시되었습니다. 반면 행 위 총계(0.020 cTAZ, 이후 0.02007 cTAZ)는 RPC와 일치했습니다. 총계와 RPC를 따르세요.

같은 창에서는 최종성이 시작되기 전후로 파이널라이저 옆에 경고 삼각형이 표시되었습니다. 소스에서 삼각형은 앱이 해당 파이널라이저를 온라인으로 간주하지 않는다는 뜻이며, 온라인 상태면 Wi-Fi 아이콘이 표시됩니다([source](https://github.com/ShieldedLabs/crosslink_monolith/blob/v14/zebra-gui/src/ui.rs#L2646-L2648)). 그럼에도 본드는 보상을 얻었습니다.

### 파이널라이저

```powershell
Invoke-RestMethod -Uri http://127.0.0.1:8232 -Method Post -ContentType 'application/json' -Body '{"jsonrpc":"2.0","method":"get_tfl_recency_status","params":[],"id":1}' | ConvertTo-Json -Depth 20
```

릴리스 노트에 따르면 이는 노드가 투표 과정에서 어디에 있는지와 각 파이널라이저에 대해 노드가 마지막으로 들은 시점 및 투표 방식에 관한 정보를 보고합니다.

블록 36,288 이전에는 모든 필드가 0이며 목록은 비어 있습니다. 블록 33,354에서의 응답은 다음과 같습니다.

```text
{
    "jsonrpc":  "2.0",
    "id":  1,
    "result":  {
                   "now_utc":  0,
                   "my_height":  0,
                   "my_round":  0,
                   "my_step":  0,
                   "my_locked_round":  0,
                   "my_valid_round":  0,
                   "finalizer_statuses":  [

                                          ]
               }
}
```

최종성이 시작된 뒤에는 목록에 명단의 파이널라이저가 들어갑니다. 블록 36,490에는 12개가 있었고 그중 ZecHub의 `2941ef23...`도 포함되어 12개 명단 제한과 일치했습니다. 다음은 첫 항목 뒤에서 자른 응답의 시작 부분입니다.

```text
{
    "jsonrpc":  "2.0",
    "id":  1,
    "result":  {
                   "now_utc":  1791628531,
                   "my_height":  8,
                   "my_round":  0,
                   "my_step":  0,
                   "my_locked_round":  -1,
                   "my_valid_round":  -1,
                   "finalizer_statuses":  [
                                              [
                                                  "8239a79bc2f224f9f2a276a1050ec9945866253be7da4bdf27c4186c8e588dee",
                                                  {
                                                      "no_yes_votes_in_my_height":  [
                                                                                        [
                                                                                            0,
                                                                                            0
                                                                                        ],
                                                                                        [
                                                                                            0,
                                                                                            0
                                                                                        ]
                                                                                    ],
                                                      "highest_round_vote":  0,
                                                      "last_seen_new_info_utc":  0,
                                                      "last_direct_connection_utc":  null
                                                  }
                                              ],
```

몇 분 뒤 앱의 오른쪽 패널에는 "Finalizers (23)"이 표시되었습니다.

### Linux 및 macOS에서

[source](https://github.com/ShieldedLabs/crosslink_monolith/blob/v14/zebra-crosslink/zebra-rpc/src/methods.rs#L602-L610)는 호출을 `curl` 형식으로 제공합니다. 다른 호출에서는 메서드 이름을 변경하세요. 이 형식은 이 안내서에서 실행하지 않았습니다.

```bash
curl -X POST -H "Content-Type: application/json" -d \
'{ "jsonrpc": "2.0", "method": "get_tfl_recency_status", "params": [], "id": 1 }' \
http://127.0.0.1:8232
```

Linux에서는 앱에서 복사 및 붙여넣기가 작동하기 전에 `xclip`를 설치해야 할 수 있다고 릴리스 노트가 말합니다.

### 주의할 RPC 이름 하나

버전 14 릴리스 노트는 객체를 받는 `wallet_staking_action`라는 스테이킹 호출을 설명합니다. 버전 14 소스 코드에는 해당 이름의 메서드가 없으며, 이번 실행에서 노드는 다음과 같이 응답했습니다.

```text
{
    "jsonrpc":  "2.0",
    "id":  1,
    "error":  {
                  "code":  -32601,
                  "message":  "Method not found"
              }
}
```

등록된 스테이킹 메서드는 [`staking_command`](https://github.com/ShieldedLabs/crosslink_monolith/blob/v14/zebra-crosslink/zebra-rpc/src/methods.rs#L418-L420)이며, 파이널라이저를 `zfinv1` 신원으로 지정한 JSON 요청을 담은 하나의 문자열을 받습니다([source](https://github.com/ShieldedLabs/crosslink_monolith/blob/v14/zebra-crosslink/zebra-crosslink/src/lib.rs#L750-L760)). 이 안내서에서는 시도하지 않았습니다.

## 언스테이킹 및 출금

본드는 만든 당일에 취소할 수 없습니다. 시작부터 끝까지 세 번의 Staking Day가 필요합니다. 한 번에 스테이킹하고, 나중의 다른 날에 언스테이킹하며, 세 번째 날에 출금합니다. 릴리스 노트는 하나의 본드가 같은 Staking Day에 두 번의 스테이킹 작업을 할 수 없다고 덧붙입니다.

*이 안내서에서는 실행하지 않았습니다. 버전 14 릴리스 노트에 따르면,* 언스테이킹하려면 **Edit Stake**를 누르고 Staked Bonds 목록에서 본드를 선택한 뒤 체인 링크 아이콘을 클릭하세요. 이후 Staking Day에 출금하려면 **Edit Stake**를 누르고 Withdrawable Bonds 목록에서 본드를 선택한 뒤 돈 아이콘을 클릭하세요. 노트에서 리타게팅이라고 부르는, 본드를 다른 파이널라이저로 옮기는 작업은 언제든 허용됩니다.

## 네트워크를 확인할 곳

[Crosslink 탭의 ZecHub Tools](https://zechub.wiki/tools?tool=crosslink)는 "이 네트워크에서 스테이킹해도 ZEC은 이동하지 않습니다"라는 안내문 아래 도구를 한곳에 모아 둡니다.

- 노드 없이 이용하는 호스팅 도구: 높이, 채굴자, 솔루션 비율, Staking Day 카운트다운 및 최종성을 제공하는 "현재 cTAZ 테스트넷용 라이브 대시보드"인 [Staker Space](https://crosslink.staker.space/)와 채굴 생산량, 파이널라이저 명단, 피어 및 스테이킹 주소 이름 클레임을 제공하는 [ctaz.cash](https://ctaz.cash/).
- 자신의 컴퓨터에서 사용하는 도구: 활성화, 최종성 지연, 명단 및 스테이킹 포지션을 표시하는 `zcash-explorer`와 `/live/crosslink` 페이지, 그리고 Crosslink 노드의 SQLite 인덱스인 `crosslink_indexer`.

## 흔한 실수

**블록 높이 대신 시계에 맞춰 계획하기.** Staking Day는 블록으로 계산됩니다. 달력이 아니라 대시보드의 카운트다운을 확인하세요.

**창이 닫히기 직전에 스테이킹하기.** 규칙은 거래를 포함하는 블록을 기준으로 검사하므로([source](https://github.com/ShieldedLabs/crosslink_monolith/blob/v14/zebra-crosslink/zebra-consensus/src/transaction.rs#L941-L953)), 스테이크는 단순히 전송된 것이 아니라 창이 닫히기 전에 채굴되어야 합니다.

**스테이크를 채굴할 것으로 기대하기.** Intel Core i5-8350U의 4스레드 CPU 채굴기는 10월 8일부터 9일까지 블록을 하나도 찾지 못했습니다. 첫 cTAZ는 수도꼭지나 다른 참여자에게서 받으세요.

**아무 일도 일어나지 않은 것 같아 다시 클릭하기.** 금액을 클릭할 때마다 새 본드가 생성됩니다. 먼저 지갑 기록 또는 `wallet_staking_positions`을 확인하세요.

**재시작 후 당황하기.** 지갑이 다시 스캔될 때까지 잔액과 스테이크는 0으로 표시됩니다. Wallet Sync가 끝날 때까지 기다리세요.

**cTAZ를 장난감 돈으로, 비밀을 무해한 것으로 취급하기.** cTAZ는 테스트 코인이지만, 획득한 cTAZ는 실제 ZEC에서 자신의 몫을 결정합니다. `secret.seed`는 지갑처럼 보호하세요.

**오래된 안내문 읽기.** 릴리스 노트에는 새 규칙 옆에 이전 시즌의 내용도 남아 있습니다. 노트가 자신의 노드 동작과 다르면 노드가 맞습니다.

## 관련 페이지

- [Crosslink Protocol](/zcash-tech/crosslink-protocol) - 이 네트워크가 시험하는 설계
- [Shielded Labs](/zcash-organizations/shielded-labs) - Crosslink의 배후 팀
- [Verifying Zcash Releases](/guides/verifying-zcash-releases) - 체크섬이 증명하는 것과 증명하지 못하는 것
- [Zebra Full Node](/zcash-tech/zebra-full-node) - Feature Net 앱의 기반이 되는 노드
- [Zcash Testnet](/using-zcash/testnet) - 다른 네트워크인 일반 Zcash 테스트 네트워크

## 출처

- [Version 14 release notes](https://github.com/ShieldedLabs/crosslink_monolith/releases/tag/v14), Shielded Labs, 2026년 10월 1일
- [Crosslink: Incentivized Feature Nets](https://shieldedlabs.net/crosslink-incentivized-feature-nets/), Shielded Labs, 2026년 4월 2일
- [Crosslink: Incentivized Feature Net](https://forum.zcashcommunity.com/t/crosslink-incentivized-feature-net/55210), Zcash Community Forum
- [Crosslink FAQ](https://shieldedlabs.net/crosslink-faq/), Shielded Labs
- [The Crosslink book](https://shieldedlabs.github.io/crosslink_book/), Shielded Labs

---

*이 페이지의 단계는 Feature Net 버전 14 및 Windows 11(버전 10.0.26200.9550)에서 2026년 10월 8일부터 10일까지 실행되었습니다. 릴리스 노트나 소스 코드를 인용하는 설명은 해당 자료에서 가져온 것입니다. "실행하지 않음"으로 표시된 내용은 시도하지 않았습니다.*
