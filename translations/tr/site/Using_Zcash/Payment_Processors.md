<a href="https://github.com/zechub/zechub/edit/main/site/Using_Zcash/Payment_Processors.md" target="_blank">
  <img src="https://img.shields.io/badge/Edit-blue" alt="Sayfayı Düzenle"/>
</a>

# Zcash Ödeme İşleyicileri

Bir işletme olarak ZEC kabul etmenin yolları yan yana karşılaştırılmıştır. **1 Kasım 2026** tarihinde eklenen Zcash Payment Service hariç her kayıt, sağlayıcının kendi sitesi ve API'si üzerinden **29 Temmuz 2026** tarihinde kontrol edilmiştir.

Gizlilik varlığı desteği sık değişir; bu nedenle her satırın kendi doğrulanma tarihi vardır. Bunu aylar sonra okuyorsanız entegrasyondan önce sağlayıcının sitesini kontrol edin.

<div class="processor-table">

| İşleyici | Saklama | Korumalı ZEC | Kendi sunucunda barındırma | Satıcı ücreti | Bölgeler / KYC | Doğrulandı |
|:--|:--|:--|:--|:--|:--|:--|
| [CipherPay](https://www.cipherpay.app) | Saklamasız | Evet, Unified Addresses aracılığıyla Orchard | Evet, açık kaynak | Ödeme başına %1, kendi sunucunda barındırılırsa ücretsiz | KYC yok, bölgeler belirtilmemiş | 2026-07-29 |
| [BTCPay Server](https://github.com/btcpay-zcash/btcpayserver-zcash-plugin) | Saklamasız, yalnızca görüntüleme anahtarı | Evet, yalnızca korumalı (Sapling, Orchard, UA) | Evet, açık kaynak | Yok, yalnızca ağ ücretlerini ödersiniz | Küresel, KYC yok | 2026-07-29 |
| [Zcash Payment Service](https://github.com/nerdcash/zcash-payment-service) | Saklamasız, yalnızca gelen görüntüleme anahtarı | Evet, yalnızca korumalı (Sapling ve Orchard) | Evet, yalnızca kendi sunucunda barındırma, açık kaynak | Yok, yalnızca ağ ücretlerini ödersiniz | Hesap yok, KYC yok | 2026-11-01 |
| [ZGo](https://zgo.cash/) | Saklamasız | Evet, Sapling ve Orchard | Hayır, barındırılan hizmet | Ön ödemeli oturum, fiyat yayımlanmamış | KYC belirtilmemiş, bölgeler belirtilmemiş | 2026-07-29 |
| [Flexa](https://flexa.co/) | Müşteri kendi saklamasını yapar, satıcı itibari para ile tahsil edilir | Müşteri korumalı harcar, alıcı taraf belgelenmemiş | Hayır | Ödeme başına %1 | ABD ve 37 SEPA ülkesi, AB'de ZEC doğrulanmamış | 2026-07-29 |
| [NOWPayments](https://nowpayments.io/supported-coins/zcash-payments) | Varsayılan olarak saklamasız | Hayır, yalnızca şeffaf adres | Hayır | %0,5 veya dönüşümle %1 | Yasaklanan yerler hariç küresel, başlamak için KYC yok | 2026-07-29 |
| [Plisio — ödemeler askıya alındı](https://plisio.net/) | Pazarlamaya rağmen saklamalı | Belgelenmemiş | Hayır | %0,5 API, %1,5 white label | Ödeme almak için KYC yok | 2026-07-29 |
| [Binance Pay](https://pay.binance.com/en) | Saklamalı, zincir dışı | Hayır, korumalı yatırmalar reddedilir | Hayır | Cüzdandan cüzdana ücretsiz, ödemelerde %0,8 | Coğrafi olarak kısıtlı, ZEC FR, ES, IT, PL'de listeden çıkarıldı | 2026-07-29 |

</div>

### Sütunların anlamı

**Saklama**, işleyicinin ZEC varlıklarınızı elinde tutup tutmadığıdır. Saklamasız olması, varlıkların sizin kontrol ettiğiniz bir cüzdana gitmesi demektir.

**Korumalı ZEC**, korumalı havuzda ödeme alıp alamayacağınızdır. Yalnızca şeffaf olması, tutarın ve adreslerin blokzincir üzerinde herkese açık olduğu anlamına gelir.

**Kendi sunucunda barındırma**, arada bir şirket olmadan yazılımı kendiniz çalıştırıp çalıştıramayacağınızdır.

**Satıcı ücreti**, her durumda birinin ödediği Zcash ağ ücretlerini içermez.

Bir sağlayıcı bir şeyi yayımlamadığında, giriş tahminde bulunmak yerine "belirtilmemiş" veya "belgelenmemiş" der. Bu, "hayır" ile aynı şey değildir.

### Hangisini seçmeli

En yüksek gizlilik ve kontrol için kendi sunucunuzda barındırılan **BTCPay Server**, bir **CipherPay** ya da sitenize biraz kod ekleyebiliyorsanız **Zcash Payment Service** kullanın. Üçü de korumalı, açık kaynaklıdır ve sizin adınıza fon tutmaz.

Çevrim içi yerine mağazada ödeme almak için **Flexa** kullanın.

Şeffaf ödemelerin kabul edilebilir olduğu, barındırılan bir ağ geçidi için **NOWPayments** veya **Plisio** kullanın.

Tekrarlanmaya değer bir uyarı: yalnızca şeffaf bir işleyici, her ödeme tutarını ve adresini blokzincirde yayımlar. Barındırılan tüm saklamasız işleyicilerde görüntüleme anahtarınızı teslim edersiniz; böylece şirket onları harcayamasa bile ödemelerinizi görebilir. Bundan kaçınmanın tek yolu kendi sunucunuzda barındırmaktır.

<div class="processor-note">

**ZGo hizmet uyarısı, 29 Temmuz 2026.** Bu sayfa kontrol edilirken api.zgo.cash üzerindeki ZGo arka ucu her uç noktada HTTP 503 döndürdü. Proje terk edilmiş değil ve bakım sorumlusu bu ay toplulukta aktifti; ancak güvenmeden önce hizmetin çalıştığını doğrulayın.

</div>

---

## [CipherPay](https://www.cipherpay.app) <img src="/content-images/cipherpay-mark.png" alt="CipherPay logosu" class="processor-logo" />
- **Destek Türü**: Korumalı (Unified Addresses aracılığıyla Orchard)
- **Açıklama**: Dakikalar içinde Zcash kabul edin; saklamasız, sıfır alıcı verisi, aracı yok.
- **URL**: [CipherPay](https://www.cipherpay.app)
<img src="/content-images/cipherpay-mark.png" alt="CipherPay logosu" width="200" hidden />

CipherPay'a yalnızca görüntüleme amaçlı bir anahtar verirsiniz; böylece ödemeler doğrudan kendi cüzdanınıza gider ve asla fon tutmaz. Her fatura için yeni bir adres kullanır.

Yalnızca Orchard. Depo README'sinde Sapling belirtilmesine rağmen Sapling veya şeffaf destek yoktur.

Ödeme başına %1 ücret alır; kendiniz çalıştırırsanız tamamen ücretsizdir. Tüm sistem, SQLite ile bir Rust ikili dosyası veya bir Docker imajı olarak açık kaynaklıdır. KYC yoktur ve alıcıların hesaba ihtiyacı yoktur.

Entegrasyonlar Shopify, WooCommerce, bir REST API, barındırılan ödeme sayfası, ödeme bağlantıları ve yüz yüze QR'ı kapsar.

Değerlendirmeniz gereken iki nokta var. Şubat 2026'da başlatıldı ve yayımlanmış bir güvenlik denetimi yok. Barındırılan katmanda operatör görüntüleme anahtarınızı tutar; dolayısıyla ödemelerinizi görebilir. Kendi sunucunuzda barındırma bunu ortadan kaldırır. Korumalı ödemeler de kesindir; bu nedenle iade için alıcının size bir adres vermesi gerekir.

**Son doğrulama:** 2026-07-29

---

## [BTCPay Server](https://github.com/btcpay-zcash/btcpayserver-zcash-plugin) <img src="/content-images/btcpay-mark.png" alt="BTCPay Server logosu" class="processor-logo" />
- **Destek Türü**: Yalnızca korumalı (Sapling, Orchard, Unified Address)
- **Açıklama**: BTCPay Server açık kaynaklı, kendi sunucunuzda barındırılan bir kripto para ödeme işleyicisidir.
- **URL**: [BTCPay Server](https://github.com/btcpay-zcash/btcpayserver-zcash-plugin)
<img src="/content-images/btcpay-mark.png" alt="BTCPay Server logosu" width="200" hidden />

Saklama açısından en güçlü seçenek. Cüzdan arka ucu yalnızca görüntüleme amaçlıdır ve seed ya da gizli anahtar tutmaz; bu nedenle ele geçirilmiş bir sunucu bile paranızı harcayamaz.

Yalnızca korumalıdır; Sapling, Orchard ve Unified Addresses'ı kapsar. Şeffaf bir geri dönüş seçeneği yoktur; dolayısıyla buna göre plan yapmayın.

Kurmak için feat/zec dalındaki btcpay-zcash Docker fork'una ve Zkool ya da Zingo gibi bir cüzdandan dışa aktarılan bir görüntüleme anahtarına ihtiyacınız vardır. Varsayılan olarak uzak bir lightwalletd ile konuşur veya Zebra ve lightwalletd'i kendiniz çalıştırabilirsiniz.

Bilinmesi gereken bir sınırlama: eklenti, bir örnekteki her mağaza için tek bir Zcash cüzdan kullanır; bu nedenle onu paylaşımlı bir sunucuda çalıştırmayın. Mağaza başına cüzdanlar üzerinde çalışılıyor.

Yazılımın kendisi için ücret yoktur. Zcash ağ ücretlerini ve barındırma maliyetlerinizi ödersiniz.

**Son doğrulama:** 2026-07-29

---

## [Zcash Payment Service](https://github.com/nerdcash/zcash-payment-service)
- **Destek Türü**: Yalnızca korumalı (Sapling ve Orchard)
- **Açıklama**: Çevrim içi satıcılar için ücretsiz, kendi sunucunuzda barındırılan bir Zcash ödeme işleyicisi; bir Docker container olarak çalışır veya bir Rust crate olarak gömülür.
- **URL**: [Zcash Payment Service](https://github.com/nerdcash/zcash-payment-service)

Kendi uygulamasında gerçek ödemeler için zaten kullanan Andrew Arnott tarafından geliştirilen ücretsiz, açık kaynaklı (MIT) bir işleyici.

Yalnızca bir gelen görüntüleme anahtarını (UIVK) tutar. Ödemelerin geldiğini görebilir ancak onları harcayamaz; dolayısıyla ele geçirilmiş bir sunucu bile fonlarınızı hareket ettiremez. Anahtar kendi sunucunuzda kalır, böylece hiçbir şirket de ödemelerinizi göremez.

Her ödeme sayfası, Sapling ve Orchard alıcıları olan ve şeffaf alıcısı olmayan yeni bir birleşik adres alır. Ödemeler doğrudan kendi cüzdanınıza gider.

Ücret, hesap veya kullanım sayacı yoktur. Zcash ağ ücretlerini ve barındırma masraflarınızı ödersiniz.

Yalnızca kendi sunucunuzda barındırılır: bir Docker container ya da zaten çalıştırdığınız bir uygulamanın içindeki bir Rust crate. Zinciri seçtiğiniz bir lightwalletd sunucusundan okur; bu nedenle tam bir düğüme ihtiyacınız yoktur.

Kurulumu eklentiyle değil kodla yapılır. Siteniz ödeme sırasında hizmetten bir ödeme adresi ve QR kodu ister; hizmet de imzalı webhook'lar üzerinden para geldiğinde sitenize bildirir. JavaScript ve TypeScript arka uçları için bir npm istemcisi ve örnek alabileceğiniz açık kaynaklı bir [demo mağazası](https://github.com/nerdcash/zcash-payment-demo-store) vardır. Shopify veya WooCommerce eklentisi yoktur; dolayısıyla sitenizin kodunu kontrol etmeniz ya da bunu kontrol eden bir geliştiriciye sahip olmanız gerekir.

Değerlendirilmesi gerekenler. Yenidir: depo Haziran 2026'da başladı, npm istemcisi 0.1 sürümünde, henüz etiketli sürüm yok ve yayımlanmış bir güvenlik denetimi bulunmuyor. API'nin kendi girişi yoktur; bu nedenle onu özel bir ağda tutun ve asla internete açmayın. Her korumalı ödemede olduğu gibi, iade için alıcının size bir adres vermesi gerekir.

**Son doğrulama:** 2026-11-01

---

## [ZGo](https://zgo.cash/) <img src="/content-images/zgo-prp2-497679039b.webp" alt="ZGo logosu" class="processor-logo" />
- **Destek Türü**: Korumalı (Sapling ve Orchard)
- **Açıklama**: ZGo, müşteri ile sizin aranızda doğrudan çalışan, üçüncü taraf içermeyen bir elektronik ödeme platformudur.
- **URL**: [ZGo](https://zgo.cash/)
<img src="/content-images/zgo-prp2-497679039b.webp" alt="ZGo logosu" width="200" hidden />

Tarayıcıda çalıştırdığınız bir kasa; böylece dizüstü bilgisayar, tablet ya da telefon ödeme noktasına dönüşür. Ayrıca bir WooCommerce eklentisi ve REST API vardır. Vergara Technologies tarafından geliştirildi ve zcashd'den Zebra'e geçiş de dahil olmak üzere Zcash Community Grants tarafından fonlandı.

Fonlar, arada kimse olmadan müşteriden doğrudan cüzdanınıza gider.

Unified Addresses üzerinden Sapling ve Orchard'yı kapsayan korumalı desteğe sahiptir ve ZIP 321'i izler. Güncel hiçbir kaynak şeffaf adresleri işlediğini söylemiyor; bu yüzden bu sayfa artık böyle bir iddiada bulunmuyor.

Onu gerçekten kendi sunucunuzda barındıramazsınız. ZGo, Zcash altyapısını sizin için çalıştırır ve dağıtım kılavuzu yayımlamaz. Kaynak, bakım sorumlusunun kendi Git sunucusunda herkese açıktır; ancak insanların genelde bulduğu GitLab kopyası eski bir 2022 aynasıdır.

Ücretsiz de değildir. ZGo ön ödemeli oturumlar satar ve WooCommerce için Pro oturumu gerekir; ancak fiyatlandırma sayfasına şu anda ulaşılamadığından burada bir rakam belirtilmemiştir.

**Son doğrulama:** 2026-07-29

---

## [Flexa](https://flexa.co/) <img src="/content-images/flexa-mark.png" alt="Flexa logosu" class="processor-logo" />
- **Destek Türü**: Müşteri korumalı harcar, alıcı taraf belgelenmemiş
- **Açıklama**: Flexa, müşterilerin kendi saklamalı cüzdanlarından perakende noktalarında Zcash dahil dijital varlık harcamasını sağlayan bir ödeme ağıdır.
- **URL**: [Flexa](https://flexa.co/)
<img src="/content-images/flexa-mark.png" alt="Flexa logosu" width="200" hidden />

Flexa bir ödeme sayfası ağ geçidi değildir; dolayısıyla burada yer alan diğerlerinin yerine geçmez. Müşteri, Zodl gibi Flexa etkin bir cüzdan açar, tek kullanımlık bir kod gösterir ve mağaza bunu tarar. ZEC faturası veya e-ticaret eklentisi yoktur.

Müşteri, ödeme yaptığı ana kadar kendi coin'lerini tutar. Siz satıcı olarak asla ZEC almazsınız. Flexa, seçtiğiniz para biriminde sizinle tahsilat yapar; dolayısıyla kripto tarafını onlar halleder.

Flexa'ın kendi duyurusu, Zcash entegrasyonunu korumalı ZEC ile ödeme olarak tanımlar. Flexa'in hangi adres türüne ödeme aldığı hiçbir yerde yayımlanmamıştır.

Dönüşüm ve saklama ek ücret olmadan dahil olmak üzere ücret, ödeme başına %1'dir.

ABD'de ve Temmuz 2026'dan beri 37 SEPA ülkesi ve bölgesinde çalışır. Özellikle ZEC'in Avrupa'da harcanıp harcanamayacağı belirtilmemiştir.

**Son doğrulama:** 2026-07-29

---

## [NOWPayments](https://nowpayments.io/supported-coins/zcash-payments) <img src="/content-images/nowpayments-wordmark.png" alt="NOWPayments logosu" class="processor-logo processor-logo-wide" />
- **Destek Türü**: Yalnızca şeffaf
- **Açıklama**: NOWPayments, satıcıların Zcash ödemelerini ve bağışlarını kolayca kabul etmesini sağlayan bir kripto ödeme ağ geçididir.
- **URL**: [NOWPayments](https://nowpayments.io/supported-coins/zcash-payments)
<img src="/content-images/nowpayments-wordmark.png" alt="NOWPayments logosu" width="200" hidden />

Korumalı destek yoktur. Belgeleri, Zcash için şeffaf bir adres ayarlamanızı söyler ve ZEC bu şekilde özellikle belirttikleri tek coindir. Aldığınız her ödeme blokzincirde herkese açıktır.

Varsayılan olarak saklamasızdır. SSS'lerinde fon saklamadıklarını ve özel anahtarları asla tutmadıklarını belirtirler. İsteğe bağlı bir saklama bakiyesi vardır; dolayısıyla emin olmanız gerekiyorsa hesap ayarlarınızı kontrol edin.

Ücretler, doğrudan bir ödeme için %0,5 veya çok para birimli, sabit oranlı ya da "ücreti kullanıcı öder" ödemeleri için ağ ücretlerine ek olarak %1'dir.

Yasanın yasakladığı yerler hariç küresel olarak kullanılabilir. Kripto kabul etmeye başlamak için KYC'ye değil, yalnızca itibari para çekmek için KYC'ye ihtiyacınız vardır.

**Son doğrulama:** 2026-07-29

---

## [Plisio](https://plisio.net/) <img src="/content-images/plisio-wordmark.png" alt="Plisio logosu" class="processor-logo processor-logo-wide" />

> **Ödemeler askıya alındı — 12 Kasım 2026'da kontrol edildi.** Plisio'ın [ana sayfası](https://plisio.net/), geri yükleme çalışmaları sürerken gelen ve giden ödemelerin geçici olarak askıya alındığını belirtiyor. Fon göndermeden önce sağlayıcıyla kontrol edin. Zcash'e özgü sayfası şu anda 404 döndürüyor; bu, ZEC'in listeden çıkarıldığını kanıtlamaz. Aşağıdaki ücret, saklama ve adres desteği ayrıntıları en son 29 Temmuz 2026'da incelendi ve yeniden doğrulanmadı.

- **Destek Türü**: Şeffaf (belgelenmemiş)
- **Açıklama**: Plisio, Zcash desteğini listelemiş bir kripto para ödeme ağ geçididir. Ödeme işleme şu anda askıya alınmıştır; yukarıdaki tarihli bildirime bakın.
- **URL**: [Plisio](https://plisio.net/)
<img src="/content-images/plisio-wordmark.png" alt="Plisio logosu" width="200" hidden />

Onu saklamalı olarak değerlendirin. Plisio'ın pazarlaması onu saklamasız olarak tanımlar; ancak kendi yardım sayfaları platformda tutulan bakiyeleri, soğuk depolamayı ve para çekme sürecini açıklar. Saklamasız olduğu iddiası doğrulanamadı.

Plisio, hangi Zcash adres türlerini kullandığını asla söylemez; bu nedenle biri aksini doğrulayana kadar şeffaf olduğunu varsayın.

Cüzdan ücretsizdir; ağ geçidi ve API %0,5, White Label ise %1,5 ücret alır. White Label, kendi sunucunuzda barındırma değil, barındırılan hizmetlerinin yeniden markalanmış hâlidir.

Ödeme almak için KYC gerekmez ve kısıtlı ülkelerin listesi yayımlanmamıştır.

**Son doğrulama:** 2026-07-29

---

## [Binance Pay](https://pay.binance.com/en) <img src="/content-images/binancepay-mark.png" alt="Binance Pay logosu" class="processor-logo" />
- **Destek Türü**: Yalnızca şeffaf, korumalı yatırmalar reddedilir
- **Açıklama**: Binance Pay, Zcash ödemelerini destekleyen bir kripto para ödeme platformudur.
- **URL**: [Binance Pay](https://pay.binance.com/en)
<img src="/content-images/binancepay-mark.png" alt="Binance Pay logosu" width="200" hidden />

Binance, korumalı adreslerden gönderilen ZEC'i geri çevirir. Bu ret, TEX adreslerinin oluşturulma nedenidir.

Tamamen saklamalıdır. Ödemeler Binance Pay cüzdanları arasında zincir dışı hareket eder ve doğrulanmış bir Binance hesabına ihtiyacınız vardır.

Cüzdandan cüzdana transferler ücretsizdir; satıcı ödemeleri 5 USD ile sınırlı %0,8, Mini Program satıcıları ise %1 öder.

Buna güvenmeden önce bulunduğunuz yerdeki kullanılabilirliği kontrol edin. Binance Pay bazı ülke ve sektörlerde sunulmaz; ZEC 2023'ten beri Fransa, İspanya, İtalya ve Polonya'daki kullanıcılar için listeden çıkarılmıştır ve AEA'daki hizmet MiCA kapsamında aksadı.

**Son doğrulama:** 2026-07-29

---

### Artık ZEC kabul etmeyenler

Bu ikisi daha önce burada listeleniyordu. Her sağlayıcının kendi canlı para birimi listesi 29 Temmuz 2026'da kontrol edildi ve Zcash ikisinden de kaldırılmıştı.

**CoinPayments**, v2 coin listesinde, eski listesinde veya canlı para birimleri API'sinde ZEC'i listelemiyor; Zcash makalesi artık ana sayfaya yönlendiriyor.

**CoinGate**, desteklenen para birimleri sayfasında veya herkese açık API'sinde ZEC'i listelemiyor. Listeden çıkarıldığı duyurulmadığından nedeni ve tarihi bilinmiyor.

Herhangi biri Zcash'i geri getirirse, yeni bir doğrulama tarihiyle tekrar ekleyin.

### Bu sayfayı doğru tutmak

Gizlilik coin'i desteği değişken olduğundan, bu sayfa yalnızca son kontrolü kadar iyidir. İncelerken:

1. Sağlayıcının kendi para birimi listesini veya API'sini kontrol edin. Yukarıda kaldırılan işleyicilerin her ikisi için de üçüncü taraf listeler güncel değildi.
2. Hangi Zcash adres türlerinin desteklendiğini kontrol edin. "Zcash destekler" genellikle yalnızca şeffaf adresler anlamına gelir.
3. Doğrulama tarihini tabloda ve o sağlayıcının bölümünde güncelleyin.
