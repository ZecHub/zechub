<a href="https://github.com/zechub/zechub/edit/main/site/Privacy_Tools/GrapheneOS.md" target="_blank">
  <img src="https://img.shields.io/badge/Edit-blue" alt="Edit Page"/>
</a>

# Graphene OS

## Kısaca

- **GrapheneOS**, gizlilik ve güvenliğe odaklanan, kâr amacı gütmeyen, açık kaynaklı bir mobil işletim sistemidir ve günlük Android uygulamalarıyla tam uyumludur
- Temel güçlü yönleri: güçlendirilmiş uygulama korumalı alanı, bellek güvenli kod ve istismar azaltma önlemleri, donanım destekli doğrulanmış önyükleme, ayrıntılı izinler ve cihaz kilitliyken USB-C bağlantı noktası koruması
- Kurulum, resmî **WebUSB yükleyicisi** (çoğu kullanıcı için önerilir) veya teknik kullanıcılar için **komut satırı yöntemi** aracılığıyla yapılır
- Bir Zcash kullanıcısı için bu sistem, mobil varlıkları kendi gözetiminde tutmanın güçlü bir temelidir: güncel tutulan korumalı bir cüzdan ve standart OPSEC uygulamalarıyla birlikte kullanın

GrapheneOS, Android uygulamalarıyla uyumluluğu korurken mobil cihazlardaki gizliliği ve güvenliği geliştirmeye adanmış, kâr amacı gütmeyen, açık kaynaklı bir projedir. Bu işletim sistemi, özellikle korumalı alanı güçlendirmeye, istismar azaltma önlemlerine ve izin modelini iyileştirmeye odaklanarak gizlilik ve güvenlik teknolojilerini geliştirmeye büyük önem verir. 2014'te **CopperheadOS** adıyla doğan proje, o zamandan bu yana dijital gizliliğinizin ve güvenliğinizin güçlü bir koruyucusuna dönüştü.

GrapheneOS temel amacı, kullanıcı deneyimini olumsuz etkilemeden uygulama korumalı alanı gibi güvenlik sınırlarını güçlendirmektir.

GrapheneOS, Ağ izinleri, Sensör izinleri veya cihaz kilitliyken geçerli olan kısıtlamalar (USB çevre birimleri, kamera erişimi ve hızlı ayarlar gibi) gibi belirli özellikler için çeşitli açma-kapama seçenekleri sunabilir. Ayrıca, daha karmaşık kullanıcıya dönük gizlilik ve güvenlik özellikleri, her biri kendine özgü kullanıcı arayüzü iyileştirmelerine sahip olacak şekilde, kullanımı kolay bir deneyim sunmak üzere özenle tasarlanmıştır.

## **GrapheneOS özellikleri**

**Güvenlik Güçlendirmeleri** GrapheneOS, yaygın güvenlik açıklarını azaltmak için bellek güvenli programlama dilleri ve derleyici tabanlı güvenlik özellikleri gibi kapsamlı güvenlik iyileştirmeleri içerir.

**Korumalı Alan** Uygulamaları birbirinden yalıtarak olası saldırı vektörlerini sınırlandırmak için uygulama korumalı alanını güçlendirir.

**Doğrulanmış Önyükleme** GrapheneOS, işletim sisteminin bütünlüğünü sağlamak için donanım destekli anahtarlar ve doğrulanabilir bir önyükleme süreci kullanır.

**Gelişmiş İzinler** Uygulama izinleri üzerinde daha fazla denetim sağlar ve kullanıcıların uygulamaların hangi verilere erişebileceğini ayrıntılı olarak ayarlayıp yönetmesine olanak tanır.

**Gizlilik Gösterge Paneli** Kullanıcılar, veri kullanımı hakkında şeffaflık sağlayan bir gizlilik gösterge paneli aracılığıyla uygulamaların davranışını izleyip denetleyebilir.

**Yerleşik Güvenlik Güncellemeleri** GrapheneOS, kullanıcılara güvenlik açıklarına karşı en güncel korumayı sağlamak için zamanında güvenlik güncellemeleri sunar.

**Güçlü Şifreleme** Cihazda depolanan verileri korumak için varsayılan olarak tam disk şifrelemesi kullanır.

**Geliştirilmiş Tarayıcı Güvenliği** Varsayılan tarayıcı, izlemeye karşı koruma da dâhil olmak üzere gelişmiş güvenlik sağlayacak şekilde yapılandırılmıştır.

**Önceden Yüklenmiş Uygulamaların Az Olması** GrapheneOS, olası güvenlik ve gizlilik risklerini azaltmak için az sayıda önceden yüklenmiş uygulamayla gelir.

**USB Bağlantı Noktası Saldırılarına Karşı Koruma** Cihaz kilitliyken USB bağlantı noktaları üzerinden cihaza yetkisiz erişime karşı koruma sağlar.

**Kötü Amaçlı Yazılımlara Karşı Koruma** GrapheneOS, bilinen kötü amaçlı yazılımları tespit edip engelleyen özellikler içerir.

**Gizliliğe Odaklı** İşletim sistemi, veri toplamayı ve açığa çıkarmayı en aza indirerek kullanıcı gizliliğine büyük önem verecek şekilde tasarlanmıştır.

**Açık Kaynak** Güvenliği geliştirmek amacıyla şeffaflık ve topluluk katkılarına olanak tanıyan açık kaynaklı bir projedir.

**Özelleştirilebilir Güvenlik Politikaları** Kullanıcılar, çeşitli güvenlik politikalarını tercihlerine göre özelleştirebilir.

**Uyumluluk** GrapheneOS, Android uygulamalarıyla uyumluluğu korumaya çalışır; böylece kullanıcılar gelişmiş güvenlik ve gizlilik özelliklerinden yararlanırken sevdikleri uygulamaları kullanmaya devam edebilir.

## **GrapheneOS kurulumu**

En iyi uygulamalar bölümünde belirtildiği gibi, önerilen resmî kurulum kılavuzunu kullanmanız tavsiye edilir. GrapheneOS kurmanın iki yöntemi vardır: [WebUSB tabanlı yükleyiciyi](https://grapheneos.org/install/web) kullanmak veya [komut satırı kurulum kılavuzunu](https://grapheneos.org/install/cli) izlemek.

**Web USB Üzerinden Kurulum** GrapheneOS sistemini Web yükleyici yöntemiyle kurmak için genellikle aşağıdaki malzeme ve kaynaklara ihtiyacınız olur:

- 2 GB boş bellek ve 32 GB boş depolama alanı.
- USB kablosu (A veya C)
- Desteklenen bir ana işletim sistemi ve çalışan WebUSB desteği olan bir tarayıcı kullanın. Desteklenen sürümler ve tarayıcı paketleme kısıtlamaları için güncel [resmî WebUSBön koşulları](https://grapheneos.org/install/web#prerequisites) kontrol edin; kullanım ömrü sona ermiş eski sistemler resmî olarak desteklenmez.
- Web yükleyici, desteklenen bir Android cihazdan, ChromeOS veya GrapheneOS üzerinden de çalıştırılabilir. Her Chromium paketinin WebUSB desteği olduğunu varsaymak yerine resmî kılavuzdaki tarayıcıya özgü notları izleyin.

Aşağıdaki bağlantıdan kurulum kılavuzuna göz atın ve kurulum sürecini izleyin.

[GrapheneOS Web Yükleyici Kılavuzu](https://grapheneos.org/install/web#prerequisites)

**Komut Satırıyla Kurulum** Komut satırıyla kurulum, teknik bilgiye sahip olmayan kullanıcılar için önerilmez. Komut satırıyla kurulum için aşağıdaki araçlar ve kaynaklar gereklidir:

- En az 2 GB boş belleğiniz ve 32 GB boş depolama alanınız olmalıdır.
- USB kablosu (A veya C)
- [güncel komut satırı ön koşulları](https://grapheneos.org/install/cli#prerequisites) tarafından desteklenen bir ana işletim sistemi kullanın ve gerekli araçlar için bu kılavuzu izleyin.
- Android, ChromeOS ve GrapheneOS ana sistemleri web yükleyicisini kullanmalıdır; bunlar desteklenen komut satırı kurulum ana sistemleri arasında listelenmemiştir.

Aşağıdaki bağlantıdan kurulum kılavuzuna göz atın ve kurulum sürecini izleyin.

[Komut Satırıyla Kurulum](https://grapheneos.org/install/cli#prerequisites)

## **En İyi Uygulamalar**

**İşletim Sistemini Güncel Tutun** En güncel güvenlik yamalarına ve iyileştirmelere sahip olduğunuzdan emin olmak için GrapheneOS sistemini düzenli olarak güncelleyin.

**Güçlü Parolalar Kullanın** Yetkisiz erişimi önlemek için cihaz şifrelemesinde ve uygulama girişlerinde güçlü, benzersiz parolalar belirleyin.

**Uygulama İzinleri** Uygulama izinlerini dikkatle gözden geçirip yönetin ve her uygulamanın çalışması için yalnızca gerekli olan izinleri verin.

**Düzenli Yedekleme** Cihazın kaybolması veya verilerin bozulması ihtimaline karşı verilerinizi düzenli olarak yedekleyin.

**Depolamayı Şifreleyin** Varsayılan olarak etkin değilse, cihaz kaybolduğunda veya çalındığında verilerinizi korumak için cihaz depolama alanınızı şifreleyin.

**Güvenli Kilit Ekranı** Yetkisiz erişimi önlemek için PIN, parola veya biyometrik kimlik doğrulama gibi güvenli bir kilit ekranı kullanın.

**Kurulumdan Sonra Önyükleyici Kilidini Yeniden Etkinleştirin** Tam doğrulanmış önyüklemeyi etkinleştirmek için resmî kurulum sürecinde [önyükleyicinin kilidini geçici olarak açmanız](https://grapheneos.org/install/web#unlocking-the-bootloader), GrapheneOS sistemini yüklemeniz ve kullanmadan önce [kilidi yeniden etkinleştirmeniz](https://grapheneos.org/install/web#locking-the-bootloader) gerekir. Kilidi açma ve yeniden etkinleştirme işlemlerinin her biri tüm kullanıcı verilerini siler; bu nedenle önce yedek alın ve resmî adımları sırasıyla izleyin. Kurulu işletim sisteminde root erişimi etkinleştirmeyin.

**Uygulama Kaynaklarını Doğrulayın** Kötü amaçlı yazılım yüklemekten kaçınmak için uygulamaların ve kaynaklarının gerçekliğini doğrulayın.

**Gizlilik Odaklı Bir Tarayıcı Yükleyin** Güvenli gezinme için Brave tarayıcısı, Firefox veya Bromite gibi gizlilik odaklı bir tarayıcı kullanmayı değerlendirin.

**Uygulamaları Düzenli Olarak Denetleyin** Saldırı yüzeyini azaltmak için artık kullanmadığınız veya güvenmediğiniz uygulamaları belirli aralıklarla gözden geçirip kaldırın.

**İki Faktörlü Kimlik Doğrulamayı (2FA) Etkinleştirin** Ek bir güvenlik katmanı eklemek için çevrimiçi hesaplarınızda 2FA'yı etkinleştirin.

**Halka Açık Wi-Fi'den Kaçının** Halka açık Wi-Fi ağlarına bağlanırken dikkatli olun; bu ağlar daha az güvenli olabilir. Gerektiğinde VPN kullanın.

**Konum Verileri Konusunda Dikkatli Olun** Uygulamaların konum takibini sınırlandırın ve gizliliğe önem veriyorsanız konum sahtekârlığı aracı kullanmayı değerlendirin.

**Bilinmeyen Bağlantılardan ve Eklerden Kaçının** İstenmeyen bağlantılara ve e-posta eklerine karşı dikkatli olun; bunlar kimlik avı girişimleri veya kötü amaçlı yazılımlar içerebilir.

**Varsayılan Ayarları Gözden Geçirin** Varsayılan ayarları gizlilik tercihlerinize uygun hâle getirmek için dikkatlice gözden geçirip düzenleyin.

**Topluluk Desteği** İpuçları, güncellemeler ve güvenlik önerileri için GrapheneOS topluluğuna ve forumlarına katılın. Daha fazla iletişim bilgisi için [buraya](https://grapheneos.org/contact) tıklayarak ekiple iletişim kurabilir ve güncel kalabilirsiniz.

**Resmî Kurulum Yöntemini Kullanın** GrapheneOS, resmî olarak desteklenen iki kurulum yöntemi sunar. Kullanıcılar, çoğu kişi için önerilen WebUSB tabanlı yükleyiciyi seçebilir veya teknik konulara daha yatkın kullanıcılar için hazırlanmış komut satırı kurulum kılavuzunu izleyebilir.

## **Sonuç**

Özetle GrapheneOS, kullanıcılarının gizliliğine ve güvenliğine öncelik veren alternatif bir mobil işletim sistemi sunmayı amaçlar; kullanıcılara güvendikleri uygulamalarla uyumluluğu korurken dijital yaşamları üzerinde daha fazla denetim sağlar. Gizlilik ve güvenlik kaygılarının büyük önem taşıdığı bir dönemde, mobil cihaz güvenliği ve gizliliği için yüksek bir standart belirlemeyi hedefleyen bir projedir.

## İlgili sayfalar

- [Güvenli Mesajlaşma Uygulamaları](Secure_Messengers.md) — güçlendirilmiş bir cihazda özel iletişim
- [PGP Şifrelemesi](PGP_Encryption.md) — şifrelenmiş e-posta ve dosya alışverişi
- [VPN ve DVPN](VPN_and_DVPN.md) — mobil cihazlarda ağ katmanı gizliliği
- [Web Tarayıcıları](Web_Browsers.md) — mobil tarayıcı seçimi ve güvenli hâle getirilmesi
