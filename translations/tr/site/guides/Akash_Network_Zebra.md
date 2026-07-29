# Akash Network üzerinde Zebra nasıl çalıştırılır

[Akash Console](https://console.akash.network) kullanarak bir Zebra Zcash full node dağıtmak için adım adım rehber.

### Ne Dağıtıyorsunuz

Şunları yapacak bir tam Zebra node'u:

-> Tüm Zcash blockchain'ini senkronize edecek (mainnet için 100GB+, testnet için ~40GB)

-> AKT token fiyatlarına bağlı olarak yaklaşık aylık $15 maliyet oluşturacak

-> Tamamen senkronize olması birkaç saatten birkaç güne kadar sürecek

-> 4 vCPU, 16GB RAM, 350GB depolama (mainnet) veya 2 vCPU, 8GB RAM, 50GB (testnet) kullanacak


### Önemli: Akash'ta Port Eşleme

Akash'ta bir portu dışa açtığınızda (ör. Zebra P2P için 8233 portu), bu port sağlayıcının genel IP’sinde **aynı porta bağlanmaz**. Bunun yerine sağlayıcı rastgele yüksek bir port (31234 veya 42567 gibi) atar ve bunu container'ınızdaki 8233 portuna reverse proxy ile yönlendirir.

Bu tasarım gereğidir - sağlayıcılar birden fazla deployment çalıştırır ve herkes doğrudan 8233 portunu kullanmaya çalışsaydı çakışmalar olurdu.

**Bu sizin için ne anlama geliyor:**

-> SDL içinde 8233 portunu yapılandırırsınız (Zebra'nın standart P2P portu)

-> Akash size *provider.com:31234* gibi bir URI verir

-> Diğer Zcash node'ları size *provider.com:31234* üzerinden bağlanır

-> Container'ınızın içinde Zebra yine 8233 üzerinde dinler


Bu otomatik olarak ele alınır. Sadece Akash'ın size verdiği URI'yi kullanın.

### Ön Koşullar

1. **Keplr Wallet** tarayıcı eklentisi kurulu olmalı (Chrome/Brave/Firefox)
2. **AKT tokenları** - Bir borsadan (Coinbase, Kraken, Osmosis) 50-100 AKT alın
3. Console arayüzünde tıklayarak ilerlemek için **5 dakika**

#### Adım 1: Cüzdanınızı Bağlayın

-> [https://console.akash.network](https://console.akash.network) adresine gidin

-> Sağ üstteki **"Connect Wallet"** düğmesine tıklayın

-> **Keplr**'ı seçin (veya tercih ettiğiniz Cosmos cüzdanını)

-> Keplr açıldığında bağlantıyı onaylayın


AKT bakiyeniz sağ üstte görünmelidir. Sıfırsa önce cüzdanınıza fon ekleyin.

#### Adım 2: Deployment Oluşturun

-> **"Deploy"** düğmesine tıklayın (büyük mavi düğme, sayfanın ortası)

-> **"Build your template"** seçeneğini seçin (veya doğrudan SDL yüklemeye geçin)


##### Seçenek A: SDL Dosyası Yükleyin (Önerilir)

[![Akash'ta Dağıtın](https://raw.githubusercontent.com/akash-network/console/refs/heads/main/apps/deploy-web/public/images/deploy-with-akash-btn.svg)](https://console.akash.network/new-deployment?step=edit-deployment&templateId=akash-network-awesome-akash-zcash-zebra)

##### Seçenek B: SDL Düzenleyicisini Kullanın

[SDL](https://github.com/akash-network/awesome-akash/blob/master/zcash-zebra/deploy.yaml) dosyasını manuel olarak yapıştırmak istiyorsanız:

-> *zebra-akash.yml* içeriğini kopyalayın

-> SDL düzenleyicisine yapıştırın

-> Gerektiği gibi düzenleyin (aşağıdaki yapılandırma bölümüne bakın)

-> **"Create Deployment"** düğmesine tıklayın


#### Adım 3: Depozitoyu Gözden Geçirin ve Onaylayın

Console size şunları gösterecektir:

-> **Deployment depozitosu**: ~5 AKT (deployment'ı kapattığınızda bunu geri alırsınız)

-> **Tahmini maliyet**: SDL fiyatlandırmanıza göre

**"Approve"** düğmesine tıklayın ve işlemi Keplr içinde imzalayın.

#### Adım 4: Bir Sağlayıcı Seçin

Yaklaşık 30 saniye sonra sağlayıcılardan teklifleri göreceksiniz. Her teklif şunları gösterir:

-> **Blok başına fiyat** (AKT veya USDC cinsinden)

-> **Aylık tahmini maliyet**

-> **Sağlayıcı detayları** (çalışma süresi, bölge vb.)


**Sadece en ucuzu seçmeyin.** Şunları kontrol edin:

-> Çalışma süresi yüzdesi (hedef > %95)

-> Bölge (size daha yakın = daha iyi gecikme, ancak blockchain node'ları için çok önemli değil)

-> Denetlenmiş durumu (yeşil onay işareti = daha güvenilir)


Seçtiğiniz sağlayıcıda **"Accept Bid"** düğmesine tıklayın ve Keplr'da imzalayın.

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

```bash
zebra-8233: provider-hostname.com:31234
```

Bu, node'unuzun **genel P2P uç noktasıdır**. Diğer Zcash node'ları bu adres üzerinden size bağlanacaktır.

**Port eşlemesine dikkat edin:** SDL'de 8233 portunu yapılandırdınız, ancak Akash bunu farklı bir genel porta atadı (bu örnekte 31234). Bu normaldir - bu sizi şaşırtıyorsa üstteki "Akash'ta Port Eşleme" bölümüne bakın. Node'unuza burada Akash'ın gösterdiği porttan erişilir; bu port mutlaka 8233 olmak zorunda değildir.

RPC'yi etkinleştirdiyseniz (SDL'de varsayılan olarak yorum satırına alınmıştır), RPC uç noktasını da burada kendi eşlenmiş portuyla göreceksiniz.

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

**Port eşleme hatırlatması**: RPC'yi global olarak dışa açsanız bile Akash bunu rastgele yüksek bir porta eşler (8232/18232 değil). Gerçek genel uç noktayı görmek için deployment'ınızdaki URI'leri kontrol edin. *global: false* için (önerilir), RPC uç noktası genel internetten değil, yalnızca Akash deployment ağı içinden erişilebilir olur.

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

-> **"Update"** düğmesine tıklayın ve Keplr'da onaylayın

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

-> Onaylayın ve Keplr'da imzalayın

5 AKT depozitonuz iade edilir. **Kalıcı depolama** sağlayıcı tarafından korunmalıdır, ancak buna güvenmeyin - buna diğer cloud sağlayıcıları gibi yaklaşın.

### Sorun Giderme

#### "Insufficient funds" hatası

Daha fazla AKT'ye ihtiyacınız var. Keplr cüzdanınıza fon ekleyin.

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

Console üzerinden harcamanızı izleyin:

-> **My Deployments** -> Deployment'ınız -> "Cost per month" tahminini gösterir

-> Keplr cüzdan bakiyeniz zamanla azalacaktır


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

**Akash Console**: [https://console.akash.network](https://console.akash.network)

**Akash Belgeleri**: [https://akash.network/docs/](https://akash.network/docs/)

**Zebra Belgeleri**: [https://zebra.zfnd.org/](https://zebra.zfnd.org/)

**Zcash Explorer'ları**: [https://zechub.wiki/using-zcash/blockchain-explorers](https://zechub.wiki/using-zcash/blockchain-explorers)

**Akash Discord**: [https://discord.akash.network](https://discord.akash.network) (sağlayıcı sorunları için)
