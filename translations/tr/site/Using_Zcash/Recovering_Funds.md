<a href="https://github.com/Zechub/zechub/edit/main/site/Using_Zcash/Recovering_Funds.md" target="_blank">
  <img src="https://img.shields.io/badge/Edit-blue" alt="Sayfayı düzenle"/>
</a>

# Zcash Cüzdan Fonlarını Kurtarma

**Kurtarma materyalinizi neden saklamalısınız?**

Kurtarma ifadeleri, harcama anahtarları, görüntüleme anahtarları ve cüzdan dosyaları birbirinin yerine kullanılamaz. Bir kurtarma ifadesi, birçok cüzdan için cüzdan anahtarları türetebilir; ancak tüm eski anahtarların veya cüzdan dosyalarının yerini tutmaz. Bir görüntüleme anahtarı korumalı etkinlikleri açığa çıkarabilir, ancak harcamaya yetki veremez.

Kurtarma, doğru harcama yetkisine ve fonları tutan havuz için hâlen desteklenen bir yönteme sahip olmanıza bağlıdır. Kurtarma materyallerinizi gizli tutun ve kurtarma ifadelerini, harcama anahtarlarını veya cüzdan dosyalarını güvenmediğiniz kişilerle asla paylaşmayın.

# Güvenlik ve Sorumluluk

Kullanıcıların özel anahtarlarla işlem yapmanın içerdiği riskleri anlaması ve bu anahtarları yetkisiz erişime karşı koruması çok önemlidir. Fonların güvenliği, kullanıcının özel anahtarlarını koruma sorumluluğuna bağlıdır.

## Eski korumalı fonlar: Sprout, Sapling ve Orchard

Eski korumalı ZEC, kurtarma sürecinin bir parçası olarak taşınmayı gerektirebilir. İzlenecek yol, fonların şu anda hangi korumalı havuzda bulunduğuna bağlıdır.

> **NU7, Mainnet'te 6 Kasım 2026'da (UTC), 3.543.405 numaralı blokta etkinleştirildi.** Sürüm 4 işlemlerini ([ZIP 2003](https://zips.z.cash/zip-2003)) devre dışı bırakır ve Sprout fonları yalnızca sürüm 4 işlemlerinde harcanabildiğinden, eski Sprout havuzundan çıkış için kullanılan taşıma yolu artık çalışmıyor.
>
> **Sprout artık buzda donmuş durumda.** Mevcut araçlar artık Sprout fonlarını Sapling havuzuna, şeffaf adreslere veya başka bir hedefe taşıyamıyor. ZIP 2003, Sprout fonlarını yakmaz ve gelecekte bir kurtarma yönteminin geliştirilmesi olasılığını açık bırakır; ancak şu anda böyle bir yöntem planlanmıyor. Sprout anahtarlarına sahipseniz onları güvende tutun.

## Yanıt tek sayfada

| Fonlarınızın bulunduğu yer | Taşıma yolu | Yapmanız gereken |
| --- | --- | --- |
| **Sprout** | **Sprout → Sapling → Ironwood** | `wallet.dat` veya bağımsız bir Sprout harcama anahtarınız varsa önce mevcut Argos kurtarma yolunu deneyin. Argos uygun değilse kapsamlı saha kılavuzundaki eski sidecar yolunu kullanın. Sprout önce Sapling havuzuna ulaşmalı, ardından Ironwood havuzuna taşınmalıdır. NU7 etkinleştirildiğinden (3.543.405 numaralı blok), Sprout fonları Mainnet'te taşınamaz; yukarıdaki nota bakın. |
| **Sapling** | **Sapling → Ironwood** | Sprout kurtarma ortamı gerekmez. Belirli Sapling hesabınızı kurtarabilen veya harcama yapabilen ve Ironwood işlemleri oluşturabilen güncel bir cüzdan kullanın. Yalnızca Ironwood desteği, eski Sapling kurtarma desteği olduğunu kanıtlamaz. |
| **Orchard** | **Orchard → Ironwood** | Orchard yalnızca çıkış için kullanılabilir. Güncel, uyumlu bir cüzdanın yerleşik Orchard-Ironwood taşıma akışını kullanın. [Kurtarılan fonlar ve Ironwood havuzu](#recovered-funds-and-the-ironwood-pool) bölümüne bakın. |

### Beş soruluk karar akışı

1. **Sprout mı?** Yalnızca bir kurtarma ifadesine sahip olmanız, Sprout yerine daha sonraki Sapling/Orchard dönemi kurtarma yolunu işaret eder. `zc...` adresi veya geri yüklenen bir cüzdanda görünen Sprout bakiyesi, Sprout havuzunu işaret eder.
2. **Hangi kurtarma materyaline sahipsiniz?** `wallet.dat`, eski bilgisayar veya veri dizinini, bir `z_exportwallet` yedeğini ya da dışa aktarılmış bir Sprout harcama anahtarını arayın. Tek başına bir `zc...` adresi yeterli değildir.
3. **Argos mı, eski sidecar mı?** `wallet.dat` veya bağımsız bir Sprout harcama anahtarınız varsa ve yalnızca fonları dışarı çıkarmak istiyorsanız önce [Argos](#zecwallet-lite-and-legacy-wallet-recovery-with-argos) yolunu deneyin. Argos materyali işleyemiyorsa veya tüm kurtarma yığınını kendi kontrolünüz altında tutmak istiyorsanız kapsamlı saha kılavuzundaki eski sidecar yolunu kullanın.
4. **Zaten eşitlenmiş, budanmamış bir zcashd veri dizininiz var mı?** Bu yalnızca eski sidecar yolu için önemlidir. Mevcut düğüm verilerini yalnızca düzgün bir kapatmanın ardından kopyalayın; aksi hâlde saha kılavuzunda anlık görüntü ve sıfırdan kurulum seçenekleri açıklanmaktadır.
5. **Fonlar nereye ulaşacak?** **Ironwood.** Doğrudan tek bir Sprout-Ironwood işlemi olmadığından Sprout önce Sapling havuzundan geçer. Sapling havuzunda durmayın.

### Kapsamlı ZEC Havuzu Taşıma Saha Kılavuzu

Ayrıntılı kurtarma yolları, komutlar, ücretler, donanım gereksinimleri, gizlilik değerlendirmeleri, sorun giderme ve kaynak notları dâhil olmak üzere eksiksiz taşıma referansı için kapsamlı kılavuzu okuyun.

**Sürüm 1.1 · 18 Eylül 2026'da güncellendi**

[ZEC Havuzu Taşıma Saha Kılavuzunun tamamını ZecHub](/research/zec-pool-migration/view) adresinde okuyun

> **Başlamadan önce:** Önce **neyi kurtardığınızı ve elinizde hâlâ hangi kurtarma materyallerinin bulunduğunu** belirleyin. Güncel bir cüzdan kurtarma ifadesi veya desteklenen, Sprout olmayan bir harcama anahtarı için yalnızca standart bir geri yükleme gerekebilir. Zecwallet Lite kurtarma ifadesi, eski bir `wallet.dat` veya bağımsız bir Sapling ya da Sprout harcama anahtarı gibi eski materyaller için özel bir kurtarma yolu gerekebilir.
>
> Fonların **Sprout** havuzunda olduğunu düşünüyorsanız kurtarmaya zaman ayırmadan önce hâlâ harcama yetkiniz olduğunu doğrulayın. Tek başına bir `zc...` adresi veya görüntüleme materyali, fonları taşımaya yetmez.
>
> **YWallet, Ironwood sonrasında Zcash desteği sunmuyor.** Desteklenen kurtarma ifadeleri ve anahtarlarla yapılan sıradan, Sprout olmayan geri yüklemeler için **Zkool** kullanın. Zecwallet Lite kurtarma, eski cüzdan dosyaları ve bağımsız Sapling/Sprout harcama anahtarları için **Argos** kullanın. Sprout için ilk denenmesi gereken yol Argos seçeneğidir; kapsamlı saha kılavuzunda eski sidecar yedek yolu açıklanmaktadır.
>
> Aşağıdaki tabloda, hatırladığınız kurtarma aracını değil, **gerçekte elinizde ne olduğunu** temel alın.

| Elinizde olan | Buradan başlayın |
| --- | --- |
| Güncel veya yakın zamanda bakımı yapılmış bir cüzdandan kurtarma ifadesi ya da desteklenen **Sprout olmayan harcama anahtarı**; buna eski YWallet Zcash materyali de dâhildir | [Zkool](#fund-recovery-with-zkool) |
| Yalnızca **görüntüleme anahtarı** | Zkool, salt okunur erişim için desteklenen görüntüleme anahtarlarını içe aktarabilir; ancak görüntüleme anahtarı kurtarma amacıyla harcama yetkisi veremez. İlgili kurtarma ifadesini veya harcama anahtarını bulun. |
| 24 kelimelik bir **Zecwallet Lite** kurtarma ifadesi | [Argos](#zecwallet-lite-and-legacy-wallet-recovery-with-argos) |
| Bir Zecwallet Lite veya zcashd `wallet.dat` ya da bağımsız bir Sapling / Sprout harcama anahtarı | [Argos](#zecwallet-lite-and-legacy-wallet-recovery-with-argos). 18 Eylül 2026 itibarıyla v1.3.0 güncel ve önerilen sürümdür; `wallet.dat` ve Sprout kurtarması için v1.2.0 veya daha yenisini kullanın. |
| Argos tarafından işlenemeyen Sprout materyali veya eski bileşenleri kendi kontrolünüz altında tutmak istediğiniz bir kurtarma işlemi | [Kapsamlı saha kılavuzundaki](/research/zec-pool-migration/view) eski sidecar yolunu kullanın. |
| Çalışan bir kurtarma ifadesi veya harcama anahtarı yok, ancak kilitli bir cihaz, unutulmuş bir parola ya da arızalı bir disk var | [Profesyonel kurtarma](#professional-recovery-when-you-do-not-have-the-seed). Çalışan bir kurtarma ifadesini veya harcama anahtarını, sizden habersiz şekilde sizinle iletişime geçen birine asla göndermeyin. |

## Zkool ile Fon Kurtarma

[Zkool](https://github.com/hhanh00/zkool2/releases), aynı geliştiricinin YWallet uygulamasının bakımı yapılan Zcash halefidir. Eski Sapling anahtarları dâhil olmak üzere şeffaf ve modern korumalı kurtarma yollarını destekler, ancak **Sprout desteği sunmaz**.

Burada iki durum ele alınmaktadır:

1. Bir kurtarma ifadesinden, özel anahtardan veya görüntüleme anahtarından **hesap geri yükleme**
2. Yalnızca şeffaf adresleri desteklemiş bir cüzdandaki fonları **süpürme**

### 1) Hesap Geri Yükleme

1. Zkool uygulamasını [indirme sayfasından](https://github.com/hhanh00/zkool2/releases) yükleyin ve açın
2. **Account Manager** (ana sayfa) ekranında **New Account** ekranına geçmek için **+** düğmesine dokunun
3. Bu hesabı tanımlamak için bir **Account Name** girin
4. **Restore Account?** seçeneğini açın. Böylece anahtar ve doğum yüksekliği alanları görünür
5. Anahtarınızı **Key (Seed Phrase, Private Key, or Viewing Key)** alanına yapıştırın. Zkool kurtarma ifadelerini, Sapling gizli anahtarlarını, şeffaf genişletilmiş anahtarları ve desteklenen görüntüleme anahtarlarını kabul eder. Görüntüleme anahtarı salt okunurdur ve harcamaya yetki veremez.
6. Eski bir hesap için **Birth Height** girin. Zkool bu yükseklikten önceki blokları taramaz; bu nedenle emin değilseniz cüzdanın ilk etkinliğinden daha erken bir yükseklik seçin. Çok geç bir doğum yüksekliği, gerçek işlemlerin görünmemesine yol açabilir.

![Zkool yeni hesap ekranı: “Restore Account” ve “Advanced Options” seçenekleri açık](/content-images/zkool-restore-account-60b1d2777e.webp)

7. Hesabı kaydedin ve eşitleyin

### Farklı bir cüzdandaki kurtarma ifadesini geri yükleme

Kurtarma ifadesi ZIP 316 standardını izleyen bir cüzdandan geldiyse — ZODL (eski adıyla Zashi), Zingo veya zcashd dâhil — kaydetmeden önce **Advanced Options** seçeneğini açın ve **Use Internal Change** seçeneğini etkinleştirin.

ZIP 316, ayrı bir dahili/değişiklik adresi kullanır. Bu hesaplardan birini **Use Internal Change** seçeneği olmadan geri yüklemek, fonlar hâlâ mevcut olsa bile değişiklik çıktılarının görünmemesine yol açabilir.

**Advanced Options** altında iki alan daha bulunur:

- **Extra Passphrase (optional)**, yalnızca orijinal cüzdanda kullanıldıysa
- **Account Index**, orijinal cüzdanda tek bir kurtarma ifadesi altında birden fazla hesap varsa. Fonlar farklı bir dizinde olabilir

> **Bu iki seçenek yalnızca Key alanında geçerli bir kurtarma ifadesi varsa görünür.** Alan boşsa veya özel ya da görüntüleme anahtarı içeriyorsa Zkool yalnızca **Use Internal Change** ve **H/W Ledger** seçeneklerini gösterir. Önce kurtarma ifadesini yapıştırın, ardından Advanced Options seçeneğini açın.

### 2) Yalnızca Şeffaf Cüzdandaki Fonları Süpürme

Eski cüzdan veya hesapta yalnızca **şeffaf ZEC** varsa önce hesabı geri yükleyin, kullanılmış tüm şeffaf adresleri bulun ve ardından fonları kontrolünüzdeki güncel bir korumalı hedefe taşıyın. Eski bir cüzdan markasının her zaman yalnızca şeffaf adresleri desteklediğini varsaymayın; bazı ürünler daha sonraki sürümlerde korumalı desteği ekledi.

1. Yukarıdaki adımları kullanarak hesabı geri yükleyin
2. Hesabı açın ve **Receive Funds** sayfasına gidin
3. Üst çubuktaki büyütece dokunun (**Find other transparent addresses**). Ledger ve Exodus gibi adresleri değiştiren cüzdanlar tek bir kurtarma ifadesinden birçok şeffaf adres üretir; bu seçenek fon bulunan adresleri bulur
4. **Ardından hesabı sıfırlayın ve eşitleyin.** Yeni bulunan adresler bakiyelerini ancak sonraki taramada alır; bu adımı atlarsanız süpürme işlemi hiçbir şey bulmamış gibi görünür
5. **Send** sayfasına gidin. Bakiyenin yanında üç simge düğmesi bulunur. Üzerlerinde metin etiketi yoktur; adlarını görmek için üzerlerine gelin veya basılı tutun:
   - **Shield One** (çizgili kalkan), her seferinde bir şeffaf adresi taşır
   - **Shield All** (dolu kalkan), tüm şeffaf adreslerdeki her şeyi aynı anda taşır
   - **Unshield All** (açık asma kilit), ters yönde, şeffaf bir adrese taşır

> **Shield One daha gizli bir seçenektir.** Birden fazla adresi tek işlemde korumalı hâle getirmek, bunların aynı kişiye ait olduğunu herkese açık şekilde ilişkilendirir. Zkool, Shield All çalıştırılmadan önce bu konuda kendisi de uyarır.

6. İşlemi gözden geçirin ve gönderin

Unshield All, yalnızca şeffaf adres kabul eden bir borsaya para çekerken kullanışlıdır. Koruma düğmeleri yalnızca hesapta korumalı bir adres varsa, Unshield All ise yalnızca şeffaf bir adres varsa görünür.

## Zecwallet Lite ve Argos ile eski cüzdan kurtarma

[Zecwallet Lite](https://github.com/adityapk00/zecwallet-lite) artık bakımı yapılmayan bir uygulamadır ve deposu arşivlenmiştir. Kurtarma ifadesi türetme yöntemi, güncel cüzdanların kullandığı düzenden farklıdır; bu nedenle aynı ifadeyi modern bir cüzdana aktarmak, Zecwallet Lite uygulamasının türettiği ek adreslerde tutulan fonları bulamayabilir. Sovright tarafından geliştirilen [Argos](https://argos.sovright.com), bu ve diğer eski kurtarma durumları için oluşturulmuş bir masaüstü kurtarma çalışma alanıdır.

Argos, Zecwallet Lite kurtarma ifadelerini ve cüzdan dosyalarını, zcashd `wallet.dat` değerlerini, bağımsız Sapling genişletilmiş harcama anahtarlarını ve Sprout harcama materyallerini okur. Sprout için tek başına bir Zecwallet Lite kurtarma ifadesi yeterli değildir; bu anahtarlar ayrı olarak oluşturulmuştur. Argos günlük kullanım cüzdanı değil, bir kurtarma aracıdır: kaynak materyalleri yerel olarak inceleyin, tarayın ve ardından kontrolünüzdeki bakımı yapılan bir cüzdana süpürün.

Least Authority aracı [denetledi](https://argos.sovright.com/assets/least-authority-argos-audit-2026-06-29.pdf). Kurtarma işleminin kendisi ücretsizdir. Süpürme sırasında isteğe bağlı olarak Sovright kuruluşuna bağış seçeneği gösterilebilir.

> **Kurtarma ifadesini asla bir web sitesine yazmayın.** Argos sitesi yalnızca indirme bağlantısını ve [kullanım kılavuzunu](https://argos.sovright.com/guide.html) sağlar. Anahtarlar imzalı masaüstü uygulamasında kalır. Doğrulama, BIP-39 sağlama toplamına göre yerel olarak yapılır. Tarama başladığında kurtarma ifadesi alanı temizlenir. “Fonlarınızı kurtarmanıza yardım etmek” için bu ifadeyi isteyen herkes sizi dolandırmaya çalışıyordur.

### Argos uygulamasını açmadan önce

1. Masaüstü uygulamasını [resmî Argos sitesinden](https://argos.sovright.com) veya [GitHub sürümler sayfasından](https://github.com/sovright/argos/releases) indirin. Yayımlandıklarında sağlama toplamlarını veya imzaları doğrulayın.
2. Güncel Argos sürümünü kullanın. 18 Eylül 2026 itibarıyla **v1.3.0** güncel ve tercih edilen sürümdür. **`wallet.dat` ve Sprout kurtarma işlemleri için v1.2.0 veya üstünü kullanın**. 1.1.0'dan eski derlemeler yine de tarama yapabilir ancak ağın reddettiği, Ironwood öncesi taramalar oluşturur; güncelleyin ve yeniden deneyin.
3. Güvendiğiniz bir makinede çalışın. Tam disk şifrelemesini tercih edin. Kurtarma ifadesi, parola veya harcama anahtarı görünür durumdayken ekranınızı paylaşmayın.
4. Kontrolünüzdeki bakımı sürdürülen bir cüzdandan, örneğin [ZODL](https://zodl.com/), hedef Birleşik Adresi hazır bulundurun. Argos içine yapıştırmadan önce adresi o cüzdanda doğrulayın.

### Kurtarma ifadesiyle kurtarma

1. Argos uygulamasını açın ve **I have my 24-word seed phrase** seçeneğini belirleyin. Kurtarma ifadesiyle kurtarma için cüzdan dosyası gerekmez.
2. İfadeyi yapıştırın ve **Validate seed** düğmesine tıklayın. İfadenin geçerli olduğunu belirten iletiyi görürseniz devam edin.
3. **Birthday block height** değerini veya cüzdanın oluşturulduğu zamana dair en yakın tahmini girin. Daha erken bir yükseklik daha yavaştır, ancak çok geç bir değer tahmin etmekten daha güvenlidir.
4. Sunucu denetimlerinde güncel sunucu ön ayarını kullanın veya lightwalletd URL'lerini girin. Virgülle ayrılmış URL'ler sırayla denenir. Herkese açık örnekler:

   `https://zec.rocks:443,https://zec-node.cakewallet.com:443,https://na.zec.rocks:443`

5. Hedef Birleşik Adresi yapıştırın.
6. **start scan** düğmesine tıklayın. Doğum yüksekliğine bağlı olarak bu işlem dakikalar veya günler sürebilir. Aynı çalışma alanını kapatıp yeniden açabilirsiniz; tarama kaldığı yerden devam eder.
7. Tarama tamamlandığında bakiyeleri, ücret tahminini ve hedefi gözden geçirin, ardından **sweep** düğmesine tıklayın.

Süpürme işlemini ağa yayınlamak geri alınamaz. İlgili tüm havuzlardaki fonlar taşınana ve hedef cüzdan beklenen fonları gösterene kadar orijinal cüzdan dosyasını saklayın. Kurtarma tamamlandığında eski gizli bilgileri yeni etkinlikler için kullanmaya devam etmek yerine kullanımdan kaldırın.

### Cüzdan dosyaları ve bağımsız anahtarlar

Karşılama ekranındaki **I have a wallet file** seçeneği bir Zecwallet Lite dosyasını, bir zcashd `wallet.dat` dosyasını veya bağımsız Sapling genişletilmiş harcama anahtarlarını kapsar. Bağımsız Sprout harcama anahtarı kurtarma işlemi, Argos uygulamasının Sprout kurtarma yolu/CLI arayüzü üzerinden yapılır.

Argos, cüzdan dosyalarını değiştirmeden okur. Cüzdan şifrelenmişse istendiğinde parolayı girin; parola bellekte kullanılır ve diske yazılmaz. Taramayı başlatmadan önce şeffaf, Sapling ve Sprout anahtarlarının sayılarını gözden geçirin.

Görüntüleme anahtarları harcamaya yetki veremediğinden süpürme için kabul edilmez.

### Sprout notları

Bir Zecwallet Lite kurtarma ifadesi Sprout anahtarlarını türetmez. Bu anahtarlar ayrı olarak oluşturulmuştur. Sprout fonlarını bir zcashd `wallet.dat` dosyasından veya CLI içindeki bağımsız bir harcama anahtarından kurtarın.

Dosyada zaten harcanabilir note verileri ve önbelleğe alınmış bir tanık varsa Argos, Zincir taraması yapmadan **Sprout fonlarını süpür** seçeneğini sunabilir. Aksi hâlde P2P ağı üzerinden devam ettirilebilir, tam blok taraması yapabilir. Bu tarama büyük ve yavaştır. Yazdığı kontrol noktası harcama yetkisi içerdiğinden orijinal cüzdan gibi koruyun.

Sprout değeri yalnızca Sapling havuzuna ulaşabilir. Sapling fonları onaylanıp harcanabilir hâle geldikten sonra, kurtarılan Sapling hesabını destekleyen güncel bir cüzdanla **Ironwood** havuzuna taşıyın. Sapling havuzunda durmayın.

## Kurtarılan fonlar ve Ironwood havuzu

Ironwood (NU6.3) yükseltmesi 28 Temmuz 2026'da etkinleştirildiğinden beri Orchard havuzu yalnızca harcama amacıyla kullanılabilir. Bu havuza yeni değer giremez; mevcut değer ise turnike üzerinden Ironwood havuzuna çıkar.

Kurtarılan fonlarınız Orchard havuzundaysa, **güncel bir cüzdanın yerleşik taşıma akışını** kullanarak Ironwood havuzuna taşıyın. Orchard, NU6.3 sonrasında yalnızca çıkış için kullanılabilir.

Zkool 6.37.0, 12 Kasım 2026 itibarıyla günceldir ve Ironwood desteği sunar. 6.35.0 veya daha yenisini kullanın: daha eski sürümler NU7 uygulamasının Mainnet etkinleştirme yüksekliğini (3.543.405 numaralı blok) bilmediğinden, NU7 öncesi kurallara göre ([zkool2#1388](https://github.com/hhanh00/zkool2/pull/1388)) işlemler oluşturur. Taşıma tasarımı gizlilik odaklıdır, ancak ZIP 318 standardına uygunluk iddiasıyla aynı şey değildir. Diğer güncel cüzdanlar ZIP 318 tarzında aşamalı taşıma kullanabilir. Elle miktar veya takvim belirlemek yerine yüklediğiniz cüzdanın güncel taşıma ekranını ve sürüm notlarını izleyin.

Aşamalı taşıma birden fazla işlem gerektirebilir; bu nedenle toplam ücret tek seferlik bir aktarıma kıyasla daha yüksek olabilir.

> **Taşıma tutarları herkese açıktır.** Değer turnikeden geçerken, gönderen ve alıcı korumalı kalmasına rağmen tutar ve blok yüksekliği Zincir üzerinde görünür. Gizlilik önemliyse cüzdanın yerleşik özel/aşamalı taşıma politikasını kullanın; uygun olduğunda Tor veya güvenilir başka bir gizlilik katmanı gibi ağ düzeyinde gizlilik önlemlerinden yararlanın. Ağ gizliliği IP bağlantınızı gizleyebilir; herkese açık geçiş tutarını gizlemez.

## ZExCavator ile Derin Kurtarma

[ZExCavator](https://github.com/zingolabs/zexcavator), şu anda Zecwallet Lite cüzdan dosyalarına ve cüzdan biçimi taşımaya odaklanan, **geliştirme aşamasında** bir Zingo Labs kurtarma projesidir. README dosyası, daha kapsamlı ZeWIF desteği geliştirilmeye devam ederken fonlarını kurtarmak isteyen kullanıcılara **Zingolib** dışa aktarma seçeneğini öneriyor.

Bunu varsayılan kurtarma yolu olarak değil, ileri düzey/özel durumlara yönelik bir araç olarak değerlendirin. Standart Zecwallet Lite kurtarma ifadeleri, cüzdan dosyaları, zcashd `wallet.dat` ve desteklenen bağımsız harcama anahtarları için önce Argos seçeneğini deneyin. ZExCavator ile kurtarılan her şeyi güvenmeden önce bakımı yapılan bir cüzdanda doğrulayın.

## Kurtarma ifadesi elinizde olmadığında profesyonel kurtarma

Kurtarma ifadesi veya anahtar kaybolduysa kendi barındırdığınız bir geri yükleme işlemini başlatamazsınız. Bu durumda bazı kişiler unutulmuş parolalar, donanım arızaları veya okunamayan diskler için profesyonel kurtarma şirketlerinden yararlanır.

Bu yol, hâlâ elinizde olan bir kurtarma ifadesini geri yüklemekle aynı değildir. Çalışan bir kurtarma ifadesini, sizin için “kurtaracağını” söyleyen hiç kimseye vermeyin. Bu hizmetin dolandırıcılık amaçlı olanları yaygındır.

[Unciphered](https://unciphered.com) bu işi kendi bünyesinde yapan ve Wired gibi yayınlarda yer almış şirketlerden biridir. Genel bir kripto kurtarma hizmetidir, Zcash özelinde bir araç değildir ve yaptığı iş için ücret alır. ZecHub herhangi bir kurtarma şirketini desteklemez. Bu yolu seçerseniz resmî alan adını kendiniz doğrulayın ve ilk olarak size doğrudan mesaj atan herkesi dolandırıcı kabul edin.

Hâlâ çalışan bir kurtarma ifadeniz veya harcama anahtarınız varsa bunun yerine kendi makinenizde Zkool veya Argos gibi, kendi barındırdığınız bir kurtarma yolunu kullanmaya başlayın.

## YWallet uygulamasının bakımı artık yapılmıyor

YWallet uzun süre bu sayfada önerilen kurtarma aracıydı ve birçok eski kılavuz hâlâ ona yönlendiriyor.

Geliştiricisi artık YWallet güncellemesinden beri Ironwood için Zcash desteği sunmadığını belirtiyor ve Zcash kullanıcılarını bakımı yapılan halefi **Zkool** uygulamasına yönlendiriyor. Eski YWallet kurtarma ifadesi/anahtar materyallerini saklayın, ancak YWallet içinde yeni bir Zcash taşıma işlemi başlatmayın.

YWallet uygulamasından kalan Zcash kurtarma materyalleriniz varsa yukarıda açıklanan desteklenen kurtarma ifadesi/anahtar yolunu kullanarak bunları Zkool içinde geri yükleyin.

## İlgili sayfalar

- [Cüzdanlar](/using-zcash/wallets) - hangi cüzdanların sürdürüldüğü ve Ironwood hazırlık durumu, Argos dâhil
- [Ironwood](/zcash-tech/ironwood) - yükseltmenin neleri değiştirdiği ve fonların neden taşındığı
- [Memolar](/using-zcash/memos) - şifrelenmiş memoların nasıl çalıştığı
- [Görüntüleme anahtarları](/zcash-tech/viewing-keys) - harcama yetkisi olmadan salt okunur erişim
- [Hafif cüzdan düğümleri](/zcash-tech/lightwallet-nodes) - kullanıcıların kullanabileceği herkese açık lightwalletd uç noktaları Argos
- [Argos kullanıcı kılavuzu](https://argos.sovright.com/guide.html) - Sovright tarafından hazırlanan resmî anlatım
- [Naomi Brockwell’in kurtarma araçları hakkındaki yazısı](https://x.com/naomibrockwell/status/2079146521405333526) - Argos anlatımı ve profesyonel kurtarma hakkında bir not
