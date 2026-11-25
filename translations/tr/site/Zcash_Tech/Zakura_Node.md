<a href="https://github.com/zechub/zechub/edit/main/site/Zcash_Tech/Zakura_Node.md" target="_blank">
  <img src="https://img.shields.io/badge/Edit-blue" alt="Edit Page"/>
</a>

# Zakura Düğümü

Zakura, ölçeklenebilirlik için geliştirilmiş, Zcash için ücretsiz ve açık kaynaklı bir tam düğüm uygulamasıdır. [Zebra](Zebra_Full_Node.md)'den çatallanarak geliştirilen ve **Valar Group** ile **Project Tachyon** arasındaki iş birliğiyle yürütülen Zakura; çok daha hızlı eşzamanlama, yerel blok budama ve eski `zcashd` araçları için bir uyumluluk katmanı sunar. 1.0.0 sürümü 15 Temmuz 2026'da yayımlandı. O tarihten bu yana sürümler hızla çıktı: 1.7.0 (22 Ekim 2026), Mainnet'te NU7 etkinleştirdi ve 1.8 serisi kasım ayında yayımlandı.

---

## Kısaca

- Zakura, **konsensüs uyumlu bir Zcash tam düğümüdür** — Zebra'den çatallanmış Zebra ve zcashd alternatifidir.
- Blokzincir eşzamanlaması yaklaşık **Zebra'den 5× daha hızlıdır**; anlık görüntüyle başlatma **2 dakikadan kısa sürede** tamamlanır.
- **Yerel blok budama**, operatörlerin çok daha az disk alanıyla tam düğüm çalıştırmasını sağlar (budanmış anlık görüntü yaklaşık 11 GB iken tam bir Zebra düğümü 300 GB gerektirir).
- **zcashd RPC uyumluluk modu**, mevcut cüzdanların ve entegrasyonların değişiklik yapılmadan çalışmasını sağlar.
- **Deneysel P2P aktarım katmanı** (varsayılan olarak devre dışıdır), DoS saldırılarına dayanıklı dedikoduyla 500 ms'nin altında blok yayılımı hedefler.
- 2026'nın ortasında etkinleştirilen Zcash ağ yükseltmesi olan **Ironwood (NU6.3)** ile uyumludur.
- **NU7** sürecini izler: Zakura 1.7.0, Mainnet'te bu yükseltmeyi etkinleştiren sürümdür. Her sürüm, yayımlandıktan birkaç hafta sonra destek sonu bloğunda da durur; bu nedenle düzenli olarak yükseltme yapmayı planlayın (aşağıdaki Çalıştırmadan Önce bölümüne bakın).
- **Zakura Common** (v1.3.0, Ağustos 2026), cüzdanların özel işlemler oluşturmak için kullandığı kriptografiyi hızlandırır: Zakura'ın kıyaslamalarına göre birçok durumda 3 saniyeden uzun süren işlem 200 ms'nin altına iner.
- Projeyi **Sean Bowe** (Zcash kurucu ortağı, Project Tachyon) ve **Dev Ojha** (Valar Group) yönetiyor.

---

## Zakura nedir?

Zakura, ölçekli üretim kullanıma hazır olacak şekilde sıfırdan tasarlanmış bir Zcash tam düğümdür. Zebra ile konsensüs uyumluluğunu paylaşır; yani aynı Zcash protokol kurallarını doğrular ve izler. Bununla birlikte Zakura, Zcash tam düğümü çalıştırmanın önündeki engelleri azaltmayı amaçlayan önemli mühendislik iyileştirmeleri sunar.

Proje, **Project Tachyon** (Zcash'ın ilk kriptografi mühendislerinden biri olan Sean Bowe tarafından yönetiliyor) ile **Valar Group** (Dev Ojha tarafından yönetiliyor) arasında ortak bir çalışmadır. Ekip birlikte yeni nesil Zcash protokol iyileştirmelerine odaklanıyor ve Zakura bu çalışmalar için referans düğüm görevi görüyor.

---

## Temel Özellikler

### 5× Daha Hızlı Zincir Eşzamanlaması

Zakura, Zebra'ye kıyasla yaklaşık 5× daha hızlı blokzincir eşzamanlaması sağlar. Bu, hızlıca bir düğüm başlatması veya kesinti sonrasında sistemi kurtarması gereken operatörler için kullanımı çok daha pratik hâle getirir.

### Anlık Görüntüyle Başlatma

Zakura, ilk eşzamanlama süresini önemli ölçüde azaltan önceden oluşturulmuş Zincir anlık görüntüleri yayımlar:

| Bootstrap yöntemi | Süre |
|-----------------|------|
| Arşiv anlık görüntüsü | ~37 dakika |
| Budanmış anlık görüntü | **2 dakikadan kısa** |
| Zebra (tam eşzamanlama) | ~20 saat |

Budanmış anlık görüntüler yaklaşık **11 GB** boyutundadır ve başlangıç bloğundan eşzamanlamaya kıyasla düğümün **680× daha hızlı** başlatılmasını sağlar.

### Yerel Blok Budama

Zakura, yapılandırılabilir blok budamayı destekler ve düğüm operatörlerinin ne kadar Zincir geçmişi tutacaklarını belirlemesine olanak tanır. Bu sayede sınırlı depolama alanına sahip donanımlarda tam düğüm çalıştırmak pratik hâle gelir. Tüm geçmiş Zincir'e ihtiyaç duymayan doğrulayıcılar, geliştiriciler ve altyapı sağlayıcıları için kullanışlıdır.

### zcashd RPC Uyumluluk Modu

Zakura, eski `zcashd` JSON-RPC arayüzünü yeniden sunan bir uyumluluk modu içerir. `zcashd` RPC'lerine bağlı mevcut cüzdanlar, borsalar ve entegrasyonlar, kod değişikliği yapmadan Zakura'e geçebilir.

### Deneysel P2P Aktarım Katmanı

Zakura, şu anda **varsayılan olarak devre dışı** olan yeni nesil eşler arası aktarım katmanıyla birlikte sunulur. Etkinleştirildiğinde şu hedeflere ulaşmaya çalışır:

- Ağ genelinde en kötü durumda 500 ms'nin altında blok yayılımı
- Daha verimli işlem aktarımı için mempool toplama
- Ağ dayanıklılığını artırmak için DoS saldırılarına dayanıklı dedikodu protokolü

Bu katman, Project Tachyon kapsamında geliştirilmekte olan gelecekteki Zcash ağ düzeyi iyileştirmelerinin bir ön izlemesidir.

### Ironwood (NU6.3) Uyumluluğu

Zakura, 2026'nın ortasında Zcash ana ağında etkinleştirilen Ironwood ağ yükseltmesiyle (NU6.3) tamamen uyumludur.

### NU7

22 Ekim 2026'da yayımlanan Zakura 1.7.0, Mainnet'te NU7 yükseltmesini etkinleştiren sürümdür ([sürüm notları](https://github.com/zakura-core/zakura/releases/tag/v1.7.0)). Yükseltme sonrasında Zincir'i izleyebilmek için düğümün 1.7.0 veya daha yeni bir sürümde olması gerekir. [NU7](NU7.md), yükseltmenin getirdiği değişiklikleri ele alıyor.

---

## Zakura Common: Daha Hızlı Cüzdan Kriptografisi

Ağustos 2026'da Zakura ekibi, Zcash cüzdanlarının ve düğümlerinin kullandığı kriptografi kitaplıklarının hızlandırılmış çatallarından oluşan Zakura Common'ı yayımladı. Zakura, 1.3.0 sürümünde yeni altyapıya geçti ve Vizor Wallet, bunu entegre eden ilk cüzdanlardan biri oldu.

![Özel Zcash ödemesi: zk-SNARK doğrulaması 4 ila 8 kat daha hızlıdır; işlem oluşturma süresi 3 saniyenin üzerindeyken 200 ms'nin altına iner; mobil cihazlarda kanıt oluşturma 14 kattan fazla, karma işlemi 21 kat daha hızlıdır; deneme amaçlı şifre çözme 1.5 kat hızlanır ve protokol yükseltmesi gerektirmeyen açık kaynak kütüphaneler bulunur](/content-images/zakuracommonspeedups.webp)

Zakura'ın kendi kıyaslamalarına göre:

| İşlem | Hızlanma |
|--|--|
| Mobil cihazda kanıt oluşturma | 14×'ten fazla (masaüstünde: 5×'ten fazla) |
| Sinsemilla özetleme | 21×'den fazla |
| zk-SNARK doğrulaması | 4–8× |
| Deneme amaçlı şifre çözme | 1,5×'ten fazla |

Kullanıcıların en belirgin fark edeceği değişiklik bekleme süresidir. Eskiden bir cüzdanın özel bir işlem oluşturması 3 saniyeden uzun sürüyordu. Zakura Common ile bu süre birçok durumda 200 ms'nin altına inebilir. Bu, ağın işlemi onaylama süresi değil, cihazınızın işlemi hazırlamak için harcadığı süredir.


---

## Zakura Diğer Zcash Düğümleriyle Nasıl İlişkilidir?

| | zcashd | Zebra | Zakura |
|--|--------|-------|--------|
| Dil | C++ (Bitcoin'den çatallanmıştır) | Rust | Rust (Zebra'den çatallanmıştır) |
| Durum | Kullanımdan kaldırıldı | Etkin | Etkin (v1.0.0 Tem 2026; v1.8.8 Kas 2026) |
| Eşzamanlama hızı | Temel düzey | ~1× | ~5× daha hızlı |
| Blok budama | Hayır | Hayır | Evet |
| zcashd RPC uyumluluğu | Yerel | Kısmi | Evet (uyumluluk modu) |
| Anlık görüntüyle başlatma | Hayır | Hayır | Evet (2 dakikadan kısa) |
| Deneysel P2P | Hayır | Hayır | Evet (isteğe bağlı) |

---

## Başlarken

İndirme seçeneklerine, anlık görüntülere ve yapılandırma belgelerine şu adreslerden ulaşabilirsiniz:

- **İndirme ve kurulum kılavuzu:** [zakura.com/download](https://zakura.com/download/)
- **Zincir anlık görüntüleri:** [zakura.com/snapshots](https://zakura.com/snapshots/)
- **Kaynak kodu:** [github.com/zakura-core/zakura](https://github.com/zakura-core/zakura)
- **Sürüm notları:** [github.com/zakura-core/zakura/releases](https://github.com/zakura-core/zakura/releases)

### Hafif Cüzdanlara Hizmet Sunma

Zakura bir hafif cüzdan sunucusu değildir. Hafif cüzdanların (örneğin Zodl; daha önce Zashi olarak biliniyordu) kullandığı gRPC protokolü olan `CompactTxStreamer`'ü uygulamaz; bu nedenle bir cüzdan doğrudan `zakurad`'e bağlanamaz. Hafif cüzdanlara hizmet sunmak için önünde aşağıdakilerden birini çalıştırın:

- [Zaino](Zaino.md) (tercih edilen)
- [lightwalletd](Lightwallet_Nodes.md)
- [Ztreamer](https://github.com/zcashlabs/ztreamer), Zincir'i bir Zakura düğümünden okuyan Zcash Labs'ün indeksleyicisi ve hafif cüzdan sunucusu; bu düğüm kendi işlemine gömülü olabilir veya JSON-RPC üzerinden uzaktaki bir düğüm olabilir

Zakura'ün kendi indeksleyici gRPC'si (`[rpc]` bölümündeki `indexer_listen_addr`, varsayılan olarak kapalıdır) ayrı bir arayüzdür: Kendi çalıştırdığınız güvenilir yazılımlar için blok, mempool ve Zincir ucu akışları sunar; hafif cüzdan protokolü değildir. Düz metne yalnızca yerel loopback arayüzünde izin verilir; diğer tüm adresler karşılıklı TLS gerektirir ([yapılandırma başvurusu](https://github.com/zakura-core/zakura/blob/v1.8.7/crates/zakura-rpc/src/config/rpc.rs)).

### Çalıştırmadan Önce

1.8 sürüm notlarında operatörlerin gözünden kaçabilecek birkaç nokta var:

- **Sürümlerin süresi dolar.** Her Zakura sürümünün bir destek sonu yüksekliği vardır ve bu sürümü çalıştıran Mainnet düğümü o blokta durur. 1.8.x sürümleri için “3.643.309 numaralı bloğa kadar, yaklaşık 3 Aralık 2026'ya dek Mainnet'te desteklenir” deniyor; yükseltme uyarıları yaklaşık 3 gün önce başlıyor ([v1.8.8](https://github.com/zakura-core/zakura/releases/tag/v1.8.8)). Bu tarihten önce en yeni sürümü kontrol edin; yükseltme planınız yoksa betiklerde veya dağıtım şablonlarında eski bir sürümü sabitlemeyin.
- **1.8.0'dan bu yana x86-64 CPU gereklidir.** Sürüm ikilileri ve Docker imajları BMI2/ADX yönergelerini kullanır; bu da en az Intel Broadwell veya AMD Zen ya da daha yeni bir işlemci gerektirir. Daha eski bir işlemcide `zakurad` başlangıçta eksik uzantıları belirten bir hatayla çıkar. Bu makinelerde çalıştırmak için `--features portable` ile kaynak koddan derleyin ([v1.8.0](https://github.com/zakura-core/zakura/releases/tag/v1.8.0)).
- **Eski oluşturulmuş yapılandırmalar ve yerel P2P.** `zakurad generate`, eskiden `peer_memory_budget_bytes = 8589934592` (8 GiB) yazıyordu. 1.8.3'ten itibaren bu değer, yerel P2P bağlantılarının yaklaşık yarısına izin veriyor; 4 GiB veya daha azı, yerel P2P çalıştıran bir düğümü başlatmıyor. `[network.zakura] peer_memory_budget_bytes` değerini en az 15 GiB'ye yükseltin veya yeni 15 GiB varsayılanını kullanmak için satırı silin ([v1.8.3](https://github.com/zakura-core/zakura/releases/tag/v1.8.3)).
- **Durum araçları `zakurad` içine taşındı.** 1.8.3'ten itibaren bağımsız `zakura-prune-state` ve `zakura-rollback-state` ikilileri, Docker içinde de artık sunulmuyor. Bunun yerine `zakurad prune-state` ve `zakurad rollback-state` kullanın. Bunlar aynı bağımsız değişkenleri alır ancak `zakura.toml` yükler; bu nedenle belirli bir durum dizinini belirtmek için `--cache-dir` kullanın.

---

## İlgili Sayfalar

- [Zebra Tam Düğüm](Zebra_Full_Node.md) — Zakura'in çatallandığı, kaynak Zcash tam düğümü
- [Zaino İndeksleyici](Zaino.md) — Zebra ve Zakura ile uyumlu, Rust tabanlı bir indeksleyici
- [Tam Düğümler](Full_Nodes.md) — Zcash tam düğüm seçeneklerine genel bakış
- [Hafif Cüzdan Düğümleri](Lightwallet_Nodes.md) — hafif istemci alternatifleri

## Kaynaklar

- [Zakura'i tanıtan](https://zakura.com/announcements/introducing-zakura/) — duyuru
- [Zakura GitHub](https://github.com/zakura-core/zakura)
- [Zakura web sitesi](https://zakura.com/)
- [Zakura, X/Twitter](https://x.com/ZakuraZcash)
- [Project Tachyon](https://electriccoin.co/blog/)
- [Zakura Common duyurusu](https://zakura.com/announcements/zakura-common/)
