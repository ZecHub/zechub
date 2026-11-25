# Grayscale Zcash ETF’si (ZCSH)

**Zcash bir ETF başlatmadı. Bunu Grayscale yaptı**; 2017’den beri işlettiği bir fonu dönüştürerek. Zcash bir protokoldür — fon ihraç edebilecek bir şirketi, hazinesi ya da yönetim kurulu yoktur. Grayscale, herkes gibi ZEC’i açık piyasadan satın alan bağımsız bir varlık yöneticisidir.

Bu ayrım, ZCSH hakkında en çok yanlış anlaşılan konudur ve bu sayfa da buradan başlıyor. Fon, 25 Ağustos 2026’da NYSE Arca’te *The Zcash ETF* adıyla işlem görmeye başladı; bu, ABD’deki ilk spot Zcash borsada işlem gören üründü ve fon artık var olan en büyük ZEC sahiplerinden biri.

![Grayscale Zcash ETF'si şöyle çalışır: yatırımcılar bir aracı kurum üzerinden ZCSH hissesi alarak yalnızca fiyat hareketlerine maruz kalır; trust, ZEC'yi Coinbase Custody'de şeffaf cüzdanlarda tutar. Yetkili Katılımcılar nakit karşılığında 10,000 hisselik sepetler oluşturup geri alır. Sponsor ücreti trust'ın ZEC varlıklarından ödenir; bu nedenle hisse başına düşen ZEC zamanla azalır.](https://raw.githubusercontent.com/ZecHub/zechub/main/assets/ZCSH_ETP_Structure.png)

## Aynı fon, üç aşama

| Ne zaman | Ne değişti |
| --- | --- |
| Ekim 2017 | Yalnızca akredite yatırımcılara açık özel plasman olarak başlatıldı |
| Ekim 2021 | OTCQX’te ZCSH koduyla kote edildi; net varlık değerine göre iskontolu işlem gördü |
| 25 Ağustos 2026 | NYSE Arca’te itfa edilebilir bir borsa yatırım ürünü hâline geldi ve adından “Trust” ibaresi çıkarıldı |

2026’daki adım kozmetik bir değişiklik değil. Tezgâh üstü piyasada kote edilmiş bir tröstün itfa mekanizması yoktur; bu nedenle hisseleri, dayanak varlıkların değerine kıyasla primli ya da iskontolu işlem görebilir ve bu fark bazen ciddi boyutlara ulaşabilir — 2021 ile 2026 arasında tam da böyle oldu. Oluşturma ve itfa mekanizması işler durumdaki borsada işlem gören bir ürün, hisse fiyatını net varlık değerine bağlı tutan bir arbitraj yolu sunar. Birinden diğerine geçiş, menkul kıymetin işleyişini değiştirir.

## Kim ne yapıyor

| Rol | Taraf |
| --- | --- |
| Sponsor | Grayscale Investments Sponsors, LLC |
| Mütevelli | CSC Delaware Trust Company |
| Yönetici ve devir aracısı | The Bank of New York Mellon |
| Ana aracı kurum | Coinbase, Inc. — tröst için ZEC sağlar |
| Yetkili katılımcılar | Jane Street, Virtu — hisse oluşturur ve itfa eder |
| Pazarlama aracısı | Foreside Fund Services |
| **Saklama kuruluşu** | **Coinbase Custody Trust Company, LLC** — gerçek ZEC’in bulunduğu tek yer |

Bu tarafların hiçbiri tek başına fon değildir. Yapı, aralarındaki düzenlemedir ve yukarıdaki şemanın gösterdiği de budur. Listeleme sırasında haberlerde bu rollerden birkaçı atlanmış ya da yanlış aktarılmıştı; buradaki liste, EDGAR’te yer alan Grayscale Form S-3 kayıt beyanını esas alıyor.

## Hisseler nasıl oluşturulur ve itfa edilir

Yalnızca Sponsor ile anlaşması bulunan kayıtlı aracı kurumlar olan Yetkili Katılımcılar hisse oluşturabilir veya itfa edebilir ve bunu yalnızca Basket adı verilen 10.000 hisselik bloklar hâlinde yapabilir. Sıradan yatırımcılar bu mekanizmaya hiç dokunmaz; diğer kote edilmiş menkul kıymetlerde olduğu gibi borsada mevcut hisseleri alıp satar.

Mekanizma şu anda ayni değil, **nakit** esaslıdır. Bir Yetkili Katılımcı, nakit hesabına nakit yatırır ya da hesaptan nakit alır; ZEC’i fiilen edinen veya elden çıkaran ise üçüncü taraf bir likidite sağlayıcısıdır. Kayıt beyanında, Yetkili Katılımcının ZEC’i doğrudan Tröst’e yatıracağı veya Tröst’ten ZEC alacağı ayni bir süreç de açıklanıyor — ancak beyan açıkça “Ayni İşlem için Düzenleyici Onay alınmamıştır” diyor ve bu onay hiçbir zaman alınmayabilir.

Dolayısıyla nakit sürecinde, ZEC el değiştirir; ancak bu, likidite sağlayıcısı ile piyasa arasında olur, yatırımcı ile Tröst arasında değil. Bireysel yatırımcının yer aldığı süreçte hiç kimse bir Zcash adresine dokunmaz.

## Ücret ZEC cinsinden ödenir

Listeleme itibarıyla sponsor ücreti **yılda %2,5**’tir. Ücret, net varlık değerinin yüzdesi olarak günlük tahakkuk eder ve başvurudaki ifadeyle “geçmiş günler için günlük olarak Sponsora ZEC cinsinden ödenir.”

Bunun sonucu tali değil, yapısaldır. Ücret fonun ZEC’inden karşılanır; dolayısıyla her hisseyi destekleyen ZEC miktarı her gün biraz azalır. Bir hisse, süresiz olarak tutulan sabit miktarda ZEC değildir; yavaşça küçülen bir miktar üzerinde hak iddiasıdır. Uzun vadeli ZCSH maruziyetini yalnızca ZEC tutmakla karşılaştıran herkesin bu unsuru karşılaştırmaya katması gerekir.

Karşılaştırma için, %2,5 tipik bir spot bitcoin ETF’sinin ücretinin yaklaşık 10 katıdır. Grayscale, sponsor ücretinden elde edilecek ilk gelirin Zcash ekosisteminin geliştirilmesine yönlendirileceğini söyledi.

## Hissedar aslında neye sahip olur

Bir hisse, ZEC fiyatına maruz kalmanızı sağlar. ZEC değildir.

Bir hissedar korumalı işlem gönderemez, memo ekleyemez, birleşik adres tutamaz ve varlıklarını kendi gözetiminde saklayamaz. Zcash’i diğer varlıklardan ayıran özelliklerin hiçbiri bu yapı üzerinden kullanılamaz — bu yapı yalnızca fiyat maruziyeti sağlar. Bir aracı kurum ya da emeklilik hesabı üzerinden maruziyet elde etmek isteyen yatırımcı için amaç tam da budur. Zcash’e gizliliği nedeniyle ilgi duyanlar içinse ETF, bir cüzdanın yerini tutmaz; ikisi de aslında birbirine alternatif değildir.

## ZEC açıkta tutuluyor

Yapıda bir ironi daha var; bu, sayfadaki en çarpıcı nokta. Coinbase Custody, Tröst’ün ZEC’ini korumalı adreslerde değil, **şeffaf** adreslerde tutuyor. Fonun varlıkları Zincir üzerinde görülebiliyor, saklama kuruluşuna kadar izlenebiliyor ve bakmak isteyen herkes tarafından gerçek zamanlı olarak gözlemlenebiliyor. Bu fonda hiçbir korumalı adres kullanılmıyor.

Bu bir gözden kaçırma değil. Düzenlemeye tabi fon altyapısı denetim ve doğrulama üzerine kuruludur; korumalı bir bakiyeyi ise denetçi bağımsız olarak doğrulayamaz. Coinbase’ın kendi destek bilgileri de aynı asimetriyi gösteriyor: Korumalı bir adresten gönderilen ZEC’i kabul ediyor, ancak bir korumalı adrese ZEC göndermiyor.

Dolayısıyla gizlilik odaklı bir varlığın en büyük kurumsal sahibi, onu gizlilik sunmayan tek biçimde tutuyor. Bu nokta, kayıt belgelerine değil haberlere dayandırılıyor — S-3 belgesi Tröst’ün özel anahtarlarının saklanmasını açıklıyor ancak adres türlerini belirtmiyor — ve bu çekinceyle ifade ediliyor.

## Ne kadar ZEC söz konusu

Fon, 25 Ağustos 2026’daki listeleme sırasında yaklaşık **387.000 ZEC** tutuyordu ve yönetilen varlıkların değeri yaklaşık **313 milyon dolar**dı.

Daha uzun vadeli bir bakış için: Kayıt beyanına göre Tröst, 30 Eylül 2025 itibarıyla dolaşımdaki ZEC’in yaklaşık **%2,4**’ünü tutuyordu. Her iki sayı da değişir — ilki ZEC fiyatına ve oluşturma ile itfalara, ikincisi ise ücretin varlıklardan karşılanmasına bağlıdır — bu nedenle bu sayfadaki rakamlar yerine en güncel kayıt beyanına veya fonun günlük açıklamasına bakın.

## Kaynaklar

Aksi belirtilmedikçe tümü birincil kaynaklardır ve EDGAR’te CIK 1720265 altında yer alır.

- [Grayscale Zcash Trust (ZEC) — EDGAR kayıt beyanı dizini](https://www.sec.gov/edgar/browse/?CIK=1720265&owner=exclude)
- [Kasım 2025 tarihli Form S-3 kayıt beyanı](https://www.sec.gov/Archives/edgar/data/1720265/000119312525298561/zcsh-20251126.htm) — kuruluşların rolleri, oluşturma ve itfa mekanizmaları, Sponsor Ücreti ve dolaşımdaki ZEC yüzdesi
- [31 Aralık 2024’te sona eren yıla ait Form 10-K](https://www.sec.gov/Archives/edgar/data/1720265/000095017025035469/zcsh-20241231.htm)
- [The Zcash ETF, 25 Ağustos 2026’da NYSE Arca’te işlem görmeye başladı](https://www.globenewswire.com/news-release/2026/8/25/3350404/0/en/the-zcash-etf-ticker-zcsh-built-by-grayscale-begins-trading-on-nyse-arca-expanding-investor-access-to-the-leading-privacy-focused-digital-currency.html)
- [Grayscale Zcash Trust fon sayfası](https://www.grayscale.com/funds/grayscale-zcash-trust) — kuruluş tarihleri ve güncel açıklamalar
- [İlk gizlilik odaklı coin ETF’si: Grayscale’ın Zcash başvurusunun içyüzü](https://crypto.news/the-first-privacy-coin-etf-inside-grayscales-zcash-filing/) — ikincil kaynak; Tröst’ün ZEC’inin şeffaf adreslerde tutulduğunu belirten bulunan tek kaynak

Rakamlar belirtilen tarihlerdeki durumu gösterir ve değişebilir. 30 Eylül 2026’da kontrol edilmiştir.
Yalnızca eğitim amaçlıdır; yatırım tavsiyesi değildir.
