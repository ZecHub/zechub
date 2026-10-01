# ZIP 218: 25 Saniyelik Blokların Gerçekte Değiştirdikleri

14 Eylül 2026'da kapanan NU7 coinholder anketinde, yaklaşık 2.397.669 ZEC, ZIP 218 lehinde oy kullandı ve 141,6 ZEC buna karşı oy verdi; sonuç %99,9 oldu. Haberlerin çoğu bunu "Zcash blokları hızlanıyor" diye özetledi. Bu doğru, ancak teklifin yaptıklarının ve kasıtlı olarak aynı bıraktıklarının büyük kısmını dışarıda bırakıyor.

Bu sayfa, ZIP 218'i kendi metni üzerinden açıklıyor: nelerin değiştiğini, nelerin değişmediğini ve maliyetini.

## Kısa versiyon

| | Bugün | ZIP 218'den sonra |
|---|---|---|
| Hedef blok aralığı | 75 saniye | 25 saniye |
| Günlük blok sayısı | 1.152 | 3.456 |
| Blok sübvansiyonu (mevcut yarılanma dönemi) | 1,5625 ZEC | 0,52083333 ZEC |
| Günlük yeni ZEC | değişmez | değişmez |
| Yarılanma aralığı | 1.680.000 blok | 5.040.000 blok |
| Blok başına korumalı işlem sınırları | yok (yalnızca 2 MB boyut sınırı) | havuz başına sınırlarla birlikte toplam 330 |
| Orchard işlem hacmi (2 işlemli işlemler) | saniyede yaklaşık 2,9 | saniyede yaklaşık 6,6 |

Üç kat daha fazla blok, her biri üçte bir kadar ödeme yapıyor. Arz takvimi olduğu yerde kalıyor.

## Blok süresi neden değişiyor?

Ana hedef **daha kısa bekleme süresi**. Bugün, ağ yükünden bağımsız olarak bir ödeme ilk onayı için ortalama 75 saniye bekler. 25 saniyede bu süre ortalama 25 saniyeye düşer. ZIP, bundan en çok etkilenen kullanım alanları olarak satış noktası ödemelerini, borsa yatırmalarını ve zincirler arası köprüleri sıralıyor.

ZIP'ten iki noktayı akılda tutmakta fayda var:

- **Kimseye daha az onay kullanmasını söylemez.** Bugünküyle aynı geri alma riski toleransını koruyan kullanıcılar için, ZIP onay süresinin üç katın biraz altında iyileşmesini bekliyor.
- **Kesinlik çalışmalarının yerine geçmez.** ZIP, kendisini Crosslink gibi kesinlik mekanizmalarını tamamlayıcı olarak tanımlıyor. Daha hızlı taban katmanı blokları, daha sonra bir kesinlik katmanı eklenip eklenmemesinden bağımsız olarak yardımcı olur.

ZIP ayrıca, daha yüksek işlem hacminin tek başına daha büyük blok boyutuyla elde edilebileceğini belirtiyor. Bunun yerine daha kısa blokların seçilmesinin nedeni gecikmedir.

## Neler değişiyor?

### İhraç: günlük ZEC aynı

Blok sayısının üçe katlanması, başka hiçbir şey değişmezse günlük ihracı üçe katlardı. ZIP 218, NU7 etkin olduğunda blok başına sübvansiyonu üç ek katsayıyla bölerek bunu önler.

Mevcut yarılanma döneminde bu, blok sübvansiyonunu **1,5625 ZEC'den 0,52083333 ZEC'ye** (52.083.333 zatoshi) düşürür. 156.250.000 zatoshi üçe tam bölünmediği için, her blok zatoshi'nin üçte biri kadar aşağı yuvarlanır. Tam 5.040.000 blokluk bir yarılanma aralığında bu, toplamda yaklaşık 0,0168 ZEC eder.

Sübvansiyon, blok başına oluşturulan toplam yeni ZEC miktarıdır. Mevcut geliştirme fonu payı hâlâ bundan alınır; dolayısıyla madenciler, bugün olduğu gibi, tam tutardan daha azını alır.

> **0,26041666 ZEC rakamı hakkında bir not.** Taslak ZIP'in açıklayıcı notu, NU7 sonrası sübvansiyonu floor(156250000 / 6) = 0,26041666 ZEC olarak yazıyor ve bazı haberler bunu tekrarladı. Bu not iki kat hatalıdır: 156.250.000 zatoshi zaten Blossom sonrası sübvansiyondur; dolayısıyla bunu altıya bölmek, NU7'ün üç katsayısına ek olarak Blossom'ün iki katsayısını ikinci kez uygular. Normatif formül, mevcut yarılanma endeksinde floor(1,250,000,000 / (2 · 3 · 4)) = 52.083.333 zatoshi verir. Bu değişiklik için Zebra'in uygulama sorunu ([#11463](https://github.com/ZcashFoundation/zebra/issues/11463)), notun Blossom katsayısını iki kez saydığını kaydeder, uygulayıcılara "notu değil, formülü uygulayın" der ve ZIP için bir düzeltme sunulduğunu belirtir. Etkinleştirme sırasındaki doğru rakam **0,52083333 ZEC**'dir.

### Yarılanmalar zamanlamasını korur

Yarılanma aralığı 1.680.000 bloktan 5.040.000 bloğa üçe katlanır. Bloklar üç kat daha sık geldiğinden, yarılanmalar değişiklik olmasaydı gerçekleşecekleri zamana yaklaşık olarak aynı noktada gerçekleşir. Toplam arz üst sınırı etkilenmez.

Bu, NU7 anketindeki diğer ihraç sorusundan ayrıdır; orada coinholder'lar yarılanmaları yumuşatılmış bir eğriyle değiştirmek yerine korumaya oy verdi. ZIP 218 mevcut yarılanma modeliyle çalışır ve onu değiştirmez.

### Blok başına korumalı işlem sayısına yeni sınırlar

ZIP 218, tek bir bloğun barındırabileceği korumalı etkinlik miktarına sınırlar ekler:

| Sınır | Blok başına azami |
|---|---|
| Tüm korumalı havuzlar birleşik | 330 (her Sprout JoinSplit 2 sayılır) |
| Orchard işlemleri | 330 |
| Sapling girdileri artı çıktıları | 300 |
| Sprout JoinSplit'leri | 25 |

İşlemlerin şeffaf bölümleri etkilenmez ve 2 MB blok boyutu sınırı geçerliliğini korur.

Bu sınırlar vardır çünkü daha fazla blok, aksi takdirde cüzdanlar ve düğümler için daha fazla iş anlamına gelirdi. Sınırlar uygulandığında, üç kat daha fazla blokla bile en kötü durum aslında bugünkünden **daha iyi** olur:

- **Cüzdan senkronizasyonu:** hafif bir cüzdanın günde indirmeye zorlanabileceği en fazla veri miktarı yaklaşık 271 MB'tan yaklaşık 169 MB'a düşer; bu, yaklaşık %38'lik bir azalmadır. En kötü durumdaki deneme şifre çözmeleri günde yaklaşık 4,8 milyondan yaklaşık 2,3 milyona düşer.
- **Blok doğrulama:** ZIP'in karşılaştırmaları, en kötü durumdaki bir Orchard bloğunu yeni sınırlar altında yaklaşık 432 ms, bugünkü en kötü durumu ise yaklaşık 770 ms olarak gösteriyor. Sapling için düşüş daha büyüktür: yaklaşık 3.175 ms'den yaklaşık 272 ms'ye.

Sapling ve Sprout sınırları kasıtlı olarak sıkıdır. Mayıs 2026 itibarıyla Orchard, korumalı ZEC'in %87,9'unu, Sapling %11,6'sını ve Sprout %0,5'ini barındırıyordu; dolayısıyla daha küçük havuzlar gerçek kullanımları için yeterli alan bulurken saldırganın kötüye kullanabileceği alan azalır. ZIP 317 ücretleri her havuzda mantıksal işlem başına aynı ücreti aldığından, saldırganın bir havuzu diğerine göre spamlamasından kazanç sağlaması mümkün değildir.

### İşlem hacmi

Blok başına 330 Orchard işlemiyle, standart 2 işlemli bir Orchard işlemi blok başına ⌊330 / 2⌋ = 165 kez sığar. Her 25 saniyede bir blokla bu, saniyede yaklaşık **6,6 işlem** eder; bugünkü yaklaşık 2,9'dan yükselerek — ZIP bunu normal Orchard işlem hacminde 2,3× artış olarak adlandırır. Sapling saniyede yaklaşık 3,0'a ulaşır; bu da Orchard'ün bugün başarabildiğinin üzerinde kalır.

### Zorluk ayarlaması

Zorluk algoritması, yakın zamandaki bloklardan oluşan bir pencere üzerinden ortalama alır. ZIP 218, bu pencereyi 17 bloktan 102 bloğa çıkarır; böylece, Zcash 150 saniyelik bloklarla başlatıldığında kapsadığı süreyle aynı olan yaklaşık 2.550 saniyelik gerçek zamanı kapsamaya devam eder. ZIP iki neden veriyor: zorluk manipülasyonu saldırılarını kolaylaştırmamak (Litecoin'in Nisan 2026'daki MWEB olayına atıfta bulunuyor) ve blok sürelerindeki kısa vadeli değişkenliği yumuşatmak.

Etkinleştirmeden hemen sonra blok sürelerinin yeni hedefte dengelenmesi biraz zaman alacaktır. Bu beklenir ve Blossom'te, Zcash 150 saniyeden 75 saniyeye indiğinde yaşananları yansıtır.

### Düğümler ve cüzdanlar için varsayılanlar

Bunlar fikir birliği kuralları yerine uygulamalar için önerilerdir:

- **İşlem sona ermesi:** varsayılan sona erme süresi 40 bloktan 120 bloğa çıkar; böylece yaklaşık aynı 50 dakika korunur.
- **Azami yeniden organizasyon derinliği:** Zebra'in sınırı 99 bloktan 600 bloğa çıkar; bu, 25 saniyede yaklaşık 4,2 saattir ve başlatıldığında kapsadığı pencereyle aynıdır.
- **Korumalı işlemler için sabitleyici derinliği:** 3 blokta kalır; böylece gecikme 3,75 dakikadan 1,25 dakikaya iner. ZIP burada Blossom emsalini izler.
- **Blok cinsinden ölçülen çeşitli ağ sabitleri**, aynı süreyi kapsayacak şekilde üçle çarpılır.

## Neler aynı kalıyor?

- Günlük ihraç edilen ZEC, yarılanma takvimi ve arz üst sınırı
- 2 MB blok boyutu sınırı
- Yeni işlem sınırlarının dokunmadığı şeffaf işlemler
- 100 bloktaki Coinbase olgunluğu. Sayım zamanla değil blokla yapıldığından, bunun artık yaklaşık 125 dakika yerine yaklaşık 42 dakika anlamına geldiğini unutmayın.

## Ödünleşim: daha fazla bayat blok

Daha hızlı bloklar ücretsiz değildir. Bayat blok, başka bir blok ağa önce ulaştığı için zincire dahil edilme yarışını kaybeden geçerli bir bloktur. Bloklar arasındaki aralık ne kadar kısa olursa bu durum o kadar sık yaşanır ve ZIP bayatlık oranını blok yayılımına, doğrulama süresine ve madencilik merkezileşmesi riskine bağlıyor.

- **Bugün:** yaklaşık %0,4; ZIP, hash gücü havuzlarda yoğunlaştığı için bunun temel oranı olduğundan düşük gösterebileceğini belirtiyor.
- **25 saniyede teorik olarak:** ölçülmüş Zcash yayılım gecikmelerine dayanarak yaklaşık %3,26.
- **Devnet testi:** 25 saniyelik aralıklarla tam 2 MB blok üreten, coğrafi olarak dağıtılmış 99 Zebra düğümü; %4,86 bayat blok oranı ve %0,37 çatallanma oranı ölçtü. Gereken tek ayarlama TCP yapılandırmasıydı. Bu devnet bugünün ana ağından daha merkeziyetsiz olduğundan, ZIP bunları en kötü duruma yakın rakamlar olarak değerlendiriyor.
- **Referans noktası:** ZIP, Ethereum'un tarihsel iş ispatı bayat blok oranı olan %5,4'ü güvenlik eşiği olarak kullanıyor. Her iki devnet rakamı da bunun altında kalıyor.

İki küçük maliyet daha vardır. Hafif cüzdanlar, kompakt blok başlıkları için günde yaklaşık 200 KB daha fazla indirir. Ayrıca üç kat daha fazla blok olduğundan, çevrimdışı kalmış tam bir düğüm güncellendiğinde, her blok doğrulamak için daha ucuz olsa bile işlemesi gereken blok sayısı daha fazladır. ZIP her ikisini de kabul ediyor.

## Durum ve zaman çizelgesi

- **ZIP durumu:** Taslak. Sahipleri Dev Ojha ve Evan Forbes; 13 Mart 2026'da oluşturuldu.
- **Coinholder anketi:** %99,9 destekle 14 Eylül 2026'da kapandı. Anket tercihi gösterir; tek başına fikir birliği kurallarını değiştirmez.
- **Zaman çizelgesi:** 17 Eylül'deki bir Zcash Community Forum duyurusunda, geliştirme kuruluşları 30 Eylül'e kadar kodun tamamlanması, 6 Ekim'de testnette NU7, 20 Ekim'de nihai karar ve ana ağ etkinleştirme yüksekliği ile ana ağ etkinleştirmesinin yaklaşık 5 Kasım 2026'da hedeflenmesi takviminde anlaştı. Yükseklik belirlenene kadar 5 Kasım sabit bir tarih değil, hedeftir.
- **Uygulama:** Zebra ([#11440](https://github.com/ZcashFoundation/zebra/issues/11440)) ve Zakura ([PR #1066](https://github.com/zakura-core/zakura/pull/1066)) içinde takip ediliyor.

## Bunun sizin için anlamı

- **ZEC tutuyorsanız:** yapmanız gereken hiçbir şey yok. Bakiyeniz ve arz takvimi etkilenmez.
- **Cüzdan kullanıyorsanız:** cüzdanınız NU7 desteğini sunduğunda güncelleyin. İlk onaylar yaklaşık üç kat daha hızlı gelecektir.
- **Bir düğüm, borsa veya hizmet çalıştırıyorsanız:** etkinleştirmeden önce yükseltme yapmayı planlayın ve blok cinsinden ölçülen tüm ayarları gözden geçirin; çünkü sabit bir blok sayısı artık eskiden kapsadığı sürenin üçte birini kapsıyor.

## Kaynaklar

- [ZIP 218: 25 saniyelik Blok Hedef Aralığı](https://zips.z.cash/zip-0218)
- [ZIP 208: Daha Kısa Blok Hedef Aralığı](https://zips.z.cash/zip-0208), Blossom emsali
- [Forum: Zcash Blok Hedef Aralığını 25 saniyeye Düşürme Teklifi](https://forum.zcashcommunity.com/t/proposal-lower-zcash-block-target-spacing-to-25s/54577)
- [Forum: Zcash Blok Süresi Azaltması, yalnızca Zebra Devnet ile NU7 için Güvenli Görünüyor](https://forum.zcashcommunity.com/t/zcash-block-time-reduction-appears-safe-for-nu7-w-zebra-only-devnet/55586)
- [Zebra sorun #11463](https://github.com/ZcashFoundation/zebra/issues/11463), NU7 sonrası yarılanma aralığı ve sübvansiyon
- [Zebra sorun #11440](https://github.com/ZcashFoundation/zebra/issues/11440), ZIP 218 uygulama takibi
- Bitcoin.com News, crypto.news ve KuCoin tarafından bildirildiği üzere NU7 anket sonuçları ve zaman çizelgesi (16–19 Eylül 2026)
