<a href="https://github.com/zechub/zechub/edit/main/site/Using_Zcash/Payment_Processors.md" target="_blank">
  <img src="https://img.shields.io/badge/Edit-blue" alt="Edit Page"/>
</a>

# Zcash Ödeme İşleyicileri

Bir tüccar olarak ZEC kabul etmenin yolları, yan yana karşılaştırılmıştır. Her giriş, sağlayıcının kendi sitesi ve API’si üzerinden **29 Temmuz 2026** tarihinde kontrol edilmiştir.

Gizlilik varlıklarına destek sık sık değişir, bu yüzden her satır kendi doğrulama tarihini taşır. Bunu aylar sonra okuyorsanız, entegrasyon yapmadan önce sağlayıcının sitesini kontrol edin.

<div class="processor-table">

| İşleyici | Saklama | Shielded ZEC | Kendi barındırma | Tüccar ücreti | Bölgeler / KYC | Doğrulandı |
|:--|:--|:--|:--|:--|:--|:--|
| [CipherPay](https://www.cipherpay.app) | Saklamasız | Evet, Unified Address üzerinden Orchard | Evet, açık kaynak | Ödeme başına %1, kendi barındırırsanız ücretsiz | KYC yok, bölgeler belirtilmemiş | 2026-07-29 |
| [BTCPay Server](https://github.com/btcpay-zcash/btcpayserver-zcash-plugin) | Saklamasız, yalnızca view key | Evet, yalnızca shielded (Sapling, Orchard, UA) | Evet, açık kaynak | Yok, sadece ağ ücretlerini ödersiniz | Küresel, KYC yok | 2026-07-29 |
| [ZGo](https://zgo.cash/) | Saklamasız | Evet, Sapling ve Orchard | Hayır, barındırılan hizmet | Ön ödemeli oturum, fiyat yayımlanmamış | KYC belirtilmemiş, bölgeler belirtilmemiş | 2026-07-29 |
| [Flexa](https://flexa.co/) | Müşteri kendi saklamasını yapar, tüccar itibari para ile uzlaşır | Müşteri shielded harcar, alım tarafı belgelenmemiş | Hayır | Ödeme başına %1 | ABD ve 37 SEPA ülkesi, AB’de ZEC doğrulanmadı | 2026-07-29 |
| [NOWPayments](https://nowpayments.io/supported-coins/zcash-payments) | Varsayılan olarak saklamasız | Hayır, yalnızca şeffaf adres | Hayır | %0,5 veya dönüşümle %1 | Yasak olan yerler dışında küresel, başlamak için KYC yok | 2026-07-29 |
| [Plisio](https://plisio.net/accept-zcash) | Pazarlamasına rağmen saklamalı | Belgelenmemiş | Hayır | API %0,5, white label %1,5 | Ödeme almak için KYC yok | 2026-07-29 |
| [Binance Pay](https://pay.binance.com/en) | Saklamalı, zincir dışı | Hayır, shielded yatırmalar reddedilir | Hayır | Cüzdandan cüzdana ücretsiz, ödemeler %0,8 | Coğrafi olarak kısıtlı, ZEC FR, ES, IT, PL’de listeden çıkarıldı | 2026-07-29 |

</div>

### Sütunların anlamı

**Saklama**, işleyicinin ZEC’inizi tutup tutmadığını ifade eder. Saklamasız olması, ZEC’in sizin kontrol ettiğiniz bir cüzdana gitmesi demektir.

**Shielded ZEC**, ödemenin shielded havuza alınıp alınamayacağını ifade eder. Yalnızca şeffaf olması, tutarın ve adreslerin blokzincir üzerinde herkese açık olduğu anlamına gelir.

**Kendi barındırma**, arada bir şirket olmadan yazılımı kendiniz çalıştırıp çalıştıramayacağınızı ifade eder.

**Tüccar ücreti**, her durumda birilerinin ödediği Zcash ağ ücretlerini içermez.

Bir sağlayıcı bir şeyi yayımlamıyorsa, tahmin yürütmek yerine girişte "belirtilmemiş" veya "belgelenmemiş" yazılır. Bu, "hayır" ile aynı şey değildir.

### Hangisini seçmeli

En yüksek gizlilik ve kontrol için **BTCPay Server** veya kendi barındırdığınız **CipherPay** kullanın. Her ikisi de shielded, açık kaynaklıdır ve sizin adınıza fon tutmaz.

Çevrimiçi değil de mağaza içinde ödeme almak için **Flexa** kullanın.

Şeffaf ödemelerin kabul edilebilir olduğu barındırılan bir ağ geçidi için **NOWPayments** veya **Plisio** kullanın.

Tekrar etmeye değer bir uyarı: yalnızca şeffaf çalışan bir işleyici, her ödeme tutarını ve adresini blokzincirde yayımlar. Ayrıca barındırılan herhangi bir saklamasız işleyicide viewing key’inizi teslim edersiniz; bu yüzden şirket, ödemelerinizi harcayamasa da görebilir. Bunu önlemenin tek yolu kendi barındırmanızdır.

<div class="processor-note">

**ZGo hizmet uyarısı, 29 Temmuz 2026.** Bu sayfa kontrol edilirken api.zgo.cash adresindeki ZGo arka ucu her uç noktada HTTP 503 döndürdü. Proje terk edilmiş değil ve bakımcısı bu ay topluluk içinde aktifti, ancak ona güvenmeden önce hizmetin çalıştığını doğrulayın.

</div>

---

## [CipherPay](https://www.cipherpay.app) <img src="/content-images/cipherpay-mark.png" alt="CipherPay logo" class="processor-logo" />
- **Destek Türü**: Shielded (Orchard, Unified Address üzerinden)
- **Açıklama**: Dakikalar içinde Zcash kabul edin, Saklamasız, Sıfır alıcı verisi, Aracı yok.
- **URL**: [CipherPay](https://www.cipherpay.app)
<img src="/content-images/cipherpay-mark.png" alt="CipherPay logo" width="200" hidden />

CipherPay’e yalnızca görüntüleme amaçlı bir anahtar verirsiniz; böylece ödemeler doğrudan kendi cüzdanınıza gider ve asla fon tutmaz. Her fatura için yeni bir adres kullanır.

Yalnızca Orchard. Depo README dosyasında Sapling’den bahsedilse de Sapling veya şeffaf destek yoktur.

Ödeme başına %1 ücret alır ve kendiniz çalıştırırsanız tamamen ücretsizdir. Tüm sistem, SQLite kullanan bir Rust ikilisi veya bir Docker imajı olarak açık kaynaklıdır. KYC yoktur ve alıcıların bir hesaba ihtiyacı yoktur.

Entegrasyonlar Shopify, WooCommerce, bir REST API, barındırılan ödeme sayfası, ödeme bağlantıları ve yüz yüze QR’ı kapsar.

Dikkate alınması gereken iki nokta var. Şubat 2026’da başlatıldı ve yayımlanmış bir güvenlik denetimi yok. Ayrıca barındırılan katmanda operatör sizin viewing key’inizi tutar, bu yüzden ödemelerinizi görebilir. Kendi barındırma bunu ortadan kaldırır. Shielded ödemeler de kesindir; bu yüzden iade için alıcının size bir adres vermesi gerekir.

**Son doğrulama:** 2026-07-29

---

## [BTCPay Server](https://github.com/btcpay-zcash/btcpayserver-zcash-plugin) <img src="/content-images/btcpay-mark.png" alt="BTCPay Server logo" class="processor-logo" />
- **Destek Türü**: Yalnızca shielded (Sapling, Orchard, Unified Address)
- **Açıklama**: BTCPay Server, açık kaynaklı, kendi barındırılan bir kripto para ödeme işleyicisidir.
- **URL**: [BTCPay Server](https://github.com/btcpay-zcash/btcpayserver-zcash-plugin)
<img src="/content-images/btcpay-mark.png" alt="BTCPay Server logo" width="200" hidden />

Saklama açısından en güçlü seçenektir. Cüzdan arka ucu yalnızca görüntüleme amaçlıdır ve hiçbir seed veya gizli anahtar tutmaz; bu nedenle sunucu ele geçirilse bile paranızı harcayamaz.

Yalnızca shielded, Sapling, Orchard ve Unified Address desteği sunar. Şeffaf bir geri dönüş seçeneği yoktur, dolayısıyla buna göre plan yapmayın.

Kurulum için feat/zec dalındaki btcpay-zcash Docker çatalına, ayrıca Ywallet veya Zingo gibi bir cüzdandan dışa aktarılmış bir viewing key’e ihtiyacınız vardır. Varsayılan olarak uzak bir lightwalletd ile konuşur ya da Zebra ve lightwalletd’yi kendiniz çalıştırabilirsiniz.

Bilmeniz gereken bir sınırlama: eklenti, bir örnek üzerindeki her mağaza için tek bir Zcash cüzdanı kullanır; bu nedenle paylaşımlı bir sunucuda çalıştırmayın. Mağaza başına cüzdan üzerinde çalışılıyor.

Yazılımın kendisine ait bir ücret yoktur. Zcash ağ ücretlerini ve barındırma maliyetlerinizi ödersiniz.

**Son doğrulama:** 2026-07-29

---

## [ZGo](https://zgo.cash/) <img src="/content-images/zgo-prp2-497679039b.webp" alt="ZGo logo" class="processor-logo" />
- **Destek Türü**: Shielded (Sapling ve Orchard)
- **Açıklama**: ZGo, müşterinizden doğrudan size giden, arada üçüncü taraf olmayan bir elektronik ödeme platformudur.
- **URL**: [ZGo](https://zgo.cash/)
<img src="/content-images/zgo-prp2-497679039b.webp" alt="ZGo logo" width="200" hidden />

Tarayıcıda çalışan bir kasa sistemi; yani bir dizüstü bilgisayar, tablet veya telefon ödeme noktasına dönüşür. Ayrıca bir WooCommerce eklentisi ve bir REST API’si vardır. Vergara Technologies tarafından geliştirildi ve zcashd’den Zebra’ya geçiş de dahil olmak üzere Zcash Community Grants tarafından finanse edildi.

Fonlar müşteriden doğrudan sizin cüzdanınıza gider, arada kimse yoktur.

Shielded’dir; Unified Address aracılığıyla Sapling ve Orchard’ı kapsar ve ZIP 321’i takip eder. Hiçbir güncel kaynak şeffaf adresleri işlediğini söylemediği için bu sayfa artık işlediğini iddia etmiyor.

Gerçek anlamda kendi başınıza barındıramazsınız. ZGo, Zcash altyapısını sizin için çalıştırır ve hiçbir dağıtım rehberi yayımlamaz. Yine de kaynak kodu bakımcının kendi Git sunucusunda herkese açıktır; insanların genelde bulduğu GitLab kopyası ise 2022’den kalma eski bir aynadır.

Ücretsiz de değildir. ZGo ön ödemeli oturumlar satar ve WooCommerce için bir Pro oturumu gerekir, ancak fiyatlandırma sayfasına şu anda ulaşılamadığı için burada bir rakam verilmemiştir.

**Son doğrulama:** 2026-07-29

---

## [Flexa](https://flexa.co/) <img src="/content-images/flexa-mark.png" alt="Flexa logo" class="processor-logo" />
- **Destek Türü**: Müşteri shielded harcar, alım tarafı belgelenmemiş
- **Açıklama**: Flexa, müşterilerin Zcash dahil dijital varlıkları kendi saklama cüzdanlarından perakende noktalarda harcamasını sağlayan bir ödeme ağıdır.
- **URL**: [Flexa](https://flexa.co/)
<img src="/content-images/flexa-mark.png" alt="Flexa logo" width="200" hidden />

Flexa bir ödeme sayfası ağ geçidi değildir; dolayısıyla burada yer alan diğerlerinin yerine geçmez. Müşteri Zodl gibi Flexa destekli bir cüzdan açar, tek kullanımlık bir kod gösterir ve mağaza bunu tarar. ZEC faturası da yoktur, e-ticaret eklentisi de.

Müşteri, ödeme yaptığı ana kadar kendi coin’lerini elinde tutar. Siz tüccar olarak hiç ZEC almazsınız. Flexa size seçtiğiniz para biriminde uzlaşma yapar, dolayısıyla kripto tarafını onlar yönetir.

Flexa’nın kendi duyurusu Zcash entegrasyonunu shielded ZEC ile ödeme olarak tanımlar. Flexa’nın hangi adres türüne alım yaptığı ise hiçbir yerde yayımlanmamıştır.

Ücret ödeme başına %1’dir; dönüşüm ve saklama ek ücret olmadan dahildir.

Amerika Birleşik Devletleri’nde ve Temmuz 2026’dan itibaren 37 SEPA ülke ve bölgesinde çalışır. Özellikle ZEC’in Avrupa’da harcanıp harcanamayacağı belirtilmemiştir.

**Son doğrulama:** 2026-07-29

---

## [NOWPayments](https://nowpayments.io/supported-coins/zcash-payments) <img src="/content-images/nowpayments-wordmark.png" alt="NOWPayments logo" class="processor-logo processor-logo-wide" />
- **Destek Türü**: Yalnızca şeffaf
- **Açıklama**: NOWPayments, tüccarların Zcash ödemelerini ve bağışlarını kolayca kabul etmesini sağlayan bir kripto ödeme ağ geçididir.
- **URL**: [NOWPayments](https://nowpayments.io/supported-coins/zcash-payments)
<img src="/content-images/nowpayments-wordmark.png" alt="NOWPayments logo" width="200" hidden />

Shielded desteği yoktur. Belgeleri, Zcash için şeffaf bir adres ayarlamanızı söyler ve ZEC bunu bu şekilde özellikle belirttikleri tek coin’dir. Aldığınız her ödeme blokzincirde herkese açıktır.

Varsayılan olarak saklamasızdır. SSS sayfalarında fon saklamadıklarını ve asla private key tutmadıklarını söylüyorlar. İsteğe bağlı bir saklama bakiyesi vardır; bu yüzden emin olmanız gerekiyorsa hesap ayarlarınızı kontrol edin.

Ücretler, doğrudan bir ödeme için %0,5; çok para birimli, sabit kur oranlı veya "ücreti kullanıcı öder" ödemeler için %1’dir; bunlara ağ ücretleri eklenir.

Yasanın yasakladığı yerler dışında dünya çapında kullanılabilir. Kripto kabul etmeye başlamak için KYC gerekmez, yalnızca itibari para çekmek için gerekir.

**Son doğrulama:** 2026-07-29

---

## [Plisio](https://plisio.net/accept-zcash) <img src="/content-images/plisio-wordmark.png" alt="Plisio logo" class="processor-logo processor-logo-wide" />
- **Destek Türü**: Şeffaf (belgelenmemiş)
- **Açıklama**: Plisio, işletmelerin Zcash ödemelerini kabul etmesine olanak tanıyan bir kripto para ödeme ağ geçididir.
- **URL**: [Plisio](https://plisio.net/accept-zcash)
<img src="/content-images/plisio-wordmark.png" alt="Plisio logo" width="200" hidden />

Bunu saklamalı olarak değerlendirin. Plisio pazarlamasında saklamasız olduğunu söylese de kendi yardım sayfaları platformda tutulan bakiyeleri, soğuk depolamayı ve bir para çekme sürecini anlatıyor. Saklamasız olduğu iddiası doğrulanamadı.

Plisio hangi Zcash adres türlerini kullandığını hiç söylemiyor; bu yüzden biri aksini doğrulayana kadar şeffaf varsayın.

Cüzdan ücretsizdir, ağ geçidi ve API %0,5’tir ve White Label %1,5’tir. White Label, onların barındırılan hizmetinin yeniden markalanmış hâlidir; kendi barındırma değildir.

Ödeme almak için KYC gerekmez ve kısıtlı ülkelerin bir listesi yayımlanmamıştır.

**Son doğrulama:** 2026-07-29

---

## [Binance Pay](https://pay.binance.com/en) <img src="/content-images/binancepay-mark.png" alt="Binance Pay logo" class="processor-logo" />
- **Destek Türü**: Yalnızca şeffaf, shielded yatırmalar reddedilir
- **Açıklama**: Binance Pay, Zcash ödemelerini destekleyen bir kripto para ödeme platformudur.
- **URL**: [Binance Pay](https://pay.binance.com/en)
<img src="/content-images/binancepay-mark.png" alt="Binance Pay logo" width="200" hidden />

Binance, shielded adreslerden gönderilen ZEC’i geri çevirir. TEX adreslerinin oluşturulma nedeni de bu reddetmedir.

Tamamen saklamalıdır. Ödemeler Binance Pay cüzdanları arasında zincir dışında hareket eder ve doğrulanmış bir Binance hesabına ihtiyacınız vardır.

Cüzdandan cüzdana transferler ücretsizdir, tüccar ödemeleri 5 USD üst sınırla %0,8’dir ve Mini Program tüccarları %1 öder.

Ona güvenmeden önce bulunduğunuz yerde kullanılabildiğini kontrol edin. Binance Pay bazı ülke ve sektörlerde sunulmaz, ZEC 2023’ten beri Fransa, İspanya, İtalya ve Polonya’daki kullanıcılar için listeden çıkarılmıştır ve AEA’daki hizmet MiCA kapsamında aksaklığa uğramıştır.

**Son doğrulama:** 2026-07-29

---

### Artık ZEC kabul etmeyenler

Bunların ikisi de daha önce burada listelenmişti. Her sağlayıcının kendi canlı para birimi listesi 29 Temmuz 2026’da kontrol edildi ve Zcash ikisinden de kaldırılmış durumda.

**CoinPayments**, v2 coin listesinde, eski listesinde veya canlı para birimleri API’sinde ZEC listelemiyor ve Zcash makalesi artık ana sayfaya yönlendiriyor.

**CoinGate**, desteklenen para birimleri sayfasında veya herkese açık API’sinde ZEC listelemiyor. Listeden çıkarma duyurulmadığı için nedeni ve tarihi bilinmiyor.

Eğer ikisinden biri Zcash’i geri getirirse, yeni bir doğrulama tarihiyle tekrar ekleyin.

### Bu sayfanın doğruluğunu korumak

Gizlilik coin’lerine verilen destek sürekli değişiyor; bu yüzden bu sayfa ancak son kontrolü kadar iyidir. Gözden geçirirken:

1. Sağlayıcının kendi para birimi listesini veya API’sini kontrol edin. Üçüncü taraf listeleri, yukarıda kaldırılan işleyicilerin ikisi için de güncel değildi.
2. Hangi Zcash adres türlerinin desteklendiğini kontrol edin. "Zcash destekliyor" ifadesi genellikle yalnızca şeffaf adresler anlamına gelir.
3. Tablodaki ve ilgili sağlayıcının bölümündeki doğrulama tarihini güncelleyin.
