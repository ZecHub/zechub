# 키스톤 Zashi 사용자 가이드

트위터 가이드:  => [Zashi x Keystone 하드웨어 지갑 통합 트위터 가이드](https://x.com/zashi_app/status/1869793574880973144) 

이 통합은 보호된 ZEC의 냉장 저장을 가능하게 함으로써 Zcash 사용성에 있어 중요한 진전을 의미합니다. 과거에는 다른 하드웨어 지갑 플랫폼에서 문제가 발생한 적이 있었지만, 키스톤은 전자 암호화 회사(Electric Coin Company)와 협력하여 경계를 넘어서고 혁신에 동참할 의향 있는 파트너로 부상했습니다. 키스톤 팀은 그들의 작업을 지원하기 위해 ZCG 보조금을 받았습니다.

## 키스톤 X Zashi 튜토리얼

<div className="my-8 w-full aspect-video max-w-3xl mx-auto rounded-2xl overflow-hidden shadow-lg bg-black">
  <iframe
    className="w-full h-full"
    src="https://www.youtube.com/embed/ktYf7josJKM"
    title="Keystone X Zashi Tutorial"
    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
    allowFullScreen
    loading="lazy"
  />
</div>
    

## 준비

[키스톤 3 프로 또는 키스톤 3 주문 및 수령](https://keyst.one) 

배터리 수준: 키스톤 장치의 배터리 수준이 20% 이상인지 확인하세요.

USB 케이블 또는 SD 카드:

- 펌웨어 업데이트용 USB 케이블(포함됨).
- 업그레이드용 마이크로 SD 카드(1TB 미만, 별도 구매).

키스톤 공식 웹사이트에 접속하여 검증 및 펌웨어 업데이트를 수행할 수 있도록 해야 합니다.

모바일 기기에서 Zashi 앱을 설정합니다.

## [단계별 가이드(키스톤 장치)](https://keyst.one/get-started) 

**언어 선택**
- 장치 검증(QR 코드를 통해): 운송 중 잠재적인 오염을 감지하고 공급망 공격을 방지하며 설치된 펌웨어의 안전성을 보장하는 데 중요한 단계입니다.
  - 키스톤 웹사이트의 장치 검증 페이지에 방문하세요.
  - 공식 웹사이트에서 QR 코드 스캔 버튼을 클릭합니다.
  - 키스톤 카메라로 웹사이트에 표시된 QR 코드를 스캔합니다.
  - 키스톤 화면에 검증 코드가 나타납니다.
  - 이 코드를 웹사이트에 입력하여 검증 과정을 완료합니다.

- **펌웨어 업데이트:**
  - 마이크로SD 카드를 통한 업데이트
    - 키스톤 지갑의 배터리가 최소 20% 이상 충전되어 있는지 확인하세요.
    - 컴퓨터에 SD 카드를 삽입하고 FAT32 형식으로 포맷합니다.
    - [키스톤 펌웨어 업데이트 페이지](https://keyst.one/firmware)에서 최신 Cypherpunk 펌웨어 버전을 다운로드하고 keystone3.bin 파일을 마이크로SD 카드의 루트에 저장합니다.
    - 펌웨어가 포함된 SD 카드를 키스톤 지갑에 삽입합니다.
    - 키스톤 지갑에서 "업그레이드" 옵션으로 이동한 후 화면에 표시된 지침을 따르며 업데이트 프로세스를 시작합니다.
  - **USB 케이블을 통한 업데이트**
    - 펌웨어 버전이 1.0.4 미만인 경우 USB 업데이트를 수행하기 전에 마이크로SD 카드를 사용하여 초기 업데이트가 필요합니다.
    - 키스톤 지갑의 배터리가 최소 20% 이상 충전되어 있는지 확인하세요.
    - USB를 통해 연결을 선택하고 USB 케이블로 키스톤 지갑을 컴퓨터에 연결합니다. [승인]을 탭하여 키스톤 지갑에 USB 접근 권한을 부여해야 합니다. 그렇지 않으면 충전만 가능할 수 있습니다.
    - 컴퓨터의 웹 브라우저를 열고 [키스톤 펌웨어 업데이트 페이지](https://keyst.one/firmware)로 이동합니다.
    - 업데이트 페이지에서 "업데이트 설치" 버튼을 클릭하고 제공된 지침에 따라 최신 펌웨어를 설치합니다.
- **지갑 생성:**
    - 보안 비밀번호: 지갑을 보호하기 위해 강력한 PIN 또는 비밀번호를 선택하세요.
    - 지갑 이름(선택 사항): 필요 시 지갑에 쉽게 식별할 수 있도록 이름을 부여하거나 이 단계를 건너뛸 수 있습니다.
    - 처음으로 지갑을 설정하는 경우 "새로운 지갑 생성"을 선택합니다.
    - 장치는 24개 단어의 시드 문구를 생성합니다.
    - 이 시드 문구를 메모하고 안전하게 보관하세요.
    - 화면에 표시된 순서대로 단어를 확인하여 시드 문구를 확인합니다.
- **Zashi + 키스톤 지갑 연결:**
    - 키스톤 장치에서: 메인 페이지에서 …을 탭합니다
    - "소프트웨어 지갑 연결"을 선택하고 Zashi를 선택합니다. Zashi와의 연결을 위한 QR 코드가 나타납니다.
    - Zashi 앱에서: 화면 왼쪽 상단에 있는 zashi 드롭다운을 탭합니다
    - "하드웨어 지갑 연결"을 탭합니다
    - "스캔 준비"를 탭합니다
    - 키스톤 장치에 표시된 QR 코드를 스캔합니다
    - Zashi 앱에서: 표시된 계정을 탭하여 키스톤 지갑 계정을 확인합니다
    - 화면 하단의 "연결"을 탭합니다


## 추가 도움

<div className="my-8 w-full aspect-video max-w-3xl mx-auto rounded-2xl overflow-hidden shadow-lg bg-black">
  <iframe
    className="w-full h-full"
    src="https://www.youtube.com/embed/Jr6LqtD1W0s"
    title="Connect Keystone Hardware Wallet to Zashi"
    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
    allowFullScreen
    loading="lazy"
  />
</div>
    

<div className="my-8 w-full aspect-video max-w-3xl mx-auto rounded-2xl overflow-hidden shadow-lg bg-black">
  <iframe
    className="w-full h-full"
    src="https://www.youtube.com/embed/t_OHb1KqrRg"
    title="Sign an Outgoing Transaction with Keystone"
    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
    allowFullScreen
    loading="lazy"
  />
</div>
