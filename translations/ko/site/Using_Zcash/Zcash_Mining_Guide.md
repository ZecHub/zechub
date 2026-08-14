# Zcash 채굴 가이드: 개인 하드웨어로 채굴 풀 참여하기

## 소개

Zcash (ZEC)는 채굴에 Equihash 작업증명 알고리즘을 사용하는 프라이버시 중심 암호화폐입니다. Zcash 채굴은 계산 능력을 사용해 복잡한 수학 문제를 해결하고, 거래를 검증하며, 그 대가로 ZEC 보상을 받으면서 네트워크를 보호하는 과정입니다. 네트워크 난이도가 높기 때문에 대부분의 사용자에게 솔로 채굴은 권장되지 않습니다. 채굴 풀에 참여하는 것은 자신의 해시 파워를 다른 사람들과 결합해 일관된 보상을 얻는 가장 좋은 방법입니다.

이 가이드는 개인 하드웨어(예: GPU가 장착된 가정용 PC 또는 입문급 ASIC)를 사용해 Zcash를 채굴하는 데 중점을 둡니다. GPU로도 여전히 Zcash를 채굴할 수 있지만, 네트워크 난이도 때문에 2026년에는 ASIC가 훨씬 더 효율적이고 수익성이 높다는 점을 유의하세요. 전기 요금, 하드웨어 가격, ZEC 가치 같은 요소가 수익성에 영향을 미치므로, 항상 WhatToMine.com 같은 도구로 현재 수익성을 확인하세요. 채굴이 모든 사람에게 수익성이 있는 것은 아닙니다. 현지 규정과 에너지 요금을 조사하세요(목표: < $0.08/kWh).


## 요구 사항

### 하드웨어
- **GPU 채굴 (초보자에게 권장되는 개인 구성):**
  - 최소 4GB VRAM을 갖춘 NVIDIA 또는 AMD GPU (예: NVIDIA GTX 1070, RTX 3060; AMD RX 580 이상).
  - 호환되는 메인보드, 충분한 PSU(여러 GPU의 경우 최소 750W), 과열 방지를 위한 적절한 냉각.
  - 더 나은 해시레이트를 위해 멀티 GPU 리그가 일반적입니다(예: GPU 6개로 1-2 kSol/s 달성 가능).
- **ASIC 채굴 (더 효율적이지만 비용이 더 높음):**
  - Bitmain Antminer Z15 (420 kSol/s) 또는 Innosilicon A9 (50 kSol/s) 같은 Equihash 호환 ASIC.
  - 이런 장비는 더 시끄럽고, 더 뜨거우며, 더 많은 전력을 소비합니다(예: 1500W+); 전용 공간에 적합합니다. Bitmain.com 또는 리셀러(Blockware Mining) 같은 신뢰할 수 있는 출처에서 구매하세요.
- **일반:** 안정적인 인터넷, 설정/모니터링용 컴퓨터. ASIC가 네트워크를 지배하고 있으며(2026년 총 해시레이트 약 13 GSol/s), GPU 채굴의 경쟁력은 낮아졌지만 취미 채굴자에게는 여전히 가능합니다.

### 소프트웨어
- **운영 체제:** Windows 10/11, Linux (안정성을 위해 Ubuntu 권장).
- **채굴 소프트웨어:**
  - GPU용: lolMiner (AMD/NVIDIA 지원), GMiner, 또는 miniZ (NVIDIA 중심). 공식 GitHub 저장소에서 다운로드하세요(예: github.com/Lolliedieb/lolMiner-releases).
  - ASIC용: 제조사의 내장 펌웨어/대시보드를 사용하세요(예: Bitmain의 웹 인터페이스).
- **지갑:** 보상을 받을 Zcash 지갑. 권장:
  - 실드형(비공개): Zashi Wallet, Zingo (모바일/데스크톱) YWallet (모바일/데스크톱).
  - 투명형(더 간단하지만 프라이버시는 낮음): Edge Wallet, Zecwallet Lite.
  - [wallets](https://zechub.wiki/wallets)에서 다운로드하세요. 풀이 지원한다면 프라이버시를 위해 실드형 주소('zs'로 시작)를 생성하세요.

### 기타
- 전기: 비용을 계산하세요. GPU는 카드당 150-300W를 사용하고, ASIC는 1000W+를 사용합니다.
- 백신 프로그램: 설정 중 채굴 프로그램을 위협으로 감지할 수 있으므로 비활성화하세요.

## 채굴 풀 참여 단계별 가이드

### 1단계: Zcash 지갑 설정
1. 공식 Zcash 웹사이트 [wallets](https://zechub.wiki/wallets)에서 지갑을 다운로드하고 설치하세요.
2. 새 지갑을 만들고 시드 문구를 안전하게 백업하세요.
3. 수신 주소를 생성하세요(프라이버시를 위해 가능하면 실드형 권장). 예: `zs1exampleaddress...`.
4. 투명 주소('t'로 시작)를 사용하면 더 간단하지만 프라이버시는 낮습니다.

### 2단계: 하드웨어 준비
- GPU의 경우:
  1. PC에 GPU를 설치하고 드라이버를 업데이트하세요(NVIDIA: GeForce Experience; AMD: Radeon Software).
  2. 경험이 있다면 오버클럭하세요(안정성을 위해 MSI Afterburner 사용, 효율성을 위해 코어 클럭 +100-200, 메모리 -500 목표).
- ASIC의 경우:
  1. ASIC를 전원과 이더넷에 연결하세요.
  2. Advanced IP Scanner 같은 도구나 제조사 앱을 사용해 IP 주소를 찾으세요.
  3. 웹 대시보드에 접속하세요(예: 브라우저에 IP 입력, 기본 로그인: Bitmain은 root/root).

**경고:** 적절한 환기를 सुनिश्चित하세요; 채굴은 열을 발생시킵니다. 테스트를 위해 소규모로 시작하세요.

### 3단계: 채굴 풀 선택 및 참여
채굴 풀은 작업을 분배하고 기여한 해시레이트에 따라 보상을 공유합니다. 수수료(0-2%), 최소 지급액(0.01-0.1 ZEC), 위치(낮은 핑), 신뢰성을 기준으로 선택하세요.

**권장 풀 (해시레이트, 수수료, 리뷰 기준):**
- **2Miners (zec.2miners.com)**: 수수료 1%, PPLNS 지급, GPU/ASIC/NiceHash 지원. 높은 해시레이트(~1.17 GSol/s), 신뢰할 수 있는 서버.
- **F2Pool (zec.f2pool.com)**: 수수료 2%, PPS+ 지급, 멀티 코인 지원. 대형 풀(~2.57 GSol/s).
- **ViaBTC (zec.viabtc.com)**: 수수료 2% (PPS+), 사용자 친화적 대시보드, 글로벌 서버.
- **AntPool (zec.antpool.com)**: 수수료 1%, Bitmain 제공, ASIC에 적합(~494 MSol/s).
- **Sovright (mining.sovright.com)**: Stratum V2 기반의 Zcash 풀로, 현재 공개 테스트넷에서 운영 중입니다. 아직 실제 ZEC 지급은 없으므로, 수익원이 아니라 설정을 시험하는 방법으로 보세요. 자세한 내용은 아래 전용 섹션을 참고하세요.
- 기타: Kryptex Pool, Luxor (실시간 통계는 poolwatch.io/coin/zcash 확인).

1. 풀 웹사이트를 방문해 계정을 만드세요(이메일 또는 2Miners처럼 일부는 가입 불필요).
2. 지급을 위해 설정에 Zcash 지갑 주소를 추가하세요.
3. 풀의 stratum 서버(예: zec.2miners.com:1010)와 포트를 기록해 두세요.

### 4단계: 채굴 소프트웨어 설치 및 설정
- GPU용 (예: Windows/Linux에서 lolMiner):
  1. GitHub에서 lolMiner를 다운로드하세요(최신 버전, 예: 1.88).
  2. 폴더에 압축을 푸세요.
  3. 설정이 포함된 배치 파일(start.bat)을 만드세요:
     ```
     lolMiner.exe --coin ZEC --pool zec.2miners.com:1010 --user YOUR_WALLET_ADDRESS.WORKER_NAME --pass x
     ```
     - `YOUR_WALLET_ADDRESS`를 자신의 ZEC 주소로 바꾸세요.
     - `WORKER_NAME`: 리그 이름(예: Rig1).
     - EU 서버의 경우: eu.zec.2miners.com:1010.
  4. 배치 파일을 실행하세요. 풀이 연결되고 채굴이 시작됩니다.
- ASIC용 (예: Bitmain Antminer):
  1. 웹 대시보드에 로그인하세요.
  2. Miner Configuration으로 이동하세요.
  3. 풀 정보를 추가하세요:
     - URL: stratum+tcp://zec.2miners.com:1010
     - Username: YOUR_WALLET_ADDRESS.WORKER_NAME
     - Password: x (또는 공란).
  4. 저장하고 채굴기를 재부팅하세요.
- 다른 소프트웨어의 경우(예: GMiner):
  ```
  miner.exe --algo 125_4 --server zec.2miners.com:1010 --user YOUR_WALLET_ADDRESS.WORKER_NAME --pass x
  ```

**테스트:** 10-15분 동안 실행하고, 콘솔에서 승인된 share와 해시레이트를 확인하세요.

### 5단계: 채굴 시작 및 모니터링
1. 채굴기를 실행하세요: 풀에 연결되어 share 제출을 시작합니다.
2. 다음으로 모니터링하세요:
   - 풀 대시보드: 지갑 주소를 입력해 해시레이트, 미지급 잔액, 통계를 확인하세요.
   - 소프트웨어 콘솔: 오류, 온도(80도 C 미만 유지)를 확인하세요.
   - 도구: 원격 리그 관리를 위해 HiveOS 또는 SimpleMining OS를 사용하세요.
3. 지급: 대부분의 풀은 최소치(예: 0.05 ZEC)에 도달하면 자동으로 지급합니다. 풀 규칙을 확인하세요.

   
![Zcash 채굴 모니터링 설정](/content-images/zcashMining-5ca0019c17.webp)


## Sovright: 테스트넷 풀과 릴레이 네트워크

Sovright (sovright.com)는 Stratum V2 채굴 풀과 별도의 블록 릴레이 네트워크를 운영합니다. 두 시스템은 서로 다른 역할을 하므로 아래에서 따로 설명합니다.

### 채굴 풀 (mining.sovright.com)

Sovright의 풀은 메인넷이 아니라 공개 Zcash 테스트넷(NU6, Stratum V2)에서 운영됩니다. 테스트넷에서는 실제 ZEC가 지급되지 않습니다. 수익을 얻기 위한 것이 아니라 채굴기 설정을 테스트하는 용도로 사용하세요.

- 시작하는 데 계정은 필요하지 않습니다. CPU 또는 ASIC Equihash 채굴기를 풀에 연결하면 share가 실시간 대시보드에 표시됩니다.
- Sovright는 단순히 풀의 작업만 받아오는 대신, 자신이 직접 블록 템플릿을 선택하고 싶은 채굴자를 위해 오픈 소스 Stratum V2 프록시도 공개하고 있습니다:
  ```
  git clone https://github.com/sovright/mining-infra
  cd mining-infra
  cargo build --release -p sovright-v1-stratum-proxy
  ./target/release/sovright-v1-stratum-proxy --listen 0.0.0.0:3334 --upstream 34.28.134.13:3333
  ```
  채굴기를 풀에 직접 연결하는 대신 프록시에 연결하세요:
  ```
  stratum+tcp://<your-proxy-ip>:3334
  ```
  그리고 `yourname.rig1` 같은 워커 이름을 사용하세요.
- Sovright의 투명성 페이지에는 일부 풀이 이를 걸러내는 것과 달리, 실드형 거래에 대해 "모두 포함" 정책을 명시하고 있습니다. 각 블록에는 서명된 증명이 붙어 있어 이 정책을 독립적으로 검증할 수 있습니다.
- 샘플 대시보드 데이터 대신 자신의 워커를 추적하려면 mining.sovright.com에서 계정을 만드세요(Google 또는 이메일 로그인).

### 릴레이 네트워크 (relay.sovright.com)

Sovright는 별도로 Zcash 메인넷에서 공개 블록 릴레이 네트워크를 운영합니다. 풀이 블록을 발견했을 때, 그 블록이 나머지 네트워크에 얼마나 빨리 도달하느냐에 따라 고아 블록이 될 가능성이 결정되며, 고아 블록이 되면 전파 경쟁에서 져 해당 보상을 잃게 됩니다. 이 릴레이는 전방 오류 정정을 갖춘 compact block relay를 사용해 네 개 지역에 걸쳐 블록을 전달합니다.

공개 대시보드에서는 그 효과를 실시간으로 보여줍니다. 릴레이에 연결된 지역은 일반적인 피어 투 피어 가십보다 절반도 안 되는 시간 안에 새 블록을 확인하며, 대시보드는 네트워크의 실시간 고아 블록 비율도 추적합니다.

이것은 개별 채굴자가 아니라 풀 운영자를 위한 인프라입니다. Sovright의 오픈 소스 `mining-infra` 저장소에는 기본 P2P보다 더 빠르게 발견된 블록을 메시에 퍼뜨리기 위한 `submitblock` 릴레이 게이트웨이가 문서화되어 있습니다. 연결하려면 릴레이 피어 주소와 인증 키를 받기 위해 Sovright에 직접 문의하세요(support@sovright.com).


## 팁과 모범 사례
- **수익성:** whattomine.com/coins/166-zec-equihash 같은 계산기를 사용하세요. 예: RTX 3060(~300 Sol/s)은 $50/ZEC 기준 하루 약 0.001 ZEC를 벌지만, 여기서 전기 요금 약 $0.50이 차감됩니다.
- **프라이버시:** 가능하면 실드형 풀을 사용하고, 주소 재사용을 피하세요.
- **보안:** 강력한 비밀번호를 사용하고 풀/지갑에서 2FA를 활성화하세요. 개인 키는 절대 공유하지 마세요.
- **문제 해결:** share가 없다면 방화벽, 백신 프로그램, 잘못된 설정을 확인하세요. forum.zcashcommunity.com 또는 Reddit r/zec 같은 포럼에 참여하세요.
- **대안:** 수익성이 없다면 클라우드 채굴이나 다른 코인의 스테이킹을 고려하세요.
- **환경 관련 참고:** 채굴은 에너지를 소비합니다. 가능하면 재생 가능 에너지원을 사용하세요.
- **업데이트:** Zcash는 발전할 수 있습니다(예: 잠재적인 PoS 전환). 최신 소식은 z.cash에서 확인하세요.
