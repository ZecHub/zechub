<a href="https://github.com/zechub/zechub/edit/main/site/Zcash_Tech/Network_Sustainability_Mechanism.md" target="_blank">
  <img src="https://img.shields.io/badge/Edit-blue" alt="Edit Page"/>
</a>

# Ağ Sürdürülebilirliği Mekanizması (NSM)

> NSM, [NU7](./NU7.md) Mainnet’te 6 Kasım 2026’da 3.543.405. blokta etkinleştirildiğinden beri Zcash konsensüsünün bir parçasıdır. Ücretler artık bir kenara ayrılıyor; madencilere yeniden dağıtım 8.939.664. blokta başlayacak (Şubat 2031 civarında öngörülüyor).

Öğrenecekleriniz: Ağ Sürdürülebilirliği Mekanizmasının ne yaptığı, her bloğun ücretlerinin ne kadarını aldığı, bu ZEC’nin nereye gittiği, blok ödülleri olarak ne zaman ve hangi hızla geri döndüğü ve 21 milyonluk üst sınır ile yarılanma takviminin neden değişmediği.

Ağ Sürdürülebilirliği Mekanizması (NSM), bir miktar ZEC’yi dolaşımdan çıkarıp yıllara yayılarak daha sonra madencilere geri ödeyen bir dizi konsensüs kuralıdır. NU7 mekanizmanın iki parçasını devreye aldı: her bloğun işlem ücretlerinin %60’ını dolaşımdan çıkaran [ZIP 235](https://zips.z.cash/zip-0235) ve çıkarılan ZEC’yi olağan blok sübvansiyonuna ek olarak kademeli bir eğri boyunca yeniden dağıtan [ZIP 237](https://zips.z.cash/zip-0237). Her ikisi de [ZIP 259](https://zips.z.cash/zip-0259) ile etkinleştirildi.

Bunun önemi. Zcash güvenliğinin bedelini her blokta yeni ZEC ile öder ve bu sübvansiyon yaklaşık her dört yılda bir yarıya iner. Sübvansiyon küçüldüğünde madenciler çoğunlukla ücretlerle geçinmek zorunda kalır. NSM, bu geleceğe yönelik ilk adımdır: bugünkü ücretlerin bir kısmını biriktirip gelecekteki madencilere öder; bunu arz üst sınırını yükseltmeden ve insanların güvendiği yarılanma takvimini değiştirmeden yapar.

## Kısaca

- **Dolaşımdan çıkarma ([ZIP 235](https://zips.z.cash/zip-0235)):** Her blokta toplam işlem ücretlerinin %60’ı (aşağı yuvarlanır, madencinin lehine) dolaşımdan çıkar. Madenci diğer %40’ı alır.
- **NSM Değer Bakiyesi:** Dolaşımdan çıkarılan ve henüz yeniden dağıtılmamış ZEC’nin herkese açık, birikimli toplamı. Bu, konsensüs durumunun bir parçasıdır; kimsenin harcayabileceği bir havuz değildir.
- **Başlangıç bakiyesi:** NU7 bakiyesi **368,58445520 ZEC** idi; bu, NU6 öncesinde ilk madencilerin talep etmeden bıraktığı blok ödülleri ve ücretlerdir.
- **Yeniden dağıtım ([ZIP 237](https://zips.z.cash/zip-0237)):** **8.939.664. bloktan** itibaren her blok, bakiyenin sabit bir oranını (%0,00001375) blok sübvansiyonuna ekler. Böylece her dört yıllık yarılanma döneminde bakiyenin yaklaşık yarısı dağıtılır.
- **Değişmeyenler:** Yarılanma takvimi ve üst sınır olarak 21 milyon ZEC. Bakiye sıfır olursa ihracat eski takvimle tamamen aynı olur.

## Görsel benzetme

Kasadaki bir kumbarayı düşünün. Bir blok madencilikle çıkarıldığında bahşişlerin (ücretlerin) %60’ı madencinin cebine değil, kumbaraya gider. Kimse kumbaradan el yordamıyla para alamaz. 2031’den itibaren kumbaradaki tutarın küçük ve sabit bir payı her blok ödülüne eklenir; böylece kumbara yavaşça boşalır: her dört yılda yaklaşık yarısı, yarılanmalarla aynı ritimde.

## Dolaşımdan çıkarma nasıl işler (ZIP 235)

- Kural işlem başına değil, blok başınadır. Toplam ücreti `F` (zatoshi cinsinden) olan bir blokta, çıkarılan miktar `floor(6 × F / 10)` olur ve madenci `F`’den bu miktar çıkarıldıktan sonra kalanı talep edebilir.
- Yuvarlama tüm blok için bir kez yapılır ve her zaman madencinin lehinedir. Her işlem için ayrı yuvarlama yapılması, toplamda %60’tan daha azının çıkarılmasına yol açardı (1 zatoshi’lik iki ücretin her biri 0 katkı sağlardı).
- Örnek: İşlemlerinde 50.000 zatoshi (0,0005 ZEC) ücret bulunan bir bloktan 30.000 zatoshi çıkarılır ve madenciye 20.000 ödenir. 15 zatoshi ücretli bir bloktan 9 çıkarılır ve madenciye 6 ödenir.
- İşlem alanı gerekmez. Her düğüm, zaten doğruladığı ücretlerden tutarı hesaplar ve [ZIP 236](https://zips.z.cash/zip-0236) coinbase işleminin madenciye borçlu olunan tutarı tam olarak talep etmesini sağlar; böylece madenci ne daha az çıkarabilir ne de daha fazlasını talep edebilir.
- Ölçek: ZIP 235, NU7 öncesi trafiğe dayanarak yılda yaklaşık 370 ZEC ücret tahmin etti; dolayısıyla yılda kabaca 222 ZEC çıkarılır. Ücretler bugün blok sübvansiyonunun yanında düşük kalıyor; bu nedenle yazarlar madenciler üzerindeki etkinin az olacağını öngördü.

## Yeniden dağıtım nasıl işler (ZIP 237)

- **Bakiye.** `NSMValueBalance`, NU7 etkinleştirmesinde 368,58445520 ZEC (36.858.445.520 zatoshi) ile başlar. Her blok, ZIP 235’in çıkardığı miktarı ekler ve yeniden dağıtılan miktarı çıkarır. Bakiyeyi negatif yapacak bir blok geçersizdir.
- **Başlangıç bakiyesinin kaynağı.** NU6 öncesinde bir coinbase işlemi, tam blok ödülü ve ücretlerden daha azını talep edebiliyordu. Zincirin ilk 2.726.400 bloğunda madenciler 368,58445520 ZEC tutarını talep etmeden bıraktı: bu yüksekliğe kadar planlanan sübvansiyon 15.750.000 ZEC, ihraç edilen arz ise 15.749.631,41554480 ZEC idi. ZIP 237 bu değeri NSM’ye aktarır; böylece kaybolmak yerine dağıtılır.
- **8.939.664. bloğa kadar yeniden dağıtım yok.** NU7 ile bu blok yüksekliği arasında bakiye yalnızca artar.
- **Formül.** 8.939.664. bloktan itibaren her bloğun sübvansiyonuna, önceki bloktan sonraki bakiye üzerinden hesaplanan ek bir `ceiling(0.0000001375 × NSMValueBalance)` eklenir. Oran `floor(LN2_SCALED / HalvingInterval) / 10^10` = 1375 / 10,000,000,000 olup, NU7 sonrası yarılanma aralığı 5.040.000 bloktur.
- **Bu oran neden seçildi?** `(1 − 0.0000001375)^5,040,000 ≈ 0.5`; dolayısıyla yeni bir şey çıkarılmazsa her yarılanma döneminde bakiyenin yaklaşık yarısı yeniden dağıtılır. Bu, yalnızca NSM bakiyesine uygulanan üstel bir azalmadır ve değişmeyen yarılanma adımlarının üzerine eklenir.
- **Hesaplamalı örnek.** 8.939.664. blokta bakiye hâlâ yalnızca başlangıçtaki 368,58 ZEC olsaydı, ilk blok 5.069 zatoshi (yaklaşık 0,00005 ZEC) yeniden dağıtırdı; günde 3.456 blokla bu, günde yaklaşık 0,175 ZEC ederdi. Gerçek rakamlar, o zamana kadar çıkarılan ücretler kadar daha yüksek olacaktır.
- **8.939.664. blok neden seçildi?** ZIP 237 bu yüksekliği, fiilen ne kadar çıkarıldığına bağlı olmayan sabit bir kuralla belirler: üçüncü yarılanmadan (6.132.390. blok, Kasım 2028 civarında öngörülüyor) sonraki ilk blokta, NSM oranının henüz ihracı planlanmamış tüm ZEC’ye uygulanması, o dönemin olağan blok sübvansiyonundan (0,26041666 ZEC) daha az ödeme yapar. NU7 coin sahibi ve topluluk anketlerinde yeniden dağıtımın ne zaman başlaması gerektiği konusunda ortak çoğunluğa ulaşılamadığı için ZIP 259 bu kesişim noktasını kullanır.

## Değişmeyenler

- **Yarılanma takvimi.** ZIP 237, dört yıllık yarılanma adımlarını korur. Reddedilen alternatif [ZIP 234](https://zips.z.cash/zip-0234), bunların yerine kademeli bir ihraç eğrisi getirecekti; Ağustos ve Eylül 2026 NU7 anketlerinde yarılanmaların korunması mı yoksa ihracın kademeli hâle getirilmesi mi gerektiği soruldu ve NU7 yarılanmaları koruyan tasarımı yayımladı.
- **Arz üst sınırı.** İhraç Edilen Arz ile NSM Değer Bakiyesi’nin toplamı, her blokta planlanan blok sübvansiyonu kadar artar; bu nedenle ihraç hiçbir zaman üst sınırı aşamaz. Hatta üst sınır biraz düştü: ZIP 218’in NU7 sonrası sübvansiyonu yuvarlaması, toplam ihracı yaklaşık 0,50 ZEC azalttı ve NSM bu eksikliği yeniden dağıtmaz.
- **Gönüllü olarak dolaşımdan çıkarma.** Herkesin açık bir işlem alanıyla ZEC’yi NSM’ye göndermesine izin verecek olan [ZIP 233](https://zips.z.cash/zip-0233), NU7 içinde devreye alınmadı. Bugün ücretler, dolaşımdan çıkarmanın tek kaynağıdır. ZIP 237, sonraki ZIP’lerin başka kaynaklar eklemesine izin verir.
- **Gizlilik.** Bakiye ve ek sübvansiyon zaten herkese açık olan değerlerden hesaplanır; bu nedenle NSM işlemlerle ilgili yeni bir bilgi açığa çıkarmaz.

## Sık yapılan hatalar

- **“Ücretlerin %60’ı yakılıyor.”** Kalıcı olarak değil. Yakımın aksine (Ethereum’un EIP-1559’u yaygın karşılaştırmadır), çıkarılan ZEC izlenir ve gelecekteki madencilere yeniden dağıtılır.
- **“NSM fazladan ZEC üretir.”** Hayır. Yalnızca çıkarılmış veya hiç talep edilmemiş değeri yeniden dağıtır; toplam ihraç mevcut üst sınırın altında kalır.
- **“Yeniden dağıtım başladı.”** Henüz değil. 8.939.664. bloğa kadar bakiye yalnızca birikir.
- **“NSM, birinin kontrol ettiği bir fondur.”** Hayır. Konsensüs durumundaki bir sayıdır ve değer bu durumdan yalnızca blok sübvansiyonu formülüyle çıkar.
- **“Yarılanmalar kaldırıldı.”** Hayır. Bu, ZIP 234’ün tasarımıydı ve NU7 bunu devreye almadı.

## Sözlük

| Terim | Sade dille anlamı |
|---|---|
| Network Sustainability Mechanism (NSM) | ZEC’yi dolaşımdan çıkarıp daha sonra madencilere yeniden dağıtan konsensüs kuralları |
| NSM Value Balance | Dolaşımdan çıkarılmış (veya hiç talep edilmemiş) ve henüz yeniden dağıtılmamış ZEC’nin herkese açık, birikimli toplamı |
| Removal from circulation | ZEC’yi ihraç edilen arzdan çıkarıp NSM Değer Bakiyesi’ne aktarma; NU7’den beri bu, her bloğun ücretlerinin %60’ıdır |
| Reissuance | 8.939.664. bloktan itibaren NSM Değer Bakiyesi’ndeki ZEC’yi ek blok sübvansiyonu olarak geri ödeme |
| Issued Supply | Zincirdeki değer havuzlarında bulunan tüm ZEC; NSM Değer Bakiyesi buna dahil değildir |
| Block subsidy | Her blokta oluşturulan yeni ZEC; madenci ile geliştirme fonu akışları arasında paylaşılır |
| Halving interval | Yarılanmalar arasındaki blok sayısı: NU7’den beri 5.040.000 (25 saniyelik bloklarla yaklaşık dört yıl) |

## SSS

**Bugün NSM’de ne kadar var?** 368,58445520 ZEC başlangıç bakiyesi ve 3.543.405. bloktan bu yana her bloğun ücretlerinin %60’ı. Her tam düğümün takip ettiği konsensüs durumunun bir parçasıdır.

**Yeniden dağıtılan ZEC’yi kim alır?** Blok sübvansiyonuna eklenir ve aynı şekilde bölüştürülür: geliştirme fonu akışları toplam sübvansiyonun (planlanan artı yeniden dağıtılan) sabit yüzdesini, madenci ise geri kalanını alır.

**Yeniden dağıtım ne zaman başlar?** Mainnet’te 8.939.664. blokta; bloklar ortalama 25 saniyede çıkarılmaya devam ederse Şubat 2031 civarında öngörülüyor. Testnet’te blok yüksekliği, Testnet’in NU7 etkinleştirme yüksekliğinden itibaren aynı kurala göre belirlenir.

**NSM nedeniyle ücretler artar mı?** Hayır. Ücretlerin nereye gittiğini değiştirir, bir işlemin ne kadar ödediğini değil.

**%60/%40 paylaşımı değişebilir mi?** Yalnızca gelecekteki bir ZIP ve ağ yükseltmesiyle. ZIP 235, ücretler büyürse, örneğin blok sübvansiyonunu aşarsa, paylaşımın yeniden değerlendirilebileceğini belirtir.

## Bilginizi sınayın

1. Bir bloğun işlemleri 100.000 zatoshi ücret ödüyor. Madenci ne kadarını alır?
2. NSM’nin başlangıç bakiyesi nereden geldi?
3. Yeni bir şey çıkarılmazsa, her yarılanma döneminde NSM bakiyesinin yaklaşık ne kadarı yeniden dağıtılır?
4. Yeniden dağıtım neden toplam ihracın 21 milyon ZEC’yi aşmasına yol açmaz?

Yanıtlar: (1) 40.000 zatoshi; 60.000 çıkarılır; (2) NU6 öncesinde coinbase işlemlerinin talep etmeden bıraktığı blok ödülleri ve ücretler, 368,58445520 ZEC; (3) yaklaşık yarısı; (4) yeniden dağıtım yalnızca çıkarılmış veya hiç talep edilmemiş değeri öder; bu nedenle ihraç edilen arz ile NSM bakiyesi toplamı her blokta tam olarak planlanan sübvansiyon kadar artar.

### Kaynaklar

[ZIP 235: İşlem Ücretlerinin %60’ını Dolaşımdan Çıkarma](https://zips.z.cash/zip-0235)

[ZIP 237: Ağ Sürdürülebilirliği Mekanizması: Yarılanmaları Koruyan İhraç](https://zips.z.cash/zip-0237)

[ZIP 259: NU7 Ağ Yükseltmesinin Devreye Alınması](https://zips.z.cash/zip-0259)

[ZIP 234: Ağ Sürdürülebilirliği Mekanizması: İhracı Kademeli Hâle Getirme (devreye alınmadı)](https://zips.z.cash/zip-0234)

[ZIP 233: Ağ Sürdürülebilirliği Mekanizması: Fonları Dolaşımdan Çıkarma (devreye alınmadı)](https://zips.z.cash/zip-0233)

[ZIP 236: Bloklar tam olarak dengelenmelidir](https://zips.z.cash/zip-0236)

## İlgili Sayfalar

| Sayfa | İlgili olma nedeni |
|---|---|
| [NU7](./NU7.md) | NSM’yi etkinleştiren ağ yükseltmesi |
| [Zcash Para Politikası](../start-here/zcash-monetary-policy) | NSM’nin koruduğu yarılanma takvimi ve arz üst sınırı |
| [25 Saniyelik Bloklar Gerçekte Neleri Değiştiriyor](../research/what-25-second-blocks-actually-change) | NU7’de sübvansiyonun ve yarılanma aralığının neden değiştiği |
| [Geliştirme Fonu](../start-here/development-fund) | blok sübvansiyonunun nasıl bölüştürüldüğü |
| [İşlemler](../using-zcash/transactions) | işlem ücretlerinin nasıl belirlendiği |

---
