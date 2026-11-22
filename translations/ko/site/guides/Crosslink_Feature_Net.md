<a href="https://github.com/zechub/zechub/edit/main/site/guides/Crosslink_Feature_Net.md" target="_blank">
  <img src="https://img.shields.io/badge/Edit-blue" alt="페이지 편집"/>
</a>

# Crosslink Feature Net에 참여하기

## 요약

- Feature Net은 Shielded Labs의 [Crosslink](/zcash-tech/crosslink-protocol) 공개 테스트 네트워크입니다. Zcash의 작업 증명 옆에 스테이킹을 추가하는 최종성 계층 제안입니다.
- 테스트 코인 cTAZ를 사용합니다. 이 네트워크에서 하는 일은 메인넷 ZEC을 옮기거나 위험에 빠뜨리지 않습니다.
- 데스크톱 앱 하나가 노드, 채굴자, 지갑, 파이널라이저 역할을 합니다. 기본적으로 cTAZ를 채굴하며 파우셋 버튼도 있습니다.
- 스테이킹, 스테이킹 해제, 출금은 3일마다 하루씩 열리는 “스테이킹 데이”에만 가능합니다. 놓치면 다음 스테이킹 데이까지 기다려야 합니다.
- 스테이킹하려면 파이널라이저의 식별자를 붙여 넣고 금액을 클릭합니다. 이 가이드에서는 ZecHub의 파이널라이저를 예시로 사용합니다.
- RPC 호출 2개로 현재 상태를 확인할 수 있습니다. `wallet_staking_positions` 및 `get_tfl_recency_status`입니다.

*Feature Net 버전 14를 Windows 11(버전 10.0.26200.9550)에서 2026년 10월 8일부터 10일까지 테스트했습니다. 이 소프트웨어는 프로토타입이며 릴리스마다 바뀝니다. 화면이 이 페이지와 다르면 직접 실행한 내용을 우선으로 삼고 PR을 열어 주세요.*

**업데이트, 2026년 11월 17일: 버전 14는 더 이상 Feature Net에 참여할 수 없습니다.** [버전 15](https://github.com/ShieldedLabs/crosslink_monolith/releases/tag/v15)(10월 13일)에는 작업 증명 높이 55,296에서 네트워크 업그레이드가 적용되었습니다. [버전 16](https://github.com/ShieldedLabs/crosslink_monolith/releases/tag/v16)부터는 “각 버전이 출시된 지 2주 후에 실행을 중단하며”, Shielded Labs은 매주 릴리스를 계획하고 있습니다. [버전 17](https://github.com/ShieldedLabs/crosslink_monolith/releases/tag/v17)(11월 5일)에는 작업 증명 높이 165,000에서 또 다른 네트워크 업그레이드가 적용되었습니다. 이 글을 작성할 당시 최신 릴리스는 [버전 18](https://github.com/ShieldedLabs/crosslink_monolith/releases/tag/v18)(2026년 11월 17일)입니다. 버전 17 노드와 통신할 수 없고, 블록 189,000에서 네트워크 업그레이드가 적용되며, 블록 212,568에서 실행을 중단합니다. 이는 11월 30일경입니다. 버전 14가 아니라 [최신 릴리스](https://github.com/ShieldedLabs/crosslink_monolith/releases/latest)를 다운로드하세요. 아래 단계는 해당 버전에서 다시 실행해 확인하지 않았습니다. 알려진 차이점은 2가지입니다. 파일 이름이 바뀌었고 스테이킹 RPC가 이제 `wallet_staking_action`입니다([주의해야 할 RPC 이름](#one-rpc-name-to-watch) 참고).

## Feature Net이란

Crosslink은 제안이며, 현재 Zcash의 일부가 아닙니다. Shielded Labs의 [Crosslink FAQ](https://shieldedlabs.net/crosslink-faq/)에는 메인넷에 도입되기 전에 “표준 Zcash 거버넌스 절차를 거쳐야 한다”고 나와 있습니다. [Crosslink 프로토콜](/zcash-tech/crosslink-protocol) 페이지에서 설계를 설명합니다.

실제 사용자와 함께 설계를 시험하기 위해 Shielded Labs은 이른바 [인센티브형 기능 테스트넷](https://shieldedlabs.net/crosslink-incentivized-feature-nets/)을 운영합니다. “인센티브가 제공되는 일련의 테스트넷”입니다. 네트워크에는 3가지 역할이 있으며 데스크톱 앱 하나로 모두 수행할 수 있습니다.

| 역할 | 기능 |
|---|---|
| 채굴자 | 오늘날의 Zcash처럼 작업 증명 블록을 생성합니다 |
| 스테이커 | cTAZ를 위임 지분으로 묶고 파이널라이저에 위임합니다 |
| 파이널라이저 | 블록을 최종 확정하는 투표를 합니다. 투표권은 자신에게 위임된 지분에 따라 결정됩니다 |

이 프로젝트의 저장소에는 설치 전에 읽어 볼 만한 면책 조항이 첫머리에 있습니다. 저장소는 “아이디어를 증명하기 위한 것이지, 프로덕션 엔지니어링을 보여 주기 위한 것이 아니며”, “프로덕션에 사용할 준비가 된 코드가 아닙니다”([README](https://github.com/ShieldedLabs/crosslink_monolith/blob/v14/README.md)). 이를 허용할 수 있는 컴퓨터에서 실행하세요.

### 버전 14의 변경 사항

[버전 14](https://github.com/ShieldedLabs/crosslink_monolith/releases/tag/v14)는 2026년 10월 1일에 출시되었습니다. 네트워크는 일반 작업 증명으로 시작한 뒤 3단계에 걸쳐 Crosslink을 활성화합니다([소스](https://github.com/ShieldedLabs/crosslink_monolith/blob/v14/librustzcash/zcash_primitives/src/bft.rs#L546-L555), [ctaz.cash](https://ctaz.cash/v14)에도 나와 있음).

| 블록 | 발생하는 일 |
|---|---|
| 20,736 | 스테이킹 시작 |
| 34,560 | 체인의 지분을 기준으로 첫 파이널라이저 명단을 구성 |
| 36,288 | BFT 최종성 및 스테이킹 보상 시작 |

스테이킹 보상은 위 블록 중 마지막 블록부터 지급됩니다. 그보다 일찍 위임 지분을 설정해도 이때까지는 보상이 발생하지 않습니다([소스](https://github.com/ShieldedLabs/crosslink_monolith/blob/v14/zebra-crosslink/zebra-chain/src/parameters/network/subsidy.rs#L487-L508)).

같은 릴리스에서는 활성 파이널라이저 명단을 지분이 가장 많은 12명으로 줄였고([소스](https://github.com/ShieldedLabs/crosslink_monolith/blob/v14/librustzcash/zcash_primitives/src/bft.rs#L884)), 릴리스 노트의 표현을 빌리면 이들에게 수수료를 부여했습니다. “블록 내 모든 PoS 보상 중 10%는 이 수수료로 지급되고, 나머지 90%는 모든 위임 지분에 분배됩니다.”

### cTAZ와 실제 ZEC

cTAZ(“Crosslink TAZ”)는 Feature Net의 테스트 코인입니다. 스테이킹에는 cTAZ를 사용하며 ZEC은 사용하지 않습니다.

실제 ZEC은 마지막 단계에서만 지급됩니다. Shielded Labs은 기능 테스트넷용으로 [500 ZEC](https://shieldedlabs.net/crosslink-incentivized-feature-nets/)을 따로 마련했으며, [릴리스 노트](https://github.com/ShieldedLabs/crosslink_monolith/releases/tag/v14)에는 “각 참여자가 채굴 또는 스테이킹으로 획득한 cTAZ의 양만을 기준으로 비례 배분”한다고 나와 있습니다. 이에 따른 결과는 2가지입니다.

- **파우셋 코인은 보상 산정에 포함되지 않습니다.** 파우셋이나 다른 사람에게 받은 cTAZ는 지갑에 보유하고 있어도 보상을 얻지 못합니다. 채굴 및 스테이킹으로 받은 블록 보상만 포함됩니다.
- **지급은 자동이 아니라 직접 신청해야 합니다.** Shielded Labs은 [포럼 게시글](https://forum.zcashcommunity.com/t/crosslink-incentivized-feature-net/55210)에서 각 라운드를 공지합니다. 라운드 2에서는 참여자들에게 2026년 10월 4일까지 지갑의 viewing key와 메인넷 주소를 보내 달라고 요청했습니다([게시글 94](https://forum.zcashcommunity.com/t/crosslink-incentivized-feature-net/55210/94)). 이 가이드에서 참여하는 버전 14의 네트워크는 라운드 3으로 공지되었습니다([게시글 101](https://forum.zcashcommunity.com/t/crosslink-incentivized-feature-net/55210/101)).

## 시작하기 전에

- **계속 켜 둘 수 있는 컴퓨터.** 버전 14는 Windows, macOS, Ubuntu, Arch용 빌드를 제공했습니다Linux. 버전 17 및 18은 Windows, macOS, Ubuntu용 빌드를 제공합니다. 이 가이드는 Windows에서 Intel Core i5-8350U 프로세서를 탑재한 PC로 실행했습니다.
- **스테이킹 데이.** 계획을 세우기 전에 다음 스테이킹 데이가 언제 시작되는지 확인하세요. [Staker Space 대시보드](https://crosslink.staker.space/)에서 시작까지 남은 시간을 확인할 수 있습니다.
- **그 외에는 필요 없습니다.** ZEC도, 계정도, 가입 절차도 필요하지 않습니다.

## 1단계: 앱을 다운로드하고 파일 확인하기

1. [최신 릴리스](https://github.com/ShieldedLabs/crosslink_monolith/releases/latest)를 열고 **Assets**까지 스크롤하세요. 이 가이드는 [버전 14 릴리스](https://github.com/ShieldedLabs/crosslink_monolith/releases/tag/v14)로 실행했으며, 이 버전은 더 이상 네트워크에 참여할 수 없습니다.
2. 사용 중인 시스템에 맞는 파일을 다운로드하세요. Windows의 파일 이름은 `_win32.exe`로 끝납니다. 아래에서 실행한 파일은 `zebrad_v14_win32.exe`이고, 버전 18의 파일은 `zebra-crosslink_v18_win32.exe`입니다. 다음 명령에서는 사용자의 파일 이름과 다이제스트를 사용하세요.
3. 파일의 SHA-256 값이 GitHub에서 해당 에셋 옆에 표시된 다이제스트와 일치하는지 확인하세요.

Windows에서 PowerShell를 열고 다음을 실행하세요.

```powershell
Get-FileHash .\zebrad_v14_win32.exe -Algorithm SHA256 | Format-List
```

```text
Algorithm : SHA256
Hash      : 1D464E31CCC110E175D45E3EDC0B7FB0B9583ACC996E99F4398F390EC111297E
Path      : C:\crosslink\zebrad_v14_win32.exe
```

GitHub에 표시된 해당 파일의 다이제스트는 `1d464e31ccc110e175d45e3edc0b7fb0b9583acc996e99f4398f390ec111297e`입니다. 16진수 값은 대소문자를 구분하지 않으므로 위의 대문자 표기도 괜찮습니다. 눈으로 직접 비교하지 않고 셸에서 확인하려면 다음 명령을 실행하세요.

```powershell
$expected = "1d464e31ccc110e175d45e3edc0b7fb0b9583acc996e99f4398f390ec111297e"
$actual = (Get-FileHash .\zebrad_v14_win32.exe -Algorithm SHA256).Hash.ToLower()
if ($actual -eq $expected) { "OK" } else { "MISMATCH" }
```

```text
OK
```

이 검증으로 무엇을 확인할 수 있는지 알아 두세요. 릴리스에는 서명이 없으므로 해시가 일치한다는 것은 다운로드가 완료되었고 GitHub에서 제공하는 파일이라는 뜻입니다. 누가 파일을 빌드했는지는 알 수 없습니다. [릴리스 검증Zcash](/guides/verifying-zcash-releases)에서 그 차이를 설명합니다.

## 2단계: 노드를 시작하고 동기화하기

시작 메시지가 화면에 계속 표시되도록 터미널에서 앱을 시작하세요. “관리자 권한으로 실행”을 선택해 연 창이 아니라 일반 PowerShell 창을 사용하세요. 이 소프트웨어는 서명되지 않은 프로토타입이며 관리자 권한이 필요하지 않습니다.

```powershell
.\zebrad_v14_win32.exe
```

“Zcash Crosslink 시각화 도구”라는 제목의 창이 열립니다. 왼쪽에는 **내 지갑** 및 **파우셋 지갑** 탭이 있는 지갑이 있고, 가운데에는 체인이 표시되며, 오른쪽에는 파이널라이저 목록이 나옵니다. 터미널에는 노드 로그가 계속 표시됩니다. 네트워크를 사용하는 동안 두 창을 모두 열어 두세요.

릴리스 노트에는 [앱 설치 Windows 동영상](https://www.youtube.com/watch?v=cO-5Oa4B1Tk)이 링크되어 있습니다.

릴리스 노트에 따르면 앱 데이터는 캐시 폴더에 저장됩니다. `%LOCALAPPDATA%\zebra`은 Windows에, `~/.cache/zebra`은 Linux에, `~/Library/Caches/zebra`은 macOS에 저장됩니다.

**비밀은 본인만 알고 있어야 합니다.** 해당 폴더에는 `secret.seed`이라는 파일이 있습니다. 앱은 처음 실행할 때 이 파일을 생성하고([소스](https://github.com/ShieldedLabs/crosslink_monolith/blob/v14/zebra-crosslink/zebrad/src/commands/start.rs#L280-L305)), 이 파일에서 지갑과 파이널라이저 식별자를 파생합니다([소스](https://github.com/ShieldedLabs/crosslink_monolith/blob/v14/zebra-crosslink/zebrad/src/commands/start.rs#L625-L626)). 앱에는 동일한 비밀을 클립보드에 복사하는 **시드 복사** 버튼도 있습니다. 이 정보 중 하나라도 가진 사람은 지갑을 제어할 수 있습니다. 절대로 채팅, 포럼 게시글 또는 스크린샷에 붙여 넣지 마세요.

### 동기화 상태 확인하기

릴리스 노트에는 “네트워크 팁까지 얼마나 동기화되었는지 알려 주는 기본 모니터링 기능은 없습니다”라고 나와 있습니다. 하지만 버전 14에는 일부 모니터링 기능이 있습니다. 창 상단의 **네트워크 정보** 드롭다운에는 PoW 높이, 지갑 동기화, 알려진 PoW 기준 미처리 블록 항목이 표시됩니다([소스](https://github.com/ShieldedLabs/crosslink_monolith/blob/v14/zebra-gui/src/ui.rs#L4362-L4373)). 현재 높이를 [Staker Space](https://crosslink.staker.space/) 또는 [ctaz.cash](https://ctaz.cash/)에 표시된 높이와 비교하세요.

노드는 RPC로도 응답합니다.

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

이 빌드에서는 기본적으로 RPC 포트 `127.0.0.1:8232`이 열려 있으며 비밀번호가 필요하지 않습니다([소스](https://github.com/ShieldedLabs/crosslink_monolith/blob/v14/zebra-crosslink/zebrad/src/config.rs#L333-L337)). 사용 중인 컴퓨터에서만 요청을 받을 뿐이며, 그 컴퓨터에서 실행 중인 모든 프로그램이 호출할 수 있습니다.

이때 블록 0부터 약 28,400의 팁까지 처음 동기화하는 데 약 50분이 걸렸습니다.

**앱을 다시 시작하면 한동안 잔액이 0으로 표시됩니다.** 앱을 시작할 때마다 `secret.seed`에서 지갑을 다시 구성하고 블록 0부터 체인을 다시 검사합니다([소스](https://github.com/ShieldedLabs/crosslink_monolith/blob/v14/wallet/src/lib.rs#L3609-L3623)). 검사 범위가 사용자 거래에 도달할 때까지 잔액과 스테이킹 금액은 0으로 표시됩니다. 이 실행에서는 다시 시작한 지 약 15분 후에 잔액이 복구되었습니다. 파우셋 지갑도 같은 방식으로 다시 검사됩니다([소스](https://github.com/ShieldedLabs/crosslink_monolith/blob/v14/wallet/src/lib.rs#L3588)). 검사 중에는 파우셋 지갑 탭에 매우 큰 잔액이 표시되었습니다. 지갑 동기화가 완료될 때까지 둘 다 무시하세요.

## 3단계: cTAZ 받기

### 채굴하기

릴리스 노트에 따르면 동기화가 끝나면 앱은 사용자 지갑으로 CPU 채굴을 시작합니다. 따로 활성화할 필요가 없습니다. 채굴한 코인은 사용자 지갑의 투명 주소로 들어갑니다([소스](https://github.com/ShieldedLabs/crosslink_monolith/blob/v14/zebra-crosslink/zebrad/src/commands/start.rs#L349-L355)).

블록을 찾을 수 있을지는 별개의 문제입니다. 노트에는 “다른 사람이 더 빠르게 채굴하면 경쟁에서 밀릴 수 있으므로 성공을 보장할 수 없습니다”라고 경고되어 있습니다. 기본적으로 내장 채굴자는 CPU 스레드 1개를 사용합니다([소스](https://github.com/ShieldedLabs/crosslink_monolith/blob/v14/zebra-crosslink/zebra-rpc/src/config/mining.rs#L97-L100)).

스레드를 더 사용하려면 앱을 시작하기 전에 같은 PowerShell 창에서 환경 변수를 설정하세요([소스](https://github.com/ShieldedLabs/crosslink_monolith/blob/v14/zebra-crosslink/zebrad/src/config.rs#L109-L128)). 이 실행에서는 4개를 사용했습니다.

```powershell
$env:ZEBRA_MINING__INTERNAL_MINER_THREADS = "4"
.\zebrad_v14_win32.exe
```

환경 변수는 해당 창이 열려 있는 동안에만 유지됩니다. 설정한 뒤 Windows의 프로세서 사용량 카운터를 보면 논리 프로세서 1개를 기준으로 4~5개 프로세서에 해당하는 시간을 사용한 것으로 표시되었습니다.

```powershell
(Get-Counter '\Process(zebrad_v14_win32)\% Processor Time' -SampleInterval 2 -MaxSamples 3).CounterSamples.CookedValue
```

```text
506.362346582771
509.688760671639
505.957457577538
```

결과는 다음과 같습니다. Intel Core i5-8350U에서 4개 스레드로 10월 8일 이른 시간부터 10월 9일 오후까지 채굴했지만 블록을 하나도 찾지 못했습니다.

### 파우셋 사용하기

앱 오른쪽 아래에 **cTAZ 받기** 버튼이 있습니다. 버전 14 소스 코드에 따르면 버튼을 한 번 누르면 파우셋 지갑에서 사용자 지갑으로 0.5 cTAZ가 전송됩니다([금액](https://github.com/ShieldedLabs/crosslink_monolith/blob/v14/wallet/src/lib.rs#L3073), [전송](https://github.com/ShieldedLabs/crosslink_monolith/blob/v14/wallet/src/lib.rs#L5018-L5021)). 파우셋은 앱을 복사할 때마다 함께 들어 있는 단일 지갑이며([소스](https://github.com/ShieldedLabs/crosslink_monolith/blob/v14/wallet/src/lib.rs#L3579-L3583)), **파우셋 지갑** 탭에서 잔액을 확인할 수 있습니다.

파우셋의 거래정보 보호 코인이 5.01 cTAZ를 초과하지 않으면 버튼이 비활성화됩니다([소스](https://github.com/ShieldedLabs/crosslink_monolith/blob/v14/zebra-gui/src/ui.rs#L3975-L3989)). 탭에는 파우셋이 채굴한 코인도 포함되지만, 이 코인은 정확히 10 cTAZ 단위에 수수료를 더한 금액으로만 거래정보 보호 처리됩니다([소스](https://github.com/ShieldedLabs/crosslink_monolith/blob/v14/wallet/src/lib.rs#L4880-L4884)). 따라서 탭에 잔액이 충분히 표시되어도 버튼은 회색으로 비활성화될 수 있습니다. 이 실행에서는 10월 8일과 9일 내내 버튼이 비활성화되어 있었고, 버튼 위에 마우스를 올리면 “파우셋에서 자금을 더 채굴하고 있습니다.”라는 메시지가 표시되었습니다. 탭에는 14.74695 cTAZ가 표시되어 있었습니다.

**버튼이 비활성화되어 있으면 직접 노드에 요청하세요.** 노드에는 파우셋 요청 메서드 `requestfaucetdonation`이 있습니다([소스](https://github.com/ShieldedLabs/crosslink_monolith/blob/v14/zebra-crosslink/zebra-rpc/src/methods.rs#L314-L315)). 이 메서드에는 버튼의 5.01 cTAZ 기준이 적용되지 않습니다. `YOUR_ADDRESS` 대신 자신의 주소를 입력하세요(아래 `wallet_spendable_funds`의 `address` 필드입니다).

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

이 응답은 요청이 대기열에 추가되었다는 뜻이지, 전송되었다는 뜻은 아닙니다. 이 실행에서는 파우셋의 0.5 cTAZ가 블록 33,306에서 채굴되었고 블록 33,322에서 사용할 수 있게 되었습니다. 한 번만 요청하세요. 파우셋은 여러 사용자가 공유하며, 첫 요청이 처리 중인 동안에는 같은 주소로 들어온 두 번째 요청을 거부합니다([소스](https://github.com/ShieldedLabs/crosslink_monolith/blob/v14/wallet/src/lib.rs#L3553)).

### 다른 참여자에게 요청하기

네트워크에 있는 누구나 앱의 **보내기** 버튼으로 cTAZ를 보낼 수 있습니다. 이 실행에서는 다른 참여자가 31 cTAZ를 보냈습니다. 거래는 “받음”으로 도착했고 “사용자 지갑에서 전송”이라는 노트가 표시되었습니다. 이 노트는 앱 자체의 보내기 기능에서 추가하는 내용입니다([소스](https://github.com/ShieldedLabs/crosslink_monolith/blob/v14/wallet/src/lib.rs#L5036)). [포럼 게시글](https://forum.zcashcommunity.com/t/crosslink-incentivized-feature-net/55210)에서 요청하고 주소만 알려 주세요.

파우셋 코인과 선물로 받은 코인으로 스테이킹을 익힐 수 있습니다. 하지만 ZEC 보상에는 포함되지 않습니다.

### 사용할 수 있는 금액 확인하기

```powershell
Invoke-RestMethod -Uri http://127.0.0.1:8232 -Method Post -ContentType 'application/json' -Body '{"jsonrpc":"2.0","method":"wallet_spendable_funds","params":[],"id":1}' | ConvertTo-Json -Depth 20
```

파우셋에서 받은 0.5 cTAZ가 도착한 후의 응답입니다. 주소는 짧게 표시했습니다.

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

금액 단위는 자토시입니다. 100,000,000 자토시가 1 cTAZ입니다. 거래정보 보호 코인은 사용할 수 있는 잔액으로 계산되기 전에 확인 3회를 거쳐야 합니다([소스](https://github.com/ShieldedLabs/crosslink_monolith/blob/v14/zebra-crosslink/zebra-rpc/src/methods.rs#L621-L634)). 파우셋 및 다른 참여자에게 받은 코인은 `spendable_zats`에 들어갑니다. 채굴한 코인은 투명이므로 `unshielded_zats`에 들어갑니다([소스](https://github.com/ShieldedLabs/crosslink_monolith/blob/v14/wallet/src/lib.rs#L4659)).

이 실행에서 두 번째 스테이킹 이후 블록 1개가 지나자 잔액의 나머지가 `pending_zats` 아래에 표시되었습니다. 몇 블록이 더 지난 뒤 다시 사용할 수 있게 되었습니다.

## 4단계: 파이널라이저에 스테이킹하기

### 스테이킹 데이까지 기다리기

스테이킹, 스테이킹 해제, 출금은 다음 기간에만 가능합니다.

```text
block height mod 10,368 < 3,456
```

이는 매 10,368블록마다 시작되는 3,456블록의 기간입니다. 네트워크의 목표 블록 시간인 25초를 기준으로 하면 3일 중 하루에 해당합니다([source](https://github.com/ShieldedLabs/crosslink_monolith/blob/v14/librustzcash/zcash_primitives/src/transaction/mod.rs#L1540-L1547)). 버전 14의 첫 번째 기간은 블록 20,736, 31,104, 41,472, 51,840에서 시작됩니다.

릴리스 노트에 따르면 앱은 각 스테이킹 데이의 시작과 종료를 알립니다. 이번 실행에서 블록 목록에는 34,559와 34,560 사이에 빨간색 “* STAKING DAY END *” 줄이 표시되었습니다.

**릴리스 노트에는 2가지 내용이 있습니다.** 변경 사항 목록에는 “스테이킹 데이는 약 1일, 스테이킹 주기는 약 3일”이라고 나와 있으며, 이는 코드와 일치합니다. 아래쪽에는 시즌 1에서 그대로 가져온 섹션이 있는데, 스테이킹 데이는 150블록마다 시작되어 70블록 동안 지속된다고 되어 있습니다. 앞의 규칙을 따르세요. 위의 종료 줄은 첫 번째 규칙에 따라 기간이 끝나는 지점에 있습니다(34,560 mod 10,368 = 3,456). 두 번째 규칙에 따르면 블록 34,560은 기간 안에 해당합니다.

### 파이널라이저 선택하기

파이널라이저는 `zfinv1`로 시작하는 문자열인 ID로 식별됩니다. ZecHub는 실행 중인 파이널라이저의 ID를 [`zechub_validator_crosslink.json`](https://github.com/ZecHub/zechub/blob/main/zechub_validator_crosslink.json)에 게시합니다.

```text
zfinv1j65qJgeSId7ssZk6a71NvQG2KjD5hfJCYxWkCSPvQSmwibffVw52UYU72wKbrEL0-cw-C4PQoO5IlLgbsgA3q_Gf1mzYIKcnixNP9XXVgphIDuLI6RBMhjFfYWyzp4YN
```

신뢰하는 출처에서 ID를 복사하세요. 릴리스 노트에 따르면 앱의 오른쪽 패널에도 파이널라이저가 표시되며, 각 항목 왼쪽에 복사 아이콘이 있습니다.

스테이킹한 뒤 지갑 내역과 RPC에서는 파이널라이저의 ID 대신 16진수 키가 표시됩니다. ZecHub의 파이널라이저 키는 `2941ef23...266aae8f`입니다.

신뢰하는 파이널라이저를 선택하세요. 설계상 자동 슬래싱은 없지만, “사용자가 협력해 이름이 지정된 파이널라이저에 위임된 모든 스테이킹 지분을 소각하는 하드 포크”를 허용합니다([Crosslink book, 설계 개요](https://shieldedlabs.github.io/crosslink_book/branches/main/crosslink-design-overview-20260914.html)).

선택에 따라 투표권자도 결정됩니다. 활성 위임 지분은 모두 스테이킹 보상에서 각자의 몫을 얻습니다. 해당 파이널라이저가 명단에 있는 12개 중 하나라면, 그 몫의 10분의 1이 수수료로 파이널라이저에 지급됩니다. 명단에 없는 파이널라이저를 지정한 위임 지분은 전체 몫을 받지만, 해당 파이널라이저는 투표하지 않습니다([source](https://github.com/ShieldedLabs/crosslink_monolith/blob/v14/zebra-crosslink/zebra-state/src/service.rs#L2063-L2079)).

### 스테이킹하기

1. 파이널라이저 ID를 복사합니다.
2. **Your Wallet** 탭에서 **Stake**를 누릅니다.
3. **Paste Identity**를 누릅니다. 버튼 위의 줄에 ID의 첫 글자와 마지막 글자가 표시됩니다. `[zfinv1j6..YWyzp4YN]`은 ZecHub의 ID에 해당합니다. 계속하기 전에 확인하세요.
4. 금액을 클릭합니다. 금액은 고정된 단위로 제공되며, 가장 작은 단위는 0.01 cTAZ입니다. 잔액으로 충당할 수 있는 금액만 활성화됩니다. 0.5 cTAZ가 있을 때는 +0.01 cTAZ와 +0.1 cTAZ가 활성화되어 있었습니다.

**확인을 요구하는 메시지가 없고, 아무 일도 일어나지 않는 것처럼 보입니다.** 이번 실행에서 테스트 진행자는 “한 번 클릭했는데 아무 일도 안 일어났어요. 회색으로 바뀌었다가 다시 활성화됐을 뿐이에요.”라고 말했습니다. 스테이킹은 완료된 상태였습니다. 지갑 내역에는 “Staked @ 33334 to 2941ef23..266aae8f”라고 표시되었고, 수수료는 0.00015 cTAZ였으며, 지갑에는 스테이킹된 금액이 0.010 cTAZ로 표시되었습니다. 몇 분 뒤 두 번째로 스테이킹하자 블록 33,348에서 두 번째 위임 지분이 생성되었습니다.

스테이킹을 할 때마다 별도의 위임 지분이 생성됩니다. 고정된 금액 단위와 스테이킹 데이는 모두 프라이버시를 위한 것입니다. 이를 통해 한 사람의 스테이킹 지분을 다른 사람의 지분과 구분하기 어려워집니다.

## 5단계: 내 상태 확인하기

### 내 위임 지분

```powershell
Invoke-RestMethod -Uri http://127.0.0.1:8232 -Method Post -ContentType 'application/json' -Body '{"jsonrpc":"2.0","method":"wallet_staking_positions","params":[],"id":1}' | ConvertTo-Json -Depth 20
```

스테이킹한 지 이틀 뒤인 블록 36,490에서 다음과 같은 응답을 받았습니다.

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

이 호출에는 매개변수가 없습니다. 활성 위임 지분은 각각이 지원하는 파이널라이저의 키 아래에 모아 반환하고, 스테이킹 해제가 끝나 출금할 수 있는 위임 지분도 반환합니다. 각 위임 지분에는 스테이킹한 금액(`initial_val`), 현재 가치(`latest_val`), 그리고 해당 위임 지분을 생성한 거래와 블록 높이가 표시됩니다. 보상은 위임 지분 자체에 추가됩니다. 블록 36,490에서 1,000,000자토시였던 각 위임 지분은 1,003,451자토시로 늘어났습니다.

**Edit Stake 창에는 각 위임 지분이 실제보다 10배 크게 표시됩니다.** 이번 실행에서 각각 0.01 cTAZ인 위임 지분은 개별 행에 0.100 cTAZ로 표시되었고, 보상이 발생하기 시작한 뒤에는 0.1003536 cTAZ로 표시되었습니다. 하지만 행 위쪽의 합계(0.020 cTAZ, 이후에는 0.02007 cTAZ)는 RPC 값과 일치했습니다. 합계와 RPC를 기준으로 확인하세요.

같은 창에서 파이널라이저 옆에는 최종성이 시작되기 전과 후 모두 경고 삼각형이 표시되었습니다. 소스 코드에 따르면 이 삼각형은 앱에서 해당 파이널라이저가 온라인 상태라고 보지 않는다는 뜻이며, 온라인 상태인 파이널라이저에는 대신 Wi-Fi 아이콘이 표시됩니다([source](https://github.com/ShieldedLabs/crosslink_monolith/blob/v14/zebra-gui/src/ui.rs#L2646-L2648)). 그래도 위임 지분에는 보상이 지급되었습니다.

### 파이널라이저

```powershell
Invoke-RestMethod -Uri http://127.0.0.1:8232 -Method Post -ContentType 'application/json' -Body '{"jsonrpc":"2.0","method":"get_tfl_recency_status","params":[],"id":1}' | ConvertTo-Json -Depth 20
```

릴리스 노트에 따르면 이 항목은 투표 과정에서 노드가 어디에 있는지 보고하며, 각 파이널라이저에 대해 노드가 마지막으로 응답을 받은 시점과 파이널라이저의 투표 방식을 표시합니다.

블록 36,288 이전에는 모든 필드가 0이고 목록은 비어 있습니다. 블록 33,354에서 받은 응답은 다음과 같습니다.

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

최종성이 시작된 뒤에는 목록에 명단상의 파이널라이저가 표시됩니다. 블록 36,490에서는 12개가 표시되었으며, 그중에는 ZecHub의 `2941ef23...`도 있었습니다. 이는 명단의 한도가 12개라는 점과 일치합니다. 아래는 해당 응답의 시작 부분으로, 첫 번째 항목 뒤에서 잘라낸 것입니다.

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

몇 분 뒤 앱의 오른쪽 패널에는 “Finalizers (23)”이라고 표시되었습니다.

### Linux 및 macOS에서

[source](https://github.com/ShieldedLabs/crosslink_monolith/blob/v14/zebra-crosslink/zebra-rpc/src/methods.rs#L602-L610)에는 `curl` 형식의 호출이 나와 있습니다. 다른 호출을 하려면 메서드 이름을 바꾸세요. 이 형식은 이 가이드에서 실행하지 않았습니다.

```bash
curl -X POST -H "Content-Type: application/json" -d \
'{ "jsonrpc": "2.0", "method": "get_tfl_recency_status", "params": [], "id": 1 }' \
http://127.0.0.1:8232
```

Linux에서 릴리스 노트는 앱에서 복사 및 붙여넣기를 사용하려면 먼저 `xclip`을 설치해야 할 수 있다고 안내합니다.

### 주의할 RPC 이름 1개

버전 14 릴리스 노트에는 객체를 받는 `wallet_staking_action`이라는 스테이킹 호출이 나와 있습니다. 버전 14 소스 코드에는 이 이름의 메서드가 없으며, 이번 실행에서 노드는 다음과 같이 응답했습니다.

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

노드에 등록된 스테이킹 메서드는 [`staking_command`](https://github.com/ShieldedLabs/crosslink_monolith/blob/v14/zebra-crosslink/zebra-rpc/src/methods.rs#L418-L420)입니다. 이 메서드는 요청을 JSON으로 담은 문자열 하나를 받으며, 파이널라이저는 `zfinv1` ID로 지정합니다([source](https://github.com/ShieldedLabs/crosslink_monolith/blob/v14/zebra-crosslink/zebra-crosslink/src/lib.rs#L750-L760)). 이 메서드는 이 가이드에서 시도하지 않았습니다.

**버전 14 이후 변경 사항.** 버전 15부터 노드에는 `wallet_staking_action`가 등록되고 `staking_command`은 더 이상 없습니다([버전 18 소스 코드](https://github.com/ShieldedLabs/crosslink_monolith/blob/v18/zebra-crosslink/zebra-rpc/src/methods.rs#L620-L622)). 이 메서드는 정확히 4가지 형식 중 하나인 객체를 받습니다. 형식은 `CreateNewDelegationBond`, `RetargetDelegationBond`, `BeginDelegationUnbonding` 또는 `WithdrawDelegationBond`이며, 파이널라이저는 64자 길이의 16진수 키로 지정합니다([버전 15 릴리스 노트](https://github.com/ShieldedLabs/crosslink_monolith/releases/tag/v15)). 블록 189,000부터는 각 스테이킹 작업에 위임 지분의 현재 버전도 지정해야 합니다. 따라서 오래된 버전의 위임 지분을 기준으로 만든 작업은 거부되며, 지갑은 버전 18을 실행해야 합니다([버전 18 릴리스 노트](https://github.com/ShieldedLabs/crosslink_monolith/releases/tag/v18)). 이 메서드도 이 가이드에서는 시도하지 않았습니다.

## 스테이킹 해제 및 출금

위임 지분은 생성한 당일에 취소할 수 없습니다. 처음부터 끝까지 스테이킹 데이 3일이 걸립니다. 하루에는 스테이킹하고, 그 뒤 다른 날에 스테이킹을 해제하고, 세 번째 날에 출금합니다. 릴리스 노트에 따르면 같은 스테이킹 데이에 하나의 위임 지분에 대해 스테이킹 작업을 2번 수행할 수 없습니다.

*이 가이드에서는 실행하지 않았습니다. 버전 14 릴리스 노트의 안내입니다.* 스테이킹을 해제하려면 **Edit Stake**를 누르고 Staked Bonds 목록에서 위임 지분을 선택한 다음 체인 링크 아이콘을 클릭합니다. 이후 스테이킹 데이에 출금하려면 **Edit Stake**를 누르고 Withdrawable Bonds 목록에서 위임 지분을 선택한 다음 돈 아이콘을 클릭합니다. 릴리스 노트에서 리타겟팅이라고 부르는, 위임 지분의 파이널라이저 변경은 언제든지 가능합니다.

## 네트워크 확인하기

[ZecHub Tools의 Crosslink 탭](https://zechub.wiki/tools?tool=crosslink)에는 도구가 한곳에 모여 있으며, “이 네트워크에서 스테이킹해도 ZEC은 이동되지 않습니다”라는 안내가 표시됩니다.

- 호스팅 서비스로, 노드가 필요하지 않습니다: [Staker Space](https://crosslink.staker.space/)는 “현재 cTAZ 테스트넷을 위한 실시간 대시보드”로, 블록 높이, 채굴자, 솔루션 비율, 스테이킹 데이 카운트다운, 최종성을 보여줍니다. [ctaz.cash](https://ctaz.cash/)에는 채굴 생산량, 파이널라이저 명단, 피어, 스테이킹 주소 이름 등록 정보가 표시됩니다.
- 직접 실행하는 도구: `zcash-explorer`의 `/live/crosslink` 페이지에서는 활성화, 최종성 지연, 명단, 스테이킹 상태를 확인할 수 있으며, `crosslink_indexer`는 Crosslink 노드의 SQLite 인덱스입니다.

## 흔히 하는 실수

**블록 높이가 아니라 시계를 기준으로 계획하기.** 스테이킹 데이는 블록 수로 계산됩니다. 달력이 아니라 대시보드의 카운트다운을 확인하세요.

**기간이 끝나기 직전에 스테이킹하기.** 규칙은 거래가 포함된 블록을 기준으로 확인됩니다([source](https://github.com/ShieldedLabs/crosslink_monolith/blob/v14/zebra-crosslink/zebra-consensus/src/transaction.rs#L941-L953)). 따라서 스테이킹은 단순히 전송하는 것만으로는 부족하며, 기간이 끝나기 전에 채굴되어야 합니다.

**스테이킹한 지분을 채굴할 수 있다고 생각하기.** Intel Core i5-8350U에서 스레드 4개를 사용하는 CPU 채굴자는 10월 8일부터 9일까지 블록을 찾지 못했습니다. 파우셋이나 다른 참여자에게서 첫 cTAZ를 받으세요.

**아무 일도 일어나지 않은 것 같아 다시 클릭하기.** 금액을 클릭할 때마다 새로운 위임 지분이 생성됩니다. 먼저 지갑 내역이나 `wallet_staking_positions`을 확인하세요.

**재시작 후 당황하기.** 지갑이 다시 스캔될 때까지 잔액과 스테이킹 지분이 0으로 표시됩니다. Wallet Sync가 끝날 때까지 기다리세요.

**cTAZ를 장난감 돈으로 여기거나 비밀을 대수롭지 않게 생각하기.** cTAZ는 테스트 코인이지만, 획득한 cTAZ에 따라 실제 ZEC에서 받을 몫이 결정됩니다. `secret.seed`는 지갑을 보호하듯 안전하게 보관하세요.

**오래된 안내를 따르기.** 릴리스 노트에는 새 규칙과 함께 이전 시즌의 내용도 들어 있습니다. 노트의 내용과 노드의 동작이 다르면 노드의 동작이 맞습니다.

## 관련 페이지

- [Crosslink 프로토콜](/zcash-tech/crosslink-protocol) - 이 네트워크에서 시험하는 설계
- [Shielded Labs](/zcash-organizations/shielded-labs) - Crosslink을 만드는 팀
- [Zcash 릴리스 검증](/guides/verifying-zcash-releases) - 체크섬으로 확인할 수 있는 것과 없는 것
- [Zebra 풀 노드](/zcash-tech/zebra-full-node) - Feature Net 앱의 기반이 되는 노드
- [Zcash 테스트넷](/using-zcash/testnet) - 별개의 네트워크인 일반 Zcash 테스트 네트워크

## 출처

- [버전 14 릴리스 노트](https://github.com/ShieldedLabs/crosslink_monolith/releases/tag/v14), Shielded Labs, 2026년 10월 1일
- [Crosslink: 인센티브 기능 네트워크](https://shieldedlabs.net/crosslink-incentivized-feature-nets/), Shielded Labs, 2026년 4월 2일
- [Crosslink: 인센티브 Feature Net](https://forum.zcashcommunity.com/t/crosslink-incentivized-feature-net/55210), Zcash 커뮤니티 포럼
- [Crosslink FAQ](https://shieldedlabs.net/crosslink-faq/), Shielded Labs
- [Crosslink 책](https://shieldedlabs.github.io/crosslink_book/), Shielded Labs

---

*이 페이지의 단계는 2026년 10월 8일부터 10일까지 Feature Net 버전 14와 Windows 11(버전 10.0.26200.9550)에서 실행했습니다. 릴리스 노트나 소스 코드를 인용한 내용은 해당 자료를 바탕으로 작성했습니다. “실행하지 않음”으로 표시된 내용은 시도하지 않았습니다.*
