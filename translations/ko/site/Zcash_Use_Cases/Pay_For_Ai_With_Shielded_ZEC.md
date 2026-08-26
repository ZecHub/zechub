# <img src="/content-images/programmer-software-engineer-coder-softw-bce5a0cb5b.svg" width="24" height="24" alt="developer icon"/> Shielded ZEC로 AI 서비스를 비공개로 결제하기

<span className="inline-flex items-center gap-[6px]">
  <span className="inline-block w-[12px] h-[12px] bg-green-500 rounded-full"></span>
  초급 - 10분
</span>


## TL;DR

- **NanoGPT**는 shielded ZEC를 계정도 이메일도 없이 직접 받습니다
- 최소 충전 금액은 **$0.10**이므로, 푼돈으로도 테스트할 수 있습니다
- 크레딧은 첫 번째 컨펌에서 약 **30초** 안에 들어옵니다
- ZEC를 받지 않는 서비스의 경우 **CrossPay**를 사용해 shielded ZEC를 쓰고, 상대방에게는 USDC로 결제되게 할 수 있습니다
- 실제로 체인에 남는 정보는 **당신의 ZEC가 어느 풀에 들어 있는지**에 따라 달라지며, 화면에는 그 차이가 전혀 표시되지 않습니다

<br/>

## <img src="/content-images/user-svgrepo-com-21adf62b7c.svg" width="24" height="24" className="inline-block align-middle mr-1 p-[2px]" alt="user icon"/> 이 문서는 누구를 위한 것인가요?

- 자신의 이름에 연결된 AI 구독을 원하지 않는 누구나
- 법인 카드 없이 추론 비용을 결제하는 개발자
- AI 서비스에 카드 결제가 실패하는 국가에 있는 사람들
- 모델을 써보기 위해 이메일을 넘기고 싶지 않은 누구나

<br/>

## <img src="/content-images/warning-error-svgrepo-com-b7ea8a50da.svg" width="24" height="24" className="inline-block align-middle mr-1 p-[2px]" alt="warning icon"/> 문제점

보통 AI 결제를 하려면 카드, 이메일, 계정이 필요합니다. 그러면 당신이 작성하는 모든 프롬프트가 법적 신원에 연결되고, 결제 처리업체도 그것을 보게 됩니다.

원래 Crypto는 이 문제를 해결해야 하지만, 대부분의 가이드는 이미 낡았습니다. 서비스는 지원하는 결제 수단을 바꾸고, 1년 전에 쓰인 안내문은 이제 더 이상 작동하지 않는 경로로 당신을 이끌 수 있습니다.

<br/>

## <img src="/content-images/icons8-lock-2f8e221321.svg" width="24" height="24" className="inline-block align-middle mr-1 p-[2px]" alt="lock icon"/> 왜 Zcash인가요?

shielded 결제는 발신자, 수신자, 금액을 숨깁니다. 서비스는 대금을 받지만, 체인을 지켜보는 누구도 누가 얼마를 결제했는지 알 수 없습니다.

하지만 이것은 오직 **shielded 자금에서** 결제할 때만 성립합니다. 이 페이지는 언제 이것이 성립하고 언제 그렇지 않은지를 구체적으로 설명합니다.

<br/>

## <img src="/content-images/icons8-toolbox-9bebbb1619.svg" width="24" height="24" className="inline-block align-middle mr-1 p-[2px]" alt="toolbox icon"/> 필요한 것

- **shielded** 잔액에 들어 있는 ZEC
- 통합 주소로 보낼 수 있는 지갑. 이 안내에서는 브라우저 확장 프로그램인 **Noir Wallet**을 사용하므로 전체 흐름이 한 창 안에서 유지됩니다. Zkool과 Zodl도 같은 방식으로 작동합니다
- 따라 해보려면 약 $1

> **거래소에서 보내는 건가요?** Binance를 포함한 대부분의 거래소는 ZEC를 **transparent** 주소로만 출금할 수 있으며, 목적지로 `u1...` 주소를 받지 않습니다. 먼저 자신의 transparent 주소로 출금한 다음, 지갑에서 이를 shield 처리하고, 그 shielded 잔액에서 결제하세요.

<br/>

## <img src="/content-images/ladder-svgrepo-com-7232bf46ed.svg" width="24" height="24" className="inline-block align-middle mr-1 p-[2px]" alt="step icon"/> 경로 1: NanoGPT에 직접 결제하기

[NanoGPT](https://nano-gpt.com/)는 GPT, Claude, Gemini, 이미지 모델을 포함해 200개 이상의 모델을 제공하며, ZEC를 네이티브로 받습니다.

### 1단계: 열기. 회원가입은 없습니다

nano-gpt.com으로 가서 바로 사용을 시작하세요. 모든 세션은 기본적으로 익명이며 앱 자체에도 그렇게 표시됩니다: *"You are already using NanoGPT privately."* 계정을 만들 필요도 없고 이메일을 넘길 필요도 없습니다.

### 2단계: 먼저 로그인 토큰을 저장하세요

돈을 넣기 전에 **Settings**를 열고 로그인 토큰을 만든 뒤, 안전한 곳에 보관하세요.

> **이 단계는 당신의 돈을 보호합니다.** 익명 잔액은 브라우저의 로컬 데이터에 저장됩니다. 저장된 토큰 없이 쿠키를 지우면 잔액은 사라지고, 복구할 계정도 없습니다. 입금한 뒤가 아니라 입금하기 전에 이 작업을 하세요.

### 3단계: 잔액 추가하기

**Balance**를 열고 **Custom**을 선택한 다음 금액을 입력하세요. 최소 금액은 **$0.10**이고 최대 금액은 $5,000입니다. NanoGPT는 그 돈으로 무엇을 살 수 있는지도 알려주며, $1이면 GPT 5.5 프롬프트 약 12개 또는 이미지 18개 정도입니다.

![사용자 지정 금액과 10센트 최소 금액이 표시된 NanoGPT 잔액 추가 화면](/content-images/nanogpt-add-balance-acc74a4e6d.webp)

### 4단계: Zcash 선택하기

**Digital currencies**를 고른 뒤, 그리드에서 **Zcash**를 선택하세요.

그러면 QR 코드, 결제 주소, 그리고 당신이 선택한 금액에 대한 ZEC 기준 **최소 전송 금액**이 표시됩니다. 이 수치는 페이지가 로드되는 시점의 가격으로 계산됩니다.

![QR 코드, 통합 주소, 최소 전송 금액이 표시된 NanoGPT Zcash 입금 화면](/content-images/nanogpt-zec-deposit-bd1980d2f7.webp)

### 5단계: 지갑에서 보내기

주소를 지갑에 복사해 넣고, 금액을 입력한 다음 전송하세요. 네트워크 수수료는 약 **0.00015 ZEC**입니다.

> **최소 금액보다 약간 더 보내세요.** 견적은 페이지가 로드될 때 계산되며, 트랜잭션이 컨펌되기 전에 ZEC 가격이 움직일 수 있습니다. 테스트에서는 정확히 최소 금액만 보냈더니 $1.00 대신 **$0.99**가 들어왔습니다. 반면 같은 명목상 $1에 대해 조금 더 보냈더니 $1.17이 들어왔는데, NanoGPT는 실제로 받은 금액을 기준으로 크레딧을 지급하기 때문입니다.

![NanoGPT 주소가 붙여넣어져 있고 네트워크 수수료가 표시된 Noir Wallet 전송 화면](/content-images/noir-send-6380a5f4ef.webp)

### 6단계: 약 30초 기다리기

지갑에는 트랜잭션이 대기 중으로 표시된 뒤 컨펌됩니다. NanoGPT는 **첫 번째 컨펌**에서 잔액을 반영하므로, 세 번 모두 기다릴 필요는 없습니다.

![전송 금액과 트랜잭션 해시가 표시된 지갑 확인 화면](/content-images/noir-sent-2d476e94b9.webp)

잔액이 표시되면 바로 사용할 수 있습니다.

![크레딧된 금액과 입금 내역이 표시된 NanoGPT 잔액 페이지](/content-images/nanogpt-balance-0b0c0c86ba.webp)

<br/>

## <img src="/content-images/send-svgrepo-com-b62f643de0.svg" width="24" height="24" className="inline-block align-middle mr-1 p-[2px]" alt="send icon"/> 경로 2: ZEC를 받지 않는 서비스

대부분의 AI 서비스는 ZEC를 받지 않습니다. **Venice.ai**와 **OpenRouter**는 둘 다 대신 USDC를 받으며, OpenRouter에서는 결제가 어느 체인에서 정산될지도 선택할 수 있습니다.

이런 경우 [Zodl](/zcash-organizations/zodl)의 **CrossPay**를 사용하세요. 당신은 shielded ZEC를 쓰고, 수신자는 자신이 요청한 자산으로 대금을 받게 되며, 이는 중앙화 거래소나 KYC 없이 NEAR Intents를 통해 라우팅됩니다.

1. 서비스의 결제 주소와, 그 서비스가 요구하는 자산 및 체인을 확인합니다. 예: Base의 USDC
2. Zodl을 열고 **CrossPay**를 선택합니다
3. 해당 주소를 입력하고, 서비스가 원하는 자산을 고른 뒤, 금액을 입력합니다
4. shielded 잔액에서 전송합니다

당신의 ZEC는 shielded 상태로 빠져나갑니다. 서비스 측에서는 일반적인 USDC 결제가 도착하는 것만 보며, 그것이 원래 ZEC였다는 사실은 알 수 없습니다.

> 스왑 구간 자체는 목적지 체인에서 보이므로, USDC 결제 자체는 다른 모든 USDC 결제와 마찬가지로 공개됩니다. 비공개로 유지되는 것은 Zcash 쪽과 둘 사이의 연결고리입니다.

<br/>

## <img src="/content-images/triangle-exclamation-7a4c4150be.svg" width="24" height="24" className="inline-block align-middle mr-1 p-[2px]" alt="warning icon"/> 각 단계에서 무엇이 드러나는가

이 부분을 대부분의 가이드는 건너뜁니다.

| 무엇이 일어나는가 | 서비스가 알게 되는 것 | 체인에 기록되는 것 |
|---|---|---|
| 브라우징과 프롬프팅 | 아무것도 없음. 계정도 이메일도 없음 | 아무것도 없음 |
| 입금 주소가 발급됨 | 아무것도 없음 | 아무것도 없음 |
| **Sapling에서** 결제함 | 당신이 사용한 입금 주소 | 아무것도 없음. Shielded에서 shielded로 |
| **Ironwood에서** 결제함 | 동일 | **금액과 블록 높이** |
| **transparent 주소에서** 결제함 | 동일 | 금액과 당신의 t-address |
| 위 어느 경우든 | Tor 또는 VPN을 사용하지 않으면 당신의 IP | 해당 없음 |

### 왜 풀이 중요한가

NanoGPT의 입금 주소는 통합 주소입니다. 2026년 8월에 발급된 주소 하나를 디코딩해 보면 정확히 두 개의 수신자가 있습니다: **Sapling**과 **Orchard**.

[Ironwood](/zcash-tech/ironwood) 업그레이드는 2026년 7월 28일에 활성화되었고, 그 이후 Orchard는 지출 전용이어서 더 이상 새로운 가치가 들어갈 수 없습니다. 즉, **실제로 결제가 도착할 수 있는 유일한 수신자는 Sapling**입니다.

따라서 당신의 ZEC가 이미 Sapling에 있다면, 결제는 Sapling에서 Sapling으로 이루어지며 이에 대해 공개되는 정보는 없습니다. 하지만 이미 Ironwood로 마이그레이션했다면, 결제는 풀 경계를 넘어서 가치를 이동시키게 되고, 발신자와 수신자는 숨겨져 있어도 [turnstile](/zcash-tech/the-turnstile)이 금액과 높이를 공개합니다.

어느 경우든 화면은 똑같아 보입니다. 결제용으로 소량의 Sapling 잔액을 유지하는 것이 가장 간단한 해결책입니다.

<br/>

## <img src="/content-images/icons8-cancel-7f786be3c1.svg" width="24" height="24" className="inline-block align-middle mr-1 p-[2px]" alt="cancel icon"/> 피해야 할 흔한 실수

- 로그인 토큰을 저장하기 전에 입금한 뒤 쿠키를 지우는 것
- 최소 전송 금액만 정확히 보내서 1센트 모자라게 되는 것
- 거래소에서 `u1...` 주소로 바로 출금하려고 하는 것
- 어느 풀에서 결제했는지 확인하지 않고 결제가 비공개라고 가정하는 것
- 식별당하지 않으려는 것이 목적이면서 일반 인터넷 연결로 결제하는 것

<br/>

## <img src="/content-images/checked-checkbox-svgrepo-com-7ea19022da.svg" width="28" height="28" className="inline-block align-middle mr-1 p-[2px]" alt="done icon"/> 결과

당신은 다음을 할 수 있습니다:

- 계정, 이메일, 카드 없이 최전선 AI 모델을 사용할 수 있습니다
- shielded ZEC로 결제하고, 그것이 무엇을 숨기고 무엇을 숨기지 않는지 정확히 이해할 수 있습니다
- CrossPay를 통해 Zcash를 전혀 들어본 적 없는 서비스에도 도달할 수 있습니다

<br/>

## <img src="/content-images/chain-for-links-svgrepo-com-117ee0dec1.svg" width="24" height="24" className="inline-block align-middle mr-1 p-[2px]" alt="chain-links icon"/> 관련 문서

- [Ironwood](/zcash-tech/ironwood) - 당신의 자금이 들어 있는 풀이 왜 바뀌었는지
- [The Turnstile](/zcash-tech/the-turnstile) - 가치가 풀을 넘을 때 무엇이 공개되는지
- [지갑](/using-zcash/wallets) - 어떤 지갑이 유지보수되고 있는지
- [ZODL](/zcash-organizations/zodl) - CrossPay를 지원하는 지갑

<br/>

## <img src="/content-images/progress-arrows-svgrepo-com-aad76739e5.svg" width="24" height="24" className="inline-block align-middle mr-1 p-[2px]" alt="progress icon"/> 진행 상황

**1 / 1 단계**

당신은 shielded ZEC로 AI 서비스 비용을 결제했고, 그 과정에서 무엇이 드러났는지 이해하고 있습니다.

<br/>

## 다음 단계

- [신원을 연결하지 않고 송금하기](/zcash-use-cases/send-money-without-linking-identity)

<br/>
