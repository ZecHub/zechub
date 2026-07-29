# zcashd'yi Akash Üzerinden Konsol ile Dağıtma

Guide for deploying a zcashd Zcash full node (Electric Coin Co implementation) using [Akash Console](https://console.akash.network). Here is a video tutorial below. A more in-depth guide can be found below.

<div className="my-8 w-full aspect-video max-w-3xl mx-auto rounded-2xl overflow-hidden shadow-lg bg-black">
  <iframe
    className="w-full h-full"
    src="https://www.youtube.com/embed/SVekeNU6_-g"
    title="Zcash Full Node setup on Akash Network"
    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
allowFullScreen
    loading="lazy"
  />
</div>


## Ne Dağıtıyor Olacaksınız

Sync edilecek tam zcashd düğümü:

-> Tüm Zcash blockchain'ini (mainnet için 350GB+, testnet için ~40GB)

-> AKT token fiyatlarına bağlı olarak ayda yaklaşık $15 maliyeti olacak

-> Tamamen senkronize olmak birkaç saat ila günler sürebilir

-> 4 vCPU, 16 GB RAM, 350 GB depolama (mainnet) veya 2 vCPU, 8 GB RAM, 50 GB (testnet)

-> İlk çalıştırma sırasında kriptografik parametreleri indirme (~2 GB, tek seferlik)

**zcashd vs Zebra:**

-> zcashd, Electric Coin Co tarafından orijinal Zcash düğümü uygulamasıdır

-> Zebra, Zcash Foundation'ün alternatif uygulamasıdır

-> Her ikisi de Zcash ağı ile uyumludur

-> zcashd daha fazla özellik sunar (madencilik, cüzdan, Insight Explorer API)

-> Cüzdan işlevi veya özel RPC API'leri gerekirse zcashd kullanın


### **Önemli: Akash'ta Port Haritalama**

Akash üzerinde bir portu açtığınızda (örneğin, zcashd P2P için 8233 portu), bu **sağlayıcının genel IP'sine tam olarak o portla bağlanmaz**. Bunun yerine sağlayıcı, rastgele yüksek bir port atar (örneğin 31234 veya 42567) ve bunu konteynerinizin 8233 portuna ters proxy yapar.

Bu tasarımın amacı - sağlayıcılar birden fazla dağıtım çalıştırır ve herkes doğrudan 8233 portunu kullanmaya çalışırsa çakışmalar olurdu.

**Bunun sizin için ne anlama geldiğini:**

-> SDL'de (zcashd'un standart P2P portu) port 8233 yapılandırırsınız

-> Akash, size *provider.com:31234* gibi bir URI verir

-> Diğer Zcash düğümleri sizinle *provider.com:31234* üzerinden bağlanır

-> Konteyneriniz içinde zcashd hâlâ 8233 portunu dinler


Bu, otomatik olarak işlenir. Sadece Akash'ın size verdiği URI'yi kullanın.

## Önkoşullar

-> **Keplr Cüzdanı** tarayıcı eklentisi kurulmuş olmalı (Chrome/Brave/Firefox)

-> **AKT tokenları** - 50-100 AKT'yi bir borsadan alın (Coinbase, Kraken, Osmosis)

-> **5 dakika**, Console UI üzerinden tıklamak için


## Adım 1: Cüzdanınızı Bağlayınız

-> Go to [https://console.akash.network](https://console.akash.network)

-> Üst sağ köşedeki **"Cüzdanı Bağla"**'ya tıklayın

-> **Keplr** (veya tercih ettiğiniz Cosmos cüzdanı) seçin

-> Keplr açıldığında bağlantıyı onaylayın


Cüzdanınızda AKT bakiyeniz üst sağ köşede görünmelidir. Eğer sıfır ise, önce cüzdanınızı doldurun.

## Adım 2: Dağıtım Oluşturun

-> **"Dağıt"** butonuna tıklayın (sayfanın ortasında büyük mavi buton)

-> **"Şablonunuzu oluşturun"** (veya SDL yükleme bölümüne doğrudan geçin)

### Seçenek A: SDL Dosyasını Yükleme (Tavsiyelenir)

[![Akash üzerinde Dağıt](https://raw.githubusercontent.com/akash-network/console/refs/heads/main/apps/deploy-web/public/images/deploy-with-akash-btn.svg)](https://console.akash.network/new-deployment?step=edit-deployment&templateId=akash-network-awesome-akash-zcash-zcashd)

### Seçenek B: SDL Düzenleyici Kullanımı

SDL'yi elle yapıştırmak istiyorsanız:

-> *zcashd-akash.yml*'in içeriğini kopyalayın

-> SDL düzenleyiciye yapıştırın

-> Gerekirse yapılandırmayı değiştirin (aşağıdaki yapılandırma bölümüne bakın)

-> **"Dağıtım Oluştur"**'a tıklayın


## Adım 3: Dağıtımı ve Hesaplamayı Onaylayınız

Console şu bilgileri size gösterecektir:

-> **Dağıtım yatırımı**: ~5 AKT (dağıtımdan kapatıldığında bu paranı geri alacaksınız)

-> **Tahmini maliyet**: SDL fiyatlandırmasına göre


**"Onayla"**'ya tıklayın ve Keplr'de işlemi imzalayın.

## Step 4: Choose a Provider

After ~ 30 seconds, you'll see bids from providers. Each bid shows:

-> **Price per block** (in AKT or USDC)

-> **Monthly estimated cost**

-> **Provider details** (uptime, region, etc.)


**Don't just pick the cheapest.** Check:

-> Uptime % (aim for > 95%)

-> Region (closer to you = better latency, but doesn't matter much for blockchain nodes)

-> Audited status (green checkmark = more trustworthy)


Click **"Accept Bid"** on your chosen provider and sign in Keplr.

## Step 5: Wait for Deployment

Console will:

-> Create the lease with your chosen provider

-> Send the manifest (tells the provider what to run)

-> Start your container


This takes 1-2 minutes. You'll see status updates in the UI.

## Step 6: Verify It's Running

Once deployed, you'll see:

-> **Services** tab: Shows your *zcashd* service with status

-> **Logs** tab: Live logs from your zcashd node

-> **Leases** tab: Details about your deployment (DSEQ, provider, cost)


### Check the Logs

Click on **Logs** and you should see zcashd starting up:

```bash
[zcashd]: ZCASHD_NETWORK=mainnet
[zcashd]: Starting: zcashd -printtoconsole -showmetrics=1
...
```

**İlk çalıştırma, zcash-params (~2GB) indirecektir.** Bu işlem tek seferlik ve sağlayıcının bant genişliğine bağlı olarak 5-10 dakika sürebilir. Sonraki yeniden başlatmalar bu adımı atlar.

Senkronizasyon, **saatlerden günler** sürebilir; ağına bağlıdır. Dikkat etmen gerekenler:

-> Artan blok yükseklikleri

-> Eş bağlantıları (10-30 eş olmalıdır)

-> Tekrarlayan hata yokluğu


## Adım 7: Node'nun Adresini Alın

**Leases** sekmesine tıklayın, ardından **URIs**.

Bir şey gibi görünecektir:

```
zcashd-8233: provider-hostname.com:31234
```

Bu, node'nun **kamu P2P noktası**dır. Diğer Zcash düğümleri bu adrese bağlanacaktır.

**Port haritalama dikkat edin:** SDL'de port 8233 yapılandırıldığında, Akash farklı bir kamu portuna (örnekteki 31234) atadı. Bu normaldir - bunu karıştıranlar "Akash'ta Port Haritalaması" başlığındaki bölümü inceleyebilir. Node'nuz, Akash'ın burada gösterdiği porta erişilebilir; mutlaka 8233 olmayabilir.

RPC etkinse (SDL'de varsayılan olarak yorum satırında), burada RPC noktası ve kendi haritalanmış portu da görünecektir.

## Yapılandırma Seçenekleri

### Testnet'e Geçiş

SDL varsayılan olarak Mainnet'tir. Bunun yerine Testnet kullanmak için:

-> **Ağ ayarını *env* bölümünde değiştirin:**

   ```yaml
# - "ZCASHD_NETWORK=mainnet"
- "ZCASHD_NETWORK=testnet"
   ```

-> **Açık portu** *expose* bölümünde güncelleyin:

   ```yaml
# Mainnet portunu yorumlayın:
# - port: 8233
   #   as: 8233
   #   to:
#     - global: true
#   proto: tcp

# Testnet portunu açın:
- port: 18233
     as: 18233
     to:
- global: true
proto: tcp
   ```

-> **İsteğe Bağlı: Kaynakları Azalt** Testnet için *profiles.compute.zcashd.resources*:

   ```yaml
cpu:
units: 2  # 4'ten azaltıldı
memory:
size: 8Gi  # 16Gi'den azaltıldı
storage:
- size: 50Gi  # 150Gi'den azaltıldı
   ```

-> **İsteğe Bağlı: Fiyatları Düşür** *profiles.placement.akash.pricing* içinde:

   ```yaml
amount: 5000  # 10000'den azaltıldı
   ```

> not: fiyatların düşürülmesi sağlayıcılarımızın teklif vermesini engelleyebilir. bu değeri deneyin veya sağlayıcı uç noktasını kullanarak onların teklif vereceğini kontrol edin. (sağlayıcı api belgelerini inceleyin)

### RPC Erişimi Aktif Et

RPC varsayılan olarak güvenlik nedeniyle devre dışıdır. Aktif etmek için:

**Kritik: Güçlü kimlik bilgileri ayarlayın.** zcashd RPC kullanıcı adı/parolayı HTTP üzerinden (HTTPS değil) iletir. RPC'yi sadece güvenlik sonuçlarını anladığınızda aktif edin.

-> *env* bölümünde yorum satırını kaldırın:

   ```yaml
- "ZCASHD_RPCUSER=yourusername"
- "ZCASHD_RPCPASSWORD=your_very_strong_password_here"  # Gerçek bir parola kullanın
- "ZCASHD_RPCBIND=0.0.0.0"
- "ZCASHD_RPCPORT=8232"  # Mainnet
# - "ZCASHD_RPCPORT=18232"  # Testnet
- "ZCASHD_ALLOWIP=0.0.0.0/0"  # Her yerden izin ver (dikkatli kullanın)
   ```

-> *expose* içinde RPC portunu yorum satırından kaldırın:

**Mainnet için:**

   ```yaml
- port: 8232
     as: 8232
     to:
- global: false  # Güvenlik için iç kullanın
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

**Uyarı**: RPC için *global: true* ayarladığınızda, temel kimlik doğrulamasıyla internete açık hale gelir. Bu iyi bir fikir değildir. *global: false* kullanın ve Akash iç ağı üzerinden RPC'ye erişin veya güvenli tünel kurun.

**Port haritalama hatırlatması**: RPC'yi küresel olarak açsanız bile, Akash bunu rastgele yüksek bir port (8232/18232 değil) ile eşler. Dağıtımınızda URI'leri kontrol ederek gerçek halka açık uç noktayı görün. *global: false* (önerilen), RPC uç noktası yalnızca Akash dağıtım ağı içinde erişilebilir, halka açık internetten değil.

### İşlem İndeksi Aktif Et

İşlem indeksi, RPC üzerinden işlem ID'siyle herhangi bir işlemi sorgulamanıza olanak tanır. Daha fazla depolama alanı kullanır (~%20 artış).

*env* içinde yorumu kaldırın:

```yaml
- "ZCASHD_TXINDEX=1"
```

**Uyarı**: Mevcut senkronize edilmiş bir düğümde txindex etkinleştirmek, tam blockchain'in tekrar indekslenmesini gerektirir ve saatler sürebilir.

### Insight Explorer Aktif Et

Insight Explorer, blok zinciri verileri için ek REST API uç noktaları sağlar (blok tarayıcıları için faydalıdır).

*env* içinde yorumu kaldırın:

```yaml
- "ZCASHD_INSIGHTEXPLORER=1"
```

Bu, txindex'i otomatik olarak etkinleştirir ve ek RPC yöntemleri ekler.

### Prometheus Metrikleri Aktif Et

Gözetim için metrikleri toplamak için:

-> *env* içinde yorumu kaldırın:

   ```bash
- "ZCASHD_PROMETHEUSPORT=9969"
- "ZCASHD_METRICSIP=0.0.0.0/0"
   ```

-> *expose* içinde metrik portunu yorumdan çıkarın:

   ```bash
- port: 9969
     as: 9969
     to:
- global: false
proto: tcp
   ```
   
Metrikler, Prometheus formatında http://yourendpoint:9969/metrics adresinden kullanılabilir.

### Kaynaklar/Fiyatlandırma Ayarla

Eğer teklif alamıyorsanız veya maliyeti optimize etmek istiyorsanız:

**Düşük özellikli sağlayıcılar için**, *profiles.compute.zcashd.resources* bölümünde azaltın:

-> CPU: *units: 2* (uygun senkronizasyon hızı için minimum)

-> Bellek: *size: 12Gi* (kararlılık için minimum)

-> Depolama: *size: 120Gi* (mainnet için minimum)


**Daha fazla teklif almak için**, *profiles.placement.akash.pricing* bölümünde artırın:

-> Mainnet: *amount: 15000* uakt/block deneyin

-> Testnet: *amount: 7500* uakt/block deneyin


SDL değerleri koruyucu olarak yüksek ayarlanmıştır. Çoğu sağlayıcı daha düşük teklifler sunacaktır.

## Dağıtımınızı Güncellemek

Dağıtımdan sonra yapılandırmayı değiştirmek istiyorsanız:

-> Konsol'daki **Benim Dağıtımlarım** bölümüne gidin

-> zcashd dağıtımınızı bulun

-> **"Dağıtımı Güncelle"**'ye tıklayın

-> SDL'i düzenleyin

-> **"Güncelle"**'ye tıklayıp Keplr'de onaylayın


**Not**: Güncellemek, konteynerinizi yeniden başlatır. Düğüm, kaydedilmiş durumundan (kalıcı depolama) devam eder ama 1-2 dakika kesinti beklenmelidir.

## İzleme

### Konsoldan

-> **Günlükler sekmesi**: Aktif konteyner günlükleri

-> **Shell sekmesi**: Konteyner içine shell alın (hata ayıklama için faydalıdır)

-> **Etkinlikler sekmesi**: Kubernetes etkinlikleri (şeyler bozulmazsa genellikle faydalı değildir)


### RPC üzerinden (etkinse)

Eğer RPC'yi etkinleştirdiyseniz, düğümünüzü normal bir zcashd tam düğümü olarak sorgulayabilirsiniz (çünkü budur!)

### zcash-cli Alternatifi

Konsol üzerinden kabuk erişiminiz varsa, *zcash-cli*'yi doğrudan kullanabilirsiniz:

```bash
# Konsoldaki **Shell sekmesinden**
zcash-cli getblockchaininfo
zcash-cli getpeerinfo
zcash-cli getinfo
```

## Dağıtımınızı Kapatma

Dağınık oldunuz veya ödeme yapmamak istiyorsanız:

-> **Benim Dağıtımlarım**a git

-> zcashd dağıtımınızı bulun

-> **"Dağıtımı Kapat"**'a tıklayın

-> Keplr ile onaylayıp imzalayın


5 AKT yatırımlarınız geri ödenecektir. **Kalıcı depolama**, sağlayıcı tarafından korunmalıdır, ancak bunu bir garantisi olarak görmeyin - diğer bulut sağlayıcısına benzeyen şekilde davranın.

## Sorun Giderme

### "Yetersiz bakiye" hatası

### Tekliflerin görünmemesi

Either:

-> Fiyatınız çok düşüktür (SDL'deki *miktarı* artırın)

-> Kaynak gereksinimleriniz mevcut sağlayıcılar için çok yüksektir (CPU/hafıza/depolama azaltın)

-> Daha uzun bekleyin (bazen tekliflerin görünmesi 60-90 saniye sürebilir)

### Dağıtım "beklemede" takılı kalmış


Dağıtımınız "beklemede" durumunda takılı kalmışsa

Sağlayıcıda bir sorun olabilir. Dağıtımını kapatıp farklı bir sağlayıcı deneyin.

### zcashd günlüklerinde "No peers connected" gösteriliyor

Bu, ilk birkaç dakika boyunca normaldir. zcashd zamanla eşlerini otomatik olarak keşfedecektir. 10+ dakika sonra hâlâ devam ederse ağ sorunu olabilir (Akash'ta muhtemelen değil).

### Günlüklerde "Out of memory" hatası

RAM'e tasarruf ettiniz. Dağıtımınızı kapatıp en az 12Gi RAM (16Gi önerilir) ile yeniden dağıtın.

### Senkronizasyon çok uzun sürüyor

"Forever" ne demek?

-> **Saatler**: Normal

-> **Günler**: Baştan başlayarak mainnet için de normaldir

-> **Haftalar**: Bir şey yanlış, günlüklerdeki hataları kontrol edin


### "Error fetching zcash-params" hatası

Sağlayıcıda ağ sorunu veya yavaş bant genişliği olabilir. Genellikle kendiliğinden çözülür. 30 dakikadan uzun sürerse farklı bir sağlayıcıya yeniden dağıtmayı deneyin.

### RPC kimlik doğrulama hataları

-> *ZCASHD_RPCUSER* ve *ZCASHD_RPCPASSWORD*'in doğru ayarlandığını kontrol edin

-> Doğru portun kullanıldığını kontrol edin (mainnet için 8232, testnet için 18232)

-> Portlar Akash tarafından haritalanır - doğrudan 8232 yerine dağıtımınızdan elde ettiğiniz URI'yi kullanın


## Maliyet Yönetimi

Konsol'da harcamalarınızı izleyin:

-> **My Deployments** -> Dağıtımınız -> "Ayda maliyet" tahmini gösterir

-> Keplr cüzdan bakiyeniz zamanla azalacaktır


Bakiyeniz düşük olduğunda Akash dağıtımınızı otomatik olarak kapatır. **Cüzdanınızı düzenli olarak tamamlayın** veya uyarılar kurun.

### Maliyeti Azaltma

-> **Testnet kullanın** üretim dışı testler için (yaklaşık %50 daha ucuz)

-> Hızlı senkronizasyon gerekmiyorsa **CPU/hafıza seviyesini düşürün**

-> **Daha ucuza sahip sağlayıcılar** seçin (her zaman akıllıca olmayabilir - süreklilik önemlidir)

-> **AKT yerine USDC kullanın** eğer AKT fiyatı dalgalansaydı (SDL fiyat değişikliği gerekir)

-> **txindex'i devre dışı bırakın** eğer ihtiyacınız yoksa (yaklaşık %20 depolama alanı tasarrufu sağlar)


### Ek Kaynaklar

**Akash Konsolu**: [https://console.akash.network](https://console.akash.network)

**Akash Dokümantasyonu**: [https://akash.network/docs/](https://akash.network/docs/)

**Zcash Keşifcileri**: [https://zechub.wiki/using-zcash/blockchain-explorers](https://zechub.wiki/using-zcash/blockchain-explorers)

**Akash Discord**: [https://discord.akash.network](https://discord.akash.network) (sağlayıcı sorunları için)

## Sonuç Notlar

- **Kalıcı depolama önemlidir.** *persistent: true* özelliğini atlamayın veya *beta2* sınıfını kullanmayın. *beta3* kullanın.
- **İlk senkronizasyon yavaş olabilir.** Sabırlı olun. Bu, blockchain düğümleri için normaldir.
- **Cüzdanınızı doldurun.** AKT'in bitmesi durumunda dağıtımlar otomatik olarak kapanır.
- **Yedeklemeler otomatik değildir.** Verilerinize değer veriyorsanız, kaybolabileceğini varsayın ve bunu göreli planlama yapın.
- **RPC güvenliği kritiktir.** Uygun güvenlik önlemleri alınmadığı sürece RPC'yi internete açık bırakmayın.
- **zcash-params önbelleğe alınır.** İlk çalıştırma yaklaşık 2 GB şifreleme parametresi indirir. Bu normaldir ve sadece bir kez gerçekleşir.
