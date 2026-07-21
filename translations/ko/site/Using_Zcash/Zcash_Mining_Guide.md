# Zcash 채굴 가이드: 개인 장비로 마이닝 풀에 참여하기

## 소개

Zcash(ZEC)는 프라이버시 중심의 암호화폐로, Equihash 작업 증명 알고리즘을 사용하여 채굴합니다. Zcash를 채굴하는 것은 복잡한 수학 문제를 해결하고 거래를 검증하며 네트워크를 보호함으로써 ZEC 보상으로 교환되는 계산 능력을 사용하는 것입니다. 네트워크의 높은 난이도로 인해 대부분의 사용자에게는 개인적인 채굴(솔로 마이닝)이 권장되지 않습니다. 다른 사람들의 해시 전력과 결합하여 일관된 보상을 얻을 수 있는 가장 좋은 방법은 마이닝 풀에 참여하는 것입니다.

이 가이드는 개인 장비(예: GPU가 포함된 홈 PC 또는 초보자용 기본형 ASIC)를 사용하여 Zcash를 채굴하는 방법에 중점을 둡니다. 참고로, 2026년 현재 네트워크 난이도를 고려할 때, GPU는 여전히 Zcash를 채굴할 수 있지만 ASIC은 훨씬 더 효율적이고 이익을 주는 것으로 알려져 있습니다. WhatToMine.com과 같은 도구를 사용하여 현재의 수익성을 확인하세요. 전기 비용, 하드웨어 가격 및 ZEC 가치와 같은 요소들이 수익성에 영향을 미칩니다. 채굴이 모든 사람에게 이익이 되는 것은 아니며, 지역 규제와 에너지 비용(1kWh당 $0.08 미만 목표)을 조사하세요.

## 요구 사항

### 하드웨어
- **GPU 채굴 (초보자에게 추천):**
  - 최소 4GB VRAM이 있는 NVIDIA 또는 AMD GPU (예: NVIDIA GTX 1070, RTX 3060; AMD RX 580 이상).
  - 호환되는 메인보드, 충분한 전원 공급 장치(다중 GPU를 위한 최소 750W), 과열을 방지하기 위한 좋은 냉각 시스템.
  - 다중 GPU 설정은 해시율 향상에 유리합니다 (예: 6개의 GPU는 1-2 kSol/s 달성 가능).
- **ASIC 채굴 (더 효율적이지만 비용이 더 많이 들음):**
  - Equihash 호환 ASIC, 예를 들어 Bitmain Antminer Z15(420 kSol/s) 또는 Innosilicon A9(50 kSol/s).
  - 소음이 크고 더 뜨겁고 전력 소비가 많습니다 (예: 1500W 이상); 전용 공간에 적합합니다. Bitmain.com 또는 중개업체(Blockware Mining)와 같은 신뢰할 수 있는 출처에서 구매하세요.
- **일반 사항:** 안정적인 인터넷, 설정/모니터링을 위한 컴퓨터. ASIC은 네트워크를 지배하고 있습니다 (2026년 기준 총 해시율 약 13 GSol/s), GPU 채굴은 취미용으로 가능합니다.

### 소프트웨어
- **운영체제:** Windows 10/11, Linux (안정성을 위해 Ubuntu 추천).
- **채굴 소프트웨어:**
  - GPU를 위한: lolMiner(AMD/NVIDIA 지원), GMiner 또는 miniZ(NVIDIA 중심). 공식 GitHub 저장소에서 다운로드 (예: github.com/Lolliedieb/lolMiner-releases).
  - ASIC을 위한: 제조사의 내장 펌웨어/대시보드 사용 (예: Bitmain 웹 인터페이스).
- **지갑:** 지불 수령을 위해 Zcash 지갑이 필요합니다. 추천:
  - 암호화된(프라이버시 보장): Zashi Wallet, Zingo(Mobile/Desktop), YWallet(Mobile/Desktop).
  - 투명한(더 간단하지만 프라이버시가 적음): Edge Wallet, Zecwallet Lite.
  - [지갑](https://zechub.wiki/wallets)에서 다운로드. 마이닝 풀이 지원하는 경우 암호화된 주소(예: 'zs'로 시작)를 생성하세요.

### 기타
- 전력: 비용 계산. GPU는 카드당 150-300W, ASIC은 1000W 이상 소비합니다.
- 백신: 설정 중에는 백신을 비활성화하세요. 채굴 프로그램이 위협으로 간주될 수 있습니다.

## 마이닝 풀에 참여하는 단계별 가이드

### 단계 1: Zcash 지갑 설정
1. 공식 Zcash 웹사이트에서 [지갑](https://zechub.wiki/wallets)을 다운로드하여 설치합니다.
2. 새 지갑을 생성하고 시드 문구를 안전하게 백업합니다.
3. 수신 주소를 생성하세요 (프라이버시를 위해 암호화된 주소가 선호됩니다). 예: `zs1exampleaddress...`와 같이 기록합니다.
4. 투명한 주소(예: 't'로 시작)를 사용하는 경우, 더 간단하지만 프라이버시는 적습니다.

### 단계 2: 하드웨어 준비
- **GPU를 위한:**
  1. GPU를 PC에 설치하고 드라이버를 업데이트합니다 (NVIDIA: GeForce Experience; AMD: Radeon Software).
  2. 경험 많은 경우 오버클럭을 수행하세요 (MSI Afterburner 사용, 안정성을 위해 +100-200 코어 클록, 효율성 위해 -500 메모리).
- **ASIC를 위한:**
  1. ASIC을 전원 및 이더넷에 연결합니다.
  2. Advanced IP Scanner 또는 제조사의 앱으로 IP 주소를 확인합니다.
  3. 웹 대시보드에 접속하세요 (예: 브라우저에서 IP 입력, Bitmain의 경우 기본 로그인: root/root).

**경고:** 적절한 통풍을 보장하세요. 채굴은 열을 발생시키며, 처음에는 작은 규모로 테스트를 시작하세요.

### 단계 3: 마이닝 풀 선택 및 참여
마이닝 풀은 작업을 분배하고 해시율 기여에 따라 수익을 공유합니다. 수수료(0-2%), 지급 최소치(0.01-0.1 ZEC), 위치(낮은 핑), 신뢰성 등을 고려하여 선택하세요.

**추천 풀 (해시율, 수수료 및 리뷰 기준):**
- **2Miners(zec.2miners.com)**: 1% 수수료, PPLNS 지급 방식, GPU/ASIC/NiceHash 지원. 높은 해시율(~1.17 GSol/s), 신뢰성 있는 서버.
- **F2Pool(zec.f2pool.com)**: 2% 수수료, PPS+ 지급 방식, 다중 암호화폐 지원. 대규모 풀(~2.57 GSol/s).
- **ViaBTC(zec.viabtc.com)**: 2% 수수료(PPS+), 사용자 친화적인 대시보드, 글로벌 서버.
- **AntPool(zec.antpool.com)**: 1% 수수료, Bitmain에서 제공, ASIC에 적합(~494 MSol/s).
- 기타: Kryptex Pool, Luxor (실시간 통계를 위해 poolwatch.io/coin/zcash 참조).

1. 풀 웹사이트 방문 후 계정 생성(이메일 또는 2Miners와 같은 일부는 등록 없이 가능).
2. 지급을 위한 Zcash 지갑 주소를 설정에 추가합니다.
3. 풀의 스트라텀 서버 및 포트를 기록하세요 (예: zec.2miners.com:1010).

### 단계 4: 채굴 소프트웨어 설치 및 구성
- **GPU(예: Windows/Linux에서 lolMiner 사용):**
  1. GitHub에서 lolMiner 최신 버전(예: 1.88)을 다운로드합니다.
  2. 폴더에 압축 해제합니다.
  3. 구성 파일이 포함된 배치 파일(start.bat)을 생성하세요:
     ```
     lolMiner.exe --coin ZEC --pool zec.2miners.com:1010 --user YOUR_WALLET_ADDRESS.WORKER_NAME --pass x
     ```
     - `YOUR_WALLET_ADDRESS`를 ZEC 주소로 대체합니다.
     - `WORKER_NAME`: 장비 이름 (예: Rig1).
     - 유럽 서버 사용 시: eu.zec.2miners.com:1010.
  4. 배치 파일을 실행하여 풀에 연결하고 채굴을 시작합니다.
- **ASIC(예: Bitmain Antminer):**
  1. 웹 대시보드에 로그인합니다.
  2. 마이너 구성으로 이동합니다.
  3. 풀 정보를 추가하세요:
     - URL: stratum+tcp://zec.2miners.com:1010
     - 사용자 이름: YOUR_WALLET_ADDRESS.WORKER_NAME
     - 비밀번호: x (또는 빈칸).
  4. 저장하고 마이너를 재부팅합니다.
- **다른 소프트웨어(예: GMiner):**
  ```
  miner.exe --algo 125_4 --server zec.2miners.com:1010 --user YOUR_WALLET_ADDRESS.WORKER_NAME --pass x
  ```

**테스트:** 10-15분간 실행하고 콘솔에서 수락된 공유 및 해시율을 확인하세요.

### 단계 5: 채굴 시작 및 모니터링
1. 마이너를 실행하여 풀에 연결하고 공유를 제출합니다.
2. 모니터링 방법:
   - **풀 대시보드:** 지갑 주소를 입력하여 해시율, 미지급 잔액 및 통계 확인.
   - **소프트웨어 콘솔:** 오류, 온도(80도 이하 유지) 감시.
   - **도구:** HiveOS 또는 SimpleMining OS로 원격 장비 관리 가능.
3. 지급: 대부분의 풀은 최소 금액 달성 시 자동 지급 (예: 0.05 ZEC). 풀 규칙 확인.

![Zcash 채굴 모니터링 설정](https://raw.githubusercontent.com/ZecHub/zechub/aac601cf85076960d334f4c841867a646a5a2f29/assets/images/zcashMining.jpg)

## 팁 및 최선의 실천 방법
- **수익성:** whattomine.com/coins/166-zec-equihash와 같은 계산기 사용. 예: RTX 3060 (~300 Sol/s)는 ZEC $50당 하루 약 0.001 ZEC 수익, 전력 비용 ~$0.50 차감.
- **프라이버시:** 가능한 경우 암호화된 풀 사용; 주소 재사용 피하기.
- **보안:** 강한 비밀번호 사용; 풀/지갑에 2FA 활성화. 개인 키 공유 금지.
- **문제 해결:** 공유가 없으면 방화벽, 백신 또는 잘못된 구성 확인. forum.zcashcommunity.com 또는 Reddit r/zec 포럼 참조.
- **대안:** 수익성이 낮다면 클라우드 채굴이나 다른 암호화폐의 스테이킹 고려.
- **환경 관련 주의사항:** 채굴은 에너지를 소비합니다. 가능하다면 재생 가능한 에너지 사용.
- **업데이트:** Zcash는 변화할 수 있습니다 (예: PoS로 전환 가능성). z.cash에서 뉴스 확인.
