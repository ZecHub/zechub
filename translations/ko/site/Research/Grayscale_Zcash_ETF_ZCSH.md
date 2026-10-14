# Grayscale Zcash ETF (ZCSH)

**Zcash는 ETF를 출시하지 않았습니다. Grayscale가 출시했습니다**, 2017년부터 운용해 온 펀드를 전환하는 방식으로 말입니다. Zcash는 프로토콜입니다. 펀드를 발행할 수 있는 회사, 재무부 또는 이사회가 없습니다. Grayscale는 누구나 그렇듯 공개 시장에서 ZEC을 매수하는 독립 자산운용사입니다.

이 구분은 ZCSH에 관해 가장 많이 오해되는 단 하나의 사실이며, 이 페이지는 여기서 시작합니다. 2026년 8월 25일, 이 펀드는 NYSE Arca에서 *The Zcash ETF*라는 이름으로 거래를 시작했습니다. 이는 미국 최초의 현물 Zcash 상장지수상품이며, 현재 존재하는 ZEC의 단일 보유자 중 하나입니다.

![How the Grayscale Zcash ETF works: investors buy ZCSH shares through a brokerage and receive price exposure only, while the trust holds the ZEC at Coinbase Custody in transparent wallets; Authorized Participants create and redeem shares in baskets of 10,000 for cash, and the Sponsor's Fee is paid out of the trust's ZEC, so ZEC per share declines over time](https://raw.githubusercontent.com/ZecHub/zechub/main/assets/ZCSH_ETP_Structure.png)

## 동일한 펀드, 세 단계

| 시점 | 변경 사항 |
| --- | --- |
| 2017년 10월 | 사모 방식으로 출시, 적격 투자자만 대상 |
| 2021년 10월 | OTCQX에서 티커 ZCSH로 지분이 호가되며 NAV 대비 할인 거래 |
| 2026년 8월 25일 | NYSE Arca에서 환매 가능한 ETP가 되고, 이름에서 "Trust"를 삭제 |

2026년의 단계는 단순한 외관상의 변화가 아닙니다. OTC에서 호가되는 신탁에는 환매 메커니즘이 없으므로, 그 지분은 기초자산 가치 대비 프리미엄 또는 할인 상태로 크게 괴리될 수 있습니다. 실제로 2021년부터 2026년 사이에 სწორედ 그런 일이 일어났습니다. 생성과 환매가 정상적으로 작동하는 상장지수상품에는 지분 가격을 순자산가치에 묶어 두는 차익거래 경로가 있습니다. 하나에서 다른 하나로 바꾸면 해당 증권의 작동 방식이 달라집니다.

## 각 주체의 역할

| 역할 | 주체 |
| --- | --- |
| 스폰서 | Grayscale Investments Sponsors, LLC |
| 수탁자 | CSC Delaware Trust Company |
| 관리자 및 명의개서 대행사 | The Bank of New York Mellon |
| 프라임 브로커 | Coinbase, Inc. — 신탁을 위해 ZEC을 조달 |
| 공인 참여자 | Jane Street, Virtu — 지분 생성 및 환매 |
| 마케팅 대행사 | Foreside Fund Services |
| **수탁기관** | **Coinbase Custody Trust Company, LLC** — 실제 ZEC이 존재하는 유일한 곳 |

이들 중 어느 한 주체도 펀드 그 자체는 아닙니다. 펀드는 이들 사이의 약정으로 이루어지며, 위 도표는 바로 그 구조를 보여 줍니다. 상장 당시의 뉴스 보도에서는 이 역할들 중 여럿이 누락되거나 잘못 전달되었습니다. 여기의 목록은 Grayscale에 제출된 EDGAR의 Form S-3 등록신고서를 따릅니다.

## 지분의 생성과 환매 방식

스폰서와 계약을 맺은 등록 브로커딜러인 Authorized Participants만이 지분을 생성하거나 환매할 수 있으며, 이는 Baskets라고 하는 10,000주 단위로만 가능합니다. 일반 투자자는 이 절차에 전혀 관여하지 않습니다. 다른 상장 증권과 마찬가지로 거래소에서 기존 지분을 매수하고 매도할 뿐입니다.

현재 이 메커니즘은 현금 방식이며, 현물 방식이 아닙니다. Authorized Participant는 현금 계좌에 현금을 예치하거나 그 계좌에서 현금을 수령하고, 실제로 ZEC을 취득하거나 처분하는 것은 제3자 유동성 공급자입니다. 등록신고서는 Authorized Participant가 ZEC을 신탁에 직접 예치하거나 신탁으로부터 ZEC을 수령하는 현물 방식도 설명합니다. 하지만 "In-Kind Regulatory Approval has not been obtained"라고 명시하며, 앞으로도 승인되지 않을 수 있다고 밝힙니다.

따라서 현금 방식에서는 ZEC이 투자자와 신탁 사이가 아니라 유동성 공급자와 시장 사이에서 이동합니다. 소매 투자 경로의 누구도 Zcash 주소를 건드리지 않습니다.

## 수수료는 ZEC으로 지급됩니다

상장 시점 기준 스폰서 수수료는 연 **2.5%**입니다. 이는 순자산가치의 비율로 매일 발생하며, 신고서 표현에 따르면 "payable in ZEC to the Sponsor daily in arrears."입니다.

그 결과는 부수적인 것이 아니라 구조적입니다. 수수료는 펀드의 ZEC에서 차감되므로 각 지분을 뒷받침하는 ZEC의 양은 매일 조금씩 감소합니다. 지분은 무기한 보유되는 고정 수량의 ZEC이 아니라, 서서히 줄어드는 수량에 대한 청구권입니다. 장기 ZCSH 익스포저를 단순히 ZEC을 보유하는 경우와 비교하는 사람은 이 점을 비교에 포함해야 합니다.

참고로 2.5%는 일반적인 현물 bitcoin ETF 수수료의 약 10배입니다. Grayscale는 스폰서 수수료에서 나오는 초기 수익을 Zcash 생태계 개발에 다시 투입하겠다고 밝혔습니다.

## 주주가 실제로 소유하는 것

지분은 ZEC 가격에 대한 익스포저입니다. ZEC 그 자체가 아닙니다.

주주는 실드 거래를 전송할 수 없고, 메모를 첨부할 수 없으며, 통합 주소를 보유하거나 자기 수탁할 수도 없습니다. Zcash을 다른 자산과 구분하는 어떤 속성도 이 래퍼를 통해 이용할 수 없습니다. 래퍼가 전달하는 것은 가격뿐이며 그 외에는 아무것도 아닙니다. 증권 계좌나 은퇴 계좌 내에서 익스포저를 얻으려는 투자자에게 이것이야말로 정확히 목적에 부합합니다. 그러나 Zcash에 관심을 갖는 이유가 프라이버시라면 ETF는 지갑의 대체재가 아니며, 둘은 실질적으로 서로의 대안이 아닙니다.

## ZEC은 공개된 형태로 보관됩니다

이 구조에는 또 하나의 아이러니가 있으며, 이 페이지에서 가장 날카로운 지점입니다. Coinbase Custody은 신탁의 ZEC을 실드 주소가 아닌 **투명**
주소에 보관합니다. 펀드의 보유량은 체인에서 확인할 수 있고, 수탁기관까지 추적 가능하며, 관심 있는 누구나 실시간으로 관찰할 수 있습니다. 이 펀드에서는 실드 주소가 전혀 사용되지 않습니다.

이는 실수가 아닙니다. 규제 대상 펀드 인프라는 감사와 증명을 중심으로 구축되며, 실드 잔액은 바로 감사인이 독립적으로 검증할 수 없는 것입니다. Coinbase 자체 지원 정책도 같은 비대칭성을 반영합니다. 실드 주소에서 전송된 ZEC은 수신하지만, ZEC을 실드 주소로 전송하지는 않습니다.

따라서 프라이버시 자산의 최대 기관 보유자는 프라이버시가 전혀 없는 한 가지 형태로 이를 보유합니다. 이 지점은 신고서가 아니라 보도에 근거합니다. S-3는 신탁의 개인키 보관을 설명하지만 주소 유형을 규정하지는 않습니다. 따라서 이 페이지에서는 그 단서를 붙여 설명합니다.

## 관련된 ZEC의 규모

2026년 8월 25일 상장 시점에 펀드는 약 **387,000 ZEC**을 보유했고, 운용자산은 약 **3억 1,300만 달러**였습니다.

더 긴 관점에서 보면, 2025년 9월 30일 기준 신고서는 신탁이 유통 중인 ZEC의 약 **2.4%**를 보유했다고 밝힙니다. 두 수치는 모두 변동합니다. 첫 번째는 ZEC 가격 및 생성과 환매에 따라, 두 번째는 수수료가 보유량에서 지급됨에 따라 변합니다. 따라서 이 페이지가 아니라 가장 최근 신고서나 펀드 자체의 일일 공시에서 현재 수치를 확인해야 합니다.

## 출처

별도 표기가 없는 한 모두 CIK 1720265로 EDGAR에 제출된 1차 자료입니다.

- [Grayscale Zcash Trust (ZEC) — EDGAR 신고서 색인](https://www.sec.gov/edgar/browse/?CIK=1720265&owner=exclude)
- [2025년 11월 Form S-3 등록신고서](https://www.sec.gov/Archives/edgar/data/1720265/000119312525298561/zcsh-20251126.htm) — 법인 역할, 생성 및 환매 메커니즘, 스폰서 수수료 및 유통 중인 ZEC의 비율
- [2024년 12월 31일 종료 회계연도 Form 10-K](https://www.sec.gov/Archives/edgar/data/1720265/000095017025035469/zcsh-20241231.htm)
- [The Zcash ETF가 NYSE Arca에서 거래를 시작, 2026년 8월 25일](https://www.globenewswire.com/news-release/2026/8/25/3350404/0/en/the-zcash-etf-ticker-zcsh-built-by-grayscale-begins-trading-on-nyse-arca-expanding-investor-access-to-the-leading-privacy-focused-digital-currency.html)
- [Grayscale Zcash Trust 펀드 페이지](https://www.grayscale.com/funds/grayscale-zcash-trust) — 설정일 및 현재 공시
- [최초의 프라이버시 코인 ETF: Grayscale의 Zcash 신고서 내부](https://crypto.news/the-first-privacy-coin-etf-inside-grayscales-zcash-filing/) — 2차 출처이며, 신탁의 ZEC이 투명 주소에 보관된다고 명시한 유일하게 발견된 자료

수치는 제시된 날짜 기준이며 변동될 수 있습니다. 2026년 9월 30일 확인.
교육 목적으로만 제공되며, 투자 조언이 아닙니다.
