<a href="https://github.com/zechub/zechub/edit/main/site/Zcash_Tech/Is_Zcash_Post_Quantum.md" target="_blank">
  <img src="https://img.shields.io/badge/Edit-blue" alt="Sayfayı düzenle"/>
</a>

# Zcash kuantum sonrası mı?

## Kısa yanıt

Hayır, henüz değil.

Ironwood ağ yükseltmesinden bu yana Zcash, Ironwood havuzunda tutulan fonlar için **kuantum saldırısı sonrasında kurtarılabilir** durumdadır. Bu gerçek bir adımdır, ancak kuantum sonrası güvenli olmakla aynı şey değildir. Arkasındaki spesifikasyon olan ZIP 2005 bunu doğrudan belirtir: Bu değişiklik, “protokolü tek başına kuantum saldırganlarına karşı güvenli hâle getirmez”. Bu, mevcut kriptografi devre dışı bırakıldıktan sonra gelecekteki bir Kurtarma Protokolü aracılığıyla taşınabilmeleri için Ironwood fonlarını hazırlar.

Bu sayfa, Zcash'in bugün neyi koruduğunu, Ironwood'in neleri değiştirdiğini, nelerin hâlâ savunmasız olduğunu ve nelerin yalnızca bir öneri olduğunu birbirinden ayırır. Sayfanın sonlarına doğru yer alan [durum tablosu](#status-table), her bir parçanın durumunu ve bunun en son ne zaman kontrol edildiğini gösterir.

<br/>

## Bu sayfa kimler için

- “Kuantum saldırısı sonrasında kurtarılabilir” ifadesini görüp “kuantum saldırılarına dayanıklı” olarak yorumlayan herkes
- Fonlarını Ironwood'a taşıyıp taşımamaya karar veren kullanıcılar
- İnsanlara kaynak gösteren bir yanıt sunması gereken yazarlar ve moderatörler

Kuantum hesaplamanın kendisi hakkında arka plan bilgisi için [Zcash'te Kuantum Sonrası Güvenlik](/zcash-tech/post-quantum-security) sayfasından başlayın.

<br/>

## Bu soru neden kafa karıştırıcı?

“Kuantum sonrası” ifadesi tek bir özellikmiş gibi kullanılıyor. Zcash için bu, en az dört ayrı soru demektir ve yanıtları birbirinden farklıdır:

1. **Gizlilik.** Bir kuantum saldırganı kimin kime, ne kadar ödeme yaptığını görebilir mi?
2. **Harcama.** Bir kuantum saldırganı kendisine ait olmayan coinleri harcayabilir mi?
3. **Enflasyon.** Bir kuantum saldırganı yoktan ZEC oluşturabilir mi?
4. **Kurtarma.** Mevcut kriptografinin devre dışı bırakılması gerekirse dürüst kullanıcılar fonlarını hâlâ çekebilir mi?

Ironwood, yalnızca dördüncü sorunun yanıtını değiştirir ve yalnızca Ironwood havuzundaki note'lar için.

Tüm bunların arkasındaki tehdit, Zcash'in kullandığı eliptik eğrilerde ayrık logaritmaları hesaplayabilen bir saldırgandır. Shor algoritmasını çalıştıran yeterince büyük bir kuantum bilgisayarı bunu yapmanın bir yolu olabilir. ZIP 2005, **tek bir** ayrık logaritmayı bulmanın keyfî enflasyona veya fonların çalınmasına yol açmaya yettiğini belirtir.

<br/>

## Zcash bugün neleri koruyor?

Bu tablo, ayrık logaritmaları kırabilen bir saldırgana karşı protokolün bugün nasıl çalıştığını açıklar. Ironwood dâhil tüm korumalı havuzlar için geçerlidir; çünkü Ironwood, Orchard ile aynı Orchard devresini, Halo 2 kanıtını ve RedPallas imzalarını kullanır.

| Özellik | Bugün bir kuantum saldırganına karşı | Ironwood neyi değiştirdi |
|---|---|---|
| Gizlilik | Saldırgan korumalı adresinizi bilmiyorsa korunur. Kanıtlar ve yeniden rastgeleleştirilmiş imzalar ek bilgi sızdırmaz. Saldırgan adresi biliyorsa, Zincir'den kaydedilmiş eski note'lar da dâhil olmak üzere bu adrese gönderilen note'ların şifresini çözebilir. | Hiçbir şeyi. ZIP 2005: “Gizlilik açısından durum hiçbir havuz için değişmemiştir.” |
| Harcama | Korunmuyor. Saldırgan, daha önce hiç görmediği adresler dâhil, herhangi bir korumalı havuzdan çalmak için kanıtları veya harcama imzalarını sahtesini üreterek oluşturabilir. | Henüz hiçbir şeyi. Koruma ancak gelecekte Kurtarma Protokolü'ne geçildikten sonra devreye girer. |
| Enflasyon | Korunmuyor. Saldırgan, geçerli görünen bir kanıtı sahtesini üreterek oluşturabilir ve herhangi bir korumalı havuzda kimse fark etmeden ZEC yaratabilir. Tek sınır [turnike](/zcash-tech/the-turnstile)'dir: hiçbir havuz, kaydedilmiş bakiyesinden fazlasını ödeyemez. | Henüz hiçbir şeyi. Ironwood note'ları artık tüm içeriklerine, bir kuantum saldırganının taklit edememesi gereken biçimde kriptografik taahhütte bulunur. Gelecekteki bir Kurtarma Protokolünün arz bütünlüğünü koruyabilmesi için gereken de budur. |
| Kurtarma | Sprout, Sapling ve Orchard note'larının kurtarma yolu yoktur. Protokolleri devre dışı bırakıldığında içlerinde kalan varlıklara erişilemez. | Her Ironwood note'u ilke olarak kurtarılabilir. Hiçbir Sapling veya Orchard note'u kurtarılamaz. |

Şeffaf ZEC ayrı bir durumdur. ECDSA imzaları, açık anahtar bilindikten sonra sahtelenebilir. Normal bir şeffaf adreste bu, adresten ilk kez harcama yaptığınızda gerçekleşir; ayrıca bir işlem bellek havuzunda onaylanmayı beklerken kısa bir zaman aralığı da vardır. ZIP 2005 bunların hiçbirini değiştirmez.

<br/>

## Ironwood neleri değiştirdi?

Ironwood, NU6.3 ağ yükseltmesidir. Ana ağda 28 Temmuz 2026'da 3.428.143 numaralı blokta etkinleştirildi. Temel amacı, Orchard doğruluk açığından sonra arz bütünlüğünü sağlamaktı ([Ironwood](/zcash-tech/ironwood) sayfasına bakın); ZIP 2005'teki kuantum saldırısı sonrasında kurtarılabilirlik de yükseltmenin bir parçası olarak kullanıma sunuldu.

- **Yeni bir note biçimi.** Her Ironwood çıktı note'u kuantum saldırısı sonrasında kurtarılabilir biçimi kullanır (note açık metninin baştaki baytı `0x03`). Note'un rastgeleliği artık tüm alanlarından türetilir; böylece note yalnızca eliptik eğri matematiğiyle değil, bir hash ile içeriğine bağlanır.
- **Yalnızca Ironwood note'ları için kurtarma yolu.** ZIP 326, her Ironwood note'unun kurtarılabilir ve hiçbir Orchard note'unun kurtarılamaz olduğunu açıkça belirtir. Cüzdan ayarı bunu değiştirmez.
- **Orchard yeni değer kabul etmeyi bıraktı.** Coinbase ödülleri artık Orchard'a gidemez ve Orchard artık farklı bir Orchard adresine gönderim yapamaz; böylece yeni korumalı değer Ironwood'a ulaşır.
- **Cüzdanlara her şeyi taşımaları söyleniyor.** ZIP 2005, cüzdanların kontrol ettikleri tüm fonları (şeffaf, Sprout ve Sapling fonları dâhil) mümkün olan en kısa sürede Ironwood note'larına taşımalarını ve yeni fonlar geldikçe bunu sürdürmelerini TAVSİYE eder.

Ironwood'in değiştirmediği şeyler: bugün harcama ve kanıt oluşturma için kullanılan kriptografi, note şifrelemesi ve şeffaf ZEC ile ilgili her şey.

<br/>

## Devam eden kısıtlamalar

**Bir maruz kalma aralığı var.** Ironwood etkinleştirildiği andan eski protokoller devre dışı bırakılana kadar, bir kuantum saldırganı her korumalı havuzdaki fonları hâlâ çalabilir, enflasyona yol açabilir veya bloke edebilir. ZIP 2005 bu dönemi “kritik maruz kalma süresi” olarak adlandırır ve bu sırada yapılacak bir saldırının, kullanıcının daha sonra kurtarma yapabilme olanağına zarar verebileceği uyarısında bulunur. Bu nedenle, kuantum saldırıları mümkün hâle **gelmeden önce** Zcash'in Orchard'i, Sapling'yi ve Sprout'yi devre dışı bırakması gerektiğini belirtir.

**Sprout dışında, devre dışı bırakma için tarih belirlenmedi.** ZIP, Orchard'i veya Sapling'yi devre dışı bırakma takvimi belirlemiyor. Sprout farklıdır: [ZIP 259](https://zips.z.cash/zip-0259), NU7'in uyguladığı değişiklikler arasında ZIP 2003'ü listeler. Dolayısıyla NU7 etkinleştirildiğinden beri sürüm 4 işlemleri geçersizdir ve Sprout havuzunda kalan tüm ZEC harcanamaz. NU7, Ana ağda 6 Kasım 2026 UTC'de 3.543.405 numaralı blokta etkinleştirildi ([ZIP 259](https://zips.z.cash/zip-0259), [forum duyurusu](https://forum.zcashcommunity.com/t/nu7-timeline/57655)). Sapling yalnızca çekim yapılabilmesine ilişkin bir tartışma, Nisan 2026'da forumda başladı.

**Kurtarma Protokolü tamamlanmadı.** ZIP 2005 yalnızca ana hatlarını çizer ve ayrıntıların “değişebileceğini” belirtir. Bununla ilgili hiçbir şey kullanıma sunulmadı.

**Şimdi topla, sonra şifresini çöz.** Ironwood, Orchard, Sapling ve Sprout için note şifreli metinleri Zincir'de herkese açıktır. Birisi bunları bugün kaydedip daha sonra, alıcı adresini de biliyorsa, şifrelerini çözebilir. Yayımladığınız veya başkalarına verdiğiniz her adres bu riskin bir parçasıdır. ZIP 2005, gelecekteki transferler için “diğer protokol değişikliklerinin değerlendirildiğini” belirtir.

**Şeffaf fonlar kapsam dışındadır.** Harcama yapılmış veya yeniden kullanılmış adreslerin açık anahtarları ifşa olmuştur. Bazı şeffaf adresler için kurtarılabilirlik şimdilik yalnızca bir fikirdir (ZIP 2007, aşağıya bakın).

**FROST kurulumlarının ek bir çekincesi vardır.** FROST ile her katılımcı bir kuantum harcama anahtarı (`qsk`) tutar; bu anahtarı elinde bulunduran bir kuantum saldırganı hırsızlık yapabilir. ZIP 2005, böyle bir protokol mevcut olduğunda FROST fonlarının eşik desteğine sahip, tamamen kuantum sonrası bir protokole taşınmasını önerir.

<br/>

## Öneriler ve araştırmalar

Bunların hiçbiri kullanıma açık değil.

- **Kurtarma Protokolü.** Geçişten sonra Ironwood fonlarının harcanmasını gerçekten sağlayacak mekanizma. ZIP 2005'te ana hatları çizilmiştir, ancak tanımlanmamıştır.
- **ZIP 2007, bazı şeffaf adresler için kurtarılabilirlik.** Yalnızca ayrılmış bir ZIP numarası vardır ve [zips#1302](https://github.com/zcash/zips/issues/1302) içinde tartışılmaktadır. Fikir, açık anahtarları hiç açıklanmamış P2PKH ve P2SH çıktılarının Ironwood'den daha zayıf güvencelerle kurtarılabilir olabileceğidir.
- **Bilinen adresler için kuantum sonrası gizlilik.** 2022'den bu yana [zips#1133](https://github.com/zcash/zips/issues/1133) içinde açık bir konu olarak ele alınıyor. Burada, adresler gizli tutulduğunda Zcash'in “zaten kuantum sonrası özel olmasının amaçlandığı” belirtiliyor ve örneğin Kyber (artık ML-KEM) gibi kuantum sonrası bir anahtar kapsülleme düzeniyle bunun bilinen adreslere nasıl genişletilebileceği soruluyor. Haziran 2026'da [zips#1307](https://github.com/zcash/zips/issues/1307), mevcut gizlilik özelliklerini ve olası düzeltmeleri belgelemek üzere bir ZIP önerdi.
- **Tachyon Projesi.** Önerilen bir ölçeklendirme yükseltmesi. Sitesine göre, ödemelerin Zincir dışına taşınması ve kuantum sonrası anahtar değişiminin kullanılması sayesinde yan etki olarak “tam kuantum sonrası gizlilik” sağlayacak. Kanıt taşıyan veri kütüphanesi Ragu için “geliştirme çalışmaları hâlâ sürüyor” deniyor. Bkz. [Tachyon Projesi](/zcash-tech/project-tachyon).
- **Tamamen kuantum sonrası bir Zcash.** Kuantum sonrası kanıtlar, imzalar ve kriptografik taahhütler bir arada. 2016'dan bu yana [zips#1134](https://github.com/zcash/zips/issues/1134) içinde takip ediliyor. Herhangi bir spesifikasyon veya zaman çizelgesi yok.

<br/>

## Durum tablosu

Sprout satırı hariç, son kontrol tarihi 13 Eylül 2026'dır. Bu satır, NU7 etkinleştirildikten sonra 13 Kasım 2026'da güncellendi. Bir ZIP'in başlığındaki durum ile ağdaki durumu farklı şeylerdir: ZIP 2005'in kuralları Temmuz 2026'dan beri Ana ağda uygulanıyor olsa da başlığında hâlâ “Önerildi” yazar.

| Öğe | ZIP durumu | Ağ durumu | Tarih | Kaynak |
|---|---|---|---|---|
| Kuantum saldırısı sonrasında kurtarılabilir note'lara sahip Ironwood havuzu (NU6.3) | ZIP 2005 Önerildi, ZIP 229 ve ZIP 258 Taslak | Ana ağda **Etkinleştirildi** | 28 Temmuz 2026, 3.428.143 numaralı blok | [ZIP 2005](https://zips.z.cash/zip-2005), [ZIP 258](https://zips.z.cash/zip-0258) |
| Orchard yeni değer girişine kapatıldı | ZIP 2006 Ayrılmış, kurallar ZIP 258'de | Ana ağda **Etkinleştirildi** | 28 Temmuz 2026 | [ZIP 258](https://zips.z.cash/zip-0258) |
| Cüzdanların fonları Ironwood'a taşıması | ZIP 2005, ZIP 318 ve ZIP 326'da yönergeler (Taslak) | Önerilir, cüzdanınıza bağlıdır | 28 Temmuz 2026'dan beri | [ZIP 318](https://zips.z.cash/zip-0318), [ZIP 326](https://zips.z.cash/zip-0326) |
| Kurtarma Protokolü | Yalnızca ZIP 2005 içinde ana hatları çizilmiştir | **Uygulanmadı** | Tarih yok | [ZIP 2005](https://zips.z.cash/zip-2005) |
| Orchard ve Sapling'in devre dışı bırakılması | ZIP yok | **Takvime bağlanmadı** | Sapling tartışması Nisan 2026'dan beri | [Forum](https://forum.zcashcommunity.com/t/sapling-withdraw-only-discussion-kickoff/55223) |
| Sprout harcamalarının devre dışı bırakılması (ZIP 2003) | Önerildi; ZIP 259'a (Önerildi) göre NU7 tarafından dağıtıldı | Ana ağda **Etkinleştirildi** | 6 Kasım 2026, 3.543.405 numaralı blok | [ZIP 2003](https://zips.z.cash/zip-2003), [ZIP 259](https://zips.z.cash/zip-0259) |
| Şeffaf adreslerde kurtarılabilirlik (ZIP 2007) | Ayrılmış | **Öneri** | ZIP 5 Temmuz 2025'te ayrıldı, tartışma 17 Haziran 2026'da açıldı | [zips#1302](https://github.com/zcash/zips/issues/1302) |
| Bilinen adresler için kuantum sonrası gizlilik | Açık konular, ZIP yok | **Araştırma** | #1133 18 Ağustos 2022'de, #1307 23 Haziran 2026'da açıldı | [zips#1133](https://github.com/zcash/zips/issues/1133), [zips#1307](https://github.com/zcash/zips/issues/1307) |
| Tachyon Projesi | ZIP yok | **Öneri**, geliştirme aşamasında | İlk kez Nisan 2025'te yayımlandı | [tachyon.z.cash](https://tachyon.z.cash/roadmap/) |
| Tamamen kuantum sonrası protokol | Açık konu, ZIP yok | **Gelecekte yapılacak çalışma** | #1134 28 Mart 2016'da açıldı | [zips#1134](https://github.com/zcash/zips/issues/1134) |

Zcash Foundation'ın NU7 duygu yoklamasında (Şubat 2026), kuantum saldırısı sonrasında kurtarılabilirlik ZCAP arasında %90,5, coin sahipleri arasında ise %94,6 destek aldı; Tachyon ise neredeyse herkesin desteğini aldı. Bunlar duygu yoklamalarıydı; NU7'a nelerin dâhil edileceğine ilişkin kararlar değildi.

<br/>

## Şimdi neler yapabilirsiniz?

- **Fonlarınızı Ironwood'a taşıyın.** Sapling ve Orchard note'ları asla kurtarılamayacak. Havuzlar arasında değer taşımak, tutarı zincir üstünde gösterir; bu nedenle ZIP 318, cüzdanların bakiyeleri sabit tutarlara bölmesini ve bunları zaman içinde göndermesini önerir. Her şeyi tek seferde taşımak yerine bunu cüzdanınıza bırakın.
- **İhtiyacınız olmayan korumalı adresleri yayımlamayın.** Gelecekteki bir kuantum saldırganına karşı gizlilik, saldırganın adresinizi bilmemesine bağlıdır. Birleşik adresler oluşturmak kolay ve düşük maliyetlidir; bu nedenle her ödeme yapan kişiye yeni bir adres verin. ZIP 229 bu nedenle adreslerin dönüşümlü kullanılmasını önerir.
- **Şeffaf adresleri yeniden kullanmayın.** Bir adresten harcama yaptığınızda açık anahtarı Zincir'de kalıcı olarak yer alır.
- **Kurtarma ifadenizi güvende tutun.** Ana hatları çizilen Kurtarma Protokolü'nde, kurtarma harcamasında harcama anahtarınızı bildiğinizi kanıtlamanız gerekir; normal cüzdanlar bu anahtarı kurtarma ifadesinden türetir.
- **“Zcash kuantum saldırılarına dayanıklıdır” iddialarını dikkate almayın.** Henüz öyle değildir; spesifikasyonları yazanlar da bunu söylüyor.

<br/>

## Yaygın yanlış anlamalar

- **“Ironwood kuantum sonrasıdır.”** Hayır. Aynı Orchard kriptografisini kullanır ve ZIP 2005, özelliğin “Orchard protokolünü kuantum saldırılarına karşı güvenli hâle getirmediğini” belirtir.
- **“Kuantum saldırısı sonrasında kurtarılabilir olması, bugün kuantum bilgisayarlarına karşı güvende olduğu anlamına gelir.”** Hayır. Bu, geçiş zamanında yapılırsa Ironwood fonlarının gelecekteki bir geçişten sonra kurtarılabileceği anlamına gelir.
- **“Korumalı Zcash zaten kuantum sonrası gizlidir.”** Yalnızca saldırgan adresinizi bilmiyorsa. Bilinen adresler her havuzda savunmasızdır.
- **“Tachyon kuantum sonrası gizliliği zaten ekledi.”** Tachyon bir öneridir. Önerideki hiçbir şey kullanıma açık değildir.
- **“Kuantum bilgisayarları Zcash'in her parçasını kırar.”** Bilinen kuantum saldırıları hash işlevlerini kırmaz, yalnızca zayıflatır. Kuantum saldırısı sonrasında kurtarılabilirlik tam da bu farka dayanır.

<br/>

## İlgili sayfalar

- [Zcash](/zcash-tech/post-quantum-security) içindeki Kuantum Sonrası Güvenlik
- [Ironwood](/zcash-tech/ironwood)
- [Turnike](/zcash-tech/the-turnstile)
- [Tachyon Projesi](/zcash-tech/project-tachyon)
- [FROST](/zcash-tech/frost)
- [Korumalı Havuzlar](/using-zcash/shielded-pools)

<br/>

## Kaynaklar

- [ZIP 2005: Ironwood Kuantum Saldırısı Sonrasında Kurtarılabilirlik](https://zips.z.cash/zip-2005)
- [ZIP 229: Sürüm 6 İşlem Biçimi](https://zips.z.cash/zip-0229)
- [ZIP 258: NU6.3 Ağ Yükseltmesinin Dağıtımı](https://zips.z.cash/zip-0258)
- [ZIP 318: Orchard'den Ironwood'e Geçiş](https://zips.z.cash/zip-0318)
- [ZIP 326: Cüzdanlar için NU6.3'ün Sonuçları](https://zips.z.cash/zip-0326)
- [ZIP 2003: Sürüm 4 işlemlerine izin verme](https://zips.z.cash/zip-2003)
- [ZIP 209: Negatif Korumalı Zincir Değer Havuzu Bakiyelerini Yasaklama](https://zips.z.cash/zip-0209)
- [zips#1302: Şeffaf protokolün bir alt kümesinde kuantum saldırısı sonrasında kurtarılabilirlik](https://github.com/zcash/zips/issues/1302)
- [zips#1133: Zcash](https://github.com/zcash/zips/issues/1133) için kuantum sonrası gizlilik
- [zips#1307: Zcash'in kuantum ve ayrık logaritma kırabilen saldırganlara karşı gizliliği](https://github.com/zcash/zips/issues/1307)
- [zips#1134: Tamamen kuantum sonrası Zcash](https://github.com/zcash/zips/issues/1134)
- [Tachyon Proje yol haritası](https://tachyon.z.cash/roadmap/)
- [NU7 Yoklama Sonuçları: Duyduklarımız ve Bundan Sonra Nereye Gideceğimiz](https://forum.zcashcommunity.com/t/nu7-polling-results-what-we-heard-and-where-we-go-from-here/54775)
- [ZecBlock](https://zecblock.com/block/3428143) üzerinde 3.428.143 numaralı blok
- [Forum talebi: Zcash kuantum sonrası mı?](https://forum.zcashcommunity.com/t/is-zcash-post-quantum-help-wanted-d-proposal/57154)
