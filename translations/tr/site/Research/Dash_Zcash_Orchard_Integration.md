---
---
published: 2026-04-14
---

<a href="https://github.com/zechub/zechub/edit/main/site/Research/Dash_Zcash_Orchard_Integration.md" target="_blank">
  <img src="https://img.shields.io/badge/Edit-blue" alt="Sayfayı Düzenle"/>
</a>

# Dash'in Zcash Orchard Entegrasyonu



## Giriş

Şubat 2026'da Dash ağı, Zcash'in Orchard shielded pool'unun Dash Evolution zincirine entegre edildiğini duyurdu. Bu, kripto para alanındaki en önemli zincirler arası gizlilik iş birliklerinden birine işaret etti; çünkü Dash, mevcut CoinJoin tabanlı gizlilik modelini tamamlamak için Zcash'in en ileri düzey sıfır bilgi kriptografisini benimsedi. Bu entegrasyon, Zcash'in gizlilik teknolojisinde lider konumunu doğruluyor ve zincirler arası gizlilik iş birliği için yeni bir sayfa açıyor.

Bu makale Orchard protokolünün ne olduğunu, Dash'in bunu nasıl uyguladığını, neden her iki ekosistem için de önemli olduğunu ve daha geniş gizlilik coin'i ekosistemi açısından neye işaret ettiğini açıklıyor.


## Zcash Orchard Protokolü Nedir?

Orchard, Zcash'in en gelişmiş shielded pool'udur ve 2022 ortasında Network Upgrade 5 (NU5) ile etkinleştirilmiştir. Electric Coin Company (ECC) ve Zcash topluluğunda yıllar süren kriptografik araştırmaların doruk noktasını temsil eder.

### Temel Teknoloji: Halo 2

Orchard, Rust ile yazılmış yüksek performanslı bir zk-SNARK uygulaması olan **Halo 2** ispat sistemi üzerine inşa edilmiştir. Halo 2 iki büyük yenilik getirdi:

- **Trusted Setup Yok**: Zcash'in önceki shielded pool'ları (Sprout ve Sapling), kriptografik parametreleri üretmek için çok taraflı hesaplama törenlerine dayanıyordu. Eğer bu törenlerde kullanılan gizli rastgelelik ("toxic waste") uygun şekilde yok edilmezse, teorik olarak sahte shielded token'lar oluşturmak için kullanılabilirdi. Halo 2, **nested amortization** adı verilen bir teknik sayesinde bu gereksinimi tamamen ortadan kaldırır; bu teknik, eliptik eğri döngüleri üzerinde zor problemlerin birden fazla örneğini bir araya çökertir, böylece hesaplamalı ispatlar kendileri hakkında akıl yürütebilir.

- **Özyinelemeli İspat Bileşimi**: Tek bir ispat, pratikte sınırsız sayıdaki başka ispatın doğruluğunu tasdik edebilir ve büyük miktarda hesaplamayı kompakt, doğrulanabilir bir biçime sıkıştırır. Bu, ölçeklenebilirlik ve gelecekteki yükseltmeler için kritik önemdedir.

### Orchard Gizliliği Nasıl Çalışır?

Geleneksel bir blockchain işleminde gönderici, alıcı ve miktarın tamamı zincir üzerinde görünürdür. Bir Orchard shielded işleminde ise sıfır bilgi ispatları matematiksel olarak şunları garanti eder:

- İşlemin geçerli olduğunu (girdiler çıktılara eşittir, yoktan token oluşturulmaz)
- Göndericinin yeterli bakiyeye sahip olduğunu
- Çifte harcama gerçekleşmediğini

Tüm bunlar, fonları kimin gönderdiğini, kimin aldığını veya ne kadar transfer edildiğini **açıklamadan** doğrulanır. Dash CTO'su Samuel Westrich'in ifade ettiği gibi, sıfır bilgi ispatları işlemlerin izlerini karıştırma yoluyla belirsizleştirmek yerine, "başlangıçta iz diye bir şey olmamasını" sağlar.

### Actions Girdi ve Çıktıların Yerini Alıyor

Orchard, geleneksel girdi/çıktı modelinin yerine **Actions** kavramını getirdi. Her bir Action, bir harcama ile bir çıktıyı tek pakette birleştirir; bu da sızan işlem meta verisi miktarını azaltır. Böylece gözlemcilerin shielded işlemler üzerinde trafik analizi veya sezgisel saldırılar yapması daha zor hale gelir.


## Dash Evolution Chain Nedir?

Entegrasyonu anlamak için Dash'in mimarisini anlamak önemlidir.

### Çift Zincirli Mimari

Dash, çift zincirli bir sistemle çalışır:

- **Dash Core (Katman 1)**: Madenciler ve masternode'lar tarafından güvence altına alınan özgün proof-of-work blockchain'i. Yerel DASH token'ının bulunduğu ve CoinJoin gizlilik karıştırmasının çalıştığı yer burasıdır.

- **Dash Evolution (Platform Katmanı)**: Core ile birlikte inşa edilmiş, akıllı sözleşme işlevselliğini, merkeziyetsiz uygulamaları ve kimlik yönetimini destekleyen ikincil bir zincir. Evolution, **Tenderdash** adı verilen değiştirilmiş bir Tendermint uzlaşma mekanizması kullanır ve her iki zinciri de aynı anda güvence altına alan Evolution Masternode'ları tarafından doğrulanır.

Orchard entegrasyonunun gerçekleştiği yer Evolution zinciridir. Bu tasarım tercihi, Dash'in kanıtlanmış Core zincirini değiştirmeden gelişmiş kriptografik gizliliği sunmasına olanak tanır.


## Entegrasyon Nasıl Çalışıyor?

### Teknik Mimari

Dash, Zcash'in açık kaynaklı Orchard Rust crate'ini fork'ladı ve bunu Evolution zinciri için uyarladı. Entegrasyon, **protected credit pool** yapısını izliyor:

1. **Kilitleme**: Kullanıcılar DASH varlıklarını Dash Core üzerinde kilitler
2. **Basım**: Evolution zincirinde sabitlenmiş "Credits" token'ları basılır
3. **Transfer**: Credits, Orchard'ın sıfır bilgi ispatları kullanılarak anonim şekilde transfer edilebilir; gönderici, alıcı ve miktar tamamen shielded olur
4. **Yakma**: Core üzerindeki temel DASH varlıklarını geri almak için token'lar Evolution üzerinde yakılır

Bu model, Core ve Evolution zincirleri arasında iki yönlü bir peg'e benzer, ancak Evolution tarafındaki işlemler için tam sıfır bilgi gizliliği sunar.

### Aşamalı Yaygınlaştırma

Entegrasyonun iki aşamada hayata geçirilmesi planlanıyor:

**Aşama 1 (Mart 2026, siber güvenlik denetimlerine bağlı olarak):**
- Evolution zincirinde Orchard shielded pool'larının devreye alınması
- Taraflar arasında Dash Credits'in temel shielded transferlerinin desteklenmesi
- Mainnet aktivasyonundan önce bağımsız güvenlik denetimlerinin tamamlanması

**Aşama 2 (Sonraki yükseltmeler):**
- Orchard'ın gizlilik özelliklerinin Evolution üzerinde ihraç edilen **tokenlaştırılmış gerçek dünya varlıklarına (RWA'lar)** genişletilmesi
- Platformdaki DeFi ve akıllı sözleşme etkileşimleri için gizliliği koruyan işlemlerin etkinleştirilmesi
- Sıfır bilgi shielded yapısının yalnızca yerel para birimine değil, her türlü token tipine getirilmesi

### Mobil Senkronizasyon

Sıfır bilgi gizlilik sistemleri için tarihsel olarak zorlayıcı kullanılabilirlik engellerinden biri, mobil cihazlarda yavaş senkronizasyon olmuştur. Dash ekibi, Evolution mimarisinin **shielded verilerin mobilde daha hızlı senkronizasyonunu** mümkün kılabileceğini belirtti; bu da günlük kullanıcılar için anlamlı bir iyileşme olurdu. Bu çalışma şu anda doğrulanıyor.


## Bu Neden Önemli: CoinJoin ve Orchard Karşılaştırması

### Dash'in Mevcut Gizliliği: CoinJoin

Dash geleneksel olarak gizliliği **CoinJoin** aracılığıyla sundu; bu, gözetimsiz bir karıştırma mekanizmasıdır. CoinJoin, birden fazla kullanıcının işlem girdilerini ve çıktılarını tek bir işlemde birleştirerek gözlemcilerin hangi girdilerin hangi çıktılara karşılık geldiğini izlemesini zorlaştırır (ama imkânsız hale getirmez).

CoinJoin'ın sınırlamaları vardır:

- **İsteğe bağlı**: Kullanıcılar Dash Core cüzdanında karıştırmayı manuel olarak etkinleştirmelidir
- **Şifreleme değil, belirsizleştirme**: İşlem izleri zincir üzerinde hâlâ mevcuttur; yalnızca takip edilmeleri daha zordur
- **Analize açık**: Yeterli kaynak ve veri ile, zincir analizi firmaları bazı CoinJoin işlemlerini anonimlikten çıkarabildiklerini göstermiştir
- **Sınırlı anonimlik kümesi**: Sağlanan gizlilik, aynı anda karıştırma yapan diğer kullanıcıların sayısına bağlıdır

### Orchard'ın Niteliksel İlerlemesi

Orchard, gizliliğe temelden farklı bir yaklaşımı temsil eder:

- **Kriptografik garantiler**: Gizlilik, kalabalık davranışıyla değil matematikle uygulanır
- **İz yok**: Gönderici, alıcı ve miktar zincire hiçbir zaman düz metin olarak yazılmadığı için analiz edilecek işlem izleri yoktur
- **Daha büyük shielded küme**: Tüm Orchard işlemleri ortak bir shielded pool'u paylaşır, bu da anonimlik kümesini büyütür
- **Trusted setup yok**: Halo 2 ispat sistemi, geriye kalan tüm güven varsayımlarını ortadan kaldırır

Bu entegrasyon, Dash Core üzerindeki CoinJoin'ın yerini almıyor. Bunun yerine Orchard, Evolution zincirinde **tamamlayıcı bir kriptografik katman** sunarak Dash kullanıcılarına CoinJoin'ın hafif karıştırması ile sıfır bilgi ispatlarının matematiksel gizliliği arasında seçim yapma imkânı veriyor.


## Bunun Zcash İçin Anlamı

Dash entegrasyonu, Zcash ekosistemi için önemli sonuçlar doğuruyor.

### Zcash Teknolojisinin Doğrulanması

Başka büyük bir kripto para projesi Zcash'in kriptografik yığınını benimsediğinde, bu durum teknolojinin olgunluğu, güvenliği ve tasarım kalitesi için dış doğrulama işlevi görür. Dash Core Group CTO'su Samuel Westrich şunları söyledi:

> "2014'teki ilk makalelerden beri kişisel olarak ZK ispat teknolojisi ve bunun blockchain'deki kullanımlarıyla ilgileniyorum. Yıllar boyunca Zcash'i yakından takip ettik. Orchard crate'inin en son sürümüyle, teknolojiyi daha yeni Evolution zincirimize eklemeyi araştırmak için iyi bir zaman olduğunu düşündük."

Ayrıca "Orchard açık kaynaklı ve olgun; entegrasyonu beklediğimizden daha kolay oldu" diye ekledi.

### Ekosistem Genişlemesi

Orchard crate'i MIT ve Apache 2.0 açık kaynak lisansları altında yayımlanmıştır. Başka bir proje tarafından yapılan her entegrasyon, Zcash'in kriptografik yapı taşlarının kullanıcı tabanını genişletir, kod tabanına aşina geliştirici sayısını artırır ve potansiyel olarak Zcash'in kendisine fayda sağlayacak upstream iyileştirmelere yol açar.

### Zincirler Arası Tanınırlık

Dash'in Halo 2 ve Orchard kullanan projeler arasına katılması, Zcash'i Halo 2 teknolojisini benimsemiş veya araştırmış Filecoin, Ethereum ve çoklu zkRollup çözümleri gibi projelerle aynı çizgiye yerleştiriyor. Büyüyen bu ekosistem, Zcash'in gizlilik araştırmaları etrafındaki ağ etkilerini güçlendiriyor.

### Bir Gizlilik Standardı Olarak Zcash

Bu entegrasyon, Zcash teknolojisini blockchain gizliliği için yükselen bir **endüstri standardı** olarak konumlandırıyor; tıpkı TLS'in web şifrelemesinde standart haline gelmesi gibi. Rakip projeler kendi çözümlerini geliştirmek yerine Zcash'in araçlarını benimsemeyi tercih ettiğinde, bu alttaki bilimin kalitesi ve güvenilirliği hakkında çok şey söyler.


## Gizlilik Odaklı Kripto Paralara Daha Geniş Etkisi

### Gizlilik Anlatısı

Bu entegrasyon, kripto para sektöründe gizlilik teknolojisine ilginin arttığı bir dönemde geldi. Finansal gözetim konusundaki farkındalığın artması ve işlemsel gizliliğin değerinin daha iyi anlaşılmasıyla, 2026'nın başlarında gizlilik coin'leri %80'in üzerinde yükselişler gördü.

### Düzenleyici Bağlam

Bu entegrasyon aynı zamanda gizlilik token'ları üzerindeki düzenleyici baskının arttığı bir arka planda gerçekleşiyor. Ocak 2026'da Dubai Finansal Hizmetler Otoritesi (DFSA), düzenlenmiş kripto borsalarının ZEC ve XMR dahil gizlilik token'larını yeni kullanıcılara satmasını yasakladı. Yasak vatandaşların bu token'ları elinde tutmasını engellemese de, kullanıcı gizliliği ile düzenleyici uyumluluk arasındaki gerilimi vurguluyor.

Dash-Orchard gibi zincirler arası gizlilik entegrasyonları, düzenleyicilerin gizlilik teknolojisine nasıl baktığını etkileyebilir. Gizlilik özelliklerinin herhangi bir blockchain tarafından modüler bileşenler olarak benimsenebilmesi, belirli token'ları yasaklamanın altta yatan teknolojiyle doğrudan ilgilenmekten daha az etkili olabileceğini gösteriyor.

### Gelecekteki Ortaklıklar

Dash entegrasyonu, diğer blockchain projeleri için bir emsal oluşturuyor. Orchard farklı uzlaşma mekanizmalarına ve mimariye sahip bir zincirde başarıyla devreye alınabiliyorsa, bu Zcash'in gizlilik teknolojisinin gerçekten taşınabilir olduğunu gösterir. Bu da ekosistem genelinde daha fazla benimsemeyi teşvik edebilir; bunlar arasında şunlar yer alabilir:

- Gizlilik özellikleri arayan Layer-2 ağları
- Kullanıcı işlem verilerini shielded hale getirmek isteyen DeFi protokolleri
- Gizli transferler gerektiren gerçek dünya varlık platformları
- Düzenleyici uyumlu gizliliğe ihtiyaç duyan kurumsal blockchain'ler


## Sonuç

Zcash'in Orchard protokolünün Dash'in Evolution zincirine entegrasyonu, zincirler arası gizlilik iş birliğinde bir dönüm noktasını temsil ediyor. Dash için bu, CoinJoin'ın belirsizleştirme modelinden Orchard'ın kriptografik gizlilik garantilerine niteliksel bir sıçrama anlamına geliyor. Zcash için ise Halo 2 ve Orchard shielded pool üzerine yapılan yıllar süren araştırmanın, başka büyük projelerin de benimseyebileceği kadar sağlam ve olgun bir teknoloji ürettiğini teyit ediyor.

Daha da önemlisi, bu entegrasyon kripto parada gizliliğin projeler arasında sıfır toplamlı bir rekabet olmadığını gösteriyor. Açık kaynak gizlilik teknolojisi, daha geniş benimsemeden, daha kapsamlı incelemeden ve ortak geliştirmeden fayda sağlar. Zcash'in Orchard'ı blockchain ekosistemine yayıldıkça, tüm alan finansal gizliliğin istisna değil varsayılan olduğu bir geleceğe biraz daha yaklaşıyor.


## İleri Okuma

- [Halo 2 Dokümantasyonu](https://zcash.github.io/halo2/)
- [Zcash Orchard Crate'i (GitHub)](https://github.com/zcash/orchard)
- [Halo 2 GitHub Deposu](https://github.com/zcash/halo2)
- [Dash Evolution Platform Dokümantasyonu](https://docs.dash.org/en/stable/)
- [Cointelegraph: Dash, Zcash Gizlilik Havuzunu Entegre Ediyor](https://cointelegraph.com/news/dash-integrates-z-cash-orchard-privacy)
- [HackerNoon: Dash, Shielded İşlemler İçin Zcash Orchard Gizliliğini Evolution Chain'e Getiriyor](https://hackernoon.com/dash-brings-zcash-orchard-privacy-to-evolution-chain-for-shielded-transactions)
