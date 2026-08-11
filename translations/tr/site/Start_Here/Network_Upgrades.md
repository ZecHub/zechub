---
# Zcash Ağ Yükseltmeleri

Zcash, ağ yükseltmeleri aracılığıyla gelişir: her düğümün üzerinde uzlaştığı kurallarda yapılan koordineli değişikliklerdir ve her biri belirli bir blok yüksekliğinde etkinleştirilir. Aşağıdaki her yükseltmenin, neyi değiştirdiğini ve nedenini sade bir dille açıklayan kendi sayfası vardır. Zcash'e yeni mi başladınız? Bunları Sprout'tan Ironwood'a doğru sırayla okuyun.

Zcash'in gizliliğinin bu yükseltmeler boyunca görsel olarak nasıl evrildiğini görmek için [Gizliliğin Evrimi](https://zechub.wiki/zcash-evolution) sayfasına bakın. Bu sayfa dizindir. O sayfa ise zaman çizelgesidir.

| Yükseltme | Etkinleştirme (UTC) | Blok | Branch id | Neyi değiştirdi |
|---|---|---|---|---|
| [Sprout](../zcash-tech/sprout) | 28 Ekim 2016 | genesis | 00000000 | Başlangıç: ilk shielded havuz ve zk-SNARK özel işlemleri |
| [Overwinter](../zcash-tech/overwinter) | 26 Haziran 2018 | 347,500 | 5ba81b19 | Replay koruması, işlem sürümleme ve son kullanma süresi; böylece güvenli yükseltmeler mümkün oldu |
| [Sapling](../zcash-tech/sapling) | 29 Ekim 2018 | 419,200 | 76b809bb | Verimli shielded işlemler; telefonlar ve donanım cüzdanları için yeterince hızlı |
| [Blossom](../zcash-tech/blossom) | 11 Aralık 2019 | 653,600 | 2bb40e60 | Daha hızlı bloklar, yaklaşık 75 saniye, ve daha yüksek işlem kapasitesi |
| [Heartwood](../zcash-tech/heartwood) | 16 Temmuz 2020 | 903,000 | f5b9230b | Shielded madencilik ödülleri ve daha hafif istemciler (FlyClient) |
| [Canopy](../zcash-tech/canopy) | 18 Kasım 2020 | 1,046,400 | e9ff75a6 | Geliştirme Fonu, ilk yarılanma ve Sprout havuzunun kademeli olarak kapatılması |
| [NU5](../zcash-tech/nu5) | 31 Mayıs 2022 | 1,687,104 | c2d6d0b4 | Halo 2 üzerinde Orchard havuzu (trusted setup yok), birleşik adresler ve v5 işlemleri |
| [NU6](../zcash-tech/nu6) | 23 Kasım 2024 | 2,726,400 | c8e71055 | Ertelenmiş Geliştirme Fonu Lockbox'ı ve geliştirme fonlaması için yeni bir bölüşüm |
| [NU6.1](../zcash-tech/nu6-1) | 24 Kasım 2025 | 3,146,400 | 4dec4df0 | Bu fonlamanın topluluk ve coin sahipleri tarafından yönetişimi |
| [NU6.2](../zcash-tech/nu6-2) | 3 Haziran 2026 | 3,364,600 | 5437f330 | Orchard devresini düzelten acil bir düzeltme |
| [Ironwood (NU6.3)](../zcash-tech/ironwood) | ~28 Temmuz 2026 | 3,428,143 | 37a5165b | Ironwood havuzu ve herkesin arzı denetlemesine olanak tanıyan herkese açık bir turnike |

Tarihler UTC olarak gösterilmiştir. Bazı panolar bunları yerel saatte gösterir; bu aynı blok ve aynı andır. Ironwood'un tarihi, sabit tetikleyici olan etkinleştirme blok yüksekliğinden yapılan bir tahmindir; bu yüzden tam gün biraz kayabilir. Gelecekteki bir yükseltme olan NU7 hâlâ planlama aşamasındadır ve Ironwood ile aynı şey değildir.
