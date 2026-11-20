# Akash Network üzerinde Zebra nasıl çalıştırılır

Akash üzerinde bir Zebra Zcash tam düğüm dağıtmak için adım adım rehber.

### Ne Dağıtıyorsunuz

Şunları yapacak bir tam Zebra node'u:

-> Tüm Zcash blockchain'ini senkronize edecek (mainnet için 100GB+, testnet için ~40GB)

-> AKT token fiyatlarına bağlı olarak yaklaşık aylık $15 maliyet oluşturacak

-> Tamamen senkronize olması birkaç saatten birkaç güne kadar sürecek

-> 4 vCPU, 16GB RAM, 350GB depolama (mainnet) veya 2 vCPU, 8GB RAM, 50GB (testnet) kullanacak


awesome-akash şablonu artık **Zebra 7.0.0** sürümünü sabitler (`:latest` kullanmaz). Prometheus'u (`9999`) ve health'i (`8080`) dahili olarak, aynı yerde bulunan **lightwalletd** için JSON-RPC'yi gRPC **9067** üzerinden dahili olarak ve `ENABLE_METRICS` / `ENABLE_HEALTH` / `ENABLE_RPC` / `ENABLE_LIGHTWALLETD` özellik bayraklarını etkinleştirir.

Budanmış Mainnet düğümünü daha hızlı çalıştırmak için [Zakura'ı Akash](/guides/akash-network-zakura) üzerinde çalıştırma yöntemine bakın. Kullan-at Regtest panosu için [Thus Spoke Zakura'a Akash](/guides/thus-spoke-zakura-akash) üzerinde bakın.

### Akash bağlantı noktalarını nasıl yayımlar

SDL'deki sayılar (`port` / `as`) **konteyner bağlantı noktalarıdır**. Zebra hâlâ **8233**'ü, lightwalletd **9067**'yi, sağlık denetimi ise **8080**'i dinler. Bu sayılar süreç ve aynı dağıtımdaki diğer hizmetler içindir (`zebra:8232`).

Bunlar, sağlayıcının genel IP adresindeki portlar **değildir**.

**Varsayılan (bu şablon):** özel IP yok. Her `global: true` TCP dışa açılımı için sağlayıcı, paylaşılan bir ana makinedeki **rastgele yüksek bir portu** kapsayıcı portunuza eşler. Kira süresi başladıktan sonra Console/Air **Leases → URIs** gerçek uç noktaları listeler; örneğin:

```
zebra-8233: provider.example:31482
lightwalletd-9067: provider.example:32011
```

Eşler ve cüzdanlar **bu** ana bilgisayar:bağlantı noktası değerlerini kullanır. İlgilendiğiniz dışa açma için URI’yi kopyalayın (P2P veya lightwalletd). `ZEBRA_NETWORK__EXTERNAL_ADDR` ayarlıyorsanız, bunu `…:8233` yerine eşlenen P2P URI’sine (`provider.example:31482`) ayarlayın.

**HTTP** (`as: 80` ve `http_options` ile, Thus Spoke panosunda kullanılır): birçok sağlayıcı rastgele bir TCP portu yerine bir **giriş ana bilgisayar adı** (genellikle 80/443 üzerinde) yayımlar. Bu hizmetin URI'sini tarayıcıda açın.

**Dahili** (`global: false` veya `to: service: lightwalletd`): yalnızca küme DNS’i (`zebra:8232`). Genel URI yok.

**Özel IP’ler** (SDL’de `endpoints` / `kind: ip`), **premium bir eklentidir**. Genel bir IP’yi ve bazen o IP’deki `as` bağlantı noktasını sabit tutabilirler. Bu şablonlar IP talep etmez. İstersen daha sonra sabit bir `host:8233` için bunu kendin ekleyebilirsin; ek maliyet ve daha az teklif veren sağlayıcı bekle.

### Hangi site kullanılmalı (ödemeler)

SDL aynıdır. İki Akash web kullanıcı arayüzü **ödeme şekliniz** bakımından farklıdır.

| Site | Ödemeler | Cüzdan |
| --- | --- | --- |
| [console.akash.network](https://console.akash.network) | Geleneksel web üzerinden ödeme (Console’ın sunduğu kart / itibari para kanalları) | Console hesabı |
| [air.akash.network](https://air.akash.network) | Yerel Akash zincir ödemeleri (AKT / ACT) | **Keplr** |

Zincir üzerinde Keplr ile ödeme yapmak istediğinizde **Air**'i kullanın. Geleneksel bir web ödeme akışı istediğinizde **Console**'u kullanın. Console'da Keplr ile yerel uzlaşma beklemeyin.

### Ön Koşullar

**Console üzerinden ödeme yapıyorsanız (web ödeme sayfası)**

1. [console.akash.network](https://console.akash.network) adresinde bir Console hesabı
2. Console arayüzünün kabul ettiği bir ödeme yöntemi
3. Arayüzde birkaç dakika

**Air üzerinde ödeme yaparsanız (yerel Akash / Keplr)**

1. **Keplr** tarayıcı uzantısı (Chrome/Brave/Firefox)
2. Yatırma ve kiralama için Keplr içinde **AKT / ACT** (bir borsadan veya IBC üzerinden)
3. [air.akash.network](https://air.akash.network) adresini açın

#### Adım 1: Bağlan

**Konsol (web ödemeleri)**

-> [https://console.akash.network](https://console.akash.network) adresine gidin

-> Console hesap akışında oturum açın / akışı tamamlayın

UI'da gösterilen checkout'ı kullanın (zincir üzerinde Keplr değil)

**Air (yerel Akash ödemeleri)**

-> [https://air.akash.network](https://air.akash.network) adresine gidin

-> **"Connect Wallet"** düğmesine tıklayın

-> **Keplr** seçeneğini belirleyin ve bağlantıyı onaylayın

-> Yatırma tutarı ile kiralama bedelinin toplamını karşılayacak kadar AKT/ACT bakiyeniz olduğunu doğrulayın

#### Adım 2: Deployment Oluşturun

-> **"Deploy"** öğesine tıklayın

-> **"Build your template"** seçeneğini seçin (veya doğrudan SDL yüklemeye geçin)


##### Seçenek A: SDL Dosyası Yükleyin (Önerilir)

**Web ödemeleri (Konsol)**

[![Deploy on Akash Console](/content-images/deploy-with-akash-btn-74abb88d44.svg)](https://console.akash.network/new-deployment?step=edit-deployment&templateId=akash-network-awesome-akash-zcash-zebra)

**Keplr (Air) ile yerel Akash ödemeleri**

[Bu şablonu Air'de aç](https://air.akash.network/new-deployment?step=edit-deployment&templateId=akash-network-awesome-akash-zcash-zebra)

##### Seçenek B: SDL Düzenleyicisini Kullanın

[SDL](https://github.com/akash-network/awesome-akash/blob/master/zcash-zebra/deploy.yaml) dosyasını manuel olarak yapıştırmak istiyorsanız:

-> *zebra-akash.yml* içeriğini kopyalayın

-> SDL düzenleyicisine yapıştırın

-> Gerektiği gibi düzenleyin (aşağıdaki yapılandırma bölümüne bakın)

-> **"Create Deployment"** düğmesine tıklayın


#### Adım 3: Depozitoyu Gözden Geçirin ve Onaylayın

Arayüz size şunları gösterecek:

-> **Deployment depozitosu**: ~5 AKT (deployment'ı kapattığınızda bunu geri alırsınız)

-> **Tahmini maliyet**: SDL fiyatlandırmanıza göre

**Air**’de **"Approve"**’a tıklayın ve **Keplr** üzerinden oturum açın. **Console**’da, arayüzün sunduğu web ödeme adımını tamamlayın.

#### Adım 4: Bir Sağlayıcı Seçin

Yaklaşık 30 saniye sonra sağlayıcılardan teklifleri göreceksiniz. Her teklif şunları gösterir:

-> **Blok başına fiyat** (AKT veya USDC cinsinden)

-> **Aylık tahmini maliyet**

-> **Sağlayıcı detayları** (çalışma süresi, bölge vb.)


**Sadece en ucuzu seçmeyin.** Şunları kontrol edin:

-> Çalışma süresi yüzdesi (hedef > %95)

-> Bölge (size daha yakın = daha iyi gecikme, ancak blockchain node'ları için çok önemli değil)

-> Denetlenmiş durumu (yeşil onay işareti = daha güvenilir)


Seçtiğiniz sağlayıcıda **"Teklifi Kabul Et"** seçeneğine tıklayın. Air'de Keplr ile oturum açın. Console'da web ödeme akışını kullanarak onaylayın.

#### Adım 5: Deployment'ın Hazırlanmasını Bekleyin

Console şunları yapacaktır:

-> Seçtiğiniz sağlayıcıyla lease oluşturacak

-> Manifest'i gönderecek (sağlayıcıya ne çalıştıracağını söyler)

-> Container'ınızı başlatacak

Bu 1-2 dakika sürer. Arayüzde durum güncellemelerini göreceksiniz.

#### Adım 6: Çalıştığını Doğrulayın

Dağıtım tamamlandıktan sonra şunları göreceksiniz:

-> **Services** sekmesi: *zebra* servisinizin durumunu gösterir

-> **Logs** sekmesi: Canlı container logları

-> **Leases** sekmesi: Deployment'ınızla ilgili ayrıntılar (DSEQ, sağlayıcı, maliyet)


##### Logları Kontrol Edin

**Logs** sekmesine tıklayın; Zebra'nın başlatıldığını görmelisiniz:

```bash
Loading config from environment variables
Mainnet network selected
Listening for peer connections on [::]:8233
Starting initial sync...
```

Senkronizasyon ağa bağlı olarak **saatlerden günlere** kadar sürecektir. Şunlara dikkat edin:

-> Artan blok yükseklikleri

-> Eş bağlantıları (10-30 eş olmalı)

-> Tekrarlanan hata olmaması


#### Adım 7: Node'unuzun Adresini Alın

**Leases** sekmesine, ardından **URIs** seçeneğine tıklayın.

Şuna benzer bir şey göreceksiniz:

```
zebra-8233: provider-hostname.com:31482
lightwalletd-9067: provider-hostname.com:32011
```

Her satır bir `global: true` dışa açar. Ad, SDL `as` portunu (8233, 9067) içerir. Ana bilgisayar adından sonraki sayı, kiralama sırasında atanan **sağlayıcının eşlediği porttur**. Diğer Zcash düğümleri `provider-hostname.com:31482` adresine bağlanır. Kompakt cüzdanlar lightwalletd URI’sini kullanır (TLS’yi kendiniz sonlandırmadığınız sürece TLS kapalıdır).

Kapsayıcı hâlâ 8233 / 9067 bağlantı noktalarını dinliyor. Daha sonra özel bir IP eklemediğiniz sürece (bu şablonda yoktur) genel adres her zaman URI'dir.

### Yapılandırma Seçenekleri

#### Testnet'e Geçiş

SDL varsayılan olarak Mainnet kullanır. Bunun yerine Testnet kullanmak için:

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

-> *expose* bölümünde **dışa açılan portu güncelleyin**:

   ```yaml
   # Mainnet portunu yorum satırına alın:
   # - port: 8233
   #   as: 8233
   #   to:
   #     - global: true
   #   proto: tcp

   # Testnet portunun yorumunu kaldırın:
   - port: 18233
     as: 18233
     to:
       - global: true
     proto: tcp
   ```

-> İsteğe bağlı: *profiles.compute.zebra.resources* içinde Testnet için **kaynakları azaltın**:

   ```yaml
   cpu:
     units: 2  # 4'ten düşürüldü
   memory:
     size: 8Gi  # 16Gi'den düşürüldü
   storage:
     - size: 50Gi  # 150Gi'den düşürüldü
   ```

-> İsteğe bağlı: *profiles.placement.akash.pricing* içinde **fiyatlandırmayı düşürün**:

   ```yaml
   amount: 5000  # 10000'den düşürüldü
   ```

#### RPC Erişimini Etkinleştirin

Güvenlik nedeniyle RPC varsayılan olarak devre dışıdır. Etkinleştirmek için:

**Mainnet için:**

-> *env* bölümünde yorumunu kaldırın:

   ```yaml
   - "ZEBRA_RPC__LISTEN_ADDR=0.0.0.0:8232"
   - "ZEBRA_RPC__COOKIE_DIR=/home/zebra/.cache/zebra"
   ```

-> *expose* içinde Mainnet RPC portunun yorumunu kaldırın:

   ```yaml
   - port: 8232
     as: 8232
     to:
       - global: false  # Güvenlik için dahili tutun
     proto: tcp
   ```

**Testnet için:**

-> *env* bölümünde yorumunu kaldırın:

   ```yaml
   - "ZEBRA_RPC__LISTEN_ADDR=0.0.0.0:18232"
   - "ZEBRA_RPC__COOKIE_DIR=/home/zebra/.cache/zebra"
   ```

-> *expose* içinde Testnet RPC portunun yorumunu kaldırın:

   ```yaml
   - port: 18232
     as: 18232
     to:
       - global: false
     proto: tcp
   ```

**Uyarı**: RPC için *global: true* ayarlarsanız, onu internete açmış olursunuz. Zebra varsayılan olarak cookie auth kullanır, ama yine de - ne yaptığınızı bilmiyorsanız bunu yapmayın.

`global: true` ile RPC’yi dışarı açarsanız, genel adres yine bir **lease URI**’dir (`host:&lt;random-high-port&gt;`), `host:8232` değildir. `global: false` (bu şablon) ile RPC, dağıtım ağında kalır (lightwalletd için `zebra:8232`). Özel IP kiralamaları ayrı ve ücretli bir seçenektir; SDL’de yer almaz.

#### Metrics'i Etkinleştirin (Prometheus)

İzleme için metrikleri toplamak istiyorsanız:

-> *env* içinde yorumunu kaldırın:

   ```yaml
   - "ZEBRA_METRICS__ENDPOINT_ADDR=0.0.0.0:9999"
   ```

-> *expose* içinde metrics portunun yorumunu kaldırın:

   ```yaml
   - port: 9999
     as: 9999
     to:
       - global: false
     proto: tcp
   ```

#### Kaynakları/Fiyatlandırmayı Ayarlayın

Teklif alamıyorsanız veya maliyeti optimize etmek istiyorsanız:

**Daha düşük özellikli sağlayıcılar için**, *profiles.compute.zebra.resources* bölümünde azaltın:

-> CPU: *units: 2* (makul senkronizasyon hızı için minimum)

-> Bellek: *size: 12Gi* (kararlılık için minimum)

-> Depolama: *size: 120Gi* (mainnet için minimum)

**Daha fazla teklif çekmek için**, *profiles.placement.akash.pricing* içinde artırın:

-> Mainnet: *amount: 1000000* uakt/block deneyin

-> Testnet: *amount: 1000000* uakt/block deneyin

### Deployment'ınızı Güncelleme

Dağıtımdan sonra yapılandırmayı değiştirmeniz mi gerekiyor?

-> Console'da **My Deployments** bölümüne gidin

-> Zebra deployment'ınızı bulun

-> **"Update Deployment"** düğmesine tıklayın

-> SDL'yi düzenleyin

-> **"Güncelle"**'ye tıklayın (Air: Keplr ile oturum açın; Console: web ödeme akışını onaylayın)

**Not**: Güncelleme container'ınızı yeniden başlatacaktır. Node kaydedilmiş durumundan devam edecektir (kalıcı depolama), ancak 1-2 dakikalık kesinti bekleyin.

### İzleme

#### Console Üzerinden

-> **Logs sekmesi**: Canlı container logları

-> **Shell sekmesi**: Container içinde bir shell açın (debug için kullanışlı)

-> **Events sekmesi**: Kubernetes olayları (bir şey bozulmadıkça çoğunlukla işe yaramaz)


#### RPC Üzerinden (etkinse)

RPC'yi etkinleştirdiyseniz, node'unuzu normal bir zebrad full node gibi sorgulayabilirsiniz (çünkü öyle!)

### Deployment'ınızı Kapatma

İşiniz bittiğinde veya ödeme yapmayı durdurmak istediğinizde:

-> **My Deployments** bölümüne gidin

-> Zebra deployment'ınızı bulun

-> **"Close Deployment"** düğmesine tıklayın

-> Onaylayın (Air: Keplr üzerinden oturum açın; Console: Console arayüzünde onaylayın)

5 AKT depozitonuz iade edilir. **Kalıcı depolama** sağlayıcı tarafından korunmalıdır, ancak buna güvenmeyin - buna diğer cloud sağlayıcıları gibi yaklaşın.

### Sorun Giderme

#### "Insufficient funds" hatası

On Air’de Keplr’a AKT/ACT yatırın. Console’da Console ödeme yöntemine bakiye ekleyin.

#### Hiç teklif görünmüyor

Ya:

-> Fiyatlandırmanız çok düşük (SDL içinde *amount* değerini artırın)

-> Kaynak gereksinimleriniz mevcut sağlayıcılar için fazla yüksek (CPU/bellek/depolamayı azaltın)

-> Daha uzun bekleyin (bazen tekliflerin görünmesi 60-90 saniye sürebilir)


#### Deployment "pending" durumunda takılı kaldı

Sağlayıcı sorun yaşıyor olabilir. Deployment'ı kapatın ve farklı bir sağlayıcı deneyin.

#### Zebra loglarında "No peers connected" görünüyor

İlk birkaç dakika için bu normaldir. Zebra eşleri otomatik olarak keşfedecektir. 10+ dakika sonra da devam ederse bir ağ sorununuz olabilir (Akash'ta pek olası değil).

#### Loglarda "Out of memory" hataları

RAM'den fazla kısmışsınız. Deployment'ı kapatın ve en az 12Gi bellekle yeniden dağıtın (16Gi önerilir).

#### Senkronizasyon çok uzun sürüyor

"Çok uzun" derken neyi kastediyorsunuz:

-> **Saatler**: Normal

-> **Günler**: Mainnet'i sıfırdan senkronize ederken bu da normal

-> **Haftalar**: Bir sorun var, hata için logları kontrol edin


### Maliyet Yönetimi

Harcamalarınızı Console veya Air'de izleyin:

-> **My Deployments** -> Deployment'ınız -> "Cost per month" tahminini gösterir

-> Air: Keplr AKT/ACT bakiyeniz zamanla azalır. Console: Console ödeme bakiyeniz azalır.

Bakiyeniz azaldığında Akash deployment'ınızı otomatik olarak kapatacaktır. **Cüzdanınıza düzenli olarak bakiye ekleyin** veya uyarılar ayarlayın.

#### Maliyetleri Azaltma

-> Üretim dışı testler için **Testnet kullanın** (%50 daha ucuz)

-> Hızlı senkronizasyona ihtiyacınız yoksa **CPU/belleği düşürün**

-> **Daha ucuz sağlayıcıları seçin** (her zaman akıllıca olmayabilir - çalışma süresi önemlidir)


### Mainnet vs Testnet

```markdown
----------------------------------------------------------------------------------
|            | Mainnet (varsayılan)           | Testnet                         |
---------------------------------------------------------------------------------|
| Amaç      | Üretim Zcash blockchain'i       | Test ve geliştirme              |
| Ağ        | ZEBRA_NETWORK__NETWORK=Mainnet  | ZEBRA_NETWORK__NETWORK=Testnet  |
| P2P Portu | 8233                            | 18233                           |
| RPC Portu | 8232                            | 18232                           |
| Senk. süresi | Günler                       | Saatler                         |
| Depolama  | 350GB+                          | 50GB                            |
| Kaynaklar | 4 CPU / 16GB RAM                | 2 CPU / 8GB RAM                 |
| Maliyet   | ~$15/ay                         | ~$5/ay                          |
----------------------------------------------------------------------------------
```

Yalnızca deployment sürecini test ediyorsanız Testnet ile başlayın. Yapılandırma için yukarıdaki "Testnet'e Geçiş" bölümüne bakın.

### Ek Kaynaklar

**Akash Konsolu** (web ödemeleri): [https://console.akash.network](https://console.akash.network)

**Akash Air** (yerel AKT/ACT + Keplr): [https://air.akash.network](https://air.akash.network)

**Akash Belgeleri**: [https://akash.network/docs/](https://akash.network/docs/)

**Zebra Belgeleri**: [https://zebra.zfnd.org/](https://zebra.zfnd.org/)

**Zcash Explorer'ları**: [https://zechub.wiki/guides/blockchain-explorers](https://zechub.wiki/guides/blockchain-explorers)

**Akash Discord**: [https://discord.akash.network](https://discord.akash.network) (sağlayıcı sorunları için)
