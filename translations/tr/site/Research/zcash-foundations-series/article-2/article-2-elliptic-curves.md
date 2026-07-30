# Eliptik Eğriler: Zcash'nin Anahtarlarının ve Taahhütlerinin Doğduğu Yer
##### [Annkkitaaa](https://github.com/Annkkitaaa)'dan Özgün Araştırma

![alternatif metin](image-10.png)

### Bir eğri üzerindeki noktalardan oluşturulmuş tek yönlü bir yol

> **Seri:** *İlk Prensiplerden Zcash* . **Makale 2 . Eliptik Eğriler**
> **Hedef kitle:** yeni başlayanlar. Yalnızca [Makale 1'i (sonlu alanlar)](article-1-finite-fields.md) varsayıyoruz: bir asal modunda etrafına sarılan aritmetik. Başka hiçbir arka plan bilgisi gerekmiyor.
> **Bu yazıdan elinizde kalacaklar:** eliptik eğrilerin sezgisel ve doğru bir resmi, onları kullanışlı kılan "tuzak kapı", ve Zcash'nin bunları anahtarlara ve taahhütlere tam olarak nasıl dönüştürdüğü.

[1](article-1-finite-fields.md) Makalesi bize aritmetik için mükemmel bir oyun alanı sundu: sonlu cisim. Ama bir cisim tek başına yalnızca sayılardan ibarettir. [0](article-0-shielded-transaction.md) Makalesi]'ndeki anahtarları ve "mühürlü zarfları" inşa etmek için Zcash'nin özel, tek yönlü bir zorluk türüne sahip bir nesneye ihtiyacı var: ileri yönde hesaplaması kolay, tersine çevirmesi ise pratikte imkânsız. Bu nesne bir **eliptik eğri**dir. Bu makale onu en temelden inşa ediyor; cebirden önce sezgi geliyor.

Kaynak Markdown parçası mesajda yer almıyor, bu yüzden çeviriyi üretemiyorum. Lütfen `---` satırından sonra çevrilecek Markdown FRAGMENT metnini yapıştırın; yalnızca Türkçe çeviriyi döndüreceğim.

## 1. Neden önemsemelisiniz?

Her gizlilik sistemi bir **tek yönlü caddeye** ihtiyaç duyar: ileri doğru gitmesi son derece kolay, geri doğru dönmesi ise pratikte imkânsız olan bir işlem.

İşte nedeni. **Gizli anahtarınız**, saklı tuttuğunuz bir sayıdır. **Açık anahtarınız** (ve adresiniz) ondan türetilir ve dünyaya gösterilir. Sistemin tüm güvenliği tek bir gerçeğe dayanır: *açık anahtar verildiğinde, hiç kimse geriye doğru gidip gizli anahtarınıza ulaşamaz.* Eğer ulaşabilselerdi, paranızı harcayabilirlerdi.

Öyleyse şöyle bir matematiksel işleme ihtiyacımız var:

- **ileri** gitmek (gizli -> herkese açık) hızlı ve kolaydır, ancak
- **geri** gitmek (herkese açık -> gizli) o kadar zordur ki, Dünya’daki tüm bilgisayarlar evrenin ömrü boyunca birlikte çalışsa bile bunu tamamlayamaz.

Sade sonlu cisim çarpımı yeterince iyi değildir; bölme işlemi onu anında geri alır (Zaten 1. Makale’nin bütün amacı buydu). Kolay bir "geri alma" düğmesi olmayan bir şeye ihtiyacımız var. Eliptik eğriler tam olarak bunu sağlar ve ayrıca, noktaları taahhütler oluşturmak için mükemmel olan bir şekilde birleşir. Nasıl olduğuna bakalım.

Çevrilecek Markdown parçası mesajda görünmüyor. Lütfen `---` işaretinden sonra çevrilecek metni yapıştırın.

## 2. Sezgi: noktalarını "toplayabildiğiniz" bir eğri

Kriptografiyi bir anlığına unutun. Bir **eliptik eğri**, sadece şu biçimdeki bir denklemi sağlayan `(x, y)` noktalarının kümesidir:

```
y^2 = x^3 + ax + b
```

Sıradan sayıların üzerinde, genellikle yuvarlak bir ilmek ve iki kuyruğa sahip, pürüzsüz ve kıvrımlı bir eğri gibi görünür:

![alternatif metin](image-14.png)]

Gerçekten şaşırtıcı olan kısım şu: **bu eğri üzerindeki iki noktayı "toplayarak" yine aynı eğri üzerinde üçüncü bir nokta elde edebilirsiniz.** Bu, koordinatların bildiğimiz anlamda toplanması değildir. Bu geometrik bir kuraldır ve söylemektense *görmek* daha kolaydır.

### Kiriş kuralı (iki farklı noktanın toplanması)

`P + Q` eklemek için:

1. `P` ile `Q` üzerinden düz bir çizgi çizin.
2. Bu çizgi, eğriyi tam olarak bir başka noktada daha keser. Bu noktaya `R*` deyin.
3. **`R*`’yi yatay eksene göre yansıtın.** Bu yansıma, cevap olan `P + Q`’dir.

![alternatif metin](image-11.png)

### Teğet kuralı (bir noktayı kendisine ekleme)

`P + P`’ı (`2P` olarak yazılır) hesaplamak için, içinden bir doğru geçireceğiniz ikinci bir nokta yoktur; bu yüzden onun yerine `P` noktasındaki **teğet** doğrusunu kullanır, ardından aynı “üçüncü kesişimi bul, sonra yansıt” yöntemini izlersiniz.

İşlemin tamamı bu. İki geometrik kural. Bunlarla, bir eliptik eğrinin noktaları matematikçilerin **grup** dediği şeyi oluşturur: iyi tanımlanmış bir "toplama"ya sahip bir küme. Hatta bir "sıfır"ı bile vardır.

### Sonsuzdaki nokta (eğrinin sıfırı)

Her sayı sisteminin bir `0`’si vardır; topladığınızda hiçbir şeyi değiştirmeyen şey. Eliptik bir eğri üzerinde bu rolü, **sonsuzdaki nokta** denilen ve `O` şeklinde yazılan özel bir ek nokta oynar. Bunu, “sonsuz derecede yukarıda”, dikey doğruların buluştuğu yer olarak düşünebilirsiniz. `O`’yi herhangi bir noktaya eklemek, onu hiç değiştirmez; tıpkı `0` eklemek gibi.

Lütfen çevrilecek Markdown parçasını gönderin.

## 3. Resimlerden sonlu bir cisme

Yukarıdaki düzgün eğri *sezgidir*. Ancak Zcash gerçek sayılar kullanmaz (Madde 1'de açıklandığı gibi, yuvarlarlar ve boyutu sızdırırlar). Bunun yerine, **sonlu bir cisim üzerindeki** bir eliptik eğri kullanır: aynı `y^2 = x^3 + ax + b` denklemi, ancak tüm aritmetik bir asal sayıya göre mod alınarak yapılır.

Bunu yaptığınızda, o güzel eğri **birbirinden kopuk noktaların saçılımına** dönüşür; denklemi `p` modunda sağlayan her `(x, y)` çifti için bir nokta vardır. Artık hiç eğri gibi görünmez. Ama işte kritik nokta şudur:

> **Kiriş-ve-teğet kuralının cebiri hâlâ kusursuz şekilde çalışır.** `P + Q`’yi geometrik olarak bulan aynı formüller, şimdi onu sonlu cisim aritmetiğiyle hesaplar. Noktalar hâlâ bir grup oluşturur ve aynı `0`’ye (sonsuzdaki nokta) sahiptir.

Bunu küçük, tamamen doğrulanmış bir örnekle somutlaştıralım.

### Tam bir eğri, tam olarak hesaplandı

`F_17` sonlu cismi üzerinde `y^2 = x^3 + 2x + 2`'yi ele alalım. Geçerli her noktayı hesapladığımızda tam olarak **18 nokta eder; sonsuzdaki noktayla birlikte toplam = 19.** Bunlardan birkaçı:

```
(0,6) (0,11) (3,1) (3,16) (5,1) (5,16) (6,3) (6,14) (7,6) (7,11) ...
```

Şimdi `G = (5, 1)` noktasını seçin ve onu sürekli kendisiyle toplayın. Ne olduğuna bakın (aşağıdaki her satır tahmin edilmedi, hesaplandı):

| Adım | Nokta | Adım | Nokta |
|---|---|---|---|
| `1G` | (5, 1) | `11G` | (13, 10) |
| `2G` | (6, 3) | `12G` | (0, 11) |
| `3G` | (10, 6) | `13G` | (16, 4) |
| `4G` | (3, 1) | `14G` | (9, 1) |
| `5G` | (9, 16) | `15G` | (3, 16) |
| `6G` | (16, 13) | `16G` | (10, 11) |
| `7G` | (0, 6) | `17G` | (6, 14) |
| `8G` | (13, 7) | `18G` | (5, 16) |
| `9G` | (7, 6) | `19G` | **O (sonsuzluk)** |
| `10G` | (7, 11) | | |

Dikkat edilmesi gereken iki şey:

- 19. adımda **tüm sonlu 18 noktayı ziyaret eder ve ardından `O`'ye ulaşır**, sonra da bunu sonsuza dek tekrar ederdi. Başlangıç noktası `G` tüm grubu "üretir", bu yüzden ona bir **üreteç** deriz.
- Bu, doğrulanmış bir gruptur: örneğin `1G + 2G = (5,1) + (6,3) = (10,6)`; bu da tam olarak `3G`'dir.  Toplama işlemi, bir grubun gerektirdiği gibi kendi içinde tutarlıdır.

I can’t translate it because the Markdown fragment was not included after the `---` separator.

Please paste the source fragment, and I’ll return only the Turkish translation.

## 4. Arka kapı: skaler çarpma

`1G, 2G, 3G, ...` tablosu her şeyin özüdür. Bir noktayı tekrar tekrar kendisine eklemeye **skaler çarpma** denir: `kG` noktası, "`G`'nin kendisine `k` kez eklenmiş hâli" anlamına gelir.

Şimdi sihirli kısım. İki yönü düşünün:

| Yön | Soru | Zorluk |
|---|---|---|
| **İleri** | `k` ve `G` verildiğinde, `kG` hesaplayın | **Kolay.** Astronomik derecede büyük `k` için bile, *double-and-add* adlı bir hile bunu birkaç yüz adımda başarır |
| **Geri** | `G` ve `kG` verildiğinde, `k` değerini geri elde edin | Gerçek bir kriptografik eğri üzerinde **fiilen imkânsızdır** |

Bu asimetri, 1. Bölümde ihtiyaç duyduğumuz **tek yönlü caddeydi**. Geriye dönük problem ("bu noktayı hangi `k` üretti?") **Eliptik Eğri Ayrık Logaritma Problemi (ECDLP)** olarak adlandırılır ve Zcash'in kullandığı eğrilerde, bilinen hiçbir yöntem bunu evrenin ısıl ölümünden önce çözemaz.

![alternatif metin](image-12.png)]

> Oyuncak `F_17` eğrimizde, yalnızca 19 noktası olduğu için `k`'i tablodan doğrudan okuyabilirdiniz. Gerçek eğrilerde yaklaşık `2^(255)` nokta vardır. Tabloda evrendeki atom sayısından daha fazla satır olurdu, bu yüzden "tablodan okuyup bulmak" bir seçenek değildir. Küçüklüğü, oyuncak eğriyi öğretilebilir kılan şeydir; aynı zamanda neden güvenli olmadığının da sebebidir.

I can’t translate yet because the Markdown fragment was not included after the `---` separator. Please paste the fragment, and I’ll return only the Turkish Markdown translation.

## 5. Anahtarlar nasıl doğar (asıl mesele)

Artık gerçek bir kriptografik anahtarı açıklamak için gereken her şeye sahibiz ve bu şaşırtıcı derecede basit:

> **Gizli bir sayı `k` seçin. `kG` noktasını yayınlayın. Hepsi bu kadar.**
> `k` sizin **özel anahtarınızdır**. `kG` sizin **açık anahtarınızdır**. Tek yönlü yol (ECDLP), hiç kimsenin `kG` değerinden geri gidip `k` değerine ulaşamayacağını garanti eder.

Bu tek fikir, *bir açık anahtarın sabit bir üreteç ile çarpılmış gizli bir skaler olması*, Zcash'nin harcama anahtarlarının, görüntüleme anahtarlarının ve adreslerinin tohumudur. Tam anahtar ağacı bunun üzerine daha fazla yapı katmanı ekler, ancak her dal bu kökten büyür.

### Bonus: eğri noktaları neden mükemmel taahhütler oluşturur

Madde 0’daki “mühürlü zarfı” (taahhüt) hatırlayın; içeriğini **gizlemesi** ama aynı zamanda **sahtecilik yapılamaz** olması gerekiyordu. Eliptik eğriler bize bunu oluşturmak için temiz bir yol sunar. İki sabit, herkese açık üreteç noktası `G` ve `H`, gizli bir değer `v` ve rastgele bir körleme sayısı `r` alın ve şunu oluşturun:

```
Commitment  =  v.G  +  r.H
```

Bu bir **Pedersen taahhüdüdür** ve istediğimiz her iki özelliğe de sahiptir:

- **Gizleme:** rastgele `r`, sonucu tüm eğri boyunca dağıtır; bu nedenle nokta, `v` hakkında hiçbir şey açığa çıkarmaz.
- **Bağlayıcılık:** ECDLP, aynı noktayı veren *farklı* bir `(v, r)` bulmayı uygulanamaz hâle getirir; bu yüzden neye taahhütte bulunduğunuz konusunda sonradan fikrinizi değiştiremezsiniz.

Daha sonra paha biçilmez olduğu ortaya çıkan ek bir özellik daha var: bu taahhütler **toplanabiliyor**. `v_1` için olan taahhüt ile `v_2` için olan taahhüdün toplamı, `v_1 + v_2` için geçerli bir taahhüttür. Bu "homomorfik" davranış sayesinde Zcash, daha sonra bir işleme *giren* paranın işlemden *çıkan* paraya eşit olduğunu, herhangi bir miktarı açığa vurmadan ispatlayabilecek. Bunun karşılığını yaklaşık 6. Makale civarında alacağız.

Markdown parçası sağlanmadı. Lütfen çevrilecek İngilizce Markdown içeriğini gönderin.

## 6. Bunun Zcash içindeki yeri

Parmak izleri somut ve doğrulanabilirdir.

| Zcash tasarımı | Kullandığı eğriler | Rolü |
|---|---|---|
| **Sapling** (eski) | **BLS12-381** artı **Jubjub** adlı gömülü bir eğri | BLS12-381 ispat sistemini taşır; Jubjub, BLS12-381'in skaler alanı üzerine kuruludur; böylece anahtar ve taahhüt işlemleri bir sıfır bilgi ispatının *içinde* gerçekleştirilirken düşük maliyetli olur |
| **Orchard** (güncel) | **Pallas** ve **Vesta** ("Pasta" döngüsü) | Pallas, Orchard'nin anahtarlarını ve taahhütlerini taşır; Pallas/Vesta eşleşmesi, gelişmiş ispatları verimli kılmak için özel olarak düzenlenmiştir |

Bir eğrinin neden başka bir eğrinin alanının içine "gömüldüğü" ve iki eğriden oluşan bir *döngü*nün neden faydalı olduğu gerçek ve önemli konulardır, ancak bunlar ispat sistemi makalelerine aittir. Şimdilik çıkarılacak sonuç nettir: **her Zcash anahtarı, bir üretecin skalerle çarpımıdır ve her Zcash taahhüdü, eğri noktalarının bir toplamıdır**; bunların her biri bu adlandırılmış eğrilerden biri üzerinde bulunur.

![alternatif metin](image-13.png)]

Lütfen çevirmemi istediğiniz Markdown parçasını gönderin.

## 7. Dürüst bir uyarı

Birkaç basitleştirme bunu okunabilir tuttu. **Kısa Weierstrass** formunu (`y^2 = x^3 + ax + b`) kullandık; Zcash'nin eğrileri genellikle verimlilik ve güvenlik için seçilen başka eşdeğer biçimlerde yazılır (Jubjub, *twisted Edwards* eğrisidir), ancak grup fikri aynıdır. Tam nokta-toplama formüllerini tanımlamadık (bunlar, "üçüncü kesişim, sonra yansıt" fikrinin cebirsel versiyonudur) ve eğri mertebesi, kofaktörler ve "pairing"ler gibi, ispat sistemi makalelerinde önemli hâle gelen incelikleri bir kenara bıraktık. Bunların hiçbiri sezgiyi değiştirmez; onu keskinleştirir.

The Markdown fragment to translate was not included after the `---` separator, so there is no source text to translate.

Please paste the English Markdown fragment, and I’ll return only the Turkish translation.

## 8. Özet

- Bir gizlilik sistemi bir **tek yönlü caddeye** ihtiyaç duyar: ileriye gitmek kolay, geriye dönmek ise pratikte imkânsız olmalı. Eliptik eğriler bunu sağlar.
- Bir **eliptik eğri**, `y^2 = x^3 + ax + b` koşulunu sağlayan noktaların kümesidir ve bu noktalar geometrik **kiriş-ve-teğet** kuralı ile **toplanabilir**; özel bir **sonsuzdaki nokta** da sıfır görevi görür.
- Bir **sonlu cisim** üzerinde eğri, dağınık noktalar kümesine dönüşür; ancak aynı toplama işlemi yine geçerlidir ve noktalar bir **grup** oluşturur. (Doğrulanmış örnek: `F_17` üzerinde `y^2 = x^3 + 2x + 2`’in 19 noktası vardır ve `G = (5,1)` bunların hepsini üretir.)
- **Skaler çarpım** `kG` hesaplaması kolaydır ama tersine çevrilmesi pratikte imkânsızdır: **ECDLP**. İşte tuzak kapı budur.
- **Anahtarlar:** özel anahtar `k`, açık anahtar `kG`. **Taahhütler:** Pedersen biçimi `v.G + r.H`; bu yapı gizler, bağlayıcıdır ve elverişli şekilde **toplanabilir**.
- **Zcash** içinde, Sapling **BLS12-381 + Jubjub** kullanır ve Orchard **Pallas/Vesta (Pasta)** eğrilerini kullanır; her anahtar ve taahhüt bunların üzerinde yer alır.

Lütfen çevrilecek Markdown parçasını gönderin.

## Sözlük

| Terim | Sade İngilizce anlamı |
|---|---|
| **Eliptik eğri** | `y^2 = x^3 + ax + b` koşulunu sağlayan noktalar ve noktaların özel bir "toplanması" |
| **Nokta toplama** | Kiriş-ve-teğet kuralı: iki noktadan geçen doğruyu çiz, üçüncü kesişimi al, yansıt |
| **Sonsuzdaki nokta (`O`)** | Eğrinin "sıfırı"; onu eklemek hiçbir şeyi değiştirmez |
| **Üreteç (`G`)** | Katları sonunda tüm grubu kapsayan bir taban nokta |
| **Skaler çarpma (`kG`)** | `G`'ü kendi kendine `k` kez eklemek; ileri yönde kolay, tersine çevirmesi zor |
| **ECDLP** | `kG`'den `k`'yi geri elde etmenin zor problemi; güvenliğin temeli |
| **Pedersen taahhüdü** | `v.G + r.H`; gizleyen, bağlayan ve toplanabilen mühürlü bir zarf |

Metin parçası sağlanmadığı için çeviri yapılamıyor. Lütfen çevrilecek İngilizce Markdown parçasını gönderin.

## SSS

**Neden sadece bir asal modunda büyük sayılar yerine eğriler kullanılıyor?**
Her ikisi de tek yönlü bir yol sağlayabilir, ancak eliptik eğriler aynı güvenliği çok daha küçük anahtarlarla ve daha hızlı işlemlerle sunar; ayrıca nokta aritmetiği taahhütler için idealdir.

**ECDLP'nin zor olduğu kanıtlandı mı?**
Bunun imkânsız olduğu *kanıtlanmış* değil, ancak onlarca yıllık yoğun çabaya rağmen iyi seçilmiş eğriler üzerinde etkin bir saldırı bulunamadı. Güvenlik, iyi test edilmiş bu varsayıma dayanır.

**Bunu bir kuantum bilgisayar bozabilir mi?**
Yeterince büyük bir kuantum bilgisayar ECDLP'yi bozabilir. Bu, sektör genelinde bilinen uzun vadeli bir endişe ve aktif bir araştırma alanıdır; günümüzde kullanılan eğriler klasik bilgisayarlara karşı hâlâ güvenlidir.

**Zcash neden birden fazla eğri kullanıyor?**
Farklı görevler için. Bir eğri, sıfır bilgi ispat sistemini taşır; bir diğeri ise (ilk eğrinin alanına gömülü olarak) ispat içindeki anahtar ve taahhüt işlemlerini verimli hâle getirir. Sonraki makaleler, bu eşleşmenin neden önemli olduğunu açıklar.

I can’t translate the fragment because none was provided after the `---` separator. Please paste the Markdown fragment to translate.

### Sezgilerini test et

Bölüm 3’teki doğrulanmış tabloyu kullanarak, oyuncak eğrimizde `9G + 10G` nedir? Peki cevap bize `G` hakkında ne söylüyor? *(Cevap aşağıda.)*

<details><summary>Yanıt</summary>

`9 + 10 = 19` ve `19G = O`’nin sonsuzdaki nokta olduğunu gördük. Dolayısıyla `9G + 10G = O`. Bu, `10G`’nin `9G`’nin **negatifi** (toplamsal tersi) olduğu anlamına gelir: “sıfır” noktasını veren iki nokta. Bir eğri üzerinde, bir noktanın negatifi sadece x-ekseni boyunca ayna görüntüsüdür ve gerçekten de `9G = (7,6)` ile `10G = (7,11)` aynı `x`’yi paylaşır ve `y` değerlerinin toplamı `17 = 0 (mod 17)` eder. Yapı tamamen tutarlıdır; “bu bir gruptur” ifadesinin güvence altına aldığı şey de tam olarak budur.
</details>

Çevrilecek Markdown parçası mesajınızda görünmüyor. Lütfen `---` satırının altına metni yapıştırın.

### Sırada ne var

**Makale 3 . Hashleme ve taahhütler:** "sihirli mühürlü zarfı" şimdi düzgünce açacağız. Artık eğri noktalarından bir taahhüt oluşturmanın bir yolunu gördünüz; sırada gizleme ve bağlayıcılığın gerçekten ne anlama geldiğini sormak, hash fonksiyonlarıyla tanışmak ve her Zcash ödemesini sabitleyen note taahhütleriyle ikisini de ilişkilendirmek var.

*İlk İlkelerden* Zcash serisinin [ZecHub](https://zechub.org)](ZecHub](https://zechub.org)) için bir parçası. CC BY-SA 4.0 lisanslı.