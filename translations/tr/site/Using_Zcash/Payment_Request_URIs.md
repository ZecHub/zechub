<a href="https://github.com/zechub/zechub/edit/main/site/Using_Zcash/Payment_Request_URIs.md" target="_blank">
  <img src="https://img.shields.io/badge/Edit-blue" alt="Sayfayı Düzenle"/>
</a>

# Zcash Ödeme Talebi URI'leri

## Kısaca

* Ödeme talebi URI'si, `zcash:` ile başlayan ve bir ödemenin ayrıntılarını taşıyan bir bağlantıdır: adres, tutar ve isteğe bağlı not.
* QR kodu veya tıklanabilir bağlantı olarak paylaşıldığında, cüzdanınızın ödemeyi sizin için doldurmasını sağlar. Ayrıntıları kontrol eder ve onaylarsınız.
* [ZIP 321](https://zips.z.cash/zip-0321) biçimi tanımlar. Bitcoin'in BIP 21'inden türemiştir.
* Tek bir talep, tek bir işlemde birden fazla alıcıya ödeme yapabilir.
* ZecHub bir ödeme widget'ı ve oluşturucu barındırır; böylece bir mağaza URI'yi elle yazmadan Zcash ödeme düğmesi ekleyebilir.

## Temel Açıklama

Ödeme talebi URI'si, [ZIP 321](https://zips.z.cash/zip-0321) tarafından tanımlanan bir `zcash:` bağlantısıdır. Uyumlu cüzdanlar bağlantı veya QR'deki adresi, tutarı ve isteğe bağlı notu okur ve bir işlemi önceden doldurur. Ek hesap yok, arada işlemci yok.

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

Widget demosu canlı bir ZIP-321 penceresidir: QR, adres/URI kopyalama, kısa bağlantı ve Cüzdanda Aç. Önce kendi adresinizi ve tutarınızı ayarlamak istiyorsanız, araçlar sayfası oluşturucudur.

### Yapı

```
zcash:<address>?amount=<zec>&memo=<base64url>&label=<text>
```

| Alan | Zorunlu | Notlar |
| --- | --- | --- |
| address | evet | Bir Unified Address (`u1` / `utest1`) tercih edin |
| amount | hayır | Ayırıcı olarak `.` kullanılan ve en fazla 8 ondalık basamağa sahip ondalık ZEC (`0.5`, `0,5` değil) |
| memo | hayır | Yalnızca shielded adresler. Notun UTF-8 baytları (en fazla 512), `=` dolgusu olmadan base64url ile kodlanır: `Thanks!`, düz metin yerine `VGhhbmtzIQ` olur |
| label | hayır | Bazı cüzdanların gösterdiği, insanlarca okunabilir ad. Boşlukları ve ayrılmış karakterleri yüzde kodlayın (`Coffee%20shop`); `+` değişmezi bir artı işaretidir, boşluk değildir |

Tam kurallar: [ZIP 321](https://zips.z.cash/zip-0321).

### Kullanım alanları

- Ödeme: müşteri yalnızca cüzdanında onaylasın diye fiyatı ve sipariş notunu önceden doldurun
- Faturalar: tek bağlantı veya QR paylaşın
- Bağışlar: widget'ı bir siteye yerleştirin
- P2P: sohbette bir `zcash:` bağlantısı gönderin

### Bir siteye yerleştirme

Bu betiği kendi shielded adresinize yönlendirin. Barındırılan kopya ZecHub üzerinde bulunur:

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

Zorunlu: `data-address`, `data-amount`, `data-target`.

Önce barındırılan düğmeyi deneyin: [Ödeme widget'ını aç](/zcash-payment-uri).

### Videolar

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

## Görsel / Benzetme

Hesap numarası, tutar ve ödemenin ne için olduğunu belirten bir not alanlarına sahip bir banka havalesi formu düşünün. Elle doldurmak yavaştır ve tek bir yanlış rakam parayı yanlış yere gönderir.

Ödeme talebi URI'si, mağazanın doldurduğu bu formdur. QR kodu formun fotoğrafıdır. Telefonunuzun kamerası fotoğrafı okur, cüzdan her alanı yerine kopyalar, siz de rakamları kontrol edip imzalarsınız.

Bir web sayfasındaki bağlantı da aynı işi yapar. Buna tıklamak, doldurulmuş formu cüzdanınıza iletir.

## Derinlemesine İnceleme

### Gerçek bir örnek

İşte testnet için yazılmış, ZIP 321'den bir örnek:

```
zcash:ztestsapling10yy2ex5dcqkclhc7z7yrnjq2z6feyjad56ptwlfgmy77dmaqqrl9gyhprdx59qgmsnyfska2kez?amount=1&memo=VGhpcyBpcyBhIHNpbXBsZSBtZW1vLg&message=Thank%20you%20for%20your%20purchase
```

Bir shielded Sapling adresine 1 ZEC talep eder. Notun kodu "This is a simple memo." olarak çözülür. "Thank you for your purchase" mesajı, cüzdanın ekranda gösterdiği metindir.

### Cüzdanın kontrol ettiği kurallar

Tutar biçimi katıdır. `amount=0.5` ve `amount=50` geçerlidir. `amount=50,000.00`, `amount=.5` ve `amount=0.123456789` geçersizdir: tek ondalık ayırıcı nokta olabilir ve noktadan sonra en fazla 8 basamak bulunabilir. Hiçbir tutar 21.000.000 ZEC değerini aşamaz.

Ham URI'de not base64url ile kodlanır ve kodu çözüldüğünde en fazla 512 bayt tutabilir. Transparent bir adrese eklenen not, transparent adresler not taşıyamadığı için tüm talebi geçersiz kılar. Sprout adreslerine hiç izin verilmez ve ZIP 321 dilbilgisine uymayan bir talep reddedilmelidir.

Yukarıdaki tablonun ötesinde iki alan daha vardır. `message`, cüzdanın göstermesi için ödemenin açıklamasıdır. `req-asset`, ZIP 227'de tanımlandığı üzere Custom Assets için ayrılmıştır.

### Aynı anda birden fazla kişiye ödeme

Her ek ödemeye parametre adlarına eklenen bir dizin numarası verilir; örneğin `address.1`, `amount.1` ve `memo.1`. Cüzdan, listedeki herkese ödeme yapan tek bir işlem oluşturur. Bu, ödemeyi bölen bir ödeme süreci veya birlikte gönderilen bir grup bağış için kullanışlıdır.

### Biçimin kaynağı

Bitcoin'in ödeme talepleri için iki eski standardı vardır: tek alıcıya yönelik basit bir bağlantı olan BIP 21 ve karmaşık ödemelere yönelik daha ağır bir protokol olan BIP 70. ZIP 321, birden fazla alıcıya yer açan bağlantı biçimiyle orta yolu seçer. Tartışma 2018'de Zcash ZIP'ler deposunda başladı; burada 321 numarası BIP 21'i çağrıştırması için seçildi ve ZIP Ağustos 2020'de oluşturuldu.

## İlgili Sayfalar

- [Notlar](/using-zcash/memos): ödeme talebindeki not alanının ne işe yaradığı.
- [Ödeme İşlemcileri](/using-zcash/payment-processors): mağazalar için ödemeleri işleyen hizmetler.
- [Cüzdanlar](/using-zcash/wallets): bu bağlantıları okuyan cüzdanları bulmak için Payment Request filtresini kullanın.
- [Zcash Shielded Assets](/zcash-tech/zcash-shielded-assets): `req-asset` öğesinin atıfta bulunduğu Custom Assets.
- [Zcash TEX Adresleri Nedir?](/using-zcash/transparent-exchange-addresses): cüzdanınızın ödeme yapmadan önce okuduğu başka bir adres kuralı.

**Son güncelleme:** Ekim 2026
