<a href="https://github.com/zechub/zechub/edit/main/site/Zcash_Tech/NU6.md" target="_blank">
  <img src="https://img.shields.io/badge/Edit-blue" alt="Sayfayı Düzenle"/>
</a>

# NU6

> NU6, Zcash mainnet’inde 2.726.400. blokta (23 Kasım 2024 UTC) etkinleşti.

Edineceğiniz temel bilgiler: Zcash bir halving sonrasında kendi gelişimini finanse etmeyi nasıl sürdürdü, henüz nasıl harcayacağını bilmediği bir rezervi neden ayırdı ve toplam ZEC arzını nasıl tam olarak öngörülebilir hale getirdi.

NU6, [ZIP 253](https://zips.z.cash/zip-0253) tarafından devreye alınan bir Zcash [ağ yükseltmesidir](../start-here/network-upgrades) ve Kasım 2024’te mainnet’te 2.726.400. blokta etkinleşmiştir. Bu, parasal ve [geliştirme finansmanı](../start-here/development-fund) odaklı bir yükseltmedir: Kasım 2024 halving’inden sonra blok sübvansiyonunun bir kısmının geliştirmeye gitmesini sürdürmüş, gelecekte topluluğun karar vereceği kullanım için protokol içi bir rezerv oluşturmuş ve yeni ZEC’in nasıl sayıldığını daha sıkı hale getirmiştir. NU6, hem Electric Coin Company hem de Zcash Foundation tarafından desteklenmiştir.

Bu neden önemlidir? Zcash’in [Geliştirme Fonu’nun](../zcash-tech/canopy), tarihindeki ikinci halving olan Kasım 2024 halving’i civarında sona ermesi planlanmıştı. NU6 bu finansmanı sürdürdü, ancak her coin’i sabit alıcılara vermek yerine, topluluğun daha sonra ne yapılacağına karar verebilmesi için bir kısmını protokol içinde ayırdı. Ayrıca sessiz bir muhasebe açığını da kapattı; böylece artık var olacak toplam ZEC miktarı tam olarak öngörülebilir hale geldi.

## NU6 neyi değiştirdi

NU6, [ZIP 1015](https://zips.z.cash/zip-1015) içinde tanımlanan bir kural olarak, Kasım 2024 halving’inden sonra blok sübvansiyonunun %20’sini geliştirme finansmanına göndermeye devam etti. Bu %20’yi ikiye böldü.

1. Blok sübvansiyonunun %8’i, topluluk tarafından ve topluluk için yapılan işleri finanse eden Zcash Community Grants (ZCG)’ye gider.
2. %12’si, gelecekte topluluğun karar vereceği kullanım için yeni bir protokol içi lockbox’a gider.

Blok sübvansiyonunun geri kalanı ve işlem ücretleri, ağı güvence altına alan madencilere gider. NU6 ayrıca mevcut funding stream ve dev fund kurallarını (ZIP 207 ve ZIP 214) bu yeni yapıya uyacak şekilde güncelledi.

![NU6 geliştirme fonu bölünmesi: blok sübvansiyonunun yüzde 20’si geliştirmeye gider; bunun yüzde 8’i Zcash Community Grants’e, yüzde 12’si ise Deferred Dev Fund Lockbox’a gider](https://raw.githubusercontent.com/ZecHub/zechub/main/site/Zcash_Tech/assets/nu6-dev-fund-split.png)

## Ertelenmiş lockbox

%12’lik pay, NU6’daki yeni fikirdir. Bu değer bir alıcı adrese ödenmek yerine, doğrudan [ZIP 2001](https://zips.z.cash/zip-2001) ile tanımlanan Deferred Dev Fund Lockbox adlı protokol içi bir havuza yatırılır.

1. Lockbox, blok ödülü değerinin bir kişi ya da kuruluşa değil, doğrudan protokolün kendisine gittiği yeni bir funding stream türüdür (DEFERRED_POOL).
2. Ağ bunu, shielded havuzların bakiyelerini izlediği şekilde, kendi zincir değer havuzu bakiyesi olarak izler.
3. NU6 lockbox’ı bilinçli olarak oluşturdu, ancak zor soruyu açık bıraktı: bu fonları kim kontrol ediyor ve nasıl serbest bırakılıyorlar?

Bu soru daha sonra [NU6.1](../zcash-tech/nu6-1) ile yanıtlandı; yönetişim belirlendi: blok sübvansiyonunun %8’lik akışı Zcash Community Grants’e devam etti ve %12’lik akış, başlangıç sermayesi lockbox’tan gelen coin-holder-controlled bir fona yönlendirildi.

## Muhasebenin dengelenmesi

NU6 ayrıca, [ZIP 236](https://zips.z.cash/zip-0236) içinde tanımlanan, yeni ZEC’in nasıl oluşturulduğuna ilişkin bir muhasebe açığını da kapattı. Coinbase işlemleri, her bloğun yeni ZEC’ini ve ücretlerini ödeyen özel işlemlerdir.

1. NU6’dan önce, bir coinbase işleminin yalnızca hak ettiğinden fazlasını talep etmemesi gerekiyordu. Bir madenci tam sübvansiyondan daha azını talep edebilir, bu da o ZEC’i sessizce yakardı.
2. NU6’dan sonra, bir coinbase işlemi tam olarak dengelenmelidir: toplam çıktı değeri madenci sübvansiyonu artı ücretlere eşit olmalıdır; ne fazla ne eksik.
3. Madenciler artık eksik talep edip yanlışlıkla ZEC yakamayacağı için, var olacak toplam ZEC miktarı artık tam olarak öngörülebilir.

![NU6 öncesi ve sonrası coinbase dengelemesi: önce coinbase eksik talep edip ZEC yakabiliyordu, bu yüzden arz tam olarak öngörülemiyordu. Sonra coinbase tam olarak dengelenmek zorunda kaldı, bu yüzden ihraç tam olarak öngörülebilir oldu](https://raw.githubusercontent.com/ZecHub/zechub/main/site/Zcash_Tech/assets/nu6-coinbase-balance.png)

## Finansman nasıl evrildi

NU6, Zcash’in kendisini nasıl finanse ettiğine dair daha uzun bir hikâyenin bir bölümüdür.

1. Canopy (2020), özgün founders reward’u sona erdirdi ve [geliştirme fonunu](../start-here/development-fund) oluşturdu.
2. NU6 (Kasım 2024), ikinci halving’den sonra bu finansmanı yeniden yapılandırdı ve Deferred Dev Fund Lockbox’ı kurarak ihraçtan bir payı gelecekte topluluğun karar vereceği hibeler için ayırdı.
3. NU6.1 (2025), NU6’nın açık bıraktığı, ayrılan fonları kimin kontrol edeceği sorusunu; blok sübvansiyonunun %8’ini Zcash Community Grants’e sürdürüp %12’sini başlangıç sermayesi lockbox’tan gelen coin-holder-controlled bir fona yönlendirerek yanıtladı.

![Zcash finansmanının evrimi: Canopy geliştirme fonunu oluşturdu, NU6 lockbox’ı kurdu ve NU6.1 onu kimin kontrol edeceğine dair kuralları belirledi](https://raw.githubusercontent.com/ZecHub/zechub/main/site/Zcash_Tech/assets/nu6-funding-timeline.png)

## Sözlük

| Terim | Basit anlamı |
|---|---|
| Block subsidy | Madenciliği yapılan her blokla birlikte oluşturulan yeni ZEC |
| Coinbase transaction | Bir bloğun sübvansiyonunu ve ücretlerini ödeyen özel işlem |
| Deferred Dev Fund Lockbox | İhraçtan bir payı gelecekte topluluğun karar vereceği kullanım için tutan protokol içi rezerv |
| Zcash Community Grants (ZCG) | Zcash topluluğu tarafından ve onun için yapılan işleri finanse eden bir komite |
| Consensus branch id | Düğümlerin, bir bloğun hangi yükseltmenin kurallarını izlediğini anlamak için kullandığı tanımlayıcı |
| Network upgrade (NU) | Belirli bir blok yüksekliğinde etkinleştirilen, Zcash’in konsensüs kurallarındaki koordineli değişiklik |

## SSS

NU6 benim ZEC’imi ya da gizliliğimi değiştiriyor mu? Hayır. NU6, işlemleriniz ya da gizliliğinizle değil, geliştirme finansmanının nasıl yapıldığı ve ihracın nasıl sayıldığıyla ilgilidir. Fonlarınız ve shielded işlemleriniz etkilenmez.

Finansman nereden geliyor? Bloklar üretildikçe ihraç edilen yeni ZEC’ten, yani blok sübvansiyonundan gelir. Bunun %20’lik kısmı, tamamının madencilere gitmesi yerine geliştirmeye yönlendirilir.

Lockbox ne içindir? İhraçtan bir payı protokol içinde ayırır; böylece topluluk daha sonra bunun nasıl kullanılacağına karar verebilir. NU6 bu rezervi ayırdı, NU6.1 ise bunu kimin kontrol edeceğine dair kuralları belirledi.

Tam denge kuralı coin’lerimi değiştirir mi? Hayır. Sadece her bloğun coinbase işleminin, hak ettiği miktarı tam olarak ödemesini zorunlu kılar. Mevcut bakiyeleri değil, yeni ihraç muhasebesini etkiler.

NU6’yı teknik olarak ne tanımlar? NU6, ana ağ etkinleşmesini 2.726.400. blokta ve consensus branch id’yi belirleyen ZIP 253 ile devreye alınır. Konsensüs değişikliklerinin kendisi ise ZIP 236, ZIP 1015 ve ZIP 2001’den gelir; ZIP 207 ve ZIP 214 de buna uyacak şekilde güncellenmiştir.

NU6, NU6.1’den nasıl farklıdır? NU6 finansmanı yeniden yapılandırdı ve lockbox’ı oluşturdu. NU6.1 ise lockbox fonlarını kimin kontrol ettiğine ve ayrılan payın nasıl bölüneceğine karar verdi.

## Anladığınızı test edin

NU6, Deferred Dev Fund Lockbox’ı kurdu ama onu kimin kontrol ettiğini söylemedi. Bir yükseltme neden bir rezerv oluşturup yönetişimini bilerek sonraya bırakır?

<details>
<summary>Cevap</summary>

Rezervi oluşturmak, ihraçtan bir payın sabit alıcılara ödenmek yerine protokol içinde ayrılmasını güvence altına aldı. Bu fonları kimin kontrol edeceğine ve nasıl serbest bırakılacağına karar vermek ise daha zor bir yönetişim sorusudur. NU6 bunu bilerek açık bıraktı ve NU6.1 yanıtladı: blok sübvansiyonunun %8’i Zcash Community Grants’e devam eder ve %12’si başlangıç sermayesi lockbox’tan gelen coin-holder-controlled bir fona gider.
</details>

### Kaynaklar

[ZIP 253: NU6 Ağ Yükseltmesinin Devreye Alınması](https://zips.z.cash/zip-0253)

[ZIP 236: Bloklar tam olarak dengelenmelidir](https://zips.z.cash/zip-0236)

[ZIP 1015: Doğrudan Olmayan Geliştirme Finansmanı için Blok Sübvansiyonu Tahsisi](https://zips.z.cash/zip-1015)

[ZIP 2001: Lockbox Funding Streams](https://zips.z.cash/zip-2001)

[Ağ Yükseltmesi 6 (NU6)](https://z.cash/upgrade/nu6/)

### Ayrıca bakın

[Zcash Ağ Yükseltmeleri](../start-here/network-upgrades)

[Geliştirme Fonu](../start-here/development-fund)

[Zcash Para Politikası](../start-here/zcash-monetary-policy)

[NU6.1](../zcash-tech/nu6-1)

[NU6.2](../zcash-tech/nu6-2)

[ZEC ve Zcash nedir](../start-here/what-is-zec-and-zcash)

---

Seri: [Ağ Yükseltmeleri dizini](../start-here/network-upgrades) · Önceki: [NU5](../zcash-tech/nu5) · Sonraki: [NU6.1](../zcash-tech/nu6-1)
