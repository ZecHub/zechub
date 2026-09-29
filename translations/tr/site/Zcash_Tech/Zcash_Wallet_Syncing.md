<a href="https://github.com/zechub/zechub/edit/main/site/Zcash_Tech/Zcash_Wallet_Syncing.md" target="_blank">
  <img src="https://img.shields.io/badge/Edit-blue" alt="Sayfayı Düzenle"/>
</a>

# Zcash Cüzdan Senkronizasyonu

## Kısaca

* Korumalı Zcash işlemleri ayrıntılarını gizlediği için bir sunucu, Bitcoin veya Ethereum gibi şeffaf coin'lerde yapabildiği şekilde bir cüzdanın bakiyesini basitçe sorgulayamaz.
* Hafif cüzdanlar, özel bir sunucudan (lightwalletd) küçük “compact block”lar indirir ve ilgili verileri özel anahtarlarıyla kendileri şifre çözer.
* Bu blokların şifresini çözmek ve işlemek zaman aldığından, cüzdanlar fonlarınızı daha erken kullanabilmeniz için daha hızlı senkronizasyon yöntemleri kullanır.
* Dikkate değer yaklaşımlar: Warp Sync (YWallet), Senkronizasyondan önce harcama (Zcash Mobile Wallet SDK V2), Blaze Sync (Zecwallet) ve önerilen DAGSync.
* Bu yöntemler, daha hızlı senkronizasyon karşılığında genellikle ek bellek veya işlem gücü kullanır.

## Temel Açıklama

### Zcash senkronizasyonu nasıl çalışır

Zcash, işlem ayrıntılarını yetkisiz taraflardan korumak için sıfır bilgi kanıtları kullanır. Bu gizlilik, hafif cüzdanlar için senkronizasyonu zorlaştırır; çünkü hafif cüzdanlar blokzincirin tamamını yerel olarak saklamaz ve gerekli bilgiler için bir sunucuya güvenir. Bitcoin veya Ethereum'da sunucular blokzinciri indeksleyip hesap verilerini hızlıca döndürebilir. Ancak Zcash ile sunucu işlem ayrıntılarını göremez. Peki, bir hafif cüzdan tüm blokzinciri indirip kendi başına şifresini çözmeden bakiyesini ve geçmişini nasıl senkronize edebilir?

Zcash bu sorunu birden fazla yaklaşımı birleştirerek çözer. Tam bir düğümden gelen verileri filtreleyen ve yalnızca işlem tanımlaması için gerekenleri tutan özel bir sunucusu, lightwalletd, vardır. Bu verilere compact block denir ve bunlar orijinal bloklardan çok daha küçüktür. Hafif cüzdanlar önce bu compact block'ları lightwalletd sunucusundan indirir, ardından özel anahtarlarıyla şifrelerini çözer.

Bu compact block'ların şifresini çözmek ve işlemek bile, özellikle blok başına çok sayıda işlem olduğunda, önemli ölçüde zaman alabilir. Bu nedenle cüzdanlar senkronizasyonu hızlandırmak ve fonlarınızı mümkün olan en kısa sürede kullanmanızı sağlamak için farklı yöntemler kullanır.

## Görsel / Analoji

Blokzinciri, kilitli kutularla dolu devasa bir posta odası olarak düşünün. Şeffaf bir coin'de posta odası görevlisi etiketleri okuyabilir ve hangi kutuların size ait olduğunu anında söyleyebilir. Zcash ile etiketler gizlidir — bu nedenle cüzdanınız, açabileceği kutuları bulmak için anahtarlarını alıp kutuları sessizce kendisi kontrol etmelidir. Aşağıdaki senkronizasyon yöntemleri, bu kutuları daha hızlı kontrol etmek için farklı stratejilerdir.

## Derinlemesine İnceleme

### Warp Sync

Warp sync, her compact block'un şifresini çözme ve işleme ara adımlarını atlayarak doğrudan nihai sonuca ulaşan bir YWallet özelliğidir.

Bunu yapmak için, her adımı tek tek geçmeden nihai sonucu hesaplamak üzere matematik ve kriptografi kullanır.

Warp sync saniyede binlerce blok işleyebilir; bu, alışılmış senkronizasyon yönteminden çok daha hızlıdır. Bu, YWallet kullanıcılarının hesaplarında yüz binlerce işlem ve alınan not olsa bile hızlı ve akıcı bir performansın keyfini çıkarabilmesi anlamına gelir.

Bu adım atlama tekniğine ek olarak YWallet, birden fazla bloğu aynı anda işleyebilir; süreci daha da hızlandırmak için yükü kullanılabilir donanımınıza dağıtır.

[Warp Sync](https://ywallet.app/warp/) hakkında daha fazla bilgi edinin

> Warp sync burada bir senkronizasyon tekniği olarak açıklanmıştır. Ywallet artık sürdürülmemektedir ve Ironwood için güncellenmeyecektir; bu nedenle bugün kurulacak bir cüzdan değildir.

### Senkronizasyondan önce harcama

Senkronizasyondan önce harcama, Zcash Mobile Wallet SDK V2'de kullanıcıların tam cüzdan senkronizasyonunu beklemeden cüzdanlarını açar açmaz fon harcamasına olanak tanıyan yeni bir özelliktir. Bu özellik, cüzdanın harcanabilir bakiyesinin keşfedilmesini hızlandırır ve kullanıcı deneyimini iyileştirir.

Senkronizasyondan önce harcama, lightwalletd sunucusundan gelen blokları doğrusal olmayan bir sırada işleyen bir compact block senkronizasyon algoritması kullanarak çalışır. Bu, bir sonraki bloğa geçmeden önce bir bloğun tamamen işlenmesini beklemek yerine cüzdanların blokzincirin farklı bölümlerini taramak için biraz daha fazla bellek ve işlem gücü kullanabileceği anlamına gelir. Genellikle eski bloklar indirilip işlenirken daha yeni işlemleri aramak için farklı aralıkları tarar. Yakın tarihli, harcanmamış bir not keşfedilirse derhal kullanılabilir hale getirilir.

<a href="">
    <img src="/content-images/363d08df-b7b7-461b-a386-251d9ad702ca-a857cd8385.webp" alt="" width="140" height="150"/>
</a>

### Blaze Sync

Zecwallet ekibi tarafından geliştirilen Blaze sync, en yüksek ve en yeni bloktan başlayıp geriye doğru ilerleyerek blokzinciri tarayan, hafif cüzdanlara yönelik bir senkronizasyon algoritmasıdır.

Bu, cüzdanın alınan notlardan önce harcanmış notları bulmasını sağlarken, daha önce harcanmamış notları tam senkronizasyon sürecinin tamamlanmasını beklemeden kullanılabilir hale getirir.

Bunun yanında, senkronizasyonun bileşenlerini — blokları indirme, deneme şifre çözmeleri gerçekleştirme ve tanıkları güncelleme — birbirinden ayırıp paralel olarak işleyerek Sıra Dışı Senkronizasyon kullanır. Bu daha fazla bellek ve CPU kaynağı gerektirir, ancak senkronizasyon hızını 5 kat artırır.

### DAGSync

DAGSync, senkronizasyonu hızlandırarak Zcash korumalı cüzdanlarının kullanıcı deneyimini iyileştirmeyi amaçlayan önerilmiş bir senkronizasyon algoritmasıdır.

Bir Zcash cüzdanındaki notlar, tanıklar ve nullifier'lar arasındaki bağımlılıkları temsil etmek için bir [Yönlendirilmiş Döngüsüz Grafik (DAG)](https://words.str4d.xyz/dagsync-graph-aware-zcash-wallets/) kullanır.

DAG, her kenarın iki düğüm arasındaki ilişkiyi gösteren bir yönü olduğu düğümlerden ve kenarlardan oluşan bir veri yapısıdır. DAG'de döngü yoktur; yani bir düğümden başlayıp kenarları takip ederek yeniden aynı düğüme dönmenin hiçbir yolu yoktur.

<a href="">
    <img src="/content-images/eee7e08d-5c98-4c88-a48e-12f7a92a195f-316493530f.webp" alt="" width="110" height="230"/>
</a>

## Pratik Sonuçlar

İlginç şekilde, bu mekanizmaların tümü Zcash Security'nin [Ölçeklenebilir Özel Mesajlaşma](https://zecsec.com/posts/scalable-private-money-needs-scalable-private-messaging/) yazısında gündeme getirdiği soruları ve bunun özel ödeme sistemleriyle ilişkisini ele almayı amaçlar. Hatta bazıları, bir adrese özel veriler hariç sunuculardan tüm memo verilerini indirerek, biraz ek kaynak kullanımı karşılığında gizliliği artırma yolunda ek bir adım atar.

Ayrıca Zcash Foundation, hafif cüzdanların performansını iyileştirmek için başka alternatifleri de incelemektedir. Buna, vakfın “Zcash cüzdan kullanıcılarını etkileyen yakın dönem performans sorunlarına potansiyel bir çözüm sunup sunmadığını belirlemek” için incelediği bir yapı olan [Oblivious Message Retrieval (OMR)](https://zfnd.org/oblivious-message-retrieval/) dahildir.

## Yaygın Hatalar

**lightwalletd sunucusunun bakiyenizi bildiğini varsaymak.** Sunucu yalnızca compact block'ları iletir; cüzdanınız bunların şifresini kendi anahtarlarınızla yerel olarak çözer ve yorumlar.

**Senkronizasyonu çok erken durdurmak.** Bazı yöntemler, tam senkronizasyon tamamlanmadan önce yakın tarihli harcanabilir fonları kullanılabilir hale getirir; ancak eski geçmiş ve notlar hâlâ işleniyor olabilir.

**Zcash senkronizasyonunu doğrudan şeffaf zincir senkronizasyonuyla karşılaştırmak.** Daha yavaş bir yol, bir kusur değil gizliliği korumanın bedeli olabilir — cüzdan, açık bir coin sunucusunun hesabınızı açıkça okuyarak yapacağı işi gerçekleştirir.


## İlgili Sayfalar

- [Hafif Cüzdan Düğümleri](/zcash-tech/lightwallet-nodes) — hafif cüzdanların dayandığı lightwalletd altyapısı.
- [Viewing Key'ler](/zcash-tech/viewing-keys) — cüzdanların kendi notlarını tespit etmek ve şifrelerini çözmek için kullandığı anahtarlar.
- [Pepper Sync](/zcash-tech/pepper-sync) — Zcash cüzdan senkronizasyonuna yönelik başka bir yaklaşım.
- [FROST](/zcash-tech/frost) — korumalı ZEC için dağıtık imzalama yetkisi.
