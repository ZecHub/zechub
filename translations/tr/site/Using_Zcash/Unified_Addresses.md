<a href="https://github.com/zechub/zechub/edit/main/site/Using_Zcash/Unified_Addresses.md" target="_blank">
  <img src="https://img.shields.io/badge/Edit-blue" alt="Sayfayı Düzenle"/>
</a>

# Unified Address

> Tüm Zcash için tek bir adres. Paylaşın; göndericinin cüzdanı size ödeme yapmanın en gizli yolunu bulur.

Bir unified address (UA), birkaç alıcıyı tek bir adreste bir araya getiren tek bir Zcash adresidir. Alıcılar, belirli bir değer havuzunda fon kabul eden adres parçalarıdır: Ironwood, Sapling ve şeffaf. Bir UA, ana ağda `u1` ile başlar ve 31 Mayıs 2022'deki NU5 ağ yükseltmesiyle sunulan [ZIP 316](https://zips.z.cash/zip-0316) içinde tanımlanmıştır.

Unified address'lerden önce, ZEC almak adres türlerini düşünmeyi gerektiriyordu. Bir `zs` adresi Sapling fonlarını, bir `t` adresi şeffaf fonları kabul ederdi ve türler arasında gönderim yapmak ek adımlar gerektirirdi. UA bunu sona erdirir. Tek bir adres paylaşırsınız; gerisini cüzdanlar halleder.

## Nasıl çalışır

Birisi UA'nıza gönderim yaptığında, cüzdanı içindeki alıcıları okur ve her iki cüzdanın da desteklediği en gizli havuzu seçer:

1. Her iki cüzdan da mevcut shielded havuzu destekliyorsa ödeme shielded olarak ulaşır. Zincirde hiçbir şey herkese açık olmaz.
2. Gönderici yalnızca daha eski bir havuzdan gönderim yapabiliyorsa cüzdan, Sapling gibi ikinizin de paylaştığı en iyi alıcıya geri döner.
3. Gönderici yalnızca şeffaf fon gönderebiliyorsa ödeme UA'nızın şeffaf alıcısına ulaşır ve cüzdanınız bunu oradan shielded hâle getirebilir.

Bunu asla kendiniz yönetmezsiniz. Adres aynı kalır; yönlendirme onun içinde gerçekleşir.

## Neden şimdi önemli

Zcash yükseltmelere devam ediyor. Ironwood havuzu 28 Temmuz 2026'da NU6.3 ile etkinleştiğinde, UA sahiplerinin yeni bir adrese ihtiyacı olmadı: cüzdanlar yalnızca insanların zaten sahip olduğu adreslerin içindeki Ironwood alıcısını seçmeye başladı. Eski bağımsız adresleri tutan kullanıcıların geçiş yapması gerekti. UA sahipleri hiçbir şey yapmadı.

Tasarım hedefi budur. Yeni havuzlar gelecekteki ağ yükseltmeleriyle gelir ve unified address, hiç kimse adresleri yeniden paylaşmak veya fonları elle taşımak zorunda kalmadan bunları içerir. Güncel havuz dizilimi için [Zcash değer havuzları](/using-zcash/shielded-pools) sayfasına bakın.

## Her gönderici için yeni bir adres

Cüzdanlar, tek bir hesap için birçok çeşitlendirilmiş unified address oluşturabilir. Her biri aynı fonlara ödeme yapar, ancak bunların hiçbiri zincir üzerinde birbirine bağlanamaz. Size ödeme yapan her kişi veya hizmet için farklı bir UA verin; hiçbir ikili, aynı cüzdanı ödediklerini öğrenmek için adresleri karşılaştıramaz.

## İlgili araçlar

- **Viewing key'ler.** Her hesap, harcama yetkisini paylaşmadan bir UA'nın ne aldığını (veya ne gönderdiğinin tamamını) paylaşan birleşik viewing key'lere sahiptir. Önekler `uview` ve `uivk`. Bkz. [viewing key'ler](/zcash-tech/viewing-keys).
- **TEX adresleri.** Şu anda Binance olmak üzere bazı borsalar, yatırımların şeffaf bir kaynaktan gelmesini ister. Bir TEX adresi ([ZIP 320](https://zips.z.cash/zip-0320)), tam olarak bu durum için UA'nızın yalnızca şeffaf olan eşlikçi adresidir. Bkz. [şeffaf borsa adresleri](/using-zcash/transparent-exchange-addresses).
- **Ödeme istekleri.** Bir UA, tutar ve not önceden doldurulmuş şekilde bir ödeme isteği URI'sine gömülebilir. Bkz. [ödeme isteği URI'leri](/using-zcash/payment-request-uris).

## Kısa bilgiler

| | |
|---|---|
| Önek | `u1` (ana ağ) |
| Kodlama | bech32m |
| Tanımlandığı yer | [ZIP 316](https://zips.z.cash/zip-0316) |
| Sunulduğu tarih | NU5, 31 Mayıs 2022 |
| İçerir | Ironwood, Sapling ve şeffaf alıcılar |
| Harcama anahtarı | Hesap başına bir tane; tüm UA'ları tarafından paylaşılır |

Hangi cüzdanların unified address'leri desteklediğini [cüzdanlar](/wallets) sayfasından kontrol edin.
