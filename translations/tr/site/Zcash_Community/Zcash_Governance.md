# Zcash Fonlama ve Yönetişim Genel Bakışı

Zcash'in zincir üstü fonlama modeli, blok ödülü mekanikleri ve başlıca kuruluşların rolleri

## 1. Zcash Blok Ödülleri Nasıl Çalışır?

Zcash, bir Proof-of-Work kripto para birimidir. Çıkarılan her blok, ağ yükseltmeleriyle belirlenen sabit bir protokol kuralına göre **blok sübvansiyonunu** (yeni oluşturulan ZEC) ve işlem ücretlerini dağıtır.

- **Mevcut model (NU6.1 / 24 Kasım 2025 ve sonrası)**  
  Dağılım şöyledir:

| Alıcı                          | Yüzde      | Ne finanse eder / durumu                                  |
|--------------------------------|------------|------------------------------------------------------------|
| Madenciler                     | 80%        | Doğrudan blok ödülü madencilere gider                     |
| Zcash Community Grants (ZCG)   | 8%         | Topluluk hibeleri (~2028'e kadar devam eder)              |
| Coin Sahiplerinin Kontrolündeki Fon | 12%   | Eski lockbox'tan aktarılan fonlarla oluşturuldu; coin sahipleri hibeler için oy kullanır ([ZIP 1016](https://zips.z.cash/zip-1016)) |

- **NU6 öncesi tarihsel geliştirme fonu (2020-Kasım 2024)**  
  Her blok sübvansiyonunun %20'si doğrudan geliştirme kuruluşlarına gidiyordu:

  - 7% -> Electric Coin Company (ECC) / Bootstrap Project  
  - 5% -> Zcash Foundation (ZF)  
  - 8% -> Zcash Community Grants (ZCG)

Bu %20'lik "geliştirme fonu", [ZIP 1015](https://zips.z.cash/zip-1015) (NU6, Kasım 2024) aracılığıyla %8 ZCG + %12 lockbox modeliyle değiştirildi. Kasım 2024'ten Kasım 2025'e kadar %12'lik pay, harcanması mümkün olmaksızın Ertelenmiş Geliştirme Fonu Lockbox'ında (Deferred Dev Fund Lockbox) birikti.

### Mevcut model: ZIP 1016 - Topluluk ve Coin Sahibi Fonlama Modeli
ZIP 1016 (Şubat 2025'te oluşturuldu), 24 Kasım 2025'te 3.146.400 numaralı blokta [NU6.1](/zcash-tech/nu6-1) ile ana ağda etkinleştirildi ([ZIP 255](https://zips.z.cash/zip-0255)). Bu model:
- ZCG'ye ayrılan %8'lik payı sürdürür.
- %12'lik lockbox'ı "Coinholder-Controlled Fund"a dönüştürdü (mevcut lockbox fonları + devam eden %12 blok sübvansiyonu ile beslenir).
- Üçüncü yarılanmaya kadar sürer (ZIP, NU7 blok zamanlamasını değiştirirse bu tarihin kaymasına izin verir).
- ZEC coin sahiplerinin hibeler üzerinde oy kullanmasını sağlar (basit çoğunluk, en az 420.000 ZEC oy kullanılmış olmalı).
- Anahtar Sahibi Kuruluşların (şu anda ZF ve Shielded Labs dahil, Bootstrap/ECC ise hibe bağlamlarında anılmaktadır) yasal anlaşmalar ve coin sahibi kararlarına bağlı kalarak multisig yoluyla dağıtımları yönetmesini zorunlu kılar.
- Lockbox kullanımına ilişkin tüm ZIP 1015 gerekliliklerini korur (ekosistem hibelerinin fonlanması).

Bu model, %12'lik tahsiste kuruluş kontrolünden doğrudan coin sahibi yönetişimine geçer. ZIP sürecini veya ticari marka kurallarını değiştirmez.

## 2. Temel Kuruluşlar ve Finansman Kaynakları

**Electric Coin Company (ECC) / Bootstrap Project**  
- Zcash'in ilk yaratıcılarıdır (2016).  
- Tarihsel olarak Kasım 2024'e kadar geliştirme fonunun yaklaşık %7'sini aldı.  
- Ocak 2026'da, çekirdek mühendislik ve ürün ekibi yönetişim anlaşmazlıkları nedeniyle Bootstrap/ECC'den ayrıldı ve Zcash Open Development Lab (ZODL)'ı kurdu.  
- ECC/Bootstrap artık doğrudan protokol fonu almıyor ve artık birincil geliştirme ekibini istihdam etmiyor. Bağışlara, sponsorluklara ve kendi hazinesine dayanıyor.  
- Tarihsel öneme sahiptir ancak artık aktif protokol geliştirme kuruluşu değildir.  
-> Tam profile bakın: [Electric Coin Company](https://zechub.wiki/zcash-organizations/electric-coin-company)

**Zcash Open Development Lab (ZODL)**  
- Ocak 2026'da, Bootstrap/ECC'den ayrıldıktan sonra Zcash'in özgün protokol geliştiricileri (ECC'nin çekirdek mühendislik ve ürün ekibi) tarafından kuruldu.  
- a16z Crypto ve Coinbase Ventures dahil büyük yatırımcılardan 25 milyon doların üzerinde tohum yatırım topladı.  
- Zcash protokolünün özgün mucitleri ve geliştiricilerinden oluşan ekip, çekirdek protokol geliştirmeyi, ZIP katkılarını ve Zodl mobil cüzdanı (Zashi'den yeniden markalandı) dahil gizlilik odaklı araçları sürdürmektedir.  
- Doğrudan zincir üstü protokol fonlaması yoktur; Zcash gizlilik altyapısını ilerletmeye odaklanan VC destekli bağımsız bir laboratuvar olarak faaliyet gösterir.  
-> Tam profile bakın: [ZODL](https://zechub.wiki/zcash-organizations/ZODL)  
-> Resmi site: [zodl.com](https://zodl.com/)
  
**Zcash Foundation (ZF)**  
- Altyapı, düğüm yazılımı, araştırma ve ekosistem sağlığına odaklanan bağımsız bir 501(c)(3) kâr amacı gütmeyen kuruluştur.  
- Tarihsel olarak geliştirme fonunun %5'ini aldı.  
- NU6 sonrasında artık doğrudan protokol fonlaması almıyor. Bağışlara ve hibelere dayanıyor.  
- Zcash ticari markasını elinde tutar (2019'da ECC tarafından bağışlandı) ve yönetişimde merkezi bir rol oynar.  
- Zcash Community Advisory Panel (ZCAP)'i yürütür ve topluluk yoklamalarını kolaylaştırmaya yardımcı olur.  
- ZIP 1016 kapsamında bir Anahtar Sahibi Kuruluş olarak hareket eder.  
-> Tam profile bakın: [Zcash Foundation](https://zechub.wiki/zcash-organizations/zcash-foundation)  
-> Resmi site: [zfnd.org](https://zfnd.org/)

**Zcash Community Grants (ZCG)**  
- Zcash Community Grants programı, Zcash ekosisteminin kamusal yararı için bağımsız ekipleri ve projeleri büyük ölçekli sürekli geliştirme ve diğer çalışmaları yürütmeleri için fonlar.  
- Hibeler, topluluk tarafından seçilen bir komite tarafından kararlaştırılır.  
- Financial Privacy Foundation aracılığıyla yönetilmek üzere blok ödüllerinin tam %8'ini almaya devam eder (NU6 sonrası).  
- Hibeler, topluluğa açık şeffaf bir başvuru ve oylama süreci üzerinden verilir.  
-> Tam profile bakın: [Zcash Community Grants](https://zechub.wiki/zcash-organizations/zcash-community-grants)  
-> Resmi site: [zcashcommunitygrants.org/](https://zcashcommunitygrants.org/)

**Financial Privacy Foundation (FPF)**  
- Cayman Adaları'nda kurulmuş kâr amacı gütmeyen bir kuruluştur.  
- Protokolden doğrudan %8'lik blok sübvansiyonu tahsisini alır (ZIP 1015 uyarınca) ve Zcash Community Grants programı için tüm yasal, mali ve operasyonel idareyi yürütür.  
- Dağıtım, sözleşmeler ve uyumluluk dahil ZCG operasyonları için çatı yapı ve idari destek sağlar.  
- ZCG, FPF çatısı altında özerk ve topluluk tarafından seçilmiş bir yapı olarak faaliyet gösterir.  
-> Tam profile bakın: [Financial Privacy Foundation](https://zechub.wiki/zcash-organizations/financial-privacy-foundation)  
-> Resmi site: [financialprivacyfoundation.org/](https://www.financialprivacyfoundation.org/)

**Shielded Labs**  
- İsviçre merkezli, bağışlarla finanse edilen bağımsız bir Zcash destek kuruluşudur.  
- Zcash ekosisteminde Development Fund veya blok ödüllerinden doğrudan ya da dolaylı fon almamış ilk kuruluştur.  
- ZEC sahiplerine fayda sağlayan girişimlere odaklanır ve Zcash'in yönünü şekillendirmede sahiplerin sesine öncelik verir.  
- Coinholder-Controlled Fund'un yönetimi için ZIP 1016 kapsamında bir Anahtar Sahibi Kuruluş olarak hareket eder.  
- Protokol geliştirmeye, ZIP sürecine ve yönetişime katkıda bulunur (ZIP editörü temsiliyeti).  
-> Tam profile bakın: [Shielded Labs](https://zechub.wiki/zcash-organizations/shielded-labs)  
-> Resmi site: [shieldedlabs.net](https://shieldedlabs.net/)

## 3. Yönetişim - Kararlar Nasıl Alınır?

Zcash yönetişimi, "zincir üstü protokol kuralları" ile "zincir dışı sosyal uzlaşının" bir karışımıdır:

1. **ZIP Süreci (Zcash Improvement Proposals)**  
   - Herkes bir ZIP sunabilir.  
   - Forumlar, Discord ve GitHub üzerinde kamuya açık tartışma yapılır.  
   - Şu anki ZIP Editörleri şunlardır: Jack Grigg, Daira-Emma Hopwood ve Kris Nuttycombe (bireysel kapasiteleriyle); Arya ve Marek (Zcash Foundation); Mark Henderson ve Sam H. Smith (Shielded Labs); Sean Bowe ve Tal Derei (Project Tachyon); ve Dev Ojha (Valar Group).
   - ZIP onayı, bir sonraki ağ yükseltmesine dahil edilmeyi otomatik olarak planlamaz. Konsensüs ZIP'leri bir dağıtım planı ve uygulama gerektirir; kuralları ise belirtilen ağ yükseltmesi yüksekliğinde etkinleşir.

2. **Ticari Marka Anlaşması (2019-2024)**  
   - ECC, Zcash ticari markasını 2019'da ZF'ye bağışladı.  
   - Anlaşma başlangıçta, yeni bir konsensüs protokolü oluşturan herhangi bir ağ yükseltmesi için hem ECC hem de ZF'nin karşılıklı onayını gerektiriyordu.  
   - Nisan 2024'te ECC feshetme niyetini açıkladı; resmi fesih bildirimi Ağustos 2024'te yayımlandı.  
   - 2025 itibarıyla ZF, Zcash ticari markasının tek sorumlu koruyucusudur ve ekosistemdeki merkeziyetsizleşmeyi yansıtan yeni, izin verici bir ticari marka politikası benimsemiştir. Ticari marka artık bir yönetişim veto mekanizması olarak işlememektedir.

3. **Zcash Community Advisory Panel (ZCAP)**  
   - Ekosistem uzmanlarından oluşan gönüllü grup.  
   - Büyük kararlar konusunda bağlayıcı olmayan topluluk yoklamaları için kullanılır.

4. **Zincir Üstü Onaylama**  
   - Ağ yükseltmeleri önceden belirlenmiş bir blok yüksekliğinde etkinleşir. Uyumlu yazılım çalıştıran düğümler, yeni uzlaşı kurallarını bu yükseklikten itibaren uygular. Yükseltme yapmayan düğümler, yükseltme öncesi uzlaşı dalını izlemeye devam edebilir ve bu da zincirin bölünmesine yol açabilir.

5. **Lockbox ve ZIP 1016**  
   - %12'lik lockbox fonları, Kasım 2024'ten Kasım 2025'e kadar protokol içinde birikti.  
   - NU6.1, bu fonları coin sahibi oylaması ve Anahtar Sahibi Kuruluşlar (şu anda ZF ve Shielded Labs belirtilmektedir) tarafından multisig yönetimiyle Coinholder-Controlled Fund'a dönüştürdü.

## 4. Hızlı Referans Tablosu - Fonlamanın Evrimi

| Dönem            | Madenciler | ECC/Bootstrap | ZF   | ZCG  | Lockbox | Notlar                                      |
|------------------|------------|---------------|------|------|---------|---------------------------------------------|
| 2020 - Kas 2024  | 80%        | 7%            | 5%   | 8%   | -       | Klasik geliştirme fonu                      |
| Kas 2024 - Kas 2025 | 80%     | 0%            | 0%   | 8%   | 12%     | NU6 modeli + ZCG uzatması                   |
| Kas 2025 - şimdi (ZIP 1016) | 80% | 0%     | 0%   | 8%   | 12% (Coinholder-Controlled) | NU6.1; 3. yarılanmaya kadar; coin sahibi oylaması |

## 5. İlgili Kaynaklar

- Resmî fonlama açıklaması -> [z.cash/network funding bölümü](https://z.cash/network/?funding=#funding)  
- ZIP 1015 (NU6 fonlama değişikliği) -> [zips.z.cash/zip-1015](https://zips.z.cash/zip-1015)  
- ZIP 1016 (coin sahibi modeli, NU6.1 itibarıyla yürürlükte) -> [zips.z.cash/zip-1016](https://zips.z.cash/zip-1016)  
- Zcash Improvement Proposals -> [zips.z.cash](https://zips.z.cash)  
- Zcash Community Grants portalı -> [zcashcommunitygrants.org](https://zcashcommunitygrants.org)

## 6. Lockbox Panosu

ZecHub Panosu, Lockbox ve Coinholders fonundaki mevcut ZEC miktarını [burada](https://zechub.wiki/dashboard?tab=lockbox) gösterir.
