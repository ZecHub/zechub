<a href="https://github.com/zechub/zechub/edit/main/site/Using_Zcash/Solana_ZEC_to_Shielded.md" target="_blank">
  <img src="https://img.shields.io/badge/Edit-blue" alt="페이지 편집"/>
</a>

# Solana의 ZEC를 보유하고 계신가요? 거래정보 보호 Zcash으로 옮기는 방법

이 페이지는 ZCAT 또는 보유자에게 ZEC를 지급하는 다른 Solana 토큰을 보유하고 있어 ZEC가 Solana 지갑에 표시된 분을 위한 것입니다. 이 내용을 따라가기 위해 무엇이든 판매하실 필요는 없습니다. 이미 보유한 ZEC을 Solana에서 Zcash 지갑으로 옮기면 거래정보 보호 상태가 됩니다.

2026년 9월 27일, Phantom에 ZEC 0.00266336을 보유한 상태에서 실제 전송으로 아래의 모든 단계를 진행했습니다. 이 페이지에 적힌 수수료와 시간, 화면은 당시 확인한 내용입니다.

---

## 요약

- Solana 지갑에 있는 ZEC는 실제 ZEC를 1:1로 담보하는 **Solana 토큰**(민트 `A7bd…QXaS`)입니다. NEAR OmniBridge가 Zcash 체인에 보유한 이 토큰은 Solana의 공개 원장에 존재하는 “종이 ZEC”이며, 그곳에서는 거래정보를 보호할 수 없습니다.
- 2단계로 진행합니다. solswap.org(NEAR Intents)에서 토큰을 **입금**한 다음, near.com에서 지갑의 거래정보 보호 `u1` 주소로 **출금**합니다. Phantom 자체의 스왑 버튼은 사용하지 마세요. 도움이 되지 않습니다.
- [ZecHub 디렉터리](/wallets)에서 **Ironwood: 준비됨**으로 표시된 지갑을 사용하고, Phantom에 Solana 수수료를 낼 SOL을 조금 남겨 두세요.
- 실제 테스트(2026년 9월 27일, ZEC 0.00266336)에서는 입금이 9초 만에 반영되었고, 출금에는 약 8분이 걸렸습니다. 총비용은 약 0.00025 ZEC + 0.0016 SOL이었습니다.
- 안전 수칙: `near.com`/`solswap.org`에서 메시지에 `intents.near`가 포함된 요청에만 서명하고, seed phrase를 입력하지 마세요. `u1`를 붙여 넣고 `t1`는 붙여 넣지 마세요.

## 비유로 이해하기

Solana의 ZEC는 **카지노 칩**과 같습니다. 현금과 같은 가격으로 거래되고, 카지노인 NEAR OmniBridge는 칩을 돌려주는 사람에게 실제 지폐(네이티브 ZEC)를 주겠다고 약속합니다. 하지만 칩은 카지노 원장에 기록된 한 줄일 뿐입니다. 누구나 누가 칩을 보유하고 있는지 볼 수 있고, 그 가치는 카지노의 시스템이 제대로 작동하는지에 달려 있습니다. near.com을 통해 출금하는 것은 환전 창구에 가서 칩을 현금으로 바꾸는 것과 같습니다. 지폐가 거래정보 보호 구역에 들어가면, 누구도 금액이나 보유자를 볼 수 없는 불투명한 개인 지갑에 보관됩니다.

---

## 실제로 보유하고 있는 것

ZEC은 지갑의 Solana에서 Solana 토큰으로 존재하며, Zcash 네트워크의 코인이 아닙니다. NEAR OmniBridge가 이를 발행하고, 이를 뒷받침하기 위해 Zcash 체인에 실제 ZEC를 보유합니다. 브릿지는 2025년 10월부터 Solana에서 운영되고 있습니다. Solana 측은 Wormhole 메시지와 NEAR Chain Signatures를 사용하며, Zcash 라이트 클라이언트를 사용하지 않으므로 Solana 측의 안전성은 이 두 시스템의 안전성에 달려 있습니다. 사람들은 이를 “종이 ZEC”라고 부릅니다. ZEC의 가격을 추종하지만, 모든 잔액과 송금은 지갑 주소에 연결된 Solana의 공개 원장에 기록되며, 거기에 있는 동안에는 거래정보 보호 상태로 만들 수 없습니다.

보유한 토큰이 진짜인지 확인하세요. Phantom에서 **ZEC**을 누르고 아래로 스크롤해 **Zcash 정보**를 여세요. 컨트랙트 주소는 다음과 같아야 합니다.

```
A7bdiYdS5GjqGFtxf17ppRHtDKPkkRqbKtR27dxvQXaS
```

![Phantom's About Zcash panel showing the contract address A7bd…QXaS on the Solana network](/content-images/01-phantom-zec-mint-4a718bc213.webp)

Phantom에서는 주소가 `A7bd…QXaS`로 축약되므로, 처음과 마지막 문자를 비교하거나 [Solscan](https://solscan.io/token/A7bdiYdS5GjqGFtxf17ppRHtDKPkkRqbKtR27dxvQXaS)에서 전체 주소를 조회하세요. 지갑에 있는 다른 “ZEC” 토큰은 이름이나 로고와 관계없이 이 토큰이 아닙니다. 그대로 두세요.

---

## 옮기는 이유

거래정보 보호 ZEC는 Zcash의 핵심입니다. ZEC가 거래정보 보호 구역에 있으면, 각 결제의 송신자, 수신자, 금액이 Zcash 체인에서 암호화됩니다. 블록 탐색기를 살펴보는 누구도 잔액을 볼 수 없습니다.

이미 ZEC를 보유하고 있습니다. 이를 Zcash 지갑으로 옮기면 Zcash하게 만드는 기능을 이용할 수 있고, 브릿지도 더는 필요하지 않습니다. 개인 지갑에 있는 네이티브 ZEC는 누군가가 상환을 이행할지에 의존하지 않습니다.

[누가 내 Zcash 결제를 볼 수 있나요?](/start-here/who-can-see-your-zcash-payment)에서 어떤 정보가 숨겨지는지 자세히 설명합니다.

---

## Zcash 지갑 선택하기

ZecHub에서 지갑을 하나 골라 주지는 않습니다. [ZecHub 지갑 디렉터리](/wallets)에서 선택하고, 설치하기 전에 지갑 카드에 표시된 2가지 항목을 확인하세요.

- **Ironwood: 준비됨.** Ironwood는 2026년 7월 28일 [Ironwood 업그레이드](/zcash-tech/ironwood) 이후 새로운 거래정보 보호 ZEC가 들어가는 풀입니다. 이전 Orchard 풀은 더 이상 신규 자금을 받지 않습니다.
- **자동 거래정보 보호.** 결제가 투명 주소로 들어왔을 때 유용합니다. 지갑이 해당 ZEC를 대신 거래정보 보호 구역으로 옮깁니다. 이 표시를 **Ironwood: 준비됨**의 대용으로 여기지 마세요. 자동 거래정보 보호 기능이 있어도 Ironwood 풀이 지원되지 않을 수 있습니다(현재 디렉터리에서 Edge가 이에 해당합니다). 대부분의 다른 지갑에는 대신 **거래정보 보호** 버튼이 표시됩니다.

검색 결과나 광고가 아니라 디렉터리 카드의 링크에서 지갑을 설치하세요. seed phrase는 종이에 적어 오프라인에 보관하세요.

지갑에는 2가지 주소가 표시됩니다.

![A Zcash wallet's Receive screen with a shielded address starting u1 and a transparent address starting t1](/content-images/02-zodl-receive-c98cd378fb.webp)

| 시작 부분 | 유형 | 공개적으로 보이는 정보 |
|---|---|---|
| `u1` | 통합 주소 | 결제가 거래정보 보호 구역에 들어가는 경우, 사용자에 관한 정보는 보이지 않습니다 |
| `t1` | 투명 주소 | Solana에서처럼 주소와 금액이 영구적으로 공개됩니다 |

지갑에서 거래정보 보호 주소로 표시된 `u1`를 사용하세요. `u1`는 수신 주소를 묶어 놓은 것으로, 일부 지갑은 거래정보 보호 주소와 함께 투명 주소도 그 안에 넣습니다. 투명 주소로만 결제할 수 있는 송신자는 투명 주소를 사용하므로, `u1`를 붙여 넣었더라도 결제 내역이 공개 원장에 기록됩니다. 테스트에 사용한 지갑의 거래정보 보호 주소에는 투명 주소가 포함되어 있지 않아 이런 일이 일어날 수 없었습니다. [거래정보 보호 구역](/using-zcash/shielded-pools)에서 수신 주소를 더 자세히 설명합니다. 일부 지갑은 수신 화면을 열 때마다 새 `u1`를 표시합니다. 정상적인 동작이며, 모두 사용자에게 속한 주소입니다. 이 페이지의 수신 화면과 near.com의 수신자 입력란에 서로 다른 `u1` 접두사가 사용된 이유도 이 때문입니다.

설정해 둔 지갑을 사용해 테스트를 진행했으므로 ZODL를 사용했습니다. 디렉터리에서 **Ironwood: 준비됨**으로 표시된 지갑만 새로운 거래정보 보호 자산을 받을 수 있습니다.

---

## 옮기기

2단계로 진행합니다. Phantom에서 NEAR Intents로 ZEC를 넣은 다음, Zcash 주소로 보냅니다. 첫 단계에는 [solswap.org](https://solswap.org)를 사용했습니다. 이 사이트는 Solana 사용자를 위해 NEAR에서 구축되었습니다. 두 번째 단계에는 NEAR의 자체 앱인 [near.com](https://near.com)을 사용했습니다. ZecHub의 [ZEC을 Phantom 지갑에서 스왑하는 방법](/using-zcash/solswap) 안내에서 solswap 화면을 더 자세히 다룹니다. Phantom 자체의 **스왑** 버튼은 사용하지 마세요. 이미 토큰을 보유하고 있으므로 스왑해도 아무런 도움이 되지 않습니다.

Phantom에 Solana 수수료를 낼 SOL을 조금 남겨 두세요.

### 1. solswap.org에서 ZEC 입금하기

1. Phantom을 열고 브라우저 탭으로 이동해 `solswap.org`를 직접 입력한 다음 지갑을 연결합니다.
2. **입금**을 누릅니다. **자산**은 **Zcash**, **네트워크**는 **Solana**로 설정하고, 방법은 **지갑**을 선택합니다.
3. 금액을 입력하거나 **최대**를 누른 다음 Phantom에서 거래를 승인합니다.

![solswap Deposit screen with Zcash as the asset, Solana as the network and Wallet as the method](/content-images/03-solswap-deposit-425691e62f.webp)

입금은 Solana 블록에 15:09:08(UTC+1)에 기록되었고, 9초 후 solswap에 **완료**로 표시되었습니다.

![solswap deposit history showing Completed, +0.0026 ZEC](/content-images/04-solswap-deposit-complete-be5feaf758.webp)

이제 ZEC가 NEAR Intents 잔액에 있습니다. Phantom 키가 잔액을 옮기는 모든 작업을 승인하고, NEAR Intents 솔버가 전송을 실행하며, NEAR Intents는 규정 준수 검토를 위해 잔액을 보류할 수 있습니다(아래 신뢰 관련 참고 사항을 확인하세요).

### 2. near.com에서 Zcash 주소로 보내기

solswap에도 **출금** 페이지가 있지만 저희에게는 작동하지 않았습니다. 네트워크로 Zcash 또는 Solana를 선택해도 **수령 금액**과 **수수료**가 “–”로 표시되고 버튼을 눌러도 아무 일도 일어나지 않았습니다.

![solswap Withdraw form with the received amount and fee stuck at a dash](/content-images/05-solswap-withdraw-blank-92c6e64c65.webp)

이런 일이 생겨도 ZEC가 사라진 것은 아닙니다. 잔액은 웹사이트가 아니라 지갑 키에 연결되어 있으므로, 해당 지갑으로 로그인하는 NEAR Intents 앱이라면 어디서든 잔액에 접근할 수 있습니다. 저희는 near.com에서 출금을 완료했습니다.

1. `near.com`로 이동해 같은 Phantom 지갑으로 로그인합니다.
2. solswap 잔액은 **기존 자산 이동** 아래에 표시됩니다(near.com에서는 이전 NEAR Intents 앱의 잔액을 “기존” 자산이라고 부릅니다). ZEC 행에서 **출금**을 누릅니다. **이동**은 선택하지 않아도 됩니다.

![near.com Move legacy assets page listing 0.0026 ZEC with Move and Withdraw buttons](/content-images/06-nearcom-legacy-assets-7ee16c5ac4.webp)

3. **네트워크**를 **Zcash**로 설정하고, 지갑의 `u1` 주소를 **수신자**에 붙여 넣은 다음 처음과 마지막 6개 문자가 지갑의 주소와 일치하는지 확인합니다.

![near.com Withdraw legacy asset form with Zcash as the network and a u1 recipient, receive at least 0.00233164 ZEC, about 2 minutes](/content-images/07-nearcom-withdraw-724ef22b38.webp)

4. **출금 검토**를 누르고 요약을 확인한 다음 **전송**을 누릅니다.

![near.com Review send screen: network Zcash, recipient receives at least 0.00233164 ZEC, fee 0 ZEC, you pay 0.00266336 ZEC](/content-images/08-nearcom-review-b6053f675b.webp)

5. Phantom에서 near.com에 **메시지 서명**을 요청합니다. 이 서명으로 NEAR Intents가 잔액을 옮길 수 있도록 승인합니다. SOL이 들지 않지만, 그렇다고 위험하지 않은 것은 아닙니다. 비슷하게 꾸민 가짜 사이트가 같은 요청을 표시해 잔액 NEAR Intents를 빼낼 수 있습니다. **확인**을 누르기 전에 아래 사항을 모두 확인하고, 하나라도 맞지 않으면 **취소**를 누르세요.
   - 요청에 표시된 사이트 이름이 `near.com`여야 합니다. (1단계의 입금은 `solswap.org`에서 온 일반 Phantom 거래 요청이었습니다. 그 요청에서도 같은 방법으로 이름을 확인하세요.)
   - **메시지**를 열어 `"verifying_contract": "intents.near"`가 있는지 확인합니다.
   - 메시지는 스크린샷처럼 읽을 수 있는 텍스트여야 합니다. 읽을 수 없는 문자열이거나 주소 표시줄의 사이트와 일치하지 않으면 거부하세요.
   - seed phrase를 요청하는 경우는 없습니다. 서명할 때 seed phrase를 입력하지 않습니다.

![Phantom Sign Message request from near.com on the Solana network](/content-images/09-phantom-sign-message-cb1ce6d20f.webp)

6. near.com에는 **전송 처리 중**, **전송 중**, **완료**가 표시됩니다. **블록 탐색기에서 보기**를 누르면 전송의 NEAR Intents 기록이 열립니다.

![near.com status screen: Sending 0.0023 ZEC, all three steps complete](/content-images/10-nearcom-complete-c641093c46.webp)

![NEAR Intents explorer record: created 3:59:28 PM, withdrawn to the u1 address 4:07:55 PM, with the Zcash withdraw transaction ID](/content-images/11-intents-explorer-f93f87814e.webp)

### 테스트 비용과 소요 시간

| | 테스트 결과 |
|---|---|
| Phantom에서 입금한 ZEC | 0.00266336 ZEC |
| Zcash 지갑에서 받은 ZEC | 0.00241336 ZEC, 거래정보 보호 상태 |
| ZEC 측 비용 | 0.00025 ZEC(near.com에는 “수수료 0 ZEC”으로 표시됨. 비용은 견적에 포함되어 있음) |
| 입금에 사용한 SOL | 0.00156844 SOL. 이 중 네트워크 수수료는 0.00008 SOL |
| 최소 금액 | 해당 사항 없음. solswap의 최소 입금액은 0.00000001 ZEC였고 near.com은 0.0026 ZEC를 받았습니다 |
| 입금, Phantom에서 solswap까지 | 9초 |
| 출금, near.com에서 서명한 시점부터 Zcash 지갑에 ZEC가 들어올 때까지 | 약 8분(near.com의 예상 시간은 약 2분) |

기록: Solana 입금 [5ijsgRrh…AjLkx](https://solscan.io/tx/5ijsgRrhViNTtFMmnsfJDSo3HhRmt3Ri7WB513oBoQLxfGNswDxvHnakwW1yyqXznTTCSxnUkooAHDKowz9AjLkx), NEAR Intents [79c23cfd…a405a9](https://explorer.near-intents.org/transactions/79c23cfd43928de5522c182e26f8f052dc9c43d53430ca497b40e016a6a405a9), 블록 3,498,141의 Zcash [28d6da27…481034](https://mainnet.zcashexplorer.app/transactions/28d6da27d74dc91e45175a7aff6023bc85578603dd77f1b49782a28f8f481034). 네트워크 부하에 따라 수수료와 시간이 달라지므로, 실제 진행 시에는 최종적으로 검토 화면의 내용을 확인하세요.

NEAR의 브릿지에는 표준 Zcash 출금의 최소 금액 0.01 ZEC와 수수료 0.00047 ZEC가 안내되어 있습니다. near.com에서는 저희가 출금한 0.0026 ZEC에 둘 중 어느 것도 적용하지 않았습니다. 앱에서 소액을 거부하면 충전하기 전에 near.com을 이용해 보세요.

### 다른 경로와 각 경로가 신뢰하는 대상

Solana에서 나오는 모든 경로는 OmniBridge를 신뢰합니다. 브릿지가 토큰을 뒷받침하는 ZEC를 보유하기 때문입니다. 그 외에 다음 사항도 고려해야 합니다.

- **위에 소개한 경로**는 NEAR Intents를 신뢰합니다. 서명으로 전송을 승인하고, 솔버가 Zcash 측에서 ZEC를 전달하며, NEAR Intents는 규정 준수 검토를 위해 자금을 보류할 수 있습니다. 2026년에 Zcash 보유자 한 명이 [대규모 스왑이 몇 주 동안 보류되었다고 보고했습니다](https://www.cryptotimes.io/2026/09/11/zcash-holder-says-589k-usdt-stuck-on-near-intents-50-days-after-zodl-swap/). 또한 두 웹사이트에 지갑을 연결하므로 매번 주소 표시줄을 확인하세요.
- **NEAR Intents가 내장된 지갑**([](/wallets) 디렉터리NEAR Intents 기능 확인)은 Zcash 지갑 안에서 같은 시스템을 사용합니다. 신뢰하는 대상은 같고, 거쳐야 하는 웹사이트는 더 적습니다. Solana에서 ZEC를 사용한 이 방법은 테스트하지 않았습니다.
- **거래소**: Solana 네트워크에서 이 토큰의 입금을 받는 경우에만 이용할 수 있지만, 대부분의 거래소는 지원하지 않습니다. 자산의 보관 권한과 대개 신원 정보도 넘겨야 하며, 많은 거래소는 `t1` 주소로만 ZEC를 전송합니다. [커스터디 거래소](/using-zcash/custodial-exchanges)를 참조하세요.

---

## 거래정보 보호 상태로 만들고 확인하기

거래정보 보호 상태로 도착했습니다. 저희가 보낸 ZEC는 `u1` 주소로 전송되어 곧바로 Ironwood 거래정보 보호 구역에 들어갔습니다. 투명 주소를 거치는 단계도 없었고 직접 거래정보를 보호할 필요도 없었습니다. 확인이 끝날 때까지 지갑에는 16:07(UTC+1)에 방패 아이콘과 함께 **수신 중…**으로 표시되었습니다.

![Zcash wallet activity showing Receiving 0.00241336 ZEC with a shield icon](/content-images/12-zodl-receiving-cb9f41511d.webp)

직접 확인하려면 지갑에서 거래를 열고 거래 ID를 복사하세요.

![Zcash wallet transaction details with the transaction ID and timestamp](/content-images/13-zodl-tx-details-b08434d680.webp)

[Zcash 블록 탐색기](https://mainnet.zcashexplorer.app)에 붙여 넣으세요. 요약 정보에 놀라지 마세요. 저희 거래는 **거래정보 보호 입력 / 출력 0 / 0**, **거래정보 보호 구역에서 이동한 금액 0.0 ZEC**으로 표시됩니다. 이는 탐색기 요약에 아직 Ironwood가 반영되지 않기 때문입니다. 표시되는 `t1` 주소는 송신 측 주소(사용한 ZEC와 남은 잔돈)이지, 수신자의 주소가 아닙니다.

![Explorer summary for the transaction: two transparent inputs, one transparent output, 0/0 shielded](/content-images/14-explorer-summary-6153afb265.webp)

**원시 TX: JSON**을 클릭해 `ironwood`를 검색하세요. 여기에 표시된 음수 `valueBalance`는 Ironwood 구역으로 들어오는 ZEC입니다. 저희 거래에는 도착한 금액과 정확히 같은 `-0.00241336`가 표시되었으며, 거래 내역 어디에도 수신자가 누구인지 나타나지 않습니다.

![Raw transaction JSON with the ironwood section highlighted: valueBalance -0.00241336 (highlight added)](/content-images/15-explorer-raw-ironwood-8ff8ae0892.webp)

[블록 탐색기에 표시되는 정보](/zcash-tech/what-a-block-explorer-can-see)에서 나머지 항목을 설명합니다.

### `t1` 주소를 붙여 넣은 경우

저희는 투명 주소로 보내지 않았지만 결과는 예측할 수 있습니다. ZEC가 지갑의 투명 잔액으로 들어오고, 블록 탐색기에는 `t1` 주소와 금액이 영구적으로 공개됩니다. 자동 거래정보 보호 기능이 있는 지갑은 해당 자산을 거래정보 보호 구역으로 옮깁니다. 그렇지 않으면 **거래정보 보호**를 누르세요. 이 작업에는 소액의 네트워크 수수료가 듭니다. 거래정보 보호 거래도 공개됩니다. `t1` 주소의 자산을 사용하기 때문입니다. 자산이 사라지는 것은 아니지만, 해당 입금과 지갑을 연결하는 정보는 체인에 남습니다. `u1`를 붙여 넣으세요.

---

## 안전하게 사용하기

새 보유자는 표적이 되기 쉽습니다. 흔히 접하는 사기는 거의 모두 다음 유형에 해당합니다.

- **잘못된 주소 유형.** Zcash 주소는 `u1`, `t1`, `zs` 또는 `tex1`로 시작합니다. Solana 주소에는 이러한 접두사가 없습니다. 네이티브 ZEC를 Solana 주소로 보내지 말고, Solana 토큰을 Zcash 주소로 보내지 마세요.
- **투명 주소만 지원하는 서비스.** 일부 브릿지, 스왑 사이트, 거래소는 `t1` 주소로만 전송할 수 있습니다. 자산이 도착하자마자 ZEC를 거래정보 보호 상태로 만들면 사용할 수 있습니다. 다만 그대로 두지는 마세요.
- **가짜 지갑.** [지갑 디렉터리](/wallets) 카드나 카드에서 연결되는 공식 앱 스토어 페이지에서만 설치하세요. 가짜 암호화폐 지갑 앱이 앱 스토어에 올라오는 경우가 있으며, 실제 앱과 똑같이 보입니다.
- **seed phrase 피싱.** 지갑, 브릿지, 스왑 사이트, 지원 담당자, 운영자, 에어드롭 중 어느 누구도 seed phrase를 요구하지 않습니다. 메시지 서명 시 seed phrase를 입력하는 일은 없습니다. seed phrase를 요구하는 사람은 자산을 훔치려는 것입니다. [자금 복구](/using-zcash/recovering-funds)에서 “지갑을 복구해 드리겠습니다”라고 속이는 사기 유형을 설명합니다.
- **사기 토큰과 “클레임” 사이트.** Solana 지갑에 ZEC, Zcash 또는 비슷한 이름의 토큰이 원치 않게 표시되는 경우가 있습니다. 이런 토큰에는 추가 토큰을 “클레임”하라는 링크가 붙어 있는 경우가 많습니다. 해당 링크에 지갑을 연결하면 자산이 빠져나갈 수 있습니다. 이 페이지 위쪽에 나온 컨트랙트 주소를 확인하고 나머지는 무시하세요.
- **악성 서명 요청.** “메시지 서명” 요청을 통해 SOL 수수료 없이도 NEAR Intents 잔액을 옮길 수 있습니다. `near.com` 또는 `solswap.org`에서만 서명하고, 메시지에 `intents.near`가 명시된 경우에만 서명하세요(위 5단계의 확인 사항 참조).
- **유사 사이트.** `solswap.org`와 `near.com`를 직접 입력하거나 북마크를 이용하세요. 쪽지, 댓글, 광고의 링크는 따라가지 마세요.

---

## 흔히 하는 실수

- 입금 절차 대신 Phantom의 스왑 버튼을 사용하는 것. 이미 토큰을 보유하고 있으므로 스왑하면 종이 ZEC를 다른 토큰으로 바꾸기만 할 뿐, 네이티브 ZEC에 더 가까워지지 않습니다.
- 지갑에서 거래정보 보호 전용 `u1`를 제공하는데 `t1` 주소를 붙여 넣거나 투명 주소가 포함된 `u1`를 붙여 넣는 것. 입금이 공개되고 지갑과 영구적으로 연결됩니다.
- solswap의 출금 페이지에 “–”가 표시되었을 때 자금이 묶였다고 생각하는 것. 잔액은 웹사이트가 아니라 Phantom 키에 연결되어 있습니다. near.com에서 출금을 완료하세요.
- 확인하지 않고 메시지에 서명하는 것. 유사 사이트는 서명 한 번으로 NEAR Intents 잔액을 빼낼 수 있습니다. 사이트는 `near.com`여야 하고, 메시지에는 `"verifying_contract": "intents.near"`가 포함되어야 합니다.
- “ZEC” 티커가 가리키는 2가지 자산을 혼동하는 것. Solana 토큰과 네이티브 Zcash ZEC는 이름은 같지만 네트워크는 다릅니다. 다른 체인으로 보내면 자산을 잃게 됩니다.

## 거래정보 보호 ZEC 활용하기

- 결제할 때 거래정보를 보호하세요: [ZEC를 비공개로 사용하기](/guides/using-zec-privately)
- 결제 가능한 곳을 찾아보세요: [ZEC 결제 가능한 곳](/using-zcash/spend-zcash/top-10-places-to-spend-zec)
- 비공개 메모를 첨부해 보내세요: [메모](/using-zcash/memos)
- 신원을 연결하지 않고 결제하세요: [신원 정보 없이 송금하기](/zcash-use-cases/send-money-without-linking-identity)

---

## 관련 페이지

- [ZEC을 Phantom 지갑에서 스왑하는 방법](/using-zcash/solswap) — solswap 화면을 더 자세히 설명합니다
- [거래정보 보호 구역](/using-zcash/shielded-pools) — Ironwood/Orchard 풀이 무엇이며 수신 주소가 어떻게 작동하는지 설명합니다
- [누가 내 Zcash 결제를 볼 수 있나요?](/start-here/who-can-see-your-zcash-payment) — 거래정보 보호로 실제로 숨겨지는 정보를 설명합니다
- [지갑](/wallets) — 지갑 디렉터리입니다. **Ironwood: 준비됨** 표시를 확인하세요
- [커스터디 거래소](/using-zcash/custodial-exchanges) — 이 경로를 선택하면 피할 수 있는 절충점을 설명합니다
- [자금 복구](/using-zcash/recovering-funds) — 접근 권한을 잃지 않도록 안전하게 보관해야 할 항목을 설명합니다
