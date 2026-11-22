# <img src="/content-images/programmer-software-engineer-coder-softw-bce5a0cb5b.svg" width="24" height="24" alt="developer icon"/> 거래정보 보호 ZEC로 AI 서비스를 비공개로 결제하기

<span className="inline-flex items-center gap-[6px]">
  <span className="inline-block w-[12px] h-[12px] bg-green-500 rounded-full"></span>
  초급 - 10분
</span>


## 요약

- **NanoGPT**는 계정이나 이메일 없이 거래정보 보호 ZEC를 바로 받습니다
- 최소 충전 금액은 **$0.10**이므로 소액으로 시험해 볼 수 있습니다
- 첫 번째 확인이 완료되면 약 **30초** 안에 잔액이 반영됩니다
- ZEC를 받지 않는 서비스에는 **CrossPay**를 사용해 거래정보 보호 ZEC를 쓰고 USDC로 결제할 수 있습니다
- 온체인에 기록되는 내용은 **ZEC가 어느 풀에 있는지**에 따라 달라지며, 화면에는 이 정보가 표시되지 않습니다

<br/>

## <img src="/content-images/user-svgrepo-com-21adf62b7c.svg" width="24" height="24" className="inline-block align-middle mr-1 p-[2px]" alt="user icon"/> 대상 독자

- AI 구독 서비스가 본인 이름과 연결되는 것을 원하지 않는 분
- 법인 카드 없이 추론 비용을 결제하는 개발자
- AI 서비스에 대한 카드 결제가 실패하는 국가에 거주하는 분
- 모델을 시험하기 위해 이메일을 제공하고 싶지 않은 분

<br/>

## <img src="/content-images/warning-error-svgrepo-com-b7ea8a50da.svg" width="24" height="24" className="inline-block align-middle mr-1 p-[2px]" alt="warning icon"/> 문제점

AI 서비스 요금은 보통 카드와 이메일, 계정으로 결제합니다. 그러면 작성하는 모든 프롬프트가 법적 신원과 연결되고, 결제 대행 서비스도 그 정보를 확인할 수 있습니다.

암호화폐가 이 문제를 해결해 줄 것으로 기대하지만, 대부분의 안내서는 오래되었습니다. 서비스가 지원하는 결제 수단은 바뀌며, 1년 전에 작성된 안내를 따라가면 더 이상 작동하지 않는 방법을 쓰게 될 수 있습니다.

<br/>

## <img src="/content-images/icons8-lock-2f8e221321.svg" width="24" height="24" className="inline-block align-middle mr-1 p-[2px]" alt="lock icon"/> Zcash를 사용하는 이유

거래정보 보호 결제에서는 송신자와 수신자, 금액이 감춰집니다. 서비스는 대금을 받지만, 체인을 지켜보는 사람은 누가 결제했는지 또는 얼마를 결제했는지 알 수 없습니다.

다만 거래정보 보호 자금에서 **결제할 때만** 이 점이 성립합니다. 이 페이지에서는 언제 성립하고 언제 성립하지 않는지 구체적으로 설명합니다.

<br/>

## <img src="/content-images/icons8-toolbox-9bebbb1619.svg" width="24" height="24" className="inline-block align-middle mr-1 p-[2px]" alt="toolbox icon"/> 준비물

- 거래정보 보호 잔액에 있는 ZEC
- 통합 주소로 전송할 수 있는 지갑. 이 안내에서는 브라우저 확장 프로그램인 **Noir Wallet**을 사용하므로 모든 과정이 하나의 창에서 진행됩니다. Zkool와 Zodl도 같은 방식으로 사용할 수 있습니다
- 따라 해 볼 수 있도록 약 $1

> **거래소에서 시작하시나요?** Binance를 비롯한 대부분의 거래소는 ZEC를 **투명** 주소로만 출금하며, `u1...` 주소를 출금 대상으로 받지 않습니다. 먼저 본인의 투명 주소로 출금한 다음, 지갑에서 거래정보를 보호하고 거래정보 보호 잔액에서 결제하세요.

<br/>

## <img src="/content-images/ladder-svgrepo-com-7232bf46ed.svg" width="24" height="24" className="inline-block align-middle mr-1 p-[2px]" alt="step icon"/> 경로 1: NanoGPT에 직접 결제하기

[NanoGPT](https://nano-gpt.com/)에서는 GPT, Claude, Gemini 및 이미지 모델을 포함한 200개 이상의 모델을 사용할 수 있으며, ZEC도 기본적으로 지원합니다.

### 1단계: 가입 없이 열기

nano-gpt.com으로 이동해 바로 사용하세요. 모든 세션은 기본적으로 익명이며, 앱에도 *“이미 NanoGPT를 비공개로 사용하고 있습니다.”*라고 표시됩니다. 만들 계정도, 제공할 이메일도 없습니다.

### 2단계: 먼저 로그인 토큰 저장하기

충전하기 전에 **Settings**를 열어 로그인 토큰을 만든 다음, 안전한 곳에 저장하세요.

> **이 단계는 자금을 보호합니다.** 익명 잔액은 브라우저의 로컬 데이터에 저장됩니다. 토큰을 저장하지 않은 채 쿠키를 삭제하면 잔액을 복구할 계정이 없으므로 잔액도 사라집니다. 입금한 뒤가 아니라 입금하기 전에 이 단계를 완료하세요.

### 3단계: 잔액 충전하기

**Balance**를 열고 **Custom**을 선택한 다음 금액을 입력하세요. 최소 금액은 **$0.10**, 최대 금액은 $5,000입니다. NanoGPT는 충전액으로 이용할 수 있는 내용을 알려 줍니다. 예를 들어 $1로 GPT 5.5 프롬프트 약 12개 또는 이미지 18개를 이용할 수 있습니다.

![NanoGPT add balance screen showing the custom amount and the ten cent minimum](/content-images/nanogpt-add-balance-acc74a4e6d.webp)

### 4단계: Zcash 선택하기

**Digital currencies**를 선택한 다음 목록에서 **Zcash**를 선택하세요.

선택한 금액에 해당하는 ZEC 기준의 QR 코드와 결제 주소, **최소 전송 금액**이 표시됩니다. 해당 금액은 페이지가 로드되는 시점의 환율을 기준으로 합니다.

![NanoGPT Zcash deposit screen with the QR code, unified address and transfer minimum](/content-images/nanogpt-zec-deposit-bd1980d2f7.webp)

### 5단계: 지갑에서 전송하기

주소를 복사해 지갑에 붙여넣고, 금액을 입력한 다음 전송하세요. 네트워크 수수료는 약 **0.00015 ZEC**입니다.

> **최소 금액보다 조금 더 보내세요.** 페이지가 로드될 때 표시된 금액으로 계산되며, 거래가 확인되기 전에 ZEC 가격이 변할 수 있습니다. 시험 결과, 최소 금액만 정확히 보내면 $1.00이 아니라 **$0.99**가 입금되었습니다. 조금 더 보냈을 때는 명목상 $1에 대해 $1.17이 입금되었습니다. NanoGPT는 실제로 보낸 금액을 반영하기 때문입니다.

![Noir Wallet send screen with the NanoGPT address pasted in and the network fee shown](/content-images/noir-send-6380a5f4ef.webp)

### 6단계: 약 30초 기다리기

지갑에 거래가 대기 중으로 표시된 다음 확인 중으로 바뀝니다. NanoGPT는 **첫 번째 확인**이 완료되면 잔액을 반영하므로 3번의 확인이 모두 끝날 때까지 기다릴 필요가 없습니다.

![Wallet confirmation showing the amount sent and the transaction hash](/content-images/noir-sent-2d476e94b9.webp)

잔액이 표시되면 바로 사용할 수 있습니다.

![NanoGPT balance page showing the credited amount and deposit history](/content-images/nanogpt-balance-0b0c0c86ba.webp)

<br/>

## <img src="/content-images/send-svgrepo-com-b62f643de0.svg" width="24" height="24" className="inline-block align-middle mr-1 p-[2px]" alt="send icon"/> 경로 2: ZEC를 받지 않는 서비스

대부분의 AI 서비스는 ZEC를 받지 않습니다. **Venice.ai**와 **OpenRouter**는 모두 USDC를 대신 받으며, OpenRouter에서는 결제 정산에 사용할 체인을 선택할 수 있습니다.

이런 서비스에는 [Zodl](/zcash-organizations/zodl)에서 **CrossPay**를 사용하세요. 거래정보 보호 ZEC를 사용하면 중앙화 거래소나 KYC 절차 없이 NEAR Intents를 거쳐 수신자가 요청한 자산으로 결제할 수 있습니다.

1. 서비스의 결제 주소와 서비스가 요구하는 자산 및 체인을 확인합니다. 예: Base의 USDC
2. Zodl를 열고 **CrossPay**을 선택합니다
3. 주소를 입력하고, 서비스가 원하는 자산을 선택한 다음 금액을 입력합니다
4. 거래정보 보호 잔액에서 전송합니다

ZEC가 거래정보 보호 상태에서 나갑니다. 서비스에는 일반적인 USDC 결제가 도착하는 것으로 보이며, 결제가 원래 ZEC에서 시작되었다는 사실은 알 수 없습니다.

> 스왑 과정은 도착지 체인에 공개되므로 USDC 결제 자체는 다른 USDC 결제와 마찬가지로 공개됩니다. 비공개로 유지되는 것은 Zcash 측 정보와 두 결제 간의 연결입니다.

<br/>

## <img src="/content-images/triangle-exclamation-7a4c4150be.svg" width="24" height="24" className="inline-block align-middle mr-1 p-[2px]" alt="warning icon"/> 단계별로 공개되는 정보

대부분의 안내서에서 빠뜨리는 내용입니다.

| 진행 상황 | 서비스가 알게 되는 정보 | 체인에 기록되는 정보 |
|---|---|---|
| 둘러보기 및 프롬프트 입력 | 없음. 계정도 이메일도 없음 | 없음 |
| 입금 주소 발급 | 없음 | 없음 |
| **Sapling에서 결제** | 사용한 입금 주소 | 없음. 거래정보 보호 상태에서 거래정보 보호 상태로 전송 |
| **Ironwood에서 결제** | 동일 | **금액과 블록 높이** |
| **투명 주소에서 결제** | 동일 | 금액과 t-주소 |
| 위의 모든 경우 | Tor 또는 VPN을 사용하지 않으면 IP 주소 | 해당 없음 |

### 풀이 중요한 이유

NanoGPT의 입금 주소는 통합 주소입니다. 2026년 8월에 발급된 주소를 디코딩하면 수신 주소가 정확히 2개임을 확인할 수 있습니다. **Sapling**와 **Orchard**입니다.

[Ironwood](/zcash-tech/ironwood) 업그레이드가 2026년 7월 28일 활성화된 이후, Orchard에서는 자금을 보내는 것만 가능하며 새로운 자금은 들어갈 수 없습니다. 따라서 실제로 결제를 받을 수 있는 수신 주소는 **Sapling뿐입니다**.

그러므로 ZEC가 이미 Sapling에 있다면, 결제는 Sapling에서 Sapling로 이루어지므로 공개되는 정보가 없습니다. 하지만 Ironwood로 옮긴 경우에는 결제 과정에서 한 풀의 경계를 넘어 자금이 이동하며, 송신자와 수신자는 계속 감춰지더라도 [턴스타일](/zcash-tech/the-turnstile)이 금액과 블록 높이를 공개합니다.

두 경우 모두 화면은 똑같이 보입니다. 결제용으로 소액의 Sapling 잔액을 보유하는 것이 가장 간단한 해결책입니다.

<br/>

## <img src="/content-images/icons8-cancel-7f786be3c1.svg" width="24" height="24" className="inline-block align-middle mr-1 p-[2px]" alt="cancel icon"/> 피해야 할 일반적인 실수

- 로그인 토큰을 저장하기 전에 입금한 다음 쿠키를 삭제하는 것
- 최소 전송 금액만 정확히 보내 1센트가 부족하게 입금되는 것
- 거래소에서 `u1...` 주소로 바로 출금하려고 하는 것
- 어떤 풀에서 자금을 사용했는지 확인하지 않고 결제가 비공개라고 여기는 것
- 신원을 드러내지 않는 것이 목적이었는데 일반 연결로 결제하는 것

<br/>

## <img src="/content-images/checked-checkbox-svgrepo-com-7ea19022da.svg" width="28" height="28" className="inline-block align-middle mr-1 p-[2px]" alt="done icon"/> 결과

다음을 할 수 있습니다.

- 계정이나 이메일, 카드 없이 최첨단 AI 모델을 사용합니다
- 거래정보 보호 ZEC로 결제하고 무엇이 감춰지고 감춰지지 않는지 정확히 파악합니다
- Zcash를 한 번도 들어 본 적 없는 서비스에도 CrossPay를 통해 결제합니다

<br/>

## <img src="/content-images/chain-for-links-svgrepo-com-117ee0dec1.svg" width="24" height="24" className="inline-block align-middle mr-1 p-[2px]" alt="chain-links icon"/> 관련 문서

- [Ironwood](/zcash-tech/ironwood) - 자금이 보관된 풀이 바뀐 이유
- [턴스타일](/zcash-tech/the-turnstile) - 풀 사이에서 자금이 이동할 때 공개되는 정보
- [지갑](/using-zcash/wallets) - 유지 관리 중인 지갑
- [ZODL](/zcash-organizations/zodl) - CrossPay의 기반이 되는 지갑

<br/>

## <img src="/content-images/progress-arrows-svgrepo-com-aad76739e5.svg" width="24" height="24" className="inline-block align-middle mr-1 p-[2px]" alt="progress icon"/> 진행 상황

**전체 1단계 중 1단계**

거래정보 보호 ZEC로 AI 서비스 요금을 결제했고, 어떤 정보가 공개되었는지 파악했습니다.

<br/>

## 다음 단계

- [신원 연결 없이 송금하기](/zcash-use-cases/send-money-without-linking-identity)

<br/>
