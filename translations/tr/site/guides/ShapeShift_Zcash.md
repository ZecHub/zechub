<a href="https://github.com/zechub/zechub/edit/main/site/guides/ShapeShift_Zcash.md" target="_blank">
  <img src="https://img.shields.io/badge/Edit-blue" alt="Sayfayı Düzenle"/>
</a>

# ShapeShift ve Zcash: Gizlilik Öncelikli Merkeziyetsiz Ticaret

---

## Giriş

Gizlilik ve kendi kendine saklama, kripto paranın temel ilkeleridir; yine de birçok kullanıcı kimlik doğrulaması gerektiren ve kullanıcı fonlarını elinde tutan merkezi borsalara güvenmeye devam ediyor. ShapeShift ile Zcash arasındaki entegrasyon, tamamen merkeziyetsiz bir borsa platformunu ve gizliliği koruma konusunda en gelişmiş kripto paralardan birini bir araya getirerek kullanıcılara, gizlilikten veya varlıkları üzerindeki kontrolden ödün vermeden ZEC alıp satma imkânı sunuyor.

Bu makale, ShapeShift’in ne olduğunu, Zcash’in nasıl çalıştığını, ShapeShift üzerinde ZEC’i nasıl takas edebileceğinizi ve bu ortaklığın özel, merkeziyetsiz finansın geleceği açısından neden önemli olduğunu açıklıyor.

---

## ShapeShift nedir?

[ShapeShift](https://shapeshift.com/), kullanıcıların hesap oluşturmadan, kimlik belgesi göndermeden veya fonlarının saklamasını başka bir tarafa devretmeden birden fazla blokzincir üzerinde dijital varlık alıp satmasına, takip etmesine ve yönetmesine olanak tanıyan merkeziyetsiz, açık kaynaklı bir kripto para platformudur.

### Kısa Bir Tarihçe

ShapeShift, ilk olarak 2014 yılında Erik Voorhees tarafından İsviçre merkezli merkezi bir kripto para borsası olarak kuruldu. Platform, kullanıcıların hesap oluşturmadan bir kripto parayı diğeriyle takas etmesine olanak tanıyan sade arayüzü sayesinde kısa sürede popüler oldu.

2021 yılında ShapeShift köklü bir dönüşüm geçirdi. Şirket, kurumsal yapısını feshetti ve **FOX token** sahipleri tarafından yönetilen bir **Merkeziyetsiz Otonom Organizasyon (DAO)** yapısına geçti. Bu geçişin bir parçası olarak yaklaşık 340 milyon FOX token, bir milyondan fazla kullanıcıya airdrop yoluyla dağıtıldı ve bu, kripto tarihindeki en büyük airdrop’lardan biri oldu. Bu noktadan sonra platformla ilgili tüm önemli kararlar, topluluk yönetişim teklifleri ve oylamalar aracılığıyla alınmaya başlandı.

### Temel Özellikler

- **Saklamasız**: Kullanıcılar doğrudan kendi cüzdanlarından işlem yapar. ShapeShift fonlarınızı asla elinde tutmaz.
- **KYC Gerekmez**: Kimlik doğrulaması, hesap oluşturma ve kişisel veri toplama yoktur.
- **Çoklu Zincir Desteği**: Bitcoin, Ethereum, Cosmos ve Zcash dahil 15’ten fazla blokzincirde 10.000’den fazla varlığa erişim.
- **DEX Toplayıcılığı**: ShapeShift, en iyi oranları bulmak için işlemleri THORChain, 0x ve diğerleri gibi merkeziyetsiz protokoller üzerinden yönlendirir.
- **Zincirler Arası Takaslar**: Wrapped token’lar veya merkezi köprüler kullanmadan farklı blokzincirler arasında yerel olarak varlık takası yapın.
- **Tamamen Açık Kaynaklı**: Mobil uygulama da dahil olmak üzere tüm platform, blokzincir verileri dışında özel mülkiyetli bir backend olmadan açık kaynaklıdır.

---

## Zcash Nasıl Çalışır?

[Zcash](https://z.cash/) (ZEC), kullanıcılara özel işlem yapabilme imkânı veren güçlü kriptografik temeller üzerine inşa edilmiş bir kripto paradır. 2016’da piyasaya sürülen Zcash, Bitcoin’in 21 milyon coin’lik sabit arzını ve iş ispatı mutabakatını korurken gelişmiş gizlilik teknolojisi ekleyen bir Bitcoin fork’udur.

### Shielded İşlemler ve Sıfır Bilgi Kanıtları

Zcash’in temel yeniliği, **sıfır bilgi kanıtlarını** (özellikle **zk-SNARKs** adı verilen bir türünü) kullanmasıdır. Bu kriptografik kanıtlar, bir tarafın, ifadenin doğruluğu dışında hiçbir bilgi açığa çıkarmadan başka bir tarafa bir ifadenin doğru olduğunu kanıtlamasına olanak tanır.

Pratikte bu, Zcash işlemlerinin tamamen **shielded** olabileceği anlamına gelir: gönderen adresi, alıcı adresi ve işlem tutarı blokzincir üzerinde şifrelenir. Ağ yine de işlemin geçerli olduğunu (çifte harcama olmadığını, bakiyelerin doğru olduğunu) bu ayrıntıları hiç görmeden doğrulayabilir.

### İşlem Türleri

Zcash iki tür adresi destekler:

- **Transparent adresler** (t-addresses): Bunlar, işlem ayrıntılarının blokzincir üzerinde herkese açık olduğu Bitcoin adresleri gibi çalışır.
- **Shielded adresler** (z-addresses): Bunlar, işlem ayrıntılarını gizli tutmak için sıfır bilgi kanıtlarını kullanır.

Kullanıcılar ZEC’i transparent ve shielded adresler arasında gönderebilir. Azami gizlilik için, bir shielded adresten diğerine yapılan işlemler kamuya açık olarak hiçbir bilgi ifşa etmez.

### Unified Address

[Zashi](https://electriccoin.co/zashi/) gibi modern Zcash cüzdanları, hem transparent hem de shielded alıcıları tek bir adreste birleştiren **Unified Address** kullanır. Bu, mümkün olan en yüksek gizlilik düzeyini varsayılan hâle getirirken kullanıcı deneyimini basitleştirir.

### Gizlilik Neden Önemlidir?

Finansal gizlilik, yanlış bir şeyi saklamakla ilgili değildir. Bireyleri gözetimden, şirketlerin veri toplamasından ve hedefli saldırılardan korur. Tıpkı banka hesap bakiyenizin herkes tarafından görülebilir olmasını istemeyeceğiniz gibi, kripto para işlemleri de aynı düzeyde gizliliği hak eder. Zcash bunu tasarım gereği sağlar.

---

## ShapeShift Üzerinde ZEC Nasıl Takas Edilir?

ShapeShift platformu, kullanıcıların tamamen merkeziyetsiz bir süreçle ZEC edinmesine ve ZEC alıp satmasına olanak tanır. İşte nasıl çalıştığı.

### Adım 1: ShapeShift’i Ziyaret Edin

Web tarayıcınızda [app.shapeshift.com](https://app.shapeshift.com/) adresine gidin veya ShapeShift mobil uygulamasını indirin. Hesap oluşturma ya da kimlik doğrulaması gerekmez.

### Adım 2: Cüzdanınızı Bağlayın

Uyumlu bir kendi kendine saklama cüzdanı bağlayın. ShapeShift, aşağıdakiler dahil çeşitli cüzdanları destekler:

- **KeepKey** (donanım cüzdanı)
- **MetaMask**
- **XDEFI / Ctrl Wallet**
- **Keplr** (Cosmos tabanlı varlıklar için)
- **WalletConnect uyumlu cüzdanlar**

ZEC’e takas yapıyor ya da ZEC’ten çıkıyorsanız, fonlarınızı almak için Zcash uyumlu bir cüzdanın (örneğin Zashi) hazır olduğundan emin olun.

### Adım 3: Takas Çiftinizi Seçin

Takas arayüzünü kullanarak hangi varlıktan işlem yapmak istediğinizi seçin (örneğin BTC, ETH veya bir ERC-20 token) ve hedef varlık olarak ZEC’i belirleyin. ShapeShift’in arayüzü, hem masaüstü hem mobil için optimize edilmiş, temiz ve Uniswap tarzı bir düzende tasarlanmıştır.

### Adım 4: Tutarı Girin ve Gözden Geçirin

Takas etmek istediğiniz tutarı girin. ShapeShift, işlemi mevcut en iyi merkeziyetsiz protokol üzerinden yönlendirecek (örneğin zincirler arası takaslar için THORChain) ve tahmini oranı, ücretleri ve çıkış tutarını gösterecektir.

### Adım 5: Onaylayın ve Gerçekleştirin

İşlem ayrıntılarını gözden geçirin ve onaylayın. Takas, merkeziyetsiz protokoller aracılığıyla zincir üzerinde gerçekleştirilir. ZEC’iniz belirttiğiniz adrese gönderilecektir. Hiçbir aracı, fonlarınızı elinde tutmaz.

### Adım 6: ZEC’inizi Shield Edin

ZEC’iniz ulaştıktan sonra, fonları shielded havuza taşımak için Zcash cüzdanınızdaki **shield** işlevini (Zashi gibi cüzdanlarda mevcuttur) kullanın. Bu, bakiyenizin ve gelecekteki işlemlerinizin tamamen gizli kalmasını sağlar.

### Desteklenen Zincirler Arası Çiftler

ShapeShift, aşağıdakiler dahil birden fazla blokzincir ekosisteminde ZEC takasına olanak tanır:

- **Bitcoin** (BTC) &lt;-&gt; ZEC
- **Ethereum** (ETH) &lt;-&gt; ZEC
- **Arbitrum** varlıkları &lt;-&gt; ZEC
- **Cosmos** ekosistemi token’ları &lt;-&gt; ZEC

---

## Bu Entegrasyon Neden Önemli?

### DeFi’de Gizliliği Geri Kazanmak

Çoğu merkeziyetsiz borsa, gizliliği sonradan düşünülmüş bir unsur olarak ele alır. Örneğin Ethereum tabanlı DEX’lerde işlemler tamamen şeffaftır: herkes cüzdan geçmişinizi, token bakiyelerinizi ve işlem kalıplarınızı izleyebilir. ShapeShift-Zcash entegrasyonu, shielded ZEC’e merkeziyetsiz ve KYC gerektirmeyen bir platform üzerinden erişim sağlayarak bu normu sorguluyor.

ShapeShift’in büyüme ve topluluk workstream lideri Houston Morgan’ın dediği gibi: *"Gizlilik korkutucu olmamalı, ancak merkezi borsalarda ZEC alıp satmak çoğu zaman öyledir. Yapılarının ve hukuki risklerinin doğası gerçek gizliliği öldürüyor."*

### Delist’ten Varsayılan Olana

Geçmiş, bu entegrasyonu daha da önemli kılıyor. 2020’de ShapeShift hâlâ merkezi bir şirketken, düzenleyici baskılar nedeniyle Zcash dahil **gizlilik coin’lerini delist etti**. DAO yapısına geçiş, ShapeShift’i bu kısıtlamalardan kurtardı. Artık topluluk tarafından yönetilen bir protokol olarak ShapeShift, Zcash’i yalnızca yeniden listelemekle kalmadı, onu gizlilik stratejisinin merkezî bir parçası hâline getirdi.

Aralık 2025’te **ShapeShift v4.0**’ın yayımlanmasıyla birlikte Zcash, platformun **birincil gizlilik koruyucu ödeme ve yönlendirme varlığı** oldu. Gizlilik artık isteğe bağlı bir eklenti değil, varsayılan bir özellik olarak konumlandırılıyor; ZEC, ShapeShift’in cüzdanına ve yönlendirme altyapısına doğrudan entegre edilmiş durumda.

### Zcash Community Grants Desteği

[Zcash Community Grants](https://zcashcommunitygrants.org/) programı, ShapeShift’in Zcash entegrasyonuna yönelik teknik altyapı ve pazarlama çalışmalarını desteklemek için **50.000 $** tahsis etti. Bu finansman, ShapeShift ekibinin 90’dan fazla blokzinciri destekleyen bir Web3 altyapı sağlayıcısı olan **Liquify** ile ortaklık kurmasına yardımcı oldu; böylece daha hızlı yürütme ve daha iyi ağ güvenilirliği için remote procedure call (RPC) uç noktaları yönetilebildi.

### Merkeziyetsiz Finansı İlerletmek

Bu entegrasyon, gizlilik ile merkeziyetsizliğin DeFi’de birlikte çalışabileceğini gösteriyor. Kullanıcılar şunları yapabilir:

- **Takas yapmak**: Varlıkları merkezi aracılar olmadan zincirler arasında takas etmek
- **Süreç boyunca fonlarının tam kontrolünü korumak**: Fonlarının tüm süreç boyunca tamamen kendi saklamalarında kalmasını sağlamak
- **Shielded ZEC’e erişmek**: KYC veya veri toplama olmadan
- **Yönetişime katılmak**: Platformun geleceğini şekillendirmek için FOX token aracılığıyla

Dünya genelinde düzenleyici ortamlar sıkılaşırken ve AB gibi bölgeler gizliliği koruyan teknolojilere yönelik kısıtlamaları değerlendirirken, ShapeShift gibi platformlar finansal gizlilik için önemli bir alternatif altyapı sunuyor.

---

## Özet

| Özellik | Ayrıntılar |
|---|---|
| **Platform** | ShapeShift DAO (merkeziyetsiz, açık kaynaklı) |
| **Yönetişim** | FOX token sahipleri |
| **Zcash Desteği** | Shielded işlem desteğiyle tam ZEC ticareti |
| **KYC Gerekli mi?** | Hayır |
| **Saklama** | Saklamasız (kullanıcılar kendi anahtarlarını tutar) |
| **Zincirler Arası Takaslar** | BTC, ETH, Arbitrum, Cosmos ve daha fazlası |
| **Altyapı** | Liquify tarafından desteklenmektedir (90+ blokzincir RPC desteği) |
| **Zcash Community Grants Finansmanı** | Teknik ve pazarlama desteği için 50.000 $ |

ShapeShift ve Zcash entegrasyonu, merkeziyetsiz finansta gizlilik açısından anlamlı bir ileri adımdır. ShapeShift’in saklamasız, çoklu zincirli ticaret altyapısını Zcash’in sıfır bilgi kanıtı teknolojisiyle birleştirerek kullanıcılar gerçekten özel, izinsiz kripto para ticaretine erişim kazanır. Finansal gizliliğe ve bireysel egemenliğe değer veren herkes için bu entegrasyon, taviz vermeden ZEC kullanmanın pratik ve erişilebilir bir yolunu sunuyor.

---

### Kaynaklar

[ShapeShift Platformu](https://shapeshift.com/)

[Zcash Resmî Web Sitesi](https://z.cash/)

[Zashi Cüzdanı (Electric Coin Co. tarafından)](https://electriccoin.co/zashi/)

[ShapeShift DAO Yönetişimi (FOX Token)](https://shapeshift.com/fox-token)

[Zcash Community Grants](https://zcashcommunitygrants.org/)

[ShapeShift, zincir üstü gizliliği güçlendirmek için Zcash’i entegre ediyor (crypto.news)](https://crypto.news/shapeshift-integrates-zcash-to-enable-true-onchain-privacy/)

[ShapeShift, DeFi’de gizlilik ve kendi kendine saklamayı yeniden merkeze alan v4.0’ı tanıttı (Invezz)](https://invezz.com/news/2025/12/18/shapeshift-unveils-version-4-0-re-centering-privacy-and-self-custody-in-defi/)

[ShapeShift, gerçek gizlilik için shielded Zcash işlemlerine destek sunuyor (CoinTelegraph)](https://cointelegraph.com/news/shapeshift-rolls-out-support-for-shielded-zcash-transactions-for-true-privacy)
