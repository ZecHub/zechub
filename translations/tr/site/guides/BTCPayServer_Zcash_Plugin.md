# BTCPay Server ve Zcash Desteği: Eksiksiz Kurulum ve Entegrasyon Rehberi

BTCPay Server, çevrim içi işletmelerin aracı veya saklama hizmeti sağlayıcısı olmadan doğrudan kripto para ödemelerini kabul etmesini sağlar. Bu rehber, BTCPay Server ürününü Zcash korumalı ödemeleri için yerel destekle kurma sürecinin tamamında size yol gösterir.

> Bu belgede Zcash ürününün BTCPay Server örneğinize entegre edilmesine odaklanılmaktadır.  
> Hem **tam düğüm (Zebra)** hem de **lightwalletd tabanlı kurulumlar** desteklenir.

---

## İçindekiler

- [BTCPay Server ürününü Zcash](#why-use-btcpay-server-with-zcash) ile neden kullanmalısınız?
- [BTCPay Server nasıl çalışır?](#how-btcpay-server-works)
- [Fonlar nerede saklanır? Özel anahtarları kim kontrol eder?](#where-are-funds-stored-who-controls-the-private-keys)
- [BTCPay Server ürününü Zcash kabul edecek şekilde nasıl kurarsınız?](#how-to-set-up-btcpay-server-for-accepting-zcash)
  - [BTCPay Server ürününü Zcash desteğiyle dağıtma](#deploying-btcpay-server-with-zcash-support)
  - [Kendi Zcash tam düğümünüzü çalıştırma (Zebra + lightwalletd)](#running-your-own-zcash-full-node)
  - [Harici bir lightwalletd düğümüne bağlanma (Özel yapılandırma)](#connecting-to-an-external-lightwalletd-node)
  - [BTCPay Server ürününü Cloudflare Tunnel ile evde barındırma](#hosting-btcpay-server-at-home-with-cloudflare-tunnel)
- [Zcash eklentisini BTCPay Server web arayüzünde yapılandırma](#configuring-the-zcash-plugin-in-the-btcpay-server-web-interface)
- [BTCPay Server ürününü web sitenizle entegre etme](#integrating-btcpay-server-with-your-website)
  - [API entegrasyonu](#api-integration)
    - [API anahtarı oluşturma](#generating-an-api-key)
    - [Örnek: API üzerinden fatura oluşturma](#example-creating-an-invoice-via-api)
    - [Webhook kurma](#setting-up-a-webhook-optional)
  - [CMS entegrasyonu](#cms-integration)
  - [Ödeme düğmesi veya Iframe](#payment-button-or-iframe-no-cms-or-api-needed)
- [Sonuç](#conclusion)
- [Kaynaklar](#resources)


---

## BTCPay Server ürününü Zcash ile neden kullanmalısınız?

Çevrim içi ticarette kripto para kullanımı giderek yaygınlaşıyor. Kripto paralar hızlıdır, küreseldir ve bankalar olmadan çalışır. Bu durum hem satıcılara hem de müşterilere fayda sağlar. Ancak birçok kişinin gözden kaçırdığı önemli bir ayrıntı vardır.

Müşteri sipariş verirken genellikle kişisel bilgilerini paylaşır: ad, teslimat adresi ve telefon numarası. Ödeme Bitcoin, Ethereum veya Ethereum ya da Tron üzerindeki stablecoin'ler gibi herkese açık bir blokzincir kullanılarak yapılırsa işlem analiz için kalıcı olarak görünür hâle gelir.

Herkes, siparişin ne olduğunu bilmese bile şunları yapabilir:

- ödemenin ne zaman ve ne kadar yapıldığını görebilir  
- fonların nereden geldiğini ve nereye gittiğini izleyebilir  
- herhangi bir ilişkilendirme noktası varsa bir kripto para adresini gerçek bir kişiyle eşleştirebilir (örneğin sızdırılmış bir e-posta veya teslimat adı)

Bu, tek bir satın alma işleminin müşterinin tüm mali geçmişini açığa çıkarabileceği anlamına gelir.

Aynı durum ters yönde de geçerlidir. Bir satıcının adresi daha önce zincir üstünde görünmüşse satıcı açığa çıkar. Rakipler ve üçüncü taraf gözlemciler ödeme hacimlerini, tedarikçi faaliyetlerini ve ticari akışların yapısını izleyebilir.

### BTCPay Server ile Zcash birleşimi bu sorunu çözebilir.


BTCPay Server, kripto para ödemelerini almak için ücretsiz ve merkeziyetsiz bir sistemdir.  
Bir ödeme aracısı değildir ve hiçbir fonu elinde tutmaz. Tüm ödemeler doğrudan satıcının cüzdanına gider.  
Bu, kişisel bir cüzdan veya kuruluş içinde çoklu imzalı bir kurulum olabilir.

Sunucu koordinasyon görevlerini yerine getirir:

- her sipariş için benzersiz bir adres oluşturur  
- ödemenin ne zaman alındığını izler ve ödemeyi siparişle ilişkilendirir  
- makbuzlar ve bildirimler oluşturur  
- müşteriye bir ödeme arayüzü sunar

Her şey, üçüncü taraf hizmetlerine bağlı kalmadan mağaza sahibinin kontrolü altında çalışır.

Zcash, sıfır bilgi kanıtları (zero-knowledge proofs) üzerine kurulmuş bir kripto paradır. Tamamen gizli bir işlem modelini destekler.  
Korumalı adresler (bundan sonra yalnızca “adresler” olarak anılacaktır) kullanıldığında gönderici, alıcı ve işlem tutarı blokzincir üzerinde açığa çıkmaz.

Çevrim içi mağazalar için bunun anlamı şudur:

- Alıcı, mali geçmişini açığa çıkarmadan ödemeyi tamamlayabilir  
- Satıcı, adresini, satış hacmini veya işlem yapısını açığa çıkarmadan ödeme alabilir  
- Hiçbir harici gözlemci ödemeyi siparişle veya müşteri verileriyle ilişkilendiremez

### Uygulamalı Örnek

Bir kullanıcı sipariş verir ve ödeme yöntemi olarak Bitcoin veya USDT'yi seçer.  
Web sitesi bir ödeme adresi oluşturur ve tutarı görüntüler.  
Ödeme yapıldıktan sonra bu adres blokzincire kaydedilir ve herkese açık hâle gelir.  
Bir saldırganın, tüm işlem geçmişine uzun vadeli erişim elde etmek için yalnızca bir siparişi adresle ilişkilendirmesi yeterlidir.

Şimdi aynı durumu Zcash ile düşünün.  
BTCPay Server korumalı bir adres oluşturur. Alıcı ödemeyi gönderir.  
Blokzincir açısından hiçbir şey gerçekleşmez. Analiz edilecek herkese açık hiçbir veri yoktur.  
Sunucu onayı alır, bunu siparişle ilişkilendirir ve süreci tamamlar.

Dışarıdan bakan biri için hiçbir şey gerçekleşmemiş gibi görünür.  
Tüm mantık, olması gerektiği gibi mağaza ile müşteri arasında kalır.

Bu çözüm otomasyondan veya kullanılabilirlikten ödün vermez.  
Her şey diğer kripto paralarda olduğu gibi çalışır, yalnızca veri sızıntısı riski olmadan.



## BTCPay Server nasıl çalışır?

BTCPay Server, e-ticaret platformunuz ile blokzincir arasında ödeme işleme köprüsü görevi görür. Akış şu şekilde işler:

1. **Müşteri web sitenizde bir sipariş verir** (ör. WooCommerce, Magento veya BTCPay entegrasyonu bulunan herhangi bir platform).

2. **Mağaza BTCPay Server ürününden bir ödeme faturası ister.** Sunucu şu bilgileri içeren benzersiz bir fatura oluşturur:
   - Sipariş tutarı
   - Geri sayım zamanlayıcısı
   - Varsayılan olarak bir Orchard (korumalı) alıcı içeren Zcash Unified Address (UA) - ör. `u1...`

3. **Müşteri ödeme sayfasını görür** ve ZEC ürününü sağlanan adrese gönderir.

4. **BTCPay Server blokzinciri izler** ve ödemeyi şu unsurlara göre kontrol eder:
   - Beklenen tutar
   - Alıcı adresi
   - Fatura zaman damgası

5. **İşlem tespit edilip onaylandığında** BTCPay mağazayı bilgilendirir.

6. **Müşteri bir ödeme onayı alır.** İsteğe bağlı olarak sunucu e-posta yoluyla makbuz gönderebilir.

Bu sürecin tamamı aracı veya saklama hizmeti sağlayıcısı olmadan **otomatik olarak** gerçekleşir.  
BTCPay Server **hiçbir fonu elinde tutmaz** - yalnızca sipariş sistemini blokzincire güvenli ve gizli bir şekilde bağlar.
## Fonlar nerede saklanır? Özel anahtarları kim kontrol eder?

BTCPay Server bir cüzdan **değildir** ve **özel anahtar gerektirmez**.  
Tüm fonlar **doğrudan** satıcının cüzdanına gider. Güvenlik, **görüntüleme anahtarı tabanlı mimari** kullanılarak sağlanır.

### Nasıl Çalışır?

- **Cüzdan önceden oluşturulur.**  
  Satıcı, görüntüleme anahtarlarını destekleyen bir Zcash cüzdanı kullanır; örneğin [Zkool](https://github.com/hhanh00/zkool2/) veya [Zingo! Wallet](https://zingolabs.org/).  
  Tam listeye [ZecHub.wiki](https://zechub.wiki/wallets) adresinden ulaşabilirsiniz.

- **BTCPay Server bir görüntüleme anahtarı üzerinden bağlanır.**  
  Görüntüleme anahtarı **salt okunur bir anahtardır**: gelen ödemeleri tespit edebilir ve yeni alıcı adresleri oluşturabilir,  
  ancak fon harcayamaz. Sunucu kurtarma ifadelerini veya özel anahtarları saklamaz.

- **Blokzincir verilerine bir `lightwalletd` sunucusu üzerinden erişilir.**  
  `https://zec.rocks` gibi herkese açık bir düğüm kullanabilir veya tam egemenlik için kendi `Zebra + lightwalletd` yığınınızı çalıştırabilirsiniz.

- **Her sipariş için benzersiz bir adres oluşturulur.**  
  Görüntüleme anahtarları, her fatura için yeni Zcash korumalı adreslerinin türetilmesini sağlar;  
  böylece güvenli ödeme takibi mümkün olur ve adresin yeniden kullanılması önlenir.

- **Fonlar üzerindeki tam kontrol sizde kalır.**  
  Sunucu ele geçirilse bile hiç kimse paranızı çalamaz - yalnızca ödeme meta verileri açığa çıkabilir.

Bu tasarım **altyapıyı** **varlık kontrolünden** ayırır.  
Fonları riske atmadan BTCPay Server ürününü güncelleyebilir, taşıyabilir veya yeniden kurabilirsiniz.

## BTCPay Server ürününü Zcash kabul edecek şekilde nasıl kurarsınız?

Önceki bölümlerde BTCPay Server ürününün Zcash ile nasıl çalıştığını ve gizliliği koruyan ödemeler açısından neden önemli olduğunu açıkladık. Şimdi uygulamaya geçme zamanı.

Kesin kurulumunuz çeşitli etkenlere bağlı olacaktır:

- Halihazırda bir BTCPay Server örneğiniz var mı?
- Herkese açık bir lightwalletd kullanmak mı, yoksa kendi tam düğümünüzü çalıştırmak mı istiyorsunuz?
- Sunucu bir VPS üzerinde mi yoksa evde mi çalışacak?

Bu bölüm, en basit kurulumlardan tamamen egemen dağıtımlara kadar güncel tüm yapılandırma senaryolarını kapsar.

Şu konuları ele alacağız:

- Tam düğüm (Zebra) dâhil olmak üzere her şeyi bir VPS üzerinde sıfırdan dağıtma
- **Cloudflare Tunnel** kullanarak IP adresinizi gizli tutarken BTCPay Server ürününü evde çalıştırma
- BTCPay Server web arayüzünde Zcash desteğini etkinleştirme ve yapılandırma
- BTCPay'i web sitenizle veya çevrim içi mağazanızla entegre etme


## BTCPay Server ürününü Zcash desteğiyle dağıtma

Şimdi asıl kuruluma geçelim. Bu bölümde BTCPay Server ürününü, yeni bir VPS üzerinde veya mevcut bir örneğe ZEC desteği ekleyerek Zcash desteğiyle kuracağız.

BTCPay Server zaten çalışıyorsa (ör. BTC veya Lightning için), her şeyi yeniden kurmanız gerekmez - yalnızca ZEC eklentisini etkinleştirin.

Herkese açık bir `lightwalletd` düğümü kullanan en basit kurulumlardan kendi tam düğümünüzü kullandığınız tamamen egemen kurulumlara kadar çeşitli yapılandırmaları ele alacağız.  
En iyi seçenek, sunucunuzun konumuna ve harici altyapıdan ne kadar bağımsız olmak istediğinize bağlıdır.

> Resmî eklenti belgeleri:  
> [https://github.com/btcpay-zcash/btcpayserver-zcash-plugin](https://github.com/btcpay-zcash/btcpayserver-zcash-plugin)
>
> **Uyarı - örnek başına tek cüzdan:**  
> Zcash eklentisi, BTCPay örneğindeki **tüm mağazalarda** **tek bir ortak cüzdan** kullanır.  
> Tek bir örnekte birden fazla bağımsız mağaza barındırırsanız bu mağazalar aynı Zcash cüzdanını paylaşır.  
> Cüzdanların kesin olarak birbirinden ayrılması gerekiyorsa ayrı örnekler kullanın.

---

### Önerilen VPS Yapılandırması

Kuruluma başlamadan önce şunlara sahip olduğunuzdan emin olun:

- **Ubuntu 22.04+** kullanan bir VPS
- Sunucunuzun IP adresine yönlenen bir alan adı (DNS üzerinden)
- `git`, `docker` ve `docker-compose` Compose kurulu
- Sunucuya SSH erişimi

---

## Sunucunuzu Hazırlama (gizli bölüm)

<details>
  <summary>Genişletmek için tıklayın</summary>

BTCPay Server ürününü Zcash desteğiyle dağıtmak için aşağıdakilere ihtiyacınız olacaktır:

### 1. Ubuntu 22.04 veya daha yeni sürüm kullanan VPS

**Ubuntu Server 22.04 LTS** için asgari bir kurulum kullanmanızı öneririz.  
Özel bir IP adresi sunan herhangi bir VPS sağlayıcısı işinizi görecektir.

**Minimum gereksinimler**:  
- 2 CPU çekirdeği  
- 4 GB RAM  
- 40 GB disk alanı  

lightwalletd ürününü Zcash için kullanıyorsanız bu kurulum yeterlidir.  
Bir **tam Zcash düğümü** çalıştırmayı planlıyorsanız en az **300 GB** boş disk alanına ihtiyacınız olacaktır.

---

### 2. Sunucunuza yönlenen alan adı

DNS sağlayıcınızın gösterge panelinde, VPS IP adresinize yönlenen bir alt alan adı için `A` kaydı oluşturun  
(ör. `btcpay.example.com`).

Bu alan adı, tarayıcıdan BTCPay Server ürününe erişmek  
ve Let's Encrypt üzerinden otomatik olarak **ücretsiz SSL sertifikası** oluşturmak için kullanılacaktır.

---

### 3. Sunucuya SSH erişimi

BTCPay Server ürününü kurmak için VPS'inize SSH üzerinden bağlanmanız gerekir.  
Terminalinizden şu komutu çalıştırın:

`ssh root@YOUR_SERVER_IP`

macOS, Linux veya Windows üzerinde WSL kullanıyorsanız SSH terminalde zaten kullanılabilir durumdadır.
Saf Windows üzerinde **PuTTY** gibi bir SSH istemcisi kullanın.

---

### 4. Git, Docker ve Docker Compose'u kurma

SSH üzerinden bağlandıktan sonra sistem paketlerinizi güncelleyin ve gerekli bileşenleri kurun:

```
sudo apt update && sudo apt upgrade -y
sudo apt install git curl docker.io docker-compose-plugin -y
sudo systemctl enable docker
```

> Ubuntu 22.04 ve daha yeni sürümlerde APT'deki `docker-compose` kullanımdan kaldırılmıştır.
> Önerilen paket, boşluk yerine kısa çizgi kullanan `docker compose` komutunu sağlayan `docker-compose-plugin` paketidir.

Sunucu ortamınız artık BTCPay Server kurulumuna hazırdır.

</details>

---

### 1. Adım: Depoyu Klonlama

Bir çalışma dizini oluşturun ve BTCPay Server Docker dağıtımını indirin:

```
mkdir BTCPayServer
cd BTCPayServer
git clone https://github.com/btcpayserver/btcpayserver-docker
cd btcpayserver-docker
```

---

### 2. Adım: Ortam Değişkenlerini Dışa Aktarma

`btcpay.example.com` değerini gerçek alan adınızla değiştirin:

```
export BTCPAY_HOST="btcpay.example.com"
export NBITCOIN_NETWORK="mainnet"
export BTCPAYGEN_CRYPTO1="btc"
export BTCPAYGEN_CRYPTO2="zec"
export BTCPAYGEN_REVERSEPROXY="nginx"
export BTCPAYGEN_LIGHTNING="none"
```

> Daha sonra Monero veya Litecoin eklemeyi planlıyorsanız bunları şimdi ekleyebilirsiniz:

```
export BTCPAYGEN_CRYPTO3="ltc"
export BTCPAYGEN_CRYPTO4="xmr"
```

Uygun değişkenleri dışa aktararak ve kurulum komut dosyasını yeniden çalıştırarak istediğiniz zaman yeni coin'ler ekleyebilirsiniz:

`. ./btcpay-setup.sh -i`

Bu rehberde yalnızca **Zcash** ürününe odaklanacağız.

---

### 3. Adım: Yükleyiciyi Çalıştırma

Sunucuyu oluşturup başlatmak için kurulum komut dosyasını çalıştırın:

`. ./btcpay-setup.sh -i`

Komut dosyası bağımlılıkları kuracak, `docker-compose.yml` dosyasını oluşturacak, hizmetleri başlatacak ve `systemd` ürününü yapılandıracaktır.
Bu işlem yaklaşık 5 dakika sürer.

İşlem tamamlandığında BTCPay Server örneğiniz şu adreste kullanılabilir olacaktır:

`https://btcpay.example.com`

> Mevcut bir kurulumu değiştiriyorsanız (ör. ZEC ekliyorsanız) sunucuyu yeni ayarlarla durdurup yeniden başlattığınızdan emin olun:

```
cd ~/BTCPayServer/btcpayserver-docker
btcpay-down.sh
. ./btcpay-setup.sh -i
```

Ardından Zcash ürününü BTCPay Server web arayüzünde yapılandırmak için sonraki bölüme geçin.

## Kendi Zcash Tam Düğümünüzü Çalıştırma

Genel `lightwalletd` düğümlere güvenmemeyi tercih ediyorsanız, lightwalletd ile birlikte aynı sunucuda kendi tam Zcash düğümünüzü dağıtabilirsiniz.  
Bu size **tam özerklik** sağlar - harici bağımlılık yoktur, güven gerektirmez.

---

### 1. Adım: Yeterli Disk Alanı Sağlayın

Tam bir Zcash düğümü (Zebra + lightwalletd) şu anda **300+ GB** disk alanı gerektirir ve büyümeye devam eder.

Dağılım:

- Zebra blokzinciri veritabanı: ~260-270 GB
- lightwalletd indekslemesi: ~15-20 GB

#### Önerilen depolama alanı:

- Sunucu **yalnızca** Zcash ödemeleri için kullanılıyorsa **400 GB+**
- Sunucu ayrıca BTCPay Server, PostgreSQL, Nginx vb. çalıştırıyorsa **800 GB+**

> İdeal olarak **1 TB kapasiteli** bir SSD/NVMe disk kullanın; özellikle verileri düzenli olarak budamayı planlamıyorsanız.

---

### 2. Adım: Ortam Değişkenlerini Ayarlayın

Tam düğüm yapılandırmasını etkinleştirmek için aşağıdakini ortam kurulumu dosyanıza ekleyin:

```
export BTCPAYGEN_EXCLUDE_FRAGMENTS="zcash"
export BTCPAYGEN_ADDITIONAL_FRAGMENTS="zcash-fullnode"
```

Bu, hem `zebrad` hem de `lightwalletd` bileşenlerini BTCPay Server içinde başlatan `zcash-fullnode` parçacığını içerecektir.

---

### 3. Adım: Yükleyiciyi Yeniden Çalıştırın

`. ./btcpay-setup.sh -i`

Betik şunları yapacaktır:

* Zebra ve lightwalletd için Docker imajlarını indirir
* Hizmetleri BTCPay yığını içinde kurar
* Zcash eklentisini **yerel** `lightwalletd` örneğine bağlar

> **Blokzincirinin tamamının eşitlenmesi birkaç gün sürebilir**; özellikle düşük kaynaklı VPS sunucularında.
> Eşitleme tamamlanana kadar korumalı ödemeler kullanılamaz.


## Harici Bir lightwalletd Düğümüne Bağlanma

Çoğu durumda tam özerklik gerekli değildir ve satıcılar tam bir Zcash düğümünü çalıştırmak için zaman ve disk alanı harcamak istemeyebilir.  
Varsayılan olarak BTCPay Server, tüm blokzincirini indirmeden korumalı ödemeleri işlemek için genel bir `lightwalletd` düğümüne bağlanır.

Varsayılan uç nokta:

`https://zec.rocks:443`

Ancak BTCPay Server uygulamasını aşağıdaki gibi **herhangi bir harici `lightwalletd` düğümüne** bağlanacak şekilde yapılandırabilirsiniz:

`https://lightwalletd.example:443`

Bu bölüm, **özel bir Docker parçacığı** kullanarak bunu nasıl yapacağınızı gösterir.

> Tüm ortam değişkenlerini içeren eksiksiz bir yapılandırma örneği [eklenti deposunda](https://github.com/btcpay-zcash/btcpayserver-zcash-plugin/blob/master/docs/zcash-lightwalletd.custom.yml) mevcuttur.  
> Aşağıdaki adımlar, çalışan en küçük kurulumu gösterir.

---

### 1. Adım: Özel Bir Docker Parçacığı Oluşturun

BTCPayServer proje dizininizde özel bir parçacık dosyası oluşturun:

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

`exclusive` yönergesi, aynı etikete sahip yalnızca bir parçacığın (bu durumda `zcash`) aynı anda etkin olmasını sağlar.
Bu, yapılandırma çakışmalarını önler - örneğin hem `zcash-fullnode` parçacığını hem de bu özel harici `lightwalletd` parçacığını aynı anda çalıştıramazsınız.
`exclusive: zcash` olarak işaretlendiğinde BTCPay Server, varsayılan `zcash-fullnode` ve dahili `lightwalletd` kapsayıcılarını otomatik olarak devre dışı bırakır ve bunun yerine kendi harici düğümünüze bağlanmanıza olanak tanır.

---

### 2. Adım: Ortam Değişkenlerini Ayarlayın

Terminalde:

```
export BTCPAYGEN_EXCLUDE_FRAGMENTS="$BTCPAYGEN_EXCLUDE_FRAGMENTS;zcash"
export BTCPAYGEN_ADDITIONAL_FRAGMENTS="$BTCPAYGEN_ADDITIONAL_FRAGMENTS;zcash-lightwalletd.custom"
```

---

### 3. Adım: Harici Düğüm Adresini Tanımlayın

`.env` dosyanızı açın:

`nano .env`

URL'yi seçtiğiniz uç noktayla değiştirerek aşağıdaki satırı ekleyin:

`ZCASH_LIGHTWALLETD=https://lightwalletd.example:443`

Şunlardan birini kullanabilirsiniz:

* `https://zec.rocks:443` gibi **genel bir düğüm**
* BTCPay Server uygulamasından ayrı olarak dağıtılmış, kendi barındırdığınız düğümünüz

> Harici `lightwalletd` kullanılamaz hâle gelir veya aşırı yüklenirse korumalı ödemeler başarısız olur.
> Kritik hizmetler için **kararlı ve doğrulanmış bir uç nokta** seçin (varsayılan `zec.rocks` gibi).

> `lightwalletd` uygulamasını kendi başınıza mı barındırmak istiyorsunuz?
> [Zebra deposundaki `docker-compose.lwd.yml` dosyasını kullanabilirsiniz](https://github.com/ZcashFoundation/zebra/blob/main/docker/docker-compose.lwd.yml).
> **Uyarı:** Bu kurulum resmî olarak belgelenmemiştir ve manuel TLS kurulumu, port yönlendirme ve güvenlik duvarı yapılandırması gerektirir - yalnızca ileri düzey kullanıcılar için önerilir.

---

### 4. Adım: Yükleyiciyi Yeniden Çalıştırın

`. ./btcpay-setup.sh -i`

BTCPay Server özel yapılandırmanızı uygulayacak ve belirtilen `lightwalletd` düğümüne bağlanacaktır.

Bundan sonra Zcash eklentisi, korumalı işlemleri işlemek için bu harici uç noktayı kullanacaktır.


## Cloudflare Tunnel ile BTCPay Server Uygulamasını Evde Barındırma

BTCPay Server uygulamasını Raspberry Pi 5 gibi bir ev cihazında veya **statik IP'si olmayan** herhangi bir yerel sunucuda barındırırken Zcash ödemelerini kabul etmek mi istiyorsunuz?  
**Cloudflare Tunnel** kullanarak örneğinizi internete güvenli şekilde açabilirsiniz.

Bu yöntem, port yönlendirmeyi önler ve sunucunuzu HTTPS üzerinden erişilebilir tutarken gerçek IP adresinizi herkesten gizler.

Ayrıca, bir VPS kiralama **maliyetinden kaçınmanıza** yardımcı olur; bu da kripto para ödemeleri işletmenizin temel işlevi değil, isteğe bağlı bir özelliğiyse idealdir.

---

### 1. Adım: Cloudflare Tunnel'ı Kurun

1. [cloudflare.com](https://www.cloudflare.com) adresinde bir hesap oluşturun ve alan adınızı ekleyin.
2. **Ev sunucunuzda**, Cloudflare Tunnel'ı Cloudflare'ın resmî paket deposunu kullanarak kurun:

```bash
sudo mkdir -p --mode=0755 /usr/share/keyrings
curl -fsSL https://pkg.cloudflare.com/cloudflare-main.gpg | sudo tee /usr/share/keyrings/cloudflare-main.gpg >/dev/null
echo "deb [signed-by=/usr/share/keyrings/cloudflare-main.gpg] https://pkg.cloudflare.com/cloudflared any main" | sudo tee /etc/apt/sources.list.d/cloudflared.list
sudo apt update
sudo apt install cloudflared
```

`apt install cloudflared` başarısız olursa, bunun yerine eşleşen `.deb` paketini kurun:

```bash
# Raspberry Pi / ARM64
curl -L --output cloudflared.deb https://github.com/cloudflare/cloudflared/releases/latest/download/cloudflared-linux-arm64.deb
sudo dpkg -i cloudflared.deb
```

```bash
# x86_64
curl -L --output cloudflared.deb https://github.com/cloudflare/cloudflared/releases/latest/download/cloudflared-linux-amd64.deb
sudo dpkg -i cloudflared.deb
```

3. Cloudflare ile kimlik doğrulaması yapın:

`cloudflared tunnel login`

Bu komut bir tarayıcı penceresi açacaktır. Giriş yapın ve alan adınıza erişim yetkisi verin.
Cloudflare, sunucunuzda otomatik olarak token içeren bir `credentials` dosyası oluşturacaktır.

4. Yeni bir tünel oluşturun (tünele `btcpay` adını veya başka bir adı verebilirsiniz):

`cloudflared tunnel create btcpay`

Bu işlem, tünel kimliğini ve kimlik bilgilerini içeren bir `btcpay.json` dosyası oluşturur - sonraki adımda buna ihtiyacınız olacaktır.

---

### 2. Adım: Tünel Yapılandırma Dosyasını Oluşturun

Yapılandırma dizinini oluşturun (yoksa) ve yapılandırma dosyasını açın:

```
sudo mkdir -p /etc/cloudflared
sudo nano /etc/cloudflared/config.yml
```

Aşağıdaki yapılandırmayı yapıştırın:

```
tunnel: btcpay    # your tunnel name
credentials-file: /root/.cloudflared/btcpay.json

ingress:
  - hostname: btcpay.example.com      # your domain
    service: http://127.0.0.1:80
  - service: http_status:404
```

#### Açıklama:

* `tunnel` - daha önce oluşturduğunuz tünelin adı
* `credentials-file` - `cloudflared tunnel login` sırasında oluşturulan token dosyasının yolu
* `hostname` - Cloudflare'a kaydettiğiniz alan adınız (ör. `btcpay.example.com`)
* `service` - BTCPay Server uygulamanızın yerel adresi (Nginx için genellikle `http://127.0.0.1:80`)

> Cloudflare, ev IP adresinizi açığa çıkarmadan trafiği yerel sunucunuza güvenli şekilde yönlendirir.


### 3. Adım: Tüneliniz İçin DNS Kaydı Ekleyin

Tüneli oluşturduktan sonra Cloudflare, alan adınız için genellikle **otomatik olarak bir CNAME DNS kaydı ekler**. Kayıt şu şekilde görünmelidir:

`btcpay.example.com -> <UUID>.cfargotunnel.com`

Otomatik olarak görünmezse manuel olarak ekleyin:

1. [Cloudflare Dashboard](https://dash.cloudflare.com/) adresinize gidin
2. **DNS** bölümüne gidin
3. Yeni bir CNAME kaydı ekleyin:
   - **Ad**: `btcpay`
   - **Hedef**: `<UUID>.cfargotunnel.com`  
     Tam değeri `btcpay.json` dosyanızda veya aşağıdaki komutu çalıştırarak bulabilirsiniz:
     
     `cloudflared tunnel list`
     
   - **Proxy durumu**: Etkin (turuncu bulut)

> Bu kayıt, `btcpay.example.com` adresine yapılan tüm isteklerin Cloudflare Tunnel üzerinden yönlendirilmesini ve gerçek IP adresinizin herkesten gizlenmesini sağlar.

---

### 4. Adım: Tüneli Sistem Başlangıcında Etkinleştirin

Tünelin açılışta otomatik olarak çalışmasını sağlamak için onu bir sistem hizmeti olarak kurun:

`sudo cloudflared service install`

Ardından hizmeti etkinleştirin ve başlatın:

```
sudo systemctl enable cloudflared
sudo systemctl start cloudflared
```

Durumu kontrol edin:

`sudo systemctl status cloudflared`

`btcpay.example.com` uygulamasının çevrimiçi olduğunu doğrulayan `Active: active (running)` benzeri bir mesaj görmelisiniz.

> Bundan sonra tünel her yeniden başlatmada otomatik olarak çalışacak ve BTCPay Server, port yönlendirme yapılmadan ve gerçek IP adresiniz açığa çıkmadan genel erişime açık olacaktır.

---

### 5. Adım: BTCPay Server Kurulumunu Tamamlayın

BTCPay Server uygulamasını ilk kez kurmak üzereyseniz, kurulum betiğini çalıştırmadan önce alan adınızı ayarlayın:

`export BTCPAY_HOST="btcpay.example.com"`

Bu, **Nginx yapılandırması** ve **SSL sertifikaları** oluşturulurken doğru alan adının kullanılmasını sağlar.

BTCPay Server zaten kuruluysa ve yalnızca tüneli ekliyorsanız:

```
cd ~/BTCPayServer/btcpayserver-docker
. ./btcpay-setup.sh -i
```

Kurulum yapılandırmaları yeniden oluşturacak ve yeni alan adını uygulayacaktır.
Artık sunucunuza şu adresten erişebilmeniz gerekir:

`https://btcpay.example.com`

> İster genel bir `lightwalletd` ister kendi tam düğümünüzü kullanın, bu tüneli etkilemez.
> Önemli olan BTCPay Server uygulamasının yerel olarak `127.0.0.1:80` üzerinde dinlemesidir.


## BTCPay Server Web Arayüzünde Zcash Eklentisini Yapılandırma

> **Birden çok mağaza kurulumu için önemli:**  
> Burada yapılandırılan Zcash cüzdanı örneğe **genel olarak** uygulanır. Ayrı BTCPay örnekleri çalıştırmadığınız sürece tüm mağazalar bu cüzdanı kullanır.

BTCPay Server örneğinizi başarıyla dağıttıktan sonra, yönetici web arayüzü üzerinden bazı temel yapılandırmaları yapmanız gerekir.  
Resmî belgelerde İngilizce olarak eksiksiz talimatlar sunulmaktadır; burada temel adımları ele alacak ve özellikle Zcash eklentisinin yapılandırmasına odaklanacağız.

---

### 1. Adım: Web Arayüzünde Oturum Açın

Örneğinizi şu adreste ziyaret edin:

`[https://btcpay.example.com](https://btcpay.example.com)`

- Yönetici kullanıcı adınızı ve parolanızı girin.
- İlk kez oturum açıyorsanız sizden bir hesap oluşturmanız istenir.
- Kaydettiğiniz ilk hesaba otomatik olarak yönetici ayrıcalıkları atanır.

---

### 2. Adım: Zcash Eklentisini Kurun

1. Ana menüde şu bölüme gidin:

`Plugins -> Browse Plugins`

2. **Zcash (ZEC)** eklentisini bulun. Gerekirse arama çubuğunu kullanın.
3. **Install** seçeneğine tıklayın ve onaylayın.

> Sunucu yapılandırması sırasında etkinleştirdiğiniz diğer altcoinler için de bu işlemi tekrarlayın.

Kurulumdan sonra etkin eklentilerle arayüzü yeniden yüklemek için **Restart Server** seçeneğine tıklayın.


### 3. Adım: Viewing Key ile Cüzdanınızı Bağlayın

Eklentiyi kurduktan sonra ayarlar menüsünde yeni bir **Zcash** bölümü görünecektir.

1. Şu bölüme gidin:

`Zcash -> Settings`

2. **Birleşik Full Viewing Key (UFVK)** anahtarınızı yapıştırın - BTCPay her fatura için bir Birleşik Adres türetecek ve gelen korumalı ödemeleri algılayacaktır.

> **Not:** Eski Sapling görüntüleme anahtarları desteklenir; ancak Orchard/Birleşik Adresleri kullanmak için bir **UFVK** sağlamalısınız.


   Örnek biçim:

`uview184syv9wftwngkay8d...`

3. Block height alanına bir değer girin

* **Yeni bir cüzdanla ilk kurulum (yeni kurtarma ifadesi):** mevcut Zcash blok yüksekliğini girin (3xpl.com/zcash adresinden kontrol edebilirsiniz) - bu, ilk taramayı hızlandırır.
* **Aynı sunucuda eski yalnızca Sapling kurulumundan Birleşik Adreslere / Orchard geçiş:** bu alanı boş bırakın.
* **Aynı cüzdan/UFVK ile mağazanızı yeni bir sunucuya taşıma:** isteğe bağlı olarak doğum yüksekliğini girin - mağazanızın ilk ücretli siparişinin yaklaşık yüksekliği (taramayı daraltmak için 3xpl üzerindeki sipariş tarihiyle eşleştirin). Emin değilseniz boş bırakın.

> Henüz tüm cüzdanlar Birleşik Full Viewing Key (UFVK) dışa aktarmayı desteklememektedir.  
> Önerilen seçenekler:  
> – [**Zkool**](https://github.com/hhanh00/zkool2/)  
> – [**Zingo! Cüzdanı (PC sürümü)**](https://zingolabs.org/)  
> Her iki uygulamada da yedekleme/dışa aktarma bölümünde UFVK dışa aktarma seçeneğini arayın.

Bu anahtarlar **otomatik adres rotasyonunu** destekler; bunun anlamı şudur:
- Her müşteri **benzersiz** bir ödeme adresi alır
- **Tek ve birleşik** bir bakiye görürsünüz

Daha kapsamlı uyumluluk listesini [ZecHub -> Cüzdanlar](https://zechub.wiki/wallets) bölümünde bulabilirsiniz.

Tüm alanlar doldurulduktan sonra **Save** seçeneğine tıklayın.

---

### ZEC Ödeme Akışınızı Test Edin

Tebrikler - Zcash cüzdanınız artık BTCPay Server uygulamasına bağlı.

Bir test çalıştıralım:

1. Şu bölüme gidin:

`Invoices -> Create New`

2. ZEC cinsinden küçük bir tutar için test faturası oluşturun.
3. Parayı **farklı bir cüzdandan** gönderin (BTCPay'e bağlı olan cüzdanı kullanmayın).
4. İşlem algılandığında fatura sayfasında görsel bir kutlama gösterilecektir.
5. Fatura durumunun **Paid** olarak değiştiğini doğrulayın.

Her şey çalışıyorsa ZEC ödemelerini API veya CMS eklentilerini kullanarak web sitenize entegre etmeye hazırsınız.



## BTCPay Server Uygulamasını Web Sitenize Entegre Etme

Zcash cüzdanınız BTCPay Server uygulamasına bağlandıktan sonra ödeme sistemini web sitenize entegre edebilirsiniz.  
Bunu yapmanın, doğrudan API erişiminden popüler CMS platformları için kullanıma hazır eklentilere kadar çeşitli yolları vardır.

---

### Entegrasyon Seçenekleri

- **API Entegrasyonu**  
  Özel olarak oluşturulmuş web siteleri veya CMS kullanmayan sistemler için idealdir.  
  Fatura oluşturma, ödeme takibi ve bildirimler üzerinde, tümü kendi arayüzünüz ve mantığınız içinde olmak üzere tam denetim sağlar.  
  Temel programlama bilgisi gerektirir; bu nedenle bu görevi geliştiricinizin üstlenmesi en uygunudur.

- **CMS Eklentileri**  
  **WooCommerce**, **PrestaShop** ve diğerleri gibi platformlar için kullanılabilir.  
  Bu eklentiler, kodlama gerektirmeden yalnızca birkaç dakika içinde ödeme kabul etmenizi sağlar.

- **Ödeme Düğmesi veya Iframe**  
  En basit yöntemdir.  
  Bağış bağlantısını veya ödeme widget'ını yerleştirmek istediğiniz açılış sayfaları, kişisel web siteleri veya herhangi bir site için idealdir.

---

### API Entegrasyonu

Özel bir platform (veya hiç CMS) kullanıyorsanız API en iyi seçenektir.  
Size tam esneklik sağlar: faturalar oluşturabilir, durumlarını takip edebilir, bildirimler alabilir ve kullanıcı deneyimini tamamen denetleyebilirsiniz.

> Not: Bazı CMS eklentileri bile arka planda API kullanır; bu nedenle entegrasyon yönteminiz ne olursa olsun API anahtarı oluşturmak genellikle **gerekli ilk adımdır**.

Sonraki adım: mağazanız için bir API anahtarı oluşturun ve entegrasyonunuzu geliştirmek için [Greenfield API](https://docs.btcpayserver.org/API/Greenfield/v1/) kullanmaya başlayın.


### API Anahtarı Oluşturma

BTCPay Server uygulamasını web sitenize veya uygulamanıza entegre etmek için bir API anahtarı oluşturmanız gerekir.

1. BTCPay Server uygulamasında oturum açın ve **user menu** seçeneğini açın (sağ üst köşe)
2. **API Keys** bölümüne gidin
3. **Create a new API key** seçeneğine tıklayın
4. Anahtarınız için bir ad girin
5. **Permissions** bölümünde şunları etkinleştirin:
   - `Can create invoice`
   - `Can view invoice`
   - *(İsteğe bağlı)* `Can modify store settings` - yalnızca mağaza düzeyinde yönetime ihtiyacınız varsa

6. **Generate** seçeneğine tıklayın. Kişisel API anahtarınız görüntülenecektir - anahtarı kopyalayın ve güvenli şekilde saklayın.

> Bu anahtar mağazanızın faturalarına erişim sağlar.  
> Anahtarı herkese açık şekilde **paylaşmayın** veya istemci tarafı kodunda **açığa çıkarmayın**.

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
* Web sitenize yerleştirebileceğiniz veya müşteriye gönderebileceğiniz bir ödeme URL'si

Eksiksiz belgelere bakın:
[Greenfield API – Fatura Oluşturma](https://docs.btcpayserver.org/API/Greenfield/v1/#operation/CreateInvoice)

---

### Webhook Kurma (İsteğe Bağlı)

Fatura durumları değiştiğinde (ör. bir ödeme alındığında) gerçek zamanlı bildirimler almak için:

1. Mağaza ayarlarınıza gidin -> **Webhooks**
2. BTCPay Server uygulamasından gelen `POST` isteklerini işleyecek arka uç uç noktanızın URL'sini ekleyin
3. BTCPay, bir fatura ödendiğinde veya süresi dolduğunda bildirimleri otomatik olarak gönderir

Webhook yükleri ve yeniden deneme mantığı [resmî webhook belgelerinde](https://docs.btcpayserver.org/FAQ/General/#how-to-create-a-webhook-) açıklanmıştır.

> Çeşitli programlama dilleri için örnek entegrasyonlar BTCPay belgelerinde ve GitHub depolarında mevcuttur.



### CMS Entegrasyonu

BTCPay Server, popüler içerik yönetim sistemleri (CMS) için eklentileri destekler.  
En olgun ve yaygın kullanılan entegrasyon **WordPress + WooCommerce** ile olan entegrasyondur; bu sayede ZEC ödemelerini **kod yazmadan** kabul etmek kolaylaşır.

---

#### WooCommerce (WordPress)

BTCPay Server, WooCommerce için bir eklentiyi resmî olarak destekler.

Entegrasyon adımları:

1. **BTCPay for WooCommerce** eklentisini WordPress eklenti dizininden veya GitHub adresinden kurun.
2. WordPress yönetici panelinizde şu bölüme gidin:

`WooCommerce -> Settings -> Payments`

3. Listede **BTCPay** seçeneğini bulun ve **Set up** seçeneğine tıklayın
4. BTCPay Server URL'nizi girin ve yetkilendirme talimatlarını izleyin  
   (otomatik API anahtarı oluşturma önerilir)
5. Ödeme yöntemini etkinleştirin ve ayarlarınızı kaydedin

> Ayrıntılı talimatlar, video eğitimleri ve sorun giderme kılavuzları eklenti belgelerinde mevcuttur.

Aynı BTCPay belgeleri bölümünde diğer CMS entegrasyonu seçeneklerini de bulabilirsiniz.

---

### Ödeme Düğmesi veya Iframe (CMS ya da API Gerekmez)

CMS kullanmıyorsanız ve API'lerle çalışmak istemiyorsanız ZEC ödemelerini kabul etmenin en kolay yolu, **bir ödeme bağlantısını veya widget'ını** doğrudan web sitenize yerleştirmektir.

Bu yöntem şunlar için idealdir:

- Açılış sayfaları
- Portföy siteleri
- Bloglar veya statik sayfalar
- Arka uç sunucusu olmayan projeler

---

#### Seçenek 1: Ödeme Düğmesi (Bağlantı)

1. BTCPay Server uygulamasında **Invoices** bölümünden manuel olarak bir fatura oluşturun
2. Ödeme bağlantısını kopyalayın, ör.:

`[https://btcpay.example.com/i/abc123](https://btcpay.example.com/i/abc123)`

3. Bağlantıyı HTML'inize ekleyin:

```
<a href="https://btcpay.example.com/i/abc123" target="_blank">
  Pay with ZEC
</a>
```

---

#### Seçenek 2: Gömülü Fatura (Iframe)

Faturayı doğrudan sitenizde görüntülemek için bir iframe kullanın:

`<iframe src="https://btcpay.example.com/i/abc123" width="600" height="350" frameborder="0"></iframe>`

> Düğmeyi veya iframe kapsayıcısını sitenizin tasarımına uyacak şekilde biçimlendirebilirsiniz - BTCPay Server, fatura sayfasının temasını esnek şekilde özelleştirmenizi sağlar.

## Sonuç

Bu kılavuz uzundu; ancak Zcash ödemelerini BTCPay Server ile entegre etmenin yalnızca temel yönlerini kapsıyor.

BTCPay Server arayüzü, burada gösterdiğimizden çok daha fazla işlev sunuyor. Neyse ki kullanıcı arayüzü Rusça da dahil olmak üzere birden çok dilde kullanılabildiğinden, daha fazlasını keşfetmek ve denemek kolaydır.

BTCPay son derece esnek bir araçtır. Şunları yapabilirsiniz:

* Tek bir örnekte birden çok bağımsız mağaza barındırabilirsiniz
* Ekip üyeleri için yalnızca siparişleri görüntüleme yetkisinden tam yönetici yetkisine kadar özel roller ve izinler tanımlayabilirsiniz
* Kendi alan adlarınızı ve marka kimliğinizi kullanabilirsiniz
* Web kancaları, yedek cüzdanlar ve hatta Tor erişimi ayarlayabilirsiniz
* Vergi kuralları, indirim kodları, ödeme sayfası özelleştirmesi, ödeme yöntemi kısıtlamaları ve daha fazlası gibi gelişmiş ayarları yapılandırabilirsiniz

BTCPay, merkezi ödeme sağlayıcılarına açık kaynaklı bir alternatif olarak geliştirildi. Aracı olmadan özel ZEC ödemelerini kabul etmek istiyorsanız, bu platform kesinlikle ilginizi hak ediyor.

BTCPay ekosistemini keşfederken ve ödemelerinizi gerçekten kendinize ait hâle getirirken başarılar dileriz.

## Kaynaklar

* [BTCPay Server Resmî Web Sitesi](https://btcpayserver.org/)
* [BTCPay SSS](https://docs.btcpayserver.org/FAQ/)
* [BTCPay Server GitHub Deposu](https://github.com/btcpayserver/btcpayserver)
* [BTCPay Server Mainnet Demosu](https://mainnet.demo.btcpayserver.org/login?ReturnUrl=%2F)
* [Zcash BTCPay için eklenti (GitHub)](https://github.com/btcpay-zcash/btcpayserver-zcash-plugin)
* [Zcash Eklenti Kurulum Kılavuzu](https://github.com/btcpay-zcash/btcpayserver-zcash-plugin/blob/master/docs/installation.md)
* [Özel zcash-lightwalletd.custom.yml Örneği](https://github.com/btcpay-zcash/btcpayserver-zcash-plugin/blob/master/docs/zcash-lightwalletd.custom.yml)
* [lightwalletd Docker Compose Dosyası (Zebra)](https://github.com/ZcashFoundation/zebra/blob/main/docker/docker-compose.lwd.yml)
* [BTCPay API Anahtarı Belgeleri (Greenfield API)](https://docs.btcpayserver.org/API/Greenfield/v1/#tag/API-Keys)
* [Cloudflare Tüneli Oluşturma](https://developers.cloudflare.com/cloudflare-one/connections/connect-networks/get-started/create-remote-tunnel/)
* [Zcash Cüzdan Uyumluluk Listesi (ZecHub)](https://zechub.wiki/wallets)
* [Zebra + lightwalletd Raspberry Pi 5 üzerinde (ZecHub)](https://free2z.com/ZecHub/zpage/zcash-101-zebra-lightwalletd-sync-journal-on-raspberry-pi-5)
