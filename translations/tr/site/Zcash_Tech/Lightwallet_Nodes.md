<a href="https://github.com/zechub/zechub/edit/main/site/Zcash_Tech/Lightwallet_Nodes.md" target="_blank">
  <img src="https://img.shields.io/badge/Edit-blue" alt="Sayfayı düzenle"/>
</a>


# Zcash Hafif Cüzdan Düğümleri

## Kısaca

* Çoğu kişi Zcash’ı tüm blokzinciri indirmeyen hafif bir cüzdan aracılığıyla kullanır. Bunun yerine, bu işi zaten yapmış olan bir sunucuyla iletişim kurar.
* Günümüzde hafif cüzdanlara hizmet veren yaygın 3 yazılım vardır: **lightwalletd** (orijinal, Go), **Zaino** (Rust indeksleyicisi) ve Zcash Labs tarafından geliştirilen, herkese açık fastz.cash ağına güç veren yüksek performanslı Rust indeksleyicisi ztreamer.
* Anahtarlarınız cihazınızdan asla ayrılmaz; sunucu paranızı harcayamaz veya tamamen korumalı işlemlerin içindeki tutarları ve memoları okuyamaz.
* Sunucunun öğrenebileceği en önemli bilgiler IP adresiniz ve etkinliğinizin zamanlamasıdır — korumalı işlemler blokzincirinde olanları korur, sunucuya olan bağlantınızı değil.
* Tor IP tanımlayıcısını ortadan kaldırır; `zcash_client_backend` üzerine kurulu cüzdanlarda kullanılabilir ve ZODL’de Gelişmiş Ayarlar’da bir seçenektir.
* Cüzdanınızın kullandığı sunucuyu değiştirebilir veya kendi sunucunuzu çalıştırabilirsiniz — lightwalletd, Zaino ve ztreamer açık kaynaklıdır.

## Temel Açıklama

Çoğu kişi Zcash’ı tüm blokzinciri indirmeyen hafif bir cüzdan aracılığıyla kullanır. Bunun yerine, bu işi zaten yapmış olan bir sunucuyla iletişim kurar. Bu sayfada bu sunucuların ne olduğu, sizin hakkınızda neleri görüp neleri göremedikleri, bağlantınızı Tor üzerinden nasıl yönlendirebileceğiniz ve cüzdanınızın kullandığı sunucuyu nasıl değiştirebileceğiniz açıklanmaktadır.

Günümüzde hafif cüzdanlara hizmet veren yaygın 3 yazılım vardır. **lightwalletd**, Go ile yazılmış orijinal hizmettir. **Zaino**, Rust ile yazılmış ve zcashd kullanımdan kaldırma çalışmaları kapsamında geliştirilmiş yeni bir indeksleyicidir. Zcash Labs tarafından geliştirilen, herkese açık fastz.cash ağına güç veren yüksek performanslı Rust indeksleyicisi ztreamer’dır.

### Hafif cüzdan sunucusu ne yapar?

Hafif cüzdan sunucusu, cüzdanınız ile Zcash blokzinciri arasında yer alır ve cüzdana Zincir’in bant genişliği açısından verimli bir görünümünü sunar. Sizin için 3 şey yapar.

Kompakt blokları sunar. Tüm bloklar yerine, bir ödemenin korumalı adresinize yapıldığını, note’larınızdan birinin harcandığını algılamak ve tanıklarınızı güncellemek için cüzdanın ihtiyaç duyduğu bilgileri içeren kompakt bir biçim gönderir.

İşlemlerinizi iletir. Gönderim yaptığınızda cüzdanınız tamamlanmış işlemi sunucuya aktarır; sunucu da bunu ağa yayınlar.

Mevcut yükseklik ve cüzdanınızın ihtiyaç duyduğu ücret bilgileri gibi Zincir sorgularını yanıtlar.

Cüzdanınız özel işlemleri yerel olarak yapmaya devam eder. Anahtarlarınızı saklar, note’larınızı bulmak için blokların şifresini deneme yoluyla çözer ve işlemleri cihazınızda oluşturup imzalar.

### Sunucu neleri görebilir, neleri göremez?

Yanlış anlaşılması kolay olan kısım budur. Anahtarlarınız cihazınızdan asla ayrılmaz, ancak bu, sunucunun hakkınızda hiçbir şey öğrenemeyeceği anlamına gelmez.

Buradaki referans, [Zcash cüzdan uygulamasının tehdit modelidir](https://zcash.readthedocs.io/en/latest/rtd_pages/wallet_threat_model.html); bu konuya önem veriyorsanız tamamını okumanızda fayda var. Model, çeşitli saldırgan türlerini ele alır. Bu sayfa açısından önemli olan, cüzdanınızla internet arasındaki ve sunucuyla internet arasındaki trafiği izleyebilen bir saldırgandır. Cüzdanınız doğrudan sunucuya bağlandığından, sunucuyu işleten kişi doğal olarak bu konumun bir parçasındadır.

Önce korunanlara bakalım. Modeldeki tüm saldırganlara karşı, sunucuyu ele geçirmiş olanlar da dahil, saldırgan “kullanıcının kriptografik anahtar materyallerinden hiçbirini (harcama anahtarları, görüntüleme anahtarları, kurtarma ifadesi vb.) öğrenemez”; paranızı çalamaz ve istemediğiniz bir işlemi yapmanızı sağlayamaz. Tamamen korumalı işlemlerin içindeki tutarlar ve memolar şifreli kalır.

Ardından korunmayanlar gelir. Tehdit modeli, trafiği izleyen bir saldırgana karşı bilinen şu zayıflıkları sıralar:

| Zayıflık | Nasıl |
|:--|:--|
| Kim olduğunuzu öğrenmek | “Saldırgan kullanıcının IP adresini bilir; bu da kullanıcının gerçek kimliğini ortaya çıkarabilir” |
| Yaklaşık olarak nerede olduğunuzu öğrenmek | IP adresinizi “coğrafi konumu yaklaşık olarak belirlemek için bir coğrafi konum veritabanında aramak” |
| Korumalı bir işlemi gönderip alıp almadığınızı ve ne zaman gönderip aldığınızı öğrenmek | Gönderim “daha fazla bant genişliği kullanır; bağlantı şifreli olsa bile bu görülebilir”. Model, gönderip alma eyleminin sunucunun kendisi tarafından görülebildiğini belirtir |
| Zaman içinde kaç işlem yaptığınızı saymak | Daha uzun bir süre boyunca gözlemlenen aynı bant genişliği örüntüleri |
| Yinelenen ödeme örüntülerini fark etmek | Etkinliğin ne zaman gerçekleştiğini gözlemlemek |
| Bir adresin size ait olup olmadığını anlamak | Bir adresi zaten bilen saldırgan, “o adrese para gönderebilir ve cüzdanınız adresi alırken bant genişliğinde ani artışlar olup olmadığını izleyebilir” |

Model ayrıca olağan durumun “kullanıcı ile lightwalletd sunucu operatörü arasında bir güven ilişkisi” varsaydığını belirtir.

Dolayısıyla dürüstçe özetlemek gerekirse: Hafif cüzdan sunucusu paranızı harcayamaz ve korumalı işlemlerinizdeki tutarları veya memoları okuyamaz. Öğrenebileceği en önemli bilgiler IP adresiniz ve etkinliğinizin zamanlamasıdır; bu ikisi birlikte bir kişi hakkında çok şey söyleyebilir. Korumalı işlemler blokzincirinde olanları korur. Ancak tek başlarına sunucuya olan bağlantınızı gizlemezler.

## Görsel / Benzetme

Basılmış tüm gazeteleri saklayan bir halk kütüphanesi düşünün. Tam düğüm, arşivin tamamını eve götüren bir okurdur. Hafif cüzdan ise kütüphaneciden bunun yerine günlük bir özet isteyen bir okurdur — yalnızca kendisini ilgilendiren bir şey olup olmadığını anlamaya yetecek bilgileri taşıyan ince bir sayfa.

Özet mühürlüdür: Kütüphaneci, hangi öğelerin sizin için önemli olduğunu okuyamadan özeti hazırlar; siz de evde kendi anahtarınızla açarsınız. Bu, kompakt bloktur; açma işlemi ise cihazınızda yapılan deneme yoluyla şifre çözmedir.

Ancak kütüphaneci içeri giren okurun kim olduğunu, ne zaman geldiğini ve yanında ne kadar kalınlıkta bir paket götürdüğünü görür. Bu, IP adresi ve zamanlamadır — zarf ne kadar iyi mühürlenmiş olursa olsun masadan görülebilir. Tor, anonim bir kurye göndermeye benzer: Kütüphaneci yine aynı paketi verir, ancak artık paketin kimin evine gittiğini bilmez.

## Derinlemesine İnceleme

### Tor üzerinden yönlendirme

Tor, IP adresiniz ile cüzdan trafiğiniz arasındaki bağlantıyı kopararak yukarıdaki tablodaki en güçlü tanımlayıcıyı ortadan kaldırır.

Bu destek, birçok Zcash cüzdanının temel aldığı Rust kütüphanelerinde bulunur. zcash_client_backend, Rust Tor uygulaması olan [Arti](https://tpo.pages.torproject.net/core/arti/) üzerine kurulu bir Tor modülü içerir. Böylece bir cüzdan eşitleme, işlem yayınlama ve fiyat sorgularını ayrı bir Tor istemcisi taşımadan Tor üzerinden yönlendirebilir.

Zaino geliştiricileri de tehdit modeline doğrudan atıfta bulunarak aynı gerekçeyi öne sürer: “İstemcilerin kimliklerini Zcash indeksleme sunucularından gizlemek için anonim taşıma protokollerinin (Nym veya Tor gibi) kullanılması gerekir.”

**ZODL**’te Tor, Gelişmiş Ayarlar’da bir seçenektir. Cüzdanın sürüm notlarında, “meta verilerin açığa çıkmasını azaltmayı tercih ediyorsanız” manuel bağlantı modunun “ve Gelişmiş Ayarlar’da Tor’ın etkinleştirilmesinin” seçilmesi önerilir. Ayrıca uygulama, cüzdanı geri yüklemeden önce Tor’ı etkinleştirmeyi önerir; aksi hâlde bu işlem sırasında yeni IP adresi cüzdanın tüm geçmişiyle ilişkilendirilebilir.

İki uyarı: Tor IP adresinizi sunucudan gizler, ancak yaptığınız isteklerden sunucunun öğrendiklerini değiştirmez. Ayrıca soğan yönlendirmesi gecikme ekler, bu nedenle eşitleme daha uzun sürer. Kendi sunucunuzu çalıştırmak güven sorununu farklı bir şekilde ortadan kaldırır; çünkü operatör siz olursunuz.

### Zaino, Rust indeksleyicisi

[Zaino](/zcash-tech/zaino), Zingo ekibi tarafından Rust ile yazılmış bir indeksleyicidir ve zcashd kullanımdan kaldırma çalışmaları kapsamında lightwalletd’ın yerini almak üzere geliştirilmiştir. Hafif istemcilere, tam istemcilere ve blok gezginlerine hizmet verir; “Zebra veya zcashd tam doğrulayıcı” tarafından tutulan Zincir verilerini okur.

Aktif olarak geliştirilmektedir; 0.10.1 sürümü Eylül 2026’da yayımlanmıştır. Mümkün olduğunda lightwalletd ile geriye dönük uyumluluğunu korumayı amaçlar; böylece cüzdanlar yeniden yazılmadan bu indeksleyiciye bağlanabilir.

Zaino, mimari diyagramların bulunduğu kendi sayfasına sahiptir; bu nedenle bu sayfada yalnızca hafif cüzdan sunucusu rolü ele alınmaktadır.

### ztreamer ve fastz.cash

[ztreamer](https://github.com/zcashlabs/ztreamer), Zcash Labs tarafından Rust ile yazılmış yüksek performanslı bir Zcash indeksleyicisi ve hafif cüzdan sunucusudur. Düşük gecikme ve yüksek aktarım kapasitesi için tasarlanmıştır; herkese açık [fastz.cash](https://forum.zcashcommunity.com/t/announcing-fastz-cash-rpc-by-zcash-labs/59478) indeksleyici ağına güç verir (19 Kasım 2026’da duyuruldu).

fastz.cash, bölgesel uç sunucular çalıştırır (şu anda Frankfurt, Londra, Virginia, Oregon, São Paulo, Singapur ve Osaka). Her bölgenin kendine ait tam düğümü ve yerel ztreamer indeksi vardır. TLS bağlantısı düğümde sonlanır. GetLatestBlock çağrısında ilk yanıta kadar ölçülen medyan süre dünya genelinde yaklaşık 35 ms’dir. Blok aralığı eşitlemesinin, yakın tarihli lightwalletd sürümlerine kıyasla yaklaşık 3 kata kadar daha hızlı olduğu bildirilmiştir. Küçük indeks boyutu (~18 GB), ek uç konumların devreye alınmasını pratik hâle getirir.

Durum ve en yakın uç nokta: [status.fastz.cash](https://status.fastz.cash).

**Gizlilik notu:** fastz.cash ayrıca Valar Group’ın cüzdan-PIR hizmetini çalıştırır. Vizor kullanıcıları, istenen note’lar veya aralıklar hakkında sunucunun öğrendiği meta verileri azaltan özel eşitleme sorguları için bu hizmeti bugün kullanabilir. Bu, yukarıda açıklanan olağan hafif cüzdan tehdit modeline ek bir gizlilik katmanıdır; Tor’ın veya operatör seçiminin yerini almaz.

ztreamer açık kaynaklıdır ve bağımsız olarak çalıştırılabilir (gömülü Zakura düğümü veya uzak modda). lightwalletd ve Zaino gibi gRPC üzerinden hafif cüzdan protokolüne hizmet verir. Aktif olarak geliştirilmektedir; hem üretim altyapısı hem de gelecekteki hafif cüzdan protokolü iyileştirmeleri için bir deneme alanı olarak konumlandırılmıştır.

### Kendi sunucunuzu çalıştırmak

En güçlü seçenek, tamamen güven sorununu ortadan kaldıran kendi sunucunuzu işletmektir. Üç sunucunun tamamı açık kaynaklıdır: Go ile yazılmış [lightwalletd](https://github.com/zcash/lightwalletd), Rust ile yazılmış [Zaino](https://github.com/zingolabs/zaino) ve Rust ile yazılmış [ztreamer](https://github.com/zcashlabs/ztreamer). Bunlar tam bir doğrulayıcıdan veri okur; dolayısıyla [Zebra](/zcash-tech/zebra-full-node) veya Zakura da isteyeceksiniz. Ayrıca zec.rocks sunucuları, [Zcash Stack](/guides/zcash-stack) ile dağıtılır; bu, Zebra ile lightwalletd’ı birlikte çalıştıran açık kaynaklı bir Helm grafiği ve Docker Compose kitidir.

## Pratikteki Karşılığı

### Sunucu listesi

[hosh.zec.rocks](https://hosh.zec.rocks/zec) gösterge paneli herkese açık sunucuları ve sağlık durumlarını izler; hangi sunucuların gerçekten çalışır durumda olduğunu kontrol edebileceğiniz yerdir. [status.zec.rocks](https://status.zec.rocks/) hizmet durumunu gösterir. Ayrıca fastz.cash ağı için [status.fastz.cash](https://status.fastz.cash) adresine bakın.

Yazım sırasında bu gösterge panelinde listelenen sunucular:

| Sunucu | Notlar |
|:--|:--|
| zec.rocks:443 | Bölgesel uç noktalar da na.zec.rocks, eu.zec.rocks, ap.zec.rocks ve sa.zec.rocks adreslerinde listelenmiştir |
| zec-node.cakewallet.com:443 | Cake Wallet alan adında |
| zec.0xrpc.io:443 | Birden fazla Zincir için ücretsiz herkese açık uç noktalar sunan ve kapasiteyi karşılamak amacıyla bağış isteyen 0xRPC tarafından işletilir |
| zaino.unsafe.zec.rocks:443 | Bir Zaino örneğidir. Ana bilgisayar adına dikkat edin; deneysel olarak değerlendirin |
| testnet.zec.rocks:443 | Test ağı; zaino.testnet.unsafe.zec.rocks adresinde bir Zaino test ağı örneği listelenmiştir |
| rpc.fastz.cash | Zcash Labs tarafından işletilen herkese açık ztreamer ağı. Bölgesel uç noktalar ve sağlık durumu için status.fastz.cash adresini kontrol edin. |

Bu listeye güvenmek yerine gösterge panellerini kontrol edin. Operatörler gelip gider ve bu tür sayfalar zamanla eskir.

### Cüzdanınızdaki sunucuyu değiştirmek

Güvendiğiniz bir operatörü seçmek, etkinliğinizi farklı operatörlere dağıtmak veya kendi sunucunuzu kullanmak istiyorsanız bunu yapmanız faydalı olur.

Aşağıdaki menü yolları bu sayfa güncellendiğinde doğruydu; ancak cüzdan arayüzleri değişebilir. Bu nedenle bunları kesin bir yol değil, ipucu olarak değerlendirin. Gelişmiş Ayarlar’ı veya sunucu seçeneğini arayın.

#### ZODL

Eskiden Zashi olarak biliniyordu. Sağ üst köşedeki dişli simgesine, ardından Gelişmiş Ayarlar’a dokunun. Tor aynı ekrandadır. Ayrıca sunucunun güncel olmaması nedeniyle eşitleme başarısız olduğunda ZODL, Sunucuyu değiştir kısayolunu sunar.

#### Zkool

Aynı geliştiricinin geliştirdiği Ywallet’ın devamıdır (Ywallet artık geliştirilmiyor ve Ironwood sonrasında ağı takip edemiyor). Hesaplar ekranının üst kısmındaki dişli simgesine (Ayarları Aç) dokunun, ardından Hafif Düğüm Sunucusu alanını bulun. Yanındaki liste düğmesi bilinen sunucular arasından seçim yapmanızı sağlar; altındaki Doğrudan / Tor / Nym / Proxy anahtarı ise cüzdanın nasıl bağlanacağını belirler.

#### Zingo

Sol üst köşedeki hamburger menüsüne, ardından Ayarlar’a dokunun ve aşağı kaydırın.

![Zingo sunucu ayarları](/content-images/ea8f7672-e644-41a5-a422-db131740404a-2626f5fa79.webp)

#### eZcash

Sol üst köşedeki hamburger menüsüne, ardından Ayarlar’a ve Gelişmiş’e dokunun.

![eZcash sunucu ayarları](/content-images/655c0172-61a0-4322-b8cf-4eee4bb53b51-0b93df2e71.webp)

Bu ekran görüntüleri Mart 2025’te alındı ve uygulamalar o zamandan beri güncellendi; bu nedenle düğmelerin yeri değişmiş olabilir.

## Yaygın Hatalar

**Sunucunun işlemlerinizi okuyabildiğini düşünmek**. Okuyamaz. Anahtarlarınız cihazınızda kalır ve tamamen korumalı işlemlerin içindeki tutarlar ile memolar şifreli kalır — sunucuyu ele geçirmiş bir saldırgana karşı bile.

**“Korumalı” ifadesini “anonim bağlantı” olarak yorumlamak**. Korumalı işlemler blokzincirinde olanları korur. IP adresiniz ve etkinliğinizin zamanlaması ayrı bir katmandır ve sunucunun gördüğü şey tam olarak bu katmandır.

**Tor’ın tüm izleri ortadan kaldırdığını varsaymak**. Tor IP adresinizi sunucudan gizler, ancak yaptığınız isteklerden sunucunun öğrendiklerini değiştirmez ve eşitlemeye gecikme ekler.

**Bir wiki sayfasındaki sunucu listesine güvenmek**. Operatörler gelip gider. Cüzdanınızı herhangi bir sunucuya yönlendirmeden önce gerçekten hangilerinin çalıştığını [hosh.zec.rocks](https://hosh.zec.rocks/zec) ve [status.fastz.cash](https://status.fastz.cash) adreslerinden kontrol edin.

## Özet

Hafif cüzdanlar, disk alanı gerektirmeden korumalı havuzdan yararlanmanızı sağlar; bu iyi bir ödünleşimdir. Yalnızca nelerden ödün verdiğinizin farkında olun. Sunucu paranızı alamaz veya korumalı tutarlarınızı okuyamaz; ancak IP adresinizi ve ne zaman işlem yaptığınızı görmesi oldukça kolaydır. Tor üzerinden yönlendirme yapın, operatörünüzü bilinçli seçin veya kendi sunucunuzu çalıştırın.

## İlgili Sayfalar

- [Who Can See Your Zcash Payment](/start-here/who-can-see-your-zcash-payment) — aynı soruya başlangıç seviyesinde bir bakış.
- [What a Block Explorer Can See](/zcash-tech/what-a-block-explorer-can-see) — sunucuda görülebilenlerin aksine zincir üstünde nelerin görülebildiği.
- [Zaino](/zcash-tech/zaino) — mimari diyagramlar ve Rust indeksleyicisinin daha geniş kapsamlı rolü.
- [Zinder](/zcash-tech/zinder) — hafif cüzdanlara lightwalletd uyumlu bir adaptör üzerinden hizmet veren Zcash Foundation alpha indeksleyicisi.
- [Zebra Full Node](/zcash-tech/zebra-full-node) — hafif cüzdan sunucusunun veri okuduğu doğrulayıcı.
- [Zcash Wallet Syncing](/zcash-tech/zcash-wallet-syncing) — sunucunun gönderdiği kompakt blokların cüzdanınız tarafından nasıl işlendiği.
- [ztreamer](https://github.com/zcashlabs/ztreamer) — fastz.cash ağının kullandığı yüksek performanslı Rust indeksleyicisi.

**Son güncelleme:** Kasım 2026
