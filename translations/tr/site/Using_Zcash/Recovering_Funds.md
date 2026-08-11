---
<a href="https://github.com/Zechub/zechub/edit/main/site/Using_Zcash/Recovering_Funds.md" target="_blank">
  <img src="https://img.shields.io/badge/Edit-blue" alt="Sayfayı Düzenle"/>
</a>

# Zcash Cüzdan Fon Kurtarma

**Özel anahtarınızı neden saklamalısınız?**

Özel anahtarlar, dijital varlıklarınızın güvenliğinin sırrıdır. Bunları güvende tutmak ve asla üçüncü taraflarla paylaşmamak çok önemlidir.

> Bu bağlamda bir **Seed Phrase**, özel anahtarın eşdeğeri olarak görülebilir.

Özel anahtarlarınızın kontrolünü elinizde tuttuğunuzda, kurtarma süreci her zaman mümkündür. Zcash özel anahtarlarının 2 türü vardır (transparent ve shielded); bunları Sweep Funds işlevini kullanarak ya da yeni bir hesap olarak içe aktararak cüzdanınıza kolayca aktarabilirsiniz. Özel anahtarlarınızın kontrolünü elinizde tutarak varlıklarınız üzerinde tam kontrol sahibi olur, mülkiyet, güvenlik ve iç huzuru sağlarsınız.

# Güvenlik ve Sorumluluk

Kullanıcıların, özel anahtarlarla uğraşmanın içerdiği riskleri anlaması ve bu anahtarları yetkisiz erişime karşı koruması kritik önem taşır. Fonların güvenliği, kullanıcının özel anahtarlarını koruma sorumluluğuna bağlıdır.

> **Başlamadan önce:** kurtarma rehberleri eskiden Ywallet'i önerirdi. Geliştiricisi, Ironwood (NU6.3) ağ yükseltmesi için güncellenmeyeceğini doğruladı; bu yüzden artık zinciri takip edemiyor. Bunun yerine, aynı geliştirici tarafından yapılan ve bakımı sürdürülen halefi olan **Zkool**'u kullanın. Bu sayfanın altındaki [Ywallet artık bakımı yapılan bir yazılım değil](#ywallet-artık-bakımı-yapılan-bir-yazılım-değil) bölümüne bakın.

## Zkool ile Fon Kurtarma

[Zkool](https://github.com/hhanh00/zkool2/releases), aynı geliştirici tarafından yapılan Ywallet'in halefidir ve hem transparent hem de shielded kurtarmayı destekler.

Burada iki durum ele alınmaktadır:

1. Bir hesabı seed phrase, özel anahtar veya viewing key ile **geri yükleme**
2. Yalnızca transparent adresleri desteklemiş bir cüzdandan fonları **süpürme**

### 1) Bir Hesabı Geri Yükleme

1. Zkool'u [sürümler sayfasından](https://github.com/hhanh00/zkool2/releases) yükleyin ve açın
2. **Account Manager**'da (ana sayfa), **New Account** ekranına gitmek için **+** düğmesine dokunun
3. Bu hesabı tanımlamak için bir **Account Name** girin
4. **Restore Account?** seçeneğini açın. Bu, anahtar ve birth height alanlarını görünür hale getirir
5. Anahtarınızı **Key (Seed Phrase, Private Key, or Viewing Key)** alanına yapıştırın. Zkool bir seed phrase, bir Sapling secret key, bir transparent extended key veya bir viewing key kabul eder
6. Cüzdanın ilk kez yaklaşık ne zaman kullanıldığını biliyorsanız bir **Birth Height** girin. Bu, Zkool'a taramaya nereden başlayacağını söyler ve çok zaman kazandırır

![Restore Account ve Advanced Options seçeneklerinin ikisi de açık olan Zkool New Account ekranı](/content-images/zkool-restore-account-60b1d2777e.webp)

> **Birth height yok mu?** Boş bırakın ve uyarıyı onaylayın. Zkool zincirin başından itibaren tarama yapar; bu daha yavaştır ama hiçbir şeyi kaçırmaz. Fonlarınız Ekim 2018'deki Sapling yükseltmesinden öncesine aitse, daha sonraki bir yüksekliği tahmin etmek yerine boş bırakın; aksi halde tarama işlemlerinizin tamamını atlayabilir.

7. Hesabı kaydedin, ardından eşitleyin

### Farklı bir cüzdandan bir seed geri yükleme

Seed başka bir cüzdandan geldiyse ve eşitlemeden sonra bakiye yanlış görünüyorsa, sebep genellikle change address türetimidir.

Aynı New Account ekranında daha aşağıda bulunan **Advanced Options** anahtarını açın ve kaydetmeden önce **Use Internal Change** seçeneğini etkinleştirin.

Tüm cüzdanlar change address'leri aynı şekilde türetmez. Bu ayar olmadan bir ZODL seed'ini Zkool'a geri yüklemek, change note'larınızı eksik gösteren bir bakiye ortaya çıkarabilir; bu kayıp fon gibi görünür ama öyle değildir. Bu anahtar için Zkool'un ipucu hâlâ ZODL'nin eski adı olan Zashi'ye atıfta bulunur.

**Advanced Options** altında iki alan daha bulunur:

- **Extra Passphrase (optional)**, yalnızca orijinal cüzdan bunu kullandıysa
- **Account Index**, eğer orijinal cüzdan tek bir seed üzerinde birkaç hesap barındırıyorsa. Fonlar farklı bir index altında olabilir

> **Bu ikisi yalnızca Key alanında geçerli bir seed phrase olduğunda görünür.** Alan boşsa ya da özel anahtar veya viewing key içeriyorsa, Zkool sadece **Use Internal Change** ve **H/W Ledger** seçeneklerini gösterir. Önce seed'i yapıştırın, sonra Advanced Options'ı açın.

### 2) Yalnızca Transparent Cüzdandan Fon Süpürme

Fonlarınız hiç shielded adres desteği sunmamış bir cüzdandaysa (Trust, Coinomi, Guarda ve benzerleri), önce hesabı geri yükleyin, ardından fonları shielded havuza taşıyın.

1. Yukarıdaki adımları kullanarak hesabı geri yükleyin
2. Hesabı açın ve **Receive Funds** sayfasına gidin
3. Üst çubuktaki büyütece dokunun (**Find other transparent addresses**). Ledger ve Exodus gibi adres döndüren cüzdanlar, tek bir seed'den çok sayıda transparent adres üretir; bu da fon tutanları bulur
4. **Sonrasında hesabı sıfırlayın ve yeniden eşitleyin.** Yeni bulunan adresler bakiyelerini ancak bir sonraki taramada alır; bu adımı atlamak, süpürmenin hiçbir şey bulmamış gibi görünmesine neden olur
5. **Send** sayfasına gidin. Bakiyenin yakınında üç simge düğmesi bulacaksınız. Metin etiketleri yoktur; bu yüzden adlarını görmek için üzerine gelin ya da uzun basın:
   - **Shield One** (çerçeveli kalkan) her seferinde tek bir transparent adresi taşır
   - **Shield All** (dolu kalkan) tüm transparent adreslerdeki her şeyi tek seferde taşır
   - **Unshield All** (açık asma kilit) ters yönde, bir transparent adrese taşır

> **Daha mahrem seçenek Shield One'dır.** Birden fazla adresi tek bir işlemde shield etmek, bunların aynı kişiye ait olduğunu herkese açık şekilde birbirine bağlar. Zkool, Shield All çalıştırılmadan önce bunu zaten kendisi uyarır.

6. İşlemi gözden geçirin ve gönderin

Unshield All, yalnızca transparent adresleri kabul eden bir borsaya çekim yaparken kullanışlıdır. Shielding düğmeleri yalnızca hesapta bir shielded adres varsa görünür; Unshield All ise yalnızca transparent bir adres varsa görünür.

## Kurtarılan fonlar ve Ironwood havuzu

Ironwood (NU6.3) yükseltmesi 28 Temmuz 2026'da etkinleştirildiğinden beri Orchard havuzu yalnızca harcama yapılabilen durumdadır. İçine yeni değer giremez ve mevcut değer turnstile üzerinden Ironwood'a çıkar.

Kurtarılan fonlarınız Orchard içindeyse, normal davranmadan önce taşınmaları gerekir. Hesap menüsünü açın ve **Note Migration** seçeneğini seçin. Bu seçenek yalnızca gerçekten taşınacak bir şey olduğunda görünür.

Ekranın başlığı **Orchard to Ironwood Migration** şeklindedir ve iki aşamada çalışır. Önce standart olmayan note'ları standart nominal değerlere böler, ardından bu note'ları teker teker taşır. **Migration Speed**, adımlar arasındaki rastgele gecikmeyi ayarlayan Ultra Fast ile Slow arasında bir kaydırıcıdır. **Start Migration**, aşamalı süreci arka planda çalıştırır; sayfayı kapatıp daha sonra devam edebilirsiniz. **One Shot** ise bunu tek geçişte yapar.

Her adım kendi işlemi olduğundan, her biri bir ücret öder.

> **Taşıma miktarları herkese açıktır.** Değer turnstile'dan geçtiğinde, gönderen ve alıcı shielded kalsa bile miktar ve blok yüksekliği zincir üzerinde görünür. Ayırt edici miktarlar sizi tanımlayabilir; bu nedenle one shot yerine daha yavaş hızda aşamalı taşıma tercih edin ve IP adresinizin taşıdığınız miktarla ilişkilendirilmemesi için bağlantınızı önce Tor veya bir VPN üzerinden yönlendirmeyi düşünün.

## ZExCavator ile Derin Kurtarma

[ZExCavator](https://github.com/zingolabs/zexcavator), normal bir geri yüklemenin işe yaramadığı, örneğin hasarlı veya kısmi bir cüzdan dosyası gibi durumlar için Zingo Labs tarafından geliştirilmiş bir kurtarma aracıdır.

> Son güncellemesi son ağ yükseltmelerinden önce yapıldı; bu yüzden bunu son çare olarak değerlendirin ve sonuca güvenmeden önce kurtarılan anahtarları bakımı sürdürülen bir cüzdanda doğrulayın.

## Ywallet artık bakımı yapılan bir yazılım değil

Ywallet uzun süre bu sayfadaki önerilen kurtarma aracıydı ve birçok eski rehber hâlâ ona işaret ediyor.

Geliştiricisi, Ironwood için güncellenmeyeceğini doğruladı. Mevcut konsensüs kurallarını desteklemeyen bir cüzdan geçerli işlemler oluşturamaz; bu nedenle artık kurtarılan fonları taşımak için kullanılamaz. Aynı geliştirici tarafından yapılan **Zkool**, bakımı sürdürülen halefidir ve bu sayfa artık onu kullanmaktadır.

Zaten Ywallet içinde duran fonlarınız varsa, aynı seed phrase'i yukarıdaki adımları kullanarak Zkool'a geri yükleyin.

## İlgili sayfalar

- [Cüzdanlar](/using-zcash/wallets) - hangi cüzdanların bakımı sürdürülüyor ve Ironwood hazırlık durumları
- [Ironwood](/zcash-tech/ironwood) - yükseltmenin neleri değiştirdiği ve fonların neden taşındığı
- [Memolar](/using-zcash/memos) - şifreli memoların nasıl çalıştığı
- [Viewing Key'ler](/zcash-tech/viewing-keys) - harcama yetkisi olmadan salt okunur erişim
