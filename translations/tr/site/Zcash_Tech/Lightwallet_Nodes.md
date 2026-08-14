<a href="https://github.com/zechub/zechub/edit/main/site/Zcash_Tech/Lightwallet_Nodes.md" target="_blank">
  <img src="https://img.shields.io/badge/Edit-blue" alt="Sayfayı Düzenle"/>
</a>


# Zcash Lightwallet Düğümleri

## Giriş

Çoğu insan Zcash’i, tüm blokzinciri indirmeyen bir light wallet aracılığıyla kullanır. Bunun yerine, bu işi zaten yapmış olan bir sunucuyla iletişim kurar. Bu sayfa, bu sunucuların ne olduğunu, sizin hakkınızda neleri görüp neleri göremeyeceklerini, bağlantınızı Tor üzerinden nasıl yönlendirebileceğinizi ve cüzdanınızın kullandığı sunucuyu nasıl değiştirebileceğinizi açıklar.

Bugün light wallet’lara iki yazılım hizmet verir. **lightwalletd**, Go ile yazılmış özgün hizmettir. **Zaino** ise Rust ile yazılmış, zcashd kullanım dışı bırakma çalışmasının bir parçası olarak geliştirilmiş daha yeni bir indeksleyicidir.

## Bir light wallet sunucusu ne yapar

Bir light wallet sunucusu, cüzdanınız ile Zcash blokzinciri arasında yer alır ve zincirin bant genişliği açısından verimli bir görünümünü sağlar. Sizin için üç şey yapar.

Compact block’ları sunar. Tüm bloklar yerine, bir cüzdanın shielded adresine gelen bir ödemeyi tespit etmesi, note’larının harcanmasını algılaması ve witness’larını güncellemesi için gerekenleri taşıyan compact bir biçim gönderir.

İşlemlerinizi iletir. Gönderim yaptığınızda, cüzdanınız tamamlanmış işlemi sunucuya verir ve sunucu bunu ağa yayınlar.

Mevcut yükseklik ve cüzdanınızın ihtiyaç duyduğu ücret bilgileri gibi zincir sorgularını yanıtlar.

Cüzdanınız yine de özel işleri yerel olarak yapar. Anahtarlarınızı tutar, note’larınızı bulmak için blokları deneme amaçlı çözer ve işlemleri cihazınızda oluşturup imzalar.

## Sunucu neleri görebilir ve neleri göremez

Burası yanlış anlaşılması kolay olan kısımdır. Anahtarlarınız cihazınızı asla terk etmez, ancak bu, sunucunun sizin hakkınızda hiçbir şey öğrenmediği anlamına gelmez.

Buradaki referans, [Zcash wallet app threat model](https://zcash.readthedocs.io/en/latest/rtd_pages/wallet_threat_model.html)’dir; bunu önemsiyorsanız tamamını okumaya değer. Birkaç tür saldırganı ortaya koyar. Bu sayfa için önemli olan, cüzdanınız ile internet arasındaki ve sunucu ile internet arasındaki trafiği izleyebilen bir saldırgandır. Sunucuyu çalıştıran kişi doğası gereği kısmen bu konumdadır, çünkü cüzdanınız onlara doğrudan bağlanır.

Önce neyin korunduğuyla başlayalım. Modeldeki her saldırgana karşı, buna sunucuyu ele geçirmiş biri de dahil olmak üzere, "can't learn any of the user's cryptographic key material (spending keys, viewing keys, seed phrase, etc.)", fonlarınızı çalamaz ve sizin göndermek istemediğiniz fonları göndermenizi sağlayamaz. Tam shielded işlemlerin içindeki tutarlar ve memolar şifreli kalır.

Sonra korunmayanlar var. Tehdit modeli bunları, trafiği gözlemleyen bir saldırgana karşı bilinen zayıflıklar olarak listeler:

| Zayıflık | Nasıl |
|:--|:--|
| Kim olduğunuzu belirleme | "The adversary knows the user's IP address, which could lead them to the user's real identity" |
| Kabaca nerede olduğunuzu belirleme | IP’nize "in a geolocation database to approximate their location" şeklinde bakarak |
| Shielded bir işlem gönderdiğinizi veya aldığınızı ve bunun ne zaman olduğunu belirleme | Gönderim "uses more bandwidth, which is visible even though the connection is encrypted". Model, gönderme ve alma eyleminin sunucunun kendisi tarafından da görülebildiğini belirtir |
| Zaman içinde kaç işlem yaptığınızı sayma | Aynı bant genişliği örüntüleri, daha uzun bir dönem boyunca gözlemlendiğinde |
| Tekrarlayan ödeme örüntülerini fark etme | Etkinliğin ne zaman gerçekleştiğini gözlemleyerek |
| Bir adresin size ait olup olmadığını anlama | Zaten bir adresi bilen bir saldırgan, "could send funds to that address and watch to see if there are bandwidth spikes" cüzdanınızın onu alırken oluşturduğu trafiği izleyebilir |

Model ayrıca, olağan durumda "a trust relationship between the user and the lightwalletd server operator" varsayıldığını da belirtir.

Dolayısıyla dürüst özet şudur. Bir light wallet sunucusu paranızı harcayamaz ve shielded işlemlerinizdeki tutarları veya memoları okuyamaz. Öğrenmek için en uygun konumda olduğu şey, IP adresiniz ve etkinliğinizin zamanlamasıdır; bu ikisi birlikte bir kişi hakkında çok şey söyleyebilir. Shielded işlemler, blokzincirde olanları korur. Tek başlarına, sunucuyla olan bağlantınızı gizlemezler.

## Tor üzerinden yönlendirme

Tor, IP adresiniz ile cüzdan trafiğiniz arasındaki bağı koparır; bu da yukarıdaki tablodaki en güçlü tanımlayıcıyı ortadan kaldırır.

Destek, birçok Zcash cüzdanının üzerine inşa edildiği Rust kütüphanelerinde mevcuttur. zcash_client_backend, Tor’un Rust uygulaması olan [Arti](https://tpo.pages.torproject.net/core/arti/) üzerine kurulu bir Tor modülü içerir; böylece bir cüzdan, ayrı bir Tor istemcisi sunmadan senkronizasyonu, işlem yayınlamayı ve fiyat sorgularını Tor üzerinden yönlendirebilir.

Zaino geliştiricileri de aynı argümanı öne sürüyor ve tehdit modeline doğrudan atıfta bulunuyor: istemcilerin kimliklerini Zcash’in indeksleme sunucularından gizlemek için "a need to use anonymous transport protocols (such as Nym or Tor)" vardır.

**ZODL** içinde Tor, Advanced Settings altında bir ayardır. Cüzdanın sürüm notları, "prefer to reduce metadata exposure" eden kullanıcılara "plus enabling Tor in Advanced Settings" ile manuel bağlantı modunu önerir; ayrıca uygulama, bir cüzdanı geri yüklemeden önce Tor’u açmayı teklif eder ki bu, aksi takdirde yeni bir IP’nin tüm cüzdan geçmişiyle ilişkilendirilebileceği andır.

İki uyarı. Tor, IP’nizi sunucudan gizler, ancak sunucunun yaptığınız isteklerden öğrendiği şeyi değiştirmez. Ve onion routing gecikme ekler, bu yüzden senkronizasyon daha uzun sürer. Kendi sunucunuzu çalıştırmak ise güven meselesini farklı bir şekilde ortadan kaldırır; çünkü bu durumda operatör siz olursunuz.

## Zaino, Rust indeksleyicisi

[Zaino](/site/Zcash_Tech/Zaino), Zingo ekibi tarafından Rust ile yazılmış, zcashd kullanım dışı bırakma çalışmasının bir parçası olarak lightwalletd’nin yerini almak üzere geliştirilmiş bir indeksleyicidir. Light client’lara, full client’lara ve block explorer’lara hizmet verir; zincir verilerini "either a Zebra or Zcashd full validator" tarafından tutulan verilerden okur.

Aktif geliştirme altındadır; 0.7.0 sürümü Ağustos 2026’da yayımlanmıştır. Mümkün olduğunda lightwalletd ile geriye dönük uyumlu kalmayı hedefler; böylece cüzdanlar yeniden yazılmadan ona yönlendirilebilir.

Zaino’nun mimari diyagramları içeren kendi sayfası vardır; bu nedenle bu sayfa yalnızca onun bir light wallet sunucusu olarak rolünü kapsar.

## Sunucu listesi

[hosh.zec.rocks](https://hosh.zec.rocks/zec) panosu, herkese açık sunucuları ve sağlık durumlarını takip eder; gerçekten hangilerinin çalışır durumda olduğunu kontrol etmek için gidilecek yerdir. [status.zec.rocks](https://status.zec.rocks/) ise hizmet durumunu gösterir.

Bu yazının yazıldığı sırada o panoda listelenen sunucular:

| Sunucu | Notlar |
|:--|:--|
| zec.rocks:443 | Bunun yanında na.zec.rocks, eu.zec.rocks, ap.zec.rocks ve sa.zec.rocks bölgesel uç noktaları da listelenmiştir |
| zec-node.cakewallet.com:443 | Cake Wallet’ın alan adında |
| zec.0xrpc.io:443 | Bir dizi zincir için ücretsiz herkese açık uç noktalar sunan ve kapasiteyi karşılamak için bağış isteyen 0xRPC tarafından işletiliyor |
| zaino.unsafe.zec.rocks:443 | Bir Zaino örneği. Host adına dikkat edin, deneysel olarak değerlendirin |
| testnet.zec.rocks:443 | Testnet; burada zaino.testnet.unsafe.zec.rocks adresinde bir Zaino testnet örneği de listelenmiştir |

Bu listeye güvenmek yerine panoyu kontrol edin. Operatörler gelir gider ve böyle bir sayfa zamanla eskiyebilir.

## Cüzdanınızdaki sunucuyu değiştirme

Güvendiğiniz bir operatörü seçmek, etkinliği farklı operatörlere dağıtmak veya kendi sunucunuza yönlendirmek istiyorsanız yapmaya değer.

Aşağıdaki menü yolları bu sayfa güncellendiğinde doğruydu, ancak cüzdan arayüzleri değişebilir; bu yüzden bunları tam bir rota değil, bir ipucu olarak görün. Advanced Settings ya da bir sunucu seçeneğini arayın.

#### ZODL

Eskiden Zashi idi. Sağ üst köşedeki dişli simgesi, ardından Advanced Settings. Tor da aynı ekranda yer alır. ZODL ayrıca, bir senkronizasyon hatası sunucunun güncel olmamasından kaynaklandığında bir Switch server kısayolu da sunar.

#### Ywallet

Sağ üst köşedeki dişli simgesi, ardından Zcash sekmesi.

![Ywallet sunucu ayarları](/content-images/b0a2910b-dbdf-4292-8e69-af5a386aa183-f51f098d19.webp)

#### Zingo

Sol üst köşedeki hamburger menü, ardından Settings, sonra aşağı kaydırın.

![Zingo sunucu ayarları](/content-images/ea8f7672-e644-41a5-a422-db131740404a-2626f5fa79.webp)

#### eZcash

Sol üst köşedeki hamburger menü, ardından Settings, sonra Advanced.

![eZcash sunucu ayarları](/content-images/655c0172-61a0-4322-b8cf-4eee4bb53b51-0b93df2e71.webp)

Bu ekran görüntüleri Mart 2025’te alındı ve uygulamalar o zamandan beri yeni sürümler yayımladı, bu nedenle düğmeler yer değiştirmiş olabilir.

## Kendi sunucunuzu çalıştırma

En güçlü seçenek, güven sorusunu tamamen ortadan kaldıran şekilde kendi operatörünüz olmaktır. Her iki sunucu da açık kaynaklıdır: Go ile yazılmış [lightwalletd](https://github.com/zcash/lightwalletd) ve Rust ile yazılmış [Zaino](https://github.com/zingolabs/zaino). Her ikisi de bir full validator’dan veri okur, bu yüzden ayrıca [Zebra](/site/Zcash_Tech/Zebra_Full_Node) da isteyeceksiniz.

## Özet

Light wallet’lar size disk alanı gerektirmeden shielded pool’u sunar; bu iyi bir takastır. Sadece neyi takas ettiğinizi net olarak bilin. Sunucu fonlarınızı alamaz veya shielded tutarlarınızı okuyamaz, ancak IP adresinizi ve ne zaman işlem yaptığınızı görmek için çok uygun bir konumdadır. Tor üzerinden yönlendirin, operatörünüzü bilinçli seçin ya da kendi sunucunuzu çalıştırın.

**Son güncelleme:** Ağustos 2026
