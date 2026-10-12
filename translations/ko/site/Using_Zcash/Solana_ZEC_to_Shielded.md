<a href="https://github.com/zechub/zechub/edit/main/site/Using_Zcash/Solana_ZEC_to_Shielded.md" target="_blank">
  <img src="https://img.shields.io/badge/Edit-blue" alt="Edit Page"/>
</a>

# Solana에 ZEC가 있나요? 이를 실드된 Zcash로 옮기세요

이 페이지는 ZCAT 또는 보유자에게 ZEC를 지급하는 다른 Solana 토큰을 보유하여 Solana 지갑에 ZEC가 표시된 경우를 위한 안내입니다. 이 절차를 따르기 위해 아무것도 판매할 필요가 없습니다. Solana에 이미 있는 ZEC를 Zcash 지갑으로 옮기면 실드된 상태가 됩니다.

2026년 9월 27일, Phantom의 0.00266336 ZEC로 실제 전송을 시작해 아래의 모든 단계를 진행했습니다. 이 페이지의 수수료, 소요 시간 및 화면은 저희가 확인한 내용입니다.

---

## 실제로 보유한 것

Solana 지갑의 ZEC는 Zcash 네트워크의 코인이 아니라 Solana상의 토큰입니다. NEAR OmniBridge가 이를 발행하며, 이를 뒷받침하기 위해 Zcash 체인에 실제 ZEC를 보유합니다. 이 브리지는 2025년 10월부터 Solana에서 운영되고 있습니다. Solana 측은 Zcash 라이트 클라이언트가 아닌 Wormhole 메시지와 NEAR Chain Signatures로 작동하므로, Solana 측의 안전성은 이 두 시스템에 달려 있습니다. 사람들은 이를 “종이 ZEC”라고 부릅니다. 가격은 ZEC를 추종하지만, 모든 잔액과 전송은 지갑 주소 아래 Solana의 공개 원장에 기록되며, այնտեղ에 머무는 동안 실드할 수 없습니다.

보유한 것이 진짜 토큰인지 확인하세요. Phantom에서 **ZEC**를 누르고 **About Zcash**까지 스크롤하세요. 계약 주소는 반드시 다음과 같아야 합니다.

```
A7bdiYdS5GjqGFtxf17ppRHtDKPkkRqbKtR27dxvQXaS
```

![Phantom's About Zcash panel showing the contract address A7bd…QXaS on the Solana network](/content-images/01-phantom-zec-mint-4a718bc213.webp)

Phantom는 이를 `A7bd…QXaS`로 줄여 표시하므로, 처음과 마지막 문자를 비교하거나 [Solscan](https://solscan.io/token/A7bdiYdS5GjqGFtxf17ppRHtDKPkkRqbKtR27dxvQXaS)에서 전체 주소를 조회하세요. 이름이나 로고와 관계없이 지갑의 다른 “ZEC” 토큰은 이것이 아닙니다. 건드리지 마세요.

---

## 왜 옮겨야 하나요

실드된 ZEC는 Zcash의 핵심입니다. ZEC가 실드된 풀에 있으면 각 결제의 발신자, 수신자 및 금액은 Zcash 체인에서 암호화됩니다. 탐색기를 보는 누구도 잔액을 확인할 수 없습니다.

이미 ZEC를 보유하고 있습니다. 이를 Zcash 지갑으로 옮기면 Zcash를 만드는 부분을 얻고 브리지를 배제하게 됩니다. 자신의 지갑에 있는 네이티브 ZEC는 누군가가 상환을 이행하는 것에 의존하지 않습니다.

[누가 당신의 Zcash 결제를 볼 수 있나요?](/start-here/who-can-see-your-zcash-payment)에서 정확히 무엇이 숨겨지는지 설명합니다.

---

## Zcash 지갑 고르기

ZecHub는 하나를 대신 골라주지 않습니다. [ZecHub 지갑 디렉터리](/wallets)에서 선택하고, 설치 전에 지갑 카드에서 다음 두 라벨을 확인하세요.

- **Ironwood: Ready.** Ironwood는 2026년 7월 28일 [Ironwood 업그레이드](/zcash-tech/ironwood) 이후 새 실드된 ZEC가 들어가는 풀입니다. 이전 Orchard 풀은 더 이상 새 자금을 받지 않습니다.
- **Automatic Shielding.** 결제가 투명하게 도착한 경우 유용합니다. 지갑이 해당 ZEC를 대신 실드된 풀로 옮겨 줍니다. 이 라벨을 **Ironwood: Ready**의 대체물로 생각하지 마세요. 지갑에 Automatic Shielding이 있어도 Ironwood 풀이 없을 수 있습니다(현재 디렉터리에서 Edge가 이 상태입니다). 대부분의 다른 지갑에는 대신 **Shield** 버튼이 표시됩니다.

검색 결과나 광고가 아닌 디렉터리 카드의 링크를 통해 지갑을 설치하세요. 시드 문구는 종이에 적고 오프라인으로 보관하세요.

지갑에는 두 종류의 주소가 표시됩니다.

![A Zcash wallet's Receive screen with a shielded address starting u1 and a transparent address starting t1](/content-images/02-zodl-receive-c98cd378fb.webp)

| 시작 문자 | 유형 | 공개적으로 보이는 정보 |
|---|---|---|
| `u1` | Unified Address | 당신에 관한 정보는 없지만, 결제가 실드된 풀에 도착한 경우에만 해당 |
| `t1` | 투명 주소 | Solana처럼 주소와 금액이 영구히 공개됨 |

지갑이 실드된 것으로 표시하는 `u1`를 사용하세요. `u1`는 수신자 묶음이며, 일부 지갑은 실드된 수신자 옆에 투명 수신자를 넣습니다. 투명 주소로만 결제할 수 있는 발신자는 그 수신자를 사용하므로, `u1`를 붙여 넣었더라도 결제가 공개적으로 도착합니다. 저희 테스트 지갑의 실드된 주소에는 투명 수신자가 없어서 이런 일은 발생할 수 없었습니다. [실드된 풀](/using-zcash/shielded-pools)에서 수신자에 대해 더 자세히 다룹니다. 일부 지갑은 Receive를 열 때마다 새 `u1`를 보여 주는데, 이는 정상이며 모두 당신의 주소입니다. 이 페이지의 수신 스크린샷과 near.com 수신자 필드가 서로 다른 `u1` 접두사를 사용하는 이유도 이 때문입니다.

테스트에는 이미 설정해 둔 지갑이었기 때문에 ZODL를 사용했습니다. 디렉터리에서 **Ironwood: Ready**로 표시된 지갑만 새 실드된 가치를 받을 수 있습니다.

---

## 옮기기

경로는 두 부분으로 나뉩니다. 먼저 Phantom에서 ZEC를 NEAR Intents로 넣고, 그다음 Zcash 주소로 보냅니다. 첫 단계에는 Solana 사용자를 위한 NEAR 구축 사이트인 [solswap.org](https://solswap.org)를, 두 번째 단계에는 NEAR 자체 앱인 [near.com](https://near.com)를 사용했습니다. ZecHub의 [Phantom Wallet에서 ZEC로 스왑하는 방법](/using-zcash/solswap) 가이드에서 solswap 화면을 더 자세히 다룹니다. 이를 위해 Phantom 자체 **Swap** 버튼을 사용하지 마세요. 이미 토큰을 보유하고 있으므로 스왑해도 아무런 이점이 없습니다.

Solana 수수료를 위해 Phantom에 약간의 SOL을 남겨 두세요.

### 1. solswap.org에 ZEC 입금하기

1. Phantom를 열고 브라우저 탭으로 이동해 `solswap.org`를 직접 입력한 뒤 지갑을 연결합니다.
2. **Deposit**을 누릅니다. **Asset**은 **Zcash**, **Network**는 **Solana**, 방법은 **Wallet**으로 설정합니다.
3. 금액을 입력하거나 **Max**를 누르고 Phantom에서 거래를 승인합니다.

![solswap Deposit screen with Zcash as the asset, Solana as the network and Wallet as the method](/content-images/03-solswap-deposit-425691e62f.webp)

저희 입금은 15:09:08(UTC+1)에 Solana 블록에 포함되었고, 9초 후 solswap에서 **Completed**로 표시되었습니다.

![solswap deposit history showing Completed, +0.0026 ZEC](/content-images/04-solswap-deposit-complete-be5feaf758.webp)

이제 ZEC는 NEAR Intents 잔액에 있습니다. Phantom 키가 여기서 출금되는 모든 이동을 승인하고, NEAR Intents 솔버가 전송을 수행하며, NEAR Intents는 규정 준수 검토를 위해 잔액을 보류할 수 있습니다(아래 신뢰 관련 참고 사항 참조).

### 2. near.com에서 Zcash 주소로 보내기

solswap에도 **Withdraw** 페이지가 있지만 저희에게는 작동하지 않았습니다. 네트워크로 Zcash 또는 Solana를 선택해도 **Received amount**와 **Fee**는 “–”로 남아 있었고 버튼은 아무 반응이 없었습니다.

![solswap Withdraw form with the received amount and fee stuck at a dash](/content-images/05-solswap-withdraw-blank-92c6e64c65.webp)

이런 일이 발생해도 ZEC가 묶인 것은 아닙니다. 잔액은 웹사이트가 아닌 지갑의 키에 연결되어 있으므로, 그 지갑으로 로그인하는 모든 NEAR Intents 앱에서 접근할 수 있습니다. 저희는 near.com에서 마무리했습니다.

1. `near.com`로 이동해 같은 Phantom 지갑으로 로그인합니다.
2. solswap 잔액은 **Move legacy assets** 아래에 표시됩니다(near.com은 이전 NEAR Intents 앱의 잔액을 “legacy”라고 부릅니다). ZEC 행에서 **Withdraw**를 누릅니다. **Move**는 필요하지 않습니다.

![near.com Move legacy assets page listing 0.0026 ZEC with Move and Withdraw buttons](/content-images/06-nearcom-legacy-assets-7ee16c5ac4.webp)

3. **Network**를 **Zcash**로 설정하고, 지갑의 `u1` 주소를 **Recipient**로 붙여 넣은 뒤 지갑과 처음 여섯 글자 및 마지막 여섯 글자를 대조하세요.

![near.com Withdraw legacy asset form with Zcash as the network and a u1 recipient, receive at least 0.00233164 ZEC, about 2 minutes](/content-images/07-nearcom-withdraw-724ef22b38.webp)

4. **Review withdrawal**을 누르고 요약을 읽은 후 **Send**를 누릅니다.

![near.com Review send screen: network Zcash, recipient receives at least 0.00233164 ZEC, fee 0 ZEC, you pay 0.00266336 ZEC](/content-images/08-nearcom-review-b6053f675b.webp)

5. Phantom가 near.com을 위한 **Sign Message**를 요청합니다. 이 서명이 NEAR Intents가 잔액을 이동하도록 승인합니다. SOL은 들지 않지만 무해한 것은 아닙니다. 유사 사이트는 같은 요청을 표시해 이를 통해 NEAR Intents 잔액을 비울 수 있습니다. **Confirm**을 누르기 전에 아래 사항을 모두 확인하고, 하나라도 충족하지 않으면 **Cancel**을 누르세요.
   - 요청에 표시된 사이트가 `near.com`입니다. (1단계의 입금은 `solswap.org`에서 온 일반 Phantom 거래 요청이었으므로, այնտեղ에서도 같은 방식으로 이름을 확인하세요.)
   - **Message**를 열고 `"verifying_contract": "intents.near"`를 찾으세요.
   - 메시지는 스크린샷처럼 읽을 수 있는 텍스트여야 합니다. 읽을 수 없는 덩어리이거나 사이트가 주소 표시줄의 사이트와 다르면 거부하세요.
   - 시드 문구를 절대 요청하지 않습니다. 서명에는 시드 문구를 입력하는 과정이 없습니다.

![Phantom Sign Message request from near.com on the Solana network](/content-images/09-phantom-sign-message-cb1ce6d20f.webp)

6. near.com은 **Processing send**, **Sending**, **Complete**를 표시합니다. **View on explorer**는 전송의 NEAR Intents 기록을 엽니다.

![near.com status screen: Sending 0.0023 ZEC, all three steps complete](/content-images/10-nearcom-complete-c641093c46.webp)

![NEAR Intents explorer record: created 3:59:28 PM, withdrawn to the u1 address 4:07:55 PM, with the Zcash withdraw transaction ID](/content-images/11-intents-explorer-f93f87814e.webp)

### 테스트 비용과 소요 시간

| | 저희 테스트 |
|---|---|
| Phantom에서 입금한 ZEC | 0.00266336 ZEC |
| Zcash 지갑에서 받은 ZEC | 0.00241336 ZEC, 실드됨 |
| ZEC 측 비용 | 0.00025 ZEC (near.com은 “Fee 0 ZEC”로 표시했으며, 비용은 견적에 포함됨) |
| 입금에 사용한 SOL | 0.00156844 SOL, 이 중 0.00008 SOL은 네트워크 수수료 |
| 최소 금액 | 적용되지 않음. solswap은 최소 입금액을 0.00000001 ZEC로 표시했고 near.com은 0.0026 ZEC를 허용함 |
| 입금, Phantom에서 solswap까지 | 9초 |
| 출금, near.com에서 서명 후 Zcash 지갑의 ZEC까지 | 약 8분(near.com은 약 2분으로 예상) |

기록: Solana 입금 [5ijsgRrh…AjLkx](https://solscan.io/tx/5ijsgRrhViNTtFMmnsfJDSo3HhRmt3Ri7WB513oBoQLxfGNswDxvHnakwW1yyqXznTTCSxnUkooAHDKowz9AjLkx), NEAR Intents [79c23cfd…a405a9](https://explorer.near-intents.org/transactions/79c23cfd43928de5522c182e26f8f052dc9c43d53430ca497b40e016a6a405a9), 블록 3,498,141의 Zcash [28d6da27…481034](https://mainnet.zcashexplorer.app/transactions/28d6da27d74dc91e45175a7aff6023bc85578603dd77f1b49782a28f8f481034). 수수료와 시간은 네트워크 부하에 따라 바뀌므로, 실제 진행할 때는 검토 화면이 최종 기준입니다.

NEAR의 브리지는 표준 Zcash 출금에 대해 최소 0.01 ZEC와 수수료 0.00047 ZEC를 공시합니다. 하지만 near.com은 저희의 0.0026 ZEC에 둘 다 적용하지 않았습니다. 앱이 소액을 거부하면 충전하기 전에 near.com을 시도해 보세요.

### 다른 경로와 각 경로가 신뢰하는 대상

Solana에서 나가는 모든 경로는 브리지가 토큰을 뒷받침하는 ZEC를 보관하므로 OmniBridge를 신뢰합니다. 여기에 더해 다음이 적용됩니다.

- **위 경로**는 NEAR Intents를 신뢰합니다. 당신의 서명이 전송을 승인하고, 솔버가 Zcash 측의 ZEC를 전달하며, NEAR Intents는 규정 준수 검토를 위해 자금을 보류할 수 있습니다. 2026년에는 한 Zcash 보유자가 [몇 주 동안 보류된 대규모 스왑을 보고했습니다](https://www.cryptotimes.io/2026/09/11/zcash-holder-says-589k-usdt-stuck-on-near-intents-50-days-after-zodl-swap/). 또한 두 웹사이트에 지갑을 연결하므로 매번 주소 표시줄을 확인하세요.
- **NEAR Intents가 내장된 지갑**([디렉터리](/wallets)에서 NEAR Intents 기능을 찾으세요)은 Zcash 지갑 내부에서 같은 시스템을 사용합니다. 신뢰 대상은 같고 웹사이트는 더 적습니다. Solana의 ZEC로는 이를 테스트하지 않았습니다.
- **거래소**: Solana 네트워크에서 이 토큰의 입금을 받는 경우에만 가능하며, 대부분은 받지 않습니다. 수탁권과 보통 신원을 넘기게 되고, 많은 거래소는 `t1` 주소로만 ZEC를 보냅니다. [수탁형 거래소](/using-zcash/custodial-exchanges)를 참조하세요.

---

## 실드 여부 확인하기

실드된 상태로 도착했습니다. 저희 ZEC는 `u1` 주소로 갔으며 Ironwood 실드된 풀에 바로 도착했습니다. 투명 단계도 없었고 수동으로 실드할 것도 없었습니다. 확인을 수집하는 동안 16:07(UTC+1)에 지갑에는 실드 아이콘과 함께 **Receiving…**으로 표시되었습니다.

![Zcash wallet activity showing Receiving 0.00241336 ZEC with a shield icon](/content-images/12-zodl-receiving-cb9f41511d.webp)

직접 확인하려면 지갑에서 거래를 열고 거래 ID를 복사하세요.

![Zcash wallet transaction details with the transaction ID and timestamp](/content-images/13-zodl-tx-details-b08434d680.webp)

이를 [Zcash 블록 탐색기](https://mainnet.zcashexplorer.app)에 붙여 넣으세요. 요약 때문에 혼동하지 마세요. 저희 것은 **Shielded Inputs / Outputs 0 / 0** 및 **Transferred from/to shielded pool 0.0 ZEC**로 표시됩니다. 탐색기의 요약이 아직 Ironwood를 계산하지 않기 때문입니다. 보이는 `t1` 주소는 발신 측의 주소입니다(사용한 ZEC와 보관한 거스름돈). 당신의 주소가 아닙니다.

![Explorer summary for the transaction: two transparent inputs, one transparent output, 0/0 shielded](/content-images/14-explorer-summary-6153afb265.webp)

**Raw TX: JSON**을 클릭하고 `ironwood`를 검색하세요. այնտեղ의 음수 `valueBalance`는 Ironwood 풀이 받는 ZEC입니다. 저희 것은 정확히 도착한 금액인 `-0.00241336`였으며, 거래에는 누가 이를 받았는지 나타나지 않습니다.

![Raw transaction JSON with the ironwood section highlighted: valueBalance -0.00241336 (highlight added)](/content-images/15-explorer-raw-ironwood-8ff8ae0892.webp)

[블록 탐색기가 볼 수 있는 것](/zcash-tech/what-a-block-explorer-can-see)에서 나머지 필드를 설명합니다.

### `t1` 주소를 붙여 넣는 경우

저희는 그런 주소로 보내지 않았지만 결과는 예측 가능합니다. ZEC가 지갑의 투명 잔액에 도착하고, 탐색기는 누구에게나 당신의 `t1` 주소와 금액을 영구히 표시합니다. 자동 실드 기능이 있는 지갑은 이후 이를 실드된 풀로 옮깁니다. 그렇지 않다면 작은 네트워크 수수료가 드는 **Shield**를 누르세요. 실드 거래도 `t1` 주소에서 지출하므로 공개됩니다. 아무것도 잃지는 않지만, 그 입금과 지갑의 연결은 체인에 남습니다. `u1`를 붙여 넣으세요.

---

## 안전하게 이용하기

새 보유자는 표적이 됩니다. 보게 될 거의 모든 사기는 다음 중 하나입니다.

- **잘못된 주소 유형.** Zcash 주소는 `u1`, `t1`, `zs` 또는 `tex1`로 시작합니다. Solana 주소에는 이런 접두사가 없습니다. 네이티브 ZEC를 Solana 주소로 보내지 말고, Solana 토큰을 Zcash 주소로 보내지도 마세요.
- **투명 주소 전용 서비스.** 일부 브리지, 스왑 사이트 및 거래소는 `t1` 주소로만 보낼 수 있습니다. ZEC가 도착하자마자 실드한다면 사용할 수 있습니다. 단, այնտեղ에 남겨 두지 마세요.
- **가짜 지갑.** [지갑 디렉터리](/wallets) 카드의 링크 또는 그 링크가 가리키는 공식 앱 스토어 목록을 통해서만 설치하세요. 가짜 암호화폐 지갑 앱이 앱 스토어에 들어가는 경우가 있으며, 진짜와 똑같이 보입니다.
- **시드 문구 피싱.** 어떤 지갑, 브리지, 스왑 사이트, 지원 담당자, 운영자 또는 에어드롭도 시드 문구를 필요로 하지 않습니다. 메시지 서명에는 시드 문구를 입력하는 과정이 없습니다. 이를 요구하는 사람은 당신의 자산을 훔치려는 것입니다. [자금 복구](/using-zcash/recovering-funds)에서 이 사기의 “지갑을 복구해 드리겠습니다” 유형을 다룹니다.
- **사기 토큰과 “claim” 사이트.** ZEC, Zcash 또는 비슷한 이름의 토큰이 Solana 지갑에 요청 없이 나타날 수 있으며, 흔히 더 받으려면 “claim”하라는 링크가 포함됩니다. 해당 링크에 지갑을 연결하면 자산이 빠져나갈 수 있습니다. 이 페이지 상단의 계약 주소를 확인하고 나머지는 모두 무시하세요.
- **악성 서명 요청.** “Sign Message” 요청은 SOL 수수료 없이 NEAR Intents 잔액을 이동할 수 있습니다. `near.com` 또는 `solswap.org`에서만 서명하고, 메시지에 `intents.near`가 적혀 있을 때만 진행하세요(위 5단계에서 확인 방법을 보여 줍니다).
- **유사 사이트.** `solswap.org`와 `near.com`는 직접 입력하거나 북마크를 사용하세요. DM, 답글 또는 광고의 링크를 따르지 마세요.

---

## 실드된 ZEC로 할 수 있는 일

- 사용할 때 프라이버시를 유지하세요: [ZEC를 비공개로 사용하기](/guides/using-zec-privately)
- 이를 받는 곳을 찾으세요: [ZEC를 사용할 수 있는 곳](/using-zcash/spend-zcash/top-10-places-to-spend-zec)
- 비공개 메시지를 첨부해 보내세요: [메모](/using-zcash/memos)
- 신원을 연결하지 않고 누군가에게 송금하세요: [신원을 연결하지 않고 송금하기](/zcash-use-cases/send-money-without-linking-identity)
