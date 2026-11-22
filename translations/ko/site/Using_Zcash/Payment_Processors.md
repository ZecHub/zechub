<a href="https://github.com/zechub/zechub/edit/main/site/Using_Zcash/Payment_Processors.md" target="_blank">
  <img src="https://img.shields.io/badge/Edit-blue" alt="페이지 편집"/>
</a>

# Zcash 결제 지원 서비스

판매자가 ZEC을 받는 방법을 나란히 비교했습니다. Zcash Payment Service는 **2026년 11월 1일**에 추가되었으며, 이를 제외한 모든 항목은 **2026년 7월 29일**에 각 서비스 제공업체의 자체 사이트와 API를 확인했습니다.

프라이버시 자산 지원 여부는 자주 바뀌므로 각 항목에 확인 날짜를 표시했습니다. 이 페이지를 몇 달 뒤에 읽으신다면 통합하기 전에 서비스 제공업체의 사이트를 확인하세요.

<div class="processor-table">

| 처리 서비스 | 보관 방식 | 거래정보 보호 ZEC | 자체 호스팅 | 판매자 수수료 | 지역 / KYC | 확인 날짜 |
|:--|:--|:--|:--|:--|:--|:--|
| [CipherPay](https://www.cipherpay.app) | 비수탁형 | 예, 통합 주소를 통한 Orchard | 예, 오픈 소스 | 결제당 1%, 자체 호스팅 시 무료 | KYC 없음, 지원 지역 미기재 | 2026-07-29 |
| [BTCPay Server](https://github.com/btcpay-zcash/btcpayserver-zcash-plugin) | 비수탁형, 보기 키만 사용 | 예, 거래정보 보호 방식만 지원 (Sapling, Orchard, UA) | 예, 오픈 소스 | 없음, 네트워크 수수료만 지불 | 전 세계 지원, KYC 없음 | 2026-07-29 |
| [Zcash Payment Service](https://github.com/nerdcash/zcash-payment-service) | 비수탁형, 수신 보기 키만 사용 | 예, 거래정보 보호 방식만 지원 (Sapling 및 Orchard) | 예, 자체 호스팅만 가능, 오픈 소스 | 없음, 네트워크 수수료만 지불 | 계정 및 KYC 불필요 | 2026-11-01 |
| [ZGo](https://zgo.cash/) | 비수탁형 | 예, Sapling 및 Orchard | 아니요, 호스팅 서비스 | 선불 세션, 가격 미공개 | KYC 미기재, 지원 지역 미기재 | 2026-07-29 |
| [Flexa](https://flexa.co/) | 고객이 직접 보관, 판매자는 법정화폐로 정산 | 고객은 거래정보 보호 방식으로 결제하지만 수신 측은 문서에 설명 없음 | 아니요 | 결제당 1% | 미국 및 SEPA 37개국, EU 내 ZEC 지원 여부 미확인 | 2026-07-29 |
| [NOWPayments](https://nowpayments.io/supported-coins/zcash-payments) | 기본 설정은 비수탁형 | 아니요, 투명 주소만 지원 | 아니요 | 0.5%, 환전 시 1% | 금지된 지역을 제외한 전 세계 지원, 시작 시 KYC 불필요 | 2026-07-29 |
| [Plisio — 결제 중단](https://plisio.net/) | 홍보와 달리 수탁형 | 문서에 설명 없음 | 아니요 | API 0.5%, 화이트 라벨 1.5% | 결제 수신 시 KYC 불필요 | 2026-07-29 |
| [Binance Pay](https://pay.binance.com/en) | 수탁형, 오프체인 | 아니요, 거래정보 보호 방식의 입금 거부 | 아니요 | 지갑 간 무료, 출금 수수료 0.8% | 지역 제한 있음, 프랑스·스페인·이탈리아·폴란드에서는 ZEC 이용 불가 | 2026-07-29 |

</div>

### 열의 의미

**보관 방식**은 처리 서비스가 사용자의 ZEC을 보관하는지를 뜻합니다. 비수탁형이라면 자산은 사용자가 관리하는 지갑으로 들어갑니다.

**거래정보 보호 ZEC**는 거래정보 보호 구역으로 결제를 받을 수 있는지를 뜻합니다. 투명 방식만 지원한다면 금액과 주소가 블록체인에 공개됩니다.

**자체 호스팅**은 중간에 회사가 개입하지 않도록 직접 소프트웨어를 실행할 수 있는지를 뜻합니다.

**판매자 수수료**에는 Zcash 네트워크 수수료가 포함되지 않습니다. 어느 경우든 누군가는 네트워크 수수료를 지불해야 합니다.

서비스 제공업체가 정보를 공개하지 않은 경우 추측하는 대신 항목에 “미기재” 또는 “문서에 설명 없음”이라고 표시했습니다. 이는 “없음”과 같은 뜻이 아닙니다.

### 어떤 서비스를 선택할까요?

프라이버시와 통제권을 최대한 확보하려면 자체 호스팅하는 **BTCPay Server**, **CipherPay**, 또는 사이트에 약간의 코드를 추가할 수 있다면 **Zcash Payment Service**를 사용하세요. 세 서비스 모두 거래정보 보호 방식을 지원하고 오픈 소스이며, 사용자를 대신해 자금을 보관하지 않습니다.

온라인이 아닌 매장에서 결제를 받으려면 **Flexa**를 사용하세요.

투명 방식 결제를 허용할 수 있고 호스팅 결제 게이트웨이가 필요하다면 **NOWPayments**를 사용하세요. **Plisio**는 결제를 중단했으므로(아래 항목의 날짜가 표시된 공지 참고) 당분간 선택하지 마세요.

다시 강조할 점이 있습니다. 투명 방식만 지원하는 처리 서비스는 모든 결제 금액과 주소를 블록체인에 공개합니다. 또한 호스팅되는 비수탁형 처리 서비스를 이용하면 보기 키를 넘겨주게 되므로, 회사가 자금을 사용할 수는 없어도 결제 내역은 볼 수 있습니다. 이를 피하는 유일한 방법은 자체 호스팅입니다.

<div class="processor-note">

**ZGo 서비스 경고, 2026년 7월 29일.** 이 페이지를 확인하는 동안 api.zgo.cash의 ZGo 백엔드는 모든 엔드포인트에서 HTTP 503을 반환했습니다. 프로젝트가 중단된 것은 아니며 관리자는 이번 달에도 커뮤니티에서 활동했지만, 서비스를 이용하기 전에 정상적으로 작동하는지 확인하세요.

</div>

---

## [CipherPay](https://www.cipherpay.app) <img src="/content-images/cipherpay-mark.png" alt="CipherPay 로고" class="processor-logo" />
- **지원 유형**: 거래정보 보호 (Orchard, 통합 주소 사용)
- **설명**: 몇 분 만에 Zcash을 받을 수 있습니다. 비수탁형이며 구매자 데이터가 필요 없고 중개자가 없습니다.
- **URL**: [CipherPay](https://www.cipherpay.app)
<img src="/content-images/cipherpay-mark.png" alt="CipherPay 로고" width="200" hidden />

CipherPay에 보기 전용 키를 제공하면 결제 금액은 곧바로 자신의 지갑으로 들어가며 서비스는 자금을 보관하지 않습니다. 청구서마다 새로운 주소를 사용합니다.

Orchard만 지원합니다. 저장소 README에 Sapling이 언급되어 있지만, Sapling나 투명 방식은 지원하지 않습니다.

결제당 수수료는 1%이며 직접 실행하면 비용이 전혀 들지 않습니다. 전체 소프트웨어는 SQLite를 사용하는 Rust 바이너리 또는 Docker 이미지 형태로 제공되는 오픈 소스입니다. KYC가 없고 구매자도 계정이 필요하지 않습니다.

Shopify, WooCommerce, REST API, 호스팅 결제, 결제 링크, 대면 결제용 QR 코드와 통합할 수 있습니다.

고려할 점이 2가지 있습니다. 2026년 2월에 출시되었으며 공개된 보안 감사가 없습니다. 또한 호스팅 서비스에서는 운영자가 보기 키를 보관하므로 결제 내역을 볼 수 있습니다. 자체 호스팅하면 이를 피할 수 있습니다. 거래정보 보호 방식의 결제는 되돌릴 수 없으므로 환불하려면 구매자가 주소를 알려줘야 합니다.

**마지막 확인 날짜:** 2026-07-29

---

## [BTCPay Server](https://github.com/btcpay-zcash/btcpayserver-zcash-plugin) <img src="/content-images/btcpay-mark.png" alt="BTCPay Server 로고" class="processor-logo" />
- **지원 유형**: 거래정보 보호 방식만 지원 (Sapling, Orchard, 통합 주소)
- **설명**: BTCPay Server는 오픈 소스 자체 호스팅 암호화폐 결제 처리 서비스입니다.
- **URL**: [BTCPay Server](https://github.com/btcpay-zcash/btcpayserver-zcash-plugin)
<img src="/content-images/btcpay-mark.png" alt="BTCPay Server 로고" width="200" hidden />

자금 보관 측면에서 가장 강력한 선택지입니다. 지갑 백엔드는 보기 전용이며 시드나 비밀 키를 보관하지 않으므로 서버가 침해되더라도 자금을 사용할 수 없습니다.

Sapling, Orchard 및 통합 주소를 지원하는 거래정보 보호 방식만 사용할 수 있습니다. 투명 방식으로 대체할 수 없으므로 이를 전제로 계획하지 마세요.

설치하려면 feat/zec 브랜치의 btcpay-zcash Docker 포크와 Zkool 또는 Zingo 같은 지갑에서 내보낸 보기 키가 필요합니다. 기본적으로 원격 lightwalletd에 연결하지만, 직접 Zebra와 lightwalletd를 실행할 수도 있습니다.

한 가지 알아둘 제한 사항이 있습니다. 플러그인은 인스턴스의 모든 상점에서 단일 Zcash 지갑을 사용하므로 공유 서버에서 실행하지 마세요. 상점별 지갑 기능은 개발 중입니다.

소프트웨어 자체에는 수수료가 없습니다. Zcash 네트워크 수수료와 호스팅 비용은 별도로 지불해야 합니다.

**마지막 확인 날짜:** 2026-07-29

---

## [Zcash Payment Service](https://github.com/nerdcash/zcash-payment-service)
- **지원 유형**: 거래정보 보호 방식만 지원 (Sapling 및 Orchard)
- **설명**: 온라인 판매자를 위한 무료 자체 호스팅 Zcash 결제 처리 서비스로, Docker 컨테이너로 실행하거나 Rust 크레이트로 앱에 포함할 수 있습니다.
- **URL**: [Zcash Payment Service](https://github.com/nerdcash/zcash-payment-service)

Andrew Arnott가 만든 무료 오픈 소스(MIT 라이선스) 처리 서비스로, 개발자는 이미 자신의 앱에서 실제 결제에 사용하고 있습니다.

수신 보기 키(UIVK)만 보관합니다. 결제가 들어오는 것은 볼 수 있지만 자금을 사용할 수는 없으므로 서버가 침해되더라도 자금을 옮길 수 없습니다. 키는 자체 서버에 보관되므로 어떤 회사도 결제 내역을 볼 수 없습니다.

결제할 때마다 Sapling와 Orchard 수신자를 포함하고 투명 수신자는 포함하지 않는 새로운 통합 주소가 생성됩니다. 결제 금액은 곧바로 자신의 지갑으로 들어갑니다.

수수료와 계정, 사용량 제한이 없습니다. Zcash 네트워크 수수료와 호스팅 비용만 지불하면 됩니다.

자체 호스팅만 가능합니다. Docker 컨테이너 하나를 실행하거나 이미 실행 중인 앱 안에서 Rust 크레이트를 사용할 수 있습니다. 선택한 lightwalletd 서버에서 체인을 읽으므로 풀 노드는 필요하지 않습니다.

설정에는 플러그인이 아니라 코드를 작성해야 합니다. 사이트는 결제 시 서비스에 결제 주소와 QR 코드를 요청하고, 서비스는 서명된 웹훅을 통해 결제 금액이 도착했음을 사이트에 알립니다. JavaScript 및 TypeScript 백엔드용 npm 클라이언트가 있으며, 참고할 수 있는 오픈 소스 [데모 상점](https://github.com/nerdcash/zcash-payment-demo-store)도 있습니다. Shopify 또는 WooCommerce 플러그인은 없으므로 사이트 코드를 직접 관리하거나 코드를 관리할 개발자가 필요합니다.

고려할 점이 있습니다. 새 서비스입니다. 저장소는 2026년 6월에 시작되었고 npm 클라이언트는 버전 0.1이며, 태그가 지정된 릴리스가 아직 없고 공개된 보안 감사도 없습니다. 자체 로그인 기능이 없는 API이므로 비공개 네트워크에서만 사용하고 인터넷에 공개하지 마세요. 다른 거래정보 보호 방식 결제와 마찬가지로 환불하려면 구매자가 주소를 알려줘야 합니다.

**마지막 확인 날짜:** 2026-11-01

---

## [ZGo](https://zgo.cash/) <img src="/content-images/zgo-prp2-497679039b.webp" alt="ZGo 로고" class="processor-logo" />
- **지원 유형**: 거래정보 보호 (Sapling 및 Orchard)
- **설명**: ZGo는 제3자의 개입 없이 고객과 판매자를 직접 연결하는 전자 결제 플랫폼입니다.
- **URL**: [ZGo](https://zgo.cash/)
<img src="/content-images/zgo-prp2-497679039b.webp" alt="ZGo 로고" width="200" hidden />

브라우저에서 실행하는 계산대이므로 노트북, 태블릿 또는 휴대폰을 결제 단말기로 사용할 수 있습니다. WooCommerce 플러그인과 REST API도 제공됩니다. Vergara Technologies가 개발했으며, Zcash Community Grants의 지원을 받아 zcashd에서 Zebra로 이전했습니다.

자금은 고객에게서 곧바로 판매자의 지갑으로 들어가며 중간에 끼어드는 주체가 없습니다.

Sapling와 Orchard을 통합 주소로 지원하는 거래정보 보호 방식이며, ZIP 321을 따릅니다. 현재 공개된 자료에는 투명 주소를 처리한다는 내용이 없으므로 이 페이지에서는 더 이상 지원한다고 주장하지 않습니다.

실질적으로 자체 호스팅할 수 없습니다. ZGo가 Zcash 인프라를 운영하지만 배포 안내는 제공하지 않습니다. 소스 코드는 관리자의 자체 Git 서버에서 공개되어 있지만, 일반적으로 찾을 수 있는 GitLab 사본은 2022년의 오래된 미러입니다.

무료 서비스도 아닙니다. ZGo는 선불 세션을 판매하며 WooCommerce에는 Pro 세션이 필요합니다. 하지만 현재 가격 페이지에 접속할 수 없어 여기에는 가격을 기재하지 않았습니다.

**마지막 확인 날짜:** 2026-07-29

---

## [Flexa](https://flexa.co/) <img src="/content-images/flexa-mark.png" alt="Flexa 로고" class="processor-logo" />
- **지원 유형**: 고객은 거래정보 보호 방식으로 결제하지만 수신 측은 문서에 설명 없음
- **설명**: Flexa는 고객이 Zcash을 포함한 디지털 자산을 직접 보관하는 지갑에서 소매점 결제에 사용할 수 있게 하는 결제 네트워크입니다.
- **URL**: [Flexa](https://flexa.co/)
<img src="/content-images/flexa-mark.png" alt="Flexa 로고" width="200" hidden />

Flexa는 결제 게이트웨이가 아니므로 여기 나열된 다른 서비스의 대체재가 아닙니다. 고객은 Zodl 같은 Flexa 지원 지갑을 열어 일회용 코드를 보여주고, 상점은 이를 스캔합니다. ZEC 청구서도 없고 전자상거래 플러그인도 없습니다.

고객은 결제 순간까지 자신의 코인을 직접 보관합니다. 판매자는 ZEC을 받지 않습니다. Flexa가 판매자에게 선택한 통화로 정산하므로 암호화폐 관련 처리는 해당 서비스가 담당합니다.

Flexa의 자체 공지에서는 Zcash 통합을 통해 거래정보 보호 ZEC으로 결제한다고 설명합니다. Flexa가 어떤 주소 유형으로 수신하는지는 어디에도 공개되어 있지 않습니다.

결제당 수수료는 1%이며 환전과 보관이 추가 비용 없이 포함됩니다.

미국에서 이용할 수 있으며, 2026년 7월부터는 SEPA 37개국 및 지역에서도 이용할 수 있습니다. 유럽에서 특히 ZEC을 사용할 수 있는지는 명시되어 있지 않습니다.

**마지막 확인 날짜:** 2026-07-29

---

## [NOWPayments](https://nowpayments.io/supported-coins/zcash-payments) <img src="/content-images/nowpayments-wordmark.png" alt="NOWPayments 로고" class="processor-logo processor-logo-wide" />
- **지원 유형**: 투명 방식만 지원
- **설명**: NOWPayments는 판매자가 Zcash 결제와 기부를 쉽게 받을 수 있게 하는 암호화폐 결제 게이트웨이입니다.
- **URL**: [NOWPayments](https://nowpayments.io/supported-coins/zcash-payments)
<img src="/content-images/nowpayments-wordmark.png" alt="NOWPayments 로고" width="200" hidden />

거래정보 보호 방식은 지원하지 않습니다. 문서에서는 Zcash에 투명 주소를 설정하도록 안내하며, ZEC만 그런 방식으로 별도 언급합니다. 받는 모든 결제는 블록체인에 공개됩니다.

기본 설정은 비수탁형입니다. FAQ에 따르면 자금을 보관하거나 개인 키를 보유하지 않습니다. 선택 사항인 보관 잔액 기능이 있으므로 확실히 하려면 계정 설정을 확인하세요.

일반 결제 수수료는 0.5%이며, 다중 통화, 고정 환율 또는 “사용자가 수수료 지불” 방식의 결제는 1%입니다. 여기에 네트워크 수수료가 추가됩니다.

법으로 금지된 곳을 제외하고 전 세계에서 이용할 수 있습니다. 암호화폐 결제를 받기 시작할 때는 KYC가 필요하지 않으며, 법정화폐를 출금할 때만 필요합니다.

**마지막 확인 날짜:** 2026-07-29

---

## [Plisio](https://plisio.net/) <img src="/content-images/plisio-wordmark.png" alt="Plisio 로고" class="processor-logo processor-logo-wide" />

> **결제 중단 — 2026년 11월 12일 확인.** Plisio의 [홈페이지](https://plisio.net/)에는 복구 작업이 진행되는 동안 입출금 결제가 일시 중단되었다고 나와 있습니다. 자금을 보내기 전에 서비스 제공업체에 확인하세요. 현재 Zcash 전용 페이지는 404 오류를 반환하지만, 이것만으로 ZEC가 지원 목록에서 제외되었다고 단정할 수는 없습니다. 아래의 수수료, 보관 방식 및 주소 지원 정보는 2026년 7월 29일에 마지막으로 확인했으며, 이후 재확인하지 않았습니다.

- **지원 유형**: 투명 방식 (문서에 설명 없음)
- **설명**: Plisio는 Zcash 지원을 제공해 온 암호화폐 결제 게이트웨이입니다. 현재 결제 처리는 중단되었습니다. 위 날짜가 표시된 공지를 참고하세요.
- **URL**: [Plisio](https://plisio.net/)
<img src="/content-images/plisio-wordmark.png" alt="Plisio 로고" width="200" hidden />

수탁형으로 간주하세요. Plisio의 홍보 자료에서는 비수탁형이라고 설명하지만, 자체 도움말 페이지에는 플랫폼에 보관되는 잔액, 콜드 스토리지 및 출금 절차가 안내되어 있습니다. 비수탁형이라는 주장은 확인할 수 없었습니다.

Plisio은 어떤 Zcash 주소 유형을 사용하는지 전혀 밝히지 않으므로 다른 정보가 확인될 때까지 투명 방식이라고 가정하세요.

지갑은 무료이며 게이트웨이와 API 수수료는 0.5%, 화이트 라벨은 1.5%입니다. 화이트 라벨은 자체 호스팅이 아니라 호스팅 서비스를 브랜드만 바꿔 제공하는 방식입니다.

결제를 받을 때 KYC가 필요하지 않으며, 제한 국가 목록도 공개되어 있지 않습니다.

**마지막 확인 날짜:** 2026-07-29

---

## [Binance Pay](https://pay.binance.com/en) <img src="/content-images/binancepay-mark.png" alt="Binance Pay 로고" class="processor-logo" />
- **지원 유형**: 투명 방식만 지원, 거래정보 보호 방식의 입금 거부
- **설명**: Binance Pay는 Zcash 결제를 지원하는 암호화폐 결제 플랫폼입니다.
- **URL**: [Binance Pay](https://pay.binance.com/en)
<img src="/content-images/binancepay-mark.png" alt="Binance Pay 로고" width="200" hidden />

Binance는 거래정보 보호 주소에서 보낸 ZEC을 거부합니다. 이러한 거부가 TEX 주소가 만들어진 이유입니다.

완전한 수탁형입니다. 결제 금액은 Binance Pay 지갑 간에 오프체인으로 이동하며, 인증된 Binance 계정이 필요합니다.

지갑 간 송금은 무료이고, 판매자 출금 수수료는 0.8%(최대 5 USD)이며 Mini Program 판매자는 1%를 지불합니다.

이 서비스를 이용하기 전에 해당 지역에서 사용할 수 있는지 확인하세요. Binance Pay는 일부 국가와 업종에서 제공되지 않습니다. ZEC는 2023년부터 프랑스, 스페인, 이탈리아 및 폴란드 사용자에게 제공되지 않으며, MiCA에 따라 EEA에서의 서비스도 차질을 빚었습니다.

**마지막 확인 날짜:** 2026-07-29

---

### 더 이상 ZEC을 받지 않는 서비스

이 두 서비스는 이전에 이 페이지에 등록되어 있었습니다. 2026년 7월 29일에 각 서비스 제공업체의 실제 통화 목록을 확인한 결과, 둘 다 Zcash을 지원하지 않는 것으로 나타났습니다.

**CoinPayments**는 v2 코인 목록, 기존 목록, 실시간 통화 API 어디에도 ZEC을 등록하지 않았으며, Zcash 문서는 현재 홈페이지로 리디렉션됩니다.

**CoinGate**는 지원 통화 페이지나 공개 API 어디에도 ZEC을 등록하지 않았습니다. 지원 종료 공지가 없으므로 이유와 날짜는 알 수 없습니다.

두 서비스 중 하나라도 Zcash을 다시 지원한다면, 새 확인 날짜와 함께 다시 추가하세요.

### 이 페이지를 정확하게 유지하기

프라이버시 코인 지원 여부는 바뀌므로 이 페이지의 정확성은 마지막 확인 시점에 달려 있습니다. 검토할 때는 다음 사항을 확인하세요.

1. 서비스 제공업체의 자체 통화 목록이나 API를 확인하세요. 위에서 삭제한 두 처리 서비스의 경우 제3자 목록은 최신 정보가 아니었습니다.
2. 지원하는 Zcash 주소 유형을 확인하세요. “Zcash 지원”은 대체로 투명 주소만 지원한다는 뜻입니다.
3. 표와 각 서비스 항목의 확인 날짜를 업데이트하세요.
