<a href="https://github.com/zechub/zechub/edit/main/site/Zcash_Tech/Zakura_Node.md" target="_blank">
  <img src="https://img.shields.io/badge/Edit-blue" alt="Sayfayı Düzenle"/>
</a>

# Zakura Düğümü

> 🇧🇷 [Portekizce Sürüm](/zechubglobal/zcashbrasil/zcashtech/zakura)

Zakura, ölçeklenebilirlik için geliştirilmiş, Zcash için ücretsiz ve açık kaynaklı bir tam düğüm uygulamasıdır. [Zebra](Zebra_Full_Node.md)'dan çatallanmış ve **Valar Group** ile **Project Tachyon** iş birliğiyle geliştirilmiş olan Zakura, önemli ölçüde daha hızlı senkronizasyon, yerel blok budama ve eski `zcashd` araçları için bir uyumluluk katmanı sunar. 1.0.0 sürümü 15 Temmuz 2026'da yayınlandı.

---

## Kısaca

- Zakura, **konsensüs uyumlu bir Zcash tam düğümüdür** — Zebra ve zcashd'e alternatif olup Zebra'dan çatallanmıştır.
- Blok zinciri senkronizasyonu Zebra'dan yaklaşık **5× daha hızlıdır**; anlık görüntüyle önyükleme **2 dakikanın altında** tamamlanır.
- **Yerel blok budama**, operatörlerin çok daha az disk alanıyla tam düğüm çalıştırmasını sağlar (tam bir Zebra düğümü için 300 GB'a kıyasla budanmış anlık görüntü yaklaşık 11 GB).
- Bir **zcashd RPC uyumluluk modu**, mevcut cüzdanların ve entegrasyonların değişiklik yapılmadan çalışmasını sağlar.
- **Deneysel bir P2P taşıma katmanı** (varsayılan olarak devre dışıdır), DoS'a dayanıklı gossip ile 500 ms'nin altında blok yayılımını hedefler.
- 2026 ortasında etkinleştirilen Zcash ağ yükseltmesi Ironwood (NU6.3) ile uyumludur.
- **Zakura Common** (v1.3.0, Ağustos 2026), cüzdanların özel işlemler oluşturmak için kullandığı kriptografiyi hızlandırır: Zakura kıyaslamalarına göre birçok durumda 3 saniyenin üzerindeki süreyi 200 ms'nin altına indirir.
- **Sean Bowe** (Zcash kurucu ortağı, Project Tachyon) ve **Dev Ojha** (Valar Group) tarafından yönetilmektedir.

---

## Zakura Nedir?

Zakura, ölçekli kullanımda üretime hazır olacak şekilde sıfırdan tasarlanmış bir Zcash tam düğümüdür. Zebra ile konsensüs uyumluluğunu paylaşsa da — yani aynı Zcash protokol kurallarını doğrulayıp takip etse de — Zakura, bir Zcash tam düğümü çalıştırmanın önündeki engeli azaltmayı amaçlayan önemli mühendislik iyileştirmeleri sunar.

Proje, **Project Tachyon** (Zcash'in ilk kriptografi mühendislerinden biri olan Sean Bowe liderliğinde) ve **Valar Group**'un (Dev Ojha liderliğinde) ortak çalışmasıdır. Birlikte yeni nesil Zcash protokol iyileştirmelerine odaklanırlar ve Zakura bu çalışma için referans düğüm görevi görür.

---

## Temel Özellikler

### 5× Daha Hızlı Zincir Senkronizasyonu

Zakura, Zebra ile karşılaştırıldığında yaklaşık 5× daha hızlı blok zinciri senkronizasyonu sağlar. Bu, düğümü hızlıca başlatması veya kesinti sonrası toparlanması gereken operatörler için onu önemli ölçüde daha pratik hâle getirir.

### Anlık Görüntüyle Önyükleme

Zakura, ilk senkronizasyon süresini önemli ölçüde azaltan önceden oluşturulmuş zincir anlık görüntüleri yayınlar:

| Önyükleme Yöntemi | Süre |
|-----------------|------|
| Arşiv anlık görüntüsü | ~37 dakika |
| Budanmış anlık görüntü | **2 dakikanın altında** |
| Zebra (tam senkronizasyon) | ~20 saat |

Budanmış anlık görüntüler yaklaşık **11 GB** boyutundadır ve genesis'ten senkronizasyona kıyasla **680× daha hızlı** düğüm önyüklemesi sağlar.

### Yerel Blok Budama

Zakura, düğüm operatörlerinin ne kadar zincir geçmişini saklayacağını belirlemesine olanak tanıyan yapılandırılabilir blok budamayı destekler. Bu, sınırlı depolama alanına sahip donanımlarda tam düğüm çalıştırmayı pratik hâle getirir — tam geçmiş zincirine ihtiyaç duymayan doğrulayıcılar, geliştiriciler ve altyapı sağlayıcıları için kullanışlıdır.

### zcashd RPC Uyumluluk Modu

Zakura, eski `zcashd` JSON-RPC arayüzünü yeniden üreten bir uyumluluk modu içerir. `zcashd` RPC'lerine dayanan mevcut cüzdanlar, borsalar ve entegrasyonlar, kod değişikliği gerektirmeden Zakura'e geçebilir.

### Deneysel P2P Taşıma Katmanı

Zakura, şu anda **varsayılan olarak devre dışı** olan yeni nesil bir eşler arası taşıma katmanıyla gelir. Etkinleştirildiğinde hedefleri şunlardır:

- Ağ genelinde 500 ms'nin altında en kötü durum blok yayılımı
- Daha verimli işlem aktarımı için mempool birleştirme
- Ağ dayanıklılığını artırmak için DoS'a dayanıklı gossip protokolü

Bu katman, Project Tachyon kapsamında geliştirilen gelecekteki Zcash ağ düzeyi iyileştirmelerinin bir ön izlemesini temsil eder.

### Ironwood (NU6.3) ile Uyumlu

Zakura, 2026 ortasında Zcash ana ağında etkinleştirilen Ironwood ağ yükseltmesiyle (NU6.3) tamamen uyumludur.

---

## Zakura Common: Daha Hızlı Cüzdan Kriptografisi

Ağustos 2026'da Zakura ekibi, Zcash cüzdanlarının ve düğümlerinin dayandığı kriptografi kütüphanelerinin hızlandırılmış çatallarından oluşan Zakura Common'i yayınladı. Zakura, 1.3.0 sürümünde yeni yığına geçti ve Vizor Wallet bunu entegre eden ilk cüzdanlar arasında yer aldı.

![Private Zcash payment: zk-SNARK verification 4 to 8 times faster, transaction building from over 3 seconds to under 200 ms, proof generation over 14 times faster on mobile, hashing 21 times faster, trial decryption 1.5 times faster, and open source libraries that need no protocol upgrade](/content-images/zakuracommonspeedups.webp)

Zakura'in kendi kıyaslamalarına göre:

| İşlem | Hızlanma |
|--|--|
| Mobilde kanıt oluşturma | 14×'den fazla (masaüstünde: 5×'den fazla) |
| Sinsemilla hashing | 21×'den fazla |
| zk-SNARK doğrulaması | 4–8× |
| Deneme amaçlı şifre çözme | 1,5×'den fazla |

Kullanıcılar için en görünür değişiklik bekleme süresidir. Özel bir işlem oluşturmak, bir cüzdanın eskiden üç saniyeden fazla zamanını alırdı. Zakura Common ile birçok durumda 200 ms'nin altında sürebilir. Bu, ağın işlemi onaylaması için gereken süre değil, cihazınızın işlemi hazırlamak için harcadığı süredir.


---

## Zakura'ın Diğer Zcash Düğümleriyle İlişkisi

| | zcashd | Zebra | Zakura |
|--|--------|-------|--------|
| Dil | C++ (Bitcoin'den çatallanmış) | Rust | Rust (Zebra'dan çatallanmış) |
| Durum | Kullanımdan kaldırılmış | Aktif | Aktif (v1.0.0, Temmuz 2026) |
| Senkronizasyon hızı | Temel seviye | ~1× | ~5× daha hızlı |
| Blok budama | Hayır | Hayır | Evet |
| zcashd RPC uyumluluğu | Yerel | Kısmi | Evet (uyumluluk modu) |
| Anlık görüntüyle önyükleme | Hayır | Hayır | Evet (2 dakikadan az) |
| Deneysel P2P | Hayır | Hayır | Evet (isteğe bağlı) |

---

## Başlarken

İndirme seçenekleri, anlık görüntüler ve yapılandırma belgeleri şurada mevcuttur:

- **İndirme ve kurulum rehberi:** [zakura.com/download](https://zakura.com/download/)
- **Zincir anlık görüntüleri:** [zakura.com/snapshots](https://zakura.com/snapshots/)
- **Kaynak kodu:** [github.com/zakura-core/zakura](https://github.com/zakura-core/zakura)

---

## İlgili Sayfalar

- [Zebra Tam Düğüm](Zebra_Full_Node.md) — Zakura'ın çatallandığı üst kaynak Zcash tam düğümü
- [Zaino Dizinleyici](Zaino.md) — Zebra ve Zakura ile uyumlu Rust tabanlı bir dizinleyici
- [Tam Düğümler](Full_Nodes.md) — Zcash tam düğüm seçeneklerine genel bakış
- [Hafif Cüzdan Düğümleri](Lightwallet_Nodes.md) — hafif istemci alternatifleri

## Kaynaklar

- [Zakura Tanıtımı — duyuru](https://zakura.com/announcements/introducing-zakura/)
- [Zakura GitHub](https://github.com/zakura-core/zakura)
- [Zakura Web sitesi](https://zakura.com/)
- [X/Twitter'da Zakura](https://x.com/ZakuraZcash)
- [Project Tachyon](https://electriccoin.co/blog/)
- [Zakura Common duyurusu](https://zakura.com/announcements/zakura-common/)
