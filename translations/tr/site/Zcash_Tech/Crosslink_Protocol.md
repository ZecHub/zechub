<a href="https://github.com/zechub/zechub/edit/main/site/Zcash_Tech/Crosslink_Protocol.md" target="_blank">
  <img src="https://img.shields.io/badge/Edit-blue" alt="Sayfayı Düzenle"/>
</a>

# Crosslink Protocol

## Kısaca

* Crosslink protokolü, Zcash'in hibrit Proof-of-Work/Proof-of-Stake (PoW/PoS) aşaması için önerilen bir tasarımdır. PoW'u Bizans Hata Toleransı (BFT) protokolüyle entegre eder ve PoW veya PoS'tan biri güvenli kaldığı sürece garantili kesinlik sağlar.
* Hibrit PoS, stake edilen ZEC'e göre blokları doğrulayan noterleri devreye sokar; başlangıçta statiktir, daha sonra stake edilen ZEC'e göre seçilirler.
* Crosslink, iki defter sunmayı hedefler: geri alma güvenliği için **kesinleşmiş defter (LOG_fin)** ve onu en fazla *L* blok kadar genişleten **daha düşük gecikmeli defter (LOG_ba)**.
* **Güvenlik Modu**, kesinleşmiş defter *L* bloktan fazla geride kalırsa devreye girer: PoW devam eder, ancak sorun çözülene kadar ekonomik faaliyetler duraklatılır.
* Zamanla PoS doğrulayıcıları ödüllerden giderek daha büyük bir pay alacak, PoW madencilerinin gelirleri azalacaktır; protokol değişiklikleri kademeli olarak sunar.
* Protokol, Crosslink 2*'yi Zcash'in Zebra istemcisine entegre etmeye yönelik bir yol haritasıyla birlikte Shielded Labs tarafından geliştirilmektedir.

## Temel Açıklama

### Giriş: Zcash Hibrit PoS ve Crosslink Protocol

Crosslink Protocol, Zcash'in evriminde önemli bir gelişmedir ve onu **Hibrit Proof-of-Stake (PoS)** ile **Proof-of-Work (PoW)** modeline yönlendirir. Geleneksel PoW, ağ güvenliğini sağlama konusunda güvenilir olsa da, enerji tüketimi ve endüstriyel madenciliğe bağlı merkezileşme riskleri nedeniyle eleştirilir. Crosslink, PoW'un kendini kanıtlamış sağlamlığını PoS'un verimlilik ve yönetişim avantajlarıyla birleştiren hibrit bir sistem sunar.

![image](/content-images/a2ffb19d-e570-4723-b669-a66e14fc6b71-a727c958de.webp)

Bu geçiş, projelerin çevresel açıdan sürdürülebilir ve merkeziyetsiz mekanizmalara yöneldiği blokzincir inovasyonundaki küresel eğilimlerle uyumludur. Crosslink'in çift uzlaşı modeli, Zcash'in güçlü kriptografik gizlilik garantilerini korurken güncel zorluklara uyum sağlayarak gelişmesini garanti eder.

Hibrit Proof-of-Stake (PoS) yaklaşımı, geleneksel Proof-of-Work (PoW) ile PoS'u birleştirerek merkeziyetsizliği korurken ve enerji tüketimini azaltırken %51 saldırıları gibi zafiyetleri ele almayı amaçlar. Hibrit PoS, stake edilen ZEC'e göre blokları doğrulayan noterleri devreye sokar. Bu mekanizma, zincir güvenliğini ve kontrol noktası doğrulamasını iyileştirmek için tasarlanmıştır ve yalnızca PoW sistemlerine göre daha güçlü bir alternatif sunar.

### İlk test olarak neden Hibrit PoS/PoW?

* Saf PoS'a doğru ilerleme sağlar.
* Eşzamanlı madencilik ve staking kullanım senaryolarını ve ekosistemler arası geçişi mümkün kılar.
* PoS protokolü daha fazla doğrulayıcı stake'ine ve güvene ulaşana kadar olası güvenlik sorunlarını hafifletir.
* Genel yaklaşım, Ethereum tarafından Production ortamında gösterilmiştir.

### Crosslink nedir

Crosslink protokolü, Zcash'in hibrit Proof-of-Work/Proof-of-Stake (PoW/PoS) aşaması için önerilen bir tasarımdır. PoW'u Bizans Hata Toleransı (BFT) protokolüyle entegre eder ve PoW veya PoS'tan biri güvenli kaldığı sürece garantili kesinlik sağlar. Tasarım, madenci katılımını sürdürürken stake tabanlı doğrulamayı dahil ederek ağ güvenliğini ve merkeziyetsizliği güçlendirmeyi amaçlar. Crosslink 2 adı verilen teklifin temel bir özelliği, BFT önericileri ile madencileri birleştirerek mimariyi basitleştirmesidir. Bu sadeleştirilmiş yaklaşım, yapısal değişiklikleri en aza indirir ve "dummy" bir BFT katmanının kullanılmasına olanak tanır; böylece yüksek güvenlik standartları korunurken prototipleme ve dağıtım daha kolay hale gelir.

Uygulama planı, Crosslink 2*'yi Zcash'in Zebra istemcisine entegre etmeye yönelik tahmini mühendislik maliyetlerini içeren bir yol haritası içerir. Bu aşamalı dağıtım, paydaş teşviklerini dengelemeye, kesintiyi azaltmaya ve Zcash'in ölçeklenebilirlik, kullanılabilirlik ve merkeziyetsizlik hedefleriyle uyum sağlamaya odaklanır. Protokolün güçlü güvenlik özelliklerine duyulan artan güven, onun Zcash'in evriminde önemli bir adım olma potansiyelini daha da pekiştirir. Crosslink, enerji verimliliğini ele alıp uzlaşı mekanizmalarını geliştirerek gelişen blokzincir zorluklarına ileriye dönük bir çözüm sunar. Daha fazla ayrıntı için [GitHub deposuna](https://github.com/ShieldedLabs/crosslink-deployment) ve [Zcash Community Forum](https://forum.zcashcommunity.com)'a bakın.

### Crosslink'in Amaçları ve Hedefleri

Crosslink Protocol, Zcash'in geleceği için kritik olan birkaç stratejik hedefi ele almak üzere tasarlanmıştır:

1. **Merkeziyetsizlik**:
   * PoS'u dahil ederek Zcash, madencilik gücünü çoğu zaman birkaç büyük operatör arasında yoğunlaştıran özelleşmiş PoW donanımına (ASIC'ler) bağımlılığı azaltır.
   * PoS, coin sahiplerinin ağı güvence altına almak için varlıklarını stake ettiği daha geniş bir topluluğun katılımına izin vererek daha dağıtık bir uzlaşı sağlar.
   * Stake tabanlı doğrulamayı devreye sokarak protokol, ekonomik katılımcıların uzlaşıda aktif rol oynamasını sağlar ve yalnızca madenciliğe olan bağımlılığı azaltır.
2. **Geliştirilmiş Yönetişim**:
   * Coin sahipleri staking yoluyla oy hakkı kazanır; böylece ağ yükseltmeleri, fon tahsisleri ve ekosistem öncelikleriyle ilgili kararları etkileyebilirler. Bu demokratik mekanizma, protokolün evrimini topluluk çıkarlarıyla uyumlu hale getirir.
3. **Enerji Verimliliği**:
   * Kısmen PoS'a geçiş, enerji gereksinimlerini önemli ölçüde azaltır ve Zcash'i küresel sürdürülebilirlik girişimleriyle uyumlu hale getirir. PoS, hesaplama açısından ağır olan PoW'a kıyasla doğası gereği daha az kaynak yoğundur. Hibrit sistemler, yüksek güvenliği korurken yalnızca PoW kullanan sistemlere göre enerji kullanımını azaltmayı amaçlar.
4. **Ekonomik Güvenlik ve Sürdürülebilirlik**:
   * PoW ve PoS'u birleştirmek, ağ katılımcıları için ekonomik teşvikleri çeşitlendirir ve tek bir mekanizmaya aşırı bağımlılık olmadan güçlü güvenlik sağlar.
   * Staking ayrıca katılımcılar için öngörülebilir bir ödül modeli sunarak uzun vadeli yatırımcılar için cazip bir öneri oluşturur.
5. **Artan Güvenlik**: Crosslink, PoW'un yanında PoS'u entegre ederek zincir yeniden düzenleme saldırılarına karşı ağın dayanıklılığını artırmayı amaçlar.

## Görsel / Analoji

![image](/content-images/b34afda4-fe33-448f-b0dd-279fd6cef1f5-73f58cdcc6.webp)

Aynı teslimat için iki farklı belge düzenleyen bir kargo hizmeti düşünün. İlki bir takip taramasıdır: hızla görünür, paketin büyük olasılıkla nerede olduğunu söyler ve ara sıra düzeltilir. İkincisi ise imzalı bir teslim alındı belgesidir: daha sonra gelir, ancak bir kez oluştuğunda kimse buna itiraz etmez.

Daha düşük gecikmeli defter, takip taramasıdır; kesinleşmiş defter ise imzalı alındı belgesidir. İkisi de aynı olay zincirini tanımlar; farkları, ne kadar hızlı ortaya çıktıkları ve ne kadar sağlam olduklarıdır.

Güvenlik Modu, imzalı alındılar gelmeyi bırakırken taramalar birikmeye devam ettiğinde deponun yaptığı şeydir. Paketler bina içinde hareket etmeyi sürdürür, ancak imzalar yetişene kadar ofis yalnızca taramalara dayanarak ödeme yapmayı durdurur.

## Derinlemesine İnceleme

### Crosslink'in Güvenlik ve Performans Hedefleri

Crosslink protokolü, Zcash için iki tür defter sunmayı amaçlar: **kesinleşmiş defter (LOG_fin)** ve **daha düşük gecikmeli defter (LOG_ba)**. Kesinleşmiş defter, Bizans Hata Toleransı (BFT) veya blokzincir (BC) protokolünden biri hakkında makul varsayımlar altında geri alma güvenliği sağlar. Ağ bölünmeleri sırasında bile canlı ve güvenli kalacak şekilde tasarlanmıştır; eşdeğer blok onayları için gecikmesi mevcut Zcash blokzincirinin gecikmesinin iki katından biraz fazladır.

Daha düşük gecikmeli defter, kesinleşmiş defteri en fazla *L* blok kadar genişletir. Yalnızca blokzincir protokolü altında geri alma güvenliği sağlar ve mevcut Zcash modelinden daha kötü olmayan gecikme ve güvenliği korur. Sadeleştirilmiş Crosslink 2* tasarımında, daha düşük gecikmeli defter PoW zinciri olarak işlev görerek geliştirme ve benimsemeyi basitleştirir.

![image](/content-images/fd039664-4852-4fb0-8c88-0615f1ed116e-41459b81dc.webp)

### Sınırlı Kullanılabilirlik ve Güvenlik Modu

Crosslink, daha düşük gecikmeli defterin kesinleşmiş defterin çok ilerisinde çalışmasıyla ilişkili riskleri ele almak için bir **Güvenlik Modu** içerir. Bu, hizmet sağlayıcıların geçici çözümlerindeki dengesiz hesap durumları veya doğrulanmamış güvenlik açıkları gibi tutarsızlıkları önler. Güvenlik Modu, kesinleşmiş defter sabit *L* bloktan fazla geride kalırsa etkinleştirilir. Bu durumda blokzincir PoW işlemlerini sürdürür (temel güvenliği sağlayarak), ancak ekonomik faaliyetler sorun çözülene kadar duraklatılır. Bu mekanizma, yönetişim temelli geri alma politikalarını desteklerken büyük saldırılar gibi olağanüstü koşullardan toparlanmak üzere tasarlanmıştır.

### Teknik Ayrıntılar ve Dağıtım

Crosslink Protocol, Zodl gibi önemli ekosistem ortaklarıyla iş birliği içinde Shielded Labs tarafından aktif olarak geliştirilmekte ve dağıtılmaktadır. Protokolün uygulanması şunları içerir:

* PoS katılımcıları için güvenli staking mekanizmalarının oluşturulması.
* Madenciler ve stake edenler arasındaki teşvikleri dengelemek için ödül yapısının değiştirilmesi.
* Geçiş sırasında geriye dönük uyumluluğun ve sorunsuz bir kullanıcı deneyiminin sağlanması.
* Noter Sistemi: Protokol, blokları onaylayan noterleri içerir. Başlangıçta statik noterler kullanılır, ardından noterlerin stake edilen ZEC'e göre seçildiği dinamik bir sisteme geçilir.
* Etkinleştirme Mantığı: Crosslink'in devreye girmesi, stake dağıtım sürecinin tanımlanması ve hibrit uzlaşıyı desteklemek için ağ protokol kurallarının güncellenmesi dahil olmak üzere Zcash uzlaşı kurallarında değişiklikler gerektirir.
* Aşamalı Dağıtım: Ağ istikrarını ve topluluğun uyumunu sağlamak için protokol aşamalar halinde devreye alınacaktır. İlk aşamalar teknik uygulamaya odaklanır; bunu noterlerin seçimi için yönetişim entegrasyonu izler.

Teknik ayrıntıları inceleyebilir ve ilerlemeyi [GitHub'daki Crosslink Deployment Repository](https://github.com/ShieldedLabs/crosslink-deployment) üzerinden takip edebilirsiniz.

## Pratik Sonuçlar

### PoW Madencilerinin Gelirine Etkisi

Crosslink, Zcash'in erken gelişiminde PoW madencilerinin temel rolünü kabul ederken kademeli bir değişime hazırlanır:

* **Azalan Blok Ödülleri**:
  * Zamanla PoS doğrulayıcıları ödüllerden giderek daha büyük bir pay alacak ve PoW madencilerinin kazançları azalacaktır. Bu yeniden dağıtım, hibrit modelde PoW'un azalan rolünü yansıtır.
* **Adil Geçiş**:
  * Protokol değişiklikleri kademeli olarak sunar ve madencilerin uyum sağlaması ya da staking'e geçmek veya diğer ağ hizmetlerine katkıda bulunmak gibi Zcash ekosistemi içinde yeni roller keşfetmesi için yeterli zaman tanır.
* **Merkezileşme Risklerini Azaltma**:
  * PoS staking havuzları, gücün yoğunlaşmasını önleyecek şekilde tasarlanmıştır ve daha küçük oyunculara eşit şartlarda katılma fırsatı sunar. Bu kapsayıcı yaklaşım, ASIC tabanlı madencilikte görülen mevcut yoğunlaşmaya karşı bir denge oluşturur.
* PoW madencileri, blok ödülünün bir kısmı PoS doğrulayıcılarına yeniden tahsis edildiği için gelirlerinde azalma yaşayacaktır. Bu yeniden tahsis, hem madencileri hem de stake edenleri ağı güvence altına aldıkları için ödüllendiren dengeli bir teşvik sistemi sağlar.
* Madenciler üzerindeki ekonomik etkiyi azaltırken paydaş katılımını teşvik etmek için kademeli bir geçiş planlanmaktadır.

Bu çift uzlaşı mekanizması, Zcash'in gizlilik, sürdürülebilirlik ve merkeziyetsizlik konularındaki taahhüdünü güçlendirerek onu blokzincir alanında ileriye dönük bir lider olarak konumlandırır.

## Yaygın Hatalar

**Crosslink'i aktif bir uzlaşı kuralı olarak okumak**. Bu sayfa, aşamalı bir dağıtım planına sahip önerilen bir tasarımı açıklar. Bunun devreye alınması, yol haritasının ve Zebra entegrasyon çalışmasının da amacı olan Zcash uzlaşı kurallarında değişiklikler gerektirir.

**PoS'un madenciliğin yerini aldığını varsaymak**. Crosslink hibrit bir tasarımdır: PoW blok üretimi, stake tabanlı doğrulamayla birlikte devam eder. Güvenlik Modu'nda bile ekonomik faaliyetler duraklatılırken blokzincir PoW işlemlerini sürdürür.

**"Kesinlik"i daha hızlı onay olarak görmek**. Kesinleşmiş defter, eşdeğer blok onayları için mevcut Zcash blokzincirinin gecikmesinin iki katından biraz fazla bir gecikmeyle tasarlanmıştır. Bunun eklediği şey hız değil, geri alma güvenliğidir; hızlı görünüm daha düşük gecikmeli defterdir.

**İki defteri karıştırmak**. LOG_ba ayrı bir zincir değildir: kesinleşmiş defteri en fazla *L* blok kadar genişletir ve Crosslink 2* tasarımında PoW zinciri olarak işlev görür.

## İlgili Sayfalar

- [Zebra Full Node](/zcash-tech/zebra-full-node) — Crosslink 2*'nin entegre edilmesinin planlandığı istemci.
- [Full Nodes](/zcash-tech/full-nodes) — herhangi bir hibrit uzlaşı değişikliğinden önce, düğümlerin bugün uzlaşı kurallarını nasıl doğruladığı.
- [Network Upgrades](/start-here/network-upgrades) — uzlaşı kuralı değişikliklerinin Zcash ağına nasıl ulaştığı.
- [Zcash Monetary Policy](/start-here/zcash-monetary-policy) — Crosslink'in yeniden dağıtacağı blok ödülü yapısı.

## Ek Kaynaklar

- Topluluk içgörüleri: [Zcash Community Forum - Crosslink Tartışmaları](https://forum.zcashcommunity.com)
- Resmi güncellemeler: [Electric Coin Company Blogu](https://electriccoin.co)
- Sürdürülebilirlik odağı: [Hibrit PoS Zcash için Neden Önemli?](https://forum.zcashcommunity.com)

  Referans:

<div className="my-8 w-full aspect-video max-w-3xl mx-auto rounded-2xl overflow-hidden shadow-lg bg-black">
     <iframe
       className="w-full h-full"
       src="https://www.youtube.com/embed/O4wQi_i7k0I"
       title="Crosslink"
       allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
       allowFullScreen
       loading="lazy"
     />
</div>
