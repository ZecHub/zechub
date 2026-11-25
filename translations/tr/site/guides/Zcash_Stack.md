<a href="https://github.com/zechub/zechub/edit/main/site/guides/Zcash_Stack.md" target="_blank">
  <img src="https://img.shields.io/badge/Edit-blue" alt="Sayfayı düzenle"/>
</a>

# Zcash Stack: Kubernetes veya Docker üzerinde bir Hafif Cüzdan Sunucusu çalıştırma

[Zcash Stack](https://github.com/zecrocks/zcash-stack), zec.rocks ekibinin açık kaynaklı dağıtım kitidir. Bir Zcash tam düğümü, hafif cüzdan sunucusunu ve isteğe bağlı ek bileşenleri (Zaino, blok gezgini, Tor gizli hizmeti, DNS seed sunucusu, zecd, tarayıcı cüzdanları için gRPC-web proxy’si) Kubernetes için Helm grafiği ve Docker Compose dosyaları olarak bir araya getirir. Bu grafikte, zec.rocks bünyesindeki tüm lightwalletd sunucuları çalışır. Proje, [Zcash Community Grants](https://zcashcommunitygrants.org/) tarafından finanse edilmektedir.

Bu sayfada kitin neleri dağıttığı, yüklemeden önce nelere ihtiyacınız olduğu ve en önemli ayarlar özetlenmektedir. **0.4.9** grafik sürümünü (13 Kasım 2026’da yayımlandı) esas almaktadır. Projenin kendi [grafik README’si](https://github.com/zecrocks/zcash-stack/blob/main/charts/zcash-stack/README.md) ve [atölye notları](https://github.com/zecrocks/zcash-stack/tree/main/docs) başvuru kaynağıdır; üretim ortamında herhangi bir şey çalıştırmadan önce bunları okuyun.

## Özet

- **İki farklı yöntem.** Kubernetes için Helm grafiği (kendi NVMe donanımınızda k3s ana hedef olsa da GKE Standard ve Autopilot da çalışır) ve tek bir makine için Docker Compose dosyaları. Atölye, sunucu çalıştırmaya yeniyseniz Docker, zaten sunucu filoları çalıştırıyorsanız Kubernetes kullanmanızı önerir.
- **Bir Zincir düğümü ve bir hafif cüzdan sunucusu.** Önerilen kurulum Zebra + lightwalletd şeklindedir. Arka uç olarak Zakura, Zebra yerine kullanılabilir; Zaino ise lightwalletd yerine kullanılabilir veya onun yanında çalıştırılabilir.
- **Yaklaşık 600 GiB disk alanı planlayın.** Zebra Zincir durumu Haziran 2026’da yaklaşık 260 GiB’ydi ve büyümeye devam ediyor; hafif cüzdan önbelleği yaklaşık 17 GiB ekler. Tam eşitleme günler sürer; bu nedenle grafik, yayımlanmış bir anlık görüntüden geri yükleme yapabilir.
- **Grafik, görüntü sürümlerini sabitler.** 0.4.9’da bunlar Zebra 7.0.0 (NU7 sürümünü izler), lightwalletd v0.6.1, Zakura 1.8.6 ve Zaino 0.8.0’dır. Ağ yükseltmelerinden ve Zakura sürümünün destek sonu yüksekliğine ulaşmasından önce grafiği güncelleyin.
- **Sunucunuzu kaydettirin.** Herkese açık sunucu işletenler sunucularını [hosh.zec.rocks](https://hosh.zec.rocks/zec) izleme sistemine ekleyerek cüzdanların ve kullanıcıların sunucunun çalışır durumda olup olmadığını görmesini sağlayabilir.

## Dağıtılan bileşenler

Her bileşen, grafiğin [`values.yaml`](https://github.com/zecrocks/zcash-stack/blob/main/charts/zcash-stack/values.yaml) ayarında açılıp kapatılabilir. Varsayılan olarak yalnızca lightwalletd açıktır ve bir Zincir düğümüne ihtiyaç duyar; bu nedenle örnek dosyalar Zebra bileşenini de açar.

| Bileşen | 0.4.9 grafiğindeki görüntü | Varsayılan | İşlevi |
|:--|:--|:--|:--|
| Zebra | `zfnd/zebra:7.0.0` | kapalı (örneklerde açık) | Tam düğüm; Zincir’i doğrular ve diğer tüm bileşenlere RPC sunar |
| Zakura | `zakuracore/zakura:1.8.6` | kapalı | Zebra çatallanması; lightwalletd veya Zaino için Zebra yerine kullanılabilecek doğrudan bir arka uç |
| lightwalletd | `electriccoinco/lightwalletd:v0.6.1` | açık | Mobil ve masaüstü cüzdanlar için hafif cüzdan sunucusu (gRPC) |
| Zaino | `zingodevops/zaino:0.8.0-no-tls` | kapalı | Hafif cüzdanlara da hizmet veren Rust dizinleyicisi |
| Blok gezgini | `emersonian/zcash-explorer:v0.0.6` | kapalı | Düğümün JSON-RPC’sini okuyan web gezgini (yalnızca gRPC sunduğundan Zaino bu bileşenin arka ucu olamaz) |
| Tor | `osminogin/tor-simple:0.4.9.16` | kapalı | lightwalletd veya Zaino öğesini `.onion` hizmeti olarak yayımlar |
| DNS seed sunucusu | `zfnd/dnsseeder:v1.8.0` | kapalı | Yeni düğümlerin eşlerini bulmasına yardımcı olur |
| zecd | `ghcr.io/zecrocks/zecd:0.6.3` | kapalı | Korumalı işlemleri önceleyen cüzdan sunucusu (bkz. [zecd](/zcash-tech/zecd)) |
| gRPC-web proxy’si | `envoyproxy/envoy:v1.40.2` | kapalı | Tarayıcıların ham gRPC üzerinden erişemediği lightwalletd ile tarayıcı cüzdanlarının iletişim kurmasını sağlar |
| WebZjs cüzdanı | `ghcr.io/zecrocks/webzjs-wallet` | kapalı | Tarayıcı cüzdanı; aynı ana makinede gRPC-web proxy’sinin açık olması gerekir |

Sürümlerle ilgili iki not. Zaino üst akış sürümü [0.10.1](https://github.com/zingolabs/zaino/releases) iken grafik hâlâ 0.8.0 görüntüsünü içeriyor; bu nedenle daha yeni Zaino davranışlarına güvenmeden önce `values.yaml` belgesini kontrol edin. Ayrıca Zakura düğümleri Mainnet’te her sürümün destek sonu yüksekliğinde durur: 1.8.6 için bu, 3.643.309 numaralı bloktur ve yaklaşık 5 Aralık 2026’ya denk gelir. 1.8.0’dan sonraki x86-64 derlemeleri, BMI2 ve ADX desteği olmayan CPU’larda başlatmayı reddeder. [Zakura Düğüm](/zcash-tech/zakura-node) sayfasında her iki konu da ele alınır.

## Kubernetes: yüklemeden önce

Grafik, küme başına bir kez kuracağınız üç bileşenle çalışır.

1. **Bir giriş denetleyicisi.** Grafik standart bir Kubernetes `Ingress` oluşturur ve varsayılan olarak `nginx` sınıfını kullanır. ingress-nginx önerilir; çünkü k3s ve GKE’de gRPC’yi aynı şekilde işler. k3s üzerinde ya k3s’i `--disable traefik` seçeneğiyle kurun ya da Traefik’i tutup `ingress.className: traefik` ve `ingress.backendProtocol: GRPC` ayarlarını yapılandırın (bu durumda grafik bir Traefik `IngressRoute` oluşturur; çünkü Traefik üzerinden geçen sıradan bir Ingress, gRPC için HTTP 500 döndürür). GKE’de yerleşik `gce` giriş sınıfı, gRPC’yi lightwalletd veya Zaino bileşenlerine yönlendiremez.
2. **Otomatik Let's Encrypt sertifikaları için cert-manager ve bir ClusterIssuer** (`examples/cluster-issuer.yaml`; önce hazırlık ortamı düzenleyicisiyle test edin). GKE Autopilot’ta cert-manager’ı `--set global.leaderElection.namespace=cert-manager` ile yükleyin; aksi hâlde düzenleyici oluşturma işlemi x509 “unknown authority” hatasıyla başarısız olur. cert-manager’ı atlayıp `<service>.ingress.tls.secretName` ayarını kendi sertifikanıza yönlendirebilirsiniz.
3. **Bir StorageClass.** NVMe’li k3s’te `local-path` uygundur. GKE’de Zebra için önceden ayarlanmış bir IOPS sınıfı kullanın (depoda Hyperdisk örneği bulunur) ve önce bölgesel disk kotasını artırın: Yeni GKE projelerinde bölge başına yalnızca 500 GB SSD ve 500 GB Hyperdisk kotası bulunur; bir Zincir düğümü ise 300 ila 500 GB alan ister. Bu nedenle kota artırılmazsa birim `Pending` durumunda, `QUOTA_EXCEEDED` hatasıyla takılı kalır. `storageClassName` ayarı, birimi yeniden oluşturmadan mevcut bir StatefulSet üzerinde değiştirilemez.

Ardından her ana makine adı için DNS kaydını giriş denetleyicisinin harici IP’sine yönlendirin. Henüz DNS’niz yoksa gerçek ana makinenizin yanına `203-0-113-7.sslip.io` gibi bir [sslip.io](https://sslip.io) adı ekleyin: Bu ad, içine gömülü IP’ye çözümlenir; böylece hemen bir sertifika verilir. Kalıcı sunucular için kendi ana makine adınızı birincil ad olarak kullanın.

## Kubernetes: yükleme

```bash
helm repo add zcash https://zecrocks.github.io/zcash-stack
helm repo update
# copy an example from the repo's examples/ folder, set your hostnames and RPC credentials, then:
helm install zcash zcash/zcash-stack -f examples/zebra-mainnet.yaml
```

[`zebra-mainnet.yaml`](https://github.com/zecrocks/zcash-stack/blob/main/examples/zebra-mainnet.yaml) örneği Zebra bileşenini açar, lightwalletd bileşenini buna bağlar, lightwalletd için 40 GiB önbellek ve TLS giriş yapılandırır, ayrıca düğümün RPC’sini küme içinde tutar. Yüklemeden önce yer tutucu RPC kullanıcı adını ve parolasını değiştirin. Diğer örneklerde testnet, GKE, yüksek erişilebilirlikli GKE Autopilot, Tor gizli hizmeti ve sslip.io başlangıç yapılandırması ele alınır.

Yükseltmek için `helm repo update` komutunu çalıştırın, helm-diff eklentisiyle değişiklikleri önizleyin (`helm diff upgrade zcash zcash/zcash-stack -f values.yaml`), ardından aynı bağımsız değişkenlerle `helm upgrade` komutunu çalıştırın. 0.0.x grafiğinden yükseltiyorsanız önce [MIGRATION.md](https://github.com/zecrocks/zcash-stack/blob/main/charts/zcash-stack/MIGRATION.md) dosyasını okuyun: 0.1.0 sürümünde eski Traefik yapılandırmasının yerini standart Ingress ve cert-manager aldı; ayrıca values düzeni değişti.

## Kaynak planlaması

| | Normal çalışma | İlk eşitleme | Disk |
|:--|:--|:--|:--|
| Zebra | ~0.1 vCPU, 1.6 GiB | CPU, IOPS ve bellek kullanımı yoğun | ~260 GiB (Haziran 2026) ve artıyor; grafik varsayılanı 500 GiB |
| lightwalletd | ~0.15 vCPU, 165 MiB | Önbelleğini blok blok oluşturur | ~17 GiB; grafik varsayılanı 40 GiB |

Tüm yığın yaklaşık 1.5 vCPU ve 4.5 GiB bellek ister. Tek makine için grafik, 8 vCPU, 32 GiB RAM ve yaklaşık 1 TB NVMe önerir (GKE’de 500 GiB Hyperdisk veya pd-ssd birimi olan bir `n2-standard-8`). Varsayılan istekler GKE Autopilot’un minimum gereksinimlerini karşılar; eşitleme sırasında CPU kullanımının artabilmesi için CPU sınırları belirlenmemiştir.

## Bilinmesi gereken ayarlar

**Anlık görüntüden geri yükleme.** Sıfırdan eşitlemek yerine yayımlanmış bir anlık görüntüden başlamak için `<chain>.initSnapshot.enabled: true` ayarını (`initSnapshot.url`, `gs://` veya `https://` ile birlikte) yapılandırın. Geri yükleme ilerleme durumunu işaretler, kesintiye uğrayan indirmeyi temiz biçimde yeniden başlatır ve önceki kurulumdan kalan sağlıklı birimi asla silmez. Anlık görüntü, güven varsayımını kolaylaştırır: Sonrasındaki bloklar yine doğrulanır ve bozuk bir anlık görüntü, doğrulamadan geçemeyen bloklar olarak kendini gösterir. Atölye, sıfırdan eşitlemenin yaklaşık 10 gün, anlık görüntüyle başlamanın ise yaklaşık 10 saat sürdüğünü belirtiyor.

**Ölçeklendirme ve sıfır kesinti.** lightwalletd ve Zaino, düğümün önündeki hafif önbelleklerdir; bu nedenle kesintisiz kademeli güncellemeler için `replicas: 2` çalıştırın (çoğaltma sayısı 1’den fazlaysa bir PodDisruptionBudget otomatik olarak eklenir). Zincir düğümleri yük dağıtımı için değildir: Her çoğaltma, kendi birimi ve eşitlemesi olan başka bir tam düğümdür. Bu nedenle bir tane, yedeklilik içinse iki tane çalıştırın.

**Gelen eşler.** Varsayılan olarak Zebra yalnızca giden bağlantılar kurar. `zebra.p2pPublic.enabled: true`, 8233 numaralı bağlantı noktasında (testnet’te 18233) gelen eş bağlantılarını kabul eder ve adresinizi duyurur. Çıplak donanım ve k3s’te `externalAddrFrom: hostIP`, düğümün kendi IP’sinin özel olduğu bulutlarda `nodeExternalIP`, GKE Autopilot’ta ayrılmış statik IP ile `loadBalancer` seçin.

**TLS ve gRPC.** TLS, giriş noktasında sonlanır; küme içinde düz HTTP/2 kullanılır. Böylece birden fazla ana makine adı tek bir lightwalletd adresine yönlendirilebilir. gRPC yöntem yolları buna ihtiyaç duyduğundan `path: /` ayarını `pathType: Prefix` ile birlikte kullanın. HTTPS yönlendirmesi nedeniyle ilk sertifika isteği başarısız olursa hazırlık ortamı düzenleyicisiyle sertifika alın veya geçici olarak `ingress.tls.sslRedirect: "false"` ayarını yapın.

**Tor gizli hizmeti.** Kümenizin herkese açık IP’si veya alan adı yoksa kullanışlıdır:

```yaml
tor:
  enabled: true
  targetService: zaino   # or lightwalletd
  hiddenServicePort: 443
```

Adresi `kubectl exec -it tor-0 -- cat /var/lib/tor/hidden_service/hostname` ile öğrenin ve yerel bir Tor istemcisi üzerinden [zecping](https://github.com/zecrocks/zecping) ile test edin: `./zecping -socks localhost:9150 -addr <address>.onion:443`.

**Ağ yükseltmeleri sırasında.** Zebra eski sürümleri kullanan eşleri yasaklayabilir ve Zincir güncellemelerinin durduğunu kaydederek takılı kalabilir. Yasak listesi bellekte tutulur; bu nedenle `kubectl delete pod zebra-0` listeyi temizler. Pod, yeniden eşitleme yapmadan aynı Zincir verileriyle yeniden çalışmaya başlar.

## Docker Compose

Tek bir makine için depoyu klonlayın ve varsayılan dosyayı `docker/` klasöründen başlatın:

```bash
git clone https://github.com/zecrocks/zcash-stack.git
cd zcash-stack/docker
docker compose up --detach
docker compose logs --follow
```

`compose.yaml`, x86 üzerinde Zebra, lightwalletd ve [Watchtower](https://containrrr.dev/watchtower/) bileşenlerini çalıştırır; `compose.arm.yaml` ise ARM ana makinelerinde aynı işi yapar. Watchtower yeni görüntüleri otomatik olarak indirir ve varsayılan dosya `zfnd/zebra:latest` etiketini kullanır. Böylece düğüm, elle yükseltme yapmadan yeni Zebra sürümlerini izler. `compose.zaino.yaml`, lightwalletd yerine Zaino kullanır; ancak eski bir topluluk görüntüsünü sabitlediğinden (`emersonian/zcash-zaino:0.1.2-zr4`) kullanmadan önce kontrol edin. Diğer dosyalar Caddy TLS ön ucunu, VPS proxy’sini ve evdeki düğümler için autossh tünelini ekler.

Sunucunun bağış adresi olarak yayımlamak üzere `.env` dosyasındaki `LIGHTWALLETD_DONATION_ADDRESS` ayarını kendi birleşik adresinize göre yapılandırın. İlk `docker compose up` öncesinde `docker/` klasöründen `./download-snapshot.sh` çalıştırırsanız Zincir anlık görüntüsü indirilir; sıfırdan eşitleme yapılmaz.

## Bağlanma ve izleme

Atölyenin ikinci dersi, sunucuyu dışa açma yöntemlerini ele alır: Herkese açık statik IP, ev IP’nizi bir VPS’ye SSH tüneli veya Tailscale Funnel arkasında gizleme ya da yalnızca Tor üzerinden erişilen bir sunucu. Bir cüzdanı sunucuya yönlendirerek sonucu test edin (ZODL içinde, Gelişmiş Ayarlar; bkz. [cüzdanınızda sunucuyu değiştirme](/zcash-tech/lightwallet-nodes)) veya bir gRPC istemcisiyle `GetLightdInfo` çağrısı yapın.

İzlemeyle ilgili üçüncü ders, Docker komutlarını elle kullanmayı anlatır ve herkese açık sunucuların zec.rocks çalışma süresi izleyicisi olan [hosh](https://hosh.zec.rocks/zec) sistemine kaydedilmesini önerir. Kayıt için ana makine adınızı ve bağlantı noktanızı hosh sunucu listesine ekleyen bir çekme isteği açmanız gerekir. Herhangi bir adımda yardım için [zec.rocks atölye forumuna](https://workshops.zec.rocks) başvurabilirsiniz.

## Sık yapılan hatalar

**Zincir düğümü olmadan lightwalletd yüklemek.** lightwalletd, Zebra (veya Zakura) bileşeninden veri okur. Birini açın veya bunu yapan bir örnek dosyayla başlayın.

**Örnek RPC kimlik bilgilerini olduğu gibi bırakmak.** Örneklerde yer tutucu değerler bulunur. RPC küme içinde kalır; yine de bu değerleri değiştirin.

**GKE’nin varsayılan disk kotasıyla Zincir düğümü çalıştırmak.** Birim bağlanmaz. Yüklemeden önce bölgesel kotayı artırın.

**Zebra bileşenini yük için ölçeklendirmek.** Her Zebra çoğaltması, tam bir ek eşitleme yapar. Bunun yerine lightwalletd veya Zaino bileşenini ölçeklendirin.

**Ağ yükseltmesi boyunca eski bir grafiği sabit tutmak.** Yükseltmeden önceki bir düğüm, yükseltme sonrasında Mainnet’i izlemeyi bırakır (Zebra, NU7 sürümünden itibaren 7.0.0 veya üstünü gerektirir). `helm repo update` komutunu çalıştırın; etkinleştirme yüksekliklerinden ve Zakura destek sonu yüksekliklerinden önce grafiği yükseltin.

## İlgili Sayfalar

- [Zcash Hafif Cüzdan Düğümleri](/zcash-tech/lightwallet-nodes): hafif cüzdan sunucusunun neleri görüp göremediği ve herkese açık sunucular.
- [Zebra Tam Düğüm](/zcash-tech/zebra-full-node): bu yığının çalıştırdığı doğrulayıcı.
- [Zakura Düğüm](/zcash-tech/zakura-node): grafiğin çalıştırabileceği Zebra çatallanması.
- [Zaino](/zcash-tech/zaino): Rust dizinleyicisi.
- [zecd](/zcash-tech/zecd): grafiğin ekleyebileceği cüzdan sunucusu.
- [Zcash Düğüm RPC’si ve Dizinleme](/guides/zcash-node-rpc-and-indexing): Zebra RPC’si, Zallet ve dizinleyiciler.
- [Zebra’i Akash Ağı’nda çalıştırma](/guides/akash-network-zebra): düğüm barındırmanın başka bir yolu.

## Kaynaklar

- [zecrocks/zcash-stack](https://github.com/zecrocks/zcash-stack) (depo, sürümler ve örnekler)
- [Zcash Stack Helm grafiği README’si](https://github.com/zecrocks/zcash-stack/blob/main/charts/zcash-stack/README.md)
- [Atölye notları: Eşitle, Bağlan, Gözlemle](https://github.com/zecrocks/zcash-stack/tree/main/docs)
- [Docker README](https://github.com/zecrocks/zcash-stack/blob/main/docker/README.md)
- [Artifact Hub kaydı](https://artifacthub.io/packages/search?repo=zcash)
- [hosh.zec.rocks](https://hosh.zec.rocks/zec) (herkese açık sunucu izleme sistemi)

**Son güncelleme:** Kasım 2026 (grafik 0.4.9)
