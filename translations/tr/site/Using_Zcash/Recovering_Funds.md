<a href="https://github.com/Zechub/zechub/edit/main/site/Using_Zcash/Recovering_Funds.md" target="_blank">
  <img src="https://img.shields.io/badge/Edit-blue" alt="Edit Page"/>
</a>

# Zcash Cüzdan Fon Kurtarma

**Kurtarma materyalinizi neden saklamalısınız?**

Tohumlar, harcama anahtarları, görüntüleme anahtarları ve cüzdan dosyaları birbirinin yerine kullanılamaz. Bir tohum ifadesi birçok cüzdan için cüzdan anahtarları türetebilir, ancak her eski anahtarın veya cüzdan dosyasının yerini tutmaz. Bir görüntüleme anahtarı korumalı etkinliği gösterebilir ancak bir harcamaya yetki veremez.

Kurtarma, fonları tutan havuz için doğru harcama yetkisine ve hâlen desteklenen bir yola sahip olmaya bağlıdır. Kurtarma materyalini gizli tutun ve tohumları, harcama anahtarlarını veya cüzdan dosyalarını güvenmediğiniz hiç kimseyle paylaşmayın.

# Güvenlik ve Sorumluluk

Kullanıcıların özel anahtarlarla uğraşmanın getirdiği riskleri anlaması ve bu anahtarları yetkisiz erişime karşı koruması çok önemlidir. Fonların güvenliği, kullanıcının özel anahtarlarını koruma sorumluluğuna bağlıdır.

## Eski korumalı fonlar: Sprout, Sapling ve Orchard

Daha eski korumalı ZEC, kurtarmanın bir parçası olarak taşınmayı gerektirebilir. İzlenecek yol, fonları şu anda hangi korumalı havuzun tuttuğuna bağlıdır.

> **NU7 5 Kasım 2026 için planlanmıştır.** Etkinleştiğinde, eski Sprout havuzundan çıkış için mevcut taşıma yolu çalışmayı durduracaktır.
>
> Sprout havuzunda hâlâ ZEC varsa, yükseltmeden önce taşıyın. Etkinleştirmeden sonra mevcut araçlar Sprout fonlarını Sapling, şeffaf adreslere veya başka herhangi bir hedefe artık taşıyamayacaktır.
>
> Bu sayfayı NU7 etkinleştikten **sonra** görüntülüyorsanız, **Sprout buzda donmuş durumdadır**; şu anda planlanmamış olan gelecekteki bir kurtarma yöntemi kullanılabilir hâle gelene kadar böyle kalacaktır.

## Tek sayfada yanıt

| Fonlarınız şurada | Taşıma yolu | Yapılması gereken |
| --- | --- | --- |
| **Sprout** | **Sprout → Sapling → Ironwood** | `wallet.dat` veya bağımsız bir Sprout harcama anahtarınız varsa, önce mevcut Argos kurtarma yolunu deneyin. Argos uygun değilse, tam saha rehberindeki eski yan araç yolunu kullanın. Sprout önce Sapling içine ulaşmalı, ardından Ironwood'a ilerlemelidir. Bu yol NU7 nedeniyle zamana duyarlıdır. |
| **Sapling** | **Sapling → Ironwood** | Sprout kurtarma ortamına gerek yoktur. Belirli Sapling hesabınızı hem kurtarabilen veya harcayabilen hem de Ironwood işlemleri oluşturabilen güncel bir cüzdan kullanın. Ironwood desteği tek başına eski-Sapling kurtarma desteğini kanıtlamaz. |
| **Orchard** | **Orchard → Ironwood** | Orchard yalnızca çıkış içindir. Güncel ve uyumlu bir cüzdanın yerleşik Orchard-Ironwood taşıma akışını kullanın. Bkz. [Kurtarılan fonlar ve Ironwood havuzu](#recovered-funds-and-the-ironwood-pool). |

### Beş soruluk karar akışı

1. **Sprout mu?** Tek başına bir tohum ifadesi Sprout'a değil, daha sonraki bir Sapling/Orchard dönemi kurtarma yoluna işaret eder. Bir `zc...` adresi veya Sprout bakiyesi bildiren geri yüklenmiş bir cüzdan, Sprout'a işaret eder.
2. **Hangi kurtarma materyaline sahipsiniz?** `wallet.dat`, eski bilgisayar veya veri dizini, bir `z_exportwallet` yedeği ya da dışa aktarılmış bir Sprout harcama anahtarı arayın. Tek başına bir `zc...` adresi yeterli değildir.
3. **Argos mi, eski yan araç mı?** `wallet.dat` veya bağımsız bir Sprout harcama anahtarınız varsa ve yalnızca fonları çıkarmak istiyorsanız önce [Argos](#zecwallet-lite-and-legacy-wallet-recovery-with-argos) deneyin. Argos materyali işleyemiyorsa veya tam kurtarma yığınını kendi denetiminizde istiyorsanız, tam saha rehberindeki eski yan araç yolunu kullanın.
4. **Zaten senkronize edilmiş, budanmamış bir zcashd veri dizininiz var mı?** Bu yalnızca eski yan araç yolu için önemlidir. Mevcut düğüm verilerini yalnızca temiz bir kapatmadan sonra kopyalayın; aksi hâlde saha rehberi anlık görüntü/sıfırdan başlama seçeneklerini kapsar.
5. **Fonlar nereye ulaşır?** **Ironwood.** Tek bir doğrudan Sprout-Ironwood işlemi olmadığından Sprout önce Sapling üzerinden geçer. Sapling aşamasında durmayın.

### Tam ZEC Havuz Taşıma Saha Rehberi

Ayrıntılı kurtarma yolları, komutlar, ücretler, donanım gereksinimleri, gizlilik hususları, sorun giderme ve kaynak notları dâhil eksiksiz taşıma başvurusu için tam rehberi okuyun.

**Sürüm 1.1 · Güncelleme: 18 Eylül 2026**

[ZEC Havuz Taşıma Saha Rehberinin tamamını ZecHub içinde okuyun](/research/zec-pool-migration/view)

> **Başlamadan önce:** önce **neyi kurtardığınızı ve hâlâ hangi kurtarma materyaline sahip olduğunuzu** belirleyin. Güncel bir cüzdan tohumu veya desteklenen Sprout dışı harcama anahtarı yalnızca normal bir geri yükleme gerektirebilir. ZecWallet Lite tohumu, eski bir `wallet.dat` veya bağımsız bir Sapling ya da Sprout harcama anahtarı gibi daha eski materyaller özel bir kurtarma yolu gerektirebilir.
>
> Fonların **Sprout** içinde olduğunu düşünüyorsanız, kurtarmaya zaman ayırmadan önce hâlâ harcama yetkiniz olduğunu doğrulayın. Tek başına bir `zc...` adresi veya görüntüleme materyali fonları taşımak için yeterli değildir.
>
> **YWallet artık Ironwood sonrasında Zcash desteklemiyor.** Desteklenen tohumlar ve anahtarlardan sıradan Sprout dışı geri yüklemeler için **Zkool** kullanın. ZecWallet Lite kurtarma, eski cüzdan dosyaları ve bağımsız Sapling/Sprout harcama anahtarları için **Argos** kullanın. Sprout için ilk denenmesi gereken yol Argos'dır; tam saha rehberi eski yan araç geri dönüş seçeneğini kapsar.
>
> Aşağıdaki tabloyu, hatırladığınız kurtarma aracına göre değil, **gerçekte sahip olduğunuz şeye** göre kullanın.

| Sahip olduğunuz şey | Buradan başlayın |
| --- | --- |
| Güncel veya yakın zamanda bakımı yapılmış bir cüzdandan gelen bir tohum ifadesi ya da desteklenen **Sprout dışı harcama anahtarı**; eski YWallet Zcash materyali de dâhil | [Zkool](#fund-recovery-with-zkool) |
| Yalnızca bir **görüntüleme anahtarı** | Zkool salt-okunur erişim için desteklenen görüntüleme anahtarlarını içe aktarabilir, ancak görüntüleme anahtarı kurtarma harcamasına yetki veremez. Karşılık gelen tohumu veya harcama anahtarını bulun. |
| 24 kelimelik bir **ZecWallet Lite** tohumu | [Argos](#zecwallet-lite-and-legacy-wallet-recovery-with-argos) |
| Bir ZecWallet Lite veya zcashd `wallet.dat` ya da bağımsız bir Sapling / Sprout harcama anahtarı | [Argos](#zecwallet-lite-and-legacy-wallet-recovery-with-argos). 18 Eylül 2026 itibarıyla v1.3.0 güncel ve tercih edilendir; `wallet.dat` ve Sprout kurtarması için v1.2.0 veya sonrasını kullanın. |
| Argos'ın işleyemediği Sprout materyali veya eski bileşenleri kendi denetiminizde istediğiniz bir kurtarma | [tam saha rehberindeki](/research/zec-pool-migration/view) eski yan araç yolunu kullanın. |
| Çalışan tohum veya harcama anahtarı yok, ancak kilitli bir cihaz, unutulmuş parola veya arızalı disk var | [Profesyonel kurtarma](#professional-recovery-when-you-do-not-have-the-seed). Size istenmeden ulaşan hiç kimseye çalışan bir tohum veya harcama anahtarı göndermeyin. |

## Zkool ile Fon Kurtarma

[Zkool](https://github.com/hhanh00/zkool2/releases), aynı geliştiricinin YWallet uygulamasının bakımı sürdürülen Zcash halefidir. Eski Sapling anahtarları da dâhil olmak üzere şeffaf ve modern korumalı kurtarma yollarını destekler, ancak **Sprout'u desteklemez**.

Burada iki durum ele alınmaktadır:

1. Bir hesabı tohum ifadesinden, özel anahtardan veya görüntüleme anahtarından **geri yüklemek**
2. Yalnızca şeffaf adresleri desteklemiş bir cüzdandaki fonları **süpürmek**

### 1) Bir Hesabı Geri Yükleme

1. Zkool uygulamasını [sürümler sayfasından](https://github.com/hhanh00/zkool2/releases) yükleyin ve açın
2. **Hesap Yöneticisi**nde (ana sayfa), **Yeni Hesap** ekranına ulaşmak için **+** düğmesine dokunun
3. Bu hesabı tanımlamak için bir **Hesap Adı** girin
4. **Hesabı Geri Yükle?** seçeneğini açın. Bu, anahtar ve başlangıç yüksekliği alanlarını gösterir
5. Anahtarınızı **Anahtar (Tohum İfadesi, Özel Anahtar veya Viewing Key)** alanına yapıştırın. Zkool tohum ifadelerini, Sapling gizli anahtarlarını, şeffaf genişletilmiş anahtarları ve desteklenen görüntüleme anahtarlarını kabul eder. Görüntüleme anahtarı salt-okunurdur ve harcamaya yetki veremez.
6. Eski bir hesap için bir **Başlangıç Yüksekliği** girin. Zkool bu yükseklikten önceki blokları taramaz; emin değilseniz cüzdanın ilk etkinliğinden daha erken bir yükseklik seçin. Çok geç ayarlanmış bir başlangıç yüksekliği, gerçek işlemlerin eksik görünmesine neden olabilir.

![Zkool New Account screen with Restore Account and Advanced Options both turned on](/content-images/zkool-restore-account-60b1d2777e.webp)

7. Hesabı kaydedin, ardından senkronize edin

### Farklı bir cüzdandan gelen tohumu geri yükleme

Tohum, ZIP 316'yı izleyen bir cüzdandan geldiyse — eski adı Zashi olan ZODL, Zingo veya zcashd dâhil — kaydetmeden önce **Gelişmiş Seçenekler**i açın ve **Dahili Değişikliği Kullan** seçeneğini etkinleştirin.

ZIP 316 ayrı bir dahili/değişiklik adresi kullanır. Bu hesaplardan birini **Dahili Değişikliği Kullan** olmadan geri yüklemek, fonlar hâlâ mevcut olsa bile değişiklik çıktılarının eksik görünmesine neden olabilir.

İki ek alan **Gelişmiş Seçenekler** altında bulunur:

- Yalnızca özgün cüzdan kullanmışsa **Ek Parola (isteğe bağlı)**
- Özgün cüzdanda tek tohum altında birden fazla hesap varsa **Hesap Dizini**. Fonlar farklı bir dizinde olabilir

> **Bu ikisi yalnızca Anahtar alanında geçerli bir tohum ifadesi olduğunda görünür.** Alan boşsa veya özel ya da görüntüleme anahtarı içeriyorsa, Zkool yalnızca **Dahili Değişikliği Kullan** ve **H/W Ledger** seçeneklerini gösterir. Önce tohumu yapıştırın, ardından Gelişmiş Seçenekler'i açın.

### 2) Yalnızca Şeffaf Adresli Bir Cüzdandan Fon Süpürme

Eski cüzdan veya hesap yalnızca **şeffaf ZEC** tutuyorsa, önce hesabı geri yükleyin, kullanılan her şeffaf adresi bulun, ardından fonları denetiminizdeki güncel korumalı bir hedefe taşıyın. Eski bir cüzdan markasının her zaman yalnızca şeffaf adresli olduğunu varsaymayın; bazı ürünler sonraki sürümlerde korumalı destek eklemiştir.

1. Yukarıdaki adımları kullanarak hesabı geri yükleyin
2. Hesabı açın ve **Fon Al** sayfasına gidin
3. Üst çubuktaki büyütece dokunun (**Diğer şeffaf adresleri bul**). Ledger ve Exodus gibi adresleri döndüren cüzdanlar, tek bir tohumdan çok sayıda şeffaf adres üretir; bu işlem fon tutanları bulur
4. Ardından **hesabı sıfırlayın ve senkronize edin.** Yeni bulunan adresler bakiyelerini yalnızca sonraki taramada alır; bu adımı atlamak, süpürmenin hiçbir şey bulmadığı izlenimini verir
5. **Gönder** sayfasına gidin. Bakiyenin yanında üç simge düğmesi bulacaksınız. Metin etiketleri yoktur; adlarını görmek için üzerine gelin veya uzun basın:
   - **Birini Koru** (çerçeveli kalkan), her seferinde bir şeffaf adresi taşır
   - **Tümünü Koru** (dolu kalkan), her şeffaf adresteki her şeyi aynı anda taşır
   - **Tüm Korumasını Kaldır** (açık asma kilit), ters yönde, şeffaf bir adrese taşır

> **Birini Koru daha gizli bir seçenektir.** Birden fazla adresi tek işlemde korumak, bunların aynı kişiye ait olduğunu herkese açık biçimde bağlar. Zkool, Tümünü Koru'yu çalıştırmadan önce bununla ilgili uyarıyı kendisi de gösterir.

6. İşlemi gözden geçirin ve gönderin

Tüm Korumasını Kaldır, yalnızca şeffaf adresleri kabul eden bir borsaya para çekerken kullanışlıdır. Koruma düğmeleri yalnızca hesabın korumalı bir adresi varsa, Tüm Korumasını Kaldır ise yalnızca şeffaf bir adresi varsa görünür.

## Argos ile ZecWallet Lite ve eski cüzdan kurtarma

[ZecWallet Lite](https://github.com/adityapk00/zecwallet-lite) artık bakımı yapılmıyor ve deposu arşivlenmiş durumda. Tohum türetimi, güncel cüzdanların kullandığı düzenden farklıdır; bu nedenle aynı ifadeyi modern bir cüzdana aktarmak, ZecWallet Lite'ın ek türetilmiş adreslerinde tutulan fonları gözden kaçırabilir. [Argos](https://argos.sovright.com), Sovright tarafından sunulan, bu ve diğer eski kurtarma durumları için oluşturulmuş bir masaüstü kurtarma çalışma alanıdır.

Argos ZecWallet Lite tohumlarını ve cüzdan dosyalarını, zcashd `wallet.dat`, bağımsız Sapling genişletilmiş harcama anahtarlarını ve Sprout harcama materyalini okur. Sprout için tek başına ZecWallet Lite tohumu yeterli değildir; çünkü bu anahtarlar ayrı olarak oluşturulmuştur. Argos günlük kullanım cüzdanı değil, bir kurtarma aracıdır: kaynak materyali yerel olarak inceleyin, tarayın ve ardından denetiminizdeki bakımı yapılan bir cüzdana süpürün.

Least Authority, aracı [denetledi](https://argos.sovright.com/assets/least-authority-argos-audit-2026-06-29.pdf). Kurtarmanın kendisi ücretsizdir. Süpürme sırasında Sovright için isteğe bağlı bağış görünebilir.

> **Bir tohumu asla bir web sitesine yazmayın.** Argos sitesi yalnızca indirme ve [kullanıcı rehberi](https://argos.sovright.com/guide.html) içindir. Anahtarlar imzalı masaüstü uygulamasında kalır. Doğrulama BIP-39 sağlama toplamına karşı yerel olarak yapılır. Tarama başladığında tohum alanı temizlenir. Fonlarınızı kurtarmaya “yardım etmek” için bu tohumu isteyen herkes dolandırıcıdır.

### Argos uygulamasını açmadan önce

1. Masaüstü uygulamasını [resmî Argos sitesinden](https://argos.sovright.com) veya [GitHub sürümler sayfasından](https://github.com/sovright/argos/releases) indirin. Yayımlandıklarında sağlama toplamlarını veya imzaları doğrulayın.
2. Güncel Argos sürümünü kullanın. 18 Eylül 2026 itibarıyla **v1.3.0** güncel ve tercih edilendir. **`wallet.dat` ve Sprout kurtarması için v1.2.0 veya sonrasını kullanın.** 1.1.0'dan eski derlemeler hâlâ tarama yapabilir, ancak ağın reddettiği Ironwood öncesi süpürmeler oluşturur; güncelleyin ve yeniden deneyin.
3. Güvendiğiniz bir makinede çalışın. Tam disk şifrelemeyi tercih edin. Tohum, parola veya harcama anahtarı görünürken ekran paylaşımı yapmayın.
4. Unified Address için [ZODL](https://zodl.app/) gibi denetiminizdeki bakımı yapılan bir cüzdandan bir hedef hazırlayın. Adresi Argos içine yapıştırmadan önce o cüzdanda doğrulayın.

### Tohum kurtarma

1. Argos uygulamasını açın ve **24 kelimelik tohum ifadem var** seçeneğini seçin. Tohum kurtarması cüzdan dosyası gerektirmez.
2. İfadeyi yapıştırın ve **Tohumu doğrula** seçeneğine tıklayın. Tohumun geçerli olduğunu söylüyorsa devam edin.
3. Bir **doğum günü blok yüksekliği** veya cüzdanın oluşturulduğu zamana dair en yakın tahmini girin. Daha erken bir yükseklik, çok geç tahmin etmekten daha yavaş ama daha güvenlidir.
4. Sunucu kontrolleri altında mevcut sunucu ön ayarını kullanın veya lightwalletd URL'lerini girin. Virgülle ayrılmış URL'ler sırayla denenir. Herkese açık örnekler:

   `https://zec.rocks:443,https://zec-node.cakewallet.com:443,https://na.zec.rocks:443`

5. Hedef Unified Address yapıştırın.
6. **taramayı başlat** seçeneğine tıklayın. Bu, doğum günü yüksekliğine bağlı olarak dakikalar veya günler sürebilir. Aynı çalışma alanından çıkıp yeniden açabilirsiniz; tarama devam eder.
7. Tarama bittiğinde bakiyeleri, ücret tahminini ve hedefi gözden geçirin, ardından **süpür** seçeneğine tıklayın.

Bir süpürmeyi yayınlamak geri döndürülemez. İlgili her havuz süpürülene ve hedef cüzdan beklenen fonları gösterene kadar özgün cüzdan dosyasını saklayın. Kurtarma tamamlandığında, eski gizli bilgileri yeni etkinliklerde kullanmayı sürdürmek yerine kullanımdan kaldırın.

### Cüzdan dosyaları ve bağımsız anahtarlar

Karşılama ekranında **Bir cüzdan dosyam var** seçeneği; bir ZecWallet Lite dosyasını, bir zcashd `wallet.dat` veya bağımsız Sapling genişletilmiş harcama anahtarlarını kapsar. Bağımsız Sprout harcama anahtarı kurtarması, Argos'ın Sprout kurtarma yolu/CLI'ı tarafından gerçekleştirilir.

Argos cüzdan dosyalarını değiştirmeden okur. Cüzdan şifreliyse, istendiğinde parolayı girin; bellekte kullanılır ve diske yazılmaz. Taramaya başlamadan önce şeffaf, Sapling ve Sprout anahtar sayılarını gözden geçirin.

Görüntüleme anahtarları, harcamaya yetki veremedikleri için süpürme amacıyla kabul edilmez.

### Sprout notları

Bir ZecWallet Lite tohumu Sprout anahtarları türetmez. Bu anahtarlar ayrı olarak oluşturulmuştur. Sprout'u bir zcashd `wallet.dat` üzerinden veya CLI'da bağımsız bir harcama anahtarından kurtarın.

Dosyada zaten harcanabilir not verisi ve önbelleğe alınmış bir tanık varsa, Argos zincir taraması olmadan **Sprout fonlarını süpürme** seçeneği sunabilir. Aksi hâlde P2P ağı üzerinden devam ettirilebilir bir tam blok taraması çalıştırabilir. Bu tarama büyük ve yavaştır. Yazdığı denetim noktası harcama yetkisine sahiptir; bu nedenle onu özgün cüzdan gibi koruyun.

Sprout değeri yalnızca Sapling içine ulaşabilir. Sapling fonları onaylandıktan ve harcanabilir olduktan sonra, kurtarılan Sapling hesabını destekleyen güncel bir cüzdanla onları **Ironwood**'a taşıyın. Sapling aşamasında durmayın.

## Kurtarılan fonlar ve Ironwood havuzu

Ironwood (NU6.3) yükseltmesi 28 Temmuz 2026'da etkinleştirildiğinden beri, Orchard havuzu yalnızca harcama amaçlıdır. İçine yeni değer giremez; mevcut değer turnikeden Ironwood'a çıkar.

Kurtarılan fonlarınız Orchard içindeyse, onları **güncel bir cüzdanın yerleşik taşıma akışını** kullanarak Ironwood'a taşıyın. Orchard, NU6.3 sonrasında yalnızca çıkış içindir.

Zkool 6.30.0, 18 Eylül 2026 itibarıyla günceldir ve Ironwood'u destekler. Taşıma tasarımı gizlilik odaklıdır ancak ZIP 318 uyumluluğu iddiasıyla aynı şey değildir. Diğer güncel cüzdanlar ZIP 318 tarzı aşamalı taşıma kullanabilir. Elle bir tutar veya takvim uydurmak yerine yüklü cüzdanın güncel taşıma ekranını ve sürüm notlarını izleyin.

Aşamalı taşıma birden fazla işlem kullanabilir; bu nedenle toplam ücret tek seferlik transferden daha yüksek olabilir.

> **Taşıma tutarları herkese açıktır.** Değer turnikeden geçtiğinde, gönderici ve alıcı korumalı kalsa da tutar ve blok yüksekliği zincir üzerinde görünür. Gizlilik önemliyse cüzdanın yerleşik özel/aşamalı taşıma politikasını kullanın ve uygun olduğunda Tor veya güvenilir başka bir gizlilik katmanı gibi ağ düzeyinde gizlilik kullanın. Ağ gizliliği IP bağlantınızı gizleyebilir; herkese açık geçiş tutarını gizlemez.

## ZExCavator ile Derin Kurtarma

[ZExCavator](https://github.com/zingolabs/zexcavator), şu anda ZecWallet Lite cüzdan dosyalarına ve cüzdan biçimi taşımaya odaklanan, **geliştirme aşamasında** bir Zingo Labs kurtarma projesidir. README dosyası, daha kapsamlı ZeWIF desteği geliştirilirken fon kurtarma kullanıcılarını şu anda **Zingolib** dışa aktarma seçeneğine yönlendirmektedir.

Bunu varsayılan kurtarma yolu yerine gelişmiş/istisnai durumlar için bir araç olarak değerlendirin. Sıradan ZecWallet Lite tohumları, cüzdan dosyaları, zcashd `wallet.dat` ve desteklenen bağımsız harcama anahtarları için önce Argos deneyin. ZExCavator ile kurtarılan her şeyi, ona güvenmeden önce bakımı yapılan bir cüzdanda doğrulayın.

## Tohuma sahip olmadığınızda profesyonel kurtarma

Tohum veya anahtar kayıpsa, kendi barındırdığınız bir geri yükleme başlayamaz. Bu durumdaki bazı kişiler unutulmuş parolalar, donanım arızaları veya okunamayan diskler için profesyonel bir kurtarma şirketi kullanır.

Bu yol, hâlâ sahip olduğunuz bir tohumu geri yüklemekle aynı değildir. Sizin için “kurtarmayı” teklif eden hiç kimseye çalışan bir tohum vermeyin. Bu hizmetin dolandırıcılık sürümü yaygındır.

[Unciphered](https://unciphered.com), bu işi kurum içinde yapan ve [Wired](https://www.wired.com/story/unciphered-crypto-wallet-recovery/) gibi yerlerde ele alınmış şirketlerden biridir. Genel bir kripto kurtarma hizmetidir, Zcash'a özgü bir araç değildir ve çalışma için ücret alır. ZecHub herhangi bir kurtarma şirketini onaylamaz. Bu yolu seçerseniz resmî alan adını kendiniz doğrulayın ve size ilk olarak doğrudan mesaj atan herkesin dolandırıcı olduğunu varsayın.

Hâlâ çalışan bir tohum veya harcama anahtarınız varsa, bunun yerine kendi makinenizde Zkool veya Argos gibi kendi barındırdığınız bir kurtarma yoluyla başlayın.

## YWallet artık bakımı yapılmıyor

YWallet uzun süre bu sayfada önerilen kurtarma aracıydı ve birçok eski rehber hâlâ ona yönlendirmektedir.

Geliştiricisi artık YWallet'ın Ironwood güncellemesinden beri Zcash desteklemediğini belirtiyor ve Zcash kullanıcılarını bakımı sürdürülen halef olan **Zkool** uygulamasına yönlendiriyor. Eski YWallet tohum/anahtar materyalini saklayın, ancak YWallet içinde yeni bir Zcash taşımasına başlamayın.

YWallet kaynaklı Zcash kurtarma materyaliniz zaten varsa, yukarıdaki desteklenen tohum/anahtar yolunu kullanarak onu Zkool içinde geri yükleyin.

## İlgili sayfalar

- [Cüzdanlar](/using-zcash/wallets) - hangi cüzdanların bakımı yapılıyor ve Argos dâhil Ironwood hazırlıkları
- [Ironwood](/zcash-tech/ironwood) - yükseltmenin neleri değiştirdiği ve fonların neden taşındığı
- [Notlar](/using-zcash/memos) - şifreli notların nasıl çalıştığı
- [Görüntüleme Anahtarları](/zcash-tech/viewing-keys) - harcama yetkisi olmadan salt-okunur erişim
- [Hafif Cüzdan Düğümleri](/zcash-tech/lightwallet-nodes) - lightwalletd'ın kullanabileceği herkese açık Argos uç noktaları
- [Argos kullanıcı rehberi](https://argos.sovright.com/guide.html) - Sovright tarafından sunulan resmî adım adım rehber
- [Naomi Brockwell'in kurtarma araçları hakkındaki yazısı](https://x.com/naomibrockwell/status/2079146521405333526) - Argos adım adım rehberi ve profesyonel kurtarmaya ilişkin bir not
