<a href="https://github.com/zechub/zechub/edit/main/site/Zcash_Tech/Zcash_Wallet_Syncing.md" target="_blank">
  <img src="https://img.shields.io/badge/Edit-blue" alt="Edit Page"/>
</a>

# Zcash Cüzdan Senkronizasyonu

## Kısaca

* Shielded Zcash işlemleri ayrıntılarını gizlediği için, bir sunucu Bitcoin veya Ethereum gibi şeffaf coin’lerde yapabildiği şekilde bir cüzdanın bakiyesini basitçe sorgulayamaz.
* Hafif cüzdanlar, uzmanlaşmış bir sunucudan (lightwalletd) küçük “compact block”lar indirir ve ilgili verileri özel anahtarlarıyla kendileri deşifre eder.
* Bu block’ları deşifre edip işlemek zaman aldığından, cüzdanlar fonlarınızı daha erken kullanabilmeniz için daha hızlı senkronizasyon yöntemleri kullanır.
* Dikkate değer yaklaşımlar: Warp Sync (YWallet), Spend-before-sync (Zcash Mobile Wallet SDK V2), Blaze Sync (Zecwallet) ve önerilen DAGSync.
* Bu yöntemler genel olarak daha hızlı senkronizasyon karşılığında ek bellek veya işlem gücü kullanır.

## Temel Açıklama

### Zcash senkronizasyonu nasıl çalışır

Zcash, işlem ayrıntılarını yetkisiz taraflardan gizlemek için zero-knowledge proofs kullanır. Bu gizlilik, hafif cüzdanlar için senkronizasyonu daha zor hale getirir; çünkü bu cüzdanlar tam blokzinciri yerel olarak saklamaz ve bunun yerine gerekli bilgiler için bir sunucuya güvenir. Bitcoin veya Ethereum’da sunucular blokzinciri indeksleyip hesap verilerini hızlıca döndürebilir. Ancak Zcash’te sunucu işlem ayrıntılarını göremez. Öyleyse bir hafif cüzdan, tüm blokzinciri kendi başına indirip deşifre etmeden bakiyesini ve geçmişini nasıl senkronize edebilir?

Zcash bu sorunu birden fazla yaklaşımı birleştirerek çözer. Tam node’dan verileri süzen ve yalnızca işlem tanımlaması için gerekenleri tutan, lightwalletd adlı uzmanlaşmış bir sunucuya sahiptir. Bu verilere compact block denir ve bunlar orijinal block’lardan çok daha küçüktür. Hafif cüzdanlar önce bu compact block’ları lightwalletd sunucusundan indirir, ardından bunları özel anahtarlarıyla deşifre eder.

Bu compact block’ları deşifre edip işlemek bile, özellikle block başına çok sayıda işlem olduğunda, ciddi zaman alabilir. Bu yüzden cüzdanlar senkronizasyonu hızlandırmak ve fonlarınızı mümkün olan en kısa sürede kullanmanıza izin vermek için farklı yöntemler kullanır.

## Görsel / Benzetme

Blokzinciri, kilitli kutularla dolu devasa bir posta odası gibi düşünün. Şeffaf bir coin’de posta odası görevlisi etiketleri okuyabilir ve hangi kutuların size ait olduğunu anında söyleyebilir. Zcash’te ise etiketler gizlidir — bu yüzden cüzdanınız anahtarlarını alıp hangi kutuları açabildiğini bulmak için kutuları sessizce kendi kontrol etmek zorundadır. Aşağıdaki senkronizasyon yöntemleri, bu kutuları daha hızlı kontrol etmek için kullanılan farklı stratejilerdir.

## Derinlemesine İnceleme

### Warp Sync

Warp sync, her compact block’u deşifre edip işleyen ara adımları atlayarak doğrudan nihai sonuca geçen bir YWallet özelliğidir.

Bunu yapmak için, her adımı tek tek geçmeden nihai sonucu hesaplamak üzere matematik ve kriptografi kullanır.

Warp sync saniyede binlerce block işleyebilir; bu da alışılmış senkronizasyon yönteminden çok daha hızlıdır. Bu, YWallet kullanıcılarının hesaplarında yüz binlerce işlem ve alınmış note olsa bile hızlı ve akıcı bir performans deneyimleyebileceği anlamına gelir.

Bu adım atlama tekniğinin yanı sıra, YWallet birden fazla block’u aynı anda işleyebilir ve süreci daha da hızlandırmak için yükü mevcut donanımınıza dağıtır.

[Warp Sync hakkında daha fazlasını okuyun](https://ywallet.app/warp/)

### Spend-before-sync

Spend-before-sync, Zcash Mobile Wallet SDK V2 içindeki yeni bir özelliktir; kullanıcıların tam cüzdan senkronizasyonunu beklemeden, cüzdanlarını açar açmaz fonlarını anında harcayabilmesini sağlar. Bu özellik, cüzdanın harcanabilir bakiyesinin daha hızlı bulunmasını sağlar ve kullanıcı deneyimini iyileştirir.

Spend-before-sync, lightwalletd sunucusundaki block’ları doğrusal olmayan bir sırayla işleyen bir compact-block senkronizasyon algoritması kullanarak çalışır. Bu da, bir sonraki block’a geçmeden önce tek bir block’un tamamen işlenmesini beklemek yerine, cüzdanların biraz daha fazla bellek ve işlem gücü kullanarak blokzincirin farklı bölümlerini tarayabilmesi anlamına gelir. Genellikle farklı aralıkları tarar; eski block’lar indirilip işlenirken daha yeni işlemleri arar. Yakın tarihli, harcanmamış bir note bulunursa, hemen kullanılabilir hale getirilir.

<a href="">
    <img src="https://github.com/ZecHub/zechub/assets/9355622/363d08df-b7b7-461b-a386-251d9ad702ca" alt="" width="140" height="150"/>
</a>

### Blaze Sync

Zecwallet ekibi tarafından geliştirilen Blaze sync, en yüksek ve en yeni block’tan başlayıp geriye doğru ilerleyerek blokzinciri tarayan, hafif cüzdanlar için bir senkronizasyon algoritmasıdır.

Bu, cüzdanın alınan note’lardan önce harcanan note’ları bulmasını sağlar ve daha önce harcanmamış olan note’ları, tam senkronizasyon sürecinin bitmesini beklemeden kullanılabilir hale getirir.

Bunun yanında, senkronizasyonun bileşenlerini birbirinden ayırarak — block indirme, deneme amaçlı deşifreler gerçekleştirme ve witness’ları güncelleme — ve bunları paralel işleyerek Out-of-Order Sync kullanır. Bu daha fazla bellek ve CPU kaynağı gerektirir, ancak senkronizasyon hızını 5 kat artırır.

### DAGSync

DAGSync, senkronizasyonu hızlandırarak Zcash shielded cüzdanlarının kullanıcı deneyimini iyileştirmeyi amaçlayan önerilmiş bir senkronizasyon algoritmasıdır.

Bir Zcash cüzdanındaki note’lar, witness’lar ve nullifier’lar arasındaki bağımlılıkları temsil etmek için bir [Directed Acyclic Graph (DAG)](https://words.str4d.xyz/dagsync-graph-aware-zcash-wallets/) kullanır.

DAG, her kenarın iki node arasındaki ilişkiyi gösteren bir yön taşıdığı, node’lar ve kenarlardan oluşan bir veri yapısıdır. DAG’de döngü bulunmaz; yani bir node’dan başlayıp kenarları takip ederek tekrar aynı node’a dönmenin bir yolu yoktur.

<a href="">
    <img src="https://github.com/ZecHub/zechub/assets/9355622/eee7e08d-5c98-4c88-a48e-12f7a92a195f" alt="" width="110" height="230"/>
</a>

## Pratik Sonuçlar

İlginç şekilde, tüm bu mekanizmalar Zcash Security’nin [Ölçeklenebilir Özel Mesajlaşma](https://zecsec.com/posts/scalable-private-money-needs-scalable-private-messaging/) hakkındaki gönderisinde gündeme getirdiği soruları ve bunun özel ödeme sistemleriyle ilişkisini ele almayı amaçlar. Hatta bazıları, bir adrese özel veriler hariç, tüm memo verilerini sunuculardan indirme gibi ek bir adım da atar; bu da biraz daha fazla kaynak kullanımı pahasına gizliliği artırır.

Ayrıca, Zcash Foundation hafif cüzdanların performansını iyileştirmek için başka alternatifleri de inceliyor. Bu, vakfın “Zcash cüzdan kullanıcılarını etkileyen son performans sorunlarına potansiyel bir çözüm sunup sunmadığını belirlemek” için üzerinde çalıştığı bir yapı olan [Oblivious Message Retrieval (OMR)](https://zfnd.org/oblivious-message-retrieval/) için de geçerlidir.

## Yaygın Hatalar

**lightwalletd sunucusunun bakiyenizi bildiğini varsaymak.** Sunucu yalnızca compact block’ları iletir; cüzdanınız bunları kendi anahtarlarınızla yerel olarak deşifre eder ve yorumlar.

**Senkronizasyonu çok erken durdurmak.** Bazı yöntemler, tam senkronizasyon tamamlanmadan yakın tarihli harcanabilir fonları kullanılabilir hale getirir; ancak eski geçmiş ve note’lar hâlâ işleniyor olabilir.

**Zcash senkronizasyonunu doğrudan şeffaf zincir senkronizasyonuyla karşılaştırmak.** Daha yavaş bir yol, bir kusur değil gizliliği korumanın bedeli olabilir — cüzdan, halka açık coin sunucusunun hesabınızı açıkça okuyarak yapacağı işi kendisi yapmaktadır.


## İlgili Sayfalar

- [Lightwallet Node’ları](/zcash-tech/lightwallet-nodes) — hafif cüzdanların dayandığı lightwalletd altyapısı.
- [Viewing Key’ler](/zcash-tech/viewing-keys) — cüzdanların kendi note’larını tespit etmek ve deşifre etmek için kullandığı anahtarlar.
- [Pepper Sync](/zcash-tech/pepper-sync) — Zcash cüzdan senkronizasyonuna yönelik başka bir yaklaşım.
- [FROST](/zcash-tech/frost) — shielded ZEC için dağıtık imzalama yetkisi.
