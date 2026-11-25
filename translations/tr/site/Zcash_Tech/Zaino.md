<a href="https://github.com/zechub/zechub/edit/main/site/Zcash_Tech/Zaino.md" target="_blank">
  <img src="https://img.shields.io/badge/Edit-blue" alt="Sayfayı Düzenle"/>
</a>

# Zaino Dizinleyici

## Özetle

* **Zebra**, Zcash Zincirini doğrular.
* **Zaino**, Zebra Zincir verilerini dizinler ve istemciye yönelik API'ler sunar.
* **Zallet**, Z3 yığınındaki cüzdan bileşenidir. Varsayılan Z3 kurulumunda Zallet, doğrudan Zebra ile iletişim kurar ve bağımsız Zaino hizmetini gerektirmez.
* Bağımsız Zaino hizmeti, işletmecilerin lightwalletd ile uyumlu bir gRPC uç noktasına, JSON-RPC vekil sunucusuna veya hafif cüzdanlar, gezginler, faucet'ler ve benzeri hizmetler için altyapıya ihtiyaç duyduğu durumlarda kullanışlıdır.
* Zaino etkin bir altyapıdır; ancak işletmeciler, üretimde çalıştırmadan önce güncel dağıtım ayrıntıları için resmî Zaino ve Z3 belgelerini kontrol etmelidir.

## Temel Açıklama

Zaino, Zcash blokzinciri için bir Rust dizinleyicisidir. Zincir verilerini bir Zebra tam düğümünden okur. Cüzdanların, gezginlerin, faucet'lerin ve diğer hizmetlerin ihtiyaç duyduğu verileri sunar; böylece Zebra her istemciye yönelik dizinden sorumlu olmak zorunda kalmaz.

### Zaino Ne İşe Yarar?

Zaino, Zebra ile istemci yazılımları arasında yer alır. Zebra, konsensüs düğümüdür: Zcash blokzincirini indirir, doğrular ve takip eder. Zaino, zincir verilerinin kaynağı olarak Zebra'ı kullanır ve ardından istemci uygulamalarının verimli biçimde sorgulayabileceği dizinlenmiş görünümler hazırlar.

Bu ayrım, rollerin net kalmasını sağlar:

| Bileşen | Rol |
|:--|:--|
| Zebra | Tam düğüm ve doğrulayıcı |
| Zaino | Dizinleyici ve istemciye yönelik API hizmeti |
| Zallet | Cüzdan hizmeti |
| lightwalletd | Zaino'in yerini almak veya onu tamamlamak üzere tasarlanmış eski hafif cüzdan sunucusu |

Zaino; hafif istemciler, tam istemciler veya cüzdanlar ve blok gezginleri için işlevsellik sağlar. Zebra tarafından tutulan kesinleşmiş Zincire, kesinleşmemiş en iyi Zincire ve bellek havuzu verilerine erişim sunar.

### Mevcut Zcash Stack İçindeki Yeri

Mevcut Z3 yığını, Zebra, Zallet ve isteğe bağlı Zaino etrafında oluşturulmuştur.

Varsayılan Z3 dağıtımında Zebra ve Zallet birlikte çalışır. Zallet, doğrudan Zebra'e erişir; bu nedenle yalnızca yerel bir cüzdan yığını çalıştıran işletmecinin bağımsız Zaino hizmetini başlatması gerekmez.

İşletmeci harici istemcilere hizmet vermek istediğinde Zaino eklenir. Z3'te `indexer` Compose profili arkasında çalışır ve şunları ekler:

* Hafif cüzdan istemcileri için lightwalletd ile uyumlu bir gRPC uç noktası
* Gezginler, faucet'ler ve hizmet arka uçları için bir JSON-RPC vekil sunucusu
* Zebra'ın Zincir durumundan ayrı bir dizinleyici veritabanı

Bu özellikleriyle Zaino; cüzdan arka uçları, halka açık altyapı işletmecileri, gezginler, faucet'ler ve dizinlenmiş Zcash Zincir verilerine ihtiyaç duyan hizmetleri deneyen geliştiriciler için özellikle önemlidir.

### Zaino ve lightwalletd

lightwalletd, özgün hafif cüzdan sunucusudur. Zaino, bu rol için Rust tabanlı sonraki çözümdür. Amacı, mümkün olduğunda uyumlu API'ler sunarak cüzdanların ve hizmetlerin tümü bir anda baştan yazılmadan geçiş yapabilmesini sağlamaktır.

Bu, her lightwalletd dağıtımının Zaino'e geçmiş olduğu anlamına gelmez. İşletmeciler Zaino'ı mevcut Zebra tabanlı yığının bir parçası olarak değerlendirmeli ve neyi çalıştıracaklarına karar vermeden önce en güncel proje belgelerini, sürümleri ve hizmet gösterge panellerini kontrol etmelidir.

## Görsel / Benzetme

Zcash blokzincirini, defter sayfalarından oluşan devasa bir arşiv olarak düşünün.

Zebra arşiv görevlisidir. Her yeni sayfayı alır, sayfanın kurallara uyduğunu kontrol eder ve doğru yere yerleştirir.

Zaino, arşivin önündeki danışma masasıdır. Zebra'in yerleştirdiklerini okur, hızlı aramalar için kataloglar oluşturur ve ziyaretçilere hızlıca yanıt verir. Hafif cüzdanlar, gezginler ve faucet'ler, “Bu blokta ne var?” veya “Bellek havuzunda hangi işlemler bekliyor?” gibi sorularla bu masaya gelir. Danışma masası, hangi sayfaların gerçek olduğuna karar vermez. Bu görev arşiv görevlisine aittir.

Varsayılan Z3 kurulumunda Zallet aynı binada çalışır ve doğrudan arşiv görevlisine gider. Danışma masasına ihtiyacı yoktur.

### Zaino Nasıl Çalıştığını Gösteren Bazı Diyagramlar

#### Zaino İç Mimari

![Zaino Internal Architecture](/content-images/image-2025-01-02-190143429-3f3cc78fa5.webp)

#### Zaino Canlı Hizmet Mimarisi

![Zebra Live Service Architecture](/content-images/image-2025-01-02-190349017-892cb409ea.webp)

#### Zaino Sistem Mimarisi

![Zaino System Architecture](/content-images/image-2025-01-02-190448037-1e4e675ccb.webp)

## Ayrıntılı İnceleme

### İşletmeci Notları

En kolay ve yetkili dağıtım yolu Z3 deposudur. Z3, isteğe bağlı bir hizmet olarak Zaino'ı içerir:

```bash
docker compose --env-file .env.<network> --profile indexer up -d
```

Bağımlı hizmetleri ana ağda veya test ağında başlatmadan önce normal Z3 kurulumunu çalıştırın ve Zebra eşitlenene kadar bekleyin.

Zaino iki tür ağ hizmeti sunar. gRPC hizmeti, hafif cüzdanlara yönelik API'dir. JSON-RPC hizmeti, harici bir katman koruma sağlamıyorsa yerel döngü arayüzü veya güvenilir özel ağlar için tasarlanmıştır. Kimlik doğrulaması veya şifrelemesi olmayan bir JSON-RPC uç noktasını halka açık internete açmayın.

## Yaygın Hatalar

**Zaino'ı tam düğüm sanmak.** Zaino doğrulayıcı değildir. Zebra Zinciri doğrular; Zaino ise Zebra'dan gelen verileri dizinler.

**Her Z3 dağıtımının bağımsız Zaino gerektirdiğini varsaymak.** Varsayılan Z3 yığınında Zallet, doğrudan Zebra'e erişebilir. Harici istemciler için bağımsız dizinleyici hizmetine ihtiyaç duyduğunuzda Zaino'ı başlatın.

**Planlanan özellikleri kullanıma sunulmuş gibi anlatmak.** Zaino etkin biçimde geliştiriliyor; bu nedenle bir özelliğin kullanıma sunulduğunu belirtmeden önce güncel sürüm notlarını ve belgeleri kontrol edin.

**JSON-RPC'yi dikkatsizce dışa açmak.** Zaino'ın JSON-RPC arayüzü, başka bir katman tarafından korunmadığı sürece yerel döngü arayüzü veya güvenilir özel ağlar içindir.

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
