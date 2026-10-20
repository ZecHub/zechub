<a href="https://github.com/zechub/zechub/edit/main/site/Zcash_Tech/Crosslink_Protocol.md" target="_blank">
  <img src="https://img.shields.io/badge/Edit-blue" alt="Sayfayı Düzenle"/>
</a>

# Crosslink Protokolü

## Kısaca

* Crosslink protokolü, Zcash'ün hibrit İş İspatı/Hisse İspatı (PoW/PoS) aşaması için önerilen bir tasarımdır. PoW'ı Bizans Hata Toleransı (BFT) protokolüyle entegre ederek, PoW veya PoS güvenli kaldığı sürece garantili kesinlik sağlar.
* Hibrit PoS, stake edilmiş ZEC temelinde blokları doğrulayan noterleri sunar — başlangıçta sabit, daha sonra stake edilmiş ZEC temelinde seçilen noterler.
* Crosslink iki defter sunmayı amaçlar: geri alma güvenliği için bir **kesinleşmiş defter (LOG_fin)** ve bunu en fazla *L* blok genişleten bir **daha düşük gecikmeli defter (LOG_ba)**.
* Kesinleşmiş defter *L* bloktan fazla geride kalırsa bir **Güvenlik Modu** etkinleşir: PoW devam eder, ancak sorun çözülene kadar ekonomik faaliyetler duraklatılır.
* Zamanla PoS doğrulayıcıları ödüllerden giderek daha büyük bir pay alacak, PoW madencilerinin gelirleri azalacaktır; protokol değişiklikleri kademeli olarak sunar.
* Protokol, Shielded Labs tarafından geliştirilmektedir ve Crosslink 2*'nin Zcash'ün Zebra istemcisine entegre edilmesi için bir yol haritasına sahiptir.
* Crosslink, Zcash ana ağında etkin değildir. Herkesin katılabileceği bir test ağı olan Shielded Labs'ün Feature Net üzerinde çalışır. Aşağıdaki "Crosslink'ün mevcut durumu" bölümüne bakın.

## Temel Açıklama

### Giriş: Zcash Hibrit PoS ve Crosslink Protokolü

Crosslink Protokolü, Zcash'ün evriminde onu **Hibrit Hisse İspatı (PoS)** ve **İş İspatı (PoW)** modeline yönlendiren dönüm noktası niteliğinde bir gelişmedir. Ağ güvenliğini sağlamada güvenilir olsa da geleneksel PoW; enerji tüketimi ve endüstriyel madencilikle ilişkili merkezileşme riskleri nedeniyle eleştirilir. Crosslink, PoW'ın kanıtlanmış dayanıklılığını PoS'un verimlilik ve yönetişim avantajlarıyla birleştiren hibrit bir sistem sunar.

![image](/content-images/a2ffb19d-e570-4723-b669-a66e14fc6b71-a727c958de.webp)

Bu geçiş, projelerin çevresel olarak sürdürülebilir ve merkeziyetsiz mekanizmalara yöneldiği blok zinciri inovasyonundaki küresel eğilimlerle uyumludur. Crosslinks'in çift konsensüs modeli, Zcash'ün güncel zorluklara uyum sağlarken güçlü kriptografik gizlilik güvencelerini korumasını sağlar.

Hibrit Hisse İspatı (PoS) yaklaşımı, geleneksel İş İspatı'nı (PoW) PoS ile birleştirerek merkeziyetsizliği korurken ve enerji tüketimini azaltırken %51 saldırıları gibi zafiyetleri ele almayı amaçlar. Hibrit PoS, stake edilmiş ZEC temelinde blokları doğrulayan noterleri sunar. Bu mekanizma, zincir güvenliğini ve kontrol noktası doğrulamasını iyileştirmek, salt PoW sistemlerine daha sağlam bir alternatif sunmak üzere tasarlanmıştır.

### İlk test olarak neden Hibrit PoS/PoW?

* Saf PoS'a doğru ilerleme sağlar.
* Eşzamanlı madencilik ve stake kullanım senaryolarını ve ekosistemler arası geçişi mümkün kılar.
* Daha fazla doğrulayıcı hissesi ve güven kazanana kadar PoS protokolündeki olası güvenlik sorunlarını hafifletir.
* Genel yaklaşım Ethereum tarafından üretimde gösterilmiştir.

### Crosslink nedir

Crosslink protokolü, Zcash'ün hibrit İş İspatı/Hisse İspatı (PoW/PoS) aşaması için önerilen bir tasarımdır. PoW'ı Bizans Hata Toleransı (BFT) protokolüyle entegre ederek, PoW veya PoS güvenli kaldığı sürece garantili kesinlik sağlar. Tasarım, madenci katılımını korurken stake edilmiş doğrulamayı dahil ederek ağ güvenliğini ve merkeziyetsizliği güçlendirmeyi amaçlar. Crosslink 2 olarak adlandırılan önerinin temel bir özelliği, BFT teklifçilerini ve madencileri birleştirerek mimariyi sadeleştirir. Bu yalınlaştırılmış yaklaşım, yapısal değişiklikleri en aza indirir ve yüksek güvenlik standartlarını korurken prototiplemeyi ve dağıtımı kolaylaştıran bir "kukla" BFT katmanının kullanılmasına olanak tanır.

Uygulama planı, Crosslink 2*'nin Zcash'ün Zebra istemcisine entegre edilmesi için tahmini mühendislik maliyetlerini içeren bir yol haritası içerir. Bu aşamalı dağıtım, paydaş teşviklerini dengelemeye, aksaklığı azaltmaya ve ölçeklenebilirlik, kullanılabilirlik ve merkeziyetsizlik için Zcash hedefleriyle uyum sağlamaya odaklanır. Protokolün güçlü güvenlik özelliklerine duyulan artan güven, Zcash evriminde önemli bir adım olma potansiyelini daha da pekiştirir. Enerji verimliliğini ele alarak ve konsensüs mekanizmalarını geliştirerek Crosslink, gelişen blok zinciri zorluklarına yönelik ileriye dönük bir çözüm sunar. Daha fazla ayrıntı için [GitHub deposuna](https://github.com/ShieldedLabs/zebra-crosslink) ve [Zcash Topluluk Forumuna](https://forum.zcashcommunity.com) başvurun.

### Crosslink'ün Amaçları ve Hedefleri

Crosslink Protokolü, Zcash'ün geleceği açısından kritik olan birkaç stratejik hedefi ele almak üzere tasarlanmıştır:

1. **Merkeziyetsizlik**:
   * PoS'u dahil ederek Zcash, madencilik gücünü sıklıkla birkaç büyük işletmecinin elinde yoğunlaştıran özel PoW donanımına (ASIC'ler) bağımlılığı azaltır.
   * PoS, coin sahiplerinin ağı güvence altına almak için varlıklarını stake ettiği daha geniş bir topluluğun katılımına olanak tanır ve daha dağıtık bir konsensüs sağlar.
   * Protokol, stake edilmiş doğrulamayı sunarak ekonomik katılımcıların konsensüste aktif rol oynamasını sağlar ve yalnızca madenciliğe bağımlılığı azaltır.
2. **Geliştirilmiş Yönetişim**:
   * Coin sahipleri stake etme yoluyla oy hakkı kazanır; böylece ağ yükseltmeleri, fon tahsisleri ve ekosistem öncelikleri hakkındaki kararları etkileyebilirler. Bu demokratik mekanizma, protokolün evrimini topluluğun çıkarlarıyla uyumlu hâle getirir.
3. **Enerji Verimliliği**:
   * Kısmen PoS'a geçmek, enerji gereksinimlerini önemli ölçüde azaltarak Zcash'ü küresel sürdürülebilirlik girişimleriyle uyumlu hâle getirir. PoS, hesaplama açısından yoğun PoW'a kıyasla doğası gereği daha az kaynak tüketir. Hibrit sistemler, yüksek güvenliği korurken yalnızca PoW kullanan sistemlere kıyasla enerji kullanımını azaltmayı amaçlar.
4. **Ekonomik Güvenlik ve Sürdürülebilirlik**:
   * PoW ve PoS'u birleştirmek, ağ katılımcılarının ekonomik teşviklerini çeşitlendirir ve tek bir mekanizmaya aşırı bağımlı olmadan güçlü güvenlik sağlar.
   * Stake etme ayrıca katılımcılar için öngörülebilir bir ödül modeli sunarak uzun vadeli yatırımcılar için cazip bir öneri oluşturur.
5. **Artan Güvenlik**: Crosslink, PoW'ın yanında PoS'u entegre ederek ağın zincir yeniden düzenleme saldırılarına karşı dayanıklılığını artırmayı amaçlar.

## Görsel / Analoji

![image](/content-images/b34afda4-fe33-448f-b0dd-279fd6cef1f5-73f58cdcc6.webp)

Aynı teslimat için iki farklı belge düzenleyen bir kargo hizmeti düşünün. İlki bir takip taramasıdır: hızla görünür, paketin büyük olasılıkla nerede olduğunu söyler ve bazen düzeltilir. İkincisi imzalı teslimat makbuzudur: daha sonra gelir, ancak var olduğunda kimse ona itiraz etmez.

Daha düşük gecikmeli defter takip taramasıdır, kesinleşmiş defter ise imzalı makbuzdur. Her ikisi de aynı olay zincirini tanımlar; ortaya çıkma hızları ve ne kadar kesin oldukları bakımından farklıdırlar.

Güvenlik Modu, taramalar birikmeye devam ederken imzalı makbuzların gelmemesi durumunda deponun yaptığı şeydir. Paketler bina içinde hareket etmeyi sürdürür — ancak imzalar yetişene kadar ofis yalnızca taramalara dayanarak ödeme yapmayı durdurur.

## Derinlemesine İnceleme

### Crosslink'ün Güvenlik ve Performans Hedefleri

Crosslink protokolü, Zcash için iki tür defter sağlamayı amaçlar: bir **kesinleşmiş defter (LOG_fin)** ve bir **daha düşük gecikmeli defter (LOG_ba)**. Kesinleşmiş defter, Bizans Hata Toleransı (BFT) veya blok zinciri (BC) protokolü hakkında makul varsayımlar altında geri alma güvenliğini sağlar. Ağ bölünmeleri altında bile canlı ve güvenli kalacak şekilde tasarlanmıştır; eşdeğer blok onayları için mevcut Zcash blok zincirinin gecikmesinin iki katından biraz fazla bir gecikmeye sahiptir.

Daha düşük gecikmeli defter, kesinleşmiş defteri en fazla *L* blok genişletir. Yalnızca blok zinciri protokolü kapsamında geri alma güvenliği sağlar ve mevcut Zcash modelinden daha kötü olmayan gecikme ve güvenliği korur. Yalınlaştırılmış Crosslink 2* tasarımında, daha düşük gecikmeli defter bir PoW zinciri olarak işleyerek geliştirmeyi ve benimsemeyi basitleştirir.

![image](/content-images/fd039664-4852-4fb0-8c88-0615f1ed116e-41459b81dc.webp)

### Sınırlı Kullanılabilirlik ve Güvenlik Modu

Crosslink, daha düşük gecikmeli defterin kesinleşmiş defterin çok önünde çalışmasıyla ilişkili riskleri ele almak için bir **Güvenlik Modu** içerir. Bu, hizmet sağlayıcıların geçici çözümlerindeki dengesiz hesap durumları veya doğrulanmamış güvenlik açıkları gibi tutarsızlıkları önler. Kesinleşmiş defter sabit *L* bloktan fazla geride kalırsa Güvenlik Modu etkinleştirilir. Bu durumda blok zinciri PoW işlemlerini sürdürür (temel güvenliği sağlayarak), ancak sorun çözülene kadar ekonomik faaliyetler duraklatılır. Bu mekanizma, yönetişim temelli geri alma politikalarını desteklerken büyük saldırılar gibi istisnai koşullardan kurtulmak üzere tasarlanmıştır.

### Teknik Ayrıntılar ve Dağıtım

Crosslink Protokolü, ZODL gibi kilit ekosistem ortaklarıyla iş birliği içinde Shielded Labs tarafından aktif olarak geliştirilmektedir ve dağıtılmaktadır. Protokolün uygulanması şunları içerir:

* PoS katılımcıları için güvenli stake mekanizmaları oluşturmak.
* Madenciler ve stake edenler arasındaki teşvikleri dengelemek için ödül yapısını değiştirmek.
* Geçiş sırasında geriye dönük uyumluluğu ve sorunsuz bir kullanıcı deneyimini sağlamak.
* Noter Sistemi: Protokol, blokları onaylayan noterleri içerir. Başlangıçta sabit noterler kullanılır; ardından noterlerin stake edilmiş ZEC temelinde seçildiği dinamik bir sisteme geçilir.
* Etkinleştirme Mantığı: Crosslink'ün sunulması, stake dağıtım sürecinin tanımlanması ve hibrit konsensüsü desteklemek için ağ protokol kurallarının güncellenmesi dâhil olmak üzere Zcash konsensüs kurallarında değişiklikler gerektirir.
* Aşamalı Dağıtım: Protokol, ağ istikrarını ve topluluğun uyumunu sağlamak için aşamalar hâlinde kullanıma sunulacaktır. İlk aşamalar teknik uygulamaya odaklanır, bunu noterlerin seçimi için yönetişim entegrasyonu izler.

Önceki prototip ve belgeleri, [zebra-crosslink deposunda, GitHub](https://github.com/ShieldedLabs/zebra-crosslink) üzerinde ve [The zebra-crosslink Book'ta](https://shieldedlabs.github.io/zebra-crosslink/) bulunmaktadır. Güncel çalışmalar bir sonraki bölümde açıklanmaktadır.

### Crosslink'ün mevcut durumu

Crosslink hâlâ bir öneridir. Shielded Labs'ün [Crosslink SSS'si](https://shieldedlabs.net/crosslink-faq/), ana ağda etkinleşebilmesi için "standart Zcash yönetişim sürecinden geçmesi gerekeceğini" belirtir.

Bugün var olan şey **Feature Net**'dür: Shielded Labs tarafından işletilen, herkesin madencilik yapabileceği, stake edebileceği ve bir kesinleştirici çalıştırabileceği, kendi cTAZ test coin'ine sahip bir test ağı. 1 Ekim 2026'da yayınlanan [Sürüm 14](https://github.com/ShieldedLabs/crosslink_monolith/releases/tag/v14), düz iş ispatı olarak başlar ve Crosslink'ü aşamalar hâlinde etkinleştirir: 20.736. bloktan itibaren stake, 34.560. blokta alınan ilk kesinleştirici listesi ve 36.288. bloktan itibaren BFT kesinliği ([kaynak](https://github.com/ShieldedLabs/crosslink_monolith/blob/v14/librustzcash/zcash_primitives/src/bft.rs#L546-L555)).

Bu sayfadaki iki şey yazıldığından beri değişti:

* **Burada noter olarak adlandırılan rol, Shielded Labs yazılımında ve sürüm notlarında kesinleştirici olarak adlandırılır.** Stake edenler coin'lerini bir kesinleştiriciye devreder ve en fazla stake'e sahip kesinleştiriciler blokları kesinleştirmek için oy kullanır.
* **Kod taşındı.** Yukarıdaki zebra-crosslink deposu en son Nisan 2026'da güncellendi. Feature Net sürümleri [crosslink_monolith](https://github.com/ShieldedLabs/crosslink_monolith/releases) üzerinden gelir ve tasarım [Crosslink kitapta](https://shieldedlabs.github.io/crosslink_book/) açıklanmıştır.

Kendiniz denemek için [Crosslink Feature Net](/guides/crosslink-feature-net) rehberini izleyin. Ağı hiçbir şey çalıştırmadan izlemek için Crosslink sekmesini [ZecHub Tools'ta](https://zechub.wiki/tools?tool=crosslink) açın.

## Pratik Sonuçlar

### PoW Madencilerinin Gelirleri Üzerindeki Etki

Crosslink, Zcash'ün erken gelişiminde PoW madencilerinin temel rolünü kabul ederken kademeli bir geçişe hazırlanır:

* **Azalan Blok Ödülleri**:
  * Zamanla PoS doğrulayıcıları ödüllerden giderek daha büyük bir pay alacak, PoW madencilerinin gelirleri azalacaktır. Bu yeniden dağıtım, hibrit modelde PoW'ın azalan rolünü yansıtır.
* **Adil Geçiş**:
  * Protokol değişiklikleri kademeli olarak sunarak madencilerin uyum sağlaması veya Zcash ekosistemi içinde stake etmeye geçiş ya da diğer ağ hizmetlerine katkıda bulunma gibi yeni rolleri keşfetmesi için yeterli zaman sağlar.
* **Merkezileşme Risklerini Hafifletme**:
  * PoS stake havuzları, gücün yoğunlaşmasını önlemek üzere tasarlanmıştır ve daha küçük katılımcılara eşit koşullarda katılma fırsatı sunar. Bu kapsayıcı yaklaşım, ASIC tabanlı madencilikte görülen mevcut yoğunlaşmaya karşı koyar.
* Blok ödülünün bir kısmı PoS doğrulayıcılarına yeniden tahsis edileceğinden PoW madencilerinin gelirleri azalacaktır. Bu yeniden tahsis, hem madencileri hem de stake edenleri ağı güvence altına aldıkları için ödüllendiren dengeli bir teşvik sistemi sağlar.
* Paydaş katılımını teşvik ederken madenciler üzerindeki ekonomik etkiyi hafifletmek için kademeli bir geçiş planlanmıştır.

Bu çift konsensüs mekanizması, Zcash'ün gizlilik, sürdürülebilirlik ve merkeziyetsizliğe olan bağlılığını güçlendirerek onu blok zinciri alanında ileriye dönük bir lider konumuna getirir.

## Yaygın Hatalar

**Crosslink'ü etkin bir konsensüs kuralı olarak okumak**. Bu sayfa, aşamalı bir dağıtım planı içeren önerilen bir tasarımı açıklar. Bunun sunulması, yol haritası ve Zebra entegrasyon çalışmasının amacı olan Zcash konsensüs kurallarında değişiklikler gerektirir.

**PoS'un madenciliğin yerini aldığını varsaymak**. Crosslink hibrit bir tasarımdır: PoW blok üretimi stake edilmiş doğrulamayla birlikte devam eder. Güvenlik Modunda bile blok zinciri PoW işlemlerini sürdürürken ekonomik faaliyetler duraklatılır.

**"Kesinlik"i daha hızlı onayla karıştırmak**. Kesinleşmiş defter, eşdeğer blok onayları için mevcut Zcash blok zincirinin gecikmesinin iki katından biraz fazla bir gecikmeye sahip olacak şekilde tasarlanmıştır. Eklediği şey hız değil, geri alma güvenliğidir — hızlı görünüm daha düşük gecikmeli defterdir.

**İki defteri karıştırmak**. LOG_ba ayrı bir zincir değildir: kesinleşmiş defteri en fazla *L* blok genişletir ve Crosslink 2* tasarımında bir PoW zinciri olarak işlev görür.

## İlgili Sayfalar

- [Crosslink Feature Net](/guides/crosslink-feature-net) — Feature Net masaüstü uygulamasını yükleyin, bir kesinleştiriciye stake edin ve konumunuzu kontrol edin.
- [Zebra Tam Düğüm](/zcash-tech/zebra-full-node) — Crosslink 2* istemcisinin entegre edilmesinin planlandığı istemci.
- [Tam Düğümler](/zcash-tech/full-nodes) — hibrit konsensüs değişikliğinden önce düğümlerin bugün konsensüs kurallarını nasıl doğruladığı.
- [Ağ Yükseltmeleri](/start-here/network-upgrades) — konsensüs kuralı değişikliklerinin Zcash ağına nasıl ulaştığı.
- [Zcash Para Politikası](/start-here/zcash-monetary-policy) — Crosslink'ün yeniden dağıtacağı blok ödül yapısı.

## Ek Kaynaklar

- Topluluk tartışması: [Crosslink: Teşvikli Feature Net, Zcash Topluluk Forumunda](https://forum.zcashcommunity.com/t/crosslink-incentivized-feature-net/55210)
- Resmî güncellemeler: [Crosslink, Shielded Labs](https://shieldedlabs.net/crosslink/) adresinde ve [Feature Net sürümlerinde](https://github.com/ShieldedLabs/crosslink_monolith/releases)
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
