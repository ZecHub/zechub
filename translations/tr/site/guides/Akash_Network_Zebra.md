# Zebra Akash Ağında nasıl çalıştırılır

Akash üzerinde bir Zebra Zcash tam düğümünü dağıtmak için adım adım kılavuz.

### Dağıtacağınız şey

Şunları yapacak bir tam Zebra düğümü:

-> Zcash blokzincirinin tamamını eşitleme (mainnet için 100 GB+, testnet için yaklaşık 40 GB)

-> AKT token fiyatlarına bağlı olarak ayda yaklaşık 15 $ maliyet

-> Tamamen eşitlenmesinin birkaç saatten birkaç güne kadar sürmesi

-> 4 vCPU, 16 GB RAM, 350 GB depolama (mainnet) veya 2 vCPU, 8 GB RAM, 50 GB (testnet) kullanma

awesome-akash şablonu artık **Zebra 7.0.0** sürümünü sabitler (asla `:latest` değil). Prometheus'u (`9999`) ve health'i (`8080`) dahili olarak etkinleştirir, gRPC **9067** üzerinde birlikte konumlandırılmış bir **lightwalletd** için JSON-RPC'yi dahili olarak etkinleştirir ve `ENABLE_METRICS` / `ENABLE_HEALTH` / `ENABLE_RPC` / `ENABLE_LIGHTWALLETD` özellik işaretlerini etkinleştirir.

Daha hızlı budanmış bir Mainnet düğümü için bkz. [Zakura Akash](/guides/akash-network-zakura). Atılabilir bir Regtest gösterge paneli için bkz. [Zakura Akash](/guides/thus-spoke-zakura-akash).


### Akash bağlantı noktalarını nasıl yayımlar

SDL'deki (`port` / `as`) sayılar **konteyner bağlantı noktalarıdır**. Zebra hâlâ **8233** üzerinde, lightwalletd **9067** üzerinde, health ise **8080** üzerinde dinler. Bu sayılar işlem ve aynı dağıtımdaki diğer hizmetler (`zebra:8232`) içindir.

Bunlar sağlayıcının genel IP'sindeki bağlantı noktaları **değildir**.

**Varsayılan (bu şablon):** özel IP yoktur. Her `global: true` TCP expose için sağlayıcı, paylaşılan bir ana bilgisayardaki **rastgele yüksek bir bağlantı noktasını** konteyner bağlantı noktanıza eşler. Lease oluşturulduktan sonra Console/Air **Leases → URIs**, örneğin aşağıdaki gibi gerçek uç noktaları listeler:

```
zebra-8233: provider.example:31482
lightwalletd-9067: provider.example:32011
```

Eşler ve cüzdanlar **bu** ana bilgisayar:bağlantı noktası değerlerini kullanır. İlgilendiğiniz expose için URI'yi (P2P veya lightwalletd) kopyalayın. `ZEBRA_NETWORK__EXTERNAL_ADDR` ayarlarsanız, bunu `provider.example:31482` eşlenmiş P2P URI'sine ayarlayın; `…:8233` değerine değil.

**HTTP** (`as: 80` ve `http_options` ile, Thus Spoke gösterge panelinde kullanılır): birçok sağlayıcı rastgele bir TCP bağlantı noktası yerine bir **ingress ana bilgisayar adı** (genellikle 80/443 üzerinde) yayımlar. Bu hizmetin URI'sini tarayıcıda açın.

**Dahili** (`global: false` veya `to: service: lightwalletd`): yalnızca küme DNS'i (`zebra:8232`). Genel URI yoktur.

**Özel IP'ler** (SDL'de `endpoints` / `kind: ip`) **ücretli bir eklentidir**. Bunlar genel bir IP'yi ve bazen o IP üzerindeki `as` bağlantı noktasını sabitleyebilir. Bu şablonlar özel IP talep **etmez**. Sabit bir `host:8233` istiyorsanız bunu daha sonra kendiniz ekleyin; ek maliyet ve daha az teklif veren sağlayıcı bekleyin.

### Hangi site kullanılmalı (ödemeler)

SDL aynıdır. İki Akash web kullanıcı arayüzü, **ödeme şekliniz** bakımından farklıdır.

| Site | Ödemeler | Cüzdan |
| --- | --- | --- |
| [console.akash.network](https://console.akash.network) | Geleneksel web ödeme ekranı (Console'un sunduğu kart / itibari para kanalları) | Console hesabı |
| [air.akash.network](https://air.akash.network) | Yerel Akash Zincir ödemeleri (AKT / ACT) | **Keplr** |

Zincir üstü Keplr ile ödeme yapmak istediğinizde **Air** kullanın. Geleneksel bir web ödeme akışı istediğinizde **Console** kullanın. Console üzerinde Keplr yerel mutabakat beklemeyin.

### Ön koşullar

**Console ile ödeme yapacaksanız (web ödeme ekranı)**

1. [console.akash.network](https://console.akash.network) adresinde bir Console hesabı
2. Console kullanıcı arayüzünün kabul ettiği bir ödeme yöntemi
3. Kullanıcı arayüzünde birkaç dakika

**Air ile ödeme yapacaksanız (yerel Akash / Keplr)**

1. **Keplr** tarayıcı uzantısı (Chrome/Brave/Firefox)
2. Teminat ve lease için Keplr içinde **AKT / ACT** (bir borsadan veya IBC üzerinden)
3. [air.akash.network](https://air.akash.network) adresini açın

#### 1. Adım: Bağlanma

**Console (web ödemeleri)**

-> [https://console.akash.network](https://console.akash.network) adresine gidin

-> Oturum açın / Console hesabı akışını tamamlayın

-> Kullanıcı arayüzünün sunduğu ödeme ekranını kullanın (Keplr zincir üstü değil)

**Air (yerel Akash ödemeleri)**

-> [https://air.akash.network](https://air.akash.network) adresine gidin

-> **"Connect Wallet"** seçeneğine tıklayın

-> **Keplr** seçeneğini belirleyin ve bağlantıyı onaylayın

-> AKT/ACT bakiyenizin teminat ve lease için yeterli olduğunu doğrulayın

#### 2. Adım: Dağıtım oluşturma

-> **"Deploy"** seçeneğine tıklayın

-> **"Build your template"** seçeneğini belirleyin (veya doğrudan SDL yüklemeye geçin)


##### A seçeneği: SDL dosyası yükleme (Önerilen)

**Web ödemeleri (Console)**

[![Deploy on Akash Console](/content-images/deploy-with-akash-btn-74abb88d44.svg)](https://console.akash.network/new-deployment?step=edit-deployment&templateId=akash-network-awesome-akash-zcash-zebra)

**Akash ve Keplr ile yerel ödemeler (Air)**

[Open this template on Air](https://air.akash.network/new-deployment?step=edit-deployment&templateId=akash-network-awesome-akash-zcash-zebra)

##### B seçeneği: SDL düzenleyicisini kullanma

[SDL'yi](https://github.com/akash-network/awesome-akash/blob/master/zcash-zebra/deploy.yaml) manuel olarak yapıştırmak istiyorsanız:

-> *zebra-akash.yml* dosyasının içeriğini kopyalayın

-> SDL düzenleyicisine yapıştırın

-> Gerektiği gibi değiştirin (aşağıdaki yapılandırma bölümüne bakın)

-> **"Create Deployment"** seçeneğine tıklayın


#### 3. Adım: Teminatı inceleme ve onaylama

Kullanıcı arayüzü size şunları gösterecektir:

-> **Dağıtım teminatı**: yaklaşık 5 AKT (dağıtımı kapattığınızda bunu geri alırsınız)

-> **Tahmini maliyet**: SDL fiyatlandırmanıza göre

**Air** üzerinde **"Approve"** seçeneğine tıklayın ve **Keplr** ile oturum açın. **Console** üzerinde, kullanıcı arayüzünün sunduğu web ödeme ekranını tamamlayın.

#### 4. Adım: Bir sağlayıcı seçme

Yaklaşık 30 saniye sonra sağlayıcılardan gelen teklifleri göreceksiniz. Her teklifte şunlar gösterilir:

-> **Blok başına fiyat** (AKT veya USDC cinsinden)

-> **Aylık tahmini maliyet**

-> **Sağlayıcı ayrıntıları** (çalışma süresi, bölge vb.)


**Yalnızca en ucuz olanı seçmeyin.** Şunları kontrol edin:

-> Çalışma süresi yüzdesi (%95'in üzerinde olmasını hedefleyin)

-> Bölge (size daha yakın olması gecikmeyi azaltır ancak blokzincir düğümleri için çok önemli değildir)

-> Denetlenmiş durumu (yeşil onay işareti = daha güvenilir)


Seçtiğiniz sağlayıcıda **"Accept Bid"** seçeneğine tıklayın. Air üzerinde Keplr ile oturum açın. Console üzerinde web ödeme akışıyla onaylayın.

#### 5. Adım: Dağıtımı bekleme

Console şunları yapacaktır:

-> Seçtiğiniz sağlayıcıyla lease oluşturma

-> Manifest'i gönderme (sağlayıcıya ne çalıştıracağını bildirir)

-> Konteynerinizi başlatma

Bu işlem 1-2 dakika sürer. Kullanıcı arayüzünde durum güncellemelerini göreceksiniz.

#### 6. Adım: Çalıştığını doğrulama

Dağıtım tamamlandığında şunları göreceksiniz:

-> **Services** sekmesi: Durumuyla birlikte *zebra* hizmetinizi gösterir

-> **Logs** sekmesi: Canlı konteyner günlükleri

-> **Leases** sekmesi: Dağıtımınızla ilgili ayrıntılar (DSEQ, sağlayıcı, maliyet)


##### Günlükleri kontrol etme

**Logs** seçeneğine tıklayın; Zebra öğesinin başlatıldığını görmelisiniz:

```bash
Loading config from environment variables
Mainnet network selected
Listening for peer connections on [::]:8233
Starting initial sync...
```

Eşitleme, ağa bağlı olarak **saatler veya günler** sürecektir. Şunları gözlemleyin:

-> Artan blok yükseklikleri

-> Eş bağlantıları (10-30 eş olmalıdır)

-> Tekrarlanan hataların olmaması


#### 7. Adım: Düğümünüzün adresini alma

**Leases** sekmesine, ardından **URIs** seçeneğine tıklayın.

Şuna benzer bir şey göreceksiniz:

```
zebra-8233: provider-hostname.com:31482
lightwalletd-9067: provider-hostname.com:32011
```

Her satır bir `global: true` expose'udur. Ad, SDL `as` bağlantı noktasını (8233, 9067) içerir. Ana bilgisayar adından sonraki sayı, lease sırasında atanan **sağlayıcının eşlenmiş bağlantı noktasıdır**. Diğer Zcash düğümleri `provider-hostname.com:31482` adresine bağlanır. Kompakt cüzdanlar lightwalletd URI'sini kullanır (TLS'yi kendiniz sonlandırmadığınız sürece TLS kapalıdır).

Konteyner hâlâ 8233 / 9067 üzerinde dinlemektedir. Daha sonra özel bir IP eklemediğiniz sürece genel adres her zaman URI'dir (bu şablonda yoktur).

### Yapılandırma seçenekleri

#### Testnet'e geçme

SDL varsayılan olarak Mainnet'i kullanır. Bunun yerine Testnet'i kullanmak için:

-> *env* bölümünde **Mainnet yapılandırmasını yorum satırına alın**:

   ```yaml
   # - "ZEBRA_NETWORK__NETWORK=Mainnet"
   # - "ZEBRA_NETWORK__LISTEN_ADDR=[::]:8233"
   ```

-> **Testnet yapılandırmasının yorumunu kaldırın**:

   ```yaml
   - "ZEBRA_NETWORK__NETWORK=Testnet"
   - "ZEBRA_NETWORK__LISTEN_ADDR=[::]:18233"
   ```

-> *expose* bölümünde **yayımlanan bağlantı noktasını güncelleyin**:

   ```yaml
   # Comment out Mainnet port:
   # - port: 8233
   #   as: 8233
   #   to:
   #     - global: true
   #   proto: tcp

   # Uncomment Testnet port:
   - port: 18233
     as: 18233
     to:
       - global: true
     proto: tcp
   ```

-> **İsteğe bağlı: *profiles.compute.zebra.resources* içinde Testnet kaynaklarını azaltın**:

   ```yaml
   cpu:
     units: 2  # Down from 4
   memory:
     size: 8Gi  # Down from 16Gi
   storage:
     - size: 50Gi  # Down from 150Gi
   ```

-> **İsteğe bağlı: *profiles.placement.akash.pricing* içinde fiyatlandırmayı düşürün**:

   ```yaml
   amount: 5000  # Down from 10000
   ```

#### RPC erişimini etkinleştirme

RPC, güvenlik nedeniyle varsayılan olarak devre dışıdır. Etkinleştirmek için:

**Mainnet için:**

-> *env* bölümündeki yorum satırını kaldırın:

   ```yaml
   - "ZEBRA_RPC__LISTEN_ADDR=0.0.0.0:8232"
   - "ZEBRA_RPC__COOKIE_DIR=/home/zebra/.cache/zebra"
   ```

-> *expose* bölümündeki Mainnet RPC bağlantı noktasının yorum satırını kaldırın:

   ```yaml
   - port: 8232
     as: 8232
     to:
       - global: false  # Keep internal for security
     proto: tcp
   ```

**Testnet için:**

-> *env* bölümündeki yorum satırını kaldırın:

   ```yaml
   - "ZEBRA_RPC__LISTEN_ADDR=0.0.0.0:18232"
   - "ZEBRA_RPC__COOKIE_DIR=/home/zebra/.cache/zebra"
   ```

-> *expose* bölümündeki Testnet RPC bağlantı noktasının yorum satırını kaldırın:

   ```yaml
   - port: 18232
     as: 18232
     to:
       - global: false
     proto: tcp
   ```

**Uyarı**: RPC için *global: true* ayarlarsanız, onu internete açmış olursunuz. Zebra varsayılan olarak çerez kimlik doğrulamasını kullanır ancak ne yaptığınızı bilmiyorsanız yine de bunu yapmayın.

RPC'yi `global: true` ile açarsanız genel adres yine `host:8232` değil, **lease URI'sidir** (`host:&lt;random-high-port&gt;`). `global: false` (bu şablon) ile RPC dağıtım ağında kalır (`zebra:8232`, lightwalletd için). Özel IP lease'leri ayrı bir ücretli seçenektir ve SDL'de yer almaz.

#### Metrikleri etkinleştirme (Prometheus)

İzleme için metrikleri toplamak üzere:

-> *env* içindeki yorum satırını kaldırın:

   ```yaml
   - "ZEBRA_METRICS__ENDPOINT_ADDR=0.0.0.0:9999"
   ```

-> Metrik bağlantı noktasındaki yorum satırını *expose* bölümünde kaldırın:

   ```yaml
   - port: 9999
     as: 9999
     to:
       - global: false
     proto: tcp
   ```

#### Kaynakları/fiyatlandırmayı ayarlama

Teklif alamıyorsanız veya maliyeti optimize etmek istiyorsanız:

**Daha düşük özellikli sağlayıcılar için**, *profiles.compute.zebra.resources* bölümünde şunları azaltın:

-> CPU: *units: 2* (makul eşitleme hızı için minimum)

-> Bellek: *size: 12Gi* (kararlılık için minimum)

-> Depolama: *size: 120Gi* (mainnet için minimum)

**Daha fazla teklif çekmek için**, *profiles.placement.akash.pricing* bölümünde artırın:

-> Mainnet: blok başına *amount: 1000000* uakt değerini deneyin

-> Testnet: blok başına *amount: 1000000* uakt değerini deneyin

### Dağıtımınızı güncelleme

Dağıtım sonrasında yapılandırmayı değiştirmeniz mi gerekiyor?

-> Console'da **My Deployments** bölümüne gidin

-> Zebra dağıtımınızı bulun

-> **"Update Deployment"** seçeneğine tıklayın

-> SDL'yi düzenleyin

-> **"Update"** seçeneğine tıklayın (Air: Keplr ile oturum açın; Console: web ödeme akışıyla onaylayın)

**Not**: Güncelleme, konteynerinizi yeniden başlatır. Düğüm, kaydedilmiş durumundan (kalıcı depolama) devam eder ancak 1-2 dakikalık kesinti bekleyin.

### İzleme

#### Console üzerinden

-> **Logs sekmesi**: Canlı konteyner günlükleri

-> **Shell sekmesi**: Konteyner içinde bir kabuk açma (hata ayıklama için kullanışlıdır)

-> **Events sekmesi**: Kubernetes olayları (bir şey bozulmadığı sürece çoğunlukla işe yaramaz)


#### RPC üzerinden (etkinse)

RPC'yi etkinleştirdiyseniz düğümünüzü normal bir zebrad tam düğüm gibi sorgulayabilirsiniz (çünkü öyledir!)

### Dağıtımınızı kapatma

İşiniz bittiğinde veya ödeme yapmayı durdurmak istediğinizde:

-> **My Deployments** bölümüne gidin

-> Zebra dağıtımınızı bulun

-> **"Close Deployment"** seçeneğine tıklayın

-> Onaylayın (Air: Keplr ile oturum açın; Console: Console kullanıcı arayüzünde onaylayın)

5 AKT tutarındaki teminatınız iade edilir. **Kalıcı depolama** sağlayıcı tarafından korunmalıdır ancak buna güvenmeyin; diğer tüm bulut sağlayıcılarında olduğu gibi değerlendirin.

### Sorun giderme

#### "Insufficient funds" hatası

Air üzerinde Keplr hesabınıza AKT/ACT yatırın. Console üzerinde Console ödeme yöntemine yükleme yapın.

#### Teklif görünmüyor

Şunlardan biri söz konusu olabilir:

-> Fiyatlandırmanız çok düşük (SDL'deki *amount* değerini artırın)

-> Kaynak gereksinimleriniz mevcut sağlayıcılar için çok yüksek (CPU/bellek/depolama değerlerini azaltın)

-> Daha uzun süre bekleyin (tekliflerin görünmesi bazen 60-90 saniye sürer)


#### Dağıtım "pending" durumunda takılı kaldı

Sağlayıcı sorun yaşıyor olabilir. Dağıtımı kapatın ve farklı bir sağlayıcı deneyin.

#### Zebra günlüklerinde "No peers connected" gösteriliyor

İlk birkaç dakika için bu normaldir. Zebra eşleri otomatik olarak keşfeder. 10 dakikadan uzun süre devam ederse ağ sorununuz olabilir (Akash üzerinde olası değildir).

#### Günlüklerde "Out of memory" hataları

RAM'den tasarruf etmeye çalışmışsınız. Dağıtımı kapatın ve en az 12Gi bellekle (16Gi önerilir) yeniden dağıtın.

#### Eşitleme çok uzun sürüyor

“Çok uzun” derken neyi kastediyorsunuz:

-> **Saatler**: Normal

-> **Günler**: Sıfırdan mainnet için bu da normal

-> **Haftalar**: Bir sorun var; hatalar için günlükleri kontrol edin


### Maliyet yönetimi

Harcamalarınızı Console veya Air üzerinde izleyin:

-> **My Deployments** -> Dağıtımınız -> “Cost per month” tahminini gösterir

-> Air: Keplr AKT/ACT bakiyeniz zamanla azalır. Console: Console ödeme bakiyeniz azalır.


Bakiyeniz azaldığında Akash dağıtımınızı otomatik olarak kapatır. **Cüzdanınıza düzenli olarak yükleme yapın** veya uyarılar ayarlayın.

#### Maliyetleri azaltma

-> Üretim dışı testler için **Testnet kullanın** (%50 daha ucuz)

-> Hızlı eşitlemeye ihtiyacınız yoksa **CPU/belleği düşürün**

-> **Daha ucuz sağlayıcılar seçin** (her zaman akıllıca değildir; çalışma süresi önemlidir)


### Mainnet ve Testnet karşılaştırması

```markdown
----------------------------------------------------------------------------------
|            | Mainnet (default)               | Testnet                         |
---------------------------------------------------------------------------------|
| Purpose   | Production Zcash blockchain      | Testing and development         |
| Network   | ZEBRA_NETWORK__NETWORK=Mainnet   | ZEBRA_NETWORK__NETWORK=Testnet  |
| P2P Port  | 8233                             | 18233                           |
| RPC Port  | 8232                             | 18232                           |
| Sync time | Days                             | Hours                           |
| Storage   | 350GB+                           | 50GB                            |
| Resources | 4 CPU / 16GB RAM                 | 2 CPU / 8GB RAM                 |
| Cost      | ~$15/month                       | ~$5/month                       |
----------------------------------------------------------------------------------
```

Yalnızca dağıtım sürecini test ediyorsanız Testnet ile başlayın. Yapılandırma için yukarıdaki “Testnet'e geçme” bölümüne bakın.

### Ek kaynaklar

**Akash Console** (web ödemeleri): [https://console.akash.network](https://console.akash.network)

**Akash Air** (yerel AKT/ACT + Keplr): [https://air.akash.network](https://air.akash.network)

**Akash Docs**: [https://akash.network/docs/](https://akash.network/docs/)

**Zebra Docs**: [https://zebra.zfnd.org/](https://zebra.zfnd.org/)

**Zcash Explorers**: [https://zechub.wiki/guides/blockchain-explorers](https://zechub.wiki/guides/blockchain-explorers)

**Akash Discord**: [https://discord.akash.network](https://discord.akash.network) (sağlayıcı sorunları için)
