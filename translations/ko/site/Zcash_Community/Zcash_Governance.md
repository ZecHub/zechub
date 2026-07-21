# Zcash 자금 조달 및 거버넌스 개요

Zcash의 온체인 자금 조달 모델, 블록 보상 메커니즘, 그리고 주요 조직들의 역할

## 1. Zcash 블록 보상은 어떻게 작동하는가

Zcash는 작업증명(Proof-of-Work) 암호화폐입니다. 채굴되는 모든 블록은 네트워크 업그레이드로 정해진 고정된 프로토콜 규칙에 따라 **블록 보조금**(새로 생성된 ZEC)과 거래 수수료를 분배합니다.

- **현재 모델 (NU6 이후 / 2024년 11월 이후)**  
  2026년 4월 기준 분배는 다음과 같습니다:

| 수령 주체 | 비율 | 자금 용도 / 상태 |
|--------------------------------|------------|-------------------------------------------------------------|
| 채굴자 | 80% | 채굴자에게 직접 지급되는 블록 보상 |
| Zcash Community Grants (ZCG) | 8% | 커뮤니티 보조금 (~2028년까지 계속) |
| Lockbox (프로토콜 제어) | 12% | 자금이 축적 중이며 아직 지출 메커니즘은 없음; 향후 커뮤니티 투표 필요 |

- **NU6 이전의 과거 개발 기금 (2020년-2024년 11월)**  
  모든 블록 보조금의 20%가 개발 조직에 직접 지급되었습니다:

  - 7% -> Electric Coin Company (ECC) / Bootstrap Project  
  - 5% -> Zcash Foundation (ZF)  
  - 8% -> Zcash Community Grants (ZCG)

이 20% “개발 기금(dev fund)”은 [ZIP 1015](https://zips.z.cash/zip-1015)를 통해 8% ZCG + 12% lockbox 모델로 대체되었습니다.

### 제안된 발전 방향: ZIP 1016 - 커뮤니티 및 코인 보유자 자금 조달 모델
ZIP 1016(2025년 2월 제안, 상태: Proposed)은 더 탈중앙화된 자금 조달 모델을 도입합니다. 이 제안은 다음을 포함합니다:
- ZCG에 대한 8% 배정을 계속 유지합니다.
- 12% lockbox를 “Coinholder-Controlled Fund”로 전환합니다(기존 lockbox 자금 + 지속적인 12% 블록 보조금으로 조성).
- 이 모델을 세 번째 반감기까지(약 3년) 활성화합니다.
- 커뮤니티가 정의한 절차에 따라 ZEC 코인 보유자가 분기마다 보조금에 투표할 수 있도록 권한을 부여합니다(단순 과반수, 최소 정족수 420,000 ZEC).
- Key-Holder Organizations(현재 ZF와 Shielded Labs 포함, 보조금 맥락에서는 Bootstrap/ECC도 언급됨)가 법적 계약과 코인 보유자 결정에 구속되는 멀티시그를 통해 자금 집행을 관리하도록 요구합니다.
- lockbox 사용에 관한 ZIP 1015의 모든 요구사항(생태계 보조금 지원)을 유지합니다.

이 제안은 12% 배정분의 통제를 조직 중심에서 직접적인 코인 보유자 거버넌스로 전환하는 것을 목표로 합니다. 이는 ZIP 절차나 상표 규칙은 변경하지 않습니다.

## 2. 핵심 조직과 그 자금 출처

**Electric Coin Company (ECC) / Bootstrap Project**  
- Zcash의 원래 창립자들입니다(2016년).  
- 역사적으로 2024년 11월까지 개발 기금의 약 7%를 받았습니다.  
- 2026년 1월, 핵심 엔지니어링 및 제품 팀은 거버넌스 분쟁으로 인해 Bootstrap/ECC를 떠나 Zcash Open Development Lab (ZODL)을 설립했습니다.  
- ECC/Bootstrap은 더 이상 프로토콜에서 직접 자금을 받지 않으며, 주요 개발 팀도 더 이상 고용하고 있지 않습니다. 현재는 기부, 스폰서십, 자체 재무 자산에 의존합니다.  
- 역사적으로는 중요하지만, 더 이상 활발한 프로토콜 개발 조직은 아닙니다.  
-> 전체 프로필 보기: [Electric Coin Company](https://zechub.wiki/zcash-organizations/electric-coin-company)

**Zcash Open Development Lab (ZODL)**  
- 원래 Zcash 프로토콜 개발자들(핵심 ECC 엔지니어링 및 제품 팀)이 Bootstrap/ECC를 떠난 후 2026년 1월에 설립했습니다.  
- a16z Crypto와 Coinbase Ventures를 포함한 주요 투자자들로부터 2,500만 달러 이상의 시드 자금을 조달했습니다.  
- Zcash 프로토콜의 원래 발명자와 개발자들로 구성된 이 팀은 핵심 프로토콜 개발, ZIP 기여, 그리고 Zodl 모바일 월렛(Zashi에서 리브랜딩됨)을 포함한 프라이버시 중심 도구 개발을 계속하고 있습니다.  
- 직접적인 온체인 프로토콜 자금 지원은 없으며, Zcash 프라이버시 인프라 발전에 집중하는 벤처캐피털 지원 독립 연구소로 운영됩니다.  
-> 전체 프로필 보기: [ZODL](https://zechub.wiki/zcash-organizations/ZODL)  
-> 공식 사이트: [zodl.com](https://zodl.com/)
  
**Zcash Foundation (ZF)**  
- 인프라, 노드 소프트웨어, 연구, 생태계 건전성에 집중하는 독립적인 501(c)(3) 비영리 단체입니다.  
- 역사적으로 개발 기금의 5%를 받았습니다.  
- NU6 이후 더 이상 직접적인 프로토콜 자금을 받지 않습니다. 기부와 보조금에 의존합니다.  
- Zcash 상표를 보유하고 있으며(ECC가 2019년에 기부), 거버넌스에서 중심적인 역할을 합니다.  
- Zcash Community Advisory Panel (ZCAP)을 운영하며 커뮤니티 여론조사를 촉진하는 데 도움을 줍니다.  
- 제안된 ZIP 1016 하에서 Key-Holder Organization으로 활동합니다.  
-> 전체 프로필 보기: [Zcash Foundation](https://zechub.wiki/zcash-organizations/zcash-foundation)  
-> 공식 사이트: [zfnd.org](https://zfnd.org/)

**Zcash Community Grants (ZCG)**  
- Zcash Community Grants 프로그램은 Zcash 생태계의 공공 이익을 위해 주요한 지속 개발 및 기타 작업을 수행하는 독립 팀과 프로젝트에 자금을 지원합니다.  
- 보조금은 커뮤니티가 선출한 위원회가 결정합니다.  
- NU6 이후에도 블록 보상의 전체 8%를 계속 받고 있으며, Financial Privacy Foundation을 통해 관리됩니다.  
- 보조금은 커뮤니티에 공개된 투명한 신청 및 투표 절차를 통해 수여됩니다.  
-> 전체 프로필 보기: [Zcash Community Grants](https://zechub.wiki/zcash-organizations/zcash-community-grants)  
-> 공식 사이트: [zcashcommunitygrants.org/](https://zcashcommunitygrants.org/)

**Financial Privacy Foundation (FPF)**  
- 케이맨 제도에 설립된 비영리 단체입니다.  
- 프로토콜로부터 직접 8% 블록 보조금 배정을 받으며(ZIP 1015에 따라), Zcash Community Grants 프로그램의 모든 법률, 재무, 운영 관리를 담당합니다.  
- 자금 집행, 계약, 규정 준수를 포함해 ZCG 운영을 위한 우산 구조와 행정 지원을 제공합니다.  
- ZCG는 FPF의 우산 아래에서 자율적인 커뮤니티 선출 조직으로 운영됩니다.  
-> 전체 프로필 보기: [Financial Privacy Foundation](https://zechub.wiki/zcash-organizations/financial-privacy-foundation)  
-> 공식 사이트: [financialprivacyfoundation.org/](https://www.financialprivacyfoundation.org/)

**Shielded Labs**  
- 스위스에 기반을 둔 독립적이며 기부금으로 운영되는 Zcash 지원 조직입니다.  
- Zcash 생태계에서 Development Fund나 블록 보상으로부터 직접 또는 간접 자금을 받은 적이 한 번도 없는 최초의 조직입니다.  
- ZEC 보유자에게 이익이 되는 이니셔티브에 집중하며, Zcash의 방향을 형성하는 데 있어 보유자들의 목소리를 우선시합니다.  
- 제안된 ZIP 1016 하에서 Coinholder-Controlled Fund 운영을 위한 Key-Holder Organization으로 활동합니다.  
- 프로토콜 개발, ZIP 절차, 거버넌스(ZIP 편집자 대표 포함)에 기여합니다.  
-> 전체 프로필 보기: [Shielded Labs](https://zechub.wiki/zcash-organizations/shielded-labs)  
-> 공식 사이트: [shieldedlabs.net](https://shieldedlabs.net/)

## 3. 거버넌스 - 의사결정은 어떻게 이루어지는가

Zcash 거버넌스는 “온체인 프로토콜 규칙”과 “오프체인 사회적 합의”가 혼합된 형태입니다:

1. **ZIP 절차 (Zcash Improvement Proposals)**  
   - 누구나 ZIP을 제출할 수 있습니다.  
   - 포럼, Discord, GitHub에서 공개 토론이 이루어집니다.  
   - ZIP Editors(현재는 개인 자격의 Jack Grigg, Daira-Emma Hopwood, Kris Nuttycombe, ZF의 Arya, 그리고 Shielded Labs 대표들)가 검토하고 채택 여부를 결정합니다.  
   - 채택된 ZIP은 다음 네트워크 업그레이드에 포함됩니다.

2. **상표 계약 (2019-2024)**  
   - ECC는 2019년에 Zcash 상표를 ZF에 기부했습니다.  
   - 이 계약은 원래 새로운 합의 프로토콜을 만드는 모든 네트워크 업그레이드에 대해 ECC와 ZF 양측의 상호 동의를 요구했습니다.  
   - 2024년 4월 ECC는 종료 의사를 발표했고, 2024년 8월 공식 종료 통지가 발행되었습니다.  
   - 2025년 기준으로 ZF는 Zcash 상표의 유일한 관리 주체이며, 생태계의 탈중앙화를 반영하는 새로운 허용적 상표 정책을 채택했습니다. 상표는 더 이상 거버넌스 거부권 메커니즘으로 기능하지 않습니다.

3. **Zcash Community Advisory Panel (ZCAP)**  
   - 생태계 전문가들로 구성된 자원봉사 그룹입니다.  
   - 주요 결정에 대한 구속력 없는 커뮤니티 여론조사에 사용됩니다.

4. **온체인 비준**  
   - 네트워크 업그레이드가 배포되면, 네트워크 해시레이트의 과반수가 이를 채택해야 합니다(합의가 이루어지면 하드포크 위험 없음).

5. **미래 방향 - Lockbox와 ZIP 1016**  
   - 12% lockbox 자금은 프로토콜 내에 계속 축적되고 있습니다.  
   - ZIP 1016은 이를 Coinholder-Controlled Fund로 전환하고, 분기별 코인 보유자 투표와 Key-Holder Organizations(현재 ZF와 Shielded Labs가 명시됨)의 멀티시그 관리를 도입할 것을 제안합니다.

## 4. 빠른 참조 표 - 자금 조달의 변화

| 기간 | 채굴자 | ECC/Bootstrap | ZF | ZCG | Lockbox | 비고 |
|------------------|--------|---------------|------|------|---------|--------------------------------------------|
| 2020년 - 2024년 11월 | 80% | 7% | 5% | 8% | - | 전통적인 개발 기금 |
| 2024년 11월 - 현재 | 80% | 0% | 0% | 8% | 12% | NU6 모델 + ZCG 연장 |
| 제안안 (ZIP 1016) | 80% | 0% | 0% | 8% | 12% (Coinholder-Controlled) | 3번째 반감기까지; 코인 보유자 투표 |

## 5. 관련 자료

- 공식 자금 조달 설명 -> [z.cash/network funding section](https://z.cash/network/?funding=#funding)  
- ZIP 1015 (NU6 자금 조달 변경) -> [zips.z.cash/zip-1015](https://zips.z.cash/zip-1015)  
- ZIP 1016 (제안된 코인 보유자 모델) -> [zips.z.cash/zip-1016](https://zips.z.cash/zip-1016)  
- Zcash Improvement Proposals -> [zips.z.cash](https://zips.z.cash)  
- Zcash Community Grants 포털 -> [grants.zcashcommunity.com](https://grants.zcashcommunity.com) (또는 현재 FPF 사이트)

## 6. Lockbox 대시보드

ZecHub 대시보드에서 현재 Lockbox와 Coinholders fund에 있는 ZEC 수량을 [여기](https://zechub.wiki/dashboard?tab=lockbox)에서 확인할 수 있습니다.
