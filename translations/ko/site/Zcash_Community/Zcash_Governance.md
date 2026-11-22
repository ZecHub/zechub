# Zcash 자금 조달 및 거버넌스 개요

Zcash의 온체인 자금 조달 모델, 블록 보상 메커니즘, 주요 조직의 역할

## 1. Zcash 블록 보상 작동 방식

Zcash은 작업 증명(Proof-of-Work) 암호화폐입니다. 채굴된 각 블록은 네트워크 업그레이드로 정해지는 고정된 프로토콜 규칙에 따라 **블록 보조금**(새로 생성된 ZEC)과 거래 수수료를 분배합니다.

- **현재 모델(NU6.1 / 2025년 11월 24일부터)**  
  분배 비율은 다음과 같습니다.

| 수령자                         | 비율       | 자금 용도 / 현황                                            |
|--------------------------------|------------|-------------------------------------------------------------|
| 채굴자                         | 80%        | 채굴자에게 직접 지급되는 블록 보상                          |
| Zcash Community Grants (ZCG)   | 8%         | 커뮤니티 개발 지원금(2028년경까지 지속)                     |
| 코인 보유자 관리 기금          | 12%        | 이전 락박스에서 초기 자금을 충당하며, 코인 보유자가 개발 지원금에 투표([ZIP 1016](https://zips.z.cash/zip-1016)) |

- **NU6 이전의 과거 개발 기금(2020년~2024년 11월)**  
  각 블록 보조금의 20%가 개발 조직에 직접 지급되었습니다.

  - 7% -> Electric Coin Company (ECC) / Bootstrap 프로젝트  
  - 5% -> Zcash Foundation (ZF)  
  - 8% -> Zcash Community Grants (ZCG)

이 20%의 “개발 기금”은 [ZIP 1015](https://zips.z.cash/zip-1015)(NU6, 2024년 11월)을 통해 8% ZCG + 12% 락박스 모델로 대체되었습니다. 2024년 11월부터 2025년 11월까지 12%는 지출 방법 없이 이연 개발 기금 락박스에 누적되었습니다.

### 현재 모델: ZIP 1016 - 커뮤니티 및 코인 보유자 자금 조달 모델
ZIP 1016(2025년 2월 제정)은 [NU6.1](/zcash-tech/nu6-1)에 따라 2025년 11월 24일 블록 3,146,400에서 메인넷에 활성화되었습니다([ZIP 255](https://zips.z.cash/zip-0255)). 이 제안은 다음과 같습니다.
- ZCG에 8%를 계속 배정합니다.
- 12% 락박스를 “코인 보유자 관리 기금”으로 전환했습니다(기존 락박스 자금과 계속 배정되는 블록 보조금 12%로 초기 자금을 충당).
- 세 번째 반감기까지 운영됩니다(ZIP에 따라 NU7이 블록 생성 시점을 변경하면 해당 날짜도 달라질 수 있습니다).
- ZEC 코인 보유자가 개발 지원금에 투표할 수 있도록 합니다(단순 과반수, 최소 420,000 ZEC의 투표 필요).
- 주요 보유자 조직(Key-Holder Organizations, 현재 ZF와 Shielded Labs 포함, 개발 지원금 관련 맥락에서는 Bootstrap/ECC도 언급됨)이 법적 합의와 코인 보유자의 결정에 따라 멀티시그를 통해 자금 지급을 관리하도록 합니다.
- 락박스 사용에 관한 ZIP 1015의 모든 요건을 유지합니다(생태계 개발 지원금 조달).

이 모델은 12% 배정분에 대한 관리를 조직 중심에서 코인 보유자 직접 거버넌스로 전환합니다. ZIP 절차나 상표 규칙은 변경하지 않습니다.

## 2. 주요 조직과 자금 출처

**Electric Coin Company (ECC) / Bootstrap 프로젝트**  
- Zcash의 최초 창립자입니다(2016년).  
- 2024년 11월까지 과거 개발 기금의 약 7%를 받았습니다.  
- 2026년 1월, 핵심 엔지니어링 및 제품 팀은 거버넌스 분쟁으로 Bootstrap/ECC을 떠나 Zcash 오픈 개발 랩(ZODL)을 설립했습니다.  
- ECC/Bootstrap은 더 이상 프로토콜 자금을 직접 받지 않으며, 핵심 개발 팀을 고용하고 있지도 않습니다. 기부금, 후원금, 자체 공동 기금에 의존합니다.  
- 역사적으로 중요한 조직이지만, 더 이상 프로토콜 개발을 주도하는 조직은 아닙니다.  
-> 전체 소개: [Electric Coin Company](https://zechub.wiki/zcash-organizations/electric-coin-company)

**Zcash 오픈 개발 랩(ZODL)**  
- 기존 Zcash 프로토콜 개발자들(핵심 ECC 엔지니어링 및 제품 팀)이 Bootstrap/ECC을 떠난 뒤 2026년 1월에 설립했습니다.  
- a16z Crypto와 Coinbase Ventures을 포함한 주요 투자자들로부터 2,500만 달러 이상의 초기 투자를 유치했습니다.  
- Zcash 프로토콜의 최초 발명가와 개발자로 구성된 팀은 핵심 프로토콜 개발, ZIP 기여, Zashi에서 리브랜딩한 Zodl 모바일 지갑을 비롯한 프라이버시 중심 도구 개발을 계속합니다.  
- 온체인 프로토콜 자금을 직접 받지 않으며, Zcash 프라이버시 인프라 발전에 주력하는 벤처 캐피털 지원 독립 연구소로 운영됩니다.  
-> 전체 소개: [ZODL](https://zechub.wiki/zcash-organizations/ZODL)  
-> 공식 사이트: [zodl.com](https://zodl.com/)
  
**Zcash Foundation (ZF)**  
- 인프라, 노드 소프트웨어, 연구, 생태계 건전성에 주력하는 독립적인 501(c)(3) 비영리 단체입니다.  
- 과거 개발 기금의 5%를 받았습니다.  
- NU6 이후에는 더 이상 프로토콜 자금을 직접 받지 않습니다. 기부금과 개발 지원금에 의존합니다.  
- ECC이 2019년에 기증한 Zcash 상표를 보유하고 있으며, 거버넌스에서 중심적인 역할을 합니다.  
- Zcash 커뮤니티 자문 패널(ZCAP)을 운영하고 커뮤니티 여론 조사를 지원합니다.  
- ZIP 1016에 따라 주요 보유자 조직 역할을 합니다.  
-> 전체 소개: [Zcash Foundation](https://zechub.wiki/zcash-organizations/zcash-foundation)  
-> 공식 사이트: [zfnd.org](https://zfnd.org/)

**Zcash Community Grants (ZCG)**  
- Zcash Community Grants 프로그램은 독립적인 팀과 프로젝트에 자금을 지원하여 Zcash 생태계의 공익을 위한 주요 지속 개발 및 기타 업무를 수행하도록 합니다.  
- 개발 지원금은 커뮤니티에서 선출한 위원회가 결정합니다.  
- NU6 이후에도 블록 보상의 8% 전액을 계속 받으며, Financial Privacy Foundation을 통해 관리됩니다.  
- 커뮤니티에 개방된 투명한 신청 및 투표 절차를 통해 개발 지원금을 지급합니다.  
-> 전체 소개: [Zcash Community Grants](https://zechub.wiki/zcash-organizations/zcash-community-grants)  
-> 공식 사이트: [zcashcommunitygrants.org/](https://zcashcommunitygrants.org/)

**Financial Privacy Foundation(FPF)**  
- 케이맨 제도에 설립된 비영리 단체입니다.  
- 프로토콜에서 블록 보조금 배정분 8%를 직접 받아(ZIP 1015에 따름) Zcash Community Grants 프로그램의 법률, 재정 및 운영 업무를 모두 처리합니다.  
- ZCG 운영을 위한 우산 조직과 행정 지원을 제공하며, 여기에는 자금 지급, 계약, 규정 준수가 포함됩니다.  
- ZCG은 FPF 산하에서 자율적인 커뮤니티 선출 기관으로 운영됩니다.  
-> 전체 소개: [Financial Privacy Foundation](https://zechub.wiki/zcash-organizations/financial-privacy-foundation)  
-> 공식 사이트: [financialprivacyfoundation.org/](https://www.financialprivacyfoundation.org/)

**Shielded Labs**  
- 스위스에 기반을 둔 독립적인 기부금 지원 Zcash 지원 조직입니다.  
- Zcash 생태계에서 개발 기금이나 블록 보상으로부터 직간접적인 자금을 받은 적이 없는 최초의 조직입니다.  
- ZEC 보유자에게 도움이 되는 사업에 주력하며, Zcash의 방향을 정하는 과정에서 보유자의 목소리를 우선시합니다.  
- ZIP 1016에 따라 코인 보유자 관리 기금의 운영을 맡는 주요 보유자 조직 역할을 합니다.  
- 프로토콜 개발, ZIP 절차, 거버넌스에 기여합니다(ZIP 편집자 대표 참여).  
-> 전체 소개: [Shielded Labs](https://zechub.wiki/zcash-organizations/shielded-labs)  
-> 공식 사이트: [shieldedlabs.net](https://shieldedlabs.net/)

## 3. 거버넌스 - 의사 결정 방식

Zcash의 거버넌스는 “온체인 프로토콜 규칙”과 “오프체인 사회적 합의”가 결합된 형태입니다.

1. **ZIP 절차(Zcash 개선 제안)**  
   - 누구나 ZIP을 제출할 수 있습니다.  
   - 포럼, Discord, GitHub에서 공개 토론을 진행합니다.  
   - 현재 ZIP 편집자는 Jack Grigg, Daira-Emma Hopwood, Kris Nuttycombe(개인 자격), Arya와 Marek(Zcash Foundation), Mark Henderson과 Sam H. Smith(Shielded Labs), Sean Bowe와 Tal Derei(프로젝트 Tachyon), Dev Ojha(Valar Group)입니다.
   - ZIP 승인이 다음 네트워크 업그레이드에 자동으로 포함되는 것은 아닙니다. 합의 ZIP에는 배포 계획과 구현이 필요하며, 규칙은 지정된 네트워크 업그레이드 높이에서 활성화됩니다.

2. **상표 계약(2019~2024년)**  
   - ECC은 2019년에 Zcash 상표를 ZF에 기증했습니다.  
   - 계약에 따라 새로운 합의 프로토콜을 만드는 네트워크 업그레이드에는 원래 ECC과 ZF 양측의 동의가 필요했습니다.  
   - 2024년 4월 ECC은 계약 종료 의사를 발표했고, 공식 종료 통지는 2024년 8월에 발행되었습니다.  
   - 2025년 기준으로 ZF는 Zcash 상표의 유일한 관리 주체이며, 생태계의 탈중앙화를 반영하는 새로운 허용적 상표 정책을 도입했습니다. 상표는 더 이상 거버넌스 거부권으로 기능하지 않습니다.

3. **Zcash 커뮤니티 자문 패널(ZCAP)**  
   - 생태계 전문가로 구성된 자원봉사 단체입니다.  
   - 주요 결정에 대해 구속력 없는 커뮤니티 여론 조사를 진행합니다.

4. **온체인 비준**  
   - 네트워크 업그레이드는 사전에 정해진 블록 높이에서 활성화됩니다. 호환되는 소프트웨어를 실행하는 노드는 해당 높이부터 새로운 합의 규칙을 적용합니다. 업그레이드하지 않은 노드는 업그레이드 이전의 합의 브랜치를 계속 따를 수 있으며, 이로 인해 체인이 분할될 수 있습니다.

5. **락박스 및 ZIP 1016**  
   - 2024년 11월부터 2025년 11월까지 프로토콜에 락박스 자금의 12%가 누적되었습니다.  
   - NU6.1은 이를 코인 보유자 관리 기금으로 전환했으며, 코인 보유자가 투표하고 주요 보유자 조직(ZF와 현재 명시된 Shielded Labs)이 멀티시그로 관리합니다.

## 4. 빠른 참고 표 - 자금 조달 방식의 변화

| 기간             | 채굴자 | ECC/Bootstrap | ZF   | ZCG  | 락박스 | 참고                                       |
|------------------|--------|---------------|------|------|---------|--------------------------------------------|
| 2020년~2024년 11월 | 80%    | 7%            | 5%   | 8%   | -       | 기존 개발 기금                             |
| 2024년 11월~2025년 11월 | 80% | 0%            | 0%   | 8%   | 12%     | NU6 모델 + ZCG 연장                  |
| 2025년 11월~현재(ZIP 1016) | 80% | 0%   | 0%   | 8%   | 12%(코인 보유자 관리) | NU6.1; 세 번째 반감기까지; 코인 보유자 투표 |

## 5. 관련 자료

- 공식 자금 조달 설명 -> [z.cash/network funding section](https://z.cash/network/?funding=#funding)  
- ZIP 1015(NU6 자금 조달 변경) -> [zips.z.cash/zip-1015](https://zips.z.cash/zip-1015)  
- ZIP 1016(코인 보유자 모델, NU6.1부터 시행) -> [zips.z.cash/zip-1016](https://zips.z.cash/zip-1016)  
- Zcash 개선 제안 -> [zips.z.cash](https://zips.z.cash)  
- Zcash Community Grants 포털 -> [zcashcommunitygrants.org](https://zcashcommunitygrants.org)

## 6. 락박스 대시보드

락박스 및 코인 보유자 기금의 현재 ZEC 금액을 보여 주는 ZecHub 대시보드는 [여기](https://zechub.wiki/dashboard?tab=lockbox)에서 확인할 수 있습니다.
