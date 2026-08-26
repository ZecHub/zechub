# Zcash Madencilik Rehberi: Kişisel Donanımla Bir Madencilik Havuzuna Katılma

## Giriş

Zcash (ZEC), madencilik için Equihash iş kanıtı algoritmasını kullanan, gizlilik odaklı bir kripto para birimidir. Zcash madenciliği, karmaşık matematiksel problemleri çözmek, işlemleri doğrulamak ve ağın güvenliğini sağlamak için hesaplama gücü kullanmayı; bunun karşılığında da ZEC ödülleri kazanmayı içerir. Ağın yüksek zorluk seviyesi nedeniyle, tek başına madencilik çoğu kullanıcı için önerilmez. Bir madencilik havuzuna katılmak, hash gücünüzü başkalarıyla birleştirerek düzenli ödüller kazanmanın en iyi yoludur.

Bu rehber, Zcash madenciliğine kişisel donanım kullanarak (örneğin GPU'lu bir ev bilgisayarı veya giriş seviyesi ASIC'ler) odaklanır. GPU'ların hâlâ Zcash madenciliği yapabildiğini unutmayın, ancak ağ zorluğu nedeniyle 2026'da ASIC'ler çok daha verimli ve kârlıdır. Elektrik maliyetleri, donanım fiyatları ve ZEC değeri gibi faktörler uygulanabilirliği etkilediğinden, WhatToMine.com gibi araçlarla güncel kârlılığı her zaman kontrol edin. Madencilik herkes için kârlı olmayabilir; yerel düzenlemeleri ve enerji tarifelerini araştırın (hedef < $0.08/kWh).


## Gereksinimler

### Donanım
- **GPU Madenciliği (Başlangıç Seviyesindekiler İçin Önerilen Kişisel Kurulum):**
  - En az 4GB VRAM'e sahip NVIDIA veya AMD GPU'lar (ör. NVIDIA GTX 1070, RTX 3060; AMD RX 580 veya daha iyisi).
  - Uyumlu bir anakart, yeterli güç kaynağı (birden fazla GPU için en az 750W) ve aşırı ısınmayı önlemek için iyi soğutma.
  - Daha iyi hash oranları için çoklu GPU rig'leri yaygındır (ör. 6x GPU, 1-2 kSol/s elde edebilir).
- **ASIC Madenciliği (Daha Verimli Ama Daha Yüksek Maliyetli):**
  - Bitmain Antminer Z15 (420 kSol/s) veya Innosilicon A9 (50 kSol/s) gibi Equihash uyumlu ASIC'ler.
  - Bunlar daha gürültülü, daha sıcak çalışır ve daha fazla güç tüketir (ör. 1500W+); özel alanlar için uygundur. Bitmain.com veya yeniden satıcılar (Blockware Mining) gibi güvenilir kaynaklardan satın alın.
- **Genel:** Kararlı internet, kurulum/izleme için bir bilgisayar. ASIC'ler ağa hakimdir (2026'da toplam ~13 GSol/s hash oranı), bu da GPU madenciliğini daha az rekabetçi hale getirir ama hobi amaçlı kullanıcılar için hâlâ mümkündür.

### Yazılım
- **İşletim Sistemi:** Windows 10/11, Linux (kararlılık için Ubuntu önerilir).
- **Madencilik Yazılımı:**
  - GPU'lar için: lolMiner (AMD/NVIDIA destekler), GMiner veya miniZ (NVIDIA odaklı). Resmî GitHub depolarından indirin (ör. github.com/Lolliedieb/lolMiner-releases).
  - ASIC'ler için: Üreticinin yerleşik firmware/panelini kullanın (ör. Bitmain'in web arayüzü).
- **Cüzdan:** Ödemeleri almak için bir Zcash cüzdanı. Önerilenler:
  - Shielded (özel): Zodl Wallet, Zingo (Mobil/Masaüstü) YWallet (mobil/masaüstü).
  - Transparent (daha kolay ama daha az özel): Edge Wallet, Zecwallet Lite.
  - [wallets](https://zechub.wiki/wallets) adresinden indirin. Havuz destekliyorsa gizlilik için shielded bir adres (`zs` ile başlar) oluşturun.

### Diğer
- Elektrik: Maliyetleri hesaplayın. GPU'lar kart başına 150-300W; ASIC'ler 1000W+ kullanır.
- Antivirüs: Kurulum sırasında devre dışı bırakın çünkü madencileri tehdit olarak işaretleyebilir.

## Bir Madencilik Havuzuna Katılmak İçin Adım Adım Rehber

### Adım 1: Zcash Cüzdanınızı Kurun
1. Resmî Zcash web sitesindeki [wallets](https://zechub.wiki/wallets) sayfasından bir cüzdan indirip kurun.
2. Yeni bir cüzdan oluşturun ve seed ifadenizi güvenli şekilde yedekleyin.
3. Bir alım adresi oluşturun (gizlilik için tercihen shielded). Not edin, ör. `zs1exampleaddress...`.
4. Transparent bir adres kullanıyorsanız (`t` ile başlar), bu daha basittir ama daha az gizlilik sağlar.

### Adım 2: Donanımınızı Hazırlayın
- GPU'lar için:
  1. GPU'ları bilgisayarınıza takın ve sürücüleri güncelleyin (NVIDIA: GeForce Experience; AMD: Radeon Software).
  2. Deneyimliyseniz overclock yapın (kararlılık için MSI Afterburner kullanın; verimlilik için +100-200 core clock, -500 memory hedefleyin).
- ASIC'ler için:
  1. ASIC'i elektriğe ve Ethernet'e bağlayın.
  2. Advanced IP Scanner veya üreticinin uygulaması gibi bir araç kullanarak IP adresini bulun.
  3. Web paneline erişin (ör. tarayıcıya IP'yi girin, varsayılan giriş: Bitmain için root/root).

**Uyarı:** Uygun havalandırma sağlayın; madencilik ısı üretir. Test etmek için küçük başlayın.

### Adım 3: Bir Madencilik Havuzu Seçin ve Katılın
Madencilik havuzları işi dağıtır ve ödülleri katkıda bulunduğunuz hash oranına göre paylaşır. Ücretlere (%0-2), minimum ödeme miktarına (0.01-0.1 ZEC), konuma (düşük ping) ve güvenilirliğe göre seçim yapın.

**Önerilen Havuzlar (Hash Oranı, Ücretler ve İncelemelere Göre):**
- **2Miners (zec.2miners.com)**: %1 ücret, PPLNS ödeme, GPU/ASIC/NiceHash destekler. Yüksek hash oranı (~1.17 GSol/s), güvenilir sunucular.
- **F2Pool (zec.f2pool.com)**: %2 ücret, PPS+ ödeme, çoklu coin desteği. Büyük havuz (~2.57 GSol/s).
- **ViaBTC (zec.viabtc.com)**: %2 ücret (PPS+), kullanıcı dostu panel, global sunucular.
- **AntPool (zec.antpool.com)**: %1 ücret, Bitmain'den, ASIC'ler için iyi (~494 MSol/s).
- **Foundry Zcash Pool (foundrydigital.com/foundry-zcash-pool/)**: Foundry Digital tarafından işletilen profesyonel bir Zcash madencilik havuzu. PPLNS ödeme kullanır, şeffaf ödül takibi ve kurumsal düzeyde destek sunar. Kurumsal ve büyük ölçekli ASIC madencileri için en uygunudur; hesap doğrulaması gerektirir.
- **Sovright (mining.sovright.com)**: Stratum V2 üzerine kurulu bir Zcash havuzu, şu anda herkese açık bir testnet olarak çalışıyor. Henüz canlı ZEC ödemeleri yok, bu yüzden bunu kazanç kaynağından ziyade kurulumunuzu test etmenin bir yolu olarak değerlendirin. Ayrıntılar için aşağıdaki özel bölüme bakın.
- Diğerleri: Kryptex Pool, Luxor (gerçek zamanlı istatistikler için poolwatch.io/coin/zcash adresini kontrol edin).

1. Havuzun web sitesini ziyaret edin ve bir hesap oluşturun (e-posta ile veya 2Miners gibi bazıları için kayıt gerektirmez).
2. Ödemeler için ayarlara Zcash cüzdan adresinizi ekleyin.
3. Havuzun stratum sunucusunu (ör. zec.2miners.com:1010) ve portunu not edin.

### Adım 4: Madencilik Yazılımını Kurun ve Yapılandırın
- GPU'lar için (Örnek: Windows/Linux'ta lolMiner):
  1. lolMiner'ı GitHub'dan indirin (en son sürüm, ör. 1.88).
  2. Bir klasöre çıkarın.
  3. Yapılandırma içeren bir batch dosyası (start.bat) oluşturun:
     ```
     lolMiner.exe --coin ZEC --pool zec.2miners.com:1010 --user YOUR_WALLET_ADDRESS.WORKER_NAME --pass x
     ```
     - `YOUR_WALLET_ADDRESS` kısmını ZEC adresinizle değiştirin.
     - `WORKER_NAME`: Rig'iniz için bir ad (ör. Rig1).
     - AB sunucuları için: eu.zec.2miners.com:1010.
  4. Batch dosyasını çalıştırın. Havuzla bağlantı kuracak ve madenciliğe başlayacaktır.
- ASIC'ler için (Örnek: Bitmain Antminer):
  1. Web paneline giriş yapın.
  2. Miner Configuration bölümüne gidin.
  3. Havuz ayrıntılarını ekleyin:
     - URL: stratum+tcp://zec.2miners.com:1010
     - Username: YOUR_WALLET_ADDRESS.WORKER_NAME
     - Password: x (veya boş).
  4. Kaydedin ve madenciyi yeniden başlatın.
- Diğer yazılımlar için (ör. GMiner):
  ```
  miner.exe --algo 125_4 --server zec.2miners.com:1010 --user YOUR_WALLET_ADDRESS.WORKER_NAME --pass x
  ```

**Test:** 10-15 dakika çalıştırın; kabul edilen share'ler ve hash oranı için konsolu kontrol edin.

### Adım 5: Madenciliğe Başlayın ve İzleyin
1. Madenciyi başlatın: havuza bağlanacak ve share göndermeye başlayacaktır.
2. Şunlar üzerinden izleyin:
   - Havuz paneli: Hash oranını, ödenmemiş bakiyeyi ve istatistikleri görmek için cüzdan adresinizi girin.
   - Yazılım konsolu: Hataları, sıcaklığı izleyin (80 santigrat derecenin altında tutun).
   - Araçlar: Uzaktan rig yönetimi için HiveOS veya SimpleMining OS kullanın.
3. Ödemeler: Çoğu havuz minimum seviyeye ulaştığınızda otomatik ödeme yapar (ör. 0.05 ZEC). Havuz kurallarını kontrol edin.

   
![Zcash Mining Monitoring Setup](/content-images/zcashMining-5ca0019c17.webp)


## Sovright: Testnet Havuzu ve Relay Ağı

Sovright (sovright.com), bir Stratum V2 madencilik havuzu ve ayrı bir blok relay ağı işletir. Farklı görevleri vardır, bu yüzden aşağıda ayrı ayrı ele alınmıştır.

### Madencilik Havuzu (mining.sovright.com)

Sovright'ın havuzu, mainnet'te değil, herkese açık bir Zcash testnet'inde (NU6, Stratum V2) çalışır. Testnet gerçek ZEC ödemez. Bunu, madencinizin yapılandırmasını test etmek için kullanın; kazanç elde etmek için değil.

- Başlamak için hesap gerekmez. Bir CPU veya ASIC Equihash madencisini havuza yönlendirin, share'leriniz canlı panelde görünür.
- Sovright ayrıca, yalnızca havuzun işlerini almak yerine kendi blok şablonlarını seçmek isteyen madenciler için açık kaynaklı bir Stratum V2 proxy de yayınlıyor:

### Foundry Zcash Pool İzleme

Foundry Zcash Pool kullanıcıları için:

- Madenci performansını Foundry havuz paneli üzerinden izleyin.
- Kontrol edin:
  - Aktif worker'lar
  - Bildirilen hash oranı
  - Kabul edilen share'ler
  - Tahmini ödüller
  - Ödeme durumu

Foundry bir PPLNS ödül modeli kullandığından, madencilik ödülleri yalnızca anlık hash oranına değil, havuzun ödül penceresi boyunca katkıda bulunulan share'lere bağlıdır.

Önerilen izleme uygulamaları:
- ASIC panelindeki hash oranını Foundry tarafından bildirilen hash oranıyla karşılaştırın.
- Reddedilen share'leri, stale share'leri veya bağlantı kararsızlığını inceleyin.
- Ağ bağlantısını kararlı tutun çünkü kesintiler gönderilen share'leri ve olası ödülleri azaltır.
  ```
  git clone https://github.com/sovright/mining-infra
  cd mining-infra
  cargo build --release -p sovright-v1-stratum-proxy
  ./target/release/sovright-v1-stratum-proxy --listen 0.0.0.0:3334 --upstream 34.28.134.13:3333
  ```
  Madencinizi doğrudan havuz yerine proxy'ye yönlendirin:
  ```
  stratum+tcp://<your-proxy-ip>:3334
  ```
  `yourname.rig1` gibi bir worker adı kullanarak.
- Sovright'ın şeffaflık sayfası, shielded işlemler için bazı havuzların yaptığı gibi filtreleme yapmak yerine "include all" politikası uyguladığını belirtir. Her blok, politikanın bağımsız olarak kontrol edilebilmesi için imzalı bir tasdik alır.
- Örnek panel verileri yerine kendi worker'larınızı takip etmek için mining.sovright.com adresinde bir hesap oluşturun (Google veya e-posta ile giriş).

### Relay Ağı (relay.sovright.com)

Sovright ayrıca Zcash mainnet üzerinde herkese açık bir blok relay ağı işletir. Bir havuz bir blok bulduğunda, bu bloğun ağın geri kalanına ne kadar hızlı ulaştığı, ne sıklıkla orphan olacağını belirler; yani yayılım yarışını kaybedip ödülün kaybolmasına neden olur. Relay, forward error correction ile compact block relay kullanarak blokları dört bölge arasında iletir.

Herkese açık panel etkiyi canlı olarak gösterir: relay'e bağlı bölgeler yeni blokları, düz eşler arası dedikodunun aldığının yarısından çok daha kısa sürede görür ve panel ağın canlı orphan oranını takip eder.

Bu, bireysel madenciler için değil, havuz operatörleri için bir altyapıdır. Sovright'ın açık kaynaklı `mining-infra` deposu, bulunan blokları yerel P2P'den daha hızlı şekilde mesh ağına yaymak için bir `submitblock` relay gateway belgelendirir. Bağlanmak için relay eş adresleri ve bir kimlik doğrulama anahtarı almak üzere doğrudan Sovright ile iletişime geçin (support@sovright.com).


## İpuçları ve En İyi Uygulamalar
- **Kârlılık:** whattomine.com/coins/166-zec-equihash gibi hesaplayıcıları kullanın. Örnek: Bir RTX 3060 (~300 Sol/s), $50/ZEC seviyesinde günde ~0.001 ZEC kazanır, bundan ~$0.50 elektrik düşülür.
- **Gizlilik:** Mümkünse shielded havuzlar kullanın; adresleri yeniden kullanmaktan kaçının.
- **Güvenlik:** Güçlü parolalar kullanın; havuzlarda/cüzdanlarda 2FA'yı etkinleştirin. Özel anahtarları asla paylaşmayın.
- **Sorun Giderme:** Hiç share yoksa güvenlik duvarını, antivirüsü veya yanlış yapılandırmayı kontrol edin. forum.zcashcommunity.com veya Reddit r/zec gibi forumlara katılın.
- **Alternatifler:** Kârlı değilse, bulut madenciliğini veya diğer coin'lerde staking yapmayı değerlendirin.
- **Çevresel Not:** Madencilik enerji tüketir; mümkünse yenilenebilir kaynaklar kullanın.
- **Güncellemeler:** Zcash gelişebilir (ör. olası PoS geçişi); haberler için z.cash adresini kontrol edin.
