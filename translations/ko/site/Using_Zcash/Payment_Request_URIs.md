<a href="https://github.com/zechub/zechub/edit/main/site/Using_Zcash/Payment_Request_URIs.md" target="_blank">
  <img src="https://img.shields.io/badge/Edit-blue" alt="Edit Page"/>
</a>

# Zcash 결제 요청 URI

## 동적 QR 코드 개요

URI는 Universal Resource Identifier의 약자입니다. 이들은 Zcash 지갑 내에서 거래 정보를 미리 채우는 역할을 하는 QR 코드입니다. 이러한 형식을 인식하는 지갑은 웹 페이지 상의 링크를 클릭하거나 QR 코드를 스캔하여 거래를 생성할 수 있습니다. 예를 들어, 온라인 카페를 운영하고 있다면 고객들은 Zcash 지갑으로 이 QR 코드를 스캔하여 가격과 주문 번호가 미리 채워진 상태로 결제를 할 수 있습니다.

## 결제 요청 사용 사례

- **온라인 쇼핑.** 결제 요청은 고객이 온라인 구매 중에 시작합니다.
- **호텔 및 숙소 예약.** 다양한 예약 플랫폼은 호텔 예약을 위해 결제 요청 URL을 활용합니다.
- **온라인 요금 납부.** 공용事业사들은 고객들이 요금을 쉽게 상쇄할 수 있도록 결제 요청 URL을 사용합니다.
- **이벤트 티켓 구매.** 국경을 넘는 이벤트 주최자들은 이러한 메커니즘을 통해 티켓 구매를 더 간편하게 만듭니다.
- **P2P 결제.** 개인은 메시지 앱을 통해 가족 및 친구에게 결제 요청을 쉽게 보낼 수 있으며, 메시지에 결제 링크가 포함되어 있습니다.

## 세부 정보

[ZIP 321](https://zips.z.cash/zip-0321)은 사용자 정의 결제 URI를 구성하는 방법을 정의합니다. 

Zcash로 결제 요청을 만드는 방법: 

<div className="my-8 w-full aspect-video max-w-3xl mx-auto rounded-2xl overflow-hidden shadow-lg bg-black">
  <iframe
    className="w-full h-full"
    src="https://www.youtube.com/embed/l5auYQIzYsQ"
    title="How to make Payment Requests with Zcash"
    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
    allowFullScreen
    loading="lazy"
  />
</div>

    
### 코드 예제

웹사이트에 Zcash 기부 위젯 추가 방법: 

<div className="my-8 w-full aspect-video max-w-3xl mx-auto rounded-2xl overflow-hidden shadow-lg bg-black">
  <iframe
    className="w-full h-full"
    src="https://www.youtube.com/embed/NbP4BcHC0uM"
    title="Adding a Zcash Donation Widget to your Website"
    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
    allowFullScreen
    loading="lazy"
  />
</div>
