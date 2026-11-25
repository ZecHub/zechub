<a href="https://github.com/zechub/zechub/edit/main/site/Using_Zcash/Payment_Request_URIs.md" target="_blank">
  <img src="https://img.shields.io/badge/Edit-blue" alt="Sayfayı düzenle"/>
</a>

# Zcash Ödeme İsteği URI'leri

## Kısaca

* Ödeme isteği URI'si, `zcash:` ile başlayan ve bir ödemenin ayrıntılarını taşıyan bir bağlantıdır: adres, tutar ve isteğe bağlı bir memo.
* QR kodu veya tıklanabilir bağlantı olarak paylaşıldığında cüzdanınızın ödeme bilgilerini sizin için doldurmasını sağlar. Ayrıntıları kontrol eder ve onaylarsınız.
* [ZIP 321](https://zips.z.cash/zip-0321) biçimi tanımlar. Bitcoin'in BIP 21 standardından türemiştir.
* Tek bir istek, birden fazla alıcıya tek bir işlemde ödeme yapabilir.
* ZecHub bir ödeme bileşeni ve oluşturucu barındırır; böylece bir mağaza, URI'yi elle yazmadan Zcash ödeme düğmesi ekleyebilir.

## Temel Açıklama

Ödeme isteği URI'si, [ZIP 321](https://zips.z.cash/zip-0321) tarafından tanımlanan bir `zcash:` bağlantıdır. Uyumlu cüzdanlar bağlantıdan veya QR kodundan adresi, tutarı ve isteğe bağlı memoyu okuyup bir işlemin alanlarını önceden doldurur. Ek hesap gerekmez, arada ödeme işlemcisi yoktur.

<div className="my-6 flex flex-wrap items-center gap-3">
  <a
    href="/zcash-payment-uri"
    className="inline-flex items-center justify-center rounded-xl bg-[#F4B728] px-5 py-3 text-sm font-semibold text-zinc-900 no-underline shadow-sm hover:bg-[#e5a420]"
  >
    Ödeme bileşenini aç
  </a>
  <a
    href="/tools"
    className="inline-flex items-center justify-center rounded-xl border border-slate-300 dark:border-zinc-600 px-5 py-3 text-sm font-semibold text-slate-800 dark:text-zinc-100 no-underline hover:bg-slate-50 dark:hover:bg-zinc-800"
  >
    Ödeme isteği oluştur
  </a>
</div>

Bileşen demosu, QR kodu, adresi/URI'yi kopyalama, kısa bağlantı ve Cüzdanda Aç seçenekleri sunan canlı bir ZIP-321 penceresidir. Araçlar sayfası, önce kendi adresinizi ve tutarınızı belirlemek istediğinizde kullanabileceğiniz oluşturucudur.

### Yapısı

```
zcash:<address>?amount=<zec>&memo=<base64url>&label=<text>
```

| Alan | Gerekli | Notlar |
| --- | --- | --- |
| address | evet | Birleşik Adres'i tercih edin (`u1` / `utest1`) |
| amount | hayır | Ondalık ZEC; ayırıcı olarak `.` kullanılır ve en fazla 8 ondalık basamak olabilir (`0.5`, `0,5` değil) |
| memo | hayır | Yalnızca korumalı adreslerde kullanılır. Memodaki UTF-8 baytları (en fazla 512), `=` dolgusu olmadan base64url biçiminde kodlanır: `Thanks!`, düz metin değil, `VGhhbmtzIQ` olur |
| label | hayır | Bazı cüzdanların gösterdiği, insanlar tarafından okunabilir ad. Boşlukları ve ayrılmış karakterleri yüzde kodlamasıyla kodlayın (`Coffee%20shop`); `+`, boşluk değil, artı işaretidir |

Kuralların tamamı: [ZIP 321](https://zips.z.cash/zip-0321).

### Kullanım alanları

- Ödeme: Müşterinin yalnızca cüzdanında onaylaması için fiyatı ve sipariş memosunu önceden doldurun
- Faturalar: Tek bir bağlantı veya QR kodu paylaşın
- Bağışlar: Bileşeni bir siteye yerleştirin
- P2P: Sohbette `zcash:` bağlantısı gönderin

### Bir siteye yerleştirme

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

Gerekenler: `data-address`, `data-amount`, `data-target`.

Önce barındırılan düğmeyi deneyin: [Ödeme bileşenini aç](/zcash-payment-uri).

### Videolar

Zcash ile Ödeme İstekleri nasıl oluşturulur:

<div className="my-8 w-full aspect-video max-w-3xl mx-auto rounded-2xl overflow-hidden shadow-lg bg-black">
  <iframe
    className="w-full h-full"
    src="https://www.youtube.com/embed/l5auYQIzYsQ"
    title="Zcash ile Ödeme İstekleri nasıl oluşturulur"
    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
    allowFullScreen
    loading="lazy"
  />
</div>

Web sitenize Zcash Bağış Bileşeni ekleme:

<div className="my-8 w-full aspect-video max-w-3xl mx-auto rounded-2xl overflow-hidden shadow-lg bg-black">
  <iframe
    className="w-full h-full"
    src="https://www.youtube.com/embed/NbP4BcHC0uM"
    title="Web Sitenize Zcash Bağış Bileşeni Ekleme"
    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
    allowFullScreen
    loading="lazy"
  />
</div>

## Görsel Anlatım / Benzetme

Hesap numarası, tutar ve ödemenin ne için yapıldığını belirten bir not alanı bulunan banka havalesi formunu düşünün. Formu elle doldurmak yavaştır ve tek bir yanlış rakam parayı yanlış yere gönderir.

Ödeme isteği URI'si, mağazanın doldurduğu bu formdur. QR kodu formun fotoğrafıdır. Telefonunuzun kamerası fotoğrafı okur, cüzdan tüm alanları yerlerine kopyalar; siz de rakamları kontrol edip imzalarsınız.

Bir web sayfasındaki bağlantı da aynı işi görür. Tıkladığınızda doldurulmuş form cüzdanınıza gönderilir.

## Derinlemesine İnceleme

### Gerçek bir örnek

ZIP 321'den test ağı için hazırlanmış bir örnek:

```
zcash:ztestsapling10yy2ex5dcqkclhc7z7yrnjq2z6feyjad56ptwlfgmy77dmaqqrl9gyhprdx59qgmsnyfska2kez?amount=1&memo=VGhpcyBpcyBhIHNpbXBsZSBtZW1vLg&message=Thank%20you%20for%20your%20purchase
```

Tek bir korumalı Sapling adresine 1 ZEC gönderilmesini ister. Memo, “Bu basit bir memodur.” metnine çözülür. “Satın aldığınız için teşekkür ederiz” mesajı, cüzdanın ekranda gösterdiği metindir.

### Cüzdanın kontrol ettiği kurallar

Tutar biçimi katı kurallara tabidir. `amount=0.5` ve `amount=50` geçerlidir. `amount=50,000.00`, `amount=.5` ve `amount=0.123456789` geçersizdir: tek ondalık ayırıcı noktadır ve ondan sonra en fazla 8 basamak olabilir. Hiçbir tutar 21.000.000 ZEC değerini aşamaz.

Ham URI'de memo base64url biçiminde kodlanır ve çözüldüğünde en fazla 512 bayt olabilir. Şeffaf bir adrese eklenen memo tüm isteği geçersiz kılar; çünkü şeffaf adresler memo taşıyamaz. Sprout adreslere hiçbir koşulda izin verilmez ve ZIP 321 dilbilgisine uymayan istekler reddedilmelidir.

Yukarıdaki tabloda bulunmayan iki alan daha vardır. `message`, cüzdanın görüntülemesi için ödemenin açıklamasını içerir. `req-asset`, ZIP 227'de tanımlandığı üzere, Özel Varlıklar için ayrılmıştır.

### Aynı anda birden fazla kişiye ödeme yapma

Her ek ödemeye, parametre adlarına eklenen bir sıra numarası verilir; örneğin `address.1`, `amount.1` ve `memo.1`. Cüzdan, listedeki herkese ödeme yapan tek bir işlem oluşturur. Bu, ödemenin bölüştürüldüğü bir ödeme sayfasında veya birlikte gönderilen bir grup bağışta kullanışlıdır.

### Biçimin kökeni

Bitcoin'in ödeme istekleri için iki eski standardı vardır: tek alıcıya yönelik basit bir bağlantı olan BIP 21 ve karmaşık ödemeler için daha kapsamlı bir protokol olan BIP 70. ZIP 321, birden fazla alıcıya yer veren bağlantı biçimiyle orta yolu izler. Tartışma 2018'de Zcash ZIPs deposunda başladı; 321 numarası BIP 21'i çağrıştırması için seçildi ve ZIP ise Ağustos 2020'de oluşturuldu.

## İlgili Sayfalar

- [Memos](/using-zcash/memos): Ödeme isteğindeki memo alanının ne işe yaradığını öğrenin.
- [Ödeme İşlemcileri](/using-zcash/payment-processors): Mağazaların ödemelerini işleyen hizmetler.
- [Cüzdanlar](/using-zcash/wallets): Bu bağlantıları okuyabilen cüzdanları bulmak için Ödeme İsteği filtresini kullanın.
- [Zcash Korumalı Varlıklar](/zcash-tech/zcash-shielded-assets): `req-asset` ifadesinin gönderme yaptığı Özel Varlıklar.
- [Zcash TEX Adresleri Nedir?](/using-zcash/transparent-exchange-addresses): Cüzdanınızın ödeme yapmadan önce kontrol ettiği başka bir adres kuralı.

**Son güncelleme:** Ekim 2026
