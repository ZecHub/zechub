# Hashing ve Taahhütler: Sihirli Mühürlü Zarf
##### [Annkkitaaa](https://github.com/Annkkitaaa) tarafından özgün araştırma

![alt text](image-15.png)

### Bir sırrı herkesin gözü önünde kilitlemek ve sonra onun hakkında asla yalan söyleyememek

> **Seri:** *İlk İlkelerden Zcash* . **Makale 3 . Hashing ve Taahhütler**
> **Hedef kitle:** yeni başlayanlar. [Makale 1 (sonlu alanlar)](article-1-finite-fields.md) ve [Makale 2 (eliptik eğriler)](article-2-elliptic-curves.md) üzerine inşa ediyoruz, ama sezgi tek başına da ayakta durur.
> **Bu makaleden kazanacağınız şey:** hash fonksiyonlarını, "hiding" ve "binding" kavramlarının gerçekte ne anlama geldiğini ve Zcash'in her özel ödemenin temelini oluşturan note commitment'ları nasıl kurduğunu net biçimde anlamak.

[Makale 0](article-0-shielded-transaction.md)'da bir "sihirli mühürlü zarf" tanımlamıştık: içine ne olduğunu gizlerken aynı zamanda böyle bir zarfın var olduğunu kanıtlamak için halka açık bir panoya asabildiğiniz ve daha sonra asla değiştirip yerine başka bir şey koyamadığınız bir şey. Böyle bir şeyin nasıl mümkün olduğunu açıklayacağımıza söz vermiştik. İşte bu makale o açıklama. İki bileşene ihtiyacımız var: **hash fonksiyonları** ve **taahhütler**.

---

## 1. Bu neden umurunuzda olsun?

Bir seçimin sonucunu tahmin ettiğinizi ve *sonradan* bunu önceden bildiğinizi kanıtlamak istediğinizi hayal edin. Tahmininizi doğrudan ilan edemezsiniz (bu insanları etkiler ya da onu değiştirdiğiniz suçlamalarına kapı açar). Ve onu tamamen gizli de tutamazsınız (o zaman da sonradan hiçbir şeyi kanıtlayamazsınız).

İstediğiniz şey, **şimdi bir değeri herkesin gözü önünde sabitlemenin, öyle ki:**

- kimse neyi sabitlediğinizi anlayamasın (şimdilik gizli kalsın), ve
- daha sonra, onu açıkladığınızda, bunun ne olduğu hakkında **yalan söyleyemeyesiniz**.

Bu "şimdi kilitle, sonra açıkla, yalan yok" aygıtına **taahhüt** denir ve Zcash'in her yerindedir. Bir note'un değeri ve sahibi, note oluşturulduğu anda bir taahhüde kilitlenir. Taahhütleri kurmak için önce onların iş atına ihtiyacımız var: hash fonksiyonu.

---

## 2. Sezgi: veri için bir parmak izi

Bir **hash fonksiyonu**, tek bir harften bütün bir kütüphaneye kadar herhangi bir veriyi alır ve onu **özet** ya da **hash** denen kısa, sabit boyutlu bir dizeye indirger. Bunu **veri için bir parmak izi** gibi düşünün.

![alt text](image-16.png)

İyi bir kriptografik parmak izinin dört özelliği vardır. Bunları denklem değil, sezgi olarak akılda tutun:

| Özellik | Düz anlamı | Neden önemlidir |
|---|---|---|
| **Deterministik** | Aynı girdi her zaman aynı parmak izini verir | Bir parmak izini istediğiniz zaman yeniden kontrol edebilirsiniz |
| **İleri yönde hızlı** | Parmak izini hesaplamak hızlıdır | Her yerde kullanmak pratiktir |
| **Tek yönlü (preimage resistant)** | Bir parmak izi verildiğinde, onu üreten girdiyi bulamazsınız | Orijinal veriyi gizler |
| **Collision resistant** | Aynı parmak izine sahip iki farklı girdi bulamazsınız | Kimse sahte bir eşleşme üretemez |

Ve parmak izlerini neredeyse sihirli hissettiren bir davranış daha:

### Avalanche effect (doğrulanmış)

Girdiyi en ufak miktarda değiştirin ve parmak izi *tamamen* değişsin; eskisine hiçbir şekilde benzemez. İşte yalnızca tek bir karakter fark eden iki mesajın gerçek SHA-256 parmak izleri:

```
H("Pay Bob 5 ZEC") = 6e2dc1a954c70cc865f18ea8cb70b7b56eeaf6ca42b380824a55d65dc342f34b
H("Pay Bob 6 ZEC") = 76abc346d8d3053f76a9ae18b617af71f02729a73ec6a51732d2d94934e4217f
```

64 onaltılık rakamdan **59'u farklıdır.** Girdide tek karakter, çıktı olarak tamamen alakasız bir parmak izi. Bu yüzden bir girdiyi hedef bir parmak izine doğru yavaşça itemezsiniz: izleyeceğiniz bir "daha sıcak / daha soğuk" sinyali yoktur.

---

## 3. Parmak izinden taahhüde

İşte cazip ama bozuk bir fikir: gizli bir `v` değerine taahhüt etmek için sadece onun parmak izini `H(v)` yayımlayın.

Bu sizi güzelce *bağlar* (sonradan farklı bir `v` iddia edemezsiniz, çünkü bunun için bir collision gerekir). Ama **gizlemekte başarısız olur.** Olası değerler kümesi küçükse, saldırgan her adayı hash'ler ve karşılaştırır. "evet" ya da "hayır" taahhüdü mü veriyorsunuz? İkisini de hash'ler ve hangisini seçtiğinizi anında öğrenir. Az önce dostumuz olan determinizm şimdi sırrı sızdırıyor.

Çözüm tek kelime: **rastgelelik.**

> **Bir taahhüt, değerinizin taze bir rastgele sayıyla karıştırılmış parmak izidir:**
> `commitment = H(v, r)` burada `r` gizli, rastgele bir "blinding" değeridir.

Artık aynı `v`, her seferinde farklı görünen bir taahhüt üretir, çünkü `r` farklıdır. İstediğimiz iki özellik sonunda aynı anda sağlanır:

![alt text](image-17.png)

Taahhüdü daha sonra **açmak** (ifşa etmek) için `v` ve `r` değerlerini yayımlarsınız; herkes `H(v, r)` değerini yeniden hesaplayıp eşleştiğini kontrol eder. Böylece değere kilitlenmiş olursunuz. Makale 0'daki sihirli mühürlü zarfın gerçek karşılığı budur.

> **Sonsuza dek akılda tutulacak iki çıkarım:** *binding*, hash'in collision resistant olmasından gelir; *hiding* ise rastgele blinding faktörü `r`'den gelir.

---

## 4. Zarfı kurmanın iki yolu

İki yaygın tarif vardır ve Zcash ikisini de kullanır.

| | **Hash tabanlı taahhüt** | **Pedersen taahhüdü** (Makale 2'den) |
|---|---|---|
| Tarif | `H(v, r)` | `v.G + r.H` (bir eğri üzerindeki noktalar) |
| Hiding şuradan gelir | rastgele `r` | rastgele `r` |
| Binding şuradan gelir | collision resistance | eliptik eğri trapdoor'u (ECDLP) |
| Özel güç | basit ve hızlı | taahhütler **toplanabilir** (homomorphic) |

İşte son satır, Pedersen taahhütlerinin Zcash'te neden bu kadar önemli olduğunu açıklar. Çünkü `commit(v_1) + commit(v_2)`, geçerli bir `commit(v_1 + v_2)` olur; protokol daha sonra **giren paranın çıkan paraya eşit olduğunu** taahhütleri toplayarak, tek bir miktarı bile açıklamadan kanıtlayabilir. Bu gerçeği Makale 6 için şimdiden kenara koyuyoruz.

---

## 5. Zcash'in tamamını şekillendiren ince bir nokta: ZK-friendly hashing

İşte çoğu giriş yazısının kaçırdığı bir içgörü; tam da vurgulamaya değer olan "matematik mühendislikle buluşuyor" noktası budur.

SHA-256, gündelik hesaplama için mükemmel bir parmak izidir. Ama Zcash hash'leri sadece *hesaplamaz*; aynı zamanda **bir hash'in doğru hesaplandığını sıfır bilgi ispatının içinde kanıtlamak** zorundadır (nedenini Makale 5 açıklar). Ve işin püf noktası şudur: sıfır bilgi ispatı **sonlu alan aritmetiği** dilinde çalışır (Makale 1), oysa SHA-256 bit düzeyinde işlemlerden (kaydırmalar, AND'ler, XOR'lar) inşa edilmiştir. Tüm bu bit işlemlerini alan aritmetiği cinsinden ifade etmek aşırı pahalıdır; bu da ispatları devasa ve yavaş hale getirir.

Bu yüzden Zcash kriptografları, iç yapıları zaten *alan aritmetiği* olan hash fonksiyonları tasarladılar; böylece bunları ispatlamak ucuz olur:

![alt text](image-18.png)

Bu tek mühendislik baskısı, *"ispatlaması ucuz olmalı,"* Zcash'in her yerde SHA-256'ya uzanmak yerine özel hash fonksiyonları icat edip benimsemesinin nedenidir.

---

## 6. Bunun Zcash'teki yeri

Zcash, tasarımlarının farklı aşamalarında farklı hash'ler kullandı; her biri işe göre seçildi:

| Tasarım | Kullanılan hash'ler | Nerede |
|---|---|---|
| **Sprout** (en erken) | **SHA-256** | Note commitment'lar ve ağaç |
| **Sapling** | **Pedersen hash'leri**, ayrıca **BLAKE2** | Note commitment'lar ve Merkle ağacı için Pedersen; anahtar türetme ve nullifier'lar için BLAKE2 |
| **Orchard** (güncel) | **Sinsemilla**, ayrıca **Poseidon** | Note commitment'lar ve Merkle ağacı için Sinsemilla; nullifier için Poseidon; hepsi aritmetik devreler için tasarlandı |

Tanımanız gereken isimler **Pedersen** ve **Sinsemilla**'dır (eğri noktalarından inşa edilen, commitment tarzı hash'ler; bu yüzden "toplanabilir" süper gücünü miras alırlar ve ucuz biçimde ispatlanırlar) ve **Poseidon**'dır (özellikle sıfır bilgi devreleri için tasarlanmış bir alan aritmetiği hash'i). Makale 0, bir note'un içeriğinin bir taahhüde mühürlendiğini söylediğinde, mührü atan mekanizma *işte budur*.

Böylece Makale 0'dan açıkta kalan döngü, *"mühürlü bir zarf içeriğini nasıl gizleyebilir ama aynı zamanda taklit edilmesi imkânsız olabilir?"*, artık kapanmış oldu: **hiding rastgele bir blinding faktöründen, binding ise collision resistance ya da eğri trapdoor'undan gelir.**

---

## 7. Dürüst bir not

Açıklığı korumak için bazı şeyleri sadeleştirdik. Gerçek taahhüt şemaları, `v` ve `r`'nin tam olarak nasıl kodlandığını ve hangi generator'ların kullanıldığını belirtir; "hiding" ve "binding" kavramlarının her birinin hassas güvenlik tanımlarıyla farklı türleri vardır (perfect vs computational); ayrıca Pedersen, Sinsemilla veya Poseidon'un iç yapısını göstermedik. Bunların hiçbiri sezgiyi değiştirmez: taahhüt, şimdi gizleyen ve sonsuza dek bağlayan, rastgelelikle güçlendirilmiş bir parmak izidir. Ayrıntılar, protokol makalesi onlara ihtiyaç duyduğunda işaretlenmiş şekilde geri dönecek.

---

## 8. Özet

- Bir **hash fonksiyonu**, **veri için bir parmak izi**dir: deterministik, ileri yönde hızlı, tek yönlü, collision resistant'dır ve bir **avalanche effect**'e sahiptir (bir bit girer, tamamen farklı bir parmak izi çıkar).
- Bir **taahhüt**, **bir değeri şimdi herkesin önünde kilitlemenizi ve daha sonra onun hakkında yalan söyleyemeden açıklamanızı** sağlar.
- Sade bir parmak izi `H(v)` yayımlamak bağlar ama **gizlemez**. Rastgele bir blinding faktörü eklemek, yani `H(v, r)`, bunu düzeltir: **hiding `r`'den, binding collision resistance'tan gelir.**
- Zcash hem **hash tabanlı** hem de **Pedersen** taahhütleri kullanır; Pedersen taahhütleri ayrıca **toplanabilir**, bunu Makale 6 değer dengesini özel biçimde kanıtlamak için kullanacaktır.
- Hash'lerin sıfır bilgi ispatlarının içinde **ispatlanması** gerektiğinden, Zcash her yerde SHA-256 yerine alan aritmetiğinden inşa edilmiş **ZK-friendly** hash'ler (**Pedersen**, **Sinsemilla**, **Poseidon**) kullanır.

---

## Sözlük

| Terim | Sade anlamı |
|---|---|
| **Hash function** | Herhangi bir veriyi kısa, sabit boyutlu bir parmak izine (özet) indirger |
| **Digest** | Bir hash fonksiyonunun ürettiği çıktı parmak izi |
| **Preimage resistance** | Bir digest'ten onun girdisine geri dönülemez (tek yönlüdür) |
| **Collision resistance** | Aynı digest'e sahip iki girdi bulunamaz |
| **Avalanche effect** | Girdideki minicik bir değişiklik digest'i tamamen değiştirir |
| **Commitment** | Bir değeri şimdi kilitle, sonra açıkla, hakkında yalan söyleyeme |
| **Blinding factor (`r`)** | Bir taahhüdün gizlemesini sağlayan taze rastgele sayı |
| **ZK-friendly hash** | Alan aritmetiğinden inşa edildiği için ispatlaması ucuz olan hash |

---

## SSS

**Neden değeri taahhüt etmek yerine sadece şifrelemiyoruz?**
Şifreleme, *daha sonra çözebileceğiniz gizlilik* ile ilgilidir. Taahhüt ise *binding* ile ilgilidir: yani cevabınızı sonradan değiştiremeyeceğiniz garantisi. Farklı işler yaparlar.

**Taahhütler değeri gizliyorsa, kuralları herhangi biri nasıl kontrol ediyor?**
Bu, sıfır bilgi ispatlarının görevidir (Makale 5): gizli değerin kurallara uyduğunu, onu açığa çıkarmadan kanıtlarlar.

**Zcash bazı yerlerde SHA-256'dan kaçındığına göre SHA-256 bozuk mu?**
Hayır. SHA-256 gayet iyidir ve Zcash onu hâlâ kullanır. Sadece *bir devrenin içinde ispatlaması* pahalıdır; ZK-friendly hash'lerin var olma sebebi de bu özel iştir.

**Rastgele `r` nereden gelir ve onu kim saklar?**
Note oluşturulurken taze olarak üretilir ve note'un sahibi tarafından bilinir. Her note'u benzersiz ve özel yapan şeylerin bir parçasıdır.

---

### Sezginizi test edin

Seçim tahmininize `H(v, r)` olarak taahhüt ediyor ve bunu yayımlıyorsunuz. Bir arkadaşınız işin daha basit olması için sadece `H(v)` yayımlamanız gerektiğinde ısrar ediyor. Yalnızca iki olası sonuç varsa bunun neden kötü bir fikir olduğunu tek cümlede söyleyin. *(Yanıt aşağıda.)*

<details><summary>Yanıt</summary>

Yalnızca iki sonuç varsa arkadaşınız `H("kazanır")` ve `H("kaybeder")` değerlerini kendisi hesaplayıp yayımladığınız digest ile karşılaştırabilir ve böylece tahmininizi anında öğrenir. Sade hash bağlar ama gizlemez; bu tahmin et-ve-kontrol et saldırısını durduran şey rastgele `r`'dir.
</details>

---

### Sırada ne var

**Makale 4 . Merkle ağaçları:** artık elimizde üst üste biriken milyonlarca taahhüt var. Makale 4, Zcash'in bunları, küçücük kök parmak izi tüm geçmişi temsil eden tek bir ağaçta nasıl düzenlediğini ve hangisi olduğunu açıklamadan note'unuzun o ağaçta olduğunu nasıl kanıtlayabildiğinizi gösteriyor. Makale 0'daki "halka açık pano"nun gerçek şekli budur.

*ZecHub için hazırlanan* İlk İlkelerden Zcash *serisinin bir parçası. Lisans: CC BY-SA 4.0.*
