<a href="https://github.com/zechub/zechub/edit/main/site/Privacy_Tools/GrapheneOS.md" target="_blank">
  <img src="https://img.shields.io/badge/Edit-blue" alt="Sayfayı Düzenle"/>
</a>

# Graphene OS

GrapheneOS, Android uygulamalarıyla uyumluluğu korurken mobil cihazlarda gizlilik ve güvenliği geliştirmeye adanmış, kâr amacı gütmeyen, açık kaynaklı bir projedir. Bu işletim sistemi, gizlilik ve güvenlik teknolojilerini ilerletmeye güçlü bir vurgu yapar; özellikle sandboxing’i güçlendirmeye, exploit azaltma önlemlerini geliştirmeye ve izin modelini iyileştirmeye odaklanır. 2014 yılında **CopperheadOS** adıyla doğmuştur. O zamandan bu yana dijital gizliliğinizin ve güvenliğinizin güçlü bir koruyucusuna dönüşmüştür.

GrapheneOS’in temel amacı, kullanıcı deneyimini olumsuz etkilemeden uygulama sandbox’ı gibi güvenlik sınırlarını güçlendirmektir. 

GrapheneOS, Ağ izinleri, Sensör izinleri veya cihaz kilitliyken geçerli kısıtlamalar (USB çevre birimleri, kamera erişimi ve hızlı ayarlar kutucukları gibi unsurları kapsayan) gibi belirli özellikler için çeşitli anahtarlar sunabilir. Buna ek olarak, kullanıcıya yönelik daha gelişmiş gizlilik ve güvenlik özellikleri, kullanıcı dostu bir deneyimi koruyacak şekilde özenle tasarlanmıştır; her biri kendi kullanıcı arayüzü iyileştirmeleriyle gelir.

## **GrapheneOS’in Özellikleri**

**Güvenlik Güçlendirmesi** GrapheneOS, yaygın güvenlik açıklarını azaltmak için bellek güvenli programlama dilleri ve derleyici tabanlı güvenlik özellikleri gibi kapsamlı güvenlik geliştirmeleri içerir.

**Sandboxing** Uygulamaları birbirinden izole etmek için uygulama sandboxing’ini güçlendirir ve olası saldırı vektörlerini sınırlar.

**Verified Boot** GrapheneOS, işletim sisteminin bütünlüğünü sağlamak için donanım destekli anahtarlar ve doğrulanabilir bir açılış süreci kullanır.

**Geliştirilmiş İzinler** Kullanıcılara uygulama izinleri üzerinde daha iyi kontrol sağlar ve uygulamaların hangi verilere erişebileceğini ayrıntılı biçimde yönetmelerine olanak tanır.

**Gizlilik Paneli** Kullanıcılar, uygulama davranışını bir gizlilik paneli üzerinden izleyip kontrol edebilir; bu da veri kullanımı konusunda şeffaflık sağlar.

**Yerleşik Güvenlik Güncellemeleri** GrapheneOS, zamanında güvenlik güncellemeleri sunarak kullanıcıların güvenlik açıklarına karşı en güncel korumaya sahip olmasını sağlar.

**Güçlü Şifreleme** Varsayılan olarak tam disk şifrelemesi kullanır ve cihazda depolanan verileri korur.

**Geliştirilmiş Tarayıcı Güvenliği** Varsayılan tarayıcı, izlemeye karşı koruma da dahil olmak üzere artırılmış güvenlik için yapılandırılmıştır.

**Minimum Ön Yüklü Uygulama** GrapheneOS, minimum sayıda ön yüklü uygulamayla gelir; bu da olası güvenlik ve gizlilik risklerini azaltır.

**USB Düşmanca Port Koruması** Cihaz kilitliyken USB bağlantı noktaları üzerinden cihaza yetkisiz erişime karşı koruma sunar.

**Kötü Amaçlı Yazılım Karşıtı Korumalar** GrapheneOS, bilinen kötü amaçlı yazılımları tespit etmeye ve önlemeye yönelik özellikler içerir.

**Gizlilik Odaklıdır** İşletim sistemi, veri toplama ve veri açığa çıkmasını en aza indirecek şekilde kullanıcı gizliliğine güçlü bir vurgu yapılarak tasarlanmıştır.

**Açık Kaynak** Güvenliği geliştirmek için şeffaflığa ve topluluk katkılarına imkân tanıyan açık kaynaklı bir projedir.

**Özelleştirilebilir Güvenlik Politikaları** Kullanıcılar, çeşitli güvenlik politikalarını kendi tercihlerine göre özelleştirebilir.

**Uyumluluk** GrapheneOS, Android uygulamalarıyla uyumluluğu korumaya çalışır; böylece kullanıcılar gelişmiş güvenlik ve gizlilik özelliklerinden faydalanırken favori uygulamalarını kullanmaya devam edebilir.

## **GrapheneOS Kurulumu**

En iyi uygulamalar bölümünde belirtildiği gibi, önerilen resmî kurulum kılavuzunun kullanılması tavsiye edilir. GrapheneOS’i kurmanın iki yöntemi vardır: ya [WebUSB tabanlı yükleyiciyi](https://grapheneos.org/install/web) kullanmak ya da [komut satırı kurulum kılavuzunu](https://grapheneos.org/install/cli) takip etmek.

**Web USB Tabanlı Kurulum** GrapheneOS’i Web yükleyici yöntemiyle kurmak için genellikle aşağıdaki materyal ve kaynaklara ihtiyacınız olacaktır:

- 2 GB boş bellek ve 32 GB boş depolama alanı.
- USB Kablosu (A veya C)
- Desteklenen İşletim Sistemleri : Windows 10, Windows 11, macOS Big Sur (11 - 13), Arch Linux, Debian (10 - 12), Ubuntu (22.04, 22.10 ve 23.04), ChromeOS, GrapheneOS, Google Android (stok Pixel OS)
- Desteklenen Tarayıcılar: Chromium (Ubuntu ile desteklenmez), Vanadium (GrapheneOS), Google Chrome, Microsoft Edge, Brave Browser.

Aşağıdaki bağlantıdan kurulum kılavuzuna göz atın ve kurulum sürecini takip edin

[GrapheneOS Web Kurulum Kılavuzu](https://grapheneos.org/install/web#prerequisites)

**Komut Satırı kurulumu** Komut satırı kurulumu, teknik açıdan yatkın olmayan kullanıcılar için önerilmez ve aşağıdaki araçlar ile kaynaklar Komut Satırı Kurulumu için gereklidir;

- En az 2 GB boş belleğiniz ve 32 GB boş depolama alanınız olmalıdır
- USB Kablosu (A veya C)
- Desteklenen İşletim Sistemleri Windows 10 Windows 11 macOS Big Sur (11) macOS Monterey (12) macOS Ventura (13) Arch Linux Debian 10 (buster) Debian 11 (bullseye) Debian 12 (bookworm) Ubuntu 20.04 LTS Ubuntu 22.04 LTS Ubuntu 22.10 Ubuntu 23.04
- Android, ChromeOS veya GrapheneOS üzerinden Web Installer

Aşağıdaki bağlantıdan kurulum kılavuzuna göz atın ve kurulum sürecini takip edin 

[Komut Satırı Kurulumu](https://grapheneos.org/install/cli#prerequisites)

## **En İyi Uygulamalar**

**İşletim Sistemini Güncel Tutun** En son güvenlik yamalarına ve geliştirmelere sahip olduğunuzdan emin olmak için GrapheneOS’i düzenli olarak güncelleyin.

**Güçlü Parolalar Kullanın** Yetkisiz erişimi önlemek için cihaz şifrelemesi ve uygulama girişleri için güçlü, benzersiz parolalar belirleyin.

**Uygulama İzinleri** Uygulama izinlerini dikkatle gözden geçirin ve yönetin; her uygulamanın çalışması için yalnızca gerekli olan izinleri verin.

**Düzenli Yedeklemeler** Cihaz kaybı veya veri bozulması durumunda verilerinizi korumak için düzenli yedeklemeler yapın.

**Depolamayı Şifreleyin** Varsayılan olarak etkin değilse, cihaz kaybolur veya çalınırsa verilerinizi korumak için cihaz depolamanızı şifreleyin.

**Güvenli Kilit Ekranı** Yetkisiz erişimi önlemek için PIN, parola veya biyometrik kimlik doğrulama gibi güvenli bir kilit ekranı kullanın.

**Android Cihazınızı Root Etmekten Kaçının** Root işlemi yapmaktan veya bootloader kilidini açmaktan kaçının; çünkü bu, cihaz güvenliğini zayıflatabilir.

**Uygulama Kaynaklarını Doğrulayın** Kötü amaçlı yazılım yüklemekten kaçınmak için uygulamaların ve kaynaklarının gerçekliğini doğrulayın.

**Gizlilik Odaklı Bir Tarayıcı Kurun** Güvenli gezinme için Brave browser, Firefox veya Bromite gibi gizlilik odaklı bir tarayıcı kullanmayı değerlendirin.

**Uygulamaları Düzenli Olarak Denetleyin** Saldırı yüzeyini azaltmak için artık kullanmadığınız veya güvenmediğiniz uygulamaları periyodik olarak gözden geçirin ve kaldırın.

**İki Faktörlü Kimlik Doğrulamayı (2FA) Etkinleştirin** Ekstra bir güvenlik katmanı eklemek için çevrimiçi hesaplarınızda 2FA’yı etkinleştirin.

**Halka Açık Wi-Fi’dan Kaçının** Herkese açık Wi-Fi ağlarına bağlanırken dikkatli olun; çünkü bunlar daha az güvenli olabilir. Gerektiğinde bir VPN kullanın.

**Konum Verileri Konusunda Dikkatli Olun** Uygulamalar için konum takibini sınırlayın ve gizliliğe önem veriyorsanız bir konum yanıltma aracı kullanmayı değerlendirin.

**Bilinmeyen Bağlantı ve Eklerden Kaçının** İstenmeyen bağlantılara ve e-posta eklerine karşı dikkatli olun; bunlar phishing girişimleri veya kötü amaçlı yazılım olabilir.

**Varsayılan Ayarları Gözden Geçirin** Varsayılan ayarları dikkatlice inceleyin ve gizlilik tercihlerinize uyacak şekilde düzenleyin.

**Topluluk Desteği** İpuçları, güncellemeler ve güvenlik tavsiyeleri için GrapheneOS topluluğu ve forumlarıyla etkileşim kurun. Ek iletişim yollarını keşfetmek için [buraya](https://grapheneos.org/contact) tıklayarak ekiple iletişime geçebilir ve güncel kalabilirsiniz.

**Resmî Kurulum Yöntemini Kullanın** GrapheneOS, resmî olarak desteklenen iki kurulum yöntemi sunar. Kullanıcılar, çoğu kişi için önerilen WebUSB tabanlı yükleyiciyi tercih edebilir ya da teknik açıdan daha yetkin kullanıcılara uygun olan komut satırı kurulum kılavuzunu takip edebilir.

## **Sonuç**

Özünde GrapheneOS, kullanıcı gizliliğini ve güvenliğini önceliklendiren alternatif bir mobil işletim sistemi sunmayı amaçlar; böylece kullanıcılarına dijital yaşamları üzerinde daha fazla kontrol sağlarken güvendikleri uygulamalarla uyumluluk da sunar. Gizlilik ve güvenlik kaygılarının son derece önemli olduğu bir çağda, mobil cihaz güvenliği ve gizliliği için yüksek bir standart belirlemeyi hedefleyen bir projedir.
