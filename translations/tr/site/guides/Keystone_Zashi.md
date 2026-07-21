# Keystone Zashi Kullanım Kılavuzu

Twitter Rehberi:  => [Zashi x Keystone Donanım Cüzdanı Entegrasyonu Twitter Rehberi](https://x.com/zashi_app/status/1869793574880973144) 

Bu entegrasyon, korumalı ZEC için soğuk depolamayı mümkün kılarak Zcash kullanılabilirliğinde önemli bir evrime işaret ediyor. Zcash topluluğu geçmişte diğer donanım cüzdanı platformlarıyla aksaklıklar yaşadı, ancak Keystone sınırları zorlamaya ve Electric Coin Company ile birlikte yenilik yapmaya istekli, iş birliğine açık bir ortak olarak öne çıktı. Keystone ekibi, çalışmanın kendi tarafını finanse etmek için bir ZCG hibesi aldı.

## Keystone X Zashi Eğitimi

<div className="my-8 w-full aspect-video max-w-3xl mx-auto rounded-2xl overflow-hidden shadow-lg bg-black">
  <iframe
    className="w-full h-full"
    src="https://www.youtube.com/embed/ktYf7josJKM"
    title="Keystone X Zashi Tutorial"
    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
    allowFullScreen
    loading="lazy"
  />
</div>
    

## Hazırlık
[Keystone 3 Pro veya Keystone 3'ünüzü Sipariş Edin ve Teslim Alın](https://keyst.one) 

Pil Seviyesi: Keystone cihazınızın pil seviyesinin %20'nin üzerinde olduğundan emin olun.

USB Kablosu veya SD Kart:

- Firmware güncellemesi için USB kablosu (dahil).
- Yükseltmeler için Micro SD kart (1 TB'den küçük) (ayrıca satın alınır).

Doğrulama ve Firmware Güncellemesi için Keystone'un resmî web sitesine erişim.

Mobil cihazınızda Zashi uygulamasının kurulumu.

## [Adım Adım Kılavuz (Keystone Cihazı)](https://keyst.one/get-started) 


**Dilinizi Seçin**
-Cihaz Doğrulaması (QR ile): Cihaz Doğrulaması, taşıma sırasında olası müdahaleleri tespit etmek, tedarik zinciri saldırılarını önlemek ve kurulu firmware'in güvenliğini sağlamak için kritik öneme sahiptir.
  - Keystone web sitesindeki Cihaz Doğrulaması sayfasını ziyaret edin.
  - Resmî web sitesinde QR Kodunu Tara seçeneğine tıklayın.
  - Web sitesinde gösterilen QR kodunu taramak için Keystone kameranızı kullanın.
  - Keystone ekranınızda bir doğrulama kodu görünecektir.
  - Doğrulama sürecini tamamlamak için bu kodu web sitesine girin.

- **Firmware Güncellemesi:**
  - MicroSD kart ile güncelleme
    - Keystone cüzdanınızın en az %20 pil şarjına sahip olduğundan emin olun.
    - SD kartı bilgisayarınıza takın ve FAT32 olarak biçimlendirin.
    - En güncel Cypherpunk firmware sürümünü [Keystone Firmware Güncelleme sayfasından](https://keyst.one/firmware) indirin ve keystone3.bin dosyasını MicroSD kartınızın kök dizinine kaydedin.
    - Firmware yüklü SD kartı Keystone cüzdanınıza yerleştirin.
    - Keystone cüzdanınızda "Upgrade" seçeneğine erişin, ardından güncelleme sürecini başlatmak için ekrandaki talimatları izleyin.
  - **USB Kablosu ile Güncelleme**
    - Firmware sürümünüz 1.0.4'ün altındaysa, USB güncellemelerine geçmeden önce ilk güncellemeyi bir MicroSD kart kullanarak yapmanız gerekir.
    - Keystone cüzdanınızın en az %20 pil şarjına sahip olduğundan emin olun.
    - via USB seçeneğine dokunun ve USB kablosunu kullanarak Keystone cüzdanınızı bilgisayarınıza bağlayın. Keystone cüzdanınıza USB erişimi vermek için [Approve] seçeneğine dokunun; aksi takdirde yalnızca şarja izin verebilir.
    - Bilgisayarınızın web tarayıcısını açın ve [Keystone Firmware Güncelleme sayfasına](https://keyst.one/firmware) gidin
    - Güncelleme sayfasında Install Update düğmesine tıklayın ve en güncel firmware'i yüklemek için verilen talimatları izleyin.
- **Cüzdan Oluşturun:**
    - Güvenli Parola: Cüzdanınızı korumak için güçlü bir PIN veya parola seçin.
    - Cüzdanınıza İsim Verin (İsteğe Bağlı): Kolay tanınması için isteğe bağlı olarak cüzdanınıza bir ad verin veya bu adımı atlayın.
    - İlk kez bir cüzdan kuruyorsanız Create New Wallet seçeneğini seçin.
    - Cihazınız 24 kelimelik bir seed phrase oluşturacaktır.
    - Bu seed phrase'i yazın ve güvenli bir şekilde saklayın.
    - Ekranda gösterildiği şekilde kelimeleri doğru sırayla doğrulayarak seed phrase'i onaylayın.
- **Zashi + Keystone Cüzdanını Bağlayın:**
    - Keystone cihazında: Ana sayfada … öğesine dokunun
    - Connect Software Wallet seçeneğine dokunun ve Zashi'yi seçin. Zashi'ye bağlantı için QR kodu görünecektir.
    - Zashi Uygulamasında: zashi açılır menüsüne dokunun (ekranın sol üstü)
    - Connect Hardware Wallet seçeneğine dokunun
    - Ready to Scan seçeneğine dokunun
    - Keystone Cihazında gösterilen QR kodunu tarayın
    - Zashi Uygulamasında: Gösterilen hesaba dokunarak Keystone Cüzdan Hesabını onaylayın
    - Ekranın altındaki Connect seçeneğine dokunun


## Ek Yardım

<div className="my-8 w-full aspect-video max-w-3xl mx-auto rounded-2xl overflow-hidden shadow-lg bg-black">
  <iframe
    className="w-full h-full"
    src="https://www.youtube.com/embed/Jr6LqtD1W0s"
    title="Connect Keystone Hardware Wallet to Zashi"
    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
    allowFullScreen
    loading="lazy"
  />
</div>
    

<div className="my-8 w-full aspect-video max-w-3xl mx-auto rounded-2xl overflow-hidden shadow-lg bg-black">
  <iframe
    className="w-full h-full"
    src="https://www.youtube.com/embed/t_OHb1KqrRg"
    title="Sign an Outgoing Transaction with Keystone"
    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
    allowFullScreen
    loading="lazy"
  />
</div>
