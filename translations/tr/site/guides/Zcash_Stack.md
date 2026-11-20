<a href="https://github.com/zechub/zechub/edit/main/site/guides/Zcash_Stack.md" target="_blank">
  <img src="https://img.shields.io/badge/Edit-blue" alt="Sayfayı düzenle"/>
</a>

# Zcash Stack: Kubernetes veya Docker üzerinde bir hafif cüzdan sunucusu çalıştırma

[Zcash Stack](https://github.com/zecrocks/zcash-stack), zec.rocks ekibinin açık kaynaklı dağıtım kitidir. Bir Zcash tam düğümünü, bir hafif cüzdan sunucusunu ve isteğe bağlı ek bileşenleri (Zaino, bir blok gezgini, Tor gizli hizmeti, bir DNS tohumlayıcısı, zecd, tarayıcı cüzdanları için bir gRPC-web vekil sunucusu) Kubernetes için Helm grafiği ve Docker Compose dosyaları olarak paketler. Tüm zec.rocks lightwalletd sunucuları bu grafikten çalışır. Proje, [Zcash Community Grants](https://zcashcommunitygrants.org/) tarafından finanse edilmektedir.

Bu sayfa, kitin neleri dağıttığını, kuruluma başlamadan önce nelere ihtiyacınız olduğunu ve en önemli ayarları özetler. **0.4.9** grafik sürümünü (13 Kasım 2026'da yayımlandı) temel alır. Projenin kendi [grafik README dosyası](https://github.com/zecrocks/zcash-stack/blob/main/charts/zcash-stack/README.md) ve [atölye notları](https://github.com/zecrocks/zcash-stack/tree/main/docs) başvuru kaynaklarıdır; üretim ortamında herhangi bir şey çalıştırmadan önce bunları okuyun.

## Kısaca

- **İki kurulum yolu.** Kubernetes için bir Helm grafiği (kendi NVMe donanımınızda k3s ana hedeftir; GKE Standard ve Autopilot da çalışır) ve tek makine için Docker Compose dosyaları. Atölye, sunucu çalıştırma konusunda yeniyseniz Docker, hâlihazırda sunucu kümeleri çalıştırıyorsanız Kubernetes kullanılmasını önerir.
- **Bir zincir düğümü ve bir hafif cüzdan sunucusu.** Önerilen kurulum Zebra + lightwalletd şeklindedir. Arka uç olarak Zebra yerine Zakura kullanılabilir; lightwalletd yerine veya onun yanında Zaino çalıştırılabilir.
- **Yaklaşık 600 GiB disk alanı ayırın.** Zebra zincir durumu Haziran 2026'da yaklaşık 260 GiB idi ve büyümeye devam ediyor; hafif cüzdan önbelleği yaklaşık 17 GiB ekler. Tam eşitleme günler sürer, bu nedenle grafik bunun yerine yayımlanmış bir anlık görüntüyü geri yükleyebilir.
- **Grafik, imaj sürümlerini sabitler.** 0.4.9'da bunlar Zebra 7.0.0 (NU7 sürümünü takip eder), lightwalletd v0.6.1, Zakura 1.8.6 ve Zaino 0.8.0'dır. Ağ yükseltmelerinden ve bir Zakura sürümünün destek sonu yüksekliğine ulaşmasından önce grafiği güncelleyin.
- **Sunucunuzu kaydedin.** Herkese açık sunucu işletenler, cüzdanların ve kullanıcıların sunucunun çalışır durumda olup olmadığını görebilmesi için sunucularını [hosh.zec.rocks](https://hosh.zec.rocks/zec) izleyicisine ekleyebilir.

## Neler dağıtılıyor?

Her bileşen, grafiğin [`values.yaml`](https://github.com/zecrocks/zcash-stack/blob/main/charts/zcash-stack/values.yaml) ayarlarında bir anahtarla açılıp kapatılır. Varsayılan olarak yalnızca lightwalletd açıktır ve bir zincir düğümüne ihtiyaç duyar; bu nedenle örnek dosyalar Zebra bileşenini de açar.

| Bileşen | 0.4.9 grafiğindeki imaj | Varsayılan | Görevi |
|:--|:--|:--|:--|
| Zebra | `zfnd/zebra:7.0.0` | kapalı (örneklerde açık) | Tam düğüm; zinciri doğrular ve diğer tüm bileşenlere RPC hizmeti sunar |
| Zakura | `zakuracore/zakura:1.8.6` | kapalı | Zebra çatallaması; Zebra yerine lightwalletd veya Zaino için doğrudan kullanılabilen bir arka uç |
| lightwalletd | `electriccoinco/lightwalletd:v0.6.1` | açık | Mobil ve masaüstü cüzdanlar için hafif cüzdan sunucusu (gRPC) |
| Zaino | `zingodevops/zaino:0.8.0-no-tls` | kapalı | Hafif cüzdanlara da hizmet veren Rust indeksleyicisi |
| Blok gezgini | `emersonian/zcash-explorer:v0.0.6` | kapalı | Düğümün JSON-RPC arayüzünü kullanan web gezgini (Zaino yalnızca gRPC sunduğundan bu bileşenin arka ucu olamaz) |
| Tor | `osminogin/tor-simple:0.4.9.16` | kapalı | lightwalletd veya Zaino öğesini `.onion` hizmeti olarak yayımlar |
| DNS tohumlayıcısı | `zfnd/dnsseeder:v1.8.0` | kapalı | Yeni düğümlerin eşleri bulmasına yardımcı olur |
| zecd | `ghcr.io/zecrocks/zecd:0.6.3` | kapalı | Önceliği korumalı adreslerde olan cüzdan sunucusu (bkz. [zecd](/zcash-tech/zecd)) |
| gRPC-web vekil sunucusu | `envoyproxy/envoy:v1.40.2` | kapalı | Tarayıcıların ham gRPC üzerinden erişemediği lightwalletd hizmetiyle tarayıcı cüzdanlarının konuşmasını sağlar |
| WebZjs cüzdanı | `ghcr.io/zecrocks/webzjs-wallet` | kapalı | Tarayıcı cüzdanı; aynı ana bilgisayarda gRPC-web vekil sunucusunun açık olması gerekir |

Sürümlerle ilgili iki not. Zaino üst sürümde [0.10.1](https://github.com/zingolabs/zaino/releases) kullanılırken grafikte hâlâ 0.8.0 imajı yer alıyor; bu nedenle daha yeni Zaino davranışlarına güvenmeden önce `values.yaml` kontrol edin. Ayrıca Zakura düğümleri Mainnet'te her sürüm için belirlenmiş destek sonu yüksekliğinde durur: 1.8.6 sürümü için bu, 3.643.309. bloktur ve yaklaşık 5 Aralık 2026'ya denk gelir. 1.8.0'dan beri yayımlanan x86-64 derlemeleri, BMI2 ve ADX desteği olmayan işlemcilerde başlatmayı reddeder. Her iki konu da [Zakura Düğüm](/zcash-tech/zakura-node) sayfasında ele alınır.

## Kubernetes: kurulumdan önce

Grafik, küme başına bir kez kurmanız gereken üç bileşene göre dağıtım yapar.

1. **Bir giriş denetleyicisi.** Grafik standart bir Kubernetes `Ingress` oluşturur ve varsayılan olarak `nginx` sınıfını kullanır; ingress-nginx önerilir, çünkü k3s ve GKE'de gRPC'yi aynı şekilde işler. k3s üzerinde ya k3s'yi `--disable traefik` ile kurun ya da Traefik bileşenini koruyup `ingress.className: traefik` ile `ingress.backendProtocol: GRPC` ayarlarını yapın (bu durumda grafik, gRPC'de Traefik üzerinden geçen düz Ingress HTTP 500 hatası döndürdüğü için Traefik `IngressRoute` oluşturur). GKE'de yerleşik `gce` giriş sınıfı, gRPC'yi lightwalletd veya Zaino üzerine yönlendiremez.
2. **Otomatik Let's Encrypt sertifikaları için cert-manager ve bir ClusterIssuer** (`examples/cluster-issuer.yaml`; önce hazırlık sunucusuna karşı test edin). GKE Autopilot'ta cert-manager'ı `--set global.leaderElection.namespace=cert-manager` ile kurun; aksi hâlde veren oluşturulurken x509 "unknown authority" hatası oluşur. cert-manager'ı atlayıp `<service>.ingress.tls.secretName` ayarını kendi sertifikanıza yönlendirebilirsiniz.
3. **Bir StorageClass.** NVMe kullanan k3s üzerinde `local-path` yeterlidir. GKE'de Zebra için önceden ayrılmış bir IOPS sınıfı verin (depoda Hyperdisk örneği bulunur) ve önce bölgesel disk kotasını artırın: yeni GKE projelerinde bölge başına yalnızca 500 GB SSD ve 500 GB Hyperdisk kotası vardır; zincir düğümü ise 300–500 GB ister. Bu nedenle kota artırılmazsa birim, `Pending` durumunda `QUOTA_EXCEEDED` ile takılı kalır. Mevcut bir StatefulSet üzerindeki `storageClassName` ayarı, birim yeniden oluşturulmadan değiştirilemez.

Ardından her ana bilgisayar adı için bir DNS kaydını giriş denetleyicisinin harici IP adresine yönlendirin. Henüz DNS'iniz yoksa gerçek ana bilgisayar adınızın yanına [sslip.io](https://sslip.io) biçiminde bir ad, örneğin `203-0-113-7.sslip.io` ekleyin: bu ad gömülü IP adresine çözümlenir ve sertifika hemen verilir. Kalıcı sunucular için kendi ana bilgisayar adınızı birincil ad olarak kullanın.

## Kubernetes: kurulum

```bash
helm repo add zcash https://zecrocks.github.io/zcash-stack
helm repo update
# copy an example from the repo's examples/ folder, set your hostnames and RPC credentials, then:
helm install zcash zcash/zcash-stack -f examples/zebra-mainnet.yaml
```

[`zebra-mainnet.yaml`](https://github.com/zecrocks/zcash-stack/blob/main/examples/zebra-mainnet.yaml) örneği Zebra bileşenini açar, lightwalletd bileşenini ona bağlar, lightwalletd için 40 GiB önbellek ve TLS giriş ayarı tanımlar, ayrıca düğümün RPC erişimini küme içinde tutar. Kurulumdan önce yer tutucu RPC kullanıcı adını ve parolasını değiştirin. Diğer örneklerde testnet, GKE, yüksek kullanılabilirlikli GKE Autopilot, Tor gizli hizmeti ve sslip.io ile başlangıç ayarları bulunur.

Yükseltme için `helm repo update` komutunu çalıştırın, helm-diff eklentisiyle değişikliği önizleyin (`helm diff upgrade zcash zcash/zcash-stack -f values.yaml`), ardından aynı bağımsız değişkenlerle `helm upgrade` komutunu çalıştırın. 0.0.x grafik sürümünden geçiyorsanız önce [MIGRATION.md](https://github.com/zecrocks/zcash-stack/blob/main/charts/zcash-stack/MIGRATION.md) dosyasını okuyun: 0.1.0 sürümü eski Traefik kurulumunun yerine standart Ingress ve cert-manager kullandı ve values düzenini değiştirdi.

## Kaynak planlama

| | Normal çalışma | İlk eşitleme | Disk |
|:--|:--|:--|:--|
| Zebra | ~0,1 vCPU, 1,6 GiB | CPU, IOPS ve bellek yoğun | ~260 GiB (Haziran 2026) ve büyüyor; grafikte varsayılan 500 GiB |
| lightwalletd | ~0,15 vCPU, 165 MiB | Önbelleğini blok blok oluşturur | ~17 GiB; grafikte varsayılan 40 GiB |

Tüm yığın yaklaşık 1,5 vCPU ve 4,5 GiB bellek ister. Tek makine için grafik, 8 vCPU, 32 GiB RAM ve yaklaşık 1 TB NVMe önerir (GKE'de 500 GiB Hyperdisk veya pd-ssd birimi olan bir `n2-standard-8`). Varsayılan kaynak istekleri GKE Autopilot'un asgari gereksinimlerini karşılar; eşitleme sırasında kısa süreli yük artışına izin vermek için CPU sınırı belirlenmez.

## Bilinmesi gereken ayarlar

**Anlık görüntüden geri yükleme.** Sıfırdan eşitlemek yerine yayımlanmış bir anlık görüntüyle başlamak için `<chain>.initSnapshot.enabled: true` ayarını (`initSnapshot.url`, `gs://` veya `https://` ile) belirleyin. Geri yükleme ilerlemeyi kaydeder, yarıda kesilen indirmeyi temiz biçimde yeniden yapar ve önceki kurulumdan kalan sağlıklı birimi asla silmez. Anlık görüntü, güven konusunda kolaylık sağlayan bir kestirmedir: sonrasındaki bloklar yine doğrulanır ve hatalı bir anlık görüntü, doğrulamadan geçemeyen bloklarla kendini belli eder. Atölye notlarına göre sıfırdan eşitleme yaklaşık 10 gün, anlık görüntüden başlatma ise yaklaşık 10 saat sürer.

**Ölçekleme ve kesintisiz çalışma.** lightwalletd ve Zaino, düğümün önündeki ince önbellek katmanlarıdır; bu nedenle kesinti olmadan aşamalı güncelleme yapmak için `replicas: 2` çalıştırın (kopya sayısı 1'den fazlaysa otomatik olarak bir PodDisruptionBudget eklenir). Zincir düğümleri yük dağıtımı için uygun değildir: her kopya kendi birimi ve eşitlemesi olan başka bir tam düğümdür; bu yüzden bir tane, yedeklilik gerekiyorsa iki tane çalıştırın.

**Gelen eşler.** Varsayılan olarak Zebra yalnızca giden bağlantılar kurar. `zebra.p2pPublic.enabled: true`, 8233 numaralı bağlantı noktasında (testnet'te 18233) gelen eşleri kabul eder ve adresinizi duyurur. Çıplak donanımda ve k3s üzerinde `externalAddrFrom: hostIP`, düğümün kendi IP adresinin özel olduğu bulutlarda `nodeExternalIP`, GKE Autopilot'ta ayrılmış statik IP ile `loadBalancer` seçin.

**TLS ve gRPC.** TLS, giriş denetleyicisinde sonlanır ve küme içinde düz HTTP/2 çalışır; bu nedenle birden fazla ana bilgisayar adı tek bir lightwalletd adresine yönlendirilebilir. gRPC yöntem yollarının gerektirmesi nedeniyle `path: /` ayarını `pathType: Prefix` ile birlikte kullanın. HTTPS yönlendirmesi yüzünden ilk sertifika alınamazsa, hazırlık verenini kullanarak sertifika alın veya geçici olarak `ingress.tls.sslRedirect: "false"` ayarını yapın.

**Tor gizli hizmeti.** Kümenizin herkese açık IP adresi veya alan adı yoksa kullanışlıdır:

```yaml
tor:
  enabled: true
  targetService: zaino   # or lightwalletd
  hiddenServicePort: 443
```

Adresi `kubectl exec -it tor-0 -- cat /var/lib/tor/hidden_service/hostname` ile öğrenin ve yerel bir Tor istemcisi üzerinden [zecping](https://github.com/zecrocks/zecping) kullanarak test edin: `./zecping -socks localhost:9150 -addr <address>.onion:443`.

**Ağ yükseltmeleri sırasında.** Zebra eski sürümleri kullanan eşleri engelleyip durabilir ve zincir güncellemelerinin durduğunu günlüğe yazabilir. Engellenen eşler listesi bellekte tutulur; bu nedenle `kubectl delete pod zebra-0` listeyi temizler. Pod, yeniden eşitleme yapmadan aynı zincir verileriyle tekrar başlar.

## Docker Compose

Tek makine için depoyu klonlayın ve `docker/` klasöründeki varsayılan dosyayı başlatın:

```bash
git clone https://github.com/zecrocks/zcash-stack.git
cd zcash-stack/docker
docker compose up --detach
docker compose logs --follow
```

`compose.yaml`, x86 üzerinde Zebra, lightwalletd ve [Watchtower](https://containrrr.dev/watchtower/) çalıştırır; `compose.arm.yaml` ARM ana makinelerinde aynı işlemi yapar. Watchtower yeni imajları otomatik olarak indirir ve varsayılan dosya `zfnd/zebra:latest` etiketini kullandığından düğüm, yeni Zebra sürümlerini elle yükseltme yapmadan takip eder. `compose.zaino.yaml`, lightwalletd bileşenini Zaino ile değiştirir; ancak eski bir topluluk imajını (`emersonian/zcash-zaino:0.1.2-zr4`) sabitler, bu yüzden kullanmadan önce kontrol edin. Diğer dosyalar Caddy TLS ön ucu, bir VPS vekil sunucusu ve evdeki düğümler için autossh tüneli ekler.

Sunucunun bağış adresi olarak yayımlamak üzere `.env` dosyasındaki `LIGHTWALLETD_DONATION_ADDRESS` ayarını kendi birleşik adresinize göre belirleyin. İlk `docker compose up` çalıştırmasından önce `docker/` klasöründen `./download-snapshot.sh` komutunu çalıştırırsanız, zincir sıfırdan eşitlenmek yerine bir anlık görüntü indirilir.

## Bağlantı ve izleme

Atölyenin ikinci dersi, sunucuyu dışarıya açma yollarını ele alır: herkese açık statik IP, ev IP adresinizi VPS'ye SSH tüneli veya Tailscale Funnel arkasında gizleme ya da yalnızca Tor kullanan bir sunucu. Sonucu, bir cüzdanı sunucuya yönlendirerek (ZODL içinde, Gelişmiş Ayarlar'dan; bkz. [Cüzdanınızda sunucuyu değiştirme](/zcash-tech/lightwallet-nodes)) veya bir gRPC istemcisiyle `GetLightdInfo` çağrısı yaparak test edin.

İzleme konusunda üçüncü ders, elle çalıştırılan Docker komutlarını listeler ve herkese açık sunucuların zec.rocks çalışma süresi izleyicisi [hosh](https://hosh.zec.rocks/zec) üzerine kaydedilmesini önerir. Kayıt, hosh'un sunucu listesine ana bilgisayar adınızı ve bağlantı noktanızı ekleyen bir çekme isteği göndermekten ibarettir. Herhangi bir adımda yardım için [zec.rocks atölye forumuna](https://workshops.zec.rocks) başvurabilirsiniz.

## Sık yapılan hatalar

**lightwalletd bileşenini zincir düğümü olmadan kurmak.** lightwalletd, Zebra (veya Zakura) üzerinden veri okur. Bunlardan birini açın veya bunu yapan bir örnek dosyayla başlayın.

**Örnek RPC kimlik bilgilerini değiştirmeden bırakmak.** Örneklerde yer tutucular bulunur. RPC küme içinde kalır, ancak yine de bu bilgileri değiştirin.

**GKE'nin varsayılan disk kotasında zincir düğümü çalıştırmak.** Birim bağlanmaz. Kurulumdan önce bölgesel kotayı artırın.

**Zebra bileşenini yük dağıtımı için ölçeklendirmek.** Her Zebra kopyası fazladan bir tam eşitleme gerektirir. Bunun yerine lightwalletd veya Zaino bileşenini ölçeklendirin.

**Ağ yükseltmesi boyunca eski grafik sürümünü sabit tutmak.** Bir yükseltmeden önceki sürümü kullanan düğüm, yükseltme sonrasında Mainnet'i takip etmeyi bırakır (NU7'ten bu yana Zebra için 7.0.0 veya üzeri gerekir). `helm repo update` komutunu çalıştırıp grafiği etkinleştirme yüksekliklerinden ve Zakura destek sonu yüksekliklerinden önce yükseltin.

## İlgili Sayfalar

- [Zcash Hafif cüzdan düğümleri](/zcash-tech/lightwallet-nodes): hafif cüzdan sunucusunun neleri görüp göremediği ve herkese açık sunucular.
- [Zebra Tam düğüm](/zcash-tech/zebra-full-node): bu yığının çalıştırdığı doğrulayıcı.
- [Zakura Düğüm](/zcash-tech/zakura-node): grafiğin çalıştırabildiği Zebra çatallaması.
- [Zaino](/zcash-tech/zaino): Rust indeksleyicisi.
- [zecd](/zcash-tech/zecd): grafiğin ekleyebildiği cüzdan sunucusu.
- [Zcash Düğüm RPC ve indeksleme](/guides/zcash-node-rpc-and-indexing): Zebra RPC, Zallet ve indeksleyiciler.
- [Zebra'un Akash Ağı üzerinde nasıl çalıştırılacağı](/guides/akash-network-zebra): düğüm barındırmanın başka bir yolu.

## Kaynaklar

- [zecrocks/zcash-stack](https://github.com/zecrocks/zcash-stack) (depo, sürümler ve örnekler)
- [Zcash Stack Helm grafik README dosyası](https://github.com/zecrocks/zcash-stack/blob/main/charts/zcash-stack/README.md)
- [Atölye notları: Eşitle, Bağlan, Gözlemle](https://github.com/zecrocks/zcash-stack/tree/main/docs)
- [Docker README dosyası](https://github.com/zecrocks/zcash-stack/blob/main/docker/README.md)
- [Artifact Hub kaydı](https://artifacthub.io/packages/search?repo=zcash)
- [hosh.zec.rocks](https://hosh.zec.rocks/zec) (herkese açık sunucu izleyicisi)

**Son güncelleme:** Kasım 2026 (grafik 0.4.9)
