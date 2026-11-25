<a href="https://github.com/zechub/zechub/edit/main/site/Using_Zcash/Unified_Addresses.md" target="_blank">
  <img src="https://img.shields.io/badge/Edit-blue" alt="Edit Page"/>
</a>

# Birleşik Adresler

> Zcash için tek bir adres. Bu adresi paylaşın; gönderenin cüzdanı size ödeme yapmak için en gizli yolu bulsun.

## Özet

* Birleşik adres (unified address, UA), birden fazla alıcı (receiver) içeren tek bir Zcash adrestir: Ironwood, Sapling ve şeffaf.
* Ana ağdaki UA'lar `u1` ile başlar. Bunları ZIP 316 tanımladı ve 31 Mayıs 2022'deki NU5 yükseltmesiyle kullanıma sunuldular.
* Gönderenin cüzdanı, her iki cüzdanın da desteklediği en gizli havuzu seçer. Havuzu kendiniz seçmezsiniz.
* Ironwood havuzu Temmuz 2026'da etkinleştiğinde UA'nız çalışmaya devam etti. Yeni bir adres paylaşmanız gerekmedi.
* Cüzdanınız her gönderen için yeni bir UA oluşturabilir; tüm ödemeler aynı hesaba ulaşır.

## Temel Açıklama

Birleşik adres (UA), birden fazla alıcıyı tek bir adreste bir araya getiren tek bir Zcash adrestir. Alıcılar, belirli bir değer havuzunda fon kabul eden adres bölümleridir: Ironwood, Sapling ve şeffaf. Ana ağda bir UA `u1` ile başlar ve [ZIP 316](https://zips.z.cash/zip-0316) ile tanımlanmış, 31 Mayıs 2022'deki NU5 ağ yükseltmesiyle kullanıma sunulmuştur.

Birleşik adreslerden önce, ZEC almak için adres türlerini düşünmeniz gerekiyordu. `zs` adres Sapling fonları, `t` adres şeffaf fonları kabul ediyordu ve türler arasında gönderim yapmak ek adımlar gerektiriyordu. UA bu sorunu ortadan kaldırır. Tek bir adres paylaşırsınız; gerisini cüzdanlar halleder.

### Nasıl çalışır

Birisi UA'nıza gönderim yaptığında, cüzdanı UA'nın içindeki alıcıları okur ve her iki cüzdanın da desteklediği en gizli havuzu seçer:

1. Her iki cüzdan da mevcut korumalı havuzu destekliyorsa ödeme korumalı olarak ulaşır. Zincire hiçbir şey açık biçimde yansımaz.
2. Gönderen yalnızca daha eski bir havuzdan gönderim yapabiliyorsa cüzdan, ikinizin de paylaştığı en iyi alıcıya, örneğin Sapling, geri döner.
3. Gönderen yalnızca şeffaf fon gönderebiliyorsa ödeme, UA'nızın şeffaf alıcısına ulaşır ve cüzdanınız fonları oradan korumalı havuza aktarabilir.

Bunları kendiniz yönetmezsiniz. Adres aynı kalır; yönlendirme adresin içinde gerçekleşir.

### Bugün neden önemli

Zcash sürekli yükseltiliyor. Ironwood havuzu 28 Temmuz 2026'da NU6.3 ile etkinleştiğinde, UA sahiplerinin yeni bir adrese ihtiyacı olmadı: cüzdanlar, kullanıcıların zaten sahip olduğu adreslerin içindeki Ironwood alıcıyı seçmeye başladı. Eski, tek başına kullanılan adreslere sahip kullanıcıların geçiş yapması gerekti. UA sahiplerinin hiçbir şey yapması gerekmedi.

Tasarımın amacı budur. Gelecekteki ağ yükseltmeleriyle yeni havuzlar kullanıma sunulur ve birleşik adres, kimsenin adresleri yeniden paylaşmasına veya fonları elle taşımasına gerek kalmadan bunları bünyesine katar. Mevcut havuzları görmek için [Zcash değer havuzları](/using-zcash/shielded-pools) sayfasına bakın.

### Her gönderen için yeni bir adres

Cüzdanlar tek bir hesap için çok sayıda çeşitlendirilmiş birleşik adres oluşturabilir. Her biri aynı fonlara ödeme alır, ancak zincir üstünde hiçbiri birbiriyle ilişkilendirilemez. Size ödeme yapan her kişiye veya hizmete farklı bir UA verin; böylece bu adresleri karşılaştırıp aynı cüzdana ödeme yaptıklarını anlayamazlar.

## Görsel / Benzetme

Üç posta kutusu olan bir ön kapı hayal edin. En yeni kutu mektupları kilitli bir kasaya bırakır (Ironwood). İkinci kutu onları kilitli bir çekmeceye bırakır (Sapling). Üçüncü kutu ise herkesin pencereden okuyabileceği açık bir tepsiye bırakır (şeffaf).

Postacı, gönderenin cüzdanıdır. İçinden geçebildiği en gizli kutuyu kullanır. Kapının adresini tek bir adres olarak paylaşırsınız ve eve yeni bir kasa eklendiğinde kapıdaki adres aynı kalır.

## Derinlemesine İnceleme

### İlgili araçlar

- **Görüntüleme anahtarları.** Her hesabın, harcama yetkisini paylaşmadan UA'nın aldığı bilgileri (veya gönderdiği her şeyi) paylaşan birleşik görüntüleme anahtarları vardır. Önekleri `uview` ve `uivk` şeklindedir. [görüntüleme anahtarları](/zcash-tech/viewing-keys) sayfasına bakın.
- **TEX adresleri.** Şu anda Binance dahil bazı borsalar, yatırılan fonların şeffaf bir kaynaktan gelmesini gerektirir. TEX adresi ([ZIP 320](https://zips.z.cash/zip-0320)), tam da bu durum için UA'nıza eşlik eden, yalnızca şeffaf ödemeleri kabul eden bir adrestir. [şeffaf borsa adresleri](/using-zcash/transparent-exchange-addresses) sayfasına bakın.
- **Ödeme istekleri.** Bir UA, önceden doldurulmuş tutar ve memo içeren bir ödeme isteği URI'sine yerleştirilebilir. [ödeme isteği URI'leri](/using-zcash/payment-request-uris) sayfasına bakın.

### Kısa bilgiler

| | |
|---|---|
| Önek | `u1` (ana ağ) |
| Kodlama | bech32m |
| Tanımlandığı ZIP | [ZIP 316](https://zips.z.cash/zip-0316) |
| Kullanıma sunulma | NU5, 31 Mayıs 2022 |
| İçerik | Ironwood, Sapling ve şeffaf alıcılar |
| Harcama anahtarı | Hesap başına bir tane; hesaba ait tüm UA'lar tarafından paylaşılır |

Hangi cüzdanların birleşik adresleri desteklediğini [cüzdanlar](/wallets) sayfasından kontrol edin.

## Sık Yapılan Hatalar

- **Eski bir `zs` veya `t` adresi paylaşmak.** Tek başına kullanılan bir adres yalnızca bir havuza ulaşır ve yeni havuzları desteklemez. UA'nızı paylaşın.
- **Herkese aynı UA'yı vermek.** Size ödeme yapan iki kişi adreslerini karşılaştırıp aynı adresi görebilir. Cüzdanınızdan her gönderene yeni bir UA verin.
- **UA'ya yapılan her ödemenin gizli olmasını beklemek.** Yalnızca şeffaf fon gönderebilen bir gönderici, şeffaf alıcınıza ödeme yapar ve bu ödeme herkese açık olur. Sonrasında cüzdanınızdan fonları korumalı havuza aktarın.

## İlgili Sayfalar

- [Korumalı Havuzlar](/using-zcash/shielded-pools): UA'daki her alıcının arkasındaki değer havuzları.
- [Birleşik Adresler (teknik)](/zcash-tech/unified-addresses): ZIP 316'nın UA'yı nasıl oluşturup kodladığı.
- [Görüntüleme Anahtarları](/zcash-tech/viewing-keys): Harcama yetkisini paylaşmadan UA'nın aldığı bilgileri paylaşın.
- [Şeffaf Borsa Adresleri](/using-zcash/transparent-exchange-addresses): Şeffaf bir kaynağa ihtiyaç duyan borsalar için TEX biçimi.
- [Ödeme İsteği URI'leri](/using-zcash/payment-request-uris): Tutarı ve memo'su doldurulmuş bir UA.
- [Cüzdanlar](/using-zcash/wallets): Hangi cüzdanların birleşik adres oluşturup bu adreslere ödeme yaptığı.
- [Gözetimsiz Borsalar](/using-zcash/non-custodial-exchanges): Bir takas ZEC tutarını cüzdanınıza gönderdiğinde nelere dikkat etmeniz gerektiği.
- [Zcash Ödemenizi Kimler Görebilir](/start-here/who-can-see-your-zcash-payment): Bir ödeme her alıcıyı kullandığında hangi bilgilerin görünür kaldığı.

**Son güncelleme:** Ekim 2026
