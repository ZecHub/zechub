---
<a href="https://github.com/zechub/zechub/edit/main/site/Zcash_Tech/NU6.md" target="_blank">
  <img src="https://img.shields.io/badge/Edit-blue" alt="Edit Page"/>
</a>

# NU6

> NU6는 블록 2,726,400(2024년 11월 23일 UTC)에 Zcash 메인넷에서 활성화되었습니다.

이 문서에서 알게 될 내용: Zcash가 반감기 이후에도 자체 개발 자금을 어떻게 계속 마련하는지, 아직 사용 방식을 정하지 않은 준비금을 왜 따로 설정했는지, 그리고 총 ZEC 공급량을 어떻게 정확히 예측 가능하게 만들었는지.

NU6는 [ZIP 253](https://zips.z.cash/zip-0253)에 의해 배포된 Zcash [네트워크 업그레이드](../start-here/network-upgrades)로, 2024년 11월 블록 2,726,400에서 메인넷에 활성화되었습니다. 이것은 통화 및 [개발 자금](../start-here/development-fund) 업그레이드입니다. 2024년 11월 반감기 이후에도 블록 보조금의 일부가 개발 자금으로 계속 가도록 유지했고, 향후 커뮤니티가 결정해 사용할 수 있도록 프로토콜 내부에 준비금을 설정했으며, 새로 발행되는 ZEC를 계산하는 방식을 더 엄밀하게 만들었습니다. NU6는 Electric Coin Company와 Zcash Foundation 모두의 지지를 받았습니다.

이것이 중요한 이유. Zcash의 [개발 기금](../zcash-tech/canopy)은 역사상 두 번째 반감기였던 2024년 11월 반감기 무렵 종료될 예정이었습니다. NU6는 그 자금 지원을 계속 이어가도록 했지만, 모든 코인을 고정된 수령자에게 지급하는 대신 프로토콜 내부에 일부를 유보해 두어 나중에 커뮤니티가 그 사용처를 결정할 수 있게 했습니다. 또한 조용히 존재하던 회계상의 빈틈도 메웠기 때문에, 앞으로 존재하게 될 ZEC 총량을 이제 정확히 예측할 수 있습니다.

## NU6가 바꾼 것

NU6는 [ZIP 1015](https://zips.z.cash/zip-1015)에 정의된 규칙에 따라, 2024년 11월 반감기 이후에도 블록 보조금의 20%를 계속 개발 자금으로 보내도록 했습니다. 이 20%는 두 갈래로 나뉘었습니다.

1. 블록 보조금의 8%는 커뮤니티를 위한, 그리고 커뮤니티에 의한 작업에 자금을 지원하는 Zcash Community Grants (ZCG)로 갑니다.
2. 12%는 향후 커뮤니티 결정에 따라 사용될 새로운 프로토콜 내부 락박스로 들어갑니다.

블록 보조금의 나머지와 거래 수수료는 네트워크를 보호하는 채굴자에게 돌아갑니다. NU6는 또한 이 새로운 구조에 맞게 기존의 펀딩 스트림 및 개발 기금 규칙(ZIP 207 및 ZIP 214)도 업데이트했습니다.

![NU6 개발 기금 분배: 블록 보조금의 20퍼센트가 개발에 사용되며, 이 중 8퍼센트는 Zcash Community Grants로, 12퍼센트는 Deferred Dev Fund Lockbox로 들어갑니다](https://raw.githubusercontent.com/ZecHub/zechub/main/site/Zcash_Tech/assets/nu6-dev-fund-split.png)

## 지연된 락박스

12% 몫은 NU6의 새로운 아이디어입니다. 이 가치는 수령 주소로 지급되는 대신, [ZIP 2001](https://zips.z.cash/zip-2001)에 정의된 Deferred Dev Fund Lockbox라는 프로토콜 내부 풀에 직접 예치됩니다.

1. 락박스는 새로운 펀딩 스트림 유형(DEFERRED_POOL)으로, 블록 보상 가치가 개인이나 조직이 아니라 프로토콜 자체로 들어갑니다.
2. 네트워크는 이를 자체 체인 가치 풀 잔액으로 추적하며, 이는 차폐된 풀의 잔액을 추적하는 방식과 같습니다.
3. NU6는 의도적으로 락박스를 만들었지만, 어려운 질문은 열어 두었습니다. 누가 이 자금을 통제하며, 어떻게 해제되는가?

이 질문은 이후 [NU6.1](../zcash-tech/nu6-1)에서 답을 얻었습니다. NU6.1은 거버넌스를 정해, 블록 보조금의 8% 스트림을 Zcash Community Grants로 계속 보내고, 락박스를 기반으로 조성된 코인 보유자 통제 기금으로 12% 스트림을 보내도록 했습니다.

## 장부 맞추기

NU6는 또한 [ZIP 236](https://zips.z.cash/zip-0236)에 정의된, 새 ZEC 생성 방식의 회계상 빈틈도 메웠습니다. 코인베이스 거래는 각 블록의 새 ZEC와 수수료를 지급하는 특별한 거래입니다.

1. NU6 이전에는 코인베이스 거래가 자신에게 지급되어야 할 금액보다 더 많이 청구하지 않기만 하면 됐습니다. 채굴자는 전체 보조금보다 적게 청구할 수 있었고, 그렇게 되면 그 ZEC는 조용히 소각되었습니다.
2. NU6 이후에는 코인베이스 거래가 정확히 균형을 맞춰야 합니다. 총 출력 가치는 채굴자 보조금과 수수료를 합친 금액과 정확히 같아야 하며, 더 많아도 안 되고 더 적어도 안 됩니다.
3. 이제 채굴자가 더 이상 적게 청구해서 실수로 ZEC를 소각할 수 없기 때문에, 앞으로 존재하게 될 ZEC 총량은 정확히 예측 가능합니다.

![NU6 전후 코인베이스 균형: 이전에는 코인베이스가 적게 청구해 ZEC를 소각할 수 있어 공급량을 정확히 예측할 수 없었습니다. 이후에는 코인베이스가 정확히 균형을 맞춰야 하므로 발행량을 정확히 예측할 수 있습니다](https://raw.githubusercontent.com/ZecHub/zechub/main/site/Zcash_Tech/assets/nu6-coinbase-balance.png)

## 자금 조달 방식의 진화

NU6는 Zcash가 스스로 비용을 조달하는 방식에 대한 더 긴 이야기의 한 장입니다.

1. Canopy(2020)는 기존 창립자 보상을 종료하고 [개발 기금](../start-here/development-fund)을 만들었습니다.
2. NU6(2024년 11월)는 두 번째 반감기 이후 이 자금 구조를 재편하고 Deferred Dev Fund Lockbox를 설정하여, 향후 커뮤니티가 결정할 보조금에 사용할 발행분 일부를 유보했습니다.
3. NU6.1(2025)은 블록 보조금의 8%를 Zcash Community Grants로 계속 보내고, 12%를 락박스를 기반으로 조성된 코인 보유자 통제 기금으로 보내도록 함으로써, NU6가 열어 두었던 “누가 이 유보 자금을 통제하는가”라는 질문에 답했습니다.

![Zcash 자금 조달 방식의 진화: Canopy는 개발 기금을 만들었고, NU6는 락박스를 설정했으며, NU6.1은 누가 이를 통제하는지에 대한 규칙을 정했습니다](https://raw.githubusercontent.com/ZecHub/zechub/main/site/Zcash_Tech/assets/nu6-funding-timeline.png)

## 용어집

| 용어 | 쉬운 의미 |
|---|---|
| Block subsidy | 채굴된 각 블록과 함께 새로 생성되는 ZEC |
| Coinbase transaction | 블록의 보조금과 수수료를 지급하는 특별한 거래 |
| Deferred Dev Fund Lockbox | 향후 커뮤니티 결정에 따라 사용하기 위해 발행분 일부를 보관하는 프로토콜 내부 준비금 |
| Zcash Community Grants (ZCG) | Zcash 커뮤니티를 위한, 그리고 커뮤니티에 의한 작업에 자금을 지원하는 위원회 |
| Consensus branch id | 블록이 어느 업그레이드 규칙을 따르는지 구분하기 위해 노드가 사용하는 식별자 |
| Network upgrade (NU) | 정해진 블록 높이에서 활성화되는, Zcash 합의 규칙의 조정된 변경 |

## FAQ

NU6가 내 ZEC나 내 프라이버시를 바꾸나요? 아니요. NU6는 개발 자금 조달 방식과 발행량 계산 방식에 관한 것이지, 사용자의 거래나 프라이버시에 관한 것이 아닙니다. 사용자의 자금과 차폐 거래는 영향을 받지 않습니다.

자금은 어디서 오나요? 블록이 채굴될 때 발행되는 새 ZEC, 즉 블록 보조금에서 나옵니다. 그중 20%가 전부 채굴자에게 가는 대신 개발로 배정됩니다.

락박스는 무엇을 위한 것인가요? 발행분 일부를 프로토콜 내부에 유보해 두어, 나중에 커뮤니티가 그 사용처를 결정할 수 있게 하기 위한 것입니다. NU6는 이 준비금을 따로 설정했고, NU6.1은 누가 이를 통제하는지에 대한 규칙을 정했습니다.

정확한 균형 규칙이 내 코인에 영향을 주나요? 아니요. 이 규칙은 각 블록의 코인베이스 거래가 자신에게 지급되어야 할 금액을 정확히 지급하도록 요구할 뿐입니다. 기존 잔액이 아니라 새 발행량의 회계 처리에 영향을 줍니다.

기술적으로 NU6는 무엇으로 정의되나요? NU6는 ZIP 253에 의해 배포되며, ZIP 253은 메인넷 활성화 시점을 블록 2,726,400으로 정하고 해당 consensus branch id를 설정합니다. 실제 합의 변경 사항은 ZIP 236, ZIP 1015, ZIP 2001에서 오며, ZIP 207과 ZIP 214는 이에 맞게 업데이트되었습니다.

NU6는 NU6.1과 어떻게 다른가요? NU6는 자금 구조를 재편하고 락박스를 만들었습니다. NU6.1은 락박스 자금을 누가 통제하는지와 유보된 몫을 어떻게 나눌지를 결정했습니다.

## 이해도 점검

NU6는 Deferred Dev Fund Lockbox를 설정했지만 누가 이를 통제하는지는 말하지 않았습니다. 왜 어떤 업그레이드는 준비금을 만들고도 그 거버넌스는 의도적으로 나중으로 미루었을까요?

<details>
<summary>답변</summary>

준비금을 만드는 것은 발행분 일부가 고정된 수령자에게 지급되는 대신 프로토콜 내부에 유보되도록 확정하는 일이었습니다. 누가 이 자금을 통제하고 어떻게 해제할지를 결정하는 것은 더 어려운 거버넌스 문제입니다. NU6는 이를 의도적으로 열어 두었고, NU6.1이 답했습니다. 블록 보조금의 8%는 계속 Zcash Community Grants로 가고, 12%는 락박스를 기반으로 조성된 코인 보유자 통제 기금으로 갑니다.
</details>

### 자료

[ZIP 253: NU6 네트워크 업그레이드 배포](https://zips.z.cash/zip-0253)

[ZIP 236: 블록은 정확히 균형을 맞춰야 함](https://zips.z.cash/zip-0236)

[ZIP 1015: 비직접 개발 자금 조달을 위한 블록 보조금 배분](https://zips.z.cash/zip-1015)

[ZIP 2001: Lockbox 펀딩 스트림](https://zips.z.cash/zip-2001)

[네트워크 업그레이드 6 (NU6)](https://z.cash/upgrade/nu6/)

### 함께 보기

[Zcash 네트워크 업그레이드](../start-here/network-upgrades)

[개발 기금](../start-here/development-fund)

[Zcash 통화 정책](../start-here/zcash-monetary-policy)

[NU6.1](../zcash-tech/nu6-1)

[NU6.2](../zcash-tech/nu6-2)

[ZEC와 Zcash란 무엇인가](../start-here/what-is-zec-and-zcash)

---

시리즈: [네트워크 업그레이드 색인](../start-here/network-upgrades) · 이전: [NU5](../zcash-tech/nu5) · 다음: [NU6.1](../zcash-tech/nu6-1)
