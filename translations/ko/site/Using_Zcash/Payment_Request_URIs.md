<a href="https://github.com/zechub/zechub/edit/main/site/Using_Zcash/Payment_Request_URIs.md" target="_blank">
  <img src="https://img.shields.io/badge/Edit-blue" alt="Edit Page"/>
</a>

# Zcash 결제 요청 URI

결제 요청 URI는 [ZIP 321](https://zips.z.cash/zip-0321)에 정의된 `zcash:` 링크입니다. 호환되는 지갑은 링크 또는 QR에서 주소, 금액 및 선택적 메모를 읽어 거래를 미리 채웁니다. 추가 계정도, 중간 처리업체도 필요 없습니다.

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

위젯 데모는 QR, 주소/URI 복사, 단축 링크, 지갑에서 열기를 제공하는 실시간 ZIP-321 모달입니다. 먼저 직접 주소와 금액을 설정하려면 도구 페이지의 생성기를 사용하세요.

## 구성 요소

```
zcash:<address>?amount=<zec>&memo=<text>&label=<text>
```

| 필드 | 필수 | 참고 |
| --- | --- | --- |
| address | 예 | Unified Address(`u1` / `utest1`) 사용을 권장 |
| amount | 아니요 | 십진수 ZEC |
| memo | 아니요 | Shielded 전송 전용 |
| label | 아니요 | 일부 지갑에 표시되는 사람이 읽을 수 있는 이름 |

전체 규칙: [ZIP 321](https://zips.z.cash/zip-0321).

## 사용 사례

- **결제** — 고객이 지갑에서 확인만 하면 되도록 가격과 주문 메모를 미리 채웁니다
- **청구서** — 하나의 링크 또는 QR을 공유합니다
- **기부** — 사이트에 위젯을 삽입합니다
- **P2P** — 채팅으로 `zcash:` 링크를 보냅니다

## 사이트에 삽입하기

이 스크립트가 자신의 shielded 주소를 가리키도록 설정하세요. 호스팅된 사본은 ZecHub에 있습니다:

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

## 동영상

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
