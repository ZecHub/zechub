# Zcash Desteği ile BTCPay Server: Tam Kurulum ve Entegrasyon Rehberi

BTCPay Server, çevrimiçi işletmelerin aracı veya saklayıcı kullanmadan doğrudan kripto para ödemeleri kabul etmesini sağlar. Bu rehber, BTCPay Server'ı Zcash shielded ödemeleri için yerel destekle kurma sürecinin tamamında size adım adım yol gösterir.

> Bu dokümantasyon, Zcash’i BTCPay Server örneğinize entegre etmeye odaklanır.  
> Hem **tam düğüm (Zebra)** hem de **lightwalletd tabanlı kurulumları** destekler.

---

## İçindekiler

- [Neden Zcash ile BTCPay Server Kullanılmalı](#Why-Use-BTCPay-Server-with-Zcash)
- [BTCPay Server Nasıl Çalışır](#How-BTCPay-Server-Works)
- [Fonlar Nerede Saklanır? Özel Anahtarları Kim Kontrol Eder?](#Where-Are-Funds-Stored-Who-Controls-the-Private-Keys)
- [Zcash Kabul Etmek İçin BTCPay Server Nasıl Kurulur](#How-to-Set-Up-BTCPay-Server-for-Accepting-Zcash)
  - [Zcash Desteği ile BTCPay Server Kurulumu](#Deploying-BTCPay-Server-with-Zcash-Support)
  - [Kendi Zcash Tam Düğümünüzü Çalıştırma (Zebra + Lightwalletd)](#Running-Your-Own-Zcash-Full-Node)
  - [Harici bir lightwalletd Düğümüne Bağlanma (Özel Yapılandırma)](#Connecting-to-an-External-Lightwalletd-Node)
  - [BTCPay Server’ı Evde Cloudflare Tunnel ile Barındırma](#Hosting-BTCPay-Server-at-Home-with-Cloudflare-Tunnel)
- [BTCPay Server Web Arayüzünde Zcash Eklentisini Yapılandırma](#Configuring-the-Zcash-Plugin-in-the-BTCPay-Server-Web-Interface)
- [BTCPay Server’ı Web Sitenizle Entegre Etme](#Integrating-BTCPay-Server-with-Your-Website)
  - [API Entegrasyonu](#API-Integration)
    - [Bir API Anahtarı Oluşturma](#Generating-an-API-Key)
    - [Örnek: API ile Fatura Oluşturma](#Example-Creating-an-Invoice-via-API)
    - [Webhook Kurulumu](#Setting-Up-a-Webhook-Optional)
  - [CMS Entegrasyonu](#CMS-Integration)
  - [Ödeme Butonu veya Iframe](#Payment-Button-or-Iframe-No-CMS-or-API-Needed)
- [Sonuç](#Conclusion)
- [Kaynaklar](#Resources)


---

## Neden Zcash ile BTCPay Server Kullanılmalı

Çevrimiçi ticarette kripto para kabulü giderek yaygınlaşıyor. Hızlıdır, küreseldir ve bankalara ihtiyaç duymaz. Bu hem satıcılar hem de müşteriler için avantaj sağlar. Ancak birçok kişinin gözden kaçırdığı önemli bir ayrıntı vardır.

Sipariş verilirken müşteri genellikle kişisel bilgiler sağlar: ad, teslimat adresi ve telefon numarası. Ödeme Bitcoin, Ethereum ya da Ethereum veya Tron üzerindeki stablecoin’ler gibi herkese açık bir blokzincir kullanılarak yapılırsa, işlem analiz edilebilir biçimde kalıcı olarak görünür hale gelir.

Siparişin ne olduğunu bilmese bile herkes:

- ne zaman ve ne kadar ödeme yapıldığını görebilir  
- fonların nereden geldiğini ve nereye gittiğini izleyebilir  
- herhangi bir korelasyon noktası varsa (örneğin sızdırılmış bir e-posta ya da teslimat adı), bir kripto para adresini gerçek bir kişiyle ilişkilendirebilir

Bu, tek bir satın almanın müşterinin tüm finansal geçmişini açığa çıkarabileceği anlamına gelir.

Ve bu durum ters yönde de işler. Bir satıcının adresi zincir üzerinde herhangi bir zamanda görünmüşse, o da açığa çıkmış olur. Rakipler ve üçüncü taraf gözlemciler ödeme hacimlerini, tedarikçi faaliyetlerini ve iş akışlarının yapısını takip edebilir.

### BTCPay Server ve Zcash birleşimi bunu çözebilir.


BTCPay Server, kripto para ödemeleri almak için ücretsiz ve merkeziyetsiz bir sistemdir.  
Bir ödeme aracısı değildir ve hiçbir fon tutmaz. Tüm ödemeler doğrudan satıcının cüzdanına gider.  
Bu, kişisel bir cüzdan veya bir kuruluş içindeki çoklu imza kurulumu olabilir.

Sunucu koordinasyon görevlerini yerine getirir:

- her sipariş için benzersiz bir adres üretir  
- ödemenin ne zaman alındığını takip eder ve bunu siparişle ilişkilendirir  
- makbuzlar ve bildirimler düzenler  
- müşteri için bir ödeme arayüzü sunar  

Her şey, üçüncü taraf hizmetlere güvenmeden mağaza sahibinin kontrolü altında çalışır.

Zcash, sıfır bilgi ispatları üzerine kurulu bir kripto paradır. Tamamen gizli bir işlem modelini destekler.  
Shielded adresler kullanıldığında (bundan sonra kısaca “adresler” olarak anılacaktır), gönderen, alıcı ve işlem tutarı blokzincirde açığa çıkmaz.

Çevrimiçi mağazalar için bunun anlamı şudur:

- Alıcı, finansal geçmişini açığa çıkarmadan ödemeyi tamamlayabilir  
- Satıcı, adresini, satış hacmini veya işlem yapısını ifşa etmeden ödeme alabilir  
- Hiçbir dış gözlemci ödemeyi siparişle veya müşteri verileriyle ilişkilendiremez

### Pratik Örnek

Bir kullanıcı sipariş verir ve ödeme yöntemi olarak Bitcoin veya USDT seçer.  
Web sitesi bir ödeme adresi üretir ve tutarı gösterir.  
Ödeme yapıldıktan sonra bu adres blokzincirde saklanır ve herkese açık hale gelir.  
Bir saldırganın uzun vadede tüm işlem geçmişini görebilmesi için yalnızca tek bir siparişi bu adresle ilişkilendirmesi yeterlidir.

Şimdi aynı durumu Zcash ile düşünün.  
BTCPay Server bir shielded adres üretir. Alıcı ödemeyi gönderir.  
Blokzincirin bakış açısından hiçbir şey olmamış gibi görünür. Analiz edilecek herkese açık veri yoktur.  
Sunucu onayı alır, bunu siparişle ilişkilendirir ve süreci tamamlar.

Dışarıdan bakan biri için sanki hiçbir şey yaşanmamış gibidir.  
Tüm mantık mağaza ile müşteri arasında kalır - olması gerektiği gibi.

Bu çözüm otomasyondan veya kullanılabilirlikten ödün vermez.  
Her şey diğer kripto paralarda olduğu gibi çalışır, sadece veri sızıntısı riski olmadan.



## BTCPay Server Nasıl Çalışır

BTCPay Server, e-ticaret platformunuz ile blokzincir arasında bir ödeme işleme köprüsü görevi görür. Akış şu şekilde çalışır:

1. **Müşteri web sitenizde sipariş verir** (ör. WooCommerce, Magento veya BTCPay entegrasyonu olan herhangi bir platform).

2. **Mağaza, BTCPay Server’dan bir ödeme faturası talep eder.** Sunucu aşağıdakileri içeren benzersiz bir fatura üretir:
   - Sipariş tutarı
   - Geri sayım sayacı
   - Varsayılan olarak bir Orchard (shielded) alıcısı içeren bir Zcash Unified Address (UA) - ör. `u1...`

3. **Müşteri ödeme sayfasını görür** ve verilen adrese ZEC gönderir.

4. **BTCPay Server blokzinciri izler**, ödemeyi şu kriterlere göre kontrol eder:
   - Beklenen tutar
   - Alıcı adresi
   - Fatura zaman damgası

5. **İşlem algılanıp onaylandığında**, BTCPay mağazaya bildirim gönderir.

6. **Müşteri ödeme onayı alır.** İsteğe bağlı olarak sunucu e-posta yoluyla makbuz gönderebilir.

Bu sürecin tamamı **otomatik** olarak, hiçbir aracı veya saklayıcı olmadan gerçekleşir.  
BTCPay Server **hiçbir fon tutmaz** - yalnızca sipariş sistemini blokzincire güvenli ve gizli bir şekilde bağlar.
## Fonlar Nerede Saklanır? Özel Anahtarları Kim Kontrol Eder?

BTCPay Server bir cüzdan **değildir** ve **özel anahtar gerektirmez**.  
Tüm fonlar **doğrudan** satıcının cüzdanına gider. Güvenlik, **viewing key tabanlı bir mimari** kullanılarak sağlanır.

### Nasıl Çalışır

- **Cüzdan önceden oluşturulur.**  
  Satıcı, [YWallet](https://ywallet.app/installation) veya [Zingo! Wallet](https://zingolabs.org/) gibi viewing key destekleyen bir Zcash cüzdanı kullanır.  
  Tam listeye [ZecHub.wiki](https://zechub.wiki/wallets) üzerinden ulaşabilirsiniz.

- **BTCPay Server bir viewing key aracılığıyla bağlanır.**  
  Viewing key, **salt okunur bir anahtardır**: gelen ödemeleri algılayabilir ve yeni alım adresleri oluşturabilir,  
  ancak fon harcayamaz. Sunucu seed phrase veya özel anahtar saklamaz.

- **Blokzincir verilerine bir `lightwalletd` sunucusu üzerinden erişilir.**  
  `https://zec.rocks` gibi herkese açık bir düğüm kullanabilir veya tam egemenlik için kendi `Zebra + lightwalletd` yığınınızı çalıştırabilirsiniz.

- **Her sipariş benzersiz bir adres alır.**  
  Viewing key’ler, sunucunun her fatura için yeni Zcash shielded adresleri türetmesine olanak tanır,  
  böylece güvenli ödeme takibi sağlanır ve adres yeniden kullanımının önüne geçilir.

- **Fonlar üzerinde tam kontrol sizde kalır.**  
  Sunucu ele geçirilse bile kimse paranızı çalamaz - yalnızca ödeme metaverileri açığa çıkabilir.

Bu tasarım, **altyapıyı** **varlık kontrolünden** ayırır.  
BTCPay Server’ı herhangi bir fonu riske atmadan güncelleyebilir, taşıyabilir veya yeniden kurabilirsiniz.

## Zcash Kabul Etmek İçin BTCPay Server Nasıl Kurulur

Önceki bölümlerde BTCPay Server’ın Zcash ile nasıl çalıştığını ve gizliliği koruyan ödemeler açısından neden önemli olduğunu açıkladık. Şimdi uygulamaya geçme zamanı.

Tam kurulumunuz birkaç faktöre bağlı olacaktır:

- Zaten bir BTCPay Server örneğiniz var mı?
- Herkese açık bir lightwalletd kullanmak mı istiyorsunuz, yoksa kendi tam düğümünüzü mü çalıştıracaksınız?
- Sunucu bir VPS üzerinde mi yoksa evde mi çalışacak?

Bu bölüm, minimal kurulumlardan tamamen egemen dağıtımlara kadar tüm güncel yapılandırma senaryolarını kapsar.

Şunları adım adım ele alacağız:

- Tam düğüm (Zebra) dahil her şeyi bir VPS üzerinde sıfırdan nasıl kuracağınızı
- Gerçek IP’nizi gizli tutmak için **Cloudflare Tunnel** kullanarak BTCPay Server’ı evde nasıl çalıştıracağınızı
- BTCPay Server web arayüzü içinde Zcash desteğini nasıl etkinleştirip yapılandıracağınızı
- BTCPay’i web sitenize veya çevrimiçi mağazanıza nasıl entegre edeceğinizi


## Zcash Desteği ile BTCPay Server Kurulumu

Şimdi gerçek kuruluma geçelim. Bu bölümde BTCPay Server’ı Zcash desteğiyle kuracağız - ister yeni bir VPS üzerinde ister mevcut bir örneğe ZEC desteği ekleyerek.

BTCPay Server’ı zaten çalıştırıyorsanız (ör. BTC veya Lightning için), her şeyi yeniden kurmanıza gerek yok - yalnızca ZEC eklentisini etkinleştirmeniz yeterlidir.

Herkese açık bir `lightwalletd` düğümü kullanan minimal kurulumlardan kendi tam düğümünüzle tamamen egemen kurulumlara kadar çeşitli yapılandırmaları inceleyeceğiz.  
En iyi seçenek, sunucunuzun konumuna ve harici altyapıdan ne kadar bağımsız olmak istediğinize bağlıdır.

> Resmî eklenti dokümantasyonu:  
> [https://github.com/btcpay-zcash/btcpayserver-zcash-plugin](https://github.com/btcpay-zcash/btcpayserver-zcash-plugin)
>
> **Uyarı - örnek başına tek cüzdan:**  
> Zcash eklentisi, BTCPay örneğindeki **tüm mağazalar** için **tek bir ortak cüzdan** kullanır.  
> Bir örnek üzerinde birden fazla bağımsız mağaza barındırıyorsanız, aynı Zcash cüzdanını paylaşırlar.  
> Sıkı cüzdan izolasyonu gerekiyorsa ayrı örnekler kullanın.

---

### Önerilen VPS Yapılandırması

Kuruluma başlamadan önce şunlara sahip olduğunuzdan emin olun:

- **Ubuntu 22.04+** çalıştıran bir VPS
- Sunucunuzun IP adresine yönlenen bir alan adı (DNS aracılığıyla)
- Kurulu `git`, `docker` ve `docker-compose`
- Sunucuya SSH erişimi

---

## Sunucunuzu Hazırlama (gizli bölüm)

<details>
  <summary>Genişletmek için tıklayın</summary>

Zcash desteğiyle BTCPay Server kurmak için aşağıdakilere ihtiyacınız olacak:

### 1. Ubuntu 22.04 veya daha yenisiyle bir VPS

Minimal bir **Ubuntu Server 22.04 LTS** kurulumu kullanmanızı öneririz.  
Özel IP adresi sunan herhangi bir VPS sağlayıcısı işinizi görecektir.  

**Minimum gereksinimler**:  
- 2 CPU çekirdeği  
- 4 GB RAM  
- 40 GB disk alanı  

Zcash için lightwalletd kullanıyorsanız bu kurulum yeterlidir.  
Bir **tam Zcash düğümü** çalıştırmayı planlıyorsanız, **en az 300 GB** boş disk alanına ihtiyacınız olacaktır.

---

### 2. Sunucunuza yönlenen bir alan adı

DNS sağlayıcınızın panelinde, bir alt alan adı için `A` kaydı oluşturun  
(örneğin `btcpay.example.com`) ve bunu VPS IP adresinize yönlendirin.  

Bu alan adı, BTCPay Server’a tarayıcı üzerinden erişmek  
ve Let's Encrypt aracılığıyla otomatik olarak **ücretsiz bir SSL sertifikası** oluşturmak için kullanılacaktır.

---

### 3. Sunucuya SSH erişimi

BTCPay Server kurmak için VPS’nize SSH ile bağlanmanız gerekir.  
Terminalinizden şunu çalıştırın:

`ssh root@YOUR_SERVER_IP`

macOS, Linux veya Windows üzerinde WSL kullanıyorsanız SSH zaten terminalde mevcuttur.
Düz Windows’ta **PuTTY** gibi bir SSH istemcisi kullanın.

---

### 4. Git, Docker ve Docker Compose Kurulumu

SSH ile bağlandıktan sonra sistem paketlerinizi güncelleyin ve gerekli bileşenleri kurun:

```
sudo apt update && sudo apt upgrade -y
sudo apt install git curl docker.io docker-compose-plugin -y
sudo systemctl enable docker
```

> Ubuntu 22.04 ve sonrasında APT üzerinden gelen `docker-compose` artık kullanım dışıdır.
> Önerilen paket, `docker compose` komutunu sağlayan `docker-compose-plugin` paketidir (tire yerine boşluk olduğuna dikkat edin).

Sunucu ortamınız artık BTCPay Server kurulumu için hazır.

</details>

---

### Adım 1: Depoyu Klonlayın

Bir çalışma dizini oluşturun ve BTCPay Server Docker dağıtımını indirin:

```
mkdir BTCPayServer
cd BTCPayServer
git clone https://github.com/btcpayserver/btcpayserver-docker
cd btcpayserver-docker
```

---

### Adım 2: Ortam Değişkenlerini Dışa Aktarın

`btcpay.example.com` yerine kendi gerçek alan adınızı yazın:

```
export BTCPAY_HOST="btcpay.example.com"
export NBITCOIN_NETWORK="mainnet"
export BTCPAYGEN_CRYPTO1="btc"
export BTCPAYGEN_CRYPTO2="zec"
export BTCPAYGEN_REVERSEPROXY="nginx"
export BTCPAYGEN_LIGHTNING="none"
```

> Daha sonra Monero veya Litecoin eklemeyi planlıyorsanız, bunları şimdi de ekleyebilirsiniz:

```
export BTCPAYGEN_CRYPTO3="ltc"
export BTCPAYGEN_CRYPTO4="xmr"
```

Uygun değişkenleri dışa aktarıp kurulum betiğini yeniden çalıştırarak istediğiniz zaman yeni coin’ler ekleyebilirsiniz:

`. ./btcpay-setup.sh -i`

Bu rehberde ise **yalnızca Zcash** üzerine odaklanacağız.

---

### Adım 3: Kurulumu Çalıştırın

Sunucuyu derleyip başlatmak için kurulum betiğini çalıştırın:

`. ./btcpay-setup.sh -i`

Betik bağımlılıkları kuracak, `docker-compose.yml` dosyasını oluşturacak, servisleri başlatacak ve `systemd` yapılandırmasını yapacaktır.
Bu işlem yaklaşık 5 dakika sürer.

Tamamlandığında BTCPay Server örneğiniz şu adreste erişilebilir olacaktır:

`https://btcpay.example.com`

> Mevcut bir kurulumu değiştiriyorsanız (ör. ZEC eklemek gibi), yeni ayarlarla sunucuyu durdurup yeniden başlattığınızdan emin olun:

```
cd ~/BTCPayServer/btcpayserver-docker
btcpay-down.sh
. ./btcpay-setup.sh -i
```

Ardından BTCPay Server web arayüzünde Zcash’i yapılandırmak için sonraki bölüme geçin.



## Kendi Zcash Tam Düğümünüzü Çalıştırma

Herkese açık `lightwalletd` düğümlerine güvenmek istemiyorsanız, aynı sunucuda kendi tam Zcash düğümünüzü Lightwalletd ile birlikte dağıtabilirsiniz.  
Bu size **tam özerklik** sağlar - harici bağımlılık yok, güven gereksinimi yok.

---

### Adım 1: Yeterli Disk Alanı Olduğundan Emin Olun

Bir tam Zcash düğümü (Zebra + Lightwalletd) şu anda **300+ GB** disk alanı gerektirir ve bu miktar büyümeye devam etmektedir.

Döküm:

- Zebra blokzincir veritabanı: ~260-270 GB
- Lightwalletd indeksleme: ~15-20 GB

#### Önerilen depolama:

- Sunucu **yalnızca** Zcash ödemeleri için kullanılıyorsa **400 GB+**
- Sunucu ayrıca BTCPay Server, PostgreSQL, Nginx vb. de çalıştırıyorsa **800 GB+**

> İdeal olarak **1 TB kapasiteli** bir SSD/NVMe disk kullanın; özellikle de verileri düzenli olarak budamayı planlamıyorsanız.

---

### Adım 2: Ortam Değişkenlerini Ayarlayın

Tam düğüm yapılandırmasını etkinleştirmek için aşağıdakileri ortam kurulumunuza ekleyin:

```
export BTCPAYGEN_EXCLUDE_FRAGMENTS="zcash"
export BTCPAYGEN_ADDITIONAL_FRAGMENTS="zcash-fullnode"
```

Bu, BTCPay Server içinde hem `zebrad` hem de `lightwalletd` başlatan `zcash-fullnode` fragment’ını dahil edecektir.

---

### Adım 3: Kurulumu Yeniden Çalıştırın

`. ./btcpay-setup.sh -i`

Betik şunları yapacaktır:

* Zebra ve Lightwalletd için Docker imajlarını indirecek
* BTCPay yığını içinde servisleri kuracak
* Zcash eklentisini **yerel** `lightwalletd` örneğine bağlayacak

> **Tam blokzincir eşitlemesi birkaç gün sürebilir**, özellikle düşük kaynaklı VPS sunucularda.
> Eşitleme tamamlanana kadar shielded ödemeler kullanılamaz.


## Harici bir Lightwalletd Düğümüne Bağlanma

Çoğu durumda tam özerklik gerekli değildir - ve satıcılar tam bir Zcash düğümü çalıştırmak için zaman ve disk alanı harcamak istemeyebilir.  
Varsayılan olarak BTCPay Server, tüm blokzinciri indirmeden shielded ödemeleri işlemek için herkese açık bir `lightwalletd` düğümüne bağlanır.

Varsayılan uç nokta şudur:

`https://zec.rocks:443`

Ancak BTCPay Server’ı şu gibi **herhangi bir harici `lightwalletd` düğümüne** bağlanacak şekilde yapılandırabilirsiniz:

`https://lightwalletd.example:443`

Bu bölüm, bunun **özel bir Docker fragment’ı** kullanılarak nasıl yapılacağını gösterir.

> Tüm ortam değişkenlerini içeren eksiksiz bir yapılandırma örneği [eklenti deposunda](https://github.com/btcpay-zcash/btcpayserver-zcash-plugin/blob/master/docs/zcash-lightwalletd.custom.yml) mevcuttur.  
> Aşağıdaki adımlar minimal çalışan bir kurulumu gösterir.

---

### Adım 1: Özel bir Docker Fragment’ı Oluşturun

BTCPayServer proje dizininizde özel bir fragment dosyası oluşturun:

```
cd ~/BTCPayServer/btcpayserver-docker
mkdir -p docker-compose-generator/docker-fragments
nano docker-compose-generator/docker-fragments/zcash-lightwalletd.custom.yml
```

Aşağıdaki içeriği ekleyin:

```
exclusive:
- zcash
```

`exclusive` yönergesi, aynı etiketli (`zcash` bu örnekte) yalnızca bir fragment’ın aynı anda etkin olmasını sağlar.
Bu, yapılandırma çakışmalarını önler - örneğin `zcash-fullnode` fragment’ını ve bu özel harici `lightwalletd` fragment’ını aynı anda çalıştıramazsınız.
Onu `exclusive: zcash` olarak işaretleyerek BTCPay Server varsayılan `zcash-fullnode` ve dahili `lightwalletd` container’larını otomatik olarak devre dışı bırakır; böylece bunun yerine kendi harici düğümünüze bağlanabilirsiniz.

---

### Adım 2: Ortam Değişkenlerini Ayarlayın

Terminalde:

```
export BTCPAYGEN_EXCLUDE_FRAGMENTS="$BTCPAYGEN_EXCLUDE_FRAGMENTS;zcash"
export BTCPAYGEN_ADDITIONAL_FRAGMENTS="$BTCPAYGEN_ADDITIONAL_FRAGMENTS;zcash-lightwalletd.custom"
```

---

### Adım 3: Harici Düğüm Adresini Tanımlayın

`.env` dosyanızı açın:

`nano .env`

Seçtiğiniz uç noktayla URL’yi değiştirerek aşağıdaki satırı ekleyin:

`ZCASH_LIGHTWALLETD=https://lightwalletd.example:443`

Şunlardan birini kullanabilirsiniz:

* `https://lightwalletd.zcash-infra.com` gibi **herkese açık bir düğüm**
* BTCPay Server’dan ayrı olarak dağıtılmış, kendi barındırdığınız düğümünüz

> Harici `lightwalletd` kullanılamaz hale gelir veya aşırı yüklenirse, shielded ödemeler başarısız olur.
> Kritik servisler için **kararlı ve kendini kanıtlamış bir uç nokta** seçin (varsayılan `zec.rocks` gibi).

> `lightwalletd`’yi kendiniz mi barındırmak istiyorsunuz?
> [Zebra deposundaki](https://github.com/ZcashFoundation/zebra/blob/main/docker/docker-compose.lwd.yml) `docker-compose.lwd.yml` dosyasını kullanabilirsiniz.
> **Uyarı:** Bu kurulum resmî olarak belgelenmemiştir ve manuel TLS kurulumu, port yönlendirme ve güvenlik duvarı yapılandırması gerektirir - yalnızca ileri düzey kullanıcılar için önerilir.

---

### Adım 4: Kurulumu Yeniden Çalıştırın

`. ./btcpay-setup.sh -i`

BTCPay Server özel yapılandırmanızı uygulayacak ve belirtilen `lightwalletd` düğümüne bağlanacaktır.

Bundan sonra Zcash eklentisi, shielded işlemleri işlemek için bu harici uç noktayı kullanacaktır.


## BTCPay Server’ı Evde Cloudflare Tunnel ile Barındırma

BTCPay Server’ı Raspberry Pi 5 veya **statik IP’si olmayan** herhangi bir yerel sunucu gibi evdeki bir cihazda barındırırken Zcash ödemeleri kabul etmek mi istiyorsunuz?  
Örneğinizi internete güvenli şekilde açmak için **Cloudflare Tunnel** kullanabilirsiniz.

Bu yöntem port yönlendirmeden kaçınır ve gerçek IP adresinizi herkesten gizler - sunucunuzu HTTPS üzerinden erişilebilir tutarken.

Ayrıca bir VPS kiralama maliyetinden **kaçınmanıza** yardımcı olur; bu da kripto para ödemeleri işletmenizin çekirdeği değil, isteğe bağlı bir özellikse idealdir.

---

### Adım 1: Cloudflare Tunnel Kurulumu

1. [cloudflare.com](https://www.cloudflare.com) üzerinden bir hesap oluşturun ve alan adınızı ekleyin.
2. **Ev sunucunuzda** Cloudflare Tunnel’ı kurun:

```
sudo apt update
sudo apt install cloudflared --legacy
```

3. Cloudflare ile kimlik doğrulaması yapın:

`cloudflared tunnel login`

Bu komut bir tarayıcı penceresi açacaktır. Giriş yapın ve alan adınıza erişime izin verin.
Cloudflare otomatik olarak sunucunuzda bir token içeren `credentials` dosyası oluşturacaktır.

4. Yeni bir tunnel oluşturun (`btcpay` veya başka bir isim verebilirsiniz):

`cloudflared tunnel create btcpay`

Bu işlem tunnel kimliğini ve kimlik bilgilerini içeren bir `btcpay.json` dosyası üretir - bir sonraki adımda buna ihtiyacınız olacak.

---

### Adım 2: Tunnel Yapılandırma Dosyasını Oluşturun

Yapılandırma dizinini oluşturun (yoksa) ve yapılandırma dosyasını açın:

```
sudo mkdir -p /etc/cloudflared
sudo nano /etc/cloudflared/config.yml
```

Aşağıdaki yapılandırmayı yapıştırın:

```
tunnel: btcpay    # tunnel adınız
credentials-file: /root/.cloudflared/btcpay.json

ingress:
  - hostname: btcpay.example.com      # alan adınız
    service: http://127.0.0.1:80
  - service: http_status:404
```

#### Açıklama:

* `tunnel` - daha önce oluşturduğunuz tunnel’ın adı
* `credentials-file` - `cloudflared tunnel login` sırasında üretilen token dosyasının yolu
* `hostname` - Cloudflare’a kaydettiğiniz alan adınız (ör. `btcpay.example.com`)
* `service` - BTCPay Server’ınızın yerel adresi (genellikle Nginx için `http://127.0.0.1:80`)

> Cloudflare, ev IP’nizi açığa çıkarmadan trafiği yerel sunucunuza güvenli biçimde proxy’leyecektir.


### Adım 3: Tunnel’ınız için bir DNS Kaydı Ekleyin

Tunnel oluşturulduktan sonra Cloudflare genellikle alan adınız için **otomatik olarak bir CNAME DNS kaydı ekler**. Şu şekilde görünmelidir:

`btcpay.example.com -> <UUID>.cfargotunnel.com`

Otomatik olarak görünmezse manuel olarak ekleyin:

1. [Cloudflare Dashboard](https://dash.cloudflare.com/) sayfanıza gidin
2. **DNS** bölümüne geçin
3. Yeni bir CNAME kaydı ekleyin:
   - **Name**: `btcpay`
   - **Target**: `<UUID>.cfargotunnel.com`  
     Tam değeri `btcpay.json` dosyanızda veya şu komutu çalıştırarak bulabilirsiniz:
     
     `cloudflared tunnel list`
     
   - **Proxy status**: Enabled (turuncu bulut)

> Bu kayıt, `btcpay.example.com` adresine gelen tüm isteklerin Cloudflare Tunnel üzerinden yönlendirilmesini sağlar ve gerçek IP adresinizi kamudan gizler.

---

### Adım 4: Tunnel’ı Sistem Başlangıcında Etkinleştirin

Tunnel’ın açılışta otomatik çalışması için onu bir sistem servisi olarak kurun:

`sudo cloudflared service install`

Ardından servisi etkinleştirip başlatın:

```
sudo systemctl enable cloudflared
sudo systemctl start cloudflared
```

Durumu kontrol edin:

`sudo systemctl status cloudflared`

`Active: active (running)` gibi bir mesaj ve `btcpay.example.com` adresinin çevrimiçi olduğuna dair onay görmelisiniz.

> Bundan sonra tunnel her yeniden başlatmada otomatik olarak başlayacak ve BTCPay Server’ınız port yönlendirme olmadan ve gerçek IP’nizi açığa çıkarmadan herkese açık şekilde erişilebilir olacaktır.

---

### Adım 5: BTCPay Server Kurulumunu Tamamlayın

BTCPay Server’ı ilk kez kurmak üzereyseniz, kurulum betiğini çalıştırmadan önce alan adınızı ayarlayın:

`export BTCPAY_HOST="btcpay.example.com"`

Bu, **Nginx yapılandırması** ve **SSL sertifikaları** oluşturulurken doğru alan adının kullanılmasını sağlar.

BTCPay Server zaten kuruluysa ve siz yalnızca tunnel ekliyorsanız:

```
cd ~/BTCPayServer/btcpayserver-docker
. ./btcpay-setup.sh -i
```

Kurulum yapılandırmaları yeniden oluşturacak ve yeni alan adını uygulayacaktır.
Artık sunucunuza şu adresten erişebilmelisiniz:

`https://btcpay.example.com`

> İster herkese açık bir `lightwalletd`, ister kendi tam düğümünüzü kullanıyor olun, bu tunnel’ı etkilemez.
> Önemli olan tek şey, BTCPay Server’ın yerelde `127.0.0.1:80` üzerinde dinliyor olmasıdır.


## BTCPay Server Web Arayüzünde Zcash Eklentisini Yapılandırma

> **Çok mağazalı kurulumlar için önemli:**  
> Burada yapılandırılan Zcash cüzdanı örnek genelinde **küreseldir**. Ayrı BTCPay örnekleri çalıştırmadığınız sürece tüm mağazalar bu cüzdanı kullanacaktır.

BTCPay Server örneğinizi başarıyla kurduktan sonra, yönetici web arayüzü üzerinden bazı temel yapılandırmalar yapmanız gerekir.  
Resmî dokümantasyon tam talimatları İngilizce olarak sunar - burada temel adımları ele alacak ve özellikle Zcash eklentisinin yapılandırılmasına odaklanacağız.

---

### Adım 1: Web Arayüzüne Giriş Yapın

Örneğinizi şu adreste ziyaret edin:

`[https://btcpay.example.com](https://btcpay.example.com)`

- Yönetici giriş bilgilerinizi ve parolanızı girin.
- Bu ilk girişinizse, sizden bir hesap oluşturmanız istenir.
- Kaydettiğiniz ilk hesaba otomatik olarak yönetici yetkileri verilir.

---

### Adım 2: Zcash Eklentisini Kurun

1. Ana menüde şuraya gidin:

`Plugins -> Browse Plugins`

2. **Zcash (ZEC)** eklentisini bulun. Gerekirse arama çubuğunu kullanın.
3. **Install** düğmesine tıklayın ve onaylayın.

> Sunucu yapılandırması sırasında etkinleştirdiğiniz diğer altcoin’ler için de bu işlemi tekrarlayın.

Kurulumdan sonra, arayüzü etkin eklentilerle yeniden yüklemek için **Restart Server** düğmesine tıklayın.


### Adım 3: Cüzdanınızı Viewing Key ile Bağlayın

Eklentiyi kurduktan sonra ayarlar menüsünde yeni bir **Zcash** bölümü görünecektir.

1. Şuraya gidin:

`Zcash -> Settings`

2. **Unified Full Viewing Key (UFVK)** anahtarınızı yapıştırın - BTCPay her fatura için bir Unified Address türetecek ve gelen shielded ödemeleri algılayacaktır.

> **Not:** Eski Sapling viewing key’leri desteklenir, ancak Orchard/Unified Address kullanmak için bir **UFVK** sağlamalısınız.


   Örnek biçim:

`uview184syv9wftwngkay8d...`

3. Block height alanına bir değer girin

* **Yeni bir cüzdanla ilk kurulum (yeni seed phrase):** geçerli Zcash blok yüksekliğini girin (bunu 3xpl.com/zcash üzerinde kontrol edebilirsiniz) - bu başlangıç taramasını hızlandırır.
* **Aynı sunucuda eski, yalnızca Sapling kullanan bir kurulumdan Unified Addresses / Orchard’a geçiş yapıyorsanız:** bu alanı boş bırakın.
* **Mağazanızı aynı cüzdan/UFVK ile yeni bir sunucuya taşıyorsanız:** isteğe bağlı olarak birth height girin - bu, mağazanızın ilk ödenen siparişinin yaklaşık yüksekliğidir (taramayı daraltmak için sipariş tarihini 3xpl üzerinde eşleştirin). Emin değilseniz boş bırakın.

> Henüz tüm cüzdanlar **Unified Full Viewing Key (UFVK)** dışa aktarmayı desteklemiyor.  
> Önerilen seçenekler:  
> – [**YWallet**](https://ywallet.app/installation)  
> – [**Zingo! Wallet (PC sürümü)**](https://zingolabs.org/)  
> Her iki uygulamada da UFVK dışa aktarma seçeneğini yedekleme/dışa aktarma bölümünde arayın.

Bu anahtarlar **otomatik adres rotasyonunu** destekler; yani:
- Her müşteri **benzersiz** bir ödeme adresi alır
- Siz **tek, birleşik** bir bakiye görürsünüz

Daha geniş bir uyumluluk listesini [ZecHub -> Cüzdanlar](https://zechub.wiki/wallets) sayfasında bulabilirsiniz.

Tüm alanlar doldurulduktan sonra **Save** düğmesine tıklayın.

---

### ZEC Ödeme Akışınızı Test Edin

Tebrikler - Zcash cüzdanınız artık BTCPay Server’a bağlı.

Şimdi bir test yapalım:

1. Şuraya gidin:

`Invoices -> Create New`

2. ZEC cinsinden küçük bir tutar için test faturası oluşturun.
3. Fonları **farklı bir cüzdandan** gönderin (BTCPay’e bağlı olan cüzdandan değil).
4. İşlem algılandığında, fatura sayfasında görsel bir kutlama görüntülenecektir.
5. Fatura durumunun **Paid** olarak değiştiğini doğrulayın.

Her şey çalışıyorsa - artık ZEC ödemelerini API veya CMS eklentileri kullanarak web sitenize entegre etmeye hazırsınız.



## BTCPay Server’ı Web Sitenizle Entegre Etme

Zcash cüzdanınız BTCPay Server’a bağlandıktan sonra ödeme sistemini web sitenize entegre edebilirsiniz.  
Bunu yapmanın çeşitli yolları vardır - doğrudan API erişiminden popüler CMS platformları için hazır eklentilere kadar.

---

### Entegrasyon Seçenekleri

- **API Entegrasyonu**  
  Özel geliştirilmiş web siteleri veya CMS kullanmayan sistemler için idealdir.  
  Kendi arayüzünüz ve mantığınız içinde fatura oluşturma, ödeme takibi ve bildirimler üzerinde tam kontrol sağlar.  
  Temel programlama bilgisi gerektirir; bu nedenle bu işin geliştiriciniz tarafından yapılması en uygunudur.

- **CMS Eklentileri**  
  **WooCommerce**, **PrestaShop** ve diğer platformlar için mevcuttur.  
  Bu eklentiler, kod yazmadan yalnızca birkaç dakikada ödeme kabul etmenizi sağlar.

- **Ödeme Butonu veya Iframe**  
  En basit yöntemdir.  
  Bağış bağlantısı veya ödeme widget’ı gömmek istediğiniz açılış sayfaları, kişisel web siteleri veya herhangi bir site için mükemmeldir.

---

### API Entegrasyonu

Özel bir platform kullanıyorsanız (veya hiç CMS kullanmıyorsanız), en iyi seçenek API’dir.  
Size tam esneklik sağlar: faturalar oluşturabilir, durumlarını takip edebilir, bildirimler alabilir ve kullanıcı deneyimini tamamen kontrol edebilirsiniz.

> Not: Bazı CMS eklentileri de arka planda API kullanır; bu yüzden bir API anahtarı oluşturmak, entegrasyon yönteminiz ne olursa olsun çoğu zaman **gerekli ilk adımdır**.

Sonraki adım: mağazanız için bir API anahtarı oluşturun ve entegrasyonunuzu kurmak için [Greenfield API](https://docs.btcpayserver.org/API/Greenfield/v1/) kullanmaya başlayın.


### Bir API Anahtarı Oluşturma

BTCPay Server’ı web siteniz veya uygulamanızla entegre etmek için bir API anahtarı oluşturmanız gerekir.

1. BTCPay Server’a giriş yapın ve **kullanıcı menüsünü** açın (sağ üst köşe)
2. **API Keys** bölümüne gidin
3. **Create a new API key** seçeneğine tıklayın
4. Anahtarınız için bir ad girin
5. **Permissions** bölümünde şunları etkinleştirin:
   - `Can create invoice`
   - `Can view invoice`
   - *(İsteğe bağlı)* `Can modify store settings` - yalnızca mağaza düzeyinde yönetim gerekiyorsa

6. **Generate** düğmesine tıklayın. Kişisel API anahtarınız görüntülenecektir - bunu kopyalayın ve güvenli şekilde saklayın.

> Bu anahtar, mağazanızın faturalarına erişim sağlar.  
> Bunu herkese açık biçimde paylaşmayın veya istemci tarafı kodda açığa çıkarmayın.

---

### Örnek: API ile Fatura Oluşturma

**Uç nokta:**

```
POST /api/v1/stores/{storeId}/invoices
Authorization: token {apiKey}
Content-Type: application/json
```

**İstek gövdesi:**

```
{
  "amount": 5,
  "currency": "ZEC",
  "checkout": {
    "speedPolicy": "HighSpeed",
    "paymentMethods": ["Zcash"]
  }
}
```

**Yanıt:**

Şunları içeren bir JSON nesnesi alırsınız:

* `invoiceId`
* Web sitenize gömebileceğiniz veya müşteriye gönderebileceğiniz bir ödeme URL’si

Tam dokümantasyona bakın:
[Greenfield API – Fatura Oluştur](https://docs.btcpayserver.org/API/Greenfield/v1/#operation/CreateInvoice)

---

### Webhook Kurulumu (İsteğe Bağlı)

Fatura durumları değiştiğinde gerçek zamanlı bildirimler almak için (ör. ödeme alındığında):

1. Mağaza ayarlarınıza gidin -> **Webhooks**
2. BTCPay Server’dan gelen `POST` isteklerini işleyecek backend uç noktanızın URL’sini ekleyin
3. Bir fatura ödendiğinde veya süresi dolduğunda BTCPay otomatik olarak bildirim gönderecektir

Webhook yükleri ve yeniden deneme mantığı [resmî webhook dokümantasyonunda](https://docs.btcpayserver.org/FAQ/General/#how-to-create-a-webhook-) açıklanmıştır.

> Çeşitli programlama dilleri için örnek entegrasyonlar BTCPay dokümanlarında ve GitHub depolarında mevcuttur.



### CMS Entegrasyonu

BTCPay Server, popüler içerik yönetim sistemleri (CMS) için eklentileri destekler.  
En olgun ve yaygın kullanılan entegrasyon **WordPress + WooCommerce** ile olandır; bu da **kod yazmadan** ZEC ödemeleri kabul etmeyi kolaylaştırır.

---

#### WooCommerce (WordPress)

BTCPay Server, WooCommerce için bir eklentiyi resmî olarak destekler.

Entegrasyon adımları:

1. **BTCPay for WooCommerce** eklentisini WordPress eklenti dizininden veya GitHub’dan kurun.
2. WordPress yönetici panelinizde şuraya gidin:

`WooCommerce -> Settings -> Payments`

3. Listede **BTCPay** seçeneğini bulun ve **Set up** seçeneğine tıklayın
4. BTCPay Server URL’nizi girin ve yetkilendirme talimatlarını izleyin  
   (otomatik API anahtarı oluşturulması önerilir)
5. Ödeme yöntemini etkinleştirin ve ayarlarınızı kaydedin

> Ayrıntılı talimatlar, video eğitimler ve sorun giderme rehberleri eklenti dokümantasyonunda mevcuttur.

BTCPay dokümanlarının aynı bölümünde başka CMS entegrasyon seçeneklerini de bulabilirsiniz.

---

### Ödeme Butonu veya Iframe (CMS veya API Gerekmez)

CMS kullanmıyorsanız ve API’lerle uğraşmak istemiyorsanız, ZEC ödemeleri kabul etmenin en kolay yolu **bir ödeme bağlantısını veya widget’ı** doğrudan web sitenize gömmektir.

Bu yöntem şunlar için idealdir:

- Açılış sayfaları
- Portföy siteleri
- Bloglar veya statik sayfalar
- Backend sunucusu olmayan projeler

---

#### Seçenek 1: Ödeme Butonu (Bağlantı)

1. BTCPay Server’da **Invoices** bölümünde manuel olarak bir fatura oluşturun
2. Ödeme bağlantısını kopyalayın, örneğin:

`[https://btcpay.example.com/i/abc123](https://btcpay.example.com/i/abc123)`

3. Bağlantıyı HTML’inize ekleyin:

```
<a href="https://btcpay.example.com/i/abc123" target="_blank">
  ZEC ile Öde
</a>
```

---

#### Seçenek 2: Gömülü Fatura (Iframe)

Faturayı doğrudan sitenizde göstermek için bir iframe kullanın:

`<iframe src="https://btcpay.example.com/i/abc123" width="600" height="350" frameborder="0"></iframe>`

> Butonu veya iframe kapsayıcısını sitenizin tasarımına uyacak şekilde stillendirebilirsiniz - BTCPay Server, fatura sayfasında esnek tema özelleştirmesine izin verir.

## Sonuç

Bu rehber uzundu - ancak Zcash ödemelerini BTCPay Server ile entegre etmenin yalnızca temel yönlerini kapsıyor.

BTCPay Server arayüzü burada gösterdiklerimizden çok daha fazla işlev sunar. Neyse ki arayüz birden fazla dilde (Rusça dahil) mevcuttur; bu da daha fazla keşif yapmayı ve denemeyi kolaylaştırır.

BTCPay son derece esnek bir araçtır. Şunları yapabilirsiniz:

* Tek bir örnek üzerinde birden fazla bağımsız mağaza barındırmak
* Ekip üyeleri için sipariş görüntüleme ile sınırlı rolden tam yöneticiye kadar özel roller ve izinler tanımlamak
* Kendi alan adlarınızı ve markalamanızı kullanmak
* Webhook’lar, yedek cüzdanlar ve hatta Tor erişimi kurmak
* Vergi kuralları, indirim kodları, ödeme sayfası özelleştirmesi, ödeme yöntemi kısıtlamaları ve daha fazlası gibi gelişmiş ayarları yapılandırmak

BTCPay, merkezi ödeme sağlayıcılarına açık kaynaklı bir alternatif olarak geliştirildi. Aracı olmadan özel ZEC ödemeleri kabul etmek istiyorsanız, bu platform kesinlikle dikkatinizi hak ediyor.

BTCPay ekosistemini keşfederken ve ödemelerinizi gerçekten size ait hale getirirken başarılar dileriz.

## Kaynaklar

* [BTCPay Server Resmî Web Sitesi](https://btcpayserver.org/)
* [BTCPay SSS](https://docs.btcpayserver.org/FAQ/)
* [BTCPay Server GitHub Deposu](https://github.com/btcpayserver/btcpayserver)
* [BTCPay Server Mainnet Demosu](https://mainnet.demo.btcpayserver.org/login?ReturnUrl=%2F)
* [BTCPay için Zcash Eklentisi (GitHub)](https://github.com/btcpay-zcash/btcpayserver-zcash-plugin)
* [Zcash Eklentisi Kurulum Rehberi](https://github.com/btcpay-zcash/btcpayserver-zcash-plugin/blob/master/docs/installation.md)
* [Özel zcash-lightwalletd.custom.yml Örneği](https://github.com/btcpay-zcash/btcpayserver-zcash-plugin/blob/master/docs/zcash-lightwalletd.custom.yml)
* [Lightwalletd Docker Compose Dosyası (Zebra)](https://github.com/ZcashFoundation/zebra/blob/main/docker/docker-compose.lwd.yml)
* [BTCPay API Anahtarı Dokümanları (Greenfield API)](https://docs.btcpayserver.org/API/Greenfield/v1/#tag/API-Keys)
* [Bir Cloudflare Tunnel Oluşturun](https://developers.cloudflare.com/cloudflare-one/connections/connect-networks/get-started/create-remote-tunnel/)
* [Zcash Cüzdan Uyumluluk Listesi (ZecHub)](https://zechub.wiki/wallets)
* [Raspberry Pi 5 üzerinde Zebra + Lightwalletd (ZecHub)](https://free2z.com/ZecHub/zpage/zcash-101-zebra-lightwalletd-sync-journal-on-raspberry-pi-5)
