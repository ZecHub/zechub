# Grayscale Zcash ETF (ZCSH)

**Zcash는 ETF를 출시하지 않았습니다. Grayscale가 출시했습니다.** 2017년부터 운용해 온 펀드를 전환한 것입니다. Zcash는 프로토콜로, 펀드를 발행할 회사나 공동 기금, 이사회가 없습니다. Grayscale는 다른 누구나 그러듯 공개 시장에서 ZEC를 매입하는 독립 자산 운용사입니다.

이 구분은 ZCSH에 관해 가장 자주 오해되는 점이며, 이 페이지는 여기서부터 시작합니다. 2026년 8월 25일, 이 펀드는 NYSE Arca에서 *Zcash ETF*라는 이름으로 거래를 시작했습니다. 미국 최초의 현물 Zcash 상장지수상품이며, 현재는 존재하는 ZEC 보유자 가운데 규모가 큰 축에 속합니다.

![How the Grayscale Zcash ETF works: investors buy ZCSH shares through a brokerage and receive price exposure only, while the trust holds the ZEC at Coinbase Custody in transparent wallets; Authorized Participants create and redeem shares in baskets of 10,000 for cash, and the Sponsor's Fee is paid out of the trust's ZEC, so ZEC per share declines over time](https://raw.githubusercontent.com/ZecHub/zechub/main/assets/ZCSH_ETP_Structure.png)

## 같은 펀드, 3단계의 변화

| 시기 | 달라진 점 |
| --- | --- |
| 2017년 10월 | 사모 발행으로 출시, 적격 투자자만 참여 가능 |
| 2021년 10월 | OTCQX에서 ZCSH 티커로 주식이 호가되기 시작했으며, 순자산가치보다 할인된 가격으로 거래 |
| 2026년 8월 25일 | NYSE Arca에서 환매 가능한 ETP가 되고 이름에서 “”Trust””를 삭제 |

2026년의 변화는 겉치레가 아닙니다. 장외거래소에서 호가되는 신탁에는 환매 절차가 없어, 주식 가격이 기초 자산의 가치에 비해 할증되거나 할인된 상태로 움직일 수 있으며, 그 정도가 심할 때도 있습니다. 실제로 2021년부터 2026년 사이에 바로 그런 일이 벌어졌습니다. 설정과 환매가 정상적으로 이루어지는 상장지수상품에는 주식 가격을 순자산가치에 연동시키는 차익 거래 경로가 있습니다. 한 형태에서 다른 형태로 바뀌면 증권으로서의 작동 방식도 달라집니다.

## 각 주체의 역할

| 역할 | 주체 |
| --- | --- |
| 스폰서 | Grayscale Investments Sponsors, LLC |
| 수탁자 | CSC Delaware Trust Company |
| 관리 기관 및 명의개서 대리인 | The Bank of New York Mellon |
| 프라임 브로커 | Coinbase, Inc. — 신탁을 위해 ZEC를 조달합니다 |
| 지정참가회사 | Jane Street, Virtu — 주식을 설정하고 환매합니다 |
| 마케팅 대리인 | Foreside Fund Services |
| **커스터디 기관** | **Coinbase Custody Trust Company, LLC** — 실제 ZEC가 보관되는 유일한 곳입니다 |

이 주체 가운데 어느 하나도 펀드 자체는 아닙니다. 펀드란 이들 사이의 계약 관계를 말하며, 위 도표는 그 관계를 보여 줍니다. 상장 당시 언론 보도에서는 이 역할 가운데 여러 가지가 누락되거나 잘못 전달되었습니다. 여기의 목록은 EDGAR에 제출된 Grayscale의 Form S-3 등록 신고서를 따릅니다.

## 주식의 설정과 환매 방식

스폰서와 계약을 맺은 등록 브로커-딜러인 지정참가회사만 주식을 설정하거나 환매할 수 있으며, 10,000주 단위로만 가능합니다. 이 단위를 바스켓이라고 합니다. 일반 투자자는 이 절차에 관여하지 않으며, 다른 상장 증권과 마찬가지로 거래소에서 기존 주식을 사고팝니다.

현재 이 절차는 현물 납입이 아니라 **현금** 방식으로 진행됩니다. 지정참가회사는 현금 계좌에 현금을 예치하거나 그 계좌에서 현금을 받으며, 실제로 ZEC를 확보하거나 처분하는 주체는 제3자 유동성 공급자입니다. 등록 신고서에는 현물 납입 절차도 설명되어 있습니다. 이 절차에서는 지정참가회사가 ZEC를 신탁에 직접 예치하거나 신탁으로부터 ZEC를 받습니다. 하지만 신고서는 “”현물 납입에 대한 규제 승인을 받지 못했다””고 분명히 밝히고 있으며, 승인을 받지 못할 수도 있습니다.

따라서 현금 절차에서는 유동성 공급자와 시장 사이에서 ZEC가 오갈 뿐, 투자자와 신탁 사이에서는 오가지 않습니다. 개인 투자자가 거래하는 과정에서 누구도 Zcash 주소를 이용하지 않습니다.

## 수수료는 ZEC로 지급됩니다

상장 당시 스폰서 수수료는 **연 2.5%**입니다. 이 수수료는 순자산가치의 일정 비율로 매일 발생하며, 신고서의 표현을 빌리면 “”매일 후불로 스폰서에게 ZEC로 지급됩니다.””

그 결과는 우연한 현상이 아니라 구조적인 문제입니다. 수수료는 공동 기금의 ZEC에서 차감되므로, 각 지분을 뒷받침하는 ZEC의 양은 매일 조금씩 줄어듭니다. 지분은 무기한 보유되는 고정된 양의 ZEC이 아니라, 서서히 줄어드는 양에 대한 청구권입니다. 장기적인 ZCSH 익스포저를 ZEC을 단순히 보유하는 것과 비교하려는 분은 이 점을 비교에 반영해야 합니다.

참고로 2.5%는 일반적인 현물 비트코인 ETF 수수료의 약 10배입니다. Grayscale는 스폰서 수수료로 얻는 초기 수익을 Zcash 생태계 개발에 다시 투입하겠다고 밝혔습니다.

## 주주가 실제로 소유하는 것

주식은 ZEC 가격에 대한 투자입니다. ZEC 자체는 아닙니다.

주주는 거래정보 보호 거래를 전송할 수 없고, 메모를 첨부할 수 없으며, 통합 주소를 보유하거나 직접 커스터디할 수도 없습니다. Zcash를 다른 자산과 구별하는 특성 가운데 어느 것도 이 상품을 통해 이용할 수 없습니다. 이 상품은 가격에만 노출될 뿐, 그 외에는 아무것도 제공하지 않습니다. 중개 계좌나 은퇴 계좌를 통해 투자하려는 사람에게는 바로 그 점이 목적입니다. Zcash에 관심을 갖는 이유가 프라이버시인 사람에게 ETF는 지갑을 대신할 수 없으며, 두 가지는 실제로 서로 대체 가능한 선택지가 아닙니다.

## ZEC는 공개된 상태로 보관됩니다

이 구조에는 또 하나의 아이러니가 있으며, 이 페이지에서 가장 날카로운 지적이기도 합니다. Coinbase Custody는 신탁의 ZEC를 거래정보 보호 주소가 아닌 **투명 주소**에 보관합니다. 펀드 보유 자산은 체인에서 확인할 수 있고, 커스터디 기관까지 추적할 수 있으며, 관심 있는 누구나 실시간으로 살펴볼 수 있습니다. 이 펀드에서는 거래정보 보호 주소를 전혀 사용하지 않습니다.

이는 실수가 아닙니다. 규제 대상 펀드의 인프라는 감사와 확인을 전제로 구축되며, 거래정보 보호 잔액은 감사인이 독립적으로 검증할 수 없는 대상입니다. Coinbase의 지원 정책에도 같은 비대칭성이 드러납니다. 거래정보 보호 주소에서 전송된 ZEC는 받을 수 있지만, 그 주소로 ZEC를 보내지는 않습니다.

따라서 프라이버시 자산을 가장 많이 보유한 기관은 프라이버시가 없는 형태로 그 자산을 보유합니다. 이 내용은 신고서가 아니라 보도 자료를 근거로 합니다. S-3에는 신탁의 개인 키를 보관한다는 내용은 있지만, 주소 유형에 대한 설명은 없습니다. 이러한 유의 사항을 감안해 이 페이지에 해당 내용을 적었습니다.

## ZEC는 얼마나 관련되어 있나요?

2026년 8월 25일 상장 당시 펀드는 약 **387,000 ZEC**를 보유했으며, 운용 자산은 약 **3억 1,300만 달러**였습니다.

장기적인 관점에서 보면, 신고서에는 2025년 9월 30일 기준 신탁이 유통 중인 ZEC의 약 **2.4%**를 보유했다고 나와 있습니다. 두 수치 모두 변합니다. 첫 번째 수치는 ZEC 가격과 설정 및 환매에 따라 달라지고, 두 번째 수치는 보유 자산에서 수수료가 지급됨에 따라 달라집니다. 따라서 이 페이지의 수치 대신 최신 신고서나 펀드가 매일 공개하는 정보를 확인하시기 바랍니다.

## 출처

별도로 표시한 경우를 제외하고 모두 1720265번 CIK로 EDGAR에 제출된 1차 자료입니다.

- [Grayscale Zcash Trust (ZEC) — EDGAR 신고서 목록](https://www.sec.gov/edgar/browse/?CIK=1720265&owner=exclude)
- [2025년 11월 Form S-3 등록 신고서](https://www.sec.gov/Archives/edgar/data/1720265/000119312525298561/zcsh-20251126.htm) — 각 주체의 역할, 설정 및 환매 방식, 스폰서 수수료, 유통 중인 ZEC의 비율
- [2024년 12월 31일 종료 회계연도 Form 10-K](https://www.sec.gov/Archives/edgar/data/1720265/000095017025035469/zcsh-20241231.htm)
- [NYSE Arca에서 Zcash ETF 거래 시작, 2026년 8월 25일](https://www.globenewswire.com/news-release/2026/8/25/3350404/0/en/the-zcash-etf-ticker-zcsh-built-by-grayscale-begins-trading-on-nyse-arca-expanding-investor-access-to-the-leading-privacy-focused-digital-currency.html)
- [Grayscale Zcash Trust 펀드 페이지](https://www.grayscale.com/funds/grayscale-zcash-trust) — 설정일 및 최신 공개 정보
- [최초의 프라이버시 코인 ETF: Grayscale의 Zcash 신고서 들여다보기](https://crypto.news/the-first-privacy-coin-etf-inside-grayscales-zcash-filing/) — 2차 자료. 신탁의 ZEC가 투명 주소에 보관된다고 밝힌 유일한 자료

수치는 명시된 날짜 기준이며 변동될 수 있습니다. 2026년 9월 30일 확인.
교육 목적이며 투자 조언이 아닙니다.
