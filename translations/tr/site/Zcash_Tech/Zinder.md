# Zinder Indexer

Zinder, Zcash Foundation tarafından yayımlanan ve Rust ile yazılmış, kendi sunucunuzda barındırabileceğiniz bir Zcash indexer’dır. Zinciri Zebra veya Zakura tam düğümden bir kez okur, tutarlı bir görünümünü saklar ve bu görünümü aynı anda birden fazla cüzdana, uygulamaya ve gezgine sunar. Mevcut hafif cüzdanlar, lightwalletd uyumlu bir adaptör aracılığıyla ona erişebilir.

> **Zinder alpha aşamasındadır.** Kendi README dosyasında yerel API’nin, lightwalletd uyumluluk yüzeyinin, depolama düzenlerinin ve dağıtım topolojisinin değişeceği, etiketli bir sürümün kararlılık taahhüdü olmadığı belirtiliyor. Tam sürüm numaralarını sabitleyin ve yükseltmelerde geriye dönük uyumsuzluk bekleyin.

## Özet

* **Zebra** veya **Zakura** Zincir’i doğrular. **Zinder**, düğümdeki verileri indeksler ve istemcilere sunar.
* İki erişim yolu vardır: Zinder’in kendi `WalletQuery` gRPC API’si ve lightwalletd’in `CompactTxStreamer` protokolünü konuşan ayrı bir adaptör. Böylece lightwalletd için geliştirilmiş cüzdanlar kod değişikliği olmadan ona bağlanabilir.
* Her okuma tek bir Zincir durumuna (“epoch”) sabitlenir; böylece bir eşitleme grubu, birbiriyle yarışan iki Zincir tepesindeki verileri karıştırmaz. Anahtarlar ve korumalı tarama cüzdanda kalır.
* Tek bir düğümü çalıştıran ve birçok tüketiciye hizmet veren tek bir işletmeci için tasarlanmıştır. Herkese açık uç noktaları kendi TLS, kimlik doğrulama ve hız sınırı kontrollerinizin arkasına alın.
* Sürümler hızla çıkıyor (10-14 Kasım 2026 arasında 0.7.0’dan 0.12.0’a) ve bunların birçoğu geriye dönük uyumsuz değişiklikler içeriyordu. Her yükseltmeden önce değişiklik günlüğünü okuyun.

## Zinder nerede konumlanıyor?

Hafif cüzdanlar tam düğümle doğrudan iletişim kurmaz. Bir indexer’dan sıkıştırılmış blokları, ağaç durumlarını ve işlem verilerini isterler (bkz. [Lightwallet Nodes](/zcash-tech/lightwallet-nodes)). Zcash ekosisteminde artık bunu yapabilen birkaç indexer bulunuyor:

| Indexer | Dil | Bakımını yapan | Bağlandığı yer | Notlar |
|:--|:--|:--|:--|:--|
| lightwalletd | Go | ECC / Zcash topluluğu | Zebra veya zcashd | İlk hafif cüzdan sunucusu |
| [Zaino](/zcash-tech/zaino) | Rust | Zingo Labs | Zebra veya zcashd | Z3 yığınında isteğe bağlı indexer profili |
| [Ztreamer](https://github.com/zcashlabs/ztreamer) | Rust | zcashlabs | Yerleşik Zakura düğümü | [Zaino ile Ztreamer karşılaştırmasını inceleyin](/zcash-tech/indexer-benchmark-zaino-vs-ztreamer) |
| **Zinder** | Rust | Zcash Foundation | Zebra 7.0.0 veya Zakura 1.8.6 (arşiv düğümü) | Alpha. Yerel API, lightwalletd adaptörü ve isteğe bağlı gezgin okumaları |

Zinder belgeleri, hangi durumda doğru tercih olduğunu açıkça belirtiyor: Zincir’e erişimin tek bir cüzdan sürecinden bağımsız olması, birkaç ayrı tüketiciye hizmet vermesi veya belirli bir cüzdanın kodundan ayrı kalması gerektiğinde en güçlü seçenektir. Tek ve sıkı biçimde bütünleşik bir cüzdan için yerleşik indexer daha basit olabilir. Yalnızca düğümün zaten sahip olduğu verilere ihtiyaç duyan bir tüketici ise doğrudan Zebra RPC’sini kullanabilir.

## Nasıl çalışır?

Zinder işleri, her biri tek bir görevi olan ayrı süreçlere böler:

| Çalışma zamanı | Rol |
|:--|:--|
| `zinder-ingest` | Kanonik Zincir deposuna (RocksDB) yazan tek süreçtir. Düğümü takip eder, yeniden düzenlemeleri yönetir ve canlı bellek havuzu durumunu tutar |
| `zinder-projector` | Cüzdan deposuna yazan tek süreçtir. Cüzdan biçimindeki Zincir görünümünü oluşturur ve takip eder |
| `zinder-query` | Yerel `WalletQuery` gRPC API’sini sunar |
| `zinder-compat-lightwalletd` | Aynı veriler üzerinden lightwalletd’in `CompactTxStreamer` API’sini sunar |

İsteğe bağlı gezgin katmanı (`zinder-explorer` ve `ExplorerQuery` ile) blok özetlerini, işlem ayrıntılarını, bellek havuzu görünümlerini ve aramayı sunar. İsteğe bağlı bir adaptör de CipherScan gezgininin REST ve WebSocket API’sini sunar. Bu ikisi sürüm imajlarının parçası değildir.

Her çalışma zamanı `/healthz`, `/readyz` ve `/metrics` sunar. Okuyucular, yalnızca Zincir deposu ve cüzdan deposundaki kopyaları tam olarak aynı Zincir durumunu gösterdiğinde hazır olduklarını bildirir.

## Bağlanma yolları

* **Mevcut hafif cüzdanlar**, lightwalletd entegrasyonlarını korur ve onu `zinder-compat-lightwalletd` adresine yönlendirir. Zinder belgeleri, protokol uyumluluğu ile desteği birbirinden ayırır: Adı belirtilen bir cüzdan ancak mevcut sürümü uçtan uca sertifikasyon testlerini geçtikten sonra desteklenmiş sayılır. 0.10.0 sürümü, `GetLightdInfo` protokol sürümü alanını düzelterek Zingo’in eşitlenmesini sağladı.
* **Yerel istemciler**, sabitlenmiş okumalar, sıkıştırılmış bloklar, Zincir ve bellek havuzu olay akışları ve türlendirilmiş ret nedenleri içeren yayın sonuçları için `zinder-query`’yi çağırır.
* **Rust uygulamaları**, depolama yığınını bağlamadan `zinder-query`’ye bağlanan, önce uzaktan bağlantı kuran bir SDK olan `zinder-client` crate’ini kullanır.
* **Gezginler ve arka uçlar**, cüzdan okumalarını isteğe bağlı `ExplorerQuery` katmanıyla birleştirir.

## Çalıştırma

Üst proje hızlı başlangıç kılavuzu, [Z3 yığınını](/zcash-tech/z3-stack) kullanarak bir düğüm başlatır, ardından Zinder checkout’undan Docker Compose ile Zinder çalıştırır:

```bash
# In the Z3 checkout
Z3_NETWORK=testnet docker compose up -d

# In the Zinder checkout
docker compose --env-file deploy/.env.testnet \
  -f deploy/docker-compose.yml up -d --build
```

Mainnet ve Zakura düğümü (`deploy/.env.zakura-mainnet`, `deploy/.env.zakura-testnet`) için ortam dosyaları bunun yanında bulunur. 0.11.0 sürümünden itibaren Compose dosyası artık Z3 varsayımında bulunmuyor: Ortam dosyasında düğümün ağını, RPC kimlik doğrulama çerezinin saklandığı birimi ve RPC adresini belirtmeniz gerekir.

Varsayılan ana makine portları (Testnet için 10000 eklenir):

| Hizmet | Mainnet | Testnet |
|:--|:--|:--|
| Yerel `WalletQuery` gRPC | 9102 | 19102 |
| lightwalletd uyumlu gRPC | 9067 | 19067 |
| Hazır olma: ingest / projector / query / compat | 9105 / 9110 / 9106 / 9107 | 19105 / 19110 / 19106 / 19107 |

Her iki cüzdan portu da loopback adresine bağlanır. Şu komutla kontrol edin:

```bash
grpcurl -plaintext -d '{}' 127.0.0.1:19102 zinder.v1.wallet.WalletQuery/ServerInfo
grpcurl -plaintext -d '{}' 127.0.0.1:19067 cash.z.wallet.sdk.rpc.CompactTxStreamer/GetLightdInfo
```

Diğer dağıtım yöntemleri:

* `ghcr.io/zcashfoundation/` üzerindeki **sürüm imajları**: Dört çalışma zamanı ve ayrıca `zinder-wallet-serving` (tek bir birimi tek bir konteynere bağlayabilen ana makineler için tek konteynerde ingest, projector ve yerel query; lightwalletd adaptörü yoktur) ile `zinder-canonical-runtime` (yalnızca ingest).
* x86-64 (x86-64-v3 CPU gerektirir) ve AArch64 için **Linux ikili dosyaları**; glibc 2.34 veya daha yenisi gerekir. Debian 12, sertifikalı temel sürümdür. Her sürümde bir SBOM ve imzalı SLSA provenans bilgisi bulunur.

### Düğümün sağlaması gerekenler

* Bir **arşiv düğümü**. 0.11.0 sürümünden beri `zinder-ingest` budanmış bir düğüme bağlandığında başlatmayı reddeder.
* Zebra **7.0.0** veya Zakura **1.8.6**. Bunlar sürüm kanallarının sertifikasyonunu yaptığı iki düğüm sürümüdür.
* `zinder-wallet-serving` imajı için düğümün **indexer gRPC uç noktası** gerekir (`ZINDER_NODE__INDEXER_GRPC_ADDR`, Zebra’in `indexer_listen_addr`’si, Mainnet’te 8155 portu). Loopback dışındaki bir adreste bulunan Zakura indexer için karşılıklı TLS gerekir; Zinder bunu 0.11.0 sürümünden beri destekler.

### Mainnet boyutlandırması

Cüzdan hizmeti çalıştırma kılavuzuna göre:

* En az **8 GB bellek**. Ölçülen en yüksek değerler: ingest yaklaşık 2,6 GiB, projector oluşturma sırasında yaklaşık 2,7 GiB, query ise en fazla yaklaşık 1,4 GiB.
* Mainnet cüzdan deposu oluşturulurken birimde yaklaşık **130 GB boş alan** bulundurun.
* Genesis’ten itibaren ölçülen bir Mainnet oluşturma işlemi, Zincir deposu için (hazırlık alanı yaklaşık 310 GB) yaklaşık **dört saat**, cüzdan deposu içinse **iki saatten fazla** sürdü. Dağıtımla gelen oluşturma zaman aşımı değerleri yalnızca Testnet için uygundur: Mainnet’te bunları en az 24 saate ve 12 saate yükseltin; aksi hâlde oluşturma işlemi yeniden başlar ve hiç tamamlanmaz.

## Bilinmesi gereken sürüm notları

| Sürüm | Tarih | İşletmeciler için değişiklikler |
|:--|:--|:--|
| 0.7.0 | 2026-11-10 | Varsayılan yeniden düzenleme penceresi, Zebra 7 ve Zakura’in blokları sonlandırdığı derinlik olan 1000 bloğa çıkarıldı. Geri alınamaz: Daha eski sürümler, bu değişiklikle büyütülen depoları açamaz |
| 0.9.0 | 2026-11-12 | Yeni `zinder-wallet-serving` ve `zinder-canonical-runtime` imajları |
| 0.10.0 | 2026-11-13 | **NU7 bloklarını çözümleyebilen ilk sürüm.** 0.9.0 ve önceki sürümler ilk NU7 bloğunda durur. Yerel protokol revizyonu 8: ingest ve query’yi birlikte, onlarla birlikte de yerel istemcileri yükseltin |
| 0.11.1 | 2026-11-14 | Zebra 7.0.0’ın yanında Zakura 1.8.6 da sertifikalandı; düğümün indexer’ına karşılıklı TLS desteği eklendi; budanmış düğümler reddedildi. 0.11.0 yalnızca crate olarak yayımlandı; bu nedenle 0.11.1’i dağıtın |
| 0.12.0 | 2026-11-14 | Hazır olma ve kapatma düzeltmeleri; gezgin yeniden oynatımı hızlandı ve disk alanı azalınca duraklıyor |

## Yaygın hatalar

**Bunu üretim yazılımı olarak görmek.** Proje kendisini alpha olarak tanımlıyor. Kendi ifadesiyle, yerel Compose dağıtımının başarılı olması “tek başına üretim sertifikasyonu anlamına gelmez”.

**Budanmış bir düğüme yönlendirmek.** Ingest başlangıçta kapanır. Arşiv Zebra veya Zakura düğümü kullanın.

**gRPC portlarını doğrudan internete açmak.** Her iki cüzdan portunun loopback adresine bağlanmasının bir nedeni var. İnternete açmadan önce kontrolünüzdeki bir proxy üzerinden TLS, kimlik doğrulama, hız sınırları ve kota uygulayın.

**Her çalışma zamanını ayrı ayrı yükseltmek.** Birkaç sürüm, yerel protokol revizyonunu veya depo biçimini değiştirir. Zinder hizmetlerini birlikte yükseltin ve yerel istemcileri de aynı geçişte güncelleyin.

**Protokol destekleniyorsa cüzdanın da desteklendiğini varsaymak.** lightwalletd adaptörü protokolü konuşur; ancak Zinder, adı belirtilen bir cüzdan için desteği yalnızca o cüzdanın mevcut sürümü uçtan uca sertifikalandıktan sonra taahhüt eder.

## İlgili sayfalar

* [Lightwallet Nodes](/zcash-tech/lightwallet-nodes) — hafif cüzdan sunucusunun ne yaptığı ve neleri görebildiği
* [Zaino](/zcash-tech/zaino) — Zingo Labs’in Rust indexer’ı
* [Indexer Benchmark: Zaino ile Ztreamer](/zcash-tech/indexer-benchmark-zaino-vs-ztreamer) karşılaştırması
* [Z3 Stack](/zcash-tech/z3-stack) — Zebra + Zallet; Zinder hızlı başlangıç kılavuzunda kullanılan düğüm kurulumu
* [Zebra Full Node](/zcash-tech/zebra-full-node) ve [Zakura Node](/zcash-tech/zakura-node) — Zinder’in sertifikalandırdığı iki düğüm

## Daha fazla bilgiyi nerede bulabilirim?

* [Zinder GitHub deposu](https://github.com/ZcashFoundation/zinder)
* [Zinder sürümleri](https://github.com/ZcashFoundation/zinder/releases) ve [değişiklik günlüğü](https://github.com/ZcashFoundation/zinder/blob/main/CHANGELOG.md)
* [Zinder nedir, ne değildir](https://github.com/ZcashFoundation/zinder/blob/main/docs/architecture/indexer-wallet-boundary.md)
* [Bir VM’ye dağıtım](https://github.com/ZcashFoundation/zinder/blob/main/docs/runbooks/deploying-on-a-vm.md) ve [cüzdan hizmeti imajı](https://github.com/ZcashFoundation/zinder/blob/main/docs/runbooks/deploying-wallet-serving.md) çalıştırma kılavuzları

**Son güncelleme:** Kasım 2026
