<a href="https://github.com/zechub/zechub/edit/main/site/Zcash_Tech/Network_Sustainability_Mechanism.md" target="_blank">
  <img src="https://img.shields.io/badge/Edit-blue" alt="Sayfayı Düzenle"/>
</a>

# Ağ Sürdürülebilirliği Mekanizması (NSM)

> NSM, Mainnet'te 6 Kasım 2026'da 3.543.405 numaralı blokta etkinleşen Zcash uzlaşmasının bir parçasıdır. [NU7](./NU7.md)'ten bu yana ücretler ayrılıyor; madencilere yeniden ihraç, 8.939.664 numaralı blokta (öngörülen tarih Şubat 2031 civarı) başlayacak.

Öğrenecekleriniz: Ağ Sürdürülebilirliği Mekanizması'nın ne yaptığı, her bloktaki ücretlerin ne kadarını kaldırdığı, bu ZEC'nin nereye gittiği, blok ödülleri olarak ne zaman ve hangi hızda geri döndüğü ve 21 milyonluk üst sınır ile yarılanma takviminin neden değişmediği.

Ağ Sürdürülebilirliği Mekanizması (NSM), ZEC'nin bir kısmını dolaşımdan çıkarıp yıllara yayılarak daha sonra madencilere geri ödeyen bir uzlaşma kuralları kümesidir. NU7 bunun iki parçasını devreye aldı: Her bloktaki işlem ücretlerinin %60'ını dolaşımdan çıkaran [ZIP 235](https://zips.z.cash/zip-0235) ve çıkarılan ZEC'yi normal blok sübvansiyonuna ek olarak düzgün bir eğri boyunca yeniden ihraç eden [ZIP 237](https://zips.z.cash/zip-0237). İkisi de [ZIP 259](https://zips.z.cash/zip-0259) ile etkinleştirildi.

Bunun önemi. Zcash güvenliğini her blokta yeni ZEC ihraç ederek sağlar ve bu sübvansiyon yaklaşık her dört yılda bir yarıya iner. Sübvansiyon küçüldüğünde madenciler çoğunlukla ücretlerle geçinmek zorunda kalır. NSM, bu geleceğe yönelik ilk adımdır: Bugünkü ücretlerin bir kısmını biriktirip gelecekteki madencilere öder; arz üst sınırını yükseltmez ve insanların güvendiği yarılanma takvimini değiştirmez.

## Kısaca

- **Dolaşımdan çıkarma ([ZIP 235](https://zips.z.cash/zip-0235)):** Her blokta toplam işlem ücretlerinin %60'ı (aşağı yuvarlanır ve madencinin lehine olacak şekilde) dolaşımdan çıkar. Madenci kalan %40'ı alır.
- **NSM Değer Bakiyesi:** Dolaşımdan çıkarılmış ve henüz yeniden ihraç edilmemiş ZEC miktarının herkese açık, sürekli güncellenen toplamı. Bu, uzlaşma durumunun bir parçasıdır; kimsenin harcayabileceği bir havuz değildir.
- **Başlangıç bakiyesi:** NU7 bakiyesi **368.58445520 ZEC** olarak başladı. Bu, ilk madencilerin NU6 öncesinde talep etmeden bıraktığı blok ödülleri ve ücretlerdir.
- **Yeniden ihraç ([ZIP 237](https://zips.z.cash/zip-0237)):** 8.939.664 numaralı bloktan itibaren her blok, bakiyenin sabit bir oranını (%0,00001375) blok sübvansiyonuna ekler. Böylece her dört yıllık yarılanma döneminde bakiyenin yaklaşık yarısı ödenir.
- **Değişmeyenler:** Yarılanma takvimi ve üst sınır olarak 21 milyon ZEC. Bakiye sıfır olursa ihraç tam olarak eski takvime göre yapılır.

## Görsel benzetme

Kasadaki bir kumbarayı düşünün. Her blok kazıldığında bahşişlerin (ücretlerin) %60'ı madencinin cebine değil, kumbaraya gider. Kimse kumbaradan elle para alamaz. 2031'den itibaren kumbaradaki miktarın küçük ve sabit bir payı her blok ödülüne eklenir; böylece kumbara yavaşça boşalır: Her dört yılda bir yaklaşık yarısı, yarılanmalarla aynı ritimde.

## Dolaşımdan çıkarma nasıl işler (ZIP 235)

- Kural işlem başına değil, blok başınadır. Toplam ücretleri `F` (zatoshi cinsinden) olan bir blokta, çıkarılan miktar `floor(6 × F / 10)` olur ve madenci `F` eksi bu miktarı talep edebilir.
- Yuvarlama tüm blok için bir kez yapılır ve daima madencinin lehinedir. Her işlem için ayrı yuvarlama yapılırsa toplamda %60'tan daha azı çıkarılır (1 zatoshi'lik iki ücretin her biri 0 katkıda bulunurdu).
- Örnek: İşlemlerinde 50.000 zatoshi (0,0005 ZEC) ücret ödenen bir bloktan 30.000 zatoshi çıkarılır ve madenciye 20.000 ödenir. Ücretleri 15 zatoshi olan bir bloktan 9 çıkarılır ve madenciye 6 ödenir.
- İşlem alanı gerekmez. Her düğüm, zaten doğruladığı ücretlerden miktarı hesaplar ve [ZIP 236](https://zips.z.cash/zip-0236) coinbase işleminin tam olarak madenciye borçlu olunan miktarı talep etmesini sağlar; böylece madenci ne daha azını çıkarabilir ne de daha fazlasını talep edebilir.
- Ölçek: ZIP 235, NU7 öncesi trafiğe göre yılda yaklaşık 370 ZEC ücret tahmin etti; dolayısıyla yılda yaklaşık 222 ZEC çıkarılıyor. Bugün ücretler blok sübvansiyonunun yanında küçük kalıyor; bu yüzden yazarlar madenciler üzerindeki etkinin az olacağını öngördü.

## Yeniden ihraç nasıl işler (ZIP 237)

- **Bakiye.** `NSMValueBalance`, NU7 etkinleştiğinde 368.58445520 ZEC (36.858.445.520 zatoshi) ile başlar. Her blok, ZIP 235 ile çıkarılan miktarı ekler ve yeniden ihraç edilen miktarı düşer. Bakiyeyi negatife indirecek bir blok geçersizdir.
- **Başlangıç bakiyesinin kaynağı.** NU6 öncesinde bir coinbase işlemi, tam blok ödülünden ve ücretlerden daha azını talep edebilirdi. Zincirin ilk 2.726.400 bloğunda madenciler 368.58445520 ZEC miktarını talep etmeden bıraktı: Bu yüksekliğe kadar planlanan sübvansiyon 15.750.000 ZEC, ihraç edilen arz ise 15.749.631,41554480 ZEC idi. ZIP 237, bu miktarı NSM'ye aktararak kaybolması yerine ödenmesini sağlar.
- **8.939.664 numaralı bloğa kadar yeniden ihraç yok.** NU7 ile bu yükseklik arasında bakiye yalnızca büyür.
- **Formül.** 8.939.664 numaralı bloktan itibaren her bloğun sübvansiyonuna, önceki blok sonrasındaki bakiye üzerinden hesaplanan ek bir `ceiling(0.0000001375 × NSMValueBalance)` eklenir. Oran `floor(LN2_SCALED / HalvingInterval) / 10^10` = 1375 / 10.000.000.000'dur; NU7 sonrası yarılanma aralığı 5.040.000 bloktur.
- **Bu oran neden seçildi?** `(1 − 0.0000001375)^5,040,000 ≈ 0.5`, böylece yeni bir şey çıkarılmazsa her yarılanma döneminde bakiyenin yaklaşık yarısı yeniden ihraç edilir. Bu, yalnızca NSM bakiyesine uygulanan ve değişmeyen yarılanma adımlarının üzerine eklenen üstel bir azalmadır.
- **Hesaplama örneği.** 8.939.664 numaralı blokta bakiye hâlâ yalnızca 368,58 ZEC başlangıç miktarı olsaydı, ilk blok 5.069 zatoshi (yaklaşık 0,00005 ZEC), günde 3.456 blok hızında ise günde yaklaşık 0,175 ZEC yeniden ihraç ederdi. Gerçek miktarlar, o zamana kadar çıkarılan ücretler kadar daha yüksek olacaktır.
- **8.939.664 numaralı blok neden seçildi?** ZIP 237, bu tarihi çıkarılan gerçek miktardan bağımsız, sabit bir kuralla belirler: Üçüncü yarılanmadan (6.132.390 numaralı blok; öngörülen tarih Kasım 2028 civarı) sonraki ilk blokta, henüz ihraç edilmesi planlanmamış tüm ZEC miktarına NSM oranı uygulandığında elde edilecek ödeme, o dönemin normal blok sübvansiyonundan (0,26041666 ZEC) daha az olacaktır. NU7 coin sahipleri ve topluluk anketlerinde yeniden ihracın ne zaman başlaması gerektiği konusunda ortak bir çoğunluk oluşmadığından, ZIP 259 bu kesişim noktasını kullanır.

## Değişmeyenler

- **Yarılanma takvimi.** ZIP 237, dört yıllık yarılanma adımlarını korur. Reddedilen alternatif [ZIP 234](https://zips.z.cash/zip-0234), bunları düzgün bir ihraç eğrisiyle değiştirecekti; Ağustos ve Eylül 2026 NU7 anketlerinde yarılanmaların korunması mı yoksa ihracın yumuşatılması mı gerektiği soruldu ve NU7 yarılanmaları koruyan tasarımı yayımladı.
- **Arz üst sınırı.** İhraç Edilmiş Arz ile NSM Değer Bakiyesinin toplamı her blokta tam olarak planlanan blok sübvansiyonu kadar artar; bu nedenle ihraç hiçbir zaman üst sınırı aşamaz. Hatta üst sınır biraz düştü: ZIP 218'in NU7 sonrası sübvansiyonu yuvarlaması toplam ihracı yaklaşık 0,50 ZEC azalttı ve NSM bu açığı yeniden ihraç etmez.
- **Gönüllü çıkarma.** Herkesin açık bir işlem alanıyla ZEC'yi NSM'ye göndermesine izin verecek olan [ZIP 233](https://zips.z.cash/zip-0233), NU7 içinde devreye alınmadı. Bugün ücretler, çıkarma işleminin tek kaynağıdır. ZIP 237, daha sonraki ZIP'lerin başka kaynaklar eklemesine izin verir.
- **Gizlilik.** Bakiye ve ek sübvansiyon, zaten herkese açık olan değerlerden hesaplanır; bu nedenle NSM işlemler hakkında yeni bir bilgi açığa çıkarmaz.

## Yaygın hatalar

- **"Ücretlerin %60'ı yakılıyor."** Kalıcı olarak değil. (Genelde Ethereum'un EIP-1559'u ile karşılaştırılan) yakımın aksine çıkarılan ZEC izlenir ve gelecekteki madencilere yeniden ihraç edilir.
- **"NSM fazladan ZEC basıyor."** Hayır. Yalnızca çıkarılan veya hiç talep edilmemiş değeri yeniden ihraç eder; toplam ihraç mevcut üst sınırın altında kalır.
- **"Yeniden ihraç başladı."** Henüz başlamadı. 8.939.664 numaralı bloğa kadar bakiye yalnızca birikir.
- **"NSM, birinin kontrol ettiği bir fondur."** Hayır. Uzlaşma durumundaki bir sayıdır ve değer yalnızca blok sübvansiyonu formülü aracılığıyla buradan çıkar.
- **"Yarılanmalar kaldırıldı."** Hayır. Bu, ZIP 234'ün tasarımıydı; NU7 bunu devreye almadı.

## Terimler sözlüğü

| Terim | Sade dille anlamı |
|---|---|
| Network Sustainability Mechanism (NSM) | ZEC'yi dolaşımdan çıkaran ve daha sonra madencilere yeniden ihraç eden uzlaşma kuralları |
| NSM Value Balance | Dolaşımdan çıkarılmış (veya hiç talep edilmemiş), henüz yeniden ihraç edilmemiş ZEC miktarının herkese açık, sürekli güncellenen toplamı |
| Removal from circulation | ZEC'yi ihraç edilen arzdan çıkarıp NSM Değer Bakiyesine aktarma; NU7'ten beri bu, her bloktaki ücretlerin %60'ıdır |
| Reissuance | 8.939.664 numaralı bloktan itibaren NSM Değer Bakiyesindeki ZEC'nin ek blok sübvansiyonu olarak geri ödenmesi |
| Issued Supply | Zincirin değer havuzlarındaki tüm ZEC; NSM Değer Bakiyesini içermez |
| Block subsidy | Her blokta oluşturulan ve madenci ile geliştirme fonu akışları arasında paylaştırılan yeni ZEC |
| Halving interval | Yarılanmalar arasındaki blok sayısı: NU7'ten beri 5.040.000 (25 saniyelik bloklarla yaklaşık dört yıl) |

## Sık sorulan sorular

**NSM'de bugün ne kadar var?** 368.58445520 ZEC başlangıç miktarı ile 3.543.405 numaralı bloktan bu yana her bloktaki ücretlerin %60'ı. Bu, her tam düğümün izlediği uzlaşma durumunun bir parçasıdır.

**Yeniden ihraç edilen ZEC'yi kim alır?** Blok sübvansiyonuna eklenir ve aynı şekilde paylaştırılır: Geliştirme fonu akışları, toplam sübvansiyonun (planlanan artı yeniden ihraç edilen) sabit yüzdesini alır; geri kalanı madenciye gider.

**Yeniden ihraç ne zaman başlar?** Mainnet'te 8.939.664 numaralı blokta; bloklar ortalama 25 saniyede gelirse öngörülen tarih Şubat 2031 civarıdır. Testnet'te yükseklik, Testnet'in NU7 etkinleşme yüksekliğinden itibaren aynı kurala göre belirlenir.

**NSM yüzünden ücretler artar mı?** Hayır. İşlemin ne kadar ücret ödediğini değil, ücretlerin nereye gittiğini değiştirir.

**%60/%40 paylaşımı değişebilir mi?** Yalnızca gelecekteki bir ZIP ve ağ yükseltmesiyle. ZIP 235, ücretlerin, örneğin blok sübvansiyonunu aşması durumunda, bu paylaşımın yeniden değerlendirilebileceğini söyler.

## Anlayıp anlamadığınızı sınayın

1. Bir bloktaki işlemler 100.000 zatoshi ücret öder. Madenci ne kadarını alır?
2. NSM'nin başlangıç bakiyesi nereden geldi?
3. Yeni bir şey çıkarılmazsa her yarılanma döneminde NSM bakiyesinin yaklaşık hangi oranı yeniden ihraç edilir?
4. Yeniden ihraç, toplam ihracı neden 21 milyon ZEC üzerine çıkarmaz?

Yanıtlar: (1) 40.000 zatoshi; 60.000 zatoshi çıkarılır; (2) NU6 öncesinde coinbase işlemlerinin talep etmeden bıraktığı blok ödülleri ve ücretler: 368.58445520 ZEC; (3) yaklaşık yarısı; (4) yeniden ihraç yalnızca çıkarılmış veya hiç talep edilmemiş değeri öder; bu nedenle ihraç edilen arz ile NSM bakiyesi toplamı her blokta tam olarak planlanan sübvansiyon kadar artar.

### Kaynaklar

[ZIP 235: İşlem Ücretlerinin %60'ını Dolaşımdan Çıkarma](https://zips.z.cash/zip-0235)

[ZIP 237: Ağ Sürdürülebilirliği Mekanizması: Yarılanmaları Koruyan İhraç](https://zips.z.cash/zip-0237)

[ZIP 259: NU7 Ağ Yükseltmesinin Devreye Alınması](https://zips.z.cash/zip-0259)

[ZIP 234: Ağ Sürdürülebilirliği Mekanizması: İhraç Akışının Yumuşatılması (devreye alınmadı)](https://zips.z.cash/zip-0234)

[ZIP 233: Ağ Sürdürülebilirliği Mekanizması: Fonların Dolaşımdan Çıkarılması (devreye alınmadı)](https://zips.z.cash/zip-0233)

[ZIP 236: Bloklar tam olarak dengelenmelidir](https://zips.z.cash/zip-0236)

## İlgili sayfalar

| Sayfa | İlgili olma nedeni |
|---|---|
| [NU7](./NU7.md) | NSM'yi etkinleştiren ağ yükseltmesi |
| [Zcash Para Politikası](../start-here/zcash-monetary-policy) | NSM'nin koruduğu yarılanma takvimi ve arz üst sınırı |
| [25 Saniyelik Bloklar Gerçekte Neleri Değiştiriyor](../research/what-25-second-blocks-actually-change) | NU7'te sübvansiyonun ve yarılanma aralığının neden değiştiği |
| [Geliştirme Fonu](../start-here/development-fund) | blok sübvansiyonunun nasıl paylaştırıldığı |
| [İşlemler](../using-zcash/transactions) | işlem ücretlerinin nasıl belirlendiği |

---
