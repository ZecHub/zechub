![alt text](image-1.png)
# Ironwood: Paranın Sahte Olamayacağını Kanıtlamak

### Zcash bir hataya makine tarafından kontrol edilen bir kanıtla nasıl yanıt verdi?

> **Seri:** *Biçimsel Doğrulama* · **3 bölümün 3. bölümü**
> **Hedef kitle:** yeni başlayanlar. 1. ve 2. bölümler biçimsel doğrulamayı ve Orchard hatasını ele aldı; bu final bölümü, iki fikrin gerçek bir sistemde buluşmasını gösteriyor. İhtiyaç duyulan her şeyi ilerledikçe hatırlatacağız.
> **Elde edeceğiniz şey:** Zcash'ün yeni "Ironwood" havuzu hakkında gerçekte neyi kanıtladığı, kanıtın nasıl yapılandırıldığı, neleri kapsayıp neleri kapsamadığı, eski havuzun nasıl güvenle devreden çıkarıldığı ve bunun kriptografik para inşa etmek için neden yeni bir standarda işaret ettiği konusunda doğru bir anlayış.

1. Bölümde bir sistemin doğru olduğunu *kanıtlamanın* ne anlama geldiğini öğrendik. 2. Bölümde, testlerin dört yıl boyunca gözden kaçırdığı gerçek bir kusuru gördük: sınırsız görünmez sahteciliğe izin verebilecek, yetersiz kısıtlanmış bir eliptik eğri çarpımı. Bu makale çözümü ele alıyor: Zcash yalnızca bir yama ile değil, bu hata sınıfının bütünüyle ortadan kalktığını makine tarafından kontrol edilen bir kanıtla nasıl yanıt verdi?

---

## 1. Bu neden sizi ilgilendirmeli?

Bir hata parayı tehdit ettiğinde, olağan yanıt onu yamalayıp devam etmektir. Zcash daha iddialı bir şey yaptı. Mühendisleri, 28 Temmuz 2026'da etkinleştirilen **Ironwood** adlı yeni bir korumalı havuzun yanı sıra, yeni havuzun belirtilen varsayımlar altında sahte para üretemeyeceğini ortaya koyan, **Lean** kanıt asistanında yazılmış **2.700'den fazla teoremden** oluşan **makine tarafından kontrol edilmiş matematiksel bir kanıt** yayımladı. Kanıt herkese açıktır, açık kaynaklı `ironwood` deposunda bulunur ve tamamlanması üç araştırmacı ve kriptograf ekibinin bir aydan uzun süren çalışmasını gerektirdi.

Bu, Zcash'ün ötesinde önem taşıyor. Canlı bir finansal sistemi ele alıp "sahtecilik yok" ifadesinin ne anlama geldiğini kesin biçimde yazabileceğinizi ve testlerinizin yeterince kapsamlı olduğunu ummak yerine bunu *kanıtlayabileceğinizi* gösteren en açık gerçek dünya örneklerinden biridir. Bir taahhüdü teoreme dönüştürür.

---

## 2. Temel fikir: spesifikasyonu kanıtlayın, hata sınıfını ortadan kaldırın

2. Bölüm, bunu mümkün kılan içgörüyle sona erdi. Her şey bunun üzerine kurulu olduğundan, hatırlayalım:

> *Tespit edilemeyen* bir sahtecilik hatası yalnızca protokolün **spesifikasyonunda**, devrenin zorunlu kılması gerekenlerin matematiksel tanımında bulunabilir. Tespit edilebilir olan her şey kamuya açık muhasebede ortaya çıkardı. Bu nedenle spesifikasyonun sağlamlığını kanıtlamak, gizli sahtecilik hata sınıfının tamamını bir kerede ortadan kaldırır.

Neden "yalnızca spesifikasyonda"? Çünkü her blok, kanıtları da dahil olmak üzere her işlemin tüm içeriğini kalıcı olarak kaydeder. *Yazılım* hatalı bir işlemi yanlışlıkla kabul etseydi, herkes geçmişi düzeltilmiş yazılımdan yeniden geçirip bunu görebilirdi. Bu kanıt kalıcı ve herkese açıktır. Yalnızca temel *matematikteki* bir kusur sonsuza dek gizli kalabilir; çünkü karşısında yeniden çalıştırılabilecek bir "doğru sürüm" yoktur. Biçimsel doğrulamanın hedef aldığı kusur budur.

Testler, *örneklenmiş girdiler üzerindeki davranışı* kontrol eder ve Orchard hatası tam da hiçbir örneklenmiş girdi ona ulaşmadığı için gizli kaldı. Spesifikasyon hakkındaki bir kanıt, kimsenin denemeyi düşünmeyeceği uç durumlar da dahil olmak üzere **tüm** girdileri eşzamanlı olarak kapsar. Dört yıllık görünmez bir kusuru güvenle devreden çıkarmaya yetecek kadar güçlü tek güvence türü budur.

![alt text](image-2.png)

---

## 3. Tam olarak ne kanıtlandı?

Kanıt, altında daha derin bir özellik bulunan tek bir ana özelliği ortaya koyar.

### Bakiye bütünlüğü (ana başlık)

> **Bakiye bütünlüğü:** korumalı havuzda saklanan gizli değer, havuza akan net kamuya açık değeri hiçbir zaman aşmaz.

Bu, sade biçimde sahteciliği önleme özelliğidir. Para korumalı havuza girebilir (kamuya açık olarak görünür) ve havuzdan çıkabilir (kamuya açık olarak görünür), ancak miktarların gizli olduğu içeride hiçbir değer yoktan var edilemez. Bunu doğrulanmış aritmetik içeren küçük bir defterle somutlaştıralım:

- **Dürüst işlem:** `5 + 3 = 8` değerindeki girdiler, `4 + 4 = 8` değerinde çıktılar üretir. Giren değer çıkan değere eşittir. Bakiye bütünlüğü korunur. ✓
- **Bir sahtecilik girişimi:** yine `8` değerindeki girdiler, ancak `4 + 4 + 2 = 10` değerinde çıktılar. Bu, yoktan `2` birim basardı. Bakiye bütünlüğü bunu **yasaklar**: havuz, kendisine girenden daha fazlasını asla ödeyemez. ✗

Bakiye bütünlüğü, ikinci senaryonun hiçbir zaman geçerli bir işlem üretemeyeceğini ifade eden matematiksel önermedir.

### Bilgi sağlamlığı (alttaki motor)

Bakiye bütünlüğünü güvenceye almak için araştırmacıların önce sıfır bilgi kanıt sisteminin kendisi hakkında daha derin ve daha incelikli bir özelliği kanıtlaması gerekiyordu. Olağan sağlamlığın (2. Bölümdeki "yalnızca doğru ifadelerin bir tanığı vardır") korumalı bir havuz için *yeterli olmadığı* ortaya çıkıyor; bunun büyüleyici bir nedeni var: gizli bir işlem her şeyi içerebildiğinden, neredeyse her ifadenin teknik olarak bir tanığı vardır. Bu yüzden araştırmacılar daha güçlü bir özelliği kanıtladı:

> **Bilgi sağlamlığı:** geçerli bir işlem kanıtı üretebilen herkes, *gerçekten* geçerli bir tanığa, yani doğru şekilde türetilmiş ve doğru adresteki gerçek coin'lere sahip olmalıdır.

Bunun biçimsel aracı bir **çıkarıcıdır**: doğrulayıcıyı ikna edebilen herhangi bir kanıtlayıcı verildiğinde, gerçek tanığı ondan çıkarabilen bir prosedür. Bir tanık her zaman çıkarılabiliyorsa, ikna edici kanıtlayıcının gerçekten bir tanığı olmalıdır. 2. Bölümün diliyle bilgi sağlamlığı, yanlış bir ifadenin aradan sıyrılmasına izin verecek **hiçbir sağlamlık boşluğu**, hiçbir eksik kısıt olmadığına dair biçimsel taahhüttür. Bu, Orchard hatasının *yokluğunda* bulunan özelliğin ta kendisidir. Bunun tüm olası kanıtlayıcılar için mevcut olduğunu kanıtlamak, o kapıyı tamamen kapatır.

![alt text](image-3.png)

---

## 4. Kanıt nasıl oluşturuldu?

Doğrulama, tek tuşla elde edilen bir sonuç değil, ciddi bir insan emeğiydi:

- **Lean** kanıt asistanında yazıldı (1. Bölümden hatırlayın: her mantıksal adımı kontrol eden bir makine).
- `ironwood` deposunda herkese açık olarak bulunan **2.700'den fazla teoremden** oluşuyor.
- Project Tachyon'dan Tal Derei'nin liderlik ettiği çalışmalar, zkSecurity'den Gregor Mitscha-Baude ile Zcash Open Development Lab'den Daira-Emma Hopwood'un katkıları ve diğer kriptografların bağımsız paralel sağlamlık kanıtı da dahil olmak üzere, **üç araştırmacı ve kriptograf ekibi** tarafından **bir aydan uzun sürede** üretildi.

Özellik hakkında akıl yürütmek için Lean modeli, her biri eylemlerini, beyan edilen kamuya açık değerini ve imzalarını taşıyan işlemler listesinden oluşan tam bir **defteri** tanımlar. Araştırmacıların **ValidLedger** adını verdiği bir yüklem, ağın konsensüs kurallarını doğrudan aktarır: her eylemin tanığı gerekli koşulları sağlamalıdır, hiçbir harcama işareti (nullifier) iki kez görünmemelidir, başvurulan her ağaç durumu sistemin gerçekten ulaştığı bir durum olmalıdır ve her imza doğrulanmalıdır. Teoremler daha sonra **her** geçerli defter üzerinde nicemleme yapar. "Her geçerli defter" ifadesi bütün meselenin özüdür: bir örnek değil, gerçek bir saldırganın oluşturabileceği her şeyin üst kümesi olan hepsi.

Bakiye bütünlüğü sonucu, sahteciliğe giden her yolun kapalı olduğunu kanıtlayan çeşitli defter düzeyi teoremlerden oluşur: her harcamanın gerçek ve önceki bir çıktıya karşılık geldiği, toplam değerin korunduğu, alınan bir notun harcanabilir kalıp çalınamadığı ve harcamanın uygun yetkilendirme gerektirdiği. Ayrı bir parça olan **bağlayıcı imza**, her işlemin gizli değerlerini beyan ettiği kamuya açık miktara bağlar; böylece gizli ve kamuya açık muhasebe sessizce birbirinden ayrışamaz.

---

## 5. Matematiğin yazılımla buluştuğu yer

İncelikli ve dürüst bir soru şudur: kanıt matematiksel bir modelle ilgilidir, ancak ağ *Rust kodu* çalıştırır. Kodun modelle eşleştiğini nasıl biliriz?

Ekip, doğrulayıcının **parmak izi** adını verdikleri dikkatli bir sınır çizdi. Sınırın üzerinde Lean kanıtları, doğrulayıcıyı kesin bir matematiksel nesne olarak ele alır. Altında ise sıradan Rust uygulaması bulunur. Temel argüman, 2. Bölümdekiyle aynıdır:

> Gerçek yazılımın kanıtlanmış modelden sapabileceği herhangi bir yol bir *uygulama* hatası olurdu ve uygulama hataları yalnızca *tespit edilebilir* sahtecilik üretebilir; çünkü kabul edilen her kanıt kalıcı olarak kaydedilir ve düzeltilmiş yazılımla yeniden çalıştırılabilir.

Dolayısıyla kanıt tespit edilemeyen sınıfı (spesifikasyonu), kalıcı kamu kaydı ise tespit edilebilir sınıfı (uygulamayı) ele alır. Aralarında, *tespit edilemeyen* bir sahtecilik hatasının saklanabileceği bir yer yoktur. Ekip ayrıca gerçek doğrulayıcıyı çalıştırıp yakalanan durumlarda parmak izini tam olarak yeniden ürettiğini doğrulayarak çapraz kontrol yaptı.

---

## 6. En önemli çekince: "belirtilen varsayımlar altında"

1. Bölüm, bir kanıtın sistemin spesifikasyonu *belirtilen varsayımlar altında* karşıladığını güvenceye aldığını ve asla "hiç hata olmayacak" anlamına gelmediğini vurguladı. Zcash ekibi tam olarak bu konuda takdire şayan bir kesinlik gösterdi; dürüst eğitsel yazım da bunu yapmalıdır.

Kanıt, Ironwood'un güvenliğini küçük bir standart ve açıkça adlandırılmış varsayımlar kümesine indirger. Özellikle sağlamlığı, Ironwood'un kullandığı eliptik eğri üzerindeki **ayrık logaritma probleminin** zorluğuna dayanır (en iyi bilinen saldırının `2^126` mertebesinde işlem gerektireceği, uygulanabilir herhangi bir hesaplamanın çok ötesinde olan iyi çalışılmış bir varsayım); ayrıca hash fonksiyonu için standart modelleme varsayımlarına dayanır. İki sınırı açıkça belirtmek gerekir:

- **Bu kriptografik varsayımlar altında geçerlidir.** Temel bir varsayım bozulursa güvence de geçerliliğini yitirir. Bu standart ve kaçınılmazdır; kullanılan kriptografinin neredeyse tamamı bu tür varsayımlara dayanır.
- **Gizliliği değil, bakiye bütünlüğünü kapsar.** Kanıt arz sağlamlığıyla (sahte para yok) ilgilidir. Havuzun farklı argümanlar gerektiren ayrı gizlilik güvencelerini kanıtladığını **iddia etmez**.

Bu sınırları adlandırmak, başarıyı zayıflatmak bir yana, onu güvenilir kılar. İddia kesindir: *standart kriptografik varsayımlar altında, bu havuz tespit edilemeyen sahte coin'ler üretemez.* Bu bir umut değil, teoremdir ve kesin kapsamı açıkça belirtilmiştir.

![alt text](image-4.png)

---

## 7. Eski havuzu güvenle devreden çıkarmak: turnike

*Yeni* havuzun sağlamlığını kanıtlamak hâlâ şu soruyu bırakır: kusurun dört yıl boyunca bulunduğu *eski* Orchard havuzu ne olacak? Geçmişini görünür hâle getiremezsiniz. Ancak geleceğini sınırlayabilirsiniz.

Zcash, **turnike** adlı bir mekanizma getirdi. Kural basit ve güçlüdür:

> Değer, yalnızca doğrulanabilir biçimde girmiş olan miktara kadar eski havuzdan çıkabilir.

Korumalı bir havuza giren ve çıkan para kamuya açık olarak görülebildiğinden (yalnızca *içerideki* faaliyet gizlidir), turnike tüm ağın, şimdiye dek girenden daha fazlasının çıkmadığını kontrol etmesini sağlar. Eski havuzun içinde sahte coin'ler oluşturulmuş olsaydı, bu üst sınıra takılır ve çıkamazlardı. Dürüst fonlar dışarı taşındıkça ve fazlalık ortaya çıkmadıkça, topluluk kusurun hiç istismar edilmediğine dair güçlü kamu kanıtı kazanır. Gizliliğini bozmadan özel bir havuzun arzını denetlemeye en yakın şey budur ve Zcash'ün gizliliğini korurken arz bütünlüğünü Bitcoin gibi bir zincirin şeffaf modeline yaklaştırır.

![alt text](image-5.png)

Ironwood'un kendisi düzeltilmiş kanıt devresini yeniden kullanır, boş bir havuzla sıfırdan başlar ve ileriye dönük korumalar ekler (gelecekteki kuantum bilgisayarların günümüz kriptografisini tehdit etmesi durumunda fonların kurtarılabilir kalmasını sağlayan hükümler dahil). Yeni korumalı faaliyet artık Ironwood üzerinden akarken, eski Orchard havuzu çekimlerle sınırlandırılmıştır.

---

## 8. Daha büyük tablo: yüksek güvenceli kriptografi

Ironwood, Zcash'ün inşa etme biçimindeki daha geniş bir dönüşümün parçasıdır. Yeni nesil ölçeklendirme çalışması (özyinelemeli kanıtlar ve **Ragu** adlı bir araç seti üzerine kurulu **Tachyon** adlı bir mimari), bazen **yüksek güvenceli kriptografi** denilen bir felsefe kapsamında geliştiriliyor: makine tarafından kontrol edilen biçimsel doğrulamayı sonradan düşünülmüş bir unsur olarak değil, yeni kriptografik sistemleri kullanıma sunmanın standart bir parçası olarak ele almak.

Mantık ikna edicidir. İleri düzey kriptografi, insan sezgisinin en zayıf olduğu ve Orchard'ün gösterdiği gibi ince, test edilmemiş bir uç durumun yıllarca saklanabileceği yerdir. Spesifikasyonu kanıtlamak, "tüm olası girdilere" ölçeklenen ve bu boşlukları tasarım gereği kapatan tek tekniktir. Ekip, zamanla bu incelemeyi uygulamaya ve ötesine doğru daha da genişletme niyetini belirtti. Bu standardın Zcash içinde ve ötesinde daha yaygın biçimde benimsendiğini görmeyi bekleyin.

---

## 9. Dürüst bir feragatname

Açıklık için sadeleştirdik. Gerçek Lean geliştirmesi, burada sunulan taslaktan çok daha ayrıntılıdır; eylemlerin, ifadelerin, taahhütlerin, nullifier'ların ve imzaların kesin tanımlarını içerir; "bakiye bütünlüğü" ve "bilgi sağlamlığı", yalnızca sözcüklerle ifade ettiğimiz kesin biçimsel tanımlara sahiptir; ayrık logaritma zorluğuna indirgeme, "standart varsayımlar" altında topladığımız çeşitli ara modellerden (kanıtlayıcının cebirsel modeli ve hash'in rastgele kâhin modeli) geçer; ayrıca parmak izi ve turnikeyi kavramsal düzeyde açıkladık. Bunların hiçbiri temel hikâyeyi değiştirmez: "sahtecilik yok" spesifikasyonu, tüm geçerli defterler üzerinde makine tarafından kontrol edilen bir kanıt, kapsam ve varsayımların açık ve dürüst beyanı ve kusurlu havuzun güvenli şekilde devreden çıkarılması. Yetkili açıklama için Project Tachyon'ın yayımlanmış doğrulama yazılarına ve `ironwood` kanıt deposuna başvurun.

---

## 10. Özet

- Zcash, Orchard hatasına yalnızca bir yamayla değil, yeni **Ironwood** havuzu için **makine tarafından kontrol edilen bir kanıtla** (herkese açık, **Lean** içinde **2.700'den fazla teorem**) yanıt verdi.
- Kanıt, **bilgi sağlamlığı** (geçerli bir kanıtın, kanıtlayıcının bir **çıkarıcı** yoluyla doğrulanan gerçek bir tanığı gerçekten elinde tutmasını gerektirmesi) üzerine kurulu **bakiye bütünlüğünü** (havuzun kamuya açık olarak kendisine girenden daha fazlasını asla ödememesi) ortaya koyar. Bilgi sağlamlığı, boşluğu Orchard hatası olan özelliğin ta kendisidir.
- Testlerin gözden kaçırdığı gizli sahtecilik hata sınıfını kapatan şey, örneklenmiş durumlar yerine **her geçerli defter** hakkında akıl yürütmesidir.
- Matematik-yazılım boşluğu bir **parmak izi** sınırıyla ele alınır: tespit edilemeyen hatalar kanıt tarafından dışlanır ve herhangi bir uygulama sapması kalıcı kamu kaydında **tespit edilebilir** olurdu.
- Güvence kesin şekilde ifade edilir: **ayrık logaritma zorluğu ve standart hash varsayımları altında** geçerlidir ve **gizliliği değil sahteciliği** kapsar. Bu dürüstlük bir zayıflık değil, özelliktir.
- **Turnike**, eski havuzun çıkışlarını doğrulanabilir yatırımlarıyla sınırlandırarak onu güvenle devreden çıkarır; her türlü sahteciliği açığa çıkarır ve arz bütünlüğüne dair kamu kanıtı oluşturur.
- Ironwood, biçimsel doğrulamanın yeni kriptografik para inşa etmenin standart bir parçası olduğu **yüksek güvenceli kriptografiye** doğru bir hareketi yansıtır.

---

## Sözlük

| Terim | Sade Türkçe anlamı |
|---|---|
| **Ironwood** | Zcash'ün kusurlu Orchard havuzunun yerini alan yeni korumalı havuzu (2026) |
| **Balance integrity** | Havuz, kamuya açık olarak kendisine giren değerden daha fazlasını asla ödemez |
| **Knowledge soundness** | Geçerli bir kanıt, kanıtlayıcının gerçek bir tanığa sahip olmasını gerektirir |
| **Extractor** | Herhangi bir ikna edici kanıtlayıcıdan tanığı çıkaran prosedür |
| **Lean** | Doğrulamayı makineyle kontrol etmek için kullanılan kanıt asistanı |
| **ValidLedger** | Teoremlerin üzerinde akıl yürüttüğü konsensüs kurallarının biçimsel modeli |
| **Fingerprint** | Kanıtlanmış matematik ile çalışan Rust yazılımı arasındaki sınır |
| **Under stated assumptions** | Kanıt, belirtilen kriptografik varsayımlar geçerli olduğu sürece geçerlidir |
| **Turnstile** | Bir havuzun çıkışlarını doğrulanabilir yatırımlarıyla sınırlayan kural |
| **High-assurance cryptography** | Biçimsel doğrulamayla standart bir adım olarak kripto inşa etmek |

---

## SSS

**Kanıt, Ironwood'un hatasız olduğu anlamına mı geliyor?**
Hayır; böyle bir iddiada da bulunmuyor. Belirtilen varsayımlar altında tek ve kesin bir özelliği, bakiye bütünlüğünü kanıtlar. Bu, tespit edilemeyen sahteciliği dışlar; akla gelebilecek her hatayı değil.

**Kanıt, işlemlerimin gizli olduğunu garanti ediyor mu?**
Hayır. Doğrulama, havuzun ayrı gizlilik güvencelerini değil, arz sağlamlığını (sahte para olmamasını) kapsar. Bunlar farklı biçimde savunulur.

**İnsanlar (ve AI) tarafından yazılan bir kanıta neden güvenelim?**
Çünkü makine tarafından kontrol edilir. Lean kanıt asistanı her adımı mekanik olarak doğrular; dolayısıyla güven, her adımda herhangi bir insanın ya da AI'ın özenine değil, spesifikasyona ve belirtilen varsayımlara dayanır.

**Eski Orchard havuzunda hâlâ bulunan coin'lere ne olur?**
Çekilebilirler, ancak turnikenin zorunlu kıldığı üzere yalnızca doğrulanabilir biçimde girmiş olan miktara kadar. Bu hem arz bütünlüğünü korur hem de eski kusurun hiç istismar edilmediğini göstermeye yardımcı olur.

**Bu hikâyenin sonu mu?**
Bu bir bitiş çizgisi değil, dönüm noktasıdır. Zcash'ün gelecekteki mimarisi (Ragu araç setiyle Tachyon), biçimsel doğrulama standart bir uygulama olacak şekilde inşa ediliyor ve bu yaklaşımı daha da ileri taşıyor.

---

### Sezginizi sınayın

Birisi şöyle iddia ediyor: "Ironwood biçimsel olarak doğrulandığı için Zcash ile ilgili herhangi bir şeyin ters gitmesi artık imkânsız." Üç bölümdeki fikirleri kullanarak, bu iddianın neden fazla güçlü olduğuna ilişkin iki ayrı neden verin. *(Yanıt aşağıda.)*

<details><summary>Yanıt</summary>

İlk olarak, kanıt *belirtilen varsayımlar* (ayrık logaritma zorluğu ve standart hash modellemesi) altında *belirli* bir özelliği (bakiye bütünlüğünü) kapsar. Bir kriptografik varsayım bozulursa ya da belirtilenlerin dışında bir sorun çıkarsa (örneğin gizlilikte, cüzdan yazılımında veya kanıtlanmamış bir bileşende), kanıt bunun hakkında hiçbir şey söylemez. İkinci olarak, biçimsel doğrulama sistemin *yazılmış olan spesifikasyonu* karşıladığını garanti eder; spesifikasyonun kendisi gerçek bir gereksinimi yakalayamamışsa, kanıt yanlış olan şeyi sadakatle sertifikalandırır. Her iki nokta da 1. Bölümdeki çekincenin yeniden ifadesidir: kanıt kesin ve sınırlıdır; gücü, hiçbir şeyin asla ters gitmeyeceğine dair genel bir güvence olmasında değil, kapsamının dürüst olmasındadır.
</details>

---

### Serinin tamamı

Üç bölüm boyunca genel bir fikirden canlı bir uygulamaya ilerledik: yazılımı test etmek yerine doğru olduğunu **kanıtlamanın** ne anlama geldiği (1. Bölüm), gerçek ve yetersiz kısıtlanmış bir devrenin görünmez para basabilme ihtimali (2. Bölüm) ve **bakiye bütünlüğünün** makine tarafından kontrol edilen bir kanıtının bu hata sınıfını kesin olarak nasıl devreden çıkardığı (3. Bölüm). Birleştirici çizgi tek ve dürüst bir taahhüttür: "hiç hata olmayacak" değil, "bu kesin özellik, belirtilen varsayımlar altında her durum için geçerlidir." Kendi miktarlarını gizleyen para için kanıtlanmaya değer taahhüt tam olarak budur.

*[ZecHub](https://zechub.org) için* Biçimsel Doğrulama *serisinin bir parçası.*
