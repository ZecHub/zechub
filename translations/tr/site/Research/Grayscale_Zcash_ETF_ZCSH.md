# Grayscale Zcash ETF'si (ZCSH)

**Zcash bir ETF başlatmadı. Grayscale başlattı**, 2017'den beri yönettiği bir fonu dönüştürerek. Zcash bir protokoldür — fon ihraç edebilecek bir şirketi, hazinesi veya yönetim kurulu yoktur. Grayscale, herkes gibi açık piyasadan ZEC satın alan bağımsız bir varlık yöneticisidir.

Bu ayrım, ZCSH hakkında en sık yanlış anlaşılan tek şeydir ve bu sayfa buradan başlar. 25 Ağustos 2026'da fon, *Zcash ETF* adıyla NYSE Arca üzerinde işlem görmeye başladı; bu, ABD'deki ilk spot Zcash borsa yatırım ürünüydü ve artık mevcut en büyük tekil ZEC sahiplerinden biridir.

![How the Grayscale Zcash ETF works: investors buy ZCSH shares through a brokerage and receive price exposure only, while the trust holds the ZEC at Coinbase Custody in transparent wallets; Authorized Participants create and redeem shares in baskets of 10,000 for cash, and the Sponsor's Fee is paid out of the trust's ZEC, so ZEC per share declines over time](https://raw.githubusercontent.com/ZecHub/zechub/main/assets/ZCSH_ETP_Structure.png)

## Aynı fon, üç aşama

| Ne zaman | Ne değişti |
| --- | --- |
| Ekim 2017 | Özel yerleştirme olarak başlatılır; yalnızca akredite yatırımcılara açıktır |
| Ekim 2021 | Hisseler, OTCQX üzerinde ZCSH koduyla kote edilir ve net varlık değerine göre iskontolu işlem görür |
| 25 Ağustos 2026 | NYSE Arca üzerinde itfa edilebilir bir ETP olur ve adından "Trust" ibaresini çıkarır |

2026'daki adım kozmetik değildir. OTC'de kote edilmiş bir tröstün itfa mekanizması yoktur; bu nedenle hisseleri, dayandıkları varlıkların değerine kıyasla bazen ciddi ölçüde primli veya iskontolu hâle gelebilir — 2021 ile 2026 arasında olan tam olarak buydu. İşleyen oluşturma ve itfa mekanizmasına sahip bir borsa yatırım ürünü ise hisse fiyatını net varlık değerine bağlı tutan bir arbitraj yoluna sahiptir. Birinden diğerine geçmek, bu aracın menkul kıymet olarak nasıl davrandığını değiştirir.

## Kim ne yapar

| Rol | Taraf |
| --- | --- |
| Sponsor | Grayscale Investments Sponsors, LLC |
| Mütevelli | CSC Delaware Trust Company |
| Yönetici ve devir aracısı | Bank of New York Mellon |
| Ana aracı kurum | Coinbase, Inc. — tröst için ZEC temin eder |
| Yetkili katılımcılar | Jane Street, Virtu — hisse oluşturur ve itfa eder |
| Pazarlama aracısı | Foreside Fund Services |
| **Saklayıcı** | **Coinbase Custody Trust Company, LLC** — gerçek ZEC'nın bulunduğu tek yer |

Bu tarafların hiçbiri tek başına fon değildir. Yapı, aralarındaki düzenlemedir; yukarıdaki diyagramın ortaya koyduğu da budur. Bu rollerin birçoğu, kotasyon sırasındaki haberlerde eksik veya hatalı aktarılmıştı; buradaki liste, Grayscale'nin EDGAR üzerindeki Form S-3 tescil beyanını izlemektedir.

## Hisseler nasıl oluşturulur ve itfa edilir

Yalnızca Sponsor ile anlaşması bulunan kayıtlı aracı kurumlar olan Yetkili Katılımcılar, hisse oluşturabilir veya itfa edebilir; bunu da yalnızca Sepet adı verilen 10.000 hisselik bloklar hâlinde yapabilir. Sıradan bir yatırımcı bu mekanizmaya hiç dokunmaz; diğer tüm kote menkul kıymetlerde olduğu gibi borsada mevcut hisseleri alır ve satar.

Mekanizma şu anda ayni değil, **nakittir**. Yetkili Katılımcı bir nakit hesabına para yatırır veya bu hesaptan para alır; ZEC'yı fiilen edinen ya da elden çıkaran ise üçüncü taraf likidite sağlayıcısıdır. Tescil beyanı ayrıca, Yetkili Katılımcının ZEC'yı doğrudan Trust'a yatıracağı veya Trust'tan ZEC alacağı ayni bir süreci de açıklar — ancak açıkça "In-Kind Regulatory Approval has not been obtained" der ve bu onay hiçbir zaman alınmayabilir.

Dolayısıyla nakit sürecinde ZEC, yatırımcı ile Trust arasında değil, likidite sağlayıcısı ile piyasa arasında el değiştirir. Perakende işlem yolundaki hiç kimse bir Zcash adresine dokunmaz.

## Ücret ZEC ile ödenir

Sponsor ücreti, kotasyon tarihi itibarıyla yıllık **%2,5**'tir. Net varlık değerinin bir yüzdesi olarak günlük tahakkuk eder ve beyanın sözleriyle, "Sponsor'a her gün geçmişe dönük olarak ZEC cinsinden ödenir."

Bunun sonucu tesadüfi değil, yapısaldır. Ücret fonun ZEC varlıklarından alınır; dolayısıyla her hisseyi destekleyen ZEC miktarı her gün biraz azalır. Bir hisse, süresiz olarak tutulan sabit bir ZEC miktarı değildir; yavaşça küçülen bir miktar üzerindeki haktır. Uzun vadeli ZCSH maruziyetini doğrudan ZEC tutmakla karşılaştıran herkes bunu karşılaştırmaya dahil etmelidir.

Bağlam için, %2,5 tipik bir spot bitcoin ETF'sinin ücretinin yaklaşık on katıdır. Grayscale, sponsor ücretinden elde edilen ilk gelirlerin Zcash ekosisteminin geliştirilmesine geri yönlendirileceğini söyledi.

## Bir hissedar aslında neye sahiptir

Bir hisse, ZEC fiyatına maruziyet sağlar. ZEC değildir.

Bir hissedar korumalı bir işlem gönderemez, not ekleyemez, birleşik bir adres tutamaz ve kendi saklamasını yapamaz. Zcash'yı diğer varlıklardan ayıran özelliklerin hiçbiri bu sarmalayıcı üzerinden mevcut değildir — sarmalayıcı fiyatı iletir, başka hiçbir şeyi değil. Amacı aracı kurum veya emeklilik hesabı içinde maruziyet elde etmek olan bir yatırımcı için mesele tam olarak budur. Zcash'ya ilgisi gizlilik olan herkes için ETF, bir cüzdanın yerine geçmez ve ikisi aslında birbirine alternatif değildir.

## ZEC açıkta tutulur

Yapıda başka bir ironi daha vardır ve bu sayfadaki en çarpıcı noktadır. Coinbase Custody, Trust'ın ZEC varlıklarını korumalı adreslerde değil, **şeffaf** adreslerde tutar. Fonun varlıkları zincir üzerinde görünür, saklayıcıya kadar izlenebilir ve ilgilenen herkes tarafından gerçek zamanlı gözlemlenebilir. Bu fonda hiçbir şey korumalı adres kullanmaz.

Bu bir gözden kaçırma değildir. Düzenlemeye tabi fon altyapısı denetim ve tasdik üzerine kuruludur; korumalı bir bakiye ise tam olarak denetçinin bağımsız biçimde doğrulayamayacağı şeydir. Coinbase'nin kendi desteği de aynı asimetriyi yansıtır: korumalı bir adresten gönderilen ZEC'yı alır, ancak bir adrese ZEC göndermez.

Dolayısıyla bir gizlilik varlığının en büyük kurumsal sahibi, onu gizliliği olmayan tek biçimde tutar. Bu nokta, başvurulardan ziyade haberciliğe dayanmaktadır — S-3, Trust'ın özel anahtarlarının saklanmasını açıklar ancak adres türlerini nitelendirmez — ve burada bu ihtiyatla belirtilmiştir.

## Ne kadar ZEC söz konusu

25 Ağustos 2026'daki kotasyon sırasında fon, yaklaşık **387.000 ZEC** tutuyor ve yaklaşık **313 milyon $** yönetilen varlığa sahip bulunuyordu.

Daha uzun bir görünüm için: 30 Eylül 2025 itibarıyla beyan, Trust'ın dolaşımdaki ZEC'nın yaklaşık **%2,4**'ünü tuttuğunu belirtmektedir. Her iki sayı da değişir — ilki ZEC fiyatıyla ve oluşturma ile itfalarla, ikincisi ise ücretin varlıklardan ödenmesiyle — bu nedenle güncel bir rakam için bu sayfa yerine en son başvuruya veya fonun kendi günlük açıklamasına bakın.

## Kaynaklar

Aksi belirtilmedikçe tümü birincil kaynak ve CIK 1720265 kapsamında EDGAR üzerinde yer almaktadır.

- [Grayscale Zcash Trust (ZEC) — EDGAR başvuru dizini](https://www.sec.gov/edgar/browse/?CIK=1720265&owner=exclude)
- [Kasım 2025 tarihli Form S-3 tescil beyanı](https://www.sec.gov/Archives/edgar/data/1720265/000119312525298561/zcsh-20251126.htm) — kuruluş rolleri, oluşturma ve itfa mekanikleri, Sponsor Ücreti ve dolaşımdaki ZEC yüzdesi
- [31 Aralık 2024'te sona eren yıl için Form 10-K](https://www.sec.gov/Archives/edgar/data/1720265/000095017025035469/zcsh-20241231.htm)
- [Zcash ETF, 25 Ağustos 2026'da NYSE Arca üzerinde işlem görmeye başlar](https://www.globenewswire.com/news-release/2026/8/25/3350404/0/en/the-zcash-etf-ticker-zcsh-built-by-grayscale-begins-trading-on-nyse-arca-expanding-investor-access-to-the-leading-privacy-focused-digital-currency.html)
- [Grayscale Zcash Trust fon sayfası](https://www.grayscale.com/funds/grayscale-zcash-trust) — başlangıç tarihleri ve güncel açıklamalar
- [İlk gizlilik coin'i ETF'si: Grayscale'nin Zcash başvurusunun iç yüzü](https://crypto.news/the-first-privacy-coin-etf-inside-grayscales-zcash-filing/) — ikincil kaynak; Trust'ın ZEC varlıklarının şeffaf adreslerde tutulduğunu belirten bulunan tek kaynak

Rakamlar belirtilen tarihler itibarıyladır ve değişecektir. 30 Eylül 2026'da kontrol edilmiştir.
Yalnızca eğitim amaçlıdır, yatırım tavsiyesi değildir.
