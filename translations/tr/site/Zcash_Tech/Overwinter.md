<a href="https://github.com/zechub/zechub/edit/main/site/Zcash_Tech/Overwinter.md" target="_blank">
  <img src="https://img.shields.io/badge/Edit-blue" alt="Sayfayı Düzenle"/>
</a>

# Overwinter

> Overwinter, Zcash ana ağında 347.500. blokta (26 Haziran 2018 UTC) etkinleşti.

Edineceğiniz çıkarım: Zcash'in kendi kurallarını güvenli bir şekilde nasıl değiştirmeyi öğrendiği ve bu temel altyapının, Sapling ile başlayan sonraki tüm yükseltmeleri neden mümkün kıldığı.

Overwinter, Zcash'in [ağ yükseltmelerinden](../start-here/network-upgrades) biridir ve ağ başlatıldıktan sonraki ilk yükseltmedir. Birkaç Zcash Improvement Proposal boyunca tanımlanmıştır: [ZIP 200](https://zips.z.cash/zip-0200), [ZIP 201](https://zips.z.cash/zip-0201), [ZIP 202](https://zips.z.cash/zip-0202), [ZIP 203](https://zips.z.cash/zip-0203) ve [ZIP 143](https://zips.z.cash/zip-0143). Overwinter herhangi bir yeni shielded özellik eklemedi. Bunun yerine, gelecekteki yükseltmelerin güvenli şekilde yayımlanabilmesi için protokolü sağlamlaştırdı. Yükseltme, resmi Zcash yükseltme sayfasında [Electric Coin Company](../zcash-organizations/electric-coin-company) tarafından belgelenmiştir.

Bunun neden önemli olduğu. Çalışan bir blockchain'in kurallarını değiştirmek tehlikelidir. Hata yaparsanız ağın iki sürümü anlaşmazlığa düşebilir ya da bir zincir için amaçlanan bir işlem başka bir zincirde kopyalanabilir. Overwinter'dan önce Zcash'in bir kural değişikliğini koordine etmek için standart, replay-safe bir yolu yoktu. Overwinter bunu düzeltti. Zcash'e yükseltmeler için resmi bir süreç kazandırdı ve aynı derecede önemli olarak çift yönlü replay koruması ekledi; böylece bir kural kümesi altında geçerli olan bir işlem başka bir kural kümesi altında yeniden oynatılamaz. Sapling'i ve ondan sonraki her yükseltmeyi sorunsuz şekilde etkinleştirmeyi mümkün kılan temel işte buydu.

![Overwinter öncesi ve sonrası: öncesinde standart bir yükseltme yolu ve replay koruması yoktu. Sonrasında çift yönlü replay korumasına sahip bir ağ yükseltme mekanizması ve güvenli gelecekteki yükseltmeler vardı](https://raw.githubusercontent.com/ZecHub/zechub/main/site/Zcash_Tech/assets/overwinter-before-after.png)

## Yükseltme mekanizması

Overwinter, [ZIP 200](https://zips.z.cash/zip-0200)'de tanımlanan Ağ Yükseltme Mekanizmasını tanıttı. Artık her yükseltme iki şeyi tanımlar: mevcut kural kümesini adlandıran bir consensus branch id ve yeni kuralların hangi blokta yürürlüğe gireceğini belirleyen bir activation height. Bu, Zcash yazılımı çalıştıran herkese geçişten önce güncelleme yapmak için net bir zaman aralığı sağlar.

Overwinter'ın kendisi ana ağda 347.500. blokta etkinleşti.

[ZIP 201](https://zips.z.cash/zip-0201), bir yükseltme etrafında düğümlerin birbirlerine nasıl davrandığını ele alır. Etkinleştirmeden önce düğümler, aynı sürümü çalıştıran eşlere bağlanmayı tercih eder. Etkinleştirme anında bir düğüm, farklı bir consensus branch üzerinde olan eşlerle bağlantıyı keser; böylece ağ, kafa karışıklığı yaşamaktansa yeni kurallar doğrultusunda temiz biçimde ayrılır.

## Replay koruması

Replay, birinin bir zincirde geçerli olan bir işlemi alıp başka bir zincirde yeniden yayınlamasıdır. Overwinter bunu, [ZIP 143](https://zips.z.cash/zip-0143)'te tanımlanan yeni bir imza şemasıyla engeller. Bir cüzdan bir işlemi imzaladığında, imza artık mevcut zincirin consensus branch id'sine de bağlanır. Bir branch için imzalanmış bir işlem, başka herhangi bir branch üzerinde iki yönde de geçerli değildir. Çift yönlü replay koruması tam olarak budur.

Bu, [ZIP 202](https://zips.z.cash/zip-0202)'den gelen ve bazen Overwintered formatı olarak adlandırılan yeni sürüm 3 işlem formatıyla el ele çalışır. İşlemin hangi consensus kuralları kümesine ait olduğunu açıkça gösteren bir fOverwintered işareti ve bir version group id ekler. Ek bir fayda olarak, yeni imza şeması transparent işlemlerin ne kadar hızlı doğrulandığını da iyileştirdi.

![Replay koruması nasıl çalışır: bir cüzdan, mevcut consensus branch id'sine bağlanan bir işlem imzalar; böylece işlem başka hiçbir branch üzerinde yeniden oynatılamaz](https://raw.githubusercontent.com/ZecHub/zechub/main/site/Zcash_Tech/assets/overwinter-replay-flow.png)

## İşlem sona ermesi

[ZIP 203](https://zips.z.cash/zip-0203), işlem sona ermesini ekledi. Bir işlem artık bir sona erme blok yüksekliği belirleyebilir. Eğer o yüksekliğe kadar kazılmamışsa, düğümler onu mempool'dan, yani onaylanmamış işlemlerin bekleme odasından çıkarır. Bundan önce bir işlem uzun süre onaylanmadan bekleyebilirdi. Sona erme, takılı kalmış bir işlemin sonunda kendiliğinden temizlenmesi anlamına gelir; bu da sizin için belirsizliği azaltır ve mempool'un eski, kazılmamış işlemlerle dolmasını önler.

## Nereye oturuyor

Overwinter, Ekim 2016'daki ana ağ lansmanından sonra gelen ilk Zcash ağ yükseltmesiydi ve bilinçli olarak Sapling'den önce yayımlandı. Görevi özellikler değil, altyapıydı. Önce yükseltme mekanizmasını ve replay koruma altyapısını kurarak, sonraki her yükseltmeye (Sapling, Blossom, Heartwood, Canopy, NU5 ve sonrakilere) güvenli bir etkinleşme yolu sağladı.

![Ekim 2016'daki Sprout lansmanından, 2016 ile 2018 arasındaki yükseltme çerçevesiz döneme ve Haziran 2018'deki Overwinter'a uzanan zaman çizelgesi](https://raw.githubusercontent.com/ZecHub/zechub/main/site/Zcash_Tech/assets/overwinter-timeline.png)

## Sözlük

| Terim | Sade anlamı |
|---|---|
| Network upgrade (NU) | Zcash'in consensus kurallarında, belirlenmiş bir blok yüksekliğinde etkinleşen koordineli bir değişiklik |
| Consensus branch id | Mevcut consensus kuralları kümesini adlandıran kısa bir tanımlayıcı |
| Activation height | Bir ağ yükseltmesinin yeni kurallarının yürürlüğe girdiği blok |
| Replay protection | Bir zincirde geçerli bir işlemin başka bir zincirde yeniden kullanılmasını engelleyen kural |
| Mempool | Yayınlanmış ancak henüz bir bloğa kazılmamış işlemler havuzu |
| Transaction expiry | Kazılmamış bir işlemin ardından çıkarıldığı sona erme blok yüksekliği |

## SSS

Overwinter benim ZEC'imi veya gizliliğimi değiştirdi mi? Hayır. Overwinter hiçbir yeni özellik eklemedi ve shielded işlemlere dokunmadı. Güvenli gelecekteki yükseltmeler için altyapıydı. Fonlarınız ve gizliliğiniz etkilenmedi.

Overwinter, Sapling'i veya shielded adresleri ekledi mi? Hayır. Overwinter hiçbir shielded özellik eklemedi. Sapling'in daha sonra güvenli biçimde etkinleşebilmesi için zemini hazırladı.

Consensus branch id nedir? Mevcut kural kümesini adlandıran kısa bir etikettir. İşlemler imzalandıklarında buna bağlanır; Zcash'e replay korumasını veren de budur.

Neden bazı kaynaklar 25 Haziran, bazıları ise 26 Haziran diyor? Overwinter, 26 Haziran 2018'de 01:37 UTC'de etkinleşti. Bu, UTC'de gece yarısından hemen sonradır; dolayısıyla birçok Batı saat diliminde yerel saat hâlâ 25 Haziran'ı gösteriyordu. Aynı blok ve aynı andır.

İşlem sona ermesi ne işe yarar? Hiç kazılmayan bir işlemin sonsuza kadar ortalıkta kalmaması anlamına gelir. Sona erme yüksekliğinden sonra düğümler onu çıkarır; böylece takılı kalmış bir ödeme hakkında tahmin yürütmek zorunda kalmazsınız.

Benim bir şey yapmam gerekiyor mu? Hayır. Overwinter 2018'de etkinleşti. Güncel herhangi bir Zcash cüzdanı veya düğümü zaten bu kuralları takip eder.

## Bilginizi test edin

Overwinter hiçbir yeni shielded özellik eklemedi. O hâlde neden Zcash tarihindeki en önemli yükseltmelerden biri sayılıyor?

<details>
<summary>Cevap</summary>

Çünkü sonraki her yükseltmenin dayandığı altyapıyı kurdu. Overwinter, Ağ Yükseltme Mekanizmasını ve çift yönlü replay korumasını tanıttı; böylece Zcash'e consensus kurallarını değiştirmek için standart ve güvenli bir yol kazandırdı. Bu temel olmadan Sapling ve ondan sonraki yükseltmeler sorunsuz şekilde etkinleşemezdi.
</details>

### Kaynaklar

[ZIP 200: Ağ Yükseltme Mekanizması](https://zips.z.cash/zip-0200)

[ZIP 201: Overwinter için Ağ Eş Yönetimi](https://zips.z.cash/zip-0201)

[ZIP 202: Overwinter için Sürüm 3 İşlem Formatı](https://zips.z.cash/zip-0202)

[ZIP 203: İşlem Sona Ermesi](https://zips.z.cash/zip-0203)

[ZIP 143: Overwinter için İşlem İmza Doğrulaması](https://zips.z.cash/zip-0143)

[Overwinter Ağ Yükseltmesi](https://z.cash/upgrade/overwinter/)

### Ayrıca bakınız

[Zcash Ağ Yükseltmeleri](../start-here/network-upgrades)

[Shielded Havuzlar](../using-zcash/shielded-pools)

[Tam Düğümler](../zcash-tech/full-nodes)

[NU6.1](../zcash-tech/nu6-1)

[Electric Coin Company](../zcash-organizations/electric-coin-company)

[ZEC ve Zcash Nedir](../start-here/what-is-zec-and-zcash)

---

Seri: [Ağ Yükseltmeleri dizini](../start-here/network-upgrades) · Önceki: [Sprout](../zcash-tech/sprout) · Sonraki: [Sapling](../zcash-tech/sapling)
