<a href="https://github.com/zechub/zechub/edit/main/site/Using_Zcash/Unified_Addresses.md" target="_blank">
  <img src="https://img.shields.io/badge/Edit-blue" alt="Edit Page"/>
</a>

# Birleşik Adresler

> Tüm Zcash için tek adres. Bunu paylaşın; gönderenin cüzdanı size ödeme yapmanın en özel yolunu bulur.

## Kısaca

* Bir birleşik adres (UA), Ironwood, Sapling ve şeffaf olmak üzere çeşitli alıcıları barındıran tek bir Zcash adresidir.
* Ana ağ UA'ları `u1` ile başlar. ZIP 316 bunları tanımladı ve 31 Mayıs 2022'deki NU5 yükseltmesiyle kullanıma sunuldular.
* Gönderenin cüzdanı, her iki cüzdanın da desteklediği en özel havuzu seçer. Havuzu hiçbir zaman kendiniz seçmezsiniz.
* Ironwood havuzu Temmuz 2026'da faaliyete geçtiğinde UA'nız çalışmaya devam etti. Yeni bir adres paylaşmanız gerekmedi.
* Cüzdanınız her gönderici için yeni bir UA oluşturabilir ve bunların hepsi aynı hesaba ödeme yapar.

## Temel Açıklama

Bir birleşik adres (UA), çeşitli alıcıları tek bir adreste birleştiren tek bir Zcash adresidir. Alıcılar, belirli bir değer havuzunda fon kabul eden adres bölümleridir: Ironwood, Sapling ve şeffaf. Bir UA ana ağda `u1` ile başlar ve [ZIP 316](https://zips.z.cash/zip-0316) içinde tanımlanmış, 31 Mayıs 2022'deki NU5 ağ yükseltmesiyle kullanıma sunulmuştur.

Birleşik adreslerden önce, ZEC almak adres türleri hakkında düşünmeyi gerektiriyordu. Bir `zs` adresi Sapling fonlarını, bir `t` adresi şeffaf fonları kabul ederdi ve türler arasında gönderim ek adımlar gerektirirdi. UA bunu sona erdirir. Tek bir adres paylaşırsınız, gerisini cüzdanlar halleder.

### Nasıl çalışır

Birisi UA'nıza gönderim yaptığında, cüzdanı içindeki alıcıları okur ve her iki cüzdanın da desteklediği en özel havuzu seçer:

1. Her iki cüzdan da mevcut korumalı havuzu destekliyorsa ödeme korumalı olarak ulaşır. Zincirde hiçbir şey herkese açık hâle gelmez.
2. Gönderen yalnızca eski bir havuzdan gönderebiliyorsa, cüzdan Sapling gibi ikinizin de paylaştığı en iyi alıcıya geri döner.
3. Gönderen yalnızca şeffaf fon gönderebiliyorsa ödeme, UA'nızın şeffaf alıcısına ulaşır ve cüzdanınız bunu oradan korumalı hâle getirebilir.

Bunu hiçbir zaman kendiniz yönetmezsiniz. Adres aynı kalır; yönlendirme onun içinde gerçekleşir.

### Bunun şimdi önemli olmasının nedeni

Zcash yükseltmelere devam ediyor. Ironwood havuzu 28 Temmuz 2026'da NU6.3 ile etkinleştirildiğinde, UA sahiplerinin yeni bir adrese ihtiyacı olmadı: cüzdanlar yalnızca zaten sahip oldukları adreslerin içindeki Ironwood alıcısını seçmeye başladı. Eski bağımsız adresleri olan kullanıcıların geçiş yapması gerekti. UA sahipleri hiçbir şey yapmadı.

Tasarım hedefi budur. Yeni havuzlar gelecekteki ağ yükseltmeleriyle gelir ve birleşik adres, hiç kimsenin adresleri yeniden paylaşmasına veya fonları elle taşımasına gerek kalmadan bunları içine alır. Güncel havuz listesini görmek için [Zcash değer havuzları](/using-zcash/shielded-pools) sayfasına bakın.

### Her gönderici için yeni bir adres

Cüzdanlar, tek bir hesap için çok sayıda çeşitlendirilmiş birleşik adres oluşturabilir. Her biri aynı fonlara ödeme yapar, ancak bunların hiçbiri zincir üzerinde birbiriyle ilişkilendirilemez. Size ödeme yapan her kişi veya hizmete farklı bir UA verin; böylece hiçbiri aynı cüzdana ödeme yaptıklarını öğrenmek için adresleri karşılaştıramaz.

## Görsel / Benzetme

Üç posta yuvası olan bir ön kapı düşünün. En yeni yuva mektupları kilitli bir kasaya bırakır (Ironwood). İkincisi onları kilitli bir çekmeceye bırakır (Sapling). Üçüncüsü ise onları herkesin pencereden okuyabileceği açık bir tepsiye bırakır (şeffaf).

Postacı, gönderenin cüzdanıdır. Geçebildiği en özel yuvayı kullanır. Kapı için tek bir adres verirsiniz ve eve yeni bir kasa eklendiğinde, kapıdaki adres aynı kalır.

## Ayrıntılı İnceleme

### İlgili araçlar

- **Görüntüleme anahtarları.** Her hesabın, harcama yetkisini paylaşmadan bir UA'nın ne aldığını (veya gönderdiği her şeyi) paylaşan birleşik görüntüleme anahtarları vardır. Önekler `uview` ve `uivk`. Bkz. [görüntüleme anahtarları](/zcash-tech/viewing-keys).
- **TEX adresleri.** Bazı borsalar, şu anda Binance, yatırımların şeffaf bir kaynaktan gelmesini gerektirir. Bir TEX adresi ([ZIP 320](https://zips.z.cash/zip-0320)), tam olarak bu durum için UA'nızın yalnızca şeffaf olan tamamlayıcısıdır. Bkz. [şeffaf borsa adresleri](/using-zcash/transparent-exchange-addresses).
- **Ödeme istekleri.** Bir UA, tutar ve not alanı önceden doldurulmuş bir ödeme isteği URI'sine gömülebilir. Bkz. [ödeme isteği URI'leri](/using-zcash/payment-request-uris).

### Kısa bilgiler

| | |
|---|---|
| Önek | `u1` (ana ağ) |
| Kodlama | bech32m |
| Tanımlandığı yer | [ZIP 316](https://zips.z.cash/zip-0316) |
| Kullanıma sunulma | NU5, 31 Mayıs 2022 |
| İçerik | Ironwood, Sapling ve şeffaf alıcılar |
| Harcama anahtarı | Hesap başına bir adet; hesabın tüm UA'ları tarafından paylaşılır |

Hangi cüzdanların birleşik adresleri desteklediğini [cüzdanlar](/wallets) sayfasından kontrol edin.

## Yaygın Hatalar

- **Eski bir `zs` veya `t` adresini paylaşmak.** Bağımsız bir adres yalnızca tek bir havuza ulaşır ve yenilerini kapsamaz. UA'nızı paylaşın.
- **Herkese aynı UA'yı vermek.** Size ödeme yapan iki kişi notlarını karşılaştırabilir ve aynı adresi görebilir. Her göndericiye cüzdanınızdan yeni bir UA verin.
- **Bir UA'ya yapılan her ödemenin özel olmasını beklemek.** Yalnızca şeffaf fon gönderebilen bir gönderici, şeffaf alıcınıza ödeme yapar ve bu ödeme herkese açıktır. Sonrasında cüzdanınızdan korumalı hâle getirin.

## İlgili Sayfalar

- [Korumalı Havuzlar](/using-zcash/shielded-pools): bir UA'daki her alıcının arkasındaki değer havuzları.
- [Birleşik Adresler (teknik)](/zcash-tech/unified-addresses): ZIP 316'nın bir UA'yı nasıl oluşturduğu ve kodladığı.
- [Görüntüleme Anahtarları](/zcash-tech/viewing-keys): harcama yetkisini paylaşmadan bir UA'nın ne aldığını paylaşın.
- [Şeffaf Borsa Adresleri](/using-zcash/transparent-exchange-addresses): şeffaf bir kaynağa ihtiyaç duyan borsalar için TEX biçimi.
- [Ödeme İsteği URI'leri](/using-zcash/payment-request-uris): tutarı ve not alanı doldurulmuş bir UA.
- [Cüzdanlar](/using-zcash/wallets): hangi cüzdanların birleşik adres oluşturduğu ve bunlara ödeme yaptığı.
- [Saklamasız Borsalar](/using-zcash/non-custodial-exchanges): bir takas cüzdanınıza ZEC ödediğinde kontrol edilmesi gerekenler.
- [Zcash Ödemenizi Kimler Görebilir](/start-here/who-can-see-your-zcash-payment): bir ödeme her alıcıyı kullandığında nelerin görünür kaldığı.

**Son güncelleme:** Ekim 2026
