# Zcash 채굴 가이드: 개인 하드웨어로 채굴 풀 참여하기

## 소개

Zcash(ZEC)은 채굴에 Equihash 작업 증명 알고리즘을 사용하는 프라이버시 중심 암호화폐입니다. Zcash 채굴은 컴퓨팅 성능을 사용하여 복잡한 수학 문제를 해결하고, 거래를 검증하며, ZEC 보상을 받는 대가로 네트워크를 보호하는 과정입니다. 네트워크 난이도가 높기 때문에 대부분의 사용자에게 단독 채굴은 권장되지 않습니다. 다른 사람들과 해시 파워를 결합하는 채굴 풀에 참여하는 것이 일관된 보상을 얻는 가장 좋은 방법입니다.

이 가이드는 개인 하드웨어(예: GPU가 장착된 가정용 PC 또는 보급형 ASIC)를 사용하여 Zcash을 채굴하는 데 중점을 둡니다. GPU로도 여전히 Zcash을 채굴할 수 있지만, 네트워크 난이도로 인해 2026년에는 ASIC이 훨씬 더 효율적이고 수익성이 높다는 점에 유의하세요. 전기 요금, 하드웨어 가격, ZEC 가치 같은 요인이 채산성에 영향을 미치므로 항상 WhatToMine.com과 같은 도구로 현재 수익성을 확인하세요. 채굴이 모든 사람에게 수익성이 있는 것은 아닙니다. 현지 규정과 에너지 요금을 조사하세요(목표: < $0.08/kWh).


## 요구 사항

### 하드웨어
- **GPU 채굴(초보자에게 권장하는 개인 구성):**
  - 최소 4GB VRAM을 갖춘 NVIDIA 또는 AMD GPU(예: NVIDIA GTX 1070, RTX 3060, AMD RX 580 이상).
  - 호환되는 마더보드, 충분한 PSU(여러 GPU 사용 시 최소 750W), 과열 방지를 위한 우수한 냉각 장치.
  - 더 나은 해시레이트를 위해 다중 GPU 리그가 일반적입니다(예: GPU 6개로 1~2 kSol/s 달성 가능).
- **ASIC 채굴(더 효율적이나 비용이 높음):**
  - Bitmain Antminer Z15(420 kSol/s) 또는 Innosilicon A9(50 kSol/s) 같은 Equihash 호환 ASIC.
  - 이러한 장비는 더 시끄럽고 뜨거우며 전력을 더 많이 소비합니다(예: 1500W 이상). 전용 공간에 적합합니다. Bitmain.com 또는 리셀러(Blockware Mining) 같은 신뢰할 수 있는 출처에서 구매하세요.
- **일반:** 안정적인 인터넷과 설정/모니터링용 컴퓨터. ASIC이 네트워크를 지배합니다(2026년 총 해시레이트 약 13 GSol/s). 따라서 GPU 채굴은 경쟁력이 떨어지지만 취미 사용자에게는 여전히 가능합니다.

### 소프트웨어
- **운영 체제:** Windows 10/11, Linux(안정성을 위해 Ubuntu 권장).
- **채굴 소프트웨어:**
  - GPU용: lolMiner(AMD/NVIDIA 지원), GMiner 또는 miniZ(NVIDIA 중심). 공식 GitHub 리포지터리(예: github.com/Lolliedieb/lolMiner-releases)에서 다운로드하세요.
  - ASIC용: 제조사의 내장 펌웨어/대시보드를 사용하세요(예: Bitmain의 웹 인터페이스).
- **지갑:** 지급금을 받을 Zcash 지갑. 권장:
  - 차폐형(비공개): ZODL Wallet, Zingo(모바일/데스크톱), Zkool(모바일/데스크톱).
  - 투명형(더 쉽지만 프라이버시가 낮음): Edge Wallet, Zecwallet Lite.
  - [wallets](https://zechub.wiki/wallets)에서 다운로드하세요. 풀이 지원한다면 프라이버시를 위해 차폐형 주소('zs'로 시작)를 생성하세요.

### 기타
- 전기: 비용을 계산하세요. GPU는 카드당 150~300W를 사용하고 ASIC은 1000W 이상을 사용합니다.
- 백신: 채굴기를 위협으로 표시할 수 있으므로 설정 중에는 비활성화하세요.

## 채굴 풀 참여 단계별 가이드

### 1단계: Zcash 지갑 설정
1. 공식 Zcash 웹사이트 [wallets](https://zechub.wiki/wallets)에서 지갑을 다운로드하고 설치하세요.
2. 새 지갑을 만들고 시드 문구를 안전하게 백업하세요.
3. 수신 주소를 생성하세요(프라이버시를 위해 가급적 차폐형). 예: `zs1exampleaddress...`. 기록해 두세요.
4. 투명 주소('t'로 시작)를 사용하면 더 간단하지만 프라이버시 보호 수준은 낮습니다.

### 2단계: 하드웨어 준비
- GPU의 경우:
  1. PC에 GPU를 설치하고 드라이버를 업데이트하세요(NVIDIA: GeForce Experience, AMD: Radeon Software).
  2. 숙련된 경우 오버클럭하세요(안정성을 위해 MSI Afterburner 사용, 효율을 위해 코어 클록 +100~200, 메모리 -500 목표).
- ASIC의 경우:
  1. ASIC을 전원과 이더넷에 연결하세요.
  2. Advanced IP Scanner 또는 제조사 앱 같은 도구를 사용하여 IP 주소를 찾으세요.
  3. 웹 대시보드에 접속하세요(예: 브라우저에 IP 입력, Bitmain의 기본 로그인: root/root).

**경고:** 적절한 환기를 확보하세요. 채굴은 열을 발생시킵니다. 테스트를 위해 소규모로 시작하세요.

### 3단계: 채굴 풀 선택 및 참여
채굴 풀은 작업을 분배하고 기여한 해시레이트에 따라 보상을 공유합니다. 수수료(0~2%), 최소 지급액(0.01~0.1 ZEC), 위치(낮은 핑), 신뢰성을 기준으로 선택하세요.

**권장 풀(해시레이트, 수수료 및 리뷰 기준):**
- **2Miners (zec.2miners.com)**: 수수료 1%, PPLNS 지급, GPU/ASIC/NiceHash 지원. 높은 해시레이트(약 1.17 GSol/s), 안정적인 서버.
- **F2Pool (zec.f2pool.com)**: 수수료 2%, PPS+ 지급, 멀티 코인 지원. 대형 풀(약 2.57 GSol/s).
- **ViaBTC (zec.viabtc.com)**: 수수료 2%(PPS+), 사용자 친화적인 대시보드, 글로벌 서버.
- **AntPool (zec.antpool.com)**: 수수료 1%, Bitmain 제공, ASIC에 적합(약 494 MSol/s).
- **Foundry Zcash Pool (foundrydigital.com/foundry-zcash-pool/)**: Foundry Digital이 제공하는 전문 Zcash 채굴 풀입니다. PPLNS 지급을 사용하며 투명한 보상 추적 및 엔터프라이즈급 지원을 제공합니다. 기관 및 대규모 ASIC 채굴자에게 가장 적합하며 계정 인증이 필요합니다.
- **Sovright (mining.sovright.com)**: Stratum V2 기반의 Zcash 풀로, 현재 공개 테스트넷에서 운영 중입니다. 아직 실제 ZEC 지급은 없으므로 수익원이 아니라 설정을 테스트하는 방법으로 취급하세요. 자세한 내용은 아래의 전용 섹션을 참조하세요.
- 기타: Kryptex Pool, Luxor(실시간 통계는 poolwatch.io/coin/zcash에서 확인).

1. 풀 웹사이트를 방문하여 계정을 만드세요(2Miners처럼 일부는 등록이 필요하지 않음).
2. 지급을 위해 설정에 Zcash 지갑 주소를 추가하세요.
3. 풀의 stratum 서버(예: zec.2miners.com:1010)와 포트를 기록하세요.

### 4단계: 채굴 소프트웨어 설치 및 구성
- GPU용(예: Windows/Linux에서 lolMiner):
  1. GitHub에서 lolMiner를 다운로드하세요(최신 버전, 예: 1.88).
  2. 폴더에 압축을 푸세요.
  3. 다음 구성으로 배치 파일(start.bat)을 만드세요:
     ```
     lolMiner.exe --coin ZEC --pool zec.2miners.com:1010 --user YOUR_WALLET_ADDRESS.WORKER_NAME --pass x
     ```
     - `YOUR_WALLET_ADDRESS`을 본인의 ZEC 주소로 바꾸세요.
     - `WORKER_NAME`: 리그 이름(예: Rig1).
     - EU 서버의 경우: eu.zec.2miners.com:1010.
  4. 배치 파일을 실행하세요. 풀에 연결되어 채굴을 시작합니다.
- ASIC용(예: Bitmain Antminer):
  1. 웹 대시보드에 로그인하세요.
  2. Miner Configuration으로 이동하세요.
  3. 풀 정보를 추가하세요:
     - URL: stratum+tcp://zec.2miners.com:1010
     - 사용자 이름: YOUR_WALLET_ADDRESS.WORKER_NAME
     - 비밀번호: x(또는 비워 둠).
  4. 저장하고 채굴기를 재부팅하세요.
- 기타 소프트웨어(예: GMiner):
  ```
  miner.exe --algo 125_4 --server zec.2miners.com:1010 --user YOUR_WALLET_ADDRESS.WORKER_NAME --pass x
  ```

**테스트:** 10~15분 동안 실행한 뒤, 콘솔에서 승인된 셰어와 해시레이트를 확인하세요.

### 5단계: 채굴 시작 및 모니터링
1. 채굴기를 실행하세요. 풀에 연결되어 셰어 제출을 시작합니다.
2. 다음을 통해 모니터링하세요:
   - 풀 대시보드: 지갑 주소를 입력하여 해시레이트, 미지급 잔액 및 통계를 확인하세요.
   - 소프트웨어 콘솔: 오류와 온도를 확인하세요(80도 C 미만 유지).
   - 도구: 원격 리그 관리를 위해 HiveOS 또는 SimpleMining OS를 사용하세요.
3. 지급: 대부분의 풀은 최소 금액(예: 0.05 ZEC)에 도달하면 자동으로 지급합니다. 풀 규정을 확인하세요.

   
![Zcash Mining Monitoring Setup](/content-images/zcashMining-5ca0019c17.webp)


## Sovright: 테스트넷 풀 및 릴레이 네트워크

Sovright(sovright.com)는 Stratum V2 채굴 풀과 별도의 블록 릴레이 네트워크를 운영합니다. 이들은 서로 다른 역할을 하므로 아래에서 별도로 다룹니다.

### 채굴 풀(mining.sovright.com)

Sovright의 풀은 메인넷이 아닌 공개 Zcash 테스트넷(NU6, Stratum V2)에서 운영됩니다. 테스트넷은 실제 ZEC을 지급하지 않습니다. 수익을 얻기 위한 것이 아니라 채굴기 구성을 테스트하는 데 사용하세요.

- 시작하는 데 계정은 필요하지 않습니다. CPU 또는 ASIC Equihash 채굴기를 풀로 지정하면 라이브 대시보드에 셰어가 표시됩니다.
- Sovright는 풀 작업을 그대로 받는 대신 자신만의 블록 템플릿을 선택하려는 채굴자를 위해 오픈 소스 Stratum V2 프록시도 제공합니다:

### Foundry Zcash Pool 모니터링

Foundry Zcash Pool 사용자의 경우:

- Foundry 풀 대시보드를 통해 채굴기 성능을 모니터링하세요.
- 다음을 확인하세요:
  - 활성 워커
  - 보고된 해시레이트
  - 승인된 셰어
  - 예상 보상
  - 지급 상태

Foundry는 PPLNS 보상 모델을 사용하므로, 채굴 보상은 즉각적인 해시레이트만이 아니라 풀의 보상 기간 동안 기여한 셰어에 따라 달라집니다.

권장 모니터링 방식:
- ASIC 대시보드 해시레이트를 Foundry 보고 해시레이트와 비교하세요.
- 거부된 셰어, 스테일 셰어 또는 연결 불안정을 조사하세요.
- 가동 중단은 제출 셰어와 잠재적 보상을 줄이므로 안정적인 네트워크 연결을 유지하세요.
  ```
  git clone https://github.com/sovright/mining-infra
  cd mining-infra
  cargo build --release -p sovright-v1-stratum-proxy
  ./target/release/sovright-v1-stratum-proxy --listen 0.0.0.0:3334 --upstream 34.28.134.13:3333
  ```
  풀에 직접 연결하는 대신 채굴기를 프록시로 지정하세요:
  ```
  stratum+tcp://<your-proxy-ip>:3334
  ```
  `yourname.rig1` 같은 워커 이름을 사용합니다.
- Sovright의 투명성 페이지는 차폐 거래를 제외하는 일부 풀과 달리 차폐 거래에 대한 “모두 포함” 정책을 명시합니다. 각 블록에는 서명된 증명이 부여되어 정책을 독립적으로 검증할 수 있습니다.
- 샘플 대시보드 데이터 대신 자신의 워커를 추적하려면 mining.sovright.com에서 계정을 만드세요(Google 또는 이메일 로그인).

### 릴레이 네트워크(relay.sovright.com)

Sovright는 Zcash 메인넷에서 공개 블록 릴레이 네트워크를 별도로 운영합니다. 풀이 블록을 찾았을 때 그 블록이 네트워크의 나머지 부분에 도달하는 속도는 고아 블록이 되는 빈도를 결정합니다. 즉, 전파 경쟁에서 패배하여 해당 블록의 보상을 잃는 것입니다. 이 릴레이는 순방향 오류 정정을 갖춘 컴팩트 블록 릴레이를 사용해 네 개 지역에 걸쳐 블록을 전달합니다.

공개 대시보드는 그 효과를 실시간으로 보여 줍니다. 릴레이에 연결된 지역은 일반적인 피어 투 피어 가십에 걸리는 시간의 절반보다 훨씬 짧은 시간에 새 블록을 확인하며, 대시보드는 네트워크의 실시간 고아 블록 비율을 추적합니다.

이것은 개인 채굴자가 아닌 풀 운영자를 위한 인프라입니다. Sovright의 오픈 소스 `mining-infra` 리포지터리에는 발견된 블록을 기본 P2P보다 빠르게 메시로 전파하기 위한 `submitblock` 릴레이 게이트웨리가 문서화되어 있습니다. 연결하려면 릴레이 피어 주소와 인증 키를 위해 Sovright(support@sovright.com)에 직접 문의하세요.


## 자체 Zebra 노드에 대한 채굴

위의 모든 방법은 채굴기를 다른 사람의 풀에 연결합니다. 다른 방법은 직접 노드를 실행하고 채굴 소프트웨어가 그 노드에 작업을 요청하도록 하는 것입니다. zcashd가 2026년 7월 18일 중단되었으므로, 이는 [Zebra](/zcash-tech/zebra-full-node)을 의미하며, 이 섹션에서는 그 노드를 다룹니다.

Zebra의 역할은 작고 구체적입니다. 블록 템플릿을 만들고 RPC 인터페이스를 통해 해결된 블록을 받습니다. 해싱은 채굴 소프트웨어가 수행하며, 여러 채굴자 사이에서 보상을 공유하는 일은 풀 소프트웨어의 역할입니다. 단독 채굴로 실제 블록을 찾을 수 있는지는 네트워크 해시레이트에서 차지하는 비중에 달려 있으며, 이 섹션에서는 이를 추정하지 않습니다. 따라서 이 페이지의 소개에서는 대부분의 사용자에게 단독 채굴을 권장하지 않습니다.

단계는 2026년 10월 8일 기준의 Zebra Book 페이지 두 개, [Zcash으로 Zebra](https://zebra.zfnd.org/user/mining.html) 채굴하기 및 [Zebra에서 Docker으로 채굴하기](https://zebra.zfnd.org/user/mining-docker.html)를 따릅니다. 키 이름과 기본값은 릴리스 간에 변경되므로, 사용하기 전에 Book을 확인하세요.

### 보상을 받는 주소 설정

기본 설정으로 구성 파일을 만든 다음 편집하세요:

```bash
mkdir -p ~/.config
zebrad generate -o ~/.config/zebrad.toml
```

채굴자 주소가 필요합니다([Book: 채굴자 주소](https://zebra.zfnd.org/user/mining.html#miner-address)):

```toml
[mining]
miner_address = "YOUR_ADDRESS"
```

Zebra은 투명 P2PKH 또는 P2SH 주소, Sapling 주소 또는 Unified Address을 허용합니다. 수신자가 둘 이상인 Unified Address의 경우, Book은 Zebra이 단일 수신자에게 지급하며 “Orchard, 그다음 Sapling, 그다음 투명” 순으로 선호한다고 말합니다.

두 개의 선택적 키는 동일한 `[mining]` 섹션에 들어갑니다:

| 키 | 기능 | 제한 |
|---|---|---|
| `extra_coinbase_data` | Zebra의 자체 마커 뒤에, 채굴하는 모든 블록의 코인베이스 입력에 풀 이름 같은 공개 태그를 추가합니다([Book](https://zebra.zfnd.org/user/mining.html#extra-coinbase-data)) | 86바이트. 이를 초과하면 “Zebra이 시작을 거부합니다” |
| `miner_memo` | 보상 출력에 차폐 메모를 첨부합니다. `extra_coinbase_data`과 달리 공개되지 않습니다. 수신 주소의 뷰잉 키를 가진 사람만 읽을 수 있습니다([Book](https://zebra.zfnd.org/user/mining.html#miner-memo)) | 512바이트. 보상이 차폐 수신자에게 전달될 때만 작동합니다. 투명 주소에서는 “아무런 효과 없이 조용히 무시됩니다” |

### RPC 포트 열기

채굴 소프트웨어는 JSON-RPC를 통해 Zebra과 통신하며, 수신할 주소를 지정하기 전까지는 비활성 상태입니다([Book: RPC 섹션](https://zebra.zfnd.org/user/mining.html#rpc-section)):

```toml
[rpc]
listen_addr = "127.0.0.1:8232"
```

8232는 Mainnet의 표준 RPC 포트입니다. `127.0.0.1`은 포트가 동일한 머신에서만 접근 가능하도록 유지합니다.

Zebra 2.0.0부터 쿠키가 RPC 포트를 보호하며, 이는 zcashd이 사용한 방식과 유사합니다. Zebra은 RPC 엔드포인트가 시작될 때 쿠키를 쓰고 종료 시 삭제합니다. 기본적으로 파일은 Zebra의 캐시 디렉터리에 있으며, 예를 들어 Linux에서는 `/home/user/.cache/zebra/.cookie`이고 한 줄로 다음 내용을 담습니다:

```text
__cookie__:PASSWORD
```

`rpc.cookie_dir`은 파일을 옮깁니다. `rpc.enable_cookie_auth = false`은 검사를 끄며, 이와 함께 RPC 포트가 가진 유일한 인증도 사라집니다. 그러면 포트에 도달할 수 있는 모든 것이 이를 호출할 수 있습니다.

### Zebra 시작 및 동기화 대기

```bash
zebrad
```

Zebra은 기본 위치에서 구성을 읽습니다. 다른 파일을 사용하려면 `-c /path/to/zebrad.toml`을 전달하세요. 동기화가 완료될 때까지 기다리세요. 완료되면 로그에 `sync_percent=100.000%`이 표시됩니다([Book: zebra 실행하기](https://zebra.zfnd.org/user/mining.html#running-zebra)). 하드웨어와 디스크 공간은 [Zebra Full Node](/zcash-tech/zebra-full-node)에서 다룹니다.

### getblocktemplate으로 확인

`getblocktemplate`은 채굴 소프트웨어가 작업을 얻기 위해 호출하는 것이므로 가장 빠른 테스트이기도 합니다([Book: 설정 테스트](https://zebra.zfnd.org/user/mining.html#testing-the-setup)). 쿠키 파일의 내용을 `__cookie__:PASSWORD` 위치에 넣으세요:

```bash
curl --silent --data-binary '{"jsonrpc": "1.0", "id":"curltest", "method": "getblocktemplate", "params": [] }' -H 'Content-type: application/json' http://__cookie__:PASSWORD@127.0.0.1:8232/ | jq
```

정상 작동하는 설정은 채굴기에 필요한 필드, 그중 `previousblockhash`, `coinbasetxn`, `target` 및 `height`을 포함하는 `result` 객체를 반환합니다. `extra_coinbase_data`을 설정했다면 Book은 `coinbasetxn.data`에서 태그를 찾는 방법을 설명합니다.

### 채굴 소프트웨어를 이에 연결하기

채굴 또는 풀 소프트웨어에 RPC 엔드포인트 `127.0.0.1:8232`와 쿠키의 사용자 이름 및 비밀번호를 지정하세요. Book에 따르면 Zebra은 “대부분의 채굴 풀 소프트웨어를 실행하는 데 필요한 RPC 메서드를 지원합니다”([Book: 채굴 풀 실행하기](https://zebra.zfnd.org/user/mining.html#run-a-mining-pool)).

소프트웨어를 선택하기 전에 Book의 두 가지 참고 사항:

- **s-nomp는 테스트 전용입니다.** Book은 s-nomp 설정을 “실험적”이라고 부르며 s-nomp가 “NU5과 호환되지 않아 일부 채굴 기능이 비활성화됩니다”라고 말합니다. [Testnet 가이드](https://zebra.zfnd.org/user/mining-testnet-s-nomp.html)는 s-nomp가 “NU5 또는 이후 네트워크 업그레이드를 위해 공식적으로 업데이트되지 않았다”고 덧붙이며, 프로덕션 채굴자에게 현재 업그레이드를 지원하는 풀 소프트웨어를 권장합니다.
- **Zebra은 즉시 사용할 수 있는 스택을 제공합니다.** Zebra 리포지터리에는 [`docker/mining/`](https://github.com/ZcashFoundation/zebra/tree/main/docker/mining)의 Docker Compose 설정이 있으며, Zebra을 채굴 풀과 함께 시작하고 원한다면 CPU 채굴기도 시작합니다. 여기의 풀은 s-nomp이며 변경하지 않으면 Testnet에서 시작하므로, 구성 요소를 배우는 방법으로 취급하세요.

### Docker 경로

Book의 가장 짧은 방법은 주소와 RPC 포트를 환경 변수로 전달하는 `zfnd/zebra` Docker 이미지입니다([Book: ZebraDocker에서 ](https://zebra.zfnd.org/user/mining-docker.html)으로 채굴하기). 아래 명령은 한 가지 변경을 제외하면 Book의 명령과 같습니다. RPC 포트를 호스트의 루프백 주소에만 공개하므로 다른 머신은 이에 접근할 수 없습니다.

```bash
docker run -d --name zebra_local \
  -e ZEBRA_MINING__MINER_ADDRESS="YOUR_ADDRESS" \
  -e ZEBRA_RPC__LISTEN_ADDR=0.0.0.0:8232 \
  -p 8233:8233 \
  -p 127.0.0.1:8232:8232 \
  -v zebrad-cache:/home/zebra/.cache/zebra \
  zfnd/zebra:latest
```

이 명령은 Mainnet 노드를 시작하고, Docker 호스트에서 P2P 포트(8233)를 공개하며, RPC 포트(8232)는 호스트 자체에서만 접근 가능하게 합니다. 다음으로 쿠키를 출력하세요:

```bash
docker exec -it zebra_local cat /home/zebra/.cache/zebra/.cookie
```

- **`ZEBRA_RPC__LISTEN_ADDR`에서 `0.0.0.0`을 유지하세요.** 이것은 Zebra이 컨테이너 내부에서 수신하는 주소입니다. Docker은 공개된 포트를 컨테이너 자체의 네트워크 인터페이스로 전달하므로, 컨테이너 내부에서 `127.0.0.1`을 수신하는 Zebra은 호스트에서조차 연결을 받지 못합니다. `-p` 앞의 `127.0.0.1:`이 포트를 네트워크에서 차단합니다.
- **Book의 명령은** `-p 8232:8232`으로 RPC 포트를 공개하며, 이는 호스트의 모든 네트워크 인터페이스에서 포트를 엽니다.
- **Testnet에서 연습하려면** `-e ZEBRA_NETWORK__NETWORK="Testnet"`을 추가하고, `ZEBRA_RPC__LISTEN_ADDR=0.0.0.0:18232`을 설정하고, `-p 18233:18233` 및 `-p 127.0.0.1:18232:18232`을 공개하고, Testnet 주소를 지정하세요. Mainnet 주소는 Zebra이 Testnet에서 시작하지 못하게 하며, 그 반대도 마찬가지입니다.

채굴자에게 지급하고 지갑을 처리하는 일은 이 섹션의 범위를 벗어납니다. 지갑 측면은 [Zallet](/zcash-tech/zallet)을 참조하세요.

## 팁 및 모범 사례
- **수익성:** whattomine.com/coins/166-zec-equihash 같은 계산기를 사용하세요. 예: RTX 3060(약 300 Sol/s)은 $50/ZEC 기준으로 하루 약 0.001 ZEC을 벌며, 여기서 전기 요금 약 $0.50을 제외합니다.
- **프라이버시:** 가능하다면 차폐형 풀을 사용하고 주소 재사용을 피하세요.
- **보안:** 강력한 비밀번호를 사용하고 풀/지갑에서 2FA를 활성화하세요. 개인 키는 절대 공유하지 마세요.
- **문제 해결:** 셰어가 없다면 방화벽, 백신 또는 잘못된 구성을 확인하세요. forum.zcashcommunity.com 또는 Reddit r/zec 같은 포럼에 참여하세요.
- **대안:** 수익성이 없다면 클라우드 채굴이나 다른 코인의 스테이킹을 고려하세요.
- **환경 참고:** 채굴은 에너지를 소비합니다. 가능하다면 재생 에너지원을 사용하세요.
- **업데이트:** Zcash은 변화할 수 있습니다(예: 잠재적인 PoS 전환). 뉴스는 z.cash에서 확인하세요.
