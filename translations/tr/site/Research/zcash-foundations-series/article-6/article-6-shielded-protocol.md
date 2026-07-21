# Korumalı Protokol, Uçtan Uca
##### [Annkkitaaa](https://github.com/Annkkitaaa) tarafından orijinal araştırma

![alt text](image-27.png)

### Her parçayı tek bir özel Zcash işlemi içinde bir araya getirmek

> **Seri:** *İlk İlkelerden Zcash* . **Makale 6 . Korumalı Protokol** (final)
> **Hedef kitle:** 0'dan 5'e kadar olan Makaleleri okumuş yeni başlayanlar. Her şeyin birbirine bağlandığı yer burası.
> **Bu yazıdan kazanacağınız şey:** korumalı bir Zcash işleminin eksiksiz ve doğru bir zihinsel modeli; serideki her kavramın doğru yerine oturduğu ve Makale 0'daki her döngünün kapandığı bir çerçeve.

[Makale 0](article-0-shielded-transaction.md)'da bir paradoks ve herkese açık bir tahtadaki mühürlü zarflarla ilgili bir hikâyeyle başlamıştık. Ardından beş makale boyunca parçaları inşa ettik: sonlu alanlar, eliptik eğriler, commitments, Merkle ağaçları ve sıfır bilgi ispatları. Şimdi bunları bir araya getirip gerçek bir özel ödemenin baştan sona nasıl çalıştığını göreceğiz.

---

## 1. Neden bunu önemsemelisiniz?

Tek tek bakıldığında öğrendiğiniz her parça zekice. Ancak Zcash'in *büyüsü*, bunların birbirine nasıl kenetlendiğinde ortaya çıkar. Tek başına bir nullifier gizlilik sağlamaz. Tek başına bir commitment sahteciliği önlemez. Tek başına bir ispat da faydalı hiçbir şeyi kanıtlamaz. Beş bileşeni aynı anda hem özel hem de güvenilir para hâline getiren şey, bu **birleşimdir**.

Bu makale o birleşimi anlatıyor. Sonunda, *"ağ göremediği bir işlemi doğrular"* cümlesi artık bir paradoks gibi değil, zaten anladığınız parçaların apaçık bir sonucu gibi gelecek.

---

## 2. Kadro, yeniden bir arada

İşte tek sayfada tüm seri; Makale 0'daki hikâyeden gerçek mekanizmaya eşlenmiş hâli.

| Makale 0'daki hikâye unsuru | Gerçek bileşen | Şunlardan inşa edilir |
|---|---|---|
| Zarfın içindeki para | **Note** (değer, alıcı, rastgelelik) | alan elemanları olarak kodlanır (Makale 1) |
| Mühürlü, opak zarf | **Note commitment** | Pedersen / Sinsemilla commitment (Makale 2, 3) |
| Herkese açık tahta | **Note commitment tree** (`anchor` = onun kökü) | artımlı Merkle ağacı (Makale 4) |
| Boşluk belirteci | **Nullifier** | `note` + gizli anahtarın ZK-dostu hash'i (Makale 2, 3) |
| "İçeri giren para = dışarı çıkan para" | **Value commitments + bakiye kontrolü** | homomorfik Pedersen commitments (Makale 2, 3) |
| Perde arkasındaki büyü | **Zero-knowledge proof** | aritmetik devre üzerinde zk-SNARK (Makale 5) |
| "Zarfını sadece sen okuyabilirsin" | **Encrypted note + viewing keys** | şifreleme + anahtar hiyerarşisi (bu makale) |

---

## 3. Anahtarlar nereden gelir

Bir kullanıcının yapabildiği her şey, tek bir sırdan, yani **spending key**'den, tek yönlü bir hiyerarşi üzerinden türetilir (her ok, Makale 2 ve 3'teki trapdoor'lar sayesinde geri döndürülemez bir türetmedir):

![alt text](image-32.png)

Daha önceki makalelerin sonuçları olan ve dikkat etmeye değer iki nokta var:

- Bu ayrım, size harcama yetkisi vermeden işlemlerinizi gösteren bir **viewing key**'i (örneğin bir denetçiye) paylaşabilmenizi sağlar. Gizlilik ya hep ya hiç değildir; seçici olabilir.
- Her türetme **tek yönlüdür**: bir viewing key'e sahip olmak, hiç kimsenin spending key'i geri elde etmesine izin vermez; tam da Makale 2'deki eliptik eğri trapdoor'unun görevini yapması gibi.

---

## 4. Bir note'u harcamak: dört iddia

Bir note'u özel biçimde harcamak için, ağa aynı anda dört şeyi ikna edici şekilde göstermeniz gerekir; bunu yaparken **note'u, değerini, konumunu veya kimliğinizi açıklamazsınız.** Her iddia, zaten bildiğiniz bir bileşenle karşılanır.

![alt text](image-31.png)

İspat, altta yatan gerçeklerin **hiçbirini** açıklamaz (hangi note, kimin anahtarı, hangi değer). Yalnızca *dört iddianın da doğru olduğunu* açıklar. Korumalı Zcash'in tüm hilesi, tek bir diyagramda tam olarak budur.

---

## 5. Değer dengesi hilesi (sona sakladığımız ödül)

Makale 2 ve 3'te Pedersen commitments'ın **toplanabildiğini** belirtmiştik: `v_1` için olan commitment ile `v_2` için olan commitment'ın toplamı, `v_1 + v_2` için bir commitment'tır. İşte bunun karşılığı burada ortaya çıkıyor.

Her giriş ve çıkış note'u bir **value commitment** taşır: miktarı `v` olanı gizleyen bir Pedersen commitment'ı, yani `v.G + r.H`. Bunlar toplanabildiği için ağ şunu hesaplayabilir:

```
(giriş value commitments toplamı) − (çıkış value commitments toplamı)
```

İşlem dengedeyse (hiç para yaratılmamış ya da yok edilmemişse), `v` kısımları tam olarak birbirini götürür ve geriye yalnızca kalan rastgelelikle körlenmiş, **sıfır değere** ait bir commitment kalır. Gönderen, o kalan rastgeleliği bildiğini, **binding signature** denen küçük bir imza üreterek kanıtlar. Geçerli bir binding signature, yalnızca değerler gerçekten dengedeyse mümkündür; **yine de tek bir miktar bile açıklanmaz.**

> Bu, tüm seride *neden* homomorfik, eğri tabanlı commitments'a ihtiyaç duyduğumuzun en temiz örneğidir. "İçeri giren para = dışarı çıkan para" kuralı, **mühürlü zarfları birbirine ekleyerek** ve sonucun sıfıra mühürlendiğini kontrol ederek uygulanır.

---

## 6. Uçtan uca izlenen eksiksiz bir işlem

Alice'in Bob'a ödeme yapmasını bir araya getirelim. Eğitim modeli olarak Sapling'in net "harcama tarafı / çıkış tarafı" yapısını kullanacağız.

**Korumalı bir işlem, iki tür açıklamayı bir araya getirir:**

| Spend description (bir note'u tüketir) | Output description (bir note oluşturur) |
|---|---|
| girişin value commitment'ı | çıkışın value commitment'ı |
| karşısında ispat verdiği **anchor** (bir ağaç kökü) | yeni **note commitment** (yeni bir yaprak) |
| harcanan note'un **nullifier**'ı | şifreleme için bir **ephemeral key** |
| yeniden rastgeleleştirilmiş açık anahtar + harcama yetkilendirme imzası | **encrypted note** (alıcı için şifreli metin) |
| dört iddiayı kanıtlayan **zk-SNARK** | çıkışın düzgün biçimlendirildiğini kanıtlayan bir **zk-SNARK** |

Bunlara ek olarak, değer dengesini zorunlu kılan, tüm paket üzerinde tek bir **binding signature** bulunur (Bölüm 5).

![alt text](image-30.png)

Gizliliğin izini sürün: ağ `anchor`'ı kontrol etti, `nullifier`'ın yeni olduğunu kontrol etti, ispatı doğruladı ve dengeyi doğruladı. Miktarı öğrenmeden, adres öğrenmeden ve hangi note'un harcandığını bilmeden, geçerli bir ödemeyi kabul etti. Bu sırada harcanan note'un **nullifier**'ı (ölümü) ve Bob'un yeni **commitment**'ı (note'unun doğumu), görünür bir bağ olmadan iki farklı açık yapıda durur; Makale 0'daki koparılmış bağlantı budur.

---

## 7. Makale 0'daki her döngüyü kapatmak

Makale 0 kasıtlı olarak sorular açmıştı. İşte şimdi onların hepsi kapanıyor.

| Makale 0'da açılan döngü | Şununla kapanır |
|---|---|
| Mühürlü ama sahteciliğe kapalı bir zarf nasıl mümkün olabilir? | Commitments: rastgelelikten gelen gizleme, çarpışma direncinden / eğri trapdoor'undan gelen bağlayıcılık (Makale 3) |
| Anahtarlar ve gizli tarifler nereden gelir? | Alan aritmetiği ve eliptik eğri skaler çarpımı (Makale 1, 2) |
| "Tahta" tam olarak nedir? | Note commitments'tan oluşan artımlı bir Merkle ağacı; kökü `anchor`'dır (Makale 4) |
| Boşluk belirteci neden zarfına bağlanamaz? | Nullifier, commitments'tan ayrı tutulan bir kümede yer alan anahtarlı bir hash'tir (Makale 2, 3, 4) |
| Hiçbir şey açığa vurmadan geçerliliği nasıl kanıtlarsınız? | Dört iddianın hepsini kodlayan bir aritmetik devre üzerindeki zk-SNARK (Makale 5) |
| Alıcı kendisine ödeme yapıldığını nasıl öğrenir? | Note, onun adresine şifrelenir; o da bir viewing key ile deneme amaçlı şifre çözme yapar (bu makale) |
| "İçeri giren para = dışarı çıkan para" özel olarak nasıl uygulanır? | Homomorfik value commitments + binding signature (Bölüm 5) |

İlk sayfadaki paradoks, *göremediğini doğrulamak*, artık tamamen çözülmüştür. Ağ, verinin kendisini değil, **gizli veri hakkında iddiaları** doğrular.

---

## 8. Sapling ve Orchard, tek nefeste

Öğretim için Sapling yapısını kullandık çünkü ayrımı en net olan odur. Güncel tasarım olan **Orchard**, bu fikirleri değiştirmekten çok inceltir:

| | **Sapling** | **Orchard** |
|---|---|---|
| İşlem birimi | ayrı **Spend** ve **Output** açıklamaları | birleşik **Actions** (her biri bir harcama + bir çıkış yapar) |
| İspat sistemi | **Groth16** (trusted setup) | **Halo 2** (trusted setup yok) |
| Eğriler | BLS12-381 + Jubjub | Pallas / Vesta (Pasta) |
| Commitment hash'i | Pedersen | Sinsemilla |

Bu makaledeki her kavram doğrudan taşınır; Orchard esas olarak harcama ve çıkışı birleştirir ve trusted setup gerektirmeyen bir ispat sistemi kullanır. Beş sütun değişmeden kalır.

---

## 9. Dürüst bir not

Bu, serideki en eksiksiz resimdir, ama yine de bir modeldir. Bir note'un tam alan kodlamalarını, kesin anahtar türetme formüllerini, harcama anahtarlarının yeniden rastgeleleştirilmesini, çeşitlendirilmiş adresleri, memo alanlarını, ücret işlenişini, value commitments ile note commitments arasındaki farkı tüm ayrıntısıyla ve her imzanın tam rolünü sıkıştırarak anlattık. Ayrıca tek bir kanonik akış sunduk; gerçek işlemler aynı anda birçok harcama ve çıkış taşıyabilir, hatta şeffaf ve korumalı parçaları karıştırabilir. Yetkili kaynak Zcash Protokol Spesifikasyonu'dur. Elinizdeki şey artık doğru şekildir; tüm ölçüleri spesifikasyon doldurur.

---

## 10. Özet

- Korumalı bir işlem, beş bileşenin tamamını birbirine kenetler: bir **note** (değer), onun **note commitment tree** içindeki **commitment**'ı, çift harcamayı önleyen bir **nullifier**, denge için **value commitments** ve hepsini bir araya bağlayan bir **zk-SNARK**.
- Harcama, **aynı anda dört iddiayı** kanıtlar: note vardır, onu harcamaya yetkiniz vardır, onun nullifier'ı doğrudur ve değer dengededir; bunu **sıfır bilgiyle** yapar ve alttaki gerçeklerin hiçbirini açığa vurmaz.
- **Değer dengesi**, **homomorfik commitments'ın toplanması** ve **binding signature** aracılığıyla sıfıra mühürlendiklerinin kontrol edilmesiyle uygulanır; hiçbir miktar açıklanmaz.
- Bir kullanıcının yetkileri tek bir **spending key**'den **tek yönlü bir hiyerarşi** üzerinden akar; bu da harcama yetkisi vermeden görünürlük sağlayan **viewing keys**'i mümkün kılar.
- Ağ, verinin kendisini değil, **gizli veri hakkındaki iddiaları doğrular**; böylece Makale 0'daki doğrulama-gizlilik paradoksu çözülür. Orada açılan her döngü artık kapanmıştır.
- **Orchard**, **Sapling**'i inceltir (birleşik Actions, trusted setup olmadan Halo 2, Pasta eğrileri, Sinsemilla) ama beş sütunu değiştirmez.

---

## Sözlük

| Terim | Düz anlamı |
|---|---|
| **Spending key** | Bir kullanıcının tüm anahtarlarının türediği tek kök sır |
| **Viewing key** | Birine harcama yetkisi vermeden işlemlerinizi gösterir |
| **Spend description** | Bir `tx` içinde bir note'u tüketen bölüm (nullifier, anchor, ispat) |
| **Output description** | Bir `tx` içinde bir note oluşturan bölüm (commitment, ciphertext, ispat) |
| **Action (Orchard)** | Bir harcama ve bir çıkışı birlikte yapan birleşik birim |
| **Value commitment** | Bir miktara ait homomorfik Pedersen commitment |
| **Binding signature** | Değerlerin dengede olduğunu, onları açıklamadan kanıtlayan imza |
| **Anchor** | Bir harcamanın üyeliğini karşısında ispatladığı ağaç kökü |
| **Trial decryption** | Alıcının, kendisine yönelik note'ları bulmak için yeni commitments'ı test etmesi |

---

## SSS

**Ağ miktarı ya da kimin kime ödeme yaptığını hiç görür mü?**
Hayır. İspatı, `nullifier`'ın yeni oluşunu, `anchor`'ı ve `binding signature`'ı doğrular. Tüm özel değerler gizli kalır.

**Bir note'u iki kez harcamamı ne engeller?**
`nullifier`. Harcama onu yayımlar; ağ, `nullifier` kümesinde zaten bulunan herhangi bir `nullifier`'ı reddeder. Aynı note her zaman aynı `nullifier`'ı üretir.

**Miktarlar gizliyse denge nasıl kontrol edilir?**
Value commitments homomorfik olarak toplanır; dengeli bir işlemin commitments'ı sıfır için bir commitment'a dönüşecek şekilde birbirini götürür ve bunu binding signature kanıtlar.

**Kontrolü bırakmadan işlemlerimi bir denetçiye kanıtlayabilir miyim?**
Evet. Bir viewing key verin. Bu, tek yönlü anahtar hiyerarşisi sayesinde korumalı etkinliğinizi gösterir ama harcamaları yetkilendiremez.

**Orchard varken Sapling artık demode mi?**
İkisi de ağ üzerinde var olmuştur; güncel tasarım Orchard'dır. Kavramlar ortak olduğundan birini anlamak ötekini de anlamanızı sağlar.

---

### Sezgini test et

Bir arkadaşınız şöyle diyor: "İspat miktarı gizlediğine göre, bir hırsız çıkışlarının girişlerinden daha değerli olduğunu iddia edip bedava para basabilir." Bölüm 5'i kullanarak, bunun neden başarısız olduğunu iki cümlede açıklayın. *(Yanıt aşağıda.)*

<details><summary>Yanıt</summary>

Miktarlar gizlidir, ancak her biri homomorfik bir value commitment içine sarılmıştır ve ağ tüm giriş commitments'ını toplayıp tüm çıkış commitments'ını çıkarır; gizli değerler dengede olmasaydı sonuç sıfıra mühürlenmezdi ve **geçerli bir binding signature üretilemezdi.** Hırsız *ne kadar* olduğunu gizleyebilir, ama dengesiz değerleri denge kontrolünden geçiremez; dolayısıyla bedava para basmak, hiçbir şeyi açığa vurmadan bile aritmetik tarafından yakalanmadan mümkün değildir.
</details>

---

### Serinin tamamı

Artık tek bir paradokstan tam bir özel ödemeye kadar geldiniz:

![alt text](https://github.com/user-attachments/assets/cd8bbb40-57b8-4854-b9cf-97f2485d126a)


Buradan sonra doğal bir sonraki hat daha derine gider: Groth16 ve Halo 2'nin iç işleyişi, trusted-setup törenleri, Sapling ve Orchard devrelerinin ayrıntıları, anahtar türetme ve çeşitlendirilmiş adresler ve protokolün ağ yükseltmeleri boyunca geçirdiği evrim. Ama temel artık yerinde ve bu konuların her birinin bağlanacağı bir yuvası var.

*İlk İlkelerden Zcash serisinin* [ZecHub](https://zechub.org) *için hazırlanmış bir parçasıdır. CC BY-SA 4.0 lisanslıdır.*
