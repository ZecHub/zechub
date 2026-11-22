<a href="https://github.com/zechub/zechub/edit/main/site/guides/Keystone_Zashi.md" target="_blank">
  <img src="https://img.shields.io/badge/Edit-blue" alt="페이지 편집"/>
</a>

# Keystone Zodl(이전 명칭: Zashi) 사용자 가이드

> 보호된 ZEC은 콜드 스토리지에 보관하세요. Keystone 하드웨어 지갑을 Zodl 앱(이전 명칭: Zashi, 2026년 2월 리브랜딩)과 페어링하고 QR 코드로 거래에 서명하세요.

## 핵심 요약

* Cypherpunk 펌웨어가 설치된 Keystone 3 Pro(또는 Keystone 3)는 Zodl의 에어갭 서명 장치로 작동하므로, 보호된 ZEC을 콜드 스토리지에 보관할 수 있습니다.
* 시작 전 준비물: 배터리 잔량 20% 초과, 펌웨어 업데이트용 USB 케이블(또는 FAT32 MicroSD 카드), 휴대전화에 설치된 Zodl 앱.
* 먼저 Keystone 웹사이트에서 장치를 확인하세요. 운송 중 장치가 변조되지 않았는지 검사합니다.
* Keystone에서 지갑을 만들고 24단어 시드 구문을 오프라인에 적어 두세요. 시드 구문은 Zodl에 입력되지 않습니다.
* 연결 방법: Keystone에서 "..." > 소프트웨어 지갑 연결 > Zodl를 탭한 다음, Zodl에서 하드웨어 지갑 연결을 탭하고 QR 코드를 스캔하세요.
* Zodl가 각 거래를 생성합니다. QR 코드를 서로 스캔해 거래를 승인하고 Keystone 화면에서 서명하세요.

## 핵심 설명

하드웨어 지갑은 인터넷에 연결되지 않는 별도의 장치에 지출 키를 보관합니다. Keystone는 에어갭 방식으로 작동합니다. Bluetooth나 USB가 아니라 QR 코드로만 휴대전화와 통신합니다.

이 구성에서 Zodl는 "보기" 역할을 합니다. Zcash 네트워크와 동기화하고, 보호된 잔액을 표시하며, 거래를 준비합니다. Keystone에는 시드 구문이 저장되고 거래 서명이 이루어집니다. 휴대전화가 해킹되면 잔액을 볼 수는 있지만, Keystone에서 승인하지 않으면 자금을 이동할 수 없습니다.

아래 단계에서는 장치 준비, 확인, 펌웨어 업데이트, 지갑 생성 및 Zodl 연결 방법을 설명합니다.

## 개요

Twitter 가이드:  => [Zodl(이전 명칭: Zashi) x Keystone 하드웨어 지갑 통합 Twitter 가이드](https://x.com/zashi_app/status/1869793574880973144)

이번 통합은 보호된 ZEC을 콜드 스토리지에 보관할 수 있게 해 Zcash의 사용성을 크게 발전시킵니다. Zcash 커뮤니티는 과거 다른 하드웨어 지갑 플랫폼과의 협력 과정에서 난관을 겪었지만, Keystone는 Electric Coin Company와 함께 한계를 넓히고 혁신을 추진할 의지가 있는 협력 파트너로 나섰습니다. Keystone 팀은 이 작업의 자체적인 부분을 추진하기 위해 ZCG 보조금을 받았습니다.

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

배터리 잔량: Keystone 장치의 배터리 잔량이 20%를 초과하는지 확인하세요.

USB 케이블 또는 SD 카드:

- 펌웨어 업데이트용 USB 케이블(포함).
- 업그레이드용 Micro SD 카드(1TB 미만, 별도 구매).

Keystone 공식 웹사이트에 접속해 장치를 확인하고 펌웨어를 업데이트하세요.

휴대전화에서 Zodl 앱을 설정하세요.

## [단계별 가이드(Keystone 장치)](https://keyst.one/get-started)

**언어 선택**

- **장치 확인(QR 사용):** 운송 중 발생할 수 있는 오염을 감지하고, 공급망 공격을 방지하며, 설치된 펌웨어의 안전성을 보장하려면 장치 확인이 중요합니다.
  - Keystone 웹사이트에서 장치 확인 페이지를 방문하세요.
  - 공식 웹사이트에서 QR 코드 스캔을 클릭하세요.
  - Keystone 카메라로 웹사이트에 표시된 QR 코드를 스캔하세요.
  - Keystone 화면에 확인 코드가 표시됩니다.
  - 확인 절차를 완료하려면 이 코드를 웹사이트에 입력하세요.

- **펌웨어 업데이트:**
  - MicroSD 카드로 업데이트
    - Keystone 지갑의 배터리가 20% 이상 충전되어 있는지 확인하세요.
    - SD 카드를 컴퓨터에 삽입하고 FAT32 형식으로 포맷하세요.
    - [Keystone 펌웨어 업데이트 페이지](https://keyst.one/firmware)에서 최신 Cypherpunk 펌웨어 버전을 다운로드하고 keystone3.bin 파일을 MicroSD 카드의 루트 디렉터리에 저장하세요.
    - 펌웨어가 저장된 SD 카드를 Keystone 지갑에 삽입하세요.
    - Keystone 지갑에서 "업그레이드" 옵션을 열고 화면 안내에 따라 업데이트를 시작하세요.
  - **USB 케이블로 업데이트**
    - 펌웨어 버전이 1.0.4보다 낮으면 USB 업데이트를 진행하기 전에 MicroSD 카드로 초기 업데이트를 해야 합니다.
    - Keystone 지갑의 배터리가 20% 이상 충전되어 있는지 확인하세요.
    - USB 연결을 탭한 다음 USB 케이블로 Keystone 지갑을 컴퓨터에 연결하세요. [승인]을 탭해 Keystone 지갑의 USB 접근을 허용하세요. 승인하지 않으면 충전만 허용될 수 있습니다.
    - 컴퓨터의 웹 브라우저를 열고 [Keystone 펌웨어 업데이트 페이지](https://keyst.one/firmware)로 이동하세요.
    - 업데이트 페이지에서 업데이트 설치 버튼을 클릭하고 안내에 따라 최신 펌웨어를 설치하세요.
- **지갑 만들기:**
    - 안전한 비밀번호: 지갑을 보호할 강력한 PIN 또는 비밀번호를 선택하세요.
    - 지갑 이름 지정(선택 사항): 쉽게 식별할 수 있도록 지갑에 이름을 지정하거나 이 단계를 건너뛰세요.
    - 처음으로 지갑을 설정하는 경우 새 지갑 만들기를 선택하세요.
    - 장치가 24단어 시드 구문을 생성합니다.
    - 시드 구문을 적어 안전한 곳에 보관하세요.
    - 화면에 표시된 순서대로 단어를 확인해 시드 구문을 검증하세요.
- **Zodl + Keystone 지갑 연결:**
    - Keystone 장치에서 메인 페이지의 …을 탭하세요.
    - 소프트웨어 지갑 연결을 탭하고 Zodl를 선택하세요. Zodl 연결용 QR 코드가 표시됩니다.
    - Zodl 앱에서 화면 왼쪽 상단의 Zodl 드롭다운 메뉴를 탭하세요.
    - 하드웨어 지갑 연결을 탭하세요.
    - 스캔 준비를 탭하세요.
    - Keystone 장치에 표시된 QR 코드를 스캔하세요.
    - Zodl 앱에서 표시된 계정을 탭해 Keystone 지갑 계정을 확인하세요.
    - 화면 하단의 연결을 탭하세요.


## 추가 도움말

<div className="my-8 w-full aspect-video max-w-3xl mx-auto rounded-2xl overflow-hidden shadow-lg bg-black">
  <iframe
    className="w-full h-full"
    src="https://www.youtube.com/embed/Jr6LqtD1W0s"
    title="Keystone 하드웨어 지갑을 Zodl에 연결하기"
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
