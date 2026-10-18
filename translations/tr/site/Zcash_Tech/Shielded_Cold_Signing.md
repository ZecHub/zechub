# Korumalı Soğuk İmzalama

> **Temel fikir:** Yardımcı cüzdan, korumalı bir işlemi oluşturmak ve izlemek için gereken her şeyi görür. Harcama işlemini yetkilendirme yetkisini yalnızca donanım cüzdanı elinde tutar. Korumalı soğuk imzalamanın bütün amacı bu ayrımdır.

Zcash içinde koruma, fonların herkese açık, şeffaf bir adresten özel, korumalı bir adrese taşınmasını ve işlem ayrıntılarının Zcash gizlilik özellikleri kullanılarak gizlenmesini içerir.

### ZEC koruduğunuzda ne değişir?

Şeffaf bir Zcash işleminde aşağıdaki bilgiler:

- gönderici adresi
- alıcı adresi
- aktarılan tutar

blok zincirinde gözlemlenebilir.

ZEC koruduğunuzda, fonlarınız özel bir havuza (örneğin Ironwood) taşınır. Blok zinciri, özel işlem ayrıntılarınızı açıklamadan bir işlemin geçerli olduğunu doğrulayabilir. 28 Temmuz 2026'daki NU6.3 yükseltmesinden bu yana, eski Orchard havuzu artık yeni yatırmaları kabul etmediği ancak para çekmeye hâlâ izin verdiği için yeni korumalı fonlar Ironwood havuzuna gider.

### Korumalı Bir İşlemin Bileşenleri

### 1. Not (Korumalı Bakiye Kaydı)

Not, bir kullanıcıya ait harcanmamış bir ZEC tutarını temsil eden özel, kriptografik bir kayıttır.

Bakiyelerin açık metin olarak listelendiği herkese açık bir blok zincirinin aksine, korumalı bir not değer ve sahiplik ayrıntılarını şifreler; böylece zincir üzerindeki gözlemciler fonların kime ait olduğunu göremez.

Bir işlem başlatılırken yardımcı cüzdan defteri tarar, kullanıcının harcanmamış notlarını belirler ve hangi notların harcanacağını seçer.

### 2. Nullifier (Çifte Harcama Tespit Mekanizması)

Bir notun ayrıntıları herkese açık defterden gizlendiği için ağın, hangi notun harcandığını açıklamadan çifte harcamayı tespit edecek bir mekanizmaya ihtiyacı vardır.

Nullifier, belirli bir nottan türetilen benzersiz bir kriptografik işaretçidir. Bir not harcandığında nullifier'ı blok zincirinde yayımlanır.

Ağ, nullifier'ın daha önce kaydedilmediğini doğrular. Kaydedilmemişse harcama kabul edilebilir. Kritik olarak, dışarıdan bir gözlemci nullifier'ı kullanarak bunun hangi belirli nottan geldiğini saptayamaz.

Yardımcı cüzdan, işlem verilerini bir araya getirmenin parçası olarak uygun nullifier'ı türetir ve oluşturur.

## Anahtarlar

Anahtarlar, fonlarınıza erişimi kontrol eden ve cüzdanınızın ZEC alma, görüntüleme ve harcama gibi işlemleri gerçekleştirmesine olanak tanıyan kriptografik bilgi parçalarıdır.

Bir cüzdan, her biri farklı bir amaca hizmet eden çeşitli anahtarlar tutar; tıpkı tek bir hesabın okuma erişimi ve yazma erişimi için ayrı kimlik bilgilerine sahip olabilmesi gibi.

Anahtarlar, yardımcı cüzdan ile donanım cüzdanı arasındaki ilişkinin merkezindedir; çünkü farklı anahtarlar farklı amaçlara hizmet eder ve bunlardan yalnızca birinin güvenli şekilde saklanması gerekir.

Her korumalı havuzun anahtarlarını, okların bir bileşenden ondan türetilebilen her şeye işaret ettiği bir türetme ağacı olarak oluşturduğunu bilmek önemlidir. Korumalı ödeme almak isteyen kullanıcıların, harcama anahtarından üretilen korumalı bir ödeme adresine sahip olması gerekir.

### Anahtar hiyerarşisi

**1. Harcama anahtarı**

Bu, güvenlik açısından en hassas anahtardır. ZEC harcamasını yetkilendirmek için kriptografik yetki sağlar.

Bu raporun başka bölümlerinde “donanım cüzdanı anahtarı tutar” ifadesi geçtiğinde kastedilen anahtar budur.

Soğuk imzalama mimarisinde harcama anahtarı donanım cüzdanının içinde tutulur ve yardımcı cüzdana asla açıklanmaz. Yardımcı cüzdanın bu anahtara hiç sahip olması gerekmemelidir.

Hem Sapling hem de Orchard içinde anahtar hiyerarşileri, harcama yetkisini ve görüntüleme yeteneklerini bir kök harcama anahtarından iki ayrı dal olarak türetir:

- **Sapling:** Genişletilmiş bir harcama anahtarı (𝑎𝑠𝑘,𝑛𝑠𝑘,𝑜𝑣𝑘), kanıt yetkilendirme anahtarlarını (𝑎𝑘,𝑛𝑠𝑘) ve tam görüntüleme anahtarlarını (𝑎𝑘,𝑛𝑘,𝑜𝑣𝑘) türetir; bunlar da gelen görüntüleme anahtarlarını (𝑖𝑣𝑘) ve çeşitlendirilmiş adresleri sağlar.
- **Orchard:** Bir kök harcama anahtarı (𝑠𝑘), doğrudan harcama yetkilendirme anahtarına (𝑎𝑠𝑘) ve tam görüntüleme anahtarına (𝑎𝑘,𝑛𝑘,𝑟𝑖𝑣𝑘) ayrılır.

Bu yapısal ayrım, cüzdanın görüntüleme dalını (UFVK) bakiye senkronizasyonu ve işlem oluşturma için ana bilgisayara aktarmasını, harcama yetkilendirme dalını ise cihazda kalıcı olarak kilitli tutmasını içeren donanım anahtarı yalıtımının resmî kriptografik temelini sağlar.

Anahtar türetme kesinlikle tek yönlüdür. Bu, görüntüleme anahtarlarının harcama yetkisini yeniden oluşturmak için tersine çevrilemeyeceği anlamına gelir. Kriptografik geri döndürülemezlik, bir Unified Full Viewing Key (UFVK) aktarmayı güvenli kılar; çünkü cihazdaki harcama sırlarını açığa çıkarmadan cüzdanın tamamen görünmesini sağlar.

**2. Görüntüleme anahtarları**

Zcash, korumalı etkinliği görme yeteneğini onu harcama yeteneğinden ayırır. Bir görüntüleme anahtarı, harcama yetkisi vermeden bir cüzdanın veya başka bir yetkili tarafın korumalı işlemler hakkında bilgi görmesini sağlar.

- **Full Viewing Key (FVK), Unified Full Viewing Key (UFVK) olarak paketlenmiş hâliyle:** kasıtlı olarak harcama anahtarından türetilir; yazılımın cüzdanın korumalı etkinliğini tespit edip şifresini çözmesine ve böylece işlemleri belirlemesine olanak tanır. Ayrıca, bir harcamayı yetkilendiremese de bakiyeleri hesaplamasına izin verir. En iyi şekilde, seed'in daha zayıf bir kopyası olarak değil, harcama anahtarının daha az özel bir türevi olarak tanımlanır.

Full Viewing Key (FVK), katı güvenlik ayrımını korurken tamamen salt okunur görünürlük sağlar. Hem gelen hem de giden not şifreli metinlerinin şifresini çözerek (giden görüntüleme anahtarı bileşeni aracılığıyla), yalnızca FVK'ye sahip bir yardımcı cüzdan yalnızca güncel bir bakiye yerine eksiksiz, etiketlenmiş bir işlem geçmişi sunabilir.

Birden fazla bağlantılandırılamayan çeşitlendirilmiş ödeme adresi aynı FVK ve gelen görüntüleme anahtarını (IVK) paylaşır; bu da blok zinciri tarama yükünü artırmadan sınırsız adres üretimine olanak tanır.

Bu işlevsel ayrım, soğuk imzalama iş akışlarının temelini oluşturur. Sürekli zincir taraması, geçmiş takibi ve adres yönetiminin tamamı ana bilgisayar yazılımına aktarılırken harcama yetkisi donanım cihazında yalıtılmış kalır.

![Key derivation diagrams](/content-images/key-derivation-diagrams.webp)

### Kritik ayrım: UFVK ve harcama anahtarı

> **UFVK paylaşılabilir. Harcama anahtarı donanım cüzdanında kalmalıdır.**
>
> Yardımcı cüzdan, cüzdanı izlemek, gelen fonları tespit etmek, notları belirlemek ve işlemlerin hazırlanmasına yardımcı olmak için görüntüleme anahtarını kullanır. Harcamayı yetkilendirmek için gereken özel anahtara sahip değildir.

Daha önce belirtildiği gibi, anahtarların ayrılması soğuk imzalama mimarisinin temelidir.

Yardımcı cüzdan, fonlar üzerinde hiçbir zaman kontrol sahibi olmadan bir işlemi hazırlamak için gereken işin çoğunu yapabilir. Donanım cüzdanının yalnızca hazırlanmış işlemi alması ve son imzalama işlemini gerçekleştirmesi gerekir.

Donanım cüzdanı üreticilerinin bu ayrımı kendilerinin icat etmesine gerek yoktur. Zcash anahtar tasarımı, görüntüleme yeteneklerini harcama yetkisinden zaten protokol düzeyinde ayırır ve üreticiler imzalama ve dışa aktarma işlevlerini bu mevcut yapının üzerine kurarlar. Protokol, korumalı adres veya tam görüntüleme anahtarı gibi bilgilerin bir harcama anahtarından türetilmesine izin verirken harcama anahtarının kendisi özel kalır; bu da Ledger, Keystone ve Hito gibi donanım cüzdanlarının, fonları harcayabilen özel anahtarı asla açığa çıkarmadan yardımcı yazılıma ihtiyaç duyduğu görüntüleme bilgilerini vermesini mümkün kılar.

### Yardımcı cüzdanın anahtar bilgileriyle gerçekte yaptığı işler

Görüntüleme anahtarı materyalini kullanarak yardımcı cüzdan şunları yapabilir:

- fonlarınızı ve notlarınızı belirlemek
- hangi notların harcanabileceğini belirlemek
- ilgili adresleri türetmek veya belirlemek
- işlemi oluşturmak
- gerekli kanıtları üretmek veya üretimlerini koordine etmek
- işlemi imzalama için hazırlamak

Bir işlemi oluşturma gereksiniminin, özel harcama anahtarına ihtiyaç duymakla aynı şey olmadığını bilmek önemlidir. Bu ayrıştırma, donanım cüzdanı entegrasyonunun temel güvenlik fikirlerinden biridir.

## Korumalı İşlem Oluşturma ve Yetkilendirme

Bunlar işlemin oluşturulması ve yetkilendirilmesinde yer alan süreçlerdir. Basitçe ifade etmek gerekirse, bu süreçler cüzdanın para göndermek için bu verilerle gerçekte ne yaptığını açıklar:

### İşlem Oluşturma (Korumalı İşlemi Birleştirme)

İşlem oluşturma, kullanıcının amaçladığı ödemeden geçerli bir Zcash işlemi oluşturmak için gereken bilgilerin bir araya getirilmesi sürecidir.

İşlem oluşturma süreci, seçilen notları, alıcıları, tutarları, ücretleri, nullifier'ları ve gerekli diğer işlem verilerini bir işlem yapısında birleştirir. Korumalı işlemler için ayrıca gerekli sıfır bilgi kanıtlarının ve imzaların üretilmesi için gereken bilgileri hazırlar.

Yardımcı cüzdan genellikle bu aşamayı gerçekleştirir. Şunları yapar:

- Harcanacak notları seçer
- İşlemin girdilerini ve çıktılarını belirler
- Gerekli değerleri hesaplar
- Daha sonra kanıtlanacak ve imzalanacak işlem verilerini hazırlar.

Soğuk imzalama kurulumunda, ortaya çıkan işlem verileri bir PCZT içinde paketlenebilir ve güvenlik açısından kritik imzalama adımı için donanım cüzdanına aktarılabilir.

### Kanıtlama (Protokol Geçerliliğini Gösterme)

Kanıtlama, bir işlemin Zcash protokol kurallarına uyduğunu gösteren sıfır bilgi kanıtlarının (Halo 2 veya Groth16 gibi) üretilmesini ifade eder.

Kanıt, ağın aşağıdaki hususları garanti etmesine yardımcı olur:

- Harcama yapan kullanıcının notları harcamaya yetkili olması
- Notların gerçekten var olması
- Karşılık gelen nullifier'ların benzersiz olması
- Toplam girdilerin, toplam çıktılara ve ücretlere eşit olması.

Tüm bunları altta yatan özel ayrıntıları açıklamadan yapar.

Kanıt üretimi hesaplama açısından yoğundur. Bu sorumluluğun yardımcı cihaza aktarılması, donanım cüzdanının takılmasını veya belleğinin tükenmesini önler.

### İmzalama (Harcamayı Yetkilendirme)

İmzalama, kanıtlamadan temelde farklıdır. Dijital imza, özel anahtar sahibinin ürettiği açık bir yetkilendirme damgası işlevi görür.

Sıfır bilgi kanıtı işlem geçerliliğini doğrularken dijital imza harcama yetkisini kanıtlar. İmza, gerçek sahibin belirli transfer parametrelerini onayladığını tasdik eder.

İmzalama çok az hesaplama gücü gerektirir; bu da onu donanım cüzdanı için ideal hâle getirir.

### Korumalı soğuk imzalama nedir?

Korumalı soğuk imzalama, özel harcama anahtarlarını internete bağlı yardımcı cüzdandan yalıtılmış tutarken bir Zcash korumalı işlemini yetkilendirme yöntemidir. İşlem çevrimiçi bir bilgisayarda oluşturulup hazırlanabilirken çevrimdışı tutulan veya başka bir şekilde yalıtılmış ayrı bir donanım cüzdanı, işlemi yetkilendirmek için korunan anahtarlarını kullanır.

Süreç şu şekilde basitleştirilebilir:

![Shielded cold signing process](/content-images/cold-signing-process.webp)

Yardımcı cüzdan, yapılandırılmış işlem parametrelerini donanım cihazına gönderir; cihaz, özel harcama anahtarını ana makineye asla vermeden yükü kendi içinde imzalar.

## Yardımcı ve Donanım Cüzdanları

Korumalı işlemler hem yardımcı bir cüzdanı hem de bir donanım cüzdanını içerebilir; her biri ayrı bir işlev görür.

### Yardımcı Cüzdan

Yardımcı cüzdan nedir?

Yardımcı cüzdan bir bilgisayarda veya mobil cihazda çalışır ve işlemin oluşturulmasında yer alan görevlerin çoğunu gerçekleştirir; örneğin:

- Harcanacak notları seçmek
- İşlemi oluşturmak
- Gerekli işlem verilerini hesaplamak
- Gerekli sıfır bilgi kanıtlarının üretilmesini koordine etmek.

### Yardımcı cüzdan neden faydalıdır?

Yardımcı cüzdan işlem oluşturma sürecini yönetir; ancak bilgisayara kötü amaçlı yazılım bulaşırsa saldırgan:

- ne yaptığınızı görebilir,
- imzalanmamış bir işlemi değiştirebilir,
- sizi bir şeyi onaylamaya kandırmaya çalışabilir.

Yardımcı cüzdanın donanım cüzdanında saklanan özel anahtara erişmesi gerekmez; bu nedenle donanım cüzdanı özel anahtar için güvenlik sınırını sağlarken işlem oluşturmayı ve diğer hesaplama görevlerini gerçekleştirebilir.

### Donanım Cüzdanı

Donanım cüzdanı, özel anahtarlarınızı bağlı telefonlardan veya bilgisayarlardan yalıtan, kripto varlıklarınız için güvenli bir kasa gibi davranan çevrimdışı fiziksel bir cihazdır.

### Donanım cüzdanı neden faydalıdır?

Bilgisayarınıza kötü amaçlı yazılım bulaşırsa saldırgan:

- ne yaptığınızı görebilir,
- imzalanmamış bir işlemi değiştirebilir,
- sizi bir şeyi onaylamaya kandırmaya çalışabilir.

Özel anahtar donanım cüzdanından basitçe çıkarılamaz; bu nedenle cihaz bir güvenlik sınırı görevi görebilir.

Yardımcı ve donanım yetenekleri görseli

Bu iki cüzdan arasındaki ayrım, korumalı işlemler için özellikle önemlidir; çünkü bunlar şeffaf işlemlerden daha karmaşıktır ve korumalı notlar, nullifier'lar, taahhütler, sıfır bilgi kanıtları ve işlem imzaları gibi bileşenleri içerir.

Donanım cüzdanının her hesaplama işlemini gerçekleştirmesi pratik olmazdı. Bunun yerine yardımcı cüzdan işlemi hazırlar ve imzalama için gerekli bilgileri donanım cüzdanına sağlar; özel harcama anahtarı ise donanım cihazı içinde yalıtılmış kalır.

## Anahtar İzolasyonu

> Anahtar izolasyonu, harcamayı yetkilendirebilen özel anahtarların donanım cüzdanından asla çıkmaması demektir. Yardımcı cüzdan işlemi hazırlayabilir; imzalayamaz.

Anahtar izolasyonu, bir işlemi yetkilendirmek için gereken özel anahtarların yardımcı cüzdandan ve onun çalıştığı cihazdan ayrı tutulmasını ifade eder. Korumalı soğuk imzalama kurulumunda, yardımcı cüzdan işlemi oluşturabilir ve gereken kanıtları koordine edebilirken donanım cüzdanı hassas özel harcama anahtarlarını izole tutar.

Yardımcı bilgisayar veya telefon ele geçirilirse, bir saldırgan imzalanmadan önce işlemle etkileşim kurabilir; ancak ideal olarak özel anahtarı donanım cüzdanından çıkaramaz. Bu nedenle anahtar, donanım cihazının güvenlik sınırı içinde kalır.

Bu ayrım, yardımcı cüzdanın işlemi yetkilendirmek için gereken anahtar malzemesine doğrudan erişim vermeden işlem oluşturma ve hesaplama görevlerini yerine getirmesine olanak tanır.

![Key isolation](/content-images/key-isolation.webp)

Yapılması gereken temel ayrım, “görüntüleme anahtarı”nın uygulamanın seed'in daha zayıf bir sürümünü aldığı anlamına gelmemesidir.

Zcash içinde, bir Full Viewing Key (FVK/UFVK) kasıtlı olarak harcama anahtarından türetilir ve sahibine ilgili korumalı etkinliği tespit etme ve şifresini çözme yeteneği verir, ancak harcamaları yetkilendirme yeteneği vermez. FVK, harcama anahtarının daha az gizli bir türevidir.

**Önemli bir gizlilik uyarısı:**

Dolayısıyla, uygulamanın yalnızca UFVK ile fonları çalamayacağı, ancak cüzdanın özel korumalı etkinliğini görebileceği bilinmelidir.

Bu nedenle, yardımcı uygulamayı yalnızca “herkese açık bilgilere” sahip olduğunu söylemek yerine, *görüntüleme yetkisine* sahip olarak tanımlamak daha doğrudur.

Tüm fikri ifade etmenin en basit yolu şudur: yardımcı cüzdan, cüzdanda neler olduğunu bilmek için yeterli anahtar malzemesini alır; ancak cüzdanın fonlarına ne olacağını yetkilendirmek için yeterli anahtar malzemesini almaz. Buna karşılık donanım cüzdanı harcama yetkisini izole tutar ve bunu yalnızca kullanıcı bir işlemi onayladığında kullanır.

Bu, bu korumalı Zcash donanım cüzdanı tasarımlarının ardındaki temel anahtar izolasyonu modelidir ve yakında ele alınacak olan Ledger, Keystone ve Hito içinde uygulamadan uygulamaya görülen aynı modeldir.

## PCZT

PCZT, Kısmen Oluşturulmuş Zcash İşlemi anlamına gelir. Bir Zcash işlemini ve bunu bir aşamadan diğerine tamamlamak için gereken bilgileri taşıyan pakettir.

Bir Zcash işlemi henüz oluşturulurken kullanılan standartlaştırılmış bir biçimdir. Farklı katılımcıların veya cihazların işlem oluşturma sürecinin farklı bölümlerini gerçekleştirmesine ve kısmen tamamlanmış işlemi aralarında aktarmasına olanak tanır.

Bir işlem oluşturmak, Zcash gibi sıfır bilgi kripto para protokollerinde basit bir herkese açık transferi imzalamaktan önemli ölçüde daha karmaşıktır. Korumalı işlemler, Halo 2 veya Groth16 kullanılarak oluşturulanlar gibi hesaplama açısından yoğun sıfır bilgi kanıtları gerektirir. Sonuç olarak, donanım cüzdanları gibi düşük güçlü cihazlar tüm işlem iş akışını yürütmek için yeterli belleğe ve işlem kapasitesine sahip olmayabilir.

PCZT'in kullanıma sunulması, korumalı kripto mimarisindeki çeşitli temel zorlukları ele alır. PCZT, işlem oluşturmayı modüler ve bağımsız rollere bölen standartlaştırılmış bir ara veri biçimidir. Güçlü bir yardımcı bilgisayarın işlem birleştirme ve kanıt oluşturma işlemlerini yürütmesine izin verirken çevrimdışı donanım cüzdanını kesin biçimde yetkilendirme ve imzalama ile sınırlar.

### Donanım ve Soğuk Depolama Sınırlamaları

Donanım cüzdanları özel harcama anahtarlarını korumak için güvenli bir ortam sağlasa da, yardımcı bilgisayarlarla karşılaştırıldığında genellikle sınırlı RAM, hesaplama gücü ve veri aktarım kapasitesine sahiptir. Bu kısıtlamalar, işlem oluşturma sürecinde hesaplama açısından yoğun sıfır bilgi kanıtı oluşturmayı veya gereken tam işlem durumunu korumayı onlar için pratik olmaktan çıkarır.

Sonuç olarak yardımcı cüzdan hesaplama açısından zorlayıcı görevleri üstlenebilirken, donanım cüzdanı korunan harcama anahtarlarıyla işlemi yetkilendirme gibi güvenlik açısından kritik işleme odaklanmayı sürdürür.

İnsan merak ediyor: Cihaz bu kadar kısıtlıysa, güvenilir olmak için nasıl hâlâ *yeterli* doğrulama yapabiliyor?

Basitçe ifade etmek gerekirse, bir donanım cüzdanı yardımcı bilgisayardan rastgele bir değeri kabul edip imzalayamaz. İmzalanan değerin kullanıcının yetkilendirmek istediği işleme karşılık geldiğini saptamak için yeterli bilgiye ihtiyaç duyar. Bu, zor bir denge yaratır; çünkü cihaz, bellek, hesaplama, aygıt yazılımı boyutu ve uygulama karmaşıklığı üzerindeki katı sınırlar içinde çalışırken imzalama sürecini korumak için yeterli ayrıştırma ve doğrulama gerçekleştirmelidir.

Ledger'in Orchard PCZT işleme biçimi, bu zorluğun bir örneğidir; devreye bağlı özel ayrıştırmanın, kısıtlı cihazlarda uygulamayı daha yönetilebilir hâle getirebileceğini, ancak desteklenen işlem yapıları veya devreler geliştikçe aygıt yazılımı değişiklikleri de gerektirebileceğini gösterir.

Devam eden iki çalışma, aynı kısıtlamaya verilen farklı yanıtları göstermektedir.

Açık kaynaklı donanım cüzdanı mimarileri ve sıradan bilgisayarlar için uygun, tamamen sabit zamanlı bir kanıtlama hattına yönelik araştırma önerisi Grant #423 kapsamında sunuldu. Amaç, korumalı Zcash desteğinin karmaşıklığını ve bakım yükünü azaltırken C veya Rust gibi ortamlarda güvenli biçimde uygulanabilecek kriptografik altyapıyı incelemekti.

Bununla birlikte alternatif bir yaklaşım, ucuz ve kolayca bulunabilen bileşenlerden oluşturulmuş açık kaynaklı, hava boşluklu bir imzalayıcı olan önerilen **Zcash SeedSigner** tarafından temsil edilmektedir. Önerilen iş akışı, yardımcı bilgisayarı imzalama cihazından ayrı tutar ve cihaz üzerinde doğrulama ile imzalama için bir PCZT'i hava boşluğu üzerinden aktarır.

https://forum.zcashcommunity.com/t/grant-application-research-on-a-fully-constant-time-proving-pipeline-for-open-source-hardware-wallet-architectures-reusable-for-standard-computers/57555

Bu yaklaşımlar birlikte, korumalı donanım cüzdanlarının ardındaki daha geniş mühendislik zorluğunu gösterir: işlem oluşturma ve kanıtlama, güvenlik açısından kritik cihazın dışında gerçekleşebilir; ancak imzalayıcının ortaya çıkan işlemi güvenle yetkilendirebilmesi için yine de yeterli bilgiye ve doğrulama kapasitesine sahip olması gerekir.

### PCZT Bölünmüş Mimarinin Oluşmasını Sağlar

Kısmen Oluşturulmuş Zcash İşlemi (PCZT) standardı, yardımcı cüzdan ile donanım cüzdanını bağlayan resmi veri yapısıdır.

Bir yardımcı cüzdan, not seçimini gerçekleştirebilir, nullifier'ları hesaplayabilir ve sıfır bilgi kanıtını tamamen kendi başına oluşturabilir. Bu mümkündür; çünkü nullifier türetmekte kullanılan anahtar da dâhil olmak üzere bu adımlar için gereken bilgiler, harcama yetkisine bağlı herhangi bir şeyden değil, görüntüleme anahtarından gelir. Ardından yardımcı cüzdan bu unsurları bir PCZT kapsayıcısına paketler.

PCZT donanım cüzdanına verilir; donanım cüzdanı işlem bağlamını (tutarlar ve alıcı adresleri gibi) okur, korunan harcama anahtarlarını kullanarak imzayı uygular ve güncellenmiş PCZT'i yardımcı cihaza geri verir.

Bu tasarım katı bir güvenlik sınırı oluşturur: güçlü ana bilgisayar donanımı, harcama anahtarlarına erişmeye gerek duymadan karmaşık sıfır bilgi matematiğini gerçekleştirebilirken düşük güçlü soğuk depolama cihazları, ağır kriptografi hesaplamak zorunda kalmadan finansal güvenliği uygulayabilir.

### Kanıtlayıcı Gizlilik Ödünleri

Sıfır bilgi kanıtı oluşturmayı yardımcı cüzdana veya başka bir kanıtlayıcıya devretmek harcama anahtarlarını izole tutsa da, kanıtlayıcının not değerleri, alıcı adresleri ve taahhütler gibi hassas işlem bilgilerine erişmesini gerektirir.

PCZT, bu bilgilerin yetkilendirme için gereken özel harcama anahtarları aktarılmadan kanıtlama amacıyla sağlanabilmesini güvenceye alarak mimari ayrımı korur.

Bu, kanıtlama yetkisinin harcama yetkisinden ayrılmasını garanti eder. Kanıtlayıcı, kullanıcının fonlarını harcamak için kriptografik yetki kazanmadan hesaplama açısından yoğun kanıt oluşturma işlemini gerçekleştirebilir.

### PCZT Birlikte Çalışabilirliği

PCZT, Zcash donanım cüzdanı, çoklu imza ve hava boşluklu imzalama iş akışlarının önemli bir parçası hâline geldikçe bağımsız uygulamalar arasındaki birlikte çalışabilirlik giderek daha önemli olmaktadır.

AngryDavee tarafından Haziran 2026'da sunulan bir öneri, Ledger, Keystone, Hito, OneKey ve librustzcash içindeki referans uygulama dâhil olmak üzere projeler arasında PCZT uygulamalarının zaten mevcut olduğunu belirtti. Ancak öneri, bu uygulamaların PCZT'leri tutarlı biçimde yorumladığını doğrulamak için ortak testlerin eksikliğini tespit etti.

Önerilen çözüm, kanonik PCZT test vektörleri ile tam oluştur → imzala → sonlandır iş akışını kapsayan uygulamalar arası testleri içeren açık kaynaklı bir birlikte çalışabilirlik test paketi idi. Ayrıca, bir işlem sonlandırılmadan önce farklı imzalayıcılardan gelen kısmen imzalanmış bilgilerin birleştirilebildiği Combiner gibi rol sınırlarının test edilmesini de önerdi.

Bu özellikle donanım cüzdanları açısından önemlidir; çünkü PCZT işlem oluşturma ve imzalamanın ayrılmasına izin verir: bir yardımcı cüzdan işlem oluşturabilir ve bir PCZT hazırlayabilirken, bir donanım cihazı gerekli imzalama bilgilerini alır ve güvenlik açısından kritik imzalama işlemini gerçekleştirir.

Öneri, Zcash Community Grants öneriyi inceleyip topluluk geri bildirimini değerlendirdikten sonra hibeyi ilerletmeme kararı verdiği için uygulanmadı. Sonuç olarak önerilen uygulamalar arası test paketi bu hibe yoluyla geliştirilmedi. Bu nedenle, Zcash genelinde hâlihazırda var olan bir standart değil, tespit edilmiş bir PCZT birlikte çalışabilirlik sorununa önerilen bir yanıttır.

https://forum.zcashcommunity.com/t/pczt-interoperability-test-suite-feedback-before-at-grant-submission/55931

### Bir PCZT'in Yaşam Döngüsü

| # | Aşama | Açıklama |
|---|---|---|
| 1 | Oluşturucu | İşlem sürümleri, mutabakat dalı kimlikleri ve havuz bayrakları dâhil olmak üzere PCZT'i genel işlem meta verileriyle başlatır. |
| 2 | Yapıcı | İşlemi şeffaf, Sapling, Orchard veya Ironwood havuzlarındaki amaçlanan girdiler ve çıktılarla doldurur. |
| 3 | G/Ç Sonlandırıcı | Girdi ve çıktı kümesinin tamamlandığını bildirir, bağlayıcı imza anahtarlarını hesaplar ve gerektiğinde sahte harcamaları imzalar. |
| 4 | Güncelleyici | Tam görüntüleme anahtarları, anchor'lar ve Merkle tanıkları gibi sonraki katılımcılar için gereken bağlam verilerini ekler. |
| 5 | Kanıtlayıcı ve İmzalayıcı | Sıfır bilgi kanıtı oluşturmayı ve kriptografik imzalamayı yürütür. Modern PCZT sürümlerinde bu iki görev tamamen bağımsızdır ve sıralı veya paralel gerçekleşebilir. |
| 6 | Birleştirici | Farklı cihazlar aynı işlemin yönleri üzerinde eşzamanlı çalışıyorsa birden fazla PCZT örneğini deterministik olarak birleştirir. Birleştirme kuralları, kazara veri kaybını önlemek için katı çakışma çözümü gerektirir. |
| 7 | Harcama Sonlandırıcı ve Çıkarıcı | Gerekli tüm kriptografik unsurları doğrular, ara bağlam meta verilerini çıkarır ve ağ yayınına hazır sonlandırılmış Zcash işlemini üretir. |

## Gerçek Dünyadaki Donanım Cüzdanı Uygulamaları

### Genel bakış

| Cihaz   | Yardımcının aldığı              | Cihazda kalan          | Aktarım      |
|----------|------------------------------------------|-----------------------------------|----------------|
| Ledger   | UFVK / Orchard FVK, adresler            | Harcama yetkisi                | USB / BLE      |
| Keystone | UFVK + Unified Address                   | Seed / harcama anahtarları              | QR (hava boşluklu)|
| Hito     | UFVK, Unified Address, seed parmak izi  | Seed ve özel harcama anahtarları    | QR / yerel     |


Hassas harcama anahtarlarını yardımcı cüzdandan izole tutarken Zcash korumalı işlemlerinin nasıl desteklenebileceğini araştırmak için çeşitli donanım cüzdanı uygulamaları geliştirilmiştir. Ledger, Keystone ve Hito, donanım tabanlı anahtar korumasını Zcash işlem iş akışıyla bütünleştirmeye yönelik farklı yaklaşımları temsil eder.

![Real world hardware wallet implementations](/content-images/hardware-wallet-implementations.webp)

Korumalı fonları nasıl koruduklarını anlamak için harcama anahtarları ile görüntüleme anahtarlarını ayırt etmek önemlidir. Her üçünde de ayrım aynı biçimi izler:

| Cihaz | Yardımcı uygulamanın alabileceği bilgiler | Cihazda korunan bilgiler |
|---|---|---|
| Ledger | UFVK / Orchard FVK, adresler ve herkese açık bilgiler | Harcama yetkisi / özel anahtar malzemesi |
| Keystone | UFVK + Unified Address | Seed / harcama anahtarları |
| Hito | UFVK, Unified Address, seed parmak izi ve ağ bilgileri | Seed ve özel harcama anahtarları |

### Donanım İmzalama Ortamı Olarak Ledger

Ledger bir donanım cüzdanı şirketidir. Cihazları, özel anahtar malzemesini tutmak ve onu cihazın geri kalanından ve ona bağlı her şeyden fiziksel olarak izole etmek üzere tasarlanmış özel bir çip olan Secure Element etrafında inşa edilmiştir. Bir Ledger cihazını soğuk depolama için güvenilir kılan şey tamamen bu Secure Element'tir. Bu, ona bağlı bilgisayar veya telefon ele geçirilse bile Secure Element içindeki anahtarların çıkarılamayacağı anlamına gelir.

Ancak tek başına bir Ledger cihazı, herhangi bir belirli kripto para açısından boştur. O para biriminin özel kriptografisini nasıl işleyeceğini bilen, üzerine yüklenmiş bir uygulamaya ihtiyaç duyar.

Bir Ledger cihazı herhangi bir belirli kripto para açısından boştur; bu nedenle o para biriminin kriptografisini bilen bir uygulamaya ihtiyaç duyar. Zcash için iki nesil olmuştur:

- Zkool gibi yardımcı cüzdanlarla kullanılan ve 5 Kasım 2026'da kaldırılmakta olan, Zondax tarafından oluşturulmuş özgün “Zcash Shielded” uygulaması ve
- Ledger Wallet Desktop 4.21+ tarafından Ironwood korumalı ZEC için yerel olarak kullanılan, Ledger'in daha yeni Zcash uygulaması (3.9.4+).

Aşağıdaki anahtar izolasyonu modeli her ikisi için de geçerlidir.

Zkool, telefonunuzda veya bilgisayarınızda bulunan ve bu uygulamayla iletişim kuran yardımcı cüzdandır. İşlemi oluşturur, bunu Ledger'e gönderir; cihazdaki Zondax uygulaması daha sonra işlemi imzalar ve imzayı geri gönderir.

Dolayısıyla Zondax donanım üzerinde çalışan yazılımdır, Zkool ise cihazla iletişim kurmak için Zondax'in uygulamasını kullanan, cihazın dışında çalışan yazılımdır.

### Ledger'den ne çıkar?

Ledger'in Zcash yazılımı, cüzdanın görüntüleme anahtarını dışa aktarmak için özel bir işlev içerir; bu anahtar yazılımın herhangi bir şeyi harcayabilmesine izin vermeden bakiyeleri ve işlemleri görmesini sağlar.

Bu işlev iki şeyden birini döndürebilir:

- Zcash'in tüm korumalı havuzlarını aynı anda kapsayan tam görüntüleme anahtarı olan Birleşik Full Viewing Key (UFVK) veya
- Bir Orchard Full Viewing Key (FVK)

Her iki durumda da çıkan şey yalnızca bir görüntüleme anahtarıdır. Hangi sürümü isterseniz isteyin, bu işlevin birinin fonları gerçekten taşımasına izin verecek tek bilgiyi, yani harcama anahtarını döndürmesinin hiçbir yolu yoktur.

Zaten oluşturulma amacı da budur; dışa aktarabileceği tek şeyin yardımcı uygulamaya vermenin güvenli olduğu bir şey olması için tasarlanmıştır.

Zcash'in anahtar hiyerarşisi, her korumalı havuz için harcama anahtarının iki ayrı şey türeteceği şekilde yapılandırılmıştır:

- Harcama yetkilendirme anahtarı ve
- Tam görüntüleme anahtarı

FVK daha sonra kendisine ait daha fazla görüntüleme ile ilgili yetenek türetebilir; ancak hiçbir noktada bu türetme yolu yeniden harcama yetkisine götürmez. Bir anahtar hiyerarşinin görüntüleme tarafına ayrıldığında orada kalır ve geldiği harcama yetkisi anahtarını yeniden oluşturmak için kullanılamaz.

Ironwood, Orchard'in temel anahtar ve not yapısını yeniden kullandığı için aynı deseni izler. Bununla birlikte, mutabakat düzeyinde kendi taahhüt ağacına ve nullifier kümesine sahip ayrı bir havuzdur. Bu, bir UFVK'nın tek ve düz bir anahtar değil, havuz başına görüntüleme anahtarları paketi (şeffaf, Sapling, Orchard ve artık Ironwood) olduğu anlamına gelir.

Ironwood etkinleştirilmeden önce dışa aktarılan bir UFVK, bu havuz henüz var olmadığından bir Ironwood görüntüleme anahtarı içermez. Cüzdanların NU6.3 yükseltmesinden sonra Ironwood özellikli UFVK'leri tanımak ve türetmek için güncellenmesi gerekmesinin nedeni tam olarak budur.

### Ledger üzerinde ne kalır?

Harcama yetkisi cihazda kalır.

Ledger İmzalayıcısı, ana bilgisayardan bir işlem/PCZT alır ve işlemin hangi havuzdan harcama yaptığına bağlı olarak harcama yetkilendirme imzasını oluşturur (Ledger'in mevcut entegrasyonu yalnızca Ironwood'u desteklediğinden Ironwood havuzu). İmza daha sonra cihaz üzerinde üretilir ve ana bilgisayar özel harcama anahtarını değil, yalnızca imzayı alır.

Bu aynı zamanda Ledger'in genel güvenlik modeliyle de tutarlıdır. Secure Element'i özel anahtar malzemesini izole eder ve Ledger'in uygulama güvenlik gereksinimleri, uygulamaların bu sırları ana bilgisayara açığa çıkarmasını özellikle yasaklar.

Ledger'in imzalayıcısı, işlem imzalamayı bağımsız olarak gerçekleştirirken FVK/UFVK'yı dışa aktarabilir. Bu iki yetenek tek bir işlevde birleştirilmemiş, ayrı işlevler yoluyla sunulmuştur.

### Bu pratikte ne anlama geliyor?

Ledger'inizin 10 ZEC içerdiğini varsayalım.

Yardımcı cüzdan UFVK'ye sahip olabilir ve dolayısıyla şunu belirleyebilir: “Bu cüzdan 10 ZEC aldı.” İşlemleri ve bakiyeleri tarayabilir ve görüntüleyebilir.

Ancak biri yardımcı cüzdanı ele geçirirse, UFVK tek başına onlara harcama yetkilendirme imzasını oluşturma yeteneği vermez.

Ayrı harcama yetkilendirme imzasının amacı, donanım cüzdanları gibi kısıtlı cihazların tam zk-SNARK kanıtını kendilerinin gerçekleştirmesine gerek kalmadan korumalı harcamaları yetkilendirmesini sağlamaktır.

### Zondax Ledger uygulaması; donanım cüzdanı tarafı

#### Zondax nedir?

Zondax, Ledger Zcash uygulamasını oluşturan üçüncü taraf bir geliştirme şirketidir. Bu, Ledger donanımında çalışan ve cihaza en başta Zcash işlemlerini anlama ve işleme yeteneği veren gerçek aygıt yazılımı uygulamasıdır.

Zondax harici bir geliştiricidir. Ledger donanımı, Zcash işlemlerini işleme konusunda doğal bir yeteneğe sahip değildir ve bu yetenek tamamen Zondax'in yazılımından gelir.

### Özgün Zcash Ledger uygulaması

Zondax'in Ledger Zcash uygulama deposu, bir Ledger cihazında çalışan yazılımdır. Uygulama, Orchard Zcash'in birincil korumalı havuzu olarak mevcut olmadan önce başlangıçta Sapling korumalı işlemlerine odaklanmıştı; dolayısıyla Sapling desteği, bir Ledger cihazının korumalı ZEC ile yapabileceklerinin sınırıydı.

Mimarisi, ana bilgisayar/yardımcı tarafın işlem bilgilerini hazırlaması ve Ledger'in hassas anahtar işlemlerini ve imzalamayı gerçekleştirmesiyle ayrımı gösterir.

Zcash donanım cüzdanı desteğinin bu en eski sürümünde bile temel ilkeler, yani ana bilgisayarda oluşturma ve kanıtlama, ardından cihazda izole imzalama, zaten tasarımın parçasıydı.

### Orchard'e Doğru Evrim

Ledger'in çalışması Orchard + PCZT yönüne ilerledi. Orchard farklı bir kanıtlama sistemi (Halo 2, Sapling'in Groth16'sına karşı) ve farklı bir not ile anahtar yapısı kullandığından, bu küçük bir güncelleme yerine anlamlı bir geçişti; dolayısıyla yalnızca Sapling destekleyen aygıt yazılımını Orchard imzalamayı işleyecek şekilde genişletmek, sadece bir aygıt yazılımı yaması değil, cihaz tarafında yeni kriptografik temel çalışmalar gerektiriyordu.

Ancak Zcash, Ironwood yönüne ilerledikçe Zondax ve Ledger, Ironwood'i doğrudan desteklemeye yönelik geliştirme odağını kaydırdı; böylece bir Orchard uygulamasını tamamlayıp hemen ardından Ironwood için yeniden tasarlamak zorunda kalmadılar. Bu, Ledger uygulamasının evriminde daha ileri bir aşamayı temsil eder; zira Ironwood, Orchard kriptografik mimarisi üzerine inşa edilirken ayrı bir korumalı havuz ve ek protokol değişiklikleri sunar.

### Bu Ledger uygulamasının içinde ne olur?

Ortaya çıkan akış şöyle açıklanır:

1. Ana bilgisayar bir PCZT oluşturur.
2. Ana bilgisayar ilgili işlem bilgilerini Ledger cihazına gönderir.
3. Cihaz Orchard harcama yetkilendirme imzalarını üretir.
4. Ana bilgisayar, bağlayıcı imza ve nihai işlem birleştirmesi dâhil olmak üzere bundan sonraki her şeyi işler.

Ledger içindeki uygulama, harcama yetkilendirme imzasının ötesinde hiçbir şeyi görmez veya üretmez; hesaplama açısından ağır ya da veri açısından yoğun tüm işler (kanıtlama, bağlama, birleştirme), anahtar malzemesi konusunda güvenilmesine gerek olmayan ana bilgisayarda kalır.

### Ledger'in yerel korumalı entegrasyonu; Ledger Wallet Desktop

Ledger'in en yeni Zcash entegrasyonu, korumalı işlem oluşturma ile güvenlik açısından kritik imzalamanın yardımcı yazılım ve donanım cüzdanı arasında nasıl ayrılabileceğine dair somut bir örnek sağlar.

Ledger Wallet Desktop 4.21+ ve Zcash cihaz uygulaması 3.9.4+ ile kullanıcılar, Ledger Wallet Desktop üzerinden doğrudan Ironwood korumalı ZEC gönderip alabilir. Entegrasyon, özelden özele transferleri, şeffaf havuzdan korumayı, şeffaf havuza korumayı kaldırmayı, özel alım adreslerini ve notları destekler. İşlemler yalnızca bilgisayarın sunduğu bilgilere güvenmek yerine Ledger cihazında doğrulanır ve imzalanır.

Bu mimarinin temel bir parçası, görüntüleme ve harcama yeteneklerinin ayrılmasıdır. Özel bakiye senkronizasyonu sırasında Ledger, bilgisayarda yerel olarak depolanan Birleşik Full Viewing Key (UFVK) dışa aktarır. UFVK, Ledger Wallet Desktop'ın ilgili korumalı işlemleri tespit etmesine ve cüzdanın bakiyesini belirlemesine izin verir, ancak fonları harcama yetkisi sağlamaz. Güvenlik açısından kritik harcama yetkisi, nihai imzalama işlemini gerçekleştiren Ledger cihazında kalır. Bu, cüzdan durumunu yöneten ve işlemleri oluşturan bilgisayar ile harcamayı yetkilendirmek için gereken yeteneği koruyan donanım cihazı arasında açık bir sınır oluşturur.

Bununla birlikte, mevcut entegrasyon özellikle yalnızca Ironwood içindir. Ledger Wallet Desktop üzerinden Orchard veya Sapling fonlarını görüntülemez ya da yönetmez. Bu, tarihsel açıdan önemlidir; çünkü Ledger'in önceki Zcash geliştirmesi, uygulama Ironwood protokolüne doğru evrilmeden önce Orchard korumalı desteğiyle ilişkilendirilmişti.

Bu geçiş, anahtar ve hesap uyumluluğunun önemini de vurgular. Ledger, Zondax tarafından geliştirilen ve YWallet ile zkool gibi entegrasyonlar tarafından kullanılan, artık kullanımdan kaldırılmakta olan eski bir “Zcash Shielded” uygulamasına sahiptir. Bu eski uygulama korumalı hesaplar için farklı bir türetme şeması kullandığından, Sapling hesapları yeni Ledger uygulamasıyla basitçe yeniden üretilemez.

Dolayısıyla entegrasyon, korumalı donanım cüzdanı desteğinin hem ilerlemesini hem de kalan sınırlamalarını gösterir. Ledger artık yardımcı yazılımın cüzdan senkronizasyonunu ve işlem hazırlığını yürüttüğü, donanım cihazının ise harcama için güvenlik sınırı olarak kaldığı eksiksiz bir Ironwood deneyimi sağlayabilir.

Aynı zamanda, geçmiş hesap uyumluluğu, yalnızca belirli korumalı havuzlara yönelik destek, donanım işlem boyutu sınırları, platform kısıtlamaları ve korumalı işlemleri ayrıştırma ile doğrulamada yer alan hesaplama ve aygıt yazılımı kısıtlamaları; Zcash için donanım cüzdanı desteğinin yalnızca protokol yeteneklerine değil, aynı zamanda her bir uygulamanın tasarımına ve kaynaklarına da bağlı olduğunu göstermektedir.

### Zkool + Ledger — resmi Zondax uygulamasını kullanma

Ywallet'in halefi olarak Zkool, korumalı soğuk imzalama hedefini devraldı; ancak buna ulaşmak için farklı bir yol izledi. Bu yol, kriptografinin tek başına bir entegrasyonu kullanılabilir hâle getirmediği, imzalama uygulamasının güvenli biçimde dağıtılamadığı durumda entegrasyonun işe yaramayacağı gerçeği tarafından doğrudan şekillendirildi.

https://youtu.be/eagkCIv3BlQ?si=7w5YfLlRER77bASw

### Zkool'in Zondax uygulamasını kullanımı

Zkool, Ywallet'in terk edilmiş özel Ledger uygulaması yerine Zondax tarafından geliştirilen resmi Ledger Zcash uygulamasını kullanmaya yöneldi. Ledger'in mağazasının kabul etmeyeceği özel bir uygulamayı sürdürmek yerine, Zkool zaten kabul edilmiş ve Ledger'in kendi ekosistemi aracılığıyla dağıtılan uygulama üzerine inşa edildi.

Bu değişim, kullanıcıların bu entegrasyonu kullanmak için artık imzasız özel bir Ledger uygulaması yüklemeye güvenmesine gerek kalmadığı anlamına geliyordu; çünkü Zondax'in uygulaması Ledger'in ekosistemi aracılığıyla resmi olarak dağıtılıyordu.

Ancak bu entegrasyon, Ledger eski Zcash Shielded uygulamasını aşamalı olarak kaldırırken desteğin planlandığı üzere sona ereceği 5 Kasım 2026 tarihinde önemli bir değişimle karşı karşıyadır. Zkool'in Ledger entegrasyonu bu uygulamaya dayandığından, değişim mevcut bağlantının gelecekteki kullanılabilirliği hakkında sorular doğurur. Zkool üzerindeki kesin etki, eski uygulamayı Ledger Wallet dışında kullanmaya devam edip edemeyeceğine veya uyumlu bir alternatife geçiş yapıp yapamayacağına bağlıdır.

### Desteklenen korumalı havuzlar

Ywallet geliştiricisine göre, Zkool'in Ledger entegrasyonu Zondax tarafından geliştirilen resmi Ledger uygulamasını kullanıyordu ve hem şeffaf hem de korumalı Zcash destekliyordu. Bununla birlikte korumalı desteği Sapling ile sınırlıydı ve Orchard'i desteklemiyordu; ayrıca her türden en fazla beş girdi ve çıktı ile Ledger Live uyumluluğunun olmaması gibi başka entegrasyon sınırlamaları da vardı.

Bu sınırlama, o dönemdeki temel Zondax Ledger uygulamasının kapsamını yansıtıyordu. Zondax'in önceki Ledger çalışması Sapling desteği sağladı ve Zcash Shielded Ledger uygulamasının 2024'teki sonraki sürümü başlangıçta Orchard ve Unified Addresses'leri hariç tuttu. Bu nedenle, bu uygulama etrafında oluşturulan bir entegrasyon, bağlı olduğu donanım cüzdanı uygulamasının yeteneklerini ve sınırlamalarını devraldı.

Durum, Kasım 2024'te özel Zcash Shielded Ledger App'in yayımlanmasıyla daha sonra değişti. Zondax, uygulamanın Ledger Live üzerinden resmî olarak yayımlandığını belirtti ve daha sonra diğer cüzdanların uygulamayla entegre olmasını sağlamak için entegrasyon rehberi ile Rust ve JavaScript paketlerini yayımladı. Ancak uygulama, piyasaya sürüldüğünde yalnızca Zecwallet Lite Desktop ile iletişim kuruyordu; daha geniş cüzdan entegrasyonları hâlâ geliştiriliyordu.

Bir sonraki aşama, Ledger'in daha yeni Rust tabanlı Zcash uygulamasının geliştirilmesiydi. Haziran 2026 itibarıyla Ledger, UFVK paylaşımının ve Orchard Unified Address oluşturmanın uygulandığını, buna karşılık Orchard işlem imzalama ve ClearSign özelliklerinin hâlâ geliştirilmekte olduğunu bildirdi. Ledger ayrıca, protokol değiştikçe çalışmanın Ironwood yolunda devam edeceğini belirtti.

Ironwood daha sonra Zcash cüzdan ekosistemi genelinde güncellemeler gerektirdi. Zkool, 6.24.0 sürümünden itibaren Orchard'den Ironwood'ye geçiş desteğini yayımladı ve sonraki sürümlerde geçiş ile işlem hattını geliştirmeye devam etti. Ledger ise 27 Temmuz'da yeni uygulamasına PCZT v2 imzalamayı birleştirdi; ancak uygulama, 20 Ağustos itibarıyla Ledger incelemesini ve Ledger Live dağıtımını henüz tamamlamamıştı. Bu kilometre taşı o zamandan beri yayımlandı ve Ledger Wallet Desktop 4.21+ artık doğrudan yerel Ironwood desteği sunuyor.

https://forum.zcashcommunity.com/t/a-path-forward-for-ledger-and-zcash/50951/177

Dolayısıyla gelişimi tek bir Zondax-den-Ironwood'ye yükseltme olarak değil, birbiriyle ilişkili çeşitli gelişmeler olarak anlamak daha doğrudur: özgün Sapling odaklı Zondax uygulaması, 2024 Zcash Shielded Ledger App, Orchard ve PCZT desteğine sahip daha yeni Ledger Rust uygulaması, Ledger'in Ledger Wallet Desktop'taki kendi yerel entegrasyonu ve ekosistem Ironwood'ye geçerken Zkool gibi cüzdanlara yönelik paralel güncellemeler.

### Zcash için güncel Ledger cihaz ve platform desteği

Ledger üzerindeki Zcash desteği şunlara bağlıdır:

- Cihaz modeli
- Yüklü uygulama
- Onu yönetmek için kullanılan platform ve
- İşlemin şeffaf mı yoksa shielded mı olduğu.

21 Temmuz 2026 itibarıyla (Ledger'in son güncellemesi), Zcash Shielded uygulaması Nano S Plus, Stax ve Flex üzerinde desteklenmektedir; ancak henüz Nano X veya Nano Gen5 üzerinde desteklenmemektedir.

Nano X ve özgün Nano S dışındaki diğer modeller, şeffaf işlemleri ve shielded fonların şeffaf adreslere harcanmasını (deshielding) destekleyen, ancak shielded'dan shielded'a imzalamayı desteklemeyen klasik Zcash uygulamasını kullanmaya devam edebilir. Özgün Nano S, her iki uygulamayı da desteklemez; çünkü Ledger cihaz desteğini aşamalı olarak sonlandırmaktadır ve en yeni Zcash uygulaması bu cihazda kullanılamaz. Cihazlar, Ledger Wallet'a (eski adıyla Ledger Live), yani Ledger'in eşlik eden uygulamasına bağlanır; bu uygulama masaüstünde Windows, macOS ve Linux için, mobilde ise iOS ve Android için kullanılabilir.

Ledger, ayrı bir eşlik eden cüzdana duyulan ihtiyacı ortadan kaldıran, Ironwood havuzu üzerine kurulu Ledger Wallet Desktop'a yerel shielded Zcash ekledi. Shielded ZEC, Ledger'in iOS ve Android için mobil uygulamasında henüz desteklenmemektedir; ancak mobil destek gelecek bir sürüm için planlanmaktadır.

Ledger'in kendi yazılımı dışında shielded kullanım, uyumlu bir eşlik eden cüzdana ve onun desteklediği platformlara bağlıdır. Ledger, Ironwood desteğini genişletmeyi sürdürdükçe uyumluluk; cihaz modeline, aygıt yazılımına, uygulama sürümüne ve işletim sistemine bağlıdır; dolayısıyla genel Zcash desteği mutlaka uyumluluğu garanti etmez.

https://www.youtube.com/watch?v=VhkhfG0LCFs

### YWallet soğuk imzalama; önceki bir yaklaşım

Ywallet, hem Ledger hem de Zondax'den ayrı bir eşlik eden cüzdandır ve shielded soğuk imzalamaya yönelik kendi yolunu izlemiştir.

Ywallet tarihsel açıdan önemlidir; çünkü Zcash için soğuk imzalamayı araştırmıştır; bu, imzalama cihazının çevrimiçi cüzdandan ayrı tutulabileceği anlamına gelir.

Bu mimariyi Ledger donanımında gerçekleştirmek için Ywallet, önceki bölümde ele alınan Zondax uygulamasından farklı, özel mülk niteliğinde kendi Ledger uygulamasını oluşturdu. Bu, Ywallet'in Zondax'in mevcut Sapling uygulamasına dayanmadığı anlamına geliyordu; ilişkinin imzalama tarafını çalıştıran kendi aygıt yazılımına sahipti.

### Entegrasyon neden önemliydi?

Kriptografiye ve imzalama koduna sahip olmak yeterli değildir. Donanım cüzdanı entegrasyonu yalnızca kriptografik bir sorun değil, aynı zamanda kaçınılmaz olarak bir dağıtım ve platform sorunudur. En azından şunları içerir:

- Uygulama onayı/dağıtımı — donanım üreticisinin resmî uygulama mağazasının uygulamayı kabul edip dağıtıp dağıtmayacağı
- Aygıt yazılımı/uygulama güvenliği — uygulamanın anahtar malzemesini işlemek için üreticinin güvenlik gereksinimlerini karşılayıp karşılamadığı
- İletişim protokolleri — eşlik eden cüzdanın ve cihazın işlem verilerini gerçekte nasıl değiştokuş ettiği
- Cüzdanla uyumluluk — imzalama uygulamasının veri biçimlerinin ve akışının, eşlik eden cüzdanın bekledikleriyle eşleşip eşleşmediği
- Desteklenen shielded havuzlar — uygulamanın Sapling, Orchard (ve artık Ironwood) havuzlarından hangileri için gerçekten imzalayabildiği

Ywallet'in özel mülk niteliğindeki Ledger uygulaması kriptografik ve mimari gereksinimleri karşılıyordu; shielded Zcash işlemlerini imzalayabiliyordu, ancak Ledger'in resmî uygulama mağazasına kabul edilmedi.

### Özel mülk Ledger uygulamasından uzaklaşma

Uygulama resmî olarak kabul edilmediği için Ywallet, kullanıcılarından uygulamayı kullanabilmeleri için imzasız aygıt yazılımı yüklemelerini istemek zorunda kalacaktı. Bu, kullanıcılar için gerçek bir güvenlik tavizidir ve Ywallet bunu onlardan istememeyi seçti. Bu nedenle Ywallet, bu yolu izlemek yerine nihayetinde bu belirli entegrasyondan vazgeçti.

Özel mülk bir uygulamayı yeniden canlandırmak yerine, daha sonraki geliştirme (Ywallet'in halefi olan Zkool aracılığıyla) bunun yerine Zondax tarafından oluşturulmuş resmî Ledger uygulamasına yöneldi; özel, reddedilmiş bir uygulamayı, Ledger'in dağıtım ekosistemine zaten kabul edilmiş standartlaştırılmış bir uygulamayla değiştirdi. Bu değişim, çalışan bir Ledger entegrasyonunu sonunda yeniden mümkün kıldı.

### Ywallet'in mirası

Ywallet etkin geliştirmeden çekildikten sonra bile, aynı zamanda ZCG üyesi olan yaratıcısı Hanh, özellikle Ironwood geçişi, kaybolmuş gibi görünen fonlarla ilgili bildirilen sorunları ortaya çıkardığında ekosistemde önemli bir ses olarak kaldı.

**ZODL: Bir kullanıcı, Orchard → Ironwood geçişinden sonra gerçekten eksik fonlarla karşılaştı**

Bir kullanıcı olan Jmo0615, ZODL cüzdanında daha önce görünen fonların Orchard-den-Ironwood'ye geçişten sonra artık görünmediğini bildirdi. Özgün seed'i geri yüklediklerini, cüzdanı sıfırlayıp kurtardıklarını ve ZODL 3.14.1 (1) sürümünün tamamen senkronize olmasına izin verdiklerini belirttiler. Ayrıca herhangi bir Keystone donanım cüzdanının söz konusu olmadığını da doğruladılar.

Fonların gerçekten kaybolduğu tespit edilmemiştir. Aksine, bunun, Ironwood'e geçişten sonra daha önce görünen fonların artık görüntülenmediği, cüzdan keşfi veya geçişle ilgili bir sorun olduğundan şüphelenilmektedir. Algılanmayan veya görüntülenmeyen fonlar otomatik olarak kalıcı olarak kaybedilmiş fonlar şeklinde tanımlanmamalıdır ve geçiş sorunlarını anlamada bu ayrım önemlidir.

https://forum.zcashcommunity.com/t/funds-not-showing-since-ironwood/57792

**Zkool: “kilitli notlar” görünüşte kullanılamayan fonları açıklayabilir**

Shielded cüzdanların bir diğer önemli yönü, cüzdan durumunun kullanıcının gerçekten harcayabileceği fonları nasıl etkileyebileceğidir. Hanh, kullanıcıların hangi notların harcama için kullanılacağını elle seçmelerini sağlayan bir özellik olan coin control aracılığıyla bir notu yanlışlıkla kilitleyebileceğini açıkladı. Bu durumda bir not cüzdanda var olmaya devam edebilir, ancak harcama için kullanılamaz olarak işaretlenebilir.

Bu, cüzdan sorunları araştırılırken önemli bir ayrımı vurgular. Bir cüzdanda bulunan ZEC miktarı, her zaman harcamaya hazır mevcut miktarla aynı değildir. Not seçimi, senkronizasyon, geçiş durumu, cüzdan kurtarma ve coin control ayarları gibi etkenler görüntülenen veya harcanabilir bakiyeyi etkileyebilir. Bu nedenle, “eksik fon” bildirimlerinde; algılanmayan veya görüntülenmeyen fonlar, algılanan ancak harcama için kullanılamayan fonlar ve gerçekten kaybolmuş fonlar dikkatle birbirinden ayrılmalıdır.

https://youtube.com/shorts/eAOMRVYJFTA?si=xytBs-wZKn8hmu8D

## 2. Keystone

**Keystone nedir?**

Keystone, air gapped bir donanım cüzdanıdır. İmzalama cihazının, imzalama işleminin kendisi sırasında eşlik eden uygulamayla doğrudan kablolu veya kablosuz bağlantısı yoktur; bunun yerine QR kodları aracılığıyla iletişim kurar. Burada Zashi (artık Zodl olarak yeniden markalandı), yani Zcash yerel eşlik eden cüzdanıyla eşleştirilmiştir ve bu eşleştirme anahtar izolasyonu ilkesini alışılmadık derecede açık ve izlenebilir kılar.

**Keystone/Zashi akışı**

Keystone'in Zashi ile Zcash entegrasyonu bu ayrımı özellikle açık hâle getirir. Keystone'yi Zashi'ye bağladığınızda, Unified Full Viewing Key, Keystone'den Zashi'ye aktarılır.

Dolayısıyla akış şöyledir:

![Keystone and Zashi viewing flow](/content-images/keystone-zashi-viewing-flow.webp)

**Zashi, UFVK ile ne yapabilir?**

Zashi bunu şunlar için kullanabilir:

- gelen shielded işlemleri belirlemek
- bakiyeleri belirlemek
- shielded faaliyet hakkında bilgi edinmek

Ancak yalnızca UFVK'ye sahip olduğu için fonları harcayamaz.

UFVK, bakiyelerin ve işlemlerin öğrenilmesine izin veren ancak harcamaya izin vermeyen bir “görüntüleme yeteneğidir”.

### Keystone içinde ne kalır?

Seed/harcama yetkisi Keystone üzerinde kalır. Zashi seed'i, harcama anahtarını veya harcama yetkilendirme özel anahtarını almaz. UFVK'yi, adres bilgilerini ve yalnızca görüntüleme işlemi için gerekli bilgileri alır.

Bu iki yarı birlikte tabloyu tamamlar. UFVK, adresler ve yalnızca izleme bilgileri gibi cihazdan ayrılanlar, Zashi'in hesabı izlemesi için yeterlidir; ancak cihazdan ayrılan hiçbir şey fonları cihazdan dışarı taşımaya yeterli değildir.

Bu nedenle Zashi ve Keystone entegrasyonu shielded soğuk depolama sağlayabilir. Cüzdan uygulaması, hesabı harcama için gereken yetkiye sahip olmadan izleyebilir. Entegrasyon özellikle shielded ZEC için soğuk depolama sağlamak amacıyla başlatıldı.

Harcama yapmak istediğinizde:

![Keystone and Zashi spending flow](/content-images/keystone-spend-flow.webp)

## 3. Hito

Hito, Keystone'e çok benzer bir anahtar izolasyonu modeli izler, ancak uygulaması daha yenidir. Zashi gibi mevcut bir eşlik eden cüzdanla eşleşmek yerine Hito kendi Android cüzdanıyla birlikte gelir ve donanım cihazı ile bu Android uygulaması arasındaki ilk kurulum süreci, Hito'in geliştirme kilometre taşlarında belgelenmiştir.

**İlk kurulum: Hito uygulamasının aldığı bilgiler**

Android cüzdanı, donanım hesabının ilk kurulumu sırasında şunları kullanır:

- Unified Full Viewing Key (UFVK)
- Unified Address
- ZIP-32 seed parmak izi
- ağ bilgisi

Android uygulamasının hiçbir zaman donanım cüzdanının seed'ini veya özel harcama anahtarlarını almadığını unutmayın.

![Hito onboarding](/content-images/hito-onboarding.webp)

**Hito uygulaması ne alır?**

Belgelenen ilk kurulum bilgileri şunları içerir:

- UFVK
- Unified Address
- ZIP-32 seed parmak izi
- Ağ

UFVK, Android cüzdanına seed'i almadan hesabı görüntüleme yeteneğine sahip bir cüzdan olarak işletmesi için gereken bilgiyi verir. Seed parmak izi, hangi hesabın hangisi olduğunu tanımak için kullanılan, seed'den türetilmiş sabit uzunluklu bir tanımlayıcıdır; seed'in kendisi değildir ve herhangi bir harcama yeteneği vermez. Bu nedenle varlığı, yukarıdaki “seed'i hiçbir zaman almaz” ifadesiyle çelişmez.

**Hito üzerinde ne kalır?**

Asıl seed, özel harcama anahtarları ve imzalama yetkisi donanım cihazında kalır. Hito daha sonra imzalamayı çevrimdışı gerçekleştirir.

Mevcut Hito kilometre taşı, imzalı PCZT'in BLE aktarımı ve BBQr QR dışa aktarımını içeren, oluşturma, dışa aktarma, çevrimdışı imzalama ve içe aktarmanın tamamına yönelik iş akışının çalışır durumda olduğunu belirtir.

Bu iş akışını açıkça adlandırmak önemlidir; çünkü raporun önceki bölümlerinde ele alınan tam döngünün somut örneğidir: Android cüzdanı imzasız PCZT'yi oluşturur, bunu Hito'ye dışa aktarır, Hito izole edilmiş anahtar malzemesiyle çevrimdışı imzalar ve imzalı PCZT yeniden Android cüzdanına içe aktarılır.

Seed veya harcama anahtarı hiçbir noktada bu sınırı her iki yönde de geçmez.

![Hito signing flow](/content-images/hito-signing-flow.webp)

## Orchard'den Ironwood'e: Donanım Cüzdanı Desteğinin Evrimi

Orchard, kullanıcıların ZEC saklamasını ve gelişmiş gizlilikle işlem yapmasını sağlayan Zcash protokolündeki korumalı bir havuzdur. Ağ Yükseltmesi 5'te (NU5) sunulan Orchard, gönderen, alıcı veya miktar gibi hassas işlem bilgilerini açığa çıkarmadan korumalı işlemleri desteklemek için Halo 2 ispat sistemini ve yeniden tasarlanmış bir kriptografik mimariyi kullanır.

Ironwood, Orchard havuzunun halefi olarak Zcash'in NU6.3 ağ yükseltmesinde sunulan korumalı bir havuzdur. Orchard kriptografik protokolünü kullanırken, kuantum kurtarılabilirliği ve arz bütünlüğüne ilişkin daha güçlü güvenceler de dâhil olmak üzere korumalı fonların uzun vadeli güvenliğini iyileştirmek için tasarlanmış değişiklikler getirir.

Başlangıçta, Ironwood'in Orchard protokolünü tamamen yeni bir kriptografik sistemle değiştirmediğini açıklığa kavuşturmak önemlidir. Ironwood, mevcut Orchard protokolü üzerine inşa edilmiş yeni bir korumalı havuz olarak sunuldu. Bu, aynı Action yapısına, aynı Halo 2 ispat sistemine, aynı not ve anahtar yapılarına sahip oldukları anlamına gelir.

Ironwood kendi not taahhüt ağacına, nullifier kümesine, anchor'ına ve değer havuzuna sahiptir; dolayısıyla konsensüs düzeyinde gerçekten ayrı bir havuzdur. Ancak kriptografik olarak, yeniden bir yapılandırmadan ziyade Orchard'in bir uzantısıdır.

Bu şekilde tasarlanmasının nedenleri:

1. **Arz bütünlüğü.** 29 Mayıs 2026'da güvenlik araştırmacısı Taylor Hornby, Orchard'in sıfır bilgi ispat sisteminde, zincir üzerinde iz bırakmadan sahte ZEC oluşturulmasına izin verebilecek kritik bir sağlamlık kusurunu özel olarak bildirdi. Orchard'in işlem verileri gizli olduğundan, hiç sahte ZEC oluşturulmadığını düzeltmeden önce hiç kimse bağımsız olarak doğrulayamaz. Eski havuzu mühürleyip sıfırdan yeni bir havuz başlatmak, Orchard'i yerinde yamalamanın çözemeyeceği bu sorunu çözer.
2. **Kuantum kurtarılabilirliğini sağlamak.** Ironwood, temel ayrık logaritma varsayımları bir gün bozulursa fonlarının gelecekteki bir kurtarma mekanizmasına katılabilmesi için tasarlandı.
3. **Uygulama değişikliğini en aza indirmek.** Tamamen yeni bir korumalı protokol tasarlamak yerine, Orchard'in kanıtlanmış mimarisi yeniden kullanıldı. Bu, çok daha az yeni işlem, ispat, cüzdan ve donanım cüzdanı kodunun sıfırdan yazılması gerektiği anlamına geliyordu.

### Herkese açık zaman çizelgesi

- 29 Mayıs: Orchard güvenlik açığı açıklanır.
- Haziran: İlk düzeltme NU6.2 üzerinden dağıtılırken Orchard işlemleri geçici olarak kısıtlanır. 12 Haziran'da bir çekirdek geliştirici, tam yükseltme için 21 Temmuz'u hedefler; bu tarih daha sonra bir hafta ertelenir. Topluluktan gelen bir endişe, Keystone sahiplerinin en son geçiş yapacak olmasıydı; bunun üzerine bir çekirdek geliştirici, Keystone'in ilk günden itibaren Ironwood'ü destekleyeceğini, kesinleşmiş imzalama sabitleri ve Zcash çekirdeğinden gelecek Orchard API değişikliklerine bağlı olarak ürün yazılımının 3 Temmuz için hedeflendiğini söyledi.
- Temmuz başı: NU6.3 testnet'e ulaşır; Zebra 6.0.0 10 Temmuz'da yayımlanır.
- 27–28 Temmuz: Ledger'in Ironwood PCZT v2 imzalama çalışması bir entegrasyon dalına birleştirilir. Ironwood (NU6.3), 28 Temmuz'da 3.428.143 numaralı blokta etkinleşir; bu, orijinal Orchard havuzunu, Orchard'den çıkabilecek ZEC miktarını içine meşru olarak yatırılmış miktarla sınırlayan bir turnikenin arkasına kapatır ve yeni bir işlem formatı sunar.

Zebra gerekli düğüm hâline gelir, çünkü zcashd yeni konsensüs kurallarını desteklemez. Adresler değişmez; çünkü Ironwood, Orchard'in alıcı yapısını yeniden kullanır, bu nedenle cüzdanlar mevcut adresleri otomatik olarak yeni havuza yönlendirir. Cüzdanların ihtiyaç duyduğu şey geçiş işlevselliğidir; çünkü Orchard fonları nihayetinde sahipleri tarafından Ironwood'e taşınmalıdır ve Orchard alan yeni çıktılar artık konsensüs tarafından tamamen engellenmektedir.

### Teknik olarak neler değişti

İşlem formatları sürüm 5'ten sürüm 6'ya geçti; böylece tek bir işlem, mevcut Sapling/Orchard/şeffaf bileşenlerin yanında bir Ironwood bileşeni taşıyabilir. PCZT de buna paralel olarak genişletildi:

- Kodlama, PCZT v1'den v2'ye geçti.
- Ayrı bir Ironwood paketi artık Sapling ve Orchard paketlerinin yanında yer alıyor.
- v6 işlemleri ve yeni bir v6 sighash destekleniyor.
- Not düz metinleri yeni bir sürüm kazandı (V3).

Sighash değişikliği özellikle donanım cüzdanları için en önemli noktadır. v6'da Orchard ve Ironwood anchor'ları imza karmasının dışında tutulur ve yalnızca yetkilendirme verisi özetine dahil edilir. Bu yalnızca bir sürüm artırımı değil, gerçek bir ürün yazılımı değişikliğidir. Bir cihazın yeni sighash'i doğru şekilde uygulaması ve eşlik eden uygulamanın onayladığını iddia ettiği şeye güvenmek yerine bunu kendisinin yeniden hesaplaması gerekir.

Yalıtım sözleşmesinin kendisi değişmedi: cihaz hâlâ yalnızca harcama yetkilendirme imzasını döndürür, asla `alpha` döndürmez ve bağlama imzasını da üretmez; ana makine de hâlâ ispat oluşturma ve diğer her şeyi yürütür.

Ancak v6 ile bir imzalayıcı kuralı değişti: sahte dolgu harcamaları cihaz yerine IO Finalizer tarafından imzalanır, çünkü cihazın bunları gerçek not verilerine göre doğrulamasının bir yolu yoktur. Cihazın Signer rolü, doğrulayamayacağı bir şeyi imzalaması istenmek yerine bunları atlar. Görüntülenen ücretler de artık hem Orchard hem de Ironwood değer bakiyelerini birlikte toplar; çünkü bir v6 işlemi aynı işlemde her iki havuzdan da harcama yapabilir.

Bu havuz muhasebesini doğru yapmak, yalnızca teoride değil pratikte de önemlidir. Brave'in kendi Zcash cüzdanındaki yakın tarihli bir hata yararlı bir örnektir: ücret hesaplaması, tüm korumalı girdilerin eski Orchard havuzuna ait olduğunu varsayıyordu ve bir işlem gerçekte Ironwood içerdiğinde yinelenen eylemlere ve yanlış ücret tahminlerine yol açıyordu. Bu, donanım cüzdanı imzalamanın arkasındaki “kendin yeniden hesapla, ana makineye güvenme” ilkesinin yakalamak için var olduğu hata sınıfının tam kendisidir. Bir eşlik eden cüzdan havuz muhasebesini yanlış yaptı ve yalnızca kendi hesabını bağımsız biçimde kontrol eden bir cihaz, imzalamadan önce bunu işaretleyebilirdi.

### Her imzalayıcının durumu

**Ledger tüm tabloyu az önce değiştirdi.** 23 Eylül 2026'da Ledger, ayrı bir eşlik eden uygulamaya artık ihtiyaç olmadan, yerel korumalı Zcash desteğini doğrudan Ledger Wallet Desktop içinde yayımladı. Harcama anahtarınız cihazda kalır, bilgisayar işlem hesaplamalarını yapar ve imzalanmadan önce ekrandaki her şeyi onaylarsınız. Yalnızca Ironwood'i destekler; eski Orchard veya Sapling havuzlarını desteklemez. Dezavantajı, çalışmak için Zkool gibi bir eşlik eden cüzdan gerektiren ve Zondax tarafından oluşturulan eski “Zcash Shielded” uygulamasının kullanımdan kaldırılmasıdır. Ledger, bu eski uygulamayı 5 Kasım'da erişimden kaldırıyor; dolayısıyla onu hâlâ kullanan herkesin fonlarını o tarihten önce taşıması gerekiyor.

**Keystone iyi durumda.** Ürün yazılımı 3.0.2, Temmuz ayında tam Ironwood desteğini ekledi ve bu hâlâ geçerli, kararlı gereksinimdir. Ancak herhangi bir şeyi imzalamak için bu sürüm veya daha yenisi gereklidir.

**Hito ilk testnet aşamasının ötesine geçti.** Fiziksel donanım üzerinde ilk gerçek Orchard-den-Ironwood'e işlemini başarıyla imzalayıp gönderdi (başlangıçta testnet üzerinde). Sonraki güncellemeler, üretim donanımında mainnet akışlarını (Ironwood→Ironwood, Ironwood→Transparent ve diğerleri) doğruladı. Kararlı ürün yazılımı ve daha geniş kapsamlı sürüm çalışmaları devam ediyor.

Zondax ve Zkool şu anda belirsiz bir geçiş sürecindedir. Zondax'in uygulaması, Ledger üzerinde kullanımdan kaldırılan uygulamadır. Ledger cihazlarıyla iletişim kurmak için bu uygulamaya dayanan Zkool, eski uygulama ortadan kalktığında bu rolün ne olacağını belirtmedi. İleride Ledger kullanıcıları için önemini koruyup korumayacağı veya geleceğinin esas olarak diğer cihazlarla olup olmayacağı belirsizdir.

Geçişin kendisi en büyük etkiyi oluşturuyor. Havuzlar arasında geçen miktar herkese açık olduğundan, cüzdanlar bir bakiyeyi tek bir görünür parça hâlinde taşımak yerine transferleri zaman içinde standart tutarlara yayar; bu da geçiş başına imzalanacak çok sayıda işlem anlamına gelir ve toplu PCZT imzalamanın donanım cüzdanları için neden bu kadar önemli olduğunu tam olarak açıklar.

Ledger'in ürün yazılımı çalışması ayrıca donanım sınırlarıyla karşılaştı: gerçek bir not harcaması, tek bir komutta on binlerce kriptografik sistem çağrısına ulaşarak cihazın watchdog'unu tetikleyebiliyordu. Düzeltme, alan aritmetiğini yazılıma taşıdı ve Nano X'in yığın kısıtlamalarına sığmak için paylaşılan bir geçici çalışma durumu gerektirdi.

https://forum.zcashcommunity.com/t/ironwood-is-here-updated-wallets-libraries-aug-20/56557/40

### Tek bir görselde evrim

![The evolution in one picture](/content-images/orchard-to-ironwood-evolution.webp)
