<a href="https://github.com/zechub/zechub/edit/main/site/Zcash_Tech/Halo.md" target="_blank">
  <img src="https://img.shields.io/badge/Edit-blue" alt="Sayfayı Düzenle"/>
</a>

# Halo

## Özet

Halo, Electric Coin Co'te Sean Bowe tarafından keşfedilen, güven gerektirmeyen, özyinelemeli bir sıfır bilgi kanıtı (ZKP) sistemidir. Güvenilir bir kurulum ihtiyacını ortadan kaldırır ve özyinelemeli kanıt bileşimini pratik hâle getirir; bu da Zcash'in mevcut ölçeklenebilirlik ve güvenlik yol haritasının temelidir.

- **Nedir:** verimli özyineleme ve güvenilir kurulum töreni olmadan çalışan bir zk-SNARK yapısıdır.
- **Neden önemlidir:** 2022'de NU5 ile etkinleştirilen Zcash'in Orchard korumalı havuzu, bu araştırmanın üretim uygulaması olan Halo 2 üzerinde çalışır.
- **Temel özellik:** kurulum törenlerinden kaynaklanan "zehirli atık" yoktur ve pratik olarak sınırsız sayıda başka kanıtı doğrulayabilen kanıtlar sunar.
- **Lisanslama:** Halo 2, [MIT ve Apache 2.0](https://github.com/zcash/halo2#readme) kapsamında açık kaynaklıdır; dolayısıyla ekosistemdeki herkes bunun üzerine inşa edebilir.

---

## Temel Açıklama

Halo, Electric Coin Co'te Sean Bowe tarafından keşfedilen, güven gerektirmeyen, özyinelemeli bir sıfır bilgi kanıtı sistemidir. Güvenilir kurulumu ortadan kaldırır ve Zcash blok zincirinin daha fazla ölçeklenebilmesini sağlar. Halo, hem verimli hem de özyinelemeli olan ilk sıfır bilgi kanıtı sistemiydi ve yaygın olarak bilimsel bir atılım kabul edilir.

![halo](/content-images/_unavailable.svg "halo")

### İki bileşen

- **Özlü Polinom Taahhüt Şeması.** Bir taahhütçünün, doğrulayıcının taahhüt edilen polinomun ileri sürülen değerlendirmelerini onaylamak için kullanabileceği kısa bir dizeyle bir polinoma taahhütte bulunmasına olanak tanır.
- **Polinom Etkileşimli Oracle Kanıtı.** Doğrulayıcı, polinom taahhüt şemasını kullanarak kanıtlayıcıdan (bir algoritma) seçtiği noktalardaki tüm taahhütleri açmasını ister ve aralarındaki özdeşliğin doğru olup olmadığını kontrol eder.

### Güvenilir kurulum yok

zk-SNARKs, kanıtlama ve doğrulama için herkese açık bir parametre olarak ortak bir referans dizesine (CRS) dayanır. Bu CRS, güvenilir bir tarafça önceden oluşturulmalıdır. Yakın zamana kadar, bu [güvenilir kurulum töreni](https://zkproof.org/2021/06/30/setup-ceremonies/amp/) sırasındaki riski azaltmak için Aztec ağı ve Zcash tarafından gerçekleştirilenler gibi ayrıntılı güvenli çok taraflı hesaplamalar (MPC) gerekliydi.

Zcash'in önceki Sprout ve Sapling korumalı havuzları, BCTV14 ve Groth16 zk-kanıtlama sistemlerini kullanıyordu. Bunlar güvenli olsa da sınırlamaları vardı: tek bir uygulamaya bağlı oldukları için ölçeklenebilir değillerdi, "zehirli atık" (başlangıç töreni sırasında üretilen kriptografik materyalin kalıntıları) kalıcı olabilirdi ve törenin kabul edilebilir sayılmasında, çok küçük de olsa, bir güven unsuru bulunuyordu.

Halo, zor problemlerin birden çok örneğini eliptik eğri döngüleri üzerinde tekrar tekrar bir araya getirerek güvenilir kurulumu ortadan kaldırır; böylece hesaplamalı kanıtlar, kendileri hakkında verimli biçimde akıl yürütmek için kullanılabilir (iç içe amortizasyon). Bunun bir yan etkisi olarak, yapılandırılmış referans dizesi (bir törenin çıktısı) yükseltilebilir hâle gelir ve akıllı sözleşmeler gibi uygulamaları mümkün kılar.

Halo, kullanıcılara büyük ölçekli bir sıfır bilgi kanıt sisteminin güvenliği hakkında iki önemli güvence sunar. İlk olarak, kullanıcıların başlangıç törenine katılan hiç kimsenin sahte işlemler yürütmek için gizli bir arka kapı oluşturmadığını kanıtlamasını sağlar. İkinci olarak, sistem güncellemelerden ve değişikliklerden geçse bile zaman içinde güvenli kaldığını göstermelerine olanak tanır.

[Sean Bowe'in Dystopia Labs'teki açıklayıcısı](https://www.youtube.com/watch?v=KdkVTEHUxgo)

---

## Görsel / Analoji

### Noter zinciri

Normal bir zk-SNARK'i noter tasdikli bir belge olarak düşünün: bir damga, bir doğrulama, tamam. Şimdi on bin belgeden oluşan bir yığının gerçek olduğunu kanıtlamanız gerektiğini hayal edin. Özyineleme olmadan, bir doğrulayıcının her damgayı kontrol etmesi gerekirdi.

Halo, doğrulanmış her belgeyi *bir sonraki* belgenin damgasına dönüştürür; sonunda tüm yığın, tek damgalı tek bir belgede toplanır. Son belgeyi kontrol etmek, tüm zincire güvenmek için yeterlidir — ve önemlisi, Halo'in noteri (kanıtlama sistemi), mührünü kurmak için asla harici bir otoriteye ihtiyaç duymadan kendi damgalarını üretir.

### Güvenilir kurulumu kaldırmak neden önemlidir

Eski sistemlerde "mühür" (CRS) bir törenden gelirdi. Katılımcıların ara materyali yok etmesi gerekiyordu ve herkesin bunu yaptıklarına güvenmesi gerekiyordu. Halo'in mührü yalnızca matematik tarafından üretilir: yok edilecek, sızdırılacak veya güvenilecek bir tören yoktur.

---

## Derinlemesine İnceleme

### Özyinelemeli kanıtlar

Özyinelemeli kanıt bileşimi, tek bir kanıtın pratik olarak sınırsız sayıda diğer kanıtın doğruluğunu teyit etmesine ve büyük miktarda hesaplamayı (ve bilgiyi) sıkıştırmasına olanak tanır. Bu, ölçeklenebilirlik için temel bir bileşendir; çünkü katılımcı grupları ağın geri kalanının bütünlüğüne güvenmeye devam ederken ağın yatay olarak ölçeklenmesini sağlar.

Halo'den önce özyinelemeli kanıt bileşimini elde etmek, büyük hesaplama maliyeti ve güvenilir bir kurulum gerektiriyordu. Başlıca keşiflerden biri, **iç içe amortizasyon** adı verilen bir teknikti: iç çarpım argümanına dayalı bir polinom taahhüt şeması kullanan özyinelemeli bileşim, güvenilir kurulumdan kaçınırken performansı büyük ölçüde iyileştirir.

[Halo makalesi](https://eprint.iacr.org/2019/1021.pdf), bu polinom taahhüt şemasını tamamen açıklar ve içinde yeni bir toplama tekniğinin bulunduğunu keşfetti. Bu teknik, bağımsız olarak oluşturulmuş çok sayıda kanıtın, tek bir kanıtın doğrulanmasına neredeyse yakın bir hızda doğrulanmasına olanak tanır. Bu bile tek başına, Zcash'te kullanılan önceki zk-SNARKs'e daha iyi bir alternatif sunuyordu.

### Halo 2

Halo 2, Zcash'de ölçeklenebilirliğin önünü açarken güvenilir kurulum ihtiyacını ortadan kaldıran, Rust ile yazılmış yüksek performanslı bir zk-SNARK uygulamasıdır.

<a href="">
    <img src="/content-images/Halo-puzzle-03-1024x517-e034023d10.webp" alt="" width="500" height="300"/>
</a>

**Birikim şeması** adı verilen yaklaşımın bir genellemesini içerir. Bu biçimselleştirme, iç içe amortizasyonun gerçekte nasıl çalıştığını ortaya koyar: kanıtlar, her kanıtın biriktiricinin önceki durumu hakkında akıl yürüttüğü **biriktirici** adlı bir nesneye eklenerek, önceki tüm kanıtlar yalnızca biriktiricinin mevcut durumu kontrol edilerek (tümevarımla) denetlenebilir.

<a href="">
    <img src="/content-images/l4HrYgE-1ea7bc32f7.webp" alt="" width="500" height="300"/>
</a>

Buna paralel olarak, birçok başka ekip Marlin gibi Sonic'ten (Halo 1'de kullanılan) daha verimli Polinom IOP'leri keşfediyordu. Bu protokollerin en verimlisi PLONK'dir; uygulamaya özgü ihtiyaçlara dayalı verimli uygulamalar tasarlamada muazzam esneklik sağlar ve Sonic'e kıyasla kanıtlayıcı süresini 5× iyileştirir.

[PLONK'e genel bakış](https://www.youtube.com/watch?v=P1JeN30RdwQ)

### Daha geniş ekosistemde Halo

Electric Coin Company, teknolojinin kendi ağlarında nasıl kullanılabileceği de dâhil olmak üzere Halo Ar-Ge'sini araştırmak için Protocol Labs, Filecoin Foundation ve Ethereum Foundation ile bir anlaşma yaptı. Anlaşma, ekosistemler genelinde ve Web 3.0 için daha iyi ölçeklenebilirlik, birlikte çalışabilirlik ve gizlilik sağlamayı amaçlamaktadır.

Ek olarak, Halo 2, [MIT ve Apache 2.0 açık kaynak lisansları](https://github.com/zcash/halo2#readme) kapsamındadır; bu da ekosistemdeki herkesin kanıtlama sistemiyle geliştirme yapabileceği anlamına gelir.

**Filecoin.** Dağıtımından bu yana halo2 kütüphanesi zkEVM gibi projelerde benimsendi ve Halo 2'nin Filecoin Virtual Machine için kanıt sistemine potansiyel entegrasyonu bulunmaktadır. Filecoin, çok sayıda maliyetli uzay-zaman kanıtı ve çoğaltma kanıtı gerektirir; Halo 2, alan kullanımını sıkıştırmak ve ağı daha iyi ölçeklendirmek için kilit önemdedir. [Filecoin Foundation'ın Zooko ile videosu](https://www.youtube.com/watch?v=t4XOdagc9xw). Ayrıca Filecoin depolama ödemelerinin ZEC ile yapılabilmesi, Zcash korumalı transferlerde bulunan depolama satın alma gizliliğini sağlayacağı için her iki ekosisteme de fayda sağlar — buna dosyaların Filecoin depolamasında şifrelenmesi ve bir Zcash şifreli nota medya ekleyen mobil istemcilerin desteklenmesi de dâhildir. [ECC × Filecoin blog yazısı](https://electriccoin.co/blog/ethereum-zcash-filecoin-collab/)

**Ethereum.** Verimli bir Doğrulanabilir Gecikme Fonksiyonu (VDF) için bir Halo 2 kanıtı geliştirilmektedir. VDF; akıllı sözleşmeler için genel amaçlı rastgelelik ve Proof of Stake'te lider seçimi dâhil olmak üzere birçok potansiyel kullanım alanına sahip kriptografik bir ilkeldir. ECC, Filecoin Foundation, Protocol Labs ve Ethereum Foundation ayrıca VDF'nin potansiyel GPU ve ASIC geliştirmesi için donanım hızlandırmalı kriptografi konusunda uzmanlaşmış bir tedarikçi olan [SupraNational](https://www.supranational.net/) ile çalışmaktadır. [Privacy and Scaling Explorations grubu](https://appliedzkp.org/), Halo 2 kanıtlarının Ethereum için gizliliği ve ölçeklenebilirliği iyileştirebileceği ek yolları araştırmaktadır.

### Halo kullanan diğer projeler

- [Anoma](https://anoma.net/blog/hash-functions-in-plonkup) — gizliliği koruyan çok zincirli bir atomik takas protokolü
- [Orbis](https://docs.orbisprotocol.com/orbis/technology/halo-2) — Cardano üzerinde bir L2 zkRollup
- [DarkFi](https://dark.fi/book/arch/arch.html) — özel bir L1 zkEVM blok zinciri
- [Scroll](https://scroll.mirror.xyz/nDAbJbSIJdQIWqp9kn8J0MVS4s6pYBwHmK7keidQs-k) — Ethereum üzerinde bir L2 zkRollup

---

## Pratik Çıkarımlar

**Zcash'in kendisi için**

- NU5 ile etkinleştirilen Orchard korumalı havuzu, bu yeni kanıt sisteminin Zcash ağındaki uygulamasıdır. Eski korumalı havuzları aşamalı olarak kullanımdan kaldırma amacıyla, Sprout ve Sapling arasında kullanılan aynı turnike tasarımıyla korunur.
- NU5'in ardından (2022 ortası), özyinelemeli kanıtların entegrasyonu mümkün hâle geldi ve bununla birlikte çeşitli gizlilik iyileştirmeleri geldi — en önemlisi, işlem meta verisi miktarını azaltan girdi/çıktıların yerine 'Actions'ın getirilmesiydi.
- Güvenilir kurulumların kaldırılması, aksi hâlde her büyük protokol yükseltmesi için tekrarlanması gereken sistemik bir riski ortadan kaldırır.

**Sahipler ve operatörler için**

- Özyinelemeli kanıt bileşimi; sınırsız miktarda hesaplamayı sıkıştırma, denetlenebilir dağıtık sistemler oluşturma ve tam düğüm operatörleri için Katman 1 kapasitesini iyileştirme potansiyeline sahiptir — Zcash Shielded Assets gibi uzantılar ve Zcash'in daha uzun vadeli tasarımları için önemlidir.

---

## Yaygın Hatalar

| Yaygın inanış | Gerçekte durum nedir |
| --- | --- |
| "Halo, Zcash'in beklediği gelecekteki bir yükseltmedir." | Orchard, NU5'den (2022) beri ana ağda yayındadır ve zaten Halo 2 üzerinde çalışmaktadır. |
| "Güvenilir kurulum olmaması, hiç parametre olmadığı anlamına gelir." | Halo hâlâ yapılandırılmış parametreler kullanır; fark, bunların zehirli atık taşımaması ve katılımcıların güvenmek zorunda olduğu bir tören olmadan üretilebilmesi ve yükseltilebilmesidir. |
| "Halo 2 ile Halo makalesi aynı şeydir." | [makale](https://eprint.iacr.org/2019/1021.pdf), polinom taahhüt şemasını ve iç içe amortizasyonu açıklar; Halo 2 ise birikim şeması ve PLONKish aritmetizasyon içeren üretim amaçlı Rust uygulamasıdır. |
| "Özyineleme yalnızca blok doğrulamasını ölçeklendirmeye yardımcı olur." | Özyineleme ayrıca uygulama düzeyindeki hesaplamayı da sıkıştırır — Filecoin'in uzay-zaman/çoğaltma kanıtlarına ve Ethereum için VDF çalışmalarına bakın. |

---

## İlgili Sayfalar

- [zk-SNARKs](/zcash-tech/zk-snarks) — Halo'in ait olduğu genel teknoloji kategorisi
- [Halo (araştırma makalesi)](https://eprint.iacr.org/2019/1021.pdf) — orijinal yayın
- [Ironwood](/zcash-tech/ironwood) ve [The Turnstile](/zcash-tech/the-turnstile) — eski korumalı havuzlar kullanımdan kaldırılırken korumalı havuzların nasıl taşındığı
- [Zcash Shielded Assets](/zcash-tech/zcash-shielded-assets) — özyinelemeli kanıtlardan yararlanan bir uzantı
- [Zebra Full Node](/zcash-tech/zebra-full-node) — zincir üzerindeki kanıtları doğrulayan düğüm uygulaması

## Daha Fazla Öğrenme

- [ZKP ve Halo 2'ye giriş — Hanh Huynh Huu](https://www.youtube.com/watch?v=jDHWJLjQ9oA)
- [Halo 2, Daira ve Str4d ile — ZK Podcast](https://www.youtube.com/watch?v=-lZH8T5i-K4)
- [Teknik açıklayıcı blog](https://electriccoin.co/blog/technical-explainer-halo-on-zcash/)
- [Halo 2 Community Showcase — Ying Tong @ Zcon3](https://www.youtube.com/watch?v=JJi2TT2Ahp0)

**Dokümantasyon**

- [Halo 2 kaynakları](https://github.com/mhchia/awesome-halo2)
- [Halo 2 belgeleri](https://zcash.github.io/halo2/)
- [Halo 2 GitHub](https://github.com/zcash/halo2)
