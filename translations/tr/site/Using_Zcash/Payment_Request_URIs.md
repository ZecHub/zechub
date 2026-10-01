<a href="https://github.com/zechub/zechub/edit/main/site/Using_Zcash/Payment_Request_URIs.md" target="_blank">
  <img src="https://img.shields.io/badge/Edit-blue" alt="Sayfayı Düzenle"/>
</a>

# Zcash Ödeme Talebi URI'leri

Ödeme talebi URI'si, [ZIP 321](https://zips.z.cash/zip-0321) tarafından tanımlanan bir `zcash:` bağlantısıdır. Uyumlu cüzdanlar bağlantıdan veya QR'dan adresi, tutarı ve isteğe bağlı notu okur ve bir işlemi önceden doldurur. Ek hesap yok, arada işlemci yok.

<div className="my-6 flex flex-wrap items-center gap-3">
  <a
    href="/zcash-payment-uri"
    className="inline-flex items-center justify-center rounded-xl bg-[#F4B728] px-5 py-3 text-sm font-semibold text-zinc-900 no-underline shadow-sm hover:bg-[#e5a420]"
  >
    Ödeme widget'ını aç
  </a>
  <a
    href="/tools"
    className="inline-flex items-center justify-center rounded-xl border border-slate-300 dark:border-zinc-600 px-5 py-3 text-sm font-semibold text-slate-800 dark:text-zinc-100 no-underline hover:bg-slate-50 dark:hover:bg-zinc-800"
  >
    Ödeme talebi oluştur
  </a>
</div>

Widget demosu canlı bir ZIP-321 penceresidir: QR, adresi/URI'yi kopyalama, kısa bağlantı ve Cüzdanda Aç. Önce kendi adresinizi ve tutarınızı belirlemek istiyorsanız araçlar sayfası oluşturucudur.

## Yapısı

```
zcash:<address>?amount=<zec>&memo=<text>&label=<text>
```

| Alan | Gerekli | Notlar |
| --- | --- | --- |
| address | evet | Bir Unified Address (`u1` / `utest1`) tercih edin |
| amount | hayır | Ondalık ZEC |
| memo | hayır | Yalnızca korumalı transferler |
| label | hayır | Bazı cüzdanlar tarafından gösterilen, insan tarafından okunabilir ad |

Tüm kurallar: [ZIP 321](https://zips.z.cash/zip-0321).

## Kullanım alanları

- **Ödeme sayfası** — fiyatı ve sipariş notunu önceden doldurun; böylece müşteri yalnızca cüzdanında onay verir
- **Faturalar** — tek bir bağlantı veya QR paylaşın
- **Bağışlar** — widget'ı bir siteye gömün
- **P2P** — sohbette bir `zcash:` bağlantısı gönderin

## Bir siteye gömme

Bu betiği kendi korumalı adresinize yönlendirin. Barındırılan kopya ZecHub üzerinde bulunur:

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

Gerekli: `data-address`, `data-amount`, `data-target`.

Önce barındırılan düğmeyi deneyin: [Ödeme widget'ını aç](/zcash-payment-uri).

## Videolar

Zcash ile Ödeme Talepleri nasıl oluşturulur:

<div className="my-8 w-full aspect-video max-w-3xl mx-auto rounded-2xl overflow-hidden shadow-lg bg-black">
  <iframe
    className="w-full h-full"
    src="https://www.youtube.com/embed/l5auYQIzYsQ"
    title="Zcash ile Ödeme Talepleri nasıl oluşturulur"
    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
    allowFullScreen
    loading="lazy"
  />
</div>

Web sitenize bir Zcash Bağış Widget'ı eklemek:

<div className="my-8 w-full aspect-video max-w-3xl mx-auto rounded-2xl overflow-hidden shadow-lg bg-black">
  <iframe
    className="w-full h-full"
    src="https://www.youtube.com/embed/NbP4BcHC0uM"
    title="Web sitenize bir Zcash Bağış Widget'ı eklemek"
    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
    allowFullScreen
    loading="lazy"
  />
</div>
