# Sonlu Alanlar: Kriptografinin İçinde Yaşadığı Sayı Sistemi
##### [Annkkitaaa](https://github.com/Annkkitaaa) tarafından özgün araştırma

![alt text](image-5.png)

### “Etrafında dönüp başa sarma” neden Zcash’in gizli temelidir

> **Seri:** *İlk Prensiplerden Zcash* . **Makale 1 . Sonlu Alanlar**
> **Hedef kitle:** yeni başlayanlar. Yalnızca okulda öğrendiğimiz temel aritmetiği (toplama, çarpma, bölme) varsayıyoruz. Önceden kriptografi ya da ileri matematik bilgisi gerekmiyor.
> **Bu yazıdan kazanacağınız şey:** sonlu alanların ne olduğuna dair sezgisel ve doğru bir anlayış, kriptografların neden onları kullandığı ve Zcash’in içinde nerelerde ortaya çıktıkları.

[Makale 0](article-0-shielded-transaction.md)’da beş karakterle tanıştık: note, commitment, note commitment tree, nullifier ve zero-knowledge proof. Ortada açıkta kalan bir soru bırakmıştık: *bütün bu anahtarlar ve gizli tarifler aslında nereden geliyor?* Cevap: sayılardan. Ama çocukluğunuzdan beri bildiğiniz sıradan sayılardan değil. Onlar, **sonlu alan** adı verilen özel ve kendi içine kapalı bir sayı sisteminden geliyor; Zcash’teki kriptografinin neredeyse her parçası bunun üzerine inşa ediliyor.

Bu yazı o fikri adım adım kazandırıyor. Söz verdiğimiz gibi, önce sezgi. Formüller ise ancak gerçekten işe yaradıklarında gelecek.

---

## 1. Neden bunu önemsemelisiniz?

Sıradan sayıların kriptografi açısından bir sorunu vardır: sonsuz tanedirler ve bilgi sızdırırlar.

Bir sayı *büyüdüğünde* ne olduğuna düşünün. Eğer size gizli bir hesabın sonucunun `8,142,067` olduğunu söylersem, zaten epey şey bilirsiniz: yedi basamaklıdır, tektir, “oldukça büyüktür”. Büyüklük bir ipucudur. Ve ipuçları, bir gizlilik sisteminin vermeyi göze alamayacağı şeylerin tam kendisidir.

Kriptografi öyle bir sayı sistemi ister ki:

- **sonlu sayıda** değer olsun; böylece bilgisayar bunların herhangi birini yuvarlama ve taşma olmadan tam olarak saklayabilsin,
- değerler **büyüklüklerini ele vermesin**, çünkü sistemin “daha büyük” diye gerçek bir kavramı olmasın,
- yine de **serbestçe ve tersine çevrilebilir biçimde toplama, çıkarma, çarpma ve bölme** yapılabilsin; çünkü kriptografik tariflerin çalışması için gerçek cebir gerekir, ve
- bu uzay **akıl almaz derecede büyük** yapılabilsin; böylece tahmin etmek umutsuz hale gelsin.

Bu istek listesinin bir adı var: **sonlu alan**. Tek bir sembol yazmadan önce bunun sezgisini birlikte kuralım.

---

## 2. Sezgi: bir saat

Aslında her gün bir sonlu alan kullanıyorsunuz. Duvarınızdaki saat.

12 saatlik bir saatte sayılar *başa sarar*. Saat 10’dan başlayıp 5 saat eklerseniz “15”e değil, **3**’e ulaşırsınız. Saatin yalnızca on iki konumu vardır; tepeyi geçince sayım sadece başa döner.

![alt text](image-9.png)

Az önce bu yazının asıl meselesi olan üç şey oldu:

1. **Dünya sonludur.** Ne kadar uzun sayarsanız sayın, tam olarak on iki konum vardır.
2. **Toplama hâlâ çalışır.** Bütün gün saat ekleyebilirsiniz; her zaman geçerli bir saat konumuna varırsınız.
3. **Büyüklük önemini yitirdi.** “Saat 3”, 3 saat mi, 15 saat mi, 27 saat mi saydığınızı söylemez. Başa sarma işlemi *büyüklük bilgisini sildi.* Tam da istediğimiz, gizlilik dostu özellik budur.

Bu başa saran aritmetiğin resmî adı **modüler aritmetik**tir. Saat, “modulo 12”, yani **mod 12** ile çalışır. Matematikçiler konumları 0’dan başlatmayı tercih eder; dolayısıyla “mod 12 bir saat” aslında `0, 1, 2, ..., 11` konumlarına sahiptir. Mod 7 bir saat ise `0` ile `6` arasındaki konumlara sahip olurdu.

> **Tek kural:** “mod p” herhangi bir işlem hesaplanırken, normal aritmetiği yapın; sonra sonucu `p`’ye bölün ve yalnızca kalanı tutun.
> Mod 7 örneği: `5 + 4 = 9`, ve `9`, `7`’ye bölündüğünde kalan `2` olur; dolayısıyla `5 + 4 = 2 (mod 7)`.

---

## 3. Saatten alana

Bir saat toplamaya izin verir. **Alan** ise bunun yükseltilmiş hâlidir: bölme gibi zor olan işlem de dahil, dört işlemin tamamının düzgün davrandığı bir sayı sistemi.

Gayriresmî olarak bir **alan**, **toplayabildiğiniz, çıkarabildiğiniz, çarpabildiğiniz ve bölebildiğiniz** (sıfır hariç her şeye bölebildiğiniz) herhangi bir “sayı” kümesidir; ayrıca bildiğiniz bütün kurallar da geçerlidir: toplama ve çarpmada sıra önemli değildir, parantezler yeniden gruplanabilir, bir `0` ve bir `1` vardır ve her sayının bir negatifi, ayrıca (`0` hariç) bir de çarpmaya göre tersi vardır.

Rasyonel sayılar bir alandır. Gerçel sayılar bir alandır. Bizim istediğimiz şey ise *sonlu* bir alan.

İşte ana fikir ve gerçekten çok güzeldir:

> **`0, 1, ..., p-1` tam sayılarının tamamını alın ve bütün aritmetiği mod `p` yapın. Eğer `p` asal bir sayıysa, sonuç bir sonlu alandır.** Bunu `F_p` diye yazarız (“F alt p” diye okunur).

Yani `F_7 = {0, 1, 2, 3, 4, 5, 6}` kümesi, mod 7 saat tarzı aritmetikle, gerçekten bir sonlu alandır. Şimdi onun nasıl “nefes aldığını” görelim.

### F_7 içinde çarpma (doğrulandı)

Her hücre `(satır x sütun) mod 7`’dir:

| x | 0 | 1 | 2 | 3 | 4 | 5 | 6 |
|---|---|---|---|---|---|---|---|
| **0** | 0 | 0 | 0 | 0 | 0 | 0 | 0 |
| **1** | 0 | 1 | 2 | 3 | 4 | 5 | 6 |
| **2** | 0 | 2 | 4 | 6 | 1 | 3 | 5 |
| **3** | 0 | 3 | 6 | 2 | 5 | 1 | 4 |
| **4** | 0 | 4 | 1 | 5 | 2 | 6 | 3 |
| **5** | 0 | 5 | 3 | 1 | 6 | 4 | 2 |
| **6** | 0 | 6 | 5 | 4 | 3 | 2 | 1 |

`1` ile `6` arasındaki satırlara bakın: her biri sıfır dışındaki `1..6` değerlerinin her birini tam bir kez içeriyor. Bu “tekrar yok, eksik yok” örüntüsü, bir alanın gözle görülür parmak izidir.

### Bölme: asal gerektiren sihir

Bölme aslında sadece “çarpımsal ters ile çarpma”dır. `F_7` içinde bir `a` sayısının karşılığı olan reciprocal ya da **inverse**, `a x a^(-1) = 1` olacak şekilde `a^(-1)` değeridir. Bunları doğrudan tablodan okuyabiliriz:

| `a` | 1 | 2 | 3 | 4 | 5 | 6 |
|---|---|---|---|---|---|---|
| `a⁻¹` | 1 | 4 | 5 | 2 | 3 | 6 |

Birini kontrol edelim: `2 x 4 = 8 = 1 (mod 7)`. Yani `F_7` içinde “2’ye bölmek”, “4 ile çarpmak” demektir. Sıfır dışındaki her elemanın bir eşi vardır. **İşte `F_7`’yi alan yapan şey budur.**

---

## 4. Modül neden asal olmak zorunda?

Bu, yazının en önemli fikri; o yüzden soyut anlatmak yerine somutlaştıralım.

Mod `6` ile bir “alan” kurmaya kalktığımızda neyin bozulduğunu görelim (`6` *asal değildir*):

> `2 x x = 1 (mod 6)` olacak herhangi bir `x` var mı? Hepsini kontrol edelim: `2x0=0, 2x1=2, 2x2=4, 2x3=0, 2x4=2, 2x5=4`. **`1` cevabı hiç ortaya çıkmıyor.** Demek ki `2`’nin mod 6’da bir tersi yok. Daha da kötüsü, `2 x 3 = 6 = 0 (mod 6)`: sıfır olmayan iki sayı çarpılıp sıfır verdi.

İkinci cümle aritmetik açısından bir felakettir. Sıfır olmayan iki şeyin çarpılıp sıfır vermesi (**zero divisor** denir) bölmenin bozulduğu anlamına gelir; bölmenin bozuk olduğu bir sistem de alan değildir. Bu tam olarak `6 = 2 x 3` şeklinde çarpanlara ayrılabildiği için olur.

Asal sayı, tanımı gereği, böyle çarpanlara sahip değildir. Dolayısıyla asal modül altında zero divisor ortaya çıkmaz, sıfır dışındaki her elemanın düzgün bir tersi olur ve yapı gerçek bir alan haline gelir.

![alt text](image-8.png)

> **Yazılarınız için tekrar kullanılabilir tek satır:** *asal modül girer, temiz bölme çıkar.*

---

## 5. Tanışmaya değer tek formül: bilgisayarlar tersleri nasıl bulur?

`F_7` için tersleri tablodan okuduk; ama Zcash’in asal sayısı yüzlerce basamak uzunluğunda, dolayısıyla tablo yapmak imkânsız. Bunun için klasik bir kısa yol var ve bu yazıdaki tek formül bu.

**Fermat'ın Küçük Teoremi**, asal `p` ve sıfır olmayan herhangi bir `a` için şunu söyler:

```
a^(p-1) = 1   (mod p)
```

Bunu yeniden düzenlerseniz (`a`’nın bir çarpanını ayırırsanız), ters kendiliğinden çıkar:

```
a^(-1) = a^(p-2)   (mod p)
```

Bunu `F_7` içinde deneyelim (`p = 7`, yani `p - 2 = 5`): `2`’nin tersi `2^5 = 32 = 4 (mod 7)` olmalı. Gerçekten de tablomuz `2^(-1) = 4` demişti. Bilgisayarlar büyük üsleri son derece hızlı hesaplayabildiği için bu yöntem, “çarpımsal tersi bul” işini devasa asallar için bile hızlı ve tam bir hesaplamaya dönüştürür.

Bunu ezberlemeniz gerekmiyor. Bilmeniz gereken şey şu: **sonlu alanda bölme hızlı ve tam bir işlemdir**; kriptografların onun üzerine inşa yapmaktan memnun olmasının nedeni de tam olarak budur.

---

## 6. Kriptografi neden sonlu alanlara âşık oldu?

Sezgiyi bir araya getirdiğimizde, bütün gerekçe tek tabloda şöyle özetlenebilir.

| `F_p` özelliği | Bir gizlilik sisteminin bunu isteme nedeni |
|---|---|
| **Sonlu** | Bilgisayar herhangi bir elemanı tam olarak saklar; yuvarlama yok, taşma yok, floating-point bulanıklığı yok |
| **Başa sarma** | “Büyüklüğü” siler; dolayısıyla bir değer nasıl üretildiğine dair hiçbir şey sızdırmaz |
| **Dört işlemin tamamı çalışır** | Kriptografik tarifler (anahtarlar, commitments, proofs) yalnızca sayma değil, gerçek cebir gerektirir |
| **Seçilebilir boyut** | 255-bit ya da 381-bit bir asal seçildiğinde alan, gözlemlenebilir evrendeki atom sayısından daha fazla elemana sahip olur; tahmin etmek umutsuzdur |
| **Tam ve deterministik** | Aynı şeyi hesaplayan iki dürüst taraf her zaman aynı sonucu elde eder; proofs buna dayanır |

Bir sonlu alan, tek cümleyle, **aritmetik için kusursuz biçimde kapalı, kusursuz biçimde kesin ve kusursuz biçimde devasa bir oyun alanıdır.** Zcash’teki diğer her şey, bu alanın içinde oynayarak inşa edilir.

---

## 7. Bunun Zcash içindeki yeri

“Zcash sonlu alanlar kullanır” sözünü körü körüne kabul etmek zorunda değilsiniz. İşte somut harita (daha derin mekanikler sonraki yazılara kalacak; buradaki amaç yalnızca izlerin gerçek olduğunu göstermek).

- **Sapling** (eski bir shielded tasarım), proof’larını **BLS12-381** adlı bir eğri üzerinde kurar; bu eğrinin temel alanı **381 bit** uzunluğunda bir asal kullanır. Her koordinat, anahtar ve proof elemanı bu asal üzerine kurulu bir sonlu alanın elemanıdır.
- **Orchard** (mevcut shielded tasarım), **Pallas ve Vesta** adlı bir eğri çifti kullanır (birlikte “Pasta” eğrileri diye anılır); bunların alanları yaklaşık **255 bit** uzunluğunda asallar kullanır.
- Makale 0’daki **note commitment**, **nullifier** ve bir **zero-knowledge proof** içindeki sayılar, en temelde, bu sonlu alanlardan birinin elemanlarıdır. Protokol “bu commitment’ı hesapla” dediğinde, aslında “o asala göre bu aritmetiği yap” demektedir.

![alt text](image-7.png)

Yani Makale 0’daki açık sorunun, *“gizli tarifler nereden geliyor?”* sorusunun cevabı burada başlıyor: **her şey sonlu alandaki aritmetik olarak başlar.** Bir sonraki yazıda bu alanı alıp anahtarlar ve commitments haline gelen gerçek nesneleri, yani bir eliptik eğri üzerindeki noktaları inşa edeceğiz.

---

## 8. Dürüst bir not

Yeni başlayanlar için dostane kalmak adına birkaç doğru şeyi sadeleştirdik. Sonlu alanlar yalnızca `F_p` biçiminde gelmez; `p^n` elemanlı alanlar da kurulabilir (bunlara **extension fields** denir) ve bunlar, Sapling’in proof sisteminin dayandığı “pairings” açısından önemlidir. Ayrıca alan aksiyomlarının tam listesini atladık ve bu büyüklükteki asalların nasıl seçilip doğrulandığını da ayrıntıya girmeden geçtik. Bunların hiçbiri artık sahip olduğunuz sezgiyi değiştirmez; sadece onu daha rafine hale getirir. Sonraki bir yazı buna ihtiyaç duyduğunda, gerekli hassasiyeti işaretleyerek geri ekleyeceğiz.

---

## 9. Özet

- Kriptografi, **sonlu, kesin, büyüklüğe kör, tamamen terslenebilir ve devasa** bir sayı sistemine ihtiyaç duyar. Bu sistem **sonlu alan**dır.
- Sezgi bir **saat**tir: **başa saran** aritmetik (modüler aritmetik); bu da bir sayının “büyüklüğünü” kullanışlı biçimde siler.
- `0..p-1` sayılarıyla **asal** `p` modunda aritmetik yapmak, gerçek bir alan olan `F_p` verir; burada **bölme** de yapılabilir, çünkü sıfır dışındaki her elemanın bir tersi vardır.
- Modül **asal olmak zorundadır**: bileşik bir modül zero divisor üretir (`2 x 3 = 0 mod 6` gibi) ve bölmeyi bozar.
- Bilgisayarlar tersleri **Fermat'ın Küçük Teoremi** ile hızlıca bulur (`a^(-1) = a^(p-2)`).
- **Zcash** içinde her anahtar, commitment, nullifier ve proof elemanı nihayetinde büyük bir sonlu alanın elemanıdır (Orchard için 255-bit Pasta alanları, Sapling’in BLS12-381’i için 381-bit alan).

---

## Sözlük

| Terim | Sade anlamı |
|---|---|
| **Modüler aritmetik** | Sabit bir değere ulaştıktan sonra başa saran aritmetik; saat gibi |
| **mod p** | “`p`’ye böl ve kalanı tut” |
| **Alan** | Toplama, çıkarma, çarpma ve bölmenin hepsinin çalıştığı bir sayı sistemi |
| **Sonlu alan `F_p`** | `0..p-1` sayıları üzerinde, asal `p` modunda yapılan aritmetik |
| **Inverse (reciprocal)** | `a x a^(-1) = 1` olacak `a^(-1)` elemanı; “`a`’ya bölmek”, onunla çarpmak demektir |
| **Zero divisor** | Çarpımları sıfır olan iki sıfır-dışı değer; bileşik modülleri bozan şey |
| **Asal** | 1’den büyük olup 1 ve kendisi dışında çarpanı olmayan tam sayı |

---

## SSS

**Neden sıradan tam sayıları ya da ondalıkları kullanmıyoruz?**
Ondalıklar yuvarlanır ve kayar; tam sayılar ise sınırsız büyür ve büyüklük sızdırır. Sonlu alanlar tamdır, sınırlıdır ve büyüklüğe kördür; kriptografi de tam olarak bunu ister.

**“Başa sarma” bilgi kaybı mı yaratır?**
Evet, bilerek. Ara değerlerin büyüklüğünü silmek gizlilik açısından bir özellik, bir hata değil.

**Daha büyük bir asal her zaman daha mı güvenlidir?**
Kabaca, daha büyük bir alan daha fazla olası değer ve daha zor tahmin anlamına gelir; ama güvenlik yalnızca alan boyutuna değil, bütün yapıya bağlıdır. Sonraki yazılar bunu daha kesin hale getirecek.

**Zcash neden özellikle bu asalları (255-bit, 381-bit) kullanıyor?**
Bunlar, üzerlerine kurulan eğrilerin proof sistemi için doğru yapıya ve verimliliğe sahip olması için seçilir. Bu “doğru yapı” konusu, sonraki iki yazının konusudur.

---

### Sezginizi test edin

`F_7` içinde `5 - 6` nedir? (Unutmayın: başa sararak `{0,...,6}` kümesinin içinde kalın.) *(Cevap aşağıda.)*

<details><summary>Cevap</summary>

`5 - 6 = -1`, ve `-1`, `F_7` içine sarıldığında `6` olur (çünkü `6 + 1 = 7 = 0`). Dolayısıyla `5 - 6 = 6 (mod 7)`. Çıkarma asla alanın dışına çıkmaz; sadece ters yönde sarar.
</details>

---

### Sırada ne var

**Makale 2 . Eliptik eğriler:** az önce kurduğumuz sonlu alanı alacağız ve onu, noktaları kendi aralarında “toplanabilen” tuhaf bir eğri türü çizmek için kullanacağız. Bu noktalar Zcash’in anahtarlarına ve commitments’larına dönüşecek; ayrıca tüm gizlilik sistemini mümkün kılan tek yönlü bir tuzak kapıyı gizleyecekler. Her zamanki gibi önce sezgi.

*İlk Prensiplerden Zcash* serisinin [ZecHub](https://zechub.org) için bir parçası. CC BY-SA 4.0 lisanslıdır.
