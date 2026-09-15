# Zaino İndeksleyicisi

Zaino, Zcash blok zinciri için Rust tabanlı bir indeksleyicidir. Zincir verilerini bir Zebra tam düğümünden okur ve cüzdanların, gezginlerin, faucet'lerin ve diğer hizmetlerin ihtiyaç duyduğu verileri sunarak, istemcilere yönelik her indeksin sorumluluğunu Zebra'ün kendisine yüklemez.

## Kısaca

* **Zebra**, Zcash zincirini doğrular.
* **Zaino**, Zebra'in zincir verilerini indeksler ve istemcilere yönelik API'ler sunar.
* **Zallet**, Z3 yığınındaki cüzdan bileşenidir. Varsayılan Z3 kurulumunda Zallet, doğrudan Zebra ile iletişim kurar ve bağımsız Zaino hizmetine ihtiyaç duymaz.
* Bağımsız Zaino hizmeti, operatörlerin lightwalletd ile uyumlu bir gRPC uç noktasına, bir JSON-RPC proxy'sine veya hafif cüzdanlar, gezginler, faucet'ler ve benzer hizmetler için altyapıya ihtiyaç duyduğu durumlarda kullanışlıdır.
* Zaino aktif bir altyapıdır, ancak operatörler bunu üretimde çalıştırmadan önce güncel dağıtım ayrıntıları için resmî Zaino ve Z3 belgelerini kontrol etmelidir.

## Zaino Ne Yapar?

Zaino, Zebra ile istemci yazılımı arasında yer alır. Zebra konsensüs düğümüdür: Zcash blok zincirini indirir, doğrular ve takip eder. Zaino, zincir verisi kaynağı olarak Zebra'ü kullanır ve ardından istemci uygulamalarının verimli biçimde sorgulayabileceği indekslenmiş görünümler hazırlar.

Bu ayrım, rolleri net tutar:

| Bileşen | Rol |
|:--|:--|
| Zebra | Tam düğüm ve doğrulayıcı |
| Zaino | İndeksleyici ve istemcilere yönelik API hizmeti |
| Zallet | Cüzdan hizmeti |
| lightwalletd | Zaino'ün değiştirmek veya tamamlamak üzere tasarlandığı eski hafif cüzdan sunucusu |

Zaino; hafif istemciler, tam istemciler veya cüzdanlar ve blok gezginleri için işlevsellik sağlar. Kesinleşmiş zincire, kesinleşmemiş en iyi zincire ve Zebra tarafından tutulan mempool verilerine erişim sunar.

## Mevcut Zcash Yığınına Nasıl Uyar?

Mevcut Z3 yığını; Zebra, Zallet ve isteğe bağlı Zaino etrafında oluşturulmuştur.

Varsayılan Z3 dağıtımında Zebra ve Zallet birlikte çalışır. Zallet doğrudan Zebra'e erişir; dolayısıyla yalnızca yerel bir cüzdan yığını çalıştıran bir operatörün bağımsız Zaino hizmetini başlatması gerekmez.

Zaino, operatör harici istemcilere hizmet vermek istediğinde eklenir. Z3'te `indexer` Compose profili arkasında çalışır ve şunları ekler:

* hafif cüzdan istemcileri için lightwalletd ile uyumlu bir gRPC uç noktası
* gezginler, faucet'ler ve hizmet arka uçları için bir JSON-RPC proxy'si
* Zebra'ün zincir durumundan ayrı bir indeksleyici veritabanı

Bu, Zaino'ü özellikle cüzdan arka uçları, herkese açık altyapı operatörleri, gezginler, faucet'ler ve indekslenmiş Zcash zincir verilerine ihtiyaç duyan hizmetleri test eden geliştiriciler için önemli kılar.

## Zaino ve lightwalletd

lightwalletd, özgün hafif cüzdan sunucusudur. Zaino, bu rol için Rust tabanlı ardıl yoldur. Amacı, mümkün olan yerlerde uyumlu API'ler sunarak cüzdanların ve hizmetlerin tek seferde tamamen yeniden yazılmadan geçiş yapabilmesini sağlamaktır.

Bu, her lightwalletd dağıtımının hâlihazırda Zaino'e geçtiği anlamına gelmez. Operatörler Zaino'ü mevcut Zebra tabanlı yığının bir parçası olarak değerlendirmeli ve ne çalıştıracaklarına karar vermeden önce en güncel proje belgelerini, sürümleri ve hizmet panolarını kontrol etmelidir.

## Operatör Notları

En kolay ve yetkili dağıtım yolu Z3 deposudur. Z3, Zaino'ü isteğe bağlı bir hizmet olarak içerir:

```bash
docker compose --env-file .env.<network> --profile indexer up -d
```

Önce normal Z3 kurulumunu çalıştırın ve mainnet veya testnet üzerinde bağımlı hizmetleri başlatmadan önce Zebra'ün senkronize olmasını bekleyin.

Zaino iki tür ağ hizmeti sunar. gRPC hizmeti, hafif cüzdanlara yönelik API'dir. JSON-RPC hizmeti, harici bir katman koruma sağlamadığı sürece loopback veya güvenilir özel ağlar için tasarlanmıştır. Kimliği doğrulanmamış veya şifrelenmemiş bir JSON-RPC uç noktasını herkese açık internete açmayın.

## Zaino'ün nasıl çalıştığını gösteren bazı diyagramlar

### Zaino Dahili Mimarisi

![Zaino Internal Architecture](/content-images/image-2025-01-02-190143429-3f3cc78fa5.webp)

### Zaino Canlı Hizmet Mimarisi

![Zebra Live Service Architecture](/content-images/image-2025-01-02-190349017-892cb409ea.webp)

### Zaino Sistem Mimarisi

![Zaino System Architecture](/content-images/image-2025-01-02-190448037-1e4e675ccb.webp)

## Yaygın Hatalar

**Zaino'ü tam düğüm olarak değerlendirmek.** Zaino doğrulayıcı değildir. Zebra zinciri doğrular; Zaino, Zebra'den gelen verileri indeksler.

**Her Z3 dağıtımının bağımsız Zaino'e ihtiyaç duyduğunu varsaymak.** Varsayılan Z3 yığınında Zallet, doğrudan Zebra'e erişebilir. Harici istemciler için bağımsız indeksleyici hizmetine ihtiyaç duyduğunuzda Zaino'ü başlatın.

**Planlanan özellikleri hâlihazırda dağıtılmış gibi sunmak.** Zaino aktif olarak geliştirilmektedir; bu nedenle bir özelliği kullanılabilir olarak tanımlamadan önce güncel sürüm notlarını ve belgeleri kontrol edin.

**JSON-RPC'yi dikkatsizce açığa çıkarmak.** Zaino'ün JSON-RPC arayüzü, başka bir katman tarafından korunmadığı sürece loopback veya güvenilir özel ağlar içindir.

## Nereden daha fazla bilgi edinebilirim?

* [Zaino GitHub deposu](https://github.com/zingolabs/zaino)
* [Zaino sürümleri](https://github.com/zingolabs/zaino/releases)
* [Zaino oluşturulmuş belgeler](https://zingolabs.github.io/zaino/)
* [Z3 dağıtım deposu](https://github.com/ZcashFoundation/z3)
* [Zebra belgeleri](https://zebra.zfnd.org/)
* [Zaino hibe ve proje tartışması](https://forum.zcashcommunity.com/t/zingo-labs-accelerates-zcashd-deprecation-with-zaino/48545)

**Son güncelleme:** Ağustos 2026
