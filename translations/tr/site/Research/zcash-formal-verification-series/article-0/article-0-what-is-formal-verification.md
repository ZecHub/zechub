![alt text](image-1.png)
# Formal Doğrulama Nedir?

### Bir programın doğru olduğunu sadece umut etmek yerine nasıl kanıtlarsınız

> **Seri:** *Formal Doğrulama Serisi* · **3 bölümün 1. bölümü**
> **Hedef kitle:** tamamen yeni başlayanlar. Matematik, programlama veya kriptografi bilgisi varsayılmaz.
> **Bu yazıdan edinecekleriniz:** yazılımın doğru olduğunu *kanıtlamanın* ne anlama geldiğine, bunun test etmekten neden temelden farklı olduğuna, makine tarafından denetlenen bir kanıtın ne olduğuna ve böyle bir kanıtın neleri vaat edebileceğinin kesin (ve dürüst) sınırlarına dair net bir anlayış.

Çoğu yazılıma *test edildiği* için güvenilir: onu birçok girdiyle çalıştırır ve nasıl davrandığını izleriz. Formal doğrulama daha cesur bir soru sorar. Bir sistemin, hiç kimsenin denemeyi düşünmediği girdiler de dâhil olmak üzere, **her** olası girdi için yapması gerekeni yaptığını matematiksel kesinlikle *kanıtlayabilir* miyiz? Bu makale bu fikri temelden inşa ediyor. Önce sezgi; hak edilene kadar sembol yok.

---

## 1. Neden önemsemelisiniz?

İşte gerçek bir hikâye ve bu serinin var olma nedeni bu.

2022'de gizlilik odaklı kripto para birimi Zcash, insanların tutarları gizli olarak işlem yapmasına olanak veren Orchard adlı yeni bir korumalı havuz başlattı. Dört yıl boyunca kusursuz çalıştı ve tekrarlanan profesyonel denetimlerden geçti. Ardından Mayıs 2026'da, altta yatan matematik hakkında dikkatle akıl yürüten bir güvenlik araştırmacısı (AI araçlarının yardımıyla), sistemin matematiğinde tek bir **yetersiz kısıtlanmış** nokta buldu. Bu tek boşluk, bir saldırganın sınırsız miktarda sahte para yaratmasına izin verebilirdi ve tutarlar gizli olduğu için kimse bunun gerçekleştiğini göremezdi. Kusur en başından beri vardı.

Bu testlerle yakalanmadı. Dört yıl boyunca her test başarılı olmuştu. Birinin *matematik üzerine akıl yürütmesiyle* yakalandı. Ekip bunu düzelttiğinde de yalnızca yama yapıp devam etmediler. Yerine geçen çözümün bu kusur sınıfını kesinlikle içeremeyeceğini gösteren, 2.700'den fazla bireysel teoremi kapsayan **makine tarafından denetlenmiş matematiksel bir kanıt** yazdılar.

Formal doğrulama budur ve size şunu kazandırır: “çok sayıda durumu denedik ve çalıştılar” değil, “her durum için geçerli olduğunu kanıtladık.” Gözden kaçmış tek bir durumun felaket olabileceği sistemlerde (para, uçaklar, tıbbi cihazlar, kriptografi) bu fark her şeydir.

Testlerdeki kör nokta, bilgisayar bilimcisi Edsger Dijkstra tarafından onlarca yıl önce adlandırıldı ve hâlâ geçerlidir:

> **Testler hataların *varlığını* gösterebilir, ancak *yokluğunu* asla gösteremez.**

Bir test başarılı olursa, sistemin *o girdi için* çalıştığını öğrenirsiniz. Denemediğiniz girdiler hakkında hiçbir şey öğrenmezsiniz ve tehlikeli hatalar neredeyse her zaman kimsenin denemediği durumlarda bulunur.

---

## 2. Sezgi: kapıları kontrol etmek ve binayı kanıtlamak

Bin kapısı olan bir binadan sorumlu olduğunuzu ve görevinizin her kapının gece kilitli olduğunu garanti etmek olduğunu hayal edin.

- **Test yaklaşımı:** etrafta dolaşıp kapılardan bir örneklem deneyin. Elli, yüz, beş yüz kapıyı deneyin. Denediğiniz her biri kilitlidir; bu nedenle güveniniz artar. Ancak hepsini denemediniz ve kilidi açık olan tek kapı, atladığınız bir kapı olabilir.
- **Formal doğrulama yaklaşımı:** *kilitleme sisteminin kendisini* inceleyin ve tasarımından, “kilitle” düğmesine basmanın zorunlu olarak her kapıyı devreye soktuğunu kanıtlayın. Artık tek tek kapıları denemenize hiç gerek yoktur. Mekanizma bunu imkânsız kıldığı için *hiçbir olası kapının kilitsiz bırakılamayacağını* göstermiş olursunuz.

Fark, **gerçekliği örneklemek** ile **tasarımın bir özelliğini kanıtlamak** arasındadır. Testler örnekler. Formal doğrulama kanıtlar. Bütün fikir budur; geri kalan her şey bunu titizlikle yapmak için gereken mekanizmadır.

![alt text](image-2.png)

---

## 3. Her formal doğrulamanın üç temel unsuru

Ne kadar gelişmiş olursa olsun, her formal doğrulama tam olarak üç bileşen üzerine kurulur. Bunları net biçimde kavrayın; geri kalanı ayrıntıdır.

| Temel unsur | Sade anlamı | Bina benzetmesi |
|---|---|---|
| **Spesifikasyon** | “Doğru”nun ne *anlama geldiğine* dair kesin ifade | “Her kapı gece kilitli olmalıdır” |
| **Sistem** | Kontrol edilen gerçek şey (bir program, devre veya protokol) | Bina ve kilitleme mekanizması |
| **Kanıt** | Sistemin spesifikasyonu her zaman karşıladığına dair titiz bir argüman | “Kilitle”ye basmanın tüm kapıları kilitlediğini gösteren mantıksal açıklama |

Ve dördüncü, daha sessiz bir bileşen her şeyi güvenilir kılar:

- **Bir makine denetleyicisi.** Kanıt bir insan tarafından yazılıp yalnızca gözle incelenmez. Her *tek mantıksal adımı* kontrol eden bir programa (bir **kanıt asistanına**, diğer adıyla bir **teorem ispatlayıcısına**) verilir. Bir insan geçiştirebilir ya da ince bir hata yapabilir; makine, kesin olarak önceki adımlardan çıkmayan bir adımı kabul etmez. Sonucun **makine tarafından denetlendiğini** bu yüzden söyleriz.

![alt text](image-3.png)

Adını duyabileceğiniz kanıt asistanları arasında **Lean**, **Rocq** (eski adıyla Coq) ve **Isabelle** bulunur. Bunlar özünde olağanüstü katı mantık denetleme motorlarıdır. Açılış hikâyemizdeki Zcash kanıtı **Lean** ile yazıldı. Özellikle, modern AI modelleri insanların rehberliğinde bu kanıtların *yazılmasına* giderek daha fazla yardımcı oluyor; bu da eskiden yıllar süren çalışmaları haftalara indirdi. Makine yine de her adımı denetlediğinden, bu hızlanmanın kesinlik açısından bir bedeli yoktur.

---

## 4. Kanıt aslında nedir?

“Kanıt” kelimesi göz korkutucu gelebilir; bu yüzden onu somut, denetlenebilir bir örnekle anlaşılır kılalım. Kriptografi yok, yalnızca okul aritmetiği.

**İddia:** her tam sayı `n` için, `0 + 1 + 2 + ... + n` toplamı `n(n+1)/2`'e eşittir.

Bunu *test edebilirsiniz*. `n = 5`, `0+1+2+3+4+5 = 15` verir ve `5 × 6 / 2 = 15`. ✓ Eşleşiyor. `n = 10`'yi deneyin: toplam `55`'tür ve formül `10 × 11 / 2 = 55` verir. ✓ (Bunlar hesaplanmış ve doğrulanmıştır; iddia gerçekten de doğrudan kontrol edildiğinde 0 ile 999 arasındaki her `n` için geçerlidir.)

Ancak bin tane bile olsa değerleri test etmek, **her** tam sayı için ifadesine asla ulaşamaz. Sonsuz sayıda vardır. Bir **kanıt**, **tümevarım** adlı bir teknik kullanarak bu sonsuz boşluğu sonlu bir argümanla kapatır:

1. **Başlangıç durumu:** `n = 0` için toplam yalnızca `0`'dir ve formül `0 × 1 / 2 = 0` verir. Aynıdırlar. ✓
2. **Tümevarım adımı:** formülün bir `k` sayısı için geçerli *olduğunu varsayın*. Şimdi bir sonraki sayıyı, `k+1`'yi ekleyin. `k+1`'ye kadarki toplam `(sum up to k) + (k+1) = k(k+1)/2 + (k+1)` olur. Bir satır cebir bunu `(k+1)(k+2)/2` biçiminde yeniden düzenler; bu da `k` yerine `k+1` konmuş formülün tam kendisidir. ✓

Başlangıçta (0'da) geçerli olduğu ve her adım onu bir sonraki sayıya taşıdığı için, tek bir sonlu argümanla sonsuza dek **tüm** tam sayılar için geçerlidir. Kanıt budur. Bir kanıt asistanı tam olarak bu akıl yürütmeyi yapar, ancak “bir satır cebir” dâhil her adımın gerçekten önceki adımlardan çıktığını mekanik olarak doğrular.

> Kavranması gereken sıçrama şudur: bir kanıt, “sonsuz sayıda durumu” **sonlu, denetlenebilir bir argümana** dönüştürür. Bu, testlerin yapısal olarak sahip olmadığı süper güçtür.

---

## 5. Hatalar aslında nerede bulunur?

Formal doğrulama, kısmen, ilk etapta hataların *nereden* kaynaklandığına dair açıklayıcı bir içgörü sayesinde güçlüdür. Kural denetleyen bir sistemdeki her kusur üç yerden birine dayanır:

| Hata kaynağı | Anlamı | Kanıtla ortadan kaldırabilir miyiz? |
|---|---|---|
| **Spesifikasyon** | Matematiğin veya kuralların kendisi yanlıştır (eksik koşul, kötü tanım) | **Evet**, doğrudan; formal doğrulamanın ana alanı budur |
| **Uygulama** | Kod, doğru bir spesifikasyonu sadakatle yerine getiremez | Kısmen; bu tür başarısızlıklar sıklıkla tespit edilebilir kanıtlar bırakır |
| **Bozulmuş varsayım** | Tüm sistemin dayandığı bir şeyin yanlış olduğu ortaya çıkar | Hayır; varsayımlar indirgenemez temeldir |

Bu sınıflandırma görünenden daha önemlidir ve 2. ve 3. bölümler bunun etrafında şekillenir. En derin, en tehlikeli, sonsuza dek saklı kalabilen hatalar genellikle **spesifikasyonda** bulunur: sistemin ne yapması gerektiğine dair matematiksel tanımda. Ve spesifikasyon, makine tarafından denetlenen bir kanıtın doğrudan, tüm durumları aynı anda inceleyebileceği şeydir. Ciddi formal doğrulama çalışmalarının ilk olarak burayı hedeflemesinin nedeni budur.

![alt text](image-4.png)

---

## 6. Tüm alanın en önemli çekincesi

Formal doğrulama güçlüdür; ancak vaadi kesindir ve yanlış anlaşılması insanları yanıltır. Bu yüzden dikkatle ifade edelim:

> **Bir kanıt, *sistemin*, belirtilmiş *varsayımlar* altında *spesifikasyonu* karşıladığını garanti eder. Daha fazlasını değil.**

Buradan dört sonuç çıkar ve her biri önemlidir:

- **Spesifikasyon yanlışsa, kanıt değersizdir.** “Her kapı kilitlenir”i kanıtlarsanız ama asıl gereksinim “her *pencere* kilitlenir” idiyse, yanlış şeyi kusursuz biçimde kanıtlamış olursunuz. Doğrulama, doğru şeyi belirttiğinizi değil, *belirttiğiniz şeyi* inşa ettiğinizi kontrol eder.
- **Bir tanım incelikli biçimde yanlış ifade edilirse, garanti sessizce daralır.** Biraz yanlış bir “bakiye” tanımı hakkında bir kanıt, her denetimden geçerken düşündüğünüzden daha azını ortaya koyabilir. Bu nedenle doğrulamanın merkezindeki tanımlar kısa, standart ve insanların açıkça inceleyebileceği nitelikte olmalıdır.
- **Varsayımlar başarısız olursa, garanti geçerliliğini yitirir.** Kanıtlar varsayımlara dayanır (“kilit donanımı fiziksel olarak bozuk değildir”). Gerçekte bir varsayım yanlışsa, sonuç geçerli olmak zorunda değildir.
- **Bu, “asla hiç hata yok” anlamına gelmez.** “Bu spesifikasyon tarafından dışlanan türden hata yok, bu varsayımlar verildiğinde” anlamına gelir. Daha dar, daha dürüst ve çok daha yararlı bir iddiadır.

Formal doğrulamayı zayıflatmak bir yana, bu kesinlik onun gücüdür. Size *tam olarak* ne elde ettiğinizi söyler. 3. Bölümde göreceğimiz üzere, Zcash ekibinin kapsamını ve varsayımlarını açıkça belirtmesi (“bu adlandırılmış varsayımlar altında arz sağlamlığını kanıtladık, gizliliği değil”) bu dürüstlüğün örneğidir.

![alt text](image-5.png)

---

## 7. Dürüst bir açıklama

Bunu okunabilir tutmak için basitleştirdik. Gerçek spesifikasyonlar İngilizce cümlelerle değil, kesin formal dillerle yazılır; farklı problemlere uygun çeşitli formal doğrulama *tarzları* vardır (etkileşimli teorem ispatı, model denetimi, SMT tabanlı yöntemler); ayrıca bu kanıtları yazmak, AI yardımıyla bile beceri ve çaba gerektirir. Bir kanıt asistanının mantığı içeride nasıl temsil ettiğini de atladık. Bunların hiçbiri özü değiştirmez: belirtilmiş varsayımlar altında bir spesifikasyon, bir sistem ve ikisinin uyumlu olduğuna dair makine tarafından denetlenen bir kanıt. Gerektikçe ayrıntılara geri döneceğiz.

---

## 8. Özet

- **Test**, belirli girdileri örnekler ve bir hatanın mevcut olduğunu gösterebilir; hataların yokluğunu asla gösteremez. Tehlikeli hatalar kimsenin örneklemediği durumlarda saklanır.
- **Formal doğrulama**, bir özelliğin **her** olası durum için sonlu, denetlenebilir bir argümanla geçerli olduğunu kanıtlar.
- Her doğrulamanın üç temel unsuru vardır: bir **spesifikasyon** (doğrunun ne anlama geldiği), bir **sistem** (kontrol edilen şey) ve bunların uyumlu olduğuna dair bir **kanıt**; ayrıca her adımı makine tarafından denetleyen (**Lean** gibi) bir **kanıt asistanı**.
- Bir **kanıt** (örneğin **tümevarımla**) sonsuz sayıda durumu tek bir sonlu argümana indirger.
- Hatalar **spesifikasyonda**, **uygulamada** veya **bozulmuş bir varsayımda** bulunur. Formal doğrulama doğrudan spesifikasyonu hedefler; en derin ve en gizli hataların bulunma eğiliminde olduğu yer burasıdır.
- Garanti kesindir: sistem, **belirtilmiş varsayımlar** altında **spesifikasyonu** karşılar. Yanlış bir spesifikasyon, yanlış ifade edilmiş bir tanım veya bozulmuş bir varsayım bunu geçersiz kılar; bu asla “hiç hata yok” anlamına gelmez.

---

## Sözlük

| Terim | Sade İngilizce anlamı |
|---|---|
| **Formal doğrulama** | Bir sistemin tüm durumlar için bir spesifikasyonu karşıladığını matematiksel olarak kanıtlama |
| **Spesifikasyon** | “Doğru davranış”ın ne anlama geldiğine dair kesin ifade |
| **Sistem** | Kontrol edilen gerçek program, devre veya protokol |
| **Kanıt** | Bir iddiayı tüm durumlar için ortaya koyan sonlu mantıksal adımlar zinciri |
| **Kanıt asistanı / teorem ispatlayıcı** | Bir kanıtın her adımını denetleyen yazılım (Lean, Rocq, Isabelle) |
| **Makine tarafından denetlenmiş** | Yalnızca insan okumayla değil, bilgisayar tarafından adım adım doğrulanmış |
| **Tümevarım** | Bir kanıt tekniği: başlangıçta doğru ve her adım onu sonrakine taşır |
| **Varsayım** | Kanıtın dayandığı koşul; yanlışsa garanti geçerli olmayabilir |

---

## SSS

**Formal doğrulama testin yerini alır mı?**
Hayır. Birbirlerini tamamlarlar. Test, pratik sorunları ve hatalı varsayımları düşük maliyetle yakalar; doğrulama ise testlerin hiç örneklemeyebileceği tüm hata sınıflarını dışlar.

**Bu kadar güçlüyse neden her şey formal olarak doğrulanmıyor?**
Pahalıdır ve uzmanlık gerektirir, ancak AI yardımı bu maliyeti düşürüyor. Nadir bir hatanın felaket olacağı sistemler için ayrılır; maliyetinin karşılığını verdiği yer de tam olarak burasıdır.

**Formal olarak doğrulanmış bir sistem yine de başarısız olabilir mi?**
Evet; spesifikasyon yanlışsa, bir tanım yanlış ifade edilmişse, bir varsayım geçerli değilse veya başarısızlık belirtilen kapsamın dışındaysa. Kanıt yalnızca kapsadığını iddia ettiği şeyi kapsar.

**Makine tarafından denetlenen bir kanıt, insan kanıtından daha mı güvenilirdir?**
Büyük ve karmaşık kanıtlar için genellikle evet. Bir makine ince bir boşluğu gözden kaçırmaz veya geçiştirmeyi kabul etmez; ancak kendisine verilen spesifikasyona ve tanımlara yine de güvenir.

**AI kanıtı yazmaya yardım ediyorsa ona neden güvenelim?**
Çünkü kanıt asistanı her adımı mekanik olarak denetler. AI adımlar önerir; makine bunları doğrular. Yanlış bir adım basitçe reddedilir; dolayısıyla AI, garantiyi zayıflatmadan çalışmayı hızlandırır.

---

### Sezginizi test edin

Bir bankanın yazılımının “bir hesap bakiyesinin asla negatife düşmesine izin vermediğini” kanıtlıyorsunuz. Bir yıl sonra para hâlâ kayboluyor. İkisi birden nasıl doğru olabilir? *(Yanıt aşağıda.)*

<details><summary>Yanıt</summary>

Kanıt tam olarak bir özelliği garanti etti: bakiyeler asla negatife düşmez. Para, bu özelliğin hiç ele almadığı şekillerde kaybolabilir; örneğin fonları yanlış (ama yine de negatif olmayan) hesaba taşıyan bir hata veya sistemin hiç belirtilmemiş bir bölümündeki kusur nedeniyle. Doğrulama, vaat ettiği şeyi tam olarak yaptı; daha fazlasını değil. Bu, 6. Bölümdeki çekincenin iş başındaki hâlidir: kanıt, akla gelebilecek her “doğruluk” kavramını değil, spesifikasyonu kapsar.
</details>

---

### Sırada ne var

**2. Bölüm · Orchard Hatası:** 2026'daki gerçek hikâyeyi tüm ayrıntılarıyla ele alacağız. Bir gizlilik sistemi, tutarları kriptografik kanıtlar kullanarak gizliyordu ve matematiğindeki yetersiz kısıtlanmış tek bir satır, bu kanıtların yalan söyleyecek şekilde oluşturulabilmesi ve sınırsız görünmez sahteciliğe izin vermesi anlamına geliyordu. “Yetersiz kısıtlanmış devre”nin tam olarak ne anlama geldiğini, bu hata sınıfının neden sonsuza dek saklı kalabileceğini ve neden birden fazla kez meydana geldiğini göreceğiz.

*[ZecHub](https://zechub.org) için Formal Doğrulama serisinin bir parçası.*
