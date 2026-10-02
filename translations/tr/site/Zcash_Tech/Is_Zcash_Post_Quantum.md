<a href="https://github.com/zechub/zechub/edit/main/site/Zcash_Tech/Is_Zcash_Post_Quantum.md" target="_blank">
  <img src="https://img.shields.io/badge/Edit-blue" alt="Sayfayı Düzenle"/>
</a>

# Zcash Kuantum Sonrası mı?

## Kısa cevap

Hayır, henüz değil.

Ironwood yükseltmesinden bu yana, Ironwood havuzunda tutulan fonlar için Zcash **kuantumla kurtarılabilir** durumdadır. Bu gerçek bir adımdır, ancak kuantum sonrası güvenli olmakla aynı şey değildir. Bunun arkasındaki spesifikasyon olan ZIP 2005 bunu doğrudan söyler: değişiklik, “tek başına protokolü kuantum saldırganlara karşı güvenli hâle getirmez”. Mevcut kriptografi devre dışı bırakıldığında gelecekteki bir Kurtarma Protokolü aracılığıyla taşınabilmeleri için Ironwood fonlarını hazırlar.

Bu sayfa, Zcash’in bugün neyi koruduğunu, Ironwood’un neyi değiştirdiğini, nelerin hâlâ açıkta olduğunu ve nelerin yalnızca bir öneri olduğunu ayırır. Sona yakın [durum tablosu](#status-table), her parçanın hangi aşamada olduğunu ve bunun en son ne zaman kontrol edildiğini gösterir.

<br/>

## Bu kimler için

- “kuantumla kurtarılabilir” ifadesini görüp bunu “kuantuma dayanıklı” olarak anlayan herkes
- Fonlarını Ironwood içine taşıyıp taşımamaya karar veren sahipler
- İnsanları yönlendirebilecekleri kaynaklı bir yanıta ihtiyaç duyan yazarlar ve moderatörler

Kuantum hesaplama hakkında arka plan için [Zcash’te Kuantum Sonrası Güvenlik](/zcash-tech/post-quantum-security) ile başlayın.

<br/>

## Soru neden kafa karıştırıcı

“Kuantum sonrası”, sanki tek bir özellikmiş gibi kullanılır. Zcash için bu en az dört ayrı sorudur ve her birinin yanıtı farklıdır:

1. **Gizlilik.** Bir kuantum saldırganı kimin kime ne kadar ödeme yaptığını görebilir mi?
2. **Harcama.** Bir kuantum saldırganı kendisine ait olmayan coinleri harcayabilir mi?
3. **Enflasyon.** Bir kuantum saldırganı yoktan ZEC yaratabilir mi?
4. **Kurtarma.** Mevcut kriptografi devre dışı bırakılmak zorunda kalırsa dürüst kullanıcılar fonlarını yine de çıkarabilir mi?

Ironwood yalnızca dördüncü sorunun yanıtını ve yalnızca Ironwood havuzundaki notlar için değiştirir.

Bütün bunların arkasındaki tehdit, Zcash’in kullandığı eliptik eğriler üzerindeki ayrık logaritmaları hesaplayabilen bir saldırgandır. Shor algoritmasını çalıştıran yeterince büyük bir kuantum bilgisayarı bunu yapmanın bir yolu olurdu. ZIP 2005, **tek bir** ayrık logaritmayı bulmanın keyfî enflasyona yol açmak veya fon çalmak için yeterli olduğuna işaret eder.

<br/>

## Zcash bugün neyi koruyor

Bu tablo, ayrık logaritmaları kırabilen bir saldırgana karşı protokolün şu anki çalışma biçimini açıklar. Ironwood dâhil her korumalı havuz için geçerlidir; çünkü Ironwood, Orchard devresini, Halo 2 kanıtlarını ve Orchard imzalarını kullanır.

| Özellik | Bugün bir kuantum saldırganına karşı | Ironwood’un değiştirdiği |
|---|---|---|
| Gizlilik | Saldırgan korumalı adresinizi bilmiyorsa korunur. Kanıtlar ve yeniden rastgeleleştirilmiş imzalar fazladan hiçbir bilgi sızdırmaz. Saldırgan adresi biliyorsa, zincirden kaydedilmiş eski notlar dâhil olmak üzere ona gönderilen notların şifresini çözebilir. | Hiçbir şey. ZIP 2005: “Gizlilik açısından durum herhangi bir havuz için değişmemiştir.” |
| Harcama | Korunmuyor. Bir saldırgan kanıtları veya harcama imzalarını taklit edebilir ve hiç görmediği adresler için bile herhangi bir korumalı havuzdan çalabilir. | Henüz hiçbir şey. Koruma yalnızca gelecekte Kurtarma Protokolüne geçildikten sonra gelir. |
| Enflasyon | Korunmuyor. Bir saldırgan geçerli görünen bir kanıt taklit edebilir ve herhangi bir korumalı havuzun içinde ZEC yaratabilir; üstelik bunu kimse fark etmeyebilir. Tek sınır [turnikedir](/zcash-tech/the-turnstile): hiçbir havuz kayıtlı bakiyesinden fazlasını ödeyemez. | Henüz hiçbir şey. Ironwood notları artık tüm içeriklerine, bir kuantum saldırganının taklit edememesi gereken bir biçimde bağlanır; gelecekteki Kurtarma Protokolünün arzı sağlam tutmak için ihtiyaç duyduğu şey budur. |
| Kurtarma | Sprout, Sapling ve Orchard notlarının kurtarma yolu yoktur. Protokolleri devre dışı bırakıldıktan sonra içlerinde kalan her şey erişilemez olur. | İlke olarak her Ironwood notu kurtarılabilir. Hiçbir Sapling veya Orchard notu kurtarılamaz. |

Şeffaf ZEC ayrı bir durumdur. Açık anahtar bilindiğinde ECDSA imzaları taklit edilebilir. Normal bir şeffaf adres için bu, ondan ilk kez harcama yaptığınızda gerçekleşir; ayrıca bir işlem mempool’da onaylanmadan beklerken kısa bir pencere de vardır. ZIP 2005 bunların hiçbirini değiştirmez.

<br/>

## Ironwood neyi değiştirdi

Ironwood, NU6.3 ağ yükseltmesidir. Mainnet’te 28 Temmuz 2026 tarihinde 3.428.143. blokta etkinleşti. Ana amacı Orchard sağlamlık hatasından sonra arz bütünlüğüydü ([Ironwood](/zcash-tech/ironwood) sayfasına bakın); ZIP 2005’teki kuantumla kurtarılabilirlik de bunun bir parçası olarak sunuldu.

- **Yeni bir not biçimi.** Her Ironwood çıktı notu kuantumla kurtarılabilir biçimi kullanır (not düz metni başlangıç baytı `0x03`). Notun rastgeleliği artık tüm alanlarından türetilir; böylece not yalnızca eliptik eğri matematiğine değil, bir hash aracılığıyla içeriğine bağlanır.
- **Yalnızca Ironwood notları için bir kurtarma yolu.** ZIP 326, her Ironwood notunun kurtarılabilir olduğunu ve hiçbir Orchard notunun kurtarılabilir olmadığını açıkça belirtir. Bir cüzdan ayarı bunu değiştirmez.
- **Orchard yeni değer kabul etmeyi bıraktı.** Coinbase ödülleri artık Orchard’e gidemiyor ve Orchard artık farklı bir Orchard adresine gönderemiyor; böylece yeni korumalı değer Ironwood’e düşüyor.
- **Cüzdanlara her şeyi taşımaları söyleniyor.** ZIP 2005, cüzdanların kontrol ettikleri şeffaf, Sprout ve Sapling fonları dâhil tüm fonları uygulanabilir olur olmaz Ironwood notlarına taşıması GEREKTİĞİNİ ve yeni fonlar geldikçe bunu sürdürmesi gerektiğini söyler.

Ironwood’un değiştirmediği şeyler: bugün harcama ve kanıtlama için kullanılan kriptografi, not şifrelemesi ve şeffaf ZEC ile ilgili her şey.

<br/>

## Devam eden sınırlamalar

**Bir açıkta kalma penceresi vardır.** Ironwood’in etkinleşmesinden eski protokoller devre dışı bırakılana kadar, bir kuantum saldırganı her korumalı havuzdaki fonları hâlâ çalabilir, enflasyona yol açabilir veya engelleyebilir. ZIP 2005 buna “kritik açıkta kalma dönemi” der ve bu dönemdeki bir saldırının, sahibin daha sonra kurtarma yeteneğine yine de zarar verebileceği uyarısında bulunur. Bu yüzden Zcash’in kuantum saldırıları uygulanabilir hâle gelmeden **önce** Orchard, Sapling ve Sprout’ü devre dışı bırakması gerektiğini söyler.

**Devre dışı bırakmanın tarihi yoktur.** Hiçbir ZIP, Orchard veya Sapling’ün kapatılmasını planlamamaktadır. Draft ve ZIP adayı olan NU7 2003, sürüm 4 işlemlerine izin vermeyerek Sprout harcamalarını devre dışı bırakırdı. Sapling için yalnızca çekime izin veren bir tartışma Nisan 2026’da forumda başladı.

**Kurtarma Protokolü tamamlanmadı.** ZIP 2005 yalnızca ana hatlarını verir ve ayrıntıların “değişikliğe tabi olduğunu” söyler. Bununla ilgili hiçbir şey dağıtılmadı.

**Şimdi topla, sonra şifresini çöz.** Ironwood, Orchard, Sapling ve Sprout için not şifreli metinlerinin tümü zincirde herkese açıktır. Bir kişi bunları bugün kaydedebilir ve alıcı adresini de biliyorsa daha sonra şifrelerini çözebilir. Yayımladığınız veya paylaştığınız her adres bu riskin parçasıdır. ZIP 2005, gelecekteki transferler için “başka protokol değişikliklerinin değerlendirildiğini” söyler.

**Şeffaf fonlar kapsam dışıdır.** Harcama yapılmış veya yeniden kullanılmış adreslerin açık anahtarları açığa çıkmıştır. Bazı şeffaf adresler için kurtarılabilirlik şimdilik yalnızca bir fikirdir (aşağıdaki ZIP 2007).

**FROST kurulumlarında ek bir uyarı vardır.** FROST ile her katılımcı bir kuantum harcama anahtarı (`qsk`) tutar ve bunu elinde bulunduran bir kuantum saldırganı çalabilir. ZIP 2005, bir tane mevcut olduğunda FROST fonlarının eşik desteğine sahip tamamen kuantum sonrası bir protokole taşınmasını önerir.

<br/>

## Öneriler ve araştırmalar

Bunların hiçbiri aktif değil.

- **Kurtarma Protokolü.** Geçişten sonra Ironwood fonlarının gerçekten harcanmasına izin verecek mekanizma. ZIP 2005’te ana hatları verilmiştir, belirtilmemiştir.
- **ZIP 2007, bazı şeffaf adresler için kurtarılabilirlik.** Yalnızca ZIPzips#1302[ içinde tartışması bulunan ayrılmış bir ](https://github.com/zcash/zips/issues/1302) numarasıdır. Fikir, açık anahtarları hiç açığa çıkmamış P2PKH ve P2SH çıktılarının Ironwood’den daha zayıf garantilerle kurtarılabilir olmasıdır.
- **Bilinen adresler için kuantum sonrası gizlilik.** 2022’den beri, adresler gizli tutulduğunda Zcash’in “zaten kuantum sonrası gizli olması amaçlandığını” belirten ve bunun bilinen adreslere nasıl genişletilebileceğini, örneğin Kyber (şimdi ML-KEM) gibi kuantum sonrası bir anahtar kapsülleme şemasıyla, soran [zips#1133](https://github.com/zcash/zips/issues/1133) içinde açıktır. Haziran 2026’da [zips#1307](https://github.com/zcash/zips/issues/1307), mevcut gizlilik özelliklerini ve olası düzeltmeleri belgeleyecek bir ZIP önerdi.
- **Proje Tachyon.** Önerilen bir ölçeklendirme yükseltmesi. Sitesi, ödeme teslimatını zincir dışına taşıyarak ve kuantum sonrası anahtar değişimi kullanarak yan etki olarak “tam kuantum sonrası gizlilik” sağlayacağını söyler. Kanıt taşıyan veri kitaplığı Ragu, “hâlâ yapım aşamasında” olarak tanımlanmaktadır. Bkz. [Proje Tachyon](/zcash-tech/project-tachyon).
- **Tamamen kuantum sonrası bir Zcash.** Kuantum sonrası kanıtlar, imzalar ve taahhütlerin birlikte kullanımı. 2016’dan beri açık olan [zips#1134](https://github.com/zcash/zips/issues/1134) içinde takip edilmektedir. Spesifikasyon veya zaman çizelgesi yoktur.

<br/>

## Durum tablosu

Son kontrol: 13 Eylül 2026. Bir ZIP’in başlık durumu ile ağ durumu farklı şeylerdir: ZIP 2005, kuralları Temmuz 2026’dan beri Mainnet’te uygulansa da başlığında hâlâ “Önerildi” der.

| Öğe | ZIP durumu | Ağ durumu | Tarih | Kaynak |
|---|---|---|---|---|
| Kuantumla kurtarılabilir notlara sahip Ironwood havuzu (NU6.3) | ZIP 2005 Önerildi, ZIP 229 ve ZIP 258 Draft | Mainnet’te **etkinleştirildi** | 28 Tem 2026, 3.428.143. blok | [ZIP 2005](https://zips.z.cash/zip-2005), [ZIP 258](https://zips.z.cash/zip-0258) |
| Orchard yeni değere kapatıldı | ZIP 2006 Ayrılmış, kurallar ZIP 258’de | Mainnet’te **etkinleştirildi** | 28 Tem 2026 | [ZIP 258](https://zips.z.cash/zip-0258) |
| Cüzdanların fonları Ironwood içine taşıması | ZIP 2005, ZIP 318 ve ZIP 326’daki (Draft) yönergeler | Öneriliyor, cüzdanınıza bağlı | 28 Tem 2026’dan beri | [ZIP 318](https://zips.z.cash/zip-0318), [ZIP 326](https://zips.z.cash/zip-0326) |
| Kurtarma Protokolü | Yalnızca ZIP 2005 içinde ana hatları verilmiş | **Uygulanmadı** | Tarih yok | [ZIP 2005](https://zips.z.cash/zip-2005) |
| Orchard ve Sapling’in devre dışı bırakılması | ZIP yok | **Planlanmadı** | Sapling tartışması Nis 2026’dan | [Forum](https://forum.zcashcommunity.com/t/sapling-withdraw-only-discussion-kickoff/55223) |
| Sprout harcamalarının devre dışı bırakılması (ZIP 2003) | Draft, NU7 adayı | **Etkinleştirilmedi** | Tarih yok | [ZIP 2003](https://zips.z.cash/zip-2003) |
| Şeffaf kurtarılabilirlik (ZIP 2007) | Ayrılmış | **Öneri** | ZIP 5 Tem 2025’te ayrıldı, tartışma 17 Haz 2026’da açıldı | [zips#1302](https://github.com/zcash/zips/issues/1302) |
| Bilinen adresler için kuantum sonrası gizlilik | Açık sorunlar, ZIP yok | **Araştırma** | #1133 18 Ağu 2022’de, #1307 23 Haz 2026’da açıldı | [zips#1133](https://github.com/zcash/zips/issues/1133), [zips#1307](https://github.com/zcash/zips/issues/1307) |
| Proje Tachyon | ZIP yok | **Öneri**, geliştirme aşamasında | İlk kez Nis 2025’te yayımlandı | [tachyon.z.cash](https://tachyon.z.cash/roadmap/) |
| Tamamen kuantum sonrası protokol | Açık sorun, ZIP yok | **Gelecek çalışması** | #1134 28 Mar 2016’da açıldı | [zips#1134](https://github.com/zcash/zips/issues/1134) |

Zcash Foundation’in NU7 duygu yoklamasında (Şubat 2026), kuantumla kurtarılabilirlik ZCAP tarafından %90,5, coin sahipleri tarafından ise %94,6 destek aldı; Tachyon ise neredeyse evrensel destek gördü. Bunlar, NU7’e neyin gireceğine ilişkin kararlar değil, duygu yoklamalarıydı.

<br/>

## Şimdi ne yapabilirsiniz

- **Fonlarınızı Ironwood içine taşıyın.** Sapling ve Orchard notları asla kurtarılabilir olmayacak. Havuzlar arasında değer taşımak miktarı zincir üzerinde gösterir; bu yüzden ZIP 318, cüzdanların bakiyeleri sabit tutarlara bölmesini ve bunları zaman içinde göndermesini ister. Her şeyi tek seferde taşımak yerine cüzdanınızın bunu yapmasına izin verin.
- **İhtiyacınız olmayan korumalı adresleri yayımlamayın.** Gelecekteki bir kuantum saldırganına karşı gizlilik, onların adresinizi bilmemesine bağlıdır. Birleşik adresler oluşturmak ucuzdur; bu nedenle her ödeme yapan kişiye yeni bir tane verin. ZIP 229, bu nedenle adres rotasyonunu önerir.
- **Şeffaf adresleri yeniden kullanmayın.** Birinden harcama yaptığınızda, açık anahtarı kalıcı olarak zincire yazılır.
- **Kurtarma ifadenizi güvende tutun.** Ana hatlarıyla belirtilen Kurtarma Protokolünde, bir kurtarma harcamasının harcama anahtarını bildiğinizi kanıtlaması gerekir ve normal cüzdanlar bu anahtarı kurtarma ifadesinden türetir.
- **“Zcash kuantuma dayanıklıdır” iddialarını görmezden gelin.** Henüz değil ve spesifikasyonları yazan kişiler de bunu söylüyor.

<br/>

## Yaygın yanlış anlamalar

- **“Ironwood kuantum sonrasıdır.”** Hayır. Aynı Orchard kriptografisini çalıştırır ve ZIP 2005, özelliğin “Orchard protokolünü kuantum saldırılarına karşı güvenli hâle getirmediğini” söyler.
- **“Kuantumla kurtarılabilir olmak, bugün kuantum bilgisayarlarına karşı güvenli olmak demektir.”** Hayır. Bu, Ironwood fonlarının gelecekteki bir geçişten sonra, geçiş zamanında gerçekleştiği sürece kurtarılabileceği anlamına gelir.
- **“Korumalı Zcash zaten kuantum sonrası gizlidir.”** Yalnızca saldırgan adresinizi bilmiyorsa. Bilinen adresler her havuzda açıkta kalır.
- **“Tachyon zaten kuantum sonrası gizlilik ekledi.”** Tachyon bir öneridir. Ondan hiçbir şey aktif değildir.
- **“Kuantum bilgisayarları Zcash’in her parçasını kırar.”** Hash fonksiyonları, bilinen kuantum saldırılarıyla kırılmaz; yalnızca zayıflar. Kuantumla kurtarılabilirlik tam olarak bu farka dayanır.

<br/>

## İlgili sayfalar

- [Zcash’te Kuantum Sonrası Güvenlik](/zcash-tech/post-quantum-security)
- [Ironwood](/zcash-tech/ironwood)
- [Turnike](/zcash-tech/the-turnstile)
- [Proje Tachyon](/zcash-tech/project-tachyon)
- [FROST](/zcash-tech/frost)
- [Korumalı Havuzlar](/using-zcash/shielded-pools)

<br/>

## Kaynaklar

- [ZIP 2005: Ironwood Kuantumla Kurtarılabilirlik](https://zips.z.cash/zip-2005)
- [ZIP 229: Sürüm 6 İşlem Biçimi](https://zips.z.cash/zip-0229)
- [ZIP 258: NU6.3 Ağ Yükseltmesinin Dağıtımı](https://zips.z.cash/zip-0258)
- [ZIP 318: Orchard’den Ironwood’e Geçiş](https://zips.z.cash/zip-0318)
- [ZIP 326: Cüzdanlar için NU6.3 Sonuçları](https://zips.z.cash/zip-0326)
- [ZIP 2003: Sürüm 4 işlemlerine izin vermeyin](https://zips.z.cash/zip-2003)
- [ZIP 209: Negatif Korumalı Zincir Değeri Havuzu Bakiyelerini Yasaklama](https://zips.z.cash/zip-0209)
- [zips#1302: Şeffaf protokolün bir alt kümesinin kuantumla kurtarılabilirliği](https://github.com/zcash/zips/issues/1302)
- [zips#1133: Zcash için kuantum sonrası gizlilik](https://github.com/zcash/zips/issues/1133)
- [zips#1307: Kuantum ve ayrık logaritma kıran saldırganlara karşı Zcash gizliliği](https://github.com/zcash/zips/issues/1307)
- [zips#1134: Tamamen kuantum sonrası Zcash](https://github.com/zcash/zips/issues/1134)
- [Proje Tachyon yol haritası](https://tachyon.z.cash/roadmap/)
- [NU7 Yoklama Sonuçları: Duyduklarımız ve Buradan Nereye Gideceğimiz](https://forum.zcashcommunity.com/t/nu7-polling-results-what-we-heard-and-where-we-go-from-here/54775)
- [Blockchair üzerindeki 3.428.143. blok](https://blockchair.com/zcash/block/3428143)
- [Forum isteği: Zcash kuantum sonrası mı?](https://forum.zcashcommunity.com/t/is-zcash-post-quantum-help-wanted-d-proposal/57154)
