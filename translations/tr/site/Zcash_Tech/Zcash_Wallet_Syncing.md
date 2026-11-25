<a href="https://github.com/zechub/zechub/edit/main/site/Zcash_Tech/Zcash_Wallet_Syncing.md" target="_blank">
  <img src="https://img.shields.io/badge/Edit-blue" alt="Sayfayı düzenle"/>
</a>

# Zcash Cüzdan Senkronizasyonu

## Özet

* Korumalı Zcash işlemler ayrıntılarını gizlediğinden, bir sunucu Bitcoin veya Ethereum gibi şeffaf coinlerde yapabildiği gibi cüzdan bakiyesine doğrudan bakamaz.
* Hafif cüzdanlar, özel bir sunucudan (lightwalletd) küçük “kompakt bloklar” indirir ve ilgili verilerin şifresini kendi özel anahtarlarıyla çözer.
* Bu blokların şifresini çözmek ve işlemek zaman alır; bu nedenle cüzdanlar, fonlarınızı daha erken kullanabilmeniz için daha hızlı senkronizasyon yöntemlerinden yararlanır.
* Öne çıkan yaklaşımlar: Warp Sync (YWallet), Senkronizasyondan önce harcama (Zcash Mobile Wallet SDK V2), Blaze Sync (Zecwallet) ve önerilen DAGSync.
* Bu yöntemler genellikle daha hızlı senkronizasyon karşılığında daha fazla bellek veya işlem gücü kullanır.

## Temel Açıklama

### Zcash senkronizasyonu nasıl çalışır?

Zcash, işlem ayrıntılarını yetkisiz taraflardan korumak için sıfır bilgi kanıtları kullanır. Bu gizlilik, hafif cüzdanların yerel olarak tüm blokzinciri saklamamaları ve gerekli bilgiler için bir sunucuya güvenmeleri nedeniyle senkronizasyonu zorlaştırır. Bitcoin veya Ethereum'da sunucular blokzinciri dizine ekleyip hesap verilerini hızla döndürebilir. Ancak Zcash ile sunucu işlem ayrıntılarını göremez. Peki hafif bir cüzdan, tüm blokzinciri indirip şifresini kendisi çözmeden bakiyesini ve işlem geçmişini nasıl senkronize edebilir?

Zcash bu sorunu birden çok yaklaşımı birleştirerek çözer. İşlem tanımlaması için yalnızca gerekli verileri tutan ve bir tam düğümden gelen verileri filtreleyen özel bir sunucuya, lightwalletd, sahiptir. Bu verilere kompakt bloklar denir ve bunlar orijinal bloklardan çok daha küçüktür. Hafif cüzdanlar önce bu kompakt blokları lightwalletd sunucusundan indirir, sonra özel anahtarlarıyla şifrelerini çözer.

Bu kompakt blokların şifresini çözmek ve onları işlemek bile, özellikle blok başına çok sayıda işlem olduğunda, kayda değer zaman alabilir. Bu nedenle cüzdanlar, senkronizasyonu hızlandırmak ve fonlarınızı mümkün olan en kısa sürede kullanabilmenizi sağlamak için farklı yöntemlerden yararlanır.

## Görsel / Benzetme

Blokzinciri kilitli kutularla dolu devasa bir posta odası olarak düşünün. Şeffaf bir coin söz konusu olduğunda, posta odası görevlisi etiketleri okuyup hangi kutuların size ait olduğunu hemen söyleyebilir. Zcash söz konusu olduğunda etiketler gizlidir; dolayısıyla cüzdanınızın, açabildiği kutuları bulmak için anahtarlarını alıp kutuları sessizce tek tek kontrol etmesi gerekir. Aşağıdaki senkronizasyon yöntemleri, bu kutuları daha hızlı kontrol etmenin farklı yollarıdır.

## Derinlemesine İnceleme

### Warp Sync

Warp Sync, her bir kompakt bloğu çözme ve işleme ara adımlarını atlayıp doğrudan nihai sonuca ulaşan bir YWallet özelliğidir.

Bunu yapmak için, her adımı tek tek izlemek yerine nihai sonucu matematik ve kriptografi kullanarak hesaplar.

Warp Sync saniyede binlerce bloğu işleyebilir; bu, olağan senkronizasyon yönteminden çok daha hızlıdır. Böylece YWallet kullanıcıları, hesaplarında yüz binlerce işlem ve alınmış note olsa bile hızlı ve akıcı bir performanstan yararlanabilir.

Bu adımları atlama tekniğinin yanı sıra YWallet, işlemi daha da hızlandırmak için yükü mevcut donanımınıza dağıtarak birden fazla bloğu aynı anda işleyebilir.

[Warp Sync](https://ywallet.app/warp/) hakkında daha fazla bilgi

> Warp Sync burada bir senkronizasyon tekniği olarak açıklanıyor. Ywallet artık bakımı yapılmıyor ve Ironwood için güncellenmeyecek; dolayısıyla bugün yükleyebileceğiniz bir cüzdan değil.

### Senkronizasyondan önce harcama

Senkronizasyondan önce harcama, Zcash Mobile Wallet SDK V2'de yer alan yeni bir özelliktir. Kullanıcıların cüzdanlarını açar açmaz, cüzdanın tümüyle senkronize olmasını beklemeden fonlarını harcamasına olanak tanır. Bu özellik, cüzdanın harcanabilir bakiyesinin bulunmasını hızlandırır ve kullanıcı deneyimini iyileştirir.

Senkronizasyondan önce harcama, lightwalletd sunucusundan gelen blokları doğrusal olmayan bir sırayla işleyen kompakt blok senkronizasyon algoritmasıyla çalışır. Yani cüzdanlar, bir sonraki bloğa geçmeden önce mevcut bloğun tümüyle işlenmesini beklemek yerine, biraz daha fazla bellek ve işlem gücü kullanarak blokzincirin farklı bölümlerini tarayabilir. Genellikle farklı aralıkları tarar; eski bloklar indirilip işlenirken daha yeni işlemleri arar. Yakın zamanda alınmış ve harcanmamış bir note bulunursa hemen kullanılabilir hâle getirilir.

<a href="">
    <img src="/content-images/363d08df-b7b7-461b-a386-251d9ad702ca-a857cd8385.webp" alt="" width="140" height="150"/>
</a>

### Blaze Sync

Zecwallet ekibi tarafından geliştirilen Blaze Sync, blokzinciri en yüksek ve en güncel bloktan başlayarak geriye doğru tarayan hafif cüzdanlara yönelik bir senkronizasyon algoritmasıdır.

Bu sayede cüzdan, alınan note'lardan önce harcanan note'ları bulabilir ve daha önce harcanmamış note'ları tüm senkronizasyon işleminin tamamlanmasını beklemeden kullanılabilir hâle getirebilir.

Ayrıca, senkronizasyon bileşenlerini birbirinden ayırarak Sırasız Senkronizasyon (Out-of-Order Sync) kullanır: blokları indirme, deneme amaçlı şifre çözme ve tanıkları güncelleme işlemleri paralel olarak yürütülür. Bu yöntem daha fazla bellek ve CPU kaynağı kullanır, ancak senkronizasyon hızını 5 kat artırır.

### DAGSync

DAGSync, Zcash korumalı cüzdanlarda senkronizasyonu hızlandırarak kullanıcı deneyimini iyileştirmeyi amaçlayan önerilen bir senkronizasyon algoritmasıdır.

[Yönlendirilmiş Döngüsüz Grafiği (DAG)](https://words.str4d.xyz/dagsync-graph-aware-zcash-wallets/), bir Zcash cüzdanındaki note'lar, tanıklar ve nullifier'lar arasındaki bağımlılıkları göstermek için kullanır.

DAG, düğümler ve kenarlardan oluşan bir veri yapısıdır; her kenarın iki düğüm arasındaki ilişkiyi belirten bir yönü vardır. DAG'de döngü bulunmaz; yani bir düğümden başlayıp kenarları izleyerek aynı düğüme geri dönmek mümkün değildir.

<a href="">
    <img src="/content-images/eee7e08d-5c98-4c88-a48e-12f7a92a195f-316493530f.webp" alt="" width="110" height="230"/>
</a>

## Uygulamadaki Etkileri

İlginçtir ki, tüm bu mekanizmalar Zcash Security'nin [Ölçeklenebilir Özel Mesajlaşma](https://zecsec.com/posts/scalable-private-money-needs-scalable-private-messaging/) başlıklı gönderisinde dile getirdiği soruları ve bunların özel ödeme sistemleriyle ilişkisini ele almayı amaçlar. Bazı yöntemler, bir adrese özel olanlar dışındaki tüm memo verilerini sunuculardan indirmek gibi ek bir adım da atar; bu, biraz daha fazla kaynak kullanımı karşılığında gizliliği artırır.

Ayrıca Zcash Foundation, hafif cüzdanların performansını artırmak için başka alternatifleri de inceliyor. Bunlardan biri, vakfın “Zcash cüzdan kullanıcılarını etkileyen yakın tarihli performans sorunlarına potansiyel bir çözüm sunup sunmadığını belirlemek” için üzerinde çalıştığı [Gizliliği Koruyan Mesaj Getirme (OMR)](https://zfnd.org/oblivious-message-retrieval/) yapısıdır.

## Sık Yapılan Hatalar

**lightwalletd sunucusunun bakiyenizi bildiğini varsaymak.** Sunucu yalnızca kompakt blokları iletir; cüzdanınız bunların şifresini kendi anahtarlarınızla yerel olarak çözer ve yorumlar.

**Senkronizasyonu çok erken durdurmak.** Bazı yöntemler, tam senkronizasyon tamamlanmadan yakın zamandaki harcanabilir fonları kullanılabilir hâle getirir; ancak eski geçmiş ve note'lar hâlâ işleniyor olabilir.

**Zcash senkronizasyonunu şeffaf Zincir senkronizasyonuyla doğrudan karşılaştırmak.** Daha yavaş bir süreç, gizliliği korumanın bedeli olabilir; bu bir kusur değildir. Cüzdan, halka açık bir coin sunucusunun hesabınızı açıkça okuyarak yapacağı işi kendisi yapar.


## İlgili Sayfalar

- [Hafif Cüzdan Düğümleri](/zcash-tech/lightwallet-nodes) — hafif cüzdanların dayandığı lightwalletd altyapısı.
- [Görüntüleme Anahtarları](/zcash-tech/viewing-keys) — cüzdanların kendi note'larını tespit edip şifrelerini çözmek için kullandığı anahtarlar.
- [Pepper Sync](/zcash-tech/pepper-sync) — Zcash cüzdan senkronizasyonuna yönelik başka bir yaklaşım.
- [FROST](/zcash-tech/frost) — korumalı ZEC için dağıtık imza yetkisi.
