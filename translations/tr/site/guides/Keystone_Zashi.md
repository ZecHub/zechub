<a href="https://github.com/zechub/zechub/edit/main/site/guides/Keystone_Zashi.md" target="_blank">
  <img src="https://img.shields.io/badge/Edit-blue" alt="Sayfayı düzenle"/>
</a>

# Keystone Zodl (eski adıyla Zashi) Kullanım Kılavuzu

> Korumalı ZEC soğuk depolamada tutun: Keystone donanım cüzdanını, Zodl uygulamasıyla eşleştirin (eski adıyla Zashi, Şubat 2026'da yeniden markalandı) ve işlemleri QR koduyla imzalayın.

## Kısaca

* Cypherpunk ürün yazılımına sahip Keystone 3 Pro (veya Keystone 3), Zodl için çevrimdışı imzalayıcı olarak çalışır; böylece korumalı ZEC soğuk depolamada kalabilir.
* Başlamadan önce: pil seviyesi %20'nin üzerinde olmalı, ürün yazılımı güncellemeleri için USB kablonuz (veya FAT32 MicroSD kartınız) ve telefonunuzda Zodl uygulaması olmalı.
* Önce cihazı Keystone web sitesinde doğrulayın. Böylece cihazın nakliye sırasında kurcalanmadığını kontrol edebilirsiniz.
* Cüzdanı Keystone üzerinde oluşturun ve 24 kelimelik kurtarma ifadesini çevrimdışı olarak not edin. Bu ifade hiçbir zaman Zodl içine girilmez.
* Bağlanmak için: Keystone uygulamasında “...” > Yazılım Cüzdanını Bağla > Zodl öğesine dokunun; ardından Zodl uygulamasında Donanım Cüzdanını Bağla öğesine dokunup QR kodunu tarayın.
* Zodl her işlemi oluşturur; siz de QR kodlarını karşılıklı taratarak işlemi Keystone ekranında onaylayıp imzalarsınız.

## Temel Açıklama

Donanım cüzdanı, harcama anahtarlarınızı internete hiç bağlanmayan ayrı bir cihazda saklar. Keystone çevrimdışı çalışır: telefonunuzla Bluetooth veya USB üzerinden değil, yalnızca QR kodları aracılığıyla iletişim kurar.

Bu düzende Zodl “izleme” tarafıdır. Zcash ağıyla eşitlenir, korumalı bakiyenizi gösterir ve işlemleri hazırlar. Keystone kurtarma ifadesini saklar ve işlemleri imzalar. Güvenliği ihlal edilmiş bir telefon bakiyenizi görebilir, ancak Keystone üzerindeki onayınız olmadan paranızı taşıyamaz.

Aşağıdaki adımlarda cihazı hazırlama, doğrulama, ürün yazılımını güncelleme, cüzdanı oluşturma ve Zodl uygulamasına bağlama işlemleri ele alınmaktadır.

## Genel Bakış

Twitter Kılavuzu:  => [Zodl (eski adıyla Zashi) x Keystone Donanım Cüzdanı Entegrasyonu Twitter Kılavuzu](https://x.com/zashi_app/status/1869793574880973144) 

Bu entegrasyon, korumalı ZEC varlıkların soğuk depolamada saklanmasını sağlayarak Zcash kullanılabilirliğinde önemli bir gelişmeye işaret ediyor. Zcash topluluğu geçmişte diğer donanım cüzdanı platformlarıyla ilgili aksaklıklar yaşadı; ancak Keystone, sınırları zorlamaya ve Electric Coin Company ile birlikte yenilik yapmaya istekli bir iş ortağı olarak öne çıktı. Keystone ekibine, çalışmanın kendi taraflarını desteklemek için bir ZCG hibesi verildi.

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
[Keystone 3 Pro veya Keystone 3](https://keyst.one) sipariş edin ve teslim alın

Pil Seviyesi: Keystone cihazınızın pil seviyesinin %20'nin üzerinde olduğundan emin olun.

USB Kablosu veya SD Kart:

- Ürün yazılımı güncellemesi için USB kablosu (dahildir).
- Yükseltmeler için Micro SD kart (1 TB'tan küçük; ayrıca satın alınır).

Doğrulama ve ürün yazılımı güncellemesi için Keystone'un resmi web sitesine erişim.

Mobil cihazınızda Zodl uygulamasının kurulumu.

## [Adım Adım Kılavuz (Keystone Cihazı)](https://keyst.one/get-started)


**Dilinizi Seçin**

- **Cihaz Doğrulaması (QR ile):** Cihaz doğrulaması, nakliye sırasında olası kurcalamaları tespit etmek, tedarik zinciri saldırılarını önlemek ve yüklü ürün yazılımının güvenliğini sağlamak açısından çok önemlidir.
  - Keystone web sitesindeki Cihaz Doğrulama sayfasını ziyaret edin.
  - Resmi web sitesinde QR Kodunu Tara öğesine tıklayın.
  - Web sitesinde gösterilen QR kodunu Keystone kameranızla tarayın.
  - Keystone ekranınızda bir doğrulama kodu görünür.
  - Doğrulama işlemini tamamlamak için bu kodu web sitesine girin.

- **Ürün Yazılımı Güncellemesi:**
  - MicroSD kartla güncelleme
    - Keystone cüzdanınızın pilinin en az %20 dolu olduğundan emin olun.
    - SD kartı bilgisayarınıza takın ve FAT32 olarak biçimlendirin.
    - En son Cypherpunk ürün yazılımı sürümünü [Keystone Ürün Yazılımı Güncelleme sayfasından](https://keyst.one/firmware) indirin ve keystone3.bin dosyasını MicroSD kartınızın kök dizinine kaydedin.
    - Ürün yazılımını içeren SD kartı Keystone cüzdanınıza takın.
    - Keystone cüzdanınızdaki “Yükselt” seçeneğine erişin ve güncelleme işlemini başlatmak için ekrandaki yönergeleri izleyin.
  - **USB Kablosuyla Güncelleme**
    - Ürün yazılımı sürümünüz 1.0.4'ten eskiyse USB güncellemelerine geçmeden önce ilk güncellemeyi MicroSD kart kullanarak yapmanız gerekir.
    - Keystone cüzdanınızın pilinin en az %20 dolu olduğundan emin olun.
    - USB ile seçeneğine dokunun ve USB kablosunu kullanarak Keystone cüzdanınızı bilgisayarınıza bağlayın. [Onayla] öğesine dokunarak Keystone cüzdanınıza USB erişim izni verin; aksi takdirde cihaz yalnızca şarj işlemine izin verebilir.
    - Bilgisayarınızda bir web tarayıcısı açın ve [Keystone Ürün Yazılımı Güncelleme sayfasına](https://keyst.one/firmware) gidin.
    - Güncelleme sayfasında Güncellemeyi Yükle düğmesine tıklayın ve en son ürün yazılımını yüklemek için verilen yönergeleri izleyin.
- **Cüzdan Oluşturma:**
    - Güvenli Parola: Cüzdanınızı korumak için güçlü bir PIN veya parola seçin.
    - Cüzdanınıza Ad Verin (İsteğe Bağlı): Kolayca tanımlayabilmek için cüzdanınıza isteğe bağlı olarak bir ad verin veya bu adımı atlayın.
    - İlk kez cüzdan kuruyorsanız Yeni Cüzdan Oluştur öğesini seçin.
    - Cihazınız 24 kelimelik bir kurtarma ifadesi oluşturur.
    - Bu kurtarma ifadesini not edin ve güvenli bir yerde saklayın.
    - Ekranda gösterilen kelimeleri doğru sırayla doğrulayarak kurtarma ifadesini onaylayın.
- **Zodl + Keystone Cüzdanını Bağlama:**
    - Keystone cihazında: Ana sayfada … öğesine dokunun.
    - Yazılım Cüzdanını Bağla öğesine dokunun ve Zodl seçeneğini belirleyin. Zodl bağlantısı için QR kodu görünür.
    - Zodl uygulamasında: Zodl açılır menüsüne dokunun (ekranın sol üst köşesinde).
    - Donanım Cüzdanını Bağla öğesine dokunun.
    - Taramaya Hazır öğesine dokunun.
    - Keystone Cihazında gösterilen QR kodunu tarayın.
    - Zodl uygulamasında: Görüntülenen hesaba dokunarak Keystone Cüzdan Hesabını onaylayın.
    - Ekranın altındaki Bağlan öğesine dokunun.


## Ek Yardım

<div className="my-8 w-full aspect-video max-w-3xl mx-auto rounded-2xl overflow-hidden shadow-lg bg-black">
  <iframe
    className="w-full h-full"
    src="https://www.youtube.com/embed/Jr6LqtD1W0s"
    title="Keystone Donanım Cüzdanını Zodl uygulamasına bağlama"
    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
    allowFullScreen
    loading="lazy"
  />
</div>
    

<div className="my-8 w-full aspect-video max-w-3xl mx-auto rounded-2xl overflow-hidden shadow-lg bg-black">
  <iframe
    className="w-full h-full"
    src="https://www.youtube.com/embed/t_OHb1KqrRg"
    title="Keystone ile giden bir işlemi imzalama"
    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
    allowFullScreen
    loading="lazy"
  />
</div>
