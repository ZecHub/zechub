# Zcash Finansman ve Yönetişime Genel Bakış

Zcash'ın zincir üstü finansman modeli, blok ödülü mekanizmaları ve başlıca kuruluşların rolleri

## 1. Zcash Blok Ödülleri Nasıl Çalışır?

Zcash bir İş Kanıtı (Proof-of-Work) kripto para birimidir. Madenciliği yapılan her blok, ağ yükseltmeleriyle belirlenen sabit protokol kuralları uyarınca **blok sübvansiyonunu** (yeni oluşturulan ZEC) ve işlem ücretlerini dağıtır.

- **Mevcut model (NU6.1 / 24 Kasım 2025'ten itibaren)**  
  Dağılım şöyledir:

| Alıcı                          | Yüzde      | Finanse ettiği alan / durum                                |
|--------------------------------|------------|-------------------------------------------------------------|
| Madenciler                     | %80        | Madencilere doğrudan blok ödülü                             |
| Zcash Community Grants (ZCG)   | %8         | Topluluk hibeleri (~2028'e kadar devam eder)                |
| Coinholder-Controlled Fund     | %12        | Önceki lockbox tarafından finanse edildi; coin sahipleri hibeler için oy kullanır ([ZIP 1016](https://zips.z.cash/zip-1016)) |

- **NU6 öncesi tarihsel geliştirici fonu (2020-Kasım 2024)**  
  Her blok sübvansiyonunun %20'si doğrudan geliştirici kuruluşlara gitti:

  - %7 -> Electric Coin Company (ECC) / Bootstrap Projesi  
  - %5 -> Zcash Foundation (ZF)  
  - %8 -> Zcash Community Grants (ZCG)

Bu %20'lik “geliştirici fonu”, [ZIP 1015](https://zips.z.cash/zip-1015) (NU6, Kasım 2024) aracılığıyla %8 ZCG + %12 lockbox modeliyle değiştirildi. Kasım 2024'ten Kasım 2025'e kadar %12'lik pay, harcanma olanağı olmaksızın Deferred Dev Fund Lockbox'ta birikti.

### Mevcut model: ZIP 1016 - Topluluk ve Coin Sahibi Finansman Modeli
ZIP 1016 (Şubat 2025'te oluşturuldu), [NU6.1](/zcash-tech/nu6-1) tarafından 24 Kasım 2025'te 3.146.400 numaralı blokta ana ağda etkinleştirildi ([ZIP 255](https://zips.z.cash/zip-0255)). Bu model:
- ZCG için %8'lik tahsisi sürdürür.
- %12'lik lockbox'ı “Coinholder-Controlled Fund”a dönüştürdü (mevcut lockbox fonları + devam eden %12 blok sübvansiyonu ile finanse edilir).
- Üçüncü yarılanmaya kadar devam eder (ZIP, NU7 blok zamanlamasını değiştirirse bu tarihin değişmesine olanak tanır).
- ZEC coin sahiplerinin hibeler için oy kullanmasına olanak tanır (basit çoğunluk; en az 420.000 ZEC oy kullanmalıdır).
- Anahtar Sahibi Kuruluşların (şu anda ZF ve Shielded Labs'ı içerir; hibe bağlamlarında Bootstrap/ECC anılır) yasal anlaşmalar ve coin sahibi kararlarıyla bağlı çoklu imza aracılığıyla ödemeleri yönetmesini gerektirir.
- Lockbox kullanımıyla ilgili tüm ZIP 1015 gerekliliklerini (ekosistem hibelerinin finansmanı) korur.

Bu model, %12'lik tahsis için kuruluşların kontrolündeki yönetişimden doğrudan coin sahibi yönetişimine geçiş sağlar. ZIP sürecini veya ticari marka kurallarını değiştirmez.

## 2. Temel Kuruluşlar ve Finansman Kaynakları

**Electric Coin Company (ECC) / Bootstrap Projesi**  
- Zcash'ın (2016) ilk yaratıcılarıdır.  
- Kasım 2024'e kadar tarihsel olarak geliştirici fonunun yaklaşık %7'sini aldı.  
- Ocak 2026'da temel mühendislik ve ürün ekibi, yönetişim anlaşmazlıkları nedeniyle Bootstrap/ECC'dan ayrıldı ve Zcash Open Development Lab'ı (ZODL) kurdu.  
- ECC/Bootstrap artık protokolden doğrudan finansman almıyor ve temel geliştirme ekibini bünyesinde bulundurmuyor. Bağışlara, sponsorluklara ve kendi hazinesine dayanıyor.  
- Tarihsel öneme sahip olsa da artık protokolün etkin geliştirme kuruluşu değildir.  
-> Tam profil: [Electric Coin Company](https://zechub.wiki/zcash-organizations/electric-coin-company)

**Zcash Open Development Lab (ZODL)**  
- İlk Zcash protokol geliştiricileri (temel ECC mühendislik ve ürün ekibi), Bootstrap/ECC'dan ayrıldıktan sonra Ocak 2026'da kurdu.  
- a16z Crypto ve Coinbase Ventures dâhil büyük yatırımcılardan 25 milyon dolardan fazla başlangıç finansmanı topladı.  
- Zcash protokolünün ilk mucitleri ve geliştiricilerinden oluşan ekip; temel protokol geliştirmeyi, ZIP katkılarını ve Zodl mobil cüzdanı da dâhil olmak üzere gizlilik odaklı araçları (Zashi markasından yeniden adlandırıldı) sürdürür.  
- Doğrudan zincir üstü protokol finansmanı almaz; Zcash gizlilik altyapısını geliştirmeye odaklanan, risk sermayesi destekli bağımsız bir laboratuvar olarak faaliyet gösterir.  
-> Tam profil: [ZODL](https://zechub.wiki/zcash-organizations/ZODL)  
-> Resmî site: [zodl.com](https://zodl.com/)
  
**Zcash Foundation (ZF)**  
- Altyapı, düğüm yazılımları, araştırma ve ekosistem sağlığına odaklanan bağımsız bir 501(c)(3) kâr amacı gütmeyen kuruluştur.  
- Tarihsel olarak geliştirici fonunun %5'ini aldı.  
- NU6 sonrasında artık protokolden doğrudan finansman almıyor. Bağışlara ve hibelere dayanıyor.  
- ECC tarafından 2019'da bağışlanan Zcash ticari markasını elinde tutar ve yönetişimde merkezi bir rol oynar.  
- Zcash Topluluk Danışma Paneli'ni (ZCAP) yürütür ve topluluk anketlerinin düzenlenmesine yardımcı olur.  
- ZIP 1016 kapsamında Anahtar Sahibi Kuruluşu olarak görev yapar.  
-> Tam profil: [Zcash Foundation](https://zechub.wiki/zcash-organizations/zcash-foundation)  
-> Resmî site: [zfnd.org](https://zfnd.org/)

**Zcash Community Grants (ZCG)**  
- Zcash Community Grants programı, Zcash ekosisteminin kamu yararına yönelik önemli ve devam eden geliştirme çalışmalarını ve diğer işleri yürüten bağımsız ekiplere ve projelere finansman sağlar.  
- Hibeler, topluluk tarafından seçilen bir komite tarafından karara bağlanır.  
- Blok ödüllerinin tam %8'ini almaya devam eder (NU6 sonrası); bu pay Financial Privacy Foundation aracılığıyla yönetilir.  
- Hibeler, topluluğa açık şeffaf bir başvuru ve oylama süreciyle verilir.  
-> Tam profil: [Zcash Community Grants](https://zechub.wiki/zcash-organizations/zcash-community-grants)  
-> Resmî site: [zcashcommunitygrants.org/](https://zcashcommunitygrants.org/)

**Financial Privacy Foundation (FPF)**  
- Cayman Adaları'nda kurulmuş kâr amacı gütmeyen bir kuruluştur.  
- Protokolden doğrudan %8'lik blok sübvansiyonu tahsisini alır (ZIP 1015 uyarınca) ve Zcash Community Grants programının tüm hukuki, mali ve operasyonel yönetimini üstlenir.  
- Ödemeler, sözleşmeler ve mevzuata uyum dâhil olmak üzere ZCG faaliyetleri için üst çatı yapısı ve idari destek sağlar.  
- ZCG, FPF çatısı altında özerk ve topluluk tarafından seçilmiş bir kuruluş olarak faaliyet gösterir.  
-> Tam profil: [Financial Privacy Foundation](https://zechub.wiki/zcash-organizations/financial-privacy-foundation)  
-> Resmî site: [financialprivacyfoundation.org/](https://www.financialprivacyfoundation.org/)

**Shielded Labs**  
- İsviçre merkezli, bağışlarla finanse edilen bağımsız bir Zcash destek kuruluşudur.  
- Zcash ekosisteminde Geliştirme Fonu'ndan veya blok ödüllerinden hiçbir zaman doğrudan ya da dolaylı finansman almamış ilk kuruluştur.  
- ZEC sahiplerine fayda sağlayan girişimlere odaklanır ve Zcash'ın yönünü belirlemede sahiplerin sesine öncelik verir.  
- Coinholder-Controlled Fund'ın yönetimi için ZIP 1016 kapsamında Anahtar Sahibi Kuruluşu olarak görev yapar.  
- Protokol geliştirmeye, ZIP sürecine ve yönetişime katkıda bulunur (ZIP editör temsili).  
-> Tam profil: [Shielded Labs](https://zechub.wiki/zcash-organizations/shielded-labs)  
-> Resmî site: [shieldedlabs.net](https://shieldedlabs.net/)

## 3. Yönetişim - Kararlar Nasıl Alınır?

Zcash yönetişimi, “zincir üstü protokol kuralları” ile “zincir dışı toplumsal konsensüs”ün bir bileşimidir:

1. **ZIP Süreci (Zcash İyileştirme Önerileri)**  
   - Herkes bir ZIP gönderebilir.  
   - Forumlarda, Discord ve GitHub üzerinde kamuya açık tartışmalar yürütülür.  
   - Mevcut ZIP editörleri Jack Grigg, Daira-Emma Hopwood ve Kris Nuttycombe'dur (bireysel sıfatlarıyla); Arya ve Marek (Zcash Foundation); Mark Henderson ve Sam H. Smith (Shielded Labs); Sean Bowe ve Tal Derei (Proje Tachyon); Dev Ojha ise (Valar Group) adına görev yapar.
   - ZIP onayı, sonraki ağ yükseltmesine dâhil edilmesini otomatik olarak takvime almaz. Konsensüs ZIP'leri bir devreye alma planı ve uygulama gerektirir; kuralları belirtilen ağ yükseltmesi yüksekliğinde etkinleşir.

2. **Ticari Marka Anlaşması (2019-2024)**  
   - ECC, Zcash ticari markasını 2019'da ZF'ye bağışladı.  
   - Anlaşma başlangıçta, yeni bir konsensüs protokolü oluşturan herhangi bir ağ yükseltmesi için hem ECC hem de ZF'nin karşılıklı onayını gerektiriyordu.  
   - ECC Nisan 2024'te anlaşmayı feshetme niyetini duyurdu; resmî fesih bildirimi Ağustos 2024'te yapıldı.  
   - 2025 itibarıyla Zcash ticari markasının tek koruyucusu ZF'dir ve ekosistemin merkeziyetsizliğini yansıtan yeni, izin verici bir ticari marka politikası benimsemiştir. Ticari marka artık yönetişimde veto mekanizması işlevi görmez.

3. **Zcash Topluluk Danışma Paneli (ZCAP)**  
   - Ekosistem uzmanlarından oluşan gönüllü bir gruptur.  
   - Önemli kararlar hakkında bağlayıcı olmayan topluluk anketleri için kullanılır.

4. **Zincir Üstü Onaylama**  
   - Ağ yükseltmeleri önceden belirlenmiş bir blok yüksekliğinde etkinleşir. Uyumlu yazılımlar çalıştıran düğümler, bu yükseklikten itibaren yeni konsensüs kurallarını uygular. Yükseltme yapmayan düğümler yükseltme öncesi bir konsensüs dalını izlemeyi sürdürebilir ve bu durum olası bir Zincir bölünmesine yol açabilir.

5. **Lockbox ve ZIP 1016**  
   - %12'lik lockbox fonları, Kasım 2024'ten Kasım 2025'e kadar protokolde birikti.  
   - NU6.1 bunları Coinholder-Controlled Fund'a dönüştürdü; coin sahipleri oy kullanır, Anahtar Sahibi Kuruluşlar (şu anda ZF ve Shielded Labs olarak belirtiliyor) ise çoklu imza aracılığıyla yönetir.

## 4. Hızlı Başvuru Tablosu - Finansmanın Gelişimi

| Dönem           | Madenciler | ECC/Bootstrap | ZF   | ZCG  | Lockbox | Notlar                                      |
|------------------|--------|---------------|------|------|---------|--------------------------------------------|
| 2020 - Kasım 2024  | %80    | %7            | %5   | %8   | -       | Klasik geliştirici fonu                    |
| Kasım 2024 - Kasım 2025 | %80 | %0            | %0   | %8   | %12     | NU6 modeli + ZCG uzatması                  |
| Kasım 2025 - şimdi (ZIP 1016) | %80 | %0   | %0   | %8   | %12 (Coinholder-Controlled) | NU6.1; 3. yarılanmaya kadar; coin sahibi oylaması |

## 5. İlgili Kaynaklar

- Resmî finansman açıklaması -> [z.cash/ağ finansmanı bölümü](https://z.cash/network/?funding=#funding)  
- ZIP 1015 (NU6 finansman değişikliği) -> [zips.z.cash/zip-1015](https://zips.z.cash/zip-1015)  
- ZIP 1016 (coin sahibi modeli, NU6.1'ten beri yürürlükte) -> [zips.z.cash/zip-1016](https://zips.z.cash/zip-1016)  
- Zcash İyileştirme Önerileri -> [zips.z.cash](https://zips.z.cash)  
- Zcash Community Grants portalı -> [zcashcommunitygrants.org](https://zcashcommunitygrants.org)

## 6. Lockbox Gösterge Paneli

ZecHub Gösterge Paneli, Lockbox ve Coinholders fonundaki mevcut ZEC miktarını [burada](https://zechub.wiki/dashboard?tab=lockbox) gösterir.
