<a href="https://github.com/zechub/zechub/edit/main/site/Start_Here/Zcash_Monetary_Policy.md" target="_blank">
  <img src="https://img.shields.io/badge/Edit-blue" alt="Edit Page"/>
</a>

# Zcash Para Politikası

## Kısaca

* Zcash toplam arzı 21 milyon ZEC ile sabittir; bu, Bitcoin ile aynı üst sınırdır.
* NU7 6 Kasım 2026'da etkinleştirildiğinden beri, yaklaşık her 25 saniyede yeni bir blok gelir ve 0.52083333 ZEC oluşturur.
* Böylece günde yaklaşık 1.800 yeni ZEC üretilir; bu, NU7 öncesindeki günlük miktarla aynıdır.
* Her blok ödülü madenciye %80, Zcash Community Grants'e %8 ve kilitli kasaya %12 olarak dağıtılır.
* Blok ödülü yaklaşık dört yılda bir yarıya iner. Bir sonraki yarılanmanın Kasım 2028'in sonlarına doğru gerçekleşmesi bekleniyor.

## Temel Açıklama

### Zcash ekonomisi nasıldır?

Zcash'in parasal tabanı, Bitcoin'in sabit 21 milyon ZEC para birimlik arzıyla aynıdır. Ortalama her 25 saniyede bir (NU7 6 Kasım 2026'da etkinleştirilmeden önce 75 saniyede bir), Zcash blokzincirinde yeni bir [blok](https://zcash.readthedocs.io/en/latest/rtd_pages/glossary.html#:~:text=Block,mempool%20in%20an%20unconfirmed%20state.) kazılır ve 0.52083333 ZEC tutarındaki blok ödülü dolaşıma girer. NU7 öncesinde ödül blok başına 1.5625 ZEC idi; [ZIP 218](https://zips.z.cash/zip-0218), blok süresiyle birlikte ödülü üçte bire indirdi; bu nedenle günlük yeni ZEC miktarı değişmedi. NU7'ten beri 0.52083333 ZEC, madenciye %80 (0.41666668 ZEC ve işlem ücretleri), Zcash Community Grants'e %8 (0.04166666 ZEC) ve kilitli kasaya %12 (0.06249999 ZEC) olarak, [ZIP 1015](https://zips.z.cash/zip-1015) uyarınca dağıtılır.

21 milyon ZEC'in tamamı dolaşıma girene kadar blok ödülü yaklaşık dört yılda bir yarıya indirilir. Zcash enflasyonu, Bitcoin'inkini neredeyse birebir takip eder. Yeni coin'ler oluşturuldukça enflasyonun düştüğünü ve her yarılanmada oranın önemli ölçüde azaldığını unutmayın.

## Görsel / Benzetme

Mühürlü bir kasanın önünde duran bir madeni para dağıtıcısı hayal edin. Kasada toplam 21 milyon ZEC var ve kimse kasaya tek bir coin bile ekleyemez.

Dağıtıcı her 25 saniyede bir, 0.52083333 ZEC tutarında küçük bir avuç yeni coin bırakır. Bloğu bulan madenci bu avucun %80'ini alır. Zcash Community Grants %8'ini alır. Son %12 ise kilitli kasaya gider.

Yaklaşık dört yılda bir avuç yarı boyutuna iner. Buna yarılanma denir.

NU7 avuçların üç kat daha sık gelmesini ve her birinin üç kat küçülmesini sağladı. Günlük yeni coin miktarı aynı kaldı.

## Ayrıntılı İnceleme

### Dönemlere göre günlük yeni ZEC miktarı

Yarılanmalar blok başına ödülü azaltır. Daha hızlı bloklar (2019'da Blossom, 2026'da NU7) da blok süresiyle birlikte blok başına ödülü azaltır; bu nedenle günlük miktar değişmez.

| Dönem | Blok süresi | Blok başına ödül | Günlük yeni ZEC miktarı |
|:--|:--|:--|:--|
| Başlangıç dönemi, 2016-2019 | 150 saniye | 12.5 ZEC | 7,200 |
| [Blossom](/zcash-tech/blossom), Aralık 2019-Kasım 2020 | 75 saniye | 6.25 ZEC | 7,200 |
| İlk yarılanma ([Canopy](/zcash-tech/canopy)), Kasım 2020-Kasım 2024 | 75 saniye | 3.125 ZEC | 3,600 |
| İkinci yarılanma ([NU6](/zcash-tech/nu6)), Kasım 2024-Kasım 2026 | 75 saniye | 1.5625 ZEC | 1,800 |
| [NU7](/zcash-tech/nu7), Kasım 2026-2028 sonları | 25 saniye | 0.52083333 ZEC | 1,800 |
| Üçüncü yarılanma, Kasım 2028'in sonlarında bekleniyor | 25 saniye | Mevcut ödülün yarısı | Yaklaşık 900 |

Günlük her değer, blok başına ödülün bir gündeki blok sayısıyla (86,400 saniyenin blok süresine bölünmesiyle bulunan değer) çarpılmasıyla elde edilir. Gerçek blok süreleri biraz değiştiğinden, günlük gerçek üretim bu değerlerin çevresinde küçük farklılıklar gösterir.

### Bir sonraki yarılanma ne zaman gerçekleşecek?

NU7 blokların üç kat daha sık gelmesini sağladığından, bir sonraki yarılanmanın blok numarası değişti. Bir sonraki yarılanma 6,132,390 numaralı blokta gerçekleşecek; bunun Kasım 2028'in sonlarına doğru olması öngörülüyor ([ZIP 259](https://zips.z.cash/zip-0259)). Eski makalelerde 4,406,400 numaralı blok yazıyor. Bu sayı NU7 öncesinde doğruydu.

### Ücretler ve Ağ Sürdürülebilirliği Mekanizması

NU7'ten beri her bloktaki işlem ücretlerinin %60'ı dolaşımdan çıkarılır ve kamuya açık bir rezervde tutulur. 8,939,664 numaralı bloktan itibaren, yaklaşık Şubat 2031'de, her blok normal blok ödülüne ek olarak bu rezervin sabit bir bölümünü madencilere öder. 21 milyonluk üst sınır değişmez. [Ağ Sürdürülebilirliği Mekanizması](/zcash-tech/network-sustainability-mechanism) sayfasında nasıl çalıştığı açıklanır.

## İlgili Sayfalar

- [NU7](/zcash-tech/nu7): 25 saniyelik blokları ve mevcut blok ödülünü getiren ağ yükseltmesi.
- [Ağ Sürdürülebilirliği Mekanizması](/zcash-tech/network-sustainability-mechanism): Her bloktaki ücretlerin %60'ının nereye gittiği ve ne zaman geri döndüğü.
- [Geliştirme Fonu](/start-here/development-fund): Blok ödülündeki geliştirme payının geçmişi.
- [Ağ Yükseltmeleri](/start-here/network-upgrades): Tarihleri ve blok yükseklikleriyle birlikte tüm Zcash yükseltmeleri.
- [Zcash Community Grants](/zcash-organizations/zcash-community-grants): %8'lik payı alan kuruluş.
- [Zcash Madencilik Havuzları](/using-zcash/zcash-mining-pools): Madencilerin çoğunun blok ödülündeki payını kazandığı yerler.

### Kaynaklar

[Zcash'in ekonomisi nasıldır?](https://z.cash/support/faq/#:~:text=Zcash's%20monetary%20base%20is%20the,3.125%20ZEC%20comes%20into%20circulation.)

[ZIP 218: 25 Saniyelik Blok Hedef Aralığı](https://zips.z.cash/zip-0218)

[ZIP 259: NU7 Ağ Yükseltmesinin Dağıtımı](https://zips.z.cash/zip-0259)

[ZIP 1015](https://zips.z.cash/zip-1015)

**Son güncelleme:** Kasım 2026
