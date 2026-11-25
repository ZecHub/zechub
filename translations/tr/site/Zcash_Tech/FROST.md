<a href="https://github.com/zechub/zechub/edit/main/site/Zcash_Tech/FROST.md" target="_blank">
  <img src="https://img.shields.io/badge/Edit-blue" alt="Edit Page"/>
</a>
# FROST


## Özet

* FROST (Esnek Turlu Optimize Edilmiş Schnorr Eşik İmzaları), bir eşik imzası ve dağıtık anahtar oluşturma protokolüdür: Birden fazla imzalayan, ortak bir özel anahtarın birer payını tutar ve tek bir imza oluşturmak için belirli sayıda imzalayanın iş birliği yapması gerekir.
* Sonuç tek bir Schnorr imza olduğundan, bu yöntemle yapılan bir işlem ağda sıradan bir işlem gibi görünür.
* Asgari sayıda iletişim turu gerektirir, paralel çalışabilir ve uygunsuz davranan bir katılımcıyı tespit edip hariç tutabilir.
* Zcash için bu, FROST protokolünün coğrafi olarak birbirinden uzakta bulunan birden fazla tarafın korumalı ZEC harcama yetkisini kontrol etmesini sağladığı anlamına gelir. Bu; saklama, emanet, gözetimsiz hizmetler ve Zcash Shielded Assets (ZSA) için kullanışlıdır.
* Chelsea Komlo (Waterloo Üniversitesi, Zcash Foundation) ve Ian Goldberg (Waterloo Üniversitesi) tarafından oluşturulmuştur.

## Temel Açıklama

### Schnorr imzası nedir?

Schnorr dijital imza bir algoritmalar kümesidir: (KeyGen, Sign, Verify).

Schnorr imzalarının birçok avantajı vardır. Önemli avantajlarından biri, aynı mesajı imzalamak için birden fazla anahtar kullanıldığında ortaya çıkan imzaların tek bir imzada birleştirilebilmesidir. Bu, çoklu imza ödemelerinin ve çoklu imzayla ilgili diğer işlemlerin boyutunu önemli ölçüde azaltabilir.

### FROST nedir?

**Esnek Turlu Optimize Edilmiş Schnorr Eşik İmzaları** -
*Chelsea Komlo (Waterloo Üniversitesi, Zcash Foundation) ve Ian Goldberg (Waterloo Üniversitesi) tarafından oluşturulmuştur.*

FROST, asgari sayıda iletişim turu gerektiren ve paralel olarak çalıştırılabilen bir eşik imzası ve dağıtık anahtar oluşturma protokolüdür. FROST protokolü, Schnorr imza şemasının eşik sürümüdür.

Tek taraflı ortamdaki imzalardan farklı olarak eşik imzaları, her biri ortak bir özel anahtarın bir payını tutan belirli sayıda imzalayanın iş birliğini gerektirir.

[Eşik İmzaları Nedir? Chelsea Komlo - Zcon3](https://youtu.be/cAfTTfblzoU?t=110)

Bu nedenle, eşik ortamında imza oluşturmak, imzalayanlar arasındaki ağ turları nedeniyle ek yük getirir. Bu da gizli anahtar paylarının ağ kısıtlaması olan cihazlarda saklanması veya koordinasyonun güvenilir olmayan ağlar üzerinden yapılması durumunda maliyetli hale gelir.

İmzalama işlemleri sırasındaki ağ yükü, sahtecilik saldırılarına karşı koruma sağlayan ve diğer şemalara da uygulanabilen yeni bir teknik kullanılarak azaltılır.

FROST, sınırsız sayıda imza işleminin güvenli biçimde paralel olarak (eşzamanlı) gerçekleştirilmesine olanak tanıyarak eşik imzası protokollerini geliştirir.

Protokol, imzalayanların toplamda 2 mesaj gönderip aldığı 2 turlu bir protokol olarak veya ön işleme aşamasına sahip optimize edilmiş tek turlu bir imzalama protokolü olarak kullanılabilir.

FROST, uygunsuz davranan bir katılımcının varlığında protokolün sonlandırılmasına izin vererek verimlilik iyileştirmelerini kısmen sağlar; bu katılımcı daha sonra tespit edilir ve sonraki işlemlerden hariç tutulur.

Ayrık logaritma probleminin zor olduğu ve saldırganın eşik sayısından daha az katılımcıyı kontrol ettiği varsayımı altında, FROST protokolünün seçilmiş mesaj saldırılarına karşı güvenli olduğunu gösteren güvenlik kanıtları [burada](https://eprint.iacr.org/2020/852.pdf#page=16) sunulmuştur.

### FROST nasıl çalışır?

FROST protokolü iki önemli bileşenden oluşur:

İlk olarak, n katılımcı ortak bir doğrulama anahtarı oluşturmak için dağıtık anahtar oluşturma (DKG) protokolünü çalıştırır. Sonunda her katılımcı özel bir gizli anahtar payı ve herkese açık bir doğrulama anahtarı payı elde eder.

Ardından, n katılımcıdan herhangi t tanesi bir eşik imzalama protokolü çalıştırarak geçerli bir Schnorr imzasını birlikte oluşturabilir.

<a href="">
    <img src="/content-images/1634081807-frost-flexible-round-optimize-3697a713d9.webp" alt="" width="400" height="300"/>
</a>

## Görsel / Benzetme

FROST protokolünü, yalnızca birkaç yetkili anahtar sahibinin anahtarlarını birlikte çevirmesiyle açılan bir emanet kasası gibi düşünün; ancak tüm anahtar sahiplerinin katılması gerekmez, yalnızca belirli sayıda kişinin (örneğin, 5 kişiden herhangi 3'ünün) katılması yeterlidir. Kasa açıldığında dışarıdan bir gözlemci hangi anahtar sahiplerinin geldiğini, hatta birden fazla kişinin katıldığını bile anlayamaz. Aynı şekilde bir grup, Zcash işlemini ortaklaşa yetkilendirebilirken ağ yalnızca sıradan görünen tek bir imza görür.

## Derinlemesine İnceleme

**Dağıtık anahtar oluşturma (DKG)**

Bu aşamanın amacı, uzun ömürlü gizli anahtar payları ve ortak bir doğrulama anahtarı oluşturmaktır. Bu aşama n katılımcı tarafından yürütülür.

FROST, kendi anahtar oluşturma aşamasını Pedersen'in DKG'si (GJKR03) üzerine kurar. Bu protokol, alt yordamlar olarak hem Shamir'in gizli paylaşımını hem de Feldman'ın doğrulanabilir gizli paylaşım şemalarını kullanır. Ayrıca her katılımcı, diğer katılımcılara bir sıfır bilgi kanıtı göndererek kendi gizli bilgisini bildiğini göstermelidir; bu kanıtın kendisi de bir Schnorr imzasıdır. Bu ek adım, t ≥ n/2 olduğunda sahte anahtar saldırılarına karşı koruma sağlar.

DKG protokolünün sonunda ortak bir doğrulama anahtarı vk oluşturulur. Her katılımcı Pᵢ, uzun ömürlü gizli payı olan (i, skᵢ ) değerini ve vkᵢ = skᵢ *G doğrulama anahtarı payını tutar. Katılımcı Pᵢ'nin doğrulama anahtarı payı vkᵢ, imzalama aşamasında Pᵢ'nin imza paylarının doğruluğunu doğrulamak için diğer katılımcılar tarafından kullanılırken, doğrulama anahtarı vk grup tarafından verilen imzaları doğrulamak için harici taraflarca kullanılır.

**Eşik İmzalama**

Bu aşama, her imza için nonce değerini etkileşimsiz şekilde oluşturmak amacıyla toplamsal gizli paylaşım ve pay dönüşümü kullanan bilinen tekniklerden yararlanır. Ayrıca eşzamanlılığı kısıtlamadan bilinen sahtecilik saldırılarını önlemek için bağlayıcı tekniklerden de yararlanır.

Ön işleme aşamasında her katılımcı, daha sonra kullanılmak üzere sabit sayıda eliptik eğri (EC) noktası çifti hazırlar. Bu aşama, birden fazla eşik imzalama aşamasında bir kez yürütülür.

<a href="">
    <img src="/content-images/preprocess-5cbb14f892.webp" alt="" width="400" height="300"/>
</a>

İmzalama Turu 1: Her katılımcı Pᵢ, tek bir özel nonce çifti (dᵢ, eᵢ) ve buna karşılık gelen bir EC noktası çifti (Dᵢ, Eᵢ) oluşturarak işe başlar, ardından bu nokta çiftini diğer tüm katılımcılara yayınlar. Her katılımcı bu EC noktası çiftlerini daha sonra kullanmak üzere saklar. İmzalama turları 2 ve 3, n katılımcıdan t tanesinin geçerli bir Schnorr imzası oluşturmak için iş birliği yaptığı gerçek işlemlerdir.

İmzalama Turu 2: Katılımcılar geçerli bir Schnorr imzası oluşturmak için birlikte çalışır. Bu turun temel tekniği, t-out-of-t toplamsal gizli paylaşımdır.

Bu adım sahtecilik saldırılarını önler; çünkü saldırganlar farklı imzalama işlemlerindeki imza paylarını birleştiremez veya her imzalayanın imzalayan kümesini ya da yayımlanan noktalarını yeniden sıralayamaz.

<a href="">
    <img src="/content-images/sign-402794d36a.webp" alt="" width="400" height="300"/>
</a>

Katılımcılar meydan okuma c değerini hesapladıktan sonra, her katılımcı tek kullanımlık nonce değerlerini ve grubun uzun ömürlü anahtarının t-out-of-n (t-1 dereceli) Shamir gizli payları olan uzun vadeli gizli payları kullanarak zᵢ yanıtını hesaplayabilir. İmzalama turu 2'nin sonunda her katılımcı zᵢ değerini diğer katılımcılara yayınlar.

[Makalenin tamamını okuyun](https://eprint.iacr.org/2020/852.pdf)

### FROST protokolünün daha geniş ekosistemdeki kullanımı

**FROST, [Coinbase](https://github.com/coinbase/kryptology/tree/master/pkg/dkg/frost) içinde**

Coinbase'ün eşik imzalama sistemlerinin verimliliğini artırmak için FROST sürümünü geliştirdiler. Bu Coinbase uygulaması, özgün FROST taslağında küçük değişiklikler yapar.

İmza birleştirici rolünü kullanmamayı tercih ettiler. Bunun yerine her katılımcı bir imza birleştiricisi olur. Bu tasarım daha güvenlidir: Protokoldeki tüm katılımcılar diğerlerinin hesaplamalarını doğrulayarak daha yüksek bir güvenlik düzeyi sağlar ve riski azaltır. Uygulamayı hızlandırmak için tek seferlik ön işleme aşaması da kaldırıldı ve bunun yerine üçüncü bir imzalama turu kullanıldı.

---

**[Blockstream'in ROAST protokolü](https://eprint.iacr.org/2022/550.pdf)**

FROST protokolünde, Bitcoin için [Blockstream Liquid Sidechain](https://blog.blockstream.com/roast-robust-asynchronous-schnorr-threshold-signatures/) üzerinde kullanılmak üzere uygulamaya özgü bir iyileştirme önerilmiştir.

“ROAST, FROST gibi eşik imzası şemalarının etrafında çalışan basit bir sarmalayıcıdır. Ağ bağlantılarındaki gecikme keyfi ölçüde yüksek olsa bile, aksatıcı imzalayanların varlığında dürüst imzalayanlardan oluşan bir yeter sayının (ör. Liquid görevlilerinin) her zaman geçerli bir imza elde edebilmesini garanti eder.”

---

**FROST IETF'de**

1986'da kurulan Internet Engineering Task Force, internet için önde gelen standart geliştirme kuruluşudur. IETF, internet kullanıcıları, ağ operatörleri ve ekipman satıcıları tarafından sıklıkla benimsenen gönüllü standartlar geliştirerek internetin geleceğinin şekillenmesine yardımcı olur.

FROST sürüm 11 (iki turlu varyant) [IRTF'ye sunulmuştur](https://datatracker.ietf.org/doc/draft-irtf-cfrg-frost/11/). Bu, FROST protokolünün önümüzdeki yıllarda internette, donanım cihazlarında ve diğer hizmetlerde kullanılacak yeni bir eşik imzası standardı olarak kapsamlı biçimde değerlendirilmesine yönelik önemli bir adımdır.


## Pratik Etkileri

Kesinlikle. FROST protokolünün Zcash eklenmesi, coğrafi olarak birbirinden uzakta bulunan birden fazla tarafın korumalı ZEC harcama yetkisini kontrol etmesini sağlayacaktır. Bu imza şeması kullanılarak yayınlanan işlemler ağdaki diğer işlemlerden ayırt edilemez; böylece ödeme takibine karşı güçlü direnç korunur ve analiz için kullanılabilir blokzincir verisi miktarı sınırlanır.

Uygulamada bu, emanet hizmeti sağlayıcılarından diğer gözetimsiz hizmetlere kadar ağ üzerinde çok çeşitli yeni uygulamaların oluşturulmasını mümkün kılar.

FROST, Zcash Shielded Assets (ZSA) varlıklarının güvenli biçimde ihraç edilmesi ve yönetilmesinde de önemli bir bileşen haline gelecek; geliştirme kuruluşları ve ZEC borsalar gibi saklama kuruluşları içinde harcama yetkisinin daha güvenli yönetilmesini sağlarken bu özelliği Zcash kullanıcılara da sunacaktır.

## Yaygın Hatalar

**FROST protokolünü geleneksel zincir üstü çoklu imzayla karıştırmak**. Geleneksel çoklu imza, zincir üstünde birden fazla imzalayanı veya imzayı açığa çıkarabilir. FROST protokolü tek bir birleştirilmiş Schnorr imza oluşturur; bu nedenle işlem, tek imzalı bir işlemden ayırt edilemez.

**Eşik sayısından daha az katılımcının imza atabileceğini varsaymak**. Yalnızca belirli sayıda katılımcının (t-out-of-n) birlikte hareket etmesi geçerli bir imza oluşturabilir; daha küçük bir grup bunu yapamaz.

**FROST protokolünün zincir dışındaki her şeyi gizlediğini varsaymak**. FROST protokolü zincir üstü imzayı korur; ancak imzalayanlar arasındaki koordinasyon yine zincir dışında gerçekleşir ve kendine ait gizlilik ve güvenlik önlemleri gerektirir.


## İlgili Sayfalar

- [Halo](/zcash-tech/halo) — Zcash'ün Orchard havuzunda kullanılan güven gerektirmeyen, özyinelemeli kanıt sistemi.
- [Görüntüleme Anahtarları](/zcash-tech/viewing-keys) — korumalı işlemler için seçici açıklama.
- [Zcash Shielded Assets](/zcash-tech/zcash-shielded-assets) — FROST protokolünün harcama/ihraç yetkisinin yönetilmesine yardımcı olduğu alan.
- [Zcash Cüzdan Eşitleme](/zcash-tech/zcash-wallet-syncing) — Zcash gizlilik altyapısının bir diğer temel bileşeni.


## Daha Fazla Bilgi

[Coinbase Makale - Eşik İmzaları](https://www.coinbase.com/blog/threshold-digital-signatures)

[Shamir Gizli Paylaşımı - Açıklama ve Örnek](https://www.geeksforgeeks.org/shamirs-secret-sharing-algorithm-cryptography/)

[Schnorr Dijital İmzalar hakkında kısa video](https://youtu.be/r9hJiDrtukI?t=19)

___
___
