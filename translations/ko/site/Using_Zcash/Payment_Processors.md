---
<a href="https://github.com/zechub/zechub/edit/main/site/Using_Zcash/Payment_Processors.md" target="_blank">
  <img src="https://img.shields.io/badge/Edit-blue" alt="Edit Page"/>
</a>

# Zcash 결제 처리업체

가맹점이 ZEC를 결제로 받을 수 있는 방법을 한눈에 비교했습니다. 모든 항목은 **2026년 7월 29일**에 각 제공업체의 공식 사이트와 API를 기준으로 확인했습니다.

프라이버시 자산 지원은 자주 바뀌므로, 각 행에는 자체 검증 날짜가 포함되어 있습니다. 몇 달 뒤에 이 문서를 읽고 있다면 연동 전에 반드시 제공업체 사이트를 다시 확인하세요.

<div class="processor-table">

| Processor | Custody | Shielded ZEC | Self-host | Merchant fee | Regions / KYC | Verified |
|:--|:--|:--|:--|:--|:--|:--|
| [CipherPay](https://www.cipherpay.app) | 비수탁형 | 예, Unified Address를 통한 Orchard | 예, 오픈소스 | 결제당 1%, 자체 호스팅 시 무료 | KYC 없음, 지역 명시 없음 | 2026-07-29 |
| [BTCPay Server](https://github.com/btcpay-zcash/btcpayserver-zcash-plugin) | 비수탁형, view key만 사용 | 예, Shielded 전용 (Sapling, Orchard, UA) | 예, 오픈소스 | 없음, 네트워크 수수료만 부담 | 전 세계, KYC 없음 | 2026-07-29 |
| [ZGo](https://zgo.cash/) | 비수탁형 | 예, Sapling 및 Orchard | 아니요, 호스팅 서비스 | 선불 세션 방식, 가격 비공개 | KYC 명시 없음, 지역 명시 없음 | 2026-07-29 |
| [Flexa](https://flexa.co/) | 고객 자가 수탁, 가맹점은 법정화폐로 정산 | 고객은 Shielded를 사용, 수신 측은 문서화되지 않음 | 아니요 | 결제당 1% | 미국 및 SEPA 37개국, EU에서 ZEC 지원은 미확인 | 2026-07-29 |
| [NOWPayments](https://nowpayments.io/supported-coins/zcash-payments) | 기본적으로 비수탁형 | 아니요, 투명 주소만 지원 | 아니요 | 0.5%, 환전 포함 시 1% | 금지된 지역 제외 전 세계, 시작 시 KYC 없음 | 2026-07-29 |
| [Plisio](https://plisio.net/accept-zcash) | 마케팅과 달리 수탁형 | 문서화되지 않음 | 아니요 | API 0.5%, 화이트 라벨 1.5% | 수령 시 KYC 없음 | 2026-07-29 |
| [Binance Pay](https://pay.binance.com/en) | 수탁형, 오프체인 | 아니요, Shielded 입금 거부 | 아니요 | 지갑 간 무료, 지급 수수료 0.8% | 지역 제한 있음, FR·ES·IT·PL에서 ZEC 상장폐지 | 2026-07-29 |

</div>

### 각 열의 의미

**Custody**는 해당 처리업체가 당신의 ZEC를 보관하는지를 뜻합니다. 비수탁형은 당신이 직접 통제하는 지갑으로 자금이 들어간다는 의미입니다.

**Shielded ZEC**는 Shielded 풀로 결제를 받을 수 있는지를 뜻합니다. 투명 주소만 지원하면 금액과 주소가 블록체인에 공개됩니다.

**Self-host**는 중간에 기업 없이 소프트웨어를 직접 실행할 수 있는지를 뜻합니다.

**Merchant fee**에는 Zcash 네트워크 수수료가 포함되지 않습니다. 이 수수료는 어떤 경우든 누군가는 부담해야 합니다.

제공업체가 어떤 정보를 공개하지 않은 경우, 이 문서에서는 추측하지 않고 "명시 없음" 또는 "문서화되지 않음"이라고 적습니다. 이것은 "없음"과 같은 뜻이 아닙니다.

### 무엇을 선택할까

프라이버시와 통제력을 가장 중시한다면 **BTCPay Server** 또는 자체 호스팅한 **CipherPay**를 사용하세요. 둘 다 Shielded를 지원하고, 오픈소스이며, 자금을 대신 보관하지 않습니다.

온라인이 아니라 오프라인 매장에서 결제를 받으려면 **Flexa**를 사용하세요.

호스팅형 게이트웨이가 필요하고 투명 결제도 괜찮다면 **NOWPayments** 또는 **Plisio**를 사용하세요.

다시 한번 강조할 만한 주의점이 있습니다. 투명 주소만 지원하는 처리업체는 모든 결제 금액과 주소를 블록체인에 공개합니다. 그리고 호스팅형 비수탁 처리업체는 당신의 viewing key를 넘겨주어야 하므로, 회사는 자금을 쓸 수는 없지만 결제 내역은 볼 수 있습니다. 이를 피하는 유일한 방법은 자체 호스팅입니다.

<div class="processor-note">

**ZGo 서비스 경고, 2026년 7월 29일.** 이 페이지를 점검하는 동안 api.zgo.cash의 ZGo 백엔드는 모든 엔드포인트에서 HTTP 503을 반환했습니다. 프로젝트가 버려진 것은 아니며 유지관리자는 이번 달에도 커뮤니티에서 활동했지만, 실제로 의존하기 전에 서비스가 실행 중인지 확인하세요.

</div>

---

## [CipherPay](https://www.cipherpay.app) <img src="/content-images/cipherpay-mark.png" alt="CipherPay logo" class="processor-logo" />
- **Support Type**: Shielded (Orchard, Unified Address를 통해)
- **Description**: 몇 분 만에 Zcash 결제를 받을 수 있고, 비수탁형이며, 구매자 데이터가 필요 없고, 중개자가 없습니다.
- **URL**: [CipherPay](https://www.cipherpay.app)
<img src="/content-images/cipherpay-mark.png" alt="CipherPay logo" width="200" hidden />

CipherPay에는 읽기 전용 view key를 제공하므로 결제는 곧바로 당신의 지갑으로 들어가고, 서비스가 자금을 보관하지 않습니다. 각 청구서마다 새로운 주소를 사용합니다.

Orchard만 지원합니다. 저장소 README에는 Sapling이 언급되어 있지만, 실제로는 Sapling이나 투명 주소 지원이 없습니다.

결제당 1%의 수수료가 들며, 직접 실행하면 완전히 무료입니다. 전체가 오픈소스이며, SQLite를 사용하는 Rust 바이너리 또는 Docker 이미지로 제공됩니다. KYC는 없고, 구매자도 계정이 필요하지 않습니다.

연동 방식으로는 Shopify, WooCommerce, REST API, 호스팅 체크아웃, 결제 링크, 오프라인 QR이 지원됩니다.

고려할 점이 두 가지 있습니다. 2026년 2월에 출시되었고 공개된 보안 감사가 없습니다. 또 호스팅형에서는 운영자가 당신의 viewing key를 보유하므로 결제 내역을 볼 수 있습니다. 자체 호스팅하면 이 문제는 사라집니다. 또한 Shielded 결제는 최종 확정되므로 환불하려면 구매자가 주소를 제공해야 합니다.

**마지막 검증일:** 2026-07-29

---

## [BTCPay Server](https://github.com/btcpay-zcash/btcpayserver-zcash-plugin) <img src="/content-images/btcpay-mark.png" alt="BTCPay Server logo" class="processor-logo" />
- **Support Type**: Shielded 전용 (Sapling, Orchard, Unified Address)
- **Description**: BTCPay Server는 오픈소스이자 자체 호스팅 가능한 암호화폐 결제 처리업체입니다.
- **URL**: [BTCPay Server](https://github.com/btcpay-zcash/btcpayserver-zcash-plugin)
<img src="/content-images/btcpay-mark.png" alt="BTCPay Server logo" width="200" hidden />

수탁 구조 측면에서는 가장 강력한 선택지입니다. 지갑 백엔드는 view-only 방식이며 시드나 비밀 키를 보관하지 않으므로, 서버가 침해되더라도 자금을 쓸 수 없습니다.

Shielded 전용이며 Sapling, Orchard, Unified Address를 지원합니다. 투명 주소로의 대체 경로는 없으니, 그것을 전제로 계획해서는 안 됩니다.

설치하려면 feat/zec 브랜치의 btcpay-zcash Docker 포크와, Ywallet 또는 Zingo 같은 지갑에서 내보낸 viewing key가 필요합니다. 기본적으로는 원격 lightwalletd와 통신하지만, Zebra와 lightwalletd를 직접 실행할 수도 있습니다.

알아둘 제한 사항이 하나 있습니다. 이 플러그인은 인스턴스의 모든 스토어에 대해 단일 Zcash 지갑을 사용하므로 공유 서버에서 실행하면 안 됩니다. 스토어별 지갑 기능은 현재 개발 중입니다.

소프트웨어 자체 수수료는 없습니다. Zcash 네트워크 수수료와 호스팅 비용만 부담하면 됩니다.

**마지막 검증일:** 2026-07-29

---

## [ZGo](https://zgo.cash/) <img src="/content-images/zgo-prp2-497679039b.webp" alt="ZGo logo" class="processor-logo" />
- **Support Type**: Shielded (Sapling 및 Orchard)
- **Description**: ZGo는 제3자 없이 고객으로부터 당신에게 직접 결제가 이루어지는 전자 결제 플랫폼입니다.
- **URL**: [ZGo](https://zgo.cash/)
<img src="/content-images/zgo-prp2-497679039b.webp" alt="ZGo logo" width="200" hidden />

브라우저에서 실행되는 계산대이므로, 노트북, 태블릿, 휴대폰이 모두 체크아웃 기기가 될 수 있습니다. WooCommerce 플러그인과 REST API도 있습니다. Vergara Technologies가 개발했으며, zcashd에서 Zebra로의 이전을 포함해 Zcash Community Grants의 자금 지원을 받았습니다.

자금은 고객의 지갑에서 곧바로 당신의 지갑으로 이동하며, 중간에 누구도 끼지 않습니다.

Shielded를 지원하며 Unified Address를 통해 Sapling과 Orchard를 처리하고, ZIP 321을 따릅니다. 현재 어떤 공식 자료도 투명 주소를 처리한다고 밝히지 않으므로, 이 페이지도 더 이상 그렇게 주장하지 않습니다.

실질적으로 자체 호스팅은 불가능합니다. ZGo가 Zcash 인프라를 대신 운영하며 배포 가이드를 공개하지 않았습니다. 소스 코드는 유지관리자의 자체 Git 서버에 공개되어 있지만, 사람들이 흔히 발견하는 GitLab 사본은 2022년의 오래된 미러입니다.

무료도 아닙니다. ZGo는 선불 세션을 판매하며 WooCommerce에는 Pro 세션이 필요하지만, 현재 가격 페이지에 접속할 수 없어 여기서는 금액을 적지 않습니다.

**마지막 검증일:** 2026-07-29

---

## [Flexa](https://flexa.co/) <img src="/content-images/flexa-mark.png" alt="Flexa logo" class="processor-logo" />
- **Support Type**: 고객은 Shielded를 사용, 수신 측은 문서화되지 않음
- **Description**: Flexa는 고객이 자가 수탁 지갑에서 Zcash를 포함한 디지털 자산을 소매점에서 사용할 수 있게 해주는 결제 네트워크입니다.
- **URL**: [Flexa](https://flexa.co/)
<img src="/content-images/flexa-mark.png" alt="Flexa logo" width="200" hidden />

Flexa는 체크아웃 게이트웨이가 아니므로, 여기 있는 다른 서비스의 대체재는 아닙니다. 고객은 Zodl 같은 Flexa 지원 지갑을 열고 일회용 코드를 보여주면, 매장이 이를 스캔합니다. ZEC 청구서도 없고 전자상거래 플러그인도 없습니다.

고객은 결제하는 순간까지 자신의 코인을 직접 보관합니다. 가맹점인 당신은 ZEC를 직접 받지 않습니다. Flexa가 당신이 선택한 통화로 정산해 주므로 암호화폐 측면은 그들이 처리합니다.

Flexa의 공식 발표에서는 Zcash 통합을 Shielded ZEC로 결제하는 방식이라고 설명합니다. 하지만 Flexa가 어떤 주소 유형으로 수신하는지는 어디에도 공개되어 있지 않습니다.

수수료는 결제당 1%이며, 환전과 수탁 비용이 추가로 붙지 않습니다.

미국에서 사용할 수 있으며, 2026년 7월부터는 SEPA 37개 국가 및 지역에서도 사용할 수 있습니다. 다만 유럽에서 특히 ZEC를 사용할 수 있는지는 명시되어 있지 않습니다.

**마지막 검증일:** 2026-07-29

---

## [NOWPayments](https://nowpayments.io/supported-coins/zcash-payments) <img src="/content-images/nowpayments-wordmark.png" alt="NOWPayments logo" class="processor-logo processor-logo-wide" />
- **Support Type**: 투명 주소만 지원
- **Description**: NOWPayments는 가맹점이 Zcash 결제와 기부를 쉽게 받을 수 있도록 하는 암호화폐 결제 게이트웨이입니다.
- **URL**: [NOWPayments](https://nowpayments.io/supported-coins/zcash-payments)
<img src="/content-images/nowpayments-wordmark.png" alt="NOWPayments logo" width="200" hidden />

Shielded 지원은 없습니다. 공식 문서에서는 Zcash에 대해 투명 주소를 설정하라고 안내하며, ZEC는 그 점을 별도로 명시한 유일한 코인입니다. 당신이 받는 모든 결제는 블록체인에 공개됩니다.

기본적으로 비수탁형입니다. FAQ에 따르면 자금을 보관하지 않으며 개인 키도 절대 보유하지 않습니다. 선택 가능한 수탁 잔액 기능이 있으므로, 확실해야 한다면 계정 설정을 확인하세요.

수수료는 일반 결제가 0.5%, 다중 통화, 고정 환율, 또는 "사용자 부담 수수료" 결제가 1%이며, 여기에 네트워크 수수료가 추가됩니다.

법적으로 금지된 지역을 제외하면 전 세계에서 사용할 수 있습니다. 암호화폐 결제를 받기 시작할 때는 KYC가 필요 없고, 법정화폐 출금 시에만 필요합니다.

**마지막 검증일:** 2026-07-29

---

## [Plisio](https://plisio.net/accept-zcash) <img src="/content-images/plisio-wordmark.png" alt="Plisio logo" class="processor-logo processor-logo-wide" />
- **Support Type**: 투명 주소 (문서화되지 않음)
- **Description**: Plisio는 기업이 Zcash 결제를 받을 수 있게 해주는 암호화폐 결제 게이트웨이입니다.
- **URL**: [Plisio](https://plisio.net/accept-zcash)
<img src="/content-images/plisio-wordmark.png" alt="Plisio logo" width="200" hidden />

수탁형으로 보는 것이 맞습니다. Plisio의 마케팅에서는 비수탁형이라고 하지만, 자사 도움말 페이지에서는 플랫폼에 보관된 잔액, 콜드 스토리지, 출금 절차를 설명합니다. 비수탁형이라는 주장은 확인할 수 없었습니다.

Plisio는 어떤 Zcash 주소 유형을 사용하는지 전혀 밝히지 않으므로, 누군가 달리 확인하기 전까지는 투명 주소라고 가정해야 합니다.

지갑은 무료이고, 게이트웨이와 API는 0.5%, White Label은 1.5%입니다. White Label은 자체 호스팅이 아니라 호스팅 서비스의 리브랜딩 버전입니다.

결제 수령에는 KYC가 필요 없으며, 제한 국가 목록도 공개되어 있지 않습니다.

**마지막 검증일:** 2026-07-29

---

## [Binance Pay](https://pay.binance.com/en) <img src="/content-images/binancepay-mark.png" alt="Binance Pay logo" class="processor-logo" />
- **Support Type**: 투명 주소만 지원, Shielded 입금은 거부됨
- **Description**: Binance Pay는 Zcash 결제를 지원하는 암호화폐 결제 플랫폼입니다.
- **URL**: [Binance Pay](https://pay.binance.com/en)
<img src="/content-images/binancepay-mark.png" alt="Binance Pay logo" width="200" hidden />

Binance는 Shielded 주소에서 보낸 ZEC를 거부합니다. 바로 그 거부 때문에 TEX 주소가 만들어졌습니다.

완전한 수탁형입니다. 결제는 Binance Pay 지갑 간 오프체인으로 이동하며, 검증된 Binance 계정이 필요합니다.

지갑 간 전송은 무료이고, 가맹점 지급 수수료는 0.8%이며 최대 5 USD로 제한됩니다. Mini Program 가맹점은 1%를 부담합니다.

이 서비스에 의존하기 전에 사용 가능한 지역인지 확인하세요. Binance Pay는 일부 국가와 업종에서는 제공되지 않으며, ZEC는 2023년부터 프랑스, 스페인, 이탈리아, 폴란드 사용자에게 상장폐지되었고, EEA에서는 MiCA 규제로 인해 서비스가 중단된 바 있습니다.

**마지막 검증일:** 2026-07-29

---

### 더 이상 ZEC를 받지 않는 곳

이 둘은 이전에는 이 페이지에 포함되어 있었습니다. 2026년 7월 29일에 각 제공업체의 실제 통화 목록을 확인한 결과, 두 곳 모두에서 Zcash가 사라졌습니다.

**CoinPayments**는 v2 코인 목록, 레거시 목록, 실시간 통화 API 어디에도 ZEC를 표시하지 않으며, Zcash 관련 문서도 이제 홈페이지로 리디렉션됩니다.

**CoinGate**는 지원 통화 페이지나 공개 API 어디에도 ZEC를 표시하지 않습니다. 상장폐지는 공지되지 않았으므로, 이유와 날짜는 알 수 없습니다.

이들 중 어느 곳이든 Zcash를 다시 지원하면, 새로운 검증 날짜와 함께 다시 추가하세요.

### 이 페이지를 정확하게 유지하려면

프라이버시 코인 지원은 자주 바뀌므로, 이 페이지의 정확성은 마지막 점검 시점에 달려 있습니다. 검토할 때는 다음을 확인하세요.

1. 제공업체의 공식 통화 목록이나 API를 확인하세요. 위에서 제거된 두 처리업체 모두 제3자 목록은 오래된 정보였습니다.
2. 어떤 Zcash 주소 유형을 지원하는지 확인하세요. "Supports Zcash"는 대개 투명 주소만 지원한다는 뜻입니다.
3. 표와 해당 제공업체 섹션에 있는 검증 날짜를 모두 업데이트하세요.
