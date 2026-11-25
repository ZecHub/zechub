<a href="https://github.com/zechub/zechub/edit/main/site/Using_Zcash/Transactions.md" target="_blank">
  <img src="https://img.shields.io/badge/Edit-blue" alt="Sayfayı düzenle"/>
</a>


# İşlemler

ZEC, ödemeler için yaygın olarak kullanılan ve arkadaşlarınıza ödeme yapmak, alışveriş yapmak veya bağışta bulunmak gibi çeşitli işlemler için uygun güçlü gizlilik özellikleri sunan dijital bir varlıktır. Gizliliği ve güvenliği en üst düzeye çıkarmak için Zcash içindeki farklı işlem türlerinin nasıl çalıştığını anlamanız önemlidir.

## Kısaca

- Zcash iki tür işlemi destekler: Ayrıntıları gizli tutan **korumalı** işlemler ve herkese açık şekilde kaydeden **şeffaf** işlemler.
- Korumalı adresler `u` veya `z` ile başlar. Şeffaf adresler `t` ile başlar ve Bitcoin adresine çok benzer şekilde çalışır.
- Her ödemede seçim sizin. Gizlilik, Zcash'in size sunduğu bir seçenektir; başka birinin sizin adınıza belirlediği bir ayar değildir.
- Borsadan para çekmek, insanların gizliliğini en sık kaybettiği yerdir. Borsa yalnızca şeffaf çekimleri destekliyorsa, para hesabınıza ulaştıktan sonra kendiniz korumalı hâle getirin.
- Ücretler [ZIP 317](https://zips.z.cash/zip-0317) uyarınca belirlenir ve işlemin boyutuna göre artar. Eski sabit ücreti kullanmaya devam eden cüzdanların işlemleri gecikebilir.
- Çoğu Zcash işleminin sona erme yüksekliği [ZIP 203](https://zips.z.cash/zip-0203) uyarınca belirlenir. Bir işlem madencilik yapılmadan önce süresi dolarsa, bu yükseklikten sonra onaylanamaz ve yeniden gönderilmesi gerekebilir.

## Korumalı İşlemler

<div className="my-8 w-full aspect-video max-w-3xl mx-auto rounded-2xl overflow-hidden shadow-lg bg-black">
  <iframe
    className="w-full h-full"
    src="https://www.youtube.com/embed/bZM3o_eIovU"
    title="Zcash Açıklaması: Zcash Korumalı İşlemler"
    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
    allowFullScreen
    loading="lazy"
  />
</div>

---

Korumalı işlemler, ZEC'i korumalı cüzdanınıza aktardığınızda gerçekleşir. Korumalı cüzdan adresiniz `u` veya `z` ile başlar. Korumalı işlem gönderirken siz ve işlem yaptığınız kişiler, varsayılan olarak herkese açık ödeme ağlarında mümkün olmayan bir gizlilik düzeyini koruyabilirsiniz.

Korumalı işlem göndermenin en kolay yolu, güncel Zcash ağını ve güncel korumalı havuzları destekleyen bir cüzdan kullanmaktır. Gizlilik için bir cüzdana güvenmeden önce korumalı gönderimi, korumalı alımı ve kullanmayı planladığınız havuzu destekleyip desteklemediğini kontrol edin. Bir borsadan ZEC çekerken borsanın korumalı mı yoksa şeffaf çekimleri mi desteklediğini kontrol edin. Yalnızca şeffaf çekimleri destekliyorsa, para hesabınıza ulaştıktan sonra onu korumalı işlemleri destekleyen bir cüzdana aktarın.

Para gönderip almak için korumalı işlemleri kullanmak, gizliliği korumanın ve ödeme verilerinin açığa çıkma riskini azaltmanın en iyi yoludur.

## Şeffaf İşlemler

Şeffaf işlemler Bitcoin işlemlerine benzer şekilde çalışır. Şeffaf adresler ve şeffaf tutarlar da dâhil olmak üzere işlem ayrıntıları blokzincirde herkese açık şekilde görülebilir. Gizlilik öncelikliyse şeffaf işlemlerden kaçınılmalıdır.

Şeffaf adresler bazı durumlarda yine de kullanışlıdır; özellikle bir borsa veya hizmet korumalı adresleri desteklemiyorsa. ZEC'i şeffaf bir adrese alırsanız, daha sonra ödeme yapmadan önce korumalı hâle getirmeyi değerlendirin.

<div className="my-8 w-full aspect-video max-w-3xl mx-auto rounded-2xl overflow-hidden shadow-lg bg-black">
  <iframe
    className="w-full h-full"
    src="https://www.youtube.com/embed/R-krX1UpsIg"
    title="Zcash korumalı cüzdanları öğrenin!"
    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
    allowFullScreen
    loading="lazy"
  />
</div>

## Basit Bir Benzetme

Şeffaf bir işlem kartpostala benzer. Postacı kartpostalı teslim eder, ancak yol boyunca ona dokunan herkes mesajı okuyabilir, kimin gönderdiğini ve kimin alacağını görebilir.

Korumalı bir işlem kapalı bir zarfa benzer. Posta hizmeti, gerçek bir mektubun geçerli posta ücreti ödenerek sistemden geçtiğini doğrular; ayrıca hiç kimse sahte bir mektup düzenleyemez veya aynı mektubu iki kez gönderemez. Zarfın içindekiler göndericiyle alıcı arasında kalır.

Önemli olan, Zcash'in her ödeme için hangisini göndereceğinize sizin karar vermenizi sağlamasıdır.

## Zcash Ücretleri

Ağ ücretini cüzdanınızın hesaplamasına izin verin ve göndermeden önce ücreti inceleyin. Ücretler ZEC cinsinden ödenir: **1 ZEC = 100.000.000 zatoshi**. ABD doları cinsinden ücret ayrıca ZEC döviz kuruna bağlıdır.

### İki ödeme neden farklı ücretlere sahip olabilir?

[ZIP 317](https://zips.z.cash/zip-0317#fee-calculation), geleneksel ücreti gönderilen tutarın yüzdesine göre değil, **mantıksal eylemlere** göre hesaplar:

```text
fee in zatoshis = marginal fee × max(2, logical actions)
```

Mantıksal eylemler, işlemin bileşenlerini ölçer. Örneğin, yalnızca Orchard kullanan bir işlemde Orchard eylemlerinin sayısı esas alınır; yalnızca Sapling kullanan bir işlemde ise harcama ve çıktı sayılarından büyük olanı esas alınır. Farklı havuzlardan gelen katkılar toplanır. Şeffaf bileşenlerde boyuta dayalı hesaplama kullanılır. Ironwood ve eski Sprout dâhil olmak üzere formülün tamamı için ZIP 317'ye bakın.

Bu nedenle, alınan çok sayıda küçük note'u harcamak veya birden fazla havuz kullanmak, aynı değerdeki daha basit bir ödemeden daha pahalı olabilir. Alıcı sayısı tek başına ücret hesaplamak için yeterli değildir: Para üstü ve dolgu da önemlidir.

Bu örneklerde mantıksal eylem sayısı önceden hesaplanmıştır:

| Mantıksal eylem | Eylem başına 5.000 zatoshi | Eylem başına 1.000 zatoshi |
| --- | --- | --- |
| 2 | 10.000 zatoshi / 0,0001 ZEC | 2.000 zatoshi / 0,00002 ZEC |
| 3 | 15.000 zatoshi / 0,00015 ZEC | 3.000 zatoshi / 0,00003 ZEC |
| 10 | 50.000 zatoshi / 0,0005 ZEC | 10.000 zatoshi / 0,0001 ZEC |

### Hangi marjinal ücret geçerli?

**11 Kasım 2026'da kontrol edildi:** ZIP 317, revizyon 2'yi ve öneri olarak [ZIP 2009](https://zips.z.cash/zip-2009)'u listeliyor. Revizyon 2'den önce marjinal ücret 5.000 zatoshi'dir. Revizyon 2, 1.000 zatoshi ücret öngörür; böylece asgari ücret 10.000 yerine 2.000 zatoshi olur.

Öneri, Mainnet için **3.590.000** blok yüksekliğini (19 Kasım 2026 civarında bekleniyor) ve Testnet için **4.465.026** yüksekliğini belirtir. Takvim tahmini etkinleşme koşulu değildir. Cüzdanlar için önemli olan, işlemin madencilik yapılmasının beklendiği bloktur; düğümler bir sonraki bloğun yüksekliğini kullanır. Dağıtım süreci değiştikçe bağlantılı teknik özellikleri ve cüzdanınızın sürüm yönergelerini yeniden kontrol edin.

Sırf bir öneri veya yazılım sürümü bu ücretten söz ediyor diye düşük ücreti elle zorlamayın. ZIP 2009, cüzdanlar ücreti benimsemeden önce düğümlerin yeni aktarma politikasını yayımlamasını gerektirir; eski parametreleri kullanan düğümler, düşük ücretli işlemi aktarmayı reddedebilir. Testnet ve Mainnet için etkinleşme yükseklikleri de farklıdır.

### Tahmin yanlış görünüyorsa

Cüzdanınızın güncel ve eşitlenmiş olduğunu kontrol edin. Ağ ücretini, gönderim hizmetinin çekim ücretinden ayrı olarak karşılaştırın: Hizmetin verdiği ücret teklifi, ZIP 317 formülü değildir. Bekleyen bir ödeme için yeniden göndermeden önce aşağıdaki [sorun giderme adımlarını](#troubleshooting-stuck-transactions) uygulayın.

ZIP 317, bir cüzdan ve düğüm politikasıdır; tam olarak bu ücretin ödenmesini zorunlu kılan bir konsensüs kuralı değildir. Geleneksel ücreti ödemek, aktarma uyumluluğunu artırır; işlemin ne zaman onaylanacağını garanti etmez.

## Takılan İşlemlerde Sorun Giderme

Zcash işlemi, yalnızca cüzdanınızda göründüğü için kesinleşmiş olmaz. Bir bloğa madencilik yoluyla eklendikten ve durumunuz için yeterli sayıda onay aldıktan sonra olağan kullanım açısından kesinleşir. Borsalar ve hizmetler, cüzdanınızın varsayılan olarak gösterdiğinden daha fazla onay isteyebilir.

Sona erme, sabit bir geri sayım değil, **blok yüksekliğidir**. Sıfır olmayan sona erme yüksekliğine sahip olağan bir ödeme için bu yükseklik, ödemenin madencilik yoluyla eklenebileceği son bloktur. Örneğin, 3539 yüksekliğinde süresi dolan bir ödeme 3539 numaralı bloğa dâhil edilebilir; 3540 numaralı blok için artık çok geçtir. Sona erme yüksekliğinin 0 olması, olağan bir ödemenin süresinin dolmadığı anlamına gelir. Bkz. [ZIP 203](https://zips.z.cash/zip-0203).

Varsayılan değerler herkes için geçerli son tarihler değildir. ZIP 203, Blossom sonrasında 40 blok belirlemiştir; 75 saniyelik hedef blok aralığında bu yaklaşık 50 dakikadır. NU7 6 Kasım 2026'da etkinleştiğinden (3.543.405 numaralı blok), hedef blok aralığı 25 saniyedir ve ZIP 218, varsayılan olarak 120 blok önerir; bu da yaklaşık 50 dakikadır ([ZIP 218](https://zips.z.cash/zip-0218)). Cüzdan ayarları ve uygulamalar farklılık gösterebilir; gerçek blok aralıkları da değişir. Yeniden gönderme zamanını ölçmek yerine ilgili işlemin sona erme yüksekliğini kontrol edin.

Süre dolması, önceden madencilik yoluyla eklenmiş bir ödemeyi geri almaz veya iade işlemi oluşturmaz. Özgün işlem madencilik yapılmadan önce süresi dolduysa, zincir üstünde hiçbir zaman sonuçlanmamıştır. İlgili paranın yeniden harcanabilir olduğunu göstermesi için cüzdanınızın eşitlenmesi gerekebilir.

Yeniden göndermeden önce şu karar ağacını kullanın:

1. **Cüzdanınız bir işlem kimliği gösteriyor mu?**
   - Hayırsa cüzdan işlemi henüz oluşturmamış veya yayımlamamış olabilir. Eşitleme durumunu, internet bağlantısını, cüzdan sürümünü ve cüzdan hata iletilerini kontrol edin.
   - Evetse işlem kimliğini kopyalayın ve devam edin.
2. **İşlem bir blokta onaylandı mı?**
   - Evetse cüzdanınızın, borsanın, satıcının veya hizmetin istediği sayıda onay bekleyin.
   - Hayırsa devam edin.
3. **Madencilik yapılmamış işlemin sıfır olmayan sona erme yüksekliği geçti mi?**
   - Hayırsa aynı ödemeyi elle yeniden göndermeyin. Özgün işlem hâlâ onaylanabilir.
   - Evetse cüzdanın eşitlenmesini bekleyin ve özgün işlemin o yükseklikte veya daha önce madencilik yoluyla eklenmediğini doğrulayın. Ardından gerekirse yeni bir işlem oluşturmak için cüzdanın yönergelerini izleyin.
4. **İşlem bir sunucuda veya gezginde görünüp diğerinde görünmüyor mu?**
   - Bunu, işlemin başarısız olduğunun kanıtı olarak değil, ağda görünürlük sorunu olarak değerlendirin. Farklı düğümlerin bekleyen işlemlere ilişkin görünümleri farklı olabilir.
   - Bekleyin, cüzdanınızı yeniden eşitleyin veya cüzdanınız destekliyorsa güvenilir başka bir sunucuya geçin.
5. **İşlem onaylanmış göründükten sonra kayboldu mu?**
   - Kısa süreli bir Zincir yeniden düzenlemesi, işlemi geçici olarak en iyi Zincir'den çıkarabilir.
   - Daha fazla blok bekleyin. İşlem geri dönerse onayları beklemeye devam edin. Geri dönmez ve daha sonra süresi dolarsa yeni bir işlem oluşturun.
6. **Cüzdanınız yeniden göndermenizi istiyor mu?**
   - Önceki işlemin süresinin dolduğunu, başarısız olduğunu veya artık geçerli olmadığını kontrol ettikten sonra yalnızca cüzdanın güncel yönergelerini izleyin.
   - Emin değilseniz yeniden göndermeden önce destek ekibine danışın.

## Bekleyen, Süresi Dolmuş, Düşürülmüş ve Yeniden Düzenleme Sonucu Çıkarılmış İşlemler

- **Bekleyen**, işlemin oluşturulduğu veya yayımlandığı ancak henüz bir bloğa madencilik yoluyla eklenmediği anlamına gelir.
- **Süresi dolmuş**, işlemin sona erme yüksekliğinin geçildiği anlamına gelir. ZIP 203 uyarınca, sona erme yüksekliği olan bir işlem bu yükseklikten sonra madencilik yoluyla eklenemez.
- **Düşürülmüş**, bir veya daha fazla düğümün işlemi artık bekleyen işlemler havuzunda tutmadığı anlamına gelir. Bunun nedeni süre dolması, düşük ücret, bekleyen işlemler havuzu politikası, yeniden başlatma davranışı veya aktarma farklılıkları olabilir.
- **Yeniden düzenleme sonucu çıkarılmış**, işlemi daha önce içeren bir bloğun artık en iyi Zincir'in parçası olmadığı anlamına gelir. İşlem daha sonra yeniden madencilik yoluyla eklenebilir veya hâlâ geçerliyse bekleyen duruma dönebilir.

## Yeniden Göndermemeniz Gereken Durumlar

Bir işlem bekliyor, yavaş ilerliyor veya bir gezginde görünmüyor diye hemen yeniden göndermeyin. Çok erken yeniden göndermek kafa karışıklığına neden olabilir ve cüzdanın yeni ödemeyi oluşturma biçimine bağlı olarak iki kez ödeme yapma riski doğurabilir.

Şu durumlarda önce bekleyin veya destek alın:

- İşlemin bir kimliği var ve süresi dolmadı.
- Bir sunucu işlemi gösteriyor, diğeri göstermiyor.
- İşlem yakın zamanda madencilik yoluyla eklendi ancak olası bir yeniden düzenlemeden sonra onaylarını kaybetti.
- Alıcı hizmet onayları saymayı henüz tamamlamadı.
- Cüzdanınız hâlâ eşitleniyor.

Genellikle yalnızca cüzdan işlemi açıkça süresi dolmuş veya başarısız olarak işaretledikten ya da destek ekibi özgün işlemin onaylanamayacağını doğruladıktan sonra yeniden göndermek daha güvenlidir.

## Gizliliği Koruyarak Kontrol Etme

Gereğinden fazla bilgi açığa çıkarmadan temel işlem durumunu kontrol edebilirsiniz:

- Cüzdanınızın tamamen eşitlenmiş olup olmadığını kontrol edin.
- Cüzdan uygulamasının güncel olup olmadığını kontrol edin.
- İşlemin bir kimliği olup olmadığını kontrol edin.
- İşlemin onaylanmış, bekleyen, süresi dolmuş veya başarısız durumda olup olmadığını kontrol edin.
- Cüzdanınız gösteriyorsa güncel blok yüksekliğini kontrol edin ve işlem sona erme yüksekliğiyle karşılaştırın.
- Şeffaf işlemler için bir blok gezgini herkese açık işlemi, adresleri, tutarları ve onayları gösterebilir.
- Korumalı işlemler için bir blok gezgini işlemin var olduğunu gösterebilir ancak korumalı göndericiyi, alıcıyı, tutarı veya memo ayrıntılarını gösteremez.

## Herkese Açık Olarak Paylaşmamanız Gerekenler

Şunları asla herkese açık sohbetlerde, sosyal medyada veya sorun takip sistemlerinde paylaşmayın:

- Seed phrase veya kurtarma ifadesi
- Harcama anahtarı, özel anahtar veya cüzdan yedeği
- Full Viewing Key
- Bakiyeleri, tam adresleri, memo'ları, QR kodlarını veya borsa hesap bilgilerini gösteren ekran görüntüleri
- Kişisel kimlik belgeleri veya hesap kurtarma kayıtları

Bir işlem kimliği Zincir üzerinde herkese açıktır ancak destek talebinizi yine de kimliğinizle ilişkilendirebilir. Gizlilik önemliyse bu bilgiyi yalnızca güvenilir bir destek kanalıyla paylaşın.

## Destek Ekiplerinin İhtiyaç Duyduğu Bilgiler

Cüzdan, borsa veya hizmet desteğinden yardım isterken yalnızca gerekli asgari bilgileri paylaşın:

- Cüzdan veya hizmet adı
- Uygulama sürümü ve işletim sistemi
- İşlemin korumalı, şeffaf veya korumalı ve şeffaf adresler arasında olup olmadığı
- Rahatça paylaşabiliyorsanız işlem kimliği
- Gönderim zamanı (yaklaşık)
- Cüzdanın tamamen eşitlenmiş olup olmadığı
- Cüzdanda gösterilen güncel durum
- Özel bilgiler çıkarılmış tam hata iletisi
- Bakiyeler, adresler, memo'lar ve hesap bilgileri gizlenmiş ekran görüntüsü

Destek ekiplerinin kurtarma ifadenize, harcama anahtarınıza, özel anahtarınıza veya full viewing key'inize ihtiyacı yoktur.

## Sık Yapılan Hatalar

- **ZEC listeleyen her cüzdanın bunu özel olarak gönderebildiğini varsaymak.** Çok sayıda çoklu coin cüzdanı Zcash'in yalnızca şeffaf tarafını destekler. Gizlilik için güvenmeden önce cüzdanın desteklediği havuzları kontrol edin. [Cüzdanlar](https://zechub.wiki/using-zcash/wallets) sayfasında her seçenek için bu bilgi listelenir.
- **Şeffaf bir adrese çekim yapıp parayı orada bırakmak.** Çekim işlemi herkese açıktır ve bu adresten sonraki her hareket de herkese açık kalır. Para ulaştıktan sonra onu korumalı hâle getirin.
- **Gizliliği bir kez açıp bırakabileceğiniz bir özellik olarak görmek.** Her işlem ayrı bir seçimdir. Bugün korumalı gönderim yapmak, geçen hafta yaptığınız şeffaf ödemeyi geri almaz.
- **Her şey için aynı şeffaf adresi kullanmak.** Şeffaf işlemler kalıcı olarak görünür olduğundan, aynı adresi tekrar kullanmak zamanla ilişkilendirilmesi gerekmeyen ödemeleri birbirine bağlar.
- **Güncel olmayan varsayılan ücretle gönderim yapmak.** ZIP 317'yi henüz benimsememiş cüzdanlar eski sabit ücreti kullanmaya devam edebilir; bu da işlemin onaylanmadan beklemesine yol açabilir.
- **Süre dolmadan yeniden göndermek.** Bekleyen bir işlem, süresi dolana kadar hâlâ onaylanabilir. Yeni bir ödeme oluşturmadan önce sona erme durumunu kontrol edin.

## Not

ZEC'i kullanmanın en güvenli yolunun, gönderici, alıcı, cüzdan ve hizmet hepsi desteklediğinde korumalı işlemleri kullanmak olduğunu lütfen unutmayın. Bazı cüzdanlar ve borsalar [birleşik adresleri](https://web.archive.org/web/20260823012524/https://electriccoin.co/blog/unified-addresses-in-zcash-explained/#:~:text=The%20unified%20address%20(UA)%20is,within%20the%20broader%20Zcash%20ecosystem.) destekler; bunlar birden fazla Zcash alıcı türünü tek bir adreste birleştirebilir.

## Kaynaklar

- [ZIP 203: İşlem Süresinin Dolması](https://zips.z.cash/zip-0203)
- [ZIP 317: Orantılı Transfer Ücreti Mekanizması](https://zips.z.cash/zip-0317)
- [Zcash ZIP'ler](https://zips.z.cash/)

## İlgili Sayfalar

- [Cüzdanlar](/using-zcash/wallets) - korumalı gönderimi destekleyen cüzdanlar ve yalnızca şeffaf işlemleri destekleyen cüzdanlar
- [Ödeme açıklamaları](/zcash-tech/payment-disclosures) - göndericinin tek bir korumalı ödemenin seçili ayrıntılarını nasıl kanıtlayabileceği
- [Korumalı Havuzlar](/using-zcash/shielded-pools) - Sapling ve Orchard, korumalı paranızın bulunduğu havuzlar
- [Memo'lar](/using-zcash/memos) - korumalı bir işlemle birlikte gönderilebilen şifrelenmiş mesajlar
- [Şeffaf Borsa Adresleri](/using-zcash/transparent-exchange-addresses) - TEX adresleri ve borsaların bunları kullanma nedenleri
- [Gözetimli Borsalar](/using-zcash/custodial-exchanges) - korumalı çekimleri destekleyen borsalar

## ZEC - ZAT Dönüştürücü
