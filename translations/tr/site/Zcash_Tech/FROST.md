<a href="https://github.com/zechub/zechub/edit/main/site/Zcash_Tech/FROST.md" target="_blank">
  <img src="https://img.shields.io/badge/Edit-blue" alt="Edit Page"/>
</a>
# FROST


## Kısaca

* FROST (Flexible Round-Optimised Schnorr Threshold Signatures), bir eşik imza ve dağıtık anahtar üretim protokolüdür: birden fazla imzacı ortak bir özel anahtarın bir payını elinde tutar ve tek bir imza üretmek için bunların eşik sayıda olanının birlikte çalışması gerekir.
* Sonuç tek bir Schnorr imzası olduğu için, bu şekilde yapılan bir işlem ağ üzerinde sıradan bir işlem gibi görünür.
* Minimum sayıda iletişim turu gerektirir, paralel çalışabilir ve kötü davranan bir katılımcıyı tespit edip dışlayabilir.
* Zcash için bu, FROST'un coğrafi olarak farklı yerlerde bulunan birden fazla tarafın shielded ZEC harcama yetkisini kontrol etmesini sağladığı anlamına gelir — saklama, emanet, saklama dışı hizmetler ve Zcash Shielded Assets (ZSA) için kullanışlıdır.
* Chelsea Komlo (University of Waterloo, Zcash Foundation) ve Ian Goldberg (University of Waterloo) tarafından oluşturulmuştur.

## Temel Açıklama

### Schnorr imzası nedir?

Bir Schnorr dijital imzası bir algoritma kümesidir: (KeyGen, Sign, Verify).

Schnorr imzalarının çeşitli avantajları vardır. Önemli avantajlardan biri, aynı mesajı imzalamak için birden fazla anahtar kullanıldığında ortaya çıkan imzaların tek bir imzada birleştirilebilmesidir. Bu, multisig ödemelerin ve multisig ile ilgili diğer işlemlerin boyutunu önemli ölçüde azaltabilir.

### FROST nedir?

**Flexible Round-Optimised Schnorr Threshold Signatures** -
*Chelsea Komlo (University of Waterloo, Zcash Foundation) ve Ian Goldberg (University of Waterloo) tarafından oluşturulmuştur.*

FROST, minimum iletişim turu gerektiren ve paralel olarak çalıştırılabilen bir eşik imza ve dağıtık anahtar üretim protokolüdür. FROST protokolü, Schnorr imza şemasının eşik sürümüdür.

Tek taraflı ortamlardaki imzaların aksine, eşik imzalar ortak bir özel anahtarın bir payını elinde tutan eşik sayıda imzacının iş birliğini gerektirir.

[Eşik İmzalar Nedir? Chelsea Komlo - Zcon3](https://youtu.be/cAfTTfblzoU?t=110)

Sonuç olarak, eşik ortamında imza üretmek, imzacılar arasındaki ağ turları nedeniyle ek yük doğurur; bu da gizli payların ağ açısından sınırlı cihazlarda saklandığı veya koordinasyonun güvenilmez ağlar üzerinden gerçekleştiği durumlarda maliyetli hâle gelir.

İmzalama işlemleri sırasındaki ağ yükü, sahtecilik saldırılarına karşı koruma sağlayan ve diğer şemalara da uygulanabilen yeni bir teknik kullanılarak azaltılır.

FROST, sınırsız sayıda imzalama işleminin güvenli bir şekilde paralel olarak (eşzamanlılık) yürütülmesine izin vererek eşik imza protokollerini geliştirir.

İmzacıların toplamda 2 mesaj gönderip aldığı 2 turlu bir protokol olarak ya da bir ön işleme aşamasına sahip optimize edilmiş tek turlu bir imzalama protokolü olarak kullanılabilir.

FROST, verimlilik iyileştirmelerini kısmen, kötü davranan bir katılımcının varlığında protokolün durdurulmasına izin vererek elde eder; bu katılımcı daha sonra tespit edilir ve gelecekteki işlemlerden dışlanır.

FROST'un, ayrık logaritma probleminin zor olduğu ve saldırganın eşikten daha az katılımcıyı kontrol ettiği varsayımı altında seçilmiş mesaj saldırılarına karşı güvenli olduğunu gösteren güvenlik ispatları [burada](https://eprint.iacr.org/2020/852.pdf#page=16) sunulmuştur.

### FROST nasıl çalışır?

FROST protokolü iki önemli bileşen içerir:

İlk olarak, n katılımcı ortak bir doğrulama anahtarı üretmek için bir dağıtık anahtar üretim (DKG) protokolü çalıştırır. Sonunda her katılımcı bir özel gizli anahtar payı ve bir açık doğrulama anahtarı payı elde eder.

Daha sonra, n içinden herhangi bir t katılımcı birlikte geçerli bir Schnorr imzası üretmek için bir eşik imzalama protokolü çalıştırabilir.

<a href="">
    <img src="https://static.cryptohopper.com/images/news/uploads/1634081807-frost-flexible-round-optimized-schnorr-threshold-signatures-1.jpg" alt="" width="400" height="300"/>
</a>

## Görsel / Benzetme

FROST'u, yalnızca birkaç yetkili anahtar sahibinin anahtarlarını birlikte çevirdiğinde açılan bir kasa gibi düşünün — ancak her anahtar sahibinin bulunması gerekmez; yalnızca belirli bir sayısı yeterlidir (örneğin 5 kişiden herhangi 3'ü). Kasa açıldığında, dışarıdan bakan biri hangi anahtar sahiplerinin geldiğini, hatta birden fazlasının dahil olup olmadığını bile anlayamaz. Aynı şekilde, bir grup bir Zcash işlemini birlikte yetkilendirebilirken ağ yalnızca sıradan görünen tek bir imza görür.

## Derinlemesine İnceleme

**Dağıtık anahtar üretimi (DKG)**

Bu aşamanın amacı, uzun ömürlü gizli anahtar payları ve ortak bir doğrulama anahtarı üretmektir. Bu aşama n katılımcı tarafından yürütülür.

FROST, kendi anahtar üretim aşamasını, alt yordamlar olarak hem Shamir'ın gizli paylaşımını hem de Feldman'ın doğrulanabilir gizli paylaşım şemalarını kullanan Pedersen'ın DKG'si (GJKR03) üzerine kurar. Buna ek olarak, her katılımcı kendi sırrını bildiğini diğer katılımcılara sıfır bilgi ispatı göndererek göstermek zorundadır; bu ispatın kendisi de bir Schnorr imzasıdır. Bu ek adım, t ≥ n/2 olduğunda rogue-key saldırılarına karşı koruma sağlar.

DKG protokolünün sonunda ortak bir doğrulama anahtarı vk üretilir. Her katılımcı Pᵢ, uzun ömürlü gizli payı olan bir (i, skᵢ ) değeri ve bir doğrulama anahtarı payı vkᵢ = skᵢ *G tutar. Katılımcı Pᵢ'nin doğrulama anahtarı payı vkᵢ, imzalama aşamasında Pᵢ'nin imza paylarının doğruluğunu diğer katılımcıların doğrulaması için kullanılırken, doğrulama anahtarı vk ise grup tarafından verilen imzaları dış tarafların doğrulaması için kullanılır.

**Eşik İmzalama**

Bu aşama, her imza için nonce'u etkileşimsiz şekilde üretmek amacıyla toplamsal gizli paylaşım ve pay dönüşümünü kullanan bilinen teknikler üzerine inşa edilir. Ayrıca eşzamanlılığı sınırlamadan bilinen sahtecilik saldırılarından kaçınmak için bağlayıcı tekniklerden de yararlanır.

Ön işleme aşamasında, her katılımcı daha sonra kullanmak üzere sabit sayıda Eliptik Eğri (EC) noktası çifti hazırlar. Bu aşama, birden fazla eşik imzalama aşaması boyunca bir kez çalıştırılır.

<a href="">
    <img src="https://i.ibb.co/nQD1c3n/preprocess.png" alt="" width="400" height="300"/>
</a>

İmzalama Turu 1: Her katılımcı Pᵢ, tek bir özel nonce çifti (dᵢ, eᵢ) ve buna karşılık gelen EC noktaları çifti (Dᵢ, Eᵢ) üreterek başlar, ardından bu nokta çiftini diğer tüm katılımcılara yayınlar. Her katılımcı bu EC noktası çiftlerini daha sonra kullanmak üzere saklar. İmzalama turları 2 ve 3, n içinden t katılımcının birlikte geçerli bir Schnorr imzası oluşturduğu asıl işlemlerdir.

İmzalama Turu 2: Katılımcılar birlikte geçerli bir Schnorr imzası oluşturmak için çalışır. Bu turun arkasındaki temel teknik, t-içinden-t toplamsal gizli paylaşımdır.

Bu adım sahtecilik saldırılarını engeller çünkü saldırganlar farklı imzalama işlemlerindeki imza paylarını birleştiremez veya her imzacı için imzacı kümesini ya da yayınlanan noktaları permüte edemez.

<a href="">
    <img src="https://i.ibb.co/b5rJbXx/sign.png" alt="" width="400" height="300"/>
</a>

Meydan okuma c hesaplandıktan sonra, her katılımcı tek kullanımlık nonce'ları ve grubun uzun ömürlü anahtarının t-içinden-n (derece t-1) Shamir gizli payları olan uzun vadeli gizli payları kullanarak yanıt zᵢ'yi hesaplayabilir. İmzalama turu 2'nin sonunda her katılımcı zᵢ'yi diğer katılımcılara yayınlar.

[Tam makaleyi okuyun](https://eprint.iacr.org/2020/852.pdf)

### Daha geniş ekosistemde FROST kullanımı

**[Coinbase](https://github.com/coinbase/kryptology/tree/master/pkg/dkg/frost) içinde FROST**

Coinbase'in eşik imzalama sistemlerinin verimliliğini artırmak için, FROST'un bir sürümünü geliştirdiler. Bu Coinbase uygulaması, özgün FROST taslağından küçük değişiklikler içerir.

İmza toplayıcı rolünü kullanmamayı tercih ettiler. Bunun yerine her katılımcı bir imza toplayıcısıdır. Bu tasarım daha güvenlidir: protokoldeki tüm katılımcılar diğerlerinin hesaplamalarını doğrular, böylece daha yüksek bir güvenlik seviyesi elde edilir ve risk azaltılır. Tek seferlik ön işleme aşaması da uygulamayı hızlandırmak için kaldırılmış, bunun yerine üçüncü bir imzalama turu kullanılmıştır.

---

**Blockstream tarafından geliştirilen [ROAST](https://eprint.iacr.org/2022/550.pdf)**

Bitcoin için [Blockstream Liquid Sidechain](https://blog.blockstream.com/roast-robust-asynchronous-schnorr-threshold-signatures/) üzerinde kullanılmak üzere FROST üzerinde uygulamaya özel bir iyileştirme önerilmiştir.

“ROAST, FROST gibi eşik imza şemaları etrafındaki basit bir sarmalayıcıdır. Ağ bağlantıları keyfi derecede yüksek gecikmeye sahip olduğunda bile, örneğin Liquid functionaries gibi dürüst imzacıların oluşturduğu bir yeter sayının, bozucu imzacıların varlığında her zaman geçerli bir imza elde edebilmesini garanti eder.”

---

**IETF içinde FROST**

1986 yılında kurulan Internet Engineering Task Force, internet için önde gelen standart geliştirme kuruluşudur. IETF, internet kullanıcıları, ağ operatörleri ve ekipman üreticileri tarafından sıklıkla benimsenen gönüllü standartlar geliştirir ve internetin gidişatını şekillendirmeye yardımcı olur.

FROST sürüm 11 (iki turlu varyant), [IRTF'ye sunulmuştur](https://datatracker.ietf.org/doc/draft-irtf-cfrg-frost/11/). Bu, FROST'un önümüzdeki yıllarda internet genelinde, donanım cihazlarında ve diğer hizmetlerde kullanılmak üzere yeni bir eşik imza şeması standardı olarak tam değerlendirilmesine doğru atılmış önemli bir adımdır.


## Pratik Sonuçlar

Kesinlikle evet. FROST'un Zcash'e eklenmesi, coğrafi olarak ayrılmış birden fazla tarafın shielded ZEC harcama yetkisini kontrol etmesine olanak tanıyacaktır. Bu imza şeması kullanılarak yayınlanan işlemler, ağdaki diğer işlemlerden ayırt edilemez olacak; böylece ödeme takibine karşı güçlü direnç korunacak ve analiz için उपलब्ध blockchain verisi miktarı sınırlanacaktır.

Pratikte bu, emanet sağlayıcılarından diğer saklama dışı hizmetlere kadar uzanan çok çeşitli yeni uygulamaların ağ üzerinde inşa edilmesini mümkün kılar.

FROST ayrıca, Zcash Shielded Assets (ZSA)'nin güvenli ihraç ve yönetiminde temel bir bileşen hâline gelecek; borsalar gibi geliştirme organizasyonları ve ZEC saklayıcıları içinde harcama yetkisinin daha güvenli yönetilmesini sağlarken, bu yeteneği Zcash kullanıcılarına da sunacaktır.

## Yaygın Hatalar

**FROST'u geleneksel on-chain multisig ile karıştırmak**. Geleneksel multisig, on-chain olarak birden fazla imzacıyı veya birden fazla imzayı açığa çıkarabilir. FROST tek bir birleştirilmiş Schnorr imzası üretir, bu nedenle bir işlem tek imzalı bir işlemden ayırt edilemez.

**Eşikten daha az sayıda kişinin imza atabileceğini varsaymak**. Yalnızca birlikte hareket eden eşik sayıda (n içinden t) katılımcı geçerli bir imza üretebilir; bundan daha küçük herhangi bir grup bunu yapamaz.

**FROST'un off-chain her şeyi gizlediğini varsaymak**. FROST on-chain imzayı korur, ancak imzacılar arasındaki koordinasyon yine de off-chain gerçekleşir ve kendi gizlilik ve güvenlik kontrollerini gerektirir.


## İlgili Sayfalar

- [Halo](/zcash-tech/halo) — Zcash'in Orchard havuzunda kullanılan güven gerektirmeyen, özyinelemeli ispat sistemi.
- [Viewing Keys](/zcash-tech/viewing-keys) — shielded işlemler için seçici ifşa.
- [Zcash Shielded Assets](/zcash-tech/zcash-shielded-assets) — FROST'un harcama/ihraç yetkisini yönetmeye yardımcı olduğu alan.
- [Zcash Wallet Syncing](/zcash-tech/zcash-wallet-syncing) — Zcash gizlilik altyapısının bir diğer temel parçası.


## Daha Fazla Öğrenme

[Coinbase Makalesi - Eşik İmzalar](https://www.coinbase.com/blog/threshold-digital-signatures)

[Shamir Secret Sharing - Açıklama ve Örnek](https://www.geeksforgeeks.org/shamirs-secret-sharing-algorithm-cryptography/)

[Schnorr Dijital İmzaları Hakkında Kısa Video](https://youtu.be/r9hJiDrtukI?t=19)

___
___
