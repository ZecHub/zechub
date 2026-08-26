# zcashd'yi Console üzerinden Akash'a dağıtma

> **Kullanım amacıyla bir düğüm dağıtmak için bu kılavuzu izlemeyin. Kullanımdan kaldırılmıştır.**
>
> zcashd, 18 Temmuz 2026 tarihinde otomatik Destek Sonu durdurmasına ulaştı. Bugün dağıtılan bir zcashd düğümü zincirin en uç noktasına senkronize olmayacaktır; bu yüzden dağıtım her ay para harcar ve hiçbir çıktı üretmez.
>
> Bunun yerine **Zebra** dağıtın: [Akash Network üzerinde Zebra nasıl çalıştırılır](/guides/akash-network-zebra). Bu kılavuz aynı Akash Console iş akışını kapsar ve yaklaşık üçte bir disk alanına ihtiyaç duyar. Mevcut bir kurulumdan geçiş yapıyorsanız, [zcashd'den Zebra ve Zallet'e geçiş kılavuzuna](/guides/migration-guide-zcashd-to-zebrad-zallet) bakın.
>
> Bu sayfa, zcashd dağıtımının tarihsel kaydı olarak tutulmaktadır.

[Akash Console](https://console.akash.network) kullanarak bir zcashd Zcash tam düğümünü (Electric Coin Co implementasyonu) dağıtma kılavuzu. Aşağıda bir video eğitim bulunmaktadır. Daha ayrıntılı bir kılavuzu da aşağıda bulabilirsiniz.

<div className="my-8 w-full aspect-video max-w-3xl mx-auto rounded-2xl overflow-hidden shadow-lg bg-black">
  <iframe
    className="w-full h-full"
    src="https://www.youtube.com/embed/SVekeNU6_-g"
    title="Akash Network üzerinde Zcash Tam Düğüm kurulumu"
    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
    allowFullScreen
    loading="lazy"
  />
</div>


## Ne Dağıtıyorsunuz

Şunları yapacak bir tam zcashd düğümü:

-> Tüm Zcash blokzincirini senkronize edecek (mainnet için 350GB+, testnet için ~ 40GB)

-> AKT token fiyatlarına bağlı olarak yaklaşık aylık 15$ maliyeti olacak

-> Tam senkronizasyonun tamamlanması birkaç saatten birkaç güne kadar sürecek

-> 4 vCPU, 16GB RAM, 350GB depolama (mainnet) veya 2 vCPU, 8GB RAM, 50GB (testnet) kullanacak

-> İlk çalıştırmada kriptografik parametreleri indirecek (~ 2GB, tek seferlik)

**zcashd ve Zebra karşılaştırması:**

-> zcashd, Electric Coin Co tarafından geliştirilen özgün Zcash düğüm implementasyonuydu; 18 Temmuz 2026'dan beri durdurulmuştur

-> Zcash Foundation tarafından geliştirilen Zebra, bugün kullanılan tam düğümdür

-> Yalnızca Zebra mevcut zinciri takip eder; bir zcashd düğümü en uç noktaya ulaşamaz

-> zcashd cüzdanının yerini [Zallet](/using-zcash/zallet-quick-reference-guide) almıştır

-> Cüzdan işlevselliğine veya belirli RPC API'lerine ihtiyacınız varsa zcashd kullanın


### **Önemli: Akash'ta Port Eşleme**

Akash'ta bir portu dışa açtığınızda (ör. zcashd P2P için 8233 portu), bu port sağlayıcının genel IP'sinde **aynı porta bağlanmaz**. Bunun yerine sağlayıcı rastgele yüksek bir port (örneğin 31234 veya 42567) atar ve bunu container'ınızdaki 8233 portuna reverse-proxy eder.

Bu tasarım gereğidir; sağlayıcılar birden fazla dağıtım çalıştırır ve herkes doğrudan 8233 portunu kullanmaya çalışsaydı çakışmalar olurdu.

**Bunun sizin için anlamı:**

-> SDL içinde 8233 portunu yapılandırırsınız (zcashd'nin standart P2P portu)

-> Akash size *provider.com:31234* gibi bir URI verir

-> Diğer Zcash düğümleri size *provider.com:31234* adresinden bağlanır

-> Container'ınızın içinde zcashd hâlâ 8233 portunu dinler


Bu işlem otomatik olarak yönetilir. Sadece Akash'ın size verdiği URI'yi kullanın.

## Önkoşullar

-> **Keplr Wallet** tarayıcı eklentisi kurulu olmalı (Chrome/Brave/Firefox)

-> **AKT tokenları** - Bir borsadan (Coinbase, Kraken, Osmosis) 50-100 AKT alın

-> Console arayüzünde tıklayarak ilerlemek için **5 dakika**


## 1. Adım: Cüzdanınızı Bağlayın

-> [https://console.akash.network](https://console.akash.network) adresine gidin

-> Sağ üstteki **"Connect Wallet"** düğmesine tıklayın

-> **Keplr**'ı seçin (veya tercih ettiğiniz Cosmos cüzdanını)

-> Keplr açıldığında bağlantıyı onaylayın


AKT bakiyeniz sağ üstte görünmelidir. Sıfır görünüyorsa önce cüzdanınıza bakiye aktarın.

## 2. Adım: Dağıtım Oluşturun

-> **"Deploy"** düğmesine tıklayın (büyük mavi düğme, sayfanın ortasında)

-> **"Build your template"** seçeneğini seçin (veya doğrudan SDL yüklemeye geçin)

### Seçenek A: SDL Dosyası Yükle (Önerilir)

> **Bu düğme durmuş bir düğüm dağıtır.** Senkronize olamayan bir düğüm için AKT bakiyenizden ücret keser. Bunun yerine [Zebra kılavuzunu](/guides/akash-network-zebra) kullanın.

[![Akash üzerinde dağıt](/content-images/deploy-with-akash-btn-74abb88d44.svg)](https://console.akash.network/new-deployment?step=edit-deployment&templateId=akash-network-awesome-akash-zcash-zcashd)

### Seçenek B: SDL Editörünü Kullanın

SDL'yi manuel olarak yapıştırmak istiyorsanız:

-> *zcashd-akash.yml* içeriğini kopyalayın

-> SDL editörüne yapıştırın

-> Gerektiği gibi değiştirin (aşağıdaki yapılandırma bölümüne bakın)

-> **"Create Deployment"** düğmesine tıklayın


## 3. Adım: Depozitoyu İnceleyin ve Onaylayın

Console size şunları gösterecek:

-> **Dağıtım depozitosu**: ~ 5 AKT (dağıtımı kapattığınızda bunu geri alırsınız)

-> **Tahmini maliyet**: SDL fiyatlandırmanıza göre


**"Approve"** düğmesine tıklayın ve işlemi Keplr içinde imzalayın.

## 4. Adım: Bir Sağlayıcı Seçin

Yaklaşık 30 saniye sonra sağlayıcılardan teklifler göreceksiniz. Her teklif şunları gösterir:

-> **Blok başına fiyat** (AKT veya USDC cinsinden)

-> **Aylık tahmini maliyet**

-> **Sağlayıcı detayları** (çalışma süresi, bölge vb.)


**Sadece en ucuzu seçmeyin.** Şunları kontrol edin:

-> Çalışma süresi %'si (hedef > %95)

-> Bölge (size daha yakın = daha iyi gecikme, ancak blokzinciri düğümleri için çok önemli değildir)

-> Denetlenmiş durumu (yeşil onay işareti = daha güvenilir)


Seçtiğiniz sağlayıcıda **"Accept Bid"** düğmesine tıklayın ve Keplr'da imzalayın.

## 5. Adım: Dağıtımın Tamamlanmasını Bekleyin

Console şunları yapacak:

-> Seçtiğiniz sağlayıcı ile lease oluşturacak

-> Manifest'i gönderecek (sağlayıcıya ne çalıştıracağını söyler)

-> Container'ınızı başlatacak


Bu 1-2 dakika sürer. Arayüzde durum güncellemelerini göreceksiniz.

## 6. Adım: Çalıştığını Doğrulayın

Dağıtım tamamlandıktan sonra şunları göreceksiniz:

-> **Services** sekmesi: *zcashd* servisinizin durumunu gösterir

-> **Logs** sekmesi: zcashd düğümünüzden canlı loglar

-> **Leases** sekmesi: Dağıtımınızla ilgili ayrıntılar (DSEQ, sağlayıcı, maliyet)


### Logları Kontrol Edin

**Logs** bölümüne tıklayın; zcashd'nin başladığını görmelisiniz:

```bash
[zcashd]: ZCASHD_NETWORK=mainnet
[zcashd]: Starting: zcashd -printtoconsole -showmetrics=1
...
```

**İlk çalıştırmada zcash-params indirilecektir (~2GB).** Bu tek seferlik bir işlemdir ve sağlayıcının bant genişliğine bağlı olarak 5-10 dakika sürer. Sonraki yeniden başlatmalarda bu adım atlanır.

Senkronizasyon, ağa bağlı olarak **saatlerden günlere** kadar sürecektir. Şunları izleyin:

-> Artan blok yükseklikleri

-> Eş bağlantıları (10-30 eş olmalıdır)

-> Tekrarlanan hata olmaması


## 7. Adım: Düğümünüzün Adresini Alın

**Leases** sekmesine, ardından **URIs** bölümüne tıklayın.

Şuna benzer bir şey göreceksiniz:

```
zcashd-8233: provider-hostname.com:31234
```

Bu, düğümünüzün **genel P2P uç noktasıdır**. Diğer Zcash düğümleri bu adresten size bağlanacaktır.

**Port eşlemeyi not edin:** SDL içinde 8233 portunu yapılandırdınız, ancak Akash bunu farklı bir genel porta atadı (bu örnekte 31234). Bu normaldir; kafanızı karıştırıyorsa üstteki "Akash'ta Port Eşleme" bölümüne bakın. Düğümünüze erişim mutlaka 8233'ten değil, Akash'ın burada gösterdiği porttan sağlanır.

RPC'yi etkinleştirdiyseniz (SDL'de varsayılan olarak yorum satırıdır), burada kendi eşlenmiş portuyla birlikte RPC uç noktasını da göreceksiniz.

## Yapılandırma Seçenekleri

### Testnet'e Geçiş

SDL varsayılan olarak Mainnet kullanır. Bunun yerine Testnet kullanmak için:

-> **Ağ değerini *env* bölümünde değiştirin:**

   ```yaml
   # - "ZCASHD_NETWORK=mainnet"
   - "ZCASHD_NETWORK=testnet"
   ```

-> *expose* bölümünde **dışa açılan portu** güncelleyin:

   ```yaml
   # Mainnet portunu yorum satırı yapın:
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

-> *profiles.compute.zcashd.resources* içinde **İsteğe bağlı: Testnet için kaynakları azaltın**:

   ```yaml
   cpu:
     units: 2  # 4'ten düşürüldü
   memory:
     size: 8Gi  # 16Gi'den düşürüldü
   storage:
     - size: 50Gi  # 150Gi'den düşürüldü
   ```

-> *profiles.placement.akash.pricing* içinde **İsteğe bağlı: fiyatı düşürün**:

   ```yaml
   amount: 5000  # 10000'den düşürüldü
   ```

> not fiyatları düşürmek, sağlayıcıların teklif vermesini filtreleyebilir. bu değeri deneyerek ayarlayın veya teklif verip vermeyeceklerini kontrol etmek için sağlayıcı uç noktasını kullanın. (sağlayıcı api dokümantasyonunu inceleyin)

### RPC Erişimini Etkinleştirme

Güvenlik nedeniyle RPC varsayılan olarak devre dışıdır. Etkinleştirmek için:

**KRİTİK: Güçlü kimlik bilgileri belirleyin.** zcashd RPC, kullanıcı adı/parolayı HTTP üzerinden iletir (HTTPS değil). Güvenlik etkilerini anlıyorsanız yalnızca RPC'yi dışa açın.

-> *env* bölümünde yorumları kaldırın:

   ```yaml
   - "ZCASHD_RPCUSER=yourusername"
   - "ZCASHD_RPCPASSWORD=your_very_strong_password_here"  # Gerçek bir parola kullanın
   - "ZCASHD_RPCBIND=0.0.0.0"
   - "ZCASHD_RPCPORT=8232"  # Mainnet
   # - "ZCASHD_RPCPORT=18232"  # Testnet
   - "ZCASHD_ALLOWIP=0.0.0.0/0"  # Her yerden izin ver (dikkatli kullanın)
   ```

-> *expose* içinde RPC portunun yorumunu kaldırın:

   **Mainnet için:**

   ```yaml
   - port: 8232
     as: 8232
     to:
       - global: false  # Güvenlik için içeride tutun
     proto: tcp
   ```

   **Testnet için:**

   ```yaml
   - port: 18232
     as: 18232
     to:
       - global: false
     proto: tcp
   ```

**Uyarı**: RPC için *global: true* ayarlarsanız, onu basic auth ile internete açmış olursunuz. Bu kötü bir fikirdir. *global: false* kullanın ve RPC'ye Akash'ın iç ağı üzerinden erişin veya güvenli bir tünel kurun.

**Port eşleme hatırlatması**: RPC'yi global olarak dışa açsanız bile Akash onu rastgele yüksek bir porta eşleyecektir (8232/18232 değil). Gerçek genel uç noktayı görmek için dağıtımınızdaki URI'leri kontrol edin. *global: false* için (önerilir) RPC uç noktası genel internetten değil, yalnızca Akash dağıtım ağı içinden erişilebilir olur.

### İşlem İndeksini Etkinleştirme

İşlem indeksi, RPC üzerinden herhangi bir işlemi kimliğine göre sorgulamanıza imkân verir. Daha fazla depolama kullanır (~ %20 artış).

*env* içinde yorumu kaldırın:

```yaml
- "ZCASHD_TXINDEX=1"
```

**Uyarı**: Zaten senkronize olmuş bir düğümde txindex'i etkinleştirmek, tüm blokzincirinin yeniden indekslenmesini gerektirir; bu da saatler sürer.

### Insight Explorer'ı Etkinleştirme

Insight Explorer, blokzinciri verileri için ek REST API uç noktaları sağlar (blok gezginleri için kullanışlıdır).

*env* içinde yorumu kaldırın:

```yaml
- "ZCASHD_INSIGHTEXPLORER=1"
```

Bu, txindex'i otomatik olarak etkinleştirir ve ek RPC yöntemleri ekler.

### Prometheus Metriklerini Etkinleştirme

İzleme için metrikleri toplamak üzere:

-> *env* içinde yorumları kaldırın:

   ```bash
   - "ZCASHD_PROMETHEUSPORT=9969"
   - "ZCASHD_METRICSIP=0.0.0.0/0"
   ```

-> *expose* içinde metrik portunun yorumunu kaldırın:

   ```bash
   - port: 9969
     as: 9969
     to:
       - global: false
     proto: tcp
   ```
   
Metrikler Prometheus formatında http://yourendpoint:9969/metrics adresinde उपलब्ध olacaktır.

### Kaynakları/Fiyatlandırmayı Ayarlama

Teklif alamıyorsanız veya maliyeti optimize etmek istiyorsanız:

**Daha düşük özellikli sağlayıcılar için**, *profiles.compute.zcashd.resources* bölümünde azaltın:

-> CPU: *units: 2* (makul senkronizasyon hızı için minimum)

-> Bellek: *size: 12Gi* (kararlılık için minimum)

-> Depolama: *size: 120Gi* (mainnet için minimum)


**Daha fazla teklif çekmek için**, *profiles.placement.akash.pricing* içinde artırın:

-> Mainnet: *amount: 15000* uakt/block deneyin

-> Testnet: *amount: 7500* uakt/block deneyin


SDL değerleri temkinli şekilde yüksek ayarlanmıştır. Çoğu sağlayıcı daha düşük teklif verecektir.

## Dağıtımınızı Güncelleme

Dağıtımdan sonra yapılandırmayı değiştirmeniz mi gerekiyor?

-> Console içinde **My Deployments** bölümüne gidin

-> zcashd dağıtımınızı bulun

-> **"Update Deployment"** düğmesine tıklayın

-> SDL'yi düzenleyin

-> **"Update"** düğmesine tıklayın ve Keplr'da onaylayın


**Not**: Güncelleme container'ınızı yeniden başlatacaktır. Düğüm kaydedilmiş durumundan (kalıcı depolama) devam eder, ancak 1-2 dakikalık bir kesinti bekleyin.

## İzleme

### Console Üzerinden

-> **Logs sekmesi**: Canlı container logları

-> **Shell sekmesi**: Container içinde bir shell açın (hata ayıklama için kullanışlı)

-> **Events sekmesi**: Kubernetes olayları (bir şey bozulmadıkça çoğunlukla işe yaramaz)


### RPC Üzerinden (etkinleştirildiyse)

RPC'yi etkinleştirdiyseniz, düğümünüzü normal bir zcashd tam düğümü gibi sorgulayabilirsiniz (çünkü zaten öyle!)

### zcash-cli Alternatifi

Console üzerinden shell erişiminiz varsa, *zcash-cli*'yi doğrudan kullanabilirsiniz:

```bash
# Console içindeki Shell sekmesinden
zcash-cli getblockchaininfo
zcash-cli getpeerinfo
zcash-cli getinfo
```

## Dağıtımınızı Kapatma

İşiniz bittiğinde veya ücret ödemeyi durdurmak istediğinizde:

-> **My Deployments** bölümüne gidin

-> zcashd dağıtımınızı bulun

-> **"Close Deployment"** düğmesine tıklayın

-> Onaylayın ve Keplr'da imzalayın


5 AKT depozitonuz iade edilir. **Kalıcı depolama** sağlayıcı tarafından korunmalıdır, ancak buna güvenmeyin; bunu diğer tüm bulut sağlayıcıları gibi değerlendirin.

## Sorun Giderme

### "Insufficient funds" hatası

Daha fazla AKT'ye ihtiyacınız var. Keplr cüzdanınıza bakiye aktarın.

### Hiç teklif görünmüyor

Şunlardan biri olabilir:

-> Fiyatlandırmanız çok düşük (SDL içinde *amount* değerini artırın)

-> Kaynak gereksinimleriniz mevcut sağlayıcılar için çok yüksek (CPU/bellek/depolamayı azaltın)

-> Daha uzun bekleyin (bazen tekliflerin görünmesi 60-90 saniye sürebilir)


### Dağıtım "pending" durumunda takılı kalıyor

Sağlayıcı sorun yaşıyor olabilir. Dağıtımı kapatın ve farklı bir sağlayıcı deneyin.

### zcashd loglarında "No peers connected" görünüyor

18 Temmuz 2026 tarihindeki Destek Sonu durdurmasından beri bu, başlangıç gecikmesinden ziyade beklenen kalıcı durumdur ve ne kadar beklerseniz bekleyin ya da yeniden dağıtım yapın düzelmez. Bunun yerine [Zebra](/guides/akash-network-zebra) dağıtın.

### Loglarda "Out of memory" hataları

RAM'den fazla kısmışsınız. Dağıtımı kapatın ve en az 12Gi bellekle yeniden dağıtın (16Gi önerilir).

### Senkronizasyon çok uzun sürüyor

"Çok uzun" derken neyi kastediyorsunuz:

-> **Saatler**: Normal

-> **Günler**: Sıfırdan mainnet için bu da normal

-> **Haftalar**: Bir sorun var, hata olup olmadığını görmek için logları kontrol edin


### "Error fetching zcash-params"

Sağlayıcının ağ sorunları veya düşük bant genişliği olabilir. Bu genellikle kendiliğinden düzelir. 30 dakikadan uzun sürerse farklı bir sağlayıcıya yeniden dağıtmayı deneyin.

### RPC kimlik doğrulama hataları

-> *ZCASHD_RPCUSER* ve *ZCASHD_RPCPASSWORD* değerlerinin doğru ayarlandığını kontrol edin

-> Doğru portu kullandığınızı doğrulayın (mainnet için 8232, testnet için 18232)

-> Portların Akash tarafından eşlendiğini unutmayın; doğrudan 8232 yerine dağıtımınızdaki URI'yi kullanın


## Maliyet Yönetimi

Console içinde harcamalarınızı izleyin:

-> **My Deployments** -> Dağıtımınız -> "Cost per month" tahminini gösterir

-> Keplr cüzdan bakiyeniz zamanla azalacaktır


Bakiyeniz azaldığında Akash dağıtımınızı otomatik olarak kapatacaktır. **Cüzdanınıza düzenli olarak bakiye ekleyin** veya uyarılar kurun.

### Maliyetleri Azaltma

-> Üretim dışı testler için **Testnet kullanın** (%50 daha ucuz)

-> Hızlı senkronizasyona ihtiyacınız yoksa **CPU/belleği düşürün**

-> **Daha ucuz sağlayıcıları seçin** (her zaman akıllıca değildir, çalışma süresi önemlidir)

-> AKT fiyatı dalgalıysa **AKT yerine USDC kullanın** (SDL fiyatlandırma değişikliği gerekir)

-> İhtiyacınız yoksa **txindex'i devre dışı bırakın** (~ %20 depolama tasarrufu sağlar)


### Ek Kaynaklar

**Akash Console**: [https://console.akash.network](https://console.akash.network)

**Akash Dokümantasyonu**: [https://akash.network/docs/](https://akash.network/docs/)

**Zcash Gezginleri**: [https://zechub.wiki/using-zcash/blockchain-explorers](https://zechub.wiki/using-zcash/blockchain-explorers)

**Akash Discord**: [https://discord.akash.network](https://discord.akash.network) (sağlayıcı sorunları için)

## Son Notlar

- **Kalıcı depolama önemlidir.** *persistent: true* ayarını atlamayın ve *beta2* sınıfını kullanmayın. *beta3* kullanın.
- **İlk senkronizasyon yavaştır.** Sabırlı olun. Bu, blokzinciri düğümleri için normaldir.
- **Cüzdanınızı bakiyeli tutun.** AKT'niz bittiğinde dağıtımlar otomatik kapanır.
- **Yedeklemeler otomatik değildir.** Veriler sizin için önemliyse kaybolabileceğini varsayın ve buna göre plan yapın.
- **RPC güvenliği kritiktir.** Uygun güvenlik önlemleri olmadan RPC'yi internete açmayın.
- **zcash-params önbelleğe alınır.** İlk çalıştırma yaklaşık 2GB kriptografik parametre indirir. Bu normaldir ve yalnızca bir kez gerçekleşir.
