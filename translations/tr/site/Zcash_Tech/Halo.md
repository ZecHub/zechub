<a href="https://github.com/zechub/zechub/edit/main/site/Zcash_Tech/Halo.md" target="_blank">
  <img src="https://img.shields.io/badge/Edit-blue" alt="Sayfayı düzenle"/>
</a>

# Halo

## Kısaca

Halo, Electric Coin Co bünyesinde Sean Bowe tarafından keşfedilen, güvene dayalı kurulum gerektirmeyen özyinelemeli bir sıfır bilgi kanıtı (zero-knowledge proof, ZKP) sistemidir. Güvene dayalı kurulum ihtiyacını ortadan kaldırır ve özyinelemeli kanıt bileşimini pratik hâle getirir; bu da Zcash'ın güncel ölçeklenebilirlik ve güvenlik yol haritasının temelini oluşturur.

- **Nedir:** verimli özyineleme ve güvene dayalı kurulum töreni gerektirmeyen bir zk-SNARK yapısıdır.
- **Neden önemlidir:** Zcash'ın Orchard korumalı havuzu, 2022'de NU5 ile etkinleştirildi ve araştırmanın üretim uygulaması olan Halo 2 üzerinde çalışıyor.
- **Temel özelliği:** Kurulum törenlerinden kaynaklanan “zehirli atık” yoktur ve kanıtlar pratikte sınırsız sayıda başka kanıtı doğrulayabilir.
- **Lisanslama:** Halo 2, [MIT ve Apache 2.0](https://github.com/zcash/halo2#readme) kapsamında açık kaynaklıdır; böylece ekosistemdeki herkes bu sistem üzerine geliştirme yapabilir.

---

## Temel Açıklama

Halo, Electric Coin Co bünyesinde Sean Bowe tarafından keşfedilen, güvene dayalı kurulum gerektirmeyen özyinelemeli bir sıfır bilgi kanıtı sistemidir. Güvene dayalı kurulum ihtiyacını ortadan kaldırır ve Zcash blokzincirinin daha ölçeklenebilir olmasını sağlar. Halo, hem verimli hem de özyinelemeli olan ilk sıfır bilgi kanıtı sistemiydi ve bilimsel bir dönüm noktası olarak kabul ediliyor.

![halo](/content-images/_unavailable.svg "halo")

### İki bileşen

- **Kısa Polinom Kriptografik Taahhüt Şeması.** Taahhüt sahibinin bir polinoma kısa bir dizeyle taahhüt etmesini sağlar. Bu dize, doğrulayıcının taahhüt edilen polinomun iddia edilen değerlerini doğrulamak için kullanabileceği bir bilgidir.
- **Polinom Etkileşimli Oracle Kanıtı.** Doğrulayıcı, kanıtlayıcıdan (bir algoritma) polinom taahhüt şemasını kullanarak seçtiği noktalardaki tüm taahhütleri açmasını ister ve bunlar arasındaki özdeşliğin doğru olduğunu denetler.

### Güvene dayalı kurulum yok

Groth16 gibi bazı zk-SNARK yapıları, genellikle ortak referans dizgesi (CRS) olarak adlandırılan genel parametrelerini oluşturmak için güvene dayalı kurulum gerektirir. CRS, kanıtlayıcılar ve doğrulayıcılarla paylaşılır; yok edilmesi gereken sır bu değildir. Böyle bir kurulumun ürettiği gizli ara malzeme (“zehirli atık”) atılmalıdır. Çok taraflı güvenli hesaplama, bu güveni katılımcılar arasında dağıtabilir: En az bir katılımcı protokolü izleyip kendi gizli katkısını yok ederse tören güvenlidir. ECC'ın [genel parametreler ve zehirli atık açıklamasına](https://zodl.com/snark-parameters/) bakın.

Zcash'ın önceki Sprout ve Sapling korumalı havuzlarında sırasıyla BCTV14 ve Groth16 olmak üzere, güvene dayalı kurulum gerektiren kanıt sistemleri kullanılıyordu. Genel parametreleri kanıt oluşturma ve doğrulama için kullanılabilir durumda. Endişe konusu, yanlış kanıtlar oluşturulmasına olanak sağlayabilecek gizli kurulum malzemesinin saklanmış olup olmadığıdır; CRS'nin yayımlanması beklenen bir durumdur ve bu gizli malzemeyi açığa çıkarmaz.

Halo, özyinelemeli kanıt bileşimini iç çarpım argümanına dayalı bir polinom kriptografik taahhüt şemasıyla birleştirir. Genel parametreleri için güvene dayalı kurulum töreni veya gizli kurulum tuzağının yok edilmesi gerekmez. [Halo 2 kitabı, bu genel grup parametrelerini açıklar](https://zcash.github.io/halo2/background/pc-ipa.html#setup). Bu, törenle oluşturulan yapılandırılmış bir referans dizgesini yükseltilebilir hâle getirmekten farklıdır.

Bu kurulum gereksiniminin kaldırılması, Halo kanıtları için gizli tören malzemesinin yok edilmesine güvenme zorunluluğunu ortadan kaldırır. Ancak önceki bir Sprout veya Sapling töreninin güvenli olduğunu kanıtlamaz; sonraki tüm protokol değişikliklerinin güvenli olduğunu da belgelemez. Özyinelemeli kanıtlar, kanıt sisteminin varsayımları çerçevesinde devrelerinde kodlanan hesaplamaları doğrular. Devrelerin ve uygulamaların doğru olması yine önemlidir; ECC'ın [Halo 2 dağıtım açıklaması](https://zodl.com/technical-explainer-halo-on-zcash/), yeni hatalar veya tasarım kusurları riskine özellikle dikkat çeker.

[Sean Bowe'ın Dystopia Labs'teki açıklaması](https://www.youtube.com/watch?v=KdkVTEHUxgo)

---

## Görsel / Benzetme

### Noter zinciri

Normal bir zk-SNARK işlemini noter tasdikli bir belge gibi düşünün: Tek bir mühür, tek bir doğrulama, tamam. Şimdi on bin belgeden oluşan bir yığının gerçek olduğunu kanıtlamanız gerektiğini düşünün. Özyineleme olmasaydı doğrulayıcının her mührü kontrol etmesi gerekirdi.

Halo, doğrulanmış her belgeyi *bir sonraki* belge üzerinde bir mühre dönüştürür; ta ki tüm yığın tek mühür taşıyan tek bir belgeye indirgenene kadar. Son belgeyi kontrol etmek, tüm zincire güvenmek için yeterlidir. Üstelik Halo'ın noteri (kanıt sistemi), mührünü oluşturmak için hiçbir zaman harici bir otoriteye ihtiyaç duymadan kendi mühürlerini üretir.

### Güvene dayalı kurulumu kaldırmak neden önemlidir?

Eski güvene dayalı kurulum sistemlerinde genel “mühür” (CRS) bir törenden elde edilirdi. Katılımcıların genel parametreleri erişilebilir tutarken gizli ara malzemelerini yok etmesi gerekirdi. Halo bu töreni ve gizli kurulum tuzağını ortadan kaldırır. Ancak kullanıcıların harcama anahtarlarını koruma veya kanıt sisteminin varsayımlarını ve uygulamasını denetleme gereksinimini ortadan kaldırmaz.

---

## Derinlemesine İnceleme

### Özyinelemeli kanıtlar

Özyinelemeli kanıt bileşimi, tek bir kanıtın pratikte sınırsız sayıda başka kanıtın doğruluğunu tasdik etmesini sağlar; böylece büyük miktarda hesaplamayı (ve bilgiyi) sıkıştırır. Bu, ölçeklenebilirliğin temel bileşenlerinden biridir; çünkü ağın yatay olarak ölçeklenmesine olanak tanırken katılımcı gruplarının ağın geri kalanının bütünlüğüne güvenmesini sağlar.

Halo öncesinde özyinelemeli kanıt bileşimine ulaşmak, yüksek hesaplama maliyeti ve güvene dayalı kurulum gerektiriyordu. Başlıca keşiflerden biri **iç içe amortisman** adı verilen bir teknikti: İç çarpım argümanına dayalı bir polinom kriptografik taahhüt şemasıyla özyinelemeli bileşim kuran bu teknik, güvene dayalı kurulumu önlerken performansı büyük ölçüde artırıyordu.

[Halo makalesi](https://eprint.iacr.org/2019/1021.pdf), bu polinom kriptografik taahhüt şemasını bütünüyle açıklar ve içinde yeni bir toplama tekniği bulunduğunu ortaya koyar. Bu teknik, bağımsız olarak oluşturulmuş çok sayıda kanıtın, tek bir kanıtı doğrulamak kadar hızlı doğrulanmasını sağlar. Bu özellik tek başına bile Zcash içinde kullanılan önceki zk-SNARKs yaklaşımına daha iyi bir alternatif sunuyordu.

### Halo 2

Halo 2, Rust ile yazılmış, yüksek performanslı bir zk-SNARK uygulamasıdır. Güvene dayalı kurulum ihtiyacını ortadan kaldırırken Zcash'te ölçeklenebilirliğin önünü açar.

<a href="">
    <img src="/content-images/Halo-puzzle-03-1024x517-e034023d10.webp" alt="" width="500" height="300"/>
</a>

Bu uygulama, **biriktirme şeması** adı verilen yaklaşımın genelleştirilmiş bir biçimini içerir. Bu biçimselleştirme, iç içe amortismanın gerçekte nasıl işlediğini gösterir: Kanıtlar **biriktirici** adı verilen bir nesneye eklenir; her kanıt biriktiricinin önceki durumunu ele alır ve tümevarım yoluyla tüm önceki kanıtlar yalnızca biriktiricinin mevcut durumu kontrol edilerek doğrulanabilir.

<a href="">
    <img src="/content-images/l4HrYgE-1ea7bc32f7.webp" alt="" width="500" height="300"/>
</a>

Aynı dönemde başka birçok ekip de Halo 1'de kullanılan Sonic'ten daha verimli Polinom IOP'ları keşfediyordu; Marlin bunlardan biriydi. Bu protokoller arasındaki en verimlisi PLONK'tır. Uygulamaya özgü ihtiyaçlara dayalı verimli uygulamalar tasarlamak için büyük esneklik sağlar ve kanıtlayıcı süresinde Sonic'e kıyasla 5 kat iyileşme sunar.

[PLONK genel bakış](https://www.youtube.com/watch?v=P1JeN30RdwQ)

### Daha geniş ekosistemde Halo

Electric Coin Company; Protocol Labs, Filecoin Foundation ve Ethereum Foundation ile, teknolojinin kendi ağlarında nasıl kullanılabileceği de dâhil olmak üzere Halo Ar-Ge çalışmalarını araştırmak üzere anlaşma yaptı. Anlaşma, ekosistemler genelinde ve Web 3.0 için daha iyi ölçeklenebilirlik, birlikte çalışabilirlik ve gizlilik sağlamayı amaçlıyor.

Ayrıca Halo 2, [MIT ve Apache 2.0 açık kaynak lisansları](https://github.com/zcash/halo2#readme) kapsamında yayımlanmıştır; bu da ekosistemdeki herkesin kanıt sistemiyle geliştirme yapabileceği anlamına gelir.

**Filecoin.** Dağıtımından bu yana halo2 kütüphanesi zkEVM gibi projelerde benimsendi ve Filecoin Virtual Machine için kanıt sistemine Halo 2'nin entegre edilmesi olasılığı bulunuyor. Filecoin çok sayıda maliyetli uzay-zaman kanıtı ve çoğaltma kanıtı gerektirir; Halo 2, alan kullanımını sıkıştırmak ve ağı daha iyi ölçeklendirmek açısından kritik önemdedir. [Filecoin Foundation'ın Zooko ile videosu](https://www.youtube.com/watch?v=t4XOdagc9xw). Zcash korumalı transferlerinde olduğu gibi depolama alımlarında da aynı gizliliği sağlamak için Filecoin depolama ödemelerinin ZEC ile yapılabilmesi her iki ekosisteme de fayda sağlayabilir. Buna, Filecoin depolama alanındaki dosyaların şifrelenmesi ve Zcash şifreli memo alanına medya ekleyen mobil istemcilerin desteklenmesi de dâhildir. [ECC × Filecoin blog yazısı](https://electriccoin.co/blog/ethereum-zcash-filecoin-collab/)

**Ethereum.** Verimli bir Doğrulanabilir Gecikme Fonksiyonu (VDF) için Halo 2 kanıtı geliştiriliyor. VDF; akıllı sözleşmelerde genel amaçlı rastgelelik ve Proof of Stake'te lider seçimi de dâhil olmak üzere birçok olası kullanım alanı bulunan kriptografik bir yapı taşıdır. ECC, Filecoin Foundation, Protocol Labs ve Ethereum Foundation ayrıca olası GPU ve ASIC tabanlı VDF geliştirme çalışmaları için donanım hızlandırmalı kriptografi alanında uzmanlaşmış bir sağlayıcı olan [SupraNational](https://www.supranational.net/) ile birlikte çalışıyor. [Gizlilik ve Ölçeklendirme Araştırmaları grubu](https://appliedzkp.org/), Halo 2 kanıtlarının Ethereum'un gizliliğini ve ölçeklenebilirliğini nasıl iyileştirebileceğine yönelik ek yöntemleri araştırıyor.

### Halo kullanan diğer projeler

- [Anoma](https://anoma.net/blog/hash-functions-in-plonkup) — gizliliği koruyan, çok zincirli atomik takas protokolü
- [Orbis](https://docs.orbisprotocol.com/orbis/technology/halo-2) — Cardano üzerinde bir L2 zkRollup
- [DarkFi](https://dark.fi/book/arch/arch.html) — gizlilik odaklı bir L1 zkEVM blokzinciri
- [Scroll](https://scroll.mirror.xyz/nDAbJbSIJdQIWqp9kn8J0MVS4s6pYBwHmK7keidQs-k) — Ethereum üzerinde bir L2 zkRollup

---

## Pratik Etkileri

**Zcash için**

- Orchard korumalı havuzu, NU5 ile etkinleştirildi ve Zcash ağında bu yeni kanıt sisteminin uygulamasıdır. Eski korumalı havuzları kademeli olarak devreden çıkarma amacıyla Sprout ve Sapling arasında kullanılan aynı turnike tasarımıyla korunur.
- NU5'in ardından (2022 ortası) özyinelemeli kanıtların entegrasyonu mümkün hâle geldi ve beraberinde çeşitli gizlilik iyileştirmeleri geldi. En önemlisi, girdi/çıktıların yerini alan “Actions” özelliğinin kullanıma sunulması işlem meta verisi miktarını azaltıyor.
- Güvene dayalı kurulumların kaldırılması, aksi takdirde her büyük protokol yükseltmesinde tekrarlanması gerekecek sistemik bir riski ortadan kaldırır.

**ZEC sahipleri ve düğüm işletmecileri için**

- Özyinelemeli kanıt bileşimi, sınırsız miktarda hesaplamayı sıkıştırma, denetlenebilir dağıtık sistemler oluşturma ve tam düğüm işletmecileri için Katman 1 kapasitesini iyileştirme potansiyeli taşır. Bu, Zcash Shielded Assets gibi uzantılar ve Zcash'ın uzun vadeli tasarımları için önemlidir.

---

## Sık Yapılan Hatalar

| Yaygın inanış | Gerçekte olan |
| --- | --- |
| “Halo, Zcash'ın beklediği gelecekteki bir yükseltmedir.” | 2022'de NU5'den beri ana ağda çalışan Orchard, zaten Halo 2 üzerinde çalışıyor. |
| “Güvene dayalı kurulum yoksa hiç parametre yoktur.” | Halo hâlâ genel parametreler kullanır. Ancak katılımcıların gizli kurulum malzemesini yok edeceğine güvenilmesi gereken bir tören gerekmez. |
| “Halo 2 ile Halo makalesi aynı şeydir.” | [makalesi](https://eprint.iacr.org/2019/1021.pdf), polinom kriptografik taahhüt şemasını ve iç içe amortismanı açıklar; Halo 2 ise biriktirme şeması ve PLONK benzeri aritmetikleştirmeye sahip üretim Rust uygulamasıdır. |
| “Özyineleme yalnızca blok doğrulamasının ölçeklendirilmesine yardımcı olur.” | Özyineleme, uygulama düzeyindeki hesaplamaları da sıkıştırır. Filecoin'ın uzay-zaman/çoğaltma kanıtlarına ve Ethereum için VDF çalışmalarına bakın. |

---

## İlgili Sayfalar

- [zk-SNARKs](/zcash-tech/zk-snarks) — Halo'ın ait olduğu genel teknoloji kategorisi
- [Halo (araştırma makalesi)](https://eprint.iacr.org/2019/1021.pdf) — özgün yayın
- [Ironwood](/zcash-tech/ironwood) ve [Turnike](/zcash-tech/the-turnstile) — korumalı havuzların eskileri devreden çıkarılırken nasıl taşındığı
- [Zcash Shielded Assets](/zcash-tech/zcash-shielded-assets) — özyinelemeli kanıtlardan yararlanan bir uzantı
- [Zebra Tam Düğüm](/zcash-tech/zebra-full-node) — zincir üstündeki kanıtları doğrulayan düğüm uygulaması

## Daha Fazla Bilgi

- [ZKP ve Halo 2'ye giriş — Hanh Huynh Huu](https://www.youtube.com/watch?v=jDHWJLjQ9oA)
- [Halo 2, Daira ve Str4d ile — ZK Podcast](https://www.youtube.com/watch?v=-lZH8T5i-K4)
- [Teknik açıklama blogu](https://electriccoin.co/blog/technical-explainer-halo-on-zcash/)
- [Halo 2 Topluluk Tanıtımı — Ying Tong @ Zcon3](https://www.youtube.com/watch?v=JJi2TT2Ahp0)

**Belgeler**

- [Halo 2 kaynakları](https://github.com/mhchia/awesome-halo2)
- [Halo 2 belgeleri](https://zcash.github.io/halo2/)
- [Halo 2 GitHub](https://github.com/zcash/halo2)
