<a href="https://github.com/zechub/zechub/edit/main/site/Zcash_Tech/Zaino.md" target="_blank">
  <img src="https://img.shields.io/badge/Edit-blue" alt="Sayfayı Düzenle"/>
</a>

# Zaino İndeksleyicisi

## Kısaca

* **Zebra**, Zcash zincirini doğrular.
* **Zaino**, Zebra'in zincir verilerini indeksler ve istemcilere yönelik API'ler sunar.
* **Zallet**, Z3 yığınındaki cüzdan bileşenidir. Varsayılan Z3 kurulumunda Zallet, doğrudan Zebra ile iletişim kurar ve bağımsız Zaino hizmetine ihtiyaç duymaz.
* Bağımsız Zaino hizmeti, operatörlerin lightwalletd ile uyumlu bir gRPC uç noktasına, bir JSON-RPC proxy'sine veya hafif cüzdanlar, gezginler, faucet'ler ve benzer hizmetler için altyapıya ihtiyaç duyduğu durumlarda kullanışlıdır.
* Zaino aktif bir altyapıdır, ancak operatörler bunu üretimde çalıştırmadan önce güncel dağıtım ayrıntıları için resmî Zaino ve Z3 belgelerini kontrol etmelidir.

## Temel Açıklama

Zaino, Zcash blokzinciri için bir Rust dizinleyicisidir. Zincir verilerini bir Zebra tam düğümünden okur. Cüzdanların, gezginlerin, faucet'lerin ve diğer hizmetlerin ihtiyaç duyduğu verileri sunar; böylece Zebra her istemciye yönelik dizinden sorumlu olmak zorunda kalmaz.

### Zaino Ne İşe Yarar?

Zaino, Zebra ile istemci yazılımı arasında yer alır. Zebra konsensüs düğümüdür: Zcash blok zincirini indirir, doğrular ve takip eder. Zaino, zincir verisi kaynağı olarak Zebra'ü kullanır ve ardından istemci uygulamalarının verimli biçimde sorgulayabileceği indekslenmiş görünümler hazırlar.

Bu ayrım, rolleri net tutar:

| Bileşen | Rol |
|:--|:--|
| Zebra | Tam düğüm ve doğrulayıcı |
| Zaino | İndeksleyici ve istemcilere yönelik API hizmeti |
| Zallet | Cüzdan hizmeti |
| lightwalletd | Zaino'ün değiştirmek veya tamamlamak üzere tasarlandığı eski hafif cüzdan sunucusu |

Zaino; hafif istemciler, tam istemciler veya cüzdanlar ve blok gezginleri için işlevsellik sağlar. Zebra tarafından tutulan kesinleşmiş Zincire, kesinleşmemiş en iyi Zincire ve bellek havuzu verilerine erişim sunar.

### Mevcut Zcash Stack İçindeki Yeri

Mevcut Z3 yığını; Zebra, Zallet ve isteğe bağlı Zaino etrafında oluşturulmuştur.

Varsayılan Z3 dağıtımında Zebra ve Zallet birlikte çalışır. Zallet doğrudan Zebra'e erişir; dolayısıyla yalnızca yerel bir cüzdan yığını çalıştıran bir operatörün bağımsız Zaino hizmetini başlatması gerekmez.

Zaino, operatör harici istemcilere hizmet vermek istediğinde eklenir. Z3'te `indexer` Compose profili arkasında çalışır ve şunları ekler:

* hafif cüzdan istemcileri için lightwalletd ile uyumlu bir gRPC uç noktası
* gezginler, faucet'ler ve hizmet arka uçları için bir JSON-RPC proxy'si
* Zebra'ün zincir durumundan ayrı bir indeksleyici veritabanı

Bu, Zaino'ü özellikle cüzdan arka uçları, herkese açık altyapı operatörleri, gezginler, faucet'ler ve indekslenmiş Zcash zincir verilerine ihtiyaç duyan hizmetleri test eden geliştiriciler için önemli kılar.

### Zaino ve lightwalletd

lightwalletd, özgün hafif cüzdan sunucusudur. Zaino, bu rol için Rust tabanlı ardıl yoldur. Amacı, mümkün olan yerlerde uyumlu API'ler sunarak cüzdanların ve hizmetlerin tek seferde tamamen yeniden yazılmadan geçiş yapabilmesini sağlamaktır.

Bu, her lightwalletd dağıtımının hâlihazırda Zaino'e geçtiği anlamına gelmez. Operatörler Zaino'ü mevcut Zebra tabanlı yığının bir parçası olarak değerlendirmeli ve ne çalıştıracaklarına karar vermeden önce en güncel proje belgelerini, sürümleri ve hizmet panolarını kontrol etmelidir.

## Görsel / Benzetme

Zcash blokzincirini, defter sayfalarından oluşan devasa bir arşiv olarak düşünün.

Zebra arşiv görevlisidir. Her yeni sayfayı alır, sayfanın kurallara uyduğunu kontrol eder ve doğru yere yerleştirir.

Zaino, arşivin önündeki danışma masasıdır. Zebra'in yerleştirdiklerini okur, hızlı aramalar için kataloglar oluşturur ve ziyaretçilere hızlıca yanıt verir. Hafif cüzdanlar, gezginler ve faucet'ler, “Bu blokta ne var?” veya “Bellek havuzunda hangi işlemler bekliyor?” gibi sorularla bu masaya gelir. Danışma masası, hangi sayfaların gerçek olduğuna karar vermez. Bu görev arşiv görevlisine aittir.

Varsayılan Z3 kurulumunda Zallet aynı binada çalışır ve doğrudan arşiv görevlisine gider. Danışma masasına ihtiyacı yoktur.

### Zaino Nasıl Çalıştığını Gösteren Bazı Diyagramlar

#### Zaino İç Mimari

![Zaino İç Mimarisi](/content-images/image-2025-01-02-190143429-3f3cc78fa5.webp)

#### Zaino Canlı Hizmet Mimarisi

![Zebra Canlı Hizmet Mimarisi](/content-images/image-2025-01-02-190349017-892cb409ea.webp)

#### Zaino Sistem Mimarisi

![Zaino Sistem Mimarisi](/content-images/image-2025-01-02-190448037-1e4e675ccb.webp)

## Ayrıntılı İnceleme

### İşletmeci Notları

En kolay ve yetkili dağıtım yolu Z3 deposudur. Z3, Zaino'ü isteğe bağlı bir hizmet olarak içerir:

```bash
docker compose --env-file .env.<network> --profile indexer up -d
```

Önce normal Z3 kurulumunu çalıştırın ve mainnet veya testnet üzerinde bağımlı hizmetleri başlatmadan önce Zebra'ün senkronize olmasını bekleyin.

Zaino iki tür ağ hizmeti sunar. gRPC hizmeti, hafif cüzdanlara yönelik API'dir. JSON-RPC hizmeti, harici bir katman koruma sağlamıyorsa yerel döngü arayüzü veya güvenilir özel ağlar için tasarlanmıştır. Kimlik doğrulaması veya şifrelemesi olmayan bir JSON-RPC uç noktasını halka açık internete açmayın.

## Yaygın Hatalar

**Zaino'ü tam düğüm olarak değerlendirmek.** Zaino doğrulayıcı değildir. Zebra zinciri doğrular; Zaino, Zebra'den gelen verileri indeksler.

**Her Z3 dağıtımının bağımsız Zaino'e ihtiyaç duyduğunu varsaymak.** Varsayılan Z3 yığınında Zallet, doğrudan Zebra'e erişebilir. Harici istemciler için bağımsız indeksleyici hizmetine ihtiyaç duyduğunuzda Zaino'ü başlatın.

**Planlanan özellikleri hâlihazırda dağıtılmış gibi sunmak.** Zaino aktif olarak geliştirilmektedir; bu nedenle bir özelliği kullanılabilir olarak tanımlamadan önce güncel sürüm notlarını ve belgeleri kontrol edin.

**JSON-RPC'yi dikkatsizce açığa çıkarmak.** Zaino'ün JSON-RPC arayüzü, başka bir katman tarafından korunmadığı sürece loopback veya güvenilir özel ağlar içindir.

## İlgili Sayfalar

- [Hafif Cüzdan Düğümleri](/zcash-tech/lightwallet-nodes): Hafif cüzdanların bağlandığı sunucular; lightwalletd ve Zaino ile bunlar arasında nasıl geçiş yapılacağı.
- [Zinder](/zcash-tech/zinder), Zcash Foundation'ten başka bir Rust dizinleyicisi (alfa)
- [Zebra Tam Düğüm](/zcash-tech/zebra-full-node): Zaino'ın Zincir verilerini okuduğu düğüm.
- [Zallet](/zcash-tech/zallet): Z3 yığınındaki tam düğüm cüzdanı.
- [Z3 Yığını](/zcash-tech/z3-stack): Bir arada paketlenmiş Zebra, Zallet ve isteğe bağlı Zaino dizinleyicisi.
- [Dizinleyici Karşılaştırması: Zaino ve Ztreamer](/zcash-tech/indexer-benchmark-zaino-vs-ztreamer): İki hafif cüzdan dizinleyicisinin tekrarlanabilir bir karşılaştırması.
- [Tam Düğümler](/zcash-tech/full-nodes): Zcash tam düğüm yazılımlarına genel bakış.
- [Zcash Cüzdan Eşitleme](/zcash-tech/zcash-wallet-syncing): Korumalı cüzdanların neden bir eşitleme sürecine ihtiyaç duyduğu.

### Kaynaklar

* [Zaino GitHub deposu](https://github.com/zingolabs/zaino)
* [Zaino sürümleri](https://github.com/zingolabs/zaino/releases)
* [Zaino oluşturulan belgeler](https://zingolabs.github.io/zaino/)
* [Z3 dağıtım deposu](https://github.com/ZcashFoundation/z3)
* [Zebra belgeleri](https://zebra.zfnd.org/)
* [Zaino hibe ve proje tartışması](https://forum.zcashcommunity.com/t/zingo-labs-accelerates-zcashd-deprecation-with-zaino/48545)

**Son güncelleme:** Kasım 2026
