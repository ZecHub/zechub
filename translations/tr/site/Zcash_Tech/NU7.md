<a href="https://github.com/zechub/zechub/edit/main/site/Zcash_Tech/NU7.md" target="_blank">
  <img src="https://img.shields.io/badge/Edit-blue" alt="Sayfayı düzenle"/>
</a>

# NU7

> NU7, 6 Kasım 2026'da (02:34 UTC; ABD saat dilimlerinde 5 Kasım akşamı) 3.543.405 numaralı blokta Zcash Mainnet üzerinde etkinleştirildi ve o zamandan beri çalışıyor.

Öğrenecekleriniz: NU7 neleri değiştirdiğini (daha hızlı bloklar, korumalı işlem eylemi sınırları, ücretlerin yeniden dolaşıma sokulması, 4. sürüm işlemlerin sona ermesi), neleri değiştirmediğini ve düğüm operatörlerinin, cüzdanların, borsaların ve madencilerin ne yapması gerektiğini.

NU7, Zcash [ağ yükseltmesidir](../start-here/network-upgrades) ve [ZIP 259](https://zips.z.cash/zip-0259) ile dağıtılmıştır. Bloklar arasındaki süreyi 75 saniyeden 25 saniyeye düşürdü, bir bloğa sığabilecek korumalı eylem sayısını sınırladı, gelecekteki madencilere yeniden verilebilmesi için işlem ücretlerinin %60'ını dolaşımdan çıkarmaya başladı ve 4. sürüm işlemleri geçersiz kılarak eski Sprout havuzunu kullanımdan kaldırdı. Yeni bir işlem biçimi getirmedi. Mutabakat dalı kimliği `0x77190ad9`.

Bunun önemi. NU7 öncesinde ilk onay için ortalama 75 saniye bekleniyordu; bu, bir mağaza kasası, borsa yatırımı veya zincirler arası takas için yavaştı. NU7 bunu daha fazla ZEC basmadan yaklaşık 25 saniyeye indirdi: blok başına ödül üçte bire düşürüldü, böylece günlük arz aynı kaldı. Ayrıca blok ödülleri azaldıktan sonra ağ güvenliğinin finanse edilmesini amaçlayan bir mekanizma ekleyen ilk yükseltmedir.

Zcash'te yeni misiniz? Önce [ZEC nedir ve Zcash](../start-here/what-is-zec-and-zcash) ile [Korumalı Havuzlar](../using-zcash/shielded-pools) sayfalarını okuyun, sonra buraya dönün.

## Kısaca

Basitçe söylemek gerekirse: bloklar artık her 25 saniyede bir geliyor, günlük yeni ZEC miktarı aynı kalıyor, her ücretin bir kısmı gelecekteki madenciler için biriktiriliyor ve eski Sprout havuzu kapatılıyor.

- **25 saniyelik bloklar** ([ZIP 218](https://zips.z.cash/zip-0218)): İlk onay 75 saniye yerine yaklaşık 25 saniyede geliyor. Blok sübvansiyonu 1,5625'ten 0,52083333 ZEC'e düştü; böylece günde yaklaşık 1.800 ZEC çıkarılmaya devam ediyor.
- **Korumalı eylem sınırları** (ZIP 218): Tüm havuzlarda blok başına en fazla 330 korumalı eylem ve havuz başına sınırlar uygulanıyor. Böylece en kötü durumdaki blok doğrulama ve cüzdan eşitleme maliyetleri öncekinin altında tutuluyor.
- **Ağ Sürdürülebilirliği Mekanizması** ([ZIP 235](https://zips.z.cash/zip-0235) + [ZIP 237](https://zips.z.cash/zip-0237)): Her bloğun işlem ücretlerinin %60'ı dolaşımdan çıkarılıyor ve daha sonra madencilere yeniden veriliyor. Bu, 8.939.664 numaralı blokta (öngörülen tarih Şubat 2031 civarı) başlayacak. 21 milyon arz sınırı değişmedi.
- **4. sürüm işlemler geçersiz** ([ZIP 2003](https://zips.z.cash/zip-2003)): Cüzdanlar v5 veya v6 işlemler oluşturmalı. Sprout yalnızca v4 ile harcanabildiğinden, Sprout içinde kalan fonlar artık dondurulmuş durumda.
- **Yazılım**: [Zebra 7.0.0](https://github.com/ZcashFoundation/zebra/releases/tag/v7.0.0) ve sonraki sürümler NU7 kurallarını izliyor. NU7 desteği olan bir `zcashd` sürümü yok.

## Görsel benzetme

Zinciri bir tren hattı gibi düşünün. NU7 öncesinde trenler her 75 saniyede bir kalkıyor ve 2 MB'lık kapasiteye sığan kadar yolcu taşıyabiliyordu. NU7 her 25 saniyede bir tren çalıştırıyor, günlük toplam aynı kalsın diye her sürücüye eski ücretin üçte birini ödüyor ve tek bir trenin kontrolünün çok uzun sürmemesi için en ağır yolculardan (korumalı eylemler) bir trene binebileceklerin sayısını sınırlıyor.

![NU7 in four panels: blocks are three times faster and new ZEC per day stays the same; 60% of fees go into a public reserve for rewards from 2031; the legacy Sprout pool from 2016 can no longer be spent; 98.9% of voting ZEC chose to keep halvings](https://raw.githubusercontent.com/ZecHub/zechub/main/site/Zcash_Tech/assets/nu7-four-changes.png)

## NU7 neleri değiştirdi

### 25 saniyelik blok hedef aralığı (ZIP 218)

- Zorluk ayarlaması artık 75 saniye yerine her **25 saniyede** bir blok hedefliyor; dolayısıyla bloklar üç kat daha sık geliyor.
- Blok sübvansiyonu üçe bölündü: mevcut yarılanma döneminde blok başına **0,52083333 ZEC** (önceden 1,5625 ZEC). Günlük arz yaklaşık 1.800 ZEC olarak kalıyor (günde 1.152 yerine 3.456 blok).
- Yarılanmalar hâlâ dört yılda bir gerçekleşiyor. Bloklar hızlandığından sonraki yarılanma **6.132.390** numaralı bloğa taşındı; 25 saniyelik aralıklarla Kasım 2028 sonlarına doğru gerçekleşmesi öngörülüyor (ZIP 259).
- Zorluk ortalama penceresi 17'den **102 bloğa** çıkarıldı; böylece ayarlama yine benzer uzunlukta bir zaman aralığını dikkate alıyor.
- Varsayılan işlem sona erme süresi 40'tan **120 bloğa** çıkarıldı; bu da süreyi yaklaşık 50 dakikada tutuyor.

### Korumalı eylem sınırları (ZIP 218)

Her blokta artık ortak bir bütçe ve havuz başına sınırlar var:

| Sınır | Blok başına |
|---|---|
| Havuzlardaki tüm korumalı eylemler | 330 |
| Orchard eylemleri | 330 |
| Ironwood eylemleri | 330 |
| Sapling girdileri + çıktıları | 300 |
| Sprout JoinSplits | izin verilmiyor |

NU7 öncesinde, 2 MB'lık tam bir blok yaklaşık 617 Orchard veya Ironwood eylemi ya da yaklaşık 2.107 Sapling çıktısı içerebiliyordu ve havuz başına herhangi bir sınır yoktu. ZIP 218 yeni sınırları belirleyerek, blok sayısı üç katına çıksa bile düğümler ve cüzdan eşitleme için en kötü durumun öncekinden daha iyi olmasını sağlıyor (örneğin, hafif istemcilerin korumalı eşitlemesi için azami bant genişliği günde yaklaşık 271 MB'tan 169 MB'a düşüyor). Aynı zamanda Orchard protokolünün işlem hacmi iki kattan fazla artıyor (2 eylemli işlemler için saniyede yaklaşık 2,9'dan 6,6 işleme).

### Ağ Sürdürülebilirliği Mekanizması (ZIP 235 + ZIP 237)

- **Ücretlerin dolaşımdan çıkarılması (ZIP 235):** Her bloktaki işlem ücretlerinin %60'ı dolaşımdan çıkarılıyor; kalan %40'ı önceki gibi madenciye gidiyor. Yakımdan farklı olarak, çıkarılan ZEC izleniyor ve daha sonra yeniden ihraç edilebiliyor.
- **Yeniden ihraç (ZIP 237):** Çıkarılan ZEC, NSM Değer Bakiyesi adı verilen açık mutabakat durumunda tutuluyor. Bu bakiye NU7 sırasında geçmişte madencilerin talep etmeden bıraktığı değerle oluşturuldu. **8.939.664** numaralı bloktan itibaren (Şubat 2031 civarında olması öngörülüyor), her blok normal yarılanma takvimine ek olarak bu bakiyenin sabit bir kısmını ihraç ediyor.
- Arz sınırı yükselmiyor. Bakiye sıfır olduğunda ihraç, eski yarılanma takvimini aynen izliyor.
- NU7, [ZIP 233](https://zips.z.cash/zip-0233) (kullanıcıların gönüllü olarak dolaşımdan çıkarması) veya [ZIP 234](https://zips.z.cash/zip-0234)'ü (yarılanmaların yumuşak bir eğriyle değiştirilmesi) devreye **almadı**. Coinholder anketlerinde ZIP 237'de yarılanmayı koruyan tasarım seçildi.
- Rakamlar (368.58 ZEC başlangıç bakiyesi, blok başına yeniden ihraç oranı ve yeniden ihracın neden 8.939.664 numaralı blokta başladığı) [Network Sustainability Mechanism](./Network_Sustainability_Mechanism.md) sayfasında yer alıyor.

### 4. sürüm işlemlere izin verilmiyor (ZIP 2003)

- NU7 itibarıyla her 4. sürüm işlem geçersiz: yalnızca Sprout transferleri değil, şeffaf ve Sapling işlemler de v4 biçiminde oluşturulmuşsa geçersiz. 5. sürüm (NU5) ve 6. sürüm ([Ironwood](../zcash-tech/ironwood)) işlemler değişmedi.
- Sprout transferleri yalnızca v4 biçiminde mevcut olduğundan, [Sprout](../zcash-tech/sprout) havuzundan artık harcama yapılamıyor. Bkz. [Fonları Kurtarma](../using-zcash/recovering-funds).

### Daha küçük değişiklikler

- Finansman akışlarının 25 saniyelik bloklarla çalışması için geliştirme fonu kuralı revizyonları ([ZIP 207](https://zips.z.cash/zip-0207) Revizyon 2, [ZIP 214](https://zips.z.cash/zip-0214) Revizyon 3) ve finansman akışı adres listesinde güncelleme ([ZIP 2008](https://zips.z.cash/zip-2008)).
- NU7 düğümleri Mainnet'te **170190** ağ protokolü sürümünü duyuruyor ve etkinleştirmeden sonra eski eş bağlantılarını kesiyor.

## NU7 neleri yapmadı

- **Yeni işlem biçimi yok.** NU7, Ironwood v6 işlemlerini tanıttıktan hemen sonra cüzdan ve ayrıştırıcıları yeniden taşımaya zorlamaktan bilerek kaçındı.
- **Arz sınırında veya dört yıllık yarılanma düzeninde değişiklik yok.**
- **Coinbase olgunlaşma süresinde değişiklik yok.** Madencilikle çıkarılan coinlerin harcanabilmesi için hâlâ 100 blok geçmesi gerekiyor (artık yaklaşık 2 saat yerine 42 dakika).
- **Yeni korumalı havuz yok.** Ironwood (NU6.3) en yeni havuz olmaya devam ediyor; Orchard, Ironwood'ten beri olduğu gibi yalnızca harcama amacıyla kullanılabiliyor.

## Her grubun yapması gerekenler

- **Düğüm operatörleri:** [Zebra 7.0.0](https://github.com/ZcashFoundation/zebra/releases/tag/v7.0.0) veya sonraki sürümleri çalıştırın. Zebra 7, ilk başlatmada veritabanını v28 biçiminden v29'a taşır; Zebra 6.x v29'u okuyamadığından yükseltmeden önce `state/v28` yedeğini alın. `zcashd` için NU7 sürümü yok (en son sürümü Haziran 2026 tarihli 6.20.0); Zebra kitabındaki [zcashd API geçiş kılavuzu](https://zebra.zfnd.org/user/zcashd-api-migration-guide.html) her `zcashd` RPC'sini Zebra, [Zallet](../zcash-tech/zallet) veya onun yerine geçen RPC ile eşleştiriyor. Bkz. [Tam Düğümler](../zcash-tech/full-nodes) ve [Güçlendirilmiş Zebra kılavuzu](../guides/hardened-zebrad).
- **Cüzdanlar:** v4 işlem oluşturmayı bırakın, 120 blokluk varsayılan sona erme süresini kullanın, 3 blokluk dayanak derinliğini koruyun (artık yaklaşık 1,25 dakika) ve blok başına eylem sınırlarına uyun. Sınırı tek başına aşan bir işlem hiçbir zaman kazılamaz.
- **Borsalar ve ödeme hizmetleri:** Bir onay artık 25 saniye sürüyor; dolayısıyla aynı sayıda onay sürenin üçte birini kapsıyor. Eski sayıyı alışkanlıkla korumak yerine yatırma onay sayılarını istediğiniz süre ve güvenlik düzeyine göre yeniden değerlendirin.
- **Madenciler ve havuzlar:** Madencilik yazılımı ve şablonlar yeni sübvansiyonu, ücret paylaşımını ve eylem sınırlarını kullanmalı; eski kurallara göre oluşturulan bloklar reddedilir.

## Sık yapılan hatalar

- **"Eski düğümüm hâlâ çalışıyor, demek ki sorun yok."** Yalnızca NU7 için, ZIP 259 yükseltme öncesi yazılımın etkinleştirmeden önce kendini kapatması yönündeki olağan kuralı kaldırdı. 6.x sürümündeki Zebra veya bir `zcashd` düğümü eski kurallarla çevrimiçi kalabilir ve fark edilmeden gerçek zincirden kopabilir. Düğümünüzün 3.543.405'in üzerindeki bir yükseklik bildirdiğini ve blok gezginiyle eşleştiğini kontrol edin.
- **"Daha hızlı bloklar daha fazla ZEC basılması demek."** Hayır. Blok başına sübvansiyon üçte bire düştüğü için günlük ihraç değişmedi.
- **"Ücretlerin %60'ı sonsuza dek yakılıyor."** Hayır. Ücretler dolaşımdan çıkarılıyor ve daha sonra NSM aracılığıyla madencilere yeniden veriliyor; arz sınırı değişmiyor.
- **"v4 değişikliğinden yalnızca Sprout kullanıcıları etkileniyor."** Şeffaf ve Sapling işlemler de dahil olmak üzere v4 işlem üreten tüm cüzdan veya betikler çalışmayı durdurdu. Bekleyen v4 işlemler etkinleştirme sırasında geçersiz oldu; işlemi yeniden imzalamak tek başına geçerli kılmaz.
- **"Blok sayısına dayalı ayarlar aynı kalır."** Bloklarla ölçülen her şey (onaylar, sona erme süreleri, kilit süreleri, zaman aşımları) gerçek zamanda artık üç kat daha hızlı ilerliyor.

## Terimler sözlüğü

| Terim | Sade dille anlamı |
|---|---|
| Block target spacing | Zorluk ayarlamasının hedeflediği ortalama bloklar arası süre: NU7'ten bu yana 25 saniye |
| Block subsidy | Her blokta oluşturulan yeni ZEC; madenci ve geliştirme fonu akışları arasında paylaştırılır |
| Shielded action | Bir işlemdeki korumalı iş birimi (bir Orchard veya Ironwood eylemi ya da bir Sapling girdisi veya çıktısı) |
| Network Sustainability Mechanism (NSM) | Ücretlerin bir kısmını dolaşımdan çıkarıp gelecekteki madencilere yeniden veren kurallar |
| NSM Value Balance | Dolaşımdan çıkarılmış ve yeniden verilmek üzere bekleyen ZEC toplamının herkese açık güncel değeri |
| Version 4 transaction | Sapling işlem biçimi; NU7 tarafından geçersiz kılındı. v5 ve v6 geçerliliğini koruyor |
| Consensus branch ID | Bir mutabakat kuralı kümesini tanımlayan sayı; imzalar bu sayıya bağlıdır, dolayısıyla eski kurallar için imzalanan bir işlem yeni kurallar altında geçersizdir |

## SSS

**NU7 ne zaman etkinleştirildi?** Mainnet'te 6 Kasım 2026 saat 02:34 UTC'de, 3.543.405 numaralı blokta. Testnet daha önce, 4 Ekim 2026'da 4.465.026 numaralı blokta etkinleştirildi.

**Blok ödülü değişti mi?** Blok başına evet: 1,5625 ZEC yerine 0,52083333 ZEC. Günlük hayır: her iki durumda da yaklaşık 1.800 ZEC.

**Sprout ZEC'im kayboldu mu?** Artık taşınamaz, çünkü Sprout harcamaları v4 işlemler gerektiriyor ve bunlar artık geçersiz. Bunun uygulamada ne anlama geldiği için bkz. [Fonları Kurtarma](../using-zcash/recovering-funds).

**Yeni bir cüzdana ihtiyacım var mı?** NU7 destekleyen bir cüzdan sürümü kullanmanız gerekiyor. ZecHub'ün [Cüzdanlar](../using-zcash/wallets) sayfası, hangi cüzdanların NU7 uyumlu olduğunu gösteriyor.

**Ücretlerin yeniden verilmesi ne zaman başlayacak?** Mainnet'te 8.939.664 numaralı blokta; bloklar ortalama 25 saniyelik aralıklarla gelmeye devam ederse Şubat 2031 civarında.

**NU7 yeni bir işlem biçimini neden atladı?** Cüzdanları ve ayrıştırıcıları Ironwood'ün v6 biçiminden hemen sonra ikinci bir geçişe zorlamamak ve ücret paylaşımının blok başına hesaplanması nedeniyle yeni bir işlem alanına gerek olmaması için.

## Bilginizi sınayın

1. NU7 sonrasında günlük ZEC ihracı neden aynı kalıyor?
2. Dolaşımdan çıkarılan ücretlerin %60'ına ne oluyor?
3. NU7 sonrasında Sprout fonları neden harcanamıyor?
4. Hiç yükseltilmemiş bir düğüm bu yükseltmede neden özellikle risklidir?

Yanıtlar: (1) blok başına sübvansiyon üçte bire indirilirken bloklar üç kat sıklaşıyor; (2) NSM Değer Bakiyesi'ne aktarılıyor ve 8.939.664 numaralı bloktan itibaren madencilere yeniden veriliyor; (3) Sprout harcamaları yalnızca v4 biçiminde mevcut ve NU7 bunu geçersiz kıldı; (4) ZIP 259 otomatik kapanmayı kaldırdığı için eski bir düğüm yanlış zincirde çalışmayı sürdürebilir.

### Kaynaklar

[ZIP 259: NU7 Ağ Yükseltmesinin](https://zips.z.cash/zip-0259) Dağıtımı

[ZIP 218: 25 Saniyelik Blok Hedef Aralığı](https://zips.z.cash/zip-0218)

[ZIP 235: İşlem Ücretlerinin %60'ını Dolaşımdan Çıkarma](https://zips.z.cash/zip-0235)

[ZIP 237: Ağ Sürdürülebilirliği Mekanizması: Yarılanmayı Koruyan İhraç](https://zips.z.cash/zip-0237)

[ZIP 2003: 4. sürüm işlemlere izin vermeme](https://zips.z.cash/zip-2003)

[Zebra 7.0.0 sürüm notları](https://github.com/ZcashFoundation/zebra/releases/tag/v7.0.0)

[Zcash Topluluk Forumu: NU7 Zaman Çizelgesi](https://forum.zcashcommunity.com/t/nu7-timeline/57655)

## İlgili Sayfalar

| Sayfa | İlgili olma nedeni |
|---|---|
| [Ironwood](./Ironwood.md) | serideki, v6 işlemlerini tanıtan önceki yükseltme |
| [25 Saniyelik Bloklar Gerçekte Neleri Değiştiriyor](../research/what-25-second-blocks-actually-change) | daha hızlı blok süresine daha derinlemesine bakış |
| [Ağ Sürdürülebilirliği Mekanizması](./Network_Sustainability_Mechanism.md) | ücretlerin kaldırılması ve yeniden ihracının NU7 etkinleşmesinin sayılarla açıklaması |
| [Sprout](./Sprout.md) | kullanımdan kaldırılan NU7 havuzu |
| [Fonları Kurtarma](../using-zcash/recovering-funds) | Sprout dondurmasının eski fonlar için ne anlama geldiği |
| [İşlemler](../using-zcash/transactions) | NU7 sonrasında sona erme ve onaylar |

---

Seri: [Ağ Yükseltmeleri dizini](../start-here/network-upgrades) · Önceki: [Ironwood](../zcash-tech/ironwood)
