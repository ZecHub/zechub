# Korumalı Çevrimdışı İmzalama

> **Temel fikir:** Yardımcı cüzdan, korumalı bir işlemi oluşturmak ve izlemek için gereken her şeyi görür. Harici donanım cüzdanı ise harcama yetkisini tek başına elinde tutar. Korumalı çevrimdışı imzalamanın bütün amacı bu ayrımdır.

Zcash içinde korumaya alma, fonları herkese açık, şeffaf bir adresten özel, korumalı bir adrese taşımayı ve işlem ayrıntılarını Zcash gizlilik özelliklerini kullanarak gizlemeyi içerir.

### ZEC korumaya alındığında neler değişir?

Şeffaf bir Zcash işleminde şu bilgiler:

- gönderen adresi
- alıcı adresi
- aktarılan miktar

blokzincirde gözlemlenebilir.

ZEC korumaya aldığınızda fonlarınız özel bir havuza (örneğin Ironwood) taşınır. Blokzincir, özel işlem ayrıntılarınızı açığa çıkarmadan işlemin geçerli olduğunu doğrulayabilir. 28 Temmuz 2026'daki NU6.3 yükseltmesinden bu yana, yeni korumaya alınan fonlar Ironwood havuzuna aktarılır; eski Orchard havuzu yeni yatırımları artık kabul etmez, ancak çekimlere izin vermeye devam eder.

### Korumalı Bir İşlemin Bileşenleri

### 1. Not (Korumalı Bakiye Kaydı)

Not, bir kullanıcının sahip olduğu harcanmamış ZEC miktarını temsil eden özel bir kriptografik kayıttır.

Bakiyelerin açık metin olarak listelendiği herkese açık bir blokzincirin aksine, korumalı bir not değeri ve sahiplik bilgilerini şifreleyerek zincir üzerindeki gözlemcilerin fonların kime ait olduğunu görememesini sağlar.

Bir işlem başlatıldığında yardımcı cüzdan defteri tarar, kullanıcının harcanmamış notlarını belirler ve harcanacak notları seçer.

### 2. Nullifier (Çifte Harcama Tespit Mekanizması)

Bir notun ayrıntıları herkese açık defterden gizlendiği için ağın, hangi notun harcandığını açığa çıkarmadan çifte harcamayı tespit edecek bir mekanizmaya ihtiyacı vardır.

Nullifier, belirli bir nottan türetilen benzersiz bir kriptografik işarettir. Bir not harcandığında nullifier'ı blokzincirde yayımlanır.

Ağ, nullifier'ın daha önce kaydedilmediğini doğrular. Kaydedilmemişse harcama kabul edilebilir. Önemli olarak, dışarıdan bir gözlemci nullifier'ı kullanarak bunun hangi nottan geldiğini belirleyemez.

Yardımcı cüzdan, işlem verilerini oluştururken uygun nullifier'ı türetir ve oluşturur.

## Anahtarlar

Anahtarlar, fonlarınıza erişimi denetleyen ve cüzdanınızın ZEC alma, görüntüleme ve harcama gibi işlemleri gerçekleştirmesini sağlayan kriptografik bilgi parçalarıdır.

Bir cüzdan, her biri farklı bir amaca hizmet eden birkaç farklı anahtar tutar; tıpkı tek bir hesabın okuma ve yazma erişimi için ayrı kimlik bilgilerine sahip olabilmesi gibi.

Farklı anahtarlar farklı amaçlara hizmet ettiği ve yalnızca birinin kilit altında tutulması gerektiği için anahtarlar, yardımcı cüzdan ile donanım cüzdanı arasındaki ilişkinin merkezinde yer alır.

Her korumalı havuzun anahtarlarını türetme ağacı olarak oluşturduğunu bilmek önemlidir; oklar bir bileşenden ondan türetilebilecek bileşenlere doğru işaret eder. Korumalı ödeme almak isteyen kullanıcıların, bir harcama anahtarından oluşturulan korumalı bir ödeme adresine sahip olması gerekir.

### Anahtar hiyerarşisi

**1. Harcama anahtarı**

Bu, güvenlik açısından en hassas anahtardır. ZEC harcamayı yetkilendirmek için gereken kriptografik yeteneği sağlar.

Bu raporun başka yerlerinde "donanım cüzdanı anahtarı elinde tutar" denildiğinde kastedilen anahtar budur.

Çevrimdışı imzalama mimarisinde harcama anahtarı donanım cüzdanının içinde tutulur ve yardımcı cüzdana hiçbir zaman açığa çıkarılmaz. Yardımcı cüzdanın bu anahtara hiç sahip olması gerekmemelidir.

Hem Sapling hem de Orchard içinde anahtar hiyerarşileri, harcama yetkisini ve görüntüleme becerilerini kök harcama anahtarından iki ayrı dal olarak türetir:

- **Sapling:** Genişletilmiş bir harcama anahtarı (𝑎𝑠𝑘,𝑛𝑠𝑘,𝑜𝑣𝑘), kanıt yetkilendiren anahtarları (𝑎𝑘,𝑛𝑠𝑘) ve tam görüntüleme anahtarlarını (𝑎𝑘,𝑛𝑘,𝑜𝑣𝑘) türetir; bunlar da gelen görüntüleme anahtarlarını (𝑖𝑣𝑘) ve çeşitlendirilmiş adresleri üretir.
- **Orchard:** Bir kök harcama anahtarı (𝑠𝑘), doğrudan harcama yetkilendiren bir anahtara (𝑎𝑠𝑘) ve tam görüntüleme anahtarına (𝑎𝑘,𝑛𝑘,𝑟𝑖𝑣𝑘) ayrılır.

Bu yapısal ayrım, donanım anahtarlarının yalıtılmasının resmî kriptografik temelini sağlar. Bu yaklaşımda cüzdan, bakiye eşitleme ve işlem oluşturma için görüntüleme dalını (UFVK) ana bilgisayara aktarırken harcama yetkilendiren dalı cihazda kalıcı olarak kilitli tutar.

Anahtar türetme işlemi kesinlikle tek yönlüdür. Bu, görüntüleme anahtarlarının harcama yetkisini yeniden oluşturmak için tersine çevrilemeyeceği anlamına gelir. Kriptografik geri döndürülemezlik, Birleşik Full Viewing Key (UFVK) dışa aktarmayı güvenli kılar; çünkü bu, cihazdaki harcama sırlarını açığa çıkarmadan cüzdanın tamamını görme olanağı sağlar.

**2. Görüntüleme anahtarları**

Zcash, korumalı etkinliği görme becerisini bu etkinliği harcama becerisinden ayırır. Görüntüleme anahtarı, cüzdana veya yetkili başka bir tarafa, harcama yetkisi vermeden korumalı işlemler hakkındaki bilgileri görüntüleme olanağı tanır.

- **Full Viewing Key (FVK), Birleşik Full Viewing Key (UFVK) biçiminde sarmalanmış:** Harcama anahtarından kasıtlı olarak türetilir; yazılımın cüzdanın korumalı etkinliğini algılayıp şifresini çözmesini ve böylece işlemleri belirlemesini sağlar. Ayrıca harcamayı yetkilendiremese de bakiyeleri hesaplamasına olanak tanır. Tohumun daha zayıf bir kopyası olarak değil, harcama anahtarının gizliliği daha düşük bir türevi olarak tanımlanması daha doğrudur.

Full Viewing Key (FVK), katı güvenlik ayrımını korurken salt okunur tam görünürlük sağlar. Gelen ve giden not şifreli metinlerinin ikisinin de şifresini çözerek (giden görüntüleme anahtarı bileşeni aracılığıyla) yalnızca sürekli güncellenen bir bakiye yerine eksiksiz ve etiketlenmiş bir işlem geçmişi oluşturabilir.

Birbirleriyle ilişkilendirilemeyen çok sayıda çeşitlendirilmiş ödeme adresi aynı FVK'yi ve gelen görüntüleme anahtarını (IVK) paylaşır; böylece blokzincir tarama yükü artmadan sınırsız sayıda adres oluşturulabilir.

Bu işlevsel ayrım, çevrimdışı imzalama iş akışlarının temelini oluşturur. Sürekli zincir taraması, geçmiş takibi ve adres yönetimi ana bilgisayardaki yazılıma devredilirken harcama yetkisi donanım cihazında yalıtılmış kalır.

![Key derivation diagrams](/content-images/key-derivation-diagrams.webp)

### Kritik ayrım: UFVK ve harcama anahtarı

> **UFVK paylaşılabilir. Harcama anahtarı donanım cüzdanında kalmalıdır.**
>
> Yardımcı cüzdan, cüzdanı izlemek, gelen fonları algılamak, notları belirlemek ve işlem hazırlamaya yardımcı olmak için görüntüleme anahtarını kullanır. Harcamayı yetkilendirmek için gereken özel anahtara sahip değildir.

Daha önce belirtildiği gibi, anahtarların ayrılması çevrimdışı imzalama mimarisinin temelidir.

Yardımcı cüzdan, fonlar üzerinde denetim sahibi olmadan bir işlemi hazırlamak için gereken işlerin çoğunu yapabilir. Donanım cüzdanının yalnızca hazırlanan işlemi alması ve son imzalama işlemini gerçekleştirmesi yeterlidir.

Donanım cüzdanı üreticilerinin bu ayrımı kendilerinin icat etmesi gerekmez. Zcash anahtar tasarımı, görüntüleme becerilerini harcama yetkisinden zaten protokol düzeyinde ayırır; üreticiler de imzalama ve dışa aktarma işlevlerini bu mevcut yapının üzerine kurar. Protokol, harcama anahtarından korumalı adres veya tam görüntüleme anahtarı gibi bilgilerin türetilmesine izin verirken harcama anahtarının kendisi gizli kalır. Bu sayede Ledger, Keystone ve Hito gibi donanım cüzdanları, fonları harcayabilecek özel anahtarı hiçbir zaman açığa çıkarmadan yardımcı yazılıma ihtiyaç duyduğu görüntüleme bilgilerini sağlayabilir.

### Yardımcı cüzdan anahtar bilgileriyle gerçekte ne yapar?

Yardımcı cüzdan, görüntüleme anahtarı materyalini kullanarak şunları yapabilir:

- fonlarınızı ve notlarınızı belirlemek
- hangi notların harcanabileceğini saptamak
- ilgili adresleri türetmek veya belirlemek
- işlemi oluşturmak
- gereken kanıtları üretmek veya üretimini eşgüdümlemek
- işlemi imzalama için hazırlamak

İşlem oluşturma gereksiniminin, özel harcama anahtarına ihtiyaç duymakla aynı şey olmadığını bilmek önemlidir. Bu ayrışma, donanım cüzdanı entegrasyonunun temel güvenlik fikirlerinden biridir.

## Korumalı İşlem Oluşturma ve Yetkilendirme

Bunlar işlemi oluşturma ve yetkilendirme süreçleridir. Basitçe söylemek gerekirse bu süreçler, cüzdanın para göndermek için bu verilerle gerçekte yaptığı şeylerdir:

### İşlem Oluşturma (Korumalı İşlemi Bir Araya Getirme)

İşlem oluşturma, kullanıcının yapmak istediği ödemeden geçerli bir Zcash işlemi oluşturmak için gereken bilgileri bir araya getirme sürecidir.

İşlem oluşturma süreci; seçilen notları, alıcıları, miktarları, ücretleri, nullifier'ları ve gereken diğer işlem verilerini bir işlem yapısında birleştirir. Korumalı işlemlerde ayrıca gerekli sıfır bilgi kanıtlarını ve imzaları üretmek için gereken bilgileri hazırlar.

Bu aşamayı genellikle yardımcı cüzdan yürütür. Cüzdan:

- Harcanacak notları seçer
- İşlemin girdilerini ve çıktılarını belirler
- Gerekli değerleri hesaplar
- Daha sonra kanıtlanıp imzalanacak işlem verilerini hazırlar.

Çevrimdışı imzalama kurulumunda sonuçta oluşan işlem verileri bir PCZT biçiminde paketlenerek güvenlik açısından kritik imzalama adımı için donanım cüzdanına aktarılabilir.

### Kanıtlama (Protokol Geçerliliğini Gösterme)

Kanıtlama, bir işlemin Zcash protokol kurallarına uyduğunu gösteren sıfır bilgi kanıtlarının (örneğin Halo 2 veya Groth16) üretilmesini ifade eder.

Kanıt, ağın şunları garanti etmesine yardımcı olur:

- Harcama yapan kullanıcı notları harcama yetkisine sahiptir
- Notlar gerçekten mevcuttur
- İlgili nullifier'lar benzersizdir
- Toplam girdiler, toplam çıktılar artı ücretlere eşittir.

Bunların tümünü altta yatan özel ayrıntıları açığa çıkarmadan gerçekleştirir.

Kanıt üretimi yoğun hesaplama gerektirir. Bu sorumluluğu yardımcı cihaza devretmek, donanım cüzdanının takılmasını veya belleğinin tükenmesini önler.

### İmzalama (Harcamayı Yetkilendirme)

İmzalama, kanıtlamadan temelde farklıdır. Dijital imza, özel anahtar sahibinin ürettiği açık bir yetkilendirme damgası işlevi görür.

Sıfır bilgi kanıtı işlemin geçerliliğini doğrularken dijital imza harcama yetkisini kanıtlar. İmza, gerçek sahibin belirli aktarım parametrelerini onayladığını belgelendirir.

İmzalama çok az işlem gücü gerektirdiğinden donanım cüzdanı için uygundur.

### Korumalı çevrimdışı imzalama nedir?

Korumalı çevrimdışı imzalama, özel harcama anahtarlarını internete bağlı yardımcı cüzdandan yalıtılmış tutarken Zcash korumalı bir işlemi yetkilendirme yöntemidir. İşlem çevrimiçi bir bilgisayarda oluşturulup hazırlanabilir; çevrimdışı tutulan veya başka bir şekilde yalıtılan ayrı bir donanım cüzdanı ise korumalı anahtarlarını kullanarak işlemi yetkilendirir.

Süreç şöyle basitleştirilebilir:

![Shielded cold signing process](/content-images/cold-signing-process.webp)

Yardımcı cüzdan yapılandırılmış işlem parametrelerini donanım cihazına gönderir. Cihaz, özel harcama anahtarını ana bilgisayara hiç vermeden yükü kendi içinde imzalar.

## Yardımcı Cüzdanlar ve Donanım Cüzdanları

Korumalı işlemlerde, her biri ayrı bir işlev gören yardımcı cüzdan ve donanım cüzdanı birlikte kullanılabilir.

### Yardımcı Cüzdan

Yardımcı cüzdan nedir?

Yardımcı cüzdan bilgisayarda veya mobil cihazda çalışır ve işlem oluşturmayla ilgili şu görevlerin çoğunu yerine getirir:

- Harcanacak notları seçmek
- İşlemi oluşturmak
- Gerekli işlem verilerini hesaplamak
- Gereken sıfır bilgi kanıtlarının üretimini eşgüdümlemek.

### Yardımcı cüzdan neden kullanışlıdır?

Yardımcı cüzdan işlem oluşturma sürecini yürütür, ancak bilgisayara kötü amaçlı yazılım bulaşırsa saldırgan şunları yapabilir:

- ne yaptığınızı görmek,
- imzalanmamış bir işlemi değiştirmek,
- sizi bir şeyi onaylamanız için kandırmaya çalışmak.

Yardımcı cüzdanın donanım cüzdanında saklanan özel anahtara erişmesi gerekmez. Bu nedenle işlem oluşturma ve diğer hesaplama görevlerini yürütürken donanım cüzdanı özel anahtar için güvenlik sınırı sağlar.

### Donanım Cüzdanı

Donanım cüzdanı, özel anahtarlarınızı bağlı telefonlardan veya bilgisayarlardan yalıtan çevrimdışı fiziksel bir cihazdır ve kripto varlıklarınız için güvenli bir kasa görevi görür.

### Donanım cüzdanı neden kullanışlıdır?

Bilgisayarınıza kötü amaçlı yazılım bulaşırsa saldırgan şunları yapabilir:

- ne yaptığınızı görmek,
- imzalanmamış bir işlemi değiştirmek,
- sizi bir şeyi onaylamanız için kandırmaya çalışmak.

Özel anahtar donanım cüzdanından kolayca çıkarılamaz; bu nedenle cihaz bir güvenlik sınırı görevi görebilir.

Yardımcı cüzdan ve donanım cüzdanı yeteneklerinin karşılaştırması görseli

Bu iki cüzdan arasındaki ayrım, korumalı işlemler için özellikle önemlidir; çünkü bu işlemler şeffaf işlemlerden daha karmaşıktır ve korumalı notlar, nullifier'lar, taahhütler, sıfır bilgi kanıtları ve işlem imzaları gibi bileşenler içerir.

Donanım cüzdanının tüm hesaplama işlemlerini gerçekleştirmesi pratik olmaz. Bunun yerine yardımcı cüzdan işlemi hazırlar ve imzalama için gereken bilgileri donanım cüzdanına sağlar; özel harcama anahtarı ise donanım cihazında yalıtılmış kalır.

## Anahtar İzolasyonu

> Anahtar izolasyonu, harcama yetkisi verebilen özel anahtarların donanım cüzdanından asla ayrılmaması demektir. Yardımcı uygulama işlemi hazırlayabilir; ancak imzalayamaz.

Anahtar izolasyonu, bir işlemi yetkilendirmek için gereken özel anahtarların yardımcı cüzdandan ve bu cüzdanın çalıştığı cihazdan ayrı tutulmasıdır. Korumalı çevrimdışı imzalama düzeninde yardımcı cüzdan işlemi oluşturabilir ve gerekli kanıtları koordine edebilir; donanım cüzdanı ise hassas özel harcama anahtarlarını izole tutar.

Yardımcı bilgisayarın veya telefonun güvenliği ihlal edilirse saldırgan, imzalanmadan önce işlemle etkileşime geçebilir; ancak ideal durumda özel anahtarı donanım cüzdanından çıkaramaz. Böylece anahtar, donanım cihazının güvenlik sınırları içinde kalır.

Bu ayrım, yardımcı cüzdanın işlemi oluşturma ve hesaplama görevlerini yerine getirmesine, işlemi yetkilendirmek için gereken anahtar materyaline doğrudan erişmemesine olanak tanır.

![Key isolation](/content-images/key-isolation.webp)

Burada yapılması gereken temel ayrım, “görüntüleme anahtarı”nın uygulamanın seed’in daha zayıf bir sürümünü aldığı anlamına gelmediğidir.

Zcash içinde bir Full Viewing Key (FVK/UFVK), harcama anahtarından bilerek türetilir ve sahibine ilgili korumalı etkinlikleri tespit edip şifrelerini çözme olanağı verir; ancak harcamaları yetkilendirme olanağı vermez. FVK, harcama anahtarından türetilen ve daha az gizli olan bir anahtardır.

**Önemli bir gizlilik uyarısı:**

Dolayısıyla uygulamanın yalnızca UFVK ile fonları çalamayacağı, ancak cüzdanın özel korumalı etkinliklerini görebileceği bilinmelidir.

Bu nedenle yardımcı uygulamanın “herkese açık bilgiye” sahip olduğunu söylemek yerine, *görüntüleme yetkisine* sahip olduğunu belirtmek daha doğrudur.

Bu fikrin tamamını en basit şekilde şöyle ifade edebiliriz: Yardımcı cüzdan, cüzdanda neler olduğunu bilmeye yetecek kadar anahtar materyali alır; ancak cüzdanın fonlarıyla ne yapılacağını yetkilendirecek kadarını almaz. Donanım cüzdanı ise harcama yetkisini izole tutar ve bu yetkiyi yalnızca kullanıcı bir işlemi onayladığında kullanır.

Bu, korumalı Zcash donanım cüzdanı tasarımlarının temelindeki anahtar izolasyonu modelidir. Yakında ele alınacak olan Ledger, Keystone ve Hito uygulamalarında da bu modelin farklı biçimlerini göreceğiz.

## PCZT

PCZT, Kısmen Oluşturulmuş Zcash İşlem anlamına gelir. Bir Zcash işlemini ve işlemi bir aşamadan diğerine taşırken tamamlamak için gereken bilgileri içeren pakettir.

İşlem henüz oluşturulurken kullanılan, Zcash işlemler için standartlaştırılmış bir biçimdir. Farklı katılımcıların veya cihazların işlem oluşturma sürecinin farklı bölümlerini yerine getirmesine ve kısmen tamamlanmış işlemi aralarında aktarmasına olanak tanır.

Zcash gibi sıfır bilgi kripto para protokollerinde işlem oluşturmak, basit ve herkese açık bir transferi imzalamaktan çok daha karmaşıktır. Korumalı işlemler, örneğin Halo 2 veya Groth16 kullanılarak oluşturulanlar gibi, yoğun hesaplama gerektiren sıfır bilgi kanıtları gerektirir. Bu nedenle donanım cüzdanları gibi düşük güçlü cihazların tüm işlem akışını yürütmek için gereken belleği ve işlem gücü olmayabilir.

PCZT, korumalı kripto mimarisindeki temel zorlukların bazılarını çözer. PCZT, işlem oluşturmayı modüler ve bağımsız rollere ayıran standartlaştırılmış bir ara veri biçimidir. Güçlü bir yardımcı bilgisayarın işlem birleştirme ve kanıt oluşturma işlerini yürütmesine olanak tanırken çevrimdışı donanım cüzdanını yalnızca yetkilendirme ve imzalama işlemleriyle sınırlar.

### Donanım ve Çevrimdışı Depolama Sınırlamaları

Donanım cüzdanları özel harcama anahtarlarını korumak için güvenli bir ortam sunsa da yardımcı bilgisayarlara kıyasla genellikle sınırlı RAM, işlem gücü ve veri aktarım kapasitesine sahiptir. Bu kısıtlar, yoğun hesaplama gerektiren sıfır bilgi kanıtı oluşturma işlemlerini yürütmelerini veya işlem oluşturma sürecinde gereken işlem durumunun tamamını tutmalarını pratik olmaktan çıkarır.

Sonuç olarak yardımcı cüzdan, yoğun hesaplama gerektiren işleri yürütebilir; donanım cüzdanı ise korunan harcama anahtarlarıyla işlemi yetkilendirme gibi güvenlik açısından kritik göreve odaklanır.

İnsan merak ediyor: Cihazın kaynakları bu kadar kısıtlıysa güvenilir olması için yeterli doğrulamayı nasıl yapabiliyor?

Basitçe söylemek gerekirse donanım cüzdanı, yardımcı bilgisayardan gelen rastgele bir değeri kabul edip imzalayamaz. İmzalanan değerin, kullanıcının yetkilendirmek istediği işleme karşılık geldiğini saptamak için yeterli bilgiye ihtiyaç duyar. Bu da zor bir denge yaratır: Cihaz, imzalama sürecini koruyacak kadar ayrıştırma ve doğrulama yaparken bellek, hesaplama, donanım yazılımı boyutu ve uygulama karmaşıklığı üzerindeki sıkı sınırlar içinde çalışmalıdır.

Ledger'ın Orchard PCZT işlemesi bu zorluğa bir örnektir. Bu yaklaşım, devreye özgü ayrıştırmanın kısıtlı cihazlarda uygulamayı kolaylaştırabileceğini, ancak desteklenen işlem yapıları veya devreler değiştikçe donanım yazılımı güncellemeleri gerektirebileceğini gösterir.

Devam eden iki çalışma, bu kısıta verilen farklı yanıtları gösteriyor.

Açık kaynaklı donanım cüzdanı mimarilerine ve sıradan bilgisayarlara uygun, tamamen sabit zamanlı bir kanıt oluşturma işlem hattı için araştırma önerisi Hibe #423 kapsamında sunuldu. Amaç, Rust gibi ortamlarda güvenli biçimde uygulanabilecek ve korumalı Zcash desteğinin karmaşıklığını ve bakım yükünü azaltacak kriptografik altyapıyı araştırmaktı.

Önerilen **Zcash SeedSigner** ise başka bir yaklaşımı temsil ediyor: Uygun fiyatlı ve kolayca bulunabilen bileşenlerden oluşturulmuş, açık kaynaklı ve ağdan yalıtılmış bir imzalayıcı. Önerilen iş akışında yardımcı bilgisayar imzalama cihazından ayrı tutuluyor; cihaz üzerinde doğrulama ve imzalama yapılması için bir PCZT ağ bağlantısı olmayan bir ortamdan aktarılıyor.

https://forum.zcashcommunity.com/t/grant-application-research-on-a-fully-constant-time-proving-pipeline-for-open-source-hardware-wallet-architectures-reusable-for-standard-computers/57555

Bu yaklaşımlar birlikte, korumalı donanım cüzdanlarının ardındaki daha geniş mühendislik zorluğunu gösteriyor: İşlem oluşturma ve kanıt üretme, güvenlik açısından kritik cihazın dışında gerçekleşebilir; ancak imzalayıcı, ortaya çıkan işlemi güvenle yetkilendirmek için yine de yeterli bilgiye ve doğrulama yeteneğine sahip olmalıdır.

### PCZT Bölünmüş Mimariyi Mümkün Kılar

Kısmen Oluşturulmuş Zcash İşlem (PCZT) standardı, yardımcı cüzdan ile donanım cüzdanını birbirine bağlayan resmî veri yapısıdır.

Yardımcı cüzdan notları seçebilir, nullifier değerlerini hesaplayabilir ve sıfır bilgi kanıtını kendi başına oluşturabilir. Bunun nedeni, bu adımlar için gereken bilgilerin (nullifier değerlerini türetmekte kullanılan anahtar dahil) harcama yetkisiyle bağlantılı bir unsurdan değil, görüntüleme anahtarından gelmesidir. Yardımcı cüzdan daha sonra bu öğeleri bir PCZT kapsayıcısında paketler.

PCZT donanım cüzdanına aktarılır. Donanım cüzdanı, işlem bağlamını (tutarlar ve alıcı adresleri gibi) okur, korunan harcama anahtarlarıyla imzayı uygular ve güncellenmiş PCZT öğesini yardımcı cihaza geri gönderir.

Bu tasarım katı bir güvenlik sınırı oluşturur: Güçlü ana bilgisayar donanımı, harcama anahtarlarına erişmeden karmaşık sıfır bilgi hesaplamalarını yürütebilir; düşük güçlü çevrimdışı depolama cihazları da yoğun kriptografiyi hesaplamak zorunda kalmadan finansal güvenliği sağlayabilir.

### Kanıtlayıcı Gizliliğinden Ödünler

Sıfır bilgi kanıtı oluşturma işini yardımcı cüzdana veya başka bir kanıtlayıcıya devretmek harcama anahtarlarını izole tutar; ancak kanıtlayıcının not değerleri, alıcı adresleri ve taahhütler gibi hassas işlem bilgilerine erişmesini gerektirir.

PCZT, bu bilgilerin kanıt oluşturma için aktarılmasına izin verirken yetkilendirme için gereken özel harcama anahtarlarının aktarılmasını önleyerek mimari ayrımı korur.

Böylece kanıt oluşturma yetkisi, harcama yetkisinden ayrılmış olur. Kanıtlayıcı, kullanıcının fonlarını harcama konusunda kriptografik yetki kazanmadan yoğun hesaplama gerektiren kanıt oluşturma işini yürütebilir.

### PCZT Birlikte Çalışabilirliği

PCZT, Zcash donanım cüzdanı, çoklu imza ve ağdan yalıtılmış imzalama iş akışlarının önemli bir parçası hâline geldikçe bağımsız uygulamaların birlikte çalışabilirliği giderek önem kazanıyor.

AngryDavee tarafından Haziran 2026'da sunulan bir öneride, PCZT uygulamalarının Ledger, Keystone, Hito, OneKey projelerinde ve librustzcash içindeki referans uygulamada zaten bulunduğu belirtildi. Ancak öneride, bu uygulamaların PCZT'leri tutarlı biçimde yorumladığını doğrulayacak ortak testlerin bulunmadığı tespit edildi.

Önerilen çözüm; standart PCZT test vektörlerini ve oluştur → imzala → sonlandır akışının tamamını kapsayan, uygulamalar arası testleri içeren açık kaynaklı bir birlikte çalışabilirlik test paketiydi. Öneride ayrıca, işlem sonlandırılmadan önce farklı imzalayıcılardan gelen kısmi imzalı bilgilerin birleştirilebildiği Birleştirici gibi rol sınırlarının da test edilmesi öngörülüyordu.

Bu, donanım cüzdanları için özellikle önemlidir; çünkü PCZT işlem oluşturma ile imzalamanın ayrılmasına olanak tanır: Yardımcı cüzdan bir işlem oluşturup PCZT hazırlayabilir; donanım cihazı ise gerekli imzalama bilgilerini alarak güvenlik açısından kritik imzalama işlemini gerçekleştirebilir.

Zcash Community Grants, öneriyi inceleyip topluluk geri bildirimlerini değerlendirdikten sonra hibeyle ilerlememeye karar verdiği için öneri uygulanmadı. Sonuç olarak önerilen uygulamalar arası test paketi bu hibe kapsamında geliştirilmedi. Bu nedenle söz konusu paket, tespit edilmiş bir PCZT birlikte çalışabilirlik sorununa önerilen bir çözümdür; şu anda Zcash genelinde var olan bir standart değildir.

https://forum.zcashcommunity.com/t/pczt-interoperability-test-suite-feedback-before-at-grant-submission/55931

### PCZT Yaşam Döngüsü

| # | Aşama | Açıklama |
|---|---|---|
| 1 | Oluşturucu | İşlem sürümleri, mutabakat dalı kimlikleri ve havuz bayrakları dahil genel işlem üst verileriyle PCZT öğesini başlatır. |
| 2 | Kurucu | Şeffaf, Sapling, Orchard veya Ironwood havuzlarına yönelik planlanan girdileri ve çıktıları işleme ekler. |
| 3 | Girdi/Çıktı Sonlandırıcısı | Girdi ve çıktı kümesinin tamamlandığını bildirir, bağlayıcı imza anahtarlarını hesaplar ve gerektiğinde sahte harcamaları imzalar. |
| 4 | Güncelleyici | Tam görüntüleme anahtarları, çapalar ve Merkle tanıkları gibi sonraki katılımcıların ihtiyaç duyacağı bağlam verilerini ekler. |
| 5 | Kanıtlayıcı ve İmzalayıcı | Sıfır bilgi kanıtı oluşturma ve kriptografik imzalama işlemlerini yürütür. Modern PCZT sürümlerinde bu iki görev tamamen bağımsızdır; sırayla veya paralel olarak gerçekleştirilebilir. |
| 6 | Birleştirici | Farklı cihazlar aynı işlemin farklı bölümleri üzerinde eş zamanlı çalışırsa birden çok PCZT örneğini deterministik biçimde birleştirir. Birleştirme kuralları, verilerin yanlışlıkla kaybolmasını önlemek için çatışmaların kesin biçimde çözülmesini gerektirir. |
| 7 | Harcama Sonlandırıcısı ve Dışa Aktarıcı | Gerekli tüm kriptografik öğeleri doğrular, ara bağlam üst verilerini kaldırır ve ağda yayımlanmaya hazır, sonlandırılmış Zcash işlemini üretir. |

## Gerçek Dünyada Donanım Cüzdanı Uygulamaları

### Genel Bakış

| Cihaz   | Yardımcı cüzdanın aldığı              | Cihazda kalan          | Aktarım      |
|----------|------------------------------------------|-----------------------------------|----------------|
| Ledger   | UFVK / Orchard FVK, adresler            | Harcama yetkisi                | USB / BLE      |
| Keystone | UFVK + Birleşik Adres                   | Seed / harcama anahtarları              | QR (ağdan yalıtılmış)|
| Hito     | UFVK, Birleşik Adres, seed parmak izi  | Seed ve özel harcama anahtarları    | QR / yerel     |


Hassas harcama anahtarlarını yardımcı cüzdandan izole tutarken Zcash korumalı işlemlerini desteklemenin yollarını araştırmak için çeşitli donanım cüzdanı uygulamaları geliştirildi. Ledger, Keystone ve Hito, donanım tabanlı anahtar korumasını Zcash işlem akışına entegre etmeye yönelik farklı yaklaşımları temsil ediyor.

![Real world hardware wallet implementations](/content-images/hardware-wallet-implementations.webp)

Korumalı fonları nasıl koruduklarını anlamak için harcama anahtarları ile görüntüleme anahtarları arasındaki farkı bilmek önemlidir. Üçünde de ayrımın temel yapısı aynıdır:

| Cihaz | Yardımcı uygulamanın alabilecekleri | Cihazda korunanlar |
|---|---|---|
| Ledger | UFVK / Orchard FVK, adresler ve herkese açık bilgiler | Harcama yetkisi / özel anahtar materyali |
| Keystone | UFVK + Birleşik Adres | Seed / harcama anahtarları |
| Hito | UFVK, Birleşik Adres, seed parmak izi ve ağ bilgileri | Seed ve özel harcama anahtarları |

### Ledger Donanım İmzalama Ortamı Olarak

Ledger bir donanım cüzdanı şirketidir. Cihazları, özel anahtar materyalini tutmak ve onu cihazın geri kalanından ve cihaza bağlı her şeyden fiziksel olarak yalıtmak için tasarlanmış özel bir çip olan Güvenli Eleman etrafında tasarlanmıştır. Bir Ledger cihazını çevrimdışı depolama için güvenilir kılan temel unsur bu Güvenli Elemandır. Bu, cihaza bağlanan bilgisayarın veya telefonun güvenliği ihlal edilse bile Güvenli Elemanın içindeki anahtarların çıkarılamayacağı anlamına gelir.

Ancak tek başına bir Ledger cihazı, belirli bir kripto para açısından boş durumdadır. Söz konusu para biriminin kendine özgü kriptografisini işleyebilen bir uygulamanın cihaza yüklenmesi gerekir.

Dolayısıyla bir Ledger cihazı, belirli bir kripto para açısından boş durumdadır; bu nedenle o para biriminin kriptografisini bilen bir uygulamaya ihtiyaç duyar. Zcash için iki nesil uygulama bulunuyor:

- Başlangıçta Zondax tarafından geliştirilen ve Zkool gibi yardımcı cüzdanlarla kullanılan “Zcash Shielded” uygulaması; bu uygulamanın desteği 5 Kasım 2026'da sona erecek ve,
- Ledger'ın, Ledger Wallet Desktop 4.21+ tarafından yerel olarak Ironwood korumalı ZEC işlemleri için kullanılan yeni Zcash uygulaması (3.9.4+).

Aşağıdaki anahtar izolasyonu modeli her iki uygulama için de geçerlidir.

Zkool, telefonunuzdaki veya bilgisayarınızdaki ve bu uygulamayla iletişim kuran yardımcı cüzdandır. İşlemi oluşturup Ledger'a gönderir; cihazdaki Zondax uygulaması da işlemi imzalayıp imzayı geri gönderir.

Yani Zondax, donanımda çalışan yazılımdır; Zkool ise dışarıda çalışan ve cihazla iletişim kurmak için Zondax'ın uygulamasını kullanan yazılımdır.

### Ledger'tan neler çıkar?

Ledger'ın Zcash yazılımında, cüzdanın görüntüleme anahtarını dışa aktaran özel bir işlev bulunur. Bu anahtar, yazılımın hiçbir şeyi harcayamadan bakiyeleri ve işlemleri görebilmesini sağlar.

Bu işlev iki şeyden birini döndürebilir:

- Zcash'ın tüm korumalı havuzlarını kapsayan Birleşik Full Viewing Key (UFVK) veya
- Orchard Full Viewing Key (FVK)

Her iki durumda da dışarı aktarılan yalnızca bir görüntüleme anahtarıdır. Hangi sürümü isterseniz isteyin, bu işlevin birinin fonları taşımasına gerçekten olanak verecek tek bilgiyi, yani harcama anahtarını döndürmesi mümkün değildir.

Zaten bütün amaç da budur: Sistem, yardımcı uygulamayla paylaşılması güvenli olan bir şeyi dışa aktarabilecek şekilde tasarlanmıştır.

Zcash'ın anahtar hiyerarşisi, her korumalı havuz için harcama anahtarından birbirinden ayrı iki öğe türetilecek şekilde yapılandırılmıştır:

- Harcamayı yetkilendiren bir anahtar ve
- Tam görüntüleme anahtarı

FVK daha sonra kendi görüntülemeyle ilgili başka yeteneklerini türetebilir; ancak türetme yolu hiçbir noktada harcama yetkisine geri dönmez. Bir anahtar hiyerarşinin görüntüleme tarafına ayrıldıktan sonra o tarafta kalır ve türetildiği harcama yetkisi anahtarını yeniden oluşturmak için kullanılamaz.

Ironwood da aynı düzeni izler; çünkü Orchard'ın temelindeki anahtar ve not oluşturma yapısını yeniden kullanır. Bununla birlikte mutabakat katmanında kendine ait taahhüt ağacı ve nullifier kümesi bulunan ayrı bir havuzdur. Bu nedenle UFVK, tek ve düz bir anahtardan çok havuzlara özgü görüntüleme anahtarlarından oluşan bir pakettir (şeffaf, Sapling, Orchard ve artık Ironwood).

Ironwood etkinleşmeden önce dışa aktarılan bir UFVK, Ironwood görüntüleme anahtarını içermez; çünkü o havuz henüz mevcut değildir. Cüzdanların NU6.3 yükseltmesinden sonra Ironwood destekli UFVK'leri tanıyıp türetecek şekilde güncellenmesi gerekmesinin nedeni tam olarak budur.

### Ledger'da neler kalır?

Harcama yetkisi cihazda kalır.

Ledger İmzalayıcısı ana bilgisayardan bir işlem/PCZT alır ve işlemin hangi havuzdan harcama yaptığına bağlı olarak harcamayı yetkilendiren imzayı oluşturur (Ledger'ın mevcut entegrasyonu yalnızca Ironwood desteklediğinden Ironwood havuzu). İmza cihazda oluşturulur ve ana bilgisayar özel harcama anahtarını değil, yalnızca imzayı alır.

Bu, Ledger'ın genel güvenlik modeliyle de uyumludur. Güvenli Elemanı özel anahtar materyalini yalıtır; Ledger uygulama güvenliği gereklilikleri de uygulamaların bu sırları ana bilgisayara açmasını özellikle yasaklar.

Ledger imzalayıcısı, işlem imzalama işlemini bağımsız olarak yürütürken FVK/UFVK'yi dışa aktarabilir. Bu iki yetenek tek bir işlemde birleştirilmez; ayrı işlevlerle sağlanır.

### Bunun pratikte anlamı nedir?

Ledger'ınızda 10 ZEC bulunduğunu varsayalım.

Yardımcı cüzdanda UFVK bulunabilir ve böylece “Bu cüzdan 10 ZEC aldı” sonucuna varabilir. İşlemleri ve bakiyeleri tarayıp görüntüleyebilir.

Ancak birisi yardımcı cüzdanın güvenliğini ihlal ederse UFVK tek başına harcamayı yetkilendiren imzayı oluşturma olanağı vermez.

Ayrı harcama yetkilendirme imzasının amacı, donanım cüzdanları gibi kısıtlı cihazların zk-SNARK kanıtının tamamını oluşturmak zorunda kalmadan korumalı harcamaları yetkilendirmesini sağlamaktır.

### Zondax Ledger uygulaması; donanım cüzdanı tarafı

#### Zondax nedir?

Zondax, Ledger Zcash uygulamasını geliştiren üçüncü taraf bir yazılım şirketidir. Ledger donanımında çalışan ve cihaza Zcash işlemlerini baştan anlayıp işleme yeteneği kazandıran gerçek donanım yazılımı uygulamasıdır.

Zondax harici bir geliştiricidir. Ledger donanımı, Zcash işlemlerini yerleşik olarak işleme yeteneğine sahip değildir; bu yetenek tamamen Zondax yazılımından gelir.

### İlk Zcash Ledger uygulaması

Zondax'ın Ledger Zcash uygulama deposundaki yazılım, Ledger cihazında çalışır. Uygulama ilk başta Orchard, Zcash'ın temel korumalı havuzu hâline gelmeden önce Sapling korumalı işlemlerine odaklanmıştı. Bu nedenle Sapling desteği, Ledger cihazının korumalı ZEC işlemleri için yapabileceklerinin tamamını oluşturuyordu.

Mimarisi bu ayrımı gösterir: Ana bilgisayar/yardımcı tarafı işlem bilgilerini hazırlarken Ledger hassas anahtar işlemlerini ve imzalamayı yürütür.

Zcash donanım cüzdanı desteğinin bu ilk sürümünde bile temel ilkeler, yani işlemi ana bilgisayarda oluşturup kanıtı üretmek ve ardından cihazda izole biçimde imzalamak, tasarımda zaten yer alıyordu.

### Orchard yönünde gelişim

Ledger'ın çalışmaları Orchard + PCZT yönünde ilerledi. Bu, küçük bir güncellemeden çok daha kapsamlı bir geçişti; çünkü Orchard farklı bir kanıt sistemi (Groth16 kullanan Sapling'ın aksine Halo 2) ve farklı bir not ve anahtar oluşturma yapısı kullanır. Bu nedenle yalnızca Sapling'ı destekleyen donanım yazılımını Orchard imzalamayı destekleyecek hâle getirmek, basit bir donanım yazılımı yaması değil, cihaz tarafında yeni kriptografik altyapı gerektiriyordu.

Ancak Zcash Ironwood yönünde ilerlerken Zondax ve Ledger, önce yalnızca Orchard uygulamasını tamamlayıp ardından Ironwood için yeniden tasarlamak yerine geliştirme odağını doğrudan Ironwood desteğine kaydırdı. Bu, Ledger uygulamasının gelişiminde yeni bir aşamadır: Ironwood, Orchard kriptografik mimarisi üzerine kurulur; buna ayrı bir korumalı havuz ve ek protokol değişiklikleri getirir.

### Bu Ledger uygulamasında neler olur?

Ortaya çıkan akış şöyle açıklanıyor:

1. Ana bilgisayar bir PCZT oluşturur.
2. Ana bilgisayar ilgili işlem bilgilerini Ledger cihazına gönderir.
3. Cihaz, Orchard harcamayı yetkilendiren imzaları üretir.
4. Ana bilgisayar, bağlayıcı imza ve son işlem birleştirme dahil bundan sonraki tüm işlemleri yürütür.

Ledger içinde çalışan uygulama, harcamayı yetkilendiren imzanın ötesinde hiçbir şeyi görmez veya üretmez. Kanıt oluşturma, bağlama ve birleştirme gibi yoğun hesaplama veya çok veri gerektiren işler ana bilgisayarda kalır; ana bilgisayarın anahtar materyali konusunda güvenilir olması gerekmez.

### Ledger yerel korumalı entegrasyonu; Ledger Wallet Desktop

Ledger'ın en yeni Zcash entegrasyonu, korumalı işlem oluşturma ile güvenlik açısından kritik imzalamanın yardımcı yazılım ve donanım cüzdanı arasında nasıl ayrılabileceğine somut bir örnek sunuyor.

Ledger Wallet Desktop 4.21+ ve Zcash cihaz uygulaması 3.9.4+ ile kullanıcılar Ironwood korumalı ZEC işlemlerini doğrudan Ledger Wallet Desktop üzerinden gönderip alabilir. Entegrasyon, özelden özele transferleri, şeffaf havuzdan korumalı havuza aktarmayı, korumalı havuzdan şeffaf havuza çıkarmayı, özel alım adreslerini ve notları destekler. İşlemler yalnızca bilgisayarda gösterilen bilgilere dayanmak yerine Ledger cihazında doğrulanıp imzalanır.

Bu mimarinin temelinde görüntüleme ve harcama yeteneklerinin ayrılması bulunur. Özel bakiye eşitlenirken Ledger bir Birleşik Full Viewing Key (UFVK) dışa aktarır ve bu anahtar bilgisayarda yerel olarak saklanır. UFVK, Ledger Wallet Desktop'ın ilgili korumalı işlemleri tespit etmesini ve cüzdanın bakiyesini belirlemesini sağlar; ancak fonları harcama yetkisi vermez. Güvenlik açısından kritik harcama yetkisi Ledger cihazında kalır ve son imzalama işlemini bu cihaz gerçekleştirir. Böylece cüzdan durumunu yöneten ve işlemleri oluşturan bilgisayar ile harcama yetkisini koruyan donanım cihazı arasında açık bir sınır oluşur.

Ancak mevcut entegrasyon yalnızca Ironwood desteği sunar. Orchard veya Sapling fonlarını Ledger Wallet Desktop üzerinden görüntülemez ya da yönetmez. Bu durum, Ledger'ın önceki Zcash geliştirmesinin Orchard korumalı desteğiyle ilişkili olması ve uygulamanın daha sonra Ironwood protokolüne yönelmesi nedeniyle tarihsel açıdan önemlidir.

Bu geçiş, anahtar ve hesap uyumluluğunun önemini de gösteriyor. Ledger, Zondax tarafından geliştirilen ve YWallet ile zkool gibi entegrasyonların kullandığı eski “Zcash Shielded” uygulamasını artık kullanımdan kaldırıyor. Eski uygulama korumalı hesaplar için farklı bir türetme şeması kullandığından, bu uygulamadaki Sapling hesapları yeni Ledger uygulamasında doğrudan yeniden oluşturulamıyor.

Dolayısıyla bu entegrasyon, korumalı donanım cüzdanı desteğindeki ilerlemeyi ve devam eden kısıtları birlikte gösteriyor. Ledger artık yardımcı yazılımın cüzdanı eşitlediği ve işlemleri hazırladığı, donanım cihazının ise harcama için güvenlik sınırı olmaya devam ettiği tam bir Ironwood deneyimi sunabiliyor.

Bununla birlikte geçmiş hesaplarla uyumluluk, yalnızca belirli korumalı havuzlara destek, donanımda işlem boyutu sınırları, platform kısıtlamaları ve korumalı işlemleri ayrıştırıp doğrulama için gereken hesaplama ve donanım yazılımı kaynakları, Zcash donanım cüzdanı desteğinin yalnızca protokol yeteneklerine değil, her bir uygulamanın tasarımına ve kaynaklarına da bağlı olduğunu gösteriyor.

### Zkool + Ledger — resmî Zondax uygulamasını kullanma

Ywallet'ın halefi olan Zkool, korumalı çevrimdışı imzalama hedefini devraldı; ancak bu hedefe ulaşmak için farklı bir yol izledi. Bu yol, imzalama uygulaması güvenli biçimde dağıtılamıyorsa tek başına kriptografinin bir entegrasyonu kullanılabilir kılamayacağı gerçeğine dayanıyordu.

https://youtu.be/eagkCIv3BlQ?si=7w5YfLlRER77bASw

### Zkool'ın Zondax uygulamasını kullanması

Zkool, Ywallet'ın kullanımdan kaldırdığı özel Ledger uygulaması yerine Zondax tarafından geliştirilen resmî Ledger Zcash uygulamasını kullanmaya yöneldi. Ledger mağazasının kabul etmeyeceği özel bir uygulamanın bakımını sürdürmek yerine Zkool, zaten kabul edilmiş ve Ledger'ın kendi ekosistemi üzerinden dağıtılan uygulamayı temel aldı.

Bu değişiklik sayesinde kullanıcıların entegrasyonu kullanmak için artık imzasız özel bir Ledger uygulamasını yüklemesine gerek kalmadı; Zondax uygulaması Ledger ekosistemi üzerinden resmî olarak dağıtılıyordu.

Ledger, bu eski Zcash Shielded uygulamasını kullanımdan kaldırırken desteğin sona ereceği tarih olarak 5 Kasım 2026'yı belirledi. Zkool bu değişikliğe hazırlandı: [sürüm 6.30.0](https://github.com/hhanh00/zkool2/releases/tag/zkool-v6.30.0) (12 Eylül 2026), Zondax uygulamasının yanında Ledger'ın yeni resmî Zcash uygulamasına da destek ekledi. Bir Ledger hesabı oluşturduğunuzda Zkool artık cihazda hangi uygulamanın çalıştığını soruyor (Resmî veya Zondax). Resmî uygulama hesabı, şeffaf ve Ironwood havuzlarını kapsar: Zkool cihazdan UFVK'sini içe aktarabilir ve v6 işlemlerini Resmî uygulamayla imzalar. Zondax uygulaması hesabı ise eski şeffaf + Sapling düzenini korur ([zkool2#1242](https://github.com/hhanh00/zkool2/pull/1242)).

### Desteklenen korumalı havuzlar

Geliştirici Ywallet’a göre, Zkool’ın Ledger entegrasyonu, Zondax tarafından geliştirilen resmî Ledger uygulamasını kullanıyor ve hem şeffaf hem de korumalı Zcash işlemlerini destekliyordu. Ancak korumalı işlem desteği Sapling ile sınırlıydı ve Orchard desteği yoktu. Ayrıca her türden en fazla beş girdi ve çıktı sınırı bulunuyor, Ledger Live uyumluluğu da sağlanmıyordu.

Bu sınırlama, o dönemde temel alınan Zondax Ledger uygulamasının kapsamını yansıtıyordu. Zondax’ın daha önceki Ledger çalışması Sapling desteği sağlamıştı; 2024’te yayımlanan Zcash Shielded Ledger uygulaması ise başlangıçta Orchard ve Unified Address’leri kapsamıyordu. Dolayısıyla bu uygulama üzerine kurulan bir entegrasyon, dayandığı donanım cüzdanı uygulamasının yeteneklerini ve sınırlamalarını da devraldı.

Durum, Kasım 2024’te özel Zcash Shielded Ledger App’in yayımlanmasıyla sonradan değişti. Zondax, uygulamanın Ledger Live üzerinden resmen yayımlandığını belirtti ve daha sonra diğer cüzdanların uygulamayla entegrasyon kurabilmesi için entegrasyon kılavuzları ile Rust ve JavaScript paketlerini yayımladı. Ancak uygulama ilk çıktığında yalnızca Zecwallet Lite Desktop ile iletişim kuruyordu; daha geniş cüzdan entegrasyonları hâlâ geliştiriliyordu.

Sonraki aşama, Ledger’ın daha yeni Rust tabanlı Zcash uygulamasının geliştirilmesiydi. Ledger, Haziran 2026 itibarıyla UFVK paylaşımı ve Orchard Unified Address oluşturma özelliklerinin uygulandığını; Orchard işlem imzalama ve ClearSign özelliklerinin ise hâlâ geliştirilmekte olduğunu bildirdi. Ledger ayrıca protokol değiştikçe çalışmaların Ironwood yolunda sürdürüleceğini belirtti.

Ironwood, Zcash cüzdan ekosisteminde de güncellemeler gerektirdi. Zkool, Orchard’den Ironwood geçiş desteğini 6.24.0 sürümüyle sunmaya başladı ve sonraki sürümlerde geçiş ile işlem hattını geliştirmeyi sürdürdü. Ledger ise PCZT v2 imzalamayı 27 Temmuz’da yeni uygulamasına dahil etti. Ancak 20 Ağustos itibarıyla uygulama henüz Ledger incelemesini tamamlamamış ve Ledger Live üzerinden kullanıma sunulmamıştı. Bu kilometre taşı o zamandan beri tamamlandı; Ledger Wallet Desktop 4.21+ artık yerleşik Ironwood desteği sunuyor.

https://forum.zcashcommunity.com/t/a-path-forward-for-ledger-and-zcash/50951/177

Dolayısıyla bu gelişim, tek bir Zondax’den Ironwood’e yükseltme olarak değil, birbiriyle ilişkili birkaç gelişme olarak anlaşılmalıdır: başlangıçtaki Sapling odaklı Zondax uygulaması, 2024’teki Zcash Shielded Ledger App, Orchard ve PCZT desteği sunan daha yeni Ledger Rust uygulaması, Ledger Wallet Desktop’a Ledger tarafından eklenen yerel entegrasyon ve ekosistem Ironwood’e geçerken Zkool gibi cüzdanlarda yapılan paralel güncellemeler.

### Zcash için mevcut Ledger cihaz ve platform desteği

Ledger üzerindeki Zcash desteği şunlara bağlıdır:

- Cihaz modeli
- Yüklü uygulama
- Cihazı yönetmek için kullanılan platform ve,
- İşlemin şeffaf mı yoksa korumalı mı olduğu.

21 Temmuz 2026 itibarıyla (Ledger’ın son güncellemesi), Zcash Shielded uygulaması Nano S Plus, Stax ve Flex’te destekleniyor; ancak Nano X veya Nano Gen5’te henüz desteklenmiyor.

Nano X ve orijinal Nano S dışındaki diğer modeller klasik Zcash uygulamasını kullanmaya devam edebilir. Bu uygulama, şeffaf işlemleri ve korumalı fonların şeffaf adreslere harcanmasını (korumasını kaldırma) destekler; ancak korumalı adresten korumalı adrese imzalamayı desteklemez. Orijinal Nano S ise iki uygulamayı da desteklemez; çünkü Ledger bu cihazın desteğini aşamalı olarak sonlandırıyor ve en yeni Zcash uygulaması bu cihazda kullanılamıyor. Cihazlar, Ledger Wallet’a (eski adıyla Ledger Live) bağlanır. Ledger’ın bu yardımcı uygulaması masaüstünde Windows, macOS ve Linux için; mobilde ise iOS ve Android için kullanılabilir.

Ledger, ayrı bir yardımcı cüzdan ihtiyacını ortadan kaldıran ve Ironwood havuzu üzerine kurulu yerel korumalı Zcash desteğini Ledger Wallet Desktop’a ekledi. ZEC, iOS ve Android için Ledger mobil uygulamasında henüz desteklenmiyor; ancak gelecekteki bir sürümde mobil desteği sunulması planlanıyor.

Ledger’ın kendi yazılımı dışındaki korumalı kullanım, uyumlu bir yardımcı cüzdana ve bu cüzdanın desteklediği platformlara bağlıdır. Ledger, Ironwood desteğini genişletmeyi sürdürürken uyumluluk; cihaz modeline, ürün yazılımına, uygulama sürümüne ve işletim sistemine bağlıdır. Bu nedenle genel Zcash desteği, uyumluluğu mutlaka garanti etmez.

https://www.youtube.com/watch?v=VhkhfG0LCFs

### YWallet ile soğuk imzalama: önceki bir yaklaşım

Ywallet, hem Ledger’dan hem de Zondax’dan ayrı bir yardımcı cüzdandır ve korumalı soğuk imzalama için kendi yolunu izledi.

Ywallet, Zcash için soğuk imzalamayı araştırması bakımından tarihsel öneme sahiptir. Bu yaklaşımda imzalama cihazı çevrimiçi cüzdandan ayrı tutulabiliyordu.

Bu mimariyi Ledger donanımında hayata geçirmek için Ywallet, önceki bölümde ele alınan Zondax uygulamasından farklı, tescilli bir uygulama olan kendi Ledger uygulamasını geliştirdi. Bu da Ywallet’ın Zondax’ın mevcut Sapling uygulamasına dayanmadığı anlamına geliyordu; imzalama tarafını yöneten kendi ürün yazılımı vardı.

### Entegrasyon neden önemliydi

Kriptografiye ve imzalama koduna sahip olmak tek başına yeterli değildir. Donanım cüzdanı entegrasyonu yalnızca kriptografik bir sorun değildir; aynı zamanda kaçınılmaz bir dağıtım ve platform sorunudur. En azından şunları kapsar:

- Uygulama onayı/dağıtımı — donanım üreticisinin resmî uygulama mağazasının uygulamayı kabul edip dağıtıp dağıtmayacağı
- Ürün yazılımı/uygulama güvenliği — uygulamanın anahtar malzemesini işlemek için üreticinin güvenlik gereksinimlerini karşılayıp karşılamadığı
- İletişim protokolleri — yardımcı cüzdan ile cihazın işlem verilerini gerçekte nasıl alışveriş ettiği
- Cüzdanla uyumluluk — imzalama uygulamasının veri biçimlerinin ve akışının yardımcı cüzdanın beklentileriyle eşleşip eşleşmediği
- Desteklenen korumalı havuzlar — uygulamanın Sapling, Orchard ve artık Ironwood için hangilerinde imza oluşturabildiği

Ywallet’ın tescilli Ledger uygulaması kriptografik ve mimari gereksinimleri karşılıyordu; korumalı Zcash işlemlerini imzalayabiliyordu, ancak Ledger’ın resmî uygulama mağazasına kabul edilmemişti.

### Tescilli Ledger uygulamasından geçiş

Uygulama resmen kabul edilmediği için Ywallet, kullanıcıların uygulamayı kullanabilmesi için imzasız ürün yazılımı yüklemelerini istemek zorunda kalacaktı. Bu, kullanıcılar için gerçek bir güvenlik taviziydi ve Ywallet bunu istememeyi seçti. Bu nedenle Ywallet sonunda bu yolu izlemek yerine söz konusu entegrasyondan vazgeçti.

Tescilli bir uygulamayı yeniden canlandırmak yerine, daha sonraki geliştirme çalışmaları Zkool üzerinden —Ywallet’ın halefi— özel olarak reddedilmiş bir uygulamadan, Ledger’ın dağıtım ekosistemine zaten kabul edilmiş standart Zondax yapımı Ledger uygulamasına yöneldi. Bu değişim, çalışan bir Ledger entegrasyonunun yeniden mümkün olmasını sağladı.

### Ywallet’ın mirası

Ywallet aktif geliştirmeden çekildikten sonra bile, yaratıcısı ve aynı zamanda ZCG üyesi olan Hanh ekosistemde söz sahibi olmaya devam etti. Özellikle Ironwood geçişi, kaybolmuş gibi görünen fonlarla ilgili bildirilen sorunları gündeme getirdiğinde bu önem kazandı.

**ZODL: bir kullanıcı Orchard → Ironwood geçişinden sonra fonlarının eksik olduğunu bildirdi**

Jmo0615 adlı bir kullanıcı, daha önce ZODL cüzdanında görünen fonların Orchard’den Ironwood’e geçişten sonra artık görünmediğini bildirdi. Orijinal seed’i geri yüklediğini, cüzdanı sıfırlayıp kurtardığını ve ZODL 3.14.1 sürümünün (1) tamamen eşitlenmesini beklediğini belirtti. Ayrıca herhangi bir Keystone donanım cüzdanının kullanılmadığını doğruladı.

Fonların gerçekten kaybolduğu kanıtlanmış değildir. Bunun yerine, Ironwood’e geçişten sonra daha önce görünen fonların artık görüntülenmemesine yol açan bir cüzdan keşfi veya geçiş sorunu olduğundan şüpheleniliyor. Algılanmayan veya görüntülenmeyen fonlar otomatik olarak kalıcı biçimde kaybolmuş fonlar diye tanımlanmamalıdır. Geçiş sorunlarını anlamak açısından bu ayrım önemlidir.

https://forum.zcashcommunity.com/t/funds-not-showing-since-ironwood/57792

**Zkool: “kilitli notlar” görünürde erişilemeyen fonları açıklayabilir**

Korumalı cüzdanların bir diğer önemli yönü, cüzdan durumunun kullanıcının gerçekte harcayabileceği fonları nasıl etkileyebileceğidir. Hanh, kullanıcının harcama için hangi notların kullanılacağını elle seçmesini sağlayan bir özellik olan coin control aracılığıyla bir notu yanlışlıkla kilitleyebileceğini açıkladı. Böyle bir durumda not cüzdanda hâlâ bulunabilir, ancak harcanamaz olarak işaretlenmiş olabilir.

Bu, cüzdan sorunlarını araştırırken önemli bir ayrımı ortaya koyar. Cüzdandaki toplam ZEC miktarı, o anda harcanabilir olan miktarla her zaman aynı değildir. Not seçimi, eşitleme, geçiş durumu, cüzdan kurtarma ve coin control ayarları gibi etkenler görüntülenen veya harcanabilir bakiyeyi etkileyebilir. Bu nedenle “eksik fon” bildirimlerinde; algılanmayan veya görüntülenmeyen fonlar, algılandığı hâlde harcanamayan fonlar ve gerçekten kaybolmuş fonlar dikkatle birbirinden ayrılmalıdır.

https://youtube.com/shorts/eAOMRVYJFTA?si=xytBs-wZKn8hmu8D

## 2. Keystone

**Keystone nedir?**

Keystone, imzalama işlemi sırasında imzalama cihazıyla yardımcı uygulama arasında doğrudan kablolu veya kablosuz bağlantı bulunmayan, bunun yerine QR kodlarıyla iletişim kuran bir çevrimdışı donanım cüzdanıdır. Burada, artık Zodl adıyla bilinen Zashi ile eşleştirilmiştir. Bu, Zcash’ın yerel yardımcı cüzdanıdır ve bu eşleşme, anahtarları yalıtma ilkesini alışılmadık ölçüde açık ve izlenebilir kılar.

**Keystone/Zashi akışı**

Keystone’ın Zashi ile Zcash entegrasyonu bu ayrımı özellikle belirgin kılar. Keystone’i Zashi’e bağladığınızda Unified Full Viewing Key, Keystone’dan Zashi’e aktarılır.

Akış şöyledir:

![Keystone and Zashi viewing flow](/content-images/keystone-zashi-viewing-flow.webp)

**Zashi UFVK ile ne yapabilir?**

Zashi bunu şu amaçlarla kullanabilir:

- Gelen korumalı işlemleri belirlemek
- Bakiyeleri hesaplamak
- Korumalı etkinliklerle ilgili bilgi edinmek

Ancak yalnızca UFVK’ye sahip olduğu için fonları harcayamaz.

UFVK, bakiye ve işlemleri görüntülemeyi sağlayan bir “görüntüleme yetkisidir”; harcama yetkisi vermez.

### Keystone içinde ne kalır?

Seed/harcama yetkisi Keystone üzerinde kalır. Zashi seed’i, harcama anahtarını veya harcamaya yetki veren özel anahtarı almaz. Yalnızca UFVK’yi, adres bilgilerini ve salt görüntüleme işlemi için gerekli bilgileri alır.

Bu iki parça bir araya geldiğinde tablo tamamlanır. UFVK, adresler ve izleme bilgileri gibi cihazdan çıkan veriler, Zashi’ın hesabı izlemesine yeter; ancak cihazdan çıkan hiçbir şey fonları hesaptan taşımaya yetmez.

Bu nedenle Zashi ve Keystone entegrasyonu korumalı soğuk depolama sağlayabilir. Cüzdan uygulaması, harcama için gereken yetkiye sahip olmadan hesabı izleyebilir. Entegrasyon, korumalı ZEC için soğuk depolamayı mümkün kılmak amacıyla özellikle başlatılmıştır.

Harcama yapmak istediğinizde:

![Keystone and Zashi spending flow](/content-images/keystone-spend-flow.webp)

## 3. Hito

Hito, anahtar yalıtımı açısından Keystone’a çok benzer bir model izler, ancak uygulaması daha yenidir. Zashi gibi mevcut bir yardımcı cüzdanla eşleştirmek yerine Hito, kendi Android cüzdanıyla birlikte gelir. Donanım cihazı ile bu Android uygulaması arasındaki ilk kurulum süreci Hito’ın geliştirme kilometre taşlarında belgelenmiştir.

**İlk kurulum: Hito uygulaması ne alır?**

Android cüzdanı, donanım hesabını ilk kez kurarken şunları kullanır:

- Unified Full Viewing Key (UFVK)
- Unified Address
- ZIP-32 seed parmak izi
- Ağ bilgileri

Android uygulamasının donanım cüzdanının seed’ini veya özel harcama anahtarlarını hiçbir zaman almadığını unutmayın.

![Hito onboarding](/content-images/hito-onboarding.webp)

**Hito uygulaması ne alır?**

Belgelenen ilk kurulum bilgileri şunları içerir:

- UFVK
- Unified Address
- ZIP-32 seed parmak izi
- Ağ

UFVK, seed’i almadan hesabı görüntüleme özellikli bir cüzdan olarak çalıştırmak için Android cüzdanına gereken bilgileri sağlar. Seed parmak izi, seed’den türetilen ve hangi hesabın hangisi olduğunu tanımaya yarayan sabit uzunlukta bir tanımlayıcıdır. Seed’in kendisi değildir ve harcama yetkisi vermez; bu nedenle bulunması, yukarıdaki “seed’i hiçbir zaman almaz” ifadesiyle çelişmez.

**Hito üzerinde ne kalır?**

Seed’in kendisi, özel harcama anahtarları ve imzalama yetkisi donanım cihazında kalır. Hito daha sonra imzalama işlemini çevrimdışı gerçekleştirir.

Mevcut Hito kilometre taşı, oluşturma, dışa aktarma, çevrimdışı imzalama ve içe aktarma iş akışının tamamının çalışır durumda olduğunu belirtiyor. İmzalanmış PCZT aktarımı için BLE ve BBQr QR dışa aktarımı kullanılıyor.

Bu iş akışını özellikle adlandırmak gerekir; çünkü bu, raporun başında ele alınan eksiksiz döngünün somut bir örneğidir: Android cüzdanı imzalanmamış PCZT’ı oluşturur ve Hito’ye aktarır; Hito yalıtılmış anahtar malzemesiyle çevrimdışı imzalar ve imzalanmış PCZT, Android cüzdanına geri aktarılır.

Seed veya harcama anahtarı hiçbir aşamada bu sınırı hiçbir yönde geçmez.

![Hito signing flow](/content-images/hito-signing-flow.webp)

## Orchard ile Ironwood: Donanım Cüzdanı Desteğinin Evrimi

Orchard, Zcash protokolünde kullanıcıların ZEC gelişmiş gizlilikle saklamasını ve transfer etmesini sağlayan korumalı bir havuzdur. Ağ Yükseltmesi 5'te (NU5) tanıtılan Orchard, gönderici, alıcı veya tutar gibi hassas işlem bilgilerini açığa çıkarmadan korumalı işlemleri desteklemek için Halo 2 ispat sistemini ve yeniden tasarlanmış bir kriptografik mimariyi kullanır.

Ironwood, Zcash'ın NU6.3 ağ yükseltmesinde, Orchard havuzunun halefi olarak tanıtılan korumalı bir havuzdur. Orchard kriptografik protokolünü kullanırken, kuantum kurtarılabilirliği ve arz bütünlüğüne ilişkin daha güçlü güvenceler de dahil olmak üzere, korumalı fonların uzun vadeli güvenliğini artırmak üzere tasarlanmış değişiklikler getirir.

Öncelikle, Ironwood'ın Orchard protokolünü tamamen yeni bir kriptografik sistemle değiştirmediğini açıklığa kavuşturmak gerekir. Ironwood, mevcut Orchard protokolü temel alınarak oluşturulmuş yeni bir korumalı havuz olarak tanıtıldı. Bu, aynı Action yapısına, aynı Halo 2 ispat sistemine, aynı not ve anahtar yapılarına sahip oldukları anlamına gelir.

Ironwood'ın kendine ait bir not taahhüt ağacı, nullifier kümesi, anchor'ı ve değer havuzu vardır; dolayısıyla mutabakat düzeyinde gerçekten ayrı bir havuzdur. Ancak kriptografik açıdan, baştan inşa edilmek yerine Orchard'ın bir uzantısıdır.

Bu tasarımın amaçları şunlardı:

1. **Arz bütünlüğü.** 29 Mayıs 2026'da güvenlik araştırmacısı Taylor Hornby, Orchard'ın sıfır bilgi ispat sisteminde, zincir üzerinde iz bırakmadan sahte ZEC oluşturulmasına olanak tanıyabilecek kritik bir sağlamlık açığını özel olarak bildirdi. Orchard işlem verileri gizli olduğundan, düzeltme öncesinde sahte ZEC oluşturulmadığını hiç kimse bağımsız olarak doğrulayamaz. Eski havuzu mühürleyip sıfırdan yeni bir havuz başlatmak, Orchard'ı yerinde yamayarak çözülemeyecek bu sorunu çözer.
2. **Kuantum kurtarılabilirliğini sağlamak.** Ironwood, altta yatan ayrık logaritma varsayımlarının bozulması halinde fonlarının gelecekteki bir kurtarma mekanizmasına katılabilmesi için tasarlandı.
3. **Uygulama değişikliklerini en aza indirmek.** Tamamen yeni bir korumalı protokol tasarlamak yerine, Orchard'ın kendini kanıtlamış mimarisi yeniden kullanıldı. Böylece işlem, ispat, cüzdan ve donanım cüzdanı kodlarının çok daha azı sıfırdan yazılmak zorunda kaldı.

### Kamuya açık zaman çizelgesi

- 29 Mayıs: Orchard güvenlik açığı açıklandı.
- Haziran: Orchard işlemleri, ilk düzeltme NU6.2 üzerinden yayımlanırken geçici olarak kısıtlandı. 12 Haziran'da bir çekirdek geliştirici tam yükseltme için 21 Temmuz tarihini hedefledi; tarih daha sonra bir hafta ertelendi. Toplulukta Keystone sahiplerinin geçiş yapanlar arasında en son sırada kalacağı endişesi dile getirildi. Bunun üzerine bir çekirdek geliştirici, imzalama sabitlerinin kesinleşmesi ve Zcash çekirdeğinden Orchard API değişikliklerinin tamamlanması koşuluyla, Keystone'ın ilk günden itibaren Ironwood desteği sunacağını ve aygıt yazılımının 3 Temmuz için hedeflendiğini söyledi.
- Temmuz başı: NU6.3 test ağına ulaştı; Zebra 6.0.0, 10 Temmuz'da yayımlandı.
- 27–28 Temmuz: Ledger'ın Ironwood PCZT v2 imzalama çalışması bir entegrasyon dalına birleştirildi. Ironwood (NU6.3), 3.428.143 numaralı blokta 28 Temmuz'da etkinleşerek, orijinal Orchard havuzunu bir turnikenin arkasında mühürledi. Bu turnike, ZEC'ın Orchard havuzundan çıkabilecek miktarını, havuza meşru biçimde yatırılmış miktarla sınırlar ve yeni bir işlem biçimi getirir.

Zebra artık gerekli düğümdür; çünkü zcashd yeni mutabakat kurallarını desteklemez. Ironwood, Orchard'in alıcı yapısını yeniden kullandığından adresler değişmez; bu nedenle cüzdanlar mevcut adresleri otomatik olarak yeni havuza yönlendirir. Cüzdanların ihtiyaç duyduğu şey geçiş işlevselliğidir; çünkü Orchard fonlarının eninde sonunda sahipleri tarafından Ironwood'e taşınması gerekir ve Orchard alan yeni çıktılar artık mutabakat kuralları tarafından tamamen engellenir.

### Teknik olarak neler değişti

İşlem biçimleri 5. sürümden 6. sürüme geçti; böylece tek bir işlem, mevcut Sapling/Orchard/şeffaf bileşenlerin yanı sıra bir Ironwood bileşeni de içerebilir. PCZT de buna uyacak şekilde genişletildi:

- Kodlama PCZT v1'den v2'ye geçti.
- Artık Sapling ve Orchard paketlerinin yanında ayrı bir Ironwood paketi bulunuyor.
- v6 işlemleri ve yeni bir v6 sighash destekleniyor.
- Not düz metinleri yeni bir sürüm kazandı (V3).

Sighash değişikliği özellikle donanım cüzdanları için önemlidir. v6'da Orchard ve Ironwood anchor'ları imza özetinin dışında bırakılır ve yalnızca yetkilendirme verisi özetine dahil edilir. Bu, yalnızca sürüm numarasının artması değil, gerçek bir aygıt yazılımı değişikliğidir. Aygıt yeni sighash'i doğru uygulamalı ve eşlik eden uygulamanın onayladığını iddia ettiği veriye güvenmek yerine özeti kendi başına yeniden hesaplamalıdır.

Yalıtım sözleşmesinin kendisi değişmedi: aygıt yalnızca harcama yetkilendirme imzasını döndürür; `alpha`'ı asla döndürmez ve bağlayıcı imzayı da asla üretmez. İspat oluşturma ve diğer her şey yine ana bilgisayar tarafından yürütülür.

Bununla birlikte, v6 ile bir imzalayıcı kuralı değişti: kukla dolgu harcamaları aygıt yerine IO Finalizer tarafından imzalanır; çünkü aygıt bunları gerçek not verileriyle doğrulayamaz. Aygıtın İmzacı rolü, denetleyemeyeceği bir şeyi imzalamaya zorlanmak yerine bunları atlar. v6 işlemi aynı işlemde iki havuzdan da harcama yapabileceğinden, gösterilen ücretler artık Orchard ve Ironwood değer bakiyelerinin toplamını da içerir.

Havuz muhasebesini doğru yapmak yalnızca teoride değil, uygulamada da önemlidir. Brave'ın kendi Zcash cüzdanında yakın zamanda ortaya çıkan bir hata bunu iyi gösteriyor: ücret hesaplaması, tüm korumalı girdilerin eski Orchard havuzuna ait olduğunu varsayarak bir işlem gerçekten Ironwood içerdiğinde yinelenen action'lara ve hatalı ücret tahminlerine yol açtı. Donanım cüzdanı imzalamanın temelindeki “kendin yeniden hesapla, ana bilgisayara güvenme” ilkesi tam da bu tür hataları yakalamak içindir. Eşlik eden cüzdan havuz muhasebesini yanlış yaptı; bunu imzalamadan önce ancak kendi hesaplamalarını bağımsız olarak denetleyen bir aygıt fark edebilirdi.

### Her imzalayıcının durumu

**Ledger tüm tabloyu değiştirdi.** 23 Eylül 2026'da Ledger, ayrı bir eşlik eden uygulamaya artık ihtiyaç kalmadan, doğrudan Ledger Wallet Desktop içine yerel korumalı Zcash desteği ekledi. Harcama anahtarınız aygıtta kalır, bilgisayar işlem hesaplamalarını yapar ve işlem imzalanmadan önce ekranda her şeyi onaylarsınız. Yalnızca Ironwood desteklenir; eski Orchard veya Sapling havuzları desteklenmez. Dezavantajı, çalışmak için Zkool gibi bir eşlik eden cüzdan gerektiren ve Zondax tarafından geliştirilen eski “Zcash Shielded” uygulamasının kullanımdan kaldırılıyor olmasıdır. Ledger, bu eski uygulamayı kullanıma sunmayı bırakacağı tarih olarak 5 Kasım 2026'yı belirledi; bu nedenle uygulama üzerinden hâlâ tutulan fonlar yeni uygulamadaki bir hesaba taşınmalıdır.

**Keystone iyi durumda.** 3.0.2 aygıt yazılımı, temmuz ayında tam Ironwood desteği eklemişti. 3.2.2 aygıt yazılımı (11 Kasım 2026), Web3 ve Cypherpunk sürümlerine NU7 desteği ekledi ([sürüm notları](https://github.com/KeystoneHQ/keystone3-firmware/releases/tag/3.2.2)). NU7 Mainnet'te etkin olduğundan, imzalamadan önce 3.2.2 veya daha yeni bir sürüme güncelleyin.

**Hito ilk test ağı aşamasını geçti.** Gerçek bir Orchard-Ironwood işlemini fiziksel donanımda başarıyla imzalayıp gönderdi (başlangıçta test ağında). Sonraki güncellemeler, üretim donanımında mainnet akışlarının (Ironwood→Ironwood, Ironwood→Şeffaf ve diğerleri) çalıştığını doğruladı. Kararlı aygıt yazılımı ve daha geniş kapsamlı sürüm hâlâ geliştirme aşamasında.

**Zkool her iki Ledger uygulamasıyla da çalışıyor.** Zondax'ın uygulaması, Ledger'te kullanımdan kaldırılacak uygulamadır. Ledger aygıtlarıyla iletişim kurmak için bu uygulamaya ihtiyaç duyan Zkool, son tarihten önce geçiş yaptı: [6.30.0](https://github.com/hhanh00/zkool2/releases/tag/zkool-v6.30.0) sürümünden (12 Eylül 2026) itibaren Ledger'ın yeni resmî Zcash uygulamasıyla da çalışıyor; aygıttan UFVK'yi içe aktarıyor, v6 (Ironwood) işlemlerini imzalıyor ve Zondax uygulamasındaki hesapları da desteklemeye devam ediyor. Sonraki sürümlerde Ledger yolu da çalışmayı sürdürdü (6.32.0, Zkool'ın GraphQL API'si üzerinden Ledger hesaplarını içe aktarıyor; 6.36.0 ise kısa Ledger yanıtlarında oluşan bir çökme hatasını düzeltti). Dolayısıyla eşlik eden bir cüzdanı Ledger Wallet Desktop'a tercih eden Ledger kullanıcıları için Zkool hâlâ bir seçenek.

Havuzlar arasında taşınan miktar herkese açık olduğundan, cüzdanlar bakiyeyi tek seferde ve açıkça görülebilen bir parça hâlinde taşımak yerine, transferleri zaman içinde standart kupürlere bölerek yapar. Bu da her geçiş için imzalanması gereken çok sayıda işlem demektir ve donanım cüzdanlarında toplu PCZT imzalamanın neden bu kadar önemli olduğunu açıklar.

Ledger aygıt yazılımı çalışması donanım sınırlarına da takıldı: gerçek bir not harcama işlemi tek bir komutta on binlerce kriptografik sistem çağrısı yapabilir ve bu da aygıtın bekçi zamanlayıcısını devreye sokabilirdi. Çözüm, alan aritmetiğini yazılıma taşımak ve paylaşılan bir çalışma durumunun Nano X yığın kısıtlarına sığmasını sağlamaktı.

https://forum.zcashcommunity.com/t/ironwood-is-here-updated-wallets-libraries-aug-20/56557/40

### Evrime tek bir görselde bakış

![The evolution in one picture](/content-images/orchard-to-ironwood-evolution.webp)
