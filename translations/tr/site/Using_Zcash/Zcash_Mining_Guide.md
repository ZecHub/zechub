# Zcash Madencilik Rehberi: Kişisel Donanımla Bir Madencilik Havuzuna Katılma

## Giriş

Zcash (ZEC), madencilik için Equihash iş ispatı algoritmasını kullanan, gizliliğe odaklı bir kripto paradır. Zcash madenciliği; karmaşık matematiksel problemleri çözmek, işlemleri doğrulamak ve ağ güvenliğini sağlamak için hesaplama gücü kullanmayı, bunun karşılığında da ZEC ödülleri kazanmayı içerir. Ağın yüksek zorluk seviyesi nedeniyle, tek başına madencilik çoğu kullanıcı için önerilmez. Bir madencilik havuzuna katılmak, hash gücünüzü başkalarıyla birleştirerek istikrarlı ödüller kazanmanın en iyi yoludur.

Bu rehber, Zcash’in kişisel donanımla (ör. GPU’lu bir ev bilgisayarı veya giriş seviyesi ASIC’ler) nasıl kazılacağına odaklanır. GPU’ların hâlâ Zcash madenciliği yapabildiğini, ancak 2026 itibarıyla ağ zorluğu nedeniyle ASIC’lerin çok daha verimli ve kârlı olduğunu unutmayın. Elektrik maliyetleri, donanım fiyatları ve ZEC değeri gibi faktörler uygulanabilirliği etkilediğinden, her zaman WhatToMine.com gibi araçlarla güncel kârlılığı kontrol edin. Madencilik herkes için kârlı olmayabilir; yerel düzenlemeleri ve enerji tarifelerini araştırın (< $0.08/kWh hedefleyin).


## Gereksinimler

### Donanım
- **GPU Madenciliği (Yeni Başlayanlar İçin Önerilen Kişisel Kurulum):**
  - En az 4GB VRAM’e sahip NVIDIA veya AMD GPU’lar (ör. NVIDIA GTX 1070, RTX 3060; AMD RX 580 veya daha iyisi).
  - Uyumlu bir anakart, yeterli PSU (birden fazla GPU için en az 750W) ve aşırı ısınmayı önlemek için iyi bir soğutma.
  - Daha iyi hash oranları için çoklu GPU sistemleri yaygındır (ör. 6x GPU, 1-2 kSol/s elde edebilir).
- **ASIC Madenciliği (Daha Verimli Ama Daha Maliyetli):**
  - Bitmain Antminer Z15 (420 kSol/s) veya Innosilicon A9 (50 kSol/s) gibi Equihash uyumlu ASIC’ler.
  - Bunlar daha gürültülü, daha sıcak çalışır ve daha fazla güç tüketir (ör. 1500W+); özel alanlar için uygundur. Bitmain.com veya bayiler (Blockware Mining) gibi güvenilir kaynaklardan satın alın.
- **Genel:** Kararlı internet, kurulum/izleme için bir bilgisayar. ASIC’ler ağa hakimdir (2026’da toplam ~13 GSol/s hash oranı), bu da GPU madenciliğini daha az rekabetçi ama hobi amaçlı kullanıcılar için hâlâ mümkün kılar.

### Yazılım
- **İşletim Sistemi:** Windows 10/11, Linux (kararlılık için Ubuntu önerilir).
- **Madencilik Yazılımı:**
  - GPU’lar için: lolMiner (AMD/NVIDIA destekler), GMiner veya miniZ (NVIDIA odaklı). Resmî GitHub depolarından indirin (ör. github.com/Lolliedieb/lolMiner-releases).
  - ASIC’ler için: Üreticinin yerleşik firmware/pano arayüzünü kullanın (ör. Bitmain’in web arayüzü).
- **Cüzdan:** Ödemeleri almak için bir Zcash cüzdanı. Önerilenler:
  - Shielded (özel): Zashi Wallet, Zingo (Mobil/Masaüstü) YWallet (mobil/masaüstü).
  - Transparent (daha kolay ama daha az özel): Edge Wallet, Zecwallet Lite.
  - [wallets](https://zechub.wiki/wallets) adresinden indirin. Havuz destekliyorsa gizlilik için shielded bir adres (başında 'zs' olur) oluşturun.

### Diğer
- Elektrik: Maliyetleri hesaplayın. GPU’lar kart başına 150-300W kullanır; ASIC’ler 1000W+.
- Antivirüs: Kurulum sırasında devre dışı bırakın çünkü madencileri tehdit olarak işaretleyebilir.

## Bir Madencilik Havuzuna Katılmak İçin Adım Adım Rehber

### Adım 1: Zcash Cüzdanınızı Kurun
1. Resmî Zcash web sitesindeki [wallets](https://zechub.wiki/wallets) bağlantısından bir cüzdan indirip kurun.
2. Yeni bir cüzdan oluşturun ve seed ifadenizi güvenli şekilde yedekleyin.
3. Bir alım adresi oluşturun (gizlilik için tercihen shielded). Not edin, ör. `zs1exampleaddress...`.
4. Transparent bir adres kullanıyorsanız (başında 't' olur), daha basittir ama daha az gizlilik sunar.

### Adım 2: Donanımınızı Hazırlayın
- GPU’lar için:
  1. GPU’ları bilgisayarınıza takın ve sürücüleri güncelleyin (NVIDIA: GeForce Experience; AMD: Radeon Software).
  2. Deneyimliyseniz overclock yapın (kararlılık için MSI Afterburner kullanın; verimlilik için +100-200 çekirdek frekansı, -500 bellek hedefleyin).
- ASIC’ler için:
  1. ASIC’i elektriğe ve Ethernet’e bağlayın.
  2. Advanced IP Scanner veya üreticinin uygulaması gibi bir araçla IP adresini bulun.
  3. Web panosuna erişin (ör. IP’yi tarayıcıya girin, varsayılan giriş: Bitmain için root/root).

**Uyarı:** Uygun havalandırma sağlayın; madencilik ısı üretir. Test etmek için küçük başlayın.

### Adım 3: Bir Madencilik Havuzu Seçin ve Katılın
Madencilik havuzları işi dağıtır ve ödülleri katkıda bulunduğunuz hash oranına göre paylaşır. Ücretlere (%0-2), minimum ödeme tutarına (0.01-0.1 ZEC), konuma (düşük ping) ve güvenilirliğe göre seçim yapın.

**Önerilen Havuzlar (Hash Oranı, Ücretler ve İncelemelere Göre):**
- **2Miners (zec.2miners.com)**: %1 ücret, PPLNS ödeme, GPU/ASIC/NiceHash desteği. Yüksek hash oranı (~1.17 GSol/s), güvenilir sunucular.
- **F2Pool (zec.f2pool.com)**: %2 ücret, PPS+ ödeme, çoklu coin desteği. Büyük havuz (~2.57 GSol/s).
- **ViaBTC (zec.viabtc.com)**: %2 ücret (PPS+), kullanıcı dostu pano, küresel sunucular.
- **AntPool (zec.antpool.com)**: %1 ücret, Bitmain tarafından sunulur, ASIC’ler için iyidir (~494 MSol/s).
- **Sovright (mining.sovright.com)**: Stratum V2 üzerinde kurulu bir Zcash havuzu, şu anda herkese açık bir testnet olarak çalışıyor. Henüz canlı ZEC ödemesi yok, bu yüzden kazanç kaynağından çok kurulumunuzu test etmenin bir yolu olarak değerlendirin. Ayrıntılar için aşağıdaki özel bölüme bakın.
- Diğerleri: Kryptex Pool, Luxor (gerçek zamanlı istatistikler için poolwatch.io/coin/zcash adresini kontrol edin).

1. Havuzun web sitesini ziyaret edin ve bir hesap oluşturun (e-posta ile veya 2Miners gibi bazılarında kayıt olmadan).
2. Ödemeler için ayarlara Zcash cüzdan adresinizi ekleyin.
3. Havuzun stratum sunucusunu (ör. zec.2miners.com:1010) ve portunu not edin.

### Adım 4: Madencilik Yazılımını Kurun ve Yapılandırın
- GPU’lar için (Örnek: Windows/Linux üzerinde lolMiner):
  1. lolMiner’ı GitHub’dan indirin (en son sürüm, ör. 1.88).
  2. Bir klasöre çıkarın.
  3. Şu yapılandırmayla bir batch dosyası (start.bat) oluşturun:
     ```
     lolMiner.exe --coin ZEC --pool zec.2miners.com:1010 --user YOUR_WALLET_ADDRESS.WORKER_NAME --pass x
     ```
     - `YOUR_WALLET_ADDRESS` yerine ZEC adresinizi yazın.
     - `WORKER_NAME`: Sisteminiz için bir ad (ör. Rig1).
     - AB sunucuları için: eu.zec.2miners.com:1010.
  4. Batch dosyasını çalıştırın. Havuzla bağlantı kuracak ve madenciliğe başlayacaktır.
- ASIC’ler için (Örnek: Bitmain Antminer):
  1. Web panosuna giriş yapın.
  2. Miner Configuration bölümüne gidin.
  3. Havuz ayrıntılarını ekleyin:
     - URL: stratum+tcp://zec.2miners.com:1010
     - Kullanıcı adı: YOUR_WALLET_ADDRESS.WORKER_NAME
     - Şifre: x (veya boş).
  4. Kaydedin ve madenciyi yeniden başlatın.
- Diğer yazılımlar için (ör. GMiner):
  ```
  miner.exe --algo 125_4 --server zec.2miners.com:1010 --user YOUR_WALLET_ADDRESS.WORKER_NAME --pass x
  ```

**Test:** 10-15 dakika çalıştırın; kabul edilen share’ler ve hash oranı için konsolu kontrol edin.

### Adım 5: Madenciliği Başlatın ve İzleyin
1. Madenciyi başlatın: havuza bağlanacak ve share göndermeye başlayacaktır.
2. Şunlarla izleyin:
   - Havuz panosu: Hash oranını, ödenmemiş bakiyeyi ve istatistikleri görmek için cüzdan adresinizi girin.
   - Yazılım konsolu: Hataları, sıcaklığı izleyin (< 80 santigrat derece tutun).
   - Araçlar: Uzaktan sistem yönetimi için HiveOS veya SimpleMining OS kullanın.
3. Ödemeler: Çoğu havuz minimum eşiğe ulaştığınızda otomatik ödeme yapar (ör. 0.05 ZEC). Havuz kurallarını kontrol edin.

   
![Zcash Madencilik İzleme Kurulumu](/content-images/zcashMining-5ca0019c17.webp)


## Sovright: Testnet Havuzu ve Röle Ağı

Sovright (sovright.com), bir Stratum V2 madencilik havuzu ve ayrı bir blok röle ağı işletiyor. Farklı işler yaptıkları için aşağıda ayrı ayrı ele alınmıştır.

### Madencilik Havuzu (mining.sovright.com)

Sovright’ın havuzu mainnet’te değil, herkese açık bir Zcash testnet’inde (NU6, Stratum V2) çalışır. Testnet gerçek ZEC ödemez. Bunu, kazanmak için değil, madenci yapılandırmanızı test etmek için kullanın.

- Başlamak için hesap gerekmez. Bir CPU veya ASIC Equihash madencisini havuza yönlendirin, share’leriniz canlı panoda görünür.
- Sovright ayrıca, yalnızca havuzun işlerini almak yerine kendi blok şablonlarını seçmek isteyen madenciler için açık kaynaklı bir Stratum V2 proxy de yayımlıyor:
  ```
  git clone https://github.com/sovright/mining-infra
  cd mining-infra
  cargo build --release -p sovright-v1-stratum-proxy
  ./target/release/sovright-v1-stratum-proxy --listen 0.0.0.0:3334 --upstream 34.28.134.13:3333
  ```
  Madencinizi doğrudan havuz yerine proxy’ye yönlendirin:
  ```
  stratum+tcp://<your-proxy-ip>:3334
  ```
  ve `yourname.rig1` gibi bir worker adı kullanın.
- Sovright’ın şeffaflık sayfası, shielded işlemler için bazı havuzların yaptığı gibi filtreleme yapmak yerine "hepsini dahil et" politikası uyguladığını belirtir. Politikanın bağımsız olarak kontrol edilebilmesi için her blok imzalı bir tasdik alır.
- Örnek pano verileri yerine kendi worker’larınızı takip etmek için mining.sovright.com üzerinde bir hesap oluşturun (Google veya e-posta ile giriş).

### Röle Ağı (relay.sovright.com)

Sovright ayrıca Zcash mainnet üzerinde herkese açık bir blok röle ağı çalıştırır. Bir havuz bir blok bulduğunda, bu bloğun ağın geri kalanına ne kadar hızlı ulaştığı, ne sıklıkla orphan olacağını belirler; yani yayılım yarışını kaybeder ve ödülü kaybolur. Röle, ileri hata düzeltmeli compact block relay kullanarak blokları dört bölge arasında iletir.

Herkese açık pano, etkiyi canlı gösterir: röleye bağlı bölgeler yeni blokları, düz eşten eşe dedikodu yayılımına göre yarı süreden çok daha kısa sürede görür ve pano ağın canlı orphan oranını takip eder.

Bu, bireysel madenciler için değil, havuz operatörleri için bir altyapıdır. Sovright’ın açık kaynaklı `mining-infra` deposu, bulunan blokları yerel P2P’den daha hızlı biçimde ağa yaymak için bir `submitblock` röle ağ geçidi dokümante eder. Bağlanmak için, röle eş adresleri ve bir kimlik doğrulama anahtarı almak üzere doğrudan Sovright ile iletişime geçin (support@sovright.com).


## İpuçları ve En İyi Uygulamalar
- **Kârlılık:** whattomine.com/coins/166-zec-equihash gibi hesaplayıcıları kullanın. Örnek: Bir RTX 3060 (~300 Sol/s), $50/ZEC seviyesinde günde ~0.001 ZEC kazanır; bundan ~$0.50 elektrik düşülür.
- **Gizlilik:** Varsa shielded havuzları kullanın; adresleri tekrar kullanmaktan kaçının.
- **Güvenlik:** Güçlü parolalar kullanın; havuzlarda/cüzdanlarda 2FA etkinleştirin. Özel anahtarlarınızı asla paylaşmayın.
- **Sorun Giderme:** Hiç share yoksa güvenlik duvarını, antivirüsü veya hatalı yapılandırmayı kontrol edin. forum.zcashcommunity.com veya Reddit r/zec gibi forumlara katılın.
- **Alternatifler:** Kârlı değilse bulut madenciliğini veya diğer coin’lerde stake etmeyi değerlendirin.
- **Çevresel Not:** Madencilik enerji tüketir; mümkünse yenilenebilir kaynaklar kullanın.
- **Güncellemeler:** Zcash zamanla gelişebilir (ör. olası bir PoS geçişi); haberler için z.cash adresini kontrol edin.
