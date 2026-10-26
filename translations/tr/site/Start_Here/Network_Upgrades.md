# Zcash Ağ Yükseltmeleri

Zcash, her düğümün üzerinde uzlaştığı kurallarda yapılan ve her biri belirli bir blok yüksekliğinde etkinleşen koordineli değişiklikler olan ağ yükseltmeleriyle gelişir. Aşağıdaki her yükseltmenin, neyi ve neden değiştirdiğini sade bir dille açıklayan kendi sayfası vardır. Zcash konusunda yeni misiniz? Bunları Sprout'ten Ironwood'e sırayla okuyun.

Bu yükseltmeler boyunca Zcash gizliliğinin görsel gelişim öyküsü için [Gizliliğin Evrimi](https://zechub.wiki/zcash-evolution) sayfasına bakın. Bu sayfa dizindir. Diğeri ise zaman çizelgesidir.

| Yükseltme | Etkinleştirme (UTC) | Blok | Dal kimliği | Değiştirdikleri |
|---|---|---|---|---|
| [Sprout](../zcash-tech/sprout) | 28 Ekim 2016 | genesis | 00000000 | Başlangıç: ilk korumalı havuz ve zk-SNARK gizli işlemler |
| [Overwinter](../zcash-tech/overwinter) | 26 Haziran 2018 | 347,500 | 5ba81b19 | Yeniden oynatma koruması, işlem sürümleme ve sona erme; böylece güvenli yükseltmeler mümkün oldu |
| [Sapling](../zcash-tech/sapling) | 29 Ekim 2018 | 419,200 | 76b809bb | Telefonlar ve donanım cüzdanları için yeterince hızlı, verimli korumalı işlemler |
| [Blossom](../zcash-tech/blossom) | 11 Aralık 2019 | 653,600 | 2bb40e60 | Yaklaşık 75 saniyelik daha hızlı bloklar ve daha yüksek işlem kapasitesi |
| [Heartwood](../zcash-tech/heartwood) | 16 Temmuz 2020 | 903,000 | f5b9230b | Korumalı madencilik ödülleri ve daha hafif istemciler (FlyClient) |
| [Canopy](../zcash-tech/canopy) | 18 Kasım 2020 | 1,046,400 | e9ff75a6 | Development Fund, ilk yarılanma ve Sprout havuzunun aşamalı olarak kapatılması |
| [NU5](../zcash-tech/nu5) | 31 Mayıs 2022 | 1,687,104 | c2d6d0b4 | Halo 2 üzerindeki Orchard havuzu (güvenilir kurulum yok), birleşik adresler ve v5 işlemleri |
| [NU6](../zcash-tech/nu6) | 23 Kasım 2024 | 2,726,400 | c8e71055 | Ertelenmiş Dev Fund Lockbox ve geliştirme finansmanı için yeni bir dağılım |
| [NU6.1](../zcash-tech/nu6-1) | 24 Kasım 2025 | 3,146,400 | 4dec4df0 | Bu finansmanın topluluk ve coin sahibi yönetişimi |
| [NU6.2](../zcash-tech/nu6-2) | 3 Haziran 2026 | 3,364,600 | 5437f330 | Orchard devresini düzelten acil bir düzeltme |
| [Ironwood (NU6.3)](../zcash-tech/ironwood) | 28 Temmuz 2026 | 3,428,143 | 37a5165b | Ironwood havuzu ve herkesin arzı denetlemesini sağlayan herkese açık bir turnike |
| **NU7** (yaklaşan) | Testnet: 4 Eki 2026; Mainnet: hedeflenen 5 Kas 2026 | Testnet: 4,465,026; Mainnet: 3,543,405 | 77190ad9 | 25 saniyelik bloklar (ZIP 218), NSM ücret geri dönüşümü (ZIP 235+237), Sprout'in kullanımdan kaldırılması (ZIP 2003) |

Tarihler UTC olarak gösterilir. Bazı panolar bunları yerel saatle gösterir; bu, aynı blok ve aynı andır. Her yükseltme için sabit tetikleyici takvim tarihi değil, etkinleştirme blok yüksekliğidir.

### NU7 durumu

NU7, **4,465,026** yüksekliğinde herkese açık Testnet'te yayındadır (4 Ekim 2026'da etkinleştirildi). Mainnet etkinleştirme yüksekliği **3,543,405**'tir ([ZIP 259](https://zips.z.cash/zip-0259)) ve hedef tarih **5 Kasım 2026**'dır.

Kapsam (ZIP 259):

- **25 saniyelik bloklar** (ZIP 218) — ilk onay yaklaşık 3× daha hızlı; günlük ZEC arzı değişmedi.
- **Network Sustainability Mechanism** (ZIP 235 + ZIP 237) — işlem ücretlerinin %60'ı dolaşımdan çıkarılarak bir rezerve aktarılır; yaklaşık Şubat 2031'den itibaren yarılanmayı koruyan bir takvimle madencilere yeniden dağıtılır.
- **Sprout'in kullanımdan kaldırılması** (ZIP 2003) — sürüm 4 işlemleri geçersiz hâle gelir; kalan Sprout fonları harcanamaz olur.
- Korumalı eylem sınırları ve daha geniş bir zorluk ortalaması penceresi (17 → 102 blok).

Yeni bir işlem formatı sunulmamaktadır. Konsensüs dal kimliği: `0x77190ad9`.

Tüm ayrıntılar için [Gizliliğin Evrimi](https://zechub.wiki/zcash-evolution) zaman çizelgesine ve [ZIP 259](https://zips.z.cash/zip-0259) sayfasına bakın. Forum zaman çizelgesi: [NU7 Zaman Çizelgesi](https://forum.zcashcommunity.com/t/nu7-timeline/57655).
