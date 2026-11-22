<a href="https://github.com/zechub/zechub/edit/main/site/guides/Keystone_Zashi.md" target="_blank">
  <img src="https://img.shields.io/badge/Edit-blue" alt="Sayfayı düzenle"/>
</a>

# Keystone Zodl (eski adıyla Zashi) Kullanım Kılavuzu

> Korumalı ZEC varlıklarınızı soğuk depolamada tutun: Keystone donanım cüzdanını Zodl uygulamasıyla (eski adıyla Zashi, Şubat 2026'da yeniden markalandı) eşleştirin ve işlemleri QR koduyla imzalayın.

## Kısaca

* Cypherpunk firmware'li Keystone 3 Pro (veya Keystone 3), Zodl için çevrimdışı imzalayıcı olarak çalışır; böylece korumalı ZEC varlıklar soğuk depolamada tutulabilir.
* Başlamadan önce: pil seviyesi %20'nin üzerinde olmalı; firmware güncellemeleri için USB kablosunu (veya FAT32 MicroSD kartını) ve telefonunuzda Zodl uygulamasını hazır bulundurun.
* Önce cihazı Keystone web sitesinde doğrulayın. Bu, cihazın taşıma sırasında kurcalanmadığını kontrol eder.
* Cüzdanı Keystone üzerinde oluşturun ve 24 kelimelik kurtarma ifadesini çevrimdışı olarak not edin. Bu ifade hiçbir zaman Zodl içine girilmez.
* Bağlanmak için: Keystone üzerinde "..." > Yazılım Cüzdanını Bağla > Zodl seçeneğine dokunun; ardından Zodl içinde Donanım Cüzdanını Bağla'ya dokunup QR kodunu tarayın.
* Zodl her işlemi oluşturur; siz de QR kodlarını karşılıklı tarayarak Keystone ekranında işlemi onaylayıp imzalarsınız.

## Temel Açıklama

Donanım cüzdanı, harcama anahtarlarınızı internete hiç bağlanmayan ayrı bir cihazda tutar. Keystone çevrimdışı çalışır: telefonunuzla Bluetooth veya USB üzerinden değil, yalnızca QR kodları aracılığıyla iletişim kurar.

Bu düzende Zodl "izleme" tarafıdır. Zcash ağıyla eşitlenir, korumalı bakiyenizi gösterir ve işlemleri hazırlar. Keystone kurtarma ifadesini saklar ve işlemleri imzalar. Ele geçirilmiş bir telefon bakiyenizi görebilir, ancak Keystone üzerinde onay verilmeden fonları taşıyamaz.

Aşağıdaki adımlarda cihazın hazırlanması, doğrulanması, firmware'inin güncellenmesi, cüzdanın oluşturulması ve Zodl ile bağlanması anlatılıyor.

## Genel Bakış

Twitter Kılavuzu:  => [Zodl (eski adıyla Zashi) x Keystone Donanım Cüzdanı Entegrasyonu Twitter Kılavuzu](https://x.com/zashi_app/status/1869793574880973144) 

Bu entegrasyon, korumalı ZEC varlıkların soğuk depolamada saklanmasını sağlayarak Zcash kullanım kolaylığında önemli bir ilerleme sunuyor. Zcash topluluğu geçmişte diğer donanım cüzdanı platformlarında aksaklıklar yaşadı; ancak Keystone, sınırları zorlamaya ve Electric Coin Company ile birlikte yenilik yapmaya istekli bir iş ortağı olarak öne çıktı. Keystone ekibi, kendi çalışmalarını desteklemek için ZCG hibesi aldı.

## Keystone X Zodl Eğitimi

<div className="my-8 w-full aspect-video max-w-3xl mx-auto rounded-2xl overflow-hidden shadow-lg bg-black">
  <iframe
    className="w-full h-full"
    src="https://www.youtube.com/embed/ktYf7josJKM"
    title="Keystone X Zodl Eğitimi"
    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
    allowFullScreen
    loading="lazy"
  />
</div>
    

## Hazırlık
[Keystone 3 Pro veya Keystone 3'ü Sipariş Edin ve Teslim Alın](https://keyst.one) 

Pil Seviyesi: Keystone cihazınızın pil seviyesinin %20'nin üzerinde olduğundan emin olun.

USB Kablosu veya SD Kart:

- Firmware güncellemesi için USB kablosu (pakete dahildir).
- Yükseltmeler için Micro SD kart (1 TB'tan küçük, ayrıca satın alınır).

Doğrulama ve Firmware Güncellemesi için Keystone'un resmi web sitesine erişim.

Mobil cihazınızda Zodl uygulamasının kurulumu.

## [Adım Adım Kılavuz(Keystone Cihazı)](https://keyst.one/get-started) 


**Dilinizi Seçin**

- **Cihaz Doğrulaması (QR ile):** Cihaz doğrulaması; taşıma sırasında oluşabilecek müdahaleleri tespit etmek, tedarik zinciri saldırılarını önlemek ve yüklenen firmware'in güvenliğini sağlamak için çok önemlidir.
  - Keystone web sitesindeki Cihaz Doğrulama sayfasını ziyaret edin.
  - Resmi web sitesinde QR Kodunu Tara'ya tıklayın.
  - Web sitesinde gösterilen QR kodunu taramak için Keystone kamerasını kullanın.
  - Keystone ekranınızda bir doğrulama kodu görüntülenir.
  - Doğrulama sürecini tamamlamak için bu kodu web sitesine girin.

- **Firmware Güncellemesi:**
  - MicroSD kart ile güncelleme
    - Keystone cüzdanınızın pil seviyesinin en az %20 olduğundan emin olun.
    - SD kartı bilgisayarınıza takın ve FAT32 olarak biçimlendirin.
    - [Keystone Firmware Güncelleme sayfasından](https://keyst.one/firmware) en yeni Cypherpunk firmware sürümünü indirin ve keystone3.bin dosyasını MicroSD kartınızın kök dizinine kaydedin.
    - Firmware'in bulunduğu SD kartı Keystone cüzdanınıza takın.
    - Keystone cüzdanınızda "Yükselt" seçeneğine gidin, ardından güncelleme sürecini başlatmak için ekrandaki talimatları izleyin.
  - **USB Kablosuyla Güncelleme**
    - Firmware sürümünüz 1.0.4'ten eskiyse USB üzerinden güncellemeye geçmeden önce ilk güncellemeyi MicroSD kart kullanarak yapmanız gerekir.
    - Keystone cüzdanınızın pil seviyesinin en az %20 olduğundan emin olun.
    - USB ile seçeneğine dokunun ve USB kablosunu kullanarak Keystone cüzdanınızı bilgisayarınıza bağlayın. [Onayla] seçeneğine dokunarak Keystone cüzdanınıza USB erişim izni verin; aksi takdirde yalnızca şarj etmeye izin verebilir.
    - Bilgisayarınızın web tarayıcısını açın ve [Keystone Firmware Güncelleme sayfasına](https://keyst.one/firmware) gidin
    - Güncelleme sayfasında Güncellemeyi Yükle düğmesine tıklayın ve en yeni firmware'i yüklemek için verilen talimatları izleyin.
- **Cüzdan Oluşturma:**
    - Güvenli parola: Cüzdanınızı korumak için güçlü bir PIN veya parola belirleyin.
    - Cüzdanınıza ad verin (isteğe bağlı): Kolayca tanımak için cüzdanınıza bir ad verebilir veya bu adımı atlayabilirsiniz.
    - İlk kez cüzdan kuruyorsanız Yeni Cüzdan Oluştur'u seçin.
    - Cihazınız 24 kelimelik bir kurtarma ifadesi oluşturur.
    - Bu ifadeyi not edin ve güvenli bir yerde saklayın.
    - Ekranda gösterilen kelimeleri doğru sırayla doğrulayarak kurtarma ifadesini onaylayın.
- **Zodl + Keystone Cüzdanını Bağlama:**
    - Keystone cihazında: Ana sayfada … simgesine dokunun
    - Yazılım Cüzdanını Bağla'ya dokunun ve Zodl seçeneğini belirleyin. Zodl bağlantısı için QR kodu görüntülenir.
    - Zodl Uygulamasında: Zodl açılır menüsüne (ekranın sol üstünde) dokunun
    - Donanım Cüzdanını Bağla'ya dokunun
    - Taramaya Hazırım'a dokunun
    - Keystone Cihazında görüntülenen QR kodunu tarayın
    - Zodl Uygulamasında: Görüntülenen hesaba dokunarak Keystone Cüzdanı Hesabını onaylayın
    - Ekranın altındaki Bağlan'a dokunun


## Ek Yardım

<div className="my-8 w-full aspect-video max-w-3xl mx-auto rounded-2xl overflow-hidden shadow-lg bg-black">
  <iframe
    className="w-full h-full"
    src="https://www.youtube.com/embed/Jr6LqtD1W0s"
    title="Keystone Donanım Cüzdanını Zodl Uygulamasına Bağlama"
    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
    allowFullScreen
    loading="lazy"
  />
</div>
    

<div className="my-8 w-full aspect-video max-w-3xl mx-auto rounded-2xl overflow-hidden shadow-lg bg-black">
  <iframe
    className="w-full h-full"
    src="https://www.youtube.com/embed/t_OHb1KqrRg"
    title="Keystone ile Giden Bir İşlemi İmzalama"
    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
    allowFullScreen
    loading="lazy"
  />
</div>
