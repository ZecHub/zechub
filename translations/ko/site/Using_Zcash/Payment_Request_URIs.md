<a href="https://github.com/zechub/zechub/edit/main/site/Using_Zcash/Payment_Request_URIs.md" target="_blank">
  <img src="https://img.shields.io/badge/Edit-blue" alt="Edit Page"/>
</a>

# Zcash 결제 요청 URI

## 요약

* 결제 요청 URI는 `zcash:`로 시작하며 주소, 금액, 선택적 메모 등 결제 세부 정보를 담는 링크입니다.
* QR 코드 또는 클릭 가능한 링크로 공유하면 지갑이 결제 정보를 자동으로 입력합니다. 세부 정보를 확인한 뒤 승인하면 됩니다.
* [ZIP 321](https://zips.z.cash/zip-0321)은 형식을 정의합니다. 이는 Bitcoin의 BIP 21에서 발전했습니다.
* 하나의 요청으로 단일 트랜잭션에서 여러 수신자에게 결제할 수 있습니다.
* ZecHub는 결제 위젯과 생성기를 제공하므로, 상점은 URI를 직접 작성하지 않고도 Zcash 결제 버튼을 추가할 수 있습니다.

## 핵심 설명

결제 요청 URI는 [ZIP 321](https://zips.z.cash/zip-0321)에서 정의한 `zcash:` 링크입니다. 호환되는 지갑은 링크 또는 QR에서 주소, 금액, 선택적 메모를 읽어 트랜잭션을 미리 채웁니다. 별도의 계정이나 중간 처리업체가 필요하지 않습니다.

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

위젯 데모는 QR, 주소/URI 복사, 짧은 링크, 지갑에서 열기를 제공하는 실시간 ZIP-321 모달입니다. 먼저 주소와 금액을 직접 설정하려면 도구 페이지의 생성기를 사용하세요.

### 구성 요소

```
zcash:<address>?amount=<zec>&memo=<base64url>&label=<text>
```

| 필드 | 필수 여부 | 참고 사항 |
| --- | --- | --- |
| address | 예 | Unified Address(`u1` / `utest1`)를 권장 |
| amount | 아니요 | 구분자로 `.`를 사용하고 소수점 이하 최대 8자리까지 허용하는 십진 ZEC(`0.5`, `0,5` 아님) |
| memo | 아니요 | Shielded 주소에서만 사용할 수 있습니다. 메모의 UTF-8 바이트(최대 512개)를 `=` 패딩 없이 base64url로 인코딩합니다. 즉, `Thanks!`는 일반 텍스트가 아닌 `VGhhbmtzIQ`이 됩니다. |
| label | 아니요 | 일부 지갑에 표시되는 사람이 읽을 수 있는 이름입니다. 공백과 예약 문자는 퍼센트 인코딩하세요(`Coffee%20shop`). `+`는 공백이 아니라 리터럴 플러스 기호입니다. |

전체 규칙: [ZIP 321](https://zips.z.cash/zip-0321).

### 사용 사례

- 결제: 가격과 주문 메모를 미리 입력하여 고객이 지갑에서 확인만 하도록 합니다.
- 청구서: 링크 또는 QR 하나를 공유합니다.
- 기부: 사이트에 위젯을 삽입합니다.
- P2P: 채팅으로 `zcash:` 링크를 보냅니다.

### 사이트에 삽입하기

이 스크립트가 자신의 Shielded 주소를 가리키도록 설정하세요. 호스팅된 사본은 ZecHub에 있습니다.

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

Zcash으로 결제 요청을 만드는 방법:

<div className="my-8 w-full aspect-video max-w-3xl mx-auto rounded-2xl overflow-hidden shadow-lg bg-black">
  <iframe
    className="w-full h-full"
    src="https://www.youtube.com/embed/l5auYQIzYsQ"
    title="Zcash으로 결제 요청을 만드는 방법"
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
    title="웹사이트에 Zcash 기부 위젯 추가하기"
    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
    allowFullScreen
    loading="lazy"
  />
</div>

## 시각화 / 비유

계좌 번호, 금액, 그리고 결제 목적을 적는 메모 필드가 있는 은행 송금 양식을 생각해 보세요. 직접 입력하면 느리고, 숫자 하나만 틀려도 돈이 엉뚱한 곳으로 전송됩니다.

결제 요청 URI는 상점이 미리 작성한 그 양식입니다. QR 코드는 그 양식의 사진입니다. 휴대폰 카메라가 사진을 읽으면 지갑이 모든 필드를 제자리에 복사하고, 사용자는 숫자를 확인한 뒤 서명합니다.

웹페이지의 링크도 같은 역할을 합니다. 클릭하면 작성된 양식이 지갑으로 전달됩니다.

## 심층 분석

### 실제 예시

다음은 testnet용으로 작성된 ZIP 321의 예시입니다.

```
zcash:ztestsapling10yy2ex5dcqkclhc7z7yrnjq2z6feyjad56ptwlfgmy77dmaqqrl9gyhprdx59qgmsnyfska2kez?amount=1&memo=VGhpcyBpcyBhIHNpbXBsZSBtZW1vLg&message=Thank%20you%20for%20your%20purchase
```

하나의 Shielded Sapling 주소에 1 ZEC을 요청합니다. 메모를 디코딩하면 "This is a simple memo."가 됩니다. "Thank you for your purchase" 메시지는 지갑이 화면에 표시하는 텍스트입니다.

### 지갑이 확인하는 규칙

금액 형식은 엄격합니다. `amount=0.5` 및 `amount=50`은 유효합니다. `amount=50,000.00`, `amount=.5`, `amount=0.123456789`은 유효하지 않습니다. 마침표만 소수 구분자로 사용할 수 있으며, 그 뒤에는 최대 8자리까지만 올 수 있습니다. 금액은 21,000,000 ZEC을 초과할 수 없습니다.

원시 URI에서 메모는 base64url로 인코딩되며, 디코딩 후 최대 512바이트를 담을 수 있습니다. 투명 주소에 메모를 첨부하면 투명 주소는 메모를 담을 수 없으므로 전체 요청이 유효하지 않게 됩니다. Sprout 주소는 전혀 허용되지 않으며, ZIP 321 문법을 따르지 않는 요청은 거부해야 합니다.

위 표 외에 두 가지 필드가 더 있습니다. `message`은 지갑에 표시할 결제 설명입니다. `req-asset`은 ZIP 227에서 정의한 Custom Assets용으로 예약되어 있습니다.

### 여러 사람에게 한 번에 결제하기

각 추가 결제의 매개변수 이름에는 `address.1`, `amount.1`, `memo.1`처럼 인덱스 번호가 붙습니다. 지갑은 목록의 모든 사람에게 결제하는 하나의 트랜잭션을 만듭니다. 이는 결제를 분할하는 결제 과정이나 여러 기부금을 함께 보내는 경우에 유용합니다.

### 형식의 유래

Bitcoin에는 결제 요청을 위한 두 가지 이전 표준이 있습니다. 하나는 한 명의 수신자를 위한 간단한 링크인 BIP 21이고, 다른 하나는 복잡한 결제를 위한 더 무거운 프로토콜인 BIP 70입니다. ZIP 321은 여러 수신자를 담을 여지가 있는 링크 형식이라는 중간 경로를 택했습니다. 논의는 2018년 Zcash ZIPs 저장소에서 시작되었으며, BIP 21을 연상시키기 위해 번호 321이 선택되었습니다. ZIP 자체는 2020년 8월에 만들어졌습니다.

## 관련 페이지

- [메모](/using-zcash/memos): 결제 요청의 메모 필드 용도입니다.
- [결제 처리업체](/using-zcash/payment-processors): 상점을 대신해 결제를 처리하는 서비스입니다.
- [지갑](/using-zcash/wallets): Payment Request 필터를 사용해 이 링크를 읽는 지갑을 찾으세요.
- [Zcash Shielded Assets](/zcash-tech/zcash-shielded-assets): `req-asset`이 참조하는 Custom Assets입니다.
- [Zcash TEX 주소란 무엇인가요?](/using-zcash/transparent-exchange-addresses): 지갑이 결제 전에 읽는 또 다른 주소 규칙입니다.

**최종 업데이트:** 2026년 10월
