---
<a href="https://github.com/zechub/zechub/edit/main/site/Zcash_Tech/Zakura_Node.md" target="_blank">
  <img src="https://img.shields.io/badge/Edit-blue" alt="Edit Page"/>
</a>

# Zakura Düğümü

> 🇧🇷 [Portekizce sürüm](/zechubglobal/zcashbrasil/zcashtech/zakura)

Zakura, ölçek için geliştirilmiş, Zcash için ücretsiz ve açık kaynaklı bir tam düğüm uygulamasıdır. [Zebra](Zebra_Full_Node.md)'dan fork edilmiş ve **Valar Group** ile **Project Tachyon** arasındaki iş birliğiyle geliştirilmiş olan Zakura; çarpıcı derecede daha hızlı senkronizasyon, yerel blok budama ve eski `zcashd` araçları için bir uyumluluk katmanı sunar. 1.0.0 sürümü 15 Temmuz 2026'da yayımlandı.

---

## Kısaca

- Zakura, **konsensüs uyumlu bir Zcash tam düğümüdür** — Zebra ve zcashd'ye alternatif olup Zebra'dan fork edilmiştir.
- Blokzincir senkronizasyonu Zebra'dan yaklaşık **5× daha hızlıdır**; snapshot ile önyükleme **2 dakikanın altında** tamamlanır.
- **Yerel blok budama**, operatörlerin çok daha az disk alanıyla bir tam düğüm çalıştırmasına olanak tanır (~11 GB budanmış snapshot, tam bir Zebra düğümü için 300 GB'a karşı).
- Bir **zcashd RPC uyumluluk modu**, mevcut cüzdanların ve entegrasyonların değişiklik yapılmadan çalışmasını sağlar.
- Bir **deneysel P2P taşıma katmanı** (varsayılan olarak devre dışıdır), DoS'a dayanıklı gossip ile 500 ms'nin altında blok yayılımını hedefler.
- 2026 ortasında etkinleştirilen Zcash ağ yükseltmesi **Ironwood (NU6.3)** ile uyumludur.
- **Sean Bowe** (Zcash kurucu ortağı, Project Tachyon) ve **Dev Ojha** (Valar Group) liderliğinde geliştirilmektedir.

---

## Zakura Nedir?

Zakura, en baştan itibaren üretim ortamında büyük ölçekte kullanıma hazır olacak şekilde tasarlanmış bir Zcash tam düğümüdür. Zebra ile konsensüs uyumluluğunu paylaşsa da — yani aynı Zcash protokol kurallarını doğrular ve takip eder — Zakura, Zcash tam düğümü çalıştırma eşiğini düşürmeyi amaçlayan önemli mühendislik iyileştirmeleri sunar.

Proje, **Project Tachyon** (Zcash'in orijinal kriptografik mühendislerinden biri olan Sean Bowe liderliğinde) ile **Valar Group**'un (Dev Ojha liderliğinde) ortak çalışmasıdır. Birlikte yeni nesil Zcash protokol iyileştirmelerine odaklanırlar ve Zakura bu çalışmalar için referans düğüm olarak hizmet eder.

---

## Temel Özellikler

### 5× Daha Hızlı Zincir Senkronizasyonu

Zakura, Zebra'ya kıyasla blokzinciri senkronizasyonunda yaklaşık 5× daha yüksek hız sağlar. Bu, özellikle bir düğümü hızlıca ayağa kaldırması veya kesinti sonrası toparlanması gereken operatörler için onu çok daha pratik hâle getirir.

### Snapshot ile Önyükleme

Zakura, ilk senkronizasyon süresini büyük ölçüde azaltan önceden oluşturulmuş zincir snapshot'ları yayımlar:

| Önyükleme Yöntemi | Süre |
|-----------------|------|
| Arşiv snapshot'ı | ~37 dakika |
| Budanmış snapshot | **2 dakikanın altında** |
| Zebra (tam senkronizasyon) | ~20 saat |

Budanmış snapshot'lar yaklaşık **11 GB** boyutundadır ve genesis'ten senkronizasyona kıyasla **680× daha hızlı** düğüm önyüklemesi sağlar.

### Yerel Blok Budama

Zakura, yapılandırılabilir blok budamayı destekler ve düğüm operatörlerinin ne kadar zincir geçmişini tutacaklarını belirlemelerine olanak tanır. Bu, tam geçmiş zincire ihtiyaç duymayan doğrulayıcılar, geliştiriciler ve altyapı sağlayıcıları için sınırlı depolamaya sahip donanımlarda tam düğüm çalıştırmayı pratik hâle getirir.

### zcashd RPC Uyumluluk Modu

Zakura, eski `zcashd` JSON-RPC arayüzünü yeniden üreten bir uyumluluk modu içerir. `zcashd` RPC'lerine dayanan mevcut cüzdanlar, borsalar ve entegrasyonlar, kod değişikliği gerektirmeden Zakura'ya geçebilir.

### Deneysel P2P Taşıma Katmanı

Zakura, yeni nesil bir eşler arası taşıma katmanıyla gelir; bu özellik şu anda **varsayılan olarak devre dışıdır**. Etkinleştirildiğinde şu hedeflere sahiptir:

- Ağ genelinde en kötü durumda 500 ms'nin altında blok yayılımı
- Daha verimli işlem iletimi için mempool toplulaştırması
- Ağ dayanıklılığını artırmak için DoS'a dayanıklı gossip protokolü

Bu katman, Project Tachyon kapsamında geliştirilen gelecekteki Zcash ağ düzeyi iyileştirmelerinin bir ön izlemesini temsil eder.

### Ironwood (NU6.3) ile Uyumlu

Zakura, 2026 ortasında Zcash ana ağında etkinleştirilen Ironwood ağ yükseltmesiyle (NU6.3) tamamen uyumludur.

---

## Zakura'nın Diğer Zcash Düğümleriyle İlişkisi

| | zcashd | Zebra | Zakura |
|--|--------|-------|--------|
| Dil | C++ (Bitcoin'den fork edildi) | Rust | Rust (Zebra'dan fork edildi) |
| Durum | Kullanımdan kaldırıldı | Aktif | Aktif (v1.0.0, Tem 2026) |
| Senkronizasyon hızı | Temel seviye | ~1× | ~5× daha hızlı |
| Blok budama | Hayır | Hayır | Evet |
| zcashd RPC uyumluluğu | Yerel | Kısmi | Evet (uyumluluk modu) |
| Snapshot ile önyükleme | Hayır | Hayır | Evet (<2 dk) |
| Deneysel P2P | Hayır | Hayır | Evet (isteğe bağlı) |

---

## Başlarken

İndirme seçenekleri, snapshot'lar ve yapılandırma belgeleri şu adreste mevcuttur:

- **İndirme ve kurulum rehberi:** [zakura.com/download](https://zakura.com/download/)
- **Zincir snapshot'ları:** [zakura.com/snapshots](https://zakura.com/snapshots/)
- **Kaynak kodu:** [github.com/zakura-core/zakura](https://github.com/zakura-core/zakura)

---

## İlgili Sayfalar

- [Zebra Tam Düğümü](Zebra_Full_Node.md) — Zakura'nın fork edildiği üst kaynak Zcash tam düğümü
- [Zaino İndeksleyici](Zaino.md) — Zebra ve Zakura ile uyumlu, Rust tabanlı bir indeksleyici
- [Tam Düğümler](Full_Nodes.md) — Zcash tam düğüm seçeneklerine genel bakış
- [Lightwallet Düğümleri](Lightwallet_Nodes.md) — hafif istemci alternatifleri

## Kaynaklar

- [Zakura Tanıtımı — duyuru](https://zakura.com/announcements/introducing-zakura/)
- [Zakura GitHub](https://github.com/zakura-core/zakura)
- [Zakura Web Sitesi](https://zakura.com/)
- [X/Twitter'da Zakura](https://x.com/ZakuraZcash)
- [Project Tachyon](https://electriccoin.co/blog/)
