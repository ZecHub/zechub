<a href="https://github.com/zechub/zechub/edit/main/site/Using_Zcash/Transparent_Exchange_Addresses.md" target="_blank">
  <img src="https://img.shields.io/badge/Edit-blue" alt="페이지 편집"/>
</a>

# Zcash TEX 주소란 무엇인가요?

## 요약

* TEX 주소는 다른 형식으로 표기된 투명 Zcash 주소입니다. `tex1`로 시작하며 [ZIP 320](https://zips.z.cash/zip-0320)에 정의되어 있습니다.
* 이는 지갑에 한 가지를 알려 줍니다. 이 주소에는 투명 자금으로만 결제하라는 것입니다.
* 잔액이 실드되어 있다면 호환 지갑이 두 단계를 대신 처리합니다. 금액을 임시 투명 주소로 옮긴 뒤 TEX 주소로 전송합니다.
* 2023년에 Binance은 Zcash 커뮤니티에 실드 입금을 거부하고 되돌려 보낼 방법을 요청했습니다. TEX 주소가 그 해답이며, Binance은 ZecHub [Custodial Exchanges](/using-zcash/custodial-exchanges) 목록에서 TEX 입금을 받는 거래소입니다.
* 송금 측면에서도 지원이 확대되었습니다. Coinbase은 사용자가 ZEC를 TEX 주소로 보낼 수 있게 하며, 지갑 툴킷도 ZIP 320 지원을 추가하고 있습니다.
* TEX 주소로의 결제는 다른 모든 투명 결제와 마찬가지로 블록체인에 공개됩니다. 나머지 실드 잔액은 비공개로 유지됩니다.

## 핵심 설명

Zcash TEX 주소는 특수한 유형의 수신 주소입니다. TEX는 "Transparent Exchange"의 약자입니다. 단일 p2pkh 투명 주소를 Bech32m으로 재인코딩한 것입니다. TEX 주소는 `tex1`로 시작하며 Unified Addresses와는 별도 유형입니다.

TEX 주소는 호환 지갑에 투명 전용(T -> T) 트랜잭션을 수행하라고 알려 줍니다. 

작동 방식은 다음과 같습니다. 호환 지갑이 TEX 주소를 감지하면 이를 디코딩하여 포함된 투명 수신자를 얻습니다. 이후 지갑은 tx에 필요한 자금을 실드 풀에서 별도의 사용자가 제어하는 일회성 투명 주소로 전송합니다(Z -> T). 그런 다음 그 자금을 TEX 주소에서 디코딩한 투명 수신자에게 보냅니다(T -> T).  

TEX 주소의 기술 제안은 Zcash [ZIP 320](https://zips.z.cash/zip-0320)에 설명되어 있으며, 이는 투명 주소에서 온 자금만 수신하기 위한 주소 유형을 정의합니다.

![TEX](/content-images/ZashiTex-b1cbec5f07.webp)

### TEX 주소는 얼마나 널리 사용되나요?

도입은 아직 부분적이지만, 더 이상 단일 거래소에만 국한되지 않습니다. 서로 다른 두 역할을 구분할 필요가 있습니다.

* **TEX 입금 주소 발급.** Binance은 [Custodial Exchanges](/using-zcash/custodial-exchanges) 목록에서 입금용 TEX 주소를 제공하는 거래소로, 자금이 투명 출처에서 도착하도록 합니다([ZIP 320, Background](https://zips.z.cash/zip-0320#background)). ZIP 320은 다른 거래소가 결제의 출발 주소를 알아야 하는 경우가 아니면 TEX 주소를 발급할 것으로 예상하지 않습니다.
* **TEX 주소로 송금.** 이것이 성장한 측면입니다. 2024년 10월, Coinbase은 Coinbase.com 사용자가 Zcash를 TEX 주소로 보낼 수 있다고 발표했습니다([Coinbase Assets announcement](https://x.com/CoinbaseAssets/status/1844428577921507416)). 지갑 툴킷도 ZIP 320 지원을 추가하고 있습니다. KeepKey은 펌웨어 7.15에서 TEX 트랜잭션 서명을 추가했고([keepkey/hdwallet #75](https://github.com/keepkey/hdwallet/pull/75)), XChainJS `zcash-js` 라이브러리는 유효한 `tex1` 수신자를 거부한 후 패치되었습니다(아래에서 자세히 설명합니다).

따라서 TEX 주소가 보편적인 것은 아니지만, 이제 독자는 Binance만이 TEX 주소가 나타나는 유일한 곳이라고 가정해서는 안 됩니다.

### TEX 주소가 필요한 경우

#### 투명 주소로 직접 송금하는 것을 지원하지 않는 지갑으로 투명 주소에 자금을 보낼 때 TEX 주소가 필요합니다.

일부 지갑은 투명 주소로 직접 송금할 수 없으며, 수신자가 TEX에 해당하는 주소를 제공하지 않을 수 있습니다. 따라서 경우에 따라 투명 주소를 TEX 주소로 변환해야 할 수 있습니다. 이는 [zip-320](https://zips.z.cash/zip-0320#reference-implementation)에 설명된 참조 구현을 실행하여 수동으로 수행할 수 있습니다.

#### 투명 출처에서 자금이 와야 한다고 요구하는 중앙화 거래소로 자금을 보낼 때 TEX 주소가 필요합니다.

[Binance](https://www.binance.com/)은 TEX 주소가 존재하는 이유입니다. 2023년 11월, 이는 Zcash 커뮤니티에 실드 주소에서의 입금을 거부하고 입금자에게 되돌려 보낼 방법이 없으면 ZEC가 상장 폐지될 수 있다고 알렸습니다([ZIP 320, Background](https://zips.z.cash/zip-0320#background)). ZIP 320은 다른 거래소가 결제의 출발 주소를 알아야 하는 경우가 아니면 TEX 주소를 발급할 것으로 예상하지 않습니다. Binance은 [Custodial Exchanges](/using-zcash/custodial-exchanges) 목록에서 TEX 주소로의 입금을 받는 거래소입니다.
TEX 주소는 호환 지갑에 해당 주소로 보내는 모든 자금이 투명해야 하며 모든 실드 가치를 해당 주소로 보내지 않도록 알려 줍니다.
Binance 같은 거래소가 전송된 가치를 거부하면, 그 가치를 출발 주소로 되돌려 보낼 수단을 갖추고 있습니다. 또한 Binance 같은 기관이 정부나 기타 당국이 부과한 법률 및 규정을 준수하는 데 도움이 됩니다.

### 어떤 지갑이 TEX 주소를 지원하나요?

가장 최신 목록은 [wallets](/using-zcash/wallets) 페이지에서 확인할 수 있습니다. TEX Address 필터를 사용하세요.

## 시각화 / 비유

실드 잔액을 집 안의 잠긴 금고에 든 돈이라고 생각해 보세요. 외부의 누구도 안에 얼마가 있는지 볼 수 없습니다.

Binance 같은 거래소는 창구에 표지판을 걸어 둡니다. 계산원이 돈이 어디서 왔는지 확인하고 필요하면 돌려줄 수 있도록, 투명한 봉투에 든 결제만 받는다는 표지입니다. TEX 주소가 바로 그 표지입니다.

지갑이 표지를 보면 금고에서 금액을 꺼내 반송 주소가 적힌 투명한 봉투에 넣고(임시 투명 주소), 그 봉투를 창구로 가져갑니다. 금고는 잠긴 채로 남아 있고, 그 안에 무엇이 더 있는지는 아무도 알 수 없습니다.

## 심층 분석

### TEX 주소의 구성 방식

`t1`로 시작하는 일반적인 투명 주소에는 Base58Check로 작성된 20바이트 키 해시가 들어 있습니다. TEX 주소는 동일한 20바이트를 접두사 `tex`(테스트넷에서는 `textest`)를 사용해 Bech32m으로 재인코딩합니다. 하나를 다른 하나로 변환하는 데는 몇 줄의 코드만 필요하며, ZIP 320의 참조 구현에서 이를 보여 줍니다.

단순한 설계는 Binance의 요구사항이었습니다. 변환은 거래소 프런트엔드 코드에서 Base58Check 및 Bech32m 라이브러리만으로 실행되어야 했습니다. ZIP 320의 초기 초안은 이 아이디어를 Unified Addresses에 포함했지만, 이 이유로 해당 버전은 폐기되었습니다.

TEX 주소는 Unified Address 형식에서 Bech32m 인코딩을 빌려오지만 그 구조는 거의 유지하지 않습니다. Bech32m과 Zcash 주소 검증 방식이 처음이라면, [Unified Addresses](/using-zcash/unified-addresses) 페이지에서 [ZIP 316](https://zips.z.cash/zip-0316) 아래의 기본 사항을 다룹니다. TEX 주소는 Unified Address와 네 가지 구체적인 차이가 있습니다.

| | Unified Address (ZIP 316) | TEX 주소 (ZIP 320) |
|---|---|---|
| 포함하는 것 | 여러 수신자가 함께 묶여 있음 | 단일 P2PKH 투명 수신자 |
| 사람이 읽을 수 있는 접두사(HRP) | `u` (메인넷) | `tex` (테스트넷에서는 `textest`) |
| F4Jumble 난독화 | 예 | 아니요 |
| 각 수신자의 타입코드 | 예 | 아니요 |

요약하면 TEX 주소는 가능한 가장 단순한 Bech32m 래퍼입니다. 하나의 투명 키 해시, `tex` 접두사, 그리고 그 외에는 아무것도 없습니다.

### 지갑 및 통합업체를 위한 처리 규칙

이 부분은 구현에서 잘못 처리된 사례가 있으므로 명확히 짚을 가치가 있습니다. TEX 주소를 감지한 지갑이나 통합업체는 **실드 풀에서 TEX 대상 주소로 직접 지출해서는 안 됩니다.** ZIP 320은 TEX 결제의 모든 입력이 투명해야 한다고 요구하므로, 결제는 두 단계로 구성됩니다.

1. **디실딩.** 실드 풀에서 금액을 지갑이 소유한 새롭고 사용자가 제어하는 일회성 투명 주소로 옮깁니다(Z -> T).
2. **투명 주소에서 투명 주소로 송금.** 해당 일회성 출력을 TEX 주소 내부에 디코딩된 P2PKH 수신자에게 지출합니다(T -> T).

다음의 몇 가지 규칙은 모두 ZIP 320에 따른 것으로, 이 과정을 안전하게 만듭니다.

* 거래소가 자금을 반환하더라도 지갑이 이를 계속 찾아 지출할 수 있도록, 일회성 주소는 시드 문구에서 파생되어야 합니다.
* 별도의 결제를 서로 연결할 수 없도록 매번 새 일회성 주소를 사용해야 합니다.
* 거래소가 깔끔한 투명-대-투명 입금을 확인할 수 있도록, 두 번째 트랜잭션은 투명 입력만 지출해야 합니다.

변환과 2단계 흐름은 [ZIP 320 참조 구현](https://zips.z.cash/zip-0320#reference-implementation)에 나와 있습니다. 이를 잘못 처리하는 것은 실제 최근 문제입니다. 2026년 10월, XChainJS `zcash-js` 라이브러리는 유효한 `tex1` 수신자를 "Invalid 'to' address" 오류와 함께 거부했습니다. 검증기가 Base58Check `t1` 형식만 허용했기 때문에 ZEC가 `tex1` 주소를 게시하는 서비스에 입금하는 것이 중단되었습니다([issue #1782](https://github.com/xchainjs/xchainjs-lib/issues/1782)). 검증기가 ZIP 320 인코딩을 수용하도록 수정되어 해결되었습니다([PR #1783](https://github.com/xchainjs/xchainjs-lib/pull/1783)).

### TEX 송금에서 공개되는 정보

TEX 결제는 투명 결제이므로 공개되지만, 관찰자가 볼 수 있는 것과 볼 수 없는 것을 정확히 구분할 필요가 있습니다.

체인에서 **보이는** 정보:

* 일회성 투명 주소. 디실딩 단계의 출력 및 최종 송금의 입력으로 나타납니다.
* 두 금액 모두. Z -> T 단계에서 실드 풀을 떠난 가치와 T -> T 단계에서 전달된 가치입니다.
* TEX 주소에 인코딩된 P2PKH 주소인 거래소의 투명 수신자.

계속 **숨겨지는** 정보:

* 나머지 실드 잔액 및 결제 자금을 댄 구체적인 실드 노트. 디실딩 단계는 일부 가치가 풀에서 일회성 주소로 나갔다는 것만 드러낼 뿐, 풀 내부의 어느 위치에서 왔는지는 드러내지 않습니다.

따라서 관찰자는 일회성 주소를 거래소 결제와 연결할 수 있고(동일 자금, 투명-대-투명), 해당 주소가 실드 인출로 충전되었다는 것도 볼 수 있습니다. 하지만 이를 다른 실드 자금이나 활동과 연결할 수는 없습니다. 실제로 체인상에서 결제를 "TEX" 송금으로 표시하는 것은 없습니다. ZIP 320이 언급하듯, 합의 규칙은 변경되지 않고 전체 규칙은 지갑에 있기 때문에 TEX 주소로의 결제는 일치하는 `t1` 주소로의 결제와 구별할 수 없습니다.

![On-chain footprint of a TEX send: funds leave the shielded pool to an ephemeral transparent address, then go transparent-to-transparent to the exchange; the ephemeral address, both amounts and the exchange address are visible, while the rest of the shielded balance stays hidden](/content-images/tex-onchain-footprint.webp)

### 블록체인에 표시되는 것

TEX 규칙은 지갑에 존재합니다. 노드는 이를 검사하지 않으므로 합의 규칙은 동일하게 유지됩니다. 체인에서 TEX 주소로의 결제는 일치하는 `t1` 주소로의 결제와 똑같이 보입니다. 금액, 일회성 주소, 거래소 주소는 모든 투명 트랜잭션과 마찬가지로 공개됩니다.

## 관련 페이지

- [Unified Addresses](/using-zcash/unified-addresses): `u1` 316의 ZIP 주소 형식과 TEX 주소가 재사용하는 Bech32m 기본 사항.
- [Custodial Exchanges](/using-zcash/custodial-exchanges): Binance의 TEX 입금을 포함해, 어떤 거래소가 어떤 주소 유형을 수용하는지.
- [Wallets](/using-zcash/wallets): TEX 주소로 결제할 수 있는 지갑을 찾으려면 TEX Address 필터를 사용하세요.
- [Shielded Pools](/using-zcash/shielded-pools): TEX 결제가 그 일부를 이동시키기 전 비공개 잔액이 있는 곳.
- [누가 내 Zcash 결제를 볼 수 있나요](/start-here/who-can-see-your-zcash-payment): 자금이 실드 풀을 떠난 후 무엇이 보이게 되는지.
- [블록 탐색기가 볼 수 있는 것](/zcash-tech/what-a-block-explorer-can-see): 투명 결제가 체인에 표시되는 방식.
- [Zcash 결제 요청 URI](/using-zcash/payment-request-uris): 미리 채워진 결제를 위한 또 다른 지갑 표준.

**최종 업데이트:** 2026년 10월
