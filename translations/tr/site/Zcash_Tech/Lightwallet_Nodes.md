<a href="https://github.com/zechub/zechub/edit/main/site/Zcash_Tech/Lightwallet_Nodes.md" target="_blank">
  <img src="https://img.shields.io/badge/Edit-blue" alt="Edit Page"/>
</a>


# Zcash Hafif Cüzdan Düğümleri

## Kısaca

* Çoğu kişi Zcash'i, tüm blok zincirini indirmeyen hafif bir cüzdan aracılığıyla kullanır. Bunun yerine, bu işi zaten yapmış bir sunucuyla iletişim kurar.
* Bugün hafif cüzdanlara iki yazılım hizmet verir: Go ile yazılmış özgün hizmet **lightwalletd** ve Rust ile yazılmış daha yeni bir indeksleyici olan **Zaino**.
* Anahtarlarınız cihazınızdan asla ayrılmaz; sunucu fonlarınızı harcayamaz veya tamamen korumalı işlemlerin içindeki tutarları ve notları okuyamaz.
* Sunucunun öğrenmek için elverişli olduğu şey IP adresiniz ve etkinliğinizin zamanlamasıdır — korumalı işlemler blok zincirinde gerçekleşenleri korur, sunucuyla bağlantınızı değil.
* Tor, IP tanımlayıcısını kaldırır; `zcash_client_backend` üzerine inşa edilmiş cüzdanlarda kullanılabilir ve ZODL'de Gelişmiş Ayarlar altında bir ayardır.
* Cüzdanınızın kullandığı sunucuyu değiştirebilir veya kendi sunucunuzu çalıştırabilirsiniz — hem lightwalletd hem de Zaino açık kaynaklıdır.

## Temel Açıklama

Çoğu kişi Zcash'i, tüm blok zincirini indirmeyen hafif bir cüzdan aracılığıyla kullanır. Bunun yerine, bu işi zaten yapmış bir sunucuyla iletişim kurar. Bu sayfa bu sunucuların ne olduğunu, sizin hakkınızda neleri görebileceklerini ve göremeyeceklerini, bağlantınızı Tor üzerinden nasıl yönlendireceğinizi ve cüzdanınızın kullandığı sunucuyu nasıl değiştireceğinizi açıklar.

Bugün hafif cüzdanlara iki yazılım hizmet verir. **lightwalletd**, Go ile yazılmış özgün hizmettir. **Zaino**, zcashd kullanım dışı bırakma çalışmasının parçası olarak oluşturulmuş, Rust ile yazılmış daha yeni bir indeksleyicidir.

### Hafif cüzdan sunucusu ne yapar

Hafif cüzdan sunucusu, cüzdanınız ile Zcash blok zinciri arasında yer alır ve ona zincirin bant genişliği açısından verimli bir görünümünü sunar. Sizin için üç şey yapar.

Sıkıştırılmış bloklar sunar. Tüm bloklar yerine, yalnızca bir cüzdanın korumalı adresine yapılan ödemeyi algılaması, notlarının harcanmasını algılaması ve tanıklarını güncellemesi için gerekenleri taşıyan sıkıştırılmış bir biçim gönderir.

İşlemlerinizi iletir. Gönderim yaptığınızda cüzdanınız tamamlanmış işlemi sunucuya verir; sunucu da bunu ağa yayınlar.

Mevcut yükseklik ve cüzdanınızın ihtiyaç duyduğu ücret bilgileri gibi zincir sorgularını yanıtlar.

Cüzdanınız özel işleri yine yerel olarak yapar. Anahtarlarınızı tutar, notlarınızı bulmak için blokların deneme şifresini çözer ve cihazınızda işlemleri oluşturup imzalar.

### Sunucunun görebilecekleri ve göremeyecekleri

Bu bölümün yanlış anlaşılması kolaydır. Anahtarlarınız cihazınızdan asla ayrılmaz; ancak bu, sunucunun sizin hakkınızda hiçbir şey öğrenmediği anlamına gelmez.

Buradaki referans, bu konu sizin için önemliyse tamamını okumaya değer olan [Zcash cüzdan uygulaması tehdit modeli](https://zcash.readthedocs.io/en/latest/rtd_pages/wallet_threat_model.html)'dir. Model, çeşitli saldırgan türlerini ortaya koyar. Bu sayfa için önemli olan, cüzdanınız ile internet arasındaki ve sunucu ile internet arasındaki trafiği izleyebilen saldırgandır. Sunucuyu çalıştıran kişi, cüzdanınız doğrudan ona bağlandığı için doğası gereği kısmen bu konumdadır.

Korunanlarla başlayalım. Modeldeki her saldırgana karşı, sunucuyu ele geçirmiş biri de dahil olmak üzere, "kullanıcının hiçbir kriptografik anahtar materyalini (harcama anahtarları, görüntüleme anahtarları, başlangıç ifadesi vb.) öğrenemez", fonlarınızı çalamaz ve istemediğiniz fonları göndermenizi sağlayamaz. Tamamen korumalı işlemlerin içindeki tutarlar ve notlar şifreli kalır.

Ardından korunmayanlar gelir. Tehdit modeli bunları, trafiği gözlemleyen bir saldırgana karşı bilinen zayıflıklar olarak listeler:

| Zayıflık | Nasıl |
|:--|:--|
| Kim olduğunuzu belirleme | "Saldırgan, kullanıcının gerçek kimliğine ulaşmasına yol açabilecek IP adresini bilir" |
| Kabaca nerede olduğunuzu belirleme | IP adresinizi, "konumlarını yaklaşık olarak belirlemek için bir coğrafi konum veritabanında" arama |
| Korumalı bir işlemi gönderdiğinizi veya aldığınızı ve ne zaman yaptığınızı belirleme | Gönderim, "bağlantı şifreli olsa bile görünür olan daha fazla bant genişliği kullanır". Model, gönderme ve alma eyleminin sunucunun kendisi tarafından görülebildiğini belirtir |
| Zaman içinde kaç işlem yaptığınızı sayma | Daha uzun bir süre boyunca gözlemlenen aynı bant genişliği kalıpları |
| Tekrarlayan ödeme kalıplarını fark etme | Etkinliğin ne zaman gerçekleştiğini gözlemleme |
| Bir adresin size ait olup olmadığını anlama | Bir adresi zaten bilen saldırgan, "o adrese fon gönderebilir ve cüzdanınız bunları alırken bant genişliği sıçramaları olup olmadığını izleyebilir" |

Model ayrıca olağan durumun "kullanıcı ile lightwalletd sunucusu operatörü arasında bir güven ilişkisi" varsaydığını belirtir.

Dolayısıyla dürüst özet şudur: Hafif cüzdan sunucusu paranızı harcayamaz ve korumalı işlemlerinizdeki tutarları veya notları okuyamaz. Öğrenmek için elverişli olduğu şey IP adresiniz ve etkinliğinizin zamanlamasıdır; bu ikisi birlikte bir kişi hakkında çok şey söyleyebilir. Korumalı işlemler blok zincirinde gerçekleşenleri korur. Tek başlarına, sunucuyla bağlantınızı gizlemezler.

## Görsel / Benzetme

Yayınlanmış her gazeteyi barındıran bir halk kütüphanesi düşünün. Tam düğüm, tüm arşivi evine götüren bir okuyucudur. Hafif cüzdan ise bunun yerine kütüphaneciden günlük bir özet isteyen bir okuyucudur — yalnızca kendisini ilgilendiren bir şey olup olmadığını fark etmeye yetecek kadar bilgi taşıyan ince bir sayfa.

Özet mühürlüdür: Kütüphaneci, hangi öğelerin sizin için önemli olduğunu okuyamadan onu hazırlar; siz de kendi anahtarınızla evde açarsınız. Bu, sıkıştırılmış bloktur; açma işlemi ise cihazınızdaki deneme şifresi çözmedir.

Ancak kütüphaneci yine de hangi okuyucunun içeri girdiğini, hangi saatte geldiğini ve ne kadar kalın bir paketi dışarı çıkardığını görür. Bu, IP adresi ve zamanlamadır — zarf ne kadar iyi mühürlenmiş olursa olsun, masadan görünür. Tor, anonim bir kurye göndermenin karşılığıdır: kütüphaneci yine aynı paketi teslim eder, ancak artık bunun hangi eve gittiğini bilmez.

## Derinlemesine İnceleme

### Tor üzerinden yönlendirme

Tor, IP adresiniz ile cüzdan trafiğiniz arasındaki bağlantıyı keser; böylece yukarıdaki tablodaki en güçlü tanımlayıcıyı ortadan kaldırır.

Destek, birçok Zcash cüzdanının üzerine inşa edildiği Rust kütüphanelerinde mevcuttur. zcash_client_backend, Tor'un Rust uygulaması olan [Arti](https://tpo.pages.torproject.net/core/arti/) üzerine kurulu bir Tor modülü içerir; bu sayede cüzdan, ayrı bir Tor istemcisi sunmadan senkronizasyonu, işlem yayınını ve fiyat sorgularını Tor üzerinden yönlendirebilir.

Zaino geliştiricileri, doğrudan tehdit modeline atıf yaparak aynı savı öne sürer: "istemcilerin kimliklerini Zcash'in indeksleme sunucularından gizlemek için anonim taşıma protokollerinin (Nym veya Tor gibi) kullanılmasına ihtiyaç vardır".

**ZODL**'de Tor, Gelişmiş Ayarlar altında bir ayardır. Cüzdanın sürüm notları, kullanıcılar "meta veri maruziyetini azaltmayı tercih ediyorsa" onları "Gelişmiş Ayarlarda Tor'u etkinleştirme" ile birlikte manuel bağlantı moduna yönlendirir; uygulama ayrıca bir cüzdanı geri yüklemeden önce Tor'u açmayı önerir. Bu, aksi hâlde yeni bir IP'nin tüm cüzdan geçmişiyle ilişkilendirileceği andır.

İki uyarı. Tor, IP adresinizi sunucudan gizler; ancak sunucunun yaptığınız isteklerden öğrendiklerini değiştirmez. Ayrıca soğan yönlendirme gecikme ekler, dolayısıyla senkronizasyon daha uzun sürer. Kendi sunucunuzu çalıştırmak güven sorusunu farklı şekilde ortadan kaldırır; çünkü o zaman operatör siz olursunuz.

### Zaino, Rust indeksleyicisi

[Zaino](/zcash-tech/zaino), zcashd kullanım dışı bırakma çalışmasının parçası olarak lightwalletd'nin yerini almak üzere Zingo ekibi tarafından Rust ile yazılmış bir indeksleyicidir. Hafif istemcilere, tam istemcilere ve blok gezginlerine hizmet verir; zincir verilerini "Zebra veya Zcashd tam doğrulayıcısından" okur.

Ağustos 2026'da yayımlanan 0.8.0 sürümüyle aktif geliştirme altındadır. Mümkün olan yerlerde lightwalletd ile geriye dönük uyumlu kalmayı hedefler; böylece cüzdanlar yeniden yazılmadan ona yönlendirilebilir.

Zaino'nun mimari diyagramlar içeren kendi sayfası vardır; bu nedenle bu sayfa yalnızca hafif cüzdan sunucusu rolünü kapsar.

### Kendi sunucunuzu çalıştırma

En güçlü seçenek, güven sorusunu tamamen ortadan kaldıran kendi operatörünüz olmaktır. Her iki sunucu da açık kaynaklıdır: Go ile yazılmış [lightwalletd](https://github.com/zcash/lightwalletd) ve Rust ile yazılmış [Zaino](https://github.com/zingolabs/zaino). Her ikisi de tam doğrulayıcıdan okur; bu nedenle [Zebra](/zcash-tech/zebra-full-node)'ya da ihtiyacınız olacaktır.

## Pratik Sonuçlar

### Sunucu listesi

[hosh.zec.rocks](https://hosh.zec.rocks/zec) kontrol paneli herkese açık sunucuları ve sağlık durumlarını takip eder; gerçekten hangilerinin çalıştığını kontrol etmek için gidilecek yerdir. [status.zec.rocks](https://status.zec.rocks/) hizmet durumunu gösterir.

Yazım sırasında bu kontrol panelinde listelenen sunucular:

| Sunucu | Notlar |
|:--|:--|
| zec.rocks:443 | Yanında na.zec.rocks, eu.zec.rocks, ap.zec.rocks ve sa.zec.rocks adreslerinde bölgesel uç noktalar listelenir |
| zec-node.cakewallet.com:443 | Cake Wallet alan adında |
| zec.0xrpc.io:443 | Bir dizi zincir için ücretsiz herkese açık uç noktalar sunan ve kapasite masraflarını karşılamak için bağış isteyen 0xRPC tarafından çalıştırılır |
| zaino.unsafe.zec.rocks:443 | Bir Zaino örneği. Ana makine adına dikkat edin, deneysel olarak değerlendirin |
| testnet.zec.rocks:443 | Testnet; zaino.testnet.unsafe.zec.rocks adresinde listelenen bir Zaino testnet örneği bulunur |

Bu listeye güvenmek yerine kontrol panelini kontrol edin. Operatörler gelir ve gider; böyle bir sayfa zamanla eskiyebilir.

### Cüzdanınızdaki sunucuyu değiştirme

Güvendiğiniz bir operatörü seçmek, etkinliği operatörlere dağıtmak veya kendi sunucunuza yönlendirmek istiyorsanız bunu yapmaya değer.

Aşağıdaki menü yolları bu sayfa güncellendiğinde doğruydu; ancak cüzdan arayüzleri değişir, bu yüzden bunları kesin bir yol yerine ipucu olarak değerlendirin. Gelişmiş Ayarlar veya sunucu seçeneğini arayın.

#### ZODL

Eskiden Zashi. Sağ üst köşedeki dişli simgesi, ardından Gelişmiş Ayarlar. Tor aynı ekranda bulunur. ZODL ayrıca bir senkronizasyon hatası sunucunun güncel olmamasından kaynaklandığında Sunucuyu değiştir kısayolu sunar.

#### Ywallet

Sağ üst köşedeki dişli simgesi, ardından Zcash sekmesi.

![Ywallet server settings](/content-images/b0a2910b-dbdf-4292-8e69-af5a386aa183-f51f098d19.webp)

#### Zingo

Sol üst köşedeki hamburger menü, ardından Ayarlar, sonra aşağı kaydırın.

![Zingo server settings](/content-images/ea8f7672-e644-41a5-a422-db131740404a-2626f5fa79.webp)

#### eZcash

Sol üst köşedeki hamburger menü, ardından Ayarlar, sonra Gelişmiş.

![eZcash server settings](/content-images/655c0172-61a0-4322-b8cf-4eee4bb53b51-0b93df2e71.webp)

Bu ekran görüntüleri Mart 2025'te alındı ve uygulamalar o zamandan beri sürümler yayımladı; dolayısıyla düğmeler yer değiştirmiş olabilir.

## Yaygın Hatalar

**Sunucunun işlemlerinizi okuyabildiğini düşünmek**. Okuyamaz. Anahtarlarınız cihazınızda kalır ve tamamen korumalı işlemlerin içindeki tutarlar ile notlar şifreli kalır — sunucuyu ele geçirmiş bir saldırgana karşı bile.

**"Korumalı"yı "anonim bağlantı" olarak okumak**. Korumalı işlemler blok zincirinde gerçekleşenleri korur. IP adresiniz ve etkinliğinizin zamanlaması ayrı bir katmandır; sunucunun gördüğü katman da tam olarak budur.

**Tor'un her izi ortadan kaldırdığını varsaymak**. Tor, IP adresinizi sunucudan gizler; ancak sunucunun yaptığınız isteklerden öğrendiklerini değiştirmez ve senkronizasyona gecikme ekler.

**Bir wiki sayfasındaki sunucu listesine güvenmek**. Operatörler gelir ve gider. Cüzdanınızı herhangi bir şeye yönlendirmeden önce gerçekten neyin çalıştığını görmek için [hosh.zec.rocks](https://hosh.zec.rocks/zec)'u kontrol edin.

## Özet

Hafif cüzdanlar, disk alanı gereksinimi olmadan size korumalı havuzu sunar; bu iyi bir takastır. Yalnızca neyi takas ettiğinizi net biçimde anlayın. Sunucu fonlarınızı alamaz veya korumalı tutarlarınızı okuyamaz; ancak IP adresinizi ve ne zaman işlem yaptığınızı görmek için elverişli konumdadır. Tor üzerinden yönlendirin, operatörünüzü bilinçli seçin veya kendi sunucunuzu çalıştırın.

## İlgili Sayfalar

- [Zcash Ödemenizi Kim Görebilir](/start-here/who-can-see-your-zcash-payment) — aynı sorunun başlangıç düzeyindeki görünümü.
- [Bir Blok Gezgini Neleri Görebilir](/zcash-tech/what-a-block-explorer-can-see) — sunucuda görünene karşılık, zincir üzerinde görünenler.
- [Zaino](/zcash-tech/zaino) — mimari diyagramlar ve Rust indeksleyicisinin daha geniş rolü.
- [Zebra Tam Düğüm](/zcash-tech/zebra-full-node) — hafif cüzdan sunucusunun okuduğu doğrulayıcı.
- [Zcash Cüzdan Senkronizasyonu](/zcash-tech/zcash-wallet-syncing) — sunucunun gönderdiği sıkıştırılmış blokların cüzdanınız tarafından nasıl işlendiği.

**Son güncelleme:** Ağustos 2026
