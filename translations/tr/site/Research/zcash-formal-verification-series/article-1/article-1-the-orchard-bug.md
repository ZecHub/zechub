![alt text](image-1.png)
# Orchard Hatası: Bir Kanıt Sisteminde Açık Olduğunda

### Matematikteki tek bir yetersiz kısıtlanmış satırın sınırsız görünmez para basabilmesi

> **Seri:** *Biçimsel Doğrulama Serisi* · **3 bölümün 2. kısmı**
> **Hedef kitle:** yeni başlayanlar. 1. Kısım biçimsel doğrulamayı tanıttı; burada onu acil kılan gerçek hatayla karşılaşıyoruz. İhtiyaç duyulan her şey en baştan açıklanıyor.
> **Edinecekleriniz:** Kriptografik bir kanıt sisteminin nasıl sağlamlık açığı içerebileceğine dair sezgisel fakat doğru bir anlayış; 2026'daki Zcash "Orchard" hatasının tam olarak ne olduğu; bu hata sınıfının neden yıllarca gizli kalabildiği ve daha önce neden yaşandığı.

1. Kısımda testin hataların varlığını gösterebileceğini ama yokluğunu asla gösteremeyeceğini ve en tehlikeli hataların bir sistemin *spesifikasyonunda*, yani temelindeki matematikte yaşadığını söylemiştik. Bu makale vaka çalışmasıdır. 2026'da Zcash'in Orchard korumalı havuzunda, bir saldırganın görünmez biçimde sınırsız sahte para oluşturmasına imkân verebilecek bir kusur bulundu. Dört yıl ve tekrarlanan denetimler boyunca hayatta kalmıştı. Onu ve öncüllerini anlamak, sistemlerin doğruluğunu kanıtlamak için mümkün olan en açık motivasyondur.

---

## 1. Neden önemsemelisiniz?

Zcash, özel modu olan bir kripto para birimidir. Korumalı havuzunda işlemlerin tutarları, gönderenleri ve alıcıları **gizlenir**. Bu gizlilik, **sıfır bilgi kanıtları** kullanılarak oluşturulur: bir işlemin içeriğini açığa çıkarmadan tüm kurallara uyduğunu gösteren kriptografik kanıtlar.

Bu tasarımın iki yönü vardır. Bitcoin gibi şeffaf bir defterde biri yoktan para yaratırsa şişirilmiş sayılar herkes tarafından görülebilir; ağ da bunu yakalayıp geri alabilir. Korumalı havuzda ise sayılar tasarım gereği gizlidir. Bu nedenle kanıt sisteminin kendisinde geçersiz bir işlemin geçerli görünmesini sağlayan bir kusur olsaydı, sahtecilik **tespit edilemez** olurdu. Defteri inceleyerek bunu fark edemezdiniz; çünkü defter kasıtlı olarak opaktır.

Orchard'de gerçekleşen risk tam olarak buydu. Bunu anlamak için, sıfır bilgi kanıtının gerçekte neyi kontrol ettiğine bakmamız gerekiyor.

---

## 2. Sezgi: Bir kanıt ancak kontrol listesi kadar iyidir

Belgelerini doğrudan görmeden yolcuları onaylaması gereken bir sınır görevlisini düşünün. Bunun yerine her yolcu bir **kontrol listesi** doldurur ve görevli, listesi tamamen işaretlenmiş herkesi onaylar. Kontrol listesi, *yalnızca meşru bir yolcunun her kutuyu işaretleyebilmesi* için tasarlanmıştır.

Şimdi kontrol listesinde kritik bir kutunun, örneğin "pasaportun süresi dolmamış" kutusunun eksik olduğunu varsayın. Neredeyse herkes yine de dürüstçe doldurur ve hiçbir şey yanlış görünmez. Ama süresi dolmuş pasaportu olan biri de kalan tüm kutuları işaretleyip kolayca geçebilir. Sistem günlük kullanımda iyi görünür. Açık yalnızca onu aramaya giden biri için önem taşır.

Sıfır bilgi kanıtı da bu kontrol listesi gibi çalışır. Özel ayrıntıları açığa çıkarmaz; bunların sabit bir koşul kümesini sağladığını kontrol eder. Gerekli bir koşul yanlışlıkla dışarıda bırakılırsa, bazı geçersiz girdiler de geçebilirken her şey normal görünmeye devam eder.

"Koşulların kontrol listesi" ifadesini kesinleştirelim; çünkü hata tam olarak burada bulunuyordu.

---

## 3. Matematik: devreler, kısıtlar ve sağlamlık

Arka planda, "bu işlem geçerlidir" ifadesi **devre** olarak kodlanır: sayılar üzerinde denklemler biçiminde yazılmış, **kısıt** adı verilen sabit bir aritmetik koşullar kümesi. Geçerli bir kanıt oluşturmak için kanıtlayıcı, *her* kısıtı sağlayan gizli değerler (yani **tanık**) sunmalıdır. Kanıt, bir doğrulayıcıyı böyle bir tanığın var olduğuna ikna eder, ancak onu açığa çıkarmaz.

Bu sistemden ihtiyaç duyduğumuz özelliğin bir adı vardır:

> **Sağlamlık:** *yanlış* bir ifade için geçerli bir kanıt üretmek imkânsız olmalıdır. Yalnızca doğru ifadelerin tüm kısıtları sağlayan tanıkları olmalıdır.

Sağlamlık, sahteciliğe karşı garantidir. Sağlamlık geçerliyse, geçerli bir kanıt gerçekten "kurallara uyan gerçek bir işlem gerçekleşti" demektir. Sağlamlıkta bir boşluk varsa, geçerli bir kanıt hiçbir şey ifade etmeyebilir.

### Eksik bir kısıtın etkisi (doğrulanmış bir örnek)

Kısıtlar çoğu zaman bir değeri basit olmaya zorlamalıdır. Yaygın bir örnek: `b` değerini `0` veya `1` olmak üzere tek bir **bit** olmaya zorlamak. Bunun standart yolu tek bir kısıttır:

```
b × (b − 1) = 0
```

Neden çalışır? Bir çarpım yalnızca çarpanlarından biri sıfır olduğunda sıfırdır. Dolayısıyla `b × (b − 1) = 0`, `b = 0` veya `b = 1` olmasını zorlar; başka hiçbir şeye izin vermez. 0'dan 16'ya kadar her değer kontrol edildiğinde (17'de başa dönen aritmetikte), onu sağlayan *tek* değerler tam olarak **0 ve 1**'dir. ✓

Şimdi bu satırın devreden **yanlışlıkla çıkarıldığını** düşünün. Birdenbire `b` kısıtsız olur. Dürüst olmayan bir kanıtlayıcı `b`'yı `5`, `9` veya başka herhangi bir değere ayarlayabilir ve yine de kalan kısıtları sağlayabilir. Bu tek eksik satır bir **sağlamlık açığıdır**: artık yanlış ifadelerin tatmin edici tanıkları vardır.

Bu varsayımsal değildir. Tam olarak bu türden eksik bir boole kısıtı, geliştirme sırasında Zcash'in ilk korumalı tasarımı Sprout'ta bulundu ve kullanıma sunulmadan önce düzeltildi. Yetersiz kısıtlama, bu devreleri oluştururken yapılan en yaygın ve tehlikeli hatalardan biridir.

![alt text](image-2.png)

Bu, küçük ölçekte Orchard hatasının tüm biçimidir. Şimdi gerçeğine bakalım.

---

## 4. Orchard hatası aslında neydi?

Zcash'in korumalı kanıtları, noktalarının birleştirilebildiği ve sayılarla "çarpılabildiği" matematiksel nesneler olan **eliptik eğriler** üzerine kuruludur; devrenin bu işlemleri kısıtlarla zorlaması gerekir. Devre, **eliptik eğri çarpımı** gerçekleştiren ve doğru yapıldığını kontrol eden aygıtlar içerir.

Shielded Labs ve araştırmacı Taylor Hornby'nin açıklamasına göre Orchard kusuru tam olarak şuydu:

> **Orchard devresinin yetersiz kısıtlanmış bir öğesi**, **eliptik eğri çarpımına rastgele yanlış girdiler beslemeyi ve yine de çarpım kontrolünün geçmesini** mümkün kıldı.

Sade ifadeyle, devrenin kontrol listesinde bu çarpımı kesin olarak belirlemesi gereken kutular eksikti. Boşluk nedeniyle yeterince uzman bir saldırgan, sistemin kabul edeceği fakat işlemin yoktan değer yarattığı bir işlem kanıtı oluşturabilirdi. Bu **sahteciliktir** ve korumalı havuzdaki tutarlar gizli olduğundan, defterden **tespit edilemez** olurdu. Tachyon ekibi daha sonra aynı kusuru kod düzeyinde, temel denklemleri sessizce bozan devredeki eksik satırlar olarak tanımladı.

Kontrol listesi hikâyemizle paralellikler tamdır:

| Kontrol listesi hikâyesi | Orchard hatası |
|---|---|
| Eksik bir "pasaportun süresi dolmamış" kutusu | Eliptik eğri çarpımında eksik bir kısıt |
| Süresi dolmuş pasaportlu yolcu yine de geçer | Rastgele yanlış girdiler çarpım kontrolünü geçer |
| Diğer herkes etkilenmez, bu yüzden hiçbir şey yanlış görünmez | Normal işlemler kusursuz çalıştı ve kusuru gizledi |
| Açığı yalnızca onu arayan biri bulur | Devrenin matematiğini kasıtlı olarak inceleyen bir uzman gerekti |

Bunun ne kadar ciddi olduğunu açıkça belirtelim: araştırmacı, yapay zekâ yardımıyla *tam ve çalışan bir istismar kodu* yazdı ve yerel bir test ağında bunun sınırsız, tespit edilemez sahte para ürettiğini doğruladı. Bu teorik bir endişe değil, gerçek ve istismar edilebilir bir kusurdu.

---

## 5. Neden dört yıl gizli kaldı?

Hata, Orchard'de **Mayıs 2022**'de etkinleşmesinden **Haziran 2026**'daki acil düzeltmeye kadar, dünyanın en iyi kriptograflarından bazılarının tekrarlanan profesyonel denetimleri boyunca varlığını sürdürdü. Nasıl?

Çünkü 1. Kısmın uyardığı gibi, **testler durumları örnekler ve bu kusur hiç kimsenin örneklemediği bir durumda yaşıyordu.** Sıradan işlemler eksik kısıtı hiç tetiklemedi; bu yüzden her test geçti ve normal çalışmanın her günü kusursuz göründü. Kusura yalnızca doğrudan boşluğu hedefleyen sıra dışı bir tanık kasıtlı olarak oluşturularak ulaşılabiliyordu. Nihayetinde test çalıştırılarak değil, *devrenin matematiği hakkında akıl yürütülerek* bulundu.

Keşfin kendisi, güvenliğin yöneldiği noktaya işaret ediyor. Nisan 2026'da Shielded Labs, güvenlik araştırmacısı **Taylor Hornby**'yi özellikle bu tür kusurları avlaması için görevlendirdi. Yeni nesil bir yapay zekâ modeli (Anthropic'in Claude Opus 4.8'i) Mayıs 2026'nın sonlarında yayımlandıktan kısa süre sonra Hornby, özel bir analiz düzeneği ve geleneksel yöntemlerle birlikte bu modeli Orchard devresinin hedefli incelemesinde kullandı. İnceleme, **29 Mayıs 2026** tarihinde güvenlik açığını buldu.

Açıklamadaki iki temkinli gerçeği açıkça belirtmek gerekir:

- Ekip, hatanın istismar edildiğine dair **hiçbir kanıt** bulmadı ve önceki istismarı olası görmüyor (yıllarca uzman incelemesinden kaçmış ve kasıtlı bir beyaz şapkalı çalışma yoluyla bulunmuştu). Ancak *tespit edilemez* bir kusurun doğası gereği, defter tek başına bunun hiç yaşanmadığını tamamen kanıtlayamaz.
- Keşif, varlığın fiyatında keskin bir düşüş de dahil olmak üzere ciddi bir çalkantıya yol açtı; çünkü gizli sahteciliğin *olasılığı* para için son derece ciddidir.

![alt text](image-3.png)

---

## 6. Bu ilk kez yaşanmıyordu

Orchard hatası tekrarlayan bir aileye aittir ve bu aileyi görmek, biçimsel doğrulamayı isteğe bağlı değil kaçınılmaz hissettirir. Bir sahtecilik kusuru her zaman üç kaynaktan birine dayanır (1. Kısımdaki sınıflandırma): **spesifikasyon** (matematiğin kendisi), **uygulama** (kodun doğru matematiği izlememesi) veya **bozulmuş bir varsayım**. En önemlisi:

> Bir sahtecilik hatası yalnızca **spesifikasyonda** yaşıyorsa **tespit edilemez** olur. Uygulama hataları kalıcı herkese açık kanıt bırakır; çünkü her blok her işlemin tüm içeriğini kaydeder, dolayısıyla geçmişin düzeltilmiş yazılımla yeniden oynatılması, hatalı kodun yanlışlıkla kabul ettiği her işlemi ortaya çıkarır.

Zcash'in kendi geçmişi bu örüntüyü göstermektedir:

| Hata (yıl) | Kaynak | Tespit edilebilir mi? |
|---|---|---|
| Zerocash taahhüt kusuru (2016, kullanıma sunulmadan önce) | Spesifikasyon (kısaltılmış bir hash, bağlayıcılık özelliğini bozdu) | Tespit edilemez |
| Güvenilir kurulum sağlamlık kusuru (2018) | Spesifikasyon (temeldeki zk-SNARK makalesindeki bir hata) | Tespit edilemez |
| Kanıtlama sistemi sorgu çakışması (2025) | Spesifikasyon (kanıt sisteminde eksik bir kontrol) | Tespit edilebilir |
| Eğri alt grup doğrulama hatası (2016) | Uygulama (eksik bir alt grup kontrolü) | Tespit edilebilir |
| **Orchard yetersiz kısıtlanmış çarpım (2026)** | **Spesifikasyon (devre)** | **Tespit edilemez** |

Ana çizgi çarpıcıdır: sonsuza dek gizli kalabilecek kusurlar matematikte olanlardır. Bu, spesifikasyonun makine tarafından kontrol edilmiş bir kanıtının ortadan kaldırabileceği sınıftır; tüm durumları birden. Test ve denetim örnekleme yapar; yalnızca matematiği kanıtlamak her girdiyi kapsar.

---

## 7. Yanıt

Zcash'in geliştiricileri hızlı ve aşamalı biçimde hareket etti:

1. **Acil iyileştirme (1-2 Haziran 2026'ya kadar).** Açıklamadan sonraki günler içinde, acil bir ağ yükseltmesi güvenlik açığı penceresini kapattı ve devrenin matematiğinin yeniden sağlam olması için eksik kısıtları ekledi.
2. **Yeni, kanıtlanabilir bir başlangıç ("Ironwood", 28 Temmuz 2026'da etkinleştirildi).** Topluluk, eski havuzun yamalanmış sürümüne süresiz güvenmek yerine düzeltilmiş devreye dayanan ancak temiz başlayan yepyeni bir korumalı havuz olan Ironwood'u başlattı ve buna doğruluğun biçimsel, makine tarafından kontrol edilmiş kanıtını eşlik ettirdi.

Biçimsel doğrulamanın hikâyeye girdiği yer bu ikinci adımdır ve 3. Kısmın konusudur. Ekibin harekete geçtiği farkındalığı önceden görmek önemlidir; çünkü bu serinin tamamını birbirine bağlar:

> *Tespit edilemez* bir sahtecilik kusuru yalnızca protokolün **spesifikasyonunda** yaşayabilir. Dolayısıyla spesifikasyonun sahteciliği dışladığını **kanıtlayabilirseniz**, burada dört yıl gizlenen hata sınıfının tamamını ortadan kaldırırsınız.

Bu, 1. Kısımdaki birinci sütun fikrinin tam olarak kendisidir: spesifikasyonu doğrulayın ve testin asla kapatamayacağı boşluğu kapatın.

---

## 8. Dürüst bir açıklama

Kasıtlı olarak basitleştirdik. Gerçek devre yüzlerce bölge ve binlerce kısıt içerir; gerçek kusur da tek bir eksik bit kontrolünden teknik olarak daha karmaşıktır. Bit kontrolünü kullandık çünkü yetersiz kısıtlanmış bir devrenin *biçimini* tam olarak gösterir ve çünkü bu hata tam olarak Zcash'in geçmişinde gerçekten yaşanmıştır. Kesin Orchard kusuru, resmî açıklamada belirtildiği üzere yetersiz kısıtlanmış bir eliptik eğri çarpımıydı. Açıklama ve iyileştirme zaman çizelgesini de sıkıştırdık. Yetkili teknik anlatım için Shielded Labs açıklamasına ve Project Tachyon yazılarına başvurun.

---

## 9. Özet

- Zcash'in korumalı havuzu tutarları **sıfır bilgi kanıtları** ile gizler; dolayısıyla bu kanıtlardaki bir kusur **görünmez sahteciliğe** imkân verebilir.
- Bir kanıt sistemi sabit bir **devre** içinde **kısıtları** kontrol eder; kritik özelliği **sağlamlıktır**: yalnızca doğru ifadelerin tatmin edici bir **tanığı** olmalıdır.
- **Eksik bir kısıt**, yanlış ifadelerin geçmesine izin veren bir **sağlamlık açığı** oluşturur. (Doğrulanmış oyuncak örnek: `b(b−1)=0`, `b`'i 0 veya 1 olmaya zorlar; çıkarılırsa `b` herhangi bir şey olabilir. Bu hata sınıfı Zcash'in geçmişinde gerçekten yaşanmıştır.)
- **Orchard hatası**, **yetersiz kısıtlanmış bir eliptik eğri çarpımıydı**: rastgele yanlış girdiler çarpım kontrolünü geçebiliyor, sınırsız ve tespit edilemez sahteciliğe imkân tanıyordu. Çalışan bir istismar kodu test ağında gösterildi.
- **Dört yıl** (Mayıs 2022'den Haziran 2026'ya) gizli kaldı; çünkü testler durumları örnekler ve onu hiç örneklemedi. 29 Mayıs 2026'da, yapay zekâ yardımıyla matematik üzerine akıl yürütülerek bulundu.
- Tespit edilemez sahtecilik yalnızca **spesifikasyonda** yaşayabilir ve Zcash bu hata ailesini daha önce de gördü. Zcash, acil düzeltme ve 3. Kısmın konusu olan biçimsel olarak doğrulanmış yeni havuz **Ironwood** ile yanıt verdi.

---

## Sözlük

| Terim | Sade Türkçe anlamı |
|---|---|
| **Korumalı havuz** | Zcash'in, tutarların ve tarafların gizlendiği özel modu |
| **Sıfır bilgi kanıtı** | Gizli bir ifadenin geçerli olduğunu, başka hiçbir şeyi açığa çıkarmadan gösteren kanıt |
| **Devre** | Geçerli bir işlemin sağlaması gereken sabit aritmetik koşullar kümesi |
| **Kısıt** | Devre içindeki tek bir koşul (denklem) |
| **Tanık** | Kısıtları sağlayan gizli değerler |
| **Sağlamlık** | Yalnızca doğru ifadelerin geçerli bir kanıt üretebilmesi garantisi |
| **Sağlamlık açığı** | Yanlış ifadelerin geçmesine izin veren eksik kısıt |
| **Yetersiz kısıtlanmış** | İhtiyaç duyduğu bir koşulu eksik olan devre; Orchard hatasının kök nedeni |
| **Tespit edilebilir / tespit edilemez** | İstismarın herkese açık defterde kanıt bırakıp bırakmayacağı |

---

## SSS

**Gerçekten sahte Zcash oluşturuldu mu?**
İstismara dair hiçbir kanıt bulunmadı ve ekip bunun olası olmadığını düşünüyor. Ancak kusur defterden tespit edilemez olacağından, defter tek başına bunun hiç yaşanmadığını tamamen kanıtlayamaz; yanıtın bu kadar kapsamlı olmasının nedeni budur.

**Tutarları gizlemek neden hatayı daha kötü hâle getirir?**
Şeffaf bir zincirde basılan paralar görünürdür ve yakalanıp geri alınabilir. Tutarlar gizlilik için saklandığında, bir sahtecilik hatası görünür bir anomali oluşturmaz; dolayısıyla fark edilmeden sürebilir.

**Yıllarca süren denetimler bunu neden yakalayamadı?**
Denetimler ve testler büyük ölçüde gerçekçi durumlardaki davranışı inceler. Bu kusur yalnızca matematiksel bir uç durumu hedefleyen kasıtlı olarak oluşturulmuş, sıra dışı bir girdi altında ortaya çıkıyordu; rutin inceleme bunu tetiklemedi. Testle değil, devre üzerine hedefli akıl yürütmeyle bulundu.

**Gerçekten yalnızca eksik bir kısıt yeterli mi?**
Evet. Bir kanıt sistemi yalnızca eksiksiz kısıt kümesi kadar güçlüdür. Dışarıda bırakılan tek gerekli koşul, geçersiz ifadelerin içeri girmesine yeter.

**Yapay zekânın rolü neydi?**
Bir araştırmacı, devrenin matematiğini incelemek ve kusuru bulmak için özel bir düzenek ve geleneksel yöntemlerle birlikte yeni nesil bir yapay zekâ modeli kullandı. Yapay zekâ güvenliğin her iki tarafında da giderek daha fazla kullanılıyor; sistemlerin doğruluğunu kanıtlamanın artık bu kadar önemli olmasının nedenlerinden biri de budur.

---

### Sezginizi sınayın

Korumalı bir işlemin "giren para çıkan paraya eşittir" ifadesini kanıtlaması gerektiğini, fakat devrenin bir çıktı değerini kısıtlamayı unuttuğunu varsayın. Dürüst olmayan bir kanıtlayıcı ne yapabilir ve herkese açık defter neden tamamen normal görünür? *(Yanıt aşağıda.)*

<details><summary>Yanıt</summary>

Bu çıktı kısıtlanmadığında kanıtlayıcı, onu gerçek girdilerin izin verdiğinden daha büyük ayarlayarak yoktan değer, yani sahte para yaratabilir. Kanıt yine de doğrulanır; çünkü eksik kısıt, dengesizliği yakalayacak tek şeydir. Korumalı havuz tutarları gizlediğinden, defter yalnızca "geçerli bir işlem gerçekleştiğini" gösterir; alarm verecek görünür bir dengesizlik yoktur. Sahtecilik gerçektir ama görünmezdir; devrenin sağlamlığının neden bu kadar önemli olduğunun ve neden test edilmek yerine kanıtlanması gerektiğinin tam nedeni budur.
</details>

---

### Sırada ne var

**3. Kısım · Ironwood:** düzeltme yalnızca bir yama değildi. Zcash'in mühendisleri yeni bir korumalı havuz oluşturdu ve belirtilen varsayımlar altında sahte para yaratamayacağını kanıtlayan, Lean kanıt asistanında yazılmış 2.700'den fazla teoremden oluşan makine tarafından kontrol edilmiş matematiksel bir kanıtla buna eşlik etti. "Bakiye bütünlüğü" ve "bilgi sağlamlığı"nın ne anlama geldiğini, kanıtın tam olarak neyi kapsayıp neyi kapsamadığını ve eski havuzun nasıl güvenle kullanımdan kaldırıldığını göreceğiz.

*[ZecHub](https://zechub.org) için* Biçimsel Doğrulama *serisinin bir parçası.*
