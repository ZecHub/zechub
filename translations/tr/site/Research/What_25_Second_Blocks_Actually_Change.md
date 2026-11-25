# ZIP 218: 25 Saniyelik Bloklar Gerçekte Neleri Değiştiriyor?

14 Eylül 2026'da kapanan NU7 coinholder anketinde, yaklaşık 2.397.669 ZEC ZIP 218 lehine, 141,6 ZEC ise aleyhine oy kullandı; sonuç %99,9 oldu. Haberlerin çoğu bunu “Zcash bloklar hızlanıyor” diye özetledi. Bu doğru, ancak önerinin yaptıklarının ve özellikle aynı tuttuğu şeylerin çoğunu dışarıda bırakıyor.

Bu sayfa, ZIP 218'i kendi metnine dayanarak açıklıyor: Nelerin değiştiğini, nelerin değişmediğini ve bunun maliyetini.

## Kısa özet

| | NU7 Öncesinde | ZIP 218 Sonrasında (NU7) |
|---|---|---|
| Blok hedef aralığı | 75 saniye | 25 saniye |
| Günlük blok sayısı | 1.152 | 3.456 |
| Blok sübvansiyonu (mevcut yarılanma dönemi) | 1,5625 ZEC | 0,52083333 ZEC |
| Günlük yeni ZEC miktarı | değişmez | değişmez |
| Yarılanma aralığı | 1.680.000 blok | 5.040.000 blok |
| Blok başına korumalı eylem sınırları | yok (yalnızca 2 MB boyut sınırı) | toplam 330, havuz başına sınırlarla |
| Orchard verimi (2 eylemli işlemler) | saniyede yaklaşık 2,9 | saniyede yaklaşık 6,6 |

![ZIP 218, blok hedef aralığını 75 saniyeden 25 saniyeye indirerek günlük blok sayısını 1,152'den 3,456'ya çıkarır. Blok başına sübvansiyonu da aynı oranda, yani üçe bölerek, 1.5625'ten 0.52083333 ZEC'ye düşürür. Böylece günlük ihraç miktarı 1,800 ZEC olarak kalır ve yarılanma tarihleri sabit tutulsun diye yarılanma aralığı 1,680,000'den 5,040,000 bloğa çıkar.](https://raw.githubusercontent.com/ZecHub/zechub/main/site/Zcash_Tech/assets/nu7-block-timing.png)

Üç kat fazla blok, her biri üçte bir ödeme yapıyor. Arz takvimi aynı kalıyor.

## Blok süresi neden değişiyor?

Temel hedef **bekleme süresini azaltmak**. NU7 öncesinde, ağ yükü ne olursa olsun, bir ödeme ilk onayını almak için ortalama 75 saniye bekliyordu. 25 saniyede bu süre ortalama 25 saniyeye düşüyor. ZIP, bundan en çok etkilenecek kullanım alanları olarak satış noktası ödemelerini, borsa yatırmalarını ve zincirler arası köprüleri belirtiyor.

ZIP içindeki iki noktayı akılda tutmakta fayda var:

- **Kimseye daha az onay kullanmasını söylemiyor.** Bugünküyle aynı geri alma riski toleransını koruyan kullanıcılar için ZIP, onay süresinin üç kattan biraz daha az iyileşmesini bekliyor.
- **Kesinleşme çalışmasının yerini almıyor.** ZIP, kendisini Crosslink gibi kesinleşme mekanizmalarını tamamlayıcı nitelikte tanımlıyor. Daha sonra bir kesinleşme katmanı eklensin ya da eklenmesin, temel katmandaki daha hızlı bloklar fayda sağlıyor.

ZIP, daha yüksek verimin yalnızca blok boyutu artırılarak da elde edilebileceğini belirtiyor. Bunun yerine daha kısa blokların seçilmesinin nedeni gecikme süresi.

## Neler değişiyor?

### İhraç: günlük ZEC miktarı aynı

Başka hiçbir şey değişmeden blok sayısının üçe katlanması, günlük ihracı da üçe katlardı. ZIP 218, NU7 etkinleştirildiğinde blok başına sübvansiyonu ek bir üçte bire bölerek bunu önlüyor.

Mevcut yarılanma döneminde bu, blok sübvansiyonunu **1,5625 ZEC değerinden 0,52083333 ZEC değerine** (52.083.333 zatoshi) düşürüyor. 156.250.000 zatoshi üçe tam bölünmediğinden, her blokta zatoshinin üçte biri kadar aşağı yuvarlama yapılıyor. Tam bir 5.040.000 blokluk yarılanma aralığında toplam fark yaklaşık 0,0168 ZEC ediyor.

Sübvansiyon, blok başına oluşturulan toplam yeni ZEC miktarıdır. Mevcut geliştirme fonu payı yine bu miktardan alınıyor; dolayısıyla madenciler, bugün olduğu gibi, belirtilen tam miktardan daha azını alıyor.

> **0,26041666 ZEC rakamı hakkında not.** Taslak ZIP'ın açıklayıcı notunda yarılanma sonrası NU7 sübvansiyonu floor(156250000 / 6) = 0,26041666 ZEC olarak verilmiş ve bazı haberler de bu rakamı tekrarlamış. Bu notta iki katlık bir hata var: 156.250.000 zatoshi zaten yarılanma sonrası Blossom sübvansiyonudur; bu miktarı altıya bölmek, Blossom iki katlık etkiyi NU7 üç katlık etkinin üzerine ikinci kez uyguluyor. Normatif formüle göre mevcut yarılanma indeksinde floor(1,250,000,000 / (2 · 3 · 4)) = 52.083.333 zatoshi elde ediliyor. Zebra'ın bu değişiklikle ilgili uygulama sorunu ([#11463](https://github.com/ZcashFoundation/zebra/issues/11463)), notun aynı Blossom etkenini iki kez saydığını kayda geçiriyor, uygulayıcılara “notu değil, formülü uygulayın” diyor ve ZIP aleyhine bir düzeltme başvurusu yapıldığını belirtiyor. Etkinleştirme anındaki doğru rakam **0,52083333 ZEC**.

### Yarılanmaların zamanlaması aynı kalıyor

Yarılanma aralığı 1.680.000 bloktan 5.040.000 bloğa çıkıyor. Bloklar üç kat daha sık geldiği için yarılanmalar, değişiklik yapılmamış olsaydı gerçekleşecekleri zamana yaklaşık aynı noktada gerçekleşiyor. Toplam arz üst sınırı etkilenmiyor.

Bu, NU7 anketindeki diğer ihraç sorusundan ayrıdır; o ankette coinholder'lar yarılanmaları yumuşatılmış bir eğriyle değiştirmek yerine korumak için oy kullandı. ZIP 218 mevcut yarılanma modeliyle birlikte çalışıyor ve modeli değiştirmiyor.

### Blok başına korumalı eylemler için yeni sınırlar

ZIP 218, tek bir blokta yer alabilecek korumalı etkinlik miktarına sınırlar getiriyor:

| Sınır | Blok başına üst sınır |
|---|---|
| Tüm korumalı havuzların toplamı | 330 (her Sprout JoinSplit 2 olarak sayılır) |
| Orchard eylemleri | 330 |
| Sapling girdileri ve çıktıları | 300 |
| Sprout JoinSplits | 25 |

İşlemlerin şeffaf kısımları etkilenmiyor ve 2 MB blok boyutu sınırı geçerliliğini koruyor.

Sınırlar, aksi takdirde daha fazla bloğun cüzdanlar ve düğümler için daha fazla iş anlamına gelecek olması nedeniyle getiriliyor. Sınırlar uygulandığında, blok sayısı üç katına çıksa bile en kötü durum bugünkünden **daha iyi** oluyor:

- **Cüzdan eşitleme:** Bir hafif cüzdanın bir günde indirmek zorunda kalabileceği en yüksek veri miktarı yaklaşık 271 MB'tan 169 MB'a düşüyor; bu, yaklaşık %38 azalma demek. En kötü durumdaki deneme amaçlı şifre çözme sayısı günlük yaklaşık 4,8 milyondan 2,3 milyona iniyor.
- **Blok doğrulama:** ZIP kıyaslama testlerine göre, yeni sınırlar altında en kötü durumdaki Orchard blok yaklaşık 432 ms sürüyor; bugünkü en kötü durum ise yaklaşık 770 ms. Sapling için düşüş daha büyük: yaklaşık 3.175 ms'den 272 ms'ye.

Sapling ve Sprout sınırları bilerek sıkı tutulmuş. Mayıs 2026 itibarıyla, korumalı ZEC'lerin %87,9'u Orchard, %11,6'sı Sapling ve %0,5'i Sprout içindeydi. Böylece küçük havuzlara gerçek kullanımları için yeterli alan sağlanırken saldırganların kötüye kullanabileceği alan azaltılıyor. ZIP 317 ücretleri her havuzda mantıksal eylem başına aynı ücreti aldığı için, bir saldırganın bir havuza diğerinden fazla spam göndermekle kazanacağı bir şey yok.

### Verim

Blok başına 330 Orchard eylemle, standart 2 eylemli bir Orchard işlemi her bloğa ⌊330 / 2⌋ = 165 kez sığıyor. Her 25 saniyede bir blok üretildiğinde bu, saniyede yaklaşık **6,6 işlem** ediyor; bugünkü yaklaşık 2,9 işlemden yüksek. ZIP, bunu olağan Orchard veriminde 2,3× artış olarak nitelendiriyor. Sapling saniyede yaklaşık 3,0'a ulaşıyor; bu da Orchard'ın bugün başardığından hâlâ yüksek.

### Zorluk ayarlaması

Zorluk algoritması, yakın tarihli bloklardan oluşan bir pencerenin ortalamasını alıyor. ZIP 218 bu pencereyi 17 bloktan 102 bloğa çıkarıyor. Böylece pencere, Zcash 150 saniyelik bloklarla başlatıldığındakiyle aynı süreyi, yaklaşık 2.550 saniyeyi, kapsıyor. ZIP iki neden sunuyor: zorluk manipülasyonu saldırılarını kolaylaştırmamak (Litecoin'in Nisan 2026'daki MWEB olayını örnek gösteriyor) ve blok sürelerindeki kısa vadeli değişimleri yumuşatmak.

Etkinleştirmenin hemen ardından blok sürelerinin yeni hedefe oturması biraz zaman alacak. Bu beklenen bir durum ve Blossom sırasında yaşananlara benziyor; o dönemde Zcash 150 saniyeden 75 saniyeye geçti.

### Düğümler ve cüzdanlar için varsayılanlar

Bunlar konsensüs kuralları değil, uygulamalara yönelik önerilerdir:

- **İşlem sona erme süresi:** Varsayılan sona erme süresi 40 bloktan 120 bloğa çıkarılarak yaklaşık 50 dakika korunuyor.
- **Maksimum yeniden düzenlenme derinliği:** Zebra sınırı 99 bloktan 600 bloğa çıkarılıyor. 25 saniyelik aralıklarla bu yaklaşık 4,2 saat ediyor ve başlangıçta kapsadığı süreyle aynı.
- **Korumalı işlemler için dayanak derinliği:** 3 blokta kalıyor; bu nedenle gecikme 3,75 dakikadan 1,25 dakikaya iniyor. ZIP bu konuda Blossom emsalini izliyor.
- **Blok cinsinden ölçülen çeşitli ağ sabitleri**, aynı süreyi kapsayacak şekilde üç kat artırılıyor.

## Neler aynı kalıyor?

- Günlük ihraç edilen ZEC miktarı, yarılanma takvimi ve arz üst sınırı
- 2 MB blok boyutu sınırı
- Yeni eylem sınırlarının dokunmadığı şeffaf işlemler
- Coinbase olgunluk süresi 100 blokta kalıyor. Sayı süreyi değil blokları ifade ettiği için bunun artık yaklaşık 125 dakika değil, yaklaşık 42 dakika anlamına geldiğini unutmayın.

## Ödünleşim: Daha fazla geçersiz kalan blok

Daha hızlı blokların bir bedeli var. Geçersiz kalan blok, başka bir blok ağa daha önce ulaştığı için Zincir'e dahil olma yarışını kaybeden geçerli bir bloktur. Bloklar arasındaki süre kısaldıkça bu daha sık yaşanır ve ZIP geçersiz kalan blok oranını blok yayılımına, doğrulama süresine ve madenciliğin merkezileşme riskine bağlıyor.

- **NU7 öncesinde:** Yaklaşık %0,4. ZIP, hash gücü havuzlarda yoğunlaştığı için bu oranın temel oranı olduğundan düşük gösterebileceğini belirtiyor.
- **25 saniyede teorik oran:** Ölçülen Zcash yayılım gecikmelerine göre yaklaşık %3,26.
- **Devnet testi:** Coğrafi olarak dağılmış 99 Zebra düğümünün 25 saniyelik aralıklarla tam 2 MB bloklar ürettiği testte %4,86 geçersiz kalan blok oranı ve %0,37 çatallanma oranı ölçüldü. Gerekli tek ayar TCP yapılandırmasıydı. Bu devnet bugünkü ana ağdan daha merkeziyetsiz olduğundan, ZIP bu rakamları en kötü duruma yakın değerler olarak kabul ediyor.
- **Karşılaştırma noktası:** ZIP, güvenlik eşiği olarak Ethereum'un tarihsel iş kanıtı geçersiz kalan blok oranı olan %5,4'ü kullanıyor. Her iki devnet değeri de bu eşiğin altında kalıyor.

Bunun dışında iki küçük maliyet daha var. Hafif cüzdanlar, günde yaklaşık 200 KB daha fazla sıkıştırılmış blok başlığı indiriyor. Ayrıca blok sayısı üç katına çıktığından, çevrimdışı kalmış bir tam düğüm ağa yetişirken işlemesi gereken daha fazla bloğa sahip oluyor; ancak her bloğun doğrulanması daha ucuza mal oluyor. ZIP her iki maliyeti de kabul ediyor.

## Durum ve zaman çizelgesi

- **ZIP durumu:** Önerildi. Sahipleri Dev Ojha ve Evan Forbes; oluşturulma tarihi 13 Mart 2026.
- **Coinholder anketi:** 14 Eylül 2026'da %99,9 destekle kapandı. Anket tercihleri gösterir; konsensüs kurallarını tek başına değiştirmez.
- **Zaman çizelgesi:** Geliştirme kuruluşları, 17 Eylül'deki Zcash Community Forum duyurusunda kodun 30 Eylül'e kadar tamamlanması, NU7'ın 6 Ekim'de test ağında etkinleştirilmesi ve nihai kararın 20 Ekim'de verilmesi takviminde anlaştı. NU7, 6 Kasım 2026'da (UTC) 3.543.405 yüksekliğinde ([ZIP 259](https://zips.z.cash/zip-0259)) ana ağda etkinleştirildi; dolayısıyla 25 saniyelik hedef artık yürürlükte.
- **Uygulama:** Zebra ([#11440](https://github.com/ZcashFoundation/zebra/issues/11440)) ve Zakura ([PR #1066](https://github.com/zakura-core/zakura/pull/1066)) üzerinden takip ediliyor.

## Bu sizin için ne anlama geliyor?

- **ZEC tutuyorsanız:** Yapmanız gereken bir şey yok. Bakiyeniz ve arz takvimi etkilenmiyor.
- **Cüzdan kullanıyorsanız:** Cüzdanınız NU7 desteğini sunduğunda güncelleyin. İlk onaylar yaklaşık üç kat daha hızlı gelecek.
- **Düğüm, borsa veya hizmet işletiyorsanız:** Etkinleştirmeden önce yükseltme yapmayı planlayın ve blok cinsinden ölçülen ayarları gözden geçirin; sabit bir blok sayısı artık eskisinin üçte biri kadar zamanı kapsıyor.

## Kaynaklar

- [ZIP 218: 25 Saniyelik Blok Hedef Aralığı](https://zips.z.cash/zip-0218)
- [ZIP 208: Daha Kısa Blok Hedef Aralığı](https://zips.z.cash/zip-0208), Blossom emsali
- [Forum: Öneri — Zcash Blok Hedef Aralığını 25 Saniyeye Düşürme](https://forum.zcashcommunity.com/t/proposal-lower-zcash-block-target-spacing-to-25s/54577)
- [Forum: Zcash Blok Süresini Kısaltmanın NU7 için Güvenli Göründüğü, Yalnızca Zebra Kullanan Devnet Testiyle Gösterildi](https://forum.zcashcommunity.com/t/zcash-block-time-reduction-appears-safe-for-nu7-w-zebra-only-devnet/55586)
- [Zebra sorun #11463](https://github.com/ZcashFoundation/zebra/issues/11463), yarılanma sonrası NU7 aralığı ve sübvansiyon
- [Zebra sorun #11440](https://github.com/ZcashFoundation/zebra/issues/11440), ZIP 218 uygulama takibi
- NU7 anket sonuçları ve zaman çizelgesi; Bitcoin.com News, crypto.news ve KuCoin tarafından bildirildi (16–19 Eylül 2026)
