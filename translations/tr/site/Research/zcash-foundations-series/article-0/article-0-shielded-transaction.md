# Korumalı Bir Zcash İşlemi Aslında Nasıl Çalışır?
##### [Annkkitaaa](https://github.com/Annkkitaaa) tarafından yapılan özgün araştırma

![alt text](image.png)

### Matematikten önce sezgi: özel ödemelerin formülsüz bir anlatımı

> **Seri:** *Zcash from First Principles* . **Makale 0 . Çapa**
> **Hedef kitle:** tamamen yeni başlayanlar. Kriptografi, blockchain geçmişi ve matematik bilgisi gerektirmez.
> **Bu yazıdan elinizde kalacak olan:** Zcash'in *kimin kime ne kadar ödediğini* nasıl gizlediğine, buna rağmen tüm dünyanın hiçbir paranın sahte olarak üretilmediğini ya da iki kez harcanmadığını doğrulayabilmesine dair doğru bir zihinsel model.

Bu serideki sonraki her makale, birazdan tanışacağınız makinenin tek bir parçasına yakından bakacak. O yüzden buradaki bir kelime size biraz muğlak gelirse, *güzel*. Bu, ona geri dönüp hakkını vererek açıklayacağımıza dair bir söz.

---

## 1. Neden bunu önemsemelisiniz?

Banka ekstrenizin kasaba meydanındaki bir duvara çivilendiğini hayal edin. Sonsuza kadar. Herkes (ev sahibiniz, işvereniniz, bir yabancı, gelecekteki bir işveren, bir hükümet) her kira ödemenizi, her sağlık faturanızı, her bağışınızı, her kahvenizi görebilir; parayı tam olarak kime gönderdiğinizi ve size kimin gönderdiğini izleyebilir.

Bu, distopik bir varsayım değil. **Bitcoin kabaca böyle çalışır.**

Bitcoin'e sık sık "anonim" denir, ama öyle değildir. O *takma adlıdır*: adınız defterde yazmaz, ama her işlem, tutar ve adresler arasındaki her bağlantı herkese açıktır ve kalıcıdır. "Chain analysis" denen tüm alan, o ince takma adı söküp adresleri gerçek insanlarla eşleştirmek için vardır. Adreslerinizden biri sizinle ilişkilendirildiği anda, finansal geçmişiniz çözülmeye başlar.

Zcash aldatıcı derecede zor bir soruya cevap vermek için inşa edildi:

> **Göndereni, alıcıyı ve tutarı gizlerken, yine de kurallara uyulduğunu herkesin doğrulayabildiği tamamen özel bir para sistemine sahip olabilir miyiz?**

Bu iki hedef birbiriyle çatışır. Açık bir defter doğrulanabilirdir *çünkü* herkes onu görebilir. Gizlilik ise kimsenin görememesi demektir. Öyleyse kamu, bakmasına izin verilmeyen bir şeyi nasıl doğrulayabilir?

Bu paradoksu çözmek, bu serinin bütün hikâyesidir. Hadi başlayalım.

---

## 2. Zcash'in içinde iki dünya vardır

Her şeyden önce, yaygın bir yanlış kanıyı düzeltelim: **Zcash "özel coin" değildir. Gizliliği bir seçenek olarak sunan bir coindir.** Aslında hayata Bitcoin'in bir fork'u olarak başladı ve aynı blockchain üzerinde iki paralel sistem taşır.

| | **Şeffaf dünya** | **Korumalı dünya** |
|---|---|---|
| Gizlilik | Herkese açık, tıpkı Bitcoin gibi | Özel |
| Adresler şununla başlar | `t...` | `z...` veya `u...` |
| Gönderen / alıcı / tutar | **Herkes tarafından görülebilir** | **Herkesten gizlidir** |
| Temel teknoloji | Bitcoin tarzı açık defter | Kriptografik taahhütler + sıfır bilgi ispatları |

Para bu iki dünya arasında gidip bile gelebilir: fonları korumalı dünyaya taşımaya *shielding*, tekrar dışarı çıkarmaya ise *deshielding* denir.

Şeffaf dünya, "zaten kabaca anladığınız Bitcoin"dir. Bütün o güzel kriptografinin bulunduğu yer **korumalı dünya**dır ve bu seri yalnızca onunla ilgilenir.

![alt text](image-1.png)

---

## 3. Sezgi: herkese açık bir panodaki mühürlü zarflar

İşte makalenin geri kalanında taşımanız gereken tek zihinsel resim bu. Ona sürekli geri döneceğiz.

Dünyadaki herkesin her an görebildiği devasa bir **kamusal ilan panosu** hayal edin.

* **Para almak**, birinin panoya **mühürlü, opak bir zarf** iliştirmesi demektir. Zarfın içinde *ne kadar para olduğu* ve *yalnızca alıcının okuyabileceği bir sır* vardır; çünkü zarf o alıcının kişisel anahtarına kilitlenmiştir. Bütün dünya sadece *bir zarfın ortaya çıktığını* görür. Sahibi dışında hiç kimse içinde ne olduğunu göremez.

* **Pano sadece büyür.** Zarflar asla sökülmez ya da silinmez. Yenileri üstüne iliştirilir, sonsuza kadar.

* **Para harcamak**, bir perdenin arkasına geçip *"Bu panodaki harcanmamış zarflardan birine sahibim ve onu açmaya yetkim var"* diye ispat etmek, ardından herkesin görebildiği bir "harcanmış" kutusuna benzersiz bir **iptal jetonu** bırakmak ve ödeme yaptığınız kişiler için **yeni zarflar** iliştirmek demektir.

İşte o küçük ritüel (iptal jetonu bırakmak, yeni zarflar iliştirmek, hepsi bir perdenin arkasından) bir Zcash ödemesidir. Geri kalan her şey ayrıntıdır.

Şimdi bu sahne malzemelerine gerçek adlarını verelim.

---

## 4. Beş isim

Bu beş terim, korumalı Zcash'in bütün söz varlığıdır. Onları bir *hikâye* olarak öğrenin, sözlük gibi değil; o zaman akılda kalırlar.

| Hikâyedeki karşılığı | Gerçek Zcash terimi | Aslında ne olduğu |
|---|---|---|
| Zarfın içeriği (tutar + sahip + bir sır) | **Note** | Özel "coin": birine ait bir değer parçası |
| Panodaki mühürlü, opak zarf | **Note commitment** | İçindekini gizlerken bir zarfın var olduğunu kanıtlayan kriptografik mühür |
| İlan panosunun kendisi | **Note commitment tree** | *Şimdiye kadar oluşturulmuş her note'un* yalnızca eklenebilen kaydı |
| "Harcanmış" kutusundaki iptal jetonu | **Nullifier** | "Bu note artık harcandı" anlamına gelen benzersiz işaret |
| "Perdenin arkasındaki" sihir | **Zero-knowledge proof** | Harcamanın tamamının geçerli olduğunu, hiçbirini ifşa etmeden kanıtlayan ispat |

Bu makaleden başka hiçbir şey hatırlamazsanız, bu tabloyu hatırlayın. Bundan sonra gelen her şey, sadece her parçanın neden bu şekilde olmak zorunda olduğudur.

---

## 5. Her parçanın neden böyle şekillendiği

Burası çoğu açıklayıcının atladığı kısımdır ve "birkaç kelime ezberledim" ile "tasarımı anlıyorum" arasındaki farkı tam da bu bölüm yaratır. Bu beş parçanın her biri **tek bir spesifik sorunu** çözmek için vardır.

### Note commitment: içeriği gizle, ama sahteciliği imkânsız kıl

Sıradan bir zarf buharla açılabilir. Kriptografik bir **note commitment** açılamaz. Onu, iki süper güce sahip *sihirli* bir şekilde mühürlenmiş, tamamen opak bir zarf gibi düşünün:

- **Gizleme**: mühürlü zarfa bakmak, içindeki tutar ya da sahip hakkında size *hiçbir şey* söylemez.
- **Bağlayıcılık**: bir kez mühürlendikten sonra, içeriği değiştirilemez. Sonradan zarfın farklı bir tutar içerdiğini iddia edemezsiniz.

Bir mühür aynı anda bunu nasıl yapabilir? Bu gerçek ve cevaplanabilir bir sorudur. Bunun konusu **Makale 3 (taahhütler)**. Şimdilik zarfın sihirli olduğunu kabul edin ve devam edin.

### Nullifier: gerçekten zekice olan kısım

Bir note'u harcadığınızda onun **nullifier**'ını, yani "iptal jetonunu" yayımlarsınız. Bu jeton *note'un kendisinden* **ve** *gizli anahtarınızdan* hesaplanır. Bu tarif size aynı anda üç özellik kazandırır ve her biri önemlidir:

1. **Onu sadece sahibi oluşturabilir.** Hesaplamak için gizli anahtar gerekir; dolayısıyla kimse sizin note'larınızı sizin yerinize harcayamaz.
2. **Belirli bir note için her zaman *aynı* jetondur.** Aynı note'u iki kez harcamaya kalkarsanız, her iki seferde de *aynı* iptal jetonunu üretirsiniz ve kamusal "harcanmış" kutusu onu zaten içeriyor olur. Çifte harcama reddedilir.
3. **Kimse onu geldiği zarfa kadar izleyemez.** İptal jetonu, geldiği zarftan tamamen alakasız görünür.

Bu üçüncü özellik, **Zcash gizliliğinin kalbidir** ve aşağıda kendi bölümünü hak eder.

### Zero-knowledge proof: perdenin kendisi

Her şey bir perdenin arkasında olur ve sonrasında dünyaya sunduğunuz şey bir **zero-knowledge proof**, yani sahteciliği yapılamayan bir tür sertifikadır. Bu ispat, aynı anda sessizce şunların hepsini tasdik eder:

- *harcadığım zarf gerçekten panoya iliştirilmiş* (gerçek, var olan bir note),
- *onu açmaya gerçekten yetkim var* (doğru anahtara sahibim),
- *iptal jetonum doğru hesaplanmış* (çifte harcama kontrolünde hile yok),
- *yeni zarflarım eskisi kadar para içeriyor*: **yoktan para yaratılmadı.**

Mucize şu ki, ispat bunların **hiçbirini** açığa vurmaz. Ne tutarı, ne adresleri, ne de hangi zarf olduğunu. Sizi sadece *yukarıdaki her ifadenin doğru olduğuna* ikna eder. Bunun nasıl mümkün olduğu ise serinin doruk noktası olan **Makale 5 (sıfır bilgi ispatları)** konusudur.

---

## 6. Tek bir note'un yaşamı

Bir note *doğar*, panoda *yaşar* ve sonunda *ölür*; kritik nokta ise onun doğumu ile ölümü, dışarıdan bakan herkes için birbirinden bağımsız görünür.

![alt text](image-2.png)

---

## 7. Baştan sona bir ödeme

Şimdi Alice'in Bob'a ödeme yapışını izleyelim; herkese açık ve gizli her adımı etiketlenmiş olarak.

![alt text](image-4.png)

Gizliliği mümkün kılan asimetriye dikkat edin:

- **Alice'in eski note'u**, harcanmış kutusundaki bir *nullifier* ile ölür.
- **Bob'un yeni note'u**, panodaki yeni bir *commitment* ile doğar.
- İzleyen herkes için bu iki olay arasında **görünür hiçbir bağlantı yoktur.** Paranın izi burada soğur.

> **Bob kendisine ödeme yapıldığını nasıl anlıyor?** Note'u *onun anahtarına* şifrelenmiştir. Panoyu sürekli tarar ve yalnızca *onun* zarfları onun için açılır; sanki belirli bir kilit kümesine uyan tek anahtara sahipmiş gibi. Bunun arkasındaki mekanizma, daha sonra ele alınacak olan **viewing key** konusudur.

---

## 8. Dünyanın gördüğü şey ile gizli kalan şey

| Ödeme hakkında gerçek | Kamuya görünür mü? |
|---|---|
| Bir korumalı işlemin gerçekleştiği |  Evet |
| Tüm kurallara uyduğu (sahtecilik yok, çifte harcama yok) |  Evet (ispat sayesinde) |
| Parayı **kimin** gönderdiği |  Gizli |
| Parayı **kimin** aldığı |  Gizli |
| **Ne kadar** gönderildiği |  Gizli |
| Önceki **hangi** note'un harcandığı |  Gizli |

Bu, 1. bölümdeki paradoksun çözümüdür. Kamu, *içeriği* değil, *kuralları* doğrular. Doğrulama ile gizlilik artık çatışmaz, çünkü zero-knowledge proof ikincisine dokunmadan birincisini kontrol etmenizi sağlar.

---

## 9. Meselenin özü: zarf ile iptal jetonunun neden bağlanamadığı

Bu tek fikri anlarsanız, Zcash'in neden özel olduğunu anlamış olursunuz. Yavaşça okuyun.

- Bir **zarf (commitment)**, bir note **doğduğunda** panoya iliştirilir.
- Aynı note **harcandığında**, belki aylar sonra, kutuya bir **iptal jetonu (nullifier)** bırakılır.
- Bunlar **farklı gizli tariflerle** üretilir ve birini ötekine dönüştüren **kamusal bir matematik** yoktur.

Dolayısıyla dışarıdan bakan biri, ortaya çıkan zarfların akışını ve ortaya çıkan iptal jetonlarının akışını görür, ama **hangisinin hangisiyle eşleştiğini bulamaz**. "Bugün bırakılan iptal jetonu, geçen martta iliştirilen şu zarfa karşılık geliyor" diyemez. Bu bağlantı sadece note sahibinin gizli bilgisinin içinde vardır ve zero-knowledge proof bu bağlantının geçerli olduğunu *onu ifşa etmeden* doğrular.

Bitcoin'de chain-analysis şirketlerinin üstüne atladığı ve Zcash'in ise bilinçli olarak kopardığı bağ işte budur.

> **Sezginizi test edin:** Eğer nullifier bunun yerine *yalnızca* note'tan hesaplansaydı (işin içinde gizli anahtar olmasaydı), 5. bölümdeki üç özellikten hangisi bozulurdu ve bu durum gizliliği neden sessizce yok ederdi? *(Cevap sonda.)*

---

## 10. Dürüst bir not

Bu bir **zihinsel model**, teknik spesifikasyon değil. Yeni başlayanlar için erişilebilir kalması adına birkaç gerçek şeyi sessizce sadeleştirdik: Zcash'in birden fazla korumalı tasarımı oldu (Sprout, sonra Sapling, şimdi Orchard); gerçek işlemler aynı anda *birden fazla* note harcayıp oluşturabilir; "pano" teknik olarak kelimenin tam anlamıyla bir ilan panosu değil, belirli bir ağaç türüdür; ve değer dengesi bazı ek kriptografik muhasebe yöntemleriyle korunur. Bu ayrıntıların hiçbiri az önce öğrendiğiniz hikâyeyi değiştirmez; yalnızca onu daha hassas hâle getirir. Bu hassasiyeti her makalede adım adım geri ekleyeceğiz ve bunu yaptığımız her yerde açıkça belirteceğiz.

İyi eğitsel içerik, neyi dışarıda bıraktığını söyleyerek güven kazanır. Bu bölüm o sözün kendisidir.

---

## 11. Açtığımız döngüler (serinin haritası)

Yukarıda geçen her "buna geri döneceğiz" ifadesi bir ipliktir. İşte her biri nerede düğümleniyor:

![alt text](image-29.png)

| Bu makaledeki açık uç | Çözüldüğü yer |
|---|---|
| Mühürlü bir zarf nasıl hem gizleyici *hem de* sahteciliğe kapalı olabilir? | Makale 3: taahhütler |
| Anahtarlar ve gizli tarifler nereden gelir? | Makale 1 ve 2: alanlar ve eğriler |
| "Pano" tam olarak nedir? | Makale 4: Merkle ağaçları |
| Hiçbir şeyi açığa vurmadan bir şeyi nasıl kanıtlarsınız? | Makale 5: sıfır bilgi ispatları |
| Beş parçanın tümü gerçek Zcash içinde nasıl birleşir? | Makale 6: korumalı protokol |

---

## 12. Özet

- Bitcoin **şeffaftır**; Zcash ise gönderenin, alıcının ve tutarın gizli olduğu **korumalı** bir dünya sunar.
- Görünürdeki paradoks (*özel ama kamusal olarak doğrulanabilir*) işin özüdür ve çözülebilir.
- Korumalı bir ödeme, birbirine geçen beş parçadan oluşur: bir **note** (coin), bir **note commitment** (mühürlü zarf), **note commitment tree** (kamusal pano), bir **nullifier** (çifte harcamayı önleyen iptal jetonu) ve bir **zero-knowledge proof** (hiçbir şeyi ifşa etmeden geçerliliği kanıtlayan perde).
- Gizlilik nihayetinde **koparılmış tek bir bağa** dayanır: dışarıdan hiç kimse bir note'un doğumunu (commitment) ölümüyle (nullifier) bağlayamaz.
- Kamu asla *içeriği* değil, **kuralları** doğrular.

Artık harita sizde. Serinin geri kalanı onun içini dolduruyor.

---

## Sözlük

| Terim | Sade anlamı |
|---|---|
| **Note** | Özel bir değer birimi; Zcash'teki bir coin ya da banknota denk karşılık |
| **Note commitment** | Bir note'un var olduğunu, onu ifşa etmeden kanıtlayan kriptografik mühür |
| **Note commitment tree** | Tüm note commitment'ların yalnızca eklenebilen kamusal kaydı |
| **Nullifier** | Bir note kullanıldığında yayımlanan, çifte harcamayı önleyen benzersiz "harcandı" işareti |
| **Zero-knowledge proof** | Bir ifadenin doğru olduğunu, doğruluğunun ötesinde hiçbir şey ifşa etmeden kanıtlayan ispat |
| **Shielding / deshielding** | Fonları özel korumalı dünyanın içine / dışına taşımak |
| **Viewing key** | Sahibinin kendisine gönderilen note'ları tespit edip okumasını sağlayan anahtar |

---

## SSS

**Zcash her zaman özel midir?**
Hayır. Gizlilik *korumalı* dünya için geçerlidir (`z...`/`u...` adresleri). Şeffaf (`t...`) işlemler Bitcoin'deki gibi herkese açıktır.

**Her şey gizliyse, birinin bedava para basmasını ne engelliyor?**
Zero-knowledge proof. Her işlemin çıktılarının, gerçek ve harcanmamış girdilerle desteklenmesini matematiksel olarak zorunlu kılar; bunu yaparken de tutarları gizli tutar.

**Aynı note iki kez harcanabilir mi?**
Hayır. Bir note harcandığında onun nullifier'ı yayımlanır; ikinci bir deneme aynı nullifier'ı yeniden yayımlardı ve o zaten "harcanmış" kutusunda bulunduğundan ağ bunu reddeder.

**Dışarıdakiler göndereni alıcıyla ilişkilendirebilir mi?**
Hayır. Commitment (note'un doğumu) ile nullifier (note'un ölümü), sahibinin gizli bilgisi olmadan hiç kimse tarafından eşleştirilemez.

---

### Sezgi testinin cevabı (Bölüm 9)

Eğer nullifier, gizli anahtar olmadan *yalnızca* note'tan hesaplansaydı, o zaman **herkes** onu hesaplayabilirdi; bu da 1 numaralı özelliği bozardı (yalnızca sahibi harcayabilir). Daha kötüsü, nullifier artık note hakkındaki kamusal bilgilerden doğrudan türetilebilir olurdu; bu da gözlemcilerin **nullifier'ı yeniden onun commitment'ına bağlamasına** izin verebilir, 3 numaralı özelliği kırar ve bütün sistemin gizliliğini sessizce çözmeye başlardı. İptal jetonunu hem *yalnızca size ait* hem de *bağlantısız* yapan şey gizli anahtardır.

---

### Sırada ne var

**Makale 1 . Sonlu alanlar:** aritmetiğin "kendi etrafına sarıldığı" tuhaf ve güzel sayı sistemi ve bu serideki kriptografinin her parçasının neden orada yaşadığı. Her zamanki gibi sezgiyle başlayacağız; formüller ancak gerçekten hak edildiğinde gelecek.

*[ZecHub](https://zechub.org) için hazırlanan* Zcash from First Principles *serisinin bir parçası. CC BY-SA 4.0 lisanslıdır.*
