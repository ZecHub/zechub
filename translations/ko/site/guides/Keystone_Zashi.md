<a href="https://github.com/zechub/zechub/edit/main/site/guides/Keystone_Zashi.md" target="_blank">
  <img src="https://img.shields.io/badge/Edit-blue" alt="페이지 편집"/>
</a>

# Keystone Zodl (이전 이름: Zashi) 사용자 가이드

> 거래정보 보호 ZEC를 콜드 스토리지에 보관하세요. Keystone 하드웨어 지갑을 Zodl 앱(이전 이름: Zashi, 2026년 2월 브랜드 변경)과 페어링하고 QR 코드로 거래에 서명하세요.

## 요약

* Cypherpunk 펌웨어가 설치된 Keystone 3 Pro(또는 Keystone 3)는 Zodl용 에어 갭 서명 장치로 작동하므로 거래정보 보호 ZEC를 콜드 스토리지에 보관할 수 있습니다.
* 시작하기 전에 배터리가 20% 이상인지 확인하고, 펌웨어 업데이트용 USB 케이블(또는 FAT32 MicroSD 카드)과 휴대전화에 Zodl 앱을 준비하세요.
* 먼저 Keystone 웹사이트에서 기기를 인증하세요. 이를 통해 배송 중 기기가 변조되지 않았는지 확인할 수 있습니다.
* Keystone에서 지갑을 만들고 24단어 seed phrase를 오프라인에 기록하세요. 이 문구는 Zodl에 입력되지 않습니다.
* 연결하려면 Keystone에서 “...” > 소프트웨어 지갑 연결 > Zodl를 누른 다음, Zodl에서 하드웨어 지갑 연결을 누르고 QR 코드를 스캔하세요.
* Zodl에서 각 거래를 생성합니다. Keystone 화면에서 QR 코드를 서로 스캔해 거래를 승인하고 서명하세요.

## 핵심 설명

하드웨어 지갑은 spending key를 인터넷에 연결되지 않는 별도의 기기에 보관합니다. Keystone는 에어 갭 방식으로 작동하며, 블루투스나 USB가 아닌 QR 코드로만 휴대전화와 통신합니다.

이 구성에서 Zodl는 “보기” 역할을 합니다. Zcash 네트워크와 동기화하고, 거래정보 보호 잔액을 표시하며, 거래를 준비합니다. Keystone에는 seed phrase가 보관되고 거래 서명도 이루어집니다. 휴대전화가 침해되면 잔액이 노출될 수 있지만, Keystone에서 승인하지 않으면 자금을 이동할 수 없습니다.

아래 단계에서는 기기 준비, 인증, 펌웨어 업데이트, 지갑 생성 및 Zodl 연결 방법을 설명합니다.

## 개요

Twitter 가이드:  => [Zodl (이전 이름: Zashi) x Keystone 하드웨어 지갑 연동 Twitter 가이드](https://x.com/zashi_app/status/1869793574880973144) 

이번 연동으로 거래정보 보호 ZEC의 콜드 스토리지가 가능해져 Zcash의 사용성이 크게 발전했습니다. Zcash 커뮤니티는 과거 다른 하드웨어 지갑 플랫폼과 관련해 어려움을 겪었지만, Keystone는 새로운 영역을 개척하고 Electric Coin Company와 함께 혁신하려는 협력 파트너로 나섰습니다. Keystone 팀은 담당 작업을 추진하기 위해 ZCG 개발 지원금을 받았습니다.

## Keystone X Zodl 튜토리얼

<div className="my-8 w-full aspect-video max-w-3xl mx-auto rounded-2xl overflow-hidden shadow-lg bg-black">
  <iframe
    className="w-full h-full"
    src="https://www.youtube.com/embed/ktYf7josJKM"
    title="Keystone X Zodl 튜토리얼"
    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
    allowFullScreen
    loading="lazy"
  />
</div>
    

## 준비
[Keystone 3 Pro 또는 Keystone 3 주문 및 수령](https://keyst.one) 

배터리 잔량: keystone 기기의 배터리 잔량이 20%를 넘는지 확인하세요.

USB 케이블 또는 SD 카드:

- 펌웨어 업데이트용 USB 케이블(포함).
- 업그레이드용 Micro SD 카드(1 TB 미만, 별도 구매).

인증 및 펌웨어 업데이트를 위해 Keystone 공식 웹사이트에 접속할 수 있어야 합니다.

휴대전화에서 Zodl 앱을 설정하세요.

## [단계별 안내(Keystone 기기)](https://keyst.one/get-started) 


**언어 선택**

- **기기 인증(QR 사용):** 기기 인증은 운송 중 발생할 수 있는 변조를 감지하고, 공급망 공격을 방지하며, 설치된 펌웨어의 안전성을 확인하는 데 매우 중요합니다.
  - Keystone 웹사이트에서 기기 인증 페이지를 방문하세요.
  - 공식 웹사이트에서 QR 코드 스캔을 클릭하세요.
  - Keystone 카메라로 웹사이트에 표시된 QR 코드를 스캔하세요.
  - Keystone 화면에 인증 코드가 표시됩니다.
  - 웹사이트에 이 코드를 입력해 인증 절차를 완료하세요.

- **펌웨어 업데이트:**
  - MicroSD 카드로 업데이트
    - Keystone 지갑의 배터리 잔량이 20% 이상인지 확인하세요.
    - SD 카드를 컴퓨터에 삽입하고 FAT32 형식으로 포맷하세요.
    - [Keystone 펌웨어 업데이트 페이지](https://keyst.one/firmware)에서 최신 Cypherpunk 펌웨어 버전을 다운로드하고 keystone3.bin 파일을 MicroSD 카드의 루트 디렉터리에 저장하세요.
    - 펌웨어가 저장된 SD 카드를 Keystone 지갑에 넣으세요.
    - Keystone 지갑에서 “업그레이드” 옵션을 선택한 다음, 화면의 안내에 따라 업데이트를 시작하세요.
  - **USB 케이블로 업데이트**
    - 펌웨어 버전이 1.0.4보다 낮으면 USB 업데이트를 진행하기 전에 MicroSD 카드로 초기 업데이트를 해야 합니다.
    - Keystone 지갑의 배터리 잔량이 20% 이상인지 확인하세요.
    - USB 사용을 누르고 USB 케이블로 Keystone 지갑을 컴퓨터에 연결하세요. [승인]을 눌러 Keystone 지갑의 USB 접근을 허용하세요. 허용하지 않으면 충전만 가능할 수 있습니다.
    - 컴퓨터의 웹 브라우저를 열고 [Keystone 펌웨어 업데이트 페이지](https://keyst.one/firmware)로 이동하세요.
    - 업데이트 페이지에서 업데이트 설치 버튼을 클릭하고 안내에 따라 최신 펌웨어를 설치하세요.
- **지갑 만들기:**
    - 안전한 비밀번호: 지갑을 보호할 강력한 PIN 또는 비밀번호를 선택하세요.
    - 지갑 이름 지정(선택 사항): 지갑을 쉽게 식별할 수 있도록 이름을 지정하거나 이 단계를 건너뛰세요.
    - 처음 지갑을 설정하는 경우 새 지갑 만들기를 선택하세요.
    - 기기에서 24단어 seed phrase가 생성됩니다.
    - 이 seed phrase를 적어 안전하게 보관하세요.
    - 화면에 표시된 올바른 순서대로 단어를 입력해 seed phrase를 확인하세요.
- **Zodl + Keystone 지갑 연결:**
    - Keystone 기기에서 메인 페이지의 …를 누르세요.
    - 소프트웨어 지갑 연결을 누르고 Zodl를 선택하세요. Zodl에 연결하기 위한 QR 코드가 표시됩니다.
    - Zodl 앱에서 Zodl 드롭다운 메뉴(화면 왼쪽 상단)를 누르세요.
    - 하드웨어 지갑 연결을 누르세요.
    - 스캔 준비를 누르세요.
    - Keystone 기기에 표시된 QR 코드를 스캔하세요.
    - Zodl 앱에서 표시된 계정을 눌러 Keystone 지갑 계정을 확인하세요.
    - 화면 아래쪽의 연결을 누르세요.


## 추가 도움말

<div className="my-8 w-full aspect-video max-w-3xl mx-auto rounded-2xl overflow-hidden shadow-lg bg-black">
  <iframe
    className="w-full h-full"
    src="https://www.youtube.com/embed/Jr6LqtD1W0s"
    title="Keystone 하드웨어 지갑을 Zodl에 연결"
    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
    allowFullScreen
    loading="lazy"
  />
</div>
    

<div className="my-8 w-full aspect-video max-w-3xl mx-auto rounded-2xl overflow-hidden shadow-lg bg-black">
  <iframe
    className="w-full h-full"
    src="https://www.youtube.com/embed/t_OHb1KqrRg"
    title="Keystone로 출금 거래에 서명하기"
    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
    allowFullScreen
    loading="lazy"
  />
</div>
