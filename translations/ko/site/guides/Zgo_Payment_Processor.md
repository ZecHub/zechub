<a href="https://github.com/zechub/zechub/edit/main/site/guides/Zgo_Payment_Processor.md" target="_blank">
  <img src="https://img.shields.io/badge/Edit-blue" alt="Edit Page"/>
</a>

# ZGo 결제 처리기: 보관 없이 Zcash 수락하기

ZGo는 비보관식 Zcash 결제 처리기입니다. 고객은 자신의 지갑에서 ZEC를 보내고, ZGo는 Zcash 블록체인을 감시하여 거래를 확인하고, 자금은 보호된 전송을 통해 상인의 지갑으로 직접 도달합니다. ZGo는 중간에 돈을 보관하지 않습니다.

이 가이드에서는 결제 흐름이 어떻게 작동하는지, 계정을 설정하는 방법, Xero와 WooCommerce와 ZGo를 통합하는 방법을 설명합니다. 또한 대부분의 초보자 설정 문제를 유발하는 두 가지 실수도 다룹니다.

## 이 페이지에서

1. [ZGo 사용 이유](#why-use-zgo)
2. [ZGo 작동 방식](#how-zgo-works)
3. [계정 설정](#setting-up-an-account)
4. [Xero와 ZGo](#zgo-with-xero)
5. [WooCommerce와 ZGo](#zgo-with-woocommerce)
6. [기능](#features)
7. [일반적인 실수](#common-mistakes)
8. [결론](#conclusion)
9. [자료](#resources)

## ZGo 사용 이유

대부분의 암호화폐 결제 처리기는 보관식입니다. 자금은 먼저 처리기의 계정에 도달한 후 나중에 상인에게 전달되며, 이는 제3자가 일시적으로 돈을 통제하고 동결하거나 지연시키거나 보고할 수 있음을 의미합니다.

ZGo는 반대 접근법을 취합니다. 결제는 고객의 지갑에서 직접 상인의 지갑으로 Zcash 보호된 거래를 통해 이동합니다. 처리기는 단지 영수증을 생성하고 블록체인을 감시하여 확인만 합니다. 중간 잠금 상태, 출금 흐름, 또는 결제를 지연시키는 제3자가 없습니다.

상인에게 이는 세 가지 실용적인 의미를 제공합니다: 수신된 ZEC에 대한 완전한 보관, 기본적으로 보호된 거래의 프라이버시, 그리고 중앙 집중식 공급업체가 온라인 또는 유동성 유지 상태에 의존하지 않도록 함.

## ZGo 작동 방식

ZGo를 단독으로 사용하거나 Xero나 WooCommerce를 통해 사용하더라도 결제 흐름은 동일합니다:

1. 상인이 ZGo에서 결제 요청을 생성하고, 금액, 영수증 ID 및 Zcash 수신 주소가 포함된 QR 코드로 표시됩니다.
2. 고객이 Zcash 지갑(WordPress 플러그인에서는 Orchard, Sapling 및 Transparent 주소 유형 모두 지원)으로 QR 코드를 스캔하고 결제를 승인합니다.
3. 거래는 고객의 지갑에서 상인의 지갑으로 보호된 전송을 통해 Zcash 네트워크에 브로드캐스트됩니다.
4. ZGo는 Zcash 블록체인에서 해당 거래를 감시합니다.
5. 5개의 확인 후, ZGo는 결제를 최종적으로 표기하고 연결된 통합(Xero, WooCommerce 또는 웹훅)에 알립니다.

5개 확인 기준은 핵심 수치입니다. 이보다 앞서는 것은 결제 진행 중이며, 결제 완료가 아닙니다. 주문 충족, 재고 업데이트 및 상인 측의 모든 불가역적인 조치는 5단계까지 기다려야 합니다.

ZGo는 데스크탑 또는 모바일에서 현대 브라우저를 통해 실행되며 양쪽 모두에 설치가 필요 없습니다. 고객은 Zcash 지갑이 필요하고, 상인은 Zcash 지갑과 ZGo 계정이 필요합니다.

<img width="672" height="378" alt="ZGo 결제 요청 및 블록체인 모니터링 개요" src="https://github.com/user-attachments/assets/de50885b-b068-4157-bbda-0981ca23efc8" />

## 계정 설정

ZGo 계정을 생성하려면 Zcash 지갑에 작은 양의 ZEC가 필요합니다. 이 작은 ZEC 잔액은 계정 초기화 거래의 체인 상 수수료를 커버합니다. 주요한 Zcash 지갑 중 하나는 모두 사용 가능하며, 현재 옵션은 [ZecHub Wallets](https://zechub.wiki/wallets)에서 확인할 수 있습니다.

기본 설정:

1. 브라우저에서 [zgo.cash](https://zgo.cash/)를 열어주세요.
2. 상인이 제어하는 Zcash 지갑을 사용하여 계정을 생성합니다. 이 지갑은 키를 보유해야 합니다. 거래소 예금 주소는 작동하지 않습니다(자세한 내용은 [일반적인 실수](#common-mistakes) 참조).
3. 초기화 거래의 작은 금액을 보내어 지갑을 확인합니다.
4. 수신 주소를 설정합니다. 이 계정을 통해 처리된 모든 결제는 해당 지갑으로 도달합니다.

계정이 활성화되면, 동일한 상인은 ZGo를 단회 결제(팝업 행사에서 하나의 QR 코드) 또는 Xero 또는 WooCommerce를 통한 영구 설정에 연결할 수 있습니다.

## Xero와 ZGo

[Xero](https://www.xero.com/)는 많은 중소기업이 사용하는 클라우드 회계 플랫폼입니다. ZGo–Xero 통합은 상인이 Xero에서 인보이스를 발행하고 고객이 ZEC로 결제하며, 거래가 확인되면 Xero가 자동으로 인보이스를 지불 상태로 표기할 수 있도록 합니다.

작동 방식:

1. 상인은 일반적인 방법으로 Xero에서 인보이스를 생성합니다.
2. ZGo는 인보이스에 Zcash 결제 옵션을 첨부합니다.
3. 고객은 자신의 지갑을 통해 ZEC로 결제합니다.
4. ZGo는 [Zcash 블록체인](https://z.cash/)에서 거래를 감시합니다.
5. 5개의 확인 후, ZGo는 Xero에 결제를 보고하고 인보이스가 정산된 상태로 표기됩니다.

ZEC은 상인의 지갑으로 도달하며, ZGo 또는 Xero 제어 계정에는 도달하지 않습니다. Xero의 회계 기록은 체인 상 정산과 자동으로 동기화됩니다.

처음 설정 시, 전용 가이드를 따르세요: [Xero 통합 구성](https://hedgedoc.vergara.tech/s/4iXC67fmb).

## WooCommerce와 ZGo

[WooCommerce](https://woocommerce.com/) 및 [WordPress](https://wordpress.org/)에서 운영되는 온라인 상점에 대해, ZGo는 전용 플러그인이 제공됩니다. 이 플러그인은 결제 확인 시 주문 상태를 자동으로 처리하고, 결제 방법으로 Zcash를 추가합니다.

<img width="672" height="378" alt="ZGo WooCommerce 플러그인 결제 및 주문 흐름" src="https://github.com/user-attachments/assets/55a791bb-1947-4f55-b5b9-55083be8ed49" />

WooCommerce 상점 내부의 엔드투엔드 흐름:

1. 고객은 결제 단계에 도달하고 Zcash를 결제 방법으로 선택합니다.
2. 플러그인은 결제 요청을 생성하고, 결제 페이지에 QR 코드를 표시합니다.
3. 고객은 자신의 지갑에서 결제합니다.
4. 거래는 Zcash 네트워크로 브로드캐스트되고, ZGo가 이를 감시하기 시작합니다.
5. 5개의 확인 후, ZGo는 플러그인에 결제를 최종적으로 보고합니다.
6. 플러그인은 WooCommerce 주문을 지불 상태로 표기하고 주문 데이터베이스를 업데이트합니다.

주문은 단계 6이 완료될 때만 지불됩니다. 이전 상태(브로드캐스트, 첫 번째 확인)는 고객에게 "결제 수령, 확인 대기"로 표시할 수 있지만, 재고, 충족 및 모든 하류 자동화는 최종 상태를 기다려야 합니다.

플러그인은 또한 WordPress 내부에 관리 대시보드를 설치하여 상인이 일반적인 WooCommerce 주문 뷰와 함께 주문과 수신된 ZEC 결제를 모니터링할 수 있도록 지원합니다. 플러그인은 현재 모든 Zcash 주소 유형(Orchard, Sapling 및 Transparent)을 지원하며, 고객이 호환되는 지갑에서 결제를 완료할 수 있습니다.

## 기능

**비보관식.** 결제는 보호된 거래를 통해 고객의 지갑에서 직접 상인의 지갑으로 이동합니다. ZGo는 중간에 자금을 보관하지 않으며, 상인은 전 과정에서 완전한 제어권을 유지합니다.

**유연한 배포.** ZGo는 팝업 시장에서 단일 오후 사용, 영구 판매점 설정 또는 Xero 및 WooCommerce 통합을 통해 온라인 스토어의 백엔드로 사용될 수 있습니다.

**브라우저 기반.** 고객이나 상인 측에 설치가 필요 없습니다. ZGo는 데스크탑 또는 모바일에서 현대 브라우저를 통해 실행됩니다.

**지갑 호환성.** Orchard, Sapling 및 Transparent 주소 유형을 지원하는 주요 Zcash 지갑은 고객의 추가 설정 없이 ZGo 영수증을 결제할 수 있습니다.

**통합.** Xero(회계)와 WooCommerce(전자상거래)에 대한 직접 통합으로 가장 일반적인 상인 워크플로우를 즉시 지원합니다.

## 일반적인 실수

**5개 확인 전에 주문을 지불 상태로 간주하는 것.** 브로드캐스트된 거래는 확정된 결제와 같지 않습니다. 거래가 여전히 확인되지 않거나 대체될 수 있습니다. 5개의 확인 후 ZGo가 결제를 최종적으로 보고하고, 이후에만 주문을 지불 상태로 표기해야 합니다. 상인이 브로드캐스트 이벤트에서 재고 또는 충족을 트리거하도록 설정하면 사기나 실패한 결제로 인해 실제 손실이 발생할 수 있습니다.

**ZGo에 거래소 예금 주소를 지정하는 것.** Zcash 주소처럼 보일지라도, 거래소 예금 주소는 거래소가 제어하며, 상인이 아니라 거래소가 키를 소유합니다. 이는 거래소가 자금을 보유하게 되며, 비보관식 처리기를 사용하는 이유를 무너뜨립니다. ZGo에 설정된 지갑 주소는 상인이 직접 시드 구문을 제어하는 지갑이어야 합니다.

**ZGo를 지갑으로 간주하는 것.** ZGo는 결제 처리기이며, 지갑이 아닙니다. 키를 저장하거나 잔액을 보유하거나 상인이 자금을 사용하도록 허용하지 않습니다. ZGo가 라우팅한 돈을 받기 위해 상인의 직접적인 제어 하에 있는 별도의 Zcash 지갑이 필요합니다.

## 결론

ZGo는 상인이 보관 없이, 중간자에 의존하지 않고, 공개 체인에서 거래 세부 정보를 노출시키지 않으면서 Zcash 결제를 수락할 수 있도록 합니다. 두 통합(Xero 및 WooCommerce)은 가장 일반적인 상인 워크플로우를 커버하며, 나머지는 브라우저에서 직접 ZGo를 사용하여 처리할 수 있습니다.

설치 과정은 간단합니다: Zcash 지갑을 얻고 [zgo.cash](https://zgo.cash/)에 계정을 생성한 후 결제 요청을 직접 생성하거나 관련 통합을 설치하면 됩니다.

## 자료

- [ZGo 공식 웹사이트](https://zgo.cash/)
- [Xero 통합 구성 가이드](https://hedgedoc.vergara.tech/s/4iXC67fmb)
- [WooCommerce](https://woocommerce.com/) 및 [WordPress](https://wordpress.org/)
- [Xero](https://www.xero.com/)
- [Zcash 프로젝트 홈페이지](https://z.cash/)
- [ZecHub Wallets](https://zechub.wiki/wallets), 호환 가능한 Zcash 지갑 목록
- [ZecHub 결제 처리기 개요](https://zechub.wiki/payment-processors), ZGo가 다른 Zcash 결제 옵션과의 맥락에서 설명됨
- [BTCPayServer Zcash 플러그인](https://zechub.wiki/guides/btcpayserver-zcash-plugin), 자체 호스팅 대안에 대한 관련 ZecHub 가이드
