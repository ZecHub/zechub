# Zinder İndeksleyici

Zinder, Rust ile yazılmış ve Zcash Foundation tarafından yayımlanan, kendi sunucunuzda çalıştırabileceğiniz bir Zcash indeksleyicisidir. Zinciri bir kez Zebra veya Zakura tam düğümünden okur, tutarlı bir görünümünü saklar ve aynı anda birden fazla cüzdana, uygulamaya ve blok gezginine sunar. Mevcut hafif cüzdanlar, lightwalletd uyumlu bir adaptör aracılığıyla ona bağlanabilir.

> **Zinder alfa aşamasındadır.** Kendi README dosyasında yerel API'nin, lightwalletd uyumluluk arayüzünün, depolama düzenlerinin ve dağıtım topolojisinin değişeceği; etiketli bir sürümün kararlılık garantisi vermediği belirtiliyor. Sürümleri tam olarak sabitleyin ve yükseltmelerde geriye dönük uyumsuz değişiklikler bekleyin.

## Kısaca

* **Zebra** veya **Zakura** zinciri doğrular. **Zinder** ise düğümdeki verileri indeksleyip istemcilere sunar.
* İki bağlantı yolu vardır: Zinder'ın kendi `WalletQuery` gRPC API'si ve lightwalletd'ın `CompactTxStreamer` protokolünü konuşan ayrı bir adaptör. Böylece lightwalletd için geliştirilmiş cüzdanlar, kod değişikliği yapmadan buna bağlanabilir.
* Her okuma tek bir zincir durumuna ("epoch") sabitlenir; böylece bir eşitleme grubu, birbiriyle yarışan iki zincir ucundan gelen verileri karıştırmaz. Anahtarlar ve korumalı tarama cüzdanda kalır.
* Tek bir operatörün bir düğüm çalıştırıp birçok tüketiciye hizmet vermesi için tasarlanmıştır. Herkese açık uç noktaları kendi TLS, kimlik doğrulama ve hız sınırı altyapınızın arkasında çalıştırın.
* Sürümler hızla yayımlanıyor (10–14 Kasım 2026 arasında 0.7.0'dan 0.12.0'a) ve bunların birkaçı geriye dönük uyumsuz değişiklikler içeriyor. Her yükseltmeden önce değişiklik günlüğünü okuyun.

## Zinder'ın yeri

Hafif cüzdanlar tam düğümlerle doğrudan iletişim kurmaz. Sıkıştırılmış blokları, ağaç durumlarını ve işlem verilerini bir indeksleyiciden isterler (bkz. [Lightwallet Nodes](/zcash-tech/lightwallet-nodes)). Zcash ekosisteminde artık bunu yapabilen birkaç indeksleyici var:

| İndeksleyici | Dil | Bakımını yapan | Bağlandığı kaynak | Notlar |
|:--|:--|:--|:--|:--|
| lightwalletd | Go | ECC / Zcash topluluğu | Zebra veya zcashd | İlk hafif cüzdan sunucusu |
| [Zaino](/zcash-tech/zaino) | Rust | Zingo Labs | Zebra veya zcashd | Z3 yığınında isteğe bağlı indeksleyici profili |
| [Ztreamer](https://github.com/zcashlabs/ztreamer) | Rust | zcashlabs | Gömülü Zakura düğüm | [Zaino ile Ztreamer karşılaştırmasına bakın](/zcash-tech/indexer-benchmark-zaino-vs-ztreamer) |
| **Zinder** | Rust | Zcash Foundation | Zebra 7.0.0 veya Zakura 1.8.6 (arşiv düğümü) | Alfa aşamasında. Yerel API, lightwalletd adaptörü ve isteğe bağlı blok gezgini okumaları |

Zinder belgeleri, hangi durumlarda doğru tercih olduğunu açıkça belirtiyor: Zincir erişiminin tek bir cüzdan sürecinden bağımsız olması, birbirinden bağımsız birçok tüketiciye hizmet vermesi veya herhangi bir cüzdanın kodundan ayrı tutulması gerektiğinde en güçlü seçenektir. Tek ve sıkı biçimde bütünleşik bir cüzdan için gömülü indeksleyici daha basit olabilir; yalnızca düğümün zaten sahip olduğu verilere ihtiyaç duyan bir tüketici ise Zebra RPC'sini doğrudan kullanabilir.

## Nasıl çalışır?

Zinder işleri ayrı süreçlere böler; her sürecin tek bir görevi vardır:

| Çalışma zamanı | Görevi |
|:--|:--|
| `zinder-ingest` | Kanonik zincir deposuna (RocksDB) yazan tek süreçtir. Düğümü takip eder, zincir çatallanması durumlarını yönetir ve canlı bellek havuzu durumunu tutar |
| `zinder-projector` | Cüzdan deposuna yazan tek süreçtir. Zincirin cüzdan odaklı görünümünü oluşturur ve takip eder |
| `zinder-query` | Yerel `WalletQuery` gRPC API'sini sunar |
| `zinder-compat-lightwalletd` | Aynı veriler üzerinde lightwalletd'ın `CompactTxStreamer` API'sini sunar |

İsteğe bağlı bir blok gezgini katmanı (`zinder-explorer` ve `ExplorerQuery` ile) blok özetlerini, işlem ayrıntılarını, bellek havuzu görünümlerini ve aramayı sunar. İsteğe bağlı bir adaptör de CipherScan blok gezgininin REST ve WebSocket API'lerini sunar. Bu ikisi sürüm imajlarının parçası değildir.

Her çalışma zamanı `/healthz`, `/readyz` ve `/metrics` sunar. Okuyucular ancak zincir deposu ve cüzdan deposu kopyaları tamamen aynı zincir durumunu gösterdiğinde hazır olduklarını bildirir.

## Bağlantı yolları

* **Mevcut hafif cüzdanlar**, lightwalletd entegrasyonlarını kullanmaya devam eder ve `zinder-compat-lightwalletd`'a bağlanır. Zinder belgeleri, protokol uyumluluğu ile desteği birbirinden ayırır: Bir cüzdan ancak mevcut sürümü uçtan uca sertifikasyondan geçtikten sonra desteklenmiş sayılır. 0.10.0 sürümünde, Zingo'ın eşitlenebilmesi için `GetLightdInfo` protokol sürüm alanı düzeltildi.
* **Yerel istemciler**, sabitlenmiş okumalar, sıkıştırılmış bloklar, zincir ve bellek havuzu olay akışları ve tür belirtilmiş ret nedenleri içeren yayın sonuçları için `zinder-query`'ı çağırır.
* **Rust uygulamaları**, depolama yığınını bağlamadan `zinder-query`'a bağlanan, uzak bağlantı öncelikli bir SDK olan `zinder-client` paketini kullanır.
* **Blok gezginleri ve arka uç sistemleri**, cüzdan okumalarını isteğe bağlı `ExplorerQuery` katmanıyla birleştirir.

## Çalıştırma

Üst projenin hızlı başlangıç kılavuzu önce [Z3 yığını](/zcash-tech/z3-stack) ile bir düğüm başlatır, ardından Zinder deposundaki Docker Compose ile Zinder çalıştırır:

```bash
# In the Z3 checkout
Z3_NETWORK=testnet docker compose up -d

# In the Zinder checkout
docker compose --env-file deploy/.env.testnet \
  -f deploy/docker-compose.yml up -d --build
```

Mainnet ve Zakura düğümü (`deploy/.env.zakura-mainnet`, `deploy/.env.zakura-testnet`) için ortam dosyaları bunun yanında bulunur. 0.11.0 sürümünden itibaren Compose dosyası artık Z3 varsayımında bulunmuyor: Ortam dosyasında düğümün ağı, çerez birimi ve RPC adresi belirtilmelidir.

Varsayılan ana makine bağlantı noktaları (Testnet için 10000 ekleyin):

| Hizmet | Mainnet | Testnet |
|:--|:--|:--|
| Yerel `WalletQuery` gRPC | 9102 | 19102 |
| lightwalletd uyumlu gRPC | 9067 | 19067 |
| Hazır olma: ingest / projector / query / compat | 9105 / 9110 / 9106 / 9107 | 19105 / 19110 / 19106 / 19107 |

Her iki cüzdan bağlantı noktası da loopback adresine bağlanır. Şunlarla kontrol edin:

```bash
grpcurl -plaintext -d '{}' 127.0.0.1:19102 zinder.v1.wallet.WalletQuery/ServerInfo
grpcurl -plaintext -d '{}' 127.0.0.1:19067 cash.z.wallet.sdk.rpc.CompactTxStreamer/GetLightdInfo
```

Diğer dağıtım yöntemleri:

* **`ghcr.io/zcashfoundation/` üzerindeki sürüm imajları**: Dört çalışma zamanı ve ayrıca `zinder-wallet-serving` (bir birimi tek bir konteynere bağlayabilen ana makineler için ingest, projector ve yerel query tek konteynerde; lightwalletd adaptörü yok) ile `zinder-canonical-runtime` (yalnızca ingest).
* **Linux ikili dosyaları**: x86-64 (x86-64-v3 CPU gerekir) ve AArch64 için, glibc 2.34 veya üstüyle. Sertifikalı temel sistem Debian 12'dir. Her sürümde bir SBOM ve imzalı SLSA provenansı bulunur.

### Düğümün sağlaması gerekenler

* Bir **arşiv düğümü**. 0.11.0 sürümünden itibaren `zinder-ingest`, budanmış bir düğüme bağlanarak başlatılmayı reddeder.
* Zebra **7.0.0** veya Zakura **1.8.6**. Sürüm kanallarının sertifikalandırdığı iki düğüm sürümü bunlardır.
* `zinder-wallet-serving` imajı için düğümün **indeksleyici gRPC uç noktası** (`ZINDER_NODE__INDEXER_GRPC_ADDR`, Zebra'ın `indexer_listen_addr`'i, Mainnet'te 8155 numaralı bağlantı noktası). Loopback dışındaki bir adreste çalışan Zakura indeksleyicisi karşılıklı TLS gerektirir; Zinder bunu 0.11.0 sürümünden itibaren destekler.

### Mainnet için boyutlandırma

Cüzdan sunma kılavuzuna göre:

* En az **8 GB bellek**. Ölçülen en yüksek bellek kullanımları: ingest yaklaşık 2,6 GiB, oluşturma sırasında projector yaklaşık 2,7 GiB, query ise yaklaşık 1,4 GiB'ye kadar.
* Mainnet cüzdan deposu oluşturulurken birimde yaklaşık **130 GB boş alan** bulundurun.
* Genesis'ten başlayan ölçülmüş bir Mainnet oluşturma işlemi, zincir deposu için yaklaşık **dört saat** (hazırlık aşamasında yaklaşık 310 GB) ve cüzdan deposu için **iki saatten fazla** sürdü. Dağıtımla gelen oluşturma zaman aşımı değerleri yalnızca Testnet için uygundur: Mainnet'te en az 24 saat ve 12 saat olarak ayarlayın; aksi takdirde oluşturma yeniden başlar ve hiç tamamlanmaz.

## Bilinmesi gereken sürüm notları

| Sürüm | Tarih | Operatörleri ilgilendiren değişiklikler |
|:--|:--|:--|
| 0.7.0 | 2026-11-10 | Varsayılan zincir çatallanması aralığı, Zebra 7 ve Zakura bloklarının kesinleştiği derinlik olan 1000 bloğa çıkarıldı. Geri alınamaz: Eski sürümler artık büyütülmüş depoları açamaz |
| 0.9.0 | 2026-11-12 | Yeni `zinder-wallet-serving` ve `zinder-canonical-runtime` imajları |
| 0.10.0 | 2026-11-13 | **NU7 bloklarını çözen ilk sürüm.** 0.9.0 ve öncesi ilk NU7 bloğunda durur. Yerel protokol revizyonu 8: ingest ve query hizmetlerini birlikte, yerel istemcileri de onlarla birlikte yükseltin |
| 0.11.1 | 2026-11-14 | Zebra 7.0.0 yanında Zakura 1.8.6 sertifikalandırıldı; düğümün indeksleyicisine karşılıklı TLS desteği eklendi; budanmış düğümler reddediliyor. 0.11.0 yalnızca paketler olarak yayımlandı, bu nedenle 0.11.1'i dağıtın |
| 0.12.0 | 2026-11-14 | Hazır olma ve kapanma düzeltmeleri; blok gezgini yeniden oynatması hızlandı ve disk alanı azalınca duraklıyor |

## Sık yapılan hatalar

**Üretime hazır yazılım gibi değerlendirmek.** Proje kendisini alfa olarak tanımlıyor. Kendi ifadesiyle, yerel Compose dağıtımının başarıyla çalışması "tek başına üretim sertifikasyonu anlamına gelmez".

**Budanmış bir düğüme bağlamak.** Ingest başlangıçta kapanır. Bir arşiv Zebra veya Zakura düğümü kullanın.

**gRPC bağlantı noktalarını doğrudan internete açmak.** Her iki cüzdan bağlantı noktası da bilinçli olarak loopback adresine bağlanır. Bunları internete açmadan önce kontrol ettiğiniz bir vekil sunucuda TLS, kimlik doğrulama, hız sınırları ve kotalar uygulayın.

**Çalışma zamanlarını tek tek yükseltmek.** Birkaç sürüm yerel protokol revizyonunu veya depo biçimini değiştiriyor. Zinder hizmetlerini birlikte yükseltin ve aynı geçişte yerel istemcileri de güncelleyin.

**Protokol destekleniyorsa cüzdanın da desteklendiğini varsaymak.** lightwalletd adaptörü protokolü konuşur; ancak Zinder, adı belirtilen bir cüzdanı yalnızca cüzdanın mevcut sürümü uçtan uca sertifikalandıktan sonra desteklediğini belirtir.

## İlgili sayfalar

* [Lightwallet Nodes](/zcash-tech/lightwallet-nodes) — hafif cüzdan sunucusunun ne yaptığı ve neleri görebildiği
* [Zaino](/zcash-tech/zaino) — Zingo Labs'ın Rust indeksleyicisi
* [İndeksleyici Karşılaştırması: Zaino ile Ztreamer](/zcash-tech/indexer-benchmark-zaino-vs-ztreamer)
* [Z3 Yığını](/zcash-tech/z3-stack) — Zebra + Zallet; Zinder hızlı başlangıç kılavuzunda kullanılan düğüm kurulumu
* [Zebra Tam Düğüm](/zcash-tech/zebra-full-node) ve [Zakura Düğümü](/zcash-tech/zakura-node) — Zinder'ın sertifikalandırdığı iki düğüm

## Daha fazla bilgiyi nerede bulabilirim?

* [Zinder GitHub deposu](https://github.com/ZcashFoundation/zinder)
* [Zinder sürümleri](https://github.com/ZcashFoundation/zinder/releases) ve [değişiklik günlüğü](https://github.com/ZcashFoundation/zinder/blob/main/CHANGELOG.md)
* [Zinder nedir, ne değildir](https://github.com/ZcashFoundation/zinder/blob/main/docs/architecture/indexer-wallet-boundary.md)
* [Bir sanal makineye dağıtım](https://github.com/ZcashFoundation/zinder/blob/main/docs/runbooks/deploying-on-a-vm.md) ve [cüzdan sunma imajı](https://github.com/ZcashFoundation/zinder/blob/main/docs/runbooks/deploying-wallet-serving.md) kılavuzları

**Son güncelleme:** Kasım 2026
