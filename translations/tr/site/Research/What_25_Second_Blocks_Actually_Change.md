# ZIP 218: 25 Saniyelik Bloklar Gerçekte Neleri Değiştiriyor?

14 Eylül 2026'da kapanan NU7 coin sahibi anketinde yaklaşık 2.397.669 ZEC ZIP 218'i desteklerken 141,6 ZEC karşı oy kullandı; sonuç %99,9 destek oldu. Haberlerin çoğu bunu “Zcash bloklar hızlanıyor” diye özetledi. Bu doğru, ancak teklifin yaptıklarının ve özellikle aynı tuttuğu şeylerin büyük bölümünü dışarıda bırakıyor.

Bu sayfa ZIP 218'i kendi metnine dayanarak açıklıyor: nelerin değiştiğini, nelerin değişmediğini ve bunun maliyetini.

## Kısa özet

| | NU7 öncesi | ZIP 218 sonrası (NU7) |
|---|---|---|
| Blok hedef aralığı | 75 saniye | 25 saniye |
| Günlük blok sayısı | 1.152 | 3.456 |
| Blok sübvansiyonu (mevcut yarılanma dönemi) | 1,5625 ZEC | 0,52083333 ZEC |
| Günlük yeni ZEC | değişmiyor | değişmiyor |
| Yarılanma aralığı | 1.680.000 blok | 5.040.000 blok |
| Blok başına korumalı işlem sınırları | yok (yalnızca 2 MB boyut sınırı) | toplam 330, havuz başına sınırlarla |
| Orchard verimi (2 eylemli işlemler) | saniyede yaklaşık 2,9 | saniyede yaklaşık 6,6 |

![ZIP 218 cuts block target spacing from 75 seconds to 25, tripling daily blocks from 1,152 to 3,456, while dividing the per-block subsidy by the same factor of three from 1.5625 to 0.52083333 ZEC, so daily issuance stays at 1,800 ZEC and the halving interval stretches from 1,680,000 to 5,040,000 blocks to hold halving dates fixed](https://raw.githubusercontent.com/ZecHub/zechub/main/site/Zcash_Tech/assets/nu7-block-timing.png)

Her biri üçte bir kadar ödeme yapan üç kat fazla blok. Arz takvimi aynı kalıyor.

## Blok süresi neden değişiyor?

Temel amaç **bekleme süresini azaltmak**. NU7 öncesinde bir ödeme, ağ yükü ne olursa olsun, ilk onay için ortalama 75 saniye bekliyordu. 25 saniyede bu süre ortalama 25 saniyeye iniyor. ZIP, bu değişimin en çok satış noktası ödemelerinde, borsa yatırmalarında ve zincirler arası köprülerde hissedileceğini belirtiyor.

ZIP'den akılda tutulması gereken iki nokta var:

- **Kimseye daha az onay kullanmasını söylemiyor.** Bugünkü geri alma riski toleransını koruyan kullanıcılar için ZIP, onay süresinin üç katından biraz daha az iyileşmesini bekliyor.
- **Kesinleşme çalışmasının yerini almıyor.** ZIP, kendisini Crosslink gibi kesinleşme mekanizmalarını tamamlayıcı olarak tanımlıyor. İleride bir kesinleşme katmanı eklensin ya da eklenmesin, temel katmandaki daha hızlı bloklar yarar sağlıyor.

ZIP ayrıca yalnızca blok boyutunu artırarak da daha yüksek verim elde edilebileceğini belirtiyor. Daha kısa blokların tercih edilmesinin nedeni gecikme süresi.

## Neler değişiyor?

### İhraç: günlük ZEC miktarı aynı

Başka hiçbir şey değişmeden blok sayısını üçe katlamak günlük ihracı da üçe katlardı. ZIP 218, NU7 etkin olduğunda blok başına sübvansiyonu ayrıca üçe bölerek bunu önlüyor.

Mevcut yarılanma döneminde blok sübvansiyonu **1,5625 ZEC seviyesinden 0,52083333 ZEC seviyesine** (52.083.333 zatoshi) düşüyor. 156.250.000 zatoshi üçe tam bölünmediğinden, her blokta zatoshi'nin üçte biri kadar aşağı yuvarlama yapılıyor. Tam bir 5.040.000 blokluk yarılanma aralığında toplam fark yaklaşık 0,0168 ZEC ediyor.

Sübvansiyon, her blokta oluşturulan yeni ZEC miktarının tamamıdır. Mevcut geliştirme fonu payı yine bu miktardan kesiliyor; dolayısıyla madenciler bugün olduğu gibi toplam rakamın tamamını almıyor.

> **0,26041666 ZEC rakamı hakkında.** Taslak ZIP'ın açıklama notunda, NU7 sonrası sübvansiyon floor(156250000 / 6) = 0,26041666 ZEC olarak verilmiş ve bazı haber kaynakları bu rakamı tekrarlamış. Notta iki katlık bir hata var: 156.250.000 zatoshi zaten Blossom sonrası sübvansiyon olduğundan, bu miktarı altıya bölmek Blossom iki katını, NU7 üç katına ek olarak, ikinci kez uyguluyor. Normatif formüle göre mevcut yarılanma indeksinde floor(1,250,000,000 / (2 · 3 · 4)) = 52.083.333 zatoshi elde ediliyor. Zebra'ın bu değişikliğe yönelik uygulama konusu ([#11463](https://github.com/ZcashFoundation/zebra/issues/11463)), notta Blossom katsayısının iki kez sayıldığını kayda geçiriyor, uygulayıcılara “notu değil, formülü uygulayın” diyor ve ZIP'a düzeltme gönderildiğini belirtiyor. Etkinleştirme anındaki doğru rakam **0,52083333 ZEC**.

### Yarılanmaların zamanlaması korunuyor

Yarılanma aralığı 1.680.000 bloktan 5.040.000 bloka çıkıyor. Bloklar üç kat daha sık geldiği için yarılanmalar, değişiklik yapılmasaydı gerçekleşecekleri zamanlara yaklaşık olarak denk geliyor. Toplam arz sınırı etkilenmiyor.

Bu konu, NU7 anketindeki diğer ihraç sorusundan ayrı: coin sahipleri, yarılanmaların yumuşatılmış bir eğriyle değiştirilmesi yerine sürdürülmesi yönünde oy kullandı. ZIP 218 mevcut yarılanma modeliyle çalışıyor ve onu değiştirmiyor.

### Blok başına korumalı eylemlere yeni sınırlar

ZIP 218, tek bir blokta bulunabilecek korumalı etkinlik miktarına sınırlar getiriyor:

| Sınır | Blok başına en fazla |
|---|---|
| Tüm korumalı havuzların toplamı | 330 (her Sprout JoinSplit 2 olarak sayılır) |
| Orchard eylemleri | 330 |
| Sapling girdileri ve çıktıları | 300 |
| Sprout JoinSplits | 25 |

İşlemlerin şeffaf bölümleri bu sınırlardan etkilenmiyor ve 2 MB blok boyutu sınırı geçerliliğini koruyor.

Bu sınırlar, aksi hâlde daha fazla bloğun cüzdanlar ve düğümler için daha fazla iş anlamına gelecek olmasından kaynaklanıyor. Sınırlar uygulandığında, blok sayısı üç katına çıksa bile en kötü durum bugünkünden **daha iyi** oluyor:

- **Cüzdan eşitlemesi:** Hafif bir cüzdanın bir günde indirmeye zorlanabileceği en yüksek veri miktarı yaklaşık 271 MB'den 169 MB'ye düşüyor; bu yaklaşık %38'lik bir azalma. En kötü durumdaki deneme amaçlı şifre çözme işlemleri günde yaklaşık 4,8 milyondan 2,3 milyona iniyor.
- **Blok doğrulama:** ZIP kıyaslama testlerine göre yeni sınırlar altında en kötü durumdaki bir Orchard bloğunun doğrulanması yaklaşık 432 ms sürüyor; bugünkü en kötü durum ise yaklaşık 770 ms. Sapling için düşüş daha büyük: yaklaşık 3.175 ms'den 272 ms'ye.

Sapling ve Sprout sınırları bilerek sıkı tutulmuş. Mayıs 2026 itibarıyla, korumalı ZEC'lerin %87,9'u Orchard'ta, %11,6'sı Sapling'da ve %0,5'i Sprout'da bulunuyordu. Böylece küçük havuzlara gerçek kullanımları için yeterli alan sağlanırken, saldırganların kötüye kullanabileceği alan azaltılıyor. ZIP 317 ücretleri her havuzda mantıksal eylem başına aynı ücreti aldığından, saldırganın bir havuzu diğerine tercih ederek spam göndermekten kazancı olmuyor.

### Verim

Blok başına 330 Orchard eylemiyle standart 2 eylemli bir Orchard işlemi her bloğa ⌊330 / 2⌋ = 165 kez sığıyor. Her 25 saniyede bir blok geldiğinde bu, bugünkü yaklaşık 2,9'dan **saniyede yaklaşık 6,6 işlem** anlamına geliyor. ZIP bunu olağan Orchard veriminde 2,3 kat artış olarak nitelendiriyor. Sapling saniyede yaklaşık 3,0'a ulaşıyor; bu da Orchard'ın bugün sunduğu değerin üzerinde.

### Zorluk ayarlaması

Zorluk algoritması yakın geçmişteki bloklardan oluşan bir pencerenin ortalamasını alıyor. ZIP 218 bu pencereyi 17 bloktan 102 bloka çıkarıyor; böylece pencere yine yaklaşık 2.550 saniyelik gerçek zamanı kapsıyor. Zcash 150 saniyelik bloklarla başlatıldığında da kapsadığı süre buydu. ZIP iki gerekçe sunuyor: zorluk manipülasyonu saldırılarını kolaylaştırmamak (Litecoin'in Nisan 2026'daki MWEB olayını örnek gösteriyor) ve blok sürelerindeki kısa vadeli değişkenliği yumuşatmak.

Etkinleştirmenin hemen ardından blok sürelerinin yeni hedefe oturması biraz zaman alacak. Bu beklenen bir durum; Blossom'de, Zcash 150 saniyeden 75 saniyeye geçtiğinde yaşananlara benziyor.

### Düğümler ve cüzdanlar için varsayılanlar

Bunlar uzlaşma kuralları değil, uygulamalara yönelik önerilerdir:

- **İşlem sona erme süresi:** Varsayılan sona erme süresi 40 bloktan 120 bloka çıkarak yaklaşık 50 dakikayı koruyor.
- **Maksimum yeniden düzenleme derinliği:** Zebra sınırı 99 bloktan 600 bloka çıkıyor. 25 saniyelik bloklarla bu yaklaşık 4,2 saat ediyor; lansmanda kapsadığı süre de buydu.
- **Korumalı işlemler için dayanak derinliği:** 3 blokta kalıyor; böylece gecikme 3,75 dakikadan 1,25 dakikaya düşüyor. ZIP burada Blossom emsalini izliyor.
- **Bloklarla ölçülen birkaç ağ sabiti**, aynı süreyi kapsayacak şekilde üç katına çıkarılıyor.

## Neler aynı kalıyor?

- Günlük ihraç edilen ZEC miktarı, yarılanma takvimi ve arz sınırı
- 2 MB blok boyutu sınırı
- Yeni eylem sınırlarının etkilemediği şeffaf işlemler
- Coinbase vadesinin 100 blok olması. Sayı zamana değil bloklara dayandığı için bunun artık yaklaşık 125 dakika yerine 42 dakika anlamına geldiğine dikkat edin.

## Ödünleşim: daha fazla geçersiz kalan blok

Daha hızlı bloklar bedelsiz değil. Geçersiz kalan blok, başka bir blok ağa önce ulaştığı için zincire eklenme yarışını kaybeden geçerli bir bloktur. Bloklar arasındaki süre kısaldıkça bu daha sık yaşanıyor; ZIP, geçersiz kalan blok oranını blok yayılımına, doğrulama süresine ve madenciliğin merkezileşme riskine bağlıyor.

- **NU7 öncesinde:** Yaklaşık %0,4. ZIP, hash gücü havuzlarda yoğunlaştığı için bu rakamın gerçek oranı düşük tahmin ediyor olabileceğini belirtiyor.
- **25 saniye için teorik tahmin:** Ölçülen Zcash yayılım gecikmelerine göre yaklaşık %3,26.
- **Devnet testi:** Coğrafi olarak dağılmış 99 Zebra düğümünün 25 saniyelik aralıklarla tam 2 MB bloklar ürettiği testte, geçersiz blok oranı %4,86, çatallanma oranı ise %0,37 olarak ölçüldü. Gereken tek ayar TCP yapılandırmasıydı. Bu devnet bugünkü ana ağdan daha merkeziyetsiz olduğu için ZIP bu oranları en kötü duruma yakın değerler olarak değerlendiriyor.
- **Karşılaştırma noktası:** ZIP, güvenlik eşiği olarak Ethereum'un tarihsel iş ispatı geçersiz blok oranı olan %5,4'ü kullanıyor. Her iki devnet değeri de bu eşiğin altında.

Bunun yanında iki küçük maliyet daha var. Hafif cüzdanlar günde yaklaşık 200 KB daha fazla kompakt blok başlığı indiriyor. Ayrıca blok sayısı üç katına çıktığından, çevrimdışı kalmış tam bir düğüm ağa yeniden bağlandığında, her bloğun doğrulanması daha ucuz olsa da işlemesi gereken daha fazla blok oluyor. ZIP her iki maliyeti de kabul ediyor.

## Durum ve zaman çizelgesi

- **ZIP durumu:** Önerildi. Sahipleri Dev Ojha ve Evan Forbes; oluşturulma tarihi 13 Mart 2026.
- **Coin sahibi anketi:** 14 Eylül 2026'da %99,9 destekle kapandı. Anket tercihi gösteriyor; uzlaşma kurallarını tek başına değiştirmiyor.
- **Zaman çizelgesi:** Geliştirme kuruluşları, 17 Eylül'de yayımlanan Zcash Community Forum duyurusunda, kodun 30 Eylül'e kadar tamamlanması, NU7'ın 6 Ekim'de test ağında kullanıma sunulması ve nihai kararın 20 Ekim'de verilmesi takviminde anlaştı. NU7, 6 Kasım 2026'da (UTC) 3.543.405 yüksekliğinde ana ağda etkinleştirildi ([ZIP 259](https://zips.z.cash/zip-0259)); dolayısıyla 25 saniyelik hedef artık yürürlükte.
- **Uygulama:** Zebra ([#11440](https://github.com/ZcashFoundation/zebra/issues/11440)) ve Zakura ([PR #1066](https://github.com/zakura-core/zakura/pull/1066)) üzerinden takip ediliyor.

## Bu sizin için ne anlama geliyor?

- **ZEC tutuyorsanız:** Yapmanız gereken bir şey yok. Bakiyeniz ve arz takvimi etkilenmiyor.
- **Cüzdan kullanıyorsanız:** Cüzdanınız NU7 desteğini yayımladığında güncelleyin. İlk onaylar yaklaşık üç kat daha hızlı gelecek.
- **Bir düğüm, borsa veya hizmet işletiyorsanız:** Etkinleştirmeden önce yükseltme yapmayı planlayın ve blok sayısıyla ölçülen tüm ayarları gözden geçirin; çünkü sabit bir blok sayısı artık eskisinin üçte biri kadar süreyi kapsıyor.

## Kaynaklar

- [ZIP 218: 25 saniyelik blok hedef aralığı](https://zips.z.cash/zip-0218)
- [ZIP 208: Daha kısa blok hedef aralığı](https://zips.z.cash/zip-0208), Blossom emsali
- [Forum: Öneri — Zcash blok hedef aralığını 25 saniyeye indirme](https://forum.zcashcommunity.com/t/proposal-lower-zcash-block-target-spacing-to-25s/54577)
- [Forum: Zcash blok süresi azaltımının NU7 için güvenli göründüğünü gösteren, yalnızca Zebra kullanan devnet](https://forum.zcashcommunity.com/t/zcash-block-time-reduction-appears-safe-for-nu7-w-zebra-only-devnet/55586)
- [Zebra 11463 numaralı konu](https://github.com/ZcashFoundation/zebra/issues/11463), NU7 sonrası yarılanma aralığı ve sübvansiyon
- [Zebra 11440 numaralı konu](https://github.com/ZcashFoundation/zebra/issues/11440), ZIP 218 uygulama takibi
- NU7 anket sonuçları ve zaman çizelgesi; Bitcoin.com News, crypto.news ve KuCoin tarafından bildirildi (16–19 Eylül 2026)
