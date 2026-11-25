<a href="https://github.com/zechub/zechub/edit/main/site/Using_Zcash/Zcash_Mining_Guide.md" target="_blank">
  <img src="https://img.shields.io/badge/Edit-blue" alt="Sayfayı düzenle"/>
</a>

# Zcash Madencilik Rehberi: Kişisel Donanımla Bir Madencilik Havuzuna Katılma

> GPU’nuzu veya ASIC’inizi bir havuza yönlendirin, işi diğer madencilerle paylaşın ve tek başınıza bir blok bulmak için yıllarca beklemek yerine düzenli ZEC ödemeler alın.

## Kısaca

* Zcash, Equihash iş kanıtı kullanır. ASIC’ler ağa hâkimdir; bu nedenle GPU’lar çoğunlukla hobi amaçlı kullanım ve test içindir.
* Küçük sistemlerle tek başına madencilik yaparken blok bulmak nadirdir. Bir havuz, işlem gücünü birleştirir ve bulduğu her bloktan size pay öder.
* Üç şeye ihtiyacınız vardır: Ödemeler için bir Zcash cüzdan adresi, madencilik donanımı ve madencilik yazılımı (veya ASIC’in yerleşik gösterge paneli).
* Havuzlar ücret (%0-2 civarı), ödeme yöntemi (PPLNS, PPS+), minimum ödeme ve sunucu konumuna göre farklılık gösterir.
* Önce kârlılığı kontrol edin: Elektrik fiyatı, donanım maliyeti ve ZEC fiyatı madenciliğin kazanç sağlayıp sağlamayacağını belirler.
* İleri düzey seçenek: Kendi Zebra düğümünüzü çalıştırın ve onun `getblocktemplate` RPC’sine karşı madencilik yapın.

## Temel Açıklama

Madencilik, yeni Zcash bloklarının oluşturulma yöntemidir. Madenciler bir Equihash bulmacasını çözmek için yarışır; geçerli ilk çözüm bir sonraki bloğu ekler ve blok ödülünü kazandırır. Ne kadar fazla işlem gücü sağlarsanız kazanma sıklığınız o kadar artar; ancak bugünkü ağda tek bir ev tipi sistemin kendi başına kazanması neredeyse imkânsızdır.

Madencilik havuzu bu sorunu çözer. Havuz, her madenciye share adı verilen daha küçük iş parçaları verir. Kabul edilen her share, işlem gücü sağladığınızı kanıtlar. Havuzdaki herhangi biri bir blok bulduğunda ödül, share’lere göre bölüştürülür ve bakiyeniz havuzun minimum tutarını aştığında ödeme otomatik olarak yapılır.

Kurulum, aşağıda adım adım ele alınan beş bölümden oluşur:

1. Ödeme almak için bir cüzdan adresi.
2. Donanım: Bilgisayarda GPU’lar veya bir Equihash ASIC.
3. Bir havuz hesabı (veya kayıt gerektirmeyen havuzlarda yalnızca adresiniz).
4. Havuzun stratum sunucusuna yönlendirilen madencilik yazılımı; kullanıcı adı olarak `YOUR_ADDRESS.WORKER_NAME` kullanılır.
5. İzleme: Kabul edilen share’ler, işlem gücü, sıcaklık ve ödenmemiş bakiye.

## Giriş

Zcash (ZEC), madencilikte Equihash iş kanıtı algoritmasını kullanan, gizlilik odaklı bir kripto paradır. Zcash madenciliği; hesaplama gücüyle karmaşık matematik problemlerini çözmeyi, işlemleri doğrulamayı ve ağ güvenliğini sağlamayı, karşılığında ZEC ödülleri kazanmayı içerir. Ağın zorluk seviyesi yüksek olduğundan çoğu kullanıcı için tek başına madencilik önerilmez. İşlem gücünüzü başkalarınınkiyle birleştirerek düzenli ödüller kazanmanın en iyi yolu bir madencilik havuzuna katılmaktır.

Bu rehber, kişisel donanım kullanarak Zcash madenciliği yapmaya odaklanır (ör. GPU’lu ev bilgisayarı veya başlangıç seviyesi ASIC’ler). GPU’larla hâlâ Zcash madenciliği yapılabilse de ağ zorluğu nedeniyle 2026’da ASIC’ler çok daha verimli ve kârlıdır. Elektrik maliyetleri, donanım fiyatları ve ZEC değeri gibi etkenler uygulanabilirliği etkilediğinden WhatToMine.com gibi araçlarla güncel kârlılığı mutlaka kontrol edin. Madencilik herkes için kârlı olmayabilir; yerel mevzuatı ve enerji tarifelerini araştırın (hedefiniz < $0.08/kWh olsun).


## Gereksinimler

### Donanım
- **GPU ile Madencilik (Yeni Başlayanlar İçin Önerilen Kişisel Kurulum):**
  - En az 4GB VRAM’e sahip NVIDIA veya AMD GPU’lar (ör. NVIDIA GTX 1070, RTX 3060; AMD RX 580 veya daha iyisi).
  - Uyumlu bir anakart, yeterli bir güç kaynağı (birden fazla GPU için en az 750W) ve aşırı ısınmayı önleyecek iyi bir soğutma.
  - Daha yüksek işlem gücü için çok GPU’lu sistemler yaygındır (ör. 6x GPU ile 1-2 kSol/s elde edilebilir).
- **ASIC ile Madencilik (Daha Verimli Ancak Daha Maliyetli):**
  - Bitmain Antminer Z15 (420 kSol/s) veya Innosilicon A9 (50 kSol/s) gibi Equihash uyumlu ASIC’ler.
  - Bunlar daha gürültülü, daha sıcak çalışır ve daha fazla güç tüketir (ör. 1500W+); özel alanlarda kullanıma uygundur. Bitmain.com gibi güvenilir kaynaklardan veya yeniden satıcılardan (Blockware Mining) satın alın.
- **Genel:** Kararlı internet bağlantısı, kurulum/izleme için bir bilgisayar. ASIC’ler ağa hâkimdir (2026’da toplam işlem gücü yaklaşık 13 GSol/s); bu, GPU ile madenciliği daha az rekabetçi kılar ancak hobi amaçlı kullanım için hâlâ mümkündür.

### Yazılım
- **İşletim Sistemi:** Windows 10/11, Linux (kararlılık için Ubuntu önerilir).
- **Madencilik Yazılımı:**
  - GPU’lar için: lolMiner (AMD/NVIDIA desteği), GMiner veya miniZ (NVIDIA odaklı). Resmî GitHub depolarından indirin (ör. github.com/Lolliedieb/lolMiner-releases).
  - ASIC’ler için: Üreticinin yerleşik aygıt yazılımını/gösterge panelini kullanın (ör. Bitmain’in web arayüzü).
- **Cüzdan:** Ödeme almak için bir Zcash cüzdanı. Önerilenler:
  - Korumalı (özel): ZODL Wallet, Zingo (Mobil/Masaüstü), Zkool (mobil/masaüstü).
  - Şeffaf (daha kolay ancak daha az gizli): Edge Wallet.
  - [wallets](https://zechub.wiki/wallets) adresinden indirin. Havuz destekliyorsa gizlilik için korumalı bir adres oluşturun (‘zs’ ile başlar).

### Diğer
- Elektrik: Maliyetleri hesaplayın. GPU’lar kart başına 150-300W; ASIC’ler 1000W+ tüketir.
- Antivirüs: Kurulum sırasında devre dışı bırakın; madencilik yazılımlarını tehdit olarak işaretleyebilir.

## Madencilik Havuzuna Katılma Adımları

### 1. Adım: Zcash Cüzdanınızı Kurun
1. Resmî Zcash web sitesinden [wallets](https://zechub.wiki/wallets) bir cüzdan indirip kurun.
2. Yeni bir cüzdan oluşturun ve kurtarma ifadenizi güvenli bir şekilde yedekleyin.
3. Bir alım adresi oluşturun (gizlilik için tercihen korumalı). Örneğin `zs1exampleaddress...` adresini not edin.
4. Şeffaf bir adres kullanıyorsanız (‘t’ ile başlar), kullanımı daha kolaydır ancak gizliliği daha düşüktür.

### 2. Adım: Donanımınızı Hazırlayın
- GPU’lar için:
  1. GPU’ları bilgisayarınıza takın ve sürücüleri güncelleyin (NVIDIA: GeForce Experience; AMD: Radeon Software).
  2. Deneyimliyseniz hız aşırtma yapın (kararlılık için MSI Afterburner kullanın; verimlilik için çekirdek saat hızını +100-200, belleği -500 hedefleyin).
- ASIC’ler için:
  1. ASIC’i elektriğe ve Ethernet’e bağlayın.
  2. Advanced IP Scanner gibi bir araçla veya üreticinin uygulamasını kullanarak IP adresini bulun.
  3. Web gösterge paneline erişin (ör. tarayıcıya IP’yi girin; Bitmain için varsayılan giriş root/root).

**Uyarı:** Yeterli havalandırma olduğundan emin olun; madencilik ısı üretir. Test etmek için küçük başlayın.

### 3. Adım: Bir Madencilik Havuzu Seçin ve Katılın
Madencilik havuzları işi dağıtır ve ödülleri sağladığınız işlem gücüne göre paylaşır. Ücretlere (%0-2), minimum ödemeye (0.01-0.1 ZEC), konuma (düşük ping) ve güvenilirliğe göre seçim yapın.

**Önerilen Havuzlar (İşlem Gücü, Ücretler ve Değerlendirmelere Göre):**
- **2Miners (zec.2miners.com)**: %1 ücret, PPLNS ödeme yöntemi; GPU/ASIC/NiceHash desteği. Yüksek işlem gücü (~1.17 GSol/s), güvenilir sunucular.
- **F2Pool (zec.f2pool.com)**: %2 ücret, PPS+ ödeme yöntemi, çoklu coin desteği. Büyük havuz (~2.57 GSol/s).
- **ViaBTC (zec.viabtc.com)**: %2 ücret (PPS+), kullanımı kolay gösterge paneli, küresel sunucular.
- **AntPool (zec.antpool.com)**: %1 ücret, Bitmain tarafından işletilir; ASIC’ler için uygun (~494 MSol/s).
- **Foundry Zcash Pool (foundrydigital.com/foundry-zcash-pool/)**: Foundry Digital tarafından işletilen profesyonel Zcash madencilik havuzu. PPLNS ödemelerini kullanır; şeffaf ödül takibi ve kurumsal düzeyde destek sunar. Kurumsal ve büyük ölçekli ASIC madencileri için en uygunudur; hesap doğrulaması gerektirir.
- **Sovright (mining.sovright.com)**: Stratum V2 üzerine kurulu ve şu anda herkese açık bir test ağı olarak çalışan bir Zcash havuzudur. Henüz gerçek ZEC ödemeleri yoktur; bu nedenle kazanç kaynağı olarak değil, kurulumunuzu test etme yolu olarak değerlendirin. Ayrıntılar için aşağıdaki özel bölüme bakın.
- Diğerleri: Kryptex Pool, Luxor (gerçek zamanlı istatistikler için poolwatch.io/coin/zcash adresini kontrol edin).

1. Havuzun web sitesini ziyaret edin ve bir hesap oluşturun (e-posta ile veya 2Miners gibi bazı havuzlarda kayıt olmadan).
2. Ödeme ayarlarına Zcash cüzdan adresinizi ekleyin.
3. Havuzun stratum sunucusunu (ör. zec.2miners.com:1010) ve portunu not edin.

### 4. Adım: Madencilik Yazılımını Kurun ve Yapılandırın
- GPU’lar için (Örnek: Windows/Linux üzerinde lolMiner):
  1. lolMiner’ı GitHub adresinden indirin (en son sürüm, ör. 1.88).
  2. Bir klasöre çıkarın.
  3. Yapılandırmayı içeren bir toplu iş dosyası (start.bat) oluşturun:
     ```
     lolMiner.exe --coin ZEC --pool zec.2miners.com:1010 --user YOUR_WALLET_ADDRESS.WORKER_NAME --pass x
     ```
     - `YOUR_WALLET_ADDRESS` yerine kendi ZEC adresinizi yazın.
     - `WORKER_NAME`: Sisteminiz için bir ad (ör. Rig1).
     - AB sunucuları için: eu.zec.2miners.com:1010.
  4. Toplu iş dosyasını çalıştırın. Havuzla bağlantı kurup madenciliğe başlayacaktır.
- ASIC’ler için (Örnek: Bitmain Antminer):
  1. Web gösterge panelinde oturum açın.
  2. Miner Configuration bölümüne gidin.
  3. Havuz bilgilerini ekleyin:
     - URL: stratum+tcp://zec.2miners.com:1010
     - Kullanıcı adı: YOUR_WALLET_ADDRESS.WORKER_NAME
     - Parola: x (veya boş).
  4. Kaydedin ve madenciyi yeniden başlatın.
- Diğer yazılımlar için (ör. GMiner):
  ```
  miner.exe --algo 125_4 --server zec.2miners.com:1010 --user YOUR_WALLET_ADDRESS.WORKER_NAME --pass x
  ```

**Test:** 10-15 dakika çalıştırın; konsolda kabul edilen share’leri ve işlem gücünü kontrol edin.

### 5. Adım: Madenciliği Başlatın ve İzleyin
1. Madenciyi başlatın: Havuzla bağlantı kurup share göndermeye başlayacaktır.
2. Şu yollarla izleyin:
   - Havuz gösterge paneli: İşlem gücünü, ödenmemiş bakiyeyi ve istatistikleri görmek için cüzdan adresinizi girin.
   - Yazılım konsolu: Hataları ve sıcaklığı izleyin (80 derece C’nin altında tutun).
   - Araçlar: Sisteminizi uzaktan yönetmek için HiveOS veya SimpleMining OS kullanın.
3. Ödemeler: Çoğu havuz, minimum tutara ulaştığınızda ödemeyi otomatik yapar (ör. 0.05 ZEC). Havuz kurallarını kontrol edin.

   
![Zcash madencilik izleme kurulumu](/content-images/zcashMining-5ca0019c17.webp)


### Foundry Zcash Havuzunu İzleme

Foundry Zcash Havuzu kullanıcıları için:

- Madenci performansını Foundry havuz gösterge panelinden izleyin.
- Şunları kontrol edin:
  - Etkin çalışanlar
  - Bildirilen işlem gücü
  - Kabul edilen share’ler
  - Tahmini ödüller
  - Ödeme durumu

Foundry, PPLNS ödül modeli kullandığından madencilik ödülleri yalnızca anlık işlem gücüne değil, havuzun ödül dönemi boyunca sağlanan share’lere bağlıdır.

Önerilen izleme uygulamaları:
- ASIC gösterge panelindeki işlem gücünü Foundry tarafından bildirilen işlem gücüyle karşılaştırın.
- Reddedilen veya eski share’leri ya da bağlantı kararsızlığını araştırın.
- Kesintiler gönderilen share’leri ve olası ödülleri azalttığından ağ bağlantısını kararlı tutun.


## Sovright: Test Ağı Havuzu ve Aktarım Ağı

Sovright (sovright.com), bir Stratum V2 madencilik havuzu ve ayrı bir blok aktarım ağı işletir. Bunlar farklı işler yapar; bu nedenle aşağıda ayrı ayrı ele alınmıştır.

### Madencilik Havuzu (mining.sovright.com)

Sovright havuzu ana ağda değil, herkese açık bir Zcash test ağında çalışır (NU6, Stratum V2). Test ağı gerçek ZEC ödemesi yapmaz. Madenci yapılandırmanızı test etmek için kullanın; kazanç elde etmek için değil.

- Başlamak için hesap gerekmez. Bir CPU veya ASIC Equihash madencisini havuza yönlendirin; share’leriniz canlı gösterge panelinde görünür.
- Sovright ayrıca, havuzun işlerini olduğu gibi kabul etmek yerine kendi blok şablonlarını seçmek isteyen madenciler için açık kaynaklı bir Stratum V2 proxy’si yayımlar:

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
  `yourname.rig1` gibi bir çalışan adı kullanarak.
- Sovright şeffaflık sayfasında, korumalı işlemleri filtreleyen bazı havuzların aksine “tümünü dahil et” politikası belirtilir. Her blok için imzalı bir doğrulama belgesi oluşturulur; böylece politika bağımsız olarak denetlenebilir.
- Örnek gösterge panelindeki veriler yerine kendi çalışanlarınızı izlemek için mining.sovright.com adresinde hesap oluşturun (Google veya e-posta ile oturum açın).

### Aktarım Ağı (relay.sovright.com)

Sovright, Zcash ana ağında ayrıca herkese açık bir blok aktarım ağı işletir. Bir havuz blok bulduğunda, bloğun ağın geri kalanına ne kadar hızlı ulaştığı, bloğun ne sıklıkla geçersiz kaldığını belirler. Başka bir deyişle blok, yayılma yarışını kaybeder ve ödülü boşa gider. Aktarım ağı, ileri hata düzeltmeli kompakt blok aktarımı kullanarak blokları dört bölgeye iletir.

Herkese açık gösterge paneli bu etkiyi canlı olarak gösterir: Aktarım ağına bağlı bölgeler yeni blokları, sıradan eşler arası dedikodunun gerektirdiği sürenin yarısından çok daha kısa sürede görür; ayrıca gösterge paneli ağın canlı geçersiz blok oranını izler.

Bu altyapı bireysel madenciler için değil, havuz işletmecileri içindir. Sovright açık kaynaklı `mining-infra` deposu, bulunan blokları yerel P2P’den daha hızlı biçimde ağa dağıtmak için kullanılan bir `submitblock` aktarım ağ geçidini belgelendirir. Bağlanmak için aktarım eşlerinin adreslerini ve kimlik doğrulama anahtarını almak üzere doğrudan Sovright ile iletişime geçin (support@sovright.com).


## Kendi Zebra düğümünüze karşı madencilik

Yukarıdaki yöntemlerin tümünde madencinizi başka birinin havuzuna yönlendirirsiniz. Diğer seçenek, kendiniz bir düğüm çalıştırıp madencilik yazılımınızın ondan iş istemesini sağlamaktır. zcashd 18 Temmuz 2026’da durdurulduğundan, bu bölümde ele alınan düğüm [Zebra](/zcash-tech/zebra-full-node)’tir.

Zebra’ün rolü küçük ve özeldir: Blok şablonları oluşturur ve çözülen blokları RPC arayüzü üzerinden kabul eder. Hash hesaplamasını madencilik yazılımı yapar; birkaç madenci arasında ödül paylaşımı ise havuz yazılımının işidir. Tek başına madenciliğin bir blok bulup bulamayacağı ağın işlem gücündeki payınıza bağlıdır; bu bölüm bunu tahmin etmeye çalışmaz. Bu nedenle bu sayfanın girişinde çoğu kullanıcı için tek başına madencilik önerilmez.

Adımlar, 8 Ekim 2026 itibarıyla geçerli olan iki Zebra Book sayfasını izler: [Mining Zcash with Zebra](https://zebra.zfnd.org/user/mining.html) ve [Mining with Zebra in Docker](https://zebra.zfnd.org/user/mining-docker.html). Anahtar adları ve varsayılanlar sürümler arasında değiştiğinden, bunlara güvenmeden önce Book’u kontrol edin.

### Ödülü alacak adresi ayarlayın

Varsayılan ayarlarla bir yapılandırma dosyası oluşturun, ardından düzenleyin:

```bash
mkdir -p ~/.config
zebrad generate -o ~/.config/zebrad.toml
```

Bir madenci adresi gerekir ([Book: Miner address](https://zebra.zfnd.org/user/mining.html#miner-address)):

```toml
[mining]
miner_address = "YOUR_ADDRESS"
```

Zebra şeffaf bir P2PKH veya P2SH adresini, bir Sapling adresini ya da Birleşik Adresi kabul eder. Birden fazla alıcısı olan Birleşik Adres için Book, Zebra’ın tek bir alıcıya ödeme yaptığını ve “önce Orchard, ardından Sapling, sonra şeffaf alıcıyı tercih ettiğini” belirtir.

Aynı `[mining]` bölümüne iki isteğe bağlı anahtar eklenir:

| Anahtar | İşlevi | Sınır |
|---|---|---|
| `extra_coinbase_data` | Madencilik yaptığınız her bloğun coinbase girdisine, Zebra’ün kendi işaretinden sonra havuz adı gibi herkese açık bir etiket ekler ([Book](https://zebra.zfnd.org/user/mining.html#extra-coinbase-data)) | 86 bayt. Bu sınır aşılırsa “Zebra başlatmayı reddeder” |
| `miner_memo` | Ödül çıktısına korumalı bir memo ekler. `extra_coinbase_data`’ın aksine herkese açık değildir: Yalnızca alıcı adresin görüntüleme anahtarına sahip biri okuyabilir ([Book](https://zebra.zfnd.org/user/mining.html#miner-memo)) | 512 bayt. Yalnızca ödül korumalı bir alıcıya gönderildiğinde çalışır. Şeffaf adres kullanıldığında “sessizce etkisiz kalır” |

### RPC portunu açın

Madencilik yazılımı Zebra ile JSON-RPC üzerinden iletişim kurar. Dinleneceği bir adres belirtmediğiniz sürece bu özellik kapalıdır ([Book: RPC section](https://zebra.zfnd.org/user/mining.html#rpc-section)):

```toml
[rpc]
listen_addr = "127.0.0.1:8232"
```

8232, ana ağdaki standart RPC portudur. `127.0.0.1` portu yalnızca aynı makineden erişilebilir durumda tutar.

Zebra 2.0.0 sürümünden itibaren RPC portu, zcashd’ün kullandığına benzer bir yöntem olan çerezle korunur. RPC uç noktası başladığında Zebra çerezi yazar ve kapanırken siler. Varsayılan olarak dosya Zebra’ün önbellek dizininde bulunur; örneğin Linux üzerinde `/home/user/.cache/zebra/.cookie` konumundadır ve tek satır içerir:

```text
__cookie__:PASSWORD
```

`rpc.cookie_dir` dosyanın konumunu değiştirir. `rpc.enable_cookie_auth = false` denetimi ve bununla birlikte RPC portundaki tek kimlik doğrulama yöntemini devre dışı bırakır: Bu durumda porta erişebilen herkes çağrı yapabilir.

### Zebra’i başlatın ve eşitlenmesini bekleyin

```bash
zebrad
```

Zebra yapılandırmayı varsayılan konumdan okur. Başka bir dosya kullanmak için `-c /path/to/zebrad.toml` parametresini iletin. Eşitlemenin bitmesini bekleyin. Tamamlandığında günlükte `sync_percent=100.000%` görünür ([Book: Running zebra](https://zebra.zfnd.org/user/mining.html#running-zebra)). [Zebra Full Node](/zcash-tech/zebra-full-node) donanımı ve disk alanını ele alır.

### getblocktemplate ile kontrol edin

`getblocktemplate`, madencilik yazılımının iş almak için yaptığı çağrıdır; bu nedenle aynı zamanda en hızlı test yöntemidir ([Book: Testing the setup](https://zebra.zfnd.org/user/mining.html#testing-the-setup)). Çerez dosyanızın içeriğini `__cookie__:PASSWORD` yerine koyun:

```bash
curl --silent --data-binary '{"jsonrpc": "1.0", "id":"curltest", "method": "getblocktemplate", "params": [] }' -H 'Content-type: application/json' http://__cookie__:PASSWORD@127.0.0.1:8232/ | jq
```

Çalışan bir kurulum, madencinin ihtiyaç duyduğu alanları içeren bir `result` nesnesi döndürür. Bunlar arasında `previousblockhash`, `coinbasetxn`, `target` ve `height` bulunur. `extra_coinbase_data` ayarladıysanız Book, etiketinizi `coinbasetxn.data` içinde nasıl bulacağınızı açıklar.

### Madencilik yazılımınızı yönlendirin

Madencilik veya havuz yazılımınıza RPC uç noktasını, `127.0.0.1:8232` değerini ve çerezdeki kullanıcı adı ile parolayı verin. Book, Zebra’ın “çoğu madencilik havuzu yazılımını çalıştırmak için gereken RPC yöntemlerini desteklediğini” belirtir ([Book: Run a mining pool](https://zebra.zfnd.org/user/mining.html#run-a-mining-pool)).

Yazılım seçmeden önce Book’tan iki not:

- **s-nomp yalnızca test içindir.** Book, s-nomp kurulumunu “deneysel” olarak tanımlar ve s-nomp’un “NU5 ile uyumlu olmadığını, bu nedenle bazı madencilik işlevlerinin devre dışı bırakıldığını” söyler. [Testnet guide](https://zebra.zfnd.org/user/mining-testnet-s-nomp.html) ayrıca s-nomp’un “NU5 veya sonraki ağ yükseltmeleri için resmî olarak güncellenmediğini” belirtir ve üretim ortamındaki madencileri güncel yükseltmeleri destekleyen havuz yazılımlarına yönlendirir.
- **Zebra kullanıma hazır bir yazılım yığını sunar.** Zebra deposundaki [`docker/mining/`](https://github.com/ZcashFoundation/zebra/tree/main/docker/mining) konumunda bir Docker Compose kurulumu vardır. Bu kurulum Zebra’i bir madencilik havuzuyla ve isterseniz CPU madencisiyle birlikte başlatır. İçindeki havuz s-nomp’tur ve değiştirmediğiniz sürece Testnet’te başlar; bu nedenle bileşenlerin nasıl çalıştığını öğrenmek için kullanın.

### Docker yöntemi

Book’taki en kısa yol, adres ve RPC portu ortam değişkenleri olarak iletilen `zfnd/zebra` Docker imajıdır ([Book: Mining with Zebra in Docker](https://zebra.zfnd.org/user/mining-docker.html)). Aşağıdaki komut, Book’taki komutun tek bir değişiklik yapılmış hâlidir: RPC portunu yalnızca ana makinenin loopback adresinde yayımlar; böylece başka makineler porta erişemez.

```bash
docker run -d --name zebra_local \
  -e ZEBRA_MINING__MINER_ADDRESS="YOUR_ADDRESS" \
  -e ZEBRA_RPC__LISTEN_ADDR=0.0.0.0:8232 \
  -p 8233:8233 \
  -p 127.0.0.1:8232:8232 \
  -v zebrad-cache:/home/zebra/.cache/zebra \
  zfnd/zebra:latest
```

Bu komut bir ana ağ düğümü başlatır, P2P portunu (8233) Docker ana makinesinde yayımlar ve RPC portunu (8232) yalnızca ana makinenin kendisinden erişilebilir kılar. Çerezi şu komutla yazdırın:

```bash
docker exec -it zebra_local cat /home/zebra/.cache/zebra/.cookie
```

- **`0.0.0.0`’ü `ZEBRA_RPC__LISTEN_ADDR` içinde tutun.** Bu, Zebra’ün kapsayıcı içinde dinlediği adrestir. Docker yayımlanan bir portu kapsayıcının kendi ağ arayüzüne yönlendirir; bu nedenle kapsayıcı içinde `127.0.0.1` üzerinde dinleyen bir Zebra, ana makineden gelenler dâhil, bağlantıları alamaz. `-p` önündeki `127.0.0.1:` portu ağdan uzak tutar.
- **Book’taki komut**, RPC portunu `-p 8232:8232` ile yayımlar; bu da portu ana makinenin tüm ağ arayüzlerinde açar.
- **Testnet’te denemek için** `-e ZEBRA_NETWORK__NETWORK="Testnet"` ekleyin, `ZEBRA_RPC__LISTEN_ADDR=0.0.0.0:18232` ayarlayın, `-p 18233:18233` ve `-p 127.0.0.1:18232:18232` portlarını yayımlayın ve bir Testnet adresi girin. Ana ağ adresi Zebra’ün Testnet’te başlamasını engeller; bunun tersi de geçerlidir.

Madencilere ödeme yapmak ve cüzdanı yönetmek bu bölümün kapsamı dışındadır. Cüzdan tarafı için [Zallet](/zcash-tech/zallet) bölümüne bakın.

## İpuçları ve En İyi Uygulamalar
- **Kârlılık:** whattomine.com/coins/166-zec-equihash gibi hesaplayıcılar kullanın. Örnek: Bir RTX 3060 (~300 Sol/s), 50 $/ZEC fiyat üzerinden günde ~0,001 ZEC kazandırır; elektrik için ~0,50 $ düşülür.
- **Gizlilik:** Varsa korumalı havuzları kullanın; adresleri tekrar kullanmaktan kaçının.
- **Güvenlik:** Güçlü parolalar kullanın; havuzlarda/cüzdanlarda 2FA’yı etkinleştirin. Özel anahtarlarınızı asla paylaşmayın.
- **Sorun Giderme:** Havuz payı gelmiyorsa güvenlik duvarını, antivirüsü veya yanlış yapılandırmayı kontrol edin. Bu konuda forum.zcashcommunity.com ya da Reddit r/zec gibi forumlardan yardım alın.
- **Alternatifler:** Kârlı değilse bulut madenciliğini veya diğer coin’lerde staking’i değerlendirin.
- **Çevresel Not:** Madencilik enerji tüketir; mümkünse yenilenebilir kaynakları kullanın.
- **Güncellemeler:** Zcash değişebilir (ör. olası PoS geçişi); haberler için z.cash adresini kontrol edin.
