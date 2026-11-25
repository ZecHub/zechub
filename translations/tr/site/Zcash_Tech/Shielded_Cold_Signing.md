# Korumalı Soğuk İmzalama

> **Temel fikir:** Eşlikçi cüzdan, korumalı bir işlemi oluşturmak ve izlemek için gereken her şeyi görür. Yalnızca donanım cüzdanı, harcama yetkisini elinde tutar. Korumalı soğuk imzalamanın tüm amacı bu ayrımdır.

Zcash içinde koruma, Zcash gizlilik özelliklerini kullanarak işlem ayrıntılarını gizlemek üzere fonların herkese açık, şeffaf bir adresten özel, korumalı bir adrese aktarılmasını içerir.

### ZEC koruması uygulandığında ne değişir?

Şeffaf bir Zcash işleminde aşağıdaki gibi bilgiler:

- gönderen adresi
- alıcı adresi
- aktarılan miktar

blokzincirde gözlemlenebilir.

ZEC koruması uyguladığınızda fonlarınız özel bir havuza (Ironwood gibi) aktarılır. Blokzincir, özel işlem ayrıntılarınızı açığa çıkarmadan bir işlemin geçerli olduğunu doğrulayabilir. 28 Temmuz 2026'da yapılan NU6.3 ağ yükseltmesinden bu yana, yeni korumalı fonlar Ironwood havuzuna aktarılır; eski Orchard havuzu artık yeni yatırımları kabul etmese de çekimlere izin vermeye devam eder.

### Korumalı Bir İşlemin Bileşenleri

### 1. Note (Korumalı Bakiye Kaydı)

Note, bir kullanıcının sahip olduğu ZEC tutarındaki harcanmamış miktarı temsil eden özel, kriptografik bir kayıttır.

Bakiyelerin açık metin olarak listelendiği herkese açık bir blokzincirin aksine, korumalı bir note, fonların kime ait olduğunu zincir üstündeki gözlemcilerin görememesi için değer ve sahiplik ayrıntılarını şifreler.

Bir işlem başlatılırken eşlikçi cüzdan defteri tarar, kullanıcının harcanmamış notelarını belirler ve hangilerinin harcanacağını seçer.

### 2. Nullifier (Çifte Harcama Tespit Mekanizması)

Bir notenin ayrıntıları herkese açık defterden gizlendiği için ağın, hangi notenin harcandığını açığa çıkarmadan çifte harcamayı tespit edecek bir mekanizmaya ihtiyacı vardır.

Nullifier, belirli bir noteden türetilen benzersiz bir kriptografik işaretleyicidir. Bir note harcandığında nullifier'ı blokzincirde yayımlanır.

Ağ, nullifier'ın daha önce kaydedilmediğini doğrular. Kaydedilmemişse harcama kabul edilebilir. Önemli olarak, dışarıdan bir gözlemci nullifier'ı kullanarak hangi belirli noteden geldiğini belirleyemez.

Eşlikçi cüzdan, işlem verilerini oluştururken uygun nullifier'ı türetir ve oluşturur.

## Anahtarlar

Anahtarlar, fonlarınıza erişimi denetleyen ve cüzdanınızın ZEC alma, görüntüleme ve harcama gibi işlemleri gerçekleştirmesini sağlayan kriptografik bilgi parçalarıdır.

Bir cüzdan, her biri farklı bir amaca hizmet eden çeşitli anahtarlar tutar; tıpkı tek bir hesabın okuma ve yazma erişimi için ayrı kimlik bilgileri olabilmesi gibi.

Farklı anahtarlar farklı amaçlara hizmet ettiği ve bunlardan yalnızca birinin kilit altında tutulması gerektiği için, anahtarlar eşlikçi cüzdan ile donanım cüzdanı arasındaki ilişkinin merkezinde yer alır.

Her korumalı havuzun anahtarlarını, okların bir bileşenden ondan türetilebilen bileşenlere doğru yöneldiği bir türetim ağacı olarak oluşturduğunu bilmek önemlidir. Korumalı ödeme almak isteyen kullanıcıların, harcama anahtarından oluşturulan bir korumalı ödeme adresine sahip olması gerekir.

### Anahtar hiyerarşisi

**1. Harcama anahtarı**

Bu, güvenlik açısından en hassas anahtardır. ZEC harcamayı yetkilendirmek için gereken kriptografik yeteneği sağlar.

Bu raporun başka yerlerinde “donanım cüzdanı anahtarı tutar” denildiğinde kastedilen anahtar budur.

Soğuk imzalama mimarisinde harcama anahtarı donanım cüzdanının içinde tutulur ve eşlikçi cüzdana asla açığa çıkarılmaz. Eşlikçi cüzdanın bu anahtara hiç sahip olması gerekmemelidir.

Hem Sapling hem de Orchard içinde anahtar hiyerarşileri, harcama yetkisini ve görüntüleme becerilerini bir kök harcama anahtarından gelen iki ayrı dal olarak türetir:

- **Sapling:** Genişletilmiş bir harcama anahtarı (𝑎𝑠𝑘,𝑛𝑠𝑘,𝑜𝑣𝑘), kanıt yetkilendirme anahtarlarını (𝑎𝑘,𝑛𝑠𝑘) ve tam görüntüleme anahtarlarını (𝑎𝑘,𝑛𝑘,𝑜𝑣𝑘) türetir; bunlardan da gelen görüntüleme anahtarları (𝑖𝑣𝑘) ve çeşitlendirilmiş adresler elde edilir.
- **Orchard:** Bir kök harcama anahtarı (𝑠𝑘), doğrudan bir harcama yetkilendirme anahtarına (𝑎𝑠𝑘) ve tam görüntüleme anahtarına (𝑎𝑘,𝑛𝑘,𝑟𝑖𝑣𝑘) ayrılır.

Bu yapısal ayrım, donanım anahtarı yalıtımının biçimsel kriptografik temelini sağlar. Bu yaklaşımda cüzdan, bakiye eşitleme ve işlem oluşturma için görüntüleme dalını (UFVK) ana bilgisayara aktarırken harcama yetkilendirme dalını cihazda kalıcı olarak kilitli tutar.

Anahtar türetimi kesinlikle tek yönlüdür. Bu, görüntüleme anahtarlarının harcama yetkisini yeniden oluşturmak üzere tersine çevrilemeyeceği anlamına gelir. Kriptografik olarak geri döndürülemez olması, Birleşik Full Viewing Key (UFVK) dışa aktarmayı güvenli kılar; çünkü bu, cihazdaki harcama sırlarını açığa çıkarmadan cüzdanın tamamını görüntüleme olanağı sağlar.

**2. Görüntüleme anahtarları**

Zcash, korumalı etkinliği görme yeteneğini harcama yeteneğinden ayırır. Görüntüleme anahtarı, bir cüzdanın veya başka bir yetkili tarafın harcama yetkisi vermeden korumalı işlemlere ilişkin bilgileri görüntülemesini sağlar.

- **Full Viewing Key (FVK), Birleşik Full Viewing Key (UFVK) olarak sarılmış biçimde:** Harcama anahtarından kasıtlı olarak türetilir; yazılımın cüzdanın korumalı etkinliğini tespit edip şifresini çözmesini ve böylece işlemleri belirlemesini sağlar. Ayrıca harcamayı yetkilendiremeden bakiyeleri hesaplamasına olanak tanır. Bunu, seed'in daha zayıf bir kopyası olarak değil, harcama anahtarının gizliliği daha düşük bir türevi olarak tanımlamak en doğrusudur.

Full Viewing Key (FVK), katı güvenlik ayrımını korurken salt okunur tam görünürlük sağlar. Gelen ve giden note şifreli metinlerinin her ikisinin de şifresini çözerek (giden görüntüleme anahtarı bileşeni aracılığıyla), yalnızca bakiyeyi değil, etiketlenmiş eksiksiz bir işlem geçmişini de eşlikçi cüzdanda gösterebilir.

Birden fazla ilişkilendirilemez çeşitlendirilmiş ödeme adresi aynı FVK'yı ve gelen görüntüleme anahtarını (IVK) paylaşır; böylece blokzincir tarama yükünü artırmadan sınırsız adres oluşturulabilir.

Bu işlevsel ayrım, soğuk imzalama iş akışlarının temelini oluşturur. Sürekli Zincir taraması, geçmiş takibi ve adres yönetimi ana bilgisayardaki yazılıma devredilirken harcama yetkisi donanım cihazında yalıtılmış olarak kalır.

![Anahtar türetme diyagramları](/content-images/key-derivation-diagrams.webp)

### Kritik ayrım: UFVK ve harcama anahtarı

> **UFVK paylaşılabilir. Harcama anahtarı donanım cüzdanında kalmalıdır.**
>
> Eşlikçi cüzdan, cüzdanı izlemek, gelen fonları tespit etmek, noteları belirlemek ve işlemleri hazırlamaya yardımcı olmak için görüntüleme anahtarını kullanır. Harcamayı yetkilendirmek için gereken özel anahtara sahip değildir.

Daha önce belirtildiği gibi, anahtarların ayrılması soğuk imzalama mimarisinin temelidir.

Eşlikçi cüzdan, fonlar üzerinde hiçbir zaman denetim sahibi olmadan işlem hazırlamak için gereken işlerin çoğunu yapabilir. Donanım cüzdanının yalnızca hazırlanan işlemi alması ve son imzalama işlemini gerçekleştirmesi yeterlidir.

Donanım cüzdanı üreticilerinin bu ayrımı kendilerinin icat etmesi gerekmez. Zcash anahtar tasarımı, görüntüleme becerilerini harcama yetkisinden protokol düzeyinde zaten ayırır; üreticiler de imzalama ve dışa aktarma işlevlerini bu mevcut yapının üzerine kurar. Protokol, korumalı adres veya tam görüntüleme anahtarı gibi bilgilerin harcama anahtarından türetilmesine izin verirken harcama anahtarının kendisini özel tutar. Böylece Ledger, Keystone ve Hito gibi donanım cüzdanları, fonları harcayabilecek özel anahtarı hiçbir zaman açığa çıkarmadan eşlikçi yazılıma ihtiyaç duyduğu görüntüleme bilgilerini sağlayabilir.

### Eşlikçi cüzdan anahtar bilgilerini nasıl kullanır?

Eşlikçi cüzdan, görüntüleme anahtarı materyalini kullanarak şunları yapabilir:

- fonlarınızı ve notelarınızı belirlemek
- hangi notelaların harcanabileceğini belirlemek
- ilgili adresleri türetmek veya belirlemek
- işlemi oluşturmak
- gerekli kanıtları üretmek veya üretimini koordine etmek
- işlemi imzalama için hazırlamak

İşlem oluşturma gereksiniminin, özel harcama anahtarına ihtiyaç duymakla aynı şey olmadığını bilmek önemlidir. Bu ayrıştırma, donanım cüzdanı entegrasyonunun ardındaki temel güvenlik fikirlerinden biridir.

## Korumalı İşlemin Oluşturulması ve Yetkilendirilmesi

Bunlar, işlemi oluşturma ve yetkilendirme süreçleridir. Basitçe söylemek gerekirse, cüzdanın para göndermek için bu verilerle yaptığı işlemler bunlardır:

### İşlem Oluşturma (Korumalı İşlemi Bir Araya Getirme)

İşlem oluşturma, kullanıcının yapmak istediği ödemeden geçerli bir Zcash işlemi oluşturmak için gereken bilgileri bir araya getirme sürecidir.

İşlem oluşturma süreci; seçilen noteları, alıcıları, tutarları, ücretleri, nullifier'ları ve gerekli diğer işlem verilerini bir işlem yapısında birleştirir. Korumalı işlemler için gerekli sıfır bilgi kanıtlarının ve imzaların oluşturulması için gereken bilgileri de hazırlar.

Bu aşamayı genellikle eşlikçi cüzdan yürütür. Cüzdan:

- Harcanacak noteları seçer
- İşlemin girdilerini ve çıktılarını belirler
- Gerekli değerleri hesaplar
- Daha sonra kanıtlanıp imzalanacak işlem verilerini hazırlar.

Soğuk imzalama kurulumunda ortaya çıkan işlem verileri bir PCZT içinde paketlenerek güvenlik açısından kritik imzalama aşaması için donanım cüzdanına aktarılabilir.

### Kanıtlama (Protokol Geçerliliğini Gösterme)

Kanıtlama, bir işlemin Zcash protokol kurallarına uyduğunu gösteren sıfır bilgi kanıtlarının (Halo 2 veya Groth16 gibi) oluşturulmasını ifade eder.

Kanıt, ağın şunları garanti etmesine yardımcı olur:

- Harcama yapan kullanıcının noteları harcama yetkisi vardır
- Notelar gerçekten vardır
- Karşılık gelen nullifier'lar benzersizdir
- Toplam girdiler, toplam çıktılar ile ücretlerin toplamına eşittir.

Tüm bunları, altta yatan özel ayrıntıları açığa çıkarmadan yapar.

Kanıt oluşturma yoğun hesaplama gerektirir. Bu sorumluluğu eşlikçi cihaza devretmek, donanım cüzdanının takılmasını veya belleğinin tükenmesini önler.

### İmzalama (Harcamayı Yetkilendirme)

İmzalama, kanıtlamadan temelde farklıdır. Dijital imza, özel anahtar sahibinin oluşturduğu açık bir yetkilendirme damgası işlevi görür.

Sıfır bilgi kanıtı işlem geçerliliğini doğrularken dijital imza harcama yetkisini kanıtlar. İmza, gerçek sahibin belirli aktarım parametrelerini onayladığını teyit eder.

İmzalama çok az işlem gücü gerektirdiğinden donanım cüzdanı için idealdir.

### Korumalı soğuk imzalama nedir?

Korumalı soğuk imzalama, özel harcama anahtarlarını internete bağlı eşlikçi cüzdandan yalıtılmış tutarken Zcash korumalı bir işlemi yetkilendirme yöntemidir. İşlem çevrimiçi bir bilgisayarda oluşturulup hazırlanabilir; çevrimdışı tutulan veya başka bir şekilde yalıtılmış ayrı bir donanım cüzdanı ise korumalı anahtarlarını kullanarak işlemi yetkilendirir.

Süreç şu şekilde basitleştirilebilir:

![Korumalı soğuk imzalama süreci](/content-images/cold-signing-process.webp)

Eşlikçi cüzdan yapılandırılmış işlem parametrelerini donanım cihazına gönderir. Cihaz, özel harcama anahtarını ana bilgisayara hiçbir zaman vermeden yükü kendi içinde imzalar.

## Eşlikçi Cüzdanlar ve Donanım Cüzdanları

Korumalı işlemlerde, her biri farklı bir işlev üstlenen bir eşlikçi cüzdan ile donanım cüzdanı birlikte kullanılabilir.

### Eşlikçi Cüzdan

Eşlikçi cüzdan nedir?

Eşlikçi cüzdan, bir bilgisayarda veya mobil cihazda çalışır ve işlemi oluşturmayla ilgili görevlerin çoğunu yerine getirir. Örneğin:

- Harcanacak noteları seçer
- İşlemi oluşturur
- Gerekli işlem verilerini hesaplar
- Gerekli sıfır bilgi kanıtlarının oluşturulmasını koordine eder.

### Eşlikçi cüzdan neden kullanışlıdır?

Eşlikçi cüzdan işlem oluşturma sürecini yürütür; ancak bilgisayara kötü amaçlı yazılım bulaşırsa bir saldırgan şunları yapabilir:

- ne yaptığınızı görebilir,
- imzalanmamış bir işlemi değiştirebilir,
- sizi bir şeyi onaylamaya kandırmaya çalışabilir.

Eşlikçi cüzdanın donanım cüzdanında saklanan özel anahtara erişmesi gerekmez. Bu nedenle, donanım cüzdanı özel anahtar için güvenlik sınırı sağlarken işlem oluşturma ve diğer hesaplama görevlerini üstlenebilir.

### Donanım Cüzdanı

Donanım cüzdanı, özel anahtarlarınızı bağlı telefonlardan veya bilgisayarlardan yalıtan, kripto varlıklarınız için güvenli bir kasa görevi gören çevrimdışı fiziksel bir cihazdır.

### Donanım cüzdanı neden kullanışlıdır?

Bilgisayarınıza kötü amaçlı yazılım bulaşırsa bir saldırgan şunları yapabilir:

- ne yaptığınızı görebilir,
- imzalanmamış bir işlemi değiştirebilir,
- sizi bir şeyi onaylamaya kandırmaya çalışabilir.

Özel anahtar donanım cüzdanından kolayca çıkarılamaz; bu nedenle cihaz bir güvenlik sınırı işlevi görebilir.

Eşlikçi ve donanım cüzdanlarının yeteneklerini gösteren görsel

Bu iki cüzdan arasındaki ayrım, korumalı işlemler için özellikle önemlidir; çünkü bu işlemler şeffaf işlemlerden daha karmaşıktır ve korumalı notelar, nullifier'lar, kriptografik taahhütler, sıfır bilgi kanıtları ve işlem imzaları gibi bileşenler içerir.

Donanım cüzdanının tüm hesaplama işlemlerini gerçekleştirmesi pratik olmazdı. Bunun yerine eşlikçi cüzdan işlemi hazırlar ve imzalama için gereken bilgileri donanım cüzdanına sağlar; özel harcama anahtarı ise donanım cihazının içinde yalıtılmış olarak kalır.

## Anahtar Yalıtımı

> Anahtar yalıtımı, harcamayı yetkilendirebilen özel anahtarların donanım cüzdanından hiçbir zaman çıkmaması anlamına gelir. Eşlikçi işlem hazırlayabilir; ancak imzalayamaz.

Anahtar yalıtımı, bir işlemi yetkilendirmek için gereken özel anahtarların eşlikçi cüzdandan ve çalıştığı cihazdan ayrı tutulmasını ifade eder. Korumalı soğuk imzalama kurulumunda eşlikçi cüzdan işlemi oluşturabilir ve gerekli kanıtları koordine edebilir; donanım cüzdanı ise hassas özel harcama anahtarlarını yalıtılmış biçimde saklar.

Eşlikçi bilgisayarın veya telefonun güvenliği ihlal edilirse saldırgan, işlem imzalanmadan önce işlemle etkileşime girebilir; ancak ideal koşullarda özel anahtarı donanım cüzdanından çıkaramaz. Böylece anahtar, donanım cihazının güvenlik sınırları içinde kalır.

Bu ayrım, eşlikçi cüzdanın işlemi oluşturmasına ve hesaplama görevlerini yerine getirmesine olanak tanırken işlemi yetkilendirmek için gereken anahtar materyaline doğrudan erişmesini engeller.

![Anahtar izolasyonu](/content-images/key-isolation.webp)

Yapılması gereken temel ayrım, “görüntüleme anahtarı”nın uygulamanın tohumun daha zayıf bir sürümünü aldığı anlamına gelmediğidir.

Zcash içinde Full Viewing Key (FVK/UFVK), harcama anahtarından bilerek türetilir ve sahibine ilgili korumalı etkinlikleri tespit edip şifrelerini çözme olanağı verir; ancak harcamaları yetkilendirme yetkisi vermez. FVK, harcama anahtarının daha az gizli bir türevidir.

**Önemli bir gizlilik uyarısı:**

UFVK tek başına uygulamanın fonları çalamayacağı bilinmelidir; ancak cüzdanın özel korumalı etkinliklerini görebilir.

Bu nedenle eşlikçi uygulamayı yalnızca “kamuya açık bilgilere” erişimi var diye tanımlamak yerine, *görüntüleme yetkisine* sahip olarak tanımlamak daha doğrudur.

Bu fikrin tamamını ifade etmenin en basit yolu şudur: Eşlikçi cüzdan, cüzdanda neler olduğunu bilecek kadar anahtar materyali alır; ancak cüzdanın fonlarıyla ne yapılacağını yetkilendirecek kadarını almaz. Donanım cüzdanı ise harcama yetkisini yalıtılmış biçimde saklar ve bu yetkiyi yalnızca kullanıcı bir işlemi onayladığında kullanır.

Bu, bu korumalı Zcash donanım cüzdanı tasarımlarının temelindeki anahtar yalıtımı modelidir ve yakında ele alınacak olan Ledger, Keystone ve Hito uygulamalarında, her birinin kendi uygulamasıyla karşımıza çıkar.

## PCZT

PCZT, Kısmen Oluşturulmuş Zcash İşlem anlamına gelir. Bir Zcash işlemi ve işlemi bir aşamadan diğerine taşırken tamamlamak için gereken bilgileri içeren pakettir.

İşlem hâlâ oluşturulma aşamasındayken Zcash işlemi için kullanılan standartlaştırılmış bir biçimdir. Farklı katılımcıların veya cihazların işlem oluşturma sürecinin farklı bölümlerini gerçekleştirmesine ve kısmen tamamlanmış işlemi aralarında aktarmasına olanak tanır.

Zcash gibi sıfır bilgi kripto para protokollerinde işlem oluşturmak, basit bir şeffaf transferi imzalamaktan çok daha karmaşıktır. Korumalı işlemler, örneğin Halo 2 veya Groth16 kullanılarak oluşturulanlar gibi, yoğun hesaplama gerektiren sıfır bilgi kanıtları gerektirir. Bu nedenle donanım cüzdanları gibi düşük güçlü cihazlar, tüm işlem iş akışını yürütmek için gereken bellek ve işlem kapasitesine sahip olmayabilir.

PCZT'ın kullanıma girmesi, korumalı kripto mimarisindeki bazı temel zorlukları ele alır. PCZT, işlem oluşturmayı modüler ve bağımsız rollere ayıran standartlaştırılmış bir ara veri biçimidir. Güçlü bir eşlikçi bilgisayarın işlem birleştirme ve kanıt oluşturma işlemlerini yürütmesine olanak tanırken çevrimdışı donanım cüzdanının görevini kesin olarak yetkilendirme ve imzalamayla sınırlar.

### Donanım ve Soğuk Saklama Sınırlamaları

Donanım cüzdanları özel harcama anahtarlarını korumak için güvenli bir ortam sağlasa da eşlikçi bilgisayarlara kıyasla genellikle sınırlı RAM, işlem gücü ve veri aktarım kapasitesine sahiptir. Bu kısıtlar, yoğun hesaplama gerektiren sıfır bilgi kanıtı oluşturma işlemlerini gerçekleştirmelerini veya işlem oluşturma sürecinde gereken işlem durumunun tamamını korumalarını pratik olmaktan çıkarır.

Sonuç olarak eşlikçi cüzdan, hesaplama açısından yoğun görevleri üstlenebilirken donanım cüzdanı, korumalı harcama anahtarlarıyla işlemi yetkilendirmek gibi güvenlik açısından kritik göreve odaklanır.

İnsan merak ediyor: Cihaz bu kadar kısıtlıysa güvenilir olması için *yeterli* doğrulamayı nasıl yapabiliyor?

Basitçe ifade etmek gerekirse, donanım cüzdanı eşlikçi bilgisayardan gelen gelişigüzel bir değeri kabul edip imzalayamaz. İmzalanan değerin, kullanıcının yetkilendirmek istediği işleme karşılık geldiğini belirlemek için yeterli bilgiye ihtiyaç duyar. Bu da zor bir denge yaratır; çünkü cihazın imzalama sürecini korumak için yeterli ayrıştırma ve doğrulama yapması, ancak bellek, hesaplama, bellenim boyutu ve uygulama karmaşıklığı açısından katı sınırlar içinde çalışması gerekir.

Ledger'ın Orchard PCZT işleme biçimi bu zorluğa bir örnektir. Bu örnek, devreye özgü özel ayrıştırmanın kısıtlı cihazlarda uygulamayı daha yönetilebilir hâle getirebileceğini, ancak desteklenen işlem yapıları veya devreler değiştiğinde bellenim güncellemeleri de gerektirebileceğini gösterir.

Devam eden iki çalışma, aynı kısıta yönelik farklı yaklaşımları ortaya koyuyor.

Açık kaynaklı donanım cüzdanı mimarileri ve sıradan bilgisayarlar için uygun, tamamen sabit zamanlı bir kanıt oluşturma hattına yönelik bir araştırma önerisi Hibe #423 kapsamında sunuldu. Amaç, C veya Rust gibi ortamlarda güvenli şekilde uygulanabilecek kriptografik altyapıyı araştırırken korumalı Zcash desteğinin karmaşıklığını ve bakım yükünü azaltmaktı.

Buna alternatif bir yaklaşımı ise ucuz ve kolayca bulunabilen bileşenlerle oluşturulmuş, açık kaynaklı ve ağdan yalıtılmış bir imzalayıcı olan önerilen **Zcash SeedSigner** temsil ediyor. Önerilen iş akışında eşlikçi bilgisayar imzalama cihazından ayrı tutuluyor ve cihaz üzerinde doğrulama ile imzalama yapılması için bir PCZT ağ hava boşluğu üzerinden aktarılıyor.

https://forum.zcashcommunity.com/t/grant-application-research-on-a-fully-constant-time-proving-pipeline-for-open-source-hardware-wallet-architectures-reusable-for-standard-computers/57555

Bu yaklaşımlar birlikte, korumalı donanım cüzdanlarının ardındaki daha kapsamlı mühendislik zorluğunu gösteriyor: İşlem oluşturma ve kanıt üretimi güvenlik açısından kritik cihazın dışında yapılabilir; ancak imzalayıcı, ortaya çıkan işlemi güvenli biçimde yetkilendirmek için yine de yeterli bilgiye ve doğrulama kapasitesine sahip olmalıdır.

### PCZT Ayrık Mimariyi Mümkün Kılıyor

Kısmen Oluşturulmuş Zcash İşlem (PCZT) standardı, eşlikçi cüzdan ile donanım cüzdanını birbirine bağlayan resmî veri yapısıdır.

Eşlikçi cüzdan, note seçimini yapabilir, nullifier'ları hesaplayabilir ve sıfır bilgi kanıtını kendi başına oluşturabilir. Bu adımlar için gereken bilgiler (nullifier türetmekte kullanılan anahtar da dâhil) harcama yetkisine bağlı bir şeyden değil, görüntüleme anahtarından geldiği için bu mümkündür. Ardından eşlikçi cüzdan, bu öğeleri bir PCZT kapsayıcısında paketler.

PCZT donanım cüzdanına aktarılır. Donanım cüzdanı işlem bağlamını (tutarlar ve alıcı adresleri gibi) okur, korumalı harcama anahtarlarını kullanarak imzayı uygular ve güncellenmiş PCZT'i eşlikçi cihaza geri gönderir.

Bu tasarım katı bir güvenlik sınırı oluşturur: Güçlü ana bilgisayar donanımı, harcama anahtarlarına erişmeden karmaşık sıfır bilgi hesaplamalarını gerçekleştirebilirken düşük güçlü soğuk saklama cihazları, yoğun kriptografik işlemleri hesaplamaya gerek kalmadan finansal güvenliği sağlayabilir.

### Kanıtlayıcının Gizliliğinden Ödün Verilmesi

Sıfır bilgi kanıtı oluşturma işini eşlikçi cüzdana veya başka bir kanıtlayıcıya devretmek, harcama anahtarlarını yalıtılmış tutar; ancak yine de kanıtlayıcının note değerleri, alıcı adresleri ve kriptografik taahhütler gibi hassas işlem bilgilerine erişmesini gerektirir.

PCZT, bu bilgilerin kanıt oluşturma amacıyla aktarılmasını sağlarken yetkilendirme için gereken özel harcama anahtarlarının aktarılmasını önleyerek mimari ayrımı korur.

Bu, kanıt oluşturma yetkisiyle harcama yetkisinin birbirinden ayrılmasını sağlar. Kanıtlayıcı, kullanıcının fonlarını harcama yönünde kriptografik yetki kazanmadan yoğun hesaplama gerektiren kanıt oluşturma işlemini yapabilir.

### PCZT Birlikte Çalışabilirliği

PCZT, Zcash donanım cüzdanı, çoklu imza ve ağdan yalıtılmış imzalama iş akışlarının önemli bir parçası hâline geldikçe bağımsız uygulamalar arasındaki birlikte çalışabilirlik giderek daha önemli oluyor.

AngryDavee tarafından Haziran 2026'da sunulan bir öneride, PCZT uygulamalarının Ledger, Keystone, Hito ve OneKey dâhil çeşitli projelerde ve librustzcash'teki referans uygulamasında zaten bulunduğu belirtildi. Ancak öneri, bu uygulamaların PCZT'leri tutarlı biçimde yorumladığını doğrulamak için ortak testlerin bulunmadığını tespit etti.

Önerilen çözüm; standart PCZT test vektörlerini ve oluştur → imzala → tamamla iş akışının tamamını kapsayan uygulamalar arası testleri içeren açık kaynaklı bir birlikte çalışabilirlik test paketiydi. Ayrıca, farklı imzalayıcılardan gelen kısmen imzalanmış bilgilerin işlem tamamlanmadan önce birleştirilebildiği Birleştirici gibi rol sınırlarının da test edilmesi önerildi.

Bu, donanım cüzdanları açısından özellikle önemlidir; çünkü PCZT, işlem oluşturma ile imzalamanın birbirinden ayrılmasına olanak tanır: Eşlikçi cüzdan bir işlem oluşturup PCZT hazırlayabilir; donanım cihazı ise gerekli imzalama bilgilerini alarak güvenlik açısından kritik imzalama işlemini gerçekleştirebilir.

Öneri uygulanmadı; çünkü Zcash Community Grants, öneriyi inceleyip topluluk geri bildirimlerini değerlendirdikten sonra hibeyle ilerlememeye karar verdi. Bu nedenle önerilen uygulamalar arası test paketi bu hibe aracılığıyla geliştirilmedi. Dolayısıyla bu, belirlenen bir PCZT birlikte çalışabilirlik sorununa yönelik önerilmiş bir çözümdür; Zcash genelinde şu anda mevcut olan bir standart değildir.

https://forum.zcashcommunity.com/t/pczt-interoperability-test-suite-feedback-before-at-grant-submission/55931

### Bir PCZT'in Yaşam Döngüsü

| # | Aşama | Açıklama |
|---|---|---|
| 1 | Oluşturucu | İşlem sürümleri, konsensüs dalı kimlikleri ve havuz bayrakları dâhil olmak üzere genel işlem üst verileriyle PCZT'i başlatır. |
| 2 | Kurucu | Şeffaf, Sapling, Orchard veya Ironwood havuzları genelinde amaçlanan girdileri ve çıktıları işleme ekler. |
| 3 | G/Ç Sonlandırıcısı | Girdi ve çıktı kümesinin tamamlandığını bildirir, bağlayıcı imza anahtarlarını hesaplar ve gerektiğinde dolgu harcamalarını imzalar. |
| 4 | Güncelleyici | Sonraki katılımcılar için tam görüntüleme anahtarları, çıpalar ve Merkle tanıkları gibi gerekli bağlam verilerini ekler. |
| 5 | Kanıtlayıcı ve İmzalayıcı | Sıfır bilgi kanıtı oluşturma ve kriptografik imzalama işlemlerini gerçekleştirir. Modern PCZT sürümlerinde bu iki görev tamamen bağımsızdır ve sıralı veya paralel olarak gerçekleştirilebilir. |
| 6 | Birleştirici | Farklı cihazlar aynı işlemin farklı yönleri üzerinde eşzamanlı çalışıyorsa birden çok PCZT örneğini belirlenimci biçimde birleştirir. Birleştirme kuralları, yanlışlıkla veri kaybı yaşanmasını önlemek için katı çakışma çözümlemesi gerektirir. |
| 7 | Harcama Sonlandırıcısı ve Çıkarıcı | Gerekli tüm kriptografik öğeleri doğrular, ara bağlam üst verilerini çıkarır ve ağda yayımlanmaya hazır, son hâline getirilmiş Zcash işlemi üretir. |

## Gerçek Dünyadaki Donanım Cüzdanı Uygulamaları

### Genel Bakış

| Cihaz   | Eşlikçinin aldığı                 | Cihazda kalan                  | Aktarım      |
|----------|-----------------------------------|--------------------------------|--------------|
| Ledger   | UFVK / Orchard FVK, adresler       | Harcama yetkisi                | USB / BLE    |
| Keystone | UFVK + Birleşik Adres             | Tohum / harcama anahtarları    | QR (ağdan yalıtılmış)|
| Hito     | UFVK, Birleşik Adres, tohum parmak izi | Tohum ve özel harcama anahtarları | QR / yerel     |


Hassas harcama anahtarlarını eşlikçi cüzdandan yalıtılmış tutarken Zcash korumalı işlemlerinin nasıl desteklenebileceğini araştırmak için çeşitli donanım cüzdanı uygulamaları geliştirilmiştir. Ledger, Keystone ve Hito, donanım tabanlı anahtar korumasını Zcash işlem iş akışına entegre etmek için farklı yaklaşımlar sunar.

![Gerçek dünyadaki donanım cüzdanı uygulamaları](/content-images/hardware-wallet-implementations.webp)

Korumalı fonları nasıl koruduklarını anlamak için harcama anahtarlarıyla görüntüleme anahtarları arasındaki farkı bilmek önemlidir. Üçünde de ayrımın temel yapısı aynıdır:

| Cihaz | Eşlikçi uygulamanın alabilecekleri | Cihazda korunanlar |
|---|---|---|
| Ledger | UFVK / Orchard FVK, adresler ve kamuya açık bilgiler | Harcama yetkisi / özel anahtar materyali |
| Keystone | UFVK + Birleşik Adres | Tohum / harcama anahtarları |
| Hito | UFVK, Birleşik Adres, tohum parmak izi ve ağ bilgileri | Tohum ve özel harcama anahtarları |

### Donanım İmzalama Ortamı Olarak Ledger

Ledger bir donanım cüzdanı şirketidir. Cihazları, özel anahtar materyalini saklamak ve onu fiziksel olarak cihazın geri kalanından ve cihaza bağlı her şeyden yalıtılmış tutmak için tasarlanmış özel bir çip olan Güvenli Öğe etrafında oluşturulmuştur. Bir Ledger cihazını soğuk saklama için güvenilir kılan şey tam da bu Güvenli Öğe'dir. Bu sayede cihaza bağlanan bilgisayarın veya telefonun güvenliği ihlal edilse bile Güvenli Öğe içindeki anahtarlar çıkarılamaz.

Ancak bir Ledger cihazı tek başına belirli bir kripto para birimine ilişkin hiçbir bilgi içermez. İlgili para biriminin kriptografisini nasıl işleyeceğini bilen bir uygulamanın cihaza yüklenmesi gerekir.

Bir Ledger cihazı belirli bir kripto para birimine ilişkin hiçbir bilgi içermez; bu nedenle para biriminin kriptografisini bilen bir uygulamaya ihtiyaç duyar. Zcash için iki nesil uygulama vardır:

- Aslen Zondax tarafından geliştirilen ve Zkool gibi eşlikçi cüzdanlarla kullanılan “Zcash Shielded” uygulaması; bu uygulamanın desteği 5 Kasım 2026'da sona erdiriliyor ve
- Ledger'ın, Ledger Wallet Desktop 4.21+ tarafından yerel olarak kullanılan, daha yeni Zcash uygulaması (3.9.4+); bu uygulama Ironwood korumalı ZEC işlemlerini destekliyor.

Aşağıdaki anahtar yalıtımı modeli her ikisi için de geçerlidir.

Zkool, telefonunuzda veya bilgisayarınızda bulunan ve söz konusu uygulamayla iletişim kuran eşlikçi cüzdandır. İşlemi oluşturup Ledger'e gönderir; cihazdaki Zondax uygulaması da işlemi imzalayıp imzayı geri gönderir.

Dolayısıyla Zondax, donanım üzerinde çalışan yazılımdır; Zkool ise cihazla iletişim kurmak için Zondax'ın uygulamasını kullanan, donanım dışında çalışan yazılımdır.

### Ledger'ten Neler Çıkar?

Ledger'ın Zcash yazılımında, cüzdanın görüntüleme anahtarını dışa aktarmaya yönelik özel bir işlev bulunur. Bu anahtar, herhangi bir şeyi harcama olanağı vermeden yazılımın bakiyeleri ve işlemleri görmesini sağlar.

Bu işlev iki şeyden birini döndürebilir:

- Zcash'ın tüm korumalı havuzlarını tek seferde kapsayan tam görüntüleme anahtarı olan Birleşik Full Viewing Key (UFVK) veya
- Orchard Full Viewing Key (FVK)

Her iki durumda da dışa aktarılan yalnızca bir görüntüleme anahtarıdır. Hangi sürümü isterseniz isteyin bu işlev, birinin fonları taşımasına gerçekten olanak verecek tek bilgiyi, yani harcama anahtarını döndüremez.

Tasarımın amacı da tam olarak budur: Yalnızca eşlikçi uygulamayla güvenle paylaşılabilecek bilgileri dışa aktarabilecek şekilde tasarlanmıştır.

Zcash'ın anahtar hiyerarşisi, her korumalı havuz için harcama anahtarından iki ayrı şey türetilecek şekilde yapılandırılmıştır:

- Harcamayı yetkilendiren bir anahtar ve
- Tam bir görüntüleme anahtarı

FVK daha sonra kendi başına görüntülemeyle ilgili başka yetenekler türetebilir; ancak türetme yolu hiçbir noktada harcama yetkisine geri dönmez. Bir anahtar hiyerarşinin görüntüleme tarafına ayrıldıktan sonra orada kalır ve türetildiği harcama yetkisi anahtarını yeniden oluşturmak için kullanılamaz.

Ironwood da aynı düzeni izler; çünkü Orchard'ın temel anahtarını ve note oluşturma yapısını yeniden kullanır. Ancak konsensüs düzeyinde ayrı bir havuzdur ve kendine ait bir taahhüt ağacı ile nullifier kümesi vardır. Bu, UFVK'nın tek bir düz anahtar değil, havuz başına görüntüleme anahtarlarından oluşan bir paket olduğu anlamına gelir (şeffaf, Sapling, Orchard ve artık Ironwood).

Ironwood etkinleşmeden önce dışa aktarılan bir UFVK, Ironwood görüntüleme anahtarını içermez; çünkü bu havuz henüz mevcut değildi. Bu nedenle cüzdanların, NU6.3 yükseltmesinden sonra Ironwood destekli UFVK'ları tanıyıp türetecek şekilde güncellenmesi gerekiyordu.

### Ledger'de Neler Kalır?

Harcama yetkisi cihazda kalır.

Ledger İmzalayıcısı ana bilgisayardan bir işlem/PCZT alır ve işlemin hangi havuzdan harcama yaptığına bağlı olarak harcama yetkilendirme imzasını oluşturur (Ledger'ın mevcut entegrasyonu yalnızca Ironwood desteklediği için Ironwood havuzu). İmza cihazda oluşturulur ve ana bilgisayar özel harcama anahtarını değil, yalnızca imzayı alır.

Bu, Ledger'ın genel güvenlik modeliyle de uyumludur. Güvenli Öğesi özel anahtar materyalini yalıtır ve Ledger'ın uygulama güvenliği gereklilikleri, uygulamaların bu gizli bilgileri ana bilgisayara açmasını özellikle yasaklar.

Ledger'ın imzalayıcısı, işlem imzalama işlemini bağımsız olarak gerçekleştirirken FVK/UFVK'yı dışa aktarabilir. Bu iki yetenek tek bir işlevde birleştirilmek yerine ayrı işlevler aracılığıyla sunulur.

### Bu pratikte ne anlama geliyor?

Ledger'nızda 10 ZEC olduğunu varsayalım.

Eşlikçi cüzdan UFVK'ya sahip olabilir ve dolayısıyla “Bu cüzdan 10 ZEC aldı” sonucuna varabilir. İşlemleri ve bakiyeleri tarayıp görüntüleyebilir.

Ancak biri eşlikçi cüzdanın güvenliğini ihlal ederse UFVK tek başına harcama yetkilendirme imzası oluşturma olanağı vermez.

Ayrı harcama yetkilendirme imzasının amacı, donanım cüzdanları gibi kısıtlı cihazların zk-SNARK kanıtının tamamını kendileri oluşturmak zorunda kalmadan korumalı harcamaları yetkilendirmesini sağlamaktır.

### Zondax Ledger uygulaması; donanım cüzdanı tarafı

#### Zondax nedir?

Zondax, Ledger Zcash uygulamasını geliştiren üçüncü taraf bir yazılım şirketidir. Ledger donanımında çalışan ve cihaza en başından itibaren Zcash işlemlerini anlama ve işleme yeteneği kazandıran gerçek bellenim uygulamasıdır.

Zondax dışarıdan bir geliştiricidir. Ledger donanımı, Zcash işlemlerini doğal olarak işleyemez; bu yetenek tamamen Zondax yazılımından gelir.

### İlk Zcash Ledger uygulaması

Zondax'ın Ledger Zcash uygulama deposunda, Ledger cihazında çalışan yazılım bulunur. Uygulama başlangıçta, Orchard'ın Zcash'ın temel korumalı havuzu hâline gelmesinden önce, Sapling korumalı işlemlerine odaklanmıştı. Bu nedenle Sapling desteği, bir Ledger cihazının korumalı ZEC işlemleriyle yapabileceklerinin sınırıydı.

Mimarisi bu ayrımı ortaya koyar: Ana bilgisayar/eşlikçi tarafı işlem bilgilerini hazırlarken Ledger hassas anahtar işlemlerini ve imzalamayı gerçekleştirir.

Zcash donanım cüzdanı desteğinin bu ilk sürümünde bile temel ilkeler, yani işlem oluşturma ve kanıt üretiminin ana bilgisayarda yapılması, imzalamanın ise cihazda yalıtılmış biçimde gerçekleştirilmesi, tasarımın parçasıydı.

### Orchard'a Doğru Gelişim

Ledger'ın çalışmaları Orchard + PCZT yönünde ilerledi. Bu, küçük bir güncellemeden çok daha önemli bir geçişti; çünkü Orchard farklı bir kanıt sistemi (Halo 2, Sapling'ın Groth16'sına karşılık) ve farklı bir note ile anahtar oluşturma yapısı kullanır. Bu nedenle yalnızca Sapling destekleyen bellenimi Orchard imzalamayı gerçekleştirecek şekilde genişletmek, yalnızca bir bellenim yaması değil, cihaz tarafında yeni kriptografik temeller gerektiriyordu.

Ancak Zcash, Ironwood yönünde ilerlerken Zondax ve Ledger, önce yalnızca Orchard için bir uygulamayı tamamlayıp daha sonra Ironwood için yeniden tasarlamak yerine doğrudan Ironwood desteğine odaklandı. Bu, Ledger uygulamasının evriminde yeni bir aşamayı temsil eder; Ironwood, Orchard kriptografik mimarisini temel alırken ayrı bir korumalı havuz ve ek protokol değişiklikleri getirir.

### Bu Ledger uygulamasında neler olur?

Ortaya çıkan iş akışı şöyle açıklanır:

1. Ana bilgisayar bir PCZT oluşturur.
2. Ana bilgisayar ilgili işlem bilgilerini Ledger cihazına gönderir.
3. Cihaz Orchard harcama yetkilendirme imzalarını oluşturur.
4. Ana bilgisayar, bağlayıcı imza ve son işlem birleştirme dâhil olmak üzere bu aşamadan sonraki tüm işlemleri yürütür.

Ledger içinde çalışan uygulama, harcama yetkilendirme imzasının ötesindeki hiçbir şeyi görmez veya üretmez. Kanıt oluşturma, bağlama ve birleştirme gibi hesaplama açısından ağır veya çok veri gerektiren tüm işler, anahtar materyali konusunda güvenilir olmasının gerekmediği ana bilgisayarda kalır.

### Ledger'ın yerel korumalı entegrasyonu; Ledger Wallet Desktop

Ledger'ın en yeni Zcash entegrasyonu, korumalı işlem oluşturma ile güvenlik açısından kritik imzalamanın eşlikçi yazılım ve donanım cüzdanı arasında nasıl ayrılabileceğine somut bir örnektir.

Ledger Wallet Desktop 4.21+ ve Zcash cihaz uygulaması 3.9.4+ ile kullanıcılar Ledger Wallet Desktop üzerinden doğrudan Ironwood korumalı ZEC gönderip alabilir. Entegrasyon, özelden özele transferleri, şeffaf havuzdan korumalı havuza aktarmayı, korumalı havuzdan şeffaf havuza çıkarmayı, özel alıcı adreslerini ve memo'ları destekler. İşlemler yalnızca bilgisayarın sunduğu bilgilere güvenmek yerine Ledger cihazında doğrulanıp imzalanır.

Bu mimarinin önemli bir parçası, görüntüleme ve harcama yeteneklerinin birbirinden ayrılmasıdır. Özel bakiye eşitlemesi sırasında Ledger bir Birleşik Full Viewing Key (UFVK) dışa aktarır ve bu anahtar yerel olarak bilgisayarda saklanır. UFVK, Ledger Wallet Desktop'ın ilgili korumalı işlemleri tespit edip cüzdan bakiyesini belirlemesine olanak tanır; ancak fonları harcama yetkisi vermez. Güvenlik açısından kritik harcama yetkisi, son imzalama işlemini gerçekleştiren Ledger cihazında kalır. Böylece cüzdan durumunu yöneten ve işlemleri oluşturan bilgisayar ile harcamayı yetkilendirmek için gereken yeteneği koruyan donanım cihazı arasında açık bir sınır oluşur.

Ancak mevcut entegrasyon yalnızca Ironwood havuzunu destekler. Ledger Wallet Desktop üzerinden Orchard veya Sapling fonlarını görüntülemez ya da yönetmez. Bu durum tarihsel açıdan önemlidir; çünkü Ledger'ın önceki Zcash geliştirmesi, uygulama Ironwood protokolüne doğru evrilmeden önce Orchard korumalı desteğiyle ilişkiliydi.

Bu geçiş, anahtar ve hesap uyumluluğunun önemini de ortaya koyar. Ledger'ın Zondax tarafından geliştirilmiş ve YWallet ile zkool gibi entegrasyonlarda kullanılmış eski bir “Zcash Shielded” uygulaması vardır; bu uygulama artık kullanımdan kaldırılıyor. Eski uygulama korumalı hesaplar için farklı bir türetme şeması kullandığından, Sapling hesapları yeni Ledger uygulamasında doğrudan yeniden oluşturulamaz.

Bu entegrasyon, korumalı donanım cüzdanı desteğindeki hem ilerlemeyi hem de devam eden sınırlamaları gösterir. Ledger artık eşlikçi yazılımın cüzdan eşitlemesini ve işlem hazırlığını üstlendiği, donanım cihazının ise harcama için güvenlik sınırı olarak kaldığı tam bir Ironwood deneyimi sunabilir.

Öte yandan geçmiş hesaplarla uyumluluk, yalnızca belirli korumalı havuzların desteklenmesi, donanım işlem boyutu sınırları, platform kısıtlamaları ve korumalı işlemleri ayrıştırıp doğrulamada karşılaşılan hesaplama ve bellenim kısıtları; Zcash için donanım cüzdanı desteğinin yalnızca protokol yeteneklerine değil, her uygulamanın tasarımına ve kaynaklarına da bağlı olduğunu gösterir.

### Zkool + Ledger — Resmî Zondax uygulamasını kullanma

Ywallet'ın halefi olan Zkool, korumalı soğuk imzalama hedefini devraldı ancak bu hedefe ulaşmak için farklı bir yol izledi. Bu yol, imzalama uygulamasının güvenli biçimde dağıtılamaması durumunda yalnızca kriptografinin bir entegrasyonu kullanılabilir kılmaya yetmediği gerçeğinden doğrudan etkilendi.

https://youtu.be/eagkCIv3BlQ?si=7w5YfLlRER77bASw

### Zkool'ın Zondax uygulamasını kullanması

Zkool, Ywallet'ın terk ettiği özel Ledger uygulaması yerine Zondax tarafından geliştirilen resmî Ledger Zcash uygulamasını kullanmaya yöneldi. Ledger mağazasının kabul etmeyeceği özel bir uygulamanın bakımını sürdürmek yerine Zkool, Ledger'ın kendi ekosistemi üzerinden zaten kabul edilmiş ve dağıtılan uygulamayı temel aldı.

Bu değişiklik sayesinde kullanıcılar, entegrasyonu kullanmak için artık imzasız özel bir Ledger uygulamasını yüklemeye bel bağlamak zorunda kalmadı; çünkü Zondax'ın uygulaması resmî olarak Ledger'ın ekosistemi üzerinden dağıtılıyordu.

Ledger, eski Zcash Shielded uygulamasını aşamalı olarak kullanımdan kaldırırken destek sonu olarak 5 Kasım 2026 tarihini belirledi. Zkool buna hazırlandı: [version 6.30.0](https://github.com/hhanh00/zkool2/releases/tag/zkool-v6.30.0) (12 Eylül 2026), Ledger'in yeni resmî Zcash uygulamasına Zondax uygulamasının yanı sıra destek ekledi. Bir Ledger hesabı oluşturduğunuzda, Zkool artık cihazda hangi uygulamanın çalıştığını soruyor (Resmî veya Zondax). Resmî uygulama hesabı, şeffaf ve Ironwood havuzlarını kapsar: Zkool, UFVK'sini cihazdan içe aktarabilir ve v6 işlemlerini Resmî uygulamayla imzalar. Zondax uygulaması hesabı, eski şeffaf + Sapling kurulumunu korur ([zkool2#1242](https://github.com/hhanh00/zkool2/pull/1242)).

### Desteklenen korumalı havuzlar

Ywallet geliştiricisine göre, Zkool'ın Ledger entegrasyonu Zondax tarafından geliştirilen resmî Ledger uygulamasını kullanıyor ve hem şeffaf hem de korumalı Zcash işlemlerini destekliyordu. Ancak korumalı desteği Sapling ile sınırlıydı ve Orchard desteği yoktu; ayrıca her türden en fazla beş girdi ve çıktı desteği sunması ve Ledger Live uyumluluğunun bulunmaması gibi başka entegrasyon sınırlamaları da vardı.

Bu sınırlama, o dönemde temel alınan Zondax Ledger uygulamasının kapsamını yansıtıyordu. Zondax'ın önceki Ledger çalışması Sapling desteği sunuyordu; 2024'te yayımlanan Zcash Shielded Ledger uygulamasının ilk sürümünde ise Orchard ve Unified Addresses bulunmuyordu. Dolayısıyla, bu uygulama etrafında oluşturulan bir entegrasyon, dayandığı donanım cüzdanı uygulamasının yeteneklerini ve sınırlamalarını devralıyordu.

Kasım 2024'te özel Zcash Shielded Ledger Uygulaması'nın yayımlanmasıyla durum sonradan değişti. Zondax, uygulamanın Ledger Live üzerinden resmen yayımlandığını belirtti ve daha sonra diğer cüzdanların entegrasyon yapabilmesini sağlamak için entegrasyon yönergeleri ile Rust ve JavaScript paketlerini yayımladı. Ancak uygulama ilk yayımlandığında yalnızca Zecwallet Lite Desktop ile iletişim kuruyordu; daha geniş cüzdan entegrasyonları hâlâ geliştiriliyordu.

Bir sonraki aşamada Ledger'ın daha yeni Rust tabanlı Zcash uygulaması geliştirildi. Haziran 2026 itibarıyla Ledger, UFVK paylaşımının ve Orchard Unified Address oluşturmanın uygulandığını, Orchard işlem imzalama ve ClearSign özelliklerinin ise hâlâ geliştirilmekte olduğunu bildirdi. Ledger ayrıca, protokol değiştikçe bu çalışmaların Ironwood yolunda da sürdürüleceğini belirtti.

Ironwood, sonrasında Zcash cüzdan ekosisteminin tamamında güncellemeler gerektirdi. Zkool, 6.24.0 sürümünden başlayarak Orchard'den Ironwood'a geçiş desteğini yayımladı ve sonraki sürümlerde geçiş ile işlem hattını iyileştirmeyi sürdürdü. Ayrı olarak Ledger, PCZT v2 imzalamayı 27 Temmuz'da yeni uygulamasına ekledi; ancak uygulama 20 Ağustos itibarıyla henüz Ledger incelemesini ve Ledger Live dağıtımını tamamlamamıştı. Bu kilometre taşı daha sonra tamamlandı ve artık Ledger Wallet Desktop 4.21+ yerleşik Ironwood desteğini doğrudan sunuyor.

https://forum.zcashcommunity.com/t/a-path-forward-for-ledger-and-zcash/50951/177

Dolayısıyla bu gelişim, tek bir Zondax-Ironwood yükseltmesi olarak değil, birbiriyle ilişkili çeşitli gelişmeler olarak anlaşılmalıdır: başlangıçta Sapling odaklı Zondax uygulaması, 2024 Zcash Shielded Ledger Uygulaması, Orchard ve PCZT desteği sunan daha yeni Ledger Rust uygulaması, Ledger Wallet Desktop'ta Ledger tarafından geliştirilen yerleşik entegrasyon ve ekosistem Ironwood'a geçerken Zkool gibi cüzdanlarda yapılan paralel güncellemeler.

### Zcash için güncel Ledger cihaz ve platform desteği

Ledger üzerindeki Zcash desteği şunlara bağlıdır:

- Cihaz modeline
- Yüklü uygulamaya
- Cihazı yönetmek için kullanılan platforma ve
- İşlemin şeffaf ya da korumalı olmasına.

21 Temmuz 2026 itibarıyla (Ledger'ın son güncellemesi), Zcash Shielded uygulaması Nano S Plus, Stax ve Flex'te destekleniyor, ancak henüz Nano X veya Nano Gen5'da desteklenmiyor.

Nano X ve orijinal Nano S dışındaki diğer modeller, şeffaf işlemleri ve korumalı fonların şeffaf adreslere harcanmasını (korumasını kaldırma) destekleyen klasik Zcash uygulamasını kullanmaya devam edebilir; ancak bu uygulama korumalıdan korumalıya imzalamayı desteklemez. Orijinal Nano S ise iki uygulamayı da desteklemez; çünkü Ledger bu cihazın desteğini sonlandırıyor ve en yeni Zcash uygulaması bu cihazda kullanılamıyor. Cihazlar, Windows, macOS ve Linux için masaüstünde; iOS ve Android için mobilde kullanılabilen Ledger'ın yardımcı uygulaması olan Ledger Wallet'a (eski adıyla Ledger Live) bağlanır.

Ledger, Ironwood havuzu üzerine kurulu yerleşik korumalı Zcash desteğini Ledger Wallet Desktop'a ekleyerek ayrı bir yardımcı cüzdan gereksinimini ortadan kaldırdı. Korumalı ZEC, Ledger'ın iOS ve Android için mobil uygulamasında henüz desteklenmiyor; ancak gelecekteki bir sürümde mobil desteğinin sunulması planlanıyor.

Ledger'ın kendi yazılımı dışında korumalı kullanım, uyumlu bir yardımcı cüzdana ve bu cüzdanın desteklediği platformlara bağlıdır. Ledger, Ironwood desteğini genişletmeyi sürdürürken uyumluluk cihaz modeline, ürün yazılımına, uygulama sürümüne ve işletim sistemine bağlıdır; dolayısıyla genel Zcash desteği uyumluluğu mutlaka garanti etmez.

https://www.youtube.com/watch?v=VhkhfG0LCFs

### YWallet ile çevrimdışı imzalama: önceki bir yaklaşım

Ywallet, korumalı çevrimdışı imzalama için kendi yolunu izleyen ve hem Ledger'dan hem de Zondax'dan ayrı olan bir yardımcı cüzdandır.

Ywallet tarihsel açıdan önemlidir; çünkü Zcash için çevrimdışı imzalamayı araştırmış, yani imzalama cihazının çevrimiçi cüzdandan ayrı tutulabilmesini sağlamıştır.

Bu mimariyi Ledger donanımında hayata geçirmek için Ywallet, önceki bölümde ele alınan Zondax uygulamasından farklı, özel bir uygulama olan kendi Ledger uygulamasını geliştirdi. Bu, Ywallet'ın Zondax'ın mevcut Sapling uygulamasına dayanmadığı anlamına geliyordu; imzalama tarafını yürüten kendi ürün yazılımı vardı.

### Entegrasyon neden önemliydi?

Kriptografiye ve imzalama koduna sahip olmak yeterli değildir. Donanım cüzdanı entegrasyonu yalnızca kriptografik bir sorun değil, aynı zamanda kaçınılmaz bir dağıtım ve platform sorunudur. En azından şu unsurları içerir:

- Uygulama onayı/dağıtımı — Donanım üreticisinin resmî uygulama mağazasının uygulamayı kabul edip dağıtıp dağıtmayacağı
- Ürün yazılımı/uygulama güvenliği — Uygulamanın anahtar materyalini işlerken üreticinin güvenlik gereksinimlerini karşılayıp karşılamadığı
- İletişim protokolleri — Yardımcı cüzdanın ve cihazın işlem verilerini gerçekte nasıl alışveriş ettiği
- Cüzdanla uyumluluk — İmzalama uygulamasının veri biçimlerinin ve işleyişinin yardımcı cüzdanın beklentileriyle örtüşüp örtüşmediği
- Desteklenen korumalı havuzlar — Uygulamanın gerçekte Sapling, Orchard ve (artık) Ironwood için imza atıp atamadığı

Ywallet'ın özel Ledger uygulaması, kriptografik ve mimari gereksinimleri karşılıyordu; korumalı Zcash işlemlerini imzalayabiliyordu, ancak Ledger'ın resmî uygulama mağazasına kabul edilmedi.

### Özel Ledger uygulamasından uzaklaşma

Uygulama resmen kabul edilmediğinden, Ywallet kullanıcıların uygulamayı kullanabilmesi için imzasız ürün yazılımı yüklemelerini istemek zorunda kalacaktı. Bu, kullanıcılar açısından gerçek bir güvenlik tavizidir ve Ywallet onlardan bunu istememeyi seçti. Bu nedenle Ywallet, bu yolu izlemek yerine sonunda söz konusu entegrasyonu bıraktı.

Özel bir uygulamayı yeniden canlandırmak yerine, sonraki geliştirme çalışmaları (Ywallet'ın halefi olan Zkool aracılığıyla) resmî Zondax tarafından geliştirilen Ledger uygulamasına yöneldi. Böylece özel ve reddedilmiş bir uygulama yerine, Ledger dağıtım ekosistemine zaten kabul edilmiş standart bir uygulama tercih edildi. Bu değişim, çalışan bir Ledger entegrasyonunun yeniden mümkün olmasını sağladı.

### Ywallet'ın mirası

Ywallet aktif geliştirmeyi bıraksa da yaratıcısı Hanh, aynı zamanda ZCG üyesi olarak ekosistemde söz sahibi olmaya devam etti. Özellikle Ironwood geçişinde, kaybolmuş gibi görünen fonlarla ilgili bildirilen sorunlar gündeme geldiğinde önemli bir ses oldu.

**ZODL: Orchard → Ironwood geçişinden sonra bir kullanıcı gerçekten fonlarının kaybolduğunu bildirdi**

Bir kullanıcı olan Jmo0615, daha önce ZODL cüzdanında görünen fonların Orchard-Ironwood geçişinden sonra artık görünmediğini bildirdi. Orijinal seed'i geri yüklediğini, cüzdanı sıfırlayıp kurtardığını ve ZODL 3.14.1 (1) sürümünün eşitlemeyi tamamen tamamlamasını beklediğini belirtti. Ayrıca herhangi bir Keystone donanım cüzdanının kullanılmadığını da doğruladı.

Fonların gerçekten kaybolduğu kanıtlanmış değildir. Bunun yerine, Ironwood'a geçişten sonra daha önce görünen fonların görüntülenmemesine yol açan bir cüzdan keşfi veya geçiş sorunu olduğundan şüpheleniliyor. Algılanmayan veya görüntülenmeyen fonlar, otomatik olarak kalıcı biçimde kaybolmuş fonlar olarak tanımlanmamalıdır; geçiş sorunlarını anlamak açısından bu ayrım önemlidir.

https://forum.zcashcommunity.com/t/funds-not-showing-since-ironwood/57792

**Zkool: “Kilitli note'lar”, görünüşte kullanılamayan fonları açıklayabilir**

Korumalı cüzdanların bir diğer önemli yönü, cüzdan durumunun kullanıcının gerçekte harcayabileceği fonları nasıl etkileyebileceğidir. Hanh, kullanıcıların harcama için hangi note'ların kullanılacağını elle seçmelerine olanak tanıyan bir özellik olan coin control aracılığıyla bir note'u yanlışlıkla kilitleyebileceğini açıkladı. Bu durumda note cüzdanda hâlâ bulunabilir, ancak harcanamaz olarak işaretlenir.

Bu durum, cüzdan sorunlarını araştırırken önemli bir ayrımı ortaya koyuyor. Bir cüzdandaki mevcut ZEC miktarı, harcanabilir durumda olan miktarla her zaman aynı değildir. Note seçimi, eşitleme, geçiş durumu, cüzdan kurtarma ve coin control ayarları gibi etkenler görüntülenen veya harcanabilir bakiyeyi etkileyebilir. Bu nedenle “kayıp fon” bildirimlerinde; algılanmayan veya görüntülenmeyen fonlar, algılanan ancak harcanamayan fonlar ve gerçekten kaybolmuş fonlar dikkatle birbirinden ayrılmalıdır.

https://youtube.com/shorts/eAOMRVYJFTA?si=xytBs-wZKn8hmu8D

## 2. Keystone

**Keystone nedir?**

Keystone, hava boşluklu bir donanım cüzdanıdır. İmzalama cihazının imzalama işlemi sırasında yardımcı uygulamayla doğrudan kablolu veya kablosuz bağlantısı yoktur; bunun yerine QR kodları aracılığıyla iletişim kurar. Burada Zcash'ın yerel yardımcı cüzdanı olan Zashi (yeni adıyla Zodl) ile eşleştirilir. Bu eşleştirme, anahtar yalıtımı ilkesini alışılmadık ölçüde açık ve izlenmesi kolay hâle getirir.

**Keystone/Zashi işleyişi**

Keystone'ın Zashi ile Zcash entegrasyonu bu ayrımı özellikle belirginleştiriyor. Keystone'ı Zashi'a bağladığınızda, Birleşik Full Viewing Key Keystone'dan Zashi'a aktarılır.

İşleyiş şöyledir:

![Keystone ve Zashi görüntüleme akışı](/content-images/keystone-zashi-viewing-flow.webp)

**Zashi, UFVK ile ne yapabilir?**

Zashi bunu şu amaçlarla kullanabilir:

- Gelen korumalı işlemleri belirlemek
- Bakiyeleri hesaplamak
- Korumalı etkinlikler hakkında bilgi edinmek

Ancak yalnızca UFVK'ya sahip olduğu için fonları harcayamaz.

UFVK, bakiye ve işlemleri öğrenmeye olanak tanıyan bir “görüntüleme yetkisidir”; harcama yetkisi vermez.

### Keystone içinde ne kalır?

Seed/harcama yetkisi Keystone üzerinde kalır. Zashi seed'i, harcama anahtarını veya harcama yetkisi veren özel anahtarı almaz. Yalnızca UFVK'yı, adres bilgilerini ve salt görüntüleme işlemi için gerekli bilgileri alır.

Bu iki parça birlikte resmi tamamlar. UFVK, adresler ve salt izleme bilgileri gibi cihazdan çıkan veriler Zashi'ın hesabı izlemesi için yeterlidir; ancak cihazdan çıkan hiçbir şey fonları oradan aktarmaya yetmez.

Zashi ile Keystone entegrasyonunun korumalı soğuk depolama sunabilmesinin nedeni budur. Cüzdan uygulaması, fonları harcamak için gereken yetkiye sahip olmadan hesabı izleyebilir. Entegrasyon, korumalı ZEC'ların soğuk depolanmasını sağlamak için özel olarak kullanıma sunulmuştur.

Harcama yapmak istediğinizde:

![Keystone ve Zashi harcama akışı](/content-images/keystone-spend-flow.webp)

## 3. Hito

Hito, Keystone'a çok benzer bir anahtar yalıtımı modeli izler, ancak uygulaması daha yenidir. Zashi gibi mevcut bir yardımcı cüzdanla eşleştirilmek yerine, Hito kendi Android cüzdanıyla birlikte gelir. Donanım cihazı ile bu Android uygulaması arasındaki ilk kurulum süreci, Hito'ın geliştirme kilometre taşlarında belgelenmiştir.

**İlk kurulum: Hito uygulaması neleri alır?**

Android cüzdanı, donanım hesabını ilk kez kurarken şunları kullanır:

- Birleşik Full Viewing Key (UFVK)
- Birleşik Adres
- ZIP-32 seed parmak izi
- Ağ bilgileri

Android uygulamasının donanım cüzdanının seed'ini veya özel harcama anahtarlarını hiçbir zaman almadığını unutmayın.

![Hito için başlangıç akışı](/content-images/hito-onboarding.webp)

**Hito uygulaması ne alır?**

Belgelenmiş ilk kurulum bilgileri şunları içerir:

- UFVK
- Birleşik Adres
- ZIP-32 seed parmak izi
- Ağ

UFVK, Android cüzdanına seed'i almadan hesabı görüntüleme özelliklerine sahip bir cüzdan olarak işletmek için gereken bilgileri sağlar. Seed parmak izi, seed'den türetilen ve hangi hesabın hangisi olduğunu tanımak için kullanılan sabit uzunlukta bir tanımlayıcıdır. Seed'in kendisi değildir ve harcama yetkisi vermez; bu nedenle mevcut olması, yukarıdaki “seed'i hiçbir zaman almaz” ifadesiyle çelişmez.

**Hito üzerinde ne kalır?**

Asıl seed, özel harcama anahtarları ve imzalama yetkisi donanım cihazında kalır. Hito daha sonra imzalama işlemini çevrimdışı gerçekleştirir.

Güncel Hito kilometre taşı; tüm oluşturma, dışa aktarma, çevrimdışı imzalama ve içe aktarma iş akışının çalışır durumda olduğunu, BLE aktarımını ve imzalanmış PCZT'ın BBQr QR dışa aktarımını içerdiğini belirtiyor.

Bu iş akışını açıkça adlandırmakta fayda var; çünkü raporun başlarında ele alınan tam döngünün somut bir örneğidir: Android cüzdanı imzalanmamış PCZT'ı oluşturur ve Hito'a aktarır; Hito yalıtılmış anahtar materyaliyle çevrimdışı imzalar ve imzalanmış PCZT, Android cüzdanına geri aktarılır.

Seed veya harcama anahtarı hiçbir aşamada bu sınırı hiçbir yönde geçmez.

![Hito imzalama akışı](/content-images/hito-signing-flow.webp)

## Orchard ile Ironwood: Donanım Cüzdanı Desteğinin Gelişimi

Orchard, kullanıcıların ZEC varlıklarını daha güçlü gizlilikle saklamasını ve bu varlıklarla işlem yapmasını sağlayan, Zcash protokolündeki korumalı bir havuzdur. Ağ Yükseltmesi 5 (NU5) kapsamında kullanıma sunulan Orchard, gönderen, alıcı veya miktar gibi hassas işlem bilgilerini açığa çıkarmadan korumalı işlemleri desteklemek için Halo 2 kanıtlama sistemini ve yeniden tasarlanmış bir kriptografik mimariyi kullanır.

Ironwood, Zcash'nın NU6.3 ağ yükseltmesinde Orchard havuzunun halefi olarak kullanıma sunulan korumalı bir havuzdur. Korumalı fonların uzun vadeli güvenliğini artırmak üzere tasarlanmış değişiklikleri (kuantum kurtarılabilirliği ve arz bütünlüğüne ilişkin daha güçlü güvenceler dâhil) sunarken Orchard kriptografik protokolünü kullanır.

Öncelikle, Ironwood'ın Orchard protokolünü tamamen yeni bir kriptografik sistemle değiştirmediğini açıklığa kavuşturmak önemlidir. Ironwood, mevcut Orchard protokolü temel alınarak oluşturulmuş yeni bir korumalı havuz olarak kullanıma sunulmuştur. Bu, aynı Action yapısına, aynı Halo 2 kanıtlama sistemine, aynı note ve anahtar yapılarına sahip oldukları anlamına gelir.

Ironwood kendi note taahhüt ağacına, nullifier kümesine, anchor'ına ve değer havuzuna sahiptir; dolayısıyla konsensüs düzeyinde gerçekten ayrı bir havuzdur. Ancak kriptografik açıdan, baştan inşa edilmiş değil, Orchard'ın bir uzantısıdır.

Bu tasarım şu amaçlarla tercih edildi:

1. **Arz bütünlüğü.** 29 Mayıs 2026'da güvenlik araştırmacısı Taylor Hornby, Orchard'ın sıfır bilgi kanıtlama sisteminde, zincir üstünde iz bırakmadan sahte ZEC oluşturulmasına olanak tanıyabilecek kritik bir sağlamlık açığını gizlice bildirdi. Orchard'ın işlem verileri gizli olduğundan, düzeltme uygulanmadan önce sahte ZEC oluşturulmadığını hiç kimse bağımsız olarak doğrulayamaz. Eski havuzu mühürleyip sıfırdan yeni bir havuz başlatmak, Orchard'ı yerinde yamalayarak çözülemeyecek bu sorunu çözer.
2. **Kuantum kurtarılabilirliğini güvence altına almak.** Ironwood, temelindeki ayrık logaritma varsayımlarının bozulması durumunda fonlarının gelecekteki bir kurtarma mekanizmasına katılabilmesi için tasarlanmıştır.
3. **Uygulama değişikliklerini en aza indirmek.** Tamamen yeni bir korumalı protokol tasarlamak yerine Orchard'ın kanıtlanmış mimarisi yeniden kullanıldı. Böylece sıfırdan yazılması gereken yeni işlem, kanıtlama, cüzdan ve donanım cüzdanı kodu çok daha az oldu.

### Kamuoyuna yansıyan zaman çizelgesi

- 29 Mayıs: Orchard güvenlik açığı duyuruldu.
- Haziran: NU6.2 üzerinden ilk düzeltme yayımlanırken Orchard işlemleri geçici olarak kısıtlandı. 12 Haziran'da bir çekirdek geliştirici tam yükseltme için 21 Temmuz tarihini hedefledi; tarih daha sonra bir hafta ertelendi. Toplulukta, Keystone sahiplerinin geçiş yapanlar arasında son sırada kalacağı endişesi dile getirildi. Bunun üzerine bir çekirdek geliştirici, son imza sabitlerinin ve Zcash çekirdeğinden Orchard API değişikliklerinin tamamlanmasına bağlı olarak, Keystone'ın ilk günden itibaren Ironwood desteği sunacağını ve ürün yazılımının 3 Temmuz için hedeflendiğini açıkladı.
- Temmuz başı: NU6.3 testnet'e ulaştı; Zebra 6.0.0, 10 Temmuz'da yayımlandı.
- 27–28 Temmuz: Ledger'ın Ironwood PCZT v2 imzalama çalışması bir entegrasyon dalıyla birleştirildi. Ironwood (NU6.3), 3.428.143 numaralı blokta 28 Temmuz'da etkinleşti; ZEC'ın Orchard'dan çıkabilecek miktarını buraya meşru olarak yatırılan miktarla sınırlayan bir turnike arkasında orijinal Orchard havuzunu mühürledi ve yeni bir işlem biçimini kullanıma sundu.

zcashd yeni konsensüs kurallarını desteklemediğinden, Zebra gerekli düğüm hâline gelir. Ironwood, Orchard'ın alıcı yapısını yeniden kullandığı için adresler değişmez; bu nedenle cüzdanlar mevcut adresleri otomatik olarak yeni havuza yönlendirir. Cüzdanların ihtiyaç duyduğu şey geçiş işlevselliğidir; çünkü Orchard fonlarının sahipleri tarafından eninde sonunda Ironwood havuzuna taşınması gerekir ve Orchard alan yeni çıktılar artık konsensüs tarafından tamamen engellenir.

### Teknik açıdan neler değişti?

İşlem biçimleri 5. sürümden 6. sürüme geçti; böylece tek bir işlem, mevcut Sapling/Orchard/şeffaf bileşenlerin yanı sıra bir Ironwood bileşeni de taşıyabilir. PCZT da buna uyum sağlayacak şekilde genişletildi:

- Kodlama PCZT v1'den v2'ye geçti.
- Ayrı bir Ironwood paketi artık Sapling ve Orchard paketlerinin yanında yer alıyor.
- v6 işlemleri ve yeni bir v6 sighash destekleniyor.
- Note açık metinlerine yeni bir sürüm (V3) eklendi.

Sighash değişikliği özellikle donanım cüzdanları için en önemli değişikliktir. v6'da Orchard ve Ironwood anchor'ları imza özetinin dışında tutulur ve yalnızca yetkilendirme verisi özetine dâhil edilir. Bu, yalnızca sürüm numarasını artırmak değil, ürün yazılımında gerçek bir değişiklik yapmaktır. Cihaz, yeni sighash'i doğru şekilde uygulamalı ve yardımcı uygulamanın onayladığını iddia ettiği değere güvenmek yerine özeti kendisi yeniden hesaplamalıdır.

Yalıtım sözleşmesinin kendisi değişmedi: Cihaz hâlâ yalnızca harcama yetkilendirme imzasını döndürür; hiçbir zaman `alpha` döndürmez ve bağlama imzası oluşturmaz. Kanıtlama ve diğer tüm işlemler yine ana bilgisayar tarafından gerçekleştirilir.

Ancak v6 ile bir imzalayıcı kuralı değişti: Sahte dolgu harcamaları, cihaz gerçek note verileriyle doğrulayamadığı için cihaz yerine IO Finalizer tarafından imzalanır. İmzalayıcı rolündeki cihazın, doğrulayamayacağı bir şeyi imzalaması istenmek yerine bu harcamaları atlaması sağlanır. Gösterilen ücretler artık hem Orchard hem de Ironwood değer bakiyelerini toplar; çünkü v6 işlemi aynı işlemde her iki havuzdan da harcama yapabilir.

Havuz muhasebesini doğru yapmak yalnızca kuramsal açıdan değil, uygulamada da önemlidir. Brave'ın kendi Zcash cüzdanında yakın zamanda görülen bir hata bunu iyi gösteriyor: Ücret hesaplaması, tüm korumalı girdilerin eski Orchard havuzuna ait olduğunu varsayıyordu. Bu da işlem gerçekten Ironwood içerdiğinde yinelenen eylemlere ve hatalı ücret tahminlerine yol açıyordu. Donanım cüzdanıyla imzalamanın ardındaki “kendin yeniden hesapla, ana bilgisayara güvenme” ilkesi tam da bu tür hataları yakalamak için var. Yardımcı bir cüzdan havuz muhasebesini yanlış yaptı; bunu imzalamadan önce yalnızca kendi hesaplamalarını bağımsız olarak denetleyen bir cihaz fark edebilirdi.

### Her imzalayıcının durumu

**Ledger tüm tabloyu yeni baştan değiştirdi.** 23 Eylül 2026'da Ledger, yerel korumalı Zcash desteğini doğrudan Ledger Wallet Desktop içine ekledi; artık ayrı bir yardımcı uygulamaya gerek yok. Harcama anahtarınız cihazda kalır, bilgisayar işlem hesaplamalarını yapar ve imzalama öncesinde her şeyi ekranda onaylarsınız. Yalnızca Ironwood havuzunu destekler; eski Orchard veya Sapling havuzlarını desteklemez. Bunun dezavantajı, çalışmak için Zkool gibi bir yardımcı cüzdan gerektiren ve Zondax tarafından geliştirilen eski “Zcash Shielded” uygulamasının kullanımdan kaldırılıyor olmasıdır. Ledger, eski uygulamayı kullanıma sunmayı durduracağı tarihi 5 Kasım 2026 olarak belirledi; bu nedenle hâlâ bu uygulama üzerinden tutulan fonlar yeni uygulamadaki bir hesaba taşınmalıdır.

**Keystone hazır durumda.** 3.0.2 ürün yazılımı, temmuz ayında tam Ironwood desteği ekledi. 3.2.2 ürün yazılımı (11 Kasım 2026) ise Web3 ve Cypherpunk sürümlerine NU7 desteği ekledi ([sürüm notları](https://github.com/KeystoneHQ/keystone3-firmware/releases/tag/3.2.2)). NU7 Mainnet'te etkin olduğundan, imzalama yapmadan önce 3.2.2 veya daha yeni bir sürüme güncelleyin.

**Hito ilk testnet aşamasını geride bıraktı.** Gerçek bir Orchard-Ironwood işlemini fiziksel donanımda (başlangıçta testnet'te) başarıyla imzalayıp gönderdi. Sonraki güncellemeler, üretim donanımında mainnet akışlarının (Ironwood→Ironwood, Ironwood→Şeffaf ve diğerleri) doğrulandığını gösterdi. Kararlı ürün yazılımı ve daha geniş kapsamlı sürüm üzerindeki çalışmalar devam ediyor.

**Zkool, her iki Ledger uygulamasıyla da çalışır.** Zondax'ın uygulaması, Ledger tarihinde kullanımdan kaldırılacak olan uygulamadır. Zkool, Ledger cihazlarıyla iletişim kurmak için bu uygulamaya bağımlıydı ve son tarihten önce geçiş yaptı: [6.30.0](https://github.com/hhanh00/zkool2/releases/tag/zkool-v6.30.0) sürümünden (12 Eylül 2026) itibaren cihazdan UFVK'yı içe aktararak ve v6 (Ironwood) işlemlerini imzalayarak Ledger'ın yeni resmî Zcash uygulamasıyla da çalışıyor; Zondax uygulamasındaki hesapları da desteklemeyi sürdürüyor. Daha sonraki sürümler Ledger yolunda çalışmaya devam etti (6.32.0, Zkool'ın GraphQL API'si üzerinden Ledger hesaplarını içe aktarıyor; 6.36.0 ise kısa Ledger yanıtlarında oluşan bir çökme hatasını düzeltti). Dolayısıyla Zkool, Ledger Wallet Desktop yerine yardımcı cüzdan kullanmak isteyen Ledger kullanıcıları için bir seçenek olmaya devam ediyor.

En büyük etkiyi geçişin kendisi yaratıyor. Havuzlar arasında taşınan miktar herkese açık olduğundan, cüzdanlar bakiyeyi tek seferde ve görünür bir yığın hâlinde taşımak yerine transferleri zaman içinde standart kupürlere bölüyor. Bu da her geçiş için çok sayıda işlemin imzalanması anlamına geliyor ve donanım cüzdanlarında toplu PCZT imzalamanın neden bu kadar önemli olduğunu açıklıyor.

Ledger ürün yazılımı çalışması donanım sınırlarına da takıldı: Gerçek bir note harcaması, tek bir komutta on binlerce kriptografik sistem çağrısına ulaşarak cihazın gözetim zamanlayıcısını tetikleyebiliyordu. Çözüm, alan aritmetiğini yazılıma taşımak ve Nano X yığın kısıtlarına sığacak paylaşılan bir geçici durum gerektirdi.

https://forum.zcashcommunity.com/t/ironwood-is-here-updated-wallets-libraries-aug-20/56557/40

### Gelişimin tek bir görselde özeti

![Tek görselde evrim](/content-images/orchard-to-ironwood-evolution.webp)
