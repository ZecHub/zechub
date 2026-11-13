<a href="https://github.com/zechub/zechub/edit/main/site/Using_Zcash/Payment_Processors.md" target="_blank">
  <img src="https://img.shields.io/badge/Edit-blue" alt="페이지 편집"/>
</a>

# Zcash 결제 처리업체

상인이 ZEC를 수락하는 방법을 나란히 비교합니다. 모든 항목은 제공업체 자체 사이트와 API를 기준으로 **2026년 7월 29일**에 확인되었으며, **2026년 11월 1일**에 추가된 Zcash Payment Service는 예외입니다.

프라이버시 자산 지원은 자주 바뀌므로 각 행에는 자체 확인 날짜가 표시됩니다. 몇 달 뒤 이 글을 읽는다면 통합하기 전에 제공업체 사이트를 확인하세요.

<div class="processor-table">

| 처리업체 | 수탁 | 실드된 ZEC | 자체 호스팅 | 판매자 수수료 | 지역 / KYC | 확인일 |
|:--|:--|:--|:--|:--|:--|:--|
| [CipherPay](https://www.cipherpay.app) | 비수탁형 | 예, 통합 주소를 통한 Orchard | 예, 오픈 소스 | 결제당 1%, 자체 호스팅 시 무료 | KYC 없음, 지역 미명시 | 2026-07-29 |
| [BTCPay Server](https://github.com/btcpay-zcash/btcpayserver-zcash-plugin) | 비수탁형, 보기 키만 사용 | 예, 실드된 주소만 지원(Sapling, Orchard, UA) | 예, 오픈 소스 | 없음, 네트워크 수수료만 부담 | 전 세계, KYC 없음 | 2026-07-29 |
| [Zcash Payment Service](https://github.com/nerdcash/zcash-payment-service) | 비수탁형, 수신 보기 키만 사용 | 예, 실드된 주소만 지원(Sapling 및 Orchard) | 예, 자체 호스팅 전용, 오픈 소스 | 없음, 네트워크 수수료만 부담 | 계정 없음, KYC 없음 | 2026-11-01 |
| [ZGo](https://zgo.cash/) | 비수탁형 | 예, Sapling 및 Orchard | 아니요, 호스팅 서비스 | 선불 세션, 가격 비공개 | KYC 미명시, 지역 미명시 | 2026-07-29 |
| [Flexa](https://flexa.co/) | 고객 자체 보관, 판매자는 법정화폐로 정산 | 고객은 실드된 자산으로 지불, 수신 측은 문서화되지 않음 | 아니요 | 결제당 1% | 미국 및 37개 SEPA 국가, EU에서의 ZEC 지원은 확인되지 않음 | 2026-07-29 |
| [NOWPayments](https://nowpayments.io/supported-coins/zcash-payments) | 기본적으로 비수탁형 | 아니요, 투명 주소만 지원 | 아니요 | 0.5%, 환전 시 1% | 금지된 지역을 제외한 전 세계, 시작 시 KYC 없음 | 2026-07-29 |
| [Plisio — 결제 중단](https://plisio.net/) | 마케팅과 달리 수탁형 | 문서화되지 않음 | 아니요 | API 0.5%, 화이트 라벨 1.5% | 수령 시 KYC 없음 | 2026-07-29 |
| [Binance Pay](https://pay.binance.com/en) | 수탁형, 오프체인 | 아니요, 실드된 입금 거부 | 아니요 | 지갑 간 전송 무료, 지급 0.8% | 지역 제한, 프랑스·스페인·이탈리아·폴란드에서 ZEC 상장 폐지 | 2026-07-29 |

</div>

### 열의 의미

**수탁**은 처리업체가 귀하의 ZEC를 보관하는지 여부입니다. 비수탁형은 귀하가 제어하는 지갑으로 자금이 들어간다는 뜻입니다.

**실드된 ZEC**는 실드된 풀에서 결제를 받을 수 있는지 여부입니다. 투명 주소 전용은 금액과 주소가 블록체인에 공개된다는 뜻입니다.

**자체 호스팅**은 중간에 회사 없이 소프트웨어를 직접 실행할 수 있는지 여부입니다.

**판매자 수수료**에는 Zcash 네트워크 수수료가 포함되지 않으며, 이는 모든 경우에 누군가가 부담합니다.

제공업체가 어떤 정보를 공개하지 않는 경우, 추측하지 않고 항목에 "미명시" 또는 "문서화되지 않음"이라고 표시합니다. 이는 "아니요"와 같지 않습니다.

### 무엇을 선택할지

최대한의 프라이버시와 통제를 원한다면 자체 호스팅 **BTCPay Server**, 자체 호스팅 **CipherPay**, 또는 사이트에 약간의 코드를 추가할 수 있다면 **Zcash Payment Service**를 사용하세요. 세 가지 모두 실드된 방식이며 오픈 소스이고, 귀하의 자금을 보관하지 않습니다.

온라인이 아니라 매장에서 결제를 받으려면 **Flexa**를 사용하세요.

투명 결제를 받아들일 수 있는 호스팅 게이트웨이가 필요하다면 **NOWPayments** 또는 **Plisio**를 사용하세요.

반복할 가치가 있는 한 가지 주의사항이 있습니다. 투명 주소 전용 처리업체는 모든 결제 금액과 주소를 블록체인에 공개합니다. 또한 호스팅형 비수탁 처리업체에서는 보기 키를 넘겨주므로, 회사는 자금을 쓸 수는 없지만 결제 내역은 볼 수 있습니다. 이를 피할 수 있는 유일한 방법은 자체 호스팅입니다.

<div class="processor-note">

**ZGo 서비스 경고, 2026년 7월 29일.** 이 페이지를 확인하는 동안 api.zgo.cash의 ZGo 백엔드는 모든 엔드포인트에서 HTTP 503을 반환했습니다. 프로젝트가 중단된 것은 아니며 유지 관리자는 이번 달 커뮤니티에서 활동했지만, 의존하기 전에 서비스가 실행 중인지 확인하세요.

</div>

---

## [CipherPay](https://www.cipherpay.app) <img src="/content-images/cipherpay-mark.png" alt="CipherPay 로고" class="processor-logo" />
- **지원 유형**: 실드된 방식(통합 주소를 통한 Orchard)
- **설명**: 몇 분 만에 Zcash를 수락하세요. 비수탁형, 구매자 데이터 없음, 중개자 없음.
- **URL**: [CipherPay](https://www.cipherpay.app)
<img src="/content-images/cipherpay-mark.png" alt="CipherPay 로고" width="200" hidden />

CipherPay에 보기 전용 키를 제공하면 결제는 귀하의 지갑으로 직접 들어가며, 이 서비스는 자금을 보관하지 않습니다. 청구서마다 새 주소를 사용합니다.

Orchard만 지원합니다. 저장소 README에 Sapling가 언급되어 있어도 Sapling 또는 투명 주소 지원은 없습니다.

결제당 1%가 들며, 직접 실행하면 완전히 무료입니다. 전체 시스템은 SQLite를 사용하는 Rust 바이너리 또는 Docker 이미지로 제공되는 오픈 소스입니다. KYC가 없으며 구매자에게 계정도 필요하지 않습니다.

통합 방식으로 Shopify, WooCommerce, REST API, 호스팅 체크아웃, 결제 링크 및 대면 QR을 제공합니다.

고려할 점은 두 가지입니다. 2026년 2월에 출시되었고 공개된 보안 감사가 없습니다. 또한 호스팅 등급에서는 운영자가 귀하의 보기 키를 보유하므로 결제를 볼 수 있습니다. 자체 호스팅하면 이를 없앨 수 있습니다. 실드된 결제는 최종적이므로 환불하려면 구매자가 주소를 제공해야 합니다.

**최종 확인일:** 2026-07-29

---

## [BTCPay Server](https://github.com/btcpay-zcash/btcpayserver-zcash-plugin) <img src="/content-images/btcpay-mark.png" alt="BTCPay Server 로고" class="processor-logo" />
- **지원 유형**: 실드된 주소만 지원(Sapling, Orchard, 통합 주소)
- **설명**: BTCPay Server는 오픈 소스 자체 호스팅 암호화폐 결제 처리업체입니다.
- **URL**: [BTCPay Server](https://github.com/btcpay-zcash/btcpayserver-zcash-plugin)
<img src="/content-images/btcpay-mark.png" alt="BTCPay Server 로고" width="200" hidden />

수탁 측면에서 가장 강력한 선택지입니다. 지갑 백엔드는 보기 전용이며 시드나 비밀 키를 보관하지 않으므로, 서버가 침해되어도 귀하의 돈을 쓸 수 없습니다.

실드된 주소만 지원하며 Sapling, Orchard 및 통합 주소를 포괄합니다. 투명 주소 대체 수단은 없으므로 이를 전제로 계획하지 마세요.

설치하려면 feat/zec 브랜치의 btcpay-zcash Docker 포크와 Zkool 또는 Zingo 같은 지갑에서 내보낸 보기 키가 필요합니다. 기본적으로 원격 lightwalletd와 통신하거나, Zebra 및 lightwalletd를 직접 실행할 수 있습니다.

알아둘 제한 사항이 하나 있습니다. 플러그인은 인스턴스의 모든 스토어에 단일 Zcash 지갑을 사용하므로 공유 서버에서 실행하지 마세요. 스토어별 지갑 기능은 개발 중입니다.

소프트웨어 자체에는 수수료가 없습니다. Zcash 네트워크 수수료와 호스팅 비용만 부담합니다.

**최종 확인일:** 2026-07-29

---

## [Zcash Payment Service](https://github.com/nerdcash/zcash-payment-service)
- **지원 유형**: 실드된 주소만 지원(Sapling 및 Orchard)
- **설명**: Docker 컨테이너로 실행하거나 Rust 크레이트로 임베드할 수 있는 온라인 판매자용 무료 자체 호스팅 Zcash 결제 처리업체입니다.
- **URL**: [Zcash Payment Service](https://github.com/nerdcash/zcash-payment-service)

자신의 앱에서 실제 결제에 이미 사용 중인 Andrew Arnott가 만든 무료 오픈 소스(MIT) 처리업체입니다.

수신 보기 키(UIVK)만 보유합니다. 결제 도착은 볼 수 있지만 자금을 쓸 수 없으므로, 서버가 침해되어도 자금을 옮길 수 없습니다. 키는 자신의 서버에 유지되므로 회사도 귀하의 결제를 볼 수 없습니다.

모든 체크아웃에는 Sapling 및 Orchard 수신자가 포함된 새 통합 주소가 부여되며 투명 수신자는 없습니다. 결제는 귀하의 지갑으로 바로 들어갑니다.

수수료, 계정, 사용량 측정이 없습니다. Zcash 네트워크 수수료와 호스팅 비용만 부담합니다.

자체 호스팅 전용입니다. Docker 컨테이너 하나로 실행하거나, 이미 운영 중인 앱 안에서 Rust 크레이트를 사용할 수 있습니다. 선택한 lightwalletd 서버에서 체인을 읽으므로 전체 노드가 필요하지 않습니다.

설정에는 플러그인이 아니라 코드가 필요합니다. 사이트는 체크아웃 시 서비스에 결제 주소와 QR 코드를 요청하고, 서비스는 서명된 웹훅을 통해 돈이 도착했음을 사이트에 알립니다. JavaScript 및 TypeScript 백엔드용 npm 클라이언트와 참고할 수 있는 오픈 소스 [데모 스토어](https://github.com/nerdcash/zcash-payment-demo-store)가 있습니다. Shopify 또는 WooCommerce 플러그인은 없으므로 사이트 코드를 제어할 수 있거나 이를 할 수 있는 개발자가 필요합니다.

고려할 점입니다. 새 프로젝트입니다. 저장소는 2026년 6월에 시작되었고 npm 클라이언트는 버전 0.1이며, 아직 태그된 릴리스와 공개된 보안 감사가 없습니다. API에는 자체 로그인 기능이 없으므로 비공개 네트워크에 두고 인터넷에 절대 노출하지 마세요. 또한 모든 실드된 결제와 마찬가지로 환불하려면 구매자가 주소를 제공해야 합니다.

**최종 확인일:** 2026-11-01

---

## [ZGo](https://zgo.cash/) <img src="/content-images/zgo-prp2-497679039b.webp" alt="ZGo 로고" class="processor-logo" />
- **지원 유형**: 실드된 방식(Sapling 및 Orchard)
- **설명**: ZGo는 제3자 없이 고객에게서 귀하에게 직접 결제되는 전자 결제 플랫폼입니다.
- **URL**: [ZGo](https://zgo.cash/)
<img src="/content-images/zgo-prp2-497679039b.webp" alt="ZGo 로고" width="200" hidden />

브라우저에서 실행하는 계산대이므로 노트북, 태블릿 또는 휴대폰을 결제 단말기로 만들 수 있습니다. WooCommerce 플러그인과 REST API도 있습니다. Vergara Technologies가 구축했으며 Zcash Community Grants의 지원을 받았습니다. 여기에는 zcashd에서 Zebra로의 이전도 포함됩니다.

자금은 중간자 없이 고객에게서 귀하의 지갑으로 직접 이동합니다.

통합 주소를 통해 Sapling 및 Orchard를 포괄하는 실드된 방식이며 ZIP 321을 따릅니다. 현재 출처 중 투명 주소를 처리한다고 말하는 것은 없으므로 이 페이지도 더는 그렇게 주장하지 않습니다.

실질적으로 자체 호스팅할 수 없습니다. ZGo가 귀하를 위해 Zcash 인프라를 운영하며 배포 가이드도 공개하지 않습니다. 소스는 유지 관리자의 자체 Git 서버에 공개되어 있지만, 사람들이 흔히 찾는 GitLab 사본은 오래된 2022년 미러입니다.

무료도 아닙니다. ZGo는 선불 세션을 판매하며 WooCommerce에는 Pro 세션이 필요하지만, 가격 페이지에 현재 접속할 수 없어 여기에는 금액을 제시하지 않습니다.

**최종 확인일:** 2026-07-29

---

## [Flexa](https://flexa.co/) <img src="/content-images/flexa-mark.png" alt="Flexa 로고" class="processor-logo" />
- **지원 유형**: 고객은 실드된 자산으로 지불, 수신 측은 문서화되지 않음
- **설명**: Flexa는 고객이 자체 보관 지갑에서 소매점의 Zcash를 포함한 디지털 자산을 사용할 수 있도록 하는 결제 네트워크입니다.
- **URL**: [Flexa](https://flexa.co/)
<img src="/content-images/flexa-mark.png" alt="Flexa 로고" width="200" hidden />

Flexa는 체크아웃 게이트웨이가 아니므로 여기의 다른 서비스와 대체 관계가 아닙니다. 고객은 Flexa 지원 지갑(예: Zodl)을 열고 일회용 코드를 보여주면 매장이 이를 스캔합니다. ZEC 청구서나 전자상거래 플러그인은 없습니다.

고객은 결제하는 순간까지 자신의 코인을 보관합니다. 판매자인 귀하는 ZEC를 받지 않습니다. Flexa가 선택한 통화로 귀하와 정산하므로 암호화폐 측은 이들이 처리합니다.

Flexa 자체 발표에서는 Zcash 통합을 실드된 ZEC로 결제하는 것으로 설명합니다. Flexa가 어떤 주소 유형으로 수신하는지는 어디에도 공개되어 있지 않습니다.

수수료는 결제당 1%이며 환전과 수탁은 추가 비용 없이 포함됩니다.

미국과 2026년 7월부터 37개 SEPA 국가 및 영토에서 작동합니다. 특히 ZEC를 유럽에서 사용할 수 있는지는 명시되지 않았습니다.

**최종 확인일:** 2026-07-29

---

## [NOWPayments](https://nowpayments.io/supported-coins/zcash-payments) <img src="/content-images/nowpayments-wordmark.png" alt="NOWPayments 로고" class="processor-logo processor-logo-wide" />
- **지원 유형**: 투명 주소만 지원
- **설명**: NOWPayments는 판매자가 Zcash 결제 및 기부를 쉽게 받을 수 있게 하는 암호화폐 결제 게이트웨이입니다.
- **URL**: [NOWPayments](https://nowpayments.io/supported-coins/zcash-payments)
<img src="/content-images/nowpayments-wordmark.png" alt="NOWPayments 로고" width="200" hidden />

실드된 방식은 지원하지 않습니다. 문서에서는 Zcash에 투명 주소를 설정하라고 안내하며, ZEC는 그들이 이런 방식으로 특별히 언급하는 유일한 코인입니다. 받는 모든 결제는 블록체인에 공개됩니다.

기본적으로 비수탁형입니다. FAQ에 따르면 자금을 저장하거나 개인 키를 보유하지 않습니다. 선택적 수탁 잔액이 있으므로 확실히 해야 한다면 계정 설정을 확인하세요.

일반 결제 수수료는 0.5%이며, 다중 통화, 고정 환율 또는 "사용자 수수료 부담" 결제는 1%이고 네트워크 수수료가 추가됩니다.

법률상 금지된 곳을 제외한 전 세계에서 사용할 수 있습니다. 암호화폐 수락을 시작하는 데 KYC는 필요 없으며, 법정화폐 출금에만 필요합니다.

**최종 확인일:** 2026-07-29

---

## [Plisio](https://plisio.net/) <img src="/content-images/plisio-wordmark.png" alt="Plisio 로고" class="processor-logo processor-logo-wide" />

> **결제 중단 — 2026년 11월 12일 확인.** Plisio의 [홈페이지](https://plisio.net/)에는 복구 작업이 진행되는 동안 입출금 결제가 일시 중단되었다고 나와 있습니다. 자금을 보내기 전에 제공업체에 확인하세요. Zcash 전용 페이지는 현재 404를 반환합니다. 이는 ZEC의 상장 폐지를 입증하지는 않습니다. 아래 수수료, 수탁 및 주소 지원 세부 정보는 2026년 7월 29일에 마지막으로 검토되었으며 다시 확인되지 않았습니다.

- **지원 유형**: 투명 주소(문서화되지 않음)
- **설명**: Plisio는 Zcash 지원을 나열한 암호화폐 결제 게이트웨이입니다. 결제 처리는 현재 중단되었으므로 위의 날짜가 표시된 안내를 참조하세요.
- **URL**: [Plisio](https://plisio.net/)
<img src="/content-images/plisio-wordmark.png" alt="Plisio 로고" width="200" hidden />

수탁형으로 간주하세요. Plisio의 마케팅은 비수탁형이라고 하지만, 자체 도움말 페이지는 플랫폼에 보관되는 잔액, 콜드 스토리지 및 출금 절차를 설명합니다. 비수탁형이라는 주장은 확인할 수 없었습니다.

Plisio는 어떤 Zcash 주소 유형을 사용하는지 말하지 않으므로, 누군가 달리 확인할 때까지 투명 주소라고 가정하세요.

지갑은 무료이고, 게이트웨이와 API는 0.5%, White Label은 1.5%입니다. White Label은 자체 호스팅이 아니라 호스팅 서비스의 리브랜딩입니다.

결제를 받는 데 KYC는 필요하지 않으며, 제한 국가 목록도 공개되어 있지 않습니다.

**최종 확인일:** 2026-07-29

---

## [Binance Pay](https://pay.binance.com/en) <img src="/content-images/binancepay-mark.png" alt="Binance Pay 로고" class="processor-logo" />
- **지원 유형**: 투명 주소만 지원, 실드된 입금 거부
- **설명**: Binance Pay는 Zcash 결제를 지원하는 암호화폐 결제 플랫폼입니다.
- **URL**: [Binance Pay](https://pay.binance.com/en)
<img src="/content-images/binancepay-mark.png" alt="Binance Pay 로고" width="200" hidden />

Binance는 실드된 주소에서 보낸 ZEC를 거부합니다. 이 거부가 TEX 주소가 만들어진 이유입니다.

완전한 수탁형입니다. 결제는 Binance Pay 지갑 간에 오프체인으로 이동하며, 확인된 Binance 계정이 필요합니다.

지갑 간 전송은 무료이고 판매자 지급 수수료는 0.8%(최대 5 USD)이며 Mini Program 판매자는 1%를 냅니다.

의존하기 전에 거주 지역에서의 이용 가능 여부를 확인하세요. 일부 국가와 산업에서는 Binance Pay를 제공하지 않으며, ZEC는 2023년부터 프랑스, 스페인, 이탈리아 및 폴란드 사용자를 대상으로 상장 폐지되었고, EEA 서비스는 MiCA에 따라 중단되었습니다.

**최종 확인일:** 2026-07-29

---

### 더는 ZEC를 받지 않음

이 둘은 이전에 여기에 나열되어 있었습니다. 각 제공업체의 자체 실시간 통화 목록을 2026년 7월 29일에 확인했으며, Zcash는 둘 다에서 사라졌습니다.

**CoinPayments**는 v2 코인 목록, 레거시 목록 또는 실시간 통화 API에 ZEC를 나열하지 않으며, Zcash 문서는 이제 홈페이지로 리디렉션됩니다.

**CoinGate**는 지원 통화 페이지나 공개 API에 ZEC를 나열하지 않습니다. 상장 폐지가 발표되지 않았으므로 이유와 날짜는 알 수 없습니다.

둘 중 하나가 Zcash를 다시 지원한다면 새 확인 날짜와 함께 다시 추가하세요.

### 이 페이지를 정확하게 유지하기

프라이버시 코인 지원은 자주 바뀌므로 이 페이지는 마지막 확인만큼만 정확합니다. 검토할 때는 다음을 확인하세요.

1. 제공업체 자체 통화 목록 또는 API를 확인하세요. 위에서 제거된 두 처리업체의 제3자 목록은 최신 정보가 아니었습니다.
2. 어떤 Zcash 주소 유형이 지원되는지 확인하세요. "Zcash 지원"은 대개 투명 주소만을 의미합니다.
3. 표와 해당 제공업체 섹션의 확인 날짜를 업데이트하세요.
