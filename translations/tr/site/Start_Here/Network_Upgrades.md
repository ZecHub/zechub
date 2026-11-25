# Zcash Ağ Yükseltmeleri

Zcash, her düğümün üzerinde uzlaştığı ve belirli bir blok yüksekliğinde etkinleştirilen kurallarda yapılan eşgüdümlü değişiklikler olan ağ yükseltmeleriyle gelişir. Aşağıdaki her yükseltmenin, neleri değiştirdiğini ve nedenini sade bir dille açıklayan kendi sayfası vardır. Zcash için yeni misiniz? Sprout’ten Ironwood’e kadar sırayla okuyun.

Zcash’in gizliliğinin bu yükseltmeler boyunca nasıl geliştiğini görsel olarak incelemek için [Gizliliğin Evrimi](https://zechub.wiki/zcash-evolution) sayfasına bakın. Bu sayfa dizindir. Diğeri ise zaman çizelgesidir.

| Yükseltme | Etkinleşme (UTC) | Blok | Dal kimliği | Değişiklikler |
|---|---|---|---|---|
| [Sprout](../zcash-tech/sprout) | 28 Ekim 2016 | genesis | 00000000 | Başlangıç: ilk korumalı havuz ve zk-SNARK özel işlemler |
| [Overwinter](../zcash-tech/overwinter) | 26 Haziran 2018 | 347,500 | 5ba81b19 | Güvenli yükseltmeleri mümkün kılan yeniden oynatma koruması, işlem sürümleme ve sona erme süresi |
| [Sapling](../zcash-tech/sapling) | 29 Ekim 2018 | 419,200 | 76b809bb | Telefonlarda ve donanım cüzdanlarında kullanılabilecek kadar hızlı, verimli korumalı işlemler |
| [Blossom](../zcash-tech/blossom) | 11 Aralık 2019 | 653,600 | 2bb40e60 | Yaklaşık 75 saniyelik daha hızlı bloklar ve daha yüksek işlem hacmi |
| [Heartwood](../zcash-tech/heartwood) | 16 Temmuz 2020 | 903,000 | f5b9230b | Korumalı madencilik ödülleri ve daha hafif istemciler (FlyClient) |
| [Canopy](../zcash-tech/canopy) | 18 Kasım 2020 | 1,046,400 | e9ff75a6 | Geliştirme Fonu, ilk yarılanma ve Sprout havuzunun aşamalı olarak kapatılması |
| [NU5](../zcash-tech/nu5) | 31 Mayıs 2022 | 1,687,104 | c2d6d0b4 | Halo 2 üzerinde Orchard havuzu (güvene dayalı kurulum yok), birleşik adresler ve v5 işlemleri |
| [NU6](../zcash-tech/nu6) | 23 Kasım 2024 | 2,726,400 | c8e71055 | Ertelenmiş Geliştirme Fonu Kilit Kasası ve yeni geliştirme finansmanı dağılımı |
| [NU6.1](../zcash-tech/nu6-1) | 24 Kasım 2025 | 3,146,400 | 4dec4df0 | Bu finansmanın topluluk ve coin sahipleri tarafından yönetişimi |
| [NU6.2](../zcash-tech/nu6-2) | 3 Haziran 2026 | 3,364,600 | 5437f330 | Orchard devresini düzelten acil bir onarım |
| [Ironwood (NU6.3)](../zcash-tech/ironwood) | 28 Temmuz 2026 | 3,428,143 | 37a5165b | Ironwood havuzu ve herkesin arzı denetlemesine olanak tanıyan herkese açık bir turnike |
| [NU7](../zcash-tech/nu7) | 6 Kasım 2026 | 3,543,405 | 77190ad9 | 25 saniyelik bloklar (ZIP 218), NSM ücretlerinin geri dönüşümü (ZIP 235+237), Sprout kullanımdan kaldırılması (ZIP 2003) |

Tarihler UTC olarak gösterilir. Bazı gösterge panelleri bunları yerel saatle gösterir; bu, aynı blok ve aynı andır. Her yükseltmenin sabit tetikleyicisi takvim tarihi değil, etkinleşme blok yüksekliğidir.

### NU7 durumu

NU7, Mainnet’te **3.543.405** yüksekliğinde ([ZIP 259](https://zips.z.cash/zip-0259)), **6 Kasım 2026** tarihinde etkinleşti (02:34 UTC; ABD saat dilimlerinde 5 Kasım akşamı). Daha önce, **4.465.026** yüksekliğinde (4 Ekim 2026) herkese açık Testnet’te devreye girmişti.

Kapsam (ZIP 259):

- **25 saniyelik bloklar** (ZIP 218) — ilk onay yaklaşık 3 kat daha hızlı; günlük ZEC ihracı değişmedi.
- **Ağ Sürdürülebilirliği Mekanizması** (ZIP 235 + ZIP 237) — işlem ücretlerinin %60’ı dolaşımdan çıkarılarak bir rezerve aktarılır ve yaklaşık Şubat 2031’den başlayarak yarılanma düzenini koruyan bir takvimle madencilere yeniden verilir.
- **Sprout kullanımdan kaldırılması** (ZIP 2003) — 4. sürüm işlemler geçersiz hâle gelir; kalan Sprout fonları harcanamaz olur.
- Korumalı işlem sınırları ve genişletilmiş zorluk ortalama penceresi (17 → 102 blok).

Yeni bir işlem biçimi sunulmaz. Konsensüs dal kimliği: `0x77190ad9`.

Tüm ayrıntılar için [Gizliliğin Evrimi](https://zechub.wiki/zcash-evolution) zaman çizelgesine ve [ZIP 259](https://zips.z.cash/zip-0259) sayfasına bakın. Forum zaman çizelgesi: [NU7 Zaman Çizelgesi](https://forum.zcashcommunity.com/t/nu7-timeline/57655).
