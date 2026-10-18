# Zcash Madencilik Rehberi: Kişisel Donanımla Bir Madencilik Havuzuna Katılma

## Giriş

Zcash (ZEC), madencilik için Equihash iş ispatı algoritmasını kullanan gizlilik odaklı bir kripto para birimidir. Zcash madenciliği; karmaşık matematiksel problemleri çözmek, işlemleri doğrulamak ve ZEC ödülleri karşılığında ağı güvence altına almak için hesaplama gücü kullanmayı içerir. Ağın yüksek zorluğu nedeniyle, solo madencilik çoğu kullanıcı için önerilmez. Madencilik havuzuna katılmak, hash gücünüzü diğerlerininkiyle birleştirerek düzenli ödüller kazanmanın en iyi yoludur.

Bu rehber, kişisel donanım kullanarak (ör. GPU'lu bir ev bilgisayarı veya giriş seviyesi ASIC'ler) Zcash madenciliğine odaklanır. GPU'ların hâlâ Zcash madenciliği yapabildiğini, ancak ağ zorluğu nedeniyle ASIC'lerin 2026'da çok daha verimli ve kârlı olduğunu unutmayın. Elektrik maliyetleri, donanım fiyatları ve ZEC değeri uygulanabilirliği etkilediğinden, WhatToMine.com gibi araçları kullanarak güncel kârlılığı her zaman kontrol edin. Madencilik herkes için kârlı olmayabilir; yerel düzenlemeleri ve enerji tarifelerini araştırın (hedef: < $0.08/kWh).


## Gereksinimler

### Donanım
- **GPU Madenciliği (Yeni Başlayanlar İçin Önerilen Kişisel Kurulum):**
  - En az 4 GB VRAM'e sahip NVIDIA veya AMD GPU'lar (ör. NVIDIA GTX 1070, RTX 3060; AMD RX 580 veya üzeri).
  - Uyumlu bir anakart, yeterli PSU (birden çok GPU için en az 750 W) ve aşırı ısınmayı önlemek için iyi soğutma.
  - Daha iyi hash oranları için çoklu GPU rig'leri yaygındır (ör. 6x GPU 1-2 kSol/s elde edebilir).
- **ASIC Madenciliği (Daha Verimli Ancak Daha Maliyetli):**
  - Bitmain Antminer Z15 (420 kSol/s) veya Innosilicon A9 (50 kSol/s) gibi Equihash uyumlu ASIC'ler.
  - Bunlar daha gürültülü, daha sıcak ve daha fazla güç tüketir (ör. 1500 W+); özel alanlar için uygundur. Bitmain.com veya satıcılar (Blockware Mining) gibi güvenilir kaynaklardan satın alın.
- **Genel:** Kararlı internet, kurulum/izleme için bir bilgisayar. ASIC'ler ağa hakimdir (2026'da toplam hash oranı ~13 GSol/s); bu durum GPU madenciliğini daha az rekabetçi kılar, ancak hobiciler için hâlâ mümkündür.

### Yazılım
- **İşletim Sistemi:** Windows 10/11, Linux (kararlılık için Ubuntu önerilir).
- **Madencilik Yazılımı:**
  - GPU'lar için: lolMiner (AMD/NVIDIA destekler), GMiner veya miniZ (NVIDIA odaklı). Resmî GitHub depolarından indirin (ör. github.com/Lolliedieb/lolMiner-releases).
  - ASIC'ler için: Üreticinin yerleşik bellenimini/panosunu kullanın (ör. Bitmain'in web arayüzü).
- **Cüzdan:** Ödemeleri almak için bir Zcash cüzdanı. Önerilenler:
  - Korumalı (gizli): ZODL Wallet, Zingo (Mobil/Masaüstü), Zkool (mobil/masaüstü).
  - Şeffaf (daha kolay ancak daha az gizli): Edge Wallet, Zecwallet Lite.
  - [wallets](https://zechub.wiki/wallets) adresinden indirin. Havuz destekliyorsa gizlilik için korumalı bir adres (şununla başlar: 'zs') oluşturun.

### Diğer
- Elektrik: Maliyetleri hesaplayın. GPU'lar kart başına 150-300 W; ASIC'ler 1000 W+ kullanır.
- Antivirüs: Madencileri tehdit olarak işaretleyebileceğinden kurulum sırasında devre dışı bırakın.

## Bir Madencilik Havuzuna Katılmak İçin Adım Adım Rehber

### Adım 1: Zcash Cüzdanınızı Kurun
1. Resmî Zcash web sitesi [wallets](https://zechub.wiki/wallets) üzerinden bir cüzdan indirin ve kurun.
2. Yeni bir cüzdan oluşturun ve seed ifadenizi güvenli biçimde yedekleyin.
3. Bir alıcı adresi oluşturun (gizlilik için tercihen korumalı). Örneğin, `zs1exampleaddress...` şeklinde not edin.
4. Şeffaf bir adres (şununla başlar: 't') kullanıyorsanız daha basittir ancak daha az gizlilik sunar.

### Adım 2: Donanımınızı Hazırlayın
- GPU'lar için:
  1. GPU'ları bilgisayarınıza takın ve sürücüleri güncelleyin (NVIDIA: GeForce Experience; AMD: Radeon Software).
  2. Deneyimliyseniz hız aşırtma yapın (kararlılık için MSI Afterburner kullanın; verimlilik için +100-200 çekirdek saati, -500 bellek hedefleyin).
- ASIC'ler için:
  1. ASIC'i güce ve Ethernet'e bağlayın.
  2. Advanced IP Scanner gibi bir araçla veya üreticinin uygulamasıyla IP adresini bulun.
  3. Web panosuna erişin (ör. tarayıcıya IP'yi girin, varsayılan giriş: Bitmain için root/root).

**Uyarı:** Uygun havalandırma sağlayın; madencilik ısı üretir. Test etmek için küçük başlayın.

### Adım 3: Bir Madencilik Havuzu Seçin ve Katılın
Madencilik havuzları işi dağıtır ve ödülleri katkıda bulunduğunuz hash oranına göre paylaşır. Ücretlere (%0-2), minimum ödeme tutarına (0.01-0.1 ZEC), konuma (düşük ping) ve güvenilirliğe göre seçim yapın.

**Önerilen Havuzlar (Hash Oranı, Ücretler ve İncelemelere Göre):**
- **2Miners (zec.2miners.com)**: %1 ücret, PPLNS ödeme, GPU/ASIC/NiceHash desteği. Yüksek hash oranı (~1.17 GSol/s), güvenilir sunucular.
- **F2Pool (zec.f2pool.com)**: %2 ücret, PPS+ ödeme, çoklu coin desteği. Büyük havuz (~2.57 GSol/s).
- **ViaBTC (zec.viabtc.com)**: %2 ücret (PPS+), kullanıcı dostu pano, küresel sunucular.
- **AntPool (zec.antpool.com)**: %1 ücret, Bitmain'den, ASIC'ler için iyi (~494 MSol/s).
- **Foundry Zcash Pool (foundrydigital.com/foundry-zcash-pool/)**: Foundry Digital tarafından sunulan profesyonel Zcash madencilik havuzu. PPLNS ödemeleri kullanır, şeffaf ödül takibi ve kurumsal düzeyde destek sunar. Kurumsal ve büyük ölçekli ASIC madencileri için en uygunudur; hesap doğrulaması gerektirir.
- **Sovright (mining.sovright.com)**: Stratum V2 üzerine kurulu bir Zcash havuzu, şu anda herkese açık testnet olarak çalışmaktadır. Henüz canlı ZEC ödemesi yoktur; bu nedenle bir kazanç kaynağı yerine kurulumunuzu test etmenin yolu olarak değerlendirin. Ayrıntılar için aşağıdaki özel bölüme bakın.
- Diğerleri: Kryptex Pool, Luxor (gerçek zamanlı istatistikler için poolwatch.io/coin/zcash adresine bakın).

1. Havuzun web sitesini ziyaret edin ve bir hesap oluşturun (2Miners gibi bazıları için e-posta veya kayıt gerekmez).
2. Ödemeler için ayarlardan Zcash cüzdan adresinizi ekleyin.
3. Havuzun stratum sunucusunu (ör. zec.2miners.com:1010) ve portunu not edin.

### Adım 4: Madencilik Yazılımını Kurun ve Yapılandırın
- GPU'lar için (Örnek: Windows/Linux üzerinde lolMiner):
  1. lolMiner'ı GitHub adresinden indirin (en son sürüm, ör. 1.88).
  2. Bir klasöre çıkarın.
  3. Yapılandırma içeren bir toplu iş dosyası (start.bat) oluşturun:
     ```
     lolMiner.exe --coin ZEC --pool zec.2miners.com:1010 --user YOUR_WALLET_ADDRESS.WORKER_NAME --pass x
     ```
     - `YOUR_WALLET_ADDRESS` ifadesini ZEC adresinizle değiştirin.
     - `WORKER_NAME`: Rig'iniz için bir ad (ör. Rig1).
     - AB sunucuları için: eu.zec.2miners.com:1010.
  4. Toplu iş dosyasını çalıştırın. Havuzla bağlantı kuracak ve madenciliğe başlayacaktır.
- ASIC'ler için (Örnek: Bitmain Antminer):
  1. Web panosunda oturum açın.
  2. Miner Configuration bölümüne gidin.
  3. Havuz ayrıntılarını ekleyin:
     - URL: stratum+tcp://zec.2miners.com:1010
     - Kullanıcı adı: YOUR_WALLET_ADDRESS.WORKER_NAME
     - Parola: x (veya boş).
  4. Kaydedin ve madenciyi yeniden başlatın.
- Diğer yazılımlar için (ör. GMiner):
  ```
  miner.exe --algo 125_4 --server zec.2miners.com:1010 --user YOUR_WALLET_ADDRESS.WORKER_NAME --pass x
  ```

**Test:** 10-15 dakika çalıştırın; kabul edilen paylar ve hash oranı için konsolu kontrol edin.

### Adım 5: Madenciliği Başlatın ve İzleyin
1. Madenciyi başlatın: havuza bağlanacak ve pay göndermeye başlayacaktır.
2. Şunlar aracılığıyla izleyin:
   - Havuz panosu: Hash oranını, ödenmemiş bakiyeyi ve istatistikleri görmek için cüzdan adresinizi girin.
   - Yazılım konsolu: Hataları, sıcaklığı izleyin (80 derece C'nin altında tutun).
   - Araçlar: Uzaktan rig yönetimi için HiveOS veya SimpleMining OS kullanın.
3. Ödemeler: Çoğu havuz minimum tutara ulaştığınızda otomatik ödeme yapar (ör. 0.05 ZEC). Havuz kurallarını kontrol edin.

   
![Zcash Mining Monitoring Setup](/content-images/zcashMining-5ca0019c17.webp)


## Sovright: Testnet Havuzu ve Aktarım Ağı

Sovright (sovright.com), bir Stratum V2 madencilik havuzu ve ayrı bir blok aktarım ağı işletir. Farklı işleri vardır, bu yüzden aşağıda ayrı ayrı ele alınmıştır.

### Madencilik Havuzu (mining.sovright.com)

Sovright'nin havuzu, mainnet üzerinde değil, herkese açık bir Zcash testnet'inde (NU6, Stratum V2) çalışır. Testnet gerçek ZEC ödemesi yapmaz. Bunu kazanç elde etmek için değil, madenci yapılandırmanızı test etmek için kullanın.

- Başlamak için hesap gerekmez. Bir CPU veya ASIC Equihash madencisini havuza yönlendirin; paylarınız canlı panoda görünür.
- Sovright ayrıca, yalnızca havuzun işlerini almak yerine kendi blok şablonlarını seçmek isteyen madenciler için açık kaynaklı bir Stratum V2 proxy yayımlar:

### Foundry Zcash Pool İzleme

Foundry Zcash Pool kullanıcıları için:

- Madenci performansını Foundry havuz panosu üzerinden izleyin.
- Şunları kontrol edin:
  - Etkin işçiler
  - Bildirilen hash oranı
  - Kabul edilen paylar
  - Tahmini ödüller
  - Ödeme durumu

Foundry PPLNS ödül modeli kullandığından, madencilik ödülleri yalnızca anlık hash oranına değil, havuzun ödül penceresi boyunca katkıda bulunulan paylara bağlıdır.

Önerilen izleme uygulamaları:
- ASIC pano hash oranını Foundry tarafından bildirilen hash oranıyla karşılaştırın.
- Reddedilen payları, bayat payları veya bağlantı kararsızlığını inceleyin.
- Kesintiler gönderilen payları ve olası ödülleri azalttığından, kararlı ağ bağlantısını koruyun.
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
  `yourname.rig1` gibi bir işçi adı kullanarak.
- Sovright'nin şeffaflık sayfası, korumalı işlemleri filtreleyen bazı havuzların aksine, korumalı işlemler için "hepsini dahil et" politikasını belirtir. Her blok, politikanın bağımsız olarak kontrol edilebilmesi için imzalı bir tasdik alır.
- Örnek pano verileri yerine kendi işçilerinizi takip etmek için mining.sovright.com üzerinde bir hesap oluşturun (Google veya e-posta ile giriş).

### Aktarım Ağı (relay.sovright.com)

Sovright ayrıca Zcash mainnet üzerinde herkese açık bir blok aktarım ağı işletir. Bir havuz blok bulduğunda, bu bloğun ağın geri kalanına ne kadar hızlı ulaştığı ne sıklıkla yetim kaldığını belirler; yani yayılım yarışını kaybeder ve buna ait ödül kaybedilir. Aktarım, ileri hata düzeltmeli kompakt blok aktarımı kullanarak blokları dört bölge arasında iletir.

Herkese açık pano etkisini canlı gösterir: aktarıma bağlı bölgeler yeni blokları, düz eşten eşe dedikodunun aldığı sürenin yarısından çok daha kısa sürede görür ve pano ağın canlı yetim oranını takip eder.

Bu, bireysel madenciler için değil, havuz operatörleri için altyapıdır. Sovright'nin açık kaynaklı `mining-infra` deposu, bulunan blokları yerel P2P'den daha hızlı bir şekilde mesh ağa yaymak için bir `submitblock` aktarım ağ geçidini belgeler. Bağlanmak için aktarım eş adresleri ve bir kimlik doğrulama anahtarı almak üzere doğrudan Sovright ile iletişime geçin (support@sovright.com).


## Kendi Zebra düğümünüze karşı madencilik

Yukarıdaki her şey madencinizi başka birinin havuzuna yönlendirir. Diğer yol ise bir düğümü kendiniz çalıştırmak ve madencilik yazılımınızın ondan iş istemesini sağlamaktır. zcashd 18 Temmuz 2026'da durduğundan, bu, bu bölümün ele aldığı düğüm olan [Zebra](/zcash-tech/zebra-full-node) anlamına gelir.

Zebra'nin görevi küçük ve özeldir: blok şablonları oluşturur ve RPC arayüzü üzerinden çözülmüş blokları kabul eder. Hash işlemi madencilik yazılımı tarafından yapılır ve ödüllerin birden fazla madenci arasında paylaşılması havuz yazılımının işidir. Tek başına madenciliğin bir blok bulup bulamayacağı, bu bölümün tahmin etmeye çalışmadığı ağ hash oranındaki payınıza bağlıdır. Bu nedenle bu sayfanın girişi, çoğu kullanıcı için solo madenciliği önermez.

Adımlar, 8 Ekim 2026 itibarıyla iki Zebra Book sayfasını, [Mining Zcash with Zebra](https://zebra.zfnd.org/user/mining.html) ve [Mining with Zebra in Docker](https://zebra.zfnd.org/user/mining-docker.html) sayfalarını izler. Anahtar adları ve varsayılanlar sürümler arasında değişir; bu nedenle birine güvenmeden önce Book'u kontrol edin.

### Ödülü alan adresi ayarlayın

Varsayılan ayarlarla bir yapılandırma dosyası oluşturun, ardından düzenleyin:

```bash
mkdir -p ~/.config
zebrad generate -o ~/.config/zebrad.toml
```

Bir madenci adresi gereklidir ([Book: Miner address](https://zebra.zfnd.org/user/mining.html#miner-address)):

```toml
[mining]
miner_address = "YOUR_ADDRESS"
```

Zebra şeffaf bir P2PKH veya P2SH adresini, bir Sapling adresini ya da bir Unified Address kabul eder. Birden fazla alıcısı olan bir Unified Address için Book, Zebra'nin tek bir alıcıya ödeme yaptığını, "önce Orchard, sonra Sapling, ardından şeffaf"ı tercih ettiğini söyler.

Aynı `[mining]` bölümüne iki isteğe bağlı anahtar eklenir:

| Anahtar | Ne yapar | Sınır |
|---|---|---|
| `extra_coinbase_data` | Madenciliğini yaptığınız her bloğun coinbase girdisine, Zebra'nin kendi işaretçisinden ([Book](https://zebra.zfnd.org/user/mining.html#extra-coinbase-data)) sonra havuz adı gibi herkese açık bir etiket ekler | 86 bayt. Bunun üzerinde, "Zebra başlamayı reddeder" |
| `miner_memo` | Ödül çıktısına korumalı bir not ekler. `extra_coinbase_data`'nin aksine herkese açık değildir: yalnızca alıcı adresin görüntüleme anahtarına sahip biri onu okuyabilir ([Book](https://zebra.zfnd.org/user/mining.html#miner-memo)) | 512 bayt. Yalnızca ödül korumalı bir alıcıya gittiğinde çalışır. Şeffaf bir adresle "sessizce etkisiz kalır" |

### RPC portunu açın

Madencilik yazılımı Zebra ile JSON-RPC üzerinden konuşur; dinlemesi için bir adres vermediğiniz sürece kapalı kalır ([Book: RPC section](https://zebra.zfnd.org/user/mining.html#rpc-section)):

```toml
[rpc]
listen_addr = "127.0.0.1:8232"
```

8232, Mainnet'teki standart RPC portudur. `127.0.0.1` portu yalnızca aynı makineden erişilebilir tutar.

Zebra 2.0.0'dan beri bir çerez, RPC portunu zcashd'nin kullandığına benzer bir yöntemle korur. Zebra, RPC uç noktası başladığında çerezi yazar ve kapatılırken siler. Varsayılan olarak dosya Zebra'nin önbellek dizininde bulunur; örneğin Linux üzerinde `/home/user/.cache/zebra/.cookie`, ve tek bir satır içerir:

```text
__cookie__:PASSWORD
```

`rpc.cookie_dir` dosyayı taşır. `rpc.enable_cookie_auth = false` denetimi ve bununla birlikte RPC portunun sahip olduğu tek kimlik doğrulamayı kapatır: böylece porta erişebilen her şey onu çağırabilir.

### Zebra'yi başlatın ve eşitlenmesini bekleyin

```bash
zebrad
```

Zebra yapılandırmayı varsayılan konumdan okur. Başka bir dosya kullanmak için `-c /path/to/zebrad.toml` geçirin. Eşitlemenin bitmesini bekleyin. Tamamladığında günlükte `sync_percent=100.000%` görünür ([Book: Running zebra](https://zebra.zfnd.org/user/mining.html#running-zebra)). Donanım ve disk alanı için [Zebra Full Node](/zcash-tech/zebra-full-node) bölümüne bakın.

### getblocktemplate ile kontrol edin

`getblocktemplate`, madencilik yazılımının iş almak için yaptığı çağrıdır; dolayısıyla aynı zamanda en hızlı testtir ([Book: Testing the setup](https://zebra.zfnd.org/user/mining.html#testing-the-setup)). Çerez dosyanızın içeriğini `__cookie__:PASSWORD` yerine koyun:

```bash
curl --silent --data-binary '{"jsonrpc": "1.0", "id":"curltest", "method": "getblocktemplate", "params": [] }' -H 'Content-type: application/json' http://__cookie__:PASSWORD@127.0.0.1:8232/ | jq
```

Çalışan bir kurulum, bir madencinin ihtiyaç duyduğu alanlar arasında `previousblockhash`, `coinbasetxn`, `target` ve `height` bulunan bir `result` nesnesi döndürür. `extra_coinbase_data` ayarlarsanız Book, etiketinizi `coinbasetxn.data` içinde nasıl bulacağınızı açıklar.

### Madencilik yazılımınızı buna yönlendirin

Madencilik veya havuz yazılımınıza RPC uç noktasını, `127.0.0.1:8232`'yi ve çerezdeki kullanıcı adı ile parolayı verin. Book, Zebra'nin "çoğu madencilik havuzu yazılımını çalıştırmak için gereken RPC yöntemlerini desteklediğini" söyler ([Book: Run a mining pool](https://zebra.zfnd.org/user/mining.html#run-a-mining-pool)).

Yazılım seçmeden önce Book'tan iki not:

- **s-nomp yalnızca test içindir.** Book, s-nomp kurulumunu "deneysel" olarak adlandırır ve s-nomp'un "NU5 ile uyumlu olmadığını, dolayısıyla bazı madencilik işlevlerinin devre dışı bırakıldığını" söyler. [Testnet guide](https://zebra.zfnd.org/user/mining-testnet-s-nomp.html) ayrıca s-nomp'un "NU5 veya daha sonraki ağ yükseltmeleri için resmî olarak güncellenmediğini" ekler ve üretim madencilerini güncel yükseltmeleri destekleyen havuz yazılımına yönlendirir.
- **Zebra hazır bir yığın sunar.** Zebra deposunda, [`docker/mining/`](https://github.com/ZcashFoundation/zebra/tree/main/docker/mining) içindeki bir Docker Compose kurulumu, Zebra'yi bir madencilik havuzuyla ve isterseniz bir CPU madencisiyle birlikte başlatır. İçindeki havuz s-nomp'tur ve siz değiştirmediğiniz sürece Testnet'te başlar; bu nedenle bunu bileşenleri öğrenmenin bir yolu olarak değerlendirin.

### Docker yolu

Book'un en kısa yolu, adres ve RPC portunun ortam değişkenleri olarak geçirildiği `zfnd/zebra` Docker imajıdır ([Book: Mining with Zebra in Docker](https://zebra.zfnd.org/user/mining-docker.html)). Aşağıdaki komut, Book'takinin tek bir değişiklik yapılmış hâlidir: RPC portunu yalnızca ana makinenin loopback adresinde yayımlar, böylece diğer makineler ona erişemez.

```bash
docker run -d --name zebra_local \
  -e ZEBRA_MINING__MINER_ADDRESS="YOUR_ADDRESS" \
  -e ZEBRA_RPC__LISTEN_ADDR=0.0.0.0:8232 \
  -p 8233:8233 \
  -p 127.0.0.1:8232:8232 \
  -v zebrad-cache:/home/zebra/.cache/zebra \
  zfnd/zebra:latest
```

Bu, bir Mainnet düğümü başlatır, P2P portunu (8233) Docker ana makinesinde yayımlar ve RPC portunu (8232) yalnızca ana makinenin kendisinden erişilebilir kılar. Çerezi şununla yazdırın:

```bash
docker exec -it zebra_local cat /home/zebra/.cache/zebra/.cookie
```

- **`0.0.0.0`'yi `ZEBRA_RPC__LISTEN_ADDR` içinde tutun.** Bu, Zebra'nin kapsayıcı içinde dinlediği adrestir. Docker yayımlanmış bir portu kapsayıcının kendi ağ arayüzüne yönlendirir; bu nedenle kapsayıcı içinde `127.0.0.1` üzerinde dinleyen bir Zebra, ana makineden bile bağlantıyı alamaz. `-p` önündeki `127.0.0.1:`, portu ağdan uzak tutan şeydir.
- **Book'un komutu**, RPC portunu `-p 8232:8232` ile yayımlar; bu da onu ana makinenin her ağ arayüzünde açar.
- **Testnet üzerinde pratik yapmak için**, `-e ZEBRA_NETWORK__NETWORK="Testnet"` ekleyin, `ZEBRA_RPC__LISTEN_ADDR=0.0.0.0:18232` ayarlayın, `-p 18233:18233` ve `-p 127.0.0.1:18232:18232` yayımlayın ve bir Testnet adresi verin. Bir Mainnet adresi Zebra'nin Testnet'te başlamasını engeller; tersi de geçerlidir.

Madencilerin ödemelerini yapmak ve cüzdanı yönetmek bu bölümün kapsamı dışındadır. Cüzdan tarafı için [Zallet](/zcash-tech/zallet) bölümüne bakın.

## İpuçları ve En İyi Uygulamalar
- **Kârlılık:** whattomine.com/coins/166-zec-equihash gibi hesaplayıcıları kullanın. Örnek: Bir RTX 3060 (~300 Sol/s), $50/ZEC seviyesinde günde ~0.001 ZEC kazanır; elektrik için ~$0.50 düşülür.
- **Gizlilik:** Mevcutsa korumalı havuzları kullanın; adresleri yeniden kullanmaktan kaçının.
- **Güvenlik:** Güçlü parolalar kullanın; havuzlarda/cüzdanlarda 2FA'yı etkinleştirin. Özel anahtarları asla paylaşmayın.
- **Sorun Giderme:** Pay yoksa güvenlik duvarını, antivirüsü veya yanlış yapılandırmayı kontrol edin. forum.zcashcommunity.com veya Reddit r/zec gibi forumlara katılın.
- **Alternatifler:** Kârlı değilse bulut madenciliğini veya diğer coin'lerde staking'i değerlendirin.
- **Çevresel Not:** Madencilik enerji tüketir; mümkünse yenilenebilir kaynakları kullanın.
- **Güncellemeler:** Zcash gelişebilir (ör. olası PoS geçişi); haberler için z.cash'i kontrol edin.
