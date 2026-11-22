<a href="https://github.com/zechub/zechub/edit/main/site/Using_Zcash/Payment_Request_URIs.md" target="_blank">
  <img src="https://img.shields.io/badge/Edit-blue" alt="페이지 편집"/>
</a>

# Zcash 결제 요청 URI

## 핵심 요약

* 결제 요청 URI는 `zcash:`로 시작하며 주소, 금액, 선택적 메모 등 결제 정보를 담는 링크입니다.
* QR 코드나 클릭 가능한 링크로 공유하면 지갑에서 결제 정보를 자동으로 입력할 수 있습니다. 정보를 확인한 뒤 승인하면 됩니다.
* [ZIP 321](https://zips.z.cash/zip-0321)에서 형식을 정의합니다. 이 형식은 Bitcoin의 BIP 21을 바탕으로 만들어졌습니다.
* 요청 1개로 여러 수신자에게 한 번의 거래로 결제할 수 있습니다.
* ZecHub에서 결제 위젯과 생성기를 제공하므로, 상점은 URI를 직접 작성하지 않고도 Zcash 결제 버튼을 추가할 수 있습니다.

## 핵심 설명

결제 요청 URI(payment request URI)는 `zcash:` 링크로, [ZIP 321](https://zips.z.cash/zip-0321)에서 정의합니다. 호환되는 지갑은 링크나 QR 코드에서 주소, 금액, 선택적 메모를 읽어 거래 정보를 미리 입력합니다. 별도 계정도, 중간 결제 처리업체도 필요하지 않습니다.

<div className="my-6 flex flex-wrap items-center gap-3">
  <a
    href="/zcash-payment-uri"
    className="inline-flex items-center justify-center rounded-xl bg-[#F4B728] px-5 py-3 text-sm font-semibold text-zinc-900 no-underline shadow-sm hover:bg-[#e5a420]"
  >
    결제 위젯 열기
  </a>
  <a
    href="/tools"
    className="inline-flex items-center justify-center rounded-xl border border-slate-300 dark:border-zinc-600 px-5 py-3 text-sm font-semibold text-slate-800 dark:text-zinc-100 no-underline hover:bg-slate-50 dark:hover:bg-zinc-800"
  >
    결제 요청 만들기
  </a>
</div>

위젯 데모는 실제로 작동하는 ZIP-321 모달로, QR 코드, 주소/URI 복사, 단축 링크, 지갑에서 열기 기능을 제공합니다. 먼저 주소와 금액을 직접 설정하려면 도구 페이지의 생성기를 사용하세요.

### 구성

```
zcash:<address>?amount=<zec>&memo=<base64url>&label=<text>
```

| 항목 | 필수 여부 | 참고 |
| --- | --- | --- |
| address | 예 | 통합 주소(Unified Address, `u1` / `utest1`) 사용 권장 |
| amount | 아니요 | 소수 표기 ZEC. 소수점 구분 기호는 `.`이며, 소수점 아래 자릿수는 최대 8자리입니다(`0.5`, `0,5` 아님) |
| memo | 아니요 | 거래정보 보호 주소에만 해당합니다. 메모의 UTF-8 바이트(최대 512바이트)를 `=` 패딩 없이 base64url로 인코딩합니다. `Thanks!`는 일반 텍스트가 아니라 `VGhhbmtzIQ`가 됩니다 |
| label | 아니요 | 일부 지갑에서 표시되는 읽기 쉬운 이름입니다. 공백과 예약 문자(`Coffee%20shop`)는 퍼센트 인코딩합니다. `+`는 공백이 아니라 문자 그대로의 더하기 기호입니다 |

전체 규칙: [ZIP 321](https://zips.z.cash/zip-0321).

### 사용 사례

- 결제: 가격과 주문 메모를 미리 입력하여 고객이 지갑에서 확인만 하도록 합니다
- 청구서: 링크나 QR 코드 1개를 공유합니다
- 기부: 사이트에 위젯을 삽입합니다
- P2P: 채팅으로 `zcash:` 링크를 보냅니다

### 사이트에 삽입하기

이 스크립트가 본인의 거래정보 보호 주소를 가리키도록 설정하세요. 호스팅된 사본은 ZecHub에 있습니다.

```html
<div id="zcash-pay"></div>
<script
  src="https://zechub.wiki/zcash-payment-request-widget.embed.v2.js"
  data-target="#zcash-pay"
  data-address="u1..."
  data-amount="0.01"
  data-label="Pay with Zcash"
  data-memo="order-42"
  data-theme="dark"
  data-api-base="https://zechub.wiki/api"
></script>
```

필수 항목: `data-address`, `data-amount`, `data-target`.

먼저 호스팅된 버튼을 사용해 보세요: [결제 위젯 열기](/zcash-payment-uri).

### 동영상

Zcash로 결제 요청을 만드는 방법:

<div className="my-8 w-full aspect-video max-w-3xl mx-auto rounded-2xl overflow-hidden shadow-lg bg-black">
  <iframe
    className="w-full h-full"
    src="https://www.youtube.com/embed/l5auYQIzYsQ"
    title="How to make Payment Requests with Zcash"
    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
    allowFullScreen
    loading="lazy"
  />
</div>

웹사이트에 Zcash 기부 위젯 추가하기:

<div className="my-8 w-full aspect-video max-w-3xl mx-auto rounded-2xl overflow-hidden shadow-lg bg-black">
  <iframe
    className="w-full h-full"
    src="https://www.youtube.com/embed/NbP4BcHC0uM"
    title="Adding a Zcash Donation Widget to your Website"
    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
    allowFullScreen
    loading="lazy"
  />
</div>

## 시각적 비유

계좌 번호, 금액, 결제 사유를 적는 메모란이 있는 은행 송금 양식을 떠올려 보세요. 직접 작성하면 시간이 오래 걸리고, 숫자 하나만 잘못 입력해도 돈이 엉뚱한 곳으로 보내집니다.

결제 요청 URI는 상점에서 미리 작성한 양식과 같습니다. QR 코드는 양식의 사진입니다. 휴대폰 카메라가 사진을 읽으면 지갑이 각 항목을 자동으로 채우고, 사용자는 숫자를 확인한 뒤 서명합니다.

웹페이지의 링크도 같은 역할을 합니다. 링크를 클릭하면 내용이 채워진 양식이 지갑으로 전달됩니다.

## 자세히 알아보기

### 실제 예시

다음은 테스트넷용으로 작성된 ZIP 321의 예시입니다.

```
zcash:ztestsapling10yy2ex5dcqkclhc7z7yrnjq2z6feyjad56ptwlfgmy77dmaqqrl9gyhprdx59qgmsnyfska2kez?amount=1&memo=VGhpcyBpcyBhIHNpbXBsZSBtZW1vLg&message=Thank%20you%20for%20your%20purchase
```

ZEC 1개를 거래정보 보호(shielded) Sapling 주소 1개로 보내도록 요청합니다. 메모를 디코딩하면 “”This is a simple memo.””가 됩니다. “”Thank you for your purchase””는 지갑 화면에 표시되는 문구입니다.

### 지갑이 확인하는 규칙

금액 형식은 엄격합니다. `amount=0.5`와 `amount=50`은 유효합니다. `amount=50,000.00`, `amount=.5`, `amount=0.123456789`은 유효하지 않습니다. 소수점 구분 기호는 마침표만 사용할 수 있으며, 소수점 뒤에는 최대 8자리까지 쓸 수 있습니다. 금액은 ZEC 21,000,000개를 초과할 수 없습니다.

원시 URI에서 메모는 base64url로 인코딩되며, 디코딩 후 최대 512바이트까지 담을 수 있습니다. 투명 주소에는 메모를 첨부할 수 없으므로, 투명 주소에 메모가 붙어 있으면 요청 전체가 유효하지 않습니다. Sprout 주소는 사용할 수 없으며, ZIP 321 문법을 따르지 않는 요청은 거부해야 합니다.

위 표에 없는 필드가 2개 더 있습니다. `message`는 지갑에 표시할 결제 설명입니다. `req-asset`는 Custom Assets용으로 예약되어 있으며, ZIP 227에서 정의합니다.

### 여러 사람에게 한 번에 결제하기

추가 결제마다 매개변수 이름에 인덱스 번호가 붙습니다. 예를 들어 `address.1`, `amount.1`, `memo.1`와 같습니다. 지갑은 목록에 있는 모든 사람에게 결제하는 거래 1건을 만듭니다. 결제를 분할하는 주문이나 여러 건의 기부를 한꺼번에 보내는 경우에 유용합니다.

### 형식의 유래

Bitcoin에는 결제 요청을 위한 기존 표준이 2가지 있습니다. 수신자 1명을 위한 간단한 링크인 BIP 21과 복잡한 결제를 위한 더 무거운 프로토콜인 BIP 70입니다. ZIP 321은 여러 수신자를 포함할 수 있는 링크 형식으로, 두 표준의 중간 방식을 택했습니다. 논의는 2018년 Zcash ZIPs 저장소에서 시작되었으며, BIP 21을 연상시키도록 번호 321을 선택했습니다. ZIP 자체는 2020년 8월에 만들어졌습니다.

## 관련 페이지

- [메모](/using-zcash/memos): 결제 요청에서 메모 필드를 사용하는 방법입니다.
- [결제 지원 서비스](/using-zcash/payment-processors): 상점의 결제를 처리하는 서비스입니다.
- [지갑](/using-zcash/wallets): 결제 요청 필터를 사용해 이러한 링크를 읽을 수 있는 지갑을 찾아보세요.
- [Zcash 거래정보 보호 자산](/zcash-tech/zcash-shielded-assets): `req-asset`에서 참조하는 Custom Assets입니다.
- [Zcash TEX 주소란 무엇인가요?](/using-zcash/transparent-exchange-addresses): 결제 전에 지갑에서 확인하는 또 다른 주소 규칙입니다.

**마지막 업데이트:** 2026년 10월
