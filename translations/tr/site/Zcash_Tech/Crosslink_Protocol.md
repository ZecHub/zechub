<a href="https://github.com/zechub/zechub/edit/main/site/Zcash_Tech/Crosslink_Protocol.md" target="_blank">
  <img src="https://img.shields.io/badge/Edit-blue" alt="Sayfayı düzenle"/>
</a>

# Crosslink Protokolü

## Özet

* Crosslink protokolü, Zcash'ın hibrit İş Kanıtı/Stake Kanıtı (PoW/PoS) aşaması için önerilen bir tasarımdır. PoW'yi Bizans Hata Toleransı (BFT) protokolüyle birleştirerek, PoW veya PoS güvenli kaldığı sürece kesin kesinlik sağlar.
* Hibrit PoS, stake edilmiş ZEC temelinde blokları doğrulayan noterleri sisteme dahil eder — başlangıçta noterler statiktir, daha sonra stake edilmiş ZEC temelinde seçilirler.
* Crosslink iki defter sunmayı amaçlar: geri alma güvenliği sağlayan **kesinleştirilmiş defter (LOG_fin)** ve onu en fazla *L* blokla genişleten **daha düşük gecikmeli defter (LOG_ba)**.
* Kesinleştirilmiş defter *L* bloktan fazla geride kalırsa **Güvenlik Modu** etkinleşir: PoW devam eder, ancak sorun çözülene kadar ekonomik faaliyetler duraklatılır.
* Zamanla PoS doğrulayıcıları ödüllerin giderek artan bir payını alacak ve PoW madencilerinin kazançları azalacaktır; protokol değişiklikleri kademeli olarak devreye sokar.
* Protokol Shielded Labs tarafından geliştirilmektedir. Crosslink 2*'yi Zcash'ın Zebra istemcisine entegre etmek için bir yol haritası bulunmaktadır.
* Crosslink, Zcash ana ağında etkin değildir. Herkesin katılabileceği bir test ağı olan Shielded Labs' Feature Net üzerinde çalışır. Aşağıdaki “Crosslink ne durumda?” bölümüne bakın.

## Temel Açıklama

### Giriş: Zcash Hibrit PoS ve Crosslink Protokolü

Crosslink Protokolü, Zcash evriminde dönüm noktası niteliğinde bir gelişmedir ve onu **Hibrit Stake Kanıtı (PoS)** ile **İş Kanıtı (PoW)** modeline yönlendirir. Geleneksel PoW, ağ güvenliğini sağlamada güvenilir olsa da enerji tüketimi ve endüstriyel madencilikle ilişkili merkezileşme riskleri nedeniyle eleştirilir. Crosslink, PoW'nin kanıtlanmış sağlamlığını PoS'nin verimlilik ve yönetişim avantajlarıyla birleştiren hibrit bir sistem sunar.

![image](/content-images/a2ffb19d-e570-4723-b669-a66e14fc6b71-a727c958de.webp)

Bu geçiş, projelerin çevresel açıdan sürdürülebilir ve merkeziyetsiz mekanizmalara yöneldiği blokzincir yeniliklerindeki küresel eğilimlerle uyumludur. Crosslink'in ikili konsensüs modeli, çağdaş zorluklara uyum sağlarken Zcash'ın güçlü kriptografik gizlilik güvencelerini korumasını sağlar.

Hibrit Stake Kanıtı (PoS) yaklaşımı, %51 saldırıları gibi güvenlik açıklarını gidermeyi, aynı zamanda merkeziyetsizliği korumayı ve enerji tüketimini azaltmayı amaçlayarak geleneksel İş Kanıtı'nı (PoW) PoS ile birleştirir. Hibrit PoS, stake edilmiş ZEC temelinde blokları doğrulayan noterleri sisteme dahil eder. Bu mekanizma, Zincir güvenliğini ve kontrol noktası doğrulamasını iyileştirmek üzere tasarlanmıştır ve salt PoW sistemlerine kıyasla daha sağlam bir seçenek sunar.

### İlk test olarak neden Hibrit PoS/PoW?

* Salt PoS'ye doğru ilerleme sağlar.
* Madencilik ve staking kullanım alanlarının eşzamanlı olarak yürütülmesine ve ekosistemler arası geçişe olanak tanır.
* PoS protokolünün daha fazla doğrulayıcı stake'i ve güven kazanmasına kadar olası güvenlik sorunlarını azaltır.
* Genel yaklaşım, Ethereum tarafından üretim ortamında gösterilmiştir.

### Crosslink nedir?

Crosslink protokolü, Zcash'ın hibrit İş Kanıtı/Stake Kanıtı (PoW/PoS) aşaması için önerilen bir tasarımdır. PoW'yi Bizans Hata Toleransı (BFT) protokolüyle birleştirerek, PoW veya PoS güvenli kaldığı sürece kesin kesinlik sağlar. Tasarım, madenci katılımını korurken stake edilmiş doğrulamayı dahil ederek ağ güvenliğini ve merkeziyetsizliği güçlendirmeyi amaçlar. Önerinin Crosslink 2 adı verilen temel bir özelliği, BFT teklifçilerini ve madencileri birleştirerek mimariyi basitleştirir. Bu yalın yaklaşım yapısal değişiklikleri en aza indirir ve yüksek güvenlik standartlarını korurken prototip oluşturmayı ve dağıtımı kolaylaştıran bir “kukla” BFT katmanının kullanılmasına olanak tanır.

Uygulama planı, Crosslink 2*'yi Zcash'ın Zebra istemcisine entegre etmek için tahmini mühendislik maliyetlerini içeren bir yol haritası barındırır. Bu aşamalı dağıtım; paydaş teşviklerini dengelemeye, kesintileri azaltmaya ve Zcash'ın ölçeklendirme, kullanılabilirlik ve merkeziyetsizlik hedefleriyle uyum sağlamaya odaklanır. Protokolün sağlam güvenlik özelliklerine duyulan güvenin artması, Zcash evriminde önemli bir adım olma potansiyelini daha da pekiştirir. Enerji verimliliği sorunlarını ele alarak ve konsensüs mekanizmalarını iyileştirerek Crosslink, gelişen blokzincir zorluklarına yönelik ileri görüşlü bir çözüm sunar. Daha fazla bilgi için [GitHub deposuna](https://github.com/ShieldedLabs/zebra-crosslink) ve [Zcash Topluluk Forumu'na](https://forum.zcashcommunity.com) bakın.

### Crosslink Amaç ve Hedefleri

Crosslink Protokolü, Zcash'ın geleceği açısından kritik önem taşıyan çeşitli stratejik hedefleri ele almak üzere tasarlanmıştır:

1. **Merkeziyetsizlik**:
   * PoS'yi dahil ederek Zcash, madencilik gücünü çoğunlukla birkaç büyük operatörün elinde yoğunlaştıran özel PoW donanımlarına (ASIC'ler) olan bağımlılığı azaltır.
   * PoS, coin sahiplerinin ağı güvenceye almak için varlıklarını stake ettiği daha geniş bir topluluğun katılımını sağlar ve daha dağıtık bir konsensüsü güvence altına alır.
   * Stake edilmiş doğrulamayı devreye sokarak protokol, ekonomik katılımcıların konsensüste etkin rol oynamasını sağlar ve yalnızca madenciliğe olan bağımlılığı azaltır.
2. **Gelişmiş Yönetişim**:
   * Coin sahipleri staking yoluyla oy kullanma hakkı kazanır; bu da ağ yükseltmeleri, fon tahsisleri ve ekosistem öncelikleriyle ilgili kararları etkilemelerine olanak tanır. Bu demokratik mekanizma, protokolün evrimini topluluk çıkarlarıyla uyumlu hale getirir.
3. **Enerji Verimliliği**:
   * Kısmen PoS'ye geçiş, enerji gereksinimlerini önemli ölçüde düşürür ve Zcash'ı küresel sürdürülebilirlik girişimleriyle uyumlu hale getirir. PoS, yoğun hesaplama gerektiren PoW'ye kıyasla doğası gereği daha az kaynak tüketir. Hibrit sistemler, yüksek güvenliği korurken yalnızca PoW kullanan sistemlere kıyasla enerji tüketimini azaltmayı amaçlar.
4. **Ekonomik Güvenlik ve Sürdürülebilirlik**:
   * PoW ile PoS'nin birleştirilmesi, ağ katılımcılarına yönelik ekonomik teşvikleri çeşitlendirerek tek bir mekanizmaya aşırı bağımlı olmadan sağlam güvenlik sağlar.
   * Staking ayrıca katılımcılar için öngörülebilir bir ödül modeli sunarak uzun vadeli yatırımcılar için cazip bir seçenek oluşturur.
5. **Artırılmış Güvenlik**: Crosslink, PoS'yi PoW'nin yanında entegre ederek ağın Zincir yeniden düzenleme saldırılarına karşı direncini artırmayı amaçlar.

## Görsel / Benzetme

![image](/content-images/b34afda4-fe33-448f-b0dd-279fd6cef1f5-73f58cdcc6.webp)

Aynı teslimat için iki farklı belge düzenleyen bir kargo hizmeti düşünün. İlki bir takip taramasıdır: Hızlıca görünür, paketin muhtemelen nerede olduğunu bildirir ve bazen düzeltilir. İkincisi imzalı bir teslimat makbuzudur: Daha geç gelir ama bir kez oluşturulduğunda kimse ona itiraz etmez.

Daha düşük gecikmeli defter takip taramasına, kesinleştirilmiş defter ise imzalı makbuza karşılık gelir. İkisi de aynı olaylar Zincir'ini anlatır; aralarındaki fark, ne kadar hızlı ortaya çıktıkları ve ne kadar kesin olduklarıdır.

Güvenlik Modu, taramalar birikmeye devam ederken imzalı makbuzların gelmemesi durumunda deponun uyguladığı önlemdir. Paketler binanın içinde hareket etmeye devam eder — ancak imzalar yetişene kadar ofis yalnızca taramalara dayanarak ödeme yapmayı durdurur.

## Derinlemesine İnceleme

### Crosslink Güvenlik ve Performans Hedefleri

Crosslink protokolü, Zcash için iki tür defter sunmayı amaçlar: **kesinleştirilmiş defter (LOG_fin)** ve **daha düşük gecikmeli defter (LOG_ba)**. Kesinleştirilmiş defter, Bizans Hata Toleransı (BFT) veya blokzincir (BC) protokollerinden biriyle ilgili makul varsayımlar altında geri alma güvenliği sağlar. Ağ bölünmeleri sırasında bile çalışır ve güvenli kalacak şekilde tasarlanmıştır; eşdeğer blok onayları için gecikmesi mevcut Zcash blokzincirinin gecikmesinin iki katından biraz fazladır.

Daha düşük gecikmeli defter, kesinleştirilmiş defteri en fazla *L* blokla genişletir. Yalnızca blokzincir protokolü altında geri alma güvenliği sağlar ve mevcut Zcash modelinden daha kötü olmayan gecikme ve güvenlik özelliklerini korur. Basitleştirilmiş Crosslink 2* tasarımında, daha düşük gecikmeli defter bir PoW Zinciri işlevi görerek geliştirme ve benimsemeyi kolaylaştırır.

![image](/content-images/fd039664-4852-4fb0-8c88-0615f1ed116e-41459b81dc.webp)

### Sınırlı Kullanılabilirlik ve Güvenlik Modu

Crosslink, daha düşük gecikmeli defterin kesinleştirilmiş defterin çok önüne geçmesiyle ilişkili riskleri ele almak için **Güvenlik Modu** içerir. Bu, dengesiz hesap durumları veya hizmet sağlayıcıların geçici çözümlerindeki doğrulanmamış güvenlik açıkları gibi tutarsızlıkları önler. Kesinleştirilmiş defter sabit *L* bloktan fazla geride kalırsa Güvenlik Modu etkinleşir. Bu durumda blokzincir PoW işlemlerine devam eder (temel güvenliği sağlar), ancak sorun çözülene kadar ekonomik faaliyetler duraklatılır. Bu mekanizma, yönetişim temelli geri alma politikalarını desteklerken büyük saldırılar gibi olağanüstü durumlardan kurtulmak üzere tasarlanmıştır.

### Teknik Ayrıntılar ve Dağıtım

Crosslink Protokolü, Shielded Labs tarafından ZODL gibi temel ekosistem ortaklarıyla işbirliği içinde etkin biçimde geliştiriliyor ve dağıtılıyor. Protokolün uygulaması şunları içerir:

* PoS katılımcıları için güvenli staking mekanizmaları oluşturmak.
* Madenciler ve stake edenler arasındaki teşvikleri dengelemek için ödül yapısını değiştirmek.
* Geçiş sırasında geriye dönük uyumluluğu ve sorunsuz bir kullanıcı deneyimini güvence altına almak.
* Noter Sistemi: Protokol, blokları onaylayıp imzalayan noterleri içerir. Başlangıçta statik noterler kullanılır; daha sonra noterlerin stake edilmiş ZEC temelinde seçildiği dinamik bir sisteme geçilir.
* Etkinleştirme Mantığı: Crosslink'ın devreye alınması, stake dağıtım sürecinin tanımlanması ve hibrit konsensüsü desteklemek için ağ protokolü kurallarının güncellenmesi dahil olmak üzere Zcash konsensüs kurallarında değişiklikler gerektirir.
* Aşamalı Dağıtım: Ağın istikrarını ve topluluğun uyumunu güvence altına almak için protokol aşamalar halinde kullanıma sunulacaktır. İlk aşamalar teknik uygulamaya odaklanacak, ardından noterlerin seçimi için yönetişim entegrasyonu yapılacaktır.

Önceki prototip ve belgeleri, 12 Kasım 2026'da kullanımdan kaldırılan [zebra-crosslink deposunda, GitHub](https://github.com/ShieldedLabs/zebra-crosslink) üzerinde ve [The zebra-crosslink Book](https://shieldedlabs.github.io/zebra-crosslink/) içinde bulunur. Mevcut çalışmalar bir sonraki bölümde açıklanmıştır.

### Crosslink ne durumda?

Crosslink hâlâ bir öneridir. Shielded Labs' [Crosslink SSS](https://shieldedlabs.net/crosslink-faq/), ana ağda etkinleştirilmeden önce “standart Zcash yönetişim sürecinden geçmesi gerekeceğini” söylüyor.

Bugün mevcut olan, **Feature Net**: Shielded Labs tarafından işletilen, cTAZ adlı kendi test coin'ine sahip bir test ağıdır. Herkes burada madencilik yapabilir, staking yapabilir ve bir finalizer çalıştırabilir. 1 Ekim 2026'da yayımlanan [Sürüm 14](https://github.com/ShieldedLabs/crosslink_monolith/releases/tag/v14), basit iş kanıtı olarak başladı ve Crosslink aşamalar halinde etkinleştirildi: staking 20.736. blokta, ilk finalizer listesi 34.560. blokta ve BFT kesinliği 36.288. blokta başladı ([kaynak](https://github.com/ShieldedLabs/crosslink_monolith/blob/v14/librustzcash/zcash_primitives/src/bft.rs#L546-L555)). Sonraki sürümler aynı ağı yükseltir: PoW yüksekliği 55.296'da [sürüm 15](https://github.com/ShieldedLabs/crosslink_monolith/releases/tag/v15), 165.000 yüksekliğinde [sürüm 17](https://github.com/ShieldedLabs/crosslink_monolith/releases/tag/v17) (5 Kasım 2026) ve 189.000. blokta [sürüm 18](https://github.com/ShieldedLabs/crosslink_monolith/releases/tag/v18) (17 Kasım 2026). [sürüm 16](https://github.com/ShieldedLabs/crosslink_monolith/releases/tag/v16) ile başlayarak her sürüm yayımlandıktan iki hafta sonra çalışmayı durdurur; bu nedenle her zaman [en son sürümü](https://github.com/ShieldedLabs/crosslink_monolith/releases/latest) çalıştırın.

Bu sayfadaki iki bilgi, yazıldığı zamandan bu yana değişti:

* **Burada noter olarak adlandırılan rol, Shielded Labs yazılımında ve sürüm notlarında finalizer olarak adlandırılır.** Stake edenler coin'lerini bir finalizer'a devreder ve en fazla stake'e sahip finalizer'lar blokları kesinleştirmek için oy kullanır.
* **Kodun yeri değişti.** Yukarıda belirtilen zebra-crosslink deposu 12 Kasım 2026'da kullanımdan kaldırıldı ve README dosyası artık [Shielded Labs' Crosslink sayfasına](https://shieldedlabs.net/crosslink) yönlendiriyor. Feature Net sürümleri [crosslink_monolith](https://github.com/ShieldedLabs/crosslink_monolith/releases) deposundan yayımlanıyor ve tasarım [Crosslink kitabında](https://shieldedlabs.github.io/crosslink_book/) açıklanıyor.

Kendiniz denemek için [Crosslink Feature Net](/guides/crosslink-feature-net) kılavuzunu izleyin. Hiçbir şey çalıştırmadan ağı izlemek için Crosslink sekmesini [ZecHub Araçlar](https://zechub.wiki/tools?tool=crosslink) üzerinde açın.

## Uygulamadaki Etkileri

### PoW Madencilerinin Gelirine Etkisi

Crosslink, PoW madencilerinin Zcash'ın ilk dönemindeki temel rolünü kabul ederken kademeli bir geçişe hazırlanır:

* **Blok Ödüllerinin Azalması**:
  * Zamanla PoS doğrulayıcıları ödüllerin giderek artan bir payını alacak ve PoW madencilerinin kazançları azalacaktır. Bu yeniden dağıtım, hibrit modelde PoW'nin azalan rolünü yansıtır.
* **Adil Geçiş**:
  * Protokol, değişiklikleri kademeli olarak uygulayarak madencilere uyum sağlamaları veya staking'e geçmek ya da diğer ağ hizmetlerine katkıda bulunmak gibi Zcash ekosistemi içindeki yeni rolleri keşfetmeleri için yeterli zaman tanır.
* **Merkezileşme Risklerini Azaltma**:
  * PoS staking havuzları, gücün yoğunlaşmasını önleyecek ve küçük katılımcılara eşit koşullarda katılma fırsatı sunacak şekilde tasarlanmıştır. Bu kapsayıcı yaklaşım, ASIC tabanlı madencilikte görülen mevcut yoğunlaşmayı önler.
* PoW madencileri, blok ödülünün bir kısmı PoS doğrulayıcılarına yeniden tahsis edildiğinden gelirlerinin azalmasıyla karşılaşacaktır. Bu yeniden tahsis, ağı güvenceye almaları karşılığında hem madencileri hem de stake edenleri ödüllendirerek dengeli bir teşvik sistemi sağlar.
* Madenciler üzerindeki ekonomik etkiyi azaltırken paydaş katılımını teşvik etmek için kademeli bir geçiş planlanmıştır.

Bu ikili konsensüs mekanizması, Zcash'ın gizlilik, sürdürülebilirlik ve merkeziyetsizlik taahhüdünü güçlendirerek onu blokzincir alanında ileri görüşlü bir lider olarak konumlandırır.

## Sık Yapılan Hatalar

**Crosslink'ı etkin bir konsensüs kuralı olarak değerlendirmek**. Bu sayfa, aşamalı bir dağıtım planı içeren önerilen bir tasarımı açıklar. Tasarımın devreye alınması, yol haritasının ve Zebra entegrasyon çalışmalarının amacı olan Zcash konsensüs kurallarında değişiklikler gerektirir.

**PoS'nin madenciliğin yerini aldığını varsaymak**. Crosslink hibrit bir tasarımdır: PoW blok üretimi, stake edilmiş doğrulamayla birlikte devam eder. Güvenlik Modu'nda bile blokzincir PoW işlemlerini sürdürürken ekonomik faaliyetler duraklatılır.

**“Kesinliği” daha hızlı onay olarak değerlendirmek**. Kesinleştirilmiş defter, eşdeğer blok onayları için mevcut Zcash blokzincirinin gecikmesinin iki katından biraz fazla gecikmeye sahip olacak şekilde tasarlanmıştır. Sağladığı şey hız değil, geri alma güvenliğidir — hızlı görünüm, daha düşük gecikmeli defterdir.

**İki defteri birbirine karıştırmak**. LOG_ba ayrı bir Zincir değildir: Kesinleştirilmiş defteri en fazla *L* blokla genişletir ve Crosslink 2* tasarımında PoW Zinciri işlevi görür.

## İlgili Sayfalar

- [Crosslink Feature Net](/guides/crosslink-feature-net) — Feature Net masaüstü uygulamasını yükleyin, bir finalizer'a stake devredin ve durumunuzu kontrol edin.
- [Zebra Tam Düğüm](/zcash-tech/zebra-full-node) — Crosslink 2*'nin entegre edilmesinin planlandığı istemci.
- [Tam Düğümler](/zcash-tech/full-nodes) — hibrit konsensüs değişikliğinden önce düğümlerin bugün konsensüs kurallarını nasıl doğruladığı.
- [Ağ Yükseltmeleri](/start-here/network-upgrades) — konsensüs kuralı değişikliklerinin Zcash ağına nasıl ulaştığı.
- [Zcash Para Politikası](/start-here/zcash-monetary-policy) — Crosslink'ın yeniden dağıtacağı blok ödülü yapısı.

## Ek Kaynaklar

- Topluluk tartışması: [Crosslink: Teşvikli Feature Net, Zcash Topluluk Forumu'nda](https://forum.zcashcommunity.com/t/crosslink-incentivized-feature-net/55210)
- Resmî güncellemeler: [Crosslink, Shielded Labs](https://shieldedlabs.net/crosslink/) üzerinde ve [Feature Net sürümlerinde](https://github.com/ShieldedLabs/crosslink_monolith/releases)
- Tasarım referansı: [Crosslink kitabı](https://shieldedlabs.github.io/crosslink_book/)

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
