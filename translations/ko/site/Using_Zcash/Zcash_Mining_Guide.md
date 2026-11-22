<a href="https://github.com/zechub/zechub/edit/main/site/Using_Zcash/Zcash_Mining_Guide.md" target="_blank">
  <img src="https://img.shields.io/badge/Edit-blue" alt="페이지 편집"/>
</a>

# Zcash 채굴 가이드: 개인 장비로 채굴 풀에 참여하기

> GPU나 ASIC을 풀에 연결하고 다른 채굴자들과 작업을 나누어, 단독 채굴로 블록을 찾을 때까지 몇 년씩 기다리는 대신 꾸준히 ZEC 보상을 받으세요.

## 요약

* Zcash는 Equihash 작업 증명 방식을 사용합니다. ASIC이 네트워크를 장악하고 있으므로 GPU는 주로 취미나 테스트용입니다.
* 소규모 장비로 단독 채굴을 해서는 블록을 찾기 어렵습니다. 풀은 해시레이트를 합산하고, 풀에서 찾은 각 블록의 보상을 나누어 지급합니다.
* 필요한 것은 3가지입니다. 보상을 받을 Zcash 지갑 주소, 채굴 장비, 채굴 소프트웨어(또는 ASIC에 내장된 대시보드)입니다.
* 풀마다 수수료(약 0~2%), 보상 지급 방식(PPLNS, PPS+), 최소 지급액, 서버 위치가 다릅니다.
* 먼저 수익성을 확인하세요. 전기 요금, 장비 비용, ZEC 가격에 따라 채굴의 수익성이 달라집니다.
* 고급 방식: 직접 Zebra 노드를 실행하고 해당 노드의 `getblocktemplate` RPC를 이용해 채굴합니다.

## 핵심 설명

채굴을 통해 새로운 Zcash 블록이 생성됩니다. 채굴자들은 Equihash 퍼즐을 풀기 위해 경쟁합니다. 가장 먼저 유효한 해답을 찾은 채굴자가 다음 블록을 추가하고 블록 보상을 받습니다. 기여하는 해시레이트가 높을수록 당첨 빈도가 높아지지만, 현재 네트워크에서는 가정용 장비 하나만으로 블록을 찾을 가능성이 거의 없습니다.

채굴 풀은 이 문제를 해결합니다. 풀은 각 채굴자에게 ‘셰어’라고 하는 작은 작업 단위를 배정합니다. 승인된 셰어마다 해시레이트를 기여했다는 사실이 증명됩니다. 풀에 참여한 채굴자 중 누군가 블록을 찾으면 셰어에 따라 보상을 나누며, 잔액이 풀의 최소 지급액을 넘으면 자동으로 보상을 지급합니다.

아래에서 단계별로 설명할 설정은 5가지 부분으로 이루어집니다.

1. 보상을 받을 지갑 주소.
2. 장비: PC에 장착한 GPU 또는 Equihash ASIC.
3. 풀 계정(또는 가입이 필요 없는 풀에서 사용할 주소).
4. 풀의 스트라텀 서버에 연결하고 사용자 이름으로 `YOUR_ADDRESS.WORKER_NAME`를 사용하는 채굴 소프트웨어.
5. 모니터링: 승인된 셰어, 해시레이트, 온도, 미지급 잔액.

## 소개

Zcash(ZEC)는 채굴에 Equihash 작업 증명 알고리즘을 사용하는 프라이버시 중심 암호화폐입니다. Zcash 채굴은 컴퓨팅 파워를 사용해 복잡한 수학 문제를 풀고 거래를 검증하며 네트워크를 보호하고, 그 대가로 ZEC 보상을 받는 과정입니다. 네트워크 난도가 높기 때문에 대부분의 사용자에게 단독 채굴은 권장되지 않습니다. 다른 사람들과 해시 파워를 합쳐 꾸준히 보상을 받으려면 채굴 풀에 참여하는 것이 가장 좋습니다.

이 가이드에서는 개인 장비(예: GPU가 장착된 가정용 PC 또는 보급형 ASIC)를 사용해 Zcash를 채굴하는 방법을 다룹니다. GPU로도 여전히 Zcash를 채굴할 수 있지만, 네트워크 난도를 고려하면 2026년에는 ASIC이 훨씬 더 효율적이고 수익성이 높습니다. 전기 요금, 장비 가격, ZEC 가치 등의 요인이 수익성에 영향을 미치므로 WhatToMine.com과 같은 도구를 사용해 항상 최신 수익성을 확인하세요. 모든 사람에게 채굴이 수익성이 있는 것은 아닙니다. 현지 규정과 전기 요금을 확인하고, kWh당 $0.08 미만을 목표로 하세요.


## 요구 사항

### 하드웨어
- **GPU 채굴(초보자에게 권장하는 개인용 설정):**
  - VRAM이 4GB 이상인 NVIDIA 또는 AMD GPU(예: NVIDIA GTX 1070, RTX 3060, AMD RX 580 이상).
  - 호환되는 메인보드, 충분한 용량의 PSU(여러 GPU를 사용하는 경우 최소 750W), 과열을 막을 수 있는 양호한 냉각 장치.
  - 해시레이트를 높이기 위해 여러 GPU를 사용하는 채굴 장비가 흔합니다(예: GPU 6개로 1~2 kSol/s 달성 가능).
- **ASIC 채굴(효율성은 높지만 비용이 더 많이 듦):**
  - Bitmain Antminer Z15(420 kSol/s) 또는 Innosilicon A9(50 kSol/s)와 같은 Equihash 호환 ASIC.
  - 소음과 발열이 더 크고 전력 소비량도 많으므로(예: 1,500W 이상) 전용 공간에 적합합니다. Bitmain.com 또는 Blockware Mining과 같은 재판매업체 등 신뢰할 수 있는 판매처에서 구매하세요.
- **일반 사항:** 안정적인 인터넷 연결과 설정 및 모니터링용 컴퓨터가 필요합니다. ASIC이 네트워크를 장악하고 있어(2026년 전체 해시레이트 약 13 GSol/s) GPU 채굴은 경쟁력이 낮지만, 취미로는 여전히 가능합니다.

### 소프트웨어
- **운영 체제:** Windows 10/11, Linux(안정성을 위해 Ubuntu 권장).
- **채굴 소프트웨어:**
  - GPU용: lolMiner(AMD/NVIDIA 지원), GMiner 또는 miniZ(NVIDIA 중심)를 사용합니다. 공식 GitHub 저장소에서 다운로드하세요(예: github.com/Lolliedieb/lolMiner-releases).
  - ASIC용: 제조사의 기본 펌웨어/대시보드를 사용합니다(예: Bitmain 웹 인터페이스).
- **지갑:** 보상을 받을 Zcash 지갑입니다. 권장 지갑:
  - 거래정보 보호(비공개): ZODL Wallet, Zingo(모바일/데스크톱), Zkool(모바일/데스크톱).
  - 투명(더 간편하지만 프라이버시 보호 수준이 낮음): Edge Wallet.
  - [wallets](https://zechub.wiki/wallets)에서 다운로드하세요. 풀이 지원하는 경우 프라이버시 보호를 위해 거래정보 보호 주소(‘zs’로 시작)를 생성하세요.

### 기타
- 전기: 비용을 계산하세요. GPU는 카드당 150~300W, ASIC은 1,000W 이상을 사용합니다.
- 바이러스 백신: 설정 중 채굴 소프트웨어를 위협 요소로 탐지할 수 있으므로 비활성화하세요.

## 채굴 풀 참여 단계별 가이드

### 1단계: Zcash 지갑 설정
1. 공식 Zcash 웹사이트 [wallets](https://zechub.wiki/wallets)에서 지갑을 다운로드하고 설치합니다.
2. 새 지갑을 만들고 seed phrase를 안전하게 백업합니다.
3. 받을 주소를 생성합니다(프라이버시 보호를 위해 거래정보 보호 주소 권장). 예를 들어 `zs1exampleaddress...`와 같이 주소를 적어 둡니다.
4. 투명 주소(‘t’로 시작)를 사용하는 경우 더 간편하지만 프라이버시 보호 수준은 낮습니다.

### 2단계: 하드웨어 준비
- GPU:
  1. PC에 GPU를 설치하고 드라이버를 업데이트합니다(NVIDIA: GeForce Experience, AMD: Radeon Software).
  2. 경험이 있는 경우 오버클록을 설정합니다(안정성을 위해 MSI Afterburner를 사용하고, 효율성을 높이려면 코어 클록을 +100~200, 메모리를 -500으로 설정합니다).
- ASIC:
  1. ASIC을 전원과 이더넷에 연결합니다.
  2. Advanced IP Scanner와 같은 도구나 제조사 앱을 사용해 IP 주소를 찾습니다.
  3. 웹 대시보드에 접속합니다(예: 브라우저에 IP 주소 입력, Bitmain 기본 로그인 정보: root/root).

**주의:** 환기가 잘되는지 확인하세요. 채굴 시 열이 발생합니다. 소규모로 시작해 테스트하세요.

### 3단계: 채굴 풀 선택 및 참여
채굴 풀은 기여한 해시레이트에 따라 작업을 배분하고 보상을 나눕니다. 수수료(0~2%), 최소 지급액(0.01~0.1 ZEC), 위치(핑이 낮은 곳), 안정성을 기준으로 풀을 선택하세요.

**권장 풀(해시레이트, 수수료, 평가 기준):**
- **2Miners (zec.2miners.com)**: 수수료 1%, PPLNS 지급 방식, GPU/ASIC/NiceHash 지원. 해시레이트가 높고(약 1.17 GSol/s) 서버가 안정적입니다.
- **F2Pool (zec.f2pool.com)**: 수수료 2%, PPS+ 지급 방식, 여러 코인 지원. 대형 풀입니다(약 2.57 GSol/s).
- **ViaBTC (zec.viabtc.com)**: 수수료 2%(PPS+), 사용하기 편리한 대시보드, 전 세계 서버.
- **AntPool (zec.antpool.com)**: 수수료 1%, Bitmain 운영, ASIC에 적합합니다(약 494 MSol/s).
- **Foundry Zcash Pool (foundrydigital.com/foundry-zcash-pool/)**: Foundry Digital이 운영하는 전문 Zcash 채굴 풀입니다. PPLNS 지급 방식을 사용하며, 투명한 보상 내역과 엔터프라이즈급 지원을 제공합니다. 기관 및 대규모 ASIC 채굴자에게 가장 적합하며 계정 인증이 필요합니다.
- **Sovright (mining.sovright.com)**: Stratum V2를 기반으로 구축된 Zcash 풀로, 현재 공개 테스트넷으로 운영 중입니다. 실제 ZEC 보상은 아직 지급되지 않으므로 수익원이 아니라 설정을 테스트하는 용도로 이용하세요. 자세한 내용은 아래 전용 섹션을 참조하세요.
- 기타: Kryptex Pool, Luxor(실시간 통계는 poolwatch.io/coin/zcash에서 확인하세요).

1. 풀 웹사이트에 방문해 계정을 만듭니다(이메일 필요 여부는 풀마다 다르며, 2Miners와 같이 가입이 필요 없는 곳도 있습니다).
2. 보상 지급을 위해 설정에 Zcash 지갑 주소를 추가합니다.
3. 풀의 스트라텀 서버(예: zec.2miners.com:1010)와 포트를 확인합니다.

### 4단계: 채굴 소프트웨어 설치 및 구성
- GPU용(예: Windows/Linux에서 lolMiner 사용):
  1. GitHub에서 lolMiner를 다운로드합니다(최신 버전, 예: 1.88).
  2. 폴더에 압축을 풉니다.
  3. 다음 설정을 사용해 배치 파일(start.bat)을 만듭니다.
     ```
     lolMiner.exe --coin ZEC --pool zec.2miners.com:1010 --user YOUR_WALLET_ADDRESS.WORKER_NAME --pass x
     ```
     - `YOUR_WALLET_ADDRESS`를 본인의 ZEC 주소로 바꿉니다.
     - `WORKER_NAME`: 채굴 장비 이름(예: Rig1)입니다.
     - EU 서버: eu.zec.2miners.com:1010.
  4. 배치 파일을 실행합니다. 풀에 연결되어 채굴을 시작합니다.
- ASIC용(예: Bitmain Antminer):
  1. 웹 대시보드에 로그인합니다.
  2. Miner Configuration으로 이동합니다.
  3. 풀 정보를 추가합니다.
     - URL: stratum+tcp://zec.2miners.com:1010
     - 사용자 이름: YOUR_WALLET_ADDRESS.WORKER_NAME
     - 비밀번호: x(또는 비워 둠).
  4. 저장하고 채굴기를 재부팅합니다.
- 다른 소프트웨어(예: GMiner)의 경우:
  ```
  miner.exe --algo 125_4 --server zec.2miners.com:1010 --user YOUR_WALLET_ADDRESS.WORKER_NAME --pass x
  ```

**테스트:** 10~15분 동안 실행하고 콘솔에서 승인된 셰어와 해시레이트를 확인합니다.

### 5단계: 채굴 시작 및 모니터링
1. 채굴기를 실행합니다. 풀에 연결되어 셰어 제출을 시작합니다.
2. 다음 방법으로 모니터링합니다.
   - 풀 대시보드: 지갑 주소를 입력해 해시레이트, 미지급 잔액, 통계를 확인합니다.
   - 소프트웨어 콘솔: 오류와 온도를 확인합니다(80°C 미만으로 유지).
   - 도구: 원격으로 채굴 장비를 관리하려면 HiveOS 또는 SimpleMining OS를 사용합니다.
3. 보상 지급: 대부분의 풀은 최소 지급액(예: 0.05 ZEC)에 도달하면 자동으로 지급합니다. 풀 규정을 확인하세요.

   
![Zcash Mining Monitoring Setup](/content-images/zcashMining-5ca0019c17.webp)


### Foundry Zcash 풀 모니터링

Foundry Zcash 풀 사용자:

- Foundry 풀 대시보드에서 채굴기 성능을 모니터링합니다.
- 다음 항목을 확인합니다.
  - 활성 작업자
  - 보고된 해시레이트
  - 승인된 셰어
  - 예상 보상
  - 지급 상태

Foundry는 PPLNS 보상 모델을 사용하므로 채굴 보상은 순간적인 해시레이트만이 아니라 풀의 보상 기간 동안 기여한 셰어에 따라 달라집니다.

권장 모니터링 방법:
- ASIC 대시보드에 표시된 해시레이트와 Foundry에서 보고한 해시레이트를 비교합니다.
- 거부된 셰어, 오래된 셰어 또는 불안정한 연결을 확인합니다.
- 네트워크 연결을 안정적으로 유지합니다. 가동 중단이 발생하면 제출된 셰어와 예상 보상이 줄어듭니다.


## Sovright: 테스트넷 풀 및 릴레이 네트워크

Sovright(sovright.com)는 Stratum V2 채굴 풀과 별도의 블록 릴레이 네트워크를 운영합니다. 두 서비스의 역할은 다르므로 아래에서 따로 설명합니다.

### 채굴 풀(mining.sovright.com)

Sovright의 풀은 메인넷이 아니라 공개 Zcash 테스트넷(NU6, Stratum V2)에서 운영됩니다. 테스트넷에서는 실제 ZEC가 지급되지 않습니다. 수익을 얻는 용도가 아니라 채굴기 설정을 테스트하는 용도로 이용하세요.

- 계정 없이 시작할 수 있습니다. CPU 또는 ASIC Equihash 채굴기를 풀에 연결하면 셰어가 실시간 대시보드에 표시됩니다.
- Sovright는 풀에서 제공하는 작업을 그대로 받는 대신 자체 블록 템플릿을 선택하려는 채굴자를 위해 오픈 소스 Stratum V2 프록시도 공개했습니다.

  ```
  git clone https://github.com/sovright/mining-infra
  cd mining-infra
  cargo build --release -p sovright-v1-stratum-proxy
  ./target/release/sovright-v1-stratum-proxy --listen 0.0.0.0:3334 --upstream 34.28.134.13:3333
  ```
  채굴기를 풀에 직접 연결하는 대신 프록시에 연결하세요.
  ```
  stratum+tcp://<your-proxy-ip>:3334
  ```
  작업자 이름은 `yourname.rig1`와 같이 지정하면 됩니다.
- Sovright의 투명성 페이지에는 거래정보 보호 거래를 걸러내는 일부 풀과 달리 모든 거래정보 보호 거래를 포함하는 정책이 명시되어 있습니다. 각 블록에는 서명된 증명 자료가 첨부되므로 정책을 독립적으로 확인할 수 있습니다.
- mining.sovright.com에서 계정을 만들면(Google 또는 이메일 로그인) 예시 대시보드 데이터 대신 본인의 작업자를 추적할 수 있습니다.

### 릴레이 네트워크(relay.sovright.com)

Sovright는 Zcash 메인넷에서 별도의 공개 블록 릴레이 네트워크를 운영합니다. 풀이 블록을 찾은 경우 해당 블록이 네트워크의 나머지 부분에 얼마나 빨리 도달하는지에 따라 고아 블록이 되는 빈도가 달라집니다. 고아 블록은 전파 경쟁에서 져서 보상을 잃은 블록을 말합니다. 릴레이는 순방향 오류 정정을 적용한 압축 블록 릴레이를 사용해 4개 지역에 블록을 전달합니다.

공개 대시보드에서 실시간 효과를 확인할 수 있습니다. 릴레이에 연결된 지역에서는 단순한 피어 투 피어 가십 방식보다 훨씬 짧은 시간 안에 새 블록이 도달하며, 대시보드에는 네트워크의 실시간 고아 블록 비율이 표시됩니다.

이 인프라는 개별 채굴자가 아니라 풀 운영자를 위한 것입니다. Sovright의 오픈 소스 `mining-infra` 저장소에는 새로 찾은 블록을 기본 P2P보다 빠르게 메시 네트워크에 전달하는 `submitblock` 릴레이 게이트웨이가 설명되어 있습니다. 연결하려면 릴레이 피어 주소와 인증 키를 Sovright에 직접 문의하세요(support@sovright.com).


## 자체 Zebra 노드를 사용한 채굴

위에서 설명한 방법은 모두 다른 사람이 운영하는 풀에 채굴기를 연결합니다. 다른 방법은 직접 노드를 실행하고 채굴 소프트웨어가 해당 노드에 작업을 요청하도록 하는 것입니다. zcashd가 2026년 7월 18일에 중단되었으므로 이 방식에서는 이 섹션에서 다루는 노드인 [Zebra](/zcash-tech/zebra-full-node)을 사용합니다.

Zebra의 역할은 한정적이고 명확합니다. 블록 템플릿을 만들고 RPC 인터페이스로 제출된 해답 블록을 받습니다. 해시 계산은 채굴 소프트웨어가 담당하며, 여러 채굴자 간 보상 분배는 풀 소프트웨어가 담당합니다. 단독 채굴로 블록을 찾을 수 있는지는 네트워크 해시레이트 중 본인이 차지하는 비중에 따라 달라지며, 이 섹션에서는 이를 추정하지 않습니다. 따라서 이 페이지의 서문에서는 대부분의 사용자에게 단독 채굴을 권장하지 않습니다.

다음 단계는 2026년 10월 8일 기준으로 작성된 두 Zebra Book 페이지인 [Mining Zcash with Zebra](https://zebra.zfnd.org/user/mining.html)와 [Mining with Zebra in Docker](https://zebra.zfnd.org/user/mining-docker.html)을 따릅니다. 키 이름과 기본값은 릴리스마다 달라지므로 이를 기준으로 삼기 전에 Book에서 확인하세요.

### 보상을 받을 주소 설정

기본 설정으로 구성 파일을 만든 다음 편집합니다.

```bash
mkdir -p ~/.config
zebrad generate -o ~/.config/zebrad.toml
```

채굴자 주소가 필요합니다([Book: 채굴자 주소](https://zebra.zfnd.org/user/mining.html#miner-address)).

```toml
[mining]
miner_address = "YOUR_ADDRESS"
```

Zebra는 투명 P2PKH 또는 P2SH 주소, Sapling 주소, Unified Address를 지원합니다. 수신자가 여러 개인 Unified Address를 사용하는 경우, Book에 따르면 Zebra는 단일 수신자에게 지급하며 “Orchard를 우선하고, 그다음 Sapling, 마지막으로 투명 주소를 선택합니다”.

같은 `[mining]` 섹션에 선택 사항인 키 2개를 추가할 수 있습니다.

| 키 | 기능 | 제한 |
|---|---|---|
| `extra_coinbase_data` | 채굴하는 모든 블록의 코인베이스 입력에 풀 이름과 같은 공개 태그를 Zebra 자체 표식 뒤에 추가합니다([Book](https://zebra.zfnd.org/user/mining.html#extra-coinbase-data)). | 86바이트. 초과하면 “Zebra가 시작을 거부합니다” |
| `miner_memo` | 보상 출력에 거래정보 보호 메모를 첨부합니다. `extra_coinbase_data`와 달리 공개되지 않으며, 수신 주소의 viewing key를 가진 사람만 읽을 수 있습니다([Book](https://zebra.zfnd.org/user/mining.html#miner-memo)). | 512바이트. 보상이 거래정보 보호 수신자에게 지급될 때만 작동합니다. 투명 주소를 사용하면 “아무런 알림 없이 적용되지 않습니다”. |

### RPC 포트 열기

채굴 소프트웨어는 JSON-RPC를 통해 Zebra와 통신합니다. 수신 대기 주소를 지정하기 전까지는 RPC가 비활성 상태입니다([Book: RPC 섹션](https://zebra.zfnd.org/user/mining.html#rpc-section)).

```toml
[rpc]
listen_addr = "127.0.0.1:8232"
```

8232는 메인넷의 표준 RPC 포트입니다. `127.0.0.1`는 같은 컴퓨터에서만 해당 포트에 접근할 수 있도록 합니다.

Zebra 2.0.0부터 RPC 포트는 zcashd가 사용했던 방식과 유사한 쿠키로 보호됩니다. RPC 엔드포인트가 시작될 때 Zebra가 쿠키를 작성하고 종료 시 삭제합니다. 기본적으로 파일은 Zebra의 캐시 디렉터리에 저장됩니다. 예를 들어 Linux에서는 `/home/user/.cache/zebra/.cookie`에 저장되며, 다음과 같이 한 줄로 되어 있습니다.

```text
__cookie__:PASSWORD
```

`rpc.cookie_dir`는 파일 위치를 바꿉니다. `rpc.enable_cookie_auth = false`는 검사를 비활성화하며, 이와 함께 RPC 포트의 유일한 인증 수단도 비활성화됩니다. 그러면 포트에 접근할 수 있는 모든 사용자가 RPC를 호출할 수 있습니다.

### Zebra 시작 후 동기화 완료 대기

```bash
zebrad
```

Zebra는 기본 위치에서 구성 파일을 읽습니다. 다른 파일을 사용하려면 `-c /path/to/zebrad.toml`를 지정합니다. 동기화가 끝날 때까지 기다립니다. 완료되면 로그에 `sync_percent=100.000%`가 표시됩니다([Book: Zebra 실행](https://zebra.zfnd.org/user/mining.html#running-zebra)). [Zebra 풀 노드](/zcash-tech/zebra-full-node)에서 하드웨어와 디스크 공간을 확인하세요.

### getblocktemplate으로 확인

`getblocktemplate`는 채굴 소프트웨어가 작업을 가져올 때 호출하는 메서드이므로 가장 빠르게 설정을 테스트할 수 있는 방법이기도 합니다([Book: 설정 테스트](https://zebra.zfnd.org/user/mining.html#testing-the-setup)). 쿠키 파일의 내용을 `__cookie__:PASSWORD` 대신 입력합니다.

```bash
curl --silent --data-binary '{"jsonrpc": "1.0", "id":"curltest", "method": "getblocktemplate", "params": [] }' -H 'Content-type: application/json' http://__cookie__:PASSWORD@127.0.0.1:8232/ | jq
```

정상적으로 설정되면 채굴기에 필요한 필드가 포함된 `result` 객체가 반환됩니다. 주요 필드로는 `previousblockhash`, `coinbasetxn`, `target`, `height`가 있습니다. `extra_coinbase_data`를 설정한 경우, Book에서 `coinbasetxn.data`에 태그가 있는지 확인하는 방법을 설명합니다.

### 채굴 소프트웨어 연결

채굴 소프트웨어 또는 풀 소프트웨어에 RPC 엔드포인트 `127.0.0.1:8232`와 쿠키에 적힌 사용자 이름 및 비밀번호를 제공합니다. Book에 따르면 Zebra는 “대부분의 채굴 풀 소프트웨어를 실행하는 데 필요한 RPC 메서드를 지원합니다”([Book: 채굴 풀 실행](https://zebra.zfnd.org/user/mining.html#run-a-mining-pool)).

소프트웨어를 선택하기 전에 Book의 다음 두 가지 안내를 확인하세요.

- **s-nomp는 테스트용으로만 사용하세요.** Book은 s-nomp 설정을 “실험적”이라고 설명하고, “s-nomp는 NU5와 호환되지 않으므로 일부 채굴 기능이 비활성화됩니다”라고 안내합니다. [테스트넷 가이드](https://zebra.zfnd.org/user/mining-testnet-s-nomp.html)에는 s-nomp가 “NU5 또는 이후 네트워크 업그레이드에 맞춰 공식 업데이트되지 않았습니다”라는 내용이 있으며, 운영 환경의 채굴자에게는 현재 업그레이드를 지원하는 풀 소프트웨어를 사용하도록 안내합니다.
- **Zebra는 바로 사용할 수 있는 스택을 제공합니다.** Zebra 저장소에는 [`docker/mining/`](https://github.com/ZcashFoundation/zebra/tree/main/docker/mining)의 Docker Compose 설정이 포함되어 있습니다. 이 설정은 Zebra와 채굴 풀을 실행하고, 요청하면 CPU 채굴기도 실행합니다. 풀 소프트웨어는 s-nomp이며 설정을 변경하지 않으면 테스트넷에서 시작합니다. 따라서 구성 요소 간의 작동 방식을 익히는 용도로 사용하세요.

### Docker 방식

가장 간단한 Book 경로는 [Book: Zebra을 사용한 Docker](https://zebra.zfnd.org/user/mining-docker.html) 채굴의 `zfnd/zebra` Docker 이미지입니다. 주소와 RPC 포트는 환경 변수로 전달합니다. 아래 명령은 Book의 명령에서 한 가지만 변경한 것입니다. RPC 포트를 호스트의 루프백 주소에만 공개하므로 다른 컴퓨터에서는 접근할 수 없습니다.

```bash
docker run -d --name zebra_local \
  -e ZEBRA_MINING__MINER_ADDRESS="YOUR_ADDRESS" \
  -e ZEBRA_RPC__LISTEN_ADDR=0.0.0.0:8232 \
  -p 8233:8233 \
  -p 127.0.0.1:8232:8232 \
  -v zebrad-cache:/home/zebra/.cache/zebra \
  zfnd/zebra:latest
```

이 명령은 메인넷 노드를 시작하고 P2P 포트(8233)를 Docker 호스트에 공개하며, 호스트 자체에서만 RPC 포트(8232)에 접근할 수 있도록 합니다. 다음 명령으로 쿠키를 출력합니다.

```bash
docker exec -it zebra_local cat /home/zebra/.cache/zebra/.cookie
```

- **`0.0.0.0`를 `ZEBRA_RPC__LISTEN_ADDR`로 유지하세요.** 이는 Zebra가 컨테이너 내부에서 수신 대기하는 주소입니다. Docker는 공개된 포트를 컨테이너 자체의 네트워크 인터페이스로 전달합니다. 따라서 호스트에서 연결하더라도 컨테이너 내부에서 `127.0.0.1`를 수신 대기하는 Zebra는 연결을 받지 못합니다. `-p` 앞에 있는 `127.0.0.1:`가 포트가 네트워크에 노출되지 않도록 합니다.
- **Book의 명령**은 `-p 8232:8232`를 사용해 RPC 포트를 공개합니다. 그러면 호스트의 모든 네트워크 인터페이스에서 해당 포트에 접근할 수 있습니다.
- **테스트넷에서 연습하려면** `-e ZEBRA_NETWORK__NETWORK="Testnet"`를 추가하고, `ZEBRA_RPC__LISTEN_ADDR=0.0.0.0:18232`를 설정하고, `-p 18233:18233`와 `-p 127.0.0.1:18232:18232`를 공개한 다음 테스트넷 주소를 입력합니다. 메인넷 주소를 지정하면 Zebra가 테스트넷에서 시작되지 않으며, 반대의 경우도 마찬가지입니다.

채굴자에게 보상을 지급하는 것과 지갑을 관리하는 것은 이 섹션의 범위에 포함되지 않습니다. 지갑 관련 내용은 [Zallet](/zcash-tech/zallet)을 참조하세요.

## 팁 및 모범 사례
- **수익성:** whattomine.com/coins/166-zec-equihash와 같은 계산기를 사용하세요. 예를 들어 RTX 3060(약 300 Sol/s)은 ZEC당 $50일 때 하루 약 0.001 ZEC를 벌며, 전기 요금 약 $0.50을 제외해야 합니다.
- **프라이버시:** 사용 가능한 경우 거래정보 보호 구역을 사용하고 주소를 재사용하지 마세요.
- **보안:** 강력한 비밀번호를 사용하고 풀/지갑에서 2단계 인증을 활성화하세요. 개인 키를 절대 공유하지 마세요.
- **문제 해결:** 셰어가 제출되지 않으면 방화벽, 바이러스 백신, 잘못된 설정을 확인하세요. forum.zcashcommunity.com 또는 Reddit r/zec과 같은 포럼에 참여하세요.
- **대안:** 수익성이 없다면 클라우드 채굴이나 다른 코인의 스테이킹을 고려하세요.
- **환경 참고:** 채굴은 에너지를 소비하므로 가능하면 재생 에너지를 사용하세요.
- **업데이트:** Zcash는 변경될 수 있습니다(예: 향후 PoS 전환 가능성). 소식은 z.cash에서 확인하세요.
