# Merkle Ağaçları: Blockchain Her Notu Nasıl Hatırlar?
##### Özgün araştırma: [Annkkitaaa](https://github.com/Annkkitaaa)

![alt text](image-19.png)

### Milyonlarca commitment'ı tek bir küçücük parmak izinde özetlemek

> **Seri:** *İlk Prensiplerden Zcash* . **Makale 4 . Merkle Ağaçları**
> **Hedef kitle:** yeni başlayanlar. [Makale 3'ün (hashing ve commitments)](article-3-hashing-commitments.md) üzerine inşa ediyoruz. Parmak izinin ve commitment'ın ne olduğunu biliyorsanız, hazırsınız.
> **Bu makaleden edineceğiniz şey:** Merkle ağaçlarının sezgisel ve doğru bir resmi, hangi öğeyi kastettiğinizi açığa vurmadan üyelik nasıl kanıtlanır ve bunun Zcash'in not commitment ağacına tam olarak nasıl dönüştüğü.

[Makale 0](article-0-shielded-transaction.md), şimdiye kadar oluşturulmuş her notu tutan ve yalnızca büyüyen bir "kamusal tahta"yı tanımlamıştı. Artık üstüne ne asıldığını tahmin edebilirsiniz: **commitment'lar** (Makale 3), yani mühürlü zarflar. Ama gerçek bir tahta bunlardan *yüz milyonlarcasını* barındırırdı. Ağ bunu nasıl saklıyor, nasıl doğruluyor ve zarfınızın tahtada olduğunu ona işaret etmeden nasıl kanıtlamanıza izin veriyor? Cevap, bilgisayar biliminin en zarif yapılarından biri: **Merkle ağacı.**

---

## 1. Bu neden önemli?

Elinizde devasa bir kamusal commitment listesi olduğu anda iki sorun ortaya çıkar.

**Birinci sorun: büyük ölçekte bütünlük.** Listede 300 milyon kayıt varsa, bunlardan *bir tanesinin bile* gizlice değiştirilmediğini herkes nasıl doğrular? Her bakışta 300 milyon öğeyi yeniden kontrol etmek umutsuz bir iştir.

**İkinci sorun: özel üyelik.** Bir notu harcamak için (Makale 0), commitment'ınızın gerçekten tahtada olduğunu kanıtlamalısınız. Ama ona işaret ederseniz ("4.201.337 numaralı kayıt bu!"), anonimliğinizi az önce yok etmiş olursunuz. **hangisi** olduğunu açıklamadan *"benim zarfım bu tahtada bir yerde"* demeyi kanıtlamanız gerekir.

Bir Merkle ağacı her iki sorunu da aynı anda çözer. Tüm listeyi tek bir parmak izine sıkıştırır ve size üyeliği küçük, konumu gizleyen bir kanıtla ispatlama imkânı verir.

---

## 2. Sezgi: parmak izlerinden oluşan bir turnuva

Bir eleme turnuvası tablosu düşünün; ama ilerleyen şey oyuncular değil, **parmak izleri**.

- En altta, her veri parçasının kendine ait bir parmak izi vardır (Makale 3'teki hash'i). Bunlara **yapraklar** denir.
- Bunları ikili gruplar hâlinde eşleştirin. Her çiftin iki parmak izi *birlikte* hash'lenerek tek bir üst parmak izine dönüştürülür.
- Üst düğümleri eşleştirin, her çifti birlikte hash'leyin ve böyle devam edin.
- En tepeye **tek bir parmak izi** kalana kadar sürdürün. O şampiyon, **Merkle root**'tur.

![alt text](image-20.png)

En önemli özellik doğrudan çığ etkisinden gelir (Makale 3):

> **Root, altındaki *her şeyin* parmak izidir.** Herhangi bir yaprağı, tek bir bit bile olsa değiştirin; onun parmak izi değişir, bu da üst düğümünü değiştirir, bu da *onun* üst düğümünü değiştirir ve bu zincir tepeye kadar çıkar. **Root değişir.** Yani küçük bir root değeri, tüm listenin bütünlüğünü onaylar. Bu da birinci sorunu çözer.

---

## 3. Gerçek bir ağaç, tam hesaplanmış hâliyle

Yukarıdaki dört yapraklı ağacı `A, B, C, D` yaprakları üzerinde gerçek SHA-256 parmak izleriyle kuralım (okunabilirlik için digest'ler kısaltılmıştır):

```
hA = 559aead08264...     hB = df7e70e50215...
hC = 6b23c0d5f35d...     hD = 3f39d5c348e5...

hAB = H(hA , hB) = 63956f0ce48e...
hCD = H(hC , hD) = 98a2fbfddbc7...

ROOT = H(hAB , hCD) = 1b3faa3fcc5e...
```

Her şey sadece "bir şeyi hash'le, sonra hash çiftlerini hash'le"den ibaret. Makale 3'tekinden daha egzotik hiçbir şey yok; sadece ağaç biçiminde düzenlenmiş hâli.

---

## 4. Zekice kısmı: konumu açığa vurmadan üyeliği kanıtlamak

Şimdi ikinci soruna gelelim. Diyelim ki yalnızca **root**'u bilen birine, `C` yaprağının ağaçta olduğunu kanıtlamak istiyorsunuz. Ona ağacın tamamını *vermezsiniz*. Sadece `C`'den root'a tırmanmak için gereken parmak izlerini verirsiniz; buna **authentication path** (veya **Merkle proof**) denir:

> `C`'nin ağaçta olduğunu kanıtlamak için şunları verin:
> - kardeşi `hD`, ve
> - amcası `hAB`.

Doğrulayıcı, yalnızca root'u bilerek tırmanışı yeniden hesaplar:

```
step 1:  H(hC , hD)        = hCD       (combine C with its sibling)
step 2:  H(hAB , hCD)      = ROOT?     (combine with the uncle)
```

Gerçekte hesaplandığında sonuç `1b3faa3fcc5e...` olur; bu da **root ile eşleşir.** Böylece yaprağın ağaçta olduğu kanıtlanmış olur.

![alt text](image-21.png)

Bunu güçlü kılan iki şey vardır:

- **Küçüktür.** 4 yaprak için 2 hash verdiniz. `n` yapraklı bir ağaç için ise yalnızca yaklaşık **log_2(n)** hash verirsiniz. Bir milyar yaprak için bu kabaca **30 hash** eder; bir milyar değil. Ağacın boyutu patlasa bile kanıt neredeyse hiç büyümez.
- **Mahremiyetin tohumudur.** Bu kanıt, yaprağınızın ağacın *bir yerinde* olduğunu gösterir. Aynı kontrol *bir zero-knowledge proof içinde* gerçekleştirildiğinde (Makale 5), yolun kendisi bile gizlenir; böylece ne notu ne de konumunu açığa çıkarmadan "notum ağaçta" diye kanıt sunarsınız. Bu da ikinci sorunu tamamen çözer.

---

## 5. Bir Merkle ağacından Zcash'in not commitment ağacına

Artık Makale 0'daki "kamusal tahta"nın gerçekte ne olduğunu tam olarak ifade edebiliriz:

> **Not commitment ağacı**, **yaprakları not commitment'ları olan** bir Merkle ağacıdır. Dünyanın herhangi bir yerinde her yeni not oluşturulduğunda, onun commitment'ı bir sonraki yaprak olarak eklenir ve root güncellenir.

Birkaç somut ayrıntı:

- **Yalnızca büyür.** Yapraklar eklenir, asla kaldırılmaz. Buna **incremental Merkle tree** denir. (Makale 0'daki "tahta hiçbir şeyi söküp atmaz" fikriyle uyumludur.)
- **Root'a *anchor* denir.** Harcama yaptığınızda, işleminiz yakın tarihli bir anchor'a referans verir ve notunuzun commitment'ının o root'a sahip ağaçta bulunduğunu zero knowledge ile kanıtlar.
- **Sabit derinlik.** Zcash'in shielded ağaçları **32** derinliğindedir; yani `2^(32)` kadar (dört milyardan fazla) not tutabilirler.
- **ZK-dostu hashing.** Ağaç SHA-256 ile kurulmaz. Sapling ağacı **Pedersen hashes** ile, Orchard ise **Sinsemilla** ile hash'ler (ikisi de Makale 3'ten gelir); bunun nedeni üyelik tırmanışının bir devre içinde kanıtlanmasının ucuz olmasıdır.

![alt text](image-22.png)

### Ağacın *halletmediği* bir şey: double-spend'ler

Ağaç, bir notun **var olduğunu** kanıtlar. Ama tek başına aynı notu iki kez harcamanızı engellemez. Bu görev, Makale 0'daki **nullifier set**'e aittir: ayrı bir "geçersiz kılma belirteçleri" koleksiyonu. Harcama yaptığınızda, notun nullifier'ını yayımlarsınız ve ağ daha önce gördüğü her nullifier'ı reddeder.

Yani bu iki kamusal yapı birbirini tamamlayan roller oynar ve onları ayrı tutmak, bir notun doğumu ile ölümü arasındaki bağlantıyı tam da bu yüzden koparır:

| Yapı | Yanıtladığı soru | Ne zaman güncellenir |
|---|---|---|
| **Not commitment ağacı** | "Bu not var mı?" | Bir not **oluşturulduğunda** (commitment eklenir) |
| **Nullifier set** | "Bu not zaten harcandı mı?" | Bir not **harcandığında** (nullifier yayımlanır) |

---

## 6. Dürüst bir not

Her zamanki gibi bazı sadeleştirmeler yaptık. Gerçek incremental Merkle ağaçları, her şeyi baştan kurmadan root'un güncellenebilmesi için "frontier" düğümlerini takip eder; ağ yalnızca en sonuncuyu değil, yakın tarihli anchor'ların bir penceresini tutar, böylece her yeni blokta cüzdanlar bozulmaz; boş yapraklar da tanımlı bir padding değeri kullanır. Ayrıca ikinin kuvvetleriyle düzenli duran ikili ağaçlar çizdik. Bunların hiçbiri sezgiyi değiştirmez: commitment yaprakları, ikişerli hash'lenerek tek bir root'a çıkar ve kısa üyelik kanıtları üretir. Tam muhasebe ayrıntılarına protokol makalesinde geri döneceğiz.

---

## 7. Özet

- Bir **Merkle ağacı**, verileri **yapraklar** olarak hash'ler; sonra **çiftleri yukarı doğru** hash'leyerek geriye tek bir **root** kalana kadar ilerler.
- Çığ etkisi sayesinde **root tüm listenin parmak izidir**: tek bir yaprağı değiştirin, root değişir. Tek küçük bir değer, devasa bir veri kümesini onaylar.
- Bir **üyelik kanıtı (authentication path)**, root'a tırmanış boyunca karşılaşılan kardeş hash'lerden ibarettir; yaklaşık **log_2(n)** hash gerekir. Bu yüzden milyarlarca yaprak olsa bile kanıtlar küçük kalır.
- Bu üyelik kontrolü **bir zero-knowledge proof içinde** yapıldığında, hangi yaprağı kastettiğinizi gizler; böylece ne notu ne de konumunu açığa çıkarmadan "notum ağaçta"yı kanıtlarsınız.
- Zcash'in **not commitment ağacı**, not commitment'larından oluşan **incremental** bir Merkle ağacıdır; derinliği **32**'dir, root'una **anchor** denir; Sapling bunu **Pedersen** ile, Orchard ise **Sinsemilla** ile hash'ler.
- Ağaç **varlığı** kanıtlar; ayrı **nullifier set** ise **double-spend**'leri önler. Bunları ayrı tutmak, notun doğumunu ölümünden ayıran şeydir.

---

## Sözlük

| Terim | Sade anlamı |
|---|---|
| **Merkle tree** | Hash'lerden oluşan bir ağaç; yapraklar veri parmak izleridir, üst düğümler çocuklarını hash'ler |
| **Leaf** | En alttaki düğüm; Zcash'te bir not commitment'ı |
| **Merkle root** | Tüm ağacı özetleyen tek üst parmak izi |
| **Authentication path / Merkle proof** | Bir yaprağın ağaçta olduğunu kanıtlamak için gereken kardeş hash'ler |
| **Incremental Merkle tree** | Yalnızca ekleme yapılan bir Merkle ağacı (yapraklar sadece eklenir) |
| **Anchor** | Bir harcamanın "kanıtı bu ağaç durumuna karşı sunuyorum" diye referans verdiği bir Merkle root |
| **Nullifier set** | Double-spend'leri engelleyen, harcanmış işaretleyicilerden oluşan ayrı koleksiyon |

---

## SSS

**Neden ağaç da sadece uzun bir hash listesi değil?**
Düz bir liste, üyeliği kanıtlamak için her kaydı açığa vurmanızı veya işlemenizi gerektirirdi. Ağaç ise size logaritmik boyutta kanıtlar ve bütünlük için tek bir root verir.

**Doğrulayıcının tüm ağaca ihtiyacı var mı?**
Hayır. Doğrulayıcının sadece **root**'a ve sizin kısa authentication path'inize ihtiyacı vardır. Zaten bütün mesele budur.

**Neden özellikle 32 derinlik?**
Bu, ağacı yaklaşık dört milyar notla sınırlar; bu da fazlasıyla yeterli bir kapasite bırakırken, üyelik kanıtını (ve devre içindeki maliyetini) sabit ve yönetilebilir bir boyutta tutar.

**Her yeni notta root değişiyorsa, eski kanıtlar nasıl geçerli kalıyor?**
Ağ, yakın tarihli root'ların (anchor'ların) bir penceresini hatırlar; bu yüzden biraz daha eski bir anchor'a karşı oluşturulmuş bir kanıt hâlâ doğrulanabilir. Protokol makalesi bunu net biçimde açıklar.

---

### Sezginizi test edin

4 yapraklı ağacımızda, bir saldırganın `C` yaprağını gizlice başka bir değerle değiştirdiğini ama yayımlanmış root'u değiştirmeden bıraktığını varsayın. Onlar için ne ters gider ve bunu neden sessizce düzeltemezler? *(Cevap aşağıda.)*

<details><summary>Cevap</summary>

`C`'nin değişmesi `hC`'yi değiştirir (çığ etkisi), bu da `hCD = H(hC, hD)` değerini değiştirir, bu da `ROOT = H(hAB, hCD)` değerini değiştirir. Dolayısıyla yeniden hesaplanan root artık yayımlanan root ile eşleşmez ve kurcalama tespit edilir. Bunu "sessizce düzeltmek" için aynı `hC`'yi üreten farklı bir `C` bulmaları gerekir; bu ise Makale 3'e göre uygulanamaz olan bir hash collision'dır. Bütünlük korunur.
</details>

---

### Sırada ne var

**Makale 5 . Zero-knowledge proofs:** doruk noktası. Artık notları, commitment'ları ve ağacı kurduk ve sürekli "zero knowledge ile kanıtlanıyor" diyoruz. Makale 5, nihayet bir önermenin doğru olduğunu, notunuzun ağaçta bulunduğunu, nullifier'ınızın doğru olduğunu, paranın dengede olduğunu, bunların hiçbirini açığa vurmadan nasıl kanıtlayabildiğinizi açıklar.

*ZecHub için hazırlanan* İlk Prensiplerden Zcash *serisinin bir parçası. Lisans: CC BY-SA 4.0.*
