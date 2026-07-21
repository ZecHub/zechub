# Zcash Madencilik Rehberi: Kişisel Donanımla Bir Madencilik Havuzuna Katılmak

## Giriş

Zcash (ZEC), madencilik için Equihash iş ispatı algoritmasını kullanan, gizliliğe odaklı bir kripto para birimidir. Zcash madenciliği, ZEC ödülleri karşılığında karmaşık matematiksel problemleri çözmek, işlemleri doğrulamak ve ağı güvence altına almak için hesaplama gücü kullanmayı içerir. Ağın yüksek zorluk seviyesi nedeniyle, tek başına madencilik çoğu kullanıcı için önerilmez. Bir madencilik havuzuna katılmak, hash gücünüzü başkalarıyla birleştirerek düzenli ödüller kazanmanın en iyi yoludur.

Bu rehber, Zcash’in kişisel donanım kullanılarak madenciliğine odaklanır (örneğin, GPU’lu bir ev bilgisayarı veya giriş seviyesi ASIC’ler). GPU’ların hâlâ Zcash madenciliği yapabildiğini, ancak ağ zorluğu nedeniyle 2026’da ASIC’lerin çok daha verimli ve kârlı olduğunu unutmayın. Elektrik maliyetleri, donanım fiyatları ve ZEC değeri gibi etkenler uygulanabilirliği etkilediğinden, kârlılığı her zaman WhatToMine.com gibi araçlarla kontrol edin. Madencilik herkes için kârlı olmayabilir; yerel düzenlemeleri ve enerji tarifelerini araştırın (hedef < $0.08/kWh).


## Gereksinimler

### Donanım
- **GPU Madenciliği (Başlangıç Seviyesi İçin Önerilen Kişisel Kurulum):**
  - En az 4GB VRAM’e sahip NVIDIA veya AMD GPU’lar (ör. NVIDIA GTX 1070, RTX 3060; AMD RX 580 veya daha iyisi).
  - Uyumlu bir anakart, yeterli PSU (birden fazla GPU için en az 750W) ve aşırı ısınmayı önlemek için iyi bir soğutma.
  - Daha iyi hash oranları için çoklu GPU rig’leri yaygındır (ör. 6x GPU, 1-2 kSol/s elde edebilir).
- **ASIC Madenciliği (Daha Verimli Ama Daha Yüksek Maliyetli):**
  - Bitmain Antminer Z15 (420 kSol/s) veya Innosilicon A9 (50 kSol/s) gibi Equihash uyumlu ASIC’ler.
  - Bunlar daha gürültülü, daha sıcak çalışır ve daha fazla güç tüketir (ör. 1500W+); özel alanlar için uygundur. Bitmain.com veya bayiler (Blockware Mining) gibi güvenilir kaynaklardan satın alın.
- **Genel:** Kurulum/izleme için stabil internet ve bir bilgisayar. ASIC’ler ağa hakimdir (2026’da toplam ~13 GSol/s hash oranı), bu da GPU madenciliğini daha az rekabetçi hâle getirir, ancak hobi amaçlı kullanıcılar için hâlâ mümkündür.

### Yazılım
- **İşletim Sistemi:** Windows 10/11, Linux (kararlılık için Ubuntu önerilir).
- **Madencilik Yazılımı:**
  - GPU’lar için: lolMiner (AMD/NVIDIA destekler), GMiner veya miniZ (NVIDIA odaklı). Resmî GitHub depolarından indirin (ör. github.com/Lolliedieb/lolMiner-releases).
  - ASIC’ler için: Üreticinin yerleşik firmware/dashboard arayüzünü kullanın (ör. Bitmain’in web arayüzü).
- **Cüzdan:** Ödemeleri almak için bir Zcash cüzdanı. Önerilenler:
  - Shielded (özel): Zashi Wallet, Zingo (Mobil/Masaüstü) YWallet (mobil/masaüstü).
  - Transparent (daha kolay ama daha az özel): Edge Wallet, Zecwallet Lite.
  - [wallets](https://zechub.wiki/wallets) adresinden indirin. Havuz destekliyorsa gizlilik için shielded bir adres (şöyle başlar: 'zs') oluşturun.

### Diğer
- Elektrik: Maliyetleri hesaplayın. GPU’lar kart başına 150-300W; ASIC’ler 1000W+ kullanır.
- Antivirüs: Kurulum sırasında devre dışı bırakın çünkü madencileri tehdit olarak işaretleyebilir.

## Bir Madencilik Havuzuna Katılmak İçin Adım Adım Rehber

### Adım 1: Zcash Cüzdanınızı Kurun
1. Resmî Zcash web sitesindeki [wallets](https://zechub.wiki/wallets) bağlantısından bir cüzdan indirip kurun.
2. Yeni bir cüzdan oluşturun ve seed ifadenizi güvenli bir şekilde yedekleyin.
3. Bir alıcı adres oluşturun (gizlilik için tercihen shielded). Not alın, ör. `zs1exampleaddress...`.
4. Transparent bir adres kullanıyorsanız ('t' ile başlar), daha basittir ama daha az gizlilik sağlar.

### Adım 2: Donanımınızı Hazırlayın
- GPU’lar için:
  1. GPU’ları bilgisayarınıza takın ve sürücüleri güncelleyin (NVIDIA: GeForce Experience; AMD: Radeon Software).
  2. Deneyimliyseniz overclock yapın (kararlılık için MSI Afterburner kullanın; verimlilik için +100-200 çekirdek saat hızı, -500 bellek hedefleyin).
- ASIC’ler için:
  1. ASIC’i güce ve Ethernet’e bağlayın.
  2. Advanced IP Scanner veya üreticinin uygulaması gibi bir araç kullanarak IP adresini bulun.
  3. Web dashboard’una erişin (ör. tarayıcıya IP girin, varsayılan giriş: Bitmain için root/root).

**Uyarı:** Uygun havalandırma sağladığınızdan emin olun; madencilik ısı üretir. Test etmek için küçük başlayın.

### Adım 3: Bir Madencilik Havuzu Seçin ve Katılın
Madencilik havuzları işi dağıtır ve katkıda bulunduğunuz hash oranına göre ödülleri paylaşır. Ücretler (%0-2), minimum ödeme (0.01-0.1 ZEC), konum (düşük ping) ve güvenilirliğe göre seçim yapın.

**Önerilen Havuzlar (Hash Oranı, Ücretler ve İncelemelere Göre):**
- **2Miners (zec.2miners.com)**: %1 ücret, PPLNS ödeme, GPU/ASIC/NiceHash destekler. Yüksek hash oranı (~1.17 GSol/s), güvenilir sunucular.
- **F2Pool (zec.f2pool.com)**: %2 ücret, PPS+ ödeme, çoklu coin desteği. Büyük havuz (~2.57 GSol/s).
- **ViaBTC (zec.viabtc.com)**: %2 ücret (PPS+), kullanıcı dostu dashboard, küresel sunucular.
- **AntPool (zec.antpool.com)**: %1 ücret, Bitmain tarafından, ASIC’ler için iyi (~494 MSol/s).
- Diğerleri: Kryptex Pool, Luxor (gerçek zamanlı istatistikler için poolwatch.io/coin/zcash adresini kontrol edin).

1. Havuzun web sitesini ziyaret edin ve bir hesap oluşturun (e-posta ile veya 2Miners gibi bazıları için kayıt gerektirmez).
2. Ödemeler için ayarlara Zcash cüzdan adresinizi ekleyin.
3. Havuzun stratum sunucusunu (ör. zec.2miners.com:1010) ve portunu not alın.

### Adım 4: Madencilik Yazılımını Kurun ve Yapılandırın
- GPU’lar için (Örnek: Windows/Linux’ta lolMiner):
  1. lolMiner’ı GitHub’dan indirin (en güncel sürüm, ör. 1.88).
  2. Bir klasöre çıkarın.
  3. Yapılandırma ile bir batch dosyası (start.bat) oluşturun:
     ```
     lolMiner.exe --coin ZEC --pool zec.2miners.com:1010 --user YOUR_WALLET_ADDRESS.WORKER_NAME --pass x
     ```
     - `YOUR_WALLET_ADDRESS` yerine ZEC adresinizi yazın.
     - `WORKER_NAME`: Rig’iniz için bir ad (ör. Rig1).
     - AB sunucuları için: eu.zec.2miners.com:1010.
  4. Batch dosyasını çalıştırın. Havuzla bağlantı kuracak ve madenciliğe başlayacaktır.
- ASIC’ler için (Örnek: Bitmain Antminer):
  1. Web dashboard’una giriş yapın.
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

**Test:** 10-15 dakika çalıştırın; accepted share’ler ve hash oranı için konsolu kontrol edin.

### Adım 5: Madenciliğe Başlayın ve İzleyin
1. Madenciyi başlatın: havuza bağlanacak ve share göndermeye başlayacaktır.
2. Şunlar üzerinden izleyin:
   - Havuz dashboard’u: Hash oranını, ödenmemiş bakiyeyi ve istatistikleri görmek için cüzdan adresinizi girin.
   - Yazılım konsolu: Hataları, sıcaklığı izleyin (80 derece C’nin altında tutun).
   - Araçlar: Uzaktan rig yönetimi için HiveOS veya SimpleMining OS kullanın.
3. Ödemeler: Çoğu havuz minimuma ulaştığınızda otomatik ödeme yapar (ör. 0.05 ZEC). Havuz kurallarını kontrol edin.

   
![Zcash Madencilik İzleme Kurulumu](https://raw.githubusercontent.com/ZecHub/zechub/aac601cf85076960d334f4c841867a646a5a2f29/assets/images/zcashMining.jpg)


## İpuçları ve En İyi Uygulamalar
- **Kârlılık:** whattomine.com/coins/166-zec-equihash gibi hesaplayıcıları kullanın. Örnek: Bir RTX 3060 (~300 Sol/s), $50/ZEC seviyesinde günde ~0.001 ZEC kazandırır, bunun üzerinden ~$0.50 elektrik düşülür.
- **Gizlilik:** Varsa shielded havuzları kullanın; adresleri yeniden kullanmaktan kaçının.
- **Güvenlik:** Güçlü parolalar kullanın; havuzlarda/cüzdanlarda 2FA’yı etkinleştirin. Özel anahtarlarınızı asla paylaşmayın.
- **Sorun Giderme:** Hiç share gelmiyorsa firewall, antivirüs veya yanlış yapılandırmayı kontrol edin. forum.zcashcommunity.com veya Reddit r/zec gibi forumlara katılın.
- **Alternatifler:** Kârlı değilse, cloud mining veya diğer coin’leri stake etmeyi değerlendirin.
- **Çevresel Not:** Madencilik enerji tüketir; mümkünse yenilenebilir kaynaklar kullanın.
- **Güncellemeler:** Zcash gelişebilir (ör. olası bir PoS geçişi); haberler için z.cash adresini kontrol edin.
